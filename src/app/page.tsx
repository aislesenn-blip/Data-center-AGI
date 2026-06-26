"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {  Tag, X, Car, Bike, Package, Search, Clock, PlusSquare, Utensils, Home, Calendar, User, MapPin, WifiOff, Map, Phone, MessageSquare, CheckCircle, Star, Loader, Plus, ArrowDownUp, Menu, Banknote, CreditCard, Smartphone, ChevronRight, Settings, Send, Timer, Navigation, History as HistoryIcon  } from "lucide-react"

type AppState = "HOME" | "ROUTE_SELECTION" | "LOCATION_SEARCH" | "FARE_SELECTION" | "PAYMENT_METHODS" | "DELIVERIES" | "ACCOUNT" | "PROMOTIONS" | "SETTINGS" | "FINDING" | "EN_ROUTE" | "SUGGESTION_BOX" | "RUNNER_ARRIVING" | "DELIVERY_COMPLETE" | "STAFF_DASHBOARD" | "STAFF_INCOMING_REQUEST" | "STAFF_ACTIVE_DELIVERIES"
type VehicleOption = "standard" | "express"
type PaymentMethod = "cash" | "mobile" | "card"

const LOCATIONS = [
  { id: 1, name: "Moshi Urban", sub: "Tanzania", dist: "3.6 km", icon: Clock, type: "history" },
  { id: 2, name: "MOSHI URBAN", sub: "Area", dist: "", icon: Navigation, type: "area" },
  { id: 3, name: "KCMC", sub: "Hospital", dist: "5.2 km", icon: Navigation, type: "location" },
  { id: 4, name: "Hugo's Garden", sub: "Restaurant", dist: "2.1 km", icon: Navigation, type: "location" },
]

export default function App() {
  const [navStack, setNavStack] = useState<AppState[]>(["HOME"])
  const appState = navStack[navStack.length - 1]
  const [isPromoVisible, setIsPromoVisible] = useState(true)
  const [deliveryMode, setDeliveryMode] = useState<"fetch" | "send">("fetch")
  const [itemDescription, setItemDescription] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")
  const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false)
  const [isMapPicking, setIsMapPicking] = useState(false)
  const [dropoffLocation, setDropoffLocation] = useState("Current Location")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption>("standard")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false)

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
        // Do not pushState here, we use history.back() to let popstate handle it
        window.history.back();
        return newStack;
      }
      return ["HOME"];
    });
  }

  // Edge cases state
  const [isCalling, setIsCalling] = useState(false)
  const [isChatting, setIsChatting] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [isGpsDenied, setIsGpsDenied] = useState(false)

  // --- Staff State Variables ---
  const [staffStatus, setStaffStatus] = useState<"offline" | "online">("offline");
  const [activeOrders, setActiveOrders] = useState<Array<{id: string, status: string, pickup: string, dropoff: string}>>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])


  const filteredLocations = LOCATIONS.filter(loc => {
    if (!searchQuery) return loc.type !== "area"
    return loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const [sheetY, setSheetY] = useState(0)
  // Ensure the drag uses the latest react pointer types natively provided by framer-motion.
  // Using explicit any to suppress the conflicting event type signature since it's an internal UI callback.
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }, velocity: { x: number; y: number } }) => {
    // Uber/Bolt physics: Consider both offset and velocity for momentum
    const velocityThreshold = 500;
    const distanceThreshold = 100;

    const isFlickingDown = info.velocity.y > velocityThreshold;
    const isFlickingUp = info.velocity.y < -velocityThreshold;
    const isDraggingDown = info.offset.y > distanceThreshold;
    const isDraggingUp = info.offset.y < -distanceThreshold;

    if (isFlickingDown || isDraggingDown) {
      setSheetY(300) // peek down
    } else if (isFlickingUp || isDraggingUp) {
      setSheetY(-250) // expand up
    } else {
      setSheetY(0) // snap to default middle
    }
  }

  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) =>
          regex.test(part) ? <span key={i} className="text-[#1D965C]">{part}</span> : <span key={i}>{part}</span>
        )}
      </span>
    )
  }

  const handleSuggestionClick = () => {
    navigateTo("FARE_SELECTION")
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-white overflow-hidden text-[#111827]">

      {/* Global No Internet Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="absolute top-0 left-0 right-0 bg-red-500 text-white p-4 pt-[calc(env(safe-area-inset-top)+16px)] z-[100] flex items-center justify-center gap-2 shadow-lg"
          >
            <WifiOff className="w-5 h-5 text-white" />
            <span className="text-[14px] font-medium">No internet connection. Waiting for network...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global GPS Denied Empty State */}
      {isGpsDenied && (
         <div className="absolute inset-0 bg-white z-[90] flex flex-col items-center justify-center p-6 text-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-[24px] font-bold text-[#111827] mb-3">Location Disabled</h2>
            <p className="text-[16px] text-[#6B7280] mb-8">We need your location to deliver to you. Please enable GPS in your device settings.</p>
            <button
              onClick={() => setIsGpsDenied(false)} // Mock resolving it
              className="w-full max-w-[300px] h-[56px] bg-[#111827] text-white rounded-[28px] text-[18px] font-bold"
            >
              Enable Location
            </button>
         </div>
      )}

      <AnimatePresence initial={false}>
        {appState === "HOME" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="flex flex-col h-full"
          >
            <div className="flex-1 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] px-4 bg-[#F9FAFB]">
              {/* Hamburger and Promo */}
              <div className="mt-4 flex items-center justify-between mb-6">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer shadow-sm z-20 absolute top-4 left-4"
                >
                  <Menu className="w-5 h-5 text-[#111827]" />
                </button>
              </div>

              {/* Promo Banner */}
              {isPromoVisible && (
                <div className="mt-12 w-full bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] border border-[#C7D2FE] shadow-sm rounded-[16px] p-4 relative mb-6 overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#4F46E5]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex flex-col relative z-10">
                    <span className="text-[15px] font-bold text-[#3730A3] leading-tight flex items-center gap-2">
                       <Star className="w-4 h-4 text-[#4F46E5] fill-[#4F46E5]" />
                       Anything you need, delivered faster.
                    </span>
                    <span className="text-[13px] font-medium text-[#4F46E5] mt-1 pr-4">Order anything from our trusted local partners directly to your door.</span>
                  </div>
                  <button
                    onClick={() => setIsPromoVisible(false)}
                    className="absolute top-3 right-3 p-1 bg-[#4F46E5]/10 rounded-full hover:bg-[#4F46E5]/20 transition-colors z-10"
                  >
                    <X className="w-4 h-4 text-[#3730A3]" />
                  </button>
                </div>
              )}

              {/* H1 Greeting */}
              <h1 className="text-[28px] font-extrabold text-[#111827] mb-6 tracking-[-0.5px]">
                Smooth deliveries ahead.
              </h1>

              {/* Bento Grid */}
              <div className="flex flex-row justify-between gap-4 mb-8">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setDeliveryMode("fetch"); navigateTo("ROUTE_SELECTION"); }}
                  className="flex-1 h-[130px] bg-white rounded-[24px] border border-gray-100 shadow-sm p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-10 h-10 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center self-start mb-2">
                     <Package className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="mt-auto">
                    <div className="text-[16px] font-bold text-[#111827] leading-tight">I Need Something</div>
                    <div className="text-[13px] font-medium text-[#6B7280] mt-0.5">Request an item</div>
                  </div>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setDeliveryMode("send"); navigateTo("ROUTE_SELECTION"); }}
                  className="flex-1 h-[130px] bg-white rounded-[24px] border border-gray-100 shadow-sm p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-10 h-10 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center self-start mb-2">
                     <Send className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="mt-auto">
                    <div className="text-[16px] font-bold text-[#111827] leading-tight">Send Something</div>
                    <div className="text-[13px] font-medium text-[#6B7280] mt-0.5">Deliver an item</div>
                  </div>
                </motion.div>
              </div>

              {/* Search Input CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => { setDeliveryMode("fetch"); navigateTo("ROUTE_SELECTION"); }}
                className="w-full h-[60px] bg-white rounded-[24px] border border-gray-100 shadow-sm flex items-center px-5 mb-8 cursor-text"
              >
                <Search className="w-5 h-5 text-[#111827] mr-3" strokeWidth={2} />
                <span className="text-[18px] font-bold text-[#111827]">Anything you need?</span>
              </motion.button>

              {/* Recent Locations */}
              <h2 className="text-[18px] font-bold text-[#111827] mb-4">Recent</h2>
              <div className="flex flex-col gap-3 pb-8">
                <div className="flex items-center cursor-pointer bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm" onClick={() => navigateTo("ROUTE_SELECTION")}>
                  <div className="w-12 h-12 rounded-[14px] bg-[#F9FAFB] flex items-center justify-center mr-4 shrink-0">
                    <Clock className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#111827]">Moshi Urban</span>
                    <span className="text-[14px] font-medium text-[#6B7280]">Tanzania</span>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm" onClick={() => navigateTo("ROUTE_SELECTION")}>
                  <div className="w-12 h-12 rounded-[14px] bg-[#F9FAFB] flex items-center justify-center mr-4 shrink-0">
                    <PlusSquare className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#111827]">KCMC</span>
                    <span className="text-[14px] font-medium text-[#6B7280]">Hospital</span>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm" onClick={() => navigateTo("ROUTE_SELECTION")}>
                  <div className="w-12 h-12 rounded-[14px] bg-[#F9FAFB] flex items-center justify-center mr-4 shrink-0">
                    <Utensils className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#111827]">Hugo&apos;s Garden</span>
                    <span className="text-[14px] font-medium text-[#6B7280]">Restaurant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Nav Bar */}
            <div className="h-[80px] w-full border-t border-[#E5E7EB] flex flex-row justify-around items-center pb-[env(safe-area-inset-bottom)] bg-white shrink-0">
              <div className="flex flex-col items-center cursor-pointer">
                <Home className="w-6 h-6 text-[#111827] mb-1" strokeWidth={2.5} />
                <span className="text-[12px] font-semibold text-[#111827]">Home</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("DELIVERIES")}>
                <HistoryIcon className="w-6 h-6 text-[#6B7280] mb-1" />
                <span className="text-[12px] font-medium text-[#6B7280]">Deliveries</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("ACCOUNT")}>
                <User className="w-6 h-6 text-[#6B7280] mb-1" />
                <span className="text-[12px] font-medium text-[#6B7280]">Account</span>
              </div>
            </div>
          </motion.div>
        )}

        {appState === "LOCATION_SEARCH" && (
          <motion.div
            key="location_search"
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
                className="p-2 -ml-2 bg-gray-50 rounded-full"
              >
                <X className="w-5 h-5 text-[#111827]" />
              </button>
              <div className="flex-1 bg-[#F3F4F6] rounded-[16px] flex items-center px-4 h-[48px]">
                <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Where from?"
                  autoFocus
                  className="flex-1 text-[16px] text-[#111827] bg-transparent outline-none placeholder:text-[#6B7280] font-medium h-full"
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
               <h3 className="text-[14px] font-bold text-[#6B7280] mb-4 uppercase tracking-wider ml-2">Recent</h3>
               <div className="flex flex-col gap-2">
                 {[
                   { name: "Cafeteria A", sub: "Main Campus" },
                   { name: "Hostel Block C", sub: "North Wing" },
                   { name: "Hugo's Garden", sub: "Restaurant" }
                 ].map((loc, i) => (
                   <div
                     key={i}
                     onClick={() => {
                        setPickupLocation(loc.name);
                        goBack();
                     }}
                     className="flex items-center gap-4 p-3 rounded-[16px] hover:bg-gray-50 cursor-pointer"
                   >
                      <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center shrink-0">
                         <Clock className="w-5 h-5 text-[#111827]" />
                      </div>
                      <div className="flex flex-col border-b border-gray-100 flex-1 pb-3">
                         <span className="text-[16px] font-bold text-[#111827]">{loc.name}</span>
                         <span className="text-[14px] font-medium text-[#6B7280]">{loc.sub}</span>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}

        {appState === "ROUTE_SELECTION" && (
          <motion.div
            key="route_selection"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-[#F9FAFB] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            {/* Top Nav */}
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <button
                onClick={goBack}
                className="absolute left-4 p-2 -ml-2 bg-gray-50 rounded-full"
              >
                <X className="w-5 h-5 text-[#111827]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#111827]">
                {deliveryMode === "fetch" ? "I Need Something" : "Send Something"}
              </h2>
            </div>

            {/* Form Section */}
            <div className="px-4 py-6 flex-1 overflow-y-auto">

               {/* 1. What do you need? (For Fetch mode) or Item Description (For Send) */}
               <div className="mb-6">
                 <label className="text-[14px] font-bold text-[#111827] ml-1 mb-2 block">
                   {deliveryMode === "fetch" ? "What do you need?" : "What are you sending?"}
                 </label>
                 <div className="w-full bg-white border border-gray-200 rounded-[20px] flex items-center px-4 shadow-sm h-[60px] focus-within:border-[#1D965C] focus-within:ring-1 focus-within:ring-[#1D965C] transition-all">
                   {deliveryMode === "fetch" ? <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" /> : <Package className="w-5 h-5 text-gray-400 mr-3 shrink-0" />}
                   <input
                     type="text"
                     placeholder={deliveryMode === "fetch" ? "e.g. Burger, Medicine, Charger..." : "e.g. Notebook, Keys..."}
                     value={itemDescription}
                     onChange={(e) => setItemDescription(e.target.value)}
                     className="flex-1 text-[16px] text-[#111827] bg-transparent outline-none placeholder:text-gray-400 font-medium h-full"
                     autoFocus
                   />
                 </div>
                 <span className="text-[13px] font-medium text-gray-500 mt-2 block ml-2">
                   {deliveryMode === "fetch" ? "Describe the item and its approximate price." : "Describe the item."}
                 </span>
               </div>

               {/* Route Timeline */}
               <div className="relative pl-6">
                 {/* Timeline line */}
                 <div className="absolute left-[11px] top-[30px] bottom-[30px] w-0.5 bg-gray-200" />

                 {/* 2. Where from? */}
                 <div className="mb-6 relative">
                   <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#E5E7EB] flex items-center justify-center border-2 border-white shadow-sm z-10">
                     <div className="w-2 h-2 bg-[#111827] rounded-full" />
                   </div>
                   <label className="text-[14px] font-bold text-[#111827] ml-1 mb-2 block">
                     {deliveryMode === "fetch" ? "Where from?" : "Pickup from"}
                   </label>
                   <div
                     onClick={() => navigateTo("LOCATION_SEARCH")}
                     className="w-full bg-[#F3F4F6] border border-transparent rounded-[16px] flex items-center px-4 h-[56px] cursor-pointer hover:bg-[#E5E7EB] transition-all"
                   >
                     <span className={`text-[16px] font-medium flex-1 ${pickupLocation ? "text-[#111827]" : "text-[#6B7280]"}`}>{pickupLocation || "Search for a location or partner..."}</span>
                   </div>
                 </div>


                 {/* Rule Banner */}
                 <div className="mb-6 ml-[-24px] bg-[#EEF2FF] rounded-r-[16px] p-3 flex items-center gap-3 border-l-4 border-[#4F46E5]">
                   <span className="text-[12px] font-bold text-[#3730A3]">One item equals one delivery. Please do not bundle independent shopping requests.</span>
                 </div>

                 {/* 3. Deliver to */}
                 <div className="relative">
                   <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#1D965C]/20 flex items-center justify-center border-2 border-white shadow-sm z-10">
                     <div className="w-2.5 h-2.5 bg-[#1D965C] rounded-full" />
                   </div>
                   <label className="text-[14px] font-bold text-[#111827] ml-1 mb-2 block">
                     Deliver to
                   </label>
                   <div className="w-full bg-white border border-gray-200 rounded-[20px] flex items-center px-4 shadow-sm h-[60px] focus-within:border-[#1D965C] transition-all relative overflow-hidden">
                     <input
                       type="text"
                       value={dropoffLocation}
                       onChange={(e) => setDropoffLocation(e.target.value)}
                       placeholder="Destination"
                       className="flex-1 text-[16px] text-[#111827] bg-transparent outline-none placeholder:text-gray-400 font-medium h-full"
                     />
                     <div
                        onClick={() => setIsMapPicking(true)}
                        className="w-10 h-10 bg-[#F9FAFB] rounded-[12px] flex items-center justify-center shrink-0 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
                     >
                        <Map className="w-4 h-4 text-[#111827]" />
                     </div>
                   </div>
                 </div>
               </div>

            </div>

            <div className="p-4 bg-white border-t border-gray-100 shrink-0 pb-[max(env(safe-area-inset-bottom),24px)] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("FARE_SELECTION")}
                className="w-full h-[60px] bg-[#111827] text-white rounded-[30px] text-[18px] font-bold shadow-md flex items-center justify-center"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}

        {appState === "DELIVERIES" && (
          <motion.div
            key="deliveries"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0 }}
            className="absolute inset-0 bg-[#F9FAFB] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <h2 className="text-[24px] font-extrabold text-[#111827]">Deliveries</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
              <h3 className="text-[18px] font-bold text-[#111827] mb-2">Past Orders</h3>

              <div className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm flex flex-col gap-3">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center">
                       <Package className="w-5 h-5 text-[#111827]" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[16px] font-bold text-[#111827]">1x Chicken Burger</span>
                       <span className="text-[13px] font-medium text-[#6B7280]">Main Cafeteria • 2 days ago</span>
                     </div>
                   </div>
                   <span className="text-[14px] font-bold text-[#111827]">TZS 300</span>
                 </div>
                 <div className="flex gap-2 mt-1">
                   <button className="flex-1 h-[40px] bg-gray-50 rounded-[12px] font-bold text-[14px] text-[#111827]">Receipt</button>
                   <button className="flex-1 h-[40px] bg-gray-50 rounded-[12px] font-bold text-[14px] text-[#111827]">Reorder</button>
                 </div>
              </div>

              <div className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm flex flex-col gap-3 opacity-70">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center">
                       <Package className="w-5 h-5 text-[#111827]" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[16px] font-bold text-[#111827]">A4 Printing Pages</span>
                       <span className="text-[13px] font-medium text-[#6B7280]">Printing Centre • Last week</span>
                     </div>
                   </div>
                   <span className="text-[14px] font-bold text-[#111827]">TZS 300</span>
                 </div>
              </div>

            </div>

            {/* Bottom Nav Bar */}
            <div className="h-[80px] w-full border-t border-[#E5E7EB] flex flex-row justify-around items-center pb-[max(env(safe-area-inset-bottom),0px)] bg-white shrink-0">
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("HOME")}>
                <Home className="w-6 h-6 text-[#6B7280] mb-1" strokeWidth={2} />
                <span className="text-[12px] font-medium text-[#6B7280]">Home</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <HistoryIcon className="w-6 h-6 text-[#111827] mb-1" strokeWidth={2.5} />
                <span className="text-[12px] font-bold text-[#111827]">Deliveries</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("ACCOUNT")}>
                <User className="w-6 h-6 text-[#6B7280] mb-1" strokeWidth={2} />
                <span className="text-[12px] font-medium text-[#6B7280]">Account</span>
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
            className="absolute inset-0 bg-[#F9FAFB] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <h2 className="text-[24px] font-extrabold text-[#111827]">Account</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
               <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                   <User className="w-8 h-8 text-gray-400" />
                 </div>
                 <div className="flex flex-col">
                   <h2 className="text-[20px] font-extrabold text-[#111827]">Jane Doe</h2>
                   <p className="text-[14px] font-medium text-[#6B7280]">+255 700 000 000</p>
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <h3 className="text-[16px] font-bold text-[#111827] px-2">Preferences</h3>
                 <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                     <div className="flex items-center gap-4">
                       <MapPin className="w-5 h-5 text-[#111827]" />
                       <span className="text-[16px] font-bold text-[#111827]">Saved Places</span>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400" />
                   </div>
                   <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                     <div className="flex items-center gap-4">
                       <Banknote className="w-5 h-5 text-[#111827]" />
                       <span className="text-[16px] font-bold text-[#111827]">Payment Methods</span>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400" />
                   </div>
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <h3 className="text-[16px] font-bold text-[#111827] px-2">Support</h3>
                 <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                     <div className="flex items-center gap-4">
                       <Tag className="w-5 h-5 text-[#111827]" />
                       <span className="text-[16px] font-bold text-[#111827]">Promotions</span>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-400" />
                   </div>
                   <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                     <div className="flex items-center gap-4">
                       <Settings className="w-5 h-5 text-[#111827]" />
                       <span className="text-[16px] font-bold text-[#111827]">Settings</span>
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
                <Home className="w-6 h-6 text-[#6B7280] mb-1" strokeWidth={2} />
                <span className="text-[12px] font-medium text-[#6B7280]">Home</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer" onClick={() => navigateTo("DELIVERIES")}>
                <HistoryIcon className="w-6 h-6 text-[#6B7280] mb-1" strokeWidth={2} />
                <span className="text-[12px] font-medium text-[#6B7280]">Deliveries</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <User className="w-6 h-6 text-[#111827] mb-1" strokeWidth={2.5} />
                <span className="text-[12px] font-bold text-[#111827]">Account</span>
              </div>
            </div>
          </motion.div>
        )}

        {appState === "PROMOTIONS" && (
          <motion.div
            key="promotions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-white z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 border-b border-gray-100">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2">
                <X className="w-6 h-6 text-[#111827]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-semibold text-[#111827]">Promotions</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Tag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-[20px] font-bold text-[#111827] mb-2">No active promotions</h3>
              <p className="text-[16px] text-[#6B7280]">Check back later for discounts and offers.</p>
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
            className="absolute inset-0 bg-[#F9FAFB] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-10">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2">
                <X className="w-6 h-6 text-[#111827]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-semibold text-[#111827]">Settings</h2>
            </div>
            <div className="flex-1 overflow-y-auto mt-4">
               <div className="bg-white shadow-sm flex flex-col">
                 <div className="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer">
                   <div className="flex items-center gap-3">
                     <User className="w-5 h-5 text-[#111827]" />
                     <span className="text-[16px] font-medium text-[#111827]">Personal Information</span>
                   </div>
                   <ChevronRight className="w-5 h-5 text-gray-400" />
                 </div>
                 <div className="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer">
                   <div className="flex items-center gap-3">
                     <MapPin className="w-5 h-5 text-[#111827]" />
                     <span className="text-[16px] font-medium text-[#111827]">Saved Locations</span>
                   </div>
                   <ChevronRight className="w-5 h-5 text-gray-400" />
                 </div>
               </div>
            </div>
          </motion.div>
        )}

        {appState === "FARE_SELECTION" && (
          <motion.div
            key="fare_selection"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-[#E5E7EB] z-10 flex flex-col overflow-hidden"
          >
            {/* Map Simulation Background Layer */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              {/* Fake Map Polyline */}
              <svg className="absolute w-full h-[60%] top-[10%]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M 20 80 Q 50 50 80 20" fill="none" stroke="#1D965C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {/* Pickup Marker */}
              <div className="absolute top-[65%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-white rounded-full px-3 py-1 shadow-md border border-gray-100 mb-1 flex items-center gap-1">
                  <span className="text-[12px] font-semibold text-[#111827]">Pickup</span>
                  <span className="text-[12px] text-[#6B7280]">11 min</span>
                </div>
                <div className="w-6 h-6 bg-[#1D965C] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              {/* Dropoff Marker */}
              <div className="absolute top-[20%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-white rounded-full px-3 py-1 shadow-md border border-gray-100 mb-1 flex items-center gap-1">
                  <span className="text-[12px] font-semibold text-[#111827]">Dropoff</span>
                  <span className="text-[12px] text-[#6B7280]">22:08</span>
                </div>
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            </div>

            {/* Top Floating Nav */}
            <div className="absolute top-[env(safe-area-inset-top)] left-4 right-4 z-20 mt-4 flex justify-center">
              <div className="bg-white h-[48px] rounded-[24px] shadow-lg flex items-center px-2 py-1 max-w-full">
                <button onClick={goBack} className="p-2 shrink-0">
                  <X className="w-5 h-5 text-[#111827]" />
                </button>
                <div className="flex-1 flex items-center justify-center overflow-hidden px-2 gap-2 text-[14px]">
                  <span className="font-medium text-[#111827] truncate">Shirimatunda</span>
                  <span className="text-[#6B7280] shrink-0">→</span>
                  <span className="font-medium text-[#111827] truncate">Moshi Urban</span>
                </div>
                <button className="p-2 shrink-0 bg-gray-100 rounded-full ml-1">
                  <Plus className="w-4 h-4 text-[#111827]" />
                </button>
              </div>
            </div>

            {/* Bottom Sheet Foreground */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={handleDragEnd}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.8 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-30 flex flex-col touch-none overflow-hidden max-h-[85vh]"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              {/* Drag Handle */}
              <div className="w-full flex justify-center pt-3 pb-2 shrink-0">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              {/* Sticky Banner */}
              <div className="w-full bg-[#EEF2FF] text-[#3730A3] px-4 py-2 flex items-center justify-center shrink-0">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-[#4F46E5]" />
                  <span className="text-[14px] font-medium">Priority Delivery Available</span>
                </div>
              </div>

              {/* Vehicle List */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {/* Standard Runner */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVehicle("standard")}
                  className={`w-full p-4 rounded-[24px] border-[2px] ${selectedVehicle === "standard" ? "border-[#1D965C] bg-[#1D965C]/5" : "border-gray-100 bg-white shadow-sm"} flex items-center justify-between cursor-pointer relative overflow-hidden`}
                >
                   <div className="flex items-center gap-4 relative z-10">
                     <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 bg-white shadow-sm ${selectedVehicle === "standard" ? "" : "opacity-60"}`}>
                        <Package className="w-6 h-6 text-gray-800" strokeWidth={1.5} />
                     </div>
                     <div className="flex flex-col">
                       <div className="flex items-center gap-2">
                         <span className={`text-[18px] ${selectedVehicle === "standard" ? "font-bold" : "font-semibold"} text-[#111827]`}>Standard</span>
                       </div>
                       <span className="text-[13px] font-medium text-[#6B7280]">~15 min • Delivery fee</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={`text-[18px] ${selectedVehicle === "standard" ? "font-bold" : "font-semibold"} text-[#111827]`}>TZS 300</span>
                   </div>
                </motion.div>

                {/* Express Runner */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVehicle("express")}
                  className={`w-full p-4 rounded-[24px] border-[2px] ${selectedVehicle === "express" ? "border-[#1D965C] bg-[#1D965C]/5" : "border-gray-100 bg-white shadow-sm"} flex items-center justify-between cursor-pointer relative overflow-hidden`}
                >
                   <div className="flex items-center gap-4 relative z-10">
                     <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 bg-white shadow-sm ${selectedVehicle === "express" ? "" : "opacity-60"}`}>
                        <Timer className="w-6 h-6 text-gray-800" strokeWidth={1.5} />
                     </div>
                     <div className="flex flex-col">
                       <div className="flex items-center gap-2">
                         <span className={`text-[18px] ${selectedVehicle === "express" ? "font-bold" : "font-semibold"} text-[#111827]`}>Express</span>
                         {selectedVehicle === "express" && <span className="bg-[#1D965C] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">FAST</span>}
                       </div>
                       <span className="text-[13px] font-medium text-[#6B7280]">~7 min • Delivery fee</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={`text-[18px] ${selectedVehicle === "express" ? "font-bold" : "font-semibold"} text-[#111827]`}>TZS 500</span>
                   </div>
                </motion.div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-4 border-t border-gray-100 bg-white shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-6">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsPaymentSheetOpen(true)}>
                    <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center mr-1">
                       {paymentMethod === "cash" && <Banknote className="w-4 h-4 text-[#111827]" />}
                       {paymentMethod === "mobile" && <Smartphone className="w-4 h-4 text-[#111827]" />}
                       {paymentMethod === "card" && <CreditCard className="w-4 h-4 text-[#111827]" />}
                    </div>
                    <span className="text-[16px] font-medium text-[#111827] capitalize">{paymentMethod === "mobile" ? "Mobile Money" : paymentMethod}</span>
                    <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo("FINDING")}
                  className="w-full h-[56px] bg-[#1D965C] text-white rounded-[28px] text-[18px] font-bold shadow-md flex items-center justify-center"
                >
                  Confirm Delivery
                </motion.button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



        {appState === "FINDING" && (
          <motion.div
            key="finding"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 z-10 flex flex-col pointer-events-none"
          >
             {/* Map Backdrop */}
             <div className="absolute inset-0 bg-gray-100/50 z-0 flex items-center justify-center">
               <motion.div
                 animate={{ scale: [1, 2, 3], opacity: [0.8, 0.4, 0] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                 className="w-20 h-20 bg-[#1D965C] rounded-full absolute"
               />
               <div className="w-16 h-16 bg-[#1D965C] rounded-full z-10 flex items-center justify-center shadow-lg border-4 border-white">
                 <Loader className="w-6 h-6 text-white animate-spin" />
               </div>
             </div>

             {/* Bottom Sheet */}
             <motion.div
               initial={{ height: 0 }}
               animate={{ height: "auto" }}
               exit={{ height: 0 }}
               transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.8 }}
               className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 flex flex-col overflow-hidden p-6 pb-[env(safe-area-inset-bottom)] pointer-events-auto"
             >
                <div className="flex flex-col items-center justify-center text-center pb-4 pt-2">
                  <h2 className="text-[20px] font-bold text-[#111827] mb-2">Connecting to a Runner</h2>
                  <p className="text-[14px] text-[#6B7280]">We are sending your request to nearby delivery staff.</p>
                </div>

                <button
                  onClick={() => {
                    // Simulate finding a driver and moving to EN_ROUTE
                    navigateTo("EN_ROUTE")
                  }}
                  className="w-full h-[56px] bg-gray-100 text-[#111827] rounded-[28px] text-[16px] font-bold mt-4 mb-2"
                >
                  Cancel Request (Simulate Match)
                </button>
             </motion.div>
          </motion.div>
        )}

        {appState === "EN_ROUTE" && (
          <motion.div
            key="en_route"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col pointer-events-none"
          >
             {/* Map Route Simulation Backdrop */}
             <div className="absolute inset-0 bg-[#E5E7EB] z-0 flex items-center justify-center">
                <svg className="absolute w-full h-[60%] top-[10%]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 20 80 Q 50 50 80 20" fill="none" stroke="#1D965C" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {/* Moving Runner Marker */}
                <motion.div
                  initial={{ top: "65%", left: "20%" }}
                  animate={{ top: "45%", left: "50%" }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                >
                  <div className="bg-[#111827] text-white rounded-full px-3 py-1 shadow-lg mb-1 flex items-center gap-1 font-bold text-[12px]">
                    7 MIN
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-[#1D965C] shadow-md">
                    <User className="w-4 h-4 text-[#1D965C]" />
                  </div>
                </motion.div>
             </div>

             {/* Top Nav Chip */}
             <div className="absolute top-[env(safe-area-inset-top)] left-4 right-4 mt-4 flex justify-center pointer-events-auto">
               <div className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center justify-center">
                 <span className="text-[16px] font-bold text-[#111827]">Arriving at 14:30</span>
               </div>
             </div>

             {/* Bottom Sheet - En Route */}
             <motion.div
               initial={{ height: 0 }}
               animate={{ height: "auto" }}
               exit={{ height: 0 }}
               transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.8 }}
               className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-30 flex flex-col overflow-hidden p-6 pb-[env(safe-area-inset-bottom)] pointer-events-auto"
             >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                       <User className="w-8 h-8 text-gray-500 mt-2" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[18px] font-bold text-[#111827]">John Makata</span>
                      <span className="text-[14px] text-[#6B7280] flex items-center gap-1">★ 4.9 • Delivery Professional</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-[16px] p-4 flex flex-col gap-2 mb-6 border border-gray-100">
                  <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Order Details</span>
                  <span className="text-[16px] font-semibold text-[#111827]">{itemDescription || "Your Request"}</span>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                     <span className="text-[14px] font-medium text-gray-600">{pickupLocation || "Partner"}</span>
                     <span className="text-gray-400">→</span>
                     <span className="text-[14px] font-medium text-gray-600">{dropoffLocation || "Destination"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full">
                  <button onClick={() => setIsCalling(true)} className="flex-1 h-[56px] bg-[#EEF2FF] text-[#4F46E5] rounded-[16px] flex items-center justify-center gap-2 font-bold text-[16px]">
                    <Phone className="w-5 h-5" />
                    Call
                  </button>
                  <button onClick={() => setIsChatting(true)} className="flex-1 h-[56px] bg-[#EEF2FF] text-[#4F46E5] rounded-[16px] flex items-center justify-center gap-2 font-bold text-[16px]">
                    <MessageSquare className="w-5 h-5" />
                    Message
                  </button>
                  <button onClick={() => navigateTo("RUNNER_ARRIVING")} className="w-[56px] h-[56px] bg-[#F9FAFB] border border-gray-200 rounded-[16px] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
             </motion.div>
          </motion.div>
        )}

        {appState === "RUNNER_ARRIVING" && (
          <motion.div
            key="runner_arriving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col pointer-events-none"
          >
             {/* Map Backdrop */}
             <div className="absolute inset-0 bg-[#E5E7EB] z-0 flex items-center justify-center">
                <motion.div
                  initial={{ top: "45%", left: "50%" }}
                  animate={{ top: "50%", left: "50%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                >
                  <div className="bg-[#1D965C] text-white rounded-full px-3 py-1 shadow-lg mb-1 flex items-center gap-1 font-bold text-[12px] animate-pulse">
                    ARRIVING
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-[#1D965C] shadow-md">
                    <User className="w-4 h-4 text-[#1D965C]" />
                  </div>
                </motion.div>
             </div>

             {/* Bottom Sheet - Arriving */}
             <motion.div
               initial={{ height: 0 }}
               animate={{ height: "auto" }}
               exit={{ height: 0 }}
               transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.8 }}
               className="absolute bottom-0 left-0 right-0 bg-[#1D965C] rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-30 flex flex-col overflow-hidden p-6 pb-[env(safe-area-inset-bottom)] pointer-events-auto text-white"
             >
                <div className="flex flex-col items-center text-center mb-6">
                  <h2 className="text-[28px] font-extrabold mb-1">Your runner is here</h2>
                  <p className="text-[16px] font-medium opacity-90">Please meet John Makata at {dropoffLocation || "the destination"}.</p>
                </div>

                <div className="flex gap-3 w-full mt-4">
                   <button
                     onClick={() => navigateTo("DELIVERY_COMPLETE")}
                     className="w-full h-[56px] bg-white text-[#1D965C] rounded-[28px] text-[18px] font-bold shadow-md"
                   >
                     Complete Delivery
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}

        {appState === "DELIVERY_COMPLETE" && (
          <motion.div
            key="delivery_complete"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 bg-white z-50 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] px-6 overflow-y-auto"
          >
             <div className="flex-1 flex flex-col items-center justify-center text-center mt-12">
               <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 text-[#1D965C]">
                 <CheckCircle className="w-12 h-12" />
               </div>
               <h1 className="text-[32px] font-extrabold text-[#111827] mb-2 leading-tight">Delivery<br/>Complete</h1>
               <p className="text-[16px] text-[#6B7280] font-medium mb-12">Thank you for using our service.</p>

               <div className="w-full bg-[#F9FAFB] rounded-[24px] p-6 border border-gray-100 mb-8">
                 <h3 className="text-[18px] font-bold text-[#111827] mb-4">Rate your runner</h3>
                 <div className="flex items-center justify-center gap-2 mb-6">
                   {[1,2,3,4,5].map(star => (
                     <Star key={star} className="w-10 h-10 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                   ))}
                 </div>
                 <textarea
                   className="w-full h-[100px] bg-white border border-gray-200 rounded-[16px] p-4 text-[14px] outline-none focus:border-[#1D965C] resize-none"
                   placeholder="Add a tip or feedback (optional)"
                 ></textarea>
               </div>
             </div>

             <div className="shrink-0 pb-6">
                <button
                  onClick={() => navigateTo("HOME")}
                  className="w-full h-[60px] bg-[#111827] text-white rounded-[30px] text-[18px] font-bold shadow-md"
                >
                  Done
                </button>
             </div>
          </motion.div>
        )}

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
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 bg-gray-50 rounded-full">
                  <X className="w-5 h-5 text-[#111827]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 pt-6">
                 <div
                   onClick={() => { setIsMenuOpen(false); navigateTo("SUGGESTION_BOX"); }}
                   className="flex items-center gap-4 cursor-pointer p-3 hover:bg-gray-50 rounded-[16px] transition-colors"
                 >
                   <MessageSquare className="w-6 h-6 text-[#111827]" />
                   <span className="text-[18px] font-bold text-[#111827]">Suggestion Box</span>
                 </div>

                 <div
                   onClick={() => { setIsMenuOpen(false); navigateTo("STAFF_DASHBOARD"); }}
                   className="flex items-center gap-4 cursor-pointer p-3 hover:bg-gray-50 rounded-[16px] transition-colors mt-2"
                 >
                   <User className="w-6 h-6 text-[#111827]" />
                   <span className="text-[18px] font-bold text-[#111827]">Staff</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Staff Dashboard Screen */}
      <AnimatePresence>
        {appState === "STAFF_DASHBOARD" && (
          <motion.div
            key="staff_dashboard"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#F9FAFB] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            {/* Top Nav */}
            <div className="h-[60px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-gray-50 rounded-full">
                <X className="w-5 h-5 text-[#111827]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#111827]">Staff Portal</h2>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-[100px]">
               {/* Header / Toggle */}
               <div className="bg-white p-6 shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="text-[24px] font-extrabold text-[#111827]">John Makata</span>
                      <span className="text-[14px] text-gray-500 font-medium">Runner ID: 4892</span>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                       <User className="w-8 h-8 text-gray-400 mt-2" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-[16px] border border-gray-100">
                     <span className={`text-[16px] font-bold ${staffStatus === "online" ? "text-[#1D965C]" : "text-gray-500"}`}>
                       {staffStatus === "online" ? "You are Online" : "You are Offline"}
                     </span>
                     <button
                       onClick={() => setStaffStatus(prev => prev === "online" ? "offline" : "online")}
                       className={`w-14 h-8 rounded-full p-1 transition-colors ${staffStatus === "online" ? "bg-[#1D965C]" : "bg-gray-300"} relative`}
                     >
                       <motion.div
                         layout
                         className="w-6 h-6 bg-white rounded-full shadow-sm"
                         animate={{ x: staffStatus === "online" ? 24 : 0 }}
                       />
                     </button>
                  </div>
               </div>

               {/* Metrics */}
               <div className="px-4 mb-4 flex gap-4">
                 <div className="flex-1 bg-white p-4 rounded-[16px] border border-gray-100 shadow-sm flex flex-col">
                   <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Today</span>
                   <span className="text-[20px] font-extrabold text-[#111827]">TZS 25,000</span>
                 </div>
                 <div className="flex-1 bg-white p-4 rounded-[16px] border border-gray-100 shadow-sm flex flex-col">
                   <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Deliveries</span>
                   <span className="text-[20px] font-extrabold text-[#111827]">12</span>
                 </div>
               </div>

               {/* Queue Management */}
               <div className="px-4 mb-6">
                 <h3 className="text-[16px] font-bold text-[#111827] mb-3 ml-1">Active Deliveries</h3>

                 {activeOrders.length === 0 ? (
                   <div className="bg-white p-6 rounded-[16px] border border-gray-100 shadow-sm flex flex-col items-center text-center justify-center h-[140px]">
                      <Package className="w-8 h-8 text-gray-300 mb-2" />
                      <span className="text-[14px] text-gray-500 font-medium">No active deliveries.</span>
                   </div>
                 ) : (
                   <div className="flex flex-col gap-3">
                     {activeOrders.map((order, i) => (
                       <div key={i} className="bg-white p-4 rounded-[16px] border-l-4 border-[#1D965C] border-y border-r border-gray-100 shadow-sm flex flex-col" onClick={() => navigateTo("STAFF_ACTIVE_DELIVERIES")}>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[14px] font-bold text-[#111827]">Order #{order.id}</span>
                            <span className="text-[12px] bg-green-50 text-[#1D965C] px-2 py-1 rounded font-bold">{order.status}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                             <div className="w-2 h-2 rounded-full bg-gray-400" />
                             <span className="text-[14px] text-gray-600 font-medium truncate">{order.pickup}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-[#1D965C]" />
                             <span className="text-[14px] text-[#111827] font-bold truncate">{order.dropoff}</span>
                          </div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>

               {/* Simulate Incoming Request */}
               {staffStatus === "online" && activeOrders.length === 0 && (
                 <div className="px-4 mt-8 flex justify-center">
                    <button
                      onClick={() => navigateTo("STAFF_INCOMING_REQUEST")}
                      className="text-[14px] font-bold text-[#4F46E5] bg-[#EEF2FF] px-4 py-2 rounded-full"
                    >
                      [Simulate Incoming Request]
                    </button>
                 </div>
               )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Staff Incoming Request Screen */}
      <AnimatePresence>
        {appState === "STAFF_INCOMING_REQUEST" && (
          <motion.div
            key="staff_incoming"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="absolute inset-0 bg-[#E5E7EB] z-30 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-hidden"
          >
             {/* Map Backdrop Mock */}
             <div className="absolute inset-0 z-0">
               <svg className="w-full h-[60%] mt-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 20 80 Q 50 50 80 20" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
               </svg>
               <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="bg-white rounded-full px-3 py-1 shadow-md border border-gray-100 mb-1 flex items-center gap-1">
                   <span className="text-[12px] font-semibold text-[#111827]">New Request</span>
                 </div>
                 <div className="w-8 h-8 bg-[#111827] rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                   <div className="w-3 h-3 bg-white rounded-full" />
                 </div>
               </div>
             </div>

             {/* Ringing Header */}
             <div className="absolute top-10 left-0 right-0 z-10 flex justify-center">
                <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-3">
                   <div className="w-3 h-3 bg-[#1D965C] rounded-full animate-ping absolute" />
                   <div className="w-3 h-3 bg-[#1D965C] rounded-full relative" />
                   <span className="text-[16px] font-bold text-[#111827]">Incoming Delivery</span>
                </div>
             </div>

             {/* Details Bottom Sheet (Always Expanded) */}
             <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-20 flex flex-col p-6 pb-[max(env(safe-area-inset-bottom),24px)]">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex flex-col">
                      <span className="text-[24px] font-extrabold text-[#111827]">TZS 2,500</span>
                      <span className="text-[14px] text-gray-500 font-medium">Estimated payout</span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[18px] font-bold text-[#111827]">~15 min</span>
                      <span className="text-[14px] text-gray-500 font-medium">Total time</span>
                   </div>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                   <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                         <div className="w-3 h-3 bg-gray-400 rounded-full" />
                      </div>
                      <div className="flex flex-col border-b border-gray-100 pb-4 flex-1">
                         <span className="text-[16px] font-bold text-[#111827]">Cafeteria A</span>
                         <span className="text-[14px] text-gray-500 font-medium">Pickup • 1.2 km away</span>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0 mt-1">
                         <div className="w-3 h-3 bg-[#1D965C] rounded-full" />
                      </div>
                      <div className="flex flex-col flex-1">
                         <span className="text-[16px] font-bold text-[#111827]">Hostel Block C</span>
                         <span className="text-[14px] text-gray-500 font-medium">Dropoff • 2.5 km total</span>
                      </div>
                   </div>
                </div>

                {/* Batching Info (If already has active) */}
                {activeOrders.length > 0 && (
                   <div className="bg-[#EEF2FF] rounded-[16px] p-4 mb-6 border border-[#E0E7FF] flex items-start gap-3">
                      <Plus className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                         <span className="text-[14px] font-bold text-[#3730A3]">Queue addition</span>
                         <span className="text-[12px] text-[#4F46E5] font-medium leading-tight mt-1">Adds ~8 mins to your current route. Customer ETAs will be automatically updated.</span>
                      </div>
                   </div>
                )}

                <div className="flex gap-4">
                   <button
                     onClick={goBack}
                     className="flex-1 h-[60px] bg-white border-2 border-gray-200 text-[#111827] rounded-[30px] text-[18px] font-bold"
                   >
                     Decline
                   </button>
                   <button
                     onClick={() => {
                        setActiveOrders([{id: "1094", status: "Heading to pickup", pickup: "Cafeteria A", dropoff: "Hostel Block C"}]);
                        navigateTo("STAFF_ACTIVE_DELIVERIES");
                     }}
                     className="flex-1 h-[60px] bg-[#1D965C] text-white rounded-[30px] text-[18px] font-bold shadow-md"
                   >
                     Accept
                   </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staff Active Deliveries Screen */}
      <AnimatePresence>
        {appState === "STAFF_ACTIVE_DELIVERIES" && (
          <motion.div
            key="staff_active_deliveries"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-hidden pointer-events-auto"
          >
             {/* Map Backdrop Simulation for Navigation */}
             <div className="absolute inset-0 bg-[#E5E7EB] z-0">
               <svg className="absolute w-full h-[60%] top-[10%]" preserveAspectRatio="none" viewBox="0 0 100 100">
                 <path d="M 50 80 Q 50 50 80 20" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
               </svg>
               {/* Nav Marker */}
               <div className="absolute top-[80%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                    <Navigation className="w-6 h-6 text-[#4F46E5] transform rotate-45" fill="#4F46E5" />
                 </div>
               </div>

               {/* Next Destination Marker */}
               <div className="absolute top-[20%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="bg-white rounded-full px-3 py-1 shadow-md border border-gray-100 mb-1 flex items-center gap-1">
                   <span className="text-[12px] font-semibold text-[#111827]">Pickup</span>
                   <span className="text-[12px] text-[#6B7280]">2 min</span>
                 </div>
                 <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                   <div className="w-2 h-2 bg-white rounded-full" />
                 </div>
               </div>
             </div>

             {/* Top Bar Navigation */}
             <div className="absolute top-[env(safe-area-inset-top)] left-4 right-4 z-10 flex gap-2 mt-4">
               <button onClick={() => navigateTo("STAFF_DASHBOARD")} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center shrink-0">
                 <ArrowDownUp className="w-6 h-6 text-[#111827] rotate-90" />
               </button>
               <div className="flex-1 bg-white rounded-full shadow-lg flex items-center px-4 overflow-hidden border border-gray-100">
                  <div className="w-3 h-3 bg-gray-800 rounded-full shrink-0 mr-3" />
                  <span className="text-[16px] font-bold text-[#111827] truncate">Continue on University Rd</span>
               </div>
             </div>

             {/* Bottom Sheet - Current Task */}
             <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-20 flex flex-col pb-[max(env(safe-area-inset-bottom),24px)]">

               {/* Queue Status Header */}
               <div className="w-full bg-[#111827] text-white px-6 py-3 rounded-t-[24px] flex items-center justify-between shrink-0">
                  <div className="flex flex-col">
                     <span className="text-[14px] font-bold">1 of 1 Tasks</span>
                     <span className="text-[12px] text-gray-400 font-medium">No queued orders</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <span className="text-[16px] font-extrabold text-[#1D965C]">2 min</span>
                     <span className="text-[12px] font-medium text-gray-400 ml-1">(1.2 km)</span>
                  </div>
               </div>

               {/* Task Details */}
               <div className="p-6">
                  <h2 className="text-[22px] font-extrabold text-[#111827] mb-1">Pickup at Cafeteria A</h2>
                  <p className="text-[15px] text-gray-500 font-medium mb-6">Order #1094 • 1x Burger, 1x Coke</p>

                  <div className="flex gap-4 mb-6">
                    <button onClick={() => setIsCalling(true)} className="flex-1 h-[56px] bg-[#F9FAFB] border border-gray-200 rounded-[16px] flex items-center justify-center gap-2">
                       <Phone className="w-5 h-5 text-[#111827]" />
                       <span className="text-[15px] font-bold text-[#111827]">Call</span>
                    </button>
                    <button onClick={() => setIsChatting(true)} className="flex-1 h-[56px] bg-[#F9FAFB] border border-gray-200 rounded-[16px] flex items-center justify-center gap-2">
                       <MessageSquare className="w-5 h-5 text-[#111827]" />
                       <span className="text-[15px] font-bold text-[#111827]">Message</span>
                    </button>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                       setActiveOrders([]); // clear after complete for demo
                       navigateTo("STAFF_DASHBOARD");
                    }}
                    className="w-full h-[60px] bg-[#1D965C] text-white rounded-[30px] text-[18px] font-bold shadow-md flex items-center justify-center relative overflow-hidden"
                  >
                     <span className="relative z-10">Confirm Pickup</span>
                     {/* Swipe to confirm overlay mock */}
                     <div className="absolute left-1 top-1 bottom-1 w-14 bg-white/20 rounded-full flex items-center justify-center">
                        <ChevronRight className="w-6 h-6 text-white" />
                     </div>
                  </motion.button>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestion Box Screen */}
      <AnimatePresence>
        {appState === "SUGGESTION_BOX" && (
          <motion.div
            key="suggestion_box"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-white z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[56px] w-full flex items-center px-4 relative shrink-0">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-gray-50 rounded-full">
                <X className="w-5 h-5 text-[#111827]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#111827]">Suggestion Box</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="w-16 h-16 bg-[#F9FAFB] rounded-[20px] flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-[#1D965C]" />
              </div>
              <h1 className="text-[28px] font-extrabold text-[#111827] mb-2 leading-tight">Help us build<br/>a better service.</h1>
              <p className="text-[16px] text-[#6B7280] mb-8 font-medium">Tell us what you need. A new merchant? A missing feature? General feedback? We are listening.</p>

              <textarea
                className="w-full h-[150px] bg-[#F9FAFB] border border-gray-200 rounded-[24px] p-5 text-[16px] text-[#111827] outline-none focus:border-[#1D965C] focus:ring-1 focus:ring-[#1D965C] transition-all resize-none placeholder:text-gray-400 font-medium"
                placeholder="I would love it if you could add..."
              ></textarea>
            </div>

            <div className="p-4 border-t border-gray-100 bg-white shrink-0 pb-[max(env(safe-area-inset-bottom),24px)]">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={goBack}
                className="w-full h-[60px] bg-[#111827] text-white rounded-[30px] text-[18px] font-bold shadow-md flex items-center justify-center"
              >
                Submit Suggestion
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
{/* Payment Selection Bottom Sheet Overlay */}
      <AnimatePresence>
        {isPaymentSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaymentSheetOpen(false)}
              className="absolute inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ height: "0px" }}
              animate={{ height: "auto" }}
              exit={{ height: "0px" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white z-50 rounded-t-[24px] pb-[env(safe-area-inset-bottom)] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold text-[#111827]">Payment method</h2>
                <button onClick={() => setIsPaymentSheetOpen(false)} className="p-2 -mr-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-[#111827]" />
                </button>
              </div>

              <div className="flex flex-col gap-4 mb-4">
                                {/* Smart Payment Rule: Disable cash if dropoff is not Current Location */}
                <div
                  onClick={() => {
                    if (dropoffLocation !== "Current Location") return;
                    setPaymentMethod("cash");
                    setIsPaymentSheetOpen(false);
                  }}
                  className={`flex items-center justify-between p-4 rounded-[16px] border-[2px] ${dropoffLocation !== "Current Location" ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-100" : `cursor-pointer ${paymentMethod === "cash" ? "border-[#1D965C] bg-[#1D965C]/5" : "border-gray-100 bg-white"}`}`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <Banknote className={`w-6 h-6 ${dropoffLocation !== "Current Location" ? "text-gray-400" : paymentMethod === "cash" ? "text-[#1D965C]" : "text-[#111827]"}`} />
                      <span className={`text-[16px] font-medium ${dropoffLocation !== "Current Location" ? "text-gray-500" : "text-[#111827]"}`}>Cash</span>
                    </div>
                    {dropoffLocation !== "Current Location" && (
                      <span className="text-[12px] text-red-500 mt-1 ml-9 font-medium flex items-center gap-1">
                         Unavailable for custom locations
                      </span>
                    )}
                  </div>
                  {dropoffLocation === "Current Location" && paymentMethod === "cash" && <div className="w-5 h-5 rounded-full bg-[#1D965C] flex items-center justify-center shrink-0"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                  {dropoffLocation === "Current Location" && paymentMethod !== "cash" && <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />}
                  {dropoffLocation !== "Current Location" && <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center shrink-0"><X className="w-3 h-3 text-gray-500" /></div>}
                </div>

                <div
                  onClick={() => { setPaymentMethod("mobile"); setIsPaymentSheetOpen(false); }}
                  className={`flex items-center justify-between p-4 rounded-[16px] border-[2px] cursor-pointer ${paymentMethod === "mobile" ? "border-[#1D965C] bg-[#1D965C]/5" : "border-gray-100 bg-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className={`w-6 h-6 ${paymentMethod === "mobile" ? "text-[#1D965C]" : "text-[#111827]"}`} />
                    <span className="text-[16px] font-medium text-[#111827]">Mobile Money</span>
                  </div>
                  {paymentMethod === "mobile" && <div className="w-5 h-5 rounded-full bg-[#1D965C] flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                  {paymentMethod !== "mobile" && <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                </div>

                <div
                  onClick={() => { setPaymentMethod("card"); setIsPaymentSheetOpen(false); }}
                  className={`flex items-center justify-between p-4 rounded-[16px] border-[2px] cursor-pointer ${paymentMethod === "card" ? "border-[#1D965C] bg-[#1D965C]/5" : "border-gray-100 bg-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className={`w-6 h-6 ${paymentMethod === "card" ? "text-[#1D965C]" : "text-[#111827]"}`} />
                    <span className="text-[16px] font-medium text-[#111827]">Credit/Debit Card</span>
                  </div>
                  {paymentMethod === "card" && <div className="w-5 h-5 rounded-full bg-[#1D965C] flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                  {paymentMethod !== "card" && <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Call Runner Modal */}
      <AnimatePresence>
        {isCalling && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="absolute inset-0 bg-[#111827] z-[60] flex flex-col items-center justify-between pt-[env(safe-area-inset-top)] pb-[max(env(safe-area-inset-bottom),24px)] px-6"
          >
            <div className="w-full flex justify-end pt-4">
              <button onClick={() => setIsCalling(false)} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center mt-12 flex-1">
               <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-gray-700">
                 <User className="w-16 h-16 text-gray-500 mt-4" />
               </div>
               <h1 className="text-[32px] font-extrabold text-white mb-2">John Makata</h1>
               <p className="text-[18px] text-gray-400 font-medium mb-1">+255 700 000 000</p>
               <p className="text-[14px] text-[#1D965C] font-bold">Calling...</p>
            </div>

            <div className="w-full flex justify-center pb-12 shrink-0">
               <button onClick={() => setIsCalling(false)} className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                 <Phone className="w-8 h-8 text-white rotate-[135deg]" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Runner Modal */}
      <AnimatePresence>
        {isChatting && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="absolute inset-0 bg-[#F9FAFB] z-[60] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="h-[60px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20 border-b border-gray-100">
              <button onClick={() => setIsChatting(false)} className="p-2 -ml-2 bg-gray-50 rounded-full mt-[max(env(safe-area-inset-top),16px)]">
                <X className="w-5 h-5 text-[#111827]" />
              </button>
              <div className="flex-1 flex flex-col items-center mt-[max(env(safe-area-inset-top),16px)]">
                <span className="text-[16px] font-bold text-[#111827]">John Makata</span>
                <span className="text-[12px] font-medium text-[#1D965C]">Runner is online</span>
              </div>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
               <div className="self-center bg-gray-200 text-gray-600 text-[12px] font-bold px-3 py-1 rounded-full mb-4">Today 14:20</div>

               <div className="self-start bg-white border border-gray-200 text-[#111827] p-3 rounded-[16px] rounded-tl-none max-w-[80%] shadow-sm">
                 <p className="text-[15px] font-medium">Hello, I am on my way to pick up your order.</p>
               </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex items-center gap-2 pb-[max(env(safe-area-inset-bottom),16px)]">
               <input
                 type="text"
                 value={chatMessage}
                 onChange={(e) => setChatMessage(e.target.value)}
                 placeholder="Type a message..."
                 className="flex-1 h-[48px] bg-[#F9FAFB] border border-gray-200 rounded-[24px] px-4 text-[15px] font-medium outline-none focus:border-[#1D965C]"
               />
               <button
                 onClick={() => { if(chatMessage) setChatMessage(""); }}
                 className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${chatMessage ? "bg-[#1D965C]" : "bg-gray-200"}`}
               >
                 <Send className={`w-5 h-5 ${chatMessage ? "text-white" : "text-gray-400 ml-[-2px]"}`} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
