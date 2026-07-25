# laconsultadelasofi.cl

Sitio de **Sofía Vera**, terapeuta floral y energética. HTML, CSS y JS a mano:
sin build, sin dependencias, sin backend.

**En construcción.** Destino final: `laconsultadelasofi.cl`. Mientras tanto vive
en una URL provisoria de GitHub Pages y está marcado como no indexable.

## Verlo en local

```bash
python -m http.server
# http://localhost:8000
```

Tiene que servirse por HTTP: las páginas cargan su contenido con `fetch()` desde
`datos/*.json`, y eso no funciona abriendo el archivo a doble clic.

## Editar contenido

Los talleres y los episodios del podcast viven en `datos/*.json`, no en el
código. Para cambiar la cartelera de talleres se edita `datos/talleres.json`; si
queda vacío, la página lo dice en vez de mostrar una sección en blanco.

## Ojo al editar

`nav` y `footer` están duplicados en los 4 HTML — sin build no hay includes. Si
cambias uno, cambia los cuatro.
