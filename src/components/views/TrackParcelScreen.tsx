"use client";

import React, { useState } from "react";
import { ParcelRecord } from "@/lib/types";
import { Button } from "../Button";
import { Search, AlertCircle } from "lucide-react";

interface TrackParcelScreenProps {
  onSearch: (code: string) => void;
  recentParcels: ParcelRecord[];
  onSelectParcel: (parcel: ParcelRecord) => void;
  initialCode?: string;
  notFoundCode?: string | null;
}

export const TrackParcelScreen: React.FC<TrackParcelScreenProps> = ({
  onSearch,
  recentParcels,
  onSelectParcel,
  initialCode = "",
  notFoundCode = null,
}) => {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Please enter a tracking code");
      return;
    }
    setError("");
    onSearch(code.trim().toUpperCase());
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900">Track your parcel</h1>
        <p className="text-xs text-gray-500">
          Enter the tracking code written on your parcel (e.g., BP-7890).
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
              Tracking code
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="BP-7890"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  if (error) setError("");
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-lg font-mono font-bold uppercase text-gray-900 bg-gray-50 focus:border-[#0066FF] outline-none placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>
            {error && (
              <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>
            )}
          </div>

          <Button type="submit" variant="primary" size="lg">
            Track
          </Button>
        </form>
      </div>

      {/* Invalid Tracking Code State */}
      {notFoundCode && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-3 text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-bold text-sm text-red-900">
              We couldn't find that parcel.
            </h4>
            <p>
              No active shipment found with code{" "}
              <strong className="font-mono">{notFoundCode}</strong>.
            </p>
            <p className="text-red-700 font-medium">
              Try: Check the tracking code and try again (e.g. try BP-7890).
            </p>
          </div>
        </div>
      )}

      {/* Quick Select Recent Parcels */}
      {recentParcels.length > 0 && (
        <div className="space-y-2.5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Your recent parcels
          </h2>
          <div className="space-y-2">
            {recentParcels.map((parcel) => (
              <button
                key={parcel.id}
                type="button"
                onClick={() => onSelectParcel(parcel)}
                className="w-full bg-white border border-gray-200 rounded-md p-3 text-left hover:border-[#0066FF] flex items-center justify-between transition-all"
              >
                <div>
                  <span className="font-mono font-bold text-[#0066FF] text-sm block">
                    {parcel.code}
                  </span>
                  <span className="text-xs text-gray-700 font-medium block">
                    {parcel.from} → {parcel.to}
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {parcel.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
