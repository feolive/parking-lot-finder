import { LatLng } from "react-native-maps";

export type ParkingLot = {
    id: number;
    name: string;
    coordinate: LatLng;
    hourlyRate: number | null;
    address: string;
    date: string | null,
    spots: number | null,
    cost: number | null,
    availableSpots: number | null;
};

export default ParkingLot;
