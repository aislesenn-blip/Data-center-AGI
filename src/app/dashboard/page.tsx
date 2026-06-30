"use client";

import { motion } from "framer-motion";
import { Plus, TrendingUp, ArrowUpRight, MonitorPlay, DollarSign, Activity } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const stats = [
    { name: "Active Campaigns", value: "12", change: "+2", icon: Activity },
    { name: "Total Spend", value: "$4,250", change: "+12.5%", icon: DollarSign },
    { name: "Remaining Balance", value: "$1,750", change: null, icon: TrendingUp },
    { name: "Est. Impressions", value: "2.4M", change: "+18.2%", icon: MonitorPlay },
  ];

  const recentCampaigns = [
    { id: 1, name: "Summer Sale 2024", status: "Active", spent: "$1,200", reach: "450k", dates: "Jun 1 - Jun 30" },
    { id: 2, name: "Brand Awareness Q3", status: "Active", spent: "$850", reach: "280k", dates: "Jul 15 - Aug 15" },
    { id: 3, name: "New Store Launch", status: "Scheduled", spent: "$0", reach: "Est. 1.2M", dates: "Sep 1 - Sep 14" },
    { id: 4, name: "Spring Clearance", status: "Completed", spent: "$2,400", reach: "890k", dates: "Apr 1 - Apr 30" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Here&apos;s what&apos;s happening with your campaigns today.</p>
        </div>
        <Link href="/dashboard/campaigns/create">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="bg-[#111827] hover:bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </motion.button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-gray-600" />
              </div>
              {stat.change && (
                <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
            <p className="text-2xl font-bold text-[#111827] mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Campaigns Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#111827]">Recent Campaigns</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Spent</th>
                <th className="px-6 py-4">Reach</th>
                <th className="px-6 py-4">Dates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#111827]">{campaign.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      campaign.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                      campaign.status === "Scheduled" ? "bg-blue-50 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{campaign.spent}</td>
                  <td className="px-6 py-4 text-gray-600">{campaign.reach}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{campaign.dates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
