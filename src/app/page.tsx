"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/Logo"
import { RouteCard } from "@/components/ui/RouteCard"
import { Select } from "@/components/ui/Select"
import { Search } from "lucide-react"

// Mock marketplace data
const availableRoutes = [
  {
    id: "r1",
    from: "Kariakoo Market",
    to: "Masaki Terminal",
    departureTime: "07:30 AM",
    availableSeats: 3,
    price: "TZS 1,500",
    driverName: "John M.",
    vehicleType: "Toyota Hiace"
  },
  {
    id: "r2",
    from: "Ubungo Interchange",
    to: "Posta City Center",
    departureTime: "08:00 AM",
    availableSeats: 1,
    price: "TZS 2,000",
    driverName: "Sarah K.",
    vehicleType: "Nissan Caravan"
  },
  {
    id: "r3",
    from: "Mwenge Bus Stand",
    to: "Oysterbay",
    departureTime: "08:15 AM",
    availableSeats: 5,
    price: "TZS 1,500",
    driverName: "David T.",
    vehicleType: "Toyota Coaster"
  }
]

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col pb-6">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-border sticky top-0 z-50 flex items-center justify-between">
        <Logo />
        <Link href="/driver" className="text-sm font-semibold text-rich-black hover:text-charcoal transition-colors">
          Driver Area
        </Link>
      </header>

      <div className="flex-1 flex flex-col pt-6">

        {/* Search / Filter Section */}
        <div className="px-6 space-y-5 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-rich-black">
            Where are you going tomorrow?
          </h1>

          <div className="bg-light-gray p-4 rounded-2xl space-y-3">
            <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-border shadow-sm focus-within:border-rich-black transition-colors">
              <Search className="h-5 w-5 text-charcoal ml-2 shrink-0" />
              <input
                type="text"
                placeholder="Search destination..."
                className="w-full bg-transparent border-none outline-none text-rich-black font-medium"
              />
            </div>

            <div className="flex space-x-3">
               <Select className="h-12 bg-white flex-1 text-sm">
                 <option value="tomorrow">Tomorrow Morning</option>
                 <option value="tomorrow-evening">Tomorrow Evening</option>
               </Select>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="px-6 pb-8">
          <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 px-1">
            Available Routes
          </h2>

          <div className="space-y-4">
            {availableRoutes.map((route) => (
              <RouteCard
                key={route.id}
                id={route.id}
                from={route.from}
                to={route.to}
                departureTime={route.departureTime}
                availableSeats={route.availableSeats}
                price={route.price}
                driverName={route.driverName}
                vehicleType={route.vehicleType}
                onClick={() => window.location.href = `/route/${route.id}`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-charcoal font-medium">Looking for a different time?</p>
            <p className="text-xs text-charcoal/60 mt-1">More routes are published daily by drivers.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
