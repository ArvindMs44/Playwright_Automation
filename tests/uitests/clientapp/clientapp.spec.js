import { test, expect } from '@playwright/test';
const dataset = JSON.parse(JSON.stringify(require("../../utils/clientapptestdata.json")));
const {pageobjectmanager} = require('../../pageobjectmanager/pageobjectmanager');

for(const data of dataset)
{
  test(`@E2E TEST E2E FLOW | ${data.email}`, async ({ page }) => {
    const pageobjectManager = new pageobjectmanager(page);
    const loginPage = pageobjectManager.getloginpage();
    const paymentPage = pageobjectManager.getpaymentpage();
    const dashboardPage = pageobjectManager.getdashboardpage();
    const ordersPage = pageobjectManager.getorderspage();
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

