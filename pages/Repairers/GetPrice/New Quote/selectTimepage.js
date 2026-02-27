import { expect } from '@playwright/test';

export class selectTimePage {
  constructor(page) {
    this.page = page;

    this.timeOptions = page.locator('.time-options');
    this.submitBtn = page.locator('#submit_draft');

    this.confirmModal = page.locator('form.alertable');
    this.okButton = page.locator('.alertable-buttons').getByText('OK');
  }

  getTimeSlot(timeText) {
    return this.page
      .locator('.time-options div')
      .filter({ hasText: new RegExp(timeText, 'i') })
      .first();
  }

  async verifyPageLoaded() {
    await expect(this.timeOptions).toBeVisible();
  }

  async selectTime(timeText) {
    const slot = this.getTimeSlot(timeText);
    await expect(slot).toBeVisible({ timeout: 10000 });
    await slot.click();
  }

  async getSubmitText() {
    return (await this.submitBtn.textContent())?.trim();
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }

  async confirmSubmission() {
    await expect(this.confirmModal).toBeVisible();
    await this.okButton.click();
  }
}