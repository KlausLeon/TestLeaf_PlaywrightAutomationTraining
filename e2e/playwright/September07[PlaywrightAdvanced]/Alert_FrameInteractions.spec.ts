import { test, expect } from '@playwright/test';

test.describe('Alert & Frame Interactions', () => {
  test('should handle alert interactions within iframe', async ({ page }) => {
    // Load the URL
    await page.goto('https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm');

    // Set up alert event listener to capture alert details
    let alertMessage = '';
    let alertType = '';
    
    page.on('dialog', async (dialog) => {
      alertMessage = dialog.message();
      alertType = dialog.type();
      console.log(`Alert message: ${alertMessage}`);
      console.log(`Alert type: ${alertType}`);
      
      // Accept the alert
      await dialog.accept();
    });

    // Locate the iframe and interact with elements inside it
    const frame = page.frameLocator('#iframeResult');
    
    // Click the "Try it" button inside the iframe
    await frame.locator('button').filter({ hasText: 'Try it' }).click();

    // Wait for the alert to be handled and the result text to appear
    await frame.locator('#demo').waitFor({ state: 'visible' });

    // Retrieve and verify the text after accepting the alert
    const resultText = await frame.locator('#demo').textContent();
    console.log(`Result text: ${resultText}`);
    
    // Verify the expected text appears
    expect(resultText).toBe('You pressed OK!');
    
    // Additional verification of alert details
    expect(alertMessage).toBe('Press a button!');
    expect(alertType).toBe('confirm');
  });
});
