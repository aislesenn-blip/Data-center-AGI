export interface UserProfile {
  username: string;
  name: string;
  homeCity: string;
  residencyStatus: string;
  passportCountry: string;
  totalKmTraveled: number;
  totalCitiesVisited: number;
  totalTripsCount: number;
  totalHoursDelayed: number;
  carbonSavedKg: number; // For premium travel metrics
  wishlist: string[]; // List of destination IDs
  friends: string[]; // List of friend usernames
}

export interface Friend {
  username: string;
  name: string;
  avatarBg: string; // Tailwind color name e.g. "bg-zinc-400"
  currentCity: string;
  passportCountry: string;
  activeTripId?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl?: string;
  trendingThisMonth: number; // e.g. 12 (12 people planning)
  friendsInterested: string[]; // friend usernames
  averagePriceEst: number; // estimated rail ticket price
}

export interface TripParticipant {
  username: string;
  name: string;
  avatarBg: string;
  seatInfo?: string; // e.g. "Coach 7, Seat 42"
  isSeatBuddySearching: boolean;
}

export interface TripLeg {
  id: string;
  operator: "DB" | "SNCF" | "Eurostar" | "ÖBB" | "SBB" | "FlixBus";
  trainType: "ICE" | "IC" | "RE" | "RB" | "TGV" | "Eurostar" | "EC" | "S-Bahn";
  trainNumber: string;
  fromStation: string;
  toStation: string;
  departureTime: string; // e.g. "08:30"
  arrivalTime: string; // e.g. "12:15"
  departureDate: string; // e.g. "Saturday, Nov 14"
  departurePlatform: string;
  arrivalPlatform: string;
  status: "On Time" | "Delayed" | "Cancelled" | "Boarding" | "Departed";
  delayMinutes: number;
  bookingUrl: string; // External official deep link handoff
}

export interface SavedTrip {
  id: string;
  fromCity: string;
  toCity: string;
  date: string;
  isShared: boolean;
  isCompleted: boolean;
  legs: TripLeg[];
  participants: TripParticipant[];
  chatGroupId: string;
}

export interface ChatMessage {
  id: string;
  chatGroupId: string;
  senderUsername: string;
  senderName: string;
  senderAvatarBg: string;
  text: string;
  timestamp: string; // e.g. "10:15 AM"
}

export interface TravelNotification {
  id: string;
  text: string;
  time: string;
  read: boolean;
  type: "delay" | "platform" | "join" | "wishlist";
  tripId?: string;
}

// ==========================================
// SEED SEEDS FOR DEMO / DEVELOPMENT USER STATE
// ==========================================

export const MOCK_FRIENDS: Friend[] = [
  {
    username: "sarah_k",
    name: "Sarah K.",
    avatarBg: "bg-zinc-800",
    currentCity: "Munich, Germany",
    passportCountry: "France",
    activeTripId: "trip-friend-1"
  },
  {
    username: "alex_m",
    name: "Alex Miller",
    avatarBg: "bg-zinc-700",
    currentCity: "Berlin, Germany",
    passportCountry: "US",
    activeTripId: "trip-friend-2"
  },
  {
    username: "john_b",
    name: "John Bradley",
    avatarBg: "bg-zinc-600",
    currentCity: "Paris, France",
    passportCountry: "Canada"
  },
  {
    username: "maria_v",
    name: "Maria Volkov",
    avatarBg: "bg-zinc-500",
    currentCity: "Vienna, Austria",
    passportCountry: "Ukraine"
  }
];

export const MOCK_USER: UserProfile = {
  username: "traveler_joe",
  name: "Joe Henderson",
  homeCity: "Berlin, Germany",
  residencyStatus: "Frequent Rail Traveler",
  passportCountry: "Canada",
  totalKmTraveled: 8420,
  totalCitiesVisited: 34,
  totalTripsCount: 126,
  totalHoursDelayed: 18,
  carbonSavedKg: 420.5,
  wishlist: ["dest-amsterdam", "dest-vienna"],
  friends: ["sarah_k", "alex_m", "john_b", "maria_v"]
};

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "dest-amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    description: "Vibrant canals, world-class museums, and beautiful cycling-friendly lanes.",
    trendingThisMonth: 12,
    friendsInterested: ["sarah_k", "alex_m"],
    averagePriceEst: 49.90
  },
  {
    id: "dest-prague",
    name: "Prague",
    country: "Czech Republic",
    description: "The City of a Hundred Spires, historic old squares, and affordable, rich culture.",
    trendingThisMonth: 8,
    friendsInterested: ["maria_v"],
    averagePriceEst: 29.90
  },
  {
    id: "dest-vienna",
    name: "Vienna",
    country: "Austria",
    description: "Imperial architecture, classical music history, and grand cozy cafe cultures.",
    trendingThisMonth: 15,
    friendsInterested: ["sarah_k", "maria_v"],
    averagePriceEst: 39.90
  },
  {
    id: "dest-zurich",
    name: "Zurich",
    country: "Switzerland",
    description: "Stunning alpine lake scenery, high-end Swiss chocolates, and premium lifestyles.",
    trendingThisMonth: 5,
    friendsInterested: ["john_b"],
    averagePriceEst: 69.90
  },
  {
    id: "dest-paris",
    name: "Paris",
    country: "France",
    description: "City of Light, iconic Eiffel Tower, fine dining, and endless art history.",
    trendingThisMonth: 22,
    friendsInterested: ["alex_m", "john_b"],
    averagePriceEst: 59.90
  }
];

export const MOCK_SAVED_TRIPS: SavedTrip[] = [
  {
    id: "trip-1",
    fromCity: "Berlin",
    toCity: "Munich",
    date: "Saturday, Nov 14",
    isShared: true,
    isCompleted: false,
    legs: [
      {
        id: "leg-1-1",
        operator: "DB",
        trainType: "ICE",
        trainNumber: "ICE 123",
        fromStation: "Berlin Hbf",
        toStation: "München Hbf",
        departureTime: "08:30",
        arrivalTime: "12:35",
        departureDate: "Saturday, Nov 14",
        departurePlatform: "5",
        arrivalPlatform: "11",
        status: "On Time",
        delayMinutes: 0,
        bookingUrl: "https://www.bahn.de/buchung/fahrplan/suche#sts=true&so=Berlin%20Hbf&sa=M%C3%BCnchen%20Hbf"
      }
    ],
    participants: [
      {
        username: "traveler_joe",
        name: "Joe Henderson",
        avatarBg: "bg-zinc-950",
        seatInfo: "Coach 7, Seat 42",
        isSeatBuddySearching: true
      },
      {
        username: "sarah_k",
        name: "Sarah K.",
        avatarBg: "bg-zinc-800",
        seatInfo: "Coach 7, Seat 45",
        isSeatBuddySearching: false
      }
    ],
    chatGroupId: "chat-trip-1"
  },
  {
    id: "trip-2",
    fromCity: "Berlin",
    toCity: "Hamburg",
    date: "Wednesday, Nov 18",
    isShared: false,
    isCompleted: false,
    legs: [
      {
        id: "leg-2-1",
        operator: "DB",
        trainType: "ICE",
        trainNumber: "ICE 804",
        fromStation: "Berlin Hbf",
        toStation: "Hamburg Hbf",
        departureTime: "15:20",
        arrivalTime: "17:15",
        departureDate: "Wednesday, Nov 18",
        departurePlatform: "7",
        arrivalPlatform: "12A",
        status: "Delayed",
        delayMinutes: 12,
        bookingUrl: "https://www.bahn.de/buchung/fahrplan/suche#sts=true&so=Berlin%20Hbf&sa=Hamburg%20Hbf"
      }
    ],
    participants: [
      {
        username: "traveler_joe",
        name: "Joe Henderson",
        avatarBg: "bg-zinc-950",
        isSeatBuddySearching: false
      }
    ],
    chatGroupId: "chat-trip-2"
  },
  {
    id: "trip-past-1",
    fromCity: "Frankfurt",
    toCity: "Paris",
    date: "Oct 12, 2026",
    isShared: true,
    isCompleted: true,
    legs: [
      {
        id: "leg-past-1",
        operator: "SNCF",
        trainType: "TGV",
        trainNumber: "TGV 9552",
        fromStation: "Frankfurt(Main)Hbf",
        toStation: "Paris Gare de l'Est",
        departureTime: "08:56",
        arrivalTime: "12:49",
        departureDate: "Oct 12, 2026",
        departurePlatform: "18",
        arrivalPlatform: "4",
        status: "On Time",
        delayMinutes: 0,
        bookingUrl: "https://www.sncf-connect.com/en-en/"
      }
    ],
    participants: [
      {
        username: "traveler_joe",
        name: "Joe Henderson",
        avatarBg: "bg-zinc-950",
        isSeatBuddySearching: false
      }
    ],
    chatGroupId: "chat-past-1"
  }
];

export const MOCK_FRIENDS_TRIPS: SavedTrip[] = [
  {
    id: "trip-friend-1",
    fromCity: "Munich",
    toCity: "Vienna",
    date: "Saturday, Nov 14",
    isShared: true,
    isCompleted: false,
    legs: [
      {
        id: "leg-f1-1",
        operator: "ÖBB",
        trainType: "EC",
        trainNumber: "EC 115",
        fromStation: "München Hbf",
        toStation: "Wien Hauptbahnhof",
        departureTime: "09:12",
        arrivalTime: "13:20",
        departureDate: "Saturday, Nov 14",
        departurePlatform: "11",
        arrivalPlatform: "6C",
        status: "On Time",
        delayMinutes: 0,
        bookingUrl: "https://www.oebb.at/"
      }
    ],
    participants: [
      {
        username: "sarah_k",
        name: "Sarah K.",
        avatarBg: "bg-zinc-800",
        seatInfo: "Coach 23, Seat 88",
        isSeatBuddySearching: true
      }
    ],
    chatGroupId: "chat-trip-friend-1"
  },
  {
    id: "trip-friend-2",
    fromCity: "Berlin",
    toCity: "Leipzig",
    date: "Sunday, Nov 15",
    isShared: true,
    isCompleted: false,
    legs: [
      {
        id: "leg-f2-1",
        operator: "DB",
        trainType: "RE",
        trainNumber: "RE 5",
        fromStation: "Berlin Südkreuz",
        toStation: "Leipzig Hbf",
        departureTime: "11:34",
        arrivalTime: "13:02",
        departureDate: "Sunday, Nov 15",
        departurePlatform: "3",
        arrivalPlatform: "18",
        status: "On Time",
        delayMinutes: 0,
        bookingUrl: "https://www.bahn.de/buchung/fahrplan/suche"
      }
    ],
    participants: [
      {
        username: "alex_m",
        name: "Alex Miller",
        avatarBg: "bg-zinc-700",
        isSeatBuddySearching: false
      }
    ],
    chatGroupId: "chat-trip-friend-2"
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    chatGroupId: "chat-trip-1",
    senderUsername: "sarah_k",
    senderName: "Sarah K.",
    senderAvatarBg: "bg-zinc-800",
    text: "Hey! Are you guys near platform 5 yet?",
    timestamp: "08:12 AM"
  },
  {
    id: "msg-2",
    chatGroupId: "chat-trip-1",
    senderUsername: "traveler_joe",
    senderName: "Joe Henderson",
    senderAvatarBg: "bg-zinc-950",
    text: "Yeah, getting a coffee at the bakery first. Want me to pick up anything?",
    timestamp: "08:14 AM"
  },
  {
    id: "msg-3",
    chatGroupId: "chat-trip-1",
    senderUsername: "sarah_k",
    senderName: "Sarah K.",
    senderAvatarBg: "bg-zinc-800",
    text: "A double espresso would be an absolute life saver!",
    timestamp: "08:15 AM"
  },
  {
    id: "msg-4",
    chatGroupId: "chat-trip-friend-1",
    senderUsername: "sarah_k",
    senderName: "Sarah K.",
    senderAvatarBg: "bg-zinc-800",
    text: "Heading to Vienna! Let me know if anyone wants to join along.",
    timestamp: "Yesterday"
  }
];

export const MOCK_NOTIFICATIONS: TravelNotification[] = [
  {
    id: "n-1",
    text: "Sarah K. is looking for a Seat Buddy on ICE 123 to Munich!",
    time: "2h ago",
    read: false,
    type: "wishlist",
    tripId: "trip-1"
  },
  {
    id: "n-2",
    text: "Track change alert: ICE 804 (Berlin to Hamburg) will depart from Platform 9 instead of 7.",
    time: "4h ago",
    read: false,
    type: "platform",
    tripId: "trip-2"
  },
  {
    id: "n-3",
    text: "Your past journey to Paris has been successfully archived in your Travel History.",
    time: "1d ago",
    read: true,
    type: "delay"
  }
];
