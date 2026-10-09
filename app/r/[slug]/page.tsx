import { notFound } from "next/navigation";
import { Menu } from "@/components/Menu";
import { getRestaurant, restaurants } from "@/lib/menu";

export function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export default async function RestaurantPage({ params }: PageProps<"/r/[slug]">) {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);
  if (!restaurant) notFound();
  return <Menu restaurant={restaurant} />;
}
