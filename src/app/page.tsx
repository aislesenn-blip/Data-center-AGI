"use client"

import { useState } from "react"
import { Scan, QrCode, ArrowLeft, History, CheckCircle2, Building2, Coffee, ShoppingBag, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type AppState = "home" | "scan" | "confirm" | "success" | "history"

interface Transaction {
  id: string
  merchant: string
  amount: number
  date: string
  icon: React.ReactNode
}

const transactions: Transaction[] = [
  { id: "tx1", merchant: "Whole Foods Market", amount: 45.20, date: "Today, 14:23", icon: <ShoppingBag size={20} className="text-white" /> },
  { id: "tx2", merchant: "Starbucks", amount: 6.50, date: "Today, 09:12", icon: <Coffee size={20} className="text-white" /> },
  { id: "tx3", merchant: "Apple Store", amount: 129.00, date: "Yesterday", icon: <Building2 size={20} className="text-white" /> },
]

export default function PaymentNetworkApp() {
  const [appState, setAppState] = useState<AppState>("home")
  const amount = 45.20;
  const merchant = "Whole Foods Market";

  const handleScan = () => {
    setAppState("scan")
    // Simulate finding a merchant after scanning
    setTimeout(() => {
      setAppState("confirm")
    }, 1500)
  }

  const handleConfirm = () => {
    setAppState("success")
    setTimeout(() => {
      setAppState("home")
    }, 2500)
  }

  return (
    <div className="flex flex-col h-full bg-[#0a1118] text-white overflow-hidden relative">
      <AnimatePresence mode="wait">

        {/* HOME STATE */}
        {appState === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full p-6 pt-12"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm" />
                </div>
                <span className="font-semibold text-lg tracking-tight">Network</span>
              </div>
              <button
                onClick={() => setAppState("history")}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <History size={20} className="text-white/80" />
              </button>
            </div>

            {/* Balance */}
            <div className="flex flex-col mb-16">
              <span className="text-white/50 text-sm font-medium tracking-wide uppercase mb-2">Available Balance</span>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-light tracking-tight">$4,250</span>
                <span className="text-2xl text-white/50 font-light mb-1">.00</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-white/5 self-start px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                <span className="text-xs font-medium text-white/70">Flex Balance Active</span>
              </div>
            </div>

            {/* Primary Action */}
            <div className="mt-auto pb-8 flex gap-4">
              <button
                onClick={handleScan}
                className="flex-1 bg-white text-black py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                <Scan size={24} />
                Tap to Pay
              </button>
              <button
                className="w-16 h-[60px] bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 active:scale-[0.98] transition-all"
              >
                <QrCode size={24} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}

        {/* SCAN STATE */}
        {appState === "scan" && (
          <motion.div
            key="scan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full bg-[#050505] relative"
          >
            <div className="absolute top-12 left-6 z-10">
              <button onClick={() => setAppState("home")} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <ArrowLeft size={20} className="text-white" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center flex-col relative overflow-hidden">
              {/* Fake camera viewfinder */}
              <div className="w-64 h-64 border-2 border-white/20 rounded-3xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-3xl" />

                {/* Scanning line animation */}
                <motion.div
                  initial={{ top: 0, opacity: 0 }}
                  animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-[#0A66C2] shadow-[0_0_8px_2px_rgba(10,102,194,0.5)]"
                />
              </div>
              <p className="mt-8 text-white/50 text-sm tracking-wide">Hold near terminal or scan QR</p>
            </div>
          </motion.div>
        )}

        {/* CONFIRM STATE */}
        {appState === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full p-6 bg-[#0a1118]"
          >
            <div className="pt-8 pb-12 flex justify-between items-start">
               <button onClick={() => setAppState("home")} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                 <X size={20} className="text-white/70" />
               </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-light tracking-tight mb-2">{merchant}</h2>
              <div className="flex items-start justify-center gap-1 mb-8">
                <span className="text-2xl text-white/70 mt-1">$</span>
                <span className="text-6xl font-light tracking-tight">{Math.floor(amount)}</span>
                <span className="text-2xl text-white/70 mt-1">.{(amount % 1).toFixed(2).substring(2)}</span>
              </div>

              <div className="w-full bg-white/5 rounded-2xl p-4 flex justify-between items-center mb-auto">
                 <span className="text-white/60 text-sm">Payment Source</span>
                 <span className="text-white font-medium text-sm flex items-center gap-2">
                   Network Balance <div className="w-1.5 h-1.5 rounded-full bg-[#0A66C2]" />
                 </span>
              </div>
            </div>

            <div className="pb-8">
              <p className="text-center text-white/40 text-xs mb-4">Secured by global network infrastructure</p>
              <button
                onClick={handleConfirm}
                className="w-full bg-[#0A66C2] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-[#095bb0] active:scale-[0.98] transition-all"
              >
                Confirm Payment
              </button>
            </div>
          </motion.div>
        )}

        {/* SUCCESS STATE */}
        {appState === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full bg-[#0A66C2] items-center justify-center p-6"
          >
            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
               className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl"
            >
              <CheckCircle2 size={48} className="text-[#0A66C2]" />
            </motion.div>
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-light tracking-tight text-white mb-2"
            >
              Approved
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/80 font-medium"
            >
              ${amount.toFixed(2)} to {merchant}
            </motion.p>
          </motion.div>
        )}

        {/* HISTORY STATE */}
        {appState === "history" && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full p-6 pt-12 bg-[#0a1118]"
          >
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setAppState("home")}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <h2 className="text-xl font-medium tracking-tight">Activity</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
              <div className="space-y-6">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        {tx.icon}
                      </div>
                      <div>
                        <p className="font-medium text-white text-base">{tx.merchant}</p>
                        <p className="text-white/40 text-sm">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white text-base">-${tx.amount.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
