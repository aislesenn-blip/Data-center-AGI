"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, X, Car, Bike, Package, Search, Clock, PlusSquare, Utensils, Home, Calendar, User, MapPin, Plus, ArrowDownUp, Menu, Banknote, CreditCard, Smartphone, ChevronRight, Settings, Send, Timer, Navigation } from "lucide-react"

type AppState = "HOME" | "ROUTE_SELECTION" | "FARE_SELECTION" | "PAYMENT_METHODS" | "DELIVERIES" | "ACCOUNT" | "PROMOTIONS" | "SETTINGS"
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
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption>("standard")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sheetY, setSheetY] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false)

  const navigateTo = (state: AppState) => {
    setIsMenuOpen(false)
    if (state === "HOME") {
      setNavStack(["HOME"])
    } else {
      setNavStack(prev => [...prev, state])
    }
  }

  const goBack = () => {
    setNavStack(prev => prev.length > 1 ? prev.slice(0, -1) : ["HOME"])
  }

  const filteredLocations = LOCATIONS.filter(loc => {
    if (!searchQuery) return loc.type !== "area"
    return loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
    const threshold = 100
    if (info.offset.y > threshold) {
      setSheetY(300) // Half-expanded
    } else if (info.offset.y < -threshold) {
      setSheetY(-200) // Fully-expanded
    } else {
      setSheetY(0) // Default snap
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
                  onClick={() => navigateTo("ROUTE_SELECTION")}
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
                  onClick={() => navigateTo("ROUTE_SELECTION")}
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
                onClick={() => navigateTo("ROUTE_SELECTION")}
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
            className="absolute inset-0 bg-white z-10 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            {/* Top Nav */}
            <div className="h-[56px] w-full flex items-center px-4 relative">
              <button
                onClick={goBack}
                className="absolute left-4 p-2 -ml-2"
              >
                <X className="w-6 h-6 text-[#111827]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-semibold text-[#111827]">Route</h2>
            </div>

            {/* Route Input Group */}
            <div className="px-4 py-2 flex flex-row relative">
               <div className="flex flex-col items-center mr-3 mt-3 w-6 relative">
                 <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center z-10">
                   <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                 </div>
                 <div className="w-0.5 h-[40px] bg-gray-300 my-1"></div>
                 <div className="w-2 h-2 bg-black z-10"></div>
               </div>

               <div className="flex-1 flex flex-col gap-3 justify-center pr-3">
                 <div className="w-full h-[48px] bg-[#F3F4F6] rounded-xl flex items-center px-3">
                   <span className="text-[16px] text-[#111827] flex-1">Shirimatunda</span>
                   <motion.div
                     animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                     transition={{ repeat: Infinity, duration: 2 }}
                     className="w-8 h-8 rounded-full bg-[#1D965C]/10 flex items-center justify-center cursor-pointer"
                   >
                     <Plus className="w-5 h-5 text-[#1D965C]" />
                   </motion.div>
                 </div>
                 <div className="w-full h-[48px] bg-white border-[2px] border-[#1D965C] rounded-[12px] flex items-center px-3 overflow-hidden shadow-sm relative">
                   <Search className="w-5 h-5 text-[#9CA3AF] mr-2 shrink-0" />
                   <input
                     type="text"
                     placeholder="Dropoff location"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="flex-1 text-[16px] text-[#111827] bg-transparent outline-none placeholder:text-[#9CA3AF] h-full"
                     autoFocus
                   />
                   {searchQuery && (
                     <button
                       onClick={() => setSearchQuery("")}
                       className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-2 shrink-0"
                     >
                       <X className="w-3 h-3 text-gray-600" />
                     </button>
                   )}
                   <div className="w-8 h-8 bg-gray-200 rounded shrink-0 relative flex items-center justify-center overflow-hidden">
                     <MapPin className="w-4 h-4 text-[#111827] absolute z-10" />
                     <div className="absolute inset-0 opacity-20 bg-blue-300" />
                   </div>
                 </div>
               </div>
            </div>

            {/* Suggestion List */}
            <div className="flex-1 overflow-y-auto px-4 mt-4 flex flex-col gap-6">
                {filteredLocations.map((loc) => {
                  const Icon = loc.icon
                  return (
                    <div key={loc.id} className="flex items-center cursor-pointer" onClick={handleSuggestionClick}>
                      <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center mr-4 shrink-0">
                        <Icon className="w-5 h-5 text-[#111827]" />
                      </div>
                      <div className="flex flex-col flex-1 truncate pr-2">
                        <span className={`text-[16px] font-medium text-[#111827] truncate ${loc.type === "area" ? "uppercase" : ""}`}>
                          {renderHighlightedText(loc.name, searchQuery)}
                        </span>
                        <span className="text-[14px] text-[#6B7280] truncate">{loc.sub}</span>
                      </div>
                      {loc.dist && <div className="text-[14px] text-[#6B7280] ml-2 shrink-0">{loc.dist}</div>}
                    </div>
                  )
                })}
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
              dragConstraints={{ top: -200, bottom: 300 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              initial={{ y: "100%" }}
              animate={{ y: sheetY }}
              transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 flex flex-col h-[75%] pb-[env(safe-area-inset-bottom)]"
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
                       <span className="text-[13px] font-medium text-[#6B7280]">~15 min • Normal speed</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={`text-[18px] ${selectedVehicle === "standard" ? "font-bold" : "font-semibold"} text-[#111827]`}>TZS 4,500</span>
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
                       <span className="text-[13px] font-medium text-[#6B7280]">~7 min • Priority delivery</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={`text-[18px] ${selectedVehicle === "express" ? "font-bold" : "font-semibold"} text-[#111827]`}>TZS 6,000</span>
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
                  className="w-full h-[56px] bg-[#1D965C] text-white rounded-[28px] text-[18px] font-bold shadow-md flex items-center justify-center"
                >
                  Select {selectedVehicle === "standard" ? "Standard" : "Express"}
                </motion.button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hamburger Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-y-0 left-0 w-[80%] max-w-[320px] bg-white z-50 flex flex-col p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6 text-[#111827]" />
                </button>
              </div>
              <h2 className="text-[20px] font-bold text-[#111827] mb-6">Jane Doe</h2>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 cursor-pointer">
                  <Clock className="w-6 h-6 text-[#111827]" />
                  <span className="text-[16px] font-medium text-[#111827]">Delivery History</span>
                </div>
                <div className="flex items-center gap-4 cursor-pointer">
                  <Tag className="w-6 h-6 text-[#111827]" />
                  <span className="text-[16px] font-medium text-[#111827]">Promotions</span>
                </div>
                <div className="flex items-center gap-4 cursor-pointer">
                  <User className="w-6 h-6 text-[#111827]" />
                  <span className="text-[16px] font-medium text-[#111827]">Settings</span>
                </div>
              </div>
            </motion.div>
          </>
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
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white z-50 rounded-t-[24px] pb-[env(safe-area-inset-bottom)] p-6 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold text-[#111827]">Payment method</h2>
                <button onClick={() => setIsPaymentSheetOpen(false)} className="p-2 -mr-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-[#111827]" />
                </button>
              </div>

              <div className="flex flex-col gap-4 mb-4">
                <div
                  onClick={() => { setPaymentMethod("cash"); setIsPaymentSheetOpen(false); }}
                  className={`flex items-center justify-between p-4 rounded-[16px] border-[2px] cursor-pointer ${paymentMethod === "cash" ? "border-[#1D965C] bg-[#1D965C]/5" : "border-gray-100 bg-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className={`w-6 h-6 ${paymentMethod === "cash" ? "text-[#1D965C]" : "text-[#111827]"}`} />
                    <span className="text-[16px] font-medium text-[#111827]">Cash</span>
                  </div>
                  {paymentMethod === "cash" && <div className="w-5 h-5 rounded-full bg-[#1D965C] flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                  {paymentMethod !== "cash" && <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
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
