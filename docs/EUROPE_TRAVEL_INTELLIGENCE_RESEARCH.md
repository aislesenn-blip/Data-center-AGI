# DIASPEDIA: EUROPEAN TRAVEL INTELLIGENCE & PRICE-MONITORING RESEARCH REPORT
**Utafiti wa API, Mifumo ya Open-Source, Miundombinu isiyo na Gharama (€0 MVP), na Uchambuzi wa Kihistoria wa Bei za Usafiri barani Ulaya**

---

## EXECUTIVE CONCLUSION (HITIMISHO KUU)
**Je, mfumo huu wa "Travel Intelligence" unaweza kujengwa kikamilifu kwa gharama ya €0 kwenye API mwanzoni?**

**NDIYO, lakini kwa masharti makubwa ya kiufundi.**

Tunaweza kuzindua MVP ya hali ya juu (High-Fidelity) kwa kutumia miundombinu ya gharama sifuri (€0) kwa kutumia suluhisho chotara (hybrid architecture):
1. **Schedules & Routes:** Tunaweza kutumia mifumo ya jamii na open-source (kama `db-hafasRest` na API za umma kama `db.transport.rest`) pamoja na feeds za wazi (GTFS) za EU NAPs (National Access Points) bila kulipia chochote.
2. **Train Fares (Prices):** Tunaweza kutumia maktaba zisizo rasmi lakini zenye ufanisi kama `db-prices` (JavaScript/Node.js) ambazo zinavuta "Sparpreise" (cheap fares) moja kwa moja kutoka kwenye mifumo ya ndani ya Deutsche Bahn bila API Key, na skrapers za reli nyingine (kama vile `ave-round-tripper` ya Renfe).
3. **Flight Prices:** Maktaba zilizofanyiwa reverse-engineering kutoka kwenye Android/iOS Apps (kama vile `skyscanner` na `irrisolto/skyscanner` kwa kutumia `curl_cffi` kukwepa ulinzi wa Cloudflare/PerimeterX) zinawezesha kupata data ya bei moja kwa moja. Hata hivyo, zina athari ya kisheria (ToS) na zinaweza kuvunjika haraka (high fragility).
4. **Historical Pricing & Predictions:** Hakuna API ya bure inayotoa data ya kihistoria ya bei. Hii inamaanisha ni lazima **tujenge database yetu wenyewe ya kihistoria** kuanzia siku ya kwanza kwa kukusanya "observations" (bei za kila siku) kupitia background workers (kama Cloudflare Workers au Supabase Edge Functions na cron-jobs za bure za GitHub Actions au Vercel Cron). Uchambuzi wa bei unaweza kufanywa kwa kutumia hesabu rahisi za takwimu (medians, percentiles, moving averages) au maktaba nyepesi kama `skforecast` au `statsmodels` kwenye Python bila kuhitaji miundombinu ghali ya AI.

---

## 1. THE FREE DATA LANDSCAPE (Mazingira ya Data ya Bure Ulaya)
Chini ya Sheria ya EU **Delegated Regulation 2017/1926**, nchi wanachama wa Umoja wa Ulaya zinatakiwa kutoa data ya multimodal transport kupitia **National Access Points (NAPs)**. Data hii inapatikana katika miundo ya **GTFS**, **NeTEx**, na **SIRI**.

### Aina za Upatikanaji wa Data:
* **Genuinely Free & Official (Bure na Rasmi):** Data ya ratiba (timetables), vituo, na jiografia kupitia portali kama *Mobilithek* (Ujerumani), *SNCF Open Data* (Ufaransa), na *Transport for Ireland*.
* **Free & Unofficial / Community-Maintained (Bure na Zisizo Rasmi za Jamii):** Mifumo kama `db.transport.rest` na `hafas-client` zinazotoa API chujio juu ya mifumo ya HAFAS ya reli mbalimbali.
* **Reverse-Engineered & Scraping (Zilizofanyiwa Reverse-Engineering):** Kupata bei za tiketi kupitia reverse-engineering ya APIs za siri za mobile apps.

---

## 2. FLIGHT APIs & OPEN-SOURCE RESOURCES (Data ya Ndege)
Kupata data ya bei za ndege bila malipo ni changamoto kubwa kwani mifumo rasmi (Amadeus, Duffel, Sabre) inatoza malipo baada ya majaribio machache (free tiers ndogo sana).

### A. Mifumo ya Reverse-Engineered / Unofficial:
1. **skyscanner (irrisolto/skyscanner)**
   * **URL:** [https://github.com/irrisolto/skyscanner](https://github.com/irrisolto/skyscanner)
   * **Language:** Python
   * **Stars/Forks:** 44 stars / 6 forks (Active commits 2025/2026)
   * **Maelezo:** Inatumia API iliyofanyiwa reverse-engineering kutoka kwenye Skyscanner Android App. Inatumia `curl_cffi` kufanya ulinzi wa TLS fingerprinting na kukwepa kizuizi cha anti-bot (PerimeterX/Akamai).
   * **Uwezo:** Inarudisha bei za ndege, IATA codes za viwanja, ratiba za mashirika, na ina uwezo wa kutafuta "Everywhere" na "Anytime".
   * **Gharama:** Bure kabisa (haitaji API Key).
   * **Hali:** 🟡 *Inafanya kazi lakini ina hatari ya ToS na anti-bot blockages.*

2. **Skyscanner Flight Search API (RapidAPI - Free Tier)**
   * **Maelezo:** Kuna watoaji wengi kwenye RapidAPI wanaofanya scraping ya Skyscanner na kutoa free tier ya requests ~50 hadi ~100 kwa mwezi (mfano: *romankh3/skyscanner-flight-api-client*).
   * **Hali:** 🔴 *Haifai kwa uzalishaji (production) kwa sababu ya kikomo kidogo sana cha requests.*

### B. Mkakati wa Data ya Kihistoria ya Ndege (Historical Flight Prices):
* Hakuna API ya bure inayotoa data hii. Tutatumia datasets zilizohifadhiwa (cached/archived) kama vile **Kaggle Flight Price Predictions** (maelfu ya routes za Ulaya) ili kuanzisha mfumo wetu wa "normal price ranges", na kisha kuanza kurekodi bei zetu wenyewe kupitia skraper yetu ya Skyscanner kuanzia siku ya kwanza.

---

## 3. EUROPEAN RAILWAY APIs & OPEN-SOURCE RESOURCES (Data ya Treni Ulaya)

Ulaya ina mtandao mkubwa wa reli, na kila nchi ina mfumo wake wa data:

### A. Mifumo ya Open Source na API za Bure:
1. **db-prices (juliuste/db-prices & derhuerst/db-prices-cli)**
   * **URL:** [https://github.com/juliuste/db-prices](https://github.com/juliuste/db-prices)
   * **Language:** JavaScript (Node.js)
   * **Stars/Forks:** 109 stars / 9 forks
   * **Maelezo:** Inatumia endpoint isiyo rasmi ya Deutsche Bahn kupata bei za bei rahisi zaidi (Sparpreise) kwa safari zote za treni nchini Ujerumani na treni za kuvuka mipaka (cross-border) kwenda Paris, Brussels, Amsterdam, Zurich, Vienna, Prague, nk.
   * **Uwezo:** Kupata bei (Euro), daraja la safari (1st/2nd class), punguzo la BahnCard, na aina ya treni (ICE, IC, RE).
   * **Hali:** 🟢 *Verified viable in 2026. Inahitaji uangalifu wa ToS.*

2. **SNCF MCP Server (belgrano9/sncf_mcp_server & Kryzo/mcp-sncf)**
   * **URL:** [https://github.com/belgrano9/sncf_mcp_server](https://github.com/belgrano9/sncf_mcp_server)
   * **Language:** Python (Ulinzi wa hivi karibuni wa MCP)
   * **Maelezo:** Wrapper ya API rasmi ya SNCF (Navitia API).
   * **Uwezo:** Ratiba kamili, vituo, na kuunganisha treni nchini Uansa (TGV, TER). SNCF inatoa API Key ya bure yenye kikomo kikubwa cha request 150,000 kwa siku!
   * **Hali:** 🟢 *Verified viable. Salama na rasmi lakini haijumuishi bei za tiketi (ratiba tu).*

3. **trenitapy (sgs00/trenitapy)**
   * **URL:** [https://github.com/sgs00/trenitapy](https://github.com/sgs00/trenitapy)
   * **Language:** Python
   * **Maelezo:** Maktaba ya kupata data ya treni za Trenitalia (Italia) kwa kutumia mfumo wa umma wa *Viaggiatreno*.
   * **Uwezo:** Taarifa za safari na ucheleweshaji wa treni kwa muda halisi (real-time).
   * **Hali:** 🟢 *Inafanya kazi vizuri kwa ucheleweshaji na ratiba, lakini haina bei za tiketi.*

4. **ave-round-tripper (angelbarrera92/ave-round-tripper)**
   * **URL:** [https://github.com/angelbarrera92/ave-round-tripper](https://github.com/angelbarrera92/ave-round-tripper)
   * **Language:** Python / Selenium / BeautifulSoup
   * **Maelezo:** Skraper ya bei za treni za mwendokasi za Renfe (AVE - Uhispania). Inajumuisha utumaji wa alerts kupitia Telegram na dashboard ya Grafana.
   * **Hali:** ⚠️ *Inafanya kazi lakini Renfe inatumia Akamai kuzuia ufikiaji, hivyo inahitaji proxies za makazi (residential proxies) ili isizuiwe.*

---

## 4. BUS APIs & OPEN-SOURCE RESOURCES (Data ya Mabasi)

### A. FlixBus (Mfalme wa Usafiri wa Mabasi Ulaya)
1. **flixbus-mcp (vlad-ds/flixbus-mcp)**
   * **URL:** [https://github.com/vlad-ds/flixbus-mcp](https://github.com/vlad-ds/flixbus-mcp)
   * **Language:** Python
   * **Maelezo:** Inavuta data kutoka kwa API ya RapidAPI ya FlixBus (FlixBus2 API).
   * **Hali:** 🟡 *Inahitaji RapidAPI subscription (ambayo ina free tier ndogo). Haifai kwa ufuatiliaji mkubwa wa bei.*

2. **flix-rest (juliuste/flix-rest)**
   * **URL:** [https://github.com/juliuste/flix-rest](https://github.com/juliuste/flix-rest)
   * **Language:** JavaScript
   * **Maelezo:** REST endpoint isiyo rasmi ya kupata ratiba, miji, na vituo vya FlixBus/FlixTrain.
   * **Hali:** 🟢 *Inafanya kazi kwa ajili ya ratiba na vituo.*

---

## 5. DB NAVIGATOR / DEUTSCHE BAHN DEEP DIVE
Deutsche Bahn (DB) ndiyo nguzo kuu ya usafiri wa reli barani Ulaya ya Kati. Mfumo wake wa ratiba (HAFAS) unajumuisha karibu reli zote za Ulaya Magharibi na Mashariki.

### Zana Muhimu za Open-Source:
* **hafas-client (derhuerst/hafas-client):** Maktaba yenye stars 400+ inayounganisha mifumo yote ya HAFAS ya Ulaya (DB, ÖBB, SBB, SNCB, NS, nk.). Hii ndiyo maktaba bora zaidi duniani kwa ratiba za treni za Ulaya.
* **db.transport.rest:** API ya umma ya bure inayotumia `hafas-client` kurudisha data ya Deutsche Bahn bila uhitaji wa API key au usajili.
* **db-prices:** Inapata data ya bei moja kwa moja kutoka kwenye DB Sparpreise API endpoint: `https://coronon.bahn.de/sp/service/v1/singleJourney` au endpoint mpya ya DB Next.

---

## 6. BUILDING OUR OWN PRICE DATABASE (Kujenga Database Yetu ya Bei)
Kwa kuwa hakuna API ya bure ya data ya kihistoria ya bei, **lazima tujenge database yetu wenyewe**.

### Miundo ya Kazi (€0 Architecture for Price Observations):
1. **User Search Triggered:** Kila mtumiaji anapotafuta njia fulani (mfano: Berlin → Barcelona tarehe 15 Oktoba), mfumo unarekodi bei ya sasa kwenye database yetu (Supabase au Turso) pamoja na tarehe ya uchunguzi (observation date).
2. **Cron-Job Monitoring:** Kwa njia maarufu (high-traffic European routes kama London → Paris, Berlin → Prague, Munich → Zurich), tunaweka cron-job ya kila siku (inayoendeshwa bure kupitia GitHub Actions au Vercel Cron) ambayo inapiga API ya `db-prices` au `skyscanner` saa sita usiku na kurekodi bei kwenye database.
3. **Data Growth Projection:**
   * Safari 1 ya treni / basi / ndege inahitaji rekodi 1 ya bei kwa siku (kama bytes 100).
   * Kwa njia 100 maarufu, tukifuatilia kwa siku 90 zijazo = rekodi 9,000 kwa siku.
   * Kwa mwaka mzima = rekodi milioni 3.2 (~320MB za data). Hii inatoshea kabisa kwenye **Supabase Free Tier (500MB)** au **Turso Free Tier (9GB)**!

---

## 7. PRICE PREDICTION INFRASTRUCTURE (Utabiri wa Bei)
Haitaji mifumo ghali ya AI (kama OpenAI au mifumo mikubwa ya GPU). Tunaweza kutumia mbinu rahisi za takwimu na maktaba za Python za wazi:

### Zana Muhimu:
1. **Moving Averages & Percentiles (Hesabu Rahisi):**
   * Njia rahisi na ya uhakika zaidi ya kuanza nayo (Stripe/Linear style): Changanua "historical median" na ulinganishe bei ya leo. Kama bei ya leo iko chini ya percentile ya 25, mwambie mtumiaji: **"NUNUA SASA (Bei ni ya chini sana kulinganisha na kawaida)"**.
2. **skforecast (Python):**
   * **URL:** [https://skforecast.org/](https://skforecast.org/)
   * Inajumuisha scikit-learn compatible forecasting kwa kutumia miundo mepesi kama XGBoost au LightGBM inayoweza kuendeshwa kwenye CPU yoyote ndogo ya bure.
3. **statsmodels (Python):**
   * Maktaba ya kitamaduni inayoruhusu modeli za **ARIMA** au **SARIMAX** kwa ajili ya kutabiri "seasonality" na "weekday effects" kwa urahisi sana.

---

## 8. OPEN DATA (Mifumo ya Open Data ya Serikali)
* **German Mobilithek (Ujerumani):** [https://mobilithek.info/](https://mobilithek.info/) - Data ya GTFS ya reli zote na usafiri wa umma.
* **French Transport NAP (Ufaransa):** [https://transport.data.gouv.fr/](https://transport.data.gouv.fr/) - Data kamili ya ratiba za treni na mabasi nchini Ufaransa.
* **National Rail Enquiries (UK):** Darwin push portali inayotoa ratiba na taarifa za treni za UK bure kabisa.

---

## 9. GEO, LOCATION, CURRENCY, CALENDAR, WEATHER (Miundombinu Ndogo)
* **Geocoding & Station Search:** Tunaweza kutumia **Photon API** ([https://photon.komoot.io](https://photon.komoot.io)) ambayo inategemea OpenStreetMap na haina kikomo cha matumizi, au **Nominatim**.
* **Currency Exchange:** **ExchangeRate-API** au **Frankfurter API** ([https://www.frankfurter.app/](https://www.frankfurter.app/)) - API ya bure kabisa inayofadhiliwa na umma na haihitaji API key kugeuza EUR kwenda GBP, CHF, PLN, nk.
* **Public Holidays:** **Nager.Date API** - API ya wazi ya kupata sikukuu za kitaifa za nchi zote za Ulaya kwa ajili ya kutabiri kupanda kwa bei wakati wa likizo.

---

## 10. NOTIFICATIONS INFRASTRUCTURE (Mifumo ya Alerts)
* **Email Alerts:** **Resend (Free Tier)** - Inaruhusu barua pepe 3,000 kwa mwezi bure kabisa.
* **Push Notifications & Telegram Alerts:** Tunaweza kuunda **Telegram Bot** kwa ajili ya kumtumia mtumiaji alerts za bei bure kabisa bila uhitaji wa push notification tokens za Apple au Google ambazo zinahitaji akaunti za developer za kulipia ($99/mwaka).

---

## 11. DATABASE & SERVERLESS BACKEND INFRASTRUCTURE
* **Database:** **Turso** (SQLite chotara, bure hadi rekodi milioni 1.5 za kusoma/kuandika kwa mwezi na 9GB ya storage) au **Supabase** (Postgres ya bure, 500MB storage).
* **Backend hosting:** **Vercel** (Next.js App Router ya bure kabisa kwa hobby tiers) au **Cloudflare Workers** (requests milioni 1 kwa siku bure!).

---

## 12. MATRIX YA RIASILIMALI ZA JUU (CAPABILITY MATRIX)

| Product Requirement | Best Free Source | Alternative | Free? | Open Source? | Official? | EU Coverage | Production Viability |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Flight Search & Price** | `irrisolto/skyscanner` | RapidAPI Skyscanner | Ndiyo | Ndiyo | Hapana | Kamili | 🟡 Fragile (Anti-bot risks) |
| **Train Search & Schedule**| `hafas-client` | `db.transport.rest` | Ndiyo | Ndiyo | Hapana | Kamili | 🟢 High (Stable) |
| **Train Fare (Prices)** | `db-prices` (Node.js) | `ave-round-tripper` | Ndiyo | Ndiyo | Hapana | DE, Cross-border | 🟢 Medium-High |
| **Bus Search & Prices** | `flix-rest` | RapidAPI FlixBus | Ndiyo | Ndiyo | Hapana | Kamili | 🟢 Medium |
| **Station Database** | `db-stations` | OpenStreetMap | Ndiyo | Ndiyo | Ndiyo | Kamili | 🟢 High |
| **Currency Rates** | `Frankfurter API` | ExchangeRate-API | Ndiyo | Ndiyo | Ndiyo | Kamili | 🟢 High |
| **Geocoding** | `Photon API` | Nominatim | Ndiyo | Ndiyo | Ndiyo | Kamili | 🟢 High |
| **Email Alerts** | `Resend` | Telegram Bot | Ndiyo | Hapana | Ndiyo | Kamili | 🟢 High |
| **Database Storage** | `Turso` | `Supabase` | Ndiyo | Ndiyo | Ndiyo | Kamili | 🟢 High |

---

## 13. LEGAL / ToS RISKS (Tathmini ya Kisheria na Kiufundi)
1. **Matumizi ya Unofficial APIs (`db-prices`, `skyscanner` reverse-engineered):**
   * *Uhalisia:* Inafanya kazi vizuri sana, lakini inakiuka "Terms of Service" (ToS) ya watoa huduma wakubwa wanaokataza scraping na reverse-engineering ya APIs zao.
   * *Uwezekano wa Kuharibika:* Mkali. Skyscanner wakibadilisha mifumo yao ya ulinzi ya PerimeterX au DB wakifunga Sparpreise endpoint, nambari hizi zitavunjika na zitahitaji updates za haraka kutoka kwa jamii ya open-source.
   * *Mkakati wa Usalama:* Diaspedia haipaswi kujenga "booking storefront" ya uongo au kufanya miamala. Badala yake, tunatumia bei hizi kama **"Price Indicators"** na kisha kumpatia mtumiaji **Deep Link** rasmi ya kwenda kununua tiketi kwenye website rasmi (kama bahn.de au skyscanner.com). Hii inalinda Diaspedia dhidi ya lawama za kisheria za kutoa tiketi feki au kushughulikia malipo.

---

## 14. €0 MVP ARCHITECTURE (Muundo wa Miundombinu wa €0)

Kama ningekuwa naunda startup hii leo, huu ndio mtambo kamili ninaoutumia:

```
                  +-----------------------------------+
                  |      Diaspedia Mobile App         |
                  |     (Next.js / Tailwind CSS)      |
                  +-----------------------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |        Vercel Edge Routes         |
                  |     (Serverless Api Controllers)  |
                  +-----------------------------------+
                    /               |               \
                   /                |                \
                  v                 v                 v
        +-------------------+ +-------------+ +--------------------+
        |    db-prices /    | | Turso /     | |    Photon API /    |
        |  hafas-client API | | Supabase DB | |  Frankfurter API |
        | (Train Prices/Sch)| | (Storage)   | | (Geo / Currency) |
        +-------------------+ +-------------+ +--------------------+
```

* **Frontend:** **Next.js 15 (React 19)** yenye Tailwind CSS v4 na Framer Motion, iliyohifadhiwa bure kwenye **Vercel**.
* **Backend:** Serverless API endpoints zilizojengwa moja kwa moja ndani ya Next.js App Router (zinazoendeshwa kwenye Edge Runtime ya Vercel).
* **Database:** **Turso (SQLite)** kwa ajili ya kuhifadhi rekodi za bei za kihistoria ("price observations") na akaunti za watumiaji.
* **Cron Jobs:** **GitHub Actions Workflow** inayojiendesha kila siku saa 00:00 UTC kukusanya bei za sasa kwa njia 50 maarufu zaidi za treni na ndege na kuziandika kwenye Turso.
* **Notification System:** **Telegram Bot API** kutuma alerts za bei kwa watumiaji (bure kabisa na rahisi kujenga) pamoja na **Resend** kwa alerts za barua pepe (email).

---

## 15. RECOMMENDED LAUNCH WEDGE (Mkakati Bora wa Uzinduzi)
**Tuchague "Option E: Germany → Spain Cross-Border and Germany Domestic Trains".**

### Kwa nini?
1. **Upatikanaji wa Data wa Juu:** Deutsche Bahn kupitia `db-prices` inatoa data ya bei yenye uhakika mkubwa bila kizuizi cha anti-bot, kulinganisha na ndege (Skyscanner) ambazo zina ulinzi mkali.
2. **Kupanda na Kushuka kwa Bei (Volatility):** Bei za treni za mwendokasi nchini Ujerumani (ICE) na safari za kuvuka mipaka (km Berlin → Paris au Berlin → Munich) zinabadilika sana kuanzia wiki 6 kabla ya safari (kutoka €19.90 Sparpreis hadi €150+ Flexpreis). Hii inatoa sababu kubwa sana kwa mtumiaji kutumia "Diaspedia" ili kujua lini hasa waandike na kununua.
3. **Ushindani mdogo:** Programu nyingi za usafiri nchini Ujerumani (kama DB Navigator yenyewe) zinakupa bei ya leo tu, lakini hazikwambii **"Subiri, bei itashuka kesho!"** au **"Nunua sasa, hapa ndipo bei ya chini kabisa ya kihistoria!"**. Huu ndio mtaro (wedge) wetu mkuu wa ushindani!
