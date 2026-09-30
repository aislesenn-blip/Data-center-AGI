"use client";

import React, { useState } from "react";
import { ParcelRecord } from "@/lib/types";
import { ParcelCard } from "../ParcelCard";
import { Button } from "../Button";
import { Package, Send } from "lucide-react";

interface MyParcelsScreenProps {
  parcels: ParcelRecord[];
  onSelectParcel: (parcel: ParcelRecord) => void;
  onSendClick: () => void;
}

export const MyParcelsScreen: React.FC<MyParcelsScreenProps> = ({
  parcels,
  onSelectParcel,
  onSendClick,
}) => {
  const [filter, setFilter] = useState<"all" | "active" | "delivered">("all");

  const filteredParcels = parcels.filter((p) => {
    if (filter === "active") {
      return p.status !== "Collected";
    }
    if (filter === "delivered") {
      return p.status === "Collected";
    }
    return true;
  });

  return (
    <div className="p-4 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My parcels</h1>
          <p className="text-xs text-gray-500">
            {parcels.length} parcel{parcels.length === 1 ? "" : "s"} total
          </p>
        </div>

        <button
          onClick={onSendClick}
          className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-100"
        >
          <Send className="w-3.5 h-3.5" />
          Send new
        </button>
      </div>

      {/* Simple Filter Tabs */}
      <div className="flex bg-gray-200/80 p-1 rounded-md text-xs font-semibold">
        {(["all", "active", "delivered"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-1.5 rounded text-center capitalize transition-all ${
              filter === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      {filteredParcels.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-md p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <p className="text-sm text-gray-600">
            {filter === "all"
              ? "You haven't sent any parcels yet."
              : filter === "active"
              ? "No active parcels right now."
              : "No delivered parcels found."}
          </p>
          <Button size="sm" onClick={onSendClick}>
            Send a parcel
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredParcels.map((parcel) => (
            <ParcelCard
              key={parcel.id}
              parcel={parcel}
              onClick={onSelectParcel}
            />
          ))}
        </div>
      )}
    </div>
  );
};
