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

/** Logo oficial do TheFork (2023), em branco sobre o verde da marca. */
function TheForkLogo() {
  return (
    <svg viewBox="0 0 956 188" height="19" width="97" fill="currentColor" aria-label="TheFork" role="img">
      <path d="M751.854 94.878C751.904 47.588 786.652 0 855.06 0c66.622 0 101.311 48.119 100.529 93.688-.907 52.826-36.12 80.152-67.664 89.977l-3.594-15.751c-1.883-8.257.354-15.624 6.194-20.83 7.552-6.733 12.044-15.057 14.383-26.569 2.473-12.17 1.311-25.526-4.177-38.867L882.073 29.18h-18.711l14.953 59.934c1.369 5.97-3.166 11.664-9.291 11.664l-18.17-79.691h-17.009l16.366 98.346c-10.251.92-14.044-5.727-14.896-10.536l-10.436-74.276h-17.277s.106 40.015.106 67.343c0 40.165 21.469 52.122 36.296 55.688 8.386 2.018 13.987 8.539 15.511 17.696L861.619 188c-31.755.081-109.853-11.738-109.765-93.122zM0 47.956h44.15v109.023h25.036V47.956h44.32V29.179H0v18.777zm149.158-18.712h-24.359v127.735h24.359v-46.688c0-23.006 15.732-37.046 29.941-37.046 9.642 0 16.747 6.259 16.747 18.946v64.788h24.359v-72.57c0-20.637-13.702-30.617-29.941-30.617-16.747 0-34.34 11.164-41.106 31.802v-56.35z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M232.092 105.554c0-25.881 16.577-51.763 50.071-51.763 27.066 0 41.444 16.409 41.444 47.196v4.736H252.56c2.707 16.071 15.055 28.757 35.862 28.757 12.518 0 25.881-4.567 36.877-13.363v23.851c-12.518 9.304-26.727 13.871-40.768 13.871-32.817 0-52.439-24.19-52.439-53.285zm66.818-11.672c0-17.085-6.936-25.543-19.961-25.543-15.563 0-24.697 11.841-26.558 25.543h46.519z" />
      <path d="M428.556 29.179h-90.838v127.8h25.205V98.365h57.175V79.589h-57.175V47.956h65.633V29.179z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M430.835 106.569c0-26.22 18.777-52.778 54.977-52.778 35.523 0 53.961 26.05 53.961 52.271 0 26.388-18.776 52.777-54.976 52.777-35.354 0-53.962-26.219-53.962-52.27zm55.653 33.494c18.608 0 28.419-14.886 28.419-32.479 0-18.438-10.657-35.016-30.787-35.016-18.607 0-28.419 14.886-28.419 32.309 0 18.608 10.657 35.186 30.787 35.186z" />
      <path d="M574.159 55.484h-22.498v101.495h24.359V95.743c5.075-12.517 17.085-19.283 29.434-19.283 6.597 0 13.533 1.86 18.777 5.582V58.19c-4.06-2.537-9.304-4.06-14.548-4.06-15.224 0-30.11 9.642-35.524 32.648V55.484zM682.444 96.46l48.298-51.43h-27.62l-42.113 43.433-.013-59.284h-24.347v127.8h24.524l-.177-52.121s40.367-.991 40.367 52.121h26.4c0-51.425-45.319-60.52-45.319-60.52z" />
    </svg>
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
    className: "bg-[#00645A] text-white",
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
