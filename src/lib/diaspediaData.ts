export interface UserProfile {
  username: string;
  name: string;
  avatar?: string;
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
  carrier: "FlixBus" | "Deutsche Bahn" | "Eurostar";
  price: number;
  peopleGoingCount: number;
  peopleGoingList: Traveler[];
}

export interface FriendActivity {
  id: string;
  username: string;
  name: string;
  avatarBg: string;
  actionText: string; // e.g., "booked a ticket to"
  from: string;
  to: string;
  timeAgo: string;
  tripId: string;
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

export const MOCK_USER: UserProfile = {
  username: "john",
  name: "John Carter",
  homeCity: "Berlin",
  friendCount: 24,
  countryCount: 7,
  tripCount: 14,
  upcomingTrips: ["Munich", "Hamburg"],
  pastTrips: ["Prague", "Paris", "Amsterdam", "Vienna", "Rome", "Barcelona"]
};

export const TRAVELERS: Traveler[] = [
  { username: "maria", name: "Maria Schmidt", avatarBg: "bg-blue-500", isFriend: true },
  { username: "alex", name: "Alex Dubois", avatarBg: "bg-purple-500", isFriend: true, role: "University student" },
  { username: "sophie", name: "Sophie Meier", avatarBg: "bg-pink-500", isFriend: false, role: "Tech designer" },
  { username: "lucas", name: "Lucas Müller", avatarBg: "bg-orange-500", isFriend: false },
  { username: "emma", name: "Emma Jones", avatarBg: "bg-indigo-500", isFriend: true },
  { username: "maxim", name: "Maxim Petrov", avatarBg: "bg-amber-500", isFriend: false, role: "Photographer" },
  { username: "clara", name: "Clara Rossi", avatarBg: "bg-teal-500", isFriend: false }
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
    ]
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
    ]
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
    ]
  }
];

export const MOCK_ACTIVITIES: FriendActivity[] = [
  {
    id: "act-1",
    username: "maria",
    name: "Maria Schmidt",
    avatarBg: "bg-blue-500",
    actionText: "booked a ticket to",
    from: "Berlin",
    to: "Hamburg",
    timeAgo: "2 hours ago",
    tripId: "trip-ber-ham"
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
    actionText: "is traveling to",
    from: "Berlin",
    to: "Hamburg",
    timeAgo: "1 day ago",
    tripId: "trip-ber-ham"
  }
];

export const INITIAL_TICKETS: Ticket[] = [];
