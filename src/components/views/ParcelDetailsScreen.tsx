"use client";

import React, { useState } from "react";
import { ParcelType } from "@/lib/types";
import { Button } from "../Button";
import { Package, User, Phone, MapPin, Scale } from "lucide-react";

interface ParcelDetailsScreenProps {
  onSubmitDetails: (details: {
    parcelType: ParcelType;
    weight: string;
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    receiverLocation: string;
  }) => void;
  initialData?: {
    parcelType?: ParcelType;
    weight?: string;
    senderName?: string;
    senderPhone?: string;
    receiverName?: string;
    receiverPhone?: string;
    receiverLocation?: string;
  };
}

export const ParcelDetailsScreen: React.FC<ParcelDetailsScreenProps> = ({
  onSubmitDetails,
  initialData,
}) => {
  const [parcelType, setParcelType] = useState<ParcelType>(
    initialData?.parcelType || "Medium package"
  );
  const [weight, setWeight] = useState(initialData?.weight || "2 kg");
  const [senderName, setSenderName] = useState(
    initialData?.senderName || "Juma Hassan"
  );
  const [senderPhone, setSenderPhone] = useState(
    initialData?.senderPhone || "+255 712 345 678"
  );
  const [receiverName, setReceiverName] = useState(
    initialData?.receiverName || "Amina Rashid"
  );
  const [receiverPhone, setReceiverPhone] = useState(
    initialData?.receiverPhone || "+255 754 987 654"
  );
  const [receiverLocation, setReceiverLocation] = useState(
    initialData?.receiverLocation || "Central Bus Terminal"
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const parcelTypes: ParcelType[] = [
    "Document",
    "Small package",
    "Medium package",
    "Large package",
    "Other",
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!senderName.trim()) errs.senderName = "Sender name is required";
    if (!senderPhone.trim()) errs.senderPhone = "Sender phone is required";
    if (!receiverName.trim()) errs.receiverName = "Receiver name is required";
    if (!receiverPhone.trim()) errs.receiverPhone = "Receiver phone is required";
    if (!receiverLocation.trim()) errs.receiverLocation = "Pick-up point is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitDetails({
      parcelType,
      weight,
      senderName,
      senderPhone,
      receiverName,
      receiverPhone,
      receiverLocation,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900">
          Tell us about your parcel
        </h1>
        <p className="text-xs text-gray-500">
          Enter contents, approximate weight, sender and receiver details.
        </p>
      </div>

      {/* Parcel Type Selection */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <Package className="w-4 h-4 text-[#0066FF]" />
          Parcel type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {parcelTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setParcelType(type)}
              className={`p-3 text-left border rounded-md text-xs font-semibold transition-all ${
                parcelType === type
                  ? "border-[#0066FF] bg-blue-50 text-[#0066FF] ring-1 ring-[#0066FF]"
                  : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="pt-2">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
            <Scale className="w-3.5 h-3.5 text-gray-500" />
            Approximate weight
          </label>
          <input
            type="text"
            placeholder="e.g. 2 kg or Under 1 kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-900 focus:border-[#0066FF] outline-none"
          />
        </div>
      </div>

      {/* Sender Details */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-4 h-4 text-[#0066FF]" />
          Sender information
        </h3>

        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-600 font-medium">Sender name</label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Juma Hassan"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-900 focus:border-[#0066FF] outline-none mt-1"
            />
            {errors.senderName && (
              <p className="text-xs text-red-600 mt-1">{errors.senderName}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-600 font-medium">
              Sender phone number
            </label>
            <div className="relative mt-1">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="tel"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="+255 712 345 678"
                className="w-full pl-9 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-900 focus:border-[#0066FF] outline-none font-mono"
              />
            </div>
            {errors.senderPhone && (
              <p className="text-xs text-red-600 mt-1">{errors.senderPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Receiver Details */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-4 h-4 text-green-600" />
          Receiver information
        </h3>

        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-600 font-medium">Receiver name</label>
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="e.g. Amina Rashid"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-900 focus:border-[#0066FF] outline-none mt-1"
            />
            {errors.receiverName && (
              <p className="text-xs text-red-600 mt-1">{errors.receiverName}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-600 font-medium">
              Receiver phone number
            </label>
            <div className="relative mt-1">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="tel"
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                placeholder="+255 754 987 654"
                className="w-full pl-9 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-900 focus:border-[#0066FF] outline-none font-mono"
              />
            </div>
            {errors.receiverPhone && (
              <p className="text-xs text-red-600 mt-1">{errors.receiverPhone}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-600 font-medium">
              Receiver pick-up station/location
            </label>
            <div className="relative mt-1">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={receiverLocation}
                onChange={(e) => setReceiverLocation(e.target.value)}
                placeholder="e.g. Arusha Bus Terminal"
                className="w-full pl-9 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-900 focus:border-[#0066FF] outline-none"
              />
            </div>
            {errors.receiverLocation && (
              <p className="text-xs text-red-600 mt-1">{errors.receiverLocation}</p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg">
        Continue to Payment
      </Button>
    </form>
  );
};
