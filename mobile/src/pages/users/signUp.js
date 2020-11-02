import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, 
		 Text, 
		 StyleSheet, 
		 Image, 
		 Animated, 
		 TouchableOpacity,
		 TextInput,
		 KeyboardAvoidingView  } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, 
		 faUserPlus, 
		 faLock,
		 faUser } from '@fortawesome/free-solid-svg-icons';

import { useNavigation } from '@react-navigation/native';

const SignUpUser = () => {

	const navigation = useNavigation();

	const [imageUserOpacity] = useState(new Animated.Value(0));
	const [showUserImage] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [centralViewAnim] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [centralViewOpacity] = useState(new Animated.Value(0));
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	
	const input1 = useRef(null);
	const input2 = useRef(null);


	useEffect(() => {
		Animated.parallel([
			Animated.timing(imageUserOpacity, {
				toValue: 1,
				duration: 700,
				useNativeDriver: true
			}),
			Animated.spring(showUserImage.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0,
				useNativeDriver: true
			}),
			Animated.timing(centralViewOpacity, {
				toValue: 1,
				duration: 700,
				useNativeDriver: true
			}),
			Animated.spring(centralViewAnim.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0,
				useNativeDriver: true
			})
		]).start();
	}, []);

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<FontAwesomeIcon style={styles.iconArrow} icon={ faArrowLeft } size={16}/>
				</TouchableOpacity> 
				<Text style={styles.title}>Usuário</Text>
			</View>

			<Animated.Image 
			style={[styles.userImg, 
				{ opacity: imageUserOpacity, 
				  transform: [ { translateY: showUserImage.y }] }]} 
			source={require('../../assets/pictures/userImage.jpg')}/> 
			
			
			<Animated.View 
			style={[styles.centralView,   
				{ opacity: centralViewOpacity, 
				  transform: [ {translateY: centralViewAnim.y} ] } ]
				}>
				<FontAwesomeIcon style={styles.iconTitle} icon={ faUserPlus } size={25} />
				<Text style={styles.text}>Criar uma conta</Text>
				<Text style={styles.nameLabel}>Nome</Text>
				<TextInput 
					style={styles.nameInput}
					onChangeText={text => setUsername(text)}
					value={username} 
					placeholder="Seu nome"
					placeholderTextColor="#ffffff"
					ref={input1}
					returnKeyType={'next'}
					onSubmitEditing={() => input2.current.focus()}

				/>
				<FontAwesomeIcon style={styles.companyIcon} icon={ faUser } size={20} />
				<Text style={styles.passwordLabel}>Senha</Text>
				<TextInput
					style={styles.passwordInput}
					onChangeText={text => setPassword(text)}
					value={password}
					placeholder="Sua senha"
					placeholderTextColor="#ffffff"
					ref={input2}
					secureTextEntry={true}
					
				/>
				<FontAwesomeIcon style={styles.passwordIcon} icon={ faLock } size={20} />
				<TouchableOpacity style={styles.nextButton} 
				onPress={() => {				
					if(username != null && password != null && username != '' && password != ''){
						navigation.navigate('UserEmail', {
					  		usernameTextInput: username,
					  		passwordTextInput: password
					  	});
					}
					 
				}}>
					<Text style={styles.nextText}>Avançar</Text>
				</TouchableOpacity>
			</Animated.View>
		</KeyboardAvoidingView>
			
	);
} 

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
		backgroundColor: 'transparent'
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
		color: 'black',
		fontFamily: 'Roboto-Bold',
		marginTop: 20,
		marginBottom: 7,
		
	},
	iconArrow: {
		color: '#38c172',
		fontSize: 100
	},
	userImg: {
		width: 300,
		height: 250,
		top: 0,
		position: 'absolute',
		marginTop: 70,
		borderRadius: 70
	},
	centralView: {
		width: 600,
		height: 450,
		marginTop: 390,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 500,
		backgroundColor: '#38c172'
	},
	text: {
		fontSize: 23,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		color: '#ffffff',
		marginLeft: 200,
		marginTop: 35
	},
	iconTitle: {
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 160,
		marginTop: 38,
		color: '#ffffff',
	},
	nameLabel: {
		fontSize: 16,
		color: '#ffffff',
		marginTop: 95,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 170 
	},
	nameInput: {
		width: 300,
		height: 50,
		borderWidth: 2,
		borderColor: '#ffffff',
		borderRadius: 25,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 125,
		marginLeft: 150 ,
		color: '#ffffff',
		fontFamily: 'Roboto-Bold',
		paddingLeft: 45
	},
	companyIcon: {
		color: '#ffffff',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 140,
		marginLeft: 165
	},
	passwordLabel: {
		fontSize: 16,
		color: '#ffffff',
		marginTop: 190,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 170 
	},
	passwordInput: {
		width: 300,
		height: 50,
		borderWidth: 2,
		borderColor: '#ffffff',
		borderRadius: 25,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 220,
		marginLeft: 150 ,
		color: '#ffffff',
		fontFamily: 'Roboto-Bold',
		paddingLeft: 45,	
	},
	passwordIcon: {
		color: '#ffffff',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 235,
		marginLeft: 165,

	},
	nextButton: {
		width: 300,
		height: 50,
		borderRadius: 25,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 290,
		marginLeft: 150,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	nextText: {
		color: '#38c172',
		fontFamily: 'Roboto-Bold',
		fontSize: 20
	},
	errorText: {
		color: 'white',
		fontSize: 15,
		fontFamily: 'Roboto-Medium',
	}

});

export default SignUpUser;



