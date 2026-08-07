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
  { name: "Electronics & Accessories", weightMultiplier: 1.2, icon: "Cpu" },
  { name: "Books & Study Materials", weightMultiplier: 0.9, icon: "BookOpen" },
  { name: "Clothing & Apparel", weightMultiplier: 1.0, icon: "Shirt" },
  { name: "Local Spices & Dry Foods", weightMultiplier: 0.95, icon: "Apple" },
  { name: "Cosmetics & Health Products", weightMultiplier: 1.1, icon: "Sparkles" },
  { name: "Other Household Items", weightMultiplier: 1.0, icon: "Package" }
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
    q: "Is diaspedia an online store or shopping marketplace?",
    a: "No, diaspedia is not an online shop, a marketplace, or a cargo freight company. We are building the future of cross-border financial services, starting by bringing diaspora communities together to coordinate logistics schedules and dramatically lower shipping costs."
  },
  {
    q: "How does the pricing system work?",
    a: "Individually shipping a small box from Germany to Tanzania can cost up to €16 per kg. By organizing set dates and consolidating demand from hundreds of people onto the same route, diaspedia secures bulk transport rates. We pass 100% of these savings directly to you, bringing your cost down to as low as €4.50 per kg."
  },
  {
    q: "Where do I send my items?",
    a: "Once you join a shipment route, you will receive clear drop-off or domestic postage instructions to send your items to our partner collection point in the origin country (e.g., in Germany). We handle the international movement, customs clearing, and safe arrival in the destination country together."
  },
  {
    q: "How does diaspedia expand into finance and payments?",
    a: "By solving the physical movement of goods—the hardest part of cross-border trust—we establish secure channels and deep relationships with our users. Our future vision is to expand into low-cost cross-border payments, money services, and financial infrastructure for diaspora families."
  },
  {
    q: "Can I create my own shipping group?",
    a: "To maintain world-class reliability, predictable customs clearing, and premium organization, all shipment routes and schedules are managed directly by diaspedia. You can browse, select, and join any of our active scheduled routes."
  }
];
