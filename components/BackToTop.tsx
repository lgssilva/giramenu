"use client";

import { useEffect, useState } from "react";
import { ui } from "@/lib/i18n";
import { useLang } from "./LangProvider";

/**
 * Seta redonda no canto inferior direito que volta ao topo.
 * Só aparece quando a pessoa já desceu e parou de rolar, para não ficar
 * por cima do vídeo ou do texto enquanto ela lê. Some ao voltar a rolar.
 * raised: sobe a seta para não cobrir uma barra fixa no rodapé (ex.: "Ver pedido").
 */
export function BackToTop({ raised }: { raised?: boolean }) {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setShow(false);
      clearTimeout(timer);
      timer = setTimeout(() => setShow(window.scrollY > window.innerHeight * 1.5), 700);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  const toTop = () => {
    setShow(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Garantia para o Safari, que às vezes para a rolagem suave no meio.
    setTimeout(() => {
      if (window.scrollY > 0) window.scrollTo({ top: 0 });
    }, 1200);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px]">
      <button
        type="button"
        onClick={toTop}
        aria-label={t(ui.backToTop)}
        tabIndex={show ? 0 : -1}
        className={`absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-high/90 text-on-surface shadow-[0_6px_20px_-6px_rgba(0,0,0,0.45)] ring-1 ring-hairline backdrop-blur-md transition-all duration-300 ${
          raised ? "bottom-[calc(5.5rem+env(safe-area-inset-bottom))]" : "bottom-[calc(1.25rem+env(safe-area-inset-bottom))]"
        } ${show ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
