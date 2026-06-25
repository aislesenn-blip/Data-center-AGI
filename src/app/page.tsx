"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Package, ArrowLeft, Clock, Menu, Search, ShieldCheck, Phone, Banknote, CreditCard, Smartphone, Loader2 } from "lucide-react"

// Core states mapping to Uber/Bolt's exact flow
type AppState = "idle" | "search" | "loading_options" | "selection" | "finding" | "en_route"
type SheetState = "collapsed" | "half" | "full"
type PaymentMethod = "cash" | "mobile" | "card"
type RideOption = "standard" | "priority"

// Spring Physics configs
const springSnappy = { type: "spring" as const, damping: 25, stiffness: 350, mass: 0.8, bounce: 0.2 }
const springSmooth = { type: "spring" as const, damping: 30, stiffness: 200, mass: 1 }

export default function CampusDeliveryApp() {
  const [appState, setAppState] = useState<AppState>("idle")
  const [sheetState, setSheetState] = useState<SheetState>("collapsed")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [requestText, setRequestText] = useState("")
  const [pickupLocation, setPickupLocation] = useState("Current Location")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const [selectedOption, setSelectedOption] = useState<RideOption>("standard")

  const [isProcessing, setIsProcessing] = useState(false)

  // Handlers for state transitions mimicking spatial continuity
  const openSearch = () => {
    setAppState("search")
    setSheetState("full")
  }

  const closeSearch = () => {
    setAppState("idle")
    setSheetState("collapsed")
    setRequestText("")
    setPickupLocation("Current Location")
    setPaymentMethod("cash")
  }

  const proceedToSelection = () => {
    if (!requestText || !pickupLocation) return
    if (pickupLocation !== "Current Location" && paymentMethod === "cash") {
      setPaymentMethod("mobile") // Smart Payment Rule
    }

    setAppState("loading_options")
    setSheetState("half")

    // Simulate network latency (Skeleton loaders will show)
    setTimeout(() => {
      setAppState("selection")
    }, 1200)
  }

  const confirmRequest = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setAppState("finding")
      setSheetState("collapsed") // Sheet drops to show radar map

      // Simulate finding courier
      setTimeout(() => {
        setAppState("en_route")
      }, 3000)
    }, 800)
  }

  const cancelRequest = () => {
    setAppState("idle")
    setSheetState("collapsed")
  }

  // Drag logic matching velocity and offset for physical feel
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { y: number }, velocity: { y: number } }) => {
    const offset = info.offset.y
    const velocity = info.velocity.y

    if (appState === "search" || appState === "selection") {
      // Determine swipe direction and speed
      if (offset > 50 || velocity > 300) {
        if (sheetState === "full") {
          if (appState === "search" && requestText) {
             setSheetState("half")
          } else {
             closeSearch()
          }
        } else if (sheetState === "half") {
          closeSearch()
        }
      } else if (offset < -50 || velocity < -300) {
        if (sheetState === "collapsed" || sheetState === "half") {
          setSheetState("full")

        }
      }
    } else if (appState === "idle") {
      if (offset < -30 || velocity < -300) {
        openSearch()
      }
    }
  }

  // Map dynamic positioning based on sheet state to ensure nothing is covered
  const mapYOffset = sheetState === "full" ? -150 : (sheetState === "half" ? -80 : 0)
  const mapScale = (appState === "finding" || appState === "en_route") ? 1.15 : 1

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-black text-black overflow-hidden relative font-sans select-none">

      {/* 1. MAP ENVIRONMENT - The spatial canvas */}
      <div className="absolute inset-0 z-0 bg-[#E5E7EB] overflow-hidden">
        <motion.div
          animate={{ y: mapYOffset, scale: mapScale }}
          transition={springSmooth}
          className="w-full h-full relative flex items-center justify-center origin-bottom"
        >
          {/* Map Grid/Texture */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Roads Simulation */}
          <svg className="absolute w-[200%] h-[200%] text-black/10 -rotate-12 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M 0,50 Q 25,60 50,50 T 100,50" fill="none" stroke="currentColor" strokeWidth="2" />
             <path d="M 20,0 L 20,100" fill="none" stroke="currentColor" strokeWidth="1.5" />
             <path d="M 60,0 L 60,100" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>

          {/* User Location Marker (Idle / Search) */}
          <AnimatePresence>
            {(appState === "idle" || appState === "search") && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={springSnappy}
                className="absolute z-10 flex flex-col items-center justify-center"
              >
                {/* Radar Cone matching internal compass */}
                <div className="absolute w-32 h-32 bg-gradient-to-t from-blue-500/0 via-blue-500/10 to-blue-500/30 rounded-full blur-md -top-16 rotate-[-20deg]" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />

                {/* Sharp Blue Dot */}
                <div className="w-6 h-6 bg-blue-600 rounded-full shadow-[0_0_0_4px_white,0_4px_16px_rgba(0,0,0,0.2)] flex items-center justify-center relative z-10">
                  <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-30 scale-150" />
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Route Path (Loading / Selection / Finding / En Route) */}
          <AnimatePresence>
            {(appState !== "idle" && appState !== "search") && (
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              >
                <path d="M 50%,30% C 60%,40% 40%,60% 50%,80%" fill="none" stroke="black" strokeWidth="4" strokeDasharray="8 8" className="opacity-50" />
                <circle cx="50%" cy="30%" r="6" fill="black" stroke="white" strokeWidth="3" />
                <circle cx="50%" cy="80%" r="6" fill="#22C55E" stroke="white" strokeWidth="3" />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Finding Radar Sweep */}
          <AnimatePresence>
            {appState === "finding" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute w-64 h-64 border border-blue-500/30 rounded-full z-0 flex items-center justify-center"
                style={{ top: '80%', left: '50%', x: '-50%', y: '-50%' }}
              >
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="w-full h-full rounded-full"
                   style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(59, 130, 246, 0.4) 360deg)' }}
                 />
              </motion.div>
            )}
          </AnimatePresence>

          {/* En Route Courier Tracking (Lerping and Rotational Tracking) */}
          <AnimatePresence>
            {appState === "en_route" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, top: '80%', left: '50%' }}
                animate={{ opacity: 1, scale: 1, top: ['80%', '60%', '40%', '30%'], left: ['50%', '40%', '60%', '50%'] }}
                exit={{ opacity: 0 }}
                transition={{ top: { duration: 15, ease: "linear" }, left: { duration: 15, ease: "linear" } }}
                className="absolute z-20 flex flex-col items-center"
                style={{ x: '-50%', y: '-50%' }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0], rotate: [0, -20, 20, 0] }}
                  transition={{ y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 15, ease: "linear" } }}
                  className="w-12 h-12 bg-black rounded-full shadow-2xl flex items-center justify-center border-[3px] border-white"
                >
                  <Package size={20} className="text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>

      {/* 2. TOP NAVIGATION / FLOATING CONTROLS */}
      <div className="absolute top-0 inset-x-0 z-20 p-5 pt-safe flex justify-between items-center pointer-events-none">
         <AnimatePresence mode="wait">
           {appState === "idle" ? (
             <motion.button
               key="menu"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={springSnappy}
               whileTap={{ scale: 0.9 }}
               onClick={() => setIsMenuOpen(true)}
               className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)] pointer-events-auto"
             >
               <Menu size={22} className="text-black" />
             </motion.button>
           ) : (
             <motion.button
               key="back"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={springSnappy}
               whileTap={{ scale: 0.9 }}
               onClick={() => {
                 if (appState === "search") closeSearch()
                 else if (appState === "loading_options" || appState === "selection") setAppState("search")
                 else if (appState === "finding") setAppState("selection")
               }}
               className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)] pointer-events-auto"
             >
               <ArrowLeft size={22} className="text-black" />
             </motion.button>
           )}
         </AnimatePresence>
      </div>

      {/* Map Re-center FAB */}
      <AnimatePresence>
        {(appState === "idle" || appState === "search") && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: sheetState === 'full' ? -350 : 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={springSmooth}
            whileTap={{ scale: 0.9 }}
            className="absolute right-5 bottom-[35%] z-20 w-12 h-12 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center justify-center"
          >
            <div className="w-4 h-4 border-2 border-black rounded-full relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. SIDE MENU SYSTEM */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="absolute inset-0 z-50 flex">
            {/* Scrim Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black cursor-pointer"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={springSmooth}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(e, info) => { if (info.offset.x < -50 || info.velocity.x < -300) setIsMenuOpen(false) }}
              className="relative w-[75%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col pt-safe"
            >
               <div className="p-6 bg-black text-white flex flex-col gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">JD</div>
                  <div>
                     <div className="text-2xl font-bold">John Doe</div>
                     <div className="text-white/60 text-sm font-medium flex items-center gap-1 mt-1">
                       <span className="bg-white/20 px-2 py-0.5 rounded text-xs">5.0 ★</span>
                       Campus Member
                     </div>
                  </div>
               </div>
               <div className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
                  {['Your Deliveries', 'Payment', 'Promotions', 'Settings', 'Support'].map((item, i) => (
                    <motion.button
                      key={i}
                      whileTap={{ scale: 0.98, backgroundColor: '#f3f4f6' }}
                      className="text-left px-4 py-4 rounded-2xl font-semibold text-lg text-gray-800 transition-colors"
                    >
                      {item}
                    </motion.button>
                  ))}
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. BOTTOM SHEET SYSTEM */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end pointer-events-none">

        {/* We use a single motion.div for the sheet if possible, but switching UI inside is better done with AnimatePresence */}
        <AnimatePresence mode="popLayout">

          {/* IDLE SHEET */}
          {appState === "idle" && (
            <motion.div
              key="idle"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={springSmooth}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="bg-white rounded-t-3xl p-5 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pointer-events-auto"
            >
               {/* Drag Handle */}
               <div className="w-full pt-2 pb-6 flex justify-center cursor-grab active:cursor-grabbing">
                 <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
               </div>

               <motion.button
                 whileTap={{ scale: 0.98, backgroundColor: '#E5E7EB' }}
                 onClick={openSearch}
                 className="w-full bg-[#F3F4F6] text-left p-4 rounded-2xl flex items-center gap-4 mb-4"
               >
                 <Search size={24} className="text-black" />
                 <span className="text-xl text-gray-500 font-medium">Where to?</span>
               </motion.button>

               <div className="flex gap-3">
                 <motion.button
                   whileTap={{ scale: 0.95 }}
                   onClick={openSearch}
                   className="flex-1 bg-white border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                 >
                   <Package size={24} className="text-black" />
                   <span className="text-sm font-semibold">Delivery</span>
                 </motion.button>
                 <motion.button
                   whileTap={{ scale: 0.95 }}
                   onClick={openSearch}
                   className="flex-1 bg-white border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                 >
                   <Clock size={24} className="text-black" />
                   <span className="text-sm font-semibold">Schedule</span>
                 </motion.button>
               </div>
            </motion.div>
          )}

          {/* SEARCH SHEET */}
          {appState === "search" && (
            <motion.div
              key="search"
              initial={{ y: "100%" }}
              animate={{ y: sheetState === "full" ? 0 : "40vh" }}
              exit={{ y: "100%", opacity: 0 }}
              transition={springSmooth}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="bg-white h-[95dvh] rounded-t-3xl flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pointer-events-auto"
            >
               <div className="w-full pt-4 pb-2 flex justify-center cursor-grab active:cursor-grabbing">
                 <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
               </div>

               <div className="px-5 pt-2 pb-4 flex flex-col gap-4 relative shrink-0">
                  <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gray-200 z-0" />

                  {/* Destination */}
                  <div className="flex items-center gap-4 relative z-10">
                     <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
                       <div className="w-2 h-2 bg-white rounded-full" />
                     </div>
                     <input
                       type="text"
                       value={requestText}
                       onChange={(e) => setRequestText(e.target.value)}
                       placeholder="What do you need? (e.g. Charger)"
                       className="flex-1 bg-[#F3F4F6] text-black font-medium text-lg rounded-xl px-4 py-3 outline-none focus:bg-gray-200 transition-colors"
                       autoFocus
                     />
                  </div>

                  {/* Pickup */}
                  <div className="flex items-center gap-4 relative z-10">
                     <div className="w-6 h-6 rounded-none bg-transparent border-[3px] border-black flex items-center justify-center shrink-0" />
                     <input
                       type="text"
                       value={pickupLocation}
                       onChange={(e) => setPickupLocation(e.target.value)}
                       placeholder="Deliver to"
                       className="flex-1 bg-[#F3F4F6] text-black font-medium text-lg rounded-xl px-4 py-3 outline-none focus:bg-gray-200 transition-colors"
                     />
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto px-5 py-2">
                  {["Main Library", "Engineering Block B", "Cafeteria South", "Student Union", "Dormitory A"].map((loc) => (
                    <motion.div
                      key={loc}
                      whileTap={{ backgroundColor: '#F9FAFB' }}
                      onClick={() => setPickupLocation(loc)}
                      className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                        <MapPin size={18} className="text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-semibold">{loc}</div>
                        <div className="text-sm text-gray-500">Campus Area</div>
                      </div>
                    </motion.div>
                  ))}
               </div>

               <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] bg-white border-t border-gray-50">
                  <motion.button
                    whileTap={{ scale: (!requestText || !pickupLocation) ? 1 : 0.98 }}
                    onClick={proceedToSelection}
                    disabled={!requestText || !pickupLocation}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-xl disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
                  >
                    Done
                  </motion.button>
               </div>
            </motion.div>
          )}

          {/* LOADING OPTIONS SKELETON */}
          {appState === "loading_options" && (
            <motion.div
              key="loading_options"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={springSmooth}
              className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex flex-col pointer-events-auto"
            >
               <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-6" />

               <div className="px-5 pb-6">
                 <div className="w-48 h-8 bg-gray-100 rounded-lg animate-pulse mx-auto mb-6" />

                 <div className="flex flex-col gap-4">
                   {[1, 2].map((i) => (
                     <div key={i} className="flex items-center justify-between p-5 rounded-2xl border-2 border-gray-50 bg-white">
                       <div className="flex items-center gap-4">
                         <div className="w-16 h-16 bg-gray-100 rounded-full animate-pulse" />
                         <div className="flex flex-col gap-2">
                           <div className="w-24 h-6 bg-gray-100 rounded-md animate-pulse" />
                           <div className="w-16 h-4 bg-gray-100 rounded-md animate-pulse" />
                         </div>
                       </div>
                       <div className="w-20 h-6 bg-gray-100 rounded-md animate-pulse" />
                     </div>
                   ))}
                 </div>
               </div>

               <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                  <div className="w-full h-14 bg-gray-100 rounded-xl animate-pulse" />
               </div>
            </motion.div>
          )}

          {/* SELECTION / CONFIRM STATE */}
          {appState === "selection" && (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }} // crossfade from skeleton
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex flex-col pointer-events-auto"
            >
               <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-4" />
               <div className="px-5 pb-4 text-center border-b border-gray-100">
                 <h2 className="text-2xl font-bold">Choose Delivery</h2>
               </div>

               <div className="p-5 flex flex-col gap-3">
                 <motion.div
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setSelectedOption("standard")}
                   className={"flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all " + (selectedOption === "standard" ? "border-black bg-black/5" : "border-gray-100 hover:border-gray-200")}
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                       <Package size={30} className="text-black" />
                     </div>
                     <div>
                       <div className="font-bold text-xl">Standard</div>
                       <div className="text-base text-gray-500 font-medium">10-15 min</div>
                     </div>
                   </div>
                   <div className="font-bold text-xl">TZS 2,500</div>
                 </motion.div>

                 <motion.div
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setSelectedOption("priority")}
                   className={"flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all " + (selectedOption === "priority" ? "border-black bg-black/5" : "border-gray-100 hover:border-gray-200")}
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                       <ShieldCheck size={30} className="text-black" />
                     </div>
                     <div>
                       <div className="font-bold text-xl">Priority</div>
                       <div className="text-base text-gray-500 font-medium">5-8 min • Direct</div>
                     </div>
                   </div>
                   <div className="font-bold text-xl">TZS 4,000</div>
                 </motion.div>
               </div>

               {/* Payment Method - Enforces Smart Payment Rule */}
               <div className="px-5 pb-3">
                 <div className="flex gap-2">
                   <motion.button
                     whileTap={{ scale: pickupLocation !== "Current Location" ? 1 : 0.95 }}
                     disabled={pickupLocation !== "Current Location"}
                     onClick={() => setPaymentMethod("cash")}
                     className={"flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all " + (paymentMethod === "cash" ? "border-black bg-black/5 " : "border-gray-100 ") + (pickupLocation !== "Current Location" ? "opacity-30 cursor-not-allowed" : "cursor-pointer")}
                   >
                     <Banknote size={24} className="text-black" />
                     <span className="text-sm font-semibold">Cash</span>
                   </motion.button>
                   <motion.button
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setPaymentMethod("mobile")}
                     className={"flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all " + (paymentMethod === "mobile" ? "border-black bg-black/5" : "border-gray-100")}
                   >
                     <Smartphone size={24} className="text-black" />
                     <span className="text-sm font-semibold">Mobile</span>
                   </motion.button>
                   <motion.button
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setPaymentMethod("card")}
                     className={"flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all " + (paymentMethod === "card" ? "border-black bg-black/5" : "border-gray-100")}
                   >
                     <CreditCard size={24} className="text-black" />
                     <span className="text-sm font-semibold">Card</span>
                   </motion.button>
                 </div>
               </div>

               <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] bg-white pt-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmRequest}
                    disabled={isProcessing}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-xl hover:bg-gray-900 transition-all shadow-lg flex items-center justify-center h-[60px]"
                  >
                    {isProcessing ? <Loader2 size={24} className="animate-spin" /> : (paymentMethod === "cash" ? "Confirm Request" : "Confirm & Pay")}
                  </motion.button>
               </div>
            </motion.div>
          )}

          {/* FINDING COURIER (collapsed state essentially) */}
          {appState === "finding" && (
            <motion.div
              key="finding"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={springSnappy}
              className="bg-white rounded-t-3xl p-6 pb-[calc(2rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex flex-col pointer-events-auto"
            >
               <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                   <Loader2 size={24} className="animate-spin text-black" />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold">Connecting to courier...</h2>
                   <p className="text-gray-500 font-medium">Finding the best match</p>
                 </div>
               </div>
               {/* Progress bar instead of old sweeping animation here, to match standard UX */}
               <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mt-6 relative">
                 <motion.div
                   className="absolute top-0 left-0 bottom-0 bg-black w-1/3"
                   animate={{ x: ["-100%", "300%"] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 />
               </div>
            </motion.div>
          )}

          {/* EN ROUTE TRACKING */}
          {appState === "en_route" && (
            <motion.div
              key="en_route"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={springSmooth}
              className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex flex-col pointer-events-auto"
            >
               <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-4" />

               <div className="px-6 pb-5 flex items-center justify-between border-b border-gray-100">
                  <div>
                     <h2 className="text-3xl font-bold">3 min away</h2>
                     <p className="text-gray-500 font-medium text-lg mt-1">{requestText} to {pickupLocation}</p>
                  </div>
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                     <Clock size={28} className="text-black" />
                  </div>
               </div>

               <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center font-bold text-2xl border-2 border-gray-200">
                        J
                     </div>
                     <div>
                        <p className="font-bold text-xl">James</p>
                        <div className="flex items-center gap-2 text-base text-gray-500 font-semibold mt-1">
                           <span className="bg-gray-100 px-2 py-0.5 rounded text-black">4.9 ★</span>
                           <span>Courier</span>
                        </div>
                     </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center shadow-sm"
                  >
                     <Phone size={24} className="text-black" />
                  </motion.button>
               </div>

               <div className="px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-2">
                 <motion.button
                   whileTap={{ scale: 0.98 }}
                   onClick={cancelRequest}
                   className="w-full bg-gray-100 text-black py-4 rounded-xl font-bold text-lg"
                 >
                   Cancel Request
                 </motion.button>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  )
}
