let { test, chromium, expect } = require('@playwright/test');
let browser;
let context;
let page;

test.beforeEach(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await browser.newPage();
});
  
test.afterEach(async () => {
    await page.close();
    await context.close();
    await browser.close();
});

test('@CIRCULATIONAPP TEST ASCENDING SORT', async ({ page }) => {
    await page.goto('https://development.circulation.care/login');
    await page.getByPlaceholder('Email Address').fill('aravind.ms111@modivcare.com');
    await page.getByLabel('Continue').click();
    await page.getByPlaceholder('Password').fill('Arvind12345678#');
    await page.getByLabel('Log In').click();
    await page.getByTestId('Admin-nav-item').click();
    await page.getByRole('cell', { name: 'Phone', exact: true }).click();
    const elements = await page.$$('//tbody/tr/td[6]');
    await page.locator('//tbody/tr[1]/td[6]').waitFor();

    const textContents = await Promise.all(elements.map(element =>
    page.evaluate(el => el.textContent, element)
    ));

    const phonemumbers = textContents.sort();
    expect(textContents).toBe(phonemumbers);
    await page.getByRole('button', { name: 'T TPP-1045 TESTING' }).click();
    await page.getByTestId('log-out-btn').click();
    console.log('TEST ASCENDING SORT PASSED');
});