import { expect } from '@playwright/test';

export class suppliersPage {
  constructor(page) {
    this.page = page;

    // Main container
    this.supplierBox = page.locator('#supplierBox');

    // Supplier checkboxes
    this.allSupplierCheckboxes = this.supplierBox.locator(
      'input[name="supplierSelected[]"]'
    );

    this.selectedSuppliers = this.supplierBox.locator(
      'input[name="supplierSelected[]"]:checked'
    );

    // Navigation
    this.nextToTimeButton = page.locator('#next_to_time');
  }

  // Wait until Suppliers step is structurally ready
  async waitForSuppliersPageReady() {
    await this.nextToTimeButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  // Safe handler for supplier logic
  async handleSuppliersAndProceed() {
    await this.waitForSuppliersPageReady();

    const totalSuppliers = await this.allSupplierCheckboxes.count();

    if (totalSuppliers > 0) {
      const selectedCount = await this.selectedSuppliers.count();

      if (selectedCount === 0) {
        await this.allSupplierCheckboxes.first().check();
      }
    } else {
      console.log('No suppliers returned for this quote. Proceeding...');
    }

    await this.nextToTimeButton.click();
  }
}