# UI / PRODUCT CLARITY AUDIT — ALIGN INTERFACE WITH CORE VISION

## EXECUTIVE SUMMARY
The current UI successfully implements the *terminology* and *aesthetic* of the "Card-First" digital service system. The Home Screen now feels like a pre-funded card displaying remaining services (e.g., "18 Breakfast").

**However, the core functional flows for Merchant Catalogue Management and Customer Browsing are currently missing from the implementation.** The UI currently mocks the *outcome* of these flows but does not actually provide the screens required to execute them.

This audit breaks down exactly where the gaps are and how the UI must evolve to fulfill the end-to-end vision.

---

## 1. MERCHANT SIDE (Current State vs. Vision)

### Where does a merchant create their profile, add services, and set pricing?
**Current Implementation (Missing):**
Currently, there is no distinct "Merchant Onboarding" flow. The onboarding flow creates a standard user `Card ID`. There is a settings menu (`Catalogue Management`) that currently only navigates to a mocked "Business Type" selection (e.g., Cafe, Retail).
There are **zero screens** for a merchant to input items, define a catalog (e.g., "Breakfast - $5"), or set pricing.

**Required UI to Fulfill Vision:**
*   **Merchant Onboarding Toggle:** During signup, a user must be able to select "I am a Merchant". This generates a `@MerchantUsername` instead of a standard Card ID.
*   **Catalogue Studio (The "Accept Card" Hub):** Inside their account, merchants need a dedicated `Catalogue Studio` UI.
    *   This UI should be ultra-simple: A list of current services, and an "Add Service" button.
    *   **Add Service Modal:** Inputs for `Service Name` (e.g., Breakfast), `Icon`, and `Price`.
    *   *Crucially, the platform distributes funds automatically based on this pricing when users "Add to Card".*

---

## 2. CUSTOMER SIDE (Current State vs. Vision)

### Where does a user view a merchant's services, select items, and understand pricing?
**Current Implementation (Missing):**
Currently, when a user clicks "Add to Card" (Explore), they search for a merchant (e.g., `@MamaRose`). However, upon clicking the merchant, they are taken directly to a **Numeric Keypad** to enter a raw "Quantity".
*There is no catalogue browsing.* The system implicitly assumes the user is just adding a generic "Quantity" of a single mocked service.

**Required UI to Fulfill Vision:**
*   **Merchant Storefront View:** When a user searches for `@MamaRose` and clicks the result, they should NOT see a keypad immediately.
*   They should see a clean, bento-style list of Mama Rose's published services (e.g., Breakfast, Lunch).
*   **Selection & Checkout:** The user taps "Breakfast". *Then* a bottom sheet or keypad appears to ask: "How many Breakfasts to add to Card?"
*   **Pricing Clarity:** The UI must display the total upfront cost before the user confirms the addition (e.g., "Add 20 Breakfasts — Total: TZS 100,000"). *Note: Even though the core experience hides financial jargon post-purchase, the initial funding/purchase step requires price transparency.*

---

## 3. CORE FLOW (End-to-End Mapping)

### Step 1: Merchant Onboarding & Catalogue Publishing
1.  Merchant downloads app, signs up as `@MamaRose`.
2.  Merchant goes to `Account -> Catalogue Management`.
3.  Merchant adds "Breakfast" (Price: 5000), "Lunch" (Price: 7000).
4.  *Status: The merchant is now searchable.*

### Step 2: Customer Discovery & Checkout ("Add to Card")
1.  Customer opens app. Clicks **Add to Card**.
2.  Customer searches `@MamaRose`.
3.  Customer views the storefront and selects **Breakfast**.
4.  Customer enters quantity **20** on the keypad.
5.  Customer is prompted to pay the upfront cost.
6.  *Status: Funds are automatically distributed to the merchant. The customer's Home Screen now displays a bento block: "20 Breakfast (Mama Rose)".*

### Step 3: Service Consumption ("Use Card" / "Accept Card")
*(Note: The prompt mentions the merchant searches for the customer to confirm consumption. The current UI assumes the user initiates it. We must align with the prompt's exact instruction: "The merchant opens their application, searches for the customer...")*

**Correct Flow based on Vision:**
1.  Customer arrives at Mama Rose. No cash, no phones required.
2.  Merchant opens their app, clicks **Accept Card** (or Search).
3.  Merchant searches the customer's `Card ID` (e.g., `@john_user`).
4.  Merchant sees John has "18 Breakfasts" remaining.
5.  Merchant taps **Consume 1 Breakfast**.
6.  Customer receives an instant notification: "1 Breakfast used at Mama Rose. 17 Remaining."
7.  *Status: The transaction is complete. Zero friction for the customer.*

---

## CONCLUSION & IMMEDIATE ACTION ITEMS

The visual redesign to a "Card" aesthetic is complete, but the **architectural logic** is incomplete.

To make the system fully explainable and usable:
1.  We must build the **Merchant Storefront UI** so users can browse actual services, not just type random quantities.
2.  We must build the **Merchant Catalogue Management UI** so services actually exist in state.
3.  We must flip the "Use Card" flow so that the **Merchant** triggers the consumption by looking up the user, fulfilling the promise of an "effortless" customer experience.
