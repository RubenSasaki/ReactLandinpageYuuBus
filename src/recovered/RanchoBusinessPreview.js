// Recovered mechanically from deployment dpl_J2mpCMASbFiwcnUZZs6yATF73fDf.
// Behavior is preserved from emitted JavaScript. Original TypeScript types, local names and comments are unavailable.
import {
  a as e,
  i as t,
  l as n,
  n as r,
  o as i,
  s as a,
  t as o,
  u as s,
} from "./landing.js";
var c = s(),
  l = a();
function u() {
  return (
    (0, c.useEffect)(() => {
      let e = n();
      return (window.dispatchEvent(new Event(`yuubus:content-ready`)), e);
    }, []),
    (0, l.jsxs)(l.Fragment, {
      children: [
        (0, l.jsx)(o, {}),
        (0, l.jsxs)(`main`, {
          id: `contenido`,
          className: `business-demo-page`,
          children: [(0, l.jsx)(t, { business: i }), (0, l.jsx)(e, {})],
        }),
        (0, l.jsx)(r, {}),
      ],
    })
  );
}
export { u as default };
