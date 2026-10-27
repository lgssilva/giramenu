"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ui } from "@/lib/i18n";
import { dishesIn, formatPrice, type Dish, type Restaurant } from "@/lib/menu";
import { AllergenChips } from "./AllergenChips";
import { DishMedia } from "./DishMedia";
import { ReviewButtons } from "./ReviewButtons";
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
      { rootMargin: "-168px 0px -60% 0px" },
    );
    r.categories.forEach((c) => {
      const el = document.getElementById(`cat-${c.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [r.categories]);

  // Centraliza o chip ativo rolando só a faixa de chips. scrollIntoView rolaria
  // a página também e interromperia o "Voltar ao início" no meio do caminho.
  useEffect(() => {
    const bar = chipsRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!bar || !chip) return;
    bar.scrollTo({ left: chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const goTo = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 158, behavior: "smooth" });
  };

  // Cores e tema do restaurante sobrescrevem os tokens do globals.css.
  const vars = {
    "--color-accent": r.accent,
    ...(r.accentText && { "--color-accent-light": r.accentText }),
    ...(r.highlight && { "--color-highlight": r.highlight }),
  } as CSSProperties;
  const canOrder = (d: Dish) => Boolean(r.order) && !d.soldOut && !r.categories.find((c) => c.id === d.category)?.compact;

  return (
    <div data-theme={r.theme ?? "dark"} style={vars} className="flex min-h-dvh flex-col bg-surface text-on-surface">
      <TopBar name={r.name} tagline={r.tagline} />

      <main className="flex-1 pb-10">
        {signature && (
          <section className="px-4 pt-4">
            <div>
              <DishMedia
                videoUrl={signature.videoUrl}
                posterUrl={signature.posterUrl}
                alt={signature.name}
                badge={t(ui.signature)}
                priority
              />
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
                {canOrder(signature) && <OrderButton restaurant={r} dish={signature} />}
              </div>
            </div>
          </section>
        )}

        <nav
          aria-label={t(ui.categories)}
          className="sticky top-[calc(4.5rem+env(safe-area-inset-top))] z-40 mt-6 border-b border-hairline bg-surface/90 py-3.5 backdrop-blur-md"
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
                      ? "border-accent bg-accent text-on-accent"
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
                !c.compact && !d.soldOut && (d.posterUrl || d.videoUrl) ? (
                  <DishCard key={d.id} dish={d} restaurant={r} canOrder={canOrder(d)} />
                ) : (
                  <DishRow key={d.id} dish={d} restaurant={r} />
                ),
              )}
            </div>
          </section>
        ))}

        <EndOfMenu restaurant={r} />
      </main>
    </div>
  );
}

/** Mensagem que chega no WhatsApp da pizzaria, sempre em português. */
function orderLink(r: Restaurant, d: Dish) {
  const text = `Olá, ${r.name}! Quero pedir:\n• 1x ${d.name} (${formatPrice(d.price)})\n\nNome:\nMorada de entrega:`;
  return `https://wa.me/${r.order?.whatsapp ?? ""}?text=${encodeURIComponent(text)}`;
}

/** Botão de pedido: abre o WhatsApp da pizzaria com a mensagem pronta. */
function OrderButton({ restaurant: r, dish: d }: { restaurant: Restaurant; dish: Dish }) {
  const { t } = useLang();
  if (!r.order) return null;
  return (
    <a
      href={orderLink(r, d)}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-accent text-base font-semibold text-on-accent shadow-[0_6px_18px_-8px_var(--color-accent)] active:scale-[0.99] active:opacity-90"
    >
      <WhatsAppIcon />
      {t(r.order.label)}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.43-9.41 2.52 0 4.88.98 6.66 2.76a9.35 9.35 0 0 1 2.76 6.66c0 5.19-4.23 9.41-9.43 9.41zm8.03-17.44A11.3 11.3 0 0 0 12.05.73C5.79.73.7 5.82.7 12.08c0 2 .52 3.95 1.52 5.67L.6 23.27l5.65-1.48a11.3 11.3 0 0 0 5.8 1.48h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03z" />
    </svg>
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

/** Card do prato. Tocar abre o prato em tela cheia (DishSheet). */
function DishCard({ dish: d, restaurant: r, canOrder }: { dish: Dish; restaurant: Restaurant; canOrder: boolean }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl bg-surface-container p-4 shadow-[0_1px_0_var(--color-hairline)]">
      <button type="button" onClick={() => setOpen(true)} className="block w-full text-left">
        <DishMedia videoUrl={d.videoUrl} posterUrl={d.posterUrl} alt={d.name} />
        <div className="flex flex-col gap-1.5 pt-3">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-[1.625rem] font-semibold leading-tight">{d.name}</h3>
            <span className="whitespace-nowrap text-xl font-semibold">{formatPrice(d.price)}</span>
          </div>
          <p className="text-sm leading-snug text-on-surface-variant">{t(d.short)}</p>
          <div className="pt-0.5">
            <AllergenChips allergens={d.allergens} />
          </div>
          {!canOrder && (
            <span className="flex h-11 items-center justify-center gap-1.5 pt-1 text-[13px] font-semibold text-accent-light">
              {t(ui.more)}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          )}
        </div>
      </button>
      {canOrder && <OrderButton restaurant={r} dish={d} />}
      {open && <DishSheet dish={d} restaurant={r} canOrder={canOrder} onClose={() => setOpen(false)} />}
    </div>
  );
}

/**
 * Linha compacta (bebidas, ou item sem mídia). Com mídia, mostra uma miniatura
 * com o vídeo em loop; tocar abre o item em tela cheia por cima da lista.
 */
function DishRow({ dish: d, restaurant: r }: { dish: Dish; restaurant: Restaurant }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const hasMedia = !d.soldOut && Boolean(d.videoUrl || d.posterUrl);

  const content = (
    <>
      {hasMedia && <Thumb dish={d} />}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
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
    </>
  );

  const rowClass = `flex w-full items-start gap-4 border-b border-hairline pb-5 text-left ${d.soldOut ? "opacity-60" : ""}`;
  if (!hasMedia) return <div className={rowClass}>{content}</div>;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={rowClass}>
        {content}
      </button>
      {open && <DishSheet dish={d} restaurant={r} canOrder={false} onClose={() => setOpen(false)} />}
    </>
  );
}

/**
 * Item em tela cheia por cima do menu. O "voltar" do celular também fecha,
 * e a lista continua na mesma posição.
 */
function DishSheet({
  dish: d,
  restaurant: r,
  canOrder,
  onClose,
}: {
  dish: Dish;
  restaurant: Restaurant;
  canOrder: boolean;
  onClose: () => void;
}) {
  const { t } = useLang();

  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    history.pushState({ sheet: d.id }, "");
    const onPop = () => closeRef.current();
    window.addEventListener("popstate", onPop);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("popstate", onPop);
      document.body.style.overflow = overflow;
    };
  }, [d.id]);

  return (
    <div role="dialog" aria-modal="true" aria-label={d.name} className="fixed inset-0 z-[60] overflow-y-auto bg-surface text-on-surface">
      <div className="mx-auto max-w-[480px] px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]">
        <div className="flex justify-end pb-3">
          <button
            type="button"
            onClick={() => history.back()}
            aria-label={t(ui.less)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-on-surface"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <DishMedia videoUrl={d.videoUrl} posterUrl={d.posterUrl} alt={d.name} dimmed={d.soldOut} priority />
        <div className="flex flex-col gap-2 pt-4">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-serif text-[1.75rem] font-semibold leading-tight">{d.name}</h2>
            <span className="whitespace-nowrap text-xl font-semibold text-accent-light">{formatPrice(d.price)}</span>
          </div>
          {d.soldOut && (
            <div>
              <SoldOut />
            </div>
          )}
          <p className="text-[15px] leading-relaxed text-on-surface-variant">{t(d.description)}</p>
          {canOrder && <OrderButton restaurant={r} dish={d} />}
          {d.allergens.length > 0 && (
            <>
              <h3 className="pt-3 text-[12px] font-semibold uppercase tracking-[0.1em]">{t(ui.allergens)}</h3>
              <AllergenChips allergens={d.allergens} size="md" />
            </>
          )}
        </div>
        {d.gallery && d.gallery.length > 0 && (
          <div className="no-scrollbar -mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4">
            {d.gallery.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`${d.name} ${i + 1}`}
                loading="lazy"
                className="aspect-[4/5] w-[40%] shrink-0 snap-start rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Miniatura 4:5. Com vídeo, toca mudo em loop só quando está visível. */
function Thumb({ dish: d }: { dish: Dish }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const className = "aspect-[4/5] w-[76px] shrink-0 rounded-lg bg-surface-container object-cover";
  if (!d.videoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={d.posterUrl} alt={d.name} loading="lazy" className={className} />;
  }
  return (
    <video
      ref={ref}
      src={d.videoUrl}
      poster={d.posterUrl}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={d.name}
      className={className}
    />
  );
}

function EndOfMenu({ restaurant: r }: { restaurant: Restaurant }) {
  const { t } = useLang();
  return (
    <section className="flex flex-col items-center gap-6 px-4 pt-14 text-center">
      <div className="flex flex-col items-center gap-1">
        <svg width="72" height="18" viewBox="0 0 72 18" fill="none" aria-hidden className="text-highlight">
          <path d="M1 12c8-8 16-8 24 0s16 8 24 0 14-8 22-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="font-serif text-2xl font-semibold uppercase tracking-[0.12em] text-accent-light">{r.name}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">{r.tagline}</span>
      </div>

      <div className="w-full rounded-xl bg-surface-container px-6 py-8">
        <h2 className="font-serif text-[1.75rem] font-semibold">{t(r.thanks ?? ui.thanks)}</h2>
        <div className="mx-auto my-4 h-1 w-14 rounded-full bg-accent" />
        <p className="text-[15px] leading-relaxed text-on-surface-variant">{t(r.thanksLine ?? ui.thanksLine)}</p>
      </div>

      <ReviewButtons links={r.reviewLinks} />

      <button
        type="button"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          // Garantia para o Safari, que às vezes para a rolagem suave no meio.
          setTimeout(() => {
            if (window.scrollY > 0) window.scrollTo({ top: 0 });
          }, 1200);
        }}
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
