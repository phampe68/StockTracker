import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

const Profile = ({ navigation }) => {
    return (
        <View>
            <Header name="Profile" openDrawer={navigation.openDrawer} />
            <Text>BEWM</Text>
        </View>
    );
};

export default Profile;
