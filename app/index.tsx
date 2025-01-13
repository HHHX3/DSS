import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import loginanimation from '../assets/images/loginanimation.json';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('(tabs)');
  };

  return (
    <View style={styles.container}>
       <LottieView
          source={loginanimation}
          autoPlay
          loop
          style={styles.animation}
        />
      <Text style={styles.title}>iCare</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"

      />

      <TextInput
        style={styles.input}
        placeholder="Password"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  animation: {
    width: 400,
    height: 300,
    marginBottom: 20,
  },
});

export default LoginScreen;