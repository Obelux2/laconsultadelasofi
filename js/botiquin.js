/* Botiquín emocional: elegir un estado muestra la esencia que lo acompaña. */

cargarDatos('esencias.json', 'chips', (esencias, chips) => {
  if (!esencias.length) throw new Error('sin esencias');  // acá vacío sí es falla
  const receta = document.getElementById('receta');
  esencias.forEach(e => {
    const b = document.createElement('button');
    b.className = 'chip'; b.textContent = e.emo; b.setAttribute('aria-pressed', 'false');
    b.onclick = () => {
      [...chips.children].forEach(c => c.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', 'true');
      document.getElementById('r-sistema').textContent = e.sis;
      document.getElementById('r-esencia').textContent = '🌸 ' + e.nom;
      document.getElementById('r-desc').textContent = e.desc;
      receta.hidden = false;
    };
    chips.appendChild(b);
  });
});
