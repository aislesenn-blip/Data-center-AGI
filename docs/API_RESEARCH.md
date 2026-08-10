# Diaspedia Transport API Research Note

This document outlines the research on the European public transportation data ecosystem, specifying API capabilities, limitations, and the chosen architecture for Diaspedia.

---

## 1. Provider Analysis

### A. Deutsche Bahn (DB) HAFAS / RIS APIs
* **Provider**: Deutsche Bahn AG / Regional Open Data Portals.
* **Coverage**: Full German rail network (ICE, IC, RE, S-Bahn) and major cross-border European connections.
* **Data Available**: Timetables, stopover schedules, actual departure/arrival forecasts, delays, and platform changes.
* **Realtime?**: Yes, departure and arrival delay predictions, track changes, and cancellation flags.
* **Prices?**: Dynamic pricing is locked behind commercial agreements and not open to the public without licensing.
* **Authentication**: Requires registration on DB’s API Marketplace for official keys. Some HAFAS endpoints are public but prone to changing user-agent blocking rules.
* **Rate limits**: Strict rate-limiting on public API portals.
* **Commercial / Redistribution restrictions**: Closed commercial re-use without official DB partner status.
* **Reliability**: Extremely high for official partners, low/unstable for public scraper proxies.
* **Recommended?**: Yes, via a robust hybrid transport service with an offline-fallback model.
* **Fallback**: Our custom Curated European Transport Database.

### B. SNCF Open Data (France)
* **Provider**: SNCF (Société Nationale des Chemins de fer Français).
* **Coverage**: Extensive coverage of TGV, TER, Intercités inside France, plus Eurostar and Lyria connections.
* **Data Available**: Real-time schedules, stop points, line search, and live passenger status updates.
* **Realtime?**: Yes, Siri-Lite formatted delays and track updates.
* **Prices?**: No public pricing API. Deep linking is supported.
* **Authentication**: Requires a developer token.
* **Rate limits**: 150,000 requests/day.
* **Recommended?**: Yes, for future extensions.
* **Fallback**: Curated European Transport Database.

### C. European Open Transport Aggregators (e.g. `db.transport.rest`)
* **Provider**: Community-driven open source wrapper over DB HAFAS endpoints.
* **Coverage**: Germany, with cross-border European routes.
* **Data Available**: Real-time station search, departures, arrivals, and journeys.
* **Realtime?**: Yes.
* **Prices?**: No pricing data.
* **Authentication**: None required (public endpoint).
* **Rate limits**: Unspecified but subject to DB HAFAS IP rate-limiting and frequent 503 service throttling.
* **Reliability**: Variable. Prone to downtime or breaking during DB endpoint upgrades.
* **Recommended?**: Yes, as a dynamic layer, but with strict timeouts and error-handling.
* **Fallback**: Curated European Transport Database.

---

## 2. Dynamic Pricing & Booking Handoff
Due to legal and technical restrictions on scraping European booking engines (e.g., DB Navigator, SNCF Connect, Eurostar):
1. **No Fake Bookings**: Diaspedia does not simulate ticket issuing.
2. **Booking Handoff**: Provide high-fidelity external deep links. For example:
   * **Deutsche Bahn**: `https://www.bahn.de/buchung/fahrplan/suche#sts=true&so=...&sa=...`
   * **SNCF**: `https://www.sncf-connect.com/en-en/`
   * **FlixBus / Eurostar**: Clear external portal redirects.

---

## 3. Recommended Hybrid Provider Architecture
To ensure **100% application uptime**, Diaspedia implements a **Hybrid Transport Service**:
1. **Dynamic Rail API Lookup**: Tries querying `db.transport.rest` for real-time station queries and journeys.
2. **Graceful Fallback Mode**: If the API call times out (>2.5s) or returns an error (like a 503 Service Unavailable), the system seamlessly falls back to our **Curated Offline European Transport Database**.
3. **Curated Database Content**: Includes popular European hubs (Berlin, Munich, Hamburg, Paris, Amsterdam, Wien, Zurich, Brussels, Prague, London, Milan) with accurate train numbers (ICE, RE, Eurostar, TGV), schedules, typical tracks, and real-time simulated delays to maintain a fully functional, high-fidelity experience under all conditions.
