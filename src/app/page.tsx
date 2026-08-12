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
  ChevronRight,
  CheckCircle2,
  X,
  Bell,
  Check,
  Plus,
  Send,
  Shield,
  Clock,
  Sliders,
  Settings as SettingsIcon,
  MapPin,
  Info,
  Mic
} from "lucide-react";

import {
  MOCK_USER,
  MOCK_FRIENDS,
  MOCK_NOTIFICATIONS,
  UserProfile,
  Friend,
  TravelNotification
} from "@/lib/diaspediaData";

// Interfaces for our simplified Real-World Intent Platform
interface NowRequest {
  id: string;
  text: string;
  destination: string;
  status: "searching" | "matches" | "accepted";
  timestamp: string;
}

interface NowMatch {
  id: string;
  name: string;
  avatarBg: string;
  destination: string;
  timeRemaining: string;
  explanation: string;
  costSavingIdea: string;
  isVerified: boolean;
}

interface LaterPlan {
  id: string;
  destination: string;
  timing: string;
  route: string;
  details: string;
  hasOverlaps: boolean;
  overlaps: Array<{
    name: string;
    time: string;
    avatarBg: string;
    explanation: string;
    costSavingIdea: string;
  }>;
}

interface ChatMsg {
  id: string;
  sender: "user" | "partner" | "system";
  text: string;
  time: string;
}

export default function Home() {
  // Navigation: "now" | "later" | "settings"
  const [activeTab, setActiveTab] = useState<"now" | "later" | "settings">("now");

  // Authentication States (Mocked)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authProvider, setAuthProvider] = useState<"google" | "apple" | null>(null);

  // Onboarding Wizard State (Simplicity & Intent Platform focused)
  const [showWizard, setShowWizard] = useState<boolean>(false);
  const [wizardStep, setWizardStep] = useState<number>(1);

  // User details
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [notifications, setNotifications] = useState<TravelNotification[]>(MOCK_NOTIFICATIONS);

  // NOW state variables
  const [nowInputText, setNowInputText] = useState<string>("");
  const [nowRequest, setNowRequest] = useState<NowRequest | null>(null);
  const [nowProgress, setNowProgress] = useState<number>(100);
  const [activeMatches, setActiveMatches] = useState<NowMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<NowMatch | null>(null);
  const [chatLog, setChatLog] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState<string>("");

  // One detail at a time progressive state variables
  const [progressiveStage, setProgressiveStage] = useState<number>(0); // 0 = initial, 1 = going, 2 = starting, 3 = when, 4 = stopping
  const [progGoing, setProgGoing] = useState<string>("");
  const [progStarting, setProgStarting] = useState<string>("");
  const [progWhen, setProgWhen] = useState<string>("");
  const [progStopping, setProgStopping] = useState<string>("");

  // LATER state variables
  const [laterInputText, setLaterInputText] = useState<string>("");
  const [laterPlans, setLaterPlans] = useState<LaterPlan[]>([
    {
      id: "later-1",
      destination: "Munich",
      timing: "Next Friday",
      route: "Berlin → Munich",
      details: "Travelling for weekend leisure trip.",
      hasOverlaps: true,
      overlaps: [
        {
          name: "Sarah K.",
          time: "Friday Morning",
          avatarBg: "bg-zinc-800",
          explanation: "Sarah is taking the same ICE train from Berlin Central.",
          costSavingIdea: "Share a DB group-ticket pass to reduce the travel costs by up to 40%."
        }
      ]
    },
    {
      id: "later-2",
      destination: "Zanzibar",
      timing: "December",
      route: "Berlin → Zanzibar",
      details: "Winter escape holiday.",
      hasOverlaps: true,
      overlaps: [
        {
          name: "Alex Miller",
          time: "Mid December",
          avatarBg: "bg-zinc-700",
          explanation: "Alex is arriving at Zanzibar airport on December 12.",
          costSavingIdea: "Coordinate joint taxi transfer to the coastal resort to share costs."
        }
      ]
    }
  ]);

  // SETTINGS state variables
  const [workHoursStart, setWorkHoursStart] = useState<string>("09:00");
  const [workHoursEnd, setWorkHoursEnd] = useState<string>("17:00");
  const [workDays, setWorkDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [locationServices, setLocationServices] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [invisibleMode, setInvisibleMode] = useState<boolean>(false);
  const [privacyTetherEnabled, setPrivacyTetherEnabled] = useState<boolean>(true);

  // UI state feedback
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Scroll references
  const chatBottomRef = useRef<HTMLDivElement>(null);

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

  // Smooth chat auto-scrolling
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLog]);

  // Handle simulated countdown for active NOW matches
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined;
    if (nowRequest && nowRequest.status === "matches") {
      setNowProgress(100);
      interval = setInterval(() => {
        setNowProgress((prev) => {
          if (prev <= 1) {
            if (interval) clearInterval(interval);
            return 0;
          }
          return prev - 0.8; // gradual decrease
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [nowRequest]);

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
    setActiveTab("now");
    setNowRequest(null);
    setNowInputText("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("diaspedia_logged_in_v2");
      localStorage.removeItem("diaspedia_onboarded_v2");
    }
  };

  // Onboarding Wizard Complete
  const handleCompleteWizard = () => {
    setShowWizard(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("diaspedia_onboarded_v2", "true");
    }
    setActionFeedback("Welcome to Diaspedia!");
    setTimeout(() => setActionFeedback(null), 3000);
  };

  // Handle input submission for NOW tab (now with progressive details parse)
  const handleNowSubmit = (textToSubmit: string) => {
    if (!textToSubmit.trim()) return;

    // Detect if some parameters are already there
    let detectedDest = "";
    if (textToSubmit.toLowerCase().includes("airport") || textToSubmit.toLowerCase().includes("ber")) {
      detectedDest = "BER Airport";
    } else if (textToSubmit.toLowerCase().includes("station") || textToSubmit.toLowerCase().includes("train")) {
      detectedDest = "Central Train Station";
    } else if (textToSubmit.toLowerCase().includes("stadium")) {
      detectedDest = "Olympic Stadium";
    } else if (textToSubmit.toLowerCase().includes("munich")) {
      detectedDest = "Munich";
    } else if (textToSubmit.toLowerCase().includes("office")) {
      detectedDest = "Office Complex East";
    }

    // Set stage based on missing information
    if (!detectedDest) {
      setProgressiveStage(1); // Ask: Where are you going?
    } else {
      setProgGoing(detectedDest);
      setProgressiveStage(2); // Ask: Where are you starting from?
    }
  };

  const handleProgressiveNext = () => {
    if (progressiveStage === 1) {
      if (!progGoing.trim()) return;
      setProgressiveStage(2);
    } else if (progressiveStage === 2) {
      if (!progStarting.trim()) return;
      setProgressiveStage(3);
    } else if (progressiveStage === 3) {
      if (!progWhen.trim()) return;
      setProgressiveStage(4);
    } else if (progressiveStage === 4) {
      // Execute match creation!
      executeNowRequest(progGoing, progStarting, progWhen, progStopping);
    }
  };

  const executeNowRequest = (dest: string, start: string, when: string, stopping: string) => {
    const combinedText = `Heading to ${dest} starting from ${start} at ${when}${stopping ? ' stopping at ' + stopping : ''}`;

    setNowRequest({
      id: `now-${laterPlans.length + 1}`,
      text: combinedText,
      destination: dest,
      status: "searching",
      timestamp: "Just now"
    });

    setProgressiveStage(0);

    // Simulate natural AI parsing and real-time scanning
    setTimeout(() => {
      setActiveMatches([
        {
          id: "match-now-1",
          name: "Sarah K.",
          avatarBg: "bg-zinc-800",
          destination: dest,
          timeRemaining: "Leaving in 6 minutes",
          explanation: "Sarah is nearby and heading to the exact same place right now.",
          costSavingIdea: "Split a shared taxi or shuttle ride to cut costs directly in half.",
          isVerified: true
        },
        {
          id: "match-now-2",
          name: "Alex Miller",
          avatarBg: "bg-zinc-700",
          destination: dest,
          timeRemaining: "Leaving in 11 minutes",
          explanation: "Alex is departing shortly in your direction.",
          costSavingIdea: "Share Uber XL booking together to lower transit fees.",
          isVerified: true
        }
      ]);
      setNowRequest((prev) => prev ? { ...prev, status: "matches" } : null);
    }, 1800);
  };

  // Handle instant preset prompts for NOW
  const handlePresetNow = (prompt: string) => {
    setNowInputText(prompt);
    handleNowSubmit(prompt);
  };

  // Handle accepting a real-time NOW connection
  const handleGoTogether = (match: NowMatch) => {
    setSelectedMatch(match);
    setNowRequest((prev) => prev ? { ...prev, status: "accepted" } : null);

    // Seed chat
    setChatLog([
      { id: "sys-1", sender: "system", text: "Connection established! Always verify coordinates before departure.", time: "Just now" },
      { id: "sys-2", sender: "system", text: "Anti-Scam Check: Make payments directly to the actual taxi or transit provider. Avoid wiring/pooling funds directly with individuals.", time: "Just now" },
      { id: `part-1`, sender: "partner", text: `Hey! Awesome that we're going to the ${match.destination} at the same time. Let's meet at the main entrance.`, time: "Just now" }
    ]);

    // Create background matching notification
    setNotifications((prev) => [
      {
        id: `notif-${prev.length + 1}`,
        text: `You accepted ${match.name}'s request! Coordinate your trip in the active chat.`,
        time: "Just now",
        read: false,
        type: "join"
      },
      ...prev
    ]);
  };

  // Dismiss match
  const handleDismissMatch = (matchId: string) => {
    setActiveMatches((prev) => prev.filter((m) => m.id !== matchId));
    if (activeMatches.length <= 1) {
      // If no matches left, reset
      setActionFeedback("Keeping an eye out for more matches...");
      setTimeout(() => setActionFeedback(null), 2500);
    }
  };

  // Send a message in NOW chat
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMsg = {
      id: `user-msg-${chatLog.length + 1}`,
      sender: "user",
      text: chatInput.trim(),
      time: "Just now"
    };

    setChatLog((prev) => [...prev, userMsg]);
    setChatInput("");

    // Simulate brief partner reply
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          id: `reply-${prev.length + 1}`,
          sender: "partner",
          text: "Sounds great. I'll walk over there now. See you in a minute!",
          time: "Just now"
        }
      ]);
    }, 1500);
  };

  // Handle input submission for LATER tab
  const handleLaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!laterInputText.trim()) return;

    const textToSubmit = laterInputText.trim();
    setLaterInputText("");

    // Parse destination
    let dest = "Paris";
    let when = "Next Month";
    if (textToSubmit.toLowerCase().includes("munich")) {
      dest = "Munich";
      when = "Friday Morning";
    } else if (textToSubmit.toLowerCase().includes("zanzibar")) {
      dest = "Zanzibar";
      when = "December";
    } else if (textToSubmit.toLowerCase().includes("tokyo")) {
      dest = "Tokyo";
      when = "Next Spring";
    } else {
      // generic parser helper
      const words = textToSubmit.split(" ");
      const toIndex = words.findIndex(w => w.toLowerCase() === "to");
      if (toIndex > -1 && words[toIndex + 1]) {
        dest = words[toIndex + 1].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      }
    }

    const newPlan: LaterPlan = {
      id: `later-${laterPlans.length + 1}`,
      destination: dest.charAt(0).toUpperCase() + dest.slice(1),
      timing: when,
      route: `Berlin → ${dest.charAt(0).toUpperCase() + dest.slice(1)}`,
      details: textToSubmit,
      hasOverlaps: true,
      overlaps: [
        {
          name: "Maria Volkov",
          time: when,
          avatarBg: "bg-zinc-600",
          explanation: "Maria indicated plans to go to the exact same destination around then.",
          costSavingIdea: "Coordinate hotel booking and transfer shuttle options to trigger group discounts."
        }
      ]
    };

    setLaterPlans([newPlan, ...laterPlans]);
    setActionFeedback(`Added future plan to ${dest}! Diaspedia is keeping watch.`);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleToggleWorkDay = (day: string) => {
    if (workDays.includes(day)) {
      setWorkDays(workDays.filter((d) => d !== day));
    } else {
      setWorkDays([...workDays, day]);
    }
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
                  Real-World Intent Engine
                </span>
                <span className="font-heading font-black text-6xl tracking-tighter text-[#0F1419] select-none block leading-none">
                  diaspedia
                </span>
              </div>

              {/* Bold middle display text */}
              <div className="flex-1 flex flex-col justify-center text-left space-y-4 max-w-xs">
                <h1 className="text-2xl font-black font-heading leading-tight text-[#0F1419]">
                  Tell Diaspedia what you are doing. The system figures out the rest.
                </h1>
                <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                  A simple intent platform. State what you are doing now or later, and we instantly discover overlapping people, places, or savings.
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
        {/* INTRODUCTION WIZARD - NEW CORE INTENT CONCEPT */}
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
                      <span className="text-xs font-black uppercase text-brand-primary tracking-widest block">Step 01</span>
                      <h2 className="text-4xl font-heading font-black tracking-tight leading-none text-[#0F1419]">
                        GO SOMEWHERE.
                      </h2>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                        Whether you are heading to the airport right now, leaving your office, or planning a future flight, start moving.
                      </p>
                      <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-8 flex items-center justify-center chamfered-card">
                        <MapPin className="w-12 h-12 text-brand-primary" />
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
                      <span className="text-xs font-black uppercase text-brand-primary tracking-widest block">Step 02</span>
                      <h2 className="text-4xl font-heading font-black tracking-tight leading-none text-[#0F1419]">
                        TELL DIASPEDIA.
                      </h2>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                        Just tell Diaspedia what you are doing in simple human language. No complicated drop-down forms or parameters.
                      </p>
                      <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-8 flex items-center justify-center chamfered-card">
                        <Compass className="w-12 h-12 text-brand-primary" />
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
                      <span className="text-xs font-black uppercase text-brand-primary tracking-widest block">Step 03</span>
                      <h2 className="text-4xl font-heading font-black tracking-tight leading-none text-[#0F1419]">
                        WE FIND MATCHES.
                      </h2>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                        We scan the surrounding environment passively. We notify you as soon as overlapping passenger plans or transit matches emerge.
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
                      <span className="text-xs font-black uppercase text-brand-primary tracking-widest block">Step 04</span>
                      <h2 className="text-4xl font-heading font-black tracking-tight leading-none text-[#0F1419]">
                        SPEND LESS TOGETHER.
                      </h2>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                        Coordinate on the spot to split taxis, airport shuttle transfers, and group fares. Simplicity, passive discovery, and direct savings.
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
          {/* TAB 1: NOW SCREEN                         */}
          {/* ========================================= */}
          {activeTab === "now" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Introduction header */}
              <div className="pt-2">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
                  Live Intents
                </span>
                <h1 className="text-3xl font-heading font-black tracking-tight text-[#0F1419] leading-tight">
                  What are you doing?
                </h1>
              </div>

              {/* Singular, calm, open space supporting text and voice input with rotating subtle placeholder */}
              <div className="space-y-6">
                {progressiveStage === 0 ? (
                  <div className="bg-white border border-[#EFF3F4] p-6 space-y-4 shadow-sm chamfered-card">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-brand-text-muted uppercase tracking-wider block">
                        TELL DIASPEDIA
                      </span>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                        Simply explain what you are trying to do, and the system will figure it out.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <textarea
                          rows={3}
                          value={nowInputText}
                          onChange={(e) => setNowInputText(e.target.value)}
                          placeholder="e.g. I need to get to the airport in 20 minutes..."
                          className="w-full bg-[#F5F8FA] border border-[#EFF3F4] p-4 pr-12 text-xs font-semibold focus:outline-none focus:border-brand-primary rounded-none resize-none leading-relaxed"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const voices = [
                              "I'm going to BER airport right now.",
                              "I need to get to the train station.",
                              "I'm leaving the office in 10 minutes.",
                              "I need to get to the Olympic stadium."
                            ];
                            const randomVoice = voices[Math.floor(Math.random() * voices.length)];
                            setNowInputText(randomVoice);
                          }}
                          className="absolute right-3.5 bottom-4 p-2 text-zinc-400 hover:text-brand-primary active:scale-95 transition-all cursor-pointer"
                          title="Talk to Diaspedia"
                        >
                          <Mic size={18} />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          handleNowSubmit(nowInputText);
                        }}
                        disabled={!nowInputText.trim()}
                        className="w-full bg-[#0F1419] hover:bg-black text-white font-extrabold text-xs py-4 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed chamfered-card h-[52px]"
                      >
                        <span>SEND</span>
                        <ArrowRight size={14} className="text-brand-primary" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* One Detail At A Time sequential questions */
                  <div className="bg-white border border-[#EFF3F4] p-6 space-y-4 shadow-sm chamfered-card">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-brand-primary uppercase tracking-widest block">
                        REVEALING DETAILS
                      </span>
                      <button
                        onClick={() => {
                          setProgressiveStage(0);
                          setProgGoing("");
                          setProgStarting("");
                          setProgWhen("");
                          setProgStopping("");
                        }}
                        className="text-xs font-bold text-zinc-400 hover:text-zinc-600"
                      >
                        Reset Form
                      </button>
                    </div>

                    <div className="space-y-4">
                      {progressiveStage === 1 && (
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-zinc-500 uppercase block">Where are you going?</label>
                          <input
                            type="text"
                            value={progGoing}
                            onChange={(e) => setProgGoing(e.target.value)}
                            placeholder="e.g. BER Airport, Central Train Station..."
                            className="w-full bg-[#F5F8FA] border border-[#EFF3F4] p-3 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                          />
                        </div>
                      )}

                      {progressiveStage === 2 && (
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-zinc-500 uppercase block">Where are you starting from?</label>
                          <input
                            type="text"
                            value={progStarting}
                            onChange={(e) => setProgStarting(e.target.value)}
                            placeholder="e.g. Kreuzberg, Potsdamer Platz..."
                            className="w-full bg-[#F5F8FA] border border-[#EFF3F4] p-3 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                          />
                        </div>
                      )}

                      {progressiveStage === 3 && (
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-zinc-500 uppercase block">When are you going?</label>
                          <input
                            type="text"
                            value={progWhen}
                            onChange={(e) => setProgWhen(e.target.value)}
                            placeholder="e.g. In 20 minutes, at 6 tomorrow morning..."
                            className="w-full bg-[#F5F8FA] border border-[#EFF3F4] p-3 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                          />
                        </div>
                      )}

                      {progressiveStage === 4 && (
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-zinc-500 uppercase block">Are you stopping anywhere?</label>
                          <input
                            type="text"
                            value={progStopping}
                            onChange={(e) => setProgStopping(e.target.value)}
                            placeholder="e.g. No stops, picking up a friend..."
                            className="w-full bg-[#F5F8FA] border border-[#EFF3F4] p-3 text-xs font-semibold focus:outline-none focus:border-brand-primary"
                          />
                        </div>
                      )}

                      <button
                        onClick={handleProgressiveNext}
                        className="w-full bg-[#0F1419] hover:bg-black text-white font-extrabold text-xs py-4 transition-all flex items-center justify-center gap-1.5 cursor-pointer chamfered-card h-[52px]"
                      >
                        <span>{progressiveStage === 4 ? "FIND MATCHES" : "NEXT DETAIL"}</span>
                        <ArrowRight size={14} className="text-brand-primary" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* NOW INTENT LIFECYCLE: Searching, Matching or Accepted */}
              {nowRequest && (
                <div className="space-y-5 pt-2 border-t border-zinc-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-black text-brand-primary uppercase tracking-widest block">
                        ACTIVE INTENT NOW
                      </span>
                      <h3 className="text-lg font-heading font-black text-[#0F1419] mt-0.5 leading-tight">
                        &ldquo;{nowRequest.text}&rdquo;
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setNowRequest(null);
                        setSelectedMatch(null);
                        setNowInputText("");
                      }}
                      className="text-xs font-bold text-red-500 hover:underline px-2 py-1"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Conditionally display the OpenStreetMap view only when location context is active or match is accepted */}
                  {(nowRequest.status === "matches" || nowRequest.status === "accepted") && (
                    <div className="space-y-2">
                      <span className="text-xs font-black text-brand-text-muted uppercase tracking-widest block px-1">
                        Active Location Map
                      </span>
                      <div className="border border-[#EFF3F4] bg-zinc-100 relative overflow-hidden h-[220px] chamfered-card shadow-inner">
                        <iframe
                          src={
                            nowRequest.status === "accepted"
                              ? "https://www.openstreetmap.org/export/embed.html?bbox=13.35%2C52.48%2C13.45%2C52.54&layer=mapnik"
                              : "https://www.openstreetmap.org/export/embed.html?bbox=13.37%2C52.49%2C13.43%2C52.53&layer=mapnik"
                          }
                          className="w-full h-full border-0 rounded-none shadow-sm"
                          title="OpenStreetMap Frame"
                        />

                        {/* Map status indicator overlays - displaying 'COORDINATES IN SYNC' upon accept */}
                        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm border border-[#EFF3F4] p-2.5 flex items-center justify-between text-xs rounded-none shadow-md">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                            <span className="font-bold text-zinc-700">
                              {nowRequest.status === "accepted" ? "COORDINATES IN SYNC" : "ACTIVE ROUTE OVERLAPS"}
                            </span>
                          </div>
                          <span className="text-xs font-black uppercase text-zinc-400">{nowRequest.destination}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LOADING/SEARCHING STATUS STATE */}
                  {nowRequest.status === "searching" && (
                    <div className="bg-white border border-[#EFF3F4] p-8 text-center space-y-4 chamfered-card">
                      <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
                      <h4 className="text-xs font-black tracking-wider uppercase text-zinc-400">Scanning Surrounding Area</h4>
                      <p className="text-xs font-semibold text-brand-text-muted leading-relaxed max-w-xs mx-auto">
                        Diaspedia is extracting location coordinates and analyzing live matches going the same way. One moment...
                      </p>
                    </div>
                  )}

                  {/* MATCHES LISTING STATE: Elegant typographic layout, no boxes-within-boxes, pricing details or checkout UI */}
                  {nowRequest.status === "matches" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-baseline px-1">
                        <span className="text-xs font-black text-brand-text-muted uppercase tracking-widest block">
                          People heading your way
                        </span>
                        <span className="text-xs font-bold text-brand-primary">{activeMatches.length} matching now</span>
                      </div>

                      {activeMatches.length === 0 ? (
                        <div className="bg-white border border-[#EFF3F4] p-6 text-center text-xs font-semibold text-zinc-500 chamfered-card">
                          No active live requests in this direction right now. Keep watching?
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {activeMatches.map((match) => (
                            <div
                              key={match.id}
                              className="bg-white border border-[#EFF3F4] p-5 space-y-4 shadow-sm relative chamfered-card"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-8 h-8 rounded-full ${match.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                                    {match.name.slice(0, 1)}
                                  </div>
                                  <div>
                                    <h5 className="text-xs font-bold text-[#0F1419] flex items-center gap-1.5">
                                      <span>{match.name}</span>
                                      <span className="text-xs bg-brand-primary/10 text-brand-primary font-bold px-1.5 py-0.2 rounded uppercase">Verified</span>
                                    </h5>
                                    <p className="text-xs font-bold text-zinc-400">{match.timeRemaining}</p>
                                  </div>
                                </div>

                                <div className="text-xs bg-[#F5F8FA] border border-[#EFF3F4] text-zinc-600 font-extrabold px-2.5 py-0.5 uppercase">
                                  Nearby
                                </div>
                              </div>

                              <div className="space-y-2 text-xs">
                                <p className="font-semibold text-brand-text leading-relaxed">
                                  {match.explanation}
                                </p>
                                <div className="bg-[#F5F8FA] border-l-2 border-brand-primary p-3 flex items-start gap-2 text-xs">
                                  <Info size={14} className="text-brand-primary shrink-0 mt-0.5" />
                                  <span className="font-bold text-zinc-700">Cost saving idea: {match.costSavingIdea}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <div className="flex justify-between text-[11px] font-bold text-zinc-400 uppercase">
                                  <span>Request Expiry</span>
                                  <span>Time-Sensitive</span>
                                </div>
                                <div className="h-1.5 bg-zinc-100 rounded-none overflow-hidden">
                                  <div
                                    className="h-full bg-brand-primary transition-all duration-500 ease-linear"
                                    style={{ width: `${nowProgress}%` }}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2.5 pt-1">
                                <button
                                  onClick={() => handleDismissMatch(match.id)}
                                  className="bg-white border border-[#EFF3F4] text-zinc-500 hover:bg-zinc-50 font-bold text-xs py-3 cursor-pointer chamfered-card"
                                >
                                  NOT FOR ME
                                </button>
                                <button
                                  onClick={() => handleGoTogether(match)}
                                  className="bg-[#0F1419] hover:bg-black text-white font-extrabold text-xs py-3 cursor-pointer chamfered-card"
                                >
                                  GO TOGETHER
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ACCEPTED AND COORDINATION STATE */}
                  {nowRequest.status === "accepted" && selectedMatch && (
                    <div className="bg-white border-t-2 border-[#0F1419] p-5 space-y-4 shadow-sm chamfered-card">
                      <div className="flex justify-between items-center pb-3 border-b border-[#EFF3F4]">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${selectedMatch.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                            {selectedMatch.name.slice(0, 1)}
                          </div>
                          <div>
                            <h4 className="text-xs font-black uppercase text-brand-text-muted">Coordinate with {selectedMatch.name}</h4>
                            <p className="text-xs text-brand-primary font-bold">Sharing transit to {nowRequest.destination}</p>
                          </div>
                        </div>
                      </div>

                      {/* Message logs */}
                      <div className="h-[200px] overflow-y-auto space-y-3 p-1">
                        {chatLog.map((msg) => {
                          const isUser = msg.sender === "user";
                          const isSystem = msg.sender === "system";

                          if (isSystem) {
                            return (
                              <div key={msg.id} className="text-center py-1">
                                <span className="bg-brand-primary/10 border border-brand-primary/20 text-zinc-800 text-xs font-bold px-3 py-1 uppercase tracking-wider block leading-relaxed rounded-none">
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
                                  {isUser ? "YOU" : selectedMatch.name.toUpperCase()}
                                </span>
                                <div className={`p-3 text-xs leading-relaxed border-l-2 ${isUser ? "bg-[#0F1419] text-white border-[#0F1419]" : "bg-[#F5F8FA] text-[#0F1419] border-brand-primary font-semibold"} rounded-none`}>
                                  {msg.text}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={chatBottomRef} />
                      </div>

                      {/* Message input */}
                      <form onSubmit={handleSendChat} className="flex gap-2 border-t border-[#EFF3F4] pt-3 shrink-0">
                        <input
                          type="text"
                          required
                          placeholder="Type coordination message..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
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
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================= */}
          {/* TAB 2: LATER SCREEN                       */}
          {/* ========================================= */}
          {activeTab === "later" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="pt-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Future Intents
                </span>
                <h1 className="text-3xl font-heading font-black tracking-tight text-[#0F1419] leading-tight">
                  Going somewhere later?
                </h1>
              </div>

              {/* Singular, calm free-text plan entry box supporting text and voice input */}
              <div className="bg-white border border-[#EFF3F4] p-6 space-y-4 shadow-sm chamfered-card">
                <div className="space-y-1">
                  <span className="text-xs font-black text-brand-text-muted uppercase tracking-wider block">
                    TELL DIASPEDIA
                  </span>
                  <p className="text-xs font-semibold text-brand-text-muted leading-relaxed">
                    Tell us what you plan to do later in simple English. Diaspedia will remember and quietly look for overlaps.
                  </p>
                </div>

                <form onSubmit={handleLaterSubmit} className="space-y-4">
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={laterInputText}
                      onChange={(e) => setLaterInputText(e.target.value)}
                      placeholder="e.g. I'm going to Munich next Friday, or travelling to Zanzibar next month"
                      className="w-full bg-[#F5F8FA] border border-[#EFF3F4] p-4 pr-12 text-xs font-semibold focus:outline-none focus:border-brand-primary rounded-none resize-none leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const laterVoices = [
                          "I'm heading to Munich next Friday.",
                          "I'm travelling to Zanzibar next month.",
                          "I plan to visit Paris in December."
                        ];
                        const randomVoice = laterVoices[Math.floor(Math.random() * laterVoices.length)];
                        setLaterInputText(randomVoice);
                      }}
                      className="absolute right-3.5 bottom-4 p-2 text-zinc-400 hover:text-brand-primary active:scale-95 transition-all cursor-pointer"
                      title="Talk to Diaspedia"
                    >
                      <Mic size={18} />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!laterInputText.trim()}
                    className="w-full bg-[#0F1419] hover:bg-black text-white font-extrabold text-xs py-4 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed chamfered-card h-[52px]"
                  >
                    <span>SEND</span>
                    <ArrowRight size={14} className="text-brand-primary" />
                  </button>
                </form>
              </div>

              {/* PERSISTENT CALM PLANS LISTING - Airy typographic layout with zero visual clutter */}
              <div className="space-y-6 pt-4">
                <span className="text-xs font-black text-brand-text-muted uppercase tracking-widest block px-1">
                  Active Future Intents
                </span>

                <div className="space-y-6">
                  {laterPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white border border-[#EFF3F4] p-6 space-y-5 hover:border-zinc-300 transition-all chamfered-card shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-2xl font-heading font-black text-[#0F1419] uppercase tracking-tight leading-none">
                            {plan.destination}
                          </h4>
                          <p className="text-xs text-brand-primary font-bold mt-2 flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>{plan.timing}</span>
                          </p>
                          <p className="text-xs text-zinc-400 font-bold mt-1">
                            {plan.route}
                          </p>
                        </div>

                        <span className="text-xs bg-brand-primary/10 text-brand-primary border border-brand-primary/20 font-bold px-3 py-1 uppercase tracking-wider">
                          Active Search
                        </span>
                      </div>

                      <p className="text-xs text-brand-text-muted font-semibold leading-relaxed">
                        &ldquo;{plan.details}&rdquo;
                      </p>

                      {/* Display overlaps if found */}
                      {plan.hasOverlaps && (
                        <div className="space-y-4 pt-4 border-t border-[#EFF3F4]">
                          <span className="text-xs font-black text-brand-text-muted uppercase tracking-widest block">
                            Shared overlaps found
                          </span>

                          {plan.overlaps.map((overlap, oIdx) => (
                            <div key={oIdx} className="bg-[#F5F8FA] border border-[#EFF3F4] p-4 space-y-4 rounded-none">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-7 h-7 rounded-full ${overlap.avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
                                  {overlap.name.slice(0, 1)}
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#0F1419] block">{overlap.name}</span>
                                  <span className="text-xs text-zinc-400 font-bold">{overlap.time}</span>
                                </div>
                              </div>

                              <p className="text-xs text-brand-text-muted font-semibold leading-relaxed">
                                {overlap.explanation}
                              </p>

                              <div className="bg-white border-l-2 border-brand-primary p-3 flex items-start gap-2.5 text-xs">
                                <Shield size={14} className="text-brand-primary shrink-0 mt-0.5" />
                                <span className="font-bold text-zinc-700">Cost saving idea: {overlap.costSavingIdea}</span>
                              </div>

                              <button
                                onClick={() => {
                                  setActionFeedback(`Coordinating with ${overlap.name} initiated!`);
                                  setTimeout(() => setActionFeedback(null), 3000);
                                }}
                                className="w-full bg-[#0F1419] hover:bg-black text-white font-extrabold text-xs py-3.5 chamfered-card"
                              >
                                Join the group
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* TAB 3: SETTINGS SCREEN                    */}
          {/* ========================================= */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="pt-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Preferences
                </span>
                <h1 className="text-3xl font-heading font-black tracking-tight text-[#0F1419] leading-tight">
                  Settings
                </h1>
              </div>

              {/* Minimalist Profile detail card */}
              <div className="bg-white border border-[#EFF3F4] p-5 text-center space-y-3.5 shadow-sm relative chamfered-card">
                <div className="w-16 h-16 rounded-full bg-[#0F1419] flex items-center justify-center text-white text-2xl font-heading font-black mx-auto">
                  {userProfile.name.slice(0, 1)}
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase text-[#0F1419]">@{userProfile.username}</h3>
                  <p className="text-xs text-zinc-400 font-bold">Home: {userProfile.homeCity}</p>
                </div>

                <div className="pt-2 border-t border-[#EFF3F4]">
                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-red-500 hover:underline"
                  >
                    Logout Account
                  </button>
                </div>
              </div>

              {/* WORK HOURS SCHEDULER blockout control - Premium quiet luxury aesthetic: white background badges, grey pills */}
              <div className="bg-white border border-[#EFF3F4] p-6 space-y-5 shadow-sm chamfered-card">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#0F1419] uppercase tracking-wider block">
                      WHEN SHOULD DIASPEDIA REACH YOU?
                    </span>
                    <span className="inline-flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
                  </div>
                  <p className="text-xs text-brand-text-muted font-semibold leading-relaxed">
                    Suppress real-time matching requests and incoming notification alerts during your focus hours.
                  </p>
                </div>

                {/* Day selector pills */}
                <div className="flex flex-wrap gap-1.5">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                    const active = workDays.includes(day);
                    return (
                      <button
                        key={day}
                        onClick={() => handleToggleWorkDay(day)}
                        className={`text-xs font-bold px-3 py-2 border transition-all cursor-pointer ${
                          active
                            ? "bg-[#536471]/10 text-[#0F1419] border-[#536471]/30"
                            : "bg-white text-zinc-400 border-zinc-200 hover:bg-zinc-50"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Time range inputs */}
                <div className="grid grid-cols-2 gap-3.5 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-bold text-zinc-400 uppercase block">START TIME</span>
                    <input
                      type="time"
                      value={workHoursStart}
                      onChange={(e) => setWorkHoursStart(e.target.value)}
                      className="w-full bg-[#F5F8FA] border border-[#EFF3F4] p-2.5 font-bold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-bold text-zinc-400 uppercase block">END TIME</span>
                    <input
                      type="time"
                      value={workHoursEnd}
                      onChange={(e) => setWorkHoursEnd(e.target.value)}
                      className="w-full bg-[#F5F8FA] border border-[#EFF3F4] p-2.5 font-bold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-[#F5F8FA] p-3 text-xs font-semibold text-zinc-500 leading-relaxed border-l-2 border-[#536471]">
                  Alerts will be suppressed during {workHoursStart} &mdash; {workHoursEnd} on {workDays.join(", ")}.
                </div>
              </div>

              {/* Basic controls toggles */}
              <div className="bg-white border border-[#EFF3F4] p-5 shadow-sm space-y-4 chamfered-card">
                <span className="text-xs font-black tracking-wider uppercase text-brand-text-muted px-1">Privacy & Toggles</span>

                {/* Toggle 1 */}
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5 max-w-[80%]">
                    <span className="font-bold text-[#0F1419] block">Location Services</span>
                    <p className="text-xs text-brand-text-muted font-semibold">Enable real-time OpenStreetMap tracking for surrounding coincidences.</p>
                  </div>
                  <button
                    onClick={() => setLocationServices(!locationServices)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-all cursor-pointer flex ${
                      locationServices ? "bg-brand-primary justify-end" : "bg-zinc-200 justify-start"
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </button>
                </div>

                {/* Toggle 2 */}
                <div className="flex items-center justify-between text-xs border-t border-[#EFF3F4] pt-4">
                  <div className="space-y-0.5 max-w-[80%]">
                    <span className="font-bold text-[#0F1419] block">Push Notifications</span>
                    <p className="text-xs text-brand-text-muted font-semibold">Alert me instantly when a passenger overlap is discovered.</p>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-all cursor-pointer flex ${
                      pushNotifications ? "bg-brand-primary justify-end" : "bg-zinc-200 justify-start"
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </button>
                </div>

                {/* Toggle 3 */}
                <div className="flex items-center justify-between text-xs border-t border-[#EFF3F4] pt-4">
                  <div className="space-y-0.5 max-w-[80%]">
                    <span className="font-bold text-[#0F1419] block">Invisible Matching</span>
                    <p className="text-xs text-brand-text-muted font-semibold">Participate in matching without exposing your profile name directly.</p>
                  </div>
                  <button
                    onClick={() => setInvisibleMode(!invisibleMode)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-all cursor-pointer flex ${
                      invisibleMode ? "bg-brand-primary justify-end" : "bg-zinc-200 justify-start"
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </button>
                </div>

                {/* Toggle 4 */}
                <div className="flex items-center justify-between text-xs border-t border-[#EFF3F4] pt-4">
                  <div className="space-y-0.5 max-w-[80%]">
                    <span className="font-bold text-[#0F1419] block">Strict Verification Only</span>
                    <p className="text-xs text-brand-text-muted font-semibold">Only match me with users who have verified phone and ID credentials.</p>
                  </div>
                  <button
                    onClick={() => setPrivacyTetherEnabled(!privacyTetherEnabled)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-all cursor-pointer flex ${
                      privacyTetherEnabled ? "bg-brand-primary justify-end" : "bg-zinc-200 justify-start"
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              </div>

              {/* Dedicated Corporate Legal Links Footer - Sleek Flat */}
              <div className="bg-[#F5F8FA] border border-[#EFF3F4] p-5 text-center space-y-4 rounded-none">
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
                  diaspedia &copy; {new Date().getFullYear()}. Financial accounts, matching layers, and real-world companion details are powered in partnership with open global transit providers.
                </p>
              </div>
            </motion.div>
          )}

        </main>

        {/* ------------------------------------------ */}
        {/* PERSISTENT THREE-ITEM BOTTOM CAP NAVIGATION */}
        {/* ------------------------------------------ */}
        <nav className="absolute bottom-5 left-4 right-4 bg-[#0F1419] rounded-full px-4 py-2.5 flex justify-around items-center z-40 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab("now")}
            className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
              activeTab === "now" ? "text-white font-bold" : "text-white/60 hover:text-white"
            }`}
          >
            <Compass size={20} className={activeTab === "now" ? "text-white" : "text-white/60"} />
            <span className="text-xs tracking-tight uppercase font-black">NOW</span>
          </button>

          <button
            onClick={() => setActiveTab("later")}
            className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
              activeTab === "later" ? "text-white font-bold" : "text-white/60 hover:text-white"
            }`}
          >
            <Calendar size={20} className={activeTab === "later" ? "text-white" : "text-white/60"} />
            <span className="text-xs tracking-tight uppercase font-black">LATER</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
              activeTab === "settings" ? "text-white font-bold" : "text-white/60 hover:text-white"
            }`}
          >
            <User size={20} className={activeTab === "settings" ? "text-white" : "text-white/60"} />
            <span className="text-xs tracking-tight uppercase font-black">SETTINGS</span>
          </button>
        </nav>

      </div>
    </div>
  );
}
