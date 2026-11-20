// P022H "Warum klingt deine Stimme auf Aufnahmen so fremd?" (Physik, HOOK-TEST, Basis Skript 4, Kostuem P1 Professor), stumme Demo v1 (20.11.2026).
// Test auf Benedikts Wunsch: Hook ab dem ersten Bild, Open Loop, Rehooks statt "Erstens", Mitmach-Teil, keine Zusammenfassung, Loop-Ende.
// Ort (eigens gebaut): Jugendzimmer am Abend. Schalti dreht gerade ein Video: Handy auf Stativ mit Ringlicht, die Aufnahme laeuft schon im ersten Bild.
// Teil 1 Lupe auf einen Kopf im Schnitt (Luftweg und Knochenweg), Teil 2 Equalizer auf dem Handy und Lupe aufs Mikrofon, Teil 3 Ohren zu und langes I.
// Kein Wissenschaftsmodus: alles laesst sich im Zimmer mit Schalti zeigen. Zum Loeschen: diese Datei und videos/P022H.
var AC22 = '#5CE1FF', OR22 = '#FF9A3C', ST22 = '#0B1020', GY22 = 1545, PX22 = 640, PY22 = 945;
// Kopfmitte von Schalti (fuer Handschuhe, Gedankenblase, Ringe) bei Fusspunkt fx, fy und Groesse 1
const head22 = (fx, fy) => [fx + 58, fy - 127];
function room22(t, o) { o = o || {}; let s = '<defs><linearGradient id="wl22" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1840"/><stop offset="1" stop-color="#3B2E70"/></linearGradient><linearGradient id="fl22" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7A4E36"/><stop offset="1" stop-color="#4E2F22"/></linearGradient><radialGradient id="rl22"><stop offset=".55" stop-color="#FFF6E0" stop-opacity="0"/><stop offset=".8" stop-color="#FFF6E0" stop-opacity=".28"/><stop offset="1" stop-color="#FFF6E0" stop-opacity="0"/></radialGradient></defs>';
  s += '<rect width="1080" height="1920" fill="url(#wl22)"/>';
  // Fenster rechts mit Nacht und Mond
  s += '<rect x="780" y="560" width="270" height="380" rx="10" fill="#0E1640" stroke="' + ST22 + '" stroke-width="8"/>';
  for (let i = 0; i < 12; i++) s += '<circle cx="' + (800 + rnd(i + 41) * 230).toFixed(0) + '" cy="' + (580 + rnd(i + 17) * 200).toFixed(0) + '" r="' + (1.5 + rnd(i) * 2).toFixed(1) + '" fill="#fff" opacity="' + (.35 + .4 * Math.abs(Math.sin(t * .6 + i))).toFixed(2) + '"/>';
  s += '<circle cx="980" cy="640" r="34" fill="#FFF3D0"/><circle cx="994" cy="630" r="30" fill="#0E1640"/>';
  for (let i = 0; i < 5; i++) { const h = 60 + rnd(i + 3) * 110, x = 790 + i * 54; s += '<rect x="' + x + '" y="' + (930 - h) + '" width="46" height="' + h + '" fill="#1A2350"/>'; for (let k = 0; k < 3; k++) if (rnd(i * 7 + k) > .45) s += '<rect x="' + (x + 8 + (k % 2) * 18) + '" y="' + (930 - h + 14 + k * 26) + '" width="10" height="12" fill="#FFD98A" opacity=".8"/>'; }
  s += '<path d="M915 560 V940 M780 750 H1050" stroke="' + ST22 + '" stroke-width="8"/><rect x="770" y="936" width="290" height="22" rx="6" fill="#C9B8E8" stroke="' + ST22 + '" stroke-width="5"/>';
  // Regal links mit Kopfhoerer und Buechern (weit ueber Schalti)
  s += '<rect x="30" y="880" width="300" height="20" rx="6" fill="#A8774F" stroke="' + ST22 + '" stroke-width="5"/>';
  [['#FF6B8A', 46, 110], ['#5CE1FF', 30, 96], ['#FFE14D', 38, 120], ['#9B7BFF', 28, 88]].forEach(([c, w, h], i) => { const x = 50 + [0, 50, 84, 126][i]; s += '<rect x="' + x + '" y="' + (880 - h) + '" width="' + w + '" height="' + h + '" rx="4" fill="' + c + '" stroke="' + ST22 + '" stroke-width="4"/>'; });
  s += '<path d="M200 870 Q250 770 300 870" fill="none" stroke="#2A3048" stroke-width="14" stroke-linecap="round"/><rect x="188" y="836" width="26" height="44" rx="10" fill="#2A3048" stroke="' + ST22 + '" stroke-width="4"/><rect x="288" y="836" width="26" height="44" rx="10" fill="#2A3048" stroke="' + ST22 + '" stroke-width="4"/>';
  // Boden
  s += '<rect x="0" y="1400" width="1080" height="520" fill="url(#fl22)"/><rect x="0" y="1392" width="1080" height="18" fill="#C9B8E8" stroke="' + ST22 + '" stroke-width="4"/>';
  for (let i = 0; i < 7; i++) s += '<path d="M0 ' + (1460 + i * 70) + ' H1080" stroke="#3E241A" stroke-width="3" opacity=".5"/>';
  s += '<ellipse cx="470" cy="1640" rx="420" ry="90" fill="#5C4A9A" opacity=".75"/><ellipse cx="470" cy="1640" rx="380" ry="72" fill="none" stroke="#8F7FD0" stroke-width="5" stroke-dasharray="14 12"/>';
  // Stativ, Ringlicht, Handy
  const lt = o.light === undefined ? 1 : o.light;
  s += '<g stroke="' + ST22 + '" stroke-width="7" stroke-linecap="round"><path d="M' + PX22 + ' 1150 L' + (PX22 - 120) + ' 1600 M' + PX22 + ' 1150 L' + (PX22 + 120) + ' 1600 M' + PX22 + ' 1150 L' + PX22 + ' 1620"/></g><g stroke="#3A4060" stroke-width="4" stroke-linecap="round"><path d="M' + PX22 + ' 1150 L' + (PX22 - 120) + ' 1600 M' + PX22 + ' 1150 L' + (PX22 + 120) + ' 1600 M' + PX22 + ' 1150 L' + PX22 + ' 1620"/></g>';
  s += '<circle cx="' + PX22 + '" cy="' + PY22 + '" r="300" fill="url(#rl22)" opacity="' + lt.toFixed(2) + '"/><circle cx="' + PX22 + '" cy="' + PY22 + '" r="232" fill="none" stroke="' + ST22 + '" stroke-width="46"/><circle cx="' + PX22 + '" cy="' + PY22 + '" r="232" fill="none" stroke="' + lc('#8A8FA8', '#FFF6E0', lt) + '" stroke-width="32"/>';
  s += '<path d="M' + PX22 + ' 1128 V1155" stroke="' + ST22 + '" stroke-width="16"/>';
  s += phone22(o.screen || 'memo', t, o) ;
  return s; }
// Handy mit Bildschirm. mode: memo (Aufnahme spielt), eq (Equalizer), meter (Lautstaerke)
function phone22(mode, t, o) { const x = PX22 - 120, y = PY22 - 185, w = 240, h = 370; let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="34" fill="' + ST22 + '" stroke="#F4F6FB" stroke-width="8"/><rect x="' + (x + 14) + '" y="' + (y + 14) + '" width="' + (w - 28) + '" height="' + (h - 28) + '" rx="24" fill="#141C3C"/>';
  s += '<circle cx="' + PX22 + '" cy="' + (y + 28) + '" r="6" fill="#2A3560"/>' + '<g fill="#2A3560">' + [0, 1, 2, 3, 4].map(i => '<circle cx="' + (PX22 - 24 + i * 12) + '" cy="' + (y + h - 6) + '" r="3"/>').join('') + '</g>';
  if (mode === 'memo') { const pr = ((o.memoT === undefined ? t : o.memoT) * .16) % 1;
    s += '<circle cx="' + (x + 44) + '" cy="' + (y + 56) + '" r="10" fill="#FF4D6D" opacity="' + (.5 + .5 * Math.abs(Math.sin(t * 4))).toFixed(2) + '"/>' + svgT(x + 62, y + 64, 'Aufnahme', 24, '#F4F6FB', 'start');
    for (let i = 0; i < 18; i++) { const bx = x + 34 + i * 10, a = (14 + 50 * Math.abs(Math.sin(i * 1.7 + t * (i / 18 < pr ? 9 : 0)))) * (o.thin ? .55 : 1), on = i / 18 < pr; s += '<rect x="' + bx + '" y="' + (PY22 - a / 2) + '" width="6" height="' + a.toFixed(0) + '" rx="3" fill="' + (on ? AC22 : '#3A4775') + '"/>'; }
    s += '<path d="M' + (x + 34) + ' ' + (PY22 + 90) + ' H' + (x + w - 34) + '" stroke="#3A4775" stroke-width="6" stroke-linecap="round"/><path d="M' + (x + 34) + ' ' + (PY22 + 90) + ' H' + (x + 34 + (w - 68) * pr).toFixed(0) + '" stroke="' + AC22 + '" stroke-width="6" stroke-linecap="round"/><circle cx="' + (x + 34 + (w - 68) * pr).toFixed(0) + '" cy="' + (PY22 + 90) + '" r="9" fill="#fff"/>';
    s += '<path d="M' + (PX22 - 16) + ' ' + (PY22 + 120) + ' v40 l34 -20 Z" fill="#F4F6FB"/>'; }
  if (mode === 'eq') { const bo = o.boost || 0; s += svgT(PX22, y + 66, 'Klang', 26, '#F4F6FB');
    for (let i = 0; i < 7; i++) { const bx = x + 34 + i * 26, base = 40 + 30 * Math.abs(Math.sin(i * 1.3 + t * 3)), add = bo * Math.max(0, 1 - i / 3.2) * 120, top = PY22 + 110 - base - add;
      s += '<rect x="' + bx + '" y="' + (PY22 + 110 - base).toFixed(0) + '" width="18" height="' + base.toFixed(0) + '" rx="5" fill="' + AC22 + '"/>'; if (add > 2) s += '<rect x="' + bx + '" y="' + top.toFixed(0) + '" width="18" height="' + add.toFixed(0) + '" rx="5" fill="' + OR22 + '"/>'; }
    s += svgT(x + 52, PY22 + 146, 'tief', 22, OR22) + svgT(x + w - 50, PY22 + 146, 'hoch', 22, '#AEB9D6'); }
  if (mode === 'meter') { const lv = cl(o.level || 0); s += svgT(PX22, y + 66, 'Lautstärke', 24, '#F4F6FB');
    for (let i = 0; i < 9; i++) { const on = i / 9 < lv * (.92 + .08 * Math.sin(t * 20)); s += '<rect x="' + (x + 40) + '" y="' + (PY22 + 120 - i * 26) + '" width="' + (w - 80) + '" height="18" rx="5" fill="' + (on ? (i > 6 ? '#FF4D6D' : (i > 4 ? '#FFE14D' : '#3DFF7A')) : '#2A3560') + '"/>'; } }
  return s; }
// Schallwellen vom Handy Richtung Schalti (Boegen nach links)
function waves22(t, k, col, thin) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 4; i++) { const c = (t * .9 + i / 4) % 1, r = 60 + 230 * c; s += '<path d="M' + (PX22 - 150 - r * .3).toFixed(0) + ' ' + (PY22 - r * .9).toFixed(0) + ' Q' + (PX22 - 150 - r).toFixed(0) + ' ' + PY22 + ' ' + (PX22 - 150 - r * .3).toFixed(0) + ' ' + (PY22 + r * .9).toFixed(0) + '" fill="none" stroke="' + (col || AC22) + '" stroke-width="' + (thin ? 5 : 9) + '" stroke-linecap="round" opacity="' + (k * (1 - c) * .9).toFixed(2) + '"/>'; } return s; }
// Welle als Linie: fett und tief (Kopf) oder duenn und hoch (Aufnahme)
function wline22(cx, cy, w, fat, t, col) { let d = ''; for (let i = 0; i <= 60; i++) { const x = -w / 2 + w * i / 60, ph = i / 60 * Math.PI * (fat ? 4 : 11) + t * 6, a = fat ? 52 : 26; d += (i ? 'L' : 'M') + (cx + x).toFixed(1) + ' ' + (cy + a * Math.sin(ph) * Math.sin(Math.PI * i / 60)).toFixed(1); } return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + (fat ? 16 : 7) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
// Gedankenblase aus Schaltis Kopf
function think22(hx, hy, bx, by, inner, k) { if (k <= .01) return ''; const e = back(cl(k)); let s = '<g opacity="' + cl(k * 2).toFixed(2) + '">';
  [[.25, 14], [.5, 22]].forEach(([f, r]) => { s += '<circle cx="' + lerp(hx, bx, f).toFixed(0) + '" cy="' + lerp(hy, by + 130, f).toFixed(0) + '" r="' + r + '" fill="#F4F6FB" stroke="' + ST22 + '" stroke-width="5"/>'; });
  return s + '<g transform="translate(' + bx + ' ' + by + ') scale(' + e.toFixed(3) + ')"><ellipse rx="210" ry="125" fill="#F4F6FB" stroke="' + ST22 + '" stroke-width="7"/>' + inner + '</g></g>'; }
// Karte "Im Kopf" oder "Aufnahme" mit kleinem Symbol
function card22(x, y, txt, ic, col, k, hi, dim) { if (k <= 0) return ''; const z = back(cl(k)) * (1 + .08 * (hi || 0)); let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(3) + ')" opacity="' + (1 - .6 * (dim || 0)).toFixed(2) + '"><rect x="-190" y="-80" width="380" height="160" rx="26" fill="#F4F6FB" stroke="' + (hi ? col : ST22) + '" stroke-width="' + (hi ? 12 : 7) + '"/>';
  if (ic === 'kopf') s += '<path transform="translate(-10 0) scale(.85)" d="M-150 40 Q-160 -50 -100 -60 Q-50 -64 -42 -20 L-30 0 L-44 6 Q-44 40 -70 40 V60 H-150 Z" fill="' + OR22 + '" stroke="' + ST22 + '" stroke-width="5"/>';
  else s += '<rect x="-148" y="-58" width="64" height="112" rx="12" fill="' + ST22 + '"/><rect x="-140" y="-48" width="48" height="92" rx="8" fill="' + AC22 + '"/><circle cx="-116" cy="-2" r="16" fill="#fff"/><path d="M-122 -10 v16 l14 -8 Z" fill="' + ST22 + '"/>';
  s += svgT(-30, 14, txt, 40, ST22, 'start'); if (hi) s += '<circle cx="170" cy="-70" r="34" fill="#3DFF7A" stroke="' + ST22 + '" stroke-width="6"/><path d="M154 -70 l12 12 l20 -24" fill="none" stroke="' + ST22 + '" stroke-width="8" stroke-linecap="round"/>'; return s + '</g>'; }
// Fragezeichen zwischen den Karten
const vs22 = (k, t) => k <= 0 ? '' : '<g transform="translate(540 735) scale(' + (back(cl(k)) * (1 + .1 * Math.sin(t * 6))).toFixed(3) + ')"><circle r="54" fill="#FFE14D" stroke="' + ST22 + '" stroke-width="7"/>' + svgT(0, 22, '?', 64, ST22) + '</g>';
// ---------- Kopf im Schnitt (Lupe) ----------
// Profil nach links, lokale Koordinaten um 0,0. a: Luftweg 0..1, b: Knochenweg 0..1, lock: "nur du"
function skull22(t, a, b, lock, plug) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#2B2560"/>';
  s += '<path d="M-60 250 L-60 150 Q-150 150 -150 100 L-150 70 Q-178 64 -170 40 L-190 18 Q-196 4 -180 -6 L-170 -30 Q-190 -150 -60 -190 Q80 -220 160 -120 Q210 -40 180 60 Q160 120 110 150 L110 250 Z" fill="#F2C6A8" stroke="' + ST22 + '" stroke-width="7"/>';
  s += '<path d="M-150 -40 Q-160 -150 -50 -175 Q70 -200 145 -110 Q190 -40 165 50 Q150 95 100 120 L60 130 Q20 120 0 90 L-20 120 Q-60 140 -110 128 L-140 110 Q-128 80 -120 60 Q-150 20 -150 -40 Z" fill="#F7F1E3" stroke="#C9B89A" stroke-width="6"/>';
  s += '<path d="M-130 -30 Q-120 -130 -40 -150 Q60 -170 125 -95 Q160 -40 140 30 Q100 60 40 50 Q-40 40 -100 20 Z" fill="#F2C6A8" opacity=".55"/>';
  // Ohr aussen und Gehoergang mit Schnecke
  s += '<path d="M118 -40 Q170 -60 176 10 Q178 60 140 70 Q130 40 146 20 Q150 -20 118 -10 Z" fill="#E8A888" stroke="' + ST22 + '" stroke-width="6"/>';
  s += '<path d="M150 22 L96 22" stroke="#5A3A30" stroke-width="16" stroke-linecap="round"/><path d="M96 22 L86 22" stroke="#FFE14D" stroke-width="10"/>';
  const ip = 1 + .25 * (b > 0 ? Math.abs(Math.sin(t * 9)) * cl(b * 2) : 0); s += '<g transform="translate(64 20) scale(' + ip.toFixed(3) + ')"><path d="M0 0 m-20 0 a20 20 0 1 0 40 0 a14 14 0 1 0 -28 0 a8 8 0 1 0 16 0" fill="none" stroke="' + (b > .5 ? OR22 : '#FF6B8A') + '" stroke-width="7" stroke-linecap="round"/></g>';
  s += svgT(64, -24, 'Innenohr', 22, '#5A3A30');
  // Mund und Kehlkopf
  s += '<path d="M-176 52 Q-160 60 -146 50" stroke="#B4505A" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="-80" cy="170" r="14" fill="#FF6B8A" stroke="' + ST22 + '" stroke-width="4"/>';
  if (plug) s += '<g transform="translate(176 20)"><ellipse cx="18" cy="0" rx="40" ry="22" fill="#F7D9C2" stroke="' + ST22 + '" stroke-width="6"/><path d="M0 -10 q10 10 0 20" stroke="' + ST22 + '" stroke-width="4" fill="none"/></g>';
  // Luftweg: aus dem Mund nach aussen, um den Kopf herum ins Ohr
  const air = 'M-196 46 C-300 20 -290 -240 -60 -262 C140 -276 270 -150 230 -40 C214 0 190 18 150 22';
  if (a > 0) { s += '<path d="' + air + '" fill="none" stroke="' + AC22 + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="1300" stroke-dashoffset="' + (1300 * (1 - ease(a))).toFixed(0) + '"/>';
    for (let i = 0; i < 3; i++) { const c = (t * 1.2 + i / 3) % 1; s += '<path d="M' + (-200 - 40 * c) + ' ' + (20 - 24 * c) + ' q-' + (12 + 10 * c) + ' ' + (26 + 14 * c) + ' 0 ' + (52 + 28 * c) + '" stroke="' + AC22 + '" stroke-width="7" fill="none" stroke-linecap="round" opacity="' + ((1 - c) * cl(a * 3)).toFixed(2) + '"/>'; } }
  // Knochenweg: vom Kehlkopf durch Kiefer und Schaedel direkt ins Innenohr
  const bone = 'M-80 160 C-60 100 -20 110 10 92 C40 70 50 40 64 22';
  if (b > 0) { s += '<path d="' + bone + '" fill="none" stroke="' + OR22 + '" stroke-width="16" stroke-linecap="round" stroke-dasharray="320" stroke-dashoffset="' + (320 * (1 - ease(b))).toFixed(0) + '"/>';
    for (let i = 0; i < 3; i++) { const c = (t * 1.6 + i / 3) % 1; s += '<circle cx="-20" cy="100" r="' + (20 + 120 * c).toFixed(0) + '" fill="none" stroke="' + OR22 + '" stroke-width="5" opacity="' + ((1 - c) * .6 * cl(b * 2)).toFixed(2) + '"/>'; } }
  if (lock > 0) s += '<g transform="translate(-20 -95) scale(' + back(cl(lock)).toFixed(3) + ')"><rect x="-84" y="-30" width="168" height="56" rx="18" fill="' + OR22 + '" stroke="' + ST22 + '" stroke-width="6"/>' + svgT(0, 12, 'nur du', 32, ST22) + '</g>';
  return s; }
// Mikrofon in der Lupe: Luftschall kommt rein, Knochen-Weg nicht
function micin22(t, k) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#141C3C"/><rect x="-200" y="-40" width="400" height="300" rx="40" fill="' + ST22 + '" stroke="#F4F6FB" stroke-width="8"/>';
  for (let i = 0; i < 7; i++) s += '<circle cx="' + (-90 + i * 30) + '" cy="40" r="10" fill="#2A3560" stroke="#5A6590" stroke-width="3"/>';
  s += svgT(0, 120, 'Mikrofon', 34, '#AEB9D6');
  for (let i = 0; i < 4; i++) { const c = (t * 1.1 + i / 4) % 1, y = -260 + 290 * c; s += '<path d="M-130 ' + y.toFixed(0) + ' Q0 ' + (y - 40).toFixed(0) + ' 130 ' + y.toFixed(0) + '" fill="none" stroke="' + AC22 + '" stroke-width="9" stroke-linecap="round" opacity="' + ((1 - c) * k).toFixed(2) + '"/>'; }
  const kk = cl((k - .3) / .5); s += '<g transform="translate(170 -200)" opacity="' + kk.toFixed(2) + '"><circle r="78" fill="' + OR22 + '" stroke="' + ST22 + '" stroke-width="7"/>' + svgT(0, 11, 'Knochen', 30, ST22) + '<path d="M-84 -84 L84 84 M84 -84 L-84 84" stroke="#FF4D6D" stroke-width="12" stroke-linecap="round"/></g>';
  return s; }
function lupe22(cx, cy, r, inner, k, hx, hy) { if (k <= .01) return ''; const e = back(cl(k)); return (hx !== undefined ? '<path d="M' + hx + ' ' + hy + ' L' + (cx + (hx - cx) * .62).toFixed(0) + ' ' + (cy + (hy - cy) * .62).toFixed(0) + '" stroke="#F4F6FB" stroke-width="6" stroke-dasharray="12 9" opacity="' + cl(k * 2).toFixed(2) + '"/>' : '') + '<g transform="translate(' + cx + ' ' + cy + ') scale(' + e.toFixed(3) + ')"><clipPath id="lu22' + cx + cy + '"><circle r="' + r + '"/></clipPath><g clip-path="url(#lu22' + cx + cy + ')"><g transform="scale(' + (r / 320).toFixed(3) + ')">' + inner + '</g></g><circle r="' + r + '" fill="none" stroke="#F4F6FB" stroke-width="14"/><circle r="' + (r + 7) + '" fill="none" stroke="' + ST22 + '" stroke-width="5"/></g>'; }
// Handschuhe auf Schaltis Ohren (Teil 3)
function gloves22(hx, hy, k) { if (k <= 0) return ''; const d = lerp(170, 84, ease(k)); let s = ''; [-1, 1].forEach(sg => { s += '<g transform="translate(' + (hx + sg * d).toFixed(0) + ' ' + (hy - 40 * (sg < 0 ? 1 : 0)) + ') scale(' + (1.3 * sg) + ' 1.3)" opacity="' + cl(k * 3).toFixed(2) + '"><ellipse cx="0" cy="0" rx="26" ry="36" fill="#F4F6FB" stroke="' + ST22 + '" stroke-width="5"/><path d="M-8 -26 q-14 10 -14 26" stroke="' + ST22 + '" stroke-width="3" fill="none"/><rect x="6" y="18" width="30" height="40" rx="10" fill="' + AC22 + '" stroke="' + ST22 + '" stroke-width="5"/></g>'; }); return s; }
// Ringe um Schaltis Kopf: c Farbe, k Staerke, inn: nach innen statt aussen
function rings22(hx, hy, t, k, col, inn) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 3; i++) { const c = (t * 1.4 + i / 3) % 1, r = inn ? 150 - 100 * c : 70 + 150 * c; s += '<circle cx="' + hx + '" cy="' + hy + '" r="' + r.toFixed(0) + '" fill="none" stroke="' + col + '" stroke-width="' + (inn ? 8 : 7) + '" opacity="' + (k * (inn ? c : 1 - c) * .85).toFixed(2) + '"/>'; } return s; }
// Langes I aus Schaltis Mund
function iii22(hx, hy, t, k) { if (k <= 0) return ''; let s = ''; const n = Math.floor(1 + 7 * cl(k)); for (let i = 0; i < n; i++) s += '<text x="' + (hx + 140 + i * 40) + '" y="' + (hy + 150 + 8 * Math.sin(t * 22 + i)) + '" font-size="' + (54 + i * 5) + '" font-weight="900" fill="#FFE14D" stroke="' + ST22 + '" stroke-width="3" font-family="Inter Display" opacity="' + (1 - i * .05).toFixed(2) + '">I</text>'; return s; }
// Sterne der Studie
function stars22(k, t) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 5; i++) { const kk = back(cl((k - i * .12) / .3)); if (kk <= 0) continue; const x = 340 + i * 100, y = 580; s += '<g transform="translate(' + x + ' ' + (y + 6 * Math.sin(t * 3 + i)).toFixed(0) + ') scale(' + kk.toFixed(3) + ')"><path d="M0 -40 L11 -12 L41 -12 L17 6 L26 36 L0 18 L-26 36 L-17 6 L-41 -12 L-11 -12 Z" fill="#FFE14D" stroke="' + ST22 + '" stroke-width="5" stroke-linejoin="round"/></g>'; } return s; }

// ---------- Einstieg: die Aufnahme laeuft schon im ersten Bild ----------
WORLD.h22hook = function (sc, ev, t, lt) { const pl = ev.play, ko = ev.kopf, lo = ev.loop; let s = room22(t, { screen: 'memo', memoT: lt + 1.2 });
  s += waves22(t, lo === undefined ? 1 : 1 - cl(lo / .6), AC22, 1);
  const [hx, hy] = head22(260, GY22);
  if (ko !== undefined) { const k = lo === undefined ? cl(ko / .35) : 1 - cl(lo / .4); s += think22(hx + 20, hy - 60, 300, 860, wline22(0, -6, 300, 1, t, OR22) + svgT(0, 96, 'so hörst du dich', 30, ST22), k); }
  if (lo !== undefined) { s += card22(280, 735, 'Im Kopf', 'kopf', OR22, cl((lo - .2) / .4)) + card22(800, 735, 'Aufnahme', 'auf', AC22, cl((lo - .5) / .4)) + vs22(cl((lo - .9) / .3), t); }
  return W(s + shade3()); };
WMASC.h22hook = (ev, t, lt) => { const pl = ev.play, ko = ev.kopf;
  if (ko !== undefined) return stay3([lerp(230, 260, ease(cl(ko / .6))), GY22], 1, { r: 2 * Math.sin(t * 2), mood: 'cool' });
  const k = pl === undefined ? 0 : Math.sin(Math.PI * cl(pl / 1.4)); return stay3([260 - 30 * ease(cl((pl || 0) / .5)), GY22], 1, { r: -14 * k, mood: k > .2 ? 'shock' : 'happy' }); };

// ---------- Teil 1: zwei Wege ----------
WORLD.h22wege = function (sc, ev, t, lt) { const dp = ev.doppelt, lu = ev.luft, kn = ev.knochen, nu = ev.nur; let s = room22(t, { screen: 'memo', memoT: 0 });
  const [hx, hy] = head22(300, GY22);
  if (dp !== undefined && lu === undefined) s += rings22(hx, hy, t, cl(dp / .4), AC22) + rings22(hx, hy, t + .5, cl((dp - .5) / .4), OR22, 1);
  if (lu !== undefined) s += lupe22(600, 905, 250, skull22(t, cl((lu - .3) / 1.8), kn === undefined ? 0 : cl((kn - .3) / 1.8), nu === undefined ? 0 : cl((nu - .5) / .4)), cl(lu / .45), hx + 40, hy - 40);
  return W(s + shade3(), slot(ev, [['doppelt', 'Du hörst dich doppelt'], ['luft', 'Weg 1: durch die Luft'], ['knochen', 'Weg 2: durch die Knochen', 'hot'], ['nur', 'Weg 2 hört nur du', 'hot']])); };
WMASC.h22wege = (ev, t, lt) => { const dp = ev.doppelt, nu = ev.nur;
  if (nu !== undefined) { const b = Math.sin(Math.PI * cl((nu - .4) / .8)); return stay3([300, GY22 - 26 * b], 1, { r: -8 * b, mood: 'cool' }); }
  if (dp !== undefined && ev.luft === undefined) { const w = Math.sin(t * 7) * cl(dp / .3); return stay3([300 + 6 * w, GY22], 1, { r: 4 * w, mood: 'shock' }); }
  return stay3([lerp(260, 300, ease(cl(lt / .8))), GY22], 1, { r: 2 * Math.sin(t * 2) }); };

// ---------- Teil 2: der Bass ----------
WORLD.h22bass = function (sc, ev, t, lt) { const ha = ev.haken, ti = ev.tief, vo = ev.voll, mi = ev.mikro;
  const bo = ti === undefined ? 0 : ease(cl((ti - .5) / 1.2)) * (mi === undefined ? 1 : 1 - cl(mi / .6));
  let s = room22(t, { screen: vo !== undefined && mi === undefined ? 'memo' : 'eq', boost: bo, thin: 1, memoT: lt });
  const [hx, hy] = head22(300, GY22);
  if (ha !== undefined && ti === undefined) { const k = 1 - cl((ha - 1.2) / .6); s += '<rect width="1080" height="1920" fill="#fff" opacity="' + (.35 * (1 - cl(ha / .2))).toFixed(2) + '"/>' + '<g transform="translate(880 1440) scale(' + back(cl(ha / .3)).toFixed(3) + ')" opacity="' + k.toFixed(2) + '">' + svgT(0, 0, '?!', 110, '#FFE14D') + '</g>'; }
  if (vo !== undefined && mi === undefined) { const k = cl(vo / .35); s += think22(hx + 20, hy - 60, 300, 860, wline22(0, -6, 300, 1, t, OR22) + svgT(0, 96, 'tiefer und voller', 30, ST22), k) + waves22(t, k, AC22, 1); }
  if (mi !== undefined) s += lupe22(600, 905, 250, micin22(t, cl((mi - .3) / .8)), cl(mi / .45), PX22, PY22 + 170);
  return W(s + shade3(), slot(ev, [['haken', 'Der Haken', 'red'], ['tief', 'Knochen-Weg: mehr Bass', 'hot'], ['voll', 'Für dich: tiefer, voller'], ['mikro', 'Mikrofon: nur Luft', 'hot']])); };
WMASC.h22bass = (ev, t, lt) => { const ha = ev.haken, ti = ev.tief, vo = ev.voll, mi = ev.mikro;
  if (mi !== undefined) { const k = ease(cl(mi / 1)), tap = Math.sin(Math.PI * cl((mi - 1.1) / .4)); return stay3([lerp(300, 400, k), GY22], 1, { r: 16 * tap, mood: 'cool' }); }
  if (vo !== undefined) { const p = Math.sin(Math.PI * cl(vo / 1.6)); return stay3([300, GY22], 1 + .08 * p, { r: -3, mood: 'happy' }); }
  if (ti !== undefined) return stay3([300, GY22], 1, { r: 3 * Math.sin(t * 6) * cl(ti / .5), mood: 'happy' });
  if (ha !== undefined) { const j = Math.sin(Math.PI * cl(ha / .5)); return stay3([300, GY22 - 30 * j], 1, { r: -6 * j, mood: 'shock' }); }
  return stay3([300, GY22], 1, { r: 2 }); };

// ---------- Teil 3: zum Mitmachen ----------
WORLD.h22test = function (sc, ev, t, lt) { const te = ev.test, dr = ev.droehn, ge = ev.gefangen; const [hx, hy] = head22(300, GY22);
  const plug = te === undefined ? 0 : cl((te - 1.6) / .5), sing = te === undefined ? 0 : cl((te - 2.6) / 1.4);
  let s = room22(t, { screen: 'meter', level: dr !== undefined ? .55 + .35 * cl(dr / .8) : .45 * sing });
  const lk = te === undefined ? 0 : cl((te - 1.4) / .45);
  s += lupe22(600, 905, 250, skull22(t, 0, ge !== undefined ? 1 : (dr !== undefined ? cl(dr / 1) : 0), 0, plug > .5 ? 1 : 0) + (ge !== undefined || dr !== undefined ? trap22(t) : ''), lk, hx + 50, hy);
  s += iii22(hx, hy, t, dr !== undefined ? 1 : sing) + rings22(hx, hy, t, dr === undefined ? 0 : cl(dr / .4), OR22, 1);
  return W(s + shade3(), slot(ev, [['test', 'Ohren zu, langes I'], ['droehn', 'Dumpf, dröhnend, lauter', 'hot'], ['gefangen', 'Schall bleibt im Ohr', 'hot']])); };
// Gefangener Schall im verschlossenen Gehoergang
function trap22(t) { let s = ''; for (let i = 0; i < 3; i++) { const c = (t * 2 + i / 3) % 1, x = 100 + 70 * Math.abs(Math.sin(Math.PI * c)); s += '<path d="M' + x.toFixed(0) + ' 2 q8 20 0 40" stroke="' + OR22 + '" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>'; } return s; }
WMASC.h22test = (ev, t, lt) => { const te = ev.test, dr = ev.droehn, ge = ev.gefangen;
  if (dr !== undefined && ge === undefined) { const sh = Math.sin(t * 30) * cl(dr / .4) * (1 - cl((dr - 2.4) / .4)); return stay3([300 + 4 * sh, GY22], 1, { r: 3 * sh, mood: 'shock' }); }
  if (te !== undefined) return stay3([300, GY22], 1, { r: 2 * Math.sin(t * 2), mood: te > 2.6 ? 'shock' : 'happy' });
  return stay3([300, GY22], 1, { r: 2 }); };

// ---------- Schluss: Aufloesung, Studie, zurueck zum ersten Bild (Loop) ----------
WORLD.h22out = function (sc, ev, t, lt) { const fr = ev.frage2, au = ev.auf, st = ev.studie, sv = ev.save; let s = room22(t, { screen: 'memo', memoT: sv === undefined ? lt : 1.2 + (sv || 0) });
  const off = sv === undefined ? 0 : cl(sv / .2);
  if (fr !== undefined) { const k = cl(fr / .4) * (1 - off), hi = au === undefined ? 0 : ease(cl(au / .5)); s += card22(280, 735, 'Im Kopf', 'kopf', OR22, k, 0, hi) + card22(800, 735, 'Aufnahme', 'auf', AC22, k, hi) + vs22(au === undefined ? cl((fr - .3) / .3) : 1 - cl(au / .3), t); }
  if (st !== undefined) s += '<g opacity="' + (1 - off).toFixed(2) + '">' + stars22(cl((st - .4) / 1.4), t) + chip3(540, 500, 'Studie 2013, 80 Leute', 28, '#FFE14D', ST22, cl((st - 1.6) / .3)) + '</g>';
  if (sv !== undefined) s += waves22(t, cl(sv / .6), AC22, 1);
  return W(s + shade3()); };
WMASC.h22out = (ev, t, lt) => { const au = ev.auf, st = ev.studie, sv = ev.save;
  if (sv !== undefined) return stay3([lerp(300, 260, ease(cl(sv / .8))), GY22], 1, { r: 0, mood: 'happy' });
  if (st !== undefined) { const j = Math.sin(Math.PI * cl((st - 2) / .6)); return stay3([300, GY22 - 30 * j], 1, { r: 4, mood: 'happy' }); }
  if (au !== undefined) return stay3([300, GY22], 1, { r: -4, mood: 'cool' });
  return stay3([lerp(400, 300, ease(cl(lt / .8))), GY22], 1, { r: 2 }); };

['h22hook', 'h22wege', 'h22bass', 'h22test', 'h22out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC22); });
