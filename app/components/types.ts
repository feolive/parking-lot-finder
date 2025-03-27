
export type ParkingLot = {
    id: number;
    name: string;
    coordinate: Location;
    hourlyRate: number;
    address: string;
    availableSpots: number;
};

export default ParkingLot;
