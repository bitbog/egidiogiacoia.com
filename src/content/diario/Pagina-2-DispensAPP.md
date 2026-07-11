---
title: "Sto Sviluppando una applicazione"
pubDate: 2026-07-07 # Formato: AAAA-MM-GG (es: 2026-05-20)
description: "Voglio combattere lo spreco creando un app che monitora la dispensa." # Opzionale, puoi cancellare questa riga se non vuoi una descrizione
---

Ogni volta dimentico l'insalata in busta nel frigo. Ogni volta diventa un liquido informe e la devo buttare. Sono sicuro che sia capitato sia a te, sia a tantissime altre persone. Ho così iniziato a sviluppare un'applicazione che mi consente di monitorare la mia dispensa e sapere cosa ho e cosa sta per scadere.

Al momento la chiamo **DispensAPP** e sinceramente mi piacerebbe che mi proponessi qualche altro nome perchè questo mi sembra troppo scontato.

<div class="image-row">
  <img src="/img/diario/DispensAPP_Mockup1.webp" alt="Schermata DispensAPP 1" width="840" height="1455" loading="lazy" decoding="async">
  <img src="/img/diario/DispensAPP_Mockup2.webp" alt="Schermata DispensAPP 2" width="840" height="1455" loading="lazy" decoding="async">
  <img src="/img/diario/DispensAPP_Mockup3.webp" alt="Schermata DispensAPP 3" width="840" height="1455" loading="lazy" decoding="async">
</div>

## A cosa serve?
Il concetto è semplice, avvisarmi quando qualcosa è in procinto di scadere e ricordarmi di averlo da qualche parte. Per questo ho integrato un'idea: proporre ricette con le cose che ho e preferire quelle che stanno per scadere così da consumarle.

```kotlin
val greetings = remember(username) {
    listOf(
        "Ciao, ${username ?: "utente"}! 👋",
        "Cosa mangi oggi? 🍽️",
        "Occhio alle scadenze! ⏰",
        "Buon appetito, ${username ?: "utente"}! 😋",
        "Che si cucina oggi? 🍳",
        "La tua dispensa ti aspetta! 🏠",
        "Niente sprechi oggi! 🌿",
        "Pronto a cucinare? 👨‍🍳"
    )
}
val greeting = remember { greetings.random() }
```
Questa è una piccola parte di codice usata. Sono delle frasi che cambiano casualmente nella schermata principale dell, app.

## I prossimi step:
- Aggiungere una "Casa" così da sincronizzare la dispensa con altri utenti.
- Modificare gli elementi aggiunti.
- Inserire la quantità degli elementi.

## Perchè usarla?
Con questa app  vorrei che si riesca a risolvere il problema degli sprechi di cibo e magarei anche migliorare a livello economico evitando di comprare cose inutili.

