import React, { useEffect, useState } from 'react';
import { View, 
		 StatusBar, 
		 StyleSheet, 
		 TouchableOpacity,
		 Animated,
		 ScrollView, 
		 Text,
		 Image } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faListAlt, faMapMarkerAlt, faCity, faMapMarkedAlt  } from '@fortawesome/free-solid-svg-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

import MapView, { Marker } from 'react-native-maps';

const PointView = () => {

	const [containerAnimation] = useState(new Animated.ValueXY({x: 0, y: 80}));
	const [containerAnimationOpacity] = useState(new Animated.Value(0));
	const [mapDisplay, setMapDisplay] = useState({ display: 'none' });
	const [btnDisplay, setBtnDisplay] = useState();

    const navigation = useNavigation();
    const route = useRoute();

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

 
	const renderPoint = () => {
		if(mapDisplay.display == 'flex'){
			return (
				<Marker 
					title={route.params.point.name}
					pinColor="#38c172"
					coordinate={{ latitude: route.params.point.latitude, longitude: route.params.point.longitude}}
				>

					<Image style={styles.pointImage} source={{ uri: route.params.avatar }} />
				</Marker>
			)
		}
	}

	return (
		<Animated.View style={[styles.container, { opacity: containerAnimationOpacity, transform: [ { translateY: containerAnimation.y } ]  }]}>
			<StatusBar backgroundColor="#38c172" barStyle="light-content" /> 
			<View style={styles.searchView}>
				<Image source={{ uri: route.params.avatar }} style={styles.topPointImage} />
                <TouchableOpacity style={styles.drawerButton} onPress={() => navigation.goBack()}>
					<FontAwesomeIcon style={styles.drawerIcon} icon={faArrowLeft} size={20} />
				</TouchableOpacity>
			</View>

			<View style={styles.central}>
                
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollMain}
                >

				<View style={styles.pointView}>	
			    	<FontAwesomeIcon icon={faMapMarkerAlt} size={20} style={styles.iconPoint} /> 
                	<Text style={styles.pointName}>{route.params.point.name}</Text>
				</View>

				<TouchableOpacity style={[styles.btnLocal, btnDisplay]} onPress={() => {
					setBtnDisplay({ display: 'none' });
					setMapDisplay({ display: 'flex' });
				}} >
					<Text style={styles.localText}>Localização</Text>
					<FontAwesomeIcon icon={faMapMarkedAlt} style={styles.btnIcon} />
				</TouchableOpacity>

				<MapView 
					style={[styles.map, mapDisplay]}
					region={{
						latitude: route.params.point.latitude,
						longitude: route.params.point.longitude,
						latitudeDelta: 0.0033,
						longitudeDelta: 0.0034
						
					}}
					showsUserLocation={true}
					loadingEnabled
					loadingIndicatorColor="#38c172"
				>
					{renderPoint()}

				</MapView>

				<View style={styles.regionView}>
                	<FontAwesomeIcon icon={faCity} size={20} style={styles.iconCity} /> 
               		<Text style={styles.titleCity}>Cidade de {route.params.point.city} - {route.params.point.country}</Text>
					   <FontAwesomeIcon icon={faCity} size={20} style={styles.iconRegion} /> 
               		   <Text style={styles.titleRegion}>Região de {route.params.point.region}</Text>
				</View>

				<View style={styles.titleScrollView}>
			    	<FontAwesomeIcon icon={faListAlt} size={20} style={styles.iconList} /> 
			    	<Text style={styles.titleScroll}>Esse ponto aceita</Text>
				</View>
			    
                <ScrollView 
					contentContainerStyle={styles.scrollPoints}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
			    >
			    {route.params.point.discarts.map((item) => {
                	return (
                    	<View style={styles.discardsView}>
                        	<Text style={styles.text}>{item}</Text>
                   		</View>
					)
                	})}
			   	</ScrollView>

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
	map: {
		width: 400,
		height: 200,
		marginBottom: 20
	},
	pointImage: {
		width: 50,
		height: 50,
		borderRadius: 20
	},
	btnLocal: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 150,
		height: 80,
		backgroundColor: '#38c172',
		marginLeft: 100,
		marginBottom: 50,
		borderRadius: 50
	},
	btnIcon: {
		color: 'white',
		left: 0,
		position: 'absolute',
		marginLeft: 20
	},
	localText:{
		color: 'white',
		fontFamily: 'Roboto-Bold',
		fontSize: 15,
		marginLeft: 20
	},
	mainTxt: {
		color: 'black',
		fontSize: 20,
		fontFamily: 'Roboto-Bold'
    },
    topPointImage: {
        width: 500,
        height: 400,
        borderRadius: 150
    },
    scrollMain: {
        position: 'relative',
        top: 0,
        
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Roboto-Bold'
    },  
    discardsView: {
        width: 150,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38c172',
        borderRadius: 70,
        margin: 15,
        padding: 20
    },
	central: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 320
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
	scrollPoints: {
		position: 'relative',
		marginTop: 5,
		paddingHorizontal: 5
	},
	titleScroll: {
		fontSize: 20,
		fontFamily: 'Roboto-Bold',
		color: 'black',
		marginRight: 20
    
    },
    titleCity: {
        fontSize: 20,
		fontFamily: 'Roboto-Bold',
		color: 'black',
		marginTop: 10,
		marginBottom: 30,
		marginRight: 20
    },  
    iconCity: {
        left: 0,
		top: 0,
		position: 'absolute',
        
	},
	iconRegion: {
		left: 0,
		top: 0,
		position: 'absolute',
		marginTop: 55
	},
	titleRegion: {
		fontSize: 20,
		fontFamily: 'Roboto-Bold',
		color: 'black',
		marginBottom: 35,
		marginRight: 85
	},
	iconList: {
		left: 0,
		top: 0,
		position: 'absolute',
		marginLeft: 30,
		marginTop: 5
    },
    pointName: {
        fontSize: 20,
		fontFamily: 'Roboto-Bold',
		color: 'black',
    },
    iconPoint: {
        top: 0,
		position: 'relative',
		marginBottom: 10
       
	},
	pointView: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 300,
		height: 100,
		position: 'relative',
		left: 0,
        position: 'relative',
		marginTop: 5,
		marginLeft: 30,
		marginBottom: 5
	},
	regionView: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 330,
		height: 100,
		left: 0,
		marginLeft: 30,
		position: 'relative',

	},
	titleScrollView: {
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		position: 'relative',
		left: 0,
		marginRight: 50,
		width: 300,
		marginTop: 20
	}
});

export default PointView;