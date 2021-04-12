import { Button, FlatList, View, Text } from "react-native";
import MenuButton from "../components/MenuButton";
import { firebase } from "../firebase/config";
import React, { Component, useState, useEffect } from "react";
import WatchListItem from "../components/WatchListItem";
import StockModal from "../components/StockModal";
import StockList from "../components/StockList";

import { getTimeSeriesMonthly } from "../api/AlphaVantageSearch";
import SearchItem from "../components/SearchItem";

const TestScreen = ({ navigation }) => {
    const currUserID = firebase.auth().currentUser.uid;
    const watchListRef = firebase.firestore().collection("watchlist");
    const [listData, setListData] = useState([
        {
            "1. symbol": "A",
            "2. name": "Agilent Technologies Inc",
            "3. type": "Equity",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-04",
            "8. currency": "USD",
            "9. matchScore": "1.0000",
        },
    ]);

    return (
        <View style={{ flex: 1 }}>
            <MenuButton navigation={navigation} />

            <StockList listData={listData} itemType={"watchlist"} />
        </View>
    );
};

export default TestScreen;
