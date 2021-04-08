import { Button, FlatList, View, Text } from "react-native";
import MenuButton from "../components/MenuButton";
import { firebase } from "../firebase/config";
import React, { Component, useState, useEffect } from "react";
import WatchListItem from "../components/WatchListItem";

const HomeScreen = ({ navigation }) => {
    const currUserID = firebase.auth().currentUser.uid;

    const watchListRef = firebase.firestore().collection("watchlist");
    const [watchList, setWatchList] = useState({});

    /**
     * On mount, load watchlist items with matching userID
     */
    useEffect(() => {
        watchListRef
            .where("userID", "==", currUserID)
            .orderBy("symbol", "desc")
            .onSnapshot(
                (querySnapshot) => {
                    const watchListItems = [];
                    querySnapshot.forEach((item) => {
                        const watchListItem = item.data();
                        watchListItem.id = item.id;
                        watchListItems.push(watchListItem);
                    });
                    setWatchList(watchListItems);
                    console.log(watchList);
                },
                (err) => {
                    console.log(err);
                }
            );
    }, []); //note: passing an array as 2nd arg to useEffect makes sure it only runs on mount/unmount

    const renderItem = ({ item }) => {
        return (
            <View>
                <WatchListItem symbol={item["symbol"]} />
            </View>
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <MenuButton navigation={navigation} />
            <Text>My Watchlist: </Text>
            <FlatList
                data={watchList}
                renderItem={renderItem}
                extraData={watchList}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default HomeScreen;
