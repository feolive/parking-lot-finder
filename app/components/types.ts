import { LatLng } from "react-native-maps";

export type ParkingLot = {
    id: number;
    name: string;
    coordinate: LatLng;
    hourlyRate: number;
    address: string;
    availableSpots: number;
};

export default ParkingLot;
