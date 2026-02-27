import { expect } from '@playwright/test';
export class quoteinfoPage {
  constructor(page) {
    this.page = page;

    this.quoteInfoTabText = page.getByText('Quote Info');
    //* === Quote Details Section ==== */
    this.quoteDetailsHeader = page.locator('#testData');

    // Quote type
    this.normalQuoteRadio = page.locator('label', { hasText: 'Normal Quote' });
    this.directPurchaseRadio = page.locator('label', { hasText: 'Direct Purchase' });
    this.normalQuoteRadioInput = page.locator('#NormalQuote');
    this.directPurchaseRadioInput = page.locator('#DirectPurchase');

    // Quote inputs
    this.quoteRefInput = page.locator('#quoteRef');
    this.insurerDropdown = page.locator('#insurerId');
    this.estimatorInput = page.locator('#estimator');
    this.claimNumberInput = page.locator('#claimNr');

    /* === Vehicle Details Section ==== */
    // Vehicle inputs
    this.vehicleRegoInput = page.locator('#vehRego');
    this.vinInput = page.locator('#vininput');
    this.vehicleMakeDropdown = page.locator('#vehMakeID_FK');
    this.vehicleModelInput = page.locator('#vehModel');
    this.vehicleSeriesInput = page.locator('#vehSeries');
    this.vehicleMonthDropdown = page.locator('#vehMonth');
    this.vehicleYearDropdown = page.locator('#vehYear');

    // Next Button
    this.topNextButton = page.locator('div.tabbar_button_right .nextbutton');
    this.bottomNextButton = page.locator('#next_to_images');
  }

  /* ===ACTION METHODS==== */

  async selectNormalQuote() {
    await this.normalQuoteRadio.click();
  }

  async selectDirectPurchase() {
    await this.directPurchaseRadio.click();
  }

  async getQuoteNumber() {
    await expect(this.quoteRefInput).toHaveValue(/.+/);
    return await this.quoteRefInput.inputValue();
  }

  async selectInsurer(insurerName) {
    await this.insurerDropdown.selectOption({ label: insurerName });
  }

  async clickNext(position = 'bottom') {
    if (position === 'top') {
      await this.topNextButton.click();
    } else {
      await this.bottomNextButton.click();
    }
  }
  //Validations
  async expectQuoteInfoPageLoaded() {
    await expect(this.quoteInfoTabText).toBeVisible();
    await expect(this.quoteDetailsHeader).toBeVisible();
  }
  async expectNormalQuoteSelectedByDefault() {
    await expect(this.normalQuoteRadioInput).toBeChecked();
  }
  async clickQuoteDetailsAndValidateAutofill(insurerName) {
    await this.quoteDetailsHeader.click();

    // Trigger rule engine
    await this.insurerDropdown.selectOption({ label: insurerName });

    // Now wait for autofill
    await expect(this.quoteRefInput).toHaveValue(/.+/);
    await expect(this.estimatorInput).toHaveValue(/.+/);
    await expect(this.claimNumberInput).toHaveValue(/.+/);
    await expect(this.vehicleRegoInput).toHaveValue(/.+/);
    await expect(this.vinInput).toHaveValue(/.+/);
  }
}
