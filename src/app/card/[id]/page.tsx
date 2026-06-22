"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShieldCheck, ArrowLeft, ArrowUpRight, Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { TrustBadge } from "@/components/ui/TrustBadge"

// Mock data
const cardData = {
  id: "c1",
  name: "Elias",
  value: "TZS 750,000",
  rawAmount: 750000,
  cardNumber: "•••• •••• •••• 4289",
  established: "Oct 2023",
  activity: [
    { id: "a1", type: "Deposit", amount: "+ TZS 50,000", date: "Oct 24, 2023", status: "Secured" },
    { id: "a2", type: "Deposit", amount: "+ TZS 100,000", date: "Sep 15, 2023", status: "Secured" },
    { id: "a3", type: "Deposit", amount: "+ TZS 200,000", date: "Aug 02, 2023", status: "Secured" },
  ]
}

export default function CardPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  // Ensure we unwrap the params correctly as per Next.js 15+ async params requirements
  const { id } = use(params)

  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="flex flex-col min-h-full pb-[env(safe-area-inset-bottom)] bg-soft-gray">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between z-10 sticky top-0 bg-soft-gray/90 backdrop-blur-sm">
        <button
          onClick={() => router.back()}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border text-charcoal hover:bg-soft-gray transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <TrustBadge message="Asset Secured" variant="minimal" className="bg-white border border-border" />
        <div className="h-10 w-10" /> {/* Spacer for alignment */}
      </header>

      <div className="px-6 flex-1 space-y-8">

        {/* The Digital Card Asset */}
        <div className="relative h-56 w-full rounded-2xl bg-gradient-to-br from-corporate-green to-corporate-green-dark shadow-xl shadow-corporate-green/20 p-6 flex flex-col justify-between overflow-hidden text-white mt-2">
          {/* Top section */}
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center space-x-2">
               <ShieldCheck className="h-6 w-6 text-white/90" />
               <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">Digital Identity</span>
            </div>

            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md"
            >
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Middle section (Balance) */}
          <div className="z-10 space-y-1 mt-auto mb-4">
             <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Current Value</p>
             <h2 className="text-3xl font-bold tracking-tight">
               {showBalance ? cardData.value : "••••••••"}
             </h2>
          </div>

          {/* Bottom section */}
          <div className="flex justify-between items-end z-10">
            <div>
               <p className="font-semibold text-lg">{cardData.name}</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs font-medium font-mono">{cardData.cardNumber}</p>
              <p className="text-white/50 text-[10px] uppercase tracking-wider mt-1">Est. {cardData.established}</p>
            </div>
          </div>

          {/* Abstract background pattern */}
          <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 rounded-full border-[15px] border-white/5 pointer-events-none" />
          <div className="absolute left-[-10%] top-[-10%] w-32 h-32 rounded-full border-[8px] border-white/5 pointer-events-none" />
        </div>

        {/* Action Button */}
        <div className="flex space-x-4">
          <Button asChild className="flex-1 rounded-xl shadow-md">
            <Link href={`/deposit/${id}`}>
              Deposit to {cardData.name}
            </Link>
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-white border border-border p-4 rounded-xl flex items-start space-x-3 shadow-sm">
           <Lock className="h-5 w-5 text-corporate-green shrink-0 mt-0.5" />
           <div className="space-y-1">
             <h3 className="text-sm font-semibold text-foreground">Long-Term Asset</h3>
             <p className="text-xs text-charcoal/80 leading-relaxed">
               Funds on this card are secured for {cardData.name}&apos;s future. This asset cannot be used for daily transactions.
             </p>
           </div>
        </div>

        {/* Activity History */}
        <section className="pb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 px-1">Asset History</h2>

          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
            {cardData.activity.map((activity, index) => (
              <div
                key={activity.id}
                className={`p-4 flex items-center ${index !== cardData.activity.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="h-10 w-10 rounded-full bg-corporate-green/10 flex items-center justify-center mr-4">
                  <ArrowUpRight className="h-5 w-5 text-corporate-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-foreground">{activity.type}</h3>
                  <p className="text-xs text-charcoal/60">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-corporate-green">{showBalance ? activity.amount : "••••••"}</p>
                  <div className="flex items-center justify-end mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-corporate-green mr-1" />
                    <p className="text-[10px] text-charcoal/80">{activity.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
