"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency, mockSubscriber, mockTransactions } from "@/lib/mockData";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { NumericKeypad } from "@/components/NumericKeypad";
import { ArrowDownLeft, ArrowUpRight, Droplet, Clock, ShieldCheck, ChevronLeft } from "lucide-react";

export default function SubscriberDashboard() {
  const [view, setView] = useState<"dashboard" | "generate">("dashboard");
  const [fuelAmount, setFuelAmount] = useState("");
  const [fuelCode, setFuelCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFuelCode(Math.floor(100000 + Math.random() * 900000).toString());
      setIsLoading(false);
    }, 1500);
  };

  const handleKeypadPress = (val: string) => {
    setFuelAmount((prev) => {
      const next = prev + val;
      // Simple cap to avoid absurd lengths
      return next.length > 8 ? prev : next;
    });
  };

  const handleKeypadDelete = () => {
    setFuelAmount((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <header className="flex items-center justify-between px-6 pt-12 pb-4 bg-white">
        {view === "generate" ? (
          <button onClick={() => { setView("dashboard"); setFuelCode(null); setFuelAmount(""); }} className="p-2 -ml-2 text-slate-900">
            <ChevronLeft className="h-7 w-7" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Droplet className="h-6 w-6 text-slate-900" fill="currentColor" />
            <span className="font-bold text-xl tracking-tight">TankTo</span>
          </div>
        )}
        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
          JD
        </div>
      </header>

      <main className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-24">
        <AnimatePresence mode="wait">
          {view === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="space-y-6 pt-4"
            >
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-body-secondary text-slate-500">Available Fuel</p>
                  <h1 className="text-display mt-1">{formatCurrency(mockSubscriber.availableBalance)}</h1>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-caption text-emerald-700">{mockSubscriber.planName}</span>
                  </div>
                </div>
              </div>

              <Card className="bg-slate-900 text-white border-none">
                <CardContent className="p-6">
                  <p className="text-slate-400 text-sm font-medium">Outstanding Balance</p>
                  <p className="text-3xl font-bold mt-1 mb-4">{formatCurrency(mockSubscriber.outstandingBalance)}</p>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                    <div className="flex items-center text-slate-300 text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Due {new Date(mockSubscriber.nextRepaymentDate).toLocaleDateString()}
                    </div>
                    <button className="text-emerald-400 font-semibold text-sm">Pay Now</button>
                  </div>
                </CardContent>
              </Card>

              <div className="pt-2">
                <h2 className="text-heading mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {mockTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${tx.type === 'FUEL' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {tx.type === 'FUEL' ? <ArrowUpRight /> : <ArrowDownLeft />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{tx.type === 'FUEL' ? tx.stationName : 'Repayment'}</p>
                          <p className="text-sm text-slate-500">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className={`font-semibold ${tx.type === 'FUEL' ? 'text-slate-900' : 'text-emerald-600'}`}>
                        {tx.type === 'FUEL' ? '-' : '+'}{formatCurrency(tx.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="generate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex h-full flex-col pt-4"
            >
              {!fuelCode ? (
                <>
                  <div className="flex-1 flex flex-col items-center justify-center mb-8">
                    <p className="text-body-secondary text-slate-500 mb-2">Enter Fuel Amount</p>
                    <h1 className="text-display text-5xl">
                      {fuelAmount ? (
                        <>
                          TZS {parseInt(fuelAmount).toLocaleString()}
                        </>
                      ) : (
                        <span className="text-slate-300">TZS 0</span>
                      )}
                    </h1>
                    <p className="text-sm text-slate-400 mt-4">Available: {formatCurrency(mockSubscriber.availableBalance)}</p>
                  </div>

                  <div className="mt-auto pb-6">
                    <NumericKeypad onPress={handleKeypadPress} onDelete={handleKeypadDelete} />
                    <Button
                      className="w-full mt-6"
                      onClick={handleGenerate}
                      disabled={!fuelAmount || parseInt(fuelAmount) <= 0 || parseInt(fuelAmount) > mockSubscriber.availableBalance}
                      isLoading={isLoading}
                    >
                      Generate Fuel Code
                    </Button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <Card className="w-full max-w-sm text-center pt-10 pb-8 px-6 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20">
                    <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck className="h-8 w-8 text-emerald-600" />
                    </div>
                    <p className="text-slate-500 font-medium mb-2">Your Fuel Code</p>
                    <h2 className="text-5xl font-bold tracking-widest text-slate-900 mb-6">{fuelCode}</h2>
                    <p className="text-2xl font-semibold mb-2">{formatCurrency(parseInt(fuelAmount))}</p>
                    <div className="inline-flex items-center justify-center bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mt-4">
                      <Clock className="h-4 w-4 mr-2" />
                      Expires in 14:59
                    </div>
                  </Card>

                  <p className="text-center text-slate-500 mt-8 px-8">
                    Show this code to the station attendant to receive fuel immediately.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {view === "dashboard" && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pb-8"
          >
            <Button size="lg" className="w-full shadow-2xl" onClick={() => setView("generate")}>
              Get Fuel Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
