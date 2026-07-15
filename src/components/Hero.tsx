"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pt-24 text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Education financing <br className="hidden md:block"/> built for the future.
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          FEEP helps families pay school fees through simple, interest-free monthly plans while enabling schools to receive their full payment upfront.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="bg-feep-primary text-zinc-900 font-semibold px-8 py-4 rounded-full w-full sm:w-auto shadow-sm"
          >
            Partner With FEEP
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="bg-zinc-900 text-white font-medium px-8 py-4 rounded-full w-full sm:w-auto shadow-sm"
          >
            Talk to Us
          </motion.a>
        </div>
      </motion.div>

      {/* Abstract Background Element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-feep-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"
      />
    </section>
  );
}
