import { test, expect } from "@playwright/test";

test("Handle frame with  index Value", async ({ page }) => {
  await page.goto("https://www.leafground.com/frame.xhtml");
  //count of frames
  const frameCount = page.frames();

  console.log("Frame count is " + frameCount.length);

  //main page also considered as frame  -> index 0
  //first frame -> index 1
  //second frame -> index 2
  //third frame -> index 3
  //fourth frame -> index 4

  const Frame = frameCount[1];
  console.log(
    "Before handle frame: " + (await Frame.locator("#Click").innerText())
  );
  await Frame.locator("#Click").click();
  console.log(
    "After handle frame: " + (await Frame.locator("#Click").innerText())
  );

  //nested frame
  const nestFrame = frameCount[4];
  await nestFrame.locator("#Click").click();
  await page.waitForTimeout(5000);
});

// Classwork Assignment: Frame Handling with Detailed Implementation
test("Classwork Assignment: Frame Interactions and Assertions", async ({ page }) => {
  // Navigate to the LeafGround frame testing page as specified in requirements
  await page.goto("https://leafground.com/frame.xhtml");

  // Get the total count of frames present in the page (including main page)
  const allFrames = page.frames(); // Retrieve all available frames on the page
  const totalFrameCount = allFrames.length; // Count total number of frames
  console.log(`Total frames count: ${totalFrameCount}`); // Log the frame count for verification

  // Interact with the Click Me button inside the first frame (index 1)
  const firstFrame = allFrames[1]; // Access the first iframe (main page is index 0)
  
  // Capture the initial text before clicking to verify it changes later
  const initialText = await firstFrame.locator("#Click").innerText(); // Get text content of the button
  console.log(`Initial text in first frame: "${initialText}"`); // Log initial state for debugging
  
  // Click the "Click Me" button inside the first frame
  await firstFrame.locator("#Click").click(); // Perform the click action on the button
  
  // Wait a moment for the text to update after the click
  await page.waitForTimeout(1000); // Brief pause to ensure DOM updates
  
  // Capture the text after clicking to verify the change
  const updatedText = await firstFrame.locator("#Click").innerText(); // Get updated text content
  console.log(`Updated text in first frame: "${updatedText}"`); // Log updated state for debugging
  
  // Assert that the text changed after clicking the button
  expect(updatedText).not.toBe(initialText); // Verify text has changed from initial state
  expect(updatedText).toContain("Hurray"); // Verify the new text contains expected content

  // Interact with the Click Me button present inside the nested frames (index 4)
  const nestedFrame = allFrames[4]; // Access the nested iframe (fourth frame)
  
  // Capture the initial text in the nested frame before clicking
  const nestedInitialText = await nestedFrame.locator("#Click").innerText(); // Get initial text in nested frame
  console.log(`Initial text in nested frame: "${nestedInitialText}"`); // Log initial nested frame state
  
  // Click the "Click Me" button inside the nested frame
  await nestedFrame.locator("#Click").click(); // Perform click action in nested frame
  
  // Wait for the nested frame text to update
  await page.waitForTimeout(1000); // Brief pause for DOM updates in nested frame
  
  // Capture the text after clicking in the nested frame
  const nestedUpdatedText = await nestedFrame.locator("#Click").innerText(); // Get updated text in nested frame
  console.log(`Updated text in nested frame: "${nestedUpdatedText}"`); // Log updated nested frame state
  
  // Assert that the text changed after clicking the button in nested frame
  expect(nestedUpdatedText).not.toBe(nestedInitialText); // Verify nested frame text has changed
  expect(nestedUpdatedText).toContain("Hurray"); // Verify nested frame contains expected content
  
  // Additional verification: Ensure we can effectively switch between frames
  console.log("Successfully handled frame switching and interactions"); // Log successful completion
  
  // Final wait to observe the results before test completion
  await page.waitForTimeout(2000); // Extended wait to see final state
});