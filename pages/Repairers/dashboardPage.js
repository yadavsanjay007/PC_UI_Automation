import { expect } from '@playwright/test';
import { environments } from '../../Utilities/environment';

export class RepairerDashboardPage {
    constructor(page) {
        this.page = page;

        // Headings
        this.repairerDashboardHeading = page.locator('#headingMenu .dashboard');

        // Navigation
        this.logoutLink = page.locator('#headingMenu').getByRole('link');
        this.loginRegisterNav = page.locator('#mainNavRegister');
        this.getPriceTab = page.locator('#headingMenu .text', {hasText: 'GET PRICE'});
    }

    async expectRepairerDashboardVisible() {
        await expect(this.repairerDashboardHeading).toBeVisible();
    }
    getDashboardLocator() {
        return this.repairerDashboardHeading;
    }

    async expectDashboardHidden() {
        await expect(this.repairerDashboardHeading).toBeHidden();
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
