"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How secure is the system?",
      answer: "DebitBeans uses secure, closed-loop transaction routing. Funds move directly to the school's account through established payment infrastructure, and every transaction is digitally logged for full accountability.",
    },
    {
      question: "What happens if a card is lost?",
      answer: "Parents or school administrators can instantly freeze a lost student card via the platform. If unauthorized transactions occur, CCTV reconciliation at payment points aids in investigations.",
    },
    {
      question: "How are funds transferred?",
      answer: "Parents deposit funds digitally. DebitBeans acts as the technology provider routing these transactions, ensuring the money goes directly into the designated school accounts.",
    },
  ];

  return (
    <section className="relative px-6 py-16 max-w-md mx-auto">
      {/* Soft gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(circle,var(--color-icy-blue)_0%,transparent_70%)] -z-10 pointer-events-none opacity-80" />

      <div className="flex flex-col gap-2 mb-8">
        <h2 className="font-serif text-3xl text-text-primary">Questions</h2>
        <p className="font-sans text-text-secondary">
          Common queries about the DebitBeans platform.
        </p>
      </div>

      <div className="bg-light-gray rounded-2xl overflow-hidden">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border-b border-gray-200 last:border-b-0`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-sans font-bold text-db-blue pr-4">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-db-blue flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-db-blue flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0">
                  <p className="font-sans text-text-secondary text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
