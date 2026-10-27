import { redirect } from "next/navigation";

// Nesta branch a raiz abre a demo da pizzaria. HOME_SLUG (variável na Vercel)
// troca qual menu abre, ex.: "pizzaria-demo" no projeto giramenu-pizza.
export default function Home() {
  redirect(`/r/${process.env.HOME_SLUG || "pizzaria-demo"}`);
}
