import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

/**
 * Item component: a button that navigates to a page
 */
const Item = ({ item, navigate }) => {
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigate(item.name)}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );
};

/**
 * A sliding menu from the side for page navigation
 */
const SideBar = ({ navigation }) => {
    //state: the names to each page to navigate to and an icon associated to it
    const [routes, setRoutes] = useState([
        {
            name: "Home",
            icon: "ios-home",
        },
        {
            name: "Profile",
            icon: "ios-contact",
        },
    ]);

    //use flat list to display links to other pages
    return (
        <View>
            <View>
                <Text style={styles.name}>Stock Tracker</Text>
                <View style={styles.divider} />
            </View>
            <FlatList
                style={styles.flastList}
                data={routes}
                renderItem={({ item }) => {
                    return <Item item={item} navigate={navigation.navigate} />;
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    name: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    divider: {
        height: 1,
        width: "90%",
        backgroundColor: "black",
        marginVertical: 10,
        marginHorizontal: 5,
        textAlign: "center",
    },
    flastList: {
        width: "100%",
        marginLeft: 30,
    },
    listItem: {
        height: 50,
        alignItems: "center",
        flexDirection: "row",
    },
});

export default SideBar;
