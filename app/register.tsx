import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const states = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu', 'Wilayah Persekutuan'
];

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [posCode, setPosCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = () => {
    if (!name) {
      Alert.alert('Full Name Required', 'Please enter your name.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address with @ symbol.');
      return;
    }
    
    if (!/^\d{9,10}$/.test(phone)) {
      Alert.alert('Invalid Phone Number', 'Phone number must be 9 or 10 digits.');
      return;
    }

    if (!/^\d{12}$/.test(idNumber)) {
      Alert.alert('Invalid Identification Number', 'Identification number must be exactly 12 digits.');
      return;
    }

    if (!/^\d{6}$/.test(posCode)) {
      Alert.alert('Invalid Pos Code', 'Pos code must be exactly 6 digits.');
      return;
    }

    if (!state) {
      Alert.alert('State Required', 'Please select a state.');
      return;
    }

    if (!address) {
      Alert.alert('Street Address Required', 'Please enter your address.');
      return;
    }

    // If all validations pass, navigate to login
    Alert.alert('Success', 'Registration successful!');
    navigation.navigate('index');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      <TextInput style={styles.input} placeholder="Full Name"  value={name} onChangeText={setName} />
      <TextInput style={styles.input} 
      placeholder="Email" 
      placeholderTextColor="#ac7270" // Change this to your preferred color
      keyboardType="email-address" 
      value={email} 
      onChangeText={setEmail} 
      />
      <TextInput style={styles.input} 
      placeholder="Identification Number (eg 901010081010)" 
      placeholderTextColor="#ac7270" // Change this to your preferred color
      keyboardType="numeric" value={idNumber} 
      onChangeText={setIdNumber} 
      />
      <TextInput style={styles.input} 
      placeholder="Phone Number (eg 01112341234)" 
      placeholderTextColor="#ac7270" // Change this to your preferred color
      keyboardType="numeric" 
      value={phone} 
      onChangeText={setPhone} 
      />
      <TextInput style={styles.input} 
      placeholder="Address" 
      placeholderTextColor="#ac7270" // Change this to your preferred color
      value={address} 
      onChangeText={setAddress} 
      />
      <TouchableOpacity style={[styles.input, {paddingVertical: 15 }]} onPress={() => setModalVisible(true)}>
          <Text style={{ textAlign: 'center', color : '#ac7270' }}>{state || 'Select State'}</Text>
        </TouchableOpacity>
      <View style={{ flexDirection: 'row', width: 300, alignItems: 'center', justifyContent: 'space-between' }}>
        <TextInput style={[styles.inputrow, { flex: 2, marginRight: 5 }]} 
        placeholder="City" 
        placeholderTextColor="#ac7270" // Change this to your preferred color
        value={city} 
        onChangeText={setCity} />
        <TextInput style={[styles.inputrow, { flex: 2, marginRight: 5 }]} 
        placeholder="Pos Code"       
        placeholderTextColor="#ac7270" // Change this to your preferred color
        keyboardType="numeric" 
        value={posCode} 
        onChangeText={setPosCode} 
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={states}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 200 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => { setState(item); setModalVisible(false); }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('index')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: 
  { flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white' 
  },

  title: 
  { fontSize: 34, 
    fontWeight: 'bold', 
    color: '#ac7270', 
    marginBottom: 20 
  },

  input: 
  { borderWidth: 1, 
    borderRadius: 20, 
    borderColor: '#ac7270', 
    padding: 15, 
    marginBottom: 15, 
    width: 300 
  },

  inputrow: 
  { textAlign: 'center', 
    borderWidth: 1, 
    borderRadius: 20, 
    borderColor: '#ac7270', 
    marginBottom: 15, 
    width: 300,
    paddingVertical: 15,
  },

  button: 
  { backgroundColor: '#f9ebea', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    width: 200, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5 
  },

  buttonText: 
  { color: 'black', 
    fontWeight: 'bold' 
  },

  loginText: 
  { marginTop: 20, 
    color: 'blue', 
    textDecorationLine: 'underline' 
  },

  modalContainer: 
  { flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },

  modalContent: 
  { backgroundColor: 'white',
     borderRadius: 10, 
     width: 250, 
     maxHeight: 250, 
     alignItems: 'center' 
    },

  modalItem: 
  { padding: 10, 
    alignItems: 'center', 
    width: 200, 
    borderBottomWidth: 1, 
    borderColor: '#ECECEC' 
  },

});

export default RegisterScreen;
