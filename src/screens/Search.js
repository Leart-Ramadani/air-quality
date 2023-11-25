// AirQualityData.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://api.waqi.info/search/?token=0a44da259d4014c88368a078e04de8dfbc82f721&keyword=Prishtine'
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
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{`Name: ${item.station.name}`}</Text>
            <Text>{`AQI: ${item.aqi}`}</Text>
            {/* Add more information as needed */}
        </View>
    );

    return (
        <View style={tailwind`w-full flex justify-center`}>
            <Text style={tailwind`text-center text-lg font-semibold`}>Search city:</Text>
            <SafeAreaView style={tailwind`w-100 flex flex-row gap-1`}>
                <TextInput
                    label="Enter City"
                    right={<TextInput.Icon icon="magnify" />}
                    style={tailwind`w-full`}
                />

            </SafeAreaView>
            {/* <FlatList
                data={searchResults}
                keyExtractor={(item) => item.station.name}
                renderItem={renderItem}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    input: {
        borderColor: 'grey',
        borderWidth: 2
    }
});

export default Search;
