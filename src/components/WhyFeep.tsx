"use client";

import { motion } from "framer-motion";

export default function WhyFeep() {
  const benefits = [
    { title: "For Families", desc: "No interest. No hidden fees. Just manageable monthly payments that align with income." },
    { title: "For Schools", desc: "Immediate liquidity. Zero collection risk. Improved enrollment and retention rates." },
    { title: "For Governments", desc: "Stabilized private education sector. Higher literacy retention and reduced public school strain." },
    { title: "For Education", desc: "Capital stays within the ecosystem, allowing institutions to focus on academics, not debt collection." },
    { title: "For Financial Inclusion", desc: "Building credit histories for unbanked populations through essential spending behavior." },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-feep-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Why FEEP?</h2>
          <p className="text-xl text-zinc-600 max-w-2xl">Value created across the entire socio-economic stack.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-zinc-600 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
