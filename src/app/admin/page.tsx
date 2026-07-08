"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Users, Building2, Activity, ShieldCheck, Search, Bell, Settings, Plus, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden">
      {/* Sidebar for Desktop/Tablet */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-slate-300">
        <div className="p-6 flex items-center gap-3 text-white font-bold text-xl tracking-tight">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
          TankTo Admin
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          {[
            { id: "overview", icon: Activity, label: "Overview" },
            { id: "subscribers", icon: Users, label: "Subscribers" },
            { id: "stations", icon: Building2, label: "Fuel Stations" },
            { id: "settings", icon: Settings, label: "Settings" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id ? "bg-slate-800 text-white font-semibold" : "hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">
              SA
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Super Admin</p>
              <p className="text-xs text-slate-500">System Owner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input className="pl-10 h-10 w-64 bg-slate-100 border-none rounded-full" placeholder="Search anything..." />
            </div>
            <button className="relative text-slate-500 hover:text-slate-900">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 hide-scrollbar">
          {activeTab === "overview" && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Active Subscribers", value: "2,405", trend: "+12%", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Fuel Dispensed (Today)", value: formatCurrency(12500000), trend: "+4%", color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Outstanding Repayments", value: formatCurrency(45000000), trend: "-2%", color: "text-red-600", bg: "bg-red-50" }
                ].map((kpi, i) => (
                  <Card key={i} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                      <div className="flex items-end justify-between mt-2">
                        <h2 className="text-3xl font-bold text-slate-900">{kpi.value}</h2>
                        <span className={`inline-flex items-center text-sm font-semibold px-2 py-1 rounded-lg ${kpi.bg} ${kpi.color}`}>
                          <TrendingUp className="h-4 w-4 mr-1" /> {kpi.trend}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Fuel Transactions</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                            U{i}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">User {i}</p>
                            <p className="text-sm text-slate-500">Puma Station - Upanga</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">{formatCurrency(30000 * i)}</p>
                          <p className="text-xs font-semibold text-emerald-600">Completed</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "subscribers" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <Input className="max-w-md bg-white" placeholder="Search subscribers..." />
                <Button><Plus className="h-5 w-5 mr-2" /> Invite Subscriber</Button>
              </div>
              <Card className="border-none shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="p-4 text-sm font-semibold text-slate-500">Name</th>
                        <th className="p-4 text-sm font-semibold text-slate-500">Plan</th>
                        <th className="p-4 text-sm font-semibold text-slate-500">Fuel Limit</th>
                        <th className="p-4 text-sm font-semibold text-slate-500">Outstanding</th>
                        <th className="p-4 text-sm font-semibold text-slate-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1,2,3,4,5,6].map((i) => (
                        <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-medium text-slate-900">John Doe {i}</td>
                          <td className="p-4 text-slate-600">Pro Member</td>
                          <td className="p-4 text-slate-600">{formatCurrency(150000)}</td>
                          <td className="p-4 text-slate-900 font-semibold">{formatCurrency(i * 10000)}</td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {(activeTab === "stations" || activeTab === "settings") && (
             <div className="flex flex-col items-center justify-center h-64 text-slate-400">
               <Building2 className="h-16 w-16 mb-4 opacity-20" />
               <p>Module in development for {activeTab}</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
