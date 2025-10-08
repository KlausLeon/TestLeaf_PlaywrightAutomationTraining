import test, { expect } from "@playwright/test";

test.describe("OrangeHRM Tests", () => {
  test.use({
    storageState: "authentication/jsonFiles/orangeHrmLogin.json",
  });

  test("Check OrangeHRM Dashboard", async ({ page }) => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
    await page.click('//span[text()="Admin"]');
  });
});

test.describe("LeafTaps Tests", () => {
  test.use({
    storageState: "authentication/jsonFiles/leafTapsLogin.json",
  });

  test("Click on Account tap", async ({ page }) => {
    await page.goto("http://leaftaps.com/crmsfa/control/main");
    await page.click("//a[text()='Accounts']");
    await page.waitForTimeout(3000);
  });
});