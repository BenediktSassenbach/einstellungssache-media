// P028 "Wie macht ein Spiel echte Schatten?" (GTA-6-Spezial, Physik) im Skript 4, Design-Kennung 3.3. Stand 19.11.2026.
// Benedikts Wunsch: so visuell wie moeglich. Der Ort ist eine echte kleine 3D-Szene: Strasse bei Sonnenuntergang, Palme, Haeuser am Horizont.
// Die Schatten im Video sind wirklich berechnet: fuer jeden Bodenpunkt ein Strahl zur Sonne, Test gegen die Kugeln der Palme.
//   hart = ein Strahl, weich = 12 Strahlen zur Sonnenscheibe, Karte = grobe Kacheln wie eine Schattenkarte.
// Einstieg: Schaltis Schatten steht auf, Schalti rennt weg, der Schatten ueberholt ihn und legt sich wieder hin.
// Teil 1: Licht von der Sonne ins Auge, die meisten Strahlen verfehlen es; Kamera schickt Strahlen rueckwaerts durch ein Bildpunkt-Gitter, das Gitter fuellt sich mit dem Bild.
// Teil 2: Schattenstrahl vom Treffpunkt zur Sonne, hell oder blockiert; Abtast-Linie malt den Schatten; mehrere Strahlen zur Sonnenscheibe machen den Rand weich.
// Teil 3: Strahlen-Gewitter und Rechenleistung; Kamera fliegt zur Sonne, Blick der Sonne als Karte, kantiger Schatten; Werbetafel GTA 6.
// Zum Loeschen: diese Datei und videos/P028.
var AC28P = '#5CE1FF', F28 = 900, HZ28 = 1000, CH28 = 3.2;
function pj28(X, Y, Z) { return [540 + F28 * X / Z, HZ28 + F28 * (CH28 - Y) / Z]; }
function gd28(sx, sy) { const Z = F28 * CH28 / (sy - HZ28); return [(sx - 540) * Z / F28, 0, Z]; }
function nrm28(v) { const l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }
var L28 = nrm28([.583, 1, 1.64]); // Richtung zur Sonne
var SUN28 = [540 + F28 * L28[0] / L28[2], HZ28 - F28 * L28[1] / L28[2]]; // Fluchtpunkt der Sonne auf dem Bild (860, 451), rechts oben, damit kein Titel sie verdeckt
// ---- Palme aus Kugeln: Stamm, Nuesse, Wedel. Dieselben Punkte werden gezeichnet und fuer den Schattentest benutzt
var PB28 = [4.8, 0, 19.5], PALM28 = (function () { const sp = [], tr = [], fr = [];
  for (let i = 0; i <= 24; i++) { const u = i / 24, p = [PB28[0] - .7 * Math.pow(u, 1.6), 7 * u, PB28[2]]; tr.push(p); sp.push([p, .3 - .08 * u]); }
  const C = tr[tr.length - 1]; sp.push([[C[0], C[1] - .2, C[2]], .5]);
  for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2 + .3, dx = Math.cos(a), dz = Math.sin(a) * .7, len = 2.7 + .4 * Math.sin(k * 2.1), pts = [];
    for (let j = 0; j <= 8; j++) { const s = j / 8, p = [C[0] + dx * len * s, C[1] + 1.1 * s - 2.3 * s * s, C[2] + dz * len * s]; pts.push(p); if (j > 0) sp.push([p, .42 * (1 - s) + .14]); }
    fr.push(pts); }
  return { sp: sp, tr: tr, fr: fr, C: C }; })();
var PBS28 = [PB28[0] - .3, 5.5, PB28[2]], PBR28 = 4.6; // Huellkugel
function hitS28(P, D, c, r) { const o = [c[0] - P[0], c[1] - P[1], c[2] - P[2]], tc = o[0] * D[0] + o[1] * D[1] + o[2] * D[2]; if (tc < 0) return -1; const d2 = o[0] * o[0] + o[1] * o[1] + o[2] * o[2] - tc * tc; return d2 < r * r ? tc - Math.sqrt(r * r - d2) : -1; }
// erster Treffer an der Palme: Abstand oder -1
function block28(P, D) { if (hitS28(P, D, PBS28, PBR28) < 0 && Math.hypot(P[0] - PBS28[0], P[1] - PBS28[1], P[2] - PBS28[2]) > PBR28) return -1; let best = -1; for (const s of PALM28.sp) { const h = hitS28(P, D, s[0], s[1]); if (h >= 0 && (best < 0 || h < best)) best = h; } return best; }
// Strahlen zur Sonnenscheibe (Vogel-Spirale), Scheibe zur Sichtbarkeit rund doppelt so gross wie in echt
var SS28 = (function () { const u = nrm28([L28[1], -L28[0], 0]), v = [L28[1] * u[2] - L28[2] * u[1], L28[2] * u[0] - L28[0] * u[2], L28[0] * u[1] - L28[1] * u[0]], out = [], R = .0105;
  for (let i = 0; i < 12; i++) { const r = R * Math.sqrt((i + .5) / 12), a = i * 2.39996; out.push(nrm28([L28[0] + r * (Math.cos(a) * u[0] + Math.sin(a) * v[0]), L28[1] + r * (Math.cos(a) * u[1] + Math.sin(a) * v[1]), L28[2] + r * (Math.cos(a) * u[2] + Math.sin(a) * v[2])])); }
  return out; })();
function lit28(P, mode) { if (mode === 'weich') { let n = 0; for (const d of SS28) if (block28(P, d) < 0) n++; return n / SS28.length; } return block28(P, L28) < 0 ? 1 : 0; }
// Schattenbilder einmal pro Seite rechnen (halbe Aufloesung), als Bild ablegen
var IMG28 = {};
function shimg28(mode) { if (IMG28[mode]) return IMG28[mode]; const w = 540, h = 460, c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'), im = g.createImageData(w, h);
  for (let j = 0; j < h; j++) { const sy = HZ28 + j * 2 + 1; if (sy < HZ28 + 40) continue; for (let i = 0; i < w; i++) { let P = gd28(i * 2 + 1, sy); if (P[2] > 40) continue;
    if (mode === 'karte') { const q = .42; P = [Math.floor(P[0] / q) * q + q / 2, 0, Math.floor(P[2] / q) * q + q / 2]; }
    const l = lit28(P, mode === 'karte' ? 'hart' : mode); if (l >= 1) continue; const k = (j * w + i) * 4; im.data[k] = 34; im.data[k + 1] = 14; im.data[k + 2] = 70; im.data[k + 3] = Math.round(165 * (1 - l)); } }
  g.putImageData(im, 0, 0); return IMG28[mode] = c.toDataURL(); }
function shadow28(mode, op, clipY) { if (op <= .01) return ''; const id = 'cp28' + mode; return (clipY !== undefined ? '<defs><clipPath id="' + id + '"><rect x="0" y="0" width="1080" height="' + clipY.toFixed(1) + '"/></clipPath></defs>' : '') + '<image href="' + shimg28(mode) + '" x="0" y="' + HZ28 + '" width="1080" height="920" preserveAspectRatio="none" opacity="' + op.toFixed(3) + '"' + (clipY !== undefined ? ' clip-path="url(#' + id + ')"' : '') + ' style="image-rendering:' + (mode === 'karte' ? 'pixelated' : 'auto') + '"/>'; }

// ---- Ort
function sky28() { return '<defs><linearGradient id="sk28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B1045"/><stop offset=".3" stop-color="#5A2A8A"/><stop offset=".43" stop-color="#E0528A"/><stop offset=".52" stop-color="#FF9A5C"/><stop offset=".56" stop-color="#FFC27A"/></linearGradient>'
  + '<radialGradient id="sg28"><stop offset="0" stop-color="#FFF1C2" stop-opacity=".95"/><stop offset=".25" stop-color="#FFC56B" stop-opacity=".55"/><stop offset="1" stop-color="#FF7A5C" stop-opacity="0"/></radialGradient>'
  + '<linearGradient id="gr28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C98A74"/><stop offset=".35" stop-color="#E8B48A"/><stop offset="1" stop-color="#F2C79A"/></linearGradient></defs>'
  + '<rect width="1080" height="1100" fill="url(#sk28)"/><circle cx="' + SUN28[0] + '" cy="' + SUN28[1] + '" r="380" fill="url(#sg28)"/><circle cx="' + SUN28[0] + '" cy="' + SUN28[1] + '" r="64" fill="#FFF3C9"/>'; }
function city28() { let s = ''; const B = [[-60, 150, 300, '#8E4A8C', '#B8669E'], [80, 120, 250, '#6E3E86', '#9256A0'], [190, 170, 340, '#A3567F', '#C77494'], [600, 130, 280, '#7C4290', '#A05EA8'], [720, 190, 380, '#A04F7E', '#D07796'], [900, 150, 300, '#6E3E86', '#9A5CA6'], [1030, 110, 240, '#8E4A8C', '#B8669E']];
  for (const b of B) { const y = 1072 - b[2]; s += '<rect x="' + b[0] + '" y="' + y + '" width="' + b[1] + '" height="' + b[2] + '" fill="' + b[3] + '"/><rect x="' + (b[0] + b[1] * .62) + '" y="' + y + '" width="' + (b[1] * .38) + '" height="' + b[2] + '" fill="' + b[4] + '" opacity=".55"/><rect x="' + (b[0] - 6) + '" y="' + (y - 14) + '" width="' + (b[1] + 12) + '" height="14" fill="' + b[4] + '"/>';
    for (let yy = y + 30; yy < 1050; yy += 46) s += '<rect x="' + (b[0] + 14) + '" y="' + yy + '" width="' + (b[1] - 28) + '" height="10" rx="5" fill="#FFD6A0" opacity=".35"/>'; }
  return s; }
function ground28() { let s = '<rect x="0" y="1072" width="1080" height="848" fill="url(#gr28)"/>';
  for (const Z of [6, 7, 8.5, 10.5, 13, 16.5, 21, 28]) { const y = pj28(0, 0, Z)[1]; s += '<path d="M0 ' + y.toFixed(1) + ' H1080" stroke="#A86E62" stroke-width="' + (36 / Z).toFixed(1) + '" opacity=".45"/>'; }
  for (let X = -14; X <= 14; X += 2) { const a = pj28(X, 0, 4), b = pj28(X, 0, 40); s += '<path d="M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' L' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + '" stroke="#A86E62" stroke-width="3" opacity=".35"/>'; }
  return s; }
function palm28() { let s = ''; const tr = PALM28.tr.map(p => pj28(p[0], p[1], p[2]));
  s += '<path d="M' + tr.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') + '" stroke="#3A1E2E" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M' + tr.map(p => (p[0] + 5).toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') + '" stroke="#6A3A40" stroke-width="12" fill="none" stroke-linecap="round"/>';
  for (let i = 2; i < tr.length - 1; i += 2) s += '<path d="M' + (tr[i][0] - 14).toFixed(1) + ' ' + tr[i][1].toFixed(1) + ' h28" stroke="#2A1420" stroke-width="4"/>';
  const fr = PALM28.fr.map(f => f.map(p => pj28(p[0], p[1], p[2]))).sort((a, b) => a[8][1] - b[8][1]);
  for (const f of fr) { const top = f.map(p => p[0].toFixed(1) + ' ' + (p[1] - 2).toFixed(1)).join(' L'); s += '<path d="M' + top + '" stroke="#1F4A3A" stroke-width="30" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M' + top + '" stroke="#3E8A5E" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
    for (let j = 1; j < 8; j++) { const p = f[j], q = f[j + 1], dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, w = 26 * (1 - j / 9); s += '<path d="M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' l' + (nx * w + dx * .4).toFixed(1) + ' ' + (Math.abs(ny * w) + 8).toFixed(1) + ' M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' l' + (-nx * w + dx * .4).toFixed(1) + ' ' + (Math.abs(ny * w) + 8).toFixed(1) + '" stroke="#2F6E4C" stroke-width="7" stroke-linecap="round"/>'; } }
  const c = pj28(PALM28.C[0], PALM28.C[1] - .25, PALM28.C[2]); s += [[-12, 4], [10, 6], [0, 16]].map(o => '<circle cx="' + (c[0] + o[0]).toFixed(1) + '" cy="' + (c[1] + o[1]).toFixed(1) + '" r="11" fill="#5A3A20" stroke="#2A1420" stroke-width="3"/>').join('');
  return s; }
// Szene ohne Schatten
function scene28() { return sky28() + city28() + ground28(); }
var SCN28 = null; function base28() { return SCN28 || (SCN28 = scene28()); }
var PLM28 = null; function palmS28() { return PLM28 || (PLM28 = palm28()); }
// Leuchtender Strahl von a nach b, k = wie weit er schon ist
function ray28(a, b, col, k, w, op) { k = cl(k); if (k <= 0) return ''; const x = a[0] + (b[0] - a[0]) * k, y = a[1] + (b[1] - a[1]) * k; w = w || 6; op = op === undefined ? 1 : op;
  return '<path d="M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' L' + x.toFixed(1) + ' ' + y.toFixed(1) + '" stroke="' + col + '" stroke-width="' + (w * 2.6).toFixed(1) + '" opacity="' + (.22 * op).toFixed(2) + '" stroke-linecap="round"/><path d="M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' L' + x.toFixed(1) + ' ' + y.toFixed(1) + '" stroke="' + col + '" stroke-width="' + w + '" opacity="' + op.toFixed(2) + '" stroke-linecap="round"/>' + (k < 1 ? '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (w * 1.6).toFixed(1) + '" fill="#fff" opacity="' + op.toFixed(2) + '"/>' : ''); }
// Strahl entlang mehrerer Punkte
function path28(P, col, k, w, op) { let s = '', n = P.length - 1; for (let i = 0; i < n; i++) s += ray28(P[i], P[i + 1], col, k * n - i, w, op); return s; }
// Schalti-Schatten: dunkle Kopie, liegt flach auf dem Boden (Richtung weg von der Sonne: nach vorn und links) oder steht (st = 1)
function msh28(fx, fy, st, op, eyes, wig) { if (op <= .01) return ''; const sy = lerp(-.62, 1, st), sk = lerp(-38, 0, st) + (wig || 0);
  let h = '<div style="position:absolute;left:' + (fx - 150).toFixed(1) + 'px;top:' + (fy - 225).toFixed(1) + 'px;width:300px;height:300px;transform-origin:150px 225px;transform:skewX(' + sk.toFixed(1) + 'deg) scale(1,' + sy.toFixed(3) + ');filter:brightness(0) blur(' + (st > .5 ? 0 : 2) + 'px);opacity:' + (op * (st > .5 ? .92 : .5)).toFixed(2) + '">' + mascot('happy', 0, false, 300) + '</div>';
  if (eyes > 0) for (const ex of [44, 80]) h += '<div style="position:absolute;left:' + (fx + ex - 13).toFixed(1) + 'px;top:' + (fy - 140).toFixed(1) + 'px;width:26px;height:18px;border-radius:50%;background:#FFF3C9;opacity:' + cl(eyes).toFixed(2) + '"></div>';
  return h; }
// Licht an Schaltis Platz (Brust 0,9 hoch), fuer Helligkeit und Schatten
function at28(fx, fy, mode) { const g = gd28(fx, fy); return lit28([g[0], .9, g[2]], mode || 'weich'); }
function lab28(k) { return k >= .99 ? '' : 'brightness(' + (.5 + .5 * k).toFixed(3) + ') saturate(' + (.7 + .3 * k).toFixed(3) + ')'; }
function walk28(a, b, k) { return { f: [lerp(a, b, ease(cl(k))), 1537], walk: k > 0 && k < 1 ? 1 : 0, r: k > 0 && k < 1 ? (b > a ? 8 : -8) : 0 }; }

// ---------- Einstieg ----------
function hookP28(ev, t) { const fr = ev.frage, ni = ev.nie, gb = ev.gib, pu = ev.puh, run = Math.abs(Math.sin(t * 17));
  // Schalti: steht, geht beim Wackeln ein Stueck nach rechts, rennt bei "Gib mir 60 Sekunden" weg, keucht am Ende
  let x = 220, r = 2, walk = 0, mood; if (fr !== undefined) { const k = cl(fr / 1.2); x = lerp(220, 440, ease(k)); walk = k < 1 ? 1 : 0; r = k < 1 ? 8 : 2; }
  if (ni !== undefined) { x = 440; r = -10 * cl(ni / .3); mood = 'shock'; }
  if (gb !== undefined) { const k = cl(gb / 1.3); x = lerp(440, 700, ease(k)); walk = k < 1 ? 1 : 0; r = k < 1 ? 14 : 0; mood = 'shock'; }
  if (pu !== undefined) { x = 700; r = -6 + 3 * Math.sin(t * 9); mood = 'cool'; }
  // Schatten: liegt, wackelt, steht links auf, rennt hinterher und ueberholt, kommt flach zurueck
  let sx = x, st = 0, eyes = 0, wig = 0, op = 1;
  if (fr !== undefined && ni === undefined) wig = 14 * Math.sin(t * 6) * cl((fr - .4) / .5);
  if (ni !== undefined) { const k = ease(cl(ni / .9)); st = k; sx = lerp(440, 170, k); eyes = cl((ni - .7) / .2); }
  if (gb !== undefined) { const k = cl(gb / 1.3); st = 1; eyes = 1; sx = k < .35 ? lerp(170, 420, k / .35) : lerp(330, 1300, (k - .35) / .65); }
  if (pu !== undefined) { const k = ease(cl((pu - .25) / .7)); st = 0; eyes = 0; sx = lerp(1300, 700, k); op = cl((pu - .25) / .15); }
  return { x: x, r: r, walk: walk, mood: mood, sx: sx, st: st, eyes: eyes, wig: wig, op: op, run: run }; }
WORLD.p28hook = function (sc, ev, t, lt) { const H = hookP28(ev, t); let s = base28() + shadow28('weich', 1) + palmS28(), h = '';
  // "berechnet": drei Strahlen von der Sonne zu Schaltis Schattenrand
  if (ev.sp !== undefined && ev.frage === undefined) { const k = cl(ev.sp / .5); for (let i = 0; i < 3; i++) s += ray28(SUN28, [H.x - 40 - i * 70, 1580 + i * 50], '#FFE9A8', k * 1.6 - i * .25, 5, .9); }
  const sh = H.st > .5 ? '' : msh28(H.sx, 1537, H.st, H.op, 0, H.wig); h += sh;
  if (H.st > .5) h += msh28(H.sx + (H.st === 1 && ev.gib !== undefined ? 6 * Math.sin(t * 30) : 0), 1537 - (ev.gib !== undefined ? 14 * H.run : 0), H.st, 1, H.eyes, 0);
  return Wp28(s + shade3(), h); };
WMASC.p28hook = (ev, t) => { const H = hookP28(ev, t); return stay3([H.x, 1537 - (H.walk ? 10 * H.run : 0)], 1, { r: H.r, walk: H.walk, mood: H.mood }); };

// ---------- Teil 1: Licht rueckwaerts ----------
var CAM28 = [190, 905]; // die Spielkamera schwebt links ueber Schalti
var EYE28 = [282, 1404]; // Schaltis Auge an seinem Platz (Fuesse 220, 1537)
function cam28(x, y, k, flip) { if (k <= .01) return ''; const e = back(cl(k)), d = flip ? -1 : 1; return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + (e * d).toFixed(3) + ',' + e.toFixed(3) + ')"><path d="M-30 -52 h60 M0 -52 v14" stroke="#0B1020" stroke-width="6" stroke-linecap="round"/><ellipse cx="-30" cy="-54" rx="26" ry="6" fill="#F4F6FB" opacity=".8"/><ellipse cx="30" cy="-54" rx="26" ry="6" fill="#F4F6FB" opacity=".8"/>'
  + '<rect x="-46" y="-38" width="92" height="66" rx="16" fill="#26335E" stroke="#0B1020" stroke-width="6"/><path d="M-46 -6 h-30 l-14 -22 v56 l14 -22 h30" fill="#3A4A80" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><circle cx="-88" cy="0" r="10" fill="' + AC28P + '"/><circle cx="26" cy="-20" r="7" fill="#FF5A7A"/></g>'; }
// Bildpunkt-Gitter zwischen Kamera und Szene: 12 x 9 Bildpunkte, jeder zeigt, was sein Strahl zuerst trifft
var GC28 = 12, GR28 = 9, GK28 = .5, TG28 = [300, 640, 960, 1150]; // Zielbereich x0, y0, x1, y1
function tgt28(i, j) { return [TG28[0] + (TG28[2] - TG28[0]) * (i + .5) / GC28, TG28[1] + (TG28[3] - TG28[1]) * (j + .5) / GR28]; }
function cell28(i, j) { const p = tgt28(i, j); return [CAM28[0] + GK28 * (p[0] - CAM28[0]), CAM28[1] + GK28 * (p[1] - CAM28[1])]; }
// Farbe, die der Strahl trifft: erst die Palme (Kugeln, von der Kamera aus geprueft), dann Sonne, Haeuser, Boden, Himmel
var PX28 = null; function pix28() { if (PX28) return PX28; const out = [], fr = PALM28.fr.map(f => f.map(p => pj28(p[0], p[1], p[2]))), tr = PALM28.tr.map(p => pj28(p[0], p[1], p[2]));
  const dseg = (p, a, b) => { const vx = b[0] - a[0], vy = b[1] - a[1], u = cl(((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / (vx * vx + vy * vy)); return Math.hypot(p[0] - a[0] - u * vx, p[1] - a[1] - u * vy); };
  for (let j = 0; j < GR28; j++) for (let i = 0; i < GC28; i++) { const p = tgt28(i, j); let c = null, what = 'Himmel';
    for (const f of fr) for (let k = 0; k < 8; k++) if (dseg(p, f[k], f[k + 1]) < 22) { c = '#3E8A5E'; what = 'Palme'; }
    if (!c) for (let k = 0; k < tr.length - 1; k++) if (dseg(p, tr[k], tr[k + 1]) < 16) { c = '#5A2E38'; what = 'Palme'; }
    if (!c && Math.hypot(p[0] - SUN28[0], p[1] - SUN28[1]) < 64) { c = '#FFF3C9'; what = 'Sonne'; }
    if (!c && p[1] > 1072) { c = lit28(gd28(p[0], p[1]), 'hart') ? '#E8B48A' : '#7A4A6A'; what = 'Boden'; }
    if (!c && ((p[0] > 190 && p[0] < 360 && p[1] > 732) || (p[0] > 80 && p[0] < 200 && p[1] > 822) || (p[0] > 600 && p[0] < 730 && p[1] > 792) || (p[0] > 720 && p[0] < 910 && p[1] > 692))) { c = '#9A4E86'; what = 'Haus'; }
    if (!c) c = p[1] < 760 ? '#C04A8A' : p[1] < 900 ? '#F07A72' : '#FFA866';
    out.push({ i: i, j: j, c: c, w: what }); }
  return PX28 = out; }
function grid28(n, hi, op) { const P = pix28(), a = cell28(0, 0), b = cell28(GC28 - 1, GR28 - 1), cw = (b[0] - a[0]) / (GC28 - 1), ch = (b[1] - a[1]) / (GR28 - 1); let s = '';
  s += '<rect x="' + (a[0] - cw / 2 - 8).toFixed(1) + '" y="' + (a[1] - ch / 2 - 8).toFixed(1) + '" width="' + (cw * GC28 + 16).toFixed(1) + '" height="' + (ch * GR28 + 16).toFixed(1) + '" rx="10" fill="#0B1020" opacity="' + (.55 * op).toFixed(2) + '" stroke="#F4F6FB" stroke-width="5"/>';
  P.forEach((q, k) => { const c = cell28(q.i, q.j), on = k < n; s += '<rect x="' + (c[0] - cw / 2 + 1).toFixed(1) + '" y="' + (c[1] - ch / 2 + 1).toFixed(1) + '" width="' + (cw - 2).toFixed(1) + '" height="' + (ch - 2).toFixed(1) + '" fill="' + (on ? q.c : '#F4F6FB') + '" opacity="' + ((on ? 1 : .08) * op).toFixed(2) + '"' + (k === hi ? ' stroke="#FFE14D" stroke-width="4"' : '') + '/>'; });
  return s; }
WORLD.p28strahl = function (sc, ev, t, lt) { const ec = ev.echt, ni = ev.nie, ru = ev.rueck, fa = ev.farbe; let s = base28() + shadow28('weich', 1) + palmS28(), h = '';
  const crown = pj28(PALM28.C[0] - 1.2, PALM28.C[1] + .3, PALM28.C[2]);
  // Satz 1: ein Lichtteilchen von der Sonne zur Palme, prallt ab, landet im Auge
  if (ec !== undefined && ni === undefined) { const k = cl((ec - .4) / 2.4); s += path28([SUN28, crown, EYE28], '#FFE9A8', k, 7, 1); if (k >= 1) s += '<circle cx="' + EYE28[0] + '" cy="' + EYE28[1] + '" r="' + (18 + 8 * Math.sin(t * 12)).toFixed(1) + '" fill="none" stroke="#FFE9A8" stroke-width="5"/>'; }
  // Satz 2: viele Strahlen prallen in alle Richtungen ab, fast keiner trifft das Auge
  if (ni !== undefined && ru === undefined) { const k = cl(ni / 1.4); for (let i = 0; i < 26; i++) { const g = [80 + rnd(i + 300) * 900, 1330 + rnd(i + 340) * 250], a = -Math.PI * (.1 + .8 * rnd(i + 380)), b = [g[0] + 700 * Math.cos(a), g[1] + 700 * Math.sin(a)], hit = i === 7;
      s += path28([SUN28, g, hit ? EYE28 : b], hit ? '#FFE9A8' : '#FFD27A', k * 1.25 - rnd(i + 420) * .25, hit ? 6 : 4, hit ? 1 : .55); }
    h += ''; }
  // Satz 3 und 4: Kamera schickt Strahlen rueckwaerts durch jedes Bildpunkt-Feld, das Gitter fuellt sich mit dem Bild
  const ck = ru !== undefined ? cl(ru / .5) : 0;
  if (ru !== undefined) { const N = GC28 * GR28, P = pix28(), sp = fa === undefined ? ru / 3.6 : 1, n = Math.floor(cl(sp) * N); let hi = -1;
    if (fa !== undefined) { const pk = P.findIndex(q => q.w === 'Palme'); hi = pk; }
    s += grid28(fa !== undefined ? N : n, hi, cl(ru / .4));
    for (let k = Math.max(0, n - 9); k < Math.min(n + 1, N); k++) { const q = P[k], c = cell28(q.i, q.j), e = tgt28(q.i, q.j); s += ray28(CAM28, c, '#F4F6FB', 1, 3, .7) + ray28(c, e, q.c === '#FFF3C9' ? '#FFE14D' : '#F4F6FB', 1, 3, .5 * (1 - (n - k) / 10)); }
    if (fa !== undefined) { const q = P[hi], c = cell28(q.i, q.j), e = tgt28(q.i, q.j), k = cl(fa / .8); s += path28([CAM28, c, e], '#FFE14D', k, 7, 1) + (k >= 1 ? '<circle cx="' + e[0].toFixed(1) + '" cy="' + e[1].toFixed(1) + '" r="' + (16 + 6 * Math.sin(t * 10)).toFixed(1) + '" fill="none" stroke="#FFE14D" stroke-width="6"/>' : ''); } }
  s += cam28(CAM28[0], CAM28[1] + 6 * Math.sin(t * 2.4), ck, 1);
  h += slot(ev, [['echt', 'Sonne → Ding → Auge'], ['nie', 'Fast alle Strahlen verfehlen dich', 'hot'], ['rueck', 'Raytracing: rückwärts ab Kamera'], ['farbe', 'Erster Treffer = Farbe']]);
  return Wp28(s + shade3(), h + msh28(sc0P28(lt), 1537, 0, 1, 0, 0)); };
function sc0P28(lt) { return lerp(700, 220, ease(cl(lt / 1.1))); }
WMASC.p28strahl = (ev, t, lt) => { const x = sc0P28(lt), w = lt < 1.1; if (ev.rueck !== undefined) return stay3([x, 1537], 1, { r: -4, flip: 0 }); return stay3([x, 1537 - (w ? 10 * Math.abs(Math.sin(t * 17)) : 0)], 1, { r: w ? -8 : 2, walk: w ? 1 : 0 }); };

// ---------- Teil 2: der Schatten-Test ----------
var P1X28 = null, P2P28 = null; // P1: heller Punkt, dessen Strahl zur Sonne sichtbar an der Krone vorbeigeht. P2: Mitte des Kronenschattens. Beide werden gesucht
function p1P28() { if (P1X28) return P1X28; const pts = PALM28.tr.concat(...PALM28.fr).map(q => pj28(q[0], q[1], q[2])); let best = null;
  for (let y = 1440; y <= 1500; y += 10) for (let x = 400; x <= 920; x += 10) { if (lit28(gd28(x, y), 'hart') < 1) continue; const vx = SUN28[0] - x, vy = SUN28[1] - y; let d = 1e9;
    for (const c of pts) { const u = cl(((c[0] - x) * vx + (c[1] - y) * vy) / (vx * vx + vy * vy)); d = Math.min(d, Math.hypot(c[0] - x - u * vx, c[1] - y - u * vy)); } if (d < 45) continue; const sc = Math.hypot(x - 640, y - 1470); if (!best || sc < best[2]) best = [x, y, sc]; }
  return P1X28 = best ? [best[0], best[1]] : [640, 1470]; }
function p2P28() { if (P2P28) return P2P28; let best = null; for (let y = 1320; y <= 1440; y += 6) for (let x = 360; x <= 760; x += 6) { const g = gd28(x, y); if (!lit28(g, 'hart')) { const d = Math.hypot(x - 720, y - 1330); if (!best || d < best[2]) best = [x, y, d]; } } return P2P28 = best ? [best[0], best[1]] : [560, 1380]; }
// wo der Strahl vom Bodenpunkt zur Sonne endet: an der Sonne oder am ersten Treffer der Palme
function sray28(p, d) { const g = gd28(p[0], p[1]), D = d || L28, h = block28(g, D); if (h < 0) return { end: SUN28, hit: 0 }; const q = [g[0] + D[0] * h, g[1] + D[1] * h, g[2] + D[2] * h]; return { end: pj28(q[0], q[1], q[2]), hit: 1 }; }
function pin28(p, col, k) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ') scale(' + e.toFixed(3) + ')"><ellipse rx="34" ry="12" fill="none" stroke="' + col + '" stroke-width="6"/><circle r="9" fill="' + col + '"/></g>'; }
function mark28(p, ok, k) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + p[0].toFixed(1) + ' ' + (p[1] - 62).toFixed(1) + ') scale(' + e.toFixed(3) + ')"><circle r="30" fill="' + (ok ? '#3DFF7A' : '#FF5A7A') + '" stroke="#0B1020" stroke-width="6"/>' + (ok ? '<path d="M-13 1 l8 9 l17 -19" stroke="#0B1020" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' : '<path d="M-11 -11 l22 22 M11 -11 l-22 22" stroke="#0B1020" stroke-width="8" stroke-linecap="round"/>') + '</g>'; }
var SW28 = [1080, 1600]; // Abtast-Linie von oben nach unten
function test28(ev, t) { const zw = ev.zweit, he = ev.hell, we = ev.weg, wc = ev.weich; let p = p1P28(), mode = 'none', scan;
  if (we !== undefined) { const k = ease(cl((we - .2) / 1)); p = [lerp(p1P28()[0], p2P28()[0], k), lerp(p1P28()[1], p2P28()[1], k)]; scan = cl((we - 1.4) / 1.6); }
  if (wc !== undefined) { p = p2P28(); scan = 1; }
  return { p: p, scan: scan }; }
WORLD.p28test = function (sc, ev, t, lt) { const zw = ev.zweit, he = ev.hell, we = ev.weg, wc = ev.weich, T = test28(ev, t); let s = base28(), h = '';
  // Schatten: erst keiner, dann von der Abtast-Linie gemalt (hart), dann weich
  if (T.scan !== undefined && wc === undefined) { const y = lerp(HZ28 + 60, 1920, T.scan); s += shadow28('hart', 1, y); if (T.scan < 1) { for (let i = 0; i < 9; i++) { const p = [60 + i * 110, y]; if (p[1] < HZ28 + 70) continue; const r = sray28(p); s += ray28(p, r.end, r.hit ? '#FF8A9A' : '#FFE9A8', 1, 3, .55); } s += '<path d="M0 ' + y.toFixed(1) + ' H1080" stroke="' + AC28P + '" stroke-width="6" opacity=".8"/>'; } }
  if (wc !== undefined) { const k = ease(cl((wc - 1.2) / 1.2)); s += shadow28('hart', 1 - k) + shadow28('weich', k); }
  s += palmS28();
  // Strahl von der Kamera zum Treffpunkt und vom Treffpunkt zur Sonne
  const cam = [CAM28[0], CAM28[1] + 6 * Math.sin(t * 2.4)];
  if (zw !== undefined && wc === undefined) { const k1 = cl(zw / .7), r = sray28(T.p); s += ray28(cam, T.p, '#F4F6FB', k1, 4, .8) + pin28(T.p, r.hit ? '#FF5A7A' : '#FFE14D', k1);
    const k2 = we === undefined ? cl((zw - .9) / 1.2) : 1; s += ray28(T.p, r.end, r.hit ? '#FF5A7A' : '#3DFF7A', k2, 6, 1);
    if (r.hit && k2 >= 1) s += '<circle cx="' + r.end[0].toFixed(1) + '" cy="' + r.end[1].toFixed(1) + '" r="' + (20 + 6 * Math.sin(t * 12)).toFixed(1) + '" fill="#FF5A7A" opacity=".45"/>';
    if (he !== undefined && we === undefined) s += '<circle cx="' + T.p[0] + '" cy="' + T.p[1] + '" r="' + (60 + 20 * Math.sin(t * 6)).toFixed(1) + '" fill="#FFE9A8" opacity="' + (.35 * cl(he / .4)).toFixed(2) + '"/>' + mark28(T.p, 1, cl((he - .2) / .4));
    if (we !== undefined && T.scan > 0) s += mark28(T.p, 0, cl(T.scan / .2)); }
  // Satz 4: am Rand des Schattens zwoelf Strahlen zur Sonnenscheibe, manche frei, manche blockiert
  if (wc !== undefined) { const e = edge28(), k = cl(wc / 1.1); let n = 0; SS28.forEach((d, i) => { const r = sray28(e, d), end = r.hit ? r.end : [SUN28[0] + (i % 4 - 1.5) * 26, SUN28[1] + (Math.floor(i / 4) - 1) * 26]; if (!r.hit) n++; s += ray28(e, end, r.hit ? '#FF5A7A' : '#3DFF7A', k * 1.3 - i * .025, 3, .85); });
    s += pin28(e, '#B9F4FF', k) + chip3(e[0], e[1] + 70, n + ' von 12 frei', 34, '#0B1020', '#F4F6FB', cl((wc - .9) / .3)); }
  s += cam28(cam[0], cam[1], 1, 1);
  h += slot(ev, [['zweit', 'Zweiter Strahl: zur Sonne'], ['hell', 'Frei: die Stelle ist hell'], ['weg', 'Blockiert: Schatten', 'hot'], ['weich', 'Viele Strahlen: weicher Rand']]);
  const X = wxP28(ev, t, lt); return Wp28(s + shade3(), h + msh28(X, 1537, 0, at28(X, 1537, wc !== undefined ? 'weich' : 'hart') * (T.scan !== undefined || wc !== undefined ? 1 : 1), 0, 0)); };
// Randpunkt: zwischen Kronenschatten und Licht, auf der Hoehe von P2
var ED28 = null; function edge28() { if (ED28) return ED28; const y = p2P28()[1]; let last = null; for (let x = p2P28()[0]; x < 1000; x += 2) { const l = lit28(gd28(x, y), 'weich'); if (l > .3 && l < .7) return ED28 = [x, y]; if (l >= .7 && !last) last = [x, y]; } return ED28 = last || [700, y]; }
// Schaltis Platz beim Schatten-Test
var WX28 = null; function wx28() { if (WX28) return WX28; for (let x = 260; x < 700; x += 10) if (at28(x, 1537, 'hart') < .5) return WX28 = x + 40; return WX28 = 430; }
function wxP28(ev, t, lt) { return 220; } // Schalti bleibt im Licht und schaut dem Test zu
WMASC.p28test = (ev, t, lt) => { const x = wxP28(ev, t, lt), w = false, l = at28(x, 1537, ev.weich !== undefined ? 'weich' : 'hart');
  const T = test28(ev, t), shadowOn = T.scan !== undefined && (ev.weich !== undefined || 1537 < lerp(HZ28 + 60, 1920, T.scan)); const lk = shadowOn ? l : 1;
  return stay3([x, 1537 - (w ? 10 * Math.abs(Math.sin(t * 17)) : 0)], 1, { r: w ? 8 : 2, walk: w ? 1 : 0, fx: lab28(lk), mood: ev.weg !== undefined && !w && lk < .5 ? 'shock' : undefined }); };

// ---------- Teil 3: die Schattenkarte ----------
function meter28(k, t) { const v = cl(k), col = v > .8 ? '#FF5A7A' : v > .5 ? '#FFE14D' : '#3DFF7A'; let s = '<g transform="translate(310 690)"><rect x="0" y="0" width="170" height="250" rx="22" fill="#0B1020" stroke="' + AC28P + '" stroke-width="6"/>' + svgT(85, 44, 'Rechnen', 30, '#B9F4FF');
  for (let i = 0; i < 8; i++) { const on = (i + 1) / 8 <= v + .001; s += '<rect x="30" y="' + (220 - i * 21) + '" width="110" height="15" rx="5" fill="' + (on ? col : '#26335E') + '"' + (on && v > .9 ? ' opacity="' + (.6 + .4 * Math.sin(t * 20)).toFixed(2) + '"' : '') + '/>'; }
  return s + '</g>'; }
function sunview28(k) { if (k <= .01) return ''; const e = back(cl(k)); let s = '<g transform="translate(330 830) scale(' + e.toFixed(3) + ')"><rect x="-130" y="-120" width="260" height="240" rx="18" fill="#0B1020" stroke="#FFE14D" stroke-width="7"/>';
  // Blick der Sonne: was sie sieht, je naeher, desto heller; Boden dahinter dunkel
  s += '<rect x="-112" y="-60" width="224" height="160" fill="#3A3A50"/><rect x="-112" y="-102" width="224" height="42" fill="#15151F"/>' + svgT(0, -72, 'Blick der Sonne', 24, '#FFE14D');
  s += '<path d="M-6 100 Q-2 40 4 -6" stroke="#D8D8E8" stroke-width="14" fill="none" stroke-linecap="round"/>';
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 + .3; s += '<path d="M4 -10 q' + (40 * Math.cos(a)).toFixed(1) + ' ' + (-26 + 14 * Math.sin(a)).toFixed(1) + ' ' + (62 * Math.cos(a)).toFixed(1) + ' ' + (10 + 26 * Math.sin(a)).toFixed(1) + '" stroke="#F4F6FB" stroke-width="12" fill="none" stroke-linecap="round"/>'; }
  return s + '</g>'; }
function board28(k, t) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(330 830) scale(' + e.toFixed(3) + ')"><path d="M-90 120 V260 M90 120 V260" stroke="#3A1E2E" stroke-width="14"/><rect x="-150" y="-130" width="300" height="250" rx="20" fill="#0B1020" stroke="#FF6BD6" stroke-width="8"/><rect x="-138" y="-118" width="276" height="226" rx="14" fill="none" stroke="' + AC28P + '" stroke-width="3" opacity="' + (.5 + .5 * Math.sin(t * 6)).toFixed(2) + '"/>'
  + svgT(0, -60, 'GTA 6', 64, '#FFE14D') + svgT(0, 0, 'Raytracing-', 32, '#F4F6FB') + svgT(0, 38, 'Schatten', 32, '#F4F6FB') + svgT(0, 90, 'nur PS5 Pro', 34, '#FF6BD6') + '</g>'; }
WORLD.p28karte = function (sc, ev, t, lt) { const vi = ev.viel, tr = ev.trick, si = ev.sieht, ro = ev.rock; let s = base28(), h = '';
  // Schatten: weich (Raytracing), beim Trick weg, dann kantig aus der Karte, zum Schluss wieder weich
  let ws = 1, ks = 0; if (tr !== undefined) ws = 1 - cl(tr / .5); if (si !== undefined) { ks = cl((si - 1.6) / .8); } if (ro !== undefined) { ks = 1 - cl((ro - .3) / .8); ws = cl((ro - .3) / .8); }
  s += shadow28('weich', ws) + shadow28('karte', ks) + palmS28();
  // Satz 1: Strahlen-Gewitter von der Kamera in die Szene und weiter zur Sonne, Rechen-Anzeige laeuft voll
  const cam0 = [CAM28[0], CAM28[1] + 6 * Math.sin(t * 2.4)];
  if (vi !== undefined && tr === undefined) { const n = Math.floor(10 + 60 * cl(vi / 2.5)); for (let i = 0; i < n; i++) { const ph = Math.floor(t * 12 + i * 7) % 97, p = [70 + rnd(ph + i * 13) * 880, 1320 + rnd(ph * 3 + i) * 240], r = sray28(p); s += ray28(cam0, p, '#F4F6FB', 1, 2, .35) + ray28(p, r.end, r.hit ? '#FF5A7A' : '#FFE9A8', 1, 2, .45); }
    s += meter28(cl(vi / 2.5), t); }
  // Satz 2 und 3: Kamera fliegt zur Sonne, schaut von dort, Blick der Sonne als Karte, dann faellt der Schatten aus der Karte
  let cp = cam0, ck = 1, fl = 1;
  if (tr !== undefined) { const k = ease(cl((tr - .4) / 1.6)); cp = [lerp(cam0[0], SUN28[0] - 10, k), lerp(cam0[1], SUN28[1] + 150, k)]; fl = k > .85 ? 0 : 1; }
  if (si !== undefined) { cp = [SUN28[0] - 10, SUN28[1] + 150]; fl = 0; }
  if (ro !== undefined) { const k = ease(cl(ro / .6)); ck = 1 - k; cp = [SUN28[0] - 10, SUN28[1] + 150]; fl = 0; }
  s += cam28(cp[0], cp[1], ck, fl);
  if (si !== undefined && ro === undefined) { const k = cl(si / .4); s += sunview28(k);
    // Blickstrahlen der Sonne: treffen die Palme, dahinter Schatten
    for (let i = 0; i < 7; i++) { const p = [420 + i * 60, 1400 + (i % 2) * 60], r = sray28(p), q = r.hit ? r.end : p; s += ray28(SUN28, q, '#FFE14D', cl((si - .4) / .9) * 1.2 - i * .04, 3, .7); } }
  if (ro !== undefined) s += board28(cl((ro - .2) / .5), t);
  h += slot(ev, [['viel', 'Viele Strahlen = viel Rechnen', 'hot'], ['trick', 'Trick: Schattenkarte'], ['sieht', 'Was die Sonne sieht, ist hell'], ['rock', 'GTA 6: Raytracing-Schatten nur PS5 Pro']]);
  const X = kxP28(ev, t, lt); return Wp28(s + shade3(), h + msh28(X, 1537, 0, at28(X, 1537), 0, 0)); };
function kxP28(ev, t, lt) { return 220; }
WMASC.p28karte = (ev, t, lt) => { const x = kxP28(ev, t, lt), w = false; const ro = ev.rock, si = ev.sieht, tr = ev.trick; let ws = 1; if (tr !== undefined) ws = 1 - cl(tr / .5); if (ro !== undefined) ws = cl((ro - .3) / .8);
  const l = at28(x, 1537); return stay3([x, 1537 - (w ? 10 * Math.abs(Math.sin(t * 17)) : 0)], 1, { r: w ? -8 : 2, walk: w ? 1 : 0, fx: lab28(1 - (1 - l) * ws) }); };

// ---------- Schluss ----------
WORLD.p28outro = function (sc, ev, t) { return Wp28(base28() + shadow28('weich', 1) + palmS28() + shade3(), msh28(220, 1537, 0, 1, 0, 0)); };
WMASC.p28outro = () => BIG3();

// Kamera (look3) nur auf das Bild anwenden: der Schatten-Teil (HTML mit Schalti-Kopie) enthaelt eigene SVGs
function Wp28(svg, html) { return { svg: svg, html: html || '' }; }
['p28hook', 'p28strahl', 'p28test', 'p28karte', 'p28outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => { const r = inner(sc, ev, t, lt, E); return look3(W(r.svg), sc, t, lt, AC28P) + r.html; }; });
