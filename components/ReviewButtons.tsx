"use client";

import type { ReactNode } from "react";
import { ui, type T } from "@/lib/i18n";
import type { ReviewLink, ReviewPlatform } from "@/lib/menu";
import { useLang } from "./LangProvider";

/** "G" oficial em 4 cores (mesmo desenho do botão "Fazer login com o Google"). */
function GoogleLogo() {
  return (
    <svg viewBox="0 0 262 262" width="22" height="22" aria-hidden>
      <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
      <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
      <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
      <path fill="#EA4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
    </svg>
  );
}

/** Ollie, a coruja do Tripadvisor, em preto sobre o verde da marca (como pede o guia de marca). */
function TripadvisorLogo() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
      <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z" />
    </svg>
  );
}

/**
 * PROVISÓRIO: TheFork não tem logo em bibliotecas abertas. Trocar pelo SVG
 * oficial (kit de marca do TheFork Manager) antes de ir para um cliente.
 */
function TheForkLogo() {
  return (
    <span aria-hidden className="font-sans text-[17px] font-extrabold tracking-tight">
      TheFork
    </span>
  );
}

/** logoAfter: o logo é a própria palavra (ex.: "Avaliar no" + TheFork). */
const PLATFORMS: Record<ReviewPlatform, { label: T; logo: ReactNode; className: string; logoAfter?: boolean }> = {
  google: {
    label: ui.reviewGoogle,
    logo: <GoogleLogo />,
    // Botão branco com o "G" colorido: padrão do próprio Google.
    className: "bg-white text-[#1f1f1f]",
  },
  tripadvisor: {
    label: ui.reviewTripadvisor,
    logo: <TripadvisorLogo />,
    className: "bg-[#34E0A1] text-black",
  },
  thefork: {
    label: ui.reviewTheFork,
    logo: <TheForkLogo />,
    logoAfter: true,
    // PROVISÓRIO: confirmar o verde oficial no kit de marca do TheFork.
    className: "bg-[#00665C] text-white",
  },
};

/** Botões de avaliação. Mostra só as plataformas com link, na ordem do restaurante. */
export function ReviewButtons({ links }: { links: ReviewLink[] }) {
  const { t } = useLang();
  const shown = links.filter((l) => l.url);
  if (!shown.length) return null;

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">{t(ui.reviewTitle)}</p>
      {shown.map((l) => {
        const p = PLATFORMS[l.platform];
        return (
          <a
            key={l.platform}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-14 w-full items-center justify-center gap-2.5 rounded-xl text-[15px] font-semibold active:opacity-80 ${p.className}`}
          >
            {!p.logoAfter && p.logo}
            <span>{t(p.label)}</span>
            {p.logoAfter && p.logo}
          </a>
        );
      })}
    </div>
  );
}
