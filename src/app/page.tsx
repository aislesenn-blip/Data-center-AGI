"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import MapLayer from '@/components/MapLayer';
import FloatingNav from '@/components/FloatingNav';
import LocationStep from '@/components/LocationStep';
import DetailsStep from '@/components/DetailsStep';
import OptionsStep from '@/components/OptionsStep';
import PaymentStep from '@/components/PaymentStep';
import TrackingStep from '@/components/TrackingStep';
import HomeTab from '@/components/HomeTab';
import HistoryTab from '@/components/HistoryTab';
import ProfileTab from '@/components/ProfileTab';

import { BookingState, HistoryItem } from '@/lib/types';

type Step = 'location' | 'details' | 'options' | 'payment' | 'tracking';
type Tab = 'home' | 'find' | 'history' | 'profile';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [currentStep, setCurrentStep] = useState<Step>('location');

  // Global App State
  const [bookingState, setBookingState] = useState<BookingState>({
    from: null,
    to: null,
    date: new Date(),
    shipment: null,
    selectedTransport: null,
  });

  const [shipmentHistory, setShipmentHistory] = useState<HistoryItem[]>([]);

  // Function to save booking state to history and move to tracking
  const handlePaymentComplete = () => {
    const trackingId = `BP-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalBookingState = { ...bookingState, id: trackingId };
    const historyItem: HistoryItem = {
      id: trackingId,
      status: 'READY TO SHIP',
      bookingState: finalBookingState,
      createdAt: new Date(),
    };

    setBookingState(finalBookingState);
    setShipmentHistory(prev => [historyItem, ...prev]);
    setCurrentStep('tracking');
  };

  const handleStartShipment = () => {
    setBookingState({
      from: null,
      to: null,
      date: new Date(),
      shipment: null,
      selectedTransport: null,
    });
    setCurrentStep('location');
    setCurrentTab('find');
  };

  const handleOpenShipment = (item: HistoryItem) => {
    setBookingState(item.bookingState);
    setCurrentStep('tracking');
    setCurrentTab('find'); // Keep find active for tracking view
  };

  return (
    <main className="relative h-screen w-full bg-bluepost-bg font-sans overflow-y-auto">
      {/* LAYER 1: Background Spatial Map Layer */}
      <MapLayer />

      {/* Background split for Location step (Screen 1 equivalent) positioned above MapLayer but below UI */}
      <div className={`absolute top-0 left-0 w-full h-[45%] bg-[#0F172A] z-[5] transition-opacity duration-300 ${currentTab === 'find' && currentStep === 'location' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

      {/* LAYER 2 & 3: Floating UI Content & Controls */}
      <div className="relative z-10 flex flex-col items-center min-h-full pb-28 w-full max-w-lg mx-auto">

        {/* Progressive Floating Container */}
        <div className="w-full flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {currentTab === 'home' && (
              <HomeTab
                key="home"
                onStartShipment={handleStartShipment}
                recentShipments={shipmentHistory}
                onOpenShipment={handleOpenShipment}
              />
            )}

            {currentTab === 'history' && (
              <HistoryTab
                key="history"
                shipments={shipmentHistory}
                onOpenShipment={handleOpenShipment}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileTab key="profile" />
            )}

            {currentTab === 'find' && currentStep === 'location' && (
              <LocationStep
                key="location"
                bookingState={bookingState}
                updateBookingState={(updates) => setBookingState(prev => ({ ...prev, ...updates }))}
                onNext={() => setCurrentStep('details')}
              />
            )}

            {currentTab === 'find' && currentStep === 'details' && (
              <DetailsStep
                key="details"
                bookingState={bookingState}
                updateBookingState={(updates) => setBookingState(prev => ({ ...prev, ...updates }))}
                onNext={() => setCurrentStep('options')}
                onBack={() => setCurrentStep('location')}
              />
            )}

            {currentTab === 'find' && currentStep === 'options' && (
              <OptionsStep
                key="options"
                bookingState={bookingState}
                updateBookingState={(updates) => setBookingState(prev => ({ ...prev, ...updates }))}
                onNext={() => setCurrentStep('payment')}
                onBack={() => setCurrentStep('details')}
              />
            )}

            {currentTab === 'find' && currentStep === 'payment' && (
              <PaymentStep
                key="payment"
                bookingState={bookingState}
                onNext={handlePaymentComplete}
                onBack={() => setCurrentStep('options')}
              />
            )}

            {currentTab === 'find' && currentStep === 'tracking' && (
              <TrackingStep
                key="tracking"
                bookingState={bookingState}
                onReset={() => {
                  setCurrentTab('home');
                  setCurrentStep('location');
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* LAYER 4: Floating Bottom Navigation */}
      {/* Hide navigation on payment/tracking to focus the user, show on earlier steps */}
      <AnimatePresence>
        {!(currentTab === 'find' && (currentStep === 'payment' || currentStep === 'tracking')) && (
          <FloatingNav currentTab={currentTab} onTabChange={(tab) => setCurrentTab(tab as Tab)} />
        )}
      </AnimatePresence>

    </main>
  );
}
