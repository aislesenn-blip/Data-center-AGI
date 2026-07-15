"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Is FEEP a loan?",
      answer: "No, FEEP is not a consumer loan. We provide an interest-free payment plan for parents while paying schools their full fees upfront. We are an infrastructure partner, not a lender."
    },
    {
      question: "Do parents pay interest?",
      answer: "Parents never pay interest. They simply repay the exact term fee amount spread across manageable monthly installments."
    },
    {
      question: "How does FEEP make money?",
      answer: "Schools pay FEEP a small partnership fee for improving their fee collection, guaranteeing their cash flow, and boosting student retention."
    },
    {
      question: "Who can partner with FEEP?",
      answer: "We partner with established private and public schools, educational institutions, investors, governments, and NGOs aligned with our mission."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-zinc-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex justify-between items-center text-left bg-white hover:bg-zinc-50 transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-5 pt-2 text-zinc-600 leading-relaxed border-t border-zinc-100">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
