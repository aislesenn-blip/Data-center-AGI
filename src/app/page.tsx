"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowDownToLine, History as HistoryIcon, Eye, EyeOff, User, CheckCircle, ChevronRight, Briefcase } from "lucide-react"

type AppState = "ONBOARDING" | "HOME" | "ACCESS_WAGES" | "CONFIRMATION" | "AUTHORIZATION" | "SUCCESS" | "ACTIVITY"

const MOCK_TRANSACTIONS = [
  { id: 1, type: "advance", amount: "50,000", description: "Early Wage Access", date: "Today", time: "14:30" },
  { id: 2, type: "deduction", amount: "50,000", description: "Payroll Deduction", date: "Last Friday", time: "09:00" },
]

export default function App() {
  const [navStack, setNavStack] = useState<AppState[]>(["ONBOARDING"])
  const appState = navStack[navStack.length - 1]

  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3>(1)
  const [employeeName, setEmployeeName] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [authPin, setAuthPin] = useState("")
  const [enteredPin, setEnteredPin] = useState("")

  const [isBalanceVisible, setIsBalanceVisible] = useState(false)
  const [earnedBalance, setEarnedBalance] = useState(250000)

  const [accessAmount, setAccessAmount] = useState("")

  const [isAuthorizing, setIsAuthorizing] = useState(false)
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS)

  // Sync navStack with window.history
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.appState) {
        setNavStack(e.state.navStack);
      } else {
        setNavStack(["HOME"]);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (state: AppState) => {
    if (state === "HOME") {
      const newStack: AppState[] = ["HOME"];
      setNavStack(newStack);
      window.history.pushState({ appState: "HOME", navStack: newStack }, "");
    } else {
      setNavStack(prev => {
        const newStack = [...prev, state];
        window.history.pushState({ appState: state, navStack: newStack }, "");
        return newStack;
      });
    }
  }

  const goBack = () => {
    setNavStack(prev => {
      if (prev.length > 1) {
        const newStack = prev.slice(0, -1);
        window.history.back();
        return newStack;
      }
      return ["HOME"];
    });
  }

  const handleKeypadPress = (val: string) => {
    if (val === "backspace") {
      setAccessAmount(prev => prev.slice(0, -1));
    } else {
      setAccessAmount(prev => {
        if (prev.length >= 8) return prev;
        if (prev === "0" && val !== "0") return val;
        if (prev === "0" && val === "0") return prev;
        return prev + val;
      });
    }
  }

  const formatAmount = (val: string) => {
    if (!val) return "0";
    return Number(val).toLocaleString();
  }

  const getAmountFontSize = (val: string) => {
    const formattedLength = formatAmount(val).length;
    if (formattedLength > 9) return 'text-[36px] sm:text-[42px]';
    if (formattedLength > 6) return 'text-[44px] sm:text-[50px]';
    return 'text-[48px] sm:text-[56px]';
  }

  return (
    <div className="relative w-full h-[100dvh] bg-white overflow-hidden flex flex-col font-sans">
      <AnimatePresence>

        {appState === "ONBOARDING" && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-20 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="flex-1 overflow-y-auto px-6 pt-12 pb-6 flex flex-col min-h-0">
              <div className="flex flex-col gap-2 mb-12">
                <h1 className="text-[32px] font-extrabold tracking-tight text-[#1A1A1A] leading-tight">
                  {onboardingStep === 1 ? "Connect Employer" : onboardingStep === 2 ? "Set Security PIN" : "Setup Complete"}
                </h1>
                <p className="text-[16px] font-medium text-[#666666]">
                  {onboardingStep === 1 ? "Link your payroll account to access earned wages instantly." : onboardingStep === 2 ? "Create a 4-digit PIN to secure your withdrawals." : "Your account is ready."}
                </p>
              </div>

              {onboardingStep === 1 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[#1A1A1A]">Legal Full Name</label>
                    <input
                      type="text"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full h-[60px] bg-[#F4F4F4] rounded-[16px] px-4 text-[18px] font-medium text-[#1A1A1A] outline-none border-2 border-transparent focus:border-[#1A1A1A] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-[#1A1A1A]">Employee ID</label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      placeholder="e.g. EMP-12345"
                      className="w-full h-[60px] bg-[#F4F4F4] rounded-[16px] px-4 text-[18px] font-medium text-[#1A1A1A] outline-none border-2 border-transparent focus:border-[#1A1A1A] transition-colors"
                    />
                  </div>
                </div>
              )}

              {onboardingStep === 2 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="flex gap-4">
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className={`w-6 h-6 rounded-full transition-all duration-300 ${authPin.length > i ? 'bg-[#27A163] scale-110' : 'bg-[#E5E7EB]'}`} />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-12 w-full max-w-[280px]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          if (authPin.length < 4) {
                            setAuthPin(prev => prev + num.toString())
                          }
                        }}
                        className="w-16 h-16 rounded-full bg-[#F4F4F4] flex items-center justify-center text-[24px] font-medium text-[#1A1A1A] active:bg-gray-200"
                      >
                        {num}
                      </button>
                    ))}
                    <div />
                    <button
                      onClick={() => {
                        if (authPin.length < 4) {
                          setAuthPin(prev => prev + "0")
                        }
                      }}
                      className="w-16 h-16 rounded-full bg-[#F4F4F4] flex items-center justify-center text-[24px] font-medium text-[#1A1A1A] active:bg-gray-200"
                    >
                      0
                    </button>
                    <button
                      onClick={() => setAuthPin(prev => prev.slice(0, -1))}
                      className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center active:bg-gray-100"
                    >
                      <X className="w-6 h-6 text-[#1A1A1A]" />
                    </button>
                  </div>
                </div>
              )}

              {onboardingStep === 3 && (
                <div className="flex flex-col items-center justify-center py-12">
                   <div className="w-24 h-24 bg-[#27A163]/10 rounded-full flex items-center justify-center mb-6">
                     <CheckCircle className="w-12 h-12 text-[#27A163]" />
                   </div>
                   <h2 className="text-[24px] font-bold text-[#1A1A1A] text-center mb-2">Employer Linked</h2>
                   <p className="text-[16px] font-medium text-[#666666] text-center max-w-[80%]">We&apos;ve securely connected to your payroll. You can now access earned wages.</p>
                </div>
              )}
            </div>

            <div className="p-6 shrink-0 bg-white">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (onboardingStep === 1) {
                    if (employeeName && employeeId) setOnboardingStep(2)
                  } else if (onboardingStep === 2) {
                    if (authPin.length === 4) setOnboardingStep(3)
                  } else {
                    navigateTo("HOME")
                  }
                }}
                className={`w-full h-[60px] rounded-full flex items-center justify-center text-[18px] font-bold text-white transition-colors ${(onboardingStep === 1 && (!employeeName || !employeeId)) || (onboardingStep === 2 && authPin.length < 4) ? 'bg-gray-300' : 'bg-[#27A163]'}`}
              >
                {onboardingStep === 3 ? "Enter Dashboard" : "Continue"}
              </motion.button>
            </div>
          </motion.div>
        )}

        {appState === "HOME" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#F9FAFB] z-10 flex flex-col pt-[max(env(safe-area-inset-top),24px)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#1A1A1A]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-[#666666]">Welcome back,</span>
                  <span className="text-[16px] font-bold text-[#1A1A1A]">{employeeName || "Employee"}</span>
                </div>
              </div>
              <button
                onClick={() => navigateTo("ACTIVITY")}
                className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <HistoryIcon className="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-2 flex flex-col gap-4 min-h-0">
              {/* Earned Balance Bento Box */}
              <div className="bg-[#1A1A1A] rounded-[24px] p-6 flex flex-col relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#27A163]/20 rounded-full blur-xl -ml-8 -mb-8 pointer-events-none" />

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-white/70 mb-1">Available Earned Wages</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[32px] font-extrabold text-white tracking-tight">
                        {isBalanceVisible ? `$${formatAmount(earnedBalance.toString())}` : "••••••"}
                      </span>
                      <button
                        onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        {isBalanceVisible ? <EyeOff className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white/10 rounded-[12px] p-3 relative z-10 w-fit">
                  <Briefcase className="w-4 h-4 text-[#27A163]" />
                  <span className="text-[13px] font-medium text-white/90">Employer Data Synced</span>
                </div>
              </div>

              {/* Main Actions */}
              <div className="grid grid-cols-1 gap-4 mt-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo("ACCESS_WAGES")}
                  className="bg-white p-5 rounded-[20px] shadow-sm flex items-center justify-between group border border-gray-100 hover:border-[#27A163]/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#27A163]/10 rounded-[14px] flex items-center justify-center">
                      <ArrowDownToLine className="w-6 h-6 text-[#27A163]" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[16px] font-bold text-[#1A1A1A]">Access Wages</span>
                      <span className="text-[13px] font-medium text-[#666666]">Transfer to your bank</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#27A163] transition-colors" />
                </motion.button>
              </div>

              {/* Recent Activity Mini */}
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-[16px] font-bold text-[#1A1A1A]">Recent Activity</h3>
                  <button onClick={() => navigateTo("ACTIVITY")} className="text-[14px] font-bold text-[#27A163]">See all</button>
                </div>
                <div className="bg-white rounded-[20px] p-2 shadow-sm border border-gray-100 flex flex-col">
                  {transactions.slice(0, 2).map((tx, i) => (
                    <div key={tx.id} className={`flex items-center justify-between p-3 ${i !== transactions.slice(0,2).length - 1 ? 'border-b border-gray-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'advance' ? 'bg-[#27A163]/10' : 'bg-gray-100'}`}>
                          {tx.type === 'advance' ? <ArrowDownToLine className="w-5 h-5 text-[#27A163]" /> : <CheckCircle className="w-5 h-5 text-gray-500" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] font-bold text-[#1A1A1A]">{tx.description}</span>
                          <span className="text-[13px] font-medium text-[#666666]">{tx.date}</span>
                        </div>
                      </div>
                      <span className={`text-[15px] font-bold ${tx.type === 'advance' ? 'text-[#1A1A1A]' : 'text-[#666666]'}`}>
                        {tx.type === 'advance' ? '+' : '-'}${tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {appState === "ACCESS_WAGES" && (
          <motion.div
            key="access_wages"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-white z-20 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="h-[60px] w-full flex items-center px-4 relative shrink-0">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 min-h-0 relative">
               <div className="flex flex-col items-center text-center absolute top-4">
                 <span className="text-[14px] font-bold text-[#666666] mb-2 uppercase tracking-wider">Access Amount</span>
                 <div className="flex items-center justify-center h-[80px]">
                   <span className={`font-extrabold text-[#1A1A1A] tracking-tighter ${getAmountFontSize(accessAmount)}`}>
                     ${formatAmount(accessAmount)}
                   </span>
                 </div>
                 <span className="text-[14px] font-medium text-[#666666] mt-4">
                   Available: ${formatAmount(earnedBalance.toString())}
                 </span>
               </div>
            </div>

            {/* Custom On-Screen Keypad */}
            <div className="shrink-0 bg-white pb-6 pt-2">
              <div className="grid grid-cols-3 gap-x-6 gap-y-4 px-8 w-full max-w-[320px] mx-auto mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeypadPress(num.toString())}
                    className="h-16 rounded-full bg-white flex items-center justify-center text-[28px] font-semibold text-[#1A1A1A] hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    {num}
                  </button>
                ))}
                <div />
                <button
                  onClick={() => handleKeypadPress("0")}
                  className="h-16 rounded-full bg-white flex items-center justify-center text-[28px] font-semibold text-[#1A1A1A] hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  0
                </button>
                <button
                  onClick={() => handleKeypadPress("backspace")}
                  className="h-16 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <X className="w-7 h-7 text-[#1A1A1A]" />
                </button>
              </div>

              <div className="px-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const amount = Number(accessAmount);
                    if (amount > 0 && amount <= earnedBalance) {
                      navigateTo("CONFIRMATION");
                    }
                  }}
                  className={`w-full h-[60px] rounded-full flex items-center justify-center text-[18px] font-bold text-white transition-colors ${
                    Number(accessAmount) > 0 && Number(accessAmount) <= earnedBalance ? 'bg-[#27A163]' : 'bg-gray-300'
                  }`}
                >
                  Continue
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {appState === "CONFIRMATION" && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-[#F9FAFB] z-30 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="h-[60px] w-full flex items-center px-4 relative shrink-0 bg-white shadow-sm border-b border-gray-100">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">Confirm Transfer</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 min-h-0">
               <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center">
                  <span className="text-[14px] font-medium text-[#666666] mb-2">Accessing</span>
                  <span className="text-[48px] font-extrabold text-[#1A1A1A] tracking-tight mb-6">
                    ${formatAmount(accessAmount)}
                  </span>

                  <div className="w-full h-px bg-gray-100 mb-6" />

                  <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[15px] font-medium text-[#666666]">Fee</span>
                      <span className="text-[15px] font-bold text-[#1A1A1A]">$3.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[15px] font-medium text-[#666666]">Deduction Date</span>
                      <span className="text-[15px] font-bold text-[#1A1A1A]">Next Payday</span>
                    </div>
                  </div>
               </div>

               <div className="bg-white/50 rounded-[16px] p-4 border border-gray-100">
                 <p className="text-[13px] font-medium text-[#666666] text-center leading-relaxed">
                   By confirming, ${formatAmount((Number(accessAmount) + 3).toString())} will be automatically deducted from your next paycheck.
                 </p>
               </div>
            </div>

            <div className="p-6 shrink-0 bg-white">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEnteredPin("");
                  navigateTo("AUTHORIZATION");
                }}
                className="w-full h-[60px] rounded-full flex items-center justify-center text-[18px] font-bold text-white transition-colors bg-[#27A163]"
              >
                Confirm Transfer
              </motion.button>
            </div>
          </motion.div>
        )}

        {appState === "AUTHORIZATION" && (
          <motion.div
            key="authorization"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-40 flex flex-col justify-end"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full bg-white rounded-t-[32px] pt-8 pb-[env(safe-area-inset-bottom)] px-6 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                 <div>
                   <h2 className="text-[24px] font-bold text-[#1A1A1A]">Enter PIN</h2>
                   <p className="text-[15px] font-medium text-[#666666] mt-1">To authorize ${formatAmount(accessAmount)} transfer</p>
                 </div>
                 <button onClick={goBack} className="p-2 -mr-2 bg-[#F4F4F4] rounded-full">
                    <X className="w-5 h-5 text-[#1A1A1A]" />
                 </button>
              </div>

              <div className="flex gap-4 justify-center py-6 mb-4">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`w-5 h-5 rounded-full transition-all duration-300 ${enteredPin.length > i ? 'bg-[#1A1A1A] scale-110' : 'bg-[#E5E7EB]'}`} />
                ))}
              </div>

              {isAuthorizing ? (
                 <div className="h-[280px] flex flex-col items-center justify-center">
                   <div className="w-12 h-12 border-4 border-[#F4F4F4] border-t-[#27A163] rounded-full animate-spin mb-4" />
                   <p className="text-[16px] font-medium text-[#666666]">Authorizing...</p>
                 </div>
              ) : (
                <div className="grid grid-cols-3 gap-x-8 gap-y-4 max-w-[280px] mx-auto pb-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        if (enteredPin.length < 4) {
                          const newPin = enteredPin + num.toString();
                          setEnteredPin(newPin);
                          if (newPin.length === 4) {
                            if (newPin === authPin) {
                              setIsAuthorizing(true);
                              setTimeout(() => {
                                setIsAuthorizing(false);
                                setEarnedBalance(prev => prev - Number(accessAmount));
                                navigateTo("SUCCESS");
                              }, 1500);
                            } else {
                              setTimeout(() => setEnteredPin(""), 300);
                            }
                          }
                        }
                      }}
                      className="w-16 h-16 rounded-full bg-[#F4F4F4] flex items-center justify-center text-[24px] font-medium text-[#1A1A1A] active:bg-gray-200"
                    >
                      {num}
                    </button>
                  ))}
                  <div />
                  <button
                    onClick={() => {
                      if (enteredPin.length < 4) {
                        const newPin = enteredPin + "0";
                        setEnteredPin(newPin);
                        if (newPin.length === 4) {
                          if (newPin === authPin) {
                            setIsAuthorizing(true);
                            setTimeout(() => {
                              setIsAuthorizing(false);
                              setEarnedBalance(prev => prev - Number(accessAmount));
                              navigateTo("SUCCESS");
                            }, 1500);
                          } else {
                            setTimeout(() => setEnteredPin(""), 300);
                          }
                        }
                      }
                    }}
                    className="w-16 h-16 rounded-full bg-[#F4F4F4] flex items-center justify-center text-[24px] font-medium text-[#1A1A1A] active:bg-gray-200"
                  >
                    0
                  </button>
                  <button
                    onClick={() => setEnteredPin(prev => prev.slice(0, -1))}
                    className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center active:bg-gray-100"
                  >
                    <X className="w-6 h-6 text-[#1A1A1A]" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {appState === "SUCCESS" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute inset-0 bg-[#27A163] z-50 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, damping: 20 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8"
              >
                <CheckCircle className="w-12 h-12 text-[#27A163]" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[32px] font-extrabold text-white text-center mb-2"
              >
                Transfer Initiated
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[18px] font-medium text-white/90 text-center mb-12"
              >
                ${formatAmount(accessAmount)} is on its way to your bank.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="p-6 shrink-0 bg-transparent"
            >
              <button
                onClick={() => {
                  setAccessAmount("");
                  setTransactions(prev => [{
                    id: Date.now(),
                    type: "advance",
                    amount: accessAmount,
                    description: "Early Wage Access",
                    date: "Just now",
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                  }, ...prev]);
                  navigateTo("HOME");
                }}
                className="w-full h-[60px] rounded-full flex items-center justify-center text-[18px] font-bold text-[#27A163] bg-white transition-transform active:scale-95"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}

        {appState === "ACTIVITY" && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className="absolute inset-0 bg-[#F9FAFB] z-20 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100dvh]"
          >
            <div className="h-[60px] w-full flex items-center px-4 relative shrink-0 bg-white border-b border-gray-100 shadow-sm">
              <button onClick={goBack} className="absolute left-4 p-2 -ml-2 bg-[#F4F4F4] rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-[#1A1A1A]" />
              </button>
              <h2 className="w-full text-center text-[18px] font-bold text-[#1A1A1A]">Activity Feed</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${tx.type === 'advance' ? 'bg-[#27A163]/10' : 'bg-gray-100'}`}>
                       {tx.type === 'advance' ? <ArrowDownToLine className="w-6 h-6 text-[#27A163]" /> : <CheckCircle className="w-6 h-6 text-gray-500" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-[#1A1A1A]">{tx.description}</span>
                      <span className="text-[13px] font-medium text-[#666666]">{tx.date} • {tx.time}</span>
                    </div>
                  </div>
                  <span className={`text-[16px] font-bold ${tx.type === 'advance' ? 'text-[#1A1A1A]' : 'text-[#666666]'}`}>
                    {tx.type === 'advance' ? '+' : '-'}${tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
