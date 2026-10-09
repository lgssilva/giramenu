"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ui } from "@/lib/i18n";
import { dishesIn, formatPrice, type Dish, type Restaurant } from "@/lib/menu";
import { AllergenChips } from "./AllergenChips";
import { DishMedia } from "./DishMedia";
import { useLang } from "./LangProvider";
import { TopBar } from "./TopBar";

export function Menu({ restaurant: r }: { restaurant: Restaurant }) {
  const { t } = useLang();
  const signature = r.dishes.find((d) => d.id === r.signatureDishId);
  const [active, setActive] = useState(r.categories[0]?.id);
  const chipsRef = useRef<HTMLDivElement>(null);

  // Marca o chip da categoria que está no ecrã.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id.replace("cat-", ""));
      },
      { rootMargin: "-140px 0px -60% 0px" },
    );
    r.categories.forEach((c) => {
      const el = document.getElementById(`cat-${c.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [r.categories]);

  useEffect(() => {
    chipsRef.current
      ?.querySelector(`[data-chip="${active}"]`)
      ?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const goTo = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 136, behavior: "smooth" });
  };

  return (
    <>
      <TopBar name={r.name} />

      <main className="flex-1 pb-10">
        {signature && (
          <section className="px-4 pt-4">
            <Link href={`/r/${r.slug}/prato/${signature.id}`} className="block">
              <DishMedia videoUrl={signature.videoUrl} posterUrl={signature.posterUrl} alt={signature.name} priority />
              <div className="flex flex-col gap-1.5 pt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h1 className="font-serif text-[2rem] font-semibold leading-tight">{signature.name}</h1>
                  <span className="whitespace-nowrap text-xl font-semibold text-accent-light">
                    {formatPrice(signature.price)}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-on-surface-variant">{t(signature.description)}</p>
                <div className="pt-1">
                  <AllergenChips allergens={signature.allergens} />
                </div>
              </div>
            </Link>
          </section>
        )}

        <nav
          aria-label={t(ui.categories)}
          className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-40 mt-6 bg-surface/90 py-2 backdrop-blur-md"
        >
          <div ref={chipsRef} className="no-scrollbar flex gap-2 overflow-x-auto px-4">
            {r.categories.map((c) => {
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  data-chip={c.id}
                  type="button"
                  onClick={() => goTo(c.id)}
                  aria-current={isActive}
                  className={`flex min-h-11 shrink-0 items-center rounded-full border px-5 text-[13px] font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "border-accent bg-accent text-on-surface"
                      : "border-hairline bg-surface-low text-on-surface-variant"
                  }`}
                >
                  {t(c.name)}
                </button>
              );
            })}
          </div>
        </nav>

        {r.categories.map((c) => (
          <section key={c.id} id={`cat-${c.id}`} className="px-4 pt-6">
            <h2 className="pb-4 font-serif text-xl font-medium">{t(c.name)}</h2>
            <div className="flex flex-col gap-6">
              {dishesIn(r, c.id).map((d) =>
                d.posterUrl || d.videoUrl ? (
                  <DishCard key={d.id} dish={d} slug={r.slug} />
                ) : (
                  <DishRow key={d.id} dish={d} slug={r.slug} />
                ),
              )}
            </div>
          </section>
        ))}

        <EndOfMenu restaurant={r} />
      </main>
    </>
  );
}

function SoldOut() {
  const { t } = useLang();
  return (
    <span className="inline-flex h-6 items-center rounded-md bg-surface-high px-2 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
      {t(ui.soldOut)}
    </span>
  );
}

function DishCard({ dish: d, slug }: { dish: Dish; slug: string }) {
  const { t } = useLang();
  return (
    <Link
      href={`/r/${slug}/prato/${d.id}`}
      className={`block rounded-xl bg-surface-container p-4 ${d.soldOut ? "opacity-70" : ""}`}
    >
      <DishMedia videoUrl={d.videoUrl} posterUrl={d.posterUrl} alt={d.name} dimmed={d.soldOut} />
      <div className="flex flex-col gap-1.5 pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className={`font-serif text-[1.625rem] font-semibold leading-tight ${d.soldOut ? "text-on-surface-variant" : ""}`}>
            {d.name}
          </h3>
          <span className="whitespace-nowrap text-xl font-semibold">{formatPrice(d.price)}</span>
        </div>
        {d.soldOut && (
          <div>
            <SoldOut />
          </div>
        )}
        <p className="text-sm leading-snug text-on-surface-variant">{t(d.short)}</p>
        <div className="pt-1">
          <AllergenChips allergens={d.allergens} />
        </div>
      </div>
    </Link>
  );
}

/** Item sem vídeo (bebidas, extras): linha compacta, sem mídia. */
function DishRow({ dish: d }: { dish: Dish; slug: string }) {
  const { t } = useLang();
  return (
    <div className={`flex flex-col gap-1.5 border-b border-hairline pb-5 ${d.soldOut ? "opacity-60" : ""}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-lg font-medium">{d.name}</h3>
        <span className="whitespace-nowrap text-[17px] font-semibold">{formatPrice(d.price)}</span>
      </div>
      {d.soldOut && (
        <div>
          <SoldOut />
        </div>
      )}
      <p className="text-sm leading-snug text-on-surface-variant">{t(d.short)}</p>
      <AllergenChips allergens={d.allergens} />
    </div>
  );
}

function EndOfMenu({ restaurant: r }: { restaurant: Restaurant }) {
  const { t } = useLang();
  return (
    <section className="flex flex-col items-center gap-6 px-4 pt-14 text-center">
      <div className="flex flex-col items-center gap-1">
        <svg width="72" height="18" viewBox="0 0 72 18" fill="none" aria-hidden className="text-accent-light">
          <path d="M1 12c8-8 16-8 24 0s16 8 24 0 14-8 22-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="font-serif text-2xl font-semibold uppercase tracking-[0.12em] text-accent-light">{r.name}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">{r.tagline}</span>
      </div>

      <div className="w-full rounded-xl bg-surface-container px-6 py-8">
        <h2 className="font-serif text-[1.75rem] font-semibold">{t(ui.thanks)}</h2>
        <div className="mx-auto my-4 h-1 w-14 rounded-full bg-accent" />
        <p className="text-[15px] leading-relaxed text-on-surface-variant">{t(ui.thanksLine)}</p>
      </div>

      <a
        href={r.googleReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-semibold text-on-surface"
      >
        <span aria-hidden className="text-[#f4c542]">★</span>
        {t(ui.review)}
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-11 items-center gap-2 rounded-full bg-surface-container px-5 text-sm text-on-surface-variant"
      >
        <span aria-hidden>↑</span>
        {t(ui.backToTop)}
      </button>

      <p className="pt-4 pb-[env(safe-area-inset-bottom)] text-[13px] text-outline">
        Menu &amp; video by{" "}
        <a href="https://giramenu.pt" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant underline-offset-4 hover:underline">
          Gira Menu
        </a>
      </p>
    </section>
  );
}
