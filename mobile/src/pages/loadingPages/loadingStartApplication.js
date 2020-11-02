import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

const LoadingStartApplication = () => {

	const navigation = useNavigation();

	const [loading, setLoading] = useState(true);

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
		const getNewUserData = async () => {
			try {
				const userStorage = await AsyncStorage.getItem('@user');
				
				if(userStorage != null){
					setTimeout(navigateToSignOption, 1000);
				}else{
					setTimeout(navigateToSlider, 1000);
				}
			}catch(error){
				console.log(error);
			}

		}
		
		getNewUserData();
		
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
