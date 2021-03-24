import React, { Component, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";

/**
 * Header contains button to open side menu and a text showing what page we're on
 */
const Header = ({ name, openDrawer }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => openDrawer()}>
                <Text>MENU</Text>
            </TouchableOpacity>

            <Text>{name}</Text>
            <Text style={{ width: 50 }}></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
});

export default Header;
