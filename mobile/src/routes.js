import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Slider from './pages/slider/index';
import SignOption from './pages/signOption/index';
import SignIn from './pages/signIn/index';
import SignUp from './pages/signUp/index';

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
				<AppStack.Screen name="SignIn" component={SignIn} />
				<AppStack.Screen name="SignUp" component={SignUp} />	
			</AppStack.Navigator>
		</NavigationContainer>
	);
}

export default Routes;
