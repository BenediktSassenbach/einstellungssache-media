// Informatik I002 "Woher weiss TikTok, was du magst?" (Bauplan wie I006). Etikett y=600, Grafik y=700 bis 1130. Nutzt Helfer aus viz_i006.js und viz_i001.js.

// ---------- Helfer ----------
const V2C = ['#FF7A59', '#3DB8FF', '#2ECC71', '#FFCC00', '#FF5A8A', '#B05CFF'];
function vid2(x, y, s, rot, i, op) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')" opacity="' + (op === undefined ? 1 : op) + '"><rect x="-56" y="-90" width="112" height="180" rx="18" fill="' + V2C[i % 6] + '" stroke="#0B1020" stroke-width="6"/><path d="M-16 -24 L24 0 L-16 24 Z" fill="#fff"/><rect x="-40" y="58" width="56" height="10" rx="5" fill="#fff" opacity=".8"/></g>'; }
function heart2(x, y, s, col, op) { return '<path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0 26 C -44 -6, -28 -38, 0 -14 C 28 -38, 44 -6, 0 26 Z" fill="' + (col || '#FF4D6D') + '" stroke="#0B1020" stroke-width="4" opacity="' + (op === undefined ? 1 : op) + '"/>'; }
function ico2(n, x, y, s) { const g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
  if (n === 'share') return g + '<path d="M-26 22 Q-26 -8 6 -8 V-26 L32 0 L6 26 V8 Q-12 8 -26 22 Z" fill="#3DB8FF" stroke="#0B1020" stroke-width="4" stroke-linejoin="round"/></g>';
  if (n === 'talk') return g + '<path d="M-30 -22 H30 Q36 -22 36 -16 V12 Q36 18 30 18 H-4 L-22 34 V18 H-30 Q-36 18 -36 12 V-16 Q-36 -22 -30 -22 Z" fill="#FFD23F" stroke="#0B1020" stroke-width="4" stroke-linejoin="round"/></g>';
  if (n === 'plus') return g + '<circle r="30" fill="#3DFF7A" stroke="#0B1020" stroke-width="4"/><path d="M-15 0 H15 M0 -15 V15" stroke="#0B1020" stroke-width="8" stroke-linecap="round"/></g>';
  if (n === 'note') return g + '<path d="M-10 22 V-28 L24 -36 V14" stroke="#FF5A8A" stroke-width="8" fill="none" stroke-linejoin="round"/><ellipse cx="-20" cy="24" rx="14" ry="10" fill="#FF5A8A"/><ellipse cx="14" cy="16" rx="14" ry="10" fill="#FF5A8A"/></g>';
  if (n === 'globe') return g + '<circle r="32" fill="#3DB8FF" stroke="#0B1020" stroke-width="4"/><ellipse rx="14" ry="32" fill="none" stroke="#0B1020" stroke-width="4"/><path d="M-32 0 H32 M-27 -16 H27 M-27 16 H27" stroke="#0B1020" stroke-width="4"/></g>';
  return g + '</g>'; }
function card2(x, y, w, hgt, num, title, k) { return k <= 0 ? '' : '<g transform="translate(' + (x + w / 2) + ' ' + (y + hgt / 2) + ') scale(' + back(cl(k)) + ') translate(' + (-(x + w / 2)) + ' ' + (-(y + hgt / 2)) + ')"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hgt + '" rx="30" fill="#141C36" stroke="#B9A6FF" stroke-width="6"/><circle cx="' + (x + 44) + '" cy="' + (y + 46) + '" r="26" fill="#7C5CFF"/>' + svgT(x + 44, y + 58, num, 36, '#fff') + svgT(x + 84, y + 58, title, 34, '#fff', 'start'); }

// Gag Teil 1 (Eigentor): Schalti stampft auf den Herz-Knopf, die Herzen schiessen hoch und pusten ihn zurueck
function i2heart(q, D, t) { const u = cl(q / Math.max(2.4, D - .1)), HX = 220, HY = 1537, X1 = 500;
  if (u < .32) { const x = lerp(HX, X1, u / .32); return { u, b: 0, m: { f: [x, HY], s: 1, walk: true, r: -3 } }; }
  if (u < .44) { const c = (u - .32) / .12; return { u, b: 0, m: { f: [X1 + 40 * c, HY - 34 * Math.sin(Math.PI * c)], s: 1, r: 8 * c } }; }
  if (u < .7) { const c = (u - .44) / .26; return { u, b: c, m: { f: [lerp(X1 + 40, HX, ease(c)), HY - 30 * Math.abs(Math.sin(Math.PI * 2 * c)) * (1 - c)], s: 1, r: -22 * (1 - c) - 6 } }; }
  return { u, b: 1, m: { f: [HX, HY], s: 1, r: -6 + 5 * Math.sin(t * 14) * (1 - (u - .7) / .3) } };
}
// Gag Teil 2 (Verfolgung): Ein Video haengt sich an Schalti, je laenger er hinschaut, desto mehr werden es
function i2train(q, D, t) { const u = cl(q / Math.max(2.6, D - .1)), HX = 220, HY = 1537, run = 16 * Math.abs(Math.sin(t * 16));
  if (u < .14) return { u, x: HX, dir: 1, n: 1, m: { f: [HX, HY], s: 1, r: 4 * Math.sin(t * 20) * (u / .14) } };
  if (u < .5) { const c = (u - .14) / .36, x = lerp(HX, 780, c); return { u, x, dir: 1, n: 1 + Math.floor(c * 4), m: { f: [x, HY - run], s: 1, r: -8 + 5 * Math.sin(t * 16) } }; }
  if (u < .6) { const c = (u - .5) / .1; return { u, x: 780, dir: c > .5 ? -1 : 1, n: 5, m: { f: [780, HY - 32 * Math.sin(Math.PI * c)], s: 1, r: 360 * c, flip: c > .5 } }; }
  if (u < .9) { const c = (u - .6) / .3, x = lerp(780, HX, ease(c)); return { u, x, dir: -1, n: 5, m: { f: [x, HY - run * (1 - c)], s: 1, r: 8 + 5 * Math.sin(t * 16), flip: true } }; }
  return { u, x: HX, dir: 0, n: 5, m: { f: [HX, HY], s: 1, r: -8 + 4 * Math.sin(t * 12) } };
}

// ---------- Einstieg: Das Handy starrt Schalti an und feuert Videos auf ihn ----------
WORLD.h7i2 = function (sc, ev, t, lt) {
  const e = ev.egal, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e, t), CX = 590, CY = 905, X = CX - 140, Y = CY - 220;
  let s = stage7(t, lt, '#07081C', e === undefined ? lc('#7C5CFF', '#FF5A8A', k) : '#FFD23F', CX, CY), o = '', fl = '';
  o += phoneF(X, Y, 280, 440, '#1B2748');
  const ey = 60 + 26 * k, px = -34 - 10 * k + 6 * Math.sin(t * 3), py = 30 + 14 * k;
  o += '<ellipse cx="' + CX + '" cy="' + (CY - 50) + '" rx="100" ry="' + ey + '" fill="#fff" stroke="#0B1020" stroke-width="6"/><circle cx="' + (CX + px) + '" cy="' + (CY - 50 + py) + '" r="' + (34 + 8 * k) + '" fill="#7C5CFF"/><circle cx="' + (CX + px) + '" cy="' + (CY - 50 + py) + '" r="' + (15 + 4 * k) + '" fill="#0B1020"/><circle cx="' + (CX + px + 12) + '" cy="' + (CY - 62 + py) + '" r="7" fill="#fff"/>';
  for (let i = 0; i < 3; i++) o += '<rect x="' + (CX - 104 + i * 72) + '" y="' + (CY + 80) + '" width="62" height="96" rx="12" fill="' + V2C[(i + Math.floor(t * 1.2)) % 6] + '"/>';
  if (e === undefined) for (let i = 0; i < 4; i++) { const c = (t * .5 + i / 4) % 1; o += heart2(X - 40 - 30 * Math.sin(c * 5 + i), CY + 150 - 330 * c, .8 + .5 * c, '#FF4D6D', k * (1 - c)); }
  if (e !== undefined) for (let i = 0; i < 9; i++) { const q = e - i * .07; if (q <= 0) continue; const tx = 170 + rnd(i + 4) * 230, ty = 1280 + rnd(i + 9) * 50, dir = i % 2 ? 1 : -1; let x, y, r;
    if (q < .5) { const c = q / .5; x = lerp(CX, tx, c); y = lerp(CY, ty, c) - 320 * Math.sin(Math.PI * c); r = 420 * c * dir; }
    else { const c2 = cl((q - .5) / .9); x = tx + dir * (150 + 220 * rnd(i)) * c2; y = ty - 170 * Math.sin(Math.PI * c2 * .9) + 560 * c2 * c2; r = 420 * dir + 380 * c2 * dir; }
    fl += vid2(x, y, .75, r, i, 1 - cl((q - 1.2) / .25)); }
  if (e !== undefined && e > .6) fl += stars6(e, t);
  s += pop7(CX, CY, lt, o) + fl + sweat7(t, e === undefined ? k * .7 : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7i2 = (ev, t, lt, sc) => { const e = ev.egal, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined && e > .5) { const b = cl((e - .5) / .25); return { f: [220 - 30 * b, 1537], s: 1, r: -12 * b + 6 * Math.sin(t * 7) }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 12) };
};

// ---------- Teil 1: drei Signale, Followerzahl zaehlt nicht direkt ----------
WORLD.i2sig = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const tu = ev.tun === undefined ? 0 : ev.tun, vi = ev.video, ei = ev.einst, a = ev.act, CW = 262, CH = 300, CY = 735, dim = a === undefined ? 1 : 0;
  s += '<g opacity="' + dim + '">';
  const c1 = card2(88, CY, CW, CH, '1', 'Du', (tu - .3) / .35); if (c1) { s += c1; [['heart', 0], ['share', 1], ['talk', 2], ['plus', 3]].forEach((q, i) => { const k = back(cl((tu - 1 - i * .5) / .3)), x = 88 + 80 + (i % 2) * 104, y = CY + 140 + Math.floor(i / 2) * 96; s += q[0] === 'heart' ? heart2(x, y - 4, 1.15 * k * (1 + .08 * Math.sin(t * 8)), '#FF4D6D') : ico2(q[0], x, y, k); }); s += '</g>'; }
  const c2 = card2(88 + CW + 14, CY, CW, CH, '2', 'Video', vi === undefined ? 0 : vi / .35); if (c2) { s += c2 + '<g transform="translate(' + (88 + CW + 14 + 76) + ' ' + (CY + 150) + ') scale(' + back(cl((vi - .5) / .3)) + ')">' + svgT(0, 22, 'Aa', 62, '#fff') + '</g>' + ico2('note', 88 + CW + 14 + 186, CY + 150, back(cl((vi - .9) / .3)) * 1.1) + '<g transform="translate(' + (88 + CW + 14 + 131) + ' ' + (CY + 246) + ') scale(' + back(cl((vi - 1.3) / .3)) + ')">' + svgT(0, 22, '#', 74, '#3DFF7A') + '</g></g>'; }
  const c3 = card2(88 + 2 * (CW + 14), CY, CW, CH, '3', 'Gerät', ei === undefined ? 0 : ei / .35); if (c3) { s += c3 + ico2('globe', 88 + 2 * (CW + 14) + 84, CY + 160, back(cl((ei - .5) / .3)) * 1.25) + '<g transform="translate(' + (88 + 2 * (CW + 14) + 186) + ' ' + (CY + 160) + ') scale(' + back(cl((ei - .9) / .3)) + ')"><rect x="-44" y="-30" width="88" height="60" rx="14" fill="#F4F6FB" stroke="#0B1020" stroke-width="4"/>' + svgT(0, 14, 'DE', 40, '#0B1020') + '</g></g>'; }
  s += '</g>';
  if (a !== undefined) { const k = back(cl(a / .35)), c = cl((a - .6) / .3);
    s += '<g transform="translate(500 905) scale(' + k + ')"><rect x="-330" y="-110" width="660" height="220" rx="44" fill="#F4F6FB" stroke="#0B1020" stroke-width="7"/><circle cx="-240" cy="-24" r="34" fill="#AEB9D6"/><path d="M-298 62 Q-240 -6 -182 62 Z" fill="#AEB9D6"/>' + svgT(-150, -12, '3 Mio.', 76, '#0B1020', 'start') + svgT(-150, 54, 'Follower', 44, '#5A6686', 'start') + '</g>';
    if (c > 0) s += '<path d="M200 820 L' + (200 + 600 * c) + ' ' + (820 + 170 * c) + '" stroke="#FF4D4D" stroke-width="20" stroke-linecap="round"/>'; }
  if (ei !== undefined && a === undefined) { const g = i2heart(ei, D6(sc, 2), t), bx = 640, by = 1512, pr = g.u > .36 && g.u < .5;
    s += '<ellipse cx="' + bx + '" cy="' + (by + 44) + '" rx="74" ry="16" fill="#0B1020" opacity=".5"/>' + heart2(bx, by + (pr ? 12 : 0), 1.7 * (1 + .06 * Math.sin(t * 9)), '#FF4D6D');
    if (g.b > 0) for (let i = 0; i < 11; i++) { const c = cl(g.b * 1.5 - i * .04), a2 = -Math.PI * (.2 + .6 * rnd(i + 2)), d = 120 + 420 * c; if (c > 0 && c < 1) s += heart2(bx + d * Math.cos(a2) - 160 * c, by + d * Math.sin(a2) + 420 * c * c, .7 + .6 * rnd(i), ['#FF4D6D', '#FF8FA3', '#fff'][i % 3], 1 - c); } }
  h += slot(ev, [['tun', 'Signal 1: was du tust'], ['video', 'Signal 2: was im Video steckt', 'hot'], ['einst', 'Signal 3: Sprache, Land, Gerät'], ['act', 'Followerzahl: kein direkter Faktor', 'red']]);
  return W(s + topShade(), h);
};
WMASC.i2sig = (ev, t, lt, sc) => ev.act !== undefined ? BIG() : ev.einst !== undefined ? i2heart(ev.einst, D6(sc, 2), t).m : BIG();

// ---------- Teil 2: Sehdauer, starkes und schwaches Signal, System lernt, jeder Feed anders ----------
WORLD.i2watch = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const z = ev.zeit === undefined ? 0 : ev.zeit, st = ev.stark, le = ev.lernt, a = ev.act;
  if (st === undefined) { const f = cl((z - .5) / Math.max(2, D6(sc, 0) - .8));
    s += phoneF(120, 725, 250, 400, V2C[1]) + '<path d="M215 885 L290 925 L215 965 Z" fill="#fff"/><rect x="150" y="1070" width="190" height="16" rx="8" fill="#0B1020" opacity=".5"/><rect x="150" y="1070" width="' + (190 * f) + '" height="16" rx="8" fill="#fff"/>';
    s += '<g transform="translate(660 910)"><circle r="150" fill="#F4F6FB" stroke="#0B1020" stroke-width="9"/><rect x="-18" y="-186" width="36" height="34" rx="8" fill="#F4F6FB" stroke="#0B1020" stroke-width="7"/>' + '<path d="M0 0 L' + (112 * Math.sin(f * 6.283)) + ' ' + (-112 * Math.cos(f * 6.283)) + '" stroke="#FF4D4D" stroke-width="12" stroke-linecap="round"/><path d="M0 -150 A150 150 0 ' + (f > .5 ? 1 : 0) + ' 1 ' + (150 * Math.sin(f * 6.283)) + ' ' + (-150 * Math.cos(f * 6.283)) + '" stroke="#3DFF7A" stroke-width="18" fill="none"/><circle r="12" fill="#0B1020"/></g>';
  } else if (le === undefined) { const k = back(cl(st / .35)), tilt = -13 * ease(cl((st - .9) / .8)), PX = 520, PY = 800, L = 290, an = tilt * Math.PI / 180;
    const lx = PX - L * Math.cos(an), ly = PY - L * Math.sin(an), rx = PX + L * Math.cos(an), ry = PY + L * Math.sin(an);
    s += '<g opacity="' + cl(st / .3) + '"><path d="M' + PX + ' ' + PY + ' V1090 M' + (PX - 110) + ' 1100 H' + (PX + 110) + '" stroke="#C9CFDD" stroke-width="16" stroke-linecap="round"/><path d="M' + lx + ' ' + ly + ' L' + rx + ' ' + ry + '" stroke="#F4F6FB" stroke-width="16" stroke-linecap="round"/><circle cx="' + PX + '" cy="' + PY + '" r="18" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/>';
    [[lx, ly, 'bis zum Ende', '#3DFF7A', 1.3], [rx, ry, 'gleiches Land', '#8A93A8', 1]].forEach((q, i) => { const kk = back(cl((st - .3 - i * .4) / .3)), w = q[2].length * 20 * q[4] + 50;
      s += '<path d="M' + q[0] + ' ' + q[1] + ' v' + 70 + '" stroke="#C9CFDD" stroke-width="6"/><g transform="translate(' + q[0] + ' ' + (q[1] + 118) + ') scale(' + kk + ')"><rect x="' + (-w / 2) + '" y="' + (-48 * q[4]) + '" width="' + w + '" height="' + (96 * q[4]) + '" rx="22" fill="' + q[3] + '" stroke="#0B1020" stroke-width="6"/>' + svgT(0, 12 * q[4], q[2], 34 * q[4], '#0B1020') + '</g>'; });
    s += '</g>';
  } else if (a === undefined) { // mehr davon, dazu Neues
    s += phoneF(110, 725, 230, 400, '#1B2748'); for (let i = 0; i < 3; i++) { const yy = 750 + ((i * 130 + t * 60) % 390); s += '<rect x="130" y="' + Math.min(yy, 1090) + '" width="190" height="' + Math.max(0, Math.min(116, 1104 - yy)) + '" rx="16" fill="' + V2C[1] + '" opacity=".9"/>'; }
    for (let i = 0; i < 6; i++) { const k = (le - .3 - i * .3) / .3, nu = i === 5; s += vid2(470 + (i % 3) * 150, 820 + Math.floor(i / 3) * 200, .9 * back(cl(k)), 0, nu ? 3 : 1) + (nu && k > .6 ? svgT(470 + 2 * 150, 1034, '?', 60, '#0B1020') : ''); }
    const g = i2train(le, D6(sc, 2), t); for (let i = 0; i < g.n; i++) { const off = 190 + i * 96; let x = g.dir >= 0 ? g.x - off : g.x + off; if (g.dir === 0) x = 400 + i * 90; s += vid2(x, 1452 + 10 * Math.sin(t * 12 + i), .62, 8 * Math.sin(t * 10 + i), 1); }
  } else { [[300, [0, 2, 4, 5]], [700, [3, 1, 5, 0]]].forEach((q, n) => { const k = back(cl((a - n * .35) / .35)); s += '<g transform="translate(' + q[0] + ' 925) scale(' + k + ') translate(' + (-q[0]) + ' -925)">' + phoneF(q[0] - 125, 725, 250, 400, '#1B2748'); q[1].forEach((c, i) => { s += '<rect x="' + (q[0] - 100 + (i % 2) * 104) + '" y="' + (760 + Math.floor(i / 2) * 170) + '" width="96" height="156" rx="14" fill="' + V2C[c] + '"/>'; }); s += '</g>'; });
    s += '<g transform="translate(500 925) scale(' + back(cl((a - .8) / .3)) + ')"><circle r="46" fill="#FFD23F" stroke="#0B1020" stroke-width="6"/><path d="M-20 -10 H20 M-20 12 H20 M10 -26 L-10 28" stroke="#0B1020" stroke-width="8" stroke-linecap="round"/></g>'; }
  h += slot(ev, [['zeit', 'Am stärksten: wie lange du schaust'], ['stark', 'Bis zum Ende: starkes Signal', 'hot'], ['lernt', 'Mehr davon, dazu Neues zum Testen'], ['act', 'Kein Feed gleicht dem anderen', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i2watch = (ev, t, lt, sc) => ev.act !== undefined ? BIG() : ev.lernt !== undefined ? i2train(ev.lernt, D6(sc, 2), t).m : BIG();

// ---------- Teil 3: Feed lenken, Nicht interessiert, Feed neu starten ----------
WORLD.i2steuer = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const ni = ev.nicht, ne = ev.neu, a = ev.act;
  if (ne === undefined && a === undefined) {
    s += phoneF(330, 725, 250, 400, '#1B2748') + vid2(455, 925, 1.5, 0, ni === undefined ? Math.floor(t * .8) : 4);
    if (ni === undefined) { const k = back(cl((lt - .6) / .4)); s += '<g transform="translate(760 925) rotate(' + (24 * Math.sin(t * 2.2)) + ') scale(' + k + ')"><circle r="120" fill="none" stroke="#F4F6FB" stroke-width="24"/><circle r="30" fill="#F4F6FB"/><path d="M0 0 V-112 M0 0 L97 56 M0 0 L-97 56" stroke="#F4F6FB" stroke-width="20" stroke-linecap="round"/></g>'; }
    else { const hold = cl((ni - .3) / 1), mk = (ni - 1.4) / .3;
      s += '<circle cx="455" cy="945" r="46" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="' + (290 * hold) + ' 290" transform="rotate(-90 455 945)"/><circle cx="455" cy="945" r="' + (26 - 4 * hold) + '" fill="#FFD9B3" stroke="#0B1020" stroke-width="5"/>';
      if (mk > 0) s += '<g transform="translate(770 900) scale(' + back(cl(mk)) + ')"><rect x="-160" y="-70" width="320" height="140" rx="30" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + svgT(0, -6, 'Nicht', 44, '#0B1020') + svgT(0, 46, 'interessiert', 44, '#0B1020') + '</g>' + okx1(900, 820, 34, false, mk - .6); }
  } else { const D = D6(sc, 2), g = a === undefined ? i1stamp(ne, D, t) : { p: 0, done: 1 }, k = back(cl((a === undefined ? ne : 1) / .35)), py = 40 * g.p;
    s += '<g transform="translate(205 ' + (962 + py) + ') scale(' + k + ')"><ellipse cx="0" cy="' + (64 - py) + '" rx="96" ry="22" fill="#0B1020" opacity=".5"/><rect x="-86" y="26" width="172" height="' + (40 - py * .6) + '" rx="14" fill="#5A6686" stroke="#0B1020" stroke-width="5"/><circle r="70" fill="' + (g.done ? '#3DFF7A' : '#FF5A8A') + '" stroke="#0B1020" stroke-width="7"/><g transform="rotate(' + (g.done ? -t * 200 : 0) + ')"><path d="M-34 0 A34 34 0 1 1 -10 32" stroke="#0B1020" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-30 30 L-8 34 L-14 12 Z" fill="#0B1020"/></g></g>';
    if (a === undefined) { s += '<g transform="translate(630 842) scale(' + k + ') translate(-630 -842)"><rect x="350" y="722" width="560" height="250" rx="28" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + svgT(378, 768, 'Einstellungen und Datenschutz', 28, '#5A6686', 'start') + '<line x1="372" y1="790" x2="888" y2="790" stroke="#DDE2EE" stroke-width="3"/>' + svgT(378, 840, 'Inhaltspräferenzen', 38, '#0B1020', 'start') + '<rect x="372" y="870" width="516" height="76" rx="20" fill="' + (g.done ? '#3DFF7A' : '#E6EAF4') + '" stroke="#0B1020" stroke-width="4"/>' + svgT(396, 920, 'Feed „Für dich“ aktualisieren', 32, '#0B1020', 'start') + '</g>'; }
    else { const k2 = back(cl(a / .35)); s += '<g transform="translate(630 925) scale(' + k2 + ') translate(-630 -925)">' + phoneF(505, 725, 250, 400, '#1B2748'); for (let i = 0; i < 4; i++) { const kk = back(cl((a - .5 - i * .3) / .3)); s += '<g transform="translate(' + (578 + (i % 2) * 104) + ' ' + (838 + Math.floor(i / 2) * 170) + ') scale(' + kk + ')"><rect x="-48" y="-78" width="96" height="156" rx="14" fill="' + V2C[(i * 2 + 3) % 6] + '"/></g>'; } s += '</g>';
      for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4 + t, c = (t * .7 + i / 8) % 1; s += '<path transform="translate(' + (630 + (190 + 60 * c) * Math.cos(an)) + ' ' + (925 + (230 + 60 * c) * Math.sin(an)) + ') scale(' + (1 - c) + ')" d="M0 -18 L5 -5 L18 0 L5 5 L0 18 L-5 5 L-18 0 L-5 -5 Z" fill="#FFD23F"/>'; } }
  }
  h += slot(ev, [['lenk', 'Du kannst mitsteuern'], ['nicht', 'Lange drücken: Nicht interessiert', 'hot'], ['neu', 'Inhaltspräferenzen: Feed aktualisieren'], ['act', 'Der Feed startet frisch', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i2steuer = (ev, t, lt, sc) => ev.act !== undefined ? BIG() : ev.neu !== undefined ? i1stamp(ev.neu, D6(sc, 2), t).m : BIG();

// ---------- Schluss ----------
WORLD.i2outro = function (sc, ev, t) { return W(net6(t) + vid2(740, 1010, 1, -8 + 3 * Math.sin(t * 2), 4) + vid2(840, 1030, 1, 8 + 3 * Math.sin(t * 2 + 1), 1) + heart2(790, 900, 1.3 * (1 + .08 * Math.sin(t * 7)), '#FF4D6D') + topShade()); };
