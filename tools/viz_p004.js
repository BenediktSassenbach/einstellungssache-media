// Physik v4: P004 "Warum ist der Himmel blau?" komplett neu (Vollbild-Welten, ein Etikett zur Zeit).
function skyG(id, a, b) { return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#' + id + ')"/>'; }
function cloud(x, y, s, op) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" opacity="' + (op === undefined ? 1 : op) + '"><circle r="50" fill="#fff"/><circle cx="55" cy="-20" r="62" fill="#fff"/><circle cx="118" cy="6" r="46" fill="#fff"/><rect x="0" y="0" width="118" height="50" fill="#fff"/></g>'; }
function waveP(x0, x1, y, amp, lam, ph, col, w, op) { let d = ''; for (let x = x0; x <= x1; x += 4) d += (x === x0 ? 'M' : 'L') + x + ' ' + (y + amp * Math.sin((x - x0) / lam * 6.283 - ph)).toFixed(1); return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 8) + '" stroke-linecap="round" opacity="' + (op === undefined ? 1 : op) + '"/>'; }
function molecule(x, y, r, c, a) { return '<g transform="rotate(' + a + ' ' + x + ' ' + y + ')"><circle cx="' + (x - r * .55) + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/><circle cx="' + (x + r * .55) + '" cy="' + y + '" r="' + r + '" fill="' + c + '"/></g>'; }

// ---------- Einstieg: Tag wird Abend ----------
WORLD.p4hook = function (sc, ev, t, lt) {
  const k = ev.abend === undefined ? 0 : ease(cl(ev.abend / 2.2));
  let s = skyG('sk4', lc('#1E5BB8', '#2A1C5A', k), lc('#8FC8FF', '#FF7A30', k));
  const sx = lerp(760, 880, k), sy = lerp(780, 1110, k); s += sun(sx, sy, 70, t, lc('#FFD93B', '#FF7A30', k));
  s += cloud(150 + 30 * Math.sin(t * .4), 800, 1, 1 - .3 * k) + cloud(470 + 25 * Math.sin(t * .35 + 1), 740, .8, 1 - .3 * k);
  for (let i = 0; i < 3; i++) { const bx = ((t * 60 + i * 140) % 1300) - 100, by = 900 + i * 30 + 10 * Math.sin(t * 3 + i); s += '<path d="M' + bx + ' ' + by + ' q 14 -14 28 0 q 14 -14 28 0" stroke="#0B1020" stroke-width="5" fill="none" opacity=".6"/>'; }
  if (ev.mark !== undefined && k === 0) { const m = cl(ev.mark / .6); for (let i = 0; i < 7; i++) { const a = -.3 + i * .25; s += '<line x1="' + (sx + 90 * Math.cos(a)) + '" y1="' + (sy + 90 * Math.sin(a)) + '" x2="' + (sx + (90 + 110 * m) * Math.cos(a)) + '" y2="' + (sy + (90 + 110 * m) * Math.sin(a)) + '" stroke="' + RB[i] + '" stroke-width="10" stroke-linecap="round" opacity="' + (.8 * (1 - cl((ev.mark - 2.5) / .6))) + '"/>'; } }
  s += '<path d="M0 1120 Q 540 1060 1080 1120 L1080 1920 L0 1920 Z" fill="' + lc('#1F7A4A', '#123A2A', k) + '"/>';
  return W(s + topShade(true));
};
WMASC.p4hook = (ev, t) => ({ f: [230, 1110], s: .5, r: -8 + 3 * Math.sin(t * 2), prop: ev.abend === undefined ? '🔭' : '' });

// ---------- Teil 1: Prisma und Wellen ----------
WORLD.p4licht = function (sc, ev, t, lt) {
  let s = '<rect width="1080" height="1920" fill="#0B1020"/>' + stars(t, 60, .6), h = '';
  const waves = ev.p2 !== undefined, fadeP = waves ? 1 - cl(ev.p2 / .6) : 1, PX = 520, PY = 905;
  if (fadeP > 0) { s += '<g opacity="' + fadeP + '">' + sun(120, PY, 58, t, '#FFD93B') + '<line x1="185" y1="' + PY + '" x2="' + (PX - 50) + '" y2="' + PY + '" stroke="#fff" stroke-width="14"/>';
    if (ev.p1 !== undefined) { const k = ease(cl(ev.p1 / 1.2)); for (let i = 0; i < 7; i++) { const y2 = 760 + i * 50; s += '<polygon points="' + (PX + 40) + ',' + (PY - 6 + i * 2) + ' ' + (PX + 40 + 380 * k) + ',' + lerp(PY, y2, k) + ' ' + (PX + 40 + 380 * k) + ',' + lerp(PY, y2 + 46, k) + ' ' + (PX + 40) + ',' + (PY - 4 + i * 2) + '" fill="' + RB[i] + '" opacity=".95"/>'; } }
    else s += '<line x1="' + (PX + 40) + '" y1="' + PY + '" x2="' + (PX + 40 + 380 * ease(cl(lt / 1.5))) + '" y2="' + PY + '" stroke="#fff" stroke-width="14" opacity=".9"/>';
    s += '<polygon points="' + PX + ',765 ' + (PX + 110) + ',1000 ' + (PX - 110) + ',1000" fill="#BFE0FF" fill-opacity=".25" stroke="#fff" stroke-width="8" stroke-linejoin="round"/></g>'; }
  if (waves) { const v = 200, k = cl(ev.p2 / .6), lr = 260, lb = 167, X0 = 150, X1 = 900, GX = 780;
    const ro = ev.act !== undefined ? .45 : 1; s += svgT(X0 - 20, 836, 'Rot', 40, '#FF5A5A', 'end') + waveP(X0, X0 + (X1 - X0) * k, 822, 55, lr, t * v / lr * 6.283, '#FF3B3B', 9, ro);
    s += '<line x1="' + GX + '" y1="740" x2="' + GX + '" y2="1100" stroke="#fff" stroke-width="4" stroke-dasharray="10 10" opacity=".7"/>';
    s += svgT(GX, 724, 'Schwingungen', 30, '#fff') + svgT(930, 760, String(Math.floor(ev.p2 * v / lr)), 44, '#FF5A5A', 'end');
    if (ev.p3 !== undefined) { const kb = cl(ev.p3 / .6), glow = ev.act !== undefined; if (glow) s += waveP(X0, X1, 1010, 55, lb, t * v / lb * 6.283, '#3BB8FF', 26, .3);
      s += svgT(X0 - 20, 1024, 'Blau', 40, '#3BB8FF', 'end') + waveP(X0, X0 + (X1 - X0) * kb, 1010, 55, lb, t * v / lb * 6.283, '#3B8BFF', 9) + svgT(930, 942, String(Math.floor(ev.p3 * v / lb)), 44, '#3BB8FF', 'end'); } }
  h += slot(ev, [['panel', 'Sieht weiß aus'], ['p1', 'Alle Farben drin', 'hot'], ['p2', 'Rot: lange Welle', 'red'], ['p3', 'Blau: kurz = öfter', 'hot'], ['act', 'Das ist der Trick!', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.p4licht = (ev, t) => { const v = 200;
  if (ev.p3 !== undefined) { const x = 560, y = 1010 + 55 * Math.sin((x - 150) / 167 * 6.283 - t * v / 167 * 6.283); return { f: [x, y - 10], s: .28, r: 10 * Math.cos((x - 150) / 167 * 6.283 - t * v / 167 * 6.283) }; }
  if (ev.p2 !== undefined) { const x = 560, y = 822 + 55 * Math.sin((x - 150) / 260 * 6.283 - t * v / 260 * 6.283); return { f: [x, y - 10], s: .28, r: 8 * Math.cos((x - 150) / 260 * 6.283 - t * v / 260 * 6.283) }; }
  return { f: [520, 768], s: .3 };
};

// ---------- Teil 2: Luftteilchen streuen ----------
WORLD.p4streu = function (sc, ev, t, lt) {
  const sky = ev.act === undefined ? 0 : ease(cl(ev.act / 1.2));
  let s = skyG('st4', lc('#071228', '#1E5BB8', sky), lc('#0E2350', '#8FC8FF', sky)), h = '';
  const zoom = (ev.p1 !== undefined || ev.p2 !== undefined) && ev.p3 === undefined && !sky, two = ev.p3 !== undefined && !sky;
  if (!zoom && !two) { for (let i = 0; i < 34; i++) { const x = 60 + rnd(i + 5) * 880 + 20 * Math.sin(t * .7 + i), y = 720 + rnd(i + 9) * 400 + 16 * Math.cos(t * .6 + i); s += molecule(x, y, 13, i % 4 === 0 ? '#FF8A8A' : '#9CB8FF', t * 30 + i * 40); }
    if (sky) { for (let i = 0; i < 9; i++) { let pts = '', x = 80 + rnd(i + 30) * 200, y = 720 + rnd(i + 31) * 120; for (let j = 0; j < 5; j++) { pts += x + ',' + y + ' '; x += 120 + 120 * rnd(i * 7 + j); y += (rnd(i * 5 + j) - .4) * 200; y = Math.max(720, Math.min(1110, y)); } s += '<polyline points="' + pts + '" fill="none" stroke="#2F6BFF" stroke-width="7" stroke-dasharray="20 14" stroke-dashoffset="' + (-t * 120) + '" opacity="' + sky + '"/>'; }
      const OX = 540, OY = 1060; for (let i = 0; i < 7; i++) { const a = Math.PI * (1.1 + .8 * i / 6), r0 = 230 - 60 * ((t * 1.2 + i * .3) % 1); s += '<line x1="' + (OX + r0 * Math.cos(a)) + '" y1="' + (OY + r0 * Math.sin(a)) + '" x2="' + (OX + (r0 - 60) * Math.cos(a)) + '" y2="' + (OY + (r0 - 60) * Math.sin(a)) + '" stroke="#2F6BFF" stroke-width="10" stroke-linecap="round" opacity="' + sky + '"/>'; } } }
  const atom = (x, y, R, freq, amp, rings, col) => { const dx = amp * Math.sin(t * freq * 6.283); let a = '';
    if (rings) for (let i = 0; i < 4; i++) { const c = (t * freq * .5 + i / 4) % 1; a += '<circle cx="' + x + '" cy="' + y + '" r="' + (R + rings * c) + '" fill="none" stroke="' + col + '" stroke-width="' + (rings > 150 ? 9 : 4) + '" opacity="' + ((rings > 150 ? .9 : .45) * (1 - c)) + '"/>'; }
    a += '<circle cx="' + x + '" cy="' + y + '" r="' + (R * .32) + '" fill="#FF5A5A"/>' + svgT(x, y + R * .12, '+', R * .4, '#fff') + '<ellipse cx="' + (x + dx) + '" cy="' + y + '" rx="' + R + '" ry="' + (R * .8) + '" fill="#5CE1FF" fill-opacity=".28" stroke="#5CE1FF" stroke-width="4"/>' + svgT(x + dx + R * .62, y - R * .45, '−', R * .4, '#5CE1FF');
    return a; };
  if (zoom) { const k = ease(cl(ev.p1 / .8)), R = 110 * k; s += waveP(60, 400, 905, 40, 120, t * 9, '#FFE14D', 8, k);
    s += atom(560, 905, Math.max(1, R), 1.2, 30 * k, ev.p2 !== undefined ? 300 * cl(ev.p2 / .6) : 0, '#FFE14D');
    if (ev.p2 !== undefined) for (let i = 0; i < 8; i++) { const a = i * .785 + .3, c = (t * .8 + i * .13) % 1, r = 150 + 140 * c; s += '<line x1="' + (560 + r * Math.cos(a)) + '" y1="' + (905 + r * .75 * Math.sin(a)) + '" x2="' + (560 + (r + 40) * Math.cos(a)) + '" y2="' + (905 + (r + 40) * .75 * Math.sin(a)) + '" stroke="#FFE14D" stroke-width="8" stroke-linecap="round" opacity="' + (1 - c) + '"/>'; } }
  if (two) { s += svgT(80, 785, 'Rot', 38, '#FF5A5A', 'start') + waveP(170, 430, 775, 32, 140, t * 5, '#FF3B3B', 7) + atom(600, 775, 60, .6, 14, 45, '#FF8A8A');
    s += svgT(80, 1050, 'Blau', 38, '#3BB8FF', 'start') + waveP(190, 430, 1040, 32, 90, t * 12, '#3B8BFF', 7) + atom(600, 1040, 60, 1.4, 24, 105, '#3BB8FF'); }
  h += slot(ev, [['panel', 'Luft: Stickstoff + Sauerstoff'], ['p1', 'Licht bringt Ladungen zum Schwingen'], ['p2', 'Streuung: in alle Richtungen', 'hot'], ['p3', 'Schneller = stärker gestreut', 'hot'], ['act', 'Von überall kommt Blau', 'hot']], 600);
  return W(s + topShade(), h);
};
WMASC.p4streu = (ev, t) => {
  if (ev.act !== undefined) return { f: [540, 1112], s: .44 };
  if (ev.p3 !== undefined) return { f: [880, 1115], s: .38 };
  if (ev.p1 !== undefined) return { f: [880, 1115], s: .4, r: 4 * Math.sin(t * 3) };
  return { f: [820 + 20 * Math.sin(t * .8), 1060 + 18 * Math.sin(t * 1.3)], s: .34, r: 8 * Math.sin(t) };
};

// ---------- Teil 3: Warum nicht lila? ----------
WORLD.p4lila = function (sc, ev, t, lt) {
  const st = ev.act !== undefined ? 'act' : ev.p3 !== undefined ? 'auge' : ev.p2 !== undefined ? 'sonne' : ev.p1 !== undefined ? 'frage' : 'bars';
  const bg = st === 'frage' ? ['#2A1250', '#8A4BFF'] : st === 'act' ? ['#1E5BB8', '#8FC8FF'] : ['#0B1020', '#1B2748'];
  const tk = st === 'act' ? ease(cl(ev.act / 1)) : st === 'frage' ? ease(cl(ev.p1 / .8)) : 1;
  let s = skyG('sl4', lc('#0B1020', bg[0], tk), lc('#1B2748', bg[1], tk)) + (st === 'act' ? '' : stars(t, 40, .4)), h = '';
  const base = 1110;
  if (st === 'bars') { const B = [['Rot', '#FF3B3B', 45, 180], ['Blau', '#3B8BFF', 250, 450], ['Violett', '#8A4BFF', 400, 720]]; const k = ease(cl(lt / 1.6));
    B.forEach(b => { const hgt = b[2] * k; s += '<rect x="' + (b[3] - 100) + '" y="' + (base - hgt) + '" width="200" height="' + hgt + '" rx="16" fill="' + b[1] + '"/>' + svgT(b[3], base + 0 - 16, b[0], 38, '#fff');
      if (b[0] !== 'Rot') { const c = (t * (b[0] === 'Blau' ? 1.5 : 2.2)) % 1; s += '<circle cx="' + b[3] + '" cy="' + (base - hgt) + '" r="' + (20 + 70 * c) + '" fill="none" stroke="' + b[1] + '" stroke-width="5" opacity="' + (1 - c) + '"/>'; } });
    s += '<line x1="60" y1="' + base + '" x2="940" y2="' + base + '" stroke="#fff" stroke-width="5"/>'; }
  if (st === 'frage') { const b = 1 + .06 * Math.sin(t * 5); s += '<g transform="translate(540 900) scale(' + b + ')">' + svgT(0, 90, '?', 320, '#fff') + '</g>'; }
  if (st === 'sonne') { const k = ease(cl(ev.p2 / 1.4)); let d = 'M120 ' + base; const pts = []; for (let x = 120; x <= 900; x += 6) { const u = (x - 120) / 780, lam = 380 + 320 * u, v = Math.exp(-Math.pow((lam - 500) / 210, 2)) * (lam < 430 ? .55 + .45 * (lam - 380) / 50 : 1); pts.push([x, base - 380 * v * k]); }
    pts.forEach(p => d += ' L' + p[0] + ' ' + p[1].toFixed(1)); d += ' L900 ' + base + ' Z';
    s += '<defs><linearGradient id="spg" x1="0" x2="1"><stop offset="0" stop-color="#8A4BFF"/><stop offset=".22" stop-color="#3B5BFF"/><stop offset=".35" stop-color="#3BB8FF"/><stop offset=".5" stop-color="#3BD96B"/><stop offset=".65" stop-color="#FFD93B"/><stop offset=".8" stop-color="#FF8A2A"/><stop offset="1" stop-color="#FF3B3B"/></linearGradient></defs><path d="' + d + '" fill="url(#spg)"/>';
    s += '<line x1="60" y1="' + base + '" x2="940" y2="' + base + '" stroke="#fff" stroke-width="5"/>' + svgT(180, base - 20, 'Violett', 32, '#fff') + svgT(330, base - 20, 'Blau', 32, '#fff');
    s += '<rect x="122" y="700" width="116" height="' + (base - 700) + '" fill="none" stroke="#FFE14D" stroke-width="6" stroke-dasharray="14 10" opacity="' + (.5 + .5 * Math.abs(Math.sin(t * 4))) + '"/>'; }
  if (st === 'auge') { const k = ease(cl(ev.p3 / 1.2)), bl = .5 + .5 * Math.sin(t * 1.3);
    s += '<path d="M90 910 Q 270 730 450 910 Q 270 1090 90 910 Z" fill="#fff" stroke="#0B1020" stroke-width="8"/><circle cx="' + (270 + 20 * bl) + '" cy="910" r="78" fill="#3B8BFF"/><circle cx="' + (270 + 20 * bl) + '" cy="910" r="36" fill="#0B1020"/><circle cx="' + (290 + 20 * bl) + '" cy="886" r="14" fill="#fff"/>';
    s += '<rect x="560" y="' + (base - 360 * k) + '" width="150" height="' + (360 * k) + '" rx="14" fill="#3B8BFF"/><rect x="760" y="' + (base - 70 * k) + '" width="150" height="' + (70 * k) + '" rx="14" fill="#8A4BFF"/>' + svgT(635, base - 20, 'Blau', 34, '#fff') + svgT(835, base - 90 * k - 10, 'Violett', 34, '#fff') + '<line x1="520" y1="' + base + '" x2="940" y2="' + base + '" stroke="#fff" stroke-width="5"/>'; }
  if (st === 'act') { s += cloud(200 + 20 * Math.sin(t * .5), 800, .8) + cloud(620, 860, .6); s += '<path d="M0 1120 Q 540 1060 1080 1120 L1080 1920 L0 1920 Z" fill="#1F7A4A"/>'; }
  h += slot(ev, [['panel', 'Violett: noch stärker gestreut'], ['p1', 'Warum nicht lila?', 'red'], ['p2', 'Weniger Violett im Sonnenlicht', 'hot'], ['p3', 'Augen: Blau viel empfindlicher', 'hot'], ['act', 'Ergebnis: Blau!', 'hot']]);
  return W(s + topShade(st === 'act'), h);
};
WMASC.p4lila = (ev, t) => {
  if (ev.act !== undefined) return { f: [700, 1112], s: .46 };
  if (ev.p3 !== undefined) return { f: [270, 1120], s: .36 };
  if (ev.p2 !== undefined) return { f: [905, 1112], s: .32 };
  if (ev.p1 !== undefined) return { f: [800, 1112], s: .46, r: 10 * Math.sin(t * 3) };
  return { f: [905, 1112], s: .32 };
};

// ---------- Teil 4: Abendrot ----------
WORLD.p4abend = function (sc, ev, t, lt) {
  const dusk = ev.act === undefined ? (ev.tief === undefined ? 0 : .35 * ease(cl(ev.tief / 1.5))) : .35 + .65 * ease(cl(ev.act / 1.2));
  let s = skyG('sa4', lc('#0B1020', '#2A1C5A', dusk), lc('#1B2748', '#FF7A30', dusk)) + stars(t, 40, .4 * (1 - dusk)), h = '';
  const EX = 540, EY = 2350, R = 1270, OX = 560, OY = 1080;
  s += '<circle cx="' + EX + '" cy="' + EY + '" r="' + (R + 130) + '" fill="' + lc('#5CE1FF', '#FF9A50', dusk) + '" opacity=".22"/><circle cx="' + EX + '" cy="' + EY + '" r="' + R + '" fill="#1F7A4A"/>';
  const lo = ev.tief === undefined ? 0 : ease(cl(ev.tief / 1.5)), a = lerp(-Math.PI / 2, -.36, lo), SX = OX + 360 * Math.cos(a) * (lo ? 1.03 : 0) + (lo ? 0 : 0), SY = lo ? lerp(720, 975, lo) : 720, SXX = lo ? lerp(OX, 925, lo) : OX;
  const sunC = lc('#FFD93B', '#FF5A2A', cl((dusk - .35) / .65)); s += sun(SXX, SY, 50, t, sunC);
  const beamCol = ev.act !== undefined ? '#FF6A2A' : '#fff';
  if (ev.blau !== undefined) { s += '<defs><linearGradient id="bm4" x1="' + SXX + '" y1="' + SY + '" x2="' + OX + '" y2="' + OY + '" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="' + (ev.act !== undefined ? '#FF4A1A' : '#FF9A50') + '"/></linearGradient></defs><line x1="' + SXX + '" y1="' + SY + '" x2="' + OX + '" y2="' + (OY - 40) + '" stroke="url(#bm4)" stroke-width="16"/>';
    for (let i = 0; i < 14; i++) { const u = (i + .5) / 14, bx = lerp(SXX, OX, u), by = lerp(SY, OY - 40, u), c = (t * .9 + rnd(i)) % 1; s += '<circle cx="' + (bx - 10 * c) + '" cy="' + (by - 140 * c) + '" r="9" fill="#3B8BFF" opacity="' + (1 - c) + '"/>'; } }
  else s += '<line x1="' + SXX + '" y1="' + SY + '" x2="' + OX + '" y2="' + (OY - 40) + '" stroke="' + beamCol + '" stroke-width="16" opacity=".9"/>';
  if (ev.weg !== undefined && ev.blau === undefined) { const c = (t * .5) % 1; s += '<line x1="' + SXX + '" y1="' + SY + '" x2="' + OX + '" y2="' + (OY - 40) + '" stroke="#FFE14D" stroke-width="34" opacity=".35"/><circle cx="' + lerp(SXX, OX, c) + '" cy="' + lerp(SY, OY - 40, c) + '" r="18" fill="#fff"/>'; }
  if (!lo) s += '<line x1="' + (OX - 60) + '" y1="950" x2="' + (OX - 60) + '" y2="1078" stroke="#FFE14D" stroke-width="8"/><line x1="' + (OX - 80) + '" y1="950" x2="' + (OX - 40) + '" y2="950" stroke="#FFE14D" stroke-width="8"/>';
  if (ev.act2 !== undefined) { const k = ease(cl(ev.act2 / .8)); s += cloud(150, 800, .9, k);
    s += '<g opacity="' + k + '"><circle cx="680" cy="800" r="60" fill="#BFE0FF" fill-opacity=".5" stroke="#fff" stroke-width="6"/>'; for (let i = 0; i < 7; i++) { const aa = -2.6 + i * .52, c = (t * 1.2) % 1, r1 = 70 + 25 * c; s += '<line x1="' + (680 + r1 * Math.cos(aa)) + '" y1="' + (800 + r1 * Math.sin(aa)) + '" x2="' + (680 + (r1 + 50) * Math.cos(aa)) + '" y2="' + (800 + (r1 + 50) * Math.sin(aa)) + '" stroke="' + RB[i] + '" stroke-width="10" stroke-linecap="round"/>'; } s += '<line x1="300" y1="830" x2="615" y2="805" stroke="#fff" stroke-width="3" stroke-dasharray="8 8"/></g>'; }
  h += slot(ev, [['panel', 'Mittags: kurzer Weg'], ['tief', 'Abends: Sonne tief'], ['weg', 'Viel längerer Weg', 'hot'], ['blau', 'Blau wird weggestreut', 'hot'], ['act', 'Übrig: Orange und Rot', 'red'], ['act2', 'Wolken: alle Farben = Weiß']]);
  return W(s + topShade(), h);
};
WMASC.p4abend = (ev, t) => ({ f: [560, 1082], s: .32, r: ev.tief === undefined ? 0 : 6 });

// ---------- Schluss ----------
WORLD.p4outro = function (sc, ev, t) {
  let s = skyG('so4', '#2A1C5A', '#FF7A30') + sun(800, 1090, 70, t, '#FF6A2A') + cloud(560, 900, .7, .8);
  s += '<path d="M0 1120 Q 540 1060 1080 1120 L1080 1920 L0 1920 Z" fill="#123A2A"/>';
  return W(s + topShade());
};

// ---------- v5: Teil 1 kombiniert (Licht ist gemischt + Luft streut Blau) ----------
const p4map = ev => { const m = {}; const e = ev.panel, w = ev.wellen, st = ev.streu, a = ev.act;
  if (st !== undefined || a !== undefined) { if (st !== undefined) m.p3 = st; if (a !== undefined) m.act = a; return ['s', m]; }
  if (w !== undefined) { m.p2 = w; m.p3 = Math.max(0, w - .001); return ['l', m]; }
  if (e !== undefined) { m.panel = e; if (e > .9) m.p1 = e - .9; } return ['l', m]; };
WORLD.p4mix = function (sc, ev, t, lt) { const r = p4map(ev); return r[0] === 's' ? WORLD.p4streu(sc, r[1], t, lt) : WORLD.p4licht(sc, r[1], t, lt); };
WMASC.p4mix = (ev, t, lt, sc) => { const r = p4map(ev); return r[0] === 's' ? WMASC.p4streu(r[1], t) : WMASC.p4licht(r[1], t); };
