"use client";

import React from "react";
import { ParcelRecord } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { ArrowRight, ChevronRight } from "lucide-react";

interface ParcelCardProps {
  parcel: ParcelRecord;
  onClick: (parcel: ParcelRecord) => void;
}

export const ParcelCard: React.FC<ParcelCardProps> = ({ parcel, onClick }) => {
  return (
    <div
      onClick={() => onClick(parcel)}
      className="bg-white border border-gray-200 rounded-md p-4 hover:border-blue-300 transition-all cursor-pointer active:bg-gray-50 flex items-center justify-between"
    >
      <div className="space-y-1.5 flex-1 pr-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0066FF] text-sm tracking-wide">
            {parcel.code}
          </span>
          <StatusBadge status={parcel.status} size="sm" />
        </div>

        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
          <span>{parcel.from}</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          <span>{parcel.to}</span>
        </div>

        <p className="text-xs text-gray-500">
          {parcel.busOperator} • {parcel.parcelType}
        </p>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </div>
  );
};
