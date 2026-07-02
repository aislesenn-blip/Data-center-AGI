# Rikpedia: AI Agent Implementation Prompts

**To all incoming AI Agents:** You are contributing to **Rikpedia**, a world-class, enterprise-grade Digital Out-Of-Home (DOOH) technology infrastructure company. We are turning local transit (auto-rickshaws) into a globally competitive, dynamic, geofenced moving billboard network.

**The Master Architecture Rule:** We operate on a **Unified Centralized Architecture with Edge Distribution**. There is one Central Brain (Database/API) and many isolated edge applications.

**Current Phase Objective:** FRONTEND FIRST. You are to build the complete, production-ready frontend UI for your assigned application using **Mock Data**. Do not attempt to build the central backend, database, or API yet. Build perfect UI shells, state management, and interaction flows that are ready to be wired up to the Central API in Phase B.

---

## Agent 1: The Public Face (Corporate Website)

**Your Mission:** Build the public-facing corporate website for Rikpedia.
**Target Audience:** Enterprise investors, global brands (e.g., Coca-Cola, Samsung), and large ad agencies.
**Tone:** Authoritative, globally competitive, elegant, and deeply technical. We are an infrastructure company, not just an ad startup.

**Directives:**
1.  **Tech Stack:** Next.js (App Router), Tailwind CSS v4, Framer Motion, Lucide React icons.
2.  **Required Pages:**
    *   `/` (Home): High-impact hero, social proof, dynamic 3D or high-quality imagery of tablets in rickshaws, and enterprise value propositions.
    *   `/advertisers`: Deep dive into how brands can reach audiences via our network.
    *   `/fleet`: Information for rickshaw fleet owners on how to partner with Rikpedia.
    *   `/technology`: Technical explanation of our Edge Node caching and geofencing capabilities.
    *   `/contact`: Distinct fields for "Enterprise Partnerships" and "Media Buying".
3.  **Constraints:** Do NOT build the advertiser login portal. Link the "Login" button to `/dashboard` (which the Main Agent is building). Ensure mobile responsiveness is world-class. Use spring-physics for all transitions.

---

## Agent 2: The Edge Operations (Android Tablet App)

**Your Mission:** Build the Android Player Application (Layer 3 of the Tri-Layer Edge Node architecture).
**Target Audience:** Passengers (viewers) and the local device system.
**Tone:** Silent, resilient, unbreakable.

**Directives:**
1.  **Tech Stack:** Kotlin/Jetpack Compose (or React Native if strictly authorized, but native is preferred for kiosk resilience).
2.  **Core UI Requirements:**
    *   **The Main Loop:** A resilient video player component that loops MP4s from local storage flawlessly without memory leaks.
    *   **Passenger Interaction:** If authorized by the current campaign, display interactive overlays (e.g., QR codes that scale up on tap).
    *   **Offline State Handling:** If the local playlist is empty, display a highly polished, branded "Rikpedia Default" screen, not a generic error.
    *   **Hidden Diagnostics Menu:** A screen accessible only via a specific tap pattern to show device health, sync status, and local logs.
3.  **Constraints:** FRONTEND FIRST. You will mock the `SyncEngine` and `GeofenceEngine`. Create interfaces that return fake local JSON playlists and fake GPS trigger events so you can build the UI reactions. Do NOT attempt to build the MDM/Kiosk launcher (Layer 1) yet.

---

## Agent 3: The Fleet & Driver Operations (Driver App)

**Your Mission:** Build the mobile application for Auto-Rickshaw Drivers.
**Target Audience:** Drivers operating vehicles with Rikpedia tablets installed.
**Tone:** Encouraging, clear, financially transparent, and extremely easy to use in bright sunlight.

**Directives:**
1.  **Tech Stack:** React Native (Expo) or Flutter for cross-platform mobile, or a highly optimized Next.js PWA.
2.  **Core UI Requirements:**
    *   **Dashboard:** Show daily earnings, current tablet status ("Online/Playing" or "Offline/Check Power").
    *   **Wallet:** UI for seeing payout history and requesting withdrawals.
    *   **Notifications:** Alerts for "Tablet went offline in your vehicle."
    *   **Support/Maintenance:** A one-tap flow to report a broken screen or request a technician.
3.  **Constraints:** Use mock data for earnings and tablet status. Design with large touch targets (minimum 48px) and high contrast.

---

## Note on "The Main One" (Advertiser & Admin Platform)
The Chief Systems Architect (myself) is currently initializing and building the Core Advertiser Dashboard & Master Control Console. All other agents must focus strictly on their domains outlined above.
