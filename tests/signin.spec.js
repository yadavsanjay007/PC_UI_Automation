import { test } from '@playwright/test';
import { LoginPage } from '../pages/Auth/loginPage.js';
import { WelcomeModal } from '../pages/Repairers/welcomeModal.js';
import { DashboardPage } from '../pages/Repairers/dashboardPage.js';
import { users } from '../data/credential.js';
import { environments } from '../Utilities/environment.js';

test('login and close welcome modal', async ({ page }, testInfo) => {

  const loginPage = new LoginPage(page);
  const welcomeModal = new WelcomeModal(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto(environments.baseURL);
  await loginPage.openLoginRegister();
  await loginPage.login(users.repairer.username, users.repairer.password);

  await welcomeModal.closeByClickingOutside();

  await dashboardPage.expectDashboardVisible();

  await page.reload();
  await welcomeModal.closeByClickingOutside();

  await dashboardPage.signOut();
  await dashboardPage.expectLoginRegisterVisible();

  await page.goBack();
  await welcomeModal.closeIfVisible();
  await dashboardPage.expectDashboardHidden();
  await dashboardPage.expectLoginRegisterVisible();

});

test('stay logged in after relaunch using storage state', async ({ page, browser }, testInfo) => {

  const loginPage = new LoginPage(page);
  const welcomeModal = new WelcomeModal(page);
  const dashboardPage = new DashboardPage(page);
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
