let { test, expect, devices } = require('@playwright/test');
const { copyFileSync } = require('fs');

test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
});

test.afterEach(async ({ page }) => {
    await page.close();
});


test('Test HomePage Url', async ({ page }) => {
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/');
    console.log('Test HomePage Url Passed')
});
  
test('Test HomePage Title', async ({ page }) => {
    await expect(page).toHaveTitle('ProtoCommerce')
    console.log('Test HomePage Title Passed')
});

test('Test HomePage', async ({ page }) => {
    await page.locator('form input[name="name"]').fill('Aravind MS');
    await page.locator('input[name="email"]').fill('arvindsudhi44@gmail.com');
    await page.getByPlaceholder('Password').fill('Arvind1234#');
    await page.getByText('Check me out if you Love').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByText('Employed').click();
    await page.locator('input[name="bday"]').fill('1995-12-04');
    await page.getByRole('heading', { name: 'Two-way Data Binding example:' }).getByRole('textbox').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    expect(await page.getByText('× Success! The Form has been').textContent()).toContain('Success! The Form has been submitted successfully!.');
    console.log("Test HomePage Passed");
});
