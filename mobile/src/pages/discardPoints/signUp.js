import React, { useState, useEffect } from 'react';
import { View, 
		 Text, 
		 StyleSheet, 
		 Image, 
		 Animated, 
		 TouchableOpacity,
		 TextInput  } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const SignUpPoint = () => {

	const navigation = useNavigation();

	const [imagePointOpacity] = useState(new Animated.Value(0));
	const [showPointImage] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [username, setUsername] = useState();

	useEffect(() => {
		Animated.parallel([
			Animated.timing(imagePointOpacity, {
				toValue: 1,
				duration: 900
			}),
			Animated.spring(showPointImage.y, {
				toValue: 0,
				speed: 1,
				bounciness: 0
			})
		]).start();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
					<FontAwesomeIcon style={styles.iconButton} icon={ faArrowLeft } size={16}/>
				</TouchableOpacity> 
				<Text style={styles.title}>Ponto de Coleta</Text>
			</View>

			<Animated.Image 
			style={[styles.pointsImg, { opacity: imagePointOpacity, transform: [ { translateY: showPointImage.y } ] }]} 
			source={require('../../assets/pictures/points.jpg')}/> 
		
			<View style={styles.centralView}>
				<FontAwesomeIcon style={styles.iconTitle} icon={ faUserPlus } size={25} />
				<Text style={styles.text}>Criar uma conta</Text>
				<Text style={styles.nameLabel}>Nome</Text>
				<TextInput 
					style={styles.nameInput}
					onChangeText={text => setUsername(text)}
					value={username}
					placeholder="Seu nome"
				/>
				<FontAwesomeIcon style={styles.userIcon} icon={ faUser } size={20} />
			</View>
		</View>
	);
} 



const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		position: 'absolute',
		width: 600,
		height: 90,
		borderRadius: 10,
		marginBottom: 20,
		backgroundColor: 'transparent'
	},
	backButton: {
		width: 40,
		height: 30,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 35,
		marginLeft: 130,
		backgroundColor: '#ffffff',
		padding: 10,
		borderRadius: 10

	},
	title: {
		fontSize: 20,
		color: 'black',
		fontFamily: 'Roboto-Bold',
		marginTop: 20,
		marginBottom: 7,
		marginLeft: 5
	},
	iconButton: {
		color: '#38c172',
		fontSize: 100
	},
	pointsImg: {
		width: 450,
		height: 260,
		top: 0,
		position: 'absolute',
		marginTop: 60,
		borderRadius: 10
	},
	centralView: {
		width: 600,
		height: 450,
		marginTop: 350,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 500,
		backgroundColor: '#ffffff'
	},
	text: {
		fontSize: 23,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		color: '#38c172',
		marginLeft: 200,
		marginTop: 35
	},
	iconTitle: {
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 160,
		marginTop: 38,
		color: '#38c172',
	},
	nameLabel: {
		fontSize: 16,
		color: '#38c172',
		marginTop: 100,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 165
	},
	nameInput: {
		width: 300,
		height: 50,
		borderWidth: 2,
		borderColor: '#38c172',
		borderRadius: 25,
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 125,
		marginLeft: 150 ,
		color: 'black',
		fontFamily: 'Roboto-Bold',
		paddingLeft: 40
	},
	userIcon: {
		color: '#38c172',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 140,
		marginLeft: 160
	}

});


export default SignUpPoint;



