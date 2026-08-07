export interface CuratedProduct {
  id: string;
  name: string;
  category: string;
  weight: number; // in kg
  price: number; // total combined price including shipment
  standardSoloPrice: number; // solo standard price for comparison
}

export interface Route {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  nextShipment: string;
  joinBefore: string;
  basePricePerKg: number; // in EUR
  soloPricePerKg: number; // standard individual DHL/FedEx shipping cost for comparison
  status: "open" | "closing" | "completed";
  progressPercent: number;
  peopleJoining: number; // number of participants on this route
  products: CuratedProduct[]; // available products for this route
}

export interface ShippingItem {
  name: string;
  category: string;
  weight: number; // in kg
  quantity?: number; // optional quantity, defaults to 1
}

export interface JoinedOrder {
  id: string;
  routeId: string;
  from: string;
  to: string;
  items: ShippingItem[];
  receiverName: string;
  receiverPhone: string;
  deliveryMethod: "pickup" | "doorstep";
  totalWeight: number;
  calculatedPrice: number;
  calculatedSavings: number;
  status: "joined" | "shipping" | "arrived" | "completed";
  joinDate: string;
  estimatedDelivery: string;
}

export const ROUTES: Route[] = [
  {
    id: "de-tz",
    from: "Germany",
    fromCode: "DE",
    to: "Tanzania",
    toCode: "TZ",
    nextShipment: "20 September",
    joinBefore: "5 September",
    basePricePerKg: 4.5,
    soloPricePerKg: 16.0,
    status: "open",
    progressPercent: 35,
    peopleJoining: 42,
    products: [
      { id: "tz-tea", name: "Tanzanian Highland Tea (1kg)", category: "Local Spices & Dry Foods", weight: 1.0, price: 12.50, standardSoloPrice: 28.50 },
      { id: "tz-spices", name: "Zanzibar Organic Spices Set", category: "Local Spices & Dry Foods", weight: 0.8, price: 9.80, standardSoloPrice: 22.60 },
      { id: "tz-fish", name: "Dried Lake Victoria Tilapia (1.5kg)", category: "Local Spices & Dry Foods", weight: 1.5, price: 18.00, standardSoloPrice: 42.00 },
      { id: "tz-flour", name: "Premium Sembe Maize Flour (5kg)", category: "Local Spices & Dry Foods", weight: 5.0, price: 29.50, standardSoloPrice: 85.00 }
    ]
  },
  {
    id: "uk-ke",
    from: "United Kingdom",
    fromCode: "UK",
    to: "Kenya",
    toCode: "KE",
    nextShipment: "22 September",
    joinBefore: "7 September",
    basePricePerKg: 4.8,
    soloPricePerKg: 18.5,
    status: "open",
    progressPercent: 42,
    peopleJoining: 28,
    products: [
      { id: "ke-coffee", name: "Premium AA Kenyan Coffee Beans (1kg)", category: "Local Spices & Dry Foods", weight: 1.0, price: 14.20, standardSoloPrice: 32.70 },
      { id: "ke-macadamia", name: "Raw Kenyan Macadamia Nuts (2kg)", category: "Local Spices & Dry Foods", weight: 2.0, price: 21.60, standardSoloPrice: 58.60 },
      { id: "ke-herbal", name: "Nairobi Purple Herbal Infusions", category: "Cosmetics & Health Products", weight: 0.5, price: 8.50, standardSoloPrice: 17.75 },
      { id: "ke-honey", name: "Pure Acacia Wild Honey (1.2kg)", category: "Local Spices & Dry Foods", weight: 1.2, price: 13.80, standardSoloPrice: 36.00 }
    ]
  },
  {
    id: "ca-gh",
    from: "Canada",
    fromCode: "CA",
    to: "Ghana",
    toCode: "GH",
    nextShipment: "28 September",
    joinBefore: "12 September",
    basePricePerKg: 5.2,
    soloPricePerKg: 21.0,
    status: "open",
    progressPercent: 18,
    peopleJoining: 15,
    products: [
      { id: "gh-shito", name: "Homemade Spicy Shito Pepper Sauce", category: "Local Spices & Dry Foods", weight: 0.8, price: 11.50, standardSoloPrice: 28.30 },
      { id: "gh-butter", name: "Raw Unrefined Shea Butter (2kg)", category: "Cosmetics & Health Products", weight: 2.0, price: 19.80, standardSoloPrice: 61.80 },
      { id: "gh-chips", name: "Sweet Plantain Crisps Bulk Box (1.5kg)", category: "Local Spices & Dry Foods", weight: 1.5, price: 14.50, standardSoloPrice: 46.00 },
      { id: "gh-gari", name: "Premium Sifted Gari (4kg)", category: "Local Spices & Dry Foods", weight: 4.0, price: 25.80, standardSoloPrice: 90.00 }
    ]
  },
  {
    id: "us-ng",
    from: "United States",
    fromCode: "US",
    to: "Nigeria",
    toCode: "NG",
    nextShipment: "25 September",
    joinBefore: "9 September",
    basePricePerKg: 5.0,
    soloPricePerKg: 19.5,
    status: "open",
    progressPercent: 55,
    peopleJoining: 63,
    products: [
      { id: "ng-chin", name: "Crunchy Sweet Chin Chin (2.5kg)", category: "Local Spices & Dry Foods", weight: 2.5, price: 18.50, standardSoloPrice: 67.25 },
      { id: "ng-kilishi", name: "Traditional Spicy Kilishi Jerky (1kg)", category: "Local Spices & Dry Foods", weight: 1.0, price: 22.00, standardSoloPrice: 41.50 },
      { id: "ng-egusi", name: "Handpeeled Ground Egusi Seeds (1.5kg)", category: "Local Spices & Dry Foods", weight: 1.5, price: 15.60, standardSoloPrice: 44.85 },
      { id: "ng-yam", name: "Pounded Yam Flour Bulk (5kg)", category: "Local Spices & Dry Foods", weight: 5.0, price: 30.00, standardSoloPrice: 105.00 }
    ]
  }
];

export const ITEM_CATEGORIES = [
  { name: "Electronics & Accessories", weightMultiplier: 1.2 },
  { name: "Books & Study Materials", weightMultiplier: 0.9 },
  { name: "Clothing & Apparel", weightMultiplier: 1.0 },
  { name: "Local Spices & Dry Foods", weightMultiplier: 0.95 },
  { name: "Cosmetics & Health Products", weightMultiplier: 1.1 },
  { name: "Other Household Items", weightMultiplier: 1.0 }
];

export const INITIAL_ORDERS: JoinedOrder[] = [
  {
    id: "DP-84920",
    routeId: "de-tz",
    from: "Germany",
    to: "Tanzania",
    items: [
      { name: "Tanzanian Highland Tea (1kg)", category: "Local Spices & Dry Foods", weight: 1.0 },
      { name: "Premium Sembe Maize Flour (5kg)", category: "Local Spices & Dry Foods", weight: 5.0 }
    ],
    receiverName: "Mariam Ernest",
    receiverPhone: "+255 712 345 678",
    deliveryMethod: "pickup",
    totalWeight: 6,
    calculatedPrice: 42.0, // Pre-calculated total
    calculatedSavings: 113.5, // Standard comparison standardSoloPrice minus diaspedia price
    status: "joined",
    joinDate: "28 August",
    estimatedDelivery: "25 September",
  }
];

export const FAQS = [
  {
    q: "Is diaspedia an online store?",
    a: "No, diaspedia is not an online shop, a marketplace, or a cargo freight company. We are a platform bringing people together living abroad to coordinate shipping schedules and share transport costs."
  },
  {
    q: "How does the pricing work?",
    a: "Individually shipping products across continents is extremely expensive. By scheduling together and sharing space, we divide container rates. We coordinate with local producers to select high-demand products and pre-calculate their direct shipping prices so you save up to 70%."
  },
  {
    q: "How do I choose products?",
    a: "For each route, we've already curated and pre-priced the available products for that specific shipping window. Simply browse what's available for your selected route, tap to add them to your shipment, and join the schedule."
  },
  {
    q: "What is the future vision?",
    a: "By solving the hard physical challenge of moving items together across borders, we build trust. Our long-term path is to expand into low-cost cross-border payments, transfers, and helpful money services for families."
  },
  {
    q: "Can I create my own group?",
    a: "To keep shipping reliable and prices as low as possible, all routes are scheduled and coordinated directly by diaspedia. You can browse, select, and join any of our active scheduled routes."
  }
];
