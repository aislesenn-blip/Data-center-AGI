"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Calendar,
  User,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  X,
  Bell,
  Check,
  Plus,
  Bookmark,
  Send,
  Shield,
  Clock,
  Sparkles,
  Lock,
  Menu
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
  // Navigation: "home" | "plans" | "profile"
  const [activeTab, setActiveTab] = useState<"home" | "plans" | "profile">("home");

  // Authentication States (Mocked)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authProvider, setAuthProvider] = useState<"google" | "apple" | null>(null);

  // Onboarding Wizard State
  const [showWizard, setShowWizard] = useState<boolean>(false);
  const [wizardStep, setWizardStep] = useState<number>(1);

  // App States
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>(MOCK_TRAVEL_PLANS);
  const [travelMatches, setTravelMatches] = useState<TravelMatch[]>(MOCK_TRAVEL_MATCHES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [notifications, setNotifications] = useState<TravelNotification[]>(MOCK_NOTIFICATIONS);
  const [destinations, setDestinations] = useState<Destination[]>(MOCK_DESTINATIONS);
  const [friendsList, setFriendsList] = useState<Friend[]>(MOCK_FRIENDS);

  // Conversational AI Assistant Sheet State
  const [showAiAssistant, setShowAiAssistant] = useState<boolean>(false);
  const [aiAssistantStep, setAiAssistantStep] = useState<number>(1);
  const [aiInputText, setAiInputText] = useState<string>("");
  const [aiConversation, setAiConversation] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Hi! I'm your Diaspedia companion. Tell me, where are you going?" }
  ]);
  // Temporary builder variables for conversational creation
  const [aiTripTo, setAiTripTo] = useState("");
  const [aiTripFrom, setAiTripFrom] = useState("");
  const [aiTripDates, setAiTripDates] = useState("");
  const [aiTripStops, setAiTripStops] = useState("");

  // UI / Status feedback
  const [showNotifications, setShowNotifications] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [activeChatGroupId, setActiveChatGroupId] = useState<string | null>(null);
  const [chatInputText, setChatInputText] = useState("");

  // Sync contacts simulation
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);

  // Scroll references
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const aiBottomRef = useRef<HTMLDivElement>(null);

  // Cubic Bezier Easing: [0.22, 1, 0.36, 1]
  const premiumTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedInVal = localStorage.getItem("diaspedia_logged_in_v2") === "true";
      const onboardedVal = localStorage.getItem("diaspedia_onboarded_v2") === "true";

      if (loggedInVal) {
        setIsLoggedIn(true);
        if (!onboardedVal) {
          setShowWizard(true);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (activeChatGroupId && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChatGroupId, chatMessages]);

  useEffect(() => {
    if (showAiAssistant && aiBottomRef.current) {
      aiBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiConversation, showAiAssistant]);

  // Authenticate Mock Handler
  const handleAuth = (provider: "google" | "apple") => {
    setAuthLoading(true);
    setAuthProvider(provider);
    setTimeout(() => {
      setAuthLoading(false);
      setIsLoggedIn(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("diaspedia_logged_in_v2", "true");
        const onboardedVal = localStorage.getItem("diaspedia_onboarded_v2") === "true";
        if (!onboardedVal) {
          setShowWizard(true);
          setWizardStep(1);
        }
      }
    }, 1200);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowWizard(false);
    setActiveTab("home");
    if (typeof window !== "undefined") {
      localStorage.removeItem("diaspedia_logged_in_v2");
      localStorage.removeItem("diaspedia_onboarded_v2");
    }
  };

  // Complete Introduction Wizard
  const handleCompleteWizard = () => {
    setShowWizard(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("diaspedia_onboarded_v2", "true");
    }
    setActionFeedback("Welcome to Diaspedia!");
    setTimeout(() => setActionFeedback(null), 3000);
  };

  // Conversational plan creation / chat flow
  const handleAiMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInputText.trim()) return;

    const userText = aiInputText.trim();
    setAiConversation((prev) => [...prev, { sender: "user", text: userText }]);
    setAiInputText("");

    // One Detail At A Time wizard implementation inside the conversational sheet
    setTimeout(() => {
      if (aiAssistantStep === 1) {
        setAiTripTo(userText);
        setAiConversation((prev) => [
          ...prev,
          { sender: "ai", text: `Got it, ${userText}. Where are you starting your trip from?` }
        ]);
        setAiAssistantStep(2);
      } else if (aiAssistantStep === 2) {
        setAiTripFrom(userText);
        setAiConversation((prev) => [
          ...prev,
          { sender: "ai", text: "Nice! Around which dates will you be travelling? (e.g. Dec 10 - Dec 20)" }
        ]);
        setAiAssistantStep(3);
      } else if (aiAssistantStep === 3) {
        setAiTripDates(userText);
        setAiConversation((prev) => [
          ...prev,
          { sender: "ai", text: "Understood. Are you stopping anywhere along the way? (Type 'none' or list them)" }
        ]);
        setAiAssistantStep(4);
      } else if (aiAssistantStep === 4) {
        const stopsList = userText.toLowerCase() === "none" ? "" : userText;
        setAiTripStops(stopsList);

        // Build travel plan
        const newPlanId = `plan-${travelPlans.length + 1}`;
        const newPlan: TravelPlan = {
          id: newPlanId,
          fromCity: aiTripFrom,
          destinations: [aiTripTo],
          startDate: aiTripDates.split("-")[0]?.trim() || aiTripDates,
          endDate: aiTripDates.split("-")[1]?.trim() || aiTripDates,
          stops: stopsList ? stopsList.split(",").map((s) => s.trim()) : undefined,
          isCompleted: false,
          status: "searching"
        };

        setTravelPlans([newPlan, ...travelPlans]);
        setAiConversation((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `Perfect! I've added your trip to ${aiTripTo}. Diaspedia is now quietly running matches in the background. I will notify you when someone else is heading the same way!`
          }
        ]);
        setAiAssistantStep(5);

        // Add matching background notification
        setNotifications((prev) => [
          {
            id: `notif-${Date.now()}`,
            text: `Searching in the background for overlaps on your trip to ${aiTripTo}...`,
            time: "Just now",
            read: false,
            type: "match",
            planId: newPlanId
          },
          ...prev
        ]);
      } else {
        // Free-form conversational response
        let reply = "I am looking for overlapping trips. If any match is found, I'll alert you.";
        if (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("hi")) {
          reply = "Hello! Tell me if there is another trip you'd like to plan.";
        } else if (userText.toLowerCase().includes("zanzibar")) {
          reply = "Zanzibar is a hot destination! We already have Sarah K, Alex, and Maria Moscow matching overlaps around Dec 11-21.";
        }
        setAiConversation((prev) => [...prev, { sender: "ai", text: reply }]);
      }
    }, 1000);
  };

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
    setActionFeedback(`Added plan to ${dest.name}! Diaspedia is looking.`);
    setTimeout(() => setActionFeedback(null), 3000);
  };

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
      setActionFeedback(`Saved ${destName} to wishlist!`);
      setTimeout(() => setActionFeedback(null), 2000);
    }
  };

  // Join match group
  const handleJoinMatchGroup = (match: TravelMatch) => {
    const updatedMatches = travelMatches.map((m) => {
      if (m.id === match.id) {
        return { ...m, hasJoinedGroup: true };
      }
      return m;
    });
    setTravelMatches(updatedMatches);

    // Add user joining announcement message
    const systemMsg: ChatMessage = {
      id: `system-msg-${chatMessages.length + 1}`,
      chatGroupId: match.chatGroupId || "chat-zanzibar",
      senderUsername: "system",
      senderName: "Diaspedia",
      senderAvatarBg: "bg-brand-primary/10",
      text: `${userProfile.name} joined the discussion!`,
      timestamp: "Just now"
    };

    setChatMessages((prev) => [...prev, systemMsg]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        text: `You joined the Zanzibar cost-sharing discussion group!`,
        time: "Just now",
        read: false,
        type: "join"
      },
      ...prev
    ]);

    setActiveChatGroupId(match.chatGroupId || "chat-zanzibar");
    setActiveTab("plans");
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
      senderAvatarBg: "bg-[#0F1419]",
      text: chatInputText,
      timestamp: "Just now"
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInputText("");

    // Simulate direct provider booking tip after message
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `reply-${chatMessages.length + 2}`,
        chatGroupId: activeChatGroupId,
        senderUsername: "system",
        senderName: "Diaspedia Companion",
        senderAvatarBg: "bg-brand-primary/10",
        text: "Tip: For transfers and shuttle bookings, book directly with the transfer agency. We advise paying providers directly instead of sharing funds with other travelers.",
        timestamp: "Just now"
      };
      setChatMessages((prev) => [...prev, reply]);
    }, 2000);
  };

  const handleSyncContacts = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsSynced(true);
      setActionFeedback("Address book synced successfully!");
      setTimeout(() => setActionFeedback(null), 2500);
    }, 1500);
  };

  const resetAiAssistant = () => {
    setAiAssistantStep(1);
    setAiTripTo("");
    setAiTripFrom("");
    setAiTripDates("");
    setAiTripStops("");
    setAiConversation([
      { sender: "ai", text: "Hi! I'm your Diaspedia companion. Tell me, where are you going?" }
    ]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F5F8FA] text-[#0F1419] font-sans antialiased flex justify-center overflow-hidden">
      {/* Edge-to-edge premium mobile container shell */}
      <div className="w-full max-w-md bg-white h-[100dvh] relative flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.03)] overflow-hidden border-x border-zinc-100">

        {/* ------------------------------------------ */}
        {/* MOCK AUTHENTICATION SCREEN - EDITORIAL & GEOMETRIC */}
        {/* ------------------------------------------ */}
        <AnimatePresence>
          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={premiumTransition}
              className="absolute inset-0 bg-white z-[80] flex flex-col justify-between p-8 h-[100dvh] overflow-hidden"
            >
              {/* Spacious, premium top area */}
              <div className="pt-16 text-left space-y-1">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
                  European Transit Companion
                </span>
                <span className="font-heading font-black text-6xl tracking-tighter text-[#0F1419] select-none block leading-none">
                  diaspedia
                </span>
              </div>

              {/* Bold middle display text */}
              <div className="flex-1 flex flex-col justify-center text-left space-y-4 max-w-xs">
                <h1 className="text-2xl font-black font-heading leading-tight text-[#0F1419]">
                  Your trip might be cheaper when you go with others heading the same way.
                </h1>
                <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                  Diaspedia works passively in the background. Tell us where you are heading, and we&apos;ll look for overlapping passenger trips.
                </p>
              </div>

              {/* Sleek, Chamfered-Corner Action Buttons */}
              <div className="w-full space-y-3 pb-8">
                <button
                  type="button"
                  onClick={() => handleAuth("google")}
                  disabled={authLoading}
                  className="w-full bg-[#0F1419] hover:bg-black text-white font-bold text-xs py-4 px-6 shadow-sm transition-all cursor-pointer flex items-center justify-between chamfered-card h-[54px]"
                >
                  {authLoading && authProvider === "google" ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm">G</span>
                        <span>CONTINUE WITH GOOGLE</span>
                      </div>
                      <ArrowRight size={14} className="text-brand-primary" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleAuth("apple")}
                  disabled={authLoading}
                  className="w-full bg-white border border-[#EFF3F4] hover:bg-zinc-50 text-[#0F1419] font-bold text-xs py-4 px-6 shadow-sm transition-all cursor-pointer flex items-center justify-between chamfered-card h-[54px]"
                >
                  {authLoading && authProvider === "apple" ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm"></span>
                        <span>CONTINUE WITH APPLE</span>
                      </div>
                      <ArrowRight size={14} className="text-zinc-400" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ------------------------------------------ */}
        {/* INTRODUCTION WIZARD - EDITORIAL & GEOMETRIC */}
        {/* ------------------------------------------ */}
        <AnimatePresence>
          {isLoggedIn && showWizard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={premiumTransition}
              className="absolute inset-0 bg-white z-[70] flex flex-col justify-between p-8 h-[100dvh] overflow-hidden"
            >
              {/* Header Indicator */}
              <div className="flex justify-between items-center pt-4">
                <span className="font-heading font-black text-xl tracking-tighter text-brand-primary">diaspedia</span>
                <span className="text-xs font-bold text-zinc-400">Step {wizardStep} of 4</span>
              </div>

              {/* Wizard Content Slots */}
              <div className="flex-1 flex flex-col justify-center space-y-8 max-w-sm mx-auto w-full">
                <AnimatePresence mode="wait">
                  {wizardStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-5xl font-heading font-black tracking-tight leading-none text-[#0F1419]">
                        GO SOMEWHERE.
                      </h2>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                        Add your upcoming trips, destinations, or multiple stopovers easily in seconds.
                      </p>
                      <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-8 flex items-center justify-center chamfered-card">
                        <Compass className="w-12 h-12 text-brand-primary" />
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-5xl font-heading font-black tracking-tight leading-none text-[#0F1419]">
                        TELL DIASPEDIA.
                      </h2>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                        Just state your starting point, dates, or travel details conversationally. The app works passively behind the scenes.
                      </p>
                      <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-8 flex items-center justify-center chamfered-card">
                        <MessageSquare className="w-12 h-12 text-brand-primary" />
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-5xl font-heading font-black tracking-tight leading-none text-[#0F1419]">
                        WE PASSIVELY MATCH.
                      </h2>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                        No manual searches needed. We scan and alert you as soon as overlapping travel plans match.
                      </p>
                      <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-8 flex items-center justify-center chamfered-card">
                        <div className="flex gap-2.5">
                          <div className="w-4 h-4 bg-brand-primary" />
                          <div className="w-4 h-4 bg-zinc-300" />
                          <div className="w-4 h-4 bg-[#0F1419]" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ x: -20, opacity: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-5xl font-heading font-black tracking-tight leading-none text-[#0F1419]">
                        SPEND LESS TOGETHER.
                      </h2>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                        Coordinate to share transport taxis, airport shuttles, and activities without changing user behavior.
                      </p>
                      <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-8 flex items-center justify-center chamfered-card">
                        <Shield className="w-12 h-12 text-brand-primary" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sequential Action Button */}
              <div className="w-full pb-4 max-w-sm mx-auto">
                {wizardStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep((prev) => prev + 1)}
                    className="w-full bg-[#0F1419] hover:bg-black text-white font-bold text-xs py-4 px-6 shadow-sm transition-all cursor-pointer flex items-center justify-between chamfered-card h-[54px]"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight size={14} className="text-brand-primary" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompleteWizard}
                    className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs py-4 px-6 shadow-sm transition-all cursor-pointer flex items-center justify-between chamfered-card h-[54px]"
                  >
                    <span>START DIASPEDIA</span>
                    <Check size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ------------------------------------------ */}
        {/* MAIN APPLICATION SHIELD HEADER */}
        {/* ------------------------------------------ */}
        <header className="sticky top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-zinc-100 py-3.5 px-6 flex items-center justify-between z-30 shrink-0">
          <span className="font-heading font-black text-2xl tracking-tighter text-brand-primary select-none">
            diaspedia
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) {
                  setNotifications(notifications.map((n) => ({ ...n, read: true })));
                }
              }}
              className="relative w-9 h-9 rounded-xl bg-[#F5F8FA] hover:bg-zinc-100 flex items-center justify-center text-[#0F1419] active:scale-90 transition-all cursor-pointer"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs font-black w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* NOTIFICATIONS CONTAINER OVERLAY */}
        <AnimatePresence>
          {showNotifications && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-black/40 z-[45]"
                onClick={() => setShowNotifications(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[58px] left-4 right-4 bg-white border border-zinc-100 shadow-xl z-50 max-h-[70%] overflow-y-auto rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black tracking-wider uppercase text-zinc-400">Activity Alerts</h3>
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
                      className={`p-3.5 rounded-xl text-xs border transition-all ${
                        n.read ? "bg-white border-zinc-100" : "bg-brand-primary/5 border-brand-primary/20"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-semibold text-zinc-800 leading-relaxed">{n.text}</p>
                        <span className="text-xs text-zinc-400 font-bold shrink-0">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ACTION NOTIFICATIONS STATE FEEDBACK */}
        <AnimatePresence>
          {actionFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-[68px] left-6 right-6 bg-brand-primary text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{actionFeedback}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ------------------------------------------ */}
        {/* MAIN BODY SCROLLABLE ELEMENT */}
        {/* ------------------------------------------ */}
        <main className="flex-1 overflow-y-auto px-6 pt-5 pb-32 space-y-6 scroll-smooth bg-white">

          {/* ========================================= */}
          {/* TAB 1: HOME SCREEN                        */}
          {/* ========================================= */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Natural screen header info */}
              <div className="pt-2">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                  Welcome Back
                </span>
                <h1 className="text-3xl font-heading font-black tracking-tight text-[#0F1419] leading-tight">
                  Hello, {userProfile.name.split(" ")[0]}
                </h1>
              </div>

              {/* People You May Know: Story-style horizontal row sitting naturally on the page (no box!) */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-black text-brand-text-muted uppercase tracking-widest block">
                    People You May Know
                  </span>
                  <span className="text-[11px] font-bold text-brand-primary">Based on your routes</span>
                </div>

                <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-none">
                  {friendsList.map((f, idx) => {
                    // Give everyone a highly realistic travel purpose context
                    const purposes = [
                      "Also Zanzibar, July",
                      "Traveling Dec 10",
                      "Also Zanzibar, Dec",
                      "Going Munich, Feb"
                    ];
                    const purpose = purposes[idx % purposes.length];

                    return (
                      <div
                        key={`friend-story-${idx}`}
                        className="flex flex-col items-center text-center shrink-0 w-[94px] cursor-pointer"
                        onClick={() => {
                          setActionFeedback(`Selected @${f.username}`);
                          setTimeout(() => setActionFeedback(null), 1500);
                        }}
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-brand-primary p-0.5 transition-transform active:scale-95">
                          <div className={`w-full h-full rounded-full ${f.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                            {f.name.slice(0, 1)}
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#0F1419] mt-1.5 truncate w-full">{f.name.split(" ")[0]}</span>
                        <span className="text-[10px] font-semibold text-brand-text-muted leading-tight mt-0.5 block w-full truncate h-7">
                          {purpose}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Conversational Assistant entry: premium, crisp geometric silhouette with NO rounded corners */}
              <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-6 relative overflow-hidden space-y-4 chamfered-card">
                <div>
                  <span className="text-xs font-black text-brand-primary uppercase tracking-widest block">
                    Travel Companion
                  </span>
                  <h3 className="text-lg font-heading font-black text-[#0F1419] mt-0.5">
                    Tell us about your trip
                  </h3>
                </div>

                <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                  State your destination, departure details, or travel constraints naturally. We plan and passively scan matches, one detail at a time.
                </p>

                <button
                  onClick={() => {
                    resetAiAssistant();
                    setShowAiAssistant(true);
                  }}
                  className="w-full bg-[#0F1419] hover:bg-black text-white font-bold text-xs py-3.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer chamfered-card"
                >
                  <span>Start Conversation</span>
                  <ArrowRight size={14} className="text-brand-primary" />
                </button>
              </div>

              {/* Hero Plan Status State Block (Active upcoming plan or Empty State) */}
              <div className="space-y-4">
                <span className="text-xs font-black text-brand-text-muted uppercase tracking-widest block px-1">
                  Active Plans
                </span>

                {travelPlans.filter((p) => !p.isCompleted).length === 0 ? (
                  /* EMPTY STATE CARD - Crisp rectangular with chamfered boundaries */
                  <div className="bg-white border border-[#EFF3F4] p-6 text-center space-y-4 chamfered-card">
                    <h3 className="text-xs font-heading font-black uppercase text-[#0F1419] tracking-wider">
                      WHERE ARE YOU GOING?
                    </h3>
                    <p className="text-xs font-semibold text-brand-text-muted leading-relaxed max-w-xs mx-auto">
                      State your travel plans to initiate background tracking. We&apos;ll keep looking for matching passenger coordinates.
                    </p>
                    <button
                      onClick={() => {
                        resetAiAssistant();
                        setShowAiAssistant(true);
                      }}
                      className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs px-5 py-3.5 flex items-center justify-center gap-1.5 cursor-pointer chamfered-card w-full"
                    >
                      <Plus size={14} />
                      <span>ADD A TRIP</span>
                    </button>
                  </div>
                ) : (
                  /* HERO ACTIVE PLAN CARD - Crisp Geometric Silhouette */
                  <div className="space-y-3">
                    {travelPlans.filter((p) => !p.isCompleted).slice(0, 1).map((plan) => {
                      const matchesCount = travelMatches.filter((m) => m.planId === plan.id).length;
                      return (
                        <div
                          key={plan.id}
                          className="bg-white border border-[#EFF3F4] p-6 space-y-4 hover:border-zinc-300 transition-all cursor-pointer chamfered-card"
                          onClick={() => setActiveTab("plans")}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-xs text-brand-text-muted font-bold uppercase tracking-wider block">
                                UPCOMING TRIP HERO
                              </span>
                              <h3 className="text-xl font-heading font-black text-[#0F1419] leading-tight mt-1">
                                {plan.fromCity} → {plan.destinations.join(" → ")}
                              </h3>
                              <p className="text-xs text-brand-text-muted font-bold mt-1">
                                {plan.startDate} {plan.endDate ? `— ${plan.endDate}` : ""}
                                {plan.stops && plan.stops.length > 0 && ` • Stops: ${plan.stops.join(", ")}`}
                              </p>
                            </div>

                            {plan.status === "matches_found" ? (
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                                <span className="text-xs bg-brand-primary/10 text-brand-primary border border-brand-primary/20 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                  {matchesCount} Overlaps
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs bg-[#F5F8FA] text-zinc-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Scanning...
                              </span>
                            )}
                          </div>

                          {plan.status === "matches_found" && (
                            <div className="bg-[#F5F8FA] border-l-2 border-brand-primary p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                              <p className="font-semibold text-brand-text leading-normal">
                                We found overlapping trips on your route around December!
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTab("plans");
                                }}
                                className="bg-[#0F1419] hover:bg-black text-white font-bold text-xs px-4 py-2.5 shrink-0 transition-all cursor-pointer chamfered-card"
                              >
                                See overlaps
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Horizontal Lightweight Recommendations Card Section */}
              <div className="space-y-4">
                <span className="text-xs font-black text-brand-text-muted uppercase tracking-widest block px-1">
                  Trending Destinations
                </span>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                  {destinations.map((dest) => {
                    const isSaved = userProfile.wishlist.includes(dest.id);
                    return (
                      <div
                        key={dest.id}
                        className="w-[240px] bg-white border border-[#EFF3F4] p-4 shrink-0 flex flex-col justify-between space-y-4 shadow-sm hover:border-zinc-200 transition-all chamfered-card"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-heading font-black text-[#0F1419] leading-tight">
                              {dest.name}, <span className="text-zinc-400">{dest.country}</span>
                            </h4>
                            <button
                              onClick={() => handleToggleWishlist(dest.id, dest.name)}
                              className={`p-1.5 transition-all ${
                                isSaved ? "text-brand-primary bg-brand-primary/10" : "text-zinc-400 hover:text-zinc-600"
                              }`}
                            >
                              <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
                            </button>
                          </div>

                          <p className="text-xs text-brand-text-muted font-semibold leading-relaxed line-clamp-2">
                            {dest.description}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-2.5 border-t border-[#EFF3F4]">
                          <span className="text-xs text-zinc-400 font-bold">
                            {dest.friendsInterested.length} friends saved
                          </span>
                          <button
                            onClick={() => handleQuickAddDestination(dest)}
                            className="bg-brand-primary text-white hover:bg-brand-primary-hover font-bold text-[11px] px-3 py-1.5 chamfered-card"
                          >
                            Add Plan
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Contact Matching Section - sitting naturally on page (no container box!) */}
              <div className="border-t border-[#EFF3F4] pt-6 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black tracking-wider uppercase text-brand-text-muted">Sync with Friends</h4>
                  <p className="text-xs font-semibold text-brand-text-muted leading-normal">
                    Securely scan address book contacts to view which friends are currently using Diaspedia.
                  </p>
                </div>

                {!isSynced ? (
                  <button
                    onClick={handleSyncContacts}
                    disabled={isSyncing}
                    className="w-full bg-[#0F1419] hover:bg-black text-white font-bold text-xs py-3.5 transition-all cursor-pointer flex items-center justify-center gap-1.5 chamfered-card"
                  >
                    {isSyncing ? "Syncing..." : "Sync Contacts"}
                  </button>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div className="text-xs bg-[#71E300]/10 text-emerald-800 border border-[#71E300]/20 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      <span>Address book synced successfully!</span>
                    </div>

                    <div className="space-y-3">
                      {friendsList.slice(0, 3).map((f, idx) => (
                        <div key={`friend-item-${idx}`} className="flex items-center justify-between text-xs py-1 border-b border-[#EFF3F4]/40 last:border-b-0">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full ${f.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                              {f.name.slice(0, 1)}
                            </div>
                            <span className="font-bold text-brand-text">{f.name}</span>
                          </div>
                          <span className="text-xs text-zinc-400 font-bold bg-[#F5F8FA] px-2 py-0.5 rounded uppercase">
                            On Diaspedia
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* TAB 2: PLANS & OVERLAPS SCREEN            */}
          {/* ========================================= */}
          {activeTab === "plans" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-2xl font-heading font-black tracking-tight text-[#0F1419]">
                  My Travel Plans
                </h2>
                <p className="text-xs text-zinc-500">
                  Diaspedia looks for overlapping plans. Once found, join discussion groups to share cost.
                </p>
              </div>

              {/* ACTIVE PLANS LOOP - Crisp and Spacious */}
              <div className="space-y-4">
                {travelPlans.filter((p) => !p.isCompleted).map((plan) => {
                  const planMatches = travelMatches.filter((m) => m.planId === plan.id);
                  const isMatchFound = plan.status === "matches_found";

                  return (
                    <div
                      key={`plan-page-${plan.id}`}
                      className="bg-white border border-[#EFF3F4] p-6 space-y-5 chamfered-card"
                    >
                      <div className="flex justify-between items-start pb-1">
                        <div>
                          <span className="text-xs text-brand-text-muted font-black uppercase tracking-wider block">
                            ACTIVE PLAN
                          </span>
                          <h3 className="text-xl font-heading font-black text-[#0F1419] mt-1">
                            {plan.fromCity} → {plan.destinations.join(" → ")}
                          </h3>
                          <p className="text-xs text-brand-text-muted font-bold mt-1">
                            {plan.startDate} {plan.endDate ? `— ${plan.endDate}` : ""}
                            {plan.stops && plan.stops.length > 0 && ` • Stops: ${plan.stops.join(", ")}`}
                          </p>
                        </div>

                        {isMatchFound ? (
                          <span className="text-xs bg-brand-primary/10 text-brand-primary border border-brand-primary/20 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                            Overlaps Found
                          </span>
                        ) : (
                          <span className="text-xs bg-[#F5F8FA] text-zinc-400 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                            Scanning...
                          </span>
                        )}
                      </div>

                      {/* Overlaps sub-section - Pure architectural blocks */}
                      {isMatchFound && (
                        <div className="space-y-4 pt-4 border-t border-[#EFF3F4]">
                          <span className="text-xs font-black text-brand-text-muted uppercase tracking-widest block">
                            People heading the same way
                          </span>

                          <div className="space-y-4">
                            {planMatches.map((match) => (
                              <div
                                key={match.id}
                                className="bg-[#F5F8FA] border border-[#EFF3F4] p-4 space-y-4 rounded-none"
                              >
                                {/* Header with Profile information */}
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 rounded-full ${match.friendAvatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                      {match.friendName.slice(0, 1)}
                                    </div>
                                    <div>
                                      <h5 className="text-xs font-bold text-[#0F1419]">{match.friendName}</h5>
                                      <p className="text-xs text-brand-text-muted font-semibold">{match.fromCity} → {match.destinations.join(" → ")}</p>
                                    </div>
                                  </div>

                                  {/* Verification Badges */}
                                  <div className="flex items-center gap-1">
                                    {match.isPhoneVerified && <span className="text-xs bg-white text-zinc-500 font-bold px-1.5 py-0.5 border border-zinc-100 rounded-none">Phone✓</span>}
                                    {match.isEmailVerified && <span className="text-xs bg-white text-zinc-500 font-bold px-1.5 py-0.5 border border-zinc-100 rounded-none">Email✓</span>}
                                    {match.isIdVerified && <span className="text-xs bg-white text-zinc-500 font-bold px-1.5 py-0.5 border border-zinc-100 rounded-none">ID✓</span>}
                                  </div>
                                </div>

                                {/* Overlap metadata */}
                                <div className="text-xs text-brand-text font-medium space-y-1">
                                  <p className="flex items-center gap-1.5">
                                    <Clock size={13} className="text-brand-primary shrink-0" />
                                    <span>{match.overlapExplanation}</span>
                                  </p>
                                  <p className="text-xs text-brand-text-muted font-semibold pl-4.5">
                                    Dates: {match.startDate} — {match.endDate}
                                  </p>
                                </div>

                                {/* Shared costs categorization */}
                                <div className="flex flex-wrap gap-1.5 pl-0.5">
                                  {match.potentialSavings.map((item, idx) => (
                                    <span key={idx} className="bg-white border border-[#EFF3F4] px-2.5 py-1 rounded-none text-xs font-bold text-zinc-600">
                                      {item}
                                    </span>
                                  ))}
                                </div>

                                {/* Direct provider alert/tip */}
                                <div className="bg-white border-l-2 border-brand-primary p-3.5 rounded-none flex items-start gap-2.5">
                                  <Shield size={14} className="text-brand-primary shrink-0 mt-0.5" />
                                  <p className="text-xs text-brand-text-muted font-semibold leading-relaxed">
                                    Anti-Scam Tip: Secure taxi, hotel, or shuttle transfers directly. Pay actual providers rather than wiring or pooling funds with other travelers.
                                  </p>
                                </div>

                                {/* Join / Open chat - Chamfered button geometry */}
                                <div>
                                  {match.hasJoinedGroup ? (
                                    <button
                                      onClick={() => {
                                        setActiveChatGroupId(match.chatGroupId || "chat-zanzibar");
                                      }}
                                      className="w-full bg-[#0F1419] hover:bg-black text-white font-bold text-xs py-3 rounded-none flex items-center justify-center gap-1 cursor-pointer chamfered-card"
                                    >
                                      <MessageSquare size={14} />
                                      <span>Open Discussion</span>
                                    </button>
                                  ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                      <button
                                        onClick={() => {
                                          setTravelMatches(travelMatches.filter((m) => m.id !== match.id));
                                        }}
                                        className="bg-white border border-[#EFF3F4] text-zinc-400 font-bold text-xs py-3 rounded-none cursor-pointer chamfered-card"
                                      >
                                        Keep Looking
                                      </button>
                                      <button
                                        onClick={() => handleJoinMatchGroup(match)}
                                        className="bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-xs py-3 rounded-none cursor-pointer chamfered-card"
                                      >
                                        Join Group
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* INTEGRATED GROUP DISCUSSION CHAT COMPONENT */}
              {activeChatGroupId && (
                <div className="bg-white border-t-2 border-[#0F1419] p-6 space-y-4 shadow-sm animate-fade-in rounded-none">
                  <div className="flex justify-between items-center pb-3 border-b border-[#EFF3F4]">
                    <div>
                      <h4 className="text-xs font-black uppercase text-brand-text-muted tracking-widest">Zanzibar Shared Discussion</h4>
                      <p className="text-xs text-brand-primary font-bold">Coordination & Overlap</p>
                    </div>
                    <button
                      onClick={() => setActiveChatGroupId(null)}
                      className="p-1 rounded-none text-zinc-500 hover:text-black cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Messaging logs */}
                  <div className="h-[220px] overflow-y-auto space-y-3 p-1">
                    {chatMessages
                      .filter((msg) => msg.chatGroupId === activeChatGroupId)
                      .map((msg) => {
                        const isUser = msg.senderUsername === userProfile.username;
                        const isSystem = msg.senderUsername === "system";

                        if (isSystem) {
                          return (
                            <div key={msg.id} className="text-center py-1">
                              <span className="bg-brand-primary/10 border border-brand-primary/25 text-zinc-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {msg.text}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={msg.id}
                            className={`flex items-start gap-2.5 max-w-[90%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                          >
                            <div className="space-y-1 w-full">
                              <span className="text-xs text-zinc-400 font-bold block">
                                {isUser ? "YOU" : msg.senderName.toUpperCase()}
                              </span>
                              <div className={`p-3.5 text-xs leading-relaxed border-l-2 ${isUser ? "bg-[#0F1419] text-white border-[#0F1419]" : "bg-[#F5F8FA] text-[#0F1419] border-brand-primary font-semibold"} rounded-none`}>
                                {msg.text}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Message submit form */}
                  <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-[#EFF3F4] pt-3 shrink-0">
                    <input
                      type="text"
                      required
                      placeholder="Type coordination message..."
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      className="flex-1 bg-[#F5F8FA] border border-[#EFF3F4] px-4 py-3 text-xs font-semibold focus:outline-none focus:border-brand-primary rounded-none"
                    />
                    <button
                      type="submit"
                      className="bg-[#0F1419] text-white hover:bg-black w-11 h-11 rounded-none flex items-center justify-center transition-all cursor-pointer shrink-0"
                    >
                      <Send size={15} />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================= */}
          {/* TAB 3: PROFILE SCREEN                     */}
          {/* ========================================= */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Profile card with verified credentials - Chamfered */}
              <div className="bg-white border border-[#EFF3F4] p-6 text-center space-y-4 shadow-sm relative chamfered-card">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center text-white text-3xl font-heading font-black shadow-md mx-auto">
                    {userProfile.name.slice(0, 1)}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-lg font-heading font-black text-[#0F1419]">
                    @{userProfile.username}
                  </h3>
                  <p className="text-xs font-bold text-brand-text-muted">Home: {userProfile.homeCity}</p>
                </div>

                {/* Verified Indicators */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {userProfile.isPhoneVerified && (
                    <span className="text-xs bg-[#F5F8FA] border border-[#EFF3F4] text-zinc-800 font-extrabold px-3 py-1 rounded-none uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                      <span>Phone Verified</span>
                    </span>
                  )}
                  {userProfile.isEmailVerified && (
                    <span className="text-xs bg-[#F5F8FA] border border-[#EFF3F4] text-zinc-800 font-extrabold px-3 py-1 rounded-none uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                      <span>Email Verified</span>
                    </span>
                  )}
                  {userProfile.isIdVerified && (
                    <span className="text-xs bg-[#F5F8FA] border border-[#EFF3F4] text-zinc-800 font-extrabold px-3 py-1 rounded-none uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                      <span>ID Verified</span>
                    </span>
                  )}
                </div>

                {/* Logout Button */}
                <div className="pt-2">
                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    Logout Account
                  </button>
                </div>
              </div>

              {/* Travel Statistics - Crisp and Solid */}
              <div className="bg-[#0F1419] text-white p-6 space-y-4 shadow-lg chamfered-card">
                <div>
                  <span className="text-xs font-black text-brand-primary uppercase tracking-widest block">
                    Your Travel History
                  </span>
                  <h3 className="text-lg font-heading font-black tracking-tight mt-0.5">Travel Analytics</h3>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-white/5 border border-white/10 rounded-none p-3.5">
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-wider block">KILOMETERS</span>
                    <div className="text-lg font-heading font-black text-brand-primary mt-0.5">
                      {userProfile.totalKmTraveled.toLocaleString()} km
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-none p-3.5">
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-wider block">CITIES VISITED</span>
                    <div className="text-lg font-heading font-black text-brand-primary mt-0.5">
                      {userProfile.totalCitiesVisited}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-none p-3.5">
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-wider block">TOTAL PLANS</span>
                    <div className="text-lg font-heading font-black text-zinc-100 mt-0.5">
                      {userProfile.totalTripsCount}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-none p-3.5">
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-wider block">CO2 REDUCED</span>
                    <div className="text-lg font-heading font-black text-brand-primary mt-0.5">
                      -{userProfile.carbonSavedKg.toFixed(0)} kg
                    </div>
                  </div>
                </div>

                {/* Completed Plans list */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-widest block">
                    Completed Travel Plans
                  </span>
                  {travelPlans.filter((p) => p.isCompleted).map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white/5 p-3 flex justify-between items-center text-xs rounded-none border-b border-white/5 last:border-b-0"
                    >
                      <div>
                        <div className="font-bold text-zinc-200">{plan.fromCity} → {plan.destinations.join(" → ")}</div>
                        <span className="text-xs text-zinc-400 font-medium">{plan.startDate}</span>
                      </div>
                      <span className="text-brand-primary font-bold">Archived</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversational Profile Edits Option - Crisp */}
              <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-6 space-y-4 chamfered-card">
                <div className="space-y-1">
                  <h4 className="text-xs font-black uppercase text-brand-text-muted">Edit Profile via Conversation</h4>
                  <p className="text-xs text-brand-text-muted font-semibold leading-relaxed">
                    Modify home cities, residency, passport details, or travel settings dynamically using speech.
                  </p>
                </div>

                <button
                  onClick={() => {
                    resetAiAssistant();
                    setAiConversation([
                      { sender: "ai", text: "Hi! Want to update your profile details? Tell me what needs to be updated." }
                    ]);
                    setShowAiAssistant(true);
                  }}
                  className="w-full bg-white border border-[#EFF3F4] text-zinc-800 font-bold text-xs py-3 cursor-pointer chamfered-card"
                >
                  <span>Talk with Assistant</span>
                </button>
              </div>

              {/* Background Matching Settings Privacy Toggles - Chamfered */}
              <div className="bg-white border border-[#EFF3F4] p-6 shadow-sm space-y-4 chamfered-card">
                <h3 className="text-xs font-black tracking-wider uppercase text-brand-text-muted px-1">Privacy Controls</h3>

                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-1 max-w-[80%]">
                    <span className="font-bold text-[#0F1419] block">Share Saved Travel Plans</span>
                    <p className="text-xs text-brand-text-muted font-semibold">Allow connected friends on Diaspedia to see your active travels.</p>
                  </div>
                  <div className="w-10 h-6 bg-brand-primary rounded-full p-0.5 cursor-pointer flex justify-end shrink-0">
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-[#EFF3F4] pt-4">
                  <div className="space-y-1 max-w-[80%]">
                    <span className="font-bold text-[#0F1419] block">Background Matching</span>
                    <p className="text-xs text-brand-text-muted font-semibold">Scan background overlaps for shared travel costs automatically.</p>
                  </div>
                  <div className="w-10 h-6 bg-brand-primary rounded-full p-0.5 cursor-pointer flex justify-end shrink-0">
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Dedicated Corporate Legal Links Footer - Sleek Flat */}
              <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-6 text-center space-y-4 rounded-none">
                <span className="text-xs font-black text-brand-text-muted uppercase tracking-widest block">
                  diaspedia Corporation
                </span>
                <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-zinc-600">
                  <Link href="/careers" className="hover:text-brand-primary hover:underline">Careers</Link>
                  <Link href="/privacy" className="hover:text-brand-primary hover:underline">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-brand-primary hover:underline">Terms of Service</Link>
                  <Link href="/cookies" className="hover:text-brand-primary hover:underline">Cookie Policy</Link>
                </div>
                <p className="text-xs text-zinc-400 font-semibold leading-normal">
                  diaspedia &copy; {new Date().getFullYear()}. Financial accounts, matching layers, and travel companion details are powered in partnership with open global transit providers.
                </p>
              </div>
            </motion.div>
          )}

        </main>

        {/* ------------------------------------------ */}
        {/* LIGHTWEIGHT CONVERSATIONAL ASSISTANT DRAWER */}
        {/* ------------------------------------------ */}
        <AnimatePresence>
          {showAiAssistant && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black z-50"
                onClick={() => setShowAiAssistant(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-[#0F1419] z-[55] p-6 space-y-4 max-h-[85%] flex flex-col overflow-hidden shadow-2xl rounded-none"
              >
                {/* Drawer Header - Sleek Minimalist */}
                <div className="flex justify-between items-center pb-3 border-b border-[#EFF3F4] shrink-0">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#0F1419]">Diaspedia Companion</h3>
                    <p className="text-xs text-brand-text-muted font-bold">One detail at a time</p>
                  </div>

                  <button
                    onClick={() => setShowAiAssistant(false)}
                    className="p-1 rounded-none text-zinc-500 hover:text-black cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Progress Indicators for Conversational Steps */}
                {aiAssistantStep <= 4 && (
                  <div className="flex gap-1.5 h-1 bg-zinc-100 rounded-none overflow-hidden shrink-0">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={`ai-step-${step}`}
                        className={`flex-1 h-full rounded-none transition-all ${
                          step <= aiAssistantStep ? "bg-brand-primary" : "bg-zinc-100"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Dialogue log container - Structured and Editorial */}
                <div className="flex-1 overflow-y-auto space-y-4 py-2 scrollbar-none">
                  {aiConversation.map((msg, idx) => (
                    <div
                      key={`ai-msg-${idx}`}
                      className={`flex items-start gap-3 max-w-[90%] ${
                        msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      }`}
                    >
                      <div className="space-y-1 w-full">
                        <span className="text-xs text-zinc-400 font-bold block">
                          {msg.sender === "user" ? "YOU" : "DIASPEDIA"}
                        </span>

                        <div className={`p-4 text-xs leading-relaxed border-l-2 ${
                          msg.sender === "user"
                            ? "bg-[#0F1419] text-white border-[#0F1419] font-bold"
                            : "bg-[#F5F8FA] text-[#0F1419] border-brand-primary font-semibold"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={aiBottomRef} />
                </div>

                {/* Bottom messaging input box - Chamfered Corner */}
                <form onSubmit={handleAiMessageSubmit} className="flex gap-2 border-t border-[#EFF3F4] pt-3 shrink-0">
                  <input
                    type="text"
                    required
                    placeholder={
                      aiAssistantStep === 1
                        ? "e.g. Zanzibar"
                        : aiAssistantStep === 2
                        ? "e.g. Berlin"
                        : aiAssistantStep === 3
                        ? "e.g. Dec 10 - Dec 20"
                        : aiAssistantStep === 4
                        ? "e.g. none"
                        : "Ask anything..."
                    }
                    value={aiInputText}
                    onChange={(e) => setAiInputText(e.target.value)}
                    className="flex-1 bg-[#F5F8FA] border border-[#EFF3F4] px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-brand-primary rounded-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#0F1419] text-white hover:bg-black w-12 h-12 rounded-none flex items-center justify-center transition-all cursor-pointer shrink-0"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ------------------------------------------ */}
        {/* PERSISTENT THREE-ITEM BOTTOM CAP NAVIGATION */}
        {/* ------------------------------------------ */}
        <nav className="absolute bottom-5 left-4 right-4 bg-[#0F1419] rounded-full px-4 py-2.5 flex justify-around items-center z-40 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/5 shrink-0">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
              activeTab === "home" ? "text-brand-primary font-bold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Compass size={20} className={activeTab === "home" ? "text-brand-primary" : "text-zinc-500"} />
            <span className="text-xs tracking-tight">Home</span>
          </button>

          <button
            onClick={() => setActiveTab("plans")}
            className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
              activeTab === "plans" ? "text-brand-primary font-bold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Calendar size={20} className={activeTab === "plans" ? "text-brand-primary" : "text-zinc-500"} />
            <span className="text-xs tracking-tight">Plans</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
              activeTab === "profile" ? "text-brand-primary font-bold" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <User size={20} className={activeTab === "profile" ? "text-brand-primary" : "text-zinc-500"} />
            <span className="text-xs tracking-tight">Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
}
