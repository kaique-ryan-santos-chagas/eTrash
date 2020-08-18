import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const SignIn = () => {

	const navigation = useNavigation();

	const [titleOpacity] = useState(new Animated.Value(0));
	const [titleShow] = useState(new Animated.ValueXY({x: 0, y: 80}));


	useEffect(() => {
		Animated.parallel([
			Animated.timing(titleOpacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(titleShow.y, {
				toValue: 0,
				speed: 4,
				useNativeDriver: true
			})
		]).start();
	}, []); 

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#38c172" barStyle="light-content"/> 
			<View style={styles.header}>	
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<FontAwesomeIcon style={styles.backIcon} icon={ faArrowLeft } />
				</TouchableOpacity>
			</View> 
			<View style={styles.center}>
				<Animated.Text style={[styles.title, { opacity: titleOpacity, transform: [ { translateY: titleShow.y } ] }]}> Seja Bem-Vindo(a) ao{'\n'} Descarte Inteligente e {'\n'} Sustentabilidade</Animated.Text>
			</View>
			<View style={styles.footer}>

			</View>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#38c172'
	},
	header: {
		width: 400,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		position: 'absolute',
		marginTop: 30, 
		
	},
	backButton: {
		width: 90,
		height: 60,
		marginTop: 35,
		left: 0,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
		
	},
	backIcon: {
		color: 'white',
		width: 200
	},
	center: {
		width: 500,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		position: 'absolute',
		marginTop: 40
	},
	title: {
		color: 'white',
		fontSize: 25,
		fontFamily: 'Roboto-Bold',
		left: 0,
		position: 'absolute',
		marginLeft: 100,

	},
	footer: {
		width: 500,
		height: 400,
		bottom: 0,
		position: 'absolute',
		backgroundColor: 'white',
		borderTopLeftRadius: 300
	}
});

export default SignIn;