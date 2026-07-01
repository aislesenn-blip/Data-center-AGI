"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextRotatorProps {
  phrases: string[];
  interval?: number;
}

export function TextRotator({ phrases, interval = 3000 }: TextRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <span className="relative inline-flex flex-col overflow-hidden align-bottom" style={{ height: '1.2em' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
          className="absolute inset-0 flex items-end pb-1"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
      <span className="invisible pointer-events-none pb-1">{phrases[0]}</span>
    </span>
  );
}
