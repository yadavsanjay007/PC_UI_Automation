export class partTypePage {
  constructor(page) {
    this.page = page;

    this.partsFrame = page.frameLocator('#partsIframe');
    this.oemHeaderLink = this.partsFrame.locator('span', { hasText: 'OEM' });
    this.nextBtn = this.partsFrame.getByText('NEXT');
  }

  async selectAllOEM() {
    await this.oemHeaderLink.click();
  }

  async clickNext() {
    await this.nextBtn.click();
  }
}