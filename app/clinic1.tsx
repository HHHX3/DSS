import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


const clinic1 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const booknavi = ()=>{
    setIsModalVisible(false);
    navigation.navigate('booking');
  };

  const clinicDetails = {
    address: '123 Main Street, City, State, 12345',
    operationalHours: 'Monday - Friday: 8 AM - 6 PM\nSaturday: 9 AM - 2 PM\nSunday: Closed',
    services: 'General Consultation, Pediatric Care, Minor Surgeries, Vaccinations, Health Screenings',
    houseCallSupport: true,
    doctors: [
      { name: 'Dr. John Doe', photo: 'data:image/png;base64,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' },
      { name: 'Dr. Jane Smith', photo: 'data:image/png;base64,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' },
      { name: 'Dr. Emily Johnson', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwL3o6SnhWo0aOA-s3lORnicLhhgqKF4Cj2w&s' },
    ],
  };

  return (
    <>
      <View style={{ flex: 1.5, backgroundColor: '#ac7270', alignContent: 'center' }}>
        <Text style={styles.title}>KMC Medical Centre Ipoh</Text>
      </View>
      <View style={{ flex: 3 }}>
        <Image
          source={{
            uri: 'https://lh5.googleusercontent.com/p/AF1QipMi2kidkLmB4qy5MFuhERI7UEvqsa2cHJpZz1wZ=w426-h240-k-no',
          }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flex: 7, backgroundColor: '#fafafa' }}>
        <ScrollView style={{ padding: 20 }}>
          {/* Clinic Address */}
          <View style={styles.section}>
            <Text style={styles.header}>Address</Text>
            <Text style={styles.text}>{clinicDetails.address}</Text>
          </View>

          {/* Operational Hours */}
          <View style={styles.section}>
            <Text style={styles.header}>Operational Hours</Text>
            <Text style={styles.text}>{clinicDetails.operationalHours}</Text>
          </View>

          {/* Services */}
          <View style={styles.section}>
            <Text style={styles.header}>Services</Text>
            <Text style={styles.text}>{clinicDetails.services}</Text>
          </View>

          {/* House Call Support */}
          <View style={styles.section}>
            <Text style={styles.header}>House Call Support</Text>
            <Text style={styles.text}>
              {clinicDetails.houseCallSupport
                ? 'Yes, this clinic supports house-call doctors.'
                : 'No, house-call services are not available.'}
            </Text>
          </View>

          {/* Doctors */}
          <View style={styles.section}>
            <Text style={styles.header}>Doctors</Text>
            {clinicDetails.doctors.map((doctor, index) => (
              <View key={index} style={styles.doctorContainer}>
                <Image
                  source={{ uri: doctor.photo }}
                  style={styles.doctorPhoto}
                  resizeMode="cover"
                />
                <Text style={styles.doctorName}>{doctor.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={[styles.tabBar, { flex: 1.5 }]}>
        <TouchableOpacity style={styles.tabItem}          
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.tabText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.tabItem}>
          <Text style={styles.tabText}>Book</Text>
        </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalheading}>Appointment Booking</Text>
            <Text style={[styles.text, {textAlign: 'center', marginBottom: 30}]}>Do you want to have a appoinment in KMC Meidical Center Ipoh ?</Text>
            <View style={[{flexDirection: 'row'}]}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.tabItem}>
              <Text style={[styles.tabTextmodal]}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => booknavi()} style={styles.tabItem}>
            <Text style={[styles.tabTextmodal]}>Confirm</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </View>
    </>
  );
};

export default clinic1;

const styles = StyleSheet.create({
  title: {
    color: '#fafafa',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 55,
  },
  text: {
    color: '#333',
    fontSize: 16,
    marginBottom: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  doctorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  doctorPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderColor: '#ff0000',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    borderColor: '#ff0000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#f9ebea',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ac7270',
    borderRadius: 30,
    borderWidth: 1,
  },
  tabTextmodal: {
    borderColor: '#ff0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#f9ebea',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ac7270',
    borderRadius: 30,
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    height: '30%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalheading:{
    padding: 20,
    paddingHorizontal: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ac7270',
  }
});
