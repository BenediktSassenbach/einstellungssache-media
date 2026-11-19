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

// ---- Ort (v3, Benedikt 19.11.2026: Grafik hochwertiger, nicht billig)
// Laterne vorn rechts: senkrechte Stange (Zylinder) mit Arm und Leuchte, wirft ebenfalls einen berechneten Schatten
var LAMP28 = { X: 3.0, Z: 6.2, H: 5.0, r: .09, head: [2.55, 4.85, 6.2], hr: .22 };
function hitC28(P, D) { const l = LAMP28, ox = P[0] - l.X, oz = P[2] - l.Z, a = D[0] * D[0] + D[2] * D[2], bb = 2 * (ox * D[0] + oz * D[2]), c = ox * ox + oz * oz - l.r * l.r, dd = bb * bb - 4 * a * c; if (dd < 0 || a < 1e-9) return -1;
  const t0 = (-bb - Math.sqrt(dd)) / (2 * a); if (t0 < 0) return -1; const y = P[1] + D[1] * t0; return y >= 0 && y <= l.H ? t0 : -1; }
(function () { const ob = block28; block28 = function (P, D) { let h = ob(P, D); const c = hitC28(P, D); if (c >= 0 && (h < 0 || c < h)) h = c; const s2 = hitS28(P, D, LAMP28.head, LAMP28.hr); if (s2 >= 0 && (h < 0 || s2 < h)) h = s2;
  for (let i = 1; i <= 4; i++) { const q = [LAMP28.X - (LAMP28.X - LAMP28.head[0]) * i / 4, LAMP28.H, LAMP28.Z], s3 = hitS28(P, D, q, .07); if (s3 >= 0 && (h < 0 || s3 < h)) h = s3; } return h; }; })();
function sky28() { let s = '<defs><linearGradient id="sk28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140B38"/><stop offset=".26" stop-color="#3E1F78"/><stop offset=".36" stop-color="#8A2F8C"/><stop offset=".44" stop-color="#E2507E"/><stop offset=".5" stop-color="#FF8A5E"/><stop offset=".56" stop-color="#FFC07A"/></linearGradient>'
  + '<radialGradient id="sg28"><stop offset="0" stop-color="#FFF6D8" stop-opacity="1"/><stop offset=".12" stop-color="#FFE3A0" stop-opacity=".8"/><stop offset=".4" stop-color="#FFA36B" stop-opacity=".35"/><stop offset="1" stop-color="#FF6B7A" stop-opacity="0"/></radialGradient>'
  + '<radialGradient id="sd28"><stop offset="0" stop-color="#FFFDF2"/><stop offset=".7" stop-color="#FFF0C4"/><stop offset="1" stop-color="#FFD98A"/></radialGradient>'
  + '<linearGradient id="hz28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFC48A" stop-opacity="0"/><stop offset="1" stop-color="#FFC48A" stop-opacity=".75"/></linearGradient>'
  + '<filter id="bl28" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter><filter id="bl28b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter></defs>'
  + '<rect width="1080" height="1100" fill="url(#sk28)"/>';
  for (let i = 0; i < 40; i++) s += '<circle cx="' + (rnd(i + 600) * 1080).toFixed(0) + '" cy="' + (rnd(i + 640) * 520).toFixed(0) + '" r="' + (1 + rnd(i + 680) * 1.6).toFixed(1) + '" fill="#fff" opacity="' + (.2 + .5 * rnd(i + 700)).toFixed(2) + '"/>';
  return s + '<circle cx="' + SUN28[0] + '" cy="' + SUN28[1] + '" r="520" fill="url(#sg28)"/>'; }
// Sonne mit Lichtstrahlen, Blendstreifen und Flimmern (jede Szene neu, weil sie sich bewegt)
function sun28(t) { const X = SUN28[0], Y = SUN28[1]; let s = '<g style="mix-blend-mode:screen">';
  for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2 + t * .04 + .2 * Math.sin(t * .3 + i), w = .05 + .03 * rnd(i + 30), L = 900; s += '<path d="M' + X + ' ' + Y + ' L' + (X + L * Math.cos(a - w)).toFixed(0) + ' ' + (Y + L * Math.sin(a - w)).toFixed(0) + ' L' + (X + L * Math.cos(a + w)).toFixed(0) + ' ' + (Y + L * Math.sin(a + w)).toFixed(0) + ' Z" fill="#FFE2A8" opacity="' + (.05 + .03 * Math.sin(t * .7 + i)).toFixed(3) + '"/>'; }
  s += '<ellipse cx="' + X + '" cy="' + Y + '" rx="300" ry="5" fill="#FFF3C9" opacity=".45" filter="url(#bl28)"/><circle cx="' + X + '" cy="' + Y + '" r="96" fill="#FFE9A8" opacity=".55" filter="url(#bl28b)"/></g>';
  return s + '<circle cx="' + X + '" cy="' + Y + '" r="' + (62 + 1.5 * Math.sin(t * 2)).toFixed(1) + '" fill="url(#sd28)"/>'; }
// Haeuser: hinten blasse Skyline im Dunst, vorn Art-deco mit Fenstern, Dachkrone, Lichtseite zur Sonne (rechts)
var WIN28 = [];
function city28() { let s = '<defs><linearGradient id="fb28" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#FFB27A" stop-opacity=".0"/><stop offset="1" stop-color="#FFC38A" stop-opacity=".45"/></linearGradient>'
  + '<linearGradient id="gl28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6A3A8E"/><stop offset="1" stop-color="#3A1F5E"/></linearGradient></defs>';
  // hintere Skyline
  const far = [[0, 90, 230], [70, 60, 300], [140, 110, 210], [330, 70, 260], [400, 90, 330], [500, 60, 240], [560, 100, 280], [880, 80, 250], [960, 120, 300]];
  for (const f of far) { const y = 1068 - f[2]; s += '<rect x="' + f[0] + '" y="' + y + '" width="' + f[1] + '" height="' + f[2] + '" fill="#C46A9E" opacity=".55"/><rect x="' + (f[0] + f[1] * .3) + '" y="' + (y - 18) + '" width="' + (f[1] * .4) + '" height="18" fill="#C46A9E" opacity=".55"/>'; }
  s += '<rect x="0" y="760" width="1080" height="312" fill="url(#hz28)" opacity=".55"/>';
  const B = [[-40, 150, 300, '#7E3C86'], [100, 110, 250, '#5E3280'], [190, 170, 340, '#94487E'], [600, 130, 280, '#6A3888'], [720, 190, 380, '#8E4278'], [900, 150, 300, '#5E3280'], [1040, 110, 240, '#7E3C86']];
  B.forEach((b, bi) => { const x = b[0], w = b[1], y = 1072 - b[2], col = b[3];
    // Dachkrone gestuft
    s += '<rect x="' + (x + w * .18) + '" y="' + (y - 26) + '" width="' + (w * .64) + '" height="28" fill="' + col + '"/><rect x="' + (x + w * .34) + '" y="' + (y - 50) + '" width="' + (w * .32) + '" height="26" fill="' + col + '"/>' + (bi % 2 ? '<path d="M' + (x + w * .5) + ' ' + (y - 50) + ' v-60" stroke="#3A1F5E" stroke-width="4"/>' : '<path d="M' + (x + w * .34) + ' ' + (y - 50) + ' q' + (w * .16) + ' -34 ' + (w * .32) + ' 0" fill="' + col + '"/>');
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + b[2] + '" fill="' + col + '"/><rect x="' + x + '" y="' + (y - 50) + '" width="' + w + '" height="' + (b[2] + 50) + '" fill="url(#fb28)"/><rect x="' + (x + w - 5) + '" y="' + y + '" width="5" height="' + b[2] + '" fill="#FFD3A0" opacity=".7"/><rect x="' + (x - 4) + '" y="' + (y - 6) + '" width="' + (w + 8) + '" height="8" fill="#FFC9A0" opacity=".55"/>';
    // senkrechte Lisenen
    for (let k = 1; k < 4; k++) s += '<rect x="' + (x + w * k / 4 - 3) + '" y="' + (y + 10) + '" width="6" height="' + (b[2] - 10) + '" fill="#000" opacity=".12"/>';
    // Fenster
    for (let yy = y + 22; yy < 1052; yy += 28) for (let xx = x + 12; xx < x + w - 18; xx += 24) { if (xx < -20 || xx > 1080) continue; const lit = rnd(xx * 7 + yy) > .78; s += '<rect x="' + xx + '" y="' + yy + '" width="13" height="16" rx="2" fill="' + (lit ? '#FFD9A0' : 'url(#gl28)') + '" opacity="' + (lit ? .85 : .9) + '"/>' + (lit ? '' : '<rect x="' + xx + '" y="' + yy + '" width="13" height="4" fill="#FF9FB8" opacity=".25"/>'); if (!lit && rnd(xx + yy * 3) > .93) WIN28.push([xx, yy]); }
    s += '<rect x="' + x + '" y="' + (1072 - 40) + '" width="' + w + '" height="40" fill="#2A1440" opacity=".35"/>'; });
  return s + '<rect x="0" y="960" width="1080" height="112" fill="url(#hz28)" opacity=".5"/>'; }
// Boden: heller Steinplatz in Perspektive, Platten leicht unterschiedlich, Sonnen-Spiegelung, Bordstein vorn
function ground28() { let s = '<defs><linearGradient id="gr28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D79A86"/><stop offset=".25" stop-color="#EBB596"/><stop offset=".7" stop-color="#F0C29C"/><stop offset="1" stop-color="#C98E78"/></linearGradient>'
  + '<linearGradient id="rf28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1C8" stop-opacity=".75"/><stop offset="1" stop-color="#FFD39A" stop-opacity="0"/></linearGradient></defs>'
  + '<rect x="0" y="1072" width="1080" height="848" fill="url(#gr28)"/>';
  const Zs = [4.4, 5, 5.7, 6.5, 7.5, 8.7, 10.2, 12, 14.5, 17.5, 21.5, 26]; for (let zi = 0; zi < Zs.length - 1; zi++) for (let X = -16; X < 16; X += 2) { if ((zi + X / 2) % 2 === 0) continue; const a = pj28(X, 0, Zs[zi]), b = pj28(X + 2, 0, Zs[zi]), c = pj28(X + 2, 0, Zs[zi + 1]), d = pj28(X, 0, Zs[zi + 1]);
    s += '<path d="M' + a.map(v => v.toFixed(1)).join(' ') + ' L' + b.map(v => v.toFixed(1)).join(' ') + ' L' + c.map(v => v.toFixed(1)).join(' ') + ' L' + d.map(v => v.toFixed(1)).join(' ') + ' Z" fill="#B87A6E" opacity=".1"/>'; }
  for (const Z of Zs) { const y = pj28(0, 0, Z)[1]; s += '<path d="M0 ' + y.toFixed(1) + ' H1080" stroke="#9E6A64" stroke-width="' + (14 / Z).toFixed(2) + '" opacity=".35"/>'; }
  for (let X = -16; X <= 16; X += 2) { const a = pj28(X, 0, 4.4), b = pj28(X, 0, 26); s += '<path d="M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' L' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + '" stroke="#9E6A64" stroke-width="2" opacity=".3"/>'; }
  // Spiegelung der Sonne im glatten Stein
  s += '<path d="M' + (SUN28[0] - 40) + ' 1112 L' + (SUN28[0] + 40) + ' 1112 L' + (SUN28[0] + 170) + ' 1660 L' + (SUN28[0] - 150) + ' 1660 Z" fill="url(#rf28)" opacity=".35" filter="url(#bl28b)"/>';
  // Bordstein und Strasse ganz vorn
  const cy = pj28(0, 0, 4.4)[1]; s += '<rect x="0" y="' + (cy - 6).toFixed(1) + '" width="1080" height="16" fill="#F7DCC0"/><rect x="0" y="' + (cy + 10).toFixed(1) + '" width="1080" height="' + (1920 - cy).toFixed(1) + '" fill="#3A2440"/><rect x="0" y="' + (cy + 10).toFixed(1) + '" width="1080" height="18" fill="#000" opacity=".25"/>';
  return s; }
// Laterne vorn rechts
function lampP28(t) { const l = LAMP28, b = pj28(l.X, 0, l.Z), tp = pj28(l.X, l.H, l.Z), hd = pj28(l.head[0], l.head[1], l.head[2]), w = F28 * l.r * 2 / l.Z;
  return '<ellipse cx="' + b[0].toFixed(1) + '" cy="' + b[1].toFixed(1) + '" rx="34" ry="9" fill="#2A1440" opacity=".35"/><rect x="' + (b[0] - w / 2 - 6).toFixed(1) + '" y="' + (b[1] - 40).toFixed(1) + '" width="' + (w + 12).toFixed(1) + '" height="40" rx="6" fill="#2A1A3A"/>'
    + '<rect x="' + (b[0] - w / 2).toFixed(1) + '" y="' + tp[1].toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + (b[1] - tp[1]).toFixed(1) + '" fill="#2A1A3A"/><rect x="' + (b[0] + w / 2 - 6).toFixed(1) + '" y="' + tp[1].toFixed(1) + '" width="5" height="' + (b[1] - tp[1]).toFixed(1) + '" fill="#FFB98A" opacity=".55"/>'
    + '<path d="M' + b[0].toFixed(1) + ' ' + tp[1].toFixed(1) + ' Q' + ((b[0] + hd[0]) / 2).toFixed(1) + ' ' + (tp[1] - 30).toFixed(1) + ' ' + hd[0].toFixed(1) + ' ' + (hd[1] - 10).toFixed(1) + '" stroke="#2A1A3A" stroke-width="12" fill="none"/>'
    + '<path d="M' + (hd[0] - 34).toFixed(1) + ' ' + (hd[1] + 10).toFixed(1) + ' l14 -26 h40 l14 26 Z" fill="#2A1A3A"/><ellipse cx="' + hd[0].toFixed(1) + '" cy="' + (hd[1] + 12).toFixed(1) + '" rx="26" ry="7" fill="#FFE9B8" opacity=".9"/>'; }
// Palme: runder Stamm mit Ringen (Licht von rechts), gefiederte Wedel mit Lichtkante. Wedelspitzen wiegen sich wenige Pixel
function palm28(tt) { let s = '<defs><linearGradient id="tk28" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3A1E2E"/><stop offset=".55" stop-color="#6A3A40"/><stop offset=".85" stop-color="#C08060"/><stop offset="1" stop-color="#E8A878"/></linearGradient>'
  + '<linearGradient id="lf28" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1E4A3A"/><stop offset=".6" stop-color="#2F7A52"/><stop offset="1" stop-color="#7CC27A"/></linearGradient></defs>';
  const tr = PALM28.tr.map(p => pj28(p[0], p[1], p[2])), wd = i => 17 - 6 * i / (tr.length - 1);
  // Stamm als Flaeche
  let L = [], R = []; tr.forEach((p, i) => { const q = tr[Math.min(i + 1, tr.length - 1)], o = tr[Math.max(i - 1, 0)], dx = q[0] - o[0], dy = q[1] - o[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l; L.push([p[0] + nx * wd(i), p[1] + ny * wd(i)]); R.push([p[0] - nx * wd(i), p[1] - ny * wd(i)]); });
  s += '<path d="M' + L.map(v => v[0].toFixed(1) + ' ' + v[1].toFixed(1)).join(' L') + ' L' + R.reverse().map(v => v[0].toFixed(1) + ' ' + v[1].toFixed(1)).join(' L') + ' Z" fill="url(#tk28)"/>';
  for (let i = 1; i < tr.length - 1; i++) { const p = tr[i], w = wd(i); s += '<path d="M' + (p[0] - w).toFixed(1) + ' ' + p[1].toFixed(1) + ' q' + w.toFixed(1) + ' ' + (5 + i % 2 * 2) + ' ' + (2 * w).toFixed(1) + ' 0" stroke="#2A1420" stroke-width="2.5" fill="none" opacity=".55"/>'; }
  const fr = PALM28.fr.map((f, k) => f.map((p, j) => { const q = pj28(p[0], p[1], p[2]); const a = 5 * (j / 8) * (j / 8) * Math.sin(tt * 1.4 + k); return [q[0] + a, q[1] + a * .4]; })).sort((a, b) => a[8][1] - b[8][1]);
  for (const f of fr) { const sp = f.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
    let lv = ''; for (let j = 1; j < 9; j++) { const p = f[j - 1], q = f[j], dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l, w = 34 * Math.sin(Math.PI * (j / 9 * .85 + .1));
      for (let m = 0; m < 3; m++) { const u = (m + .5) / 3, x = p[0] + dx * u, y = p[1] + dy * u; for (const sg of [-1, 1]) { const ex = x + (-uy * sg * w + ux * w * .45), ey = y + (ux * sg * w + uy * w * .45) + w * .35; lv += '<path d="M' + x.toFixed(1) + ' ' + y.toFixed(1) + ' Q' + ((x + ex) / 2 + ux * 4).toFixed(1) + ' ' + ((y + ey) / 2 - 6).toFixed(1) + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1) + '" stroke="' + (sg > 0 ? '#2F7A52' : '#255E44') + '" stroke-width="' + (6 - 3 * j / 9).toFixed(1) + '" fill="none" stroke-linecap="round"/>'; } } }
    s += '<g>' + lv + '<path d="M' + sp + '" stroke="#1C3A2C" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M' + f.map(p => (p[0] + 1.5).toFixed(1) + ' ' + (p[1] - 2).toFixed(1)).join(' L') + '" stroke="#9AD88A" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"/></g>'; }
  const c = pj28(PALM28.C[0], PALM28.C[1] - .25, PALM28.C[2]); s += [[-12, 4], [10, 6], [0, 16]].map(o => '<circle cx="' + (c[0] + o[0]).toFixed(1) + '" cy="' + (c[1] + o[1]).toFixed(1) + '" r="11" fill="#5A3A20"/><circle cx="' + (c[0] + o[0] + 3).toFixed(1) + '" cy="' + (c[1] + o[1] - 3).toFixed(1) + '" r="4" fill="#C08A50" opacity=".7"/>').join('');
  const b0 = tr[0]; s += '<ellipse cx="' + b0[0].toFixed(1) + '" cy="' + (b0[1] + 2).toFixed(1) + '" rx="30" ry="6" fill="#2A1440" opacity=".4"/>';
  return s; }
var SKY28 = null, CTY28 = null, GRD28 = null;
// ---- Leben im Ort
function cloud28(t) { let s = ''; for (let i = 0; i < 5; i++) { const x = ((rnd(i + 70) * 1400 + t * (8 + 6 * rnd(i + 71))) % 1500) - 250, y = 560 + rnd(i + 72) * 190, w = 120 + rnd(i + 73) * 140;
  s += '<g opacity=".6"><ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + w.toFixed(1) + '" ry="' + (w * .16).toFixed(1) + '" fill="#E07A9A"/><ellipse cx="' + (x + w * .25).toFixed(1) + '" cy="' + (y - w * .1).toFixed(1) + '" rx="' + (w * .55).toFixed(1) + '" ry="' + (w * .15).toFixed(1) + '" fill="#FFB8A0"/><ellipse cx="' + (x + w * .32).toFixed(1) + '" cy="' + (y - w * .16).toFixed(1) + '" rx="' + (w * .32).toFixed(1) + '" ry="' + (w * .07).toFixed(1) + '" fill="#FFE2C4"/></g>'; } return s; }
function gull28(x, y, t, sz) { const f = Math.sin(t * 9) * 14 * sz; return '<path d="M' + (x - 28 * sz).toFixed(1) + ' ' + (y - f).toFixed(1) + ' Q' + (x - 13 * sz).toFixed(1) + ' ' + (y - 14 * sz).toFixed(1) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ' Q' + (x + 13 * sz).toFixed(1) + ' ' + (y - 14 * sz).toFixed(1) + ' ' + (x + 28 * sz).toFixed(1) + ' ' + (y - f).toFixed(1) + '" stroke="#2A1440" stroke-width="' + (5 * sz).toFixed(1) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="' + x.toFixed(1) + '" cy="' + (y + 2 * sz).toFixed(1) + '" rx="' + (6 * sz).toFixed(1) + '" ry="' + (3.5 * sz).toFixed(1) + '" fill="#F4F6FB"/>'; }
function gulls28(t) { let s = ''; for (let i = 0; i < 3; i++) { const sp = 55 + 25 * i, x = ((t * sp + i * 520) % 1500) - 200, y = 700 + i * 70 + 25 * Math.sin(t * .8 + i); s += gull28(i % 2 ? 1080 - x : x, y, t + i, .8 + .25 * i); } return s; }
// Fenster gehen an und aus, Antennen blinken, Neon-Schrift leuchtet und flackert
function lights28(t) { let s = ''; WIN28.forEach((w, i) => { const on = Math.floor(t * .5 + rnd(i + 200) * 9) % 4 === 0; if (on) s += '<rect x="' + w[0] + '" y="' + w[1] + '" width="13" height="16" rx="2" fill="#FFE2A8"/>'; });
  for (const a of [[100 + 55, 1072 - 250 - 110], [600 + 65, 1072 - 280 - 110], [900 + 75, 1072 - 300 - 110]]) if ((t * 1.2 + a[0]) % 2 < .5) s += '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="5" fill="#FF4A6A"/><circle cx="' + a[0] + '" cy="' + a[1] + '" r="14" fill="#FF4A6A" opacity=".3"/>';
  const fl = (Math.floor(t * 7) % 13 === 0) ? .3 : 1; s += '<g opacity="' + fl + '"><rect x="212" y="742" width="126" height="44" rx="10" fill="#FF6BD6" opacity=".55" filter="url(#bl28)"/><rect x="212" y="742" width="126" height="44" rx="10" fill="#1B0E3A" stroke="#FF6BD6" stroke-width="5"/>' + svgT(275, 776, 'HOTEL', 30, '#FFC2F0') + '</g>';
  return s; }
var CARC28 = ['#FF5A7A', '#5CE1FF', '#FFE14D', '#F4F6FB', '#7C5CFF'];
function shp28(X, Z, h, w) { const a = pj28(X - w / 2, 0, Z), b = pj28(X + w / 2, 0, Z), dx = -L28[0] / L28[1] * h, dz = -L28[2] / L28[1] * h, c = pj28(X + w / 2 + dx, 0, Z + dz), d = pj28(X - w / 2 + dx, 0, Z + dz);
  return '<path d="M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' L' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + ' L' + c[0].toFixed(1) + ' ' + c[1].toFixed(1) + ' L' + d[0].toFixed(1) + ' ' + d[1].toFixed(1) + ' Z" fill="#22104A" opacity=".4"/>'; }
function carP28(L, H, col, dir) { return '<g transform="scale(' + dir + ',1)"><path d="M' + (-L / 2) + ' ' + (-H * .18) + ' v' + (-H * .32) + ' q0 ' + (-H * .1) + ' ' + (L * .08) + ' ' + (-H * .12) + ' l' + (L * .14) + ' ' + (-H * .02) + ' l' + (L * .14) + ' ' + (-H * .36) + ' h' + (L * .34) + ' l' + (L * .12) + ' ' + (H * .34) + ' l' + (L * .1) + ' ' + (H * .04) + ' q' + (L * .08) + ' 0 ' + (L * .08) + ' ' + (H * .12) + ' v' + (H * .3) + ' Z" fill="' + col + '"/>'
  + '<path d="M' + (-L * .17) + ' ' + (-H * .64) + ' l' + (L * .11) + ' ' + (-H * .3) + ' h' + (L * .3) + ' l' + (L * .1) + ' ' + (H * .3) + ' Z" fill="#2C2C5A"/><path d="M' + (-L * .1) + ' ' + (-H * .9) + ' l' + (L * .1) + ' 0 l' + (-L * .12) + ' ' + (H * .24) + ' Z" fill="#fff" opacity=".35"/>'
  + '<path d="M' + (-L / 2) + ' ' + (-H * .44) + ' H' + (L / 2) + '" stroke="#fff" stroke-width="' + (H * .05) + '" opacity=".35"/><rect x="' + (-L / 2) + '" y="' + (-H * .3) + '" width="' + L + '" height="' + (H * .12) + '" fill="#000" opacity=".2"/>'
  + [-.3, .3].map(k => '<circle cx="' + (L * k) + '" cy="' + (-H * .16) + '" r="' + (H * .2) + '" fill="#1A1028"/><circle cx="' + (L * k) + '" cy="' + (-H * .16) + '" r="' + (H * .09) + '" fill="#B8B8C8"/>').join('')
  + '<rect x="' + (L * .44) + '" y="' + (-H * .44) + '" width="' + (L * .06) + '" height="' + (H * .1) + '" fill="#FFF3C9"/><rect x="' + (-L * .5) + '" y="' + (-H * .44) + '" width="' + (L * .05) + '" height="' + (H * .1) + '" fill="#FF3A5A"/></g>'; }
function road28(t) { const y0 = pj28(0, 0, 30)[1], y1 = pj28(0, 0, 26)[1]; let s = '<rect x="0" y="' + (y0 - 2).toFixed(1) + '" width="1080" height="' + (y1 - y0 + 2).toFixed(1) + '" fill="#4A2A52"/><rect x="0" y="' + (y1 - 2).toFixed(1) + '" width="1080" height="3" fill="#F7D2B8" opacity=".7"/>';
  for (let x = -40; x < 1080; x += 90) s += '<rect x="' + x + '" y="' + ((y0 + y1) / 2 - 1.5).toFixed(1) + '" width="44" height="3" fill="#FFD27A" opacity=".7"/>';
  const cars = []; for (let i = 0; i < 4; i++) { const dir = i % 2 ? -1 : 1, Z = dir > 0 ? 28.8 : 27.2, sp = 5 + rnd(i + 90) * 3, X = dir * (((t * sp + i * 11) % 44) - 22); cars.push([Z, X, dir, i]); }
  cars.sort((a, b) => b[0] - a[0]).forEach(c => { const Z = c[0], X = c[1], p = pj28(X, 0, Z), k = F28 / Z; s += shp28(X, Z, 1.3, 4.2) + '<g transform="translate(' + p[0].toFixed(1) + ' ' + (p[1] + .6 * Math.sin(t * 20 + c[3])).toFixed(1) + ')">' + carP28(4.2 * k, 1.35 * k, CARC28[c[3] % 5], c[2]) + '</g>'; });
  return s; }
function walk28p(t) { let s = ''; const P = []; for (let i = 0; i < 4; i++) { const dir = i % 2 ? -1 : 1, Z = 21 + i * .7, X = dir * (((t * (1.1 + .3 * rnd(i + 120)) + i * 9) % 30) - 15); P.push([Z, X, dir, i]); }
  P.sort((a, b) => b[0] - a[0]).forEach(q => { const Z = q[0], X = q[1], p = pj28(X, 0, Z), k = F28 / Z, h = 1.75 * k, ph = t * 7 + q[3], sw = Math.sin(ph) * h * .14, bob = Math.abs(Math.cos(ph)) * h * .03, col = ['#5CE1FF', '#FF6BD6', '#FFE14D', '#3DFF7A'][q[3]], hair = ['#2A1430', '#7A3A20', '#F2D08A', '#2A1430'][q[3]], skin = ['#F2C9A0', '#C68A62', '#F2C9A0', '#8A5A3A'][q[3]];
    s += shp28(X, Z, 1.75, .45) + '<g transform="translate(' + p[0].toFixed(1) + ' ' + (p[1] - bob).toFixed(1) + ') scale(' + q[2] + ',1)">'
      + '<path d="M0 ' + (-h * .47).toFixed(1) + ' l' + sw.toFixed(1) + ' ' + (h * .47).toFixed(1) + ' M0 ' + (-h * .47).toFixed(1) + ' l' + (-sw).toFixed(1) + ' ' + (h * .47).toFixed(1) + '" stroke="#2A2050" stroke-width="' + (h * .1).toFixed(1) + '" stroke-linecap="round"/>'
      + '<path d="M0 ' + (-h * .78).toFixed(1) + ' l' + (-sw * .8).toFixed(1) + ' ' + (h * .3).toFixed(1) + '" stroke="' + skin + '" stroke-width="' + (h * .07).toFixed(1) + '" stroke-linecap="round"/>'
      + '<path d="M' + (-h * .12).toFixed(1) + ' ' + (-h * .45).toFixed(1) + ' l' + (h * .02).toFixed(1) + ' ' + (-h * .34).toFixed(1) + ' q' + (h * .1).toFixed(1) + ' ' + (-h * .05).toFixed(1) + ' ' + (h * .2).toFixed(1) + ' 0 l' + (h * .02).toFixed(1) + ' ' + (h * .34).toFixed(1) + ' Z" fill="' + col + '"/><path d="M' + (h * .06).toFixed(1) + ' ' + (-h * .78).toFixed(1) + ' v' + (h * .33).toFixed(1) + '" stroke="#fff" stroke-width="' + (h * .03).toFixed(1) + '" opacity=".35"/>'
      + '<path d="M0 ' + (-h * .78).toFixed(1) + ' l' + (sw * .8).toFixed(1) + ' ' + (h * .3).toFixed(1) + '" stroke="' + skin + '" stroke-width="' + (h * .07).toFixed(1) + '" stroke-linecap="round"/>'
      + '<circle cy="' + (-h * .88).toFixed(1) + '" r="' + (h * .1).toFixed(1) + '" fill="' + skin + '"/><path d="M' + (-h * .1).toFixed(1) + ' ' + (-h * .88).toFixed(1) + ' a' + (h * .1).toFixed(1) + ' ' + (h * .1).toFixed(1) + ' 0 0 1 ' + (h * .2).toFixed(1) + ' 0 Z" fill="' + hair + '"/></g>'; });
  return s; }
// Lichtstaub in der Sonne und Filmkorn
function dust28(t) { let s = '<g style="mix-blend-mode:screen">'; for (let i = 0; i < 26; i++) { const x = (rnd(i + 500) * 1080 + 20 * Math.sin(t * .5 + i)) % 1080, y = 640 + ((rnd(i + 540) * 900 - t * (8 + 10 * rnd(i + 560))) % 900 + 900) % 900, r = 1.5 + 2.5 * rnd(i + 580), tw = .3 + .7 * Math.abs(Math.sin(t * 1.5 + i));
  s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="#FFE9C0" opacity="' + (.5 * tw).toFixed(2) + '"/>'; } return s + '</g>'; }
var GRN28 = null; function grain28(t) { if (!GRN28) { const c = document.createElement('canvas'); c.width = c.height = 200; const g = c.getContext('2d'), im = g.createImageData(200, 200); for (let i = 0; i < im.data.length; i += 4) { const v = Math.random() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 22; } g.putImageData(im, 0, 0); GRN28 = c.toDataURL(); }
  const f = Math.floor(t * 30), ox = (f * 73) % 200, oy = (f * 131) % 200; return '<defs><pattern id="gn28" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="translate(' + ox + ' ' + oy + ')"><image href="' + GRN28 + '" width="200" height="200"/></pattern></defs><rect width="1080" height="1920" fill="url(#gn28)" style="mix-blend-mode:overlay"/>'; }
function warm28() { return '<defs><radialGradient id="wm28" cx="' + (SUN28[0] / 1080).toFixed(3) + '" cy="' + (SUN28[1] / 1920).toFixed(3) + '" r=".9"><stop offset="0" stop-color="#FFB86A" stop-opacity=".22"/><stop offset=".6" stop-color="#FF7A6A" stop-opacity=".06"/><stop offset="1" stop-color="#3A1060" stop-opacity=".25"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#wm28)" style="mix-blend-mode:soft-light"/>'; }
function base28(t) { PLMT28 = t; if (!SKY28) { SKY28 = sky28(); CTY28 = city28(); GRD28 = ground28(); } return SKY28 + sun28(t) + cloud28(t) + gulls28(t) + CTY28 + lights28(t) + GRD28 + road28(t) + walk28p(t); }
var PLMT28 = 0; function palmS28() { return palm28(PLMT28) + lampP28(PLMT28) + dust28(PLMT28); }
// Leuchtender Strahl von a nach b, k = wie weit er schon ist
function ray28(a, b, col, k, w, op) { k = cl(k); if (k <= 0) return ''; const x = a[0] + (b[0] - a[0]) * k, y = a[1] + (b[1] - a[1]) * k; w = w || 6; op = op === undefined ? 1 : op; const d = 'M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' L' + x.toFixed(1) + ' ' + y.toFixed(1);
  let s = '<g style="mix-blend-mode:screen"><path d="' + d + '" stroke="' + col + '" stroke-width="' + (w * 4).toFixed(1) + '" opacity="' + (.12 * op).toFixed(3) + '" stroke-linecap="round"/><path d="' + d + '" stroke="' + col + '" stroke-width="' + (w * 2).toFixed(1) + '" opacity="' + (.25 * op).toFixed(3) + '" stroke-linecap="round"/></g><path d="' + d + '" stroke="' + col + '" stroke-width="' + w + '" opacity="' + op.toFixed(2) + '" stroke-linecap="round"/><path d="' + d + '" stroke="#fff" stroke-width="' + (w * .35).toFixed(1) + '" opacity="' + (.8 * op).toFixed(2) + '" stroke-linecap="round"/>';
  const L = Math.hypot(x - a[0], y - a[1]); if (w >= 4 && L > 60) { const T = PLMT28; for (let i = 0; i < 3; i++) { const u = ((T * 520 / Math.max(L, 1)) + i / 3) % 1, px = a[0] + (x - a[0]) * u, py = a[1] + (y - a[1]) * u; s += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="' + (w * .9).toFixed(1) + '" fill="#fff" opacity="' + (.85 * op).toFixed(2) + '"/>'; } }
  if (k < 1) s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (w * 3).toFixed(1) + '" fill="' + col + '" opacity="' + (.35 * op).toFixed(2) + '"/><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (w * 1.5).toFixed(1) + '" fill="#fff" opacity="' + op.toFixed(2) + '"/>';
  return s; }
// Lichtring an einem Treffer, e = Zeit seit dem Treffer
function ring28(p, e, col) { if (e < 0 || e > .9) return ''; const k = e / .9; return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (14 + 70 * ease(k)).toFixed(1) + '" fill="none" stroke="' + (col || '#FFF3C9') + '" stroke-width="' + (8 * (1 - k)).toFixed(1) + '" opacity="' + (1 - k).toFixed(2) + '"/>'; }
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

// ---- Katze: schlaeft im Schatten der Palme. Platz: im harten, weichen und Karten-Schatten, nah bei (600, 1470)
var CAT28 = null; function catP28() { if (CAT28) return CAT28; let best = null; for (let y = 1370; y <= 1500; y += 6) for (let x = 420; x <= 860; x += 6) { const g = gd28(x, y), q = .42, gk = [Math.floor(g[0] / q) * q + q / 2, 0, Math.floor(g[2] / q) * q + q / 2];
  const ok = [[-40, 0], [40, 0]].every(o => { const h = gd28(x + o[0], y + o[1]); return lit28(h, 'weich') < .35; }) && lit28(g, 'hart') === 0 && lit28(gk, 'hart') === 0; if (!ok) continue; const d = Math.hypot(x - 730, y - 1395); if (!best || d < best[2]) best = [x, y, d]; }
  return CAT28 = best ? [best[0], best[1]] : [600, 1470]; }
// st: 0 schlaeft, 1 sitzt wach (schwitzt bei sw), jmp: Sprung 0..1
function cat28(t, st, sw, jmp) { const p = catP28(), e = ease(cl(st)), j = Math.sin(Math.PI * cl(jmp)) * 90; let s = '<g transform="translate(' + p[0] + ' ' + (p[1] - j).toFixed(1) + ')">';
  s += '<ellipse cx="0" cy="' + (4 + j).toFixed(1) + '" rx="' + (70 - 20 * cl(jmp > 0 ? 1 : 0)).toFixed(1) + '" ry="12" fill="#1B0A30" opacity=".25"/>';
  const by = lerp(-26, -40, e), bw = lerp(64, 44, e), bh = lerp(28, 40, e), hx = lerp(46, 18, e), hy = lerp(-30, -84, e);
  s += '<path d="M' + (-bw + 4) + ' ' + (by + 8).toFixed(1) + ' q-40 ' + (-10 - 30 * e).toFixed(1) + ' -30 ' + (-40 + 20 * Math.sin(t * 3)).toFixed(1) + '" stroke="#E07A3A" stroke-width="13" fill="none" stroke-linecap="round"/>';
  s += '<ellipse cx="0" cy="' + by.toFixed(1) + '" rx="' + bw.toFixed(1) + '" ry="' + (bh * (1 + (1 - e) * .06 * Math.sin(t * 2.6))).toFixed(1) + '" fill="#F08A4A" stroke="#2A1430" stroke-width="5"/><path d="M-20 ' + (by - bh * .8).toFixed(1) + ' q8 10 0 20 M0 ' + (by - bh).toFixed(1) + ' q8 10 0 22" stroke="#C8622A" stroke-width="6" fill="none" stroke-linecap="round"/>';
  s += '<g transform="translate(' + hx.toFixed(1) + ' ' + hy.toFixed(1) + ')"><path d="M-24 -12 L-20 -40 L-4 -22 M24 -12 L20 -40 L4 -22" fill="#F08A4A" stroke="#2A1430" stroke-width="5" stroke-linejoin="round"/><circle r="27" fill="#F08A4A" stroke="#2A1430" stroke-width="5"/>';
  if (e < .5) s += '<path d="M-15 -2 q6 5 12 0 M3 -2 q6 5 12 0" stroke="#2A1430" stroke-width="4" fill="none" stroke-linecap="round"/>';
  else s += '<ellipse cx="-10" cy="-3" rx="6" ry="' + (jmp > 0 && jmp < 1 ? 9 : 7) + '" fill="#2A1430"/><ellipse cx="10" cy="-3" rx="6" ry="' + (jmp > 0 && jmp < 1 ? 9 : 7) + '" fill="#2A1430"/>';
  s += '<path d="M-4 9 l4 4 l4 -4" stroke="#2A1430" stroke-width="3" fill="none"/><path d="M-30 8 h-16 M30 8 h16" stroke="#2A1430" stroke-width="2"/></g>';
  if (e < .5 && jmp <= 0) for (let i = 0; i < 3; i++) { const c = (t * .5 + i / 3) % 1; s += '<text x="' + (hx + 24 + c * 40).toFixed(1) + '" y="' + (hy - 30 - c * 70).toFixed(1) + '" font-size="' + (22 + 12 * c).toFixed(0) + '" font-weight="900" fill="#F4F6FB" opacity="' + (1 - c).toFixed(2) + '" font-family="Inter Display">z</text>'; }
  if (sw > 0) for (let i = 0; i < 3; i++) { const c = (t * 1.2 + i / 3) % 1; s += '<path d="M' + (hx - 34 + i * 34) + ' ' + (hy - 44 + c * 60).toFixed(1) + ' q-11 18 0 24 q11 -6 0 -24" fill="#7FD3FF" stroke="#2A1430" stroke-width="2" opacity="' + (cl(sw) * (1 - c)).toFixed(2) + '"/>'; }
  return s + '</g>'; }

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
WORLD.p28hook = function (sc, ev, t, lt) { const H = hookP28(ev, t); let s = base28(t) + shadow28('weich', 1) + palmS28(), h = '';
  // "berechnet": drei Strahlen von der Sonne zu Schaltis Schattenrand
  if (ev.sp !== undefined && ev.frage === undefined) { const k = cl(ev.sp / .5); for (let i = 0; i < 3; i++) s += ray28(SUN28, [H.x - 40 - i * 70, 1580 + i * 50], '#FFE9A8', k * 1.6 - i * .25, 5, .9); }
  let cj = 0, cs = 0; if (ev.gib !== undefined) { const pass = (catP28()[0] - 170) / (1300 - 170), k = cl(ev.gib / 1.3), k0 = .35 + .65 * pass; const tj = (k - k0) * 1.3 / .5; cj = tj > 0 && tj < 1 ? tj : 0; cs = tj > 0 ? 1 : 0; } if (ev.puh !== undefined) cs = 1 - cl((ev.puh - .6) / .6);
  s += cat28(t, cs, 0, cj);
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
  P.forEach((q, k) => { const c = cell28(q.i, q.j), e = cl((n - k) / 1.5), on = e > 0, z = on ? back(e) : 1; s += '<rect x="' + (c[0] - (cw / 2 - 1) * z).toFixed(1) + '" y="' + (c[1] - (ch / 2 - 1) * z).toFixed(1) + '" width="' + ((cw - 2) * z).toFixed(1) + '" height="' + ((ch - 2) * z).toFixed(1) + '" rx="3" fill="' + (on ? q.c : '#F4F6FB') + '" opacity="' + ((on ? 1 : .08) * op).toFixed(2) + '"' + (k === hi ? ' stroke="#FFE14D" stroke-width="4"' : '') + '/>' + (on && e < 1 ? '<rect x="' + (c[0] - cw / 2).toFixed(1) + '" y="' + (c[1] - ch / 2).toFixed(1) + '" width="' + cw.toFixed(1) + '" height="' + ch.toFixed(1) + '" fill="#fff" opacity="' + (.7 * (1 - e)).toFixed(2) + '"/>' : ''); });
  return s; }
WORLD.p28strahl = function (sc, ev, t, lt) { const ec = ev.echt, ni = ev.nie, ru = ev.rueck, fa = ev.farbe; let s = base28(t) + shadow28('weich', 1) + palmS28(), h = '';
  s += cat28(t, 0, 0, 0); const crown = pj28(PALM28.C[0] - 1.2, PALM28.C[1] + .3, PALM28.C[2]);
  // Satz 1: ein Lichtteilchen von der Sonne zur Palme, prallt ab, landet im Auge
  if (ec !== undefined && ni === undefined) { const k = cl((ec - .4) / 2.4); s += path28([SUN28, crown, EYE28], '#FFE9A8', k, 7, 1); if (k >= 1) s += ring28(EYE28, ec - 2.8, '#FFE9A8') + '<circle cx="' + EYE28[0] + '" cy="' + EYE28[1] + '" r="' + (30 + 6 * Math.sin(t * 12)).toFixed(1) + '" fill="#FFF3C9" opacity=".35"/>'; }
  // Satz 2: viele Strahlen prallen in alle Richtungen ab, fast keiner trifft das Auge
  if (ni !== undefined && ru === undefined) { const k = cl(ni / 1.4); for (let i = 0; i < 26; i++) { const g = [80 + rnd(i + 300) * 900, 1330 + rnd(i + 340) * 250], a = -Math.PI * (.1 + .8 * rnd(i + 380)), b = [g[0] + 700 * Math.cos(a), g[1] + 700 * Math.sin(a)], hit = i === 7;
      s += path28([SUN28, g, hit ? EYE28 : b], hit ? '#FFE9A8' : '#FFD27A', k * 1.25 - rnd(i + 420) * .25, hit ? 6 : 4, hit ? 1 : .55); }
    h += ''; }
  // Satz 3 und 4: Kamera schickt Strahlen rueckwaerts durch jedes Bildpunkt-Feld, das Gitter fuellt sich mit dem Bild
  const ck = ru !== undefined ? 1 : 0, fly = ru !== undefined ? ease(cl(ru / 1)) : 0, cpos = [lerp(-140, CAM28[0], fly), lerp(700, CAM28[1], fly) + 6 * Math.sin(t * 2.4)];
  if (ru !== undefined) { const N = GC28 * GR28, P = pix28(), sp = fa === undefined ? (ru - 1) / 3 : 1, nf = cl(sp) * N, n = Math.floor(nf); let hi = -1;
    if (fa !== undefined) { const pk = P.findIndex(q => q.w === 'Palme'); hi = pk; }
    s += grid28(fa !== undefined ? N + 2 : nf, hi, cl((ru - .7) / .4));
    if (ru > 1) for (let k = Math.max(0, n - 9); k < Math.min(n + 1, N); k++) { const q = P[k], c = cell28(q.i, q.j), e = tgt28(q.i, q.j); s += ray28(CAM28, c, '#F4F6FB', 1, 3, .7) + ray28(c, e, q.c === '#FFF3C9' ? '#FFE14D' : '#F4F6FB', 1, 3, .5 * (1 - (n - k) / 10)); }
    if (fa !== undefined) { const q = P[hi], c = cell28(q.i, q.j), e = tgt28(q.i, q.j), k = cl(fa / .8); s += path28([CAM28, c, e], '#FFE14D', k, 7, 1) + (k >= 1 ? ring28(e, fa - .8, '#FFE14D') + '<circle cx="' + e[0].toFixed(1) + '" cy="' + e[1].toFixed(1) + '" r="' + (16 + 6 * Math.sin(t * 10)).toFixed(1) + '" fill="none" stroke="#FFE14D" stroke-width="6"/>' : ''); } }
  s += cam28(cpos[0], cpos[1], ck, 1);
  h += slot(ev, [['echt', 'Sonne → Ding → Auge'], ['nie', 'Fast alle Strahlen verfehlen dich', 'hot'], ['rueck', 'Raytracing: rückwärts ab Kamera'], ['farbe', 'Erster Treffer = Farbe']]);
  return Wp28(s + shade3(), h + msh28(sc0P28(lt), 1537, 0, 1, 0, 0)); };
function sc0P28(lt) { return lerp(700, 220, ease(cl(lt / 1.1))); }
WMASC.p28strahl = (ev, t, lt) => { const x = sc0P28(lt), w = lt < 1.1; if (ev.rueck !== undefined) return stay3([x, 1537], 1, { r: -4, prop: ev.rueck < 1.6 ? '🕹️' : undefined });
  if (ev.echt !== undefined && ev.nie === undefined && ev.echt > 2.75 && ev.echt < 4) return stay3([x, 1537], 1, { r: -12 * Math.sin(Math.PI * cl((ev.echt - 2.75) / 1.25)), mood: 'wink' }); return stay3([x, 1537 - (w ? 10 * Math.abs(Math.sin(t * 17)) : 0)], 1, { r: w ? -8 : 2, walk: w ? 1 : 0 }); };

// ---------- Teil 2: der Schatten-Test ----------
var P1X28 = null, P2P28 = null; // P1: heller Punkt, dessen Strahl zur Sonne sichtbar an der Krone vorbeigeht. P2: Mitte des Kronenschattens. Beide werden gesucht
function p1P28() { if (P1X28) return P1X28; const pts = PALM28.tr.concat(...PALM28.fr).map(q => pj28(q[0], q[1], q[2])); let best = null;
  for (let y = 1440; y <= 1500; y += 10) for (let x = 400; x <= 830; x += 10) { if (lit28(gd28(x, y), 'hart') < 1) continue; const vx = SUN28[0] - x, vy = SUN28[1] - y; let d = 1e9;
    for (const c of pts) { const u = cl(((c[0] - x) * vx + (c[1] - y) * vy) / (vx * vx + vy * vy)); d = Math.min(d, Math.hypot(c[0] - x - u * vx, c[1] - y - u * vy)); } if (d < 45) continue; const sc = Math.hypot(x - 640, y - 1470); if (!best || sc < best[2]) best = [x, y, sc]; }
  return P1X28 = best ? [best[0], best[1]] : [640, 1470]; }
function p2P28() { if (P2P28) return P2P28; const c = catP28(); return P2P28 = [c[0] + 10, c[1] - 6]; let best = null; for (let y = 1320; y <= 1440; y += 6) for (let x = 360; x <= 760; x += 6) { const g = gd28(x, y); if (!lit28(g, 'hart')) { const d = Math.hypot(x - 720, y - 1330); if (!best || d < best[2]) best = [x, y, d]; } } return P2P28 = best ? [best[0], best[1]] : [560, 1380]; }
// wo der Strahl vom Bodenpunkt zur Sonne endet: an der Sonne oder am ersten Treffer der Palme
function sray28(p, d) { const g = gd28(p[0], p[1]), D = d || L28, h = block28(g, D); if (h < 0) return { end: SUN28, hit: 0 }; const q = [g[0] + D[0] * h, g[1] + D[1] * h, g[2] + D[2] * h]; return { end: pj28(q[0], q[1], q[2]), hit: 1 }; }
function pin28(p, col, k) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ') scale(' + e.toFixed(3) + ')"><ellipse rx="34" ry="12" fill="none" stroke="' + col + '" stroke-width="6"/><circle r="9" fill="' + col + '"/></g>'; }
function mark28(p, ok, k) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + p[0].toFixed(1) + ' ' + (p[1] - 62).toFixed(1) + ') scale(' + e.toFixed(3) + ')"><circle r="30" fill="' + (ok ? '#3DFF7A' : '#FF5A7A') + '" stroke="#0B1020" stroke-width="6"/>' + (ok ? '<path d="M-13 1 l8 9 l17 -19" stroke="#0B1020" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' : '<path d="M-11 -11 l22 22 M11 -11 l-22 22" stroke="#0B1020" stroke-width="8" stroke-linecap="round"/>') + '</g>'; }
var SW28 = [1080, 1600]; // Abtast-Linie von oben nach unten
function test28(ev, t) { const zw = ev.zweit, he = ev.hell, we = ev.weg, wc = ev.weich; let p = p1P28(), mode = 'none', scan;
  if (we !== undefined) { const k = ease(cl((we - .2) / 1)); p = [lerp(p1P28()[0], p2P28()[0], k), lerp(p1P28()[1], p2P28()[1], k)]; scan = cl((we - 1.4) / 1.6); }
  if (wc !== undefined) { p = p2P28(); scan = 1; }
  return { p: p, scan: scan }; }
WORLD.p28test = function (sc, ev, t, lt) { const zw = ev.zweit, he = ev.hell, we = ev.weg, wc = ev.weich, T = test28(ev, t); let s = base28(t), h = '';
  // Schatten: erst keiner, dann von der Abtast-Linie gemalt (hart), dann weich
  if (T.scan !== undefined && wc === undefined) { const y = lerp(HZ28 + 60, 1920, T.scan); s += shadow28('hart', 1, y); if (T.scan < 1) { for (let i = 0; i < 9; i++) { const p = [60 + i * 110, y]; if (p[1] < HZ28 + 70) continue; const r = sray28(p); s += ray28(p, r.end, r.hit ? '#FF8A9A' : '#FFE9A8', 1, 3, .55); } s += '<path d="M0 ' + y.toFixed(1) + ' H1080" stroke="' + AC28P + '" stroke-width="6" opacity=".8"/>'; } }
  if (wc !== undefined) { const k = ease(cl((wc - 1.2) / 1.2)); s += shadow28('hart', 1 - k) + shadow28('weich', k); }
  s += palmS28() + cat28(t, 0, 0, 0);
  // Strahl von der Kamera zum Treffpunkt und vom Treffpunkt zur Sonne
  const cam = [CAM28[0], CAM28[1] + 6 * Math.sin(t * 2.4)];
  if (zw !== undefined && wc === undefined) { const k1 = cl(zw / .7), r = sray28(T.p); s += ray28(cam, T.p, '#F4F6FB', k1, 4, .8) + pin28(T.p, r.hit ? '#FF5A7A' : '#FFE14D', k1);
    const k2 = we === undefined ? cl((zw - .9) / 1.2) : 1; s += ray28(T.p, r.end, r.hit ? '#FF5A7A' : '#3DFF7A', k2, 6, 1);
    if (r.hit && k2 >= 1) s += ring28(r.end, (we === undefined ? zw - 2.1 : 9), '#FF5A7A') + '<circle cx="' + r.end[0].toFixed(1) + '" cy="' + r.end[1].toFixed(1) + '" r="' + (20 + 6 * Math.sin(t * 12)).toFixed(1) + '" fill="#FF5A7A" opacity=".45"/>';
    if (he !== undefined && we === undefined) s += ring28(T.p, he, '#FFF3C9') + '<circle cx="' + T.p[0] + '" cy="' + T.p[1] + '" r="' + (60 + 20 * Math.sin(t * 6)).toFixed(1) + '" fill="#FFE9A8" opacity="' + (.35 * cl(he / .4)).toFixed(2) + '"/>' + mark28(T.p, 1, cl((he - .2) / .4));
    if (we !== undefined && T.scan > 0) s += mark28(T.p, 0, cl(T.scan / .2)); }
  // Satz 4: am Rand des Schattens zwoelf Strahlen zur Sonnenscheibe, manche frei, manche blockiert
  if (wc !== undefined) { const e = edge28(), k = cl(wc / 1.1); let n = 0; SS28.forEach((d, i) => { const r = sray28(e, d), end = r.hit ? r.end : [SUN28[0] + (i % 4 - 1.5) * 26, SUN28[1] + (Math.floor(i / 4) - 1) * 26]; if (!r.hit) n++; s += ray28(e, end, r.hit ? '#FF5A7A' : '#3DFF7A', k * 1.3 - i * .025, 3, .85); });
    s += pin28(e, '#B9F4FF', k) + chip3(e[0] + 180, e[1], n + ' von 12 frei', 34, '#0B1020', '#F4F6FB', cl((wc - .9) / .3)); }
  s += cam28(cam[0], cam[1], 1, 1);
  h += slot(ev, [['zweit', 'Zweiter Strahl: zur Sonne'], ['hell', 'Frei: die Stelle ist hell'], ['weg', 'Blockiert: Schatten', 'hot'], ['weich', 'Viele Strahlen: weicher Rand']]);
  const X = wxP28(ev, t, lt); return Wp28(s + shade3(), h + msh28(X, 1537, 0, at28(X, 1537, wc !== undefined ? 'weich' : 'hart') * (T.scan !== undefined || wc !== undefined ? 1 : 1), 0, 0)); };
// Randpunkt: zwischen Kronenschatten und Licht, auf der Hoehe von P2
var ED28 = null; function edge28() { if (ED28) return ED28; const y = 1455; let last = null; for (let x = 420; x < 1000; x += 2) { const l = lit28(gd28(x, y), 'weich'); if (l > .3 && l < .7) return ED28 = [x, y]; if (l >= .7 && !last) last = [x, y]; } return ED28 = last || [700, y]; }
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
WORLD.p28karte = function (sc, ev, t, lt) { const vi = ev.viel, tr = ev.trick, si = ev.sieht, ro = ev.rock; let s = base28(t), h = '';
  // Schatten: weich (Raytracing), beim Trick weg, dann kantig aus der Karte, zum Schluss wieder weich
  let ws = 1, ks = 0; if (tr !== undefined) ws = 1 - cl(tr / .5); if (si !== undefined) { ks = cl((si - 1.6) / .8); } if (ro !== undefined) { ks = 1 - cl((ro - .3) / .8); ws = cl((ro - .3) / .8); }
  s += shadow28('weich', ws) + shadow28('karte', ks) + palmS28(); const sun = 1 - cl(ws + ks); s += cat28(t, sun > .5 ? cl((sun - .5) / .25) : 1 - cl((.5 - sun) / .25) - (ws + ks > .99 ? 1 : 0), sun, 0);
  // Satz 1: Strahlen-Gewitter von der Kamera in die Szene und weiter zur Sonne, Rechen-Anzeige laeuft voll
  const cam0 = [CAM28[0], CAM28[1] + 6 * Math.sin(t * 2.4)];
  if (vi !== undefined && tr === undefined) { const n = Math.floor(10 + 60 * cl(vi / 2.5)); for (let i = 0; i < n; i++) { const ph = Math.floor(t * 12 + i * 7) % 97, p = [70 + rnd(ph + i * 13) * 880, 1320 + rnd(ph * 3 + i) * 240], r = sray28(p); s += ray28(cam0, p, '#F4F6FB', 1, 2, .35) + ray28(p, r.end, r.hit ? '#FF5A7A' : '#FFE9A8', 1, 2, .45); }
    s += meter28(cl(vi / 2.5), t); const hk = cl((vi - 1.2) / 1); for (let i = 0; i < 5; i++) { const c = (t * .9 + i / 5) % 1; s += '<circle cx="' + (cam0[0] + 20 * Math.sin(i * 2 + t) + c * 30).toFixed(1) + '" cy="' + (cam0[1] - 50 - c * 120).toFixed(1) + '" r="' + (14 + 26 * c).toFixed(1) + '" fill="#D8D0E8" opacity="' + (hk * .6 * (1 - c)).toFixed(2) + '"/>'; } }
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
WORLD.p28outro = function (sc, ev, t) { return Wp28(base28(t) + shadow28('weich', 1) + palmS28() + cat28(t, 0, 0, 0) + shade3(), msh28(220, 1537, 0, 1, 0, 0)); };
WMASC.p28outro = () => BIG3();

// Kamera (look3) nur auf das Bild anwenden: der Schatten-Teil (HTML mit Schalti-Kopie) enthaelt eigene SVGs
function Wp28(svg, html) { return { svg: svg, html: html || '' }; }
['p28hook', 'p28strahl', 'p28test', 'p28karte', 'p28outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => { const r = inner(sc, ev, t, lt, E); return look3(W(r.svg + warm28()), sc, t, lt, AC28P) + r.html + W(grain28(t)); }; });
