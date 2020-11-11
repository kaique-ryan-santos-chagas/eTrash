import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView , Text } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useNavigation } from '@react-navigation/native';



const Map = () => {

    const [region, setRegion] = useState();
    const [discardPoints, setDiscardPoints] = useState([]);
    const [pointsImages, setImagePoints] = useState([]);
    const [mapDisplay, setMapDisplay] = useState({ display: 'none' });

    const navigation = useNavigation();

    useEffect(() => {
        const getDiscardPoints = async () => {
            const userToken = await AsyncStorage.getItem('@token');

            const response = await api.get('/point', {
                headers: {
                    authentication: `Bearer ${userToken}` 
                }
            });
    
            response.data.points.map((item) => {
                discardPoints.push(item);
            });

            response.data.avatar.map((item) => {
                pointsImages.push(item);
            });

            setMapDisplay({ display: 'flex' });

                      
        } 

        getDiscardPoints();
        console.log(pointsImages) 
       
    }, []);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            data => {
                setRegion({ latitude: data.coords.latitude, longitude: data.coords.longitude,  latitudeDelta: 0.0143, longitudeDelta: 0.0134, })
            },
            error => {
                console.log(error);
            },
          
        )

    }, []);
    

    return (
        <View style={styles.container}>
            <MapView 
                style={[styles.map, mapDisplay]}
                region={region}
                provider={PROVIDER_GOOGLE}
                loadingEnabled
                showsMyLocationButton
                showsUserLocation
            >
                  
            


            </MapView>


            <TouchableOpacity style={styles.drawerButton} onPress={() => {
                navigation.openDrawer();
            }}> 
                <FontAwesomeIcon size={25} icon={faBars} style={{ color: 'white' }} />
            </TouchableOpacity>
        
            
        </View>
        
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1
    },
    drawerButton: {
        top: 0,
        left: 0,
        marginTop: 40,
        marginLeft: 10,
        position: 'absolute',
        backgroundColor: '#38c172',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    }
});

export default Map;
