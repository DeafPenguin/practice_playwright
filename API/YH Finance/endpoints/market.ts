import { getRequest } from '../commonMethods/apiClient';

const API_KEY = '1dbd2d09demsh1466da92bf53cc6p121ddbjsn61447eb3d301';
const API_HOST = 'yh-finance.p.rapidapi.com';
const endpoints = {
    getQuotes: `https://${API_HOST}/market/v2/get-quotes`,
    getMovers: `https://${API_HOST}/market/v2/get-movers`,
}

export const createPayload = (symbols: string, region: string) => ({
    params: {
        symbols,
        region
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
});

export async function getQuotes(symbols: string, region: string) {
    // Create request and store response
    const payload = createPayload(symbols, region)
    const response = await getRequest(endpoints.getQuotes, payload)

    // Store data and return
    const data = await response.json();
    return data;
}

export async function getMovers(count: number) {
    // Create request and store response
    const response = await getRequest(endpoints.getMovers, {
        params: {
            count
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
    })

    // Store data and return
    const data = await response.json();
    return data;
}

export async function getDayGainers(count: number) {
    const data = await getMovers(count);
    const dayGainers = data.finance.result[0];
    return dayGainers;
}

export async function getDayLosers(count: number) {
    const data = await getMovers(count);
    const dayLosers = data.finance.result[1];
    return dayLosers;
}

export async function getMostActivesOfTheDay(count: number) {
    const data = await getMovers(count);
    const mostActives = data.finance.result[2];
    return mostActives;
}

export async function getMostActiveStockOfTheDay(count: number) {
    console.log('Get the most active stock from day:\n');
    const data = await getMovers(count);
    const mostActiveStock = data.finance.result[2].quotes[0].symbol;
    console.log(`${mostActiveStock}`);
    return mostActiveStock;
}

export async function getFirstStockDayGainer(count: number) {
    console.log('Get the first stock from day gainers list:\n');
    const data = await getMovers(count);
    const firstDayGainerStock = data.finance.result[0].quotes[0].symbol;
    console.log(`${firstDayGainerStock}`);
    return firstDayGainerStock;
}

export async function getFirstStockDayLoser(count: number) {
    console.log('Get the first stock from day losers list:\n');
    const data = await getMovers(count);
    const firstDayLoserStock = data.finance.result[1].quotes[0].symbol;
    console.log(`${firstDayLoserStock}`);
    return firstDayLoserStock;
}

export async function printQuotes(symbols: string, region: string) {
    console.log(`Printing quote of ${symbols}:\n`);
    // Get quotes
    const data = await getQuotes(symbols, region);

    // Print quotes
    data.quoteResponse.result.forEach((stock: any) => {
        console.log(`${stock.symbol}: ${stock.regularMarketPrice} USD`);
    })
}