# Yuu Bus Landing — migración local

Migración de la landing HTML suministrada a React + Vite + Tailwind CSS.

## Estado v0.3

- Copy principal de la landing preservado.
- Componentes React separados.
- Navegación fija y estado al hacer scroll.
- Hero con mockups reales y controles manuales, sin autoplay.
- Se incorporaron las 7 capturas nuevas suministradas y se optimizaron a WebP (944×2048).
- El showcase mantiene tres teléfonos visibles a la vez y permite recorrer Inicio, Planear viaje, Destino, Opciones, Rutas, Seguir ruta y Eventos.
- Selector de cinco características actualizado con las nuevas capturas.
- Los marcos de teléfono respetan la proporción real de las capturas y ya no superponen un notch artificial.
- Micro-tilt de QR y showcase con respeto a `prefers-reduced-motion`.
- SEO base, `robots.txt`, `sitemap.xml` y `vercel.json` preparados.
- Sección de cuatro planes de patrocinio agregada con precios, beneficios y públicos objetivo suministrados.
- CTA por correo preparado mediante `SPONSOR_CONTACT_EMAIL`; falta colocar la dirección real para activarlo.
- No se incluyó ningún JSON de rutas/eventos/feed.

## Capturas incorporadas

- `public/assets/screens/inicio.webp`
- `public/assets/screens/planear-viaje-inicio.webp`
- `public/assets/screens/planear-viaje.webp`
- `public/assets/screens/opciones-viaje.webp`
- `public/assets/screens/rutas.webp`
- `public/assets/screens/seguir-ruta.webp`
- `public/assets/screens/eventos.webp`

## Pendiente porque no fue suministrado

- `landing.js` original para comparar comportamiento exacto.
- `qr-code.png`.
- Contenido original de la política de privacidad.
- Correo real que recibirá las solicitudes de patrocinio.

## Comandos

```bash
npm install
npm run lint
npm run build
npm run preview
```
