"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav, TabType } from "@/components/BottomNav";
import { INITIAL_PARCELS, BUS_OPERATORS } from "@/lib/data";
import {
  BusRouteOption,
  ParcelRecord,
  ParcelType,
  PaymentMethodOption,
} from "@/lib/types";

// Views
import { HomeScreen } from "@/components/views/HomeScreen";
import { RouteScreen } from "@/components/views/RouteScreen";
import { ParcelDetailsScreen } from "@/components/views/ParcelDetailsScreen";
import { PaymentScreen } from "@/components/views/PaymentScreen";
import { SuccessScreen } from "@/components/views/SuccessScreen";
import { TrackParcelScreen } from "@/components/views/TrackParcelScreen";
import { ParcelTrackingDetails } from "@/components/views/ParcelTrackingDetails";
import { MyParcelsScreen } from "@/components/views/MyParcelsScreen";
import { ProfileScreen } from "@/components/views/ProfileScreen";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [activeView, setActiveView] = useState<
    | "home"
    | "route"
    | "details"
    | "payment"
    | "success"
    | "track-search"
    | "track-details"
    | "my-parcels"
    | "profile"
  >("home");

  // Parcels State
  const [parcels, setParcels] = useState<ParcelRecord[]>(INITIAL_PARCELS);
  const [selectedParcel, setSelectedParcel] = useState<ParcelRecord | null>(
    null
  );
  const [notFoundSearchCode, setNotFoundSearchCode] = useState<string | null>(
    null
  );

  // Send Flow Draft State
  const [sendDraft, setSendDraft] = useState<{
    from: string;
    to: string;
    date: string;
    bus: BusRouteOption;
    parcelType?: ParcelType;
    weight?: string;
    senderName?: string;
    senderPhone?: string;
    receiverName?: string;
    receiverPhone?: string;
    receiverLocation?: string;
  }>({
    from: "Dar es Salaam",
    to: "Arusha",
    date: "Today",
    bus: BUS_OPERATORS[0],
  });

  const [recentlyCreatedParcel, setRecentlyCreatedParcel] =
    useState<ParcelRecord | null>(null);

  // Navigation handlers
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setNotFoundSearchCode(null);
    if (tab === "home") setActiveView("home");
    else if (tab === "send") setActiveView("route");
    else if (tab === "track") setActiveView("track-search");
    else if (tab === "profile") setActiveView("profile");
    else if (tab === "my-parcels") setActiveView("my-parcels");
  };

  // Flow Step 1: Route selected -> Move to Parcel Details
  const handleSelectBusRoute = (
    from: string,
    to: string,
    date: string,
    bus: BusRouteOption
  ) => {
    setSendDraft((prev) => ({ ...prev, from, to, date, bus }));
    setActiveView("details");
  };

  // Flow Step 2: Parcel details filled -> Move to Payment
  const handleSubmitParcelDetails = (details: {
    parcelType: ParcelType;
    weight: string;
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    receiverLocation: string;
  }) => {
    setSendDraft((prev) => ({ ...prev, ...details }));
    setActiveView("payment");
  };

  // Flow Step 3: Payment finished -> Generate code & Move to Success Screen
  const handlePaymentComplete = (paymentMethod: PaymentMethodOption) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newCode = `BP-${randomNum}`;

    const newParcel: ParcelRecord = {
      id: `p-${Date.now()}`,
      code: newCode,
      from: sendDraft.from,
      to: sendDraft.to,
      busOperator: sendDraft.bus.operator,
      departureTime: sendDraft.bus.departureTime,
      arrivalTime: sendDraft.bus.arrivalTime,
      price: sendDraft.bus.price,
      date: sendDraft.date,
      status: "Payment confirmed",
      parcelType: sendDraft.parcelType || "Medium package",
      weight: sendDraft.weight || "2 kg",
      senderName: sendDraft.senderName || "Juma Hassan",
      senderPhone: sendDraft.senderPhone || "+255 712 345 678",
      receiverName: sendDraft.receiverName || "Amina Rashid",
      receiverPhone: sendDraft.receiverPhone || "+255 754 987 654",
      receiverLocation: sendDraft.receiverLocation || "Central Station",
      paymentMethod: paymentMethod.name,
      createdAt: "Just now",
      timeline: [
        { title: "Payment confirmed", timestamp: "Just now", completed: true, current: true },
        { title: "Parcel received at station", completed: false, current: false },
        { title: "Bus departed", completed: false, current: false },
        { title: "On the way", completed: false, current: false },
        { title: "Arrived", completed: false, current: false },
        { title: "Collected by receiver", completed: false, current: false },
      ],
    };

    setParcels((prev) => [newParcel, ...prev]);
    setRecentlyCreatedParcel(newParcel);
    setActiveView("success");
  };

  // Direct Search Code
  const handleSearchCode = (code: string) => {
    const matched = parcels.find(
      (p) => p.code.toUpperCase() === code.toUpperCase()
    );
    if (matched) {
      setSelectedParcel(matched);
      setNotFoundSearchCode(null);
      setActiveView("track-details");
    } else {
      setNotFoundSearchCode(code);
      setActiveView("track-search");
    }
  };

  // Back Button Logic
  const getHeaderTitle = () => {
    if (activeView === "home") fontTitle: return "BluePost";
    if (activeView === "route") return "Select Route & Bus";
    if (activeView === "details") return "Parcel Details";
    if (activeView === "payment") return "Payment";
    if (activeView === "success") return "Order Confirmed";
    if (activeView === "track-search") return "Track Parcel";
    if (activeView === "track-details") return "Tracking Details";
    if (activeView === "my-parcels") return "My Parcels";
    if (activeView === "profile") return "Profile";
    return "BluePost";
  };

  const showBackButton = [
    "details",
    "payment",
    "track-details",
  ].includes(activeView);

  const handleHeaderBack = () => {
    if (activeView === "details") setActiveView("route");
    else if (activeView === "payment") setActiveView("details");
    else if (activeView === "track-details") setActiveView("track-search");
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* Persistent Header */}
      <Header
        title={getHeaderTitle()}
        showBack={showBackButton}
        onBack={handleHeaderBack}
        onProfileClick={() => {
          setActiveTab("profile");
          setActiveView("profile");
        }}
      />

      {/* Send Flow Step Progress Indicator */}
      {["route", "details", "payment"].includes(activeView) && (
        <div className="bg-white px-4 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs font-semibold text-gray-500">
          <div className={`flex items-center gap-1 ${activeView === "route" ? "text-[#0066FF]" : "text-gray-900"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${activeView === "route" ? "bg-[#0066FF] text-white" : "bg-gray-200 text-gray-700"}`}>1</span>
            Route
          </div>
          <div className="w-6 h-0.5 bg-gray-200" />
          <div className={`flex items-center gap-1 ${activeView === "details" ? "text-[#0066FF]" : activeView === "payment" ? "text-gray-900" : "text-gray-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${activeView === "details" ? "bg-[#0066FF] text-white" : activeView === "payment" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-500"}`}>2</span>
            Parcel
          </div>
          <div className="w-6 h-0.5 bg-gray-200" />
          <div className={`flex items-center gap-1 ${activeView === "payment" ? "text-[#0066FF]" : "text-gray-400"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${activeView === "payment" ? "bg-[#0066FF] text-white" : "bg-gray-200 text-gray-500"}`}>3</span>
            Payment
          </div>
        </div>
      )}

      {/* Main Scrollable View Area */}
      <main className="flex-1 overflow-y-auto">
        {activeView === "home" && (
          <HomeScreen
            onSendClick={() => {
              setActiveTab("send");
              setActiveView("route");
            }}
            onTrackClick={(code) => handleSearchCode(code)}
            onSelectParcel={(parcel) => {
              setSelectedParcel(parcel);
              setActiveTab("track");
              setActiveView("track-details");
            }}
            onViewAllParcels={() => {
              setActiveTab("profile");
              setActiveView("my-parcels");
            }}
            recentParcels={parcels}
          />
        )}

        {activeView === "route" && (
          <RouteScreen
            initialFrom={sendDraft.from}
            initialTo={sendDraft.to}
            onSelectBusRoute={handleSelectBusRoute}
          />
        )}

        {activeView === "details" && (
          <ParcelDetailsScreen
            initialData={sendDraft}
            onSubmitDetails={handleSubmitParcelDetails}
          />
        )}

        {activeView === "payment" && (
          <PaymentScreen
            summary={{
              from: sendDraft.from,
              to: sendDraft.to,
              bus: sendDraft.bus,
              parcelType: sendDraft.parcelType || "Medium package",
              weight: sendDraft.weight || "2 kg",
              price: sendDraft.bus.price,
              senderPhone: sendDraft.senderPhone || "+255 712 345 678",
            }}
            onPaymentComplete={handlePaymentComplete}
          />
        )}

        {activeView === "success" && recentlyCreatedParcel && (
          <SuccessScreen
            parcel={recentlyCreatedParcel}
            onTrackParcel={(code) => handleSearchCode(code)}
            onViewDetails={(parcel) => {
              setSelectedParcel(parcel);
              setActiveTab("track");
              setActiveView("track-details");
            }}
            onGoHome={() => {
              setActiveTab("home");
              setActiveView("home");
            }}
          />
        )}

        {activeView === "track-search" && (
          <TrackParcelScreen
            onSearch={handleSearchCode}
            recentParcels={parcels}
            onSelectParcel={(parcel) => {
              setSelectedParcel(parcel);
              setActiveView("track-details");
            }}
            notFoundCode={notFoundSearchCode}
          />
        )}

        {activeView === "track-details" && selectedParcel && (
          <ParcelTrackingDetails
            parcel={selectedParcel}
            onBack={() => setActiveView("track-search")}
          />
        )}

        {activeView === "my-parcels" && (
          <MyParcelsScreen
            parcels={parcels}
            onSelectParcel={(parcel) => {
              setSelectedParcel(parcel);
              setActiveTab("track");
              setActiveView("track-details");
            }}
            onSendClick={() => {
              setActiveTab("send");
              setActiveView("route");
            }}
          />
        )}

        {activeView === "profile" && (
          <ProfileScreen
            onViewMyParcels={() => setActiveView("my-parcels")}
            onSendParcel={() => {
              setActiveTab("send");
              setActiveView("route");
            }}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
