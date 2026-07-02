# Rickpedia: Passenger UX Strategy & Interaction Blueprint

## 1. Passenger Behavior & Environmental Analysis
To build a world-class Transit Commerce Discovery Platform, we must design strictly for the reality of riding in a Bajaj (auto-rickshaw).

### The Environment
*   **Ride Duration:** A typical Bajaj ride lasts 10 to 25 minutes. This is a short window; interactions must be instant.
*   **Physical Reality:** The ride is bumpy, noisy, and exposed to bright sunlight. Precision tapping is difficult.
*   **Social Context:** Passengers may be alone, with friends, or carrying bags. They may have one free hand, or none.
*   **Mental State:** The passenger is in transit. They have a destination in mind. They are a captive audience but have zero tolerance for frustration.
*   **The "Habit" Catalyst:** To build the habit ("Let me check Rickpedia"), the platform must provide immediate, high-value utility with zero friction (no mandatory logins, no long typing).

### The Interaction Constraints
*   **Typography & Contrast:** High contrast (dark mode or stark light mode) with massive, highly legible sans-serif fonts (e.g., Inter/SF Pro). Minimum body text size: 18pt.
*   **Touch Targets:** Minimum 64px for buttons. If the ride is bumpy, a 48px button is too small to hit reliably.
*   **Minimal Typing:** Typing on a tablet in a moving Bajaj is a terrible experience. We must rely heavily on contextual recommendations, large category tiles (Bento Grids), and voice/predictive search over manual typing.

---

## 2. Shared Device Session Behavior (The State Machine)

A shared public tablet must be treated like an ATM, not a personal iPad. Privacy and state management are paramount.

### The 4-State Cycle:
1.  **Attract State (Idle):**
    *   *Trigger:* No touch for 60 seconds.
    *   *Behavior:* The screen gently rotates through high-end "Discovery Cards" (e.g., "50% off Sneakers in Kariakoo today", "Craving Pizza?"). This acts as a screensaver that pulls the user in.
2.  **Active Session State:**
    *   *Trigger:* The user taps the screen.
    *   *Behavior:* Immediately drops into the Discovery Interface. A session timer begins tracking inactivity.
3.  **Warning State:**
    *   *Trigger:* 45 seconds of inactivity during a session.
    *   *Behavior:* A polite modal appears: "Are you still looking? (Yes / Reset)". A progress ring counts down for 15 seconds.
4.  **Reset State (Hard Flush):**
    *   *Trigger:* 60 seconds of total inactivity OR the user taps "End Session".
    *   *Behavior:* The system *hard deletes* the destination, search history, and any scanned QR states from local memory. It animates back to the Attract State. Privacy is guaranteed.

---

## 3. The Complete User Journey (Mapping the Flow)

The flow is designed to feel like a high-end concierge, not a billboard.

**Step 1: The Hook (Attract Mode to Active Mode)**
*   User enters Bajaj. Tablet is silently looping beautiful product imagery.
*   User taps anywhere.
*   *Smooth spring animation* reveals the Home Screen.

**Step 2: Contextualization (Where to?)**
*   **UI:** A massive, inviting prompt: *"Where are you heading today?"*
*   Instead of forcing a keyboard, we display massive, tappable pills of the most popular Bajaj destinations (e.g., *Kariakoo, Masaki, Posta, Mlimani City*).
*   *Interaction:* User taps "Kariakoo". (They can also type if they want).

**Step 3: Intent Gathering (What are you looking for?)**
*   **UI:** The screen cross-fades. *"What are you looking for in Kariakoo?"*
*   We present a beautiful Bento Grid of categories with high-end photography: *Electronics, Fashion, Food, Pharmacies, Services.*
*   *Interaction:* User taps "Fashion".

**Step 4: Discovery (The Reveal)**
*   **UI:** A horizontal, infinitely scrolling carousel of "Store Cards".
*   Each card is visually striking and answers: *What is it? How much? How far?*
*   *Data displayed:* "Sneaker Headz", Product Image (Nike Air), "Tsh 45,000", "5 mins away in Kariakoo", "🔥 20% off today".

**Step 5: Action (The Handoff)**
*   *Interaction:* User taps a specific store card to expand it.
*   **UI:** A clean details page. It doesn't try to process the payment on the tablet. It presents a massive QR Code.
*   *Call to Action:* *"Scan to save route and 20% discount to your phone."*
*   *Result:* The user scans it with their phone. The merchant gets a lead, the user gets a deal, and Rickpedia proves its value.

**Step 6: Completion**
*   User taps "Done" or simply leaves the Bajaj.
*   Tablet hits the 60-second timeout, flushes the Kariakoo search, and returns to Attract Mode.

---

## 4. Required Screens Blueprint

To build this frontend, we need the following UI architecture:

1.  **`Screen_AttractLoop`**: The silent, beautiful screensaver mode showcasing premium products.
2.  **`Screen_DestinationSelect`**: The entry point. Massive destination pills and a "Skip to Search" option.
3.  **`Screen_CategoryGrid`**: The Bento Grid of discovery intent (Food, Tech, Fashion).
4.  **`Screen_SearchResults`**: The horizontal carousel of premium merchant cards filtered by the selected destination and category.
5.  **`Screen_MerchantDetail`**: The expanded view of a specific deal, featuring large imagery, pricing, and the QR Code handoff.
6.  **`Modal_InactivityWarning`**: The privacy-protecting timeout prompt.

---

## 5. Engineering the Interaction Quality

If this is to rival Uber or Apple in feel, we must enforce these frontend engineering rules:
*   **No spinners if possible:** We must use Skeleton loaders to hold spatial layouts so the UI never jumps when merchant data loads.
*   **Spring Physics:** Every tap, swipe, and screen transition must use Framer Motion springs (e.g., `stiffness: 300, damping: 30`). No linear fades. Things should feel tactile and physical.
*   **Overscroll Bouncing:** Lists should have iOS-like rubber-band scrolling so the interface feels alive, even on a cheap Android tablet.
*   **Debounced Touches:** In a bumpy Bajaj, a user might accidentally double-tap a button. All buttons must have an immediate visual feedback state (scaling down by 5%) and ignore subsequent taps for 300ms to prevent erratic navigation.
