"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const timeline = [
    { time: "Day 1", event: "School partners with FEEP." },
    { time: "Day 5", event: "Parents select their payment plan." },
    { time: "Day 7", event: "FEEP settles 100% of the tuition with the school." },
    { time: "Ongoing", event: "Parents pay zero-interest monthly installments." }
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white border-t border-zinc-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How It Works</h2>
        </motion.div>

        <div className="relative border-l border-zinc-200 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-feep-primary border-4 border-white shadow-sm" />
              <h3 className="text-lg font-medium text-zinc-500 mb-2">{item.time}</h3>
              <p className="text-2xl md:text-3xl font-semibold tracking-tight">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
