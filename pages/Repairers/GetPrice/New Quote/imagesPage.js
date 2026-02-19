import { expect } from '@playwright/test';
export class imagesPage {
  constructor(page) {
    this.page = page;

    // Frame
    this.imageFrame = page.frameLocator('#imageIframe');

    // Inside iframe
    this.removeAllButton = this.imageFrame.getByRole('button', { name: 'REMOVE ALL' });
    this.addImagesButton = this.imageFrame.getByRole('button', { name: 'ADD IMAGES' });
    this.iframeNextButton = this.imageFrame.getByRole('button', { name: 'Next' });
    this.addImageIcon = this.imageFrame.locator('img.imgAdd');
    this.fileInput = this.imageFrame.locator('input[type="file"]');

    // Outside iframe (flow navigation)
    this.prevButton = page.locator('.prevbutton');
    this.nextButton = page.locator('div.l_greenButton.nextbutton');
  }

 
  // Validation
  async expectImagesTabLoaded() {
  await expect(this.addImagesButton).toBeVisible();
}
async expectImagesRemoveButton() {
  await expect(this.removeAllButton).toBeVisible();
}
  async expectImagesPageLoaded() {
    await this.addImageIcon.first().waitFor();
  }

  // Inside iframe actions


  async clickAddImages() {
    await this.addImagesButton.click();
  }

  async clickRemoveAll() {
    await this.removeAllButton.click();
  }

  async clickIframeNext() {
    await this.iframeNextButton.click();
  }

  async uploadImage(filePath) {
    await this.addImageIcon.first().click();
    await this.fileInput.setInputFiles(filePath);
  }

  // Outside iframe navigation
  
  async clickNext() {
    await this.nextButton.click();
  }

  async clickPrevious() {
    await this.prevButton.click();
  }
}
