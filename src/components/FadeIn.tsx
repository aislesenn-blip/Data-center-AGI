"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  y?: number;
}

export default function FadeIn({ children, delay = 0, className = "", duration = 0.8, y = 30 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Signature fluid spring-like cubic-bezier for premium deceleration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
