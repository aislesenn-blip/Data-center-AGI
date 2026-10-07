import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MapLayer({ currentStep }: { currentStep?: string }) {
  const isHome = currentStep === 'location';

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-bluepost-bg">
      <AnimatePresence>
        {isHome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-[45%] bg-bluepost-dark z-0"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-10">
        {/* Abstract map representation for the background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isHome ? 'rgba(255,255,255,0.2)' : 'var(--color-bluepost-primary)'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Abstract decorative route lines */}
        <svg className={`absolute inset-0 w-full h-full ${isHome ? 'opacity-5' : 'opacity-10'}`} xmlns="http://www.w3.org/2000/svg">
          <path d="M -100 200 Q 200 100 500 400 T 1000 300" stroke={isHome ? "#ffffff" : "var(--color-bluepost-primary)"} strokeWidth="4" fill="none" />
          <path d="M 0 500 Q 300 600 600 200 T 1200 400" stroke={isHome ? "#ffffff" : "var(--color-bluepost-primary)"} strokeWidth="2" fill="none" strokeDasharray="8 8" />
        </svg>
      </div>
    </div>
  );
}
