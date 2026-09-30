"use client";

import React, { useState } from "react";
import { ParcelRecord } from "@/lib/types";
import { Button } from "../Button";
import { ParcelCard } from "../ParcelCard";
import { Send, Search, ArrowRight } from "lucide-react";

interface HomeScreenProps {
  onSendClick: () => void;
  onTrackClick: (code: string) => void;
  onSelectParcel: (parcel: ParcelRecord) => void;
  onViewAllParcels: () => void;
  recentParcels: ParcelRecord[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSendClick,
  onTrackClick,
  onSelectParcel,
  onViewAllParcels,
  recentParcels,
}) => {
  const [trackingCode, setTrackingCode] = useState("");
  const [error, setError] = useState("");

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) {
      setError("Please enter a tracking code");
      return;
    }
    setError("");
    onTrackClick(trackingCode.trim());
  };

  return (
    <div className="p-4 space-y-6">
      {/* Hero Banner */}
      <div className="bg-[#0066FF] text-white p-5 rounded-md space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Send a parcel anywhere in Tanzania.
          </h1>
          <p className="text-blue-100 text-sm mt-1.5">
            Simple, fast bus delivery between cities.
          </p>
        </div>

        <Button
          variant="secondary"
          size="lg"
          onClick={onSendClick}
          className="bg-white text-[#0066FF] hover:bg-blue-50 font-bold border-none shadow-sm"
        >
          <Send className="w-5 h-5" />
          Send a parcel
        </Button>
      </div>

      {/* Track Box */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-[#0066FF]" />
          <h2 className="font-bold text-gray-900 text-base">Track your parcel</h2>
        </div>

        <form onSubmit={handleTrackSubmit} className="space-y-2.5">
          <div>
            <input
              type="text"
              placeholder="e.g. BP-7890"
              value={trackingCode}
              onChange={(e) => {
                setTrackingCode(e.target.value.toUpperCase());
                if (error) setError("");
              }}
              className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-base focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none font-mono uppercase bg-gray-50 text-gray-900 placeholder:text-gray-400 placeholder:font-sans"
            />
            {error && <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>}
          </div>

          <Button type="submit" variant="primary" size="md">
            Track
          </Button>
        </form>
      </div>

      {/* Recent Parcels */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-base">Recent parcels</h3>
          {recentParcels.length > 0 && (
            <button
              onClick={onViewAllParcels}
              className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1"
            >
              View all ({recentParcels.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {recentParcels.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-md p-6 text-center space-y-3">
            <p className="text-gray-500 text-sm">You haven't sent any parcels yet.</p>
            <Button size="sm" onClick={onSendClick}>
              Send a parcel
            </Button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentParcels.slice(0, 3).map((parcel) => (
              <ParcelCard
                key={parcel.id}
                parcel={parcel}
                onClick={onSelectParcel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
