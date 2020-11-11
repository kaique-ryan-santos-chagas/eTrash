import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import localStorage from 'react-native-sync-localstorage';

import LottieView from 'lottie-react-native';

import { useNavigation } from '@react-navigation/native';

const FeedBack = () => {

    const [discardPoints, setDiscardPoints] = useState();
    const [pointsImage, setPointsImage] = useState();
    const [countHappy, setCountHappy] = useState();

    const navigation = useNavigation();

    useEffect(() => {
        const points = localStorage.getItem('points');
        const pointsImageStorage = localStorage.getItem('pointsImage');
        setDiscardPoints(points);
        setPointsImage(pointsImageStorage);
        console.log(pointsImage);
    }, []);


    const renderLoading = () => {
        while(discardPoints == ''){
            return (
                <LottieView source={require('../../assets/animations/radar.json')} />
            )
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollPoints} showsVerticalScrollIndicator={false}>
                <View style={styles.titleView}>
                    <LottieView source={require('../../assets/animations/markerMap.json')} loop autoPlay  />
                </View>
                <Text style={styles.titlePoint}>Pontos de Coleta</Text>
                {pointsImage.map((item) => {
                    var position = pointsImage.indexOf(item);
                    return (
                        <View style={styles.pointView}>
                            <Text style={styles.pointName}>{discardPoints[position].name}</Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('PointView', {
                                    screen: 'PointView',
                                    params: {
                                        avatar: item,
                                        point: discardPoints[position]
                                    } 
                                });
                            }}>
                                <Image source={{ uri: item }} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emojiHappy}>
                                <Image 
                                  source={{ uri: 'https://i.pinimg.com/originals/3a/93/9e/3a939ed5a67ea28b52771fc9d9f67c88.png'  }} 
                                  style={styles.emoji} />
                                <Text style={styles.countHappyText}>{countHappy}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emojiGood}>
                                <Image 
                                  source={{ uri: 'https://i.pinimg.com/originals/ea/06/21/ea0621d9f1db086478d1cfecad0186af.png'  }} 
                                  style={styles.emoji} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emojiBad}>
                                <Image 
                                  source={{ uri: 'https://i.pinimg.com/originals/49/1d/ae/491dae9a40a4e8285929d558162aadc0.png'  }} 
                                  style={styles.emoji} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emojiTooBad}>
                                <Image 
                                  source={{ uri: 'https://guiadaalma.com.br/wp-content/uploads/2020/06/2311-fb9fe0527e1f6d445dd53dfd2b764db1.png'  }} 
                                  style={styles.emoji} />
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
    titleView: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 105,
        backgroundColor: '#38c172',
        borderRadius: 50,
        marginBottom: 20
    },
    countHappy: {
        bottom: 0,
        position: 'absolute',
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        marginLeft: 100,
        color: 'black'
    },
    emojiHappy: {
        width: 50,
        height: 50,
        marginTop: 50,
        bottom: 0,
        position: 'absolute'
    },
    emojiGood: {
        width: 50,
        height: 50,
        marginTop: 50,
        bottom: 0,
        marginLeft: 65,
        position: 'absolute'
    },
    emojiBad: {
        width: 50,
        height: 50,
        marginTop: 50,
        bottom: 0,
        marginLeft: 130,
        position: 'absolute'
    },
    emojiTooBad: {
        width: 50,
        height: 50,
        marginTop: 50,
        bottom: 0,
        marginLeft: 200,
        position: 'absolute'
    },
    emoji: {
        width: 40,
        height: 40,
        marginLeft: 10
    },
    pointName: {
        color: 'black',
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 10
    },
    image: {
        width: 400,
        height: 300,
    },
    pointView: {
        width: 500,
        height: 400,
        marginBottom: 20
    },
    scrollPoints: {
       paddingVertical: 50,
       
    },
    titlePoint: {
        color: '#38c172',
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        marginLeft: 105,
        marginBottom: 50
    }
});

export default FeedBack;