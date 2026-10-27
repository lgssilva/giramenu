import { redirect } from "next/navigation";

// A raiz abre o restaurante de demonstração. HOME_SLUG (variável na Vercel)
// troca qual menu abre, ex.: "pizzaria-demo" no projeto giramenu-pizza.
export default function Home() {
  redirect(`/r/${process.env.HOME_SLUG || "tasca-do-mar"}`);
}
