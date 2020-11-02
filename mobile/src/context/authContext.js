import React, { createContext, useState } from 'react';

import api from '../services/api';

import ipApi from '../services/ip-api';

import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = createContext({ 
	signed: false, 
	signUpUser: '',
	signUpPoint: '',
	signUpCompany: '',
	signInUser: '',
	signInCompany: '',
	signInPoint: '',
	getUserLocation: '', 
	country: '',
	city: '',
	region: '',
	latitude: 0,
	longitude: 0,
	error: '',
	setError: ''
  });

export const AuthProvider = ({children}) => {

	const [signed, setSigned] = useState(false);
	const [country, setCountry] = useState();
	const [city, setCity] = useState();
	const [region, setRegion] = useState();
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [error, setError] = useState();


	const signInUser = async (email, password, latitute, longitude) => {
		const response = await api.post('/session', {
			email: email,
			passwordInput: password,
			localLat: latitude,
			localLon: longitude
		})
		.then(async function(response){
			console.log(response.data);
			await AsyncStorage.setItem('@token', response.data.token);
			return setSigned(true);
		})
		.catch(function(error){
			console.log(error.response.data);
			setError(error.response.data);
		})

	}

	const signInCompany = async (email, password, latitute, longitude) => {
		const response = await api.post('/session/companies', {
			email: email,
			passwordInput: password,
			localLat: latitude,
			localLon: longitude
		})
		.then(async function(response){
			console.log(response.data);
			await AsyncStorage.setItem('@token', response.data.token);
			return setSigned(true);
		})
		.catch(function(error){
			console.log(error.response.data);
			setError(error.response.data);
						
		})
	} 

	const signInPoint = async (email, password, latitute, longitude) => {
		const response = await api.post('/session/point', {
			email: email,
			passwordInput: password,
			localLat: latitude,
			localLon: longitude
		})
		.then(async function(response){
			console.log(response.data);
			await AsyncStorage.setItem('@token', response.data.token);
			return setSigned(true);
		})
		.catch(function(error){
			console.log(error.response.data);
			setError(error.response.data);
			
		})
	}


	const signUpUser = () => {
		return setSigned(true);
	}

	const signUpPoint = () => {
		return setSigned(true);
	}
 
	const signUpCompany = () => {
		return setSigned(true);
	}

	const getUserLocation = async () => {
		const response = await ipApi.get('/json');
		setCountry(response.data.country);
		setCity(response.data.city);
		setRegion(response.data.region);
		setLatitude(response.data.lat);
		setLongitude(response.data.lon);
	} 



	return (
		<AuthContext.Provider value={{
			signed: signed,
			signUpUser: signUpUser,
			signUpPoint: signUpPoint,
			signUpCompany: signUpCompany,
			signInUser: signInUser,
			signInCompany: signInCompany,
			signInPoint: signInPoint,
			getUserLocation: getUserLocation,
			country: country,
			city: city,
			region: region,
			latitude: latitude,
			longitude: longitude,
			error: error,
			setError: setError
		}}>
			{children}
		</AuthContext.Provider>
	);

}


export default AuthContext;




