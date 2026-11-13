let WMODE = false; // true, wenn eine Grafik als Vollbild-Welt gezeichnet wird (Schalti uebernimmt dann Figuren)
// Weitere grosse Erklaer-Grafiken fuer die Physik-Serie (P002 bis P004). Flaeche 812 x 520.
// Jede Funktion bekommt (p, ev, t, E, L) und liefert [svg, html].
const lerp = (a, b, k) => a + (b - a) * k;
function lc(c1, c2, k) { k = cl(k); const h = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const a = h(c1), b = h(c2); return 'rgb(' + a.map((x, i) => Math.round(lerp(x, b[i], k))).join(',') + ')'; }
const vchip = (ev, n, x, y, txt, cls) => ev[n] === undefined || !txt ? '' : '<div class="vlab ' + (cls || '') + '" style="left:' + x + 'px;top:' + y + 'px;' + pop(cl(ev[n] / 0.35), 'left center') + '">' + esc(txt) + '</div>';
const vresB = (k, txt, style) => '<div class="vres" style="left:26px;bottom:26px;' + (style || '') + pop(cl(k / 0.35), 'left center') + '">' + esc(txt) + '</div>';
// Zeigt nur das Etikett der zuletzt erreichten Stufe
function stageChip(ev, L, order, x, y) { for (let i = order.length - 1; i >= 0; i--) { const n = order[i]; if (ev[n] !== undefined && L[n]) return vchip(ev, n, x, y, L[n], n === 'act2' || n === 'metall' || n === 'schief' || n === 'blaeh' ? 'red' : (n === 'act' ? 'hot' : '')); } return ''; }
function aidCards(p, ev, t, E) {
  let g = WMODE ? '' : '<rect x="0" y="0" width="812" height="520" fill="#0B1020" opacity="' + (.8 * E('p1', .3)) + '"/>', o = '';
  (p.cards || []).forEach((c, i) => { const e = ev['p' + (i + 1)]; if (e === undefined) return; const cur = ev['p' + (i + 2)] === undefined && ev.act === undefined;
    o += '<div class="vcard' + (cur ? ' on' : '') + '" style="left:' + (28 + i * 262) + 'px;top:' + (ev.act !== undefined ? 40 : 130) + 'px;' + pop(cl(e / 0.35)) + '"><span style="transform:translateY(' + (-12 * Math.abs(Math.sin(e * 6))) + 'px)">' + c[0] + '</span><em>' + esc(c[1]) + '</em></div>'; });
  if (ev.act !== undefined) o += '<div class="vres" style="left:50%;bottom:40px;font-size:44px;translate:-50% 0;white-space:nowrap;' + pop(cl(ev.act / 0.35)) + 'rotate:' + (-3 + 2 * Math.sin(t * 6)) + 'deg">' + esc(p.result) + '</div>';
  return [g, o];
}
function wave(x0, x1, y, amp, len, ph, col, w) { let d = ''; for (let x = x0; x <= x1; x += 4) d += (x === x0 ? 'M' : 'L') + x + ' ' + (y + amp * Math.sin((x - x0) / len * 6.283 - ph)).toFixed(1); return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 7) + '" stroke-linecap="round"/>'; }
function flames(n, x0, x1, y, t, s) { let o = ''; for (let i = 0; i < n; i++) o += '<span class="vemo" style="left:' + (x0 + (x1 - x0) * i / Math.max(1, n - 1)) + 'px;top:' + (y - 14 * Math.abs(Math.sin(t * 5 + i))) + 'px;font-size:' + (s || 54) + 'px">🔥</span>'; return o; }

// ---------- P002 Teil 1: Elektronen-Gedraenge im Draht ----------
function vDraht(p, ev, t, E, L) {
  let g = '', o = ''; const heat = ev.p2 === undefined ? 0 : ease(ev.p2 / 1.6), hot = ev.p3 === undefined ? 0 : ease(ev.p3 / 1);
  const Y0 = 250, Y1 = 400, wc = lc('#5CE1FF', '#FF7A30', heat);
  g += '<rect x="30" y="' + Y0 + '" width="752" height="' + (Y1 - Y0) + '" rx="75" fill="' + lc('#1B2748', '#3A1E1A', heat) + '" stroke="' + wc + '" stroke-width="8"/>';
  if (heat) g += '<rect x="30" y="' + Y0 + '" width="752" height="' + (Y1 - Y0) + '" rx="75" fill="none" stroke="#FF7A30" stroke-width="' + (18 + 8 * Math.sin(t * 7)) + '" opacity="' + (.25 * heat) + '"/>';
  const at = []; for (let i = 0; i < 9; i++) for (let j = 0; j < 2; j++) at.push([110 + i * 74 + (j ? 37 : 0), Y0 + 45 + j * 60]);
  at.forEach((a, k) => { const am = 1.5 + 9 * heat + 4 * hot, x = a[0] + am * Math.sin(t * 23 + k * 1.7), y = a[1] + am * Math.cos(t * 19 + k * 2.3);
    if (heat) g += '<circle cx="' + x + '" cy="' + y + '" r="' + (22 + 6 * heat) + '" fill="#FF7A30" opacity="' + (.18 * heat) + '"/>';
    g += '<circle cx="' + x + '" cy="' + y + '" r="16" fill="' + lc('#3A4A7A', '#FF9A50', heat) + '"/>'; });
  if (ev.p1 !== undefined) { const n = 26, k1 = cl(ev.p1 / 0.6); for (let i = 0; i < n; i++) { const x = 40 + ((rnd(i) * 740 + t * (150 + 60 * rnd(i + 5))) % 740), y = Y0 + 18 + rnd(i + 9) * (Y1 - Y0 - 36) + 6 * Math.sin(t * 9 + i); g += '<circle cx="' + x + '" cy="' + y + '" r="7" fill="#FFE14D" opacity="' + k1 + '"/>'; } }
  if (heat) for (let k = 0; k < 6; k++) { const n = Math.floor(t * 5 + k * 1.3), c = (t * 5 + k * 1.3) % 1, a = at[Math.floor(rnd(n + k * 31) * at.length)]; g += '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="' + (8 + 30 * c) + '" fill="none" stroke="#FFE14D" stroke-width="5" opacity="' + (1 - c) * heat + '"/>'; }
  if (hot) for (let i = 0; i < 7; i++) { const c = (t * .5 + rnd(i)) % 1, x = 80 + i * 105; g += wave(x - 1, x + 1, 0, 0, 1, 0, 'none', 0) + '<path d="M' + x + ' ' + (Y0 - 10 - c * 190) + ' q 16 -20 0 -40 q -16 -20 0 -40" fill="none" stroke="#FF9A50" stroke-width="6" stroke-linecap="round" opacity="' + (hot * (1 - c)) + '"/>'; }
  const lvl = .2 + .5 * heat + .25 * hot; g += '<rect x="742" y="28" width="30" height="170" rx="15" fill="#fff"/><rect x="749" y="' + (35 + 156 * (1 - lvl)) + '" width="16" height="' + (156 * lvl) + '" rx="8" fill="' + lc('#5CE1FF', '#FF4A3A', lvl) + '"/><circle cx="757" cy="210" r="24" fill="' + lc('#5CE1FF', '#FF4A3A', lvl) + '" stroke="#fff" stroke-width="6"/>';
  o += stageChip(ev, L, ['p1', 'p2', 'p3'], 30, 30);
  if (ev.act !== undefined) o += vresB(ev.act, p.result);
  return [g, o];
}
// ---------- P002 Teil 2: Ionen wandern im Akku ----------
function vAkku(p, ev, t, E, L) {
  let g = '', o = ''; const T1 = ev.p1 === undefined ? -1 : ev.p1, heat = ev.p2 === undefined ? 0 : ease(ev.p2 / 1.2), wl = ev.act2 !== undefined;
  const q = T1 < 0 ? .12 : Math.min(.96, .12 + T1 * .085);
  g += '<rect x="60" y="60" width="660" height="400" rx="40" fill="' + lc('#1B2748', '#3A1E1A', heat * .8 + (wl ? .2 : 0)) + '" stroke="' + lc('#5CE1FF', '#FF7A30', heat) + '" stroke-width="8"/><rect x="720" y="200" width="36" height="120" rx="12" fill="' + lc('#5CE1FF', '#FF7A30', heat) + '"/>';
  for (let i = 0; i < 6; i++) g += '<rect x="90" y="' + (90 + i * 60) + '" width="160" height="40" rx="10" fill="#3A4A7A"/>';
  for (let i = 0; i < 9; i++) g += '<line x1="530" y1="' + (95 + i * 41) + '" x2="690" y2="' + (95 + i * 41) + '" stroke="#56618A" stroke-width="10" stroke-linecap="round"/>';
  g += '<line x1="390" y1="80" x2="390" y2="440" stroke="#AEB9D6" stroke-width="5" stroke-dasharray="14 12"/>';
  for (let i = 0; i < 18; i++) {
    const thr = i / 18 * .9 + .05, s = cl((q - thr) / .07), ax = 105 + (i % 3) * 52, ay = 110 + Math.floor(i / 3) * 60, bx = 545 + (i % 3) * 52, by = 102 + Math.floor(i / 3) * 62;
    let x = lerp(ax, bx, ease(s)), y = lerp(ay, by, s) + (s > 0 && s < 1 ? Math.sin(s * 25 + i) * (12 + 22 * heat) : Math.sin(t * 4 + i) * 3);
    const mv = s > 0 && s < 1;
    if (mv && heat) g += '<circle cx="' + x + '" cy="' + y + '" r="30" fill="#FF7A30" opacity="' + (.35 * heat) + '"/>';
    g += '<circle cx="' + x + '" cy="' + y + '" r="18" fill="' + (mv ? '#FFE14D' : A) + '"/><text x="' + x + '" y="' + (y + 9) + '" text-anchor="middle" font-size="26" font-weight="900" fill="#0B1020" font-family="Inter Display">+</text>';
  }
  g += '<text x="560" y="500" text-anchor="middle" font-size="30" font-weight="900" fill="#fff" font-family="Inter Display">' + Math.round(q * 100) + ' %</text>';
  if (wl) o += flames(4, 120, 600, 0, t, 60) + '<div class="vlab red" style="left:30px;bottom:26px;' + pop(cl(ev.act2 / .35), 'left center') + '">' + esc(L.act2) + '</div>';
  else { o += stageChip(ev, L, ['p1', 'p2'], 30, 30); if (ev.act !== undefined) o += vresB(ev.act, p.result); }
  return [g, o];
}
// ---------- P002 Teil 3: zu heiss, aufgeblaeht, Erste Hilfe ----------
function vHeiss(p, ev, t, E, L) {
  let g = '', o = ''; const T = ev.panel === undefined ? 0 : ev.panel;
  if (ev.p1 !== undefined) { // Seitenansicht bleibt dunkel im Hintergrund
    const r = aidCards(p, ev, t, E); g += (WMODE ? '' : sideBulge(1, t)) + r[0]; return [g, r[1]];
  }
  if (ev.blaeh !== undefined) {
    const k = ease(ev.blaeh / 1.2); g += sideBulge(k, t);
    o += '<span class="vemo" style="left:660px;top:' + (40 - 10 * Math.abs(Math.sin(t * 6))) + 'px;font-size:100px;transform:scale(' + back(cl(ev.blaeh / .4)) + ')">⚠️</span><div class="vlab red" style="left:30px;bottom:26px;' + pop(cl((ev.blaeh - .6) / .35), 'left center') + '">' + esc(L.blaeh) + '</div>';
    return [g, o];
  }
  const warm = ev.warm === undefined ? 0 : ease(ev.warm / 1.5), lvl = .3 + .25 * cl(T / 2) + .4 * warm, red = lc('#5CE1FF', '#FF4A3A', warm);
  if (warm) g += '<rect x="196" y="36" width="208" height="448" rx="50" fill="#FF4A3A" opacity="' + (.25 + .15 * Math.sin(t * 8)) * warm + '"/>';
  g += '<rect x="210" y="50" width="180" height="420" rx="40" fill="#0B1020" stroke="' + red + '" stroke-width="10"/><path d="M300 470 L300 520" stroke="#fff" stroke-width="14"/>';
  const pct = Math.round(lerp(42, 80, Math.min(1, cl(T / 4) * .6 + warm)));
  g += '<rect x="250" y="190" width="100" height="50" rx="12" fill="none" stroke="#fff" stroke-width="6"/><rect x="350" y="205" width="10" height="20" rx="4" fill="#fff"/><rect x="258" y="198" width="' + (84 * pct / 100) + '" height="34" rx="7" fill="' + (warm > .6 ? '#FFCC00' : '#2ECC71') + '"/><text x="300" y="290" text-anchor="middle" font-size="40" font-weight="900" fill="#fff" font-family="Inter Display">' + pct + ' %</text>';
  if (warm > .6) g += '<g opacity="' + (.6 + .4 * Math.sin(t * 6)) + '"><rect x="276" y="320" width="16" height="50" rx="5" fill="#FFCC00"/><rect x="308" y="320" width="16" height="50" rx="5" fill="#FFCC00"/></g>';
  if (warm) for (let i = 0; i < 4; i++) { const c = (t * .6 + rnd(i)) % 1, x = 220 + i * 52; g += '<path d="M' + x + ' ' + (40 - c * 10) + ' q 14 -16 0 -32" fill="none" stroke="#FF9A50" stroke-width="6" stroke-linecap="round" opacity="' + warm * (1 - c) + '"/>'; }
  g += '<rect x="560" y="70" width="44" height="330" rx="22" fill="#fff"/><rect x="570" y="' + (80 + 310 * (1 - lvl)) + '" width="24" height="' + (310 * lvl) + '" rx="12" fill="' + lc('#5CE1FF', '#FF4A3A', lvl) + '"/><circle cx="582" cy="420" r="38" fill="' + lc('#5CE1FF', '#FF4A3A', lvl) + '" stroke="#fff" stroke-width="8"/>';
  if (warm) o += '<div class="vlab red" style="left:440px;top:30px;' + pop(cl((ev.warm - .8) / .35), 'left center') + '">' + esc(L.warm) + '</div>';
  return [g, o];
}
function sideBulge(k, t) { // Handy von der Seite, Rueckseite woelbt sich
  const b = 70 * k + 4 * Math.sin(t * 3) * k;
  return '<path d="M90 300 L722 300 Q738 300 738 284 L738 270 Q738 254 722 254 L 600 254 Q 406 ' + (254 - b * 2) + ' 212 254 L90 254 Q74 254 74 270 L74 284 Q74 300 90 300 Z" fill="' + lc('#3A4A7A', '#7A2E2A', k) + '" stroke="#fff" stroke-width="6"/>'
    + '<line x1="90" y1="306" x2="722" y2="306" stroke="#5CE1FF" stroke-width="8" stroke-linecap="round"/>' + (k > .4 ? '<path d="M100 306 L140 ' + (306 - 14 * k) + '" stroke="#FF5A5A" stroke-width="6"/>' : '')
    + '<text x="406" y="360" text-anchor="middle" font-size="26" font-weight="800" fill="#AEB9D6" font-family="Inter Display">Display</text><text x="140" y="236" text-anchor="middle" font-size="26" font-weight="800" fill="#AEB9D6" font-family="Inter Display">Rückseite</text>';
}

// ---------- P003: Spulen ----------
function coil(cx, cy, rx0, rx1, sq, col, w) { let s = ''; for (let r = rx0; r <= rx1; r += 26) s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + r + '" ry="' + (r * sq) + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 7) + '"/>'; return s; }
function coilDots(cx, cy, rx0, rx1, sq, t, dir, col, n) { let s = ''; let k = 0; for (let r = rx0; r <= rx1; r += 26, k++) for (let i = 0; i < (n || 3); i++) { const a = (i / (n || 3)) * 6.283 + dir * t * (2.2 - k * .15) + k; s += '<circle cx="' + (cx + Math.cos(a) * r) + '" cy="' + (cy + Math.sin(a) * r * sq) + '" r="7" fill="' + col + '"/>'; } return s; }
function fieldLines(cx, cy, top, n, t, k, sgn) { let s = ''; const br = .75 + .25 * Math.abs(Math.sin(t * 4)), col = sgn > 0 ? '#FF6A6A' : '#6AA8FF'; for (let i = 1; i <= n; i++) { const r = 40 + i * 45, h = (cy - top) * (i / n) * br; s += '<path d="M' + (cx - r) + ' ' + cy + ' C ' + (cx - r) + ' ' + (cy - h) + ' ' + (cx + r) + ' ' + (cy - h) + ' ' + (cx + r) + ' ' + cy + '" fill="none" stroke="' + col + '" stroke-width="5" stroke-dasharray="16 10" stroke-dashoffset="' + (sgn * t * 60) + '" opacity="' + k * (1 - i / (n + 2)) + '"/>'; } return s; }
function pad(cx, cy) { return '<ellipse cx="' + cx + '" cy="' + (cy + 18) + '" rx="300" ry="78" fill="#0B1020"/><ellipse cx="' + cx + '" cy="' + cy + '" rx="300" ry="78" fill="#26335E" stroke="#56618A" stroke-width="6"/>'; }
function vSpule(p, ev, t, E, L) {
  let g = '', o = ''; const cx = 406, cy = 400, sgn = Math.sin(t * 4) >= 0 ? 1 : -1;
  g += pad(cx, cy) + coil(cx, cy, 50, 232, .26, '#E08A3C', 9);
  if (ev.p1 !== undefined) { g += coilDots(cx, cy, 50, 232, .26, t, sgn, '#FFE14D', 3); o += '<div class="vlab" style="left:620px;top:280px;font-size:30px">' + (sgn > 0 ? '⟳' : '⟲') + ' ' + esc(L.dir || 'Richtung') + '</div>'; }
  if (ev.p2 !== undefined) { g += fieldLines(cx, cy - 10, 30, 5, t, cl(ev.p2 / .6), sgn); o += '<span class="vemo" style="left:' + (cx - 40) + 'px;top:' + (150 - 10 * Math.sin(t * 4)) + 'px;font-size:80px;transform:rotate(' + (sgn > 0 ? 0 : 180) + 'deg)">🧲</span>'; }
  o += stageChip(ev, L, ['p1', 'p2'], 30, 30);
  if (ev.act !== undefined) o += vresB(ev.act, p.result);
  return [g, o];
}
function phoneSlab(cx, cy, col) { return '<ellipse cx="' + cx + '" cy="' + (cy + 14) + '" rx="210" ry="56" fill="#0B1020" opacity=".7"/><rect x="' + (cx - 210) + '" y="' + (cy - 56) + '" width="420" height="112" rx="56" fill="' + (col || '#3A4A7A') + '" stroke="#fff" stroke-width="6"/>'; }
function vInduktion(p, ev, t, E, L) {
  let g = '', o = ''; const cx = 406, cy = 430, sgn = Math.sin(t * 4) >= 0 ? 1 : -1;
  const down = ev.p1 === undefined ? 0 : ease(ev.p1 / .8), lift = ev.act2 === undefined ? 0 : ease(ev.act2 / .8);
  const py = lerp(WMODE ? 60 : -120, 250, down) - 170 * lift, fk = down * (1 - lift);
  g += pad(cx, cy) + coil(cx, cy, 50, 206, .26, '#E08A3C', 8) + coilDots(cx, cy, 50, 206, .26, t, sgn, '#FFE14D', 3);
  g += fieldLines(cx, cy - 8, Math.max(60, py - 80), 4, t, .35 + .65 * fk, sgn);
  g += '<g opacity="' + (WMODE ? cl(down * 3) : 1) + '">' + phoneSlab(cx, py) + coil(cx, py, 40, 144, .26, '#E08A3C', 6) + '</g>';
  if (ev.p2 !== undefined && fk > .5) g += coilDots(cx, py, 40, 144, .26, t, -sgn, '#FFE14D', 2);
  const q = ev.p3 === undefined ? .3 : Math.min(1, .3 + (ev.act2 === undefined ? ev.p3 : 2) * .12);
  if (down > .9) { g += '<rect x="660" y="' + (py - 34) + '" width="100" height="56" rx="12" fill="#0B1020" stroke="#fff" stroke-width="5"/><rect x="668" y="' + (py - 26) + '" width="' + (84 * q) + '" height="40" rx="7" fill="#2ECC71"/>'; if (ev.p3 !== undefined && !lift) o += '<span class="vemo" style="left:690px;top:' + (py - 100 - 8 * Math.abs(Math.sin(t * 6))) + 'px;font-size:54px">⚡</span>'; }
  if (lift) o += '<div class="vlab red" style="left:30px;bottom:26px;' + pop(cl(ev.act2 / .35), 'left center') + '">' + esc(L.act2) + '</div>';
  else { o += stageChip(ev, L, ['p1', 'p2', 'p3'], 30, 30); if (ev.act !== undefined) o += vresB(ev.act, p.result, 'top:26px;bottom:auto;left:auto;right:26px;'); }
  return [g, o];
}
function vQiFehler(p, ev, t, E, L) {
  let g = '', o = ''; const cx = 406, cy = 270;
  if (ev.p1 !== undefined) { const r = aidCards(p, ev, t, E); g += (WMODE ? '' : topPad(cx, cy, 0, t)) + r[0]; return [g, r[1]]; }
  const met = ev.metall !== undefined, sk = ev.schief === undefined ? 0 : ease(ev.schief / .7), off = met ? 0 : 230 * sk;
  g += topPad(cx, cy, 1, t);
  g += '<rect x="' + (cx - 120 + off) + '" y="' + (cy - 230) + '" width="240" height="460" rx="44" fill="#3A4A7A" stroke="#fff" stroke-width="7" opacity=".93"/>' + [40, 66, 92].map(r => '<circle cx="' + (cx + off) + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#E08A3C" stroke-width="6"/>').join('');
  if (sk && !met) { g += '<path d="M' + (cx + 60) + ' ' + (cy - 60) + ' l120 120 m0 -120 l-120 120" stroke="#FF5A5A" stroke-width="18" stroke-linecap="round" opacity="' + cl((ev.schief - .6) * 4) + '"/>'; o += '<div class="vlab red" style="left:30px;top:30px;' + pop(cl((ev.schief - .5) / .35), 'left center') + '">' + esc(L.schief) + '</div>'; }
  if (met) { const k = ease(ev.metall / .6); g += '<rect x="' + (cx - 150) + '" y="' + (cy - 70 + 300 * (1 - k)) + '" width="300" height="140" rx="18" fill="url(#mt)" stroke="#fff" stroke-width="5"/><defs><linearGradient id="mt" x1="0" x2="1"><stop offset="0" stop-color="#8A93A8"/><stop offset=".5" stop-color="#E6EAF4"/><stop offset="1" stop-color="#8A93A8"/></linearGradient></defs>';
    if (k > .9) for (let i = 0; i < 5; i++) { const c = (t * 3 + i * .37) % 1; o += '<span class="vemo" style="left:' + (cx - 160 + rnd(i + Math.floor(t * 3)) * 300) + 'px;top:' + (cy - 100 - 30 * c) + 'px;font-size:44px;opacity:' + (1 - c) + '">⚡</span>'; }
    o += '<div class="vlab red" style="left:30px;top:30px;' + pop(cl((ev.metall - .5) / .35), 'left center') + '">' + esc(L.metall) + '</div>'; }
  return [g, o];
}
function topPad(cx, cy, k, t) { return '<circle cx="' + cx + '" cy="' + cy + '" r="170" fill="#26335E" stroke="#56618A" stroke-width="6"/>' + [50, 80, 110, 140].map((r, i) => '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#E08A3C" stroke-width="7" opacity="' + (.6 + .4 * Math.abs(Math.sin(t * 4 + i))) + '"/>').join(''); }

// ---------- P004: Licht und Himmel ----------
const RB = ['#FF3B3B', '#FF8A2A', '#FFD93B', '#3BD96B', '#3BB8FF', '#3B5BFF', '#8A4BFF'];
function sun(x, y, r, t, col) { let s = ''; for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + t * .4; s += '<line x1="' + (x + Math.cos(a) * (r + 10)) + '" y1="' + (y + Math.sin(a) * (r + 10)) + '" x2="' + (x + Math.cos(a) * (r + 30 + 6 * Math.sin(t * 5 + i))) + '" y2="' + (y + Math.sin(a) * (r + 30 + 6 * Math.sin(t * 5 + i))) + '" stroke="' + (col || '#FFD93B') + '" stroke-width="7" stroke-linecap="round"/>'; } return s + '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (col || '#FFD93B') + '"/>'; }
function vLicht(p, ev, t, E, L) {
  let g = '', o = ''; const sp = ev.p1 === undefined ? 0 : ease(ev.p1 / .8);
  g += sun(90, 140, 46, t);
  g += '<polygon points="150,148 ' + lerp(150, 330, 1) + ',' + (148) + ' 330,160 150,160" fill="#fff" opacity=".95"/>';
  g += '<polygon points="330,60 400,230 260,230" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>';
  if (sp) RB.forEach((c, i) => { const y2 = 70 + i * 26 + 4 * Math.sin(t * 3 + i); g += '<polygon points="345,155 345,165 ' + lerp(345, 790, sp) + ',' + (lerp(160, y2 + 22, sp)) + ' ' + lerp(345, 790, sp) + ',' + lerp(160, y2, sp) + '" fill="' + c + '" opacity=".95"/>'; });
  if (ev.p2 !== undefined) { const k = cl(ev.p2 / .6); g += '<g opacity="' + k + '">' + wave(220, 790, 340, 34, 230, t * 6, '#FF3B3B', 9) + '<circle cx="760" cy="' + (340 + 34 * Math.sin((760 - 220) / 230 * 6.283 - t * 6)) + '" r="14" fill="#fff" stroke="#FF3B3B" stroke-width="6"/>' + '</g>'; o += '<div class="vlab" style="left:30px;top:316px;background:#FF3B3B;color:#fff;' + pop(k) + '">' + esc(L.p2) + '</div>'; }
  if (ev.p3 !== undefined) { const k = cl(ev.p3 / .6); g += '<g opacity="' + k + '">' + wave(220, 790, 450, 30, 58, t * 23.8, '#3B8BFF', 9) + '<circle cx="760" cy="' + (450 + 30 * Math.sin((760 - 220) / 58 * 6.283 - t * 23.8)) + '" r="14" fill="#fff" stroke="#3B8BFF" stroke-width="6"/>' + '</g>'; o += '<div class="vlab" style="left:30px;top:426px;background:#3B8BFF;color:#fff;' + pop(k) + '">' + esc(L.p3) + '</div>'; }
  o += vchip(ev, 'p1', 30, 30, L.p1);
  if (ev.act !== undefined) o += '<div class="vres" style="right:26px;top:26px;' + pop(cl(ev.act / .35), 'right center') + '">' + esc(p.result) + '</div>';
  return [g, o];
}
function photonPath(i, kind, bounce) { // Punkte eines Lichtteilchens: von der Sonne gerade, beim Stoss im Zickzack
  const sx = 80, sy = 70, ang = .55 + .5 * rnd(i + 3), len = 900; const pts = [[sx, sy]];
  if (!bounce) { pts.push([sx + Math.cos(ang) * len, sy + Math.sin(ang) * len]); return pts; }
  const b = .18 + .3 * rnd(i + 7); let x = sx + Math.cos(ang) * len * b, y = sy + Math.sin(ang) * len * b; pts.push([x, y]);
  for (let k = 0; k < 4; k++) { x = 40 + rnd(i * 5 + k) * 730; y = 40 + rnd(i * 7 + k + 2) * 440; pts.push([x, y]); }
  return pts;
}
function along(pts, s) { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; } let r = s * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i]) { const k = r / L[i]; return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)]; } r -= L[i]; } return pts[pts.length - 1]; }
function vStreuung(p, ev, t, E, L) {
  let g = '', o = ''; const sky = ev.p3 === undefined ? 0 : ease(ev.p3 / 1.5), on = ev.p1 !== undefined, strong = ev.p2 !== undefined;
  g += '<rect x="0" y="0" width="812" height="520" fill="' + lc('#131C38', '#3B8BFF', sky * .75) + '"/>' + sun(80, 70, 40, t);
  for (let i = 0; i < 34; i++) g += '<circle cx="' + (60 + rnd(i + 90) * 720) + '" cy="' + (90 + rnd(i + 120) * 400) + '" r="5" fill="#AEB9D6" opacity=".7"/>';
  if (on) for (let i = 0; i < 26; i++) {
    const blue = i % 2 === 0, col = blue ? '#3B8BFF' : RB[i % 3], bounce = blue ? (strong || i % 4 === 0) : (!strong && i % 6 === 1);
    const pts = photonPath(i, blue, bounce), s = (t * (bounce ? .16 : .32) + rnd(i + 40)) % 1, a = along(pts, s), b = along(pts, Math.max(0, s - (bounce ? .025 : .05)));
    g += '<line x1="' + b[0] + '" y1="' + b[1] + '" x2="' + a[0] + '" y2="' + a[1] + '" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/><circle cx="' + a[0] + '" cy="' + a[1] + '" r="9" fill="' + (blue ? '#BFE0FF' : '#fff') + '"/>';
  }
  if (ev.act !== undefined) { const k = cl(ev.act / .4); for (let i = 0; i < 7; i++) { const a = Math.PI * (1.08 + .84 * i / 6), r = 170 + 10 * Math.sin(t * 5 + i); g += '<line x1="' + (406 + Math.cos(a) * r) + '" y1="' + (470 + Math.sin(a) * r) + '" x2="' + (406 + Math.cos(a) * 60) + '" y2="' + (470 + Math.sin(a) * 60) + '" stroke="#3B8BFF" stroke-width="9" stroke-linecap="round" opacity="' + k + '"/>'; } if (!WMODE) o += '<span class="vemo" style="left:366px;top:420px;font-size:80px;' + pop(k) + '">😎</span>'; }
  if (ev.mit !== undefined && ev.p3 === undefined) g += lupe(ev, t);
  o += stageChip(ev, L, ['p1', 'mit', 'p2', 'p3'], 30, 30);
  if (ev.act !== undefined) o += '<div class="vres" style="right:26px;top:26px;' + pop(cl(ev.act / .35), 'right center') + '">' + esc(p.result) + '</div>';
  return [g, o];
}
function lupe(ev, t) { // vergroessertes Luftteilchen: Rot laesst es langsam, Blau schnell schwingen
  const k = ease(cl(ev.mit / .5)), blue = ev.p2 !== undefined, col = blue ? '#3B8BFF' : '#FF3B3B', w = blue ? 23.8 : 6, len = blue ? 58 : 230, amp = blue ? 26 : 10;
  const X = 560, Y = 300; let s = '<g opacity="' + k + '"><rect x="300" y="150" width="490" height="340" rx="30" fill="#0B1020" stroke="#fff" stroke-width="6"/>';
  s += wave(320, X - 60, Y, 22, len, t * w, col, 7);
  const dy = amp * Math.sin(t * w); s += '<circle cx="' + X + '" cy="' + Y + '" r="46" fill="#26335E" stroke="#AEB9D6" stroke-width="5"/><circle cx="' + X + '" cy="' + (Y + dy) + '" r="16" fill="#FFE14D"/>';
  for (let i = 0; i < 4; i++) { const c = ((t * (blue ? 2.2 : .8)) + i / 4) % 1; s += '<circle cx="' + X + '" cy="' + Y + '" r="' + (56 + c * 160) + '" fill="none" stroke="' + col + '" stroke-width="' + (blue ? 8 : 4) + '" opacity="' + (blue ? 1 : .45) * (1 - c) + '"/>'; }
  return s + '<text x="330" y="470" font-size="26" font-weight="800" fill="#AEB9D6" font-family="Inter Display">Luftteilchen, stark vergrößert</text></g>';
}
function vAbend(p, ev, t, E, L) {
  let g = '', o = ''; const tief = ev.tief === undefined ? 0 : ease(ev.tief / 1.4), weg = ev.weg !== undefined, bl = ev.blau === undefined ? 0 : ease(ev.blau / 1.5), rot = Math.max(bl, ev.act !== undefined ? 1 : 0);
  const top = lc('#3B8BFF', '#2A1C5A', rot), bot = lc('#8FC8FF', '#FF7A30', rot);
  g += '<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bot + '"/></linearGradient></defs><rect x="0" y="0" width="812" height="520" fill="url(#sk)"/>';
  const EX = 406, EY = 1180, R = 800, AR = 920;
  g += '<circle cx="' + EX + '" cy="' + EY + '" r="' + AR + '" fill="#fff" opacity=".12"/><circle cx="' + EX + '" cy="' + EY + '" r="' + R + '" fill="#1F7A4A" stroke="#2ECC71" stroke-width="6"/>';
  const sunP = [lerp(406, 790, tief), lerp(40, 330, tief)], ox = 406, oy = EY - R;
  g = g.replace('opacity=".12"', 'opacity=".2"');
  const vx = sunP[0] - ox, vy = sunP[1] - oy, fx = ox - EX, fy = oy - EY, qa = vx * vx + vy * vy, qb = 2 * (fx * vx + fy * vy), qc = fx * fx + fy * fy - AR * AR, sI = (-qb + Math.sqrt(qb * qb - 4 * qa * qc)) / (2 * qa);
  const ax = ox + vx * Math.min(1, sI), ay = oy + vy * Math.min(1, sI), beam = lc('#FFFFFF', '#FF5A2A', rot);
  g += '<line x1="' + sunP[0] + '" y1="' + sunP[1] + '" x2="' + ax + '" y2="' + ay + '" stroke="#fff" stroke-width="8" opacity=".7"/><line x1="' + ax + '" y1="' + ay + '" x2="' + ox + '" y2="' + oy + '" stroke="' + beam + '" stroke-width="' + (weg ? 16 + 3 * Math.sin(t * 6) : 12) + '" stroke-linecap="round"/>';
  if (bl) for (let i = 0; i < 16; i++) { const s = (t * .5 + rnd(i)) % 1, k = rnd(i + 3) * .9, bx = lerp(ax, ox, k), by = lerp(ay, oy, k), a = rnd(i + 8) * 6.283; g += '<circle cx="' + (bx + Math.cos(a) * 160 * s) + '" cy="' + (by + Math.sin(a) * 160 * s) + '" r="8" fill="#3B8BFF" opacity="' + bl * (1 - s) + '"/>'; }
  g += sun(sunP[0], sunP[1], 34, t, lc('#FFD93B', '#FF7A30', rot));
  if (!WMODE) g += '<circle cx="' + ox + '" cy="' + (oy - 14) + '" r="14" fill="#fff"/><rect x="' + (ox - 8) + '" y="' + oy + '" width="16" height="10" fill="#fff"/>';
  if (weg) o += '<div class="vlab" style="left:' + Math.min(560, (ax + ox) / 2 - 60) + 'px;top:' + ((ay + oy) / 2 - 80) + 'px;' + pop(cl(ev.weg / .35)) + '">' + esc(L.weg) + '</div>';
  if (ev.act2 !== undefined) { const k = ease(ev.act2 / .6); [[180, 140], [560, 110]].forEach((c, i) => { g += '<g opacity="' + k + '" transform="translate(' + (c[0] + 10 * Math.sin(t + i)) + ' ' + c[1] + ')"><circle cx="0" cy="0" r="40" fill="#fff"/><circle cx="45" cy="-15" r="50" fill="#fff"/><circle cx="95" cy="5" r="38" fill="#fff"/><rect x="0" y="0" width="95" height="40" fill="#fff"/></g>'; }); o += '<div class="vlab" style="left:30px;bottom:26px;' + pop(cl(ev.act2 / .35), 'left center') + '">' + esc(L.act2) + '</div>'; }
  else { o += ev.tief === undefined ? '<div class="vlab" style="left:30px;top:30px">' + esc(L.mittag || 'Mittags: kurzer Weg') + '</div>' : stageChip(ev, L, ['tief', 'blau'], 30, 30); if (ev.act !== undefined) o += vresB(ev.act, p.result); }
  return [g, o];
}
const VIZ = { draht: vDraht, akku: vAkku, heiss: vHeiss, spule: vSpule, induktion: vInduktion, qifehler: vQiFehler, licht: vLicht, streuung: vStreuung, abend: vAbend };
