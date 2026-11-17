// C021 "Warum schiesst Cola mit Mentos hoch?" (Chemie) im Skript 4 (17.11.2026). Design-Kennung 3.3.
// Ort: Garten bei Tag (Rasen, Zaun, Himmel). Rechts steht eine Cola-Flasche im Gras.
// Einstieg: Schalti wirft eine Mentos in die Flasche, die Fontaene traegt ihn nach oben, er landet klebrig. Nachsatz: "Klebt."
// Wissenschaftsmodus: Teil 1 Flasche mit geloestem Gas und pH-Messung, Teil 2 Mentos-Oberflaeche unter der Lupe, Teil 3 sinkende Mentos.
// Pointe: Es ist keine chemische Reaktion, das Gas wird nur frei (Coffey u. a., American Journal of Physics 2008).
// Zum Loeschen: diese Datei und videos/C021.
var AC21 = '#FF6BD6', GY21 = 1548, BX21 = 760;
function bg21(t) { let s = '<defs><linearGradient id="h21" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3FA8FF"/><stop offset=".7" stop-color="#9ED8FF"/><stop offset="1" stop-color="#D8F1FF"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#h21)"/>';
  s += '<circle cx="900" cy="660" r="80" fill="#FFE14D"/><circle cx="900" cy="660" r="125" fill="#FFE14D" opacity=".25"/>';
  for (let i = 0; i < 3; i++) { const x = ((i * 420 + t * 18) % 1500) - 250, y = 560 + 90 * i; s += '<g opacity=".9"><ellipse cx="' + x.toFixed(0) + '" cy="' + y + '" rx="110" ry="38" fill="#fff"/><ellipse cx="' + (x + 60).toFixed(0) + '" cy="' + (y - 26) + '" rx="70" ry="40" fill="#fff"/></g>'; }
  s += '<path d="M0 1240 Q270 1160 540 1230 T1080 1210 V1600 H0 Z" fill="#5CC86A"/>';
  for (let x = 0; x < 1080; x += 70) s += '<rect x="' + x + '" y="1290" width="44" height="270" rx="10" fill="#F4E3C3" stroke="#B89A6A" stroke-width="4"/>';
  s += '<rect y="1350" width="1080" height="22" fill="#D9C39A"/><rect y="1460" width="1080" height="22" fill="#D9C39A"/>';
  s += '<rect y="' + GY21 + '" width="1080" height="380" fill="#3FAE52"/>';
  for (let i = 0; i < 40; i++) { const x = rnd(i + 7) * 1080, y = GY21 + 10 + rnd(i + 70) * 340; s += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' l-6 -20 M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' l6 -22" stroke="#2E8A40" stroke-width="5" stroke-linecap="round"/>'; }
  return s + '<path d="M0 ' + GY21 + ' H1080" stroke="#2E8A40" stroke-width="8"/>'; }
// Flasche: x Mitte, b Boden, sc Groesse, fill Fuellstand 0..1, bub Blasen-Staerke 0..1
function bot21(x, b, sc, fill, bub, t) { const w = 120 * sc, h = 380 * sc, nk = 40 * sc, y0 = b - h;
  const path = 'M' + (x - nk / 2) + ' ' + y0 + ' v' + (40 * sc) + ' C' + (x - nk / 2) + ' ' + (y0 + 90 * sc) + ' ' + (x - w / 2) + ' ' + (y0 + 110 * sc) + ' ' + (x - w / 2) + ' ' + (y0 + 160 * sc) + ' V' + (b - 10 * sc) + ' q0 ' + (10 * sc) + ' ' + (10 * sc) + ' ' + (10 * sc) + ' H' + (x + w / 2 - 10 * sc) + ' q' + (10 * sc) + ' 0 ' + (10 * sc) + ' ' + (-10 * sc) + ' V' + (y0 + 160 * sc) + ' C' + (x + w / 2) + ' ' + (y0 + 110 * sc) + ' ' + (x + nk / 2) + ' ' + (y0 + 90 * sc) + ' ' + (x + nk / 2) + ' ' + (y0 + 40 * sc) + ' v' + (-40 * sc) + ' Z';
  const cid = 'bc' + Math.round(x) + Math.round(sc * 100); let s = '<clipPath id="' + cid + '"><path d="' + path + '"/></clipPath><g clip-path="url(#' + cid + ')"><rect x="' + (x - w) + '" y="' + (b - h * fill).toFixed(1) + '" width="' + (2 * w) + '" height="' + (h * fill).toFixed(1) + '" fill="#4A2412"/>';
  if (bub > 0) for (let i = 0; i < 26; i++) { const ph = (t * (1.2 + bub * 2) + rnd(i + 3)) % 1, bx = x + (rnd(i + 40) - .5) * w * .8, by = b - h * fill * ph; if (by > b - h * fill) s += '<circle cx="' + bx.toFixed(1) + '" cy="' + by.toFixed(1) + '" r="' + ((3 + 4 * rnd(i)) * sc).toFixed(1) + '" fill="#E8D2B8" opacity="' + (.5 * bub).toFixed(2) + '"/>'; }
  s += '<rect x="' + (x - w / 2) + '" y="' + (b - h * .55) + '" width="' + w + '" height="' + (h * .2) + '" fill="#E8354A"/>' + '</g><path d="' + path + '" fill="#fff" fill-opacity=".12" stroke="#0B1020" stroke-width="' + (5 * sc).toFixed(1) + '"/>';
  return s; }
function mint21(x, y, r, rot) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (rot || 0).toFixed(0) + ')"><ellipse rx="' + r + '" ry="' + (r * .55).toFixed(1) + '" fill="#F8F6F0" stroke="#0B1020" stroke-width="4"/><ellipse cx="' + (-r * .3).toFixed(1) + '" cy="' + (-r * .15).toFixed(1) + '" rx="' + (r * .35).toFixed(1) + '" ry="' + (r * .12).toFixed(1) + '" fill="#fff"/></g>'; }
// Fontaene aus dem Flaschenhals bis Hoehe top
function foun21(x, y0, top, k, t) { if (k <= .01) return ''; let s = '<g opacity="' + cl(k * 3).toFixed(3) + '"><path d="M' + (x - 18) + ' ' + y0 + ' C' + (x - 30) + ' ' + ((y0 + top) / 2) + ' ' + (x - 50) + ' ' + (top + 60) + ' ' + (x - 60) + ' ' + top + ' H' + (x + 60) + ' C' + (x + 50) + ' ' + (top + 60) + ' ' + (x + 30) + ' ' + ((y0 + top) / 2) + ' ' + (x + 18) + ' ' + y0 + ' Z" fill="#C8955E"/>';
  for (let i = 0; i < 14; i++) { const a = rnd(i + 9) * Math.PI * 2, d = 40 + 40 * rnd(i + 19); s += '<circle cx="' + (x + Math.cos(a + t * 3) * d).toFixed(1) + '" cy="' + (top + Math.sin(a + t * 3) * d * .5).toFixed(1) + '" r="' + (14 + 12 * rnd(i)).toFixed(1) + '" fill="#F2E2C8"/>'; }
  return s + '</g>'; }

// ---------- Einstieg ----------
// drop = Mentos faellt (Themenfrage), fontaene = Schalti fliegt hoch (Gib mir 60 Sekunden), kleb = gelandet, tropft
var NY21 = GY21 - 380; // Hoehe Flaschenhals
function hk21(ev) { const f = ev.fontaene; if (f === undefined) return { k: 0, top: NY21 }; const k = cl(f / .35), up = ease(cl(f / .9)), dn = ev.kleb === undefined ? 0 : ease(cl(ev.kleb / .5));
  return { k: k * (1 - dn), top: NY21 - 400 * up * (1 - dn) }; }
WORLD.c21hook = function (sc, ev, t, lt) { let s = bg21(t); const H = hk21(ev), d = ev.drop;
  s += foun21(BX21, NY21, H.top, H.k, t) + bot21(BX21, GY21, 1, ev.fontaene === undefined ? .9 : .9 - .6 * cl(ev.fontaene / 1), ev.drop === undefined ? .15 : 1, t);
  if (d !== undefined && ev.fontaene === undefined) { const q = cl((d - .4) / .6); s += mint21(BX21, NY21 - 120 + 140 * q * q, 26, 40 * q); }
  if (ev.kleb !== undefined) { const k = cl((ev.kleb - .3) / .3); for (let i = 0; i < 6; i++) { const ph = (t * 1.4 + i / 6) % 1; s += '<ellipse cx="' + (200 + 30 * i).toFixed(0) + '" cy="' + (1420 + 120 * ph).toFixed(0) + '" rx="9" ry="14" fill="#4A2412" opacity="' + (k * (1 - ph)).toFixed(2) + '"/>'; } s += '<ellipse cx="270" cy="1560" rx="130" ry="18" fill="#4A2412" opacity="' + (.6 * k).toFixed(2) + '"/>'; }
  return W(s + shade3()); };
WMASC.c21hook = (ev, t, lt, sc) => { const H = hk21(ev);
  if (ev.kleb !== undefined) { const q = ease(cl(ev.kleb / .5)); return { f: [lerp(BX21, 270, q), lerp(H.top - 20, 1537, q)], s: 1, r: 0, nospin: 1, mood: 'cool' }; }
  if (ev.fontaene !== undefined) return { f: [BX21 + 10 * Math.sin(t * 9), H.top - 20], s: 1, r: 12 * Math.sin(t * 7), nospin: 1, mood: 'shock' };
  if (ev.drop !== undefined) { const q = cl(ev.drop / .4); return { f: [lerp(220, 560, ease(q)), 1537], s: 1, r: -8, nospin: 1, walk: q < 1 ? 1 : 0 }; }
  return { f: [220, 1537], s: 1, r: 2, nospin: 1 }; };

// ---------- Teil 1: Das Gas ist schon drin ----------
WORLD.c21gas = function (sc, ev, t, lt) { const bg = bg21(t) + bot21(BX21, GY21, 1, .9, .15, t); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (ev.gas !== undefined && ev.start === undefined && m < .99) { const k = cl((ev.gas - .2) / .4) * (1 - m); s += chip3(BX21, 1060, 'gelöstes Kohlendioxid', 36, '#FFE14D', '#0B1020', k); }
  if (m > .01) { let g = ''; const st = ev.start, ph = ev.ph;
    if (st !== undefined && ph === undefined) { g += bot21(330, 1110, 1, .9, 0, t); for (let i = 0; i < 40; i++) { const x = 330 + (rnd(i + 2) - .5) * 100, y = 1090 - rnd(i + 30) * 290; g += '<circle cx="' + (x + 4 * Math.sin(t * 3 + i)).toFixed(1) + '" cy="' + y.toFixed(1) + '" r="5" fill="#F2E2C8" opacity=".8"/>'; }
      const k = cl((st - .5) / .4); g += '<g opacity="' + k.toFixed(3) + '"><circle cx="740" cy="900" r="150" fill="#2A1408" stroke="#F4F6FB" stroke-width="6"/>'; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + t * .6; g += '<circle cx="' + (740 + 100 * Math.cos(a)).toFixed(1) + '" cy="' + (900 + 100 * Math.sin(a)).toFixed(1) + '" r="7" fill="#F2E2C8"/>'; }
      g += svgT(740, 930, '?', 90, '#FFE14D') + '</g>'; }
    if (ph !== undefined) { const k = ease(cl((ph - .2) / .5)); g += '<g opacity="' + k.toFixed(3) + '">';
      [[300, 'vorher'], [780, 'nachher']].forEach((c, i) => { const kk = cl((ph - .2 - .6 * i) / .4); g += '<g opacity="' + kk.toFixed(3) + '"><rect x="' + (c[0] - 150) + '" y="790" width="300" height="230" rx="30" fill="#0B1020" stroke="#B9A6FF" stroke-width="6"/>' + svgT(c[0], 860, 'pH-Wert', 38, '#B9A6FF') + svgT(c[0], 970, '3,0', 96, '#FFE14D') + svgT(c[0], 1090, c[1], 40, '#F4F6FB') + '</g>'; });
      g += svgT(540, 930, '=', 90, '#3DFF7A') + '</g>'; }
    s += '<g opacity="' + m.toFixed(3) + '">' + g + '</g>'; }
  if (ev.frei !== undefined) { const k = cl((ev.frei - .2) / .3) * (1 - m); s += chip3(BX21 - 40, 1000, 'kein neuer Stoff', 40, '#3DFF7A', '#0B1020', k) + chip3(BX21 - 40, 1100, 'Gas wird nur frei', 36, '#2C3350', '#F4F6FB', k * cl((ev.frei - .7) / .3)); }
  h += slot(ev, [['gas', 'Das Gas ist schon in der Cola'], ['start', 'Jede Blase braucht einen Startpunkt'], ['ph', 'Vorher und nachher gleich sauer', 'hot'], ['frei', 'Keine Reaktion: Gas wird nur frei']]);
  return W(s + shade3(), h); };
WMASC.c21gas = (ev, t) => BIG3();

// ---------- Teil 2: Raue Oberflaeche ----------
function surf21(t, bk, up) { let s = '<clipPath id="lp21"><circle cx="540" cy="960" r="220"/></clipPath><g clip-path="url(#lp21)"><rect x="290" y="710" width="500" height="500" fill="#4A2412"/><path d="M290 1080 ';
  for (let i = 0; i <= 25; i++) { const x = 290 + i * 20; s += 'L' + x + ' ' + (1080 - (i % 2 ? 26 : 0) - 10 * rnd(i + 5)).toFixed(1) + ' '; } s += 'V1210 H290 Z" fill="#F8F6F0" stroke="#0B1020" stroke-width="4"/>';
  if (bk > 0) for (let i = 0; i < 13; i++) { const x = 300 + i * 40, ph = up ? ((t * 1.5 + rnd(i + 3)) % 1) : 0, r = 8 + 18 * cl(bk * 1.4 - rnd(i) * .4); s += '<circle cx="' + x + '" cy="' + (1050 - r - 340 * ph).toFixed(1) + '" r="' + r.toFixed(1) + '" fill="#F2E2C8" stroke="#fff" stroke-width="3" opacity="' + (1 - .7 * ph).toFixed(2) + '"/>'; }
  return s + '</g><circle cx="540" cy="960" r="220" fill="none" stroke="#F4F6FB" stroke-width="12"/><path d="M696 1116 L790 1200" stroke="#F4F6FB" stroke-width="28" stroke-linecap="round"/>'; }
WORLD.c21poren = function (sc, ev, t, lt) { const hoch = ev.hoch !== undefined ? ease(cl(ev.hoch / .8)) : 0, gl = ev.glas;
  const bg = bg21(t) + (gl === undefined ? foun21(BX21, NY21, NY21 - 420 * hoch, hoch, t) + bot21(BX21, GY21, 1, .9 - .4 * hoch, hoch, t) : ''); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (m > .01) { const bk = ev.blase === undefined ? 0 : cl((ev.blase - .2) / .8); s += '<g opacity="' + m.toFixed(3) + '">' + surf21(t, bk, bk >= 1) + '</g>'; }
  if (gl !== undefined && m < .99) { const k = cl((gl - .2) / .3) * (1 - m); s += '<g opacity="' + k.toFixed(3) + '"><path d="M620 1100 L650 1540 H870 L900 1100 Z" fill="#9ED8FF" fill-opacity=".35" stroke="#0B1020" stroke-width="6"/><rect x="638" y="1170" width="244" height="370" fill="#4A2412" opacity=".85"/><path d="M700 1500 l40 -30" stroke="#F4F6FB" stroke-width="4"/>';
    for (let i = 0; i < 10; i++) { const ph = (t * 1.2 + i / 10) % 1; s += '<circle cx="' + (720 + 6 * Math.sin(t * 5 + i)).toFixed(1) + '" cy="' + (1480 - 300 * ph).toFixed(1) + '" r="6" fill="#F2E2C8"/>'; } s += '</g>' + chip3(760, 1010, 'Kratzer = Startpunkt', 38, '#FFE14D', '#0B1020', k); }
  h += slot(ev, [['poren', 'Mentos: voller winziger Poren'], ['blase', 'An jeder Pore startet eine Blase', 'hot'], ['hoch', 'Unzählige Blasen drücken nach oben'], ['glas', 'Im Glas: Blasen an Kratzern']]);
  return W(s + shade3(), h); };
WMASC.c21poren = (ev, t) => { if (ev.hoch !== undefined && ev.glas === undefined) { const q = ease(cl(ev.hoch / .8)); return { f: [220, 1537], s: 1, nospin: 1, r: -6 * q, mood: 'shock' }; } return BIG3(); };

// ---------- Teil 3: Warum gerade Mentos ----------
WORLD.c21sink = function (sc, ev, t, lt) { const bg = bg21(t) + bot21(BX21, GY21, 1, .9, .15, t); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (ev.sink !== undefined && ev.ueberall === undefined && m < .99) { const k = (1 - m), q = ease(cl((ev.sink - .2) / 1.2)); s += '<g opacity="' + k.toFixed(3) + '">' + mint21(BX21, NY21 + 60 + 300 * q, 24, 60 * q) + '</g>' + chip3(BX21 - 260, 1100, 'sinkt schnell', 40, '#FFE14D', '#0B1020', k * cl((ev.sink - .4) / .3)); }
  if (m > .01) { let g = ''; const u = ev.ueberall;
    if (u !== undefined) { const q = ease(cl((u - .1) / 1)); g += bot21(540, 1200, 1.2, .9, 0, t); const my = 1200 - 456 + 60 + 350 * q; g += mint21(540, my, 28, 50 * q);
      for (let i = 0; i < 36; i++) { const y0 = 1200 - 456 + 70 + rnd(i + 4) * 350 * q, ph = (t * 1.3 + rnd(i + 50)) % 1; g += '<circle cx="' + (540 + (rnd(i + 9) - .5) * 110).toFixed(1) + '" cy="' + (y0 - (y0 - 820) * ph).toFixed(1) + '" r="' + (5 + 5 * rnd(i)).toFixed(1) + '" fill="#F2E2C8" opacity="' + (1 - ph).toFixed(2) + '"/>'; } }
    s += '<g opacity="' + m.toFixed(3) + '">' + g + '</g>'; }
  if (ev.krumel !== undefined && ev.light === undefined) { const k = cl((ev.krumel - .2) / .3) * (1 - m); s += '<g opacity="' + k.toFixed(3) + '">' + foun21(BX21, NY21, NY21 - 90, 1, t);
    for (let i = 0; i < 7; i++) s += '<circle cx="' + (BX21 - 30 + 10 * i).toFixed(0) + '" cy="' + (NY21 + 40 + 8 * Math.sin(t * 3 + i)).toFixed(1) + '" r="6" fill="#F8F6F0" stroke="#0B1020" stroke-width="2"/>'; s += '</g>' + chip3(BX21 - 240, 1060, 'zerkleinert: klein', 38, '#2C3350', '#F4F6FB', k); }
  if (ev.light !== undefined) { const k = cl((ev.light - .2) / .3) * (1 - m); s += chip3(BX21 - 220, 1000, 'Light-Cola', 46, AC21, '#fff', k) + chip3(BX21 - 220, 1110, 'Süßstoff hilft den Blasen', 34, '#2C3350', '#F4F6FB', k * cl((ev.light - .7) / .3)); }
  h += slot(ev, [['sink', 'Mentos sinken schnell nach unten'], ['ueberall', 'Blasen in der ganzen Flasche', 'hot'], ['krumel', 'Zerkleinert: kleine Fontäne'], ['light', 'Light-Cola: Süßstoff hilft mit']]);
  return W(s + shade3(), h); };
WMASC.c21sink = (ev, t) => BIG3();

// ---------- Schluss ----------
WORLD.c21outro = function (sc, ev, t) { return W(bg21(t) + bot21(BX21, GY21, 1, .3, .1, t) + shade3()); };
WMASC.c21outro = () => BIG3();

['c21hook', 'c21gas', 'c21poren', 'c21sink', 'c21outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC21); });
