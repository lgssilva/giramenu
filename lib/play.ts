/**
 * Toca o vídeo mudo. Se o navegador bloquear o autoplay (ex.: iPhone em
 * Modo de Pouca Energia), tenta de novo no primeiro toque da pessoa na tela,
 * que conta como gesto e libera o vídeo.
 */
export function playMuted(video: HTMLVideoElement) {
  video.muted = true;
  video.play().catch(() => {
    const retry = () => {
      if (video.isConnected) video.play().catch(() => {});
    };
    document.addEventListener("touchend", retry, { once: true, passive: true });
    document.addEventListener("click", retry, { once: true });
  });
}
