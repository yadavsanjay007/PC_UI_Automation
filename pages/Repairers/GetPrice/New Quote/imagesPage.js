import { expect } from '@playwright/test';
export class imagesPage {
  constructor(page) {
    this.page = page;

    // Frame
    this.imageFrame = page.frameLocator('#imageIframe');

    // Inside iframe
    this.addImageIcon = this.imageFrame.locator('img.imgAdd');
    this.fileInput = this.imageFrame.locator('input[type="file"]');
    this.previewIcon=this.imageFrame.getByRole('img', { name: 'Click here to View' })
    
    // Outside iframe (flow navigation)
    this.prevButton = page.locator('.prevbutton');
    this.nextButton = page.locator('div.l_greenButton.nextbutton');
  }


  // Validation
  async expectImagesPageLoaded() {
    await this.addImageIcon.first().waitFor();
  }

  // Inside iframe actions

  async uploadImage(filePath) {
  await this.fileInput.setInputFiles(filePath);
  // Wait for uploaded image view icon to appear
  await expect(this.previewIcon).toBeVisible();
}

  // Outside iframe navigation

  async clickNext() {
    await this.nextButton.click();
  }

  async clickPrevious() {
    await this.prevButton.click();
  }
}
