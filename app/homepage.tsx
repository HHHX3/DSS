import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: 'KMC Medical Centre',
      latitude: 4.588712944888927,
      longitude: 101.0885997912789,
      image: 'https://lh5.googleusercontent.com/p/AF1QipMi2kidkLmB4qy5MFuhERI7UEvqsa2cHJpZz1wZ=w426-h240-k-no',
      screen: 'clinic1',
    },
    {
      id: 2,
      name: 'Klinik Su',
      latitude: 4.586000067731533,
      longitude: 101.08689982285476,
      image: 'https://lh3.googleusercontent.com/proxy/J_Y2xm3_eFRJ1FSf3umPC3QhD6ZolBWlf1hH-NEwfEWyiEGetfMBiJ4QMTPXmpXhLQcuxsRI2pY16TWw-STOlfLIl8p_fx1AOIp2RTMPtfIm01VY5zwbgaqV9jfimmnmdYAOXnzYtYaFpmqepBhlBRbG1mM4SHyi_NOu-g=s1360-w1360-h1020',
      screen: 'clinic2',
    },
    {
      id: 3,
      name: 'Public Poliklinik',
      latitude: 4.591218958262133,
      longitude: 101.08295161117391,
      image: 'https://lh5.googleusercontent.com/p/AF1QipO7zkL1bBfPswcNnyYDxCZlx4QTE9cEhmEafuE=w471-h240-k-no',
      screen: 'clinic3',
    },
    {
      id: 4,
      name: 'Anand Specialist',
      latitude: 4.590156309992992,
      longitude: 101.08714880009987,
      image: 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=JHcil1Qttmndq1pIXf7a7A&cb_client=search.gws-prod.gps&w=408&h=240&yaw=88.3852&pitch=0&thumbfov=100',
      screen: 'clinic4',
    },
    {
      id: 5,
      name: 'Mediklinik Sejahtera',
      latitude: 4.593329791959798,
      longitude: 101.07515660009987,
      image: 'https://lh5.googleusercontent.com/p/AF1QipPuqtsAKT4HhnkVIjpP2SXQfw9q2a9wxNTUwEep=w427-h240-k-no',
      screen: 'clinic5',
    },
  ]);

  const [currentRegion, setCurrentRegion] = useState({
    latitude: 4.5921,
    longitude: 101.0901,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setCurrentRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.035,
      longitudeDelta: 0.035,
    });
  };

  const handleProceed = () => {
    navigation.navigate('clinic1');
  };

  return (
    <>
      <View style={[{ flex: 4 }]}>
        <MapView style={styles.map} region={currentRegion}>
          <Marker
            coordinate={{
              latitude: 4.582733613446774,
              longitude: 101.09484188141177,
            }}
            title="Initial Location"
            pinColor="red"
          />
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
              title={selectedLocation.name}
              pinColor="blue"
            />
          )}
        </MapView>
      </View>

      <View style={[styles.bottomSection, { flex: 6 }]}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search locations..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="search" size={20} color="#ac7270" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {locations.map((location) => (
            <View key={location.id} style={styles.locationItem}>
              <TouchableOpacity
                onPress={() => handleSelectLocation(location)}
                style={styles.imageContainer}
              >
                <Image source={{ uri: location.image }} style={styles.image} />
              </TouchableOpacity>
              <Text style={styles.locationText}>{location.name}</Text>
              <TouchableOpacity
                style={styles.proceedButton}
                onPress={() => handleProceed(location.screen)}
              >
                <Icon name="chevron-forward" size={20} color="#fff" />
              </TouchableOpacity>
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
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '110%',
    ...StyleSheet.absoluteFillObject,
  },
  bottomSection: {
    backgroundColor: '#fafafa',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom:-15
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  scrollView: {
    width: '100%',
    paddingBottom: 100,
  },
  locationItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  locationText: {
    fontSize: 18,
    color: '#333',
  },
  proceedButton: {
    backgroundColor: '#ac7270',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
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

export default HomeScreen;
