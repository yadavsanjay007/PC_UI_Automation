export class getpricelandingPage {
  constructor(page) {
    this.page = page;
    this.newQuoteTab = page.getByText('New Quote', { exact: true });
    this.fromQuotePackageTab=page.getByText('From Quote Package',{ exact: true});
    this.draftQuotesTab=page.getByText('Draft Quotes', {exact : true});
  }

  async clickNewQuote() {
    await this.newQuoteTab.click();
  }
  async clickFromQuotePackage() {
    await this.fromQuotePackageTab.click();
  }
  async clickDraftQuotes() {
    await this.draftQuotesTab.click();
  }
}