import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Slider from '../pages/slider/index';
import SignOption from '../pages/signOption/index';
import ChooseUser from '../pages/chooseUser/index';
import SignIn from '../pages/signIn/index';
import SignUpPoints from '../pages/discardPoints/signUp';


const AppStack = createStackNavigator();


const Routes = () => {
 
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
			</AppStack.Navigator>
		</NavigationContainer>
	);

}

export default Routes;