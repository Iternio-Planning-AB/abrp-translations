# Croatian glossary (`hr.json`)

Read [`concepts.md`](concepts.md) first for what the English terms mean. This file fixes the Croatian
term for each concept, plus register and writing conventions.

## Register

Formal **vi** in every sentence addressed to the user ("Unesite svoju e-poštu", "Prijavite se dok
je vozilo parkirano", "Odaberite vozilo").

- Full sentences, descriptions, errors and dialogs: vi-imperative and vi-forms ("Odaberite vozilo",
  "Pokušajte ponovno").
- Buttons, menu items and short actions: the short singular imperative, as Croatian UIs do
  ("Spremi", "Odustani", "Dodaj usputno stajalište", "Pronađi punjače", "Prikaži više",
  "Pokušaj ponovno").
- Titles and status words: nouns ("Prijava", "Odjava", "Povezivanje...", "Učitavanje u tijeku").
- Speaker: **mi** where English says "we" ("Otkrili smo …").

## Terms

| English | Use | Avoid |
| --- | --- | --- |
| charger, charging station (site) | **punjač** (pl. punjači) | postaja za punjenje, punionica (except in "mreža punionica") |
| stall | **mjesto za punjenje** | punjač (a stall is not a site) |
| plug type, connector | **utikač**, **vrsta utikača** | konektor |
| outlet | **utičnica** | |
| charging network | **mreža punionica** | mreža punjača, operater (unless English says operator) |
| internet connection | **internetska veza** | mreža |
| charge card | **kartica za punjenje** | |
| charge (one session) | **punjenje** | |
| charging, to charge | **punjenje**, **puniti** | |
| charge stop | **zaustavljanje za punjenje** | zaustavljanje zbog punjenja, stanka |
| stop | **zaustavljanje** | stajanje |
| waypoint | **usputno stajalište** | međutočka |
| destination | **odredište** | |
| route | **ruta** | |
| trip, journey | **putovanje** | |
| drive (recorded trip) | **vožnja** | |
| amenity (nearby place and charger attributes) | **sadržaj** (pl. sadržaji) | pogodnosti |
| vehicle | **vozilo** | automobil, auto (unless English says car) |
| car (where English says car) | **automobil** | auto |
| car battery (traction) | **baterija** | akumulator |
| 12 V battery | **akumulator** | baterija |
| SoC | **razina baterije**; short labels may keep **SoC**; both: **razina baterije (SoC)** | stanje napunjenosti, razina napunjenosti |
| phone | **telefon** | mobitel |
| dongle, OBD adapter | **adapter** ("OBD adapter") | dongle |
| user | **korisnik** | |
| account | **račun** | |
| subscription | **pretplata** | članarina |
| Premium | **Premium** (not translated) | |
| live data | **podaci uživo** | live podaci |
| sign in, log in | **prijaviti se**, **prijava** | ulogirati se, login |
| sign out | **odjaviti se**, **odjava** | |
| register (a device) | **registrirati**, **registracija** | prijaviti |
| connect, link (account, vehicle, device) | **povezati**, **povezivanje** | spojiti (only for physically plugging in: "Spojite OBD adapter") |
| link (URL) | **poveznica** | link |
| settings | **postavke** | |
| button | **gumb** | tipka |
| feature | **značajka** | funkcija |
| chart, graph | **grafikon** | dijagram |
| consumption | **potrošnja** | |
| distance | **udaljenost** | |
| elevation | **nadmorska visina** | |
| speed limit | **ograničenje brzine** | |
| cancel | **Odustani** | Otkaži (as a button) |
| unit system labels (`imperial`, `british`) | **SAD**, **UK** | imperijalni, britanski |
| compass letters N, E, S, W | **S**, **I**, **J**, **Z** | |

## Conventions

- Quotes: **„…”** (closing mark U+201D). Placeholders stay inside.
- Mirror English terminal punctuation: a button or label without a full stop in English has none
  in Croatian.
- Percent and units with a space: `15 %`, `5 min`, `30 km/h`.
- Ellipsis as `...` where English uses it.
- Brand and product names stay as they are (ABRP, Premium, CarPlay, Android Auto, Tesla); they
  decline with a hyphen only after an abbreviation ("ABRP-u"), otherwise normally ("Smartcarom").
- Avoid English leftovers: dongle, login, link, feature.

## To be confirmed

- Is **punjač** the right word for a charging site, or should the site be **punionica** (as in
  "mreža punionica") and **punjač** stay for the device? The file uses punjač for the site in
  most strings.
- `charger_plugs_*` say **utičnice** (sockets) for plugs; should they be **utikači** like
  `plug_types`?
- `preferred_minimum_nbr_charger_stalls_*` translate stalls as **punjači**; by this glossary it is
  **mjesta za punjenje**.
- Buttons that use the vi-form (`contact_support` "Kontaktirajte podršku") versus the singular
  imperative elsewhere: align them?
- `add_waypoint` ends with a full stop that English does not have.
