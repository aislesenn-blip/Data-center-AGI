export interface ShippingRoute {
  id: string;
  from: string;
  fromFlag: string;
  to: string;
  toFlag: string;
  nextShipment: string;
  joinBefore: string;
  basePricePerKg: number;
  currentPricePerKg: number;
  pooledParticipants: number;
  savingsPercentage: number;
  status: "open" | "consolidating" | "shipped" | "arrived";
}

export interface CargoItem {
  id: string;
  name: string;
  weightKg: number;
  category: string;
}

export interface CargoOrder {
  id: string;
  routeId: string;
  from: string;
  to: string;
  items: CargoItem[];
  totalWeight: number;
  totalPrice: number;
  totalSaved: number;
  status: "joined" | "received" | "in-transit" | "customs" | "ready-for-pickup" | "delivered";
  orderDate: string;
  trackingNumber: string;
  nextShipmentDate: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  country: string;
  joinedCount: number;
  totalSavedAmount: number;
}

export const MOCK_USER: UserProfile = {
  name: "Ernest Michael",
  email: "ernest@diaspedia.io",
  phone: "+49 176 12345678",
  country: "Germany",
  joinedCount: 2,
  totalSavedAmount: 184.50
};

export const MOCK_ROUTES: ShippingRoute[] = [
  {
    id: "route-ger-tz",
    from: "Germany",
    fromFlag: "🇩🇪",
    to: "Tanzania",
    toFlag: "🇹🇿",
    nextShipment: "20 September",
    joinBefore: "5 September",
    basePricePerKg: 15.00,
    currentPricePerKg: 7.50, // 50% discount due to pool size
    pooledParticipants: 142,
    savingsPercentage: 50,
    status: "open"
  },
  {
    id: "route-uk-ke",
    from: "United Kingdom",
    fromFlag: "🇬🇧",
    to: "Kenya",
    toFlag: "🇰🇪",
    nextShipment: "24 September",
    joinBefore: "10 September",
    basePricePerKg: 14.00,
    currentPricePerKg: 8.40, // 40% discount
    pooledParticipants: 98,
    savingsPercentage: 40,
    status: "open"
  },
  {
    id: "route-usa-ng",
    from: "United States",
    fromFlag: "🇺🇸",
    to: "Nigeria",
    toFlag: "🇳🇬",
    nextShipment: "18 September",
    joinBefore: "2 September",
    basePricePerKg: 18.00,
    currentPricePerKg: 9.00, // 50% discount
    pooledParticipants: 215,
    savingsPercentage: 50,
    status: "open"
  },
  {
    id: "route-ca-gh",
    from: "Canada",
    fromFlag: "🇨🇦",
    to: "Ghana",
    toFlag: "🇬🇭",
    nextShipment: "30 September",
    joinBefore: "15 September",
    basePricePerKg: 16.50,
    currentPricePerKg: 11.55, // 30% discount
    pooledParticipants: 45,
    savingsPercentage: 30,
    status: "open"
  }
];

export const MOCK_ORDERS: CargoOrder[] = [
  {
    id: "ORD-9821",
    routeId: "route-ger-tz",
    from: "Germany",
    to: "Tanzania",
    items: [
      { id: "item-1", name: "Laptop & Accessories", weightKg: 3.5, category: "Electronics" },
      { id: "item-2", name: "Textbooks & Learning materials", weightKg: 8.0, category: "Education" }
    ],
    totalWeight: 11.5,
    totalPrice: 86.25, // 11.5 * 7.5
    totalSaved: 86.25, // saved 50% (base was 15.00/kg, i.e., 172.50)
    status: "in-transit",
    orderDate: "24 August",
    trackingNumber: "DP-GERTZ-9821-X",
    nextShipmentDate: "20 September"
  },
  {
    id: "ORD-7612",
    routeId: "route-uk-ke",
    from: "United Kingdom",
    to: "Kenya",
    items: [
      { id: "item-3", name: "Medical supplies & Supplements", weightKg: 4.0, category: "Healthcare" }
    ],
    totalWeight: 4.0,
    totalPrice: 33.60, // 4 * 8.40
    totalSaved: 22.40, // base was 14.00/kg (56.00 total)
    status: "received",
    orderDate: "28 August",
    trackingNumber: "DP-UKKE-7612-Y",
    nextShipmentDate: "24 September"
  }
];
