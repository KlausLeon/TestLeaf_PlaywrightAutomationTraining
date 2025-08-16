import { test, expect } from '@playwright/test';

test('User creation and login', async ({ page }) => {
  // Navigate to the e-commerce playground
  await page.goto("https://ecommerce-playground.lambdatest.io/");

  // Hover over the menu and click "Login"
  await page.hover("#widget-navbar-217834 > ul > li:nth-child(6) > a");
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByText("Continue").click();

  // Generate random user details
  const randomInt = () => Math.floor(Math.random() * 1000); // Generate a random integer between 0 and 999
  const firstname = "Abc" + randomInt();
  const lastname = "Xyz" + randomInt();
  const email = `${firstname}.${lastname}@gmail.com`;
  const password = `${lastname}007`;

  // Fill the registration form
  await page.getByLabel("First Name").fill(firstname);
  await page.getByLabel("Last Name").fill(lastname);
  await page.getByLabel("E-Mail").fill(email);
  await page.getByLabel("Telephone").fill("+918129272066");
  await page.locator("#input-password").fill(password);
  await page.locator("#input-confirm").fill(password);

  // Agree to terms and continue
  await page.check('#content > form > div > div > div > label');
  expect(await page.isChecked('#content > form > div > div > div > label')).toBe(true);
  await page.getByRole('button', { name: "Continue" }).click();

  // Verify account creation
  await expect(page.locator(".page-title.my-3")).toContainText("Your Account Has Been Created!");
  console.log(`New user created successfully`);
  console.log(`Email ID: ${email} `);
  console.log(`Password ${password} `);

  // Navigate to the account page
  await page.locator("#content > div > a").click();
  await expect(page.locator("#account-account > nav > ol > li.breadcrumb-item.active")).toHaveText("Account");

  // Logout
  await page.hover("#widget-navbar-217834 > ul > li:nth-child(6) > a > div > span");
  await page.locator("li[class='nav-item dropdown dropdown-hoverable show'] li:nth-child(6) a:nth-child(1)").click();
  await expect(page.locator("//h1[normalize-space()='Account Logout']")).toContainText("Account Logout");
  // Continue after logout
  await page.getByRole("link", { name: "Continue" }).click();
  // Login with the newly created user
  await page.locator("#widget-navbar-217834 > ul > li:nth-child(6) > a > div > span").click();
  await expect(page.locator("//h2[normalize-space()='Returning Customer']")).toContainText("Returning Customer");
  await page.getByPlaceholder("E-Mail Address").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  
  // Verify successful login
  await expect(page.locator("#content > div:nth-child(1) > h2")).toContainText("My Account");
});
