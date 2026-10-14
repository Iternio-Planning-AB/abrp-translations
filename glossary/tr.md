# Turkish glossary (`tr.json`)

Read [`concepts.md`](concepts.md) first for what the English terms mean. This file fixes the Turkish
term for each concept, plus register and writing conventions.

## Register

Formal **siz** throughout; *sen* strings are outliers to fix.

- Full sentences: siz-imperative and siz-possessive ("Lütfen internet bağlantınızı kontrol edin").
- Buttons, menu items, toggles: bare verb stem or noun phrase ("Kaydet", "Tekrar dene",
  "Giriş yap", "Daha fazla göster", "İptal"), not "Kaydedin".
- Input placeholders and prompt titles may use the siz-imperative ("Dilinizi seçin").
- In-progress status: "Yükleniyor", "Bağlanıyor...", never a bare stem ("Yükle").
- Speaker: **biz** where English says "we" ("Planınızı hesaplayamadık"); keep "ABRP" as the
  subject only where English does.
- `direction_*` strings and the spoken distance words are left unchanged.

## Terms

| English | Use | Avoid |
| --- | --- | --- |
| charger, charging station (site) | **şarj cihazı** | şarj aleti, şarj noktası |
| stall | **şarj noktası** | yer, durak, Stall |
| plug type, connector | **soket türü**, **soket** | konnektör, fiş |
| outlet | **priz** | |
| charging network | **şarj ağı**, short **ağ** | şebeke, network |
| internet connection | **internet bağlantısı** | ağ |
| charge card | **şarj kartı** | |
| charge (one session) | **şarj** ("{{count}} şarj") | |
| charging, to charge | **şarj**, **şarj etmek**; status **Şarj oluyor** | şarj aleti |
| charge stop | **şarj durağı** | şarj duraklaması |
| stop | **durak** ("Durak ekle") | duraklama, "Durağa ekle" |
| waypoint | **ara nokta** | waypoint, rota noktası |
| amenity (nearby place) | **tesis** | olanak, imkan |
| amenity (charger attributes) | **olanaklar** | tesis |
| vehicle, car | **araç** | araba |
| car battery | **batarya** | pil, akü (akü only for the 12 V battery) |
| phone battery | **pil** ("Pil optimizasyonu") | batarya |
| SoC | **şarj durumu**; first mention in descriptions **şarj durumu (SoC)**; short labels **SoC** | SOC, pil seviyesi, şarj seviyesi |
| battery degradation | **batarya yıpranması** | bozulma, bozunma |
| phone | **telefon** | cihaz (unless English says device) |
| dongle, OBD adapter | **adaptör** ("OBD adaptörü") | dongle, adapter, donanım kilidi |
| user | **kullanıcı** | |
| subscription | **abonelik** | üyelik |
| membership (charger) | **üyelik** | |
| live data | **canlı veri** | gerçek zamanlı veri |
| sign in, log in | **giriş yap**, **giriş** | oturum aç |
| register (a device, token) | **kaydet**, **kaydedildi** | |
| connect | **bağla**, **bağlan**, **bağlantı** | Connect |
| link (account, vehicle, token) | **bağla** (relink: **yeniden bağla**) | ilişkilendir |
| trip, journey | **yolculuk** | seyahat |
| drive (recorded trip) | **sürüş** | |
| distance | **mesafe** | uzaklık |
| speed limit | **hız sınırı** | sürat limiti, hız limiti |
| button | **düğme** | buton |
| feature | **özellik** | Feature |
| settings, preferences | **ayarlar**, **tercihler** | |
| photo, image | **fotoğraf**, **görsel** | resim |
| activity (log) | **etkinlik** | aktivite |
| cancel | **İptal** | |
| `current` | **Akım** | Mevcut |
| unit system labels (`imperial`, `british`) | **US**, **UK**, as in English | ABD, BK, İmparatorluk, Britanyalı |

## Conventions

- Quotes: **“…”**. Placeholders stay inside.
- No spaced hyphen or dash as punctuation: use a comma or a full stop. Ranges without spaces
  ("0-50").
- Percent with a placeholder is a **suffix**, `{{soc}}%`: the app formats most percentages as
  "80%", so a prefix would mix both orders on one screen. Literal numbers in prose may keep the
  Turkish order ("%15'ten").
- No case suffix on a placeholder (`{{deviceName}}'nin`, `{{x}}'a`): vowel harmony cannot be right
  for every value. Put the suffix on a fixed noun after it ("{{deviceName}} cihazınızın",
  "{{brand}} markasının") or use a form without a suffix ("Hedef: {{x}}%").
- Apostrophe before a suffix on names and abbreviations: "ABRP'ye", "Tesla'nızda",
  "SSS'lerimizi". Never on common nouns ("her yıl'de" is wrong).
- Postpositions follow the noun: "Tesla ile". The noun stays singular after a number
  ("{{count}} şarj noktası").
- Mirror English terminal punctuation. Ellipsis as `...` where English uses it.
- Compass letters: K, D, G, B.
- `premium_option_payment_desription`: "ardından her {{duration}} {{price}}".
- `live_data_sharing_plan_description`: `{{with_vehicleName}}` already contains the word for
  "with"; do not add another "ile" around it.

## To be confirmed

Proposals that need a native speaker's view. Once agreed, move them above.

- Site: keep **şarj cihazı** (most used), or the more precise **şarj istasyonu**? Stall: **şarj noktası**?
- Charge stop: **şarj durağı** (matches durak and "{{category}} durağı") over "şarj duraklaması"?
- Amenity: **tesis** for nearby places and **olanaklar** for charger attributes, instead of olanak for both?
- Trip: **yolculuk** over seyahat?
- Degradation: **batarya yıpranması** over bozulma or bozunma?
- OBD dongle: **adaptör**, also for the ABRP OBD product?
- Quotes **“…”**?
- Percent: switch placeholders to the prefix `%{{x}}` once the app formats percentages the
  Turkish way?
- `to`: shown as "→" (plan title "A → B", "20% → 80%", date ranges), since the app cannot add the
  suffix Turkish needs ("%80'e kadar"). Acceptable?
- `From`, `To`: "Nereden", "Nereye" read wrong on date ranges. Better wording?
- Firmware: "ürün yazılımı" or "Firmware"? Access token: "erişim belirteci" or "token"?
- `tesla_fleet_streaming_toggle`: is "Ayarlar->Güvenlik" Tesla's Turkish menu path?
- `obd_firmware_error_weak_power`: "akü" for the 12 V battery?
- Short labels: `find_chargers_min_stalls_any` "Fark etmez", `done` "Bitti", `read_faq`
  "SSS'lerimizi oku", `amenity_form_timing` "Mola ver", `amenities` "Tesisler",
  `details_page_marker` "İşaretlenen nokta", `tts_options` "Navigasyon sesi",
  `driving_v2_charge_rate_prompt` "Puanla", `driving_v2_sheet_label` "Alt panel".
- `live_data_sharing_plan_description` reads awkwardly (name after "with"). Better phrasing?
- `ferries`: keep the set phrase "araba trenleri" despite araç for vehicle?
