import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import AuthContext from '../../context/authContext';

import LottieView from 'lottie-react-native';


const LoadingSignIn = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const { signInUser, signInCompany, signInPoint, getUserLocation, latitude, longitude, error } = useContext(AuthContext);

    useEffect(() => {
        const signIn = async () => {
            const email = route.params.email;
            const password = route.params.password;
            
            await getUserLocation();
            
            switch(route.params.user){
                case 'user':
                    await signInUser(email, password, latitude, longitude);
                    console.log(error);
                    if(error != undefined || error != ''){
                        navigation.navigate('SignIn', {
                            error: 'an error'
                        });
                    }   
                break;
                case 'company':
                    await signInCompany(email, password, latitude, longitude);
                    if(error != undefined || error != ''){
                        navigation.navigate('SignIn', {
                            error: 'an error'
                        });
                    } 
                break;
                case 'point':
                    await signInPoint(email, password, latitude, longitude);
                    if(error != undefined || error != ''){
                        navigation.navigate('SignIn', {
                            error: 'an error'
                        });
                    } 
                break;
            }
        }
        signIn();
    }, []);
    
    const renderLoading = () => {
        return (
            <View style={styles.loadingView}>
                <LottieView style={styles.loadingAnimation} source={require('../../assets/animations/loading.json')} autoPlay loop />
                <Text style={styles.text}>Estamos te procurando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#38c172" barStyle="light-content" />
            {renderLoading()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38c172'
    },
    loadingAnimation: {
        width: 200
    },
    loadingView: {
        justifyContent: 'center',
        alignItems: 'center'
    },  
    text: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Roboto-Bold'
    }
});

export default LoadingSignIn;