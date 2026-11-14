// Chemie C004 "Warum schwimmt Eis?" (Bauplan wie C001). Etikett y=600, Grafik y=700 bis 1130.

// ---------- Helfer ----------
function iceCube(x, y, s, rot) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')"><rect x="-50" y="-50" width="100" height="100" rx="18" fill="#CFF1FF" stroke="#fff" stroke-width="7"/><path d="M-30 -28 L-6 -28 M-30 -28 L-30 -6" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M18 30 L32 16" stroke="#8ED6F5" stroke-width="6" stroke-linecap="round"/></g>'; }
// Wassermolekuel: O rot, zwei H weiss
function h2o(x, y, rot, s) { s = s || 1; return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')"><circle cx="-17" cy="15" r="11" fill="#fff" stroke="#0B1020" stroke-width="3"/><circle cx="17" cy="15" r="11" fill="#fff" stroke="#0B1020" stroke-width="3"/><circle r="20" fill="#FF4D4D" stroke="#0B1020" stroke-width="3"/></g>'; }
function beaker(x, y, w, hgt, liq, lvl, t) { let wv = 'M' + (x + 6) + ' ' + lvl; for (let i = 0; i <= 10; i++) wv += ' L' + (x + 6 + (w - 12) * i / 10) + ' ' + (lvl + 5 * Math.sin(i * 1.3 + t * 3));
  return '<path d="' + wv + ' L' + (x + w - 6) + ' ' + (y + hgt - 6) + ' L' + (x + 6) + ' ' + (y + hgt - 6) + ' Z" fill="' + liq + '" opacity=".8"/><path d="M' + x + ' ' + y + ' L' + x + ' ' + (y + hgt - 24) + ' Q' + x + ' ' + (y + hgt) + ' ' + (x + 24) + ' ' + (y + hgt) + ' L' + (x + w - 24) + ' ' + (y + hgt) + ' Q' + (x + w) + ' ' + (y + hgt) + ' ' + (x + w) + ' ' + (y + hgt - 24) + ' L' + (x + w) + ' ' + y + '" fill="none" stroke="#F4F6FB" stroke-width="9" stroke-linecap="round"/>'; }
function fish(x, y, s, dir, t, col) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s * dir) + ' ' + s + ')"><path d="M-40 0 Q0 -32 44 0 Q0 32 -40 0 Z" fill="' + col + '" stroke="#0B1020" stroke-width="4"/><path d="M-36 0 L-66 ' + (-22 + 6 * Math.sin(t * 9)) + ' L-66 ' + (22 + 6 * Math.sin(t * 9)) + ' Z" fill="' + col + '" stroke="#0B1020" stroke-width="4" stroke-linejoin="round"/><circle cx="22" cy="-5" r="5" fill="#0B1020"/></g>'; }
function c4st(a) { if (a === undefined || a < .5) return 0; if (a < 1.9) return 70 * Math.abs(Math.sin(Math.PI * (a - .5) / .7)); if (a < 2.2) return -30 * Math.sin(Math.PI * (a - 1.9) / .3); return 0; }
const ice4 = (t) => kitchen(t, '#061426', '#12406A', '#BFEAFF');
// Wabengitter: Dreiecksgitter, jeder dritte Punkt ist ein Loch
const C4G = (() => { const pts = [], holes = [], A = 140, RH = A * .866; for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) { const x = 150 + i * A + (j % 2) * A / 2, y = 745 + j * RH, q = i - Math.floor(j / 2); (((q - j) % 3 + 3) % 3 === 0 ? holes : pts).push([x, y]); }
  const br = []; for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) if (Math.abs(Math.hypot(pts[a][0] - pts[b][0], pts[a][1] - pts[b][1]) - A) < 4) br.push([a, b]); return { pts, holes, br }; })();

// ---------- Einstieg: Schalti drueckt den Eiswuerfel runter, er schiesst hoch und trifft ihn ----------
WORLD.h7c4 = function (sc, ev, t, lt) {
  const e = ev.bonk, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e, t), CX = 560, GY = 720, GH = 400, GW = 330, LV = 800;
  let s = stage7(t, lt, '#061426', e === undefined ? '#5CC8FF' : '#BFEAFF', CX, 900), o = '';
  const down = ease(cl((k - .15) / .7)); let ix = CX, iy = lerp(LV - 14, GY + GH - 70, down) + (down < .05 ? 6 * Math.sin(t * 3) : 0), ir = 8 * Math.sin(t * 2);
  if (e !== undefined) { if (e < .12) iy = lerp(GY + GH - 70, GY - 60, e / .12); else { const c = cl((e - .12) / .38); ix = lerp(CX, 300, c); iy = lerp(GY - 60, 1320, c) - 300 * Math.sin(Math.PI * c); ir = 500 * c; if (c >= 1) { const c2 = cl((e - .5) / .7); ix = 300 + 280 * c2; iy = 1320 - 220 * Math.sin(Math.PI * .9 * c2) + 520 * c2 * c2; ir = 500 + 300 * c2; } } }
  o += beaker(CX - GW / 2, GY, GW, GH, '#3BA8FF', LV, t);
  if (e === undefined && down > .05) o += '<path d="M' + (CX + 250) + ' ' + (iy - 190) + ' Q' + (CX + 90) + ' ' + (iy - 180) + ' ' + CX + ' ' + (iy - 62) + '" stroke="#FF6BD6" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="' + CX + '" cy="' + (iy - 62) + '" r="20" fill="#FFD23F"/>';
  if (e !== undefined && e < .5) for (let i = 0; i < 9; i++) { const c = cl(e / .5), a = -Math.PI * (.15 + .7 * rnd(i + 2)), d = 60 + 260 * c; o += drop(CX + d * Math.cos(a), GY + 20 + d * Math.sin(a) + 240 * c * c, 1.1, '#7FD3FF'); }
  o += iceCube(ix, iy, 1.25, ir);
  if (e !== undefined && e > .5) for (let i = 0; i < 5; i++) { const a = t * 4 + i * 1.257; o += '<path transform="translate(' + (250 + 110 * Math.cos(a)) + ' ' + (1230 + 34 * Math.sin(a)) + ') scale(' + (1 - cl((e - 2.2) / .5)) + ')" d="M0 -22 L6 -7 L22 -7 L9 3 L14 20 L0 10 L-14 20 L-9 3 L-22 -7 L-6 -7 Z" fill="#FFE14D" stroke="#0B1020" stroke-width="3"/>'; }
  s += pop7(CX, 900, lt, o) + sweat7(t, e === undefined ? k : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7c4 = (ev, t, lt, sc) => { const e = ev.bonk, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined && e > .5) { const b = cl((e - .5) / .25); return { f: [220 - 30 * b, 1537], s: 1, r: -12 * b + 6 * Math.sin(t * 7) }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 14) };
};

// ---------- Teil 1: fast alles sinkt fest im eigenen Fluessigen, Wasser nicht ----------
WORLD.c4dichte = function (sc, ev, t, lt) {
  let s = ice4(t), h = '';
  const BY = 780, BH = 320, BW = 300, LV = 860, w = ev.wasser, wk = w === undefined ? 0 : back(cl(w / .45));
  // links: anderer Stoff, fester Brocken sinkt
  const sk = ease(cl(((ev.sinkt || 0) - .6) / 1.6)), cy = lerp(LV - 70, BY + BH - 62, sk);
  s += beaker(110, BY, BW, BH, '#FFB52E', LV, t) + '<rect x="' + (260 - 48) + '" y="' + (cy - 48) + '" width="96" height="96" rx="16" fill="#D9861A" stroke="#fff" stroke-width="6" transform="rotate(' + (20 * sk) + ' 260 ' + cy + ')"/>';
  if (sk > 0 && sk < 1) s += '<path d="M260 ' + (cy + 70) + ' v40 m-14 -16 l14 18 l14 -18" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  s += svgT(260, BY + BH + 52, 'anderer Stoff', 34, '#FFCF8A');
  if (w !== undefined) { const bob = 8 * Math.sin(t * 2.4), up = ev.act === undefined ? 0 : 1;
    s += '<g transform="translate(680 ' + (BY + BH / 2) + ') scale(' + wk + ') translate(-680 ' + (-(BY + BH / 2)) + ')">' + beaker(530, BY, BW, BH, '#3BA8FF', LV, t) + iceCube(680, LV - 8 + bob + c4st(ev.act), 1, 6 * Math.sin(t * 1.7)) + svgT(680, BY + BH + 52, 'Wasser', 34, '#9BE0FF') + '</g>';
    if (up) for (const d of [-1, 1]) { const p = 10 * Math.abs(Math.sin(t * 5)); s += '<path d="M' + (680 + d * 92) + ' ' + (LV + 40 - p) + ' v-50 m-14 16 l14 -18 l14 18" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="' + cl(ev.act / .3) + '"/>'; }
    if (ev.leicht !== undefined) { const k = ev.leicht; s += badge(680, 980, 'Wasser 1,00', '#3BA8FF', (k - .5) / .3, 34) + (ev.act === undefined ? badge(680, 742, 'Eis 0,92', '#CFF1FF', k / .3, 34) : '') + (k > 1 ? svgT(680, 1042, 'Gramm pro cm³', 28, '#D6EEFF') : ''); } }
  h += slot(ev, [['sinkt', 'Fest ist meist dichter: sinkt'], ['wasser', 'Wasser: genau andersrum', 'hot'], ['leicht', 'Eis ist leichter als Wasser'], ['act', 'Also schwimmt es oben', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.c4dichte = (ev, t) => { if (ev.act === undefined) return BIG(); const a = ev.act, k = ease(cl(a / .5)), bob = 8 * Math.sin(t * 2.4), fly = a > 1.9 && a < 2.7 ? 150 * Math.sin(Math.PI * (a - 1.9) / .8) : 0; return { f: [lerp(220, 680, k), lerp(1537, 802 + bob + c4st(a), k) - 220 * Math.sin(Math.PI * k) - fly], s: lerp(1, .55, k), r: k < 1 ? 0 : (fly > 0 ? 360 * (a - 1.9) / .8 : 6 * Math.sin(t * 1.7)) }; };

// ---------- Teil 2: dicht gedraengt fluessig, Gitter aus Sechsecken mit Loechern, 9 Prozent mehr Platz ----------
WORLD.c4gitter = function (sc, ev, t, lt) {
  let s = ice4(t), h = '';
  const G = C4G, b = ev.bruecken, k = b === undefined ? 0 : ease(cl(b / 1.8)), gi = ev.gitter, pl = ev.platz, a = ev.act, CXm = 480, CYm = 940;
  if (pl === undefined) {
    s += '<rect x="80" y="690" width="800" height="470" rx="40" fill="' + lc('#0E3A66', '#1B5C8A', k) + '" stroke="' + lc('#3BA8FF', '#CFF1FF', k) + '" stroke-width="8"/>';
    const P = G.pts.map((p, i) => { const lx = CXm + ((i % 5) - 2) * 62 + (rnd(i + 11) - .5) * 30 + 14 * Math.sin(t * (2.5 + rnd(i)) + i * 2), ly = CYm - 10 + (Math.floor(i / 5) - 1) * 66 + (rnd(i + 31) - .5) * 24 + 14 * Math.cos(t * (2.2 + rnd(i + 3)) + i); return [lerp(lx, p[0], k) + (k >= 1 ? 2 * Math.sin(t * 9 + i) : 0), lerp(ly, p[1], k)]; });
    if (k > .5) for (const [x, y] of G.br) s += '<line x1="' + P[x][0] + '" y1="' + P[x][1] + '" x2="' + P[y][0] + '" y2="' + P[y][1] + '" stroke="#CFF1FF" stroke-width="6" stroke-dasharray="6 10" stroke-linecap="round" opacity="' + cl((k - .5) * 2) + '"/>';
    if (gi !== undefined) G.holes.forEach((p, i) => { const g = back(cl((gi - .2 - i * .1) / .4)); if (p[0] < 820) s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (44 * g * (1 + .06 * Math.sin(t * 5 + i))) + '" fill="rgba(255,255,255,.1)" stroke="#fff" stroke-width="5" stroke-dasharray="10 9"/>'; });
    P.forEach((p, i) => { s += h2o(p[0], p[1], lerp(t * 60 * (rnd(i + 2) - .5) * 2 + i * 40, i * 60, k), 1); });
  } else { // Vergleich: gleiche Masse, Eis braucht 9 Prozent mehr Platz
    const g = ease(cl((pl - .4) / 1.4)), n = Math.round(9 * g), wW = 250, iW = wW * (1 + .09 * g * 1.0), base = 1090, fl = a === undefined ? 0 : .45 * ease(cl(a / 1.2));
    s += '<rect x="130" y="' + (base - wW) + '" width="' + wW + '" height="' + wW + '" rx="20" fill="#3BA8FF" stroke="#fff" stroke-width="7"/>' + svgT(255, base - wW / 2 + 16, 'Wasser', 44, '#06223C');
    s += '<rect x="' + (530 - (iW - wW) / 2) + '" y="' + (base - iW - 150 * fl) + '" width="' + iW + '" height="' + iW + '" rx="20" fill="#CFF1FF" stroke="#fff" stroke-width="7"/>' + svgT(655, base - iW / 2 + 16 - 150 * fl, 'Eis', 48, '#06223C');
    s += '<rect x="' + (530 - (iW - wW) / 2) + '" y="' + (base - iW - 150 * fl) + '" width="' + iW + '" height="' + (iW - wW) + '" rx="10" fill="#FF6BD6" opacity="' + (.75 * g) + '"/><rect x="' + (530 + wW + (iW - wW) / 2 - (iW - wW)) + '" y="' + (base - iW - 150 * fl) + '" width="' + (iW - wW) + '" height="' + iW + '" rx="10" fill="#FF6BD6" opacity="' + (.75 * g) + '"/>';
    s += svgT(655, base - iW - 26 - 150 * fl, '+' + n + ' %', 60, '#FF6BD6');
    if (a !== undefined) { let wv = 'M440 ' + (base + 20); for (let i = 0; i <= 12; i++) wv += ' L' + (440 + 440 * i / 12) + ' ' + (base - 60 + 6 * Math.sin(i + t * 3)); s += '<path d="' + wv + ' L880 ' + (base + 20) + ' Z" fill="#3BA8FF" opacity="' + (.6 * fl) + '"/>'; }
    s += svgT(255, base + 52, 'gleiche Masse', 32, '#D6EEFF'); }
  h += slot(ev, [['fluessig', 'Flüssig: dicht gedrängt'], ['bruecken', 'Brücken halten sie auf Abstand', 'hot'], ['gitter', 'Sechsecke mit Löchern'], ['platz', 'Eis braucht 9 % mehr Platz', 'red'], ['act', 'Mehr Platz, gleiche Masse: leichter', 'hot']]);
  return W(s + topShade(), h);
};
const C4H = C4G.holes.filter(p => p[0] > 300 && p[0] < 700 && p[1] > 820 && p[1] < 1010)[0] || [500, 900];
WMASC.c4gitter = (ev, t) => { if (ev.gitter === undefined || ev.platz !== undefined) return BIG(); const k = ease(cl((ev.gitter - 1.0) / .5)); if (k <= 0) return BIG(); return { f: [lerp(220, C4H[0], k), lerp(1537, C4H[1] + 36, k) - 220 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), r: k < 1 ? 0 : 8 * Math.sin(t * 5) }; };

// ---------- Teil 3: Eisberg (1/10 sichtbar), See friert von oben zu, Fische ueberleben ----------
WORLD.c4see = function (sc, ev, t, lt) {
  let s = '', h = '';
  if (ev.see === undefined) { const WL = 820, r = ev.rest === undefined ? 0 : ease(cl(ev.rest / 1.0)), bob = 5 * Math.sin(t * 1.6);
    s += '<defs><linearGradient id="c4s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B3C6A"/><stop offset="1" stop-color="#8FC6EA"/></linearGradient></defs><rect width="1080" height="' + WL + '" fill="url(#c4s)"/><rect y="' + WL + '" width="1080" height="' + (1920 - WL) + '" fill="#0A3A66"/>';
    s += '<g transform="translate(0 ' + bob + ')"><path d="M330 ' + WL + ' L360 ' + (WL + 120) + ' L300 ' + (WL + 230) + ' L400 ' + (WL + 330) + ' L560 ' + (WL + 300) + ' L640 ' + (WL + 190) + ' L600 ' + (WL + 90) + ' L640 ' + WL + ' Z" fill="#BFEAFF" opacity="' + (.25 + .7 * r) + '" stroke="#fff" stroke-width="' + (6 * r) + '"/><path d="M400 ' + WL + ' L440 ' + (WL - 44) + ' L480 ' + (WL - 30) + ' L520 ' + (WL - 62) + ' L570 ' + WL + ' Z" fill="#F2FBFF" stroke="#fff" stroke-width="6" stroke-linejoin="round"/></g>';
    let wv = 'M0 ' + WL; for (let i = 0; i <= 18; i++) wv += ' L' + (i * 60) + ' ' + (WL + 6 * Math.sin(i * .9 + t * 2)); s += '<path d="' + wv + '" stroke="#CFF1FF" stroke-width="7" fill="none"/>';
    if (ev.berg !== undefined && ev.berg > .5) s += '<path d="M700 ' + (WL - 62) + ' h30 v58 h-30" stroke="#fff" stroke-width="6" fill="none"/>' + svgT(745, WL - 18, '1/10', 50, '#fff', 'start');
    if (r > .5) s += '<path d="M700 ' + (WL + 10) + ' h30 v318 h-30" stroke="#fff" stroke-width="6" fill="none" opacity="' + cl((r - .5) * 2) + '"/>' + svgT(745, WL + 186, '9/10', 64, '#BFEAFF', 'start');
  } else { const z = ease(cl(ev.see / 2.2)), SY = 800, a = ev.act;
    s += '<defs><linearGradient id="c4w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F6FA8"/><stop offset="1" stop-color="#08294A"/></linearGradient></defs><rect width="1080" height="' + SY + '" fill="#1B2C4E"/><rect y="' + SY + '" width="1080" height="1120" fill="url(#c4w)"/>';
    s += '<path d="M0 ' + (SY - 40) + ' Q100 ' + (SY - 70) + ' 150 ' + SY + ' L0 ' + SY + ' Z M1080 ' + (SY - 60) + ' Q960 ' + (SY - 80) + ' 900 ' + SY + ' L1080 ' + SY + ' Z" fill="#F2FBFF"/>';
    for (let i = 0; i < 14; i++) { const c = (t * .12 + rnd(i + 4)) % 1; s += '<circle cx="' + (rnd(i + 60) * 1000 + 20 * Math.sin(t + i)) + '" cy="' + (300 + (SY - 320) * c) + '" r="' + (4 + 4 * rnd(i)) + '" fill="#fff" opacity=".8"/>'; }
    // Eisdecke waechst von den Raendern zur Mitte
    s += '<rect x="130" y="' + SY + '" width="' + (395 * z) + '" height="46" fill="#CFF1FF" stroke="#fff" stroke-width="5"/><rect x="' + (920 - 395 * z) + '" y="' + SY + '" width="' + (395 * z) + '" height="46" fill="#CFF1FF" stroke="#fff" stroke-width="5"/>';
    if (a !== undefined) { const k = cl(a / .5); for (let i = 0; i < 4; i++) { const dir = i % 2 ? 1 : -1, ph = (t * .08 * (1 + .3 * i) + i * .27) % 1, x = dir > 0 ? 180 + 660 * ph : 840 - 660 * ph; s += '<g opacity="' + k + '">' + fish(x, 920 + i * 52 + 8 * Math.sin(t * 2 + i), .8 + .12 * i, dir, t + i, ['#FFB020', '#FF6BD6', '#8BD450', '#FFD23F'][i]) + '</g>'; }
      s += badge(790, 1090, 'unten: 4 °C', '#3BA8FF', (a - .8) / .3, 34); } }
  h += slot(ev, [['berg', 'Eisberg: nur 1/10 sichtbar'], ['rest', '9/10 stecken unter Wasser', 'hot'], ['see', 'Seen frieren von oben zu'], ['act', 'Darunter bleibt es flüssig', 'hot']]);
  return W(s + topShade(true), h);
};
function c4slip(q, t, see) { const edge = 920 - 395 * ease(cl(see / 2.2)) + 70;
  if (q < .6) return { f: [Math.max(edge, 890 - 90 * q / .6), 800 - 10 * Math.abs(Math.sin(t * 12))], s: .62, r: 5 * Math.sin(t * 12), flip: true };
  if (q < .95) { const k = (q - .6) / .35; return { f: [Math.max(edge, 800 - 40 * k), 800 - 90 * Math.sin(Math.PI * k)], s: .62, r: -360 * k + 22 * k, flip: true }; }
  const k = cl((q - .95) / 1.3), d = 1 - (1 - k) * (1 - k); return { f: [Math.max(edge, 760 - 120 * d), 800], s: .62, r: 22 + 5 * Math.sin(t * 14) * (1 - k), flip: true }; }
WMASC.c4see = (ev, t) => {
  if (ev.see === undefined || ev.see < .35) return BIG();
  if (ev.act === undefined) return c4slip(ev.see - .35, t, ev.see);
  const p = c4slip(ev.see - .35, t, ev.see), up = ease(cl((ev.act - .5) / .6)); return { f: [p.f[0], p.f[1]], s: .62, r: p.r * (1 - up) + (up >= 1 ? 5 * Math.sin(t * 3) : 0), flip: true };
};

// ---------- Schluss ----------
WORLD.c4outro = function (sc, ev, t) { return W(ice4(t) + beaker(520, 890, 280, 240, '#3BA8FF', 950, t) + iceCube(660, 942 + 6 * Math.sin(t * 2.4), 1, 5 * Math.sin(t * 1.7)) + topShade()); };
