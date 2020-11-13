import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';

import ImagePicker from 'react-native-image-picker';

import axios from 'axios';

const UserProfile = () => {

    const [profile, setProfile] = useState();
    const [avatar, setAvatar] = useState();

    const navigation = useNavigation();

    useEffect(() => {
        const getProfileData = async () => {

            const userId = await AsyncStorage.getItem('@id');
            const userToken = await AsyncStorage.getItem('@token');

            const response = await api.get('/profile/user', {
                headers: {
                    authentication: `Bearer ${userToken}`,
                    authorization: userId
                }
            });
            setProfile(response.data.user);
            console.log(response.data);
           
            if(response.data.userAvatarUrl == null){
                setAvatar(null);
            }else{
                setAvatar({ uri: response.data.userAvatarUrl });
            }
        }

        getProfileData();
    }, []);

    const avatarNull = () => {
        if(profile != undefined){
            return (
                <Image source={{ uri: avatar ? avatar.uri : 'https://findicons.com/files/icons/1994/vista_style_business_and_data/256/users.png' }} style={styles.profileImage} />
            );
        }
    }

    const renderData = () => {
        if(profile != undefined){
            return (
                <>
                <Text style={styles.username}>{profile.name}</Text>
                <Text style={styles.emailLabel}>E-mail</Text>
                <Text style={styles.email}>{profile.email}</Text>
                <Text style={styles.cityLabel}>Cidade</Text>
                <Text style={styles.city}>{profile.city}</Text>
                <Text style={styles.regionLabel}>Região</Text>
                <Text style={styles.region}>{profile.region}</Text>
                </>
            )
        }
    }

    const renderCountryData = () => {
        if(profile != undefined){
            return (
                <>
                <LottieView source={require('../../assets/animations/markerMap.json')} loop autoPLay style={{ width: 50, height: 50, marginBottom: 100 }} />
                <Text style={styles.country}>{profile.country}</Text>
                </>
            )
        }
    }

    const showUpload = async (image) => {
        setAvatar(image);


        try {

            const userId = await AsyncStorage.getItem('@id');
            const userToken = await AsyncStorage.getItem('@token');

            const imageUpload = new FormData();

            imageUpload.append('image', {
                name: image.fileName,
                fileSize: image.fileSize,
                uri: image.uri,
                type: image.type,
            })

            const responseImgbb = await axios.post('https://api.imgbb.com/1/upload', imageUpload, {
                params: {
                    key: 'e5fa439eb2f80ff06c8f5af991482e60'
                }
            })

            console.log(responseImgbb.data.data.url);

            const responseApi = await api.post('/profile/user/avatar', { url: responseImgbb.data.data.url }, {
                headers: {
                    authentication: `Bearer ${userToken}`,
                    authorization: userId
                }
            })

            console.log(responseApi.data);

        }catch(error){
            console.log(error.response);
        }


        
    }


    return (
        <View style={styles.container}>
            <View style={styles.top}>
            <TouchableOpacity style={styles.drawer} onPress={() => {
                navigation.openDrawer();
            }}>
                <FontAwesomeIcon icon={faBars} size={20} style={{ color: 'white' }} />
            </TouchableOpacity>

            {renderCountryData()}

            </View>
            <TouchableOpacity onPress={() => {
                ImagePicker.showImagePicker({
                    title: 'Escolha o meio',
                    takePhotoButtonTitle: 'Tire uma foto',
					chooseFromLibraryButtonTitle: 'Escolha da galeria',
                    mediaType: 'photo'
                    
                }, showUpload);
            }}>
                 <View style={styles.imageView}>
                     {avatarNull()}
                 </View>
            </TouchableOpacity>

           {renderData()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawer: {
        top: 0,
        left: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        marginLeft: 50
    },
    country: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Roboto-Bold',
        top: 0,
        position: 'absolute',
        marginTop: 100
    },
    emailLabel: {
        color: '#38c172',
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        left: 0,
        bottom: 0,
        position: 'absolute',
        marginLeft: 50,
        marginBottom: 220
    },
    cityLabel: {
        color: '#38c172',
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        left: 0,
        bottom: 0,
        position: 'absolute',
        marginLeft: 50,
        marginBottom: 150
    },
    regionLabel: {
        color: '#38c172',
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        left: 0,
        bottom: 0,
        position: 'absolute',
        marginLeft: 250,
        marginBottom: 150
    },
    region: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        left: 0,
        bottom: 0,
        position: 'absolute',
        marginLeft: 250,
        marginBottom: 120
    },  
    city: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        left: 0,
        bottom: 0,
        position: 'absolute',
        marginLeft: 50,
        marginBottom: 120
    },
    top: {
        top: 0,
        position: 'absolute',
        width: 500,
        height: 250,
        backgroundColor: '#38c172',
        borderBottomLeftRadius: 220,
        borderBottomRightRadius: 220,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageView: {
        width: 130,
        height: 120,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#38c172',
        marginBottom: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: 100,
        height: 100
    },
    username: {
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        color: 'black',
        top: 0,
        position: 'absolute',
        marginTop: 330
    },
    email: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        left: 0,
        bottom: 0,
        position: 'absolute',
        marginLeft: 50,
        marginBottom: 200
    }
});

export default UserProfile;