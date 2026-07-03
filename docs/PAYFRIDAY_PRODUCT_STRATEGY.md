# PayFriday Product Strategy & Architecture Blueprint

*Prepared by: Chief Product Officer, PayFriday*

## 1. Executive Summary

PayFriday is a **Payment Acceptance Platform**, designed exclusively to enable customers to "Pay smarter. Save instantly." Our value proposition lies entirely in streamlining the transaction layer while automatically executing merchant-configured discounts.

This platform sits in a space adjacent to Stripe, Cash App, and Apple Pay—not merely processing a transaction, but acting as a trust layer between a merchant's offer and the customer's wallet. We are not an e-commerce platform or a discovery marketplace. Our primary currency is speed and trust.

## 2. Core Product Philosophy & Design Language

- **Timeless & Trust-First:** Visual design avoids trendy dark modes in favor of a highly legible, premium light interface. It must remain flawless in harsh daylight environments.
- **Mobile-First Exclusivity:** The entire interaction model assumes a smartphone viewport and one-handed usage.
- **Frictionless Simplicity:** The UI actively resists clutter. Rounded cards, large touch targets, premium typography, and elegant spacing dictate the layout.
- **World-Class Motion:** Micro-interactions and screen transitions rely on fluid spring-physics (e.g., Framer Motion), evoking the tactile satisfaction found in Apple Pay and Cash App.
- **No Map Building:** Merchant locations offload to Google Maps via deep links, preventing feature bloat and focusing our engineering on the payment core.

## 3. Information Architecture & Navigation

The primary app interface defaults to **Payment**.

### Primary Navigation Tabs
1. **Pay (Home/Default):** The immediate gateway to inputting a merchant code.
2. **Discover:** The secondary gateway to browse participating merchants by category.
3. **Activity/Receipts:** A historical ledger of transactions and savings.
4. **Profile/Settings:** User management and payment method configuration.

## 4. The Payment Journey (Primary Flow)

The absolute priority is the payment execution speed. The flow must be uninterrupted.

1. **Step 1: Initiation (Open App)**
   - The user opens PayFriday and is greeted *immediately* by a beautiful, tactile on-screen numeric keypad.
   - *UI:* No distracting banners. Just the keypad and a prompt: "Enter Merchant Code."
2. **Step 2: Identification**
   - The user inputs the 4-to-6 digit code. The system debounces and auto-resolves the merchant instantly.
   - *Motion:* The keypad smoothly slides down, revealing the Merchant Confirmation Card.
3. **Step 3: Confirmation & Offer**
   - *UI:* Displays the Merchant Logo, Name, and the **Applicable Discount** (e.g., "15% Off Total Bill").
   - The user enters the total bill amount. The system instantly calculates the discounted total to pay.
4. **Step 4: Payment Selection & Execution**
   - The user selects their preferred payment provider (M-Pesa, Airtel Money, Bank Account, etc.).
   - The app triggers the payment aggregator API (e.g., initiating an STK Push to the user's phone).
   - *UI:* A beautiful, reassuring loading state (pulsing logo or spinner) holding the layout in place.
5. **Step 5: Digital Receipt**
   - Upon success, the screen cross-fades to a crisp digital receipt.
   - *UI:* Highlights the amount paid, the *amount saved* (critical value reinforcement), and the merchant details.

## 5. The Discovery Journey (Secondary Flow)

Discovery exists to inform customers *where* they can save, but it does not process shopping carts.

1. **Category Selection:**
   - Premium, clean pills or a bento grid organizing merchants (Fuel, Restaurants, Coffee, Supermarkets).
2. **Merchant Feed:**
   - A vertical feed of rounded cards. Each card contains: Merchant Logo, Current Discount percentage, Category tag, Star Rating placeholder, Distance placeholder, and a single sentence description.
3. **Merchant Profile:**
   - A clean detail screen focusing on the brand, active discounts, business hours, and a clear "Open in Google Maps" CTA.

## 6. The Merchant Portal (Onboarding & Management)

A standalone web experience optimized for simplicity. Merchants are onboarded by the PayFriday team, then granted access to manage their presence.

- **Dashboard:** A unified view of transaction volume and discounts applied.
- **Offer Engine:** A simple rule engine to set discount percentages (e.g., "10% on Tuesdays", "5% everyday").
- **Profile Management:** Uploading logos, updating descriptions, setting Google Maps location pins, and modifying business hours.

## 7. Technical Prerequisites for Implementation

Before writing code for the new architecture, the engineering team must:
- Finalize the mock API contracts for the Payment Aggregator layer to ensure the unified UI can handle M-Pesa, Airtel Money, and bank transfers natively.
- Establish the Design System tokens (colors, typography scales, border-radii) matching the premium light-interface constraints.
- Build the `NumericKeypad` and `PaymentConfirmation` shell components as isolated, perfect interactions before connecting them to the larger app flow.

*End of Document. Awaiting authorization to begin technical implementation.*