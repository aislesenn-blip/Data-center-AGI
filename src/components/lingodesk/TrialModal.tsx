"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Award } from "lucide-react";

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLevelId?: string;
}

export default function TrialModal({ isOpen, onClose, defaultLevelId = "A1" }: TrialModalProps) {
  const [selectedLevel, setSelectedLevel] = useState(defaultLevelId);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#001f3f] border border-[#003366] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative text-white">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-[#001730] text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#00d26a]/20 text-[#00d26a] flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">
                3-Day Free Trial Activated!
              </h3>
              <p className="text-xs text-slate-300">
                Full access granted for Goethe <span className="font-bold text-[#00a8ff]">{selectedLevel}</span> and all levels at €7/month.
              </p>
            </div>

            <div className="bg-[#001730] border border-[#003366] rounded-xl p-3 text-xs text-left space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Account Email:</span>
                <span className="font-bold text-white">{email}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Selected Target:</span>
                <span className="font-bold text-[#00d26a]">Goethe {selectedLevel}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Trial Period:</span>
                <span className="font-bold text-emerald-400">3 Days Free (€0)</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-[#00d26a] hover:bg-[#00c060] text-[#001730] font-bold py-3 rounded-xl transition-all cursor-pointer shadow-md"
            >
              Start Learning Now
            </button>
          </div>
        ) : (
          /* FORM STATE */
          <div className="p-5 sm:p-6 space-y-5">

            {/* Header */}
            <div className="space-y-1 text-center">
              <div className="inline-flex items-center gap-1 bg-[#002b54] text-[#00a8ff] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#003366]">
                <Sparkles size={12} />
                <span>Lingodesk Goethe Pass</span>
              </div>
              <h3 className="text-xl font-black text-white">
                Start Your 3-Day Free Trial
              </h3>
              <p className="text-xs text-slate-300">
                Unlimited access to Goethe A1, A2, B1, and B2. Just €7/month after trial.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Level Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Award size={13} className="text-[#00a8ff]" />
                  Select Target Exam Level:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["A1", "A2", "B1", "B2"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(lvl)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedLevel === lvl
                          ? "bg-[#00d26a] text-[#001730] border-[#00d26a]"
                          : "bg-[#001730] text-slate-300 border-[#003366] hover:bg-[#002244]"
                      }`}
                    >
                      Goethe {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Your Email Address:
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#001730] border border-[#003366] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#00a8ff] focus:outline-none transition-colors placeholder:text-slate-500"
                />
              </div>

              {/* Pricing breakdown pill */}
              <div className="bg-[#001730] p-3 rounded-xl border border-[#003366] flex items-center justify-between text-xs">
                <span className="text-slate-300">First 3 Days:</span>
                <span className="font-extrabold text-[#00d26a]">€0.00 Free</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00d26a] hover:bg-[#00c060] disabled:opacity-50 text-[#001730] font-extrabold py-3.5 rounded-xl transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Activating Free Trial...</span>
                ) : (
                  <>
                    <span>Activate 3-Day Free Trial</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Security note */}
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                <ShieldCheck size={13} className="text-[#00a8ff]" />
                <span>Cancel anytime in 1 click • No hidden fees</span>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
