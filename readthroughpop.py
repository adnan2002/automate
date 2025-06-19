import poplib
import email
from email.header import decode_header
import re
import time
import threading
import queue
from flask import Flask, jsonify

# --- Email Reading Logic (Refactored into a function) ---

def decode_subject(header):
    """Decodes email subject headers."""
    decoded_parts = decode_header(header)
    subject = ""
    for part, encoding in decoded_parts:
        if isinstance(part, bytes):
            subject += part.decode(encoding or 'latin-1')
        else:
            subject += part
    return subject

def fetch_code_from_email(q, pop_config):
    """
    Polls the email server. When a code is found, it's put into the queue.
    This function is designed to be run in a separate thread.
    """
    POP3_SERVER = pop_config['server']
    USER_EMAIL = pop_config['email']
    USER_PASS = pop_config['password']
    
    start_time = time.time()
    # Poll for a maximum of 60 seconds
    while time.time() - start_time < 60:
        server = None
        try:
            server = poplib.POP3_SSL(POP3_SERVER)
            server.user(USER_EMAIL)
            server.pass_(USER_PASS)
            server.dele(1)
            num_messages, _ = server.stat()
            
            if num_messages > 0:
                print("Message found! Processing...")
                resp, lines, octets = server.retr(1)
                msg_content_bytes = b'\n'.join(lines)
                msg = email.message_from_bytes(msg_content_bytes)
                
                pmi_security_code = None
                # Define the specific regex pattern
                regex_pattern = r"Your PMI security code is.*?<b>(.*?)</b>"

                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_type() == "text/html":
                            charset = part.get_content_charset() or 'utf-8'
                            html_body = part.get_payload(decode=True).decode(charset, errors='replace')
                            # *** UPDATED LINE 1 ***
                            match = re.search(regex_pattern, html_body)
                            if match:
                                pmi_security_code = match.group(1).strip()
                                break
                else:
                    if msg.get_content_type() == "text/html":
                        charset = msg.get_content_charset() or 'utf-8'
                        html_body = msg.get_payload(decode=True).decode(charset, errors='replace')
                        # *** UPDATED LINE 2 ***
                        match = re.search(regex_pattern, html_body)
                        if match:
                            pmi_security_code = match.group(1).strip()
                
                if pmi_security_code:
                    q.put(pmi_security_code) # Put the found code in the queue
                    server.dele(1) # Mark for deletion
                    server.quit()
                    return # Exit the function and thread

            # If no messages, disconnect and wait before next poll
            server.quit()
            time.sleep(1)

        except Exception as e:
            print(f"An error occurred during polling: {e}")
            if server:
                server.quit()
            time.sleep(5) # Wait longer if there's an error

    # If the loop finishes without finding a code
    q.put(None)


# --- Flask API Definition ---

app = Flask(__name__)

@app.route('/get-security-code', methods=['POST'])
def get_security_code():
    """
    API endpoint to start the email polling process and return the code.
    """
    print("Received request for security code. Starting to poll...")
    
    # Configuration for the email account
    pop_config = {
        "server": "mail.almoalem.net",
        "email": "test-user@almoalem.net",
        "password": "Almoalem!23455"
    }

    q = queue.Queue()
    # Start the email fetching function in a background thread
    thread = threading.Thread(target=fetch_code_from_email, args=(q, pop_config))
    thread.start()

    # Wait for the thread to put a result in the queue
    # The get() method will block until an item is available
    result = q.get() 
    
    if result:
        print(f"Code '{result}' found. Sending response.")
        return jsonify({"security_code": result})
    else:
        print("Polling timed out after 60 seconds.")
        return jsonify({"error": "Request timed out. No security code found in the inbox within 60 seconds."}), 408

if __name__ == '__main__':
    # Runs the Flask server on your local machine, port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)