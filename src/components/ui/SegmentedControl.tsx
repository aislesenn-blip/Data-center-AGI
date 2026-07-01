"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface SegmentedControlProps {
  tabs: TabData[];
}

export function SegmentedControl({ tabs }: SegmentedControlProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-2 bg-gray-100 p-2 rounded-2xl mb-8">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`relative flex-1 py-3 px-6 rounded-xl text-center text-sm font-semibold transition-colors z-10 ${
                isActive ? "text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-background"
                  className="absolute inset-0 bg-[#00C800] rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="relative min-h-[400px]">
         <AnimatePresence mode="wait">
            {tabs.map((tab) =>
              tab.id === activeTabId ? (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {tab.content}
                </motion.div>
              ) : null
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}
