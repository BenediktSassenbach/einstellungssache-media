// I029 "Warum braucht GTA 6 so viel Platz?" (GTA-6-Spezial, Informatik) im Skript 4 (17.11.2026). Design-Kennung 3.3.
// Ort: dieselbe Neon-Stadt wie I026 und I028 (street26 aus viz_i026.js).
// Einstieg: Schalti stopft ein Paket "212 GB" in eine Konsole, sie beult sich aus und platzt. Nachsatz trocken: "Passt schon."
// Wissenschaftsmodus: Teil 1 drei Texturen und 4K-Raster, Teil 2 gepackter gegen ungepackter Ton, Teil 3 Speicherbalken der PS5.
// Wie GTA 6 innen aufgeteilt ist, hat Rockstar nicht veroeffentlicht: das Video spricht deshalb von grossen Spielen allgemein.
// Zum Loeschen: diese Datei und videos/I029.
var AC29 = '#7C5CFF';
// Konsole (neutral, ohne Marke). x links, b Boden, bu Ausbeulen 0..1, pop geplatzt 0..1
function cons29(x, b, bu, pop, t) { const w = 150 + 40 * bu, h = 300, xl = x - (w - 150) / 2, sh = pop > 0 ? 0 : 6 * bu * Math.sin(t * 40);
  let s = '<g transform="translate(' + sh.toFixed(1) + ' 0)"><rect x="' + xl.toFixed(1) + '" y="' + (b - h) + '" width="' + w.toFixed(1) + '" height="' + h + '" rx="' + (26 + 30 * bu).toFixed(0) + '" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>'
    + '<rect x="' + (xl + w / 2 - 22).toFixed(1) + '" y="' + (b - h + 40) + '" width="44" height="' + (h - 80) + '" rx="22" fill="#0B1020"/><circle cx="' + (xl + w / 2).toFixed(1) + '" cy="' + (b - h + 70) + '" r="9" fill="' + (pop > 0 ? '#FF5A7A' : '#5CE1FF') + '"/></g>';
  if (pop > 0) { const k = cl(pop / .8); s += '<g transform="translate(' + (x + 75 + 140 * k).toFixed(1) + ' ' + (b - h - 300 * k + 420 * k * k).toFixed(1) + ') rotate(' + (200 * k).toFixed(0) + ')"><rect x="-80" y="-14" width="160" height="28" rx="12" fill="#F4F6FB" stroke="#0B1020" stroke-width="5"/></g>';
    for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * .32, d = 60 + 380 * k * (.6 + .4 * rnd(i + 5)); s += '<rect x="' + (x + 75 + d * Math.cos(a) - 16).toFixed(1) + '" y="' + (b - h + d * Math.sin(a) + 300 * k * k).toFixed(1) + '" width="32" height="32" rx="6" fill="' + ['#FF5A7A', '#FFD23F', '#5CE1FF', '#3DFF7A', AC29][i % 5] + '" stroke="#0B1020" stroke-width="4" opacity="' + (1 - .4 * k).toFixed(2) + '"/>'; }
    s += '<circle cx="' + (x + 75) + '" cy="' + (b - h - 40 - 60 * k) + '" r="' + (40 + 60 * k).toFixed(0) + '" fill="#8A93B8" opacity="' + (.45 * (1 - k)).toFixed(2) + '"/>'; }
  return s; }
function box29(x, b, sz, sq) { const w = sz * (1 - .25 * sq), h = sz * (1 + .1 * sq); return '<rect x="' + x.toFixed(1) + '" y="' + (b - h).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="12" fill="#C98A4B" stroke="#0B1020" stroke-width="6"/><path d="M' + (x + w / 2).toFixed(1) + ' ' + (b - h).toFixed(1) + ' V' + b + '" stroke="#E8C08A" stroke-width="16"/>' + svgT(x + w / 2, b - h / 2 + 18, '212 GB', 48, '#0B1020'); }

// ---------- Einstieg ----------
WORLD.i29hook = function (sc, ev, t, lt) { let s = street26(t, 0, { RB: 2000, F: 3000 }); const st = ev.stopf, pl = ev.platz, pu = ev.puff;
  const pop = pl === undefined ? 0 : cl((pl - .7) / .1) > 0 ? pl - .7 : 0, bu = pl === undefined ? 0 : cl(pl / .7);
  const bx = st === undefined ? 350 : 350 + 140 * ease(cl(st / 1.2));
  if (pop <= 0) s += box29(bx, 1548, 220, bu);
  s += cons29(700, 1548, bu, pop, t);
  if (st !== undefined && pl === undefined) s += chip3(780, 1010, 'Passt das rein?', 40, '#FFE14D', '#0B1020', cl((st - .5) / .3));
  return W(s + shade3()); };
WMASC.i29hook = (ev, t, lt, sc) => { const st = ev.stopf, pl = ev.platz, pu = ev.puff;
  if (pu !== undefined || (pl !== undefined && pl > .7)) return { f: [220, 1537], s: 1, r: -6, nospin: 1, mood: pu !== undefined ? 'cool' : 'shock' };
  if (st !== undefined) { const p = ease(cl(st / 1.2)); return { f: [200 + 140 * p, 1537], s: 1, r: 14 + 4 * Math.sin(t * 20), nospin: 1, walk: p < 1 ? 1 : 0 }; }
  return { f: [200, 1537], s: 1, r: 2, nospin: 1 }; };

// ---------- Teil 1: Texturen ----------
function brick29(x, y, w, h, kind) { let s = '<clipPath id="br' + kind + x + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10"/></clipPath><g clip-path="url(#br' + kind + x + ')">';
  const bg = kind === 0 ? '#B4583A' : kind === 1 ? '#8080FF' : '#3A3A44'; s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + bg + '"/>';
  const rows = 6, rh = h / rows; for (let r = 0; r < rows; r++) for (let c = -1; c < 4; c++) { const bxx = x + c * w / 3 + (r % 2) * w / 6, byy = y + r * rh;
    const f = kind === 0 ? ['#C96A48', '#A54E33', '#D27B55'][(r + c + 3) % 3] : kind === 1 ? '#9A9AFF' : '#5A5A66';
    s += '<rect x="' + (bxx + 4).toFixed(1) + '" y="' + (byy + 4).toFixed(1) + '" width="' + (w / 3 - 8).toFixed(1) + '" height="' + (rh - 8).toFixed(1) + '" rx="3" fill="' + f + '"' + (kind === 2 ? ' opacity="' + (.4 + .6 * rnd(r * 7 + c)).toFixed(2) + '"' : '') + '/>'; }
  return s + '</g><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="none" stroke="#F4F6FB" stroke-width="5"/>'; }
WORLD.i29tex = function (sc, ev, t, lt) { const bg = street26(t, 0, { RB: 2000, F: 3000 }); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (ev.tex !== undefined && ev.drei === undefined && m < .99) { const k = ease(cl((ev.tex - .2) / .8)) * (1 - m); s += '<g opacity="' + (1 - m).toFixed(3) + '">' + brick29(620, 1010 + 300 * (1 - k), 260, 300 * k + 1, 0) + '</g>' + chip3(750, 930, 'Textur', 46, '#FFE14D', '#0B1020', cl((ev.tex - .6) / .3) * (1 - m)); }
  if (m > .01) { let g = ''; const d = ev.drei, p = ev.pix;
    if (d !== undefined && p === undefined) { const lab = ['Farbe', 'Unebenheit', 'Glanz']; for (let i = 0; i < 3; i++) { const k = cl((d - .3 * i) / .4); g += '<g opacity="' + k.toFixed(3) + '">' + brick29(110 + i * 270, 790, 220, 220, i) + svgT(220 + i * 270, 1080, lab[i], 40, '#F4F6FB') + '</g>'; } }
    if (p !== undefined) { const z = ease(cl(p / .8)), S = 220 + 300 * z, X = 540 - S / 2; g += brick29(X, 760, S, S * .8, 0);
      const n = 6 + Math.floor(26 * z); for (let i = 1; i < n; i++) g += '<path d="M' + (X + S * i / n).toFixed(1) + ' 760 v' + (S * .8).toFixed(1) + '" stroke="#0B1020" stroke-width="1.5" opacity=".5"/><path d="M' + X.toFixed(1) + ' ' + (760 + S * .8 * i / n).toFixed(1) + ' h' + S.toFixed(1) + '" stroke="#0B1020" stroke-width="1.5" opacity=".5"/>';
      g += svgT(540, 740, '4096 × 4096', 44, '#F4F6FB') + chip3(540, 1090, 'fast 17 Millionen Pixel', 44, '#FFE14D', '#0B1020', cl((p - .9) / .3)); }
    s += '<g opacity="' + m.toFixed(3) + '">' + g + '</g>'; }
  if (ev.pack !== undefined) { const k = cl((ev.pack - .2) / .3) * (1 - m), q = ease(cl((ev.pack - .5) / .8)), S = 240 * (1 - q * (1 - 1 / Math.sqrt(8)));
    s += '<g opacity="' + k.toFixed(3) + '"><rect x="' + (760 - S / 2).toFixed(1) + '" y="' + (1010 - S / 2).toFixed(1) + '" width="' + S.toFixed(1) + '" height="' + S.toFixed(1) + '" rx="10" fill="#B4583A" stroke="#F4F6FB" stroke-width="5"/></g>' + chip3(760, 1130, 'höchstens etwa 1/8', 40, '#FFE14D', '#0B1020', cl((ev.pack - 1.2) / .3)); }
  h += slot(ev, [['tex', 'Fast jede Fläche: eine Textur'], ['drei', 'Oft drei pro Fläche'], ['pix', '4K-Textur: fast 17 Mio. Pixel', 'hot'], ['pack', 'Packen: nur auf etwa 1/8']]);
  return W(s + shade3(), h); };
WMASC.i29tex = (ev, t) => { if (ev.pack !== undefined) { const q = ease(cl((ev.pack - .5) / .8)); return { f: [300, 1537], s: 1, r: -10 * q, nospin: 1, mood: q < 1 ? 'shock' : 'cool' }; } return BIG3(); };

// ---------- Teil 2: Ton ----------
function file29(x, y, sz, col, note) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (sz / 100).toFixed(3) + ')"><path d="M-40 -55 h55 l25 25 v85 h-80 Z" fill="' + col + '" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><path d="M15 -55 v25 h25" fill="none" stroke="#0B1020" stroke-width="6"/>' + (note ? '<path d="M-14 26 v-46 l26 -8 v40" stroke="#0B1020" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="-20" cy="28" r="9" fill="#0B1020"/><circle cx="6" cy="20" r="9" fill="#0B1020"/>' : '') + '</g>'; }
WORLD.i29ton = function (sc, ev, t, lt) { const bg = street26(t, 0, { RB: 2000, F: 3000 }); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (ev.ton !== undefined && ev.roh === undefined && m < .99) { const k = cl((ev.ton - .2) / .4) * (1 - m); for (let i = 0; i < 7; i++) { const ph = (t * .5 + i / 7) % 1; s += '<g opacity="' + (k * (1 - ph)).toFixed(3) + '">' + file29(420 + 80 * i, 1200 - 380 * ph, 70, ['#FFD23F', '#5CE1FF', '#FF6BD6', '#3DFF7A'][i % 4], 1) + '</g>'; }
    s += chip3(740, 820, 'Jeder Ton: eine Datei', 40, '#FFE14D', '#0B1020', k); }
  if (m > .01) { let g = ''; const r = ev.roh, c = ev.cpu;
    if (r !== undefined) { const k = ease(cl((r - .2) / .8)); g += file29(300, 900, 110, '#3DFF7A', 1) + svgT(300, 1030, 'gepackt', 40, '#3DFF7A') + file29(700, 900, 110 + 150 * k, '#FF5A7A', 1) + svgT(700, 1110, 'ungepackt', 40, '#FF5A7A'); }
    if (c !== undefined) { const k = cl((c - .2) / .4); g = '<g opacity="' + (1 - k).toFixed(3) + '">' + g + '</g><g opacity="' + k.toFixed(3) + '"><rect x="400" y="760" width="280" height="280" rx="30" fill="#0B1020" stroke="#5CE1FF" stroke-width="7"/>';
      for (let i = 0; i < 5; i++) g += '<path d="M' + (430 + i * 55) + ' 740 v20 M' + (430 + i * 55) + ' 1040 v20 M380 ' + (790 + i * 55) + ' h20 M680 ' + (790 + i * 55) + ' h20" stroke="#5CE1FF" stroke-width="7"/>';
      g += svgT(540, 920, 'Konsole', 40, '#5CE1FF') + '</g>' + okx1(540, 1100, 40, true, (c - .7) / .3) + svgT(540, 740 - 20, 'nichts entpacken', 40, '#F4F6FB'); }
    s += '<g opacity="' + m.toFixed(3) + '">' + g + '</g>'; }
  if (ev.titan !== undefined) { const k = cl((ev.titan - .2) / .3) * (1 - m); s += chip3(740, 900, 'Titanfall: 48 GB', 50, AC29, '#fff', k) + chip3(740, 1010, 'vor allem Ton', 38, '#2C3350', '#F4F6FB', k * cl((ev.titan - .8) / .3)); }
  h += slot(ev, [['ton', 'Jeder Ton ist eine Datei'], ['roh', 'Manchmal ungepackt'], ['cpu', 'Spart Arbeit beim Spielen', 'hot'], ['titan', 'Titanfall: 48 GB, vor allem Ton']]);
  return W(s + shade3(), h); };
WMASC.i29ton = (ev, t) => BIG3();

// ---------- Teil 3: Platz auf deiner Konsole ----------
WORLD.i29platz = function (sc, ev, t, lt) { const bg = street26(t, 0, { RB: 2000, F: 3000 }); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (m > .01) { const X = 110, L = 860, f = ev.frei, d = ev.drittel; let g = svgT(X, 760, 'PS5 mit 825 GB', 46, '#F4F6FB', 'start') + '<rect x="' + X + '" y="790" width="' + L + '" height="130" rx="20" fill="#0B1020" stroke="#B9A6FF" stroke-width="5"/>';
    const sys = L * 158 / 825, fr = L * 667 / 825, k = f === undefined ? 0 : ease(cl((f - .2) / .8));
    g += '<rect x="' + X + '" y="790" width="' + (sys * k).toFixed(1) + '" height="130" rx="20" fill="#2C3350"/>' + (k > .9 ? svgT(X + sys / 2, 870, 'System', 30, '#8A93B8') : '');
    g += '<rect x="' + (X + sys) + '" y="790" width="' + (fr * k).toFixed(1) + '" height="130" fill="#3DFF7A" opacity=".35"/>' + (k > .9 ? svgT(X + sys + fr / 2, 1010, 'frei nutzbar: rund 667 GB', 42, '#3DFF7A') : '');
    if (d !== undefined) { const kd = ease(cl((d - .2) / .8)), gw = fr * 212 / 667; g += '<rect x="' + (X + sys) + '" y="790" width="' + (gw * kd).toFixed(1) + '" height="130" fill="' + AC29 + '" stroke="#F4F6FB" stroke-width="5"/>' + (kd > .6 ? svgT(X + sys + gw / 2, 872, 'GTA 6', 40, '#fff') : '') + chip3(540, 1100, 'fast ein Drittel', 46, '#FFE14D', '#0B1020', cl((d - 1) / .3)); }
    s += '<g opacity="' + m.toFixed(3) + '">' + g + '</g>'; }
  const u = ev.usb, z = ev.zurueck;
  if (u !== undefined && m < .99) { const k = cl((u - .2) / .3) * (1 - m), mv = z === undefined ? ease(cl((u - .6) / 1)) : 1 - ease(cl(z / 1));
    s += '<g opacity="' + k.toFixed(3) + '">' + cons29(560, 1150, 0, 0, t) + '<rect x="790" y="1040" width="150" height="110" rx="18" fill="#2C3350" stroke="#F4F6FB" stroke-width="5"/>' + svgT(865, 1112, 'USB', 38, '#F4F6FB');
    for (let i = 0; i < 2; i++) { const x0 = 590 + 30 * i, x1 = 820 + 30 * i, x = lerp(x0, x1, mv); s += '<rect x="' + (x - 18).toFixed(1) + '" y="' + (900 + 50 * i - 40 * Math.sin(Math.PI * mv)).toFixed(1) + '" width="54" height="40" rx="6" fill="' + ['#FFD23F', '#5CE1FF'][i] + '" stroke="#0B1020" stroke-width="4"/>'; }
    s += '</g>'; if (z !== undefined) s += chip3(720, 780, 'zum Spielen zurück', 40, '#3DFF7A', '#0B1020', cl((z - .2) / .3) * (1 - m)); }
  h += slot(ev, [['frei', 'PS5 mit 825 GB: rund 667 GB frei'], ['drittel', 'GTA 6: fast ein Drittel', 'hot'], ['usb', 'Trick: Spiele auf USB auslagern'], ['zurueck', 'Zum Spielen zurückkopieren']]);
  return W(s + shade3(), h); };
WMASC.i29platz = (ev, t) => BIG3();

// ---------- Schluss ----------
WORLD.i29outro = function (sc, ev, t) { return W(street26(t, 0, { RB: 2000, F: 3000 }) + shade3()); };
WMASC.i29outro = () => BIG3();

['i29hook', 'i29tex', 'i29ton', 'i29platz', 'i29outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC29); });
