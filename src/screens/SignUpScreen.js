import React, { useState } from "react";
import { firebase } from "../firebase/config";

import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    StyleSheet,
    Image,
} from "react-native";

/**
 * SCREEN: SignUpScreen
 * allows user to register for an account with their email and password using firebase
 * @param navigation: used to navigate between screens and open side drawer
 */
const SignUpScreen = ({ navigation }) => {
    /**
     * STATE:
     * password: password for new account
     * confirmPassword: used for making sure user enters the same password twice (incase they make a typo)
     * email: email associated with new account
     */
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    /**
     * Use firebase createUserWithEmailAndPassword to generate a new account
     * make sure passwords match first
     */
    const signUpHandler = () => {
        if (password !== confirmPassword) {
            alert("Entered passwords do not match. Try again.");
            return;
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const userID = response.user.uid;
                const data = {
                    id: userID,
                    email,
                };
                const usersRef = firebase.firestore().collection("users");
                usersRef
                    .doc(userID)
                    .set(data)
                    .then(() => {
                        navigation.navigate("Home", { user: data });
                    })
                    .catch((err) => {
                        alert(error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={require("../../assets/business-icon.png")}
            />

            <TextInput
                style={styles.textInput}
                placeholder="E-mail"
                onChangeText={(input) => setEmail(input)}
            />

            <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={(input) => setPassword(input)}
            />

            <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={(input) => setConfirmPassword(input)}
            />
            <TouchableOpacity style={styles.button} onPress={signUpHandler}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    icon: {
        resizeMode: "contain",
        height: 100,
        marginTop: 50,
        marginBottom: 50,
    },
    button: {
        marginTop: 20,
        height: 50,
        width: "80%",
        backgroundColor: "blue",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "white",
    },
    textInput: {
        marginTop: 20,
        height: 50,
        width: "80%",
        backgroundColor: "white",
        borderRadius: 5,
        paddingLeft: 10,
    },
});

export default SignUpScreen;
