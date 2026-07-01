"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hover?: boolean;
}

export function AnimatedCard({ children, delay = 0, className = "", hover = true }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`bg-white rounded-2xl border border-gray-100 p-8 ${hover ? "hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300" : "shadow-sm"} ${className}`}
    >
      {children}
    </motion.div>
  );
}