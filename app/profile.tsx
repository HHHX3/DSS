import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Modal, FlatList, GestureResponderEvent, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingDetails from './booking';


const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [posCode, setPosCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [fullname, setFullName] = useState('');
  const [contactnum, setContactnum] = useState('');
  const [appointmenttype, setAppointmentType] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [selectdoc, setSelectDoc] = useState('');
  const [selectSer, setSelectSer] = useState('');
  const [selectdate, setSelectDate] = useState('');
  const [selecttime, setSelectTime] = useState('');
  const states = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu', 'Wilayah Persekutuan'
  ];
  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('userDetails');
        if (userDetails) {
          const user = JSON.parse(userDetails); // Parse JSON string to object

          setName(user.name);
          setEmail(user.email);
          setPhone(user.phone)
          setIdNumber(user.idNumber)
          setPosCode(user.posCode)
          setCity(user.city)
          setState(user.state)
          setAddress(user.address)
        }
      } catch (error) {
        console.error('Error loading user details:', error);
      }
    };

    const loadBookingDetails = async () => {
      try {
        const BookingDetails = await AsyncStorage.getItem('bookingDetails');
        if (BookingDetails) {
          const book = JSON.parse(BookingDetails); // Parse JSON string to object

          setFullName(book.fullName);
          setContactnum(book.contactNumber);
          setAppointmentType(book.appointmentType)
          setUserAddress(book.userAddress)
          setSelectDoc(book.selectedDoctor)
          setSelectSer(book.selectedService)
          setSelectDate(book.selectedDate)
          setSelectTime(book.selectedTime)
          console.log(book)
        }
      } catch (error) {
        console.error('Error loading user details:', error);
      }
    };

    loadUserDetails();
    loadBookingDetails();
  }, []);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [statemodalVisible, setStateModalVisible] = useState(false);

  const saveDetails = async () => {
    try {
      const userDetails = {
        name,
        email,
        phone,
        idNumber,
        address,
        city,
        posCode,
        state
      };
  
      // Save user details to AsyncStorage
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
  
      // Show success message
      Alert.alert('Success', 'Your details have been saved.');
  
      // Close the modal
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving user details:', error);
      Alert.alert('Error', 'Failed to save details. Please try again.');
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Personal Details Section */}
      <View style={[styles.profileSection, {flex: 3}]}>
        <Image
          source={{ uri: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg' }}
          style={[styles.profileImage]}
        />
      {/* Touchable Area to Open Modal */}
      <TouchableOpacity style={styles.detailsContainer} onPress={() => setModalVisible(true)}>
        <View style={[{flexDirection: 'row', alignContent: 'space-evenly'}]}>
        <Text style={styles.name}>{name}</Text>
        <Icon name="create-outline" size={24} color="#fff" />
        </View>        
        <Text style={styles.detail}>ID.NO: {'\n'}{idNumber}</Text>
        <Text style={styles.detail}>PhoneNo: {'\n'}{phone}</Text>
        <Text style={styles.detail}>Address: {'\n'}{address}</Text>
      </TouchableOpacity>
      <View></View>
      </View>

      <View style={[{flex: 7}]}>      
        {/* Medical Reports Section */}
      <ScrollView contentContainerStyle={styles.reportsContainer}>
            <TouchableOpacity style={[styles.reportCard]} onPress={() => navigation.navigate('report1')}>
            <Text style={styles.bookTitle}>Booking History</Text>
            </TouchableOpacity>
      <Text style={styles.reportsHeader}>Medical Reports</Text>
            <TouchableOpacity style={[styles.reportCard]} onPress={() => navigation.navigate('report1')}>
            <Text style={styles.reportTitle}>Blood Test Report</Text>
            <Text style={styles.reportDate}>Date: 2025-01-10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.reportCard]} onPress={() => navigation.navigate('report2')}>
            <Text style={styles.reportTitle}>X-Ray Report</Text>
            <Text style={styles.reportDate}>Date: 2025-02-14</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.reportCard]} onPress={() => navigation.navigate('report3')}>
            <Text style={styles.reportTitle}>MRI Scan Report</Text>
            <Text style={styles.reportDate}>Date: 2025-03-04</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.reportCard]} onPress={() => navigation.navigate('report4')}>
            <Text style={styles.reportTitle}>Covid-19 Test Report</Text>
            <Text style={styles.reportDate}>Date: 2024-01-25</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.reportCard]} onPress={() => navigation.navigate('report5')}>
            <Text style={styles.reportTitle}>General Health Checkup</Text>
            <Text style={styles.reportDate}>Date: 2024-04-10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.reportCard]} onPress={() => navigation.navigate('report6')}>
            <Text style={styles.reportTitle}>Eye Examination</Text>
            <Text style={styles.reportDate}>Date: 2024-10-10</Text>
            </TouchableOpacity>
      </ScrollView>
      </View>
      <View style={[styles.tabBar,{flex: 1}]}>
        <TouchableOpacity style={styles.tabItem}          
          onPress={() => navigation.navigate('homepage')}
        >
          <Icon name="home-outline" size={24} color="#ac7270" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}
          onPress={() => navigation.navigate('profile')}>
          <Icon name="person-outline" size={24} color="#ac7270" />
          <Text style={styles.tabText}>Profile</Text>
          
        </TouchableOpacity>
      </View>

    {/* Modal for Editing User Details */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone No" keyboardType="phone-pad" />
            <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Address" />
            <TouchableOpacity style={[styles.input, {paddingVertical: 15 }]} onPress={() => setStateModalVisible(true)}>
                  <Text style={{ textAlign: 'center' }}>{state || 'Select State'}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', width: 290, alignItems: 'center', justifyContent: 'space-between' }}>
            <TextInput style={[styles.input, { flex: 2, marginRight: 5 }]} 
                    placeholder="City" 
                    placeholderTextColor="#ac7270" // Change this to your preferred color
                    value={city} 
                    onChangeText={setCity} />
            <TextInput style={[styles.input, { flex: 2, marginRight: 5 }]} 
                    placeholder="Pos Code"       
                    placeholderTextColor="#ac7270" // Change this to your preferred color
                    keyboardType="numeric" 
                    value={posCode} 
                    onChangeText={setPosCode} 
                    />
            </View>
    
            <Modal animationType="slide" transparent={true} visible={statemodalVisible} onRequestClose={() => setStateModalVisible(false)}>
                <View style={styles.modalContainer}>
                  <View style={[styles.modalContent,{width: '65%'}]}>
                    <FlatList
                      data={states}
                      keyExtractor={(item) => item}
                      showsVerticalScrollIndicator={false}
                      style={{ maxHeight: 200 }}
                      renderItem={({ item }) => (
                        <TouchableOpacity style={styles.modalItem} onPress={() => { setState(item); setStateModalVisible(false); }}>
                          <Text>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              </Modal>
    
            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonSave} onPress={saveDetails}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    paddingTop: 20,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#ac7270',
    alignItems: 'center'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 30,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    paddingRight: 25,
  },
  detail: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    fontWeight: 'bold',
  },
  reportsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'baseline',
    paddingBottom: 20,
  },
  reportsContainer: {
    padding: 20,
  },
  reportCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 5,
    textAlign: 'center',
  },
  reportDate: {
    fontSize: 14,
    color: '#555',
  },
  tabBar: {
    width: '100%',
    borderRadius:30,
    flexDirection: 'row',
    backgroundColor: '#f9ebea',
    borderColor: '#ff0000',
    borderWidth:0.5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#ac7270',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  buttonSave: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    width: 80,
    
  },
  buttonCancel: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    width: 80,

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center'
  },

  modalItem: 
  { padding: 10, 
    alignItems: 'center', 
    width: 200, 
    borderBottomWidth: 1, 
    borderColor: '#ECECEC' 
  },

  report: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  

});
