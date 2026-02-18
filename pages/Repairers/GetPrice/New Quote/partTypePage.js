export class partTypePage {
  constructor(page) {
    this.page = page;


    // IFRAME

    this.partsFrame = page.frameLocator('#partsIframe');

    // Header Buttons
    this.clearPartBtn = this.partsFrame.getByText('CLEAR PART#');
    this.clearCommentsBtn = this.partsFrame.getByText('CLEAR COMMENTS');
    this.selectAllBtn = this.partsFrame.getByText('Select All');
    this.addPartsBtn = this.partsFrame.getByText('ADD PARTS');
    this.nextBtn = this.partsFrame.getByText('NEXT');

    // Header bulk selectors
    this.oemHeaderLink = this.partsFrame.locator('span', { hasText: 'OEM' });
    this.usedHeaderLink = this.partsFrame.locator('span', { hasText: 'Used' });
    this.aftermarketHeaderLink = this.partsFrame.locator('span', { hasText: 'AfM' });
    this.recoHeaderLink = this.partsFrame.locator('span', { hasText: 'Reco' });
  }

  // ROW LOCATORS (Description-Based – Stable Approach)

  /**
   * Returns the row container that contains
   * the disabled description input with given value
   */
  getRowByDescription(description) {
    return this.partsFrame
      .locator('.gridbody')
      .filter({
        has: this.partsFrame.locator(
          `input[disabled][value="${description}"]`
        )
      })
      .first(); // ensure single row
  }



  
   //* Returns the disabled description input
   
  getDescriptionByValue(description) {
    return this.partsFrame.locator(
      `input[disabled][value="${description}"]`
    );
  }
  getAllOEMCheckboxes() {
    return this.partsFrame.locator(
      'input.itemtype[data-itemtype="1"]'
    );
  }

  
   //* Returns OEM checkbox inside a row
  
  getOEMCheckbox(description) {
    return this.getRowByDescription(description)
      .locator('input.itemtype[data-itemtype="1"]');
  }
  
   //* Returns Used checkbox
   
  getUsedCheckbox(description) {
    return this.getRowByDescription(description)
      .locator('input[type="checkbox"]')
      .nth(1);
  }

  
  // * Returns Aftermarket checkbox

  getAftermarketCheckbox(description) {
    return this.getRowByDescription(description)
      .locator('input[type="checkbox"]')
      .nth(2);
  }


  // * Returns Reconditioned checkbox

  getRecoCheckbox(description) {
    return this.getRowByDescription(description)
      .locator('input[type="checkbox"]')
      .nth(3);
  }

 
   //* Quantity input
   
  getQuantityInput(description) {
    return this.getRowByDescription(description)
      .locator('input[type="text"]')
      .last();
  }

  // Header Actions

  async clearPartNumbers() {
    await this.clearPartBtn.click();
  }

  async clearComments() {
    await this.clearCommentsBtn.click();
  }

  async selectAll() {
    await this.selectAllBtn.click();
  }

  async addParts() {
    await this.addPartsBtn.click();
  }

  async clickNext() {
    await this.nextBtn.click();
  }

  // Common Action Helpers

  async selectAllOEM() {
    await this.oemHeaderLink.click();
  }
  async selectOEM(description) {
    await this.getOEMCheckbox(description)
      .evaluate(el => el.click());
  }


  async selectUsed(description) {
    const checkbox = this.getUsedCheckbox(description);
    await checkbox.check();
  }

  async selectAftermarket(description) {
    const checkbox = this.getAftermarketCheckbox(description);
    await checkbox.check();
  }

  async selectReco(description) {
    const checkbox = this.getRecoCheckbox(description);
    await checkbox.check();
  }
}
