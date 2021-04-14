import { View, Text, StyleSheet } from "react-native";
import { firebase } from "../firebase/config";
import React, { useState, useEffect } from "react";
import StockList from "../components/StockList";
import Icon from "react-native-vector-icons/Feather";

/**
 * SCREEN: HomeScreen
 *  shows the user's current watchlist using the StockList component and specifying list items to be "watchlist"
 *  allowing swipeable remove from wathclist functionality
 * @param navigation: used to navigate between screens and open side drawer
 */
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
            .onSnapshot((querySnapshot) => {
                let watchListItems = [];
                querySnapshot.forEach((item) => {
                    let watchListItem = item.data();
                    watchListItems.push(watchListItem);
                });
                setWatchList(watchListItems);
            });
    }, []); //note: passing an array as 2nd arg to useEffect makes sure it only runs on mount/unmount

    //menu button toggle side drawer
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.menuIconContainer}>
                    <Icon
                        style={styles.menuIcon}
                        name="menu"
                        size={35}
                        color="white"
                        onPress={() => navigation.toggleDrawer()}
                    />
                </View>
                <Text style={styles.titleText}>My Watchlist: </Text>
            </View>

            <StockList listData={watchList} itemType={"watchlist"} />
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        marginTop: -20,
        marginBottom: 20,
        backgroundColor: "#023047",
        borderRadius: 20,
        paddingTop: 80,
        paddingBottom: 10,
        flexDirection: "row",
    },
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
    },
    titleText: {
        fontSize: 26,
        color: "white",
        marginRight: 15,
        marginBottom: 15,
    },
});

export default HomeScreen;
