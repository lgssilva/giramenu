export const LANGS = ["pt", "en", "es", "fr"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_NAMES: Record<Lang, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
};

/** Texto traduzido nos 4 idiomas. */
export type T = Record<Lang, string>;

export const ui = {
  chooseLang: { pt: "Escolher idioma", en: "Choose language", es: "Elegir idioma", fr: "Choisir la langue" },
  categories: { pt: "Categorias do menu", en: "Menu categories", es: "Categorías del menú", fr: "Catégories du menu" },
  signature: { pt: "Especialidade da casa", en: "House speciality", es: "Especialidad de la casa", fr: "Spécialité de la maison" },
  allergens: { pt: "Alergénios", en: "Allergens", es: "Alérgenos", fr: "Allergènes" },
  soldOut: { pt: "Esgotado", en: "Sold out", es: "Agotado", fr: "Épuisé" },
  more: { pt: "Ver detalhes", en: "See details", es: "Ver detalles", fr: "Voir les détails" },
  less: { pt: "Fechar", en: "Close", es: "Cerrar", fr: "Fermer" },
  back: { pt: "Voltar", en: "Back", es: "Volver", fr: "Retour" },
  thanks: { pt: "Obrigado pela visita!", en: "Thank you for visiting!", es: "¡Gracias por su visita!", fr: "Merci de votre visite !" },
  thanksLine: {
    pt: "Esperamos que desfrute da nossa cozinha e da frescura do mar de Cascais.",
    en: "We hope you enjoy our cooking and the freshness of the Cascais sea.",
    es: "Esperamos que disfrute de nuestra cocina y del frescor del mar de Cascais.",
    fr: "Nous espérons que vous apprécierez notre cuisine et la fraîcheur de la mer de Cascais.",
  },
  review: { pt: "Avaliar no Google", en: "Review us on Google", es: "Valorar en Google", fr: "Laisser un avis Google" },
  backToTop: { pt: "Voltar ao início", en: "Back to top", es: "Volver al inicio", fr: "Retour en haut" },
} satisfies Record<string, T>;

/** Idioma do navegador; inglês quando o idioma não é suportado (turista). */
export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "pt";
  const code = navigator.language.slice(0, 2).toLowerCase();
  return (LANGS as readonly string[]).includes(code) ? (code as Lang) : "en";
}
