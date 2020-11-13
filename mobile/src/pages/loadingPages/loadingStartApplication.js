import React, { useEffect, useState, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../../context/authContext';

const LoadingStartApplication = () => {

	const navigation = useNavigation();

	const [loading, setLoading] = useState(true);

	const { signed , signUpUser } = useContext(AuthContext);

	const renderLoading = () => {
		while(loading){
			return (
				<ActivityIndicator size="large" color="#38c172" /> 
			);
		}
	}

	const navigateToSlider = () => {
		navigation.navigate('Slider');
	}

	const navigateToSignOption = () => {
		navigation.navigate('SignOption');
	}

	
	useEffect(() => {
		const getAuthData = async () => {
			const userStorage = await AsyncStorage.getItem('@user');
			const signInUser = await AsyncStorage.getItem('@signIn');
			console.log(signInUser);
				
			if(signInUser == 'true'){
				signUpUser(true);

			}else if(signInUser == null && userStorage != null){
				setTimeout(navigateToSignOption, 3000);
			}else{
				setTimeout(navigateToSlider, 1000);
			}
		}
			
		getAuthData();
	}, []);


	return (
		<View style={styles.container}>
			{renderLoading()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'	}
});

export default LoadingStartApplication;
