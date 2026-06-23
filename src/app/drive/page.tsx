"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MapPin, Search, Users, Navigation } from "lucide-react"
import { MapPlaceholder } from "@/components/ui/MapPlaceholder"
import { Button } from "@/components/ui/Button"

export default function DriveSetupPage() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [seats, setSeats] = useState(3)
  const [isStarting, setIsStarting] = useState(false)

  const handleStartTrip = () => {
    if (!destination) return
    setIsStarting(true)
    // Simulate finding route and starting trip
    setTimeout(() => {
      router.push(`/drive/active?dest=${encodeURIComponent(destination)}&seats=${seats}`)
    }, 1000)
  }

  return (
    <div className="relative flex flex-col h-[100dvh] overflow-hidden bg-light-gray">

      <MapPlaceholder destination={destination} />

      {/* Floating Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 pt-[env(safe-area-inset-top)] flex items-center justify-between">
         <div className="bg-rich-black text-white px-4 py-2 rounded-full font-bold shadow-lg">
           Driver Mode
         </div>
         <Link href="/" className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-rich-black shadow-sm border border-border">
           Exit
         </Link>
      </header>

      {/* Bottom Setup Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col">

         <div className="p-6 pb-8 space-y-6">

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-rich-black">Where are you heading?</h1>
              <p className="text-sm text-charcoal font-medium">Enter your destination to pick up passengers along your route.</p>
            </div>

            {/* Destination Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="h-2 w-2 rounded-full bg-rich-black" />
                 <div className="h-4 w-px bg-border my-1" />
                 <div className="h-2 w-2 rounded-sm bg-accent-blue" />
              </div>
              <div className="pl-10 space-y-3">
                 <div className="h-14 bg-light-gray rounded-xl flex items-center px-4">
                   <span className="text-sm font-semibold text-rich-black">Current Location</span>
                 </div>
                 <div className="relative flex items-center bg-white border-2 border-border rounded-xl focus-within:border-rich-black transition-colors shadow-sm overflow-hidden">
                   <Search className="h-5 w-5 text-charcoal ml-4 shrink-0" />
                   <input
                     type="text"
                     value={destination}
                     onChange={(e) => setDestination(e.target.value)}
                     placeholder="Enter destination..."
                     className="h-14 w-full bg-transparent outline-none px-3 font-bold text-rich-black placeholder:text-charcoal/40 placeholder:font-semibold"
                   />
                 </div>
              </div>
            </div>

            <div className="h-px bg-border w-full" />

            {/* Trip Settings */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-rich-black">Available Seats</p>
                <p className="text-xs text-charcoal font-medium">How many can join?</p>
              </div>

              <div className="flex items-center bg-light-gray rounded-xl p-1 border border-border">
                <button
                  onClick={() => setSeats(Math.max(1, seats - 1))}
                  className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-lg"
                >-</button>
                <div className="w-12 text-center font-bold text-lg text-rich-black flex items-center justify-center">
                  {seats} <Users className="h-3 w-3 ml-1 text-charcoal" />
                </div>
                <button
                  onClick={() => setSeats(Math.min(6, seats + 1))}
                  className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-lg"
                >+</button>
              </div>
            </div>

            {/* Action */}
            <Button
              size="lg"
              onClick={handleStartTrip}
              disabled={!destination || isStarting}
              className="w-full h-16 text-lg shadow-lg flex items-center justify-center group"
            >
              {isStarting ? (
                <div className="w-6 h-6 rounded-full border-3 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <Navigation className="h-6 w-6 mr-2 group-hover:rotate-12 transition-transform" />
                  START TRIP
                </>
              )}
            </Button>
         </div>
      </div>
    </div>
  )
}
