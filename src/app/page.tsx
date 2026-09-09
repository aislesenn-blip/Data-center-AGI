"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Navigation as NavIcon,
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  Check,
  ChevronRight,
  Compass,
  Store,
  Tag,
  Share2,
  ExternalLink,
  ChevronUp,
  Info
} from "lucide-react";

import {
  CAMPUS_BUSINESSES,
  POPULAR_NEEDS,
  Business,
  OfferedItem
} from "@/lib/windoData";

export default function Home() {
  // Navigation / View State: "explore" | "search" | "merchant"
  const [activeTab, setActiveTab] = useState<"explore" | "search" | "merchant">("explore");

  // Businesses state (supports adding merchant items dynamically)
  const [businesses, setBusinesses] = useState<Business[]>(CAMPUS_BUSINESSES);

  // Selected business modal / bottom sheet
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  // Search input state
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sheet collapse/expand state for Uber-like sheet
  const [sheetExpanded, setSheetExpanded] = useState<boolean>(false);

  // Merchant creation modal state
  const [showMerchantModal, setShowMerchantModal] = useState<boolean>(false);
  const [selectedMerchantBizId, setSelectedMerchantBizId] = useState<string>(CAMPUS_BUSINESSES[0].id);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemPrice, setNewItemPrice] = useState<string>("");
  const [newItemCategory, setNewItemCategory] = useState<"product" | "service" | "food">("product");
  const [merchantSuccessMsg, setMerchantSuccessMsg] = useState<string | null>(null);

  // Direction / Route simulation banner state
  const [routeActiveBiz, setRouteActiveBiz] = useState<Business | null>(null);

  // Uber transition curve
  const uberTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  // Filtered businesses matching searchQuery (item-level or business level)
  const filteredBusinesses = useMemo(() => {
    if (!searchQuery.trim()) return businesses;
    const q = searchQuery.toLowerCase().trim();

    return businesses.filter((biz) => {
      // 1. Check business name or category
      if (biz.name.toLowerCase().includes(q) || biz.category.toLowerCase().includes(q)) {
        return true;
      }
      // 2. Check summary items
      if (biz.itemsSummary.some((item) => item.toLowerCase().includes(q))) {
        return true;
      }
      // 3. Check individual items
      if (biz.items.some((item) => item.name.toLowerCase().includes(q))) {
        return true;
      }
      return false;
    });
  }, [businesses, searchQuery]);

  // Handle Quick Need Tap
  const handleSelectNeed = (needLabel: string) => {
    setSearchQuery(needLabel);
    setActiveTab("explore");
  };

  // Add new merchant item
  const handleAddMerchantItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemPrice.trim()) return;

    const formattedPrice = newItemPrice.startsWith("€") ? newItemPrice : `€${newItemPrice}`;

    setBusinesses((prev) =>
      prev.map((biz) => {
        if (biz.id === selectedMerchantBizId) {
          const newItem: OfferedItem = {
            id: `item-${Date.now()}`,
            name: newItemName.trim(),
            price: formattedPrice,
            category: newItemCategory,
            statusTag: "Available now"
          };
          return {
            ...biz,
            items: [newItem, ...biz.items],
            itemsSummary: [newItem.name, ...biz.itemsSummary]
          };
        }
        return biz;
      })
    );

    setMerchantSuccessMsg(`Successfully added "${newItemName.trim()}" (${formattedPrice})!`);
    setNewItemName("");
    setNewItemPrice("");
    setTimeout(() => {
      setMerchantSuccessMsg(null);
      setShowMerchantModal(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-black font-sans antialiased flex justify-center overflow-hidden">
      {/* Phone Viewport Container Shell */}
      <div className="w-full max-w-md bg-white h-[100dvh] relative flex flex-col shadow-2xl overflow-hidden">

        {/* ======================================================== */}
        {/* MAP BACKGROUND (THE PRODUCT)                            */}
        {/* ======================================================== */}
        <div className="absolute inset-0 z-0 bg-[#E5E3DF] overflow-hidden">
          {/* Tile-based OpenStreetMap view centered on Frankfurt Campus */}
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=8.6600%2C50.1220%2C8.6750%2C50.1330&layer=mapnik"
            className="w-full h-full border-0 grayscale-[25%] contrast-[105%]"
            title="WINDO Campus Map"
          />

          {/* Map Overlay Soft Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

          {/* Interactive Business Markers on Map */}
          {filteredBusinesses.map((biz, idx) => {
            // Position pins on map overlay
            const topPositions = [28, 42, 22, 58, 36, 68];
            const leftPositions = [48, 62, 28, 38, 72, 54];
            const topPos = topPositions[idx % topPositions.length];
            const leftPos = leftPositions[idx % leftPositions.length];

            const isSelected = selectedBusiness?.id === biz.id;

            return (
              <button
                key={biz.id}
                onClick={() => {
                  setSelectedBusiness(biz);
                  setSheetExpanded(true);
                }}
                style={{ top: `${topPos}%`, left: `${leftPos}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all cursor-pointer group focus:outline-none`}
              >
                {/* Pin Badge */}
                <div
                  className={`px-3 py-1.5 rounded-full shadow-lg font-black text-xs flex items-center gap-1.5 border transition-all ${
                    isSelected
                      ? "bg-black text-white border-black scale-110 shadow-2xl ring-4 ring-black/20"
                      : "bg-white text-black border-zinc-200 hover:scale-105"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                  <span className="truncate max-w-[110px]">{biz.name}</span>
                </div>

                {/* Sub-label showing main offering or price */}
                {biz.priceRange && (
                  <div className="mt-1 bg-black/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow text-center w-max mx-auto opacity-90">
                    {biz.priceRange.split("—")[1] || biz.priceRange}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TOP FLOATING UBER-STYLE SEARCH HEADER                     */}
        {/* ======================================================== */}
        <header className="absolute top-4 left-4 right-4 z-30 space-y-2">
          {/* Top Brand & Search Bar Card */}
          <div className="bg-white rounded-2xl shadow-xl p-3.5 border border-zinc-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-black text-white font-black text-base flex items-center justify-center font-heading tracking-tighter shrink-0 select-none">
              W
            </div>

            <div className="flex-1 relative flex items-center">
              <Search size={18} className="absolute left-3 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search what you need (e.g. coffee, USB cable)..."
                className="w-full bg-[#F3F3F3] hover:bg-zinc-200/70 focus:bg-white text-black font-semibold text-xs py-2.5 pl-9 pr-8 rounded-xl focus:outline-none transition-all placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 p-1 rounded-full text-zinc-400 hover:text-black cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Quick Need Pills Horizontal Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5">
            {POPULAR_NEEDS.map((need) => {
              const isActive = searchQuery.toLowerCase() === need.label.toLowerCase();
              return (
                <button
                  key={need.label}
                  onClick={() => handleSelectNeed(need.label)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer border ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white/95 backdrop-blur-md text-zinc-800 border-zinc-200/80 hover:bg-white"
                  }`}
                >
                  <span>{need.icon}</span> <span className="ml-1 capitalize">{need.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Active Navigation Route Banner if user tapped [Go there] */}
        <AnimatePresence>
          {routeActiveBiz && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-28 left-4 right-4 z-30 bg-black text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center font-black">
                  <NavIcon size={20} />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Heading To</div>
                  <div className="text-sm font-black font-heading text-white">{routeActiveBiz.name}</div>
                  <div className="text-xs text-emerald-400 font-bold">{routeActiveBiz.distance} &bull; {routeActiveBiz.address}</div>
                </div>
              </div>
              <button
                onClick={() => setRouteActiveBiz(null)}
                className="p-2 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* BOTTOM FLOATING UBER-STYLE SHEET                         */}
        {/* ======================================================== */}
        <motion.div
          animate={{
            height: sheetExpanded ? "75%" : "38%"
          }}
          transition={uberTransition}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border-t border-zinc-100 z-20 flex flex-col overflow-hidden"
        >
          {/* Drag Handle Header */}
          <div
            onClick={() => setSheetExpanded(!sheetExpanded)}
            className="w-full py-3 flex flex-col items-center justify-center cursor-pointer select-none bg-white border-b border-zinc-50 shrink-0"
          >
            <div className="w-10 h-1 bg-zinc-300 rounded-full mb-1" />
            <div className="text-[11px] font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1">
              <span>{filteredBusinesses.length} Nearby Places</span>
              <ChevronUp size={12} className={`transition-transform duration-300 ${sheetExpanded ? "rotate-180" : ""}`} />
            </div>
          </div>

          {/* Business Cards Scroll Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {/* If search query has no results */}
            {filteredBusinesses.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-sm font-bold text-zinc-800">No places nearby offering &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-xs text-zinc-500">Try searching for coffee, haircut, USB cable, or lunch.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-xs font-bold text-black underline cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredBusinesses.map((biz) => {
                const isSelected = selectedBusiness?.id === biz.id;

                return (
                  <div
                    key={biz.id}
                    onClick={() => setSelectedBusiness(biz)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? "bg-black text-white border-black shadow-xl"
                        : "bg-[#F9F9F9] hover:bg-[#F2F2F2] text-black border-zinc-100"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-heading font-black text-base tracking-tight ${isSelected ? "text-white" : "text-black"}`}>
                            {biz.name}
                          </h3>
                        </div>
                        <p className={`text-xs font-medium mt-0.5 ${isSelected ? "text-zinc-400" : "text-zinc-500"}`}>
                          {biz.category} &bull; <span className="font-bold">{biz.distance}</span>
                        </p>
                      </div>

                      <span className={`text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        isSelected ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {biz.openingHours}
                      </span>
                    </div>

                    {/* Offered Items List Preview */}
                    <div className="space-y-1.5 pt-1 border-t border-zinc-200/40">
                      {biz.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs">
                          <span className={`font-medium ${isSelected ? "text-zinc-200" : "text-zinc-700"}`}>
                            {item.name}
                          </span>
                          <span className={`font-black ${isSelected ? "text-white" : "text-black"}`}>
                            {item.price}
                          </span>
                        </div>
                      ))}
                      {biz.items.length > 3 && (
                        <div className={`text-[11px] font-bold pt-0.5 ${isSelected ? "text-zinc-400" : "text-zinc-400"}`}>
                          + {biz.items.length - 3} more offerings
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex justify-between items-center pt-2">
                      <span className={`text-xs font-bold ${isSelected ? "text-zinc-400" : "text-zinc-500"}`}>
                        {biz.address}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRouteActiveBiz(biz);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-white text-black hover:bg-zinc-200"
                            : "bg-black text-white hover:bg-zinc-800"
                        }`}
                      >
                        <span>Go there</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* DETAILED BUSINESS WINDOW SHEET (WHEN CLICKED)            */}
        {/* ======================================================== */}
        <AnimatePresence>
          {selectedBusiness && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={uberTransition}
              className="absolute inset-x-0 bottom-0 top-16 bg-white z-40 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Sheet Header */}
              <div className="p-5 border-b border-zinc-100 flex justify-between items-start shrink-0">
                <div>
                  <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block">
                    Digital Window View
                  </span>
                  <h2 className="text-2xl font-heading font-black text-black tracking-tight leading-tight mt-0.5">
                    {selectedBusiness.name}
                  </h2>
                  <p className="text-xs font-bold text-zinc-500 mt-1 flex items-center gap-2">
                    <span className="text-black font-extrabold">{selectedBusiness.distance}</span>
                    <span>&bull;</span>
                    <span>{selectedBusiness.address}</span>
                  </p>
                </div>

                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="p-2 rounded-full bg-zinc-100 text-black hover:bg-zinc-200 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Offerings Body List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">

                {/* Real-Time Status & Hours */}
                <div className="bg-[#F8F8F8] p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-black">
                    <Clock size={16} className="text-emerald-600" />
                    <span>{selectedBusiness.openingHours}</span>
                  </div>
                  <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase">
                    Open Now
                  </span>
                </div>

                {/* What They Offer List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-black text-zinc-400 uppercase tracking-wider">
                      What you can get here
                    </h3>
                    <span className="text-xs font-bold text-zinc-500">{selectedBusiness.items.length} items</span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedBusiness.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 bg-white border border-zinc-100 rounded-2xl shadow-sm flex justify-between items-center hover:border-zinc-300 transition-all"
                      >
                        <div>
                          <div className="text-sm font-bold text-black">{item.name}</div>
                          {item.statusTag && (
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                              {item.statusTag}
                            </span>
                          )}
                        </div>

                        <div className="text-sm font-black text-black bg-[#F3F3F3] px-3 py-1.5 rounded-xl">
                          {item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Action Footer */}
              <div className="p-4 border-t border-zinc-100 bg-white shrink-0">
                <button
                  onClick={() => {
                    setRouteActiveBiz(selectedBusiness);
                    setSelectedBusiness(null);
                  }}
                  className="w-full bg-black hover:bg-zinc-800 text-white font-black text-sm py-4 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl"
                >
                  <span>Go to {selectedBusiness.name}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* MERCHANT OFFERING MODAL ("Add what you offer")           */}
        {/* ======================================================== */}
        <AnimatePresence>
          {showMerchantModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center"
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={uberTransition}
                className="w-full bg-white rounded-t-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                  <div>
                    <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Merchant Portal</span>
                    <h2 className="text-xl font-heading font-black text-black">Add what you offer</h2>
                  </div>
                  <button
                    onClick={() => setShowMerchantModal(false)}
                    className="p-2 rounded-full bg-zinc-100 text-black hover:bg-zinc-200 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {merchantSuccessMsg ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center mx-auto">
                      <Check size={20} />
                    </div>
                    <p className="text-xs font-black text-emerald-900">{merchantSuccessMsg}</p>
                  </div>
                ) : (
                  <form onSubmit={handleAddMerchantItem} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-600 block">Select Business</label>
                      <select
                        value={selectedMerchantBizId}
                        onChange={(e) => setSelectedMerchantBizId(e.target.value)}
                        className="w-full bg-[#F3F3F3] p-3 rounded-xl text-xs font-bold text-black border-0 focus:outline-none"
                      >
                        {businesses.map((b) => (
                          <option key={b.id} value={b.id}>{b.name} ({b.category})</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-600 block">Offering Name (Product or Service)</label>
                      <input
                        type="text"
                        required
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="e.g. USB-C Cable, Haircut, Espresso"
                        className="w-full bg-[#F3F3F3] p-3 rounded-xl text-xs font-bold text-black border-0 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-600 block">Price (€)</label>
                      <input
                        type="text"
                        required
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                        placeholder="e.g. 8.00 or 18.00"
                        className="w-full bg-[#F3F3F3] p-3 rounded-xl text-xs font-bold text-black border-0 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-600 block">Category</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["product", "service", "food"] as const).map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setNewItemCategory(cat)}
                            className={`py-2 text-xs font-bold capitalize rounded-xl border ${
                              newItemCategory === cat
                                ? "bg-black text-white border-black"
                                : "bg-[#F3F3F3] text-zinc-700 border-transparent"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-black text-white font-black text-xs py-4 rounded-2xl hover:bg-zinc-800 transition-all cursor-pointer shadow-lg mt-2"
                    >
                      Save Offering
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* PERSISTENT UBER-STYLE BOTTOM CAP NAVIGATION              */}
        {/* ======================================================== */}
        <nav className="absolute bottom-4 left-4 right-4 bg-black text-white rounded-full p-2 flex justify-around items-center z-30 shadow-2xl border border-white/10">
          <button
            onClick={() => {
              setActiveTab("explore");
              setSelectedBusiness(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === "explore" ? "bg-white text-black font-black" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Compass size={16} />
            <span>Explore</span>
          </button>

          <button
            onClick={() => {
              setShowMerchantModal(true);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer text-zinc-400 hover:text-white`}
          >
            <Plus size={16} />
            <span>Merchant</span>
          </button>
        </nav>

      </div>
    </div>
  );
}
