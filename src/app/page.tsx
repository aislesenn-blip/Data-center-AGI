"use client"

import { motion } from "framer-motion"
import { Activity, Users, MonitorPlay, TrendingUp, BarChart3, MapPin } from "lucide-react"

const stats = [
  { name: 'Active Campaigns', value: '12', change: '+2', changeType: 'positive', icon: MonitorPlay },
  { name: 'Total Reach (30d)', value: '1.2M', change: '+12%', changeType: 'positive', icon: Users },
  { name: 'Avg. Screen Uptime', value: '98.4%', change: '+0.2%', changeType: 'positive', icon: Activity },
  { name: 'Conversion Est.', value: '2.4%', change: '-0.1%', changeType: 'negative', icon: TrendingUp },
]

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Overview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your campaign performance across the Rikpedia network.
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 30 }}
            className="relative overflow-hidden rounded-xl bg-white px-4 pb-12 pt-5 shadow-sm sm:px-6 sm:pt-6 ring-1 ring-slate-200"
          >
            <dt>
              <div className="absolute rounded-md bg-[#0EA5E9]/10 p-3">
                <item.icon className="h-6 w-6 text-[#0EA5E9]" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-slate-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.change}
              </p>
            </dd>
          </motion.div>
        ))}
      </dl>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6 min-h-[400px] flex flex-col items-center justify-center text-slate-500"
        >
          <BarChart3 className="w-12 h-12 text-slate-300 mb-4" />
          <p>Impression Chart Placeholder</p>
          <p className="text-sm mt-2 text-slate-400">Waiting for API Integration (Phase B)</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6 min-h-[400px] flex flex-col items-center justify-center text-slate-500"
        >
          <MapPin className="w-12 h-12 text-slate-300 mb-4" />
          <p>Live Fleet Heatmap Placeholder</p>
          <p className="text-sm mt-2 text-slate-400">Waiting for Geofence Engine (Phase B)</p>
        </motion.div>
      </div>
    </div>
  )
}