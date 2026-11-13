// Vollbild-Welten (Pilot P005 GPS). Jede Welt fuellt den ganzen Bildschirm 1080 x 1920 hinter Titel, Untertitel und Maskottchen.
// Hauptgeschehen zwischen y=580 und y=1140, wichtige Inhalte links von x=940.
function W(svg, html) { return '<svg width="1080" height="1920" viewBox="0 0 1080 1920" style="position:absolute;left:0;top:0">' + svg + '</svg>' + (html || ''); }
function wlab(x, y, txt, k, cls, size) { return k <= 0 ? '' : '<div class="vlab ' + (cls || '') + '" style="left:' + x + 'px;top:' + y + 'px;font-size:' + (size || 40) + 'px;' + pop(cl(k), 'left center') + '">' + esc(txt) + '</div>'; }
function stars(t, n, op) { let s = ''; for (let i = 0; i < n; i++) s += '<circle cx="' + (rnd(i + 300) * 1080) + '" cy="' + (rnd(i + 500) * 1920) + '" r="' + (1.5 + 2.5 * rnd(i + 7)) + '" fill="#fff" opacity="' + (op * (.4 + .6 * Math.abs(Math.sin(t * (1 + rnd(i)) + i)))) + '"/>'; return s; }
function topShade(light) { if (light) return '<defs><linearGradient id="tl" x1="0" y1="0" x2="0" y2="1"><stop offset=".7" stop-color="#0B1020" stop-opacity=".94"/><stop offset="1" stop-color="#0B1020" stop-opacity="0"/></linearGradient><linearGradient id="bl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1020" stop-opacity="0"/><stop offset=".25" stop-color="#0B1020" stop-opacity=".85"/></linearGradient></defs><rect x="0" y="0" width="1080" height="590" fill="url(#tl)"/><rect x="0" y="1100" width="1080" height="820" fill="url(#bl)"/>'; return '<defs><linearGradient id="ts" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1020" stop-opacity=".95"/><stop offset="1" stop-color="#0B1020" stop-opacity="0"/></linearGradient><linearGradient id="bs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1020" stop-opacity="0"/><stop offset="1" stop-color="#0B1020" stop-opacity=".9"/></linearGradient></defs><rect x="0" y="0" width="1080" height="600" fill="url(#ts)"/><rect x="0" y="1140" width="1080" height="780" fill="url(#bs)"/>'; }
function satIcon(x, y, s, col, rot) { s = s || 1; return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')"><rect x="-46" y="-9" width="30" height="18" rx="3" fill="#3B8BFF" stroke="#BFE0FF" stroke-width="2"/><rect x="16" y="-9" width="30" height="18" rx="3" fill="#3B8BFF" stroke="#BFE0FF" stroke-width="2"/><line x1="-16" y1="0" x2="16" y2="0" stroke="#fff" stroke-width="3"/><rect x="-12" y="-14" width="24" height="28" rx="5" fill="' + (col || '#F4F6FB') + '"/><circle cx="0" cy="18" r="5" fill="' + (col || '#F4F6FB') + '"/></g>'; }
function earth(cx, cy, r, t, op) { // Erde mit wandernden Kontinenten
  let s = '<defs><clipPath id="ec' + Math.round(r) + '"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '"/></clipPath><radialGradient id="eg" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#3D9BFF"/><stop offset="1" stop-color="#123A8A"/></radialGradient></defs>';
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 1.08) + '" fill="#5CE1FF" opacity="' + (.15 * op) + '"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#eg)" opacity="' + op + '"/>';
  let c = ''; const sh = (t * r * .12) % (r * 4);
  for (let i = 0; i < 9; i++) { const bx = cx - r * 2 + ((rnd(i + 60) * r * 4 + sh) % (r * 4)), by = cy - r * .8 + rnd(i + 70) * r * 1.6, w = r * (.25 + .35 * rnd(i + 80)); c += '<ellipse cx="' + bx + '" cy="' + by + '" rx="' + w + '" ry="' + (w * .55) + '" fill="#2ECC71" opacity=".9"/><ellipse cx="' + (bx + w * .3) + '" cy="' + (by - w * .2) + '" rx="' + (w * .5) + '" ry="' + (w * .4) + '" fill="#27B864"/>'; }
  s += '<g clip-path="url(#ec' + Math.round(r) + ')" opacity="' + op + '">' + c + '<circle cx="' + (cx + r * .45) + '" cy="' + (cy + r * .2) + '" r="' + (r * 1.1) + '" fill="#0B1020" opacity=".35"/></g>';
  return s;
}
function orbitPos(cx, cy, rx, ry, ang, a) { const x = Math.cos(a) * rx, y = Math.sin(a) * ry, c = Math.cos(ang), s = Math.sin(ang); return [cx + x * c - y * s, cy + x * s + y * c, Math.sin(a)]; }

const WORLD = {};
// Einstieg: vom Standortpunkt auf der Karte raus ins All
WORLD.zoom = function (sc, ev, t, lt) {
  const CX = 540, CY = 960, k = ease(cl((lt - 1.0) / 3.2)), sp = ease(cl((lt - 3.6) / 1.4));
  let s = '<rect width="1080" height="1920" fill="' + lc('#E9EEF5', '#0B1020', cl((k - .45) / .3)) + '"/>' + stars(t, 120, cl((k - .55) / .3));
  // Karte, schrumpft auf einen Punkt der Erde zusammen
  const ms = lerp(1, .02, Math.pow(k, .55)), mo = 1 - cl((k - .55) / .2);
  if (mo > 0) { let m = '<rect x="-1500" y="-1500" width="3000" height="3000" fill="#E9EEF5"/>';
    for (let i = -14; i <= 14; i++) { m += '<rect x="' + (i * 110 - 9) + '" y="-1500" width="18" height="3000" fill="#fff"/><rect x="-1500" y="' + (i * 110 - 9) + '" width="3000" height="18" fill="#fff"/>'; }
    for (let i = 0; i < 26; i++) m += '<rect x="' + (-1400 + rnd(i + 11) * 2800) + '" y="' + (-1400 + rnd(i + 12) * 2800) + '" width="' + (60 + rnd(i) * 140) + '" height="' + (60 + rnd(i + 1) * 140) + '" rx="10" fill="' + (i % 3 ? '#CFE8C2' : '#D9DEE8') + '"/>';
    m += '<path d="M-1500 300 C -600 120, 200 520, 1500 260" stroke="#9CCBFF" stroke-width="70" fill="none"/><path d="M-200 -1500 L 120 1500" stroke="#FFD27A" stroke-width="34"/>';
    s += '<g opacity="' + mo + '" transform="translate(' + CX + ' ' + CY + ') scale(' + ms + ')">' + m + '</g>'; }
  // Standortpunkt pulsiert
  const pr = (t % 1.2) / 1.2; s += '<circle cx="' + CX + '" cy="' + CY + '" r="' + (30 + 90 * pr) + '" fill="#3B8BFF" opacity="' + (.35 * (1 - pr)) + '"/><circle cx="' + CX + '" cy="' + CY + '" r="26" fill="#3B8BFF" stroke="#fff" stroke-width="9"/>';
  // Wolken fliegen beim Rauszoomen vorbei
  const ck = cl((k - .2) / .45); if (ck > 0 && ck < 1) for (let i = 0; i < 9; i++) { const a = rnd(i + 3) * 6.283, d = 80 + 900 * ck * (0.6 + rnd(i) * .6), sz = (120 + 160 * rnd(i + 5)) * (1.4 - ck); s += '<g opacity="' + (.9 * Math.sin(Math.PI * ck)) + '" transform="translate(' + (CX + Math.cos(a) * d) + ' ' + (CY + Math.sin(a) * d) + ')"><ellipse rx="' + sz + '" ry="' + (sz * .5) + '" fill="#fff"/><ellipse cx="' + (sz * .45) + '" cy="' + (-sz * .25) + '" rx="' + (sz * .6) + '" ry="' + (sz * .45) + '" fill="#fff"/></g>'; }
  // Erde taucht auf
  const eo = cl((k - .5) / .3); if (eo > 0) { const R = lerp(900, 210, ease(cl((k - .5) / .5))); s += earth(CX, CY + R - 210 + 0, R, t, eo); s += '<circle cx="' + CX + '" cy="' + CY + '" r="14" fill="#3B8BFF" stroke="#fff" stroke-width="6"/>'; }
  // Satelliten und Funkstrahlen
  if (sp > 0) { const bahn = [[-.35, 400, 150], [.4, 420, 170], [1.2, 380, 140]];
    bahn.forEach((b, i) => { s += '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + b[1] + '" ry="' + b[2] + '" transform="rotate(' + (b[0] * 57.3) + ' ' + CX + ' ' + CY + ')" fill="none" stroke="#5CE1FF" stroke-width="3" stroke-dasharray="10 12" opacity="' + (.6 * sp) + '"/>';
      for (let j = 0; j < 2; j++) { const p = orbitPos(CX, CY, b[1], b[2], b[0], t * (.5 + i * .12) + j * 3.1 + i); if (p[2] < -.2 || true) { s += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + CX + '" y2="' + CY + '" stroke="#FFE14D" stroke-width="3" stroke-dasharray="6 10" stroke-dashoffset="' + (-t * 80) + '" opacity="' + (.7 * sp) + '"/>' + satIcon(p[0], p[1], .9 * sp, null, t * 20 + i * 40); } } });
  }
  return W(s + topShade());
};
// Teil 1: Satelliten-Schwarm um die Erde
WORLD.orbit = function (sc, ev, t, lt, E) {
  const CX = 540, CY = 860, R = 150; let s = '<rect width="1080" height="1920" fill="#070B18"/>' + stars(t, 140, 1);
  const N = 6, o = ease(cl(lt / 1.2)); let back = '', front = '';
  const hi = ev.vier !== undefined;
  for (let i = 0; i < N; i++) { const ang = (i * 30 - 75) * Math.PI / 180, rx = 400, ry = 120;
    const el = '<ellipse cx="' + CX + '" cy="' + CY + '" rx="' + rx + '" ry="' + ry + '" transform="rotate(' + (ang * 57.3) + ' ' + CX + ' ' + CY + ')" fill="none" stroke="' + RB[i % 7] + '" stroke-width="3" opacity="' + (.45 * o) + '"/>';
    back += el;
    for (let j = 0; j < 5; j++) { const a = t * .35 + j * 1.256 + i * .7, p = orbitPos(CX, CY, rx, ry, ang, a), sat = satIcon(p[0], p[1], .7 * o, null, a * 57);
      const vis = hi && p[1] < CY - 40 && Math.abs(p[0] - CX) < 330; const glow = vis ? '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="34" fill="#FFE14D" opacity="' + (.35 + .2 * Math.sin(t * 8)) + '"/><line x1="' + CX + '" y1="' + (CY - R) + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="#FFE14D" stroke-width="4" stroke-dasharray="8 8" stroke-dashoffset="' + (-t * 60) + '"/>' : '';
      if (p[2] < 0) back += glow + sat; else front += glow + sat; }
  }
  s += back + earth(CX, CY, R, t, 1) + front;
  // Hoehe 20.200 km
  if (ev.hoehe !== undefined) { const k = ease(cl(ev.hoehe / 1.4)), y1 = CY - R, y2 = y1 - 130 * k; s += '<line x1="' + (CX + 250) + '" y1="' + y1 + '" x2="' + (CX + 250) + '" y2="' + y2 + '" stroke="#fff" stroke-width="6"/><path d="M' + (CX + 235) + ' ' + (y2 + 16) + ' L' + (CX + 250) + ' ' + y2 + ' L' + (CX + 265) + ' ' + (y2 + 16) + '" stroke="#fff" stroke-width="6" fill="none"/>' + satIcon(CX + 250, y2 - 30, 1.1, '#FFE14D'); }
  const km = ev.hoehe === undefined ? 0 : Math.round(20200 * ease(cl(ev.hoehe / 1.4)) / 100) * 100;
  let h = ev.hoehe !== undefined && ev.runde === undefined ? '<div class="vlab hot" style="left:560px;top:1060px;font-size:50px;' + pop(cl(ev.hoehe / .3), 'left center') + '">' + km.toLocaleString('de-DE') + ' km</div>' : '';
  if (ev.runde !== undefined) { const k = ev.runde, hrs = Math.min(24, k * 6), a = hrs / 12 * 6.283; const p = orbitPos(CX, CY, 400, 120, -15 * Math.PI / 180, a - 1.2);
    s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="40" fill="none" stroke="#FFE14D" stroke-width="6"/>' + satIcon(p[0], p[1], 1.2, '#FFE14D');
    s += '<g transform="translate(860 1040)"><circle r="70" fill="#fff"/><text y="52" text-anchor="middle" font-size="26" font-weight="900" fill="#0B1020" font-family="Inter Display">' + Math.floor(hrs) + ' h</text><line x1="0" y1="0" x2="' + (Math.sin(hrs / 12 * 6.283) * 50) + '" y2="' + (-Math.cos(hrs / 12 * 6.283) * 50) + '" stroke="#0B1020" stroke-width="8" stroke-linecap="round"/><circle r="8" fill="#0B1020"/></g>';
    h += '<div class="vlab hot" style="left:60px;top:610px;font-size:42px">Runde ' + Math.min(2, Math.floor(hrs / 12) + 1) + ' von 2</div>'; }
  if (hi) { h = wlab(60, 610, 'Mindestens 4 in Sicht', cl(ev.vier / .35), 'hot', 42); s += '<circle cx="' + CX + '" cy="' + (CY - R) + '" r="14" fill="#FF5A5A" stroke="#fff" stroke-width="5"/>'; }
  if (ev.act !== undefined) { const k = cl(ev.act / .35); h = wlab(60, 610, '⚛️ Atomuhren an Bord', k, 'hot', 42); for (let i = 0; i < 4; i++) { const a = t * .35 + i * 1.5, p = orbitPos(CX, CY, 400, 120, (i * 30 - 75) * Math.PI / 180, a); h += '<span class="vemo" style="left:' + (p[0] - 30) + 'px;top:' + (p[1] - 90 - 8 * Math.abs(Math.sin(t * 6 + i))) + 'px;font-size:56px;' + pop(k) + '">⏱️</span>'; } }
  return W(s + topShade(), h);
};
// Teil 2: Signal mit Lichtgeschwindigkeit, Stoppuhr, Rechnung
WORLD.signal = function (sc, ev, t, lt) {
  const SX = 420, SY = 660, PX = 420, PY = 1060; let s = '<defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070B18"/><stop offset=".55" stop-color="#14306E"/><stop offset="1" stop-color="#3D7BD9"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sg)"/>' + stars(t, 60, .8);
  s += '<path d="M0 1120 Q 540 1060 1080 1120 L1080 1920 L0 1920 Z" fill="#1F7A4A"/>';
  s += satIcon(SX, SY, 2.2, null, 8 * Math.sin(t * 2));
  // Handy
  s += '<rect x="' + (PX - 50) + '" y="' + (PY - 90) + '" width="100" height="180" rx="18" fill="#0B1020" stroke="#fff" stroke-width="6"/><circle cx="' + PX + '" cy="' + (PY - 20) + '" r="14" fill="#3B8BFF"/>';
  let h = '';
  if (ev.panel !== undefined) { // Datenpaket: Position und Zeit
    const k = cl(ev.panel / .4); h += '<div class="vlab" style="left:' + (SX + 110) + 'px;top:' + (SY - 60) + 'px;font-size:36px;' + pop(k, 'left center') + '">📍 Position + 🕒 Uhrzeit</div>'; }
  const T = ev.p1 === undefined ? -1 : ev.p1;
  if (T >= 0) { for (let i = 0; i < 5; i++) { const c = ((T * .8) + i / 5) % 1, y = SY + 70 + (PY - 160 - SY) * c; s += '<path d="M' + (SX - 120 * (.4 + c)) + ' ' + y + ' Q ' + SX + ' ' + (y + 50 + 30 * c) + ' ' + (SX + 120 * (.4 + c)) + ' ' + y + '" fill="none" stroke="#FFE14D" stroke-width="' + (8 - 4 * c) + '" opacity="' + (1 - c * .6) + '"/>'; }
    for (let i = 0; i < 8; i++) { const c = ((T * 1.6) + i / 8) % 1; s += '<line x1="' + (SX + 160 + i * 3) + '" y1="' + (SY + 80 + 300 * c) + '" x2="' + (SX + 160 + i * 3) + '" y2="' + (SY + 130 + 300 * c) + '" stroke="#fff" stroke-width="4" opacity="' + (.5 * (1 - c)) + '"/>'; }
    if (ev.p2 === undefined) h += wlab(540, 800, '300.000 km/s', cl(T / .35), 'hot', 52) + '<span class="vemo" style="left:600px;top:880px;font-size:90px">⚡</span>'; }
  if (ev.p2 !== undefined) { const k = cl(ev.p2 / 1.6), sec = (0.0673 * ease(k)).toFixed(3).replace('.', ','), a = k * 6.283 * 3;
    s += '<g transform="translate(760 830)"><circle r="120" fill="#fff" stroke="#FF5A5A" stroke-width="12"/><rect x="-18" y="-152" width="36" height="34" rx="6" fill="#FF5A5A"/>';
    for (let i = 0; i < 12; i++) s += '<line x1="' + (Math.sin(i * .5236) * 92) + '" y1="' + (-Math.cos(i * .5236) * 92) + '" x2="' + (Math.sin(i * .5236) * 106) + '" y2="' + (-Math.cos(i * .5236) * 106) + '" stroke="#0B1020" stroke-width="6"/>';
    s += '<text y="62" text-anchor="middle" font-size="38" font-weight="900" fill="#0B1020" font-family="Inter Display">' + sec + ' s</text><line x1="0" y1="0" x2="' + (Math.sin(a) * 86) + '" y2="' + (-Math.cos(a) * 86) + '" stroke="#FF5A5A" stroke-width="8" stroke-linecap="round"/><circle r="10" fill="#0B1020"/></g>'; }
  if (ev.p3 !== undefined) { const k = cl(ev.p3 / .4); h = '<div class="vres" style="left:60px;top:600px;font-size:44px;' + pop(k, 'left center') + '">0,067 s × 300.000 km/s<br>= 20.200 km Abstand</div>';
    s += '<line x1="' + (SX - 150) + '" y1="' + (SY + 40) + '" x2="' + (PX - 150) + '" y2="' + (PY - 80) + '" stroke="#5CE1FF" stroke-width="8" stroke-dasharray="' + (k * 400) + ' 400"/>'; }
  if (ev.act !== undefined) { const k = ease(cl(ev.act / 1)), off = 380 * k;
    s += '<rect x="0" y="560" width="1080" height="600" fill="#0B1020" opacity="' + (.75 * cl(ev.act / .3)) + '"/>';
    s += '<line x1="140" y1="900" x2="' + (140 + off + 120) + '" y2="900" stroke="#FF5A5A" stroke-width="10" stroke-dasharray="20 14"/><circle cx="140" cy="900" r="22" fill="#3B8BFF" stroke="#fff" stroke-width="7"/>';
    h = '<span class="vemo" style="left:' + (220 + off) + 'px;top:820px;font-size:110px;transform:rotate(' + (10 * Math.sin(t * 9)) + 'deg)">📍</span><div class="vres" style="left:60px;top:640px;font-size:46px;background:#FF5A5A;color:#fff;' + pop(cl(ev.act / .35), 'left center') + '">0,001 s Fehler = 300 km</div>'; }
  return W(s + topShade(), h);
};
// Teil 3: Kreise auf der Karte schneiden sich
WORLD.kreise = function (sc, ev, t, lt) {
  const P = [520, 880]; let s = '<rect width="1080" height="1920" fill="#E9EEF5"/>';
  for (let i = -2; i <= 12; i++) s += '<rect x="' + (i * 120 - 8) + '" y="0" width="16" height="1920" fill="#fff"/><rect x="0" y="' + (i * 160 - 8) + '" width="1080" height="16" fill="#fff"/>';
  for (let i = 0; i < 20; i++) s += '<rect x="' + (rnd(i + 31) * 1000) + '" y="' + (300 + rnd(i + 32) * 1200) + '" width="' + (70 + rnd(i) * 120) + '" height="' + (60 + rnd(i + 1) * 100) + '" rx="10" fill="' + (i % 3 ? '#CFE8C2' : '#D9DEE8') + '"/>';
  s += '<path d="M-50 1180 C 300 1080, 700 1260, 1130 1120" stroke="#9CCBFF" stroke-width="60" fill="none"/>';
  const C = [[140, 640], [960, 700], [600, 1180], [200, 1140]], cols = ['#FF5A5A', '#3B8BFF', '#2ECC71', '#B05CFF'], names = ['k1', 'k2', 'k3', 'act'];
  const uhr = ev.act !== undefined, wob = uhr ? 70 * Math.sin(t * 4) * (1 - ease(cl((ev.act - 1.2) / 1.2))) : 0; let h = '';
  C.forEach((c, i) => { const e = ev[names[i]]; if (e === undefined) return; const r = Math.hypot(c[0] - P[0], c[1] - P[1]) + (i < 3 ? wob : 0), k = ease(cl(e / .9));
    s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + r + '" fill="' + cols[i] + '" fill-opacity=".07" stroke="' + cols[i] + '" stroke-width="9" pathLength="1" stroke-dasharray="' + k + ' 1"/>';
    s += '<line x1="' + c[0] + '" y1="' + c[1] + '" x2="' + (c[0] + (P[0] - c[0]) * k) + '" y2="' + (c[1] + (P[1] - c[1]) * k) + '" stroke="' + cols[i] + '" stroke-width="4" stroke-dasharray="10 8" opacity=".7"/>' + satIcon(c[0], c[1], 1.1, cols[i]); });
  if (ev.k1 !== undefined && ev.k2 === undefined) for (let i = 0; i < 5; i++) { const a = t * .6 + i * 1.256, r = Math.hypot(C[0][0] - P[0], C[0][1] - P[1]), x = C[0][0] + Math.cos(a) * r, y = C[0][1] + Math.sin(a) * r; if (y > 560 && y < 1140 && x < 1000) h += '<span class="vemo" style="left:' + (x - 26) + 'px;top:' + (y - 60) + 'px;font-size:60px">❓</span>'; }
  if (ev.k2 !== undefined && ev.k3 === undefined) { const Q = [[P[0], P[1]], [662, 1016]]; Q.forEach(q => { const b = .5 + .5 * Math.sin(t * 9); s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="' + (18 + 10 * b) + '" fill="#FFCC00" stroke="#0B1020" stroke-width="5"/>'; }); }
  if (ev.k3 !== undefined && !uhr) { const k = cl(ev.k3 / .9); if (k >= 1) { const c = (t % 1) ; s += '<circle cx="' + P[0] + '" cy="' + P[1] + '" r="' + (20 + 80 * c) + '" fill="none" stroke="#0B1020" stroke-width="6" opacity="' + (1 - c) + '"/>'; h += '<span class="vemo" style="left:' + (P[0] - 50) + 'px;top:' + (P[1] - 110 - 20 * Math.max(0, 1 - (ev.k3 - .9) * 4)) + 'px;font-size:100px">📍</span>'; } }
  const stg = uhr ? (ev.act > 2.4 ? ['Vier Satelliten: genau ✓', 'hot'] : ['Handy-Uhr ungenau', 'red']) : ev.k3 !== undefined ? ['3 Kreise: 1 Punkt', 'hot'] : ev.k2 !== undefined ? ['2 Kreise: 2 Punkte', ''] : ev.k1 !== undefined ? ['1 Kreis: irgendwo hier', ''] : null;
  if (stg) h += '<div class="vlab ' + stg[1] + '" style="left:60px;top:600px;font-size:46px">' + esc(stg[0]) + '</div>';
  if (uhr) { h += '<span class="vemo" style="left:820px;top:600px;font-size:100px;transform:rotate(' + (ev.act > 2.4 ? 0 : 25 * Math.sin(t * 14)) + 'deg)">⏰</span>'; if (ev.act > 2.4) h += '<span class="vemo" style="left:' + (P[0] - 50) + 'px;top:' + (P[1] - 110) + 'px;font-size:100px">📍</span>'; }
  return W(s + topShade(true), h);
};
// Teil 4: Einstein, zwei Uhren, wandernder Pin
WORLD.einstein = function (sc, ev, t, lt) {
  let s = '<rect width="1080" height="1920" fill="#070B18"/>' + stars(t, 80, .9) + '<rect x="0" y="880" width="1080" height="1040" fill="#14306E"/><path d="M0 920 Q 540 860 1080 920 L1080 1920 L0 1920 Z" fill="#1F7A4A"/>';
  // Raumzeit-Gitter: unten stark gekruemmt, oben flach
  if (ev.grav !== undefined) { const k = cl(ev.grav / .8); for (let j = 0; j < 7; j++) { const y = 600 + j * 50, bend = Math.pow(j / 6, 2) * 120 * k; s += '<path d="M40 ' + y + ' Q 540 ' + (y + bend) + ' 1040 ' + y + '" stroke="#5CE1FF" stroke-width="3" fill="none" opacity="' + (.5 * k) + '"/>'; }
    for (let i = 0; i < 9; i++) { const x = 60 + i * 120; s += '<line x1="' + x + '" y1="600" x2="' + (x + (540 - x) * .15 * k) + '" y2="' + (900 + 40 * k) + '" stroke="#5CE1FF" stroke-width="3" opacity="' + (.4 * k) + '"/>'; } }
  const fast = ev.act === undefined || ev.act < 1.5 ? 1.0 : 0.0; // nach Korrektur gleich schnell
  const clock = (x, y, sp, col, lbl) => { const a = t * sp; return '<g transform="translate(' + x + ' ' + y + ')"><circle r="90" fill="#fff" stroke="' + col + '" stroke-width="10"/><line x1="0" y1="0" x2="' + (Math.sin(a) * 70) + '" y2="' + (-Math.cos(a) * 70) + '" stroke="' + col + '" stroke-width="8" stroke-linecap="round"/><line x1="0" y1="0" x2="' + (Math.sin(a / 12) * 45) + '" y2="' + (-Math.cos(a / 12) * 45) + '" stroke="#0B1020" stroke-width="10" stroke-linecap="round"/><circle r="9" fill="#0B1020"/><text y="130" text-anchor="middle" font-size="32" font-weight="900" fill="#fff" font-family="Inter Display">' + lbl + '</text></g>'; };
  s += satIcon(150, 660, 1.4) + clock(370, 690, 3 + 3.2 * fast, '#FFE14D', 'Satellit') + clock(370, 1030, 3, '#5CE1FF', 'Erde') + '<rect x="130" y="980" width="70" height="120" rx="14" fill="#0B1020" stroke="#fff" stroke-width="5"/>';
  let h = '';
  if (ev.panel !== undefined && ev.p2 === undefined) h += wlab(500, 650, 'Oben: Zeit läuft schneller', cl(ev.panel / .35), 'hot', 36);
  if (ev.grav !== undefined && ev.p2 === undefined) h = wlab(500, 650, 'Weniger Schwerkraft', cl(ev.grav / .35), 'hot', 36) + wlab(500, 990, 'Mehr Schwerkraft', cl((ev.grav - .4) / .35), '', 36);
  if (ev.p2 !== undefined && ev.drift === undefined) { const k = cl(ev.p2 / 2); h = '<div class="vres" style="left:500px;top:640px;font-size:46px;' + pop(cl(ev.p2 / .35), 'left center') + '">+0,0000' + Math.round(39 * k).toString().padStart(2, '0') + ' s<br><span style="font-size:30px">pro Tag</span></div><span class="vemo" style="left:600px;top:860px;font-size:90px;' + pop(cl((ev.p2 - .3) / .35)) + '">🧠</span>'; }
  if (ev.drift !== undefined) { const k = ev.act === undefined ? cl(ev.drift / 3.5) : 1, back = ev.act === undefined ? 0 : ease(cl((ev.act - 1.5) / .8)), days = Math.max(1, Math.round(k * 3)), off = 600 * k * (1 - back);
    s += '<rect x="0" y="560" width="1080" height="600" fill="#E9EEF5"/>'; for (let i = 0; i < 10; i++) s += '<rect x="' + (i * 120 - 8) + '" y="560" width="16" height="600" fill="#fff"/>' + (i < 5 ? '<rect x="0" y="' + (560 + i * 120) + '" width="1080" height="16" fill="#fff"/>' : '');
    s += '<circle cx="180" cy="900" r="26" fill="#3B8BFF" stroke="#fff" stroke-width="8"/><line x1="180" y1="900" x2="' + (180 + off) + '" y2="900" stroke="#FF5A5A" stroke-width="10" stroke-dasharray="22 14"/>';
    h = '<span class="vemo" style="left:' + (130 + off) + 'px;top:780px;font-size:110px">📍</span>' + (back < 1 ? '<div class="vres" style="left:60px;top:600px;font-size:46px;background:#FF5A5A;color:#fff">Tag ' + days + ': ' + (days * 11) + ' km daneben</div>' : '<div class="vres" style="left:60px;top:600px;font-size:46px">Korrigiert ✓</div>');
    if (ev.act !== undefined && back < 1) h += '<span class="vemo" style="left:760px;top:600px;font-size:100px;transform:rotate(' + (-40 * Math.sin(ev.act * 6)) + 'deg)">🔧</span>'; }
  return W(s + topShade(), h);
};

WORLD.outro = function (sc, ev, t, lt) {
  const CX = 540, CY = 1070, R = 110; let s = '<rect width="1080" height="1920" fill="#070B18"/>' + stars(t, 120, 1), back = '', front = '';
  for (let i = 0; i < 4; i++) { const ang = (i * 45 - 60) * Math.PI / 180; back += '<ellipse cx="' + CX + '" cy="' + CY + '" rx="320" ry="90" transform="rotate(' + (ang * 57.3) + ' ' + CX + ' ' + CY + ')" fill="none" stroke="' + RB[i] + '" stroke-width="3" opacity=".35"/>';
    for (let j = 0; j < 3; j++) { const p = orbitPos(CX, CY, 320, 90, ang, t * .4 + j * 2.1 + i), sat = satIcon(p[0], p[1], .6, null, t * 30); if (p[2] < 0) back += sat; else front += sat; } }
  return W(s + back + earth(CX, CY, R, t, .9) + front + topShade());
};

// ---------- Schalti spielt mit (Pilot P005) ----------
// Jede Funktion liefert die Fusspunkte (fx, fy), Groesse s, Drehung r, Spiegeln, Requisite und ob er gerade laeuft.
const go = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const WMASC = {};
WMASC.zoom = (ev, t, lt) => { const k = ease(cl((lt - 1.0) / 3.2)), sp = ease(cl((lt - 3.6) / 1.4));
  if (k <= 0) return { f: [300, 1070], s: .8 };
  return { f: go([300, 1070], [540, 752], ease(cl((k - .1) / .9))), s: lerp(.8, .42, k), r: k < 1 ? 360 * k : 0, prop: sp > .3 ? '🔭' : '' };
};
WMASC.orbit = (ev, t) => { const CX = 540, CY = 860, sh = [636, 748];
  if (ev.vier !== undefined && ev.act === undefined) return { f: sh, s: .42, prop: '🔭' };
  if (ev.act !== undefined) return { f: sh, s: .42 };
  if (ev.runde !== undefined) { const hrs = Math.min(24, ev.runde * 6), a = hrs / 12 * 6.283, p = orbitPos(CX, CY, 400, 120, -15 * Math.PI / 180, a - 1.2); const k = ease(cl(ev.runde / .6)); return { f: go([745, 600], [p[0], p[1] - 14], k), s: .34, r: 15 * Math.sin(t * 3) }; }
  if (ev.hoehe !== undefined) { const k = ease(cl(ev.hoehe / 1.4)); return { f: [745, 712 - 80 * k], s: .32, walk: k < 1 }; }
  return { f: sh, s: .42 };
};
WMASC.signal = (ev, t) => {
  if (ev.act !== undefined) { const off = 380 * ease(cl(ev.act / 1)); return { f: [130 + off * .85, 1085], s: .5, walk: ev.act < 1.1 }; }
  if (ev.p3 !== undefined) return { f: [620, 1112], s: .58, prop: '👈' };
  if (ev.p2 !== undefined) { const k = ease(cl(ev.p2 / .6)); return { f: go([580, 1112], [770, 1112], k), s: .55, walk: k < 1 }; }
  if (ev.p1 !== undefined) return { f: [590 + 10 * Math.sin(t * 25), 1112], s: .6, r: -8 + 4 * Math.sin(t * 20) };
  return { f: [580, 1112], s: .6 };
};
WMASC.kreise = (ev, t) => { const P = [520, 880], C0 = [140, 640], r = Math.hypot(C0[0] - P[0], C0[1] - P[1]), done = [640, 940];
  if (ev.act !== undefined) { if (ev.act > 2.4) return { f: done, s: .45 }; const k = ease(cl(ev.act / .6)); return { f: go(done, [870, 830], k), s: .45, r: 6 * Math.sin(t * 14), walk: k < 1 }; }
  if (ev.k3 !== undefined) return { f: done, s: .45, prop: ev.k3 > .9 ? '🚩' : '' };
  if (ev.k2 !== undefined) { const Q = [[P[0] + 40, P[1] + 30], [700, 1040]], n = Math.floor(ev.k2 / .9) % 2, c = (ev.k2 % .9) / .9, hop = c > .7 ? ease((c - .7) / .3) : 0; return { f: go(Q[n], Q[1 - n], hop), s: .4, walk: hop > 0 }; }
  if (ev.k1 !== undefined) { const a = 0.3 + 0.4 * (0.5 - 0.5 * Math.cos(ev.k1 * 0.9)); return { f: [C0[0] + Math.cos(a) * r, C0[1] + Math.sin(a) * r + 4], s: .4, walk: true }; }
  return { f: [200, 1110], s: .6 };
};
WMASC.einstein = (ev, t) => { const home = [875, 1125];
  if (ev.act !== undefined) { const back = ease(cl((ev.act - 1.5) / .8)); return back >= 1 ? { f: [340, 1070], s: .5 } : { f: [850, 840], s: .48, r: -10 * Math.sin(ev.act * 6) }; }
  if (ev.drift !== undefined) { const k = cl(ev.drift / 3.5), off = 600 * k; return { f: [90 + off * .85, 1070], s: .48, walk: true }; }
  if (ev.p2 !== undefined) return { f: home, s: .5 };
  if (ev.grav !== undefined) { const k = ease(cl(ev.grav / 1.2)); return { f: go(home, [880, 830], k), s: .46, r: 20 * Math.sin(t * 1.5) * k }; }
  return { f: home, s: .5 };
};
