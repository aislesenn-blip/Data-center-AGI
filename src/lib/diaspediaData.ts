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
}

export interface ShippingItem {
  name: string;
  category: string;
  weight: number; // in kg
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
      { name: "Physics & Chemistry Reference Textbooks", category: "Books & Study Materials", weight: 3.5 },
      { name: "Winter Jackets for Family", category: "Clothing & Apparel", weight: 2.5 }
    ],
    receiverName: "Mariam Ernest",
    receiverPhone: "+255 712 345 678",
    deliveryMethod: "pickup",
    totalWeight: 6,
    calculatedPrice: 27.0, // 6 * 4.5
    calculatedSavings: 69.0, // (6 * 16) - 27
    status: "joined",
    joinDate: "28 August",
    estimatedDelivery: "25 September",
  }
];

export const FAQS = [
  {
    q: "Is diaspedia an online store?",
    a: "No, diaspedia is not an online shop, a marketplace, or a cargo freight company. We are a team bringing people together living abroad to coordinate shipping schedules and share transport costs."
  },
  {
    q: "How does the pricing work?",
    a: "Individually shipping a small box from Germany to Tanzania can cost up to €16 per kg. By scheduling together and sharing space, our cost drops to as low as €4.50 per kg. We pass these savings directly to you."
  },
  {
    q: "Where do I send my items?",
    a: "Once you join a route, you will receive simple instructions on where to drop off or mail your items in the origin country. We handle the international journey, customs clearances, and delivery together."
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
