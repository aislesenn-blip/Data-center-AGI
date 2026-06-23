"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, History, CheckCircle2, Building2, Coffee, ShoppingBag, X, Plus, Receipt, CircleDot, Search, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type AppState = "home" | "pay_number" | "pay_amount" | "pay_review" | "pay_success" | "history" | "deposit" | "deposit_funding" | "deposit_confirm" | "deposit_success" | "receipts" | "receipt_detail"

interface Transaction {
  id: string
  merchant: string
  amount: number
  date: string
  icon: React.ReactNode
}

interface FundingSource {
  id: string;
  name: string;
  type: string;
  color: string;
}

const transactions: Transaction[] = [
  { id: "tx1", merchant: "Whole Foods Market", amount: 45.20, date: "Today, 14:23", icon: <ShoppingBag size={20} className="text-[#111827]" /> },
  { id: "tx2", merchant: "Starbucks", amount: 6.50, date: "Today, 09:12", icon: <Coffee size={20} className="text-[#111827]" /> },
  { id: "tx3", merchant: "Apple Store", amount: 129.00, date: "Yesterday", icon: <Building2 size={20} className="text-[#111827]" /> },
]

const fundingSources: FundingSource[] = [
  { id: "fs1", name: "M-Pesa", type: "Mobile Money", color: "bg-[#0A8742]" },
  { id: "fs2", name: "CRDB Bank", type: "Bank Account", color: "bg-[#006648]" },
  { id: "fs3", name: "Airtel Money", type: "Mobile Money", color: "bg-[#E3000F]" },
]

export default function PaymentNetworkApp() {
  const [appState, setAppState] = useState<AppState>("home")
  const [balance, setBalance] = useState(4250.00)

  // Payment Flow State
  const [payNumber, setPayNumber] = useState("")
  const [payAmount, setPayAmount] = useState("")
  const [payMerchantName, setPayMerchantName] = useState("")

  // Deposit Flow State
  const [depositAmount, setDepositAmount] = useState("")
  const [selectedFunding, setSelectedFunding] = useState<FundingSource>(fundingSources[0])

  // Active Receipts (Mock Data)
  const [hasActiveReceipt, setHasActiveReceipt] = useState(true)
  const receiptData = { merchant: "Apple Store", amount: 129.00, date: "Today, 09:41 AM" }

  // Timer for animated receipt pulse
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Navigation Handlers
  const goHome = () => setAppState("home")

  // --- Payment Flow Handlers ---
  const handleTapToPayClick = () => {
    setPayNumber("")
    setPayAmount("")
    setAppState("pay_number")
  }

  const handlePayNumberNext = () => {
    if (payNumber.length < 3) return;
    setPayMerchantName("Verified Merchant") // Mock resolving the name
    setAppState("pay_amount")
  }

  const handlePayAmountNext = () => {
    if (!payAmount || Number(payAmount) <= 0) return
    setAppState("pay_review")
  }

  const handleConfirmPayment = () => {
    setAppState("pay_success")
    setTimeout(() => {
      setBalance(prev => prev - Number(payAmount))
      setAppState("home")
    }, 2500)
  }

  // --- Deposit Flow Handlers ---
  const handleAddBalanceClick = () => {
    setDepositAmount("")
    setAppState("deposit")
  }

  const handleDepositAmountNext = () => {
    if (!depositAmount || Number(depositAmount) <= 0) return
    setAppState("deposit_funding")
  }

  const handleSelectFunding = (source: FundingSource) => {
    setSelectedFunding(source)
    setAppState("deposit_confirm")
  }

  const handleConfirmDeposit = () => {
    setAppState("deposit_success")
    setTimeout(() => {
      setBalance(prev => prev + Number(depositAmount))
      setAppState("home")
    }, 2500)
  }

  // --- Keypad Helpers ---
  const handlePayAmountKeypad = (val: string) => {
    if (payAmount.length > 5) return;
    setPayAmount(prev => prev + val)
  }
  const handlePayAmountBackspace = () => setPayAmount(prev => prev.slice(0, -1))

  const handleDepositKeypad = (val: string) => {
    if (depositAmount.length > 5) return;
    setDepositAmount(prev => prev + val)
  }
  const handleDepositBackspace = () => setDepositAmount(prev => prev.slice(0, -1))

  // --- Receipt Handlers ---
  const handleUseReceipt = () => {
    // Moves it out of active view instantly
    setHasActiveReceipt(false)
    goHome()
  }


  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] text-[#111827] overflow-hidden relative font-sans">
      <AnimatePresence mode="wait">

        {/* HOME STATE */}
        {appState === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full bg-white p-6 pt-12"
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
              {/* Removed Flex Balance active and dot based on feedback */}
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
                  onClick={handleTapToPayClick}
                  className="flex-1 bg-[#111827] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all active:scale-[0.98]"
                >
                  Pay
                </button>
                <button
                  onClick={() => setAppState("receipts")}
                  className="w-16 h-[60px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-2xl flex items-center justify-center hover:bg-[#E5E7EB] transition-all active:scale-[0.98] relative"
                >
                  <Receipt size={24} className="text-[#111827]" />
                  {hasActiveReceipt && (
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#0A66C2] rounded-full border-2 border-[#F3F4F6]" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PAYMENT FLOW --- */}

        {/* 1. PAY NUMBER */}
        {appState === "pay_number" && (
          <motion.div
            key="pay_number"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full bg-white p-6"
          >
            <div className="pt-8 pb-8 flex justify-between items-center">
              <button onClick={goHome} className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors">
                <ArrowLeft size={20} className="text-[#374151]" />
              </button>
              <h2 className="text-xl font-medium tracking-tight text-[#111827]">Payment</h2>
              <div className="w-10 h-10" />
            </div>

            <div className="flex-1 flex flex-col pt-8">
               <span className="text-[#6B7280] text-sm font-medium mb-4">Enter Merchant Number</span>
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={24} />
                 <input
                   type="tel"
                   value={payNumber}
                   onChange={(e) => setPayNumber(e.target.value.replace(/\D/g, ''))}
                   placeholder="000 000"
                   className="w-full h-16 pl-14 pr-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-2xl font-light tracking-wider outline-none focus:border-[#111827] transition-colors placeholder:text-[#D1D5DB]"
                   autoFocus
                 />
               </div>
            </div>

            <div className="pb-8">
              <button
                onClick={handlePayNumberNext}
                disabled={payNumber.length < 3}
                className="w-full bg-[#111827] disabled:bg-[#D1D5DB] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all active:scale-[0.98]"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* 2. PAY AMOUNT */}
        {appState === "pay_amount" && (
          <motion.div
            key="pay_amount"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full p-6 bg-white"
          >
            <div className="pt-8 pb-8 flex justify-between items-center">
              <button onClick={() => setAppState("pay_number")} className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors">
                <ArrowLeft size={20} className="text-[#374151]" />
              </button>
              <h2 className="text-xl font-medium tracking-tight text-[#111827]">Amount</h2>
              <div className="w-10 h-10" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center mb-8">
               <span className="text-[#6B7280] text-sm font-medium mb-4">To {payMerchantName}</span>
               <div className="flex items-start justify-center gap-1">
                <span className="text-4xl text-[#D1D5DB] mt-2">$</span>
                <span className={`text-7xl font-light tracking-tight ${payAmount ? "text-[#111827]" : "text-[#D1D5DB]"}`}>
                  {payAmount || "0"}
                </span>
              </div>
            </div>

            <div className="pb-8">
               <div className="grid grid-cols-3 gap-3 mb-6">
                 {[1,2,3,4,5,6,7,8,9].map(num => (
                   <button key={num} onClick={() => handlePayAmountKeypad(num.toString())} className="h-16 text-2xl font-light rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                     {num}
                   </button>
                 ))}
                 <button className="h-16 text-2xl font-light rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                   .
                 </button>
                 <button onClick={() => handlePayAmountKeypad('0')} className="h-16 text-2xl font-light rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                   0
                 </button>
                 <button onClick={handlePayAmountBackspace} className="h-16 flex items-center justify-center rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                   <ArrowLeft size={24} className="text-[#111827]" />
                 </button>
               </div>
              <button
                onClick={handlePayAmountNext}
                disabled={!payAmount || Number(payAmount) <= 0}
                className="w-full bg-[#111827] disabled:bg-[#D1D5DB] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all active:scale-[0.98]"
              >
                Review Payment
              </button>
            </div>
          </motion.div>
        )}

        {/* 3. PAY REVIEW/CONFIRM STATE */}
        {appState === "pay_review" && (
          <motion.div
            key="pay_review"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full p-6 bg-white"
          >
            <div className="pt-8 pb-12 flex justify-between items-start">
               <button onClick={() => setAppState("pay_amount")} className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center">
                 <X size={20} className="text-[#374151]" />
               </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={28} className="text-[#111827]" />
              </div>
              <h2 className="text-3xl font-light tracking-tight mb-2 text-[#111827]">{payMerchantName}</h2>
              <div className="flex items-start justify-center gap-1 mb-8 text-[#111827]">
                <span className="text-2xl text-[#6B7280] mt-1">$</span>
                <span className="text-6xl font-light tracking-tight">{payAmount}</span>
                <span className="text-2xl text-[#6B7280] mt-1">.00</span>
              </div>

              <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 flex justify-between items-center mb-auto">
                 <span className="text-[#6B7280] text-sm">Payment Source</span>
                 <span className="text-[#111827] font-medium text-sm flex items-center gap-2">
                   Network Balance <div className="w-1.5 h-1.5 rounded-full bg-[#111827]" />
                 </span>
              </div>
            </div>

            <div className="pb-8">
              <p className="text-center text-[#9CA3AF] text-xs mb-4">No transaction fees</p>
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-[#111827] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all active:scale-[0.98]"
              >
                Confirm Payment
              </button>
            </div>
          </motion.div>
        )}

        {/* 4. PAY SUCCESS STATE */}
        {appState === "pay_success" && (
          <motion.div
            key="pay_success"
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
              ${Number(payAmount).toFixed(2)} to {payMerchantName}
            </motion.p>
          </motion.div>
        )}

        {/* --- DEPOSIT FLOW --- */}

        {/* DEPOSIT AMOUNT INPUT STATE */}
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
                onClick={goHome}
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
                   <button key={num} onClick={() => handleDepositKeypad(num.toString())} className="h-16 text-2xl font-light rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                     {num}
                   </button>
                 ))}
                 <button className="h-16 text-2xl font-light rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                   .
                 </button>
                 <button onClick={() => handleDepositKeypad('0')} className="h-16 text-2xl font-light rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                   0
                 </button>
                 <button onClick={handleDepositBackspace} className="h-16 flex items-center justify-center rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] active:bg-[#E5E7EB] transition-colors">
                   <ArrowLeft size={24} className="text-[#111827]" />
                 </button>
               </div>
              <button
                onClick={handleDepositAmountNext}
                disabled={!depositAmount || Number(depositAmount) <= 0}
                className="w-full bg-[#111827] disabled:bg-[#D1D5DB] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all active:scale-[0.98]"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* DEPOSIT FUNDING SOURCE SELECTION */}
        {appState === "deposit_funding" && (
           <motion.div
           key="deposit_funding"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.2 }}
           className="flex flex-col h-full bg-[#F9FAFB] p-6"
         >
           <div className="pt-8 pb-8 flex justify-between items-center">
              <button onClick={() => setAppState("deposit")} className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F3F4F6]">
                <ArrowLeft size={20} className="text-[#374151]" />
              </button>
              <h2 className="text-xl font-medium tracking-tight text-[#111827]">Connected Accounts</h2>
              <div className="w-10 h-10" />
           </div>

           <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
             <div className="space-y-4">
               {fundingSources.map((source) => (
                 <button
                   key={source.id}
                   onClick={() => handleSelectFunding(source)}
                   className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-4 flex items-center justify-between group active:scale-[0.98] transition-all"
                 >
                   <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${source.color} text-white font-bold text-xl`}>
                        {source.name.charAt(0)}
                     </div>
                     <div className="text-left">
                       <p className="font-medium text-[#111827] text-base">{source.name}</p>
                       <p className="text-[#6B7280] text-sm">{source.type}</p>
                     </div>
                   </div>
                 </button>
               ))}

               <button className="w-full border-2 border-dashed border-[#D1D5DB] rounded-2xl p-4 flex items-center justify-center gap-3 mt-4 hover:border-[#9CA3AF] hover:bg-white active:scale-[0.98] transition-all">
                 <Plus size={20} className="text-[#6B7280]" />
                 <span className="font-medium text-[#6B7280]">Add Account</span>
               </button>
             </div>
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
              <button onClick={() => setAppState("deposit_funding")} className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#E5E7EB]">
                <ArrowLeft size={20} className="text-[#374151]" />
              </button>
           </div>

           <div className="flex-1 flex flex-col justify-center items-center text-center">
             <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${selectedFunding.color} text-white font-bold text-2xl`}>
               {selectedFunding.name.charAt(0)}
             </div>
             <h2 className="text-3xl font-light tracking-tight mb-2 text-[#111827]">Add Balance</h2>
             <div className="flex items-start justify-center gap-1 mb-8 text-[#111827]">
               <span className="text-2xl text-[#6B7280] mt-1">$</span>
               <span className="text-6xl font-light tracking-tight">{depositAmount}</span>
               <span className="text-2xl text-[#6B7280] mt-1">.00</span>
             </div>

             <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 flex justify-between items-center mb-auto">
                <span className="text-[#6B7280] text-sm">From</span>
                <span className="text-[#111827] font-medium text-sm flex items-center gap-2">
                  {selectedFunding.name} <div className={`w-1.5 h-1.5 rounded-full ${selectedFunding.color}`} />
                </span>
             </div>
           </div>

           <div className="pb-8">
             <p className="text-center text-[#9CA3AF] text-xs mb-4">Fast payments, no hidden fees</p>
             <button
               onClick={handleConfirmDeposit}
               className="w-full bg-[#111827] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all active:scale-[0.98]"
             >
               Confirm Top Up
             </button>
           </div>
         </motion.div>
        )}

        {/* DEPOSIT SUCCESS STATE */}
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

        {/* --- RECEIPTS FLOW --- */}

        {/* RECEIPTS LIST */}
        {appState === "receipts" && (
          <motion.div
            key="receipts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full bg-[#F9FAFB] p-6 pt-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={goHome}
                className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F3F4F6] transition-colors"
              >
                <ArrowLeft size={20} className="text-[#374151]" />
              </button>
              <h2 className="text-xl font-medium tracking-tight text-[#111827]">Active Receipts</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
              {hasActiveReceipt ? (
                <button
                  onClick={() => setAppState("receipt_detail")}
                  className="w-full relative overflow-hidden bg-white border border-[#E5E7EB] rounded-[1.5rem] p-5 text-left active:scale-[0.98] transition-transform shadow-sm"
                >
                   {/* Animated pulse background to indicate "Active" */}
                   <motion.div
                     animate={{ opacity: [0.1, 0.3, 0.1] }}
                     transition={{ duration: 3, repeat: Infinity }}
                     className="absolute -top-10 -right-10 w-32 h-32 bg-[#0A66C2] rounded-full blur-3xl"
                   />

                   <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center">
                         <Building2 size={24} className="text-[#111827]" />
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F0FDF4] rounded-full border border-[#BBF7D0]">
                        <CircleDot size={12} className="text-[#16A34A] animate-pulse" />
                        <span className="text-xs font-semibold text-[#16A34A] uppercase tracking-wide">Ready</span>
                      </div>
                   </div>

                   <div className="relative z-10">
                     <p className="text-[#6B7280] text-sm mb-1">{receiptData.date}</p>
                     <h3 className="text-xl font-medium text-[#111827] mb-4">{receiptData.merchant}</h3>
                     <div className="border-t border-dashed border-[#E5E7EB] pt-4">
                        <p className="text-2xl font-light tracking-tight text-[#111827]">${receiptData.amount.toFixed(2)}</p>
                     </div>
                   </div>
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                   <div className="w-20 h-20 bg-white border border-[#E5E7EB] rounded-full flex items-center justify-center mb-6 shadow-sm">
                     <Receipt size={32} className="text-[#D1D5DB]" />
                   </div>
                   <h3 className="text-xl font-medium text-[#111827] mb-2">No active receipts</h3>
                   <p className="text-[#6B7280] max-w-[240px]">Your next digital payment pass will appear here.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* DYNAMIC RECEIPT DETAIL (DIGITAL PASS) */}
        {appState === "receipt_detail" && (
           <motion.div
           key="receipt_detail"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 20 }}
           transition={{ duration: 0.3, ease: "easeOut" }}
           className="flex flex-col h-full bg-[#111827] p-4 relative"
         >
           <div className="pt-8 pb-4 flex justify-between items-center text-white px-2">
              <button onClick={() => setAppState("receipts")} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                <X size={20} />
              </button>
              <span className="font-medium text-white/50 text-sm uppercase tracking-widest">Digital Pass</span>
              <div className="w-10" />
           </div>

           <div className="flex-1 flex flex-col items-center mt-4">
              {/* Receipt Ticket UI */}
              <div className="w-full bg-white rounded-[2rem] overflow-hidden shadow-2xl relative">
                {/* Security Pattern Background */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                <div className="p-8 relative z-10 flex flex-col items-center border-b-2 border-dashed border-[#E5E7EB]">
                   <ShieldCheck size={40} className="text-[#0A66C2] mb-4" />
                   <h2 className="text-3xl font-light text-[#111827] mb-1">{receiptData.merchant}</h2>
                   <p className="text-[#6B7280] mb-6 text-sm">{receiptData.date}</p>
                   <div className="flex items-start justify-center gap-1">
                     <span className="text-3xl text-[#6B7280] mt-1">$</span>
                     <span className="text-6xl font-light tracking-tight text-[#111827]">{receiptData.amount.toFixed(2)}</span>
                   </div>
                </div>

                {/* Fraud-resistant dynamic footer */}
                <div className="p-8 relative z-10 bg-[#F9FAFB] flex flex-col items-center">
                   <motion.div
                     animate={{ rotate: 360 }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                     className="w-16 h-16 rounded-full border-4 border-[#E5E7EB] border-t-[#0A66C2] mb-4"
                   />
                   <p className="text-xs font-mono text-[#6B7280] tracking-widest uppercase mb-1">
                     {time.toLocaleTimeString()}
                   </p>
                   <p className="text-sm font-semibold text-[#16A34A] flex items-center gap-1">
                     <CircleDot size={14} className="animate-pulse" /> Valid & Verified
                   </p>
                </div>

                {/* Cutout notches */}
                <div className="absolute left-0 top-[60%] w-6 h-12 bg-[#111827] rounded-r-full -translate-y-1/2" />
                <div className="absolute right-0 top-[60%] w-6 h-12 bg-[#111827] rounded-l-full -translate-y-1/2" />
              </div>

              <button
                onClick={handleUseReceipt}
                className="mt-auto mb-4 w-full bg-white text-[#111827] py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all active:scale-[0.98]"
              >
                Mark as Used
              </button>
           </div>
         </motion.div>
        )}

        {/* --- HISTORY STATE --- */}
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
                onClick={goHome}
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
