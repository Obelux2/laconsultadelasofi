/* Carga de datos desde datos/*.json.
   Si algo falla, el contenedor muestra un aviso entendible en vez de quedarse
   vacío. El detalle técnico no se muestra ni se escribe en la consola: el
   visitante no tiene nada que hacer con él. */

const AVISO_CARGA =
  '<p class="aviso-carga">No pudimos cargar esta sección. Recarga la página, ' +
  'y si sigue igual escríbele a la Sofi a ' +
  '<a href="mailto:contacto@laconsultadelasofi.cl">contacto@laconsultadelasofi.cl</a>.</p>';

/* El navegador resuelve el ancla (#botiquin) apenas parsea el HTML, cuando la
   sección todavía está vacía. Al llegar los datos la página crece y el visitante
   queda mirando el vacío. Se vuelve a posicionar, salvo que ya haya scrolleado
   por su cuenta. */
let scrollDelUsuario = false;
addEventListener('wheel', () => scrollDelUsuario = true, { once: true, passive: true });
addEventListener('touchstart', () => scrollDelUsuario = true, { once: true, passive: true });

function reubicarAncla() {
  if (scrollDelUsuario || !location.hash) return;
  // 'instant' a propósito: esto corrige un salto que el navegador ya intentó,
  // no es una navegación del visitante. Animarlo se vería como un glitch, y
  // además el scroll suave no avanza en pestañas sin foco.
  document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
}

// También al terminar de cargar: el navegador reaplica su propia posición
// cuando entran las imágenes y cuando restaura el scroll de la sesión, y eso
// pasa después de que resuelve el fetch. Sin esto, la corrección se pierde.
addEventListener('load', () => requestAnimationFrame(reubicarAncla));

async function cargarDatos(archivo, contenedorId, pintar) {
  const cont = document.getElementById(contenedorId);
  if (!cont) return;
  try {
    const respuesta = await fetch('datos/' + archivo);
    if (!respuesta.ok) throw new Error(respuesta.status);
    const datos = await respuesta.json();
    if (!Array.isArray(datos)) throw new Error('formato');
    // Una lista vacía NO es un error: que no haya talleres abiertos es normal.
    // Cada sección decide qué mostrar en ese caso; si para ella estar vacía sí
    // es una falla, que lance y cae en el aviso de abajo.
    pintar(datos, cont);
    reubicarAncla();
  } catch {
    cont.innerHTML = AVISO_CARGA;
  }
}
