"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  CreditCard,
  QrCode,
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  ShieldCheck,
  Upload,
  Sparkles
} from "lucide-react";

import {
  MOCK_USER,
  MOCK_CARDS,
  MOCK_TRANSACTIONS,
  MOCK_TAX_CLAIMS,
  UserProfile,
  CardInfo,
  Transaction,
  TaxClaim
} from "@/lib/diaspediaData";

export default function Home() {
  // Navigation State (keeping exact original tab IDs to preserve visual nav bar exactly)
  const [activeTab, setActiveTab] = useState<"home" | "trips" | "friends" | "tickets" | "profile">("home");

  // Onboarding Splash state
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // App States
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [cards, setCards] = useState<CardInfo[]>(MOCK_CARDS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [claims, setClaims] = useState<TaxClaim[]>(MOCK_TAX_CLAIMS);

  // Quick Action States
  const [isAddingMoney, setIsAddingMoney] = useState<boolean>(false);
  const [addAmount, setAddAmount] = useState<string>("100");
  const [isSendingMoney, setIsSendingMoney] = useState<boolean>(false);
  const [sendRecipient, setSendRecipient] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<string>("");

  // Passport Verification Modal State
  const [isVerifyingPassport, setIsVerifyingPassport] = useState<boolean>(false);
  const [passportCountry, setPassportCountry] = useState<string>("Canada");
  const [passportFile, setPassportFile] = useState<string>("");

  // Selected Card for card details modal
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);

  // Custom Claim Upload Modal State
  const [isUploadingReceipt, setIsUploadingReceipt] = useState<boolean>(false);
  const [receiptMerchant, setReceiptMerchant] = useState<string>("");
  const [receiptAmount, setReceiptAmount] = useState<string>("");
  const [simulatedLoading, setSimulatedLoading] = useState<boolean>(false);
  const [actionSuccess, setActionSuccess] = useState<boolean>(false);

  // Notifications drawer simulation
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; time: string; read: boolean }>>([
    { id: "n1", text: "Tax claim CLM-71239 of €40.00 for KaDeWe Berlin approved!", time: "2h ago", read: false },
    { id: "n2", text: "Your new virtual Visa card is ready for standard purchases.", time: "4h ago", read: false },
    { id: "n3", text: "Verify your non-EU passport to unlock premium tax-refund rates.", time: "1d ago", read: true }
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onboarded = localStorage.getItem("diaspedia_neobank_onboarded_v1");
      if (onboarded === "true") {
        setShowSplash(false);
      }
    }
  }, []);

  const handleDismissSplash = () => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("diaspedia_neobank_onboarded_v1", "true");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Handle Quick Actions
  const handleAddMoneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(addAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setSimulatedLoading(true);
    setTimeout(() => {
      setSimulatedLoading(false);
      setActionSuccess(true);

      // Add transaction
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        merchant: "Added Money via SEPA",
        category: "Transit",
        amount: amountNum,
        date: "Just now",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        taxRefundAmount: 0.00,
        status: "cleared",
        isEligible: false
      };

      setTransactions([newTx, ...transactions]);
      setUserProfile(prev => ({
        ...prev,
        accountBalance: prev.accountBalance + amountNum
      }));

      // Set notification
      setNotifications([
        { id: `n-${Date.now()}`, text: `Successfully top-up of €${amountNum.toFixed(2)} credited.`, time: "Just now", read: false },
        ...notifications
      ]);

      setTimeout(() => {
        setIsAddingMoney(false);
        setActionSuccess(false);
      }, 1000);
    }, 1200);
  };

  const handleSendMoneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(sendAmount);
    if (isNaN(amountNum) || amountNum <= 0 || !sendRecipient) return;
    if (amountNum > userProfile.accountBalance) return;

    setSimulatedLoading(true);
    setTimeout(() => {
      setSimulatedLoading(false);
      setActionSuccess(true);

      // Deduct transaction
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        merchant: `Sent to ${sendRecipient}`,
        category: "Transit",
        amount: -amountNum,
        date: "Just now",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        taxRefundAmount: 0.00,
        status: "cleared",
        isEligible: false
      };

      setTransactions([newTx, ...transactions]);
      setUserProfile(prev => ({
        ...prev,
        accountBalance: prev.accountBalance - amountNum
      }));

      // Set notification
      setNotifications([
        { id: `n-${Date.now()}`, text: `Successfully sent €${amountNum.toFixed(2)} to ${sendRecipient}.`, time: "Just now", read: false },
        ...notifications
      ]);

      setTimeout(() => {
        setIsSendingMoney(false);
        setSendAmount("");
        setSendRecipient("");
        setActionSuccess(false);
      }, 1000);
    }, 1200);
  };

  const handlePassportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulatedLoading(true);
    setTimeout(() => {
      setSimulatedLoading(false);
      setActionSuccess(true);

      setUserProfile(prev => ({
        ...prev,
        passportVerified: true,
        passportCountry: passportCountry
      }));

      setNotifications([
        { id: `n-${Date.now()}`, text: `Non-EU Passport (${passportCountry}) verified successfully!`, time: "Just now", read: false },
        ...notifications
      ]);

      setTimeout(() => {
        setIsVerifyingPassport(false);
        setActionSuccess(false);
      }, 1000);
    }, 1500);
  };

  const handleReceiptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(receiptAmount);
    if (isNaN(amountNum) || amountNum <= 0 || !receiptMerchant) return;

    setSimulatedLoading(true);
    setTimeout(() => {
      setSimulatedLoading(false);
      setActionSuccess(true);

      const calculatedRefund = parseFloat((amountNum * 0.16).toFixed(2)); // Standard German tax refund simulation ~16% VAT

      // Create new tax claim
      const newClaim: TaxClaim = {
        id: `CLM-${Math.floor(10000 + Math.random() * 90000)}`,
        merchant: receiptMerchant,
        purchaseAmount: amountNum,
        taxReturned: calculatedRefund,
        status: "review",
        date: "Just now",
        receiptUploaded: true
      };

      setClaims([newClaim, ...claims]);
      setUserProfile(prev => ({
        ...prev,
        pendingRefund: prev.pendingRefund + calculatedRefund
      }));

      setNotifications([
        { id: `n-${Date.now()}`, text: `Receipt for ${receiptMerchant} uploaded. Pending refund of €${calculatedRefund}.`, time: "Just now", read: false },
        ...notifications
      ]);

      setTimeout(() => {
        setIsUploadingReceipt(false);
        setReceiptMerchant("");
        setReceiptAmount("");
        setActionSuccess(false);
      }, 1000);
    }, 1500);
  };

  const handleCardFreezeToggle = (cardId: string) => {
    setCards(prevCards =>
      prevCards.map(c => {
        if (c.id === cardId) {
          const newStatus = c.status === "active" ? "frozen" : "active";
          // set notification
          setNotifications([
            { id: `n-${Date.now()}`, text: `Your ${c.type} card has been ${newStatus}.`, time: "Just now", read: false },
            ...notifications
          ]);
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
    if (selectedCard && selectedCard.id === cardId) {
      setSelectedCard(prev => prev ? { ...prev, status: prev.status === "active" ? "frozen" : "active" } : null);
    }
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
                <p className="max-w-xs text-xs font-bold text-zinc-600 leading-normal pt-1">
                  With Diaspedia, the tax you pay when you spend in Europe is given back to you.
                </p>
              </div>

              {/* Onboarding Features Summary */}
              <div className="space-y-2.5 max-w-sm mx-auto w-full py-2">
                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <CreditCard size={15} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">A Real Neobank Account</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Get a standard European account & physical Visa card in minutes.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#71E300]/10 flex items-center justify-center text-black shrink-0">
                    <Sparkles size={15} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-black">Automatic Tax Recovery</h4>
                    <p className="text-[11px] text-zinc-400 font-medium leading-tight">Eligible purchases track and return VAT directly to your bank balance.</p>
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

        {/* MAIN INDEPENDENTLY SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-32 space-y-5 scroll-smooth">

          {/* 1. HOME VIEW */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Value Proposition Hero Banner */}
              <div className="bg-black text-white p-5 rounded-3xl border border-white/5 shadow-sm space-y-3 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-15 translate-x-4 translate-y-4">
                  <Globe size={180} className="text-[#71E300]" />
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest text-[#71E300]">Welcome back, {userProfile.name.split(" ")[0]}</span>
                <p className="text-xs font-medium text-zinc-300 leading-relaxed max-w-[85%]">
                  With Diaspedia, the tax you pay when you spend in Europe is given back to you.
                </p>
                <div className="pt-2">
                  <span className="text-[10px] bg-white/10 text-white font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Canada Passport Verified
                  </span>
                </div>
              </div>

              {/* Primary Balance Section */}
              <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_4px_20px_rgba(15,17,21,0.02)] space-y-5">
                <div className="space-y-1 text-center">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Available Balance</span>
                  <div className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">
                    €{userProfile.accountBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-[11px] text-zinc-400 font-bold">Standard European Account (DE IBAN)</p>
                </div>

                {/* Micro metrics grid for tax refunds */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-black/[0.04]">
                  <div className="space-y-1 text-center">
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block">Recovered</span>
                    <div className="text-lg font-black text-[#5ec700]">€{userProfile.recoveredTotal.toFixed(2)}</div>
                  </div>
                  <div className="space-y-1 text-center border-l border-black/[0.04]">
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block">Pending</span>
                    <div className="text-lg font-black text-amber-500">€{userProfile.pendingRefund.toFixed(2)}</div>
                  </div>
                </div>

                {/* Quick actions buttons (No native browser alerts, high-end state transfers) */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => { setIsAddingMoney(true); setActionSuccess(false); }}
                    className="bg-[#71E300] hover:bg-[#5ec700] active:scale-95 text-black font-bold text-xs py-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowDownLeft size={14} />
                    <span>Add Money</span>
                  </button>
                  <button
                    onClick={() => { setIsSendingMoney(true); setActionSuccess(false); }}
                    className="bg-black hover:bg-zinc-900 active:scale-95 text-white font-bold text-xs py-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowUpRight size={14} />
                    <span>Send Money</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Quick Stats Info */}
              <div className="bg-white rounded-3xl border border-black/[0.04] p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase">Recent Eligible Purchase</h3>
                <div className="flex justify-between items-center bg-[#F6F4ED]/60 rounded-2xl p-3.5 border border-black/[0.02]">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-black">Apple Store Kurfürstendamm</h4>
                    <p className="text-[10px] text-zinc-400 font-semibold">Spent €1,199.00</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-[#5ec700]">+€191.84</span>
                    <p className="text-[10px] text-zinc-400 font-bold block">Tax Refund</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. MY CARD TAB (Originally TRIPS) */}
          {activeTab === "trips" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">My Cards</h2>
              </div>

              {/* Elegant Cards Feed */}
              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`rounded-3xl p-5 shadow-sm border relative overflow-hidden transition-all ${
                      card.status === "frozen"
                        ? "bg-zinc-100 border-black/5 opacity-70"
                        : "bg-zinc-950 text-white border-zinc-850"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          card.status === "frozen" ? "bg-zinc-200 text-zinc-600" : "bg-[#71E300]/10 text-[#71E300]"
                        }`}>
                          {card.type} Card
                        </span>
                        <h4 className={`text-xs font-semibold ${card.status === "frozen" ? "text-zinc-500" : "text-zinc-400"}`}>
                          Diaspedia {card.brand}
                        </h4>
                      </div>
                      <span className={`text-xs font-black uppercase ${card.status === "frozen" ? "text-zinc-400" : "text-[#71E300]"}`}>
                        {card.status}
                      </span>
                    </div>

                    <div className="my-6">
                      <span className={`text-lg font-mono font-bold tracking-widest block ${card.status === "frozen" ? "text-zinc-400" : "text-white"}`}>
                        {card.cardNumber}
                      </span>
                    </div>

                    <div className="flex justify-between items-end border-t border-black/5 pt-4">
                      <div>
                        <span className={`text-[10px] font-bold block ${card.status === "frozen" ? "text-zinc-400" : "text-zinc-500"}`}>EXPIRY</span>
                        <span className="text-xs font-bold">{card.expiry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCardFreezeToggle(card.id)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                            card.status === "frozen"
                              ? "bg-zinc-950 text-white border-zinc-950"
                              : "bg-white text-black border-black/10 hover:bg-zinc-100"
                          }`}
                        >
                          {card.status === "frozen" ? "Unfreeze" : "Freeze Card"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Secure Info Prompt */}
              <div className="bg-white border border-black/[0.04] rounded-3xl p-5 flex gap-3.5 items-start shadow-sm">
                <ShieldCheck size={20} className="text-zinc-650 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-black">Standard European Protections</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    All Diaspedia card programs are fully regulated. Card funds are backed by our licensed partner bank under standard EU insurance schemes.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. TAX / REFUND FEED (Originally FRIENDS) */}
          {activeTab === "friends" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">Tax Returns</h2>
              </div>

              {/* Upload Receipt Action */}
              <div className="bg-white border border-black/[0.04] rounded-3xl p-5 shadow-sm text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#71E300]/10 flex items-center justify-center text-black mx-auto">
                  <Upload size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-black">Have an offline retail receipt?</h4>
                  <p className="text-xs text-zinc-500 leading-normal font-medium">
                    Upload any eligible purchase invoice to calculate and claim your tax refund immediately.
                  </p>
                </div>
                <button
                  onClick={() => { setIsUploadingReceipt(true); setActionSuccess(false); }}
                  className="bg-black hover:bg-zinc-900 active:scale-95 text-white font-bold text-xs py-2.5 px-5 rounded-2xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Plus size={14} className="text-[#71E300]" />
                  <span>Upload Receipt</span>
                </button>
              </div>

              {/* Live Tax Claims List */}
              <div className="space-y-3">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Active Claims</h3>
                <div className="space-y-3">
                  {claims.map((claim) => (
                    <div
                      key={claim.id}
                      className="bg-white rounded-3xl border border-black/[0.04] p-5 shadow-sm space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-black text-xs">
                          <FileText size={16} className="text-zinc-650" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-black">{claim.merchant}</p>
                          <span className="text-[10px] text-zinc-400 font-bold">Claim ID: {claim.id} &bull; {claim.date}</span>
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                          claim.status === "review"
                            ? "bg-amber-100 text-amber-700"
                            : claim.status === "approved"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-[#71E300]/15 text-zinc-800"
                        }`}>
                          {claim.status}
                        </span>
                      </div>

                      <div className="bg-[#F6F4ED]/50 border border-black/[0.02] rounded-2xl p-4 flex justify-between items-center text-xs">
                        <div>
                          <span className="text-[10px] text-zinc-400 font-bold block">PURCHASE AMOUNT</span>
                          <span className="font-bold text-zinc-800">€{claim.purchaseAmount.toFixed(2)}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-zinc-400 font-bold block">ESTIMATED VAT REFUND</span>
                          <span className="font-black text-[#5ec700]">€{claim.taxReturned.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. ACTIVITY & TRANSACTIONS (Originally TICKETS) */}
          {activeTab === "tickets" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">My Activity</h2>
              </div>

              {/* Transactions Ledger */}
              <div className="space-y-3">
                <h3 className="text-xs font-black tracking-wider text-zinc-400 uppercase px-1">Transaction History</h3>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="bg-white border border-black/[0.04] rounded-3xl p-4 shadow-sm space-y-3 hover:border-black/10 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-black">{tx.merchant}</h4>
                          <span className="text-[10px] text-zinc-400 font-bold">{tx.date} &bull; {tx.time}</span>
                        </div>
                        <div className="text-right space-y-0.5">
                          <span className={`text-sm font-black ${tx.amount < 0 ? "text-black" : "text-[#5ec700]"}`}>
                            {tx.amount < 0 ? "-" : "+"}€{Math.abs(tx.amount).toFixed(2)}
                          </span>
                          <p className="text-[10px] text-zinc-400 font-semibold uppercase block">{tx.category}</p>
                        </div>
                      </div>

                      {/* VAT eligibility subcard */}
                      {tx.isEligible && (
                        <div className="bg-[#71E300]/10 border border-[#71E300]/20 rounded-2xl p-3 flex justify-between items-center">
                          <span className="text-[10px] font-black text-zinc-800 uppercase tracking-wider flex items-center gap-1">
                            <Sparkles size={11} className="text-[#5ec700]" />
                            Eligible for Refund
                          </span>
                          <span className="text-xs font-black text-[#5ec700]">€{tx.taxRefundAmount.toFixed(2)} Refundable</span>
                        </div>
                      )}
                    </div>
                  ))}
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
              {/* Profile card summary */}
              <div className="bg-white border border-black/[0.04] rounded-3xl p-6 shadow-sm text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center border-4 border-[#71E300]">
                    <span className="text-white text-3xl font-black font-heading">J</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black font-heading text-black leading-tight">@{userProfile.username}</h3>
                  <p className="text-xs text-zinc-500 font-bold">Tax Base: {userProfile.homeCity}, {userProfile.country}</p>
                  <div className="pt-1.5 flex justify-center">
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                      userProfile.passportVerified
                        ? "bg-[#71E300]/15 text-zinc-800 border border-[#71E300]/30"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {userProfile.passportVerified ? `Verified ${userProfile.passportCountry} Passport` : "Unverified Passport"}
                    </span>
                  </div>
                </div>

                {/* Bank Account parameters (DE IBAN) */}
                <div className="bg-[#F6F4ED]/60 border border-black/[0.02] rounded-2xl p-4 text-left space-y-2 text-xs">
                  <div>
                    <span className="text-[9px] text-zinc-400 font-black uppercase block tracking-wider">DE IBAN NUMBER</span>
                    <span className="font-mono font-bold text-zinc-800 select-all">{userProfile.accountNumber}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-400 font-black uppercase block tracking-wider">BIC CODE</span>
                    <span className="font-mono font-bold text-zinc-800">{userProfile.bankBic}</span>
                  </div>
                </div>
              </div>

              {/* Passport actions */}
              {!userProfile.passportVerified && (
                <div className="bg-white border border-black/[0.04] rounded-3xl p-5 text-center space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold text-black">Unlock tax refund functionality</h4>
                  <p className="text-xs text-zinc-500">Provide non-EU citizenship documentation to clear custom checks.</p>
                  <button
                    onClick={() => { setIsVerifyingPassport(true); setActionSuccess(false); }}
                    className="bg-[#71E300] text-black font-bold text-xs py-2.5 px-5 rounded-2xl transition-all hover:bg-[#5ec700]"
                  >
                    Verify Passport Now
                  </button>
                </div>
              )}

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
                  Diaspedia &copy; {new Date().getFullYear()}. All banking account and debit card services are sponsored and executed by our licensed BaaS partner bank in Europe.
                </p>
              </div>
            </motion.div>
          )}

        </main>

        {/* DYNAMIC ACTION MODALS (Add Money, Send Money, Upload Receipt, Passport) */}
        <AnimatePresence>
          {/* Backdrop */}
          {(isAddingMoney || isSendingMoney || isUploadingReceipt || isVerifyingPassport) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black z-50"
              onClick={() => {
                if (!simulatedLoading) {
                  setIsAddingMoney(false);
                  setIsSendingMoney(false);
                  setIsUploadingReceipt(false);
                  setIsVerifyingPassport(false);
                }
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {/* Add Money Drawer */}
          {isAddingMoney && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-12px_32px_rgba(15,17,21,0.15)] z-50 max-h-[90%] p-6 space-y-5 flex flex-col pb-safe-bottom"
            >
              <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto shrink-0" />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black font-heading text-black">Top Up Balance</h3>
                <button onClick={() => setIsAddingMoney(false)} className="p-1 rounded-full bg-zinc-100 text-zinc-550">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddMoneySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Amount (EUR)</label>
                  <input
                    type="number"
                    required
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-850 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  {actionSuccess ? (
                    <div className="text-center py-2 text-xs font-bold text-green-600">Balance updated successfully!</div>
                  ) : (
                    <button
                      type="submit"
                      disabled={simulatedLoading}
                      className="w-full bg-[#71E300] text-black font-bold text-xs py-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {simulatedLoading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Add Funds</span>
                          <Check size={14} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {/* Send Money Drawer */}
          {isSendingMoney && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-12px_32px_rgba(15,17,21,0.15)] z-50 max-h-[90%] p-6 space-y-5 flex flex-col pb-safe-bottom"
            >
              <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto shrink-0" />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black font-heading text-black">Send Money</h3>
                <button onClick={() => setIsSendingMoney(false)} className="p-1 rounded-full bg-zinc-100 text-zinc-550">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSendMoneySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Recipient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Schmidt"
                    value={sendRecipient}
                    onChange={(e) => setSendRecipient(e.target.value)}
                    className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-850 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Amount (EUR)</label>
                  <input
                    type="number"
                    required
                    placeholder="Min 1"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-850 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  {actionSuccess ? (
                    <div className="text-center py-2 text-xs font-bold text-green-600">Money sent successfully!</div>
                  ) : (
                    <button
                      type="submit"
                      disabled={simulatedLoading}
                      className="w-full bg-black text-white font-bold text-xs py-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {simulatedLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Funds</span>
                          <Check size={14} className="text-[#71E300]" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {/* Upload Receipt Drawer */}
          {isUploadingReceipt && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-12px_32px_rgba(15,17,21,0.15)] z-50 max-h-[90%] p-6 space-y-5 flex flex-col pb-safe-bottom"
            >
              <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto shrink-0" />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black font-heading text-black">Upload New Receipt</h3>
                <button onClick={() => setIsUploadingReceipt(false)} className="p-1 rounded-full bg-zinc-100 text-zinc-550">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleReceiptSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Merchant Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saturn Alexanderplatz"
                    value={receiptMerchant}
                    onChange={(e) => setReceiptMerchant(e.target.value)}
                    className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-850 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Purchase Amount (EUR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 500"
                    value={receiptAmount}
                    onChange={(e) => setReceiptAmount(e.target.value)}
                    className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-850 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  {actionSuccess ? (
                    <div className="text-center py-2 text-xs font-bold text-green-600">Receipt submitted! Refund pending.</div>
                  ) : (
                    <button
                      type="submit"
                      disabled={simulatedLoading}
                      className="w-full bg-black text-white font-bold text-xs py-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {simulatedLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit For Review</span>
                          <Check size={14} className="text-[#71E300]" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {/* Verify Passport Drawer */}
          {isVerifyingPassport && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-12px_32px_rgba(15,17,21,0.15)] z-50 max-h-[90%] p-6 space-y-5 flex flex-col pb-safe-bottom"
            >
              <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto shrink-0" />
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black font-heading text-black">Passport Verification</h3>
                <button onClick={() => setIsVerifyingPassport(false)} className="p-1 rounded-full bg-zinc-100 text-zinc-550">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handlePassportSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Passport Issuing Country</label>
                  <select
                    value={passportCountry}
                    onChange={(e) => setPassportCountry(e.target.value)}
                    className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-850 focus:outline-none"
                  >
                    <option>Canada</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>India</option>
                    <option>Kenya</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-wider">Select Passport Copy Scan</label>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) => setPassportFile(e.target.value)}
                    className="w-full bg-[#F6F4ED]/80 border border-black/5 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  {actionSuccess ? (
                    <div className="text-center py-2 text-xs font-bold text-green-600">Verification complete!</div>
                  ) : (
                    <button
                      type="submit"
                      disabled={simulatedLoading}
                      className="w-full bg-black text-white font-bold text-xs py-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {simulatedLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Upload & Verify Passport</span>
                          <Check size={14} className="text-[#71E300]" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
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
            onClick={() => { setActiveTab("home"); }}
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
            onClick={() => { setActiveTab("trips"); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "trips"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Calendar size={18} className={activeTab === "trips" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "trips" && <span className="text-xs tracking-tight">Card</span>}
          </button>

          <button
            onClick={() => { setActiveTab("friends"); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "friends"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Activity size={18} className={activeTab === "friends" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "friends" && <span className="text-xs tracking-tight">Tax</span>}
          </button>

          <button
            onClick={() => { setActiveTab("tickets"); }}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeTab === "tickets"
                ? "bg-white/15 text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Ticket size={18} className={activeTab === "tickets" ? "text-[#71E300]" : "text-zinc-500"} />
            {activeTab === "tickets" && <span className="text-xs tracking-tight">Activity</span>}
          </button>

          <button
            onClick={() => { setActiveTab("profile"); }}
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
