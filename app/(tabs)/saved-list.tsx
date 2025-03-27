import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faMapMarkerAlt, faDollarSign, faParking } from '@fortawesome/free-solid-svg-icons';
import { SAVED_LIST } from '../components/mocking-data';

export default function SavedListScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saved Parking Lots</Text>
      
      {SAVED_LIST.map((record) => (
        <View key={record.id} style={styles.historyCard}>
          <View style={styles.headerRow}>
            <Text style={styles.locationText}>{record.location}</Text>
            <Text style={styles.dateText}>{record.date}</Text>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <FontAwesomeIcon icon={faMapMarkerAlt} size={16} color="#666" />
              <Text style={styles.detailText}>{record.location}</Text>
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