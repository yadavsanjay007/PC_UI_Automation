import { expect } from '@playwright/test';

export class DashboardPage {
    constructor(page) {
        this.page = page;

        // Headings
        this.dashboardHeading = page.getByText('DASHBOARD', { exact: true });

        // Navigation
        this.logoutLink = page.locator('#headingMenu').getByRole('link');
        this.loginRegisterNav = page.locator('#mainNavRegister');
    }

    async expectDashboardVisible() {
        await expect(this.dashboardHeading).toBeVisible();
    }

    async expectDashboardHidden() {
        await expect(this.dashboardHeading).toBeHidden();
    }

    async signOut() {
        await this.logoutLink.click();
    }

    async expectLoginRegisterVisible() {
        await expect(this.loginRegisterNav).toBeVisible();
        await expect(this.loginRegisterNav).toHaveText('LOGIN / REGISTER');
    }
}
