import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { Searchbar } from 'react-native-paper';
import tailwind from 'twrnc';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

const Search = ({ onSearch }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedResult, setSelectedResult] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.waqi.info/search/?token=0a44da259d4014c88368a078e04de8dfbc82f721&keyword=${searchQuery}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setSearchResults(data.data);
            } catch (error) {
                console.error('Error fetching air quality data:', error);
            }
        };

        fetchData();
    }, [searchQuery]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleResultPress(item)}>
            <View style={[styles.item, styles.resultItem]}>
                <Text>{`Name: ${item.station.name}`}</Text>
                <Text>{`AQI: ${item.aqi}`}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleResultPress = (result) => {
        setSelectedResult(result);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedResult(null);
    };

    const getAQIStatus = (aqi) => {
        if (aqi >= 0 && aqi <= 50) {
            return 'Good';
        } else if (aqi > 50 && aqi <= 100) {
            return 'Moderate';
        } else if (aqi > 100 && aqi <= 150) {
            return 'Unhealthy for sensitive groups';
        } else if (aqi > 150 && aqi <= 200) {
            return 'Unhealthy';
        } else if (aqi > 200 && aqi <= 300) {
            return 'Very Unhealthy';
        } else {
            return 'Hazardous';
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={tailwind`w-full px-2 pt-1`}>
                <Searchbar
                    placeholder="Enter City"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    style={tailwind`w-full`}
                />
            </SafeAreaView>

            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.station.name}
                renderItem={renderItem}
                style={styles.results}
            />

            <Modal visible={isModalVisible} onRequestClose={closeModal}>
                {selectedResult && (
                    <View style={styles.modalContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: selectedResult.station.geo[0],
                                longitude: selectedResult.station.geo[1],
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: selectedResult.station.geo[0],
                                    longitude: selectedResult.station.geo[1],
                                }}
                                title={selectedResult.station.name}
                                description={`AQI: ${selectedResult.aqi}`}
                            />
                        </MapView>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedResult.station.name}</Text>
                            <Text>{`Air Quality Index: ${selectedResult.aqi}`}</Text>
                            <Text>{`Status: ${getAQIStatus(selectedResult.aqi)}`}</Text>
                            <Text>{`Last time checked: ${selectedResult.time.stime}`}</Text>
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Modal>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    results: {
        backgroundColor: 'white',
    },
    resultItem: {
        backgroundColor: 'white',
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

export default Search;
