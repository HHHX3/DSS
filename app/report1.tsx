import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReportDetailsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Icon name="chevron-back-circle-outline"size={30} color="#ac7270"></Icon>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Caller Info */}
      <View>
        <Text style={styles.title}>Blood Test Report</Text>
        <Image style={styles.image} source={require('../assets/images/fakeblood.jpg')} />          
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF8FF',
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
    elevation: 50,
  },
  backText: {
    paddingHorizontal: 5,
    fontSize: 18,
    color: '#ac7270',
    fontWeight: 'bold',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image:{
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  title:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    color: '#ac7270',
  }
});


export default ReportDetailsScreen;
