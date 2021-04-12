import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component, useState, useEffect } from "react";

import { firebase } from "./src/firebase/config";

import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import TestScreen from "./src/screens/TestScreen";

const Drawer = createDrawerNavigator();

//for false warning -> see: https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
    const [loading, setLoading] = useState(true);
    const [user, userData] = useState({});
    const [initialRoute, setInitialRoute] = useState("Login");

    /**
     * fetch the logged in user and set state, if there's a logged in user, navigate to home page
     * otherwise, go to login page
     */
    useEffect(() => {
        const usersRef = firebase.firestore().collection("users");
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data();
                        setLoading(false);
                        setUser(userData);
                        setInitialRoute("Home");
                    })
                    .catch((err) => {
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        });
    });

    //while loading show blank screen
    if (loading) {
        return <></>;
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName={initialRoute}>
                <Drawer.Screen name="Test" component={TestScreen} />
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Search" component={SearchScreen} />
                <Drawer.Screen name="Login" component={LoginScreen} />
                <Drawer.Screen name="SignUp" component={SignUpScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
