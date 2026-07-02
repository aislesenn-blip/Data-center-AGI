# Rickshawpedia: Technical & Business Analysis Report

## 1. Executive Summary

Rickshawpedia is an innovative Digital Out-Of-Home (DOOH) advertising startup based in Indore, Madhya Pradesh, India. Founded in 2023 by Prabal Raverkar and Sumit Kaushal, the company aims to modernize local advertising by equipping auto-rickshaws with tablet-based video and audio screens. By turning local transit into dynamic, moving billboards, Rickshawpedia offers both B2B (local businesses) and B2C (individuals sharing messages) clients a cost-effective way to reach a highly targeted, local audience. While public technical details are limited, analysis of their app footprint and business model reveals a structured approach combining a standard Android-based kiosk application developed by "Young Decade IT Software Solution" with a classic advertising-revenue sharing model that incentivizes drivers. This report reverse-engineers their platform, combining verified public information with reasoned technical inferences based on standard DOOH industry practices.

---

## 2. Business Model Analysis

### Verified Information
*   **Target Market:** Primarily local B2B (Small/Medium Enterprises in clothing, consumer electronics, FMCG, and services) and B2C (local event announcements or personal messages).
*   **Geographic Focus:** Indore, India, with stated ambitions for broader India and North America expansion.
*   **Revenue Generation:** Advertisers pay for video/audio ad placements on the screens installed in auto-rickshaws.
*   **Driver Incentivization:** Auto-rickshaw drivers ("auto walas") earn extra income by hosting the devices, as confirmed by driver reviews. This aligns their incentives to keep the device powered and visible.
*   **Key Partners:** Developed by "Young Decade IT Software Solution LLP," an Indore-based IT agency. The company has integrated with 1000+ auto-rickshaw owners.

### Reasoned Technical Inferences
*   **Hardware Ownership:** The company likely subsidizes or outright owns the tablet hardware to maintain quality control and uniform specifications across the fleet. Drivers act as "hosts."
*   **Pricing Model:** Likely tiered based on the number of rickshaws, duration of the campaign, and potentially the specific geographic zones (if geofencing is fully implemented).
*   **Sales Strategy:** Currently heavily reliant on direct sales and local agency partnerships (like "Rahane Media") to onboard local merchants who may not be tech-savvy enough for a fully self-serve platform.

---

## 3. Product Analysis

### Verified Information
*   **Core Offering:** Auto-rickshaw audio-visual advertisements.
*   **Mobile Apps:** Rickshawpedia maintains an app presence on the Google Play Store (e.g., "Rickshawpedia" and "Rickshawpedia Support") indicating mobile-first management for some stakeholders, possibly drivers or advertisers tracking basic metrics.

### Reasoned Technical Inferences
*   **The Physical Device:** A ruggedized, low-cost Android tablet (7-inch to 10-inch) mounted behind the driver’s seat, facing the passengers. It must be powered by the rickshaw's battery or an external power bank system.
*   **The Software Suite:** Consists of three distinct user interfaces:
    1.  The passenger-facing playback loop (the tablet).
    2.  The driver-facing status/earnings interface (likely a hidden menu on the tablet or a separate smartphone app).
    3.  The advertiser/admin web dashboard for campaign management.

---

## 4. Advertiser Workflow

### Reasoned Technical Inferences
Given the target audience (local SMEs), the advertiser workflow is likely a hybrid of manual agency onboarding and a basic self-serve web portal:
*   **Campaign Creation:** Advertisers log into a web dashboard, provide business details, and upload creative assets (MP4 videos, static images).
*   **Targeting:** They select campaign parameters: number of vehicles, duration (e.g., 1 month), and potentially specific routes or zones within Indore.
*   **Budgeting:** The system calculates a cost estimate. Payment is processed (likely via Razorpay or similar Indian payment gateways).
*   **Approval Workflow:** An admin at Rickshawpedia reviews the creative for compliance (avoiding inappropriate content) before marking it "Approved" for distribution to the fleet.
*   **Status Tracking:** Advertisers can view a basic "Live/Pending/Completed" status on their dashboard.

---

## 5. Tablet Software Workflow

### Verified Information
*   The primary app developer is an external agency ("Young Decade IT Software Solution"), suggesting a standard, outsourced Android build rather than a deeply custom OS.

### Reasoned Technical Inferences
*   **Android Kiosk Mode:** The tablet runs a standard Android OS locked down using "Kiosk Mode" (e.g., Android Enterprise dedicated device features or a custom launcher) to prevent passengers or drivers from exiting the ad loop and using other apps.
*   **The Player Application:** A native Android app that launches on boot. It constantly loops a downloaded playlist of media files.
*   **Offline Capability:** Rickshaws frequently enter dead zones. The tablet *must* download all necessary media assets to local storage. It does not stream video live; it plays from a local cache.
*   **Synchronization:** The app likely pings a central server every few minutes (via a 4G SIM card in the tablet) to check for new playlists, report health, and upload playback logs.
*   **Power Management:** The software likely has logic to gracefully shut down or sleep when the rickshaw's ignition is turned off to prevent draining the vehicle's battery.

---

## 6. Campaign Delivery Workflow

### Reasoned Technical Inferences
*   **Backend CMS:** A cloud-hosted Content Management System (likely AWS or DigitalOcean) stores the uploaded creatives.
*   **Playlist Generation:** When an admin approves a campaign, the CMS generates a JSON playlist file for the specific group of devices the campaign targets.
*   **Content Distribution (CDN):** The tablet apps poll the CMS API. If a new playlist is detected, the app downloads the required MP4/JPG files via a CDN.
*   **Background Downloading:** Downloads occur in the background while the current playlist continues to run uninterrupted.
*   **Failover:** If a download fails or internet is lost, the device continues looping the most recently successfully cached playlist.

---

## 7. Geofencing System

### Reasoned Technical Inferences
While advanced geofencing is the holy grail of transit DOOH, for an early-stage startup in Indore, the implementation is likely rudimentary:
*   **GPS Tracking:** The Android tablet uses its internal GPS or connects to an external GPS tracker (their developer "Young Decade" also built a "Kineti GPS" app, hinting at shared GPS expertise).
*   **Basic Location Reporting:** The device pings its coordinates back to the server.
*   **Geofenced Triggers (Hypothetical):** If implemented, the app holds a local database of "zones." When the GPS coordinate enters a polygon (e.g., "Palasia Square"), the player application interrupts the standard loop to play a specific ad targeted for that zone.
*   **Reality Check:** Given the cost of continuous mobile data and the complexity of real-time spatial queries on low-end tablets, it is more likely they currently sell "run-of-fleet" campaigns rather than highly granular real-time geofenced ad injection. They likely use GPS primarily for analytics (proving the rickshaw was driving).

---

## 8. Analytics System

### Reasoned Technical Inferences
*   **Data Collection:** The tablet software records a local log file: `[Timestamp] [Ad_ID] [Played_Duration] [GPS_Coordinates]`.
*   **Data Upload:** These logs are batched and uploaded to the server via the cellular connection.
*   **Advertiser Dashboard:** The backend aggregates these logs to provide metrics:
    *   **Impressions:** Calculated heuristically (e.g., 1 playback = X estimated passengers/bystanders based on traffic data).
    *   **Play Count:** Exact number of times the video finished playing.
    *   **Uptime/Active Vehicles:** Showing the advertiser how many rickshaws carrying their ad were active that day.
    *   **Heatmaps:** Basic plots of the GPS coordinates where the ad played over the city map.

---

## 9. Device Management

### Reasoned Technical Inferences
Managing 1000+ remote Android devices requires Mobile Device Management (MDM).
*   **Fleet Management:** They likely use a commercial MDM solution (like Hexnode, ManageEngine, or Android Management API) or a custom lightweight dashboard to monitor the fleet.
*   **Health Monitoring:** The system tracks "Last Seen" timestamp, battery level, storage space, and app version.
*   **Remote Actions:** The admin can remotely reboot the device, push APK updates, or lock a stolen device.
*   **Driver Operations:** If a device goes offline for 48 hours, an operations team likely contacts the driver to troubleshoot or replace hardware.

---

## 10. Technology Stack

### Verified Information
*   **Mobile App OS:** Android (Java/Kotlin), distributed via Google Play.
*   **Development Partner:** Young Decade IT Software Solution LLP.

### Reasoned Technical Inferences
Based on standard practices for startups built by Indian IT agencies in the 2020s:
*   **Frontend (Dashboard):** React.js or Angular.
*   **Backend:** Node.js (Express) or PHP (Laravel) or Python (Django/FastAPI).
*   **Database:** PostgreSQL or MySQL (for relational data like users/campaigns) + Redis (for device session caching).
*   **Infrastructure:** AWS (EC2, S3 for media, CloudFront for CDN).
*   **Device Communication:** REST APIs for polling, potentially MQTT or WebSockets if they require real-time remote control.

---

## 11. Strengths

*   **First-Mover Advantage:** Bringing organized, digital media to an unorganized sector (auto-rickshaws) in a Tier-2 Indian city.
*   **Captive Audience:** Passengers in rickshaws have high dwell time and limited distractions, leading to high ad recall.
*   **Driver Alignment:** Paying drivers a share of revenue ensures they become custodians of the hardware, reducing vandalism and theft.
*   **Affordability:** Low operational costs compared to erecting large outdoor digital billboards.

---

## 12. Weaknesses

*   **Hardware Vulnerability:** Tablets in open rickshaws face extreme heat, dust, vibration, and potential theft/vandalism.
*   **Connectivity Reliance:** Cellular networks in moving vehicles can be spotty, potentially delaying ad updates or analytics uploads.
*   **Measurement Difficulty:** Unlike web ads, DOOH cannot precisely measure "click-throughs" or exact eyeball counts, relying on heuristic estimations.
*   **Outsourced Tech Risk:** Relying on an external agency for core technology can slow down iteration speed and complicate deep architectural changes.

---

## 13. Opportunities for Improvement

*   **Interactive Campaigns:** Utilizing QR codes on the screen that passengers can scan to get discounts or download apps, bridging the physical-digital divide and providing hard attribution metrics.
*   **Programmatic Integration:** Connecting their fleet to programmatic DOOH exchanges (like Vistar Media or Hivestack) to automatically sell unsold inventory to national brands.
*   **Hyper-Local Geofencing:** Perfecting the GPS logic to trigger ads based on the exact street the rickshaw is on (e.g., a restaurant ad playing only when 500 meters away).
*   **Computer Vision:** Upgrading hardware to include a privacy-safe inward-facing camera to anonymously count passengers and determine demographics for better ad targeting.

---

## 14. Recommendations for Building Our Own Platform

To build a stronger, more scalable enterprise-grade platform, we should adopt the following architectural principles:

1.  **Own the Core Technology:** Do not outsource the tablet player or backend engine. The synchronization and offline playback logic are the "secret sauce" and must be built in-house using modern, robust languages (e.g., Kotlin for Android, Go/Rust for backend microservices).
2.  **Edge-First Architecture:** Assume the internet is always failing. The tablet must be a completely self-sufficient node that downloads states (not just files) and executes them flawlessly offline. Use robust local databases (like SQLite or Realm) on the device.
3.  **Advanced MDM Integration:** Integrate deeply with the Android Enterprise API. We need zero-touch provisioning so we can ship a tablet to a driver, they turn it on, and it configures itself securely without manual setup.
4.  **Event-Driven Analytics:** Instead of uploading massive log files, use an event-driven architecture (like MQTT or gRPC streaming) to send lightweight telemetry packets whenever the device has a signal, ensuring real-time dashboard updates.
5.  **Programmatic-Ready from Day 1:** Design the database schema and API to comply with OpenRTB standards. Our platform should be capable of accepting ad bids programmatically, not just via manual dashboard uploads.
6.  **Premium Positioning:** Target enterprise buyers immediately. The hardware must look integrated and premium (custom enclosures), and the software must provide enterprise-grade audit trails, SOC2 compliance, and transparent reporting.
