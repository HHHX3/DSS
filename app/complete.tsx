import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CompleteBookingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingDetails } = route.params; // Data passed from the BookingDetails screen
  const [bookingId, setBookingId] = useState('');

  // Generate random 10-digit Booking ID
  useEffect(() => {
    const generateBookingId = () => {
      return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    };
    setBookingId(generateBookingId());
  }, []);

  return (
    <>
      <View style={{ flex: 1.5, backgroundColor: '#ac7270', alignItems: 'center' }}>
      <Text style={styles.title}>KMC Medical Centre Ipoh</Text>
    </View>
    <View style={[styles.container,{flex :8}]}>
        <Text style={styles.header}>Booking Complete</Text>
        <View style={[{alignItems: 'center'}]}>        
          <Image
          source={{ uri: 'https://w7.pngwing.com/pngs/871/200/png-transparent-check-mark-computer-icons-icon-design-complete-angle-logo-grass.png' }}
          style={styles.completIemage}/>
          </View>
        <ScrollView contentContainerStyle={styles.detailsContainer}>
          <Text style={styles.label}>Booking ID:</Text>
          <Text style={styles.value}>{bookingId}</Text>

          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{bookingDetails.fullName}</Text>

          <Text style={styles.label}>Contact Number:</Text>
          <Text style={styles.value}>{bookingDetails.contactNumber}</Text>

          <Text style={styles.label}>Appointment Type:</Text>
          <Text style={styles.value}>{bookingDetails.appointmentType}</Text>

          <Text style={styles.label}>Appointment Date & Time:</Text>
          <Text style={styles.value}>{new Date(bookingDetails.selectedDate).toLocaleString()}</Text>

          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{bookingDetails.userAddress}</Text>

          <Text style={styles.label}>Consultation Service:</Text>
          <Text style={styles.value}>{bookingDetails.selectedService}</Text>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('homepage')}
          >
            <Text style={styles.homeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </View></>
  );
};

export default CompleteBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  homeButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    color: '#fafafa',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 70,
  },
  completIemage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 30,
    alignItems: 'center',
  },
});
