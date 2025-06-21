const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function loginAndFillForm() {
  const formData = {
        country: 'Bahrain',
        educationLevel: 'Bachelor Degree',
        startYear: '2020',
        endYear: '2024',
        institutionName: 'University of Bahrain',
        fieldOfStudy: 'Engineering',
        courseProvider: 'Almoalem',
        courseName: 'CAPM',
        courseHours: '25',
        // --- New data for the course dates ---
        courseStartMonth: 'June',
        courseStartYear: '2025',
        courseEndMonth: 'June',
        courseEndYear: '2025'
    };

    const selectDropdownOption = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `.p-dropdown-panel .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('.p-dropdown-panel', { hidden: true });
        };


    const browser = await puppeteer.launch({ headless: false, slowMo: 50, args: ['--start-maximized'] });
    const page = await browser.newPage();

    console.log('\n--- Starting Application Process ---');

    try {
        page.setDefaultTimeout(90000);
        await page.bringToFront();

        const loginUrl = 'https://certification.pmi.org/launch/application/CAPM';

        console.log(`[Script] Navigating to ${loginUrl}...`);
        await page.goto(loginUrl, { waitUntil: 'networkidle2' });

        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        await delay(5000);

        console.log('[Script] Page loaded. Entering credentials...');
        await page.type('#Username', 'adnansarhan247@gmail.com');
        await page.type('#Password', 'Fandball1_');
        await page.click('#login_btn');

        console.log('[Script] Login clicked. Waiting for all post-login redirections to complete...');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('[Script] Redirections finished. Final page is loaded.');

        const countryDropdownSelector = '#schoolCountryCode_select-label + div .p-dropdown-trigger';
        const educationDropdownSelector = '#degreeEnum_select-label + div .p-dropdown-trigger';

        console.log('[Script] Waiting for the form to become visible...');
        await page.waitForSelector(countryDropdownSelector, { visible: true });
        console.log('--- Form is visible and ready! Starting to fill details. ---');

        console.log('[Script] Selecting country: Bahrain...');
        await page.click(countryDropdownSelector);
        await page.waitForSelector('.p-dropdown-panel .p-dropdown-item[aria-label="Bahrain"]', { visible: true });
        await page.click('.p-dropdown-panel .p-dropdown-item[aria-label="Bahrain"]');
        console.log('[Script] Country selected.');

        console.log('[Script] Selecting education level...');
        await page.click(educationDropdownSelector);
        await page.waitForSelector('.p-dropdown-panel .p-dropdown-item[aria-label="Bachelor Degree"]', { visible: true });
        await page.click('.p-dropdown-panel .p-dropdown-item[aria-label="Bachelor Degree"]');
        console.log('[Script] Education level selected.');

        console.log('[Script] Selecting start year...');
        await page.click('.dates-period .col-lg-6:first-child .p-dropdown-trigger');
        await page.waitForSelector('.p-dropdown-panel .p-dropdown-item[aria-label="2020"]', { visible: true });
        await page.click('.p-dropdown-panel .p-dropdown-item[aria-label="2020"]');
        console.log('[Script] Start year selected.');

        const endYearTriggerSelector = '#main-layout > div > div.layout__content > div:nth-child(3) > div.col-md-8 > form > div.form-row > div.col-lg-5.pr-0 > div > div > div:nth-child(2) > div > div.p-dropdown-trigger';
        const endYearOptionSelector = '#main-layout > div > div.layout__content > div:nth-child(3) > div.col-md-8 > form > div.form-row > div.col-lg-5.pr-0 > div > div > div:nth-child(2) > div > div.p-dropdown-panel > div > ul > li:nth-child(2)';

        await page.click(endYearTriggerSelector);
        await page.waitForSelector(endYearOptionSelector, { visible: true });
        await page.click(endYearOptionSelector);

        console.log('[Script] Typing institution name...');
        const institutionNameSelector = '#main-layout > div > div.layout__content > div:nth-child(3) > div.col-md-8 > form > div:nth-child(3) > div > input';

        await page.waitForSelector(institutionNameSelector, { visible: true });
        await page.type(institutionNameSelector, 'University of Bahrain');
        console.log('[Script] Institution name entered.');

        console.log("[Script] Selecting 'Engineering' as the Field of Study...");
        const fieldOfStudyTriggerSelector = '#main-layout > div > div.layout__content > div:nth-child(3) > div.col-md-8 > form > div:nth-child(4) > div > div > div.p-dropdown-trigger';
        const engineeringOptionSelector = '#main-layout > div > div.layout__content > div:nth-child(3) > div.col-md-8 > form > div:nth-child(4) > div > div > div.p-dropdown-panel > div > ul > li:nth-child(12)';

        await page.click(fieldOfStudyTriggerSelector);
        await page.waitForSelector(engineeringOptionSelector, { visible: true });
        await page.click(engineeringOptionSelector);

        console.log('[Script] Field of Study selected.');
        await page.waitForSelector('.p-dropdown-panel', { hidden: true });
        
        
        console.log('--- Starting to fill Course details. ---');
        const courseProviderSelector = '#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div:nth-child(1) > div:nth-child(1) > div > input';
        const courseNameSelector = '#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div:nth-child(1) > div:nth-child(2) > div > input';
        const courseHoursSelector = '#hoursTotal_input';
        console.log(`[Script] Typing Course Provider: ${formData.courseProvider}...`);
        await page.type(courseProviderSelector, formData.courseProvider);
        console.log(`[Script] Typing Course Name: ${formData.courseName}...`);
        await page.type(courseNameSelector, formData.courseName);
        console.log(`[Script] Typing Total Hours: ${formData.courseHours}...`);
        await page.type(courseHoursSelector, formData.courseHours);
        console.log('--- Course provider, name, and hours filled. ---');


        // --- NEW STEPS FOR COURSE DATES START HERE ---
        
        console.log('--- Starting to fill Course Dates ---');
        
        // Define robust selectors for the date fields based on their structure
        const courseDateContainerSelector = '.dates-period_months';
        const startMonthTrigger = `${courseDateContainerSelector} .months-period__date-group:nth-child(1) .p-dropdown:nth-child(1) .p-dropdown-trigger`;
        const startYearTrigger = `${courseDateContainerSelector} .months-period__date-group:nth-child(1) .p-dropdown:nth-child(2) .p-dropdown-trigger`;
        const endMonthTrigger = `${courseDateContainerSelector} .months-period__date-group:nth-child(3) .p-dropdown:nth-child(1) .p-dropdown-trigger`;
        const endYearTrigger = `${courseDateContainerSelector} .months-period__date-group:nth-child(3) .p-dropdown:nth-child(2) .p-dropdown-trigger`;

        // Select Start Month & Year
        console.log(`[Script] Selecting Start Date: ${formData.courseStartMonth} ${formData.courseStartYear}...`);
        await selectDropdownOption(startMonthTrigger, formData.courseStartMonth);
        await selectDropdownOption(startYearTrigger, formData.courseStartYear);
        
        // Select End Month & Year
        console.log(`[Script] Selecting End Date: ${formData.courseEndMonth} ${formData.courseEndYear}...`);
        await selectDropdownOption(endMonthTrigger, formData.courseEndMonth);
        await selectDropdownOption(endYearTrigger, formData.courseEndYear);

        console.log('--- Course Dates filled. ---');

        // --- NEW STEPS END HERE ---


        console.log('\n--- SCRIPT COMPLETED SUCCESSFULLY ---');

    } catch (error) {
        console.error('\n--- AN ERROR OCCURRED ---');
        console.error(error);
        await page.screenshot({ path: 'error_screenshot.png' });
        console.log('\nAn error screenshot has been saved as "error_screenshot.png"');
    }
}

loginAndFillForm();