"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ArrowRight,
  CheckCircle2,
  Coins,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Home as HomeIcon,
  Calendar,
  Layers,
  User,
  Plus,
  Trash2,
  Package,
  X,
  Info,
  Users,
  Check,
  Sparkles,
  ShieldCheck
} from "lucide-react";

import {
  Route,
  ShippingItem,
  JoinedOrder,
  CuratedProduct,
  ROUTES,
  ITEM_CATEGORIES,
  INITIAL_ORDERS,
  FAQS
} from "@/lib/diaspediaData";

export default function Home() {
  // Onboarding Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Mobile navigation tabs
  const [activeTab, setActiveTab] = useState<"home" | "shipments" | "orders" | "profile">("home");

  // State management for current mock orders
  const [orders, setOrders] = useState<JoinedOrder[]>(INITIAL_ORDERS);

  // Route selection & curated products state
  const [selectedRoute, setSelectedRoute] = useState<Route>(ROUTES[0]);

  // Items currently added by the user to their join package
  const [calcItems, setCalcItems] = useState<ShippingItem[]>([
    { name: "Tanzanian Highland Tea (1kg)", category: "Local Spices & Dry Foods", weight: 1.0 },
    { name: "Premium Sembe Maize Flour (5kg)", category: "Local Spices & Dry Foods", weight: 5.0 }
  ]);

  // Secondary Custom package input state
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customWeight, setCustomWeight] = useState<number>(2.0);
  const [customCategory, setCustomCategory] = useState("Clothing & Apparel");

  // FAQ interactive state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form Join Shipment Modal State
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "doorstep">("pickup");
  const [modalStep, setModalStep] = useState<"form" | "loading" | "success">("form");
  const [justJoinedOrder, setJustJoinedOrder] = useState<JoinedOrder | null>(null);

  // Scroll ref for smooth focus transitions
  const productsSectionRef = useRef<HTMLDivElement>(null);

  // When changing route, auto-select its primary curated items to showcase instant savings value
  const handleRouteChange = (route: Route) => {
    setSelectedRoute(route);
    // Automatically pre-populate user's selected package with the first 2 products of this route
    if (route.products && route.products.length >= 2) {
      setCalcItems([
        { name: route.products[0].name, category: route.products[0].category, weight: route.products[0].weight },
        { name: route.products[1].name, category: route.products[1].category, weight: route.products[1].weight }
      ]);
    } else {
      setCalcItems([]);
    }
    setShowCustomForm(false);
  };

  // Check if a curated product is currently added to the selected shipment
  const isProductSelected = (prod: CuratedProduct) => {
    return calcItems.some(item => item.name === prod.name);
  };

  // Toggle Curated Product in user's shipment
  const toggleCuratedProduct = (prod: CuratedProduct) => {
    if (isProductSelected(prod)) {
      setCalcItems(calcItems.filter(item => item.name !== prod.name));
    } else {
      const item: ShippingItem = {
        name: prod.name,
        category: prod.category,
        weight: prod.weight
      };
      setCalcItems([...calcItems, item]);
    }
  };

  // Add Custom Item manually
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || customWeight <= 0) return;

    const item: ShippingItem = {
      name: customName.trim(),
      category: customCategory,
      weight: Number(customWeight)
    };

    setCalcItems([...calcItems, item]);
    setCustomName("");
    setCustomWeight(2.0);
    setShowCustomForm(false);
  };

  // Remove Item
  const handleRemoveItem = (index: number) => {
    const updated = [...calcItems];
    updated.splice(index, 1);
    setCalcItems(updated);
  };

  // Smooth scroll to curated products list
  const scrollToProducts = (route: Route) => {
    handleRouteChange(route);
    setTimeout(() => {
      productsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Calculate prices based on items
  const totalWeight = calcItems.reduce((acc, item) => acc + item.weight, 0);

  const calculateTotalPrice = () => {
    return calcItems.reduce((acc, item) => {
      // Check if it's a curated product
      const curated = selectedRoute.products.find(p => p.name === item.name);
      if (curated) {
        return acc + curated.price;
      }
      // Otherwise, calculate based on custom category multiplier and route base price
      const cat = ITEM_CATEGORIES.find(c => c.name === item.category);
      const mult = cat ? cat.weightMultiplier : 1.0;
      return acc + (item.weight * selectedRoute.basePricePerKg * mult);
    }, 0);
  };

  const calculateSoloPrice = () => {
    return calcItems.reduce((acc, item) => {
      const curated = selectedRoute.products.find(p => p.name === item.name);
      if (curated) {
        return acc + curated.standardSoloPrice;
      }
      return acc + (item.weight * selectedRoute.soloPricePerKg);
    }, 0);
  };

  const currentPrice = calculateTotalPrice();
  const soloPrice = calculateSoloPrice();
  const totalSavings = soloPrice - currentPrice;

  // Modal actions
  const openJoinModal = () => {
    setModalStep("form");
    setIsJoinModalOpen(true);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiverName.trim() || !receiverPhone.trim()) return;

    setModalStep("loading");

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

  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
  };

  const handleResetDemoState = () => {
    setOrders(INITIAL_ORDERS);
    handleRouteChange(ROUTES[0]);
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-brand-text flex items-center justify-center font-sans overflow-hidden">

      {/*
        EXCLUSIVE MOBILE-FIRST CONTAINER
        - Centered beautifully on desktop inside a phone container.
        - Fluid edge-to-edge full screen on true mobile sizes.
      */}
      <div className="w-full max-w-[430px] h-screen sm:h-[900px] sm:max-h-[95vh] bg-zinc-950 rounded-none sm:rounded-[56px] p-0 sm:p-4 shadow-none sm:shadow-[0_28px_70px_-14px_rgba(0,0,0,0.3)] border-0 sm:border-[8px] border-zinc-800 relative flex flex-col overflow-hidden">

        {/* Phone Notch/Speaker */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-zinc-950 rounded-b-2xl z-50 items-center justify-center">
          <div className="w-14 h-1 bg-zinc-800 rounded-full"></div>
        </div>

        {/* Real App Screen Frame */}
        <div className="flex-1 bg-[#F6F4ED] rounded-none sm:rounded-[40px] overflow-hidden flex flex-col relative">

          <AnimatePresence mode="wait">

            {/* 1. BRAND OPENING EXPERIENCE (ONBOARDING WELCOME SCREEN) */}
            {showSplash ? (
              <motion.div
                key="splash"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-[#F6F4ED] z-50 flex flex-col justify-between p-8 text-center"
              >
                <div className="h-6"></div>

                {/* Main branding & Tagline */}
                <div className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl font-black tracking-tight text-brand-text"
                  >
                    diaspedia
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg font-bold text-brand-text-muted leading-snug max-w-[280px] mx-auto"
                  >
                    Together, we make cross-border cheaper.
                  </motion.p>
                </div>

                {/* Explanatory introduction */}
                <div className="space-y-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-sm font-semibold text-brand-text-muted leading-relaxed max-w-[290px] mx-auto bg-white/60 p-5 rounded-[20px] border border-black/[0.03]"
                  >
                    &ldquo;Join others who are shipping across borders and save money by sharing the cost.&rdquo;
                  </motion.p>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSplash(false)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    type="button"
                    className="w-full bg-brand-primary text-black font-extrabold text-sm py-4 rounded-2xl shadow-lg shadow-brand-primary/15 hover:bg-brand-primary-hover active:scale-95 transition-all cursor-pointer"
                  >
                    Get Started
                  </motion.button>
                </div>

                <div className="h-4"></div>
              </motion.div>
            ) : (

              /* MAIN APP WORKFLOW SCREEN */
              <motion.div
                key="app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col h-full overflow-hidden"
              >

                {/* 2. INTENTIONAL, PREMIUM HEADER DESIGN (WORDMARK ALIGNED LEFT) */}
                <header className="bg-[#F6F4ED]/95 backdrop-blur-md pt-7 pb-4 px-6 border-b border-black/5 flex items-center justify-between shrink-0">
                  <span className="font-extrabold text-2xl tracking-tighter text-brand-text">
                    diaspedia
                  </span>

                  {/* Clean Minimalist Badge */}
                  <div className="flex items-center gap-1.5 bg-black/[0.04] px-2.5 py-1 rounded-full text-[10px] font-black text-brand-text-muted uppercase tracking-wider">
                    <Globe size={11} className="text-brand-text" />
                    Global
                  </div>
                </header>

                {/*
                  SCROLLABLE MAIN WRAPPER
                  - Content scrolls independently.
                  - Navigation stays absolutely locked at the bottom viewport and is never hidden!
                */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 pb-28">

                  {/* HOME TAB */}
                  {activeTab === "home" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Human-focused Introduction */}
                      <div className="space-y-1">
                        <span className="text-xs font-extrabold tracking-wider text-brand-text-muted uppercase">TOGETHER, WE SAVE</span>
                        <h2 className="text-3xl font-black tracking-tight text-brand-text leading-tight">Send or receive packages cheaper.</h2>
                      </div>

                      <div className="bg-[#71E300]/10 border border-[#71E300]/20 rounded-2xl p-4 flex gap-3 items-center shadow-sm">
                        <Info size={20} className="text-brand-text shrink-0" />
                        <p className="text-xs text-brand-text leading-relaxed font-semibold">
                          Choose an active shipping schedule. We pre-calculate costs and curate high-demand products so you save up to 70% by shipping together.
                        </p>
                      </div>

                      {/* Route Opportunities (NOT A SHOP OR GENERAL CARGO HUB) */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-extrabold tracking-wider text-brand-text-muted uppercase px-1">1. Active Shipping Routes</h3>

                        <div className="grid grid-cols-1 gap-3">
                          {ROUTES.map((route) => {
                            const isSelected = selectedRoute.id === route.id;
                            return (
                              <div
                                key={route.id}
                                onClick={() => handleRouteChange(route)}
                                className={`p-4 rounded-2xl border transition-all flex flex-col gap-3 cursor-pointer ${
                                  isSelected
                                    ? "bg-white border-brand-primary shadow-md scale-[1.01]"
                                    : "bg-white/55 border-black/5 hover:border-black/10 hover:bg-white"
                                }`}
                              >
                                {/* Top info layout */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-base text-brand-text">{route.from}</span>
                                    <span className="text-xs text-brand-text-muted">➔</span>
                                    <span className="font-extrabold text-base text-brand-text">{route.to}</span>
                                  </div>

                                  <div className="text-right">
                                    <div className="text-xs font-bold text-brand-text-muted">Combined rate</div>
                                    <div className="text-sm font-black text-brand-text">€{route.basePricePerKg}/kg</div>
                                  </div>
                                </div>

                                {/* Clean Schedule & simple participants indicator */}
                                <div className="flex items-center justify-between border-t border-black/[0.02] pt-2.5">
                                  <div className="space-y-0.5">
                                    <div className="text-[10px] text-zinc-400 font-medium">Leaves: <strong className="text-brand-text">{route.nextShipment}</strong></div>
                                    <div className="text-[10px] text-zinc-400 font-medium">Join by: <strong className="text-brand-text">{route.joinBefore}</strong></div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {/* EXTREMELY SIMPLE PARTICIPANT INDICATOR [Users icon] 42 */}
                                    <div className="flex items-center gap-1.5 text-xs text-brand-text font-black bg-[#71E300]/10 border border-[#71E300]/20 px-2.5 py-1 rounded-full">
                                      <Users size={12} className="text-brand-text" />
                                      <span>{route.peopleJoining}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Premium FlixBus-style Action */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    scrollToProducts(route);
                                  }}
                                  className="w-full bg-black/[0.03] hover:bg-brand-primary text-brand-text font-extrabold text-xs py-2 rounded-xl flex items-center justify-center gap-1 transition-all"
                                >
                                  See what&apos;s available <ChevronDown size={14} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/*
                        WHAT'S AVAILABLE ON THIS ROUTE SECTION
                        - Clean structured cards matching diaspedia's curated logistic model.
                        - Excludes general shop listings; shows only pre-calculated approved products.
                      */}
                      <div ref={productsSectionRef} className="space-y-4 pt-2">
                        <div className="space-y-1">
                          <h3 className="text-sm font-extrabold tracking-wider text-brand-text-muted uppercase px-1">2. Available for {selectedRoute.from} ➔ {selectedRoute.to}</h3>
                          <p className="text-xs text-brand-text-muted leading-relaxed px-1">
                            These essential goods have pre-calculated bulk shipping costs and customs cleared. Simply select what you need to receive or send:
                          </p>
                        </div>

                        {/* List of pre-calculated curated goods */}
                        <div className="grid grid-cols-1 gap-2.5">
                          {selectedRoute.products.map((prod) => {
                            const isAdded = isProductSelected(prod);
                            return (
                              <div
                                key={prod.id}
                                onClick={() => toggleCuratedProduct(prod)}
                                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                                  isAdded
                                    ? "bg-brand-primary/10 border-brand-primary/40 shadow-sm"
                                    : "bg-white border-black/5 hover:border-black/10"
                                }`}
                              >
                                <div className="space-y-1 truncate pr-2">
                                  <div className="font-extrabold text-xs text-brand-text truncate">{prod.name}</div>
                                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold">
                                    <span>Weight: {prod.weight}kg</span>
                                    <span>&bull;</span>
                                    <span>Standard Solo Rate: <span className="line-through text-red-500">€{prod.standardSoloPrice}</span></span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2.5 shrink-0">
                                  <div className="text-right">
                                    {/* Final diaspedia pricing combining ship space */}
                                    <div className="text-xs font-black text-brand-text">€{prod.price.toFixed(2)}</div>
                                    <span className="text-[9px] text-[#5ec700] font-bold">Save €{(prod.standardSoloPrice - prod.price).toFixed(0)}</span>
                                  </div>

                                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                                    isAdded
                                      ? "bg-brand-primary border-brand-primary text-black"
                                      : "bg-black/[0.02] border-black/5 text-zinc-400"
                                  }`}>
                                    {isAdded ? <Check size={16} strokeWidth={3} /> : <Plus size={16} />}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Custom package option - Elegant & secondary */}
                        <div className="bg-white rounded-2xl border border-black/5 p-4 space-y-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-brand-text-muted">Need to ship a custom package?</span>
                            <button
                              type="button"
                              onClick={() => setShowCustomForm(!showCustomForm)}
                              className="text-xs font-black text-brand-text bg-black/[0.04] px-3 py-1.5 rounded-xl transition-all"
                            >
                              {showCustomForm ? "Cancel" : "Add custom package"}
                            </button>
                          </div>

                          {showCustomForm && (
                            <form onSubmit={handleAddCustomItem} className="space-y-3 pt-2 border-t border-black/[0.03]">
                              <div className="grid grid-cols-2 gap-2.5">
                                <div className="space-y-1">
                                  <label className="text-[9px] font-bold text-brand-text-muted uppercase">Package Name</label>
                                  <input
                                    type="text"
                                    required
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    placeholder="e.g. Personal books, clothes"
                                    className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-primary font-semibold"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-bold text-brand-text-muted uppercase">Weight (kg)</label>
                                  <input
                                    type="number"
                                    step="0.1"
                                    min="0.1"
                                    required
                                    value={customWeight}
                                    onChange={(e) => setCustomWeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
                                    className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-primary font-bold"
                                  />
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <div className="flex-1">
                                  <select
                                    value={customCategory}
                                    onChange={(e) => setCustomCategory(e.target.value)}
                                    className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-primary font-semibold"
                                  >
                                    {ITEM_CATEGORIES.map(cat => (
                                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                                    ))}
                                  </select>
                                </div>
                                <button
                                  type="submit"
                                  className="bg-brand-primary text-black font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-brand-primary-hover active:scale-95 transition-all"
                                >
                                  Add Package
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      </div>

                      {/* Realtime summary and Order builder */}
                      <div className="bg-white rounded-[24px] border border-black/5 p-5 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between border-b border-black/[0.04] pb-3">
                          <h3 className="text-xs font-black tracking-wider text-brand-text-muted uppercase">My Shipment Summary</h3>
                          <span className="text-[10px] bg-black/[0.04] text-brand-text font-black px-2.5 py-0.5 rounded-full">
                            Route: {selectedRoute.fromCode} ➔ {selectedRoute.toCode}
                          </span>
                        </div>

                        {calcItems.length > 0 ? (
                          <div className="space-y-2 max-h-[140px] overflow-y-auto">
                            {calcItems.map((item, index) => (
                              <div key={index} className="flex items-center justify-between bg-black/[0.02] p-2.5 rounded-xl text-xs">
                                <div className="truncate pr-3 space-y-0.5">
                                  <div className="font-bold text-brand-text truncate">{item.name}</div>
                                  <div className="text-[9px] text-brand-text-muted truncate">{item.category}</div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                  <span className="font-extrabold text-xs text-brand-text">{item.weight} kg</span>
                                  <button
                                    onClick={() => handleRemoveItem(index)}
                                    type="button"
                                    className="text-red-500 hover:text-red-600 p-1 bg-white rounded-lg shadow-sm"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-xs text-brand-text-muted bg-black/[0.01] rounded-2xl border border-dashed border-black/5">
                            Select products above to add them to your shipment.
                          </div>
                        )}

                        {calcItems.length > 0 && (
                          <div className="pt-2.5 border-t border-black/5 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-brand-text-muted font-bold">Total Weight:</span>
                              <span className="font-black text-sm">{totalWeight.toFixed(1)} kg</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                              <div className="bg-black/[0.02] p-3 rounded-2xl">
                                <span className="text-[9px] font-bold text-brand-text-muted uppercase block mb-1">DHL/FedEx rate</span>
                                <span className="text-xs font-black line-through text-red-500">€{soloPrice.toFixed(2)}</span>
                              </div>

                              <div className="bg-brand-primary/10 p-3 rounded-2xl border border-brand-primary/20">
                                <span className="text-[9px] font-bold text-brand-text-muted uppercase block mb-1">Combined rate</span>
                                <span className="text-sm font-black text-brand-text">€{currentPrice.toFixed(2)}</span>
                              </div>
                            </div>

                            <div className="bg-[#71E300]/10 border border-[#71E300]/30 rounded-2xl p-3 flex items-center justify-between text-xs">
                              <span className="font-bold text-brand-text">Your Savings:</span>
                              <span className="font-black text-[#5ec700] text-sm">€{totalSavings.toFixed(2)} saved</span>
                            </div>

                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={openJoinModal}
                              type="button"
                              className="w-full bg-brand-primary text-black font-extrabold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:bg-brand-primary-hover transition-colors cursor-pointer mt-1"
                            >
                              Join Route & Save €{totalSavings.toFixed(0)} <ArrowRight size={16} />
                            </motion.button>
                          </div>
                        )}
                      </div>

                    </motion.div>
                  )}

                  {/* DATES / TIMELINES TAB */}
                  {activeTab === "shipments" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-extrabold tracking-wider text-brand-text-muted uppercase">ACTIVE DATES</span>
                        <h2 className="text-3xl font-black tracking-tight text-brand-text">Upcoming departures</h2>
                      </div>

                      <p className="text-xs text-brand-text-muted leading-relaxed">
                        We organize shipping departures regularly. Once enough demand is pooled, we pack items inside shared space to divide bulk container rates.
                      </p>

                      <div className="space-y-4">
                        {ROUTES.map((route) => (
                          <div key={route.id} className="bg-white border border-black/5 rounded-2xl p-5 space-y-4 shadow-sm">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-base text-brand-text">{route.from}</span>
                                  <span className="text-xs text-brand-text-muted">➔</span>
                                  <span className="font-black text-base text-brand-text">{route.to}</span>
                                </div>
                                <span className="text-[10px] text-brand-text-muted block mt-0.5 uppercase font-extrabold tracking-wider">Route Code: {route.fromCode}-{route.toCode}</span>
                              </div>

                              <div className="flex items-center gap-1 text-xs text-brand-text font-black bg-[#71E300]/10 border border-[#71E300]/20 px-2.5 py-1 rounded-full">
                                <Users size={12} className="text-brand-text" />
                                <span>{route.peopleJoining}</span>
                              </div>
                            </div>

                            {/* Timeline Slider */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[11px] font-bold text-brand-text-muted">
                                <span>Demand shared pool</span>
                                <span>{route.progressPercent}% Filled</span>
                              </div>
                              <div className="w-full h-2 bg-black/[0.04] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-brand-primary rounded-full transition-all duration-500"
                                  style={{ width: `${route.progressPercent}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Trip particulars */}
                            <div className="pt-3 border-t border-black/[0.03] grid grid-cols-3 gap-2 text-center">
                              <div className="p-2 rounded-xl bg-black/[0.02]">
                                <span className="text-[9px] font-black text-brand-text-muted uppercase block">Join Before</span>
                                <span className="text-xs font-extrabold text-brand-text">{route.joinBefore}</span>
                              </div>
                              <div className="p-2 rounded-xl bg-black/[0.02]">
                                <span className="text-[9px] font-black text-brand-text-muted uppercase block">Leaves</span>
                                <span className="text-xs font-extrabold text-brand-text">{route.nextShipment}</span>
                              </div>
                              <div className="p-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
                                <span className="text-[9px] font-black text-brand-text-muted uppercase block">Combined Price</span>
                                <span className="text-xs font-black text-brand-text font-mono">€{route.basePricePerKg}/kg</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )}

                  {/* MY ORDERS TAB */}
                  {activeTab === "orders" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-extrabold tracking-wider text-brand-text-muted uppercase">MY JOURNEYS</span>
                        <h2 className="text-3xl font-black tracking-tight text-brand-text">My Orders</h2>
                      </div>

                      {orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div key={order.id} className="bg-white border border-brand-secondary rounded-2xl p-5 space-y-4 shadow-sm relative overflow-hidden">

                              <div className="absolute top-0 left-0 right-0 h-[4px] bg-brand-primary"></div>

                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[10px] font-extrabold text-brand-text-muted uppercase tracking-wider block">{order.id}</span>
                                  <div className="flex items-center gap-1.5 font-black text-sm mt-0.5">
                                    <span>{order.from}</span>
                                    <span className="text-brand-text-muted font-normal">➔</span>
                                    <span>{order.to}</span>
                                  </div>
                                </div>

                                <span className="text-[10px] bg-brand-primary/20 text-brand-text font-black px-2.5 py-1 rounded-full font-sans">
                                  {order.status === "joined" ? "Route Joined" : order.status}
                                </span>
                              </div>

                              {/* Items pooled */}
                              <div className="bg-black/[0.02] rounded-xl p-3 space-y-2">
                                <span className="text-[10px] font-black text-brand-text-muted uppercase block">My packages</span>
                                {order.items.map((item, i) => (
                                  <div key={i} className="flex justify-between text-xs">
                                    <span className="text-brand-text font-bold truncate max-w-[200px]">{item.name}</span>
                                    <span className="text-brand-text-muted shrink-0 font-extrabold">{item.weight} kg</span>
                                  </div>
                                ))}
                              </div>

                              {/* Receiver details */}
                              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                                <div>
                                  <span className="text-brand-text-muted block uppercase font-black text-[9px] mb-0.5">Receiver</span>
                                  <span className="font-extrabold text-brand-text truncate block">{order.receiverName}</span>
                                  <span className="text-zinc-400 font-mono truncate block">{order.receiverPhone}</span>
                                </div>
                                <div>
                                  <span className="text-brand-text-muted block uppercase font-black text-[9px] mb-0.5">Pickup point</span>
                                  <span className="font-extrabold text-brand-text capitalize block">{order.deliveryMethod}</span>
                                  <span className="text-zinc-400 truncate block">Arrives: {order.estimatedDelivery}</span>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-black/[0.03] flex items-center justify-between text-xs">
                                <div>
                                  <span className="text-[9px] text-brand-text-muted block font-semibold">Total Price:</span>
                                  <span className="font-black text-sm text-brand-text">€{order.calculatedPrice.toFixed(2)}</span>
                                  <span className="text-[10px] text-[#5ec700] ml-1.5 font-bold bg-brand-primary/15 px-2 py-0.5 rounded-full">Saved €{order.calculatedSavings.toFixed(0)}</span>
                                </div>

                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="text-xs font-extrabold text-red-500 hover:text-red-600 bg-red-55 px-3 py-2 rounded-xl active:scale-95 transition-all cursor-pointer"
                                >
                                  Cancel Spot
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 px-6 bg-white/40 border border-dashed border-black/10 rounded-2xl space-y-4">
                          <Package size={36} className="text-brand-text-muted mx-auto" />
                          <div>
                            <p className="text-sm font-black text-brand-text">No active orders</p>
                            <p className="text-xs text-brand-text-muted mt-1 max-w-[220px] mx-auto leading-relaxed">Choose an active route date, add packages, and join the schedule to split rates.</p>
                          </div>
                          <button
                            onClick={() => setActiveTab("home")}
                            className="bg-brand-primary text-black font-extrabold text-xs py-2 px-5 rounded-xl active:scale-95 transition-all mt-2 cursor-pointer"
                          >
                            Find Routes
                          </button>
                        </div>
                      )}

                    </motion.div>
                  )}

                  {/* PROFILE & FINTECH VISION TAB */}
                  {activeTab === "profile" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Profile details */}
                      <div className="bg-white border border-black/5 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                        <div className="w-14 h-14 bg-zinc-400 rounded-full flex items-center justify-center font-bold text-white text-xl">
                          ME
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-black text-base text-brand-text">Mariam Ernest</h4>
                          <p className="text-xs text-brand-text-muted">Joined: August 2024</p>
                          <div className="inline-flex items-center gap-1 bg-[#71E300]/15 text-[#5ec700] text-[10px] font-black px-2.5 py-0.5 rounded-full mt-1">
                            <Coins size={12} /> Saved €69.00 this month
                          </div>
                        </div>
                      </div>

                      {/* Performance indicators */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white border border-black/5 rounded-2xl p-4 text-center shadow-sm">
                          <span className="text-[10px] font-extrabold text-brand-text-muted uppercase block mb-0.5">Active Orders</span>
                          <span className="text-2xl font-black text-brand-text">{orders.length}</span>
                        </div>
                        <div className="bg-white border border-black/5 rounded-2xl p-4 text-center shadow-sm">
                          <span className="text-[10px] font-extrabold text-brand-text-muted uppercase block mb-0.5">Total Savings</span>
                          <span className="text-2xl font-black text-brand-text">
                            €{orders.reduce((acc, o) => acc + o.calculatedSavings, 0).toFixed(0)}
                          </span>
                        </div>
                      </div>

                      {/* Fintech expansion statements */}
                      <div className="bg-zinc-900 text-white rounded-[24px] p-5 space-y-3 relative overflow-hidden shadow-sm">
                        <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand-primary/10 rounded-full blur-xl"></div>

                        <div className="flex items-center gap-2">
                          <Coins className="text-brand-primary" size={18} />
                          <h4 className="font-black text-xs tracking-wider uppercase text-zinc-300">The Future: Payments</h4>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed">
                          diaspedia is building the future of cross-border financial services, starting with shared logistics. By coordinating schedules and routing items together, we establish secure channels to deliver low-cost digital transfers and payments.
                        </p>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                          <span className="font-bold text-zinc-500">PHASE 2 CORRIDORS</span>
                          <span className="bg-brand-primary text-black font-black px-2 py-0.5 rounded">COMING 2025</span>
                        </div>
                      </div>

                      {/* FAQs Accordion */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-extrabold tracking-wider text-brand-text-muted uppercase px-1">App FAQs</h3>
                        <div className="space-y-2">
                          {FAQS.slice(0, 3).map((faq, idx) => (
                            <div key={idx} className="bg-white/60 border border-black/5 rounded-2xl overflow-hidden text-xs">
                              <button
                                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                type="button"
                                className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-2 font-bold text-brand-text"
                              >
                                <span>{faq.q}</span>
                                {openFaqIndex === idx ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                              </button>
                              {openFaqIndex === idx && (
                                <div className="px-4 pb-4 pt-1 text-[11px] text-brand-text-muted leading-relaxed border-t border-black/[0.03]">
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer links */}
                      <div className="pt-4 border-t border-black/5 text-center space-y-3">
                        <div className="flex justify-center gap-4 text-[11px] text-brand-text-muted font-black">
                          <Link href="/privacy" className="hover:text-brand-text transition-colors">Privacy</Link>
                          <span>&bull;</span>
                          <Link href="/terms" className="hover:text-brand-text transition-colors">Terms</Link>
                          <span>&bull;</span>
                          <Link href="/cookies" className="hover:text-brand-text transition-colors">Cookies</Link>
                          <span>&bull;</span>
                          <Link href="/careers" className="hover:text-brand-text transition-colors">Careers</Link>
                        </div>

                        <button
                          onClick={handleResetDemoState}
                          className="w-full text-center text-xs font-extrabold text-red-500 hover:text-red-600 border border-red-200/50 hover:bg-red-50/50 py-3 rounded-xl transition-all cursor-pointer"
                        >
                          Reset Demo Application State
                        </button>
                      </div>

                    </motion.div>
                  )}

                </div>

                {/*
                  1. ABSOLUTE PINNED TAB BAR NAVIGATION (STAYS FIXED ON THE SCREEN AT ALL TIMES)
                  - Guaranteed persistent. Anchored relative to the screen shell, never scrollable!
                  - Uses backdrop blurring with subtle dropshadow styling for an elite mobile feel.
                */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-black/5 py-4 px-4 flex justify-around shrink-0 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] sm:rounded-b-[40px]">
                  <button
                    onClick={() => setActiveTab("home")}
                    className={`flex flex-col items-center gap-1.5 p-1 transition-all ${activeTab === "home" ? "text-brand-text scale-105 font-bold" : "text-brand-text-muted hover:text-brand-text"}`}
                  >
                    <HomeIcon size={22} className={activeTab === "home" ? "text-brand-text" : "text-brand-text-muted"} />
                    <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("shipments")}
                    className={`flex flex-col items-center gap-1.5 p-1 transition-all ${activeTab === "shipments" ? "text-brand-text scale-105 font-bold" : "text-brand-text-muted hover:text-brand-text"}`}
                  >
                    <Calendar size={22} className={activeTab === "shipments" ? "text-brand-text" : "text-brand-text-muted"} />
                    <span className="text-[10px] font-black uppercase tracking-wider">Dates</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex flex-col items-center gap-1.5 p-1 transition-all ${activeTab === "orders" ? "text-brand-text scale-105 font-bold" : "text-brand-text-muted"}`}
                  >
                    <Layers size={22} className={activeTab === "orders" ? "text-brand-text" : "text-brand-text-muted"} />
                    <span className="text-[10px] font-black uppercase tracking-wider">My orders</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex flex-col items-center gap-1.5 p-1 transition-all ${activeTab === "profile" ? "text-brand-text scale-105 font-bold" : "text-brand-text-muted"}`}
                  >
                    <User size={22} className={activeTab === "profile" ? "text-brand-text" : "text-brand-text-muted"} />
                    <span className="text-[10px] font-black uppercase tracking-wider">Profile</span>
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

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
                className="absolute top-4 right-4 text-brand-text-muted hover:text-brand-text p-2 bg-black/[0.04] rounded-full animate-none"
              >
                <X size={16} />
              </button>

              {/* Step 1: Input details */}
              {modalStep === "form" && (
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-wider text-brand-text-muted uppercase">JOIN ROUTE</span>
                    <h3 className="text-xl font-black text-brand-text">Recipient details</h3>
                    <p className="text-xs text-brand-text-muted">
                      Items ship from <strong>{selectedRoute.from}</strong> to <strong>{selectedRoute.to}</strong>.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                        <label htmlFor="receiverName" className="text-[10px] font-bold text-brand-text-muted uppercase block">Receiver Full Name</label>
                      <input
                          id="receiverName"
                        type="text"
                        required
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        placeholder="e.g. Mariam Ernest"
                        className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-primary font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="receiverPhone" className="text-[10px] font-bold text-brand-text-muted uppercase block">Receiver Phone Number</label>
                      <input
                          id="receiverPhone"
                          type="text"
                        required
                        value={receiverPhone}
                        onChange={(e) => setReceiverPhone(e.target.value)}
                        placeholder="e.g. +255 712 345 678"
                        className="w-full text-xs bg-black/[0.03] border border-black/5 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-primary font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-brand-text-muted uppercase block">Collection option</label>
                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod("pickup")}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                            deliveryMethod === "pickup"
                              ? "bg-white border-brand-primary"
                              : "bg-black/[0.02] border-black/5 hover:border-black/10"
                          }`}
                        >
                          Central Pickup
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod("doorstep")}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
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
                      <span>Combined savings:</span>
                      <span className="text-[#5ec700]">Save €{totalSavings.toFixed(2)}</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-primary text-black font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary-hover active:scale-95 transition-all cursor-pointer"
                    >
                      Book Group Spot &bull; €{currentPrice.toFixed(2)}
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
                    <h4 className="font-bold text-sm text-brand-text">Booking your group spot</h4>
                    <p className="text-[11px] text-brand-text-muted mt-1">Combining your items with the upcoming schedule...</p>
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
                    <h4 className="font-bold text-base text-brand-text">Joined successfully!</h4>
                    <p className="text-[11px] text-brand-text-muted">
                      Order ID <strong>{justJoinedOrder.id}</strong> is locked into the upcoming schedule.
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
                    type="button"
                    className="w-full bg-brand-primary text-black font-extrabold text-xs py-3 rounded-xl hover:bg-brand-primary-hover active:scale-95 transition-all cursor-pointer"
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
