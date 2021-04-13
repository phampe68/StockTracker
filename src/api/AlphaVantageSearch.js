const api_config = require("./api_config.json");
const apikey = api_config.key;

/**
 * NOTE: can only do ~ 5 calls per minute.
 * @param searchText keywords to search for
 * @returns json containing name and ticker, type, region...
 */
export const getStockSearchResults = (searchText) => {
    let searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${apikey}`;
    return fetch(searchURL)
        .then((response) => response.json())
        .then((json) => {
            return json.bestMatches;
        })
        .catch((error) => {
            console.log(error);
        });
};

/**
 * Gets the values of a stock by a specified interval
 * @param symbol ticker symbol of stock
 * @param interval time interval between values (daily, weekly, monthly)
 * @returns time series data
 */
export const getTimeSeries = (symbol, interval) => {
    let apiURL = `https://www.alphavantage.co/query?function=${interval}&symbol=${symbol}&apikey=${apikey}`;
    return fetch(apiURL)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.log(error);
        });
};
