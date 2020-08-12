import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Slider from '../pages/slider/index';
import SignOption from '../pages/signOption/index';
import ChooseUser from '../pages/chooseUser/index';
import SignIn from '../pages/signIn/index';
import SignUpPoints from '../pages/discardPoints/signUp';
import Anddress from '../pages/discardPoints/anddress';
import Avatar from '../pages/avatar-upload/index';
import DiscardMain from '../pages/discards/index';
import SignUpCompany from '../pages/companies/signUp';
import SignUpUser from '../pages/users/signUp';
import UserEmail from '../pages/users/email';

import AsyncStorage from '@react-native-community/async-storage';

const AppStack = createStackNavigator();

const Routes = () => {

	useEffect( async () => {
		try {
			await AsyncStorage.clear();
		}catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<NavigationContainer>
			<AppStack.Navigator 
				headerMode="none"
				screenOptions={{
					cardStyle: {
						backgroundColor: '#ffffff'
					}
				}}>
				<AppStack.Screen name="Slider" component={Slider} />
				<AppStack.Screen name="SignOption" component={SignOption} />
				<AppStack.Screen name="ChooseUser" component={ChooseUser} /> 
				<AppStack.Screen name="SignIn" component={SignIn} />
				<AppStack.Screen name="SignUpPoints" component={SignUpPoints} />
				<AppStack.Screen name="Anddress" component={Anddress} />
				<AppStack.Screen name="Avatar" component={Avatar} />
				<AppStack.Screen name="DiscardMain" component={DiscardMain} />
				<AppStack.Screen name="SignUpCompany" component={SignUpCompany} />
				<AppStack.Screen name="SignUpUser" component={SignUpUser} />
				<AppStack.Screen name="UserEmail" component={UserEmail} />
			</AppStack.Navigator>
		</NavigationContainer>
	);

}

export default Routes;
