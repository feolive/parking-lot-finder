import {useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCar, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { PARKING_LOTS } from '../components/mocking-data';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const centerOnUser = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    mapRef.current?.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };


  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  // Use Apple Maps for iOS and Google Maps for Android
  const mapProvider = Platform.select({
    ios: PROVIDER_DEFAULT,
    android: PROVIDER_GOOGLE,
    default: PROVIDER_GOOGLE, // For web and other platforms
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={mapProvider}
        showsUserLocation
        showsCompass
        showsScale
        showsMyLocationButton={false}
        initialRegion={{
          latitude: location?.coords.latitude || 51.063828905941335,
          longitude: location?.coords.longitude || -114.08904555828734,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {PARKING_LOTS.map((lot) => (
          <Marker
            key={lot.id}
            coordinate={lot.coordinate}
            onPress={() => setSelectedLot(lot)}>
            <FontAwesomeIcon icon={faCar} size={24} color="#007AFF" />
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.locationButton} onPress={centerOnUser}>
        <FontAwesomeIcon icon={faLocationCrosshairs} size={24} color="#007AFF" />
      </TouchableOpacity>

      {selectedLot && (
        <View style={styles.parkingInfo}>
          <Text style={styles.parkingName}>{selectedLot.name}</Text>
          <Text style={styles.parkingDetails}>
            ${selectedLot.hourlyRate}/hour • {selectedLot.availableSpots} spots available
          </Text>
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Reserve Spot</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  locationButton: {
    position: 'absolute',
    right: 16,
    bottom: 200,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  parkingInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  parkingName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  parkingDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});