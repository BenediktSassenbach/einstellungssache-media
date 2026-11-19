// I029 "Warum braucht GTA 6 so viel Platz?" (GTA-6-Spezial, Informatik) im Skript 4, Fassung v2 (17.11.2026). Design-Kennung 3.3.
// Benedikts Wunsch: mehr mit dem Hintergrund arbeiten, alles interaktiv in der Stadt statt Schaubild. Kein Wissenschaftsmodus.
// Ort: dieselbe Neon-Stadt wie I026 und I028 (street26 aus viz_i026.js).
// Einstieg: Haeuser der Skyline fliegen in eine Konsolen-Kiste (Zaehler bis 212 GB), die Kiste quillt ueber, Schalti drueckt, sie platzt.
// Teil 1: graue Hauswand, Schalti rollt die Textur auf, dann Unebenheit und Glanz, Lupe auf die Pixel, Textur abziehen und falten.
// Teil 2: Schritte, Hupe und Radio werfen Ton-Dateien aus, Turm waechst, blaeht sich auf, Konsole muss nicht entpacken, Turm wird Hochhaus.
// Teil 3: Parkhaus = Speicher der PS5. System grau, GTA-Bus parkt fast ein Drittel, Spiele auf den USB-Parkplatz schieben und zurueckholen.
// Zum Loeschen: diese Datei und videos/I029.
var AC29 = '#7C5CFF';
function bg29(t, skip) { return street26(t, 0, { RB: 2000, F: 3000, noPpl: 1, skip: skip }); }
// Leute auf dem Gehweg laufen vor den Dingen der Folge (Gehweg liegt vorn), nie dahinter
function ppl29(t) { return ppl26(t, 0, 220, 3000, 2000); }
// Baugeruest vor der Hauswand: Stangen, Boeden, Diagonalen, Netz an der Seite, Bauschild
function scaf29() { const X = WX29, Wd = WW29, Y = WY29; let s = '';
  for (const x of [X - 18, X + Wd / 2, X + Wd + 10]) s += '<rect x="' + (x - 4) + '" y="' + (Y - 30) + '" width="8" height="' + (GY26 - Y + 30) + '" fill="#C8A060"/><rect x="' + (x + 2) + '" y="' + (Y - 30) + '" width="2" height="' + (GY26 - Y + 30) + '" fill="#FFE2A8" opacity=".7"/>';
  for (let y = Y + 140; y < GY26 - 40; y += 150) s += '<rect x="' + (X - 26) + '" y="' + y + '" width="' + (Wd + 44) + '" height="10" fill="#B88A50"/><rect x="' + (X - 26) + '" y="' + (y + 10) + '" width="' + (Wd + 44) + '" height="4" fill="#000" opacity=".25"/>';
  for (let y = Y + 140; y < GY26 - 190; y += 300) s += '<path d="M' + (X - 18) + ' ' + y + ' L' + (X + Wd / 2) + ' ' + (y + 150) + '" stroke="#C8A060" stroke-width="5"/>';
  s += '<rect x="' + (X + Wd + 6) + '" y="' + (Y - 30) + '" width="22" height="' + (GY26 - Y + 30) + '" fill="#5FD0C0" opacity=".25"/>';
  return s; }
// kleines Haus (fliegt in die Kiste). x, y Mitte unten, z Groesse, c Farbe, r Drehung
function hs29(x, y, z, c, r) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (r || 0).toFixed(1) + ') scale(' + z.toFixed(3) + ')"><rect x="-40" y="-70" width="80" height="70" fill="' + c + '" stroke="#2A1440" stroke-width="2" stroke-opacity=".5"/><path d="M-48 -68 L0 -108 L48 -68 Z" fill="#2C2160" stroke="#2A1440" stroke-width="2" stroke-opacity=".5" stroke-linejoin="round"/><rect x="-24" y="-54" width="16" height="16" fill="#FFE14D"/><rect x="8" y="-54" width="16" height="16" fill="#FFE14D"/><rect x="-10" y="-28" width="20" height="28" fill="#0B1020"/></g>'; }
var HC29 = ['#B9A6FF', '#FF6BD6', '#5CE1FF', '#FFB0D9', '#7C5CFF', '#FFD23F'];
// Konsolen-Kiste: links x, Boden b, Breite w, Hoehe h, bu Ausbeulen, lab Anzeige
function kiste29(x, b, w, h, bu, lab, t, hot, fs) { const sh = 5 * bu * Math.sin(t * 38), ww = w + 50 * bu, xl = x - 25 * bu;
  return '<defs><linearGradient id="kg29" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C8C4D8"/><stop offset=".6" stop-color="#F4F2FA"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs><ellipse cx="' + (x + w / 2 + 14) + '" cy="' + (b + 4) + '" rx="' + (w * .62).toFixed(0) + '" ry="12" fill="#2A1440" opacity=".35"/><g transform="translate(' + sh.toFixed(1) + ' 0)"><rect x="' + xl.toFixed(1) + '" y="' + (b - h) + '" width="' + ww.toFixed(1) + '" height="' + h + '" rx="' + (24 + 30 * bu).toFixed(0) + '" fill="url(#kg29)" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/><rect x="' + (xl + 22).toFixed(1) + '" y="' + (b - 110) + '" width="' + (ww - 44).toFixed(1) + '" height="78" rx="16" fill="#0B1020"/>' + svgT(xl + ww / 2, b - 52 - (fs ? (46 - fs) / 3 : 0), lab, fs || 46, hot ? '#FF5A7A' : '#5CE1FF') + '<circle cx="' + (xl + ww - 30).toFixed(1) + '" cy="' + (b - h + 30) + '" r="9" fill="' + (bu > .5 ? '#FF5A7A' : '#3DFF7A') + '"/></g>'; }

// ---------- Einstieg ----------
var KX29 = 600, KW29 = 300, KH29 = 300;
var ST29 = [5, 2]; var STT29 = [.4, 1.3]; // Kacheln der Strasse, deren Haus abhebt, und wann // Kacheln der Strasse, deren Haus abhebt (Reihenfolge)
function flyH29(i, q) { const st = i < ST29.length, sx = st ? ST29[i] * T26 + 90 : 120 + (i * 137) % 860, sy = st ? GY26 - 160 : 760 + (i * 53) % 160, ex = KX29 + 40 + (i * 47) % (KW29 - 80), ey = GY26 - KH29 + 10; const e = ease(q);
  return [lerp(sx, ex, e), lerp(sy, ey, e) - 260 * Math.sin(Math.PI * e), st ? lerp(2.1, .55, e) : 1 - .45 * e, 200 * e * (i % 2 ? 1 : -1)]; }
WORLD.i29hook = function (sc, ev, t, lt) { const fr = ev.stopf, dr = ev.platz, pu = ev.puff, tot0 = fr === undefined ? lt : 99; const gone = ST29.filter((k, i) => tot0 - STT29[i] > 0); let s = bg29(t, gone);
  s += '<path d="M' + (KX29 + KW29) + ' ' + (GY26 - 60) + ' q60 0 70 50 t40 10" stroke="#2A1440" stroke-width="7" fill="none"/><rect x="' + (KX29 + KW29 + 100) + '" y="' + (GY26 - 30) + '" width="26" height="20" rx="4" fill="#E8E4F0"/>';
  const N = 14, tot = fr === undefined ? lt : 99, burst = dr === undefined ? 0 : (dr > .9 ? dr - .9 : 0), bu = dr === undefined ? (fr === undefined ? 0 : .35 * cl(fr / 1)) : (burst > 0 ? 0 : .35 + .65 * cl(dr / .9));
  let landed = 0; const gb = fr === undefined ? 212 * cl(lt / 2.2) : 212;
  for (let i = 0; i < N; i++) { const st = i < ST29.length ? STT29[i] : .2 + i * .15, q = cl((tot - st) / (i < ST29.length ? 1 : .7)); if (q <= 0) continue; if (q >= 1) { landed++; continue; } const p = flyH29(i, q); s += hs29(p[0], p[1], p[2], HC29[i % 6], p[3]); }
  if (burst <= 0) { let pile = ''; for (let i = 0; i < landed; i++) { const col = i % 4, row = Math.floor(i / 4), x = KX29 + 50 + col * 66 + (row % 2) * 30, y = GY26 - KH29 + 14 - row * 62; pile += hs29(x, y, .55, HC29[i % 6], (i % 3 - 1) * 8); } s += pile + kiste29(KX29, GY26, KW29, KH29, bu, Math.round(gb) + ' GB', t, gb >= 212); }
  else { const k = cl(burst / .9); s += kiste29(KX29, GY26, KW29, KH29 * (1 - .15 * cl(k * 4)), 0, '212 GB', t, 1);
    for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + (i - 5.5) * .26, d = 120 + 620 * k * (.6 + .4 * rnd(i + 3)), x = KX29 + KW29 / 2 + d * Math.cos(a), y = GY26 - KH29 + d * Math.sin(a) + 900 * k * k; if (y < 1700) s += hs29(x, y, .55, HC29[i % 6], 300 * k * (i % 2 ? 1 : -1)); }
    s += '<circle cx="' + (KX29 + KW29 / 2) + '" cy="' + (GY26 - KH29 - 30) + '" r="' + (60 + 140 * k).toFixed(0) + '" fill="#B9A6FF" opacity="' + (.5 * (1 - k)).toFixed(2) + '"/>'; }
  if (pu !== undefined) { const q = cl(pu / .5); s += hs29(380, lerp(900, GY26, q * q), .7, '#FFB0D9', 18 * (1 - q)); }
  return W(s + ppl29(t) + shade3()); };
WMASC.i29hook = (ev, t, lt, sc) => { const dr = ev.platz, pu = ev.puff;
  if (pu !== undefined) return stay3([200, 1537], 1, { r: -4, mood: 'cool' });
  if (dr !== undefined) { if (dr < .5) return stay3([lerp(220, 470, ease(dr / .5)), 1537 - 8 * Math.abs(Math.sin(t * 12))], 1, { r: 10 }); if (dr < .95) return stay3([470 + 6 * Math.sin(t * 30), 1537], 1, { r: 18, mood: 'shock' }); return hop3(cl((dr - .95) / .5), [470, 1537], [200, 1537], 70, 1, 1, { r: -20, mood: 'shock' }); }
  return stay3(HOME3, 1, ev.stopf !== undefined ? { r: -6, mood: 'shock' } : { r: 2 * Math.sin(t * 3) }); };

// ---------- Teil 1: die Hauswand ----------
var WX29 = 540, WY29 = 700, WW29 = 400, WH29 = GY26 - 700;
// Wand: rv Farbe von oben aufgerollt (0..1), bump Unebenheit, gl Glanz, peel Textur abgezogen
function wall29(t, rv, bump, gl, peel) { const X = WX29, Y = WY29, Wd = WW29, H = WH29; let s = '<rect x="' + X + '" y="' + Y + '" width="' + Wd + '" height="' + H + '" fill="#D8B8C0" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/><path d="M' + (X - 14) + ' ' + Y + ' h' + (Wd + 28) + ' v-26 h-' + (Wd + 28) + ' Z" fill="#5A6276" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/>';
  const win = []; for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) win.push([X + 40 + c * 125, Y + 60 + r * 150]);
  const vis = rv * (1 - peel);
  if (vis > 0) { s += '<clipPath id="wv29"><rect x="' + X + '" y="' + Y + '" width="' + Wd + '" height="' + (H * vis).toFixed(1) + '"/></clipPath><g clip-path="url(#wv29)"><rect x="' + X + '" y="' + Y + '" width="' + Wd + '" height="' + H + '" fill="#9C4A30"/>';
    const bh = 34, bw = 80; for (let r = 0; r * bh < H; r++) { const off = (r % 2) * bw / 2; let row = ''; for (let c = -1; c * bw < Wd; c++) { const bx = X + c * bw + off, by = Y + r * bh; row += '<rect x="' + (bx + 3) + '" y="' + (by + 3) + '" width="' + (bw - 6) + '" height="' + (bh - 6) + '" rx="3" fill="' + ['#C96A48', '#B4583A', '#D27B55'][(r * 7 + c * 3 + 9) % 3] + '"/>'; }
      if (bump > 0) row += '<path d="M' + X + ' ' + (Y + r * bh + 4) + ' h' + Wd + '" stroke="#F4C3A0" stroke-width="3" opacity="' + (.8 * bump).toFixed(2) + '"/><path d="M' + X + ' ' + (Y + r * bh + bh - 3) + ' h' + Wd + '" stroke="#4A1E10" stroke-width="5" opacity="' + (.8 * bump).toFixed(2) + '"/>';
      s += row; }
    s += '</g>'; }
  win.forEach((w, i) => { const on = vis > 0 && w[1] < Y + H * vis; s += '<rect x="' + w[0] + '" y="' + w[1] + '" width="70" height="90" rx="6" fill="' + (on ? '#3E1F78' : '#6A5A7A') + '" stroke="#2A1440" stroke-width="2" stroke-opacity=".5"/>';
    if (gl > 0 && on) { const ph = (t * .6 + i * .07) % 1.4; if (ph < 1) s += '<clipPath id="gw' + i + '"><rect x="' + w[0] + '" y="' + w[1] + '" width="70" height="90" rx="6"/></clipPath><g clip-path="url(#gw' + i + ')"><path d="M' + (w[0] - 60 + 190 * ph) + ' ' + w[1] + ' l40 0 l-60 90 l-40 0 Z" fill="#fff" opacity="' + (.75 * gl).toFixed(2) + '"/></g>'; } });
  return s; }
WORLD.i29wand = function (sc, ev, t, lt) { let s = bg29(t, [3, 4]), h = ''; const te = ev.tex, dr = ev.drei, px = ev.pix, pk = ev.pack;
  const rv = te === undefined ? 0 : ease(cl((te - .6) / 2.4)), bump = dr === undefined ? 0 : cl((dr - .9) / .5), gl = dr === undefined ? 0 : cl((dr - 1.8) / .5), peel = pk === undefined ? 0 : ease(cl(pk / .9));
  s += '<rect x="' + (WX29 - 20) + '" y="' + (GY26 - 6) + '" width="' + (WW29 + 60) + '" height="16" fill="#2A1440" opacity=".35"/>' + wall29(t, rv, bump, gl, peel) + '<rect x="' + WX29 + '" y="' + WY29 + '" width="' + WW29 + '" height="' + WH29 + '" fill="url(#k26L)"/><rect x="' + (WX29 - 14) + '" y="' + (WY29 - 12) + '" width="' + (WW29 + 28) + '" height="16" fill="#F2C8B0"/>' + scaf29();
  if (te !== undefined && rv < 1) { const ry = WY29 + WH29 * rv; s += '<path d="M360 1420 L' + (WX29 + 40) + ' ' + ry.toFixed(0) + '" stroke="#C9A36A" stroke-width="12" stroke-linecap="round"/><rect x="' + (WX29 + 10) + '" y="' + (ry - 22).toFixed(0) + '" width="' + (WW29 - 20) + '" height="44" rx="22" fill="#C96A48" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/>'; }
  if (dr !== undefined && px === undefined) [['Farbe', 0], ['Unebenheit', .9], ['Glanz', 1.8]].forEach((c, i) => { s += sign29(WX29 + 70 + i * 130, WY29 + 150, c[0], ['#FF5A7A', '#FFD23F', '#5CE1FF'][i], cl((dr - c[1]) / .3), 24); });
  if (px !== undefined && pk === undefined) { const k = cl(px / .4), z = ease(cl((px - .4) / 1.4)), n = Math.round(6 + 30 * z), cx = 700, cy = 900, r = 190;
    let g = '<clipPath id="lp29"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"/></clipPath><g clip-path="url(#lp29)"><rect x="' + (cx - r) + '" y="' + (cy - r) + '" width="' + (2 * r) + '" height="' + (2 * r) + '" fill="#C96A48"/>';
    const cs = 2 * r / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) g += '<rect x="' + (cx - r + i * cs).toFixed(1) + '" y="' + (cy - r + j * cs).toFixed(1) + '" width="' + (cs - 1).toFixed(1) + '" height="' + (cs - 1).toFixed(1) + '" fill="' + ['#C96A48', '#B4583A', '#D27B55', '#A54E33'][(i * 3 + j * 5) % 4] + '"/>';
    g += '</g><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#F4F6FB" stroke-width="14"/><path d="M' + (cx - r * .72) + ' ' + (cy + r * .72) + ' L420 1400" stroke="#F4F6FB" stroke-width="26" stroke-linecap="round"/>';
    s += '<g opacity="' + k.toFixed(3) + '">' + g + '</g>' + banner29('fast 17 Millionen Pixel', cl((px - 1.4) / .3)); }
  if (pk !== undefined) { const fold = ease(cl((pk - .9) / 1)), f8 = 1 - fold * (1 - 1 / Math.sqrt(8)), sq = pk > 2 ? .03 * Math.sin(t * 40) : 0, w = 300 * f8 * (1 + sq), hh = 380 * f8 * (1 - sq);
    const cx = lerp(WX29 + WW29 / 2, 520, ease(cl(pk / .9))), cy = lerp(WY29 + 300, 1360, ease(cl(pk / .9)));
    s += '<g transform="translate(' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ')"><clipPath id="pp29"><rect x="' + (-w / 2).toFixed(1) + '" y="' + (-hh / 2).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + hh.toFixed(1) + '" rx="6"/></clipPath><g clip-path="url(#pp29)"><rect x="-200" y="-250" width="400" height="500" fill="#C96A48"/>';
    for (let r = -8; r < 8; r++) s += '<path d="M-200 ' + (r * 34) + ' h400" stroke="#9C4A30" stroke-width="5"/>'; s += '</g><rect x="' + (-w / 2).toFixed(1) + '" y="' + (-hh / 2).toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + hh.toFixed(1) + '" rx="6" fill="none" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/></g>';
    s += banner29('höchstens etwa 1/8', cl((pk - 1.9) / .3)); }
  h += slot(ev, [['tex', 'Fast jede Fläche: eine Textur'], ['drei', 'Oft drei pro Fläche'], ['pix', '4K-Textur: fast 17 Mio. Pixel', 'hot'], ['pack', 'Packen: nur auf etwa 1/8']]);
  return W(s + ppl29(t) + shade3(), h); };
WMASC.i29wand = (ev, t) => { const te = ev.tex, dr = ev.drei, px = ev.pix, pk = ev.pack;
  if (pk !== undefined) return stay3([lerp(330, 300, ease(cl(pk / .9))) + (pk > 2 ? 3 * Math.sin(t * 40) : 0), 1537], 1, pk > 2.1 ? { r: -10, mood: 'shock' } : { r: 8 });
  if (px !== undefined) return stay3([lerp(260, 330, ease(cl(px / .5))), 1537], 1, { r: 10 });
  if (dr !== undefined) { const slap = [0, .9, 1.8].some(a => dr > a && dr < a + .25); return stay3([260, 1537 - (slap ? 20 : 0)], 1, { r: slap ? 14 : 4 }); }
  if (te !== undefined) return stay3([lerp(220, 260, ease(cl(te / .6))), 1537], 1, { r: 6 + 4 * Math.sin(t * 6) });
  return BIG3(); };

// ---------- Teil 2: Ton ----------
function file29(x, y, sz, col, zip) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (sz / 100).toFixed(3) + ')"><path d="M-40 -55 h55 l25 25 v85 h-80 Z" fill="' + col + '" stroke="#2A1440" stroke-width="3" stroke-opacity=".5" stroke-linejoin="round"/><path d="M15 -55 v25 h25" fill="none" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/><path d="M-14 26 v-46 l26 -8 v40" stroke="#2A1440" stroke-width="3" stroke-opacity=".5" fill="none" stroke-linecap="round"/><circle cx="-20" cy="28" r="9" fill="#0B1020"/><circle cx="6" cy="20" r="9" fill="#0B1020"/>' + (zip ? '<rect x="-46" y="-6" width="92" height="16" rx="5" fill="#0B1020"/><rect x="-10" y="-14" width="20" height="32" rx="5" fill="#C9CED9" stroke="#2A1440" stroke-width="2" stroke-opacity=".5"/>' : '') + '</g>'; }
var TC29 = ['#FFD23F', '#5CE1FF', '#FF6BD6', '#3DFF7A'];
var SRC29 = [[300, 1500], [470, 1440], [620, 1440]]; // Schaltis Schritte, Hupe am Auto, Radio
function tower29(n, inf) { let s = ''; const z = 70 * (1 + .8 * inf), rows = Math.ceil(n / 3), x0 = 720 - z * .62, wB = z * .95 * 3 + z * .24;
  if (rows > 0) { const top = GY26 - rows * z * 1.15 - 12; s += '<rect x="' + (x0 - 6).toFixed(1) + '" y="' + (GY26 - 6) + '" width="' + (wB + 24).toFixed(1) + '" height="14" fill="#2A1440" opacity=".35"/><rect x="' + x0.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + wB.toFixed(1) + '" height="' + (GY26 - top).toFixed(1) + '" fill="#6A4A8A"/><rect x="' + x0.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + wB.toFixed(1) + '" height="' + (GY26 - top).toFixed(1) + '" fill="url(#k26L)"/>';
    for (let r = 0; r <= rows; r++) { const y = GY26 - r * z * 1.15 - 12; s += '<rect x="' + (x0 - 6).toFixed(1) + '" y="' + (y - 4).toFixed(1) + '" width="' + (wB + 12).toFixed(1) + '" height="10" fill="#C8A0A8"/>'; }
    s += '<rect x="' + (x0 + wB - 6).toFixed(1) + '" y="' + top.toFixed(1) + '" width="6" height="' + (GY26 - top).toFixed(1) + '" fill="#FFD9A8" opacity=".8"/>'; }
   for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3), x = 720 + c * z * .95, y = GY26 - 40 - r * z * 1.15; s += file29(x, y, z, TC29[i % 4]); } return s; }
function car29(x, b, honk) { let s = '<g transform="translate(' + x + ' ' + b + ')"><ellipse cx="0" cy="2" rx="120" ry="10" fill="#2A1440" opacity=".35"/>' + carP28(240, 100, '#FF5A7A', -1) + '</g>';
  if (honk > 0) for (let i = 0; i < 3; i++) s += '<path d="M' + (x - 130 - i * 22) + ' ' + (b - 70) + ' q-14 24 0 48" stroke="#FFE14D" stroke-width="6" fill="none" opacity="' + (honk * (1 - i * .25)).toFixed(2) + '"/>'; return s; }
function radio29(on, t) { const bp = on ? 1 + .06 * Math.sin(t * 16) : 1; return '<g transform="translate(620 1548) scale(' + bp.toFixed(3) + ')"><rect x="-70" y="-96" width="140" height="92" rx="14" fill="#FFB0D9" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/><path d="M-40 -96 q40 -40 80 0" stroke="#2A1440" stroke-width="3" stroke-opacity=".5" fill="none"/><circle cx="-34" cy="-48" r="24" fill="#0B1020"/><circle cx="34" cy="-48" r="24" fill="#0B1020"/><circle cx="-34" cy="-48" r="9" fill="#5A6276"/><circle cx="34" cy="-48" r="9" fill="#5A6276"/></g>' + (on ? '<path d="M700 1470 q20 -16 40 0 M705 1440 q26 -20 52 0" stroke="#FFE14D" stroke-width="5" fill="none"/>' : ''); }
WORLD.i29ton = function (sc, ev, t, lt) { let s = bg29(t), h = ''; const to = ev.ton, ro = ev.roh, cp = ev.cpu, ti = ev.titan;
  s += radio29(to !== undefined && to > 1.9 && ro === undefined, t);
  const nT = to === undefined ? 0 : Math.min(12, Math.floor(cl((to - .3) / 2.6) * 12) ), inf = ro === undefined ? 0 : ease(cl((ro - .2) / 1.2));
  s += car29(430, GY26, to !== undefined && to > 1 && to < 1.8 ? 1 : 0);
  if (ti === undefined) s += tower29(ro === undefined ? nT : 12, inf);
  else { const g = ease(cl(ti / 1.2)), top = lerp(GY26 - 520, 760, g); s += '<rect x="660" y="' + top.toFixed(0) + '" width="280" height="' + (GY26 - top).toFixed(0) + '" fill="#9A7AD8"/><rect x="660" y="' + top.toFixed(0) + '" width="280" height="' + (GY26 - top).toFixed(0) + '" fill="url(#k26L)"/><rect x="934" y="' + top.toFixed(0) + '" width="6" height="' + (GY26 - top).toFixed(0) + '" fill="#FFD9A8" opacity=".8"/><path d="M700 ' + (top - 10).toFixed(0) + ' v10 M880 ' + (top - 10).toFixed(0) + ' v10" stroke="#5A3A6A" stroke-width="8"/>';
    for (let r = 0; top + 120 + r * 120 < GY26 - 40; r++) for (let c = 0; c < 3; c++) s += file29(705 + c * 92, top + 120 + r * 120, 64, TC29[(r + c) % 4]);
    s += '<rect x="640" y="' + (top - 90).toFixed(0) + '" width="300" height="80" rx="12" fill="#0B1020" stroke="' + AC29 + '" stroke-width="6"/>' + svgT(790, top - 36, 'Titanfall: 48 GB', 38, '#FFE14D'); }
  if (to !== undefined && ro === undefined) for (let i = 0; i < 12; i++) { const st = .3 + i * 2.6 / 12, q = cl((to - st) / .5); if (q <= 0 || q >= 1) continue; const src = SRC29[i % 3], c = i % 3, r = Math.floor(i / 3), ex = 720 + c * 66, ey = GY26 - 40 - r * 80, e = ease(q);
    s += file29(lerp(src[0], ex, e), lerp(src[1], ey, e) - 160 * Math.sin(Math.PI * e), 70, TC29[i % 4]); }
  if (cp !== undefined && ti === undefined) { const zipIn = cl((cp - .1) / .6), raw = cl((cp - 1.6) / .6), steam = cp > .7 && cp < 1.5 ? 1 : 0;
    s += kiste29(520, GY26, 240, 230, steam ? .25 : 0, steam ? 'entpacken …' : raw >= 1 ? 'direkt los' : 'Konsole', t, steam, 30);
    if (zipIn < 1) s += file29(lerp(760, 630, ease(zipIn)), lerp(1300, 1360, ease(zipIn)), 60, '#FFD23F', 1);
    if (steam) { for (let i = 0; i < 4; i++) { const ph = (t * 1.5 + i / 4) % 1; s += '<circle cx="' + (500 + i * 34) + '" cy="' + (1120 - 140 * ph).toFixed(0) + '" r="' + (18 + 20 * ph).toFixed(0) + '" fill="#F4F6FB" opacity="' + (.6 * (1 - ph)).toFixed(2) + '"/>'; } }
    if (cp > 1.6 && raw < 1) s += file29(lerp(800, 630, ease(raw)), lerp(1300, 1360, ease(raw)), 110, '#3DFF7A');
    }
  h += slot(ev, [['ton', 'Jeder Ton ist eine Datei'], ['roh', 'Manchmal ungepackt'], ['cpu', 'Spart Arbeit beim Spielen', 'hot'], ['titan', 'Titanfall: 48 GB, vor allem Ton']]);
  return W(s + ppl29(t) + shade3(), h); };
WMASC.i29ton = (ev, t) => { const to = ev.ton, ti = ev.titan;
  if (to !== undefined && ev.roh === undefined) { const run = Math.abs(Math.sin(t * 12));
    if (to < .9) return stay3([lerp(220, 300, ease(cl(to / .9))), 1537 - 10 * run], 1, { r: 8, walk: 1 });
    if (to < 1.8) { const p = Math.max(0, Math.sin((to - .9) * 14)); return stay3([300, 1537 - 8 * p], 1, { r: 16 + 10 * p, mood: 'shock' }); } /* drueckt auf die Hupe */
    if (to < 2.5) return stay3([lerp(300, 470, ease(cl((to - 1.8) / .7))), 1537 - 10 * run], 1, { r: 8, walk: 1 });
    return stay3([470, 1537 - 4 * Math.abs(Math.sin(t * 8))], 1, { r: 6 * Math.sin(t * 8), mood: 'cool' }); } /* hat das Radio angedreht, wippt mit */
  if (ev.roh !== undefined && ev.cpu === undefined) return stay3([lerp(470, 300, ease(cl(ev.roh / .8))), 1537], 1, { r: -6, walk: ev.roh < .8 ? 1 : 0 });
  if (ti !== undefined) return stay3([300, 1537], 1, ti > .8 ? { r: -14, mood: 'shock' } : { r: -14 * cl(ti / .8) });
  return stay3([300, 1537], 1, { r: 2 }); };

// ---------- Teil 3: das Parkhaus ----------
var PX29 = 120, PL29 = 820, PY29 = 1070; // Deck: links, Laenge (= 825 GB), Boden
var SYS29 = PL29 * 158 / 825, GTA29 = PL29 * 212 / 825;
function park29(nosign) { let s = garage29() + '<rect x="' + (PX29 - 20) + '" y="800" width="' + (PL29 + 40) + '" height="' + (PY29 - 800 + 30) + '" fill="#6A4A7A" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/><rect x="' + (PX29 - 30) + '" y="790" width="' + (PL29 + 60) + '" height="30" fill="#3A2F7A" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/><rect x="' + (PX29 - 30) + '" y="' + PY29 + '" width="' + (PL29 + 60) + '" height="30" fill="#3A2F7A" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/>';
  for (let i = 0; i <= 20; i++) s += '<path d="M' + (PX29 + i * PL29 / 20).toFixed(0) + ' ' + (PY29 - 6) + ' v-50" stroke="#F4F6FB" stroke-width="4" opacity=".5"/>';
  s += '<rect x="' + (PX29 + 10) + '" y="' + (PY29 - 150) + '" width="' + (SYS29 - 20).toFixed(0) + '" height="140" rx="10" fill="#5A6276" stroke="#2A1440" stroke-width="2" stroke-opacity=".5"/>' + svgT(PX29 + SYS29 / 2, PY29 - 70, 'System', 30, '#C9CED9');
  return nosign ? s : s + roof29(); s += '<rect x="390" y="700" width="300" height="70" rx="12" fill="#0B1020" stroke="#5CE1FF" stroke-width="5"/>' + svgT(540, 748, 'PS5: 825 GB', 38, '#5CE1FF'); }
function carP29(x, y, w, col, lab) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"><rect x="0" y="-110" width="' + w.toFixed(0) + '" height="96" rx="20" fill="' + col + '" stroke="#2A1440" stroke-width="3" stroke-opacity=".5"/><rect x="16" y="-96" width="' + (w - 32).toFixed(0) + '" height="34" rx="8" fill="#2C3A66"/><circle cx="34" cy="-12" r="18" fill="#0B1020"/><circle cx="' + (w - 34).toFixed(0) + '" cy="-12" r="18" fill="#0B1020"/>' + (lab ? svgT(w / 2, -30, lab, 30, '#fff') : '') + '</g>'; }
// Parkhaus als Gebaeude: von der Dachkante bis zum Boden, Pfeiler, Zwischendecken, Rampe, Lichtseite zur Sonne, Schatten auf dem Gehweg
function garage29() { const X0 = PX29 - 30, X1 = PX29 + PL29 + 30; let s = '<defs><linearGradient id="gc29" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9A7A92"/><stop offset=".7" stop-color="#C8A0A8"/><stop offset="1" stop-color="#F2C8B0"/></linearGradient><linearGradient id="gi29" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A3A6E"/><stop offset="1" stop-color="#8A6082"/></linearGradient></defs>';
  s += '<rect x="' + (X0 - 10) + '" y="' + (GY26 - 6) + '" width="' + (X1 - X0 + 40) + '" height="16" fill="#2A1440" opacity=".3"/><rect x="' + X0 + '" y="800" width="' + (X1 - X0) + '" height="' + (GY26 - 800) + '" fill="url(#gi29)"/>';
  for (const y of [1100, 1330]) s += '<rect x="' + X0 + '" y="' + y + '" width="' + (X1 - X0) + '" height="26" fill="url(#gc29)"/><rect x="' + X0 + '" y="' + (y + 26) + '" width="' + (X1 - X0) + '" height="8" fill="#000" opacity=".25"/>';
  for (let x = X0; x <= X1 - 30; x += (X1 - X0 - 30) / 5) s += '<rect x="' + x.toFixed(0) + '" y="800" width="30" height="' + (GY26 - 800) + '" fill="url(#gc29)"/><rect x="' + (x + 24).toFixed(0) + '" y="800" width="6" height="' + (GY26 - 800) + '" fill="#FFE2C4" opacity=".6"/>';
  s += '<path d="M' + (X0 + 40) + ' ' + (GY26 - 6) + ' L' + (X0 + 330) + ' 1360" stroke="#C8A0A8" stroke-width="20"/><path d="M' + (X0 + 360) + ' 1330 L' + (X0 + 640) + ' 1130" stroke="#C8A0A8" stroke-width="20" opacity=".8"/>';
  return s; }
// Schild am Geruest: haengt an zwei Seilen unter einem Brett
function sign29(x, y, txt, col, k, fs) { if (k <= .01) return ''; const w = txt.length * fs * .62 + 30, sw = 4 * Math.sin(PLMT28 * 2 + x) * (1 - k); return '<g opacity="' + cl(k * 2).toFixed(2) + '" transform="rotate(' + sw.toFixed(1) + ' ' + x + ' ' + (y - 14) + ')"><path d="M' + (x - w / 2 + 12) + ' ' + (y - 14) + ' l6 26 M' + (x + w / 2 - 12) + ' ' + (y - 14) + ' l-6 26" stroke="#5A3A3A" stroke-width="3"/><rect x="' + (x - w / 2) + '" y="' + (y + 10) + '" width="' + w + '" height="' + (fs + 18) + '" rx="6" fill="' + col + '"/><rect x="' + (x - w / 2) + '" y="' + (y + 10) + '" width="' + w + '" height="5" rx="3" fill="#fff" opacity=".4"/>' + svgT(x, y + 10 + fs + 4, txt, fs, '#2A1440') + '</g>'; }
// Banner oben am Geruest
function banner29(txt, k) { if (k <= .01) return ''; const y = WY29 - 82, X = WX29 - 20, w = WW29 + 40; return '<g opacity="' + cl(k * 2).toFixed(2) + '"><path d="M' + (X + 20) + ' ' + (y + 52) + ' v30 M' + (X + w - 20) + ' ' + (y + 52) + ' v30" stroke="#C8A060" stroke-width="6"/><path d="M' + X + ' ' + y + ' h' + w + ' v52 q-' + (w / 2) + ' ' + (10 * Math.sin(PLMT28 * 2)).toFixed(1) + ' -' + w + ' 0 Z" fill="#FFE14D"/>' + svgT(X + w / 2, y + 36, txt, 30, '#2A1440') + '</g>'; }
// Leuchtanzeige auf dem Parkhausdach: oben die Groesse, unten der Stand (RS29 setzt die Folge je Satz)
var RS29 = ['', '#fff', 28];
function roof29() { const X = 330, W = 420, Y = 640; let s = '<path d="M' + (X + 50) + ' ' + (Y + 120) + ' V792 M' + (X + W - 50) + ' ' + (Y + 120) + ' V792" stroke="#5A3A6A" stroke-width="10"/><rect x="' + (X + 8) + '" y="' + (Y + 10) + '" width="' + W + '" height="120" rx="16" fill="#2A1440" opacity=".35"/><rect x="' + X + '" y="' + Y + '" width="' + W + '" height="120" rx="16" fill="url(#cm28)"/><rect x="' + (X + 10) + '" y="' + (Y + 10) + '" width="' + (W - 20) + '" height="100" rx="10" fill="#140A26"/>';
  s += svgT(X + W / 2, Y + 50, 'PS5: 825 GB', 32, '#5CE1FF') + (RS29[0] ? svgT(X + W / 2, Y + 92, RS29[0], RS29[2], RS29[1]) + '<rect x="' + X + '" y="' + Y + '" width="' + W + '" height="120" rx="16" fill="' + RS29[1] + '" opacity=".08"/>' : '');
  return s; }
// Autoaufzug aussen am Parkhaus: senkrecht vom Parkdeck nach unten, dann ins USB-Deck. q 0..1, gibt [x, y, Zeichnung]
function lift29(home, usb, q) { if (q <= 0) return [home[0], home[1], '']; const e = ease, a = cl(q / .55), b = cl((q - .55) / .45), x = b > 0 ? lerp(home[0], usb[0], e(b)) : home[0], y = lerp(home[1], usb[1], e(a)); let s = '';
  if (q < .58) s += '<path d="M' + (home[0] - 6) + ' ' + (home[1] - 120) + ' V' + (GY26 + 4) + ' M' + (home[0] + 140) + ' ' + (home[1] - 120) + ' V' + (GY26 + 4) + '" stroke="#E8E4F0" stroke-width="6" opacity=".85"/><rect x="' + (home[0] - 10) + '" y="' + (y + 2).toFixed(1) + '" width="154" height="12" rx="4" fill="#8A7A9A"/><rect x="' + (home[0] - 10) + '" y="' + (y + 2).toFixed(1) + '" width="154" height="3" fill="#FFE14D" opacity=".8"/>';
  return [x, y, s]; }
// Knopf am Pfeiler, Schalti drueckt ihn
function btn29(e, t) { const X = 500, Y = 1410, on = e >= 0 && e < 1.4; return '<rect x="' + (X - 16) + '" y="' + (Y - 30) + '" width="32" height="64" rx="8" fill="#E8E4F0"/><circle cx="' + X + '" cy="' + (Y - 6) + '" r="9" fill="' + (on ? '#3DFF7A' : '#5A6A5A') + '"/><circle cx="' + X + '" cy="' + (Y + 16) + '" r="6" fill="#FF5A7A" opacity=".7"/>' + (on ? '<circle cx="' + X + '" cy="' + (Y - 6) + '" r="18" fill="#3DFF7A" opacity=".3"/>' : ''); }
var GC29 = [['#FFD23F', 150], ['#5CE1FF', 140], ['#FF6BD6', 140]];
WORLD.i29park = function (sc, ev, t, lt) { let s = bg29(t), h = ''; const fr = ev.frei, dr = ev.drittel, us = ev.usb, zu = ev.zurueck;
  RS29 = zu !== undefined ? ['zurück: meist schneller als neu laden', '#3DFF7A', 22] : us !== undefined ? ['Spiele auf die USB-Platte', '#5CE1FF', 28] : dr !== undefined && dr > 2.5 ? ['voll', '#FF5A7A', 34] : dr !== undefined && dr > 1.1 ? ['GTA 6: fast ein Drittel', '#FFE14D', 28] : fr !== undefined && fr > .8 ? ['frei: rund 667 GB', '#3DFF7A', 30] : ['', '#fff', 28];
  s += btn29(us !== undefined && zu === undefined ? (us - .5) : zu !== undefined ? zu - .2 : -1, t);
  s += park29();
  const fk = fr === undefined ? 0 : cl((fr - .8) / .5); if (fk > 0 && dr === undefined) s += '<rect x="' + (PX29 + SYS29).toFixed(0) + '" y="' + (PY29 - 150) + '" width="' + (PL29 - SYS29).toFixed(0) + '" height="140" rx="10" fill="#3DFF7A" opacity="' + (.3 * fk).toFixed(2) + '"/>' ;
  const uk = us === undefined ? 0 : cl(us / .4); /* USB-Deck: das Erdgeschoss des Parkhauses ist die angeschlossene USB-Platte, eigenes Schild, eigene Markierung */
  s += '<rect x="560" y="1530" width="400" height="18" fill="#C8A0A8" opacity=".7"/><path d="M700 1500 v40 M840 1500 v40" stroke="#F4F6FB" stroke-width="5" opacity="' + (.4 + .5 * uk).toFixed(2) + '"/><path d="M640 1364 v14 M880 1364 v14" stroke="#5A3A6A" stroke-width="5"/><rect x="620" y="1376" width="280" height="44" rx="10" fill="url(#cm28)"/><rect x="628" y="1382" width="264" height="32" rx="7" fill="#140A26"/>' + svgT(760, 1407, 'USB-Platte', 26, uk > .5 ? '#5CE1FF' : '#7A8AA8') + '<rect x="560" y="1370" width="400" height="178" fill="#5CE1FF" opacity="' + (.1 * uk).toFixed(2) + '"/>';
  const gx0 = PX29 + SYS29 + 6; if (dr !== undefined) { const q = ease(cl(dr / 1.1)); s += carP29(lerp(1100, gx0, q), PY29 - 4, GTA29 - 12, AC29, 'GTA 6'); }
  if (dr !== undefined) { let px = gx0 + GTA29; GC29.forEach((g, i) => { const inq = ease(cl((dr - 1.6 - i * .25) / .6)), home = [px + 8, PY29 - 4], usbP = [580 + i * 140, 1530];
      let x = lerp(1100 + i * 160, home[0], inq), y = home[1];
      if (us !== undefined && i < 2) { const q = cl((us - .5 - i * .7) / 1.2); const L = lift29(home, usbP, q); x = L[0]; y = L[1]; s += L[2]; }
      if (zu !== undefined && i === 0) { const q = cl((zu - .2) / 1.2); const L = lift29(home, usbP, 1 - q); x = L[0]; y = L[1]; s += L[2]; if (false) s += '<path d="M' + (x + g[1] + 10).toFixed(0) + ' ' + (y - 80).toFixed(0) + ' h70 M' + (x + g[1] + 10).toFixed(0) + ' ' + (y - 50).toFixed(0) + ' h100" stroke="#F4F6FB" stroke-width="6" stroke-linecap="round"/>'; }
      s += carP29(x, y, g[1] - 16, g[0], ''); px += g[1]; });
    const full = cl((dr - 2.5) / .3) * (us === undefined ? 1 : 1 - cl((us - 1) / .3)); }
  h += slot(ev, [['frei', 'PS5 mit 825 GB: rund 667 GB frei'], ['drittel', 'GTA 6: fast ein Drittel', 'hot'], ['usb', 'Trick: Spiele auf USB auslagern'], ['zurueck', 'Zum Spielen zurückkopieren']]);
  return W(s + ppl29(t) + shade3(), h); };
WMASC.i29park = (ev, t, lt) => { const us = ev.usb, zu = ev.zurueck;
  const press = e => e > 0 && e < .35 ? Math.sin(Math.PI * e / .35) : 0;
  if (us !== undefined && zu === undefined) { const q = cl(us / .5), p = Math.max(press(us - .5), press(us - 1.2)); return stay3([lerp(220, 400, ease(q)), 1537 - 8 * Math.abs(Math.sin(t * 12)) * (q < 1 ? 1 : 0) - 12 * p], 1, { r: q < 1 ? 14 : -18 * p, walk: q < 1 ? 1 : 0 }); }
  if (zu !== undefined) { const p = press(zu - .2); return stay3([400, 1537 - 12 * p], 1, { r: -18 * p, mood: zu > 1.4 ? 'happy' : undefined }); }
  const X = lerp(300, 220, ease(cl(lt / .7)));
  if (ev.drittel !== undefined) return stay3([X, 1537], 1, ev.drittel > 2.5 ? { r: -6, mood: 'shock' } : { r: -6 });
  return stay3([X, 1537], 1, { r: 2 }); };

// ---------- Schluss ----------
WORLD.i29outro = function (sc, ev, t) { return W(bg29(t) + park29(1) + carP29(PX29 + SYS29 + 6, PY29 - 4, GTA29 - 12, AC29, 'GTA 6') + ppl29(t) + shade3()); };
WMASC.i29outro = (ev, t, lt) => stay3([lerp(420, 220, ease(cl(lt / .8))), 1537], 1, { r: 2 });

['i29hook', 'i29wand', 'i29ton', 'i29park', 'i29outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC29); });
