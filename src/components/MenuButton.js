import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { View, Text } from "react-native";

const MenuButton = ({ navigation }) => (
    <View>
        <Icon
            name="menu"
            size={35}
            color="black"
            onPress={() => navigation.toggleDrawer()}
        />
    </View>
);
export default MenuButton;
