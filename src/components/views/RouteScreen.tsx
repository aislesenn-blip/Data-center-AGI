"use client";

import React, { useState } from "react";
import { TANZANIAN_CITIES, BUS_OPERATORS } from "@/lib/data";
import { BusRouteOption } from "@/lib/types";
import { BusCard } from "../BusCard";
import { ArrowRightLeft, Calendar } from "lucide-react";

interface RouteScreenProps {
  onSelectBusRoute: (
    from: string,
    to: string,
    date: string,
    bus: BusRouteOption
  ) => void;
  initialFrom?: string;
  initialTo?: string;
}

export const RouteScreen: React.FC<RouteScreenProps> = ({
  onSelectBusRoute,
  initialFrom = "Dar es Salaam",
  initialTo = "Arusha",
}) => {
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [travelDate, setTravelDate] = useState("Today");

  const handleSwap = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  // Filter available buses or match route
  const filteredBuses = BUS_OPERATORS.map((bus) => ({
    ...bus,
    from: fromCity,
    to: toCity,
  }));

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900">
          Where is your parcel going?
        </h1>
        <p className="text-xs text-gray-500">
          Select origin, destination and choose a passenger bus route.
        </p>
      </div>

      {/* From / To Selectors */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3 relative">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            From
          </label>
          <select
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-base font-medium text-gray-900 focus:border-[#0066FF] outline-none"
          >
            {TANZANIAN_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center -my-1">
          <button
            type="button"
            onClick={handleSwap}
            className="bg-[#0066FF] text-white p-2 rounded-full shadow hover:bg-blue-700 active:scale-95 transition-all"
            title="Swap cities"
            aria-label="Swap cities"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
            To
          </label>
          <select
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-base font-medium text-gray-900 focus:border-[#0066FF] outline-none"
          >
            {TANZANIAN_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Date selection */}
        <div className="pt-2 border-t border-gray-100 space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Choose travel date
          </label>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {["Today", "Tomorrow", "In 2 Days"].map((dateOpt) => (
              <button
                key={dateOpt}
                type="button"
                onClick={() => setTravelDate(dateOpt)}
                className={`py-2 px-3 text-xs font-semibold rounded border transition-all ${
                  travelDate === dateOpt
                    ? "bg-blue-50 border-[#0066FF] text-[#0066FF]"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {dateOpt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Available Buses */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900 text-base">
            Available bus companies
          </h2>
          <span className="text-xs text-gray-500 font-medium">
            {filteredBuses.length} buses found
          </span>
        </div>

        <div className="space-y-3">
          {filteredBuses.map((bus) => (
            <BusCard
              key={bus.id}
              bus={bus}
              onSelect={(selectedBus) =>
                onSelectBusRoute(fromCity, toCity, travelDate, selectedBus)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
