"use client"

import { ArrowUpRight } from "lucide-react"

export default function MerchantDashboard() {
  return (
    <div className="flex-1 p-6 space-y-6 bg-stone-gray">

      {/* Node Identity */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-12 w-12 bg-midnight-black rounded-sm flex items-center justify-center">
          <span className="font-black text-electric-white">SC</span>
        </div>
        <div>
          <h1 className="font-bold text-lg text-midnight-black uppercase tracking-wide">Shoppers Cafe</h1>
          <p className="text-xs font-semibold text-slate uppercase tracking-widest">Node ID: 8904-ABCD</p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-electric-white border border-border p-6 rounded-sm shadow-sm space-y-2">
        <p className="text-xs font-bold text-slate uppercase tracking-widest">Today's Volume</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-lg font-bold text-slate">TZS</span>
          <h2 className="text-4xl font-black text-midnight-black tracking-tight">1,250,000</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-electric-white border border-border p-4 rounded-sm shadow-sm">
          <p className="text-[10px] font-bold text-slate uppercase tracking-widest mb-1">Tx Count</p>
          <p className="text-xl font-black text-midnight-black">48</p>
        </div>
        <div className="bg-electric-white border border-border p-4 rounded-sm shadow-sm">
          <p className="text-[10px] font-bold text-slate uppercase tracking-widest mb-1">Settlement</p>
          <p className="text-xl font-black text-navy-blue flex items-center">Auto <ArrowUpRight className="h-4 w-4 ml-1" /></p>
        </div>
      </div>

      {/* Ledger */}
      <div className="pt-4">
        <h3 className="text-xs font-bold text-slate uppercase tracking-widest mb-4">Recent Cleared</h3>
        <div className="bg-electric-white border border-border rounded-sm shadow-sm overflow-hidden">
          {[
            { id: "NTW-8930", amount: "25,000", time: "14:30" },
            { id: "NTW-8929", amount: "12,500", time: "14:15" },
            { id: "NTW-8928", amount: "8,000", time: "13:50" },
          ].map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-4 border-b border-border last:border-0">
               <div>
                 <p className="font-mono text-xs font-bold text-midnight-black">{tx.id}</p>
                 <p className="text-[10px] font-bold text-slate uppercase tracking-widest mt-1">{tx.time}</p>
               </div>
               <span className="font-black text-sm text-midnight-black">TZS {tx.amount}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
