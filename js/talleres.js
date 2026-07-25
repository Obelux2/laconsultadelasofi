/* Fichas de talleres.
   ponytail: la inscripción sigue siendo simulada — se conecta a un canal real
   en HU-16. Mientras tanto el badge "demo" de talleres.html lo dice. */

cargarDatos('talleres.json', 'lista-talleres', (talleres, lista) => {
  talleres.forEach(t => {
    const d = document.createElement('div'); d.className = 'card taller-card';
    const pocos = t.cupos <= 4 && t.cupos < 99;
    d.innerHTML = `<span class="tag">${t.tag}</span><h3>${t.nom}</h3>
      <p>${t.desc}</p>
      <div class="meta"><span>📅 <b>${t.fecha}</b></span><span>🕗 ${t.hora}</span></div>
      <div class="meta"><span class="precio">${t.precio}</span>
        <span class="cupos ${pocos ? 'pocos' : ''}">${t.cupos === 99 ? 'Cupos ilimitados' : (t.cupos + ' cupos' + (pocos ? ' — ¡quedan pocos!' : ' disponibles'))}</span></div>
      <button class="btn primary small">Inscribirme</button>
      <div class="inscrito" hidden>🌼 <b>¡Lista tu inscripción (demo)!</b> En el sitio real recibirías el correo de bienvenida con el enlace de pago y el acceso a la sesión.</div>`;
    d.querySelector('button').onclick = ev => {
      ev.target.disabled = true; ev.target.textContent = 'Inscrita ✓';
      d.querySelector('.inscrito').hidden = false;
    };
    lista.appendChild(d);
  });
});
