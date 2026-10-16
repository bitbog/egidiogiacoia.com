# Sviluppo con Docker

Node.js 22, npm, Astro e tutte le dipendenze del progetto vengono installati nell'immagine tramite `npm ci`, usando `package-lock.json`. Sul computer servono soltanto Docker e Compose; su Windows LTSC si possono eseguire dentro WSL2.

Il container legge `src`, `public` e i file di configurazione dalla cartella del progetto. Le modifiche vengono rilevate anche su Windows tramite polling. `node_modules`, la cache `.astro` e la compilazione `dist` rimangono nel filesystem del container. Non viene montata la cartella principale del progetto, per evitare di creare dipendenze sul computer.

## Con Docker disponibile

Apri il terminale nella cartella del progetto.

```sh
docker compose up --build -d --wait
```

Apri http://localhost:4321. Il servizio espone la porta soltanto su localhost.

```sh
# Leggere i messaggi del server
docker compose logs -f site

# Verificare la compilazione, sempre in un container temporaneo
docker compose run --rm --no-deps site npm run build

# Fermare e rimuovere il container di sviluppo
docker compose down
```

Quando cambiano `package.json` o `package-lock.json`, esegui nuovamente `docker compose up --build -d --wait`. Le dipendenze vengono ricostruite usando il lockfile. Non eseguire npm sul computer.

Per compilare una copia del sito interamente dentro un'immagine, senza avviare il server:

```sh
docker build --target build -t egidiogiacoia-build .
```

Il risultato si trova in `/app/dist` nell'immagine. Il server di sviluppo e il suo comando di compilazione sono destinati all'uso locale. La pubblicazione su GitHub Pages resta gestita dal workflow esistente.

## Installazione su Windows 10 LTSC tramite WSL2

La macchina rilevata usa Windows 10 IoT Enterprise LTSC 2021, build 19044. L'attuale Docker Desktop richiede almeno build 19045 per Windows 10. Il percorso scelto usa Docker Engine dentro Ubuntu su WSL2.

1. Apri **PowerShell come amministratore** ed esegui:

   ```powershell
   wsl --install -d Ubuntu-24.04
   ```

   Riavvia Windows se richiesto, poi apri Ubuntu e completa la creazione dell'utente Linux.

2. In PowerShell verifica che Ubuntu usi WSL2:

   ```powershell
   wsl --list --verbose
   ```

   Se la colonna VERSION indica 1, esegui `wsl --set-version Ubuntu-24.04 2`.

3. Installa Docker Engine e Compose nella distribuzione Ubuntu con lo script del progetto:

   ```powershell
   Set-Location 'C:\Users\Egidio\Documents\Progetti\egidiogiacoia.com'
   wsl -d Ubuntu-24.04 -u root -- bash ./docker/install-engine-ubuntu.sh
   ```

   Lo script usa il repository ufficiale Docker e verifica l'installazione con `hello-world`. Non installa Node.js o le dipendenze del progetto in Ubuntu.

4. Avvia il progetto da PowerShell:

   ```powershell
   Set-Location 'C:\Users\Egidio\Documents\Progetti\egidiogiacoia.com'
   wsl -d Ubuntu-24.04 -u root -- service docker start
   wsl -d Ubuntu-24.04 -u root -- docker compose up --build -d --wait
   ```

   Apri http://localhost:4321. Per gli altri comandi della guida usa lo stesso prefisso `wsl -d Ubuntu-24.04 -u root --`, per esempio:

   ```powershell
   wsl -d Ubuntu-24.04 -u root -- docker compose run --rm --no-deps site npm run build
   wsl -d Ubuntu-24.04 -u root -- docker compose down
   ```

   Docker viene amministrato come root dentro Ubuntu; il processo del sito nel container usa l'utente non privilegiato `node`.

## Stato della preparazione

Configurazione creata. L'attivazione di WSL ha restituito `The requested operation requires elevation` nella sessione di preparazione. Docker non e ancora installato: la compilazione dell'immagine, l'avvio e la risposta HTTP devono essere verificati dopo l'attivazione di WSL2.

Fonti: [requisiti Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/), [installazione WSL](https://learn.microsoft.com/windows/wsl/install), [Docker Engine su Ubuntu](https://docs.docker.com/engine/install/ubuntu/).
