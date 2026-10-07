import { Location, TransportOption } from './types';

export const LOCATIONS: Location[] = [
  { id: 'dar', name: 'Dar es Salaam', region: 'Dar es Salaam' },
  { id: 'dom', name: 'Dodoma', region: 'Dodoma' },
  { id: 'mwa', name: 'Mwanza', region: 'Mwanza' },
  { id: 'aru', name: 'Arusha', region: 'Arusha' },
  { id: 'mor', name: 'Morogoro', region: 'Morogoro' },
  { id: 'tan', name: 'Tanga', region: 'Tanga' },
  { id: 'kig', name: 'Kigoma', region: 'Kigoma' },
  { id: 'mba', name: 'Mbeya', region: 'Mbeya' },
];

// Helper to generate options dynamically based on route
export function getTransportOptions(fromId: string, toId: string, date: Date, weight: number): TransportOption[] {
  // Return empty if same destination or invalid
  if (!fromId || !toId || fromId === toId) return [];

  // Create deterministic prices based on string length (for fake demo logic)
  const basePrice = (fromId.length + toId.length) * 1000 + 5000;

  // Weight multiplier
  const weightFactor = weight > 10 ? 2 : 1;

  const dayOfWeek = date.getDay(); // Use date to slightly alter schedule

  return [
    {
      id: `opt_1_${fromId}_${toId}`,
      operator: 'Shabiby Line',
      vehicleType: 'Passenger Bus',
      departureTime: '10:00 AM',
      arrivalTime: '04:00 PM',
      price: basePrice * weightFactor,
      capacity: 'Small to Medium Goods',
      highlight: true,
    },
    {
      id: `opt_2_${fromId}_${toId}`,
      operator: 'Abood Logistics',
      vehicleType: 'Cargo Van',
      departureTime: '02:00 PM',
      arrivalTime: '08:00 PM',
      price: (basePrice + 5000) * weightFactor,
      capacity: 'Medium Goods',
      highlight: false,
    },
    {
      id: `opt_3_${fromId}_${toId}`,
      operator: 'BM Coach Cargo',
      vehicleType: 'Truck',
      departureTime: '11:00 AM',
      arrivalTime: '06:00 PM',
      price: (basePrice + 15000) * weightFactor,
      capacity: 'Large Capacity',
      highlight: false,
    }
  ];
}
