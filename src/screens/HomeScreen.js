import React from "react";
import { Button, View } from "react-native";
import MenuButton from "../components/MenuButton";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <MenuButton navigation={navigation} />
        </View>
    );
};

export default HomeScreen;
