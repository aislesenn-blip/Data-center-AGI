"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, PieChart, ShieldCheck, Globe, Zap } from "lucide-react";

export default function Investors() {
  const highlights = [
    { icon: <TrendingUp className="w-6 h-6" />, title: "Recurring Revenue", desc: "Predictable, compounding revenue streams through long-term school partnerships." },
    { icon: <Users className="w-6 h-6" />, title: "Scalable Marketplace", desc: "A two-sided ecosystem connecting schools with institutional capital." },
    { icon: <PieChart className="w-6 h-6" />, title: "Strong Unit Economics", desc: "Low customer acquisition cost driven by B2B2C distribution models." },
    { icon: <Globe className="w-6 h-6" />, title: "Massive Opportunity", desc: "Addressing a multi-billion dollar financing gap in African private education." },
    { icon: <Zap className="w-6 h-6" />, title: "Tech-Enabled", desc: "Automated underwriting, payment processing, and risk assessment." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Defensible Moat", desc: "Deep integrations with school management systems and payment networks." },
  ];

  return (
    <section id="investors" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">For Investors</h2>
            <p className="text-xl text-zinc-600 max-w-2xl">Building the financial layer for African education.</p>
          </div>
          <a href="#contact" className="text-feep-primary font-semibold hover:text-zinc-900 transition-colors flex items-center gap-2">
            Request Deck &rarr;
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100"
            >
              <div className="w-12 h-12 rounded-xl bg-feep-bg text-feep-primary flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
