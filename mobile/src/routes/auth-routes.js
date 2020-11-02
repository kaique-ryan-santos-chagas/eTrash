import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Main from '../pages/main/index';
import ChatBot from '../pages/chatbot/index';
import Map from '../pages/map/index';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faRobot, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
 
const AuthBottomTab = createMaterialBottomTabNavigator();

const AuthRoutes = () => {
	return (
		<AuthBottomTab.Navigator 
			barStyle={{backgroundColor: '#F8F8FF', paddingBottom: 5}}
			activeColor="#38c172"
			inactiveColor="gray"
			labeled={true}
			labelStyle={{ fontFamily: 'Roboto-Bold'}}
			shifting={true}

		>
			<AuthBottomTab.Screen name="Home" component={Main} 
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcon style={{ color: color }} icon={faHome} size={20} />
					),
				}} 
			/> 
			<AuthBottomTab.Screen name="Dúvidas" component={ChatBot} 
				options={{
					tabBarLabel: 'Dúvidas',
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcon style={{ color: color }} icon={faRobot} size={20} />
					),
				}} 
			/> 
			<AuthBottomTab.Screen name="Mapa" component={Map} 
				options={{
					tabBarLabel: 'Mapa',
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcon style={{ color: color }} icon={faMapMarkedAlt} size={20} />
					),
				}} 
			/> 		
		</AuthBottomTab.Navigator>
	);

}


export default AuthRoutes;