/* Fichas de talleres.
   La lista vacía es un estado normal —no siempre hay talleres abiertos— y se
   resuelve diciéndolo, no escondiendo la sección.
   El botón de inscripción lleva a un canal real: no existe inscripción que
   ocurra dentro del sitio. */

const CORREO = 'contacto@laconsultadelasofi.cl';

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
    const pocos = t.cupos <= 4 && t.cupos < 99;
    const asunto = encodeURIComponent('Quiero inscribirme: ' + t.nom);
    d.innerHTML = `<span class="tag">${t.tag}</span><h3>${t.nom}</h3>
      <p>${t.desc}</p>
      <div class="meta"><span>📅 <b>${t.fecha}</b></span><span>🕗 ${t.hora}</span></div>
      <div class="meta"><span class="precio">${t.precio}</span>
        <span class="cupos ${pocos ? 'pocos' : ''}">${t.cupos === 99 ? 'Cupos ilimitados' : (t.cupos + ' cupos' + (pocos ? ' — ¡quedan pocos!' : ' disponibles'))}</span></div>
      <a class="btn primary small" href="mailto:${CORREO}?subject=${asunto}">Inscribirme</a>`;
    lista.appendChild(d);
  });
});
