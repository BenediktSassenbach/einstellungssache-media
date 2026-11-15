// Chemie C005 "Wie wird ein Taschenwaermer auf Knopfdruck warm?" (Bauplan wie C004, Einstieg mit Aufhaenger = 5 Zeilen). Etikett y=600, Grafik y=700 bis 1130.

// ---------- Helfer ----------
const lab5 = (t) => kitchen(t, '#1A0A22', '#3E1248', '#FF6BD6');
// Waermekissen: k = Anteil kristallisiert (waechst vom Metallplaettchen aus), glow = Waerme-Schein
function pad5(cx, cy, w, h, k, t, glow) { const id = 'pc' + Math.round(cx) + '_' + Math.round(cy), px = cx - w * .24, R = w * 1.3 * cl(k), x = cx - w / 2, y = cy - h / 2;
  let s = glow > 0 ? '<rect x="' + (x - 26) + '" y="' + (y - 26) + '" width="' + (w + 52) + '" height="' + (h + 52) + '" rx="' + (h * .34 + 20) + '" fill="#FF7A3D" opacity="' + (.35 * glow * (.8 + .2 * Math.sin(t * 6))) + '"/>' : '';
  s += '<clipPath id="' + id + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h * .3) + '"/></clipPath><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h * .3) + '" fill="#5CC8FF" opacity=".5"/>';
  if (k <= 0) s += '<path d="M' + (x + w * .5) + ' ' + (y + h * .3) + ' q' + (w * .12) + ' ' + (6 * Math.sin(t * 3)) + ' ' + (w * .24) + ' 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/>';
  else { s += '<g clip-path="url(#' + id + ')"><circle cx="' + px + '" cy="' + cy + '" r="' + R + '" fill="#F4F6FB"/>'; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8 + .2, r2 = R * (.7 + .3 * rnd(i + 3)); s += '<path d="M' + px + ' ' + cy + ' L' + (px + r2 * Math.cos(a)) + ' ' + (cy + r2 * Math.sin(a)) + '" stroke="#A9CFEA" stroke-width="5" stroke-linecap="round"/>'; } s += '</g>'; }
  s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h * .3) + '" fill="none" stroke="#fff" stroke-width="9"/><circle cx="' + px + '" cy="' + cy + '" r="' + (w * .075) + '" fill="#C9CFDD" stroke="#0B1020" stroke-width="5"/><path d="M' + (px - w * .035) + ' ' + cy + ' q' + (w * .035) + ' ' + (-w * .03) + ' ' + (w * .07) + ' 0" stroke="#0B1020" stroke-width="4" fill="none"/>';
  return s; }
function spike5(x, yb, hgt, w, op) { return hgt <= 0 ? '' : '<path d="M' + (x - w) + ' ' + yb + ' L' + (x - w * .2) + ' ' + (yb - hgt) + ' L' + (x + w * .3) + ' ' + (yb - hgt * .45) + ' L' + (x + w * .6) + ' ' + (yb - hgt * .8) + ' L' + (x + w) + ' ' + yb + ' Z" fill="#F4F6FB" stroke="#8ED6F5" stroke-width="5" stroke-linejoin="round" opacity="' + (op === undefined ? 1 : op) + '"/>'; }
function thermo5(x, y, hgt, v, lo, hi) { const f = cl((v - lo) / (hi - lo)), col = v >= 45 ? '#FF5A3D' : v < 5 ? '#7FD3FF' : '#FFD23F';
  return '<rect x="' + (x - 20) + '" y="' + y + '" width="40" height="' + hgt + '" rx="20" fill="#0B1020" stroke="#fff" stroke-width="7"/><circle cx="' + x + '" cy="' + (y + hgt + 14) + '" r="38" fill="' + col + '" stroke="#fff" stroke-width="7"/><rect x="' + (x - 9) + '" y="' + (y + 12 + (hgt - 12) * (1 - f)) + '" width="18" height="' + ((hgt - 12) * f + 10) + '" rx="9" fill="' + col + '"/>' + svgT(x + 50, y + 12 + (hgt - 12) * (1 - f) + 18, v + ' °C', 54, col, 'start'); }
function flake5(x, y, s, rot) { let d = ''; for (let i = 0; i < 3; i++) d += '<path d="M0 -20 V20" transform="rotate(' + (i * 60) + ')" stroke="#DFF4FF" stroke-width="5" stroke-linecap="round"/>'; return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')">' + d + '</g>'; }
const D5 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3.2;

// Gag Teil 2 (Verfolgung): Die Kristalle wachsen Schalti am Boden hinterher, holen ihn ein und frieren ihn kurz ein
function c5chase(q, D, t) { const u = cl(q / Math.max(2.8, D - .1)), HX = 220, HY = 1537, X1 = 780;
  if (u < .12) { const k = u / .12; return { front: 40 + 40 * k, fo: 1, ice: 0, m: { f: [HX, HY], s: 1, r: -8 * k } }; }
  if (u < .5) { const c = (u - .12) / .38, x = lerp(HX, X1, c); return { front: x - 250 + 150 * c, fo: 1, ice: 0, m: { f: [x, HY - 16 * Math.abs(Math.sin(t * 16))], s: 1, r: -8 + 5 * Math.sin(t * 16) } }; }
  if (u < .72) { const c = (u - .5) / .22; return { front: lerp(680, 940, cl(c * 2)), fo: 1, ice: cl(c * 6), m: { f: [X1, HY], s: 1, r: 0, fx: 'saturate(.2) brightness(1.55)' } }; }
  if (u < .8) { const c = (u - .72) / .08; return { front: 940, fo: 1 - c, ice: 0, burst: c, m: { f: [X1, HY - 30 * Math.sin(Math.PI * c)], s: 1, r: 10 * Math.sin(t * 30) } }; }
  const c = (u - .8) / .2; return { front: 940, fo: 0, ice: 0, m: { f: [lerp(X1, HX, ease(c)), HY - 12 * Math.abs(Math.sin(t * 14)) * (1 - c)], s: 1, r: 5 * Math.sin(t * 22) * (1 - c), flip: c < .9 } };
}

// ---------- Einstieg (Blitzstart): Das ganze Bild ist die klare Fuellung. Klick nach 0,45 s, Kristalle schiessen ueber den Bildschirm,
// Waerme glueht auf, Schalti friert kurz ein. Mit der Themenfrage (ev.mark) faehrt die Kamera zurueck: Es war ein Taschenwaermer. ----------
function frost5(e, t) { const CX = 600, CY = 890;
  let s = '<defs><radialGradient id="fr5" cx=".55" cy=".46" r=".8"><stop offset="0" stop-color="#2B62C0"/><stop offset="1" stop-color="#0A1530"/></radialGradient><radialGradient id="ht5" cx=".55" cy=".46" r=".75"><stop offset=".25" stop-color="#FF5A1F" stop-opacity="0"/><stop offset="1" stop-color="#FF5A1F" stop-opacity="1"/></radialGradient></defs><rect x="-600" y="-600" width="2280" height="3120" fill="url(#fr5)"/>';
  const bo = e < 0 ? 1 : 1 - cl(e / .4);
  if (bo > 0) for (let i = 0; i < 10; i++) { const y = 1900 - ((t * 90 * (.5 + rnd(i + 9)) + rnd(i + 20) * 1900) % 1900); s += '<circle cx="' + (60 + rnd(i + 1) * 960 + 12 * Math.sin(t * 3 + i)) + '" cy="' + y + '" r="' + (8 + 16 * rnd(i + 30)) + '" fill="none" stroke="#fff" stroke-width="4" opacity="' + (.3 * bo) + '"/>'; }
  if (e >= 0) { const fr = 1700 * (1 - Math.pow(1 - cl(e / 1.05), 2.4)); let dm = '', dt = '';
    s += '<circle cx="' + CX + '" cy="' + CY + '" r="' + fr + '" fill="#CFE9FF" opacity=".16"/>';
    for (let i = 0; i < 22; i++) { const a = i * Math.PI * 2 / 22 + .22 * (rnd(i + 40) - .5), ca = Math.cos(a), sa = Math.sin(a), L = fr * (.82 + .18 * rnd(i + 60));
      dm += 'M' + CX + ' ' + CY + 'L' + (CX + L * ca).toFixed(0) + ' ' + (CY + L * sa).toFixed(0);
      for (let d = 80; d < L; d += 92) { const g = cl((L - d) / 130), px = CX + d * ca, py = CY + d * sa; for (let q = -1; q <= 1; q += 2) { const b = a + q * .95, tl = (36 + 74 * rnd(i * 31 + d + q)) * g; dt += 'M' + px.toFixed(0) + ' ' + py.toFixed(0) + 'L' + (px + tl * Math.cos(b)).toFixed(0) + ' ' + (py + tl * Math.sin(b)).toFixed(0); } } }
    s += '<path d="' + dt + '" stroke="#BFE3FA" stroke-width="6" stroke-linecap="round" fill="none"/><path d="' + dm + '" stroke="#F4FAFF" stroke-width="10" stroke-linecap="round" fill="none"/>';
    const h = cl((e - .7) / .6); if (h > 0) s += '<rect x="-600" y="-600" width="2280" height="3120" fill="#FF6A1F" opacity="' + (.3 * h) + '"/><rect x="-600" y="-600" width="2280" height="3120" fill="url(#ht5)" opacity="' + (.6 * h * (.85 + .15 * Math.sin(t * 7))) + '"/>'; }
  const pr = e < 0 ? 1 + .1 * Math.sin(t * 22) : 1;
  if (e < 0) for (let i = 0; i < 2; i++) { const c = ((t * 2.4 + i * .5) % 1); s += '<circle cx="' + CX + '" cy="' + CY + '" r="' + (95 + 150 * c) + '" fill="none" stroke="#fff" stroke-width="7" opacity="' + (.6 * (1 - c)) + '"/>'; }
  s += '<g transform="translate(' + CX + ' ' + CY + ') scale(' + pr + ')"><circle r="84" fill="#C9CFDD" stroke="#0B1020" stroke-width="8"/><path d="M-40 6 q40 -34 80 0" stroke="#0B1020" stroke-width="7" fill="none" stroke-linecap="round"/></g>';
  if (e < .25) { const dn = e < 0 ? -26 + 10 * Math.sin(t * 22) : 0, up = e < 0 ? 0 : e / .25, fx = CX + 40 + 300 * up, fy = CY - 60 + dn - 500 * up; s += '<path d="M' + (fx + 420) + ' ' + (fy - 520) + ' Q' + (fx + 150) + ' ' + (fy - 380) + ' ' + fx + ' ' + fy + '" stroke="#FF6BD6" stroke-width="54" fill="none" stroke-linecap="round"/><circle cx="' + fx + '" cy="' + fy + '" r="34" fill="#FFD23F" stroke="#0B1020" stroke-width="6"/>'; }
  if (e >= 0 && e < .2) s += '<rect x="-600" y="-600" width="2280" height="3120" fill="#fff" opacity="' + (.85 * (1 - e / .2)) + '"/>';
  if (e > .95) { const k = back(cl((e - .95) / .3)); s += '<g transform="translate(600 742) rotate(-5) scale(' + (k * (1 + .03 * Math.sin(t * 9))) + ')"><rect x="-290" y="-78" width="580" height="140" rx="40" fill="#0B1020" stroke="#FF8A3D" stroke-width="9"/>' + svgT(0, 30, 'über 50 °C', 96, '#FFB14D', 'middle') + '</g>'; }
  return s; }
WORLD.h7c5 = function (sc, ev, t, lt) {
  const e = lt - .45, m = ev.mark, rv = m === undefined ? 0 : ease(cl(m / .55)), sh = shake7(e < 0 ? undefined : e, t), CX = 600, CY = 890;
  let s = stage7(t, m === undefined ? 0 : m, '#1A0A22', '#FF6BD6', CX, CY), fl = '';
  if (rv > 0) s += '<g opacity="' + cl(rv * 2) + '" transform="translate(' + CX + ' ' + (CY + 6 * Math.sin(t * 2.2)) + ') scale(' + lerp(2.6, 1, rv) + ') translate(' + (-CX) + ' ' + (-CY) + ')">' + pad5(CX, CY, 460, 300, 1, t, 1) + '</g>';
  if (rv < 1) s += '<g opacity="' + (1 - cl((rv - .35) / .5)) + '" transform="translate(' + CX + ' ' + CY + ') scale(' + lerp(1, .4, rv) + ') translate(' + (-CX) + ' ' + (-CY) + ')">' + frost5(e, t) + '</g>';
  if (e > .5) { const op = m === undefined ? 1 : 1 - cl(m / .15), g = cl((e - .5) / .25);
    if (op > 0) { for (let i = 0; i < 8; i++) fl += spike5(lerp(560, 60, i / 7), 1590, (90 + 80 * rnd(i + 5)) * g, 44, op);
      fl += '<rect x="76" y="1322" width="300" height="258" rx="34" fill="#BFEAFF" opacity="' + (.5 * op * g) + '" stroke="#fff" stroke-width="7"/><path d="M110 1362 l44 0 M110 1362 l0 44" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="' + (op * g) + '"/>'; } }
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + fl + '</g>' + vign7() + topShade());
};
WMASC.h7c5 = (ev, t, lt) => { const e = lt - .45, m = ev.mark;
  if (e > .55) { const th = m === undefined ? 0 : cl(m / .2), w = m === undefined ? 0 : cl(1 - (m - .65) / .5); return { f: [220, 1537], s: 1, r: 6 * Math.sin(t * 26) * th * w, fx: th < 1 ? 'saturate(' + (.2 + .8 * th) + ') brightness(' + (1.55 - .55 * th) + ')' : '' }; }
  return { f: [220, 1537], s: 1, r: e < 0 ? 2 * Math.sin(t * 14) : -6 };
};

// ---------- Teil 1: Salz der Essigsaeure in Wasser, Schmelzpunkt 58 Grad, bleibt fluessig, sogar bis minus 20 ----------
WORLD.c5fluessig = function (sc, ev, t, lt) {
  let s = lab5(t), h = '';
  const g = ev.grad, b = ev.bleibt, a = ev.act;
  s += '<g transform="translate(0 ' + (6 * Math.sin(t * 2)) + ')">' + pad5(350, 900, 430, 280, 0, t, 0) + '</g>' + chip3(350, 1096, 'Salz + Wasser', 36, '#F4F6FB', '#0B1020', (lt - 1.2) / .3);
  if (g !== undefined) { const v = a !== undefined ? Math.round(lerp(20, -20, ease(cl(a / 1.3)))) : b !== undefined ? Math.round(lerp(58, 20, ease(cl(b / 1.3)))) : 58, y58 = 740 + 12 + 288 * (1 - 88 / 100);
    s += '<g opacity="' + cl(g / .3) + '">' + thermo5(700, 740, 300, v, -30, 70) + '<path d="M650 ' + y58 + ' H676" stroke="#FF5A3D" stroke-width="7" stroke-linecap="round"/>' + svgT(640, y58 + 12, '58', 34, '#FF9A7A', 'end') + '</g>'; }
  if (b !== undefined && a === undefined) s += okx1(540, 770, 40, true, (b - 1.2) / .3);
  if (a !== undefined) for (let i = 0; i < 7; i++) { const c = (t * .22 + rnd(i + 4)) % 1; s += '<g opacity="' + cl(a / .4) + '">' + flake5(110 + 70 * i + 20 * Math.sin(t + i), 700 + 420 * c, .8 + .5 * rnd(i), t * 40 + i * 30) + '</g>'; }
  h += slot(ev, [['salz', 'Ein Salz der Essigsäure, in Wasser'], ['grad', 'Schmelzpunkt: 58 Grad'], ['bleibt', 'Bleibt trotzdem flüssig', 'hot'], ['act', 'Sogar bis minus 20 Grad', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.c5fluessig = () => BIG();

// ---------- Teil 2: Teilchen brauchen einen Startpunkt, Knick macht den Keim, Kristall waechst, Ausloeser nicht ganz geklaert ----------
WORLD.c5klick = function (sc, ev, t, lt) {
  let s = lab5(t), h = '';
  const kn = ev.knick, wa = ev.wachs, a = ev.act, PX = 150, PY = 902;
  const front = wa !== undefined ? lerp(230, 1000, ease(cl(wa / 1.8))) : kn !== undefined ? 150 + 100 * ease(cl((kn - .5) / .6)) : 0;
  s += '<rect x="90" y="700" width="810" height="410" rx="60" fill="#2A0E36" stroke="#fff" stroke-width="8"/>';
  const P = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { const i = r * 7 + c, gx = 250 + c * 95, gy = 762 + r * 94, o = cl((front - gx + 40) / 70); P.push([lerp(gx + (rnd(i + 9) - .5) * 60 + 16 * Math.sin(t * (2.2 + rnd(i)) + i * 2), gx, o), lerp(gy + (rnd(i + 27) - .5) * 44 + 16 * Math.cos(t * (2 + rnd(i + 5)) + i), gy, o), o, c]); }
  P.forEach((p, i) => { if (p[2] > .9 && p[3] < 6 && P[i + 1][2] > .9) s += '<path d="M' + p[0] + ' ' + p[1] + ' L' + P[i + 1][0] + ' ' + P[i + 1][1] + '" stroke="#F4F6FB" stroke-width="6"/>'; if (p[2] > .9 && i + 7 < 28 && P[i + 7][2] > .9) s += '<path d="M' + p[0] + ' ' + p[1] + ' L' + P[i + 7][0] + ' ' + P[i + 7][1] + '" stroke="#F4F6FB" stroke-width="6"/>'; });
  P.forEach(p => { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="21" fill="' + lc('#5CC8FF', '#F4F6FB', p[2]) + '" stroke="#0B1020" stroke-width="4"/>'; });
  const fl = kn !== undefined && kn < .5 ? Math.sin(Math.PI * kn / .5) : 0;
  s += '<g transform="translate(' + PX + ' ' + PY + ') scale(' + (1 + .25 * fl) + ')"><circle r="46" fill="#C9CFDD" stroke="#0B1020" stroke-width="6"/><path d="M-24 0 q24 ' + (-22 + 44 * fl) + ' 48 0" stroke="#0B1020" stroke-width="6" fill="none" stroke-linecap="round"/></g>';
  if (fl > 0) for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3; s += '<path d="M' + (PX + 60 * Math.cos(an)) + ' ' + (PY + 60 * Math.sin(an)) + ' l' + (22 * fl * Math.cos(an)) + ' ' + (22 * fl * Math.sin(an)) + '" stroke="#FFD23F" stroke-width="7" stroke-linecap="round"/>'; }
  if (kn !== undefined && wa === undefined) s += chip3(330, 1052, 'Keim', 36, '#FFD23F', '#0B1020', (kn - .8) / .3);
  if (a !== undefined) s += '<g transform="translate(' + PX + ' ' + (PY - 110 - 8 * Math.abs(Math.sin(t * 5))) + ') scale(' + back(cl(a / .35)) + ')"><circle r="46" fill="#FFD23F" stroke="#0B1020" stroke-width="6"/>' + svgT(0, 22, '?', 64, '#0B1020') + '</g>';
  if (wa !== undefined && a === undefined) { const g = c5chase(wa, D5(sc, 2), t); for (let x = 40; x < g.front; x += 64) s += spike5(x, 1592, 56 + 60 * rnd(x), 36, g.fo);
    if (g.ice > 0) s += '<rect x="636" y="1322" width="296" height="258" rx="34" fill="#BFEAFF" opacity="' + (.5 * g.ice) + '" stroke="#fff" stroke-width="7"/>';
    if (g.burst !== undefined) for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4; s += '<path d="M' + (784 + (120 + 160 * g.burst) * Math.cos(an)) + ' ' + (1450 + (90 + 120 * g.burst) * Math.sin(an)) + ' l14 -22 l12 24 Z" fill="#DFF4FF" opacity="' + (1 - g.burst) + '"/>'; } }
  h += slot(ev, [['start', 'Den Teilchen fehlt ein Startpunkt'], ['knick', 'Plättchen knicken: ein Keim entsteht', 'hot'], ['wachs', 'Der Kristall wächst durchs Kissen'], ['act', 'Auslöser: nicht ganz geklärt', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.c5klick = (ev, t, lt, sc) => (ev.wachs !== undefined && ev.act === undefined) ? c5chase(ev.wachs, D5(sc, 2), t).m : BIG();

// ---------- Teil 3: Waerme wird frei, ueber 50 Grad, im kochenden Wasser aufladen, wieder fluessig ----------
WORLD.c5waerme = function (sc, ev, t, lt) {
  let s = lab5(t), h = '';
  const hs = ev.heiss, ko = ev.koch, a = ev.act;
  if (ko === undefined && a === undefined) { const kr = ease(cl((lt - .5) / 1.4));
    s += pad5(350, 900, 430, 280, kr, t, kr);
    for (let i = 0; i < 5; i++) { const c = (t * .5 + i / 5) % 1, x = 190 + i * 80; s += '<path d="M' + x + ' ' + (740 - 70 * c) + ' q16 -16 0 -32 q-16 -16 0 -32" stroke="#FF7A3D" stroke-width="9" fill="none" stroke-linecap="round" opacity="' + (kr * (1 - c)) + '"/>'; }
    if (hs !== undefined) s += '<g opacity="' + cl(hs / .3) + '">' + thermo5(700, 740, 300, Math.round(lerp(20, 54, ease(cl(hs / 1.4)))), -30, 70) + '</g>';
  } else { const kr = a !== undefined ? 0 : 1 - ease(cl((ko - .8) / 1.8)), boil = a === undefined;
    s += '<rect x="170" y="800" width="640" height="300" rx="36" fill="#2A3350" stroke="#C9CFDD" stroke-width="9"/><rect x="186" y="836" width="608" height="248" rx="24" fill="#3BA8FF" opacity=".75"/><path d="M110 850 H170 M810 850 H870" stroke="#C9CFDD" stroke-width="22" stroke-linecap="round"/>';
    s += '<g transform="translate(0 ' + (boil ? 5 * Math.sin(t * 8) : 0) + ')">' + pad5(490, 968, 330, 190, kr, t, 0) + '</g>';
    if (boil) { for (let i = 0; i < 9; i++) { const c = (t * .9 + rnd(i + 2)) % 1; s += '<circle cx="' + (220 + 66 * i + 8 * Math.sin(t * 5 + i)) + '" cy="' + (1070 - 220 * c) + '" r="' + (7 + 9 * c) + '" fill="none" stroke="#DFF4FF" stroke-width="4" opacity="' + (1 - c) + '"/>'; }
      for (let i = 0; i < 3; i++) { const c = (t * .4 + i / 3) % 1; s += '<path d="M' + (330 + i * 160) + ' ' + (790 - 70 * c) + ' q18 -18 0 -36" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + (.7 * (1 - c)) + '"/>'; }
      s += chip3(690, 752, 'Vorsicht, heiß', 30, '#FF5A3D', '#fff', (ko - .6) / .3); }
    else s += okx1(820, 780, 54, true, a / .35); }
  h += slot(ev, [['frei', 'Beim Festwerden wird Wärme frei'], ['heiss', 'Über 50 Grad warm', 'hot'], ['koch', 'Trick: ab ins kochende Wasser'], ['act', 'Wieder flüssig und startklar', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.c5waerme = () => BIG();

// ---------- Schluss ----------
WORLD.c5outro = function (sc, ev, t) { return W(lab5(t) + pad5(770, 1010, 250, 160, 1, t, 1) + topShade()); };
