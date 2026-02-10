import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.loginRegisterLink = page.getByText('LOGIN / REGISTER');

        // Form inputs
        this.accountInput = page.getByRole('textbox', { name: 'Account' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });

        // Buttons
        this.loginButton = page.locator('#loginButton');
    }

    async goto(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async openLoginRegister() {
        await this.loginRegisterLink.click();
    }

    async login(account, password) {
        await this.accountInput.fill(account);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
