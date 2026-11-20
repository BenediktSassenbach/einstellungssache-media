// C006 "Warum taut Salz das Eis auf der Strasse?" (Chemie, Skript 4, Kostuem C1 Laborkittel), stumme Demo v1 (20.11.2026).
// Ort (eigens gebaut): Wohnstrasse am Winterabend. Haeuser mit Licht, Strasse mit Streuwagen, vorn der vereiste Gehweg, auf dem Schalti steht.
// Laterne links mit Strassenthermometer, rechts ein Baum am Gehweg. Teil 2 im Wissenschaftsmodus (Teilchen), Teil 1 und 3 normal mit Lupe und Aktionen.
// Einstieg: Schalti rutscht auf dem Eis, der Streuwagen kommt, beim Nachsatz prasselt ihm Salz entgegen.
// Zum Loeschen: diese Datei und videos/C006.
var AC6C = '#FF6BD6', ST6C = '#0B1020', GY6C = 1537;
function street6c(t, o) { o = o || {}; let s = '<defs><linearGradient id="sk6c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16204A"/><stop offset=".6" stop-color="#4B5C9E"/><stop offset="1" stop-color="#C9A6C8"/></linearGradient><linearGradient id="ic6c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFEFFF"/><stop offset="1" stop-color="#8FC3E6"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk6c)"/>';
  for (let i = 0; i < 26; i++) s += '<circle cx="' + (rnd(i + 5) * 1080).toFixed(0) + '" cy="' + (60 + rnd(i + 9) * 380).toFixed(0) + '" r="' + (1.5 + rnd(i + 3) * 2).toFixed(1) + '" fill="#fff" opacity="' + (.3 + .4 * Math.abs(Math.sin(t * .5 + i))).toFixed(2) + '"/>';
  s += '<circle cx="860" cy="250" r="46" fill="#FFF3D0" opacity=".9"/><circle cx="878" cy="238" r="40" fill="#2A3772" opacity=".55"/>';
  // Haeuser
  const H = [[-20, 560, 250, '#8E5A4A'], [220, 520, 230, '#5E6F9E'], [440, 590, 260, '#A9784C'], [690, 540, 240, '#6A8A7A'], [920, 580, 200, '#9A5C6E']];
  H.forEach(([x, y, w, c], i) => { s += '<path d="M' + x + ' ' + (y + 60) + ' L' + (x + w / 2) + ' ' + (y - 40) + ' L' + (x + w) + ' ' + (y + 60) + ' V1010 H' + x + ' Z" fill="' + c + '" stroke="' + ST6C + '" stroke-width="5"/><path d="M' + (x - 10) + ' ' + (y + 64) + ' L' + (x + w / 2) + ' ' + (y - 46) + ' L' + (x + w + 10) + ' ' + (y + 64) + ' L' + (x + w - 10) + ' ' + (y + 50) + ' Q' + (x + w / 2) + ' ' + (y - 10) + ' ' + (x + 10) + ' ' + (y + 50) + ' Z" fill="#F4F8FF" stroke="' + ST6C + '" stroke-width="4"/>';
    for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) { const on = (Math.floor(t * .2 + i * 1.7 + r + k * 2) % 5) !== 0; s += '<rect x="' + (x + 36 + k * (w - 120)) + '" y="' + (y + 110 + r * 150) + '" width="48" height="62" rx="4" fill="' + (on ? '#FFD98A' : '#2A3560') + '" stroke="' + ST6C + '" stroke-width="4"/><path d="M' + (x + 60 + k * (w - 120)) + ' ' + (y + 110 + r * 150) + ' v62" stroke="' + ST6C + '" stroke-width="3"/>'; } });
  // Schneewall und Strasse
  s += '<path d="M0 1000 Q120 976 240 996 T520 990 T800 998 T1080 990 V1030 H0 Z" fill="#F4F8FF" stroke="' + ST6C + '" stroke-width="4"/>';
  s += '<rect x="0" y="1030" width="1080" height="180" fill="#3A3F52"/><path d="M0 1120 H1080" stroke="#F4F8FF" stroke-width="8" stroke-dasharray="60 50" opacity=".6"/>';
  // Gehweg mit Eisflaeche
  s += '<rect x="0" y="1210" width="1080" height="710" fill="#7C8296"/><path d="M0 1210 H1080" stroke="#C9CDD8" stroke-width="12"/>';
  for (let i = 0; i < 6; i++) s += '<path d="M' + (i * 200 - 40) + ' 1216 L' + (i * 200 - 120) + ' 1920" stroke="#666C80" stroke-width="5"/>';
  const melt = cl(o.melt || 0), frz = cl(o.frz || 0);
  s += '<path d="M-20 1440 Q200 1400 520 1430 Q820 1460 1100 1420 V1700 Q800 1740 500 1710 Q200 1690 -20 1720 Z" fill="url(#ic6c)" stroke="#E8F7FF" stroke-width="6" opacity="' + (1 - .65 * melt + .65 * frz * melt).toFixed(2) + '"/>';
  if (melt > 0) s += '<path d="M60 1500 Q300 1470 560 1500 Q840 1530 1040 1490 V1650 Q760 1690 480 1660 Q240 1640 60 1660 Z" fill="#5E7FA8" opacity="' + (.55 * melt * (1 - frz)).toFixed(2) + '"/>';
  s += '<path d="M120 1480 q120 -14 240 -2 M640 1520 q120 -10 220 4" stroke="#fff" stroke-width="7" fill="none" opacity=".7" stroke-linecap="round"/>';
  if (o.grit) for (let i = 0; i < 46; i++) { const k = cl((o.grit - rnd(i + 11) * .8) / .3); if (k > 0) s += '<circle cx="' + (330 + rnd(i + 2) * 700).toFixed(0) + '" cy="' + (1460 + rnd(i + 8) * 230).toFixed(0) + '" r="' + (5 + rnd(i) * 4).toFixed(1) + '" fill="' + ['#8A7A68', '#B4A48C', '#6E6458'][i % 3] + '" stroke="' + ST6C + '" stroke-width="2" opacity="' + k.toFixed(2) + '"/>'; }
  // Laterne links mit Thermometer
  s += '<rect x="58" y="560" width="22" height="660" fill="#2A3048" stroke="' + ST6C + '" stroke-width="4"/><path d="M40 560 h58 l-10 -40 h-38 Z" fill="#2A3048" stroke="' + ST6C + '" stroke-width="4"/><circle cx="69" cy="545" r="16" fill="#FFE9A8"/><circle cx="69" cy="560" r="120" fill="#FFE9A8" opacity=".12"/>';
  // Baum rechts
  s += '<path d="M972 1220 L980 860 M980 960 L1030 880 M978 920 L930 840 M980 1020 L1040 960" stroke="#4A3626" stroke-width="18" stroke-linecap="round"/><path d="M972 1220 L980 860" stroke="' + ST6C + '" stroke-width="4" fill="none" opacity=".4"/><path d="M1020 878 q14 -10 22 0 M920 840 q12 -8 20 2" stroke="#F4F8FF" stroke-width="8" stroke-linecap="round"/>';
  return s; }
// Thermometer an der Laterne. v: Gradzahl
function therm6c(v, k) { if (k <= 0) return ''; const e = back(cl(k)), lv = 1 - cl((v + 25) / 35); let s = '<g transform="translate(120 760) scale(' + e.toFixed(3) + ')"><rect x="-40" y="-170" width="150" height="330" rx="22" fill="#F4F6FB" stroke="' + ST6C + '" stroke-width="6"/>';
  for (let i = 0; i <= 7; i++) { const y = -140 + i * 34; s += '<path d="M0 ' + y + ' h' + (i % 2 ? 14 : 24) + '" stroke="' + ST6C + '" stroke-width="3"/>'; }
  s += svgT(64, -126, '+10', 22, ST6C) + svgT(64, -24, '0', 22, ST6C) + svgT(64, 80, '-20', 22, ST6C);
  const zeroY = -140 + 3 * 34, top = -140 + (10 - Math.max(-25, Math.min(10, v))) / 30 * 238; s += '<rect x="-20" y="-150" width="16" height="250" rx="8" fill="#DDE3EE" stroke="' + ST6C + '" stroke-width="3"/><rect x="-18" y="' + top.toFixed(0) + '" width="12" height="' + (100 - top).toFixed(0) + '" rx="6" fill="' + (v < -10 ? '#5C8BFF' : '#FF4D6D') + '"/><circle cx="-12" cy="112" r="20" fill="' + (v < -10 ? '#5C8BFF' : '#FF4D6D') + '" stroke="' + ST6C + '" stroke-width="4"/>';
  s += '<path d="M-26 ' + zeroY + ' h20" stroke="#fff" stroke-width="2"/>' + chip3(36, 196, (v > 0 ? '+' : (v < 0 ? '−' : '')) + Math.abs(Math.round(v)) + ' °C', 30, '#0B1020', '#fff', 1, 140) + '</g>'; return s; }
// Streuwagen (faehrt nach links), sp: Streuteller dreht sich, k: Salz fliegt
function truck6c(x, t, sp, k) { const y = 1150, w = 2 * Math.sin(t * 9); let s = '<g transform="translate(' + x.toFixed(0) + ' ' + y + ')">';
  s += '<ellipse cx="160" cy="6" rx="260" ry="16" fill="#000" opacity=".25"/>';
  s += '<path d="M-70 -40 V-170 Q-70 -200 -40 -200 H60 L100 -120 V-40 Z" fill="#FF8A1E" stroke="' + ST6C + '" stroke-width="6" stroke-linejoin="round"/><path d="M-50 -180 H42 L76 -120 H-50 Z" fill="#9FD6FF" stroke="' + ST6C + '" stroke-width="5"/>';
  s += '<rect x="100" y="-190" width="300" height="150" rx="10" fill="#E9EEF5" stroke="' + ST6C + '" stroke-width="6"/><path d="M110 -190 L150 -230 H360 L400 -190 Z" fill="#DCE4EE" stroke="' + ST6C + '" stroke-width="5"/>';
  for (let i = 0; i < 9; i++) s += '<circle cx="' + (170 + i * 22) + '" cy="' + (-206 + 6 * Math.sin(i)) + '" r="10" fill="#FFFFFF" stroke="#B8C2D0" stroke-width="2"/>';
  s += '<path d="M110 -110 H390" stroke="#FF8A1E" stroke-width="14"/><path d="M110 -110 H390" stroke="' + ST6C + '" stroke-width="3" stroke-dasharray="30 30"/>';
  s += '<rect x="-60" y="-216" width="40" height="16" rx="6" fill="#FFB020" stroke="' + ST6C + '" stroke-width="4"/><circle cx="-40" cy="-208" r="' + (14 + 8 * Math.abs(Math.sin(t * 6))).toFixed(1) + '" fill="#FFB020" opacity=".3"/>';
  for (const cx of [0, 300]) s += '<circle cx="' + cx + '" cy="-30" r="38" fill="#1B1E2A" stroke="' + ST6C + '" stroke-width="5"/><circle cx="' + cx + '" cy="-30" r="16" fill="#9AA0AE" transform="rotate(' + (t * 300) + ' ' + cx + ' -30)"/>';
  s += '<g transform="translate(420 -60)"><rect x="-8" y="-30" width="16" height="30" fill="#5A6070" stroke="' + ST6C + '" stroke-width="3"/><ellipse cx="0" cy="4" rx="40" ry="10" fill="#9AA0AE" stroke="' + ST6C + '" stroke-width="4"/><path d="M-30 4 L30 4" stroke="' + ST6C + '" stroke-width="3" transform="rotate(' + (sp * 720) + ')" transform-origin="0 4"/></g>';
  s += '</g>';
  if (k > 0) for (let i = 0; i < 34; i++) { const c = (t * 1.6 + rnd(i + 3)) % 1, a = (-40 + rnd(i + 9) * 160) * Math.PI / 180, d = 40 + 380 * c; s += '<circle cx="' + (x + 420 + Math.cos(a) * d).toFixed(0) + '" cy="' + (y - 56 + Math.sin(a) * d * .5 + 220 * c * c).toFixed(0) + '" r="' + (4 + 3 * rnd(i)).toFixed(1) + '" fill="#fff" stroke="#9AB" stroke-width="1" opacity="' + (k * (1 - c)).toFixed(2) + '"/>'; }
  return s; }
// Salzkoerner, die auf Schalti zufliegen (Einstieg)
function spray6c(k, t) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 28; i++) { const c = (t * 1.3 + rnd(i + 21)) % 1; s += '<rect x="' + (900 - 640 * c + 30 * Math.sin(i)).toFixed(0) + '" y="' + (1200 + rnd(i + 4) * 300 + 120 * c).toFixed(0) + '" width="9" height="9" fill="#fff" stroke="#8AA" stroke-width="1.5" transform="rotate(' + (i * 30 + t * 200) + ' ' + (900 - 640 * c).toFixed(0) + ' ' + (1300).toFixed(0) + ')" opacity="' + (k * (1 - c * .5)).toFixed(2) + '"/>'; } return s; }
// Lupe auf ein Salzkorn im Eis: Korn loest sich, Salzwasser entsteht. k Lupe, m Fortschritt 0..1
function grain6c(m, t) { let s = '<rect x="-300" y="-300" width="600" height="600" fill="#BFE6FF"/><path d="M-300 30 Q0 10 300 30 V300 H-300 Z" fill="#8FC3E6" stroke="#E8F7FF" stroke-width="6"/>';
  for (let i = 0; i < 6; i++) s += '<path d="M' + (-260 + i * 100) + ' 80 l40 60 m-20 -30 l30 -20" stroke="#E8F7FF" stroke-width="4" opacity=".7"/>';
  const pr = 60 + 140 * ease(m), sz = 70 * (1 - .85 * ease(cl(m * 1.2)));
  s += '<ellipse cx="0" cy="34" rx="' + pr.toFixed(0) + '" ry="' + (14 + 26 * ease(m)).toFixed(0) + '" fill="#4E7FB8" opacity="' + (.25 + .5 * ease(m)).toFixed(2) + '"/>';
  if (sz > 6) s += '<g transform="translate(0 ' + (30 - sz * .6 + 40 * ease(m)).toFixed(0) + ') rotate(12)"><rect x="' + (-sz / 2) + '" y="' + (-sz / 2) + '" width="' + sz + '" height="' + sz + '" fill="#FFFFFF" stroke="#7FA8C8" stroke-width="5"/><path d="M' + (-sz / 2) + ' ' + (-sz / 2) + ' l' + (sz * .3) + ' ' + (-sz * .25) + ' h' + sz + ' l' + (-sz * .3) + ' ' + (sz * .25) + '" fill="#EAF6FF" stroke="#7FA8C8" stroke-width="4"/></g>';
  s += svgT(0, -150, m < .5 ? 'Salzkorn' : 'Salzwasser', 40, '#0B1020');
  return s; }
function lupe6c(cx, cy, r, inner, k, hx, hy) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + e.toFixed(3) + ')"><clipPath id="lu6c' + cx + '"><circle r="' + r + '"/></clipPath><g clip-path="url(#lu6c' + cx + ')">' + inner + '</g><circle r="' + r + '" fill="none" stroke="#F4F6FB" stroke-width="12"/><circle r="' + (r + 6) + '" fill="none" stroke="#0B1020" stroke-width="4"/></g><path d="M' + hx + ' ' + hy + ' L' + (cx + (hx - cx) * .5 * e).toFixed(0) + ' ' + (cy + (hy - cy) * .5 * e).toFixed(0) + '" stroke="#F4F6FB" stroke-width="6" stroke-dasharray="10 8" opacity="' + cl(k * 2).toFixed(2) + '"/>'; }
// Salzsack (Hand) und Sack Calciumchlorid
const bag6c = (x, y, lab, col, z) => '<g transform="translate(' + x + ' ' + y + ') scale(' + (z || 1) + ')"><path d="M-60 -150 Q-70 -170 -40 -172 H40 Q70 -170 60 -150 L66 0 Q0 12 -66 0 Z" fill="' + col + '" stroke="' + ST6C + '" stroke-width="6"/><rect x="-44" y="-112" width="88" height="60" rx="8" fill="#fff" stroke="' + ST6C + '" stroke-width="4"/>' + svgT(0, -72, lab, 22, ST6C) + '</g>';
// ---------- Teilchen (Wissenschaftsmodus) ----------
function h2o6c(x, y, a, z, op) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + a.toFixed(0) + ') scale(' + (z || 1) + ')" opacity="' + (op === undefined ? 1 : op).toFixed(2) + '"><circle cx="-16" cy="12" r="10" fill="#F4F6FB" stroke="' + ST6C + '" stroke-width="3"/><circle cx="16" cy="12" r="10" fill="#F4F6FB" stroke="' + ST6C + '" stroke-width="3"/><circle r="17" fill="#FF5A6E" stroke="' + ST6C + '" stroke-width="3"/></g>'; }
function ion6c(x, y, na, op) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')" opacity="' + op.toFixed(2) + '"><circle r="' + (na ? 16 : 24) + '" fill="' + (na ? '#B57BFF' : '#3DFF7A') + '" stroke="' + ST6C + '" stroke-width="4"/>' + svgT(0, na ? 7 : 9, na ? '+' : '−', na ? 22 : 28, ST6C) + '</g>'; }
// Gitter: Waben aus Wassermolekuelen (gefroren), oben fluessiges Wasser, Ionen dazwischen
function sci6c(t, ev) { const gi = ev.gitter, io = ev.ionen, ra = ev.rand, wa = ev.warm; let s = '';
  const cx = 540, top = 560, rows = 3, cols = 6, dx = 150, dy = 96;
  const grow = gi === undefined ? 0 : ease(cl(gi / 2));
  const meltK = ra === undefined ? 0 : cl((ra - 1.5) / 3) + (wa !== undefined ? .3 : 0);
  // unteres Eisgitter
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = cx - (cols - 1) * dx / 2 + c * dx + (r % 2 ? dx / 2 : 0), y = top + 390 + r * dy, idx = r * cols + c, show = cl(grow * rows * cols - idx * .9);
    const gone = r === 0 && meltK > c / cols ? 1 : 0; if (show <= 0 || gone) continue; s += h2o6c(x, y + 3 * Math.sin(t * 3 + idx), (idx * 37) % 360, 1.3, show);
    if (c < cols - 1 && show > .5) s += '<path d="M' + (x + 22) + ' ' + y + ' H' + (x + dx - 22) + '" stroke="#5CE1FF" stroke-width="3" stroke-dasharray="6 6" opacity=".7"/>'; }
  // fluessiges Wasser oben, frei bewegt
  for (let i = 0; i < 10; i++) { const x = 200 + rnd(i + 7) * 680 + 40 * Math.sin(t * 1.3 + i), y = top + 110 + rnd(i + 3) * 180 + 24 * Math.cos(t * 1.1 + i * 2); s += h2o6c(x, y, t * 60 + i * 40, 1.25, cl(grow * 2)); }
  if (io !== undefined) { const k = ease(cl(io / 1)); for (let i = 0; i < 6; i++) { const x = 230 + i * 125 + 30 * Math.sin(t * 1.5 + i), y = lerp(700, top + 150 + (i % 2) * 110, k) + 18 * Math.sin(t * 2 + i); s += ion6c(x, y, i % 2 === 0, k); } if (ra === undefined) s += chip3(320, 905, 'Natrium +', 28, '#B57BFF', ST6C, cl((io - 1.2) / .3)) + chip3(760, 905, 'Chlorid −', 28, '#3DFF7A', ST6C, cl((io - 1.5) / .3)); }
  if (ra !== undefined) { const pulse = (t * .9) % 1; for (let c = 0; c < 5; c++) { const x = 300 + c * 120; s += '<path d="M' + x + ' ' + (top + 390 - 40 * pulse) + ' l0 -60" stroke="#FFE14D" stroke-width="6" marker-end="url(#ar6c)" opacity="' + (1 - pulse).toFixed(2) + '"/>'; if (c % 2 === 0) s += '<path d="M' + (x + 40) + ' ' + (top + 290 + 30 * pulse) + ' l0 50" stroke="#5CE1FF" stroke-width="5" opacity="' + ((1 - pulse) * .5).toFixed(2) + '" stroke-dasharray="8 6"/>'; }
    s = '<defs><marker id="ar6c" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FFE14D"/></marker></defs>' + s + chip3(300, 905, 'lösen sich: viele', 26, '#FFE14D', ST6C, cl((ra - .8) / .3)) + chip3(780, 905, 'frieren an: wenige', 26, '#5CE1FF', ST6C, cl((ra - 2.2) / .3)); }
  return s; }

// ---------- Einstieg ----------
WORLD.c6hook = function (sc, ev, t, lt) { const fr = ev.frage, gb = ev.gib, sp = ev.spray; let s = street6c(t);
  const tx = fr === undefined ? 1500 : lerp(1500, 420, ease(cl(fr / 4.2)));
  s += truck6c(tx, t, t, fr !== undefined ? .6 : 0);
  if (sp !== undefined) s += spray6c(Math.sin(Math.PI * cl(sp / 1.4)), t);
  return W(s + shade3()); };
WMASC.c6hook = (ev, t, lt) => { const sp = ev.spray, fr = ev.frage;
  if (sp !== undefined) { const k = ease(cl(sp / .9)), w = Math.sin(Math.PI * cl(sp / 1.2)); return stay3([lerp(330, 180, k), GY6C], 1, { r: -24 * w + 4, mood: 'shock' }); }
  const sl = Math.sin(t * 2.6), wob = fr === undefined ? Math.sin(Math.PI * cl(lt / 2.2)) : .4;
  return stay3([330 + 50 * sl * wob, GY6C], 1, { r: 16 * sl * wob, mood: wob > .5 ? 'shock' : 'happy' }); };

// ---------- Teil 1: Salz wirkt nur geloest ----------
WORLD.c6geloest = function (sc, ev, t, lt) { const lo = ev.loes, wa = ev.wasser, so = ev.sole, h = ''; let s = street6c(t, { melt: so !== undefined ? .4 : 0 });
  if (so !== undefined) { const k = ease(cl(so / 2.4)); s += truck6c(lerp(1300, 520, k), t, t, 0); // Spruehbalken mit Sole
    for (let i = 0; i < 6; i++) { const c = (t * 2 + i / 6) % 1; s += '<path d="M' + (lerp(1300, 520, k) + 140 + i * 40) + ' 1110 q-10 ' + (40 + 60 * c) + ' -30 ' + (70 + 80 * c) + '" stroke="#9FD6FF" stroke-width="6" fill="none" opacity="' + ((1 - c) * cl(so / .6)).toFixed(2) + '"/>'; }
    s += chip3(760, 900, 'Sole = Salzwasser', 30, '#FFE14D', ST6C, cl((so - 1.6) / .3)); }
  // Schalti wirft ein Korn auf das Eis (lo), Lupe darauf (wa)
  if (lo !== undefined && so === undefined) { const a = cl((lo - .8) / .6); if (a < 1) s += '<rect x="' + lerp(300, 600, a).toFixed(0) + '" y="' + (lerp(1400, 1520, a) - 120 * Math.sin(Math.PI * a)).toFixed(0) + '" width="16" height="16" fill="#fff" stroke="#7FA8C8" stroke-width="3"/>'; else s += '<rect x="600" y="1520" width="16" height="16" fill="#fff" stroke="#7FA8C8" stroke-width="3"/>' + '<circle cx="608" cy="1528" r="' + (16 + 10 * Math.sin(t * 3)).toFixed(1) + '" fill="none" stroke="#FFE14D" stroke-width="4"/>'; }
  if (wa !== undefined && so === undefined) s += lupe6c(640, 800, 230, grain6c(cl((wa - .5) / 3), t), ease(cl(wa / .5)), 608, 1510);
  s += bag6c(90, GY6C - 30, 'SALZ', '#E9EEF5', .55);
  return W(s + shade3(), slot(ev, [['loes', 'Wirkt erst gelöst', 'hot'], ['wasser', 'Korn + Wasser = Salzwasser'], ['sole', 'Streudienst: gleich Sole']])); };
WMASC.c6geloest = (ev, t, lt) => { const lo = ev.loes, so = ev.sole;
  if (so !== undefined) { const w = Math.sin(Math.PI * cl((so - .4) / 1.6)); return stay3([300 - 20 * w, GY6C], 1, { r: -8 * w, mood: 'happy' }); }
  if (lo !== undefined) { const th = Math.sin(Math.PI * cl((lo - .3) / .6)); return stay3([300, GY6C - 10 * th], 1, { r: 22 * th, mood: 'happy' }); }
  return stay3([lerp(180, 300, ease(cl(lt / .9))), GY6C], 1, { r: 3 }); };

// ---------- Teil 2: Salz stoert das Gefrieren (Wissenschaftsmodus) ----------
WORLD.c6stoer = function (sc, ev, t, lt) { const bg = fuse33(street6c(t), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '">' + lab33dots() + sci6c(t, ev) + '</g>' + shade3(), slot(ev, [['gitter', 'Eis = festes Gitter'], ['ionen', 'Salz zerfällt in Ionen', 'hot'], ['rand', 'Weniger frieren an'], ['warm', 'Gefriert erst unter 0 °C', 'hot']])); };
WMASC.c6stoer = (ev, t, lt) => { const ra = ev.rand; if (ra !== undefined) { const b = Math.sin(Math.PI * cl((ra - 2.4) / 1.2)); return stay3([200, GY6C - 20 * b], 1, { r: 10 * b, mood: 'happy' }); } return stay3([200, GY6C], 1, { r: 2 * Math.sin(t * 2) }); };

// ---------- Teil 3: Die Grenze ----------
WORLD.c6grenze = function (sc, ev, t, lt) { const zt = ev.zehn, ei = ev.einuz, ca = ev.calc, ve = ev.verbot, sp = ev.splitt; let v = -3;
  if (zt !== undefined) v = lerp(-3, -10, ease(cl(zt / 2))); if (ei !== undefined) v = lerp(-10, -21, ease(cl(ei / 3))); if (ca !== undefined) v = -21;
  if (ve !== undefined) v = lerp(-21, -3, ease(cl(ve / 1.2)));
  const frz = ei !== undefined && ve === undefined ? ease(cl((ei - .8) / 2.4)) : 0;
  let s = street6c(t, { melt: ve === undefined ? 1 : 1 - ease(cl(ve / 1)), frz: frz, grit: sp === undefined ? 0 : cl((sp - .4) / 1.4) });
  s += therm6c(v, zt === undefined ? 0 : cl(zt / .4));
  if (ca !== undefined && ve === undefined) s += bag6c(820, 1060, 'CaCl₂', '#FFE14D', 1.1 * back(cl(ca / .5)));
  if (ve !== undefined && sp === undefined) { const k = cl((ve - .6) / .4); s += '<g opacity="' + k.toFixed(2) + '"><circle cx="980" cy="1250" r="60" fill="#3A3F52" stroke="#FF4D6D" stroke-width="6"/><path d="M944 1214 L1016 1286" stroke="#FF4D6D" stroke-width="8"/></g>'; for (let i = 0; i < 4; i++) s += '<g opacity="' + cl((ve - 1.6 - i * .3) / .3).toFixed(2) + '" transform="translate(' + (640 + i * 70) + ' ' + (1600 - i * 30) + ') rotate(' + (i * 10 - 15) + ')"><ellipse cx="0" cy="0" rx="14" ry="12" fill="#5A4636"/><circle cx="-12" cy="-16" r="6" fill="#5A4636"/><circle cx="0" cy="-20" r="6" fill="#5A4636"/><circle cx="12" cy="-16" r="6" fill="#5A4636"/></g>'; s += chip3(800, 1720, 'Bäume und Hundepfoten', 26, '#FF4D6D', '#fff', cl((ve - 2.6) / .3)); }
  if (sp !== undefined) s += bag6c(90, GY6C - 30, 'SPLITT', '#B4A48C', .55) + chip3(720, 1760, 'taut nicht, aber griffig', 28, '#FFE14D', ST6C, cl((sp - 1.6) / .3));
  else s += bag6c(90, GY6C - 30, 'SALZ', '#E9EEF5', .55);
  return W(s + shade3(), slot(ev, [['zehn', 'Kochsalz: bis etwa −10 °C'], ['einuz', 'Schluss bei rund −21 °C', 'hot'], ['calc', 'Kälter: Calciumchlorid'], ['verbot', 'Privat oft verboten'], ['splitt', 'Splitt macht griffig']])); };
WMASC.c6grenze = (ev, t, lt) => { const ei = ev.einuz, sp = ev.splitt, ve = ev.verbot;
  if (sp !== undefined) { const th = Math.sin(t * 5) * cl(sp / .4) * (1 - cl((sp - 2.2) / .4)); return stay3([lerp(300, 420, ease(cl((sp - 2) / 1.2))), GY6C], 1, { r: 14 * th, mood: 'happy' }); }
  if (ve !== undefined) return stay3([300, GY6C], 1, { r: 3 * Math.sin(t * 2), mood: 'cool' });
  if (ei !== undefined) { const sh = Math.sin(t * 40) * cl((ei - 1.2) / .6); return stay3([300 + 3 * sh, GY6C], 1, { r: 2 * sh, mood: 'shock' }); }
  return stay3([300, GY6C], 1, { r: 2 }); };

// ---------- Schluss ----------
WORLD.c6out = function (sc, ev, t, lt) { return W(street6c(t, { melt: 1 }) + truck6c(-600, t, t, 0) + shade3()); };
WMASC.c6out = (ev, t, lt) => stay3([300, GY6C], 1, { r: 2 });

['c6hook', 'c6geloest', 'c6stoer', 'c6grenze', 'c6out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC6C); });
