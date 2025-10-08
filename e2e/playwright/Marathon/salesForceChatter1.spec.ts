import { test, expect } from '@playwright/test'

test.describe('Salesforce - Create Case with New Contact/Account and Chatter Like', () => {

    test('End-to-end flow', async ({ page, browserName }) => {
        // 1) Launch browser is implicit; Playwright launches the requested browser via CLI config

        // 2) Load login URL
        await page.goto('https://login.salesforce.com/')
        await expect(page).toHaveTitle(/Salesforce/)

        // 3) Login
        await page.getByLabel('Username').fill('noellues5300505@agentforce.com')
        await page.getByLabel('Password').fill('Astalavista@123')
        await page.getByRole('button', { name: 'Log In' }).click()
        await page.waitForTimeout(10000)
        // Verify login by checking for App Launcher visibility
        await expect(page.getByLabel('App Launcher')).toBeVisible()

        // 4) Click App Launcher
        await page.getByLabel('App Launcher').click()

        // 5) Click View All
        await page.getByRole('button', { name: 'View All' }).click()
        await expect(page.getByRole('dialog')).toBeVisible()

        // 6) Search and open Service app
        await page.getByPlaceholder('Search apps and items...').fill('Service')
        await page.getByRole('link', { name: /^Service$/ }).first().click()

        // 7) Navigate to Cases tab
        const casesTab = page.getByRole('tab', { name: 'Cases' })
        await casesTab.click()
        await expect(page.getByRole('heading', { name: 'Cases' })).toBeVisible()

        // 8) Click New
        await page.getByRole('button', { name: /^New$/ }).first().click()
        await expect(page.getByRole('dialog')).toBeVisible()

        // 9) Open Contact Name lookup and choose New Contact
        const contactLookup = page.locator("input[placeholder='Search Contacts...']").first()
        await contactLookup.click()
        const newContactLink = page.getByRole('option', { name: 'New Contact' })
        await expect(newContactLink).toBeVisible()
        await newContactLink.click()

        // 10) Fill New Contact form
        const salutation = page.getByLabel('Salutation')
        if (await salutation.isVisible()) {
            await salutation.selectOption({ label: 'Mr.' })
        }
        const firstName = page.getByLabel('First Name')
        const lastName = page.getByLabel('Last Name')
        await firstName.fill('John')
        await lastName.fill('Doe')
        await page.getByRole('button', { name: /^Save$/ }).click()
        await expect(page.getByText('Contact was created')).toBeVisible({ timeout: 15000 })

        // 13) Open Account Name lookup and choose New Account
        const accountLookup = page.locator("input[placeholder='Search Accounts...']").first()
        await accountLookup.click()
        const newAccountLink = page.getByRole('option', { name: 'New Account' })
        await expect(newAccountLink).toBeVisible()
        await newAccountLink.click()

        // 14) Fill New Account form
        await page.getByLabel('Account Name').fill('Acme Corp ' + Date.now())
        const accountNumber = page.getByLabel('Account Number')
        if (await accountNumber.isVisible()) {
            await accountNumber.fill(String(Math.floor(Math.random() * 100000)))
        }
        const rating = page.getByLabel('Rating')
        if (await rating.isVisible()) {
            // 15) Select Rating = Hot
            await rating.selectOption({ label: 'Hot' })
        }
        await page.getByRole('button', { name: /^Save$/ }).click()
        await expect(page.getByText('Account was created')).toBeVisible({ timeout: 15000 })

        // 17) Set Status = New
        const status = page.getByLabel('Status')
        await status.selectOption({ label: 'New' })

        // 18) Set Priority = High
        const priority = page.getByLabel('Priority')
        await priority.selectOption({ label: 'High' })

        // 19) Case Origin = Email
        const origin = page.getByLabel('Case Origin')
        await origin.selectOption({ label: 'Email' })

        // 20) Subject, Description
        await page.getByLabel('Subject').fill('Product Return Request')
        await page.getByLabel('Description').fill('Requesting a return for a defective product')

        // 21) Save Case
        await page.getByRole('button', { name: /^Save$/ }).click()
        await expect(page.getByText('was created')).toBeVisible({ timeout: 20000 })
        await expect(page.getByRole('heading')).toContainText('Case')

        // 22) Edit Status to Escalated under Details
        await page.getByRole('button', { name: 'Edit Status' }).click()
        await page.getByLabel('Status').selectOption({ label: 'Escalated' })
        await page.getByRole('button', { name: /^Save$/ }).click()
        await expect(page.getByText('was saved')).toBeVisible({ timeout: 15000 })

        // 24) Share an update
        await page.getByPlaceholder('Share an update...').fill('Automated update posted via Playwright')
        await page.getByRole('button', { name: /^Share$/ }).click()
        await expect(page.getByText('Automated update posted')).toBeVisible({ timeout: 15000 })

        // 25) Like on Chatter
        await page.getByRole('button', { name: /^More Actions$/ }).click({ timeout: 15000 })
        const likeOption = page.getByRole('menuitem', { name: 'Like on Chatter' })
        await likeOption.click()
        await expect(page.getByText('Post was liked')).toBeVisible({ timeout: 15000 })

        // 26) Navigate to Chatter tab and verify post is liked
        await page.getByRole('tab', { name: 'Chatter' }).click()
        await expect(page.getByText('Automated update posted')).toBeVisible({ timeout: 15000 })
        await expect(page.getByLabel('Like').or(page.getByText('You like this'))).toBeVisible({ timeout: 15000 })
    })
})


