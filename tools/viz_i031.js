// I031 "Wie bewegt ein Spiel so viele Leute?" (Informatik, Skript Videospiel mit Skript 4 Abschnitt 9 und Neue Werkzeuge, Kostuem S1 Sunset-Hemd), stumme Demo v1 (26.11.2026).
// Ort: Strandpromenade einer Kuestenstadt bei Sonnenuntergang (eigener Stil). Ueber ein bestimmtes Spiel wird nichts behauptet.
// Teil 1: Werbetafel auf der Promenade zeigt das Drohnenbild (Navigationsnetz, Hindernisse, Weg zum Ziel).
// Teil 2: Ausweichen am Ort (Nachbar-Kreis, Kraftpfeile, Schalti als Hindernis). Teil 3: Ringe um die Kamera, nah genau, weit weg einfach.
// Nutzt sky28, sun28, cloud28, gulls28, dust28, warm28 (viz_p028.js), slot, stay3. Zum Loeschen: diese Datei und videos/I031.
var AC31 = '#7C5CFF', XS31 = 240, GY31 = 1537, SKY31 = null;
const mv31 = (a, b, k) => lerp(a, b, ease(cl(k)));
const COL31 = ['#FF6B8A', '#3DC6FF', '#FFD23F', '#8AE65C', '#FF9A3D', '#B98CFF', '#F4F6FB', '#2EC4B6'];

// ---------- Ort: Promenade ----------
function palm31(x, y, h, t) { let s = '<path d="M' + x + ' ' + y + ' q12 ' + (-h * .5) + ' -6 ' + (-h) + '" stroke="#5A3A3E" stroke-width="' + (h * .07).toFixed(0) + '" fill="none" stroke-linecap="round"/>';
  for (let i = 0; i < 7; i++) { const a = -150 + i * 40 + 4 * Math.sin(t * 1.2 + i), r = h * .42, tx = x - 6 + Math.cos(a * Math.PI / 180) * r, ty = y - h + Math.sin(a * Math.PI / 180) * r * .7 + r * .25;
    s += '<path d="M' + (x - 6) + ' ' + (y - h) + ' Q' + ((x - 6 + tx) / 2).toFixed(0) + ' ' + (y - h - r * .35).toFixed(0) + ' ' + tx.toFixed(0) + ' ' + ty.toFixed(0) + '" stroke="#2E6A4A" stroke-width="' + (h * .06).toFixed(0) + '" fill="none" stroke-linecap="round"/>'; }
  return s; }
function prom31(t, o) { o = o || {}; if (!SKY31) SKY31 = sky28(); let s = SKY31 + sun28(t) + cloud28(t) + gulls28(t);
  s += '<rect x="0" y="960" width="1080" height="100" fill="#3A5BA8"/><path d="M0 960 H1080" stroke="#FFC48A" stroke-width="4" opacity=".7"/>';
  for (let i = 0; i < 9; i++) { const c = (t * .2 + i / 9) % 1; s += '<path d="M' + (700 + 40 * Math.sin(i)) + ' ' + (970 + 80 * c).toFixed(0) + ' h' + (60 + 50 * c).toFixed(0) + '" stroke="#FFD9A0" stroke-width="5" opacity="' + (.6 * (1 - c)).toFixed(2) + '"/>'; }
  s += '<rect x="0" y="1060" width="1080" height="90" fill="#F0C890"/><rect x="0" y="1140" width="1080" height="22" fill="#D8B48A" stroke="#7A4A3A" stroke-width="3"/>';
  s += '<path d="M0 1160 H1080 V1920 H0 Z" fill="#C98F7A"/>';
  for (let i = -8; i <= 8; i++) s += '<path d="M' + (540 + i * 60) + ' 1160 L' + (540 + i * 260) + ' 1920" stroke="#B07868" stroke-width="3"/>';
  for (let k = 0; k < 7; k++) { const y = 1160 + 760 * Math.pow(k / 7, 1.6); s += '<path d="M0 ' + y.toFixed(0) + ' H1080" stroke="#B07868" stroke-width="3"/>'; }
  // Kiosk mit Markise rechts hinten, Laternen, Palmen
  s += '<rect x="830" y="1040" width="170" height="120" fill="#F4E3C8" stroke="#5A3A3E" stroke-width="4"/>'; for (let i = 0; i < 6; i++) s += '<path d="M' + (822 + i * 32) + ' 1030 h32 l-6 24 h-32 Z" fill="' + (i % 2 ? '#FF6B8A' : '#F4F6FB') + '" stroke="#5A3A3E" stroke-width="3"/>';
  s += '<rect x="860" y="1080" width="60" height="40" fill="#3A5BA8" opacity=".7"/>';
  [[110, 1160, 280], [640, 1158, 240]].forEach(([x, y, h], i) => { if (!(o.board && i === 1)) s += palm31(x, y, h, t); });
  (o.board ? [] : [[380, 1160], [770, 1160]]).forEach(([x, y]) => s += '<rect x="' + (x - 4) + '" y="' + (y - 150) + '" width="8" height="150" fill="#3A2A3E"/><circle cx="' + x + '" cy="' + (y - 156) + '" r="12" fill="#FFE9A8"/><circle cx="' + x + '" cy="' + (y - 156) + '" r="30" fill="#FFE9A8" opacity=".25"/>');
  return s; }

// ---------- Leute ----------
// Figur mit Fuessen bei (x, y), Groesse s, Farbe c, Schrittphase ph, dir Blickrichtung, simple: einfache graue Form
function person31(x, y, s, c, ph, dir, o) { o = o || {}; if (o.op !== undefined && o.op <= .02) return ''; const op = o.op === undefined ? 1 : o.op;
  if (o.simple) return '<g opacity="' + (op * .85).toFixed(2) + '"><ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + (26 * s).toFixed(0) + '" ry="' + (7 * s).toFixed(0) + '" fill="#000" opacity=".2"/><rect x="' + (x - 18 * s).toFixed(0) + '" y="' + (y - 120 * s).toFixed(0) + '" width="' + (36 * s).toFixed(0) + '" height="' + (120 * s).toFixed(0) + '" rx="' + (18 * s).toFixed(0) + '" fill="#8A8FA8"/></g>';
  const sw = Math.sin(ph) * 22 * s; let g = '<g opacity="' + op.toFixed(2) + '"><ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + (30 * s).toFixed(0) + '" ry="' + (8 * s).toFixed(0) + '" fill="#000" opacity=".22"/>';
  g += '<path d="M' + x.toFixed(0) + ' ' + (y - 60 * s).toFixed(0) + ' l' + sw.toFixed(0) + ' ' + (60 * s).toFixed(0) + ' M' + x.toFixed(0) + ' ' + (y - 60 * s).toFixed(0) + ' l' + (-sw).toFixed(0) + ' ' + (60 * s).toFixed(0) + '" stroke="#2A2340" stroke-width="' + (11 * s).toFixed(1) + '" stroke-linecap="round"/>';
  g += '<rect x="' + (x - 20 * s).toFixed(0) + '" y="' + (y - 118 * s).toFixed(0) + '" width="' + (40 * s).toFixed(0) + '" height="' + (64 * s).toFixed(0) + '" rx="' + (14 * s).toFixed(0) + '" fill="' + c + '" stroke="#2A2340" stroke-width="' + (3 * s).toFixed(1) + '"/>';
  g += '<circle cx="' + (x + 3 * dir * s).toFixed(0) + '" cy="' + (y - 136 * s).toFixed(0) + '" r="' + (17 * s).toFixed(0) + '" fill="#E8B48E" stroke="#2A2340" stroke-width="' + (3 * s).toFixed(1) + '"/><path d="M' + (x - 16 * s).toFixed(0) + ' ' + (y - 140 * s).toFixed(0) + ' q' + (16 * s).toFixed(0) + ' ' + (-22 * s).toFixed(0) + ' ' + (32 * s).toFixed(0) + ' 0" fill="#3A2A20"/>';
  if (o.hl) g += '<ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + (44 * s).toFixed(0) + '" ry="' + (13 * s).toFixed(0) + '" fill="none" stroke="' + o.hl + '" stroke-width="5"/>';
  return g + '</g>'; }
const yd31 = d => lerp(1545, 1335, d), sd31 = d => lerp(1.2, .5, d); // Laufbahnen unter dem Untertitel-Band
// Menge auf der Promenade mit einfachem Ausweichen (Nachbarn schieben sich in der Tiefe auseinander). o.lod: Ringe (0..1), o.hide: Abstand um Schalti
function crowd31(t, o) { o = o || {}; const N = 16, P = [];
  for (let i = 0; i < N; i++) { const dir = i % 2 ? -1 : 1, d = .05 + .9 * rnd(i + 500), sp = 70 + 50 * rnd(i + 501), x = ((t * sp * dir + rnd(i + 502) * 1400) % 1400 + 1400) % 1400 - 160; P.push({ i, dir, d, x, c: COL31[i % 8] }); }
  for (const p of P) { let push = 0; for (const q of P) { if (q === p) continue; const dx = q.x - p.x, dd = q.d - p.d; const near = Math.abs(dx) < 150 && Math.abs(dd) < .16; if (near) push -= Math.sign(dd || (p.i - q.i)) * (.16 - Math.abs(dd)) * (1 - Math.abs(dx) / 150); } p.d2 = cl(p.d + push * 1.8, .02, .98); }
  P.sort((a, b) => b.d2 - a.d2); let s = '';
  for (const p of P) { const y = yd31(p.d2), sc = sd31(p.d2); let op = 1; if (y > 1360) { const dx = Math.abs(p.x - XS31); op = cl((dx - 170) / 90); }
    let simple = false, hl = null; if (o.lod !== undefined) { const far = p.d2 > .5, mid = p.d2 > .2; if (far && o.lod > .5) simple = true; if (!mid && o.near) hl = '#3DFF7A'; }
    s += person31(p.x, y, sc, p.c, t * 9 + p.i, p.dir, { op: op, simple: simple, hl: hl }); }
  return s; }

// ---------- Einstieg ----------
WORLD.i31Hook = function (sc, ev, t, lt) { const fr = ev.frage; let s = prom31(t) + crowd31(t);
  { const k = cl((lt - .2) / 3), sh = 60 * Math.sin(Math.PI * k), ph = t * 10; s += person31(lerp(960, 560, k), 1470 - sh, 1.05, '#3DC6FF', ph, -1, {}) + person31(lerp(480, 880, k), 1470 + sh * .4, 1.05, '#FF6B8A', ph + 1, 1, {}); } /* zwei Leute weichen sich ab Bild 1 aus */
  if (fr !== undefined) { const k = cl(fr / 2), x = lerp(900, 330, k), dy = -60 * Math.sin(Math.PI * cl((k - .55) / .45)); s += person31(x, 1460 + dy, .95, '#FF9A3D', t * 10, -1, { op: cl((x - 330) / 40) }); }
  return W(s + dust28(t) + warm28() + shade3()); };
WMASC.i31Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (fr !== undefined && lo === undefined) { const fl = Math.sin(Math.PI * cl((fr - 1.1) / .7)); return stay3([XS31 - 20 * fl, GY31 - 14 * fl], 1, { flip: 1, r: -12 * fl, mood: 'shock' }); }
  if (lo !== undefined) { const j = Math.sin(Math.PI * cl(lo / .6)); return stay3([XS31, GY31 - 18 * j], 1, { flip: 1, r: 4 * j, mood: 'happy' }); }
  return stay3([XS31, GY31], 1, { flip: 1, r: 3 * Math.sin(t * 2), mood: 'shock' }); };

// ---------- Teil 1: Navigationsnetz auf der Werbetafel (Drohnenbild) ----------
const BX31 = 410, BY31 = 680, BW31 = 520, BH31 = 400; // rechts vom Etikett, im sicheren Bereich
const OB31 = [[120, 260, 30], [300, 330, 30], [480, 250, 30]];
function map31(t, ev) { const ge = ev.gehen, we = ev.weg; let s = '<rect width="600" height="460" fill="#C98F7A"/><rect width="600" height="70" fill="#3A5BA8"/><rect y="70" width="600" height="70" fill="#F0C890"/><rect y="420" width="600" height="40" fill="#8A5A6E"/>';
  for (let i = 0; i < 8; i++) s += '<rect x="' + (i * 75 + 8) + '" y="424" width="58" height="32" fill="#B57A8E" stroke="#5A3A3E" stroke-width="2"/>';
  s += '<rect x="380" y="160" width="100" height="56" fill="#F4E3C8" stroke="#5A3A3E" stroke-width="3"/>';
  OB31.forEach(([x, y, r]) => { s += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#2E6A4A" stroke="#1A3A2A" stroke-width="3"/>'; });
  // Netz: Dreiecke auf der begehbaren Flaeche, Luecken an Hindernissen
  const blocked = (cx, cy) => OB31.some(([x, y, r]) => Math.hypot(cx - x, cy - y) < r + 26) || (cx > 360 && cx < 500 && cy > 140 && cy < 236);
  const k = cl(t * 0 + 1); let nk = '';
  for (let gx = 0; gx < 10; gx++) for (let gy = 0; gy < 5; gy++) { const x0 = gx * 60, y0 = 145 + gy * 55, cx = x0 + 30, cy = y0 + 27; if (blocked(cx, cy)) continue;
    const ap = ev.netz === undefined ? 0 : cl((ev.netz - (gx + gy) * .04) / .3); /* Netz erscheint gleich mit dem Etikett */ if (ap <= 0) continue;
    const pulse = ge !== undefined ? .25 + .25 * Math.sin(t * 5 + gx) : .2;
    nk += '<path d="M' + x0 + ' ' + y0 + ' h60 v55 h-60 Z M' + x0 + ' ' + y0 + ' l60 55" fill="#3DFF7A" fill-opacity="' + (pulse * ap).toFixed(2) + '" stroke="#3DFF7A" stroke-width="2" stroke-opacity="' + (.9 * ap).toFixed(2) + '"/>'; }
  s += nk;
  if (ge !== undefined) { const f = .5 + .5 * Math.sin(t * 6); s += '<rect y="420" width="600" height="40" fill="#FF4D6D" opacity="' + (.45 * f).toFixed(2) + '"/>'; OB31.forEach(([x, y, r]) => { s += '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 6) + '" fill="none" stroke="#FF4D6D" stroke-width="5" opacity="' + f.toFixed(2) + '"/>'; }); }
  // Leute als Punkte
  for (let i = 0; i < 9; i++) { const dir = i % 2 ? -1 : 1, x = ((t * (40 + 8 * i) * dir + i * 97) % 600 + 600) % 600, y = 170 + (i * 47) % 230; if (blocked(x, y)) continue; s += '<circle cx="' + x.toFixed(0) + '" cy="' + y + '" r="9" fill="' + COL31[i % 8] + '" stroke="#2A2340" stroke-width="2"/>'; }
  if (we !== undefined) { const W2 = [[40, 300], [200, 300], [250, 400], [400, 390], [540, 300]]; const L = [0]; for (let i = 1; i < W2.length; i++) L.push(L[i - 1] + Math.hypot(W2[i][0] - W2[i - 1][0], W2[i][1] - W2[i - 1][1]));
    const grow = cl(we / 1.4), walk = cl((we - 1.4) / 2.2); let d = 'M' + W2[0].join(' '), gl = grow * L[L.length - 1];
    for (let i = 1; i < W2.length; i++) { if (L[i] <= gl) d += ' L' + W2[i].join(' '); else { const f = (gl - L[i - 1]) / (L[i] - L[i - 1]); d += ' L' + lerp(W2[i - 1][0], W2[i][0], f).toFixed(0) + ' ' + lerp(W2[i - 1][1], W2[i][1], f).toFixed(0); break; } }
    s += '<path d="' + d + '" fill="none" stroke="#FFE14D" stroke-width="7" stroke-dasharray="14 8"/><path d="M540 300 v-50 l30 12 l-30 12" fill="#FF4D6D" stroke="#2A2340" stroke-width="3"/>';
    const wl = walk * L[L.length - 1]; let px = W2[0][0], py = W2[0][1]; for (let i = 1; i < W2.length; i++) { if (L[i] >= wl) { const f = (wl - L[i - 1]) / (L[i] - L[i - 1]); px = lerp(W2[i - 1][0], W2[i][0], f); py = lerp(W2[i - 1][1], W2[i][1], f); break; } px = W2[i][0]; py = W2[i][1]; }
    s += '<circle cx="' + px.toFixed(0) + '" cy="' + py.toFixed(0) + '" r="14" fill="#FFE14D" stroke="#2A2340" stroke-width="3"/>'; }
  return s; }
function board31(t, ev, k) { if (k <= .01) return ''; const e = ease(cl(k)); let s = '<g opacity="' + e.toFixed(2) + '">';
  s += '<rect x="' + (BX31 + 60) + '" y="' + (BY31 + BH31) + '" width="16" height="' + (1190 - BY31 - BH31) + '" fill="#3A2A3E"/><rect x="' + (BX31 + BW31 - 76) + '" y="' + (BY31 + BH31) + '" width="16" height="' + (1190 - BY31 - BH31) + '" fill="#3A2A3E"/>';
  s += '<rect x="' + (BX31 - 14) + '" y="' + (BY31 - 14) + '" width="' + (BW31 + 28) + '" height="' + (BH31 + 28) + '" rx="14" fill="#2A2340"/>';
  s += '<svg x="' + BX31 + '" y="' + BY31 + '" width="' + BW31 + '" height="' + BH31 + '" viewBox="0 0 600 460">' + map31(t, ev) + '</svg>';
  return s + '</g>'; }
function drone31(x, y, t) { const b = 6 * Math.sin(t * 3); return '<g transform="translate(' + x + ' ' + (y + b).toFixed(1) + ')"><rect x="-26" y="-8" width="52" height="16" rx="6" fill="#2A2340"/><path d="M-26 -4 h-18 M26 -4 h18" stroke="#2A2340" stroke-width="5"/><ellipse cx="-44" cy="-8" rx="' + (16 * Math.abs(Math.sin(t * 40))).toFixed(1) + '" ry="3" fill="#C9CFDB"/><ellipse cx="44" cy="-8" rx="' + (16 * Math.abs(Math.cos(t * 40))).toFixed(1) + '" ry="3" fill="#C9CFDB"/><circle cy="10" r="5" fill="#FF4D6D"/></g>'; }
WORLD.i31Karte = function (sc, ev, t, lt) { const k = ev.netz === undefined ? cl(lt / .6) : 1; let s = prom31(t, { board: 1 }) + crowd31(t) + board31(t, ev, k) + drone31(860, 640, t);
  return W(s + dust28(t) + warm28() + shade3(), slot(ev, [['netz', 'Navigationsnetz', 'hot'], ['gehen', 'Gehweg ja, Wand nein'], ['weg', 'Weg zum Ziel']])); };
WMASC.i31Karte = (ev, t, lt) => { const ne = ev.netz; if (ne !== undefined && ne < 1.2) { const p = Math.sin(Math.PI * cl(ne / 1.2)); return stay3([XS31, GY31 - 10 * p], 1, { flip: 1, r: 12 * p, mood: 'happy' }); } return stay3([XS31, GY31], 1, { flip: 1, r: 3 * Math.sin(t * 2), mood: ev.gehen !== undefined && ev.weg === undefined ? 'cool' : 'happy' }); };

// ---------- Teil 2: Ausweichen ----------
WORLD.i31Aus = function (sc, ev, t, lt) { const na = ev.nah, kr = ev.kraft, al = ev.alle; let s = prom31(t) + crowd31(t);
  // Szene mit zwei Figuren: P laeuft nach links, Q nach rechts, gleiche Tiefe
  const dP = .3, yP = yd31(dP), sP = sd31(dP); let px = 800, qx = 480, shift = 0;
  if (na !== undefined) { px = lerp(860, 760, cl(na / 3)); qx = lerp(440, 540, cl(na / 3)); }
  if (kr !== undefined) { const k = cl(kr / 3); px = lerp(760, 520, k); qx = lerp(540, 780, k); shift = 70 * Math.sin(Math.PI * k); }
  if (al === undefined) { const ph = t * 9; s += '<ellipse cx="' + px.toFixed(0) + '" cy="' + (yP - shift).toFixed(0) + '" rx="200" ry="54" fill="#3DC6FF" fill-opacity=".16" stroke="#3DC6FF" stroke-width="6" stroke-dasharray="14 8"/>';
    s += person31(qx, yP + shift * .6, sP, '#FF6B8A', ph + 1, 1, {}) + person31(px, yP - shift, sP, '#FFD23F', ph, -1, { hl: '#3DC6FF' });
    if (kr !== undefined && shift > 8) s += '<path d="M' + px.toFixed(0) + ' ' + (yP - shift - 70).toFixed(0) + ' l0 ' + (-50 * shift / 70).toFixed(0) + '" stroke="#FF4D6D" stroke-width="9" stroke-linecap="round"/><path d="M' + (px - 14).toFixed(0) + ' ' + (yP - shift - 110 * shift / 70).toFixed(0) + ' l14 -20 l14 20" fill="#FF4D6D"/>'; }
  if (al !== undefined) { for (let i = 0; i < 4; i++) { const x = 480 + i * 130, y = 1440 + 30 * (i % 2), ph = t * 9 + i, dy = 18 * Math.sin(t * 2 + i); s += '<ellipse cx="' + x + '" cy="' + (y + dy).toFixed(0) + '" rx="70" ry="20" fill="none" stroke="#3DC6FF" stroke-width="4" stroke-dasharray="10 6"/>' + person31(x, y + dy, .9, COL31[(i + 2) % 8], ph, i % 2 ? -1 : 1, {}); }
  for (let i = 0; i < 4; i++) { const x = 480 + i * 130, y = 1440 + 30 * (i % 2), c = (t * 1.2 + i * .3) % 1; s += '<path d="M' + x + ' ' + (y - 150) + ' l0 -' + (20 + 20 * c).toFixed(0) + '" stroke="#FF4D6D" stroke-width="6" stroke-linecap="round" opacity="' + (1 - c).toFixed(2) + '"/>'; } }
  return W(s + dust28(t) + warm28() + shade3(), slot(ev, [['nah', 'Nur die Nachbarn'], ['kraft', 'Kraft schiebt weg', 'hot'], ['alle', 'Keiner plant alles']])); };
WMASC.i31Aus = (ev, t, lt) => { const rh = ev.rehook, al = ev.alle; if (al !== undefined) { const st = Math.sin(Math.PI * cl(al / 1.2)); return stay3([XS31 + 40 * st, GY31], 1, { flip: 1, walk: st > .1 && st < .9 ? 1 : 0, r: 4 * st, mood: 'happy' }); }
  if (rh !== undefined && ev.nah === undefined) { const j = Math.sin(Math.PI * cl(rh / .7)); return stay3([XS31, GY31 - 16 * j], 1, { flip: 1, r: -8 * j, mood: 'shock' }); }
  return stay3([XS31, GY31], 1, { flip: 1, r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 3: Sparen mit Detailstufen ----------
function rings31(t, k) { if (k <= .01) return ''; let s = ''; [[200, 44, '#3DFF7A', 'nah'], [360, 80, '#FFE14D', 'mittel'], [520, 118, '#FF6B8A', 'weit']].forEach(([rx, ry, c], i) => { s += '<ellipse cx="600" cy="1500" rx="' + (rx * ease(cl(k * 1.5 - i * .25))).toFixed(0) + '" ry="' + (ry * ease(cl(k * 1.5 - i * .25))).toFixed(0) + '" fill="none" stroke="' + c + '" stroke-width="8" stroke-dasharray="18 10" opacity=".9"/>'; }); if (k > .6) s += '<g opacity="' + cl((k - .6) / .3).toFixed(2) + '"><rect x="560" y="1442" width="80" height="34" rx="10" fill="#3DFF7A"/><text x="600" y="1467" text-anchor="middle" font-size="24" font-weight="900" fill="#0B1020" font-family="Inter Display, Inter, Arial, sans-serif">nah</text><rect x="1000" y="1440" width="76" height="34" rx="10" fill="#FF6B8A" transform="translate(-150 0)"/><text x="888" y="1465" text-anchor="middle" font-size="24" font-weight="900" fill="#0B1020" font-family="Inter Display, Inter, Arial, sans-serif">weit</text></g>'; return s; }
WORLD.i31Spar = function (sc, ev, t, lt) { const ge = ev.genau, we = ev.weniger, re = ev.rest; let s = prom31(t) + rings31(t, ge === undefined ? 0 : cl(ge / .8));
  s += crowd31(t, { lod: we === undefined ? 0 : cl(we / .6), near: ge !== undefined });
  if (re !== undefined) { const k = cl(re / .6); const w1 = 170 * k + 10 * Math.sin(t * 3), w2 = 40 * k + 4 * Math.sin(t * 5); s += '<g opacity="' + k.toFixed(2) + '" transform="translate(600 890)"><rect x="-150" y="-60" width="300" height="140" rx="18" fill="#2A2340" stroke="#F4F6FB" stroke-width="4"/><rect x="-120" y="-30" width="' + w1.toFixed(0) + '" height="30" rx="8" fill="#3DFF7A"/><rect x="-120" y="20" width="' + w2.toFixed(0) + '" height="30" rx="8" fill="#8A8FA8"/><circle cx="110" cy="-15" r="14" fill="#3DFF7A"/><circle cx="110" cy="35" r="10" fill="#8A8FA8"/></g>'; }
  return W(s + dust28(t) + warm28() + shade3(), slot(ev, [['genau', 'Nah: genau'], ['weniger', 'Weit weg: einfacher', 'hot'], ['rest', 'Rechenzeit gespart']])); };
WMASC.i31Spar = (ev, t, lt) => { const we = ev.weniger; if (we !== undefined) { const p = Math.sin(Math.PI * cl(we / 1)); return stay3([XS31, GY31 - 12 * p], 1, { flip: 1, r: 10 * p, mood: 'shock' }); } return stay3([XS31, GY31], 1, { flip: 1, r: 3 * Math.sin(t * 2), mood: ev.rest !== undefined ? 'cool' : 'happy' }); };

// ---------- Schluss ----------
WORLD.i31Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(prom31(t) + crowd31(t) + dust28(t) + warm28() + '<defs><linearGradient id="od31" x1="0" y1="0" x2="0" y2="1"><stop offset=".25" stop-color="#05071A" stop-opacity=".7"/><stop offset=".62" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od31)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.i31Out = (ev, t, lt) => stay3([XS31 + 40 * Math.sin(Math.PI * cl((lt - 1) / 5)), GY31 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { flip: 1, r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['i31Hook', 'i31Karte', 'i31Aus', 'i31Spar', 'i31Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC31); });
