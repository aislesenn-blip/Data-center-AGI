# Rickshawpedia (India) - Platform & Ecosystem Analysis

## 1. Executive Summary
Rickshawpedia is an Indore-based startup founded by Prabal Raverkar and Sumit Kaushal that specializes in transit-based digital out-of-home (DOOH) video advertising inside auto-rickshaws. By installing 10-inch Android devices in front of the passenger seat, the company has created an interactive, hyper-local advertising network. As of mid-2023, they had deployed their solution across 1000+ auto-rickshaws. The core value proposition centers on captive audience engagement, localized reach, and providing additional income streams to rickshaw drivers.

*Note: As Rickshawpedia's primary domain is currently inactive/unavailable and public technical whitepapers are scarce, this report heavily relies on reasoned technical inferences built upon established DOOH and AdTech paradigms, corroborated by press releases and their Google Play Store presence.*

## 2. Business Model Analysis
**Verified:**
*   **Target Market:** Small to medium local businesses (SMEs) in Indore seeking hyper-local reach, as well as larger brands wanting deep urban penetration. Pricing starts as low as ₹550/piece.
*   **Value Proposition for Drivers:** Rickshawpedia shares revenue with auto-rickshaw owners, promising a 10% to 15% increase in their daily income, which incentivizes hardware adoption and retention.
*   **Advertiser Workflow:** The platform facilitates direct interaction, likely offering both offline (managed service) and online campaign booking.

**Inferred:**
*   **Hardware Ownership:** Rickshawpedia likely subsidizes or completely owns the 10-inch Android tablets. Charging drivers for the hardware would severely stifle adoption.
*   **Scaling Strategy:** Prove unit economics in Indore, then expand to other Tier 2/Tier 3 cities in India where auto-rickshaws form the backbone of public transport. Future targets include taxis and standard public transit.

## 3. Product Analysis
**Verified:**
*   **The Hardware:** 10-inch Android tablets mounted facing the passenger.
*   **Content:** A mix of local entertainment/web content and audio-visual advertisements.
*   **Mobile App:** They operate an app ("Rickshawpedia" on Google Play) designed for businesses/advertisers to expand local reach.

**Inferred:**
*   The passenger experience is a continuous loop of engaging content interspersed with ads, ensuring the screen is not perceived merely as a billboard, but as an entertainment/information node.

## 4. Advertiser Workflow
**Inferred (Based on industry standards and their Play Store app description):**
1.  **Onboarding & Campaign Creation:** Advertisers use the Rickshawpedia web portal or Android app.
2.  **Asset Upload:** They upload video creatives (MP4, optimized for 10-inch horizontal/vertical displays depending on orientation).
3.  **Targeting Selection:** Advertisers select specific geographic zones within Indore (geofences) or specific time blocks (e.g., rush hour).
4.  **Budgeting & Approval:** The advertiser sets a budget, the Rickshawpedia ops team approves the creative for compliance, and the campaign goes live.
5.  **Monitoring:** The advertiser uses the app/dashboard to view campaign lifecycle and ROI metrics.

## 5. Analytics Dashboard
**Verified:**
*   **Backend Analytics:** Rickshawpedia explicitly states they gather "a lot of data" on how users engage with the Android device to inform advertisers on the most effective video advertisements.

**Inferred:**
*   **Metrics Provided:** Total ad plays (impressions), estimated reach (based on average passenger volume per ride), geolocation heatmaps of where ads were played, and uptime/active vehicle counts.
*   **Engagement Tracking:** If the screen has interactive touch elements (e.g., QR codes or tap-to-expand), the dashboard tracks tap-through rates (TTR).

## 6. Vehicle-Side Technology (Tablet Software Workflow)
**Verified:**
*   **OS:** Custom or locked-down Android running on 10-inch devices.

**Inferred:**
*   **The Kiosk App:** The tablet runs a dedicated, kiosk-mode Android application. This prevents passengers or drivers from exiting the app to browse the web or change settings.
*   **Offline Capability:** Auto-rickshaws frequently lose cellular connection. The app must cache media locally. It likely downloads daily playlists and video files when connectivity is strong and plays them from local storage.
*   **Synchronization:** The app sends play-logs ("proof-of-play") back to the server. If offline, it stores these logs locally and syncs them in batches once the connection is restored.

## 7. Campaign Delivery Workflow
**Inferred:**
*   **CMS (Content Management System):** A central cloud-based CMS holds all active campaigns.
*   **Distribution:** When a new campaign is approved, the CMS pushes a new "manifest" or playlist to the fleet via a CDN or direct server connection.
*   **Background Downloading:** Tablets poll the server periodically (e.g., every 15 minutes). If a new manifest is detected, they download the video assets in the background without interrupting the currently playing ad loop.

## 8. Geofencing & Location Intelligence
**Verified:**
*   **Geolocated-triggered Adverts:** Rickshawpedia explicitly advertises the ability to show ads triggered by the vehicle's physical location.

**Inferred:**
*   **GPS Polling:** The Android tablet uses its internal GPS (or a connected module) to constantly poll its coordinates.
*   **Local Geofence Processing:** To avoid latency and save data, the tablet likely downloads a list of active geofences (e.g., polygons representing shopping malls or universities). The local software checks the GPS coordinates against these polygons and triggers a specific local ad when entering a zone.

## 9. Device Management
**Inferred:**
*   **MDM (Mobile Device Management):** Managing 1000+ devices requires an MDM solution (either commercial like Esper/Hexnode or a custom-built MQTT-based ping system).
*   **Capabilities:** Remote rebooting, pushing APK updates silently (OTA updates), monitoring battery levels, and tracking device temperature (crucial in Indian summers inside a vehicle).
*   **Anti-Theft:** GPS tracking to recover stolen devices, and remote-wiping capabilities.

## 10. Technology Stack (Inferred)
*   **Frontend (Advertiser/Ops Dashboard):** React or Angular.
*   **Mobile App (Advertisers):** React Native or Flutter (given the Google Play presence and typical startup velocity).
*   **Tablet Application:** Native Android (Kotlin/Java) to leverage kiosk-mode APIs, low-level GPS access, and robust local database management (Room/SQLite for caching play logs).
*   **Backend:** Node.js, Python, or Go.
*   **Database:** PostgreSQL/MySQL for relational data (users, campaigns) and a time-series database or NoSQL (MongoDB) for the massive volume of proof-of-play and GPS logs.
*   **Cloud & CDN:** AWS or AWS/Cloudflare combination for serving heavy video files to 1000+ devices efficiently.

## 11. Strengths
*   **First-Mover/Niche Focus:** Establishing a strong foothold in a specific tier-2 city (Indore) before facing national competition.
*   **Captive Audience:** Auto-rickshaw rides offer distraction-free dwell time, leading to high ad recall compared to fleeting highway billboards.
*   **Driver Alignment:** Revenue sharing aligns the fleet operator's goals with the company's goals, reducing hardware tampering.

## 12. Weaknesses
*   **Hardware Vulnerability:** 10-inch screens in open-air vehicles are highly susceptible to theft, vandalism, dust, and extreme heat.
*   **Connectivity:** Consistent 4G/5G in moving vehicles through dense urban canyons can be unreliable, complicating real-time programmatic bidding.
*   **Scale Costs:** Unlike software startups, every new user (driver) requires a significant CapEx investment (the tablet, mounting hardware, and installation labor).

## 13. Opportunities for Improvement
*   **Interactive Commerce:** Moving beyond video playback to allow passengers to purchase items, download coupons via QR codes, or book return rides directly from the screen.
*   **Programmatic Integration:** Connecting the inventory to global Supply-Side Platforms (SSPs) so national/international brands can buy the inventory algorithmically.

## 14. Recommendations for Building Our Platform
1.  **Hardware is Hard:** Do not underestimate the physical environment. Our tablets must be ruggedized, theft-proof, and capable of operating in extreme heat.
2.  **Offline-First Architecture:** The Android playback engine *must* be capable of operating entirely offline for days, relying on robust local caching and batch-syncing of analytics.
3.  **Advanced Geofencing:** Build the targeting engine to allow advertisers to draw polygons on a map. Our system should seamlessly push these coordinates to the devices for instant, local triggering.
4.  **Premium Positioning:** Unlike localized startups, our platform must present an enterprise-grade UI/UX to attract global FMCG brands, telecom operators, and banks immediately.
