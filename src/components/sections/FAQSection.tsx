"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { FAQS } from "@/lib/constants";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
      <FadeIn>
        <h2 className="text-3xl font-bold tracking-tight mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-black/5 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left font-semibold text-lg flex justify-between items-center p-6 outline-none"
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-feep-primary text-2xl leading-none shrink-0 ml-4"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-6 pt-2 text-feep-text-muted leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}