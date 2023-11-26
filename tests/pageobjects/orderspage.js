import { expect } from '@playwright/test';

class orderspage {

    constructor(page)
    {   
        this.page = page;
        this.productid = page.locator("label[class='ng-star-inserted']");
        this.orderhistory = page.locator("label[routerlink='/dashboard/myorders']");
        this.orderid = page.locator('.col-text.-main');
        this.signout = page.locator('li:nth-child(5) button:nth-child(1)');
    }

    async validateproduct()
    {
        const productidYourOrdersPage = await this.productid.textContent();
        const product = productidYourOrdersPage.split('|');
        const productI = product[1].split(' ');
        const productId = productI[1]
        await this.orderhistory.click();
        await this.page.locator("tbody").waitFor();
        const rows = this.page.locator("tbody tr");
  
        for (let i = 0; i < await rows.count(); i++) {
        const orderId = await rows.nth(i).locator("th").textContent();
        if (productId.includes(orderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
         }
        }
  
        expect(await this.orderid.textContent()).toContain(productId);
    }

    async logout()
    {
        await this.signout.click();
    }
    
}

module.exports = {orderspage};

