import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';

const Home = ({navigation}) => {
    return (
        <View>
               <Header name="Home" openDrawer={navigation.openDrawer}/>

        </View>
    )
}

export default Home;