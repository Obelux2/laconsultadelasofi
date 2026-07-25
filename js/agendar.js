/* Flujo de agenda en 3 pasos.
   ponytail: TODO esto es demo y se reemplaza por Encuadrado en HU-11. No vale
   la pena mejorarlo: la disponibilidad real sale de su agenda, no de acá. */

const tipos = ["🌼 Terapia floral", "✨ Terapia energética", "🌸 Sesión ADABA"];
const sel = { tipo: null, dia: null, hora: null };
const $ = id => document.getElementById(id);

const at = $('a-tipos');
tipos.forEach(t => {
  const b = document.createElement('button'); b.className = 'chip'; b.textContent = t; b.setAttribute('aria-pressed', 'false');
  b.onclick = () => { sel.tipo = t; [...at.children].forEach(c => c.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); paso(2) };
  at.appendChild(b);
});

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];

function buildCal() {
  const cal = $('a-cal'); cal.innerHTML = '';
  const hoy = new Date();
  $('a-mes').textContent = 'Disponibilidad de la Sofi — próximas 4 semanas (martes a viernes)';
  DIAS.forEach(d => { const s = document.createElement('span'); s.className = 'dow'; s.textContent = d; cal.appendChild(s) });
  const start = new Date(hoy); start.setDate(hoy.getDate() - ((hoy.getDay() + 6) % 7)); // lunes de esta semana
  for (let i = 0; i < 28; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const b = document.createElement('button'); b.className = 'dia'; b.textContent = d.getDate();
    b.setAttribute('aria-pressed', 'false');
    const dow = (d.getDay() + 6) % 7; // 0=lun
    const habil = dow >= 1 && dow <= 4 && d > hoy; // ponytail: disponibilidad demo fija mar–vie; la real saldrá de su agenda
    if (d.toDateString() === hoy.toDateString()) b.classList.add('hoy');
    if (!habil) { b.disabled = true }
    else b.onclick = () => {
      sel.dia = d.getDate() + ' de ' + MESES[d.getMonth()];
      [...cal.querySelectorAll('.dia')].forEach(x => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', 'true'); paso(3);
    };
    cal.appendChild(b);
  }
}

const HORAS = ['10:00', '12:00', '16:00', '18:00', '20:00'];
const ah = $('a-horas');
HORAS.forEach(h => {
  const b = document.createElement('button'); b.className = 'chip'; b.textContent = h + ' hrs'; b.setAttribute('aria-pressed', 'false');
  b.onclick = () => {
    sel.hora = h; [...ah.children].forEach(c => c.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true');
    $('c-tipo').textContent = sel.tipo; $('c-dia').textContent = sel.dia; $('c-hora').textContent = sel.hora + ' hrs';
    $('a-conf').hidden = false; $('a-conf').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    marca(4);
  };
  ah.appendChild(b);
});

function paso(n) {
  if (n >= 2) { $('a-paso2').hidden = false; if (!$('a-cal').children.length) buildCal() }
  if (n >= 3) { $('a-paso3').hidden = false; $('a-paso3').scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }
  marca(n);
}

function marca(n) {
  document.querySelectorAll('.paso').forEach(p => {
    const i = +p.dataset.p;
    p.classList.toggle('done', i < n); p.classList.toggle('now', i === n);
  });
}

marca(1);
$('a-reset').onclick = () => {
  sel.tipo = sel.dia = sel.hora = null;
  ['a-paso2', 'a-paso3', 'a-conf'].forEach(id => $(id).hidden = true);
  document.querySelectorAll('#a-tipos .chip, #a-horas .chip, .dia').forEach(c => c.setAttribute('aria-pressed', 'false'));
  marca(1); $('a-paso1').scrollIntoView({ behavior: 'smooth' });
};
