let { test, expect, devices } = require('@playwright/test');
const { copyFileSync } = require('fs');

test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/shop');
});

test.afterEach(async ({ page }) => {
    await page.close();
});


test('Test ShopPage Url', async ({ page }) => {
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    console.log('Test ShopPage Url Passed')
});
  
test('Test ShopPage Title', async ({ page }) => {
    await expect(page).toHaveTitle('ProtoCommerce')
    console.log('Test ShopPage Title Passed')
});

test('Test Purchase', async ({ page }) => {
    await page.locator('.nav-link.btn.btn-primary').hover();
    expect(await page.locator('.nav-link.btn.btn-primary').textContent()).toContain('0');
    await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.locator('app-card').filter({ hasText: 'Blackberry $24.99 Lorem ipsum' }).getByRole('button').click();
    expect(await page.locator('.nav-link.btn.btn-primary').textContent()).toContain('4');
    await page.getByText('Checkout ( 4 ) (current)').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByLabel('Please choose your delivery').fill('India');
    await page.getByRole('button', { name: 'Purchase' }).click();
    expect(await page.getByText('× Success! Thank you! Your').textContent()).toContain('Success! Thank you! Your order will be delivered in next few weeks :-).');
    console.log('Test Purchase Passed')
  });
