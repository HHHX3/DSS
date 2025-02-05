import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import loginanimation from '../assets/images/loginanimation.json';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('homepage');
  };

  return (
    <View style={[styles.container,]}>
    <View style= {[{flex : 1, width: '100%',backgroundColor: '#ac7270', alignItems: 'flex-end'}]}>
    </View>
    <View style= {[{flex : 8, alignItems: 'center'}]}>
    <LottieView
          source={loginanimation}
          autoPlay
          loop
          style={styles.animation}
        />
      <Text style={styles.title}>iCare</Text>
      <View>
     <Text>Username</Text> 
      <TextInput
        style={styles.input}
        placeholder="Username"

      />
      <Text>Password</Text> 
      <TextInput
        style={styles.input}
        placeholder="Password"
      />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
    <View style={[styles.tabBar,{flex:1}]}>
        <TouchableOpacity style={styles.tabItem}>
        <Image style={[styles.image,]} source={require('../assets/images/sos.png')} />
          <Text style={styles.tabText}>Emergency Call</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ac7270',
    padding: 15,
    marginBottom: 15,
    marginTop: 5,

    width: 350,
  },
  button: {
    backgroundColor: '#f9ebea',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  animation: {
    marginTop: 40,
    width: 400,
    height: 300,
    marginBottom: 20,
  },
  image: {
    width: 45,
    height : 45,
  },
  tabBar: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: '#f9ebea',
    borderWidth: 1,
    borderColor: '#ff0000',
  },
  tabItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 20,
    color: 'red',
  },
});

export default LoginScreen;