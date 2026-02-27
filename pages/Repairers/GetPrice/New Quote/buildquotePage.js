// BuildQuotePage.js
import { expect } from '@playwright/test';
export class buildquotePage {
  constructor(page) {
    this.page = page;
    this.buildFrame = page.frameLocator('#buildIframe');

    //COMMON SECTION (Applies to List + Vehicle View)
    // View toggles (inside iframe)
    this.listViewBtn = this.buildFrame.getByText('List View');

    // Tabs
    this.panelAndBodyTab = this.buildFrame.getByText('Panel & Body');
    this.nextTopButton = this.buildFrame.getByRole('button', { name: 'NEXT' });
    this.prevButton = page.locator('.prevbutton');
   
    // Navigation (inside iframe)
    this.nextBottomButton = this.buildFrame.getByRole('button', { name: 'NEXT' });
  
    // Your Selection Panel

    this.selectionItems = this.buildFrame.locator('.selection-content');
  }

  //  COMMON ACTION METHODS
  async switchToListView() {
    await this.listViewBtn.click();
  }

  async clickNext() {
    if (await this.nextBottomButton.isVisible()) {
      await this.nextBottomButton.click();
    } else {
      await this.nextTopButton.click();
    }
  }

  async clickPrev() {
    await this.prevButton.click();
  }

  // LIST VIEW SECTION

  async selectListCategory(categoryName) {
    const category = this.buildFrame
      .locator('li.myCategory.category-list')
      .filter({ hasText: categoryName });

    await category.click(); // click already auto-waits
  }

  // VEHICLE VIEW SECTION

  async selectVehicleSection(menuName) {
    await this.buildFrame
      .locator(`svg path[data-menu="${menuName}"]`)
      .click();
  }

  //ITEM ACTIONS (Works for BOTH List & Vehicle View)

  async addItem(itemName) {
    const row = this.buildFrame
      .locator('.lineItem')
      .filter({ hasText: itemName });
    await row.locator('.add-action').click();
  }

  async verifyItemAdded(itemName) {
    await expect(
      this.buildFrame.locator('.childEditText', { hasText: itemName })
    ).toBeVisible();
  }
  //Validation

  async expectBuildQuotePageLoaded() {
    await expect(this.panelAndBodyTab).toBeVisible();
  }
}