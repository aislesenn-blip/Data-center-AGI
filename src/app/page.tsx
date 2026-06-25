"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, X, Car, Bike, Package, Search, Clock, PlusSquare, Utensils, Home, Calendar, User, MapPin, WifiOff, Map, Phone, MessageSquare, Loader, Plus, ArrowDownUp, Menu, Banknote, CreditCard, Smartphone, ChevronRight, Settings, Send, Timer, Navigation } from "lucide-react"

type AppState = "HOME" | "ROUTE_SELECTION" | "FARE_SELECTION" | "PAYMENT_METHODS" | "DELIVERIES" | "ACCOUNT" | "PROMOTIONS" | "SETTINGS" | "FINDING" | "EN_ROUTE"
type VehicleOption = "standard" | "express"
type PaymentMethod = "cash" | "mobile" | "card"

const LOCATIONS = [
  { id: 1, name: "Moshi Urban", sub: "Tanzania", dist: "3.6 km", icon: Clock, type: "history" },
  { id: 2, name: "MOSHI URBAN", sub: "Area", dist: "", icon: Navigation, type: "area" },
  { id: 3, name: "KCMC", sub: "Hospital", dist: "5.2 km", icon: Navigation, type: "location" },
  { id: 4, name: "Hugo's Garden", sub: "Restaurant", dist: "2.1 km", icon: Navigation, type: "location" },
]

export default function CampusDeliveryApp() {
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
  const [isOnline, setIsOnline] = useState(true)
  const [isGpsDenied, setIsGpsDenied] = useState(false)

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

  const [sheetHeight, setSheetHeight] = useState("55vh")
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
    const threshold = 50
    if (info.offset.y > threshold) {
      setSheetHeight("40vh") // peek
    } else if (info.offset.y < -threshold) {
      setSheetHeight("85vh") // full expand
    } else {
      setSheetHeight("55vh") // default snap
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
                <div className="mt-12 w-full h-[64px] bg-[#EEF2FF] rounded-[16px] flex items-center px-4 relative mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#3730A3] flex items-center justify-center mr-3">
                    <Tag className="text-white w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-semibold text-[#111827] leading-tight">10% off 5 deliveries</span>
                    <span className="text-[14px] text-[#6B7280]">View details</span>
                  </div>
                  <button
                    onClick={() => setIsPromoVisible(false)}
                    className="absolute right-4 p-1"
                  >
                    <X className="w-4 h-4 text-[#111827]" />
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
                <span className="text-[18px] font-bold text-[#111827]">Need something?</span>
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
              <div className="flex flex-col items-center cursor-pointer">
                <Calendar className="w-6 h-6 text-[#6B7280] mb-1" />
                <span className="text-[12px] text-[#6B7280]">Deliveries</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <User className="w-6 h-6 text-[#6B7280] mb-1" />
                <span className="text-[12px] text-[#6B7280]">Account</span>
              </div>
            </div>
          </motion.div>
        )}

        {appState === "ROUTE_SELECTION" && (
          <motion.div
            key="route_selection"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#F9FAFB] z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
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
                   {deliveryMode === "fetch" ? (
                     // Fetch: Dropdown to select a partner
                     <div
                       onClick={() => setIsPartnerDropdownOpen(true)}
                       className="w-full bg-white border border-gray-200 rounded-[20px] flex items-center px-4 shadow-sm h-[60px] cursor-pointer hover:border-[#1D965C] transition-all"
                     >
                       <span className={`text-[16px] font-medium flex-1 ${pickupLocation ? "text-[#111827]" : "text-gray-400"}`}>{pickupLocation || "Select a campus partner..."}</span>
                       <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                     </div>
                   ) : (
                     // Send: Text input for origin
                     <div className="w-full bg-white border border-gray-200 rounded-[20px] flex items-center px-4 shadow-sm h-[60px] focus-within:border-[#1D965C] transition-all">
                       <input
                         type="text"
                         value={pickupLocation}
                         onChange={(e) => setPickupLocation(e.target.value)}
                         placeholder="Pickup location"
                         className="flex-1 text-[16px] text-[#111827] bg-transparent outline-none placeholder:text-gray-400 font-medium h-full"
                       />
                     </div>
                   )}
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
              <h2 className="w-full text-center text-[18px] font-semibold text-[#111827]">Delivery History</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-[20px] font-bold text-[#111827] mb-2">No deliveries yet</h3>
              <p className="text-[16px] text-[#6B7280]">When you request a delivery, it will appear here.</p>
            </div>
          </motion.div>
        )}

        {appState === "ACCOUNT" && (
          <motion.div
            key="account"
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
              <h2 className="w-full text-center text-[18px] font-semibold text-[#111827]">Account</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="p-6 bg-white mb-4 shadow-sm flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                   <User className="w-8 h-8 text-gray-500" />
                 </div>
                 <div>
                   <h2 className="text-[20px] font-bold text-[#111827]">Jane Doe</h2>
                   <p className="text-[14px] text-[#6B7280]">jane.doe@example.com</p>
                 </div>
               </div>
               <div className="bg-white shadow-sm flex flex-col">
                 <div className="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer" onClick={() => navigateTo("SETTINGS")}>
                   <div className="flex items-center gap-3">
                     <Settings className="w-5 h-5 text-[#111827]" />
                     <span className="text-[16px] font-medium text-[#111827]">Settings</span>
                   </div>
                   <ChevronRight className="w-5 h-5 text-gray-400" />
                 </div>
                 <div className="p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer" onClick={() => navigateTo("PROMOTIONS")}>
                   <div className="flex items-center gap-3">
                     <Tag className="w-5 h-5 text-[#111827]" />
                     <span className="text-[16px] font-medium text-[#111827]">Promotions</span>
                   </div>
                   <ChevronRight className="w-5 h-5 text-gray-400" />
                 </div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ height: "0vh" }}
              animate={{ height: sheetHeight }}
              transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 flex flex-col pb-[env(safe-area-inset-bottom)] touch-none"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 flex flex-col p-6 pb-[env(safe-area-inset-bottom)] pointer-events-auto"
             >
                <div className="flex flex-col items-center justify-center text-center pb-4 pt-2">
                  <h2 className="text-[20px] font-bold text-[#111827] mb-2">Connecting to a Runner</h2>
                  <p className="text-[14px] text-[#6B7280]">We are sending your request to nearby campus runners.</p>
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
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-30 flex flex-col p-6 pb-[env(safe-area-inset-bottom)] pointer-events-auto"
             >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                       <User className="w-8 h-8 text-gray-500 mt-2" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[18px] font-bold text-[#111827]">John Makata</span>
                      <span className="text-[14px] text-[#6B7280] flex items-center gap-1">★ 4.9 • Campus Runner</span>
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
                  <button className="flex-1 h-[56px] bg-[#EEF2FF] text-[#4F46E5] rounded-[16px] flex items-center justify-center gap-2 font-bold text-[16px]">
                    <Phone className="w-5 h-5" />
                    Call
                  </button>
                  <button className="flex-1 h-[56px] bg-[#EEF2FF] text-[#4F46E5] rounded-[16px] flex items-center justify-center gap-2 font-bold text-[16px]">
                    <MessageSquare className="w-5 h-5" />
                    Message
                  </button>
                  <button onClick={() => navigateTo("HOME")} className="w-[56px] h-[56px] bg-red-50 rounded-[16px] flex items-center justify-center">
                    <X className="w-6 h-6 text-red-500" />
                  </button>
                </div>
             </motion.div>
          </motion.div>
        )}

      {/* Hamburger Overlay Menu - Partners Hub */}
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
              className="absolute inset-y-0 left-0 w-[85%] max-w-[340px] bg-[#F9FAFB] z-50 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-white shrink-0 border-b border-gray-100 flex items-center justify-between pt-[max(env(safe-area-inset-top),24px)]">
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-[#1D965C] uppercase tracking-wider mb-1">Trusted</span>
                  <h2 className="text-[24px] font-extrabold text-[#111827] leading-none">Partners</h2>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 bg-gray-50 rounded-full">
                  <X className="w-5 h-5 text-[#111827]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                 {/* UDSM Section */}
                 <div className="flex flex-col gap-3">
                   <h3 className="text-[16px] font-bold text-[#111827] px-1">UDSM Campus</h3>

                   <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer" onClick={() => { setPickupLocation("Main Cafeteria"); setIsMenuOpen(false); setDeliveryMode("fetch"); navigateTo("ROUTE_SELECTION"); }}>
                     <div className="w-12 h-12 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center shrink-0">
                       <Utensils className="w-5 h-5 text-[#111827]" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[16px] font-bold text-[#111827]">Main Cafeteria</span>
                       <span className="text-[13px] font-medium text-[#6B7280]">Food & Drinks</span>
                     </div>
                   </div>

                   <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer" onClick={() => { setPickupLocation("Mini Market"); setIsMenuOpen(false); setDeliveryMode("fetch"); navigateTo("ROUTE_SELECTION"); }}>
                     <div className="w-12 h-12 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center shrink-0">
                       <Tag className="w-5 h-5 text-[#111827]" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[16px] font-bold text-[#111827]">Mini Market</span>
                       <span className="text-[13px] font-medium text-[#6B7280]">Snacks & Essentials</span>
                     </div>
                   </div>

                   <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer" onClick={() => { setPickupLocation("Campus Pharmacy"); setIsMenuOpen(false); setDeliveryMode("fetch"); navigateTo("ROUTE_SELECTION"); }}>
                     <div className="w-12 h-12 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center shrink-0">
                       <PlusSquare className="w-5 h-5 text-[#111827]" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[16px] font-bold text-[#111827]">Campus Pharmacy</span>
                       <span className="text-[13px] font-medium text-[#6B7280]">Medicine & Health</span>
                     </div>
                   </div>
                 </div>

                 {/* UDOM Section */}
                 <div className="flex flex-col gap-3">
                   <h3 className="text-[16px] font-bold text-[#111827] px-1 mt-2">UDOM Campus</h3>

                   <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer opacity-70">
                     <div className="w-12 h-12 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center shrink-0">
                       <Utensils className="w-5 h-5 text-[#111827]" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[16px] font-bold text-[#111827]">UDOM Cafeteria</span>
                       <span className="text-[13px] font-medium text-[#6B7280]">Food & Drinks</span>
                     </div>
                   </div>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* Partner Dropdown Selection Sheet */}
      <AnimatePresence>
        {isPartnerDropdownOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPartnerDropdownOpen(false)}
              className="absolute inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white z-50 rounded-t-[24px] pb-[env(safe-area-inset-bottom)] p-6 shadow-2xl flex flex-col max-h-[80%]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold text-[#111827]">Select Partner</h2>
                <button onClick={() => setIsPartnerDropdownOpen(false)} className="p-2 -mr-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-[#111827]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                 <div onClick={() => { setPickupLocation("Main Cafeteria"); setIsPartnerDropdownOpen(false); }} className="p-4 bg-white border border-gray-100 rounded-[16px] shadow-sm flex items-center gap-4 cursor-pointer hover:border-[#1D965C]">
                   <Utensils className="w-5 h-5 text-[#111827]" />
                   <span className="text-[16px] font-bold text-[#111827]">Main Cafeteria</span>
                 </div>
                 <div onClick={() => { setPickupLocation("Mini Market"); setIsPartnerDropdownOpen(false); }} className="p-4 bg-white border border-gray-100 rounded-[16px] shadow-sm flex items-center gap-4 cursor-pointer hover:border-[#1D965C]">
                   <Tag className="w-5 h-5 text-[#111827]" />
                   <span className="text-[16px] font-bold text-[#111827]">Mini Market</span>
                 </div>
                 <div onClick={() => { setPickupLocation("Campus Pharmacy"); setIsPartnerDropdownOpen(false); }} className="p-4 bg-white border border-gray-100 rounded-[16px] shadow-sm flex items-center gap-4 cursor-pointer hover:border-[#1D965C]">
                   <PlusSquare className="w-5 h-5 text-[#111827]" />
                   <span className="text-[16px] font-bold text-[#111827]">Campus Pharmacy</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Map Picker Simulation */}
      <AnimatePresence>
        {isMapPicking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 bg-[#E5E7EB] z-[60] flex flex-col"
          >
             <div className="h-[56px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm z-20 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] box-content">
              <button onClick={() => setIsMapPicking(false)} className="absolute left-4 p-2 -ml-2 bg-gray-50 rounded-full mt-[env(safe-area-inset-top)]">
                <X className="w-5 h-5 text-[#111827]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#111827] mt-[env(safe-area-inset-top)]">Tap to Pin Location</h2>
            </div>

            <div className="flex-1 relative cursor-crosshair" onClick={() => { setDropoffLocation("Pinned Location on Map"); setIsMapPicking(false); }}>
              {/* Fake Map background */}
              <div className="absolute inset-0 bg-gray-200">
                <svg className="absolute w-full h-[60%] top-[10%]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 20 80 Q 50 50 80 20" fill="none" stroke="#1D965C" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
                </svg>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex flex-col items-center pointer-events-none">
                 <div className="w-4 h-4 bg-[#1D965C] rounded-full border-2 border-white shadow-md z-10" />
                 <div className="w-0.5 h-6 bg-[#111827] -mt-1" />
              </div>
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
    </div>
  )
}
