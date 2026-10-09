import { img } from "./images";
import type { T } from "./i18n";

export type Allergen =
  | "peixe" | "ovo" | "leite" | "gluten" | "moluscos" | "crustaceos" | "sulfitos";

export const ALLERGENS: Record<Allergen, T> = {
  peixe: { pt: "Peixe", en: "Fish", es: "Pescado", fr: "Poisson" },
  ovo: { pt: "Ovo", en: "Egg", es: "Huevo", fr: "Œuf" },
  leite: { pt: "Leite", en: "Milk", es: "Leche", fr: "Lait" },
  gluten: { pt: "Glúten", en: "Gluten", es: "Gluten", fr: "Gluten" },
  moluscos: { pt: "Moluscos", en: "Molluscs", es: "Moluscos", fr: "Mollusques" },
  crustaceos: { pt: "Crustáceos", en: "Crustaceans", es: "Crustáceos", fr: "Crustacés" },
  sulfitos: { pt: "Sulfitos", en: "Sulphites", es: "Sulfitos", fr: "Sulfites" },
};

export type Dish = {
  id: string;
  category: string;
  name: string; // nome do prato fica no original, em português
  price: number;
  short: T;
  description: T;
  allergens: Allergen[];
  soldOut?: boolean;
  /** Vídeo 4:5 em loop, MP4 sem áudio (ex.: "/videos/polvo.mp4"). Vazio = mostra o poster. */
  videoUrl?: string;
  posterUrl?: string;
  gallery?: string[];
};

export type Category = { id: string; name: T };

export type Restaurant = {
  slug: string;
  name: string;
  tagline: string;
  /** Cor de destaque da marca do restaurante. */
  accent: string;
  googleReviewUrl: string;
  signatureDishId: string;
  categories: Category[];
  dishes: Dish[];
};

const tascaDoMar: Restaurant = {
  slug: "tasca-do-mar",
  name: "Tasca do Mar",
  tagline: "Cascais · 1984",
  accent: "#5e7153",
  googleReviewUrl: "https://www.google.com/maps",
  signatureDishId: "polvo-a-lagareiro",
  categories: [
    { id: "entradas", name: { pt: "Entradas", en: "Starters", es: "Entrantes", fr: "Entrées" } },
    { id: "pratos", name: { pt: "Pratos", en: "Mains", es: "Principales", fr: "Plats" } },
    { id: "sobremesas", name: { pt: "Sobremesas", en: "Desserts", es: "Postres", fr: "Desserts" } },
    { id: "bebidas", name: { pt: "Bebidas", en: "Drinks", es: "Bebidas", fr: "Boissons" } },
  ],
  dishes: [
    {
      id: "ameijoas-a-bulhao-pato",
      category: "entradas",
      name: "Amêijoas à Bulhão Pato",
      price: 16.5,
      short: {
        pt: "Amêijoas frescas, alho, coentros e sumo de limão.",
        en: "Fresh clams, garlic, coriander and lemon juice.",
        es: "Almejas frescas, ajo, cilantro y zumo de limón.",
        fr: "Palourdes fraîches, ail, coriandre et jus de citron.",
      },
      description: {
        pt: "Amêijoas da Ria Formosa abertas em azeite com alho esmagado, coentros picados e um toque de limão. Para molhar o pão.",
        en: "Ria Formosa clams opened in olive oil with crushed garlic, chopped coriander and a squeeze of lemon. Made for dipping bread.",
        es: "Almejas de la Ria Formosa abiertas en aceite de oliva con ajo machacado, cilantro picado y un toque de limón. Para mojar pan.",
        fr: "Palourdes de la Ria Formosa ouvertes à l'huile d'olive, ail écrasé, coriandre et un filet de citron. À déguster avec du pain.",
      },
      allergens: ["moluscos"],
      posterUrl: img.ameijoas,
    },
    {
      id: "pao-azeitonas",
      category: "entradas",
      name: "Pão, azeitonas e manteiga",
      price: 3.5,
      short: {
        pt: "Pão de Mafra, azeitonas temperadas e manteiga dos Açores.",
        en: "Mafra bread, marinated olives and Azores butter.",
        es: "Pan de Mafra, aceitunas aliñadas y mantequilla de las Azores.",
        fr: "Pain de Mafra, olives marinées et beurre des Açores.",
      },
      description: {
        pt: "Pão de Mafra, azeitonas temperadas e manteiga dos Açores.",
        en: "Mafra bread, marinated olives and Azores butter.",
        es: "Pan de Mafra, aceitunas aliñadas y mantequilla de las Azores.",
        fr: "Pain de Mafra, olives marinées et beurre des Açores.",
      },
      allergens: ["gluten", "leite"],
    },
    {
      id: "bacalhau-a-bras",
      category: "pratos",
      name: "Bacalhau à Brás",
      price: 18.5,
      short: {
        pt: "Bacalhau desfiado, batata palha, ovos cremosos e azeitonas.",
        en: "Shredded cod, matchstick potatoes, creamy eggs and olives.",
        es: "Bacalao desmigado, patata paja, huevos cremosos y aceitunas.",
        fr: "Morue effilochée, pommes paille, œufs crémeux et olives.",
      },
      description: {
        pt: "Receita tradicional de Lisboa. Bacalhau desfiado salteado em azeite com cebola, batata palha fina e ovos cremosos, finalizado com azeitonas e salsa.",
        en: "A Lisbon classic. Shredded cod sautéed in olive oil with onion, thin matchstick potatoes and creamy eggs, finished with olives and parsley.",
        es: "Clásico de Lisboa. Bacalao desmigado salteado en aceite con cebolla, patata paja fina y huevos cremosos, con aceitunas y perejil.",
        fr: "Un classique de Lisbonne. Morue effilochée sautée à l'huile d'olive avec oignon, pommes paille et œufs crémeux, olives et persil.",
      },
      allergens: ["peixe", "ovo"],
      posterUrl: img.bacalhau,
      gallery: [img.azeiteAlho, img.ovoCremoso, img.sala],
    },
    {
      id: "arroz-de-marisco",
      category: "pratos",
      name: "Arroz de Marisco",
      price: 26,
      short: {
        pt: "Camarão tigre, amêijoas da nossa costa e coentros frescos.",
        en: "Tiger prawns, local clams and fresh coriander.",
        es: "Langostino tigre, almejas de nuestra costa y cilantro fresco.",
        fr: "Crevettes tigrées, palourdes locales et coriandre fraîche.",
      },
      description: {
        pt: "Arroz malandrinho cozinhado em caldo de marisco, com camarão tigre, amêijoas e coentros. Para duas pessoas.",
        en: "Soupy rice cooked in seafood broth with tiger prawns, clams and coriander. Serves two.",
        es: "Arroz meloso cocinado en caldo de marisco, con langostino tigre, almejas y cilantro. Para dos personas.",
        fr: "Riz moelleux cuit dans un bouillon de fruits de mer, crevettes tigrées, palourdes et coriandre. Pour deux.",
      },
      allergens: ["crustaceos", "moluscos"],
      posterUrl: img.arroz,
    },
    {
      id: "polvo-a-lagareiro",
      category: "pratos",
      name: "Polvo à Lagareiro",
      price: 24.5,
      short: {
        pt: "Polvo assado, batatas a murro e azeite com alho.",
        en: "Roasted octopus, crushed potatoes and garlic olive oil.",
        es: "Pulpo asado, patatas aplastadas y aceite con ajo.",
        fr: "Poulpe rôti, pommes de terre écrasées et huile à l'ail.",
      },
      description: {
        pt: "Polvo assado no forno a lenha, batatas a murro douradas, alho e azeite virgem extra da Beira Baixa.",
        en: "Octopus roasted in a wood-fired oven with golden crushed potatoes, garlic and Beira Baixa extra virgin olive oil.",
        es: "Pulpo asado en horno de leña con patatas aplastadas doradas, ajo y aceite virgen extra de la Beira Baixa.",
        fr: "Poulpe rôti au feu de bois, pommes de terre écrasées dorées, ail et huile d'olive vierge extra de la Beira Baixa.",
      },
      allergens: ["moluscos"],
      posterUrl: img.polvo,
    },
    {
      id: "bacalhau-gomes-de-sa",
      category: "pratos",
      name: "Bacalhau à Gomes de Sá",
      price: 19,
      short: {
        pt: "Bacalhau lascado, batata, cebola, ovo cozido e azeitonas.",
        en: "Flaked cod, potato, onion, boiled egg and olives.",
        es: "Bacalao en lascas, patata, cebolla, huevo duro y aceitunas.",
        fr: "Morue en lamelles, pomme de terre, oignon, œuf dur et olives.",
      },
      description: {
        pt: "Bacalhau lascado no forno com batata, cebola, ovo cozido e azeitonas.",
        en: "Flaked cod baked with potato, onion, boiled egg and olives.",
        es: "Bacalao en lascas al horno con patata, cebolla, huevo duro y aceitunas.",
        fr: "Morue en lamelles au four avec pomme de terre, oignon, œuf dur et olives.",
      },
      allergens: ["peixe", "ovo"],
      soldOut: true,
      posterUrl: img.bacalhauAlt,
    },
    {
      id: "pastel-de-nata",
      category: "sobremesas",
      name: "Pastel de Nata",
      price: 2.5,
      short: {
        pt: "Massa folhada estaladiça, creme de ovo e canela.",
        en: "Crisp puff pastry, egg custard and cinnamon.",
        es: "Hojaldre crujiente, crema de huevo y canela.",
        fr: "Pâte feuilletée croustillante, crème aux œufs et cannelle.",
      },
      description: {
        pt: "Massa folhada estaladiça, creme de ovo e canela.",
        en: "Crisp puff pastry, egg custard and cinnamon.",
        es: "Hojaldre crujiente, crema de huevo y canela.",
        fr: "Pâte feuilletée croustillante, crème aux œufs et cannelle.",
      },
      allergens: ["gluten", "ovo", "leite"],
    },
    {
      id: "mousse-de-chocolate",
      category: "sobremesas",
      name: "Mousse de Chocolate",
      price: 5.5,
      short: {
        pt: "Chocolate negro, flor de sal de Aveiro.",
        en: "Dark chocolate, Aveiro sea salt flakes.",
        es: "Chocolate negro, flor de sal de Aveiro.",
        fr: "Chocolat noir, fleur de sel d'Aveiro.",
      },
      description: {
        pt: "Chocolate negro, flor de sal de Aveiro.",
        en: "Dark chocolate, Aveiro sea salt flakes.",
        es: "Chocolate negro, flor de sal de Aveiro.",
        fr: "Chocolat noir, fleur de sel d'Aveiro.",
      },
      allergens: ["ovo", "leite"],
    },
    {
      id: "vinho-verde",
      category: "bebidas",
      name: "Vinho Verde (copo)",
      price: 4.5,
      short: {
        pt: "Alvarinho, Monção e Melgaço.",
        en: "Alvarinho, Monção e Melgaço.",
        es: "Alvarinho, Monção e Melgaço.",
        fr: "Alvarinho, Monção e Melgaço.",
      },
      description: {
        pt: "Alvarinho, Monção e Melgaço.",
        en: "Alvarinho, Monção e Melgaço.",
        es: "Alvarinho, Monção e Melgaço.",
        fr: "Alvarinho, Monção e Melgaço.",
      },
      allergens: ["sulfitos"],
    },
    {
      id: "agua-das-pedras",
      category: "bebidas",
      name: "Água das Pedras",
      price: 2.5,
      short: {
        pt: "Água mineral gaseificada, 25 cl.",
        en: "Sparkling mineral water, 25 cl.",
        es: "Agua mineral con gas, 25 cl.",
        fr: "Eau minérale gazeuse, 25 cl.",
      },
      description: {
        pt: "Água mineral gaseificada, 25 cl.",
        en: "Sparkling mineral water, 25 cl.",
        es: "Agua mineral con gas, 25 cl.",
        fr: "Eau minérale gazeuse, 25 cl.",
      },
      allergens: [],
    },
  ],
};

export const restaurants: Restaurant[] = [tascaDoMar];

export function getRestaurant(slug: string) {
  return restaurants.find((r) => r.slug === slug);
}

/** Preço no formato português: 18,50 € */
export function formatPrice(value: number) {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

/** Pratos da categoria, com os esgotados no fim. */
export function dishesIn(r: Restaurant, categoryId: string) {
  const list = r.dishes.filter((d) => d.category === categoryId);
  return [...list.filter((d) => !d.soldOut), ...list.filter((d) => d.soldOut)];
}
