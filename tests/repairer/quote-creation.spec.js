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

test('E2E - Repairer creates and submits Quote successfully', async ({ page }) => {

  // Login
  
  const loginPage = new LoginPage(page);
  const welcomeModal = new WelcomeModal(page);

  await loginPage.goto(environments.baseURL);
  await loginPage.openLoginRegister();
  await loginPage.login(users.repairer.username, users.repairer.password);

  await expect(page).toHaveURL(environments.dashboardURL);

  await welcomeModal.closeIfVisible();
  await welcomeModal.closeByClickingOutside();

  // Initialize Page Objects

  const dashboard = new RepairerDashboardPage(page);
  const landing = new getpricelandingPage(page);
  const quoteInfo = new quoteinfoPage(page);
  const images = new imagesPage(page);
  const buildQuote = new buildquotePage(page);
  const partType = new partTypePage(page);
  const suppliers = new suppliersPage(page);
  const selectTime = new selectTimePage(page);

  const item = 'Front Bar Cover (one piece)';

  // Navigate to Get Price
 
  await dashboard.goToGetPrice();
  await landing.clickNewQuote();

  // Quote Info – Training Quote Auto Fill

  await quoteInfo.enableTrainingQuote();
  await quoteInfo.insurerDropdown.selectOption({ label: 'Standard' });

  const quoteNumber = await quoteInfo.getQuoteNumber();
  console.log('Generated Quote Number:', quoteNumber);

  // Validate Auto-Fill
  await expect(quoteInfo.quoteRefInput).not.toHaveValue('');
  await expect(quoteInfo.vinInput).not.toHaveValue('');
  await expect(quoteInfo.vehicleMakeDropdown).not.toHaveValue('-1');

  await quoteInfo.clickNext();

  // Images Page

  //Images tab
      await images.expectImagesPageLoaded();
  
      const filePath = path.resolve('./data/30860_0_0031.jpeg');
  
      await images.uploadImage(filePath);
  
  await images.clickNext();

  // Build Quote
 
  await buildQuote.addItem(item);
  await expect(buildQuote.selectionItems).toContainText('Front Bar Cover');
  await buildQuote.clickNext();

  // Part Type

  await partType.selectAllOEM();
  await partType.clickNext();

  // Suppliers

  await suppliers.clickNext();

  // Select Time
 
  await selectTime.verifyPageLoaded();
  await selectTime.selectTime('5:00 PM');

  const submitText = await selectTime.getSubmitText();
  await expect(submitText.trim()).toBe('SUBMIT');

  // Submit Quote

  await selectTime.clickSubmit();
  await selectTime.confirmSubmission();

  // Final Validation
  
  await expect(page).toHaveURL(/action=draftSubmitted&draftID=\d+/);

});