"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, Users, UserCheck, UserMinus, FileCheck2,
  Loader2, CheckCircle2, ArrowLeft, Phone, XCircle, ChevronRight
} from "lucide-react";
import rawContacts from "../data/contacts.json";
import { generateVCF, downloadVCF, Contact } from "../lib/vcf";

export default function Home() {
  const contacts = rawContacts as Contact[];
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<'dashboard' | 'verification'>('dashboard');

  const totalContacts = contacts.length;
  const validContacts = contacts.filter((c) => c.status === "valid" || c.status === "multiple");
  const missingContacts = contacts.filter((c) => c.status === "missing");
  const isReady = validContacts.length > 0;

  const handleDownload = async () => {
    if (isGenerating || !isReady) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const vcfContent = generateVCF(contacts);
    downloadVCF(vcfContent, "ben_mongi_bot_contacts.vcf");

    setIsGenerating(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  const statCards = [
    {
        label: "Total Contacts",
        value: totalContacts,
        icon: Users,
        clickable: true,
        onClick: () => setViewMode('verification'),
        trend: { value: 100, label: "Coverage", color: "text-zinc-500", bg: "bg-zinc-100", data: [40, 50, 60, 80, 100] }
    },
    {
        label: "Valid Contacts",
        value: validContacts.length,
        icon: UserCheck,
        trend: { value: Math.round((validContacts.length/Math.max(totalContacts, 1))*100), label: "Success", color: "text-[#10b981]", bg: "bg-[#10b981]/10", data: [30, 45, 65, 85, 95] }
    },
    {
        label: "Missing Numbers",
        value: missingContacts.length,
        icon: UserMinus,
        trend: { value: Math.round((missingContacts.length/Math.max(totalContacts, 1))*100), label: "Error Rate", color: "text-amber-500", bg: "bg-amber-100", data: [60, 45, 35, 20, 10] }
    },
    {
        label: "Ready for Export",
        value: validContacts.length,
        icon: FileCheck2,
        trend: { value: Math.round((validContacts.length/Math.max(totalContacts, 1))*100), label: "Exportable", color: "text-blue-500", bg: "bg-blue-100", data: [20, 40, 60, 80, 100] }
    },
  ];

  return (
    <div className="min-h-screen pb-20 selection:bg-zinc-200 bg-[#F9FAFB]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-sm">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-zinc-900">BEN MONGI BOT</h1>
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Contacts Utility</p>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {viewMode === 'verification' && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => setViewMode('dashboard')}
                className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main className="mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {viewMode === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Welcome Section */}
              <div className="mb-12 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mb-3">
                  Hi, I am BEN MONGI BOT.
                </h2>
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                  I help you safely generate a clean VCF file from your contacts.
                  I will automatically remove any incomplete or broken records so your phone imports cleanly.
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="mb-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                {statCards.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                    onClick={stat.clickable ? stat.onClick : undefined}
                    className={`
                      flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm border border-zinc-100 transition-all
                      ${stat.clickable ? 'cursor-pointer hover:shadow-md hover:border-zinc-300 group' : ''}
                    `}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-zinc-700">
                        <stat.icon className="h-5 w-5" />
                      </div>
                      {stat.clickable ? (
                        <div className="text-zinc-300 group-hover:text-zinc-600 transition-colors">
                            <ChevronRight className="h-5 w-5" />
                        </div>
                      ) : (
                         <div className="flex items-end gap-1 h-6">
                            {stat.trend?.data.map((h, j) => (
                                <div key={j} className={`w-1.5 rounded-full ${stat.trend?.bg}`} style={{ height: `${Math.max(20, h)}%` }}></div>
                            ))}
                         </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-semibold tracking-tight text-zinc-900">{stat.value}</div>
                        {stat.trend && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${stat.trend.bg} ${stat.trend.color}`}>
                                {stat.trend.value}%
                            </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm font-medium text-zinc-500">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Primary CTA Action Section */}
              <div className="mb-16">
                <div className="overflow-hidden rounded-3xl bg-zinc-900 p-1 sm:p-2 shadow-xl shadow-zinc-900/10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[20px] bg-white p-6 sm:p-8">
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-semibold text-zinc-900 mb-1">Your Contacts Are Ready</h3>
                      <p className="text-sm text-zinc-500">Only valid numbers will be included.</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: isReady ? 1.02 : 1 }}
                      whileTap={{ scale: isReady ? 0.98 : 1 }}
                      onClick={handleDownload}
                      disabled={!isReady || isGenerating}
                      className={`
                        relative flex h-14 w-full sm:w-auto min-w-[240px] items-center justify-center gap-3 rounded-xl px-8 text-base font-semibold transition-all duration-200
                        ${!isReady ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/20'}
                      `}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Preparing File...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          <span>Save to Your Phone</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Missing Contacts List */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900">Contacts Missing Phone Numbers</h3>
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                  {missingContacts.length} Skipped
                </span>
              </div>

              {missingContacts.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                  <div className="max-h-[400px] overflow-y-auto p-2">
                    {missingContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-zinc-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-medium text-zinc-600">
                            {contact.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-zinc-900 flex items-center gap-2">
                                {contact.name}
                                {contact.suffix && (
                                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded uppercase">{contact.suffix}</span>
                                )}
                            </div>
                            <div className="text-xs text-zinc-500">
                              {contact.raw || "No Phone Number"}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/50">
                          Skipped
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 border-dashed bg-white py-12 text-center">
                  <UserCheck className="mb-3 h-8 w-8 text-zinc-400" />
                  <div className="text-sm font-medium text-zinc-900">All contacts are valid</div>
                  <div className="mt-1 text-sm text-zinc-500">No missing phone numbers found.</div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="verification"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pb-12"
            >
                <div className="mb-8 border-b border-zinc-200 pb-6 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-1">Dataset Verification</h2>
                        <p className="text-sm text-zinc-500">100% Traceability Audit Log ({contacts.length} total records)</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {contacts.map(contact => {
                        let statusColor = "text-zinc-600 bg-zinc-100 border-zinc-200";
                        let statusLabel = "Unknown";
                        let StatusIcon = CheckCircle2;

                        if (contact.status === 'valid') {
                            statusColor = "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20";
                            statusLabel = "Included";
                        } else if (contact.status === 'multiple') {
                            statusColor = "text-blue-600 bg-blue-50 border-blue-200";
                            statusLabel = "Multiple Numbers";
                        } else if (contact.status === 'missing') {
                            statusColor = "text-red-600 bg-red-50 border-red-200";
                            statusLabel = "Missing Phone Number";
                            StatusIcon = XCircle;
                        }

                        return (
                            <div key={contact.id} className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-base font-semibold text-zinc-900">{contact.name}</h3>
                                        {contact.suffix && (
                                            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded uppercase tracking-wide">
                                                {contact.suffix}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-zinc-400 mb-3 font-mono">Original row: {contact.originalName}</div>

                                    <div className="space-y-2">
                                        {contact.phones.length > 0 ? (
                                            contact.phones.map((phone, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm text-zinc-700">
                                                    <Phone className="h-4 w-4 text-zinc-400" />
                                                    {phone}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-red-500/80 italic">
                                                <XCircle className="h-4 w-4" />
                                                No valid phone number detected
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center self-start">
                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusColor}`}>
                                        <StatusIcon className="h-3.5 w-3.5" />
                                        {statusLabel}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#10b981] px-5 py-3 text-white shadow-2xl shadow-[#10b981]/20"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">Contacts ready to import.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
