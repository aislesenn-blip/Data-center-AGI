"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NumericKeypad } from "./NumericKeypad"
import { CheckCircle2, ChevronRight, Store, ArrowLeft } from "lucide-react"

type FlowState = "keypad" | "merchant_details" | "payment_methods" | "processing" | "receipt"

interface Merchant {
  id: string
  name: string
  discount: number
  category: string
}

// Mock Merchant
const MOCK_MERCHANT: Merchant = {
  id: "24901",
  name: "Brew Culture Coffee",
  discount: 15, // 15% off
  category: "Coffee"
}

export function PaymentFlow() {
  const [step, setStep] = useState<FlowState>("keypad")
  const [merchantCode, setMerchantCode] = useState("")
  const [billAmount, setBillAmount] = useState<string>("")
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState<string | null>(null)

  const handleKeypadSubmit = (code: string) => {
    setMerchantCode(code)
  }

  const handleConfirmAmount = () => {
    if (parseFloat(billAmount) > 0) {
      setStep("payment_methods")
    }
  }

  const handleProcessPayment = (provider: string) => {
    setSelectedPaymentProvider(provider)
    setStep("processing")

    // Simulate API call for STK push / processing
    setTimeout(() => {
      setStep("receipt")
    }, 2500)
  }

  const resetFlow = () => {
    setStep("keypad")
    setMerchantCode("")
    setBillAmount("")
    setSelectedPaymentProvider(null)
  }

  const calculateDiscountedAmount = () => {
    const amount = parseFloat(billAmount) || 0
    const discount = MOCK_MERCHANT.discount / 100
    const final = amount - (amount * discount)
    return {
      original: amount,
      saved: amount * discount,
      final: final
    }
  }

  const amounts = calculateDiscountedAmount()

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden bg-white">

      {/* Contextual Sub-Header (Back button if needed) */}
      {step !== "keypad" && step !== "processing" && step !== "receipt" && (
        <div className="absolute top-4 left-4 z-10">
          <button onClick={() => setStep(step === "payment_methods" ? "merchant_details" : "keypad")} className="p-3 bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm rounded-full text-slate-600 hover:text-slate-900 transition-colors active:scale-95">
             <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden relative pt-2">
        <AnimatePresence mode="wait">
          {step === "keypad" && (
            <motion.div
              key="keypad"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 flex flex-col pt-12 pb-6"
            >
              <div className="px-8 text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-3">Pay a merchant</h1>
                <p className="text-slate-500 font-medium">Enter the 5 digit code displayed at the store.</p>
              </div>

              {/* Code Display */}
              <div className="flex gap-4 mb-12 h-16 items-center justify-center">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-12 h-16 rounded-2xl border-0 flex items-center justify-center text-4xl font-black transition-all duration-200
                      ${i < merchantCode.length ? 'text-slate-900 bg-slate-100 shadow-inner' : 'bg-slate-50 text-transparent'}
                      ${i === merchantCode.length ? 'shadow-md shadow-blue-500/20 ring-2 ring-blue-500' : ''}
                    `}
                  >
                    {merchantCode[i] || ""}
                  </div>
                ))}
              </div>

              <div className="flex-1 flex flex-col justify-end pb-8">
                <div className="px-6 h-[60px] flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    {merchantCode.length === 5 && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        onClick={() => setStep("merchant_details")}
                        className="w-full bg-slate-900 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 rounded-full shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 max-w-sm mx-auto"
                      >
                        Continue
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <NumericKeypad value={merchantCode} onChange={handleKeypadSubmit} />
            </motion.div>
          )}

          {step === "merchant_details" && (
            <motion.div
              key="merchant_details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 flex flex-col p-6 pb-2"
            >
              {/* Merchant Card */}
              <div className="bg-slate-50 rounded-[2rem] p-4 sm:p-6 mb-4 sm:mb-8 border border-slate-100 flex items-center gap-4 shadow-sm shrink-0 mt-12 sm:mt-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-blue-600 shrink-0">
                  <Store className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">{MOCK_MERCHANT.name}</h2>
                  <p className="text-sm sm:text-base text-slate-500 font-medium">{MOCK_MERCHANT.category} &middot; ID: {merchantCode}</p>
                </div>
              </div>

              {/* Amount Display (No system keyboard needed) */}
              <div className="flex-1 flex flex-col justify-center items-center shrink-0 min-h-[100px]">
                <div className="text-center">
                  <label className="block text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Total Bill Amount</label>
                  <div className="flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl text-slate-400 font-medium mr-1">$</span>
                    <span className={`text-5xl sm:text-6xl font-extrabold ${billAmount ? 'text-slate-900' : 'text-slate-300'}`}>
                      {billAmount || "0"}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA strictly above the keypad */}
              <div className="shrink-0 mb-4 h-[60px] flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  {parseFloat(billAmount) > 0 ? (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      onClick={handleConfirmAmount}
                      className="w-full bg-slate-900 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 rounded-full shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Pay ${amounts.final.toFixed(2)}</span>
                      <span className="bg-white/20 text-white px-2 py-0.5 rounded text-sm font-bold ml-2">Save ${amounts.saved.toFixed(2)}</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-slate-400 text-sm font-medium"
                    >
                      Enter amount to continue
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Keypad locked to bottom */}
              <div className="shrink-0 pt-2 border-t border-slate-50">
                 <NumericKeypad value={billAmount} onChange={setBillAmount} isAmountMode={true} />
              </div>
            </motion.div>
          )}

          {step === "payment_methods" && (
            <motion.div
              key="payment_methods"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 flex flex-col p-6"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-2 px-2">How would you like to pay?</h2>
              <p className="text-slate-500 font-medium mb-8 px-2">Total: ${amounts.final.toFixed(2)} to {MOCK_MERCHANT.name}</p>

              <div className="space-y-4">
                {["M-Pesa", "Airtel Money", "Bank Card ending in 4242"].map((provider) => (
                  <button
                    key={provider}
                    onClick={() => handleProcessPayment(provider)}
                    className="w-full flex items-center justify-between bg-white border border-slate-200 p-6 rounded-[2rem] hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.98] transition-all group"
                  >
                    <span className="text-xl font-bold text-slate-800">{provider}</span>
                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-500" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white"
            >
              <div className="w-24 h-24 mb-8 relative flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-blue-600"
                />
                <Store className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Processing Payment</h2>
              <p className="text-slate-500 font-medium text-center">Contacting {selectedPaymentProvider}...</p>
            </motion.div>
          )}

          {step === "receipt" && (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 flex flex-col p-6 pt-12"
            >
              <div className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100"
                >
                  <CheckCircle2 className="w-12 h-12" />
                </motion.div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Payment Sent</h2>
                <p className="text-slate-500 text-lg font-medium mb-12">to {MOCK_MERCHANT.name}</p>

                <div className="w-full bg-slate-50 rounded-[2rem] p-8 border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-slate-500 font-medium">Total Paid</span>
                    <span className="text-4xl font-black text-slate-900">${amounts.final.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-t border-slate-200">
                    <span className="text-slate-500 font-medium">Original Bill</span>
                    <span className="text-lg font-bold text-slate-700">${amounts.original.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <span className="text-green-600 font-bold">You Saved</span>
                    <span className="text-lg font-bold text-green-600">${amounts.saved.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <button
                  onClick={resetFlow}
                  className="w-full bg-slate-100 text-slate-900 font-bold text-xl py-6 rounded-[2rem] active:scale-[0.98] hover:bg-slate-200 transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
