export interface OfferedItem {
  id: string;
  name: string;
  price: string;
  category: "product" | "service" | "food" | "offer";
  statusTag?: string; // e.g. "Available now", "Today's special", "2 left"
  description?: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  distance: string;
  distanceMeters: number;
  openingHours: string;
  isOpen: boolean;
  lat: number;
  lng: number;
  address: string;
  itemsSummary: string[];
  priceRange?: string;
  items: OfferedItem[];
  photoUrl?: string;
}

export const CAMPUS_BUSINESSES: Business[] = [
  {
    id: "campus-cafe",
    name: "Campus Café",
    category: "Café & Bakery",
    distance: "180 m away",
    distanceMeters: 180,
    openingHours: "Open until 18:00",
    isOpen: true,
    lat: 50.1275,
    lng: 8.6675,
    address: "Campus Center, Building A",
    itemsSummary: ["Coffee", "Sandwiches", "Pasta", "Lunch"],
    priceRange: "Lunch from €6.50",
    items: [
      { id: "cc-1", name: "Fresh Espresso", price: "€2.20", category: "food", statusTag: "Available now" },
      { id: "cc-2", name: "Oat Cappuccino", price: "€3.40", category: "food", statusTag: "Available now" },
      { id: "cc-3", name: "Fresh Mozzarella Sandwich", price: "€4.80", category: "food", statusTag: "Freshly made" },
      { id: "cc-4", name: "Pesto Pasta Bowl", price: "€6.50", category: "food", statusTag: "Today's menu" },
      { id: "cc-5", name: "Daily Special Lunch Deal", price: "€7.90", category: "offer", statusTag: "Special today" }
    ]
  },
  {
    id: "bluecherry-salon",
    name: "Bluecherry Salon",
    category: "Barber & Hair",
    distance: "345 m away",
    distanceMeters: 345,
    openingHours: "Open until 19:00",
    isOpen: true,
    lat: 50.1282,
    lng: 8.6690,
    address: "Grüneburgweg 42",
    itemsSummary: ["Haircut", "Beard", "Haircut + Beard"],
    priceRange: "Haircut — €18",
    items: [
      { id: "bs-1", name: "Haircut", price: "€18.00", category: "service", statusTag: "No wait line" },
      { id: "bs-2", name: "Beard Trim", price: "€10.00", category: "service", statusTag: "Available now" },
      { id: "bs-3", name: "Haircut + Beard Combo", price: "€25.00", category: "service", statusTag: "Best value" },
      { id: "bs-4", name: "Student Haircut (with ID)", price: "€15.00", category: "offer", statusTag: "Student deal" }
    ]
  },
  {
    id: "phone-shop",
    name: "Phone Shop",
    category: "Electronics & Repair",
    distance: "400 m away",
    distanceMeters: 400,
    openingHours: "Open until 20:00",
    isOpen: true,
    lat: 50.1260,
    lng: 8.6655,
    address: "Miquelallee 12",
    itemsSummary: ["USB-C cables", "Chargers", "Headphones", "Screen protectors"],
    priceRange: "USB-C cable — €8",
    items: [
      { id: "ps-1", name: "USB-C Cable (1.5m Fast Charge)", price: "€8.00", category: "product", statusTag: "In stock" },
      { id: "ps-2", name: "20W USB-C Wall Charger", price: "€15.00", category: "product", statusTag: "In stock" },
      { id: "ps-3", name: "Tempered Screen Protector + Fitting", price: "€10.00", category: "product", statusTag: "Available now" },
      { id: "ps-4", name: "Wireless Earbuds", price: "€24.00", category: "product", statusTag: "3 left" },
      { id: "ps-5", name: "Screen Repair (iPhone / Samsung)", price: "From €49.00", category: "service", statusTag: "Same day" }
    ]
  },
  {
    id: "copy-center",
    name: "Copy Center",
    category: "Printing & Services",
    distance: "500 m away",
    distanceMeters: 500,
    openingHours: "Open until 18:30",
    isOpen: true,
    lat: 50.1290,
    lng: 8.6640,
    address: "Siolistraße 7",
    itemsSummary: ["A4 printing", "Color printing", "Binding", "Passport photos"],
    priceRange: "From €0.10/page",
    items: [
      { id: "cp-1", name: "A4 Black & White Printing", price: "€0.10/page", category: "service", statusTag: "Self-service open" },
      { id: "cp-2", name: "A4 High Quality Color Printing", price: "€0.35/page", category: "service", statusTag: "Available now" },
      { id: "cp-3", name: "Thesis / Script Spiral Binding", price: "€4.50", category: "service", statusTag: "Takes 10 mins" },
      { id: "cp-4", name: "Biometric Passport Photos (4x)", price: "€9.90", category: "service", statusTag: "Instant print" }
    ]
  },
  {
    id: "campus-pizza",
    name: "Campus Pizza & Pasta",
    category: "Restaurant & Takeaway",
    distance: "250 m away",
    distanceMeters: 250,
    openingHours: "Open until 22:00",
    isOpen: true,
    lat: 50.1268,
    lng: 8.6682,
    address: "Campus Plaza 3",
    itemsSummary: ["Pizza", "Pasta", "Salad", "Cold drinks"],
    priceRange: "Pizzas from €7.50",
    items: [
      { id: "pz-1", name: "Pizza Margherita", price: "€7.50", category: "food", statusTag: "Hot & fast" },
      { id: "pz-2", name: "Pizza Salami", price: "€8.50", category: "food", statusTag: "Popular" },
      { id: "pz-3", name: "Fresh Rigatoni Bolognese", price: "€8.00", category: "food", statusTag: "Made to order" },
      { id: "pz-4", name: "Lunch Combo (Pizza Slice + Soft Drink)", price: "€5.50", category: "offer", statusTag: "Until 15:00" }
    ]
  },
  {
    id: "express-tailor",
    name: "Express Tailor & Alterations",
    category: "Clothing & Services",
    distance: "600 m away",
    distanceMeters: 600,
    openingHours: "Open until 18:00",
    isOpen: true,
    lat: 50.1298,
    lng: 8.6705,
    address: "Eschersheimer Landstraße 88",
    itemsSummary: ["Trouser Hemming", "Zipper Repair", "Suit Fitting", "Dry Cleaning"],
    priceRange: "Hemming from €12",
    items: [
      { id: "et-1", name: "Trouser / Jeans Hemming", price: "€12.00", category: "service", statusTag: "Express option" },
      { id: "et-2", name: "Jacket Zipper Replacement", price: "€15.00", category: "service", statusTag: "Available now" },
      { id: "et-3", name: "Suit / Dress Alterations", price: "€25.00", category: "service", statusTag: "1-2 days" },
      { id: "et-4", name: "Shirt Pressing & Cleaning", price: "€3.50", category: "service", statusTag: "In 24h" }
    ]
  }
];

export const POPULAR_NEEDS = [
  { label: "coffee", icon: "☕" },
  { label: "haircut", icon: "✂️" },
  { label: "printing", icon: "🖨️" },
  { label: "USB cable", icon: "🔌" },
  { label: "lunch", icon: "🥪" },
  { label: "pizza", icon: "🍕" },
  { label: "passport photos", icon: "📸" },
  { label: "phone repair", icon: "📱" }
];
