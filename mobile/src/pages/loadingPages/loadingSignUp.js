import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, View, Text, StyleSheet, Animated } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; 
import api from '../../services/api';

const LoadingSignUp = () => {
	
	const route = useRoute();
	const navigation = useNavigation();
	console.log(route.params);

	const [loadingViewOpacity] = useState(new Animated.Value(0));
	const [loadingViewAnim] = useState(new Animated.ValueXY({x: 0, y: 80}));

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

 
	const createUser = async () => {
		await api.post('/users/create', {
			name: route.params.name,
			email: route.params.email,
			passwordInput: route.params.password,
			country: route.params.country,
			city: route.params.city,
			region: route.params.region,
			latitude: route.params.latitude,
			longitude: route.params.longitude

		})
		.then(function(response){
			navigation.navigate('Avatar', {
				user: 'user',
				welcome: response.data.welcome,
				id: response.data.id,
				token: response.data.token
			});
			
		})
		.catch(function(error){
			console.log(error);
		})
	}

	const createDiscardPoint = async () => {
		await api.post('/point/create', {
			name: route.params.name,
			passwordInput: route.params.passwordInput,
			discarts: route.params.discarts,
			rua: route.params.rua,
			numero: route.params.numero,
			country: route.params.country,
			city: route.params.city,
			region: route.params.region,
			latitude: route.params.latitude,
			longitude: route.params.longitude

		})

		.then(function(response){
			navigation.navigate('Avatar', {
				welcome: response.data.welcome,
				token: response.data.token,
				id: response.data.id
			});
		})

		.catch(function(error){
				console.log(error);
		});

	}

	useEffect( async () => {
		if (route.params.user == 'user'){
			await setTimeout(createUser, 2000);
		}
		if (route.params.user == 'company'){

		}
		if (route.params.user == 'discardPoint') {
			await setTimeout(createDiscardPoint, 2000);
		}
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#38c172" barStyle="light-content" />
			<Animated.View style={[styles.loadingView, { opacity: loadingViewOpacity, transform: [ { translateY: loadingViewAnim.y } ] } ]}>
				<ActivityIndicator size="large" color="white" />
				<Text style={styles.loadingText}>Aguarde um pouco...</Text>
			</Animated.View>
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