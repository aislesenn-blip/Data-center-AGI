"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
  Users,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Coins,
  HeartHandshake,
  Send,
  Home as HomeIcon,
  Calendar,
  Layers,
  History,
  User,
  Plus,
  Trash2,
  Package,
  Sparkles,
  Search,
  ChevronLeft,
  X,
  CreditCard,
  MapPin,
  Menu,
  X as XIcon,
  Info
} from "lucide-react";

import {
  Route,
  ShippingItem,
  JoinedOrder,
  ROUTES,
  ITEM_CATEGORIES,
  INITIAL_ORDERS,
  FAQS
} from "@/lib/diaspediaData";

export default function Home() {
  // Mobile navigation tabs
  const [activeTab, setActiveTab] = useState<"home" | "shipments" | "orders" | "profile">("home");

  // State management for current mock orders
  const [orders, setOrders] = useState<JoinedOrder[]>(INITIAL_ORDERS);

  // Router selection & interactive pricing calculator state
  const [selectedRoute, setSelectedRoute] = useState<Route>(ROUTES[0]);
  const [calcItems, setCalcItems] = useState<ShippingItem[]>([
    { name: "Family study textbooks", category: "Books & Study Materials", weight: 3.0 }
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState(ITEM_CATEGORIES[0].name);
  const [newItemWeight, setNewItemWeight] = useState<number>(1.0);

  // FAQ interactive state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form Join Shipment Modal State
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "doorstep">("pickup");
  const [modalStep, setModalStep] = useState<"form" | "loading" | "success">("form");
  const [justJoinedOrder, setJustJoinedOrder] = useState<JoinedOrder | null>(null);

  // Calculate pricing based on items and selected route
  const totalWeight = calcItems.reduce((acc, item) => acc + item.weight, 0);

  // Calculate price based on item category multipliers
  const calculateTotalPrice = () => {
    return calcItems.reduce((acc, item) => {
      const cat = ITEM_CATEGORIES.find(c => c.name === item.category);
      const mult = cat ? cat.weightMultiplier : 1.0;
      return acc + (item.weight * selectedRoute.basePricePerKg * mult);
    }, 0);
  };

  const calculateSoloPrice = () => {
    return calcItems.reduce((acc, item) => {
      return acc + (item.weight * selectedRoute.soloPricePerKg);
    }, 0);
  };

  const currentPrice = calculateTotalPrice();
  const soloPrice = calculateSoloPrice();
  const totalSavings = soloPrice - currentPrice;

  // Add Item to Calculator
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || newItemWeight <= 0) return;

    const item: ShippingItem = {
      name: newItemName.trim(),
      category: newItemCategory,
      weight: Number(newItemWeight)
    };

    setCalcItems([...calcItems, item]);
    setNewItemName("");
    setNewItemWeight(1.0);
  };

  // Remove Item from Calculator
  const handleRemoveItem = (index: number) => {
    const updated = [...calcItems];
    updated.splice(index, 1);
    setCalcItems(updated);
  };

  // Open the join shipment modal
  const openJoinModal = () => {
    setModalStep("form");
    setIsJoinModalOpen(true);
  };

  // Handle the elegant multi-step modal submission
  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiverName.trim() || !receiverPhone.trim()) return;

    // Transition to loading animation
    setModalStep("loading");

    // Simulate reliable state progression with elegant timer
    setTimeout(() => {
      const newOrder: JoinedOrder = {
        id: `DP-${Math.floor(10000 + Math.random() * 90000)}`,
        routeId: selectedRoute.id,
        from: selectedRoute.from,
        to: selectedRoute.to,
        items: [...calcItems],
        receiverName: receiverName.trim(),
        receiverPhone: receiverPhone.trim(),
        deliveryMethod: deliveryMethod,
        totalWeight: totalWeight,
        calculatedPrice: currentPrice,
        calculatedSavings: totalSavings,
        status: "joined",
        joinDate: "Today",
        estimatedDelivery: selectedRoute.nextShipment === "20 September" ? "25 September" : "30 September"
      };

      setOrders([newOrder, ...orders]);
      setJustJoinedOrder(newOrder);
      setModalStep("success");
    }, 1800);
  };

  // Cancel order handler
  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col font-sans">

      {/* HEADER BAR */}
      <header className="border-b border-black/5 bg-brand-bg/80 backdrop-blur-md sticky top-0 z-40 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary text-black p-2 rounded-xl flex items-center justify-center font-black tracking-tight text-xl">
              d
            </div>
            <span className="text-2xl font-bold tracking-tighter text-brand-text">diaspedia</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-brand-text-muted hover:text-brand-text transition-colors">How it works</a>
            <a href="#vision" className="text-sm font-medium text-brand-text-muted hover:text-brand-text transition-colors">Fintech Vision</a>
            <a href="#faq" className="text-sm font-medium text-brand-text-muted hover:text-brand-text transition-colors">FAQs</a>
            <a href="/careers" className="text-sm font-medium text-brand-text-muted hover:text-brand-text transition-colors">Careers</a>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              Live Grouping Active
            </span>
          </div>
        </div>
      </header>

      {/* CORE LAYOUT CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* LEFT COLUMN: GORGEOUS DESKTOP PRESENTATION (Hidden on mobile simulator viewports, complementary on large screens) */}
        <div className="lg:col-span-7 space-y-12 pr-0 lg:pr-4">

          {/* Tagline & Brand Intro */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-black/[0.04] px-3 py-1 rounded-full text-xs font-medium text-brand-text-muted">
              <Sparkles size={14} className="text-brand-primary" />
              Shared-shipping Infrastructure
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] text-brand-text">
              Together, we make <br/>
              <span className="text-brand-text-muted font-normal">cross-border cheaper.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-text-muted max-w-xl leading-relaxed">
              diaspedia brings people together living abroad to get products from home safely and affordably. By coordinating schedules and combining demand, we lower the shipping barrier for everyone.
            </p>
          </div>

          {/* Copywriting Formula for Verticals */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-black/5 space-y-6">
            <h3 className="text-xs font-bold tracking-widest text-brand-text-muted uppercase">Our Core Formula</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <span className="text-brand-primary font-bold text-xl block">1</span>
                <p className="text-sm text-brand-text leading-relaxed">
                  <strong>Providers</strong> need reliable transport schedules on time.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-brand-primary font-bold text-xl block">2</span>
                <p className="text-sm text-brand-text leading-relaxed">
                  <strong>Customers</strong> need flexible cost shipping.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-brand-primary font-bold text-xl block">3</span>
                <p className="text-sm text-brand-text leading-relaxed">
                  <strong>We help</strong> them accept flexible group shipping without large individual fees.
                </p>
              </div>
            </div>
          </div>

          {/* Value Prop Icons (Bolt & Flixbus Clean Simplicity Inspired) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="how-it-works">
            <div className="flex gap-4">
              <div className="bg-brand-primary/10 text-brand-text-muted p-3 rounded-2xl h-12 w-12 flex items-center justify-center shrink-0">
                <Users size={22} className="text-brand-text" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-brand-text">Combined Demand</h4>
                <p className="text-sm text-brand-text-muted leading-relaxed">We schedule group departures. Instead of sending one small box, your items ship inside shared containers, cutting costs by up to 75%.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-brand-primary/10 text-brand-text-muted p-3 rounded-2xl h-12 w-12 flex items-center justify-center shrink-0">
                <Coins size={22} className="text-brand-text" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-brand-text">Guaranteed Low Prices</h4>
                <p className="text-sm text-brand-text-muted leading-relaxed">By packing together, we avoid minimum-weight cargo traps. You only pay for what you actually send or receive.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-brand-primary/10 text-brand-text-muted p-3 rounded-2xl h-12 w-12 flex items-center justify-center shrink-0">
                <ShieldCheck size={22} className="text-brand-text" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-brand-text">Complete Trust</h4>
                <p className="text-sm text-brand-text-muted leading-relaxed">We handle shipping, customs clearances, and safe local pickup points. Zero administrative headaches or surprise tax bills.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-brand-primary/10 text-brand-text-muted p-3 rounded-2xl h-12 w-12 flex items-center justify-center shrink-0">
                <Globe size={22} className="text-brand-text" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-brand-text">Global Fintech Future</h4>
                <p className="text-sm text-brand-text-muted leading-relaxed">Our ultimate path is global cross-border payments, credits, and capital assistance. Physical shipping is our trust foundation.</p>
              </div>
            </div>
          </div>

          {/* Long Term Fintech Vision Description */}
          <div className="border-t border-black/5 pt-10 space-y-4" id="vision">
            <h3 className="text-2xl font-bold tracking-tight text-brand-text">The Fintech Roadmap</h3>
            <p className="text-sm text-brand-text-muted leading-relaxed max-w-xl">
              Cross-border movement has always been a physical trust problem first. Traditional banks charge massive fees because they cannot prove transactional intent. By handling the physical transport route first, diaspedia maps real-world capital movement, allowing us to build the trust necessary to expand into seamless payments, remittance corridors, and money services.
            </p>
          </div>

          {/* Accordion FAQ Component */}
          <div className="border-t border-black/5 pt-10 space-y-6" id="faq">
            <h3 className="text-2xl font-bold tracking-tight text-brand-text flex items-center gap-2">
              <HelpCircle className="text-brand-primary" size={24} />
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white/40 border border-black/5 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-brand-text hover:text-brand-text/80 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 bg-black/5 rounded-full text-brand-text-muted">
                      {openFaqIndex === idx ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaqIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-5 pt-1 text-sm text-brand-text-muted leading-relaxed border-t border-black/[0.03]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Founder Section */}
          <div className="border-t border-black/5 pt-10 flex gap-6 items-start">
            <div className="w-12 h-12 bg-zinc-400 rounded-full shrink-0 flex items-center justify-center font-bold text-white text-lg">
              EM
            </div>
            <div className="space-y-2">
              <p className="text-sm italic text-brand-text-muted leading-relaxed">
                &ldquo;We are solving the hardest part of cross-border finance: physical trust. Moving goods safely, on a reliable combined schedule, brings diaspora families closer together while paving the path for next-generation international payment layers.&rdquo;
              </p>
              <h5 className="font-bold text-xs tracking-wider uppercase text-brand-text">Ernest Michael &mdash; Founder, diaspedia</h5>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: HIGH-END MOBILE-FIRST SIMULATOR */}
        <div className="lg:col-span-5 w-full flex justify-center sticky top-24">

          <div className="w-full max-w-[410px] aspect-[9/19] bg-zinc-950 rounded-[50px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[6px] border-zinc-800 relative overflow-hidden flex flex-col">

            {/* Phone Screen Notch / Speaker Area */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-950 rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-zinc-800 rounded-full"></div>
            </div>

            {/* Simulated Live Internal App Interface */}
            <div className="flex-1 bg-brand-bg rounded-[36px] overflow-hidden flex flex-col relative">

              {/* Internal App Navigation Header */}
              <div className="bg-white/80 backdrop-blur-md pt-7 pb-3 px-5 border-b border-black/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-brand-primary text-black flex items-center justify-center text-xs font-black rounded-lg">d</div>
                  <span className="font-black text-sm tracking-tight text-brand-text">diaspedia</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/[0.04] py-1 px-2.5 rounded-full text-[10px] font-bold text-brand-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                  Active Schedule
                </div>
              </div>

              {/* Scrollable Container for Tabs */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

                {/* 1. HOME TAB */}
                {activeTab === "home" && (
                  <div className="space-y-4">

                    {/* Welcome Banner */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold tracking-wider text-brand-text-muted uppercase">Welcome to diaspedia</span>
                      <h2 className="text-xl font-bold tracking-tight text-brand-text">Get anything from home, together.</h2>
                    </div>

                    {/* Step explanation cards */}
                    <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-2xl p-3 flex gap-2.5 items-center">
                      <Info size={16} className="text-brand-text shrink-0" />
                      <p className="text-[11px] text-brand-text leading-snug font-medium">
                        Select a route, add items, and join the schedule to split bulk container costs.
                      </p>
                    </div>

                    {/* Route Selector Cards */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold tracking-wider text-brand-text-muted uppercase px-1">1. Choose a Route</h3>

                      <div className="grid grid-cols-1 gap-2">
                        {ROUTES.map((route) => {
                          const isSelected = selectedRoute.id === route.id;
                          return (
                            <button
                              key={route.id}
                              onClick={() => setSelectedRoute(route)}
                              className={`text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                                isSelected
                                  ? "bg-white border-brand-primary shadow-sm"
                                  : "bg-white/40 border-black/5 hover:border-black/10"
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-[13px] text-brand-text">{route.from}</span>
                                  <span className="text-[11px] text-brand-text-muted">➔</span>
                                  <span className="font-bold text-[13px] text-brand-text">{route.to}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-brand-text-muted">
                                  <span>Route base: €{route.basePricePerKg}/kg</span>
                                  <span>•</span>
                                  <span className="text-brand-primary font-bold">Save ~70%</span>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="text-[10px] font-bold text-brand-text-muted">Next: {route.nextShipment}</div>
                                <div className="text-[9px] text-zinc-400 mt-0.5">Join by: {route.joinBefore}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interactive Item Weight Calculator */}
                    <div className="bg-white rounded-2xl border border-black/5 p-4 space-y-3.5">
                      <div className="flex items-center justify-between border-b border-black/[0.04] pb-2.5">
                        <h3 className="text-xs font-bold tracking-wider text-brand-text-muted uppercase">2. Add What You Are Sending</h3>
                        <span className="text-[10px] bg-brand-primary/10 text-brand-text font-bold px-1.5 py-0.5 rounded">
                          Route: {selectedRoute.fromCode}➔{selectedRoute.toCode}
                        </span>
                      </div>

                      {/* Add Item Form */}
                      <form onSubmit={handleAddItem} className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-brand-text-muted uppercase">Item Description</label>
                            <input
                              type="text"
                              value={newItemName}
                              onChange={(e) => setNewItemName(e.target.value)}
                              placeholder="e.g. Spices, Books, Clothes"
                              className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-primary"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-brand-text-muted uppercase">Weight (kg)</label>
                            <input
                              type="number"
                              step="0.1"
                              min="0.1"
                              value={newItemWeight}
                              onChange={(e) => setNewItemWeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
                              className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-primary"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-9 space-y-1">
                            <label className="text-[9px] font-bold text-brand-text-muted uppercase">Category</label>
                            <select
                              value={newItemCategory}
                              onChange={(e) => setNewItemCategory(e.target.value)}
                              className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-primary"
                            >
                              {ITEM_CATEGORIES.map((cat) => (
                                <option key={cat.name} value={cat.name}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-3 flex items-end">
                            <button
                              type="submit"
                              className="w-full bg-brand-primary text-black font-semibold text-xs py-1.5 rounded-lg flex items-center justify-center hover:bg-brand-primary-hover active:scale-95 transition-all h-[28px]"
                            >
                              <Plus size={14} /> Add
                            </button>
                          </div>
                        </div>
                      </form>

                      {/* Calculator Items List */}
                      {calcItems.length > 0 ? (
                        <div className="space-y-1.5 max-h-[140px] overflow-y-auto pt-1 border-t border-black/[0.02]">
                          {calcItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between bg-black/[0.02] p-2 rounded-lg text-xs">
                              <div className="truncate pr-2">
                                <div className="font-medium text-brand-text truncate">{item.name}</div>
                                <div className="text-[9px] text-brand-text-muted truncate">{item.category}</div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <span className="font-bold text-[11px]">{item.weight} kg</span>
                                <button
                                  onClick={() => handleRemoveItem(index)}
                                  className="text-red-500 hover:text-red-600 p-0.5"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-xs text-brand-text-muted bg-black/[0.01] rounded-xl border border-dashed border-black/5">
                          Add some items to calculate savings.
                        </div>
                      )}

                      {/* Pricing summary */}
                      {calcItems.length > 0 && (
                        <div className="pt-2 border-t border-black/5 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-brand-text-muted">Total Weight:</span>
                            <span className="font-bold">{totalWeight.toFixed(1)} kg</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <div className="bg-black/[0.03] p-2.5 rounded-xl">
                              <span className="text-[9px] font-semibold text-brand-text-muted uppercase block">Solo Cargo Cost</span>
                              <span className="text-xs font-bold line-through text-red-500">€{soloPrice.toFixed(2)}</span>
                            </div>

                            <div className="bg-brand-primary/10 p-2.5 rounded-xl border border-brand-primary/20">
                              <span className="text-[9px] font-semibold text-brand-text-muted uppercase block">Together Price</span>
                              <span className="text-sm font-black text-brand-text">€{currentPrice.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="bg-[#71E300]/10 border border-[#71E300]/30 rounded-xl p-2.5 flex items-center justify-between text-xs">
                            <span className="font-bold text-brand-text">Total Savings:</span>
                            <span className="font-black text-[#5ec700]">€{totalSavings.toFixed(2)} saved</span>
                          </div>

                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={openJoinModal}
                            className="w-full bg-brand-primary text-black font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-brand-primary/10 hover:bg-brand-primary-hover transition-colors"
                          >
                            Join Shipment Route & Save €{totalSavings.toFixed(0)} <ArrowRight size={14} />
                          </motion.button>
                        </div>
                      )}

                    </div>

                  </div>
                )}

                {/* 2. SHIPMENTS TAB */}
                {activeTab === "shipments" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold tracking-wider text-brand-text-muted uppercase">Shipment Timelines</span>
                      <h2 className="text-xl font-bold tracking-tight text-brand-text">Schedules & Progress</h2>
                    </div>

                    <p className="text-[11px] text-brand-text-muted leading-relaxed">
                      We coordinate exact scheduled departures. Once enough demand is pooled, shipments lock, ship, and arrive together.
                    </p>

                    <div className="space-y-3">
                      {ROUTES.map((route) => (
                        <div key={route.id} className="bg-white border border-black/5 rounded-2xl p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-sm text-brand-text">{route.from}</span>
                                <span className="text-xs text-brand-text-muted">➔</span>
                                <span className="font-bold text-sm text-brand-text">{route.to}</span>
                              </div>
                              <span className="text-[10px] text-brand-text-muted block mt-0.5">Route Code: {route.fromCode}-{route.toCode}</span>
                            </div>

                            <span className="text-[10px] bg-brand-primary/10 text-brand-text font-bold px-2 py-0.5 rounded-full">
                              Next: {route.nextShipment}
                            </span>
                          </div>

                          {/* Shipment pooling progress */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-semibold text-brand-text-muted">
                              <span>Container Demand Pool</span>
                              <span>{route.progressPercent}% Consolidated</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/[0.04] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-brand-primary rounded-full transition-all duration-500"
                                style={{ width: `${route.progressPercent}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Shipment key milestones */}
                          <div className="pt-2 border-t border-black/[0.03] grid grid-cols-3 gap-1.5 text-center">
                            <div className="p-1 rounded bg-black/[0.02]">
                              <span className="text-[8px] font-bold text-brand-text-muted uppercase block">Join Before</span>
                              <span className="text-[10px] font-semibold text-brand-text">{route.joinBefore}</span>
                            </div>
                            <div className="p-1 rounded bg-black/[0.02]">
                              <span className="text-[8px] font-bold text-brand-text-muted uppercase block">Departs</span>
                              <span className="text-[10px] font-semibold text-brand-text">{route.nextShipment}</span>
                            </div>
                            <div className="p-1 rounded bg-brand-primary/10 border border-brand-primary/20">
                              <span className="text-[8px] font-bold text-brand-text-muted uppercase block">Price/kg</span>
                              <span className="text-[10px] font-bold text-brand-text">€{route.basePricePerKg}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 3. MY ORDERS TAB */}
                {activeTab === "orders" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold tracking-wider text-brand-text-muted uppercase">My Shipping Journeys</span>
                      <h2 className="text-xl font-bold tracking-tight text-brand-text">Active Orders</h2>
                    </div>

                    {orders.length > 0 ? (
                      <div className="space-y-3">
                        {orders.map((order) => (
                          <div key={order.id} className="bg-white border border-brand-secondary rounded-2xl p-4 space-y-3 shadow-sm relative overflow-hidden">

                            {/* Decorative Top Accent line representing active status */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-primary"></div>

                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[10px] font-bold text-brand-text-muted uppercase block">{order.id}</span>
                                <div className="flex items-center gap-1.5 font-bold text-xs mt-0.5">
                                  <span>{order.from}</span>
                                  <span className="text-brand-text-muted">➔</span>
                                  <span>{order.to}</span>
                                </div>
                              </div>

                              <span className="text-[10px] bg-brand-primary/20 text-brand-text font-bold px-2 py-0.5 rounded-full">
                                {order.status === "joined" ? "Demand Pool Joined" : order.status}
                              </span>
                            </div>

                            {/* List items in the order */}
                            <div className="bg-black/[0.02] rounded-xl p-2.5 space-y-1.5">
                              <span className="text-[9px] font-bold text-brand-text-muted uppercase block">Consolidated items</span>
                              {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-[11px]">
                                  <span className="text-brand-text truncate max-w-[180px]">{item.name}</span>
                                  <span className="text-brand-text-muted shrink-0 font-medium">{item.weight} kg</span>
                                </div>
                              ))}
                            </div>

                            {/* Receiver details */}
                            <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                              <div>
                                <span className="text-brand-text-muted block uppercase font-bold text-[8px]">Receiver Details</span>
                                <span className="font-semibold text-brand-text truncate block">{order.receiverName}</span>
                                <span className="text-zinc-400 font-mono truncate block">{order.receiverPhone}</span>
                              </div>
                              <div>
                                <span className="text-brand-text-muted block uppercase font-bold text-[8px]">Collection point</span>
                                <span className="font-semibold text-brand-text capitalize block">{order.deliveryMethod}</span>
                                <span className="text-zinc-400 truncate block">Estimated delivery: {order.estimatedDelivery}</span>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-black/[0.03] flex items-center justify-between text-xs">
                              <div>
                                <span className="text-[9px] text-brand-text-muted block">You paid:</span>
                                <span className="font-bold text-brand-text">€{order.calculatedPrice.toFixed(2)}</span>
                                <span className="text-[9px] text-[#5ec700] ml-1.5 font-bold bg-brand-primary/15 px-1 py-0.5 rounded">Saved €{order.calculatedSavings.toFixed(0)}</span>
                              </div>

                              <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="text-[10px] font-bold text-red-500 hover:text-red-600 bg-red-50 px-2.5 py-1.5 rounded-lg active:scale-95 transition-all"
                              >
                                Leave Shipment
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 px-6 bg-white/40 border border-dashed border-black/10 rounded-2xl space-y-3">
                        <Package size={28} className="text-brand-text-muted mx-auto" />
                        <div>
                          <p className="text-xs font-bold text-brand-text">No active shared shipping routes</p>
                          <p className="text-[10px] text-brand-text-muted mt-1">Select a route on the home tab, add items, and join the schedule.</p>
                        </div>
                        <button
                          onClick={() => setActiveTab("home")}
                          className="bg-brand-primary text-black font-semibold text-xs py-1.5 px-4 rounded-xl active:scale-95 transition-all mt-2"
                        >
                          Find Routes
                        </button>
                      </div>
                    )}

                  </div>
                )}

                {/* 4. PROFILE TAB & VISION */}
                {activeTab === "profile" && (
                  <div className="space-y-4">

                    {/* User profile brief card */}
                    <div className="bg-white border border-black/5 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                      <div className="w-12 h-12 bg-zinc-400 rounded-full flex items-center justify-center font-bold text-white text-lg">
                        ME
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-sm text-brand-text">Mariam Ernest</h4>
                        <p className="text-[10px] text-brand-text-muted">Joined diaspedia: August 2024</p>
                        <div className="inline-flex items-center gap-1 bg-[#71E300]/15 text-[#5ec700] text-[9px] font-black px-1.5 py-0.5 rounded-full mt-1">
                          <Coins size={10} /> Saved €69.00 this month
                        </div>
                      </div>
                    </div>

                    {/* App Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white border border-black/5 rounded-xl p-3 text-center">
                        <span className="text-[9px] font-bold text-brand-text-muted uppercase block">Active Routes</span>
                        <span className="text-xl font-bold text-brand-text">{orders.length}</span>
                      </div>
                      <div className="bg-white border border-black/5 rounded-xl p-3 text-center">
                        <span className="text-[9px] font-bold text-brand-text-muted uppercase block">Total Weight</span>
                        <span className="text-xl font-bold text-brand-text">
                          {orders.reduce((acc, o) => acc + o.totalWeight, 0).toFixed(1)} kg
                        </span>
                      </div>
                    </div>

                    {/* Shared Future expansion roadmap - simplified fintech talk */}
                    <div className="bg-zinc-900 text-white rounded-2xl p-4 space-y-3 relative overflow-hidden">
                      {/* Abstract glow represent security & future finance */}
                      <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-primary/10 rounded-full blur-xl"></div>

                      <div className="flex items-center gap-2">
                        <Coins className="text-brand-primary" size={16} />
                        <h4 className="font-bold text-xs tracking-wider uppercase text-zinc-300">The Future: Payments</h4>
                      </div>

                      <p className="text-[10px] text-zinc-400 leading-relaxed">
                        After physical logistics, we enable trust. By coordinating routes with diaspedia, you will unlock low-cost remittance channels, direct-to-retailer local payments, and digital money services for your family back home.
                      </p>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[9px] font-bold text-zinc-500">PHASE 2 DEPLOYMENT</span>
                        <span className="text-[8px] bg-brand-primary text-black font-extrabold px-1.5 py-0.5 rounded">COMING 2025</span>
                      </div>
                    </div>

                    {/* Sign Out Placeholder */}
                    <div className="pt-2">
                      <button className="w-full text-center text-[11px] font-bold text-red-500 hover:text-red-600 border border-red-200/50 hover:bg-red-50 py-2.5 rounded-xl transition-all">
                        Reset Application State
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Simulated iOS/Android Tab Bar Navigation */}
              <div className="bg-white/95 backdrop-blur-md border-t border-black/5 py-2.5 px-3 flex justify-around shrink-0 z-10">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`flex flex-col items-center gap-1 p-1 transition-colors ${activeTab === "home" ? "text-brand-text" : "text-brand-text-muted"}`}
                >
                  <HomeIcon size={18} />
                  <span className="text-[9px] font-bold">Home</span>
                </button>
                <button
                  onClick={() => setActiveTab("shipments")}
                  className={`flex flex-col items-center gap-1 p-1 transition-colors ${activeTab === "shipments" ? "text-brand-text" : "text-brand-text-muted"}`}
                >
                  <Calendar size={18} />
                  <span className="text-[9px] font-bold">Dates</span>
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex flex-col items-center gap-1 p-1 transition-colors ${activeTab === "orders" ? "text-brand-text" : "text-brand-text-muted"}`}
                >
                  <Layers size={18} />
                  <span className="text-[9px] font-bold">My orders</span>
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex flex-col items-center gap-1 p-1 transition-colors ${activeTab === "profile" ? "text-brand-text" : "text-brand-text-muted"}`}
                >
                  <User size={18} />
                  <span className="text-[9px] font-bold">Profile</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-brand-text text-white py-16 px-6 md:px-12 mt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <span className="text-2xl font-bold tracking-tighter text-white block mb-4">diaspedia</span>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              A future cross-border financial company starting with shipping. We coordinate schedules and combine demand to make shipping cheaper for everyone.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#how-it-works" className="text-zinc-300 hover:text-brand-primary transition-colors">How it works</a></li>
              <li><a href="#vision" className="text-zinc-300 hover:text-brand-primary transition-colors">Roadmap</a></li>
              <li><a href="/careers" className="text-zinc-300 hover:text-brand-primary transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Legal Pages</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/privacy" className="text-zinc-300 hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-zinc-300 hover:text-brand-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-zinc-300 hover:text-brand-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>&copy; {new Date().getFullYear()} diaspedia. Together, we make cross-border cheaper.</p>
          <div className="flex gap-6">
            <a href="mailto:hello@diaspedia.com" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* DIALOG/MODAL: JOIN SHIPMENT FLOW (MULTIPHASE FORM) */}
      <AnimatePresence>
        {isJoinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-brand-bg rounded-3xl border border-black/5 shadow-2xl p-6 max-w-sm w-full relative overflow-hidden"
            >

              {/* Close Button */}
              <button
                onClick={() => setIsJoinModalOpen(false)}
                className="absolute top-4 right-4 text-brand-text-muted hover:text-brand-text p-1.5 bg-black/[0.04] rounded-full"
              >
                <X size={16} />
              </button>

              {/* Step 1: Input details */}
              {modalStep === "form" && (
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-wider text-brand-text-muted uppercase">JOIN SHIPMENT</span>
                    <h3 className="text-lg font-bold text-brand-text">Recipient Details</h3>
                    <p className="text-[11px] text-brand-text-muted">
                      Items ship from <strong>{selectedRoute.from}</strong> to <strong>{selectedRoute.to}</strong>.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-brand-text-muted uppercase block">Receiver Full Name</label>
                      <input
                        type="text"
                        required
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        placeholder="e.g. Mariam Ernest"
                        className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-brand-text-muted uppercase block">Receiver Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={receiverPhone}
                        onChange={(e) => setReceiverPhone(e.target.value)}
                        placeholder="e.g. +255 712 345 678"
                        className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-brand-text-muted uppercase block">Collection Option</label>
                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod("pickup")}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                            deliveryMethod === "pickup"
                              ? "bg-white border-brand-primary"
                              : "bg-black/[0.02] border-black/5 hover:border-black/10"
                          }`}
                        >
                          Central Pickup Point
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod("doorstep")}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                            deliveryMethod === "doorstep"
                              ? "bg-white border-brand-primary"
                              : "bg-black/[0.02] border-black/5 hover:border-black/10"
                          }`}
                        >
                          Doorstep Delivery
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/5">
                    <div className="flex justify-between text-xs font-bold mb-3">
                      <span>Total Savings:</span>
                      <span className="text-[#5ec700]">Save €{totalSavings.toFixed(2)}</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-primary text-black font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary-hover active:scale-95 transition-all"
                    >
                      Book Consolidated Spot &bull; €{currentPrice.toFixed(2)}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Loading State with Spinner */}
              {modalStep === "loading" && (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="w-10 h-10 border-4 border-black/5 border-t-brand-primary rounded-full"
                  ></motion.div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-text">Booking Your Consolidated Spot</h4>
                    <p className="text-[11px] text-brand-text-muted mt-1">Merging freight demand with route schedule...</p>
                  </div>
                </div>
              )}

              {/* Step 3: Success Screen */}
              {modalStep === "success" && justJoinedOrder && (
                <div className="space-y-4 py-2 text-center">
                  <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} className="text-brand-text" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-brand-text">Joined Route successfully!</h4>
                    <p className="text-[11px] text-brand-text-muted">
                      Order ID <strong>{justJoinedOrder.id}</strong> is now locked into the upcoming schedule.
                    </p>
                  </div>

                  <div className="bg-[#71E300]/10 border border-[#71E300]/20 rounded-2xl p-4 text-left space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-text-muted">Route:</span>
                      <span className="font-bold">{justJoinedOrder.from} ➔ {justJoinedOrder.to}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-text-muted">Total Weight:</span>
                      <span className="font-bold">{justJoinedOrder.totalWeight.toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-text-muted">Est. Arrival:</span>
                      <span className="font-bold">{justJoinedOrder.estimatedDelivery}</span>
                    </div>
                    <div className="border-t border-black/[0.04] pt-2 flex justify-between text-xs font-black">
                      <span>Total Savings:</span>
                      <span className="text-[#5ec700]">€{justJoinedOrder.calculatedSavings.toFixed(2)} saved</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsJoinModalOpen(false);
                      setActiveTab("orders");
                    }}
                    className="w-full bg-brand-primary text-black font-extrabold text-xs py-3 rounded-xl hover:bg-brand-primary-hover active:scale-95 transition-all"
                  >
                    View My Shipping Journeys
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
