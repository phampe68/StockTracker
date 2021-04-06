import React from "react";
import { Button, View } from "react-native";
import MenuButton from "../components/MenuButton";
import { firebase } from "../firebase/config";

const HomeScreen = ({ navigation }) => {
    console.log(firebase.auth().currentUser);
    return (
        <View style={{ flex: 1 }}>
            <MenuButton navigation={navigation} />
        </View>
    );
};

export default HomeScreen;
