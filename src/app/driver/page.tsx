"use client"

import Link from "next/link"
import { Users, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"

// Mock Driver Data
const driverData = {
  name: "John M.",
  upcomingRoutes: [
    {
      id: "dr1",
      from: "Kariakoo Market",
      to: "Masaki Terminal",
      date: "Tomorrow",
      time: "07:30 AM",
      bookedSeats: 3,
      totalSeats: 14,
      earnings: "TZS 4,500"
    }
  ],
  stats: {
    totalEarnings: "TZS 145,000",
    completedRoutes: 24,
    passengersMoved: 218
  }
}

export default function DriverDashboardPage() {
  return (
    <div className="flex flex-col min-h-full pb-6">

      {/* Welcome Banner */}
      <div className="px-6 pt-6 pb-8 bg-rich-black text-white relative overflow-hidden">
        <div className="relative z-10">
           <h1 className="text-2xl font-bold tracking-tight mb-1">Good evening, John.</h1>
           <p className="text-white/70 text-sm">Your routes are actively booking.</p>
        </div>

        {/* Abstract background element */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-[10px] border-white/5 pointer-events-none" />
      </div>

      <div className="px-6 flex-1 -mt-4 space-y-6">

        {/* Recent Bookings Activity */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm mb-2 flex items-center justify-between">
           <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-accent-green/10 rounded-full flex items-center justify-center">
                 <Users className="h-5 w-5 text-accent-green" />
              </div>
              <div>
                <p className="font-bold text-rich-black text-sm">2 new bookings</p>
                <p className="text-xs text-charcoal font-medium">in the last 15 minutes</p>
              </div>
           </div>
           <Button variant="secondary" size="sm" className="h-8 px-3">View</Button>
        </div>

        {/* Active Route Focus */}
        <section>
           <div className="flex justify-between items-end mb-4 px-1">
             <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider">Active Departures</h2>
           </div>

           {driverData.upcomingRoutes.length > 0 ? (
             <div className="space-y-4">
               {driverData.upcomingRoutes.map((route) => (
                 <Link key={route.id} href={`/driver/route/${route.id}`} className="block">
                   <div className="bg-white border border-border rounded-2xl p-5 shadow-sm hover:border-rich-black transition-colors active:scale-[0.99]">

                     <div className="flex justify-between items-start mb-4">
                       <div>
                         <p className="text-sm font-bold text-rich-black mb-1">{route.date}, {route.time}</p>
                         <p className="text-xs text-charcoal font-medium">{route.from} → {route.to}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-xs text-charcoal font-medium mb-1">Current Bookings</p>
                         <p className="text-sm font-bold text-accent-green">{route.earnings}</p>
                       </div>
                     </div>

                     <div className="bg-light-gray rounded-xl p-3 flex items-center justify-between">
                       <div className="flex items-center space-x-2">
                         <Users className="h-4 w-4 text-charcoal" />
                         <span className="text-sm font-semibold text-rich-black">
                           {route.bookedSeats} / {route.totalSeats} Seats Booked
                         </span>
                       </div>

                       {/* Mini progress bar */}
                       <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                         <div
                           className="h-full bg-rich-black rounded-full"
                           style={{ width: `${(route.bookedSeats / route.totalSeats) * 100}%` }}
                         />
                       </div>
                     </div>

                   </div>
                 </Link>
               ))}
             </div>
           ) : (
             <div className="bg-white border border-border rounded-2xl p-8 text-center shadow-sm">
               <Clock className="h-8 w-8 text-charcoal/30 mx-auto mb-3" />
               <p className="font-semibold text-rich-black mb-1">No upcoming routes</p>
               <p className="text-sm text-charcoal mb-5">Publish your next commute to start filling seats.</p>
               <Button asChild size="sm">
                 <Link href="/driver/create">
                   Publish a Route
                 </Link>
               </Button>
             </div>
           )}
        </section>

        {/* Create Action */}
        <div className="pt-4">
           <Button asChild className="w-full flex items-center justify-center gap-2">
             <Link href="/driver/create">
               <Plus className="h-5 w-5" /> Publish New Route
             </Link>
           </Button>
        </div>

      </div>
    </div>
  )
}
