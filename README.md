# Guida alla Gestione del Sito Personale

Questa guida ti spiega in modo semplice e dettagliato come caricare e aggiornare i contenuti nelle tre sezioni principali del tuo sito (**Diario**, **Now**, **Portfolio**). 

Tutto il sito è gestito tramite file **Markdown** e immagini locali. Non c'è un pannello amministrativo: ti basta creare o modificare i file sul tuo computer, fare il push su GitHub e il sito si aggiornerà da solo online.

---

## 🛠️ Regola Fondamentale per i Template (`_`)
In ogni cartella dei contenuti troverai dei file che iniziano con un trattino basso (es. `_template-diario.md`).
- **Non cancellare i file che iniziano con `_`**: sono i tuoi modelli di riferimento.
- **Ignorati dal sito**: i file che iniziano con `_` vengono ignorati automaticamente e non compariranno mai sul sito pubblico.
- **Como usarli**: duplica il file di template, rinomina la copia **rimuovendo** l'underscore iniziale (es. da `_template-diario.md` a `il-mio-primo-post.md`), e inserisci i tuoi testi.

---

## 🎨 Direzione Visiva & Design (Piano Grafico)
Il sito segue rigorosamente la direzione visiva e i requisiti estetici del **Piano Grafico**:
* **Tipografia**:
  * `Fraunces` per i titoli principali e la voce autoriale (Serif).
  * `Hanken Grotesk` per i testi lunghi, articoli e l'interfaccia (Sans-Serif).
  * `DM Mono` per metadati, date, e pulsanti (Monospaced).
* **Colori**: Una combinazione minimale basata sul "Verde-Teal" (`#16545A` su chiaro / `#74B6B2` su scuro) e neutri caldi color carta e inchiostro.
* **Tema Automatico**: Il sito si adatta automaticamente ed istantaneamente alle impostazioni del tema del tuo dispositivo (Chiaro/Scuro) senza pulsanti di commutazione manuale.
* **Effetti Interattivi (Home Page)**:
  * **Diario**: Dispone di un alone morbido retroilluminato che crea un effetto di profondità fluttuante.
  * **Now**: Dispone di un alone luminoso radiale che segue fluidamente i movimenti del cursore del mouse.
  * **Portfolio**: Un grande box centrato ed esteso per evidenziare la galleria.

---

## ✍️ Guida Sezione per Sezione

### 1. Diario (Blog)
Gli articoli del diario si trovano nella cartella: `src/content/diario/`

**Come creare un nuovo articolo:**
1. Apri la cartella `src/content/diario/`.
2. Duplica il file **`_template-diario.md`**.
3. Rinomina la copia in modo descrittivo, usando trattini al posto degli spazi (es. `viaggio-in-giappone.md`). *Attenzione a rimuovere l'underscore all'inizio!*
4. Modifica l'intestazione (frontmatter) compresa tra i trattini `---`:
   ```yaml
   title: "Il mio viaggio in Giappone"
   pubDate: 2026-05-20 # Formato obbligatorio: AAAA-MM-GG
   description: "Le mie riflessioni e scoperte durante due settimane a Tokyo." # Opzionale
   ```
5. Scrivi l'articolo sotto la riga di chiusura `---` usando la formattazione Markdown standard.

---

### 2. Now
La pagina Now rappresenta quello che stai facendo in questo momento della tua vita. Si trova nella cartella: `src/content/now/`

**Come aggiornare la pagina Now:**
Se non l'hai ancora configurata, segui questi passaggi per attivarla:
1. Apri la cartella `src/content/now/`.
2. Duplica il file **`_template-now.md`** e rinominalo esattamente in **`index.md`** (senza trattini o underscore).
3. Modifica la data di ultimo aggiornamento nell'intestazione:
   ```yaml
   lastUpdated: 2026-05-20 # Aggiornala ogni volta che fai modifiche!
   ```
4. Scrivi o modifica i paragrafi per le 5 sezioni tematiche predefinite:
   - **Cosa sto studiando**
   - **Progetti in corso**
   - **Cosa sto leggendo**
   - **A cosa sto giocando**
   - **Cosa ho ascoltato ultimamente**

---

### 3. Portfolio
La galleria e gli scatti fotografici si gestiscono nella cartella: `src/content/portfolio/`

**Come aggiungere una foto:**
1. Apri la cartella `src/content/portfolio/`.
2. Trascina la tua foto (es. `tramonto-colosseo.jpg`) all'interno di questa cartella. I formati supportati sono `.jpg`, `.jpeg`, `.png`, `.webp` e `.gif`.
3. Duplica il file **`_template-portfolio.md`** e rinominalo col nome del tuo post (es. `tramonto-colosseo.md`). *Attenzione a rimuovere l'underscore all'inizio!*
4. Modifica i metadati nell'intestazione del file Markdown:
   ```yaml
   title: "Tramonto sul Colosseo"
   pubDate: 2026-05-20 # Formato: AAAA-MM-GG
   cover: "./tramonto-colosseo.jpg" # Il nome esatto del file immagine che hai inserito
   location: "Roma, Italia" # Opzionale
   gear: "Leica M6, Summicron 35mm, Kodak Gold 200" # Opzionale
   ```
5. Scrivi la storia o i pensieri legati allo scatto sotto i metadati compresi tra i trattini `---`. Le immagini vengono elaborate e ottimizzate nativamente da Astro.

---

## 💻 Comandi Locali Utili (Terminale)

Se desideri testare il sito sul tuo computer prima di pubblicarlo, apri il terminale nella cartella del progetto ed esegui:

- **`npm install`** (solo la prima volta) per installare i componenti necessari.
- **`npm run dev`** per far partire il server di sviluppo. Apri il browser all'indirizzo `http://localhost:4321` per vedere le modifiche in tempo reale.
- **`npm run build`** per testare che il sito si compili senza errori.

---

## 💡 Buone Pratiche prima di Caricare Online

Prima di eseguire i comandi per inviare le modifiche su GitHub, ti consigliamo di seguire questa breve lista di controllo per evitare errori o rallentamenti:

1. **Riduci le dimensioni delle immagini**:
   - Cerca di non caricare foto grezze direttamente dalla fotocamera (che possono pesare 10MB o 20MB l'una).
   - Ridimensiona o comprimi leggermente le foto prima di metterle nella cartella (una larghezza di 1600px o 2000px è ideale e pesa meno di 1MB). Questo mantiene il caricamento del codice velocissimo.
2. **Usa nomi dei file puliti**:
   - Evita spazi, lettere accentate o caratteri speciali nei nomi delle immagini e dei file Markdown (es: usa `foto-colosseo.jpg` invece di `Foto Colosseo.jpg` o `foto-colossèo.jpg`).
3. **Controlla il prefisso `_`**:
   - Assicurati che i file che vuoi rendere **pubblici** non abbiano l'underscore all'inizio del nome.
   - Assicurati che i tuoi file di **template** abbiano sempre il prefisso `_` in modo che rimangano segreti.
4. **Verifica che i file siano salvati**:
   - Salva tutte le modifiche apportate nei file Markdown sul tuo editor (es. VS Code) prima di procedere.
5. **Esegui un test locale**:
   - È un'ottima abitudine lanciare `npm run dev` nel terminale e aprire `http://localhost:4321` nel browser per controllare visivamente che tutto sia formattato ed impaginato come desideri.
   - Puoi anche lanciare `npm run build` per verificare che non ci siano errori bloccanti nella compilazione di Astro.

---

## 🚀 Pubblicazione Online (GitHub Pages)

Ogni volta che hai finito di aggiungere o modificare articoli o foto, devi caricare le modifiche su GitHub. 

Apri il terminale nella cartella del progetto ed esegui in sequenza questi **tre comandi Git**:

1. **Prepara tutti i nuovi file e le modifiche per il caricamento:**
   ```bash
   git add .
   ```

2. **Crea un pacchetto di modifiche con un messaggio descrittivo (puoi cambiare il testo tra virgolette):**
   ```bash
   git commit -m "Aggiunto nuovo contenuto"
   ```

3. **Invia le modifiche al tuo repository GitHub:**
   ```bash
   git push origin main
   ```

Dopo aver eseguito l'ultimo comando, la pipeline di **GitHub Actions** si avvierà automaticamente. Nel giro di 1-2 minuti, il tuo sito aggiornato sarà visibile all'indirizzo:  
`https://bitbog.github.io/egidiogiacoia.com/`
