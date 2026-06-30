"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white p-4">
      <div className="max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Redefining Digital Out-of-Home.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            We are building Africa&apos;s next iconic DOOH advertising company.
            A premium, data-driven, programmatic network designed for global brands.
          </p>

          <div className="inline-block border border-white/10 rounded-full px-6 py-2 text-sm font-medium tracking-wide uppercase text-gray-300 bg-white/5 backdrop-blur-sm">
            Coming Soon
          </div>
        </motion.div>
      </div>
    </div>
  );
}
