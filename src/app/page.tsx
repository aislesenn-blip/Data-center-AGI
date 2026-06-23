"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal, ArrowLeft, CheckCircle2, Clock, MapPin, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/ui/Logo"
import { MapPlaceholder } from "@/components/ui/MapPlaceholder"
import { LiveTripCard, LiveTripCardProps } from "@/components/ui/LiveTripCard"
import { Button } from "@/components/ui/Button"

// Mock real-time data
const liveTrips: LiveTripCardProps[] = [
  {
    id: "lt1",
    driverName: "Ahmed",
    destination: "Mlimani City",
    availableSeats: 2,
    etaMins: 4,
    distanceKm: 1.2
  },
  {
    id: "lt2",
    driverName: "Sarah",
    destination: "Oysterbay",
    availableSeats: 3,
    etaMins: 7,
    distanceKm: 2.5
  }
]

type AppState = "idle" | "search" | "ride_focus" | "requesting" | "confirmed"

export default function PassengerRealTimeHomePage() {
  const [appState, setAppState] = useState<AppState>("idle")
  const [selectedTrip, setSelectedTrip] = useState<LiveTripCardProps | null>(null)

  const handleTripClick = (trip: LiveTripCardProps) => {
    setSelectedTrip(trip)
    setAppState("ride_focus")
  }

  const handleRequestSeat = () => {
    setAppState("requesting")
    // Simulate booking flow
    setTimeout(() => {
      setAppState("confirmed")
    }, 1500)
  }

  const handleClose = () => {
    setAppState("idle")
    setSelectedTrip(null)
  }

  return (
    <div className="relative flex flex-col h-[100dvh] overflow-hidden bg-light-gray">

      {/* Background Map Experience */}
      <MapPlaceholder isFocused={appState === "ride_focus" || appState === "requesting"} />

      {/* Floating Header (Only in idle) */}
      <AnimatePresence>
        {appState === "idle" && (
          <motion.header
            className="absolute top-0 left-0 right-0 z-50 p-4 pt-[env(safe-area-inset-top)]"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            <div className="flex items-center justify-between mb-4 px-2">
               <Logo />
               <Link href="/drive" className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-rich-black shadow-sm border border-border">
                 Drive
               </Link>
            </div>

            <div
              onClick={() => setAppState("search")}
              className="bg-white rounded-2xl shadow-lg border border-border flex items-center p-3 cursor-pointer"
            >
              <Search className="h-5 w-5 text-charcoal ml-2 shrink-0" />
              <div className="w-full text-rich-black font-semibold px-3 text-left">
                Where are you going?
              </div>
              <div className="h-8 w-8 rounded-xl bg-light-gray flex items-center justify-center shrink-0">
                 <SlidersHorizontal className="h-4 w-4 text-rich-black" />
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Interactive Map Elements (Simulated markers) */}
      <AnimatePresence>
        {appState === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/3 flex flex-col items-center">
               <div className="bg-accent-blue text-white px-2 py-1 rounded text-[10px] font-bold mb-1 shadow">2 Seats</div>
               <div className="h-4 w-4 rounded-full bg-accent-blue border-2 border-white shadow-lg relative">
                 <div className="absolute inset-0 bg-accent-blue rounded-full animate-ping opacity-50" />
               </div>
            </div>

            <div className="absolute top-1/3 right-1/4 flex flex-col items-center">
               <div className="bg-accent-blue text-white px-2 py-1 rounded text-[10px] font-bold mb-1 shadow">3 Seats</div>
               <div className="h-4 w-4 rounded-full bg-accent-blue border-2 border-white shadow-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATE: IDLE - Bottom Sheet Live Opportunities */}
      <AnimatePresence>
        {appState === "idle" && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col max-h-[60vh]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
             <div className="w-full flex justify-center pt-3 pb-2 shrink-0">
               <div className="w-12 h-1.5 bg-border rounded-full" />
             </div>
             <div className="px-6 pb-2 shrink-0">
               <h2 className="font-bold text-rich-black text-lg">Active Near You</h2>
               <p className="text-xs text-charcoal font-medium">Vehicles currently heading your way.</p>
             </div>

             <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-4 pt-2">
                {liveTrips.map((trip) => (
                   <motion.div layoutId={`trip-${trip.id}`} key={trip.id}>
                     <LiveTripCard
                       {...trip}
                       onClick={() => handleTripClick(trip)}
                     />
                   </motion.div>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATE: SEARCH - Full Screen Overlay */}
      <AnimatePresence>
        {appState === "search" && (
          <motion.div
            className="absolute inset-0 z-50 bg-soft-white flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="p-4 pt-[env(safe-area-inset-top)] flex items-center space-x-3 bg-white border-b border-border">
              <button onClick={handleClose} className="p-2 -ml-2 rounded-full hover:bg-light-gray transition">
                <ArrowLeft className="h-6 w-6 text-rich-black" />
              </button>
              <input
                autoFocus
                type="text"
                placeholder="Where are you going?"
                className="w-full bg-transparent border-none outline-none text-rich-black font-semibold text-lg placeholder:text-charcoal/40"
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4">Recent Destinations</p>
              <div className="space-y-4">
                 {["Oysterbay", "Masaki Terminal", "Mlimani City"].map((dest) => (
                   <div key={dest} className="flex items-center space-x-4 border-b border-border pb-4 cursor-pointer" onClick={() => setAppState("idle")}>
                     <div className="h-10 w-10 bg-light-gray rounded-full flex items-center justify-center shrink-0">
                       <MapPin className="h-5 w-5 text-charcoal" />
                     </div>
                     <span className="font-semibold text-rich-black">{dest}</span>
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATE: RIDE FOCUS & REQUESTING - Bottom Panel */}
      <AnimatePresence>
        {(appState === "ride_focus" || appState === "requesting") && selectedTrip && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
             <button onClick={handleClose} className="absolute right-4 top-4 p-2 rounded-full bg-light-gray">
               <X className="h-5 w-5 text-charcoal" />
             </button>

             <motion.div layoutId={`trip-${selectedTrip.id}`}>
               <LiveTripCard {...selectedTrip} className="shadow-none border-border mb-4 p-0" />
             </motion.div>

             <Button
               size="lg"
               className="w-full h-16 text-lg shadow-lg flex items-center justify-center group"
               onClick={handleRequestSeat}
               disabled={appState === "requesting"}
             >
               {appState === "requesting" ? (
                 <div className="w-6 h-6 rounded-full border-3 border-white/30 border-t-white animate-spin" />
               ) : (
                 "Request Seat"
               )}
             </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATE: CONFIRMED - Boarding Pass Modal */}
      <AnimatePresence>
        {appState === "confirmed" && selectedTrip && (
          <motion.div
            className="absolute inset-0 z-50 bg-rich-black/40 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <motion.div
               className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative"
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               transition={{ type: "spring", damping: 25 }}
             >
                <div className="bg-accent-green/10 p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-accent-green rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-rich-black">Request Accepted</h2>
                  <p className="text-sm font-medium text-charcoal">Driver is heading to your location.</p>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-light-gray rounded-full flex items-center justify-center border border-border">
                        <span className="font-bold text-rich-black">{selectedTrip.driverName[0]}</span>
                      </div>
                      <div>
                        <p className="font-bold text-rich-black text-sm">{selectedTrip.driverName}</p>
                        <p className="text-[10px] text-charcoal uppercase tracking-wider font-semibold">Toyota Hiace • T123</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-light-gray rounded-xl p-4 flex justify-between items-center border border-border">
                    <div>
                      <p className="text-[10px] text-charcoal uppercase tracking-wider font-semibold mb-1">Arriving In</p>
                      <p className="font-bold text-2xl text-rich-black">{selectedTrip.etaMins} <span className="text-sm">min</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-charcoal uppercase tracking-wider font-semibold mb-1">Distance</p>
                      <p className="font-bold text-2xl text-rich-black">{selectedTrip.distanceKm} <span className="text-sm">km</span></p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-border bg-soft-white">
                  <Button variant="outline" className="w-full" onClick={handleClose}>
                    Close to View Map
                  </Button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
