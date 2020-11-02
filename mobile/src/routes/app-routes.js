import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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
import LoadingDiscards from '../pages/loadingPages/loadingDiscards';
import LoadingSignIn from '../pages/loadingPages/loadingSignIn';


const AppStack = createStackNavigator();

const AppRoutes = () => {

	return (
			<AppStack.Navigator 
				headerMode="none"
				screenOptions={{
					cardStyle: {
						backgroundColor: '#ffffff'
					}
				}}>
				<AppStack.Screen name="SignOption" component={SignOption} />
				<AppStack.Screen name="ChooseUser" component={ChooseUser} /> 
				<AppStack.Screen name="SignIn" component={SignIn} />
				<AppStack.Screen name="SignUpPoints" component={SignUpPoints} />
				<AppStack.Screen name="Address" component={Address} />
				<AppStack.Screen name="Avatar" component={Avatar} />
				<AppStack.Screen name="DiscardMainPoints" component={DiscardMainPoints} />
				<AppStack.Screen name="DiscardMainUser" component={DiscardMainUser} />
				<AppStack.Screen name="SignUpCompany" component={SignUpCompany} />
				<AppStack.Screen name="SignUpUser" component={SignUpUser} />
				<AppStack.Screen name="UserEmail" component={UserEmail} />
				<AppStack.Screen name="LoadingSignUp" component={LoadingSignUp} />
				<AppStack.Screen name="LoadingImageUpload" component={LoadingImageUpload} />
				<AppStack.Screen name="SwitchCollector" component={SwitchCollector} />
				<AppStack.Screen name="InvalidCnpj" component={InvalidCnpj} />
				<AppStack.Screen name="DiscardCompany" component={DiscardCompany} />
				<AppStack.Screen name="UserTypeSignIn" component={UserTypeSignIn} />
				<AppStack.Screen name="LoadingDiscards" component={LoadingDiscards} />
				<AppStack.Screen name="LoadingSignIn" component={LoadingSignIn} />
			</AppStack.Navigator>
	);

}

export default AppRoutes;
