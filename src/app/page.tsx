"use client"

import Link from "next/link"
import { Search, SlidersHorizontal } from "lucide-react"
import { Logo } from "@/components/ui/Logo"
import { MapPlaceholder } from "@/components/ui/MapPlaceholder"
import { LiveTripCard } from "@/components/ui/LiveTripCard"

// Mock real-time data
const liveTrips = [
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

export default function PassengerRealTimeHomePage() {
  return (
    <div className="relative flex flex-col h-[100dvh] overflow-hidden bg-light-gray">

      {/* Background Map Experience */}
      <MapPlaceholder />

      {/* Floating Header / Search */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between mb-4 px-2">
           <Logo />
           <Link href="/drive" className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-rich-black shadow-sm border border-border">
             Drive
           </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-border flex items-center p-3">
          <Search className="h-5 w-5 text-charcoal ml-2 shrink-0" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="w-full bg-transparent border-none outline-none text-rich-black font-semibold px-3 placeholder:text-charcoal/50"
          />
          <div className="h-8 w-8 rounded-xl bg-light-gray flex items-center justify-center shrink-0">
             <SlidersHorizontal className="h-4 w-4 text-rich-black" />
          </div>
        </div>
      </header>

      {/* Interactive Map Elements (Simulated) */}
      <div className="absolute top-1/2 left-1/3 z-10 flex flex-col items-center">
         <div className="bg-accent-blue text-white px-2 py-1 rounded text-[10px] font-bold mb-1 shadow">2 Seats</div>
         <div className="h-4 w-4 rounded-full bg-accent-blue border-2 border-white shadow-lg relative">
           <div className="absolute inset-0 bg-accent-blue rounded-full animate-ping opacity-50" />
         </div>
      </div>

      <div className="absolute top-1/3 right-1/4 z-10 flex flex-col items-center">
         <div className="bg-accent-blue text-white px-2 py-1 rounded text-[10px] font-bold mb-1 shadow">3 Seats</div>
         <div className="h-4 w-4 rounded-full bg-accent-blue border-2 border-white shadow-lg" />
      </div>

      {/* Bottom Sheet: Live Opportunities */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col max-h-[60vh]">
         {/* Drag Handle */}
         <div className="w-full flex justify-center pt-3 pb-2 shrink-0">
           <div className="w-12 h-1.5 bg-border rounded-full" />
         </div>

         <div className="px-6 pb-2 shrink-0">
           <h2 className="font-bold text-rich-black text-lg">Active Near You</h2>
           <p className="text-xs text-charcoal font-medium">Vehicles currently heading your way.</p>
         </div>

         <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-4 pt-2">
            {liveTrips.map((trip) => (
               <LiveTripCard
                 key={trip.id}
                 {...trip}
                 // In a real app this would open a request bottom sheet or page
                 onClick={() => {}}
               />
            ))}

            <div className="text-center pt-4 pb-2">
              <div className="inline-block h-8 w-8 rounded-full border-2 border-border border-t-rich-black animate-spin mb-2" />
              <p className="text-xs font-semibold text-charcoal">Scanning network for more vehicles...</p>
            </div>
         </div>
      </div>

    </div>
  )
}
