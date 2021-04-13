import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React, { Component, useState, useEffect } from "react";

import { firebase } from "./src/firebase/config";

import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

const Drawer = createDrawerNavigator();

//for false warning -> see: https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    /**
     * Custom logout button for drawer navigation, logs out of firebase, sets logged in to false changing the navigator
     */
    const LogOutButton = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Logout"
                    onPress={() => {
                        firebase
                            .auth()
                            .signOut()
                            .then(() => {
                                alert("Logged User out");
                                setLoggedIn(false);
                            });
                    }}
                />
            </DrawerContentScrollView>
        );
    };

    /**
     * fetch the logged in user and set state, if there's a logged in user, navigate to home page
     * otherwise, go to login page
     */
    useEffect(() => {
        const usersRef = firebase.firestore().collection("users");

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setLoading(false);
                setLoggedIn(true);
            } else {
                setLoading(false);
            }
        });
        /*
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        setLoading(false);
                        setLoggedIn(true);
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        });
        */
    });

    //while loading show blank screen
    if (loading) {
        return <></>;
    }

    //logged in user sees home and search screens and logout button
    if (loggedIn) {
        return (
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    drawerContent={(props) => <LogOutButton {...props} />}
                >
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Search" component={SearchScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }

    //user who's not logged in sees sign up and login screens
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Login">
                <Drawer.Screen name="Login" component={LoginScreen} />
                <Drawer.Screen name="SignUp" component={SignUpScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
