// SuppliersPage.js

export class suppliersPage {
  constructor(page) {
    this.page = page;

    // Main Container

    this.supplierBox = page.locator('#supplierBox');
    this.supplierCheckboxes = page.locator('input[name="supplierSelected[]"]');
    this.selectedSuppliers = page.locator('input[name="supplierSelected[]"]:checked');
    this.nextToTimeButton = page.locator('#next_to_time');

    // Supplier Rows

    this.supplierRows = this.supplierBox.locator('.gridbody');


    // Supplier Checkboxes

    this.allSupplierCheckboxes = this.supplierBox.locator(
      'input[name="supplierSelected[]"]'
    );

    this.selectedSuppliers = this.supplierBox.locator(
      'input[name="supplierSelected[]"]:checked'
    );


    // Header Actions

    this.selectAllPreferred = page.getByText('Select All Preferred');

    // Navigation

    this.nextButton = page.locator('.l_greenButton.nextbutton');
    this.nextToTimeButton = page.locator('#next_to_time');
    this.prevButton = page.locator('.prevbutton');
  }

  // Common Actions


  async clickNext() {
    await this.nextToTimeButton.click();
  }


  async clickPrev() {
    await this.prevButton.click();
  }

  async selectAll() {
    await this.selectAllPreferred.click();
  }

  async selectFirstSupplier() {
    await this.allSupplierCheckboxes.first().check();
  }

  async unselectAllSuppliers() {
    const count = await this.allSupplierCheckboxes.count();
    for (let i = 0; i < count; i++) {
      const checkbox = this.allSupplierCheckboxes.nth(i);
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
      }
    }
  }


  // Validations (Reusable Helpers)


  async hasAtLeastOneSupplierSelected() {
    const count = await this.selectedSuppliers.count();
    return count > 0;
  }

  async getSelectedSupplierCount() {
    return await this.selectedSuppliers.count();
  }
}
