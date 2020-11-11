import React, { useEffect, useState, useContext } from 'react';
import { View, 
		 StatusBar, 
		 StyleSheet, 
		 TouchableOpacity,
		 TextInput,
		 Animated,
		 ScrollView, 
		 Text,
		 Image,
		 ActivityIndicator } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../../context/authContext';

import { useNavigation } from '@react-navigation/native';

import localStorage from 'react-native-sync-localstorage';

const Main = () => {

	const [inputSearchData, setInputSearchData] = useState();

	const [containerAnimation] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [containerAnimationOpacity] = useState(new Animated.Value(0));

	const [discardPoints, setDiscardPoints] = useState([]); 
	const [imagePoints, setImagePoints] = useState([]);
	const navigation = useNavigation();

	const { setSigned } = useContext(AuthContext);

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
				
				localStorage.setItem('points', response.data.points);
				localStorage.setItem('pointsImage', response.data.avatar);


			}catch(error) {
				if(error.response.data.error == 'Token Inválido'){
					await AsyncStorage.removeItem('@signIn');
					setSigned(false);
				}
				console.log(error.response.data);
			}

		}

		getDiscardPoints();
	}, []);



	const renderLoading = () => {
		while(discardPoints == ''){
			return (
				<View style={styles.loading}>
					<ActivityIndicator color="#38c172" size="large" />
				</View>				
			)
		}
	}


	return (
		<Animated.View style={[styles.container, { opacity: containerAnimationOpacity, transform: [ { translateY: containerAnimation.y } ]  }]}>
			<StatusBar backgroundColor="#38c172" barStyle="light-content" /> 
			<View style={styles.searchView}>
				<TouchableOpacity style={styles.drawerButton} onPress={() => navigation.openDrawer()}>
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

			<View style={styles.central}>

			<Text style={styles.titleScroll}>Pontos de coleta</Text>

			<FontAwesomeIcon icon={faMapMarkerAlt} size={20} style={styles.iconMap} /> 

			<ScrollView 
				contentContainerStyle={styles.scrollPoints}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			>
			{imagePoints.map((item) => {
				var position = imagePoints.indexOf(item)
				return (
					<TouchableOpacity style={styles.buttonPoint} onPress={() => {
						navigation.navigate('PointView', {
							screen: 'PointView',
							params: {
								avatar: item,
								point: discardPoints[position]
							}
						})
					}}>
						<Image source={{ uri: item }} style={styles.pointImage} /> 
						<Text style={styles.pointName}>{discardPoints[position].name}</Text>
					</TouchableOpacity>
				)
			})
			
			}

			{renderLoading()}
			</ScrollView>
			</View>
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
	central: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 500,
		marginTop: 420
	},	
	loading: {
		width: 200,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
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
	scrollPoints: {
		position: 'relative',
		marginTop: 50,
		paddingHorizontal: 20
	},
	buttonPoint: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 150,
		height: 100,
		margin: 15,
	},
	titleScroll: {
		fontSize: 20,
		fontFamily: 'Roboto-Bold',
		color: 'black',
		left: 0,
		top: 0,
		position: 'absolute',
		marginLeft: 70,
		marginBottom: 50
	},
	pointImage: {
		width: 150,
		height: 200,
		borderRadius: 20
	},
	pointName: {
		color: 'black',
		fontFamily: 'Roboto-Bold',
		fontSize: 14,
		marginTop: 10,
		marginLeft: 5
	},
	iconMap: {
		left: 0,
		top: 0,
		position: 'absolute',
		marginLeft: 35,
		marginTop: 2
	}
});

export default Main;