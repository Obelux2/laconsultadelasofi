/* Pétalos cayendo en el hero. Solo en la portada, y solo si el visitante no
   pidió menos movimiento en su sistema. */

const cv = document.getElementById('petals');
if (cv && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const ctx = cv.getContext('2d'); let W, H, petals = [];
  const colors = ['#E8B48E', '#DBA79A', '#9BAF8C', '#D9C08F'];
  function resize() { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight }
  addEventListener('resize', resize); resize();
  const banda = () => W * .22; // solo caen por el borde izquierdo del hero
  for (let i = 0; i < 26; i++) petals.push({ x: Math.random() * banda(), y: Math.random() * 800, r: 4 + Math.random() * 6, s: .2 + Math.random() * .5, a: Math.random() * 6.3, c: colors[i % 4] });
  (function tick() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => {
      p.y += p.s; p.x += Math.sin(p.a += .01) * .4;
      if (p.y > H + 10) { p.y = -10; p.x = Math.random() * banda() }
      ctx.globalAlpha = .6; ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r, p.r * .6, p.a, 0, 6.3); ctx.fill();
    });
    requestAnimationFrame(tick);
  })();
}
