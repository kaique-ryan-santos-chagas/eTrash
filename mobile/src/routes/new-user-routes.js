import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import LoadingStartApplication from '../pages/loadingPages/loadingStartApplication'
import Slider from '../pages/slider/index';
import SignOption from '../pages/signOption/index';
import ChooseUser from '../pages/chooseUser/index';
import SignIn from '../pages/signIn/index';
import SignUpPoints from '../pages/discardPoints/signUp';
import Address from '../pages/discardPoints/address';
import Avatar from '../pages/avatar-upload/index';
import DiscardMainPoints from '../pages/discardPoints/discards';
import DiscardMainUser from '../pages/users/discardMainUser';
import SignUpCompany from '../pages/companies/signUp';
import SignUpUser from '../pages/users/signUp';
import UserEmail from '../pages/users/email';
import LoadingSignUp from '../pages/loadingPages/loadingSignUp';
import LoadingImageUpload from '../pages/loadingPages/loadingImageUpload';
import SwitchCollector from '../pages/companies/switchCollector';
import InvalidCnpj from '../pages/companies/invalidCnpj';
import DiscardCompany from '../pages/companies/discards';
import UserTypeSignIn from '../pages/signIn/userTypeSignIn';
import LoadingDiscards from '../pages/loadingPages/loadingDiscards'
import LoadingSignIn from '../pages/loadingPages/loadingSignIn'; 

const NewUserStack = createStackNavigator();

const NewUserRoutes = () => {
	return(
		<NewUserStack.Navigator 
			headerMode="none"
			screenOptions = {{
			cardStyle: {
				backgroundColor: '#ffffff'
			}
			}} >
			<NewUserStack.Screen name="LoadingStartApplication" component={LoadingStartApplication} />
			<NewUserStack.Screen name="Slider" component={Slider} />
			<NewUserStack.Screen name="SignOption" component={SignOption} />
			<NewUserStack.Screen name="ChooseUser" component={ChooseUser} /> 
			<NewUserStack.Screen name="SignIn" component={SignIn} />
			<NewUserStack.Screen name="SignUpPoints" component={SignUpPoints} />
			<NewUserStack.Screen name="Address" component={Address} />
			<NewUserStack.Screen name="Avatar" component={Avatar} />
			<NewUserStack.Screen name="DiscardMainPoints" component={DiscardMainPoints} />
			<NewUserStack.Screen name="DiscardMainUser" component={DiscardMainUser} />
			<NewUserStack.Screen name="SignUpCompany" component={SignUpCompany} />
			<NewUserStack.Screen name="SignUpUser" component={SignUpUser} />
			<NewUserStack.Screen name="UserEmail" component={UserEmail} />
			<NewUserStack.Screen name="LoadingSignUp" component={LoadingSignUp} />
			<NewUserStack.Screen name="LoadingImageUpload" component={LoadingImageUpload} />
			<NewUserStack.Screen name="SwitchCollector" component={SwitchCollector} />
			<NewUserStack.Screen name="InvalidCnpj" component={InvalidCnpj} />
			<NewUserStack.Screen name="DiscardCompany" component={DiscardCompany} />
			<NewUserStack.Screen name="UserTypeSignIn" component={UserTypeSignIn} />
			<NewUserStack.Screen name="LoadingDiscards" component={LoadingDiscards} />
			<NewUserStack.Screen name="LoadingSignIn" component={LoadingSignIn} />
		</NewUserStack.Navigator>
	);
}


export default NewUserRoutes;