# Danish glossary (`da.json`)

Read [`concepts.md`](concepts.md) first for what the English terms mean. This file fixes the Danish
term for each concept, plus register and writing conventions.

## Register

Informal **du** throughout (no *De/Deres*), including legal and consent text. Labels aimed at
companies carry no pronoun.

- Full sentences to the user: plain imperative ("Vælg dit køretøj", "Tjek din internetforbindelse").
  Do not add *venligst*, never put it first ("Venligst log ind"), and do not use *bedes du*.
- Buttons, labels, menu items: **imperative stem** ("Gem", "Slet", "Vis mere", "Kontakt support",
  "Prøv igen", "Åbn indstillinger") or a noun phrase ("Start kørsel"). Never the infinitive
  ("Ignorere", "Sortere", "Køre hertil"). "Åbn" (verb), not "Åben" (adjective).
- In-progress status: present tense ("Indlæser", "Gemmer", "Forbinder...", "Planlægger..."), not a
  noun ("Sletning af ...", "Beregning af ...") and not an imperative.
- Speaker: **vi** where English says "we" ("Vi kunne ikke beregne din plan"); keep "ABRP" as the
  subject only where English does.
- Turn-by-turn `direction_*` strings are left unchanged.

## Terms

| English | Use | Avoid |
| --- | --- | --- |
| charger, charging station (site) | **oplader** (pl. opladere) | lader, ladestation |
| stall | **ladepunkt** | ladestander, ladebås, lader, plads, Stall |
| plug type, connector | **stik**, **stiktype** | opladertype |
| outlet | **stik** ("Hvilket stik") | forretning |
| charging network | **netværk**; heading: **Ladenetværk** | Lade netværk |
| internet connection | **internetforbindelse** | netværk |
| charge card | **ladekort** | betalingskort, opladningskort, Charge Card |
| charge (one session) | **opladning** (pl. opladninger) | ladestop, opkrævning |
| charging, to charge | **opladning**, **oplade / lade op**; status **Lader** | ladning |
| charge stop | **ladestop** (pl. ladestop) | opladningsstop |
| waypoint | **viapunkt** | waypoint, vejpunkt, plads |
| plan (route plan) | **plan** (planen, planer); **planindstillinger** | rute |
| route | **rute** | |
| amenity (nearby place) | **interessepunkt** | faciliteter, bekvemmeligheder |
| amenity (charger attributes) | **faciliteter** | bekvemmeligheder |
| vehicle | **køretøj** | bil (unless English says car) |
| car battery | **batteri** | |
| SoC | **SoC**; spelled out: **ladetilstand (SoC)** | opladningstilstand, State of Charge |
| battery degradation | **batteridegradering**, **degradering** | batterinedbrydning |
| phone | **telefon** | mobil |
| dongle, OBD adapter | **dongle** / **OBD-adapter**, mirroring English | ODB |
| sign in, log in | **log ind**, noun **login** | Log in, log på |
| sign up, create account | **opret konto** | tilmeld |
| register (a device) | **registrere** | |
| password | **adgangskode** | kodeord |
| connect | **forbinde**, **forbindelse** | tilslutte (only for plugging in) |
| link (account, token, vehicle) | **tilknytte**, **tilknytning** | linke |
| live data | **livedata**; **livedatadeling**, **livedatagruppe** | live data, live-data |
| subscription | **abonnement** | Premium-medlemskab |
| feature | **funktion** | feature |
| distance | **afstand** | distance |
| speed limit | **hastighedsgrænse** | hastighedsbegrænsning |
| maximum speed | **maks. hastighed** | tophastighed |
| trip | **tur** | rejse |
| drive (recorded trip) | **køretur** (pl. køreture) | drev, strækning |
| location | **placering**; **position** where English says position | lokation, plads |
| photo, image | **billede** | foto |
| notification | **advisering** | notifikation |
| cancel | **Annuller** | Afbryd |
| dismiss | **Luk**, **Skjul** | Afbryd |
| settings, preferences | **indstillinger**, **præferencer** | |
| chart, graph | **diagram**, **graf** | |
| unit system labels (`imperial`, `british`) | **US**, **UK**, mirroring English | Britisk |

## Conventions

- Quotes: **„…“**. Placeholders stay inside. Literal values the user types (`"default"`) keep
  straight quotes.
- No spaced hyphen or dash as punctuation: use a comma or a full stop.
- Compounds are written together: "Ladenetværk", "Hundevenlig", "Opladerdetaljer", "Startsted",
  "Korttilstand". Hyphen only with abbreviations, brands, numbers and placeholders
  ("OBD-adapter", "Tesla-netværket", "{{category}}-stop").
- Percent with a space: `15 %`. Units with a space: `5 min`, `30 km/t`. Compass: N, Ø, S, V.
- Mirror English terminal punctuation. Ellipsis as `...` where English uses it.
- Brand names stay as written; "A Better Routeplanner" is never translated.
- `premium_option_payment_desription`: "derefter {{price}} pr. {{duration}}" (avoids the gender of
  måned and år).
- `charging` is both a settings title and a live status: "Opladning" fits both.
- Descriptions are translated from the English text; do not add explanations that English does
  not have.

## To be confirmed

Proposals not yet checked by a native speaker. Once one is agreed, move it into the sections above.

Term choices:

- **plan** for the route plan, keeping **rute** for routes? The file was split roughly evenly.
- **viapunkt** for waypoint, and `add_guidepoint` = "Tilføj rutepunkt" kept apart from it?
- **ladepunkt** for stall (no previous majority among ladestander, ladebås, lader, plads)?
- **interessepunkt** for amenity search results, or "sted"? Charger attributes (`amenities`,
  `charger_amenity_*`) stay **faciliteter**.
- **forbinde** over *tilslutte*, and **tilknytte** over *linke*?
- **livedata** as one word, including compounds?
- **ladetilstand (SoC)** and **degradering** over *nedbrydning*?
- **køretur** for a recorded drive, and **Annuller** over *Afbryd* for Cancel?

Register and style:

- **„…“** quotes everywhere in UI text?
- `15 %` with a space (Danish norm) instead of the older `15%`?

Individual strings:

- `always_log` = "Log altid"; `locale` = "Landestandard"; `bookmark` as the action ("Bogmærk")?
- `for` = "i" (duration option next to "til"); `session_price` = "opladning"?
- `driving_orientation` = "Førerside"?
- `driving_v2_action_itinerary` = "Ruteoversigt"; `driving_v2_share_live_drive` = "Livekørsel";
  `eta_arrival` = "Ankomst {{arrival}}"?
- `obd_pid_map_results` and other mapping keys as "Tilknyt…/Tilknytninger";
  `oauth_error_invalid_scope` keeps "scope"?
- `amenities_wp_button` = "Oplader med interessepunkter i nærheden"; `charger_stops` = "ladestop"
  (lower case)?
- `live_data_deauthorized_*`: does "tilknytte" read too stiffly for re-linking?
