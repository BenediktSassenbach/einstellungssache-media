// Chemie C002 "Warum wird eine Avocado braun?" (Bauplan wie C001). Etikett im festen Platz (y=600), Grafik y=700 bis 1130.

// ---------- Helfer ----------
const AVO_P = 'M0 -150 C 60 -150, 70 -60, 95 10 C 125 95, 70 160, 0 160 C -70 160, -125 95, -95 10 C -70 -60, -60 -150, 0 -150 Z';
const avoCol = k => lc('#D9E87A', '#7A5230', cl(k));
// Avocado-Haelfte: Schale, Fruchtfleisch (wird mit k braun), Kern
function avo(cx, cy, s, k, rot) { return '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + (rot || 0) + ') scale(' + s + ')"><path d="' + AVO_P + '" fill="#2F5A2A" stroke="#1B3A1A" stroke-width="8"/><path transform="scale(.86)" d="' + AVO_P + '" fill="' + avoCol(k) + '"/><path transform="scale(.86)" d="' + AVO_P + '" fill="none" stroke="' + lc('#9CC455', '#5E3F22', cl(k)) + '" stroke-width="10" opacity=".6"/><circle cx="0" cy="62" r="50" fill="#8A5A2B" stroke="#5E3A18" stroke-width="6"/><ellipse cx="-16" cy="44" rx="14" ry="9" fill="#B07A45" opacity=".8"/></g>'; }
// Enzym: kleiner Vielfrass mit Maul
function enz(x, y, r, ang, open, col) { const a = (10 + 28 * open) * Math.PI / 180;
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + ang + ')"><path d="M0 0 L' + (r * Math.cos(a)) + ' ' + (-r * Math.sin(a)) + ' A' + r + ' ' + r + ' 0 1 0 ' + (r * Math.cos(a)) + ' ' + (r * Math.sin(a)) + ' Z" fill="' + (col || '#FF9A3B') + '" stroke="#0B1020" stroke-width="4" stroke-linejoin="round"/><circle cx="' + (-r * .1) + '" cy="' + (-r * .5) + '" r="' + (r * .16) + '" fill="#0B1020"/></g>'; }
function hexa(x, y, r, col, rot) { let d = ''; for (let i = 0; i < 6; i++) { const a = (i * 60 + (rot || 0)) * Math.PI / 180; d += (i ? 'L' : 'M') + (x + r * Math.cos(a)).toFixed(1) + ' ' + (y + r * Math.sin(a)).toFixed(1); }
  return '<path d="' + d + ' Z" fill="' + col + '" stroke="#0B1020" stroke-width="4" stroke-linejoin="round"/>'; }
function knife(x, y, rot) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ')"><rect x="-13" y="-250" width="26" height="100" rx="12" fill="#3A2A20" stroke="#0B1020" stroke-width="4"/><path d="M-16 -150 L16 -150 L16 -30 Q10 0 -16 0 Z" fill="#E6ECF5" stroke="#8A93A8" stroke-width="4" stroke-linejoin="round"/><path d="M-8 -140 L-8 -20" stroke="#fff" stroke-width="4" opacity=".7"/></g>'; }
const CELL = { x0: 60, x1: 690, y0: 730, y1: 1100, mid: 375 };
const C2E = [[135, 800], [265, 870], [150, 970], [290, 1030], [215, 920]];           // Enzyme links
const C2P = [[455, 790], [570, 840], [625, 945], [495, 915], [545, 1035], [440, 1015], [640, 1040]]; // Polyphenole rechts
function cellBox(k, br) { const c = CELL; return '<rect x="' + c.x0 + '" y="' + c.y0 + '" width="' + (c.x1 - c.x0) + '" height="' + (c.y1 - c.y0) + '" rx="60" fill="' + lc('#1E4A2A', '#4A3320', cl(br || 0)) + '" stroke="' + lc('#8BD450', '#B07A45', cl(br || 0)) + '" stroke-width="10" opacity="' + k + '"/>'; }
function wall(k, brk, t) { if (k <= 0) return ''; const c = CELL; let s = '';
  for (let i = 0; i < 9; i++) { const y = c.y0 + 22 + i * (c.y1 - c.y0 - 44) / 9, hh = (c.y1 - c.y0 - 44) / 9 - 6; if (i / 9 > k) break;
    const f = brk === undefined ? 0 : cl((brk - .15 - i * .04) / .6), dx = (i % 2 ? 1 : -1) * 90 * f * (0.6 + rnd(i + 4)), dy = 200 * f * f, ro = (i % 2 ? 1 : -1) * 120 * f;
    s += '<rect transform="translate(' + (c.mid + dx) + ' ' + (y + hh / 2 + dy) + ') rotate(' + ro + ')" x="-9" y="' + (-hh / 2) + '" width="18" height="' + hh + '" rx="8" fill="#C8F08A" opacity="' + (1 - f) + '"/>'; }
  return s; }
function c2chase(q, t) { const L = (a, b, k) => a + (b - a) * cl(k), run = 16 * Math.abs(Math.sin(t * 16));
  if (q < .9) { const k = ease(cl((q - .3) / .6)); return { e: [L(640, 760, k), L(1010, 1050, k), 0, 1], m: { f: [822 + 14 * k, 1100 - 60 * Math.sin(Math.PI * cl((q - .4) / .4))], s: .8, r: -10 * k, flip: true } }; }
  if (q < 1.3) { const k = (q - .9) / .4, ke = cl((q - 1.0) / .5); return { e: [L(760, 930, ke), L(1050, 1400, ke), 90, 1], m: { f: [L(836, 930, k), L(1100, 1537, k)], s: L(.8, .7, Math.sin(Math.PI * k)), r: 8 * Math.sin(t * 16), flip: true } }; }
  if (q < 3.0) { const k = (q - 1.3) / 1.7, ke = cl((q - 1.5) / 1.5); return { e: [L(930, 470, ke), L(1400, 1470, cl(ke * 3)), 180, 1], m: { f: [L(930, 210, k), 1537 - run], s: L(.8, 1, cl(k * 3)), r: -8 + 6 * Math.sin(t * 16), flip: true } }; }
  if (q < 3.9) { const k = (q - 3.0) / .9; return { e: [L(470, 1000, ease(k)), 1470, 0, 1 - cl((k - .7) / .3)], m: { f: [215, 1537], s: 1, r: 5 * Math.sin(t * 22) * (1 - k) } }; }
  return { e: null, m: { f: [220, 1537], s: 1 } }; }
const green = (t) => kitchen(t, '#07140A', '#16381E', '#8BD450');

// ---------- Einstieg: Messer schneidet, Avocado wird blitzschnell braun und spritzt Schalti an ----------
WORLD.h7c2 = function (sc, ev, t, lt) {
  const e = ev.platsch, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e, t), CX = 560, CY = 900;
  let s = stage7(t, lt, '#07140A', e === undefined ? '#8BD450' : '#B07A45', CX, CY), o = '';
  const br = e === undefined ? .12 * k : cl(.12 + e / .2), wob = e === undefined ? 0 : 6 * Math.sin(t * 40) * (1 - cl(e / .6));
  o += avo(CX + wob, CY, 1.35, br, -6);
  if (e === undefined) { const kk = ease(cl((k - .25) / .6)); o += knife(lerp(960, 760, kk), lerp(700, 860, kk), 28 - 10 * Math.sin(t * 5) * kk); }
  else { // braune Spritzer fliegen Richtung Schalti
    for (let i = 0; i < 16; i++) { const c = cl((e - .12 - rnd(i + 3) * .12) / .45); if (c <= 0) continue; const tx = 180 + 240 * rnd(i + 20), ty = 1250 + 260 * rnd(i + 40), x = lerp(CX, tx, c), y = lerp(CY, ty, c) - 180 * Math.sin(Math.PI * c);
      o += '<circle cx="' + x + '" cy="' + y + '" r="' + ((14 + 20 * rnd(i)) * (c < 1 ? 1 : 1.3)) + '" fill="#7A5230" stroke="#4A3018" stroke-width="4" opacity="' + (1 - cl((e - 1.8) / .5)) + '"/>'; } }
  s += pop7(CX, CY, lt, o) + sweat7(t, e === undefined ? k : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7c2 = (ev, t, lt, sc) => { const e = ev.platsch, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined && e > .45) { const b = cl((e - .45) / .3); return { f: [220 - 30 * b, 1537], s: 1, r: -10 * b + 4 * Math.sin(t * 20) * (1 - cl((e - 1.2) / 1)), fx: 'sepia(1) saturate(1.6) brightness(.62)' }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 14) };
};

// ---------- Teil 1: Enzym und Polyphenole wohnen getrennt ----------
WORLD.c2zelle = function (sc, ev, t, lt) {
  let s = green(t), h = '';
  const st = ev.stoffe, zk = st === undefined ? 0 : ease(cl(st / .6));
  // Avocado: erst gross in der Mitte, wandert dann klein nach rechts oben (Lupe)
  s += avo(lerp(480, 815, zk), lerp(915, 800, zk), lerp(1.2, .5, zk), 0, 0);
  if (st !== undefined) {
    s += '<path d="M' + (CELL.x1 - 20) + ' ' + (CELL.y0 + 40) + ' L770 790" stroke="#C8F08A" stroke-width="6" stroke-dasharray="10 10" opacity="' + zk + '"/>';
    s += cellBox(zk, 0) + wall(ev.wand === undefined ? 0 : cl(ev.wand / .7), undefined, t);
    C2E.forEach((p, i) => { const k = back(cl((st - .3 - i * .08) / .4)); if (k > 0) s += enz(p[0] + 8 * Math.sin(t * 2 + i), p[1] + 8 * Math.cos(t * 1.7 + i), 40 * k, 20 * Math.sin(t * 1.5 + i), .5 + .5 * Math.sin(t * 6 + i)); });
    C2P.forEach((p, i) => { const k = back(cl((st - .9 - i * .07) / .4)); if (k > 0) s += hexa(p[0] + 6 * Math.sin(t * 1.8 + i * 2), p[1] + 6 * Math.cos(t * 2.1 + i), 30 * k, '#C8F08A', t * 20 + i * 15); });
    if (st > .5) s += svgT(215, 1150, 'Enzym', 38, '#FFB56B') + (st > 1.2 ? svgT(535, 1150, 'Polyphenole', 38, '#C8F08A') : '');
    if (ev.act !== undefined) { const g = cl(ev.act / .4); s += '<rect x="' + CELL.x0 + '" y="' + CELL.y0 + '" width="' + (CELL.x1 - CELL.x0) + '" height="' + (CELL.y1 - CELL.y0) + '" rx="60" fill="none" stroke="#C8F08A" stroke-width="' + (10 + 10 * Math.abs(Math.sin(t * 5))) + '" opacity="' + (.6 * g) + '"/>'; }
  }
  h += slot(ev, [['panel', 'Zwei Stoffe in jeder Zelle'], ['stoffe', 'Enzym und Polyphenole', 'hot'], ['wand', 'Getrennt durch eine Wand'], ['act', 'Nichts reagiert: bleibt grün', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.c2zelle = () => BIG();

// ---------- Teil 2: Messer zerstoert die Zelle, Enzym + Polyphenole + Sauerstoff = braun ----------
WORLD.c2schnitt = function (sc, ev, t, lt) {
  let s = green(t), h = '';
  const m = ev.messer, tr = ev.treffen === undefined ? 0 : ease(cl(ev.treffen / 1.2)), br = ev.braun === undefined ? 0 : cl(ev.braun / 2), ap = ev.act;
  s += cellBox(1, br * .9);
  if (m !== undefined && m > .3) s += '<rect x="' + (CELL.mid - 60) + '" y="' + (CELL.y0 - 12) + '" width="120" height="24" fill="#07140A"/>'; // Loch oben: Luft kommt rein
  s += wall(1, m === undefined ? undefined : m, t);
  C2E.forEach((p, i) => { const q = C2P[i], x = lerp(p[0], q[0] - 62, tr) + 8 * Math.sin(t * 2 + i), y = lerp(p[1], q[1], tr) + 8 * Math.cos(t * 1.7 + i); s += enz(x, y, 40, tr > 0 ? 0 : 20 * Math.sin(t * 1.5 + i), .5 + .5 * Math.sin(t * (tr > 0 ? 14 : 6) + i)); });
  C2P.forEach((p, i) => { const b = cl((br * 7 - i) / 1.2); s += hexa(p[0] + 6 * Math.sin(t * 1.8 + i * 2), p[1] + 6 * Math.cos(t * 2.1 + i), 30, lc('#C8F08A', '#7A5230', b), t * 20 * (1 - b) + i * 15); });
  if (br > .3) for (let i = 0; i < C2P.length - 1; i++) { const b = cl((br * 7 - i - 1) / 1.2); if (b > 0) s += '<line x1="' + C2P[i][0] + '" y1="' + C2P[i][1] + '" x2="' + C2P[i + 1][0] + '" y2="' + C2P[i + 1][1] + '" stroke="#7A5230" stroke-width="12" stroke-linecap="round" opacity="' + (.8 * b) + '"/>'; }
  if (ev.treffen !== undefined && ap === undefined) { const c = c2chase(ev.treffen, t).e; if (c) s += '<g opacity="' + c[3] + '">' + enz(c[0], c[1], 54, c[2], .5 + .5 * Math.sin(t * 24), '#FF7A2B') + '</g>'; }
  if (ev.o2 !== undefined && ap === undefined) for (let i = 0; i < 7; i++) { const c = cl((ev.o2 - i * .15) / 1.1); if (c <= 0) continue; const tx = 130 + i * 80, ty = 800 + 230 * rnd(i + 5); s += o2(lerp(CELL.mid, tx, ease(c)) + 10 * Math.sin(t * 3 + i), lerp(690, ty, ease(c)) + 10 * Math.cos(t * 2 + i), t * 80 + i * 50); }
  if (m !== undefined && m < 1.3) { const d = ease(cl(m / .35)), up = cl((m - .8) / .5); s += knife(CELL.mid, lerp(700, CELL.y1 + 20, d) - 420 * up, 0); }
  if (ap !== undefined) { const k = cl(ap / .3), g = back(k), b2 = cl((ap - .3) / 1.2);
    s += '<rect width="1080" height="1920" fill="#07140A" opacity="' + (.88 * k) + '"/><g opacity="' + k + '">';
    s += '<g transform="translate(300 930) scale(' + g + ')"><path d="M0 -130 C 90 -170, 170 -80, 150 30 C 135 120, 60 160, 0 140 C -60 160, -135 120, -150 30 C -170 -80, -90 -170, 0 -130 Z" fill="#D8352A" stroke="#8A1A14" stroke-width="8"/><path transform="scale(.82) translate(0 6)" d="M0 -130 C 90 -170, 170 -80, 150 30 C 135 120, 60 160, 0 140 C -60 160, -135 120, -150 30 C -170 -80, -90 -170, 0 -130 Z" fill="' + lc('#FFF3C4', '#A8743C', b2) + '"/><ellipse cx="-14" cy="10" rx="8" ry="14" fill="#3A2A20"/><ellipse cx="14" cy="10" rx="8" ry="14" fill="#3A2A20"/><path d="M0 -128 Q10 -170 30 -180" stroke="#5E3A18" stroke-width="10" fill="none" stroke-linecap="round"/></g>';
    s += avo(660, 920, 1.05 * g, b2, 0) + svgT(300, 1125, 'Apfel', 44, '#fff') + svgT(660, 1125, 'Avocado', 44, '#fff') + svgT(480, 940, '=', 90, '#C8F08A') + '</g>'; }
  h += slot(ev, [['messer', 'Schnitt: Zellen kaputt', 'red'], ['treffen', 'Enzym trifft Polyphenole'], ['o2', '+ Sauerstoff aus der Luft', 'hot'], ['braun', 'Braune Farbstoffe entstehen', 'red'], ['act', 'Gleiche Reaktion wie beim Apfel']]);
  return W(s + topShade(), h);
};
WMASC.c2schnitt = (ev, t) => {
  if (ev.act !== undefined) return BIG();
  if (ev.treffen !== undefined) return c2chase(ev.treffen, t).m;
  if (ev.messer !== undefined) return { f: [822, 1100], s: .8, r: ev.messer < .6 ? -8 : 3 * Math.sin(t * 6), flip: true };
  return BIG();
};

// ---------- Teil 3: Zitrone (Saeure hemmt Enzym) und luftdicht abdecken ----------
WORLD.c2gruen = function (sc, ev, t, lt) {
  let s = green(t), h = '';
  const z = ev.zitrone, f = ev.folie, a = ev.act, CX = 500, CY = 915;
  // Braeunung laeuft, bis die Zitrone kommt, danach nur noch ganz langsam
  const tz = z === undefined ? lt : lt - z, br = z === undefined ? cl(lt / 6) * .4 : Math.min(.4, cl((lt - z) / 6) * .4 + 0) + .04 * cl(z / 8);
  const b0 = z === undefined ? cl(lt / 6) * .42 : cl((lt - z) / 6) * .42, brown = z === undefined ? b0 : b0 + (a === undefined ? 0 : .08 * cl(a / 3));
  s += avo(CX, CY, 1.3, brown, 0);
  // Enzyme sitzen auf dem Fruchtfleisch, schlafen nach der Zitrone ein
  const sl = z === undefined ? 0 : cl((z - .9) / .6);
  [[-70, -60], [60, -90], [-40, 10], [70, -10], [10, -140]].forEach((p, i) => { const x = CX + p[0] * 1.3, y = CY + p[1] * 1.3; s += enz(x + (1 - sl) * 6 * Math.sin(t * 3 + i), y, 26, (1 - sl) * 20 * Math.sin(t * 2 + i), (1 - sl) * (.5 + .5 * Math.sin(t * 10 + i)), lc('#FF9A3B', '#8A93A8', sl));
    if (sl > .5) s += svgT(x + 22, y - 26 - 10 * ((t * .8 + i * .3) % 1), 'z', 30, '#C9CFDD'); });
  if (z !== undefined && f === undefined) { const k = back(cl(z / .4)), sq = .9 + .1 * Math.sin(t * 10);
    s += '<g transform="translate(668 770) rotate(' + (150 + 6 * Math.sin(t * 8)) + ') scale(' + k + ' ' + (k * sq) + ')"><path d="M-70 0 A70 70 0 0 1 70 0 Z" fill="#FFE14D" stroke="#C9A000" stroke-width="8" stroke-linejoin="round"/><path d="M-54 -4 A54 54 0 0 1 54 -4 Z" fill="#FFF3A0"/><path d="M0 -4 L0 -56 M0 -4 L-38 -42 M0 -4 L38 -42" stroke="#FFE14D" stroke-width="5"/></g>';
    if (z > 1.2 && z < 1.5) { const c = (z - 1.2) / .3; s += drop(lerp(680, 790, c), lerp(790, 800, c) - 50 * Math.sin(Math.PI * c), 1.1, '#FFE14D'); }
    for (let i = 0; i < 4; i++) { const c = (t * 1.2 + i / 4) % 1; s += drop(660 - 100 * c - i * 12, 800 + 120 * c, .9, '#FFE14D'); } }
  if (f !== undefined) { const k = ease(cl(f / .8));
    s += '<g transform="translate(' + CX + ' ' + CY + ') scale(1.3)"><path transform="scale(1.1)" d="' + AVO_P + '" fill="rgba(190,235,255,.16)" stroke="#D8F2FF" stroke-width="5" stroke-dasharray="' + (1100 * k) + ' 1100"/><path d="M-60 -90 Q-30 -120 0 -124" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (.8 * k) + '"/></g>';
    if (a === undefined) for (let i = 0; i < 7; i++) { const an = -Math.PI * (.05 + .9 * (i + .5) / 7), ph = (t * .45 + rnd(i + 2)) % 1, tri = ph < .5 ? ph * 2 : 2 - ph * 2, r = lerp(400, 250, tri), x = CX + r * Math.cos(an) * 1.0, y = CY + 40 + r * Math.sin(an) * .78; if (y < 700 || x > 930) continue; s += '<g opacity="' + k + '">' + o2(x, y, t * 90 + i * 40) + '</g>'; } }
  if (a !== undefined) { const k = back(cl(a / .4)), ang = a * 25;
    s += '<g transform="translate(800 880) scale(' + k + ')"><circle r="92" fill="#F4F6FB" stroke="#0B1020" stroke-width="10"/><line x1="0" y1="0" x2="' + (60 * Math.sin(ang * Math.PI / 180)) + '" y2="' + (-60 * Math.cos(ang * Math.PI / 180)) + '" stroke="#0B1020" stroke-width="10" stroke-linecap="round"/><line x1="0" y1="0" x2="34" y2="20" stroke="#FF5A5A" stroke-width="8" stroke-linecap="round"/><circle r="9" fill="#0B1020"/></g>'; }
  h += slot(ev, [['panel', 'Reaktion bremsen'], ['zitrone', 'Säure hemmt das Enzym', 'hot'], ['folie', 'Luftdicht: kein Sauerstoff'], ['act', 'Langsamer, aber nicht gestoppt', 'red']]);
  return W(s + topShade(), h);
};
WMASC.c2gruen = (ev, t) => {
  if (ev.act !== undefined) return BIG();
  if (ev.folie !== undefined) { const k = ease(cl(ev.folie / .8)); return { f: [lerp(870, 770, k), 1100], s: .7, r: -8 * Math.sin(Math.PI * k), flip: true }; }
  if (ev.zitrone !== undefined && ev.zitrone > 1.5) { const q = ev.zitrone - 1.5, w = 1 - cl((q - 1.2) / .5), st = Math.min(q, 1.4); return { f: [800 + 70 * cl(q / .3) + 16 * Math.sin(t * 20) * w, 900 + 200 * cl(q / .3) * 1.0 - 80 * Math.sin(Math.PI * cl(q / .3))], s: .7, r: 16 * Math.sin(t * 20) * w, flip: true }; }
  if (ev.zitrone !== undefined) { const k = ease(cl(ev.zitrone / .4)); return { f: [lerp(220, 800, k), lerp(1537, 900, k) - 200 * Math.sin(Math.PI * k)], s: lerp(1, .7, k), r: k < 1 ? 0 : -6 + 5 * Math.sin(t * 10), flip: k > .5 }; }
  return BIG();
};

// ---------- Schluss ----------
WORLD.c2outro = function (sc, ev, t) { return W(green(t) + avo(660, 1010, .95, 0, 8) + '<g transform="translate(800 880) rotate(160)"><path d="M-50 0 A50 50 0 0 1 50 0 Z" fill="#FFE14D" stroke="#C9A000" stroke-width="7" stroke-linejoin="round"/><path d="M-38 -3 A38 38 0 0 1 38 -3 Z" fill="#FFF3A0"/></g>' + topShade()); };
