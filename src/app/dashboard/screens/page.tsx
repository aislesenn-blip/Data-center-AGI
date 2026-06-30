"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Monitor, Clock, Filter, Search } from "lucide-react";

export default function ScreensPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const screens = [
    {
      id: 1,
      name: "Times Square Main Display",
      location: "New York, NY",
      audience: "2.5M daily",
      price: "$1,500/day",
      size: "40' x 20'",
      hours: "24/7",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1555024765-a85966324db1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Downtown Transit Hub",
      location: "Chicago, IL",
      audience: "850k daily",
      price: "$600/day",
      size: "10' x 6'",
      hours: "5AM - 1AM",
      availability: "Limited",
      image: "https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Sunset Blvd Highway Board",
      location: "Los Angeles, CA",
      audience: "1.2M daily",
      price: "$950/day",
      size: "48' x 14'",
      hours: "24/7",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1542204625-373f1d8e137c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Tech Hub Station Entrance",
      location: "San Francisco, CA",
      audience: "450k daily",
      price: "$400/day",
      size: "8' x 5'",
      hours: "5AM - 12AM",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1518105570889-8d003b0e3650?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "Financial District Square",
      location: "London, UK",
      audience: "900k daily",
      price: "£800/day",
      size: "20' x 10'",
      hours: "24/7",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1545607312-70bfa3693fb5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Shopping Mall Atrium",
      location: "Miami, FL",
      audience: "150k daily",
      price: "$250/day",
      size: "16' x 9'",
      hours: "9AM - 10PM",
      availability: "Limited",
      image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredScreens = screens.filter(screen =>
    screen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    screen.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Screen Marketplace</h1>
          <p className="text-sm text-gray-500 mt-1">Browse and select digital screens for your next campaign.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#111827] outline-none bg-white transition-all"
            />
          </div>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScreens.map((screen, i) => (
          <motion.div
            key={screen.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="h-48 bg-gray-100 relative overflow-hidden">
               <img src={screen.image} alt={screen.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-[#111827] shadow-sm">
                 {screen.price}
               </div>
               <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  screen.availability === 'Available' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
               }`}>
                 {screen.availability}
               </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-[#111827] mb-1">{screen.name}</h3>

              <div className="flex items-center text-gray-500 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
                {screen.location}
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mt-auto">
                <div className="flex items-center text-gray-600">
                   <Users className="w-4 h-4 mr-2 text-gray-400" />
                   {screen.audience}
                </div>
                <div className="flex items-center text-gray-600">
                   <Monitor className="w-4 h-4 mr-2 text-gray-400" />
                   {screen.size}
                </div>
                <div className="flex items-center text-gray-600 col-span-2">
                   <Clock className="w-4 h-4 mr-2 text-gray-400" />
                   {screen.hours}
                </div>
              </div>

              <button className="w-full mt-6 bg-white border border-gray-200 hover:border-[#111827] hover:bg-gray-50 text-[#111827] font-medium py-2 rounded-lg transition-colors text-sm">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredScreens.length === 0 && (
         <div className="text-center py-20">
            <Monitor className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No screens found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
         </div>
      )}
    </div>
  );
}
