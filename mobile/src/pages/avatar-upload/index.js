import React, { useState, useEffect, useRef } from 'react';
import { View,  StyleSheet, Animated, Text, StatusBar } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Avatar = () => {

	const navigation = useNavigation();
	const route = useRoute();

	const [AnimProgress, setProgress] = useState(new Animated.Value(0));

	useEffect( async () => {
		try {
		   await AsyncStorage.setItem('@id', route.params.id);
		   await AsyncStorage.setItem('@token', route.params.token);
		   await AsyncStorage.setItem('@user', route.params.user);

		}catch(e){
			console.log(e);
		}

	}, []);

	useEffect(() => {
		Animated.timing(AnimProgress, {
			toValue: 1,
			duration: 3000
		}).start();
	}, []);

	//Terminar fluxo de animação

	return(
		<View style={styles.container}>
			<StatusBar backgroundColor="#38c172" barStyle="light-content" />
			<LottieView style={styles.readyAnimation} progress={AnimProgress} source={require('../../assets/animations/ready.json')} />
			<Text style={styles.welcome}>{route.params.welcome}</Text>
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
	readyAnimation: {
		width: 100
	},
	welcome: {
		color: 'white',
		fontFamily: 'Roboto-Bold',
		fontSize: 20,
		marginTop: 20
	}
});

export default Avatar;