let { test, expect, devices } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
});

test.afterEach(async ({ page }) => {
    await page.close()
});

test('Test Visibility', async ({ page }) => {
    await page.locator('#displayed-text').fill('Hello')
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
    await page.getByRole('button', { name: 'Hide' }).click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden()
    await page.getByRole('button', { name: 'Show' }).click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
    console.log('Test Visibility Passed')
});

test('Test Mousehover', async ({ page }) => {
    await page.locator('#mousehover').hover()
    await expect(page.locator("a[href='#top']")).toBeVisible()
    console.log('Test Mousehover Passed')
});

test('Test Autosuggestions', async ({ page }) => {
    await page.locator('#autocomplete').fill('Ma')
    await page.waitForSelector('.ui-menu-item-wrapper', { visible: true })
    const suggestions1 = await page.$$('.ui-menu-item-wrapper');
    await suggestions1[9].click();
    await page.locator('#autocomplete').clear()
    await page.locator('#autocomplete').fill('In')
    await page.waitForSelector('.ui-menu-item-wrapper', { visible: true })
    const suggestions2 = await page.$$('.ui-menu-item-wrapper');
    await suggestions2[15].click();
    console.log('Test Autosuggestions Passed')
});

test('Test Dialogs', async ({ page }) => {
    await page.getByPlaceholder('Enter Your Name').fill('Aravind');
    page.once('dialog', dialog => {
      expect(dialog.message()).toBe('Hello Aravind, Are you sure you want to confirm?')
      dialog.accept().catch(() => {});
    });
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByPlaceholder('Enter Your Name').fill('Aravind');
    page.once('dialog', dialog => {
        expect(dialog.message()).toBe('Hello Aravind, share this practice page and share your knowledge')
        dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Alert' }).click();
    console.log('Test Dialogs Passed')
});

test('Test Frames', async ({ page }) => {
    const frame = page.frameLocator('#courses-iframe')
    await frame.getByRole('link', { name: ' More ' }).click();
    await frame.getByRole('link', { name: 'About us', exact: true }).click();
    expect(await frame.locator('div.col-md-12 p').last().textContent()).toBe('We believe we are one stop solutions for all your QA and Automation testing needs where individuals and companies can grow using our expertise.');
    console.log('Test Frames Passed')
});

test('Test WebTables', async ({ page }) => {
    let amount = 0
    for(let i=1;i<10;i++)
    {
        amount = amount + parseInt(await page.locator("(//table[@id='product'])[2]/tbody/tr["+i+"]/td[4]").textContent())
    }
    expect(amount).toBe(296)
    console.log('Test WebTables Passed')
});

test('Test Screenshot', async ({ page }) => {
    await page.screenshot({ path: 'tests/screenshots/screenshot.png', fullPage: true })
    console.log('Test Screenshot Passed')
});

test('Test Element Screenshot', async ({ page }) => {
    await page.locator('#mousehover').screenshot({ path: 'tests/screenshots/elementscreenshot.png' });
    console.log('Test Element Screenshot Passed')
});
