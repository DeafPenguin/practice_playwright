import { getRequest } from '../commonMethods/apiClient';
import * as logs from '../commonMethods/commonLogs';
import * as market from './market'

const API_KEY = '1dbd2d09demsh1466da92bf53cc6p121ddbjsn61447eb3d301';
const API_HOST = 'yh-finance.p.rapidapi.com';
const endpoints = {
    getHistoricalData: `https://${API_HOST}/stock/v3/get-historical-data`,
    getChart: `https://${API_HOST}/stock/v3/get-chart`,
}

export const createPayload = (symbol: string, region: string) => ({
    params: { 
        symbol,
        region
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
});

export const getHistoricalData = async (symbol: string, region: string) => {
    // Create request and store response
    const payload = createPayload(symbol, region)
    const response = await getRequest(endpoints.getHistoricalData, payload)

    // Store data and return
    const historicalData = await response.json();
    return historicalData;
};

export const getChart = async (symbol: string, region: string) => {
    // Create request and store response
    const payload = createPayload(symbol, region)
    const response = await getRequest(endpoints.getChart, payload)

    // Store data and return
    const chartData = await response.json();
    return chartData;
};

export const getStockDailyChange = async (symbol: string, region: string) => {
    // Get historical data
    const data = await getHistoricalData(symbol, region)

    // Validate if there is sufficient data
    if (!data || !data.prices || data.prices.length < 2) {
        console.log('Insufficient data for comparison.');
        return;
    }

    // Store the latest and the previous stock value
    const [latest, previous] = data.prices.slice(0, 2);

    // Calculating change
    const latestClose = latest.close;
    const previousClose = previous.close;
    const change = latestClose - previousClose;

    // Return change
    return change;
};

export const evaluateStockDailyGrowth = async (symbol: string, region: string) => {
    console.log(`Evaluate the daily growth from ${symbol}:\n`);
    
    // Get historical data
    const data = await getHistoricalData(symbol, region)

    // Validate if there is sufficient data
    if (!data || !data.prices || data.prices.length < 2) {
        console.log('Insufficient data for comparison.');
        return;
    }

    // Store the latest and the previous stock value
    const [latest, previous] = data.prices.slice(0, 2);

    // Calculating percentage change
    const latestClose = latest.close;
    const previousClose = previous.close;
    const change = latestClose - previousClose;
    const percentageChange = (change / previousClose) * 100;

    // Printing latests data
    console.log(`Date: ${new Date(latest.date * 1000).toLocaleDateString()}, Close: ${latest.close}`);
    console.log(`Date: ${new Date(previous.date * 1000).toLocaleDateString()}, Close: ${previous.close}`);

    // Print the result
    if (change > 0) { console.log(`Stock ${symbol} increased by ${change.toFixed(2)} (${percentageChange.toFixed(2)}%) compared to the previous day.`); }
    else if (change < 0) { console.log(`Stock ${symbol} decreased by ${Math.abs(change).toFixed(2)} (${Math.abs(percentageChange).toFixed(2)}%) compared to the previous day.`); }
    else { console.log(`Stock ${symbol} had no change in price compared to the previous day.`); }
};

export const mostActiveStockDailyReport = async (region: string) => {
    logs.logBreakArea();
    const mostActiveStock = await market.getMostActiveStockOfTheDay(1);

    logs.logBreakArea();
    await market.printQuotes(mostActiveStock, region);
    
    logs.logBreakArea();
    await evaluateStockDailyGrowth(mostActiveStock, region);
};