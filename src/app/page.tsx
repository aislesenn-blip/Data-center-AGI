"use client"

import { useState } from "react"
import { Scan, QrCode, ArrowLeft, History, CheckCircle2, Building2, Coffee, ShoppingBag, X, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type AppState = "home" | "scan" | "confirm" | "success" | "history" | "deposit" | "deposit_confirm" | "deposit_success"

interface Transaction {
  id: string
  merchant: string
  amount: number
  date: string
  icon: React.ReactNode
}

const transactions: Transaction[] = [
  { id: "tx1", merchant: "Whole Foods Market", amount: 45.20, date: "Today, 14:23", icon: <ShoppingBag size={20} className="text-[#111827]" /> },
  { id: "tx2", merchant: "Starbucks", amount: 6.50, date: "Today, 09:12", icon: <Coffee size={20} className="text-[#111827]" /> },
  { id: "tx3", merchant: "Apple Store", amount: 129.00, date: "Yesterday", icon: <Building2 size={20} className="text-[#111827]" /> },
]

export default function PaymentNetworkApp() {
  const [appState, setAppState] = useState<AppState>("home")
  const [balance, setBalance] = useState(4250.00)
  const amount = 45.20;
  const merchant = "Whole Foods Market";

  const [depositAmount, setDepositAmount] = useState("")

  const handleScan = () => {
    setAppState("scan")
    // Simulate finding a merchant after scanning
    setTimeout(() => {
      setAppState("confirm")
    }, 1500)
  }

  const handleConfirmPayment = () => {
    setAppState("success")
    setTimeout(() => {
      setAppState("home")
    }, 2500)
  }

  const handleAddBalanceClick = () => {
    setDepositAmount("")
    setAppState("deposit")
  }

  const handleDepositNext = () => {
    if (!depositAmount || Number(depositAmount) <= 0) return
    setAppState("deposit_confirm")
  }

  const handleConfirmDeposit = () => {
    setAppState("deposit_success")
    setTimeout(() => {
      setBalance(prev => prev + Number(depositAmount))
      setAppState("home")
    }, 2500)
  }

  const handleKeypadPress = (val: string) => {
    if (depositAmount.length > 5) return;
    setDepositAmount(prev => prev + val)
  }

  const handleBackspace = () => {
    setDepositAmount(prev => prev.slice(0, -1))
  }

  return (
    <div className="flex flex-col h-full bg-white text-[#111827] overflow-hidden relative">
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
                <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center border border-[#E5E7EB]">
                  <div className="w-4 h-4 bg-[#111827] rounded-sm" />
                </div>
                <span className="font-semibold text-lg tracking-tight">Network</span>
              </div>
              <button
                onClick={() => setAppState("history")}
                className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors border border-[#E5E7EB]"
              >
                <History size={20} className="text-[#374151]" />
              </button>
            </div>

            {/* Balance */}
            <div className="flex flex-col mb-16">
              <span className="text-[#6B7280] text-sm font-medium tracking-wide uppercase mb-2">Available Balance</span>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-light tracking-tight">${Math.floor(balance).toLocaleString()}</span>
                <span className="text-2xl text-[#6B7280] font-light mb-1">.{(balance % 1).toFixed(2).substring(2)}</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-[#F3F4F6] self-start px-3 py-1.5 rounded-full border border-[#E5E7EB]">
                <div className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                <span className="text-xs font-medium text-[#374151]">Flex Balance Active</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto pb-8 flex flex-col gap-4">
               <button
                  onClick={handleAddBalanceClick}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] py-4 rounded-2xl font-medium text-lg flex items-center justify-center gap-2 hover:bg-[#F3F4F6] active:scale-[0.98] transition-all"
                >
                  <Plus size={24} />
                  Add Balance
                </button>
              <div className="flex gap-4">
                <button
                  onClick={handleScan}
                  className="flex-1 bg-[#111827] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-[#1f2937] active:scale-[0.98] transition-all"
                >
                  <Scan size={24} />
                  Tap to Pay
                </button>
                <button
                  className="w-16 h-[60px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-2xl flex items-center justify-center hover:bg-[#E5E7EB] active:scale-[0.98] transition-all"
                >
                  <QrCode size={24} className="text-[#111827]" />
                </button>
              </div>
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
            className="flex flex-col h-full bg-[#111827] relative"
          >
            <div className="absolute top-12 left-6 z-10">
              <button onClick={() => setAppState("home")} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <ArrowLeft size={20} className="text-white" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center flex-col relative overflow-hidden">
              <div className="w-64 h-64 border-2 border-white/20 rounded-3xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-3xl" />

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

        {/* PAYMENT CONFIRM STATE */}
        {appState === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full p-6 bg-white"
          >
            <div className="pt-8 pb-12 flex justify-between items-start">
               <button onClick={() => setAppState("home")} className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center">
                 <X size={20} className="text-[#374151]" />
               </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={28} className="text-[#111827]" />
              </div>
              <h2 className="text-3xl font-light tracking-tight mb-2 text-[#111827]">{merchant}</h2>
              <div className="flex items-start justify-center gap-1 mb-8 text-[#111827]">
                <span className="text-2xl text-[#6B7280] mt-1">$</span>
                <span className="text-6xl font-light tracking-tight">{Math.floor(amount)}</span>
                <span className="text-2xl text-[#6B7280] mt-1">.{(amount % 1).toFixed(2).substring(2)}</span>
              </div>

              <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 flex justify-between items-center mb-auto">
                 <span className="text-[#6B7280] text-sm">Payment Source</span>
                 <span className="text-[#111827] font-medium text-sm flex items-center gap-2">
                   Network Balance <div className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                 </span>
              </div>
            </div>

            <div className="pb-8">
              <p className="text-center text-[#9CA3AF] text-xs mb-4">Secured by global network infrastructure</p>
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-[#111827] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-[#1f2937] active:scale-[0.98] transition-all"
              >
                Confirm Payment
              </button>
            </div>
          </motion.div>
        )}

        {/* PAYMENT SUCCESS STATE - USING EXCLUSIVE BRAND BLUE */}
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

        {/* DEPOSIT INPUT STATE */}
        {appState === "deposit" && (
          <motion.div
            key="deposit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full p-6 bg-white"
          >
            <div className="pt-8 pb-8 flex justify-between items-center">
              <button
                onClick={() => setAppState("home")}
                className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
              >
                <ArrowLeft size={20} className="text-[#374151]" />
              </button>
              <h2 className="text-xl font-medium tracking-tight text-[#111827]">Add Balance</h2>
              <div className="w-10 h-10" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center mb-8">
               <span className="text-[#6B7280] text-sm font-medium mb-4">Amount to Add</span>
               <div className="flex items-start justify-center gap-1">
                <span className="text-4xl text-[#D1D5DB] mt-2">$</span>
                <span className={`text-7xl font-light tracking-tight ${depositAmount ? "text-[#111827]" : "text-[#D1D5DB]"}`}>
                  {depositAmount || "0"}
                </span>
              </div>
            </div>

            <div className="pb-8">
               <div className="grid grid-cols-3 gap-3 mb-6">
                 {[1,2,3,4,5,6,7,8,9].map(num => (
                   <button key={num} onClick={() => handleKeypadPress(num.toString())} className="h-16 text-2xl font-light rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                     {num}
                   </button>
                 ))}
                 <button className="h-16 text-2xl font-light rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                   .
                 </button>
                 <button onClick={() => handleKeypadPress('0')} className="h-16 text-2xl font-light rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                   0
                 </button>
                 <button onClick={handleBackspace} className="h-16 flex items-center justify-center rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                   <ArrowLeft size={24} className="text-[#111827]" />
                 </button>
               </div>
              <button
                onClick={handleDepositNext}
                disabled={!depositAmount || Number(depositAmount) <= 0}
                className="w-full bg-[#111827] disabled:bg-[#D1D5DB] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all active:scale-[0.98]"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* DEPOSIT CONFIRM STATE */}
        {appState === "deposit_confirm" && (
           <motion.div
           key="deposit_confirm"
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 1.05 }}
           transition={{ duration: 0.2 }}
           className="flex flex-col h-full p-6 bg-white"
         >
           <div className="pt-8 pb-12 flex justify-between items-start">
              <button onClick={() => setAppState("deposit")} className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#E5E7EB]">
                <ArrowLeft size={20} className="text-[#374151]" />
              </button>
           </div>

           <div className="flex-1 flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full flex items-center justify-center mb-6">
               <Plus size={28} className="text-[#111827]" />
             </div>
             <h2 className="text-3xl font-light tracking-tight mb-2 text-[#111827]">Add Balance</h2>
             <div className="flex items-start justify-center gap-1 mb-8 text-[#111827]">
               <span className="text-2xl text-[#6B7280] mt-1">$</span>
               <span className="text-6xl font-light tracking-tight">{depositAmount}</span>
               <span className="text-2xl text-[#6B7280] mt-1">.00</span>
             </div>

             <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 flex justify-between items-center mb-auto">
                <span className="text-[#6B7280] text-sm">Funding Source</span>
                <span className="text-[#111827] font-medium text-sm flex items-center gap-2">
                  Linked Card (••• 4242) <div className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                </span>
             </div>
           </div>

           <div className="pb-8">
             <p className="text-center text-[#9CA3AF] text-xs mb-4">Secured by global network infrastructure</p>
             <button
               onClick={handleConfirmDeposit}
               className="w-full bg-[#111827] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all active:scale-[0.98]"
             >
               Confirm Top Up
             </button>
           </div>
         </motion.div>
        )}

        {/* DEPOSIT SUCCESS STATE - USING EXCLUSIVE BRAND BLUE */}
        {appState === "deposit_success" && (
           <motion.div
           key="deposit_success"
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
             Added to Balance
           </motion.h2>
           <motion.p
             initial={{ y: 10, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="text-white/80 font-medium"
           >
             ${Number(depositAmount).toFixed(2)} is now available
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
            className="flex flex-col h-full p-6 pt-12 bg-white"
          >
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setAppState("home")}
                className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
              >
                <ArrowLeft size={20} className="text-[#374151]" />
              </button>
              <h2 className="text-xl font-medium tracking-tight text-[#111827]">Activity</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
              <div className="space-y-6">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center group-hover:bg-[#F3F4F6] transition-colors">
                        {tx.icon}
                      </div>
                      <div>
                        <p className="font-medium text-[#111827] text-base">{tx.merchant}</p>
                        <p className="text-[#6B7280] text-sm">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#111827] text-base">-${tx.amount.toFixed(2)}</p>
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
