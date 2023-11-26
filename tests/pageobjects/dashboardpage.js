class dashboardpage {

    constructor(page)
    {
        this.mobile = page.locator("(//*[text()=' Add To Cart'])[3]");
        this.cart = page.locator("//button[@routerlink='/dashboard/cart']");
        this.checkout = page.locator("//button[normalize-space()='Checkout']");
    }

    async addproducttocart()
    {
        await this.mobile.click();
        await this.cart.click();
    }

    async productcheckout()
    {
        await this.checkout.click();
    }
    
}

module.exports = {dashboardpage};

