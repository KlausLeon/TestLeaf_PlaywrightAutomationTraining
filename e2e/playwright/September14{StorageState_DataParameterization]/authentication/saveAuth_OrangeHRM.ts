// storageState.js
// Script to log into OrangeHRM and save the authentication state

import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false }); // set to true in CI
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Fill login form (demo credentials)
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Wait until dashboard is loaded (check menu or URL)
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  // Save storage state to file
  await context.storageState({ path: 'authentication/jsonFiles/orangeHrmLogin.json' });

  console.log('✅ Storage state saved to authentication/jsonFiles/orangeHrmLogin.json');

  await browser.close();
})();