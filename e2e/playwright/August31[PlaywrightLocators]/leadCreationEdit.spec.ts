import { test, expect } from "@playwright/test";

// Test data constants
const SALESFORCE_LOGIN_URL = "https://login.salesforce.com";
const USERNAME = "dilip@testleaf.com";
const PASSWORD = "Leaf@2025";
const TEST_LAST_NAME = "Kumar";
const TEST_COMPANY_NAME = "TestLeaf";
const TEST_FIRST_NAME = "John";
const UPDATED_COMPANY_NAME = "UpdatedTestLeaf";

test.describe.serial("Salesforce and LeafTaps Lead Management Automation Tests", () => {
  test("Test 1: Create a new lead in Salesforce with salutation and company details", async ({ page }) => {
    // Step 1: Login to Salesforce
    await page.goto(SALESFORCE_LOGIN_URL);
    await page.locator("#username").fill(USERNAME);
    await page.locator("#password").fill(PASSWORD);
    await page.locator("#Login").click();

    // Step 2: Click on toggle menu button from the left corner
    await page.click(".slds-icon-waffle");

    // Step 3: Click View All and click Sales from App Launcher
    await page.locator("//button[text()='View All']").click();
    await page.locator("//p[text()='Sales']").click();

    // Step 4: Click on Leads tab
    await page.locator("//a[@title='Leads']").click();

    // Wait for Leads page to load

    // Step 5: Click on New button
    await page.locator("//div[@title='New']").click();

    // Step 6: Select Salutation dropdown
    await page
      .locator("//label[text()='Salutation']/following-sibling::div//button")
      .click();
    await page.locator("//span[@title='Mr.']").click();

    // Step 7: Enter the Last Name
    await page
      .locator("//label[text()='Last Name']/following-sibling::div//input")
      .fill(TEST_LAST_NAME);

    // Step 8: Enter the Company Name
    await page
      .locator("//label[text()='Company']/following-sibling::div//input")
      .fill(TEST_COMPANY_NAME);

    // Step 9: Click Save and Verify Leads name created
    await page.locator("//button[@name='SaveEdit']").click();

    // Verify the page title contains the lead name
    await expect(page).toHaveTitle(/.*Lead.*/);

    // Verify success message
    const successMessage = await page
      .locator("//span[@data-aura-class='forceActionsText']")
      .textContent();
    expect(successMessage).toContain("was created");
    // Verify Lead was created successfully
    let expectleadName = "Mr. " + TEST_LAST_NAME;
    await expect(
      page.locator(`//lightning-formatted-name[text()="Mr.  Kumar"]`)
    ).toContainText("Mr.  Kumar");
  });

  test("Test 2: Create and edit lead in LeafTaps CRM system", async ({ page }) => {
    // Step 1: Launch the browser and navigate to leaftaps
    await page.goto("http://leaftaps.com/opentaps/control/main");

    // Step 2: Enter the username
    await page.fill("#username", "DemoSalesManager");

    // Step 3: Enter the password
    await page.fill("#password", "crmsfa");

    // Step 4: Click Login
    await page.click(".decorativeSubmit");

    // Step 5: Click CRM/SFA link
    await page.locator("text=CRM/SFA").click();

    // Step 6: Click Leads link
    await page.click("//a[text()='Leads']");

    // Step 7: Click on Create Lead
    await page.click("//a[text()='Create Lead']");

    // Step 8: Enter company name
    await page.locator("#createLeadForm_companyName").fill(TEST_COMPANY_NAME);

    // Step 9: Enter first name
    await page.locator("#createLeadForm_firstName").fill(TEST_FIRST_NAME);

    // Step 10: Enter last name
    await page.locator("#createLeadForm_lastName").fill(TEST_LAST_NAME);

    // Step 11: Click on Create Lead button
    await page.locator("input[value='Create Lead']").click();

    // Step 12: Click Edit
    await page.locator("text=Edit").click();

    // Step 13: Change the company name
    await page.locator("#updateLeadForm_companyName").clear();
    await page
      .locator("#updateLeadForm_companyName")
      .fill(UPDATED_COMPANY_NAME);

    // Step 14: Click Update
    await page.locator("input[value='Update']").click();

    // Verify the company name was updated successfully
    const updatedCompanyName = await page
      .locator("#viewLead_companyName_sp")
      .textContent();
    expect(updatedCompanyName).toContain(UPDATED_COMPANY_NAME);
  });

  test("Test 3: Create a new individual record in Salesforce with last name", async ({ page }) => {
    // Step 1: Login to Salesforce
    await page.goto(SALESFORCE_LOGIN_URL);
    await page.locator("#username").fill(USERNAME);
    await page.locator("#password").fill(PASSWORD);
    await page.locator("#Login").click();

    // Step 2: Click on the toggle menu button from the left corner
    await page.locator("//div[@class='slds-icon-waffle']").click();

    // Step 3: Click View All and click Individuals from App Launcher
    await page.locator("//button[text()='View All']").click();

    // Step 4: Filter the Dropdown option in the View All tab
    await page
      .getByPlaceholder("Search apps or items...")
      .pressSequentially("Individuals");
    await page.locator("//mark[text()='Individuals']").click();

    // Step 5: Click on New Individual
    await page.locator("(//a[@title='New'])[1]").click();

    // Step 7: Enter the Last Name
    await page.getByPlaceholder("Last Name").fill(TEST_LAST_NAME);
    // Step 8: Click save and verify Individuals Name
    await page.locator("//button[@title='Save']").click();
    // Verify success message
    await expect(
      page.locator("//div[starts-with(@id, 'toastDescription')]")
    ).toContainText("was created");

    // Verify Individual was created successfully
    await expect(
      page.locator(`//div[@title='${TEST_LAST_NAME}']`)
    ).toContainText(TEST_LAST_NAME);
  });

  test("Test 4: Search, edit and update individual record with salutation and first name in Salesforce", async ({ page }) => {
    // Step 1: Login to Salesforce
    await page.goto(SALESFORCE_LOGIN_URL);
    await page.locator("#username").fill(USERNAME);
    await page.locator("#password").fill(PASSWORD);
    await page.locator("#Login").click();

    // Step 2: Click on the toggle menu button from the left corner
    await page.locator("//div[@class='slds-icon-waffle']").click();

    // Step 3: Click View All and click Individuals from App Launcher
    await page.locator("//button[text()='View All']").click();
    await page
      .getByPlaceholder("Search apps or items...")
      .pressSequentially("Individuals");

    // Wait for Individuals app to load

    // Step 4: Click on the Individuals tab
    await page.locator("//mark[text()='Individuals']").click();

    // Wait for Individuals page to load

    // Step 5: Search the Individuals last name
    await page
      .locator("//input[@placeholder='Search this list...']")
      .fill(TEST_LAST_NAME);
    await page.keyboard.press("Enter");

    // Step 6: Click on the Dropdown icon and Select Edit
    await page.locator("a[title='Show 2 more actions']").click();
    await page.locator("//a[@title='Edit']").click();

    // Wait for edit form to load

    // Step 7: Select Salutation as 'Mr'
    await page
      .locator("//label[text()='Salutation']/following-sibling::div//button")
      .click();
    await page.locator("//span[@title='Mr.']").click();

    // Step 8: Now enter the first name
    await page
      .locator("//label[text()='First Name']/following-sibling::div//input")
      .fill(TEST_FIRST_NAME);

    // Step 9: Click on Save and Verify the first name
    await page.locator("//button[@name='SaveEdit']").click();

    // Wait for save to complete

    // Verify Individual was updated successfully
    const updatedIndividualName = await page
      .locator("//lightning-formatted-text[@field-name='Name']")
      .textContent();
    console.log(`Individual updated successfully: ${updatedIndividualName}`);

    // Verify the first name is displayed
    const firstName = await page
      .locator("//lightning-formatted-text[@field-name='FirstName']")
      .textContent();
    expect(firstName).toBe(TEST_FIRST_NAME);

    // Verify success message
    const successMessage = await page
      .locator("//span[@data-aura-class='forceActionsText']")
      .textContent();
    expect(successMessage).toContain("was saved");
  });
});
