// Import Playwright's test runner utilities
import { test, expect } from "@playwright/test";

// Group related tests for file handling downloads
test.describe("File Handling - Download", () => {
  // Validate that a file can be downloaded by waiting for the download event
  test("File download using waitForEvent", async ({ page }) => {
    // Navigate to the LeafGround file page which has a download button
    await page.goto("https://www.leafground.com/file.xhtml");

    // Wait for the download event while simultaneously clicking the Download button
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.locator("//span[text()='Download']").first().click(),
    ]);

    // Read the filename suggested by the server/browser for the downloaded file
    const fileName = download.suggestedFilename();

    // Ensure a non-empty filename is provided
    expect(fileName && fileName.length > 0).toBeTruthy();

    // Persist the downloaded file into the repository's utils folder
    await download.saveAs(
      `TestLeaf_PlaywrightAutomationTraining/utils/${fileName}`
    );
    await download.saveAs(
        `TestLeaf_PlaywrightAutomationTraining/downloads/${fileName}`
      );
  });
});
