import { expect } from '@playwright/test';
export class partTypePage {
  constructor(page) {
    this.page = page;


    // IFRAME

    this.partsFrame = page.frameLocator('#partsIframe');

    // Header Buttons
    this.clearPartBtn = this.partsFrame.getByText('CLEAR PART#');
    //this.nextBtn = this.partsFrame.getByText('NEXT');
    this.nextBtn = this.partsFrame.locator('div.l_greenButton.l_leftButton', {
  hasText: 'NEXT'
});

    // Header bulk selectors
    this.oemHeaderLink = this.partsFrame.locator('span', { hasText: 'OEM' });
  }

  // ROW LOCATORS 

  getAllOEMCheckboxes() {
    return this.partsFrame.locator(
      'input.itemtype[data-itemtype="1"]'
    );
  }

  async clickNext() {
  await expect(this.nextBtn).toBeVisible();
  await this.nextBtn.click();
}

  // Common Action Helpers

  async selectAllOEM() {
    await this.oemHeaderLink.click();
  }

}
