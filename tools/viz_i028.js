// I028 "Warum laeuft GTA 6 nur mit 30 Bildern?" (GTA-6-Spezial, Informatik) im Skript 4 (17.11.2026). Design-Kennung 3.3.
// Ort: dieselbe Neon-Stadt wie I026 (street26 aus viz_i026.js), damit die GTA-Videos wie eine Reihe wirken.
// Einstieg: Ein Daumenkino zeigt die Stadt Bild fuer Bild. Schalti will die 30 Bilder einer Sekunde selbst spielen,
// springt Bild fuer Bild ruckartig ueber die Strasse und ist nach 30 Bildern fertig. Es fehlen noch 1.770 fuer 60 Sekunden.
// Wissenschaftsmodus: Teil 1 Sekunde in 30 Kaestchen (33 ms), Teil 2 Zeitbudget pro Bild, Teil 3 Vergleich 33 zu knapp 17 ms.
// Zum Loeschen: diese Datei und videos/I028.
var AC28 = '#7C5CFF';
// kleine Stadt-Skizze fuer eine Daumenkino-Seite: Auto an Position p (0..1)
function page28(x, y, w, h, p, n) { const cx = x + 20 + (w - 100) * p;
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="#FFF8E8" stroke="#0B1020" stroke-width="5"/>'
    + '<rect x="' + (x + 14) + '" y="' + (y + h * .2) + '" width="' + (w * .22) + '" height="' + (h * .55) + '" fill="#B9A6FF"/><rect x="' + (x + w * .62) + '" y="' + (y + h * .32) + '" width="' + (w * .24) + '" height="' + (h * .43) + '" fill="#FFB0D9"/>'
    + '<path d="M' + (x + 8) + ' ' + (y + h * .78) + ' h' + (w - 16) + '" stroke="#0B1020" stroke-width="4"/>'
    + '<g transform="translate(' + cx.toFixed(1) + ' ' + (y + h * .78) + ')"><path d="M0 0 h70 v-18 l-14 -14 h-40 l-14 14 Z" fill="#FF5A7A" stroke="#0B1020" stroke-width="4"/><circle cx="16" cy="2" r="8" fill="#0B1020"/><circle cx="54" cy="2" r="8" fill="#0B1020"/></g>'
    + (n !== undefined ? '<text x="' + (x + w - 14) + '" y="' + (y + 34) + '" text-anchor="end" font-size="26" font-weight="900" fill="#8A93B8">' + n + '</text>' : ''); }
// Daumenkino: Stapel mit blaetternder Seite. f Bildnummer (kann gebrochen sein), k Sichtbarkeit
function flip28(x, y, w, h, f, k) { if (k <= .01) return ''; const n = Math.floor(f), q = f - n, p = (n % 30) / 29;
  let s = '<g opacity="' + cl(k).toFixed(3) + '">';
  for (let i = 4; i >= 1; i--) s += '<rect x="' + (x + i * 7) + '" y="' + (y + i * 7) + '" width="' + w + '" height="' + h + '" rx="10" fill="#E8DEC8" stroke="#0B1020" stroke-width="4"/>';
  s += page28(x, y, w, h, p, (n % 30) + 1);
  const fw = w * (1 - q); if (q > .05 && q < .95) s += '<path d="M' + x + ' ' + y + ' h' + fw.toFixed(1) + ' q' + (30 * q).toFixed(1) + ' ' + (h / 2) + ' 0 ' + h + ' h-' + fw.toFixed(1) + ' Z" fill="#FFF8E8" stroke="#0B1020" stroke-width="4" opacity=".95"/>';
  return s + '</g>'; }
// Zeitleiste einer Sekunde mit 30 Kaestchen. n gefuellte Kaestchen, hi hervorgehobenes Kaestchen (Index) mit Staerke hk
function sec28(X, Y, L, H, n, hi, hk) { const cw = L / 30; let s = '<rect x="' + (X - 8) + '" y="' + (Y - 8) + '" width="' + (L + 16) + '" height="' + (H + 16) + '" rx="14" fill="#0B1020" stroke="#B9A6FF" stroke-width="5"/>';
  for (let i = 0; i < 30; i++) { const on = cl(n - i); s += '<rect x="' + (X + i * cw + 2).toFixed(1) + '" y="' + Y + '" width="' + (cw - 4).toFixed(1) + '" height="' + H + '" rx="4" fill="' + lc('#2C3350', AC28, on) + '"/>'; }
  if (hi !== undefined && hk > .01) { const x = X + hi * cw; s += '<rect x="' + (x - 4).toFixed(1) + '" y="' + (Y - 14) + '" width="' + (cw + 8).toFixed(1) + '" height="' + (H + 28) + '" rx="6" fill="#FFE14D" stroke="#0B1020" stroke-width="4" opacity="' + cl(hk).toFixed(3) + '"/>'; }
  return s; }

// ---------- Einstieg ----------
// Zeiten: frage = Daumenkino zeigt "30 Bilder pro Sekunde", zaehl = Schalti spielt die 30 Bilder selbst, puh = fertig, 1.770 fehlen
var ZD28 = 1.5; // Dauer der 30 Spruenge in Sekunden
WORLD.i28hook = function (sc, ev, t, lt) { let s = street26(t, 0, { RB: 2000, F: 3000 }), h = '';
  const z = ev.zaehl, pu = ev.puh, k0 = cl(lt / .35) * (z === undefined ? 1 : 1 - cl(z / .3));
  s += flip28(560, 760, 380, 300, t * 30, k0);
  if (ev.frage !== undefined && z === undefined) s += chip3(750, 690, '30 Bilder pro Sekunde', 40, '#FFE14D', '#0B1020', cl((ev.frage - .2) / .3));
  if (z !== undefined) { const n = Math.min(30, Math.floor(z / ZD28 * 30) + 1), fl = (z / ZD28 * 30) % 1;
    if (n < 30 && fl < .25) s += '<rect width="1080" height="1920" fill="#fff" opacity="' + (.12 * (1 - fl / .25)).toFixed(3) + '"/>';
    s += '<g>' + '<rect x="600" y="760" width="330" height="170" rx="24" fill="#0B1020" stroke="' + (n >= 30 ? '#3DFF7A' : '#FFE14D') + '" stroke-width="7"/>' + svgT(765, 830, 'Bild', 40, '#B9A6FF') + svgT(765, 905, n + ' / 30', 64, n >= 30 ? '#3DFF7A' : '#FFE14D') + '</g>';
    if (pu !== undefined) s += chip3(765, 1010, 'Noch 1.770 Bilder', 40, '#FF5A7A', '#fff', cl((pu - .35) / .3)); }
  return W(s + shade3(), h); };
WMASC.i28hook = (ev, t, lt, sc) => { const z = ev.zaehl, pu = ev.puh;
  if (pu !== undefined) return { f: [250, 1537], s: 1, r: -14 + 3 * Math.sin(t * 9), nospin: 1, mood: 'shock' };
  if (z !== undefined) { const n = Math.min(29, Math.floor(z / ZD28 * 30)), x = 220 + (n % 10) * 46 * (Math.floor(n / 10) % 2 ? -1 : 1) + (Math.floor(n / 10) % 2 ? 414 : 0);
    return { f: [x, 1537 - (n % 2) * 40], s: 1, r: n % 2 ? -10 : 10, nospin: 1 }; }
  return { f: [220, 1537], s: 1, r: 2, nospin: 1 }; };

// ---------- Teil 1: 30 Bilder, 33 Millisekunden ----------
WORLD.i28bild = function (sc, ev, t, lt) { const bg = street26(t, 0, { RB: 2000, F: 3000 }); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (ev.daumen !== undefined && m < .99) { const k = cl((ev.daumen - .2) / .4) * (1 - m); s += flip28(560, 800, 380, 300, t * 12, k); }
  if (m > .01) { const n = ev.drei === undefined ? (ev.sek === undefined ? 0 : 30 * ease(cl((ev.sek - .2) / 1.2))) : 30, hk = ev.drei === undefined ? 0 : cl((ev.drei - .2) / .3);
    let g = svgT(110, 760, '1 Sekunde', 46, '#F4F6FB', 'start') + sec28(110, 800, 760, 110, n, 14, hk);
    if (ev.sek !== undefined) g += svgT(870, 760, Math.round(n) + ' Bilder', 46, '#FFE14D', 'end');
    if (hk > .01) g += '<g opacity="' + hk.toFixed(3) + '"><path d="M' + (110 + 14.5 * 760 / 30) + ' 940 V970" stroke="#FFE14D" stroke-width="6"/>' + chip3(110 + 14.5 * 760 / 30, 1010, '1 Bild = rund 33 ms', 46, '#FFE14D', '#0B1020', hk) + svgT(490, 1110, '1000 ms : 30 = 33 ms', 40, '#B9A6FF') + '</g>';
    s += '<g opacity="' + m.toFixed(3) + '">' + g + '</g>'; }
  if (ev.blink !== undefined) { const k = cl((ev.blink - .2) / .3) * (1 - m); s += chip3(700, 960, 'Wimpernschlag: länger', 38, '#3DFF7A', '#0B1020', k); }
  h += slot(ev, [['daumen', 'Ein Spiel ist ein Daumenkino'], ['sek', '30 Bilder pro Sekunde'], ['drei', 'Pro Bild rund 33 Millisekunden', 'hot'], ['blink', 'Schneller als ein Wimpernschlag']]);
  return W(s + shade3(), h); };
WMASC.i28bild = (ev, t) => { if (ev.blink !== undefined) { const b = (t * 1.6) % 1 < .12; return { f: [220, 1537], s: 1, nospin: 1, mood: b ? 'wink' : 'happy' }; } return BIG3(); };

// ---------- Teil 2: Zeitbudget pro Bild ----------
// Balken: Teile Autos, Leute, Licht. g Wachstum (0 normal, 1 volle Stadt), over Ueberlauf
function bud28(X, Y, L, k, g) { const lim = L * .82, parts = [['Autos', '#FF5A7A', .2 + .1 * g], ['Leute', '#FFD23F', .18 + .12 * g], ['Licht', '#5CE1FF', .24 + .12 * g]];
  let s = svgT(X, Y - 30, 'Zeit für ein Bild', 46, '#F4F6FB', 'start') + '<rect x="' + X + '" y="' + Y + '" width="' + L + '" height="120" rx="18" fill="#0B1020" stroke="#B9A6FF" stroke-width="5"/>', x = X;
  parts.forEach((p, i) => { const w = L * .82 * p[2] / .62 * .62 * cl(k * 3 - i); if (w > 2) { s += '<rect x="' + x.toFixed(1) + '" y="' + Y + '" width="' + w.toFixed(1) + '" height="120" fill="' + p[1] + '" stroke="#0B1020" stroke-width="4"/>'; if (w > 120) s += svgT(x + w / 2, Y + 76, p[0], 36, '#0B1020'); x += w; } });
  s += '<path d="M' + (X + lim) + ' ' + (Y - 20) + ' V' + (Y + 140) + '" stroke="#3DFF7A" stroke-width="7" stroke-dasharray="14 10"/>' + svgT(X + lim, Y + 190, '33 ms', 44, '#3DFF7A');
  return s; }
WORLD.i28budget = function (sc, ev, t, lt) { const a = ev.act, frz = a === undefined ? 0 : Math.floor(t * 3) % 3 === 0 ? 1 : 0, tt = a === undefined ? t : Math.floor(t * 4) / 4;
  const bg = street26(tt, 0, { RB: 2000, F: 3000 }); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (ev.fertig !== undefined && ev.alles === undefined && m < .99) { const k = cl((ev.fertig - .2) / .3) * (1 - m); s += '<g opacity="' + k.toFixed(3) + '"><circle cx="760" cy="960" r="110" fill="#0B1020" stroke="#FFE14D" stroke-width="9"/><path d="M760 960 L' + (760 + 80 * Math.sin(t * 6)).toFixed(1) + ' ' + (960 - 80 * Math.cos(t * 6)).toFixed(1) + '" stroke="#FFE14D" stroke-width="9" stroke-linecap="round"/><rect x="735" y="826" width="50" height="24" rx="6" fill="#FFE14D"/></g>' + chip3(760, 1130, '33 ms', 44, '#FFE14D', '#0B1020', k); }
  if (m > .01) { const g = ev.mehr === undefined ? 0 : ease(cl((ev.mehr - .2) / 1)), k = ev.alles === undefined ? 0 : cl((ev.alles - .1) / 1.1);
    s += '<g opacity="' + m.toFixed(3) + '">' + bud28(110, 820, 760, k, g) + (ev.mehr !== undefined ? chip3(490, 1110, 'Volle Stadt: mehr Arbeit', 40, '#FF5A7A', '#fff', cl((ev.mehr - .6) / .3)) : '') + '</g>'; }
  if (a !== undefined && m < .99) { const k = cl((a - .2) / .3) * (1 - m); s += chip3(740, 1000, 'Ruckler', 52, '#FF5A7A', '#fff', k) + (frz ? '<rect x="0" y="0" width="1080" height="1920" fill="#000" opacity=".12"/>' : ''); }
  h += slot(ev, [['fertig', 'In 33 ms muss alles fertig sein'], ['alles', 'Autos, Leute, Licht: jedes Bild neu'], ['mehr', 'Volle Stadt: mehr Arbeit', 'hot'], ['act', 'Nicht fertig: Ruckler']]);
  return W(s + shade3(), h); };
WMASC.i28budget = (ev, t) => { const a = ev.act; if (a === undefined) return BIG3(); const j = Math.floor(t * 4); return { f: [220 + (j % 2) * 30, 1537], s: 1, nospin: 1, r: (j % 2 ? 8 : -8), mood: 'shock' }; };

// ---------- Teil 3: 60 Bilder kosten Details ----------
WORLD.i28sechzig = function (sc, ev, t, lt) { const bg = street26(t, 0, { RB: 2000, F: 3000 }); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (m > .01) { const X = 110, L = 760, k1 = ev.halb === undefined ? 0 : ease(cl((ev.halb - .2) / .6)), k2 = ev.halb === undefined ? 0 : ease(cl((ev.halb - .9) / .6));
    let g = svgT(X, 760, '30 Bilder: 33 ms pro Bild', 44, '#F4F6FB', 'start') + '<rect x="' + X + '" y="790" width="' + (L * k1).toFixed(1) + '" height="100" rx="16" fill="#3DFF7A"/>'
      + svgT(X, 970, '60 Bilder: knapp 17 ms', 44, '#F4F6FB', 'start') + '<rect x="' + X + '" y="1000" width="' + (L / 2 * k2).toFixed(1) + '" height="100" rx="16" fill="#FF5A7A"/>';
    if (ev.spar !== undefined) { const ks = cl((ev.spar - .2) / .4); g += '<g opacity="' + ks.toFixed(3) + '">' + mesh26(880, 1100, .22, 1 - ks, 1) + svgT(520, 1065, 'weniger Details', 36, '#FFE14D', 'start') + '</g>'; }
    s += '<g opacity="' + m.toFixed(3) + '">' + g + '</g>'; }
  if (ev.rock !== undefined) { const k = cl((ev.rock - .2) / .3) * (1 - m) * (ev.kino === undefined ? 1 : 1 - cl(ev.kino / .3)); s += chip3(720, 930, 'GTA 6: 30 Bilder', 46, AC28, '#fff', k) + chip3(720, 1040, 'auf allen Konsolen', 36, '#2C3350', '#F4F6FB', k * cl((ev.rock - .7) / .3)); }
  if (ev.kino !== undefined) { const k = cl((ev.kino - .2) / .3) * (1 - m), r = t * 2; s += '<g opacity="' + k.toFixed(3) + '" transform="translate(720 940)"><circle r="70" fill="#0B1020" stroke="#F4F6FB" stroke-width="7"/>';
    for (let i = 0; i < 5; i++) { const a = r + i * Math.PI * 2 / 5; s += '<circle cx="' + (40 * Math.cos(a)).toFixed(1) + '" cy="' + (40 * Math.sin(a)).toFixed(1) + '" r="13" fill="#F4F6FB"/>'; } s += '</g>' + chip3(720, 1080, 'Kino: meist 24 Bilder', 38, '#FFE14D', '#0B1020', k); }
  h += slot(ev, [['halb', '60 Bilder: nur knapp 17 ms'], ['spar', 'Dann muss das Spiel sparen', 'hot'], ['rock', 'GTA 6: 30 Bilder, alle Konsolen'], ['kino', 'Kino: meist 24 Bilder pro Sekunde']]);
  return W(s + shade3(), h); };
WMASC.i28sechzig = (ev, t) => BIG3();

// ---------- Schluss ----------
WORLD.i28outro = function (sc, ev, t) { return W(street26(t, 0, { RB: 2000, F: 3000 }) + shade3()); };
WMASC.i28outro = () => BIG3();

['i28hook', 'i28bild', 'i28budget', 'i28sechzig', 'i28outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC28); });
