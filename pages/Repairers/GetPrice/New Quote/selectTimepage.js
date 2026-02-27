import { expect } from '@playwright/test';
export class selectTimePage {
  constructor(page) {
    this.page = page;

    //this.timeContainer = page.locator('#not-direct-purchase');
    this.timeOptions = page.locator('.time-options');
    this.resetTimeBtn = page.getByText('RESET TIME');
    this.submitBtn = page.locator('#submit_draft');

    this.confirmModal = page.locator('form.alertable');
    this.confirmMessage = page.locator('.alertable-message');
    this.okButton = page.locator('.alertable-buttons').getByText('OK');
    this.cancelButton = page.locator('.alertable-buttons').getByText('CANCEL');
   this.successMessage = page
    .locator('#mainContent div')
    .filter({ hasText: 'Your quote has now been sent to your chosen suppliers' })
    .first();

  }

  getTimeSlot(timeText) {
  return this.page
    .locator('.time-options div')
    .filter({ hasText: new RegExp(timeText, 'i') })
    .first();
}

async selectTime(timeText) {
  const slot = this.getTimeSlot(timeText);

  await expect(slot).toBeVisible({ timeout: 10000 });

  await slot.click();

  // If class actually changes (verify in DOM)
  // await expect(slot).toHaveClass(/selected|active/i);
}
async selectFirstAvailableTime() {
  const slot = this.timeContainer.locator('div').filter({ hasText: /am|pm/i }).first();
  await expect(slot).toBeVisible();
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

  console.log('URL after click:', this.page.url());
}
  async verifyQuoteSubmitted() {
  await expect(this.page).toHaveURL(/action=draftSubmitted/);
  await expect(this.successMessage).toBeVisible({ timeout: 15000 });
}
async verifyPageLoaded() {
  await expect(this.timeOptions).toBeVisible();
}

}
