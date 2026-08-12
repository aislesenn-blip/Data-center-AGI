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
  X,
  Bell,
  Check,
  Plus,
  Bookmark,
  Share2,
  HelpCircle,
  AlertTriangle,
  Send,
  Lock,
  Unlock,
  Shield,
  Briefcase,
  MapPin,
  Clock
} from "lucide-react";

import {
  MOCK_USER,
  MOCK_FRIENDS,
  MOCK_DESTINATIONS,
  MOCK_TRAVEL_PLANS,
  MOCK_TRAVEL_MATCHES,
  MOCK_CHAT_MESSAGES,
  MOCK_NOTIFICATIONS,
  UserProfile,
  Friend,
  Destination,
  TravelPlan,
  TravelMatch,
  ChatMessage,
  TravelNotification
} from "@/lib/diaspediaData";

export default function Home() {
  // Navigation: "home" | "trips" | "discover" | "messages" | "profile"
  const [activeTab, setActiveTab] = useState<"home" | "trips" | "discover" | "messages" | "profile">("home");

  // Onboarding
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // App States
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>(MOCK_TRAVEL_PLANS);
  const [travelMatches, setTravelMatches] = useState<TravelMatch[]>(MOCK_TRAVEL_MATCHES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [notifications, setNotifications] = useState<TravelNotification[]>(MOCK_NOTIFICATIONS);
  const [destinations, setDestinations] = useState<Destination[]>(MOCK_DESTINATIONS);
  const [friendsList, setFriendsList] = useState<Friend[]>(MOCK_FRIENDS);

  // New Trip Creation Progressive Steps
  const [addingTrip, setAddingTrip] = useState(false);
  const [tripFormStep, setTripFormStep] = useState(1);
  const [newTripTo, setNewTripTo] = useState("");
  const [newTripFrom, setNewTripFrom] = useState("");
  const [newTripDates, setNewTripDates] = useState("");
  const [newTripStops, setNewTripStops] = useState("");

  // Search/Filter for Destinations
  const [searchQuery, setSearchQuery] = useState("");

  // Active Chat / Details
  const [activeChatGroupId, setActiveChatGroupId] = useState<string | null>(null);
  const [chatInputText, setChatInputText] = useState("");
  const [selectedMatch, setSelectedMatch] = useState<TravelMatch | null>(null);

  // UI States
  const [showNotifications, setShowNotifications] = useState(false);
  const [wishlistSuccessMessage, setWishlistSuccessMessage] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Add Friend State
  const [newFriendUsername, setNewFriendUsername] = useState("");
  const [addFriendSuccess, setAddFriendSuccess] = useState<string | null>(null);

  // Sync contacts simulation
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

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

  // Submit progressive trip form
  const handleAddTravelPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTripTo || !newTripFrom || !newTripDates) return;

    const newPlanId = `plan-${travelPlans.length + 1}`;
    const newPlan: TravelPlan = {
      id: newPlanId,
      fromCity: newTripFrom,
      destinations: [newTripTo],
      startDate: newTripDates.split("-")[0]?.trim() || newTripDates,
      endDate: newTripDates.split("-")[1]?.trim() || newTripDates,
      stops: newTripStops ? newTripStops.split(",").map(s => s.trim()) : undefined,
      isCompleted: false,
      status: "searching"
    };

    setTravelPlans([newPlan, ...travelPlans]);
    setSaveSuccess(true);

    // Create background look alert
    setNotifications([
      {
        id: `notif-${Date.now()}`,
        text: `Searching in the background for overlaps on your trip to ${newTripTo}...`,
        time: "Just now",
        read: false,
        type: "match",
        planId: newPlanId
      },
      ...notifications
    ]);

    setTimeout(() => {
      setSaveSuccess(false);
      setAddingTrip(false);
      // Reset form
      setNewTripTo("");
      setNewTripFrom("");
      setNewTripDates("");
      setNewTripStops("");
      setTripFormStep(1);
    }, 1800);
  };

  // Add Destination from wishlist to plans
  const handleQuickAddDestination = (dest: Destination) => {
    const newPlanId = `plan-${travelPlans.length + 1}`;
    const newPlan: TravelPlan = {
      id: newPlanId,
      fromCity: userProfile.homeCity.split(",")[0],
      destinations: [dest.name],
      startDate: "Next Month",
      endDate: "Next Month",
      isCompleted: false,
      status: "searching"
    };

    setTravelPlans([newPlan, ...travelPlans]);
    setWishlistSuccessMessage(`Added plan to ${dest.name}! Diaspedia is looking in the background.`);
    setTimeout(() => setWishlistSuccessMessage(null), 2500);
  };

  // Toggle wishlist Bookmark
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

  // Decide on matching group (accept & join)
  const handleJoinMatchGroup = (match: TravelMatch) => {
    // Update local state: join group
    const updatedMatches = travelMatches.map(m => {
      if (m.id === match.id) {
        return { ...m, hasJoinedGroup: true };
      }
      return m;
    });
    setTravelMatches(updatedMatches);

    // Dynamic system message in the chat
    const systemMsg: ChatMessage = {
      id: `system-msg-${chatMessages.length + 1}`,
      chatGroupId: match.chatGroupId || "chat-zanzibar",
      senderUsername: "system",
      senderName: "Diaspedia",
      senderAvatarBg: "bg-[#71E300]/25",
      text: `${userProfile.name} joined the discussion!`,
      timestamp: "Just now"
    };

    setChatMessages([...chatMessages, systemMsg]);

    setNotifications([
      {
        id: `notif-${Date.now()}`,
        text: `You joined the Zanzibar cost-sharing discussion group!`,
        time: "Just now",
        read: false,
        type: "join"
      },
      ...notifications
    ]);

    setActiveChatGroupId(match.chatGroupId || "chat-zanzibar");
    setActiveTab("messages");
    setSelectedMatch(null);
  };

  // Send Chat message
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

    // Simulate direct provider booking tip after message
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `reply-${chatMessages.length + 2}`,
        chatGroupId: activeChatGroupId,
        senderUsername: "system",
        senderName: "Diaspedia Companion",
        senderAvatarBg: "bg-[#71E300]/20",
        text: "Tip: To book the shared Zanzibar airport shuttle securely, we recommend booking directly at zanzibartransfers.com and sharing the booking confirmation code. No money needs to change hands between travelers.",
        timestamp: "Just now"
      };
      setChatMessages(prev => [...prev, reply]);
    }, 2000);
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
        passportCountry: "Germany",
        isPhoneVerified: true,
        isEmailVerified: true,
        isIdVerified: false
      };
      setFriendsList([...friendsList, newF]);
      setAddFriendSuccess(`Successfully added @${cleaned}!`);
    }

    setNewFriendUsername("");
    setTimeout(() => setAddFriendSuccess(null), 2500);
  };

  // Sync Contact Simulation
  const handleSyncContacts = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSynced(true);
    }, 1500);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F6F4ED] text-[#0f1115] font-sans antialiased flex justify-center overflow-hidden">
      {/* Edge-to-edge quiet luxury mobile container shell */}
      <div className="w-full max-w-md bg-[#F6F4ED] h-[100dvh] relative flex flex-col shadow-[0_0_50px_rgba(15,17,21,0.06)] overflow-hidden border-x border-black/[0.03]">

        {/* ONBOARDING SCREEN - SINGLE VIEWPORT CONSTRAINED */}
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
                <p className="max-w-xs text-xs font-semibold text-zinc-500 leading-normal pt-1">
                  Your trip might be cheaper when you go with others heading the same way.
                </p>
              </div>

              {/* Core Statement Box */}
              <div className="bg-white p-6 rounded-3xl border border-black/[0.04] shadow-sm text-center max-w-sm mx-auto space-y-2">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Quiet economics</p>
                <blockquote className="text-xs font-bold tracking-tight text-zinc-700 leading-relaxed">
                  “Simply add your plans and leave. Diaspedia runs in the background. When we find overlapping travel plans, we notify you to share costs on taxis, rental cars, accommodation, and transfers.”
                </blockquote>
              </div>

              {/* Steps Overview */}
              <div className="space-y-3 max-w-sm mx-auto w-full py-1">
                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Plus size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">1. Add Your Plans</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">One trip, multiple stops, or exact destinations anywhere in the world.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Users size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">2. Diaspedia Looks Background</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">We look out for you. No constant searching required.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Shield size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">3. Reduce Costs Safely</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Review verified profiles, join the group, and pay providers directly.</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="w-full max-w-sm mx-auto pb-4">
                <button
                  type="button"
                  onClick={handleDismissSplash}
                  className="w-full bg-black hover:bg-zinc-900 active:scale-95 text-white font-bold text-xs py-4 rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Get Started</span>
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
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) {
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

        {/* NOTIFICATIONS DROPDOWN */}
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
                  <h3 className="text-sm font-black font-heading tracking-tight">Activity Alerts</h3>
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
          {/* 1. HOME TAB (TRAVEL PLANS & CREATION)  */}
          {/* ======================================= */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Core Explainer */}
              <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm space-y-2.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">How it works</span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Diaspedia does the searching in the background. Tell us where you are heading, and we will notify you when someone else is already heading the same way so you can reduce shared travel costs together.
                </p>
              </div>

              {/* PLANS MANAGEMENT BLOCK */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase">My Travel Plans</h4>
                  <button
                    onClick={() => setAddingTrip(true)}
                    className="text-[#71E300] hover:text-[#5ec700] text-xs font-extrabold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add Plan</span>
                  </button>
                </div>

                {/* TRIP CREATION MULTI-STEP MODAL */}
                <AnimatePresence>
                  {addingTrip && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black z-50"
                        onClick={() => setAddingTrip(false)}
                      />
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl border-t border-black/10 z-[55] p-6 space-y-5 max-h-[85%] overflow-y-auto"
                      >
                        <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                          <h3 className="text-sm font-black font-heading tracking-tight">Add Travel Plan</h3>
                          <button
                            onClick={() => setAddingTrip(false)}
                            className="p-1 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 cursor-pointer"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        {saveSuccess ? (
                          <div className="py-8 text-center space-y-3">
                            <div className="w-12 h-12 bg-[#71E300]/20 rounded-full flex items-center justify-center mx-auto text-[#5ec700]">
                              <CheckCircle2 size={24} />
                            </div>
                            <h4 className="text-sm font-bold text-black">Travel Plan Saved</h4>
                            <p className="text-xs text-zinc-400">Diaspedia has started looking in the background.</p>
                          </div>
                        ) : (
                          <form onSubmit={handleAddTravelPlanSubmit} className="space-y-5">
                            {/* PROGRESS BAR */}
                            <div className="flex gap-1 h-1 bg-zinc-100 rounded-full overflow-hidden">
                              {[1, 2, 3, 4].map(s => (
                                <div
                                  key={s}
                                  className={`flex-1 h-full rounded-full transition-all ${
                                    s <= tripFormStep ? "bg-black" : "bg-zinc-100"
                                  }`}
                                />
                              ))}
                            </div>

                            {/* STEP 1: DESTINATION */}
                            {tripFormStep === 1 && (
                              <div className="space-y-3 animate-fade-in">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest">Where are you going?</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Zanzibar, Paris"
                                  required
                                  value={newTripTo}
                                  onChange={(e) => setNewTripTo(e.target.value)}
                                  className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl p-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                                />
                                <div className="pt-2 flex justify-end">
                                  <button
                                    type="button"
                                    disabled={!newTripTo.trim()}
                                    onClick={() => setTripFormStep(2)}
                                    className="bg-black hover:bg-zinc-900 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>Next</span>
                                    <ArrowRight size={14} />
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* STEP 2: STARTING FROM */}
                            {tripFormStep === 2 && (
                              <div className="space-y-3 animate-fade-in">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest">Where are you starting from?</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Berlin, Hamburg"
                                  required
                                  value={newTripFrom}
                                  onChange={(e) => setNewTripFrom(e.target.value)}
                                  className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl p-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                                />
                                <div className="pt-2 flex justify-between">
                                  <button
                                    type="button"
                                    onClick={() => setTripFormStep(1)}
                                    className="text-zinc-500 font-bold text-xs py-2.5 flex items-center gap-1 cursor-pointer"
                                  >
                                    <ArrowLeft size={14} />
                                    <span>Back</span>
                                  </button>
                                  <button
                                    type="button"
                                    disabled={!newTripFrom.trim()}
                                    onClick={() => setTripFormStep(3)}
                                    className="bg-black hover:bg-zinc-900 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>Next</span>
                                    <ArrowRight size={14} />
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* STEP 3: WHEN ARE YOU GOING */}
                            {tripFormStep === 3 && (
                              <div className="space-y-3 animate-fade-in">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest">When are you going?</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Dec 10 - Dec 20"
                                  required
                                  value={newTripDates}
                                  onChange={(e) => setNewTripDates(e.target.value)}
                                  className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl p-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                                />
                                <div className="pt-2 flex justify-between">
                                  <button
                                    type="button"
                                    onClick={() => setTripFormStep(2)}
                                    className="text-zinc-500 font-bold text-xs py-2.5 flex items-center gap-1 cursor-pointer"
                                  >
                                    <ArrowLeft size={14} />
                                    <span>Back</span>
                                  </button>
                                  <button
                                    type="button"
                                    disabled={!newTripDates.trim()}
                                    onClick={() => setTripFormStep(4)}
                                    className="bg-black hover:bg-zinc-900 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>Next</span>
                                    <ArrowRight size={14} />
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* STEP 4: STOPPING ANYWHERE */}
                            {tripFormStep === 4 && (
                              <div className="space-y-3 animate-fade-in">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest">Are you stopping anywhere? (Optional)</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Paris, Muscat (comma separated)"
                                  value={newTripStops}
                                  onChange={(e) => setNewTripStops(e.target.value)}
                                  className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl p-3 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                                />
                                <div className="pt-2 flex justify-between">
                                  <button
                                    type="button"
                                    onClick={() => setTripFormStep(3)}
                                    className="text-zinc-500 font-bold text-xs py-2.5 flex items-center gap-1 cursor-pointer"
                                  >
                                    <ArrowLeft size={14} />
                                    <span>Back</span>
                                  </button>
                                  <button
                                    type="submit"
                                    className="bg-[#71E300] hover:bg-[#5ec700] text-black font-extrabold text-xs px-6 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer shadow-sm"
                                  >
                                    <span>Save Plan</span>
                                    <Check size={14} />
                                  </button>
                                </div>
                              </div>
                            )}
                          </form>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* PLANS FEED */}
                <div className="space-y-3">
                  {travelPlans.filter(p => !p.isCompleted).map((plan) => {
                    const matchesCount = travelMatches.filter(m => m.planId === plan.id).length;
                    return (
                      <div
                        key={plan.id}
                        className="bg-white border border-black/5 rounded-3xl p-5 shadow-sm space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">TRAVEL PLAN</span>
                            <h3 className="text-base font-black text-black leading-tight mt-0.5">
                              {plan.fromCity} &rarr; {plan.destinations.join(" &rarr; ")}
                            </h3>
                            <p className="text-[11px] text-zinc-500 font-bold mt-1">
                              {plan.startDate} {plan.endDate ? `— ${plan.endDate}` : ""}
                              {plan.stops && plan.stops.length > 0 && ` • Stops: ${plan.stops.join(", ")}`}
                            </p>
                          </div>

                          {plan.status === "matches_found" ? (
                            <span className="text-[10px] bg-[#71E300]/10 text-black border border-[#71E300]/30 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 flex items-center gap-1 animate-pulse">
                              <span className="w-1.5 h-1.5 bg-[#71E300] rounded-full" />
                              <span>{matchesCount} Matches</span>
                            </span>
                          ) : (
                            <span className="text-[10px] bg-zinc-100 text-zinc-500 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-ping" />
                              <span>Looking...</span>
                            </span>
                          )}
                        </div>

                        {/* Overlap Matching Alert Call to Action */}
                        {plan.status === "matches_found" && (
                          <div className="bg-[#71E300]/10 p-3.5 rounded-2xl border border-[#71E300]/15 flex items-center justify-between gap-3 text-xs">
                            <p className="font-semibold text-zinc-800">We found people heading to Zanzibar around the same time!</p>
                            <button
                              onClick={() => {
                                setActiveTab("trips");
                              }}
                              className="bg-black hover:bg-zinc-900 text-white font-bold text-[10px] px-3.5 py-2 rounded-xl shrink-0 transition-all cursor-pointer"
                            >
                              See overlap
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================================= */}
          {/* 2. TRIPS TAB (OVERLAP MATCHES & TRUST) */}
          {/* ======================================= */}
          {activeTab === "trips" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Overlaps</h2>
                <p className="text-xs text-zinc-400">Discover and coordinate with people heading the same way.</p>
              </div>

              {/* OVERLAP MATCHES LIST */}
              <div className="space-y-4">
                <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">People heading the same way</h4>
                {travelMatches.length === 0 ? (
                  <div className="bg-white border border-black/5 p-6 rounded-3xl text-center space-y-3">
                    <Users size={24} className="mx-auto text-zinc-300" />
                    <p className="text-xs font-bold text-zinc-500">Still looking for overlapping travel plans...</p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {travelMatches.map((match) => (
                      <div
                        key={match.id}
                        className="bg-white border border-black/5 rounded-3xl p-5 shadow-sm space-y-4"
                      >
                        {/* Profile Header */}
                        <div className="flex items-center justify-between border-b border-zinc-50 pb-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full ${match.friendAvatarBg} flex items-center justify-center text-white text-[11px] font-black`}>
                              {match.friendName.slice(0, 1)}
                            </div>
                            <div>
                              <h5 className="text-xs font-black text-black leading-tight">{match.friendName}</h5>
                              <p className="text-[10px] text-zinc-400 font-bold">
                                {match.fromCity} &rarr; {match.destinations.join(" &rarr; ")}
                              </p>
                            </div>
                          </div>

                          {/* Verification Signals */}
                          <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-100 px-2 py-1 rounded-lg">
                            {match.isPhoneVerified && <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Phone✓</span>}
                            {match.isEmailVerified && <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Email✓</span>}
                            {match.isIdVerified && <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">ID✓</span>}
                          </div>
                        </div>

                        {/* Overlap context */}
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-zinc-800 leading-normal flex items-center gap-1.5">
                            <Clock size={13} className="text-[#71E300]" />
                            <span>{match.overlapExplanation}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-semibold pl-4.5">
                            Dates: {match.startDate} — {match.endDate}
                          </p>
                        </div>

                        {/* Cost-sharing categories */}
                        <div className="bg-[#F6F4ED]/50 p-3.5 rounded-2xl border border-black/[0.02] text-xs space-y-2">
                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Spend less together on:</div>
                          <div className="flex flex-wrap gap-1.5">
                            {match.potentialSavings.map((cat, idx) => (
                              <span key={idx} className="bg-white border border-black/[0.04] px-2.5 py-1 rounded-lg text-[10px] font-bold text-zinc-700">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Safe Direct Payment Tip */}
                        <div className="text-[10px] text-zinc-400 font-bold flex items-center gap-1 pl-1">
                          <Shield size={12} className="text-[#71E300]" />
                          <span>Direct provider payments supported</span>
                        </div>

                        {/* Actions */}
                        <div>
                          {match.hasJoinedGroup ? (
                            <button
                              onClick={() => {
                                setActiveChatGroupId(match.chatGroupId || "chat-zanzibar");
                                setActiveTab("messages");
                              }}
                              className="w-full bg-zinc-950 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <MessageSquare size={14} />
                              <span>Open Discussion</span>
                            </button>
                          ) : (
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => {
                                  // Simply hide or skip
                                  setTravelMatches(travelMatches.filter(m => m.id !== match.id));
                                }}
                                className="bg-zinc-50 hover:bg-zinc-100 text-zinc-500 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                              >
                                Keep Looking
                              </button>
                              <button
                                onClick={() => handleJoinMatchGroup(match)}
                                className="bg-[#71E300] hover:bg-[#5ec700] text-black font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                <span>Join the Group</span>
                                <ArrowRight size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ======================================= */}
          {/* 3. DISCOVER TAB (WISHLIST & PYMK)      */}
          {/* ======================================= */}
          {activeTab === "discover" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Discover</h2>
                <p className="text-xs text-zinc-400">Add popular destinations or sync contacts to find people you know.</p>
              </div>

              {/* PEOPLE YOU MAY KNOW */}
              <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm space-y-4">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase">People You May Know</h3>
                  <p className="text-[11px] text-zinc-400 leading-normal font-semibold">Discover friends already on Diaspedia safely using contact matches.</p>
                </div>

                {!isSynced ? (
                  <div className="bg-[#F6F4ED]/60 p-4 rounded-2xl border border-black/[0.02] flex items-center justify-between gap-3 text-xs">
                    <p className="font-semibold text-zinc-600">Diaspedia will only show users matching your address book.</p>
                    <button
                      onClick={handleSyncContacts}
                      disabled={isSyncing}
                      className="bg-black hover:bg-zinc-900 text-white font-bold text-[10px] px-4 py-2.5 rounded-xl shrink-0 transition-all cursor-pointer"
                    >
                      {isSyncing ? "Syncing..." : "Sync Contacts"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5 animate-fade-in pt-1">
                    <div className="text-[10px] bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      <span>Address book synced successfully!</span>
                    </div>

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
                        <span className="text-[10px] text-zinc-400 font-bold bg-zinc-100 px-2 py-0.5 rounded-md uppercase">On Diaspedia</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* TRENDING GLOBAL DESTINATIONS */}
              <div className="space-y-3">
                <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Trending Destinations</h4>
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
                            <p className="text-[11px] text-zinc-400 leading-normal max-w-xs mt-1 font-semibold">{dest.description}</p>
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

                        {/* Add destination directly to plan list */}
                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.03] text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-zinc-600">
                            <Users size={14} className="text-[#71E300]" />
                            <span>{dest.friendsInterested.length} friends matching</span>
                          </div>
                          <button
                            onClick={() => handleQuickAddDestination(dest)}
                            className="bg-black hover:bg-zinc-900 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition-all cursor-pointer"
                          >
                            Add to My Plans
                          </button>
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
                // CHAT DIRECTORY
                <div className="space-y-4">
                  <div className="space-y-0.5">
                    <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Group Discussions</h2>
                    <p className="text-xs text-zinc-400">Active chat coordinates with travelers heading your way.</p>
                  </div>

                  <div className="space-y-2.5">
                    {travelMatches.filter(m => m.hasJoinedGroup).map((match) => (
                      <div
                        key={match.id}
                        onClick={() => setActiveChatGroupId(match.chatGroupId || "chat-zanzibar")}
                        className="bg-white border border-black/5 p-4 rounded-3xl flex items-center justify-between shadow-sm hover:border-black/10 transition-all cursor-pointer animate-fade-in"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-white shrink-0">
                            <MessageSquare size={18} />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-black leading-tight">
                              Zanzibar Shared Route
                            </h4>
                            <span className="text-[10px] text-zinc-400 font-bold">
                              Overlap Match Group
                            </span>
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-1 text-zinc-400 hover:text-black">
                          <span className="text-xs font-bold">Join chat</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    ))}

                    {travelMatches.filter(m => m.hasJoinedGroup).length === 0 && (
                      <div className="bg-white border border-black/5 p-6 rounded-3xl text-center space-y-3">
                        <MessageSquare size={24} className="mx-auto text-zinc-300" />
                        <p className="text-xs font-bold text-zinc-500">No active discussions. Join matches from the Overlaps screen.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // HIGH FIDELITY MESSAGING VIEWPORT
                <div className="space-y-4 flex flex-col h-[calc(100vh-230px)] justify-between relative bg-white rounded-3xl border border-black/5 p-4 shadow-sm">

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-black/[0.04] pb-3 shrink-0">
                    <button
                      onClick={() => setActiveChatGroupId(null)}
                      className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-black cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>

                    <div className="text-center">
                      <h4 className="text-xs font-black text-black leading-tight">Zanzibar Discussion</h4>
                      <p className="text-[9px] text-zinc-400 font-bold">Quiet Coordination &bull; Overlap</p>
                    </div>

                    <HelpCircle size={15} className="text-zinc-300" />
                  </div>

                  {/* Safe direct provider notification */}
                  <div className="bg-[#F6F4ED]/80 border border-[#71E300]/25 rounded-2xl p-3 flex items-start gap-3 text-xs shrink-0">
                    <Shield size={18} className="text-[#71E300] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h5 className="text-[11px] font-black text-black uppercase tracking-wider">Direct Provider Payments Preferred</h5>
                      <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">
                        To avoid fraud, pay the taxi provider or hotel directly rather than pooling funds with travelers you do not know.
                      </p>
                    </div>
                  </div>

                  {/* Message Feed */}
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

                  {/* Form input */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-black/[0.04] pt-3 shrink-0">
                    <input
                      type="text"
                      required
                      placeholder="Type a message..."
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
          {/* 5. PROFILE & SETTINGS TAB              */}
          {/* ======================================= */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center border-4 border-[#71E300] shadow">
                    <span className="text-white text-3xl font-black font-heading">J</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-lg font-black font-heading text-black leading-tight">@{userProfile.username}</h3>
                  <p className="text-xs text-zinc-400 font-bold">Home: {userProfile.homeCity}</p>
                </div>

                {/* Verified Signals */}
                <div className="flex justify-center gap-1.5 pt-1">
                  {userProfile.isPhoneVerified && (
                    <span className="text-[10px] bg-zinc-100 border border-black/5 text-zinc-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#71E300] rounded-full" />
                      <span>Phone Verified</span>
                    </span>
                  )}
                  {userProfile.isEmailVerified && (
                    <span className="text-[10px] bg-zinc-100 border border-black/5 text-zinc-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#71E300] rounded-full" />
                      <span>Email Verified</span>
                    </span>
                  )}
                  {userProfile.isIdVerified && (
                    <span className="text-[10px] bg-zinc-100 border border-black/5 text-zinc-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#71E300] rounded-full" />
                      <span>ID Verified</span>
                    </span>
                  )}
                </div>
              </div>

              {/* CO2 & TRAVEL HISTORY */}
              <div className="bg-zinc-950 text-white rounded-3xl p-5 shadow-lg space-y-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black text-[#71E300] uppercase tracking-widest">My Travel Analytics</span>
                  <h3 className="text-lg font-black font-heading tracking-tight">Your Travel History</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block">KILOMETERS</span>
                    <div className="text-xl font-black text-[#71E300] mt-0.5">
                      {userProfile.totalKmTraveled.toLocaleString()} km
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block">COUNTRIES VISITED</span>
                    <div className="text-xl font-black text-[#71E300] mt-0.5">
                      {userProfile.totalCitiesVisited}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wider block">TOTAL PLANS</span>
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

                {/* PAST PLANS */}
                <div className="space-y-2.5 pt-2 border-t border-white/5">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Past Travel Plans</h4>
                  {travelPlans.filter(p => p.isCompleted).map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white/5 rounded-2xl p-3 flex justify-between items-center text-xs animate-fade-in"
                    >
                      <div>
                        <div className="font-bold text-zinc-200">{plan.fromCity} &rarr; {plan.destinations.join(" &rarr; ")}</div>
                        <span className="text-[10px] text-zinc-500">{plan.startDate}</span>
                      </div>
                      <span className="text-[#71E300] font-black font-mono">Archived</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRIVACY CONTROLS */}
              <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm space-y-3.5">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Privacy Controls</h3>

                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-zinc-800 block">Share Saved Travel Plans</span>
                    <p className="text-[10px] text-zinc-400 font-semibold">Allow connected friends to see your travel plans.</p>
                  </div>
                  <div className="w-10 h-6 bg-[#71E300] rounded-full p-0.5 cursor-pointer flex justify-end">
                    <div className="w-5 h-5 bg-black rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-black/[0.03] pt-3">
                  <div className="space-y-0.5">
                    <span className="font-bold text-zinc-800 block">Background Matching</span>
                    <p className="text-[10px] text-zinc-400 font-semibold">Scan background overlaps for shared travel costs.</p>
                  </div>
                  <div className="w-10 h-6 bg-[#71E300] rounded-full p-0.5 cursor-pointer flex justify-end">
                    <div className="w-5 h-5 bg-black rounded-full" />
                  </div>
                </div>
              </div>

              {/* CORPORATE LEGAL LINKS */}
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
                <p className="text-[10px] text-zinc-400 font-bold leading-normal">
                  diaspedia &copy; {new Date().getFullYear()}. Financial accounts, matching layers, and travel companion details are powered in partnership with open global transit providers.
                </p>
              </div>

            </motion.div>
          )}

        </main>

        {/* BOTTOM TAB CAP NAVIGATION */}
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
            {activeTab === "trips" && <span className="text-xs tracking-tight font-medium">Overlaps</span>}
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
            {activeTab === "discover" && <span className="text-xs tracking-tight font-medium">Discover</span>}
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
            {activeTab === "messages" && <span className="text-xs tracking-tight font-medium">Messages</span>}
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
            {activeTab === "profile" && <span className="text-xs tracking-tight font-medium">Profile</span>}
          </button>
        </nav>

      </div>
    </div>
  );
}
