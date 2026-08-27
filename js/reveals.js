/* Revela las secciones .reveal al hacer scroll. */
document.documentElement.classList.add('js-reveals');
const els = document.querySelectorAll('.reveal');
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  els.forEach(el => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
    });
  }, { threshold: .15 });
  els.forEach(el => io.observe(el));
}
