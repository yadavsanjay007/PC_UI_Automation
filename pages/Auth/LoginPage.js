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

        // Error message
        this.errorMessage = page.locator('[class*="message"][style*="visibility: visible"]');
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

    async expectLoginErrorVisible() {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText('Username or password Incorrect');
    }
}
