import {useState, createContext, useContext} from 'react';
import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap, faList } from '@fortawesome/free-solid-svg-icons';
import { ParkingLot } from '../components/types';

type TabContextType = {
  selectedLot: ParkingLot | null
  setSelectedLot: React.Dispatch<React.SetStateAction<ParkingLot | null>>
};
const TabContext = createContext<TabContextType | null>(null);
export const useTabContext = (): TabContextType => useContext(TabContext)!;
type Props = {
    children: React.ReactNode
};
export const TabProvider: React.FC<Props> = ({children}) => {
    const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
    
    return (
        <TabContext.Provider value={{ selectedLot, setSelectedLot }}>
            {children}
        </TabContext.Provider>
    );
};

export default function TabLayout() {
  return (
    <TabProvider>
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
    </TabProvider>
  );
}
