const base = require('@playwright/test');
const {loginpage} = require('../pageobjects/loginpage');
const {paymentpage} = require('../pageobjects/paymentpage');
const {dashboardpage} = require('../pageobjects/dashboardpage');
const {orderspage} = require('../pageobjects/orderspage');

exports.test = base.test.extend({

  loginPage: async ({ page }, use) => {
    await use(new loginpage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new paymentpage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new dashboardpage(page));
  },

  ordersPage: async ({ page }, use) => {
    await use(new orderspage(page));
  },
  
});

exports.expect = base.expect;