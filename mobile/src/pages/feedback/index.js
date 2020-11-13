import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import LottieView from 'lottie-react-native';

import localStorage from 'react-native-sync-localstorage';

import { useNavigation } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const FeedBack = () => {

    const [discardPoints, setDiscardPoints] = useState([]);
    const [pointsImage, setPointsImage] = useState([]);
    const [countHappy, setCountHappy] = useState(0);
    const [countGood, setCountGood] = useState(0);
    const [countBad, setCountBad] = useState(0);
    const [countTooBad, setCountTooBad] = useState(0);
    const [changeHappyColor, setHappyChangeColor] = useState();
    const [changeGoodColor, setGoodChangeColor] = useState();
    const [changeBadColor, setBadChangeColor] = useState();
    const [changeTooBadColor, setTooBadChangeColor] = useState();
    

    const navigation = useNavigation();

    useEffect(() => {
        
        const points = localStorage.getItem('points');
        const pointsImageStorage = localStorage.getItem('pointsImage');
        setDiscardPoints(points);
        setPointsImage(pointsImageStorage);    
      
    }, []);


    const renderLoading = () => {
        while(discardPoints == ''){
            return (
                <View style={styles.container}>
                    <LottieView source={require('../../assets/animations/radar.json')} loop autoPlay style={{ width: 150, height: 150}} />
                    <Text style={styles.titleSearch}>Buscando pontos...</Text>
                </View>
            )
        }
    }

    const renderTitle = () => {
        if(discardPoints != ''){
            return (
                <>
                <View style={styles.titleView}>
                    <LottieView source={require('../../assets/animations/markerMap.json')} loop autoPlay  />
                </View>
                <Text style={styles.titlePoint}>Pontos de Coleta</Text>
                </>
            );
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollPoints} showsVerticalScrollIndicator={false}>
                {renderTitle()}
                {pointsImage.map((item) => {
                    var position = pointsImage.indexOf(item);
                    return (
                        <View style={styles.pointView}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.iconPoint} size={15} />
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
                            <TouchableOpacity style={styles.emojiHappy} onPress={() => {
                                setCountHappy(countHappy++);
                                setHappyChangeColor({ color: '#38c172' })
                            }}>
                                <Image 
                                  source={{ uri: 'https://i.pinimg.com/originals/3a/93/9e/3a939ed5a67ea28b52771fc9d9f67c88.png'  }} 
                                  style={styles.emoji} />
                                <Text style={[styles.countText, changeHappyColor]}>{countHappy}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emojiGood}>
                                <Image 
                                  source={{ uri: 'https://i.pinimg.com/originals/ea/06/21/ea0621d9f1db086478d1cfecad0186af.png'  }} 
                                  style={styles.emoji} />
                                  <Text style={[styles.countText, changeGoodColor]}>{countGood}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emojiBad}>
                                <Image 
                                  source={{ uri: 'https://i.pinimg.com/originals/49/1d/ae/491dae9a40a4e8285929d558162aadc0.png'  }} 
                                  style={styles.emoji} />
                                  <Text style={[styles.countText, changeBadColor]}>{countBad}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emojiTooBad}>
                                <Image 
                                  source={{ uri: 'https://guiadaalma.com.br/wp-content/uploads/2020/06/2311-fb9fe0527e1f6d445dd53dfd2b764db1.png'  }} 
                                  style={styles.emoji} />
                                  <Text style={[styles.countText, changeTooBadColor]}>{countTooBad}</Text>
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
        marginLeft: 105,
        backgroundColor: '#38c172',
        borderRadius: 50,
        marginBottom: 20
    },
    countText: {
        marginTop: 10,
        position: 'absolute',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        right: 0,
        
    },
    emojiHappy: {
        width: 70,
        height: 50,
        marginTop: 50,
        bottom: 0,
        position: 'absolute',
        marginRight: 20
    },
    emojiGood: {
        width: 70,
        height: 50,
        marginTop: 50,
        bottom: 0,
        marginLeft: 90,
        position: 'absolute'
    },
    emojiBad: {
        width: 70,
        height: 50,
        marginTop: 50,
        bottom: 0,
        marginLeft: 170,
        position: 'absolute'
    },
    emojiTooBad: {
        width: 70,
        height: 50,
        marginTop: 50,
        bottom: 0,
        marginLeft: 250,
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
        marginLeft: 35,
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
        marginLeft: 100,
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