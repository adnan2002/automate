const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const phoneNumbers = require('./phoneNumbers.js');


puppeteer.use(StealthPlugin());

async function loginAndFillForm(browser) {
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
        courseEndYear: '2025',
        phone: '+973 33097092',
        birthdate: "11 October 2002",
        address: "P.O. Box 20649 - Building 1029, Road 3621, Block 436 - Seef",
        city: "Manama",
        state: "Al 'Asimah",
        zip: "00000",
        addressCountry: "Bahrain"

    };

    const selectDropdownOptionFirstMonth = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(1) > div:nth-child(1) > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(1) > div:nth-child(1) > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };
        const selectDropdownOptionFirstYear = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(1) > div:nth-child(2) > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(1) > div:nth-child(2) > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };

        const selectDropdownOptionLastMonth = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(3) > div:nth-child(1) > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(3) > div:nth-child(1) > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };

        const selectDropdownOptionLastYear = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(3) > div:nth-child(2) > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(3) > div:nth-child(2) > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };

        const selectDropdownOptionCountry = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(2) > div.col-md-8 > div.edit-mode > form > div > div > div > div > div > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(2) > div.col-md-8 > div.edit-mode > form > div > div > div > div > div > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };

        const selectDropdownCountryCode = async (triggerSelector, optionValue) => {
            const value = phoneNumbers[optionValue]
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div:nth-child(3) > div.phone-option.phone-option_selected > div.flex-grow-1 > div > div > div > div:nth-child(1) > div > div > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${value}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div:nth-child(3) > div.phone-option.phone-option_selected > div.flex-grow-1 > div > div > div > div:nth-child(1) > div > div > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };

        const selectDropdownBirthDay = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-3 > div > div:nth-child(4) > div > div > div:nth-child(1) > div > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-3 > div > div:nth-child(4) > div > div > div:nth-child(1) > div > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };

        const selectDropdownBirthMonth = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-3 > div > div:nth-child(4) > div > div > div.col.col-6 > div > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-3 > div > div:nth-child(4) > div > div > div.col.col-6 > div > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };

        const selectDropdownBirthYear = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-3 > div > div:nth-child(4) > div > div > div:nth-child(3) > div > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-3 > div > div:nth-child(4) > div > div > div:nth-child(3) > div > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };

        const selectDropdownCountry = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-5 > div > div:nth-child(1) > div > div > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul > .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-5 > div > div:nth-child(1) > div > div > div.p-dropdown-panel.p-hidden.p-input-overlay > div', { hidden: true });
        };

        const selectDropdownState = async (triggerSelector, optionValue) => {
            await page.click(triggerSelector);
            const optionSelector = `#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-5 > div > div.row > div.col-xl-9.col-sm-7 > div > div > div > div.p-dropdown-panel.p-hidden.p-input-overlay > div > ul .p-dropdown-item[aria-label="${optionValue}"]`;
            await page.waitForSelector(optionSelector, { visible: true });
            await page.click(optionSelector);
            await page.waitForSelector('#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-5 > div > div.row > div.col-xl-9.col-sm-7 > div > div > div > div.p-dropdown-panel.p-hidden.p-input-overlay', { hidden: true });
        };


        function removeFirstWhitespace(text) {
            if (typeof text !== 'string') {
              console.error("Error: Input must be a string.");
              return text; // Return original input if not a string
            }
            return text.replace(" ", "");
          }
        



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

        // console.log('[Script] Page loaded. Entering credentials...');
        // await page.type('#Username', 'sarhanfamilia@gmail.com');
        // await page.type('#Password', 'Fandball1_');
        // await page.click('#login_btn');

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
        await page.waitForSelector(courseProviderSelector)
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
        const startMonthTrigger = `#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(1) > div:nth-child(1) > div.p-dropdown-trigger`;
        const startYearTrigger = `#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(1) > div:nth-child(2) > div.p-dropdown-trigger`;
        const endMonthTrigger = `#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(3) > div:nth-child(1) > div.p-dropdown-trigger`;
        const endYearTrigger = `#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.col-lg-9 > div > div > div > div:nth-child(3) > div:nth-child(2) > div.p-dropdown-trigger`;

        // Select Start Month & Year
        console.log(`[Script] Selecting Start Date: ${formData.courseStartMonth} ${formData.courseStartYear}...`);
        await selectDropdownOptionFirstMonth(startMonthTrigger, formData.courseStartMonth);
        await selectDropdownOptionFirstYear(startYearTrigger, formData.courseStartYear);
        
        // Select End Month & Year
        console.log(`[Script] Selecting End Date: ${formData.courseEndMonth} ${formData.courseEndYear}...`);
        await selectDropdownOptionLastMonth(endMonthTrigger, formData.courseEndMonth);
        await selectDropdownOptionLastYear(endYearTrigger, formData.courseEndYear);

        await page.click("#main-layout > div > div.layout__content > div:nth-child(3) > div.col-md-8 > form > div.d-flex.align-items-end.mt-4 > button")


        await page.click("#main-layout > div > div.layout__content > div:nth-child(4) > div.col-md-8 > div > form > div > div.d-flex.align-items-end.mt-4.col-lg-12 > button")
        
        const buttonSelector = '#continue-button-panel > button';


        await page.waitForSelector(`${buttonSelector}:not([disabled])`, { timeout: 30000 }); 
        await page.click(buttonSelector);


        // NEW PAGE HERE

    
        const countryTrigger = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(2) > div.col-md-8 > div.edit-mode > form > div > div > div > div > div > div.p-dropdown-trigger"
        await page.waitForSelector(countryTrigger)

        await selectDropdownOptionCountry(countryTrigger, "Bahrain");

        const checkboxMobile = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div > div.p-radiobutton-box.p-component"

        await page.waitForSelector(checkboxMobile);

        await page.click(checkboxMobile);

        const phoneTrigger = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div:nth-child(3) > div.phone-option.phone-option_selected > div.flex-grow-1 > div > div > div > div:nth-child(1) > div > div > div.p-dropdown-trigger";

        await page.waitForSelector(phoneTrigger);


        const fullPhone = formData.phone.split(" ");
        const countryCode = fullPhone[0];
        const mobile = fullPhone[1];

        await selectDropdownCountryCode(phoneTrigger, countryCode);


        const phoneInput = "#phoneNumber_input";

        await page.waitForSelector(phoneInput);

        await page.type(phoneInput, mobile);


        const submitPhone = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.d-flex.align-items-end.mt-4 > button.ml-2.btn-md.btn.btn-primary";

        await page.waitForSelector(submitPhone);

        await page.click(submitPhone);




        const birthDateTrigger = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-3 > div > div:nth-child(4) > div > div > div:nth-child(1) > div > div.p-dropdown-trigger"

        await page.waitForSelector(birthDateTrigger);

        const birthdateArr= formData.birthdate.split(" ");
        const birthDay = birthdateArr[0];
        const birthMonth = birthdateArr[1];
        const birthYear = birthdateArr[2];

        await selectDropdownBirthDay(birthDateTrigger, birthDay);


        const birthMonthTrigger = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-3 > div > div:nth-child(4) > div > div > div.col.col-6 > div > div.p-dropdown-trigger";

        await page.waitForSelector(birthDateTrigger)
        await selectDropdownBirthMonth(birthMonthTrigger, birthMonth);


        const birthYearTrigger = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-3 > div > div:nth-child(4) > div > div > div:nth-child(3) > div > div.p-dropdown-trigger";

        await page.waitForSelector(birthYearTrigger)
        await selectDropdownBirthYear(birthYearTrigger, birthYear);


        const countrydropTrigger = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-5 > div > div:nth-child(1) > div > div > div.p-dropdown-trigger";

        await page.waitForSelector(countrydropTrigger)

        await selectDropdownCountry(countrydropTrigger, formData.addressCountry);


        const statedropTrigger = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-5 > div > div.row > div.col-xl-9.col-sm-7 > div > div > div > div.p-dropdown-trigger";

        await page.waitForSelector(statedropTrigger);

        await selectDropdownState(statedropTrigger, formData.state);


        const addressInput = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.mt-5 > div > div:nth-child(2) > div > input";

        await page.waitForSelector(addressInput);

        await page.type(addressInput, formData.address);


        const cityInput = "#city_input"

        await page.waitForSelector(cityInput);
        await page.type(cityInput, formData.city);


        const zip = "#postalCode_input";

        await page.waitForSelector(zip);

        await page.type(zip, formData.zip);

        const submitAddress = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.d-flex.align-items-end.mt-4 > button.ml-2.btn-md.btn.btn-primary";

        await page.waitForSelector(submitAddress);

        await page.click(submitAddress);








        


















        const editNameButton = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > div:nth-child(4) > a";

        await page.click(editNameButton);


        const editNameInput = "#nameOnCertificate_input";

        await page.waitForSelector(editNameInput);

        const currentVal = await page.$eval(editNameInput, el => el.value);

        const newVal = removeFirstWhitespace(currentVal);

        await page.type(editNameInput, newVal);

        const submitName = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(4) > div.col-md-8 > form > div.d-flex.align-items-end.mt-4 > button.ml-2.btn-md.btn.btn-primary";

        await page.waitForSelector(submitName)
        await page.click(submitName);

        const firstCheck = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(6) > div.col-md-8 > form > div.form-group.mb-2 > div > div > div.p-checkbox-box.p-component";

        await page.waitForSelector(firstCheck)

        await page.click(firstCheck);



        
        const secondCheck = "#main-layout > div > div.layout__content.layout__content-exam-details > div:nth-child(6) > div.col-md-8 > form > div:nth-child(2) > div > div > div.p-checkbox-box.p-component";

        await page.waitForSelector(secondCheck)

        await page.click(secondCheck);

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

module.exports = {loginAndFillForm}

