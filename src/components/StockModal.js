import React, { useState, useEffect } from "react";
import {
    Modal,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";

import { LineChart } from "react-native-chart-kit";
import { firebase } from "../../src/firebase/config";
import api_config from "../api/api_config.json";

//styling for react native chart kit line chart
const chartConfig = {
    backgroundColor: "#023047",
    backgroundGradientFrom: "#023047",
    backgroundGradientTo: "#023047",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726",
    },
};

/**
 * COMPONENT: StockModal
 * modal that displays stock name and a line chart with its data
 * @param item: contains stock name and symbol
 * @param modalVisible: from parent component, controls visibility of this modal
 * @param onClose: function from parent to set modalVisible to false (closing it)
 * @param chartData: contains time series data of stock to be displayed on line chart
 * @param setTimeSeries: function from parent to set time series to other values (allowing user to change time series interval from the modal)
 */
const StockModal = ({
    item,
    modalVisible,
    onClose,
    chartData,
    setTimeSeries,
}) => {
    //for adding to watchlist
    const currUserID = firebase.auth().currentUser.uid;
    const watchListRef = firebase.firestore().collection("watchlist");

    //extract symbol and name from item param
    let symbol = item["symbol"];
    let name = item["name"];

    //adds the stock to database with the userID
    const addToWatchListHandler = () => {
        //check if this is item is already on the watchlsit
        watchListRef
            .where("userID", "==", currUserID)
            .where("symbol", "==", symbol)
            .get()
            .then((results) => {
                if (results.empty) {
                    Alert.alert("Stock added to watchlist");
                    const dataToAdd = {
                        symbol: symbol,
                        name: name,
                        userID: currUserID,
                    };
                    watchListRef.add(dataToAdd);
                } else {
                    alert("Stock is already added");
                }
            });
    };

    /**
     * Use react native chart kit to display data,
     * have button to close
     * have button to add to watchlist
     * have buttons to change to daily, weekly, and monthly, time intervals
     */
    return (
        <View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onBackButtonPress={onClose}
                onBackdropPress={onClose}
                style={{ margin: 0 }}
                transparent
            >
                <View style={styles.outerContainer}>
                    <View style={styles.modal}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.modalButton}
                        >
                            <Text> CLOSE </Text>
                        </TouchableOpacity>
                        <Text style={{ color: "white" }}>{name}</Text>
                        <LineChart
                            data={chartData}
                            width={300}
                            height={220}
                            chartConfig={chartConfig}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() =>
                                setTimeSeries(api_config.dailyFunction)
                            }
                        >
                            <Text>Daily</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() =>
                                setTimeSeries(api_config.weeklyFunction)
                            }
                        >
                            <Text>Weekly</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() =>
                                setTimeSeries(api_config.monthlyFunction)
                            }
                        >
                            <Text>Monthly</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={addToWatchListHandler}
                            style={styles.modalButton}
                        >
                            <Text>Add to watchlist</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        borderRadius: 10,
        backgroundColor: "#023047",
        width: "80%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalButton: {
        borderRadius: 10,
        width: "50%",
        height: "8%",
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffb703",
    },
});

export default StockModal;
