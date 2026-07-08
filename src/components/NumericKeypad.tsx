"use client";

import { motion } from "framer-motion";
import { Delete } from "lucide-react";

interface NumericKeypadProps {
  onPress: (val: string) => void;
  onDelete: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
}

export function NumericKeypad({ onPress, onDelete }: NumericKeypadProps) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0"];

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {keys.map((key) => (
        <motion.button
          key={key}
          whileTap={{ scale: 0.9, backgroundColor: "#e2e8f0" }}
          onClick={() => onPress(key)}
          className="flex h-16 items-center justify-center rounded-2xl bg-slate-50 text-2xl font-semibold text-slate-900 shadow-sm"
        >
          {key}
        </motion.button>
      ))}
      <motion.button
        whileTap={{ scale: 0.9, backgroundColor: "#e2e8f0" }}
        onClick={onDelete}
        className="flex h-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-900 shadow-sm"
      >
        <Delete className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
