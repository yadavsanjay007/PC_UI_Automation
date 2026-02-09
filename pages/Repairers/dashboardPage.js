import { expect } from '@playwright/test';

export class DashboardPage {
    constructor(page) {
        this.page = page;
    }

    dashboardHeading() {
        return this.page.getByText('DASHBOARD', { exact: true });
    }

    logoutLink() {
        return this.page.locator('#headingMenu').getByRole('link');
    }

    loginRegisterNav() {
        return this.page.locator('#mainNavRegister');
    }

    async expectDashboardVisible() {
        await expect(this.dashboardHeading()).toBeVisible();
    }

    async expectDashboardHidden() {
        await expect(this.dashboardHeading()).toBeHidden();
    }

    async signOut() {
        await this.logoutLink().click();
    }

    async expectLoginRegisterVisible() {
        await expect(this.loginRegisterNav()).toBeVisible();
        await expect(this.loginRegisterNav()).toHaveText('LOGIN / REGISTER');
    }
}
