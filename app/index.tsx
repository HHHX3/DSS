import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Animated, PanResponder, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import loginanimation from '../assets/images/loginanimation.json';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [idNumber, setIdNumber] = useState('');
  const navigation = useNavigation();
  const loginnavi = () => {
    // if (!/^\d{12}$/.test(idNumber)) {
    //       Alert.alert('Invalid Identification Number', 'Identification number must be exactly 12 digits.');
    //       return;
    //     } else {
          navigation.navigate('homepage')
        // }
  }

  const getUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userDetails');
      if (storedData !== null) {
        const userData = JSON.parse(storedData);
        console.log('User Data:', userData);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };
  
  const translateX = new Animated.Value(0);
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: translateX }
    ], { useNativeDriver: false }),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > width * 0.5) {
        navigation.navigate('fakecall')
      }
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBackground} />
      <View style={styles.curve}><Text></Text></View>
      
      {/* Slide to Call Button */}
      <View style={styles.sliderContainer}>     
        <View style={styles.sliderBar}>
        <Text style={styles.sliderText}>Slide for Emergency Call</Text>
          <Animated.View
            {...panResponder.panHandlers}
            style={[styles.sliderThumb, { transform: [{ translateX }] }]}
          >
        <Image style={styles.image} source={require('../assets/images/presssos.png')} />          
        </Animated.View>
        </View>
      </View>
      
      <View style={styles.mainContent}>
        <LottieView source={loginanimation} autoPlay loop style={styles.animation} />
        <Text style={styles.title}>MEDBOOK</Text>
        <View>
          <Text style={[{fontWeight: 'bold'}]}>Identification Number</Text>
          <TextInput style={styles.input} 
          placeholder="eg.900101081234" 
          placeholderTextColor="#ac7270" // Change this to your preferred color
          keyboardType="numeric" 
          value={idNumber} 
          onChangeText={setIdNumber}
          />
        </View>
        <TouchableOpacity onPress={() => loginnavi()} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.Ytext}>Your first time?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('register')}><Text style={styles.Rtext}>Register</Text></TouchableOpacity>          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBackground: {
    flex: 1.5,
    width: '100%',
    backgroundColor: '#ac7270',
  },
  curve: {
    top: -15,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  sliderContainer: {
    borderRadius: 25,
    width : '80%',
    alignItems: 'center',
  },
  sliderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 40,
    color: '#ac7270'
  },
  sliderBar: {
    width: width * 0.8,
    height: 50,
    backgroundColor: '#f9ebea',
    borderRadius: 25,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  sliderThumb: {
    width: 50,
    height: 50,
    backgroundColor: '#b80000',
    borderRadius: 25,
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    color: 'white',
  },
  mainContent: {
    flex: 9,
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    color: '#ac7270',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ac7270',
    padding: 15,
    marginBottom: 15,
    marginTop: 5,
    width: 300,
  },
  button: {
    backgroundColor: '#f9ebea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'baseline',
  },
  Rtext: {
    paddingLeft: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    color: 'black',
    textDecorationLine: 'underline',
  },
  Ytext: {
    color: 'blue',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  animation: {
    width: 350,
    height: 250,
    marginBottom: 10,
  },
});

export default LoginScreen;
