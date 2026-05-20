# Galleria Fotografica: Istruzioni

La sezione Fotografia funziona ora esattamente come Diario e Progetti. Ogni scatto o progetto fotografico è rappresentato da un file Markdown (`.md`) che fa riferimento a un'immagine locale.

## Come aggiungere una foto/storia:

1. Trascina la tua immagine (es: `mio-scatto.jpg`) direttamente in questa cartella (`fotografia/`).
2. Copia e incolla il file di template `_template-fotografia.md` creando un nuovo file (es: `mio-scatto.md`) in questa stessa cartella.
3. Modifica i metadati all'inizio del file Markdown:
   - Imposta il `title` (il titolo dello scatto).
   - Imposta `pubDate` nel formato `AAAA-MM-GG`.
   - Nel campo `cover`, scrivi il percorso dell'immagine (es: `cover: "./mio-scatto.jpg"`).
   - Aggiungi, se vuoi, `location` (es. `Milano, Italia`) e `gear` (es. `Leica M6, Summicron 35mm`).
4. Scrivi la storia o una descrizione della foto sotto i trattini di chiusura `---` nel file Markdown.
5. Fai il push: lo script di build si occuperà di copiare i file e ottimizzare l'immagine in automatico!

*Nota: I file che iniziano con un underscore `_` (come `_template-fotografia.md`) o i file di testo semplice non verranno inclusi nella galleria pubblica.*
