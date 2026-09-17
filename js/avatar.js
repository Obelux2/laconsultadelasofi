/* Una sola reproducción por apertura de la portada, sin bucle ni sonido. */
(() => {
  const container = document.querySelector('[data-avatar-intro]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!container || reducedMotion.matches || navigator.connection?.saveData) return;

  let finished = false;
  let video;
  let timeout;

  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    reducedMotion.removeEventListener('change', onMotionChange);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('pagehide', finish);
    if (!video) return;
    video.pause();
    video.remove();
    video.removeAttribute('src');
    video.load();
  };
  const onMotionChange = () => { if (reducedMotion.matches) finish(); };
  const onVisibilityChange = () => { if (document.hidden) finish(); };

  const start = () => {
    if (finished || document.hidden || reducedMotion.matches) return;
    video = document.createElement('video');
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = false;
    video.preload = 'none';
    video.setAttribute('aria-hidden', 'true');
    video.setAttribute('tabindex', '-1');
    video.addEventListener('playing', () => video.classList.add('is-playing'), { once:true });
    video.addEventListener('ended', finish, { once:true });
    video.addEventListener('error', finish, { once:true });
    reducedMotion.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', finish, { once:true });
    container.append(video);
    video.src = 'assets/sofi-avatar-intro.mp4';
    // Una descarga lenta nunca sustituye permanentemente la imagen original.
    timeout = setTimeout(finish, 12000);
    video.play().catch(finish);
  };

  // Primero se carga la página; el clip no compite con los recursos iniciales.
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once:true });
})();
