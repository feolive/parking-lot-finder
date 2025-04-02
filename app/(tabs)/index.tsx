import {useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Platform } from 'react-native';
import MapView, { LatLng, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faParking, faXmark, faDollarSign, faLocationCrosshairs, faLocationDot, faCalculator, faDiamondTurnRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { PARKING_LOTS } from '../components/mocking-data';
import { ParkingLot } from '../components/types';
import Calculator from '../components/calculator';
import BottomSheetComponent from '../components/bottom-sheet';
import MapViewDirections from 'react-native-maps-directions';


export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const mapRef = useRef<MapView>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [destination, setDestination] = useState<LatLng | null>(null);

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
        showsUserLocation={true}
        showsCompass={true}
        showsScale={true}
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
            <FontAwesomeIcon icon={faParking} size={24} color="#000000" />
          </Marker>
        ))}
        {destination && location &&
            <MapViewDirections
                origin={location.coords}
                destination={destination}
                mode={'DRIVING' /* or 'WALKING' */}
                precision={'high'}
                strokeWidth={5}
                strokeColor={'blue'}
                apikey={process.env.EXPO_PUBLIC_API_KEY}
                />
        }
      </MapView>

      <TouchableOpacity style={styles.locationButton} onPress={centerOnUser}>
        <FontAwesomeIcon icon={faLocationCrosshairs} size={24} color="#007AFF" />
      </TouchableOpacity>

      {selectedLot && (
        <View style={styles.parkingInfo}>
          <View style={styles.popupHeader}>
          <Text style={styles.parkingName}>{selectedLot.name}</Text>
          <TouchableOpacity onPress={() => {setSelectedLot(null)}}>
            <FontAwesomeIcon icon={faXmark} size={24} color="#aaa" />
          </TouchableOpacity>
          </View>
          <View style={styles.popupRow}>
            <FontAwesomeIcon icon={faLocationDot} size={16} color="#666" />
            <Text style={styles.parkingDetails}>{selectedLot.address}</Text>
          </View>
          <View style={styles.popupRow}>
            <FontAwesomeIcon icon={faParking} size={16} color="#666" />
            <Text style={styles.parkingDetails}>{selectedLot.availableSpots} spots available</Text>
          </View>
          <View style={styles.popupRow}>
            <FontAwesomeIcon icon={faDollarSign} size={16} color="#666" />
            <Text style={styles.parkingDetails}>{selectedLot.hourlyRate}/hour</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.reserveButton} onPress={() => {setShowCalculator(true)}}>
            <FontAwesomeIcon icon={faCalculator} size={18} color="#fff" />
              <Text style={styles.reserveButtonText}>Calculate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reserveButton} onPress={() => {setDestination(selectedLot.coordinate)}}>
            <FontAwesomeIcon icon={faDiamondTurnRight} size={18} color="#fff" />
              <Text style={styles.reserveButtonText}>Direction</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={showCalculator}>
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ height: 650, backgroundColor: "white", padding: 20 }}>
            <TouchableOpacity onPress={() => setShowCalculator(false)}>
              <FontAwesomeIcon icon={faArrowLeft} size={24} color="#aaa" />
            </TouchableOpacity>
            <Calculator parkingLot={selectedLot} />
          </View>
        </View>
      </Modal>
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
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  popupRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
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
    gap: 12
  },
  parkingName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  parkingDetails: {
    fontSize: 16,
    color: '#666',
  },
  reserveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4
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
