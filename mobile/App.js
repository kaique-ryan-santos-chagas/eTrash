import 'react-native-gesture-handler';

import React, { useEffect, useContext } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/routes';

import { AuthProvider } from './src/context/authContext';


const App = () => {

    
    return (
        <>
        <StatusBar backgroundColor="#ffffff" barStyle='dark-content' translucent /> 
        <NavigationContainer>
               <AuthProvider> 
        	       <Routes />
                </AuthProvider>
        </NavigationContainer>
        </>
     );
    
}

export default App;