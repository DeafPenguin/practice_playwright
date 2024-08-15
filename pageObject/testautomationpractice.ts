import { expect, Page } from '@playwright/test';

export class TestAutomationPracticePage {
    readonly page: Page;
    readonly url: string;
    readonly pageHeader: string;
    readonly nameInput: string;
    readonly emailInput: string;
    readonly phoneInput: string;
    readonly addressInput: string;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://testautomationpractice.blogspot.com/';
        this.pageHeader = '#header-inner .title';
        this.nameInput = '#name';
        this.emailInput = '#email';
        this.phoneInput = '#phone';
        this.addressInput = '#textarea';
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async validateHeaderIsVisible() {
        const element = this.page.locator(this.pageHeader);
        await expect(element).toBeVisible();
    }

    async fillUserForm(userName, userEmail, userPhone, userAddress) {
        
    }
}