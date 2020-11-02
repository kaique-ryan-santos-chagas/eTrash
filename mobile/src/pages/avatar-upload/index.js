import React, { useState, useEffect, useContext } from 'react';
import { View,  
	 	 StyleSheet, 
	 	 Animated, 
	 	 Text, 
	 	 StatusBar, 
	  	 TouchableOpacity,
		 Image,
	 	 Platform } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-community/async-storage';

import ImagePicker from 'react-native-image-picker';

import AuthContext from '../../context/authContext'; 

const Avatar = () => {

	const navigation = useNavigation();
	const route = useRoute();

	const { signUpPoint } = useContext(AuthContext);

	const [AnimProgress] = useState(new Animated.Value(0));
	const [endAnim] = useState(new Animated.Value(1));
	const [hideAnim] = useState(new Animated.ValueXY({x: 0, y: 0}));
	const [displayHide, setDisplayHide] = useState({ display: 'flex' });
	const [displayAvatar, setDisplayAvatar] = useState({ display: 'none' });
	const [avatarViewOpacity] = useState(new Animated.Value(0));
	const [showAvatarView] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [avatar, setAvatar] = useState();
	const [avatarUriResized, setAvatarUriResized] = useState();
	const [readyButtonDisplay, setReadyButtonDisplay] = useState({ display: 'none' });
	const [addButtonDisplay, setAddButtonDisplay] = useState({ display: 'flex' });

	useEffect(() => {
		Animated.timing(AnimProgress, {
			toValue: 1,
			duration: 3000,
			useNativeDriver: true
		}).start();
	}, []);

	function hideAnimation(){
		Animated.parallel([
			Animated.spring(hideAnim.y, {
				toValue: -180,
				speed: 4,
				useNativeDriver: true
			}),
			Animated.timing(endAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true
			})
		]).start();
	}

	function AnimationAvatarView(){
		Animated.parallel([
			Animated.timing(avatarViewOpacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true
			}),
			Animated.spring(showAvatarView.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			})
		]).start();	
	}

	function hideWelcomeView(){
		setDisplayHide({ display: 'none' });
	}

	function showDisplayAvatar() {
		setDisplayAvatar({ display: 'flex' });
	}

	useEffect(() => {
		const setUserDataIntoAsyncStorage = async () => {
			try {
				await AsyncStorage.setItem('@user', route.params.user);
				await AsyncStorage.setItem('@id', route.params.id);
				await AsyncStorage.setItem('@token', route.params.token);
			}catch(e){
				console.log(e);
			}
		}

		setUserDataIntoAsyncStorage();
	}, []);



	useEffect(() => {
		setTimeout(hideAnimation, 3000);
		setTimeout(hideWelcomeView, 3500);
		setTimeout(showDisplayAvatar, 3500);
		setTimeout(AnimationAvatarView, 3500);
	}, []);



	function showUpload(image){
		setAvatar(image);
		setAddButtonDisplay({ display: 'none' });
		setReadyButtonDisplay({ display: 'flex' });
	}



	return(
		<View style={styles.container}>
			<StatusBar backgroundColor="#38c172" barStyle="light-content" />
			<Animated.View style={[styles.centerAnimation, displayHide, { opacity: endAnim, transform: [ { translateY: hideAnim.y } ] }]}>
				<LottieView style={styles.readyAnimation} progress={AnimProgress} source={require('../../assets/animations/ready.json')} />
				<Text style={styles.welcome}>{route.params.welcome}</Text>
			</Animated.View>

			<Animated.View style={[styles.uploadView, displayAvatar, { opacity: avatarViewOpacity, transform: [{ translateY: showAvatarView.y }] }]}>
				<Text style={styles.uploadText}>Adicione uma imagem</Text>
				<TouchableOpacity style={styles.uploadButton} onPress={() => 
				ImagePicker.showImagePicker({
					title: 'Selecione o meio',
					takePhotoButtonTitle: 'Tire uma foto',
					chooseFromLibraryButtonTitle: 'Escolha da galeria',
					mediaType: 'photo'

				}, showUpload)}>
					<Image source={{uri: avatar 
						? avatar.uri
						:'data:image/png;base64,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'
					}} style={styles.avatarUpload} />
				</TouchableOpacity>

				<TouchableOpacity style={[styles.addButton, addButtonDisplay]} onPress={() => 
				ImagePicker.showImagePicker({
					title: 'Selecione o meio',
					takePhotoButtonTitle: 'Tire uma foto',
					chooseFromLibraryButtonTitle: 'Escolha da galeria',
					mediaType: 'photo'

				}, showUpload)}>
					<Text style={styles.addText}>Adicionar</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.readyButton, readyButtonDisplay]} onPress={() => {
					navigation.navigate('LoadingImageUpload', {
						imageName: avatar.fileName,
						imageUri: avatar.uri,
						imageType: avatar.type,
						imageSize: avatar.fileSize,
						user: route.params.user
					})
				}}>
					<Text style={styles.readyText}>Pronto</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.skipButton} onPress={() => {
					
					const userType = route.params.user;
					
					switch (userType){
						case 'user': 
							navigation.navigate('DiscardMainUser');
						break;
						case 'point':
							signUpPoint();
						break;
						case 'company':
							navigation.navigate('DiscardMainCompany');
						break;
							
					}

				}}>
					<Text style={styles.skipText}>Pular</Text>
				</TouchableOpacity>
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
	centerAnimation: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	readyAnimation: {
		width: 100,
	},
	welcome: {
		color: 'white',
		fontFamily: 'Roboto-Bold',
		fontSize: 18,
		marginTop: 20
	},
	uploadView: {
		width: 300,
		height: 350,
		backgroundColor: 'white',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	uploadText: {
		color: 'black',
		fontFamily: 'Roboto-Bold',
		fontSize: 20, 
		top: 0,
		position: 'absolute',
		marginTop: 40
	},
	uploadButton: {
		borderRadius: 100,
		width: 100, 
		height: 100,
		borderWidth: 2,
		borderColor: '#38c172',
		marginTop: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconUpload: {
		color: '#38c172'
	},
	addButton: {
		width: 100,
		height: 40,
		backgroundColor: '#38c172',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		marginTop: 30
	},
	addText: {
		color: 'white',
		fontSize: 15,
		fontFamily: 'Roboto-Bold'
	},
	skipButton: {
		width: 100,
		height: 40,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0,
		position: 'absolute',
		marginBottom: 10
	},
	skipText: {
		color: '#38c172',
		fontSize: 15,
		fontFamily: 'Roboto-Bold'
	},
	avatarUpload: {
		width: 100,
		height: 100,
		borderRadius: 50
	},
	readyButton: {
		width: 100,
		height: 40,
		backgroundColor: '#38c172',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		marginTop: 30
	},
	readyText: {
		color: 'white',
		fontSize: 15,
		fontFamily: 'Roboto-Bold'
	}

});

export default Avatar;
