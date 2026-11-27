// B027 Schicht fuer Schicht: Wie ist deine Hand aufgebaut? (rechte Hand, Handflaeche zum Betrachter), stumme Demo v1 (27.11.2026).
// Schichten von innen nach aussen: 1 Knochen, 2 Gelenkknorpel, 3 Baender, 4 Sehnen, 5 kleine Handmuskeln, 6 Haut. Mit Abschnitt Neue Werkzeuge.
// Schema, kein Atlas-Nachbau: 8 Handwurzelknochen, 5 Mittelhandknochen, 14 Fingerknochen (Daumen 2, sonst 3). Sehnen laufen unten aus dem Bild Richtung Unterarm.
// Nutzt laborS, labelL, lupeS, shadeS, txtS, COLS (viz_schicht.js), BIG3, stay3, slot, look3. Zum Loeschen: diese Datei und videos/B027.
const ZX27 = 622, ZY27 = 940, ZZ27 = .74, NOTE27 = 'Rechte Hand, Handfläche';
const ZC27 = { bone: COLS.bone, cart: COLS.cart, lig: COLS.lig, ten: '#F2E2B8', mus: COLS.mus, skin: '#F2C29A' };
const ROWS27 = [['Knochen', ZC27.bone], ['Knorpel', ZC27.cart], ['Bänder', ZC27.lig], ['Sehnen', ZC27.ten], ['Handmuskeln', ZC27.mus], ['Haut', ZC27.skin]];
const PX27 = (lx) => ZX27 + lx * ZZ27, PY27 = (ly) => ZY27 + ly * ZZ27;
const QL27 = (lx, ly, ty, de, la, k) => labelL(Math.round(PX27(lx)), Math.round(PY27(ly)), 712, ty, de, la, k, 1);
const ff27 = (x) => x.split('font-family="Inter Display"').join('font-family="Inter Display, Inter, Arial, sans-serif"');
const LX27 = 852, LY27 = 1040;
const spot27 = (k) => k > 0 ? '<circle cx="' + LX27 + '" cy="' + LY27 + '" r="92" fill="#02030F" opacity="' + (.55 * cl(k)).toFixed(2) + '"/>' : '';
const mark27 = (t, lx, ly, r) => '<circle cx="' + PX27(lx).toFixed(0) + '" cy="' + PY27(ly).toFixed(0) + '" r="' + r + '" fill="none" stroke="' + TH().hl + '" stroke-width="6" stroke-dasharray="16 10"/>';

// ---------- Geometrie (Modell-Koordinaten, Fingerspitzen oben) ----------
// Finger: [x Spitze, Laengenfaktor]; Zeigefinger bis kleiner Finger
const FING27 = [[-112, .95], [-36, 1.05], [40, 1], [112, .82]];
function seg27(f) { const [x, z] = f, xb = x * .55; // Mittelhand von (xb,150) bis (x*.9,-40), dann drei Glieder
  const mh = [[xb, 150], [x * .9, -40]], p1 = [[x * .92, -52], [x * .96, -52 - 100 * z]], p2 = [[x * .97, -64 - 100 * z], [x, -64 - 170 * z]], p3 = [[x, -76 - 170 * z], [x, -76 - 222 * z]];
  return [mh, p1, p2, p3]; }
const THUMB27 = [[[-122, 150], [-196, 40]], [[-204, 28], [-252, -40]], [[-258, -52], [-280, -104]]];
const CARP27 = [[-88, 172], [-40, 178], [8, 176], [56, 170], [-80, 222], [-30, 228], [22, 226], [70, 218]];
const rod27 = (a, b, w, fill, k) => '<path d="M' + a[0].toFixed(0) + ' ' + a[1].toFixed(0) + ' L' + b[0].toFixed(0) + ' ' + b[1].toFixed(0) + '" stroke="#0B1020" stroke-width="' + (w + 6) + '" stroke-linecap="round" opacity="' + k + '"/><path d="M' + a[0].toFixed(0) + ' ' + a[1].toFixed(0) + ' L' + b[0].toFixed(0) + ' ' + b[1].toFixed(0) + '" stroke="' + fill + '" stroke-width="' + w + '" stroke-linecap="round" opacity="' + k + '"/>';
const SKIN27 = 'M-150 260 L-140 150 Q-170 110 -210 60 L-270 -30 Q-300 -80 -286 -120 Q-266 -138 -246 -110 L-200 -40 L-160 -20 L-150 -150 Q-150 -170 -130 -176 L-130 -300 Q-112 -330 -92 -300 L-80 -40 L-66 -60 L-60 -330 Q-36 -366 -12 -330 L4 -60 L16 -60 L22 -330 Q46 -358 70 -330 L76 -40 L86 -60 L90 -270 Q112 -296 134 -270 L138 -30 Q140 40 120 130 L130 260 Z';
function hand27(t, o) { o = o || {}; const l = o.l || [1, 1, 1, 1, 1, 1], z = o.z || ZZ27, cy = o.cy || ZY27, sq = o.sq || 0;
  let s = '<g transform="translate(' + ZX27 + ' ' + cy.toFixed(1) + ') scale(' + (z * (1 + .04 * sq)).toFixed(3) + ')">';
  // 6 Haut: Flaeche hinten durchscheinend, Umriss vorne
  if (l[5] > 0) s += '<path d="' + SKIN27 + '" fill="' + ZC27.skin + '" opacity="' + (.42 * cl(l[5])).toFixed(2) + '"/>';
  // 5 Handmuskeln: Daumenballen, Kleinfingerballen, Zwischenknochenmuskeln
  if (l[4] > 0) { const k = cl(l[4]).toFixed(2); s += '<g opacity="' + k + '"><path d="M-130 150 Q-190 80 -200 30 Q-150 0 -90 40 Q-80 110 -130 150 Z" fill="' + ZC27.mus + '" stroke="#0B1020" stroke-width="4"/><path d="M110 140 Q140 60 130 0 Q100 -10 80 40 Q80 110 110 140 Z" fill="' + ZC27.mus + '" stroke="#0B1020" stroke-width="4"/>';
    for (const x of [-74, 2, 76]) s += '<path d="M' + (x * .7) + ' 140 Q' + (x * .95) + ' 50 ' + x + ' -30" stroke="' + ZC27.mus + '" stroke-width="20" fill="none" stroke-linecap="round" opacity=".85"/>'; s += '</g>'; }
  // 4 Sehnen: von den Fingerspitzen-Gliedern bis unten aus dem Bild
  if (l[3] > 0) { const k = cl(l[3]).toFixed(2); s += '<g opacity="' + k + '">';
    FING27.forEach(f => { const g = seg27(f), tip = g[3][1]; s += '<path d="M' + tip[0] + ' ' + (tip[1] + 30) + ' L' + g[0][1][0].toFixed(0) + ' ' + g[0][1][1] + ' Q' + (g[0][0][0] * .8).toFixed(0) + ' 200 ' + (g[0][0][0] * .5).toFixed(0) + ' 330" stroke="' + ZC27.ten + '" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="' + (o.glide ? '30 6' : 'none') + '" stroke-dashoffset="' + (o.glide ? (-t * 60).toFixed(0) : 0) + '"/>'; });
    s += '<path d="M-270 -90 L-200 30 Q-140 140 -70 330" stroke="' + ZC27.ten + '" stroke-width="12" fill="none" stroke-linecap="round"/></g>'; }
  // 1 Knochen
  if (l[0] > 0) { const k = cl(l[0]).toFixed(2); FING27.forEach(f => seg27(f).forEach((g, i) => { s += rod27(g[0], g[1], i ? 24 - i * 2 : 26, ZC27.bone, k); }));
    THUMB27.forEach((g, i) => { s += rod27(g[0], g[1], 26 - i * 2, ZC27.bone, k); });
    CARP27.forEach(([x, y], i) => { s += '<rect x="' + (x - 22) + '" y="' + (y - 20) + '" width="44" height="40" rx="14" fill="' + ZC27.bone + '" stroke="#0B1020" stroke-width="4" opacity="' + k + '" transform="rotate(' + (i * 17 % 30 - 15) + ' ' + x + ' ' + y + ')"/>'; }); }
  // 2 Gelenkknorpel an den Gelenkenden
  if (l[1] > 0) { const k = cl(l[1]).toFixed(2); const caps = []; FING27.forEach(f => { const g = seg27(f); for (let i = 0; i < 3; i++) caps.push([(g[i][1][0] + g[i + 1][0][0]) / 2, (g[i][1][1] + g[i + 1][0][1]) / 2]); }); caps.push([-200, 34], [-255, -46]);
    caps.forEach(([x, y]) => { s += '<ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="17" ry="8" fill="' + ZC27.cart + '" stroke="#0B1020" stroke-width="3" opacity="' + k + '"/>'; }); }
  // 3 Baender seitlich an den Fingergelenken
  if (l[2] > 0) { const k = cl(l[2]).toFixed(2); FING27.forEach(f => { const g = seg27(f); for (let i = 1; i < 3; i++) { const [x, y] = [(g[i][1][0] + g[i + 1][0][0]) / 2, (g[i][1][1] + g[i + 1][0][1]) / 2]; s += '<rect x="' + (x - 21) + '" y="' + (y - 14) + '" width="7" height="28" rx="3" fill="' + ZC27.lig + '" stroke="#0B1020" stroke-width="2.5" opacity="' + k + '"/><rect x="' + (x + 14) + '" y="' + (y - 14) + '" width="7" height="28" rx="3" fill="' + ZC27.lig + '" stroke="#0B1020" stroke-width="2.5" opacity="' + k + '"/>'; } }); }
  if (l[5] > 0) { s += '<path d="' + SKIN27 + '" fill="none" stroke="#0B1020" stroke-width="6" stroke-linejoin="round" opacity="' + cl(l[5]).toFixed(2) + '"/>';
    FING27.forEach(f => { const x = f[0], y = -76 - 222 * f[1] + 30; for (let j = 0; j < 3; j++) s += '<path d="M' + (x - 14 + j * 2) + ' ' + (y + j * 7) + ' q' + (14 - j * 2) + ' -12 ' + (28 - j * 4) + ' 0" stroke="#B8805A" stroke-width="2.5" fill="none" opacity="' + cl(l[5]).toFixed(2) + '"/>'; }); }
  return s + '</g>'; }
// Lupen-Inhalte (um 0/0, rund 90 breit)
const lupKn27 = () => '<rect x="-46" y="-12" width="40" height="24" rx="12" fill="' + COLS.bone + '" stroke="#0B1020" stroke-width="4"/><rect x="6" y="-12" width="40" height="24" rx="12" fill="' + COLS.bone + '" stroke="#0B1020" stroke-width="4"/><ellipse cx="-8" cy="0" rx="5" ry="14" fill="' + COLS.cart + '"/><ellipse cx="8" cy="0" rx="5" ry="14" fill="' + COLS.cart + '"/>';
const lupLei27 = () => { let s = '<circle r="44" fill="' + ZC27.skin + '"/>'; for (let i = 0; i < 7; i++) s += '<ellipse cx="0" cy="6" rx="' + (6 + i * 6) + '" ry="' + (4 + i * 6) + '" fill="none" stroke="#B8805A" stroke-width="3"/>'; return s; };

// ---------- Einstieg ----------
const gag27 = (sc, t) => { const L = sc.lines, g = typeof S !== 'undefined' && S.gagAt ? L[0].start + S.gagAt : L[L.length - 1].end + .15; return t >= g ? t - g : undefined; };
WORLD.h27hand = function (sc, ev, t, lt) { const e = gag27(sc, t), m = ev.mark; const sq = e !== undefined && e < .8 ? Math.sin(Math.PI * e / .8) : 0;
  let s = laborS(t, { rows: ROWS27, on: 6, cur: 0, cx: ZX27, note: NOTE27, w: 320, fs: 28 });
  s += hand27(t, { l: [1, 1, 1, 1, 1, 1], sq: sq, glide: lt < 4 ? 1 : 0 });
  if (lt < 4.5) { const k = cl((lt - .4) / .4) * (1 - cl((lt - 4) / .5)); s += '<g opacity="' + k.toFixed(2) + '"><path d="M' + PX27(-40) + ' ' + PY27(300) + ' v70" stroke="' + TH().hl + '" stroke-width="8" stroke-linecap="round"/><path d="M' + (PX27(-40) - 14) + ' ' + (PY27(300) + 56) + ' l14 16 l14 -16" stroke="' + TH().hl + '" stroke-width="8" fill="none" stroke-linecap="round"/></g>' + txtS(PX27(140), PY27(300) - 60, 'zum Unterarm', 30, 'start', k, TH().head, 800); }
  return W(ff27(s + shadeS())); };
WMASC.h27hand = (ev, t, lt, sc) => { const e = gag27(sc, t); if (e === undefined) return BIG3();
  const j = e < .9 ? Math.sin(Math.PI * e / .9) : 0; return stay3([220, 1537 - 36 * j], 1, { r: -10 * j, nospin: 1 }); };

// ---------- Teil 1: Knochen und Gelenkknorpel ----------
WORLD.b27a = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, bo = cl((lt - .2) / .8), ca = p2 === undefined ? 0 : cl((p2 - 1.2) / .8);
  let s = laborS(t, { rows: ROWS27, on: bo + ca, cur: p2 !== undefined ? 2 : 1, cx: ZX27, note: NOTE27, w: 320, fs: 28 });
  s += hand27(t, { l: [bo, ca, 0, 0, 0, 0] });
  if (p !== undefined && p1 === undefined) s += QL27(40, -200, 760, 'Knochen der Hand', 'Ossa manus', (p - .9) / .35);
  if (p1 !== undefined && p2 === undefined) { const g = [cl(p1 / .5), cl((p1 - 1.4) / .5), cl((p1 - 2.6) / .5)];
    s += '<rect x="' + PX27(-112) + '" y="' + PY27(150) + '" width="' + (190 * ZZ27) + '" height="' + (100 * ZZ27) + '" rx="16" fill="none" stroke="' + TH().hl + '" stroke-width="6" opacity="' + g[0].toFixed(2) + '"/>' + txtS(PX27(110) + 60, PY27(210), '8 Handwurzel', 28, 'start', g[0], TH().head, 800);
    s += txtS(PX27(110) + 60, PY27(70), '5 Mittelhand', 28, 'start', g[1], TH().head, 800) + txtS(PX27(110) + 60, PY27(-150), '14 Finger', 28, 'start', g[2], TH().head, 800); }
  if (p2 !== undefined) s += QL27(-36, -170, 820, 'Gelenkknorpel', 'Cartilago articularis', (p2 - 1.7) / .35);
  if (a !== undefined) s += spot27(a / .35) + mark27(t, -36, -168, 26) + lupeS(lupKn27(), a / .35, PX27(-36), PY27(-168), LX27, LY27);
  return W(ff27(s + shadeS()), slot(ev, [['panel', 'Schicht 1: Knochen'], ['p1', '27 Knochen pro Hand', 'hot'], ['p2', 'Schicht 2: Gelenkknorpel'], ['act', 'Glatt an den Gelenken', 'hot']], 596)); };
WMASC.b27a = (ev, t) => BIG3();

// ---------- Teil 2: Baender und Sehnen ----------
WORLD.b27b = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, li = cl((lt - .3) / .9), te = p2 === undefined ? 0 : cl((p2 - 1.0) / 1.2);
  let s = laborS(t, { rows: ROWS27, on: 2 + li + te, cur: p2 !== undefined ? 4 : 3, cx: ZX27, note: NOTE27, w: 320, fs: 28 });
  s += hand27(t, { l: [1, 1, li, te, 0, 0], glide: a !== undefined ? 1 : 0 });
  if (p !== undefined && p1 === undefined) s += QL27(70, -190, 760, 'Bänder', 'Ligamenta', (p - 1.2) / .35);
  if (p1 !== undefined && p2 === undefined) s += mark27(t, -36, -232, 30) + mark27(t, 40, -224, 30);
  if (p2 !== undefined) s += QL27(80, 60, 900, 'Sehnen', 'Tendines', (p2 - 1.6) / .35);
  if (a !== undefined) { const k = cl((a - .4) / .5); s += '<g opacity="' + k.toFixed(2) + '"><path d="M' + PX27(-20) + ' ' + PY27(250) + ' v80" stroke="' + TH().hl + '" stroke-width="8" stroke-linecap="round"/><path d="M' + (PX27(-20) - 14) + ' ' + (PY27(250) + 66) + ' l14 16 l14 -16" stroke="' + TH().hl + '" stroke-width="8" fill="none" stroke-linecap="round"/></g>' + txtS(PX27(140), PY27(250) - 20, 'Muskeln', 30, 'start', k, TH().head, 800) + txtS(PX27(140), PY27(250) + 18, 'im Unterarm', 30, 'start', k, TH().head, 800); }
  return W(ff27(s + shadeS()), slot(ev, [['panel', 'Schicht 3: Bänder'], ['p1', 'Halten die Gelenke stabil', 'hot'], ['p2', 'Schicht 4: Sehnen'], ['act', 'Gezogen wird im Unterarm', 'hot']], 596)); };
WMASC.b27b = (ev, t) => BIG3();

// ---------- Teil 3: Handmuskeln und Haut ----------
WORLD.b27c = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, mu = cl((lt - .3) / .9), sk = p2 === undefined ? 0 : cl((p2 - 1.0) / 1.0);
  let s = laborS(t, { rows: ROWS27, on: 4 + mu + sk, cur: p2 !== undefined ? 6 : 5, cx: ZX27, note: NOTE27, w: 320, fs: 28 });
  s += hand27(t, { l: [1, 1, 1, 1, mu, sk] });
  if (p !== undefined && p1 === undefined) s += QL27(-160, 80, 900, 'Daumenballen', 'Thenar', (p - 1.4) / .35);
  if (p1 !== undefined && p2 === undefined) s += mark27(t, -150, 80, 40) + mark27(t, 110, 70, 34);
  if (p2 !== undefined) s += QL27(130, -60, 760, 'Haut', 'Cutis', (p2 - 1.6) / .35);
  if (a !== undefined) s += spot27(a / .35) + mark27(t, -36, -300, 24) + lupeS(lupLei27(), a / .35, PX27(-36), PY27(-300), LX27, LY27);
  return W(ff27(s + shadeS()), slot(ev, [['panel', 'Schicht 5: Handmuskeln'], ['p1', 'Feine Bewegungen', 'hot'], ['p2', 'Schicht 6: Haut'], ['act', 'Hautleisten: dein Fingerabdruck', 'hot']], 596)); };
WMASC.b27c = (ev, t) => BIG3();

// ---------- Schluss ----------
WORLD.b27out = function (sc, ev, t, lt) { const c1 = ev.c1, c2 = ev.c2, c3 = ev.c3, sv = ev.save, k = sv === undefined ? 0 : ease(cl(sv / .5)), z = ZZ27 * lerp(1, .62, k), y = ZY27 + 60 * k;
  const cur = sv !== undefined ? 0 : c3 !== undefined ? 6 : c2 !== undefined ? 4 : c1 !== undefined ? 2 : 0;
  let s = laborS(t, { rows: ROWS27, on: 6, cur: 0, noList: sv !== undefined, cx: ZX27, note: sv === undefined ? NOTE27 : '', w: 320, fs: 28 });
  s += hand27(t, { l: [1, 1, 1, 1, 1, 1], z: z, cy: y });
  if (cur) for (const r of [cur - 1, cur]) s += '<rect x="50" y="' + (782 + (r - 1) * 45 - 31) + '" width="300" height="41" rx="9" fill="#A8E63C" opacity=".22"/>';
  return W(ff27(s + '<rect width="1080" height="1920" fill="#02030F" opacity=".3"/>' + shadeS())); };
WMASC.b27out = (ev, t) => BIG3();

['h27hand', 'b27a', 'b27b', 'b27c', 'b27out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
