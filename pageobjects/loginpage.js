class loginpage {

    constructor(page)
    {
        this.page = page;
        this.email = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
    }

    async login(email,passsword)
    {
        await this.email.fill(email);
        await this.password.fill(passsword);
        await this.loginButton.click();
    }

    async navigate(url)
    {
        await this.page.goto(url);
    }

}

module.exports = {loginpage};

