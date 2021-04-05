import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const SearchItem = ({ symbol, name, openModal }) => (
    <View>
        <TouchableOpacity onPress={() => openModal(symbol)}>
            <Text style={styles.listItemText}>
                {symbol} {name}
            </Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    listItemText: {
        color: "white",
    },
});

export default SearchItem;
