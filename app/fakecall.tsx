import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const FakeCallScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Icon name="chevron-back-circle-outline"size={30} color="#fff"></Icon>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Caller Info */}
      <View style={styles.callerInfo}>
        <Image style={styles.image} source={require('../assets/images/Ecall.png')} />          
        <Text style={styles.callerName}>Nearest Clinic</Text>
        <Text style={styles.callStatus}>Calling...</Text>
      </View>

      {/* Call Actions */}
      <View style={styles.callActions}>
        <TouchableOpacity style={styles.declineButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>End Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ac7270',
  },
  backButton: {
    alignContent : 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 15,
    position: 'absolute',
    top: 50,
    left: 20,
    shadowColor: '#black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 40,
  },
  backText: {
    paddingHorizontal: 5,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  callerInfo: {
    alignItems: 'center',
    marginBottom: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  callerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  callStatus: {
    fontSize: 18,
    color: '#f9ebea',
  },
  callActions: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
  },
  declineButton: {
    backgroundColor: '#b80000',
    padding: 20,
    borderRadius: 50,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image:{
    width: 200,
    height: 200,
    marginBottom: 20,
  }
});

export default FakeCallScreen;
