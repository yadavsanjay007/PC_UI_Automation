import { test } from '@playwright/test';
import { LoginPage } from '../pages/Auth/loginPage1';
import { WelcomeModal } from '../pages/Repairers/welcomeModal';
import { DashboardPage } from '../pages/Repairers/dashboardPage';
import { users } from '../data/credential';

test('login and close welcome modal', async ({ page }, testInfo) => {

  const loginPage = new LoginPage(page);
  const welcomeModal = new WelcomeModal(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto('https://partscheck.com.au/global/index.php');
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

  await loginPage.goto('https://partscheck.com.au/global/index.php');
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

  await newPage.goto('https://v2-next.partscheck.com.au/appV2/get-price.php');
  await newWelcomeModal.closeIfVisible();
  await newDashboardPage.expectDashboardVisible();

  await newContext.close();

});
