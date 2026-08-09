"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Plus,
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  User,
  Users,
  Bell,
  ChevronRight,
  Check,
  CheckCircle2,
  Clock,
  Info,
  X,
  Globe,
  Activity,
  Compass,
  Briefcase,
  FileText,
  DollarSign,
  Euro,
  Sparkles,
  ShieldAlert,
  Percent,
  TrendingUp,
  RotateCcw,
  Upload,
  Lock,
  Unlock,
  Building,
  MapPin,
  Calendar
} from "lucide-react";

import {
  MOCK_USER,
  MOCK_CARD,
  MOCK_TRANSACTIONS,
  MOCK_TAX_CLAIMS,
  UserProfile,
  CardDetail,
  Transaction,
  TaxClaim
} from "@/lib/diaspediaData";

export default function Home() {
  // Navigation State: Home, Card, Activity, Tax, Profile
  const [activeTab, setActiveTab] = useState<"home" | "card" | "activity" | "tax" | "profile" >("home");

  // Onboarding Splash
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // App States
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [card, setCard] = useState<CardDetail>(MOCK_CARD);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [taxClaims, setTaxClaims] = useState<TaxClaim[]>(MOCK_TAX_CLAIMS);

  // Selected Transaction for receipt upload or detail modal
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Claim/Simulation state
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const [simulatedLoading, setSimulatedLoading] = useState<boolean>(false);
  const [claimSuccess, setClaimSuccess] = useState<boolean>(false);

  // Receipt Upload form simulation state
  const [receiptFile, setReceiptFile] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Add Money Dialog state
  const [showAddMoney, setShowAddMoney] = useState<boolean>(false);
  const [addAmount, setAddAmount] = useState<string>("");
  const [addMoneyLoading, setAddMoneyLoading] = useState<boolean>(false);
  const [addMoneySuccess, setAddMoneySuccess] = useState<boolean>(false);

  // Notifications drawer simulation
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; time: string; read: boolean }>>([
    { id: "n1", text: "Your tax claim of €135.50 for Apple Store Kurfürstendamm has been paid directly to your balance!", time: "2h ago", read: false },
    { id: "n2", text: "New transaction detected at KaDeWe: €220.00. Upload receipt to unlock €35.10 tax refund.", time: "4h ago", read: false },
    { id: "n3", text: "Your physical card is in transit. Expected delivery: Tuesday.", time: "1d ago", read: true }
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onboarded = localStorage.getItem("diaspedia_neobank_onboarded_v3");
      if (onboarded === "true") {
        setShowSplash(false);
      }
    }
  }, []);

  const handleDismissSplash = () => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("diaspedia_neobank_onboarded_v3", "true");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Toggle card lock
  const handleToggleLockCard = () => {
    setCard(prev => ({
      ...prev,
      isLocked: !prev.isLocked
    }));
    // Add notification
    setNotifications(prev => [
      {
        id: `n-${Date.now()}`,
        text: `Card successfully ${!card.isLocked ? "frozen" : "unfrozen"}.`,
        time: "Just now",
        read: false
      },
      ...prev
    ]);
  };

  // Quick actions
  const triggerAddMoney = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(addAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    setAddMoneyLoading(true);
    setTimeout(() => {
      setAddMoneyLoading(false);
      setAddMoneySuccess(true);
      setUserProfile(prev => ({
        ...prev,
        balance: prev.balance + parsedAmount
      }));

      // Set notifications
      setNotifications(prev => [
        {
          id: `n-${Date.now()}`,
          text: `Funded account with €${parsedAmount.toFixed(2)} successfully.`,
          time: "Just now",
          read: false
        },
        ...prev
      ]);

      setTimeout(() => {
        setShowAddMoney(false);
        setAddMoneySuccess(false);
        setAddAmount("");
      }, 1200);
    }, 1200);
  };

  // Handle transaction claim / receipt uploading
  const handleStartClaim = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsClaiming(true);
    setUploadSuccess(false);
  };

  const handleConfirmReceiptUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTx) return;

    setSimulatedLoading(true);

    setTimeout(() => {
      setSimulatedLoading(false);
      setUploadSuccess(true);

      // Update specific transaction
      setTransactions(prevTxs =>
        prevTxs.map(t => {
          if (t.id === selectedTx.id) {
            return {
              ...t,
              receiptUploaded: true,
              status: "Claim Filed"
            };
          }
          return t;
        })
      );

      // Add dynamic tax claim record
      const matchedClaim = taxClaims.find(c => c.merchantName === selectedTx.merchantName);
      if (!matchedClaim) {
        const newClaim: TaxClaim = {
          id: `clm-${Date.now()}`,
          merchantName: selectedTx.merchantName,
          date: "Today",
          purchaseAmount: selectedTx.amountSpent,
          refundAmount: selectedTx.taxRefundAmount,
          status: "Reviewing",
          progressPercent: 33
        };
        setTaxClaims([newClaim, ...taxClaims]);
      }

      // Update profile pending refund stats
      setUserProfile(prev => ({
        ...prev,
        pendingTaxRefunds: prev.pendingTaxRefunds + selectedTx.taxRefundAmount
      }));

      // Set notification
      setNotifications(prev => [
        {
          id: `n-${Date.now()}`,
          text: `Receipt for ${selectedTx.merchantName} verified! Claim of €${selectedTx.taxRefundAmount.toFixed(2)} filed successfully.`,
          time: "Just now",
          read: false
        },
        ...prev
      ]);

      setTimeout(() => {
        setIsClaiming(false);
        setSelectedTx(null);
        setActiveTab("tax"); // Redirect to Tax tab to visualize their interactive progress
      }, 1500);

    }, 1200);
  };

  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
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
                  The neobank for international residents in Europe. Canada, US, and other non-EU citizens spend normally and claim their tax back instantly.
                </p>
              </div>

              {/* Wedge Statement Block */}
              <div className="bg-white p-5 rounded-3xl border border-black/[0.04] shadow-sm text-center max-w-sm mx-auto space-y-2">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Our wedge is simple</p>
                <blockquote className="text-sm font-extrabold tracking-tight text-black italic">
                  “With Diaspedia, the tax you pay when you spend in Europe is given back to you.”
                </blockquote>
              </div>

              {/* Onboarding Features Summary */}
              <div className="space-y-2.5 max-w-sm mx-auto w-full py-2">
                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Building size={15} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">1. Open a Euro Account</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Instant IBAN designed for expats and international students.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <CreditCard size={15} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">2. Get Your Debit Card</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Use virtual or physical debit cards for normal everyday spending.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Percent size={15} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">3. Auto Tax Recovery</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Every eligible purchase detects tax and refunds it instantly.</p>
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
                  <span>Open Your Account</span>
                  <ArrowRight size={14} className="text-[#71E300]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER BAR */}
        <header className="sticky top-0 left-0 right-0 bg-[#F6F4ED]/85 backdrop-blur-md border-b border-b-black/[0.04] py-3 px-4 flex items-center justify-between z-30 shrink-0">
          <span className="font-heading font-black text-2xl tracking-tighter text-[#0f1115] select-none">diaspedia</span>

          <div className="flex items-center gap-2">
            {/* Notification Button */}
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markAllNotificationsRead();
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

        {/* NOTIFICATIONS PANEL (SMOOTH TRANSITION ANIMATIONS) */}
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
                  <h3 className="text-sm font-black font-heading tracking-tight">Account Alerts</h3>
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

        {/* DIALOG: ADD MONEY (Inline-form overlays) */}
        <AnimatePresence>
          {showAddMoney && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black z-50"
                onClick={() => {
                  if (!addMoneyLoading) setShowAddMoney(false);
                }}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-12px_32px_rgba(0,0,0,0.15)] z-50 p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-black font-heading">Add Money to Account</h3>
                  <button onClick={() => setShowAddMoney(false)} className="p-1 rounded-full bg-zinc-100 hover:bg-zinc-200">
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={triggerAddMoney} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Deposit Amount (EUR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-sm text-zinc-500">€</span>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="0.00"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                        className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl py-3 pl-8 pr-3 text-sm font-bold text-zinc-800 focus:outline-none focus:border-[#71E300]"
                      />
                    </div>
                  </div>

                  <div className="bg-[#F6F4ED] p-3 rounded-xl space-y-1">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Recipient IBAN</span>
                    <p className="text-xs font-bold text-zinc-800 font-mono">{userProfile.accountIban}</p>
                  </div>

                  {addMoneySuccess ? (
                    <div className="text-center py-2">
                      <CheckCircle2 size={24} className="mx-auto text-[#5ec700] mb-1" />
                      <p className="text-xs font-bold text-zinc-800">Deposit successful!</p>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={addMoneyLoading}
                      className="w-full bg-black text-white py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      {addMoneyLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Confirm Deposit</span>
                      )}
                    </button>
                  )}
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN INDEPENDENTLY SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-32 space-y-5 scroll-smooth">

          {/* 1. HOME TAB */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Profile Greeting */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-400">Welcome back</h4>
                  <h2 className="text-2xl font-black font-heading tracking-tight text-[#0f1115] leading-tight">{userProfile.name}</h2>
                </div>
                <div className="bg-white/70 border border-black/[0.04] px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#71E300]" />
                  <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">{userProfile.passportCountry} Passport</span>
                </div>
              </div>

              {/* PREMIUM BALANCE AND REFUND HIGHLIGHT CARDS (Double-stuffed Grid) */}
              <div className="grid grid-cols-1 gap-3">

                {/* Balance & Funding block */}
                <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Available Balance</span>
                      <h2 className="text-3xl font-black text-black tracking-tight leading-none">
                        €{userProfile.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowAddMoney(true)}
                      className="bg-black hover:bg-zinc-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={14} className="text-[#71E300]" />
                      <span>Add Money</span>
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-2.5 border-t border-black/[0.03] text-xs">
                    <div className="text-zinc-500 font-medium">IBAN: <span className="font-mono font-bold text-zinc-700">{userProfile.accountIban.slice(0, 15)}...</span></div>
                    <div className="text-zinc-400 font-bold uppercase text-[10px]">Active Account</div>
                  </div>
                </div>

                {/* Tax Recovery Metric - TANGIBLE REFUNDS PORTRAIT */}
                <div className="bg-zinc-900 text-white p-5 rounded-3xl border border-zinc-800 shadow-lg space-y-3.5 relative overflow-hidden">

                  {/* Subtle accent backdrop indicator */}
                  <div className="absolute right-0 top-0 bottom-0 w-24 bg-[#71E300]/10 rounded-l-full filter blur-xl pointer-events-none" />

                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Tax Returned</span>
                      <h3 className="text-3xl font-black text-[#71E300] tracking-tight leading-none">
                        +€{userProfile.totalTaxReturned.toFixed(2)}
                      </h3>
                    </div>
                    <div className="bg-white/10 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Pending: €{userProfile.pendingTaxRefunds.toFixed(2)}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#71E300] shrink-0" />
                    <p className="text-[11px] text-zinc-300 font-medium leading-normal">
                      With Diaspedia, you have saved <span className="font-bold text-white">€{userProfile.totalTaxReturned.toFixed(2)}</span> on VAT. That's money returned straight to your bank balance.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD PREVIEW SLIDER PREVIEW */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase">My Cards</h4>
                  <button onClick={() => setActiveTab("card")} className="text-xs font-bold text-zinc-500 hover:text-black flex items-center gap-0.5">
                    <span>Manage Card</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Mini Visual Card Preview */}
                <div className="bg-zinc-950 p-4 rounded-2xl text-white flex justify-between items-center shadow-md relative overflow-hidden">
                  <div className="space-y-1 z-10">
                    <span className="text-[10px] text-zinc-400 font-bold tracking-widest">VIRTUAL DEBIT</span>
                    <h5 className="font-mono text-sm tracking-widest font-black">
                      •••• •••• •••• {card.cardNumber.slice(-4)}
                    </h5>
                  </div>
                  <div className="text-right z-10 flex flex-col items-end gap-1.5">
                    <span className="text-xs font-bold text-[#71E300]">DIASPEDIA</span>
                    {card.isLocked ? (
                      <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                        <Lock size={10} /> Frozen
                      </span>
                    ) : (
                      <span className="text-[10px] bg-[#71E300]/20 text-[#71E300] border border-[#71E300]/30 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                        <Unlock size={10} /> Active
                      </span>
                    )}
                  </div>
                  {/* Subtle graphic layout */}
                  <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-[#71E300]/5 rounded-full pointer-events-none" />
                </div>
              </div>

              {/* RECENT TRANSACTIONS (Activity feed) */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase">Recent Purchases</h4>
                  <button onClick={() => setActiveTab("activity")} className="text-xs font-bold text-zinc-500 hover:text-black flex items-center gap-0.5">
                    <span>View All</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  {transactions.slice(0, 3).map((tx) => (
                    <div
                      key={tx.id}
                      onClick={() => handleStartClaim(tx)}
                      className="bg-white border border-black/[0.04] p-3.5 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer hover:border-black/10 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#F6F4ED] rounded-xl flex items-center justify-center text-zinc-800">
                          {tx.category === "Electronics" ? <CreditCard size={16} /> : <FileText size={16} />}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-black">{tx.merchantName}</h5>
                          <span className="text-[10px] text-zinc-400 font-bold">{tx.date} &bull; {tx.time}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-black text-black">€{tx.amountSpent.toFixed(2)}</div>

                        {tx.status === "Refunded" && (
                          <span className="text-[10px] font-bold text-[#5ec700] bg-[#71E300]/10 px-2 py-0.5 rounded-md">
                            Refunded €{tx.taxRefundAmount.toFixed(2)}
                          </span>
                        )}
                        {tx.status === "Claim Filed" && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md">
                            Pending €{tx.taxRefundAmount.toFixed(2)}
                          </span>
                        )}
                        {tx.status === "Ineligible" && (
                          <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md">
                            No Refund
                          </span>
                        )}
                        {!tx.receiptUploaded && tx.status !== "Ineligible" && (
                          <span className="text-[10px] font-black text-zinc-700 bg-[#71E300] hover:underline px-2 py-0.5 rounded-md">
                            Claim €{tx.taxRefundAmount.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* 2. CARD TAB */}
          {activeTab === "card" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Your Card</h2>
                <p className="text-xs text-zinc-400">Manage everyday physical and virtual debit controls.</p>
              </div>

              {/* POLISHED CARD COMPRESSED INTERACTIVE VISUALIZER */}
              <div className="bg-zinc-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-6">
                {/* Visa / Brand */}
                <div className="flex justify-between items-start">
                  <span className="font-heading font-black text-xl tracking-tight text-[#71E300]">diaspedia</span>
                  <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">DEBIT</span>
                </div>

                {/* NFC Symbol simulation */}
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                  <CreditCard size={16} className="text-zinc-300" />
                </div>

                {/* Card details representation */}
                <div className="space-y-3.5">
                  <h3 className="font-mono text-lg tracking-widest text-center font-black">
                    {card.isLocked ? "•••• •••• •••• ••••" : card.cardNumber}
                  </h3>

                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-zinc-500">CARDHOLDER</span>
                      <div>{card.cardHolder}</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-zinc-500">EXPIRES</span>
                        <div>{card.expiry}</div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-zinc-500">CVV</span>
                        <div>{card.isLocked ? "•••" : card.cvv}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glowing status */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-[#71E300]/10 rounded-l-full filter blur-2xl pointer-events-none" />
              </div>

              {/* INTERACTIVE CONTROLS */}
              <div className="bg-white p-4 rounded-3xl border border-black/5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-black">Freeze Account Card</h4>
                    <p className="text-[11px] text-zinc-400 font-medium">Temporarily lock transactions and withdrawals.</p>
                  </div>
                  <button
                    onClick={handleToggleLockCard}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      card.isLocked
                        ? "bg-[#71E300]/25 text-black hover:bg-[#71E300]/40"
                        : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    }`}
                  >
                    {card.isLocked ? "Unfreeze Card" : "Freeze Card"}
                  </button>
                </div>

                <div className="border-t border-black/[0.03] pt-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-black">Online Payments</h4>
                    <p className="text-[11px] text-zinc-400 font-medium">Allow online and internet purchases.</p>
                  </div>
                  <div className="w-10 h-6 bg-[#71E300] rounded-full p-0.5 cursor-pointer flex justify-end">
                    <div className="w-5 h-5 bg-black rounded-full" />
                  </div>
                </div>
              </div>

              {/* CARD SPECIFICATIONS */}
              <div className="bg-zinc-100/50 p-4 rounded-3xl border border-black/[0.02] space-y-3">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Physical Card Delivery</h4>
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-black/[0.04]">
                  <Compass size={18} className="text-[#71E300] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-black">Physical Card in Transit</h5>
                    <p className="text-[11px] text-zinc-500 leading-normal">
                      Your debit card is currently being produced and dispatched to <span className="font-semibold text-black">{userProfile.homeCity}</span>. Active shipping updates will follow.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* 3. ACTIVITY TAB */}
          {activeTab === "activity" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Activity</h2>
                <p className="text-xs text-zinc-400">All euro card purchases and matching tax refund statuses.</p>
              </div>

              {/* Purchases list */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase">Purchase History</h4>
                  <span className="text-xs font-bold text-zinc-400">{transactions.length} Purchases</span>
                </div>

                <div className="space-y-2.5">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      onClick={() => handleStartClaim(tx)}
                      className="bg-white border border-black/[0.04] p-4 rounded-2xl flex flex-col space-y-3 shadow-sm hover:border-black/10 transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8.5 h-8.5 bg-[#F6F4ED] rounded-xl flex items-center justify-center text-zinc-800">
                            {tx.category === "Electronics" ? <CreditCard size={15} /> : <FileText size={15} />}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-black">{tx.merchantName}</h5>
                            <span className="text-[10px] text-zinc-400 font-bold">{tx.date} &bull; {tx.time}</span>
                          </div>
                        </div>

                        <div className="text-right space-y-0.5">
                          <div className="text-xs font-black text-black">€{tx.amountSpent.toFixed(2)}</div>
                          <span className="text-[10px] text-zinc-400 font-bold block">{tx.taxRate}</span>
                        </div>
                      </div>

                      {/* VAT Refund Action or Status */}
                      <div className="bg-[#F6F4ED]/50 border-t border-black/[0.02] pt-2.5 flex items-center justify-between text-xs">
                        <span className="text-zinc-500 font-medium">Refund Status:</span>

                        {tx.status === "Refunded" && (
                          <div className="flex items-center gap-1 font-bold text-[#5ec700]">
                            <CheckCircle2 size={13} />
                            <span>Refunded +€{tx.taxRefundAmount.toFixed(2)}</span>
                          </div>
                        )}
                        {tx.status === "Claim Filed" && (
                          <div className="flex items-center gap-1 font-bold text-amber-600">
                            <Clock size={13} />
                            <span>Claim Filed (€{tx.taxRefundAmount.toFixed(2)})</span>
                          </div>
                        )}
                        {tx.status === "Ineligible" && (
                          <span className="text-zinc-400 font-bold">Ineligible for Refund</span>
                        )}
                        {!tx.receiptUploaded && tx.status !== "Ineligible" && (
                          <button
                            type="button"
                            className="bg-[#71E300] hover:bg-[#5ec700] text-black font-extrabold text-[11px] px-3 py-1 rounded-lg transition-all"
                          >
                            Upload Receipt (Refund €{tx.taxRefundAmount.toFixed(2)})
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* 4. TAX TAB */}
          {activeTab === "tax" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Tax Refund Tracker</h2>
                <p className="text-xs text-zinc-400">Track eligible claims and European VAT recovery milestones.</p>
              </div>

              {/* TANGIBLE METRICS SUMMARY */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-black/[0.04] p-4 rounded-2xl shadow-sm text-center space-y-1">
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block">Total Recovered</span>
                  <h3 className="text-xl font-black text-[#5ec700]">€{userProfile.totalTaxReturned.toFixed(2)}</h3>
                </div>
                <div className="bg-white border border-black/[0.04] p-4 rounded-2xl shadow-sm text-center space-y-1">
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block">Pending Review</span>
                  <h3 className="text-xl font-black text-amber-600">€{userProfile.pendingTaxRefunds.toFixed(2)}</h3>
                </div>
              </div>

              {/* TAX RECOVERY TIMELINE PROGRESS BAR */}
              <div className="space-y-3">
                <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Active Refund Portfolios</h4>

                <div className="space-y-3.5">
                  {taxClaims.map((claim) => (
                    <div
                      key={claim.id}
                      className="bg-white border border-black/[0.04] p-5 rounded-3xl shadow-sm space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-black text-black">{claim.merchantName}</h5>
                          <p className="text-[10px] text-zinc-400 font-bold">Filed {claim.date} &bull; Purchase: €{claim.purchaseAmount.toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-black text-black">€{claim.refundAmount.toFixed(2)}</div>
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            claim.status === "Paid"
                              ? "bg-[#71E300]/15 text-black"
                              : claim.status === "Approved"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {claim.status}
                          </span>
                        </div>
                      </div>

                      {/* Custom visual progress bar with standard 3 steps: 1. Claim Filed, 2. Tax Authority Approved, 3. Paid Out */}
                      <div className="space-y-2">
                        <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              claim.status === "Paid" ? "bg-[#71E300]" : "bg-amber-500"
                            }`}
                            style={{ width: `${claim.progressPercent}%` }}
                          />
                        </div>

                        <div className="flex justify-between text-[9px] font-bold text-zinc-400 uppercase">
                          <span className={claim.progressPercent >= 33 ? "text-zinc-700" : ""}>Filed</span>
                          <span className={claim.progressPercent >= 66 ? "text-zinc-700" : ""}>Approved</span>
                          <span className={claim.progressPercent >= 100 ? "text-[#5ec700]" : ""}>Paid Out</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informative block */}
              <div className="bg-white border border-black/[0.04] rounded-3xl p-5 flex gap-3.5 items-start shadow-sm">
                <Info size={20} className="text-zinc-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-black">How do claims settle?</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    European law allows non-EU residents (such as international students, temporary expats, and volunteers) to recover VAT. Diaspedia simplifies the entire administrative cycle. Just use your card, snap your purchase receipt, and track payouts directly inside your neobank balance.
                  </p>
                </div>
              </div>
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
                  <p className="text-xs text-zinc-500 font-bold">{userProfile.homeCity}</p>
                </div>

                {/* Residency Badges */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  <span className="text-[10px] bg-zinc-100 border border-black/5 text-zinc-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {userProfile.residencyStatus}
                  </span>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/[0.03]">
                  <div className="space-y-0.5">
                    <div className="text-lg font-black text-black">€{userProfile.totalTaxReturned.toFixed(2)}</div>
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">Tax Recovered</span>
                  </div>
                  <div className="space-y-0.5 border-l border-black/[0.03]">
                    <div className="text-lg font-black text-black">€{userProfile.pendingTaxRefunds.toFixed(2)}</div>
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">Pending Out</span>
                  </div>
                </div>
              </div>

              {/* Financial Profile Settings details */}
              <div className="space-y-3">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Identity & Residency Info</h3>
                <div className="bg-white border border-black/[0.03] rounded-3xl p-4 divide-y divide-black/[0.03] text-xs">
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-zinc-500">Legal Name</span>
                    <span className="font-bold text-black">{userProfile.name}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-zinc-500">Passport</span>
                    <span className="font-bold text-black">{userProfile.passportCountry}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-zinc-500">Account BIC</span>
                    <span className="font-bold text-black font-mono">{userProfile.accountBic}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <span className="text-zinc-500">Routing Country</span>
                    <span className="font-bold text-black">Germany / Europe</span>
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
                  diaspedia &copy; {new Date().getFullYear()}. Financial accounts and banking services are provided by authorized banking partners in Germany.
                </p>
              </div>
            </motion.div>
          )}

        </main>

        {/* DETAILS DRAWER / CLAIM RECEIPT FORM (Layered z-50 over navigation) */}
        <AnimatePresence>
          {selectedTx && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black z-50"
                onClick={() => {
                  if (!simulatedLoading) {
                    setSelectedTx(null);
                    setIsClaiming(false);
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
                      Transaction Info
                    </span>
                    <h3 className="text-2xl font-black font-heading text-black pt-1">
                      {selectedTx.merchantName}
                    </h3>
                    <p className="text-xs text-zinc-500 font-bold">
                      {selectedTx.date} &bull; {selectedTx.time} &bull; {selectedTx.merchantLocation}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTx(null);
                      setIsClaiming(false);
                    }}
                    className="p-1 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all text-zinc-500"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* TRANSACTION DETAILS OVERVIEW */}
                {!isClaiming ? (
                  <div className="space-y-5 flex-1 pb-4">

                    {/* Pricing breakdown */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#F6F4ED] rounded-2xl p-4 border border-black/[0.02]">
                        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block">PURCHASE AMOUNT</span>
                        <div className="text-base font-black text-black mt-0.5">€{selectedTx.amountSpent.toFixed(2)}</div>
                      </div>
                      <div className="bg-[#F6F4ED] rounded-2xl p-4 border border-black/[0.02]">
                        <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block">RECOVERABLE TAX</span>
                        <div className="text-base font-black text-[#5ec700] mt-0.5">+€{selectedTx.taxRefundAmount.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Tax specifications details */}
                    <div className="space-y-2 pt-1">
                      <h4 className="text-xs font-black tracking-wider text-zinc-400 uppercase">
                        Tax Details
                      </h4>
                      <div className="bg-[#F6F4ED]/50 border border-black/[0.02] rounded-2xl p-4 text-xs space-y-2">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">VAT category:</span>
                          <span className="font-bold text-black">{selectedTx.taxRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Merchant Location:</span>
                          <span className="font-bold text-black">{selectedTx.merchantLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Eligibility status:</span>
                          <span className="font-bold text-black">{selectedTx.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Primary Tax Recovery Action */}
                    <div className="pt-2">
                      {selectedTx.status === "Ineligible" ? (
                        <div className="w-full bg-zinc-100 text-zinc-400 text-xs font-bold py-4 rounded-2xl text-center">
                          Ineligible for VAT recovery
                        </div>
                      ) : selectedTx.receiptUploaded ? (
                        <div className="w-full bg-[#71E300]/10 border border-[#71E300]/30 text-zinc-800 text-xs font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
                          <CheckCircle2 size={16} className="text-[#5ec700]" />
                          <span>Claim for €{selectedTx.taxRefundAmount.toFixed(2)} is already filed!</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsClaiming(true)}
                          className="w-full bg-[#71E300] hover:bg-[#5ec700] active:scale-95 text-black font-bold text-sm py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Claim €{selectedTx.taxRefundAmount.toFixed(2)} VAT Refund</span>
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>

                  </div>
                ) : (
                  // HIGH FIDELITY CLAIM / RECEIPT UPLOAD FORM
                  <form onSubmit={handleConfirmReceiptUpload} className="space-y-5 flex-1 pb-4">
                    <div className="space-y-4">

                      {/* Recoup description */}
                      <div className="bg-zinc-50 border border-black/[0.04] rounded-2xl p-4 space-y-1 text-xs">
                        <div className="flex justify-between items-center font-semibold text-zinc-700">
                          <span>Merchant purchase amount:</span>
                          <span className="text-black font-bold">€{selectedTx.amountSpent.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-black pt-1.5 border-t border-black/5">
                          <span>Tax returned to balance:</span>
                          <span className="text-[#5ec700] font-black">€{selectedTx.taxRefundAmount.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Name confirmation */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
                          Canadian Passport Confirmation
                        </label>
                        <input
                          type="text"
                          required
                          readOnly
                          value={userProfile.name}
                          className="w-full bg-zinc-100 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-400 outline-none"
                        />
                      </div>

                      {/* Receipt upload placeholder */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">
                          Upload Merchant Purchase Receipt
                        </label>

                        <div className="border-2 border-dashed border-zinc-200 hover:border-[#71E300] bg-[#F6F4ED]/50 rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2 relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setReceiptFile(e.target.files[0].name);
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <Upload size={24} className="mx-auto text-zinc-400" />
                          <div className="text-xs font-bold text-zinc-700">
                            {receiptFile ? receiptFile : "Select photo or camera snapshot"}
                          </div>
                          <p className="text-[10px] text-zinc-400">PDF, JPG or PNG up to 10MB</p>
                        </div>
                      </div>

                    </div>

                    {/* Submit / Simulation Section */}
                    <div className="pt-2">
                      {uploadSuccess ? (
                        <div className="space-y-2 text-center py-4">
                          <CheckCircle2 size={32} className="mx-auto text-[#5ec700]" />
                          <h4 className="text-xs font-bold text-zinc-800">Receipt Verified!</h4>
                          <p className="text-[11px] text-zinc-400">Filing tax refund claim...</p>
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
                              <span>Verify Receipt & File Refund</span>
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
          1. PERSISTENT PINNED TAB BAR NAVIGATION (EXACT TYPOGRAPHY & ICON STYLING AS TRAVEL)
          - Always remains fixed at the absolute bottom of the shell.
          - Never scrolls away.
          - Styled as a premium floating dark capsule with high rounded corners.
        */}
        <nav className="absolute bottom-5 left-4 right-4 bg-[#0f1115]/95 backdrop-blur-md rounded-full px-2.5 py-2 flex justify-between items-center z-40 shadow-[0_12px_36px_rgba(0,0,0,0.22)] border border-white/10 shrink-0">
          <button
            onClick={() => { setActiveTab("home"); setSelectedTx(null); }}
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
            onClick={() => { setActiveTab("card"); setSelectedTx(null); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "card"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <CreditCard size={18} className={activeTab === "card" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "card" && <span className="text-xs tracking-tight">Card</span>}
          </button>

          <button
            onClick={() => { setActiveTab("activity"); setSelectedTx(null); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "activity"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Activity size={18} className={activeTab === "activity" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "activity" && <span className="text-xs tracking-tight">Activity</span>}
          </button>

          <button
            onClick={() => { setActiveTab("tax"); setSelectedTx(null); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "tax"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Percent size={18} className={activeTab === "tax" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "tax" && <span className="text-xs tracking-tight">Tax</span>}
          </button>

          <button
            onClick={() => { setActiveTab("profile"); setSelectedTx(null); }}
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
