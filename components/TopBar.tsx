"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LANG_NAMES, LANGS, ui } from "@/lib/i18n";
import { useLang } from "./LangProvider";

export function TopBar({ name, backHref }: { name: string; backHref?: string }) {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-1">
          {backHref && (
            <Link
              href={backHref}
              aria-label={t(ui.back)}
              className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-on-surface"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
          )}
          <span className="truncate font-serif text-lg font-medium tracking-wide">{name}</span>
        </div>

        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={t(ui.chooseLang)}
            className="flex h-11 items-center gap-1.5 rounded-full bg-surface-high px-3.5 text-[13px] font-semibold tracking-wide"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
            </svg>
            {lang.toUpperCase()}
            <span aria-hidden className="text-[10px] opacity-70">▾</span>
          </button>
          {open && (
            <ul
              role="listbox"
              className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-hairline bg-surface-high py-1"
            >
              {LANGS.map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={l === lang}
                    onClick={() => {
                      setLang(l);
                      setOpen(false);
                    }}
                    className={`flex h-11 w-full items-center justify-between px-4 text-left text-sm ${
                      l === lang ? "bg-accent/30 text-on-surface" : "text-on-surface-variant"
                    }`}
                  >
                    {LANG_NAMES[l]}
                    {l === lang && <span aria-hidden>✓</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
