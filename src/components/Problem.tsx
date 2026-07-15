"use client";

import { motion } from "framer-motion";

export default function Problem() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">The systemic disconnect in <br className="hidden md:block"/> education financing.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Families struggle with lump sums</h3>
            <p className="text-zinc-600 text-lg leading-relaxed">
              Education is the highest priority for families, but paying large term fees upfront creates immense cash-flow strain. Income is monthly, but school fees are not.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Schools suffer from late payments</h3>
            <p className="text-zinc-600 text-lg leading-relaxed">
              When parents pay late or in unpredictable installments, schools cannot pay teachers on time, improve infrastructure, or invest in educational quality. Growth stagnates.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
