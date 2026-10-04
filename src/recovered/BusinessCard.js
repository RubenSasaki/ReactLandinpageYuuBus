// Recovered mechanically from deployment dpl_J2mpCMASbFiwcnUZZs6yATF73fDf.
// Behavior is preserved from emitted JavaScript. Original TypeScript types, local names and comments are unavailable.
import { c as e, r as t, s as n, u as r } from "./landing.js";
var i = r(),
  a = n(),
  o = [
    `Domingo`,
    `Lunes`,
    `Martes`,
    `Miércoles`,
    `Jueves`,
    `Viernes`,
    `Sábado`,
  ];
function s({ src: e, name: t }) {
  let [n, r] = (0, i.useState)(!1);
  return e && !n
    ? (0, a.jsx)(`img`, {
        className: `business-photo`,
        src: e,
        alt: t,
        width: `600`,
        height: `400`,
        loading: `lazy`,
        referrerPolicy: `no-referrer`,
        onError: () => r(!0),
      })
    : (0, a.jsxs)(`div`, {
        className: `business-photo-empty`,
        children: [
          (0, a.jsx)(`span`, {
            className: `material-symbols-rounded`,
            "aria-hidden": `true`,
            children: `storefront`,
          }),
          (0, a.jsx)(`span`, { children: `Fotografía pendiente` }),
        ],
      });
}
function c({ business: n }) {
  let r = t(n);
  return (0, a.jsxs)(`div`, {
    className: `business-detail`,
    children: [
      n.description &&
        (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(`h4`, { children: `Sobre el negocio` }),
            (0, a.jsx)(`p`, { children: n.description }),
          ],
        }),
      n.images.length > 1 &&
        (0, a.jsx)(`div`, {
          className: `business-gallery`,
          children: n.images
            .slice(1)
            .map((e) => (0, a.jsx)(s, { src: e, name: n.name }, e)),
        }),
      n.address &&
        (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(`h4`, { children: `Ubicación` }),
            (0, a.jsx)(`p`, { children: n.address }),
          ],
        }),
      n.hours.length > 0 &&
        (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(`h4`, { children: `Horario publicado` }),
            (0, a.jsx)(`dl`, {
              children: n.hours.map((e) =>
                (0, a.jsxs)(
                  `div`,
                  {
                    children: [
                      (0, a.jsx)(`dt`, { children: o[e.day] }),
                      (0, a.jsx)(`dd`, {
                        children: e.closed
                          ? `Cerrado`
                          : `${e.open} – ${e.close}`,
                      }),
                    ],
                  },
                  e.day,
                ),
              ),
            }),
          ],
        }),
      Object.values(n.contact).some(Boolean) &&
        (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(`h4`, { children: `Contacto del negocio` }),
            (0, a.jsxs)(`div`, {
              className: `business-contact`,
              children: [
                n.contact.whatsapp &&
                  (0, a.jsx)(`a`, {
                    href: `https://wa.me/${n.contact.whatsapp}?text=Hola%2C%20vi%20su%20negocio%20en%20YuuBus%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n.`,
                    target: `_blank`,
                    rel: `noopener noreferrer`,
                    onClick: () =>
                      e(`business_whatsapp`, { placement: `business_detail` }),
                    children: `WhatsApp del negocio ↗`,
                  }),
                n.contact.phone &&
                  (0, a.jsx)(`a`, {
                    href: `tel:+${n.contact.phone}`,
                    onClick: () =>
                      e(`business_contact`, { placement: `business_detail` }),
                    children: `Llamar al negocio`,
                  }),
                [`website`, `facebook`, `instagram`].map(
                  (t) =>
                    n.contact[t] &&
                    (0, a.jsxs)(
                      `a`,
                      {
                        href: n.contact[t],
                        target: `_blank`,
                        rel: `noopener noreferrer`,
                        onClick: () =>
                          e(`business_contact`, {
                            placement: `business_detail`,
                          }),
                        children: [
                          t === `website`
                            ? `Sitio web`
                            : t === `facebook`
                              ? `Facebook`
                              : `Instagram`,
                          ` ↗`,
                        ],
                      },
                      t,
                    ),
                ),
              ],
            }),
          ],
        }),
      (0, a.jsx)(`h4`, { children: `Cómo llegar` }),
      r && n.coordinates
        ? (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsx)(`a`, {
                className: `biz-action`,
                href: r,
                onClick: () =>
                  e(`business_how_to_get`, { placement: `business_detail` }),
                children: `Ver cómo llegar en YuuBus ↗`,
              }),
              (0, a.jsx)(`p`, {
                className: `business-directions-note`,
                children: `En la app, toca Cómo llegar y elige tu origen. La web no calcula el viaje.`,
              }),
            ],
          })
        : (0, a.jsx)(`p`, {
            children: `La ubicación exacta está pendiente de confirmar. Cómo llegar estará disponible cuando haya coordenadas verificadas.`,
          }),
      r && (0, a.jsx)(`a`, { href: r, children: `Ver negocio en YuuBus ↗` }),
    ],
  });
}
function l({ business: n }) {
  let r = t(n);
  return (0, a.jsxs)(`article`, {
    className: `business-card`,
    children: [
      (0, a.jsx)(s, { src: n.images[0], name: n.name }),
      (0, a.jsxs)(`div`, {
        className: `business-card-copy`,
        children: [
          n.qa &&
            (0, a.jsx)(`span`, {
              className: `qa-label`,
              children: `QA / demo · no publicado`,
            }),
          (0, a.jsx)(`p`, {
            className: `business-category`,
            children: n.category,
          }),
          (0, a.jsx)(`h3`, { children: n.name }),
          (0, a.jsx)(`p`, {
            className: `business-location`,
            children: n.locality,
          }),
          n.description &&
            (0, a.jsx)(`p`, {
              children:
                n.description.length > 140
                  ? n.description.slice(0, 137) + `…`
                  : n.description,
            }),
          (0, a.jsxs)(`details`, {
            onToggle: (t) => {
              t.currentTarget.open &&
                !n.qa &&
                e(`business_view`, { placement: `business_card` });
            },
            children: [
              (0, a.jsx)(`summary`, { children: `Ver negocio` }),
              (0, a.jsx)(c, { business: n }),
            ],
          }),
          r &&
            n.coordinates &&
            (0, a.jsx)(`a`, {
              className: `biz-action`,
              href: r,
              onClick: () =>
                e(`business_how_to_get`, { placement: `business_card` }),
              children: `Cómo llegar en YuuBus ↗`,
            }),
        ],
      }),
    ],
  });
}
export { l as BusinessCard };
