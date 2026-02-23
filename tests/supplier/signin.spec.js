import { test } from "@playwright/test";
import { LoginPage } from "../../pages/Auth/LoginPage";
import { WelcomeModal } from "../../pages/Repairers/welcomeModal";
import { SupplierDashboardPage } from "../../pages/Suppliers/dashboardPage";
import { users } from "../../data/credential";
import { environments } from "../../Utilities/environment";

const supplierStorageStatePath = 'supplierStorageState.json';

test.describe('Supplier Authentication Flow', () => {
    let loginPage;
    let welcomeModal;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        welcomeModal = new WelcomeModal(page);
        dashboardPage = new SupplierDashboardPage(page);
    });

    test('Login successful - verify dashboard is visible', async ({ page }) => {
        // Navigate to login
        await loginPage.goto(environments.baseURL);
        await loginPage.openLoginRegister();
        await loginPage.login(users.suppliers.username, users.suppliers.password);

        // Close welcome modal
        await welcomeModal.closeByClickingOutside();
        await dashboardPage.expectSupplierDashboardVisible();
    });

    test('Verify Signout works', async ({ page }) => {
        // Login
        await loginPage.goto(environments.baseURL);
        await loginPage.openLoginRegister();
        await loginPage.login(users.suppliers.username, users.suppliers.password);

        // Close welcome modal
        await welcomeModal.closeByClickingOutside();
        await dashboardPage.expectSupplierDashboardVisible();

        // Logout
        await dashboardPage.signOut();
        await dashboardPage.expectLoginRegisterVisible();
    });

    test('Session should persist after page refresh', async ({ page }) => {
        // Login
        await loginPage.goto(environments.baseURL);
        await loginPage.openLoginRegister();
        await loginPage.login(users.suppliers.username, users.suppliers.password);

        // Close welcome modal
        await welcomeModal.closeIfVisible();
        await dashboardPage.expectSupplierDashboardVisible();

        // Refresh page
        await page.reload();
        await page.waitForTimeout(3000);
        await welcomeModal.closeIfVisible();
        await dashboardPage.expectSupplierDashboardVisible();
    });

    test('Prevent verify back navigation after logout', async ({ page }) => {
        // Login
        await loginPage.goto(environments.baseURL);
        await loginPage.openLoginRegister();
        await loginPage.login(users.suppliers.username, users.suppliers.password);

        // Close welcome modal
        await welcomeModal.closeByClickingOutside();
        await dashboardPage.expectSupplierDashboardVisible();

        // Logout
        await dashboardPage.signOut();
        await dashboardPage.expectLoginRegisterVisible();

        // Navigate back
        await page.goBack();
        await welcomeModal.closeIfVisible();
        await dashboardPage.expectSupplierDashboardVisible();
        await dashboardPage.expectLoginRegisterVisible();
    });

    test('Stay logged in after relaunch using storage state', async ({ page, browser }) => {
        await loginPage.goto(environments.baseURL);
        await loginPage.openLoginRegister();
        await loginPage.login(users.suppliers.username, users.suppliers.password);

        await welcomeModal.closeByClickingOutside();

        await page.context().storageState({ path: supplierStorageStatePath });
        await page.context().close();

        const newContext = await browser.newContext({ storageState: supplierStorageStatePath });
        const newPage = await newContext.newPage();

        const newWelcomeModal = new WelcomeModal(newPage);
        const newDashboardPage = new SupplierDashboardPage(newPage);

        await newPage.goto(environments.supplierDashboardURL);
        await newWelcomeModal.closeIfVisible();
        await newDashboardPage.expectSupplierDashboardVisible();

        await newContext.close();
    });

    test('Invalid login should show error message', async ({ page }) => {
        await loginPage.goto(environments.baseURL);
        await loginPage.openLoginRegister();
        await loginPage.login('invalid@example.com', 'badpassword');

        await loginPage.expectLoginErrorVisible();
    });

    test('Dashboard should not be accessible without login', async ({ page }) => {
        await page.goto(environments.baseURL);
        await dashboardPage.expectLoginRegisterVisible();
        await dashboardPage.expectDashboardHidden();
    });

});