"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, X, Car, Bike, Search, Clock, PlusSquare, Utensils, Home, Calendar, User, MapPin, Plus, ArrowDownUp, Menu } from "lucide-react"

type AppState = "HOME" | "ROUTE_SELECTION" | "FARE_SELECTION"
type VehicleOption = "standard" | "motorbike"

const LOCATIONS = [
  { id: 1, name: "Moshi Urban", sub: "Tanzania", dist: "3.6 km", icon: Clock, type: "history" },
  { id: 2, name: "MOSHI URBAN", sub: "Area", dist: "", icon: MapPin, type: "area" },
  { id: 3, name: "KCMC", sub: "Hospital", dist: "5.2 km", icon: MapPin, type: "location" },
  { id: 4, name: "Hugo's Garden", sub: "Restaurant", dist: "2.1 km", icon: MapPin, type: "location" },
]

export default function CampusDeliveryApp() {
  const [appState, setAppState] = useState<AppState>("HOME")
  const [isPromoVisible, setIsPromoVisible] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption>("standard")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sheetY, setSheetY] = useState(0)

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
    setAppState("FARE_SELECTION")
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
            <div className="flex-1 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] px-4">
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
              <h1 className="text-[24px] font-bold text-[#111827] mb-4 tracking-[-0.5px]">
                Smooth deliveries ahead.
              </h1>

              {/* Bento Grid */}
              <div className="flex flex-row justify-between gap-4 mb-6">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAppState("ROUTE_SELECTION")}
                  className="flex-1 h-[110px] bg-[#F3F4F6] rounded-[16px] p-3 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center self-end mb-2">
                     <Car className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-[16px] font-medium text-[#111827]">Delivery</div>
                    <div className="text-[12px] text-[#6B7280]">Let&apos;s get moving</div>
                  </div>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAppState("ROUTE_SELECTION")}
                  className="flex-1 h-[110px] bg-[#F3F4F6] rounded-[16px] p-3 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center self-end mb-2">
                     <Bike className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-[16px] font-medium text-[#111827]">Package</div>
                    <div className="text-[12px] text-[#6B7280]">2-wheel deliveries</div>
                  </div>
                </motion.div>
              </div>

              {/* Search Input CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setAppState("ROUTE_SELECTION")}
                className="w-full h-[56px] bg-[#F3F4F6] rounded-[16px] flex items-center px-4 mb-6 cursor-text"
              >
                <Search className="w-5 h-5 text-[#111827] mr-3" />
                <span className="text-[18px] font-semibold text-[#111827]">Need something?</span>
              </motion.button>

              {/* Recent Locations */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center cursor-pointer" onClick={() => setAppState("ROUTE_SELECTION")}>
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center mr-4">
                    <Clock className="w-5 h-5 text-[#111827]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-medium text-[#111827]">Moshi Urban</span>
                    <span className="text-[14px] text-[#6B7280]">Tanzania</span>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer" onClick={() => setAppState("ROUTE_SELECTION")}>
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center mr-4">
                    <PlusSquare className="w-5 h-5 text-[#111827]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-medium text-[#111827]">KCMC</span>
                    <span className="text-[14px] text-[#6B7280]">Hospital</span>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer" onClick={() => setAppState("ROUTE_SELECTION")}>
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center mr-4">
                    <Utensils className="w-5 h-5 text-[#111827]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-medium text-[#111827]">Hugo&apos;s Garden</span>
                    <span className="text-[14px] text-[#6B7280]">Restaurant</span>
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
                onClick={() => setAppState("HOME")}
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

               <div className="flex-1 flex flex-col gap-3 justify-center">
                 <div className="w-full h-[48px] bg-[#F3F4F6] rounded-xl flex items-center px-3">
                   <span className="text-[16px] text-[#111827] flex-1">Shirimatunda</span>
                   <Plus className="w-5 h-5 text-[#6B7280]" />
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

               {/* Swap Control */}
               <div className="w-8 h-8 flex items-center justify-center absolute right-3 top-[44px] transform -translate-y-1/2 bg-white rounded-full shadow-md z-20 border border-gray-100">
                 <ArrowDownUp className="w-4 h-4 text-[#6B7280]" />
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
                <button onClick={() => setAppState("ROUTE_SELECTION")} className="p-2 shrink-0">
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

              {/* Sticky Promo Banner */}
              <div className="w-full bg-[#4F46E5] text-white px-4 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <Tag className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[14px] font-medium">10% promo applied</span>
                </div>
                <ArrowDownUp className="w-4 h-4 text-white/80" />
              </div>

              {/* Vehicle List */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {/* Standard Tier */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVehicle("standard")}
                  className={`w-full p-3 rounded-[12px] border-[2px] ${selectedVehicle === "standard" ? "border-[#1D965C]" : "border-transparent"} bg-white flex items-center justify-between shadow-sm cursor-pointer relative overflow-hidden`}
                >
                   <div className="flex items-center gap-3 relative z-10">
                     <div className={`w-16 h-12 flex items-center justify-center shrink-0 ${selectedVehicle === "standard" ? "" : "opacity-60"}`}>
                        <Car className="w-10 h-10 text-gray-800" strokeWidth={1.5} />
                     </div>
                     <div className="flex flex-col">
                       <div className="flex items-center gap-2">
                         <span className={`text-[18px] ${selectedVehicle === "standard" ? "font-bold" : "font-semibold"} text-[#111827]`}>Standard</span>
                         {selectedVehicle === "standard" && <span className="bg-[#1D965C] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">FASTER</span>}
                       </div>
                       <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                         <span className="font-medium text-[#111827]">11 min</span>
                         <div className="flex items-center gap-0.5">
                           <User className="w-3 h-3" />
                           <span>4</span>
                         </div>
                       </div>
                       <span className="text-[12px] text-[#6B7280]">Mid-size deliveries</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={`text-[16px] ${selectedVehicle === "standard" ? "font-bold" : "font-semibold"} text-[#111827]`}>TZS 11,000</span>
                     {selectedVehicle === "standard" && <span className="text-[12px] text-[#6B7280] line-through">TZS 11,500</span>}
                   </div>
                   {selectedVehicle === "standard" && <div className="absolute inset-0 bg-[#1D965C] opacity-5 z-0" />}
                </motion.div>

                {/* Motorbike Tier */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVehicle("motorbike")}
                  className={`w-full p-3 rounded-[12px] border-[2px] ${selectedVehicle === "motorbike" ? "border-[#1D965C]" : "border-transparent"} bg-white flex items-center justify-between cursor-pointer relative overflow-hidden`}
                >
                   <div className="flex items-center gap-3 relative z-10">
                     <div className={`w-16 h-12 flex items-center justify-center shrink-0 ${selectedVehicle === "motorbike" ? "" : "opacity-60"}`}>
                        <Bike className="w-10 h-10 text-gray-600" strokeWidth={1.5} />
                     </div>
                     <div className="flex flex-col">
                       <span className={`text-[18px] ${selectedVehicle === "motorbike" ? "font-bold" : "font-semibold"} text-[#111827]`}>Motorbike</span>
                       <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                         <span className="font-medium text-[#111827]">7 min</span>
                       </div>
                       <span className="text-[12px] text-[#6B7280]">Small packages</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={`text-[16px] ${selectedVehicle === "motorbike" ? "font-bold" : "font-semibold"} text-[#111827]`}>TZS 4,500</span>
                   </div>
                   {selectedVehicle === "motorbike" && <div className="absolute inset-0 bg-[#1D965C] opacity-5 z-0" />}
                </motion.div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-4 border-t border-gray-100 bg-white shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-6">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-6 h-6 rounded bg-[#1D965C]/10 flex items-center justify-center">
                      <span className="text-[#1D965C] font-bold text-xs">💵</span>
                    </div>
                    <span className="text-[16px] font-medium text-[#111827]">Cash</span>
                    <ArrowDownUp className="w-4 h-4 text-[#6B7280] ml-1" />
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-[56px] bg-[#1D965C] text-white rounded-[28px] text-[18px] font-bold shadow-md flex items-center justify-center"
                >
                  Select {selectedVehicle === "standard" ? "Standard" : "Motorbike"}
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
    </div>
  )
}
