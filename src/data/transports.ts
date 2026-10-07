import React from 'react';
import { Bus, Truck, Box } from 'lucide-react';

export interface TransportOption {
  id: string;
  title: string; // e.g., FASTEST, STANDARD, LARGE LOAD
  vehicle: string; // e.g., Shabiby Line
  iconType: 'bus' | 'truck' | 'box';
  capacity: string;
  basePrice: number;
  departureTime: string;
  arrivalTime: string;
  durationHours: number;
  highlight: boolean;
  supportedRoutes: { from: string; to: string }[]; // 'any' for wildcard, or specific IDs
  availableDays: number[]; // 0 = Sun, 1 = Mon, ..., 6 = Sat
}

export const transports: TransportOption[] = [
  {
    id: 'shabiby-fast',
    title: 'FASTEST',
    vehicle: 'Shabiby Line (Passenger)',
    iconType: 'bus',
    capacity: 'Small goods',
    basePrice: 15000,
    departureTime: '10:00 AM',
    arrivalTime: '04:00 PM',
    durationHours: 6,
    highlight: true,
    supportedRoutes: [{ from: 'dar', to: 'dom' }, { from: 'dom', to: 'dar' }],
    availableDays: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'abood-standard',
    title: 'STANDARD',
    vehicle: 'Abood Logistics',
    iconType: 'box',
    capacity: 'Medium goods',
    basePrice: 20000,
    departureTime: '02:00 PM',
    arrivalTime: '08:00 PM',
    durationHours: 6,
    highlight: false,
    supportedRoutes: [{ from: 'dar', to: 'mor' }, { from: 'mor', to: 'dar' }, { from: 'dar', to: 'dom' }],
    availableDays: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'bm-cargo',
    title: 'LARGE LOAD',
    vehicle: 'BM Coach Cargo',
    iconType: 'truck',
    capacity: 'Large capacity',
    basePrice: 35000,
    departureTime: '11:00 AM',
    arrivalTime: '06:00 PM',
    durationHours: 7,
    highlight: false,
    supportedRoutes: [{ from: 'dar', to: 'mwa' }, { from: 'dar', to: 'dom' }, { from: 'dom', to: 'mwa' }],
    availableDays: [1, 3, 5], // Mon, Wed, Fri
  },
  {
    id: 'tahmeed-express',
    title: 'PREMIUM',
    vehicle: 'Tahmeed Express',
    iconType: 'bus',
    capacity: 'Small/Medium goods',
    basePrice: 25000,
    departureTime: '06:00 AM',
    arrivalTime: '06:00 PM',
    durationHours: 12,
    highlight: false,
    supportedRoutes: [{ from: 'dar', to: 'mwa' }, { from: 'dar', to: 'ark' }],
    availableDays: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'kilimanjaro-express',
    title: 'FASTEST',
    vehicle: 'Kilimanjaro Express',
    iconType: 'bus',
    capacity: 'Small goods',
    basePrice: 20000,
    departureTime: '08:00 AM',
    arrivalTime: '05:00 PM',
    durationHours: 9,
    highlight: true,
    supportedRoutes: [{ from: 'dar', to: 'ark' }, { from: 'ark', to: 'dar' }, { from: 'dar', to: 'msh' }],
    availableDays: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'katarama',
    title: 'STANDARD',
    vehicle: 'Katarama Logistics',
    iconType: 'truck',
    capacity: 'Large capacity',
    basePrice: 40000,
    departureTime: '05:00 PM',
    arrivalTime: '09:00 AM',
    durationHours: 16,
    highlight: false,
    supportedRoutes: [{ from: 'dar', to: 'mwa' }, { from: 'mwa', to: 'dar' }],
    availableDays: [2, 4, 6], // Tue, Thu, Sat
  }
];

export const getTransportsForRoute = (fromId: string, toId: string, date: Date): TransportOption[] => {
  const dayOfWeek = date.getDay();

  return transports.filter(t => {
    // Check if day is supported
    if (!t.availableDays.includes(dayOfWeek)) return false;

    // Check if route is supported
    const supportsRoute = t.supportedRoutes.some(r => r.from === fromId && r.to === toId);
    if (supportsRoute) return true;

    // Fallback: If no specific route matches, we can allow it for demo purposes if from/to are provided
    // In a real app, this fallback wouldn't exist, but we want to ensure some results show up for any selection.
    return true; // Allowing all routes for demo, but prioritizing actual matches if we wanted to sort.
  }).slice(0, 4); // return max 4 options
};
