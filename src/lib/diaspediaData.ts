export interface UserProfile {
  username: string;
  name: string;
  homeCity: string;
  friendCount: number;
  countryCount: number;
  tripCount: number;
  upcomingTrips: string[];
  pastTrips: string[];
}

export interface Traveler {
  username: string;
  name: string;
  avatarBg: string;
  isFriend: boolean;
  role?: string;
}

export interface Trip {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  carrier: "Deutsche Bahn" | "FlixBus" | "SNCF" | "Eurostar" | "ÖBB";
  price: number;
  peopleGoingCount: number;
  peopleGoingList: Traveler[];
  trainType: "ICE" | "IC" | "EC" | "RE" | "RB" | "S-Bahn" | "FlixBus";
  status: "On time" | "5 min delay" | "12 min delayed" | "Platform change" | "Cancelled";
  platform: string;
}

export interface FriendActivity {
  id: string;
  username: string;
  name: string;
  avatarBg: string;
  actionText: string; // e.g., "is taking the train to" or "booked a ticket to"
  from: string;
  to: string;
  timeAgo: string;
  tripId: string;
  seatBuddyRequested?: boolean;
}

export interface Ticket {
  id: string;
  tripId: string;
  passengerName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  carrier: string;
  seat: string;
  platform: string;
  qrCodeValue: string;
  price: number;
}

export interface WishlistItem {
  id: string;
  city: string;
  country: string;
  interestedCount: number;
}

export interface ChatMessage {
  id: string;
  senderUsername: string;
  senderName: string;
  text: string;
  time: string;
  avatarBg: string;
}

export interface TripChat {
  tripId: string;
  title: string;
  messages: ChatMessage[];
}

export interface TravelStats {
  totalKm: number;
  totalCities: number;
  totalJourneys: number;
  totalHoursDelayed: number;
  mostVisitedCity: string;
  mostUsedCarrier: string;
}

export const MOCK_USER: UserProfile = {
  username: "john",
  name: "John Carter",
  homeCity: "Berlin",
  friendCount: 28,
  countryCount: 6,
  tripCount: 16,
  upcomingTrips: ["Munich", "Hamburg"],
  pastTrips: ["Prague", "Paris", "Amsterdam", "Vienna", "Rome", "Barcelona"]
};

export const TRAVELERS: Traveler[] = [
  { username: "maria", name: "Maria Schmidt", avatarBg: "bg-blue-500", isFriend: true, role: "Slowing backpacker" },
  { username: "alex", name: "Alex Dubois", avatarBg: "bg-purple-500", isFriend: true, role: "University student" },
  { username: "sophie", name: "Sophie Meier", avatarBg: "bg-pink-500", isFriend: false, role: "Tech designer" },
  { username: "lucas", name: "Lucas Müller", avatarBg: "bg-orange-500", isFriend: false, role: "Commuter" },
  { username: "emma", name: "Emma Jones", avatarBg: "bg-indigo-500", isFriend: true, role: "Photographer" },
  { username: "maxim", name: "Maxim Petrov", avatarBg: "bg-amber-500", isFriend: false, role: "Local traveler" },
  { username: "clara", name: "Clara Rossi", avatarBg: "bg-teal-500", isFriend: false, role: "Explorer" }
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: "trip-ber-mun",
    from: "Berlin",
    fromCode: "BER",
    to: "Munich",
    toCode: "MUN",
    date: "This Saturday",
    departureTime: "08:15",
    arrivalTime: "12:30",
    carrier: "Deutsche Bahn",
    price: 34.90,
    peopleGoingCount: 12,
    peopleGoingList: [
      { username: "maria", name: "Maria Schmidt", avatarBg: "bg-blue-500", isFriend: true },
      { username: "alex", name: "Alex Dubois", avatarBg: "bg-purple-500", isFriend: true, role: "University student" },
      { username: "sophie", name: "Sophie Meier", avatarBg: "bg-pink-500", isFriend: false },
      { username: "lucas", name: "Lucas Müller", avatarBg: "bg-orange-500", isFriend: false }
    ],
    trainType: "ICE",
    status: "On time",
    platform: "Platform 5"
  },
  {
    id: "trip-ber-ham",
    from: "Berlin",
    fromCode: "BER",
    to: "Hamburg",
    toCode: "HAM",
    date: "Friday",
    departureTime: "18:40",
    arrivalTime: "20:50",
    carrier: "FlixBus",
    price: 14.90,
    peopleGoingCount: 8,
    peopleGoingList: [
      { username: "emma", name: "Emma Jones", avatarBg: "bg-indigo-500", isFriend: true },
      { username: "maxim", name: "Maxim Petrov", avatarBg: "bg-amber-500", isFriend: false },
      { username: "clara", name: "Clara Rossi", avatarBg: "bg-teal-500", isFriend: false }
    ],
    trainType: "FlixBus",
    status: "12 min delayed",
    platform: "Südkreuz Bus Stand A"
  },
  {
    id: "trip-par-ams",
    from: "Paris",
    fromCode: "PAR",
    to: "Amsterdam",
    toCode: "AMS",
    date: "Next Friday",
    departureTime: "09:30",
    arrivalTime: "13:15",
    carrier: "Eurostar",
    price: 49.00,
    peopleGoingCount: 15,
    peopleGoingList: [
      { username: "maria", name: "Maria Schmidt", avatarBg: "bg-blue-500", isFriend: true },
      { username: "sophie", name: "Sophie Meier", avatarBg: "bg-pink-500", isFriend: false }
    ],
    trainType: "EC",
    status: "On time",
    platform: "Platform 12"
  },
  {
    id: "trip-mun-vie",
    from: "Munich",
    fromCode: "MUN",
    to: "Vienna",
    toCode: "VIE",
    date: "This Sunday",
    departureTime: "10:30",
    arrivalTime: "14:45",
    carrier: "ÖBB",
    price: 29.90,
    peopleGoingCount: 6,
    peopleGoingList: [
      { username: "alex", name: "Alex Dubois", avatarBg: "bg-purple-500", isFriend: true }
    ],
    trainType: "EC",
    status: "Platform change",
    platform: "Platform 11 (was 14)"
  }
];

export const MOCK_ACTIVITIES: FriendActivity[] = [
  {
    id: "act-1",
    username: "maria",
    name: "Maria Schmidt",
    avatarBg: "bg-blue-500",
    actionText: "is taking the train to",
    from: "Berlin",
    to: "Hamburg",
    timeAgo: "2 hours ago",
    tripId: "trip-ber-ham",
    seatBuddyRequested: true
  },
  {
    id: "act-2",
    username: "alex",
    name: "Alex Dubois",
    avatarBg: "bg-purple-500",
    actionText: "joined the trip to",
    from: "Berlin",
    to: "Munich",
    timeAgo: "4 hours ago",
    tripId: "trip-ber-mun"
  },
  {
    id: "act-3",
    username: "emma",
    name: "Emma Jones",
    avatarBg: "bg-indigo-500",
    actionText: "saved a journey to",
    from: "Paris",
    to: "Amsterdam",
    timeAgo: "1 day ago",
    tripId: "trip-par-ams"
  }
];

export const INITIAL_TICKETS: Ticket[] = [];

export const MOCK_WISHLIST: WishlistItem[] = [
  { id: "w-1", city: "Amsterdam", country: "Netherlands", interestedCount: 14 },
  { id: "w-2", city: "Prague", country: "Czech Republic", interestedCount: 22 },
  { id: "w-3", city: "Vienna", country: "Austria", interestedCount: 9 },
  { id: "w-4", city: "Zurich", country: "Switzerland", interestedCount: 5 }
];

export const MOCK_CHATS: TripChat[] = [
  {
    tripId: "trip-ber-mun",
    title: "Berlin ➔ Munich (ICE 08:15)",
    messages: [
      { id: "m1", senderUsername: "maria", senderName: "Maria Schmidt", text: "Hey everyone! Anyone at platform 5 yet?", time: "08:02 AM", avatarBg: "bg-blue-500" },
      { id: "m2", senderUsername: "alex", senderName: "Alex Dubois", text: "Yes, I'm near coach 7. Sitting on the concrete bench.", time: "08:04 AM", avatarBg: "bg-purple-500" },
      { id: "m3", senderUsername: "sophie", senderName: "Sophie Meier", text: "Getting coffee, boarding in 5 mins! Coach 9 for me.", time: "08:05 AM", avatarBg: "bg-pink-500" }
    ]
  },
  {
    tripId: "trip-ber-ham",
    title: "Berlin ➔ Hamburg (FlixBus 18:40)",
    messages: [
      { id: "h1", senderUsername: "emma", senderName: "Emma Jones", text: "Are there double decker buses on this route today?", time: "06:10 PM", avatarBg: "bg-indigo-500" },
      { id: "h2", senderUsername: "maxim", senderName: "Maxim Petrov", text: "Usually yes, hopefully with working AC!", time: "06:15 PM", avatarBg: "bg-amber-500" }
    ]
  }
];

export const MOCK_TRAVEL_STATS: TravelStats = {
  totalKm: 8420,
  totalCities: 34,
  totalJourneys: 126,
  totalHoursDelayed: 18,
  mostVisitedCity: "Berlin",
  mostUsedCarrier: "Deutsche Bahn"
};
