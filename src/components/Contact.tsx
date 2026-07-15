"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-feep-bg">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-zinc-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Partner with FEEP</h2>
          <p className="text-xl text-zinc-500">Reach out to discuss partnerships, investment, or general inquiries.</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-feep-primary/20 text-feep-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank you.</h3>
            <p className="text-zinc-600">Our team will contact you shortly.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Full Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-feep-primary/50 transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Organization</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-feep-primary/50 transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Email</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-feep-primary/50 transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-feep-primary/50 transition-shadow" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Country</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-feep-primary/50 transition-shadow" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Purpose</label>
                <select required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-feep-primary/50 transition-shadow bg-white">
                  <option value="" disabled>Select an option</option>
                  <option value="school">School</option>
                  <option value="investor">Investor</option>
                  <option value="partner">Partner</option>
                  <option value="government">Government</option>
                  <option value="media">Media</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Message</label>
              <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-feep-primary/50 transition-shadow resize-none"></textarea>
            </div>

            <div className="pt-4 text-center">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-zinc-900 text-white font-medium px-12 py-4 rounded-full w-full md:w-auto shadow-sm hover:bg-zinc-800 transition-colors"
              >
                Send Message
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
