import React, { useState, useEffect } from 'react';
import { View, 
	     Text, 
	     StyleSheet, 
	     Animated,
	     TouchableOpacity } from 'react-native';


import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faTrash, faRecycle } from '@fortawesome/free-solid-svg-icons';



const DiscardMain = () => {
	
	const navigation = useNavigation();
	const route = useRoute();

	const [countList, setCountList] = useState(0);

	return (
		<View style={styles.container}> 
			<View style={styles.whiteHeader}>
			</View>
			<View style={styles.header}>
				<FontAwesomeIcon style={styles.titleIcon} icon={ faRecycle } size={25} /> 
				<Text style={styles.title}>Sua Coleta</Text>
			</View>
			<View style={styles.central}>
				<FontAwesomeIcon style={styles.trashIcon} icon={ faTrash } /> 
				<Text style={styles.listCount}>Lista com {countList} itens</Text>
			</View>
			<View style={styles.centralContainer}>
				<View style={styles.list}>
					
				</View>
			</View>
		
			<View style={styles.footer}> 
				<TouchableOpacity style={styles.plusButton} 
				onPress={() => {}}>
					<FontAwesomeIcon style={styles.plusIcon} icon={ faPlus } size={22} />
				</TouchableOpacity>
			
			</View>
		</View>
	);	
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#38c172'
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
		height: 190,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
	
	},
	title: {
		fontSize: 25,
		fontFamily: 'Roboto-Bold',
		color: 'black',
		marginRight: 70,
		marginTop: 40
	},
	titleIcon: {
		color: 'black',
		bottom: 0,
		left: 0,
		marginLeft: 70,
		marginBottom: 40,
		position: 'absolute',
	},
	central: {
		width: 380,
		height: 100,
		marginTop: 70,
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 200,
		borderBottomRightRadius: 200

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
		marginTop: 60,
		marginLeft: 120,
		color: 'black',
	},
	centralContainer: {
		width: 380,
		height: 300,
		backgroundColor: 'white',
		marginTop: 0,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 180,
	},
	list: {
		width: 380,
		height: 280,
		backgroundColor: '#38c172',
		marginTop: 0,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 180,
		borderTopRightRadius: 100,
		
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
	
	},
});


export default DiscardMain;