"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MapPin,
  Plus,
  X,
  Check,
  CheckCircle2,
  Clock,
  ArrowRight,
  Info,
  User,
  Calendar,
  Package,
  DollarSign,
  Search,
  TrendingDown,
  Users,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Scale
} from "lucide-react";

import {
  MOCK_USER,
  MOCK_ROUTES,
  MOCK_ORDERS,
  ShippingRoute,
  CargoOrder,
  CargoItem,
  UserProfile
} from "@/lib/diaspediaData";

export default function Home() {
  // Navigation tabs: Home, Shipments, My orders, Profile
  const [activeTab, setActiveTab] = useState<"home" | "shipments" | "orders" | "profile">("home");

  // Onboarding / Splash Experience
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // App state variables connected to hydrated localStorage mock
  const [userProfile, setUserProfile] = useState<UserProfile>(MOCK_USER);
  const [routes, setRoutes] = useState<ShippingRoute[]>(MOCK_ROUTES);
  const [orders, setOrders] = useState<CargoOrder[]>(MOCK_ORDERS);

  // Selected Route for detailed Join Flow Drawer
  const [selectedRoute, setSelectedRoute] = useState<ShippingRoute | null>(null);

  // Add Item / Join Route Flow State
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemWeight, setNewItemWeight] = useState<number>(1);
  const [newItemCategory, setNewItemCategory] = useState<string>("Personal goods");
  const [cargoItems, setCargoItems] = useState<Omit<CargoItem, "id">[]>([]);

  // Simulated form booking lifecycle states
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [simulatedLoading, setSimulatedLoading] = useState<boolean>(false);

  // Country Search State
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onboarded = localStorage.getItem("diaspedia_onboarded_v1");
      if (onboarded === "true") {
        setShowSplash(false);
      }
    }
  }, []);

  const handleDismissSplash = () => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("diaspedia_onboarded_v1", "true");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Add item to temporary booking cart
  const handleAddItemToCargo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || newItemWeight <= 0) return;

    setCargoItems([
      ...cargoItems,
      {
        name: newItemName,
        weightKg: Number(newItemWeight),
        category: newItemCategory
      }
    ]);

    // Reset inputs
    setNewItemName("");
    setNewItemWeight(1);
  };

  // Remove item from temporary booking cart
  const handleRemoveItem = (index: number) => {
    setCargoItems(cargoItems.filter((_, idx) => idx !== index));
  };

  // Calculate order metrics based on route pricing
  const totalWeight = cargoItems.reduce((acc, curr) => acc + curr.weightKg, 0);
  const calculatedPrice = selectedRoute ? totalWeight * selectedRoute.currentPricePerKg : 0;
  const calculatedSavings = selectedRoute ? totalWeight * (selectedRoute.basePricePerKg - selectedRoute.currentPricePerKg) : 0;

  // Finalize reservation and join shipment pool
  const handleConfirmCargoBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoute || cargoItems.length === 0) return;

    setSimulatedLoading(true);

    setTimeout(() => {
      setSimulatedLoading(false);
      setBookingSuccess(true);

      const generatedOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: CargoOrder = {
        id: generatedOrderId,
        routeId: selectedRoute.id,
        from: selectedRoute.from,
        to: selectedRoute.to,
        items: cargoItems.map((item, idx) => ({
          id: `item-gen-${idx}`,
          ...item
        })),
        totalWeight,
        totalPrice: calculatedPrice,
        totalSaved: calculatedSavings,
        status: "joined",
        orderDate: "Today",
        trackingNumber: `DP-${selectedRoute.from.substring(0, 3).toUpperCase()}${selectedRoute.to.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-X`,
        nextShipmentDate: selectedRoute.nextShipment
      };

      // Add to list of active joined orders
      setOrders([newOrder, ...orders]);

      // Update route state (increase participant count by 1)
      setRoutes(prevRoutes =>
        prevRoutes.map(r => r.id === selectedRoute.id ? { ...r, pooledParticipants: r.pooledParticipants + 1 } : r)
      );

      // Update Profile counter
      setUserProfile(prev => ({
        ...prev,
        joinedCount: prev.joinedCount + 1,
        totalSavedAmount: prev.totalSavedAmount + calculatedSavings
      }));

      setTimeout(() => {
        setIsJoining(false);
        setSelectedRoute(null);
        setCargoItems([]);
        setBookingSuccess(false);
        // Direct to Orders tab to follow progress
        setActiveTab("orders");
      }, 1500);

    }, 1500);
  };

  // Search filter for routes
  const filteredRoutes = routes.filter(route =>
    route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F6F4ED] text-[#0f1115] font-sans antialiased flex justify-center">

      {/* Premium Constrained Mobile Shell */}
      <div className="w-full max-w-md bg-[#F6F4ED] h-full max-h-screen relative flex flex-col shadow-[0_0_50px_rgba(15,17,21,0.06)] overflow-hidden border-x border-black/[0.03]">

        {/* SPLASH SCREEN & ONBOARDING ON FIRST VISIT */}
        <AnimatePresence>
          {showSplash && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-[#F6F4ED] z-50 flex flex-col justify-between p-5 overflow-hidden"
            >
              {/* Header Logo */}
              <div className="flex flex-col items-center pt-8 text-center space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center">
                  <span className="text-[#71E300] font-black text-xl font-heading tracking-tighter">d</span>
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl font-black font-heading tracking-tight">diaspedia</h1>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#71E300] bg-black px-2 py-0.5 rounded-full inline-block">
                    Together, we make cross-border cheaper.
                  </p>
                </div>

                <p className="max-w-xs text-xs text-[#0f1115]/80 leading-relaxed font-semibold">
                  We bring people together on the same shipping routes, combining demand to drastically drop prices for everyone.
                </p>
              </div>

              {/* Core Features Overview */}
              <div className="space-y-3 max-w-sm mx-auto w-full mb-2">
                <div className="space-y-2.5 bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-sm">

                  <div className="flex gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#71E300]/20 flex items-center justify-center text-black shrink-0 mt-0.5">
                      <Globe size={12} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-black">See Shipping Routes</h4>
                      <p className="text-[10px] text-zinc-500 font-medium">Explore schedules between countries. Select a predefined route.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#71E300]/20 flex items-center justify-center text-black shrink-0 mt-0.5">
                      <Plus size={12} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-black">Declare What You Need</h4>
                      <p className="text-[10px] text-zinc-500 font-medium">Add packages, books, electronics or clothes with instant cost estimates.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#71E300]/20 flex items-center justify-center text-black shrink-0 mt-0.5">
                      <TrendingDown size={12} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-black">Collective Price Drops</h4>
                      <p className="text-[10px] text-zinc-500 font-medium">Watch price-per-kg descend in real-time as the shipment pool scales up.</p>
                    </div>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={handleDismissSplash}
                  className="w-full bg-black hover:bg-zinc-900 active:scale-95 text-white font-bold text-xs py-3.5 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Start Consolidating</span>
                  <ArrowRight size={14} className="text-[#71E300]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PERSISTENT HEADER BRANDING */}
        <header className="sticky top-0 left-0 right-0 bg-[#F6F4ED]/85 backdrop-blur-md border-b border-black/[0.04] py-4.5 px-5 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-2xl tracking-tighter text-[#0f1115]">
              diaspedia
            </span>
            <div className="w-2 h-2 rounded-full bg-[#71E300] animate-pulse" />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 bg-white border border-black/5 px-2.5 py-1 rounded-full">
            <span>Pool Open</span>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT BODY */}
        <main className="flex-1 overflow-y-auto px-5 pt-4 pb-28 space-y-6">

          {/* 1. HOME TAB */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Premium Tagline Hero Block */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase">
                  ROUTE CONSOLIDATION SYSTEM
                </span>
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115] leading-tight">
                  Together, we make cross-border cheaper.
                </h2>
                <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                  diaspedia organizes pooled shipping schedules, combining demand on active global routes so shipping home goods becomes incredibly cheap.
                </p>
              </div>

              {/* Bolt & Flixbus-inspired Search Filter */}
              <div className="bg-white p-4 rounded-2xl border border-black/[0.04] shadow-sm relative overflow-hidden">
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search countries (e.g. Germany, Tanzania)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#F6F4ED]/50 border border-black/5 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-zinc-800 focus:outline-none focus:border-[#71E300] placeholder:text-zinc-400"
                  />
                </div>
              </div>

              {/* Available Routes Feed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-black tracking-wider text-zinc-500 uppercase">
                    Available Routes
                  </h3>
                  <span className="text-[10px] bg-black text-[#71E300] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                    Join Open Schedules
                  </span>
                </div>

                <div className="space-y-3">
                  {filteredRoutes.map((route) => (
                    <div
                      key={route.id}
                      onClick={() => {
                        setSelectedRoute(route);
                        setIsJoining(false);
                      }}
                      className="bg-white rounded-2xl border border-black/[0.04] p-4.5 shadow-sm space-y-4 hover:border-black/10 transition-all cursor-pointer relative"
                    >
                      {/* Flag Origin/Dest Route line */}
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{route.fromFlag}</span>
                            <span className="font-heading font-black text-lg text-black">{route.from}</span>
                            <span className="text-zinc-400 font-bold mx-1">➔</span>
                            <span className="text-xl">{route.toFlag}</span>
                            <span className="font-heading font-black text-lg text-black">{route.to}</span>
                          </div>

                          <div className="flex items-center gap-3.5 text-[11px] text-zinc-500 font-bold">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-zinc-400" />
                              Shipment: {route.nextShipment}
                            </span>
                            <span className="flex items-center gap-1 text-[#5ec700]">
                              <Clock size={12} />
                              Join before: {route.joinBefore}
                            </span>
                          </div>
                        </div>

                        {/* Price tier savings highlight */}
                        <div className="text-right">
                          <div className="text-sm font-black text-black">€{route.currentPricePerKg.toFixed(2)}/kg</div>
                          <span className="text-[9px] bg-[#71E300]/20 text-[#5ec700] px-1.5 py-0.5 rounded font-black uppercase">
                            -{route.savingsPercentage}% pool discount
                          </span>
                        </div>
                      </div>

                      {/* Participant Count Visual */}
                      <div className="bg-[#F6F4ED]/60 rounded-xl p-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-zinc-700">
                          <Users size={14} className="text-[#71E300]" />
                          <span>{route.pooledParticipants} travelers in this route pool</span>
                        </div>
                        <span className="font-extrabold text-[#5ec700] flex items-center gap-1 text-[11px]">
                          <span>Join Route</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informative Value Prop: Not an E-Commerce Shop */}
              <div className="bg-zinc-950 text-white rounded-3xl p-5 space-y-3 shadow-md relative overflow-hidden">
                <h3 className="text-sm font-black font-heading text-[#71E300]">Important to Know:</h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                  diaspedia is not an online shop, not a marketplace, and not a standard cargo company. We are building the future of cross-border currency and financial services starting with shipping routing efficiency.
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
                  <div className="space-y-1">
                    <div className="text-xs font-black text-white">No Markup</div>
                    <div className="text-[9px] text-zinc-400 uppercase font-bold">Direct Carrier Rates</div>
                  </div>
                  <div className="space-y-1 border-x border-white/5">
                    <div className="text-xs font-black text-white">Consolidated</div>
                    <div className="text-[9px] text-zinc-400 uppercase font-bold">Cost Shared equally</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-black text-[#71E300]">Fintech Future</div>
                    <div className="text-[9px] text-zinc-400 uppercase font-bold">Verified Trust Network</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. SHIPMENTS TAB */}
          {activeTab === "shipments" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <span className="text-xs font-extrabold tracking-wider text-zinc-500 uppercase">
                  CONSOLIDATION SCHEDULES
                </span>
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">
                  Active Shipments
                </h2>
                <p className="text-xs text-zinc-600 font-medium">
                  Real-time visibility of scheduled container pathways currently aggregating pool volume.
                </p>
              </div>

              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="bg-white border border-black/[0.04] rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-black text-[#71E300] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Next Route: {route.nextShipment}
                      </span>
                      <span className="text-xs font-bold text-[#5ec700]">Join open</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{route.fromFlag}</span>
                      <span className="font-heading font-black text-xl text-black">{route.from}</span>
                      <span className="text-zinc-400 font-bold mx-1">➔</span>
                      <span className="text-xl">{route.toFlag}</span>
                      <span className="font-heading font-black text-xl text-black">{route.to}</span>
                    </div>

                    {/* Cost progression tiers */}
                    <div className="space-y-2 pt-2 border-t border-black/[0.02]">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">
                        Cost Saving progression
                      </span>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-[#F6F4ED] p-2 rounded-xl">
                          <span className="text-[9px] text-zinc-400 font-bold block">Base Rate</span>
                          <span className="text-xs font-extrabold text-zinc-600 line-through">€{route.basePricePerKg.toFixed(2)}/kg</span>
                        </div>
                        <div className="bg-[#71E300]/10 p-2 rounded-xl border border-[#71E300]/20">
                          <span className="text-[9px] text-zinc-600 font-bold block">Current Pool</span>
                          <span className="text-xs font-black text-black">€{route.currentPricePerKg.toFixed(2)}/kg</span>
                        </div>
                        <div className="bg-[#71E300]/25 p-2 rounded-xl">
                          <span className="text-[9px] text-zinc-700 font-bold block">Your Savings</span>
                          <span className="text-xs font-black text-[#5ec700]">-{route.savingsPercentage}%</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRoute(route);
                        setIsJoining(false);
                      }}
                      className="w-full bg-black hover:bg-zinc-900 active:scale-95 text-white text-xs font-bold py-3 rounded-xl transition-all"
                    >
                      Book cargo space on this route
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 3. MY ORDERS TAB */}
          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <span className="text-xs font-extrabold tracking-wider text-zinc-500 uppercase">
                  MY JOINED SHIPMENTS
                </span>
                <h2 className="text-3xl font-black font-heading tracking-tight text-[#0f1115]">
                  My Orders
                </h2>
                <p className="text-xs text-zinc-600 font-medium">
                  Follow the progress of shipments you have joined and check your active savings.
                </p>
              </div>

              <div className="space-y-4">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl border border-black/[0.04] p-5 shadow-sm space-y-4 relative"
                    >
                      {/* Order Header info */}
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-zinc-400 font-black tracking-widest block uppercase">TRACKING CODE</span>
                          <span className="text-xs font-black text-black">{order.trackingNumber}</span>
                        </div>
                        <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-full bg-[#71E300]/20 text-[#5ec700] tracking-wider">
                          {order.status}
                        </span>
                      </div>

                      {/* Cargo Origin Dest info */}
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-lg text-black">{order.from}</span>
                        <span className="text-zinc-400 font-bold">➔</span>
                        <span className="font-heading font-black text-lg text-black">{order.to}</span>
                      </div>

                      {/* Cargo Item details list */}
                      <div className="space-y-2 bg-[#F6F4ED]/60 p-3 rounded-xl">
                        <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider block">ITEMIZED RECEIPT</span>

                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-xs">
                              <span className="font-bold text-zinc-800">{item.name} ({item.category})</span>
                              <span className="text-zinc-500 font-semibold">{item.weightKg} kg</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-black/[0.04] pt-2 flex justify-between text-xs font-black">
                          <span>Total Weight: {order.totalWeight} kg</span>
                          <span className="text-[#5ec700]">Total Price: €{order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Timeline Cargo Progress tracker */}
                      <div className="space-y-2 pt-2 border-t border-black/[0.02]">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">
                          Shipping progress tracker
                        </span>

                        <div className="grid grid-cols-4 gap-1 text-[10px] font-bold text-center">
                          <div className={`p-1.5 rounded-md ${order.status === "joined" ? "bg-[#71E300]/25 text-black" : "bg-zinc-100 text-zinc-400"}`}>
                            Joined
                          </div>
                          <div className={`p-1.5 rounded-md ${order.status === "received" ? "bg-[#71E300]/25 text-black" : "bg-zinc-100 text-zinc-400"}`}>
                            Received
                          </div>
                          <div className={`p-1.5 rounded-md ${order.status === "in-transit" ? "bg-[#71E300]/25 text-black" : "bg-zinc-100 text-zinc-400"}`}>
                            Shipped
                          </div>
                          <div className={`p-1.5 rounded-md ${order.status === "ready-for-pickup" ? "bg-[#71E300]/25 text-black" : "bg-zinc-100 text-zinc-400"}`}>
                            Arrived
                          </div>
                        </div>
                      </div>

                      {/* Savings summary */}
                      <div className="flex justify-between items-center text-xs font-bold pt-1 border-t border-black/[0.02] text-zinc-400">
                        <span>Paid: €{order.totalPrice.toFixed(2)}</span>
                        <span className="text-[#5ec700] bg-[#71E300]/10 px-2 py-0.5 rounded-md">
                          You saved €{order.totalSaved.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl border border-black/5 p-8 text-center space-y-3">
                    <Package size={24} className="mx-auto text-zinc-400" />
                    <h4 className="text-xs font-bold text-zinc-800">No joined shipments found</h4>
                    <p className="text-xs text-zinc-400">Go to the Home feed, choose an active route, and declare items to join your first cargo consolidation pool!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 4. PROFILE TAB */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white border border-black/[0.04] rounded-3xl p-6 shadow-sm text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center border-4 border-[#71E300]">
                    <span className="text-white text-3xl font-black font-heading">E</span>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-[#71E300] text-black w-6.5 h-6.5 rounded-full border-2 border-white flex items-center justify-center">
                    <ShieldCheck size={14} />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black font-heading text-black leading-tight">{userProfile.name}</h3>
                  <p className="text-xs text-zinc-500 font-semibold">{userProfile.email} &bull; {userProfile.phone}</p>
                </div>

                {/* Profile Stats */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/[0.03]">
                  <div className="space-y-0.5">
                    <div className="text-lg font-black text-black">{userProfile.joinedCount}</div>
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">Joined pools</span>
                  </div>
                  <div className="space-y-0.5 border-l border-black/[0.03]">
                    <div className="text-lg font-black text-[#5ec700]">€{userProfile.totalSavedAmount.toFixed(2)}</div>
                    <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">Total Savings</span>
                  </div>
                </div>
              </div>

              {/* Developer / Company Footer Section (No Dead Ends) */}
              <div className="bg-zinc-100/50 border border-black/[0.02] rounded-2xl p-5 text-center space-y-4">
                <div className="text-xs font-extrabold text-zinc-500 tracking-wider uppercase">
                  diaspedia Corporation
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-zinc-600">
                  <Link href="/careers" className="hover:text-black hover:underline">Careers</Link>
                  <Link href="/privacy" className="hover:text-black hover:underline">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-black hover:underline">Terms of Service</Link>
                  <Link href="/cookies" className="hover:text-black hover:underline">Cookie Policy</Link>
                </div>
                <p className="text-[10px] text-zinc-400 font-bold leading-relaxed">
                  diaspedia &copy; {new Date().getFullYear()}. We consolidate shipping demands to create better cross-border cost solutions. We do not operate custom user-defined shipment networks or generic cargo lines.
                </p>
              </div>
            </motion.div>
          )}

        </main>

        {/* DETAILS DRAWER / JOIN CONSOLIDATION FLOW */}
        <AnimatePresence>
          {selectedRoute && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black z-40"
                onClick={() => {
                  if (!simulatedLoading) {
                    setSelectedRoute(null);
                    setCargoItems([]);
                  }
                }}
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-12px_32px_rgba(15,17,21,0.15)] z-45 max-h-[90%] overflow-y-auto p-6 space-y-5 flex flex-col pb-safe-bottom"
              >
                {/* Drag Handle */}
                <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto shrink-0" />

                {/* Header Information */}
                <div className="flex justify-between items-start gap-4 shrink-0">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-black text-[#71E300] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Shipment Route Detail
                    </span>
                    <h3 className="text-2xl font-black font-heading text-black pt-1">
                      {selectedRoute.from} ➔ {selectedRoute.to}
                    </h3>
                    <p className="text-xs text-zinc-500 font-bold">
                      Consolidation deadline: {selectedRoute.joinBefore} &bull; Next container leaves: {selectedRoute.nextShipment}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRoute(null);
                      setCargoItems([]);
                    }}
                    className="p-1 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all text-zinc-500 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* TRIP OVERVIEW / DECLARE ITEMS PANEL */}
                {!isJoining ? (
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#F6F4ED] rounded-xl p-3 border border-black/[0.01]">
                        <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider block">ROUTE TIER COST</span>
                        <div className="text-sm font-black text-black mt-0.5">€{selectedRoute.currentPricePerKg.toFixed(2)}/kg</div>
                      </div>
                      <div className="bg-[#F6F4ED] rounded-xl p-3 border border-black/[0.01]">
                        <span className="text-[9px] text-zinc-400 font-black uppercase tracking-wider block">STANDARD COST</span>
                        <div className="text-sm font-extrabold text-zinc-400 line-through mt-0.5">€{selectedRoute.basePricePerKg.toFixed(2)}/kg</div>
                      </div>
                    </div>

                    {/* How routing pool saving works */}
                    <div className="bg-[#71E300]/10 border border-[#71E300]/30 rounded-2xl p-4 flex gap-3 items-start">
                      <Info size={18} className="text-black shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-black">Pool Discount Status</h4>
                        <p className="text-[11px] text-zinc-700 leading-relaxed font-semibold">
                          Because {selectedRoute.pooledParticipants} travelers have joined this route container, we secured a bulk rate from the freight provider. You are receiving a {selectedRoute.savingsPercentage}% lower price.
                        </p>
                      </div>
                    </div>

                    {/* Simple Step indicator */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-black tracking-wider text-zinc-500 uppercase">
                        Route consolidation status
                      </h4>
                      <div className="flex justify-between items-center bg-zinc-50 border border-black/[0.01] rounded-2xl p-3.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-[#5ec700]" />
                          <span className="text-xs font-bold text-black">Consolidation active</span>
                        </div>
                        <span className="text-[11px] font-extrabold text-zinc-500">
                          {selectedRoute.pooledParticipants}/150 packages pooled
                        </span>
                      </div>
                    </div>

                    {/* Action to add cargo items */}
                    <button
                      type="button"
                      onClick={() => setIsJoining(true)}
                      className="w-full bg-black hover:bg-zinc-900 active:scale-95 text-white font-bold text-sm py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Declare Items & Join Pool</span>
                      <ArrowRight size={16} className="text-[#71E300]" />
                    </button>
                  </div>
                ) : (
                  // ADD CARGO ITEMS DECLARATION WIZARD
                  <div className="space-y-5 flex-1">

                    {/* List of currently declared items */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black tracking-wider text-zinc-500 uppercase">
                        Declared items list
                      </h4>

                      {cargoItems.length > 0 ? (
                        <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                          {cargoItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-zinc-50 border border-black/[0.02] rounded-xl p-3 flex justify-between items-center"
                            >
                              <div>
                                <div className="text-xs font-bold text-black">{item.name}</div>
                                <div className="text-[9px] text-zinc-400 font-bold">{item.category} &bull; {item.weightKg} kg</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(idx)}
                                className="text-zinc-400 hover:text-black p-1"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-xl p-6 text-center text-xs text-zinc-400 font-semibold">
                          No items declared yet. Add items below.
                        </div>
                      )}
                    </div>

                    {/* Add Item Form inside Drawer */}
                    <form onSubmit={handleAddItemToCargo} className="bg-[#F6F4ED] p-3.5 rounded-2xl border border-black/5 space-y-3">
                      <div className="text-xs font-black text-black">Declare a new item:</div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-zinc-500 uppercase block">ITEM NAME</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Textbooks"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            className="w-full bg-white border border-black/5 rounded-lg p-2 text-xs font-bold focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-zinc-500 uppercase block">WEIGHT (KG)</label>
                          <input
                            type="number"
                            min={1}
                            max={50}
                            required
                            value={newItemWeight}
                            onChange={(e) => setNewItemWeight(Number(e.target.value))}
                            className="w-full bg-white border border-black/5 rounded-lg p-2 text-xs font-bold focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-zinc-500 uppercase block">CATEGORY</label>
                          <select
                            value={newItemCategory}
                            onChange={(e) => setNewItemCategory(e.target.value)}
                            className="w-full bg-white border border-black/5 rounded-lg p-2 text-xs font-bold focus:outline-none"
                          >
                            <option>Personal goods</option>
                            <option>Electronics</option>
                            <option>Education</option>
                            <option>Healthcare</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="bg-black text-white rounded-lg text-xs font-black hover:bg-zinc-900 active:scale-95 transition-all self-end h-[36px]"
                        >
                          + Add Item
                        </button>
                      </div>
                    </form>

                    {/* Pricing Summary Details */}
                    {cargoItems.length > 0 && (
                      <div className="bg-[#71E300]/10 border border-[#71E300]/20 rounded-2xl p-4 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-zinc-700">Total Pooled Weight:</span>
                          <span className="font-bold text-black">{totalWeight} kg</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-zinc-700">Standard Freight rate:</span>
                          <span className="font-bold text-zinc-400 line-through">€{(totalWeight * selectedRoute.basePricePerKg).toFixed(2)}</span>
                        </div>
                        <div className="border-t border-black/5 pt-2 flex justify-between items-center text-xs">
                          <span className="font-bold text-black">Consolidated Total:</span>
                          <span className="font-black text-black text-sm">€{calculatedPrice.toFixed(2)}</span>
                        </div>
                        <div className="text-[10px] text-[#5ec700] font-bold text-center pt-1 uppercase tracking-widest">
                          🎉 YOU SAVE €{calculatedSavings.toFixed(2)} BY POOLING!
                        </div>
                      </div>
                    )}

                    {/* Booking confirmations */}
                    <div className="pt-1">
                      {bookingSuccess ? (
                        <div className="space-y-2 text-center py-4">
                          <CheckCircle2 size={32} className="mx-auto text-[#5ec700]" />
                          <h4 className="text-xs font-bold text-zinc-800">Route container joined successfully!</h4>
                          <p className="text-[11px] text-zinc-400">Updating your shipping tracking feed...</p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleConfirmCargoBooking}
                          disabled={cargoItems.length === 0 || simulatedLoading}
                          className="w-full bg-[#71E300] hover:bg-[#5ec700] disabled:bg-zinc-100 disabled:text-zinc-400 active:scale-95 text-black font-bold text-sm py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {simulatedLoading ? (
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>Confirm Cargo Space reservation</span>
                              <Check size={16} />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                )}

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* PERSISTENT PINNED TAB BAR NAVIGATION */}
        <nav className="sticky bottom-0 left-0 right-0 bg-[#F6F4ED]/95 backdrop-blur-md border-t border-black/[0.04] pt-4 pb-8 px-4 flex justify-around shrink-0 z-35 shadow-[0_-8px_24px_rgba(15,17,21,0.03)] pb-safe-bottom">
          <button
            onClick={() => { setActiveTab("home"); setSelectedRoute(null); }}
            className={`flex flex-col items-center gap-1.5 p-1 transition-all cursor-pointer ${activeTab === "home" ? "text-black scale-105 font-bold" : "text-zinc-400 hover:text-black"}`}
          >
            <Globe size={18} className={activeTab === "home" ? "text-black" : "text-zinc-400"} />
            <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
          </button>
          <button
            onClick={() => { setActiveTab("shipments"); setSelectedRoute(null); }}
            className={`flex flex-col items-center gap-1.5 p-1 transition-all cursor-pointer ${activeTab === "shipments" ? "text-black scale-105 font-bold" : "text-zinc-400 hover:text-black"}`}
          >
            <Calendar size={18} className={activeTab === "shipments" ? "text-black" : "text-zinc-400"} />
            <span className="text-[10px] font-black uppercase tracking-wider">Shipments</span>
          </button>
          <button
            onClick={() => { setActiveTab("orders"); setSelectedRoute(null); }}
            className={`flex flex-col items-center gap-1.5 p-1 transition-all cursor-pointer ${activeTab === "orders" ? "text-black scale-105 font-bold" : "text-zinc-400 hover:text-black"}`}
          >
            <Package size={18} className={activeTab === "orders" ? "text-black" : "text-zinc-400"} />
            <span className="text-[10px] font-black uppercase tracking-wider">My Orders</span>
          </button>
          <button
            onClick={() => { setActiveTab("profile"); setSelectedRoute(null); }}
            className={`flex flex-col items-center gap-1.5 p-1 transition-all cursor-pointer ${activeTab === "profile" ? "text-black scale-105 font-bold" : "text-zinc-400 hover:text-black"}`}
          >
            <User size={18} className={activeTab === "profile" ? "text-black" : "text-zinc-400"} />
            <span className="text-[10px] font-black uppercase tracking-wider">Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
}
