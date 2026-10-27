"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  videoUrl?: string;
  posterUrl?: string;
  alt: string;
  dimmed?: boolean;
  priority?: boolean;
  /** Selo pequeno no canto do vídeo (ex.: "Especialidade da casa"). */
  badge?: string;
};

/**
 * Mídia 4:5 do prato. Com vídeo: autoplay mudo em loop, só toca quando está
 * visível. Sem vídeo: mostra o poster. A linha fina na base indica o loop.
 */
export function DishMedia({ videoUrl, posterUrl, alt, dimmed, priority, badge }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  // Imagem provisória que não carregou vira um fundo neutro, sem ícone quebrado.
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);

    // A linha de progresso acompanha o tempo real do vídeo.
    let frame = 0;
    const tick = () => {
      if (barRef.current && video.duration) {
        barRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [videoUrl]);

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface-lowest ${
        dimmed ? "grayscale opacity-60" : ""
      }`}
    >
      {videoUrl ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={videoUrl}
          poster={posterUrl}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        />
      ) : posterUrl && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="h-full w-full object-cover"
          src={posterUrl}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setFailed(true)}
        />
      ) : posterUrl ? (
        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_40%,var(--color-highlight),transparent_70%)] opacity-60">
          <span aria-hidden className="text-7xl">🍕</span>
        </div>
      ) : null}
      {badge && (
        <span className="absolute left-3 top-3 flex h-7 items-center gap-1.5 rounded-full bg-black/55 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-highlight" />
          {badge}
        </span>
      )}
      {!dimmed && (
        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-white/20" aria-hidden>
          <div
            ref={barRef}
            className={`h-full origin-left bg-accent ${videoUrl ? "scale-x-0" : "loop-progress"}`}
          />
        </div>
      )}
    </div>
  );
}
