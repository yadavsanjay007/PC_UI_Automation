export class buildquotePage {
  constructor(page) {
    this.page = page;
    this.buildFrame = page.frameLocator('#buildIframe');

    this.nextBottomButton = this.buildFrame.getByRole('button', { name: 'NEXT' });
    this.selectionItems = this.buildFrame.locator('.selection-content');
  }

  async addItem(itemName) {
    const row = this.buildFrame
      .locator('.lineItem')
      .filter({ hasText: itemName });

    await row.locator('.add-action').click();
  }

  async clickNext() {
    await this.nextBottomButton.click();
  }
}