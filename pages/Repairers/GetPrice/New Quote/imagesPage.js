import { expect } from '@playwright/test';
export class imagesPage {
  constructor(page) {
    this.page = page;

    // Frame
    this.imageFrame = page.frameLocator('#imageIframe');

    // Inside iframe
    this.addImageIcon = this.imageFrame.locator('img.imgAdd');
    this.fileInput = this.imageFrame.locator('input[type="file"]');
    this.nextButton = page.locator('div.l_greenButton.nextbutton');
  }

  // Validation

  async expectImagesPageLoaded() {
    await this.addImageIcon.first().waitFor();
  }

  async uploadImage(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  // Outside iframe navigation

  async clickNext() {
    await this.nextButton.click();
  }

}
