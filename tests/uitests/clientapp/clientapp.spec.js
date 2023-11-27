import { test } from '@playwright/test';
let dataset = JSON.parse(JSON.stringify(require("../../utils/clientapptestdata.json")));
let {pageobjectmanager} = require('../../pageobjectmanager/pageobjectmanager');
let { chromium } = require('playwright');
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
  test(`@E2E TEST E2E FLOW | ${data.email}`, async ({ page }) => {
    let pageobjectManager = new pageobjectmanager(page);
    let loginPage = pageobjectManager.getloginpage();
    let paymentPage = pageobjectManager.getpaymentpage();
    let dashboardPage = pageobjectManager.getdashboardpage();
    let ordersPage = pageobjectManager.getorderspage();
    await loginPage.navigate(data.url);
    await loginPage.login(data.email,data.password);
    await dashboardPage.addproducttocart();
    await dashboardPage.productcheckout();
    await paymentPage.makepayment(data.cvvcode,data.nameoncard,data.applycoupon);
    await page.locator("input[placeholder='Select Country']").type('ind');
    await paymentPage.solveautosuggestions();
    await ordersPage.validateproduct();
    await ordersPage.logout();
    console.log(`TEST E2E FLOW PASSED | ${data.email}`);
  });
}

