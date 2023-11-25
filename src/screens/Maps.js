import React from 'react';
import MapView, { UrlTile } from 'react-native-maps';

const Maps = () => {
    const url = 'https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png?token=0a44da259d4014c88368a078e04de8dfbc82f721';

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 51.505,
                longitude: -0.09,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <UrlTile
                urlTemplate={url}
                zIndex={-1}
                maximumZ={11}
                flipY={false}
            />
        </MapView>
    );
};

export default Maps;