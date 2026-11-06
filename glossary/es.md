# Spanish glossary (`es.json`)

Read [`concepts.md`](concepts.md) first for what the English terms mean. This file fixes the Spanish
term for each concept, plus register and writing conventions.

## Register

Split by direction of address, as agreed in PR 1359:

- App to user (descriptions, dialogs, errors, notifications, headings that say "your"): **usted**
  ("Seleccione las opciones que quiera evitar", "Sus vehículos").
- Buttons, menu items, toggles: **infinitive** ("Añadir punto de ruta", "Conectar datos en
  directo"). A tú imperative is accepted where the file already has it
  ("Inténtalo de nuevo"). Never usted on a button.
- Third-person sentences about objects are not usted.
- Speaker: **nosotros** where English says "we" ("No hemos podido calcular su ruta").
- Many existing app to user strings still use tú. Apply the split to new and edited strings, and
  make a group of related strings uniform when you edit it.
- Turn-by-turn `direction_*` strings are left unchanged.

## Terms

| English | Use | Avoid |
| --- | --- | --- |
| charger (site) | **cargador**; "estación de carga" only where English says charging station | punto de carga, electrolinera, estación |
| stall | **poste de recarga** (pl. postes de recarga); **poste** where space is tight | puesto, conector, stall, punto |
| plug type, connector | **tipo de conector**, **conector** | enchufe, clavija |
| outlet | **toma** | |
| charging network | **red de carga** (pl. redes de carga); bare **red** in short labels | red de cargadores, operador |
| internet connection | **conexión a internet** | conexión de internet, red |
| charge card | **tarjeta de carga** | |
| charge (one session) | **carga**; "sesión de carga" when ambiguous | recarga |
| charging, to charge | **carga**, **cargar**; status **Cargando** | recargar |
| charge stop | **parada de carga** | |
| stop | **parada** | escala, detención |
| waypoint | **punto de ruta** | punto intermedio, punto de paso, parada |
| route plan (noun) | **ruta** (pl. rutas); "ver ruta" for viewing the whole plan | plan, trayecto |
| to plan (a route) | **planificar**, or "calcular ruta" where natural | planear |
| plan (subscription, payment) | **plan** (pl. planes), only in this sense | |
| amenity (nearby place) | **servicio** | equipamiento, comodidad |
| amenity (charger attributes) | **servicios** | equipamiento |
| vehicle | **vehículo** where English says vehicle | coche, auto, carro |
| car | **coche** where English says car | vehículo, auto, carro |
| car battery | **batería** (phone: "batería del teléfono") | pila |
| SoC | **SoC**; spelled out: **estado de carga (SoC)** | nivel de carga |
| battery degradation | **degradación de la batería** | |
| phone | **teléfono** | móvil, smartphone, celular |
| dongle, OBD adapter | **dongle**, **adaptador OBD** (mirror English) | OBD-adapter |
| user | **usuario** | |
| subscription | **suscripción** | membresía |
| membership (charger) | **membresía** | |
| live data | **datos en directo** | datos en vivo, datos en tiempo real, Live data |
| live data sharing | **compartición de datos en directo**, **grupo de datos en directo** | |
| real-time (traffic, weather) | **en tiempo real** | |
| sign in, log in | **iniciar sesión**, **inicio de sesión** | acceder, entrar, loguearse |
| register (a device) | **registrar** | |
| connect | **conectar** | |
| link (account, token, vehicle) | **vincular**, **desvincular** | enlazar, asociar |
| link (URL) | **enlace** | link |
| trip, journey | **viaje** | |
| drive (recorded trip) | **trayecto** | conducción, viaje |
| driving (activity) | **conducción** | |
| settings | **ajustes**; "configuración" = configuration, OS settings | configuración for ABRP settings |
| plan settings, plan options | **ajustes de la ruta**, **opciones de la ruta** | ajustes del plan |
| speed limit | **límite de velocidad** | |
| maximum speed | **velocidad máxima** | |
| bookmark | **marcador** | favorito |
| report (an issue) | **informar de**, **informe** | reportar, reporte |
| button | **botón** | button |
| feature (product capability) | **funcionalidad** (pl. funcionalidades); "función" only for a function or operation, and in "en función de" | función, feature, característica |
| charger features (charger attributes) | **características de cargadores** | |
| supported (officially, by ABRP, a vehicle or an integration) | **soportado**, **soportada** ("Vehículos soportados", "Funcionalidades soportadas") | compatible |
| compatible (physical or electrical fit: plug types, adapters) | **compatible** | soportado |
| recenter (map) | **centrar** ("Centrar mapa") | recentrar, volver a centrar |
| app | **app** ("aplicación" in long sentences) | |
| photo | **foto** | imagen (unless English says image) |
| unit system labels (`imperial`, `british`) | **Imperial**, **Británico** | US, UK, EE. UU., R. U. |

## Conventions

- Quotes: **«…»** (no inner space). Placeholders stay inside.
- Opening `¿` and `¡` always; no exclamation marks beyond the English.
- No spaced hyphen or dash as punctuation: use a comma, colon or full stop.
- Sentence case in titles and buttons ("Editar ruta guardada", not "Editar Ruta Guardada").
- Percent and units as the file has them: `{{soc}}%`, `5 min`, `30 km/h`.
- Mirror English terminal punctuation. Ellipsis as `...` where English uses it.
- Compass letters N, E, S, **O** (oeste).
- Brand names stay as written; feature names are translated ("funcionalidad Premium").
- No English leftovers: Feature, Live data, OBD-adapter, Stalls, Upgrade.
- `premium_option_payment_desription`: "luego {{price}} cada {{duration}}" (works with año and mes).
- `amenity_stop`: "Parada de {{category}}".
- "Real-time live data" is «Datos en tiempo real», not a doubled «datos en directo en tiempo real».
- A quoted UI label matches that label exactly («Guardar mi actividad»).

## To be confirmed

Open points. Once agreed, move each into the table or conventions above.

Term choices:

- **trayecto** for a recorded drive, rather than conducción or viaje?
- **servicios** for both amenity concepts, or "instalaciones" for charger attributes?
- **ajustes** for ABRP settings, keeping "configuración" for configuration and OS settings?

Register and style:

- **«»** as the quote style (the file had no clear majority)?
- About 110 app to user strings still use tú. Should they also move to usted, or only when edited?
- Do the usted groups end in sensible places?
- `high_speed_factor`, `low_speed_factor`: `{{speed}}%` without a space, although English has one?

Individual strings:

- `sleep` «Dormir» and `shopping` «Comprar» unchanged, read as amenity category labels?
- `link` «Vincular»; `maybe` «No lo sé»?
- `next_step` «Siguiente parada»; `firmware_version` «Versión de software»?
- `upgrade` «Mejorar» (short enough for the button)?
- `driving_orientation` «Orientación de conducción»; `driving_v2_share_live_drive*` «trayecto en directo»?
- `share_final_destination_only` in lower case; `order_device_here` «¡Encargue uno aquí!»?
- `obdble_setup_warning_body` and `obdble_unsupported_device_body` wording?
- `drive` unchanged; «móvil» kept where it means cellular; `table_heading` "Waypoint" as «Parada» (the column lists every stop)?
