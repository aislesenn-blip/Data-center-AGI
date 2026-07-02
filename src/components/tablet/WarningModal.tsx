"use client"

import { motion } from "framer-motion"

interface Props {
  onContinue: () => void
  onReset: () => void
}

export function WarningModal({ onContinue, onReset }: Props) {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#171717] border border-gray-700 rounded-[3rem] p-16 max-w-2xl w-full text-center shadow-2xl"
      >
        <h2 className="text-5xl font-bold text-white mb-6">Are you still looking?</h2>
        <p className="text-2xl text-gray-400 mb-12">
          Your session will reset soon to protect your privacy.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onReset}
            className="px-12 py-6 rounded-full bg-[#262626] text-white text-2xl font-bold active:scale-95 transition-all"
          >
            End Session
          </button>
          <button
            onClick={onContinue}
            className="px-12 py-6 rounded-full bg-blue-600 text-white text-2xl font-bold active:scale-95 transition-all"
          >
            Yes, I&apos;m looking
          </button>
        </div>
      </motion.div>
    </div>
  )
}
