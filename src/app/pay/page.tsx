"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Lock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export default function InstantPaymentPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("25000")
  const [isAuthorizing, setIsAuthorizing] = useState(false)

  const handleAuthorize = () => {
    setIsAuthorizing(true)
    setTimeout(() => {
      router.push("/pay/confirm")
    }, 800)
  }

  return (
    <div className="flex flex-col min-h-full bg-electric-white">

      <header className="px-6 py-6 flex items-center border-b border-border sticky top-0 z-50 bg-electric-white">
        <button
          onClick={() => !isAuthorizing && router.back()}
          className="mr-4 text-midnight-black"
          disabled={isAuthorizing}
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <span className="font-bold text-lg text-midnight-black uppercase tracking-wide">Authorize Spend</span>
      </header>

      <div className="flex-1 flex flex-col p-6">

        {/* Merchant Info Node */}
        <div className="mb-10 text-center flex flex-col items-center">
           <div className="h-16 w-16 bg-stone-gray border border-border rounded-sm flex items-center justify-center mb-4">
              <span className="font-black text-xl text-navy-blue">SC</span>
           </div>
           <p className="text-xs font-bold text-slate uppercase tracking-wider mb-1">Target Node</p>
           <h2 className="text-2xl font-black text-midnight-black">Shoppers Cafe</h2>
           <p className="text-sm font-medium text-slate">ID: 8904-ABCD</p>
        </div>

        {/* Input Structure */}
        <div className="space-y-8">
           <div className="text-center">
             <div className="flex items-baseline justify-center space-x-2 border-b-2 border-midnight-black pb-2 mx-auto max-w-[200px]">
               <span className="text-xl font-bold text-midnight-black">TZS</span>
               <input
                 type="tel"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                 className="text-5xl font-black text-midnight-black bg-transparent w-full text-center outline-none"
                 autoFocus
               />
             </div>
           </div>

           <div className="bg-stone-gray border border-border p-4 rounded-sm flex items-start space-x-3">
             <Lock className="h-5 w-5 text-navy-blue shrink-0 mt-0.5" />
             <p className="text-xs font-semibold text-midnight-black leading-relaxed">
               This transaction will be secured by the network layer and verified against your flex balance.
             </p>
           </div>
        </div>

        <div className="mt-auto pt-8">
           <Button
             size="lg"
             className="w-full h-16 text-lg tracking-wide uppercase"
             onClick={handleAuthorize}
             disabled={isAuthorizing || !amount}
           >
             {isAuthorizing ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3" />
                  Processing...
                </div>
             ) : (
                <span className="flex items-center">
                  Confirm Payment <Check className="h-5 w-5 ml-2" />
                </span>
             )}
           </Button>
        </div>

      </div>
    </div>
  )
}
