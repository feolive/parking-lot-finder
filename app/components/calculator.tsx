import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ParkingLot } from './types';

export default function Calculator({parkingLot}: {parkingLot: ParkingLot|null}) {
  const [hours, setHours] = useState('');
  const hourlyRate = parkingLot?.hourlyRate;
  const [total, setTotal] = useState('');

  const calculateFee = () => {
    const fee = parseFloat(hours) * (hourlyRate||0);
    setTotal(fee.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Fee Calculator</Text>
        
        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faClock} size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Hours"
            value={hours}
            onChangeText={setHours}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.textContainer}>
          <FontAwesomeIcon icon={faDollarSign} size={20} color="#007AFF" />
          <Text style={styles.parkingDetails}>{hourlyRate || 0}</Text>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateFee}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>

        {total !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Total Fee:</Text>
            <Text style={styles.resultAmount}>${total}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  parkingDetails: {
    fontSize: 16,
    color: '#666',
  },
  calculateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  resultLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  resultAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});