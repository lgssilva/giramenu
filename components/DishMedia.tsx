"use client";

import { useEffect, useRef } from "react";

type Props = {
  videoUrl?: string;
  posterUrl?: string;
  alt: string;
  dimmed?: boolean;
  priority?: boolean;
};

/**
 * Mídia 4:5 do prato. Com vídeo: autoplay mudo em loop, só toca quando está
 * visível. Sem vídeo: mostra o poster. A linha fina na base indica o loop.
 */
export function DishMedia({ videoUrl, posterUrl, alt, dimmed, priority }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

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
      ) : posterUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="h-full w-full object-cover"
          src={posterUrl}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      ) : null}
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
