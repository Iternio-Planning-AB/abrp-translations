# Dutch glossary (`nl.json`)

Read [`concepts.md`](concepts.md) first for what the English terms mean. This file fixes the Dutch
term for each concept, plus register and writing conventions.

## Register

Formal **u / uw** throughout, including legal and consent text. Never mix u and je in one string
or flow.

- Full sentences to the user: imperative + *uw*, or *u* as subject ("Controleer uw
  internetverbinding", "U heeft een hoge waarde ingesteld"). Prefer "U heeft" over "U hebt".
- Buttons, labels, menu items, toggles: **infinitive**, object first ("Opslaan", "Routepunt
  toevoegen", "Opnieuw proberen", "Meer tonen"), not "Probeer nogmaals" or "Laat meer zien".
- In-progress status: "Bezig met laden", "Bezig met verbinden...", "Aan het laden" (charging).
  Never a bare stem ("Laad", "Verbind").
- Speaker: **we / ons / onze** where English says "we" ("We konden uw route niet berekenen").
  Keep "ABRP" as the subject only where English does.
- "alstublieft" or "a.u.b." (never "aub"); leave it out when English has no "please".
- Turn-by-turn `direction_*` strings are left unchanged.

## Terms

| English | Use | Avoid |
| --- | --- | --- |
| charger, charging station (site) | **oplader** (pl. opladers); fast: **snellader** | oplaadpunt, laadpunt, laadstation, lader |
| stall | **laadpunt** | plek, plaats, oplaadpunt, Stall |
| plug type, connector | **stekkertype**, **stekker** | connector, aansluiting |
| outlet | **stekker** | |
| charging network | **netwerk** (standalone title: **laadnetwerk**) | exploitant, operator |
| operator, provider (company) | **aanbieder** | |
| internet connection | **internetverbinding** | netwerk, "internet verbinding" |
| charge card | **laadpas** | oplaadpas, laadkaart |
| charge (one session) | **laadsessie** | "Laad op", oplaadmoment |
| charging, to charge | **laden** (laadtijd, laadvermogen) | "Laad op" as a label |
| charge stop | **laadstop** | oplaadstop |
| stop | **stop** (pl. stops) | tussenstop (unless English says intermediate) |
| waypoint | **routepunt** | waypoint, tussenstop, tussenpunt |
| amenity | **voorziening** | faciliteit, Food |
| vehicle | **voertuig** | auto (unless English says car) |
| car battery | **accu** (accucapaciteit, accudegradatie) | batterij (phone only: Batterijbesparing) |
| SoC | **SoC**; spelled out: **laadtoestand (SoC)** | accuniveau, batterijniveau, State of Charge |
| phone | **telefoon** | smartphone, toestel |
| device | **apparaat** | toestel |
| dongle, OBD adapter | mirror English: **dongle**, **adapter** ("OBD-adapter") | |
| user | **gebruiker** | |
| subscription | **abonnement** | Premium-lidmaatschap |
| membership (charger) | **lidmaatschap** | abonnement |
| live data | **live data** ("live data-verbinding") | Livegegevens, actuele gegevens, live-data |
| sign in, log in | **inloggen** | aanmelden, Login |
| sign up, register | **registreren** | aanmelden |
| connect | **verbinden** | connecten, Connect |
| link (account, token, vehicle) | **koppelen** | |
| connection (live data source) | **verbinding** | connectie |
| plan (noun) | **plan** (pl. plannen) | plans |
| plan settings, plan options | **planinstellingen**, **planopties** | "Route instellingen" |
| odometer | **kilometerstand** | "totale afstand meter" |
| speed limit | **snelheidslimiet** | |
| maximum speed (setting) | **maximale snelheid** | maximumsnelheid |
| trip, journey | **reis** | |
| drive (recorded trip) | **rit** (pl. ritten) | |
| button | **knop** | button |
| feature | **functie** | feature |
| preferences | **voorkeuren** | |
| chart, graph | **grafiek** | diagram |
| photo, image | **foto**, **afbeelding** (mirror English) | |
| electric current (`current`) | **Stroom** | Huidige |
| unit system labels (`imperial`, `british`) | **VS**, **VK**, mirroring English | Amerikaans, Brits |

## Conventions

- Quotes: **“…”**. Placeholders stay inside. Apostrophe: straight `'` ("foto's", "EV's").
- No spaced hyphen or dash as punctuation: use a comma or a full stop. Compound hyphens stay
  ("OBD-adapter", "ABRP-account").
- Compounds as one word or hyphenated, never split English style: "routepunt", "ritafstand",
  "netwerknaam" (not "Rit afstand", "netwerk naam").
- Percent without a space: `15%`. Units with a space: `5 min`, `30 km/h`.
- Mirror English terminal punctuation. Ellipsis as `...` where English uses it.
- "Eén" at sentence start, not "Één".
- `premium_option_payment_desription`: "dan {{price}} per {{duration}}".
- `table_heading`: same number and order of columns as English.
- Avoid English leftovers: Feature, Button, Connect, Stalls, Food, waypoint.

## To be confirmed

- Register: the file was mixed (about 150 strings with u, about 110 with je, mostly in newer
  features). This PR moves everything to **u**. Is u the right choice, or should Dutch be je?
- **oplader** for the site is the most used word in the file. Would "laadlocatie" or "laadpaal"
  be more natural?
- **laadpunt** for stall: the file mixed plek, plaats and oplaadpunt. OK?
- **laadpas** instead of oplaadpas or laadkaart. OK?
- **laadtoestand (SoC)** when SoC is spelled out, instead of accuniveau. OK?
- **VS / VK** as unit labels, mirroring English "US"/"UK" (was "Amerikaans"/"Brits"). OK?
- **plan** or **route** for a saved or calculated plan? The file uses both.
- **live data** written open ("live data-verbinding"), or the spelling-rule form "livedata"?
- Quotes: the file had no majority („…“, '…', "…"). Is **“…”** right?
- `charge` = "Laadsessie" in the calendar legend next to "Rijden". Would "Laden" pair better?
- `driving_v2_end_drive` = "Stoppen", `driving_v2_sheet_label` = "Onderpaneel",
  `driving_v2_charge_rate_prompt` = "Beoordelen". Natural?
- `preferred_min_arrival_battery` uses laadtoestand (battery read as SoC). Correct?
- `request` = "Aanvragen", `upgrade` = "Upgraden" (live data buttons). OK?
- `access_token`: "refresh token" kept as a token type; `choose_referral_code` =
  "Verwijzingscode kiezen". OK?
- Input hints and validation errors ("Voer … in") stay imperative rather than infinitive. OK?
- `attributions_intro` keeps "jullie" because it addresses contributors. OK?
- "ABRP Premium Connection" and third-party menu names (`tesla_fleet_streaming_toggle`,
  `car_scanner_step2_item2`) stay in English. OK?
