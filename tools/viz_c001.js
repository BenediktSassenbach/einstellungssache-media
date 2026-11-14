// Chemie C001 "Warum darf man brennendes Fett nie mit Wasser loeschen?" (Pilot Chemie, Bauplan wie P002 bis P004 v8).
// Etikett immer im festen Platz (links, y=600), Grafik zwischen y=700 und y=1130, Schalti steht nie auf Schrift.

// ---------- Helfer Kueche und Feuer ----------
function flame1(cx, by, w, h, t, sd, col) { const a = 10 * Math.sin(t * 9 + sd), b = 8 * Math.sin(t * 13 + sd * 2);
  return '<path d="M' + (cx - w / 2) + ' ' + by + ' C ' + (cx - w / 2) + ' ' + (by - h * .45) + ', ' + (cx - w * .12 + a) + ' ' + (by - h * .6) + ', ' + (cx + b) + ' ' + (by - h) + ' C ' + (cx + w * .12 + a) + ' ' + (by - h * .6) + ', ' + (cx + w / 2) + ' ' + (by - h * .45) + ', ' + (cx + w / 2) + ' ' + by + ' Z" fill="' + col + '"/>'; }
function fire(cx, by, w, h, t, n) { if (h <= 2) return ''; let s = ''; n = n || 5;
  for (let i = 0; i < n; i++) { const x = cx - w / 2 + w * (i + .5) / n, hh = h * (.65 + .35 * Math.abs(Math.sin(t * 6 + i * 1.9))); s += flame1(x, by, w / n * 1.5, hh, t, i, '#FF5A1A'); }
  for (let i = 0; i < n; i++) { const x = cx - w / 2 + w * (i + .5) / n, hh = h * .62 * (.65 + .35 * Math.abs(Math.sin(t * 7 + i * 2.3))); s += flame1(x, by, w / n * 1.05, hh, t, i + 9, '#FFB020'); }
  for (let i = 0; i < n; i++) { const x = cx - w / 2 + w * (i + .5) / n, hh = h * .32 * (.65 + .35 * Math.abs(Math.sin(t * 8 + i * 2.9))); s += flame1(x, by, w / n * .6, hh, t, i + 19, '#FFE98A'); }
  return s; }
// Pfanne von der Seite: Oberkante bei y, Griff nach rechts
function panS(cx, y, w, left) { const a = cx - w / 2, b = cx + w / 2;
  return '<rect x="' + (left ? a - 184 : b - 6) + '" y="' + (y + 6) + '" width="190" height="24" rx="12" fill="#3A4258" stroke="#8A93A8" stroke-width="5"/><path d="M' + a + ' ' + y + ' L' + b + ' ' + y + ' L' + (b - 34) + ' ' + (y + 72) + ' L' + (a + 34) + ' ' + (y + 72) + ' Z" fill="#232838" stroke="#8A93A8" stroke-width="7" stroke-linejoin="round"/><ellipse cx="' + cx + '" cy="' + (y + 3) + '" rx="' + (w / 2 - 12) + '" ry="11" fill="#FFC83A"/>'; }
// Herdplatte: glueht je nach k
function hob(cx, y, w, k) { return '<rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="46" rx="14" fill="#141826" stroke="#56618A" stroke-width="5"/><rect x="' + (cx - w * .3) + '" y="' + (y + 4) + '" width="' + (w * .6) + '" height="12" rx="6" fill="' + lc('#3A4258', '#FF3B2A', k) + '"/>'; }
function drop(x, y, s, col) { return '<path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0 -22 C 12 -4, 16 6, 0 18 C -16 6, -12 -4, 0 -22 Z" fill="' + (col || '#3BB8FF') + '" stroke="#fff" stroke-width="3"/>'; }
function puff(x, y, r, op) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff" opacity="' + op + '"/>'; }
function o2(x, y, a) { return '<g transform="rotate(' + a + ' ' + x + ' ' + y + ')"><circle cx="' + (x - 13) + '" cy="' + y + '" r="16" fill="#5CE1FF" stroke="#0B1020" stroke-width="4"/><circle cx="' + (x + 13) + '" cy="' + y + '" r="16" fill="#5CE1FF" stroke="#0B1020" stroke-width="4"/></g>'; }
// Thermometer mit Skala 0 bis 320 Grad
const TY = v => 1085 - v / 320 * 370;
function thermoC(x, T) { const col = T < 100 ? lc('#3B8BFF', '#FFD93B', T / 100) : lc('#FFD93B', '#FF3B2A', (T - 100) / 180);
  let s = '<rect x="' + (x - 26) + '" y="' + (TY(320) - 12) + '" width="52" height="' + (370 + 20) + '" rx="26" fill="#fff"/><rect x="' + (x - 14) + '" y="' + TY(T) + '" width="28" height="' + (1090 - TY(T)) + '" rx="12" fill="' + col + '"/><circle cx="' + x + '" cy="1106" r="42" fill="' + col + '" stroke="#fff" stroke-width="8"/>';
  for (const v of [100, 200, 300]) s += '<line x1="' + (x + 30) + '" y1="' + TY(v) + '" x2="' + (x + 50) + '" y2="' + TY(v) + '" stroke="#fff" stroke-width="5"/>' + svgT(x + 58, TY(v) + 11, v, 30, '#AEB9D6', 'start');
  return s; }
const kitchen = (t, c0, c1, col) => bgRad(c0, c1, .55) + dust(t, col, 22, .14);

// ---------- Einstieg: Wasserglas kippt in die brennende Pfanne, Feuerball ----------
WORLD.h7c1 = function (sc, ev, t, lt) {
  const e = ev.bumm, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e, t), CX = 560, PY = 1010;
  let s = stage7(t, lt, '#1A0A06', e === undefined ? lc('#FF8A30', '#FF4A1A', k) : '#FFB020', CX, 920), o = '';
  o += hob(CX, PY + 72, 520, 1) + panS(CX, PY, 340);
  if (e === undefined || e < .14) {
    o += fire(CX, PY, 280, 120 + 50 * k, t, 5);
    // Glas kippt immer weiter
    const ang = -12 - 78 * ease(k) - (e === undefined ? 0 : 20), gx = 800, gy = 800;
    o += '<g transform="translate(' + gx + ' ' + gy + ') rotate(' + ang + ')"><path d="M-46 -120 L46 -120 L36 0 L-36 0 Z" fill="rgba(155,231,255,.18)" stroke="#fff" stroke-width="7" stroke-linejoin="round"/><path d="M-41 -70 L41 -70 L36 -4 L-36 -4 Z" fill="#3BB8FF"/></g>';
    const lx = gx + 130 * Math.sin(ang * Math.PI / 180) * 1 - 20, ly = gy - 120 * Math.cos(ang * Math.PI / 180) + 10;
    if (k > .55 && e === undefined) { const c = (t * 1.4) % 1; o += drop(lx - 20, ly + 20 + 6 * c, .8 + .5 * c); }
    if (e !== undefined) { const c = cl(e / .14); o += '<path d="M' + (lx - 10) + ' ' + ly + ' Q ' + (lx - 150) + ' ' + (ly + 40) + ' ' + (CX + 20) + ' ' + lerp(ly, PY, c) + '" stroke="#3BB8FF" stroke-width="26" fill="none" stroke-linecap="round"/>'; }
  } else { // Feuerball steigt aus der Pfanne
    const g = back(cl((e - .14) / .45)), fl = 1 + .05 * Math.sin(t * 22);
    if (e < .3) o += '<rect x="-400" y="-400" width="1900" height="2800" fill="#fff" opacity="' + (1 - (e - .14) / .16) + '"/>';
    for (let i = 0; i < 7; i++) { const u = i / 6, x = CX + 46 * Math.sin(t * 5 + i * 1.3) * u, y = PY - 20 - 330 * u * g, r = (70 + 130 * u) * g * fl; o += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + lc('#FFE14D', '#FF4A1A', u) + '"/>'; }
    for (let i = 0; i < 5; i++) { const u = i / 4, x = CX + 30 * Math.sin(t * 6 + i), y = PY - 30 - 270 * u * g, r = (40 + 70 * u) * g; o += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#FFE98A" opacity=".85"/>'; }
    for (let i = 0; i < 14; i++) { const a = -Math.PI * (.08 + .84 * rnd(i + 31)), c = ((e - .14) * .9 + rnd(i + 7)) % 1, d = 120 + 460 * c; o += '<circle cx="' + (CX + d * Math.cos(a)) + '" cy="' + (PY - 40 + d * Math.sin(a) + 260 * c * c) + '" r="' + (9 + 8 * rnd(i)) + '" fill="#FFB020" opacity="' + (1 - c) + '"/>'; }
    o += smoke(CX - 150, 760, t, 4, cl(e - .5) * .7) + smoke(CX + 170, 780, t + 1, 4, cl(e - .5) * .7) + smoke(250, 1320, t, 3, cl(e - .3) * .8);
  }
  s += pop7(CX, 920, lt, o) + word7('WUMM!', 580, 930, e === undefined || e < .14 ? undefined : e - .14, '#FFCC00', -8) + sweat7(t, e === undefined ? k : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7c1 = (ev, t, lt, sc) => { const e = ev.bumm, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined && e > .14) { const b = cl((e - .14) / .3); return { f: [220 - 40 * b, 1537], s: 1, r: -14 * b + 4 * Math.sin(t * 20) * (1 - cl((e - 1.1) / 1)), fx: 'brightness(.42) contrast(1.25)' }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 14) };
};

// ---------- Teil 1: Fett ist viel heisser als kochendes Wasser ----------
WORLD.c1heiss = function (sc, ev, t, lt) {
  let s = kitchen(t, '#160905', '#3A1A0E', '#FF9A50'), h = '';
  const T = ev.grad !== undefined ? 180 + 100 * ease(cl(ev.grad / 1.1)) : 20 + 160 * ease(cl((ev.panel || 0) / 2.4)), burn = ev.grad !== undefined && ev.grad > .9, PX = 440, PY = 1010;
  s += hob(PX, PY + 72, 480, cl(T / 200)) + panS(PX, PY, 340, true);
  if (!burn && T > 150) for (let i = 0; i < 4; i++) { const c = (t * .5 + i / 4) % 1; s += puff(PX - 90 + i * 60 + 14 * Math.sin(t * 2 + i), PY - 20 - 150 * c, 14 + 22 * c, .35 * (1 - c) * cl((T - 150) / 30)); }
  if (burn) s += fire(PX, PY, 280, 150 * back(cl((ev.grad - .9) / .4)), t, 5);
  if (!burn) s += heatW(PX - 130, PX + 130, PY - 14, t, cl(T / 180), 5, '#FF9A50');
  const rc = T < 100 ? '#fff' : lc('#FFD93B', '#FF5A2A', (T - 100) / 180), pulse = burn && ev.grad < 1.5 ? 1 + .25 * (1 - cl((ev.grad - .9) / .6)) : 1;
  s += '<g transform="translate(' + PX + ' 800) scale(' + pulse + ')">' + svgT(0, 0, Math.round(T) + ' °C', 104, rc) + '</g>';
  s += thermoC(790, T);
  if (ev.wasser !== undefined) { const k = back(cl(ev.wasser / .4)), y = TY(100), boil = ev.act !== undefined;
    s += '<line x1="' + (760 - 50 * k) + '" y1="' + y + '" x2="760" y2="' + y + '" stroke="#3BB8FF" stroke-width="7" stroke-dasharray="12 10"/>';
    s += '<g transform="translate(' + (668 + (boil ? 5 * Math.sin(t * 40) : 0)) + ' ' + y + ') scale(' + k + ')">' + drop(0, 0, 2.3) + '<circle cx="-11" cy="2" r="5" fill="#0B1020"/><circle cx="11" cy="2" r="5" fill="#0B1020"/>' + (boil ? '<ellipse cx="0" cy="20" rx="6" ry="8" fill="#0B1020"/>' : '<path d="M-9 18 Q0 26 9 18" stroke="#0B1020" stroke-width="4" fill="none" stroke-linecap="round"/>') + '</g>';
    if (boil) { for (let i = 0; i < 4; i++) { const c = (t * .9 + i / 4) % 1; s += puff(668 + 24 * Math.sin(t * 3 + i * 2), y - 60 - 110 * c, 12 + 20 * c, .7 * (1 - c)); }
      const a = ease(cl(ev.act / .7)); s += '<line x1="736" y1="' + (y - 16) + '" x2="736" y2="' + lerp(y - 6, TY(280) + 26, a) + '" stroke="#FF5A5A" stroke-width="10" stroke-linecap="round"/><path d="M718 ' + (lerp(y - 6, TY(280) + 26, a) + 6) + ' L736 ' + (lerp(y - 6, TY(280) + 26, a) - 26) + ' L754 ' + (lerp(y - 6, TY(280) + 26, a) + 6) + ' Z" fill="#FF5A5A"/>'; }
  }
  h += slot(ev, [['panel', 'Fett wird heißer und heißer'], ['grad', 'Ab ca. 280 °C: brennt von selbst', 'red'], ['wasser', 'Wasser kocht bei 100 °C'], ['act', 'Viel zu heiß für Wasser', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.c1heiss = (ev, t) => {
  if (ev.act !== undefined) return BIG();
  if (ev.wasser !== undefined) return BIG();
  if (ev.grad !== undefined) return { f: [220 - 30 * cl((ev.grad - .9) / .3), 1537], s: 1, r: ev.grad > .9 ? -8 + 3 * Math.sin(t * 18) * (1 - cl((ev.grad - .9) / 1.2)) : 2 * Math.sin(t * 10) };
  return BIG();
};

// ---------- Teil 2: Wasser sinkt ein, verdampft, 1 Liter wird 1700 Liter, Dampf reisst Fett mit ----------
WORLD.c1dampf = function (sc, ev, t, lt) {
  let s = kitchen(t, '#160905', '#3A1A0E', '#FF9A50'), h = '';
  const X0 = 250, X1 = 800, YT = 900, YB = 1105, OIL = 945, cmp = ev.liter !== undefined && ev.hoch === undefined;
  const up = ev.hoch, st = ev.act, vap = ev.dampf === undefined ? 0 : ease(cl(ev.dampf / .9));
  // Pfanne im Querschnitt
  let pan = '<rect x="' + (X1 - 4) + '" y="' + (YT + 14) + '" width="124" height="26" rx="13" fill="#3A4258" stroke="#8A93A8" stroke-width="5"/>';
  pan += '<rect x="30" y="' + (YT + 2) + '" width="170" height="22" rx="8" fill="#56618A"/><rect x="100" y="' + (YT + 24) + '" width="30" height="' + (YB - YT - 20) + '" fill="#3A4258"/>';
  pan += '<path d="M' + X0 + ' ' + YT + ' L' + (X0 + 30) + ' ' + YB + ' L' + (X1 - 30) + ' ' + YB + ' L' + X1 + ' ' + YT + '" fill="#2A1A0A" stroke="#8A93A8" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>';
  const bulge = up !== undefined ? 0 : 26 * vap * (1 + .3 * Math.sin(t * 30)), lvl = up === undefined ? OIL : OIL + 60 * ease(cl(up / .6));
  pan += '<path d="M' + (X0 + 13) + ' ' + lvl + ' Q ' + ((X0 + X1) / 2) + ' ' + (lvl - bulge * 2) + ' ' + (X1 - 13) + ' ' + lvl + ' L' + (X1 - 36) + ' ' + (YB - 7) + ' L' + (X0 + 36) + ' ' + (YB - 7) + ' Z" fill="#FFB52E" opacity=".92"/>';
  s += pan;
  if (up === undefined) s += fire((X0 + X1) / 2, lvl - bulge, 460, 60 + 20 * vap, t, 7);
  // Wassertropfen: aus Schaltis Kolben, sinken auf den Boden
  if (ev.sinkt !== undefined && ev.dampf === undefined) for (let i = 0; i < 5; i++) { const e = ev.sinkt - .3 - i * .28; if (e < 0) continue;
    const tx = 355 + i * 85, c1 = cl(e / .45), c2 = ease(cl((e - .45) / 1.0)); const x = lerp(182, tx, c1), y = c1 < 1 ? lerp(760, OIL, c1) - 50 * Math.sin(Math.PI * c1) : lerp(OIL, YB - 34, c2);
    s += drop(x, y, 1.25); if (c1 >= 1 && c2 < .25) s += '<ellipse cx="' + tx + '" cy="' + OIL + '" rx="' + (20 + 90 * c2) + '" ry="' + (6 + 16 * c2) + '" fill="none" stroke="#fff" stroke-width="4" opacity="' + (1 - c2 * 4) + '"/>'; }
  if (ev.dampf !== undefined && up === undefined) for (let i = 0; i < 5; i++) { const tx = 355 + i * 85, k = ease(cl((ev.dampf - i * .07) / .7));
    if (k < .5) s += drop(tx + 5 * Math.sin(t * 50 + i), YB - 34, 1.25 * (1 - k));
    for (let j = 0; j < 4; j++) { const c = (t * 1.6 + j / 4 + i * .13) % 1; s += puff(tx + 26 * Math.sin(t * 4 + j + i), YB - 40 - (YB - 40 - OIL + 30) * c * k, (10 + 26 * c) * k, .85 * (1 - c * .7)); } }
  // Dampf schiesst hoch, Fett-Troepfchen fliegen, zuenden
  if (up !== undefined) { const CX = (X0 + X1) / 2, k = ease(cl(up / .5));
    s += '<path d="M' + (CX - 150) + ' ' + (YB - 20) + ' Q ' + (CX - 90) + ' ' + (YT - 40) + ' ' + (CX - 210 * k) + ' ' + (YT - 130 * k) + ' Q ' + CX + ' ' + (YT - 215 * k) + ' ' + (CX + 210 * k) + ' ' + (YT - 130 * k) + ' Q ' + (CX + 90) + ' ' + (YT - 40) + ' ' + (CX + 150) + ' ' + (YB - 20) + ' Z" fill="#fff" opacity=".55"/>';
    for (let j = 0; j < 7; j++) { const c = (t * 1.1 + j / 7) % 1; s += puff(CX - 190 + j * 64 + 20 * Math.sin(t * 3 + j), YT - 50 - 70 * c, 34 + 26 * c, .8 * (1 - c * .6)); }
    const lit = st === undefined ? 0 : cl(st / .5);
    for (let i = 0; i < 46; i++) { const a = -Math.PI * (.12 + .76 * rnd(i + 11)), sp = .7 + .6 * rnd(i + 23), c = ((up * .55 * sp) + rnd(i + 5)) % 1, d = 60 + 300 * c, x = CX + d * Math.cos(a) * 1.2, y = YT - 20 + d * Math.sin(a) * .4 + 50 * c * c;
      if (lit > 0) s += flame1(x, y + 14, 28 + 20 * lit, (30 + 36 * lit) * (1 - c * .4), t, i, i % 2 ? '#FF5A1A' : '#FFB020');
      s += '<circle cx="' + x + '" cy="' + y + '" r="' + (lit > 0 ? 7 : 9) + '" fill="' + (lit > 0 ? '#FFE98A' : '#FFB52E') + '" stroke="' + (lit > 0 ? 'none' : '#7A4A10') + '" stroke-width="3"/>'; }
    if (st !== undefined) { const g = back(cl(st / .5)), fl = 1 + .05 * Math.sin(t * 24); if (st < .16) s += '<rect width="1080" height="1920" fill="#fff" opacity="' + (.8 * (1 - st / .16)) + '"/>';
      for (let i = 0; i < 6; i++) { const u = i / 5; s += '<circle cx="' + (CX + 40 * Math.sin(t * 5 + i)) + '" cy="' + (YT - 95 - 55 * u * g) + '" r="' + ((95 - 42 * u) * g * fl) + '" fill="' + lc('#FF4A1A', '#FFE98A', u) + '"/>'; } }
  }
  // Vergleich 1 Liter Wasser -> 1700 Liter Dampf (Kantenlaenge rund 12-fach)
  if (cmp) { const e = ev.liter, k = ease(cl((e - .5) / 1.7)), n = Math.round(1 + 1699 * k), sz = lerp(32, 384, k), dim = cl(e / .3);
    s += '<rect width="1080" height="1920" fill="#0B1020" opacity="' + (.86 * dim) + '"/>';
    s += '<g opacity="' + dim + '"><rect x="150" y="' + (1094 - 32) + '" width="32" height="32" rx="6" fill="#3BB8FF" stroke="#fff" stroke-width="4"/>' + svgT(166, 1030, '1 L', 50, '#3BB8FF') + svgT(166, 976, 'Wasser', 34, '#AEB9D6');
    s += '<path d="M250 1078 H' + (330) + '" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M322 1060 L350 1078 L322 1096 Z" fill="#fff"/>';
    s += '<rect x="400" y="' + (1094 - sz) + '" width="' + sz + '" height="' + sz + '" rx="' + (6 + 20 * k) + '" fill="#F4F6FB" opacity=".92"/>';
    for (let j = 0; j < 6; j++) { const c = (t * .7 + j / 6) % 1; s += puff(400 + sz * rnd(j + 3), 1094 - sz * c, 10 + 18 * k, .5 * k * (1 - c)); }
    if (k > .35) s += svgT(400 + sz / 2, 1094 - sz / 2 + 10, n + ' L', 30 + 62 * k, '#0B1020') + (k > .7 ? svgT(400 + sz / 2, 1094 - sz / 2 + 74, 'Dampf', 44, '#56618A') : '');
    s += '</g>'; }
  h += slot(ev, [['sinkt', 'Wasser sinkt ins heiße Fett'], ['dampf', 'Verdampft schlagartig', 'hot'], ['liter', '1 Liter Wasser = 1700 Liter Dampf', 'red'], ['hoch', 'Dampf reißt Fett mit', 'hot'], ['act', 'Tröpfchen + Luft = Stichflamme', 'red']]);
  return W(s + topShade(), h);
};
WMASC.c1dampf = (ev, t) => {
  if (ev.act !== undefined) return { f: [220 - 30 * cl(ev.act / .3), 1537], s: 1, r: -10 + 3 * Math.sin(t * 18) * (1 - cl(ev.act / 1.2)) };
  if (ev.hoch !== undefined) return { f: [220, 1537], s: 1, r: 4 * Math.sin(t * 16) };
  if (ev.liter !== undefined) return BIG();
  if (ev.dampf !== undefined) return { f: [112 + 4 * Math.sin(t * 30), 902], s: .5, r: 8 * Math.sin(t * 22), flip: true };
  if (ev.sinkt !== undefined && ev.sinkt > .15) return { f: [112, 902], s: .5, r: -10 - 6 * Math.abs(Math.sin(t * 5)), flip: true };
  return BIG();
};

// ---------- Teil 3: Sauerstoff weg, Herd aus, Deckel drauf, sonst 112 ----------
WORLD.c1deckel = function (sc, ev, t, lt) {
  let s = kitchen(t, '#081410', '#12352A', '#5CE1FF'), h = '';
  const PX = 470, PY = 1010, d = ev.deckel, off = d === undefined ? 0 : ease(cl(d / .5)), down = d === undefined ? 0 : ease(cl((d - .45) / .8)), lidY = lerp(720, PY - 4, down), on = down >= 1;
  const er = ev.erstickt === undefined ? 0 : ease(cl(ev.erstickt / 1.6)), cold = ev.kalt === undefined ? 0 : ease(cl(ev.kalt / 2.2)), call = ev.act;
  s += hob(PX, PY + 72, 560, 1 - off) + panS(PX, PY, 360, true);
  // Drehknopf
  s += '<g transform="translate(712 1105) rotate(' + (-120 * off) + ')"><circle r="20" fill="#C9CFDD" stroke="#0B1020" stroke-width="5"/><rect x="-4" y="-19" width="8" height="16" rx="4" fill="#FF5A5A"/></g>';
  const fh = on ? 70 * (1 - er) : 150 - 40 * down;
  s += fire(PX, PY, 290, fh, t, 5);
  if (on && er > .3) for (let i = 0; i < 3; i++) { const c = (t * .5 + i / 3) % 1; s += puff(PX - 60 + i * 60, PY - 20 - 60 * c, 10 + 14 * c, .35 * (1 - c) * (1 - cold)); }
  // Sauerstoff: stroemt zur Flamme, prallt spaeter am Deckel ab
  if (ev.o2 !== undefined && call === undefined) { const vis = cl(ev.o2 / .4) * (1 - cold);
    for (let i = 0; i < 9; i++) { const a = -Math.PI * (.06 + .88 * (i + .5) / 9), ph = (t * .45 + rnd(i + 2)) % 1; let r;
      if (!on) r = lerp(430, 70, ph); else { const tri = ph < .5 ? ph * 2 : 2 - ph * 2; r = lerp(430, 235, tri); }
      const x = PX + r * Math.cos(a) * 1.05, y = PY - 10 + r * Math.sin(a) * .78; if (y < 690) continue;
      s += '<g opacity="' + (vis * (on ? 1 : 1 - cl((ph - .8) / .2))) + '">' + o2(x, y, t * 90 + i * 40) + '</g>'; } }
  // Deckel aus Glas
  if (d !== undefined) s += '<g transform="translate(' + PX + ' ' + lidY + ')"><path d="M-186 0 Q 0 -120 186 0 Z" fill="rgba(155,231,255,.2)" stroke="#E6F4FF" stroke-width="8" stroke-linejoin="round"/><rect x="-196" y="-6" width="392" height="14" rx="7" fill="#C9CFDD"/><rect x="-26" y="-88" width="52" height="24" rx="10" fill="#C9CFDD" stroke="#0B1020" stroke-width="4"/></g>';
  if (ev.kalt !== undefined && call === undefined) { s += thermoC(840, lerp(280, 40, cold)); }
  if (call !== undefined) { const k = cl(call / .3), g = back(k);
    s += '<rect width="1080" height="1920" fill="#0B1020" opacity="' + (.85 * k) + '"/>';
    s += '<g opacity="' + k + '"><rect x="150" y="760" width="190" height="330" rx="10" fill="#26335E" stroke="#fff" stroke-width="8"/><path d="M150 760 L' + (150 + 150 * ease(cl((call - .2) / .6))) + ' 790 L' + (150 + 150 * ease(cl((call - .2) / .6))) + ' 1120 L150 1090 Z" fill="#8A93A8" stroke="#fff" stroke-width="6" stroke-linejoin="round"/></g>';
    const run = cl((call - .1) / .8); s += '<path d="M' + (560 - 150 * run) + ' 925 H' + (440 - 150 * run) + '" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity="' + (k * (1 - run * .3)) + '"/><path d="M' + (450 - 150 * run) + ' 895 L' + (400 - 150 * run) + ' 925 L' + (450 - 150 * run) + ' 955 Z" fill="#fff" opacity="' + k + '"/>';
    s += '<g transform="translate(700 990) scale(' + (g * (1 + .05 * Math.sin(t * 9))) + ') rotate(-4)">' + '<rect x="-190" y="-150" width="380" height="210" rx="34" fill="#FF3B3B" stroke="#fff" stroke-width="10"/>' + svgT(0, 20, '112', 170, '#fff') + '</g>'; }
  h += slot(ev, [['o2', 'Feuer braucht Sauerstoff'], ['deckel', 'Herd aus, Deckel drauf', 'hot'], ['erstickt', 'Ohne Luft: Flamme erstickt'], ['kalt', 'Drauflassen, bis es kalt ist'], ['act', 'Sonst: raus, Tür zu, 112', 'red']]);
  return W(s + topShade(), h);
};
WMASC.c1deckel = (ev, t) => {
  if (ev.act !== undefined || ev.kalt !== undefined) return BIG();
  if (ev.erstickt !== undefined) { const k = ease(cl(ev.erstickt / .45)); return { f: [lerp(220, 470, k), lerp(1537, 918, k) - 160 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), r: k < 1 ? -20 * Math.sin(Math.PI * k) : 0 }; }
  return BIG();
};

// ---------- Schluss: Pfanne mit Deckel, Feuer aus ----------
WORLD.c1outro = function (sc, ev, t) {
  let s = kitchen(t, '#081410', '#12352A', '#FF6BD6');
  s += hob(640, 1092, 480, 0) + panS(640, 1030, 300) + '<g transform="translate(640 1026)"><path d="M-156 0 Q 0 -100 156 0 Z" fill="rgba(155,231,255,.2)" stroke="#E6F4FF" stroke-width="8" stroke-linejoin="round"/><rect x="-166" y="-6" width="332" height="14" rx="7" fill="#C9CFDD"/><rect x="-24" y="-76" width="48" height="22" rx="10" fill="#C9CFDD" stroke="#0B1020" stroke-width="4"/></g>';
  return W(s + topShade());
};
