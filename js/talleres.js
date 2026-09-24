/* Fichas de talleres.
   La lista vacía es un estado normal —no siempre hay talleres abiertos— y se
   resuelve diciéndolo, no escondiendo la sección.
   El botón de inscripción lleva a un canal real: no existe inscripción que
   ocurra dentro del sitio. */

// Inscripción por WhatsApp de Sofía, igual que el agendamiento (regla de
// negocio en CLAUDE.md del proyecto).
const WHATSAPP = 'https://wa.me/56928192203?text=';

function textoCupos(n) {
  if (typeof n !== 'number') return '';
  if (n === 99) return 'Cupos ilimitados';
  if (n <= 0) return 'Cupos agotados';
  return n + ' cupos' + (n <= 4 ? ' — ¡quedan pocos!' : ' disponibles');
}

cargarDatos('talleres.json', 'lista-talleres', (talleres, lista) => {
  if (!talleres.length) {
    lista.innerHTML =
      `<p class="aviso-vacio">Ahora mismo no hay talleres abiertos. Los próximos
       se anuncian en
       <a href="https://www.instagram.com/laconsultadelasofi/" target="_blank" rel="noopener">Instagram</a>
       y en el <a href="escuchame.html">podcast</a> — o escríbele a la Sofi y te
       avisa cuando se abra el siguiente.</p>`;
    return;
  }

  talleres.forEach(t => {
    const d = document.createElement('div'); d.className = 'card taller-card';
    // Fecha, hora, frecuencia, precio y cupos son opcionales e independientes:
    // lo que no existe todavía no se muestra, en vez de inventarlo.
    const cuando = [
      t.fecha && `<span>📅 <b>${t.fecha}</b></span>`,
      t.frecuencia && `<span>📅 <b>${t.frecuencia}</b></span>`,
      t.hora && `<span>🕗 ${t.hora}</span>`,
    ].filter(Boolean).join('');
    const cupos = textoCupos(t.cupos);
    // typeof: null <= 0 es true en JS y marcaría agotado lo que no trae cupos
    const agotado = typeof t.cupos === 'number' && t.cupos <= 0;
    const pocos = agotado || (t.cupos > 0 && t.cupos <= 4);
    const valor = [
      t.precio && `<span class="precio">${t.precio}</span>`,
      cupos && `<span class="cupos ${pocos ? 'pocos' : ''}">${cupos}</span>`,
    ].filter(Boolean).join('');
    const mensaje = encodeURIComponent(
      (agotado ? 'Hola Sofi, avísame del próximo: ' : 'Hola Sofi, quiero inscribirme en: ') + t.nom);
    // Con página propia (url), la ficha lleva ahí y la inscripción se ofrece
    // desde esa página.
    d.innerHTML = `<span class="tag">${t.tag}</span><h3>${t.nom}</h3>
      <p>${t.desc}</p>
      ${cuando && `<div class="meta">${cuando}</div>`}
      ${valor && `<div class="meta">${valor}</div>`}
      ${t.url
        ? `<a class="btn primary small" href="${t.url}">Ver el curso</a>`
        : `<a class="btn primary small" href="${WHATSAPP}${mensaje}" target="_blank" rel="noopener">${agotado ? 'Avísame del próximo' : 'Inscribirme'}</a>`}`;
    lista.appendChild(d);
  });
});
