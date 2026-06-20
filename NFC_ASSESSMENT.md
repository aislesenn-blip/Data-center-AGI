# NFC Capability & Technical Assessment

## Executive Summary
This document provides a technical validation of NFC capabilities for the SpaceCard PWA. The objective is to determine whether real NFC interactions can be used in a production environment for the Tap-to-Pay flow, strictly adhering to browser, OS, and security limitations.

## 1. Device & Browser NFC Capabilities

### Android Capabilities
- **Web NFC (PWA/Chrome):** Fully supported via the `NDEFReader` API.
  - The application can read and write NDEF (NFC Data Exchange Format) messages while running in the foreground.
  - Requires serving over HTTPS.
  - Requires explicit user permission upon the first scan.
- **Background NFC:** Android natively supports reading NDEF URI records in the background and can launch the associated URL (e.g., launching the SpaceCard PWA or a specific route).

### iOS / iPhone Limitations
- **Web NFC (PWA/Safari):** **NOT SUPPORTED.** Apple has not implemented the Web NFC API (`NDEFReader`) in WebKit/Safari.
  - **Critical Limitation:** A user *cannot* have the SpaceCard PWA open on the "Ready to Pay" screen and actively scan an NFC tag. Safari simply will not expose the hardware.
- **Background NFC:** iOS devices (iPhone XS and newer) support Background Tag Reading.
  - If a user taps an NFC tag encoded with an NDEF URI, iOS will show a system notification. Tapping the notification opens Safari/PWA to that URL.
  - This disrupts the linear "Amount -> Tap -> Process -> Receipt" flow if the user is already in the app, as tapping a tag will trigger a new browser intent rather than communicating with the active DOM.
- **Native iOS:** Full NFC reading (CoreNFC) and limited NFC writing is supported, but strictly requires a Native App (React Native, Swift), not a PWA.

## 2. Tag Compatibility
- **Supported Tags:** NTAG series (NTAG213, NTAG215, NTAG216), MIFARE Ultralight, and standard NFC Forum Type 1-5 tags *if they are formatted with NDEF*.
- **EMV / Bank Cards:** Web NFC **cannot** read credit cards or EMV payment chips. It only interacts with NDEF-formatted tags. Accessing APDUs or secure enclaves is strictly prohibited in web environments.

## 3. Implementation Strategy & Feasibility

### Flow: Tap NFC → Read Tag → Identify Destination → Authorize Payment

**Feasibility for PWA:**
- **Android:** ✅ Feasible using `window.NDEFReader`.
- **iOS:** ❌ Not feasible for foreground scanning. The OS will intercept the tag and prompt to open a new tab, breaking the stateful application flow.

**Alternative Cross-Platform Strategy (The "URL-First" Approach):**
Instead of the flow being `Input Amount -> Scan Tag`, the standard PWA flow must be:
1. User taps merchant's static NFC tag (with phone asleep or on home screen).
2. OS reads NDEF URI (e.g., `https://spacecard.app/pay/nfc-tap?merchant=CR-8492`).
3. App launches, identifies destination, asks for amount, and authorizes.
*(Note: This violates the requested memory architecture of "Step 1 is amount input... Step 2 is 'Ready to Tap'").*

**Conclusion for the "Amount First -> Tap Tag" Flow:**
To achieve the exact requested linear flow across all devices, SpaceCard **must** migrate to a Native App wrapper (e.g., React Native with `react-native-nfc-manager` or Capacitor) to utilize native `CoreNFC` on iOS.

## 4. Real NFC Testing Implementation
We have implemented real Web NFC hardware detection in `/pay/nfc-tap/page.tsx` using `window.NDEFReader`.
- **Detection:** Checks if `NDEFReader` exists on the `window` object.
- **Scanning:** On "Ready to Pay", it attempts to initialize the hardware and listen for `reading` events.
- **Error Handling:** Gracefully falls back or displays unsupported messages on iOS, while retaining the "(Simulate Tap)" developer bypass for testing.

## Addendum: Reading Bank Cards (EMV)

### Can SpaceCard Web NFC read a CRDB/NMB Bank Card?
**NO.** Web NFC (`NDEFReader`) absolutely cannot read credit cards, debit cards, or any EMV payment chip. It cannot even read the basic ID or Serial Number of a bank card.

**Why?**
1. **Protocol Mismatch:** Web NFC only reads NDEF-formatted data. Bank cards use the EMV standard and communicate via low-level APDU (Application Protocol Data Unit) commands over ISO-DEP (ISO 14443-4). Web NFC does not support APDU communication.
2. **Security Sandboxing:** Browsers intentionally block access to secure elements and financial protocols to prevent skimming and malicious code execution.
3. **To read bank cards:** You must build a Native Application (Kotlin/Swift) with low-level NFC APIs (e.g., `NfcA`/`IsoDep` on Android or `CoreNFC` ISO7816 tags on iOS) to send the specific byte commands required to extract PAN (card number) and expiry data.
