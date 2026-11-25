# Product

<!-- impeccable:product-schema 1 -->

Source note: "confirmed" marks the user's init answers. Everything else is recorded from the incumbent site (paths in Evidence on Hand) as evidence, not as separate user approval.

## Platform

web

## Users

Four audiences, with no single ranking (confirmed): warga and perantau of Puton, prospective visitors to Watu Ngelak, people seeking village administration (e.g. surat pengantar), and anyone wanting to know the place. Their jobs: learn where Padukuhan Puton is and who lives there; discover the Watu Ngelak story and plan a visit; find community groups and events; reach the dukuh for letters, tourism information, or participation.

## Product Purpose

A single public front door for Padukuhan Puton, a hamlet in Trimulyo, Jetis, Bantul, D.I. Yogyakarta. It presents the hamlet's profile, people and land (Kali Opak, sawah), the Watu Ngelak tourism story, a demographic snapshot, community groups, events, and a direct contact path. Success: a resident, diaspora member, visitor, or service-seeker can answer "where is Puton, who lives there, what is there to see, and how do I reach the dukuh" without asking someone directly.

## Positioning

A community-owned digital front door, not a commercial tourism board or government portal. It pairs everyday hamlet life (warga, sawah, Kali Opak, posyandu, KWT/PKK/Karang Taruna) with one specific cultural story (Watu Ngelak and Sultan Agung) and a direct line to the dukuh via WhatsApp. Perangkat padukuhan own the content (confirmed); the positioning itself derives from the current site.

## Operating Context

Padukuhan Puton is one of 12 padukuhan in Kalurahan Trimulyo, Kapanewon Jetis, Kabupaten Bantul, about 15 km south of Yogyakarta, with Kali Opak as its western boundary. The site is Indonesian-language (`lang="id"`, `id_ID`). Named community structures in the current copy: Kepala Dukuh Riwang Arumsasi, Pokgiat 2024–2029, 9 RT, KWT, PKK, Karang Taruna, Pokdarwis. The contact form composes a WhatsApp message; the agenda is dated and filtered by status. Site lives at `padukuhanputon.netlify.app` with Google site verification and GTM tags.

## Capabilities and Constraints

- Static single-page site: profile tabs (Tentang/Struktur/Peta), demographic infographic with count-up and percent toggle, Watu Ngelak story tabs, institution cards, gallery lightbox with keyboard/swipe, dated agenda with filters, FAQ accordion, WhatsApp contact form, mobile navigation, scroll progress, and reduced-motion handling.
- Confirmed constraint: the population figures (1.818 jiwa, 505 KK, 9 RT), demographic figures, event list, and the dukuh's WhatsApp number are placeholders awaiting official data from perangkat padukuhan. Future work must not present them as verified. The `WA` constant in `assets/js/main.js` is still empty.
- Confirmed open decision: no publishing workflow or update cadence for content has been established.
- GTM and Google site verification tags exist in the current site; preserve unless told otherwise.

## Brand Commitments

Name: Padukuhan Puton; alternate names in structured data: Puton, Desa Puton, Desa Wisata Puton Watu Ngelak. Language: Indonesian. Community motto in the current copy: "Puton Maton" (Mandiri, Agamis, Tangguh, Optimis, Nyaman). Photography carries CC BY-SA 3.0 attribution to Crisco 1492 and Cahyo Ramadhani (Wikimedia Commons) — a real obligation to preserve. No visual style, palette, or typography was declared binding by the user in init.

## Evidence on Hand

- Incumbent implementation: `index.html`, `assets/css/styles.css`, `assets/js/main.js`, `assets/img/`, `favicon.svg`, `sitemap.xml`, `robots.txt`.
- Real copy: the dukuh's sambutan signed Riwang Arumsasi, Watu Ngelak story, profile and structure lists, FAQ, agenda items.
- Real assets: three CC BY-SA 3.0 Wikimedia Commons photos with credited authors; inline SVG logo mark.
- Structured data: JSON-LD WebSite, AdministrativeArea, TouristAttraction.
- Absences future work must not fabricate: no official demographic dataset, no verified contact number, no confirmed testimonials, pricing, benchmarks, or official event calendar.

## Product Principles

1. Community-owned: content speaks as Puton's residents and officials, not as a tourism authority.
2. One story, many doors: Watu Ngelak is the hook, but residents, diaspora, visitors, and service-seekers are served without ranking.
3. Place before polish: accurate location, structure, and contact paths outrank embellishment.
4. Honest data: placeholder figures and contacts must be replaced with official values before being trusted.
5. Keep the language and its people: Indonesian voice with locally meaningful terms (padukuhan, dukuh, RT) preserved.
