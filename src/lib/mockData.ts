export interface Merchant {
  id: string;
  name: string;
  category: string;
  discount: number;
  rating: number;
  distance: string;
  description: string;
  logo: string;
  photos: string[];
  hours: string;
  address: string;
  phone: string;
  mapUrl: string;
  acceptsPayFriday: boolean;
}

export const MOCK_CATEGORIES = [
  "Fuel", "Restaurants", "Coffee", "Supermarkets", "Fashion", "Electronics", "Health", "Beauty", "Hotels", "Automotive", "Entertainment"
];

export const MOCK_DISCOVERY_MERCHANTS: Merchant[] = [
  {
    id: "1001",
    name: "Stellar Brew Coffee",
    category: "Coffee",
    discount: 15,
    rating: 4.8,
    distance: "0.2 mi",
    description: "Artisanal coffee roasted in-house. Pastries baked fresh daily.",
    logo: "☕️", // Placeholder for actual logo
    photos: ["/placeholder-coffee.jpg"],
    hours: "7:00 AM - 4:00 PM",
    address: "123 Main St, Downtown",
    phone: "+1 (555) 012-3456",
    mapUrl: "https://maps.google.com/?q=Stellar+Brew+Coffee",
    acceptsPayFriday: true
  },
  {
    id: "1002",
    name: "Prime Fuels & Mart",
    category: "Fuel",
    discount: 5,
    rating: 4.5,
    distance: "1.1 mi",
    description: "Premium unleaded, diesel, and a fully stocked convenience store.",
    logo: "⛽",
    photos: ["/placeholder-fuel.jpg"],
    hours: "24 Hours",
    address: "990 Highway 1 North",
    phone: "+1 (555) 987-6543",
    mapUrl: "https://maps.google.com/?q=Prime+Fuels",
    acceptsPayFriday: true
  },
  {
    id: "1003",
    name: "Bistro Moderna",
    category: "Restaurants",
    discount: 20,
    rating: 4.9,
    distance: "0.8 mi",
    description: "Contemporary dining with locally sourced ingredients.",
    logo: "🍽️",
    photos: ["/placeholder-restaurant.jpg"],
    hours: "5:00 PM - 11:00 PM",
    address: "442 Culinary Ave",
    phone: "+1 (555) 456-7890",
    mapUrl: "https://maps.google.com/?q=Bistro+Moderna",
    acceptsPayFriday: true
  }
];
