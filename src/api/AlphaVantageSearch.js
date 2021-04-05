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
 * get monthly prices for a specified equity
 * @param symbol for equity
 * @returns json containing monthly prices at open, high, low, and close as well as volume
 */
export const getTimeSeriesMonthly = (symbol) => {
    const monthlyFunction = api_config.monthlyFunction;

    let apiURL = `https://www.alphavantage.co/query?function=${monthlyFunction}&symbol=${symbol}&apikey=${apikey}`;
    return fetch(apiURL)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.log(error);
        });
};
