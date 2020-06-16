import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

	return (
		<View style={styles.container}> 
			<View style={styles.footer}>		
				<RectButton style={styles.optionButton} onPress={() => changeScreenToSignIn()}>
					<View style={styles.buttonIcon}>
						<FontAwesomeIcon style={styles.icon} icon={ faSignInAlt }/>
					</View>
					<Text style={styles.textButton}>Entrar</Text>
				</RectButton>
				<RectButton style={styles.optionButton} onPress={() => changeScreenToSignUp()}>
					<View style={styles.buttonIcon}>
						<FontAwesomeIcon style={styles.icon} icon={ faUserPlus }/>
					</View>
					<Text style={styles.textButton}>Nova Conta</Text>
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

	footer: {
		marginTop: 400,
	},

	optionButton: {
		backgroundColor: '#38c172',
		borderRadius: 5,
		width: 200,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 3
	},

	buttonIcon: {
		backgroundColor: '#2E8B57',
		borderRadius: 5,
		height: 50,
		width: 50,
		left: 0,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
		
	},

	icon: {
		color: '#ffffff',
		height: 50,
		width: 50,
	},

	textButton: {
		color: '#ffffff',
		fontWeight: 'bold',
	}
});

console.disableYellowBox = true;
export default SignOption;