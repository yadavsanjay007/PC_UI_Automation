import { expect } from '@playwright/test';

export class WelcomeModal {
    constructor(page) {
        this.page = page;
    }

    modal() {
        return this.page.locator('#colorbox');
    }

    async waitForVisible() {
        await this.modal().waitFor({ state: 'visible' });
    }

    async closeByClickingOutside() {
        await this.waitForVisible();
        await this.page.mouse.click(10, 10);
        await expect(this.modal()).toBeHidden();
    }

    async closeIfVisible() {
        if (await this.modal().isVisible()) {
            await this.page.mouse.click(10, 10);
            await expect(this.modal()).toBeHidden();
        }
    }
}
