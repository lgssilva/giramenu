"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { T } from "@/lib/i18n";
import { formatPrice, type Dish, type Restaurant } from "@/lib/menu";
import { useLang } from "./LangProvider";

/**
 * Pedido de delivery sem sistema próprio: o cliente monta o pedido aqui
 * (tamanho e quantidade) e envia tudo numa mensagem de WhatsApp para a pizzaria.
 * Sem pagamento online; tudo fica só no navegador.
 */

const txt = {
  add: { pt: "Adicionar", en: "Add", es: "Añadir", fr: "Ajouter" },
  inOrder: { pt: "no pedido", en: "in order", es: "en el pedido", fr: "dans la commande" },
  viewOrder: { pt: "Ver pedido", en: "View order", es: "Ver pedido", fr: "Voir la commande" },
  yourOrder: { pt: "O seu pedido", en: "Your order", es: "Su pedido", fr: "Votre commande" },
  delivery: { pt: "Entrega", en: "Delivery", es: "Entrega", fr: "Livraison" },
  pickup: { pt: "Levantar no local", en: "Pick up", es: "Recoger", fr: "À emporter" },
  name: { pt: "Nome", en: "Name", es: "Nombre", fr: "Nom" },
  address: { pt: "Morada de entrega", en: "Delivery address", es: "Dirección de entrega", fr: "Adresse de livraison" },
  notes: { pt: "Observações (opcional)", en: "Notes (optional)", es: "Observaciones (opcional)", fr: "Remarques (facultatif)" },
  notesHint: { pt: "Ex.: sem cebola, tocar à campainha 2.º esq.", en: "E.g. no onion, ring flat 2L", es: "Ej.: sin cebolla, timbre 2.º izq.", fr: "Ex. : sans oignon, sonner 2e gauche" },
  total: { pt: "Total", en: "Total", es: "Total", fr: "Total" },
  send: { pt: "Enviar pedido pelo WhatsApp", en: "Send order on WhatsApp", es: "Enviar pedido por WhatsApp", fr: "Envoyer sur WhatsApp" },
  payNote: {
    pt: "A pizzaria confirma o pedido e o pagamento pelo WhatsApp.",
    en: "The pizzeria confirms your order and payment on WhatsApp.",
    es: "La pizzería confirma el pedido y el pago por WhatsApp.",
    fr: "La pizzeria confirme la commande et le paiement sur WhatsApp.",
  },
  close: { pt: "Fechar", en: "Close", es: "Cerrar", fr: "Fermer" },
  remove: { pt: "Tirar um", en: "Remove one", es: "Quitar uno", fr: "Retirer un" },
  addOne: { pt: "Mais um", en: "Add one", es: "Uno más", fr: "Un de plus" },
  size: { pt: "Tamanho", en: "Size", es: "Tamaño", fr: "Taille" },
} satisfies Record<string, T>;

type Line = { key: string; dishId: string; sizeId?: string; qty: number };

type Ctx = {
  restaurant: Restaurant;
  lines: Line[];
  qty: (key: string) => number;
  change: (dish: Dish, sizeId: string | undefined, delta: number) => void;
  count: number;
  total: number;
};

const CartContext = createContext<Ctx | null>(null);

export const lineKey = (dishId: string, sizeId?: string) => (sizeId ? `${dishId}:${sizeId}` : dishId);

export function unitPrice(dish: Dish, sizeId?: string) {
  return dish.sizes?.find((s) => s.id === sizeId)?.price ?? dish.price;
}

export function CartProvider({ restaurant, children }: { restaurant: Restaurant; children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);

  const value = useMemo<Ctx>(() => {
    const dish = (id: string) => restaurant.dishes.find((d) => d.id === id);
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((sum, l) => {
      const d = dish(l.dishId);
      return d ? sum + unitPrice(d, l.sizeId) * l.qty : sum;
    }, 0);
    return {
      restaurant,
      lines,
      count,
      total,
      qty: (key) => lines.find((l) => l.key === key)?.qty ?? 0,
      change: (d, sizeId, delta) =>
        setLines((prev) => {
          const key = lineKey(d.id, sizeId);
          const found = prev.find((l) => l.key === key);
          if (!found) return delta > 0 ? [...prev, { key, dishId: d.id, sizeId, qty: delta }] : prev;
          return prev
            .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
            .filter((l) => l.qty > 0);
        }),
    };
  }, [lines, restaurant]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

/** Nome curto do tamanho ("Média") a partir de "Média · 30 cm". */
const shortLabel = (label: string) => label.split(" · ")[0];

/** Escolha de tamanho em 3 botões lado a lado, com o preço de cada um. */
export function SizePicker({ dish, value, onChange }: { dish: Dish; value?: string; onChange: (id: string) => void }) {
  const { t } = useLang();
  if (!dish.sizes?.length) return null;
  return (
    <div role="radiogroup" aria-label={t(txt.size)} className="grid grid-cols-3 gap-2 pt-1">
      {dish.sizes.map((s) => {
        const active = s.id === value;
        const [name, cm] = t(s.label).split(" · ");
        return (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(s.id)}
            className={`flex min-h-14 flex-col items-center justify-center rounded-xl border px-1 py-1.5 leading-tight transition-colors ${
              active ? "border-accent bg-accent/8 text-on-surface ring-1 ring-accent" : "border-hairline bg-surface-container text-on-surface-variant"
            }`}
          >
            <span className="text-[13px] font-semibold">{name}</span>
            <span className="text-[11px] opacity-80">
              {cm} · {formatPrice(s.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Ícones + e − em SVG: o caractere de texto fica desalinhado dentro do círculo. */
function Plus({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function Minus({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
      <path d="M5 12h14" />
    </svg>
  );
}

function Stepper({ qty, onMinus, onPlus, compact }: { qty: number; onMinus: () => void; onPlus: () => void; compact?: boolean }) {
  const { t } = useLang();
  const btn = `flex shrink-0 items-center justify-center rounded-full bg-accent text-on-accent active:opacity-80 ${compact ? "h-9 w-9" : "h-11 w-11"}`;
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={onMinus} aria-label={t(txt.remove)} className={btn}>
        <Minus size={compact ? 16 : 18} />
      </button>
      <span className="min-w-5 text-center text-base font-semibold tabular-nums">{qty}</span>
      <button type="button" onClick={onPlus} aria-label={t(txt.addOne)} className={btn}>
        <Plus size={compact ? 16 : 18} />
      </button>
    </div>
  );
}

/** Botão grande do card: "Adicionar ao pedido · 10,50 €" ou, já no pedido, − 2 +. */
export function AddToOrder({ dish, sizeId }: { dish: Dish; sizeId?: string }) {
  const { t } = useLang();
  const cart = useCart();
  if (!cart?.restaurant.order) return null;
  const qty = cart.qty(lineKey(dish.id, sizeId));
  const size = dish.sizes?.find((s) => s.id === sizeId);

  if (qty > 0) {
    return (
      <div className="mt-2 flex h-14 items-center justify-between rounded-xl border border-accent/40 bg-accent/8 px-2 pl-4">
        <span className="text-sm font-semibold text-on-surface">
          {qty}× {size ? shortLabel(t(size.label)) : ""} {t(txt.inOrder)}
        </span>
        <Stepper qty={qty} onMinus={() => cart.change(dish, sizeId, -1)} onPlus={() => cart.change(dish, sizeId, 1)} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => cart.change(dish, sizeId, 1)}
      className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent text-base font-semibold text-on-accent shadow-[0_6px_18px_-8px_var(--color-accent)] active:scale-[0.99] active:opacity-90"
    >
      <Plus size={20} />
      {t(cart.restaurant.order.label)} · {formatPrice(unitPrice(dish, sizeId))}
    </button>
  );
}

/** Botão pequeno das linhas compactas (bebidas). */
export function AddSmall({ dish }: { dish: Dish }) {
  const { t } = useLang();
  const cart = useCart();
  if (!cart?.restaurant.order || dish.soldOut) return null;
  const qty = cart.qty(lineKey(dish.id));
  if (qty > 0) {
    return <Stepper compact qty={qty} onMinus={() => cart.change(dish, undefined, -1)} onPlus={() => cart.change(dish, undefined, 1)} />;
  }
  return (
    <button
      type="button"
      onClick={() => cart.change(dish, undefined, 1)}
      aria-label={`${t(txt.add)}: ${dish.name}`}
      className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border-[1.5px] border-accent px-4 text-sm font-semibold text-accent active:bg-accent active:text-on-accent"
    >
      <Plus size={16} />
      {t(txt.add)}
    </button>
  );
}

/** Barra fixa no rodapé quando há itens no pedido. */
export function CartBar() {
  const { t } = useLang();
  const cart = useCart();
  const [open, setOpen] = useState(false);
  // Com o pedido aberto, fica montado até o pedido fechar sozinho (ver CartSheet).
  if (!cart || (cart.count === 0 && !open)) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[480px] px-4 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-14 w-full items-center justify-between rounded-2xl bg-accent px-4 text-on-accent shadow-[0_10px_30px_-10px_var(--color-accent)] active:opacity-90"
        >
          <span className="flex items-center gap-2.5 font-semibold">
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-highlight px-2 text-sm font-bold text-[#2b1a14]">
              {cart.count}
            </span>
            {t(txt.viewOrder)}
          </span>
          <span className="text-base font-semibold tabular-nums">{formatPrice(cart.total)}</span>
        </button>
      </div>
      {open && <CartSheet setOpen={setOpen} />}
    </>
  );
}

function CartSheet({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { t } = useLang();
  const cart = useCart()!;
  const r = cart.restaurant;
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Mesmo padrão do prato em tela cheia: o "voltar" do celular fecha.
  useEffect(() => {
    history.pushState({ sheet: "cart" }, "");
    const onPop = () => setOpen(false);
    window.addEventListener("popstate", onPop);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("popstate", onPop);
      document.body.style.overflow = overflow;
    };
  }, [setOpen]);

  // Pedido vazio (tirou tudo): fecha.
  useEffect(() => {
    if (cart.count === 0) history.back();
  }, [cart.count]);

  const items = cart.lines.flatMap((l) => {
    const d = r.dishes.find((x) => x.id === l.dishId);
    if (!d) return [];
    const size = d.sizes?.find((s) => s.id === l.sizeId);
    return [{ line: l, dish: d, size, price: unitPrice(d, l.sizeId) * l.qty }];
  });

  // A mensagem vai sempre em português para a pizzaria.
  const message = [
    `Olá, ${r.name}! Novo pedido:`,
    ...items.map(({ line, dish, size, price }) => `• ${line.qty}x ${dish.name}${size ? ` (${shortLabel(size.label.pt)})` : ""}: ${formatPrice(price)}`),
    `Total: ${formatPrice(cart.total)}`,
    "",
    mode === "delivery" ? "Entrega ao domicílio" : "Levantar no local",
    `Nome: ${name}`,
    ...(mode === "delivery" ? [`Morada: ${address}`] : []),
    ...(notes.trim() ? [`Obs.: ${notes.trim()}`] : []),
  ].join("\n");
  const href = `https://wa.me/${r.order?.whatsapp ?? ""}?text=${encodeURIComponent(message)}`;

  const input =
    "w-full rounded-xl border border-hairline bg-surface-container px-4 py-3 text-[15px] text-on-surface placeholder:text-outline focus:border-accent focus:outline-none";

  return (
    <div role="dialog" aria-modal="true" aria-label={t(txt.yourOrder)} className="fixed inset-0 z-[70] overflow-y-auto bg-surface text-on-surface">
      <div className="mx-auto max-w-[480px] px-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between pb-4">
          <h2 className="font-serif text-[1.75rem] font-semibold">{t(txt.yourOrder)}</h2>
          <button
            type="button"
            onClick={() => history.back()}
            aria-label={t(txt.close)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-high text-on-surface"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col">
          {items.map(({ line, dish, size, price }) => (
            <li key={line.key} className="flex items-center gap-3 border-b border-hairline py-3">
              {dish.posterUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={dish.posterUrl} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-serif text-lg font-medium">{dish.name}</span>
                <span className="text-[13px] text-on-surface-variant">
                  {size ? `${t(size.label)} · ` : ""}
                  {formatPrice(price)}
                </span>
              </div>
              <Stepper
                compact
                qty={line.qty}
                onMinus={() => cart.change(dish, line.sizeId, -1)}
                onPlus={() => cart.change(dish, line.sizeId, 1)}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-baseline justify-between py-4">
          <span className="text-[15px] font-semibold">{t(txt.total)}</span>
          <span className="text-2xl font-semibold text-accent-light tabular-nums">{formatPrice(cart.total)}</span>
        </div>

        {r.order?.pickup && (
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface-high p-1">
            {(["delivery", "pickup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`h-11 rounded-lg text-sm font-semibold ${mode === m ? "bg-surface-container text-on-surface shadow-sm" : "text-on-surface-variant"}`}
              >
                {t(txt[m])}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 pt-4">
          <input className={input} placeholder={t(txt.name)} aria-label={t(txt.name)} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          {mode === "delivery" && (
            <input
              className={input}
              placeholder={t(txt.address)}
              aria-label={t(txt.address)}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
            />
          )}
          <textarea
            className={`${input} min-h-20 resize-none`}
            placeholder={`${t(txt.notes)}. ${t(txt.notesHint)}`}
            aria-label={t(txt.notes)}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1f9d55] text-base font-semibold text-white shadow-[0_8px_20px_-10px_#1f9d55] active:opacity-90"
        >
          <WhatsAppIcon />
          {t(txt.send)}
        </a>
        <p className="pt-3 text-center text-[13px] text-on-surface-variant">{t(txt.payNote)}</p>
      </div>
    </div>
  );
}

export function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.43-9.41 2.52 0 4.88.98 6.66 2.76a9.35 9.35 0 0 1 2.76 6.66c0 5.19-4.23 9.41-9.43 9.41zm8.03-17.44A11.3 11.3 0 0 0 12.05.73C5.79.73.7 5.82.7 12.08c0 2 .52 3.95 1.52 5.67L.6 23.27l5.65-1.48a11.3 11.3 0 0 0 5.8 1.48h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03z" />
    </svg>
  );
}
