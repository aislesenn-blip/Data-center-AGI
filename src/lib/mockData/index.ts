export const destinations = [
  "Kariakoo",
  "Masaki",
  "Mlimani City",
  "Posta",
  "Mikocheni",
  "Oysterbay",
  "Upanga",
  "Mwenge"
];

export const categoryStructure = [
  {
    id: "fashion",
    title: "Fashion & Shoes",
    icon: "ShoppingBag",
    color: "bg-orange-500",
    subcategories: ["All", "Shoes", "Trousers", "Dresses", "Shirts", "Bags", "Accessories", "Sportswear"]
  },
  {
    id: "food",
    title: "Restaurants & Food",
    icon: "Utensils",
    color: "bg-red-500",
    subcategories: ["All", "Fast Food", "Pizza", "Coffee", "Local Food", "Desserts", "Fine Dining"]
  },
  {
    id: "tech",
    title: "Electronics",
    icon: "Smartphone",
    color: "bg-blue-500",
    subcategories: ["All", "Phones", "Laptops", "TVs", "Accessories", "Gaming", "Audio"]
  },
  {
    id: "pharmacy",
    title: "Pharmacies",
    icon: "Pill",
    color: "bg-green-500",
    subcategories: ["All", "Prescription", "Vitamins", "First Aid", "Personal Care"]
  },
  {
    id: "supermarket",
    title: "Supermarkets",
    icon: "ShoppingCart",
    color: "bg-purple-500",
    subcategories: ["All", "Groceries", "Beverages", "Snacks", "Household", "Fresh Produce"]
  },
  {
    id: "beauty",
    title: "Beauty & Salons",
    icon: "Sparkles",
    color: "bg-pink-500",
    subcategories: ["All", "Haircare", "Skincare", "Makeup", "Fragrance", "Spa Services"]
  }
];

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  discount?: string;
  recommendationReason?: string;
  subcategory: string;
}

export type Merchant = {
  id: string;
  name: string;
  category: string;
  distance: string;
  location: string;
  rating: string;
  isOpen: boolean;
  premium: boolean;
  heroProduct: Product;
  otherProducts: Product[];
}

export const mockMerchants: Merchant[] = [
  {
    id: "m_1",
    name: "Sneaker Headz",
    category: "fashion",
    distance: "5 mins away",
    location: "Kariakoo, Msimbazi St",
    rating: "4.8",
    isOpen: true,
    premium: true,
    heroProduct: {
      id: "p_1_1",
      name: "Nike Air Max 270",
      description: "Experience the ultimate comfort and style with the latest Nike Air Max 270. Features the biggest heel air bag yet for a super soft ride that feels as impossible as it looks.",
      price: "Tsh 45,000",
      originalPrice: "Tsh 60,000",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      discount: "25% OFF",
      recommendationReason: "Top trending sneaker in Dar es Salaam this week.",
      subcategory: "Shoes"
    },
    otherProducts: [
      {
        id: "p_1_2",
        name: "Adidas Ultraboost",
        description: "High-performance running shoes with responsive cushioning.",
        price: "Tsh 50,000",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600",
        subcategory: "Shoes"
      },
      {
        id: "p_1_3",
        name: "Premium Sports Socks (3 Pack)",
        description: "Breathable, moisture-wicking athletic socks.",
        price: "Tsh 12,000",
        image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600",
        subcategory: "Accessories"
      }
    ]
  },
  {
    id: "m_2",
    name: "Tech Hub",
    category: "tech",
    distance: "8 mins away",
    location: "Kariakoo, Aggrey St",
    rating: "4.5",
    isOpen: true,
    premium: false,
    heroProduct: {
      id: "p_2_1",
      name: "Pro Wireless Earbuds",
      description: "Active noise cancellation, transparency mode, and customizable fit for all-day comfort.",
      price: "Tsh 85,000",
      originalPrice: "Tsh 110,000",
      image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&q=80&w=800",
      discount: "20% OFF",
      recommendationReason: "Unbeatable price for premium noise cancellation.",
      subcategory: "Audio"
    },
    otherProducts: [
      {
        id: "p_2_2",
        name: "Fast Charging Cable Type-C",
        description: "Durable braided nylon cable, supports 65W fast charging.",
        price: "Tsh 15,000",
        image: "https://images.unsplash.com/photo-1615526659807-6c2e2ab1765c?auto=format&fit=crop&q=80&w=600",
        subcategory: "Accessories"
      },
      {
        id: "p_2_3",
        name: "Gaming Controller Pro",
        description: "Ergonomic wireless controller for mobile and PC gaming.",
        price: "Tsh 45,000",
        image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=600",
        subcategory: "Gaming"
      }
    ]
  },
  {
    id: "m_3",
    name: "Pizza Master",
    category: "food",
    distance: "2 mins away",
    location: "Masaki, Haile Selassie",
    rating: "4.9",
    isOpen: true,
    premium: true,
    heroProduct: {
      id: "p_3_1",
      name: "Large Wood-Fired Pepperoni",
      description: "Authentic Italian style pizza cooked in a traditional wood-fired oven. Generously topped with imported pepperoni, fresh mozzarella, and our signature San Marzano tomato sauce.",
      price: "Tsh 22,000",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
      discount: "Free Soda",
      recommendationReason: "Highest rated pizzeria in Masaki.",
      subcategory: "Pizza"
    },
    otherProducts: [
      {
        id: "p_3_2",
        name: "Garlic Bread with Cheese",
        description: "Freshly baked artisan bread smothered in garlic butter and melted mozzarella.",
        price: "Tsh 8,000",
        image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=600",
        subcategory: "Fast Food"
      },
      {
        id: "p_3_3",
        name: "Tiramisu Dessert",
        description: "Classic Italian dessert made with espresso-soaked ladyfingers.",
        price: "Tsh 12,000",
        image: "https://images.unsplash.com/photo-1571115177098-24c42d640a92?auto=format&fit=crop&q=80&w=600",
        subcategory: "Desserts"
      }
    ]
  },
  {
    id: "m_4",
    name: "Urban Boutique",
    category: "fashion",
    distance: "4 mins away",
    location: "Mlimani City Mall",
    rating: "4.6",
    isOpen: true,
    premium: false,
    heroProduct: {
      id: "p_4_1",
      name: "Summer Floral Dress",
      description: "Lightweight, breathable cotton blend perfect for the Dar es Salaam heat. Features a flattering A-line cut and adjustable straps.",
      price: "Tsh 35,000",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
      subcategory: "Dresses"
    },
    otherProducts: [
      {
        id: "p_4_2",
        name: "Leather Crossbody Bag",
        description: "Genuine leather compact bag with gold hardware.",
        price: "Tsh 45,000",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600",
        subcategory: "Bags"
      }
    ]
  }
];
