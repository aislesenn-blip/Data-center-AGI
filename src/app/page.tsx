"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
  Sparkles,
  Compass,
  Briefcase,
  ExternalLink
} from "lucide-react";

import {
  MOCK_USER,
  TRAVELERS,
  MOCK_TRIPS,
  MOCK_ACTIVITIES,
  INITIAL_TICKETS,
  Trip,
  Traveler,
  FriendActivity,
  Ticket as TicketType,
  UserProfile
} from "@/lib/diaspediaData";

export default function Home() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"home" | "trips" | "friends" | "tickets" | "profile">("home");

  // Onboarding Splash
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // App States (connected to localStorage for hydration)
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [activities, setActivities] = useState<FriendActivity[]>(MOCK_ACTIVITIES);
  const [tickets, setTickets] = useState<TicketType[]>(INITIAL_TICKETS);

  // Selected trip for drawer/modal
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  // Booking Form State
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [bookingName, setBookingName] = useState<string>("John Carter");
  const [bookingLuggage, setBookingLuggage] = useState<string>("Standard Backpack + Carry-on");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [simulatedLoading, setSimulatedLoading] = useState<boolean>(false);

  // Search Filter
  const [searchFrom, setSearchFrom] = useState<string>("");
  const [searchTo, setSearchTo] = useState<string>("");

  // Notifications drawer simulation
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; time: string; read: boolean }>>([
    { id: "n1", text: "Maria Schmidt booked Berlin ➔ Hamburg for Friday!", time: "2h ago", read: false },
    { id: "n2", text: "Alex Dubois joined Saturday's Berlin ➔ Munich trip.", time: "4h ago", read: false },
    { id: "n3", text: "3 friends are traveling this weekend. Join them to save!", time: "1d ago", read: true }
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onboarded = localStorage.getItem("diaspedia_travel_onboarded_v2");
      if (onboarded === "true") {
        setShowSplash(false);
      }
    }
  }, []);

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
        platform: `Platform ${Math.floor(1 + Math.random() * 16)}`,
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

      // Update profile stats
      setUserProfile(prev => ({
        ...prev,
        tripCount: prev.tripCount + 1,
        upcomingTrips: [selectedTrip.to, ...prev.upcomingTrips]
      }));

      // Set notifications
      setNotifications([
        { id: `n-${Date.now()}`, text: `You joined the trip to ${selectedTrip.to}! Ticket secured.`, time: "Just now", read: false },
        ...notifications
      ]);

      // Clean up form step
      setTimeout(() => {
        setIsBooking(false);
        setSelectedTrip(null);
        setActiveTab("tickets"); // Switch to tickets tab to see success
      }, 1500);

    }, 1200);
  };

  // Filtered Trips based on search
  const filteredTrips = trips.filter(trip => {
    const matchFrom = trip.from.toLowerCase().includes(searchFrom.toLowerCase());
    const matchTo = trip.to.toLowerCase().includes(searchTo.toLowerCase());
    return matchFrom && matchTo;
  });

  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#F6F4ED] text-[#0f1115] font-sans antialiased flex justify-center">

      {/*
        SOPHISTICATED MOBILE SHELL CONSTRAINER
        - Emulates an edge-to-edge premium mobile device (such as iPhone 15 Pro Max / Google Pixel)
        - Constrains desktop layouts elegantly to remain completely mobile-first as requested.
      */}
      <div className="w-full max-w-md bg-[#F6F4ED] min-h-screen relative flex flex-col shadow-[0_0_50px_rgba(15,17,21,0.06)] overflow-hidden border-x border-black/[0.03]">

        {/* SPLASH / ONBOARDING SCREEN */}
        <AnimatePresence>
          {showSplash && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-[#F6F4ED] z-50 flex flex-col justify-between p-6"
            >
              <div className="flex flex-col items-center pt-24 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-black flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-3xl font-heading tracking-tighter">d</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl font-black font-heading tracking-tight">diaspedia</h1>
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Together, we make cross-border cheaper.</p>
                </div>

                <div className="max-w-xs px-2 text-sm text-[#0f1115]/75 leading-relaxed font-medium">
                  The travel app for people who actually travel. Find friends going to the same places, join trips, and book group tickets to split the cost.
                </div>
              </div>

              {/* Onboarding Features Summary */}
              <div className="space-y-4 max-w-sm mx-auto w-full">
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-black/[0.04] shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#71E300]/20 flex items-center justify-center text-black shrink-0">
                      <Users size={16} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-black">See Who is Going</h4>
                      <p className="text-[11px] text-zinc-500 font-medium">Instantly discover friends & peers headed to the same city.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#71E300]/20 flex items-center justify-center text-black shrink-0">
                      <Ticket size={16} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-black">Split the Cost Directly</h4>
                      <p className="text-[11px] text-zinc-500 font-medium">Book tickets directly through diaspedia and save up to 70% together.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDismissSplash}
                  className="w-full bg-black hover:bg-zinc-900 active:scale-95 text-white font-bold text-sm py-4 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight size={16} className="text-[#71E300]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PERSISTENT TRANSLUCENT HEADER BAR */}
        <header className="sticky top-0 left-0 right-0 bg-[#F6F4ED]/85 backdrop-blur-md border-b border-black/[0.04] py-4 px-5 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
              <span className="text-white font-black text-base font-heading">d</span>
            </div>
            <span className="font-heading font-black text-xl tracking-tight text-[#0f1115]">diaspedia</span>
          </div>

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

        {/* NOTIFICATIONS DRAWER OVERLAY */}
        <AnimatePresence>
          {showNotifications && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black z-40"
                onClick={() => setShowNotifications(false)}
              />
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="absolute top-16 left-0 right-0 bg-white border-b border-black/10 shadow-lg z-40 max-h-[80%] overflow-y-auto rounded-b-3xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black font-heading tracking-tight">Travel Alerts</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
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

        {/* MAIN SCROLLABLE CONTENT BODY */}
        <main className="flex-1 overflow-y-auto px-5 pt-4 pb-32 space-y-6 scroll-smooth">

          {/* 1. HOME / DISCOVER TAB */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Premium Heading */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold tracking-wider text-zinc-500 uppercase">TOGETHER, WE SAVE</span>
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115] leading-tight">Where are we going?</h2>
              </div>

              {/* Minimal Search Bar (Venmo/Flixbus styled inputs) */}
              <div className="bg-white p-4 rounded-2xl border border-black/[0.04] shadow-sm space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="From city"
                      value={searchFrom}
                      onChange={(e) => setSearchFrom(e.target.value)}
                      className="w-full bg-[#F6F4ED]/50 border border-black/5 rounded-xl py-2.5 pl-9 pr-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300] placeholder:text-zinc-400"
                    />
                  </div>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71E300]" />
                    <input
                      type="text"
                      placeholder="To city"
                      value={searchTo}
                      onChange={(e) => setSearchTo(e.target.value)}
                      className="w-full bg-[#F6F4ED]/50 border border-black/5 rounded-xl py-2.5 pl-9 pr-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300] placeholder:text-zinc-400"
                    />
                  </div>
                </div>
                {(searchFrom || searchTo) && (
                  <button
                    onClick={() => { setSearchFrom(""); setSearchTo(""); }}
                    className="text-xs text-zinc-400 hover:text-black font-bold flex items-center gap-1 mx-auto"
                  >
                    Clear filters <X size={12} />
                  </button>
                )}
              </div>

              {/* Active Group Booking Routes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-black tracking-wider text-zinc-500 uppercase">Active Group Trips</h3>
                  <span className="text-[11px] font-bold text-[#71E300] bg-black px-2 py-0.5 rounded-full uppercase tracking-wider">Save up to 70%</span>
                </div>

                <div className="space-y-4">
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
                                <span className="font-heading font-black text-xl text-black">{trip.from}</span>
                                <span className="text-zinc-400 font-bold">➔</span>
                                <span className="font-heading font-black text-xl text-black">{trip.to}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-zinc-400 font-bold">
                                <span>{trip.date}</span>
                                <span>&bull;</span>
                                <span>{trip.departureTime}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-black text-black">€{trip.price.toFixed(2)}</div>
                              <span className="text-[10px] bg-[#71E300]/20 text-[#5ec700] px-2 py-0.5 rounded-md font-black shrink-0">
                                Save €{trip.savingsAmount.toFixed(0)}
                              </span>
                            </div>
                          </div>

                          {/* Social Layer: Who is going? */}
                          <div className="bg-[#F6F4ED]/60 rounded-2xl p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {/* Overlay Avatars */}
                              <div className="flex -space-x-2.5">
                                {trip.peopleGoingList.slice(0, 3).map((person, idx) => (
                                  <div
                                    key={idx}
                                    className={`w-7 h-7 rounded-full border-2 border-white ${person.avatarBg} flex items-center justify-center text-[10px] font-black text-white`}
                                  >
                                    {person.username[0].toUpperCase()}
                                  </div>
                                ))}
                              </div>
                              <span className="text-xs text-zinc-700 font-bold">
                                {trip.peopleGoingCount} travelers going
                              </span>
                            </div>

                            {/* Friend status check */}
                            {trip.peopleGoingList.some(p => p.isFriend) && (
                              <div className="flex items-center gap-1 bg-[#71E300]/20 px-2 py-0.5 rounded-full border border-[#71E300]/30">
                                <Sparkles size={10} className="text-[#5ec700]" />
                                <span className="text-[10px] font-black text-zinc-800">Friends going</span>
                              </div>
                            )}
                          </div>

                          {/* Bottom Action Indicator */}
                          <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-black/[0.02]">
                            <span className="text-zinc-400 flex items-center gap-1">
                              <Globe size={12} className="text-[#71E300]" />
                              <span>Co-travel via {trip.carrier}</span>
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
                      <h4 className="text-xs font-bold text-zinc-800">No active trips found</h4>
                      <p className="text-xs text-zinc-400">Try typing a different destination city like "Munich" or "Hamburg".</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Informative Value Proposition */}
              <div className="bg-black text-white rounded-3xl p-5 space-y-3 shadow-lg relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10">
                  <Ticket size={120} className="text-white" />
                </div>
                <h3 className="text-sm font-black font-heading text-white">How diaspedia splits costs:</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We consolidate bookings on regular bus and train lines. When we reach group size, the operator grants us bulk discounts. You lock in a cheap ticket, see who is joining, and coordinate travel details easily.
                </p>
                <div className="text-[11px] font-extrabold text-[#71E300] flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  <span>Real travel utility with zero social noise.</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. TRIPS TAB */}
          {activeTab === "trips" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <span className="text-xs font-extrabold tracking-wider text-zinc-500 uppercase font-bold">My Schedules</span>
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">My Trips</h2>
              </div>

              {/* Upcoming Joined Trips */}
              <div className="space-y-3">
                <h3 className="text-xs font-black tracking-wider text-zinc-500 uppercase px-1">Upcoming Travel</h3>
                {tickets.length > 0 ? (
                  tickets.map((t) => {
                    const matchedTrip = trips.find(tr => tr.id === t.tripId);
                    return (
                      <div key={t.id} className="bg-white border border-black/[0.04] rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-zinc-900 text-[#71E300] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Booked Space
                          </span>
                          <span className="text-xs font-bold text-zinc-400">{t.seat}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-black text-xl text-black">{t.from.split(" ")[0]}</span>
                            <span className="text-zinc-400 font-bold">➔</span>
                            <span className="font-heading font-black text-xl text-black">{t.to.split(" ")[0]}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold">
                            <span>{t.date}</span>
                            <span>&bull;</span>
                            <span>{t.time}</span>
                          </div>
                        </div>

                        {matchedTrip && (
                          <div className="bg-[#F6F4ED]/60 rounded-2xl p-3 flex items-center gap-2">
                            <Users size={14} className="text-zinc-400" />
                            <span className="text-xs text-zinc-700 font-semibold">
                              You are traveling with {matchedTrip.peopleGoingCount - 1} other people.
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs pt-1 border-t border-black/[0.02]">
                          <span className="text-zinc-400 font-bold">Carrier: {t.carrier}</span>
                          <button
                            onClick={() => setActiveTab("tickets")}
                            className="text-black font-black flex items-center gap-1 hover:underline"
                          >
                            <span>Open Ticket</span>
                            <ChevronRight size={14} className="text-[#71E300]" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-3xl border border-black/5 p-8 text-center space-y-3">
                    <Calendar size={24} className="mx-auto text-zinc-400 animate-pulse" />
                    <h4 className="text-xs font-bold text-zinc-800">No upcoming trips joined</h4>
                    <p className="text-xs text-zinc-400">Discover active trips on the Home feed and secure your ticket today.</p>
                  </div>
                )}
              </div>

              {/* Past Travel History */}
              <div className="space-y-3">
                <h3 className="text-xs font-black tracking-wider text-zinc-500 uppercase px-1">Past History</h3>
                <div className="space-y-2">
                  {userProfile.pastTrips.map((city, idx) => (
                    <div
                      key={idx}
                      className="bg-white/55 border border-black/[0.03] rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                          <Check size={14} className="text-[#5ec700]" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-black">Berlin ➔ {city}</div>
                          <div className="text-[10px] text-zinc-400 font-bold">Travel completed</div>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-zinc-500">Completed</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. FRIENDS / ACTIVITY TAB */}
          {activeTab === "friends" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <span className="text-xs font-extrabold tracking-wider text-zinc-500 uppercase">VENMO-STYLE DISCOVERY</span>
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Friend Activity</h2>
              </div>

              {/* Real-time Activity Feed */}
              <div className="space-y-3">
                <h3 className="text-xs font-black tracking-wider text-zinc-500 uppercase px-1">Friend trips this week</h3>
                <div className="space-y-4">
                  {activities.map((act) => {
                    const matchedTrip = trips.find(t => t.id === act.tripId);
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
                        </div>

                        {/* Travel Card Preview */}
                        <div className="bg-[#F6F4ED]/50 border border-black/[0.02] rounded-2xl p-4 flex justify-between items-center">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-black">{act.from}</span>
                              <span className="text-zinc-400 text-xs">➔</span>
                              <span className="font-bold text-xs text-black">{act.to}</span>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-bold block">
                              {matchedTrip?.date || "This weekend"} &bull; {matchedTrip?.departureTime || "08:15"}
                            </span>
                          </div>

                          {matchedTrip && (
                            <button
                              onClick={() => {
                                setSelectedTrip(matchedTrip);
                              }}
                              className="bg-black hover:bg-zinc-900 active:scale-95 text-white text-[10px] font-black px-3.5 py-2 rounded-xl transition-all"
                            >
                              Join Trip
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Value Indicator */}
              <div className="bg-[#71E300]/10 border border-[#71E300]/30 rounded-3xl p-5 flex gap-3.5 items-start shadow-sm">
                <Info size={20} className="text-black shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-black">Zero clutter, pure utility</h4>
                  <p className="text-xs text-zinc-700 leading-relaxed font-semibold">
                    No likes, comments, or endless feeds. Just real-world travel schedules. If your friend Schmidt travels, you know when, where, and can secure your space immediately.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. TICKETS TAB */}
          {activeTab === "tickets" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <span className="text-xs font-extrabold tracking-wider text-zinc-500 uppercase">MY BOARDING PASSES</span>
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">My Tickets</h2>
              </div>

              <div className="space-y-5">
                {tickets.length > 0 ? (
                  tickets.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white border border-black/10 rounded-3xl shadow-md overflow-hidden relative"
                    >
                      {/* Ticket Carrier top styling */}
                      <div className="bg-black text-white px-5 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-[#71E300] rounded-md flex items-center justify-center text-black font-bold text-xs shrink-0">
                            d
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-[#71E300]">
                            {t.carrier} PASS
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-zinc-400">{t.id}</span>
                      </div>

                      {/* Ticket main detail block */}
                      <div className="p-5 space-y-4 relative">
                        {/* From / To Stations */}
                        <div className="flex justify-between items-center gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">DEPARTURE</span>
                            <div className="text-lg font-black text-black leading-tight">{t.from}</div>
                          </div>
                          <div className="text-zinc-300">➔</div>
                          <div className="space-y-0.5 text-right">
                            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">ARRIVAL</span>
                            <div className="text-lg font-black text-black leading-tight">{t.to}</div>
                          </div>
                        </div>

                        {/* Mid-ticket Divider dotted */}
                        <div className="border-t border-dashed border-zinc-200 my-4 relative">
                          <div className="absolute -left-7 -top-2 w-4 h-4 bg-[#F6F4ED] rounded-full" />
                          <div className="absolute -right-7 -top-2 w-4 h-4 bg-[#F6F4ED] rounded-full" />
                        </div>

                        {/* Seat details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">PASSENGER</span>
                            <div className="text-xs font-bold text-black">{t.passengerName}</div>
                          </div>
                          <div className="space-y-0.5 text-right">
                            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">SEAT / CAR</span>
                            <div className="text-xs font-bold text-black">{t.seat}</div>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">DATE & TIME</span>
                            <div className="text-xs font-bold text-black">{t.date} &bull; {t.time}</div>
                          </div>
                          <div className="space-y-0.5 text-right">
                            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">PLATFORM</span>
                            <div className="text-xs font-bold text-black">{t.platform}</div>
                          </div>
                        </div>

                        {/* QR Code Segment */}
                        <div className="bg-zinc-50 border border-black/[0.03] rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 mt-4">
                          {/* High fidelity mock QR code */}
                          <div className="w-32 h-32 bg-white border border-black/5 p-2 rounded-xl flex flex-wrap gap-1 items-center justify-center shadow-inner relative">
                            {/* Visual representation of QR code blocks */}
                            <div className="absolute inset-2 flex flex-col justify-between">
                              <div className="flex justify-between">
                                <div className="w-5 h-5 bg-black" />
                                <div className="w-5 h-5 bg-black" />
                              </div>
                              <div className="flex justify-between">
                                <div className="w-5 h-5 bg-black" />
                                <div className="w-2 h-2 bg-black self-end" />
                              </div>
                            </div>
                            {/* Inner lines pattern */}
                            <div className="w-full h-full opacity-40 flex flex-col justify-center items-center gap-1.5 pt-4">
                              <div className="w-16 h-1 bg-black rounded" />
                              <div className="w-20 h-1 bg-black rounded" />
                              <div className="w-12 h-1 bg-black rounded" />
                              <div className="w-16 h-1 bg-black rounded" />
                            </div>
                          </div>
                          <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                            Scan on Deutsche Bahn / Flixbus reader
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-3xl border border-black/5 p-8 text-center space-y-3">
                    <Ticket size={24} className="mx-auto text-zinc-400 animate-bounce" />
                    <h4 className="text-xs font-bold text-zinc-800">No active travel passes</h4>
                    <p className="text-xs text-zinc-400">Your booked tickets will appear here with dynamic QR codes for immediate boarding.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 5. PROFILE TAB */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Profile Card Summary */}
              <div className="bg-white border border-black/[0.04] rounded-3xl p-6 shadow-sm text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center border-4 border-[#71E300]">
                    <span className="text-white text-3xl font-black font-heading">J</span>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-[#71E300] text-black w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <Sparkles size={11} />
                  </div>
                </div>

                <div className="space-y-1">
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

              {/* Travel Identity Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-black tracking-wider text-zinc-500 uppercase px-1">Upcoming routes</h3>
                <div className="space-y-2">
                  {userProfile.upcomingTrips.map((city, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-black/[0.03] rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#71E300]/10 flex items-center justify-center text-[#71E300]">
                          <Calendar size={14} className="text-black" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-black">Berlin ➔ {city}</div>
                          <div className="text-[10px] text-zinc-400 font-bold">Upcoming schedule</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-zinc-800 bg-[#71E300]/20 px-2 py-0.5 rounded">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Developer / Company Footer Section (No Dead Ends) */}
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

        {/* DETAILS DRAWER / BOOKING OVERLAY */}
        <AnimatePresence>
          {selectedTrip && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black z-40"
                onClick={() => {
                  if (!simulatedLoading) {
                    setSelectedTrip(null);
                    setIsBooking(false);
                  }
                }}
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-12px_32px_rgba(15,17,21,0.15)] z-40 max-h-[92%] overflow-y-auto p-6 space-y-5 flex flex-col pb-safe-bottom"
              >

                {/* Drag / Pull handle */}
                <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto shrink-0" />

                {/* Header info */}
                <div className="flex justify-between items-start gap-4 shrink-0">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-black text-[#71E300] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
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
                  <div className="space-y-5 flex-1">

                    {/* Carrier & Price highlight */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#F6F4ED] rounded-2xl p-4 border border-black/[0.02]">
                        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block">CARRIER</span>
                        <div className="text-sm font-bold text-black mt-0.5">{selectedTrip.carrier}</div>
                      </div>
                      <div className="bg-[#F6F4ED] rounded-2xl p-4 border border-black/[0.02]">
                        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block">TICKET PRICE</span>
                        <div className="text-sm font-bold text-black mt-0.5">€{selectedTrip.price.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Who is going list detailed */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black tracking-wider text-zinc-500 uppercase">
                        Who is going ({selectedTrip.peopleGoingCount} travelers)
                      </h4>

                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {selectedTrip.peopleGoingList.map((person, idx) => (
                          <div
                            key={idx}
                            className="bg-zinc-50 border border-black/[0.01] rounded-2xl p-3 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${person.avatarBg} flex items-center justify-center font-black text-white text-xs`}>
                                {person.username[0].toUpperCase()}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-black">@{person.username}</div>
                                <div className="text-[10px] text-zinc-400 font-bold">{person.role || "diaspedia traveler"}</div>
                              </div>
                            </div>

                            {person.isFriend ? (
                              <span className="text-[10px] bg-black text-[#71E300] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Friend
                              </span>
                            ) : (
                              <span className="text-[10px] text-zinc-400 font-bold">Peer</span>
                            )}
                          </div>
                        ))}
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
                          className="w-full bg-black hover:bg-zinc-900 active:scale-95 text-white font-bold text-sm py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <span>Join Trip & Book Ticket</span>
                          <ArrowRight size={16} className="text-[#71E300]" />
                        </button>
                      )}
                    </div>

                  </div>
                ) : (
                  // HIGH FIDELITY BOOKING FORM STEP
                  <form onSubmit={handleConfirmBooking} className="space-y-5 flex-1">
                    <div className="space-y-4">

                      {/* Ticket Pricing breakdown */}
                      <div className="bg-[#71E300]/10 border border-[#71E300]/20 rounded-2xl p-4 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-zinc-700">Group Ticket base:</span>
                          <span className="font-bold text-black">€{selectedTrip.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-zinc-700">Standard Solo pricing:</span>
                          <span className="font-bold text-zinc-400 line-through">€{(selectedTrip.price + selectedTrip.savingsAmount).toFixed(2)}</span>
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
                          className="w-full bg-[#71E300] hover:bg-[#5ec700] disabled:bg-zinc-100 active:scale-95 text-black font-bold text-sm py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {simulatedLoading ? (
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
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
          1. PERSISTENT PINNED TAB BAR NAVIGATION (STAYS FIXED ON THE SCREEN AT ALL TIMES)
          - Guaranteed persistent. Anchored relative to the screen shell, never scrollable!
          - Uses backdrop blurring with subtle dropshadow styling for an elite mobile feel.
          - Uses exact simple human terminology: Home, Trips, Friends, Tickets, Profile.
          - Incorporates dynamic pb-safe-bottom for notches.
        */}
        <nav className="absolute bottom-0 left-0 right-0 bg-[#F6F4ED]/95 backdrop-blur-md border-t border-black/[0.04] pt-4.5 pb-8 px-4 flex justify-around shrink-0 z-40 shadow-[0_-8px_24px_rgba(15,17,21,0.03)] pb-safe-bottom">
          <button
            onClick={() => { setActiveTab("home"); setSelectedTrip(null); }}
            className={`flex flex-col items-center gap-1.5 p-1 transition-all cursor-pointer ${activeTab === "home" ? "text-black scale-105 font-bold" : "text-zinc-400 hover:text-black"}`}
          >
            <Compass size={20} className={activeTab === "home" ? "text-black" : "text-zinc-400"} />
            <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
          </button>
          <button
            onClick={() => { setActiveTab("trips"); setSelectedTrip(null); }}
            className={`flex flex-col items-center gap-1.5 p-1 transition-all cursor-pointer ${activeTab === "trips" ? "text-black scale-105 font-bold" : "text-zinc-400 hover:text-black"}`}
          >
            <Calendar size={20} className={activeTab === "trips" ? "text-black" : "text-zinc-400"} />
            <span className="text-[10px] font-black uppercase tracking-wider">Trips</span>
          </button>
          <button
            onClick={() => { setActiveTab("friends"); setSelectedTrip(null); }}
            className={`flex flex-col items-center gap-1.5 p-1 transition-all cursor-pointer ${activeTab === "friends" ? "text-black scale-105 font-bold" : "text-zinc-400 hover:text-black"}`}
          >
            <Activity size={20} className={activeTab === "friends" ? "text-black" : "text-zinc-400"} />
            <span className="text-[10px] font-black uppercase tracking-wider">Friends</span>
          </button>
          <button
            onClick={() => { setActiveTab("tickets"); setSelectedTrip(null); }}
            className={`flex flex-col items-center gap-1.5 p-1 transition-all cursor-pointer ${activeTab === "tickets" ? "text-black scale-105 font-bold" : "text-zinc-400 hover:text-black"}`}
          >
            <Ticket size={20} className={activeTab === "tickets" ? "text-black" : "text-zinc-400"} />
            <span className="text-[10px] font-black uppercase tracking-wider">Tickets</span>
          </button>
          <button
            onClick={() => { setActiveTab("profile"); setSelectedTrip(null); }}
            className={`flex flex-col items-center gap-1.5 p-1 transition-all cursor-pointer ${activeTab === "profile" ? "text-black scale-105 font-bold" : "text-zinc-400 hover:text-black"}`}
          >
            <User size={20} className={activeTab === "profile" ? "text-black" : "text-zinc-400"} />
            <span className="text-[10px] font-black uppercase tracking-wider">Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
}
