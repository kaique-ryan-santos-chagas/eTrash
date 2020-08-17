import React, { useState, useEffect, useRef } from 'react';
import { View,  StyleSheet, Animated, Text, StatusBar } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Avatar = () => {

	const navigation = useNavigation();
	const route = useRoute();

	const [AnimProgress] = useState(new Animated.Value(0));
	const [endAnim] = useState(new Animated.Value(1));
	const [hideAnim] = useState(new Animated.ValueXY({x: 0, y: 0}));

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
			duration: 3000,
			useNativeDriver: true
		}).start();
	}, []);

	function hideAnimation(){
		Animated.parallel([
			Animated.spring(hideAnim.y, {
				toValue: -100,
				speed: 4,
				useNativeDriver: true
			}),
			Animated.timing(endAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true
			})
		]).start();
	}

	useEffect(() => {
		setTimeout(hideAnimation, 3000);
	}, []);

	

	return(
		<View style={styles.container}>
			<StatusBar backgroundColor="#38c172" barStyle="light-content" />
			<Animated.View style={[styles.centerAnimation, { opacity: endAnim, transform: [ { translateY: hideAnim.y } ] }]}>
				<LottieView style={styles.readyAnimation} progress={AnimProgress} source={require('../../assets/animations/ready.json')} />
				<Text style={styles.welcome}>{route.params.welcome}</Text>
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
	centerAnimation: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	readyAnimation: {
		width: 100,
	},
	welcome: {
		color: 'white',
		fontFamily: 'Roboto-Bold',
		fontSize: 20,
		marginTop: 20
	}
});

export default Avatar;