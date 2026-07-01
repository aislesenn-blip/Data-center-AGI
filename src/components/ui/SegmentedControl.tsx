"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SegmentedControlProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

export function SegmentedControl({ tabs, activeTab, setActiveTab, className = "" }: SegmentedControlProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 p-1.5 sm:p-2 bg-gray-100 rounded-2xl w-full ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 py-3 sm:py-4 px-6 rounded-xl text-sm sm:text-base font-bold transition-colors focus:outline-none min-h-[48px] touch-manipulation ${
              isActive ? "text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[#2563EB] rounded-xl shadow-md"
                transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}

interface SegmentContentProps {
  children: ReactNode;
  active: boolean;
}

export function SegmentContent({ children, active }: SegmentContentProps) {
  if (!active) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
