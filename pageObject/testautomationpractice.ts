import { expect, Page } from '@playwright/test';

export class TestAutomationPracticePage {
    readonly page: Page;
    readonly url: string;
    readonly pageHeader: string;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://testautomationpractice.blogspot.com/';
        this.pageHeader = '#header-inner .title';
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async validateHeaderIsVisible() {
        const element = this.page.locator(this.pageHeader);
        await expect(element).toBeVisible();
    }
}