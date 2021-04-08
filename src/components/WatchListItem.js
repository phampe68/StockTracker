import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    Animated,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/AntDesign";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const ITEM_HEIGHT = SCREEN_HEIGHT * 0.1;

const WatchListItem = ({ symbol }) => {
    /**
     * component revealed when user swipes left
     * @param progress  amount that was dragged so far
     * @param dragX     how far is the user currently dragging
     * @returns
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
                        onPress={() => navigation.toggleDrawer()}
                    />
                </Animated.View>
            </View>
        );
    };

    return (
        <Swipeable renderRightActions={RightAction}>
            <View style={styles.container}>
                <Text>{symbol}</Text>
            </View>
        </Swipeable>
    );
};

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
});
export default WatchListItem;
