import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import AuthContext from '../../context/authContext';

const Map = () => {

    const { latitude, longitude } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <MapView 
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            showsUserLocation
            loadingEnabled
             />
        </View>
        
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1
    }
});

export default Map;
