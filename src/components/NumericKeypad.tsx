"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Delete } from "lucide-react"

interface Props {
  onSubmit: (code: string) => void
}

export function NumericKeypad({ onSubmit }: Props) {
  const [code, setCode] = useState("")

  const handlePress = (num: string) => {
    if (code.length < 6) {
      const newCode = code + num
      setCode(newCode)
      if (newCode.length === 5) { // Assuming 5 digit codes for this demo
        onSubmit(newCode)
      }
    }
  }

  const handleDelete = () => {
    setCode(prev => prev.slice(0, -1))
  }

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [null, "0", "del"]
  ]

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto px-6">

      {/* Code Display */}
      <div className="flex gap-4 mb-12 h-16 items-center justify-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-12 h-16 rounded-2xl border-2 flex items-center justify-center text-4xl font-black transition-all duration-200
              ${i < code.length ? 'border-slate-900 text-slate-900 bg-slate-50' : 'border-slate-200 bg-white text-transparent'}
              ${i === code.length ? 'border-blue-500 shadow-lg shadow-blue-500/20' : ''}
            `}
          >
            {code[i] || ""}
          </div>
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 w-full">
        {keys.flat().map((key, index) => {
          if (key === null) return <div key={`empty-${index}`} />

          if (key === "del") {
            return (
              <motion.button
                key="del"
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="h-20 flex items-center justify-center text-slate-400 active:text-slate-900 transition-colors"
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
              className="h-20 rounded-full flex items-center justify-center text-4xl font-bold text-slate-900 transition-colors"
            >
              {key}
            </motion.button>
          )
        })}
      </div>

    </div>
  )
}
