"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Droplet, ShieldCheck } from "lucide-react";

export default function InvitePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/subscriber");
      }, 1500);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white px-6 pt-12 pb-8">
      <header className="mb-12 flex justify-center">
        <div className="flex items-center gap-2">
          <Droplet className="h-8 w-8 text-slate-900" fill="currentColor" />
          <span className="font-bold text-2xl tracking-tight">TankTo</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-2">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h1 className="text-display">You&apos;ve been invited.</h1>
              <p className="text-body-secondary text-slate-500">
                Welcome to TankTo. Let&apos;s set up your private fuel access account.
              </p>

              <div className="pt-8 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-900 mb-2 block">Full Name</label>
                  <Input placeholder="Enter your full name" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h1 className="text-display">Secure your account.</h1>
              <p className="text-body-secondary text-slate-500">
                Create a strong password for your TankTo dashboard.
              </p>

              <div className="pt-8 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-900 mb-2 block">Password</label>
                  <Input type="password" placeholder="Create a password" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900 mb-2 block">Confirm Password</label>
                  <Input type="password" placeholder="Confirm your password" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h1 className="text-display">Set your Fuel PIN.</h1>
              <p className="text-body-secondary text-slate-500">
                You&apos;ll use this 4-digit PIN to authorize fuel transactions at the station.
              </p>

              <div className="pt-8 space-y-4 flex justify-center gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <input
                    key={i}
                    type="password"
                    maxLength={1}
                    className="w-16 h-20 text-center text-3xl font-bold rounded-2xl border-2 border-slate-200 bg-slate-50 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="mt-auto pt-6">
          <Button
            className="w-full"
            size="lg"
            onClick={handleNext}
            isLoading={isLoading}
          >
            {step === 3 ? "Complete Setup" : "Continue"}
          </Button>
        </div>
      </main>
    </div>
  );
}
