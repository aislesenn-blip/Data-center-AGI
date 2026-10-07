export interface Location {
  id: string;
  name: string;
  region: string;
}

export interface SenderReceiver {
  name: string;
  phone: string;
}

export interface ShipmentDetails {
  type: string; // e.g. 'Document', 'Box', 'Cargo'
  description: string;
  weight: number; // in kg
  sender: SenderReceiver;
  receiver: SenderReceiver;
}

export interface TransportOption {
  id: string;
  operator: string;
  vehicleType: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  capacity: string;
  highlight?: boolean;
}

export interface BookingState {
  id?: string;
  from: Location | null;
  to: Location | null;
  date: Date;
  shipment: ShipmentDetails | null;
  selectedTransport: TransportOption | null;
}

export interface HistoryItem {
  id: string;
  status: 'IN TRANSIT' | 'DELIVERED' | 'READY TO SHIP';
  bookingState: BookingState;
  createdAt: Date;
}
