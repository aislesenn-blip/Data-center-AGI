"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, ArrowLeft, Package, X, Clock, Navigation2 } from "lucide-react"

// Modern single-screen state transformations
type AppState = "idle" | "search" | "confirm" | "searching_courier" | "tracking"

// Mock suggestions to make the search feel alive like Bolt
const suggestions = [
  { id: "1", text: "Phone Charger", location: "Library Floor 2" },
  { id: "2", text: "Water Bottle", location: "Dorm A" },
  { id: "3", text: "Notebook", location: "Cafeteria" },
]

export default function CampusDeliveryApp() {
  const [appState, setAppState] = useState<AppState>("idle")

  // Form State
  const [what, setWhat] = useState("")
  const [where, setWhere] = useState("")

  // Transitions
  const handleOpenSearch = () => setAppState("search")

  const handleCloseSearch = () => {
    setAppState("idle")
    setWhat("")
    setWhere("")
  }

  const handleSelectSuggestion = (sug: typeof suggestions[0]) => {
    setWhat(sug.text)
    setWhere(sug.location)
    setAppState("confirm")
  }

  const handleContinueToConfirm = () => {
    if (!what || !where) return
    setAppState("confirm")
  }

  const handleConfirmOrder = () => {
    setAppState("searching_courier")
    setTimeout(() => {
      setAppState("tracking")
    }, 2500)
  }

  const handleCancelTracking = () => {
    setAppState("idle")
    setWhat("")
    setWhere("")
  }

  // Map Animation States (The map transforms based on the bottom sheet state)
  const getMapScale = () => {
    switch (appState) {
      case "idle": return 1.1; // Slightly zoomed out, idle
      case "search": return 1.0; // Pushed back slightly
      case "confirm": return 1.2; // Zoomed in to route
      case "tracking": return 1.3; // Very zoomed into live action
      default: return 1.1;
    }
  }

  const getMapY = () => {
    switch (appState) {
      case "idle": return "0%"; // Centered
      case "search": return "-15%"; // Pushed up to make room for full sheet
      case "confirm": return "-25%"; // Route focus
      case "tracking": return "10%"; // Pushed down to center courier
      default: return "0%";
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#E5E7EB] text-black overflow-hidden relative font-sans">

      {/* 1. HERO MAP LAYER (Always present, always transforming) */}
      <motion.div
        animate={{
          scale: getMapScale(),
          y: getMapY()
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 bg-[#F3F4F6] flex items-center justify-center origin-center"
      >
        {/* Fake Map Grid Pattern to simulate roads */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Map Roads / Elements */}
        <svg className="absolute w-[300%] h-[300%] text-black/20 -rotate-12" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M 0,50 Q 25,60 50,50 T 100,50" fill="none" stroke="currentColor" strokeWidth="1.5" />
           <path d="M 30,0 L 30,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
           <path d="M 70,0 L 70,100" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Dynamic Map Elements based on state */}
        <AnimatePresence>
           {/* Confirm Route Line */}
           {appState === "confirm" && (
             <motion.div
               initial={{ opacity: 0, pathLength: 0 }}
               animate={{ opacity: 1, pathLength: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5 }}
               className="absolute inset-0 flex items-center justify-center"
             >
                <svg width="200" height="200" viewBox="0 0 200 200" className="absolute -rotate-12 z-0">
                  <path d="M 50,150 Q 100,100 150,50" fill="none" stroke="black" strokeWidth="4" strokeDasharray="8 8" className="animate-[dash_20s_linear_infinite]" />
                </svg>
                {/* Pickup Marker */}
                <div className="absolute top-[25%] right-[25%] w-4 h-4 bg-black rounded-full border-4 border-white shadow-md z-10" />
                {/* Dropoff Marker */}
                <div className="absolute bottom-[25%] left-[25%] w-4 h-4 bg-black rounded-sm border-4 border-white shadow-md z-10" />
             </motion.div>
           )}

           {/* Live Tracking Courier */}
           {(appState === "tracking" || appState === "searching_courier") && (
             <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="absolute z-10 flex flex-col items-center"
             >
                {/* Radar pulse for searching */}
                {appState === "searching_courier" && (
                   <motion.div
                     animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                     className="absolute w-16 h-16 bg-black rounded-full"
                   />
                )}

                {/* Courier Icon */}
                <motion.div
                  animate={{ y: appState === "tracking" ? [0, -8, 0] : 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-12 h-12 bg-black rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
                >
                  <Navigation2 size={20} className="text-white fill-white" />
                </motion.div>
             </motion.div>
           )}
        </AnimatePresence>
      </motion.div>

      {/* 2. FLOATING TOP UI (Always transforming) */}
      <AnimatePresence>
         {appState === "tracking" && (
           <motion.div
             initial={{ opacity: 0, y: -40 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -40 }}
             transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
             className="absolute top-0 inset-x-0 z-20 pt-[env(safe-area-inset-top,40px)] pb-4 px-4 flex justify-center pointer-events-none"
           >
             <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-3">
               <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
               <span className="font-semibold text-sm tracking-wide">Arriving in 3 min</span>
             </div>
           </motion.div>
         )}
      </AnimatePresence>


      {/* 3. DYNAMIC BOTTOM SHEET (The core product interface) */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end pointer-events-none">

         {/* The container captures pointer events only on the actual sheet */}
         <motion.div
           layout
           transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
           className="bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden pointer-events-auto w-full relative pb-[env(safe-area-inset-bottom,20px)]"
         >
            {/* Sheet Handle */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full z-50" />

            <AnimatePresence mode="wait" initial={false}>

               {/* IDLE STATE: The famous "Need something?" prompt */}
               {appState === "idle" && (
                 <motion.div
                   key="idle"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.3 }}
                   className="p-6 pt-10"
                 >
                   <h1 className="text-4xl font-semibold tracking-tight mb-6">Need something?</h1>
                   <button
                     onClick={handleOpenSearch}
                     className="w-full bg-[#F3F4F6] text-left p-4 rounded-2xl flex items-center gap-4 hover:bg-[#E5E7EB] transition-colors active:scale-[0.98]"
                   >
                      <Search size={24} className="text-black" />
                      <span className="text-xl text-gray-400 font-medium">Where to?</span>
                   </button>
                 </motion.div>
               )}

               {/* SEARCH STATE: Full height sheet for inputs and suggestions */}
               {appState === "search" && (
                 <motion.div
                   key="search"
                   initial={{ opacity: 0, y: "20%" }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: "20%" }}
                   transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                   className="h-[80dvh] flex flex-col"
                 >
                   {/* Search Header */}
                   <div className="flex items-center gap-4 p-6 pt-10 border-b border-gray-100">
                     <button onClick={handleCloseSearch} className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:scale-95 transition-all">
                       <ArrowLeft size={24} className="text-black" />
                     </button>
                     <h2 className="text-xl font-semibold">Request Delivery</h2>
                   </div>

                   {/* Inputs */}
                   <div className="p-6 pb-2 space-y-4">
                      {/* What input */}
                      <div className="relative flex items-center bg-[#F3F4F6] rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-black/5 transition-shadow">
                        <div className="w-12 flex items-center justify-center">
                           <div className="w-2 h-2 rounded-full bg-black" />
                        </div>
                        <input
                          type="text"
                          value={what}
                          onChange={(e) => setWhat(e.target.value)}
                          placeholder="What do you need?"
                          className="flex-1 py-4 bg-transparent outline-none text-lg font-medium placeholder:text-gray-400"
                          autoFocus
                        />
                        {what && (
                          <button onClick={() => setWhat("")} className="w-12 flex items-center justify-center text-gray-400 hover:text-black">
                            <X size={18} />
                          </button>
                        )}
                      </div>

                      {/* Where input */}
                      <div className="relative flex items-center bg-[#F3F4F6] rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-black/5 transition-shadow">
                        <div className="w-12 flex items-center justify-center">
                           <div className="w-2 h-2 rounded-sm bg-black" />
                        </div>
                        <input
                          type="text"
                          value={where}
                          onChange={(e) => setWhere(e.target.value)}
                          placeholder="Where are you?"
                          className="flex-1 py-4 bg-transparent outline-none text-lg font-medium placeholder:text-gray-400"
                        />
                         {where && (
                          <button onClick={() => setWhere("")} className="w-12 flex items-center justify-center text-gray-400 hover:text-black">
                            <X size={18} />
                          </button>
                        )}
                      </div>
                   </div>

                   {/* Dynamic Content Area (Suggestions or Continue) */}
                   <div className="flex-1 overflow-y-auto p-6 pt-2">
                     {what && where ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                           <button
                             onClick={handleContinueToConfirm}
                             className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg active:scale-[0.98] transition-transform"
                           >
                             Done
                           </button>
                        </motion.div>
                     ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 pl-2">Suggestions</p>
                          {suggestions.map(sug => (
                            <button
                              key={sug.id}
                              onClick={() => handleSelectSuggestion(sug)}
                              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors text-left"
                            >
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                 <Clock size={20} className="text-gray-500" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-base">{sug.text}</h4>
                                <p className="text-sm text-gray-500">{sug.location}</p>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                     )}
                   </div>
                 </motion.div>
               )}

               {/* CONFIRM STATE: Half-sheet showing route details and pricing */}
               {appState === "confirm" && (
                 <motion.div
                   key="confirm"
                   initial={{ opacity: 0, y: "20%" }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: "20%" }}
                   transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                   className="pt-10 flex flex-col"
                 >
                   <button onClick={() => setAppState("search")} className="absolute top-8 left-4 p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-all z-10">
                      <ArrowLeft size={24} className="text-black" />
                   </button>

                   <div className="px-6 pb-6 text-center">
                     <h2 className="text-2xl font-semibold tracking-tight">{what}</h2>
                     <p className="text-gray-500 flex items-center justify-center gap-1 mt-1">
                        To <span className="font-medium text-black">{where}</span>
                     </p>
                   </div>

                   <div className="px-6 py-4 border-t border-b border-gray-100 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                          <Package size={24} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">Standard</p>
                          <p className="text-sm text-gray-500">10-15 min ETA</p>
                        </div>
                     </div>
                     <span className="text-xl font-semibold">$3.00</span>
                   </div>

                   <div className="p-6 pt-4">
                     <button
                       onClick={handleConfirmOrder}
                       className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                     >
                       Confirm Delivery
                     </button>
                   </div>
                 </motion.div>
               )}

               {/* TRACKING / EN ROUTE STATE: Compact status pill at bottom */}
               {(appState === "tracking" || appState === "searching_courier") && (
                 <motion.div
                   key="tracking"
                   initial={{ opacity: 0, y: "10%" }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: "100%" }}
                   transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                   className="pt-8"
                 >
                   {appState === "searching_courier" ? (
                      <div className="p-8 text-center">
                        <h2 className="text-2xl font-semibold tracking-tight mb-2">Connecting...</h2>
                        <p className="text-gray-500">Finding the nearest courier.</p>
                        {/* Hidden button to cancel during test/dev */}
                        <button onClick={handleCancelTracking} className="mt-6 text-sm font-medium text-gray-400 hover:text-black">Cancel</button>
                      </div>
                   ) : (
                      <div className="flex flex-col">
                        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 bg-[#F3F4F6] rounded-full flex items-center justify-center font-bold text-xl overflow-hidden border border-[#E5E7EB]">
                                J
                             </div>
                             <div>
                                <p className="font-semibold text-lg">James is arriving</p>
                                <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                                   <span>★ 4.9</span>
                                   <span>•</span>
                                   <span>Courier</span>
                                </div>
                             </div>
                          </div>
                        </div>
                        <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                          <div className="flex items-center gap-2">
                             <MapPin size={18} className="text-gray-400" />
                             <span className="text-sm font-medium text-gray-600 truncate max-w-[200px]">{where}</span>
                          </div>
                          <button onClick={handleCancelTracking} className="text-sm font-semibold text-red-500 py-2 px-4 rounded-full hover:bg-red-50 active:scale-95 transition-all">
                            Cancel
                          </button>
                        </div>
                      </div>
                   )}
                 </motion.div>
               )}

            </AnimatePresence>
         </motion.div>
      </div>

    </div>
  )
}
