import React, { useState, useEffect, useRef } from 'react';
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
import { faMapMarkedAlt, faSortNumericUp, faArrowLeft, faRoad } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import useKeyboard from '@rnhooks/keyboard';
import ipApi from '../../services/ip-api';

const Anddress = () => {

	const [centralViewAnim] = useState(new Animated.ValueXY({x: 0, y: 100}));
	const [centralViewOpacity] = useState(new Animated.Value(0));
	const [footerAnim] = useState(new Animated.ValueXY({x: 0, y: 100}));
	const [footerOpacity] = useState(new Animated.Value(0)); 
	const [number, setNumber] = useState();
	const [street, setStreet] = useState();
	const [country, setCountry] = useState();
	const [city, setCity] = useState();
	const [region, setRegion] = useState();
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [footerDisplay, setFooterDisplay] = useState({ display: 'flex' });
	const [visible, dismiss] = useKeyboard();

	const navigation = useNavigation();
	const route = useRoute();
	const input1 = useRef(null);
	const input2 = useRef(null);

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

	useEffect(async () => {
	    const response = await ipApi.get('/json'); 
	    setCountry(response.data.country);
	    setCity(response.data.city);
	    setRegion(response.data.region);
	    setLatitude(response.data.lat);
	    setLongitude(response.data.lon);
	}, []);
	

	useEffect(() => {
		if(visible == true){
			setFooterDisplay({ opacity: 0, visibility: 'hidden' });
		}else{
			setFooterDisplay({ opacity: 1, visibility: 'visible' });
		}
	}, [visible]);


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
				<Text style={styles.text}>Endereço</Text>
				<Text style={styles.numberLabel}>Número (opcional)</Text>
				<Text style={styles.streetLabel}>Rua</Text>
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

				/>
				<FontAwesomeIcon style={styles.numberIcon} icon={ faSortNumericUp } size={20} />
				<TouchableOpacity style={styles.nextButton} 
				onPress={() => {				
					if(street != null && street != ''){
						navigation.navigate('DiscardMain', {
							usernameTextInput: route.params.usernameTextInput,
							passwordTextInput: route.params.passwordTextInput,
							streetInput: street,
							numberInput: number,
							localCountry: country,
							localCity: city,
							localRegion: region,
							localLatitude: latitude,
							localLongitude: longitude
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
					style={[styles.markerAnim, footerDisplay]}
					source={require('../../assets/animations/markerMap.json')}
					autoPlay loop /> 

					<Text style={[styles.textFooter, footerDisplay]}>Lembre-se sua localizão é importante{'\n'}para que pessoas te encontrem</Text>
			</Animated.View>
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
	streetLabel: {
		fontSize: 16,
		color: 'black',
		marginTop: 95,
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
		marginTop: 125,
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
		marginTop: 140,
		marginLeft: 165
	},
	numberIcon: {
		color: 'black',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 235,
		marginLeft: 165
	},
	numberLabel: {
		fontSize: 16,
		color: 'black',
		marginTop: 190,
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
		marginTop: 220,
		marginLeft: 150,
		color: 'black',
		fontFamily: 'Roboto-Bold',
		paddingLeft: 45,	
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
		
	}
});

export default Anddress;
