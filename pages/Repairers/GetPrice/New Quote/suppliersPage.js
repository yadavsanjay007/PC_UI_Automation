export class suppliersPage {
  constructor(page) {
    this.page = page;
    this.nextToTimeButton = page.locator('#next_to_time');
  }

  async clickNext() {
    await this.nextToTimeButton.click();
  }
}