import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';


import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import AuthContext from '../../context/authContext';

const SignOption = () => {

	const { getUserLocation } = useContext(AuthContext);

	const [logoOpacity] = useState(new Animated.Value(0));
	const [showLogo] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [logoTextOpacity] = useState(new Animated.Value(0));
	const [showLogoText] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [showTextCentral] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [textCentralOpacity] = useState(new Animated.Value(0));
	const [buttonAnim] = useState(new Animated.ValueXY({x: 0, y: 60}));

	useEffect(() => {
		Animated.parallel([
			Animated.timing(logoOpacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showLogo.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			}),
			Animated.timing(logoTextOpacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showLogoText.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			}),
			Animated.timing(textCentralOpacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showTextCentral.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0,
				useNativeDriver: true
			}),
			Animated.spring(buttonAnim.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0,
				useNativeDriver: true
			})
		]).start();
	}, []);


	useEffect(() => {
		const myLocation = async () => {
			await getUserLocation();
		}

		myLocation();
	}, []);



	const navigation = useNavigation();

	const centralTextStr = 'Descarte seu\nresíduo eletrônico\ne ajude o'; 

	return (
		<View style={styles.container}> 
			
			<Animated.Image 
			style={[styles.logo, { opacity: logoOpacity, transform: [ { translateY: showLogo.y }] }]} 
			source={require('../../assets/pictures/icon.jpg')} />

			<Animated.Text style={
				[styles.logoText, { opacity: logoTextOpacity, 
				transform: [ { translateY: showLogoText.y }] }]}>Trash</Animated.Text>

			<Animated.View style={[
				styles.central,
					{
						opacity: textCentralOpacity, 
						transform: [
							{ translateY: showTextCentral.y }
						]
					}
				]}>

				<Text style={styles.textCentral}>{centralTextStr}</Text>
				
				<LottieView 
					source={require('../../assets/animations/earth.json')} 
					style={styles.earthAnimation}
					autoPlay loop
				/>

			</Animated.View>

			<Animated.View style={[
				styles.footer,
				{ transform: [ { translateY: buttonAnim.y } ] }
			]}>

				<RectButton style={styles.signInButton} onPress={() => navigation.navigate('SignIn')}>


					<View style={styles.buttonIconIn}>
						<FontAwesomeIcon style={styles.iconIn} icon={ faSignInAlt } size={20} />
					</View>
					<Text style={styles.textButtonIn}>Entrar</Text>
				</RectButton>
				<RectButton style={styles.signUpButton} onPress={() => navigation.navigate('ChooseUser')}>
					<View style={styles.buttonIconUp}>
						<FontAwesomeIcon style={styles.iconUp} icon={ faUserPlus }/>
					</View>
					<Text style={styles.textButtonUp}>Nova Conta</Text>
				</RectButton>
			</Animated.View>
		</View>

	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		
	},
	central: {
		marginTop: 50,
		marginBottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 30

	},
	logo: {
		width: 100,
		height: 70,
		marginTop: 15,
		marginRight: 120,
		marginBottom: 10
	},
	logoText: {
		fontSize: 30,
		color: '#38c172',
		right: 0,
		top: 0,
		position: 'absolute',
		marginTop: 70,
		marginRight: 100,
		fontFamily: 'Nerik-normal'
	},
	textCentral: {
		color: 'black',
		fontFamily: 'Roboto-Bold',
		fontSize: 45,
	},
	earthAnimation: {
		right: 0,
		width: 50,
		position: 'absolute',
		marginRight: 80,
		marginTop: 80,
		left: 95
	},
	footer: {
		marginTop: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	signInButton: {
		backgroundColor: '#38c172',
		borderRadius: 5,
		width: 250,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 3
	},
	signUpButton: {
		backgroundColor: '#ffffff',
		borderRadius: 5,
		width: 200,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 3,
		marginTop: 10
	},
	buttonIconIn: {
		backgroundColor: 'transparent',
		borderRadius: 5,
		height: 50,
		width: 50,
		left: 0,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
		
	},
	buttonIconUp: {
		backgroundColor: 'transparent',
		borderRadius: 5,
		height: 50,
		width: 50,
		position: 'absolute',
		left: 0,
		justifyContent: 'center',
		alignItems: 'center'
		
	},

	iconIn: {
		color: '#ffffff',
	},

	iconUp: {
		color: '#38c172',
	},

	textButtonIn: {
		color: '#ffffff',
		fontFamily: 'Roboto-Bold',
		fontSize: 20
	},

	textButtonUp: {
		color: '#38c172',
		fontFamily: 'Roboto-Bold',
	}
});

console.disableYellowBox = true;
export default SignOption;