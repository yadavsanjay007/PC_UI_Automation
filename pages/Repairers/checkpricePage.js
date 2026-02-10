import { expect } from '@playwright/test';

export class GetPricePage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.checkPriceTab = page.getByText('CHECK PRICE');

        // Vehicle Row (can be dynamic later)
        this.vehicleRow = page.getByRole('row', { name: /Toyota/ });
        this.vehicleLink = this.vehicleRow.getByRole('link');

        // Quote section
        this.quoteLabel = page.getByText('QUOTE:').first();

        // Reports
        this.listPriceReport = page.getByText('List Price Report');
        this.printAvailablePrices = page.getByText('Print Available Prices');

        // Quote actions
        this.cancelRequestText = page.getByText('Cancel Request');
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.okBtn = page.getByRole('button', { name: 'OK' });

        // Saved Quotes
        this.savedQuotesTab = page.getByText('Saved Quotes');
        this.transferQuotesBtn = page.locator('#transferQuotesButton div')
            .filter({ hasText: 'Transfer Quotes' });
        this.closeBtn = page.getByRole('button', { name: 'close' });
    }

    async navigateToCheckPrice() {
        await this.checkPriceTab.click();
    }

    async openVehicle() {
        await this.vehicleLink.click();
    }

    async openQuoteSection() {
        await this.quoteLabel.click();
    }

    async downloadListPriceReport() {
        const popupPromise = this.page.waitForEvent('popup');
        const downloadPromise = this.page.waitForEvent('download');

        await this.listPriceReport.click();

        const popup = await popupPromise;
        const download = await downloadPromise;

        return { popup, download };
    }

    async downloadAvailablePrices() {
        const popupPromise = this.page.waitForEvent('popup');
        const downloadPromise = this.page.waitForEvent('download');

        await this.printAvailablePrices.click();

        const popup = await popupPromise;
        const download = await downloadPromise;

        return { popup, download };
    }

    async cancelQuoteFlow(vehicleText) {
        await this.page.getByText(vehicleText).first().click();
        await this.cancelRequestText.click();
        await this.cancelBtn.click();

        await this.cancelRequestText.click();
        await this.okBtn.click();
    }

    async openSavedQuotes() {
        await this.savedQuotesTab.click();
    }

    async transferQuotes() {
        await this.transferQuotesBtn.click();
    }

    async closeModal() {
        await this.closeBtn.click();
    }
}
