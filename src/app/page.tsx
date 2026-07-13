"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, Users, UserCheck, FileCheck2,
  Loader2, CheckCircle2, ArrowLeft, Phone, XCircle, ChevronRight, Building2, Briefcase, FileSignature, Copy, AlertTriangle
} from "lucide-react";
import rawContacts from "../data/contacts.json";
import { generateVCF, downloadVCF, Contact } from "../lib/vcf";

export default function Home() {
  const contacts = rawContacts as Contact[];
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  type ViewMode = 'dashboard' | 'verification' | 'total_contacts' | 'ready_to_save' | 'total_phones' | 'organizations' | 'positions' | 'duplicates';
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');


  const navigateTo = (mode: ViewMode) => {
    if (mode === viewMode) return;
    window.history.pushState({ viewMode: mode }, '', mode === 'dashboard' ? '/' : `?view=${mode}`);
    setViewMode(mode);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.viewMode) {
        setViewMode(event.state.viewMode as ViewMode);
      } else {
        setViewMode('dashboard');
      }
    };

    window.addEventListener('popstate', handlePopState);

    if (!window.history.state) {
        window.history.replaceState({ viewMode: 'dashboard' }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [displayedWelcome, setDisplayedWelcome] = useState("");
  useEffect(() => {
    const text = "Hi! I'm Ben Mongi Bot. I already have a verified database of all the relevant contacts. I'll help you save every contact directly to your phone. Simply tap the \"Save Contacts\" button below. After the contact file has been downloaded, open it, choose \"Import Contacts,\" and your contacts will be saved automatically.";
    let i = 0;
    let isTyping = true;

    const typeNextChar = () => {
      if (i > text.length) return;

      setDisplayedWelcome(text.substring(0, i));
      i++;

      let delay = 45; // Default normal speed
      const char = text[i - 1];

      if (char === '.') delay = 600;
      else if (char === ',') delay = 300;
      else if (char === '!' || char === '?') delay = 500;
      else delay += Math.random() * 20; // Add slight natural variation

      if (isTyping) {
        setTimeout(typeNextChar, delay);
      }
    };

    typeNextChar();

    return () => { isTyping = false; };
  }, []);

  const totalContacts = contacts.length;
  const validContacts = contacts.filter((c) => c.status === "valid" || c.status === "multiple");
  const missingContacts = contacts.filter((c) => c.status === "missing");
  const isReady = validContacts.length > 0;


  const totalPhoneNumbers = contacts.reduce((sum, c) => sum + c.phones.length, 0);
  const uniquePositions = new Set(contacts.map(c => c.suffix).filter(Boolean)).size;

  // Duplicate Detection Logic
  const duplicateMap = new Map<string, { contact: Contact, count: number, ids: number[] }>();
  contacts.forEach(c => {
      const key = `${c.name}|${c.suffix || ''}|${[...c.phones].sort().join(',')}`;
      if (duplicateMap.has(key)) {
          duplicateMap.get(key)!.count++;
          duplicateMap.get(key)!.ids.push(c.id);
      } else {
          duplicateMap.set(key, { contact: c, count: 1, ids: [c.id] });
      }
  });

  const duplicateRecords = Array.from(duplicateMap.values()).filter(v => v.count > 1);
  const totalDuplicateInstances = duplicateRecords.reduce((sum, r) => sum + r.count, 0);


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
        onClick: () => navigateTo('total_contacts'),
        trend: { value: 100, label: "Coverage", color: "text-zinc-500", bg: "bg-zinc-100", data: [40, 50, 60, 80, 100] }
    },
    {
        label: "Ready to Save", value: validContacts.length, icon: FileCheck2, clickable: true, onClick: () => navigateTo('ready_to_save'),
        trend: { value: Math.round((validContacts.length/Math.max(totalContacts, 1))*100), label: "Success", color: "text-[#10b981]", bg: "bg-[#10b981]/10", data: [30, 45, 65, 85, 95] }
    },
    {
        label: "Total Phone Numbers",
        value: totalPhoneNumbers,
        icon: Phone,
        clickable: true,
        onClick: () => navigateTo('total_phones'),
        trend: { value: 100, label: "Assigned", color: "text-blue-500", bg: "bg-blue-100", data: [40, 60, 75, 90, 100] }
    },
    {
        label: "Organizations",
        value: 1, // Dataset is all for BEN MONGI BOT
        icon: Building2,
        clickable: true,
        onClick: () => navigateTo('organizations'),
        trend: { value: 100, label: "Unified", color: "text-purple-500", bg: "bg-purple-100", data: [100, 100, 100, 100, 100] }
    },
    {
        label: "Positions/Titles",
        value: uniquePositions,
        icon: Briefcase,
        clickable: true,
        onClick: () => navigateTo('positions'),
        trend: { value: uniquePositions, label: "Unique", color: "text-indigo-500", bg: "bg-indigo-100", data: [2, 3, 4, 5, 6] }
    },

    {
        label: "Exact Duplicates",
        value: totalDuplicateInstances,
        icon: Copy,
        clickable: true,
        onClick: () => navigateTo('duplicates'),
        trend: { value: duplicateRecords.length, label: "Groups", color: totalDuplicateInstances > 0 ? "text-amber-600" : "text-zinc-400", bg: totalDuplicateInstances > 0 ? "bg-amber-100" : "bg-zinc-100", data: [totalDuplicateInstances, totalDuplicateInstances, totalDuplicateInstances, totalDuplicateInstances] }
    },
    {
        label: "Verification Status",
        value: "100%",
        icon: FileSignature,
        clickable: true,
        onClick: () => navigateTo('verification'),
        trend: { value: 100, label: "Trace Log", color: "text-emerald-500", bg: "bg-emerald-100", data: [100, 100, 100, 100, 100] }
    },
  ];


  const getDetailViewData = () => {
    switch (viewMode) {
      case 'verification':
        return {
          title: "Verification Status",
          description: "100% Traceability Audit Log",
          list: contacts
        };
      case 'total_contacts':
        return {
          title: "Total Contacts",
          description: "All imported contacts from the source.",
          list: contacts
        };
      case 'ready_to_save':
        return {
          title: "Ready to Save",
          description: "Contacts with valid phone numbers ready for VCF generation.",
          list: validContacts
        };
      case 'total_phones':
        // Show contacts but emphasize phones
        return {
          title: "Phone Number Directory",
          description: "All extracted and verified phone numbers.",
          list: contacts.filter(c => c.phones.length > 0)
        };
      case 'organizations':
        return {
          title: "Organizations",
          description: "Unique organizations found in the database.",
          customRender: (
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900">BEN MONGI BOT</h3>
                        <p className="text-sm text-zinc-500">Master Dataset Entity</p>
                    </div>
                </div>
                <div className="text-sm font-semibold px-3 py-1 bg-zinc-100 rounded-full text-zinc-600">
                    {totalContacts} Contacts
                </div>
            </div>
          )
        };

      case 'duplicates':
        return {
          title: "Exact Duplicates Report",
          description: "Contacts sharing the exact same Name, Title, and Phone Numbers.",
          customRender: (
            <div className="grid gap-3">
                {duplicateRecords.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 border-dashed bg-white py-12 text-center">
                        <CheckCircle2 className="mb-3 h-8 w-8 text-[#10b981]" />
                        <div className="text-sm font-medium text-zinc-900">Database is Clean</div>
                        <div className="mt-1 text-sm text-zinc-500">No exact duplicates found.</div>
                    </div>
                ) : (
                    duplicateRecords.map((r, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-base font-semibold text-zinc-900">{r.contact.name}</h3>
                                    {r.contact.suffix && (
                                        <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded uppercase tracking-wide">
                                            {r.contact.suffix}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-1 mt-3">
                                    {r.contact.phones.length > 0 ? (
                                        r.contact.phones.map((phone, pIdx) => (
                                            <div key={pIdx} className="flex items-center gap-2 text-sm text-zinc-700">
                                                <Phone className="h-3.5 w-3.5 text-zinc-400" />
                                                {phone}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-zinc-400 italic">No phone numbers</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                                    <AlertTriangle className="h-3.5 w-3.5" />
                                    Appears {r.count} times
                                </div>
                                <div className="text-[10px] text-zinc-400 font-mono">Row IDs: {r.ids.join(', ')}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
          )
        };
      case 'positions':
        // Generate list of unique positions and their counts
        const posMap = new Map();
        contacts.forEach(c => {
            if (c.suffix) {
                posMap.set(c.suffix, (posMap.get(c.suffix) || 0) + 1);
            }
        });
        const posArray = Array.from(posMap.entries()).sort((a,b) => b[1] - a[1]);

        return {
          title: "Positions & Titles",
          description: "Distribution of mapped job roles across contacts.",
          customRender: (
            <div className="grid gap-3">
                {posArray.map(([title, count], idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                                <Briefcase className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-bold text-zinc-900 uppercase">{title}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                            {count} people
                        </div>
                    </div>
                ))}
            </div>
          )
        };
      default:
        return { title: "", description: "", list: [] };
    }
  };

  const currentView = getDetailViewData();

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
                onClick={() => navigateTo('dashboard')}
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
                  Hi! I&apos;m Ben Mongi Bot.
                </h2>
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed min-h-[80px]">
                  {displayedWelcome}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-[2px] h-[1em] bg-zinc-400 ml-1 align-middle"
                  />
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="mb-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
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
                      <div className="flex items-center gap-3">
                        {stat.trend && (
                         <div className="flex items-end gap-1 h-6">
                            {stat.trend.data.map((h, j) => (
                                <div key={j} className={`w-1.5 rounded-full ${stat.trend.bg}`} style={{ height: `${Math.max(20, h)}%` }}></div>
                            ))}
                         </div>
                        )}
                        {stat.clickable && (
                        <div className="text-zinc-300 group-hover:text-zinc-600 transition-colors">
                            <ChevronRight className="h-5 w-5" />
                        </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-semibold tracking-tight text-zinc-900">{stat.value}</div>
                        {stat.trend && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${stat.trend.bg} ${stat.trend.color}`}>
                                {stat.trend.value}{stat.trend.label === 'Unique' || stat.trend.label === 'Unified' ? '' : '%'}
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
                      <p className="text-sm text-zinc-500 mb-2">Only valid numbers will be included.</p>
                      <div className="text-xs text-zinc-400 bg-zinc-50 p-2 rounded-lg border border-zinc-100 max-w-sm">
                        <span className="font-semibold text-zinc-600">Important:</span> When importing, select <strong className="text-zinc-600">Merge with Existing</strong> (iOS) or <strong className="text-zinc-600">Import and Merge</strong> (Android) if prompted, to properly update old contacts.
                      </div>
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
                          <span>Save Contacts</span>
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
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-1">{currentView.title}</h2>
                        <p className="text-sm text-zinc-500">{currentView.description} {currentView.list && currentView.list.length > 0 && `(${currentView.list.length} records)`}</p>
                    </div>
                </div>

                {currentView.customRender ? currentView.customRender : (
                <div className="space-y-3">
                    {currentView.list?.map(contact => {
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
                )}
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
