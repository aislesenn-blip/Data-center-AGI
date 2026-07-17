"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

export default function ContactSection() {
  const [contactFormState, setContactFormState] = useState<"idle" | "loading" | "success">("idle");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormState("loading");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setContactFormState("success");
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white px-6 md:px-12 border-t border-black/5">
      <FadeIn className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Become a partner.</h2>
          <p className="text-lg text-feep-text-muted">Request an integration for your organization or explore a strategic partnership. Leave your details below and our team will be in touch.</p>
        </div>

        {contactFormState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-feep-bg rounded-3xl p-12 text-center border border-feep-primary/20 flex flex-col items-center max-w-lg mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-feep-primary/20 flex items-center justify-center text-feep-primary mb-6">
              <CheckCircle2 size={40} aria-hidden="true" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Request Sent</h3>
            <p className="text-lg text-feep-text-muted">Thank you for your interest in FEEP. Our partnership team will review your request and get back to you shortly.</p>
          </motion.div>
        ) : (
          <form className="space-y-6" onSubmit={handleContactSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contactFullName" className="text-sm font-medium">Full Name</label>
                <input id="contactFullName" required disabled={contactFormState === "loading"} type="text" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactOrg" className="text-sm font-medium">Organization</label>
                <input id="contactOrg" required disabled={contactFormState === "loading"} type="text" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="text-sm font-medium">Work Email</label>
                <input id="contactEmail" required disabled={contactFormState === "loading"} type="email" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactPhone" className="text-sm font-medium">Phone Number</label>
                <input id="contactPhone" disabled={contactFormState === "loading"} type="tel" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contactCountry" className="text-sm font-medium">Country</label>
                <input id="contactCountry" required disabled={contactFormState === "loading"} type="text" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all disabled:opacity-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactPurpose" className="text-sm font-medium">Purpose</label>
                <select id="contactPurpose" required disabled={contactFormState === "loading"} defaultValue="" className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all appearance-none cursor-pointer disabled:opacity-50">
                  <option value="" disabled>Select an option...</option>
                  <option value="provider_education">Service Provider (Education)</option>
                  <option value="provider_housing">Service Provider (Housing)</option>
                  <option value="provider_healthcare">Service Provider (Healthcare)</option>
                  <option value="provider_utilities">Service Provider (Utilities)</option>
                  <option value="investor">Investor</option>
                  <option value="partner">Strategic Partner</option>
                  <option value="government">Government / NGO</option>
                  <option value="media">Media</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contactMessage" className="text-sm font-medium">Message</label>
              <textarea id="contactMessage" required disabled={contactFormState === "loading"} rows={4} className="w-full bg-feep-bg px-4 py-3 rounded-xl border border-transparent focus:border-feep-primary focus:bg-white outline-none transition-all resize-none disabled:opacity-50"></textarea>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={contactFormState === "loading"}
              className="bg-feep-primary text-black w-full py-4 rounded-xl font-bold text-lg hover:bg-[#65cc00] transition-colors disabled:opacity-70 flex items-center justify-center h-[60px]"
            >
              {contactFormState === "loading" ? (
                <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin" aria-label="Loading"></div>
              ) : (
                "Submit Request"
              )}
            </motion.button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}