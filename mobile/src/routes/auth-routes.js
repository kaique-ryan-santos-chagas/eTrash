import React from 'react';
import { Text } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../pages/main/index';
import ChatBot from '../pages/chatbot/index';
import Map from '../pages/map/index';
import UserProfile from '../pages/users/profile';
import PointView from '../pages/pointView';
import LoadingLogout from '../pages/loadingPages/loadingLogout';
import FeedBack from '../pages/feedback/index';
import News from '../pages/news/index';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faRobot, faMapMarkedAlt, faUser, faSignOutAlt, faMapMarkerAlt, faNewspaper } from '@fortawesome/free-solid-svg-icons';
 
const AuthBottomTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

const BottomTab = () => (
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
			<AuthBottomTab.Screen name="Pontos" component={FeedBack} 
				options={{
					tabBarLabel: 'Pontos',
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcon style={{ color: color }} icon={faMapMarkerAlt} size={20} />
					),
				}} 
			/>	
			<AuthBottomTab.Screen name="News" component={News} 
				options={{
					tabBarLabel: 'Notícias',
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcon style={{ color: color }} icon={faNewspaper} size={20} />
					),
				}} 
			/>	
		</AuthBottomTab.Navigator>	

);

const AuthStackRoutes =  () => (
	<AuthStack.Navigator 
		headerMode="none"
		screenOptions={{
			cardStyle: {
				backgroundColor: '#ffffff'
			}
		}
	}>
		<AuthStack.Screen name="PointView" component={PointView} />
	</AuthStack.Navigator>
)


const AuthRoutes = () => (
    <AppDrawer.Navigator drawerStyle={{
		backgroundColor: 'white'
	}}>
		<AppDrawer.Screen name="Home" component={BottomTab}
			options={{
				drawerLabel: () => {
					return <Text style={{ color: 'black', fontFamily: 'Roboto-Bold', fontSize: 18}}>Home</Text>
				},
				drawerIcon: () => {
					return <FontAwesomeIcon icon={faHome} size={20} />
				}
			}}
		/>
     	<AppDrawer.Screen name="Perfil" component={UserProfile} 
		 	options={{
				drawerLabel: () => {
					return <Text style={{ color: 'black', fontFamily: 'Roboto-Bold', fontSize: 18}}>Perfil</Text>
				},
				drawerIcon: () => {
					return <FontAwesomeIcon icon={faUser} size={20} />
				}
			}}
		 />
        <AppDrawer.Screen name="Dúvidas" component={ChatBot} 
			options={{
				drawerLabel: () => {
					return <Text style={{ color: 'black', fontFamily: 'Roboto-Bold', fontSize: 18}}>Dúvidas</Text>
				},
				drawerIcon: () => {
					return <FontAwesomeIcon icon={faRobot} size={20} />
				}
			}}
		/>
        <AppDrawer.Screen name="Mapa" component={Map} 
			options={{
				drawerLabel: () => {
					return <Text style={{ color: 'black', fontFamily: 'Roboto-Bold', fontSize: 18}}>Mapa</Text>
				},
				drawerIcon: () => {
					return <FontAwesomeIcon icon={faMapMarkedAlt} size={20} />
				}
			}}
		/>
		<AppDrawer.Screen name="Sair" component={LoadingLogout} 
			options={{
				drawerLabel: () => {
					return <Text style={{ color: 'red', fontFamily: 'Roboto-Bold', fontSize: 18, marginTop: 20}}>Sair</Text>
				},
				drawerIcon: () => {
					return <FontAwesomeIcon icon={faSignOutAlt} size={20} style={{ color: 'red', marginTop: 20 }} />
				}
			}}
		/>
		<AppDrawer.Screen name="PointView" component={AuthStackRoutes}
		 options={{
			 drawerLabel: () => null
		 }}
		/>
    </AppDrawer.Navigator>
   
);

export default AuthRoutes;