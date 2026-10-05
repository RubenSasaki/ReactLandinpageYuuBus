// Recovered mechanically from deployment dpl_J2mpCMASbFiwcnUZZs6yATF73fDf.
// Behavior is preserved from emitted JavaScript. Original TypeScript types, local names and comments are unavailable.
import { t as e } from "./preload-helper.js";
import { u, d, r, ne, T } from "./react-runtime.js";
import "./theme.css";
function installNavigation(e = document, t = window) {
  let n = [...e.querySelectorAll(`details.nav-more`)],
    r = !0,
    i = () => {
      r = !1;
    },
    a = () => {
      if (r)
        try {
          let n = decodeURIComponent(t.location.hash.slice(1));
          n &&
            e.getElementById(n)?.scrollIntoView({
              behavior: `instant`,
              block: `start`,
            });
        } catch {}
    },
    o = t.requestAnimationFrame?.(a);
  (t.addEventListener(`yuubus:content-ready`, a),
    e.addEventListener(`wheel`, i, {
      passive: !0,
    }),
    e.addEventListener(`pointerdown`, i),
    e.addEventListener(`keydown`, i));
  let s = [],
    c = (e, t = !1) => {
      if (!e.open) return;
      let n = e.querySelector(`summary`);
      (t && n?.focus(),
        (e.open = !1),
        n?.setAttribute(`aria-expanded`, `false`));
    },
    l = () => n.forEach((t) => c(t, t.contains(e.activeElement)));
  n.forEach((e, t) => {
    let r = e.querySelector(`summary`),
      i = e.querySelector(`.nav-more-menu`);
    if (!r || !i) return;
    ((i.id ||= `secondary-navigation-${t}`),
      r.setAttribute(`aria-controls`, i.id),
      (e.open = !1),
      r.setAttribute(`aria-expanded`, `false`));
    let a = () => {
      (r.setAttribute(`aria-expanded`, String(e.open)),
        e.open &&
          n.forEach((t) => {
            t !== e && c(t);
          }));
    };
    (e.addEventListener(`toggle`, a),
      s.push(() => e.removeEventListener(`toggle`, a)));
  });
  let u = (t) => {
      let r = t.target;
      n.forEach((t) => {
        (!r || !t.contains(r)) && c(t, t.contains(e.activeElement));
      });
    },
    d = (t) => {
      let r = t.target;
      r instanceof Element &&
        (r.closest(`a[href]`)
          ? n.forEach((t) => c(t, t.contains(e.activeElement)))
          : u(t));
    },
    f = (t) => {
      t.key !== `Escape` ||
        !n.some((e) => e.open) ||
        (t.preventDefault(),
        n.forEach((t) => c(t, t.contains(e.activeElement))));
    };
  (e.addEventListener(`pointerdown`, u),
    e.addEventListener(`click`, d),
    e.addEventListener(`focusin`, u),
    e.addEventListener(`keydown`, f));
  let p = [`popstate`, `hashchange`, `pagehide`, `pageshow`];
  p.forEach((e) => t.addEventListener(e, l));
  let m = t.matchMedia(`(max-width: 720px)`);
  return (
    m.addEventListener(`change`, l),
    () => {
      (o !== void 0 && t.cancelAnimationFrame(o),
        t.removeEventListener(`yuubus:content-ready`, a),
        e.removeEventListener(`wheel`, i),
        e.removeEventListener(`pointerdown`, i),
        e.removeEventListener(`keydown`, i),
        s.forEach((e) => e()),
        e.removeEventListener(`pointerdown`, u),
        e.removeEventListener(`click`, d),
        e.removeEventListener(`focusin`, u),
        e.removeEventListener(`keydown`, f),
        p.forEach((e) => t.removeEventListener(e, l)),
        m.removeEventListener(`change`, l));
    }
  );
}
var p = `1262029865535833`,
  m = `yuubus_measurement_consent`;
function h() {
  let e = new URLSearchParams(window.location.search),
    t = {};
  for (let n of [`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`]) {
    let r = e.get(n);
    r &&
      [
        `facebook`,
        `instagram`,
        `whatsapp`,
        `social`,
        `organic`,
        `paid_social`,
        `inspector-septiembre-2026`,
        `eventos-oaxaca`,
        `feed`,
        `story`,
      ].includes(r) &&
      (t[n] = r);
  }
  return t;
}
function g() {
  try {
    let e = window.localStorage.getItem(m);
    return e === `granted` || e === `denied` ? e : null;
  } catch {
    return null;
  }
}
function _() {
  let e = function (...t) {
    e.callMethod ? e.callMethod(...t) : e.queue.push(t);
  };
  return ((e.queue = []), (e.loaded = !0), (e.version = `2.0`), e);
}
function v() {
  if (g() !== `granted` || window.fbq) return;
  let e = _();
  ((window.fbq = e), (window._fbq = e));
  let t = document.createElement(`script`);
  ((t.async = !0),
    (t.src = `https://connect.facebook.net/en_US/fbevents.js`),
    (t.dataset.yuubusPixel = `true`),
    document.head.appendChild(t),
    e(`init`, p),
    e(`track`, `PageView`));
  let n = document.body?.dataset?.yuubusStaticPage;
  n === `event-detail`
    ? e(
        `trackCustom`,
        `event_view`,
        C({
          event_id: document.body.dataset.eventId ?? `unknown`,
        }),
      )
    : n === `routes` || n === `route-detail`
      ? e(
          `trackCustom`,
          `route_page_view`,
          C({
            route_id: document.body.dataset.routeId ?? `directory`,
          }),
        )
      : n || e(`trackCustom`, `landing_view`, h());
}
function y(e) {
  try {
    window.localStorage.setItem(m, e);
  } catch {}
  e === `granted`
    ? (window.fbq?.(`consent`, `grant`), v())
    : window.fbq?.(`consent`, `revoke`);
}
function b() {
  window.dispatchEvent(new Event(`yuubus:open-cookie-preferences`));
}
function x(e, t) {
  g() === `granted` &&
    (v(),
    window.fbq?.(
      `trackCustom`,
      e === `download_click` ? `app_download_click` : e,
      {
        ...C(t),
        ...h(),
      },
    ),
    e === `download_click` && trackSiteEvent(`cta_download`, t));
}
function trackSiteEvent(e, t) {
  g() === `granted` &&
    (v(),
    window.fbq?.(`trackCustom`, e, {
      ...C(t),
      ...h(),
    }));
}
function C(e) {
  let t = [
    `channel`,
    `platform`,
    `placement`,
    `event_id`,
    `route_id`,
    `plan`,
    `intent`,
    `screen`,
    `path`,
  ];
  return Object.fromEntries(
    Object.entries(e).filter(
      ([e, n]) =>
        t.includes(e) &&
        typeof n == `string` &&
        /^[a-zA-Z0-9_/-]{1,100}$/.test(n),
    ),
  );
}
function trackContactAction(e, t, n) {
  let r = {
    intent: e,
    placement: t,
    channel: n,
  };
  (n === `whatsapp` && trackSiteEvent(`cta_whatsapp`, r),
    (e === `business` || e === `advertise`) &&
      trackSiteEvent(`business_cta`, r),
    e === `collaborate` && trackSiteEvent(`collaboration_cta`, r));
}
function ee() {
  let e = document.body.dataset.eventId,
    t = async (t) => {
      let n =
        t.target instanceof Element
          ? t.target.closest(`[data-track], [data-share-event]`)
          : null;
      if (!n) return;
      let r = n.dataset.track;
      if (
        ((r === `event_directions_click` || r === `whatsapp_click`) &&
          trackSiteEvent(r, {
            event_id: e ?? `unknown`,
            placement: `event_page`,
          }),
        r === `app_download_click` &&
          x(`download_click`, {
            platform: `android`,
            placement: `event_page`,
          }),
        r === `open_app_click` &&
          x(`open_app_click`, {
            platform: `web`,
            placement: `event_page`,
          }),
        n.hasAttribute(`data-share-event`))
      ) {
        let e = n.dataset.shareUrl,
          t = n.dataset.shareTitle;
        if (!e?.startsWith(`https://www.yuubus.com/eventos/`)) return;
        let r = document.querySelector(`[data-share-status]`);
        try {
          navigator.share
            ? await navigator.share({
                title: t,
                url: e,
              })
            : (await navigator.clipboard.writeText(e),
              r && (r.textContent = `Enlace copiado.`));
        } catch (t) {
          r &&
            !(t instanceof DOMException && t.name === `AbortError`) &&
            (r.textContent = `Comparte este enlace: ${e}`);
        }
      }
    },
    n = () => {
      let e = document.querySelector(`[data-event-state]`);
      if (!e) return;
      let t = Date.parse(e.dataset.end ?? ``),
        n = Date.parse(e.dataset.start ?? ``);
      Number.isFinite(t) && t < Date.now()
        ? ((e.textContent = `Finalizado`),
          document
            .querySelector(`meta[name="robots"]`)
            ?.setAttribute(`content`, `noindex, follow`))
        : Number.isFinite(n) && n <= Date.now() && (e.textContent = `En curso`);
    };
  n();
  let r = window.setInterval(n, 6e4);
  return (
    document.addEventListener(`click`, t),
    () => {
      (document.removeEventListener(`click`, t), window.clearInterval(r));
    }
  );
}
function AnalyticsConsent() {
  let [e, t] = (0, u.useState)(() => g() === null),
    [n, r] = (0, u.useState)(!1);
  if (
    ((0, u.useEffect)(() => {
      let e = () => t(!0);
      return (
        window.addEventListener(`yuubus:open-cookie-preferences`, e),
        () => window.removeEventListener(`yuubus:open-cookie-preferences`, e)
      );
    }, []),
    !e)
  )
    return null;
  let i = (e) => {
    (y(e), t(!1));
  };
  return (0, T.jsxs)(`aside`, {
    className: `measurement-consent`,
    "aria-label": `Preferencias de cookies`,
    children: [
      (0, T.jsxs)(`div`, {
        className: `measurement-copy`,
        children: [
          (0, T.jsx)(`strong`, {
            children: `Preferencias de cookies`,
          }),
          (0, T.jsx)(`p`, {
            children: `Usamos cookies y tecnologías similares para medir el uso del sitio y mejorar nuestras campañas. Puedes aceptar o rechazar las cookies opcionales.`,
          }),
          (0, T.jsxs)(`div`, {
            className: `measurement-details`,
            id: `cookie-preference-details`,
            hidden: !n,
            children: [
              `La medición opcional permite conocer visitas y clics de conversión, y evaluar campañas publicitarias con proveedores externos. Consulta el `,
              (0, T.jsx)(`a`, {
                href: `/privacy/`,
                children: `Aviso de Privacidad`,
              }),
              `.`,
            ],
          }),
        ],
      }),
      (0, T.jsxs)(`div`, {
        className: `measurement-actions`,
        children: [
          (0, T.jsx)(`button`, {
            className: `measurement-accept`,
            type: `button`,
            onClick: () => i(`granted`),
            children: `Aceptar`,
          }),
          (0, T.jsx)(`button`, {
            type: `button`,
            onClick: () => i(`denied`),
            children: `Rechazar`,
          }),
          (0, T.jsx)(`button`, {
            type: `button`,
            "aria-expanded": n,
            "aria-controls": `cookie-preference-details`,
            onClick: () => r((e) => !e),
            children: `Configurar`,
          }),
        ],
      }),
    ],
  });
}
var editorialImage = (e, t, n, r = !1) => ({
    id: e,
    alt: t,
    caption: n,
    width: r ? 1200 : 1600,
    height: r ? 1600 : 1200,
    widths: r ? [480, 800, 1200] : [480, 800, 1200, 1600],
    base: `/business-demo-assets/rancho-mijangos`,
  }),
  ranchoMijangos = {
    name: `Rancho Mijangos`,
    locality: `San José del Pacífico, Oaxaca`,
    category: `Hospedaje · Cabañas`,
    previewPath: `/negocios/rancho-mijangos-preview`,
    hero: editorialImage(
      `exterior`,
      `Exterior de una cabaña de madera con techo inclinado y chimenea en Rancho Mijangos`,
      `Arquitectura entre montañas`,
    ),
    gallery: [
      editorialImage(
        `fachada`,
        `Fachada de madera y balcón de una cabaña entre flores amarillas`,
        `Madera y vegetación`,
        !0,
      ),
      editorialImage(
        `ladera`,
        `Cabaña en una ladera rodeada de vegetación y flores`,
        `La cabaña y su entorno`,
        !0,
      ),
      editorialImage(
        `atardecer`,
        `Atardecer sobre las montañas y un mar de nubes`,
        `Luz sobre la sierra`,
      ),
      editorialImage(
        `balcon`,
        `Vista de un valle verde desde un balcón con una maceta de flores rojas`,
        `Una mirada desde el balcón`,
        !0,
      ),
    ],
    options: [
      {
        name: `Alpina A`,
        price: `$1,500 MXN`,
        guests: 2,
        kitchen: !0,
      },
      {
        name: `Niebla`,
        price: `$1,800 MXN`,
        guests: 2,
        kitchen: !1,
      },
    ],
  },
  businessWhatsappNumber = `529711462985`,
  whatsappMessages = {
    advertise: `Hola, vi YuuBus y me interesa conocer las opciones para agregar/promocionar mi negocio.`,
    business: `Hola, vi YuuBus y me interesa conocer las opciones para agregar o promocionar mi negocio.`,
    collaborate: `Hola, me interesa colaborar con YuuBus.`,
    general: `Hola, quiero información sobre YuuBus.`,
  };
function whatsappHref(e) {
  return `https://wa.me/${businessWhatsappNumber}?text=${encodeURIComponent(whatsappMessages[e])}`;
}
function EditorialPhoto({
  image: e,
  hero: t = !1,
  sizes: n = `(max-width: 700px) calc(100vw - 32px), 600px`,
}) {
  let r = (t) =>
    e.widths.map((n) => `${e.base}/${e.id}-${n}.${t} ${n}w`).join(`, `);
  return (0, T.jsxs)(`picture`, {
    className: `business-editorial-photo`,
    children: [
      (0, T.jsx)(`source`, {
        type: `image/avif`,
        srcSet: r(`avif`),
        sizes: n,
      }),
      (0, T.jsx)(`source`, {
        type: `image/webp`,
        srcSet: r(`webp`),
        sizes: n,
      }),
      (0, T.jsx)(`img`, {
        src: `${e.base}/${e.id}-800.webp`,
        alt: e.alt,
        width: e.width,
        height: e.height,
        loading: t ? `eager` : `lazy`,
        fetchPriority: t ? `high` : void 0,
        decoding: `async`,
      }),
    ],
  });
}
function FeaturedBusinessCard({ business: e }) {
  return (0, T.jsxs)(`article`, {
    className: `business-featured-card`,
    children: [
      (0, T.jsx)(EditorialPhoto, {
        image: e.hero,
      }),
      (0, T.jsxs)(`div`, {
        className: `business-featured-copy`,
        children: [
          (0, T.jsx)(`span`, {
            className: `business-example-badge`,
            children: `Hospedaje`,
          }),
          (0, T.jsx)(`p`, {
            className: `business-demo-kicker`,
            children: e.category,
          }),
          (0, T.jsx)(`h4`, {
            children: e.name,
          }),
          (0, T.jsx)(`p`, {
            className: `business-featured-locality`,
            children: e.locality,
          }),
          e.description &&
            (0, T.jsx)(`p`, {
              children: e.description,
            }),
          (0, T.jsxs)(`a`, {
            className: `business-demo-button`,
            href: e.previewPath,
            children: [
              `Conocer el lugar`,
              (0, T.jsx)(`span`, {
                "aria-hidden": `true`,
                children: `↗`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function BusinessOwnerCTA() {
  return (0, T.jsxs)(`aside`, {
    className: `business-example-owner`,
    "aria-labelledby": `business-example-owner-title`,
    id: `negocio-ejemplo-contacto`,
    children: [
      (0, T.jsxs)(`div`, {
        children: [
          (0, T.jsx)(`h3`, {
            id: `business-example-owner-title`,
            children: `Tu negocio también puede estar en YuuBus`,
          }),
          (0, T.jsx)(`p`, {
            children: `Haz que más personas encuentren tu negocio, conozcan lo que ofreces y sepan cómo llegar.`,
          }),
        ],
      }),
      (0, T.jsxs)(`a`, {
        className: `business-demo-button`,
        href: `https://wa.me/${businessWhatsappNumber}?text=Hola%2C%20vi%20c%C3%B3mo%20aparecen%20los%20negocios%20en%20YuuBus%20y%20me%20interesa%20agregar%20o%20promocionar%20el%20m%C3%ADo.`,
        target: `_blank`,
        rel: `noopener noreferrer`,
        onClick: () =>
          trackContactAction(`business`, `business_example`, `whatsapp`),
        children: [
          `Quiero aparecer en YuuBus`,
          (0, T.jsx)(`span`, {
            "aria-hidden": `true`,
            children: `↗`,
          }),
        ],
      }),
    ],
  });
}
function BusinessProfile({ business: e }) {
  return (0, T.jsxs)(`article`, {
    className: `business-profile`,
    children: [
      (0, T.jsxs)(`header`, {
        className: `business-profile-heading`,
        children: [
          (0, T.jsx)(`a`, {
            className: `business-demo-back`,
            href: `/#negocios`,
            children: `← Explora negocios`,
          }),
          (0, T.jsxs)(`div`, {
            className: `business-profile-title-row`,
            children: [
              (0, T.jsxs)(`div`, {
                children: [
                  (0, T.jsx)(`p`, {
                    className: `business-demo-kicker`,
                    children: e.category,
                  }),
                  (0, T.jsx)(`h1`, {
                    children: e.name,
                  }),
                  (0, T.jsx)(`p`, {
                    children: e.locality,
                  }),
                ],
              }),
              (0, T.jsx)(`span`, {
                className: `business-example-badge`,
                children: `Cabañas`,
              }),
            ],
          }),
        ],
      }),
      (0, T.jsx)(`div`, {
        className: `business-profile-hero`,
        children: (0, T.jsx)(EditorialPhoto, {
          image: e.hero,
          hero: !0,
          sizes: `(max-width: 1232px) calc(100vw - 32px), 1200px`,
        }),
      }),
      (0, T.jsxs)(`section`, {
        className: `business-profile-gallery`,
        "aria-labelledby": `business-gallery-title`,
        children: [
          (0, T.jsxs)(`div`, {
            className: `business-profile-section-heading`,
            children: [
              (0, T.jsx)(`p`, {
                className: `business-demo-kicker`,
                children: `En imágenes`,
              }),
              (0, T.jsx)(`h2`, {
                id: `business-gallery-title`,
                children: `Conoce el lugar`,
              }),
            ],
          }),
          (0, T.jsx)(`div`, {
            className: `business-gallery-grid`,
            children: e.gallery.map((e) =>
              (0, T.jsxs)(
                `figure`,
                {
                  children: [
                    (0, T.jsx)(EditorialPhoto, {
                      image: e,
                      sizes: `(max-width: 700px) calc(100vw - 32px), 560px`,
                    }),
                    (0, T.jsx)(`figcaption`, {
                      children: e.caption,
                    }),
                  ],
                },
                e.id,
              ),
            ),
          }),
        ],
      }),
      e.description &&
        (0, T.jsxs)(`section`, {
          className: `business-profile-about`,
          children: [
            (0, T.jsxs)(`h2`, {
              children: [`Sobre `, e.name],
            }),
            (0, T.jsx)(`p`, {
              children: e.description,
            }),
          ],
        }),
      !!e.options?.length &&
        (0, T.jsxs)(`section`, {
          className: `business-profile-options`,
          "aria-labelledby": `business-options-title`,
          children: [
            (0, T.jsxs)(`div`, {
              className: `business-profile-section-heading`,
              children: [
                (0, T.jsx)(`p`, {
                  className: `business-demo-kicker`,
                  children: `Cabañas`,
                }),
                (0, T.jsx)(`h2`, {
                  id: `business-options-title`,
                  children: `Dos opciones para conocer`,
                }),
                (0, T.jsx)(`p`, {
                  children: `Consulta las condiciones vigentes directamente con el negocio.`,
                }),
              ],
            }),
            (0, T.jsx)(`div`, {
              className: `business-options-grid`,
              children: e.options.map((e) =>
                (0, T.jsxs)(
                  `article`,
                  {
                    className: `business-option`,
                    children: [
                      e.image &&
                        (0, T.jsx)(EditorialPhoto, {
                          image: e.image,
                        }),
                      (0, T.jsx)(`h3`, {
                        children: e.name,
                      }),
                      (0, T.jsx)(`p`, {
                        className: `business-option-price`,
                        children: e.price,
                      }),
                      (0, T.jsxs)(`p`, {
                        children: [
                          e.guests,
                          ` huéspedes `,
                          (0, T.jsx)(`span`, {
                            "aria-hidden": `true`,
                            children: `·`,
                          }),
                          ` `,
                          e.kitchen ? `Con cocina` : `Sin cocina`,
                        ],
                      }),
                    ],
                  },
                  e.name,
                ),
              ),
            }),
          ],
        }),
      (0, T.jsxs)(`section`, {
        className: `business-profile-location`,
        children: [
          (0, T.jsx)(`p`, {
            className: `business-demo-kicker`,
            children: `Ubicación`,
          }),
          (0, T.jsx)(`h2`, {
            children: e.locality,
          }),
        ],
      }),
    ],
  });
}
function BusinessExample() {
  return (0, T.jsxs)(`section`, {
    className: `business-example`,
    "aria-labelledby": `business-example-title`,
    id: `ejemplo-negocio`,
    children: [
      (0, T.jsxs)(`header`, {
        className: `business-example-intro`,
        children: [
          (0, T.jsx)(`p`, {
            className: `business-demo-kicker`,
            children: `Descubre en Oaxaca`,
          }),
          (0, T.jsx)(`h3`, {
            id: `business-example-title`,
            children: `Lugares que vale la pena conocer`,
          }),
          (0, T.jsx)(`p`, {
            children: `Conoce su historia, ubicación y formas de contacto, y descubre cómo llegar con YuuBus.`,
          }),
        ],
      }),
      (0, T.jsx)(FeaturedBusinessCard, {
        business: ranchoMijangos,
      }),
      (0, T.jsx)(BusinessOwnerCTA, {}),
    ],
  });
}
async function readBoundedJson(e, t = 35e4) {
  if (!e.ok || !e.body) throw Error(`Contenido no disponible`);
  let n = e.body.getReader(),
    r = [],
    i = 0;
  try {
    for (;;) {
      let { done: e, value: a } = await n.read();
      if (e) break;
      if (((i += a.byteLength), i > t))
        throw Error(`Contenido demasiado grande`);
      r.push(a);
    }
  } catch (e) {
    throw (await n.cancel(), e);
  } finally {
    n.releaseLock();
  }
  let a = new Uint8Array(i),
    o = 0;
  for (let e of r) (a.set(e, o), (o += e.byteLength));
  return JSON.parse(
    new TextDecoder(`utf-8`, {
      fatal: !0,
    }).decode(a),
  );
}
var pe = {
  comida: `Comida`,
  cafe: `Café`,
  artesanias: `Artesanías`,
  mercados: `Mercados`,
  hospedaje: `Hospedaje`,
  cultura: `Cultura`,
};
function O(e) {
  if (!e || typeof e != `object` || Array.isArray(e))
    throw Error(`Objeto de negocio inválido`);
  return e;
}
function k(e, t = 300) {
  return typeof e == `string` && e.trim().length > 0 && e.trim().length <= t
    ? e.trim()
    : null;
}
function me(e) {
  if (!k(e, 2048)) return null;
  try {
    let t = new URL(e);
    return t.protocol === `https:` && !t.username && !t.password
      ? t.href
      : null;
  } catch {
    return null;
  }
}
function he(e) {
  if (typeof e != `string` || !/^\+?[0-9 ()-]+$/.test(e)) return null;
  let t = e.replace(/[^0-9]/g, ``);
  return /^[1-9][0-9]{9,14}$/.test(t) ? t : null;
}
function ge(e, t) {
  return typeof e == `number` &&
    typeof t == `number` &&
    Number.isFinite(e) &&
    Number.isFinite(t) &&
    Math.abs(e) <= 90 &&
    Math.abs(t) <= 180
    ? {
        lat: e,
        lng: t,
      }
    : null;
}
function normalizeBusiness(e) {
  let t = O(e),
    n = k(t.id, 100),
    r = k(t.nombre, 180),
    i = k(t.zona, 180);
  if (
    !n ||
    !/^[A-Za-z0-9_-]+$/.test(n) ||
    !r ||
    !i ||
    typeof t.categoria != `string` ||
    !pe[t.categoria] ||
    t.es_patrocinado !== !1 ||
    t.qa === !0
  )
    throw Error(`Negocio no publicable`);
  let a = t.contacto ? O(t.contacto) : {},
    o = Array.isArray(t.imagenes) ? t.imagenes : [t.imagen_url],
    s = (e) =>
      typeof e == `string` && /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(e)
        ? e
        : null,
    c = [];
  if (Array.isArray(t.horarios))
    for (let e of t.horarios.slice(0, 7)) {
      let t = O(e),
        n = s(t.apertura),
        r = s(t.cierre);
      typeof t.dia_semana == `number` &&
        Number.isInteger(t.dia_semana) &&
        t.dia_semana >= 0 &&
        t.dia_semana <= 6 &&
        typeof t.cerrado == `boolean` &&
        (t.cerrado || (n && r)) &&
        c.push({
          day: t.dia_semana,
          closed: t.cerrado,
          open: n,
          close: r,
        });
    }
  return {
    id: n,
    name: r,
    category: pe[t.categoria],
    locality: i,
    description: k(t.descripcion, 4e3),
    images: o
      .map(me)
      .filter((e) => !!e)
      .slice(0, 8),
    coordinates: ge(t.lat, t.lng),
    address: k(t.direccion, 500),
    contact: {
      whatsapp: he(a.whatsapp),
      phone: he(a.telefono),
      website: me(a.sitio_web),
      facebook: me(a.facebook),
      instagram: me(a.instagram),
    },
    hours: c,
  };
}
function validateBusinessSnapshot(e, t = Date.now()) {
  let n = O(e);
  if (
    ![`ready`, `unavailable`].includes(String(n.state)) ||
    typeof n.fetchedAt != `string` ||
    !Number.isFinite(Date.parse(n.fetchedAt)) ||
    t - Date.parse(n.fetchedAt) > 6048e5 ||
    Date.parse(n.fetchedAt) > t + 6e4 ||
    !Array.isArray(n.businesses) ||
    n.businesses.length > 6
  )
    throw Error(`Snapshot inválido o vencido`);
  let r = n.businesses.map((e) => {
    let t = O(e),
      n = O(t.contact),
      r = Object.keys(pe).find((e) => pe[e] === t.category),
      i = t.coordinates ? O(t.coordinates) : {};
    return normalizeBusiness({
      id: t.id,
      nombre: t.name,
      zona: t.locality,
      categoria: r,
      descripcion: t.description,
      imagenes: t.images,
      lat: i.lat,
      lng: i.lng,
      direccion: t.address,
      es_patrocinado: !1,
      qa: t.qa,
      contacto: {
        whatsapp: n.whatsapp,
        telefono: n.phone,
        sitio_web: n.website,
        facebook: n.facebook,
        instagram: n.instagram,
      },
      horarios: Array.isArray(t.hours)
        ? t.hours.map((e) => {
            let t = O(e);
            return {
              dia_semana: t.day,
              cerrado: t.closed,
              apertura: t.open,
              cierre: t.close,
            };
          })
        : [],
    });
  });
  if (new Set(r.map((e) => e.id)).size !== r.length)
    throw Error(`IDs duplicados`);
  if (n.state === `unavailable` && r.length) throw Error(`Estado incoherente`);
  return {
    state: n.state,
    fetchedAt: n.fetchedAt,
    businesses: r,
  };
}
function businessDeepLink(e) {
  return !e.qa && /^[A-Za-z0-9_-]{1,100}$/.test(e.id)
    ? `yuubus://business/${encodeURIComponent(e.id)}`
    : null;
}
var be = {
  restaurant: `M5 3v6m3-6v6M3 3v5a3 3 0 0 0 6 0V3M6 11v10M17 3c-3 3-3 8 0 8h2V3h-2zm2 8v10`,
  local_cafe: `M4 7h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V7zm13 1h2a3 3 0 0 1 0 6h-2M3 22h17M8 2v2m5-2v2`,
  storefront: `M3 10h18l-2-6H5l-2 6zm1 0v11h16V10M9 21v-7h6v7M2 10c0 4 5 4 5 0 0 4 5 4 5 0 0 4 5 4 5 0 0 4 5 4 5 0`,
  handyman: `m12 2 9 10-9 10L3 12 12 2zm0 5 5 5-5 5-5-5 5-5z`,
  bed: `M3 4v17m18-13v13M3 17h18M3 9h5v8M8 10h10a3 3 0 0 1 3 3v4`,
  museum: `m3 8 9-5 9 5H3zm2 3v8m5-8v8m4-8v8m5-8v8M2 22h20`,
};
function DiscoveryIcon({ name: e }) {
  return (0, T.jsx)(`svg`, {
    className: `discovery-icon`,
    viewBox: `0 0 24 24`,
    width: `26`,
    height: `26`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: `1.5`,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
    "aria-hidden": `true`,
    children: (0, T.jsx)(`path`, {
      d: be[e],
    }),
  });
}
var Se = [
  [`restaurant`, `Comida`],
  [`local_cafe`, `Café`],
  [`handyman`, `Artesanías`],
  [`bed`, `Hospedaje`],
  [`storefront`, `Mercados`],
  [`service`, `Servicios`],
  [`experience`, `Experiencias`],
];
function BusinessCategoryIcon({ name: e }) {
  return e !== `service` && e !== `experience`
    ? (0, T.jsx)(DiscoveryIcon, {
        name: e,
      })
    : (0, T.jsx)(`svg`, {
        className: `discovery-icon`,
        width: `26`,
        height: `26`,
        viewBox: `0 0 24 24`,
        fill: `none`,
        stroke: `currentColor`,
        strokeWidth: `1.5`,
        strokeLinecap: `round`,
        strokeLinejoin: `round`,
        "aria-hidden": `true`,
        children: (0, T.jsx)(`path`, {
          d:
            e === `service`
              ? `M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 7h18v14H3V7zm0 5a22 22 0 0 0 18 0M10 12h4v4h-4z`
              : `m12 3 2.8 5.8L21 10l-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 10l6.2-1.2L12 3z`,
        }),
      });
}
function BusinessCategories() {
  return (0, T.jsxs)(`div`, {
    className: `business-categories`,
    children: [
      (0, T.jsx)(`p`, {
        className: `business-category-label`,
        children: `Lo que nos mueve`,
      }),
      (0, T.jsx)(`ul`, {
        "aria-label": `Ideas para descubrir Oaxaca`,
        children: Se.map(([e, t], n) =>
          (0, T.jsxs)(
            `li`,
            {
              style: {
                "--category-order": n,
              },
              children: [
                (0, T.jsx)(BusinessCategoryIcon, {
                  name: e,
                }),
                (0, T.jsx)(`span`, {
                  children: t,
                }),
              ],
            },
            t,
          ),
        ),
      }),
      (0, T.jsx)(`p`, {
        className: `business-category-note`,
        children: `Ideas para explorar. Estamos preparando el catálogo.`,
      }),
    ],
  });
}
function BusinessBrandVisual() {
  return (0, T.jsxs)(`figure`, {
    className: `business-brand-visual`,
    children: [
      (0, T.jsxs)(`div`, {
        className: `business-art-label`,
        children: [
          (0, T.jsx)(`span`, {
            children: `OAXACA`,
          }),
          (0, T.jsx)(`span`, {
            children: `LO LOCAL NOS MUEVE`,
          }),
        ],
      }),
      (0, T.jsxs)(`svg`, {
        viewBox: `0 0 420 370`,
        width: `420`,
        height: `370`,
        fill: `none`,
        "aria-hidden": `true`,
        className: `business-city-art`,
        children: [
          (0, T.jsx)(`path`, {
            d: `M18 322h386M18 336h386M18 350h386`,
            stroke: `#F4F1E8`,
            strokeOpacity: `.22`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `313`,
            cy: `77`,
            r: `46`,
            fill: `#F56A16`,
          }),
          (0, T.jsx)(`path`, {
            d: `M244 307V142a72 72 0 0 0-144 0v165`,
            fill: `#F4F1E8`,
          }),
          (0, T.jsx)(`path`, {
            d: `M111 305V143a61 61 0 0 1 122 0v162`,
            stroke: `#23605B`,
            strokeOpacity: `.25`,
          }),
          (0, T.jsx)(`path`, {
            d: `M100 307V182h144v125`,
            fill: `#DED5BC`,
          }),
          (0, T.jsx)(`path`, {
            d: `M135 307V179a37 37 0 0 1 74 0v128`,
            fill: `#352078`,
          }),
          (0, T.jsx)(`path`, {
            d: `M146 307V182a26 26 0 0 1 52 0v125`,
            stroke: `#F4F1E8`,
            strokeOpacity: `.25`,
          }),
          (0, T.jsx)(`path`, {
            d: `M25 307V221h63v-32h48v118`,
            fill: `#352078`,
          }),
          (0, T.jsx)(`path`, {
            d: `M35 231h43v-32h48`,
            stroke: `#F4F1E8`,
            strokeOpacity: `.4`,
          }),
          (0, T.jsx)(`path`, {
            d: `M217 307V206h49v-42h46v-38h65v181`,
            fill: `#AAC2A8`,
          }),
          (0, T.jsx)(`path`, {
            d: `M228 297v-80h49v-42h46v-38h43`,
            stroke: `#23605B`,
            strokeOpacity: `.5`,
          }),
          (0, T.jsx)(`path`, {
            d: `M48 281h27v-23h96v57h101v-74h61v-54`,
            stroke: `#F4F1E8`,
            strokeWidth: `4`,
            strokeLinejoin: `round`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `48`,
            cy: `281`,
            r: `8`,
            fill: `#352078`,
            stroke: `#F4F1E8`,
            strokeWidth: `3`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `272`,
            cy: `315`,
            r: `7`,
            fill: `#23605B`,
            stroke: `#F4F1E8`,
            strokeWidth: `3`,
          }),
          (0, T.jsx)(`path`, {
            d: `M333 205s26-22 26-44a26 26 0 0 0-52 0c0 22 26 44 26 44Z`,
            fill: `#F56A16`,
            stroke: `#23605B`,
            strokeWidth: `5`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `333`,
            cy: `159`,
            r: `7`,
            fill: `#F4F1E8`,
          }),
          (0, T.jsx)(`path`, {
            d: `M31 113h39m-20-20v40M352 49h16m-8-8v16`,
            stroke: `#F4F1E8`,
            strokeWidth: `1.5`,
          }),
          (0, T.jsx)(`path`, {
            d: `M49 175c-14-23-3-40 10-47-3 22 0 30 13 40m-16 14c-22-7-30-1-32 11 13-6 22-4 31 2`,
            stroke: `#AAC2A8`,
            strokeWidth: `2`,
          }),
        ],
      }),
      (0, T.jsxs)(`figcaption`, {
        children: [
          `Una ciudad.`,
          (0, T.jsx)(`br`, {}),
          (0, T.jsx)(`strong`, {
            children: `Mucho por descubrir.`,
          }),
        ],
      }),
    ],
  });
}
var Ee = (0, u.lazy)(() =>
  e(
    () =>
      import(`./BusinessCard.js`).then((e) => ({
        default: e.BusinessCard,
      })),
    [],
  ),
);
function BusinessesV2() {
  let [e, t] = (0, u.useState)(null);
  return (
    (0, u.useEffect)(() => {
      let e = new AbortController(),
        n = window.setTimeout(() => e.abort(), 6e3);
      return (
        fetch(`/businesses-preview.json`, {
          signal: e.signal,
        })
          .then(readBoundedJson)
          .then((e) => validateBusinessSnapshot(e))
          .then(t)
          .catch(() =>
            t({
              state: `unavailable`,
              fetchedAt: new Date().toISOString(),
              businesses: [],
            }),
          )
          .finally(() => window.clearTimeout(n)),
        () => {
          (e.abort(), window.clearTimeout(n));
        }
      );
    }, []),
    (0, u.useEffect)(() => {
      window.dispatchEvent(new Event(`yuubus:content-ready`));
    }, [e]),
    (0, T.jsxs)(`section`, {
      className: `business-discovery business-v2`,
      id: `negocios`,
      "aria-labelledby": `businesses-title`,
      children: [
        (0, T.jsxs)(`div`, {
          className: `business-editorial`,
          children: [
            (0, T.jsxs)(`header`, {
              className: `business-editorial-copy`,
              children: [
                (0, T.jsxs)(`p`, {
                  className: `business-eyebrow`,
                  children: [
                    (0, T.jsx)(`span`, {
                      "aria-hidden": `true`,
                    }),
                    `Hecho aquí. Por descubrir.`,
                  ],
                }),
                (0, T.jsxs)(`h2`, {
                  id: `businesses-title`,
                  children: [
                    `Descubre negocios `,
                    (0, T.jsxs)(`span`, {
                      children: [
                        `que hacen `,
                        (0, T.jsx)(`em`, {
                          children: `Oaxaca.`,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, T.jsx)(`p`, {
                  className: `business-intro`,
                  children: `Comida, café, artesanías, hospedaje, servicios y experiencias. Conoce lo local y descubre cómo llegar con YuuBus.`,
                }),
              ],
            }),
            (0, T.jsx)(BusinessBrandVisual, {}),
            (0, T.jsx)(BusinessCategories, {}),
            (0, T.jsxs)(`div`, {
              className: `business-editorial-actions`,
              children: [
                (0, T.jsxs)(`a`, {
                  className: `business-primary`,
                  href: `#catalogo-negocios`,
                  children: [
                    e?.businesses.length
                      ? `Explorar negocios`
                      : `Conoce el catálogo`,
                    (0, T.jsx)(`span`, {
                      "aria-hidden": `true`,
                      children: `↓`,
                    }),
                  ],
                }),
                (0, T.jsxs)(`a`, {
                  className: `business-secondary`,
                  href: whatsappHref(`business`),
                  target: `_blank`,
                  rel: `noopener noreferrer`,
                  onClick: () =>
                    trackContactAction(`business`, `home_business`, `whatsapp`),
                  children: [
                    `Quiero aparecer en YuuBus`,
                    (0, T.jsx)(`span`, {
                      "aria-hidden": `true`,
                      children: `↗`,
                    }),
                  ],
                }),
              ],
            }),
            (0, T.jsx)(`div`, {
              className: `business-signature`,
              "aria-hidden": `true`,
            }),
          ],
        }),
        (0, T.jsx)(BusinessExample, {}),
        (0, T.jsx)(`div`, {
          className: `business-catalog`,
          id: `catalogo-negocios`,
          tabIndex: -1,
          "aria-labelledby": `business-catalog-title`,
          children: e?.businesses.length
            ? (0, T.jsxs)(T.Fragment, {
                children: [
                  (0, T.jsx)(`h3`, {
                    id: `business-catalog-title`,
                    children: `Lugares por descubrir`,
                  }),
                  (0, T.jsx)(u.Suspense, {
                    fallback: (0, T.jsx)(`p`, {
                      children: `Abriendo negocios…`,
                    }),
                    children: (0, T.jsx)(`div`, {
                      className: `business-grid`,
                      children: e.businesses.map((e) =>
                        (0, T.jsx)(
                          Ee,
                          {
                            business: e,
                          },
                          e.id,
                        ),
                      ),
                    }),
                  }),
                ],
              })
            : (0, T.jsxs)(`div`, {
                className: `business-empty-v2`,
                children: [
                  (0, T.jsx)(`div`, {
                    className: `business-empty-mark`,
                    "aria-hidden": `true`,
                    children: (0, T.jsxs)(`svg`, {
                      viewBox: `0 0 32 32`,
                      width: `32`,
                      height: `32`,
                      fill: `none`,
                      stroke: `currentColor`,
                      strokeWidth: `1.5`,
                      children: [
                        (0, T.jsx)(`path`, {
                          d: `M16 28s9-8 9-16a9 9 0 0 0-18 0c0 8 9 16 9 16Z`,
                        }),
                        (0, T.jsx)(`path`, {
                          d: `M12 12h8m-4-4v8`,
                        }),
                      ],
                    }),
                  }),
                  (0, T.jsxs)(`div`, {
                    children: [
                      (0, T.jsx)(`p`, {
                        className: `business-catalog-label`,
                        children: `El próximo lugar está por llegar`,
                      }),
                      (0, T.jsx)(`h3`, {
                        id: `business-catalog-title`,
                        children: `Estamos sumando nuevos lugares.`,
                      }),
                      (0, T.jsx)(`p`, {
                        children:
                          e?.state === `unavailable`
                            ? `No pudimos cargar el catálogo en este momento. Mientras tanto, conoce cómo formar parte de YuuBus.`
                            : `Estamos preparando esta selección de negocios de Oaxaca. ¿Tienes uno? Nos gustaría conocerlo.`,
                      }),
                    ],
                  }),
                  (0, T.jsxs)(`a`, {
                    href: whatsappHref(`business`),
                    target: `_blank`,
                    rel: `noopener noreferrer`,
                    onClick: () =>
                      trackContactAction(
                        `business`,
                        `home_business`,
                        `whatsapp`,
                      ),
                    children: [
                      `Quiero agregar mi negocio`,
                      (0, T.jsx)(`span`, {
                        "aria-hidden": `true`,
                        children: `↗`,
                      }),
                    ],
                  }),
                ],
              }),
        }),
      ],
    })
  );
}
function Oe(e) {
  return !e ||
    typeof e != `object` ||
    !(`events` in e) ||
    !Array.isArray(e.events)
    ? []
    : e.events
        .filter((e) =>
          !e ||
          typeof e != `object` ||
          typeof e.id != `string` ||
          typeof e.slug != `string` ||
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug) ||
          typeof e.title != `string` ||
          typeof e.venue != `string` ||
          typeof e.startDate != `string` ||
          !/^\d{4}-\d{2}-\d{2}$/.test(e.startDate) ||
          !Number.isFinite(Date.parse(e.startDate))
            ? !1
            : e.image === null ||
              (typeof e.image == `string` &&
                /^https:\/\//.test(e.image) &&
                typeof e.imageAlt == `string`),
        )
        .slice(0, 3);
}
function HomeEventsPreview() {
  let [e, t] = (0, u.useState)([]);
  let [status, setStatus] = (0, u.useState)(`loading`);
  return (
    (0, u.useEffect)(() => {
      let e = new AbortController(),
        n = window.setTimeout(() => e.abort(), 15e3);
      return (
        fetch(`/events-preview.json`, {
          signal: e.signal,
        })
          .then(readBoundedJson)
          .then((e) => { t(Oe(e)); setStatus(`ready`); })
          .catch(() => { setStatus(`error`); })
          .finally(() => window.clearTimeout(n)),
        () => {
          (e.abort(), window.clearTimeout(n));
        }
      );
    }, []),
    (0, u.useEffect)(() => {
      window.dispatchEvent(new Event(`yuubus:content-ready`));
    }, [e]),
    (0, T.jsxs)(`section`, {
      className: `home-events section`,
      "aria-labelledby": `home-events-title`,
      children: [
        (0, T.jsxs)(`header`, {
          className: `section-heading`,
          children: [
            (0, T.jsx)(`p`, {
              className: `section-tag`,
              children: `AGENDA DE OAXACA`,
            }),
            (0, T.jsxs)(`h2`, {
              className: `section-title`,
              id: `home-events-title`,
              children: [
                `Un plan para salir.`,
                (0, T.jsx)(`br`, {}),
                `Una ruta para llegar.`,
              ],
            }),
            (0, T.jsx)(`p`, {
              children: `Consulta el evento, ubica el recinto y planea tu viaje con YuuBus.`,
            }),
          ],
        }),
        (0, T.jsx)(`div`, {
          className: `event-grid`,
          children: e.map((e) =>
            (0, T.jsx)(
              `article`,
              {
                className: `event-card`,
                children: (0, T.jsxs)(`a`, {
                  href: `/eventos/${e.slug}/`,
                  children: [
                    e.image &&
                      (0, T.jsx)(`img`, {
                        src: e.image,
                        alt: e.imageAlt,
                        width: `600`,
                        height: `450`,
                        loading: `lazy`,
                        referrerPolicy: `no-referrer`,
                      }),
                    (0, T.jsxs)(`div`, {
                      children: [
                        (0, T.jsx)(`p`, {
                          className: `section-tag`,
                          children: new Intl.DateTimeFormat(`es-MX`, {
                            day: `numeric`,
                            month: `long`,
                            timeZone: `America/Mexico_City`,
                          }).format(new Date(`${e.startDate}T12:00:00-06:00`)),
                        }),
                        (0, T.jsx)(`h3`, {
                          children: e.title,
                        }),
                        (0, T.jsx)(`p`, {
                          children: e.venue,
                        }),
                        (0, T.jsx)(`strong`, {
                          children: `Ver evento y cómo llegar →`,
                        }),
                      ],
                    }),
                  ],
                }),
              },
              e.id,
            ),
          ),
        }),
        e.length === 0 ? (0, T.jsx)(`p`, {role: `status`, children: status === `loading` ? `Cargando agenda…` : status === `error` ? `No pudimos cargar la agenda. Intenta nuevamente en unos minutos.` : `No hay eventos publicados disponibles. Vuelve pronto o consulta las rutas de Oaxaca.`}) : null,
        (0, T.jsx)(`a`, {
          className: `event-secondary`,
          href: `/eventos/`,
          children: `Ver toda la agenda →`,
        }),
      ],
    })
  );
}
var Ae = [
  [`restaurant`, `Comida`],
  [`local_cafe`, `Café`],
  [`storefront`, `Mercados`],
  [`handyman`, `Artesanías`],
  [`bed`, `Hospedaje`],
  [`museum`, `Cultura`],
];
function DiscoverySection() {
  return (0, T.jsxs)(`section`, {
    className: `explore-oaxaca`,
    id: `oaxaca`,
    "aria-labelledby": `explore-title`,
    children: [
      (0, T.jsxs)(`header`, {
        className: `explore-heading`,
        children: [
          (0, T.jsx)(`p`, {
            className: `section-tag`,
            children: `Descubrir + llegar`,
          }),
          (0, T.jsxs)(`h2`, {
            id: `explore-title`,
            children: [
              `Explora `,
              (0, T.jsx)(`span`, {
                children: `Oaxaca.`,
              }),
            ],
          }),
          (0, T.jsxs)(`p`, {
            children: [
              `Un café, un mercado, un encuentro.`,
              (0, T.jsx)(`br`, {}),
              `Tu próximo destino también tiene una ruta.`,
            ],
          }),
        ],
      }),
      (0, T.jsxs)(`div`, {
        className: `explore-editorial`,
        children: [
          (0, T.jsxs)(`div`, {
            children: [
              (0, T.jsxs)(`h3`, {
                children: [
                  `Lo que quieres conocer.`,
                  (0, T.jsx)(`br`, {}),
                  `Cómo puedes llegar.`,
                ],
              }),
              (0, T.jsx)(`p`, {
                children: `Descubre lugares, eventos y negocios, y consulta las opciones de transporte en YuuBus.`,
              }),
              (0, T.jsxs)(`nav`, {
                className: `explore-links`,
                "aria-label": `Descubrir Oaxaca`,
                children: [
                  (0, T.jsxs)(`a`, {
                    href: `#negocios`,
                    children: [
                      `Negocios locales `,
                      (0, T.jsx)(`span`, {
                        "aria-hidden": `true`,
                        children: `↗`,
                      }),
                    ],
                  }),
                  (0, T.jsxs)(`a`, {
                    href: `/eventos/`,
                    children: [
                      `Agenda de eventos `,
                      (0, T.jsx)(`span`, {
                        "aria-hidden": `true`,
                        children: `↗`,
                      }),
                    ],
                  }),
                  (0, T.jsxs)(`a`, {
                    href: `#rutas`,
                    children: [
                      `Planea tu viaje `,
                      (0, T.jsx)(`span`, {
                        "aria-hidden": `true`,
                        children: `↗`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, T.jsxs)(`div`, {
            className: `explore-interests`,
            children: [
              (0, T.jsx)(`p`, {
                className: `explore-label`,
                children: `¿Qué te gustaría descubrir?`,
              }),
              (0, T.jsx)(`ul`, {
                children: Ae.map(([e, t]) =>
                  (0, T.jsxs)(
                    `li`,
                    {
                      children: [
                        (0, T.jsx)(DiscoveryIcon, {
                          name: e,
                        }),
                        t,
                      ],
                    },
                    t,
                  ),
                ),
              }),
              (0, T.jsx)(`p`, {
                className: `explore-note`,
                children: `Explora por intereses en la app. Las opciones dependen del catálogo disponible en cada zona.`,
              }),
            ],
          }),
        ],
      }),
      (0, T.jsx)(`div`, {
        className: `refinement-greca`,
        "aria-hidden": `true`,
      }),
    ],
  });
}
function ResponsiveScreenshot({
  screen: e,
  alt: t = e.alt,
  priority: n = !1,
  sizes: r = `(max-width: 620px) 230px, 280px`,
}) {
  let [i, a] = (0, u.useState)(null),
    o = (t) =>
      [320, 640, 960]
        .map((n) => `${e.src.replace(/-640\.webp$/, ``)}-${n}.${t} ${n}w`)
        .join(`, `);
  return i === e.id
    ? (0, T.jsxs)(`div`, {
        className: `screenshot-unavailable`,
        role: `img`,
        "aria-label": t,
        children: [`Captura de `, e.label, ` no disponible.`],
      })
    : (0, T.jsxs)(`picture`, {
        className: `product-screenshot`,
        children: [
          (0, T.jsx)(`source`, {
            type: `image/avif`,
            srcSet: o(`avif`),
            sizes: r,
          }),
          (0, T.jsx)(`img`, {
            src: e.src,
            srcSet: o(`webp`),
            sizes: r,
            alt: t,
            width: e.width,
            height: e.height,
            loading: n ? `eager` : `lazy`,
            fetchPriority: n ? `high` : void 0,
            decoding: `async`,
            onError: () => a(e.id),
          }),
        ],
      });
}
var Ne = new Set([
  `facebook`,
  `instagram`,
  `whatsapp`,
  `social`,
  `organic`,
  `paid_social`,
  `inspector-septiembre-2026`,
  `eventos-oaxaca`,
  `feed`,
  `story`,
]);
function Pe(e) {
  let t = new URLSearchParams(e),
    n = {};
  for (let e of [`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`]) {
    let r = t.get(e);
    r && Ne.has(r) && (n[e] = r);
  }
  return n;
}
var Fe = (e, t, n, r, i) => ({
    id: e,
    label: t,
    alt: n,
    width: r,
    height: i,
    src: `/assets/polish-202609/${e}-640.webp`,
  }),
  Ie = [
    {
      ...Fe(
        `home`,
        `Inicio`,
        `Inicio real de YuuBus: Muévete y descubre Oaxaca, Planea tu viaje, Cerca de mí y Rutas`,
        1179,
        2556,
      ),
      src: `/assets/discovery-202609/home-640.webp`,
    },
    Fe(
      `routes`,
      `Rutas`,
      `Catálogo real de YuuBus con tarjeta de RA02, origen, destino y paradas`,
      1206,
      2622,
    ),
    Fe(
      `events`,
      `Eventos`,
      `Agenda real de Oaxaca en YuuBus con el evento de Inspector`,
      1206,
      2622,
    ),
    Fe(
      `trip`,
      `Viaje`,
      `Planificador real de YuuBus con Alameda de León como destino de Inspector`,
      1179,
      2556,
    ),
  ],
  Le = Fe(
    `options`,
    `Opciones`,
    `Opciones reales de viaje hacia Alameda de León, ordenadas por duración estimada`,
    1179,
    2556,
  ),
  Re = `https://play.google.com/store/apps/details?id=mx.oaxaca.rutasoaxaca`;
function ze(e) {
  if (typeof window > `u`) return e;
  let t = new URL(e);
  for (let [e, n] of Object.entries(Pe(window.location.search)))
    t.searchParams.set(e, n);
  return t.toString();
}
var Be = [
    {
      step: `01`,
      icon: `search`,
      title: `Busca tu destino`,
      description: `Escribe a dónde vas o elige el punto directamente en el mapa.`,
      screen: Ie[3],
    },
    {
      step: `02`,
      icon: `route`,
      title: `Elige una opción`,
      description: `Compara viaje directo, transbordo o caminata antes de salir.`,
      screen: Le,
    },
    {
      step: `03`,
      icon: `near_me`,
      title: `Conoce tu ruta`,
      description: `Consulta el origen, el destino y las paradas de cada recorrido.`,
      screen: Ie[1],
    },
  ],
  Ve = [
    {
      icon: `route`,
      title: `Rutas con trabajo de campo`,
      description: `Cada parada fue capturada a pie, verificando el recorrido real del camión.`,
      screen: Ie[1],
    },
    {
      icon: `multiple_stop`,
      title: `Directa, transbordo o caminando`,
      description: `«Planea tu viaje» compara las opciones para llegar a tu destino.`,
      screen: Le,
    },
    {
      icon: `near_me`,
      title: `Paradas cerca de ti`,
      description: `Desde Cerca puedes consultar paradas y recorridos cercanos, con su dirección y sentido.`,
      screen: Ie[0],
    },
    {
      icon: `theater_comedy`,
      title: `Eventos y cultura`,
      description: `Consulta la agenda de Oaxaca y revisa cómo llegar a cada evento.`,
      screen: Ie[2],
    },
    {
      icon: `signal_wifi_off`,
      title: `Rutas disponibles sin internet`,
      description: `Consulta el catálogo de rutas y paradas guardado en tu teléfono aunque no tengas señal.`,
      screen: Ie[1],
    },
  ];
function FeatureExplorer() {
  let [e, t] = (0, u.useState)(0),
    n = (0, u.useRef)([]),
    r = Ve[e],
    i = (e) => {
      (t(e), n.current[e]?.focus());
    },
    a = (e, t) => {
      let n;
      if (e.key === `ArrowDown` || e.key === `ArrowRight`)
        n = (t + 1) % Ve.length;
      else if (e.key === `ArrowUp` || e.key === `ArrowLeft`)
        n = (t - 1 + Ve.length) % Ve.length;
      else if (e.key === `Home`) n = 0;
      else if (e.key === `End`) n = Ve.length - 1;
      else return;
      (e.preventDefault(), i(n));
    };
  return (0, T.jsxs)(`section`, {
    className: `section`,
    id: `features`,
    children: [
      (0, T.jsx)(`p`, {
        className: `section-tag`,
        children: `Características reales`,
      }),
      (0, T.jsx)(`h2`, {
        className: `section-title`,
        children: `Lo necesario para moverte con más claridad.`,
      }),
      (0, T.jsxs)(`div`, {
        className: `feature-experience`,
        children: [
          (0, T.jsxs)(`div`, {
            className: `feature-preview`,
            id: `feature-preview`,
            role: `tabpanel`,
            "aria-labelledby": `feature-tab-${e}`,
            children: [
              (0, T.jsx)(`div`, {
                className: `feature-device`,
                children: (0, T.jsx)(ResponsiveScreenshot, {
                  screen: r.screen,
                  sizes: `(max-width: 620px) 260px, 300px`,
                }),
              }),
              (0, T.jsx)(`span`, {
                className: `feature-preview-label`,
                children: r.title,
              }),
            ],
          }),
          (0, T.jsx)(`div`, {
            className: `features`,
            role: `tablist`,
            "aria-label": `Características de Yuu Bus`,
            children: Ve.map((r, i) =>
              (0, T.jsxs)(
                `button`,
                {
                  ref: (e) => {
                    n.current[i] = e;
                  },
                  className: `feature-card${i === e ? ` is-active` : ``}`,
                  type: `button`,
                  role: `tab`,
                  id: `feature-tab-${i}`,
                  "aria-selected": i === e,
                  "aria-controls": `feature-preview`,
                  tabIndex: i === e ? 0 : -1,
                  onClick: () => t(i),
                  onKeyDown: (e) => a(e, i),
                  children: [
                    (0, T.jsx)(`span`, {
                      className: `feature-icon`,
                      children: (0, T.jsx)(`span`, {
                        className: `material-symbols-rounded`,
                        "aria-hidden": `true`,
                        children: r.icon,
                      }),
                    }),
                    (0, T.jsxs)(`span`, {
                      className: `feature-content`,
                      children: [
                        (0, T.jsx)(`strong`, {
                          children: r.title,
                        }),
                        (0, T.jsx)(`span`, {
                          children: r.description,
                        }),
                      ],
                    }),
                  ],
                },
                r.title,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
function Ue() {
  let [e, t] = (0, u.useState)(!1);
  return (
    (0, u.useEffect)(() => {
      let e = window.matchMedia(`(prefers-reduced-motion: reduce)`),
        n = () => t(e.matches);
      return (
        n(),
        e.addEventListener(`change`, n),
        () => e.removeEventListener(`change`, n)
      );
    }, []),
    e
  );
}
function We(e = 4) {
  let t = Ue(),
    [n, r] = (0, u.useState)({
      x: 0,
      y: 0,
    });
  return {
    tilt: n,
    onPointerMove: (0, u.useCallback)(
      (n) => {
        if (t || n.pointerType === `touch`) return;
        let i = n.currentTarget.getBoundingClientRect(),
          a = (n.clientX - i.left) / i.width - 0.5,
          o = (n.clientY - i.top) / i.height - 0.5;
        r({
          x: -o * e * 2,
          y: a * e * 2,
        });
      },
      [e, t],
    ),
    onPointerLeave: (0, u.useCallback)(
      () =>
        r({
          x: 0,
          y: 0,
        }),
      [],
    ),
  };
}
function HeroRouteMap() {
  return (0, T.jsxs)(`svg`, {
    className: `hero-route-map`,
    viewBox: `0 0 1440 820`,
    preserveAspectRatio: `xMidYMid slice`,
    "aria-hidden": `true`,
    children: [
      (0, T.jsx)(`path`, {
        className: `hero-route-ghost`,
        d: `M-80 620H152V488H354V646H512V382H720V244H916V408H1110V214H1324V88H1510`,
      }),
      (0, T.jsx)(`path`, {
        id: `yuubus-hero-route`,
        className: `hero-route-line`,
        d: `M-80 620H152V488H354V646H512V382H720V244H916V408H1110V214H1324V88H1510`,
      }),
      (0, T.jsxs)(`g`, {
        className: `hero-route-nodes`,
        children: [
          (0, T.jsx)(`circle`, {
            cx: `152`,
            cy: `488`,
            r: `8`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `354`,
            cy: `646`,
            r: `8`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `512`,
            cy: `382`,
            r: `8`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `720`,
            cy: `244`,
            r: `8`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `916`,
            cy: `408`,
            r: `8`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `1110`,
            cy: `214`,
            r: `8`,
          }),
          (0, T.jsx)(`circle`, {
            cx: `1324`,
            cy: `88`,
            r: `8`,
          }),
        ],
      }),
      (0, T.jsx)(`circle`, {
        className: `hero-route-traveler`,
        r: `7`,
        children: (0, T.jsx)(`animateMotion`, {
          dur: `18s`,
          repeatCount: `indefinite`,
          rotate: `auto`,
          children: (0, T.jsx)(`mpath`, {
            href: `#yuubus-hero-route`,
          }),
        }),
      }),
    ],
  });
}
function RouteDivider({ tone: e = `light` }) {
  return (0, T.jsx)(`div`, {
    className: `route-divider route-divider--${e}`,
    "aria-hidden": `true`,
    children: (0, T.jsxs)(`svg`, {
      viewBox: `0 0 1080 40`,
      preserveAspectRatio: `none`,
      children: [
        (0, T.jsx)(`path`, {
          d: `M0 20H176V8H286V32H446V20H632V8H756V32H914V20H1080`,
        }),
        (0, T.jsx)(`circle`, {
          cx: `176`,
          cy: `20`,
          r: `5`,
        }),
        (0, T.jsx)(`circle`, {
          cx: `446`,
          cy: `20`,
          r: `5`,
        }),
        (0, T.jsx)(`circle`, {
          cx: `756`,
          cy: `32`,
          r: `5`,
        }),
        (0, T.jsx)(`circle`, {
          cx: `914`,
          cy: `20`,
          r: `5`,
        }),
      ],
    }),
  });
}
function YuuBusCorner() {
  return (0, T.jsxs)(`svg`, {
    className: `yuubus-corner`,
    viewBox: `0 0 96 96`,
    "aria-hidden": `true`,
    children: [
      (0, T.jsx)(`path`, {
        d: `M8 88V36h28V8h52`,
      }),
      (0, T.jsx)(`circle`, {
        cx: `36`,
        cy: `36`,
        r: `6`,
      }),
      (0, T.jsx)(`circle`, {
        cx: `88`,
        cy: `8`,
        r: `6`,
      }),
    ],
  });
}
function FinalCTA() {
  let { tilt: e, onPointerMove: t, onPointerLeave: n } = We(2.4),
    r = ze(Re);
  return (0, T.jsxs)(`section`, {
    className: `final-cta`,
    "aria-labelledby": `final-cta-title`,
    children: [
      (0, T.jsx)(YuuBusCorner, {}),
      (0, T.jsxs)(`div`, {
        className: `final-cta-copy`,
        children: [
          (0, T.jsx)(`p`, {
            className: `section-tag`,
            children: `Yuu Bus: Rutas Oaxaca`,
          }),
          (0, T.jsx)(`h2`, {
            id: `final-cta-title`,
            children: `Tu siguiente ruta empieza aquí.`,
          }),
          (0, T.jsx)(`p`, {
            children: `Consulta rutas, paradas y recorridos de transporte público desde tu teléfono.`,
          }),
          (0, T.jsxs)(`a`, {
            className: `btn-download btn-android final-download`,
            href: r,
            target: `_blank`,
            rel: `noopener noreferrer`,
            onClick: () =>
              x(`download_click`, {
                platform: `android`,
                placement: `final_cta`,
              }),
            children: [
              (0, T.jsx)(`span`, {
                className: `material-symbols-rounded btn-icon`,
                "aria-hidden": `true`,
                children: `android`,
              }),
              (0, T.jsxs)(`span`, {
                className: `btn-label`,
                children: [
                  (0, T.jsx)(`small`, {
                    children: `Disponible en`,
                  }),
                  (0, T.jsx)(`strong`, {
                    children: `Google Play`,
                  }),
                ],
              }),
            ],
          }),
          (0, T.jsx)(`small`, {
            className: `final-availability`,
            children: `Próximamente en App Store.`,
          }),
        ],
      }),
      (0, T.jsxs)(`a`, {
        className: `final-qr`,
        href: r,
        target: `_blank`,
        rel: `noopener noreferrer`,
        "aria-label": `Escanear o abrir Yuu Bus en Google Play`,
        onPointerMove: t,
        onPointerLeave: n,
        onClick: () =>
          x(`download_click`, {
            platform: `android`,
            placement: `final_qr`,
          }),
        style: {
          "--qr-rotate-x": `${e.x}deg`,
          "--qr-rotate-y": `${e.y}deg`,
        },
        children: [
          (0, T.jsx)(`img`, {
            src: `/qr-code.png`,
            alt: `QR de descarga de Yuu Bus en Google Play`,
            width: `180`,
            height: `180`,
            loading: `lazy`,
          }),
          (0, T.jsx)(`span`, {
            children: `Escanea para descargar`,
          }),
        ],
      }),
    ],
  });
}
var Ye = `montealbancode@gmail.com`,
  Xe = [
    {
      id: `presencia`,
      name: `PRESENCIA`,
      price: `$300 MXN`,
      billing: `por mes`,
      tone: `anil`,
      includesLabel: `Incluye`,
      benefits: [
        `Perfil dentro de YuuBus.`,
        `Nombre, descripción y categoría.`,
        `Ubicación y horarios.`,
        `Teléfono y WhatsApp.`,
        `Enlaces a redes sociales.`,
        `Fotografías.`,
        `Aparición dentro de búsquedas.`,
        `Instrucciones básicas para llegar con el transporte disponible en YuuBus.`,
      ],
      idealFor: `Pequeños negocios, cafeterías, tiendas, talleres y servicios locales.`,
    },
    {
      id: `impulso`,
      name: `IMPULSO`,
      price: `$500 MXN`,
      billing: `por mes`,
      tone: `naranja`,
      includesLabel: `Todo Presencia, más`,
      benefits: [
        `Página web básica.`,
        `Ficha comercial mejorada.`,
        `Promoción dentro de YuuBus.`,
        `Asesoría básica en presencia digital.`,
        `Una pieza gráfica periódica.`,
        `Apoyo básico en redes sociales.`,
        `Participación posible en publicaciones.`,
        `Mayor visibilidad en categorías y búsquedas.`,
      ],
      idealFor: `Restaurantes, cafeterías, comercios, servicios turísticos y negocios que buscan visibilidad.`,
    },
    {
      id: `destacado`,
      name: `DESTACADO`,
      price: `$900 MXN`,
      billing: `por mes`,
      tone: `grana`,
      includesLabel: `Todo Impulso, más`,
      benefits: [
        `Posición destacada y tarjeta premium.`,
        `Promoción periódica.`,
        `Contenido para redes.`,
        `Video corto estilo TikTok o Reel.`,
        `Métricas básicas.`,
        `Campañas o recomendaciones dentro de la app.`,
        `Prioridad en categorías.`,
        `Vinculación con eventos o lugares cercanos.`,
      ],
      idealFor: `Restaurantes consolidados, hoteles, recorridos, servicios turísticos y empresas locales con mayor interés comercial.`,
    },
    {
      id: `aliado`,
      name: `ALIADO`,
      price: `Desde $1,500 MXN`,
      billing: `por mes · cotización personalizada`,
      tone: `maguey`,
      includesLabel: `Una colaboración a la medida`,
      benefits: [
        `Campañas personalizadas.`,
        `Página web ampliada.`,
        `Producción de contenido y videos.`,
        `Integración con eventos y recorridos.`,
        `Varias sucursales y promociones.`,
        `Presencia premium y campañas dirigidas.`,
        `Métricas.`,
        `Integraciones especiales.`,
      ],
      idealFor: `Hoteles, operadores turísticos, inmobiliarias, agencias, marcas regionales, instituciones y empresas con múltiples sucursales.`,
    },
  ];
function Ze(e, t) {
  return `mailto:${Ye}?subject=${encodeURIComponent(e)}&body=${encodeURIComponent(t)}`;
}
function Footer() {
  return (0, T.jsxs)(`footer`, {
    children: [
      (0, T.jsx)(`div`, {
        className: `footer-greca`,
        "aria-hidden": `true`,
      }),
      (0, T.jsx)(`img`, {
        className: `footer-logo`,
        src: `/yuubus-icon-192.png`,
        alt: `Icono oficial de Yuu Bus`,
        width: `192`,
        height: `192`,
        loading: `lazy`,
      }),
      (0, T.jsx)(`strong`, {
        className: `footer-brand`,
        children: `Yuu Bus: Rutas Oaxaca`,
      }),
      (0, T.jsx)(`span`, {
        className: `footer-studio`,
        children: `Un producto de MonteCode`,
      }),
      (0, T.jsx)(`strong`, {
        className: `footer-trust`,
        children: `Muévete y descubre Oaxaca.`,
      }),
      (0, T.jsxs)(`nav`, {
        className: `footer-links`,
        "aria-label": `Enlaces del pie de página`,
        children: [
          (0, T.jsx)(`a`, {
            href: `/rutas/`,
            children: `Rutas`,
          }),
          (0, T.jsx)(`a`, {
            href: `/#oaxaca`,
            children: `Explora Oaxaca`,
          }),
          (0, T.jsx)(`a`, {
            href: `/#negocios`,
            children: `Negocios locales`,
          }),
          (0, T.jsx)(`a`, {
            href: `/anunciate/`,
            children: `Anúnciate`,
          }),
          (0, T.jsx)(`a`, {
            href: `/eventos/`,
            children: `Eventos`,
          }),
          (0, T.jsx)(`a`, {
            href: `/colabora/`,
            children: `Colabora`,
          }),
          (0, T.jsx)(`a`, {
            href: `/privacy/`,
            children: `Aviso de Privacidad`,
          }),
          (0, T.jsx)(`a`, {
            href: `/terminos/`,
            children: `Términos y Condiciones`,
          }),
        ],
      }),
      (0, T.jsx)(`a`, {
        className: `footer-commercial`,
        href: whatsappHref(`business`),
        target: `_blank`,
        rel: `noopener noreferrer`,
        onClick: () => trackContactAction(`business`, `footer`, `whatsapp`),
        children: `Contacto comercial por WhatsApp ↗`,
      }),
      (0, T.jsxs)(`p`, {
        children: [
          `Hecha por Equipo Yuu Bus · Oaxaca de Juárez, México`,
          (0, T.jsx)(`br`, {}),
          `App no oficial. Datos capturados por la comunidad.`,
          (0, T.jsx)(`br`, {}),
          `Contacto: `,
          (0, T.jsx)(`a`, {
            href: `mailto:${Ye}`,
            children: Ye,
          }),
        ],
      }),
      (0, T.jsx)(`button`, {
        className: `footer-cookie-button`,
        type: `button`,
        onClick: b,
        children: `Preferencias de cookies`,
      }),
    ],
  });
}
function SecondaryNavigation() {
  return (0, T.jsxs)(`details`, {
    className: `nav-more`,
    children: [
      (0, T.jsx)(`summary`, {
        children: `Más`,
      }),
      (0, T.jsxs)(`nav`, {
        className: `nav-more-menu`,
        "aria-label": `Navegación secundaria`,
        children: [
          (0, T.jsx)(`a`, {
            className: `nav-more-mobile-primary`,
            href: `/rutas/`,
            children: `Rutas`,
          }),
          (0, T.jsx)(`a`, {
            className: `nav-more-mobile-primary`,
            href: `/anunciate/`,
            children: `Anúnciate`,
          }),
          (0, T.jsx)(`a`, {
            href: `/#oaxaca`,
            children: `Explora Oaxaca`,
          }),
          (0, T.jsx)(`a`, {
            href: `/#negocios`,
            children: `Negocios locales`,
          }),
          (0, T.jsx)(`a`, {
            href: `/eventos/`,
            children: `Eventos`,
          }),
          (0, T.jsx)(`a`, {
            href: `/colabora/`,
            children: `Colabora`,
          }),
          (0, T.jsx)(`a`, {
            href: `/privacy/`,
            children: `Aviso de Privacidad`,
          }),
          (0, T.jsx)(`a`, {
            href: `/terminos/`,
            children: `Términos y Condiciones`,
          }),
        ],
      }),
    ],
  });
}
function Header() {
  let [e, t] = (0, u.useState)(`inicio`);
  return (
    (0, u.useEffect)(() => {
      let e = () =>
        document.body.classList.toggle(`is-scrolled`, window.scrollY > 24);
      return (
        e(),
        window.addEventListener(`scroll`, e, {
          passive: !0,
        }),
        () => {
          (window.removeEventListener(`scroll`, e),
            document.body.classList.remove(`is-scrolled`));
        }
      );
    }, []),
    (0, u.useEffect)(() => {
      let e = [`inicio`, `rutas`, `features`, `oaxaca`]
        .map((e) => document.getElementById(e))
        .filter((e) => !!e);
      if (!(`IntersectionObserver` in window)) return;
      let n = new IntersectionObserver(
        (e) => {
          let n = e
            .filter((e) => e.isIntersecting)
            .sort((e, t) => t.intersectionRatio - e.intersectionRatio)[0];
          n?.target.id && t(n.target.id);
        },
        {
          rootMargin: `-24% 0px -62% 0px`,
          threshold: [0, 0.15, 0.5],
        },
      );
      return (e.forEach((e) => n.observe(e)), () => n.disconnect());
    }, []),
    (0, T.jsx)(`nav`, {
      className: `nav`,
      "aria-label": `Navegación principal`,
      children: (0, T.jsxs)(`div`, {
        className: `nav-inner`,
        children: [
          (0, T.jsxs)(`a`, {
            className: `nav-logo`,
            href: `#inicio`,
            "aria-label": `Yuu Bus: Rutas Oaxaca — inicio`,
            children: [
              (0, T.jsx)(`span`, {
                className: `nav-logo-icon nav-logo-icon--official`,
                "aria-hidden": `true`,
                children: (0, T.jsx)(`img`, {
                  src: `/yuubus-icon-192.png`,
                  alt: ``,
                  width: `192`,
                  height: `192`,
                }),
              }),
              (0, T.jsx)(`span`, {
                className: `nav-logo-text`,
                children: `Yuu Bus`,
              }),
            ],
          }),
          (0, T.jsxs)(`div`, {
            className: `nav-actions`,
            children: [
              (0, T.jsx)(`a`, {
                className: `nav-link`,
                href: `/rutas/`,
                children: `Rutas`,
              }),
              (0, T.jsx)(`a`, {
                className: `nav-link`,
                href: `/eventos/`,
                children: `Eventos`,
              }),
              (0, T.jsx)(`a`, {
                className: `nav-link`,
                href: `/anunciate/`,
                children: `Anúnciate`,
              }),
              (0, T.jsx)(`a`, {
                className: `nav-link nav-optional${e === `oaxaca` ? ` is-active` : ``}`,
                href: `#oaxaca`,
                "aria-current": e === `oaxaca` ? `location` : void 0,
                children: `Explora`,
              }),
              (0, T.jsx)(SecondaryNavigation, {}),
              (0, T.jsx)(`a`, {
                className: `nav-link nav-download`,
                href: ze(Re),
                target: `_blank`,
                rel: `noopener noreferrer`,
                "aria-label": `Descargar Yuu Bus en Google Play`,
                onClick: () =>
                  x(`download_click`, {
                    platform: `android`,
                    placement: `navbar`,
                  }),
                children: `Descargar`,
              }),
            ],
          }),
        ],
      }),
    })
  );
}
function AppShowcase() {
  let [e, t] = (0, u.useState)(0),
    n = (0, u.useRef)([]),
    { tilt: r, onPointerMove: i, onPointerLeave: a } = We(2.5),
    o = Ie,
    s = (t) => {
      let n = (e - 1 + o.length) % o.length,
        r = (e + 1) % o.length;
      return t === e
        ? `phone-screen is-active`
        : t === n
          ? `phone-screen is-prev`
          : t === r
            ? `phone-screen is-next`
            : `phone-screen is-hidden`;
    },
    c = (e) => {
      (t(e),
        trackSiteEvent(`app_screenshot_interaction`, {
          screen: o[e].id,
          placement: `hero`,
        }),
        n.current[e]?.focus());
    },
    l = (e, t) => {
      let n;
      if (e.key === `ArrowRight`) n = (t + 1) % o.length;
      else if (e.key === `ArrowLeft`) n = (t - 1 + o.length) % o.length;
      else if (e.key === `Home`) n = 0;
      else if (e.key === `End`) n = o.length - 1;
      else return;
      (e.preventDefault(), c(n));
    };
  return (0, T.jsxs)(`div`, {
    className: `app-showcase`,
    "aria-label": `Pantallas reales de Yuu Bus`,
    children: [
      (0, T.jsx)(`div`, {
        className: `showcase-orbit`,
        "aria-hidden": `true`,
      }),
      (0, T.jsx)(`div`, {
        className: `phone-stack`,
        onPointerMove: i,
        onPointerLeave: a,
        style: {
          "--showcase-rx": `${r.x}deg`,
          "--showcase-ry": `${r.y}deg`,
        },
        children: o.map((t, n) =>
          (0, T.jsx)(
            `figure`,
            {
              className: s(n),
              id: `showcase-screen-${n}`,
              role: `tabpanel`,
              "aria-labelledby": `showcase-tab-${n}`,
              "aria-hidden": n !== e,
              style: {
                aspectRatio: `${t.width} / ${t.height}`,
              },
              children: (0, T.jsx)(ResponsiveScreenshot, {
                screen: t,
                alt: t.alt,
                priority: n === 0,
              }),
            },
            t.src,
          ),
        ),
      }),
      (0, T.jsx)(`div`, {
        className: `showcase-controls`,
        role: `tablist`,
        "aria-label": `Explorar Yuu Bus`,
        children: o.map((t, r) =>
          (0, T.jsxs)(
            `button`,
            {
              ref: (e) => {
                n.current[r] = e;
              },
              className: `showcase-control${r === e ? ` is-active` : ``}`,
              type: `button`,
              role: `tab`,
              id: `showcase-tab-${r}`,
              "aria-selected": r === e,
              "aria-controls": `showcase-screen-${r}`,
              tabIndex: r === e ? 0 : -1,
              onClick: () => c(r),
              onKeyDown: (e) => l(e, r),
              children: [
                (0, T.jsx)(`span`, {
                  children: String(r + 1).padStart(2, `0`),
                }),
                ` `,
                t.label,
              ],
            },
            t.label,
          ),
        ),
      }),
    ],
  });
}
function Hero() {
  let { tilt: e, onPointerMove: t, onPointerLeave: n } = We(3),
    r = ze(Re);
  return (0, T.jsxs)(`section`, {
    className: `hero`,
    id: `inicio`,
    children: [
      (0, T.jsx)(`div`, {
        className: `hero-depth`,
        "aria-hidden": `true`,
      }),
      (0, T.jsx)(HeroRouteMap, {}),
      (0, T.jsxs)(`div`, {
        className: `hero-content`,
        children: [
          (0, T.jsxs)(`div`, {
            className: `hero-copy`,
            children: [
              (0, T.jsxs)(`div`, {
                className: `hero-badge`,
                children: [
                  (0, T.jsx)(`span`, {
                    className: `material-symbols-rounded`,
                    "aria-hidden": `true`,
                    children: `android`,
                  }),
                  `Disponible para Android`,
                ],
              }),
              (0, T.jsxs)(`h1`, {
                className: `hero-title`,
                children: [
                  `Muévete y descubre `,
                  (0, T.jsx)(`span`, {
                    children: `Oaxaca.`,
                  }),
                ],
              }),
              (0, T.jsx)(`p`, {
                className: `hero-sub`,
                children: `Encuentra rutas de transporte público, descubre eventos, lugares y negocios locales. Del próximo plan a cómo llegar, con YuuBus.`,
              }),
              (0, T.jsxs)(`div`, {
                className: `btns`,
                id: `download`,
                children: [
                  (0, T.jsxs)(`a`, {
                    className: `btn-download btn-android`,
                    href: r,
                    target: `_blank`,
                    rel: `noopener noreferrer`,
                    onClick: () =>
                      x(`download_click`, {
                        platform: `android`,
                        placement: `hero`,
                      }),
                    children: [
                      (0, T.jsx)(`span`, {
                        className: `material-symbols-rounded btn-icon`,
                        "aria-hidden": `true`,
                        children: `android`,
                      }),
                      (0, T.jsxs)(`span`, {
                        className: `btn-label`,
                        children: [
                          (0, T.jsx)(`small`, {
                            children: `Disponible en`,
                          }),
                          (0, T.jsx)(`strong`, {
                            children: `Google Play`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, T.jsxs)(`a`, {
                    className: `btn-download btn-secondary`,
                    href: `#oaxaca`,
                    onClick: () =>
                      x(`explore_click`, {
                        platform: `web`,
                        placement: `hero`,
                      }),
                    children: [
                      (0, T.jsx)(`span`, {
                        className: `material-symbols-rounded btn-icon`,
                        "aria-hidden": `true`,
                        children: `route`,
                      }),
                      (0, T.jsx)(`span`, {
                        className: `btn-label`,
                        children: (0, T.jsx)(`strong`, {
                          children: `Explora Oaxaca`,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, T.jsx)(`p`, {
                className: `hero-availability`,
                children: `Próximamente en App Store.`,
              }),
              (0, T.jsxs)(`div`, {
                className: `qr-section`,
                onPointerMove: t,
                onPointerLeave: n,
                style: {
                  "--qr-rotate-x": `${e.x}deg`,
                  "--qr-rotate-y": `${e.y}deg`,
                },
                children: [
                  (0, T.jsx)(`a`, {
                    href: r,
                    target: `_blank`,
                    rel: `noopener noreferrer`,
                    "aria-label": `Abrir Yuu Bus: Rutas Oaxaca en Google Play`,
                    onClick: () =>
                      x(`download_click`, {
                        platform: `android`,
                        placement: `hero_qr`,
                      }),
                    children: (0, T.jsx)(`img`, {
                      className: `qr-image`,
                      src: `/qr-code.png`,
                      alt: `QR para descargar Yuu Bus: Rutas Oaxaca en Google Play`,
                      width: `104`,
                      height: `104`,
                    }),
                  }),
                  (0, T.jsxs)(`div`, {
                    className: `qr-label`,
                    children: [
                      (0, T.jsx)(`strong`, {
                        children: `Escanea para descargar`,
                      }),
                      (0, T.jsx)(`p`, {
                        children: `Abre Yuu Bus en Google Play.`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, T.jsx)(AppShowcase, {}),
        ],
      }),
    ],
  });
}
function HowItWorks() {
  return (0, T.jsxs)(`section`, {
    className: `how-section`,
    id: `rutas`,
    "aria-labelledby": `how-title`,
    children: [
      (0, T.jsxs)(`header`, {
        className: `section-heading`,
        children: [
          (0, T.jsx)(`p`, {
            className: `section-tag`,
            children: `Planea tu viaje en la app`,
          }),
          (0, T.jsx)(`h2`, {
            className: `section-title`,
            id: `how-title`,
            children: `De tu destino a una ruta, en tres pasos.`,
          }),
          (0, T.jsx)(`p`, {
            className: `journey-intro`,
            children: `Abre un evento o un negocio con ubicación disponible y toca Cómo llegar. Elige tu origen y compara las opciones en YuuBus.`,
          }),
        ],
      }),
      (0, T.jsxs)(`div`, {
        className: `how-journey`,
        "aria-hidden": `true`,
        children: [
          (0, T.jsx)(`span`, {
            className: `how-journey-node is-first`,
            children: `BUSCA`,
          }),
          (0, T.jsx)(`span`, {
            className: `how-journey-node`,
            children: `ELIGE`,
          }),
          (0, T.jsx)(`span`, {
            className: `how-journey-node`,
            children: `LLEGA`,
          }),
        ],
      }),
      (0, T.jsx)(`div`, {
        className: `how-grid`,
        children: Be.map((e) =>
          (0, T.jsxs)(
            `article`,
            {
              className: `how-card`,
              children: [
                (0, T.jsx)(`div`, {
                  className: `how-screen`,
                  children: (0, T.jsx)(ResponsiveScreenshot, {
                    screen: e.screen,
                    sizes: `(max-width: 620px) 260px, 300px`,
                  }),
                }),
                (0, T.jsxs)(`div`, {
                  className: `how-copy`,
                  children: [
                    (0, T.jsx)(`span`, {
                      className: `how-step`,
                      children: e.step,
                    }),
                    (0, T.jsx)(`span`, {
                      className: `material-symbols-rounded`,
                      "aria-hidden": `true`,
                      children: e.icon,
                    }),
                    (0, T.jsx)(`h3`, {
                      children: e.title,
                    }),
                    (0, T.jsx)(`p`, {
                      children: e.description,
                    }),
                  ],
                }),
              ],
            },
            e.step,
          ),
        ),
      }),
    ],
  });
}
function MobileStickyCTA() {
  let [e, t] = (0, u.useState)(!0),
    [n, r] = (0, u.useState)(!1);
  (0, u.useEffect)(() => {
    let e = document.querySelector(`#inicio`),
      n = document.querySelector(`.final-cta`);
    if (!e || !n || !(`IntersectionObserver` in window)) return;
    let i = new IntersectionObserver(([e]) => t(e.isIntersecting), {
        threshold: 0.05,
      }),
      a = new IntersectionObserver(([e]) => r(e.isIntersecting), {
        threshold: 0.05,
      });
    return (
      i.observe(e),
      a.observe(n),
      () => {
        (i.disconnect(), a.disconnect());
      }
    );
  }, []);
  let i = !e && !n;
  return (0, T.jsxs)(`aside`, {
    className: `mobile-sticky-cta${i ? ` is-visible` : ``}`,
    "aria-hidden": !i,
    children: [
      (0, T.jsx)(`span`, {
        className: `mobile-sticky-mark material-symbols-rounded`,
        "aria-hidden": `true`,
        children: `route`,
      }),
      (0, T.jsxs)(`span`, {
        className: `mobile-sticky-copy`,
        children: [
          (0, T.jsx)(`strong`, {
            children: `Yuu Bus`,
          }),
          (0, T.jsx)(`small`, {
            children: `Rutas Oaxaca`,
          }),
        ],
      }),
      (0, T.jsx)(`a`, {
        href: ze(Re),
        target: `_blank`,
        rel: `noopener noreferrer`,
        tabIndex: i ? 0 : -1,
        onClick: () =>
          x(`download_click`, {
            platform: `android`,
            placement: `mobile_sticky`,
          }),
        children: `Descargar`,
      }),
    ],
  });
}
function ProblemSection() {
  return (0, T.jsxs)(`section`, {
    className: `problem-section`,
    "aria-labelledby": `problem-title`,
    children: [
      (0, T.jsx)(`span`, {
        className: `problem-mark material-symbols-rounded`,
        "aria-hidden": `true`,
        children: `multiple_stop`,
      }),
      (0, T.jsxs)(`div`, {
        children: [
          (0, T.jsx)(`p`, {
            className: `section-tag`,
            children: `Movilidad + descubrimiento`,
          }),
          (0, T.jsx)(`h2`, {
            id: `problem-title`,
            children: `No solamente te mostramos qué existe en Oaxaca. También te mostramos cómo llegar.`,
          }),
        ],
      }),
      (0, T.jsx)(`p`, {
        children: `Un lugar que quieres conocer. Un evento al que quieres ir. Y las rutas y paradas para planear tu viaje antes de salir.`,
      }),
    ],
  });
}
function Stats() {
  let [counts, setCounts] = (0, u.useState)(null);
  (0, u.useEffect)(() => {
    const controller = new AbortController();
    fetch('/route-stats.json', {signal: controller.signal})
      .then(response => { if (!response.ok) throw Error('Routes unavailable'); return response.json(); })
      .then(setCounts).catch(() => {});
    return () => controller.abort();
  }, []);
  const st = [
    {value: counts ? counts.routes.toLocaleString('es-MX') : '—', label: 'Rutas disponibles'},
    {value: counts ? counts.stops.toLocaleString('es-MX') : '—', label: 'Paradas registradas'},
  ];
  return (0, T.jsxs)(`div`, {
    className: `stats`,
    "aria-label": `Cobertura actual de Yuu Bus`,
    children: [
      st.map((e) =>
        (0, T.jsxs)(
          `div`,
          {
            className: `stat`,
            children: [
              (0, T.jsx)(`div`, {
                className: `stat-num`,
                children: e.value,
              }),
              (0, T.jsx)(`div`, {
                className: `stat-label`,
                children: e.label,
              }),
            ],
          },
          e.label,
        ),
      ),
      (0, T.jsxs)(`p`, {
        className: `stats-trust`,
        children: [
          (0, T.jsx)(`span`, {
            className: `material-symbols-rounded`,
            "aria-hidden": `true`,
            children: `route`,
          }),
          `Hecho para moverse por Oaxaca.`,
        ],
      }),
    ],
  });
}
function lt(e) {
  return {
    whatsapp: whatsappHref(e),
    email: Ze(whatsappMessages[e], whatsappMessages[e]),
  };
}
function ContactActions({
  intent: e = `general`,
  placement: t,
  compact: n = !1,
}) {
  let r = lt(e);
  return (0, T.jsxs)(`div`, {
    className: `contact-actions${n ? ` contact-actions--compact` : ``}`,
    children: [
      (0, T.jsxs)(`a`, {
        className: `contact-whatsapp`,
        href: r.whatsapp,
        target: `_blank`,
        rel: `noopener noreferrer`,
        onClick: () => trackContactAction(e, t, `whatsapp`),
        children: [
          `Hablemos por WhatsApp `,
          (0, T.jsx)(`span`, {
            "aria-hidden": `true`,
            children: `↗`,
          }),
        ],
      }),
      (0, T.jsxs)(`a`, {
        className: `contact-email`,
        href: r.email,
        onClick: () => trackContactAction(e, t, `email`),
        children: [
          `Prefiero escribir por correo `,
          (0, T.jsx)(`span`, {
            "aria-hidden": `true`,
            children: `↗`,
          }),
        ],
      }),
    ],
  });
}
var dt = [
  [
    `Perfil`,
    `Cuenta lo que hace especial a tu negocio.`,
    `M4 4h16v16H4zM8 9h8m-8 4h8m-8 4h4`,
  ],
  [
    `Ubicación`,
    `Tu lugar, con información para encontrarlo.`,
    `M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13zm0-17a4 4 0 1 0 0 8 4 4 0 0 0 0-8`,
  ],
  [
    `Contacto`,
    `Una forma directa de saber más de ti.`,
    `M4 4h16v12H9l-5 4V4zm4 4h8m-8 4h5`,
  ],
  [
    `Promociones`,
    `Comparte novedades según tu plan.`,
    `M3 3h9l9 9-9 9-9-9V3zm4 4h.01`,
  ],
  [
    `Descubrimiento`,
    `Presencia entre las opciones locales.`,
    `m12 3 2.8 5.8L21 10l-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 10l6.2-1.2L12 3z`,
  ],
  [
    `Cómo llegar`,
    `Conecta tu ubicación con la movilidad.`,
    `M5 3v12a4 4 0 0 0 4 4h10m-4-4 4 4-4 4M3 3h4m10 0 3 3-3 3-3-3 3-3z`,
  ],
];
function BusinessOwnerSection() {
  return (0, T.jsxs)(`section`, {
    id: `para-negocios`,
    className: `business-owner-v2`,
    "aria-labelledby": `business-preview-title`,
    children: [
      (0, T.jsxs)(`div`, {
        className: `business-owner-copy`,
        children: [
          (0, T.jsxs)(`p`, {
            className: `business-eyebrow`,
            children: [
              (0, T.jsx)(`span`, {
                "aria-hidden": `true`,
              }),
              `Para quienes hacen Oaxaca`,
            ],
          }),
          (0, T.jsxs)(`h2`, {
            id: `business-preview-title`,
            children: [
              `Haz que más personas `,
              (0, T.jsx)(`em`, {
                children: `encuentren tu negocio.`,
              }),
            ],
          }),
          (0, T.jsx)(`p`, {
            children: `Tu historia, tu lugar y una forma de llegar. Forma parte de YuuBus y conecta con quienes se mueven y descubren Oaxaca.`,
          }),
          (0, T.jsx)(ContactActions, {
            intent: `business`,
            placement: `home_business`,
            compact: !0,
          }),
          (0, T.jsxs)(`a`, {
            className: `business-owner-plans-link`,
            href: `/anunciate/`,
            onClick: () =>
              trackSiteEvent(`business_cta`, {
                placement: `home`,
              }),
            children: [
              `Conoce los planes`,
              (0, T.jsx)(`span`, {
                "aria-hidden": `true`,
                children: `↗`,
              }),
            ],
          }),
        ],
      }),
      (0, T.jsxs)(`div`, {
        className: `business-owner-details`,
        children: [
          (0, T.jsx)(`p`, {
            className: `business-owner-note`,
            children: `Tu negocio, con más formas de ser descubierto.`,
          }),
          (0, T.jsx)(`ul`, {
            children: dt.map(([e, t, n]) =>
              (0, T.jsxs)(
                `li`,
                {
                  children: [
                    (0, T.jsx)(`svg`, {
                      width: `26`,
                      height: `26`,
                      viewBox: `0 0 24 24`,
                      fill: `none`,
                      stroke: `currentColor`,
                      strokeWidth: `1.5`,
                      strokeLinecap: `round`,
                      strokeLinejoin: `round`,
                      "aria-hidden": `true`,
                      children: (0, T.jsx)(`path`, {
                        d: n,
                      }),
                    }),
                    (0, T.jsx)(`h3`, {
                      children: e,
                    }),
                    (0, T.jsx)(`p`, {
                      children: t,
                    }),
                  ],
                },
                e,
              ),
            ),
          }),
          (0, T.jsx)(`p`, {
            className: `business-owner-footnote`,
            children: `Alcance y funciones según el plan. Cómo llegar requiere una ubicación verificada.`,
          }),
        ],
      }),
      (0, T.jsxs)(`div`, {
        className: `business-owner-bottom`,
        children: [
          (0, T.jsx)(`div`, {
            className: `business-signature`,
            "aria-hidden": `true`,
          }),
          (0, T.jsx)(`div`, {
            className: `business-owner-plans`,
            "aria-label": `Planes disponibles`,
            children: Xe.map((e) =>
              (0, T.jsxs)(
                `p`,
                {
                  children: [
                    (0, T.jsx)(`strong`, {
                      children: e.name,
                    }),
                    (0, T.jsx)(`span`, {
                      children: e.price,
                    }),
                    (0, T.jsx)(`small`, {
                      children: e.billing,
                    }),
                  ],
                },
                e.id,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
function pt(e) {
  let t = /^#[a-f0-9]{6}$/i.test(e) ? e : `#352078`,
    n = [1, 3, 5]
      .map((e) => parseInt(t.slice(e, e + 2), 16) / 255)
      .map((e) => (e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4)),
    r = 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
  return (r + 0.05) / 0.05 >= 1.05 / (r + 0.05) ? `#000000` : `#ffffff`;
}
function HomeRoutesPreview() {
  let [e, t] = (0, u.useState)([]);
  return (
    (0, u.useEffect)(() => {
      let e = new AbortController();
      return (
        fetch(`/routes-preview.json`, {
          signal: e.signal,
        })
          .then((e) => (e.ok ? e.json() : []))
          .then((e) => t(e.slice(0, 4)))
          .catch(() => void 0),
        () => e.abort()
      );
    }, []),
    (0, u.useEffect)(() => {
      window.dispatchEvent(new Event(`yuubus:content-ready`));
    }, [e]),
    e.length === 0
      ? null
      : (0, T.jsxs)(`section`, {
          className: `routes-preview`,
          "aria-labelledby": `routes-preview-title`,
          children: [
            (0, T.jsxs)(`header`, {
              children: [
                (0, T.jsx)(`p`, {
                  className: `section-tag`,
                  children: `RED YUUBUS`,
                }),
                (0, T.jsx)(`h2`, {
                  id: `routes-preview-title`,
                  children: `Explora rutas`,
                }),
                (0, T.jsx)(`p`, {
                  children: `Consulta recorridos y paradas registradas para moverte por Oaxaca.`,
                }),
              ],
            }),
            (0, T.jsx)(`div`, {
              className: `routes-preview-grid`,
              children: e.map((e) =>
                (0, T.jsxs)(
                  `a`,
                  {
                    className: `route-preview-card`,
                    href: `/rutas/${e.slug}/`,
                    style: {
                      "--route-color": e.color,
                      "--route-ink": pt(e.color),
                    },
                    onClick: () =>
                      trackSiteEvent(`routes_preview_click`, {
                        route_id: e.id,
                        placement: `home`,
                      }),
                    children: [
                      (0, T.jsx)(`span`, {
                        className: `route-preview-code`,
                        children: e.id,
                      }),
                      (0, T.jsxs)(`strong`, {
                        children: [e.origin, ` → `, e.destination],
                      }),
                      (0, T.jsxs)(`span`, {
                        children: [e.stopCount, ` paradas registradas`],
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            }),
            (0, T.jsxs)(`a`, {
              className: `routes-preview-cta`,
              href: `/rutas/`,
              onClick: () =>
                trackSiteEvent(`routes_preview_click`, {
                  route_id: `all`,
                  placement: `home`,
                }),
              children: [
                `Ver todas las rutas`,
                (0, T.jsx)(`span`, {
                  className: `material-symbols-rounded`,
                  "aria-hidden": `true`,
                  children: `arrow_forward`,
                }),
              ],
            }),
          ],
        })
  );
}
function LandingPage() {
  return (0, T.jsxs)(T.Fragment, {
    children: [
      (0, T.jsx)(`a`, {
        className: `skip-link`,
        href: `#contenido`,
        children: `Saltar al contenido`,
      }),
      (0, T.jsx)(Header, {}),
      (0, T.jsxs)(`main`, {
        id: `contenido`,
        children: [
          (0, T.jsx)(Hero, {}),
          (0, T.jsx)(Stats, {}),
          (0, T.jsx)(ProblemSection, {}),
          (0, T.jsx)(RouteDivider, {}),
          (0, T.jsx)(HomeRoutesPreview, {}),
          (0, T.jsx)(RouteDivider, {}),
          (0, T.jsx)(DiscoverySection, {}),
          (0, T.jsx)(BusinessesV2, {}),
          (0, T.jsx)(HomeEventsPreview, {}),
          (0, T.jsx)(HowItWorks, {}),
          (0, T.jsx)(FeatureExplorer, {}),
          (0, T.jsx)(BusinessOwnerSection, {}),
          (0, T.jsx)(FinalCTA, {}),
        ],
      }),
      (0, T.jsx)(Footer, {}),
      (0, T.jsx)(MobileStickyCTA, {}),
    ],
  });
}
function PageHeader() {
  return (0, T.jsxs)(T.Fragment, {
    children: [
      (0, T.jsx)(`a`, {
        className: `skip-link`,
        href: `#contenido`,
        children: `Saltar al contenido`,
      }),
      (0, T.jsx)(`header`, {
        className: `page-header`,
        children: (0, T.jsxs)(`div`, {
          className: `page-header-inner`,
          children: [
            (0, T.jsxs)(`a`, {
              className: `page-brand`,
              href: `/`,
              "aria-label": `Yuu Bus — inicio`,
              children: [
                (0, T.jsx)(`img`, {
                  src: `/yuubus-icon-192.png`,
                  alt: ``,
                  width: `192`,
                  height: `192`,
                }),
                (0, T.jsx)(`span`, {
                  children: `Yuu Bus`,
                }),
              ],
            }),
            (0, T.jsxs)(`nav`, {
              className: `page-header-links`,
              "aria-label": `Navegación principal`,
              children: [
                (0, T.jsx)(`a`, {
                  className: `page-header-primary`,
                  href: `/rutas/`,
                  children: `Rutas`,
                }),
                (0, T.jsx)(`a`, {
                  className: `page-header-primary`,
                  href: `/anunciate/`,
                  children: `Anúnciate`,
                }),
                (0, T.jsx)(SecondaryNavigation, {}),
                (0, T.jsx)(`a`, {
                  className: `page-home-link`,
                  href: `/`,
                  children: `Inicio`,
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function gt({ className: e }) {
  return (0, T.jsxs)(`svg`, {
    className: e,
    viewBox: `0 0 24 24`,
    "aria-hidden": `true`,
    focusable: `false`,
    children: [
      (0, T.jsx)(`circle`, {
        cx: `12`,
        cy: `12`,
        r: `9`,
      }),
      (0, T.jsx)(`path`, {
        d: `m8.2 12.1 2.5 2.5 5.2-5.4`,
      }),
    ],
  });
}
function SponsorPlans() {
  return (0, T.jsx)(`section`, {
    className: `sponsor-section`,
    id: `planes`,
    "aria-labelledby": `sponsor-title`,
    children: (0, T.jsxs)(`div`, {
      className: `sponsor-shell`,
      children: [
        (0, T.jsxs)(`header`, {
          className: `sponsor-heading`,
          children: [
            (0, T.jsx)(`p`, {
              className: `section-tag`,
              children: `Planes actuales`,
            }),
            (0, T.jsx)(`h2`, {
              className: `section-title`,
              id: `sponsor-title`,
              children: `Elige el nivel de presencia para tu negocio.`,
            }),
          ],
        }),
        (0, T.jsx)(`div`, {
          className: `sponsor-grid`,
          children: Xe.map((e, t) => {
            let n = String(t + 1).padStart(2, `0`);
            return (0, T.jsxs)(
              `article`,
              {
                className: `sponsor-card sponsor-card--${e.tone}`,
                children: [
                  (0, T.jsxs)(`div`, {
                    className: `sponsor-card-header`,
                    children: [
                      (0, T.jsxs)(`span`, {
                        className: `sponsor-plan-chip`,
                        children: [`PLAN `, n],
                      }),
                      (0, T.jsx)(`h3`, {
                        children: e.name,
                      }),
                      (0, T.jsx)(`p`, {
                        className: `sponsor-price`,
                        children: e.price,
                      }),
                      (0, T.jsx)(`span`, {
                        className: `sponsor-billing`,
                        children: e.billing,
                      }),
                    ],
                  }),
                  (0, T.jsxs)(`div`, {
                    className: `sponsor-card-body`,
                    children: [
                      (0, T.jsx)(`strong`, {
                        className: `sponsor-includes`,
                        children: e.includesLabel,
                      }),
                      (0, T.jsx)(`ul`, {
                        className: `sponsor-benefits`,
                        children: e.benefits.map((e) =>
                          (0, T.jsxs)(
                            `li`,
                            {
                              children: [
                                (0, T.jsx)(gt, {
                                  className: `plan-inline-icon plan-inline-icon--check`,
                                }),
                                (0, T.jsx)(`span`, {
                                  children: e,
                                }),
                              ],
                            },
                            e,
                          ),
                        ),
                      }),
                    ],
                  }),
                  (0, T.jsxs)(`div`, {
                    className: `sponsor-ideal`,
                    children: [
                      (0, T.jsx)(`strong`, {
                        children: `Ideal para`,
                      }),
                      (0, T.jsx)(`p`, {
                        children: e.idealFor,
                      }),
                    ],
                  }),
                  (0, T.jsxs)(`a`, {
                    className: `sponsor-contact`,
                    href: whatsappHref(`advertise`),
                    target: `_blank`,
                    rel: `noopener noreferrer`,
                    "aria-label": `Consultar plan ${e.name} por WhatsApp`,
                    onClick: () => {
                      (trackSiteEvent(`business_plan_selected`, {
                        plan: e.id,
                        placement: `anunciate`,
                      }),
                        trackContactAction(
                          `advertise`,
                          `plan_${e.id}`,
                          `whatsapp`,
                        ));
                    },
                    children: [
                      `Consultar por WhatsApp `,
                      (0, T.jsx)(`span`, {
                        "aria-hidden": `true`,
                        children: `↗`,
                      }),
                    ],
                  }),
                ],
              },
              e.id,
            );
          }),
        }),
      ],
    }),
  });
}
function usePageMetadata({ title: e, description: t, path: n }) {
  (0, u.useEffect)(() => {
    let r = `https://www.yuubus.com${n.endsWith(`/`) ? n : `${n}/`}`,
      i = document.querySelector(`link[rel="canonical"]`),
      a = document.querySelector(`meta[name="description"]`),
      o = document.querySelector(`meta[property="og:title"]`),
      s = document.querySelector(`meta[property="og:description"]`),
      c = document.querySelector(`meta[property="og:url"]`),
      l = document.querySelector(`meta[name="twitter:title"]`),
      u = document.querySelector(`meta[name="twitter:description"]`);
    ((document.title = e),
      i?.setAttribute(`href`, r),
      a?.setAttribute(`content`, t),
      o?.setAttribute(`content`, e),
      s?.setAttribute(`content`, t),
      c?.setAttribute(`content`, r),
      l?.setAttribute(`content`, e),
      u?.setAttribute(`content`, t));
  }, [t, n, e]);
}
function AdvertisePage() {
  return (
    usePageMetadata({
      title: `Anúnciate en YuuBus | Negocios de Oaxaca`,
      description: `Dale presencia a tu negocio en YuuBus. Conoce los planes y contáctanos por WhatsApp para que más personas sepan dónde estás y cómo llegar.`,
      path: `/anunciate`,
    }),
    (0, T.jsxs)(`div`, {
      className: `content-page commercial-page`,
      children: [
        (0, T.jsx)(PageHeader, {}),
        (0, T.jsxs)(`main`, {
          id: `contenido`,
          children: [
            (0, T.jsxs)(`section`, {
              className: `content-hero`,
              "aria-labelledby": `advertise-title`,
              children: [
                (0, T.jsx)(`p`, {
                  className: `section-tag`,
                  children: `Tu negocio, más cerca`,
                }),
                (0, T.jsx)(`h1`, {
                  id: `advertise-title`,
                  children: `Haz que más personas descubran tu negocio y sepan cómo llegar.`,
                }),
                (0, T.jsx)(`p`, {
                  children: `YuuBus es la app para consultar transporte público y descubrir Oaxaca. Tu negocio puede estar presente cuando alguien busca un lugar al que ir.`,
                }),
                (0, T.jsx)(ContactActions, {
                  intent: `advertise`,
                  placement: `advertise_hero`,
                }),
                (0, T.jsx)(`a`, {
                  className: `commercial-text-link`,
                  href: `#planes`,
                  children: `Ver planes y precios ↓`,
                }),
              ],
            }),
            (0, T.jsxs)(`section`, {
              className: `content-panel commercial-benefits`,
              "aria-labelledby": `business-benefits-title`,
              children: [
                (0, T.jsx)(`h2`, {
                  id: `business-benefits-title`,
                  children: `Que te conozcan. Que te encuentren. Que lleguen.`,
                }),
                (0, T.jsxs)(`div`, {
                  className: `commercial-benefit-grid`,
                  children: [
                    (0, T.jsxs)(`article`, {
                      children: [
                        (0, T.jsx)(`span`, {
                          children: `01`,
                        }),
                        (0, T.jsx)(`h3`, {
                          children: `Cuenta qué ofreces`,
                        }),
                        (0, T.jsx)(`p`, {
                          children: `Nombre, categoría, descripción y fotografías para que las personas conozcan tu negocio.`,
                        }),
                      ],
                    }),
                    (0, T.jsxs)(`article`, {
                      children: [
                        (0, T.jsx)(`span`, {
                          children: `02`,
                        }),
                        (0, T.jsx)(`h3`, {
                          children: `Facilita el contacto`,
                        }),
                        (0, T.jsx)(`p`, {
                          children: `Ubicación, horarios, teléfono, WhatsApp y redes sociales, reunidos en tu perfil.`,
                        }),
                      ],
                    }),
                    (0, T.jsxs)(`article`, {
                      children: [
                        (0, T.jsx)(`span`, {
                          children: `03`,
                        }),
                        (0, T.jsx)(`h3`, {
                          children: `Ayuda a llegar`,
                        }),
                        (0, T.jsx)(`p`, {
                          children: `Conecta tu ubicación con las opciones de transporte disponibles en YuuBus.`,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, T.jsxs)(`section`, {
              className: `commercial-example`,
              "aria-labelledby": `business-example-title`,
              children: [
                (0, T.jsxs)(`div`, {
                  children: [
                    (0, T.jsx)(`p`, {
                      className: `section-tag`,
                      children: `Del lugar al recorrido`,
                    }),
                    (0, T.jsx)(`h2`, {
                      id: `business-example-title`,
                      children: `Una dirección es útil. Saber cómo llegar, también.`,
                    }),
                    (0, T.jsxs)(`p`, {
                      children: [
                        `La persona consulta un lugar, toca `,
                        (0, T.jsx)(`strong`, {
                          children: `Cómo llegar`,
                        }),
                        ` y elige desde dónde salir. YuuBus le permite comparar las opciones de viaje disponibles.`,
                      ],
                    }),
                    (0, T.jsx)(`p`, {
                      children: `Así se ve el planificador real de la app, con Alameda de León como destino de un evento. Para tu negocio, revisamos contigo su ubicación y la información que aparecerá antes de publicarla.`,
                    }),
                    (0, T.jsx)(`a`, {
                      className: `commercial-text-link`,
                      href: `#empezar`,
                      children: `Cómo empezar ↓`,
                    }),
                  ],
                }),
                (0, T.jsxs)(`figure`, {
                  children: [
                    (0, T.jsx)(ResponsiveScreenshot, {
                      screen: Ie[3],
                      sizes: `(max-width: 620px) 260px, 300px`,
                    }),
                    (0, T.jsx)(`figcaption`, {
                      children: `Captura real de «Planea tu viaje». Ejemplo de movilidad hacia un evento.`,
                    }),
                  ],
                }),
              ],
            }),
            (0, T.jsx)(SponsorPlans, {}),
            (0, T.jsxs)(`section`, {
              className: `content-panel commercial-start`,
              id: `empezar`,
              "aria-labelledby": `business-start-title`,
              children: [
                (0, T.jsx)(`p`, {
                  className: `section-tag`,
                  children: `Hablemos de tu negocio`,
                }),
                (0, T.jsx)(`h2`, {
                  id: `business-start-title`,
                  children: `Empieza con una conversación.`,
                }),
                (0, T.jsxs)(`ol`, {
                  children: [
                    (0, T.jsxs)(`li`, {
                      children: [
                        (0, T.jsx)(`strong`, {
                          children: `Escríbenos por WhatsApp.`,
                        }),
                        ` Cuéntanos qué tipo de negocio tienes.`,
                      ],
                    }),
                    (0, T.jsxs)(`li`, {
                      children: [
                        (0, T.jsx)(`strong`, {
                          children: `Revisamos juntos las opciones.`,
                        }),
                        ` Resolvemos dudas del plan y de la información de tu perfil.`,
                      ],
                    }),
                    (0, T.jsxs)(`li`, {
                      children: [
                        (0, T.jsx)(`strong`, {
                          children: `Confirma cómo aparecerás.`,
                        }),
                        ` Acordamos contigo los detalles antes de publicar.`,
                      ],
                    }),
                  ],
                }),
                (0, T.jsx)(ContactActions, {
                  intent: `advertise`,
                  placement: `advertise_start`,
                }),
              ],
            }),
          ],
        }),
        (0, T.jsx)(Footer, {}),
      ],
    })
  );
}
var bt = [
  [
    `Reportar información`,
    `Comparte datos que puedan ayudar a revisar una parada, un recorrido o una referencia.`,
  ],
  [
    `Validar rutas`,
    `Apoya con observaciones de campo para contrastar la información disponible.`,
  ],
  [
    `Informar cambios`,
    `Avísanos cuando una ruta, parada o recorrido haya cambiado.`,
  ],
  [
    `Colaborar con datos`,
    `Contribuye con información verificable y respetuosa de los derechos de terceros.`,
  ],
  [
    `Negocios y colaboración local`,
    `Si tienes un negocio, organizas actividades o quieres sumar una colaboración local, conversemos sobre una propuesta.`,
  ],
  [
    `Desarrollo y diseño`,
    `Cuando corresponda, puedes manifestar interés en apoyar mejoras técnicas o visuales.`,
  ],
];
function CollaboratePage() {
  return (
    usePageMetadata({
      title: `Colabora con YuuBus | Movilidad en Oaxaca`,
      description: `Conoce formas de colaborar con información, validación de rutas, datos, desarrollo o diseño para mejorar YuuBus.`,
      path: `/colabora`,
    }),
    (0, T.jsxs)(`div`, {
      className: `content-page commercial-page`,
      children: [
        (0, T.jsx)(PageHeader, {}),
        (0, T.jsxs)(`main`, {
          id: `contenido`,
          children: [
            (0, T.jsxs)(`section`, {
              className: `content-hero`,
              "aria-labelledby": `collaborate-title`,
              children: [
                (0, T.jsx)(`p`, {
                  className: `section-tag`,
                  children: `Comunidad Yuu Bus`,
                }),
                (0, T.jsx)(`h1`, {
                  id: `collaborate-title`,
                  children: `Ayúdanos a mejorar la información para moverse por Oaxaca.`,
                }),
                (0, T.jsx)(`p`, {
                  children: `Conoces tu colonia, sus recorridos y sus lugares. Tu experiencia puede ayudar a que más personas se muevan con información clara.`,
                }),
                (0, T.jsx)(ContactActions, {
                  intent: `collaborate`,
                  placement: `collaborate_hero`,
                }),
              ],
            }),
            (0, T.jsx)(`section`, {
              className: `collaboration-grid`,
              "aria-label": `Formas de colaborar`,
              children: bt.map(([e, t]) =>
                (0, T.jsxs)(
                  `article`,
                  {
                    className: `collaboration-card`,
                    children: [
                      (0, T.jsx)(`h2`, {
                        children: e,
                      }),
                      (0, T.jsx)(`p`, {
                        children: t,
                      }),
                    ],
                  },
                  e,
                ),
              ),
            }),
            (0, T.jsxs)(`section`, {
              className: `content-action`,
              "aria-labelledby": `collaborate-action-title`,
              children: [
                (0, T.jsx)(`h2`, {
                  id: `collaborate-action-title`,
                  children: `¿Te interesa participar?`,
                }),
                (0, T.jsx)(`p`, {
                  children: `Estas opciones no constituyen una oferta de empleo ni una promesa de pago.`,
                }),
                (0, T.jsx)(ContactActions, {
                  intent: `collaborate`,
                  placement: `collaborate_footer`,
                }),
              ],
            }),
          ],
        }),
        (0, T.jsx)(Footer, {}),
      ],
    })
  );
}
function PrivacyPage() {
  return (
    usePageMetadata({
      title: `Aviso de Privacidad | Yuu Bus: Rutas Oaxaca`,
      description: `Consulta el Aviso de Privacidad de Yuu Bus y el uso de datos, cookies y tecnologías de medición.`,
      path: `/privacy`,
    }),
    (0, T.jsxs)(`div`, {
      className: `privacy-page`,
      children: [
        (0, T.jsx)(PageHeader, {}),
        (0, T.jsx)(`header`, {
          className: `privacy-header`,
          children: (0, T.jsxs)(`div`, {
            className: `privacy-header-inner`,
            children: [
              (0, T.jsx)(`p`, {
                className: `privacy-eyebrow`,
                children: `MonteCode · Código con raíz`,
              }),
              (0, T.jsx)(`h1`, {
                id: `privacy-title`,
                children: `Aviso de Privacidad`,
              }),
              (0, T.jsx)(`p`, {
                className: `privacy-subtitle`,
                children: `Información sobre el tratamiento de datos en Yuu Bus: Rutas Oaxaca.`,
              }),
              (0, T.jsxs)(`div`, {
                className: `privacy-metadata`,
                children: [
                  (0, T.jsx)(`span`, {
                    children: `Última actualización: 28 de agosto de 2026`,
                  }),
                  (0, T.jsx)(`span`, {
                    children: `Paquete: mx.oaxaca.rutasoaxaca`,
                  }),
                ],
              }),
            ],
          }),
        }),
        (0, T.jsxs)(`main`, {
          id: `contenido`,
          className: `privacy-content`,
          "aria-labelledby": `privacy-title`,
          children: [
            (0, T.jsxs)(`section`, {
              className: `privacy-summary`,
              children: [
                (0, T.jsx)(`strong`, {
                  children: `Resumen:`,
                }),
                ` Yuu Bus no requiere una cuenta y no vende información personal. La ubicación se solicita sólo cuando el usuario utiliza funciones que la necesitan y no se accede a ella en segundo plano.`,
              ],
            }),
            (0, T.jsx)(`h2`, {
              children: `1. Responsable y alcance`,
            }),
            (0, T.jsxs)(`p`, {
              children: [
                `Esta política corresponde a la aplicación `,
                (0, T.jsx)(`strong`, {
                  children: `Yuu Bus: Rutas Oaxaca`,
                }),
                `, desarrollada por`,
                ` `,
                (0, T.jsx)(`strong`, {
                  children: `MonteCode`,
                }),
                `. Describe cómo la aplicación accede, utiliza, almacena y protege información al ofrecer mapas, rutas de transporte, paradas cercanas y eventos de Oaxaca.`,
              ],
            }),
            (0, T.jsx)(`h2`, {
              children: `2. Ubicación del dispositivo`,
            }),
            (0, T.jsx)(`p`, {
              children: `La aplicación puede solicitar ubicación aproximada o precisa para mostrar la posición del usuario en el mapa, encontrar paradas cercanas, recomendar puntos de abordaje y seguir una ruta mientras la función está activa.`,
            }),
            (0, T.jsxs)(`ul`, {
              children: [
                (0, T.jsx)(`li`, {
                  children: `El permiso es opcional y se solicita mediante el sistema operativo.`,
                }),
                (0, T.jsx)(`li`, {
                  children: `La ubicación se utiliza mientras la aplicación está en uso.`,
                }),
                (0, T.jsx)(`li`, {
                  children: `La aplicación no solicita acceso a la ubicación en segundo plano.`,
                }),
                (0, T.jsx)(`li`, {
                  children: `MonteCode no opera un servidor que reciba o almacene el historial de ubicación del usuario.`,
                }),
                (0, T.jsx)(`li`, {
                  children: `Si se rechaza el permiso, siguen disponibles las funciones que no requieren posicionamiento automático.`,
                }),
              ],
            }),
            (0, T.jsx)(`h2`, {
              children: `3. Información almacenada localmente`,
            }),
            (0, T.jsx)(`p`, {
              children: `La aplicación guarda en el dispositivo preferencias como idioma, accesibilidad, tutoriales vistos, rutas o paradas favoritas y cachés necesarios para consultar rutas y eventos con mayor rapidez o sin conexión. Esta información no se usa para identificar personalmente al usuario y permanece en el dispositivo hasta que se borren los datos de la aplicación o se desinstale.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `4. Servicios de terceros y conexión a internet`,
            }),
            (0, T.jsx)(`p`, {
              children: `Para mostrar mapas, imágenes y contenido actualizado, la aplicación realiza solicitudes a servicios externos. Esos proveedores pueden recibir datos técnicos habituales de una conexión, como dirección IP, fecha y hora, agente de usuario y el recurso solicitado. En el caso de los mapas, el recurso solicitado identifica la zona geográfica que se está visualizando, la cual podría coincidir con la ubicación del usuario.`,
            }),
            (0, T.jsx)(`p`, {
              children: `Los servicios utilizados actualmente incluyen:`,
            }),
            (0, T.jsxs)(`ul`, {
              children: [
                (0, T.jsxs)(`li`, {
                  children: [
                    (0, T.jsx)(`a`, {
                      href: `https://carto.com/privacy/`,
                      rel: `noopener noreferrer`,
                      children: `CARTO`,
                    }),
                    `, para mosaicos del mapa.`,
                  ],
                }),
                (0, T.jsxs)(`li`, {
                  children: [
                    (0, T.jsx)(`a`, {
                      href: `https://docs.github.com/es/site-policy/privacy-policies/github-general-privacy-statement`,
                      rel: `noopener noreferrer`,
                      children: `GitHub`,
                    }),
                    `, para archivos públicos de eventos y actualizaciones.`,
                  ],
                }),
                (0, T.jsxs)(`li`, {
                  children: [
                    (0, T.jsx)(`a`, {
                      href: `https://foundation.wikimedia.org/wiki/Policy:Privacy_policy`,
                      rel: `noopener noreferrer`,
                      children: `Wikimedia`,
                    }),
                    `, para algunas imágenes informativas.`,
                  ],
                }),
                (0, T.jsxs)(`li`, {
                  children: [
                    (0, T.jsx)(`a`, {
                      href: `https://ko-fi.com/home/privacy`,
                      rel: `noopener noreferrer`,
                      children: `Ko-fi`,
                    }),
                    `, únicamente cuando el usuario decide abrir voluntariamente el enlace externo de apoyo.`,
                  ],
                }),
              ],
            }),
            (0, T.jsx)(`p`, {
              children: `El tratamiento realizado directamente por esos servicios se rige por sus respectivas políticas de privacidad.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `5. Cookies y medición del sitio web`,
            }),
            (0, T.jsx)(`p`, {
              children: `El sitio web de Yuu Bus guarda localmente la elección de consentimiento y puede utilizar cookies o tecnologías similares de medición y publicidad únicamente cuando la persona acepta las opciones correspondientes. Estas herramientas se utilizan para conocer visitas y clics de conversión, evaluar el funcionamiento del sitio y mejorar campañas publicitarias.`,
            }),
            (0, T.jsxs)(`p`, {
              children: [
                `Cuando se acepta la medición opcional, se puede cargar una herramienta de Meta Platforms que recibe información técnica habitual, como dirección IP, navegador o dispositivo, página visitada, interacción registrada y parámetros de campaña presentes en la URL. El tratamiento realizado por Meta se rige por su`,
                ` `,
                (0, T.jsx)(`a`, {
                  href: `https://www.facebook.com/privacy/policy/`,
                  rel: `noopener noreferrer`,
                  children: `política de privacidad`,
                }),
                `. Si se rechaza, la herramienta no se carga y el sitio continúa funcionando.`,
              ],
            }),
            (0, T.jsx)(`h2`, {
              children: `6. Datos que no solicitamos`,
            }),
            (0, T.jsxs)(`ul`, {
              children: [
                (0, T.jsx)(`li`, {
                  children: `No se requiere crear una cuenta ni proporcionar contraseña.`,
                }),
                (0, T.jsx)(`li`, {
                  children: `No se solicitan nombre legal, correo, teléfono ni datos de pago.`,
                }),
                (0, T.jsx)(`li`, {
                  children: `La aplicación móvil no integra anuncios ni identificadores publicitarios.`,
                }),
                (0, T.jsx)(`li`, {
                  children: `No se venden datos personales.`,
                }),
                (0, T.jsx)(`li`, {
                  children: `La aplicación móvil no usa datos personales para publicidad o perfilado.`,
                }),
              ],
            }),
            (0, T.jsx)(`h2`, {
              children: `7. Conservación y eliminación`,
            }),
            (0, T.jsx)(`p`, {
              children: `MonteCode no mantiene una base de datos de cuentas o ubicaciones de los usuarios. Las preferencias y cachés locales pueden eliminarse desde los ajustes del dispositivo al borrar los datos de la aplicación, o al desinstalarla.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `8. Seguridad`,
            }),
            (0, T.jsx)(`p`, {
              children: `La aplicación limita los permisos a los necesarios para sus funciones y utiliza conexiones HTTPS para solicitar contenido remoto. Ningún método de transmisión o almacenamiento es infalible, pero se aplican medidas razonables para reducir el acceso o uso no autorizado.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `9. Menores de edad`,
            }),
            (0, T.jsx)(`p`, {
              children: `Yuu Bus es una herramienta general de movilidad y turismo. No está dirigida específicamente a menores de 13 años y no recopila intencionalmente información personal de niñas o niños.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `10. Cambios en este aviso`,
            }),
            (0, T.jsx)(`p`, {
              children: `Esta política puede actualizarse cuando cambien las funciones, los proveedores o los requisitos legales. La fecha de la versión vigente se mostrará al inicio de esta página.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `11. Contacto`,
            }),
            (0, T.jsxs)(`p`, {
              children: [
                `Para preguntas sobre privacidad o el funcionamiento de la aplicación:`,
                ` `,
                (0, T.jsx)(`a`, {
                  href: `mailto:rubengioreyes@outlook.com`,
                  children: `rubengioreyes@outlook.com`,
                }),
                `.`,
              ],
            }),
            (0, T.jsxs)(`aside`, {
              className: `legal-review`,
              role: `note`,
              children: [
                (0, T.jsx)(`strong`, {
                  children: `REQUIERE REVISIÓN LEGAL:`,
                }),
                ` confirmar la identidad legal completa del responsable, domicilio para ejercer derechos, fundamento y plazos de conservación aplicables al sitio web, y requisitos de transferencias internacionales derivados de las herramientas de terceros.`,
              ],
            }),
          ],
        }),
        (0, T.jsx)(Footer, {}),
      ],
    })
  );
}
function TermsPage() {
  return (
    usePageMetadata({
      title: `Términos y Condiciones | Yuu Bus: Rutas Oaxaca`,
      description: `Consulta los Términos y Condiciones de uso de Yuu Bus: Rutas Oaxaca.`,
      path: `/terminos`,
    }),
    (0, T.jsxs)(`div`, {
      className: `legal-page`,
      children: [
        (0, T.jsx)(PageHeader, {}),
        (0, T.jsx)(`header`, {
          className: `legal-hero`,
          children: (0, T.jsxs)(`div`, {
            children: [
              (0, T.jsx)(`p`, {
                className: `privacy-eyebrow`,
                children: `Yuu Bus · MonteCode`,
              }),
              (0, T.jsx)(`h1`, {
                id: `terms-title`,
                children: `Términos y Condiciones`,
              }),
              (0, T.jsx)(`p`, {
                children: `Condiciones generales para utilizar Yuu Bus: Rutas Oaxaca.`,
              }),
              (0, T.jsx)(`span`, {
                children: `Última actualización: 28 de agosto de 2026`,
              }),
            ],
          }),
        }),
        (0, T.jsxs)(`main`, {
          id: `contenido`,
          className: `legal-content`,
          "aria-labelledby": `terms-title`,
          children: [
            (0, T.jsxs)(`aside`, {
              className: `legal-review`,
              role: `note`,
              children: [
                (0, T.jsx)(`strong`, {
                  children: `REQUIERE DEFINICIÓN / REVISIÓN LEGAL:`,
                }),
                ` identidad legal completa del responsable, domicilio para notificaciones, legislación aplicable y jurisdicción competente.`,
              ],
            }),
            (0, T.jsx)(`h2`, {
              children: `1. Objeto del servicio`,
            }),
            (0, T.jsx)(`p`, {
              children: `Yuu Bus ofrece información de apoyo para consultar rutas, paradas, recorridos, opciones de viaje y contenido relacionado con la movilidad en Oaxaca. Es una aplicación comunitaria no oficial y no sustituye la información de las autoridades o de los operadores de transporte.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `2. Uso permitido`,
            }),
            (0, T.jsx)(`p`, {
              children: `El servicio debe utilizarse de forma lícita, personal y respetuosa. No está permitido interferir con su funcionamiento, intentar acceder sin autorización a sus sistemas ni utilizarlo para perjudicar a otras personas.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `3. Disponibilidad de la información`,
            }),
            (0, T.jsx)(`p`, {
              children: `Se procura mantener información útil y clara, pero no se garantiza que el servicio esté disponible sin interrupciones ni que todos los datos estén completos o actualizados en todo momento.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `4. Rutas, horarios y datos sujetos a cambios`,
            }),
            (0, T.jsx)(`p`, {
              children: `Las rutas, paradas, horarios, tarifas, tiempos y condiciones del transporte pueden cambiar sin aviso. Antes de viajar, cada persona debe considerar las condiciones actuales, indicaciones oficiales y su entorno.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `5. Contenido y servicios de terceros`,
            }),
            (0, T.jsx)(`p`, {
              children: `Yuu Bus puede mostrar mapas, enlaces, imágenes o información suministrada por terceros. Su disponibilidad y tratamiento se rigen también por las condiciones y políticas de esos proveedores.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `6. Cuentas, cuando corresponda`,
            }),
            (0, T.jsx)(`p`, {
              children: `Actualmente Yuu Bus no requiere una cuenta general para consultar rutas. Si en el futuro se habilitan cuentas, se informarán las condiciones aplicables antes de su uso.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `7. Contribuciones de usuarios`,
            }),
            (0, T.jsx)(`p`, {
              children: `Quien envíe reportes o datos debe procurar que sean veraces, pertinentes y que no vulneren derechos de terceros. Yuu Bus puede revisar, corregir o descartar contribuciones que no puedan verificarse.`,
            }),
            (0, T.jsxs)(`p`, {
              children: [
                (0, T.jsx)(`strong`, {
                  children: `REQUIERE DEFINICIÓN / REVISIÓN LEGAL:`,
                }),
                ` alcance de la autorización o licencia aplicable a contribuciones de usuarios.`,
              ],
            }),
            (0, T.jsx)(`h2`, {
              children: `8. Propiedad intelectual`,
            }),
            (0, T.jsx)(`p`, {
              children: `La marca, identidad visual, software y materiales propios de Yuu Bus o MonteCode están protegidos por la normativa aplicable. Los contenidos de terceros conservan la titularidad y condiciones que correspondan.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `9. Limitación razonable de responsabilidad`,
            }),
            (0, T.jsx)(`p`, {
              children: `Yuu Bus es una herramienta informativa de apoyo. Dentro de los límites permitidos por la ley, Yuu Bus y sus colaboradores no son responsables por decisiones de viaje tomadas exclusivamente con base en la aplicación, interrupciones del servicio o cambios de transporte ajenos a su control.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `10. Privacidad`,
            }),
            (0, T.jsxs)(`p`, {
              children: [
                `El tratamiento de datos y el uso de cookies o tecnologías similares se explican en el `,
                (0, T.jsx)(`a`, {
                  href: `/privacy/`,
                  children: `Aviso de Privacidad`,
                }),
                `.`,
              ],
            }),
            (0, T.jsx)(`h2`, {
              children: `11. Modificaciones`,
            }),
            (0, T.jsx)(`p`, {
              children: `Estos términos pueden actualizarse cuando cambien el servicio o los requisitos aplicables. La versión vigente mostrará su fecha de actualización.`,
            }),
            (0, T.jsx)(`h2`, {
              children: `12. Contacto`,
            }),
            (0, T.jsxs)(`p`, {
              children: [
                `Para consultas sobre estos términos: `,
                (0, T.jsx)(`a`, {
                  href: `mailto:${Ye}`,
                  children: Ye,
                }),
                `.`,
              ],
            }),
          ],
        }),
        (0, T.jsx)(Footer, {}),
      ],
    })
  );
}
var wt = (0, u.lazy)(() => e(() => import(`./RanchoBusinessPreview.js`), []));
function App() {
  let e = window.location.pathname.replace(/\/+$/, ``) || `/`,
    t = document.body.dataset.yuubusStaticPage;
  (0, u.useEffect)(() => {
    v();
    let e = ee(),
      t = installNavigation(),
      n = (e) => {
        (e.target instanceof Element ? e.target : null)?.closest(
          `[data-cookie-preferences]`,
        ) && b();
      };
    return (
      document.addEventListener(`click`, n),
      () => {
        (document.removeEventListener(`click`, n), e(), t());
      }
    );
  }, [t]);
  let n;
  return (
    (n =
      e === `/negocios/rancho-mijangos-preview` && wt
        ? (0, T.jsx)(u.Suspense, {
            fallback: (0, T.jsx)(`main`, {
              id: `contenido`,
              children: (0, T.jsx)(`p`, {
                children: `Abriendo el lugar…`,
              }),
            }),
            children: (0, T.jsx)(wt, {}),
          })
        : e === `/privacy`
          ? (0, T.jsx)(PrivacyPage, {})
          : e === `/terminos`
            ? (0, T.jsx)(TermsPage, {})
            : e === `/anunciate`
              ? (0, T.jsx)(AdvertisePage, {})
              : e === `/colabora`
                ? (0, T.jsx)(CollaboratePage, {})
                : (0, T.jsx)(LandingPage, {})),
    (0, T.jsxs)(T.Fragment, {
      children: [t ? null : n, (0, T.jsx)(AnalyticsConsent, {})],
    })
  );
}
(0, d.createRoot)(document.getElementById(`root`)).render(
  (0, T.jsx)(u.StrictMode, {
    children: (0, T.jsx)(App, {}),
  }),
);
export {
  BusinessOwnerCTA as a,
  trackSiteEvent as c,
  BusinessProfile as i,
  installNavigation as l,
  Footer as n,
  ranchoMijangos as o,
  businessDeepLink as r,
  ne as s,
  PageHeader as t,
  r as u,
};
