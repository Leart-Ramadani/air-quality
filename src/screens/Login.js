// Import necessary libraries
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import data from "../data/data.json";
import tailwind from 'twrnc';

const LoginScreen = () => {
    // Initialize state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

    // Access the navigation object using useNavigation hook
    const navigation = useNavigation();

    // Handle login logic
    const handleLogin = () => {
        const isValidUser = data.some(
            (user) => user.username === username && user.password === password
        );

        if (isValidUser) {
            navigation.navigate('Home'); // Fixed this line
        } else {
            setIsSnackbarVisible(true);
        }
    };

    // Render the component
    return (
        <View style={styles.container}>
            <Text style={tailwind`text-3xl mb-6 text-center`}>Log in</Text>
            <TextInput
                label="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
                autoCapitalize='none'
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
                autoCapitalize='none'
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

// Styles
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

// Export the component
export default LoginScreen;
