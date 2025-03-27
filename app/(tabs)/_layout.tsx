import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap, faList } from '@fortawesome/free-solid-svg-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Find Parking',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faMap} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved-list"
        options={{
          title: 'Saved List',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faList} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}