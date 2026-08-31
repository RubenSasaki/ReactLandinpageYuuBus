# Generación pública de rutas

La fuente de verdad es el mismo feed HTTPS configurado en la app YuuBus:

- índice: `https://raw.githubusercontent.com/RubenSasaki/rutas_oaxaca-feed/main/rutas/indice.json`
- documentos: `https://raw.githubusercontent.com/RubenSasaki/rutas_oaxaca-feed/main/rutas/<ID>.json`

`npm run build` descarga y valida el feed antes de compilar. Si una ruta activa
no cumple el contrato mínimo —incluida la ventana completa de una ruta
temporal— el build falla antes de reemplazar el último deploy bueno.

Cuando el feed es válido, el build genera dentro de `dist/`:

- `/rutas/index.html`;
- una página HTML por ruta activa y visible;
- `routes-preview.json` para el bloque pequeño de Home;
- `sitemap.xml` con todas las rutas públicas.

Los slugs se derivan del identificador canónico (`RT01` → `rt-01`) y no del
nombre mutable. Ningún token se entrega al navegador.

## Rebuild automático pendiente

Vercel ya recompila cuando cambia este repositorio. Falta configurar, en el
repositorio `rutas_oaxaca-feed`, un secreto de Deploy Hook de Vercel y llamarlo
solo después de que su validación termine correctamente. El hook y cualquier
token deben vivir en GitHub Actions/Vercel Secrets; nunca en código o JSON
público. Mientras ese permiso cross-repo no esté configurado, un rebuild puede
dispararse manualmente desde Vercel o mediante un commit sin cambios de datos
en este repositorio.
