import React, { useState, useEffect, useRef } from 'react';
import { View,  StyleSheet, Animated } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Avatar = () => {

	const navigation = useNavigation();
	const route = useRoute();

	//Terminar fluxo de animação

	return(
		<View style={styles.container}>
			<LottieView style={styles.readyAnimation} source={require('../../assets/animations/ready.json')} autoPlay loop />
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
	}
});

export default Avatar;