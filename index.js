const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');
const { loginAndFillForm } = require('./capm.js'); // <-- IMPORT THE LOGIN FUNCTION

puppeteer.use(StealthPlugin());

function shortenString(text) {
  // Return the original string if it's already within the length limit.
  if (text.length <= 30) {
    return text;
  }

  // Split the string into an array of words.
  let words = text.split(' ');

  // If there's only one word and it's too long, return an empty string.
  if (words.length === 1 && words[0].length > 30) {
      return "";
  }
  
  // Keep processing as long as the string is too long and we have more than one word.
  while (words.join(' ').length > 30 && words.length > 2) {
    // Remove the word before the last one.
    // For example: "Adnan Mo Redha Sarhan" -> "Adnan Mo Sarhan"
    words.splice(words.length - 2, 1);
  }

  let result = words.join(' ');

  // If it's still too long after the first round of shortening
  if (result.length > 30 && words.length === 2) {
    // "Adnan Sarhan" -> "Adnan"
    result = words[0];
  }

  // Final check: if the single remaining word is still too long, return empty.
  if (result.length > 30) {
    return '';
  }

  return result;
}


const registrationDetails = {
    firstName: 'Adnan',
    lastName: 'Mohammed Redha Ali Sarhan',
    email: 'isa.salaman123@gmail.com',
    password: 'Almoalem!23455',
    countryCode: 'BHR' 
};

const API_URL = 'http://127.0.0.1:5000/get-security-code';

async function getSecurityCode(maxRetries = 2) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`[API Call - Attempt ${attempt}/${maxRetries}] Requesting security code... This may take up to a minute.`);
        try {
            const response = await axios.post(API_URL, {}, { timeout: 70000 });
            const code = response.data.security_code;

            if (code && code.length === 6 && /^\d{6}$/.test(code)) {
                console.log(`[API Call] Successfully received and validated security code: ${code}`);
                return code;
            } else {
                console.warn(`[API Call] Received invalid code: '${code}'. Retrying...`);
            }
        } catch (error) {
            console.error(`[API Call] Attempt ${attempt} failed. Error: ${error.message}`);
        }
    }
    throw new Error(`Failed to retrieve a valid security code after ${maxRetries} attempts.`);
}

async function fillRegistrationForm() {
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
        args: ['--start-maximized','--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const registrationPage = await browser.newPage();
    const url = 'https://www.pmi.org/account-registration?returnUrl=%23RETURNURL%23';

    try {
        console.log(`Navigating to: ${url}`);
        await registrationPage.goto(url, { waitUntil: 'networkidle2' });

        console.log('Waiting for the registration form...');
        await registrationPage.waitForSelector('#FirstName', { visible: true });
        console.log('Form is ready. Filling details...');

        await registrationPage.type('#FirstName', registrationDetails.firstName);
        await registrationPage.type('#LastName', shortenString(registrationDetails.lastName));
        await registrationPage.select('#Country', registrationDetails.countryCode);
        await registrationPage.type('#Email', registrationDetails.email);
        await registrationPage.type('#Password', registrationDetails.password);
        
        const emailPreferenceCheckbox = await registrationPage.waitForSelector('#EmailPreference:not([style*="display: none"])');
        await emailPreferenceCheckbox.click();
        
        await registrationPage.waitForSelector('#PrivacyAccepted', { visible: true });
        await registrationPage.click('#PrivacyAccepted');
        
        const registerButtonSelector = '#btnRegister';
        await registrationPage.waitForSelector(registerButtonSelector, { visible: true });
        console.log('Clicking the "Register Now" button...');
        await registrationPage.click(registerButtonSelector);

        console.log('\n--- Starting 2FA Verification ---');
        console.log('Waiting for the verification code inputs to appear...');
        const twoFaInputContainer = '.verification-codes-content';
        await registrationPage.waitForSelector(twoFaInputContainer, { visible: true, timeout: 30000 });

        const securityCode = await getSecurityCode();

        console.log(`Typing the security code: ${securityCode}`);
        const inputFields = await registrationPage.$$('.twofa-field');

        if (inputFields.length !== 6) {
            throw new Error('Could not find the 6 verification input fields.');
        }

        for (let i = 0; i < securityCode.length; i++) {
            await inputFields[i].type(securityCode[i]);
        }
        console.log('Successfully entered the 6-digit code.');

        const continueButtonSelector = '#btnVerify2fa';
        console.log('Waiting for the "Continue" button...');
        await registrationPage.waitForSelector(continueButtonSelector, { visible: true });
        
        console.log('Clicking "Continue" to finalize registration...');
        await registrationPage.click(continueButtonSelector);
        console.log('\n--- REGISTRATION AND 2FA VERIFICATION COMPLETED! ---');

        // Delay helper
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));

        // Usage
        await delay(5000);


        
        await loginAndFillForm(browser);
        
        

    } catch (error) {
        console.error('\n--- AN ERROR OCCURRED DURING REGISTRATION ---');
        console.error(error.message);
        console.log('The browser will remain open for debugging.');
    } finally {
        console.log('\n--- All tasks finished. The browser will remain open. ---');
        await browser.close();
    }
}

fillRegistrationForm();