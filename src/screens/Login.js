// LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import data from "../data/data.json";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const navigation = useNavigation();

    const handleLogin = () => {
        // Check if the entered credentials match any user in the JSON data
        const isValidUser = data.some(
            (user) => user.username === username && user.password === password
        );

        if (isValidUser) {
            // Successful login
            navigation.replace('Home'); // Navigate to the Home screen
        } else {
            // Invalid credentials, show a snackbar or an alert
            setIsSnackbarVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Login
            </Button>
            <Snackbar
                visible={isSnackbarVisible}
                onDismiss={() => setIsSnackbarVisible(false)}
                action={{
                    label: 'OK',
                    onPress: () => { },
                }}
            >
                Invalid username or password
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});

export default LoginScreen;
