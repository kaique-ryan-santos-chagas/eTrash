import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';


const slides = [
  {
    key: 1,
    title: 'Notícias',
    text: 'Acompanhe as notícias a respeito\n do lixo eletrônico no Brasil e no mundo',
    image: require('../../assets/animations/news.json'), 
    backgroundColor: '#ffffff',
  },

  {
    key: 2,
    title: 'Disponibilidade',
    text: 'Certifique-se se há conexão\n com a internet',
    image: require('../../assets/animations/online.json'), 
    backgroundColor: '#ffffff',
  },

  {
    key: 3,
    title: 'Geolocalização',
    text: 'Usamos sua localização para achar\npontos de coleta próximos a você',
    image: require('../../assets/animations/maps.json'), 
    backgroundColor: '#ffffff',
  },

  {
    key: 4,
    title: 'Inteligência Artificial',
    text: 'Estou aqui para te ajudar\ncom seu lixo eletrônico',
    image: require('../../assets/animations/robot.json'), 
    backgroundColor: '#ffffff',
  },

  {
    key: 5,
    title: 'Chatbot',
    text: 'Tire suas dúvidas com a IA',
    image: require('../../assets/animations/chatbot.json'), 
    backgroundColor: '#ffffff', 
  }

];


const Slider = () => {
  
  const navigation = useNavigation();

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
          <FontAwesomeIcon style={{color: '#ffffff', fontSize: 25}} icon={ faArrowRight } />
        </View>
      );
  }

   _renderPrevButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <FontAwesomeIcon style={{color: '#ffffff', fontSize: 25}} icon={ faArrowLeft } />
        </View>
      );
  }

  _renderDoneButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <FontAwesomeIcon style={{color: '#ffffff', fontSize: 25}} icon={ faCheck } />
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

  _onDone = () => {
    navigation.navigate('SignOption');
  }

  return (
      <AppIntroSlider 
        renderItem={_renderItem} 
        data={slides} 
        showSkipButton 
        dotClickEnabled 
        showPrevButton
        dotStyle={{backgroundColor: '#38c172'}}
        activeDotStyle={{backgroundColor: '#2E8B57'}}
        renderNextButton={_renderNextButton}
        renderPrevButton={_renderPrevButton}
        renderDoneButton={_renderDoneButton}
        renderSkipButton={_renderSkipButton}
        onDone={_onDone}           
      />
  );
   
}


const styles = StyleSheet.create({
    title: {
      color: '#38c172',
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 280,
      fontFamily: 'Roboto-Bold'
    },

    text: {
      color: '#38c172',
      paddingVertical: 10,
      textAlign: 'center',
      paddingBottom: 70,
      fontSize: 15,
      marginTop: 100
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

export default Slider;