import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';

export default class App extends React.Component{
    render(){
      return (
        <>
        <StatusBar backgroundColor="#38c172" translucent />
        <Routes />
        </>
      );
    }
}