const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Apply the stealth plugin
puppeteer.use(StealthPlugin());

async function loginAndFillForm() {

    const browser = await puppeteer.launch({ headless: false, slowMo: 50, args: ['--start-maximized'] });
    const page = await browser.newPage();

    console.log('\n--- Starting Application Process ---');

    try {
        // Set a generous default timeout for all page operations.
        page.setDefaultTimeout(90000); // 90 seconds

        await page.bringToFront();

        const loginUrl = 'https://certification.pmi.org/launch/application/CAPM';

        console.log(`[Script] Navigating to ${loginUrl}...`);
        await page.goto(loginUrl, { waitUntil: 'networkidle2' });

        console.log('[Script] Page loaded. Entering credentials...');

        const usernameSelector = '#Username';
        const passwordSelector = '#Password';
        const loginButtonSelector = '#login_btn';

        await page.waitForSelector(usernameSelector, { visible: true });
        await page.type(usernameSelector, 'fsarhan46@gmail.com');

        await page.waitForSelector(passwordSelector, { visible: true });
        await page.type(passwordSelector, 'i8":^&$24C`M');

        await page.waitForSelector(loginButtonSelector, { visible: true });
        console.log('[Script] Credentials entered. Clicking login...');
        await page.click(loginButtonSelector);

        // --- KEY FIX Part 1: Wait for all post-login redirects ---
        // This command waits for the entire chain of redirects you mentioned to finish.
        console.log('[Script] Login clicked. Waiting for all post-login redirections to complete...');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('[Script] Redirections finished. Final page is loaded.');


        // --- KEY FIX Part 2: Wait for the form to be rendered by JavaScript ---
        // This is the crucial step that replaces the old, unreliable delay.
        // It patiently waits for the country dropdown to actually appear on the page.
        const countryDropdownSelector = 'div[aria-labelledby="schoolCountryCode_select-label"] .p-dropdown-trigger';
        console.log('[Script] Waiting for the form to become visible...');
        await page.waitForSelector(countryDropdownSelector, { visible: true });
        console.log('--- Form is visible and ready! Starting to fill details. ---');


        // --- Start filling the form ---

        // 1. Select Country: Bahrain
        console.log('[Script] Selecting country: Bahrain...');
        await page.click(countryDropdownSelector);
        await page.waitForSelector('.p-dropdown-panel .p-dropdown-item[aria-label="Bahrain"]', { visible: true });
        await page.click('.p-dropdown-panel .p-dropdown-item[aria-label="Bahrain"]');
        console.log('[Script] Country selected.');


        // 2. Fill Name of Institution: University of Bahrain
        // REMINDER: You may still need to update this selector to match the actual input field.
        const institutionNameSelector = '#institutionName'; // <-- UPDATE IF NEEDED
        await page.waitForSelector(institutionNameSelector, { visible: true });
        console.log('[Script] Typing institution name...');
        await page.type(institutionNameSelector, 'University of Bahrain');
        console.log('[Script] Institution name entered.');


        // 3. Select Highest Level of Education: Bachelor Degree
        console.log('[Script] Selecting education level...');
        await page.click('div[aria-labelledby="degreeEnum_select-label"] .p-dropdown-trigger');
        await page.waitForSelector('.p-dropdown-panel .p-dropdown-item[aria-label="Bachelor Degree"]', { visible: true });
        await page.click('.p-dropdown-panel .p-dropdown-item[aria-label="Bachelor Degree"]');
        console.log('[Script] Education level selected.');


        // 4. Select Start Year: 2020
        console.log('[Script] Selecting start year...');
        await page.click('.dates-period .col-lg-6:first-child .p-dropdown-trigger');
        await page.waitForSelector('.p-dropdown-panel .p-dropdown-item[aria-label="2020"]', { visible: true });
        await page.click('.p-dropdown-panel .p-dropdown-item[aria-label="2020"]');
        console.log('[Script] Start year selected.');


        // 5. Select End Year: 2024
        console.log('[Script] Selecting end year...');
        await page.click('.dates-period .col-lg-6:last-child .p-dropdown-trigger');
        await page.waitForSelector('.p-dropdown-panel .p-dropdown-item[aria-label="2024"]', { visible: true });
        await page.click('.p-dropdown-panel .p-dropdown-item[aria-label="2024"]');
        console.log('[Script] End year selected.');

        console.log('\n--- SCRIPT COMPLETED SUCCESSFULLY ---');

    } catch (error) {
        console.error('\n--- AN ERROR OCCURRED ---');
        // This will print the full error, which is more helpful than just the message
        console.error(error);
        // This will save a picture of the screen at the moment of failure for easy debugging
        await page.screenshot({ path: 'error_screenshot.png' });
        console.log('\nAn error screenshot has been saved as "error_screenshot.png"');
    } finally {
        // You may want to close the browser automatically after the script finishes or errors out
        // await browser.close();
    }
}

// Run the main function
loginAndFillForm();