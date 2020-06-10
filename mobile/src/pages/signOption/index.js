import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';



export default class signOption extends React.Component{
	render(){
		return(
			<View style={styles.container}>
				<Text>Sign Option</Text>
			</View>
		);
	}	
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});