export interface UserProfile {
  username: string;
  name: string;
  homeCity: string;
  residencyStatus: string;
  passportCountry: string;
  totalKmTraveled: number;
  totalCitiesVisited: number;
  totalTripsCount: number;
  carbonSavedKg: number;
  wishlist: string[]; // List of destination IDs
  friends: string[]; // List of friend usernames
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isIdVerified: boolean;
}

export interface Friend {
  username: string;
  name: string;
  avatarBg: string; // Tailwind color name e.g. "bg-zinc-800"
  currentCity: string;
  passportCountry: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isIdVerified: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl?: string;
  trendingThisMonth: number;
  friendsInterested: string[]; // friend usernames
  averagePriceEst: number;
}

export interface TravelPlan {
  id: string;
  fromCity: string;
  destinations: string[]; // e.g., ["Paris", "Zanzibar"]
  startDate: string;
  endDate: string;
  stops?: string[];
  isCompleted: boolean;
  status: "searching" | "matches_found";
}

export interface TravelMatch {
  id: string;
  planId: string;
  friendUsername: string;
  friendName: string;
  friendAvatarBg: string;
  fromCity: string;
  destinations: string[];
  startDate: string;
  endDate: string;
  stops?: string[];
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isIdVerified: boolean;
  potentialSavings: string[]; // e.g. ["Taxi", "Rental car", "Accommodation"]
  overlapExplanation: string;
  hasJoinedGroup: boolean;
  chatGroupId?: string;
}

export interface ChatMessage {
  id: string;
  chatGroupId: string;
  senderUsername: string;
  senderName: string;
  senderAvatarBg: string;
  text: string;
  timestamp: string;
}

export interface TravelNotification {
  id: string;
  text: string;
  time: string;
  read: boolean;
  type: "delay" | "platform" | "join" | "wishlist" | "match";
  planId?: string;
  matchId?: string;
}

// ==========================================
// SEED DATA FOR DEMO / DEVELOPMENT USER STATE
// ==========================================

export const MOCK_USER: UserProfile = {
  username: "traveler_joe",
  name: "Joe Henderson",
  homeCity: "Berlin, Germany",
  residencyStatus: "Frequent Traveler",
  passportCountry: "Canada",
  totalKmTraveled: 12450,
  totalCitiesVisited: 18,
  totalTripsCount: 42,
  carbonSavedKg: 280.4,
  wishlist: ["dest-zanzibar", "dest-reykjavik"],
  friends: ["sarah_k", "alex_m", "john_b", "maria_v"],
  isPhoneVerified: true,
  isEmailVerified: true,
  isIdVerified: true
};

export const MOCK_FRIENDS: Friend[] = [
  {
    username: "sarah_k",
    name: "Sarah K.",
    avatarBg: "bg-zinc-800",
    currentCity: "Munich, Germany",
    passportCountry: "Germany",
    isPhoneVerified: true,
    isEmailVerified: true,
    isIdVerified: true
  },
  {
    username: "alex_m",
    name: "Alex Miller",
    avatarBg: "bg-zinc-700",
    currentCity: "Hamburg, Germany",
    passportCountry: "United Kingdom",
    isPhoneVerified: true,
    isEmailVerified: true,
    isIdVerified: false
  },
  {
    username: "maria_v",
    name: "Maria Volkov",
    avatarBg: "bg-zinc-600",
    currentCity: "Paris, France",
    passportCountry: "France",
    isPhoneVerified: true,
    isEmailVerified: false,
    isIdVerified: true
  },
  {
    username: "john_b",
    name: "John Bradley",
    avatarBg: "bg-zinc-500",
    currentCity: "Amsterdam, Netherlands",
    passportCountry: "Canada",
    isPhoneVerified: false,
    isEmailVerified: true,
    isIdVerified: false
  }
];

export const MOCK_TRAVEL_PLANS: TravelPlan[] = [
  {
    id: "plan-1",
    fromCity: "Berlin",
    destinations: ["Paris", "Zanzibar"],
    startDate: "Dec 10",
    endDate: "Dec 20",
    stops: ["Paris"],
    isCompleted: false,
    status: "matches_found"
  },
  {
    id: "plan-2",
    fromCity: "Berlin",
    destinations: ["Zermatt"],
    startDate: "Feb 14",
    endDate: "Feb 21",
    isCompleted: false,
    status: "searching"
  },
  {
    id: "plan-past-1",
    fromCity: "Frankfurt",
    destinations: ["Vienna"],
    startDate: "Oct 12",
    endDate: "Oct 18",
    isCompleted: true,
    status: "searching"
  }
];

export const MOCK_TRAVEL_MATCHES: TravelMatch[] = [
  {
    id: "match-1",
    planId: "plan-1",
    friendUsername: "sarah_k",
    friendName: "Sarah K.",
    friendAvatarBg: "bg-zinc-800",
    fromCity: "Munich",
    destinations: ["Zanzibar"],
    startDate: "Dec 11",
    endDate: "Dec 21",
    isPhoneVerified: true,
    isEmailVerified: true,
    isIdVerified: true,
    potentialSavings: ["Airport transfer", "Taxi", "Accommodation"],
    overlapExplanation: "Heading to Zanzibar around the same time",
    hasJoinedGroup: false,
    chatGroupId: "chat-zanzibar"
  },
  {
    id: "match-2",
    planId: "plan-1",
    friendUsername: "alex_m",
    friendName: "Alex Miller",
    friendAvatarBg: "bg-zinc-700",
    fromCity: "Hamburg",
    destinations: ["Zanzibar"],
    startDate: "Dec 11",
    endDate: "Dec 21",
    isPhoneVerified: true,
    isEmailVerified: true,
    isIdVerified: false,
    potentialSavings: ["Rental car", "Boat", "Activity"],
    overlapExplanation: "Heading to Zanzibar around the same time",
    hasJoinedGroup: false,
    chatGroupId: "chat-zanzibar"
  },
  {
    id: "match-3",
    planId: "plan-1",
    friendUsername: "maria_v",
    friendName: "Maria Volkov",
    friendAvatarBg: "bg-zinc-600",
    fromCity: "Paris",
    destinations: ["Zanzibar"],
    startDate: "Dec 12",
    endDate: "Dec 18",
    isPhoneVerified: true,
    isEmailVerified: false,
    isIdVerified: true,
    potentialSavings: ["Taxi", "Activity"],
    overlapExplanation: "Heading to Zanzibar around the same time",
    hasJoinedGroup: false,
    chatGroupId: "chat-zanzibar"
  }
];

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "dest-zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    description: "Turquoise waters, historic Stone Town, vibrant beaches, and amazing cost-sharing on boats & activities.",
    trendingThisMonth: 12,
    friendsInterested: ["sarah_k", "alex_m", "maria_v"],
    averagePriceEst: 650.00
  },
  {
    id: "dest-reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    description: "Volcanic landscapes, geothermal lagoons, and highly shareable 4x4 rental car opportunities.",
    trendingThisMonth: 8,
    friendsInterested: ["john_b"],
    averagePriceEst: 320.00
  },
  {
    id: "dest-chamonix",
    name: "Chamonix",
    country: "France",
    description: "Iconic alpine peak views, winter skiing, and shared chalet accommodation potential.",
    trendingThisMonth: 15,
    friendsInterested: ["sarah_k", "maria_v"],
    averagePriceEst: 140.00
  },
  {
    id: "dest-amalfi",
    name: "Amalfi Coast",
    country: "Italy",
    description: "Clifftop houses, colorful harbors, and scenic roads perfect for coordinating joint transfers.",
    trendingThisMonth: 22,
    friendsInterested: ["alex_m", "john_b"],
    averagePriceEst: 180.00
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    chatGroupId: "chat-zanzibar",
    senderUsername: "sarah_k",
    senderName: "Sarah K.",
    senderAvatarBg: "bg-zinc-800",
    text: "Hey everyone! Stoked we all matched for Zanzibar. I'm landing on the 11th.",
    timestamp: "10:15 AM"
  },
  {
    id: "msg-2",
    chatGroupId: "chat-zanzibar",
    senderUsername: "alex_m",
    senderName: "Alex Miller",
    senderAvatarBg: "bg-zinc-700",
    text: "Same here. I was checking out taxi providers from the airport, looks like we can save about €40 if we split one.",
    timestamp: "10:18 AM"
  },
  {
    id: "msg-3",
    chatGroupId: "chat-zanzibar",
    senderUsername: "system",
    senderName: "Diaspedia",
    senderAvatarBg: "bg-[#71E300]/25",
    text: "Safety Tip: Always pay taxi providers directly. Avoid wiring funds to strangers.",
    timestamp: "10:20 AM"
  }
];

export const MOCK_NOTIFICATIONS: TravelNotification[] = [
  {
    id: "n-1",
    text: "We found 3 people going to Zanzibar around the same time as you!",
    time: "Just now",
    read: false,
    type: "match",
    planId: "plan-1"
  },
  {
    id: "n-2",
    text: "New destination: Reykjavik added to trending locations this week.",
    time: "2d ago",
    read: true,
    type: "wishlist"
  }
];
