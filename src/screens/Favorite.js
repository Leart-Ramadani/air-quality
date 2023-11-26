import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TouchableRipple, Card } from 'react-native-paper';

const Favorite = () => {
    const [userFavorites, setUserFavorites] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        // Load user's favorites from local JSON
        const loadUserFavorites = async () => {
            try {
                // Load your local JSON data here
                const localData = require('../data/data.json');

                // Assuming data is an array of users, find the user by username and password
                const user = localData.find((u) => u.username === 'leart' && u.password === 'leart');

                if (user) {
                    setUserFavorites(user.favorite);
                }
            } catch (error) {
                console.error('Error loading user favorites:', error);
            }
        };

        loadUserFavorites();
    }, []);

    const handleCardPress = async (stationName) => {
        try {
            // Fetch additional details from the online API for the selected station
            const response = await fetch(
                `https://api.waqi.info/search/?token=0a44da259d4014c88368a078e04de8dfbc82f721&keyword=${stationName}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.data) {
                setApiData(data);
                setModalVisible(true);
            } else {
                throw new Error('Invalid data format received from the API.');
            }
        } catch (error) {
            console.error('Error fetching details:', error.message);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setApiData(null);
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={userFavorites}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableRipple onPress={() => handleCardPress(item)} rippleColor="rgba(0, 0, 0, 0.1)">
                        <Card style={{ margin: 16 }}>
                            <Card.Content>
                                <Text>{item}</Text>
                            </Card.Content>
                        </Card>
                    </TouchableRipple>
                )}
            />

            <Modal visible={modalVisible} onRequestClose={closeModal}>
                {apiData && apiData.data && apiData.data.geo ? (
                    <View style={styles.modalContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: apiData.data.geo[0],
                                longitude: apiData.data.geo[1],
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            {apiData.data.geo && (
                                <Marker
                                    coordinate={{
                                        latitude: apiData.data.geo[0],
                                        longitude: apiData.data.geo[1],
                                    }}
                                    title={apiData.data.station.name}
                                    description={`AQI: ${apiData.data.aqi}`}
                                />
                            )}
                        </MapView>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{apiData.data.station.name}</Text>
                            <Text>{`Air Quality Index: ${apiData.data.aqi}`}</Text>
                            {/* Add other details here */}
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text>Problems fetching datas. Please try again.</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    map: {
        flex: 1,
    },
    modalContent: {
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#3498db',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Favorite;
