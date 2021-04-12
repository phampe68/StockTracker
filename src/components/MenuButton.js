import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { View } from "react-native";

/**
 * COMPONENT: MenuButton
 * black hamburger icon that toggles side drawer navigation
 * @param navigation: used to navigate between screens and open side drawer
 */
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
