import { notFound } from "next/navigation";
import { DishDetail } from "@/components/DishDetail";
import { getRestaurant, restaurants } from "@/lib/menu";

export function generateStaticParams() {
  return restaurants.flatMap((r) => r.dishes.map((d) => ({ slug: r.slug, id: d.id })));
}

export default async function DishPage({ params }: PageProps<"/r/[slug]/prato/[id]">) {
  const { slug, id } = await params;
  const restaurant = getRestaurant(slug);
  if (!restaurant) notFound();
  return <DishDetail restaurant={restaurant} dishId={id} />;
}
