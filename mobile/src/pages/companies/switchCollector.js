import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	Animated,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import Checkbox from '@react-native-community/checkbox';

import { useNavigation, useRoute } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBuilding } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import ipApi from '../../services/ip-api';


const SwitchCollector = () => {

	const [centralViewAnim] = useState(new Animated.ValueXY({x: 0, y: 100}));
	const [centralViewOpacity] = useState(new Animated.Value(0));
	const [footerAnim] = useState(new Animated.ValueXY({x: 0, y: 100}));
	const [footerOpacity] = useState(new Animated.Value(0)); 
	const [collectorTrue, setCollectorTrue] = useState();
	const [collectorFalse, setCollectorFalse] = useState();

	const navigation = useNavigation();
	const route = useRoute();

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
	
 
	return (
		  <View style={styles.container}> 
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<FontAwesomeIcon style={styles.iconArrow} icon={ faArrowLeft } size={16}/>
				</TouchableOpacity> 
				<Text style={styles.title}>Empresa</Text>
			</View>
			
			<Animated.View 
			style={[styles.centralView,   
				{ opacity: centralViewOpacity, 
				  transform: [ {translateY: centralViewAnim.y} ] } ]
				}>
				<FontAwesomeIcon style={styles.iconTitle} icon={ faBuilding } size={25} />
				<Text style={styles.text}>Empresa Coletora</Text>
				<Text style={styles.question}>Sua empresa é coletora?</Text>
				
				<View style={styles.checkView}> 
					<Checkbox 
						value={collectorTrue}
						onValueChange={(newValue) => setCollectorTrue(newValue)}
						tintColors={{true: '#38c172', false: 'black'}}
					/>
					<Text style={styles.trueText}>Sim</Text>
					<Checkbox 
						value={collectorFalse}
						onValueChange={(newValue) => setCollectorFalse(newValue)}
						tintColors={{true: '#38c172', false: 'black'}}
					/>
					<Text style={styles.falseText}>Não</Text>
				</View>
				
					<TouchableOpacity style={styles.nextButton} 
					onPress={() => {			
					if(collectorFalse == true && collectorTrue != true){
						navigation.navigate('LoadingSignUp', {
							cnpj: route.params.cnpj,
							passwordInput: route.params.passwordInput,
							collector: false,
							country: route.params.country,
							city: route.params.city,
							region: route.params.region,
							latitude: route.params.latitude,
							longitude: route.params.longitude,
							user: 'company'
						});
					}
					if(collectorTrue == true && collectorFalse != true){
						navigation.navigate('LoadingSignUp', {
							cnpj: route.params.cnpj,
							passwordInput: route.params.passwordInput,
							collector: collectorTrue,
							country: route.params.country,
							city: route.params.city,
							region: route.params.region,
							latitude: route.params.latitude,
							longitude: route.params.longitude,
							user: 'company'
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
					style={styles.togetherAnim}
					source={require('../../assets/animations/markerMap.json')}
					autoPlay loop /> 

					<Text style={styles.textFooter}>Lembre-se sua localização é importante{'\n'}para que as empresas te encontrem</Text>
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
		color: 'black',
		fontFamily: 'Roboto-Bold',
		marginTop: 25,
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
	checkView: {
		marginRight: 250,
		marginBottom: 70
	},
	trueText: {
		color: 'black',
		marginLeft: 50,
		top: 0,
		position: 'absolute',
		marginTop: 5,
		fontFamily: 'Roboto-Bold'
	},
	falseText: {
		color: 'black',
		marginLeft: 50,
		top: 0,
		position: 'absolute',
		marginTop: 40,
		fontFamily: 'Roboto-Bold'
	},
	text: {
		fontSize: 20,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		color: 'black',
		marginLeft: 200,
		marginTop: 40
	},
	iconTitle: {
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 160,
		marginTop: 38,
		color: 'black',
	},
	question: {
		color: 'black',
		fontSize: 18,
		fontFamily: 'Roboto-Medium',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 120,
		marginLeft: 150
	},
	nextText: {
		color: '#38c172',
		fontFamily: 'Roboto-Bold',
		fontSize: 20
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
	togetherAnim: {
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
		marginLeft: 30,
		marginTop: 40
		
	}
});

export default SwitchCollector;
