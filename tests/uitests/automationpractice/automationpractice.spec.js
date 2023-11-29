let { test, expect, devices } = require('@playwright/test');
const { title } = require('process');

test.afterEach(async ({ page }) => {
    await page.close()
});

test('@UI Test Visibility', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator('#displayed-text').fill('Hello')
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
    await page.getByRole('button', { name: 'Hide' }).click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden()
    await page.getByRole('button', { name: 'Show' }).click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
    console.log('Test Visibility Passed')
});

test('@UI Test Mousehover', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator('#mousehover').hover()
    await expect(page.locator("a[href='#top']")).toBeVisible()
    console.log('Test Mousehover Passed')
});

test('@UI Test Autosuggestions', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
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

test('@UI Test Dialogs', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
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

test('@UI Test Frames', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    const frame = page.frameLocator('#courses-iframe')
    await frame.getByRole('link', { name: ' More ' }).click();
    await frame.getByRole('link', { name: 'About us', exact: true }).click();
    expect(await frame.locator('div.col-md-12 p').last().textContent()).toBe('We believe we are one stop solutions for all your QA and Automation testing needs where individuals and companies can grow using our expertise.');
    console.log('Test Frames Passed')
});

test('@UI Test WebTables', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    let amount = 0
    for(let i=1;i<10;i++)
    {
        amount = amount + parseInt(await page.locator("(//table[@id='product'])[2]/tbody/tr["+i+"]/td[4]").textContent())
    }
    expect(amount).toBe(296)
    console.log('Test WebTables Passed')
});

test('@UI Test Screenshot', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.screenshot({ path: 'tests/screenshots/screenshot.png', fullPage: true })
    console.log('Test Screenshot Passed')
});

test('@UI Test Element Screenshot', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator('#mousehover').screenshot({ path: 'tests/screenshots/elementscreenshot.png' });
    console.log('Test Element Screenshot Passed')
});

test('@UI Test Download', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const download = await downloadPromise;
    await download.saveAs('tests/downloads/' + download.suggestedFilename());
    console.log('Test Download Passed')
});

test('@UI Test Upload', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    const filePath = 'tests/downloads/sampleFile.jpeg';
    const fileInput = await page.$('#uploadFile');
    await fileInput.setInputFiles(filePath);
    expect(await page.locator('#uploadedFilePath').textContent()).toContain('sampleFile.jpeg');
    console.log('Test Upload Passed');
});

test('@UI Test Drag&Drop', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');
    await page.locator('#draggable').dragTo(page.locator("//div[@id='simpleDropContainer']//div[@id='droppable']"));
    expect(await page.locator("div[id='simpleDropContainer'] p").textContent()).toBe('Dropped!');
    console.log('Test Drag&Drop Passed');
});

test('@UI Test Tooltip', async ({ page }) => {
    await page.goto('https://demoqa.com/tool-tips');
    await page.locator('#toolTipButton').hover();
    const tooltip = await page.locator("//div[text()='You hovered over the Button']").textContent();
    expect(tooltip).toBe('You hovered over the Button');
    console.log('Test Tooltip Passed');
});

test('@UI Test Tabs', async ({ page }) => {
    await page.goto('https://demoqa.com/links');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Home', exact: true }).click();
    const page1 = await page1Promise;
    const element = await page1.locator("//h5[normalize-space()='Elements']").textContent();
    expect(element).toBe('Elements');
    console.log('Test Tabs Passed')
  });

  test('@UI Test Links', async ({ page }) => {
    await page.goto('https://demoqa.com/links');
    await page.locator('#created').click();
    const text = await page.locator("#linkResponse").textContent();
    expect(text).toBe('Link has responded with staus 201 and status text Created');
    console.log('Test Links Passed')
  });

  test('@UI Test Clicks', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    await page.locator('#doubleClickBtn').dblclick();
    const text1 = await page.locator("#doubleClickMessage").textContent();
    expect(text1).toBe('You have done a double click');
    await page.locator('#rightClickBtn').click({button:'right'});
    const text2 = await page.locator("#rightClickMessage").textContent();
    expect(text2).toBe('You have done a right click');
    console.log('Test Clicks Passed');
  });

  test('@UI Test Visual Comparison', async ({ page }) => {
    await page.goto('https://playwright.dev');
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('tests/screenshots/playwright.png');
    console.log('Test Visual Comparison Passed');
  });
