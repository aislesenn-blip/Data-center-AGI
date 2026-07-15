"use client";

import { motion } from "framer-motion";

export default function Vision() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-white flex justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          A future where <span className="text-feep-primary">no child misses school</span> because of fee timing.
        </h2>
      </motion.div>
    </section>
  );
}
