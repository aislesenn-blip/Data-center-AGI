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
    // In reality, this checks the code against an API
    if (code.length >= 4) {
      setMerchantCode(code)
      setStep("merchant_details")
    }
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
    <div className="flex flex-col h-full w-full max-w-md mx-auto relative overflow-hidden bg-white shadow-2xl rounded-3xl border border-slate-100">

      {/* Premium Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-50 shrink-0">
        {step !== "keypad" && step !== "processing" && step !== "receipt" ? (
          <button onClick={() => setStep(step === "payment_methods" ? "merchant_details" : "keypad")} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
             <ArrowLeft className="w-6 h-6" />
          </button>
        ) : <div className="w-10" />} {/* Spacer */}
        <div className="font-extrabold text-xl tracking-tight">
          <span className="text-blue-600">Pay</span>
          <span className="text-slate-900">Friday</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <AnimatePresence mode="wait">
          {step === "keypad" && (
            <motion.div
              key="keypad"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 flex flex-col pt-12"
            >
              <div className="px-8 text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-3">Pay a merchant</h1>
                <p className="text-slate-500 font-medium">Enter the 4 to 6 digit code displayed at the store.</p>
              </div>
              <NumericKeypad onSubmit={handleKeypadSubmit} />
            </motion.div>
          )}

          {step === "merchant_details" && (
            <motion.div
              key="merchant_details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 flex flex-col p-6"
            >
              {/* Merchant Card */}
              <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 border border-slate-100 flex items-center gap-4 shadow-sm">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md text-blue-600 shrink-0">
                  <Store className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">{MOCK_MERCHANT.name}</h2>
                  <p className="text-slate-500 font-medium">{MOCK_MERCHANT.category} &middot; ID: {merchantCode}</p>
                </div>
              </div>

              {/* Amount Entry */}
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Total Bill Amount</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl text-slate-400 font-medium">$</span>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="0.00"
                    autoFocus
                    className="w-full text-5xl font-bold text-slate-900 bg-white border-2 border-slate-200 rounded-[2rem] py-8 pl-16 pr-6 outline-none focus:border-blue-500 focus:shadow-xl focus:shadow-blue-500/10 transition-all placeholder:text-slate-200"
                  />
                </div>
              </div>

              {/* Discount Summary & CTA */}
              <div className="mt-auto">
                <AnimatePresence>
                  {parseFloat(billAmount) > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 mb-6 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-blue-600 font-bold mb-1">PayFriday Discount ({MOCK_MERCHANT.discount}%)</p>
                        <p className="text-2xl font-extrabold text-slate-900">
                           ${amounts.final.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 text-sm font-medium mb-1 line-through">${amounts.original.toFixed(2)}</p>
                        <p className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full text-sm inline-block">Save ${amounts.saved.toFixed(2)}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  disabled={!parseFloat(billAmount)}
                  onClick={handleConfirmAmount}
                  className="w-full bg-slate-900 text-white font-bold text-xl py-6 rounded-[2rem] shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
                >
                  Choose Payment Method
                </button>
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
