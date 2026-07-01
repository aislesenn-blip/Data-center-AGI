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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`bg-white rounded-3xl border border-gray-100 p-8 md:p-10 ${hover ? "hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 transition-all duration-500" : "shadow-md"} ${className}`}
    >
      {children}
    </motion.div>
  );
}