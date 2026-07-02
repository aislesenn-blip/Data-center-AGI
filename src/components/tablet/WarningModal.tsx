"use client"

import { motion } from "framer-motion"

interface Props {
  onContinue: () => void
  onReset: () => void
}

export function WarningModal({ onContinue, onReset }: Props) {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white border-2 border-slate-200 rounded-[3rem] p-16 max-w-2xl w-full text-center shadow-2xl"
      >
        <h2 className="text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Are you still looking?</h2>
        <p className="text-3xl text-slate-500 font-medium mb-12 leading-relaxed">
          Your session will reset soon to protect your privacy.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onReset}
            className="px-12 py-6 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-2xl font-bold active:scale-95 transition-all"
          >
            End Session
          </button>
          <button
            onClick={onContinue}
            className="px-12 py-6 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 text-2xl font-bold active:scale-95 transition-all"
          >
            Yes, I&apos;m looking
          </button>
        </div>
      </motion.div>
    </div>
  )
}
