"use client";

import { ui } from "@/lib/i18n";
import { formatPrice, type Restaurant } from "@/lib/menu";
import { AllergenChips } from "./AllergenChips";
import { DishMedia } from "./DishMedia";
import { useLang } from "./LangProvider";
import { TopBar } from "./TopBar";

export function DishDetail({ restaurant: r, dishId }: { restaurant: Restaurant; dishId: string }) {
  const { t } = useLang();
  const d = r.dishes.find((x) => x.id === dishId);
  const category = r.categories.find((c) => c.id === d?.category);

  return (
    <>
      <TopBar name={r.name} backHref={`/r/${r.slug}`} />
      <main className="flex-1 pb-12">
        {!d ? (
          <p className="px-4 pt-10 text-on-surface-variant">{t(ui.notFound)}</p>
        ) : (
          <article>
            <div className="px-4 pt-4">
              <DishMedia videoUrl={d.videoUrl} posterUrl={d.posterUrl} alt={d.name} dimmed={d.soldOut} priority />
            </div>

            <div className="flex flex-col gap-3 px-4 pt-5">
              {category && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-light">
                  {t(category.name)}
                </span>
              )}
              <div className="flex items-baseline justify-between gap-3">
                <h1 className="font-serif text-[2rem] font-semibold leading-tight">{d.name}</h1>
                <span className="whitespace-nowrap text-xl font-semibold">{formatPrice(d.price)}</span>
              </div>
              {d.soldOut && (
                <span className="inline-flex h-6 w-fit items-center rounded-md bg-surface-high px-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                  {t(ui.soldOut)}
                </span>
              )}
              <p className="text-[15px] leading-relaxed text-on-surface-variant">{t(d.description)}</p>
            </div>

            {d.allergens.length > 0 && (
              <section className="flex flex-col gap-3 px-4 pt-7">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em]">{t(ui.allergens)}</h2>
                <AllergenChips allergens={d.allergens} size="md" />
              </section>
            )}

            {d.gallery && d.gallery.length > 0 && (
              <section className="pt-8">
                <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4">
                  {d.gallery.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt={`${d.name} ${i + 1}`}
                      loading="lazy"
                      className="aspect-[4/5] w-[42%] shrink-0 snap-start rounded-xl object-cover"
                    />
                  ))}
                </div>
              </section>
            )}
          </article>
        )}
      </main>
    </>
  );
}
