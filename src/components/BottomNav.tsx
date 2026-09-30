"use client";

import React from "react";
import { Home, Send, Search, User } from "lucide-react";

export type TabType = "home" | "send" | "track" | "my-parcels" | "profile";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "home" as TabType, label: "Home", icon: Home },
    { id: "send" as TabType, label: "Send", icon: Send },
    { id: "track" as TabType, label: "Track", icon: Search },
    { id: "profile" as TabType, label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-white border-t border-gray-200 sticky bottom-0 z-20 px-2 py-2 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id || (activeTab === "my-parcels" && tab.id === "profile");
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-md transition-colors ${
              isActive
                ? "text-[#0066FF] font-semibold bg-blue-50"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-xs">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
