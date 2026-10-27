import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Menu } from "@/components/Menu";
import { getRestaurant, restaurants } from "@/lib/menu";

export function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/r/[slug]">): Promise<Metadata> {
  const r = getRestaurant((await params).slug);
  return r ? { title: `${r.name} · Menu` } : {};
}

export async function generateViewport({ params }: PageProps<"/r/[slug]">): Promise<Viewport> {
  const r = getRestaurant((await params).slug);
  return { themeColor: r?.theme === "light" ? "#fff8ee" : "#131413" };
}

export default async function RestaurantPage({ params }: PageProps<"/r/[slug]">) {
  const { slug } = await params;
  const restaurant = getRestaurant(slug);
  if (!restaurant) notFound();
  return <Menu restaurant={restaurant} />;
}
