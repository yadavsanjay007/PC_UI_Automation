import { expect } from '@playwright/test';

export class QuotePage {
    constructor(page) {
        this.page = page;
    }

    getPriceButton() {
        return this.page.locator("//div[normalize-space(text())='GET PRICE']");
    }

    newQuoteLink() {
        return this.page.getByText('New Quote');
    }

    detailsTab() {
        return this.page.getByText('details', { exact: true });
    }

    insurerSelect() {
        return this.page.locator('#insurerId');
    }

    nextButton() {
        return this.page.locator("//div[normalize-space(text())='Next']");
    }

    viewListButton() {
        return this.page.locator("//div[@onclick='onclick_viewList()']");
    }

    partListItem(name) {
        return this.page.getByRole('listitem', { name });
    }

    addActionButton() {
        return this.page.locator('span.add-action');
    }

    selectAllButton() {
        return this.page.getByText('Select All');
    }

    async openGetPrice() {
        await this.getPriceButton().click();
    }

    async openNewQuote() {
        await this.newQuoteLink().click();
    }

    async openDetails() {
        await this.detailsTab().click();
    }

    async selectInsurer(label) {
        await this.insurerSelect().selectOption({ label });
    }

    async expectNextVisible() {
        await expect(this.nextButton()).toBeVisible();
    }

    async openViewList() {
        await this.viewListButton().click();
    }

    async selectPart(name) {
        await this.partListItem(name).click();
    }

    async addSelectedPart() {
        await this.addActionButton().click();
    }

    async selectAll() {
        await this.selectAllButton().click();
    }
}
