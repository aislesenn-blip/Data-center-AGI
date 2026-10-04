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
import Logo from '@/components/Logo';

type Step = 'location' | 'details' | 'options' | 'payment' | 'tracking';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('location');

  return (
    <main className="relative min-h-screen w-full bg-bluepost-bg font-sans overflow-hidden">

      {/* LAYER 1: Background Spatial Map Layer */}
      <MapLayer />

      {/* LAYER 2 & 3: Floating UI Content & Controls */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] p-4 pb-28 pt-8 w-full max-w-lg mx-auto">

        {/* Simple Brand Header */}
        <div className="absolute top-6 left-6 z-20">
          <Logo />
        </div>

        {/* Progressive Floating Container */}
        <div className="w-full mt-16 flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 'location' && (
              <LocationStep
                key="location"
                onNext={() => setCurrentStep('details')}
              />
            )}

            {currentStep === 'details' && (
              <DetailsStep
                key="details"
                onNext={() => setCurrentStep('options')}
                onBack={() => setCurrentStep('location')}
              />
            )}

            {currentStep === 'options' && (
              <OptionsStep
                key="options"
                onNext={() => setCurrentStep('payment')}
                onBack={() => setCurrentStep('details')}
              />
            )}

            {currentStep === 'payment' && (
              <PaymentStep
                key="payment"
                onNext={() => setCurrentStep('tracking')}
                onBack={() => setCurrentStep('options')}
              />
            )}

            {currentStep === 'tracking' && (
              <TrackingStep
                key="tracking"
                onReset={() => setCurrentStep('location')}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* LAYER 4: Floating Bottom Navigation */}
      {/* Hide navigation on payment/tracking to focus the user, show on earlier steps */}
      <AnimatePresence>
        {['location', 'details', 'options'].includes(currentStep) && (
          <FloatingNav />
        )}
      </AnimatePresence>

    </main>
  );
}
