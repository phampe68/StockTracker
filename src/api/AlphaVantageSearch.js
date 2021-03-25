const apikey = "UBXLI266Q7EB8GN9";

const getStockSearchResults = (searchText) => {
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

export default getStockSearchResults;
