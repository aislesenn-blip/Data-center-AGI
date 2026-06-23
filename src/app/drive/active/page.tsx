"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MapPin, Navigation, User, X, Check, ArrowRight } from "lucide-react"
import { MapPlaceholder } from "@/components/ui/MapPlaceholder"
import { Button } from "@/components/ui/Button"

function ActiveTripContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const destination = searchParams.get("dest") || "Destination"

  // Mock an incoming request state
  const [hasRequest, setHasRequest] = useState(true)

  const handleEndTrip = () => {
    router.push("/")
  }

  return (
    <>
      <MapPlaceholder destination={destination} />

      {/* Top Status Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 pt-[env(safe-area-inset-top)] flex flex-col items-center">
         <div className="bg-rich-black text-white px-5 py-3 rounded-2xl font-bold shadow-xl flex items-center w-full max-w-sm justify-between">
           <div className="flex items-center">
             <div className="h-2 w-2 rounded-full bg-accent-green animate-pulse mr-3" />
             <div>
               <p className="text-[10px] text-white/60 uppercase tracking-wider mb-0.5">Navigating to</p>
               <p className="text-sm truncate max-w-[150px]">{destination}</p>
             </div>
           </div>
           <div className="text-right border-l border-white/20 pl-3">
             <p className="text-[10px] text-white/60 uppercase tracking-wider mb-0.5">ETA</p>
             <p className="text-sm text-accent-green">24 min</p>
           </div>
         </div>
      </header>

      {/* Incoming Request Overlay */}
      {hasRequest && (
        <div className="absolute top-1/4 left-4 right-4 z-40 bg-white rounded-2xl shadow-2xl border-2 border-accent-blue p-5 animate-in slide-in-from-top-4 fade-in duration-300">
           <div className="flex justify-between items-start mb-4">
             <div className="flex items-center space-x-3">
               <div className="h-12 w-12 rounded-full bg-light-gray flex items-center justify-center border border-border">
                 <User className="h-6 w-6 text-charcoal" />
               </div>
               <div>
                 <p className="font-bold text-rich-black text-lg">Elias requested a seat</p>
                 <div className="flex items-center text-sm font-semibold text-accent-blue mt-0.5">
                   <MapPin className="h-3.5 w-3.5 mr-1" />
                   Pickup is +2 mins off your route
                 </div>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-3 mt-6">
             <Button variant="outline" size="lg" onClick={() => setHasRequest(false)}>
               <X className="h-5 w-5 mr-1" /> Decline
             </Button>
             <Button variant="accent" size="lg" onClick={() => setHasRequest(false)}>
               <Check className="h-5 w-5 mr-1" /> Accept
             </Button>
           </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-4 pb-[env(safe-area-inset-bottom)]">
         <div className="bg-white rounded-2xl shadow-xl border border-border p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-light-gray flex flex-col items-center justify-center border border-border">
                <span className="text-xs font-bold text-rich-black">2</span>
                <span className="text-[8px] text-charcoal font-bold uppercase">Seats</span>
              </div>
              <div>
                <p className="font-bold text-rich-black text-sm">Trip Active</p>
                <p className="text-xs text-charcoal font-medium">Broadcasting to network...</p>
              </div>
            </div>

            <button
              onClick={handleEndTrip}
              className="h-12 w-12 rounded-full bg-rich-black text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <X className="h-5 w-5" />
            </button>
         </div>
      </div>
    </>
  )
}

export default function DriveActivePage() {
  return (
    <div className="relative flex flex-col h-[100dvh] overflow-hidden bg-light-gray">
      <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-8 h-8 rounded-full border-4 border-rich-black border-t-transparent animate-spin" /></div>}>
        <ActiveTripContent />
      </Suspense>
    </div>
  )
}
