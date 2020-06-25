import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes/app-routes.js';

const App = () => {
    return (
        <>
        <StatusBar backgroundColor="#ffffff" barStyle='dark-content' translucent />
        <Routes />
        </>
     );
    
}

export default App;