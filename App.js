import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "./src/screens/HomeScreen";
import Profile from "./src/screens/ProfileScreen";
import Sidebar from "./src/components/Sidebar";

const Drawer = createDrawerNavigator(
    {
        Home: { screen: Home },
        Profile: { screen: Profile },
    },
    {
        initialRouteName: "Home",
        unmountInactiveRoutes: true,
        headerMode: "null",
        contentComponent: (props) => <Sidebar {...props} />,
    }
);

const AppNavigator = createStackNavigator(
    {
        Drawer: { screen: Drawer },
    },
    {
        initialRouteName: "Drawer",
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
    return <AppContainer />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
