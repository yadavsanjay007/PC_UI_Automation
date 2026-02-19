import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Auth/LoginPage.js';
import { WelcomeModal } from '../pages/Repairers/welcomeModal.js';
import { DashboardPage } from '../pages/Repairers/dashboardPage.js';
import { users } from '../data/credential.js';
import { environments } from '../Utilities/environment.js';
import { getpricelandingPage } from '../pages/Repairers/GetPrice/getpricelandingPage.js';
import { quoteinfoPage } from '../pages/Repairers/GetPrice/New Quote/quoteinfoPage.js';
import { imagesPage } from '../pages/Repairers/GetPrice/New Quote/imagesPage.js';
import { buildquotePage } from '../pages/Repairers/GetPrice/New Quote/buildquotePage.js';
import { partTypePage } from '../pages/Repairers/GetPrice/New Quote/parttypePage.js';
import { suppliersPage } from '../pages/Repairers/GetPrice/New Quote/suppliersPage.js';
import { selectTimePage } from '../pages/Repairers/GetPrice/New Quote/selectTimepage.js';
test.beforeEach(async ({ page }) => {

  const loginPage = new LoginPage(page);
  const welcomeModal = new WelcomeModal(page);

  // Login
  await loginPage.goto(environments.baseURL);
  await loginPage.openLoginRegister();
  await loginPage.login(users.repairer.username, users.repairer.password);

  // Validate Login
  await expect(page).toHaveURL(environments.dashboardURL);

  // Close Welcome Modal
  await welcomeModal.closeIfVisible();
  await welcomeModal.closeByClickingOutside();

});

test('TC01 - Validate Dashboard,GET PRICE Landing Page and click New Quote', async ({ page }) => {

  const dashboardPage = new DashboardPage(page);
  const getPricePage = new getpricelandingPage(page);
  const quoteInfo = new quoteinfoPage(page);

  //DashBoard
  await dashboardPage.expectDashboardVisible();
  await expect(dashboardPage.getPriceTab).toBeVisible();
  //Getprice landing page
  await dashboardPage.goToGetPrice();

  await expect(getPricePage.newQuoteTab).toBeVisible();
  await expect(getPricePage.fromQuotePackageTab).toBeVisible();
  await expect(getPricePage.draftQuotesTab).toBeVisible();
  //New quote 
  await getPricePage.clickNewQuote();

  //await expect(quoteInfo.activeTab).toBeVisible();
  await expect(quoteInfo.quoteInfoTabText).toBeVisible();

});

test('TC02 - Validate Normal Quote Default and Training Quote Auto-Fill', async ({ page }) => {

  const dashboardPage = new DashboardPage(page);
  const getPricePage = new getpricelandingPage(page);
  const quoteInfo = new quoteinfoPage(page);

  // Navigate to Quote Info Page
  await dashboardPage.goToGetPrice();
  await getPricePage.clickNewQuote();

  // Validate Default State

  await expect(quoteInfo.normalQuoteRadioInput).toBeChecked();

  // Enable Training Quote

  await quoteInfo.enableTrainingQuote();
  await quoteInfo.insurerDropdown.selectOption({ label: 'Standard' });

  // Validate Auto-Fill Happened
  await expect(quoteInfo.quoteRefInput).not.toHaveValue('');
  await expect(quoteInfo.vinInput).not.toHaveValue('');
  await expect(quoteInfo.vehicleMakeDropdown).not.toHaveValue('-1');
  await expect(quoteInfo.vehicleModelInput).not.toHaveValue('');
  await expect(quoteInfo.vehicleMonthDropdown).not.toHaveValue('');
  await expect(quoteInfo.vehicleYearDropdown).not.toHaveValue('');
  await expect(quoteInfo.insurerDropdown).not.toHaveValue('-1');

});

test('TC03 - Navigate to Images Page and Click Next', async ({ page }) => {

  const dashboardPage = new DashboardPage(page);
  const getPricePage = new getpricelandingPage(page);
  const quoteInfo = new quoteinfoPage(page);
  const images = new imagesPage(page);

  // Navigate to Quote Info
  await dashboardPage.goToGetPrice();
  await getPricePage.clickNewQuote();

  // Enable Training Quote
  await quoteInfo.enableTrainingQuote();
  await quoteInfo.insurerDropdown.selectOption({ label: 'Standard' });
  await quoteInfo.clickNext();

  await images.expectImagesPageLoaded();
  await images.expectImagesTabLoaded();
  await images.expectImagesRemoveButton();

  // Click Next inside iframe

  await images.clickNext();

});

test('TC04 - Validate Build Quote Page and Add Item', async ({ page }) => {

  const dashboardPage = new DashboardPage(page);
  const getPricePage = new getpricelandingPage(page);
  const quoteInfo = new quoteinfoPage(page);
  const images = new imagesPage(page);
  const buildQuote = new buildquotePage(page);

  // Navigate to Build Quote Page

  await dashboardPage.goToGetPrice();
  await getPricePage.clickNewQuote();
  await quoteInfo.enableTrainingQuote();
  await quoteInfo.insurerDropdown.selectOption({ label: 'Standard' });
  await quoteInfo.clickNext();
  await images.clickNext();

  // Validate Key Elements Visible

  await expect(buildQuote.listViewBtn).toBeVisible();
  await expect(buildQuote.vehicleViewBtn).toBeVisible();
  await expect(buildQuote.panelAndBodyTab).toBeVisible();
  await expect(buildQuote.nextTopButton).toBeVisible();

  // Add One Item

  await buildQuote.addItem('Front Bar Cover (one piece)');

  // Validate Item Reflected in "Your Selection"

  await expect(buildQuote.selectionItems).toContainText('Front Bar Cover');

  // Click Next → Move to Part Type

  await buildQuote.clickNext();

});
test('TC05 - Select All OEM Using Header Link', async ({ page }) => {

  const dashboardPage = new DashboardPage(page);
  const getPricePage = new getpricelandingPage(page);
  const quoteInfo = new quoteinfoPage(page);
  const images = new imagesPage(page);
  const buildQuote = new buildquotePage(page);
  const partType = new partTypePage(page);

  const item = 'Front Bar Cover (one piece)';

  // Navigate 
  await dashboardPage.goToGetPrice();
  await getPricePage.clickNewQuote();
  await quoteInfo.enableTrainingQuote();
  await quoteInfo.insurerDropdown.selectOption({ label: 'Standard' });
  await quoteInfo.clickNext();
  await images.clickNext();

  await buildQuote.addItem(item);
  await buildQuote.clickNext(); // move to Part Type

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

});
test('TC06 - Validate At Least One Supplier Selected', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  const getPricePage = new getpricelandingPage(page);
  const quoteInfo = new quoteinfoPage(page);
  const images = new imagesPage(page);
  const buildQuote = new buildquotePage(page);
  const partType = new partTypePage(page);
  const item = 'Front Bar Cover (one piece)';

  const suppliers = new suppliersPage(page);
  // Navigate 
  await dashboardPage.goToGetPrice();
  await getPricePage.clickNewQuote();
  await quoteInfo.enableTrainingQuote();
  await quoteInfo.insurerDropdown.selectOption({ label: 'Standard' });
  await quoteInfo.clickNext();
  await images.clickNext();

  await buildQuote.addItem(item);
  await buildQuote.clickNext();

  await partType.selectAllOEM();
  await partType.clickNext();

  // Validate At Least One Supplier Selected

  //await expect(suppliers.selectedSuppliers.first()).toBeChecked();

  // Validate At Least One Supplier Selected

  //const selectedCount = await suppliers.selectedSuppliers.count();
  //expect(selectedCount).toBeGreaterThan(0);
  //await expect(suppliers.selectedSuppliers.first()).toBeVisible({ timeout: 10000 });
  await expect(suppliers.selectedSuppliers.first())
    .toBeChecked({ timeout: 10000 });

  // Click Next

  await suppliers.clickNext();

});
test('TC07 - Select Time and Get Submit Text', async ({ page }) => {

  const dashboardPage = new DashboardPage(page);
  const getPricePage = new getpricelandingPage(page);
  const quoteInfo = new quoteinfoPage(page);
  const images = new imagesPage(page);
  const buildQuote = new buildquotePage(page);
  const partType = new partTypePage(page);
  const suppliers = new suppliersPage(page);
  const selectTime = new selectTimePage(page);

  const item = 'Front Bar Cover (one piece)';

  // Navigate till Select Time

  await dashboardPage.goToGetPrice();
  await getPricePage.clickNewQuote();
  await quoteInfo.enableTrainingQuote();
  await quoteInfo.insurerDropdown.selectOption({ label: 'Standard' });
  await quoteInfo.clickNext();
  await images.clickNext();

  await buildQuote.addItem(item);
  await buildQuote.clickNext();

  await partType.selectAllOEM();
  await partType.clickNext();

  await suppliers.clickNext();

  // Validate Select Time Page Loaded

  await expect(selectTime.timeContainer).toBeVisible();

  // Select a Time Slot

  await selectTime.selectTime('9:00 AM');

  // Get Submit Button Text (No Click)

  const submitText = await selectTime.getSubmitText();

  console.log('Submit Button Text:', submitText);

  await expect(submitText.trim()).toBe('SUBMIT');
});
