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
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const chartConfig = {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
        borderRadius: 16,
    },
};

//modal screen displaying stock info
const StockModal = ({ name, modalVisible, onClose, chartData }) => {
    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
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

    const addToWatchListHandler = () => {
        Alert.alert("Stock added to watchlist");
    };

    return (
        <View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onBackButtonPress={onClose}
                onBackdropPress={onClose}
            >
                <View>
                    <TouchableOpacity onPress={onClose}>
                        <Text> CLOSE </Text>
                    </TouchableOpacity>
                    <Text>{name}</Text>
                </View>

                <LineChart
                    data={chartData}
                    width={500} // from react-native
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
            </Modal>
        </View>
    );
};

export default StockModal;
