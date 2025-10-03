// Import Playwright test APIs and Chromium browser launcher
import { test, expect, chromium } from "@playwright/test";

// Define a test to demonstrate opening and handling a new window
test("Window handling - class room assignment", async ({ page, context }) => {
  // Open the target page with window-handling widgets
  await page.goto("https://www.leafground.com/window.xhtml");

  // Prepare to wait for a newly opened page event (child window)
  const createPromise = context.waitForEvent("page");

  // Click the button that triggers opening a new window
  await page.locator("//button[@id='j_idt88:new']").click();

  // Await the new page reference once the event fires
  const childPage = await createPromise;

  // Ensure the new page has finished loading network and DOM
  await childPage.waitForLoadState();

  // Print the title of the child window to the console
  console.log((await childPage.title()) + " page title");

  // Close the child window to clean up
  await childPage.close();
});
// Demonstrate using two independent browser contexts (separate windows)
test("Multiple Context - Multiple Browsers", async () => {
  // Launch a Chromium browser (Chrome channel)
  const browser = await chromium.launch({ channel: "chrome" });
  // Create first isolated browser context (separate storage/session)
  const context1 = await browser.newContext();
  // Create second isolated browser context
  const context2 = await browser.newContext();
  // Open a page in the first context
  const page1 = await context1.newPage();
  // Navigate first page to ChatGPT site
  await page1.goto("https://chatgpt.com/?hints=search");
  // Wait for the page to finish loading
  await page1.waitForLoadState();
  // Small pause for demonstration/visual stability
  await page1.waitForTimeout(2000);
  // Log the title of the first page
  console.log(await page1.title());
  // Open a page in the second context
  const page2 = await context2.newPage();
  // Navigate second page to a sample site
  await page2.goto("https://www.rajagiritech.ac.in/home/Academics/rsms.asp");
  // Small pause for demonstration/visual stability
  await page2.waitForTimeout(2000);
  // Ensure the second page has finished loading
  await page2.waitForLoadState();
  // Log the title of the second page
  console.log(await page2.title());
  // Close first context and all its pages
  await context1.close();
  // Close second context and all its pages
  await context2.close();
  // Close the browser instance
  await browser.close();
});
// Demonstrate multiple pages within the same browser context (single window/session)
test("Multiple Context - Single Browser", async () => {
  // Launch a Chromium browser (Chrome channel)
  const browser = await chromium.launch({ channel: "chrome" });
  // Create one shared browser context
  const context1 = await browser.newContext();
  // Open the first page in the shared context
  const page1 = await context1.newPage();
  // Navigate to ChatGPT site on first page
  await page1.goto("https://chatgpt.com/?hints=search");
  // Wait for the page to load fully
  await page1.waitForLoadState();
  // Small pause for demonstration/visual stability
  await page1.waitForTimeout(2000);
  // Log the title of the first page
  console.log(await page1.title());
  // Open a second page in the same context (shared storage/session)
  const page2 = await context1.newPage();
  // Navigate second page to a sample site
  await page2.goto("https://www.rajagiritech.ac.in/home/Academics/rsms.asp");
  // Small pause for demonstration/visual stability
  await page2.waitForTimeout(2000);
  // Ensure the second page has finished loading
  await page2.waitForLoadState();
  // Log the title of the second page
  console.log(await page2.title());
  // Close the context (closes both pages)
  await context1.close();
  // Close the browser instance
  await browser.close();
});

test("Handle the single browser window", async ({ page, context }) => {
  // 1. Go to Amazon India
  await page.goto("https://www.amazon.in");

  const txtBx_search = page.locator("#twotabsearchtextbox");
  await txtBx_search.fill("Apple iphone 17");
  await txtBx_search.press("Enter");

  // 2. Click on the first matching iPhone result, opening a new page
  const [childPage] = await Promise.all([
    context.waitForEvent("page"),
    // Use a more robust locator (maybe contains “iPhone” or matches partially),
    // .first() to pick first
    page.getByText("iPhone Air 1 TB").first().click(),
  ]);

  // Wait for the child page to load
  await childPage.waitForLoadState("domcontentloaded");

  console.log("Child page title:", await childPage.title());

  // 3. Get MRP (price) from the child page
  const MRP = await childPage
    .locator("#corePriceDisplay_desktop_feature_div")
    .first()
    .innerText();
  console.log("MRP:", MRP);

  // Close the child page so you come back to main page context
  await childPage.close();

  // 4. Back on the original page, search for “labubu”
  await txtBx_search.fill("labubu");
  await txtBx_search.press("Enter");

  // 5. Click “See all products, across price ranges.” if that link appears
  // Use a safer locator (XPath or text) and guard if it doesn't exist
  const seeAll = page.locator('//a[text()="See all products, across price ranges."]');
  if (await seeAll.count() > 0) {
    await seeAll.click();
  }

  // 6. Click a product (“Niku Doll”), opening in a new window
  const [childPage2] = await Promise.all([
    context.waitForEvent("page"),
    page.getByText("Niku Doll").first().click(),
  ]);

  await childPage2.waitForLoadState("domcontentloaded");
  console.log("Child2 title:", await childPage2.title());

  // Add to cart, go to cart
  await childPage2.locator("#add-to-cart-button").click();
  await childPage2.getByText("Go to Cart").first().click();
  await childPage2.waitForLoadState("domcontentloaded");

  // Validate title contains “Shopping Cart”
  await expect(childPage2.title()).resolves.toContain("Amazon.in Shopping Cart");

  // Confirm the “Proceed to Checkout” button is enabled
  const proceedBtn = childPage2.locator('//input[@name="proceedToRetailCheckout"]');
  await expect(proceedBtn).toBeEnabled();

  // 7. Click the same product in cart to open its detail in new page
  const [childPage3] = await Promise.all([
    context.waitForEvent("page"),
    childPage2.locator(
      '//span[contains(text(),"Niku Doll (30cm, Pink) | Soft Plush Doll Toy with Rabbit Ear")]'
    ).first().click(),
  ]);

  await childPage3.waitForLoadState("domcontentloaded");
  const title3 = await childPage3.title();
  console.log("Child3 title:", title3);

  // Optionally assert something about title
  await expect(childPage3.title()).resolves.toContain("Buy Niku Doll");
});

test("Handle multiple browser windows", async ({ page, context }) => {
  // Navigate to the LeafGround window handling demo page
  await page.goto("https://leafground.com/window.xhtml");

  // Click the "Open Multiple" button and wait for a new page (window/tab) to open
  const [childPage] = await Promise.all([
    context.waitForEvent("page"), // Wait for a new page event in the browser context
    page.getByRole("button", { name: "Open Multiple" }).click(), // Click the button to open multiple windows
  ]);

  // Wait until the newly opened child page is fully loaded
  await childPage.waitForLoadState();

  // Retrieve all open pages (parent and all children) in the current browser context
  const pages = context.pages();
  const pagesCount = pages.length; // Count the number of open pages
  console.log("No. of Web Pages opened: " + pagesCount); // Log the number of open pages

  // Declare variables to hold references to the Dashboard and Web Table pages
  let dashBoardPage: any;
  let webTablePage: any;

  // Iterate through all open pages to identify them by their titles
  for (const p of pages) {
    const title = await p.title(); // Get the title of the current page
    console.log("Page title: " + title); // Log the page title
    if (title.includes("Dashboard")) {
      dashBoardPage = p; // Assign the Dashboard page
    } else if (title.includes("Web Table")) {
      webTablePage = p; // Assign the Web Table page
    }
  }

  // Log the URLs of the Dashboard and Web Table pages
  console.log("Dashboard URL: " + (await dashBoardPage.url()));
  console.log("Web Table URL: " + (await webTablePage.url()));

  // Function to generate a random dynamic email address
  const generateDynamicEmail = (): string =>
    `Senior.Tester${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}@testleaf.com`;

  // Generate a random email address for use in the form
  let email = generateDynamicEmail();

  // Fill the email and message fields on the Dashboard page with the generated email
  await dashBoardPage.locator("#email").fill(email);
  await dashBoardPage.locator("#message").fill(email);

  // Click the "Send" button on the Dashboard page
  await dashBoardPage.locator('//span[text()="Send"]').click();

  // Bring the original parent page (main window) to the front
  await page.bringToFront();

  // Click the "Open" button on the parent page and wait for a new page to open
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // Wait for a new page event
    await page.locator('//span[text()="Open"]').click(), // Click the "Open" button
  ]);

  // Fill the email and message fields on the newly opened page with the same email
  await newPage.locator("#email").fill(email);
  await newPage.locator("#message").fill(email);

  // Click the "Send" button on the new page
  await newPage.locator('//span[text()="Send"]').click();
});
