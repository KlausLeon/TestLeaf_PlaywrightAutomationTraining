import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library

test.describe('Alert & Frame Interactions', () => { // Group related tests under a suite title
  test('should handle alert interactions within iframe', async ({ page }) => { // Define a single test using a fresh Page
    // Navigate to a sample page that triggers a confirm dialog inside an iframe
    await page.goto('https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm');

    // Prepare variables to capture dialog (alert/confirm) details when it appears
    let alertMessage = ''; // Will hold the dialog message text
    let alertType = ''; // Will hold the dialog type (e.g., 'alert', 'confirm', 'prompt')

    // Listen for any dialog events fired by the page and handle them
    page.on('dialog', async (dialog) => { // Event triggers when a dialog appears
      alertMessage = dialog.message(); // Capture the text shown in the dialog
      alertType = dialog.type(); // Capture the dialog type
      console.log(`Alert message: ${alertMessage}`); // Log the message for debugging
      console.log(`Alert type: ${alertType}`); // Log the type for debugging

      // Accept the dialog to proceed (clicks OK on confirm/alert)
      await dialog.accept(); // Dismiss the dialog positively
    });

    // Get a locator scoped to the iframe that contains the interactive content
    const frame = page.frameLocator('#iframeResult'); // Target iframe by CSS id

    // Inside the iframe, click the "Try it" button that triggers the confirm dialog
    await frame.getByRole('button', {name:"Try it"}).click(); // Initiate dialog

    // After accepting the dialog, wait for the result text element to become visible
    await frame.locator('#demo').waitFor({ state: 'visible' }); // Ensure the result is rendered

    // Read the text content updated by the page after dialog interaction
    const resultText = await frame.locator('#demo').textContent(); // Fetch displayed outcome
    console.log(`Result text: ${resultText}`); // Log the outcome for visibility

    // Assert that the page indicates we pressed OK on the confirm dialog
    expect(resultText).toBe('You pressed OK!'); // Validate the expected result

    // Also assert we captured the correct dialog details from the event
    expect(alertMessage).toBe('Press a button!'); // Confirm dialog message text
    expect(alertType).toBe('confirm'); // Confirm dialog type is 'confirm'
  });
});
