import React, { Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const state = {
    routes: [
        {
            name: "Home",
            icon: "ios-home"
        },
        {
            name: "Profile",
            icon: "ios-contact",

        },
        {
            name: "Settings",
            icon: "ios-settings"
        }
    ]
}

const SideBar = () => {
    return(
        <View>
            <Text style={styles.name}>Janna Doe</Text>
            <View style={styles.divider} />
        </View>
        <FlatList
            style={styles.flastList}
            data={state.routes}
            renderItem={}
        />
        )
}

const styles = StyleSheet.create({
    name:{
        fontWeight:"bold",
        fontSize:16,
        marginTop:10,
        paddingHorizontal: 10,  
    },
    divider: {
        height: 1,
        width: "90%",
        backgroundColor: "black",
        marginVertical: 10,
        marginHorizontal: 5,
        textAlign: "center"
    },
    flastList: {
        width: "100%",
        marginLeft: 30
    }
})

export default SideBar;


