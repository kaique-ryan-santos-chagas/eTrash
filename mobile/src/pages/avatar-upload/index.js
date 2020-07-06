import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

const Avatar = () => {

	const navigation = useNavigation();
	const route = useRoute();

	return(
		<View style={styles.container}>
			<Text>{route.params.usernameInput}</Text>
			<Text>{route.params.passwordInput}</Text>
			<Text>{route.params.streetInput}</Text>
			<Text>{route.params.numberInput}</Text>
			<Text>{route.params.localCountry}</Text>
			<Text>{route.params.localCity}</Text>
			<Text>{route.params.localRegion}</Text>
			<Text>{route.params.localLatitude}</Text>
			<Text>{route.params.localLongitude}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Avatar;