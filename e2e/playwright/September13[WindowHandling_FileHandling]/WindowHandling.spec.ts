import { test, expect } from '@playwright/test';

test.only('Window handling - class room assignment', async ({ page, context }) => {
  // Navigate to the page
  await page.goto("https://www.leafground.com/window.xhtml");

  // Create a promise that resolves when a new page (child window) is opened
  const createPromise = context.waitForEvent('page');

  // Click button to open a new window
  await page.locator("//button[@id='j_idt88:new']").click();

  // Resolve the promise → get the child page
  const childPage = await createPromise;

  // Wait for some time (better to wait for load state instead of timeout)
  await childPage.waitForLoadState();

  // Log the title of the child page
  console.log(await childPage.title() + " page title");

  // Close the child page
  await childPage.close();
});
