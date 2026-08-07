"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Calendar,
  MapPin,
  Layers,
  DollarSign,
  Users,
  TrendingDown,
  ShieldCheck,
  Zap,
  Sparkles,
  Package,
  Globe2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

// Define shipping routes data
interface ShippingRoute {
  id: string;
  from: string;
  fromFlag: string;
  to: string;
  toFlag: string;
  nextDate: string;
  deadlineDate: string;
  basePricePerKg: number;
  savingsRatio: number; // e.g. 0.6 means 60% cheaper than standard shipping
  activeShippers: number;
}

const SH_ROUTES: ShippingRoute[] = [
  {
    id: "de-tz",
    from: "Germany",
    fromFlag: "🇩🇪",
    to: "Tanzania",
    toFlag: "🇹🇿",
    nextDate: "20 September",
    deadlineDate: "5 September",
    basePricePerKg: 4.5,
    savingsRatio: 0.65,
    activeShippers: 42,
  },
  {
    id: "uk-ke",
    from: "United Kingdom",
    fromFlag: "🇬🇧",
    to: "Kenya",
    toFlag: "🇰🇪",
    nextDate: "25 September",
    deadlineDate: "10 September",
    basePricePerKg: 5.0,
    savingsRatio: 0.60,
    activeShippers: 58,
  },
  {
    id: "fr-sn",
    from: "France",
    fromFlag: "🇫🇷",
    to: "Senegal",
    toFlag: "🇸🇳",
    nextDate: "28 September",
    deadlineDate: "12 September",
    basePricePerKg: 4.2,
    savingsRatio: 0.70,
    activeShippers: 31,
  },
  {
    id: "ca-gh",
    from: "Canada",
    fromFlag: "🇨🇦",
    to: "Ghana",
    toFlag: "🇬🇭",
    nextDate: "30 September",
    deadlineDate: "15 September",
    basePricePerKg: 5.5,
    savingsRatio: 0.55,
    activeShippers: 47,
  }
];

// Seed recent community activity
interface Activity {
  id: number;
  name: string;
  route: string;
  weight: number;
  saved: number;
  time: string;
}

const INITIAL_ACTIVITIES: Activity[] = [
  { id: 1, name: "Amina K.", route: "Germany → Tanzania", weight: 4, saved: 48, time: "2 mins ago" },
  { id: 2, name: "David M.", route: "UK → Kenya", weight: 12, saved: 154, time: "15 mins ago" },
  { id: 3, name: "Mariam S.", route: "France → Senegal", weight: 7, saved: 92, time: "42 mins ago" },
  { id: 4, name: "Kofi B.", route: "Canada → Ghana", weight: 3, saved: 35, time: "1 hour ago" },
];

export default function Home() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>("de-tz");
  const [weight, setWeight] = useState<number>(5);
  const [itemName, setItemName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Interactive Booking Form State: idle, loading, success
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);

  // Auto-generate activity simulation over time
  useEffect(() => {
    const names = ["Sarah L.", "Emmanuel T.", "Grace O.", "Mussa J.", "Sophia N.", "Chloe V."];
    const routes = ["Germany → Tanzania", "UK → Kenya", "France → Senegal", "Canada → Ghana"];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomRoute = routes[Math.floor(Math.random() * routes.length)];
      const randomWeight = Math.floor(Math.random() * 15) + 1;
      const basePerKg = 5;
      const saved = Math.round(randomWeight * basePerKg * 2.2);

      const newActivity: Activity = {
        id: Date.now(),
        name: randomName,
        route: randomRoute,
        weight: randomWeight,
        saved,
        time: "Just now"
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 15000); // add new fake user interaction every 15s

    return () => clearInterval(interval);
  }, []);

  const activeRoute = SH_ROUTES.find(r => r.id === selectedRouteId) || SH_ROUTES[0];

  // Price calculations:
  // Standard expensive individual cargo rate is estimated around 3x the collective rate
  const standardCost = Math.round(weight * activeRoute.basePricePerKg * 3.1);
  const diaspediaCost = Math.round(weight * activeRoute.basePricePerKg);
  const totalSavings = standardCost - diaspediaCost;

  const handleJoinShipmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;

    setFormState("loading");

    // Elegant inline UI delay
    setTimeout(() => {
      setFormState("success");

      // Add custom new activity on top
      const newActivity: Activity = {
        id: Date.now(),
        name: email.split("@")[0].substring(0, 10) + "...",
        route: `${activeRoute.from} → ${activeRoute.to}`,
        weight: weight,
        saved: totalSavings,
        time: "Just now"
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 1800);
  };

  const resetForm = () => {
    setItemName("");
    setEmail("");
    setPhone("");
    setFormState("idle");
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-diaspedia-bg font-sans selection:bg-diaspedia-primary selection:text-diaspedia-text">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <FadeIn className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-diaspedia-primary/10 border border-diaspedia-primary/20 text-xs font-semibold text-diaspedia-accent mb-6">
            <Sparkles size={12} className="animate-pulse" />
            Cheaper cross-border shipping for global communities
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] text-diaspedia-text mb-6">
            Together, we make <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-diaspedia-text via-diaspedia-accent to-diaspedia-text">cross-border cheaper.</span>
          </h1>
          <p className="text-lg md:text-xl text-diaspedia-text-muted max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            People abroad often miss products from home, but shipping alone is too expensive. We group shipment dates and combine orders to unlock massive savings for everyone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#shipments">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="bg-diaspedia-primary text-diaspedia-text px-8 py-4 rounded-full text-lg font-bold flex items-center gap-2 shadow-lg shadow-diaspedia-primary/15 hover:bg-diaspedia-accent transition-all cursor-pointer"
              >
                Browse Active Routes <ArrowRight size={20} />
              </motion.button>
            </Link>
            <Link href="#how-it-works">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border border-black/5 text-diaspedia-text px-8 py-4 rounded-full text-lg font-semibold hover:bg-zinc-50 transition-colors shadow-sm"
              >
                Learn How it Works
              </motion.button>
            </Link>
          </div>
        </FadeIn>

        {/* Floating abstract stats/proof elements */}
        <FadeIn delay={0.2} className="w-full mt-16 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
            <div className="text-center p-2">
              <div className="text-3xl font-bold tracking-tight text-diaspedia-text">65%</div>
              <div className="text-xs text-diaspedia-text-muted mt-1 uppercase font-semibold tracking-wider">Avg. Shipping Savings</div>
            </div>
            <div className="text-center border-l border-black/5 p-2">
              <div className="text-3xl font-bold tracking-tight text-diaspedia-text">4 Routes</div>
              <div className="text-xs text-diaspedia-text-muted mt-1 uppercase font-semibold tracking-wider">Continental Paths</div>
            </div>
            <div className="text-center border-l border-black/5 p-2">
              <div className="text-3xl font-bold tracking-tight text-diaspedia-text">€12k+</div>
              <div className="text-xs text-diaspedia-text-muted mt-1 uppercase font-semibold tracking-wider">Member Savings</div>
            </div>
            <div className="text-center border-l border-black/5 p-2">
              <div className="text-3xl font-bold tracking-tight text-diaspedia-text">100%</div>
              <div className="text-xs text-diaspedia-text-muted mt-1 uppercase font-semibold tracking-wider">Secure Movement</div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Active Routes Showcase */}
      <section id="shipments" className="py-24 px-6 md:px-12 bg-white border-y border-black/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-diaspedia-text">Active Schedules</h2>
            <p className="text-lg text-diaspedia-text-muted">
              Select one of our regular global shipping schedules. The more people who join before the deadline, the more standard rates drop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {SH_ROUTES.map((route) => {
              const isSelected = selectedRouteId === route.id;
              return (
                <motion.div
                  key={route.id}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => {
                    setSelectedRouteId(route.id);
                    // scroll to join form smoothly on mobile
                    if (window.innerWidth < 768) {
                      document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? "bg-diaspedia-text text-white shadow-xl ring-2 ring-diaspedia-primary"
                      : "bg-diaspedia-bg text-diaspedia-text border border-black/5 hover:border-black/10"
                  }`}
                >
                  <div>
                    {/* Top Flags & Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-xl font-bold">
                        <span>{route.fromFlag}</span>
                        <ArrowRight size={14} className={isSelected ? "text-diaspedia-primary" : "text-diaspedia-accent"} />
                        <span>{route.toFlag}</span>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isSelected ? "bg-white/10 text-diaspedia-primary" : "bg-white text-diaspedia-accent shadow-sm border border-black/5"
                      }`}>
                        {route.activeShippers} Shippers Joined
                      </span>
                    </div>

                    {/* Routing Details */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className={`text-[10px] uppercase tracking-wider font-semibold ${isSelected ? "text-zinc-400" : "text-diaspedia-text-muted"}`}>Route Path</div>
                        <div className="text-sm font-bold">{route.from} to {route.to}</div>
                      </div>

                      <div className="flex gap-4">
                        <div>
                          <div className={`text-[10px] uppercase tracking-wider font-semibold ${isSelected ? "text-zinc-400" : "text-diaspedia-text-muted"}`}>Shipment Date</div>
                          <div className="text-sm font-bold flex items-center gap-1.5 mt-0.5">
                            <Calendar size={13} className="opacity-70" />
                            {route.nextDate}
                          </div>
                        </div>
                        <div>
                          <div className={`text-[10px] uppercase tracking-wider font-semibold ${isSelected ? "text-zinc-400" : "text-diaspedia-text-muted"}`}>Join Before</div>
                          <div className="text-sm font-bold text-rose-500 flex items-center gap-1.5 mt-0.5">
                            <AlertCircle size={13} className="opacity-70" />
                            {route.deadlineDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing details */}
                  <div className="pt-4 border-t border-black/5 mt-auto">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className={`text-[10px] uppercase tracking-wider font-semibold ${isSelected ? "text-zinc-400" : "text-diaspedia-text-muted"}`}>Base Price</div>
                        <div className="text-lg font-extrabold">€{route.basePricePerKg.toFixed(2)}<span className="text-xs font-normal text-zinc-400">/kg</span></div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-500 font-extrabold text-sm flex items-center gap-0.5">
                          <TrendingDown size={14} />
                          {Math.round(route.savingsRatio * 100)}% cheaper
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Calculator and Dynamic Group Submission Form */}
          <div id="join-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8 pt-8">

            {/* Calculator Column */}
            <div className="lg:col-span-5 bg-diaspedia-bg rounded-3xl p-8 border border-black/5">
              <h3 className="text-xl font-bold tracking-tight text-diaspedia-text mb-4">Savings Estimator</h3>
              <p className="text-sm text-diaspedia-text-muted mb-8 leading-relaxed">
                Estimate how much you save by shipping combined with the community instead of paying solo courier fees.
              </p>

              {/* Range Input for Weight */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-bold">
                  <span>Package Weight:</span>
                  <span className="text-diaspedia-accent">{weight} kg</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-diaspedia-accent"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 font-medium">
                  <span>1 kg (Sachet/Spices)</span>
                  <span>15 kg</span>
                  <span>30 kg (Box/Bulk)</span>
                </div>
              </div>

              {/* Live Price Comparison Cards */}
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-black/5 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-diaspedia-text-muted font-semibold">Standard Courier (Alone)</div>
                    <div className="text-sm font-bold text-zinc-400 line-through mt-0.5">€{standardCost.toFixed(2)}</div>
                  </div>
                  <div className="text-xs text-zinc-400 italic">Extremely expensive</div>
                </div>

                <div className="bg-white p-4 rounded-xl border-2 border-diaspedia-primary flex justify-between items-center relative overflow-hidden">
                  <div className="absolute right-0 top-0 bg-diaspedia-primary text-diaspedia-text text-[9px] uppercase font-black px-2 py-0.5 rounded-bl">
                    Cheaper
                  </div>
                  <div>
                    <div className="text-xs text-diaspedia-text font-semibold flex items-center gap-1">
                      <Users size={12} className="text-diaspedia-accent" />
                      Diaspedia Rate (Combined)
                    </div>
                    <div className="text-lg font-black text-diaspedia-text mt-0.5">€{diaspediaCost.toFixed(2)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-diaspedia-text-muted font-medium">You Save</div>
                    <div className="text-base font-extrabold text-emerald-600">€{totalSavings.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Safety Badges */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-black/5 text-[11px] text-diaspedia-text-muted font-semibold">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  No Hidden Fee
                </div>
                <div className="flex items-center gap-1">
                  <Globe2 size={14} className="text-blue-500" />
                  Full Customs Clearance
                </div>
              </div>
            </div>

            {/* Interaction Form Column */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
              <h3 className="text-2xl font-bold tracking-tight text-diaspedia-text mb-2">Join shipment route</h3>
              <p className="text-sm text-diaspedia-text-muted mb-6 leading-relaxed">
                Confirm your spot on the <span className="font-bold text-diaspedia-text">{activeRoute.from} to {activeRoute.to}</span> shipment. We group cargo securement and match you with travelers and freight networks.
              </p>

              <AnimatePresence mode="wait">
                {formState === "idle" && (
                  <motion.form
                    key="form-idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleJoinShipmentSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-diaspedia-text-muted mb-1.5">Selected Route</label>
                      <select
                        value={selectedRouteId}
                        onChange={(e) => setSelectedRouteId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-diaspedia-primary focus:ring-1 focus:ring-diaspedia-primary outline-none transition-all font-semibold"
                      >
                        {SH_ROUTES.map(r => (
                          <option key={r.id} value={r.id}>{r.fromFlag} {r.from} to {r.toFlag} {r.to} (Departs {r.nextDate})</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-diaspedia-text-muted mb-1.5">What are you sending/receiving?</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Spices, Books, Clothing"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-diaspedia-primary focus:ring-1 focus:ring-diaspedia-primary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-diaspedia-text-muted mb-1.5">Approx. Weight (kg)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="100"
                          value={weight}
                          onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-diaspedia-primary focus:ring-1 focus:ring-diaspedia-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-diaspedia-text-muted mb-1.5">Your Email</label>
                        <input
                          type="email"
                          required
                          placeholder="name@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-diaspedia-primary focus:ring-1 focus:ring-diaspedia-primary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-diaspedia-text-muted mb-1.5">Phone (WhatsApp preferred)</label>
                        <input
                          type="tel"
                          required
                          placeholder="+49 123 45678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-diaspedia-primary focus:ring-1 focus:ring-diaspedia-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full py-4 rounded-xl bg-diaspedia-text text-white font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6"
                    >
                      <Package size={18} className="text-diaspedia-primary" />
                      Join Shipment & Save €{totalSavings}
                    </motion.button>
                  </motion.form>
                )}

                {formState === "loading" && (
                  <motion.div
                    key="form-loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-12 h-12 border-4 border-diaspedia-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-bold text-diaspedia-text text-lg">Bundling Shipment Opportunity...</p>
                    <p className="text-sm text-diaspedia-text-muted mt-2">Connecting to logistics group rates...</p>
                  </motion.div>
                )}

                {formState === "success" && (
                  <motion.div
                    key="form-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 text-center flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mb-6">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="text-2xl font-bold tracking-tight text-diaspedia-text mb-2">You are officially in!</h4>
                    <p className="text-sm text-diaspedia-text-muted max-w-md leading-relaxed mb-6">
                      We have secured your spot for <span className="font-bold text-diaspedia-text">{weight} kg</span> on the <span className="font-bold text-diaspedia-text">{activeRoute.from} to {activeRoute.to}</span> route departing <span className="font-bold text-diaspedia-text">{activeRoute.nextDate}</span>.
                    </p>

                    {/* Interactive success recipe */}
                    <div className="bg-diaspedia-bg rounded-2xl p-6 w-full max-w-sm border border-black/5 text-left mb-8 space-y-3">
                      <div className="flex justify-between text-xs font-bold border-b border-black/5 pb-2">
                        <span className="text-zinc-400">DETAIL SUMMARY</span>
                        <span className="text-emerald-500 font-extrabold uppercase">Est. Saving: €{totalSavings}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-diaspedia-text-muted">Item Type:</span>
                        <span className="font-bold text-diaspedia-text">{itemName || "Unspecified"}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-diaspedia-text-muted">Total Weight:</span>
                        <span className="font-bold text-diaspedia-text">{weight} kg</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-diaspedia-text-muted">Estimated Rate:</span>
                        <span className="font-bold text-diaspedia-text">€{diaspediaCost}</span>
                      </div>
                    </div>

                    <p className="text-xs text-diaspedia-text-muted max-w-sm mb-6">
                      Our coordinator will reach out to you via email (<span className="font-bold">{email}</span>) or WhatsApp within 2 hours with label printing instructions and local collection points.
                    </p>

                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-full bg-diaspedia-bg text-diaspedia-text font-bold text-sm border border-black/5 hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      Join Another Route
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Community Trusted Activity Feed */}
      <section className="py-20 px-6 md:px-12 bg-diaspedia-bg">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-[11px] font-bold text-emerald-700 mb-4">
            <Zap size={11} />
            Live Shipment Hub Activity
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-diaspedia-text mb-2">People are joining together</h2>
          <p className="text-sm text-diaspedia-text-muted max-w-md mx-auto">
            See other community members saving on global routes right now. We combine all of this into unified cargo space.
          </p>
        </div>

        {/* Live list layout with Framer Motion slide reveals */}
        <div className="max-w-2xl mx-auto space-y-3">
          <AnimatePresence initial={false}>
            {activities.map((act) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-4 rounded-2xl border border-black/5 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-diaspedia-primary/15 text-diaspedia-accent flex items-center justify-center font-bold text-sm">
                    {act.name.substring(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-semibold flex items-center gap-1.5">
                      {act.time}
                      <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                      <span>{act.route}</span>
                    </div>
                    <div className="text-sm font-bold text-diaspedia-text mt-0.5">
                      {act.name} registered <span className="text-diaspedia-accent">{act.weight} kg</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400 font-medium">Saved</div>
                  <div className="text-sm font-black text-emerald-600">€{act.saved}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* "How It Works" FlixBus/Bolt Inspired Card Flow */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-diaspedia-text">Three Simple Steps</h2>
            <p className="text-lg text-diaspedia-text-muted">
              We focus on speed, simplicity, and complete trust. No complex shipping terms, just affordable shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1} className="bg-diaspedia-bg p-8 rounded-3xl border border-black/5 relative flex flex-col justify-between h-72">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-diaspedia-accent mb-6 font-black text-lg">
                01
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-diaspedia-text mb-2">Choose your route</h3>
                <p className="text-sm text-diaspedia-text-muted leading-relaxed">
                  Browse predefined departure schedules to your country and choose a date that fits your needs.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-diaspedia-bg p-8 rounded-3xl border border-black/5 relative flex flex-col justify-between h-72">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-diaspedia-accent mb-6 font-black text-lg">
                02
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-diaspedia-text mb-2">Reserve package weight</h3>
                <p className="text-sm text-diaspedia-text-muted leading-relaxed">
                  Enter your package weight and what you are sending. Our dynamic system calculates massive combined savings on the spot.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="bg-diaspedia-bg p-8 rounded-3xl border border-black/5 relative flex flex-col justify-between h-72">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-diaspedia-accent mb-6 font-black text-lg">
                03
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-diaspedia-text mb-2">Drop off and follow</h3>
                <p className="text-sm text-diaspedia-text-muted leading-relaxed">
                  Ship or bring your items to our designated local collection points. We handle all paperwork, customs clearance, and local routing.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Future Fintech Vision Block */}
      <section className="py-24 px-6 md:px-12 bg-diaspedia-text text-white relative overflow-hidden">
        {/* Decorative background grid elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#34D399_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-diaspedia-primary mb-6">
            <Globe2 size={12} />
            The Future of Cross-Border Fintech
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            A trusted bridge for diaspora finance
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            By building trust around the physical movement of products across borders, we are setting the stage for the next step. Our ultimate mission is to streamline payment rails, currency movement, and micro-transactions for diaspora families globally.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-zinc-400 font-semibold border-t border-white/10 pt-10">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-diaspedia-primary" /> Shared Cargo Space
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-diaspedia-primary" /> Zero-Fee Customs Coordination
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-diaspedia-primary" /> Future Cross-Border Wallet
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
