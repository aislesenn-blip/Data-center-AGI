"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Ticket,
  User,
  Users,
  Bell,
  ChevronRight,
  ChevronDown,
  Calendar,
  MapPin,
  Check,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
  X,
  Globe,
  Activity,
  Compass,
  Briefcase,
  ExternalLink,
  MessageSquare,
  MessageCircle,
  TrendingUp,
  Map,
  Share2,
  Shield,
  Heart,
  CornerDownRight,
  Send
} from "lucide-react";

import {
  MOCK_USER,
  TRAVELERS,
  MOCK_TRIPS,
  MOCK_ACTIVITIES,
  INITIAL_TICKETS,
  MOCK_WISHLIST,
  MOCK_CHATS,
  MOCK_TRAVEL_STATS,
  Trip,
  Traveler,
  FriendActivity,
  Ticket as TicketType,
  UserProfile,
  WishlistItem,
  TripChat,
  ChatMessage,
  TravelStats
} from "@/lib/diaspediaData";

export default function Home() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"home" | "trips" | "friends" | "messages" | "profile">("home");

  // Onboarding Splash
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // App States
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [activities, setActivities] = useState<FriendActivity[]>(MOCK_ACTIVITIES);
  const [tickets, setTickets] = useState<TicketType[]>(INITIAL_TICKETS);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(MOCK_WISHLIST);
  const [chats, setChats] = useState<TripChat[]>(MOCK_CHATS);
  const [travelStats, setTravelStats] = useState<TravelStats>(MOCK_TRAVEL_STATS);

  // Search Filters
  const [searchFrom, setSearchFrom] = useState<string>("");
  const [searchTo, setSearchTo] = useState<string>("");
  const [routeFilter, setRouteFilter] = useState<"all" | "fastest" | "cheapest" | "regional">("all");

  // Selected trip for drawer/modal
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Booking Form State
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [bookingName, setBookingName] = useState<string>("John Carter");
  const [bookingLuggage, setBookingLuggage] = useState<string>("Standard Backpack + Carry-on");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [simulatedLoading, setSimulatedLoading] = useState<boolean>(false);

  // Active Chat State
  const [activeChat, setActiveChat] = useState<TripChat | null>(null);
  const [chatInput, setChatInput] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Add Wishlist Form State
  const [newWishCity, setNewWishCity] = useState<string>("");
  const [newWishCountry, setNewWishCountry] = useState<string>("");

  // Privacy Options State
  const [privacyPublic, setPrivacyPublic] = useState<boolean>(false);
  const [privacyShareWithFriends, setPrivacyShareWithFriends] = useState<boolean>(true);
  const [privacyShowSeat, setPrivacyShowSeat] = useState<boolean>(false);

  // Notifications drawer simulation
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; time: string; read: boolean }>>([
    { id: "n1", text: "Maria Schmidt booked Berlin ➔ Hamburg for Friday!", time: "2h ago", read: false },
    { id: "n2", text: "Alex Dubois joined Saturday's Berlin ➔ Munich trip.", time: "4h ago", read: false },
    { id: "n3", text: "3 friends are traveling this weekend. Explore their active routes!", time: "1d ago", read: true }
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onboarded = localStorage.getItem("diaspedia_travel_onboarded_v2");
      if (onboarded === "true") {
        setShowSplash(false);
      }
    }
  }, []);

  // Scroll to bottom of chat whenever activeChat or messages changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, chats]);

  const handleDismissSplash = () => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("diaspedia_travel_onboarded_v2", "true");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Check if user is already joined on a trip
  const isUserJoined = (tripId: string) => {
    return tickets.some(t => t.tripId === tripId);
  };

  // Handle Joining Trip / Booking
  const handleStartBooking = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsBooking(true);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrip) return;

    setSimulatedLoading(true);

    setTimeout(() => {
      setSimulatedLoading(false);
      setBookingSuccess(true);

      // Generate simulated Ticket
      const newTicket: TicketType = {
        id: `TCK-${Math.floor(10000 + Math.random() * 90000)}`,
        tripId: selectedTrip.id,
        passengerName: bookingName,
        from: `${selectedTrip.from} Hauptbahnhof`,
        to: `${selectedTrip.to} Hauptbahnhof`,
        date: selectedTrip.date,
        time: selectedTrip.departureTime,
        carrier: selectedTrip.carrier,
        seat: `Car ${Math.floor(1 + Math.random() * 8)}, Seat ${Math.floor(11 + Math.random() * 70)}`,
        platform: selectedTrip.platform.split(" ")[0] || "Platform 4",
        qrCodeValue: `DIASPEDIA-TCK-${Math.floor(10000 + Math.random() * 90000)}-OK`,
        price: selectedTrip.price
      };

      // Update States
      setTickets([newTicket, ...tickets]);

      // Update the trip with +1 attendee and append user to going list
      setTrips(prevTrips =>
        prevTrips.map(t => {
          if (t.id === selectedTrip.id) {
            return {
              ...t,
              peopleGoingCount: t.peopleGoingCount + 1,
              peopleGoingList: [
                { username: "john", name: "John Carter", avatarBg: "bg-[#71E300]/30", isFriend: false, role: "Me" },
                ...t.peopleGoingList
              ]
            };
          }
          return t;
        })
      );

      // Add to social activity feed
      const newActivity: FriendActivity = {
        id: `act-${Date.now()}`,
        username: "john",
        name: "John Carter",
        avatarBg: "bg-zinc-800",
        actionText: "booked a ticket to",
        from: selectedTrip.from,
        to: selectedTrip.to,
        timeAgo: "Just now",
        tripId: selectedTrip.id
      };
      setActivities([newActivity, ...activities]);

      // Join/Add to matching Chat room if not exists
      const hasChat = chats.some(c => c.tripId === selectedTrip.id);
      if (!hasChat) {
        const newRoom: TripChat = {
          tripId: selectedTrip.id,
          title: `${selectedTrip.from} ➔ ${selectedTrip.to} (${selectedTrip.trainType} ${selectedTrip.departureTime})`,
          messages: [
            { id: `m-${Date.now()}`, senderUsername: "system", senderName: "Diaspedia Companion", text: "You joined the trip chat! Say hello to your co-travelers.", time: "Just now", avatarBg: "bg-zinc-800" }
          ]
        };
        setChats([...chats, newRoom]);
      }

      // Update profile stats
      setUserProfile(prev => ({
        ...prev,
        tripCount: prev.tripCount + 1,
        upcomingTrips: [selectedTrip.to, ...prev.upcomingTrips]
      }));

      // Update historical travel stats dynamically
      setTravelStats(prev => ({
        ...prev,
        totalJourneys: prev.totalJourneys + 1,
        totalKm: prev.totalKm + 280 // average simulated km
      }));

      // Set notifications
      setNotifications([
        { id: `n-${Date.now()}`, text: `You joined the trip to ${selectedTrip.to}! Coordination chat unlocked.`, time: "Just now", read: false },
        ...notifications
      ]);

      // Clean up form step
      setTimeout(() => {
        setIsBooking(false);
        setSelectedTrip(null);
        setActiveTab("trips"); // Switch to trips tab to see success ticket
      }, 1500);

    }, 1200);
  };

  // Filtered Trips based on search and filters
  const filteredTrips = trips.filter(trip => {
    const matchFrom = trip.from.toLowerCase().includes(searchFrom.toLowerCase());
    const matchTo = trip.to.toLowerCase().includes(searchTo.toLowerCase());

    if (routeFilter === "regional") {
      // regional passes compatible trains (RE, RB, S-Bahn)
      return matchFrom && matchTo && ["RE", "RB", "S-Bahn"].includes(trip.trainType);
    }
    if (routeFilter === "cheapest") {
      return matchFrom && matchTo && trip.price <= 20.00;
    }
    if (routeFilter === "fastest") {
      return matchFrom && matchTo && ["ICE", "EC", "Eurostar"].includes(trip.trainType);
    }
    return matchFrom && matchTo;
  });

  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleQuickDest = (city: string) => {
    setSearchTo(city);
  };

  // Add Item to Wishlist
  const handleAddWishlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishCity.trim() || !newWishCountry.trim()) return;

    const newItem: WishlistItem = {
      id: `w-${Date.now()}`,
      city: newWishCity.trim(),
      country: newWishCountry.trim(),
      interestedCount: 1
    };

    setWishlist([newItem, ...wishlist]);
    setNewWishCity("");
    setNewWishCountry("");
  };

  // Send message to live chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChat) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderUsername: userProfile.username,
      senderName: userProfile.name,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      avatarBg: "bg-zinc-900 text-white"
    };

    // Update active chat locally
    const updatedChats = chats.map(c => {
      if (c.tripId === activeChat.tripId) {
        return {
          ...c,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });

    setChats(updatedChats);
    setActiveChat(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newMsg]
      };
    });
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-[#F6F4ED] text-[#0f1115] font-sans antialiased flex justify-center overflow-hidden">

      {/*
        SOPHISTICATED MOBILE SHELL CONSTRAINER
        - Emulates an edge-to-edge premium mobile device
        - h-[100dvh] constraint enforces that the bottom nav is permanently pinned.
      */}
      <div className="w-full max-w-md bg-[#F6F4ED] h-[100dvh] relative flex flex-col shadow-[0_0_50px_rgba(15,17,21,0.06)] overflow-hidden border-x border-black/[0.03]">

        {/* ONBOARDING SCREEN (FITS EXACTLY ONE SCREEN, ZERO SCROLLING) */}
        <AnimatePresence>
          {showSplash && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-[#F6F4ED] z-[60] flex flex-col justify-between p-5 h-[100dvh] overflow-hidden"
            >
              {/* Header Branding */}
              <div className="flex flex-col items-center pt-4 text-center space-y-2">
                <span className="font-heading font-black text-3xl tracking-tighter text-[#0f1115] select-none">diaspedia</span>
                <p className="max-w-xs text-xs font-medium text-zinc-600 leading-normal pt-1">
                  The social layer on top of European transportation. Coordinate schedules, discover friends going, and book passenger tickets on active routes.
                </p>
              </div>

              {/* Onboarding Features Summary */}
              <div className="space-y-2.5 max-w-sm mx-auto w-full py-2">
                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Users size={15} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">See Who is Going</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Instantly discover friends and peer travelers on the same rail journeys.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Ticket size={15} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">Seamless Connection</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Join trip groups, coordinate seating, and access integrated live chats.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Clock size={15} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">Live Rail Companion</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Monitor delays, platform adjustments, and track your travel history.</p>
                  </div>
                </div>
              </div>

              {/* Get Started Button */}
              <div className="w-full max-w-sm mx-auto pb-2">
                <button
                  type="button"
                  onClick={handleDismissSplash}
                  className="w-full bg-black hover:bg-zinc-900 active:scale-95 text-white font-bold text-xs py-3.5 rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Explore European Rail</span>
                  <ArrowRight size={14} className="text-[#71E300]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER BAR */}
        <header className="sticky top-0 left-0 right-0 bg-[#F6F4ED]/85 backdrop-blur-md border-b border-black/[0.04] py-3 px-4 flex items-center justify-between z-30 shrink-0">
          <span className="font-heading font-black text-2xl tracking-tighter text-[#0f1115] select-none">diaspedia</span>

          <div className="flex items-center gap-2">
            {/* Notification Button */}
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markAllNotificationsRead();
              }}
              className="relative w-9 h-9 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#0f1115] hover:bg-[#F6F4ED] active:scale-90 transition-all cursor-pointer"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#71E300] text-black text-[10px] font-black w-5 h-5 rounded-full border-2 border-[#F6F4ED] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* NOTIFICATIONS DROPDOWN OVERLAY (SMOOTH INTERACTION) */}
        <AnimatePresence>
          {showNotifications && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-black z-[45]"
                onClick={() => setShowNotifications(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[56px] left-4 right-4 bg-white border border-black/10 shadow-xl z-50 max-h-[75%] overflow-y-auto rounded-3xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black font-heading tracking-tight">Travel Alerts</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 rounded-2xl text-xs border transition-all ${
                        n.read ? "bg-white border-black/[0.04]" : "bg-[#71E300]/10 border-[#71E300]/20"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-semibold text-zinc-800 leading-relaxed">{n.text}</p>
                        <span className="text-[10px] text-zinc-400 font-bold shrink-0">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full bg-zinc-900 text-white font-bold text-xs py-3 rounded-xl transition-all"
                >
                  Close Panel
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN INDEPENDENTLY SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-32 space-y-5 scroll-smooth">

          {/* 1. HOME / DISCOVER TAB */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Confident Headings */}
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115] leading-none">Where are we going?</h2>
              </div>

              {/* DENSE SEARCH BAR SECTION (Uber Visual Density Inspiration) */}
              <div className="bg-white p-4 rounded-3xl border border-black/5 shadow-[0_4px_20px_rgba(15,17,21,0.02)] space-y-3.5">
                <div className="space-y-2">
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="From station (e.g. Berlin)"
                      value={searchFrom}
                      onChange={(e) => setSearchFrom(e.target.value)}
                      className="w-full bg-[#F6F4ED]/60 border border-black/5 rounded-2xl py-3 pl-10 pr-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300] placeholder:text-zinc-400"
                    />
                  </div>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-800" />
                    <input
                      type="text"
                      placeholder="Where to? (e.g. Munich)"
                      value={searchTo}
                      onChange={(e) => setSearchTo(e.target.value)}
                      className="w-full bg-[#F6F4ED]/60 border border-black/5 rounded-2xl py-3 pl-10 pr-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300] placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                {/* Routing filter pills: Fastest, Cheapest, Regional only */}
                <div className="flex gap-2.5 pt-1.5 overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setRouteFilter("all")}
                    className={`text-[11px] px-3.5 py-2 font-bold rounded-xl border transition-all shrink-0 cursor-pointer ${
                      routeFilter === "all" ? "bg-black text-white border-black" : "bg-zinc-50 border-black/5 text-zinc-600"
                    }`}
                  >
                    All Schedules
                  </button>
                  <button
                    onClick={() => setRouteFilter("fastest")}
                    className={`text-[11px] px-3.5 py-2 font-bold rounded-xl border transition-all shrink-0 cursor-pointer ${
                      routeFilter === "fastest" ? "bg-black text-white border-black" : "bg-zinc-50 border-black/5 text-zinc-600"
                    }`}
                  >
                    Fastest (ICE/EC)
                  </button>
                  <button
                    onClick={() => setRouteFilter("cheapest")}
                    className={`text-[11px] px-3.5 py-2 font-bold rounded-xl border transition-all shrink-0 cursor-pointer ${
                      routeFilter === "cheapest" ? "bg-black text-white border-black" : "bg-zinc-50 border-black/5 text-zinc-600"
                    }`}
                  >
                    Cheapest (Under €20)
                  </button>
                  <button
                    onClick={() => setRouteFilter("regional")}
                    className={`text-[11px] px-3.5 py-2 font-bold rounded-xl border transition-all shrink-0 cursor-pointer ${
                      routeFilter === "regional" ? "bg-[#71E300] text-black border-[#71E300]" : "bg-zinc-50 border-black/5 text-zinc-600"
                    }`}
                  >
                    Regional passes only
                  </button>
                </div>

                {/* Quick Shortcuts (Uber style circular quick destinations) */}
                <div className="pt-1.5 border-t border-black/[0.03]">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Popular destinations</p>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {["Munich", "Hamburg", "Amsterdam", "Paris"].map((city) => (
                      <button
                        key={city}
                        onClick={() => handleQuickDest(city)}
                        className={`text-xs font-bold px-3 py-2 rounded-xl border transition-all shrink-0 cursor-pointer ${
                          searchTo.toLowerCase() === city.toLowerCase()
                            ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                            : "bg-zinc-50 text-zinc-700 border-black/[0.04] hover:bg-zinc-100"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {(searchFrom || searchTo || routeFilter !== "all") && (
                  <button
                    onClick={() => { setSearchFrom(""); setSearchTo(""); setRouteFilter("all"); }}
                    className="text-xs text-zinc-500 hover:text-black font-bold flex items-center gap-1 mx-auto pt-1"
                  >
                    Clear filters <X size={12} />
                  </button>
                )}
              </div>

              {/* Active Group Booking Routes */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between px-1 mb-2">
                  <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase">Active Transit Schedules</h3>
                </div>

                <div className="space-y-3.5">
                  {filteredTrips.length > 0 ? (
                    filteredTrips.map((trip) => {
                      const isJoined = isUserJoined(trip.id);
                      return (
                        <div
                          key={trip.id}
                          className="bg-white rounded-3xl border border-black/[0.04] p-5 shadow-sm space-y-4 hover:border-black/10 transition-all cursor-pointer"
                          onClick={() => setSelectedTrip(trip)}
                        >
                          {/* Route & Pricing Header */}
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-heading font-black text-xl text-black leading-tight">{trip.from}</span>
                                <span className="text-zinc-400 font-bold">➔</span>
                                <span className="font-heading font-black text-xl text-black leading-tight">{trip.to}</span>
                              </div>
                              <div className="flex items-center gap-2.5 pt-0.5">
                                <div className="flex items-center gap-1 bg-[#71E300]/15 text-black font-extrabold text-[11px] px-2 py-0.5 rounded-md">
                                  <Clock size={11} className="text-[#5ec700]" />
                                  <span>{trip.departureTime}</span>
                                </div>
                                <span className="text-xs text-zinc-500 font-semibold">{trip.date}</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                  trip.status === "On time" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                                }`}>
                                  {trip.status}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-black text-black">€{trip.price.toFixed(2)}</div>
                              <span className="text-[10px] text-zinc-400 font-semibold block">{trip.trainType}</span>
                            </div>
                          </div>

                          {/* FRIENDS GOING - OVERLAPPING AVATAR STACK WITHOUT NAMES (Item 2) */}
                          {trip.peopleGoingList.some(p => p.isFriend) && (
                            <div className="flex items-center justify-between bg-[#F6F4ED]/40 border border-black/[0.02] rounded-2xl p-3">
                              <span className="text-xs font-bold text-zinc-500">Friends on route</span>
                              <div className="flex -space-x-2 items-center pl-1">
                                {trip.peopleGoingList.filter(p => p.isFriend).map((friend, idx) => (
                                  <div
                                    key={idx}
                                    className={`w-6.5 h-6.5 rounded-full border border-white ${friend.avatarBg} flex items-center justify-center text-[9px] font-black text-white shadow-sm`}
                                  >
                                    {friend.username[0].toUpperCase()}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Bottom Action Indicator */}
                          <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-black/[0.02]">
                            <span className="text-zinc-400 flex items-center gap-1">
                              <Globe size={12} className="text-[#71E300]" />
                              <span>Rail via {trip.carrier}</span>
                            </span>
                            <button
                              type="button"
                              className="text-black font-black flex items-center gap-1 hover:underline"
                            >
                              <span>{isJoined ? "View Ticket" : "Explore Trip"}</span>
                              <ChevronRight size={14} className="text-[#71E300]" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-white rounded-3xl border border-black/5 p-8 text-center space-y-2">
                      <Compass size={24} className="mx-auto text-zinc-400" />
                      <h4 className="text-xs font-bold text-zinc-800">No active schedules found</h4>
                      <p className="text-xs text-zinc-400">Try adjusting your filters or typing another European city.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. TRIPS TAB */}
          {activeTab === "trips" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">My Journey</h2>
                <p className="text-xs text-zinc-400">Manage booked passes and track travel milestones.</p>
              </div>

              {/* Upcoming Joined Trips */}
              <div className="space-y-3">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Upcoming Travel</h3>
                {tickets.length > 0 ? (
                  tickets.map((t) => {
                    const matchedTrip = trips.find(tr => tr.id === t.tripId);
                    return (
                      <div key={t.id} className="bg-white border border-black/[0.04] rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-zinc-100 border border-black/5 text-zinc-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Booked Pass
                          </span>
                          <span className="text-xs font-bold text-zinc-400">{t.seat}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-black text-xl text-black leading-tight">{t.from.split(" ")[0]}</span>
                            <span className="text-zinc-400 font-bold">➔</span>
                            <span className="font-heading font-black text-xl text-black leading-tight">{t.to.split(" ")[0]}</span>
                          </div>
                          <div className="flex items-center gap-2.5 pt-0.5">
                            <div className="flex items-center gap-1 bg-[#71E300]/15 text-black font-extrabold text-[11px] px-2 py-0.5 rounded-md">
                              <Clock size={11} className="text-[#5ec700]" />
                              <span>{t.time}</span>
                            </div>
                            <span className="text-xs text-zinc-500 font-semibold">{t.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1 border-t border-black/[0.02]">
                          <span className="text-zinc-400 font-bold">Carrier: {t.carrier}</span>
                          <button
                            onClick={() => {
                              setSelectedTrip(trips.find(tr => tr.id === t.tripId) || null);
                              setActiveTab("home");
                            }}
                            className="text-black font-black flex items-center gap-1 hover:underline"
                          >
                            <span>Open Pass</span>
                            <ChevronRight size={14} className="text-[#71E300]" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-3xl border border-black/5 p-8 text-center space-y-3">
                    <Calendar size={24} className="mx-auto text-zinc-400" />
                    <h4 className="text-xs font-bold text-zinc-800">No active travel passes</h4>
                    <p className="text-xs text-zinc-400">Discover active trips on the Home feed and secure your ticket today.</p>
                  </div>
                )}
              </div>

              {/* BEAUTIFUL TRAVEL HISTORICAL STATISTICS */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Traveler Analytics</h3>

                <div className="bg-zinc-900 text-white rounded-3xl p-5 shadow-md relative overflow-hidden space-y-4">
                  {/* Subtle graphic background */}
                  <div className="absolute right-0 top-0 bottom-0 w-24 bg-[#71E300]/10 rounded-l-full filter blur-xl pointer-events-none" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Total Distance</span>
                      <h3 className="text-2xl font-black text-[#71E300] tracking-tight">{travelStats.totalKm} km</h3>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Cities Explored</span>
                      <h3 className="text-2xl font-black text-white tracking-tight">{travelStats.totalCities}</h3>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Completed Journeys</span>
                      <h3 className="text-2xl font-black text-white tracking-tight">{travelStats.totalJourneys}</h3>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Hours Delayed</span>
                      <h3 className="text-2xl font-black text-amber-400 tracking-tight">{travelStats.totalHoursDelayed} hrs</h3>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] text-zinc-300 font-bold uppercase">
                    <div>Favorite Hub: <span className="text-[#71E300]">{travelStats.mostVisitedCity}</span></div>
                    <div>Main Carrier: <span className="text-[#71E300]">{travelStats.mostUsedCarrier}</span></div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* 3. FRIENDS / DISCOVER TAB */}
          {activeTab === "friends" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Friend Activity</h2>
                <p className="text-xs text-zinc-400">See where your friends are heading and join their routes.</p>
              </div>

              {/* Real-time Activity Feed */}
              <div className="space-y-3.5">
                {activities.map((act) => {
                  const matchedTrip = trips.find(t => t.id === act.tripId);
                  const isJoined = isUserJoined(act.tripId);
                  return (
                    <div
                      key={act.id}
                      className="bg-white rounded-3xl border border-black/[0.04] p-5 shadow-sm space-y-4"
                    >
                      {/* Feed Item Header */}
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${act.avatarBg} flex items-center justify-center font-black text-white text-xs`}>
                          {act.username[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-black">
                            @{act.username} <span className="text-zinc-500 font-medium">{act.actionText}</span>
                          </p>
                          <span className="text-[10px] text-zinc-400 font-bold">{act.timeAgo}</span>
                        </div>
                        {act.seatBuddyRequested && (
                          <span className="text-[9px] bg-[#71E300]/20 text-[#5ec700] border border-[#71E300]/30 font-bold px-2 py-0.5 rounded-md uppercase shrink-0">
                            Seat Buddy Wanted
                          </span>
                        )}
                      </div>

                      {/* Travel Card Preview */}
                      <div className="bg-[#F6F4ED]/50 border border-black/[0.02] rounded-2xl p-4 flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-black">{act.from}</span>
                            <span className="text-zinc-400 text-xs">➔</span>
                            <span className="font-bold text-xs text-black">{act.to}</span>
                          </div>
                          <div className="flex items-center gap-2 pt-0.5">
                            <div className="flex items-center gap-1 bg-[#71E300]/15 text-black font-extrabold text-[10px] px-1.5 py-0.5 rounded-md">
                              <Clock size={10} className="text-[#5ec700]" />
                              <span>{matchedTrip?.departureTime || "08:15"}</span>
                            </div>
                            <span className="text-[11px] text-zinc-500 font-semibold">{matchedTrip?.date || "This weekend"}</span>
                          </div>
                        </div>

                        {matchedTrip && (
                          <button
                            onClick={() => {
                              if (isJoined) {
                                // Already joined, open messages
                                setActiveTab("messages");
                              } else {
                                handleStartBooking(matchedTrip);
                              }
                            }}
                            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                              isJoined ? "bg-zinc-100 text-zinc-500" : "bg-[#71E300] hover:bg-[#5ec700] text-black"
                            }`}
                          >
                            {isJoined ? "Coordinating" : "Join"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          )}

          {/* 4. MESSAGES / TRIP CHATS TAB */}
          {activeTab === "messages" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Trip Chats</h2>
                <p className="text-xs text-zinc-400">Coordinate and chat in real-time with people on your routes.</p>
              </div>

              {/* Chat list */}
              {!activeChat ? (
                <div className="space-y-3">
                  {chats.length > 0 ? (
                    chats.map((chat) => (
                      <div
                        key={chat.tripId}
                        onClick={() => setActiveChat(chat)}
                        className="bg-white border border-black/[0.04] p-4 rounded-3xl shadow-sm flex items-center justify-between cursor-pointer hover:border-black/10 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center shrink-0">
                            <MessageSquare size={16} className="text-[#71E300]" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-black truncate">{chat.title}</h4>
                            <p className="text-[11px] text-zinc-400 truncate font-semibold">
                              {chat.messages[chat.messages.length - 1]?.senderName}: {chat.messages[chat.messages.length - 1]?.text}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] text-zinc-400 font-bold shrink-0 pl-2">
                          {chat.messages[chat.messages.length - 1]?.time.split(" ")[0]}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-3xl border border-black/5 p-8 text-center space-y-2">
                      <MessageCircle size={24} className="mx-auto text-zinc-400" />
                      <h4 className="text-xs font-bold text-zinc-800">No active chats</h4>
                      <p className="text-xs text-zinc-400">Chats unlock automatically when you join or book a co-travel trip.</p>
                    </div>
                  )}
                </div>
              ) : (
                // ACTIVE CHAT COMPONENT (FULLY FUNCTIONAL MESSENGER)
                <div className="bg-white border border-black/5 rounded-3xl overflow-hidden flex flex-col h-[60dvh] shadow-sm">
                  {/* Active Chat Header */}
                  <div className="bg-black text-white p-4 flex justify-between items-center shrink-0">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{activeChat.title}</h4>
                      <span className="text-[9px] text-zinc-400 font-black block">Active Trip Chat</span>
                    </div>
                    <button
                      onClick={() => setActiveChat(null)}
                      className="p-1 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Messages log */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none">
                    {activeChat.messages.map((m) => {
                      const isMe = m.senderUsername === userProfile.username;
                      return (
                        <div key={m.id} className={`flex items-start gap-2.5 ${isMe ? "justify-end" : ""}`}>
                          {!isMe && (
                            <div className={`w-7 h-7 rounded-full ${m.avatarBg} flex items-center justify-center font-bold text-white text-[10px] shrink-0`}>
                              {m.senderName[0].toUpperCase()}
                            </div>
                          )}
                          <div className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed space-y-0.5 ${
                            isMe ? "bg-[#71E300] text-black rounded-tr-none" : "bg-zinc-100 text-zinc-800 rounded-tl-none"
                          }`}>
                            <div className="flex justify-between gap-4">
                              <span className="font-extrabold text-[10px] opacity-75">{m.senderName}</span>
                              <span className="text-[8px] opacity-60 font-semibold">{m.time}</span>
                            </div>
                            <p className="font-medium text-left">{m.text}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t border-black/5 bg-[#F6F4ED]/50 flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Type a coordinate message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-white border border-black/5 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#71E300]"
                    />
                    <button
                      type="submit"
                      className="bg-black hover:bg-zinc-800 text-white w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-95"
                    >
                      <Send size={15} className="text-[#71E300]" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          )}

          {/* 5. PROFILE TAB */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Profile Card Summary */}
              <div className="bg-white border border-black/[0.04] rounded-3xl p-6 shadow-sm text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center border-4 border-[#71E300]">
                    <span className="text-white text-3xl font-black font-heading">J</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-lg font-black font-heading text-black leading-tight">@{userProfile.username}</h3>
                  <p className="text-xs text-zinc-500 font-bold">Based in {userProfile.homeCity}</p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/[0.03]">
                  <div className="space-y-0.5">
                    <div className="text-lg font-black text-black">{userProfile.tripCount}</div>
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">Trips</span>
                  </div>
                  <div className="space-y-0.5 border-x border-black/[0.03]">
                    <div className="text-lg font-black text-black">{userProfile.friendCount}</div>
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">Friends</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-lg font-black text-black">{userProfile.countryCount}</div>
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">Countries</span>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE WISHLIST */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Social Wishlist</h3>

                <div className="bg-white border border-black/[0.04] rounded-3xl p-4 space-y-4 shadow-sm">
                  {/* Form to append in real-time */}
                  <form onSubmit={handleAddWishlist} className="flex gap-2 items-center">
                    <input
                      type="text"
                      required
                      placeholder="City (e.g. Rome)"
                      value={newWishCity}
                      onChange={(e) => setNewWishCity(e.target.value)}
                      className="flex-1 bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#71E300]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Country"
                      value={newWishCountry}
                      onChange={(e) => setNewWishCountry(e.target.value)}
                      className="w-24 bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#71E300]"
                    />
                    <button
                      type="submit"
                      className="bg-black hover:bg-zinc-900 text-white font-bold p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                    >
                      <Plus size={14} className="text-[#71E300]" />
                    </button>
                  </form>

                  {/* Wishlist Render */}
                  <div className="space-y-2">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#F6F4ED]/50 border border-black/[0.02] p-3 rounded-2xl flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-black">{item.city}</div>
                          <span className="text-[9px] text-zinc-400 font-semibold">{item.country}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] text-zinc-500 font-bold bg-white px-2 py-1 rounded-lg">
                            {item.interestedCount} interested peers
                          </span>
                          <button
                            onClick={() => {
                              // Increment count dynamically
                              setWishlist(prev => prev.map(w => {
                                if (w.id === item.id) {
                                  return { ...w, interestedCount: w.interestedCount + 1 };
                                }
                                return w;
                              }));
                            }}
                            className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition-colors"
                          >
                            <Heart size={12} className="text-[#5ec700]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PRIVACY CONTROLS (Item 31) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Privacy Controls</h3>

                <div className="bg-white border border-black/[0.04] rounded-3xl p-4 space-y-3 shadow-sm text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black">Public profile</h4>
                      <p className="text-[10px] text-zinc-400 leading-tight">Allow anyone in Europe to discover your travel routes.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacyPublic}
                      onChange={() => setPrivacyPublic(!privacyPublic)}
                      className="accent-[#71E300] w-4 h-4"
                    />
                  </div>

                  <div className="border-t border-black/[0.03] pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black">Share with Friends</h4>
                      <p className="text-[10px] text-zinc-400 leading-tight">Automatically show active tickets to verified friends list.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacyShareWithFriends}
                      onChange={() => setPrivacyShareWithFriends(!privacyShareWithFriends)}
                      className="accent-[#71E300] w-4 h-4"
                    />
                  </div>

                  <div className="border-t border-black/[0.03] pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black">Show Seat Coordinate</h4>
                      <p className="text-[10px] text-zinc-400 leading-tight">Reveal exact coach and seat numbers for booking matching.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacyShowSeat}
                      onChange={() => setPrivacyShowSeat(!privacyShowSeat)}
                      className="accent-[#71E300] w-4 h-4"
                    />
                  </div>
                </div>
              </div>

              {/* Corporate Footer Section (No Dead Ends) */}
              <div className="bg-zinc-100/50 border border-black/[0.02] rounded-3xl p-5 text-center space-y-4">
                <div className="text-xs font-extrabold text-zinc-500 tracking-wider uppercase">
                  diaspedia Corporation
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-zinc-600">
                  <Link href="/careers" className="hover:text-black hover:underline">Careers</Link>
                  <Link href="/privacy" className="hover:text-black hover:underline">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-black hover:underline">Terms of Service</Link>
                  <Link href="/cookies" className="hover:text-black hover:underline">Cookie Policy</Link>
                </div>
                <p className="text-[10px] text-zinc-400 font-bold">
                  diaspedia &copy; {new Date().getFullYear()}. All passenger space reservations and joint-billing schedules represent actual merchant group tickets.
                </p>
              </div>
            </motion.div>
          )}

        </main>

        {/* DETAILS DRAWER / BOOKING OVERLAY (Layered z-50 over navigation) */}
        <AnimatePresence>
          {selectedTrip && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black z-50"
                onClick={() => {
                  if (!simulatedLoading) {
                    setSelectedTrip(null);
                    setIsBooking(false);
                  }
                }}
              />

              {/* Drawer Container (Z-50 Layered Sheet) */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-12px_32px_rgba(15,17,21,0.15)] z-50 max-h-[92%] overflow-y-auto p-6 space-y-5 flex flex-col pb-safe-bottom"
              >

                {/* Drag / Pull handle */}
                <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto shrink-0" />

                {/* Header info */}
                <div className="flex justify-between items-start gap-4 shrink-0">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-zinc-100 border border-black/5 text-zinc-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Trip Details
                    </span>
                    <h3 className="text-2xl font-black font-heading text-black pt-1">
                      {selectedTrip.from} ➔ {selectedTrip.to}
                    </h3>
                    <p className="text-xs text-zinc-500 font-bold">
                      {selectedTrip.date} &bull; {selectedTrip.departureTime} - {selectedTrip.arrivalTime}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTrip(null);
                      setIsBooking(false);
                    }}
                    className="p-1 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all text-zinc-500"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* TRIP OVERVIEW / ATTENDEE BOOKING TOGGLE */}
                {!isBooking ? (
                  <div className="space-y-5 flex-1 pb-4">

                    {/* Carrier & Price highlight */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#F6F4ED] rounded-2xl p-4 border border-black/[0.02]">
                        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block">CARRIER</span>
                        <div className="text-sm font-bold text-black mt-0.5">{selectedTrip.carrier} ({selectedTrip.trainType})</div>
                      </div>
                      <div className="bg-[#F6F4ED] rounded-2xl p-4 border border-black/[0.02]">
                        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block">TICKET PRICE</span>
                        <div className="text-sm font-bold text-black mt-0.5">€{selectedTrip.price.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* SIMPLIFIED FRIENDS GOING (Item 7) */}
                    {selectedTrip.peopleGoingList.some(p => p.isFriend) && (
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase">
                          Friends Going
                        </h4>
                        <div className="flex flex-col gap-2">
                          {selectedTrip.peopleGoingList.filter(p => p.isFriend).map((friend) => (
                            <div key={friend.username} className="bg-[#F6F4ED]/50 border border-black/[0.02] rounded-xl p-2.5 flex items-center gap-2.5">
                              <div className={`w-6 h-6 rounded-full ${friend.avatarBg} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                                {friend.username[0].toUpperCase()}
                              </div>
                              <span className="text-xs font-bold text-zinc-800">{friend.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Other travelers going block */}
                    <div className="space-y-2.5 pt-1">
                      <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase">
                        Other Travelers ({selectedTrip.peopleGoingCount - selectedTrip.peopleGoingList.filter(p => p.isFriend).length} peers)
                      </h4>
                      <div className="flex -space-x-2.5 items-center pl-1.5 py-1.5">
                        {selectedTrip.peopleGoingList.filter(p => !p.isFriend).map((person, idx) => (
                          <div
                            key={idx}
                            className={`w-7 h-7 rounded-full border-2 border-white ${person.avatarBg} flex items-center justify-center text-[10px] font-black text-white`}
                          >
                            {person.username[0].toUpperCase()}
                          </div>
                        ))}
                        <span className="text-xs font-bold text-zinc-500 pl-4">
                          +{selectedTrip.peopleGoingCount - selectedTrip.peopleGoingList.filter(p => p.isFriend).length} travelers on route
                        </span>
                      </div>
                    </div>

                    {/* Primary Join Action */}
                    <div className="pt-2">
                      {isUserJoined(selectedTrip.id) ? (
                        <div className="w-full bg-[#71E300]/10 border border-[#71E300]/30 text-zinc-800 text-xs font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
                          <CheckCircle2 size={16} className="text-[#5ec700]" />
                          <span>You have already joined this trip</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartBooking(selectedTrip)}
                          className="w-full bg-[#71E300] hover:bg-[#5ec700] active:scale-95 text-black font-bold text-sm py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Join Trip & Book Ticket</span>
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>

                  </div>
                ) : (
                  // HIGH FIDELITY BOOKING FORM STEP
                  <form onSubmit={handleConfirmBooking} className="space-y-5 flex-1 pb-4">
                    <div className="space-y-4">

                      {/* Ticket Pricing breakdown */}
                      <div className="bg-zinc-50 border border-black/[0.04] rounded-2xl p-4 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-zinc-700">Passenger ticket:</span>
                          <span className="font-bold text-black">€{selectedTrip.price.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-black/5 pt-2 flex justify-between items-center text-xs">
                          <span className="font-bold text-black">Total to pay:</span>
                          <span className="font-black text-black">€{selectedTrip.price.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
                          Passenger Name
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                        />
                      </div>

                      {/* Luggage Select */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
                          Allowed Baggage Option
                        </label>
                        <select
                          value={bookingLuggage}
                          onChange={(e) => setBookingLuggage(e.target.value)}
                          className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                        >
                          <option>Standard Backpack + Carry-on</option>
                          <option>Standard Backpack + Checked Luggage (+€10)</option>
                          <option>Backpack Only</option>
                        </select>
                      </div>

                    </div>

                    {/* Submit / Simulation Section */}
                    <div className="pt-2">
                      {bookingSuccess ? (
                        <div className="space-y-2 text-center py-4">
                          <CheckCircle2 size={32} className="mx-auto text-[#5ec700]" />
                          <h4 className="text-xs font-bold text-zinc-800">Booking confirmed successfully!</h4>
                          <p className="text-[11px] text-zinc-400">Loading your travel pass...</p>
                        </div>
                      ) : (
                        <button
                          type="submit"
                          disabled={simulatedLoading}
                          className="w-full bg-black hover:bg-zinc-900 disabled:bg-zinc-100 active:scale-95 text-white font-bold text-sm py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {simulatedLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>Pay & Book Passenger Ticket</span>
                              <Check size={16} />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                  </form>
                )}

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/*
          1. PERSISTENT PINNED TAB BAR NAVIGATION
          - Always remains fixed at the absolute bottom of the shell.
          - Never scrolls away.
          - Styled as a premium floating dark capsule with high rounded corners (Uber reference).
        */}
        <nav className="absolute bottom-5 left-4 right-4 bg-[#0f1115]/95 backdrop-blur-md rounded-full px-2.5 py-2 flex justify-between items-center z-40 shadow-[0_12px_36px_rgba(0,0,0,0.22)] border border-white/10 shrink-0">
          <button
            onClick={() => { setActiveTab("home"); setSelectedTrip(null); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "home"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Compass size={18} className={activeTab === "home" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "home" && <span className="text-xs tracking-tight">Home</span>}
          </button>

          <button
            onClick={() => { setActiveTab("trips"); setSelectedTrip(null); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "trips"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Calendar size={18} className={activeTab === "trips" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "trips" && <span className="text-xs tracking-tight">Trips</span>}
          </button>

          <button
            onClick={() => { setActiveTab("friends"); setSelectedTrip(null); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "friends"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Activity size={18} className={activeTab === "friends" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "friends" && <span className="text-xs tracking-tight">Friends</span>}
          </button>

          <button
            onClick={() => { setActiveTab("messages"); setSelectedTrip(null); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "messages"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <MessageSquare size={18} className={activeTab === "messages" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "messages" && <span className="text-xs tracking-tight">Messages</span>}
          </button>

          <button
            onClick={() => { setActiveTab("profile"); setSelectedTrip(null); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "profile"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <User size={18} className={activeTab === "profile" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "profile" && <span className="text-xs tracking-tight">Profile</span>}
          </button>
        </nav>

      </div>
    </div>
  );
}
