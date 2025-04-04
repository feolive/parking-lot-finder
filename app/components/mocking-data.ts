// Mock parking lot data
const PARKING_LOTS = [
    {
      id: 1,
      name: 'Parking Indigo Calgary North Hill',  
      coordinate: { latitude: 51.06492106068745, longitude: -114.0967411459932 },
      hourlyRate: 15,
      availableSpots: 45,
      address: '123 Main St, Calgary, AB',
    },
    {
      id: 2,
      name: 'SAIT Parallel Parking',  
      coordinate: { latitude: 51.067786876778754, longitude: -114.08561677233357 },
      hourlyRate: 12,
      availableSpots: 23,
      address: '456 Elm St, Calgary, AB',
    },
    {
      id: 3,
      name: 'Riley Park Village',  
      coordinate: { latitude: 51.060427536422544, longitude: -114.09242939355349 },
      hourlyRate: 18,
      availableSpots: 12,
      address: '789 Oak St, Calgary, AB',
    },
];

// Mock parking history data
const SAVED_LIST = [
    {
      id: 1,
      name: 'Parking Indigo Calgary North Hill',  
      coordinate: { latitude: 51.06492106068745, longitude: -114.0967411459932 },
      hourlyRate: 15,
      availableSpots: 45,
      date: '2024-02-20',
      spots: 50,
      cost: 37.50,
      address: '123 Main St, Calgary, AB',
    },
    {
      id: 2,
      name: 'SAIT Parallel Parking',  
      coordinate: { latitude: 51.067786876778754, longitude: -114.08561677233357 },
      hourlyRate: 12,
      availableSpots: 23,
      date: '2024-02-19',
      spots: 14,
      cost: 18.00,
      address: '456 Elm St, Calgary, AB',
    },
    {
      id: 3,
      name: 'Riley Park Village',  
      coordinate: { latitude: 51.060427536422544, longitude: -114.09242939355349 },
      hourlyRate: 18,
      availableSpots: 12,
      date: '2024-02-18',
      spots: 0,
      cost: 54.00,
      address: '789 Oak St, Calgary, AB',
    },
];

export { PARKING_LOTS, SAVED_LIST };
