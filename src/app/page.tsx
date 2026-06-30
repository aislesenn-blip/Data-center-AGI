"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Activity, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [view, setView] = useState<"login" | "register" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      setIsLoading(false);
      if (view === "login" || view === "register") {
        router.push("/dashboard");
      } else {
        setView("login");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-8 gap-2">
           <div className="w-12 h-12 bg-[#111827] rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="text-white w-6 h-6" />
           </div>
           <h1 className="text-2xl font-bold text-[#111827] tracking-tight">DOOH Ads</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#111827] mb-1">
                  {view === "login" && "Sign in to your account"}
                  {view === "register" && "Create an account"}
                  {view === "forgot" && "Reset your password"}
                </h2>
                <p className="text-sm text-gray-500">
                  {view === "login" && "Enter your email and password to access the dashboard."}
                  {view === "register" && "Start launching your out-of-home campaigns today."}
                  {view === "forgot" && "Enter your email address and we'll send you a link to reset your password."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] focus:border-[#111827] outline-none transition-all text-sm bg-gray-50/50 focus:bg-white"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                {view !== "forgot" && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                       <label className="text-sm font-medium text-gray-700">Password</label>
                       {view === "login" && (
                         <button type="button" onClick={() => setView("forgot")} className="text-xs font-medium text-blue-600 hover:text-blue-700">
                           Forgot password?
                         </button>
                       )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#111827] focus:border-[#111827] outline-none transition-all text-sm bg-gray-50/50 focus:bg-white"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  type="submit"
                  className="w-full mt-6 bg-[#111827] hover:bg-gray-900 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed h-[44px]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {view === "login" && "Sign In"}
                      {view === "register" && "Create Account"}
                      {view === "forgot" && "Send Reset Link"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                {view === "login" && (
                  <>
                    Don&apos;t have an account?{" "}
                    <button onClick={() => setView("register")} className="font-medium text-[#111827] hover:underline">
                      Sign up
                    </button>
                  </>
                )}
                {view === "register" && (
                  <>
                    Already have an account?{" "}
                    <button onClick={() => setView("login")} className="font-medium text-[#111827] hover:underline">
                      Sign in
                    </button>
                  </>
                )}
                {view === "forgot" && (
                  <>
                    Remember your password?{" "}
                    <button onClick={() => setView("login")} className="font-medium text-[#111827] hover:underline">
                      Back to sign in
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
