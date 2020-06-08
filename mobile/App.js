import React, { Component } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

const slides = [
  {
    key: 1,
    title: 'Geolocalização',
    text: 'Usamos sua localização para achar\npontos de coleta próximos a você',
    image: require('./src/assets/animations/maps.json'), 
    backgroundColor: '#ffffff',
  },

  {
    key: 2,
    title: 'Inteligência Artificial',
    text: 'Estou aqui para te ajudar\ncom seu lixo eletrônico.',
    image: require('./src/assets/animations/robot.json'), 
    backgroundColor: '#ffffff',
  },

  {
    key: 3,
    title: 'Chatbot',
    text: 'Tire suas dúvidas com a IA',
    image: require('./src/assets/animations/chatbot.json'), 
    backgroundColor: '#ffffff', 
  }

];

export default class App extends React.Component{
  _renderItem = ({ item }) => {
      return (
        <View style={{flex: 1, backgroundColor: item.backgroundColor, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.title}>{item.title}</Text>
            <LottieView source={item.image} autoPlay loop />
            <Text style={styles.text}>{item.text}</Text>
        </View>
      );
  
  }
  _renderNextButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <FontAwesomeIcon style={{color: '#ffffff', fontSize: 25}} icon={ faArrowRight }/>
        </View>
      );
  }

   _renderPrevButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <FontAwesomeIcon style={{color: '#ffffff', fontSize: 25}} icon={ faArrowLeft }/>
        </View>
      );
  }

  _renderDoneButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <FontAwesomeIcon style={{color: '#ffffff', fontSize: 25}} icon={ faCheck }/>
        </View>
      );
  }

  _renderSkipButton = () => {
      return (
        <View style={styles.skip}>
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Pular</Text>
        </View>
      );
  }

  render(){
      return (
          <AppIntroSlider 
            renderItem={this._renderItem} 
            data={slides} 
            showSkipButton 
            dotClickEnabled 
            showPrevButton
            dotStyle={{backgroundColor: '#38c172'}}
            activeDotStyle={{backgroundColor: '#2E8B57'}}
            renderNextButton={this._renderNextButton}
            renderPrevButton={this._renderPrevButton}
            renderDoneButton={this._renderDoneButton}
            renderSkipButton={this._renderSkipButton}
          />

      );
  } 

}


const styles = StyleSheet.create({
    title: {
      color: '#38c172',
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 300,
      fontWeight: 'bold'
    },

    text: {
      color: '#38c172',
      paddingVertical: 30,
      textAlign: 'center',
      paddingBottom: 70,
      fontSize: 15
    },

    buttonCircle: {
      width: 45,
      height: 45,
      backgroundColor: '#38c172',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center'
    },

    skip: {
      borderRadius: 25,
      backgroundColor: '#38c172',
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
      height: 50,
    }

});