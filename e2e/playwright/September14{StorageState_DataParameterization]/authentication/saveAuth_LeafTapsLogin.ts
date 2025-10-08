// save-auth.ts
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://leaftaps.com/crmsfa/control/main");
  await page.fill('//input[@name="USERNAME"]', "DemoSalesManager");
  await page.fill('//input[@name="PASSWORD"]', "crmsfa");
  await page.click('//input[@value="Login"]');

  // Save storage state to file:
  await context.storageState({ path: 'authentication/jsonFiles/leafTapsLogin.json' });
  await browser.close();
  console.log('Saved storageState -> authentication/jsonFiles/leafTapsLogin.json');
})();