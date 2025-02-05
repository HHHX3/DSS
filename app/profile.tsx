import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const personalDetails = {
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    address: '123 Main Street, City, State, 12345',
  };

  const fakeMedicalReports = [
    { id: 1, title: 'Blood Test Report', date: '2025-01-10' },
    { id: 2, title: 'X-Ray Report', date: '2025-01-05' },
    { id: 3, title: 'MRI Scan Report', date: '2025-01-03' },
    { id: 4, title: 'Covid-19 Test Report', date: '2025-01-01' },
    { id: 5, title: 'General Health Checkup', date: '2024-12-20' },
    { id: 6, title: 'Eye Examination', date: '2024-12-15' },
  ];

  return (
    <View style={styles.container}>
      {/* Personal Details Section */}
      <View style={[styles.profileSection, {flex: 3}]}>
        <Image
          source={{ uri: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg' }}
          style={[styles.profileImage]}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{personalDetails.name}</Text>
          <Text style={styles.detail}>Age: {personalDetails.age}</Text>
          <Text style={styles.detail}>Gender: {personalDetails.gender}</Text>
          <Text style={styles.detail}>Address: {personalDetails.address}</Text>
        </View>
      </View>
      <View style={[{flex: 7}]}>      
        {/* Medical Reports Section */}
      <Text style={styles.reportsHeader}>Medical Reports</Text>
      <ScrollView contentContainerStyle={styles.reportsContainer}>
        {fakeMedicalReports.map((report) => (
          <View key={report.id} style={styles.reportCard}>
            <Text style={styles.reportTitle}>{report.title}</Text>
            <Text style={styles.reportDate}>Date: {report.date}</Text>
          </View>
        ))}
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
  },
  detail: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  reportsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
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
});
