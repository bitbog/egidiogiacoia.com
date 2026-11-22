/* ============================================================================
   DATI UNIFICATI — BRAND, TURISMO & SVILUPPO WEB
   ============================================================================
   Aggiungendo un nuovo progetto all'array `progettiBrandTurismo` Astro genera
   IN AUTOMATICO:
   1. La card grande cliccabile in `/portfolio/brand-turismo`
   2. La pagina caso studio dedicata in `/portfolio/brand-turismo/<id>`
   3. I badge servizi, i filtri e il riepilogo media

   In fondo all'array trovi un blocco commentato pronto da copiare e incollare.
   ============================================================================ */

export interface MediaItem {
  cap: string;
  alt: string;
  src: string; // Es. '/img/portfolio/nome-foto.webp' (lascia '' per riquadro segnaposto)
  w?: number;
  h?: number;
  wide?: boolean;
}

export interface Stampa3dItem {
  title: string;
  category: string;      // Es. 'Ospitalità & B&B', 'Espositore QR / NFC'
  material?: string;     // Es. 'PLA Matte / PETG'
  desc: string;
  deliverables: string[];
  imgSrc?: string;       // Es. '/img/portfolio/stampa3d-esempio.webp'
  imgAlt?: string;
  w?: number;
  h?: number;
}

export interface SitoWebItem {
  dominio: string;
  url?: string;          // Lascia undefined o '' se il sito è ancora in lavorazione
  stato: 'Online' | 'In lavorazione';
  etichetta?: string;
  titolo?: string;
  descrizione: string;
  screenshot?: string;   // Es. '/img/portfolio/screenshot-inroad.webp'
  screenshotW?: number;
  screenshotH?: number;
  caratteristiche: string[];
  pacchettoDettagli?: { title: string; desc: string }[];
}

export interface ProjectCover {
  src: string;
  alt: string;
  w?: number;
  h?: number;
  objectPosition?: string;
  isBrowserMockup?: boolean;
}

export interface ProgettoPortfolio {
  id: string;            // Slug URL della pagina di dettaglio (/portfolio/brand-turismo/<id>)
  localita: string;
  titolo: string;
  titoloBreve?: string;  // Usato nei collegamenti Precedente / Successivo e nei breadcrumb
  riassuntoCard: string; // 1-2 frasi mostrate nella card principale
  sottotitolo?: string;  // Introduzione nella pagina di dettaglio
  seoDescription?: string;
  cover: ProjectCover;
  badgeCustom?: string[]; // Es. ['Rebrand']
  fotoLabel?: string;
  stampa3dLabel?: string;
  graficaLabel?: string;
  caseStudy?: {
    tag?: string;
    obiettivo: string;
    soluzione: string;
    risultato?: string;
  };
  testimonianza?: {
    testo: string;
    autore: string;
    ruolo?: string;
  };
  sitoWeb?: SitoWebItem;
  foto?: MediaItem[];
  stampa3d?: Stampa3dItem[];
  grafiche?: MediaItem[];
}

export const progettiBrandTurismo: ProgettoPortfolio[] = [
  // --------------------------------------------------------------------------
  // 1. VISIT CASTELSARACENO
  // --------------------------------------------------------------------------
  {
    id: 'visit-castelsaraceno',
    localita: 'Castelsaraceno (PZ) · Parco del Pollino e Raparo',
    titolo: 'Visit Castelsaraceno — Destinazione Turistica',
    titoloBreve: 'Visit Castelsaraceno',
    riassuntoCard:
      'Fotografia territoriale, outdoor e materiali grafici coordinati per raccontare il borgo e le esperienze tra Parco del Pollino e Raparo.',
    sottotitolo:
      'Un racconto visivo completo tra borgo, montagna, esperienze outdoor e materiali promozionali per valorizzare la destinazione turistica in ogni stagione.',
    seoDescription:
      'Caso studio Visit Castelsaraceno: fotografia turistica, escursioni outdoor e grafiche promozionali realizzate da Egidio Giacoia in Basilicata.',
    cover: {
      src: '/img/portfolio/vista-panoramica-castelsaraceno.webp',
      alt: 'Vista panoramica di Castelsaraceno in Basilicata — fotografia turistica di Egidio Giacoia',
      w: 1600,
      h: 644,
      objectPosition: '60% center'
    },
    fotoLabel: 'Fotografia Territorio',
    graficaLabel: 'Grafica & Promo',
    caseStudy: {
      tag: 'Caso in evidenza',
      obiettivo:
        "Aumentare la visibilità online e l'attrattività turistica del borgo, con contenuti coordinati per canali social, web e materiale promozionale.",
      soluzione:
        'Shooting fotografici su paesaggio, esperienze outdoor e dettagli del borgo, affiancati da grafiche e materiali promozionali per campagne ed eventi.'
    },
    foto: [
      { cap: 'Vista panoramica di Castelsaraceno', alt: 'Vista panoramica di Castelsaraceno in Basilicata — fotografia turistica di Egidio Giacoia', src: '/img/portfolio/vista-panoramica-castelsaraceno.webp', w: 1600, h: 644, wide: true },
      { cap: 'Bosco Favino', alt: 'Bosco Favino a Castelsaraceno nel Parco del Pollino, Basilicata', src: '/img/portfolio/bosco-favino.webp', w: 600, h: 800 },
      { cap: 'Castelsaraceno di notte', alt: 'Castelsaraceno di notte, fotografia notturna di borgo in Basilicata', src: '/img/portfolio/castelsaraceno-di-notte.webp', w: 600, h: 450 },
      { cap: 'Ciaspole sul Monte Armizzone', alt: 'Escursione con le ciaspole sul Monte Armizzone a Castelsaraceno, Basilicata', src: '/img/portfolio/ciaspole-sul-monte-armizzone.webp', w: 600, h: 400 },
      { cap: 'Monte Armizzone al tramonto', alt: 'Tramonto sul Monte Armizzone in Basilicata', src: '/img/portfolio/monte-armizzone-al-tramonto.webp', w: 600, h: 900 },
      { cap: 'Pino Loricato', alt: 'Pino Loricato nel Parco Nazionale del Pollino, Basilicata', src: '/img/portfolio/pino-loricato.webp', w: 600, h: 450 },
      { cap: 'Ponte tra i Due Parchi', alt: 'Ponte Tibetano tra i Due Parchi a Castelsaraceno, Basilicata', src: '/img/portfolio/ponte-tra-i-due-parchi.webp', w: 600, h: 400 },
      { cap: 'Mountain bike al Bosco Favino', alt: 'Esperienza mountain bike e turismo outdoor al Bosco Favino in Basilicata', src: '/img/portfolio/mountain-bike-al-bosco-favino.webp', w: 600, h: 400 }
    ],
    grafiche: [
      { cap: 'Poster · Per Aspera ad Astra', alt: 'Locandina e grafica evento Per Aspera ad Astra a Castelsaraceno', src: '/img/portfolio/poster-per-aspera-ad-astra.webp', w: 600, h: 849 },
      { cap: 'Poster · Festa della Montagna 2022', alt: 'Poster grafico Festa della Montagna in Basilicata', src: '/img/portfolio/poster-festa-della-montagna-2022.webp', w: 600, h: 750 },
      { cap: 'Biglietto · Per Aspera ad Astra', alt: 'Biglietto e materiale promozionale evento culturale in Basilicata', src: '/img/portfolio/biglietto-per-aspera-ad-astra.webp', w: 600, h: 282 }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. INROAD | TOUR IN E-BIKE (GIOVANNI)
  // --------------------------------------------------------------------------
  {
    id: 'inroad-tour-ebike',
    localita: 'Basilicata · Turismo Attivo & Escursioni in E-Bike',
    titolo: 'inRoad | Tour in e-bike',
    titoloBreve: 'inRoad | Tour in e-bike',
    riassuntoCard:
      'Nuova identità visiva e sito web su misura, veloce e mobile-first per presentare i tour in e-bike in Basilicata e facilitare le prenotazioni.',
    sottotitolo:
      'Rebrand e sviluppo del sito web su misura per attività di escursioni e tour guidati in e-bike tra Castelsaraceno, Lauria e la Basilicata.',
    seoDescription:
      'Caso studio inRoad (inroad.it): rebrand grafico e sviluppo sito web mobile-first per escursioni in e-bike in Basilicata realizzato da Egidio Giacoia.',
    cover: {
      src: '/img/portfolio/screenshot-inroad.webp',
      alt: 'Anteprima sito web inroad.it — inRoad Tour in e-bike',
      w: 1200,
      h: 750,
      objectPosition: 'top',
      isBrowserMockup: true
    },
    badgeCustom: ['Rebrand'],
    caseStudy: {
      tag: 'Rebrand & Sviluppo Web',
      obiettivo:
        "Rinnovare l'identità visiva di inRoad e dare all'attività una vetrina digitale chiara e immediata per raccontare i tour guidati in e-bike sul territorio lucano.",
      soluzione:
        'Rebrand grafico completo e sviluppo del sito inroad.it con architettura leggera, design mobile-first, SEO locale e call-to-action dirette per le richieste di prenotazione.'
    },
    sitoWeb: {
      dominio: 'inroad.it',
      url: 'https://inroad.it',
      stato: 'Online',
      etichetta: 'Sito Web & Rebrand',
      titolo: 'inRoad | Tour in e-bike — inroad.it',
      descrizione:
        'Rifacimento dell’identità visiva e sviluppo del sito web per inRoad: una piattaforma veloce e mobile-first pensata per presentare i tour in e-bike, raccontare i percorsi sul territorio e semplificare le richieste di prenotazione.',
      screenshot: '/img/portfolio/screenshot-inroad.webp',
      screenshotW: 1200,
      screenshotH: 750,
      caratteristiche: ['Sviluppo Web Su Misura', 'Rebrand', 'Design Mobile-First', 'SEO Locale Basilicata']
    }
  },

  // --------------------------------------------------------------------------
  // 3. LEUKÒS B&B
  // --------------------------------------------------------------------------
  {
    id: 'leukos-bnb',
    localita: 'Basilicata · Hospitality & Strutture Ricettive',
    titolo: 'Leukòs B&B — Ospitalità & Struttura Ricettiva',
    titoloBreve: 'Leukòs B&B',
    riassuntoCard:
      'Servizio fotografico hospitality pensato per valorizzare camere, colazione e accoglienza della struttura ricettiva in Basilicata.',
    sottotitolo:
      'Servizio fotografico realizzato per valorizzare le camere, la colazione e le esperienze offerte dalla struttura ricettiva.',
    seoDescription:
      'Servizio fotografico hospitality per Leukòs B&B in Basilicata: interni camere, dettagli colazione ed esperienze sul territorio.',
    cover: {
      src: '/img/portfolio/camera-matrimoniale.webp',
      alt: 'Camera matrimoniale Leukòs B&B in Basilicata',
      w: 600,
      h: 400,
      objectPosition: 'center'
    },
    fotoLabel: 'Fotografia Hospitality',
    caseStudy: {
      tag: 'Fotografia Hospitality',
      obiettivo:
        'Presentare la struttura ricettiva in modo luminoso, curato e accogliente su sito web, portali di prenotazione e canali social.',
      soluzione:
        'Shooting fotografico dedicato agli ambienti interni, alla colazione e alle esperienze legate al soggiorno, con attenzione a luce naturale e coerenza cromatica.'
    },
    foto: [
      { cap: 'Camera matrimoniale', alt: 'Fotografia interni camera matrimoniale per Leukòs B&B in Basilicata', src: '/img/portfolio/camera-matrimoniale.webp', w: 600, h: 400 },
      { cap: 'Dettaglio sulla colazione', alt: 'Fotografia colazione e dettagli ospitalità per B&B in Basilicata', src: '/img/portfolio/dettaglio-sulla-colazione.webp', w: 600, h: 400 },
      { cap: 'Esterni ed esperienze', alt: 'Fotografia esterni ed esperienze ricettive per Leukòs B&B', src: '/img/portfolio/esterni-ed-esperienze.webp', w: 600, h: 400 }
    ]
  },

  // --------------------------------------------------------------------------
  // 4. A CASA DI CARLA
  // --------------------------------------------------------------------------
  {
    id: 'a-casa-di-carla',
    localita: 'Basilicata · Hospitality & Interni',
    titolo: 'A casa di Carla — Ospitalità & Dettagli',
    titoloBreve: 'A casa di Carla',
    riassuntoCard:
      "Racconto fotografico degli interni, della tavola e dei dettagli stagionali per trasmettere calore e cura dell'ospitalità.",
    sottotitolo:
      "Servizio fotografico dedicato agli ambienti interni, alla cura dei dettagli e all'atmosfera stagionale della struttura.",
    seoDescription:
      'Servizio fotografico interni e hospitality per A casa di Carla in Basilicata: cucina, allestimenti autunnali e tavola per la colazione.',
    cover: {
      src: '/img/portfolio/tavola-per-la-colazione.webp',
      alt: 'Tavola per la colazione — A casa di Carla in Basilicata',
      w: 600,
      h: 400,
      objectPosition: 'center'
    },
    fotoLabel: 'Fotografia Interni & Hospitality',
    caseStudy: {
      tag: 'Interni & Atmosfera',
      obiettivo:
        "Trasmettere il calore domestico e la cura estetica della struttura attraverso immagini coerenti e d'impatto.",
      soluzione:
        "Servizio fotografico focalizzato su interni, allestimenti stagionali e dettagli della colazione, studiato per valorizzare l'atmosfera unica della casa."
    },
    // Per attivare un Sito Web o la Stampa 3D anche per A casa di Carla, scommenta qui sotto:
    /*
    sitoWeb: {
      dominio: 'acasadicarla.it',
      url: 'https://...',
      stato: 'Online',
      descrizione: 'Sito vetrina e presentazione della struttura.',
      caratteristiche: ['Design Responsive', 'SEO Locale']
    },
    stampa3d: [
      {
        title: 'Portachiavi camera & targhetta Wi-Fi',
        category: 'Ospitalità & B&B',
        material: 'PLA Matte',
        desc: 'Oggetti su misura progettati in CAD e stampati in 3D con il logo della struttura.',
        deliverables: ['Modellazione CAD', 'Stampa 3D bicolore']
      }
    ],
    */
    foto: [
      { cap: 'Dettaglio sulla cucina', alt: 'Fotografia interni cucina per A casa di Carla in Basilicata', src: '/img/portfolio/dettaglio-sulla-cucina.webp', w: 600, h: 400 },
      { cap: "Arredamento d'autunno", alt: 'Fotografia arredamento e atmosfera struttura ricettiva in Basilicata', src: '/img/portfolio/arredamento-d-autunno.webp', w: 600, h: 400 },
      { cap: 'Tavola per la colazione', alt: 'Fotografia tavola colazione per ospitalità in Basilicata', src: '/img/portfolio/tavola-per-la-colazione.webp', w: 600, h: 400 }
    ]
  }

  /* ==========================================================================
     COPIA E INCOLLA QUI PER AGGIUNGERE UNA NUOVA ATTIVITÀ / CLIENTE:
     ==========================================================================
  ,{
    id: 'nome-attivita',
    localita: 'Potenza · Settore',
    titolo: 'Nome Attività — Descrizione breve',
    titoloBreve: 'Nome Attività',
    riassuntoCard: 'Una o due frasi per la card nella pagina principale.',
    sottotitolo: 'Introduzione completa nella pagina dedicata al progetto.',
    cover: {
      src: '/img/portfolio/nome-copertina.webp',
      alt: 'Descrizione immagine di copertina',
      w: 1200,
      h: 750,
      objectPosition: 'center', // Usa 'top' e isBrowserMockup: true per gli screenshot di siti web
      isBrowserMockup: false
    },
    caseStudy: {
      tag: 'Caso studio',
      obiettivo: 'Cosa voleva ottenere il cliente.',
      soluzione: 'Come abbiamo lavorato tra fotografia, sito web e stampa 3D.',
      risultato: 'Risultato concreto ottenuto (opzionale).'
    },
    testimonianza: {
      testo: 'Citazione breve del cliente soddisfatto.',
      autore: 'Nome Cliente',
      ruolo: 'Titolare · Nome Attività'
    },
    sitoWeb: {
      dominio: 'esempio.it',
      url: 'https://esempio.it',
      stato: 'Online', // oppure 'In lavorazione'
      descrizione: 'Descrizione del sito web sviluppato.',
      screenshot: '/img/portfolio/screenshot-esempio.webp',
      screenshotW: 1200,
      screenshotH: 750,
      caratteristiche: ['Design Responsive', 'SEO Locale Basilicata']
    },
    stampa3d: [
      {
        title: 'Espositore QR Code da banco',
        category: 'Ospitalità & B&B',
        material: 'PLA Matte',
        desc: 'Supporto su misura progettato in CAD e stampato in 3D con collegamento diretto al sito web.',
        deliverables: ['Modellazione CAD', 'Stampa 3D', 'QR / NFC integrato'],
        imgSrc: '/img/portfolio/stampa3d-esempio.webp',
        imgAlt: 'Espositore QR Code stampato in 3D per B&B',
        w: 800,
        h: 600
      }
    ],
    foto: [
      { cap: 'Didascalia scatto', alt: 'Descrizione SEO in Basilicata', src: '/img/portfolio/nome-foto.webp', w: 600, h: 400 }
    ]
  }
  */
];

/** Calcola automaticamente i filtri attivi (`data-services`) di ogni progetto. */
export const getProjectServices = (p: ProgettoPortfolio): string[] => {
  const services: string[] = [];
  if (p.foto && p.foto.length > 0) services.push('foto');
  if (p.sitoWeb) services.push('web');
  if (p.stampa3d && p.stampa3d.length > 0) services.push('stampa3d');
  if (p.grafiche && p.grafiche.length > 0) services.push('grafica');
  return services;
};

/** Calcola automaticamente i badge servizi mostrati sulle card e nelle pagine di dettaglio. */
export const getProjectBadges = (p: ProgettoPortfolio): string[] => {
  const badges: string[] = [];
  if (p.sitoWeb) {
    badges.push(p.sitoWeb.stato === 'In lavorazione' ? 'Sito Web (In corso)' : 'Sito Web');
  }
  if (p.foto && p.foto.length > 0) {
    badges.push(p.fotoLabel || 'Fotografia');
  }
  if (p.stampa3d && p.stampa3d.length > 0) {
    badges.push(p.stampa3dLabel || 'Stampa 3D');
  }
  if (p.grafiche && p.grafiche.length > 0) {
    badges.push(p.graficaLabel || 'Grafica & Promo');
  }
  if (p.badgeCustom) {
    badges.push(...p.badgeCustom);
  }
  return badges;
};

/** Genera un riepilogo sintetico dei contenuti presenti dentro il progetto. */
export const getProjectMediaSummary = (p: ProgettoPortfolio): string => {
  const parts: string[] = [];
  if (p.sitoWeb) {
    parts.push(
      p.sitoWeb.stato === 'Online'
        ? `Sito live · ${p.sitoWeb.dominio}`
        : `Sito web · ${p.sitoWeb.dominio}`
    );
  }
  if (p.foto && p.foto.length > 0) {
    parts.push(`${p.foto.length} foto`);
  }
  if (p.stampa3d && p.stampa3d.length > 0) {
    parts.push(p.stampa3d.length === 1 ? '1 oggetto 3D' : `${p.stampa3d.length} oggetti 3D`);
  }
  if (p.grafiche && p.grafiche.length > 0) {
    parts.push(p.grafiche.length === 1 ? '1 grafica' : `${p.grafiche.length} grafiche`);
  }
  return parts.join(' · ');
};
