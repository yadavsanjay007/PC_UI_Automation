import { expect } from '@playwright/test';

export class WelcomeModal {
    constructor(page) {
        this.page = page;

        // Modal
        this.modal = page.locator('#colorbox');
    }

    async waitForVisible() {
        await this.modal.waitFor({ state: 'visible' });
    }

    async closeIfVisible() {
        // wait for the modal to appear before deciding it's not present
        try {
            await this.modal.waitFor({ state: 'visible', timeout: 2000 });
            await this.page.mouse.click(10, 10);
            await expect(this.modal).toBeHidden();
        } catch (e) {
            // modal never showed up - nothing to do
        }
    }

}
