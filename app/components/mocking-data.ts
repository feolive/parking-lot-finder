// Mock parking lot data
const PARKING_LOTS = [
    {
      id: 1,
      name: 'Downtown Parking',
      coordinate: { latitude: 40.7128, longitude: -74.006 },
      hourlyRate: 15,
      availableSpots: 45,
    },
    {
      id: 2,
      name: 'Central Plaza Parking',
      coordinate: { latitude: 40.7138, longitude: -74.008 },
      hourlyRate: 12,
      availableSpots: 23,
    },
    {
      id: 3,
      name: 'Harbor View Parking',
      coordinate: { latitude: 40.7118, longitude: -74.004 },
      hourlyRate: 18,
      availableSpots: 12,
    },
];

// Mock parking history data
const SAVED_LIST = [
    {
      id: 1,
      location: 'Downtown Parking',
      date: '2024-02-20',
      spots: 50,
      cost: 37.50,
    },
    {
      id: 2,
      location: 'Central Plaza Parking',
      date: '2024-02-19',
      spots: 14,
      cost: 18.00,
    },
    {
      id: 3,
      location: 'Harbor View Parking',
      date: '2024-02-18',
      spots: 0,
      cost: 54.00,
    },
];

export { PARKING_LOTS, SAVED_LIST };