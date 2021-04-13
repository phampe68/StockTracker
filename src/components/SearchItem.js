import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
} from "react-native";

/**
 * COMPONENT: SearchItem
 * a flat list item containing stock name and symbol, is clickable to reveal a StockModal containing more info on the stock
 * @param item: contains stock symbol and name to be displayed
 * @param openModal: function from parent to open the stock modal to view more info
 */
const SearchItem = ({ item, openModal }) => {
    return (
        <TouchableOpacity
            onPress={() => openModal(item)}
            style={styles.itemContainer}
        >
            <View style={styles.container}>
                <Text style={styles.listItemText}>{item["symbol"]}</Text>
                <Text style={styles.listItemText}>{item["name"]}</Text>
            </View>
            <View style={styles.leftHighlight} />
        </TouchableOpacity>
    );
};

//see shadow generator: https://ethercreative.github.io/react-native-shadow-generator/
const SCREEN_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.1;
const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT * 0.1,
        backgroundColor: "white",
    },
    itemContainer: {
        margin: 10,
        backgroundColor: "white",
        height: ITEM_HEIGHT,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    leftHighlight: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginTop: "auto",
        backgroundColor: "#fb8500",
        width: 5,
        height: ITEM_HEIGHT,
    },
    listItemText: {
        color: "black",
        marginHorizontal: 20,
        marginVertical: 5,
        fontSize: 18,
        fontFamily: "Roboto",
    },
});

export default SearchItem;
