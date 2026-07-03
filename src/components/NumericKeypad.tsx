"use client"

import { motion } from "framer-motion"
import { Delete } from "lucide-react"

interface Props {
  value: string
  onChange: (value: string) => void
  isAmountMode?: boolean
}

export function NumericKeypad({ value, onChange, isAmountMode = false }: Props) {
  const handlePress = (num: string) => {
    // If it's the 5 digit merchant code mode
    if (!isAmountMode) {
      if (value.length < 5) {
        onChange(value + num)
      }
      return
    }

    // If it's amount mode (handle decimals implicitly if needed, but keeping it simple for now)
    // Prevents starting with 0 unless it's a decimal, but let's just do standard string append
    if (value.length < 8) {
      onChange(value === "0" ? num : value + num)
    }
  }

  const handleDelete = () => {
    onChange(value.slice(0, -1))
  }

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [isAmountMode ? "00" : null, "0", "del"]
  ]

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto px-6">

      {/* Code Display (Only show if NOT amount mode, as Amount Mode uses its own display in PaymentFlow) */}
      {!isAmountMode && (
        <div className="flex gap-4 mb-12 h-16 items-center justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-12 h-16 rounded-2xl border-0 flex items-center justify-center text-4xl font-black transition-all duration-200
                ${i < value.length ? 'text-slate-900 bg-slate-100 shadow-inner' : 'bg-slate-50 text-transparent'}
                ${i === value.length ? 'shadow-md shadow-blue-500/20 ring-2 ring-blue-500' : ''}
              `}
            >
              {value[i] || ""}
            </div>
          ))}
        </div>
      )}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-4 sm:gap-y-6 w-full">
        {keys.flat().map((key, index) => {
          if (key === null) return <div key={`empty-${index}`} />

          if (key === "del") {
            return (
              <motion.button
                key="del"
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="h-16 sm:h-20 flex items-center justify-center text-slate-400 active:text-slate-900 transition-colors"
              >
                <Delete className="w-8 h-8" />
              </motion.button>
            )
          }

          return (
            <motion.button
              key={key}
              whileTap={{ scale: 0.9, backgroundColor: "#f1f5f9" }}
              onClick={() => handlePress(key as string)}
              className="h-16 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold text-slate-900 transition-colors active:bg-slate-100"
            >
              {key}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
