import { test } from "@playwright/test";
import { LoginPage } from "../../pages/Auth/LoginPage";
import { WelcomeModal } from "../../pages/Repairers/welcomeModal";
import { SupplierDashboardPage } from "../../pages/Suppliers/dashboardPage";
import { users } from "../../data/credential";
import { environments } from "../../Utilities/environment";

const storageStatePath = 'storageState.json';

test.describe('Supplier Authentication Flow', () => {
    let loginPage;
    let welcomeModal;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        welcomeModal = new WelcomeModal(page);
        dashboardPage = new SupplierDashboardPage(page);
    });

    // test('Login successful - verify dashboard is visible', async ({ page }) => {
    //     // Navigate to login
    //     await loginPage.goto(environments.baseURL);
    //     await loginPage.openLoginRegister();
    //     await loginPage.login(users.suppliers.username, users.suppliers.password);

    //     // Close welcome modal
    //     await welcomeModal.closeByClickingOutside();
    //     await dashboardPage.expectDashboardVisible();
    // });

    // test('Verify Signout works', async ({ page }) => {
    //     // Login
    //     await loginPage.goto(environments.baseURL);
    //     await loginPage.openLoginRegister();
    //     await loginPage.login(users.suppliers.username, users.suppliers.password);

    //     // Close welcome modal
    //     await welcomeModal.closeByClickingOutside();
    //     await dashboardPage.expectDashboardVisible();

    //     // Logout
    //     await dashboardPage.signOut();
    //     await dashboardPage.expectLoginRegisterVisible();
    // });

    // test('Session should persist after page refresh', async ({ page }) => {
    //     // Login
    //     await loginPage.goto(environments.baseURL);
    //     await loginPage.openLoginRegister();
    //     await loginPage.login(users.suppliers.username, users.suppliers.password);

    //     // Close welcome modal
    //     await welcomeModal.closeIfVisible();
    //     await dashboardPage.expectDashboardVisible();

    //     // Refresh page
    //     await page.reload();
    //     await page.waitForTimeout(3000);
    //     await welcomeModal.closeIfVisible();
    //     await dashboardPage.expectDashboardVisible();
    // });

    // test('Prevent verify back navigation after logout', async ({ page }) => {
    //     // Login
    //     await loginPage.goto(environments.baseURL);
    //     await loginPage.openLoginRegister();
    //     await loginPage.login(users.suppliers.username, users.suppliers.password);

    //     // Close welcome modal
    //     await welcomeModal.closeByClickingOutside();
    //     await dashboardPage.expectDashboardVisible();

    //     // Logout
    //     await dashboardPage.signOut();
    //     await dashboardPage.expectLoginRegisterVisible();

    //     // Navigate back
    //     await page.goBack();
    //     await welcomeModal.closeIfVisible();
    //     await dashboardPage.expectDashboardHidden();
    //     await dashboardPage.expectLoginRegisterVisible();
    // });

    test('Stay logged in after relaunch using storage state', async ({ page, browser }) => {
        await loginPage.goto(environments.baseURL);
        await loginPage.openLoginRegister();
        await loginPage.login(users.suppliers.username, users.suppliers.password);

        await welcomeModal.closeByClickingOutside();
        await dashboardPage.expectDashboardVisible();

        await page.context().storageState({ path: storageStatePath });
        await page.context().close();

        const newContext = await browser.newContext({ storageState: storageStatePath });
        const newPage = await newContext.newPage();

        const newWelcomeModal = new WelcomeModal(newPage);
        const newDashboard = new DashboardPage(newPage);

        await newPage.goto(environments.dashboardURL);
        await newWelcomeModal.closeIfVisible();
        await newDashboard.expectDashboardVisible();

        await newContext.close();
    });

    // test('Invalid login should show error message', async ({ page }) => {
    //     await loginPage.goto(environments.baseURL);
    //     await loginPage.openLoginRegister();
    //     await loginPage.login('invalid@example.com', 'badpassword');

    //     await loginPage.expectLoginErrorVisible();
    // });

    // test('Dashboard should not be accessible without login', async ({ page }) => {
    //     await page.goto(environments.dashboardURL);
    //     await dashboardPage.expectLoginRegisterVisible();
    //     await dashboardPage.expectDashboardHidden();
    // });

});