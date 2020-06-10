import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Slider from './pages/slider/index';
import SignOption from './pages/signOption/index';


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
			</AppStack.Navigator>
		</NavigationContainer>
	);
}

export default Routes;
