/**
 * Toca o vídeo mudo. Se o navegador bloquear o autoplay (iPhone em Modo de
 * Pouca Energia, por exemplo), avisa por onBlocked. Quem chama troca o <video>
 * por um <img> com o próprio MP4: o Safari do iOS (e o Chrome do iPhone, que
 * usa o mesmo motor) toca MP4 dentro de <img> em loop, como um GIF, mesmo
 * quando bloqueia vídeo. Fora do iPhone, tenta de novo no primeiro toque.
 */
export function playMuted(video: HTMLVideoElement, onBlocked?: () => void) {
  video.muted = true;
  video.defaultMuted = true;
  video.play().catch((err: unknown) => {
    // AbortError = a pausa (saiu da tela) interrompeu o play; não é bloqueio.
    if (err instanceof DOMException && err.name === "AbortError") return;
    if (onBlocked && canPlayMp4InImg()) {
      onBlocked();
      return;
    }
    const retry = () => {
      if (video.isConnected) video.play().catch(() => {});
    };
    document.addEventListener("touchend", retry, { once: true, passive: true });
    document.addEventListener("click", retry, { once: true });
  });
}

/** O <img> com MP4 só funciona no motor do Safari (todos os navegadores do iPhone e o Safari do Mac). */
export function canPlayMp4InImg() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const iOS = /iPhone|iPad|iPod/.test(ua) || (ua.includes("Mac") && navigator.maxTouchPoints > 1);
  const desktopSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg|Firefox/.test(ua);
  return iOS || desktopSafari;
}
