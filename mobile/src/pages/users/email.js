import React, { useState, useEffect, useRef, useContext } from 'react';
import {
	View,
	Text,
	Animated,
	Image, 
	TouchableOpacity,
	TextInput,
	StyleSheet,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEnvelope, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';

import ErrorInputBox from '../../components/errorInputBox';
import AuthContext from '../../context/authContext';

const UserEmail = () => {

	const [centralViewAnim] = useState(new Animated.ValueXY({x: 0, y: 100}));
	const [centralViewOpacity] = useState(new Animated.Value(0));
	const [footerAnim] = useState(new Animated.ValueXY({x: 0, y: 100}));
	const [footerOpacity] = useState(new Animated.Value(0)); 
	const [email, setEmail] = useState();
	const [emailError, setEmailError] = useState();

	const navigation = useNavigation();
	const route = useRoute();
	const input1 = useRef(null);
	
	const { error } = useContext(AuthContext);

	useEffect(() => {
		Animated.parallel([
			Animated.timing(centralViewOpacity, {
				toValue: 1,
				duration: 700,
				useNativeDriver: true
			}),
			Animated.spring(centralViewAnim.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			}),
			Animated.timing(footerOpacity, {
				toValue: 1,
				duration: 700,
				useNativeDriver: true
			}),
			Animated.spring(footerAnim.y, { 
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			})
		]).start();
	}, []);
	
	const renderErrorInputBox = () => {
		if(error != '' && error != undefined && route.params.error != undefined){
			return (
				<ErrorInputBox>
					<Text style={styles.errorText}>{error.error}</Text>
				</ErrorInputBox>
			);
		}
	}

	useEffect(() => {
		if(error != undefined && route.params.error != undefined && error.error == 'Email de usuário já cadastrado.'){
			return setEmailError({ borderColor: 'red' });
		}
	}, [error]);

	return (
		  <View style={styles.container} behavior="padding"> 
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<FontAwesomeIcon style={styles.iconArrow} icon={ faArrowLeft } size={16}/>
				</TouchableOpacity> 
				<Text style={styles.title}>Usuário</Text>
			</View>
			
			<Animated.View 
			style={[styles.centralView,   
				{ opacity: centralViewOpacity, 
				  transform: [ {translateY: centralViewAnim.y} ] } ]
				}>
				<FontAwesomeIcon style={styles.iconTitle} icon={ faAddressBook } size={25} />
				<Text style={styles.text}>Contato</Text>
				<Text style={styles.emailLabel}>E-mail</Text>
				<TextInput
					style={[styles.emailInput, emailError]}
					onChangeText={text => setEmail(text)}
					value={email}
					placeholder="Seu melhor e-mail"
					keyboardType="email-address"
					placeholderTextColor="black"
					autoCapitalize={'none'}
					ref={input1}
				/>
				<FontAwesomeIcon style={styles.emailIcon} icon={ faEnvelope } size={20} />
				<TouchableOpacity style={styles.nextButton} 
				onPress={() => {
					if(email != null && email != ''){
						navigation.navigate('LoadingSignUp', {
							user: 'user',
							name: route.params.usernameTextInput,
							password: route.params.passwordTextInput,
							email: email,
							
						});
					}else {
						setEmailError({ borderColor: 'red' });
					}
					
				}}>
					<Text style={styles.nextText}>Avançar</Text>
				</TouchableOpacity>
			</Animated.View>

			<Animated.View 
				style={[
					styles.footer, { opacity: footerOpacity, 
					transform: [{ translateY: footerAnim.y }] } ]}>

					<LottieView 
					style={styles.robotAnim}
					source={require('../../assets/animations/robot.json')}
					autoPlay loop /> 

					<Text style={styles.textFooter}>Estou aqui para te ajudar com seus{'\n'}resíduos eletrônicos.</Text>
			</Animated.View>
			{renderErrorInputBox()}
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
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		position: 'absolute',
		width: 600,
		height: 90,
		borderRadius: 10,
		marginBottom: 20,
		backgroundColor: '#ffffff'
	},
	backButton: {
		width: 40,
		height: 30,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 35,
		marginLeft: 130,
		backgroundColor: '#ffffff',
		padding: 10,
		borderRadius: 10

	},
	title: {
		fontSize: 20,
		color: '#38c172',
		fontFamily: 'Roboto-Bold',
		marginTop: 30,
		marginBottom: 25,
		left: 0,
		bottom: 0,
		position: 'absolute',
		marginLeft: 180
		
	},
	iconArrow: {
		color: '#38c172',
		fontSize: 100
	},
	pointsImg: {
		width: 450,
		height: 260,
		top: 0,
		position: 'absolute',
		marginTop: 60,
		borderRadius: 70
	},
	centralView: {
		width: 600,
		height: 470,
		top: 0,
		marginTop: 80,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 280,
		borderBottomRightRadius: 280,
		backgroundColor: '#ffffff'
	},
	text: {
		fontSize: 23,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		color: 'black',
		marginLeft: 200,
		marginTop: 35
	},
	iconTitle: {
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 160,
		marginTop: 38,
		color: 'black',
	},
	nextText: {
		color: '#38c172',
		fontFamily: 'Roboto-Bold',
		fontSize: 20
	},
	emailLabel: {
		fontSize: 16,
		color: 'black',
		marginTop: 95,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 170 
	},
	emailInput: {
		width: 300,
		height: 50,
		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 25,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 125,
		marginLeft: 150 ,
		color: 'black',
		fontFamily: 'Roboto-Bold',
		paddingLeft: 45
	},
	emailIcon: {
		color: 'black',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 140,
		marginLeft: 165
	},
	nextButton: {
		width: 300,
		height: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#38c172',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 300,
		marginLeft: 150,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		width: 500,
		height: 150,
		bottom: 0,
		position: 'absolute',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center'
	},
	robotAnim: {
		left: 0,
		position: 'absolute',
		width: 70,
		marginLeft: 40,
		marginTop: 10
		
	},
	textFooter: {
		color: '#ffffff',
		fontSize: 15,
		fontFamily: 'Roboto-Italic',
		marginLeft: 40,
		marginTop: 40	
	},
	errorText: {
		fontSize: 15,
		fontFamily: 'Roboto-Medium',
		color: 'white'
	}
});

export default UserEmail;
