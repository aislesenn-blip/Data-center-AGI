"use client";

import Link from "next/link";
import { useState } from "react";
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
  MapPin,
  Sparkles,
  PhoneCall,
  Navigation
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

  // Reset demo state helper
  const handleResetDemoState = () => {
    setOrders(INITIAL_ORDERS);
    setCalcItems([
      { name: "Family study textbooks", category: "Books & Study Materials", weight: 3.0 }
    ]);
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex items-center justify-center font-sans overflow-hidden">

      {/*
        EXCLUSIVE MOBILE-FIRST CONTAINER
        - On desktop/tablet: Centered inside a gorgeous phone container with premium shadows and sleek outline.
        - On mobile (max-width 640px): Full screen edge-to-edge for native mobile look and feel.
      */}
      <div className="w-full max-w-[430px] h-screen sm:h-[880px] sm:max-h-[92vh] bg-zinc-950 rounded-none sm:rounded-[48px] p-0 sm:p-3 shadow-none sm:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] border-0 sm:border-[5px] border-zinc-800 relative flex flex-col overflow-hidden">

        {/* Phone Notch/Speaker - Only shown on framed screens */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-950 rounded-b-2xl z-50 items-center justify-center">
          <div className="w-12 h-1 bg-zinc-800 rounded-full"></div>
        </div>

        {/* Real App Body */}
        <div className="flex-1 bg-brand-bg rounded-none sm:rounded-[36px] overflow-hidden flex flex-col relative">

          {/* Internal App Navigation Header */}
          <div className="bg-white/80 backdrop-blur-md pt-6 pb-3 px-5 border-b border-black/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand-primary text-black flex items-center justify-center text-xs font-black rounded-lg">d</div>
              <span className="font-black text-sm tracking-tight text-brand-text">diaspedia</span>
            </div>

            <div className="flex items-center gap-1.5 bg-brand-primary/10 py-1 px-2.5 rounded-full text-[10px] font-bold text-brand-text">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
              Live Schedules
            </div>
          </div>

          {/* Scrollable Container for Active Tab Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

            {/* 1. HOME TAB */}
            {activeTab === "home" && (
              <div className="space-y-4">

                {/* Welcome & Tagline */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider text-brand-text-muted uppercase">TOGETHER, WE MAKE CROSS-BORDER CHEAPER</span>
                  <h2 className="text-xl font-bold tracking-tight text-brand-text">Send or receive items cheaper.</h2>
                </div>

                {/* Micro educational widget */}
                <div className="bg-brand-primary/10 border border-brand-primary/15 rounded-2xl p-3 flex gap-2.5 items-center">
                  <Info size={16} className="text-brand-text shrink-0" />
                  <p className="text-[11px] text-brand-text leading-snug font-medium">
                    Select an active route, use the calculator to add packages, and join the schedule to secure shared savings.
                  </p>
                </div>

                {/* Route Selector Cards */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold tracking-wider text-brand-text-muted uppercase px-1">1. Choose Route</h3>

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
                              <span>Route: €{route.basePricePerKg}/kg</span>
                              <span>•</span>
                              <span className="text-brand-primary font-bold">Save ~70%</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[10px] font-bold text-brand-text">Next: {route.nextShipment}</div>
                            <div className="text-[9px] text-brand-text-muted mt-0.5">Join by: {route.joinBefore}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Item Weight Calculator */}
                <div className="bg-white rounded-2xl border border-black/5 p-4 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-black/[0.04] pb-2.5">
                    <h3 className="text-xs font-bold tracking-wider text-brand-text-muted uppercase">2. Add package details</h3>
                    <span className="text-[10px] bg-brand-primary/15 text-brand-text font-bold px-1.5 py-0.5 rounded">
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
                              type="button"
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
                      No items added yet. Add details to calculate cost.
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
                          <span className="text-[9px] font-semibold text-brand-text-muted uppercase block">Solo Cargo Price</span>
                          <span className="text-xs font-bold line-through text-red-500">€{soloPrice.toFixed(2)}</span>
                        </div>

                        <div className="bg-brand-primary/10 p-2.5 rounded-xl border border-brand-primary/20">
                          <span className="text-[9px] font-semibold text-brand-text-muted uppercase block">Together Price</span>
                          <span className="text-sm font-black text-brand-text">€{currentPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="bg-[#71E300]/10 border border-[#71E300]/30 rounded-xl p-2.5 flex items-center justify-between text-xs">
                        <span className="font-bold text-brand-text">Combined Savings:</span>
                        <span className="font-black text-[#5ec700]">€{totalSavings.toFixed(2)} saved</span>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={openJoinModal}
                        type="button"
                        className="w-full bg-brand-primary text-black font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-brand-primary/10 hover:bg-brand-primary-hover transition-colors cursor-pointer"
                      >
                        Join Shipment Route & Save €{totalSavings.toFixed(0)} <ArrowRight size={14} />
                      </motion.button>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* 2. DATES / SHIPMENTS TAB */}
            {activeTab === "shipments" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold tracking-wider text-brand-text-muted uppercase">Shipments Schedules</span>
                  <h2 className="text-xl font-bold tracking-tight text-brand-text">Dates & Timelines</h2>
                </div>

                <p className="text-[11px] text-brand-text-muted leading-relaxed">
                  We schedule set departures. Once enough demand is pooled, shipments are locked, cleared through customs, and delivered together.
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

                      {/* Shipment progress timeline */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-brand-text-muted">
                          <span>Route Demand Consolidation</span>
                          <span>{route.progressPercent}% Consolidated</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/[0.04] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-primary rounded-full transition-all duration-500"
                            style={{ width: `${route.progressPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Details block */}
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
                          <span className="text-[8px] font-bold text-brand-text-muted uppercase block">Price / kg</span>
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
                  <span className="text-[11px] font-bold tracking-wider text-brand-text-muted uppercase">My active routes</span>
                  <h2 className="text-xl font-bold tracking-tight text-brand-text">My Orders</h2>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white border border-brand-secondary rounded-2xl p-4 space-y-3 shadow-sm relative overflow-hidden">

                        {/* Status bar */}
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

                        {/* Consolidated Items */}
                        <div className="bg-black/[0.02] rounded-xl p-2.5 space-y-1.5">
                          <span className="text-[9px] font-bold text-brand-text-muted uppercase block">Consolidated items</span>
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-[11px]">
                              <span className="text-brand-text truncate max-w-[180px]">{item.name}</span>
                              <span className="text-brand-text-muted shrink-0 font-medium">{item.weight} kg</span>
                            </div>
                          ))}
                        </div>

                        {/* Receiver specifics */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                          <div>
                            <span className="text-brand-text-muted block uppercase font-bold text-[8px]">Receiver</span>
                            <span className="font-semibold text-brand-text truncate block">{order.receiverName}</span>
                            <span className="text-zinc-400 font-mono truncate block">{order.receiverPhone}</span>
                          </div>
                          <div>
                            <span className="text-brand-text-muted block uppercase font-bold text-[8px]">Collection Method</span>
                            <span className="font-semibold text-brand-text capitalize block">{order.deliveryMethod}</span>
                            <span className="text-zinc-400 truncate block">Est. Arrival: {order.estimatedDelivery}</span>
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
                            className="text-[10px] font-bold text-red-500 hover:text-red-600 bg-red-50 px-2.5 py-1.5 rounded-lg active:scale-95 transition-all cursor-pointer"
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
                      <p className="text-xs font-bold text-brand-text">No active orders</p>
                      <p className="text-[10px] text-brand-text-muted mt-1">Select a route on the home tab, add items, and join the schedule.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("home")}
                      className="bg-brand-primary text-black font-semibold text-xs py-1.5 px-4 rounded-xl active:scale-95 transition-all mt-2 cursor-pointer"
                    >
                      Find Routes
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* 4. PROFILE & APP INFO TAB */}
            {activeTab === "profile" && (
              <div className="space-y-4">

                {/* Profile detail card */}
                <div className="bg-white border border-black/5 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                  <div className="w-12 h-12 bg-zinc-400 rounded-full flex items-center justify-center font-bold text-white text-lg">
                    ME
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-brand-text">Mariam Ernest</h4>
                    <p className="text-[10px] text-brand-text-muted">Joined: August 2024</p>
                    <div className="inline-flex items-center gap-1 bg-[#71E300]/15 text-[#5ec700] text-[9px] font-black px-1.5 py-0.5 rounded-full mt-1">
                      <Coins size={10} /> Saved €69.00 this month
                    </div>
                  </div>
                </div>

                {/* Profile statistics */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-black/5 rounded-xl p-3 text-center">
                    <span className="text-[9px] font-bold text-brand-text-muted uppercase block">Active Orders</span>
                    <span className="text-xl font-bold text-brand-text">{orders.length}</span>
                  </div>
                  <div className="bg-white border border-black/5 rounded-xl p-3 text-center">
                    <span className="text-[9px] font-bold text-brand-text-muted uppercase block">Combined Savings</span>
                    <span className="text-xl font-bold text-brand-text">
                      €{orders.reduce((acc, o) => acc + o.calculatedSavings, 0).toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Fintech money services vision */}
                <div className="bg-zinc-900 text-white rounded-2xl p-4 space-y-3 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-primary/10 rounded-full blur-xl"></div>

                  <div className="flex items-center gap-2">
                    <Coins className="text-brand-primary" size={16} />
                    <h4 className="font-bold text-xs tracking-wider uppercase text-zinc-300">The Future: Payments</h4>
                  </div>

                  <p className="text-[10px] text-zinc-400 leading-relaxed">
                    diaspedia is a future cross-border financial company starting with shipping. By building trust through physical logistics, we will expand into low-cost cross-border payments and money services for everyone.
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-zinc-500 font-mono">PHASE 2 DEPLOYMENT</span>
                    <span className="text-[8px] bg-brand-primary text-black font-extrabold px-1.5 py-0.5 rounded">COMING 2025</span>
                  </div>
                </div>

                {/* Accordion FAQs directly accessible in App profile */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold tracking-wider text-brand-text-muted uppercase px-1">App FAQs</h3>
                  <div className="space-y-1.5">
                    {FAQS.slice(0, 3).map((faq, idx) => (
                      <div key={idx} className="bg-white/50 border border-black/5 rounded-xl overflow-hidden text-xs">
                        <button
                          onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                          type="button"
                          className="w-full text-left px-3 py-2.5 flex items-center justify-between gap-2 font-semibold text-brand-text"
                        >
                          <span>{faq.q}</span>
                          {openFaqIndex === idx ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        {openFaqIndex === idx && (
                          <div className="px-3 pb-3 pt-0.5 text-[11px] text-brand-text-muted leading-relaxed border-t border-black/[0.03]">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer links inside the App */}
                <div className="pt-2 border-t border-black/5 text-center space-y-2">
                  <div className="flex justify-center gap-4 text-[10px] text-brand-text-muted font-bold">
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
                    className="w-full text-center text-[10px] font-bold text-red-500 hover:text-red-600 border border-red-200/50 hover:bg-red-50/50 py-2 rounded-xl transition-all"
                  >
                    Reset Demo Application
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
                          Central Pickup
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
                      <span>Combined Savings:</span>
                      <span className="text-[#5ec700]">Save €{totalSavings.toFixed(2)}</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-primary text-black font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary-hover active:scale-95 transition-all cursor-pointer"
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
