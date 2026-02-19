export class quoteinfoPage {
  constructor(page) {
    this.page = page;

    this.quoteInfoTabText = page.getByText('Quote Info');

    //* === Quote Details Section ==== */

    this.quoteDetailsHeader = page.locator('.col-heading', {
      hasText: 'quote details'
    });

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

    // Sample / Training quote
    this.sampleQuote = page.locator('#sampleQuote');
    //this.trainingQuoteCheckbox = page.getByRole('checkbox', { name: 'Training Quote' });
    //this.trainingQuoteCheckbox = page.locator('#sampleQuote');
    this.trainingQuoteCheckbox = page.locator('#trainingQuote');
    this.trainingQuoteLabel = page.locator('#id_training_quote');

    // Notifications & user
    //this.notificationAlertText = page.getByText('Receive Email or SMS alerts');
    this.selectUserText = page.getByText('Select User');

    // FIXED: Use frameLocator instead of contentFrame()
    this.notifyUserFrame = page.frameLocator('iframe.cboxIframe');
    this.cancelButton = this.notifyUserFrame.getByText('CANCEL');

    // Reset – Quote Details
    this.resetQuoteDetailsLink = page
      .locator('#quoteDetailsSection')
      .locator('a.reset-all');

    /* === Vehicle Details Section ==== */

    this.vehicleDetailsHeader = page.locator('.col-heading', {
      hasText: 'vehicle details'
    });

    // Vehicle inputs
    this.vehicleRegoInput = page.locator('#vehRego');
    this.vinInput = page.locator('#vininput');
    //this.vehicleMakeDropdown = page.getByLabel('Make*');
    this.vehicleMakeDropdown = page.locator('#vehMakeID_FK');
    this.vehicleModelInput = page.locator('#vehModel');
    this.vehicleModelNumberInput = page.locator('#vehModelNumber');
    this.vehicleColourInput = page.locator('#vehColour');
    this.vehicleTransmissionInput = page.locator('#vehTransmission');
    this.vehicleSeriesInput = page.locator('#vehSeries');
    this.bodyDropdown = page.locator('#bodyStyleID_PK');
    this.vehicleMonthDropdown = page.locator('#vehMonth');
    this.vehicleYearDropdown = page.locator('#vehYear');


    // VIN helper
    this.noVinAvailableLink = page.getByRole('link', {
      name: 'No VIN available? Click here!'
    });

    // Reset – Vehicle Details (scoped)
    this.resetVehicleDetailsLink = page
      .locator('div.col-3', { hasText: 'Vehicle Details' })
      .locator('a.reset-all');

    /* ===Comments Section === */

    this.commentsSectionHeader = page.getByText('Comments');
    this.commentsTextarea = page.locator('#vehComments');

    this.resetCommentsFieldsLink = page
      .getByRole('link', { name: 'reset all fields' })
      .first();

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

  async selectInsurer(insurerName) {
    await this.insurerDropdown.selectOption({ label: insurerName });
  }

  /*async enableTrainingQuote() {
    await this.trainingQuoteCheckbox.check();
  }*/
  async enableTrainingQuote() {
    await this.trainingQuoteLabel.click();
  }

  async setQuoteReference(ref) {
    await this.quoteRefInput.fill(ref);
  }

  async setClaimNumber(claimNumber) {
    await this.claimNumberInput.fill(claimNumber);
  }

  //   async enableTrainingQuote() {
  //     await this.trainingQuoteCheckbox.check();
  //   }

  async disableTrainingQuote() {
    await this.trainingQuoteCheckbox.uncheck();
  }

  async fillMandatoryVehicleDetails({ vin, make, model, month, year }) {
    if (vin) await this.vinInput.fill(vin);
    if (make) await this.vehicleMakeDropdown.selectOption({ label: make });
    if (model) await this.vehicleModelInput.fill(model);
    if (month) await this.vehicleMonthDropdown.selectOption({ label: month });
    if (year) await this.vehicleYearDropdown.selectOption({ label: year });
  }

  async selectBody(body) {
    await this.bodyDropdown.selectOption({ label: body });
  }

  async addComments(comment) {
    await this.commentsTextarea.fill(comment);
  }

  async clickNext(position = 'bottom') {
    if (position === 'top') {
      await this.topNextButton.click();
    } else {
      await this.bottomNextButton.click();
    }
  }
}
