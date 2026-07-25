/* Radioteca: cada episodio es un dial que lleva a su capítulo en YouTube. */

cargarDatos('episodios.json', 'lista-episodios', (episodios, lista) => {
  if (!episodios.length) throw new Error('sin episodios');  // acá vacío sí es falla
  episodios.forEach(e => {
    const a = document.createElement('a');
    a.className = 'card dial-card';
    a.href = e.url;
    a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = `<span class="freq">${e.f}</span><h3>${e.nom}</h3><span class="dur">${e.dur}</span>
      <div class="dial-line"><i style="left:${e.pos}%"></i></div>`;
    lista.appendChild(a);
  });
});
