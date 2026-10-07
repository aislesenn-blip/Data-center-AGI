"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import MapLayer from '@/components/MapLayer';
import FloatingNav from '@/components/FloatingNav';
import LocationStep from '@/components/LocationStep';
import DetailsStep from '@/components/DetailsStep';
import OptionsStep from '@/components/OptionsStep';
import PaymentStep from '@/components/PaymentStep';
import TrackingStep from '@/components/TrackingStep';

type Step = 'location' | 'details' | 'options' | 'payment' | 'tracking';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('location');

  return (
    <main className="relative min-h-screen w-full bg-bluepost-bg font-sans overflow-hidden">

      {/* LAYER 1: Background Spatial Map Layer */}
      <MapLayer currentStep={currentStep} />

      {/* LAYER 2 & 3: Floating UI Content & Controls */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] p-4 pb-28 pt-8 w-full max-w-lg mx-auto">

        {/* Simple Brand Header */}
        <AnimatePresence>
          {currentStep === 'location' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-6 left-0 w-full flex justify-center z-20"
            >
              <div className="bg-white rounded-full px-4 py-2 shadow-sm flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-bluepost-primary text-white flex items-center justify-center font-bold text-sm leading-none">
                  B
                </div>
                <span className="font-bold text-sm text-bluepost-dark tracking-tight">BluePost</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progressive Floating Container */}
        <div className="w-full mt-12 flex-1 flex flex-col justify-center">
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
        {['location', 'details', 'options', 'tracking'].includes(currentStep) && (
          <FloatingNav />
        )}
      </AnimatePresence>

    </main>
  );
}
