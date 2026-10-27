import type { Restaurant } from "./menu";

// Demo de pizzaria para delivery (pedido de casa, pelo WhatsApp).
// Imagens provisórias do Unsplash até chegarem os vídeos reais das pizzas.
// Para trocar por vídeo: preencher videoUrl ("/videos/margherita.mp4") e posterUrl.
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=1125&q=70`;

export const pizzariaDemo: Restaurant = {
  slug: "pizzaria-demo",
  name: "Forno da Vila",
  tagline: "Forno a lenha · Entrega 30–40 min",
  theme: "light",
  accent: "#7a1f2b", // bordô: botões
  accentText: "#c8102e", // vermelho: preços
  highlight: "#f2b705", // amarelo: selo e detalhes
  order: {
    // Número da pizzaria (só dígitos, com 351). Vazio = o WhatsApp pede o contato.
    whatsapp: "",
    label: { pt: "Pedir pizza", en: "Order pizza", es: "Pedir pizza", fr: "Commander" },
  },
  thanks: {
    pt: "Obrigado pela preferência!",
    en: "Thanks for ordering with us!",
    es: "¡Gracias por su pedido!",
    fr: "Merci pour votre commande !",
  },
  thanksLine: {
    pt: "Massa de longa fermentação, forno a lenha e ingredientes italianos. Bom apetite!",
    en: "Slow-fermented dough, wood-fired oven and Italian ingredients. Enjoy!",
    es: "Masa de larga fermentación, horno de leña e ingredientes italianos. ¡Buen provecho!",
    fr: "Pâte à longue fermentation, four à bois et ingrédients italiens. Bon appétit !",
  },
  reviewLinks: [{ platform: "google", url: "https://www.google.com/maps" }],
  signatureDishId: "margherita",
  categories: [
    { id: "pizzas", name: { pt: "Pizzas", en: "Pizzas", es: "Pizzas", fr: "Pizzas" } },
    { id: "sobremesas", name: { pt: "Sobremesas", en: "Desserts", es: "Postres", fr: "Desserts" } },
    { id: "bebidas", name: { pt: "Bebidas", en: "Drinks", es: "Bebidas", fr: "Boissons" }, compact: true },
  ],
  dishes: [
    {
      id: "margherita",
      category: "pizzas",
      name: "Margherita",
      price: 10.5,
      short: {
        pt: "Tomate San Marzano, mozzarella fior di latte e manjericão.",
        en: "San Marzano tomato, fior di latte mozzarella and basil.",
        es: "Tomate San Marzano, mozzarella fior di latte y albahaca.",
        fr: "Tomate San Marzano, mozzarella fior di latte et basilic.",
      },
      description: {
        pt: "A clássica de Nápoles. Massa de 48 horas, tomate San Marzano, mozzarella fior di latte, manjericão fresco e azeite virgem extra. Sai do forno a lenha em 90 segundos.",
        en: "The Naples classic. 48-hour dough, San Marzano tomato, fior di latte mozzarella, fresh basil and extra virgin olive oil. Out of the wood-fired oven in 90 seconds.",
        es: "La clásica de Nápoles. Masa de 48 horas, tomate San Marzano, mozzarella fior di latte, albahaca fresca y aceite virgen extra. Sale del horno de leña en 90 segundos.",
        fr: "La classique de Naples. Pâte de 48 heures, tomate San Marzano, mozzarella fior di latte, basilic frais et huile d'olive vierge extra. Cuite au feu de bois en 90 secondes.",
      },
      allergens: ["gluten", "leite"],
      posterUrl: u("photo-1574071318508-1cdbab80d002"),
    },
    {
      id: "pepperoni",
      category: "pizzas",
      name: "Pepperoni",
      price: 12.5,
      short: {
        pt: "Molho de tomate, mozzarella e pepperoni picante.",
        en: "Tomato sauce, mozzarella and spicy pepperoni.",
        es: "Salsa de tomate, mozzarella y pepperoni picante.",
        fr: "Sauce tomate, mozzarella et pepperoni épicé.",
      },
      description: {
        pt: "Molho de tomate da casa, mozzarella derretida e fatias de pepperoni que estalam no forno. A mais pedida ao fim de semana.",
        en: "House tomato sauce, melted mozzarella and pepperoni slices that crisp up in the oven. Our weekend favourite.",
        es: "Salsa de tomate de la casa, mozzarella fundida y lonchas de pepperoni que crujen en el horno. La más pedida el fin de semana.",
        fr: "Sauce tomate maison, mozzarella fondue et tranches de pepperoni croustillantes. La plus commandée le week-end.",
      },
      allergens: ["gluten", "leite", "sulfitos"],
      posterUrl: u("photo-1628840042765-356cda07504e"),
    },
    {
      id: "quatro-queijos",
      category: "pizzas",
      name: "Quatro Queijos",
      price: 13,
      short: {
        pt: "Mozzarella, gorgonzola, parmesão e queijo da Serra.",
        en: "Mozzarella, gorgonzola, parmesan and Serra cheese.",
        es: "Mozzarella, gorgonzola, parmesano y queso da Serra.",
        fr: "Mozzarella, gorgonzola, parmesan et fromage da Serra.",
      },
      description: {
        pt: "Base branca com mozzarella, gorgonzola, parmesão e um toque de queijo da Serra. Para quem gosta de queijo a escorrer.",
        en: "White base with mozzarella, gorgonzola, parmesan and a touch of Serra cheese. For serious cheese lovers.",
        es: "Base blanca con mozzarella, gorgonzola, parmesano y un toque de queso da Serra. Para amantes del queso.",
        fr: "Base blanche, mozzarella, gorgonzola, parmesan et une touche de fromage da Serra. Pour les amoureux du fromage.",
      },
      allergens: ["gluten", "leite"],
      posterUrl: u("photo-1513104890138-7c749659a591"),
    },
    {
      id: "diavola",
      category: "pizzas",
      name: "Diavola",
      price: 12.5,
      short: {
        pt: "Salame picante, malagueta fresca e mel picante.",
        en: "Spicy salami, fresh chilli and hot honey.",
        es: "Salami picante, guindilla fresca y miel picante.",
        fr: "Salami piquant, piment frais et miel épicé.",
      },
      description: {
        pt: "Tomate, mozzarella, salame picante, malagueta fresca e um fio de mel picante no fim. Doce e quente na mesma dentada.",
        en: "Tomato, mozzarella, spicy salami, fresh chilli and a drizzle of hot honey. Sweet and hot in one bite.",
        es: "Tomate, mozzarella, salami picante, guindilla fresca y un hilo de miel picante. Dulce y picante en el mismo bocado.",
        fr: "Tomate, mozzarella, salami piquant, piment frais et un filet de miel épicé. Sucré et piquant à la fois.",
      },
      allergens: ["gluten", "leite", "sulfitos"],
      posterUrl: u("photo-1565299624946-b28f40a0ca4b"),
    },
    {
      id: "prosciutto-rucula",
      category: "pizzas",
      name: "Prosciutto e Rúcula",
      price: 14,
      short: {
        pt: "Presunto cru, rúcula, tomate cherry e lascas de parmesão.",
        en: "Prosciutto, rocket, cherry tomatoes and parmesan shavings.",
        es: "Jamón crudo, rúcula, tomate cherry y lascas de parmesano.",
        fr: "Jambon cru, roquette, tomates cerises et copeaux de parmesan.",
      },
      description: {
        pt: "Sai do forno com tomate e mozzarella e recebe por cima presunto cru, rúcula fresca, tomate cherry e lascas de parmesão.",
        en: "Baked with tomato and mozzarella, then topped with prosciutto, fresh rocket, cherry tomatoes and parmesan shavings.",
        es: "Sale del horno con tomate y mozzarella y se cubre con jamón crudo, rúcula fresca, tomate cherry y parmesano.",
        fr: "Cuite avec tomate et mozzarella, puis garnie de jambon cru, roquette fraîche, tomates cerises et parmesan.",
      },
      allergens: ["gluten", "leite"],
      posterUrl: u("photo-1571997478779-2adcbbe9ab2f"),
    },
    {
      id: "tiramisu",
      category: "sobremesas",
      name: "Tiramisù",
      price: 5,
      short: {
        pt: "Mascarpone, café expresso e cacau.",
        en: "Mascarpone, espresso and cocoa.",
        es: "Mascarpone, café expreso y cacao.",
        fr: "Mascarpone, expresso et cacao.",
      },
      description: {
        pt: "Feito na casa todos os dias: biscoitos embebidos em expresso, creme de mascarpone e cacau.",
        en: "Made in-house daily: ladyfingers soaked in espresso, mascarpone cream and cocoa.",
        es: "Hecho en casa cada día: bizcochos mojados en expreso, crema de mascarpone y cacao.",
        fr: "Fait maison chaque jour : biscuits imbibés d'expresso, crème au mascarpone et cacao.",
      },
      allergens: ["gluten", "ovo", "leite"],
      posterUrl: u("photo-1571877227200-a0d98ea607e9"),
    },
    {
      id: "coca-cola",
      category: "bebidas",
      name: "Coca-Cola",
      price: 2,
      short: { pt: "Lata 33 cl.", en: "33 cl can.", es: "Lata 33 cl.", fr: "Canette 33 cl." },
      description: { pt: "Lata 33 cl.", en: "33 cl can.", es: "Lata 33 cl.", fr: "Canette 33 cl." },
      allergens: [],
    },
    {
      id: "super-bock",
      category: "bebidas",
      name: "Super Bock",
      price: 2.5,
      short: { pt: "Garrafa 33 cl.", en: "33 cl bottle.", es: "Botella 33 cl.", fr: "Bouteille 33 cl." },
      description: { pt: "Garrafa 33 cl.", en: "33 cl bottle.", es: "Botella 33 cl.", fr: "Bouteille 33 cl." },
      allergens: ["gluten"],
    },
    {
      id: "agua",
      category: "bebidas",
      name: "Água",
      price: 1.5,
      short: { pt: "Garrafa 50 cl.", en: "50 cl bottle.", es: "Botella 50 cl.", fr: "Bouteille 50 cl." },
      description: { pt: "Garrafa 50 cl.", en: "50 cl bottle.", es: "Botella 50 cl.", fr: "Bouteille 50 cl." },
      allergens: [],
    },
  ],
};
