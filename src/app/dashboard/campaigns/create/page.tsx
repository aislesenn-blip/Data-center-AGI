"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Upload, Calendar, DollarSign, Target, Monitor, CheckCircle2, ChevronRight } from "lucide-react";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    objective: "awareness",
    screens: [] as number[],
    startDate: "",
    endDate: "",
    budgetType: "daily",
    budget: "",
  });

  const updateForm = (field: string, value: string | number[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const days = 14; // Mock calculation
    const amount = parseFloat(formData.budget) || 0;
    if (formData.budgetType === "daily") return amount * days;
    return amount;
  };

  const steps = [
    { id: 1, name: "Details", icon: Target },
    { id: 2, name: "Screens", icon: Monitor },
    { id: 3, name: "Schedule", icon: Calendar },
    { id: 4, name: "Review", icon: CheckCircle2 },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.push("/dashboard");
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard"); // Redirect to dashboard on success
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F9FAFB]">
      {/* Header / Stepper */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
               <ArrowLeft className="w-5 h-5 text-gray-600" />
             </button>
             <h1 className="text-xl font-bold text-[#111827]">Create Campaign</h1>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  step === s.id ? "bg-[#111827] text-white" :
                  step > s.id ? "bg-emerald-500 text-white" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span className={`ml-2 text-sm font-medium ${step >= s.id ? "text-[#111827]" : "text-gray-400"}`}>
                  {s.name}
                </span>
                {i < steps.length - 1 && <div className="w-8 h-px bg-gray-200 mx-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#111827]">Campaign Details</h2>
                    <p className="text-sm text-gray-500 mt-1">Start by giving your campaign a name and uploading creative assets.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateForm("name", e.target.value)}
                        placeholder="e.g., Summer Collection Launch"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Objective</label>
                      <select
                        value={formData.objective}
                        onChange={(e) => updateForm("objective", e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] outline-none bg-white"
                      >
                        <option value="awareness">Brand Awareness</option>
                        <option value="traffic">Store Traffic</option>
                        <option value="event">Event Promotion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Creative Asset</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mb-3" />
                        <p className="text-sm font-medium text-[#111827]">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">MP4, JPG, PNG (Max 50MB)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#111827]">Select Screens</h2>
                    <p className="text-sm text-gray-500 mt-1">Choose where you want your ads to appear.</p>
                  </div>

                  <div className="space-y-3">
                    {[1, 2, 3].map(id => (
                       <div
                         key={id}
                         onClick={() => {
                           const screens = formData.screens.includes(id)
                             ? formData.screens.filter(s => s !== id)
                             : [...formData.screens, id];
                           updateForm("screens", screens);
                         }}
                         className={`p-4 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                           formData.screens.includes(id) ? "border-[#111827] bg-gray-50/50" : "border-gray-200 hover:border-gray-300"
                         }`}
                       >
                         <div className="flex flex-col">
                            <span className="font-semibold text-[#111827]">Premium Billboard #{id}</span>
                            <span className="text-sm text-gray-500">Downtown Area • 450k daily reach</span>
                         </div>
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            formData.screens.includes(id) ? "bg-[#111827] border-[#111827]" : "border-gray-300"
                         }`}>
                            {formData.screens.includes(id) && <Check className="w-3 h-3 text-white" />}
                         </div>
                       </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#111827]">Schedule & Budget</h2>
                    <p className="text-sm text-gray-500 mt-1">Set when your campaign runs and how much you want to spend.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateForm("startDate", e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateForm("endDate", e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Budget Type</label>
                    <div className="flex gap-4 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="budgetType"
                          value="daily"
                          checked={formData.budgetType === "daily"}
                          onChange={(e) => updateForm("budgetType", e.target.value)}
                          className="accent-[#111827]"
                        />
                        <span className="text-sm font-medium text-[#111827]">Daily Budget</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="budgetType"
                          value="total"
                          checked={formData.budgetType === "total"}
                          onChange={(e) => updateForm("budgetType", e.target.value)}
                          className="accent-[#111827]"
                        />
                        <span className="text-sm font-medium text-[#111827]">Total Budget</span>
                      </label>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => updateForm("budget", e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#111827] outline-none text-lg font-medium"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                     <BarChartIcon className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                     <div>
                        <p className="text-sm font-medium text-blue-900">Estimated Reach</p>
                        <p className="text-xs text-blue-700 mt-0.5">Based on your budget and selected screens, we estimate 120k-150k impressions per day.</p>
                     </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-[#111827]">Review Campaign</h2>
                    <p className="text-sm text-gray-500 mt-1">Review your details before completing payment.</p>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Campaign Name</span>
                        <span className="font-medium text-[#111827]">{formData.name || "Untitled Campaign"}</span>
                     </div>
                     <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Screens Selected</span>
                        <span className="font-medium text-[#111827]">{formData.screens.length} Screens</span>
                     </div>
                     <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">Duration</span>
                        <span className="font-medium text-[#111827]">14 Days</span>
                     </div>

                     <div className="pt-4">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                           <div className="flex justify-between mb-2 text-sm">
                              <span className="text-gray-600">Subtotal</span>
                              <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                           </div>
                           <div className="flex justify-between mb-4 text-sm">
                              <span className="text-gray-600">Platform Fee (5%)</span>
                              <span className="font-medium">${(calculateTotal() * 0.05).toFixed(2)}</span>
                           </div>
                           <div className="h-px bg-gray-200 w-full mb-4" />
                           <div className="flex justify-between items-center">
                              <span className="font-bold text-[#111827]">Total Amount</span>
                              <span className="text-2xl font-bold text-[#111827]">${(calculateTotal() * 1.05).toFixed(2)}</span>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer Actions */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className={`px-6 py-2.5 font-medium text-sm rounded-lg transition-colors ${
                step === 1 ? "text-transparent cursor-default" : "text-gray-600 hover:bg-white border border-transparent hover:border-gray-200"
              }`}
            >
              Back
            </button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={isSubmitting || (step === 1 && !formData.name)}
              className="bg-[#111827] hover:bg-gray-900 text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : step === 4 ? (
                "Pay & Activate"
              ) : (
                <>Continue <ChevronRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick helper icon for Review step
function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}
