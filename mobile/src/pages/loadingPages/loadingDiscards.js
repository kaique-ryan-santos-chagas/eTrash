import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';

import AuthContext from '../../context/authContext';

import { useRoute } from '@react-navigation/native'; 

import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';


const LoadingDiscards = () => {

	const route = useRoute();

	const { signUpUser, signUpCompany, signUpPoint } = useContext(AuthContext);

	const [loading] = useState(true);

	useEffect(() => {
		const updateDiscardsNewUser = async () => {
			const userType = route.params.user;

			try {


				if (userType == 'company') {

					const companyID = await AsyncStorage.getItem('@id');
					const companyToken = await AsyncStorage.getItem('@token');

				    companyDiscarts = route.params.discards;  

					try { 
						const response = await api.put('/discarts/company/update', { pointDiscarts: pointDiscarts },  {
							headers: {
								authorization: companyID,
								authentication: `Bearer ${companyToken}`
							}

						});

						signUpCompany();

					} catch(error){
						console.log(error);
					}

				}

				if (userType == 'user') {

					const userID = await AsyncStorage.getItem('@id');
					const userToken = await AsyncStorage.getItem('@token');
			
					userDiscarts = route.params.discards; 

					try {
						const response = await api.put('/discarts/user/update', { userDiscarts: userDiscarts } , {
							headers: {
								authorization: userID,
								authentication: `Bearer ${userToken}`
							}
						});

						signUpUser();

					} catch(error) {
						console.log(error);
					}

				}
				if (userType == 'point') {

					const pointID = await AsyncStorage.getItem('@id');
					const pointToken = await AsyncStorage.getItem('@token');
					
					pointDiscarts = route.params.discards ; 

					try {
						const response = await api.put('/discarts/point/update', { pointDiscarts: pointDiscarts }, {
							headers: {
								authorization: pointID,
								authentication:`Bearer ${pointToken}`
							}
						});
					
						signUpPoint();

					} catch(error){
						console.log(error);
					}

				}

			}
			
			catch(error){
				console.log(error.response.data);
			}


		}

		updateDiscardsNewUser();
	}, []);

	const renderLoading = () => {
		while(loading){
			return (
				<>
				<LottieView source={require('../../assets/animations/robot.json')} autoPlay loop />
				<Text style={styles.loadingtext}>Carregando...</Text>
				</>
			);

		}
	}

	return (
		<View style={styles.container}>
		{renderLoading()}
		</View>
	);
} 

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadingtext: {
		fontSize: 18,
		fontFamily: 'Roboto-Bold',
		color: '#38c172',
		marginTop: 230
	}
});

export default LoadingDiscards;