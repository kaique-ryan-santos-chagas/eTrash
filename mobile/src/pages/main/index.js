import React, { useEffect, useState } from 'react';
import { View, 
		 StatusBar, 
		 StyleSheet, 
		 TouchableOpacity,
		 TextInput,
		 Animated,
		 ScrollView, 
		 Text,
		 Image } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';

import { izip, cycle } from 'itertools';

const Main = () => {

	const [inputSearchData, setInputSearchData] = useState();

	const [containerAnimation] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [containerAnimationOpacity] = useState(new Animated.Value(0));

	const [discardPoints, setDiscardPoints] = useState(); 
	const [imagePoints, setImagePoints] = useState();

	useEffect(() => {
		Animated.parallel([
			Animated.timing(containerAnimationOpacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}),
			Animated.spring(containerAnimation.y, {
				toValue: 0,
				speed: 1,
				useNativeDriver: true
			})
		]).start();
	}, []);

	useEffect(() => {

		const getDiscardPoints = async () => {
			const userToken = await AsyncStorage.getItem('@token');
			
			try {
				const response = await api.get('/point', {
					headers: {
						authentication: `Bearer ${userToken}`
					}	
				});
				
				setDiscardPoints(response.data.points);
				setImagePoints(response.data.avatar);


			}catch(error) {
				console.log(error.response.data);
			}

		}

		getDiscardPoints();
	}, []);

	const renderImagePoints = () => {
		if(imagePoints != undefined){
			imagePoints.map(function(item){
				return (
					<Image source={{ uri: item }} style={styles.avatarPoint} />
				);
			});
		}
	}
	

	return (
		<Animated.View style={[styles.container, { opacity: containerAnimationOpacity, transform: [ { translateY: containerAnimation.y } ]  }]}>
			<StatusBar backgroundColor="#38c172" barStyle="light-content" /> 
			<View style={styles.searchView}>
				<TouchableOpacity style={styles.drawerButton}>
					<FontAwesomeIcon style={styles.drawerIcon} icon={faBars} size={20} />
				</TouchableOpacity>
				<Text style={styles.searchTitle}>Descubra pontos</Text>
				<TextInput 
					style={styles.searchInput}
					onChangeText={text => setInputSearchData(text)}
					placeholder="Pesquisar pontos"
				/>
				<TouchableOpacity style={styles.searchButton} onPress={() => {}}>
					<FontAwesomeIcon style={styles.searchIcon} icon={faSearch} size={20} />
				</TouchableOpacity>
			</View>
			<ScrollView 
				contentContainerStyle={styles.scrollMain}
				
			>
				<Text style={styles.pointTitle}>Pontos de coleta</Text>
				<ScrollView 
					horizontal={true}
					contentContainerStyle={styles.pointsScroll}
				>
				 {renderImagePoints()}
				</ScrollView>
			</ScrollView>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	mainTxt: {
		color: 'black',
		fontSize: 20,
		fontFamily: 'Roboto-Bold'
	},
	searchView: {
		width: 500,
		height: 220,
		backgroundColor: '#38c172',
		top: 0,
		position: 'absolute',
		borderRadius: 100,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	drawerButton: {
		left: 0,
		top: 0,
		position: 'absolute',
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 65,
		marginTop: 10
	},
	drawerIcon: {
		color: 'white'
	},
	searchInput: {
		width: 280,
		height: 50,
		backgroundColor: 'white',
		borderRadius: 30,
		paddingLeft: 20,
		bottom: 0,
		position: 'absolute',
		marginBottom: 50
	},
	searchButton: {
		marginTop: 25,
		marginLeft: 220,
		borderLeftWidth: 2,
		borderColor: '#DCDCDC',
		paddingLeft: 10,
		paddingTop: 15,
		height: 50,
		width: 40
	},
	searchIcon: {
		color: '#DCDCDC'
	},
	searchTitle: {
		color: 'white',
		fontSize: 25,
		fontFamily: 'Roboto-Bold',
		marginRight: 60,
		marginTop: 10
	},	
	pointTitle: {
		color: 'black',
		fontSize: 20,
		fontFamily: 'Roboto-Bold',
		marginTop: 50,
		marginLeft: 40
	},
	avatarPoint: {
		width: 50,
		height: 70
	},
	scrollMain: {
		marginTop: 220, 
		width: 700, 
		height: 300,
		backgroundColor: 'gray'
	},
	pointsScroll: {
		paddingHorizontal: 20,
		width: 500,
		height: 150,
	}
});

export default Main;