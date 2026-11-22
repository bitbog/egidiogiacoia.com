/* ============================================================================
   DATI — PROGETTI DI PROGETTAZIONE CAD, SCANSIONE 3D & STAMPA 3D
   ============================================================================
   Aggiungendo un nuovo progetto all'array `progettiStampa3d`, la pagina
   `/portfolio/stampa-3d` genera in automatico la relativa card con viewer 3D
   interattivo, specifiche tecniche e dati strutturati Schema.org.
   ============================================================================ */

export interface ProgettoStampa3d {
  id: string;
  titolo: string;
  categoria: string;
  tecnica: string;
  dimensioni: string;
  coloreFilamento: string;
  materialeLabel: string;
  descrizione: string;
  /** Percorso del modello .glb dentro `public/` (senza slash iniziale) */
  modelSrc: string;
  featured?: boolean;
  camera?: {
    theta: number;
    phi: number;
    distance?: number;
  };
}

export const progettiStampa3d: ProgettoStampa3d[] = [
  {
    id: 'monte-alpi',
    titolo: 'Rilievo 3D Monte Alpi — Castelsaraceno',
    categoria: 'Territorio & Rilievi 3D',
    tecnica: 'Scansione satellitare & Stampa 3D',
    dimensioni: '150 × 150 × 38 mm',
    coloreFilamento: '#c9c5bc',
    materialeLabel: 'PLA Matte Pietra',
    modelSrc: 'models/monte-alpi.glb',
    camera: { theta: 0.65, phi: 0.92, distance: 3.1 },
    descrizione:
      "Modello topografico in stampa 3D ricavato dalla scansione satellitare del Monte Alpi di Castelsaraceno, in Basilicata. Un oggetto d'arredo su misura pensato per chi è legato al territorio e desidera portare con sé un ricordo autentico delle proprie radici anche vivendo lontano."
  },
  {
    id: 'bomboniera',
    titolo: 'Bomboniera 3D da Scansione del Volto',
    categoria: 'Scansione 3D & Eventi',
    tecnica: 'Scansione 3D & Stampa 3D',
    dimensioni: '29 × 17 × 26 mm',
    coloreFilamento: '#ded7ca',
    materialeLabel: 'PLA Matte Avorio',
    modelSrc: 'models/bomboniera.glb',
    camera: { theta: 0.32, phi: 1.42, distance: 3.1 },
    descrizione:
      'Bomboniera personalizzata realizzata a partire dalla scansione 3D reale del volto del festeggiato. Dalla rilevazione digitale alla manifattura additiva, un oggetto unico e curato nei dettagli per eventi, lauree e ricorrenze speciali.'
  },
  {
    id: 'i-suoni-del-sirino',
    titolo: 'Portachiavi "I Suoni del Sirino"',
    categoria: 'Merchandising & Band',
    tecnica: 'Modellazione CAD & Stampa 3D',
    dimensioni: '60 × 30 × 3 mm',
    coloreFilamento: '#a65a44',
    materialeLabel: 'PLA Matte Terracotta',
    modelSrc: 'models/i-suoni-del-sirino.glb',
    camera: { theta: 0.2, phi: 1.48, distance: 2.9 },
    descrizione:
      "Portachiavi personalizzato progettato in CAD 3D e realizzato come gadget e merchandising ufficiale per la band I Suoni del Sirino. Leggero, resistente e con lettering in rilievo per rafforzare l'identità del gruppo durante concerti ed eventi live."
  },
  {
    id: 'ndu-chill',
    titolo: 'Portachiavi "Ndu Chill"',
    categoria: 'Accessori & Design 3D',
    tecnica: 'Modellazione CAD & Stampa 3D',
    dimensioni: '40 × 44 × 3 mm',
    coloreFilamento: '#2a7b82',
    materialeLabel: 'PLA Matte Ottanio',
    modelSrc: 'models/ndu-chill.glb',
    camera: { theta: 0.22, phi: 1.46, distance: 3.1 },
    descrizione:
      'Portachiavi personalizzato in stampa 3D dal carattere ironico e contemporaneo, ideale per chi vuole far notare di essere sempre «nel chill». Compatto e versatile, perfetto da agganciare a chiavi, borse o zaini.'
  }
];

export interface FotoStampa3d {
  src: string;
  titolo: string;
  cap: string;
  alt: string;
  w: number;
  h: number;
  tag: string;
  objectPosition?: string;
}

export const fotoStampa3d: FotoStampa3d[] = [
  {
    src: '/img/portfolio/stampa3d-monte-alpi.webp',
    titolo: 'Rilievo 3D Monte Alpi su base',
    tag: 'Rilievo Topografico',
    cap: 'Rilievo 3D del Monte Alpi di Castelsaraceno stampato in PLA bianco opaco su base marrone',
    alt: 'Rilievo topografico del Monte Alpi di Castelsaraceno stampato in 3D in PLA bianco su base d’appoggio — Egidio Giacoia Basilicata',
    w: 900,
    h: 1600,
    objectPosition: 'center 45%'
  },
  {
    src: '/img/portfolio/stampa3d-monte-alpi-dettaglio.webp',
    titolo: 'Dettaglio macro curve di livello',
    tag: 'Manifattura Additiva',
    cap: 'Dettaglio ravvicinato delle curve di livello e dei layer di stampa 3D sul Monte Alpi',
    alt: 'Dettaglio macro delle curve di livello del Monte Alpi stampato in 3D a Castelsaraceno',
    w: 900,
    h: 1600,
    objectPosition: 'center 42%'
  },
  {
    src: '/img/portfolio/stampa3d-portachiavi-nfc.webp',
    titolo: 'Portachiavi personalizzati con tag NFC',
    tag: 'Smart NFC · Gadget',
    cap: 'Portachiavi colorati stampati in 3D con tag NFC integrato e pattern interni a vista',
    alt: 'Portachiavi colorati stampati in 3D con tag NFC integrato e personalizzazione logo — stampa 3D Basilicata',
    w: 900,
    h: 1600,
    objectPosition: 'center 44%'
  },
  {
    src: '/img/portfolio/stampa3d-luna-luminosa.webp',
    titolo: 'Lampada Luna luminosa da arredo',
    tag: 'Arredo & Litofania 3D',
    cap: 'Lampada sferica Luna luminosa stampata in 3D in litofania con base d’appoggio',
    alt: 'Lampada Luna luminosa da arredo stampata in 3D con texture superficiale lunare in litofania',
    w: 900,
    h: 1600,
    objectPosition: 'center 62%'
  }
];

/*
// TEMPLATE PER AGGIUNGERE NUOVI PROGETTI 3D:
{
  id: 'nome-slug',
  titolo: 'Nome del Progetto',
  categoria: 'Categoria',
  tecnica: 'Modellazione CAD & Stampa 3D',
  dimensioni: '50 × 30 × 4 mm',
  coloreFilamento: '#2a7b82',
  materialeLabel: 'PLA Matte',
  modelSrc: 'models/nome-modello.glb',
  camera: { theta: 0.3, phi: 1.4, distance: 3.0 },
  descrizione: 'Descrizione SEO del progetto stampato in 3D.'
}
*/
