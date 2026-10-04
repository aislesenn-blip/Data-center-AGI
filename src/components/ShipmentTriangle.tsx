import React from 'react';
import { motion } from 'framer-motion';

interface ShipmentTriangleProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
};

export default function ShipmentTriangle({ size = 'md', animated = false, className = '' }: ShipmentTriangleProps) {
  const triangleContent = (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/*
        The visual language: a minimal, slightly playful, functional triangular representation
        of a package, inspired by the brief but distinct to BluePost.
      */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Base Triangle */}
        <polygon
          points="50,10 90,85 10,85"
          fill="var(--color-bluepost-primary)"
          stroke="white"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Inner geometric details to make it look like a folded package/box */}
        <polygon
          points="50,10 90,85 50,70"
          fill="var(--color-bluepost-primary-hover)"
        />
        <circle cx="50" cy="55" r="6" fill="white" className="opacity-90" />
      </svg>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        {triangleContent}
      </motion.div>
    );
  }

  return triangleContent;
}
