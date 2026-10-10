# German glossary (`de.json`)

Read [`concepts.md`](concepts.md) first for what the English terms mean. This file fixes the German
term for each concept, plus register and writing conventions.

## Register

Informal **du** throughout, including legal and consent text. Labels aimed at companies carry no
pronoun, so no *Sie* is needed.

- Full sentences to the user: du-imperative ("Wähle … aus", "Prüfe deine Internetverbindung").
- Buttons, labels, menu items, toggles: **infinitive** ("Fahrt starten", "Mehr anzeigen",
  "Support kontaktieren", "Abbrechen"), not "Starte die Fahrt" or "Zeig mehr".
- In-progress status: "Wird geladen", "Verbindung wird hergestellt...", not the bare stem
  ("Lade", "Verbinde" read like commands).
- Speaker: **wir** where English says "we" ("Wir konnten deinen Plan nicht berechnen"); keep
  "ABRP" as the subject only where English does.

## Terms

| English | Use | Avoid |
| --- | --- | --- |
| charger, charging station (site) | **Ladestation** | Ladepunkt, Ladesäule, Lader, Station |
| stall | **Ladepunkt** | Ladeanschluss, Stall, Station |
| plug type, connector | **Steckertyp**, **Stecker** | Ladestecker, Ladeanschluss, Anschluss |
| outlet | **Anschluss** | |
| charging network | **Ladenetz** (pl. Ladenetze) | Netzwerk, Ladenetzwerk, Netz |
| internet connection | **Internetverbindung** | Netzwerk |
| charge card | **Ladekarte** | |
| charge (one session) | **Ladevorgang** | Ladung, Aufladung |
| charging, to charge | **Laden**, **laden** | Aufladen, aufladen |
| charge stop | **Ladestopp** | Ladepause |
| stop | **Stopp** | Stop, Halt |
| waypoint | **Wegpunkt** | Zwischenstopp |
| amenity (nearby place) | **Sonderziel** | Serviceeinrichtung |
| amenity (charger attributes) | **Ausstattung** | Serviceeinrichtung |
| vehicle | **Fahrzeug** | Auto (unless English says car) |
| car battery | **Batterie** | Akku (phone battery only: Akkuoptimierung) |
| SoC | **SoC**; spelled out: **Ladezustand (SoC)** | Batteriestand, Ladestand |
| battery degradation | **Batteriedegradation** | |
| phone | **Smartphone** | Telefon, Handy |
| dongle, OBD adapter | **Adapter** ("OBD-Adapter") | Dongle |
| user | **Benutzer** | Nutzer |
| subscription | **Abonnement** | Premium-Mitgliedschaft |
| membership (charger) | **Mitgliedschaft** | |
| live data | **Live-Daten** | Livedaten |
| live data sharing | **Live-Daten teilen**, **Live-Daten-Gruppe** | Live-Daten-Austausch |
| sign in, log in | **anmelden**, **Anmeldung** | einloggen, Login |
| register (a device) | **registrieren** | anmelden |
| connect | **verbinden** | |
| link (account, token, vehicle) | **verknüpfen** | |
| distance (measured) | **Distanz** | Entfernung |
| speed limit | **Tempolimit** | Geschwindigkeitsbegrenzung |
| maximum speed | **Höchstgeschwindigkeit** | Maximalgeschwindigkeit |
| trip, journey | **Reise** | |
| drive (recorded trip) | **Fahrt** | |
| plan settings, plan options | **Planeinstellungen**, **Planoptionen** | Plan-Einstellungen |
| button | **Schaltfläche** | Button |
| settings | **Einstellungen** | |
| chart, graph | **Diagramm** | Grafik |
| marker | **Markierung** | Marker |
| preferences | **Präferenzen** | Vorgaben |
| cancel | **Abbrechen** | Abbruch |
| feature | **Funktion** | Feature |
| photo | **Foto** | Bild (unless English says image) |
| unit system labels (`imperial`, `british`) | **US**, **UK**, mirroring English | Imperial, Britisch |

## Conventions

- Quotes: **„…“** only. Placeholders stay inside.
- No spaced hyphen or dash as punctuation: use a comma or a full stop. Hyphens in compounds
  stay ("Live-Daten", "OBD-Adapter", "Smartphone-Einstellungen").
- Percent with a space: `15 %`. Units with a space: `5 min`, `30 km/h`.
- Mirror English terminal punctuation. Ellipsis as `...` where English uses it.
- "Als Nächstes:" with a capital N.
- Compounds: write English noun chains as one German compound or with "für", not in English word
  order ("Fehlerbericht-Schaltfläche" → "Schaltfläche für Fehlerbericht").
- Avoid English leftovers: Feature, Button, Stall, Dongle, Handy, "Livedaten".
- `premium_option_payment_desription`: "dann {{price}} pro {{duration}}" (avoids the gender of
  Monat and Jahr).
- Descriptions are translated from the English text; do not add explanations that English does
  not have.
