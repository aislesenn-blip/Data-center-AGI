"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Package, ArrowLeft, Clock, Menu, Search, ShieldCheck, Phone, Banknote, CreditCard, Smartphone } from "lucide-react"

type AppState = "idle" | "search" | "confirm" | "finding" | "en_route"

export default function CampusDeliveryApp() {
  const [appState, setAppState] = useState<AppState>("idle")
  const [requestText, setRequestText] = useState("")
  const [pickupLocation, setPickupLocation] = useState("Current Location")

  const [selectedOption, setSelectedOption] = useState<"standard" | "priority">("standard")
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "mobile" | "card">("cash")

  // Sheet states: collapsed (idle), half (search partial), full (search full)
  const [sheetPosition, setSheetPosition] = useState<"collapsed" | "half" | "full">("collapsed")

  const handleOpenSearch = () => {
    setAppState("search")
    setSheetPosition("full")
  }

  const closeSearch = () => {
    setAppState("idle")
    setSheetPosition("collapsed")
    setRequestText("")
    setPickupLocation("Current Location")
    setPaymentMethod("cash")
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { y: number }, velocity: { y: number } }) => {
    const offset = info.offset.y
    const velocity = info.velocity.y

    if (appState === "search") {
      if (offset > 100 || velocity > 500) {
        if (sheetPosition === "full") {
          setSheetPosition("half")
        } else {
          closeSearch()
        }
      } else if (offset < -100 || velocity < -500) {
        setSheetPosition("full")
      }
    } else if (appState === "idle") {
       if (offset < -50 || velocity < -500) {
         handleOpenSearch()
       }
    }
  }

  const handleProceedToConfirm = () => {
    if (!requestText || !pickupLocation) return
    // Smart Payment Rule: If custom location, default payment to mobile if currently cash
    if (pickupLocation !== "Current Location" && paymentMethod === "cash") {
      setPaymentMethod("mobile")
    }
    setAppState("confirm")
  }

  const handleConfirmRequest = () => {
    setAppState("finding")
    // Simulate finding a courier
    setTimeout(() => {
      setAppState("en_route")
    }, 2500)
  }

  const fastTransition = { duration: 0.15, ease: "easeOut" as const }

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-black text-black overflow-hidden relative font-sans">

      {/* IMMERSIVE MAP BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: appState === 'search' ? 1.05 : 1,
            y: appState === 'search' ? -50 : 0
          }}
          transition={fastTransition}
          className="w-full h-full bg-[#E5E7EB] relative overflow-hidden flex items-center justify-center"
        >
            {/* Fake Map Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Map Roads / Elements */}
            <svg className="absolute w-[200%] h-[200%] text-black/10 -rotate-12" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M 0,50 Q 25,60 50,50 T 100,50" fill="none" stroke="currentColor" strokeWidth="2" />
               <path d="M 20,0 L 20,100" fill="none" stroke="currentColor" strokeWidth="1" />
               <path d="M 60,0 L 60,100" fill="none" stroke="currentColor" strokeWidth="3" />
               <path d="M 0,30 L 100,30" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* User Location Dot (Idle / Search) */}
            <AnimatePresence>
               {(appState === "idle" || appState === "search") && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0 }}
                   transition={fastTransition}
                   className="absolute z-10 flex flex-col items-center"
                   style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                 >
                   <div className="w-6 h-6 bg-[#22C55E] rounded-full shadow-[0_0_0_4px_white] flex items-center justify-center relative">
                     <div className="absolute inset-0 bg-[#22C55E] rounded-full animate-ping opacity-40"></div>
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   </div>
                 </motion.div>
               )}
            </AnimatePresence>

            {/* Route Path (Confirm / Finding) */}
            <AnimatePresence>
               {(appState === "confirm" || appState === "finding") && (
                 <motion.svg
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={fastTransition}
                   className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                 >
                   <path
                     d="M 50%,30% C 60%,40% 40%,60% 50%,80%"
                     fill="none"
                     stroke="black"
                     strokeWidth="4"
                     strokeDasharray="8 8"
                     className="opacity-50"
                   />
                   <circle cx="50%" cy="30%" r="6" fill="black" stroke="white" strokeWidth="3" />
                   <circle cx="50%" cy="80%" r="6" fill="#22C55E" stroke="white" strokeWidth="3" />
                 </motion.svg>
               )}
            </AnimatePresence>

            {/* Moving Courier (En Route) */}
            <AnimatePresence>
               {appState === "en_route" && (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.5 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0 }}
                     transition={fastTransition}
                     className="absolute z-10 flex flex-col items-center"
                     style={{ top: '40%', left: '50%', x: '-50%', y: '-50%' }}
                  >
                     <motion.div
                       animate={{ y: [0, -4, 0] }}
                       transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                       className="w-12 h-12 bg-black rounded-full shadow-xl flex items-center justify-center border-[3px] border-white"
                     >
                       <Package size={20} className="text-white" />
                     </motion.div>
                     <div className="mt-2 bg-black text-white px-3 py-1 rounded-full shadow-lg text-[11px] font-bold tracking-wider uppercase">
                        3 min away
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
        </motion.div>
      </div>

      {/* TOP NAVIGATION */}
      <div className="absolute top-0 inset-x-0 z-20 p-5 pt-safe flex justify-between items-center pointer-events-none">
         <AnimatePresence mode="wait">
           {appState === "idle" ? (
             <motion.button
               key="menu"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={fastTransition}
               className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md pointer-events-auto active:scale-95 transition-transform"
             >
               <Menu size={20} className="text-black" />
             </motion.button>
           ) : (
             <motion.button
               key="back"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={fastTransition}
               onClick={() => {
                 if (appState === "search") closeSearch();
                 else if (appState === "confirm") setAppState("search");
                 else if (appState === "finding") setAppState("confirm");
               }}
               className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md pointer-events-auto active:scale-95 transition-transform"
             >
               <ArrowLeft size={20} className="text-black" />
             </motion.button>
           )}
         </AnimatePresence>
      </div>

      {/* BOTTOM SHEET INTERACTIONS */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end">
         <AnimatePresence mode="wait">

            {/* IDLE STATE */}
            {appState === "idle" && (
               <motion.div
                 key="idle"
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%", opacity: 0 }}
                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
                 drag="y"
                 dragConstraints={{ top: 0, bottom: 0 }}
                 dragElastic={0.2}
                 onDragEnd={handleDragEnd}
                 className="bg-white rounded-t-3xl p-5 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] absolute inset-x-0 bottom-0 z-30"
               >
                 <div className="w-full pt-2 pb-6 cursor-grab active:cursor-grabbing flex justify-center">
                   <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
                 </div>

                 <button
                   onClick={handleOpenSearch}
                   className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-left p-4 rounded-2xl flex items-center gap-3 transition-colors active:scale-[0.98] mb-5"
                 >
                    <Search size={22} className="text-black" />
                    <span className="text-lg text-gray-500 font-medium">What do you need?</span>
                 </button>

                 <div className="flex gap-3">
                    <button
                      onClick={handleOpenSearch}
                      className="flex-1 bg-white border border-gray-200 p-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 active:scale-95 transition-all shadow-sm"
                    >
                       <Package size={18} className="text-black" />
                       <span className="text-sm font-semibold">Delivery</span>
                    </button>
                    <button
                      onClick={handleOpenSearch}
                      className="flex-1 bg-white border border-gray-200 p-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 active:scale-95 transition-all shadow-sm"
                    >
                       <Clock size={18} className="text-black" />
                       <span className="text-sm font-semibold">Schedule</span>
                    </button>
                 </div>
               </motion.div>
            )}

            {/* SEARCH STATE */}
            {appState === "search" && (
               <motion.div
                 key="search"
                 initial={{ y: "100%" }}
                 animate={{ y: sheetPosition === "full" ? 0 : "30vh" }}
                 exit={{ y: "100%", opacity: 0 }}
                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
                 drag="y"
                 dragConstraints={{ top: 0, bottom: 0 }}
                 dragElastic={0.2}
                 onDragEnd={handleDragEnd}
                 className="bg-white h-[90dvh] rounded-t-3xl flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.08)] absolute inset-x-0 bottom-0 z-30"
               >
                 {/* Drag Handle Area */}
                 <div className="w-full pt-4 pb-2 cursor-grab active:cursor-grabbing flex justify-center">
                   <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
                 </div>

                 <div className="px-5 pt-2 pb-4 flex flex-col gap-4 relative">
                    <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gray-200 z-0" />

                    {/* What input */}
                    <div className="flex items-center gap-3 relative z-10">
                       <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
                         <div className="w-2 h-2 bg-white rounded-full" />
                       </div>
                       <input
                         type="text"
                         value={requestText}
                         onChange={(e) => setRequestText(e.target.value)}
                         placeholder="What do you need? (e.g. Charger)"
                         className="flex-1 bg-[#F3F4F6] text-black font-medium text-base rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/5"
                         autoFocus
                       />
                    </div>

                    {/* Where input */}
                    <div className="flex items-center gap-3 relative z-10">
                       <div className="w-6 h-6 rounded-none bg-transparent border-[3px] border-black flex items-center justify-center shrink-0" />
                       <input
                         type="text"
                         value={pickupLocation}
                         onChange={(e) => setPickupLocation(e.target.value)}
                         placeholder="Deliver to (e.g. Library Room 2)"
                         className="flex-1 bg-[#F3F4F6] text-black font-medium text-base rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/5"
                       />
                    </div>
                 </div>

                 <div className="flex-1 overflow-y-auto px-5 py-2">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Recent Locations</div>
                    {[ "Main Library", "Engineering Block B", "Cafeteria South" ].map((loc) => (
                      <div key={loc} onClick={() => setPickupLocation(loc)} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 active:bg-gray-50 cursor-pointer">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                          <MapPin size={18} className="text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-semibold">{loc}</div>
                          <div className="text-sm text-gray-500">Campus Area</div>
                        </div>
                      </div>
                    ))}
                 </div>

                 <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] border-t border-gray-100 bg-white">
                    <button
                      onClick={handleProceedToConfirm}
                      disabled={!requestText || !pickupLocation}
                      className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg disabled:bg-gray-200 disabled:text-gray-400 transition-colors active:scale-[0.98]"
                    >
                      Done
                    </button>
                 </div>
               </motion.div>
            )}

            {/* CONFIRM STATE */}
            {appState === "confirm" && (
               <motion.div
                 key="confirm"
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%", opacity: 0 }}
                 transition={fastTransition}
                 className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex flex-col"
               >
                 <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-4 mb-4" />
                 <div className="px-5 pb-4 text-center border-b border-gray-100">
                   <h2 className="text-xl font-bold">Choose Delivery</h2>
                 </div>

                 <div className="p-5 flex flex-col gap-3">
                   {/* Standard Option */}
                   <div
                     onClick={() => setSelectedOption("standard")}
                     className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedOption === "standard" ? "border-black bg-black/5" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                   >
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                         <Package size={24} className="text-black" />
                       </div>
                       <div>
                         <div className="font-bold text-lg">Standard</div>
                         <div className="text-sm text-gray-500">10-15 min</div>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="font-bold text-lg">TZS 2,500</div>
                     </div>
                   </div>

                   {/* Priority Option */}
                   <div
                     onClick={() => setSelectedOption("priority")}
                     className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedOption === "priority" ? "border-black bg-black/5" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                   >
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                         <ShieldCheck size={24} className="text-black" />
                       </div>
                       <div>
                         <div className="font-bold text-lg">Priority</div>
                         <div className="text-sm text-gray-500">5-8 min • Direct</div>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="font-bold text-lg">TZS 4,000</div>
                     </div>
                   </div>
                 </div>

                 <div className="px-5 pb-3">
                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Method</h3>
                   <div className="flex gap-2">
                     <button
                       disabled={pickupLocation !== "Current Location"}
                       onClick={() => setPaymentMethod("cash")}
                       className={`flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${paymentMethod === "cash" ? "border-black bg-black/5" : "border-gray-100 hover:border-gray-200 bg-white"} ${pickupLocation !== "Current Location" ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                     >
                       <Banknote size={20} className="text-black" />
                       <span className="text-xs font-semibold">Cash</span>
                     </button>
                     <button
                       onClick={() => setPaymentMethod("mobile")}
                       className={`flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${paymentMethod === "mobile" ? "border-black bg-black/5" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                     >
                       <Smartphone size={20} className="text-black" />
                       <span className="text-xs font-semibold">Mobile</span>
                     </button>
                     <button
                       onClick={() => setPaymentMethod("card")}
                       className={`flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${paymentMethod === "card" ? "border-black bg-black/5" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                     >
                       <CreditCard size={20} className="text-black" />
                       <span className="text-xs font-semibold">Card</span>
                     </button>
                   </div>
                   {pickupLocation !== "Current Location" && (
                     <p className="text-xs text-orange-600 mt-2 font-medium bg-orange-50 p-2 rounded-lg">Upfront payment required for custom destinations.</p>
                   )}
                 </div>

                 <div className="px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] bg-white pt-2">
                    <button
                      onClick={handleConfirmRequest}
                      className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 active:scale-95 transition-all shadow-md"
                    >
                      {paymentMethod === "cash" ? "Confirm Request" : "Confirm & Pay"}
                    </button>
                 </div>
               </motion.div>
            )}

            {/* FINDING STATE */}
            {appState === "finding" && (
               <motion.div
                 key="finding"
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%", opacity: 0 }}
                 transition={fastTransition}
                 className="bg-white rounded-t-3xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex flex-col items-center"
               >
                 <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-6 relative">
                   <motion.div
                     className="absolute top-0 left-0 bottom-0 bg-black w-1/3"
                     animate={{ x: ["-100%", "300%"] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   />
                 </div>
                 <h2 className="text-xl font-bold mb-1">Connecting to courier...</h2>
                 <p className="text-gray-500 text-sm font-medium">Finding the closest available person</p>
               </motion.div>
            )}

            {/* EN ROUTE STATE */}
            {appState === "en_route" && (
               <motion.div
                 key="en_route"
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%", opacity: 0 }}
                 transition={fastTransition}
                 className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex flex-col"
               >
                 <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-4 mb-4" />

                 <div className="px-6 pb-5 flex items-center justify-between border-b border-gray-100">
                    <div>
                       <h2 className="text-2xl font-bold">3 min away</h2>
                       <p className="text-gray-500 font-medium">{requestText} to {pickupLocation}</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                       <Clock size={24} className="text-black" />
                    </div>
                 </div>

                 <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xl border border-gray-200">
                          J
                       </div>
                       <div>
                          <p className="font-bold text-lg">James</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500 font-semibold">
                             <span>4.9 ★</span>
                             <span>•</span>
                             <span>Courier</span>
                          </div>
                       </div>
                    </div>

                    <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all">
                       <Phone size={20} className="text-black" />
                    </button>
                 </div>

                 <div className="px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-2">
                   <button
                     onClick={() => setAppState("idle")}
                     className="w-full bg-red-50 text-red-600 py-4 rounded-xl font-bold text-base hover:bg-red-100 active:scale-[0.98] transition-colors"
                   >
                     Cancel Request
                   </button>
                 </div>
               </motion.div>
            )}

         </AnimatePresence>
      </div>

    </div>
  )
}
