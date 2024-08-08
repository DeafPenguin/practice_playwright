import { test, expect } from '@playwright/test';
import { TestAutomationPracticePage } from '../pageObject/testautomationpractice';

test('Validate page element', async ({ page }) => {
    const testautomationpracticePage = new TestAutomationPracticePage(page);

    // Navigate to the page
    await testautomationpracticePage.navigate();

    // Validate Header is visible
    await testautomationpracticePage.validateHeaderIsVisible();
});