// I026 "Wie laedt ein Spiel ganze Staedte?" (GTA-6-Spezial, Informatik) im Skript 4 (17.11.2026). Design-Kennung 3.3.
// Ort: Strasse in einer Stadt bei Nacht. Die Stadt besteht aus Kacheln: geladene Kacheln sind gebaut (Haus, Gehweg, Laterne),
// nicht geladene sind schwarzes Gitter ohne Boden. Schalti laeuft durch die Stadt, vorne wird gebaut, hinten zerfaellt sie ins Gitter.
// Einstieg: Schalti rennt schneller, als die Stadt laedt, faellt ins Gitter und taucht am Start wieder auf (Respawn).
// Wissenschaftsmodus (fuse33 aus viz_v33.js): Teil 1 Groessenvergleich 212 GB zu 16 GB, Teil 2 Drahtgitter-Haus, Teil 3 Karte von oben mit Blickfeld.
// Zum Loeschen: diese Datei und videos/I026.
var T26 = 180, GY26 = 1548, AC26 = '#7C5CFF';
function b26(i) { const c = Math.floor(rnd(i * 3 + 11) * 4), w = Math.floor(rnd(i * 5 + 21) * 4);
  return { h: 240 + 260 * rnd(i * 7 + 3), w: 132 + 34 * rnd(i * 5 + 1), col: ['#2A1E6A', '#1E2A6A', '#3A1E5A', '#24245E'][c], edge: ['#4A38A8', '#3A4AA8', '#6A389A', '#44449A'][c], win: ['#FFD27A', '#5CE1FF', '#FF6BD6', '#B9A6FF'][w], lamp: i % 2 === 0 }; }
// Ladezustand einer Kachel: P Spielerposition (Welt), F Ladefront vorne, RB Ladebereich hinten
function ld26(i, P, F, RB) { const xc = (i + .5) * T26; return cl((F - xc) / 140) * cl((xc - (P - RB)) / 140); }
// Himmel und ferne Skyline (immer da). far: Faktor fuer ein hervorgehobenes fernes Haus
function sky26(t) { let s = '<defs><linearGradient id="k26" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05041A"/><stop offset=".5" stop-color="#150D40"/><stop offset="1" stop-color="#3A1E7A"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#k26)"/>';
  for (let i = 0; i < 36; i++) s += '<circle cx="' + (rnd(i + 1) * 1080).toFixed(0) + '" cy="' + (rnd(i + 100) * 640 + 20).toFixed(0) + '" r="' + (1 + 2 * rnd(i + 200)).toFixed(1) + '" fill="#fff" opacity="' + (.2 + .35 * Math.abs(Math.sin(t * (.4 + .3 * rnd(i + 300)) + i))).toFixed(2) + '"/>';
  s += '<circle cx="840" cy="330" r="64" fill="#FFF3C9" opacity=".9"/><circle cx="840" cy="330" r="120" fill="#FFF3C9" opacity=".06"/>';
  let x = -20, i = 0; while (x < 1100) { const w = 50 + 46 * rnd(i + 3), hh = 120 + 200 * rnd(i + 13); s += '<rect x="' + x.toFixed(0) + '" y="' + (1130 - hh).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + (hh + 30).toFixed(0) + '" fill="#1D1458"/>'; x += w + 5; i++; }
  return s + '<rect y="1080" width="1080" height="500" fill="#120A3A" opacity=".55"/>'; }
// Gitter-Leere einer nicht geladenen Kachel
function void26(x, op) { if (op <= .01) return ''; let s = '<g opacity="' + op.toFixed(3) + '"><rect x="' + x.toFixed(1) + '" y="980" width="' + (T26 + 1) + '" height="940" fill="#03020C"/>';
  for (let y = 1000; y < 1920; y += 60) s += '<path d="M' + x.toFixed(1) + ' ' + y + ' h' + T26 + '" stroke="' + AC26 + '" stroke-width="2" opacity=".35"/>';
  for (let k = 0; k <= 3; k++) s += '<path d="M' + (x + k * 60).toFixed(1) + ' 980 V1920" stroke="' + AC26 + '" stroke-width="2" opacity=".35"/>';
  return s + '</g>'; }
// Eine Kachel: Haus, Gehweg, Strasse, Laterne. k Ladezustand 0 bis 1, wire 1 = nur Umriss (nicht gezeichnet)
function tile26(i, x, k, t, wire) { if (k <= .01) return ''; const b = b26(i), bx = x + (T26 - b.w) / 2, top = GY26 - b.h, f = ease(cl((k - .35) / .65)), o = cl(k / .35);
  let s = '<g opacity="' + o.toFixed(3) + '">';
  s += '<rect x="' + x.toFixed(1) + '" y="' + GY26 + '" width="' + (T26 + 1) + '" height="78" fill="#1A1450"/><rect x="' + x.toFixed(1) + '" y="' + (GY26 + 78) + '" width="' + (T26 + 1) + '" height="300" fill="#0E0B2E"/><path d="M' + (x + 30).toFixed(1) + ' 1770 h80" stroke="#FFD27A" stroke-width="8" opacity=".55"/><path d="M' + x.toFixed(1) + ' ' + GY26 + ' h' + (T26 + 1) + '" stroke="#9B84FF" stroke-width="6"/>';
  if (wire < 1) { const hf = b.h * f * (1 - wire); if (hf > 1) { s += '<clipPath id="tc' + i + '"><rect x="' + (bx - 4).toFixed(1) + '" y="' + (GY26 - hf).toFixed(1) + '" width="' + (b.w + 8).toFixed(1) + '" height="' + hf.toFixed(1) + '"/></clipPath><g clip-path="url(#tc' + i + ')"><rect x="' + bx.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + b.w.toFixed(1) + '" height="' + b.h.toFixed(1) + '" fill="' + b.col + '" stroke="' + b.edge + '" stroke-width="4"/>';
    for (let r = 0; r < Math.floor((b.h - 40) / 48); r++) for (let c = 0; c < 3; c++) { const q = rnd(i * 31 + r * 7 + c * 3); if (q > .35) s += '<rect x="' + (bx + 16 + c * (b.w - 32) / 3).toFixed(1) + '" y="' + (top + 26 + r * 48).toFixed(1) + '" width="' + ((b.w - 32) / 3 - 12).toFixed(1) + '" height="26" rx="3" fill="' + b.win + '" opacity="' + (.5 + .3 * Math.sin(t * (.3 + .2 * q) + r + c)).toFixed(2) + '"/>'; }
    s += '<rect x="' + (bx + b.w / 2 - 24).toFixed(1) + '" y="' + (GY26 - 70) + '" width="48" height="70" fill="#0A0726" stroke="' + b.edge + '" stroke-width="3"/></g>'; } }
  if (k < 1 || wire > 0) s += '<rect x="' + bx.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + b.w.toFixed(1) + '" height="' + b.h.toFixed(1) + '" fill="none" stroke="#B9A6FF" stroke-width="4" stroke-dasharray="14 10" opacity="' + (wire > 0 ? .85 * wire : .9 * (1 - f)).toFixed(3) + '"/>';
  if (b.lamp && wire < 1) s += '<path d="M' + (x + T26 - 10).toFixed(1) + ' ' + GY26 + ' V' + (GY26 - 230) + ' h-34" stroke="#3A2E8A" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="' + (x + T26 - 46).toFixed(1) + '" cy="' + (GY26 - 226) + '" rx="20" ry="9" fill="#FFE9A8" opacity="' + (f * (1 - wire)).toFixed(2) + '"/><path d="M' + (x + T26 - 66).toFixed(1) + ' ' + (GY26 - 220) + ' L' + (x + T26 - 100).toFixed(1) + ' ' + GY26 + ' H' + (x + T26 + 8).toFixed(1) + ' L' + (x + T26 - 26).toFixed(1) + ' ' + (GY26 - 220) + ' Z" fill="#FFE9A8" opacity="' + (.07 * f * (1 - wire)).toFixed(3) + '"/>';
  return s + '</g>'; }
// Die Strasse: cam = Weltposition am linken Bildrand. o: P, F, RB, wireLeft (Bildschirm-x, links davon nur Umriss), wk (Staerke Umriss)
function street26(t, cam, o) { o = o || {}; const P = o.P === undefined ? cam + 220 : o.P, F = o.F === undefined ? P + 680 : o.F, RB = o.RB === undefined ? 300 : o.RB;
  let s = sky26(t); const i0 = Math.floor(cam / T26) - 1, i1 = i0 + Math.ceil(1080 / T26) + 2;
  for (let i = i0; i <= i1; i++) { const x = i * T26 - cam, k = ld26(i, P, F, RB); s += void26(x, 1 - k); }
  for (let i = i0; i <= i1; i++) { const x = i * T26 - cam, k = ld26(i, P, F, RB), w = o.wireLeft !== undefined && x + T26 / 2 < o.wireLeft ? (o.wk === undefined ? 1 : o.wk) : 0; s += tile26(i, x, k, t, w); }
  return s; }
// Wo der Boden endet (Bildschirm-x), fuer den Sturz im Einstieg
function edge26(cam, P, F) { return F - cam - 70; }

// ---------- Einstieg ----------
// Zeiten: geh = Schalti geht los (Themenfrage), sprint = rennt los (Gib mir 60 Sekunden), respawn = taucht am Start wieder auf (Nachsatz)
function hk26(ev) { const g = ev.geh, sp = ev.sprint, V = 150;
  const walkT = g === undefined ? 0 : sp === undefined ? g : g - sp, cam = V * Math.max(0, walkT), P = cam + 220;
  return { cam, P, F: P + 470 }; }
WORLD.i26hook = function (sc, ev, t, lt) { const H = hk26(ev); let s = street26(t, H.cam, { P: H.P, F: H.F, RB: 120 });
  if (ev.respawn !== undefined) { const r = ev.respawn, k = cl(r / .45); if (k < 1) s += '<circle cx="220" cy="1440" r="' + (40 + 260 * k).toFixed(0) + '" fill="none" stroke="#3DFF7A" stroke-width="' + (16 * (1 - k)).toFixed(1) + '" opacity="' + (1 - k).toFixed(2) + '"/><rect x="150" y="1180" width="140" height="380" rx="60" fill="#3DFF7A" opacity="' + (.35 * (1 - k)).toFixed(2) + '"/>'; }
  return W(s + shade3()); };
WMASC.i26hook = (ev, t, lt, sc) => { const H = hk26(ev);
  if (ev.respawn !== undefined) return { f: [220, 1537], s: 1, r: 6 * Math.sin(t * 7) * (1 - cl(ev.respawn / 1.2)), nospin: 1, mood: 'shock' };
  if (ev.sprint !== undefined) { const q = ev.sprint, ex = edge26(H.cam, H.P, H.F), x = 220 + 1150 * q, run = Math.abs(Math.sin(t * 19));
    if (x < ex) return { f: [x, 1537 - 14 * run], s: 1, r: 10, nospin: 1 };
    const q0 = (ex - 220) / 1150, d = q - q0; return { f: [ex + 600 * d, 1537 + 3200 * d * d], s: 1, r: 10 + 260 * d, nospin: 1, mood: 'shock' }; }
  if (ev.geh !== undefined) return { f: [220, 1537], s: 1, r: 2, nospin: 1, walk: 1 };
  return { f: HOME3, s: 1, r: 2 * Math.sin(t * 3), nospin: 1 }; };

// ---------- Teil 1: Nur die Gegend um dich ----------
function bars26(ev, t) { const g = ev.gb, r = ev.ram; if (g === undefined) return ''; const X = 110, L = 760, w = L * ease(cl((g - .2) / 1.1)), wr = L * 16 / 212;
  let s = svgT(X, 760, 'Spiel', 46, '#F4F6FB', 'start') + '<rect x="' + X + '" y="790" width="' + L + '" height="110" rx="20" fill="#0B1020" stroke="#B9A6FF" stroke-width="5"/>'
    + '<rect x="' + X + '" y="790" width="' + w.toFixed(1) + '" height="110" rx="20" fill="' + AC26 + '"/>' + (w > 420 ? svgT(X + 30, 864, 'bis zu 212 GB', 54, '#fff', 'start') : '');
  if (r !== undefined) { const k = ease(cl(r / .5)); s += '<g opacity="' + k.toFixed(3) + '">' + svgT(X, 990, 'Arbeitsspeicher der PS5', 46, '#F4F6FB', 'start') + '<rect x="' + X + '" y="1020" width="' + wr.toFixed(1) + '" height="90" rx="12" fill="#3DFF7A" stroke="#0B1020" stroke-width="5"/>' + svgT(X + wr + 26, 1083, '16 GB', 54, '#3DFF7A', 'start') + '</g>' + okx1(800, 1065, 46, false, (r - 1.1) / .3); }
  return s; }
WORLD.i26kachel = function (sc, ev, t, lt) { const a = ev.act, cam = a === undefined ? 0 : 150 * a;
  let bg = street26(t, cam, { RB: 200, F: cam + 220 + 560 }), s = fuse33(bg, sc, t), h = '';
  const m = lab33(sc, t); if (m > .01) s += '<g opacity="' + m.toFixed(3) + '">' + bars26(ev, t) + '</g>';
  if (ev.um !== undefined) { const k = cl((ev.um - .3) / .4) * (1 - m); if (k > 0) s += chip3(370, 900, 'geladen', 44, '#3DFF7A', '#0B1020', k) + chip3(780, 900, 'nicht geladen', 34, '#2C3350', '#F4F6FB', k * cl((ev.um - .9) / .3)) + '<circle cx="220" cy="1500" r="' + (560 + 20 * Math.sin(t * 2)).toFixed(0) + '" fill="none" stroke="#3DFF7A" stroke-width="6" stroke-dasharray="18 14" opacity="' + (.6 * k).toFixed(2) + '"/>'; }
  h += slot(ev, [['gb', 'Spiel: bis zu 212 GB'], ['ram', 'Arbeitsspeicher: 16 GB', 'hot'], ['um', 'Geladen wird nur die Gegend um dich'], ['act', 'Vorne Neues rein, hinten Altes raus', 'hot']]);
  return W(s + shade3(), h); };
WMASC.i26kachel = (ev, t) => ev.act === undefined ? BIG3() : { f: [220, 1537], s: 1, nospin: 1, walk: 1 };

// ---------- Teil 2: Fernes wird grob gezeichnet ----------
// Haus als Drahtgitter. d 0 grob (wenige Dreiecke), 1 fein (viele Dreiecke). cx, cy Mitte unten, s Groesse
function mesh26(cx, cy, s, d, op) { const W0 = 360 * s, H0 = 300 * s, R0 = 150 * s, x0 = cx - W0 / 2, x1 = cx + W0 / 2, y0 = cy - H0, y1 = cy, rp = cy - H0 - R0;
  let g = '<g opacity="' + (op === undefined ? 1 : op) + '"><path d="M' + x0 + ' ' + y1 + ' H' + x1 + ' V' + y0 + ' H' + x0 + ' Z" fill="' + AC26 + '" opacity=".25"/><path d="M' + x0 + ' ' + y0 + ' L' + cx + ' ' + rp + ' L' + x1 + ' ' + y0 + ' Z" fill="#FF6BD6" opacity=".25"/>';
  const ln = (a, b, c, e, w, o2) => '<path d="M' + a.toFixed(1) + ' ' + b.toFixed(1) + ' L' + c.toFixed(1) + ' ' + e.toFixed(1) + '" stroke="#F4F6FB" stroke-width="' + w + '" opacity="' + o2 + '" stroke-linecap="round"/>';
  // grob: Rechteck aus zwei Dreiecken, Dach ein Dreieck
  g += ln(x0, y1, x1, y1, 6, 1) + ln(x1, y1, x1, y0, 6, 1) + ln(x1, y0, x0, y0, 6, 1) + ln(x0, y0, x0, y1, 6, 1) + ln(x0, y1, x1, y0, 5, 1) + ln(x0, y0, cx, rp, 6, 1) + ln(cx, rp, x1, y0, 6, 1);
  if (d > 0) { const n = 6, o2 = cl(d).toFixed(3);
    for (let i = 1; i < n; i++) { const xi = lerp(x0, x1, i / n), yi = lerp(y1, y0, i / n); g += ln(xi, y1, xi, y0, 3, o2) + ln(x0, yi, x1, yi, 3, o2); }
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) g += ln(lerp(x0, x1, i / n), lerp(y1, y0, j / n), lerp(x0, x1, (i + 1) / n), lerp(y1, y0, (j + 1) / n), 2.5, o2);
    for (let i = 1; i < 4; i++) { const k = i / 4; g += ln(lerp(x0, cx, k), lerp(y0, rp, k), lerp(x1, cx, k), lerp(y0, rp, k), 3, o2) + ln(lerp(x0, x1, k), y0, cx, rp, 3, o2); }
    g += '<g opacity="' + o2 + '">'; for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) g += '<rect x="' + (x0 + W0 * (.12 + c * .3)).toFixed(1) + '" y="' + (y0 + H0 * (.14 + r * .4)).toFixed(1) + '" width="' + (W0 * .16).toFixed(1) + '" height="' + (H0 * .22).toFixed(1) + '" fill="#FFD27A" opacity=".8"/>'; g += '</g>'; }
  return g + '</g>'; }
// kleines gerendertes Haus (gefuellt, ohne Drahtgitter): so sieht es von weitem aus
function farh26(cx, cy, s) { const W0 = 360 * s, H0 = 300 * s, R0 = 150 * s, x0 = cx - W0 / 2; return '<rect x="' + x0 + '" y="' + (cy - H0) + '" width="' + W0 + '" height="' + H0 + '" fill="#6A58C8" stroke="#0B1020" stroke-width="3"/><path d="M' + x0 + ' ' + (cy - H0) + ' L' + cx + ' ' + (cy - H0 - R0) + ' L' + (x0 + W0) + ' ' + (cy - H0) + ' Z" fill="#C24FA8" stroke="#0B1020" stroke-width="3"/>'; }
WORLD.i26lod = function (sc, ev, t, lt) { const bg = street26(t, 0, { RB: 260 }); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t), fe = ev.fein, a = ev.act;
  if (ev.grob !== undefined && ev.drei === undefined) { const k = cl((ev.grob - .3) / .4) * (1 - m); s += '<g opacity="' + k.toFixed(3) + '"><circle cx="760" cy="1060" r="80" fill="none" stroke="#FFE14D" stroke-width="7"/>' + farh26(760, 1110, .3) + '</g>' + chip3(760, 920, 'weit weg', 42, '#FFE14D', '#0B1020', k); }
  if (ev.grob !== undefined && ev.drei === undefined && m < .99) s += farh26(760, 1110, .3);
  if (m > .01) { const d = fe === undefined ? 0 : ease(cl(fe / 1.1)); s += '<g opacity="' + m.toFixed(3) + '">' + mesh26(540, 1110, .78, d, 1) + '</g>'; }
  if (a !== undefined && m < .99) { const k = cl((a - .2) / .4) * (1 - m); s += '<g opacity="' + k.toFixed(3) + '">' + farh26(600, 1100, .3) + farh26(840, 1100, .3) + svgT(720, 1060, '=', 80, '#F4F6FB') + '</g>' + chip3(600, 910, 'grob', 34, '#FFE14D', '#0B1020', k) + chip3(840, 910, 'fein', 34, '#3DFF7A', '#0B1020', k); }
  h += slot(ev, [['grob', 'Weit weg: grob gezeichnet'], ['drei', 'Wenige Dreiecke'], ['fein', 'Näher dran: viele Dreiecke', 'hot'], ['act', 'Von weitem siehst du keinen Unterschied']]);
  return W(s + shade3(), h); };
WMASC.i26lod = (ev, t) => { if (ev.grob !== undefined && ev.drei === undefined) { const k = ease(cl(ev.grob / .6)); return { f: [220 + 40 * k, 1537], s: 1, r: -6 * k, nospin: 1 }; } return BIG3(); };

// ---------- Teil 3: Was du nicht siehst, wird nicht gezeichnet ----------
function map26(ev, t) { const v = ev.verdeckt, PX = 540, PY = 1110, half = 26 * Math.PI / 180;
  const blocks = []; for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) blocks.push([220 + c * 160, 720 + r * 120]);
  const inCone = (x, y) => { const a = Math.atan2(x - PX, PY - y); return Math.abs(a) < half; };
  let s = '<path d="M' + PX + ' ' + PY + ' L' + (PX - Math.tan(half) * 440).toFixed(1) + ' ' + (PY - 440) + ' L' + (PX + Math.tan(half) * 440).toFixed(1) + ' ' + (PY - 440) + ' Z" fill="#FFE14D" opacity=".18" stroke="#FFE14D" stroke-width="4"/>';
  blocks.forEach((b, i) => { const ic = inCone(b[0], b[1] + 40), hidden = v !== undefined && (i === 2 || i === 7), k = hidden ? cl(v / .4) : 0;
    if (ic && !hidden) s += '<rect x="' + (b[0] - 60) + '" y="' + b[1] + '" width="120" height="84" rx="10" fill="' + AC26 + '" stroke="#F4F6FB" stroke-width="5"/>';
    else s += '<rect x="' + (b[0] - 60) + '" y="' + b[1] + '" width="120" height="84" rx="10" fill="' + (hidden ? lc(AC26, '#0B1020', k) : 'none') + '" stroke="#8A93B8" stroke-width="4" stroke-dasharray="12 9"/>'; });
  if (v !== undefined) s += '<path d="M' + PX + ' ' + (PY - 30) + ' V1048" stroke="#FFE14D" stroke-width="7" opacity="' + cl(v / .3).toFixed(2) + '"/>' + okx1(PX, 880, 34, false, (v - .5) / .3);
  s += '<circle cx="' + PX + '" cy="' + PY + '" r="22" fill="#3DFF7A" stroke="#0B1020" stroke-width="5"/>' + svgT(PX + 40, PY + 12, 'du', 40, '#3DFF7A', 'start');
  return s; }
WORLD.i26sicht = function (sc, ev, t, lt) { const a = ev.act, si = ev.sicht, back = a === undefined ? (si === undefined ? 0 : cl((si - .6) / .5)) : 1 - cl(a / .25);
  const bg = street26(t, 0, { RB: 400, wireLeft: 380, wk: back }); let s = fuse33(bg, sc, t), h = ''; const m = lab33(sc, t);
  if (back > .01 && m < .99) s += chip3(200, 1000, 'nicht im Blick', 38, '#2C3350', '#F4F6FB', back * (1 - m)) + '<path d="M300 1330 L1080 1180 V1480 Z" fill="#FFE14D" opacity="' + (.08 * back * (1 - m)).toFixed(3) + '"/>';
  if (m > .01) s += '<g opacity="' + m.toFixed(3) + '">' + map26(ev, t) + '</g>';
  h += slot(ev, [['sicht', 'Nicht im Blick: wird nicht gezeichnet'], ['hinten', 'Hinter dir und neben dem Blickfeld'], ['verdeckt', 'Verdeckt: auch nicht', 'hot'], ['act', 'Umdrehen: sofort wieder da']]);
  return W(s + shade3(), h); };
WMASC.i26sicht = (ev, t) => { const a = ev.act; if (a === undefined) return BIG3(); return { f: [220, 1537], s: 1, nospin: 1, flip: a > .15 ? 1 : 0, r: a < .3 ? 8 * Math.sin(t * 20) : 0 }; };

// ---------- Schluss ----------
WORLD.i26outro = function (sc, ev, t) { return W(street26(t, 0, { RB: 2000, F: 3000 }) + shade3()); };
WMASC.i26outro = () => BIG3();

['i26hook', 'i26kachel', 'i26lod', 'i26sicht', 'i26outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC26); });
