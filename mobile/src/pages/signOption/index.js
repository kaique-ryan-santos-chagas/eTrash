import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';


const SignOption = () => {
	
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
			<View style={styles.central}>
				<Text style={styles.textCentral}>{centralTextStr}</Text>
			</View>

			<LottieView 
				source={require('../../assets/animations/earth.json')} 
				style={styles.earthAnimation}
				autoPlay loop
			/>

			<View style={styles.footer}>		
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
			</View>
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
		marginTop: 100,
		marginBottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20

	},

	textCentral: {
		color: 'black',
		fontFamily: 'Roboto-Bold',
		fontSize: 45,
	},

	earthAnimation: {
		right: 0,
		position: 'absolute',
		marginRight: 10,
		width: 50,
		marginRight: 50,
		marginTop: 25
	},

	footer: {
		marginTop: 100
	},

	signInButton: {
		backgroundColor: '#38c172',
		borderRadius: 10,
		width: 300,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 3
	},

	signUpButton: {
		backgroundColor: '#ffffff',
		borderRadius: 5,
		width: 300,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 3
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