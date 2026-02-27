export class quoteinfoPage {
  constructor(page) {
    this.page = page;

    //* === Quote Details Section ==== */

    this.quoteDetailsHeader = page.locator('.col-heading', {
      hasText: 'quote details'
    });

    // Quote inputs
    this.quoteRefInput = page.locator('#quoteRef');
    this.insurerDropdown = page.locator('#insurerId');
    this.trainingQuoteLabel = page.locator('#id_training_quote');

    /* === Vehicle Details Section ==== */

    // Vehicle inputs
    this.vinInput = page.locator('#vininput');
    this.vehicleMakeDropdown = page.locator('#vehMakeID_FK');
    this.vehicleMonthDropdown = page.locator('#vehMonth');
    this.vehicleYearDropdown = page.locator('#vehYear');

    /* ===Comments Section === */

    this.commentsTextarea = page.locator('#vehComments');

    // Next Button
    this.topNextButton = page.locator('div.tabbar_button_right .nextbutton');
    this.bottomNextButton = page.locator('#next_to_images');
  }

  /* ===ACTION METHODS==== */

  async getQuoteNumber() {
    return await this.quoteRefInput.inputValue();
  }

  async enableTrainingQuote() {
    await this.trainingQuoteLabel.click();
  }

  async clickNext(position = 'bottom') {
    if (position === 'top') {
      await this.topNextButton.click();
    } else {
      await this.bottomNextButton.click();
    }
  }
}
