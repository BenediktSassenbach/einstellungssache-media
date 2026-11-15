// VERSION 3.0 (C005V3), erzeugt aus Version 2.0 (C005T) "Wie wird ein Taschenwaermer auf Knopfdruck warm?" im Vollbild-Design (Skript 2.0). Gleicher Text wie C005.
// Ort: Winternacht mit Polarlicht, Bergen, Huette und Schneefall. Teil 2 spielt im Inneren des Kissens. Zum Loeschen: diese Datei und videos/C005T.

// Kopien aus Version 1, damit Version 1 geloescht werden kann, ohne dass diese Datei bricht
function pad5b_3(cx, cy, w, h, k, t, glow) { const id = 'pc' + Math.round(cx) + '_' + Math.round(cy), px = cx - w * .24, R = w * 1.3 * cl(k), x = cx - w / 2, y = cy - h / 2;
  let s = glow > 0 ? '<rect x="' + (x - 26) + '" y="' + (y - 26) + '" width="' + (w + 52) + '" height="' + (h + 52) + '" rx="' + (h * .34 + 20) + '" fill="#FF7A3D" opacity="' + (.35 * glow * (.8 + .2 * Math.sin(t * 6))) + '"/>' : '';
  s += '<clipPath id="' + id + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h * .3) + '"/></clipPath><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h * .3) + '" fill="#5CC8FF" opacity=".5"/>';
  if (k <= 0) s += '<path d="M' + (x + w * .5) + ' ' + (y + h * .3) + ' q' + (w * .12) + ' ' + (6 * Math.sin(t * 3)) + ' ' + (w * .24) + ' 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/>';
  else { s += '<g clip-path="url(#' + id + ')"><circle cx="' + px + '" cy="' + cy + '" r="' + R + '" fill="#F4F6FB"/>'; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8 + .2, r2 = R * (.7 + .3 * rnd(i + 3)); s += '<path d="M' + px + ' ' + cy + ' L' + (px + r2 * Math.cos(a)) + ' ' + (cy + r2 * Math.sin(a)) + '" stroke="#A9CFEA" stroke-width="5" stroke-linecap="round"/>'; } s += '</g>'; }
  s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h * .3) + '" fill="none" stroke="#fff" stroke-width="9"/><circle cx="' + px + '" cy="' + cy + '" r="' + (w * .075) + '" fill="#C9CFDD" stroke="#0B1020" stroke-width="5"/><path d="M' + (px - w * .035) + ' ' + cy + ' q' + (w * .035) + ' ' + (-w * .03) + ' ' + (w * .07) + ' 0" stroke="#0B1020" stroke-width="4" fill="none"/>';
  return s; }
function spike5b_3(x, yb, hgt, w, op) { return hgt <= 0 ? '' : '<path d="M' + (x - w) + ' ' + yb + ' L' + (x - w * .2) + ' ' + (yb - hgt) + ' L' + (x + w * .3) + ' ' + (yb - hgt * .45) + ' L' + (x + w * .6) + ' ' + (yb - hgt * .8) + ' L' + (x + w) + ' ' + yb + ' Z" fill="#F4F6FB" stroke="#8ED6F5" stroke-width="5" stroke-linejoin="round" opacity="' + (op === undefined ? 1 : op) + '"/>'; }
function thermo5b_3(x, y, hgt, v, lo, hi) { const f = cl((v - lo) / (hi - lo)), col = v >= 45 ? '#FF5A3D' : v < 5 ? '#7FD3FF' : '#FFD23F';
  return '<rect x="' + (x - 20) + '" y="' + y + '" width="40" height="' + hgt + '" rx="20" fill="#0B1020" stroke="#fff" stroke-width="7"/><circle cx="' + x + '" cy="' + (y + hgt + 14) + '" r="38" fill="' + col + '" stroke="#fff" stroke-width="7"/><rect x="' + (x - 9) + '" y="' + (y + 12 + (hgt - 12) * (1 - f)) + '" width="18" height="' + ((hgt - 12) * f + 10) + '" rx="9" fill="' + col + '"/>' + svgT(x + 50, y + 12 + (hgt - 12) * (1 - f) + 18, v + ' °C', 54, col, 'start'); }
function flake5b_3(x, y, s, rot) { let d = ''; for (let i = 0; i < 3; i++) d += '<path d="M0 -20 V20" transform="rotate(' + (i * 60) + ')" stroke="#DFF4FF" stroke-width="5" stroke-linecap="round"/>'; return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')">' + d + '</g>'; }

const D5_3 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3.2;
// Gag Teil 2: Die Kristalle wachsen Schalti am Boden hinterher, frieren ihn kurz ein
function c5chase_3(q, D, t) { const u = cl(q / Math.max(2.8, D - .1)), HX = 220, HY = 1537, X1 = 780;
  if (u < .12) { const k = u / .12; return { front: 40 + 40 * k, fo: 1, ice: 0, m: { f: [HX, HY], s: 1, r: -8 * k } }; }
  if (u < .5) { const c = (u - .12) / .38, x = lerp(HX, X1, c); return { front: x - 250 + 150 * c, fo: 1, ice: 0, m: { f: [x, HY - 16 * Math.abs(Math.sin(t * 16))], s: 1, r: -8 + 5 * Math.sin(t * 16) } }; }
  if (u < .72) { const c = (u - .5) / .22; return { front: lerp(680, 940, cl(c * 2)), fo: 1, ice: cl(c * 6), m: { f: [X1, HY], s: 1, r: 0, fx: 'saturate(.2) brightness(1.55)' } }; }
  if (u < .8) { const c = (u - .72) / .08; return { front: 940, fo: 1 - c, ice: 0, burst: c, m: { f: [X1, HY - 30 * Math.sin(Math.PI * c)], s: 1, r: 10 * Math.sin(t * 30) } }; }
  const c = (u - .8) / .2; return { front: 940, fo: 0, ice: 0, m: { f: [lerp(X1, HX, ease(c)), HY - 12 * Math.abs(Math.sin(t * 14)) * (1 - c)], s: 1, r: 5 * Math.sin(t * 22) * (1 - c), flip: c < .9 } };
}

// ---------- Helfer ----------
function wsky5_3(t, o) { o = o || {}; const hz = 1100;
  let s = '<defs><linearGradient id="w5s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040818"/><stop offset=".55" stop-color="#101A52"/><stop offset="1" stop-color="#3B2A7A"/></linearGradient><linearGradient id="w5g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A509A"/><stop offset=".45" stop-color="#18245A"/><stop offset="1" stop-color="#080D2A"/></linearGradient></defs><rect width="1080" height="' + (hz + 4) + '" fill="url(#w5s)"/>';
  for (let i = 0; i < 60; i++) { const y = rnd(i + 100) * (hz - 60); s += '<circle cx="' + (rnd(i + 1) * 1080).toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (1 + 2.4 * rnd(i + 200) * rnd(i + 200)).toFixed(1) + '" fill="#fff" opacity="' + ((.3 + .5 * Math.abs(Math.sin(t * (1 + rnd(i + 300)) + i))) * (1 - .6 * y / hz)).toFixed(2) + '"/>'; }
  ['#5CFFB0', '#FF6BD6', '#7FD3FF'].forEach((col, j) => { let d = ''; for (let x = -60; x <= 1140; x += 80) d += (x === -60 ? 'M' : 'L') + x + ' ' + (660 + j * 64 + 54 * Math.sin(x * .006 + t * .5 + j * 2) + 26 * Math.sin(x * .013 - t * .3 + j)).toFixed(0); s += '<path d="' + d + '" stroke="' + col + '" stroke-width="84" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".2"/><path d="' + d + '" stroke="' + col + '" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>'; });
  s += '<path d="M-20 1104 L150 905 L300 1030 L420 950 L560 1050 L720 885 L880 1020 L990 945 L1100 1040 V1104 Z" fill="#141C50"/><path d="M150 905 l-42 50 l30 -10 l14 22 l20 -24 l24 12 Z M720 885 l-46 48 l34 -8 l12 24 l22 -26 l26 12 Z M420 950 l-28 30 l22 -6 l10 14 l14 -16 l12 6 Z M990 945 l-26 28 l20 -5 l8 12 l12 -14 l12 6 Z" fill="#DCE8FF"/>';
  for (let i = 0; i < 12; i++) { const x = 20 + i * 92 + 34 * rnd(i + 30), hh = 74 + 56 * rnd(i + 40), y = hz + 4; s += '<path d="M' + x + ' ' + (y - hh) + ' l' + (hh * .3) + ' ' + (hh * .45) + ' h' + (-hh * .14) + ' l' + (hh * .24) + ' ' + (hh * .55) + ' H' + (x - hh * .4) + ' l' + (hh * .24) + ' ' + (-hh * .55) + ' h' + (-hh * .14) + ' Z" fill="#070D30"/><path d="M' + x + ' ' + (y - hh) + ' l' + (hh * .16) + ' ' + (hh * .24) + ' l' + (-hh * .16) + ' ' + (-hh * .06) + ' l' + (-hh * .16) + ' ' + (hh * .06) + ' Z" fill="#DCE8FF" opacity=".8"/>'; }
  if (!o.nocabin) { s += '<circle cx="950" cy="1062" r="70" fill="#FFD27A" opacity="' + (.14 + .04 * Math.sin(t * 5)) + '"/><rect x="880" y="1020" width="170" height="86" fill="#1B1236" stroke="#0B1020" stroke-width="4"/><path d="M864 1024 L965 950 L1066 1024 Z" fill="#DCE8FF" stroke="#0B1020" stroke-width="4"/><rect x="928" y="1042" width="44" height="40" fill="#FFD27A" opacity="' + (.8 + .2 * Math.sin(t * 5)) + '"/><path d="M950 1042 v40 M928 1062 h44" stroke="#1B1236" stroke-width="4"/><rect x="1000" y="952" width="22" height="46" fill="#1B1236"/>'; for (let i = 0; i < 3; i++) { const c = (t * .25 + i / 3) % 1; s += '<circle cx="' + (1011 - 30 * c + 8 * Math.sin(t + i)) + '" cy="' + (944 - 120 * c) + '" r="' + (10 + 18 * c) + '" fill="#C9D4FF" opacity="' + (.3 * (1 - c)) + '"/>'; } }
  s += '<rect y="' + hz + '" width="1080" height="820" fill="url(#w5g)"/><ellipse cx="460" cy="1236" rx="360" ry="54" fill="#8FB0FF" opacity=".16"/><path d="M0 1420 Q300 1370 640 1432 T1080 1400 V1920 H0 Z" fill="#131C4C" stroke="#33488C" stroke-width="3"/>';
  s += '<path d="M0 1556 Q250 1510 560 1612 T1080 1700 V1920 H0 Z" fill="#3E56A0" stroke="#DCE8FF" stroke-width="6"/><path d="M0 1640 Q250 1600 560 1690 T1080 1770 V1920 H0 Z" fill="#141D52"/>';
  return s; }
function wsnow5_3(t, k) { let s = ''; const n = Math.round(46 * (k || 1)); for (let i = 0; i < n; i++) { const x = (((rnd(i + 700) * 1180 + 46 * Math.sin(t * .8 + i) - t * 20 * (k > 1 ? k : 0)) % 1080) + 1080) % 1080, y = (t * (70 + 100 * rnd(i + 720)) * (k > 1 ? 1.5 : 1) + rnd(i + 740) * 1920) % 1920; s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (2 + 4 * rnd(i + 760)).toFixed(1) + '" fill="#fff" opacity="' + (.35 + .4 * rnd(i + 780)).toFixed(2) + '"/>'; } return s; }
// Blick ins Innere des Kissens: klare Fuellung im Vollformat, unten der Rand der Folie als Boden
function inside5_3(t) { let s = '<defs><radialGradient id="in5" cx=".5" cy=".46" r=".8"><stop offset="0" stop-color="#2B62C0"/><stop offset="1" stop-color="#0A1530"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#in5)"/>';
  for (let i = 0; i < 14; i++) { const y = 1900 - ((t * 70 * (.5 + rnd(i + 9)) + rnd(i + 20) * 1900) % 1900); s += '<circle cx="' + (40 + rnd(i + 1) * 1000 + 14 * Math.sin(t * 2 + i)) + '" cy="' + y + '" r="' + (8 + 18 * rnd(i + 30)) + '" fill="none" stroke="#fff" stroke-width="4" opacity=".22"/>'; }
  return s + '<path d="M-20 1556 Q540 1520 1100 1556 V1920 H-20 Z" fill="#12265E" stroke="#9BD0FF" stroke-width="7" opacity=".95"/><path d="M40 1600 Q540 1566 1040 1600" stroke="#fff" stroke-width="5" fill="none" opacity=".25"/>'; }

// ---------- Einstieg: Kissen schwebt ueber dem Schnee. Klick, die Kristalle schiessen heraus und jagen Schalti am Boden entlang aus dem Bild ----------
WORLD.h7c5t_3 = function (sc, ev, t, lt) {
  const e = ev.klick, sh = shake7(e, t), CX = 600, CY = 890, kr = e === undefined ? 0 : ease(cl(e / .45));
  let s = wsky5_3(t), fl = '';
  s += '<circle cx="' + CX + '" cy="' + CY + '" r="330" fill="' + (e === undefined ? '#FF6BD6' : '#FF8A4D') + '" opacity="' + (.12 + .04 * Math.sin(t * 3)) + '"/><g transform="translate(' + CX + ' ' + (CY + 8 * Math.sin(t * 2.2)) + ') scale(' + back(cl((lt - .1) / .5)) + ') translate(' + (-CX) + ' ' + (-CY) + ')">' + pad5b_3(CX, CY, 460, 300, kr, t, kr) + '</g>';
  if (e === undefined) { const k = cl(lt / 8), pr = k > .35 ? 7 * Math.abs(Math.sin(t * (6 + 10 * k))) : 0, fx = CX - 110, fy = CY - 44 + pr; s += '<path d="M' + (CX + 250) + ' ' + (CY - 250) + ' Q' + (CX + 40) + ' ' + (CY - 230) + ' ' + fx + ' ' + fy + '" stroke="#FF6BD6" stroke-width="24" fill="none" stroke-linecap="round"/><circle cx="' + fx + '" cy="' + fy + '" r="22" fill="#FFD23F" stroke="#0B1020" stroke-width="4"/>'; }
  else { const op = 1 - cl((e - 1.7) / .35), b = cl((e - .1) / .35), front = lerp(60, 1180, cl((e - .45) / 1.05));
    for (let i = 0; i < 9; i++) { const c = i / 8; if (c <= b) { const u = c, x = (1 - u) * (1 - u) * 400 + 2 * u * (1 - u) * 90 + u * u * 70, y = (1 - u) * (1 - u) * 960 + 2 * u * (1 - u) * 1150 + u * u * 1560; fl += '<path transform="translate(' + x + ' ' + y + ') rotate(' + (i * 37) + ')" d="M0 -30 L16 0 L0 30 L-16 0 Z" fill="#F4F6FB" stroke="#8ED6F5" stroke-width="5" opacity="' + op + '"/>'; } }
    if (e > .45) for (let x = 40; x < front; x += 62) fl += spike5b_3(x, 1600 + 50 * Math.pow(Math.max(0, x - 250) / 800, 1.4), (70 + 80 * rnd(x)) * cl((front - x) / 90), 40, op);
    if (e < .16) fl += '<rect width="1080" height="1920" fill="#fff" opacity="' + (.6 * (1 - e / .16)) + '"/>'; }
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + fl + wsnow5_3(t, 1) + '</g>' + shade3());
};
WMASC.h7c5t_3 = (ev, t) => ev.klick === undefined ? { f: HOME3, s: 1, r: 2 * Math.sin(t * 3), nospin: 1 } : flee3(ev.klick, t, .35, 1.25, 2.05, 2.9);

// ---------- Teil 1 bis 3: Inhalt wie C005, im Vollbild ----------
WORLD.c5tfluessig_3 = function (sc, ev, t, lt) {
  let s = wsky5_3(t, { cold: ev.act === undefined ? 0 : cl(ev.act / .8) }), h = '';
  const g = ev.grad, b = ev.bleibt, a = ev.act;
  s += '<g transform="translate(0 ' + (6 * Math.sin(t * 2)) + ')">' + pad5b_3(350, 900, 430, 280, 0, t, 0) + '</g>' + chip3(350, 1096, 'Salz + Wasser', 36, '#F4F6FB', '#0B1020', (lt - 1.2) / .3);
  if (g !== undefined) { const v = a !== undefined ? Math.round(lerp(20, -20, ease(cl(a / 1.3)))) : b !== undefined ? Math.round(lerp(58, 20, ease(cl(b / 1.3)))) : 58, y58 = 740 + 12 + 288 * (1 - 88 / 100);
    s += '<g opacity="' + cl(g / .3) + '">' + thermo5b_3(700, 740, 300, v, -30, 70) + '<path d="M650 ' + y58 + ' H676" stroke="#FF5A3D" stroke-width="7" stroke-linecap="round"/>' + svgT(640, y58 + 12, '58', 34, '#FF9A7A', 'end') + '</g>'; }
  if (b !== undefined && a === undefined) s += okx1(540, 770, 40, true, (b - 1.2) / .3);
  if (a !== undefined) for (let i = 0; i < 7; i++) { const c = (t * .22 + rnd(i + 4)) % 1; s += '<g opacity="' + cl(a / .4) + '">' + flake5b_3(110 + 70 * i + 20 * Math.sin(t + i), 700 + 420 * c, .8 + .5 * rnd(i), t * 40 + i * 30) + '</g>'; }
  h += slot(ev, [['salz', 'Ein Salz der Essigsäure, in Wasser'], ['grad', 'Schmelzpunkt: 58 Grad'], ['bleibt', 'Bleibt trotzdem flüssig', 'hot'], ['act', 'Sogar bis minus 20 Grad', 'hot']]);
  return W(s + wsnow5_3(t, a === undefined ? 1 : 1 + 2 * cl(a / .8)) + (a === undefined ? '' : '<rect width="1080" height="1920" fill="#9FD8FF" opacity="' + (.12 * cl(a / .8)) + '"/>') + shade3(), h);
};
// Bei minus 20 Grad friert Schalti sichtbar: blass und zitternd
WMASC.c5tfluessig_3 = (ev, t) => { const a = ev.act; if (a === undefined) return BIG3(); const k = cl(a / .6); return { f: [220 + 5 * Math.sin(t * 40) * k, 1537], s: 1, r: 3 * Math.sin(t * 34) * k, fx: 'saturate(' + (1 - .6 * k) + ') brightness(' + (1 + .35 * k) + ')', nospin: 1 }; };

WORLD.c5tklick_3 = function (sc, ev, t, lt) {
  let s = inside5_3(t), h = '';
  const kn = ev.knick, wa = ev.wachs, a = ev.act, PX = 150, PY = 902;
  const front = wa !== undefined ? lerp(230, 1000, ease(cl(wa / 1.8))) : kn !== undefined ? 150 + 100 * ease(cl((kn - .5) / .6)) : 0;
  const P = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { const i = r * 7 + c, gx = 250 + c * 95, gy = 762 + r * 94, o = cl((front - gx + 40) / 70); P.push([lerp(gx + (rnd(i + 9) - .5) * 60 + 16 * Math.sin(t * (2.2 + rnd(i)) + i * 2), gx, o), lerp(gy + (rnd(i + 27) - .5) * 44 + 16 * Math.cos(t * (2 + rnd(i + 5)) + i), gy, o), o, c]); }
  P.forEach((p, i) => { if (p[2] > .9 && p[3] < 6 && P[i + 1][2] > .9) s += '<path d="M' + p[0] + ' ' + p[1] + ' L' + P[i + 1][0] + ' ' + P[i + 1][1] + '" stroke="#F4F6FB" stroke-width="6"/>'; if (p[2] > .9 && i + 7 < 28 && P[i + 7][2] > .9) s += '<path d="M' + p[0] + ' ' + p[1] + ' L' + P[i + 7][0] + ' ' + P[i + 7][1] + '" stroke="#F4F6FB" stroke-width="6"/>'; });
  P.forEach(p => { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="21" fill="' + lc('#5CC8FF', '#F4F6FB', p[2]) + '" stroke="#0B1020" stroke-width="4"/>'; });
  const fl = kn !== undefined && kn < .5 ? Math.sin(Math.PI * kn / .5) : 0;
  s += '<g transform="translate(' + PX + ' ' + PY + ') scale(' + (1 + .25 * fl) + ')"><circle r="46" fill="#C9CFDD" stroke="#0B1020" stroke-width="6"/><path d="M-24 0 q24 ' + (-22 + 44 * fl) + ' 48 0" stroke="#0B1020" stroke-width="6" fill="none" stroke-linecap="round"/></g>';
  if (fl > 0) for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; s += '<path d="M' + (PX + 60 * Math.cos(an)) + ' ' + (PY + 60 * Math.sin(an)) + ' l' + (22 * fl * Math.cos(an)) + ' ' + (22 * fl * Math.sin(an)) + '" stroke="#FFD23F" stroke-width="7" stroke-linecap="round"/>'; }
  if (kn !== undefined && wa === undefined) s += chip3(330, 1052, 'Keim', 36, '#FFD23F', '#0B1020', (kn - .8) / .3);
  if (a !== undefined) s += '<g transform="translate(' + PX + ' ' + (PY - 110 - 8 * Math.abs(Math.sin(t * 5))) + ') scale(' + back(cl(a / .35)) + ')"><circle r="46" fill="#FFD23F" stroke="#0B1020" stroke-width="6"/>' + svgT(0, 22, '?', 64, '#0B1020') + '</g>';
  if (wa !== undefined && a === undefined) { const g = c5chase_3(wa, D5_3(sc, 2), t); for (let x = 40; x < g.front; x += 64) s += spike5b_3(x, 1592, 56 + 60 * rnd(x), 36, g.fo);
    if (g.ice > 0) s += '<rect x="636" y="1322" width="296" height="258" rx="34" fill="#BFEAFF" opacity="' + (.5 * g.ice) + '" stroke="#fff" stroke-width="7"/>';
    if (g.burst !== undefined) for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4; s += '<path d="M' + (784 + (120 + 160 * g.burst) * Math.cos(an)) + ' ' + (1450 + (90 + 120 * g.burst) * Math.sin(an)) + ' l14 -22 l12 24 Z" fill="#DFF4FF" opacity="' + (1 - g.burst) + '"/>'; } }
  h += slot(ev, [['start', 'Den Teilchen fehlt ein Startpunkt'], ['knick', 'Plättchen knicken: ein Keim entsteht', 'hot'], ['wachs', 'Der Kristall wächst durchs Kissen'], ['act', 'Auslöser: nicht ganz geklärt', 'hot']]);
  return W(s + shade3(), h);
};
WMASC.c5tklick_3 = () => BIG3();

WORLD.c5twaerme_3 = function (sc, ev, t, lt) {
  let s = wsky5_3(t, { nocabin: ev.koch !== undefined || ev.act !== undefined }), h = '';
  const hs = ev.heiss, ko = ev.koch, a = ev.act;
  if (ko === undefined && a === undefined) { const kr = ease(cl((lt - .5) / 1.4));
    s += pad5b_3(350, 900, 430, 280, kr, t, kr);
    for (let i = 0; i < 5; i++) { const c = (t * .5 + i / 5) % 1, x = 190 + i * 80; s += '<path d="M' + x + ' ' + (740 - 70 * c) + ' q16 -16 0 -32 q-16 -16 0 -32" stroke="#FF7A3D" stroke-width="9" fill="none" stroke-linecap="round" opacity="' + (kr * (1 - c)) + '"/>'; }
    if (hs !== undefined) s += '<g opacity="' + cl(hs / .3) + '">' + thermo5b_3(700, 740, 300, Math.round(lerp(20, 54, ease(cl(hs / 1.4)))), -30, 70) + '</g>';
  } else { const kr = a !== undefined ? 0 : 1 - ease(cl((ko - .8) / 1.8)), boil = a === undefined;
    for (let i = 0; i < 7; i++) s += '<path d="M' + (250 + 80 * i) + ' 1132 q-22 -30 0 -' + (44 + 14 * Math.sin(t * 9 + i)) + ' q22 30 0 ' + (44 + 14 * Math.sin(t * 9 + i)) + ' Z" fill="#FF9A3D" opacity="' + (boil ? .9 : .25) + '"/>';
    s += '<rect x="170" y="800" width="640" height="300" rx="36" fill="#2A3350" stroke="#C9CFDD" stroke-width="9"/><rect x="186" y="836" width="608" height="248" rx="24" fill="#3BA8FF" opacity=".75"/><path d="M110 850 H170 M810 850 H870" stroke="#C9CFDD" stroke-width="22" stroke-linecap="round"/>';
    s += '<g transform="translate(0 ' + (boil ? 5 * Math.sin(t * 8) : 0) + ')">' + pad5b_3(490, 968, 330, 190, kr, t, 0) + '</g>';
    if (boil) { for (let i = 0; i < 9; i++) { const c = (t * .9 + rnd(i + 2)) % 1; s += '<circle cx="' + (220 + 66 * i + 8 * Math.sin(t * 5 + i)) + '" cy="' + (1070 - 220 * c) + '" r="' + (7 + 9 * c) + '" fill="none" stroke="#DFF4FF" stroke-width="4" opacity="' + (1 - c) + '"/>'; }
      for (let i = 0; i < 3; i++) { const c = (t * .4 + i / 3) % 1; s += '<path d="M' + (330 + i * 160) + ' ' + (790 - 70 * c) + ' q18 -18 0 -36" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + (.7 * (1 - c)) + '"/>'; }
      s += chip3(690, 752, 'Vorsicht, heiß', 30, '#FF5A3D', '#fff', (ko - .6) / .3); }
    else s += okx1(820, 780, 54, true, a / .35); }
  h += slot(ev, [['frei', 'Beim Festwerden wird Wärme frei'], ['heiss', 'Über 50 Grad warm', 'hot'], ['koch', 'Trick: ab ins kochende Wasser'], ['act', 'Wieder flüssig und startklar', 'hot']]);
  return W(s + wsnow5_3(t, 1) + shade3(), h);
};
WMASC.c5twaerme_3 = () => BIG3();

// ---------- Schluss ----------
WORLD.c5toutro_3 = function (sc, ev, t) { return W(wsky5_3(t) + '<circle cx="770" cy="1000" r="170" fill="#FF8A4D" opacity=".14"/>' + pad5b_3(770, 1000 + 6 * Math.sin(t * 2), 250, 160, 1, t, 1) + wsnow5_3(t, 1) + shade3()); };

// ---------- Version 3.0: mehr Aktionen von Schalti ----------
// Teil 2: Die Kristalle jagen Schalti und frieren ihn kurz ein
WMASC.c5tklick_3 = (ev, t, lt, sc) => (ev.wachs !== undefined && ev.act === undefined) ? Object.assign({ nospin: 1 }, c5chase_3(ev.wachs, D5_3(sc, 2), t).m) : BIG3();
// Teil 3: Schalti huepft zum warmen Kissen und waermt sich daran
WMASC.c5twaerme_3 = (ev, t, lt) => { const H = [220, 1537], P = [350, 1104];
  if (ev.koch !== undefined) { const k = ease(cl(ev.koch / .4)); return { f: [lerp(P[0], H[0], k), lerp(P[1], H[1], k) - 110 * Math.sin(Math.PI * k)], s: lerp(.78, 1, k), nospin: 1 }; }
  if (lt < .9) return { f: H, s: 1, nospin: 1 };
  const k = cl((lt - .9) / .5); return { f: [lerp(H[0], P[0], k), lerp(H[1], P[1], k) - 130 * Math.sin(Math.PI * k)], s: lerp(1, .78, k), r: k < 1 ? 0 : 4 * Math.sin(t * 4), nospin: 1 }; };

// ---------- Version 3.0: Kamera und Farbstimmung um jede Welt ----------
['c5tfluessig_3','c5tklick_3','c5toutro_3','c5twaerme_3','h7c5t_3'].forEach(n => { const inner = WORLD[n]; if (inner) WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#FF6BD6'); });
