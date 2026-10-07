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

import { BookingState } from '@/lib/types';

type Step = 'location' | 'details' | 'options' | 'payment' | 'tracking';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('location');

  // Global App State
  const [bookingState, setBookingState] = useState<BookingState>({
    from: null,
    to: null,
    date: new Date(),
    shipment: null,
    selectedTransport: null,
  });

  return (
    <main className="relative h-screen w-full bg-bluepost-bg font-sans overflow-y-auto">
      {/* LAYER 1: Background Spatial Map Layer */}
      <MapLayer />

      {/* Background split for Location step (Screen 1 equivalent) positioned above MapLayer but below UI */}
      <div className={`absolute top-0 left-0 w-full h-[45%] bg-[#0F172A] z-[5] transition-opacity duration-300 ${currentStep === 'location' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

      {/* LAYER 2 & 3: Floating UI Content & Controls */}
      <div className="relative z-10 flex flex-col items-center min-h-full pb-28 w-full max-w-lg mx-auto">

        {/* Progressive Floating Container */}
        <div className="w-full flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {currentStep === 'location' && (
              <LocationStep
                key="location"
                bookingState={bookingState}
                updateBookingState={(updates) => setBookingState(prev => ({ ...prev, ...updates }))}
                onNext={() => setCurrentStep('details')}
              />
            )}

            {currentStep === 'details' && (
              <DetailsStep
                key="details"
                bookingState={bookingState}
                updateBookingState={(updates) => setBookingState(prev => ({ ...prev, ...updates }))}
                onNext={() => setCurrentStep('options')}
                onBack={() => setCurrentStep('location')}
              />
            )}

            {currentStep === 'options' && (
              <OptionsStep
                key="options"
                bookingState={bookingState}
                updateBookingState={(updates) => setBookingState(prev => ({ ...prev, ...updates }))}
                onNext={() => setCurrentStep('payment')}
                onBack={() => setCurrentStep('details')}
              />
            )}

            {currentStep === 'payment' && (
              <PaymentStep
                key="payment"
                bookingState={bookingState}
                onNext={() => setCurrentStep('tracking')}
                onBack={() => setCurrentStep('options')}
              />
            )}

            {currentStep === 'tracking' && (
              <TrackingStep
                key="tracking"
                bookingState={bookingState}
                onReset={() => {
                  setBookingState({
                    from: null,
                    to: null,
                    date: new Date(),
                    shipment: null,
                    selectedTransport: null,
                  });
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
        {['location', 'details', 'options', 'tracking'].includes(currentStep) && (
          <FloatingNav />
        )}
      </AnimatePresence>

    </main>
  );
}
