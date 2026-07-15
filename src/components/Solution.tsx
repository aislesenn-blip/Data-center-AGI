"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Solution() {
  const steps = [
    { title: "School receives payment upfront", active: true },
    { title: "Child stays in school", active: false },
    { title: "Parents repay monthly", active: false },
    { title: "Zero interest", active: false },
    { title: "Schools improve cash flow", active: true },
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-zinc-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">The FEEP Model</h2>
          <p className="text-xl text-zinc-400 mb-20 max-w-2xl mx-auto">
            A frictionless ecosystem where schools get paid immediately, and parents pay flexibly. Everyone wins.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center w-full"
            >
              <div className={`px-8 py-6 rounded-2xl w-full md:w-2/3 border ${step.active ? 'border-feep-primary bg-feep-primary/10 text-feep-primary' : 'border-zinc-800 bg-zinc-800/50 text-zinc-300'} backdrop-blur-sm transition-colors duration-500`}>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight">{step.title}</h3>
              </div>

              {index < steps.length - 1 && (
                <div className="my-4 text-zinc-600">
                  <ArrowDown className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
