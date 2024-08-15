import { test, expect } from '@playwright/test'
import * as logs from './commonMethods/commonLogs';
import * as market from './endpoints/market';
import * as stock from './endpoints/stock';

const targetedRegion = 'US';

test.beforeEach(async () => {
    logs.logBreakArea();
})

test('Assert that Day Gainer is increasing its value', async () => {
    // Get the stock and his change
    const firstDayGainerStock = await market.getFirstStockDayGainer(1);
    const stockDailyChange = await stock.getStockDailyChange(firstDayGainerStock, targetedRegion)

    // Assert the change is positive
    expect(stockDailyChange).toBeGreaterThan(0);

    // Print the change
    await stock.evaluateStockDailyGrowth(firstDayGainerStock, targetedRegion)
})

test('Assert that Day Loser is decreasing its value', async () => {
    // Get the stock and his change
    const firstDayLoserStock = await market.getFirstStockDayLoser(1);
    const stockDailyChange = await stock.getStockDailyChange(firstDayLoserStock, targetedRegion)

    // Assert the change is positive
    expect(stockDailyChange).toBeLessThanOrEqual(0);

    // Print the change
    await stock.evaluateStockDailyGrowth(firstDayLoserStock, targetedRegion)
})

test.afterAll(async () => {
    logs.logBreakArea();
})