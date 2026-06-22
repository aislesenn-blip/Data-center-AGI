"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/Logo"
import { RouteCard } from "@/components/ui/RouteCard"
import { Search, Compass } from "lucide-react"
import { PassengerNav } from "@/components/layout/PassengerNav"

// Mock marketplace data reflecting dynamic, time-based departures
const leavingSoonRoutes = [
  {
    id: "r1",
    from: "Kariakoo Market",
    to: "Masaki Terminal",
    departureTime: "07:30 AM",
    availableSeats: 3,
    price: "TZS 1,500",
    driverName: "John M.",
    vehicleType: "Toyota Hiace"
  }
]

const morningCommuteRoutes = [
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

const eveningCommuteRoutes = [
  {
    id: "r4",
    from: "Posta City Center",
    to: "Mbagala",
    departureTime: "05:30 PM",
    availableSeats: 4,
    price: "TZS 2,000",
    driverName: "Ali J.",
    vehicleType: "Toyota Hiace"
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

        {/* Search / Hero Section */}
        <div className="px-6 space-y-4 mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-rich-black">
            Where are you going?
          </h1>

          <div className="bg-light-gray p-2 rounded-2xl">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-border shadow-sm focus-within:border-rich-black transition-colors">
              <Search className="h-5 w-5 text-charcoal shrink-0" />
              <input
                type="text"
                placeholder="Find your next ride..."
                className="w-full bg-transparent border-none outline-none text-rich-black font-medium placeholder:text-charcoal/50"
              />
            </div>
            {/* Quick Suggestions */}
            <div className="flex space-x-2 mt-3 px-1 overflow-x-auto pb-1 no-scrollbar">
              <span className="shrink-0 bg-white border border-border text-xs font-semibold px-3 py-1.5 rounded-full text-charcoal">Posta</span>
              <span className="shrink-0 bg-white border border-border text-xs font-semibold px-3 py-1.5 rounded-full text-charcoal">Masaki</span>
              <span className="shrink-0 bg-white border border-border text-xs font-semibold px-3 py-1.5 rounded-full text-charcoal">Mbezi</span>
            </div>
          </div>
        </div>

        {/* Dynamic Departure Feeds */}
        <div className="px-6 space-y-8 pb-8">

          {/* Leaving Soon */}
          <section>
            <h2 className="text-sm font-bold text-accent-orange uppercase tracking-wider mb-4 px-1 flex items-center">
              <span className="w-2 h-2 rounded-full bg-accent-orange mr-2 animate-pulse" />
              Leaving Soon
            </h2>
            <div className="space-y-4">
              {leavingSoonRoutes.map((route) => (
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
                  isLeavingSoon={true}
                  onClick={() => window.location.href = `/route/${route.id}`}
                />
              ))}
            </div>
          </section>

          {/* Next Available */}
          <section>
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 px-1">
              Next Available
            </h2>
            <div className="space-y-4">
              {morningCommuteRoutes.map((route) => (
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
          </section>

          {/* Popular Routes */}
          <section>
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 px-1">
              Popular Routes
            </h2>
            <div className="space-y-4">
              {eveningCommuteRoutes.map((route) => (
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
          </section>

          {/* Discovery Section */}
          <section className="mt-8 pt-8 pb-4 border-t border-border flex flex-col items-center text-center">
             <div className="h-12 w-12 rounded-full bg-light-gray flex items-center justify-center mb-4">
               <Compass className="h-6 w-6 text-charcoal" />
             </div>
             <h3 className="font-bold text-rich-black mb-1">Looking for a different time?</h3>
             <p className="text-sm text-charcoal mb-4 max-w-[250px]">
               Drivers publish new departures daily. Search above to find exactly what you need.
             </p>
          </section>

        </div>

      </div>

      <PassengerNav />
    </div>
  )
}
