import { expect } from '@playwright/test';
import { environments } from '../../Utilities/environment';

export class SupplierDashboardPage {
    constructor(page) {
        this.page = page;

        // Headings
        this.supplierDashboardHeading = page.locator("//a[normalize-space()='Dashboard']");

        // Logout link
        this.logoutLink = page.getByRole('link', { name: 'Logout' });

        // Dashboard button link
        this.dashboardButton = page.getByRole('link', { name: 'Dashboard' });

        // New Quote Request link
        this.newQuote = page.getByText('New Quote Request');

        // Navigation
        this.loginRegisterNav = page.locator('#mainNavRegister');
        this.getPriceTab = page.locator('#headingMenu .text', {
            hasText: 'GET PRICE'
        });
    }

    async expectSupplierDashboardVisible() {
        await expect(this.supplierDashboardHeading).toBeVisible();
    }

    async expectDashboardHidden() {
        await expect(this.supplierDashboardHeading).toBeHidden();
    }

    async signOut() {
        await this.logoutLink.click();
    }

    async expectLoginRegisterVisible() {
        await expect(this.loginRegisterNav).toBeVisible();
        await expect(this.loginRegisterNav).toHaveText('LOGIN / REGISTER');
    }

    async goToDashboard() {
        await this.dashboardButton.click();
    }

    async goToNewQuote() {
        await this.newQuote.click();
    }

    async goToGetPrice() {
        await this.getPriceTab.click();
        await this.page.waitForURL(environments.getpriceURL);
    }
}