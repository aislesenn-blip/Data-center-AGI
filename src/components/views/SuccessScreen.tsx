"use client";

import React, { useState } from "react";
import { ParcelRecord } from "@/lib/types";
import { Button } from "../Button";
import { Check, Copy, Share2, MessageSquare, ArrowRight } from "lucide-react";

interface SuccessScreenProps {
  parcel: ParcelRecord;
  onTrackParcel: (code: string) => void;
  onViewDetails: (parcel: ParcelRecord) => void;
  onGoHome: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  parcel,
  onTrackParcel,
  onViewDetails,
  onGoHome,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(parcel.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareToReceiver = () => {
    const text = `Habari ${parcel.receiverName}, I have sent your parcel via BluePost (${parcel.busOperator}). Tracking Code: ${parcel.code}. Route: ${parcel.from} to ${parcel.to}.`;
    if (navigator.share) {
      navigator.share({ title: "BluePost Parcel Code", text });
    } else {
      navigator.clipboard?.writeText(text);
      setShareMsg("Tracking message copied to clipboard!");
      setTimeout(() => setShareMsg(""), 3000);
    }
  };

  return (
    <div className="p-4 space-y-6 text-center">
      {/* Big Success Indicator */}
      <div className="pt-2 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Your parcel is ready</h1>
        <p className="text-xs text-gray-500 mt-1">
          Payment successful • {parcel.busOperator}
        </p>
      </div>

      {/* Prominent Tracking Code Box */}
      <div className="bg-white border-2 border-[#0066FF] rounded-md p-5 space-y-3 shadow-sm">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Write this code on your parcel:
        </p>

        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-3xl font-extrabold text-[#0066FF] tracking-wider">
            {parcel.code}
          </span>
          <button
            onClick={handleCopyCode}
            className="p-2 text-gray-500 hover:text-[#0066FF] active:scale-95 transition-all bg-gray-50 rounded border border-gray-200"
            title="Copy tracking code"
          >
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        {copied && (
          <p className="text-xs text-green-600 font-medium">Copied to clipboard!</p>
        )}
      </div>

      {/* Simple Clear Dropoff Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-left space-y-2">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
            1
          </div>
          <p className="text-xs text-gray-800 font-medium">
            Write <strong>{parcel.code}</strong> clearly on top of your package using a marker.
          </p>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
            2
          </div>
          <p className="text-xs text-gray-800 font-medium">
            Give the parcel to the <strong>{parcel.busOperator}</strong> luggage counter at the bus station.
          </p>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
            3
          </div>
          <p className="text-xs text-gray-800 font-medium">
            Your parcel will be tracked live using this code.
          </p>
        </div>
      </div>

      {/* Share action button */}
      <div className="space-y-2">
        <button
          onClick={handleShareToReceiver}
          className="w-full py-3 px-4 border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-emerald-700" />
          Send tracking code to receiver ({parcel.receiverName})
        </button>
        {shareMsg && (
          <p className="text-xs text-emerald-700 font-medium">{shareMsg}</p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-2">
        <Button variant="primary" size="md" onClick={() => onTrackParcel(parcel.code)}>
          Track parcel
        </Button>

        <Button variant="outline" size="md" onClick={() => onViewDetails(parcel)}>
          View parcel details
        </Button>

        <Button variant="secondary" size="sm" onClick={onGoHome}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};
