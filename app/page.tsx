import { redirect } from "next/navigation";

// Por enquanto a raiz abre o restaurante de demonstração.
export default function Home() {
  redirect("/r/tasca-do-mar");
}
