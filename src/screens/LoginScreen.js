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
 * SCREEN: LoginScreen
 * @param navigation: used to navigate between screens and open side drawer
 * allows user to login using email and password if they have an account
 * verification through firebase
 */
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const userID = response.user.uid;
                const usersRef = firebase.firestore().collection("users");
                usersRef
                    .doc(userID)
                    .get()
                    .then((firestoreDoc) => {
                        if (!firestoreDoc.exists) {
                            alert("User does not exist.");
                            return;
                        }
                        const user = firestoreDoc.data();
                        navigation.navigate("Home", { user });
                    })
                    .catch((err) => {
                        alert(err);
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
                onChangeText={(input) => setPassword(input)}
            />
            <TouchableOpacity style={styles.button} onPress={loginHandler}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("SignUp")}
            >
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
        overflow: "hidden",
        paddingLeft: 10,
    },
});

export default LoginScreen;
