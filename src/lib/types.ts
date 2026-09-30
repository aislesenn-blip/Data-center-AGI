export type ParcelStatus =
  | 'Payment confirmed'
  | 'Parcel received'
  | 'Bus departed'
  | 'On the way'
  | 'Arrived'
  | 'Collected';

export type ParcelType =
  | 'Document'
  | 'Small package'
  | 'Medium package'
  | 'Large package'
  | 'Other';

export interface BusRouteOption {
  id: string;
  operator: string;
  operatorLogoBg: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

export interface ParcelRecord {
  id: string;
  code: string;
  from: string;
  to: string;
  busOperator: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  date: string;
  status: ParcelStatus;
  parcelType: ParcelType;
  weight: string;
  senderName: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string;
  receiverLocation: string;
  paymentMethod: string;
  createdAt: string;
  timeline: {
    title: string;
    description?: string;
    timestamp?: string;
    completed: boolean;
    current: boolean;
  }[];
}

export interface PaymentMethodOption {
  id: string;
  name: string;
  description: string;
  color: string;
  logoText: string;
}
