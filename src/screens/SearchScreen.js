import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { getStockSearchResults } from "../api/AlphaVantageSearch";
import StockList from "../components/StockList";
import Icon from "react-native-vector-icons/Feather";

/**
 * SCREEN: SearchScreen
 * allows user to search for stocks, search autogenerates results as user types
 * @param navigation: used to navigate between screens and open side drawer
 */
const SearchScreen = ({ navigation }) => {
    /**
     * STATE:
     * searchText: text currently in search bar
     * searchData: data from alphavantage search api containing search results
     */
    const [searchText, setSearch] = useState(SearchScreen.state);
    const [searchData, setSearchData] = useState([{}]);

    /**
     * sets the search text state to save what's being entered
     * calls alphavantage search and updates search data for stock list
     * @param enteredText: entered string in search bar
     */
    const updateSearch = (enteredText) => {
        setSearch(enteredText);

        getStockSearchResults(enteredText).then((results) => {
            //store symbol and name as search results
            let searchData = results.map((item) => {
                return {
                    symbol: item["1. symbol"],
                    name: item["2. name"],
                };
            });

            setSearchData(searchData);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.outerSearchContainer}>
                <View style={styles.menuIconContainer}>
                    <Icon
                        style={styles.menuIcon}
                        name="menu"
                        size={35}
                        color="white"
                        onPress={() => navigation.toggleDrawer()}
                    />
                </View>

                <SearchBar
                    onChangeText={updateSearch}
                    value={searchText}
                    placeholder="Type-Here"
                    inputStyle={{ backgroundColor: "#ffb703" }}
                    inputContainerStyle={{ backgroundColor: "transparent" }}
                    containerStyle={styles.searchBarContainer}
                    searchIcon={{ size: 24 }}
                />
            </View>
            <StockList listData={searchData} itemType={"searchitem"} />
        </View>
    );
};

const styles = StyleSheet.create({
    menuIconContainer: {
        marginRight: "auto",
        marginTop: "auto",
    },
    menuIcon: {
        marginBottom: 25,
        marginHorizontal: 20,
    },
    container: {
        flex: 1,
    },
    outerSearchContainer: {
        marginTop: -20,
        marginBottom: 20,
        backgroundColor: "#023047",
        borderRadius: 20,
        paddingTop: 80,
        paddingBottom: 10,
        flexDirection: "row",
    },
    searchBarContainer: {
        width: "60%",
        height: 60,
        backgroundColor: "#ffb703",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "transparent",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        marginRight: 15,
        marginBottom: 15,
    },
});

export default SearchScreen;
