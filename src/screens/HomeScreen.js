import React from "react";
import { Button, View } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
            <Button
                onPress={() => navigation.navigate("Search")}
                title="Go to Search"
            />
        </View>
    );
};

export default HomeScreen;
