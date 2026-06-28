"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, Home, User, MessageSquare, CheckCircle, Star, ArrowDownUp, Menu, Banknote, ChevronRight, Settings, History as HistoryIcon, Utensils, Eye, EyeOff, CreditCard, Plus, Trash2, Delete, QrCode, Link, ArrowUpRight, ArrowDownLeft, Landmark, ArrowDownToLine, CircleDot, Share2, Copy, ShoppingBag, Car, Laptop, Wrench, Store } from "lucide-react"

type AppState = "ONBOARDING" | "HOME" | "HANDLE_SEARCH" | "PAYMENT_AMOUNT" | "CONFIRMATION" | "AUTHORIZATION" | "SUCCESS" | "HISTORY" | "ACCOUNT" | "PROMOTIONS" | "SETTINGS" | "MERCHANT_SETTINGS" | "LINKED_CARDS" | "ADD_CARD" | "PAYOUT_CONFIG" | "ADD_PAYOUT" | "RECEIVE_LINK" | "FUND_WALLET_PROMPT" | "CATALOGUE_STUDIO" | "MERCHANT_STOREFRONT" | "MERCHANT_CONSUME_VIEW"

const MOCK_TRANSACTIONS = [
  { id: 1, type: "send", amount: "-1 Breakfast", contactName: "Mama Rose Cafe", contactHandle: "@MamaRose", date: "Today", time: "14:30", icon: Utensils },
  { id: 2, type: "receive", amount: "+20 Lunch", contactName: "Mama Rose Cafe", contactHandle: "@MamaRose", date: "Today", time: "09:15", icon: Utensils },
  { id: 3, type: "pay", amount: "-1 Wash", contactName: "Campus Laundry", contactHandle: "@CampusLaundry", date: "Yesterday", time: "08:45", icon: Utensils },
  { id: 4, type: "receive", amount: "+10 Rides", contactName: "City Transit", contactHandle: "@CityTransit", date: "This Week", time: "Mon", icon: Star },
]

const CONTACTS = [
  { id: 1, handle: "@MamaRose", name: "Mama Rose Cafe", icon: Utensils, type: "merchant" },
  { id: 2, handle: "@CampusLaundry", name: "Campus Laundry", icon: Utensils, type: "merchant" },
  { id: 3, handle: "@CityTransit", name: "City Transit", icon: Star, type: "merchant" },
  { id: 4, handle: "@john_user", name: "John User", icon: User, type: "history" },
]

export default function App() {
  const [navStack, setNavStack] = useState<AppState[]>(["ONBOARDING"])
  const appState = navStack[navStack.length - 1]
  const [userHandle, setUserHandle] = useState("")
  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3 | 4>(1)
  const [onboardingName, setOnboardingName] = useState("")
  const [onboardingEmail, setOnboardingEmail] = useState("")
  const [onboardingPin, setOnboardingPin] = useState("")
  const [authPin, setAuthPin] = useState("")
  const [isAuthorizing, setIsAuthorizing] = useState(false)
  const [isPromoVisible, setIsPromoVisible] = useState(true)
  const [merchantCategory, setMerchantCategory] = useState<{name: string, icon: React.ElementType}>({ name: "Cafe", icon: Utensils })
  const [transactionMode, setTransactionMode] = useState<"subscribe" | "share" | "accept" | "catalogue">("subscribe")
  const [payoutMethods, setPayoutMethods] = useState<{id: number, type: string, name: string, details: string}[]>([])
  const [isBalanceVisible, setIsBalanceVisible] = useState(false)
  const [balance, setBalance] = useState(0) // Default to 0 to trigger the fund wallet prompt
  const [transactions, setTransactions] = useState<{id: number, type: string, amount: string, contactName: string, contactHandle: string, date: string, time: string, icon: React.ElementType}[]>([])
  const [savedMethods, setSavedMethods] = useState<{id: number | string, type: string, name: string, details: string, icon: React.ElementType}[]>([])
  const [selectedMethodId, setSelectedMethodId] = useState<number | string | "new_mobile">(1)
  const [isMethodSheetOpen, setIsMethodSheetOpen] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [selectedContact, setSelectedContact] = useState<{handle: string, name: string, icon?: React.ElementType} | null>(null)
  const [transactionAmount, setTransactionAmount] = useState("")
  const [selectedService, setSelectedService] = useState<{name: string, price: number} | null>(null)
  const [merchantCatalogue, setMerchantCatalogue] = useState<{id: number, name: string, price: number, icon: React.ElementType}[]>([{id: 1, name: "Breakfast", price: 5000, icon: Utensils}, {id: 2, name: "Lunch", price: 8000, icon: Utensils}])
  const [depositMethod, setDepositMethod] = useState<"card" | "mobile">("card")
  const [depositMobile, setDepositMobile] = useState("")
  const [transactionNote, setTransactionNote] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activitySearchQuery, setActivitySearchQuery] = useState("")

  // Sync navStack with window.history to prevent accidental browser exits
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.appState) {
        setNavStack(e.state.navStack);
      } else {
        setNavStack(["HOME"]);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (state: AppState) => {
    setIsMenuOpen(false)
    if (state === "HOME") {
      const newStack: AppState[] = ["HOME"];
      setNavStack(newStack);
      window.history.pushState({ appState: "HOME", navStack: newStack }, "");
    } else {
      setNavStack(prev => {
        const newStack = [...prev, state];
        window.history.pushState({ appState: state, navStack: newStack }, "");
        return newStack;
      });
    }
  }

  const goBack = () => {
    setNavStack(prev => {
      if (prev.length > 1) {
        const newStack = prev.slice(0, -1);
        window.history.back();
        return newStack;
      }
      return ["HOME"];
    });
  }


  const handleKeypadPress = (val: string) => {
    if (val === "backspace") {
      setTransactionAmount(prev => prev.slice(0, -1));
    } else {
      setTransactionAmount(prev => {
        // limit length if necessary, e.g., to 10 chars
        if (prev.length >= 12) return prev;
        // prevent leading zero if it's the only char
        if (prev === "0" && val !== "0") return val;
        if (prev === "0" && val === "0") return prev;
        return prev + val;
      });
    }
  }

  const formatAmount = (val: string) => {
    if (!val) return "0";
    return Number(val).toLocaleString();
  }


  const getAmountFontSize = (val: string) => {
    const formattedLength = formatAmount(val).length;
    if (formattedLength > 12) return 'text-[28px] sm:text-[32px]';
    if (formattedLength > 9) return 'text-[36px] sm:text-[42px]';
    if (formattedLength > 6) return 'text-[44px] sm:text-[50px]';
    return 'text-[48px] sm:text-[56px]';
  }

  const filteredTransactions = transactions.filter(tx => {
    if (!activitySearchQuery) return true;
    const query = activitySearchQuery.toLowerCase();
    return tx.contactName.toLowerCase().includes(query) ||
           tx.contactHandle.toLowerCase().includes(query) ||
           tx.amount.includes(query);
  })

  const filteredContacts = CONTACTS.filter(contact => {
    if (!searchQuery) return contact.type !== "merchant"
    return contact.handle.toLowerCase().includes(searchQuery.toLowerCase()) || contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? <span key={i} className="text-[#27A163]">{part}</span> : <span key={i}>{part}</span>
        )}
      </span>
    )
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-hidden text-[#1A1A1A]">

      <AnimatePresence initial={false}>
        {appState === "ONBOARDING" && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#FFFFFF] z-[100] flex flex-col items-center justify-between pt-[max(env(safe-area-inset-top),64px)] pb-[max(env(safe-area-inset-bottom),48px)] px-6"
          >
            {onboardingStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex-1 flex flex-col items-center justify-center w-full"
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                  <h1 className="text-[48px] font-light tracking-widest text-[#1A1A1A]">Wi-Pa</h1>
                  <p className="text-[16px] font-medium text-[#666666] tracking-wide mt-2">Digital Service Card</p>
                </div>
                <div className="w-full">
                  <motion.button
                    whileTap={{ scale: 0.95, opacity: 0.8 }}
                    onClick={() => setOnboardingStep(2)}
                    className="w-full h-[60px] bg-[#27A163] text-white rounded-[30px] text-[18px] font-bold shadow-lg flex items-center justify-center gap-2"
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            )}

            {onboardingStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col w-full h-full"
              >
                <div className="flex flex-col mb-8 mt-4 gap-2">
                   <h2 className="text-[28px] font-extrabold text-[#1A1A1A] leading-tight">Create your<br/>account</h2>
                   <p className="text-[16px] font-medium text-[#666666]">Enter your legal details to get started.</p>
                </div>
                <div className="flex-1 flex flex-col gap-6 mt-4">
                   <div className="flex flex-col gap-2">
                     <span className="text-[14px] font-bold text-[#1A1A1A] px-2">Legal Name</span>
                     <input
                       autoFocus
                       type="text"
                       value={onboardingName}
                       onChange={(e) => setOnboardingName(e.target.value)}
                       placeholder="e.g., John Doe"
                       className="w-full h-[64px] bg-[#F4F4F4] rounded-[20px] px-6 text-[18px] font-bold text-[#1A1A1A] outline-none placeholder:text-[#666666]/50"
                     />
                   </div>
                   <div className="flex flex-col gap-2">
                     <span className="text-[14px] font-bold text-[#1A1A1A] px-2">Email Address</span>
                     <input
                       type="email"
                       value={onboardingEmail}
                       onChange={(e) => setOnboardingEmail(e.target.value)}
                       placeholder="e.g., john@example.com"
                       className="w-full h-[64px] bg-[#F4F4F4] rounded-[20px] px-6 text-[18px] font-bold text-[#1A1A1A] outline-none placeholder:text-[#666666]/50"
                     />
                   </div>
                </div>

                <div className="w-full mt-auto pt-4">
                  <motion.button
                    whileTap={{ scale: 0.95, opacity: 0.8 }}
                    onClick={() => setOnboardingStep(3)}
                    disabled={onboardingName.length < 3 || onboardingEmail.length < 5}
                    className={`w-full h-[60px] rounded-[30px] text-[18px] font-bold shadow-lg flex items-center justify-center gap-2 transition-colors ${onboardingName.length >= 3 && onboardingEmail.length >= 5 ? "bg-[#27A163] text-white" : "bg-[#F4F4F4] text-[#666666] shadow-none"}`}
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            )}

            {onboardingStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col w-full h-full relative"
              >
                <div className="flex flex-col mb-8 mt-4 gap-2">
                   <h2 className="text-[28px] font-extrabold text-[#1A1A1A] leading-tight">Set your PIN</h2>
                   <p className="text-[16px] font-medium text-[#666666]">This protects your transactions and account access.</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center -mt-10">
                   <div className="flex items-center gap-6 mb-12">
                     {[1, 2, 3, 4].map((i) => (
                       <div key={i} className={`w-5 h-5 rounded-full border-2 transition-colors duration-200 ${onboardingPin.length >= i ? "bg-[#1A1A1A] border-[#1A1A1A]" : "border-gray-300 bg-transparent"}`} />
                     ))}
                   </div>
                </div>

                <div className="w-full px-2 pb-2 mt-auto grid grid-cols-3 gap-y-6 gap-x-4 max-w-[320px] mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, "spacer", 0, "backspace"].map((val, idx) => (
                    <div key={idx} className="flex items-center justify-center h-[60px]">
                      {val === "backspace" ? (
                        <motion.button
                          whileTap={{ scale: 0.9, backgroundColor: "#E5E7EB" }}
                          onClick={() => setOnboardingPin(prev => prev.slice(0, -1))}
                          className="w-16 h-16 rounded-full flex items-center justify-center bg-[#F4F4F4] text-[#1A1A1A]"
                        >
                          <Delete className="w-6 h-6" />
                        </motion.button>
                      ) : val === "spacer" ? (
                        <div className="w-16 h-16" />
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.9, backgroundColor: "#E5E7EB" }}
                          onClick={() => {
                            if (onboardingPin.length >= 4) return;
                            const newPin = onboardingPin + val;
                            setOnboardingPin(newPin);
                            if (newPin.length === 4) {
                              setTimeout(() => setOnboardingStep(4), 300);
                            }
                          }}
                          className="w-16 h-16 rounded-full flex items-center justify-center bg-[#F4F4F4] text-[28px] font-medium text-[#1A1A1A]"
                        >
                          {val}
                        </motion.button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {onboardingStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col w-full h-full"
              >
                <div className="flex flex-col mb-6 mt-4 gap-2">
                   <h2 className="text-[28px] font-extrabold text-[#1A1A1A] leading-tight">Create your Card ID</h2>
                </div>
                <div className="flex-1 flex flex-col mt-2 gap-y-6">
                   <div className="relative w-full h-[72px] bg-[#F4F4F4] rounded-[24px] flex items-center px-6">
                     <input
                       autoFocus
                       type="text"
                       value={userHandle}
                       onChange={(e) => setUserHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                       placeholder="e.g. JohnDoe123"
                       className="flex-1 bg-transparent text-[22px] font-bold text-[#1A1A1A] outline-none placeholder:text-[#666666]/50"
                     />
                   </div>
                   <p className="text-[15px] font-medium text-[#666666] leading-relaxed px-2">
                     At Wi-Pa, we give every user a unique payment identity so you never have to memorize long account numbers or risk sending money to the wrong person.
                   </p>
                   <p className="text-[15px] font-medium text-[#666666] leading-relaxed px-2">
                     Your Card ID holds your real-world services and ensures seamless usage at merchants.
                   </p>
                </div>

                <div className="w-full mt-auto pt-4">
                  <motion.button
                    whileTap={{ scale: 0.95, opacity: 0.8 }}
                    onClick={() => navigateTo("HOME")}
                    disabled={userHandle.length < 3}
                    className={`w-full h-[60px] rounded-[30px] text-[18px] font-bold shadow-lg flex items-center justify-center gap-2 transition-colors ${userHandle.length >= 3 ? "bg-[#27A163] text-white" : "bg-[#F4F4F4] text-[#666666] shadow-none"}`}
                  >
                    Finish Setup
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {appState === "HOME" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-white z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="flex-1 overflow-y-auto min-h-0 px-4 bg-[#FFFFFF]">
              {/* Hamburger and Promo */}
              {/* Header with User Info */}
              <div className="mt-4 flex items-center justify-between mb-6">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="w-10 h-10 rounded-full bg-[#F4F4F4] flex items-center justify-center cursor-pointer shadow-sm z-20 absolute top-4 left-4"
                >
                  <Menu className="w-5 h-5 text-[#1A1A1A]" />
                </button>
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-[#F4F4F4] rounded-full">
                  <User className="w-4 h-4 text-[#1A1A1A]" />
                  <span className="text-[14px] font-bold text-[#1A1A1A]">@{userHandle || "user"}</span>
                </div>
              </div>

              {/* Promo Banner */}
              {isPromoVisible && (
                <div className="mt-12 w-full bg-[#F2F4F7] rounded-[16px] p-4 flex items-center justify-between mb-6 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#002D72] leading-tight">
                       Prepay & Save
                    </span>
                    <span className="text-[14px] font-normal text-[#666666] mt-1">Never carry cash again. Prepay for services.</span>
                  </div>
                  <button
                    onClick={() => setIsPromoVisible(false)}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors flex shrink-0"
                  >
                    <X className="w-5 h-5 text-[#666666]" />
                  </button>
                </div>
              )}

              {/* Balance Display */}
              <div className="mb-6 flex flex-col items-start">
                <div className="flex items-center gap-3">
    <div className="flex flex-col gap-1 w-full">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <div className="bg-[#27A163]/10 px-4 py-2 rounded-xl whitespace-nowrap">
          <span className="text-[18px] font-bold text-[#27A163]">18</span>
          <span className="text-[14px] font-medium text-[#27A163] ml-1">Breakfast</span>
        </div>
        <div className="bg-[#1A73E8]/10 px-4 py-2 rounded-xl whitespace-nowrap">
          <span className="text-[18px] font-bold text-[#1A73E8]">5</span>
          <span className="text-[14px] font-medium text-[#1A73E8] ml-1">Laundry</span>
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-xl whitespace-nowrap">
          <span className="text-[18px] font-bold text-gray-700">76</span>
          <span className="text-[14px] font-medium text-gray-700 ml-1">Pages</span>
        </div>
      </div>
    </div>
  </div>
  <p className="text-[14px] font-medium text-[#666666] mt-2">Available on Card</p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setTransactionMode("subscribe"); navigateTo("HANDLE_SEARCH"); }}
                  className="h-[100px] bg-[#F4F4F4] rounded-[16px] shadow-sm p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center self-start shadow-sm">
                     <ArrowUpRight className="w-4 h-4 text-[#1A1A1A]" strokeWidth={2} />
                  </div>
                  <div className="text-[15px] font-bold text-[#1A1A1A] leading-tight">Add to Card</div>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setTransactionMode("share"); navigateTo("RECEIVE_LINK"); }}
                  className="h-[100px] bg-[#F4F4F4] rounded-[16px] shadow-sm p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center self-start shadow-sm">
                     <QrCode className="w-4 h-4 text-[#1A1A1A]" strokeWidth={2} />
                  </div>
                  <div className="text-[15px] font-bold text-[#1A1A1A] leading-tight">Card Identity</div>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setTransactionMode("accept"); navigateTo("HANDLE_SEARCH"); }}
                  className="h-[100px] bg-[#F4F4F4] rounded-[16px] shadow-sm p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-8 h-8 bg-[#27A163]/10 rounded-full flex items-center justify-center self-start shadow-sm">
                     <Utensils className="w-4 h-4 text-[#27A163]" strokeWidth={2} />
                  </div>
                  <div className="text-[15px] font-bold text-[#1A1A1A] leading-tight">Manage Catalogue</div>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { navigateTo("CATALOGUE_STUDIO"); }}
                  className="h-[100px] bg-[#F4F4F4] rounded-[16px] shadow-sm p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-8 h-8 bg-[#1A73E8]/10 rounded-full flex items-center justify-center self-start shadow-sm">
                     <ArrowDownLeft className="w-4 h-4 text-[#1A73E8]" strokeWidth={2} />
                  </div>
                  <div className="text-[15px] font-bold text-[#1A1A1A] leading-tight">Accept Card</div>
                </motion.div>
              </div>

              {/* Search Input CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => { setTransactionMode("subscribe"); navigateTo("HANDLE_SEARCH"); }}
                className="w-full h-[60px] bg-white rounded-[24px] border border-gray-100 shadow-sm flex items-center px-5 mb-8 cursor-text"
              >
                <Search className="w-5 h-5 text-[#1A1A1A] mr-3" strokeWidth={2} />
                <span className="text-[18px] font-bold text-[#1A1A1A]">Search Merchant Username</span>
              </motion.button>

              {/* Recent Locations */}
              <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-4">Recent</h2>
              <div className="flex flex-col gap-3 pb-8">
                {CONTACTS.slice(0, 3).map((contact) => (
                  <div key={contact.id} className="flex items-center cursor-pointer bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm" onClick={() => { setSelectedContact(contact); navigateTo("PAYMENT_AMOUNT"); }}>
                    <div className="w-12 h-12 rounded-[14px] bg-[#F4F4F4] flex items-center justify-center mr-4 shrink-0">
                      <contact.icon className="w-5 h-5 text-[#1A1A1A]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-[#1A1A1A]">{contact.name}</span>
                      <span className="text-[14px] font-medium text-[#666666]">{contact.handle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Nav Bar */}
            <div className="h-[80px] w-full border-t border-[#E5E7EB] flex flex-row justify-around items-center pb-[env(safe-area-inset-bottom)] bg-white shrink-0">
              <div className="flex flex-col items-center cursor-pointer">
                <Home className="w-6 h-6 text-[#1A1A1A] mb-1" strokeWidth={2.5} />
                <span className="text-[12px] font-semibold text-[#1A1A1A]">Home</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("HISTORY")}>
                <HistoryIcon className="w-6 h-6 text-[#666666] mb-1" />
                <span className="text-[12px] font-medium text-[#666666]">Activity</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("ACCOUNT")}>
                <User className="w-6 h-6 text-[#666666] mb-1" />
                <span className="text-[12px] font-medium text-[#666666]">Account</span>
              </div>
            </div>
          </motion.div>
        )}

        {appState === "HANDLE_SEARCH" && (
          <motion.div
            key="handle_search"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-white z-20 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            {/* Top Nav & Search */}
            <div className="pt-4 px-4 pb-2 shrink-0 bg-white shadow-sm z-10 flex items-center gap-3">
              <button
                onClick={goBack}
                className="p-2 -ml-2 bg-[#F4F4F4] rounded-full"
              >
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <div className="flex-1 bg-[#F4F4F4] rounded-[16px] flex items-center px-4 h-[48px] focus-within:ring-2 focus-within:ring-[#27A163]/50 transition-all">
                <Search className="w-5 h-5 text-[#666666] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder={transactionMode === "accept" ? "Search Customer @user..." : "Search Merchant @MamaRose..."}
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-[16px] text-[#1A1A1A] bg-transparent outline-none placeholder:text-[#666666] font-medium h-full"
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
               <h3 className="text-[14px] font-bold text-[#666666] mb-4 uppercase tracking-wider ml-2">
                 {searchQuery ? "Results" : "Recent"}
               </h3>
               <div className="flex flex-col gap-2">
                 {filteredContacts.map((contact) => (
                   <div
                     key={contact.id}
                     onClick={() => {
                        setSelectedContact(contact); setSearchQuery(""); navigateTo(transactionMode === "accept" ? "MERCHANT_CONSUME_VIEW" : "MERCHANT_STOREFRONT");
                     }}
                     className="flex items-center gap-4 p-3 rounded-[16px] hover:bg-[#F4F4F4] cursor-pointer transition-colors"
                   >
                      <div className="w-10 h-10 bg-[#F4F4F4] rounded-full flex items-center justify-center shrink-0 text-[#1A1A1A]">
                         <contact.icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col border-b border-gray-100 flex-1 pb-3">
                         <span className="text-[16px] font-bold text-[#1A1A1A]">
                           {searchQuery ? renderHighlightedText(contact.name, searchQuery) : contact.name}
                         </span>
                         <span className="text-[14px] font-medium text-[#666666]">
                           {searchQuery ? renderHighlightedText(contact.handle, searchQuery) : contact.handle}
                         </span>
                      </div>
                   </div>
                 ))}

                 {filteredContacts.length === 0 && (
                    <div className="text-center text-[#666666] mt-8 font-medium bg-[#F4F4F4] rounded-[24px] p-6">
                      No contacts found for &quot;{searchQuery}&quot;
                    </div>
                 )}
               </div>
            </div>
          </motion.div>
        )}

        {appState === "PAYMENT_AMOUNT" && (
          <motion.div
            key="payment_amount"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-white z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            {/* Top Nav */}
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white z-20">
              <button
                onClick={goBack}
                className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full"
              >
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">
                {transactionMode === "subscribe" && <span>Quantity to Add <span className="text-[14px] font-medium text-[#666666] block mt-1 font-normal">Total: TZS {((selectedService?.price || 0) * (Number(transactionAmount) || 0)).toLocaleString()}</span></span>}

                {transactionMode === "accept" && "Use Service"}

                {false && "Withdraw Funds"}
              </h2>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center px-6 pt-4 overflow-y-auto min-h-0">
               {false ? (
                 <div className="flex flex-col items-center w-full mb-4 shrink-0 px-2">
                   <div className={`w-12 h-12 ${false ? "bg-[#1A73E8]/10 text-[#1A73E8]" : "bg-[#1A1A1A]/10 text-[#1A1A1A]"} rounded-full flex items-center justify-center mb-2 shadow-sm`}>
                     {false ? <Banknote className="w-6 h-6" /> : <ArrowDownToLine className="w-6 h-6" />}
                   </div>
                   <h3 className="text-[20px] font-extrabold text-[#1A1A1A] mb-4">
                     {false ? "Add Funds" : "Withdraw"}
                   </h3>

                   <button
                     onClick={() => setIsMethodSheetOpen(true)}
                     className="w-full bg-[#F4F4F4] rounded-[20px] p-3 flex items-center justify-between shadow-sm active:bg-gray-100 transition-colors"
                   >
                     <div className="flex items-center gap-3">
                       {selectedMethodId === "new_mobile" ? (
                         <Banknote className="w-5 h-5 text-[#1A1A1A]" />
                       ) : (
                         <CreditCard className="w-5 h-5 text-[#1A1A1A]" />
                       )}
                       <div className="flex flex-col items-start">
                         <span className="text-[14px] font-bold text-[#1A1A1A]">
                           {selectedMethodId === "new_mobile" ? "New Mobile Money" : savedMethods.find(m => m.id === selectedMethodId)?.name || "Select Method"}
                         </span>
                         {selectedMethodId !== "new_mobile" && (
                           <span className="text-[12px] font-medium text-[#666666]">
                             {savedMethods.find(m => m.id === selectedMethodId)?.details}
                           </span>
                         )}
                       </div>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400" />
                   </button>

                   {selectedMethodId === "new_mobile" && (
                     <div className="w-full bg-[#F4F4F4] rounded-[16px] px-4 py-3 flex items-center mt-3 focus-within:ring-2 focus-within:ring-[#1A1A1A]/20 transition-all border border-gray-100">
                       <input
                         type="tel"
                         placeholder="Enter Mobile Number"
                         value={depositMobile}
                         onChange={(e) => setDepositMobile(e.target.value)}
                         className="flex-1 bg-transparent text-[16px] font-bold text-[#1A1A1A] outline-none placeholder:text-gray-400 text-center"
                       />
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="flex flex-col items-center mb-4 shrink-0">
                   <div className="w-12 h-12 bg-[#F4F4F4] rounded-full flex items-center justify-center mb-2 shadow-sm">
                     {selectedContact?.icon ? <selectedContact.icon className="w-6 h-6 text-[#1A1A1A]" /> : <User className="w-6 h-6 text-[#1A1A1A]" />}
                   </div>
                   <h3 className="text-[18px] font-bold text-[#1A1A1A]">{selectedContact?.name}</h3>
                   <p className="text-[14px] font-medium text-[#666666]">{selectedContact?.handle}</p>
                 </div>
               )}

               <div className="w-full max-w-[200px] bg-[#F4F4F4] rounded-full py-2 px-4 flex items-center justify-center mx-auto mb-4 mt-2">
     <span className="text-[14px] font-bold text-[#1A1A1A]">{selectedService?.name || "Service"}</span>
   </div>
   <div className="w-full flex flex-1 justify-center items-center gap-2 min-h-[80px]">

                 <div className={`${getAmountFontSize(transactionAmount)} font-extrabold text-[#1A1A1A] tracking-tight leading-none text-center transition-all duration-200 break-words w-full max-w-[95%]`}>
                   {formatAmount(transactionAmount)}
                 </div>
               </div>

               {true && (
                 <div className="w-full bg-[#F4F4F4] rounded-[20px] px-4 py-3 flex items-center mb-4 shrink-0 mt-4">
                   <MessageSquare className="w-5 h-5 text-gray-400 mr-3" />
                   <input
                     type="text"
                     placeholder="What's this for? (Optional)"
                     value={transactionNote}
                     onChange={(e) => setTransactionNote(e.target.value)}
                     className="flex-1 bg-transparent text-[16px] font-medium text-[#1A1A1A] outline-none placeholder:text-[#666666]"
                   />
                 </div>
               )}
            </div>

            {/* Custom Keypad */}
            <div className="w-full bg-white shrink-0 px-4 pb-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"].map((key) => (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleKeypadPress(key)}
                    className="min-h-[48px] max-h-[64px] h-[7vh] flex items-center justify-center text-[22px] font-bold text-[#1A1A1A] rounded-2xl active:bg-gray-100 transition-colors"
                  >
                    {key}
                  </motion.button>
                ))}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleKeypadPress("backspace")}
                  className="min-h-[48px] max-h-[64px] h-[7vh] flex items-center justify-center rounded-2xl active:bg-gray-100 transition-colors"
                >
                  <Delete className="w-6 h-6 text-[#1A1A1A]" />
                </motion.button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("CONFIRMATION")}
                disabled={!transactionAmount || Number(transactionAmount) <= 0 || ((false) && selectedMethodId === "new_mobile" && !depositMobile)}
                className={`w-full h-[56px] rounded-[28px] text-[18px] font-bold flex items-center justify-center transition-colors ${!transactionAmount || Number(transactionAmount) <= 0 || ((false) && selectedMethodId === "new_mobile" && !depositMobile) ? "bg-gray-200 text-gray-400" : "bg-[#27A163] text-white shadow-md"}`}
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}

        {appState === "CONFIRMATION" && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-[60] flex flex-col justify-end pt-[env(safe-area-inset-top)]"
          >
            <motion.div
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.8 }}
               className="bg-white rounded-t-[24px] shadow-2xl flex flex-col px-6 pt-6 pb-[max(env(safe-area-inset-bottom),24px)]"
            >
               <div className="flex justify-between items-center mb-8">
                 <h2 className="text-[24px] font-extrabold text-[#1A1A1A]">Confirm {transactionMode === "subscribe" ? "Addition" : transactionMode === "accept" ? "Usage" : "Details"}</h2>
                 <button onClick={goBack} className="p-2 -mr-2 bg-[#F4F4F4] rounded-full">
                   <X className="w-6 h-6 text-[#1A1A1A]" />
                 </button>
               </div>

               <div className="bg-[#F4F4F4] rounded-[20px] p-5 flex flex-col gap-4 mb-8">
                                    {false ? (
                    <div className="flex justify-between items-center">
                      <span className="text-[16px] font-medium text-[#666666]">{""}</span>
                      <span className="text-[16px] font-bold text-[#1A1A1A]">
                        {selectedMethodId === "new_mobile" ? `Mobile •••• ${depositMobile.slice(-4)}` : savedMethods.find(m => m.id === selectedMethodId)?.details}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-[16px] font-medium text-[#666666]">{"To"}</span>
                      <span className="text-[16px] font-bold text-[#1A1A1A]">{selectedContact?.name} ({selectedContact?.handle})</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-medium text-[#666666]">Quantity</span>
                    <span className="text-[20px] font-extrabold text-[#1A1A1A]">{Number(transactionAmount).toLocaleString()}</span>
                  </div>
                  {transactionNote && (
                    <div className="flex justify-between items-start border-t border-gray-200 pt-4 mt-2">
                      <span className="text-[16px] font-medium text-[#666666]">Note</span>
                      <span className="text-[16px] font-medium text-[#1A1A1A] text-right max-w-[60%]">{transactionNote}</span>
                    </div>
                  )}
               </div>

               <motion.button
                 whileTap={{ scale: 0.98 }}
                 onClick={() => {
                   const amt = Number(transactionAmount);
                   if (false) {
                     setBalance(prev => prev + amt);
                     setTransactions([{
                       id: Date.now(),
                       type: "receive",
                       amount: `+${amt.toLocaleString()}`,
                       contactName: "Self Deposit",
                       contactHandle: selectedMethodId === "new_mobile" ? `Mobile •••• ${depositMobile.slice(-4)}` : savedMethods.find(m => m.id === selectedMethodId)?.details || "Card",
                       date: "Today",
                       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                       icon: Banknote
                     }, ...transactions]);
                   } else if (false) {
                     setBalance(prev => prev - amt);
                     setTransactions([{
                       id: Date.now(),
                       type: "send",
                       amount: `-${amt.toLocaleString()}`,
                       contactName: "Withdrawal",
                       contactHandle: selectedMethodId === "new_mobile" ? `Mobile •••• ${depositMobile.slice(-4)}` : savedMethods.find(m => m.id === selectedMethodId)?.details || "Mobile Money",
                       date: "Today",
                       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                       icon: ArrowDownToLine
                     }, ...transactions]);
                   } else {
                     setBalance(prev => prev - amt);
                     setTransactions([{
                       id: Date.now(),
                       type: "send",
                       amount: `-${amt.toLocaleString()}`,
                       contactName: selectedContact?.name || "Unknown",
                       contactHandle: selectedContact?.handle || "Unknown",
                       date: "Today",
                       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                       icon: selectedContact?.icon ? (selectedContact.icon as React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>) : User
                     }, ...transactions]);
                   }
                   setAuthPin("");
                   navigateTo("AUTHORIZATION");
                 }}
                 className="w-full h-[60px] bg-[#27A163] text-white rounded-[30px] text-[18px] font-bold shadow-lg flex items-center justify-center gap-2"
               >
                 {transactionMode === "subscribe" ? "Confirm Addition" : transactionMode === "accept" ? "Confirm Usage" : "Confirm"}
               </motion.button>
            </motion.div>
          </motion.div>
        )}

        {appState === "AUTHORIZATION" && (
          <motion.div
            key="authorization"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#FFFFFF] z-[65] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 mt-[-10vh]">
               <h2 className="text-[24px] font-extrabold text-[#1A1A1A] mb-8">Enter PIN to Confirm</h2>

               <div className="flex items-center gap-6 mb-12">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className={`w-5 h-5 rounded-full border-2 transition-colors duration-200 ${authPin.length >= i ? "bg-[#1A1A1A] border-[#1A1A1A]" : "border-gray-300 bg-transparent"}`} />
                 ))}
               </div>

               {isAuthorizing && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="absolute flex flex-col items-center mt-32"
                 >
                   <div className="w-10 h-10 border-[3px] border-[#F4F4F4] border-t-[#27A163] rounded-full animate-spin shadow-sm" />
                   <span className="text-[16px] font-medium text-[#1A1A1A] mt-6 tracking-wide">Verifying Securely...</span>
                 </motion.div>
               )}
            </div>

            <div className={`w-full px-4 pb-6 mt-auto grid grid-cols-3 gap-y-6 gap-x-4 max-w-[320px] mx-auto transition-opacity duration-200 ${isAuthorizing ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "biometric", 0, "backspace"].map((val, idx) => (
                <div key={idx} className="flex items-center justify-center h-[60px]">
                  {val === "backspace" ? (
                    <motion.button
                      whileTap={{ scale: 0.9, backgroundColor: "#E5E7EB" }}
                      onClick={() => setAuthPin(prev => prev.slice(0, -1))}
                      className="w-16 h-16 rounded-full flex items-center justify-center bg-[#F4F4F4] text-[#1A1A1A]"
                    >
                      <Delete className="w-6 h-6" />
                    </motion.button>
                  ) : val === "biometric" ? (
                    <motion.button
                      whileTap={{ scale: 0.9, backgroundColor: "#E5E7EB" }}
                      className="w-16 h-16 rounded-full flex items-center justify-center bg-[#F4F4F4] text-[#1A1A1A]"
                    >
                       <Eye className="w-6 h-6" /> {/* Placeholder for FaceID/Biometric */}
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.9, backgroundColor: "#E5E7EB" }}
                      onClick={() => {
                        if (authPin.length >= 4) return;
                        const newPin = authPin + val;
                        setAuthPin(newPin);
                        if (newPin.length === 4) {
                          setIsAuthorizing(true);
                          setTimeout(() => {
                            setIsAuthorizing(false);
                            navigateTo("SUCCESS");
                          }, 600);
                        }
                      }}
                      className="w-16 h-16 rounded-full flex items-center justify-center bg-[#F4F4F4] text-[28px] font-medium text-[#1A1A1A]"
                    >
                      {val}
                    </motion.button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {appState === "FUND_WALLET_PROMPT" && (
          <motion.div
            key="fund_wallet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-[80] flex flex-col justify-end pt-[env(safe-area-inset-top)]"
          >
            <motion.div
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.8 }}
               className="bg-white rounded-t-[24px] shadow-2xl flex flex-col px-6 pt-6 pb-[max(env(safe-area-inset-bottom),24px)]"
            >
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-[24px] font-extrabold text-[#1A1A1A]">Fund Your Wallet</h2>
                 <button onClick={goBack} className="p-2 -mr-2 bg-[#F4F4F4] rounded-full">
                   <X className="w-6 h-6 text-[#1A1A1A]" />
                 </button>
               </div>

               <div className="flex flex-col items-center text-center mb-8">
                 <div className="w-16 h-16 bg-[#1A73E8]/10 rounded-full flex items-center justify-center mb-4">
                   <Banknote className="w-8 h-8 text-[#1A73E8]" />
                 </div>
                 <p className="text-[16px] font-medium text-[#666666] leading-relaxed">
                   To send money or make payments, you must first link a payment method and fund your Wi-Pa wallet. It is 100% free to deposit funds.
                 </p>
               </div>

               <motion.button
                 whileTap={{ scale: 0.98 }}
                 onClick={() => {
                   setTransactionMode("catalogue");
                   navigateTo("PAYMENT_AMOUNT");
                 }}
                 className="w-full h-[60px] bg-[#27A163] text-white rounded-[30px] text-[18px] font-bold shadow-lg flex items-center justify-center gap-2"
               >
                 Add Funds Now
               </motion.button>
               <button
                 onClick={goBack}
                 className="w-full h-[60px] bg-transparent text-[#666666] rounded-[30px] text-[18px] font-bold flex items-center justify-center mt-2"
               >
                 Maybe Later
               </button>
            </motion.div>
          </motion.div>
        )}

        {appState === "SUCCESS" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#27A163] z-[70] flex flex-col items-center justify-center px-6"
          >
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", delay: 0.2, damping: 20, stiffness: 300 }}
               className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl"
             >
               <CheckCircle className="w-12 h-12 text-[#27A163]" />
             </motion.div>
             <h1 className="text-[32px] font-extrabold text-white mb-2 text-center leading-tight">
               {transactionMode === "subscribe" ? "Added to Card" : transactionMode === "accept" ? "Service Consumed" : "Success"}
             </h1>
             <p className="text-[18px] font-medium text-white/90 mb-12 text-center">
               {Number(transactionAmount).toLocaleString()} {transactionMode === "subscribe" ? `added to your card from ${selectedContact?.handle}` : `redeemed at ${selectedContact?.handle}`}
             </p>

             <motion.button
               whileTap={{ scale: 0.98 }}
               onClick={() => {
                 setTransactionAmount("");
                 setTransactionNote("");
                 navigateTo("HOME");
               }}
               className="w-full max-w-[300px] h-[60px] bg-white text-[#27A163] rounded-[30px] text-[18px] font-bold shadow-lg"
             >
               Done
             </motion.button>
          </motion.div>
        )}

        {appState === "HISTORY" && (
          <motion.div
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0 }}
            className="absolute inset-0 bg-[#FFFFFF] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="pt-4 px-4 pb-4 shrink-0 bg-white shadow-sm z-20 flex flex-col gap-4">
              <h2 className="text-[24px] font-extrabold text-[#1A1A1A]">Activity</h2>
              <div className="w-full bg-[#F4F4F4] rounded-[16px] flex items-center px-4 h-[44px] focus-within:ring-2 focus-within:ring-[#27A163]/50 transition-all">
                <Search className="w-5 h-5 text-[#666666] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                  className="flex-1 text-[15px] text-[#1A1A1A] bg-transparent outline-none placeholder:text-[#666666] font-medium h-full"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-6">
              {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center mt-12 bg-[#F4F4F4] rounded-[24px] p-8 shadow-sm">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <HistoryIcon className="w-8 h-8 text-[#666666]" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2">No Transactions Yet</h3>
                  <p className="text-[15px] font-medium text-[#666666] leading-relaxed">
                    Your financial activity will appear here once you start sending, receiving, or depositing money.
                  </p>
                </div>
              ) : filteredTransactions.length === 0 ? (
                 <div className="text-center text-[#666666] mt-8 font-medium bg-[#F4F4F4] rounded-[24px] p-6">
                   No transactions found for &quot;{activitySearchQuery}&quot;
                 </div>
              ) : (
                ["Today", "Yesterday", "This Week"].map(group => {
                  const groupTxs = filteredTransactions.filter(tx => tx.date === group);
                  if (groupTxs.length === 0) return null;
                  return (
                    <div key={group} className="flex flex-col gap-3">
                      <h3 className="text-[14px] font-bold text-[#666666] uppercase tracking-wider ml-1">{group}</h3>
                      <div className="flex flex-col gap-3">
                        {groupTxs.map(tx => (
                          <div key={tx.id} className="bg-[#F4F4F4] p-4 rounded-[20px] flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-sm shrink-0">
                                <tx.icon className={`w-6 h-6 ${tx.type === "receive" ? "text-[#27A163]" : "text-[#1A1A1A]"}`} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[16px] font-bold text-[#1A1A1A]">
                                  {activitySearchQuery ? renderHighlightedText(tx.contactName, activitySearchQuery) : tx.contactName}
                                </span>
                                <span className="text-[14px] font-medium text-[#666666]">{tx.time} • {tx.contactHandle}</span>
                              </div>
                            </div>
                            <span className={`text-[16px] font-bold ${tx.type === 'receive' ? 'text-[#27A163]' : 'text-[#1A1A1A]'}`}>
                              {activitySearchQuery ? renderHighlightedText(tx.amount, activitySearchQuery) : tx.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Nav Bar */}
            <div className="h-[80px] w-full border-t border-[#E5E7EB] flex flex-row justify-around items-center pb-[max(env(safe-area-inset-bottom),0px)] bg-white shrink-0">
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("HOME")}>
                <Home className="w-6 h-6 text-[#666666] mb-1" strokeWidth={2} />
                <span className="text-[12px] font-medium text-[#666666]">Home</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <HistoryIcon className="w-6 h-6 text-[#1A1A1A] mb-1" strokeWidth={2.5} />
                <span className="text-[12px] font-bold text-[#1A1A1A]">Activity</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("ACCOUNT")}>
                <User className="w-6 h-6 text-[#666666] mb-1" strokeWidth={2} />
                <span className="text-[12px] font-medium text-[#666666]">Account</span>
              </div>
            </div>
          </motion.div>
        )}

        {appState === "ACCOUNT" && (
          <motion.div
            key="account"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0 }}
            className="absolute inset-0 bg-[#FFFFFF] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <h2 className="text-[24px] font-extrabold text-[#1A1A1A]">Account</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
               <div className="bg-[#F4F4F4] rounded-[24px] p-5 shadow-sm flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                   <User className="w-8 h-8 text-[#1A1A1A]" />
                 </div>
                 <div className="flex flex-col">
                   <h2 className="text-[20px] font-extrabold text-[#1A1A1A]">John User</h2>
                   <p className="text-[14px] font-medium text-[#666666]">@john_user</p>
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <h3 className="text-[16px] font-bold text-[#1A1A1A] px-2">Card Details</h3>
                 <div className="bg-[#F4F4F4] rounded-[24px] shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 border-b border-gray-200" onClick={() => navigateTo("LINKED_CARDS")}>
                     <div className="flex items-center gap-4">
                       <CreditCard className="w-5 h-5 text-[#1A1A1A]" />
                       <span className="text-[16px] font-bold text-[#1A1A1A]">Card Value</span>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400" />
                   </div>
                   <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => { setTransactionMode("catalogue"); navigateTo("PAYMENT_AMOUNT"); }}>
                     <div className="flex items-center gap-4">
                       <ArrowDownToLine className="w-5 h-5 text-[#1A1A1A]" />
                       <span className="text-[16px] font-bold text-[#1A1A1A]">Usage History</span>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400" />
                   </div>
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <h3 className="text-[16px] font-bold text-[#1A1A1A] px-2">Merchant</h3>
                 <div className="bg-[#F4F4F4] rounded-[24px] shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => navigateTo("PAYOUT_CONFIG")}>
                     <div className="flex items-center gap-4">
                       <Landmark className="w-5 h-5 text-[#1A1A1A]" />
                       <div className="flex flex-col">
                         <span className="text-[16px] font-bold text-[#1A1A1A]">Catalogue Management</span>
                         <span className="text-[12px] font-medium text-[#666666]">Services & Pricing</span>
                       </div>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400" />
                   </div>
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <h3 className="text-[16px] font-bold text-[#1A1A1A] px-2">Settings</h3>
                 <div className="bg-[#F4F4F4] rounded-[24px] shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => navigateTo("SETTINGS")}>
                     <div className="flex items-center gap-4">
                       <Settings className="w-5 h-5 text-[#1A1A1A]" />
                       <span className="text-[16px] font-bold text-[#1A1A1A]">General Settings</span>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400" />
                   </div>
                 </div>
               </div>

               <button className="w-full py-4 text-center text-[16px] font-bold text-red-500 mt-2">Log out</button>
            </div>

            {/* Bottom Nav Bar */}
            <div className="h-[80px] w-full border-t border-[#E5E7EB] flex flex-row justify-around items-center pb-[max(env(safe-area-inset-bottom),0px)] bg-white shrink-0">
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("HOME")}>
                <Home className="w-6 h-6 text-[#666666] mb-1" strokeWidth={2} />
                <span className="text-[12px] font-medium text-[#666666]">Home</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("HISTORY")}>
                <HistoryIcon className="w-6 h-6 text-[#666666] mb-1" strokeWidth={2} />
                <span className="text-[12px] font-medium text-[#666666]">Activity</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <User className="w-6 h-6 text-[#1A1A1A] mb-1" strokeWidth={2.5} />
                <span className="text-[12px] font-bold text-[#1A1A1A]">Account</span>
              </div>
            </div>
          </motion.div>
        )}


        {appState === "LINKED_CARDS" && (
          <motion.div
            key="linked_cards"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#FFFFFF] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">Payment Methods</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
               {savedMethods.length === 0 ? (
                 <div className="flex flex-col items-center justify-center text-center mt-12 bg-[#F4F4F4] rounded-[24px] p-8 shadow-sm">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                     <CreditCard className="w-8 h-8 text-[#666666]" />
                   </div>
                   <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2">No Saved Methods</h3>
                   <p className="text-[15px] font-medium text-[#666666] leading-relaxed">
                     Link a card or mobile money account to easily fund your Wi-Pa wallet.
                   </p>
                 </div>
               ) : (
                 savedMethods.map(method => (
                   <div key={method.id} className="bg-[#F4F4F4] p-4 rounded-[24px] shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-sm shrink-0">
                         <method.icon className="w-6 h-6 text-[#1A1A1A]" />
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[16px] font-bold text-[#1A1A1A]">{method.name}</span>
                         <span className="text-[14px] font-medium text-[#666666]">{method.details}</span>
                       </div>
                     </div>
                     <button
                       onClick={() => setSavedMethods(savedMethods.filter(m => m.id !== method.id))}
                       className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0"
                     >
                       <Trash2 className="w-5 h-5" />
                     </button>
                   </div>
                 ))
               )}

               <button
                 onClick={() => navigateTo("ADD_CARD")}
                 className="mt-4 flex items-center justify-center gap-2 w-full h-[60px] bg-[#F4F4F4] border-2 border-dashed border-gray-300 rounded-[24px] text-[#1A1A1A] font-bold hover:border-[#1A1A1A] transition-colors shrink-0"
               >
                 <Plus className="w-5 h-5" />
                 Add New Card
               </button>
            </div>
          </motion.div>
        )}

        {appState === "ADD_CARD" && (
          <motion.div
            key="add_card"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-[#FFFFFF] z-20 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white z-20 shadow-sm">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">Add Card</h2>
            </div>

            <div className="flex-1 px-6 pt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#1A1A1A] ml-1">Card Number</label>
                <div className="w-full bg-[#F4F4F4] rounded-[16px] px-4 h-[56px] flex items-center focus-within:ring-2 focus-within:ring-[#1A1A1A]/20 transition-all">
                  <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="text" placeholder="0000 0000 0000 0000" className="flex-1 bg-transparent text-[16px] font-bold text-[#1A1A1A] outline-none placeholder:text-gray-400" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[14px] font-bold text-[#1A1A1A] ml-1">Expiry Date</label>
                  <div className="w-full bg-[#F4F4F4] rounded-[16px] px-4 h-[56px] flex items-center focus-within:ring-2 focus-within:ring-[#1A1A1A]/20 transition-all">
                    <input type="text" placeholder="MM/YY" className="w-full bg-transparent text-[16px] font-bold text-[#1A1A1A] outline-none placeholder:text-gray-400" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[14px] font-bold text-[#1A1A1A] ml-1">CVC</label>
                  <div className="w-full bg-[#F4F4F4] rounded-[16px] px-4 h-[56px] flex items-center focus-within:ring-2 focus-within:ring-[#1A1A1A]/20 transition-all">
                    <input type="password" placeholder="•••" className="w-full bg-transparent text-[16px] font-bold text-[#1A1A1A] outline-none placeholder:text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white shrink-0 pb-[max(env(safe-area-inset-bottom),24px)]">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSavedMethods([...savedMethods, { id: Date.now(), type: "card", name: "New Card", details: "Mastercard •••• 8888", icon: CreditCard }]);
                  goBack();
                }}
                className="w-full h-[60px] bg-[#27A163] text-white rounded-[30px] text-[18px] font-bold flex items-center justify-center shadow-md"
              >
                Save Card
              </motion.button>
            </div>
          </motion.div>
        )}


        {appState === "SETTINGS" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#FFFFFF] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">Settings</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                 <h3 className="text-[16px] font-bold text-[#1A1A1A] px-2">Notifications</h3>
                 <div className="bg-[#F4F4F4] rounded-[24px] shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 flex items-center justify-between border-b border-gray-100">
                     <span className="text-[16px] font-bold text-[#1A1A1A]">Push Notifications</span>
                     <button
                       onClick={() => setPushNotifications(!pushNotifications)}
                       className={`w-14 h-8 rounded-full p-1 transition-colors ${pushNotifications ? "bg-[#27A163]" : "bg-gray-300"} relative`}
                     >
                       <motion.div
                         layout
                         className="w-6 h-6 bg-white rounded-full shadow-sm"
                         animate={{ x: pushNotifications ? 24 : 0 }}
                       />
                     </button>
                   </div>
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <h3 className="text-[16px] font-bold text-[#1A1A1A] px-2">Merchant Customization</h3>
                 <div className="bg-[#F4F4F4] rounded-[24px] shadow-sm overflow-hidden flex flex-col">
                   <div
                     onClick={() => navigateTo("MERCHANT_SETTINGS")}
                     className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors"
                   >
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                         <merchantCategory.icon className="w-5 h-5 text-[#1A1A1A]" />
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[16px] font-bold text-[#1A1A1A]">Business Type</span>
                         <span className="text-[13px] font-medium text-[#666666]">{merchantCategory.name}</span>
                       </div>
                     </div>
                     <ChevronRight className="w-5 h-5 text-[#666666]" />
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}

        {appState === "MERCHANT_SETTINGS" && (
          <motion.div
            key="merchant_settings"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#FFFFFF] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">Business Type</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-3">
               {[
                 { name: "Cafe", icon: Utensils },
                 { name: "Retail", icon: ShoppingBag },
                 { name: "Transport", icon: Car },
                 { name: "Tech", icon: Laptop },
                 { name: "Services", icon: Wrench },
                 { name: "General Store", icon: Store }
               ].map((cat) => (
                 <div
                   key={cat.name}
                   onClick={() => {
                     setMerchantCategory({ name: cat.name, icon: cat.icon });

                     // Update MOCK_TRANSACTIONS and CONTACTS to reflect the change for demonstration
                     setTransactions(prev => prev.map(t =>
                       t.contactHandle === "@coffee_shop" ? { ...t, icon: cat.icon } : t
                     ));

                     goBack();
                   }}
                   className={`flex items-center justify-between p-4 rounded-[16px] border-[2px] cursor-pointer transition-all ${merchantCategory.name === cat.name ? "border-[#1A1A1A] bg-[#1A1A1A]/5" : "border-transparent bg-[#F4F4F4] hover:bg-gray-100"}`}
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-[12px] flex items-center justify-center shadow-sm">
                       <cat.icon className="w-5 h-5 text-[#1A1A1A]" />
                     </div>
                     <span className="text-[16px] font-bold text-[#1A1A1A]">{cat.name}</span>
                   </div>
                   {merchantCategory.name === cat.name && <div className="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                 </div>
               ))}
            </div>
          </motion.div>
        )}


        {appState === "PAYOUT_CONFIG" && (
          <motion.div
            key="payout_config"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#FFFFFF] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">Payout Methods</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
               {payoutMethods.length === 0 ? (
                 <div className="flex flex-col items-center justify-center text-center mt-12 bg-[#F4F4F4] rounded-[24px] p-8 shadow-sm">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                     <Landmark className="w-8 h-8 text-[#666666]" />
                   </div>
                   <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2">No Payout Methods</h3>
                   <p className="text-[15px] font-medium text-[#666666] leading-relaxed">
                     Configure a payout destination to receive your settlements seamlessly.
                   </p>
                 </div>
               ) : (
                 payoutMethods.map((method, index) => (
                   <div key={method.id} className="bg-[#F4F4F4] p-4 rounded-[24px] shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-sm">
                         <Landmark className="w-6 h-6 text-[#1A1A1A]" />
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[16px] font-bold text-[#1A1A1A]">{method.name}</span>
                         <span className="text-[14px] font-medium text-[#666666]">{method.details}</span>
                       </div>
                     </div>
                     <div className="flex items-center gap-2">
                       {index === 0 && (
                         <div className="bg-[#27A163]/10 text-[#27A163] px-3 py-1 rounded-full text-[12px] font-bold shrink-0">
                           Default
                         </div>
                       )}
                       <button
                         onClick={() => setPayoutMethods(payoutMethods.filter(m => m.id !== method.id))}
                         className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                     </div>
                   </div>
                 ))
               )}

               <button
                 onClick={() => navigateTo("ADD_PAYOUT")}
                 className="mt-4 flex items-center justify-center gap-2 w-full h-[60px] bg-[#F4F4F4] border-2 border-dashed border-gray-300 rounded-[24px] text-[#1A1A1A] font-bold hover:border-[#1A1A1A] transition-colors shrink-0"
               >
                 <Plus className="w-5 h-5" />
                 Add Payout Destination
               </button>
            </div>
          </motion.div>
        )}

        {appState === "ADD_PAYOUT" && (
          <motion.div
            key="add_payout"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-[#FFFFFF] z-20 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white z-20 shadow-sm">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">Add Payout Destination</h2>
            </div>

            <div className="flex-1 px-6 pt-8 flex flex-col gap-6 overflow-y-auto">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#1A1A1A] ml-1">Destination Type</label>
                <div className="w-full bg-[#F4F4F4] rounded-[16px] px-4 h-[56px] flex items-center focus-within:ring-2 focus-within:ring-[#1A1A1A]/20 transition-all">
                  <Landmark className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                  <select className="flex-1 bg-transparent text-[16px] font-bold text-[#1A1A1A] outline-none">
                    <option>Merchant Till</option>
                    <option>Bank Account</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#1A1A1A] ml-1">Account / Till Number</label>
                <div className="w-full bg-[#F4F4F4] rounded-[16px] px-4 h-[56px] flex items-center focus-within:ring-2 focus-within:ring-[#1A1A1A]/20 transition-all">
                  <input type="text" placeholder="e.g., 0150 0000 0000" className="flex-1 bg-transparent text-[16px] font-bold text-[#1A1A1A] outline-none placeholder:text-gray-400" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white shrink-0 pb-[max(env(safe-area-inset-bottom),24px)]">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setPayoutMethods([...payoutMethods, { id: Date.now(), type: "till", name: "Merchant Till", details: "M-Pesa •••• 1234" }]);
                  goBack();
                }}
                className="w-full h-[60px] bg-[#27A163] text-white rounded-[30px] text-[18px] font-bold flex items-center justify-center shadow-md"
              >
                Save Payout Destination
              </motion.button>
            </div>
          </motion.div>
        )}


        {appState === "RECEIVE_LINK" && (
          <motion.div
            key="receive_link"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-[#F4F4F4] z-20 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-white rounded-full shadow-sm">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
               <div className="w-full max-w-[320px] bg-white rounded-[32px] shadow-xl p-8 flex flex-col items-center">
                 <div className="w-20 h-20 bg-[#F4F4F4] rounded-full flex items-center justify-center mb-6">
                   <User className="w-10 h-10 text-[#1A1A1A]" />
                 </div>
                 <h2 className="text-[28px] font-extrabold text-[#1A1A1A] mb-1 tracking-tight">John User</h2>
                 <p className="text-[20px] font-medium text-[#666666] mb-10">@john_user</p>

                 <div className="flex flex-col gap-3 w-full">
                   <motion.button
                     whileTap={{ scale: 0.95 }}
                     className="w-full h-[56px] bg-[#27A163] text-white rounded-[28px] text-[16px] font-bold flex items-center justify-center gap-2 shadow-md"
                   >
                     <Copy className="w-5 h-5" />
                     Copy Card ID
                   </motion.button>

                   <motion.button
                     whileTap={{ scale: 0.95 }}
                     className="w-full h-[56px] bg-[#F4F4F4] text-[#1A1A1A] border border-gray-200 rounded-[28px] text-[16px] font-bold flex items-center justify-center gap-2"
                   >
                     <Share2 className="w-5 h-5" />
                     Share Card ID
                   </motion.button>
                 </div>
               </div>
            </div>
          </motion.div>
        )}



        {appState === "MERCHANT_STOREFRONT" && (
          <motion.div
            key="merchant_storefront"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-white z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white z-20 shadow-sm border-b border-gray-100">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">{selectedContact?.name || "Merchant"}</h2>
            </div>

            <div className="flex flex-col px-4 pt-6 pb-2 shrink-0">
               <div className="w-16 h-16 bg-[#F4F4F4] rounded-[16px] flex items-center justify-center mb-4">
                 {selectedContact?.icon ? <selectedContact.icon className="w-8 h-8 text-[#1A1A1A]" /> : <Store className="w-8 h-8 text-[#1A1A1A]" />}
               </div>
               <h1 className="text-[24px] font-extrabold text-[#1A1A1A] mb-1">{selectedContact?.name || "Merchant"}</h1>
               <p className="text-[15px] font-medium text-[#666666]">Select a service to add to your card.</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
               {merchantCatalogue.map(service => (
                 <div
                   key={service.id}
                   onClick={() => { setSelectedService(service); navigateTo("PAYMENT_AMOUNT"); }}
                   className="bg-[#F4F4F4] p-4 rounded-[20px] flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-sm shrink-0">
                       <service.icon className="w-6 h-6 text-[#1A1A1A]" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[16px] font-bold text-[#1A1A1A]">{service.name}</span>
                       <span className="text-[14px] font-medium text-[#666666]">TZS {service.price.toLocaleString()}</span>
                     </div>
                   </div>
                   <ChevronRight className="w-5 h-5 text-gray-400" />
                 </div>
               ))}
            </div>
          </motion.div>
        )}

        {appState === "CATALOGUE_STUDIO" && (
          <motion.div
            key="catalogue_studio"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#FFFFFF] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">Manage Catalogue</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
               {merchantCatalogue.map(service => (
                 <div key={service.id} className="bg-[#F4F4F4] p-4 rounded-[24px] shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-sm shrink-0">
                       <service.icon className="w-6 h-6 text-[#1A1A1A]" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[16px] font-bold text-[#1A1A1A]">{service.name}</span>
                       <span className="text-[14px] font-medium text-[#666666]">TZS {service.price.toLocaleString()}</span>
                     </div>
                   </div>
                   <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0">
                     <Trash2 className="w-5 h-5" />
                   </button>
                 </div>
               ))}

               <button className="mt-4 flex items-center justify-center gap-2 w-full h-[60px] bg-[#F4F4F4] border-2 border-dashed border-gray-300 rounded-[24px] text-[#1A1A1A] font-bold hover:border-[#1A1A1A] transition-colors shrink-0">
                 <Plus className="w-5 h-5" />
                 Add New Service
               </button>
            </div>
          </motion.div>
        )}

        {appState === "MERCHANT_CONSUME_VIEW" && (
          <motion.div
            key="merchant_consume_view"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-white z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white z-20 shadow-sm border-b border-gray-100">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">{selectedContact?.name || "Customer"}</h2>
            </div>

            <div className="flex flex-col px-4 pt-6 pb-2 shrink-0">
               <div className="w-16 h-16 bg-[#F4F4F4] rounded-[16px] flex items-center justify-center mb-4">
                 <User className="w-8 h-8 text-[#1A1A1A]" />
               </div>
               <h1 className="text-[24px] font-extrabold text-[#1A1A1A] mb-1">{selectedContact?.name || "Customer"}</h1>
               <p className="text-[15px] font-medium text-[#666666]">Available services on their card.</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
               {[{id: 1, name: "Breakfast", count: 18, icon: Utensils}, {id: 2, name: "Lunch", count: 5, icon: Utensils}].map(service => (
                 <div
                   key={service.id}
                   onClick={() => {
                      setSelectedService({name: service.name, price: 0});
                      setTransactionAmount("1");
                      navigateTo("CONFIRMATION");
                   }}
                   className="bg-[#27A163]/10 p-4 rounded-[20px] flex items-center justify-between cursor-pointer hover:bg-[#27A163]/20 transition-colors"
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-sm shrink-0">
                       <service.icon className="w-6 h-6 text-[#27A163]" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[16px] font-bold text-[#1A1A1A]">{service.name}</span>
                       <span className="text-[14px] font-medium text-[#27A163]">{service.count} remaining</span>
                     </div>
                   </div>
                   <button className="px-4 py-2 bg-[#27A163] text-white rounded-full text-[14px] font-bold">
                     Consume
                   </button>
                 </div>
               ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>



      {/* Payment Method Selector Bottom Sheet Overlay */}
      <AnimatePresence>
        {isMethodSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMethodSheetOpen(false)}
              className="absolute inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white z-50 rounded-t-[24px] pb-[env(safe-area-inset-bottom)] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden max-h-[85vh]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold text-[#1A1A1A]">Select Method</h2>
                <button onClick={() => setIsMethodSheetOpen(false)} className="p-2 -mr-2 bg-[#F4F4F4] rounded-full">
                  <X className="w-5 h-5 text-[#1A1A1A]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col gap-3">
                {savedMethods.map(method => (
                  <div
                    key={method.id}
                    onClick={() => { setSelectedMethodId(method.id); setIsMethodSheetOpen(false); }}
                    className={`flex items-center justify-between p-4 rounded-[16px] border-[2px] cursor-pointer transition-all ${selectedMethodId === method.id ? "border-[#1A1A1A] bg-[#1A1A1A]/5" : "border-transparent bg-[#F4F4F4] hover:bg-gray-100"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-[12px] flex items-center justify-center shadow-sm">
                        <method.icon className="w-5 h-5 text-[#1A1A1A]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[16px] font-bold text-[#1A1A1A]">{method.name}</span>
                        <span className="text-[13px] font-medium text-[#666666]">{method.details}</span>
                      </div>
                    </div>
                    {selectedMethodId === method.id && <div className="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                  </div>
                ))}

                <div className="h-px bg-gray-200 my-2" />

                <div
                  onClick={() => { setSelectedMethodId("new_mobile"); setIsMethodSheetOpen(false); }}
                  className={`flex items-center justify-between p-4 rounded-[16px] border-[2px] cursor-pointer transition-all ${selectedMethodId === "new_mobile" ? "border-[#1A1A1A] bg-[#1A1A1A]/5" : "border-transparent bg-[#F4F4F4] hover:bg-gray-100"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-[12px] flex items-center justify-center shadow-sm">
                      <Banknote className="w-5 h-5 text-[#1A1A1A]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-[#1A1A1A]">Enter New Mobile Number</span>
                    </div>
                  </div>
                  {selectedMethodId === "new_mobile" && <div className="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                </div>

                <button
                  onClick={() => { setIsMethodSheetOpen(false); navigateTo("ADD_CARD"); }}
                  className="mt-2 flex items-center justify-center gap-2 w-full h-[56px] bg-[#F4F4F4] border-2 border-dashed border-gray-300 rounded-[16px] text-[#1A1A1A] font-bold hover:border-[#1A1A1A] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add New Card
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hamburger Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-y-0 left-0 w-[80%] max-w-[320px] bg-white z-50 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between pt-[max(env(safe-area-inset-top),24px)]">
                <div className="w-12 h-12 bg-[#F4F4F4] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 bg-[#F4F4F4] rounded-full">
                  <X className="w-5 h-5 text-[#1A1A1A]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 pt-6">
                 <div
                   onClick={() => { setIsMenuOpen(false); navigateTo("SETTINGS"); }}
                   className="flex items-center gap-4 cursor-pointer p-3 hover:bg-gray-50 rounded-[16px] transition-colors mt-2"
                 >
                   <Settings className="w-6 h-6 text-[#1A1A1A]" />
                   <span className="text-[18px] font-bold text-[#1A1A1A]">Settings</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
