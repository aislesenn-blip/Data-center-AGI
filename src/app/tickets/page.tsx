"use client"

import { Clock, QrCode, Ticket } from "lucide-react"
import { PassengerNav } from "@/components/layout/PassengerNav"

// Mock ticket data
const tickets = [
  {
    id: "t1",
    from: "Kariakoo Market",
    to: "Masaki Terminal",
    time: "Tomorrow, 07:30 AM",
    status: "Upcoming",
    driver: "John M.",
    plate: "T 123 ABC"
  }
]

export default function TicketsPage() {
  return (
    <div className="flex flex-col min-h-full pb-6 bg-light-gray">
      <header className="px-6 pt-8 pb-4 bg-white border-b border-border sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tight text-rich-black">My Tickets</h1>
      </header>

      <div className="flex-1 flex flex-col p-6 space-y-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col">
              <div className="p-4 border-b border-dashed border-border flex justify-between items-center bg-soft-white">
                 <div className="flex items-center space-x-2 text-accent-green font-bold text-xs uppercase tracking-wider">
                   <Clock className="h-3.5 w-3.5" />
                   <span>{ticket.status}</span>
                 </div>
                 <QrCode className="h-6 w-6 text-charcoal/40" />
              </div>
              <div className="p-5 space-y-4">
                 <div>
                   <p className="text-xs text-charcoal font-semibold uppercase tracking-wider mb-1">Departure</p>
                   <p className="text-lg font-bold text-rich-black">{ticket.time}</p>
                 </div>
                 <div className="flex items-center space-x-4">
                   <div className="flex-1">
                     <p className="text-[10px] text-charcoal uppercase tracking-wider mb-0.5">From</p>
                     <p className="font-semibold text-sm text-rich-black">{ticket.from}</p>
                   </div>
                   <div className="text-charcoal/30">→</div>
                   <div className="flex-1">
                     <p className="text-[10px] text-charcoal uppercase tracking-wider mb-0.5">To</p>
                     <p className="font-semibold text-sm text-rich-black">{ticket.to}</p>
                   </div>
                 </div>
                 <div className="pt-3 mt-1 border-t border-border flex justify-between items-center">
                   <span className="text-xs text-charcoal font-medium">Driver: {ticket.driver}</span>
                   <span className="text-xs font-bold text-rich-black bg-light-gray px-2 py-1 rounded">{ticket.plate}</span>
                 </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <Ticket className="h-10 w-10 text-charcoal/20 mb-4" />
            <p className="font-semibold text-rich-black mb-1">No upcoming rides</p>
            <p className="text-sm text-charcoal">Book a route and your ticket will appear here.</p>
          </div>
        )}
      </div>

      <PassengerNav />
    </div>
  )
}
