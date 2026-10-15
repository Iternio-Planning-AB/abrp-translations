# Italian glossary (`it.json`)

Read [`concepts.md`](concepts.md) first for what the English terms mean. This file fixes the Italian
term for each concept, plus register and writing conventions.

## Register

Informal **tu** throughout, including legal and consent text. Plural *voi* ("vostro", "Siete
sicuri") and *Lei* ("Selezioni", "Come giudica") are outliers to fix.

- Full sentences to the user: tu-imperative ("Controlla la connessione a Internet e riprova"),
  not the impersonal infinitive ("Controllare… e riprovare").
- Buttons, labels, menu items: **tu-imperative** too ("Aggiungi sosta", "Salva", "Apri
  impostazioni"), not "Salvare il piano".
- In-progress status: **noun form** ("Caricamento", "Salvataggio in corso", "In ricarica"), never
  a bare gerund ("Guidando") or infinitive ("Dormire").
- Speaker: **noi** where English says "we" ("Non siamo riusciti a calcolare il tuo piano").
- Turn-by-turn `direction_*` strings are left unchanged.

## Terms

| English | Use | Avoid |
| --- | --- | --- |
| charger, charging station (site) | **stazione di ricarica** (pl. stazioni di ricarica); short **stazione/stazioni** only in tight, unambiguous labels (tabs, chips) | colonnina, caricatore, caricabatterie |
| stall (one charging point at a site) | **stallo** (pl. stalli) | Stall, punto di ricarica, stazione |
| plug type, connector | **tipo di connettore**, **connettore** | presa, spina |
| outlet | **presa** | |
| charging network | **rete di ricarica**, **rete** | gestore, rete di caricatori, network |
| internet connection | **connessione a Internet** | rete |
| charge card | **carta di ricarica** | tessera, Charge Card |
| charge (one session) | **ricarica** | carica, caricamento |
| charging (status) | **In ricarica** | In carica |
| charge stop | **sosta di ricarica** | fermata di ricarica |
| stop | **sosta** | fermata |
| waypoint | **tappa** | punto intermedio, punto di passaggio, fermata, Waypoint |
| amenity (nearby place) | **servizio** (pl. servizi) | amenity |
| amenity (charger attributes) | **dotazioni** | servizi |
| vehicle | **veicolo** | auto (unless English says car) |
| car (where English says car) | **auto** | macchina |
| SoC | **SoC**; spelled out: **stato di carica (SoC)** | % di batteria, livello di batteria, SOC |
| battery degradation | **degrado della batteria** | usura |
| phone | **telefono** | smartphone, cellulare |
| dongle, OBD adapter | **dongle**, **adattatore OBD** | OBD-adapter |
| subscription | **abbonamento** | iscrizione |
| live data (feature) | **dati in tempo reale** | dati live, dati dal vivo |
| real-time (traffic, weather) | **in tempo reale** | live |
| live data sharing | **condivisione dati in tempo reale** | condivisione dati live |
| live drive (shared position) | **viaggio in tempo reale** | viaggio live |
| sign in, log in | **accedi**, **accesso** | login, fai il login |
| sign up | **registrati** | iscriviti |
| connect | **collegare**; noun **connessione** | connettere |
| link (account, token, vehicle) | **associare** | collegare |
| speed limit | **limite di velocità** | limite velocità |
| route | **percorso** | itinerario, rotta |
| drive (recorded trip) | **tragitto** | percorso, viaggio |
| trip, journey | **viaggio** | |
| plan / to plan | **piano** / **pianificare** | itinerario |
| bookmark | **preferito** (pl. preferiti): "Aggiungi ai preferiti", "Nei preferiti" | segnalibro |
| button | **pulsante** | tasto, bottone |
| chart, graph | **grafico** | grafica |
| delete / remove | **elimina** / **rimuovi** | cancella |
| feature | **funzionalità** | feature |
| voltage / current | **tensione** / **corrente** | voltaggio, adesso |
| unit system labels (`imperial`, `british`) | **US**, **UK**, mirroring English | Imperiale, Britannico |
| yes | **Sì** | Si |

## Conventions

- Quotes: **«…»**, no inner spaces. Placeholders stay inside. A quoted setting name must match
  its label exactly ("Salva la mia attività").
- Apostrophes: straight `'` only.
- No spaced hyphen or dash as punctuation: use a comma, colon or full stop.
- Percent without a space: `15%`. Units with a space: `5 min`, `30 km/h`.
- Mirror English terminal punctuation. Ellipsis as `...` where English uses it.
- Keep accents on capitals and short words: "È", "Sì", "più", "perché".
- Avoid English leftovers: Waypoint, Stall, Food, login, barcode, referral, "Charge Card".
- `to` is a preposition: "Milano a Roma", "In ricarica: 20% a 80%"; never "per".
- `charge_to_x`: "Ricarica fino a {{x}}", not "Ricarica per".
- `premium_option_payment_desription`: "poi {{price}} ogni {{duration}}" (works for anno and mese).

## To be confirmed

- Quotes: the file had no majority ("…", '…', „…“). Is **«…»** right?
- `add_guidepoint` = "punto guida", `next_step` = "Prossimo tratto" (a plan leg, not a tappa).
  Natural?
- `driving_v2_action_itinerary` = "Itinerario" (English says Itinerary), `driving_v2_end_drive` =
  "Fine", `driving_v2_sheet_label` = "Pannello inferiore". OK?
- `upgrade` = "Passa a Premium", `clear` = "Azzera", `photo_example_bad` = "Non buono",
  `cookies_reject` = "Rifiuta". OK?
- `charger_amenity_dog_friendly`, `rate_charger_dog_question` = "Cani ammessi"; `toilet` stays
  "Toilet". OK?
- `type_of_chargers`, `exclude_tesla_warning`, `need_ccs_outside_of_na_error` read as plug types
  (connettore); `avoid_on_route` = "Evita sul percorso". Correct?
- "connettersi al server" kept as idiomatic, and `delete_*_question` titles stay infinitive
  ("Eliminare…?"). OK?
