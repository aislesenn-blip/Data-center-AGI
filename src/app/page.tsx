"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Calendar,
  Users,
  MessageSquare,
  User,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Info,
  X,
  Bell,
  Check,
  Plus,
  Bookmark,
  TrendingUp,
  Share2,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  Send,
  MapPin,
  Lock,
  Unlock,
  Shield,
  Briefcase
} from "lucide-react";

import {
  MOCK_USER,
  MOCK_FRIENDS,
  MOCK_DESTINATIONS,
  MOCK_SAVED_TRIPS,
  MOCK_FRIENDS_TRIPS,
  MOCK_CHAT_MESSAGES,
  MOCK_NOTIFICATIONS,
  UserProfile,
  Friend,
  Destination,
  SavedTrip,
  ChatMessage,
  TravelNotification,
  TripLeg
} from "@/lib/diaspediaData";

import {
  POPULAR_STATIONS,
  autocompleteStations,
  getRailConnections,
  Station
} from "@/lib/transport";

export default function Home() {
  // Navigation: "home" | "trips" | "discover" | "messages" | "profile"
  const [activeTab, setActiveTab] = useState<"home" | "trips" | "discover" | "messages" | "profile">("home");

  // Onboarding
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // App States
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(MOCK_SAVED_TRIPS);
  const [friendsTrips, setFriendsTrips] = useState<SavedTrip[]>(MOCK_FRIENDS_TRIPS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [notifications, setNotifications] = useState<TravelNotification[]>(MOCK_NOTIFICATIONS);
  const [destinations, setDestinations] = useState<Destination[]>(MOCK_DESTINATIONS);
  const [friendsList, setFriendsList] = useState<Friend[]>(MOCK_FRIENDS);

  // Search State
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState<Station[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Station[]>([]);
  const [searchMode, setSearchMode] = useState<"fastest" | "cheapest" | "regional">("fastest");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<TripLeg[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Active Chat / Drawer
  const [activeChatGroupId, setActiveChatGroupId] = useState<string | null>(null);
  const [chatInputText, setChatInputText] = useState("");
  const [selectedTripDetails, setSelectedTripDetails] = useState<SavedTrip | null>(null);

  // UI States
  const [showNotifications, setShowNotifications] = useState(false);
  const [wishlistSuccessMessage, setWishlistSuccessMessage] = useState<string | null>(null);
  const [saveSuccessTripId, setSaveSuccessTripId] = useState<string | null>(null);

  // Add Friend Input State
  const [newFriendUsername, setNewFriendUsername] = useState("");
  const [addFriendSuccess, setAddFriendSuccess] = useState<string | null>(null);

  // Seat Buddy Search state for current trip
  const [seatBuddyState, setSeatBuddyState] = useState<{ [key: string]: boolean }>({});

  // Chat window bottom anchor ref
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onboarded = localStorage.getItem("diaspedia_onboarded_v1");
      if (onboarded === "true") {
        setShowSplash(false);
      }
    }
  }, []);

  useEffect(() => {
    if (activeChatGroupId && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChatGroupId, chatMessages]);

  const handleDismissSplash = () => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("diaspedia_onboarded_v1", "true");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Autocomplete updates
  const handleFromChange = (val: string) => {
    setFromQuery(val);
    setFromSuggestions(autocompleteStations(val));
  };

  const handleToChange = (val: string) => {
    setToQuery(val);
    setToSuggestions(autocompleteStations(val));
  };

  // Run Route Search
  const handleExecuteSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromQuery || !toQuery) return;

    setIsSearching(true);
    setHasSearched(false);
    setSearchResults([]);

    // Simulate elegant progressive loading
    setTimeout(async () => {
      const res = await getRailConnections(fromQuery, toQuery, searchMode);
      setSearchResults(res.legs);
      setIsSearching(false);
      setHasSearched(true);
    }, 1200);
  };

  // Save searched trip
  const handleSaveTrip = (legs: TripLeg[]) => {
    const tripId = `saved-trip-${savedTrips.length + 1}`;
    const newTrip: SavedTrip = {
      id: tripId,
      fromCity: fromQuery,
      toCity: toQuery,
      date: "Saturday, Nov 14",
      isShared: true,
      isCompleted: false,
      legs: legs,
      participants: [
        {
          username: userProfile.username,
          name: userProfile.name,
          avatarBg: "bg-zinc-950",
          isSeatBuddySearching: false
        }
      ],
      chatGroupId: `chat-${tripId}`
    };

    setSavedTrips([newTrip, ...savedTrips]);
    setSaveSuccessTripId(tripId);

    // Create a notification
    setNotifications([
      {
        id: `notif-save-${notifications.length + 1}`,
        text: `Trip saved successfully! You are traveling on ${legs[0].trainNumber} to ${toQuery}.`,
        time: "Just now",
        read: false,
        type: "platform"
      },
      ...notifications
    ]);

    setTimeout(() => {
      setSaveSuccessTripId(null);
      setActiveTab("trips");
      // Clear search inputs
      setFromQuery("");
      setToQuery("");
      setHasSearched(false);
      setSearchResults([]);
    }, 1500);
  };

  // Toggle Friend's Wishlist
  const handleToggleWishlist = (destId: string, destName: string) => {
    const updatedWishlist = [...userProfile.wishlist];
    const index = updatedWishlist.indexOf(destId);
    let isAdding = false;

    if (index > -1) {
      updatedWishlist.splice(index, 1);
    } else {
      updatedWishlist.push(destId);
      isAdding = true;
    }

    setUserProfile({
      ...userProfile,
      wishlist: updatedWishlist
    });

    if (isAdding) {
      setWishlistSuccessMessage(`Added ${destName} to your wishlist!`);
      setTimeout(() => setWishlistSuccessMessage(null), 2000);
    }
  };

  // Join Friend's Trip
  const handleJoinTrip = (trip: SavedTrip) => {
    // Check if already in the trip
    const alreadyParticipant = trip.participants.some(p => p.username === userProfile.username);
    if (alreadyParticipant) return;

    // Add current user to participants of friend's trip
    const updatedFriendsTrips = friendsTrips.map(ft => {
      if (ft.id === trip.id) {
        return {
          ...ft,
          participants: [
            ...ft.participants,
            {
              username: userProfile.username,
              name: userProfile.name,
              avatarBg: "bg-zinc-950",
              isSeatBuddySearching: false
            }
          ]
        };
      }
      return ft;
    });

    setFriendsTrips(updatedFriendsTrips);

    // Create user's copy of this trip inside savedTrips
    const joinedTripCopy: SavedTrip = {
      ...trip,
      participants: [
        ...trip.participants,
        {
          username: userProfile.username,
          name: userProfile.name,
          avatarBg: "bg-zinc-950",
          isSeatBuddySearching: false
        }
      ]
    };

    setSavedTrips([joinedTripCopy, ...savedTrips]);

    // Send a system-like chat message
    const joinMessage: ChatMessage = {
      id: `system-msg-${chatMessages.length + 1}`,
      chatGroupId: trip.chatGroupId,
      senderUsername: "system",
      senderName: "Diaspedia",
      senderAvatarBg: "bg-[#71E300]/25",
      text: `${userProfile.name} joined the trip! Let's coordinate travel.`,
      timestamp: "Just now"
    };

    setChatMessages([...chatMessages, joinMessage]);

    // Set notification
    setNotifications([
      {
        id: `notif-join-${notifications.length + 1}`,
        text: `You joined Sarah's trip from ${trip.fromCity} to ${trip.toCity}!`,
        time: "Just now",
        read: false,
        type: "join"
      },
      ...notifications
    ]);

    // Trigger visual route change to messaging
    setActiveChatGroupId(trip.chatGroupId);
    setActiveTab("messages");
  };

  // Send message in Chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim() || !activeChatGroupId) return;

    const userMsg: ChatMessage = {
      id: `user-msg-${chatMessages.length + 1}`,
      chatGroupId: activeChatGroupId,
      senderUsername: userProfile.username,
      senderName: userProfile.name,
      senderAvatarBg: "bg-zinc-950",
      text: chatInputText,
      timestamp: "Just now"
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInputText("");

    // Simulate smart dynamic companion reply
    setTimeout(() => {
      const companionReply: ChatMessage = {
        id: `reply-${chatMessages.length + 2}`,
        chatGroupId: activeChatGroupId,
        senderUsername: "sarah_k",
        senderName: "Sarah K.",
        senderAvatarBg: "bg-zinc-800",
        text: "Awesome! I'm sitting in Coach 7 as well, let's meet up near the center aisle.",
        timestamp: "Just now"
      };
      setChatMessages(prev => [...prev, companionReply]);
    }, 1500);
  };

  // Add friend
  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendUsername.trim()) return;

    const cleaned = newFriendUsername.toLowerCase().trim();
    const match = friendsList.some(f => f.username === cleaned);

    if (match) {
      setAddFriendSuccess("Already connected!");
    } else {
      const newF: Friend = {
        username: cleaned,
        name: newFriendUsername,
        avatarBg: "bg-zinc-400",
        currentCity: "Berlin, Germany",
        passportCountry: "EU Residency"
      };
      setFriendsList([...friendsList, newF]);
      setAddFriendSuccess(`Successfully added @${cleaned}!`);
    }

    setNewFriendUsername("");
    setTimeout(() => setAddFriendSuccess(null), 2500);
  };

  // Toggle Looking for Seat Buddy
  const toggleSeatBuddy = (tripId: string) => {
    setSeatBuddyState(prev => {
      const isCurrentlySearching = !prev[tripId];
      // Notify
      setNotifications(prevNotif => [
        {
          id: `notif-buddy-${notifications.length + 1}`,
          text: isCurrentlySearching
            ? "Looking for a Seat Buddy: Posted request to your trip group!"
            : "Seat Buddy search closed.",
          time: "Just now",
          read: false,
          type: "wishlist"
        },
        ...prevNotif
      ]);
      return {
        ...prev,
        [tripId]: isCurrentlySearching
      };
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F6F4ED] text-[#0f1115] font-sans antialiased flex justify-center overflow-hidden">
      {/*
        SOPHISTICATED EDGE-TO-EDGE PREMIUM MOBILE SIMULATOR CONSTRAINER
        Constraint prevents scrolling outside the simulator shell. Pinned navigation bar stays pinned.
      */}
      <div className="w-full max-w-md bg-[#F6F4ED] h-[100dvh] relative flex flex-col shadow-[0_0_50px_rgba(15,17,21,0.06)] overflow-hidden border-x border-black/[0.03]">

        {/* ONBOARDING SCREEN - FITS EXACTLY ONE SCREEN, ZERO SCROLLING */}
        <AnimatePresence>
          {showSplash && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-[#F6F4ED] z-[60] flex flex-col justify-between p-6 h-[100dvh] overflow-hidden"
            >
              {/* Branding Header */}
              <div className="flex flex-col items-center pt-8 text-center space-y-2">
                <span className="font-heading font-black text-4xl tracking-tighter text-[#0f1115] select-none">diaspedia</span>
                <p className="max-w-xs text-xs font-medium text-zinc-500 leading-normal pt-1">
                  The ultimate intelligent rail companion and social layer on top of European public transportation.
                </p>
              </div>

              {/* Core Statement Box */}
              <div className="bg-white p-6 rounded-3xl border border-black/[0.04] shadow-sm text-center max-w-sm mx-auto space-y-2">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Our network is simple</p>
                <blockquote className="text-sm font-extrabold tracking-tight text-black italic">
                  “Search European trains, monitor schedules, share routes with friends, and coordinate shared travel instantly.”
                </blockquote>
              </div>

              {/* Steps overview */}
              <div className="space-y-3 max-w-sm mx-auto w-full py-2">
                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Search size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">1. Intelligent Station Search</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Find standard routes or filter via regional-only passes easily.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Share2 size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">2. Social Destination Matching</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Match wishlists with friends and join upcoming trips instantly.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <MessageSquare size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">3. Trip Coordination Chat</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Coordinate seats, departure platforms, and share coffees together.</p>
                  </div>
                </div>
              </div>

              {/* Action trigger */}
              <div className="w-full max-w-sm mx-auto pb-4">
                <button
                  type="button"
                  onClick={handleDismissSplash}
                  className="w-full bg-black hover:bg-zinc-900 active:scale-95 text-white font-bold text-xs py-4 rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Get Started Traveling</span>
                  <ArrowRight size={14} className="text-[#71E300]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER BAR */}
        <header className="sticky top-0 left-0 right-0 bg-[#F6F4ED]/85 backdrop-blur-md border-b border-b-black/[0.04] py-3.5 px-4 flex items-center justify-between z-30 shrink-0">
          <span className="font-heading font-black text-2xl tracking-tighter text-[#0f1115] select-none">diaspedia</span>

          <div className="flex items-center gap-2">
            {/* Notification trigger button */}
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) {
                  // Mark read
                  setNotifications(notifications.map(n => ({ ...n, read: true })));
                }
              }}
              className="relative w-9 h-9 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#0f1115] hover:bg-[#F6F4ED]/80 active:scale-90 transition-all cursor-pointer"
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

        {/* NOTIFICATIONS PANEL WITH SMOOTH TRANSITION */}
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
                className="absolute top-[58px] left-4 right-4 bg-white border border-black/10 shadow-xl z-50 max-h-[75%] overflow-y-auto rounded-3xl p-5 space-y-4"
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
                  Close Alerts
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN SCROLLABLE CONTENT BODY */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-32 space-y-5 scroll-smooth">

          {/* ======================================= */}
          {/* 1. HOME TAB (SEARCH EXPERIENCE & ROUTING) */}
          {/* ======================================= */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Heading */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400">Where are you going?</h4>
                <h2 className="text-2xl font-black font-heading tracking-tight text-[#0f1115] leading-tight">Search European Rail</h2>
              </div>

              {/* ROUTE SEARCH PANEL */}
              <form onSubmit={handleExecuteSearch} className="bg-white p-4 rounded-3xl border border-black/5 shadow-sm space-y-3 relative">

                {/* Station inputs */}
                <div className="space-y-2 relative">
                  {/* From input */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 uppercase tracking-widest">From</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Berlin Hbf"
                      value={fromQuery}
                      onChange={(e) => handleFromChange(e.target.value)}
                      className="w-full bg-[#F6F4ED]/60 border border-black/5 rounded-xl py-3 pl-14 pr-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                    />
                    {/* Autocomplete Dropdown */}
                    {fromSuggestions.length > 0 && (
                      <div className="absolute top-11 left-0 right-0 bg-white border border-black/10 rounded-xl shadow-lg z-50 divide-y divide-black/[0.03] overflow-hidden max-h-36 overflow-y-auto">
                        {fromSuggestions.map(st => (
                          <div
                            key={st.id}
                            onClick={() => {
                              setFromQuery(st.name);
                              setFromSuggestions([]);
                            }}
                            className="p-3 text-xs font-semibold hover:bg-zinc-50 cursor-pointer flex justify-between items-center"
                          >
                            <span>{st.name}</span>
                            <span className="text-[10px] text-zinc-400">{st.country}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* To input */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 uppercase tracking-widest">To</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. München Hbf"
                      value={toQuery}
                      onChange={(e) => handleToChange(e.target.value)}
                      className="w-full bg-[#F6F4ED]/60 border border-black/5 rounded-xl py-3 pl-14 pr-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                    />
                    {/* Autocomplete Dropdown */}
                    {toSuggestions.length > 0 && (
                      <div className="absolute top-11 left-0 right-0 bg-white border border-black/10 rounded-xl shadow-lg z-50 divide-y divide-black/[0.03] overflow-hidden max-h-36 overflow-y-auto">
                        {toSuggestions.map(st => (
                          <div
                            key={st.id}
                            onClick={() => {
                              setToQuery(st.name);
                              setToSuggestions([]);
                            }}
                            className="p-3 text-xs font-semibold hover:bg-zinc-50 cursor-pointer flex justify-between items-center"
                          >
                            <span>{st.name}</span>
                            <span className="text-[10px] text-zinc-400">{st.country}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Filter mode segmented controls */}
                <div className="grid grid-cols-3 gap-1 bg-[#F6F4ED]/80 p-1 rounded-xl">
                  {(["fastest", "cheapest", "regional"] as const).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSearchMode(mode)}
                      className={`text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all ${
                        searchMode === mode
                          ? "bg-black text-white"
                          : "text-zinc-500 hover:text-black"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Action trigger button */}
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-[#71E300] hover:bg-[#5ec700] disabled:bg-[#71E300]/60 active:scale-[0.98] text-black font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Find Journeys</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* SEARCH RESULTS FEED */}
              <AnimatePresence>
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2 pt-2"
                  >
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest animate-pulse">Querying European Transit Schedules...</div>
                    <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm space-y-3 animate-pulse">
                      <div className="h-4 bg-zinc-100 rounded w-1/3" />
                      <div className="h-8 bg-zinc-100 rounded w-2/3" />
                      <div className="h-4 bg-zinc-100 rounded w-1/2" />
                    </div>
                  </motion.div>
                )}

                {!isSearching && hasSearched && searchResults.length === 0 && (
                  <div className="bg-white border border-black/5 p-6 rounded-3xl text-center space-y-2">
                    <AlertTriangle size={24} className="mx-auto text-amber-500" />
                    <h4 className="text-xs font-bold text-black">No Connections Found</h4>
                    <p className="text-[11px] text-zinc-400">Ensure the station queries are spelled correctly or try using popular hubs like Berlin Hbf, München Hbf, or Paris Gare de l&apos;Est.</p>
                  </div>
                )}

                {!isSearching && hasSearched && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center px-1">
                      <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase">Available Rail Options</h4>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase">100% Reliable</span>
                    </div>

                    <div className="space-y-3">
                      {/* Interactive result card */}
                      <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-5 space-y-4">

                        {/* Time details */}
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">DEPARTURE</span>
                            <div className="text-xl font-black text-black">
                              {searchResults[0].departureTime}
                            </div>
                            <span className="text-xs font-bold text-zinc-600 block">{searchResults[0].fromStation}</span>
                          </div>

                          <div className="flex flex-col items-center shrink-0">
                            <span className="text-[10px] font-bold text-zinc-400">{searchMode === "regional" ? "Multi-leg RE" : "Direct Rail"}</span>
                            <div className="w-16 h-[2px] bg-zinc-200 relative my-1">
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#71E300] rounded-full" />
                            </div>
                            <span className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded-md text-zinc-600 font-bold uppercase">{searchResults[0].trainType}</span>
                          </div>

                          <div className="space-y-0.5 text-right">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">ARRIVAL</span>
                            <div className="text-xl font-black text-black">
                              {searchResults[searchResults.length - 1].arrivalTime}
                            </div>
                            <span className="text-xs font-bold text-zinc-600 block">{searchResults[searchResults.length - 1].toStation}</span>
                          </div>
                        </div>

                        {/* Train details legs info breakdown */}
                        <div className="bg-[#F6F4ED]/50 p-3.5 rounded-2xl border border-black/[0.02] text-xs space-y-2">
                          <div className="flex justify-between font-semibold">
                            <span className="text-zinc-500">Service:</span>
                            <span className="text-black font-bold">{searchResults.map(l => l.trainNumber).join("  →  ")}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span className="text-zinc-500">Departure Platform:</span>
                            <span className="text-black font-bold">Platform {searchResults[0].departurePlatform}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span className="text-zinc-500">Status:</span>
                            <span className={`font-bold ${searchResults[0].status === "Delayed" ? "text-amber-600" : "text-[#5ec700]"}`}>
                              {searchResults[0].status} {searchResults[0].delayMinutes > 0 && `(+${searchResults[0].delayMinutes} min)`}
                            </span>
                          </div>
                        </div>

                        {/* Saving or feedback action */}
                        {saveSuccessTripId ? (
                          <div className="bg-[#71E300]/10 border border-[#71E300]/30 text-zinc-800 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                            <CheckCircle2 size={16} className="text-[#5ec700]" />
                            <span>Saved to Your Trips!</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <a
                              href={searchResults[0].bookingUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-zinc-100 hover:bg-zinc-200 text-black font-bold text-xs py-3 rounded-xl text-center transition-all flex items-center justify-center gap-1.5"
                            >
                              <span>Official Ticket</span>
                              <ChevronRight size={14} />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleSaveTrip(searchResults)}
                              className="bg-[#71E300] hover:bg-[#5ec700] text-black font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Plus size={14} />
                              <span>Save Journey</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* QUICK LINKS TO TRENDING PASS OPTIONS */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Pass Coordination</h4>
                <div className="bg-white border border-black/5 p-4 rounded-3xl flex items-center gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-black">Deutschlandticket Mode</h5>
                    <p className="text-[11px] text-zinc-400 leading-normal font-medium">Use the <span className="font-semibold text-black">Regional Only</span> search filter to find itineraries compatible with the €58 German transit pass.</p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ======================================= */}
          {/* 2. TRIPS TAB (UPCOMING & HISTORY) */}
          {/* ======================================= */}
          {activeTab === "trips" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">My Trips</h2>
                <p className="text-xs text-zinc-400">Track saved European itineraries, active connections, and delays.</p>
              </div>

              {/* ACTIVE/UPCOMING TRIPS SECTION */}
              <div className="space-y-3">
                <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Upcoming Journeys</h4>
                {savedTrips.filter(t => !t.isCompleted).length === 0 ? (
                  <div className="bg-white border border-black/5 p-6 rounded-3xl text-center space-y-3">
                    <Calendar size={24} className="mx-auto text-zinc-300" />
                    <p className="text-xs font-bold text-zinc-500">No upcoming journeys saved</p>
                    <button
                      onClick={() => setActiveTab("home")}
                      className="bg-black text-white font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      Search a Train
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedTrips.filter(t => !t.isCompleted).map((trip) => (
                      <div
                        key={trip.id}
                        className="bg-white border border-black/5 rounded-3xl p-5 shadow-sm space-y-4"
                      >
                        {/* Summary */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-base font-black text-black leading-tight">
                              {trip.fromCity}  →  {trip.toCity}
                            </h3>
                            <span className="text-[10px] text-zinc-400 font-bold">{trip.date}</span>
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            trip.legs[0].status === "Delayed"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-[#71E300]/20 text-black"
                          }`}>
                            {trip.legs[0].status} {trip.legs[0].delayMinutes > 0 && `(+${trip.legs[0].delayMinutes}m)`}
                          </span>
                        </div>

                        {/* Train details legs info */}
                        <div className="bg-[#F6F4ED]/50 p-3.5 rounded-2xl border border-black/[0.02] text-xs space-y-2">
                          <div className="flex justify-between font-semibold">
                            <span className="text-zinc-500">Train Service:</span>
                            <span className="text-black font-bold">{trip.legs[0].trainNumber}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span className="text-zinc-500">Departure:</span>
                            <span className="text-black font-bold">{trip.legs[0].departureTime} (Platform {trip.legs[0].departurePlatform})</span>
                          </div>
                        </div>

                        {/* Interactive coordination controls */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">

                          {/* Seat Buddy Trigger */}
                          <button
                            onClick={() => toggleSeatBuddy(trip.id)}
                            className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all ${
                              seatBuddyState[trip.id]
                                ? "bg-[#71E300] text-black"
                                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                            }`}
                          >
                            {seatBuddyState[trip.id] ? "Buddy Posted" : "Seat Buddy Lookup"}
                          </button>

                          {/* Quick access to Chat */}
                          <button
                            onClick={() => {
                              setActiveChatGroupId(trip.chatGroupId);
                              setActiveTab("messages");
                            }}
                            className="bg-black text-white hover:bg-zinc-900 font-bold text-[11px] px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1"
                          >
                            <MessageCircle size={12} />
                            <span>Trip Chat ({trip.participants.length})</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PERSONAL TRAVEL HISTORY & ANALYTICS STORY */}
              <div className="bg-zinc-950 text-white rounded-3xl p-5 shadow-lg space-y-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black text-[#71E300] uppercase tracking-widest">My Travel Analytics</span>
                  <h3 className="text-lg font-black font-heading tracking-tight">Your Rail Story</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block">KILOMETERS</span>
                    <div className="text-xl font-black text-[#71E300] mt-0.5">
                      {userProfile.totalKmTraveled.toLocaleString()} km
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block">CITIES VISITED</span>
                    <div className="text-xl font-black text-[#71E300] mt-0.5">
                      {userProfile.totalCitiesVisited}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block">TOTAL JOURNEYS</span>
                    <div className="text-xl font-black text-zinc-100 mt-0.5">
                      {userProfile.totalTripsCount}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block">CO2 REDUCED</span>
                    <div className="text-xl font-black text-[#71E300] mt-0.5">
                      -{userProfile.carbonSavedKg.toFixed(0)} kg
                    </div>
                  </div>
                </div>

                {/* PAST ARCHIVED TRIPS TIMELINE */}
                <div className="space-y-2.5 pt-2 border-t border-white/5">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Past Connections</h4>
                  {savedTrips.filter(t => t.isCompleted).map((trip) => (
                    <div
                      key={trip.id}
                      className="bg-white/5 rounded-2xl p-3 flex justify-between items-center text-xs"
                    >
                      <div>
                        <div className="font-bold text-zinc-200">{trip.fromCity}  →  {trip.toCity}</div>
                        <span className="text-[10px] text-zinc-500">{trip.date} &bull; {trip.legs[0].trainType}</span>
                      </div>
                      <span className="text-[#71E300] font-black font-mono">Archived</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* ======================================= */}
          {/* 3. DISCOVER TAB (WISHLIST & SOCIAL ROADMAP) */}
          {/* ======================================= */}
          {activeTab === "discover" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Discover</h2>
                <p className="text-xs text-zinc-400">Plan new destinations, match wishlists with friends, and join active trips.</p>
              </div>

              {/* FRIEND'S ACTIVE/SHARED TRIP FEED */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase">Friends&apos; Travel Feed</h4>
                  <span className="text-xs font-bold text-zinc-400">Real-time schedule</span>
                </div>

                <div className="space-y-3">
                  {friendsTrips.map((trip) => {
                    const friendUser = friendsList.find(f => f.username === trip.participants[0].username);
                    return (
                      <div
                        key={trip.id}
                        className="bg-white border border-black/5 rounded-3xl p-5 shadow-sm space-y-4"
                      >
                        {/* User Identity context */}
                        <div className="flex items-center justify-between border-b border-black/[0.03] pb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white text-[11px] font-black">
                              {trip.participants[0].name.slice(0, 1)}
                            </div>
                            <div>
                              <h5 className="text-xs font-black text-black leading-tight">{trip.participants[0].name}</h5>
                              <p className="text-[10px] text-zinc-400 font-bold">Residency: {friendUser?.passportCountry || "EU expat"}</p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-[#71E300]/15 text-zinc-800 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {trip.legs[0].operator} Service
                          </span>
                        </div>

                        {/* Connection Summary */}
                        <div className="space-y-1">
                          <div className="text-sm font-black text-zinc-800 leading-tight">
                            {trip.fromCity}  →  {trip.toCity}
                          </div>
                          <div className="text-[11px] text-zinc-400 font-medium">
                            {trip.legs[0].trainNumber} &bull; {trip.date} at {trip.legs[0].departureTime}
                          </div>
                        </div>

                        {/* Interactive coordination actions */}
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-[10px] text-zinc-400 font-medium">Platform {trip.legs[0].departurePlatform}</span>
                          <button
                            onClick={() => handleJoinTrip(trip)}
                            className="bg-[#71E300] hover:bg-[#5ec700] active:scale-95 text-black font-extrabold text-[11px] px-4 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Users size={12} />
                            <span>Join Trip</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* European destinations Wishlist builder */}
              <div className="space-y-3">
                <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Trending European Destinations</h4>
                {wishlistSuccessMessage && (
                  <div className="p-3 bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 text-xs font-bold rounded-2xl flex items-center gap-2">
                    <CheckCircle2 size={15} />
                    <span>{wishlistSuccessMessage}</span>
                  </div>
                )}

                <div className="space-y-3">
                  {destinations.map((dest) => {
                    const isSaved = userProfile.wishlist.includes(dest.id);
                    return (
                      <div
                        key={dest.id}
                        className="bg-white border border-black/5 rounded-3xl p-5 shadow-sm space-y-3.5 relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-base font-black text-black leading-tight">
                              {dest.name}, <span className="text-zinc-400">{dest.country}</span>
                            </h4>
                            <p className="text-[11px] text-zinc-400 leading-normal max-w-xs mt-1 font-medium">{dest.description}</p>
                          </div>
                          <button
                            onClick={() => handleToggleWishlist(dest.id, dest.name)}
                            className={`p-2.5 rounded-xl transition-all ${
                              isSaved
                                ? "bg-[#71E300] text-black"
                                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                            }`}
                          >
                            <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
                          </button>
                        </div>

                        {/* Social discovery context: show friends interested */}
                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.03] text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-zinc-600">
                            <Users size={14} className="text-[#71E300]" />
                            <span>{dest.friendsInterested.length} friends interested</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Est. Rail €{dest.averagePriceEst.toFixed(2)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          )}

          {/* ======================================= */}
          {/* 4. MESSAGES / TRIP CHAT TAB */}
          {/* ======================================= */}
          {activeTab === "messages" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5 h-full flex flex-col justify-between"
            >
              {!activeChatGroupId ? (
                // CHAT DIRECTORY / ROOMS FEED LIST
                <div className="space-y-4">
                  <div className="space-y-0.5">
                    <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Trip Chats</h2>
                    <p className="text-xs text-zinc-400">Coordinate and converse with companions on saved European rail routes.</p>
                  </div>

                  <div className="space-y-2.5">
                    {savedTrips.filter(t => !t.isCompleted).map((trip) => (
                      <div
                        key={trip.id}
                        onClick={() => setActiveChatGroupId(trip.chatGroupId)}
                        className="bg-white border border-black/5 p-4 rounded-3xl flex items-center justify-between shadow-sm hover:border-black/10 transition-all cursor-pointer animate-fade-in"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0">
                            <MessageSquare size={18} />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-black leading-tight">
                              {trip.fromCity}  →  {trip.toCity} Group
                            </h4>
                            <span className="text-[10px] text-zinc-400 font-bold">
                              {trip.legs[0].trainNumber} &bull; {trip.participants.length} traveler(s) active
                            </span>
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-1 text-zinc-400 hover:text-black">
                          <span className="text-xs font-bold">Open</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // INDIVIDUAL HIGH FIDELITY MESSAGING VIEWPORT
                <div className="space-y-4 flex flex-col h-[calc(100vh-230px)] justify-between relative bg-white rounded-3xl border border-black/5 p-4 shadow-sm">

                  {/* Chat Top Banner */}
                  <div className="flex items-center justify-between border-b border-black/[0.04] pb-3 shrink-0">
                    <button
                      onClick={() => setActiveChatGroupId(null)}
                      className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-black cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>

                    <div className="text-center">
                      <h4 className="text-xs font-black text-black leading-tight">Itinerary Discussion</h4>
                      <p className="text-[9px] text-zinc-400 font-bold">Coordination Group &bull; Dynamic</p>
                    </div>

                    <HelpCircle size={15} className="text-zinc-300" />
                  </div>

                  {/* SEAT BUDDY ACTIVE MATCHING DRAWER */}
                  <div className="bg-[#F6F4ED]/80 border border-[#71E300]/25 rounded-2xl p-3 flex items-start gap-3 text-xs shrink-0">
                    <Users size={18} className="text-[#71E300] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h5 className="text-[11px] font-black text-black uppercase tracking-wider">Seat Buddy Matching</h5>
                      <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                        Sarah K. is seated in <span className="font-semibold text-black">Coach 23, Seat 88</span>. Coordinate purchase externally via bahn.de or SNCF.
                      </p>
                    </div>
                  </div>

                  {/* SCROLLABLE CONVERSATIONS FEED */}
                  <div className="flex-1 overflow-y-auto space-y-3.5 py-2.5 scrollbar-thin">
                    {chatMessages
                      .filter(msg => msg.chatGroupId === activeChatGroupId)
                      .map((msg) => {
                        const isUser = msg.senderUsername === userProfile.username;
                        const isSystem = msg.senderUsername === "system";

                        if (isSystem) {
                          return (
                            <div key={msg.id} className="text-center py-2 shrink-0">
                              <span className="bg-[#71E300]/10 border border-[#71E300]/30 text-zinc-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {msg.text}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={msg.id}
                            className={`flex items-start gap-2.5 max-w-[85%] ${
                              isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0 ${msg.senderAvatarBg}`}>
                              {msg.senderName.slice(0, 1)}
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-zinc-400 font-bold block px-1">{msg.senderName}</span>
                              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                                isUser
                                  ? "bg-zinc-950 text-white rounded-tr-none"
                                  : "bg-zinc-100 text-zinc-800 rounded-tl-none"
                              }`}>
                                {msg.text}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* MESSAGES INPUT INTERACTIVE BLOCK */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-black/[0.04] pt-3 shrink-0">
                    <input
                      type="text"
                      required
                      placeholder="Type a coordination note..."
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      className="flex-1 bg-[#F6F4ED]/60 border border-black/5 rounded-xl px-3 py-3 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                    />
                    <button
                      type="submit"
                      className="bg-black text-white hover:bg-zinc-900 w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Send size={15} />
                    </button>
                  </form>

                </div>
              )}
            </motion.div>
          )}

          {/* ======================================= */}
          {/* 5. PROFILE & FRIENDS & SETTINGS TAB */}
          {/* ======================================= */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Identity traveler card */}
              <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center border-4 border-[#71E300] shadow">
                    <span className="text-white text-3xl font-black font-heading">J</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-lg font-black font-heading text-black leading-tight">@{userProfile.username}</h3>
                  <p className="text-xs text-zinc-400 font-bold">Home City: {userProfile.homeCity}</p>
                </div>

                {/* Passport context */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  <span className="text-[10px] bg-zinc-100 border border-black/5 text-zinc-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {userProfile.passportCountry} Passport
                  </span>
                </div>
              </div>

              {/* FRIENDS MANAGER CONTROL */}
              <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm space-y-4">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Travel Companions</h3>

                <div className="space-y-2.5">
                  {friendsList.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full ${f.avatarBg} flex items-center justify-center text-white text-[10px] font-black`}>
                          {f.name.slice(0, 1)}
                        </div>
                        <div>
                          <span className="font-bold text-zinc-800 block">{f.name}</span>
                          <span className="text-[10px] text-zinc-400 font-bold">@{f.username}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-bold bg-zinc-100 px-2 py-0.5 rounded-md uppercase">Connected</span>
                    </div>
                  ))}
                </div>

                {/* Add new friend form */}
                <form onSubmit={handleAddFriend} className="space-y-2 border-t border-black/[0.03] pt-3">
                  {addFriendSuccess && (
                    <div className="text-[11px] font-bold text-zinc-800 bg-[#71E300]/15 p-2 rounded-lg">
                      {addFriendSuccess}
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Add companion username..."
                      value={newFriendUsername}
                      onChange={(e) => setNewFriendUsername(e.target.value)}
                      className="w-full bg-[#F6F4ED]/60 border border-black/5 rounded-xl py-2.5 pl-3 pr-16 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-zinc-900 transition-all cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>

              {/* PRIVACY CONTROLS */}
              <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm space-y-3.5">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Privacy Controls</h3>

                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-zinc-800 block">Share Saved Routes</span>
                    <p className="text-[10px] text-zinc-400 font-medium">Let connected friends see your saved timetables.</p>
                  </div>
                  <div className="w-10 h-6 bg-[#71E300] rounded-full p-0.5 cursor-pointer flex justify-end">
                    <div className="w-5 h-5 bg-black rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-black/[0.03] pt-3">
                  <div className="space-y-0.5">
                    <span className="font-bold text-zinc-800 block">Seat Buddy Discovery</span>
                    <p className="text-[10px] text-zinc-400 font-medium">Publicly announce searches for shared rail tickets.</p>
                  </div>
                  <div className="w-10 h-6 bg-[#71E300] rounded-full p-0.5 cursor-pointer flex justify-end">
                    <div className="w-5 h-5 bg-black rounded-full" />
                  </div>
                </div>
              </div>

              {/* CORPORATE LEGAL LINKS (STRICTLY NO DEAD ENDS) */}
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
                  diaspedia &copy; {new Date().getFullYear()}. Financial accounts, booking models, and transit companion details are powered in partnership with open European rail providers.
                </p>
              </div>

            </motion.div>
          )}

        </main>

        {/*
          PERSISTENT PINNED TAB BAR NAVIGATION Floating Dark Capsule
          Always pins beautifully above content with absolute layer controls.
        */}
        <nav className="absolute bottom-5 left-4 right-4 bg-[#0f1115]/95 backdrop-blur-md rounded-full px-2.5 py-2 flex justify-between items-center z-40 shadow-[0_12px_36px_rgba(0,0,0,0.22)] border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab("home")}
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
            onClick={() => setActiveTab("trips")}
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
            onClick={() => setActiveTab("discover")}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "discover"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Users size={18} className={activeTab === "discover" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "discover" && <span className="text-xs tracking-tight">Discover</span>}
          </button>

          <button
            onClick={() => setActiveTab("messages")}
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
            onClick={() => setActiveTab("profile")}
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
