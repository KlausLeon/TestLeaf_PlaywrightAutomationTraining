import { test, expect } from "@playwright/test";
test("Create new Salesforce Account", async ({ page }) => {
  // Step 1: Navigate to Salesforce login URL
  await page.goto("https://login.salesforce.com/");

  // Step 2: Enter username using getByLabel
  await page.getByLabel("Username").fill("dilip@testleaf.com");

  // Step 3: Enter password using getByLabel
  await page.getByLabel("Password").fill("Leaf@2025");
  
  // Step 4: Click Login
  await page.getByRole("button", { name: "Log In" }).click();

  await page.waitForTimeout(4000);
  
  // Step 5: Verify the title and URL of the page using appropriate assertions
  await expect(page).toHaveTitle(/.*Salesforce.*/);
  await expect(page).toHaveURL(/.*ed.develop.lightning.force\.com.*/);

  // Step 6: Click App Launcher using the class locator
  await page.locator(".appLauncher").click();

  // Step 7: Click View All using getByText
  await page.getByText("View All").click();

  //await page.waitForTimeout(4000);
  // Step 8: Enter 'Service' in the App Launcher Search box using getByPlaceHolder
  await page.getByPlaceholder("Search apps or items...").pressSequentially("Service");

  // Step 9: Click Service using index based XPath
  await page.locator("(//mark[text()='Service'])[1]").click();

  // Step 10: Click Accounts using attribute based CSS selector
  await page.locator("a[href*='Account']").click();

  // Step 11: Click New using getByRole
  await page.getByRole("button", { name: "New" }).click();

  // Step 12: Enter Account name using attribute based CSS selector
  const accountName = "Test Account " + Date.now();
  await page.locator("input[name='Name']").fill(accountName);

  // Step 13: Click Save button using XPath
  await page.locator("//button[text()='Save']").click();

  // Step 14: Verify the toast message displayed
  const toastMessage = page.locator(".toastMessage");
  await expect(toastMessage).toBeVisible();
  let successMessage = "Account \""+accountName+"\" was created";
  await expect(toastMessage).toContainText(successMessage);
});
