// Physik v4: P002 "Warum wird dein Handy beim Laden warm?" komplett neu, Vollbild-Welten im Stil von P005.
// Regeln: genau EIN Etikett gleichzeitig im festen Etiketten-Platz (links, y=600), Grafik zwischen y=700 und y=1130,
// Untertitel 1150 bis 1300, Sprechblase ab 1340 links. Schalti steht nie auf Schrift.

// ---------- gemeinsame Helfer fuer P002 bis P004 (v4) ----------
// Etikett im festen Platz: nimmt das zuletzt eingetretene Ereignis aus der Liste [[ev, Text, Klasse], ...]
function slot(ev, list, y) {
  let best = null; for (const it of list) { const e = ev[it[0]]; if (e !== undefined && (best === null || e < best[0])) best = [e, it]; }
  if (!best) return ''; const it = best[1]; return wlab(60, y || 600, it[1], cl(best[0] / .35), it[2] || '', it[3] || 42);
}
function bgRad(c0, c1, cy) { return '<defs><radialGradient id="bgr" cx=".5" cy="' + (cy || .5) + '" r=".8"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c0 + '"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#bgr)"/>'; }
function dust(t, col, n, op) { let s = ''; for (let i = 0; i < (n || 30); i++) { const x = rnd(i + 900) * 1080, sp = 15 + rnd(i + 950) * 40, y = 1920 - ((t * sp + rnd(i + 990) * 1920) % 1920); s += '<circle cx="' + (x + 18 * Math.sin(t + i)) + '" cy="' + y + '" r="' + (3 + rnd(i + 20) * 7) + '" fill="' + col + '" opacity="' + ((op || .2) * (.5 + .5 * rnd(i + 40))) + '"/>'; } return s; }
function heatW(x0, x1, y, t, k, n, col) { if (k <= 0) return ''; let s = ''; n = n || 5; for (let i = 0; i < n; i++) { const c = (t * .8 + rnd(i + 3)) % 1, x = x0 + (x1 - x0) * (i + .5) / n; s += '<path d="M' + x + ' ' + (y - c * 70) + ' q 14 -18 0 -36 q -14 -18 0 -36" fill="none" stroke="' + (col || '#FF9A50') + '" stroke-width="7" stroke-linecap="round" opacity="' + (k * (1 - c)) + '"/>'; } return s; }
function thermo(x, y, h, k, col) { const lv = h * (.15 + .8 * cl(k)); return '<rect x="' + (x - 22) + '" y="' + y + '" width="44" height="' + h + '" rx="22" fill="#fff"/><rect x="' + (x - 12) + '" y="' + (y + h - lv) + '" width="24" height="' + lv + '" rx="12" fill="' + col + '"/><circle cx="' + x + '" cy="' + (y + h + 20) + '" r="38" fill="' + col + '" stroke="#fff" stroke-width="8"/>'; }
function bolt(x, y, s, col, op) { return '<path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M8 -40 L-18 6 H2 L-8 40 L20 -8 H0 Z" fill="' + (col || '#FFE14D') + '" opacity="' + (op === undefined ? 1 : op) + '"/>'; }
function phoneF(x, y, w, h, fill, extra) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (w * .16) + '" fill="#0B1020" stroke="#F4F6FB" stroke-width="9"/><rect x="' + (x + 14) + '" y="' + (y + 14) + '" width="' + (w - 28) + '" height="' + (h - 28) + '" rx="' + (w * .12) + '" fill="' + (fill || '#1B2748') + '"/>' + (extra || ''); }
function batt(x, y, w, h, lv, col) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h * .2) + '" fill="#0B1020" stroke="#fff" stroke-width="6"/><rect x="' + (x + w) + '" y="' + (y + h * .3) + '" width="' + (h * .18) + '" height="' + (h * .4) + '" rx="4" fill="#fff"/><rect x="' + (x + 7) + '" y="' + (y + 7) + '" width="' + Math.max(0, (w - 14) * cl(lv)) + '" height="' + (h - 14) + '" rx="' + (h * .12) + '" fill="' + (col || '#2ECC71') + '"/>'; }
function svgT(x, y, txt, size, col, anchor) { return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" font-size="' + size + '" font-weight="900" fill="' + (col || '#fff') + '" font-family="Inter Display">' + txt + '</text>'; }
const heatCol = k => k < .5 ? lc('#3B8BFF', '#FFD93B', k * 2) : lc('#FFD93B', '#FF3B2A', (k - .5) * 2);

// ---------- P002 Einstieg: Handy im Waermebild ----------
WORLD.p2hook = function (sc, ev, t, lt) {
  const k = cl(lt / 6.5), hc = heatCol(k); let s = bgRad('#12070A', '#3A1216', .55) + dust(t, '#FF7A50', 26, .18);
  const X = 405, Y = 715, Wd = 270, H = 390;
  s += '<circle cx="' + (X + Wd / 2) + '" cy="' + (Y + H / 2) + '" r="' + (230 + 20 * Math.sin(t * 3)) + '" fill="' + hc + '" opacity="' + (.12 + .25 * k) + '"/>';
  s += '<defs><radialGradient id="th2" cx=".5" cy=".62" r=".7"><stop offset="0" stop-color="' + heatCol(Math.min(1, k + .25)) + '"/><stop offset=".55" stop-color="' + hc + '"/><stop offset="1" stop-color="' + heatCol(Math.max(0, k - .35)) + '"/></radialGradient></defs>';
  s += phoneF(X, Y, Wd, H, 'url(#th2)');
  const sy = Y + 20 + ((t * 260) % (H - 40)); s += '<rect x="' + (X + 14) + '" y="' + sy + '" width="' + (Wd - 28) + '" height="6" fill="#fff" opacity=".55"/>';
  s += batt(X + 85, Y + 130, 100, 52, .25 + .5 * k) + bolt(X + 135, Y + 230, 1, '#FFE14D', .6 + .4 * Math.sin(t * 6));
  // Kabel mit Elektronen
  s += '<path d="M' + (X + Wd / 2) + ' ' + (Y + H) + ' C ' + (X + Wd / 2) + ' 1240, 330 1220, 300 1400" stroke="#F4F6FB" stroke-width="16" fill="none"/>';
  for (let i = 0; i < 6; i++) { const c = (t * .9 + i / 6) % 1, px = lerp(300, X + Wd / 2, c), py = lerp(1400, Y + H, c) - 60 * Math.sin(Math.PI * c); s += '<circle cx="' + px + '" cy="' + py + '" r="8" fill="#FFE14D"/>'; }
  s += heatW(X - 30, X + Wd + 30, Y - 6, t, k * .9, 5) + thermo(800, 760, 280, k, hc);
  if (ev.gefahr !== undefined) { const a = cl(ev.gefahr / .3), b = .6 + .4 * Math.abs(Math.sin(t * 6)); s += '<g transform="translate(' + (X + Wd / 2) + ' ' + (Y + 330) + ') scale(' + (back(a) * 1.1) + ')" opacity="' + b + '"><path d="M0 -70 L70 50 H-70 Z" fill="#FFCC00" stroke="#0B1020" stroke-width="8" stroke-linejoin="round"/><rect x="-7" y="-30" width="14" height="46" rx="6" fill="#0B1020"/><circle cx="0" cy="32" r="8" fill="#0B1020"/></g>'; }
  if (ev.mark !== undefined && ev.mark > .5 && ev.mark < 1.6) { const c = (ev.mark - .5) / 1.1; for (let i = 0; i < 3; i++) s += '<circle cx="' + (360 - 30 * i) + '" cy="' + (1000 - 120 * c - 25 * i) + '" r="' + (22 + 26 * c) + '" fill="#fff" opacity="' + (.6 * (1 - c)) + '"/>'; }
  return W(s + topShade());
};
WMASC.p2hook = (ev, t) => { const m = ev.mark;
  if (ev.gefahr !== undefined) return { f: [250, 1130], s: .5, r: 5 * Math.sin(t * 14) };
  if (m !== undefined && m < 1.6) { const k = m < .5 ? ease(m / .5) : 1 - ease((m - .5) / .6); return { f: go([230, 1130], [330, 1130], k), s: .5, r: m > .5 && m < 1.1 ? -18 : 0, walk: m < .5 }; }
  return { f: [230, 1130], s: .5 };
};

// ---------- P002 Teil 1: Elektronen rempeln im Kupfer ----------
WORLD.p2draht = function (sc, ev, t, lt) {
  const heat = ev.act !== undefined ? 1 : ev.p2 !== undefined ? .35 + .4 * cl(ev.p2 / 3) : ev.p1 !== undefined ? .2 : 0;
  let s = bgRad('#140A06', '#3A1E12', .55) + dust(t, '#FF9A50', 24, .15), h = '';
  const cmp = ev.p3 !== undefined && ev.act === undefined;
  if (!cmp) {
    const Y0 = 770, Y1 = 1070, on = ease(cl(lt / .8));
    s += '<rect x="-40" y="' + (Y0 - 24) + '" width="1160" height="' + (Y1 - Y0 + 48) + '" rx="60" fill="#26335E" stroke="#56618A" stroke-width="6" opacity="' + on + '"/>';
    s += '<rect x="-40" y="' + Y0 + '" width="1160" height="' + (Y1 - Y0) + '" fill="' + lc('#7A4220', '#B8321E', heat) + '" opacity="' + on + '"/>';
    if (heat > .3) s += '<rect x="-40" y="' + Y0 + '" width="1160" height="' + (Y1 - Y0) + '" fill="#FF5A2A" opacity="' + (.25 * (heat - .3) * Math.abs(Math.sin(t * 4))) + '"/>';
    const amp = 2 + 14 * heat, atoms = [];
    for (let r = 0; r < 3; r++) for (let i = 0; i < 10; i++) { const ax = 70 + i * 110 + (r % 2) * 55, ay = Y0 + 50 + r * 100; atoms.push([ax + amp * Math.sin(t * 23 + i * 1.7 + r), ay + amp * Math.cos(t * 19 + i * 2.3 + r * 1.1)]); }
    for (const a of atoms) s += '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="26" fill="' + lc('#E7A15A', '#FF7A3A', heat) + '" stroke="#5A2A10" stroke-width="4" opacity="' + on + '"/>';
    const flow = ev.panel !== undefined ? cl(ev.panel / .6) : 0, sp = ev.act !== undefined ? 260 : 170;
    for (let i = 0; i < 34; i++) { const x = ((rnd(i + 70) * 1160 + t * sp * (.8 + .4 * rnd(i))) % 1160) - 40, y = Y0 + 25 + rnd(i + 90) * (Y1 - Y0 - 50) + 14 * Math.sin(t * 5 + i);
      s += '<circle cx="' + x + '" cy="' + y + '" r="9" fill="#FFE14D" opacity="' + flow + '"/>';
      if (ev.p1 !== undefined) for (const a of atoms) { const d = Math.hypot(a[0] - x, a[1] - y); if (d < 34) s += '<g transform="translate(' + x + ' ' + y + ') rotate(' + (t * 300 % 360) + ')"><path d="M0 -26 L6 -6 L26 0 L6 6 L0 26 L-6 6 L-26 0 L-6 -6 Z" fill="#fff"/></g>'; } }
    s += heatW(400, 940, Y0 - 34, t, heat > .3 ? heat : 0, 6, '#FF9A50');
    if (ev.act !== undefined) { const k = ease(cl(ev.act / .8)); s += '<rect x="0" y="' + Y0 + '" width="1080" height="' + (Y1 - Y0) + '" fill="#FF3B2A" opacity="' + (.18 * k) + '"/>'; }
  } else { // Vergleich: doppelter Strom, vierfache Waerme
    const k = ev.p3, cols = [[150, 1, '1× Strom'], [600, 2, '2× Strom']];
    cols.forEach((c, ci) => { const x = c[0], n = c[1];
      s += svgT(x + 160, 730, c[2], 46, '#fff');
      s += '<rect x="' + x + '" y="760" width="320" height="70" rx="35" fill="#7A4220" stroke="#56618A" stroke-width="5"/>';
      for (let i = 0; i < 5 * n; i++) { const xx = x + 20 + ((rnd(i + ci * 40) * 280 + t * 110 * n) % 280); s += '<circle cx="' + xx + '" cy="' + (782 + rnd(i + 7) * 26) + '" r="8" fill="#FFE14D"/>'; }
      const want = n * n, shown = Math.min(want, Math.floor(cl((k - .5) / 2.2) * want + (k > .5 ? 1 : 0)));
      for (let b = 0; b < shown; b++) { const yb = 1110 - (b + 1) * 58, pk = cl((k - .5 - b * .55) / .3); s += '<rect x="' + (x + 40) + '" y="' + (yb + 30 * (1 - ease(pk))) + '" width="240" height="50" rx="12" fill="' + lc('#FF9A50', '#FF3B2A', b / 3) + '" opacity="' + pk + '"/>'; }
      if (shown > 0) s += svgT(x + 160, 1110 - shown * 58 + 38, '×' + shown + ' Wärme', 30, '#0B1020') + heatW(x + 40, x + 280, 1110 - shown * 58 - 12, t, 1, 3, '#FF9A50');
    });
  }
  h += slot(ev, [['panel', 'Strom = wandernde Elektronen'], ['p1', 'Rempler gegen Atome'], ['p2', 'Zittern = Wärme', 'hot'], ['p3', 'Doppelt Strom = 4× Wärme', 'red'], ['act', 'Viel Strom = viel Wärme', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.p2draht = (ev, t, lt) => {
  if (ev.p3 !== undefined && ev.act === undefined) return { f: [905, 1110], s: .36, r: 6 * Math.sin(t * 3) };
  if (ev.act !== undefined) return { f: [700 + 6 * Math.sin(t * 20), 746], s: .38, r: 8 * Math.sin(t * 16) };
  if (ev.p2 !== undefined) return { f: [600 + 6 * Math.sin(t * 30), 746], s: .38, r: 6 * Math.sin(t * 24) };
  if (ev.p1 !== undefined) { const k = ease(cl(ev.p1 / 3)); return { f: [lerp(240, 600, k), 746], s: .38, walk: k < 1, r: Math.sin(t * 7) > .7 ? -14 : 0 }; }
  return { f: [240, 746], s: .38 };
};

// ---------- P002 Teil 2: Stau im Akku ----------
WORLD.p2akku = function (sc, ev, t, lt) {
  let s = bgRad('#07140F', '#0F3A2A', .55) + dust(t, '#2ECC71', 24, .15), h = '';
  const bars = ev.act !== undefined;
  if (!bars) {
    const warm = ev.p2 === undefined ? 0 : cl(ev.p2 / 2), on = ease(cl(lt / .7));
    s += '<rect x="90" y="720" width="800" height="390" rx="40" fill="#0D2A20" stroke="' + lc('#2ECC71', '#FF7A30', warm) + '" stroke-width="10" opacity="' + on + '"/><rect x="890" y="860" width="34" height="110" rx="10" fill="' + lc('#2ECC71', '#FF7A30', warm) + '"/>';
    if (warm) s += '<rect x="100" y="730" width="780" height="370" rx="32" fill="#FF5A2A" opacity="' + (.12 * warm * (.6 + .4 * Math.sin(t * 5))) + '"/>';
    for (let i = 0; i < 6; i++) s += '<rect x="130" y="' + (770 + i * 52) + '" width="210" height="26" rx="8" fill="#4A5A7A"/>';
    for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) s += '<circle cx="' + (680 + c * 52) + '" cy="' + (790 + r * 62) + '" r="14" fill="#8A3B5A"/>';
    for (let i = 0; i < 9; i++) s += '<rect x="488" y="' + (740 + i * 40) + '" width="14" height="24" rx="4" fill="#B8C4E0" opacity=".7"/>';
    const N = 16, P = ev.p1 === undefined ? -1 : ev.p1; let pct = 12;
    for (let i = 0; i < N; i++) { const sx = 680 + (i % 4) * 52, sy = 790 + Math.floor(i / 4) * 62, tx = 160 + (i % 4) * 50, ty = 796 + Math.floor(i / 4) * 52 + (i >= 12 ? 52 : 0);
      let k = P < 0 ? 0 : cl((P - i * .22) / 1.6); if (warm && k > 0 && k < 1) k = cl((P - i * .22) / 2.6);
      const mid = [495, 760 + (i * 23) % 330], x = k < .5 ? lerp(sx, mid[0], ease(k * 2)) : lerp(mid[0], tx, ease((k - .5) * 2)), y = k < .5 ? lerp(sy, mid[1], ease(k * 2)) : lerp(mid[1], ty, ease((k - .5) * 2));
      const jit = warm && k > 0 && k < 1 ? 6 * Math.sin(t * 40 + i) : 0; if (k >= 1) pct += 5;
      s += '<circle cx="' + (x + jit) + '" cy="' + (y - jit) + '" r="17" fill="#3BB8FF" stroke="#fff" stroke-width="4"/><path d="M' + (x + jit - 8) + ' ' + (y - jit) + ' h16 M' + (x + jit) + ' ' + (y - jit - 8) + ' v16" stroke="#fff" stroke-width="4"/>';
      if (warm && Math.abs(x - 495) < 30) s += '<circle cx="495" cy="' + y + '" r="' + (24 + 8 * Math.sin(t * 20 + i)) + '" fill="#FF9A50" opacity=".45"/>'; }
    s += svgT(800, 1086, Math.min(92, pct) + ' %', 34, '#fff');
    s += heatW(150, 850, 712, t, warm, 6, '#FF9A50');
  } else { // Energie: Kabel 100, kabellos rund 150
    const k = ease(cl(ev.act / 1.2)), u = 2.5, base = 1110;
    s += '<line x1="80" y1="' + base + '" x2="920" y2="' + base + '" stroke="#fff" stroke-width="5"/>';
    const bar = (x, top, col, op) => '<rect x="' + x + '" y="' + top + '" width="250" height="' + Math.max(0, base - top) + '" rx="14" fill="' + col + '" opacity="' + (op || 1) + '"/>';
    const g1 = base - 100 * u * k; s += bar(170, g1, '#2ECC71') + svgT(295, base - 40, 'Kabel', 40, '#0B1020');
    if (k > .7) s += svgT(295, g1 + 60, '100', 52, '#0B1020');
    const g2 = base - 100 * u * k, r2 = g2 - 50 * u * cl((ev.act - 1) / 1.2);
    s += bar(560, g2, '#2ECC71') + svgT(685, base - 40, 'Kabellos', 40, '#0B1020');
    if (r2 < g2 - 2) { s += '<rect x="560" y="' + r2 + '" width="250" height="' + (g2 - r2 + 14) + '" rx="14" fill="#FF5A3A"/><rect x="560" y="' + g2 + '" width="250" height="16" fill="#2ECC71"/>'; if (g2 - r2 > 70) s += svgT(685, r2 + 58, '+50', 44, '#fff') + heatW(580, 790, r2 - 10, t, 1, 4, '#FF9A50'); }
    if (k > .7) s += svgT(685, g2 + 60, '100', 52, '#0B1020');
  }
  h += slot(ev, [['panel', 'Akku = Ionen-Stau'], ['p1', 'Lithium-Ionen wandern'], ['p2', 'Gegen Widerstand = Wärme', 'hot'], ['act', 'Kabellos: rund 50 % mehr Energie', 'red']]);
  return W(s + topShade(), h);
};
WMASC.p2akku = (ev, t) => {
  if (ev.act !== undefined) return { f: [895, 1110], s: .38, r: 8 * Math.sin(t * 9) };
  if (ev.p1 !== undefined) { const k = cl(ev.p1 / 1.6), warm = ev.p2 !== undefined; const kk = warm ? cl(ev.p1 / 2.6) : k;
    const x = kk < .5 ? lerp(680, 495, ease(kk * 2)) : lerp(495, 160, ease((kk - .5) * 2)), y = kk < .5 ? lerp(790, 760, ease(kk * 2)) : lerp(760, 796, ease((kk - .5) * 2));
    return { f: [x, y - 16], s: .26, r: warm ? 10 * Math.sin(t * 30) : 0 }; }
  return { f: [680, 774], s: .26 };
};

// ---------- P002 Teil 3: Ab wann gefaehrlich? ----------
WORLD.p2gefahr = function (sc, ev, t, lt) {
  let s = bgRad('#1A0709', '#3A1216', .55) + dust(t, '#FF5A5A', 22, .12), h = '';
  const step = ev.act !== undefined ? 'act' : ev.p1 !== undefined ? 'help' : ev.blaeh !== undefined ? 'blaeh' : 'warm';
  if (step === 'warm') {
    const w = ev.warm === undefined ? 0 : ease(cl(ev.warm / 1.5)), needle = -70 + 40 * Math.sin(t * 2) * (1 - w) + 130 * w;
    s += phoneF(170, 730, 260, 400, '#1B2748');
    const lv = ev.warm === undefined ? .55 + .05 * Math.sin(t) : Math.min(.8, .55 + .25 * cl(ev.warm / 2)); s += batt(225, 830, 130, 64, lv, w > .5 ? '#FFCC00' : '#2ECC71');
    s += svgT(300, 960, Math.round(lv * 100) + ' %', 46, '#fff');
    if (w > .5) s += '<rect x="270" y="1000" width="18" height="56" rx="5" fill="#FFCC00"/><rect x="304" y="1000" width="18" height="56" rx="5" fill="#FFCC00"/>'; else s += bolt(300, 1030, .9);
    const GX = 720, GY = 1010; s += '<path d="M' + (GX - 190) + ' ' + GY + ' A190 190 0 0 1 ' + (GX - 95) + ' ' + (GY - 165) + '" stroke="#2ECC71" stroke-width="34" fill="none"/><path d="M' + (GX - 95) + ' ' + (GY - 165) + ' A190 190 0 0 1 ' + (GX + 95) + ' ' + (GY - 165) + '" stroke="#FFCC00" stroke-width="34" fill="none"/><path d="M' + (GX + 95) + ' ' + (GY - 165) + ' A190 190 0 0 1 ' + (GX + 190) + ' ' + GY + '" stroke="#FF5A5A" stroke-width="34" fill="none"/>';
    s += '<g transform="translate(' + GX + ' ' + GY + ') rotate(' + needle + ')"><path d="M-12 0 L0 -160 L12 0 Z" fill="#fff"/></g><circle cx="' + GX + '" cy="' + GY + '" r="20" fill="#fff"/>';
    s += heatW(170, 430, 722, t, w, 4);
  } else if (step === 'blaeh') {
    const k = ease(cl(ev.blaeh / 1.4)), bulge = 150 * k, pulse = .6 + .4 * Math.abs(Math.sin(t * 6));
    s += '<path d="M120 1000 L120 1060 Q120 1080 140 1080 L880 1080 Q900 1080 900 1060 L900 1000 C 700 ' + (1000 - bulge) + ', 320 ' + (1000 - bulge) + ', 120 1000 Z" fill="#3A4A7A" stroke="#fff" stroke-width="8"/>';
    s += '<path d="M130 1086 L' + (890 - 30 * k) + ' ' + (1086 + 26 * k) + '" stroke="#5CE1FF" stroke-width="16" stroke-linecap="round"/>';
    s += '<ellipse cx="510" cy="' + (1040 - bulge * .4) + '" rx="' + (250 + 40 * k) + '" ry="' + (20 + bulge * .35) + '" fill="#FF5A5A" opacity="' + (.35 * k * pulse) + '"/>';
    s += '<g transform="translate(820 820) scale(' + back(cl(ev.blaeh / .4)) + ')" opacity="' + pulse + '"><path d="M0 -80 L80 60 H-80 Z" fill="#FFCC00" stroke="#0B1020" stroke-width="9" stroke-linejoin="round"/><rect x="-8" y="-34" width="16" height="54" rx="6" fill="#0B1020"/><circle cx="0" cy="38" r="9" fill="#0B1020"/></g>';
  } else if (step === 'help') {
    const P = [['p1', 'Stecker raus'], ['p2', 'Nicht öffnen'], ['p3', 'Reparatur']];
    P.forEach((p, i) => { const e = ev[p[0]]; if (e === undefined) return; const x = 60 + i * 300, k = back(cl(e / .4)), y0 = 730, cur = ev['p' + (i + 2)] === undefined;
      s += '<g transform="translate(' + (x + 135) + ' ' + (y0 + 140) + ') scale(' + k + ') translate(' + (-(x + 135)) + ' ' + (-(y0 + 140)) + ')"><rect x="' + x + '" y="' + y0 + '" width="270" height="290" rx="28" fill="' + (cur ? '#fff' : '#E9EEF5') + '" stroke="' + (cur ? '#5CE1FF' : '#26335E') + '" stroke-width="8"/>' + svgT(x + 135, y0 + 56, p[1], 36, '#0B1020');
      const cx = x + 135, cy = y0 + 180;
      if (i === 0) { const g = 40 * ease(cl(e / .8)); s += '<rect x="' + (cx - 100) + '" y="' + (cy - 30) + '" width="70" height="60" rx="12" fill="#26335E"/><rect x="' + (cx - 30 + g) + '" y="' + (cy - 26) + '" width="80" height="52" rx="12" fill="#0B1020"/><rect x="' + (cx - 46 + g) + '" y="' + (cy - 16) + '" width="18" height="10" fill="#8A93A8"/><rect x="' + (cx - 46 + g) + '" y="' + (cy + 6) + '" width="18" height="10" fill="#8A93A8"/><path d="M' + (cx + 50 + g) + ' ' + cy + ' q 40 0 50 50" stroke="#0B1020" stroke-width="12" fill="none"/>'; }
      if (i === 1) { s += '<g transform="rotate(-35 ' + cx + ' ' + cy + ')"><rect x="' + (cx - 10) + '" y="' + (cy - 80) + '" width="20" height="90" fill="#8A93A8"/><rect x="' + (cx - 22) + '" y="' + (cy + 10) + '" width="44" height="70" rx="12" fill="#FF7A30"/></g><circle cx="' + cx + '" cy="' + cy + '" r="82" fill="none" stroke="#FF3B3B" stroke-width="14"/><line x1="' + (cx - 58) + '" y1="' + (cy + 58) + '" x2="' + (cx + 58) + '" y2="' + (cy - 58) + '" stroke="#FF3B3B" stroke-width="14"/>'; }
      if (i === 2) { const m = ease(cl(e / 1)); s += '<rect x="' + (cx - 80) + '" y="' + (cy - 40) + '" width="160" height="110" rx="10" fill="#3B8BFF"/><path d="M' + (cx - 95) + ' ' + (cy - 40) + ' L' + cx + ' ' + (cy - 95) + ' L' + (cx + 95) + ' ' + (cy - 40) + ' Z" fill="#26335E"/><rect x="' + (cx - 26) + '" y="' + (cy + 10) + '" width="52" height="60" fill="#0B1020"/><rect x="' + (cx - 120 + 94 * m) + '" y="' + (cy + 20) + '" width="34" height="50" rx="7" fill="#fff" stroke="#0B1020" stroke-width="4" opacity="' + (1 - cl((m - .9) * 10)) + '"/>'; }
      s += '</g>'; });
  } else { // nur warm: Huelle ab, kuehler Ort
    const k = ease(cl(ev.act / 1.2)), cool = ease(cl((ev.act - 1) / 1.5)), px = lerp(240, 560, cool);
    s += '<rect x="480" y="760" width="420" height="370" rx="40" fill="#123A6A" opacity="' + (.3 + .5 * cool) + '"/>';
    for (let i = 0; i < 6; i++) { const a = i * 1.047 + t * .4; s += '<line x1="' + (790 + 34 * Math.cos(a)) + '" y1="' + (830 + 34 * Math.sin(a)) + '" x2="' + (790 - 34 * Math.cos(a)) + '" y2="' + (830 - 34 * Math.sin(a)) + '" stroke="#BFE0FF" stroke-width="7" stroke-linecap="round" opacity="' + (.4 + .6 * cool) + '"/>'; }
    s += '<rect x="' + (px - 30 - 260 * k) + '" y="790" width="240" height="330" rx="40" fill="none" stroke="#8A3B5A" stroke-width="22" opacity="' + (1 - cl((k - .7) * 3)) + '"/>';
    s += phoneF(px - 20, 800, 200, 310, lc('#FF5A3A', '#3B8BFF', cool));
    s += heatW(px - 20, px + 180, 790, t, 1 - cool, 3);
  }
  h += slot(ev, [['panel', 'Warm ist normal', 'hot'], ['warm', 'Zu warm: Laden gebremst', 'hot'], ['blaeh', 'Aufgebläht: Gefahr!', 'red'], ['p1', 'Bei aufgeblähtem Akku:', 'red'], ['act', 'Nur warm? Hülle ab, kühler hinlegen', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.p2gefahr = (ev, t) => {
  if (ev.act !== undefined) { const k = ease(cl(ev.act / 1.2)); return { f: go([140, 1125], [420, 1125], k), s: .4, walk: k > 0 && k < 1, flip: true }; }
  if (ev.p1 !== undefined) { const i = ev.p3 !== undefined ? 2 : ev.p2 !== undefined ? 1 : 0, x = 195 + i * 300; return { f: [x, 1135], s: .36 }; }
  if (ev.blaeh !== undefined) return { f: [180, 990], s: .4, r: 6 * Math.sin(t * 14) };
  if (ev.warm !== undefined) return { f: [500, 1130], s: .38, r: 4 * Math.sin(t * 8) };
  return { f: [500, 1130], s: .38 };
};

// ---------- P002 Schluss ----------
WORLD.p2outro = function (sc, ev, t) {
  let s = bgRad('#0B1020', '#1B2748', .6) + dust(t, '#5CE1FF', 30, .15);
  s += phoneF(640, 860, 200, 300, '#123A6A') + batt(680, 960, 110, 52, .5 + .4 * ((t * .1) % 1)) + bolt(735, 1070, .7);
  s += '<path d="M740 1160 C 740 1240, 900 1240, 920 1400" stroke="#F4F6FB" stroke-width="12" fill="none"/>';
  return W(s + topShade());
};
