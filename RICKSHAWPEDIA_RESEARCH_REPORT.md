# Rickshawpedia (India) Research Report: End-to-End Analysis

## 1. Executive Summary
Rickshawpedia is an Indian Digital Out-of-Home (DOOH) advertising startup founded in 2023 in Indore, Madhya Pradesh by Prabal Raverkar and Sumit Kaushal. The company operates an auto-rickshaw video advertising platform, retrofitting local auto-rickshaws with 10-inch Android tablets mounted behind the driver’s seat. These screens display geo-located, audio-visual advertisements to passengers during their commute.

The company aims to provide local and small/medium businesses with an affordable and highly targeted offline advertising channel while offering rickshaw drivers an opportunity to increase their income by 10% to 15%. With an initial fleet scale of over 1,000 retrofitted auto-rickshaws in Indore, Rickshawpedia represents a niche but scalable B2C/B2B transit commerce and discovery platform.

## 2. Business Model Analysis
**Verified Information:**
*   **Revenue Generation:** B2B advertising sales. Advertisers (SMBs, local brands, regional enterprise branches) pay to display their video ads on the rickshaw screens.
*   **Driver Incentives:** Auto-rickshaw owners/drivers earn a supplemental income (reported as a 10-15% increase in their earnings) for hosting the device and ensuring it remains operational.
*   **Target Market:**
    *   *Advertisers:* Local businesses, clothing/apparel, consumer electronics, FMCG, and services targeting specific local demographics.
    *   *Consumers:* Rickshaw passengers (middle-income to high-income, ages 18-60).
*   **Hardware Ownership:** Rickshawpedia provides and installs the 10-inch Android devices. The screens are not owned by the drivers but are operated as leased/partnered nodes in the Rickshawpedia network.

**Reasoned Technical Inferences:**
*   **Pricing Structure:** Likely operates on a Cost Per Impression (CPM) or Cost Per Day/Week/Month model per rickshaw, given the offline/local nature of the business.
*   **Scaling Strategy:** Prove the unit economics in a Tier-2 city (Indore) before expanding to Tier-1 cities or other transit formats (e.g., taxis, buses).

## 3. Product Analysis
**Verified Information:**
*   **Core Hardware:** 10-inch Android tablets mounted in the passenger cabin.
*   **Content:** Audio-visual advertisements, geo-location triggered adverts, and a mix of local and web content.
*   **Android Ecosystem:** They have published apps on the Google Play Store (e.g., "Rickshawpedia" for business/advertisers, and "Rickshawpedia Support" / "Rickshawpedia Drive Connect" for fleet/driver management).

**Reasoned Technical Inferences:**
*   The tablet acts as a locked-down kiosk (MDM controlled) running a custom launcher that loops media and displays dynamic content based on GPS coordinates.

## 4. Advertiser Workflow
**Verified Information:**
*   Advertisers use an app/platform to "trace a campaign's whole lifespan in terms of where it is shown."
*   They can target specific local areas (geo-located ads).

**Reasoned Technical Inferences (The "How"):**
*   **Campaign Creation:** Advertisers log into a web dashboard or the Rickshawpedia Business App. They upload MP4 video creatives or static images.
*   **Targeting:** Advertisers select target zones (polygons or radius around specific landmarks/pin codes) and set campaign durations.
*   **Approval & Deployment:** Campaigns enter a moderation queue. Once approved, the backend schedules the media to be distributed to the relevant subset of devices (or the entire fleet) via cloud synchronization.

## 5. Tablet Software Workflow
**Reasoned Technical Inferences:**
*   **Kiosk Mode:** The Android OS is locked down using an MDM (Mobile Device Management) profile or a custom Android launcher. Passengers cannot exit the app to access the base OS.
*   **Local Caching:** Since mobile internet in moving vehicles can be spotty, media files (MP4s, JPEGs) are heavily cached locally on the device's internal storage.
*   **Playback Loop:** A persistent background service manages a playlist. It checks the current GPS location against a downloaded JSON/SQLite geofence database and triggers specific ads when entering targeted zones.
*   **Offline Capability:** The system continues to loop cached default campaigns if internet connectivity drops, queuing playback logs locally.

## 6. Campaign Delivery Workflow
**Reasoned Technical Inferences:**
*   **Synchronization:** The tablets likely perform a handshake with the central server via 4G LTE/WiFi on a scheduled basis (e.g., every 15-30 minutes, or a large sync overnight).
*   **CDNs:** Media files are stored in a cloud bucket (AWS S3/GCP) and served via a CDN (Cloudflare/Cloudfront) to minimize download times and server load when hundreds of tablets sync simultaneously.
*   **Delta Updates:** To save bandwidth costs, the app only downloads new campaign media rather than re-downloading the entire playlist.

## 7. Geofencing System
**Verified Information:**
*   The platform explicitly features "geo-located-triggered" advertisements.

**Reasoned Technical Inferences:**
*   **Architecture:** The Android app constantly polls the device's GPS hardware.
*   **Matching Logic:** Uses geospatial algorithms (like ray-casting or a spatial index library) to detect if the current coordinate falls within a defined advertiser polygon (e.g., "Show this ad when within 500m of a specific shopping mall").
*   **Triggering:** When a boundary is crossed, the playlist manager injects the priority geofenced ad into the next available slot in the video loop.

## 8. Analytics System
**Verified Information:**
*   They provide "backend analytics" and "gather a lot of data... based on how various users engage with the android device."
*   Advertisers can trace where campaigns are shown.

**Reasoned Technical Inferences:**
*   **Data Collection:** The tablet logs every playback event (Ad ID, Timestamp, GPS Location, Duration played). If the screen is interactive (touch), it logs interaction events.
*   **Data Pipeline:** These logs are batched and sent to the backend REST API. If offline, they are stored locally and synced upon reconnection.
*   **Dashboard:** Advertisers see heatmaps of where their ads played, total estimated impressions (based on play counts and average passenger counts), and uptime metrics.

## 9. Device Management
**Verified Information:**
*   They manage a fleet of over 1,000 devices.
*   There is a dedicated "Drive Connect" / Support app, indicating driver-side management.

**Reasoned Technical Inferences:**
*   **Health Monitoring:** The devices send heartbeat pings to the server containing battery level, temperature, network strength, storage space, and current app version.
*   **Remote Management:** The operations team uses an MDM dashboard to remotely restart devices, push APK updates, or lock down malfunctioning screens.
*   **Driver App:** Drivers use their own phones (or the tablet) to clock in/out, check their earned incentives, and report hardware issues.

## 10. Technology Stack (Confirmed and Inferred)
**Confirmed:**
*   **Client OS:** Android (10-inch tablets).
*   **Distribution:** Google Play Store (for business/driver apps).

**Inferred Architecture:**
*   **Frontend (Advertiser/Admin):** React.js or Next.js web dashboard.
*   **Mobile Apps:** Flutter or React Native for the Advertiser/Driver apps. Native Kotlin/Java for the locked-down Kiosk Tablet app (to ensure deep hardware access for GPS and persistent background services).
*   **Backend:** Node.js or Python/Django microservices.
*   **Database:** PostgreSQL for relational data (users, campaigns, billing) + PostGIS for spatial/geofencing queries. MongoDB or AWS DynamoDB for high-volume playback analytics telemetry.
*   **Infrastructure:** AWS or GCP. S3 for media storage, MQTT or WebSockets for real-time device heartbeats.

## 11. Strengths
*   **Captive Audience:** Rickshaw passengers have an average ride time of 15-30 minutes with high attention rates.
*   **Hyper-Local Targeting:** GPS-triggered ads offer unprecedented local marketing precision for small businesses compared to static billboards.
*   **Driver Buy-in:** Providing an extra revenue stream creates a loyal fleet operator base that protects the hardware.
*   **First-Mover Advantage (Tier-2):** Launching in Indore allows them to refine the hardware/software model with lower operational costs before tackling highly competitive metros.

## 12. Weaknesses
*   **Hardware Vulnerability:** Tablets in public transit are highly susceptible to theft, vandalism, and extreme weather (heat/dust).
*   **Connectivity Issues:** Mobile networks in moving vehicles can be unstable, potentially disrupting real-time analytics or ad syncing.
*   **Measurement Accuracy:** "Impressions" are inherently estimated. The system knows an ad played, but unlike web ads, it cannot guarantee the passenger actually looked at the screen without computer vision/camera hardware (which poses privacy risks).

## 13. Opportunities for Improvement
*   **Programmatic Integration:** Connecting the inventory to programmatic DOOH exchanges (like Vistar Media or Broadsign) to attract national/global brands automatically, rather than relying solely on local sales teams.
*   **Interactive Commerce:** Allowing passengers to scan QR codes on the screen to instantly buy products, download apps, or claim coupons, moving from pure brand awareness to performance marketing.
*   **Smart City Integration:** Utilizing the GPS data and onboard sensors to provide city authorities with real-time traffic or road condition data.

## 14. Recommendations for Building Our Own Platform
If we are to pivot and build a superior, enterprise-grade version of this model, we must execute the following:

1.  **Edge-First Media Engine:** Our tablet software must be built natively (Kotlin/Rust) and operate 100% offline. Campaigns and geofences must sync efficiently via delta-updates over MQTT. The system must not break if the internet drops.
2.  **Verifiable Analytics:** We need to implement proof-of-play mechanics. Playback logs must be cryptographically signed by the device to ensure advertisers trust the impression data.
3.  **Enterprise DOOH Standards:** We must adopt IAB DOOH standards from day one to ensure our network can plug into global programmatic demand-side platforms (DSPs), bypassing the slow process of manual local sales.
4.  **Hardware Lifecycle Management:** Build a rigorous MDM from scratch. We need automated failovers, remote screen dimming (based on time of day), and predictive maintenance alerts.
5.  **Premium Positioning:** Rather than positioning as a cheap local ad network, we must build a platform that feels like an "operating system for transit." The UI must be world-class, fluid, and focused on trust and enterprise readiness, moving beyond simple video loops into interactive, contextual discovery.

---
*Report generated based on verified public data from app stores, press releases, business registries, and reasoned technical architectural standards for DOOH networks.*
