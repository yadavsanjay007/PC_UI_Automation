import { expect } from '@playwright/test';

export class QuotePage {
    constructor(page) {
        this.page = page;

        // Buttons
        this.getPriceButton = page.locator("//div[normalize-space(text())='GET PRICE']");
        this.nextButton = page.locator("//div[normalize-space(text())='Next']");
        this.viewListButton = page.locator("//div[@onclick='onclick_viewList()']");
        this.addActionButton = page.locator('span.add-action');

        // Navigation
        this.newQuoteLink = page.getByText('New Quote');
        this.detailsTab = page.getByText('details', { exact: true });
        this.selectAllButton = page.getByText('Select All');

        // Form elements
        this.insurerSelect = page.locator('#insurerId');
    }

    // Dynamic selectors as methods
    partListItem(name) {
        return this.page.getByRole('listitem', { name });
    }

    async openGetPrice() {
        await this.getPriceButton.click();
    }

    async openNewQuote() {
        await this.newQuoteLink.click();
    }

    async openDetails() {
        await this.detailsTab.click();
    }

    async selectInsurer(label) {
        await this.insurerSelect.selectOption({ label });
    }

    async expectNextVisible() {
        await expect(this.nextButton).toBeVisible();
    }

    async openViewList() {
        await this.viewListButton.click();
    }

    async selectPart(name) {
        await this.partListItem(name).click();
    }

    async addSelectedPart() {
        await this.addActionButton.click();
    }

    async selectAll() {
        await this.selectAllButton.click();
    }
}
