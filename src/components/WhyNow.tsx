"use client";

import { motion } from "framer-motion";

export default function WhyNow() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-feep-bg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Why Now?</h2>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed mb-8">
            Africa&apos;s education sector is growing rapidly, but the financial infrastructure supporting it is broken. FEEP is not just another lending platform; we are building the missing infrastructure layer for education financing.
          </p>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed">
            By digitizing payments and aligning cash flows, we unlock unprecedented growth for educational institutions while protecting the financial dignity of families.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
