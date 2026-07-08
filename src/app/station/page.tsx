"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency, mockSubscriber } from "@/lib/mockData";
import { Button } from "@/components/Button";
import { NumericKeypad } from "@/components/NumericKeypad";
import { Card, CardContent } from "@/components/Card";
import { CheckCircle2, ChevronLeft, Building2 } from "lucide-react";

export default function StationDashboard() {
  const [code, setCode] = useState("");
  const [view, setView] = useState<"input" | "verify" | "success">("input");
  const [isLoading, setIsLoading] = useState(false);

  const handleKeypadPress = (val: string) => {
    setCode((prev) => {
      if (prev.length >= 6) return prev;
      return prev + val;
    });
  };

  const handleKeypadDelete = () => {
    setCode((prev) => prev.slice(0, -1));
  };

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setView("verify");
      setIsLoading(false);
    }, 1000);
  };

  const handleApprove = () => {
    setIsLoading(true);
    setTimeout(() => {
      setView("success");
      setIsLoading(false);
    }, 1500);
  };

  const reset = () => {
    setCode("");
    setView("input");
  };

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <header className="flex items-center justify-between px-6 pt-12 pb-4 bg-white border-b border-slate-100">
        {view !== "input" && view !== "success" ? (
          <button onClick={() => setView("input")} className="p-2 -ml-2">
            <ChevronLeft className="h-7 w-7 text-slate-900" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-slate-900" />
            <span className="font-bold text-xl tracking-tight">TankTo Station</span>
          </div>
        )}
        <div className="text-sm font-semibold text-slate-500">Puma Upanga</div>
      </header>

      <main className="flex-1 flex flex-col px-6">
        <AnimatePresence mode="wait">
          {view === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col pt-12"
            >
              <div className="flex-1 flex flex-col items-center">
                <p className="text-body-secondary text-slate-500 mb-6">Enter Customer Fuel Code</p>
                <div className="flex gap-3 mb-12">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-16 w-12 rounded-xl flex items-center justify-center text-3xl font-bold ${
                        code[i] ? "bg-slate-900 text-white shadow-lg" : "bg-white border-2 border-slate-200 text-transparent"
                      }`}
                    >
                      {code[i] || ""}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pb-8">
                <NumericKeypad onPress={handleKeypadPress} onDelete={handleKeypadDelete} />
                <Button
                  className="w-full mt-6"
                  size="lg"
                  disabled={code.length !== 6}
                  isLoading={isLoading}
                  onClick={handleVerify}
                >
                  Verify Code
                </Button>
              </div>
            </motion.div>
          )}

          {view === "verify" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col pt-8 pb-8"
            >
              <Card className="border-none shadow-2xl bg-white overflow-hidden">
                <div className="bg-slate-900 p-6 text-center text-white">
                  <p className="text-sm text-slate-400 font-medium mb-1">Requested Amount</p>
                  <h2 className="text-4xl font-bold">{formatCurrency(30000)}</h2>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600">
                      {mockSubscriber.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-slate-900">{mockSubscriber.name}</p>
                      <p className="text-sm text-emerald-600 font-semibold">{mockSubscriber.planName}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Status</span>
                      <span className="font-semibold text-emerald-600 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-1" /> Valid Code
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Code</span>
                      <span className="font-mono font-bold tracking-widest">{code}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-auto pt-8">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleApprove}
                  isLoading={isLoading}
                >
                  Approve & Dispense Fuel
                </Button>
              </div>
            </motion.div>
          )}

          {view === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center pt-12 pb-8 text-center"
            >
              <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
              </div>
              <h2 className="text-display mb-2">Approved</h2>
              <p className="text-body-secondary text-slate-500 mb-12">
                Transaction complete. You may now dispense fuel to the customer.
              </p>

              <div className="mt-auto w-full">
                <Button className="w-full" variant="secondary" size="lg" onClick={reset}>
                  Process Next Customer
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
