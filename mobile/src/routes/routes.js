import React, { useContext, useState, useEffect } from 'react';


import AppRoutes from './app-routes';
import NewUserRoutes from './new-user-routes';
import AuthRoutes from './auth-routes';

import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../context/authContext';

const Routes = () => {
	
	const { signed, setSigned } = useContext(AuthContext);
	const [oldUser, setOldUser] = useState();
	const [signInUser, setSignInUser] = useState(); 

	
	useEffect(() => {
		const getUser = async () => {
			try {
				const user = await AsyncStorage.getItem('@user');
				const signInUser = await AsyncStorage.getItem('@signIn');
				setOldUser(user);
				setSignInUser(signInUser);
			} catch(error){
				console.log(error);
			}
		}
		getUser();
	}, []);

	console.log(signed);
	console.log(oldUser);

	
	if(signed == false && oldUser == null){
		return <NewUserRoutes />
	}

	else if (signed == true || signInUser == 'true') {
		return <AuthRoutes />
	}

	else if(signed == false && oldUser != null) {
		return <AppRoutes />
	}

}

export default Routes;