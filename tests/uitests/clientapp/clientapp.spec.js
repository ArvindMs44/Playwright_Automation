const { test } = require('../../../fixtures/pagefixtures');
const { chromium } = require('@playwright/test');
const dataset = JSON.parse(JSON.stringify(require("../../../utils/clientapptestdata.json")));
let browser;
let context;
let page;

// Setup Method
test.beforeEach(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await browser.newPage();
});

// Teardown Method
test.afterEach(async () => {
  await page.close();
  await context.close();
  await browser.close();
});

// Test Method
for(const data of dataset)
{
  test(`@E2E TEST E2E FLOW FIXTURE | ${data.email}`, async ({ page, loginPage, paymentPage, dashboardPage, ordersPage }) => {
    await loginPage.navigate(data.url);
    await loginPage.login(data.email,data.password);
    await dashboardPage.addproducttocart();
    await dashboardPage.productcheckout();
    await paymentPage.makepayment(data.cvvcode,data.nameoncard,data.applycoupon);
    await page.locator("input[placeholder='Select Country']").type('ind');
    await paymentPage.solveautosuggestions();
    await ordersPage.validateproduct();
    await ordersPage.logout();
    console.log(`TEST E2E FLOW FIXTURE PASSED | ${data.email}`);
  });
}

