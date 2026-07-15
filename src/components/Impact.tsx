"use client";

import { motion } from "framer-motion";

export default function Impact() {
  const metrics = [
    { value: "50K+", label: "Families Supported" },
    { value: "400+", label: "Schools Partnered" },
    { value: "98%", label: "Student Retention Rate" },
    { value: "$25M+", label: "School Fees Enabled" },
  ];

  return (
    <section id="impact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Our Impact</h2>
          <p className="text-xl text-zinc-400 max-w-2xl">Measurable change in the education ecosystem.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-t border-zinc-800 pt-6"
            >
              <div className="text-4xl md:text-6xl font-bold text-feep-primary mb-4">{metric.value}</div>
              <div className="text-lg text-zinc-400 font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
