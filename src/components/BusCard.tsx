"use client";

import React from "react";
import { ArrowRight, Bus } from "lucide-react";
import { BusRouteOption } from "@/lib/types";
import { Button } from "./Button";

interface BusCardProps {
  bus: BusRouteOption;
  onSelect: (bus: BusRouteOption) => void;
  selected?: boolean;
}

export const BusCard: React.FC<BusCardProps> = ({
  bus,
  onSelect,
  selected = false,
}) => {
  return (
    <div
      className={`bg-white border rounded-md p-4 transition-all ${
        selected ? "border-[#0066FF] ring-2 ring-blue-100" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-sm border border-blue-100">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{bus.operator}</h3>
            <p className="text-xs text-gray-500">Passenger Express</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 block">Parcel price</span>
          <span className="font-bold text-base text-[#0066FF]">
            TZS {bus.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-2.5 mb-3.5 flex items-center justify-between text-xs text-gray-700">
        <div>
          <span className="text-gray-500 block text-[11px]">Departure</span>
          <span className="font-semibold text-sm text-gray-900">{bus.departureTime}</span>
          <span className="block text-gray-500">{bus.from}</span>
        </div>

        <ArrowRight className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" />

        <div className="text-right">
          <span className="text-gray-500 block text-[11px]">Arrival</span>
          <span className="font-semibold text-sm text-gray-900">{bus.arrivalTime}</span>
          <span className="block text-gray-500">{bus.to}</span>
        </div>
      </div>

      <Button
        variant={selected ? "primary" : "outline"}
        size="sm"
        onClick={() => onSelect(bus)}
      >
        {selected ? "Selected" : "Select Bus"}
      </Button>
    </div>
  );
};
