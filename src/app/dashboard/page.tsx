"use client"

import * as React from "react"
import { ShieldCheck, Plus, History } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full bg-surface-gray">

      {/* Institutional Header */}
      <header className="bg-corporate-green pt-16 pb-6 px-6 shadow-md rounded-b-[2rem] z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-white/80 text-sm font-medium tracking-wide">VERIFIED PARENT</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <span className="text-white font-medium text-sm">JS</span>
          </div>
        </div>

        <div className="mb-2">
          <p className="text-white/70 text-sm font-medium mb-1">Total Future Value Secured</p>
          <div className="flex items-baseline gap-2">
            <span className="text-white/80 text-2xl font-medium">TZS</span>
            <h1 className="text-5xl font-semibold tracking-tight text-white">450,000</h1>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32 hide-scrollbar">

        {/* Child Cards Overview */}
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-semibold text-charcoal">Registered Children</h2>
          <button className="text-corporate-green text-sm font-medium flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Child
          </button>
        </div>

        <div className="space-y-4 mb-10">
          {/* Digital Child Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-corporate-green/10 flex items-center justify-center">
                <span className="text-corporate-green font-semibold">A</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal">Anna Smith</h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">ID: SC-8492-AN</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-charcoal">250,000</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">TZS</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-corporate-green/10 flex items-center justify-center">
                <span className="text-corporate-green font-semibold">D</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal">David Smith</h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">ID: SC-3819-DA</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-charcoal">200,000</p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">TZS</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Recent Deposits</h2>
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">

            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <History className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Deposit to Anna</p>
                  <p className="text-xs text-gray-400">Oct 12, 2024</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-corporate-green">+50,000</span>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <History className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Deposit to David</p>
                  <p className="text-xs text-gray-400">Oct 01, 2024</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-corporate-green">+100,000</span>
            </div>

          </div>
        </div>
      </div>

      {/* Primary Action FAB */}
      <div className="absolute bottom-8 left-6 right-6">
        <button className="w-full bg-charcoal text-white h-16 rounded-2xl font-medium text-lg shadow-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-5 h-5" />
          Make a Deposit
        </button>
      </div>

    </div>
  )
}
