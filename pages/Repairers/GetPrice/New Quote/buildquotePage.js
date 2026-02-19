// BuildQuotePage.js

export class buildquotePage {
  constructor(page) {
    this.page = page;
    this.buildFrame = page.frameLocator('#buildIframe');

  
       //COMMON SECTION (Applies to List + Vehicle View)


    // View toggles (inside iframe)
    this.listViewBtn = this.buildFrame.getByText('List View');
    this.vehicleViewBtn = this.buildFrame.getByText('Vehicle View');

    // Tabs
    this.panelAndBodyTab = this.buildFrame.getByText('Panel & Body');
    this.consumablesTab = this.buildFrame.getByText('Consumables');
    this.mechanicalTab = this.buildFrame.getByText('Mechanical');

    // Navigation
    //this.nextTopButton = page.locator('.nextbutton');
    //this.nextBottomButton = page.locator('#next_to_parts');
    this.nextTopButton = this.buildFrame.getByRole('button', { name: 'NEXT' });
    this.prevButton = page.locator('.prevbutton');
    //this.clearItemsButton = page.getByText('CLEAR ITEMS');

    // Navigation (inside iframe)
    this.nextBottomButton = this.buildFrame.getByRole('button', { name: 'NEXT' });
    this.clearItemsButton = this.buildFrame.getByRole('button', { name: 'CLEAR ITEMS' });

    // Search
    this.searchInput = page.locator('input[type="text"]');

    // Your Selection Panel
    //this.selectionItems = page.locator('.selection-content');
    this.selectionItems = this.buildFrame.locator('.selection-content');
  }

   //  COMMON ACTION METHODS
  

  async switchToListView() {
    await this.listViewBtn.click();
  }

  async switchToVehicleView() {
    await this.vehicleViewBtn.click();
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

  async clearAllItems() {
    await this.clearItemsButton.click();
  }

  async searchItem(text) {
    await this.searchInput.fill(text);
  }



    // LIST VIEW SECTION
  

  async selectListCategory(categoryName) {
    await this.buildFrame
      .locator('li.myCategory.category-list')
      .filter({ hasText: categoryName })
      .click();
  }


    // VEHICLE VIEW SECTION

  async selectVehicleSection(menuName) {
    await this.buildFrame
      .locator(`svg path[data-menu="${menuName}"]`)
      .click();
  }

  async selectSeverity(level) {
    await this.buildFrame
      .locator('.severityBtn')
      .filter({ hasText: level })
      .click();
  }


     //ITEM ACTIONS (Works for BOTH List & Vehicle View)
    

  async addItem(itemName) {
    const row = this.buildFrame
      .locator('.lineItem')
      .filter({ hasText: itemName });

    await row.locator('.add-action').click();
  }

  async removeItem(itemName) {
    const row = this.buildFrame
      .locator('.lineItem')
      .filter({ hasText: itemName });

    await row.locator('.remove-action').click();
  }

  async updateQuantity(itemName, qty) {
    const row = this.buildFrame
      .locator('.lineItem')
      .filter({ hasText: itemName });

    await row.locator('input.buildqty').fill(qty.toString());
  }

    // YOUR SELECTION PANEL ACTIONS

  async editSelectedItem(itemName) {
    const selection = this.selectionItems
      .filter({ hasText: itemName });

    await selection.locator('.action-bd-edit').click();
  }

  async removeSelectedItem(itemName) {
    const selection = this.selectionItems
      .filter({ hasText: itemName });

    await selection.locator('.action-bd').click();
  }

  async verifyItemAdded(itemName) {
    await this.page.locator('.childEditText', {
      hasText: itemName
    }).waitFor();
  }
}