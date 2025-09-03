import { test, expect } from "@playwright/test";
const url = "http://leaftaps.com/opentaps/control/main";
const username = "Demosalesmanager";
const password = "crmsfa";
const firstName = "Leon";
const lastName = "Smith";
const company = "NewCompanyXYZ";
const annualRevenue = 500000;
const department = "Marketing";
const description = "Updated description";

test.describe.serial('Leads flow (create -> edit)', () => {
  test("Create Lead in Leaftaps", async ({ page }) => {
    // Step 1: Navigate to the application URL
    await page.goto("http://leaftaps.com/opentaps/control/main");

    // Step 2: Enter the username as 'Demosalesmanager'
    // (using the application's expected username)
    await page.locator("#username").fill("DemoSalesManager");

    // Step 3: Enter the password as 'crmsfa'
    await page.locator("[name=PASSWORD]").fill("crmsfa");

    // Step 4: Click the Login button
    await page.locator(".decorativeSubmit").click();

    // Step 5: Click CRM/SFA to navigate to the CRM dashboard
    await page.locator("text=CRM/SFA").click();

    // Step 6: Click Leads from the CRM menu
    await page.locator("//a[text()='Leads']").click();

    // Step 7: Click Create Lead to open the lead creation form
    await page.locator("//a[text()='Create Lead']").click();

    // Step 8: Fill the Company Name
    const companyName = "TestLeaf";
    await page.locator("#createLeadForm_companyName").fill(companyName);

    // Step 9: Fill the First Name
    await page.locator("#createLeadForm_firstName").fill(firstName);

    // Step 10: Fill the Last Name
    await page.locator("#createLeadForm_lastName").fill(lastName);

    // Step 11: Fill the Salutation (personal title)
    await page.locator("#createLeadForm_personalTitle").fill("Mr.");

    // Step 12: Fill the Title (professional title)
    await page
      .locator("#createLeadForm_generalProfTitle")
      .fill("Software Engineer");

    // Step 13: Fill the Annual Revenue
    await page.locator("#createLeadForm_annualRevenue").fill(annualRevenue.toString());

    // Step 14: Fill the Department
    await page.locator("#createLeadForm_departmentName").fill(department);

    // Step 15: Fill the Phone number
    await page.locator("#createLeadForm_primaryPhoneNumber").fill("1234567890");

    // Step 16: Click Create Lead button to submit the form
    await page.locator(".smallSubmit").click();

    // Step 17: Verify the company name, first name, last name and the status
    const viewCompanyName = await page
      .locator("#viewLead_companyName_sp")
      .textContent();
    const viewFirstName = await page
      .locator("#viewLead_firstName_sp")
      .textContent();
    const viewLastName = await page
      .locator("#viewLead_lastName_sp")
      .textContent();
    const status = await page.locator("#viewLead_statusId_sp").textContent();

    // Log the verification details
    console.log("Company Name:", viewCompanyName);
    console.log("First Name:", viewFirstName);
    console.log("Last Name:", viewLastName);
    console.log("Status:", status);

    // Step 18: Get the page title
    const title = await page.title();
    console.log("Page Title:", title);
  });
  
  test("Edit lead details and verify changes", async ({ page }) => {
    // define the test and receive the Playwright page

    await page.goto(url); // navigate to the application URL
    await page.fill("#username", username); // fill the username field
    await page.fill("#password", password); // fill the password field
    await page.click(".decorativeSubmit"); // click the login button
    await page.click("text=CRM/SFA"); // click the CRM/SFA link to enter the CRM

    await page.click("text=Leads"); // click the Leads link
    await page.click('//a[text()="Find Leads"]'); // click the Find Leads link

    // Enter first name and search
    await page.fill('(//input[@name="firstName"])[3]', firstName); // enter the first name into the search field
    await page.click('//button[text()="Find Leads"]'); // click the Find Leads button to perform the search
    // Wait for results and click first lead id
    const firstLead = page
      .locator('xpath=//div[@class="x-grid3-cell-inner x-grid3-col-partyId"]/a')
      .first(); // select the first result's lead id link
    await expect(firstLead).toBeVisible({ timeout: 10000 }); // wait until the first lead link is visible
    await firstLead.click(); // click the first lead id to open the lead details

    // Click Edit
    await page.click("text=Edit"); // click the Edit button to modify lead details

    // Update fields
    await page.fill("#updateLeadForm_companyName", company);
    await page.fill("#updateLeadForm_annualRevenue", annualRevenue.toString());
    await page.fill("#updateLeadForm_departmentName", department);
    await page.fill("#updateLeadForm_description", description);

    // Click Update
    await page.click(".smallSubmit"); // click the Update button to save changes

    // Verify edited fields on view page (allowing for slight variations in element ids)
    const companyView = page.locator(
      "#viewLead_companyName_sp, #viewLead_companyName"
    );
    await expect(companyView).toContainText(company);

    const value = Number(((await page.locator('#viewLead_annualRevenue_sp, #viewLead_annualRevenue').textContent()) ?? '').replace(/\u00A0/g, ' ').replace(/[^0-9.-]/g, '')); 
    expect(Number.isFinite(value)).toBeTruthy(); 
    expect(value).toBe(annualRevenue);


    const deptView = page.locator(
      "#viewLead_departmentName_sp, #viewLead_departmentName"
    );
    await expect(deptView).toContainText(department);

    const descView = page.locator(
      "#viewLead_descriptionValue_sp, #viewLead_description_sp, #viewLead_description"
    );
    await expect(descView).toContainText(description);

    // Print the page title
    console.log(await page.title()); // log the current page title to the console
  });
});
