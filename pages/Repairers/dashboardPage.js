import { expect } from '@playwright/test';
import { environments } from '../../Utilities/environment';

export class DashboardPage {
    constructor(page) {
        this.page = page;

        // Headings
        this.dashboardHeading = page.getByText('DASHBOARD', { exact: true });

        // Navigation
        this.logoutLink = page.locator('#headingMenu').getByRole('link');
        this.loginRegisterNav = page.locator('#mainNavRegister');
        //this.getPriceTab = page.getByText('GET PRICE', { exact: true });
        this.getPriceTab = page.locator('#headingMenu .text', {
            hasText: 'GET PRICE'
        });
    }

    async expectDashboardVisible() {
        await expect(this.dashboardHeading).toBeVisible();
    }

    async expectDashboardHidden() {
        await expect(this.dashboardHeading).toBeHidden();
    }

    async goToGetPrice() {
        await this.getPriceTab.click();
        await this.page.waitForURL(environments.getpriceURL);
    }

    async signOut() {
        await this.logoutLink.click();
    }

    async expectLoginRegisterVisible() {
        await expect(this.loginRegisterNav).toBeVisible();
        await expect(this.loginRegisterNav).toHaveText('LOGIN / REGISTER');
    }
}
