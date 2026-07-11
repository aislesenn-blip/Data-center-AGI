"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactsData } from "@/lib/contacts";
import { generateVCF, downloadVCF } from "@/lib/vcf";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { CheckCircle2, ChevronRight, Download, Users, AlertCircle, ArrowLeft } from "lucide-react";

type Step = "welcome" | "dashboard" | "success";

export default function Home() {
  const [step, setStep] = useState<Step>("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Only access localStorage on mount without setting state in the same pass if possible,
    // but to satisfy ESLint for simple mounted state, we can use a callback or just ignore
    // since this pattern is standard for Next.js localStorage hydration.
    // However, a cleaner way is to initialize state lazily if we didn't have SSR issues.
    // For Next.js, we just mark as mounted to avoid hydration mismatch.
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const savedStep = localStorage.getItem("benmongibot_step") as Step;
      if (savedStep && ["welcome", "dashboard", "success"].includes(savedStep) && step === "welcome") {
         setStep(savedStep);
      }
    }
  }, [hasMounted, step]);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("benmongibot_step", step);
    }
  }, [step, hasMounted]);

  if (!hasMounted) return null;

  const validContacts = contactsData.filter(c => c.hasPhone);
  const invalidContacts = contactsData.filter(c => !c.hasPhone);

  const handleNext = () => {
    setStep("dashboard");
  };

  const handleDownload = () => {
    setIsLoading(true);
    setTimeout(() => {
      const vcfStr = generateVCF(validContacts);
      downloadVCF(vcfStr, "ben_mongi_contacts.vcf");
      setIsLoading(false);
      setStep("success");
    }, 1200);
  };

  const handleReset = () => {
    setStep("welcome");
  };

  return (
    <div className="flex h-full flex-col bg-[var(--background)]">
      <header className="flex h-16 shrink-0 items-center px-6 lg:px-8 border-b border-[#E5E5E5] bg-white">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A0A0A] text-white font-bold text-lg">
            B
          </div>
          <div>
            <h1 className="text-[16px] font-bold tracking-tight text-[#0A0A0A] leading-none">BEN MONGI BOT</h1>
            <p className="text-[11px] font-medium text-[#737373] uppercase tracking-widest mt-0.5">Contacts Utility</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
          <AnimatePresence mode="wait">
            {step === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-start pt-12 md:pt-24"
              >
                <Badge className="mb-6" variant="secondary">Ready to Export</Badge>
                <h2 className="text-display mb-6 max-w-xl">
                  Hi, I am BEN MONGI BOT.
                </h2>
                <p className="text-body text-[#737373] mb-12 max-w-lg leading-relaxed">
                  I will help you generate a clean, phone-ready Contacts file (.VCF) from your dataset. I automatically exclude incomplete records to ensure your phonebook remains perfectly organized.
                </p>

                <Button size="lg" onClick={handleNext} className="w-full sm:w-auto shadow-md">
                  Continue <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}

            {step === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="flex items-center mb-2">
                  <button onClick={() => setStep("welcome")} className="text-[#737373] hover:text-[#0A0A0A] transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-100">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <h2 className="text-heading ml-2">Dataset Overview</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="success">Ready for Export</Badge>
                        <Users className="h-5 w-5 text-[#737373]" />
                      </div>
                      <h3 className="text-display text-4xl mb-1">{validContacts.length}</h3>
                      <p className="text-body-secondary">Valid contacts with phone numbers</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="danger">Skipped</Badge>
                        <AlertCircle className="h-5 w-5 text-[#737373]" />
                      </div>
                      <h3 className="text-display text-4xl mb-1">{invalidContacts.length}</h3>
                      <p className="text-body-secondary">Contacts missing phone numbers</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="overflow-hidden">
                  <CardHeader className="bg-[#F5F5F5] border-b border-[#E5E5E5] py-4">
                    <CardTitle className="text-[15px]">Contacts Missing Phone Numbers</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-64 overflow-y-auto hide-scrollbar">
                      {invalidContacts.map((contact, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border-b border-[#E5E5E5] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                          <span className="font-medium text-[#0A0A0A]">{contact.name}</span>
                          <span className="text-sm text-[#737373]">No Phone Number</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="pt-4 pb-12">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto shadow-md"
                    onClick={handleDownload}
                    isLoading={isLoading}
                  >
                    Save Contacts to Your Phone <Download className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center pt-20"
              >
                <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center mb-8">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h2 className="text-display mb-4">Your Contacts Are Ready</h2>
                <p className="text-body text-[#737373] max-w-sm mb-12">
                  The VCF file was generated successfully. You can now open it to save the valid contacts to your device.
                </p>
                <Button variant="secondary" onClick={handleReset} className="px-8">
                  Start Over
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
