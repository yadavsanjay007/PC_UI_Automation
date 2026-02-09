import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { WelcomeModal } from '../pages/welcomeModal';
import { QuotePage } from '../pages/quotePage';
import { users } from '../data/credential';

test('Verify create quote works', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const welcomeModal = new WelcomeModal(page);
    const quotePage = new QuotePage(page);

    await loginPage.goto('https://dev.partscheck.com.au/global/index.php');
    await loginPage.openLoginRegister();
    await loginPage.login(users.repairer.username, users.repairer.password);

    await welcomeModal.closeIfVisible();

    console.log('Modal Closed');

    await quotePage.openGetPrice();
    await quotePage.openNewQuote();
    await quotePage.openDetails();
    await quotePage.selectInsurer('Standard');
    await quotePage.expectNextVisible();
    await quotePage.expectNextVisible();
    await quotePage.openViewList();
    await quotePage.selectPart('Bonnet');
    await quotePage.addSelectedPart();
    await quotePage.expectNextVisible();
    await quotePage.selectAll();
    await quotePage.expectNextVisible();
});