import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Image } from 'react-native';

import LottieView from 'lottie-react-native';

import AuthContext from '../../context/authContext';

import AsyncStorage from '@react-native-community/async-storage';

const LoadingLogout = () => {
    
    const { setSigned } = useContext(AuthContext);

    useEffect(() => {
        const deleteSignIn = async () => {
            return await AsyncStorage.removeItem('@signIn');
        }

        deleteSignIn();
    }, []);

    return (
        <View style={styles.container}> 
            <StatusBar barStyle="light-content" backgroundColor="#38c172" />
            <LottieView style={styles.robot} source={require('../../assets/animations/botLogout.json')} autoPlay loop />
            <Text style={styles.text}>Até a próxima</Text>
            <Image source={{ uri: 'https://p7.hiclipart.com/preview/303/173/296/smiley-emoticon-facebook-messenger-emoji-thumbtack.jpg'}} style={styles.image} />
            <TouchableOpacity style={styles.logoutBtn} onPress={() => {
                setSigned(false);
            }}>
                <Text style={styles.textBtn}>Voltar ao menu</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    robot: {
        width: 150,
        marginLeft: 10
    },
    text: {
        color: 'black',
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        marginTop: 10,
        marginRight: 20
    },
    logoutBtn: {
        width: 180,
        height: 80,
        backgroundColor: '#38c172',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 40
    },
    textBtn: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Roboto-Bold'
    },
    image: {
        width: 30,
        height: 30,
        marginTop: 392,
        marginRight: 90,
        top: 0,
        right: 0,
        position: 'absolute'
    }
});

export default LoadingLogout;