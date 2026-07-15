"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full py-6 px-6 md:px-12 lg:px-24 flex justify-between items-center absolute top-0 left-0 right-0 z-50"
    >
      <div className="text-2xl font-bold tracking-tighter">FEEP</div>
      <div className="flex gap-4 md:gap-8 items-center text-sm font-medium">
        <a href="#about" className="hidden md:block hover:opacity-70 transition-opacity">Model</a>
        <a href="#impact" className="hidden md:block hover:opacity-70 transition-opacity">Impact</a>
        <a href="#investors" className="hidden md:block hover:opacity-70 transition-opacity">Investors</a>
        <a href="#contact" className="bg-zinc-900 text-white px-5 py-2.5 rounded-full hover:bg-zinc-800 transition-colors">
          Talk to Us
        </a>
      </div>
    </motion.nav>
  );
}
