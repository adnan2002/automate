
/**
 * Logs into the PMI certification portal using an existing browser instance.
 * @param {import('puppeteer').Browser} browser - The browser instance launched by the main script.
 */
async function loginToPMI(browser) {
  console.log('\n--- Starting Login Process in a New Tab ---');
  
  try {
    // Create a new page (tab) in the existing browser.
    const page = await browser.newPage();
    
    // Set a default timeout for all page operations.
    page.setDefaultTimeout(60000); // 60 seconds

    // Bring the new tab to the front to make it visible
    await page.bringToFront();

    const loginUrl = 'https://certification.pmi.org/launch/application/CAPM';

    console.log(`[Login Script] Navigating to ${loginUrl}...`);
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });

    console.log('[Login Script] Page loaded. Looking for input fields...');

    const usernameSelector = '#Username';
    const passwordSelector = '#Password';
    const loginButtonSelector = '#login_btn';

    await page.waitForSelector(usernameSelector, { visible: true });
    console.log('[Login Script] Username field found.');
    await page.type(usernameSelector, 'fsarhan46@gmail.com');
    console.log('[Login Script] Username entered.');

    await page.waitForSelector(passwordSelector, { visible: true });
    console.log('[Login Script] Password field found.');
    await page.type(passwordSelector, 'i8":^&$24C`M');
    console.log('[Login Script] Password entered.');

    await page.waitForSelector(loginButtonSelector, { visible: true });
    console.log('[Login Script] Login button found.');
    await page.click(loginButtonSelector);
    
    console.log('[Login Script] Login button clicked. Waiting for navigation...');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log('\n--- Login Successful and Page Navigated ---');
    console.log('[Login Script] This tab will remain open.');

  } catch (error) {
    console.error('\n--- AN ERROR OCCURRED IN THE LOGIN SCRIPT ---');
    console.error(error.message);
  }
}

// Export the function so it can be used in other files
module.exports = { loginToPMI };