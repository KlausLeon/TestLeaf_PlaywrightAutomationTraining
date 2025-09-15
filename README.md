# TestLeaf_PlaywrightAutomationTraining
# Initialize package.json
npm init -y
# Install Playwright Test + TypeScript
npm install -D @playwright/test typescript ts-node
# Install browsers:

npx playwright install

# Run the Test
npx playwright test


# Run in headed mode:

npx playwright test --headed