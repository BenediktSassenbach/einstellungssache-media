// Gemeinsame Bausteine fuer die Hook-Pilotvideos (20.11.2026): Lupe, Vergleichskarten mit Fragezeichen, Gedankenblase.
// Genutzt von viz_c020h.js, viz_i022h.js, viz_b017h.js, viz_b023h.js und der Schicht-fuer-Schicht-Folge. Zum Loeschen: mit diesen Dateien.
var STH = '#0B1020';
// v2 (20.11.2026, Benedikt: Design bleibt dem Grundskript treu): bei Skripten mit ID auf 'H2' gibt es keine Hook-Overlays (Karten, Fragezeichen, Blitz)
const HV2 = () => typeof S !== 'undefined' && /H2$/.test(S.id);
// Schaltis Kopfmitte bei Fusspunkt fx, fy und Groesse 1
const headH = (fx, fy) => [fx + 58, fy - 127];
// Lupe: inner in Koordinaten -320..320, wird auf Radius r skaliert. hx, hy: Punkt, auf den die gestrichelte Linie zeigt
function lupeH(cx, cy, r, inner, k, hx, hy) { if (k <= .01) return ''; const e = back(cl(k)), id = 'luH' + Math.round(cx) + '_' + Math.round(cy) + '_' + r;
  return (hx !== undefined ? '<path d="M' + hx + ' ' + hy + ' L' + (cx + (hx - cx) * .62).toFixed(0) + ' ' + (cy + (hy - cy) * .62).toFixed(0) + '" stroke="#F4F6FB" stroke-width="6" stroke-dasharray="12 9" opacity="' + cl(k * 2).toFixed(2) + '"/>' : '')
    + '<g transform="translate(' + cx + ' ' + cy + ') scale(' + e.toFixed(3) + ')"><clipPath id="' + id + '"><circle r="' + r + '"/></clipPath><g clip-path="url(#' + id + ')"><g transform="scale(' + (r / 320).toFixed(3) + ')">' + inner + '</g></g><circle r="' + r + '" fill="none" stroke="#F4F6FB" stroke-width="14"/><circle r="' + (r + 7) + '" fill="none" stroke="' + STH + '" stroke-width="5"/></g>'; }
// Vergleichskarte: ic ist SVG um den Punkt (-115, 0), Text links ab -40
function cardH(x, y, txt, ic, col, k, hi, dim) { if (k <= 0 || HV2()) return ''; const z = back(cl(k)) * (1 + .08 * (hi || 0));
  let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(3) + ')" opacity="' + (1 - .6 * (dim || 0)).toFixed(2) + '"><rect x="-190" y="-80" width="380" height="160" rx="26" fill="#F4F6FB" stroke="' + (hi ? col : STH) + '" stroke-width="' + (hi ? 12 : 7) + '"/><g transform="translate(-115 0)">' + ic + '</g>' + svgT(-40, 14, txt, 40, STH, 'start');
  if (hi) s += '<circle cx="170" cy="-70" r="34" fill="#3DFF7A" stroke="' + STH + '" stroke-width="6"/><path d="M154 -70 l12 12 l20 -24" fill="none" stroke="' + STH + '" stroke-width="8" stroke-linecap="round"/>';
  return s + '</g>'; }
const vsH = (k, t) => k <= 0 || HV2() ? '' : '<g transform="translate(540 735) scale(' + (back(cl(k)) * (1 + .1 * Math.sin(t * 6))).toFixed(3) + ')"><circle r="54" fill="#FFE14D" stroke="' + STH + '" stroke-width="7"/>' + svgT(0, 22, '?', 64, STH) + '</g>';
// Zwei Karten mit Fragezeichen (Open Loop) oder mit Aufloesung (win: 0 links, 1 rechts, k Fortschritt)
function loopH(k, t, a, b, win, wk) { if (k <= 0 || HV2()) return ''; const hiA = win === 0 ? wk : 0, hiB = win === 1 ? wk : 0;
  return cardH(280, 735, a[0], a[1], a[2], cl(k / .5), hiA, hiB) + cardH(800, 735, b[0], b[1], b[2], cl((k - .25) / .5), hiB, hiA) + vsH(win === undefined ? cl((k - .6) / .4) : 1 - cl((wk || 0) / .5), t); }
// Gedankenblase aus Schaltis Kopf
function thinkH(hx, hy, bx, by, inner, k) { if (k <= .01) return ''; const e = back(cl(k)); let s = '<g opacity="' + cl(k * 2).toFixed(2) + '">';
  [[.25, 14], [.5, 22]].forEach(([f, r]) => { s += '<circle cx="' + lerp(hx, bx, f).toFixed(0) + '" cy="' + lerp(hy, by + 130, f).toFixed(0) + '" r="' + r + '" fill="#F4F6FB" stroke="' + STH + '" stroke-width="5"/>'; });
  return s + '<g transform="translate(' + bx + ' ' + by + ') scale(' + e.toFixed(3) + ')"><ellipse rx="210" ry="125" fill="#F4F6FB" stroke="' + STH + '" stroke-width="7"/>' + inner + '</g></g>'; }
// "?!" fuer den Rehook "Und jetzt kommt der Haken" (rechts unten, frei von Untertitel und Schalti)
function hakenH(e, t) { if (e === undefined || HV2()) return ''; const k = 1 - cl((e - 1.2) / .6); return '<rect width="1080" height="1920" fill="#fff" opacity="' + (.35 * (1 - cl(e / .2))).toFixed(2) + '"/><g transform="translate(880 1440) scale(' + back(cl(e / .3)).toFixed(3) + ')" opacity="' + k.toFixed(2) + '">' + svgT(0, 0, '?!', 110, '#FFE14D') + '</g>'; }
