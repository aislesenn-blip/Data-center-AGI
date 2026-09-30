"use client";

import React, { useState } from "react";
import {
  Package,
  CreditCard,
  Bell,
  HelpCircle,
  Globe,
  LogOut,
  ChevronRight,
  User,
  ShieldCheck,
  Check
} from "lucide-react";

interface ProfileScreenProps {
  onViewMyParcels: () => void;
  onSendParcel: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onViewMyParcels,
  onSendParcel,
}) => {
  const [language, setLanguage] = useState<"English" | "Swahili">("English");
  const [notifications, setNotifications] = useState(true);
  const [showToast, setShowToast] = useState("");

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(""), 2500);
  };

  return (
    <div className="p-4 space-y-5">
      {/* User Header */}
      <div className="bg-white border border-gray-200 rounded-md p-4 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] font-bold text-lg">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-base">Juma Hassan</h1>
          <p className="text-xs text-gray-500 font-mono">+255 712 345 678</p>
          <span className="inline-flex items-center gap-1 text-[11px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 mt-1">
            <ShieldCheck className="w-3 h-3" /> Verified Tanzanian Account
          </span>
        </div>
      </div>

      {showToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-3 py-2 rounded-md flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Menu Options */}
      <div className="bg-white border border-gray-200 rounded-md divide-y divide-gray-100 text-sm">
        <button
          onClick={onViewMyParcels}
          className="w-full p-3.5 text-left flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Package className="w-4 h-4 text-[#0066FF]" />
            <span className="font-medium text-gray-900">My parcels</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={() => triggerToast("Mobile Money accounts configured (M-Pesa, Tigo Pesa)")}
          className="w-full p-3.5 text-left flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">Payment methods</span>
          </div>
          <span className="text-xs text-gray-400">M-Pesa / Tigo</span>
        </button>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">Notifications</span>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => {
              setNotifications(e.target.checked);
              triggerToast(
                e.target.checked
                  ? "SMS notifications enabled"
                  : "SMS notifications disabled"
              );
            }}
            className="w-4 h-4 text-[#0066FF] rounded border-gray-300 focus:ring-[#0066FF]"
          />
        </div>

        <button
          onClick={() => {
            const nextLang = language === "English" ? "Swahili" : "English";
            setLanguage(nextLang);
            triggerToast(`Language switched to ${nextLang}`);
          }}
          className="w-full p-3.5 text-left flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">Language</span>
          </div>
          <span className="text-xs font-semibold text-[#0066FF]">{language}</span>
        </button>

        <button
          onClick={() => triggerToast("BluePost Support: Call +255 800 110 022")}
          className="w-full p-3.5 text-left flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">Help & Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Log out action */}
      <button
        onClick={() => triggerToast("Logged out successfully")}
        className="w-full bg-white border border-gray-200 rounded-md p-3.5 text-red-600 font-semibold text-sm hover:bg-red-50 flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Log out
      </button>

      <div className="text-center pt-2">
        <p className="text-[11px] text-gray-400">
          BluePost Tanzania v1.0 • Passenger Bus Logistics
        </p>
      </div>
    </div>
  );
};
