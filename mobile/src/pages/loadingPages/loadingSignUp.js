import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, StatusBar, View, Text, StyleSheet, Animated } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; 

import api from '../../services/api';

import AuthContext from '../../context/authContext';

const LoadingSignUp = () => {
	
	const route = useRoute();
	const navigation = useNavigation();

	const { country, city, region, latitude, longitude, setError } = useContext(AuthContext); 

	const [loadingViewOpacity] = useState(new Animated.Value(0));
	const [loadingViewAnim] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		Animated.parallel([
			Animated.timing(loadingViewOpacity, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true
			}),
			Animated.spring(loadingViewAnim.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			})
		]).start();
	}, []);


	const createDiscardPoint = async () => {
		
		try {

			const response = await api.post('/point/create', {
			name: route.params.name,
			email: route.params.email,
			passwordInput: route.params.passwordInput,
			discarts: route.params.discards, 
			rua: route.params.rua,
			numero: route.params.numero,
			country: country,
			city: city,
			region: region,
			latitude: latitude,
			longitude: longitude

		});

		navigation.navigate('Avatar', {
			user: 'point',
			welcome: response.data.welcome,
			token: response.data.token,
			id: response.data.id,
			username: response.data.name
		});

		}catch(error){
			console.log(error);
			setError(error.response.data);
			navigation.navigate('Address', {
				error: 'an error'
			});
			
		}
	}

	const createCompany = async () => {

		try {

			const response = await api.post('/companies/create', {
				cnpj: route.params.cnpj,
				passwordInput: route.params.passwordInput,
				collector: route.params.collector,
				country: country,
				city: city,
				region: region,
				latitude: latitude,
				longitude: longitude

			})


			navigation.navigate('Avatar', {
				user: 'company',
				welcome: response.data.welcome,
				id: response.data.id,
				token: response.data.token,
				collector: route.params.collector,
				welcome: response.data.welcome,

			});


		}catch(error){
			navigation.navigate('InvalidCnpj', {
				error: error.response.data.error,
				passwordInput: route.params.passwordInput,
				collector: route.params.collector,
				country: country,
				city: city,
				region: region,
				latitude: latitude,
				longitude: longitude

			});

		}

	}

	const createUser = async () => {


		try {

			const response = await api.post('/users/create', {
				name: route.params.name,
				email: route.params.email, 
				passwordInput: route.params.password,
				country: country,
				city: city,
				region: region,
				latitude: latitude,
				longitude: latitude
			})		

			navigation.navigate('Avatar', {
				user: 'user',
				welcome: response.data.welcome,
				id: response.data.id,
				token: response.data.token,
			});

		}catch(error){
			console.log(error);
			setError(error.response.data);
			navigation.navigate('UserEmail', {
				error: 'an error'
			});
			
			
		}

	}


	useEffect(() => {
		const signUp = async () => {
			if(route.params.user == 'user'){
				await createUser();
			}
			if(route.params.user == 'company'){
				await createCompany();
			}
			if(route.params.user == 'point'){
				await createDiscardPoint();
			}
		}

		signUp();
	}, []);


	const renderLoading = () => {
		if(loading){
			return (
				<Animated.View style={[styles.loadingView, { opacity: loadingViewOpacity, transform: [ { translateY: loadingViewAnim.y } ] } ]}>
					<ActivityIndicator size="large" color="white" />
					<Text style={styles.loadingText}>Aguarde um pouco...</Text>
				</Animated.View>
			); 

		}
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
	loadingText: {
		color: 'white',
		fontSize: 15,
		marginTop: 10,
		fontFamily: 'Roboto-Bold'
	},
	loadingView: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default LoadingSignUp;