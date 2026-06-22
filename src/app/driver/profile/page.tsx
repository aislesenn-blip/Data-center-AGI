"use client"

import { Car, ShieldCheck, User, Star, MapPin } from "lucide-react"

export default function DriverProfilePage() {
  return (
    <div className="flex flex-col min-h-full pb-6">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-light-gray z-50 border-b border-border">
        <span className="font-bold text-lg tracking-tight text-rich-black">Driver Profile</span>
      </header>

      <div className="flex-1 px-6 pt-6 space-y-6">

        {/* Driver Card */}
        <div className="bg-white border border-border rounded-xl p-5 shadow-sm flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-rich-black text-white flex items-center justify-center text-xl font-bold">
            JM
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-rich-black">John M.</h2>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Star className="h-3.5 w-3.5 text-accent-orange fill-accent-orange" />
              <span className="text-sm font-semibold text-charcoal">4.9 Rating</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
             <ShieldCheck className="h-6 w-6 text-accent-green mb-1" />
             <span className="text-[10px] text-accent-green font-bold uppercase tracking-wider">Verified</span>
          </div>
        </div>

        {/* Vehicle Info */}
        <section className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
           <div className="p-4 border-b border-border flex items-center space-x-3 bg-soft-white">
             <Car className="h-5 w-5 text-rich-black" />
             <h3 className="font-bold text-sm text-rich-black">Active Vehicle</h3>
           </div>
           <div className="p-4 space-y-4">
             <div className="flex justify-between">
               <span className="text-sm text-charcoal font-medium">Model</span>
               <span className="text-sm font-bold text-rich-black">Toyota Hiace</span>
             </div>
             <div className="flex justify-between">
               <span className="text-sm text-charcoal font-medium">Plate Number</span>
               <span className="text-sm font-bold text-rich-black">T 123 ABC</span>
             </div>
             <div className="flex justify-between">
               <span className="text-sm text-charcoal font-medium">Color</span>
               <span className="text-sm font-bold text-rich-black">White</span>
             </div>
           </div>
        </section>

        {/* Operational Stats */}
        <section className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
           <div className="p-4 border-b border-border flex items-center space-x-3 bg-soft-white">
             <MapPin className="h-5 w-5 text-rich-black" />
             <h3 className="font-bold text-sm text-rich-black">Route Statistics</h3>
           </div>
           <div className="grid grid-cols-2 divide-x divide-border">
             <div className="p-4 text-center">
               <p className="text-xs text-charcoal font-medium uppercase tracking-wider mb-1">Total Routes</p>
               <p className="text-2xl font-bold text-rich-black">142</p>
             </div>
             <div className="p-4 text-center">
               <p className="text-xs text-charcoal font-medium uppercase tracking-wider mb-1">Passengers</p>
               <p className="text-2xl font-bold text-rich-black">890</p>
             </div>
           </div>
        </section>

        {/* Account Actions */}
        <section className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
           <button className="w-full p-4 text-left border-b border-border flex items-center space-x-3 hover:bg-soft-white transition-colors">
             <User className="h-5 w-5 text-charcoal" />
             <span className="font-semibold text-sm text-rich-black">Account Settings</span>
           </button>
           <button className="w-full p-4 text-left flex items-center space-x-3 hover:bg-soft-white transition-colors text-accent-orange">
             <ShieldCheck className="h-5 w-5" />
             <span className="font-semibold text-sm">Security & Privacy</span>
           </button>
        </section>

      </div>
    </div>
  )
}
