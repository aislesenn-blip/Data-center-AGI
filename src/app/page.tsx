"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/Logo"
import { RouteCard } from "@/components/ui/RouteCard"

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

        {/* Hero Section */}
        <div className="px-6 space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-rich-black">
            Scheduled Rides Near You
          </h1>
          <p className="text-charcoal font-medium">Find your next route and reserve your seat.</p>
        </div>

        {/* Dynamic Departure Feeds */}
        <div className="px-6 space-y-10 pb-8">

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

          {/* Morning Commute */}
          <section>
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 px-1">
              Morning Commute
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

          {/* Evening Commute */}
          <section>
            <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 px-1">
              Evening Commute
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

        </div>

      </div>
    </div>
  )
}
