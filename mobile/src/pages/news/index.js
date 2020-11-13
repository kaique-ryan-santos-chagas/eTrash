import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

import LottieView from 'lottie-react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';



const FeedBack = () => {

    const [news, setNews] = useState([]);
    

    const navigation = useNavigation();

    useEffect(() => {
        const getNews = async () => {

            try { 

                const userId = await AsyncStorage.getItem('@id');
                const userToken = await AsyncStorage.getItem('@token');

                const response = await api.get('/news/get', {
                    headers: {
                        authorization: userId,
                        authentication: `Bearer ${userToken}`
                    }
                });

               
                setNews(response.data.success.items);
                console.log(news);

            }catch(error){

            }

        }     

        getNews();
      
    }, []);


    const renderLoading = () => {
        while(news == ''){
            return (
                <View style={styles.container}>
                    <LottieView source={require('../../assets/animations/radar.json')} loop autoPlay style={{ width: 150, height: 150}} />
                    <Text style={styles.titleSearch}>Buscando notícias...</Text>
                </View>
            )
        }
    }

    const renderTitle = () => {
        if(news != ''){
            return (
                <>
                <View style={styles.titleView}>
                    <LottieView source={require('../../assets/animations/news.json')} loop autoPlay  />
                </View>
                <Text style={styles.titleNews}>Notícias</Text>
                </>
            );
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollPoints} showsVerticalScrollIndicator={false}>
                {renderTitle()}
                {news.map((item) => {
                    console.log(item.link);
                    return (
                        <View style={styles.pointView}>
                            <TouchableOpacity onPress={async () => {
                                await Linking.openURL(item.link);
                            }}>
                                <FontAwesomeIcon icon={faNewspaper} style={styles.iconPoint} size={15} />
                                <Text style={styles.pointName}>{item.title}</Text>     
                            </TouchableOpacity>   
                        </View>   
                           
                        
                    )   
                })

                }
            {renderLoading()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconPoint: {
        marginLeft: 10,
        top: 0,
        position: 'absolute',
      
    },
    titleView: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 80,
        backgroundColor: '#38c172',
        borderRadius: 50,
        marginBottom: 20
    },
    pointName: {
        color: 'black',
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        marginLeft: 35,
        marginBottom: 10
    },
    image: {
        width: 400,
        height: 300,
    },
    pointView: {
        width: 300,
        height: 50,
        marginBottom: 20
    },
    scrollPoints: {
       paddingVertical: 50,
       
       
    },
    titleNews: {
        color: '#38c172',
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        marginLeft: 115,
        marginBottom: 50,
    
    },
    titleSearch: {
        color: '#38c172',
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        marginBottom: 50,
    }
});

export default FeedBack;