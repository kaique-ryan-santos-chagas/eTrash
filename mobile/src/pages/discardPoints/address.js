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
import { faMapMarkedAlt, faSortNumericUp, faArrowLeft, faRoad, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';

import AuthContext from '../../context/authContext';
import ErrorInputBox from '../../components/errorInputBox';

const Address = () => {

	const [centralViewAnim] = useState(new Animated.ValueXY({x: 0, y: 100}));
	const [centralViewOpacity] = useState(new Animated.Value(0));
	const [footerAnim] = useState(new Animated.ValueXY({x: 0, y: 100}));
	const [footerOpacity] = useState(new Animated.Value(0)); 
	const [number, setNumber] = useState();
	const [street, setStreet] = useState();
	const [email, setEmail] = useState();
	const [errorEmail, setErrorEmail] = useState();

	const navigation = useNavigation();
	const route = useRoute();
	const input1 = useRef(null);
	const input2 = useRef(null);
	const input3 = useRef(null);

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


	const renderErrorBox = () => {
		if(error != undefined && route.params.error != undefined){
			return (
				<ErrorInputBox>
					<Text style={styles.errorText}>{error.error}</Text>
				</ErrorInputBox>
			);
		}
	}

	useEffect(() => {
		if(error != undefined && route.params.error != undefined){
			return setErrorEmail({ borderColor: 'red' });
		}
	}, [error]);


	return (
		  <View style={styles.container} behavior="padding"> 
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<FontAwesomeIcon style={styles.iconArrow} icon={ faArrowLeft } size={16}/>
				</TouchableOpacity> 
				<Text style={styles.title}>Ponto de Coleta</Text>
			</View>
			
			<Animated.View 
			style={[styles.centralView,   
				{ opacity: centralViewOpacity, 
				  transform: [ {translateY: centralViewAnim.y} ] } ]
				}>
				<FontAwesomeIcon style={styles.iconTitle} icon={ faMapMarkedAlt } size={25} />
				<Text style={styles.text}>Endereço e contato</Text>
				<Text style={styles.numberLabel}>Número (opcional)</Text>
				<Text style={styles.streetLabel}>Rua</Text>
				<Text style={styles.emailLabel}>E-mail</Text>
				<TextInput
					style={styles.streetInput}
					onChangeText={text => setStreet(text)}
					value={street}
					placeholder="Rua do ponto de coleta"
					placeholderTextColor="black"
					returnKeyType={'next'}
					ref={input1}
					onSubmitEditing={() => input2.current.focus()}
					
				/>
				<FontAwesomeIcon style={styles.streetIcon} icon={ faRoad } size={20} />
				<TextInput 
					style={styles.numberInput}
					onChangeText={text => setNumber(text)}
					value={number} 
					placeholder="Número do local"
					placeholderTextColor="black"
					keyboardType="numeric"
					ref={input2}
					onSubmitEditing={() => input3.current.focus()}

				/>
				<FontAwesomeIcon style={styles.numberIcon} icon={ faSortNumericUp } size={20} />
				<TextInput 
					style={[styles.emailInput, errorEmail]}
					onChangeText={text => setEmail(text)}
					value={email} 
					placeholder="Seu e-mail"
					placeholderTextColor="black"
					keyboardType="email-address"
					autoCapitalize={'none'}
					ref={input3}

				/>
				<FontAwesomeIcon style={styles.emailIcon} icon={ faEnvelope } size={20} />
				<TouchableOpacity style={styles.nextButton} 
				onPress={() => {				
					if(street != null && street != ''){
						navigation.navigate('DiscardMainPoints', {
							usernameTextInput: route.params.usernameTextInput,
							passwordTextInput: route.params.passwordTextInput,
							streetInput: street,
							numberInput: number,
							emailInput: email,
							user: 'point'
						});
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
					style={styles.markerAnim}
					source={require('../../assets/animations/markerMap.json')}
					autoPlay loop /> 

					<Text style={styles.textFooter}>Lembre-se sua localização é importante{'\n'}para que pessoas te encontrem</Text>
			</Animated.View>
			{renderErrorBox()}
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
		marginTop: 20
	},
	iconTitle: {
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 160,
		marginTop: 22,
		color: 'black',
	},
	nextText: {
		color: '#38c172',
		fontFamily: 'Roboto-Bold',
		fontSize: 20
	},
	streetLabel: {
		fontSize: 16,
		color: 'black',
		marginTop: 80,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 170 
	},
	streetInput: {
		width: 300,
		height: 50,
		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 25,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 110,
		marginLeft: 150 ,
		color: 'black',
		fontFamily: 'Roboto-Bold',
		paddingLeft: 45
	},
	streetIcon: {
		color: 'black',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 125,
		marginLeft: 165
	},
	numberIcon: {
		color: 'black',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 215,
		marginLeft: 165
	},
	numberLabel: {
		fontSize: 16,
		color: 'black',
		marginTop: 170,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 170 
	},
	numberInput: {
		width: 300,
		height: 50,
		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 25,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 200,
		marginLeft: 150,
		color: 'black',
		fontFamily: 'Roboto-Bold',
		paddingLeft: 45,	
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
		marginTop: 290,
		marginLeft: 150,
		color: 'black',
		fontFamily: 'Roboto-Bold',
		paddingLeft: 45,	
	},
	emailIcon:{
		color: 'black',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 305,
		marginLeft: 165
	},
	emailLabel:{
		fontSize: 16,
		color: 'black',
		marginTop: 260,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 170 
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
		marginTop: 370,
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
	markerAnim: {
		left: 0,
		position: 'absolute',
		width: 70,
		marginLeft: 35,
		marginTop: 10
		
	},
	textFooter: {
		color: '#ffffff',
		fontSize: 15,
		fontFamily: 'Roboto-Italic',
		marginLeft: 25,
		marginTop: 40
		
	},
	errorText: {
		color: 'white',
		fontSize: 15,
		fontFamily: 'Roboto-Medium'
	}
});

export default Address;
