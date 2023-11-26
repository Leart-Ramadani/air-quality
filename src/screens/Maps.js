// Maps.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import Search from './Search';
import tailwind from 'twrnc';

const Maps = () => {
    const url = 'https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png?token=0a44da259d4014c88368a078e04de8dfbc82f721';
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSearch = (location) => {
        // Do something with the selected location, e.g., update the map or fetch more details
        console.log('Selected Location:', location);
        setSelectedLocation(location);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 42.658098,
                    longitude: 21.034949,
                    latitudeDelta: 1.6,
                    longitudeDelta: 1.6,
                }}
            >
                <UrlTile urlTemplate={url} zIndex={5} maximumZ={11} flipY={false} />
                {/* You can add markers or other components based on the selectedLocation */}
            </MapView>
            <ScrollView style={styles.scrollViewWrapper}>
                <Search style={[styles.search]} onSearch={handleSearch} />
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    search: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    
    
});

export default Maps;
