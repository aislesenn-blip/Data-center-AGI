const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// 1. Imports
content = content.replace(
  /import { Tag, X, Car, Bike, Package, Zap, Search, Clock, PlusSquare, Utensils, Home, Calendar, User, MapPin, Plus, ArrowDownUp, Menu, Banknote, CreditCard, Smartphone, ChevronRight, Settings } from "lucide-react"/,
  'import { Tag, X, Car, Bike, Package, Search, Clock, PlusSquare, Utensils, Home, Calendar, User, MapPin, Plus, ArrowDownUp, Menu, Banknote, CreditCard, Smartphone, ChevronRight, Settings, Send, Timer, Navigation } from "lucide-react"'
);

// 2. MapPin replacement in LOCATIONS
content = content.replace(
  /\{ id: 2, name: "MOSHI URBAN", sub: "Area", dist: "", icon: MapPin, type: "area" \}/,
  '{ id: 2, name: "MOSHI URBAN", sub: "Area", dist: "", icon: Navigation, type: "area" }'
);
content = content.replace(
  /\{ id: 3, name: "KCMC", sub: "Hospital", dist: "5.2 km", icon: MapPin, type: "location" \}/,
  '{ id: 3, name: "KCMC", sub: "Hospital", dist: "5.2 km", icon: Navigation, type: "location" }'
);
content = content.replace(
  /\{ id: 4, name: "Hugo's Garden", sub: "Restaurant", dist: "2.1 km", icon: MapPin, type: "location" \}/,
  '{ id: 4, name: "Hugo\'s Garden", sub: "Restaurant", dist: "2.1 km", icon: Navigation, type: "location" }'
);

// 3. HOME Background
// Add bg-[#F9FAFB] to HOME view parent
content = content.replace(
  /className="flex-1 overflow-y-auto pt-\[env\(safe-area-inset-top\)\] pb-\[env\(safe-area-inset-bottom\)\] px-4"/,
  'className="flex-1 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] px-4 bg-[#F9FAFB]"'
);

// 4. H1
content = content.replace(
  /className="text-\[24px\] font-bold text-\[#111827\] mb-4 tracking-\[-0\.5px\]"/,
  'className="text-[28px] font-extrabold text-[#111827] mb-6 tracking-[-0.5px]"'
);

// 5. Bento Grid
const oldBento = `{/* Bento Grid */}
              <div className="flex flex-row justify-between gap-4 mb-6">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateTo("ROUTE_SELECTION")}
                  className="flex-1 h-[110px] bg-[#F3F4F6] rounded-[16px] p-3 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center self-end mb-2">
                     <Package className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-[16px] font-medium text-[#111827]">I Need Something</div>
                    <div className="text-[12px] text-[#6B7280]">Request an item</div>
                  </div>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateTo("ROUTE_SELECTION")}
                  className="flex-1 h-[110px] bg-[#F3F4F6] rounded-[16px] p-3 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center self-end mb-2">
                     <Zap className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-[16px] font-medium text-[#111827]">Send Something</div>
                    <div className="text-[12px] text-[#6B7280]">Deliver an item</div>
                  </div>
                </motion.div>
              </div>`;

const newBento = `{/* Bento Grid */}
              <div className="flex flex-row justify-between gap-4 mb-8">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateTo("ROUTE_SELECTION")}
                  className="flex-1 h-[130px] bg-white rounded-[24px] border border-gray-100 shadow-sm p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-10 h-10 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center self-start mb-2">
                     <Package className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="mt-auto">
                    <div className="text-[16px] font-bold text-[#111827] leading-tight">I Need Something</div>
                    <div className="text-[13px] font-medium text-[#6B7280] mt-0.5">Request an item</div>
                  </div>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateTo("ROUTE_SELECTION")}
                  className="flex-1 h-[130px] bg-white rounded-[24px] border border-gray-100 shadow-sm p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-10 h-10 bg-[#F9FAFB] rounded-[14px] flex items-center justify-center self-start mb-2">
                     <Send className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="mt-auto">
                    <div className="text-[16px] font-bold text-[#111827] leading-tight">Send Something</div>
                    <div className="text-[13px] font-medium text-[#6B7280] mt-0.5">Deliver an item</div>
                  </div>
                </motion.div>
              </div>`;

content = content.replace(oldBento, newBento);

// 6. Search Input CTA
const oldSearch = `{/* Search Input CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("ROUTE_SELECTION")}
                className="w-full h-[56px] bg-[#F3F4F6] rounded-[16px] flex items-center px-4 mb-6 cursor-text"
              >
                <Search className="w-5 h-5 text-[#111827] mr-3" />
                <span className="text-[18px] font-semibold text-[#111827]">Need something?</span>
              </motion.button>`;

const newSearch = `{/* Search Input CTA */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("ROUTE_SELECTION")}
                className="w-full h-[60px] bg-white rounded-[24px] border border-gray-100 shadow-sm flex items-center px-5 mb-8 cursor-text"
              >
                <Search className="w-5 h-5 text-[#111827] mr-3" strokeWidth={2} />
                <span className="text-[18px] font-bold text-[#111827]">Need something?</span>
              </motion.button>`;

content = content.replace(oldSearch, newSearch);

// 7. Recent Locations
const oldRecent = `{/* Recent Locations */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center cursor-pointer" onClick={() => navigateTo("ROUTE_SELECTION")}>
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center mr-4">
                    <Clock className="w-5 h-5 text-[#111827]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-medium text-[#111827]">Moshi Urban</span>
                    <span className="text-[14px] text-[#6B7280]">Tanzania</span>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer" onClick={() => navigateTo("ROUTE_SELECTION")}>
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center mr-4">
                    <PlusSquare className="w-5 h-5 text-[#111827]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-medium text-[#111827]">KCMC</span>
                    <span className="text-[14px] text-[#6B7280]">Hospital</span>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer" onClick={() => navigateTo("ROUTE_SELECTION")}>
                  <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center mr-4">
                    <Utensils className="w-5 h-5 text-[#111827]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-medium text-[#111827]">Hugo&apos;s Garden</span>
                    <span className="text-[14px] text-[#6B7280]">Restaurant</span>
                  </div>
                </div>
              </div>`;

const newRecent = `{/* Recent Locations */}
              <h2 className="text-[18px] font-bold text-[#111827] mb-4">Recent</h2>
              <div className="flex flex-col gap-3 pb-8">
                <div className="flex items-center cursor-pointer bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm" onClick={() => navigateTo("ROUTE_SELECTION")}>
                  <div className="w-12 h-12 rounded-[14px] bg-[#F9FAFB] flex items-center justify-center mr-4 shrink-0">
                    <Clock className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#111827]">Moshi Urban</span>
                    <span className="text-[14px] font-medium text-[#6B7280]">Tanzania</span>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm" onClick={() => navigateTo("ROUTE_SELECTION")}>
                  <div className="w-12 h-12 rounded-[14px] bg-[#F9FAFB] flex items-center justify-center mr-4 shrink-0">
                    <PlusSquare className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#111827]">KCMC</span>
                    <span className="text-[14px] font-medium text-[#6B7280]">Hospital</span>
                  </div>
                </div>
                <div className="flex items-center cursor-pointer bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm" onClick={() => navigateTo("ROUTE_SELECTION")}>
                  <div className="w-12 h-12 rounded-[14px] bg-[#F9FAFB] flex items-center justify-center mr-4 shrink-0">
                    <Utensils className="w-5 h-5 text-[#111827]" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#111827]">Hugo&apos;s Garden</span>
                    <span className="text-[14px] font-medium text-[#6B7280]">Restaurant</span>
                  </div>
                </div>
              </div>`;

content = content.replace(oldRecent, newRecent);

// 8. Vehicle List (Standard / Express)
const oldVehicleStandard = `{/* Standard Runner */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVehicle("standard")}
                  className={\`w-full p-3 rounded-[12px] border-[2px] \${selectedVehicle === "standard" ? "border-[#1D965C]" : "border-transparent"} bg-white flex items-center justify-between shadow-sm cursor-pointer relative overflow-hidden\`}
                >
                   <div className="flex items-center gap-3 relative z-10">
                     <div className={\`w-16 h-12 flex items-center justify-center shrink-0 \${selectedVehicle === "standard" ? "" : "opacity-60"}\`}>
                        <Package className="w-10 h-10 text-gray-800" strokeWidth={1.5} />
                     </div>
                     <div className="flex flex-col">
                       <div className="flex items-center gap-2">
                         <span className={\`text-[18px] \${selectedVehicle === "standard" ? "font-bold" : "font-semibold"} text-[#111827]\`}>Standard</span>
                       </div>
                       <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                         <span className="font-medium text-[#111827]">~15 min</span>
                       </div>
                       <span className="text-[12px] text-[#6B7280]">Normal delivery speed</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={\`text-[16px] \${selectedVehicle === "standard" ? "font-bold" : "font-semibold"} text-[#111827]\`}>TZS 4,500</span>
                   </div>
                   {selectedVehicle === "standard" && <div className="absolute inset-0 bg-[#1D965C] opacity-5 z-0" />}
                </motion.div>`;

const newVehicleStandard = `{/* Standard Runner */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVehicle("standard")}
                  className={\`w-full p-4 rounded-[24px] border-[2px] \${selectedVehicle === "standard" ? "border-[#1D965C] bg-[#1D965C]/5" : "border-gray-100 bg-white shadow-sm"} flex items-center justify-between cursor-pointer relative overflow-hidden\`}
                >
                   <div className="flex items-center gap-4 relative z-10">
                     <div className={\`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 bg-white shadow-sm \${selectedVehicle === "standard" ? "" : "opacity-60"}\`}>
                        <Package className="w-6 h-6 text-gray-800" strokeWidth={1.5} />
                     </div>
                     <div className="flex flex-col">
                       <div className="flex items-center gap-2">
                         <span className={\`text-[18px] \${selectedVehicle === "standard" ? "font-bold" : "font-semibold"} text-[#111827]\`}>Standard</span>
                       </div>
                       <span className="text-[13px] font-medium text-[#6B7280]">~15 min • Normal speed</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={\`text-[18px] \${selectedVehicle === "standard" ? "font-bold" : "font-semibold"} text-[#111827]\`}>TZS 4,500</span>
                   </div>
                </motion.div>`;

const oldVehicleExpress = `{/* Express Runner */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVehicle("express")}
                  className={\`w-full p-3 rounded-[12px] border-[2px] \${selectedVehicle === "express" ? "border-[#1D965C]" : "border-transparent"} bg-white flex items-center justify-between cursor-pointer relative overflow-hidden\`}
                >
                   <div className="flex items-center gap-3 relative z-10">
                     <div className={\`w-16 h-12 flex items-center justify-center shrink-0 \${selectedVehicle === "express" ? "" : "opacity-60"}\`}>
                        <Zap className="w-10 h-10 text-gray-800" strokeWidth={1.5} />
                     </div>
                     <div className="flex flex-col">
                       <div className="flex items-center gap-2">
                         <span className={\`text-[18px] \${selectedVehicle === "express" ? "font-bold" : "font-semibold"} text-[#111827]\`}>Express</span>
                         {selectedVehicle === "express" && <span className="bg-[#1D965C] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">FASTER</span>}
                       </div>
                       <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                         <span className="font-medium text-[#111827]">~7 min</span>
                       </div>
                       <span className="text-[12px] text-[#6B7280]">Fastest delivery available</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={\`text-[16px] \${selectedVehicle === "express" ? "font-bold" : "font-semibold"} text-[#111827]\`}>TZS 6,000</span>
                   </div>
                   {selectedVehicle === "express" && <div className="absolute inset-0 bg-[#1D965C] opacity-5 z-0" />}
                </motion.div>`;

const newVehicleExpress = `{/* Express Runner */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVehicle("express")}
                  className={\`w-full p-4 rounded-[24px] border-[2px] \${selectedVehicle === "express" ? "border-[#1D965C] bg-[#1D965C]/5" : "border-gray-100 bg-white shadow-sm"} flex items-center justify-between cursor-pointer relative overflow-hidden\`}
                >
                   <div className="flex items-center gap-4 relative z-10">
                     <div className={\`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 bg-white shadow-sm \${selectedVehicle === "express" ? "" : "opacity-60"}\`}>
                        <Timer className="w-6 h-6 text-gray-800" strokeWidth={1.5} />
                     </div>
                     <div className="flex flex-col">
                       <div className="flex items-center gap-2">
                         <span className={\`text-[18px] \${selectedVehicle === "express" ? "font-bold" : "font-semibold"} text-[#111827]\`}>Express</span>
                         {selectedVehicle === "express" && <span className="bg-[#1D965C] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">FAST</span>}
                       </div>
                       <span className="text-[13px] font-medium text-[#6B7280]">~7 min • Priority delivery</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end relative z-10">
                     <span className={\`text-[18px] \${selectedVehicle === "express" ? "font-bold" : "font-semibold"} text-[#111827]\`}>TZS 6,000</span>
                   </div>
                </motion.div>`;

content = content.replace(oldVehicleStandard, newVehicleStandard);
content = content.replace(oldVehicleExpress, newVehicleExpress);

// Replace the priority sticky banner Zap with Timer
content = content.replace(
  /<Zap className="w-4 h-4 text-\[#4F46E5\]" \/>/,
  '<Timer className="w-4 h-4 text-[#4F46E5]" />'
);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Update complete.');
