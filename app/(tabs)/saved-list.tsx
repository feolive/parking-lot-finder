import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faMapMarkerAlt, faDollarSign, faParking } from '@fortawesome/free-solid-svg-icons';
import { SAVED_LIST } from '../components/mocking-data';
import { useTabContext } from './_layout';
import { useNavigation } from 'expo-router';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

export default function SavedListScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { selectedLot, setSelectedLot } = useTabContext();
  return (
    <ScrollView style={styles.container}>
      {SAVED_LIST.map((record) => (
        <TouchableOpacity key={record.id} onPress={() => {setSelectedLot(record);navigation.navigate('index')}}>
          <View key={record.id} style={styles.historyCard}>
            <View style={styles.headerRow}>
              <Text style={styles.locationText}>{record.address}</Text>
              <Text style={styles.dateText}>{record.date}</Text>
            </View>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size={16} color="#666" />
                <Text style={styles.detailText}>{record.name}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <FontAwesomeIcon icon={faParking} size={16} color="#666" />
                <Text style={styles.detailText}>{record.spots} Spots Available</Text>
              </View>
              
              <View style={styles.detailRow}>
                <FontAwesomeIcon icon={faDollarSign} size={16} color="#666" />
                <Text style={styles.detailText}>${record.cost.toFixed(2)}/h</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
});
