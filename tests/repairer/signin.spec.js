import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Auth/LoginPage.js';
import { WelcomeModal } from '../../pages/Repairers/welcomeModal.js';
import { RepairerDashboardPage } from '../../pages/Repairers/dashboardPage.js';
import { users } from '../../data/credential.js';
import { environments } from '../../Utilities/environment.js';

const storageStatePath = 'storageState.json';

test.describe('Repairer Authentication Flow', () => {
  let loginPage;
  let welcomeModal;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    welcomeModal = new WelcomeModal(page);
    dashboardPage = new RepairerDashboardPage(page);
  });

  test('Prevent back navigation', async ({ page }) => {

    // Navigate to login
    await loginPage.goto(environments.baseURL);
    await loginPage.openLoginRegister();
    await loginPage.login(users.repairer.username, users.repairer.password);

    // Close welcome modal
    await welcomeModal.closeByClickingOutside();
    await dashboardPage.expectDashboardVisible();

    // Logout
    await dashboardPage.signOut();
    await dashboardPage.expectLoginRegisterVisible();

    await page.goBack();
    await welcomeModal.closeIfVisible();
    await dashboardPage.expectDashboardHidden();
    await dashboardPage.expectLoginRegisterVisible();
  });

  test('stay logged in after relaunch using storage state', async ({ page, browser }) => {
    const storageStatePath = 'storageState.json';

    await loginPage.goto(environments.baseURL);
    await loginPage.openLoginRegister();
    await loginPage.login(users.repairer.username, users.repairer.password);

    await welcomeModal.closeByClickingOutside();
    await dashboardPage.expectDashboardVisible();

    await page.context().storageState({ path: storageStatePath });
    await page.context().close();

    const newContext = await browser.newContext({ storageState: storageStatePath });
    const newPage = await newContext.newPage();

    const newWelcomeModal = new WelcomeModal(newPage);
    const newDashboardPage = new DashboardPage(newPage);

    await newPage.goto(environments.dashboardURL);
    await newWelcomeModal.closeIfVisible();
    await newDashboardPage.expectDashboardVisible();

    await newContext.close();
  });

  test('Invalid login should show error message', async ({ page }) => {
    await loginPage.goto(environments.baseURL);
    await loginPage.openLoginRegister();
    await loginPage.login('invalid@email.com', 'wrongpassword');

    await loginPage.expectLoginErrorVisible();
  });


  test('Dashboard should not be accessible without login', async ({ page }) => {
    await page.goto(environments.dashboardURL);
    await dashboardPage.expectLoginRegisterVisible();
    await dashboardPage.expectDashboardHidden();
  });


  test('Session should persist after page refresh', async ({ page }) => {
    await loginPage.goto(environments.baseURL);
    await loginPage.openLoginRegister();
    await loginPage.login(users.repairer.username, users.repairer.password);

    await welcomeModal.closeIfVisible();
    await welcomeModal.closeByClickingOutside();
    await expect(dashboardPage.getDashboardLocator()).toBeVisible();

    // Refresh page
    await page.reload();
    await dashboardPage.waitForRedirect();
    await welcomeModal.closeIfVisible();
    await welcomeModal.closeByClickingOutside();
    await expect(dashboardPage.getDashboardLocator()).toBeVisible();
    //await dashboardPage.expectDashboardVisible();
    //await expect(page).toHaveURL(environments.dashboardURL);
  });

});
