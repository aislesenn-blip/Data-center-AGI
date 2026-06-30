"use client";

import { motion } from "framer-motion";
import { MonitorPlay, Download, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    { label: "Total Impressions", value: "12.4M", trend: "+15.2%", positive: true },
    { label: "Total Spend", value: "$24,500", trend: "+5.4%", positive: false },
    { label: "Avg. Cost Per 1000 (CPM)", value: "$1.98", trend: "-2.1%", positive: true },
    { label: "Active Screens", value: "48", trend: "+12", positive: true },
  ];

  const topScreens = [
    { name: "Times Square Main Display", location: "New York", impressions: "4.2M", spend: "$8,400" },
    { name: "Sunset Blvd Highway Board", location: "Los Angeles", impressions: "2.8M", spend: "$5,200" },
    { name: "Financial District Square", location: "London", impressions: "1.9M", spend: "$4,100" },
    { name: "Downtown Transit Hub", location: "Chicago", impressions: "1.5M", spend: "$2,800" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Analytics & Performance</h1>
          <p className="text-sm text-gray-500 mt-1">Track the performance of your DOOH campaigns.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="bg-[#111827] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{metric.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#111827]">{metric.value}</span>
              <span className={`text-sm font-medium ${metric.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                {metric.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mock Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-[#111827]">Impressions Over Time</h2>
             <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-3 py-1.5 outline-none">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
             </select>
           </div>

           <div className="flex-1 min-h-[300px] flex items-end justify-between gap-2 pt-10">
             {/* Creating a simple mock bar chart with random heights */}
             {[40, 65, 45, 80, 55, 90, 75, 100, 85, 60, 45, 70, 95, 80].map((height, i) => (
               <div key={i} className="w-full relative group flex justify-center">
                 <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height * 10}k
                 </div>
                 <motion.div
                   initial={{ height: 0 }}
                   animate={{ height: `${height}%` }}
                   transition={{ duration: 1, delay: i * 0.05 }}
                   className="w-full max-w-[32px] bg-[#111827] rounded-t-sm hover:bg-gray-700 transition-colors cursor-pointer"
                 />
               </div>
             ))}
           </div>
           <div className="flex justify-between mt-4 text-xs text-gray-400 border-t border-gray-100 pt-4">
              <span>Jun 1</span>
              <span>Jun 7</span>
              <span>Jun 14</span>
           </div>
        </div>

        {/* Top Performing Screens */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-[#111827] mb-6">Top Performing Screens</h2>
          <div className="space-y-6">
             {topScreens.map((screen, i) => (
                <div key={i} className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                      <MonitorPlay className="w-5 h-5 text-gray-500" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#111827] truncate">{screen.name}</p>
                      <p className="text-xs text-gray-500 truncate">{screen.location}</p>
                   </div>
                   <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#111827]">{screen.impressions}</p>
                      <p className="text-xs text-emerald-600">Imp.</p>
                   </div>
                </div>
             ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-[#111827] bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            View All Screens
          </button>
        </div>
      </div>
    </div>
  );
}
