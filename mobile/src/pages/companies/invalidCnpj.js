import React, { useState, useEffect } from 'react';
import { View, 
		 Text, 
		 StyleSheet, 
		 Animated, 
		 StatusBar, 
		 TextInput,
		 TouchableOpacity,
		 KeyboardAvoidingView,
		 ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import api from '../../services/api';


const InvalidCnpj = () => {

	const navigation = useNavigation();
	const route = useRoute();

	const [showErrorMsg] = useState(new Animated.ValueXY({x: 0, y: 0}));
	const [errorMsgOpacity] = useState(new Animated.Value(1));
	const [animationProgress] = useState(new Animated.Value(0));
	const [inputViewDisplay, setViewDisplay] = useState({ display: 'none' });
	const [ContainerViewDisplay, setContainerDisplay] = useState({ display: 'flex' });
	const [loadingViewDisplay, setLoadingViewDisplay] = useState({ display: 'none' });
	const [showInputView] = useState(new Animated.ValueXY({x: 0, y: 80})); 
	const [inputViewOpacity] = useState(new Animated.Value(0));
	const [cnpj, setCnpj] = useState();

	const animation = () => {
		Animated.parallel([
			Animated.timing(errorMsgOpacity, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showErrorMsg.y, {
				toValue: -150,
				speed: 1,
				useNativeDriver: true 
			}),
		]).start();
	}

	const setDisplayFlex = () => {
		 Animated.parallel([
			Animated.timing(inputViewOpacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showInputView.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true 
			}),
		]).start();
		setViewDisplay({ display: 'flex' });
	}

	const setDisplayNone = () => {
		return setContainerDisplay({ display: 'none' });
	}

	const endInputView = () => {
		Animated.parallel([
			Animated.timing(inputViewOpacity, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(showInputView.y, {
				toValue: -80,
				speed: 1,
				useNativeDriver: true
			})
		]).start();
	}

	const setInputViewDisplayNone = () => {
		return setViewDisplay({ display: 'none' });
	}

	const setDisplayFlexLoadingView = () => {
		return setLoadingViewDisplay({ display: 'flex' });
	}

	const createCompany = async () => {
		await api.post('/companies/create', {
			cnpj: cnpj,
			passwordInput: route.params.passwordInput,
			collector: route.params.collector,
			country: route.params.country,
			city: route.params.city,
			region: route.params.region,
			latitude: route.params.latitude,
			longitude: route.params.longitude
		})
		.then(function(response){
			navigation.navigate('Avatar', {
				cnpj: cnpj,
				collector: route.params.collector,
				user: 'company',
				id: response.data.id,
				token: response.data.token,
				welcome: response.data.welcome
			})
		})
		.catch(function(error){
			setLoadingViewDisplay({ display: 'none' });
			setDisplayFlex();
		})
	}
 
	useEffect(() => {
		Animated.timing(animationProgress, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true
		}).start();
	}, []);


	useEffect(() => {
		setTimeout(animation, 2000);
		setTimeout(setDisplayNone, 2500);
		setTimeout(setDisplayFlex, 2500);
	}, []);


	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<Animated.View style={[styles.animation, 
				{ opacity: errorMsgOpacity, transform: [ { translateY: showErrorMsg.y  } ] }, ContainerViewDisplay]}>
				<LottieView source={require('../../assets/animations/error.json')} 
				style={styles.errorAnimation}
				progress={animationProgress} /> 
				<Text style={styles.invalid}>{route.params.error}</Text>
			</Animated.View>
			<Animated.View style={[styles.inputView, inputViewDisplay, 
			{ opacity: inputViewOpacity, transform: [ {translateY: showInputView.y } ]}]}>
				<LottieView source={require('../../assets/animations/errorDog.json')} 
				style={styles.errorDog}
				autoPlay loop /> 
				<Text style={styles.inputLabel}>Insira um CNPJ válido</Text>
				<FontAwesomeIcon style={styles.labelIcon} icon={ faBuilding } size={20}/> 
				<TextInput
					onChangeText={text => setCnpj(text)}
					value={cnpj}
					style={styles.cnpjInput}
					keyboardType={'numeric'}

				/>
				<TouchableOpacity style={styles.sendButton} onPress={ async () => {
					if(cnpj != null && cnpj != ''){
						endInputView();
						setTimeout(setInputViewDisplayNone, 2000);
						setTimeout(setDisplayFlexLoadingView, 2000);
						await setTimeout(createCompany, 2000);
					} 
				}}>
					<Text style={styles.buttonText}>Enviar</Text>
				</TouchableOpacity>
			</Animated.View>
			<View style={[styles.loadingView, loadingViewDisplay]}>
				<ActivityIndicator size="large" color="white" /> 
				<Text style={styles.loadingText}>Aguarde um pouco...</Text>
			</View>
		</KeyboardAvoidingView>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#38c172'
	},
	animation: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	invalid: {
		color: 'white',
		fontSize: 15,
		fontFamily: 'Roboto-Bold'
	},
	errorAnimation: {
		width: 80,
		height: 80,
		marginBottom: 20
	},
	inputView: {
		width: 300,
		height: 350,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		
	},
	inputLabel: {
		color: 'black',
		fontFamily: 'Roboto-Bold',
		fontSize: 20,
		marginBottom: 15,
		marginLeft: 10

	},
	labelIcon: {
		left: 0, 
		bottom: 0,
		position: 'absolute',
		marginLeft: 30,
		marginBottom: 150

	},
	cnpjInput: {
		width: 230,
		height: 35,
		borderColor: '#38c172',
		borderWidth: 2,
		borderRadius: 10,
		paddingLeft: 10,
		fontFamily: 'Roboto-Bold',
		color: '#38c172'

	},
	errorDog: {
		width: 150
	},
	sendButton: {
		backgroundColor: '#38c172',
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		height: 40,
		borderRadius: 20,
		marginTop: 30
	},
	buttonText: {
		color: 'white',
		fontFamily: 'Roboto-Bold',
		fontSize: 15
	},
	loadingText: {
		color: 'white',
		fontFamily: 'Roboto-Bold',
		fontSize: 15,
		marginTop: 10
	},
	loadingView: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default InvalidCnpj;