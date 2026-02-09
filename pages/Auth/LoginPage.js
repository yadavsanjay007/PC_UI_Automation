export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goto(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    loginRegisterLink() {
        return this.page.getByText('LOGIN / REGISTER');
    }

    accountInput() {
        return this.page.getByRole('textbox', { name: 'Account' });
    }

    passwordInput() {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    loginButton() {
        return this.page.locator('#loginButton');
    }

    async openLoginRegister() {
        await this.loginRegisterLink().click();
    }

    async login(account, password) {
        await this.accountInput().fill(account);
        await this.passwordInput().fill(password);
        await this.loginButton().click();
    }
}
