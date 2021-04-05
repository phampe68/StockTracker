import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Modal,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native";
import {
    getStockSearchResults,
    getTimeSeriesMonthly,
} from "../api/AlphaVantageSearch";
import SearchItem from "../components/SearchItem";
import StockModal from "../components/StockModal";

const SearchScreen = ({ navigation }) => {
    const [searchText, setSearch] = useState(SearchScreen.state);
    const [searchData, setSearchData] = useState([{}]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [chartData, setChartData] = useState({
        labels: [""],
        datasets: [
            {
                data: [0],
            },
        ],
    });
    /**
     * sets the search text state to save what's being entered
     * calls alphavantage search and updates search data for flat list
     * @param enteredText: entered string in search bar
     */
    const updateSearch = (enteredText) => {
        setSearch(enteredText);

        getStockSearchResults(enteredText).then((results) => {
            setSearchData(results);
        });
    };

    /**
     * opens the stock modal
     *  - sets modal visibility to true
     *  - records the symbol selected (i.e. this opens from a search item so just save which item was pressed)
     *  - gets monthly data associated with symbol selected
     * @param {} symbol
     */
    const openModal = (symbol) => {
        setSelectedItem(symbol);
        setModalVisible(true);

        getTimeSeriesMonthly(symbol).then((results) => {
            let monthlyData = results["Monthly Time Series"];
            //get first 12 labels:
            let labels = Object.keys(monthlyData);
            labels = labels.slice(0, 6);
            labels = labels.reverse();
            console.log(labels);

            //get first 12 values:
            let valueObjs = Object.values(monthlyData);
            valueObjs = valueObjs.slice(0, 6);
            valueObjs = valueObjs.reverse();
            let values = valueObjs.map((val) => val["1. open"]);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        data: values,
                    },
                ],
            });
        });
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    /**
     * Renders a flat list item with search data
     * @param item: item to be rendered
     * @returns a view with search item component with item data
     */
    const renderItem = ({ item }) => (
        <View>
            <SearchItem
                name={item["2. name"]}
                openModal={openModal}
                symbol={item["1. symbol"]}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
            <SearchBar
                onChangeText={updateSearch}
                value={searchText}
                placeholder="Type-Here"
                round
                searchIcon={{ size: 24 }}
                color="#0000FF"
            />

            <FlatList
                data={searchData}
                renderItem={renderItem}
                extraData={searchData}
                keyExtractor={(item, index) => index.toString()}
            />

            <StockModal
                name={selectedItem}
                modalVisible={modalVisible}
                onClose={closeModal}
                chartData={chartData}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
});

export default SearchScreen;
