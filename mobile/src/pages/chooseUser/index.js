import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native'; 

const ChooseUser = () => {

	const navigation = useNavigation();

	const [imageHeaderOpacity] = useState(new Animated.Value(0));
	const [showImageHeader] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [choiceTextOpacity] = useState(new Animated.Value(0));
	const [showChoiceText] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [showButtonA] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [opacityButtonA] = useState(new Animated.Value(0));
	const [showButtonB] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [opacityButtonB] = useState(new Animated.Value(0));
	const [showButtonC] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [opacityButtonC] = useState(new Animated.Value(0));

	useEffect(() => {
		Animated.parallel([
			Animated.timing(imageHeaderOpacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showImageHeader.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0,
				useNativeDriver: true
			}),
			Animated.timing(choiceTextOpacity, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true
			}),
			Animated.spring(showChoiceText.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0,
				useNativeDriver: true
			})
		]).start();
	}, []);

	useEffect(() => {
		Animated.stagger(110, [
			Animated.timing(opacityButtonA, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showButtonA.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			}),
			Animated.timing(opacityButtonB, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showButtonB.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			}),
			Animated.timing(opacityButtonC, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showButtonC.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			})
		]).start();
	}, []);

	function pointsSignUpScreen(){
		navigation.navigate('SignUpPoints');
	}

	return (
		<View style={styles.container}>
			<Animated.Image 
			style={[styles.headerImage, { opacity: imageHeaderOpacity, transform: [ { translateY: showImageHeader.y } ] } ]} 
			source={require('../../assets/pictures/chooseUser.jpg')} />

			<View style={styles.chooseContainer}>
				<Animated.Text 
				style={[
					styles.choice, 
					{ opacity: choiceTextOpacity, 
					  transform: [ { translateY: showChoiceText.y } ] }
				 ]}>
				 Escolha seu perfil
				 </Animated.Text>

				 <Animated.View style={[styles.companyView, { 
				 		opacity: opacityButtonA,
				 		transform: [ {translateY: showButtonA.y } ]
				 }]}>
				 	<TouchableOpacity 
				 	style={styles.companyButton} onPress={() => {}}>
				 		<Image 
				 		style={styles.buttonImage} 
				 		source={require('../../assets/pictures/company.jpg')} />
				 	</TouchableOpacity>
				 	<Text style={styles.textButton}>Empresa</Text>
				 </Animated.View>

				 <Animated.View style={[styles.pointView, {
				 		opacity: opacityButtonB,
				 		transform: [ {translateY: showButtonB.y } ]
				 }]}>
				 	<TouchableOpacity style={styles.pointButton} onPress={pointsSignUpScreen}>
				 		<Image 
				 		style={styles.buttonImage} 
				 		source={require('../../assets/pictures/point.jpg')} />
				 	</TouchableOpacity>
				 	<Text style={styles.textButton}>Ponto de Coleta</Text>
				 </Animated.View>

				 <Animated.View style={[styles.userView, {
				 		opacity: opacityButtonC,
				 		transform: [ {translateY: showButtonC.y } ]
				 }]}>
				 	<TouchableOpacity style={styles.userButton} onPress={() => {}}>
				 		<Image 
				 		style={styles.buttonImage} 
				 		source={require('../../assets/pictures/userImage.jpg')} />
				 	</TouchableOpacity>
				 	<Text style={styles.textButton}>Usuário</Text>
				 </Animated.View>

			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerImage: {
		top: 0,
		position: 'absolute',
		width: 400,
		height: 300,
		borderRadius: 5
	},
	chooseContainer: {
		width: 500,
		height: 430,
		borderWidth: 1,
		borderColor: '#38C172',
		borderRadius: 130,
		backgroundColor: '#ffffff',
		marginTop: 300,
		justifyContent: 'center',
		alignItems: 'center'
	},
	choice: {
		fontSize: 32,
		fontFamily: 'Roboto-Bold',
		left: 0,
		top: 0,
		position: 'absolute',
		marginLeft: 90,
		color: 'black',
		marginTop: 15,
	},
	companyView: {
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		position: 'absolute',
		marginTop: 65,
		left: 0,
		marginLeft: 100
	},
	pointView: {
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		position: 'absolute',
		marginTop: 65,
		right: 0,
		marginRight: 100
	},
	userView: {
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		position: 'absolute',
		marginTop: 180,
		bottom: 0,
	},

	companyButton: {
		width: 130,
		height: 130,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#38C172',
		borderRadius: 10,
	},
	pointButton: {
		width: 130,
		height: 130,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#38C172',
		borderRadius: 10,
	},
	userButton: {
		width: 130,
		height: 130,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#38C172',
		borderRadius: 10,
	},

	textButton: {
		color: 'black',
		fontFamily: 'Roboto-Bold',
		marginTop: 5
	},
	buttonImage: {
		width: 120,
		height: 120,
		borderRadius: 5
	}
});

export default ChooseUser;