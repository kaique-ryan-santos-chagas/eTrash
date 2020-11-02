import React, { useEffect, useState } from 'react';
import { View, 
		 Text, 
		 StyleSheet, 
		 StatusBar, 
		 Image,
		 Animated,
		 ActivityIndicator,
		 TouchableOpacity } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import { useNavigation, useRoute } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faCheck } from '@fortawesome/free-solid-svg-icons';


const UserTypeSignIn = () => {

	const navigation = useNavigation();
	const route = useRoute();
	
	const [welcomeTextDisplay, setWelcomeTextDisplay] = useState({ display: 'flex' });
	const [showWelcomTextAnim] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [welcomeTextOpacity] = useState(new Animated.Value(0));
	const [loading, setLoading] = useState(true);
	const [chooseUserDisplay, setChooseUserDisplay] = useState({ display: 'none' });
	const [showChooseUserAnim] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [chooseUserOpacity] = useState(new Animated.Value(0));
	const [companySelected, setCompanySelected] = useState();
	const [pointSelected, setPointSelected] = useState();
	const [userSelected, setUserSelected] = useState();
	const [textCompanySelected, setTextCompanySelected] = useState();
	const [textUserSelected, setTextUserSelected] = useState();
	const [textPointSelected, setTextPointSelected] = useState();


	const removeWelcomeTextScreen = () => {
		setWelcomeTextDisplay({ display: 'none' });
	}

	const showChooseUserDisplay = () => {
		setChooseUserDisplay({ display: 'flex' });
	}

	const hideWelcomeText = () => {
		Animated.parallel([
			Animated.timing(welcomeTextOpacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true
			}),
			Animated.spring(showWelcomTextAnim.y, {
				toValue: -50,
				speed: 1,
				useNativeDriver: true
			})

		]).start();

		setTimeout(removeWelcomeTextScreen, 1500);
		setLoading(false);
	}

	const renderLoading = () => {
		while(loading){
			return (
				<ActivityIndicator size="large" color="#38c172" />
			);
		}
	}

	const showChooseUserView = () => {
		Animated.parallel([
			Animated.timing(chooseUserOpacity, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true
			}),
			Animated.spring(showChooseUserAnim.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true,
				bouciness: 0
			})
		]).start();

		
	}


	useEffect(() => {
		Animated.parallel([
			Animated.timing(welcomeTextOpacity, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true
			}),
			Animated.spring(showWelcomTextAnim.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true,
				bouciness: 0
			})
		]).start();

		setTimeout(hideWelcomeText, 2000);
		setTimeout(showChooseUserDisplay, 2000);
		setTimeout(showChooseUserView, 3500);

	}, []);

	

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="white"  barStyle="dark-content" /> 

			<Image source={require('../../assets/pictures/trash.png')}
				style={styles.image}
			/>

			<View style={styles.centralView}>
				<Animated.Text style={[styles.welcome, welcomeTextDisplay, {
					opacity: welcomeTextOpacity, 
					transform: [{ translateY: showWelcomTextAnim.y }]
				}]}>É bom ter você de volta</Animated.Text>
			
				{renderLoading()}

			<Animated.View style={[styles.chooseUser, chooseUserDisplay,  {
				opacity: chooseUserOpacity, 
				transform: [{ translateY: showChooseUserAnim.y }]
			}]}>
				<Text style={styles.chooseUserText}>Escolha seu perfil</Text>

				<RectButton style={[styles.companyOption, companySelected]} onPress={() => {
					setUserSelected({});
					setPointSelected({});
					setCompanySelected({ backgroundColor: '#38c172' });
					setTextPointSelected({});
					setTextUserSelected({});
					setTextCompanySelected({ color: 'white' });

					const userType = 'company';
					
					navigation.navigate('LoadingSignIn', {
						user: userType,
						email: route.params.email,
						password: route.params.passwordInput
					});

				}}>
					<Image 
						style={styles.companyImage}
						source={require('../../assets/pictures/company.jpg')}
					/>

					<Text style={[styles.companyText, textCompanySelected]}>Empresa</Text>
				</RectButton>

				<RectButton style={[styles.userOption, userSelected]} onPress={() => {
					setCompanySelected({});
					setPointSelected({});
					setUserSelected({ backgroundColor: '#38c172' });
					setTextCompanySelected({});
					setTextPointSelected({});
					setTextUserSelected({ color: 'white' });
					
					const userType = 'user';

					navigation.navigate('LoadingSignIn', {
						user: userType,
						email: route.params.email,
						password: route.params.passwordInput
					});

				}}>
					<Image 
						style={styles.userImage}
						source={require('../../assets/pictures/userImage.jpg')}
					/>

					<Text style={[styles.userText, textUserSelected]}>Usuário</Text>
				</RectButton>

				<RectButton style={[styles.pointOption, pointSelected]} onPress={() => {
					setCompanySelected({});
					setUserSelected({});
					setPointSelected({ backgroundColor: '#38c172' });
					setTextUserSelected({});
					setTextCompanySelected({});
					setTextPointSelected({ color: 'white' });
					
					const userType = 'point';

					navigation.navigate('LoadingSignIn', {
						user: userType,
						email: route.params.email,
						password: route.params.passwordInput
					});

				}}>
					<Image 
						style={styles.pointImage}
						source={require('../../assets/pictures/point.jpg')}
					/>

					<Text style={[styles.pointText, textPointSelected]}>Ponto de Coleta</Text>
				</RectButton>


			</Animated.View>

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
	image: {
		width: 350,
		height: 350,
		borderWidth: 2,
		borderRadius: 1000,
		top: 0,
		position: 'absolute'
	},
	centralView: {
		marginTop: 150,
		justifyContent: 'center',
		alignItems: 'center',
		width: 500,
		height: 500
	},
	welcome: {
		color: 'black',
		fontSize: 20,
		fontFamily: 'Roboto-Bold',
		marginBottom: 100,
		marginTop: 100
	},
	chooseUser: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 300,
		height: 200,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 140,
		marginLeft: 100
	},
	chooseUserText: {
		color: 'black',
		fontSize: 25,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute'
	},
	readyView: {
		justifyContent: 'center',
		alignItems: 'center',
		right: 0,
		top: 0,
		position: 'absolute',
		marginRight: 100,
		marginTop: 120
	},	
	readyButton: {
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
		height: 70,
		borderRadius: 200,
		borderWidth: 1,
		borderColor: '#38c172',
	},
	readyIcon: {
		color: '#38c172'
	},
	companyOption: {
		width: 400,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 20,
		marginTop: 220
	},
	companyImage: {
		width: 90,
		height: 80,
		borderRadius: 100,
		left: 0,
		position: 'absolute',
		marginLeft: 30,
	},
	companyText: {
		color: 'black',
		fontSize: 18,
		fontFamily: 'Roboto-Bold',
		marginRight: 10
	},
	companyButton: {
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		width: 130,
		height: 100,
		right: 0,
		position: 'absolute',
		
	},
	companyButtonIcon: {
		color: '#38c172',
		marginRight: 20,
	},
	userButton: {
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		width: 130,
		height: 100,
		right: 0,
		position: 'absolute',
	},
	userButtonIcon: {
		color: '#38c172',
		marginRight: 20,
	},
	pointButton: {
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		width: 130,
		height: 120,
		right: 0,
		position: 'absolute',
	},
	pointButtonIcon: {
		color: '#38c172',
		marginRight: 20,
	},		
	userOption: {
		width: 400,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		
	},
	userImage: {
		width: 90,
		height: 80,
		borderRadius: 100,
		left: 0,
		position: 'absolute',
		marginLeft: 30
	},
	userText: {
		color: 'black',
		fontSize: 18,
		fontFamily: 'Roboto-Bold'
	},
	pointOption: {
		width: 400,
		height: 110,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 30,
	
	},
	pointImage: {
		width: 90,
		height: 80,
		borderRadius: 100,
		left: 0,
		position: 'absolute',
		marginLeft: 30
	},
	pointText: {
		color: 'black',
		fontSize: 18,
		fontFamily: 'Roboto-Bold',
	},
	count: {
		color: 'white',
		fontSize: 15,
		fontFamily: 'Roboto-Bold'
	}

});

export default UserTypeSignIn;