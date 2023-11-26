const {loginpage} = require('../../tests/pageobjects/loginpage');
const {paymentpage} = require('../../tests/pageobjects/paymentpage');
const {dashboardpage} = require('../../tests/pageobjects/dashboardpage');
const {orderspage} = require('../../tests/pageobjects/orderspage');

class pageobjectmanager {

    constructor(page)
    {
        this.page = page;
        this.loginPage = new loginpage(this.page);
        this.paymentPage = new paymentpage(this.page);
        this.dashboardPage = new dashboardpage(this.page);
        this.ordersPage = new orderspage(this.page);
    }

    getloginpage()
    {
        return this.loginPage;
    }

    getdashboardpage()
    {
        return this.dashboardPage;
    }

    getpaymentpage()
    {
        return this.paymentPage;
    }

    getorderspage()
    {
        return this.ordersPage;
    }

}

module.exports = {pageobjectmanager};


