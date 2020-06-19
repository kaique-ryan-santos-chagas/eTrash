import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';


const SignOption = () => {

	const [logoAnim] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [logoOpacity] = useState(new Animated.Value(0)); 
	const [logoText] = useState(new Animated.ValueXY({x: 0, y: 80 }));
	const [logoTextOpacity] = useState(new Animated.Value(0));
	const [showTextCentral] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [textCentralOpacity] = useState(new Animated.Value(0));
	const [buttonAnim] = useState(new Animated.ValueXY({x: 0, y: 60}))

	useEffect(() => {
		Animated.parallel([
			Animated.spring(logoAnim.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0
			}),
			Animated.timing(logoOpacity, {
				toValue: 1,
				duration: 500
			}),	
			Animated.spring(logoText.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0
			}),
			Animated.timing(logoTextOpacity, {
				toValue: 1,
				duration: 1000
			}),			
			Animated.spring(showTextCentral.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0
			}),
			Animated.timing(textCentralOpacity, {
				toValue: 1,
				duration: 500
			}),
			Animated.spring(buttonAnim.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0
			}),
		]).start();
	}, []);

	const navigation = useNavigation();

	function changeScreenToSignIn() {
		navigation.navigate('SignIn');
	}

	function changeScreenToSignUp(){
		navigation.navigate('SignUp');
	} 

	const centralTextStr = 'Descarte seu\nresíduo eletrônico\ne ajude o'; 

	return (
		<View style={styles.container}> 
			
			<Animated.Image style={[
				styles.logo,
				{
					opacity: logoOpacity,
					transform: [
						{ translateY: logoAnim.y }
					]
				}
			]} 
				source={require('../../assets/pictures/icon.jpg')} 
			/>

			<Animated.Text style={[
				styles.logoText,
				{	
					opacity: logoTextOpacity,
					transform: [
						{ translateY: logoText.y }
					]
				}

			]}>Trash</Animated.Text>

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
			</Animated.View>

			<LottieView 
				source={require('../../assets/animations/earth.json')} 
				style={styles.earthAnimation}
				autoPlay loop
			/>

			<Animated.View style={[
				styles.footer,
				{ transform: [ { translateY: buttonAnim.y } ] }
			]}>

				<RectButton style={styles.signInButton} onPress={() => changeScreenToSignIn()}>
					<View style={styles.buttonIconIn}>
						<FontAwesomeIcon style={styles.iconIn} icon={ faSignInAlt }/>
					</View>
					<Text style={styles.textButtonIn}>Entrar</Text>
				</RectButton>
				<RectButton style={styles.signUpButton} onPress={() => changeScreenToSignUp()}>
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

	central: {
		marginTop: 50,
		marginBottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 30

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
		marginRight: 50,
		marginTop: 40,
		left: 110
	},

	footer: {
		marginTop: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},

	signInButton: {
		backgroundColor: '#38c172',
		borderRadius: 10,
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
		height: 50,
		width: 50,
	},

	iconUp: {
		color: '#38c172',
		height: 50,
		width: 50,
	},

	textButtonIn: {
		color: '#ffffff',
		fontWeight: 'bold',
	},

	textButtonUp: {
		color: '#38c172',
		fontWeight: 'bold',
	}
});

console.disableYellowBox = true;
export default SignOption;