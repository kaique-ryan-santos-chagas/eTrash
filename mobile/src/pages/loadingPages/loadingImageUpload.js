import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';

import { useNavigation, useRoute } from '@react-navigation/native';

import AuthContext from '../../context/authContext';

import LottieView from 'lottie-react-native';

import axios from 'axios';

const LoadingImageUpload = () => {

	const route = useRoute();
	const navigation = useNavigation();

	const { signUpPoint } = useContext(AuthContext);

	const imageUpload = async () => {

		try { 


			const userId = await AsyncStorage.getItem('@id');
			const userToken = await AsyncStorage.getItem('@token');

			console.log(userId);

			const image = new FormData();

			image.append('image', {
				name: route.params.imageName,
				fileSize: route.params.imageSize,
				uri: route.params.imageUri,
				type: route.params.imageType
			});

			const file = new FormData();

			file.append('file', {
				name: route.params.imageName,
				fileSize: route.params.imageSize,
				uri: route.params.imageUri,
				type: route.params.imageType
			});

			if(route.params.user == 'user'){	

				try {

				const responseImgBB = await axios.post('https://api.imgbb.com/1/upload', image,  {
					params: {
						key: 'c80ac19b5ea65aec082b0f6e4a8d0c8b'
					}
				}); 

				const response = await api.post('/users/upload', file, {
					headers: {
						url: responseImgBB.data.url,
						authentication: `Bearer ${userToken}`,
						authorization: userId,
						'Content-Type': 'multipart/form-data'
					}
				});

				

				navigation.navigate('DiscardMainUser');

				}catch(error){
					console.log(error.response);
				}
				

			}

			if(route.params.user == 'company'){

				try {
					const responseImgBB = await axios.post('https://api.imgbb.com/1/upload', image,  {
						params: {
							key: 'c80ac19b5ea65aec082b0f6e4a8d0c8b'
						}
					}); 

					const response = await api.post('/companies/upload', file, {
						headers: {
							url: responseImgBB.data.url,
							authentication: `Bearer ${userToken}`,
							authorization: userId,
							'Content-Type': 'multipart/form-data'
						}
					});

					navigation.navigate('DiscardCompany');

				}catch(error){
					console.log(error.response);
				}
			}


			if(route.params.user == 'point'){

				try {
					const responseImgBB = await axios.post('https://api.imgbb.com/1/upload', image,  {
						params: {
							key: 'c80ac19b5ea65aec082b0f6e4a8d0c8b'
						}
					}); 

					const response = await api.post('/point/upload', image, {
						headers: {
							url: responseImgBB.data.url,
							authentication: `Bearer ${userToken}`,
							authorization: userId,
							'Content-Type': 'multipart/form-data'
						}
					});

					signUpPoint();
				
				}catch(error){
					console.log(error.response);
				}


			}

		}catch(error){
			console.log(error.response.data);
		}
	}

	useEffect(() => {
		const upload = async () => {
			await setTimeout(imageUpload, 1000);
		}

		upload();

	}, []);




	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="white" />
			<LottieView source={require('../../assets/animations/robot.json')} autoPlay loop  />
			<Text style={styles.awaitText}>Aguarde um pouco...</Text>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	awaitText: {
		color: '#38c172',
		fontSize: 15,
		fontFamily: 'Roboto-Bold',
		marginTop: 220
	}
});


export default LoadingImageUpload;