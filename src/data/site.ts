/* ============================================================================
   CONFIGURAZIONE CENTRALE CONTATTI & SOCIAL DEL SITO
   ============================================================================
   Compila qui i tuoi recapiti per attivarli IN AUTOMATICO in Home, nella
   pagina Contatti e nel footer:
   - instagramUrl & instagramHandle: es. 'https://www.instagram.com/egidiogiacoia/'
     e '@egidiogiacoia'. Finché restano '', la card Instagram mostra "In arrivo".
   - whatsappPhone: inserisci prefisso internazionale + numero senza "+" o spazi
     (es. '393331234567'). Finché resta '', la card WhatsApp mostra "In arrivo".
   ============================================================================ */

export const siteConfig = {
  siteName: 'Egidio Giacoia',
  siteUrl: 'https://egidiogiacoia.com',
  location: 'Castelsaraceno · Basilicata',

  // Numero WhatsApp per richieste dirette (es. '393331234567'). Lascia '' finché non vuoi attivarlo.
  whatsappPhone: '',
  whatsappDefaultMsg: 'Ciao Egidio, ti contatto dal tuo sito per parlarti di un progetto.',

  // Profilo Instagram (es. 'https://instagram.com/nomeprofilo' e '@nomeprofilo').
  instagramUrl: 'https://www.instagram.com/egidiogiacoia/',
  instagramHandle: '@egidiogiacoia',

  // Canale WhatsApp per gli aggiornamenti del blog
  whatsappChannelUrl: 'https://whatsapp.com/channel/0029VaFJXAvJ93wY6tcBGr2w'
} as const;

export function getWhatsAppChatUrl(message = siteConfig.whatsappDefaultMsg): string | null {
  const digits = siteConfig.whatsappPhone.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function getInstagramUrl(): string | null {
  const url = siteConfig.instagramUrl.trim();
  return url ? url : null;
}
