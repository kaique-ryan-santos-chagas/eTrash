import React, { useState, useEffect, useRef } from 'react';
import { View, 
	     Text, 
	     StyleSheet, 
	     Animated,
	     TouchableOpacity,
	     ScrollView,
	     TextInput } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash, faRecycle, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

const DiscardMain = () => {
	
	const navigation = useNavigation();
	const route = useRoute();
	const inputField = useRef(null);

	const [discards] = useState([]);
	const [countList, setCountList] = useState(discards.length);
	const [discardInput, setDiscardInput] = useState();
	const [newDiscard, setNewDiscard] = useState(false);


		
	return (
		<View style={styles.container}> 
			<View style={styles.whiteHeader}>
			</View>
			<View style={styles.header}>
				<FontAwesomeIcon style={styles.titleIcon} icon={ faRecycle } size={25} /> 
				<Text style={styles.title}>Sua Coleta</Text>
			</View>
				<View style={styles.list}> 
					<View style={styles.central}>
						<FontAwesomeIcon style={styles.trashIcon} icon={ faTrash } /> 
						<Text style={styles.listCount}>Lista com {countList} itens</Text>
					</View>
					
					<ScrollView style={styles.scroll} 
						horizontal={true} 
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{paddingHorizontal: 110}}
					>
					<RectButton style={styles.readyBtn} onPress={() => {
						api.post('/point/create', {
							name: route.params.usernameInput,
							passwordInput: route.params.passwordInput,
							discarts: discards,
							rua: route.params.streetInput,
							numero: route.params.numberInput,
							country: route.params.localCountry,
							city: route.params.localCity,
							region: route.params.localRegion,
							latitude: route.params.localLatitude,
							longitude: route.params.localLongitude

						})
						.then(function(response){
							console.log(response);
						})
						.catch(function(error){
							console.log(error);
						});
					}} >
						<FontAwesomeIcon style={styles.readyIcon} icon={ faCheck } size={25} />
						<Text style={styles.readyText}>Pronto</Text>
					</RectButton> 
					{discards.map(function(item){
						return (
							<View 
							style={styles.discardItem}>
								<TouchableOpacity 
								style={styles.deleteItemButton}
								onPress={() => {
									const discardPosition = discards.indexOf(item);
									discards.splice(discardPosition, 1);
									setCountList(discards.length);
									
								}}>
									<Text style={styles.deleteItemText}>x</Text>
								</TouchableOpacity>
								<Text style={styles.itemName}>{item}</Text>
							</View>
						);
					})
					}
					</ScrollView>
				</View>

		
			<View style={styles.footer}> 
				<TouchableOpacity style={styles.plusButton} 
				onPress={() => {
					if(discardInput != '' && discardInput != null){
						discards.unshift(discardInput);
						setCountList(discards.length);
						inputField.current.clear();
						
					}
				}}>
					<FontAwesomeIcon style={styles.plusIcon} icon={ faPlus } size={22} />
				</TouchableOpacity>
				<TextInput 
					style={styles.input}
					value={discardInput}
					onChangeText={text => setDiscardInput(text)}
					placeholder="Adicione sua coleta aqui"
					ref={inputField}
				/>
			</View>
		</View>
	);	
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		
	},
	header: {
		top: 0,
		position: 'absolute',
		width: 400,
		height: 150,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 130,
		borderWidth: 1,
		borderColor: 'gray'
	},
	whiteHeader: {
		top: 0,
		position: 'absolute',
		width: 400,
		height: 150,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	
	},
	title: {
		fontSize: 25,
		fontFamily: 'Roboto-Bold',
		color: 'black',
		marginTop: 40
	},
	titleIcon: {
		color: 'black',
		bottom: 0,
		left: 0,
		marginLeft: 100,
		marginBottom: 40,
		position: 'absolute',
	},
	central: {
		width: 380,
		height: 80,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 200,
		
		top: 0,
		position: 'absolute',

	},
	trashIcon: {
		bottom: 0,
		left: 0,
		position: 'absolute',
		marginLeft: 95,
		marginBottom: 20
	},
	listCount: {
		fontSize: 18,
		fontFamily: 'Roboto-Bold',
		top: 0,
		left: 0,
		position: 'absolute',
		marginTop: 40,
		marginLeft: 120,
		color: 'black',
	},

	list: {
		width: 380,
		height: 370,
		backgroundColor: '#38c172',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 100,
		padding: 100,
		marginTop: 50
	},
	plusButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#38c172',
		width: 60,
		height: 60,
		borderRadius: 100,
		right: 0,
		position: 'absolute',
		marginRight: 35
	},
	plusIcon: {
		color: '#ffffff'
	},
	footer:{
		width: 400,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0,
		position: 'absolute',
		backgroundColor: '#ffffff',
		borderTopLeftRadius: 200
	},
	readyBtn: {
		width: 100,
		height: 100,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 200,
		left: 0,
		position: 'absolute',
		marginLeft: 10
	},
	readyText: {
		color: '#38c172',
		fontFamily: 'Roboto-Bold',
		fontSize: 15,
		marginTop: 10
	},
	deleteItemButton: {
		top: 0,
		right: 0,
		position: 'absolute',
		width: 40,
		height: 30,
	
	},
	deleteItemText: {
		color: '#38c172',
		fontSize: 20,
		right: 0,
		position: 'absolute',
		marginRight: 15,
		marginTop: 5
	},
	readyIcon: {
		color: '#38c172'
	},
	input: {
		width: 250, 
		height: 50,
		borderWidth: 2,
		borderColor: '#38c172',
		marginRight: 60,
		borderRadius: 200,
		paddingLeft: 20
	},
	scroll: {
		flex: 1,
		width: 400,
		height: 300,
		paddingLeft: 50, 
		marginTop: 20
	},
	discardItem: {
		width: 150,
		height: 150,
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: '#38c172',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20 
	},
	itemName: {
		color: 'black',
		fontSize: 15,
		fontFamily: 'Roboto-Bold',
		marginRight: 15
	}
});


export default DiscardMain;