# AnsattPortalen – CAROB AS

## Om prosjektet

Dette er et skoleprosjekt laget av **Carmen Maria Kleijnen** og **Robin Finnestad** som en del av YFF (Yrkesfaglig fordypning) på IKT-linjen.

Prosjektet går ut på å designe og utvikle en intern ansattportal for den fiktive bedriften **CAROB AS**. Portalen fungerer som et sentralt knutepunkt for ansatte, med fokus på:

- **IT-brukerstøtte** – steg-for-steg veiledning for vanlige IT-problemer (passord, VPN, printer, Teams, PC og mobil)
- **HMS-lovverk** – informasjon om Arbeidsmiljøloven, internkontrollforskriften, GDPR og varslingsplikten
- **IT-utstyr og systemer** – oversikt over PC, mobil, Microsoft 365, Visma og andre systemer ansatte bruker

Nettsiden hostes på egen server (Robin sin homelab / Proxmox) under eget domene.

## Hva vi vurderes på

> **Merk:** Selve koden er ikke det vi vurderes på i dette prosjektet.

Vi vurderes primært på:

- **Faglig innhold** – kvaliteten og relevansen av informasjonen på portalen
- **Drifting av webserver** – DNS, domene, reverse proxy og webserverkonfigurasjon
- **Brukerstøtte** – hvordan vi har strukturert IT-hjelp og ressurser for sluttbrukere

Koden er vibecoded med AI-hjelp for å spare tid, slik at vi kan fokusere på det vi faktisk skal vurderes på.

## Teknologi

- Ren HTML og CSS (ingen rammeverk)
- Delt stilark (`styles.css`) brukt på alle sider
- WCAG 2.1 AA-kompatibel (universell utforming)
- Hostet på Apache/Nginx via Proxmox

## Sider

| Side | Innhold |
|------|---------|
| `index.html` | Forside med oversikt og driftsstatus |
| `it-support.html` | IT-brukerstøtte og feilsøking |
| `hms.html` | HMS-lovverk og avviksvarsling |
| `rutiner.html` | IT-utstyr, systemer og programvare |

## Kompetansemål

- Gjennomføre opplæring og veiledning i relevante IT-løsninger
- Gjøre rede for gjeldende lover og regler i arbeidslivet
- Utforske og bruke metoder for feilsøking og dokumentere løsninger
- Gjøre rede for krav til et likeverdig og inkluderende yrkesfellesskap

---

*Prosjektfrist: 19. mai 2025*
