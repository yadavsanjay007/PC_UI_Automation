export class selectTimePage {
  constructor(page) {
    this.page = page;

    this.timeContainer = page.locator('#not-direct-purchase');
    this.resetTimeBtn = page.getByText('RESET TIME');
    this.submitBtn = page.locator('#submit_draft');
  }

  getTimeSlot(timeText) {
    return this.timeContainer
      .locator('div')
      .filter({ hasText: timeText })
      .first();
  }

  async selectTime(timeText) {
    await this.getTimeSlot(timeText).click();
  }

  async getSubmitText() {
    return (await this.submitBtn.textContent())?.trim();
  }
}
