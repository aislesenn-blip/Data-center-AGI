"use client";

import React, { useState } from "react";
import { PAYMENT_METHODS } from "@/lib/data";
import { BusRouteOption, ParcelType, PaymentMethodOption } from "@/lib/types";
import { Button } from "../Button";
import { CheckCircle2, Loader2, ShieldCheck, Phone } from "lucide-react";

interface PaymentScreenProps {
  summary: {
    from: string;
    to: string;
    bus: BusRouteOption;
    parcelType: ParcelType;
    weight: string;
    price: number;
    senderPhone: string;
  };
  onPaymentComplete: (paymentMethod: PaymentMethodOption) => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  summary,
  onPaymentComplete,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodOption>(
    PAYMENT_METHODS[0]
  );
  const [mobileNumber, setMobileNumber] = useState(summary.senderPhone);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete(selectedMethod);
    }, 1500);
  };

  return (
    <div className="p-4 space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900">Payment</h1>
        <p className="text-xs text-gray-500">
          Review your summary and select Tanzanian Mobile Money payment.
        </p>
      </div>

      {/* Clear Summary Box */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Summary
        </h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between pb-1.5 border-b border-gray-100">
            <span className="text-gray-500">From</span>
            <span className="font-semibold text-gray-900">{summary.from}</span>
          </div>

          <div className="flex justify-between pb-1.5 border-b border-gray-100">
            <span className="text-gray-500">To</span>
            <span className="font-semibold text-gray-900">{summary.to}</span>
          </div>

          <div className="flex justify-between pb-1.5 border-b border-gray-100">
            <span className="text-gray-500">Bus</span>
            <span className="font-semibold text-gray-900">
              {summary.bus.operator}
            </span>
          </div>

          <div className="flex justify-between pb-1.5 border-b border-gray-100">
            <span className="text-gray-500">Parcel</span>
            <span className="font-semibold text-gray-900">
              {summary.parcelType} ({summary.weight})
            </span>
          </div>

          <div className="flex justify-between pt-1">
            <span className="font-bold text-gray-900 text-base">Total</span>
            <span className="font-bold text-[#0066FF] text-xl">
              TZS {summary.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Payment method
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedMethod.id === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method)}
                className={`p-3 border rounded-md text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? "border-[#0066FF] bg-blue-50 ring-1 ring-[#0066FF]"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded text-white font-bold text-xs flex items-center justify-center ${method.color}`}
                  >
                    {method.logoText}
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-gray-900 block">
                      {method.name}
                    </span>
                    <span className="text-[11px] text-gray-500 block">
                      Mobile Money
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Number for payment prompt */}
        <div className="pt-2">
          <label className="text-xs text-gray-600 font-medium block mb-1">
            {selectedMethod.name} Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="+255 7XX XXX XXX"
              className="w-full pl-9 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono text-gray-900 outline-none focus:border-[#0066FF]"
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            You will receive a USSD prompt on your phone to authorize payment.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        <span>Secure Tanzanian Mobile Payment</span>
      </div>

      <form onSubmit={handlePay}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing payment...
            </>
          ) : (
            `Pay TZS ${summary.price.toLocaleString()}`
          )}
        </Button>
      </form>
    </div>
  );
};
