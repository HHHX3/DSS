import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingDetails = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [appointmentType, setAppointmentType] = useState('Clinic Appointment');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. Smith' },
    { id: 2, name: 'Dr. Johnson' },
    { id: 3, name: 'Dr. Lee' }
  ];
  
  useEffect(() => {
    const loadUserDetails = async () => {
      const savedDetails = await AsyncStorage.getItem('userDetails');
      if (savedDetails) {
        const { name, phone, address } = JSON.parse(savedDetails);
        setFullName(name);
        setContactNumber(phone);
        setUserAddress(address);
        console.log(name, phone, address);
      }
    };

    loadUserDetails();
  }, []);
  

  const appointmentOptions = ['Clinic Appointment', 'House Call Service'];
  const consultationServices = [
    'General Consultation',
    'Pediatric Care',
    'Minor Surgeries',
    'Vaccinations',
    'Health Screenings',
  ];

  const handleConfirmBooking = () => {
    if (!fullName || !contactNumber || selectedServices.length === 0) {
      alert('Please fill in all details.');
      return;
    }
  
    // Only validate userAddress if appointmentType is "House Call Service"
    if (appointmentType === "House Call Service" && !userAddress.trim()) {
      alert('Please enter your address for House Call Service.');
      return;
    }
    if (!selectedDoctor) {
        alert('Please select a doctor.');
        return;
    }  

    const formattedDate = selectedDate.toDateString(); // Example: "Sun Feb 11 2025"
    const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // Example: "10:30 AM"
  
  
    const bookingDetails = {
      fullName,
      contactNumber,
      appointmentType,
      userAddress: appointmentType === "Clinic Appointment" ? "N/A" : userAddress, // Ignore address if clinic
      selectedDoctor : selectedDoctor.name,
      selectedService: selectedServices[0], // Assuming single selection as per earlier requirement
      selectedDate: formattedDate,
      selectedTime: formattedTime,
    };

    navigation.navigate('complete', { bookingDetails });
  };

  const handleServiceSelection = (service) => {
    setSelectedServices([service]); // Replace the entire array with the selected service
  };
  

  return (
    <>
      <View style={{ flex: 1.5, backgroundColor: '#ac7270', alignItems: 'center' }}>
        <Text style={styles.title}>KMC Medical Centre Ipoh</Text>
      </View>
      <View style={[{ flex: 8 }]}>
        <ScrollView contentContainerStyle={[styles.container]}>
          <Text style={styles.header}>Booking Details</Text>

          {/* Full Name */}
          <View style={[styles.inputContainer]}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Contact Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your contact number"
              keyboardType="phone-pad"
              value={contactNumber}
              onChangeText={setContactNumber}
            />
          </View>
                    
{/* Appointment Type */}
<View style={styles.inputContainer}>
  <Text style={styles.label}>Appointment Type</Text>
  <TouchableOpacity
    style={styles.dropdownButton}
    onPress={() => setShowDropdown(true)}
  >
    <Text style={styles.dropdownButtonText}>{appointmentType}</Text>
  </TouchableOpacity>
  {showDropdown && (
    <Modal transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setShowDropdown(false)}
      >
        <View style={styles.dropdownContainer}>
          <FlatList
            data={appointmentOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setAppointmentType(item);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )}
</View>

{/* Address (Only Editable for House Call Services) */}
<View style={styles.inputContainer}>
  <Text style={styles.label}>Address</Text>
  <TextInput
    style={[
      styles.input,
      {
        backgroundColor: appointmentType === "House Call Service" ? "#fff" : "#e0e0e0", // Disabled color
      },
    ]}
    placeholder="Enter your address"
    value={userAddress}
    onChangeText={setUserAddress}
    editable={appointmentType === "House Call Service"} // Enable input only for House Call
  />
</View>


{/* Consultation Services */}
<View style={styles.inputContainer}>
  <Text style={styles.label}>Consultation Services</Text>
  <TouchableOpacity
    style={styles.dropdownButton}
    onPress={() => setShowServicesDropdown(true)}
  >
    <Text style={styles.dropdownButtonText}>
      {selectedServices.length > 0
        ? selectedServices[0] // Show only the selected service
        : 'Select Consultation Service'}
    </Text>
  </TouchableOpacity>
  {showServicesDropdown && (
    <Modal transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setShowServicesDropdown(false)}
      >
        <View style={styles.dropdownContainer}>
          <FlatList
            data={consultationServices}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  selectedServices.includes(item) && styles.selectedItem,
                ]}
                onPress={() => {
                  handleServiceSelection(item);
                  setShowServicesDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )}
</View>

{/* Doctor Selection */}
<View style={styles.inputContainer}>
  <Text style={styles.label}>Select Doctor</Text>
  <TouchableOpacity
    style={styles.dropdownButton}
    onPress={() => setShowDoctorDropdown(true)}
  >
    <Text style={styles.dropdownButtonText}>
      {selectedDoctor ? selectedDoctor.name : 'Select a Doctor'}
    </Text>
  </TouchableOpacity>
  {showDoctorDropdown && (
    <Modal transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setShowDoctorDropdown(false)}
      >
        <View style={styles.dropdownContainer}>
          <FlatList
            data={doctors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  selectedDoctor?.id === item.id && styles.selectedItem,
                ]}
                onPress={() => {
                  setSelectedDoctor(item);
                  setShowDoctorDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )}
</View>



          {/* Date and Time */}
          <View style={styles.inputContainer}>
        <Text style={styles.label}>Appointment Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              if (date) setSelectedDate(date);
              setShowDatePicker(false);
            }}
          />
        )}
      </View>
           <View style={styles.inputContainer}>
        <Text style={styles.label}>Appointment Time</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>
          {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
        </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={(event, time) => {
              if (time) setSelectedTime(time);
              setShowTimePicker(false);
            }}
          />
        )}
      </View>

          {/* Confirm Booking */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ac7270',
  },
  dropdownItem: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    padding: 15,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    backgroundColor: '#d3f4ff',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  cancelButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButtonText: {
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
});
