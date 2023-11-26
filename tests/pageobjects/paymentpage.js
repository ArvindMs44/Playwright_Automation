class paymentpage {

    constructor(page)
    {
        this.cvvcode = page.locator("//div[@class='payment__cc']//div[2]//input[1]");
        this.nameoncard = page.locator("input[type='text']");
        this.coupon = page.locator("//input[@name='coupon']");
        this.applycoupon = page.locator("//button[normalize-space()='Apply Coupon']");
        this.placeorder = page.locator("//a[normalize-space()='Place Order']");
        this.autosuggestions = page.locator(".ta-results.list-group.ng-star-inserted");
        this.country = page.locator("input[placeholder='Select Country']");
    }

    async makepayment(cvvcode,nameoncard,applycoupon)
    {
        await this.cvvcode.fill(cvvcode);
        await this.nameoncard.nth(2).fill(nameoncard);
        await this.coupon.fill(applycoupon);
        await this.applycoupon.click();
        await this.country.waitFor();
        await this.country.click();
    }

    async solveautosuggestions()
    {
        const autosuggestions = this.autosuggestions;
        await autosuggestions.waitFor();
        const count = await autosuggestions.locator("button").count();
      
        for (let i = 0; i < count; i++) {
          if (await autosuggestions.locator("button").nth(i).textContent() === " India") {
            await autosuggestions.locator("button").nth(i).click();
            break;
          }
        }
      
        await this.placeorder.click();
    }
    
}

module.exports = {paymentpage};

