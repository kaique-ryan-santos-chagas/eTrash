import React, { useState, useEffect, useRef } from 'react';
import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity,
         TextInput,
         Animated,
         ScrollView,
         Image } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';

import LottieView from 'lottie-react-native';

import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

const ChatBot = () => {

    const [inputText, setInputText] = useState();
    const [conversation] = useState([]);
    const [btnPressed, setBtnPressed] = useState(false); 
    const input = useRef(null);

    const [containerAnimation] = useState(new Animated.ValueXY({x: 0, y: 80}));
    const [containerAnimationOpacity] = useState(new Animated.Value(0));

    const [chatbotAnimation] = useState(new Animated.ValueXY({x: 0, y: 0}));
    const [chatbotAnimationOpacity] = useState(new Animated.Value(1));

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
        Animated.parallel([
            Animated.timing(chatbotAnimationOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.spring(chatbotAnimation.y, {
                toValue: -80,
                speed: 2,
                useNativeDriver: true
            })
        ]).start();
    }, []);    
  
 
    const renderAnimationWithoutMessages = () => {
        while(conversation == ''){
            return (
                <LottieView style={styles.botAnimation} source={require('../../assets/animations/robot.json')} autoPlay loop />
            )
        }
    }
    
    const awaitReponseFromBot = () => {
        while(conversation == '' && btnPressed == true){
            return (
                <>
                <View style={styles.userOutput}>
                    <Text style={styles.inputTextRender}>{inputText}</Text>
                </View>
                <LottieView style={styles.chatbotAnimation} source={require('../../assets/animations/chatbot.json')} autoPlay loop />
                </>
            );
        }
    }

    return (
            
        <View style={styles.container}>

            {renderAnimationWithoutMessages()}
            {awaitReponseFromBot()}
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            {conversation.map((item) => {
                if(conversation == ''){
                    return (
                        <View style={styles.userOutput}>
                            <Text style={styles.inputTextRender}>{inputText}</Text>
                        </View>
                    );
                }
                else if(item.bot.generic[0].response_type == "suggestion"){
                    console.log('1');
                    return (
                        <>
                        <View style={styles.userOutput}>
                             <Text style={styles.inputTextRender}>{item.user}</Text>
                        </View>
                        <View style={styles.botViewResponse}>
                            <Text style={styles.botText}>{item.bot.generic[0].suggestions[0].output.text}</Text>
                        </View>
                        </>
                    );
                }
                else if(item.bot.generic[0].response_type == 'text' && item.bot.generic[1] != undefined){
                    console.log('2');
                    return (
                        <>
                        <View style={styles.userOutput}>
                             <Text style={styles.inputTextRender}>{item.user}</Text>
                        </View>
                        <View style={styles.botViewResponse}>
                            <Text style={styles.botText}>{item.bot.text}</Text>
                        </View>
                        <View style={styles.botViewResponse}>
                            <Image source={{ uri: item.bot.generic[1].source }} style={styles.pointImage} />
                            <Text style={styles.botTextBold}>{item.bot.generic[1].title}</Text>
                            <Text style={styles.botTextBold}>{item.bot.generic[1].description}</Text>
                        </View>
                        <View style={styles.botViewResponse}>
                            <Image source={{ uri: item.bot.generic[2].source }} style={styles.pointImage} />
                            <Text style={styles.botTextBold}>{item.bot.generic[2].title}</Text>
                            <Text style={styles.botTextBold}>{item.bot.generic[2].description}</Text>
                        </View>
                        <View style={styles.botViewResponse}>
                            <Image source={{ uri: item.bot.generic[3].source }} style={styles.pointImage} />
                            <Text style={styles.botTextBold}>{item.bot.generic[3].title}</Text>
                            <Text style={styles.botTextBold}>{item.bot.generic[3].description}</Text>
                        </View>
                        </>
                    );
                }
                else if(item.bot.generic[0].response_type == 'text' && item.bot.generic[1] == undefined){
                    console.log('3');
                    return (
                        <>
                        <View style={styles.userOutput}>
                             <Text style={styles.inputTextRender}>{item.user}</Text>
                        </View>
                        <View style={styles.botViewResponse}>
                            <Text style={styles.botText}>{item.bot.text}</Text>
                        </View>
                        </>
                    );
                }
            })}
            </ScrollView>

            <TextInput 
                style={styles.input}
                value={inputText}
                placeholder="Faça sua pergunta aqui"
                onChangeText={text => setInputText(text)}
                multiline={true}
                ref={input}
            />
               <TouchableOpacity style={styles.sendButton} onPress={async () => {

                    if(inputText != '' && inputText != undefined){

                        setBtnPressed(true);

                        const userToken = await AsyncStorage.getItem('@token');

                        const message = { message: inputText }

                        try {
  
                            const response = await api.post('/watson/send', message, {
                                 headers: {
                                    authentication: `Bearer ${userToken}`
                                 }
                            });

                             const conversationKey = Math.floor(Math.random() * 1000);

                             conversation.push({bot: response.data.output, key: conversationKey, user: inputText});
                             input.current.clear();
                             setInputText('');
                             
                             console.log(response.data.output);

                        }catch(error){
                            console.log(error);
                        }       

                    
                }

                }}>

            <FontAwesomeIcon style={styles.sendIcon} size={20} icon={faPaperPlane} />
            </TouchableOpacity>

            <FontAwesomeIcon size={25} icon={faRobot} style={styles.botIcon} />
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        paddingHorizontal: 20,
        paddingTop: 300,
        paddingBottom: 100,
    },
    chatbotAnimation: {
        width: 60,
        height: 70,
        left: 0,
        position:  'relative',
        marginRight: 220,
        bottom: 0
    },
    input: {
        left: 0,
        position: 'absolute',
        marginLeft: 20,
        marginBottom: 15,
        width: 250,
        height: 50,
        borderWidth: 1.5,
        borderColor: '#38c172',
        borderRadius: 60,
        paddingLeft: 50,
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#F0FFF0'
        
    },
    sendButton: {
        width: 70,
        height: 55,
        bottom: 0,
        right: 0,
        marginBottom: 15,
        marginRight: 10,
        position: 'absolute',
        backgroundColor: '#38c172',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendIcon: {
        color: 'white'
    },
    inputRender: {
        width: 100,
        height: 100,
        backgroundColor: '#38c172',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        bottom: 0,
        position: 'absolute',
        marginRight: 10,
        marginBottom: 100,
        borderRadius: 20
    },
    inputTextRender: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Roboto-Regular'
    },
    botIcon: {
        color: "#38c172",
        position: 'absolute',
        marginBottom: 29,
        left: 0,
        bottom: 0,
        marginLeft: 35
    },
    botAnimation: {
        width: 200,
        height: 200,
        opacity: 0.4,
        marginTop: 100
    },
    userOutput: {
        backgroundColor: '#38c172',
        right: 0,
        marginRight: 10,
        marginLeft: 80,
        bottom: 0,
        marginBottom: 50,
        position: 'relative',
        padding: 20,
        borderRadius: 30
    },
    botViewResponse: {
        backgroundColor: '#F0FFF0',
        left: 0,
        bottom: 0,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 30,
        position: 'relative',
        padding: 20,
        borderRadius: 30,
        
    },
    botText: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Roboto-Regular'
    },
    botTextBold: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Roboto-Bold'
    },
    botTalk: {
        left: 0,
        width: 20
    },
    suggestions: {
        backgroundColor: 'gray',
        left: 0,
        bottom: 0,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 30,
        position: 'relative',
        padding: 20,
        borderRadius: 30,
    },
    pointImage: {
        width: 240,
        height: 200,
        marginBottom: 20
    }

});

export default ChatBot;