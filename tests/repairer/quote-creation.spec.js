import { test, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../pages/Auth/LoginPage.js';
import { WelcomeModal } from '../../pages/Repairers/welcomeModal.js';
import { RepairerDashboardPage } from '../../pages/Repairers/dashboardPage.js';
import { getpricelandingPage } from '../../pages/Repairers/GetPrice/getpricelandingPage.js';
import { quoteinfoPage } from '../../pages/Repairers/GetPrice/New Quote/quoteinfoPage.js';
import { imagesPage } from '../../pages/Repairers/GetPrice/New Quote/imagesPage.js';
import { buildquotePage } from '../../pages/Repairers/GetPrice/New Quote/buildquotePage.js';
import { partTypePage } from '../../pages/Repairers/GetPrice/New Quote/partTypePage.js';
import { suppliersPage } from '../../pages/Repairers/GetPrice/New Quote/suppliersPage.js';
import { selectTimePage } from '../../pages/Repairers/GetPrice/New Quote/selectTimepage.js';
import { users } from '../../data/credential.js';
import { environments } from '../../Utilities/environment.js';

test('E2E - Quote Creation Flow', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const welcomeModal = new WelcomeModal(page);
    const dashboardPage = new RepairerDashboardPage(page);
    const getPricePage = new getpricelandingPage(page);
    const quoteInfo = new quoteinfoPage(page);
    const images = new imagesPage(page);
    const buildQuote = new buildquotePage(page);
    const partType = new partTypePage(page);
    const suppliers = new suppliersPage(page);
    const selectTime = new selectTimePage(page);


    // Login
    await loginPage.goto(environments.baseURL);
    await loginPage.openLoginRegister();
    await loginPage.login(users.repairer.username, users.repairer.password);
    await welcomeModal.closeIfVisible();

    // Navigate to Quote Creation
    await dashboardPage.goToGetPrice();
    await getPricePage.clickNewQuote();

    // Complete Quote Flow
    //Quto info 
    await quoteInfo.expectQuoteInfoPageLoaded();
    await quoteInfo.expectNormalQuoteSelectedByDefault();
    await quoteInfo.clickQuoteDetailsAndValidateAutofill('Standard');
    const quoteNumber = await quoteInfo.getQuoteNumber();
    console.log('Generated Quote Number:', quoteNumber);
    await quoteInfo.clickNext();

    //Images tab
    await images.expectImagesPageLoaded();

    const filePath = path.resolve('./data/30860_0_0031.jpeg');

    await images.uploadImage(filePath);

    // verify upload here
    await images.clickNext();

    //Build Quote
    await buildQuote.expectBuildQuotePageLoaded();
    await buildQuote.switchToListView();
    await buildQuote.selectListCategory('Beaver Panel');
    await buildQuote.addItem('Beaver Panel Assy (one piece)');
    await expect(buildQuote.selectionItems)
        .toContainText('Beaver Panel Assy (one piece)');
    await buildQuote.clickNext();

    // Part Type page is loaded
    await expect(partType.clearPartBtn).toBeVisible();
    // Click OEM header
    await partType.selectAllOEM();

    // Validate all OEM checkboxes are checked
    const oemCheckboxes = partType.getAllOEMCheckboxes();
    const count = await oemCheckboxes.count();

    for (let i = 0; i < count; i++) {
        await expect(oemCheckboxes.nth(i)).toBeChecked();
    }
    await partType.clickNext();
// Suppliers

  // Click Next

await suppliers.handleSuppliersAndProceed();
// Validate Select Time Page Loaded

  await expect(selectTime.timeContainer).toBeVisible();

  // Select a Time Slot

  await selectTime.selectTime('5:00 PM');

  // Get Submit Button Text (No Click)

  const submitText = await selectTime.getSubmitText();

  console.log('Submit Button Text:', submitText);

  await expect(submitText.trim()).toBe('SUBMIT');
});