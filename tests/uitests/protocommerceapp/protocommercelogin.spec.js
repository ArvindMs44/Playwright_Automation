let { test, expect, devices } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
});

test.afterEach(async ({ page }) => {
  await page.close()
});

test('Test LoginPage Url', async ({ page }) => {
  await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  console.log('Test LoginPage Url Passed')
});

test('Test LoginPage Title', async ({ page }) => {
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
  console.log('Test LoginPage Title Passed')
});

test('Test Empty Credentials', async ({ page }) => {
  await page.locator('#signInBtn').click()
  await expect(page.getByText('Empty username/password.')).toContainText('Empty username/password.');
  console.log('Test Empty Credentials Passed')
});

test('Test Invalid Username', async ({ page }) => {
  await page.locator('#username').fill('rahulshetty')
  await page.locator('#password').fill('shetty')
  await page.locator('#terms').click()
  await page.locator('#signInBtn').click()
  await expect(page.locator("[style*=display]")).toContainText('Incorrect username/password.');
  console.log('Test Invalid Username Passed')
});

test('Test Invalid Password', async ({ page }) => {
  await page.locator('#username').fill('rahulshetty')
  await page.locator('#password').fill('shetty')
  await page.locator('#terms').click()
  await page.locator('#signInBtn').click()
  await expect(page.locator("[style*=display]")).toContainText('Incorrect username/password.');
  console.log('Test Invalid Password Passed')
});

test('Test Valid Login', async ({ page }) => {
  await page.locator('#username').fill('rahulshettyacademy')
  await page.locator('#password').fill('learning')
  await page.locator('#terms').click()
  await page.locator('#signInBtn').click()
  await expect(page).toHaveTitle('ProtoCommerce')
  console.log('Test Valid Login Passed')
});

test('Test First Product', async ({ page }) => {
  await page.locator('#username').fill('rahulshettyacademy')
  await page.locator('#password').fill('learning')
  await page.locator('#terms').click()
  await page.locator('#signInBtn').click()
  await expect(page.locator('[class=card-body] a').first()).toContainText('iphone X');
  console.log('Test First Product Passed')
});

test('Test All Products', async ({ page }) => {
  let expectedProducts = [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]
  await page.locator('#username').fill('rahulshettyacademy')
  await page.locator('#password').fill('learning')
  await page.locator('#terms').click()
  await page.locator('#signInBtn').click()
  await page.locator('[class=card-body] a').first().waitFor()
  let actualProducts = await page.locator('[class=card-body] a').allTextContents()
  expect(actualProducts).toEqual(expectedProducts)
  console.log('Test All Products Passed')
});

test('Test WebElements', async ({ page }) => {
  let dropdown = page.locator('select.form-control')
  dropdown.selectOption('consult')
  await page.locator('#terms').check()
  expect(page.locator('#terms')).toBeChecked()
  await page.locator('#usertype').last().click()
  await expect(page.locator('.modal-body p')).toContainText('You will be limited to only fewer functionalities of the app. Proceed?');
  await page.locator('#okayBtn').click()
  console.log('Test WebElements Passed')
});

test('Test BlinkingText', async ({ page }) => {
  let hyperlink = page.locator('.blinkingText')
  await expect(hyperlink).toContainText('Free Access to InterviewQues/ResumeAssistance/Material');
  await expect(hyperlink).toHaveAttribute('class','blinkingText')
  await page.locator('.blinkingText').click()
  console.log('Test BlinkingText Passed')
});

test('Test Tabs', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  const blinkingText =  page.locator('.blinkingText')

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    blinkingText.click()
  ])

  await newPage.bringToFront()
  await expect(newPage.locator('.im-para.red')).toContainText('Please email us at mentor@rahulshettyacademy.com with below template to receive response');
  const text = await newPage.locator('.im-para.red').textContent()
  const domains = text.split('@')
  const domain = domains[1]
  const arrays = domain.split(' ')
  const email = arrays[0]
  await page.bringToFront()
  await page.locator('#username').fill(email)
  await page.locator('#password').fill('shetty')
  await page.locator('#terms').click()
  await page.locator('#signInBtn').click()
  await expect(page.locator("[style*=display]")).toContainText('Incorrect username/password.');
  console.log('Test Tabs Passed')
});

test('Test Codegen', async ({ page }) => {
  await page.locator('label').filter({ hasText: 'Admin' }).locator('span').nth(1).click();
  await page.locator('label:nth-child(2) > .checkmark').click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.locator('label').filter({ hasText: 'Admin' }).locator('span').nth(1).click();
  await page.locator('label:nth-child(2) > .checkmark').click();
  await page.getByRole('button', { name: 'Okay' }).click();
  await page.getByRole('combobox').selectOption('teach');
  await page.getByLabel('I Agree to the terms and').check();
  console.log('Test Codegen Passed')
});
