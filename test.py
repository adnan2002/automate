import imaplib
import email
import time
import re
from flask import Flask, jsonify, request

# --- Configuration ---
# It's recommended to use environment variables for sensitive data in a production environment
IMAP_SERVER = "imap.gmail.com"
EMAIL_ACCOUNT = "isa.salaman123@gmail.com"
PASSWORD = "cuckludvsyptrpxo"
MAILBOX = 'INBOX'

# Time in seconds to poll for new emails before timing out the request
REQUEST_TIMEOUT = 60
# Time in seconds between each poll attempt
POLL_INTERVAL = 2

# Regex to filter the "From:" header for emails from PMI
FROM_REGEX = re.compile(r"<donotreply@pmi\.org>", re.IGNORECASE)
# Regex to extract the PMI security code from the HTML body
SECURITY_REGEX = re.compile(r"Your PMI security code is <b>(\d+)</b>", re.IGNORECASE)


# --- Flask App Initialization ---
app = Flask(__name__)


# --- IMAP Logic Functions ---

def connect_imap(server, email_account, password):
    """Establishes a connection to the IMAP server."""
    try:
        mail = imaplib.IMAP4_SSL(server)
        mail.login(email_account, password)
        return mail
    except imaplib.IMAP4.error as e:
        print(f"Error connecting to IMAP server: {e}")
        return None


def get_current_max_uid(mail, mailbox):
    """Gets the highest email UID in the specified mailbox."""
    mail.select(mailbox)
    result, data = mail.uid('search', None, 'ALL')
    if result != 'OK':
        raise Exception('Failed to search for UIDs')
    uids = data[0].split()
    return int(uids[-1]) if uids else 0


def fetch_and_extract_code(mail, mailbox, uid):
    """
    Fetches a specific email by UID, checks if it matches the sender regex,
    and extracts the security code if found.
    """
    mail.select(mailbox)
    result, data = mail.uid('fetch', str(uid), '(RFC822)')
    if result != 'OK' or not data[0]:
        print(f"Failed to fetch message UID {uid}")
        return None

    raw_email = data[0][1]
    msg = email.message_from_bytes(raw_email)

    # Filter by sender; return None if it doesn't match
    sender = msg.get('From', '')
    if not FROM_REGEX.search(sender):
        return None

    # Search for the security code within the email body
    if msg.is_multipart():
        for part in msg.walk():
            ctype = part.get_content_type()
            disp = part.get('Content-Disposition', '')
            if ctype == 'text/html' and 'attachment' not in disp:
                try:
                    html_body = part.get_payload(decode=True).decode(errors='replace')
                    match = SECURITY_REGEX.search(html_body)
                    if match:
                        return match.group(1)  # Return the found code
                except (UnicodeDecodeError, AttributeError):
                    continue
    else:
        # Handle non-multipart emails
        ctype = msg.get_content_type()
        if ctype == 'text/html':
            try:
                html_body = msg.get_payload(decode=True).decode(errors='replace')
                match = SECURITY_REGEX.search(html_body)
                if match:
                    return match.group(1) # Return the found code
            except (UnicodeDecodeError, AttributeError):
                pass
    
    return None # Return None if no code is found


# --- API Endpoint ---

@app.route('/get-security-code', methods=['POST'])
def get_security_code():
    """
    API endpoint to trigger the email check. It polls the inbox for a new
    email from the specified sender and returns the security code.
    """
    mail = connect_imap(IMAP_SERVER, EMAIL_ACCOUNT, PASSWORD)
    if not mail:
        return jsonify({"error": "Failed to connect to the email server."}), 500

    try:
        baseline_uid = get_current_max_uid(mail, MAILBOX)
        print(f"Connection successful. Baseline UID set to: {baseline_uid}")

        start_time = time.time()
        while time.time() - start_time < REQUEST_TIMEOUT:
            mail.select(MAILBOX)
            search_criteria = f"UID {baseline_uid + 1}:*"
            result, data = mail.uid('search', None, search_criteria)

            if result == 'OK' and data[0]:
                uids = data[0].split()
                for uid_bytes in reversed(uids): # Check newest first
                    uid = int(uid_bytes)
                    security_code = fetch_and_extract_code(mail, MAILBOX, uid)
                    if security_code:
                        print(f"Successfully extracted security code: {security_code}")
                        return jsonify({"security_code": security_code})
            
            # Wait for the next poll interval
            time.sleep(POLL_INTERVAL)

        # If the loop completes without finding the code, return a timeout error
        print("Request timed out. No matching email found.")
        return jsonify({"error": f"Request timed out. No security code found in the inbox within {REQUEST_TIMEOUT} seconds."}), 408

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500
    finally:
        if mail:
            mail.logout()
            print("IMAP connection closed.")


# --- Main Execution ---

if __name__ == '__main__':
    # To run this:
    # 1. Install Flask: pip install Flask
    # 2. Run the script: python app.py
    # The server will be available at http://127.0.0.1:5000
    app.run(debug=True, port=5000)