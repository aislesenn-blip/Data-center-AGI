"use client";

import React from "react";
import { ParcelRecord } from "@/lib/types";
import { StatusBadge } from "../StatusBadge";
import { TrackingTimeline } from "../TrackingTimeline";
import { ArrowRight, Bus, Phone, MapPin, User, ArrowLeft } from "lucide-react";

interface ParcelTrackingDetailsProps {
  parcel: ParcelRecord;
  onBack: () => void;
}

export const ParcelTrackingDetails: React.FC<ParcelTrackingDetailsProps> = ({
  parcel,
  onBack,
}) => {
  return (
    <div className="p-4 space-y-5">
      {/* Back button header */}
      <button
        onClick={onBack}
        className="text-xs font-semibold text-[#0066FF] hover:underline flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to track search
      </button>

      {/* Parcel Header Info */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Parcel Code
            </span>
            <h1 className="font-mono text-2xl font-extrabold text-[#0066FF]">
              {parcel.code}
            </h1>
          </div>
          <StatusBadge status={parcel.status} size="md" />
        </div>

        {/* Route info */}
        <div className="bg-gray-50 rounded p-3 flex items-center justify-between text-sm">
          <div>
            <span className="text-xs text-gray-500 block">From</span>
            <span className="font-bold text-gray-900">{parcel.from}</span>
          </div>

          <ArrowRight className="w-4 h-4 text-gray-400" />

          <div className="text-right">
            <span className="text-xs text-gray-500 block">To</span>
            <span className="font-bold text-gray-900">{parcel.to}</span>
          </div>
        </div>

        {/* Bus & Schedule info */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="flex items-center gap-2 p-2 rounded bg-blue-50/50 border border-blue-100">
            <Bus className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
            <div>
              <span className="text-gray-500 block">Bus Operator</span>
              <span className="font-semibold text-gray-900">{parcel.busOperator}</span>
            </div>
          </div>

          <div className="p-2 rounded bg-gray-50 border border-gray-100">
            <span className="text-gray-500 block">Departure / Arrival</span>
            <span className="font-semibold text-gray-900">
              {parcel.departureTime} - {parcel.arrivalTime}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Tracking Status
        </h2>

        <TrackingTimeline items={parcel.timeline} />
      </div>

      {/* Sender & Receiver Info */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3 text-xs">
        <h3 className="font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
          Contact & Location Details
        </h3>

        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="text-gray-500 flex items-center gap-1 font-medium">
                <User className="w-3.5 h-3.5 text-gray-400" /> Receiver
              </span>
              <span className="font-bold text-gray-900 text-sm block">
                {parcel.receiverName}
              </span>
            </div>
            <a
              href={`tel:${parcel.receiverPhone}`}
              className="text-[#0066FF] font-mono font-semibold flex items-center gap-1 hover:underline bg-blue-50 px-2 py-1 rounded border border-blue-100"
            >
              <Phone className="w-3 h-3" />
              {parcel.receiverPhone}
            </a>
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-0.5">
            <span className="text-gray-500 flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-gray-400" /> Receiver Pick-up Location
            </span>
            <span className="font-medium text-gray-900 block">
              {parcel.receiverLocation} ({parcel.to})
            </span>
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-0.5">
            <span className="text-gray-500 block">Sender</span>
            <span className="font-medium text-gray-900 block">
              {parcel.senderName} ({parcel.senderPhone})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
