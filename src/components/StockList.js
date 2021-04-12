import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import { getTimeSeries } from "../api/AlphaVantageSearch";
import api_config from "../api/api_config.json";
import SearchItem from "../components/SearchItem";
import StockModal from "../components/StockModal";
import WatchListItem from "./WatchListItem";

/**
 * COMPONENT: StockList
 * @param listData data to be rendered on flat list
 * @param itemType string representing which list item component to use for the flat list (watchlist, search)
 */
const StockList = ({ listData, itemType }) => {
    /**
     * STATE variables:
     * timeSeries: defines what interval we want our stock data to appear in (start with monthly)
     * modalVisible: controls visibility of StockModal
     * selectedItem: contains name and symbol of a stock, keeps track of which item was clicked on
     * chartData: contains data to generate line chart of stock values
     */
    const [timeSeries, setTimeSeries] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [chartData, setChartData] = useState({
        labels: [""],
        datasets: [
            {
                data: [0],
            },
        ],
    });

    /**
     * listens for timeSeries state change: whenever the time interval changes, fetch the new data and set state to update the chart
     */
    useEffect(() => {
        if (timeSeries === "") return;
        let symbol = selectedItem["1. symbol"];

        getTimeSeries(symbol, timeSeries)
            .then((results) => {
                let data;

                switch (timeSeries) {
                    case api_config.dailyFunction:
                        data = results["Time Series (Daily)"];
                        break;
                    case api_config.monthlyFunction:
                        data = results["Monthly Time Series"];
                        break;
                    case api_config.weeklyFunction:
                        data = results["Weekly Time Series"];
                        break;
                    default:
                        data = results["Monthly Time Series"];
                        break;
                }

                //get first 6 labels:
                let labels = Object.keys(data);
                labels = labels.slice(0, 10);
                labels = labels.reverse();
                //only show front, middle, and end labels
                let middle = Math.floor((0 + labels.length) / 2);
                for (let i = 0; i < labels.length; i++) {
                    if (i !== 0 && i !== middle && i !== labels.length - 1) {
                        labels[i] = "";
                    }
                }

                //get first 6 values:
                let valueObjs = Object.values(data);
                valueObjs = valueObjs.slice(0, 10);
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
            })
            .catch((err) => {
                console.log(err);
                alert(
                    "Couldn't get stock info. API limit likely reached. Please try again in a few minutes."
                );
            });
    }, [timeSeries]);

    /**
     * opens the stock modal
     *  - sets modal visibility to true
     *  - records the symbol selected (i.e. this opens from a search item so just save which item was pressed)
     *  - gets monthly data associated with symbol selected
     */
    const openModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
        setTimeSeries(api_config.monthlyFunction);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    /**
     * Renders a flat list item with search data
     * @param item: item to be rendered
     * @returns a view with search item component with item data
     */
    const renderItem = ({ item }) => {
        if (itemType === "searchitem") {
            return (
                <View>
                    <SearchItem item={item} openModal={openModal} />
                </View>
            );
        } else if (itemType === "watchlist") {
            return (
                <View>
                    <WatchListItem item={item} openModal={openModal} />
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={listData}
                renderItem={renderItem}
                extraData={listData}
                keyExtractor={(item, index) => index.toString()}
            />

            <StockModal
                item={selectedItem}
                setTimeSeries={setTimeSeries}
                modalVisible={modalVisible}
                onClose={closeModal}
                chartData={chartData}
            />
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
        backgroundColor: "white",
    },
});

export default StockList;
