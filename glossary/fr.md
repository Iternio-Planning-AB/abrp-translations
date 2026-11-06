# French glossary (`fr.json`)

Read [`concepts.md`](concepts.md) first for what the English terms mean. This file fixes the French
term for each concept, plus register and writing conventions.

## Register

Formal **vous** throughout, including legal and consent text. Never tutoyer.

- Full sentences to the user: vous-imperative ("Vérifiez votre connexion Internet", "Sélectionnez
  le véhicule"); questions with inversion ("Voulez-vous vraiment...", "Êtes-vous sûr...").
- Buttons, labels, menu items, toggles: **infinitive** ("Ajouter un réseau préféré", "Annuler"),
  not "Ajoutez...". Step titles and form prompts may keep the imperative ("Entrez votre e-mail").
- In-progress status: noun forms ("Chargement", "Connexion en cours", "Planification..."), not
  the bare verb ("Planifie...").
- Speaker: **nous** where English says "we" ("Nous n'avons pas pu calculer votre plan").
- Turn-by-turn `direction_*` strings are left unchanged.

## Terms

| English | Use | Avoid |
| --- | --- | --- |
| charger, charging station (site) | **chargeur** | borne, station, "bornes/chargeurs" |
| stall | **point de recharge** | stalle, borne, SuC |
| plug type, connector | **type de prise**, **prise** | type de connecteurs |
| outlet | **connecteur** | point de recharge |
| charging network | **réseau de recharge**; **réseau** in short labels | réseau de charge, réseau de bornes |
| internet connection | **connexion Internet** | réseau |
| charge card | **carte de recharge** | badge, Charge Card |
| charge (one session) | **recharge** ("Dernière recharge") | charge |
| charging (activity, status) | **recharge**; status **Recharge en cours** | Charging |
| technical compounds | **charge**: puissance/courbe/limite de charge, état de charge | |
| to charge | **recharger** | charger (also means "load") |
| charge stop | **arrêt de recharge** | point de recharge |
| stop | **arrêt** | étape, halte |
| waypoint | **point de passage** | étape, waypoint |
| step (plan leg) | **étape** | |
| route plan (noun) | **plan** | trajet, "plan/trajet" |
| route | **itinéraire** | route |
| trip, recorded drive | **trajet** | voyage |
| amenity (nearby place) | **commodité** | agrément, équipement |
| amenity (charger attributes) | **services** | commodités, équipements |
| vehicle | **véhicule** | voiture (unless English says car) |
| SoC | **SoC**; spelled out **état de charge (SoC)** | niveau de charge, SOC |
| phone | **téléphone** | smartphone, mobile |
| dongle, OBD adapter | **dongle**, **adaptateur OBD** | clé OBD |
| subscription | **abonnement** | souscription |
| live data | **données en direct** | données en temps réel, Live Data |
| real-time (traffic, weather) | **en temps réel** | |
| live data sharing | **partage de données en direct** | |
| sign in, log in | **se connecter**, **connexion** | login |
| sign up | **inscription**, **créer un compte** | |
| register (a device) | **enregistrer** | inscrire |
| link, unlink (account, token, vehicle) | **lier**, **liaison**, **dissocier** | reconnecter |
| settings | **paramètres** ("Réglages" only for iOS settings) | réglages |
| speed limit | **limite de vitesse** | vitesse limite |
| maximum speed | **vitesse maximale** | vitesse maximum |
| bookmark | **favori** | signet |
| report (an issue) | **signaler**; **rapport de bug** | |
| upload | **envoyer** | télécharger (that is download) |
| download | **télécharger** | |
| button | **bouton** | button |
| feature | **fonctionnalité** | feature |
| chart, graph | **graphique** | |
| app | **application**; **appli** in tight space | app |
| email | **e-mail** | email, mail |
| unit system labels (`imperial`, `british`) | **US**, **UK**, mirroring English | Impérial, Anglais |

## Conventions

- Quotes: **« … »** with a non-breaking space inside. Placeholders stay inside.
- French spacing: a non-breaking space (U+00A0) before `:` `;` `?` `!` and `%`, and inside « ».
  Never glue the mark to the word ("véhicule?"). A literal number takes it ("15 %"); after a
  placeholder, `%` stays attached like English (`{{soc}}%`).
- Apostrophe: straight `'`.
- Accented capitals: **É**, **À**, **Ê** ("Évaluer", "À propos", "Êtes-vous").
- No spaced hyphen or dash as punctuation: use a comma, colon or full stop.
- Mirror English terminal punctuation; ellipsis exactly as English has it.
- Sentence case in titles and buttons. Units with a space: `5 min`, `30 km/h`.
- Compass letters N, E, S, **O**.
- `premium_option_payment_desription`: "puis {{price}} par {{duration}}" ("tous les {{duration}}"
  would give "tous les an").
- `amenity_stop`: "Arrêt {{category}}" (French word order).
- `table_heading` has exactly as many entries as English.

## To be confirmed

- **chargeur** for the site is the most used word in the file. Would **borne de recharge**, the
  usual French term, be better?
- **point de recharge** for a stall (the file mixed stalle and borne). OK?
- **point de passage** for waypoint, since étape already means a leg of the plan. OK?
- **plan** for the route plan, rather than **trajet** (the file used both, often "plan/trajet")?
- **services** for charger amenities, and **commodités** for nearby places
  (`charger_nearby_amenities_tab`, `amenities`). OK?
- **envoyer** for upload instead of "télécharger". OK?
- **US / UK** as unit labels, mirroring English (was "Impérial" / "Anglais"). OK?
- Quotes « » and non-breaking spaces before `:` `;` `?` `!` `%` (the file mostly used plain
  spaces). OK?
- `{{speed}} %`: the English space is kept as a non-breaking space. OK?
- `charge` = "Recharge" in the calendar legend; `driving_v2_charge_to_duration` uses a noun;
  `driving_v2_sharing_live_drive` = "Partage du trajet en direct". Natural?
- `driving_v2_sheet_label` = "Panneau inférieur"; `driving_v2_title_dev_quick_bar` =
  "Barre rapide développeur". OK?
- `premium_charger_features` = "caractéristiques des chargeurs"; `opening_hours_closes` = "Ferme"
  (a time follows); `details_page_marker` = "Repère placé"; `report_image_short` = "Signaler". OK?
- "lier à nouveau" for re-link in `live_data_deauthorized_*` reads stiffly. Better wording?
- Tesla's menu path "Paramètres->Sécurité" is left as it was. Does it match the French Tesla UI?
