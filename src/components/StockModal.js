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

//modal screen displaying stock info
const StockModal = ({ name, modalVisible, onClose, chartData }) => {
    const currUserID = firebase.auth().currentUser.uid;
    const watchListRef = firebase.firestore().collection("watchlist");

    const addToWatchListHandler = () => {
        Alert.alert("Stock added to watchlist");
        const dataToAdd = {
            text: name,
            authorID: currUserID,
        };
        watchListRef.add(dataToAdd);
    };

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
                        <TouchableOpacity onPress={onClose}>
                            <Text> CLOSE </Text>
                        </TouchableOpacity>
                        <Text>{name}</Text>
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

                        <TouchableOpacity onPress={addToWatchListHandler}>
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
        backgroundColor: "white",
        width: "80%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default StockModal;
