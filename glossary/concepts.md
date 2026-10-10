# Concepts in the English source

What the English terms in `en.json` refer to. Many languages need a separate word for each of
these, so do not merge them just because English reuses one word. Language-specific choices are in
the glossary of each language.

| English | Refers to |
| --- | --- |
| charger, charging station | the **site**: a location on the map with one or more charging points |
| stall | one **charging point** at a site |
| plug, connector | a **plug type** (CCS, CHAdeMO, NACS, Type 2) |
| outlet | an individual socket entry in the charger report and edit forms |
| fast chargers (`fast_chargers`) | in plan settings: the **plug types** to plan with. In the car display's nearby list: a section of fast charging **stations** |
| slow chargers (`slow_chargers`) | section in the car display's nearby list. The English text reads "Destination chargers display"; it means destination (slow, level 2) chargers |
| network | a **charging network or operator**. The internet connection is a different thing (`no_network`, `checking_network`) |
| charge card | RFID or app card for a charging network |
| charge (noun) | one charging **session** |
| charging | the activity or status of charging |
| charge stop | a stop in the plan whose purpose is charging |
| stop | any stop on the route; a **waypoint** is a point set by the user; a **step** is a leg of the plan |
| amenity (search) | a nearby place to stop at, such as a restaurant, hotel or shop (`amenity*`) |
| amenity (charger) | attributes of a charger site such as restrooms, dog-friendly or playground (`charger_amenity_*`, `charger_filter_*`) |
| battery | the **vehicle** battery. The phone battery appears only in the battery-optimization texts |
| SoC | state of charge. Descriptions spell it out; short labels use the abbreviation |
| connect / link | connect = establish a live data or device connection; link = tie an account, vehicle or token to another record |
| drive | a recorded **trip** (noun); as a tab label it means the driving view |
| vehicle / car | the app says "vehicle" almost everywhere; "car" appears in a few user-facing phrases |

## Short keys whose meaning is not obvious

| Key | Meaning |
| --- | --- |
| `current` | electric **current** (amps) next to voltage and power |
| `time` | the **arrival time** label |
| `to` | used inside composed text: a plan title "A to B" and the live data group status "Charging 20% to 80%" |
| `To`, `From` | labels on plan list rows and on date ranges |
| `imperial`, `british` | the English labels are "US" and "UK": names of unit systems |
| `auto` | the *automatic* map view mode, never "car" |
| `plan` | tab-label **verb** next to `drive` |
| `charging` | a settings section title and a live status word |
| `writing`, `reading` | Bluetooth status while the app writes to or reads from the OBD adapter |
| `loading` | shown as `{loading}...`; the ellipsis is added by the app |
| `listening` | voice assistant state while the microphone is open |
| `sleep`, `idle`, `device_sleeping` | the vehicle or device is asleep or idle |
| `reference_consumption` | the plan setting; the English text is just "Consumption" |
| `realtime_chargers` | the charger **availability** feature |

## Strings assembled by the app

Several strings are combined with other text, so check how a value is used before judging it on
its own:

- `direction_*`: turn-by-turn instructions built from a direction word, an exit number, a road
  number and a destination. The direction words are lower-case and may start a sentence. They are
  also read aloud.
- `direction_arrival` plus `direction_*_variant`, `direction_to_name`, `direction_in_distance`.
- Distance words (`kilometers`, `meters`, `miles`, `feet`, `yards`, `kilometer`, `mile`) and the
  spoken fractions `half`, `quarter`, `three-quarters`, which are placed before a singular unit.
- `premium_option_payment_desription`: "then {{price}} every {{duration}}" where the duration is
  `year` or `month`.
- `amenity_stop`, `amenities_more`: `{{category}}` is a translated category label.
- Arrays such as `table_heading` and `daily_summary_export_header`: one entry per column, same
  length and order as English.
- `<url>…</url>`, `<bold>…</bold>`, `<url2>…</url2>`: markup tags; keep the tags and translate
  only the text between them. `{{placeholders}}` are never translated.

## Names that stay as written

ABRP, A Better Routeplanner, Apple CarPlay, Android Auto, Android Automotive, Apple Watch, Tronity,
Smartcar, Enode, Car Scanner, Featurebase, Rivian, Tesla, Mapbox, OBD, BLE, TTS, EV, CPO, SoC.
