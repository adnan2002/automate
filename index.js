const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios'); // Required for making API requests

// Use the stealth plugin to make Puppeteer's automation harder to detect
puppeteer.use(StealthPlugin());

// --- Start: Your Registration Details ---
// IMPORTANT: You MUST replace these placeholder values with your actual data.
const registrationDetails = {
    firstName: 'Adnan',
    lastName: 'Sarhan',
    email: 'test-user@almoalem.net',
    password: 'Almoalem!23455',
    countryCode: 'BHR' 
};
// --- End: Your Registration Details ---

const API_URL = 'http://127.0.0.1:5000/get-security-code';

/**
 * Calls the local API to get the 2FA security code, with validation and retries.
 * @param {number} maxRetries The number of times to retry if fetching fails.
 * @returns {Promise<string>} The validated 6-digit security code.
 */
async function getSecurityCode(maxRetries = 2) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`[API Call - Attempt ${attempt}/${maxRetries}] Requesting security code... This may take up to a minute.`);
        try {
            const response = await axios.post(API_URL, {}, { timeout: 70000 });
            const code = response.data.security_code;

            // --- Validation Logic ---
            if (code && code.length === 6 && /^\d{6}$/.test(code)) {
                console.log(`[API Call] Successfully received and validated security code: ${code}`);
                return code; // Return the valid code
            } else {
                console.warn(`[API Call] Received invalid code: '${code}'. Retrying...`);
            }
        } catch (error) {
            console.error(`[API Call] Attempt ${attempt} failed. Error: ${error.message}`);
        }
    }
    // If all retries fail, throw an error
    throw new Error(`Failed to retrieve a valid security code after ${maxRetries} attempts.`);
}

/**
 * Main function to launch a browser and fill out the PMI registration form.
 */
async function fillRegistrationForm() {
    // Safety check
    if (registrationDetails.password === 'YourSecurePassword123!') {
        console.warn('------------------------------------------------------------------');
        console.warn('WARNING: You are using the default placeholder password.');
        console.warn('Please edit the `registrationDetails` object in this script.');
        console.warn('------------------------------------------------------------------');
    }
    
    console.log('Launching the browser...');
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    const url = 'https://www.pmi.org/account-registration?returnUrl=%23RETURNURL%23';

    try {
        console.log(`Navigating to: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });

        console.log('Waiting for the registration form...');
        await page.waitForSelector('#FirstName', { visible: true });
        console.log('Form is ready. Filling details...');

        await page.type('#FirstName', registrationDetails.firstName);
        await page.type('#LastName', registrationDetails.lastName);
        await page.select('#Country', registrationDetails.countryCode);
        await page.type('#Email', registrationDetails.email);
        await page.type('#Password', registrationDetails.password);
        
        const emailPreferenceCheckbox = await page.waitForSelector('#EmailPreference:not([style*="display: none"])');
        await emailPreferenceCheckbox.click();
        
        await page.waitForSelector('#PrivacyAccepted', { visible: true });
        await page.click('#PrivacyAccepted');
        
        const registerButtonSelector = '#btnRegister';
        await page.waitForSelector(registerButtonSelector, { visible: true });
        console.log('Clicking the "Register Now" button...');
        await page.click(registerButtonSelector);

        // =====================================================================
        // --- NEW LOGIC FOR 2FA VERIFICATION ---
        // =====================================================================

        console.log('\n--- Starting 2FA Verification ---');
        console.log('Waiting for the verification code inputs to appear...');
        const twoFaInputContainer = '.verification-codes-content';
        await page.waitForSelector(twoFaInputContainer, { visible: true, timeout: 30000 });

        // Call our API to get the code
        const securityCode = await getSecurityCode();

        console.log(`Typing the security code: ${securityCode}`);
        const inputFields = await page.$$('.twofa-field');

        if (inputFields.length !== 6) {
            throw new Error('Could not find the 6 verification input fields.');
        }

        // Type each digit of the code into a separate input field
        for (let i = 0; i < securityCode.length; i++) {
            await inputFields[i].type(securityCode[i]);
        }
        console.log('Successfully entered the 6-digit code.');

        // Find and click the final "Continue" button
        const continueButtonSelector = '#btnVerify2fa';
        console.log('Waiting for the "Continue" button...');
        await page.waitForSelector(continueButtonSelector, { visible: true });
        
        console.log('Clicking "Continue" to finalize registration...');
        await page.click(continueButtonSelector);

        console.log('\n--- 2FA Verification Submitted Successfully! ---');

        

    } catch (error) {
        console.error('\n--- AN ERROR OCCURRED ---');
        console.error(error.message);
        console.log('The browser will remain open for debugging.');
    } finally {
        // The 'finally' block is intentionally left empty to keep the browser open.
        // To close it automatically, you would add `await browser.close();` here.
    }
}

// Run the main function
fillRegistrationForm();