import React from "react";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/AntDesign";
import SearchItem from "./SearchItem";
import { firebase } from "../firebase/config";

/**
 * COMPONENT: WatchListItem
 * flat list item displaying stock name and symbol,
 * clickable to open StockModal to view more info
 * swipeable to remove from watchlist
 * @param item: contains stock symbol and name to be displayed
 * @param openModal: function from parent to open the stock modal to view more info
 */
const WatchListItem = ({ item, openModal }) => {
    //for removing from watchlist
    const currUserID = firebase.auth().currentUser.uid;
    const watchListRef = firebase.firestore().collection("watchlist");

    //extract name and symbol
    const symbol = item["symbol"];
    const name = item["name"];

    /**
     * Find the document with matching userID and symbol in database and delete
     */
    const removeFromWatchList = () => {
        watchListRef
            .where("userID", "==", currUserID)
            .where("symbol", "==", symbol)
            .onSnapshot(
                (querySnapshot) => {
                    const item = querySnapshot.docs[0];
                    console.log("ITEM", item);
                    if (item !== undefined) item.ref.delete();
                },
                (err) => {
                    console.log(err);
                }
            );
    };

    /**
     * component that is revealed when user swipes left, an X icon that calls removeFromWatchList
     * @param progress  amount that was dragged so far
     * @param dragX     how far is the user currently dragging
     */
    const RightAction = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: "clamp",
        });

        return (
            <View style={styles.rightActionContainer}>
                <Animated.View style={[{ transform: [{ scale }] }]}>
                    <Icon
                        name="closecircleo"
                        size={35}
                        color="black"
                        onPress={removeFromWatchList}
                    />
                </Animated.View>
            </View>
        );
    };

    return (
        <Swipeable renderRightActions={RightAction}>
            <SearchItem item={item} openModal={openModal} />
        </Swipeable>
    );
};

const SCREEN_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.1;
const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT * 0.1,
        backgroundColor: "white",
    },
    rightActionContainer: {
        backgroundColor: "red",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
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
        margin: 20,
        fontSize: 18,
        fontFamily: "Roboto",
    },
});
export default WatchListItem;
