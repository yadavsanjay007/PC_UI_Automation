export class imagesPage {
  constructor(page) {
    this.page = page;

    // Frame
    this.imageFrame = page.frameLocator('#imageIframe');

    // Navigation inside iframe
    this.nextButton = this.imageFrame.getByRole('button', { name: 'Next' });
    this.prevButton = page.getByText('Prev');

    // Inside frame
    this.fileInput = this.imageFrame.locator('input[type="file"]');
    this.removeAllButton = this.imageFrame.getByRole('button', { name: 'REMOVE ALL' });
    this.addImagesButton = this.imageFrame.getByRole('button', { name: 'ADD IMAGES' });
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async clickPrevious() {
    await this.prevButton.click();
  }
}