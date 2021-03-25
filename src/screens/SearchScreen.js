import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { SearchBar } from "react-native-elements";
import { FlatList } from "react-native";
import getStockSearchResults from "../api/AlphaVantageSearch";
import { TouchableOpacity } from "react-native";

//search screen:
const Search = ({ navigation }) => {
    //current text that is entered in the search bar
    const [searchText, setSearch] = useState(Search.state);

    //search results
    const [data, setData] = useState([
        {
            "1. symbol": "AAPL",
            "2. name": "Apple",
        },
        {
            "1. symbol": "TSLA",
            "2. name": "Tesla",
        },
    ]);

    //when text changes: set the state and update search results
    const updateSearch = (search) => {
        setSearch(search);

        getStockSearchResults(search).then((results) => {
            setData(results);
            console.log(data);
        });
    };

    //represents individual item on flat list
    const Item = ({ symbol, name }) => (
        <View>
            <TouchableOpacity>
                <Text>
                    {symbol} {name}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item name={item["2. name"]} symbol={item["1. symbol"]} />
    );

    return (
        <View>
            <Header name="Search" openDrawer={navigation.openDrawer} />
            <SearchBar
                placeholder="Type-Here"
                onChangeText={updateSearch}
                value={searchText}
                round
                searchIcon={{ size: 24 }}
                color="#0000FF"
            />

            <FlatList data={data} renderItem={renderItem} extraData={data} />
        </View>
    );
};

export default Search;
