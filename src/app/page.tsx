"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, Package, ArrowLeft, Clock, CircleDot, ChevronRight, Menu, Search } from "lucide-react"

type AppState = "idle" | "request" | "searching" | "en_route"

export default function CampusDeliveryApp() {
  const [appState, setAppState] = useState<AppState>("idle")
  const [requestText, setRequestText] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")

  const handleOpenRequest = () => setAppState("request")
  const closeRequest = () => {
    setAppState("idle")
    setRequestText("")
    setPickupLocation("")
  }

  const handleConfirmRequest = () => {
    if (!requestText || !pickupLocation) return
    setAppState("searching")

    // Simulate finding a courier
    setTimeout(() => {
      setAppState("en_route")
    }, 2500)
  }

  return (
    <div className="flex flex-col h-full bg-[#E5E7EB] text-black overflow-hidden relative font-sans">

      {/* IMMERSIVE MAP BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[#D1D5DB] relative overflow-hidden flex items-center justify-center">
            {/* Fake Map Grid Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Map Roads / Elements */}
            <svg className="absolute w-[200%] h-[200%] text-white/50 -rotate-12" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M 0,50 Q 25,60 50,50 T 100,50" fill="none" stroke="currentColor" strokeWidth="2" />
               <path d="M 20,0 L 20,100" fill="none" stroke="currentColor" strokeWidth="1" />
               <path d="M 60,0 L 60,100" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>

            {/* Simulated Live Tracking Elements */}
            <AnimatePresence>
               {appState === "en_route" && (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.5 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute z-10 flex flex-col items-center"
                     style={{ top: '40%', left: '50%', x: '-50%', y: '-50%' }}
                  >
                     <motion.div
                       animate={{ y: [0, -10, 0] }}
                       transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                       className="w-12 h-12 bg-black rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
                     >
                       <Navigation size={20} className="text-white fill-white" />
                     </motion.div>
                     <div className="mt-2 bg-white px-3 py-1 rounded-full shadow-lg text-xs font-semibold tracking-wide">
                        3 MIN
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
        </div>
      </div>

      {/* TOP NAVIGATION */}
      <div className="absolute top-0 inset-x-0 z-20 p-6 pt-12 flex justify-between items-center pointer-events-none">
         <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-auto active:scale-95 transition-transform">
           <Menu size={24} className="text-black" />
         </button>

         <AnimatePresence>
           {appState === "en_route" && (
             <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white px-5 py-3 rounded-full shadow-lg font-semibold text-sm tracking-wide"
             >
               Delivery in Progress
             </motion.div>
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
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                 className="bg-white rounded-t-3xl p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
               >
                 <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />

                 <h1 className="text-4xl font-semibold tracking-tight mb-8">Need something?</h1>

                 <button
                   onClick={handleOpenRequest}
                   className="w-full bg-[#F3F4F6] border border-[#E5E7EB] hover:bg-[#E5E7EB] text-left p-5 rounded-2xl flex items-center gap-4 transition-colors active:scale-[0.98]"
                 >
                    <Search size={24} className="text-black" />
                    <span className="text-xl text-gray-500 font-light">What can we bring you?</span>
                 </button>

                 <div className="flex gap-4 mt-6">
                    <div className="flex-1 bg-[#F9FAFB] p-4 rounded-2xl flex flex-col items-center justify-center border border-[#E5E7EB]">
                       <Package size={24} className="mb-2 text-black" />
                       <span className="text-sm font-medium">Deliver</span>
                    </div>
                    <div className="flex-1 bg-[#F9FAFB] p-4 rounded-2xl flex flex-col items-center justify-center border border-[#E5E7EB] opacity-50">
                       <MapPin size={24} className="mb-2 text-black" />
                       <span className="text-sm font-medium">Pickup</span>
                    </div>
                 </div>
               </motion.div>
            )}

            {/* REQUEST STATE */}
            {appState === "request" && (
               <motion.div
                 key="request"
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%", opacity: 0 }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                 className="bg-white h-[85dvh] rounded-t-3xl flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
               >
                 <div className="flex items-center justify-between p-6 pb-2">
                   <button onClick={closeRequest} className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors">
                     <ArrowLeft size={24} className="text-black" />
                   </button>
                   <span className="font-semibold text-lg">Request Delivery</span>
                   <div className="w-10" />
                 </div>

                 <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
                    {/* What input */}
                    <div className="flex flex-col gap-2">
                       <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">What do you need?</label>
                       <input
                         type="text"
                         value={requestText}
                         onChange={(e) => setRequestText(e.target.value)}
                         placeholder="e.g., Charger, Water, Notes..."
                         className="w-full text-2xl font-light border-b-2 border-gray-200 py-3 focus:border-black outline-none transition-colors placeholder:text-gray-300"
                         autoFocus
                       />
                    </div>

                    {/* Where input */}
                    <div className="flex flex-col gap-2 mt-4">
                       <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Deliver To</label>
                       <div className="relative">
                          <CircleDot size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-black" />
                          <input
                            type="text"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            placeholder="Building, Library, Seat..."
                            className="w-full text-xl font-light border-b-2 border-gray-200 py-3 pl-8 focus:border-black outline-none transition-colors placeholder:text-gray-300"
                          />
                       </div>
                    </div>
                 </div>

                 <div className="p-6 pb-8 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                       <div className="flex items-center gap-2">
                          <Clock size={20} className="text-black" />
                          <span className="font-medium">Est. 10-15 min</span>
                       </div>
                       <span className="text-xl font-semibold">$3.00</span>
                    </div>

                    <button
                      onClick={handleConfirmRequest}
                      disabled={!requestText || !pickupLocation}
                      className="w-full bg-black text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 disabled:bg-gray-300 transition-colors active:scale-[0.98]"
                    >
                      Confirm Request
                    </button>
                 </div>
               </motion.div>
            )}

            {/* SEARCHING STATE */}
            {appState === "searching" && (
               <motion.div
                 key="searching"
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%", opacity: 0 }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                 className="bg-white rounded-t-3xl p-8 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col items-center text-center"
               >
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-black mb-6"
                 />
                 <h2 className="text-2xl font-semibold tracking-tight mb-2">Finding a courier</h2>
                 <p className="text-gray-500 font-light text-lg">Connecting your request to the nearest available person.</p>
               </motion.div>
            )}

            {/* EN ROUTE (TRACKING) STATE */}
            {appState === "en_route" && (
               <motion.div
                 key="en_route"
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%", opacity: 0 }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
                 className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
               >
                 <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-4" />

                 <div className="p-6 pt-0 border-b border-gray-100 flex items-center justify-between">
                    <div>
                       <h2 className="text-2xl font-semibold mb-1">Arriving in 3 min</h2>
                       <p className="text-gray-500">{requestText} • {pickupLocation}</p>
                    </div>
                 </div>

                 <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xl overflow-hidden border border-gray-200">
                          J
                       </div>
                       <div>
                          <p className="font-semibold text-lg">James</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                             <span>★ 4.9</span>
                             <span>•</span>
                             <span>Courier</span>
                          </div>
                       </div>
                    </div>

                    <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                       <ChevronRight size={24} className="text-black" />
                    </button>
                 </div>

                 <div className="p-6 pb-8 pt-0">
                   <button
                     onClick={() => setAppState("idle")}
                     className="w-full bg-gray-100 text-black py-4 rounded-xl font-medium text-base hover:bg-gray-200 transition-colors active:scale-[0.98]"
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
