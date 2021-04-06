import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.1;

const SearchItem = ({ symbol, name, openModal }) => (
    <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => openModal(symbol)}>
            <Text style={styles.listItemText}>
                {symbol} {name}
            </Text>
        </TouchableOpacity>
        <View style={styles.leftHighlight} />
    </View>
);

//see shadow generator: https://ethercreative.github.io/react-native-shadow-generator/

const styles = StyleSheet.create({
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
        margin: 20,
        fontSize: 18,
    },
});

export default SearchItem;
