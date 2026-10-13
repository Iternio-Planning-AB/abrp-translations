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
| `always_log` | the setting that always records your drives (activity logging), never "sign in" |
| `live_data_automotive` | Android **Automotive** (the car's built-in system), not Android Auto |
| `driving_v2_map_compass_n`, `_e`, `_s`, `_w` | compass-point letters on the driving map; use your language's letters |

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
- Percentages that the app formats itself are shown as `80%`, number first, in every language.
  `live_data_sharing_charging_to` gets " to 80%" appended by the app, so keep `{{soc}}%` as a
  suffix too, or one label shows both orders.
- Arrays such as `table_heading` and `daily_summary_export_header`: one entry per column, same
  length and order as English.
- `<url>…</url>`, `<bold>…</bold>`, `<url2>…</url2>`: markup tags; keep the tags and translate
  only the text between them. `{{placeholders}}` are never translated.

## Names that stay as written

ABRP, A Better Routeplanner, Apple CarPlay, Android Auto, Android Automotive, Apple Watch, Tronity,
Smartcar, Enode, Car Scanner, Featurebase, Rivian, Tesla, Mapbox, OBD, BLE, TTS, EV, CPO, SoC.

## To be confirmed

Readings of the English that are likely but not yet confirmed. If you know the answer, say so in
a pull request; confirmed points move into the tables above.

- `idle`, `started`, `succeeded`, `failed`, `unnecessary` sit together and are probably the states
  of a test command in the OBD PID editor, not the vehicle being asleep (the `idle` row above).
- `sleep` sits next to `shopping` and may be an amenity category ("somewhere to sleep") rather than
  the vehicle status in the row above.
- `driving_orientation`: a car display setting with Left and Right options, read as the driver's side.
- `driving_v2_sheet_label`: the accessibility name of the panel at the bottom of the driving view.
  `driving_v2_charge_rate_prompt`: the label next to the rating stars ("Rate").
- `driving_v2_share_live_drive*`: sharing the current drive live with other people.
- `driving_v2_charge_to_duration`: a notification text, so a noun phrase may read better than a command.
- `amenities_wp_button`: a charger that has amenities near a chosen location.
- `add_guidepoint`: a point that shapes the route on the map, different from a waypoint.
- `session_price`: the price per charging session. `for`: the "charge for X minutes" option next to `to`.
- `opening_hours_closes`: a time follows it. `details_page_marker`: a dropped pin.
- `access_token`: "REFRESH token" is the name of a Tesla token type, not a verb.
- `max_speed`, `routes_planned`: used as lower-case words inside a sentence.
- `upgrade` on a live data connection option: the option needs Premium, so it means upgrading to Premium.
- `obd_pid_mapping_default_hint`: "default" is a word the user types, so it stays untranslated.
  `obd_firmware_error_manifest_malformed`: `version` and `firmware` are field names.
- `car_scanner_step2_item2` ("ABRP Integration") and `tesla_fleet_streaming_toggle`
  ("Settings->Security") name menu items in other apps; use the names those apps show in your
  language if you know them.
- `From`, `To` are used both on plan rows and for a date range; if your language needs different
  words for the two, say so, they may need separate keys.
