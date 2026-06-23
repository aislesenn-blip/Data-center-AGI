"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ArrowDownLeft } from "lucide-react"

const history = [
  { id: "tx1", node: "Shoppers Cafe", amount: "- TZS 25,000", time: "Today, 14:30", type: "spend" },
  { id: "tx2", node: "Network Load", amount: "+ TZS 100,000", time: "Yesterday, 09:00", type: "load" },
  { id: "tx3", node: "Uber EA", amount: "- TZS 12,000", time: "Oct 24, 18:15", type: "spend" },
  { id: "tx4", node: "KFC Terminal 2", amount: "- TZS 35,000", time: "Oct 23, 13:00", type: "spend" },
]

export default function HistoryPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-full bg-electric-white">

      <header className="px-6 py-6 flex items-center border-b border-border sticky top-0 z-50 bg-electric-white">
        <button
          onClick={() => router.back()}
          className="mr-4 text-midnight-black"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-lg text-midnight-black uppercase tracking-wide">Network History</span>
      </header>

      <div className="flex-1 px-6 pt-6">

        <div className="space-y-6">
          {history.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between pb-6 border-b border-border last:border-0">
               <div className="flex items-center space-x-4">
                 <div className={`h-10 w-10 rounded-sm flex items-center justify-center shrink-0 ${tx.type === 'spend' ? 'bg-stone-gray' : 'bg-navy-blue text-white'}`}>
                    {tx.type === 'spend' ? (
                      <ArrowUpRight className="h-5 w-5 text-midnight-black" />
                    ) : (
                      <ArrowDownLeft className="h-5 w-5" />
                    )}
                 </div>
                 <div>
                   <p className="font-bold text-midnight-black">{tx.node}</p>
                   <p className="text-xs font-semibold text-slate uppercase tracking-wider mt-0.5">{tx.time}</p>
                 </div>
               </div>
               <div className="text-right">
                 <p className="font-bold text-midnight-black">{tx.amount}</p>
                 <p className="text-[10px] font-bold text-navy-blue uppercase tracking-widest mt-1">Cleared</p>
               </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
