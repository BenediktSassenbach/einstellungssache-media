// C006H "Warum taut Salz das Eis?" (Chemie, Skript 4 mit Abschnitt 9 vom 22.11.2026, Kostuem C1 Laborkittel), stumme Demo v1.
// Pro Teil eine andere Hauptdarstellung:
//   Einstieg: Schalti rutscht ab dem ersten Bild auf dem Eis, der Streuwagen kommt, beim Versprechen prasselt ihm Salz entgegen.
//   Teil 1: Interaktion im Ort (Korn werfen, die eine Lupe des Videos, Streuwagen spruehrt Sole).
//   Teil 2: Wissenschaftsmodus (Eisgitter, Ionen, Teilchen loesen sich und frieren an), Schalti unten links auf dem Boden.
//   Teil 3: Gegenstand: grosses Strassenthermometer an der Laterne, Frost kriecht zurueck, Verbotsschild, Schalti streut Splitt.
// Nutzt lupeH (viz_hook.js), fuse33, lab33, lab33dots (viz_v33.js), slot (viz_p002.js). Zum Loeschen: diese Datei und videos/C006H.
var AC6H = '#FF6BD6', ST6H = '#0B1020', GY6H = 1537, XH6H = 300, XL6H = 200;
const mv6h = (a, b, k) => lerp(a, b, ease(cl(k)));

// ---------- Der Ort: Wohnstrasse am Winterabend ----------
function street6h(t, o) { o = o || {}; let s = '<defs><linearGradient id="sk6h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16204A"/><stop offset=".6" stop-color="#4B5C9E"/><stop offset="1" stop-color="#C9A6C8"/></linearGradient><linearGradient id="ic6h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFEFFF"/><stop offset="1" stop-color="#8FC3E6"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk6h)"/>';
  for (let i = 0; i < 26; i++) s += '<circle cx="' + (rnd(i + 5) * 1080).toFixed(0) + '" cy="' + (60 + rnd(i + 9) * 380).toFixed(0) + '" r="' + (1.5 + rnd(i + 3) * 2).toFixed(1) + '" fill="#fff" opacity="' + (.3 + .4 * Math.abs(Math.sin(t * .5 + i))).toFixed(2) + '"/>';
  s += '<circle cx="860" cy="250" r="46" fill="#FFF3D0" opacity=".9"/><circle cx="878" cy="238" r="40" fill="#2A3772" opacity=".55"/>';
  // Haeuser mit Schnee auf dem Dach, Eiszapfen, Schornstein mit Rauch
  const H = [[-20, 630, 250, '#8E5A4A'], [220, 600, 230, '#5E6F9E'], [440, 650, 260, '#A9784C'], [690, 615, 240, '#6A8A7A'], [920, 640, 200, '#9A5C6E']]; // Daecher unter dem Titelbereich
  H.forEach(([x, y, w, c], i) => { if (i === 3) { /* nur rechts Rauch, Titelbereich bleibt frei */ const cx = x + w * .72; s += '<rect x="' + (cx - 18) + '" y="' + (y - 30) + '" width="36" height="70" fill="#5A3A30" stroke="' + ST6H + '" stroke-width="4"/>';
      for (let j = 0; j < 3; j++) { const c2 = (t * .25 + j / 3 + i * .2) % 1; s += '<circle cx="' + (cx + 20 * c2 + 8 * Math.sin(t + j)).toFixed(0) + '" cy="' + (y - 40 - 60 * c2).toFixed(0) + '" r="' + (12 + 18 * c2).toFixed(0) + '" fill="#DCE2F2" opacity="' + (.35 * (1 - c2)).toFixed(2) + '"/>'; } }
    s += '<path d="M' + x + ' ' + (y + 60) + ' L' + (x + w / 2) + ' ' + (y - 40) + ' L' + (x + w) + ' ' + (y + 60) + ' V1010 H' + x + ' Z" fill="' + c + '" stroke="' + ST6H + '" stroke-width="5"/><path d="M' + (x - 10) + ' ' + (y + 64) + ' L' + (x + w / 2) + ' ' + (y - 46) + ' L' + (x + w + 10) + ' ' + (y + 64) + ' L' + (x + w - 10) + ' ' + (y + 50) + ' Q' + (x + w / 2) + ' ' + (y - 10) + ' ' + (x + 10) + ' ' + (y + 50) + ' Z" fill="#F4F8FF" stroke="' + ST6H + '" stroke-width="4"/>';
    for (let k = 0; k < 5; k++) s += '<path d="M' + (x + 14 + k * (w - 28) / 4) + ' ' + (y + 62) + ' l6 ' + (18 + 10 * rnd(i * 7 + k)).toFixed(0) + ' l6 -' + (18 + 10 * rnd(i * 7 + k)).toFixed(0) + '" fill="#DFF4FF" stroke="#9FC8E6" stroke-width="2"/>';
    for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) { if (y + 110 + r * 130 + 62 > 920) continue; const on = (Math.floor(t * .2 + i * 1.7 + r + k * 2) % 5) !== 0; s += '<rect x="' + (x + 36 + k * (w - 120)) + '" y="' + (y + 110 + r * 130) + '" width="48" height="62" rx="4" fill="' + (on ? '#FFD98A' : '#2A3560') + '" stroke="' + ST6H + '" stroke-width="4"/><path d="M' + (x + 60 + k * (w - 120)) + ' ' + (y + 110 + r * 130) + ' v62" stroke="' + ST6H + '" stroke-width="3"/>'; }
    s += '<rect x="' + (x + w / 2 - 26) + '" y="930" width="52" height="80" rx="6" fill="#4A3426" stroke="' + ST6H + '" stroke-width="4"/><circle cx="' + (x + w / 2 + 14) + '" cy="972" r="4" fill="#FFD98A"/>'; });
  // Schneewall mit Zaun und Schneemann
  s += '<path d="M0 1000 Q120 976 240 996 T520 990 T800 998 T1080 990 V1030 H0 Z" fill="#F4F8FF" stroke="' + ST6H + '" stroke-width="4"/>';
  for (let x = 150; x < 600; x += 60) s += '<rect x="' + x + '" y="955" width="12" height="50" rx="3" fill="#7A5A44" stroke="' + ST6H + '" stroke-width="3"/>';
  s += '<path d="M150 970 H600 M150 990 H600" stroke="#7A5A44" stroke-width="6"/>';
  s += '<rect x="0" y="1030" width="1080" height="180" fill="#3A3F52"/><path d="M0 1120 H1080" stroke="#F4F8FF" stroke-width="8" stroke-dasharray="60 50" opacity=".6"/>';
  if (o.wet) s += '<rect x="0" y="1030" width="1080" height="180" fill="#5E7FA8" opacity="' + (.35 * cl(o.wet)).toFixed(2) + '"/>';
  // Gehweg mit Eisflaeche
  s += '<rect x="0" y="1210" width="1080" height="710" fill="#7C8296"/><path d="M0 1210 H1080" stroke="#C9CDD8" stroke-width="12"/>';
  for (let i = 0; i < 6; i++) s += '<path d="M' + (i * 200 - 40) + ' 1216 L' + (i * 200 - 120) + ' 1920" stroke="#666C80" stroke-width="5"/>';
  const melt = cl(o.melt || 0), frz = cl(o.frz || 0);
  s += '<path d="M-20 1440 Q200 1400 520 1430 Q820 1460 1100 1420 V1700 Q800 1740 500 1710 Q200 1690 -20 1720 Z" fill="url(#ic6h)" stroke="#E8F7FF" stroke-width="6" opacity="' + (1 - .65 * melt + .65 * frz * melt).toFixed(2) + '"/>';
  if (melt > 0) s += '<path d="M60 1500 Q300 1470 560 1500 Q840 1530 1040 1490 V1650 Q760 1690 480 1660 Q240 1640 60 1660 Z" fill="#5E7FA8" opacity="' + (.55 * melt * (1 - frz)).toFixed(2) + '"/>';
  if (frz > 0 && melt > 0) for (let i = 0; i < 14; i++) { const bx = 80 + i * 70, by = 1510 + 120 * rnd(i + 30), L = 70 * frz; s += '<path d="M' + bx + ' ' + by.toFixed(0) + ' l' + L.toFixed(0) + ' 0 M' + (bx + L * .5).toFixed(0) + ' ' + (by - L * .45).toFixed(0) + ' l0 ' + (L * .9).toFixed(0) + ' M' + (bx + L * .2).toFixed(0) + ' ' + (by - L * .3).toFixed(0) + ' l' + (L * .6).toFixed(0) + ' ' + (L * .6).toFixed(0) + ' M' + (bx + L * .8).toFixed(0) + ' ' + (by - L * .3).toFixed(0) + ' l' + (-L * .6).toFixed(0) + ' ' + (L * .6).toFixed(0) + '" stroke="#F2FBFF" stroke-width="4" stroke-linecap="round" opacity="' + (.9 * frz).toFixed(2) + '"/>'; }
  s += '<path d="M120 1480 q120 -14 240 -2 M640 1520 q120 -10 220 4" stroke="#fff" stroke-width="7" fill="none" opacity=".7" stroke-linecap="round"/>';
  // Laterne links (mit Halterung fuer das Thermometer), Baum rechts
  s += '<rect x="58" y="560" width="22" height="660" fill="#2A3048" stroke="' + ST6H + '" stroke-width="4"/><path d="M40 560 h58 l-10 -40 h-38 Z" fill="#2A3048" stroke="' + ST6H + '" stroke-width="4"/><circle cx="69" cy="545" r="16" fill="#FFE9A8"/><circle cx="69" cy="560" r="120" fill="#FFE9A8" opacity=".12"/>';
  s += '<path d="M972 1220 L980 860 M980 960 L1030 880 M978 920 L930 840 M980 1020 L1040 960" stroke="#4A3626" stroke-width="18" stroke-linecap="round"/><path d="M1020 878 q14 -10 22 0 M920 840 q12 -8 20 2" stroke="#F4F8FF" stroke-width="8" stroke-linecap="round"/><ellipse cx="972" cy="1222" rx="44" ry="10" fill="#5A4636" opacity=".6"/>';
  return s; }

// Strassenthermometer, mit zwei Armen an der Laterne verschraubt. v: Gradzahl, k: Einblenden
function therm6h(v, k) { if (k <= 0) return ''; const e = back(cl(k)); const ob = cl(k * 2).toFixed(2); let s = '<g opacity="' + ob + '"><path d="M78 800 H150 M78 940 H150" stroke="#C9CFDC" stroke-width="12" stroke-linecap="round"/><path d="M78 800 H150 M78 940 H150" stroke="' + ST6H + '" stroke-width="3" fill="none" opacity=".6"/><rect x="52" y="788" width="34" height="24" rx="6" fill="#C9CFDC" stroke="' + ST6H + '" stroke-width="4"/><rect x="52" y="928" width="34" height="24" rx="6" fill="#C9CFDC" stroke="' + ST6H + '" stroke-width="4"/></g><g transform="translate(158 880) scale(' + (e * .85).toFixed(3) + ')"><rect x="-10" y="-180" width="170" height="370" rx="24" fill="#F4F6FB" stroke="' + ST6H + '" stroke-width="6"/>';
  for (let i = 0; i <= 6; i++) { const y = -150 + i * 45; s += '<path d="M60 ' + y + ' h' + (i % 2 ? 14 : 26) + '" stroke="' + ST6H + '" stroke-width="4"/>'; }
  s += svgT(122, -140, '+10', 30, ST6H) + svgT(122, -50, '0', 30, ST6H) + svgT(122, 40, '−10', 30, ST6H) + svgT(122, 130, '−20', 30, ST6H);
  const top = -150 + (10 - Math.max(-22, Math.min(10, v))) * 9, col = v < -10 ? '#5C8BFF' : '#FF4D6D';
  s += '<rect x="34" y="-160" width="20" height="310" rx="10" fill="#DDE3EE" stroke="' + ST6H + '" stroke-width="3"/><rect x="37" y="' + top.toFixed(1) + '" width="14" height="' + (150 - top).toFixed(1) + '" rx="7" fill="' + col + '"/><circle cx="44" cy="158" r="24" fill="' + col + '" stroke="' + ST6H + '" stroke-width="4"/>';
  s += '<rect x="-10" y="200" width="170" height="64" rx="16" fill="' + ST6H + '" stroke="#F4F6FB" stroke-width="4"/>' + svgT(75, 246, (v > 0.4 ? '+' : (v < -0.4 ? '−' : '')) + Math.abs(Math.round(v)) + ' °C', 38, v < -10 ? '#9FC2FF' : '#FFB4C0') + '</g>'; return s; }
// Streuwagen (faehrt nach links), k: Salz fliegt, sole: Spruehbalken
function truck6h(x, t, k, sole) { const y = 1150; let s = '<g transform="translate(' + x.toFixed(0) + ' ' + y + ')">';
  s += '<ellipse cx="160" cy="6" rx="260" ry="16" fill="#000" opacity=".25"/>';
  s += '<path d="M-70 -40 V-170 Q-70 -200 -40 -200 H60 L100 -120 V-40 Z" fill="#FF8A1E" stroke="' + ST6H + '" stroke-width="6" stroke-linejoin="round"/><path d="M-50 -180 H42 L76 -120 H-50 Z" fill="#9FD6FF" stroke="' + ST6H + '" stroke-width="5"/>';
  s += '<rect x="100" y="-190" width="300" height="150" rx="10" fill="#E9EEF5" stroke="' + ST6H + '" stroke-width="6"/><path d="M110 -190 L150 -230 H360 L400 -190 Z" fill="#DCE4EE" stroke="' + ST6H + '" stroke-width="5"/>';
  for (let i = 0; i < 9; i++) s += '<circle cx="' + (170 + i * 22) + '" cy="' + (-206 + 6 * Math.sin(i)) + '" r="10" fill="#FFFFFF" stroke="#B8C2D0" stroke-width="2"/>';
  s += '<path d="M110 -110 H390" stroke="#FF8A1E" stroke-width="14"/><path d="M110 -110 H390" stroke="' + ST6H + '" stroke-width="3" stroke-dasharray="30 30"/>';
  s += '<rect x="-60" y="-216" width="40" height="16" rx="6" fill="#FFB020" stroke="' + ST6H + '" stroke-width="4"/><circle cx="-40" cy="-208" r="' + (14 + 8 * Math.abs(Math.sin(t * 6))).toFixed(1) + '" fill="#FFB020" opacity=".3"/>';
  for (const cx of [0, 300]) s += '<circle cx="' + cx + '" cy="-30" r="38" fill="#1B1E2A" stroke="' + ST6H + '" stroke-width="5"/><circle cx="' + cx + '" cy="-30" r="16" fill="#9AA0AE" transform="rotate(' + (t * 300) + ' ' + cx + ' -30)"/>';
  if (sole) s += '<rect x="120" y="-16" width="300" height="12" rx="6" fill="#5A6070" stroke="' + ST6H + '" stroke-width="3"/>';
  else s += '<g transform="translate(420 -60)"><rect x="-8" y="-30" width="16" height="30" fill="#5A6070" stroke="' + ST6H + '" stroke-width="3"/><ellipse cx="0" cy="4" rx="40" ry="10" fill="#9AA0AE" stroke="' + ST6H + '" stroke-width="4"/><path d="M-30 4 L30 4" stroke="' + ST6H + '" stroke-width="3" transform="rotate(' + (t * 720) + ' 0 4)"/></g>';
  s += '</g>';
  if (k > 0 && !sole) for (let i = 0; i < 34; i++) { const c = (t * 1.6 + rnd(i + 3)) % 1, a = (-40 + rnd(i + 9) * 160) * Math.PI / 180, d = 40 + 380 * c; s += '<circle cx="' + (x + 420 + Math.cos(a) * d).toFixed(0) + '" cy="' + (y - 56 + Math.sin(a) * d * .5 + 220 * c * c).toFixed(0) + '" r="' + (4 + 3 * rnd(i)).toFixed(1) + '" fill="#fff" stroke="#9AB" stroke-width="1" opacity="' + (k * (1 - c)).toFixed(2) + '"/>'; }
  if (k > 0 && sole) for (let i = 0; i < 10; i++) { const c = (t * 2 + i / 10) % 1, px = x + 140 + i * 28; s += '<path d="M' + px + ' ' + (y - 6) + ' q-6 ' + (20 + 30 * c).toFixed(0) + ' -14 ' + (34 + 36 * c).toFixed(0) + '" stroke="#9FD6FF" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (k * (1 - c)).toFixed(2) + '"/>'; }
  return s; }
// Salzkoerner, die auf Schalti zufliegen (Einstieg)
function spray6h(k, t) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 28; i++) { const c = (t * 1.3 + rnd(i + 21)) % 1, x = 900 - 640 * c + 30 * Math.sin(i), y = 1200 + rnd(i + 4) * 260 + 120 * c; s += '<rect x="' + x.toFixed(0) + '" y="' + y.toFixed(0) + '" width="10" height="10" fill="#fff" stroke="#8AA" stroke-width="1.5" transform="rotate(' + (i * 30 + t * 200).toFixed(0) + ' ' + (x + 5).toFixed(0) + ' ' + (y + 5).toFixed(0) + ')" opacity="' + (k * (1 - c * .5)).toFixed(2) + '"/>'; } return s; }
// Inhalt der Lupe: Korn loest sich, Salzwasser breitet sich aus (ohne Beschriftung, das Etikett sagt es)
function grain6h(m, t) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#BFE6FF"/><path d="M-320 30 Q0 10 320 30 V320 H-320 Z" fill="#8FC3E6" stroke="#E8F7FF" stroke-width="6"/>';
  for (let i = 0; i < 6; i++) s += '<path d="M' + (-260 + i * 100) + ' 80 l40 60 m-20 -30 l30 -20" stroke="#E8F7FF" stroke-width="4" opacity=".7"/>';
  const em = ease(m), pr = 60 + 160 * em, sz = 90 * (1 - .9 * ease(cl(m * 1.2)));
  s += '<ellipse cx="0" cy="34" rx="' + pr.toFixed(0) + '" ry="' + (14 + 30 * em).toFixed(0) + '" fill="#2E5F9E" opacity="' + (.35 + .55 * em).toFixed(2) + '"/>';
  for (let i = 0; i < 8; i++) { const c = (t * .7 + i / 8) % 1, a = i * .785; if (m > .1) s += '<rect x="' + (Math.cos(a) * (20 + pr * c)).toFixed(0) + '" y="' + (30 + Math.sin(a) * (6 + 20 * c)).toFixed(0) + '" width="8" height="8" fill="#FFFFFF" opacity="' + ((1 - c) * cl(m * 3)).toFixed(2) + '"/>'; }
  if (sz > 8) s += '<g transform="translate(0 ' + (30 - sz * .6 + 40 * em).toFixed(0) + ') rotate(12)"><rect x="' + (-sz / 2) + '" y="' + (-sz / 2) + '" width="' + sz + '" height="' + sz + '" fill="#FFFFFF" stroke="#7FA8C8" stroke-width="5"/><path d="M' + (-sz / 2) + ' ' + (-sz / 2) + ' l' + (sz * .3) + ' ' + (-sz * .25) + ' h' + sz + ' l' + (-sz * .3) + ' ' + (sz * .25) + '" fill="#EAF6FF" stroke="#7FA8C8" stroke-width="4"/></g>';
  return s; }
// Sack (steht auf dem Gehweg)
const bag6h = (x, y, lab, col, z) => '<g transform="translate(' + x + ' ' + y + ') scale(' + (z || 1) + ')"><ellipse cx="0" cy="4" rx="70" ry="10" fill="#000" opacity=".25"/><path d="M-60 -150 Q-70 -170 -40 -172 H40 Q70 -170 60 -150 L66 0 Q0 12 -66 0 Z" fill="' + col + '" stroke="' + ST6H + '" stroke-width="6"/><rect x="-56" y="-116" width="112" height="66" rx="8" fill="#fff" stroke="' + ST6H + '" stroke-width="4"/>' + svgT(0, -70, lab, 30, ST6H) + '</g>';
// Verbotsschild auf einem Pfosten am Gehweg: durchgestrichener Salzsack
function sign6h(k) { if (k <= 0) return ''; return '<g transform="translate(900 1440) scale(1)" opacity="' + cl(k).toFixed(2) + '"><ellipse cx="0" cy="4" rx="30" ry="7" fill="#000" opacity=".25"/><rect x="-7" y="-150" width="14" height="154" fill="#9AA0AE" stroke="' + ST6H + '" stroke-width="4"/><circle cy="-200" r="62" fill="#fff" stroke="#E8384F" stroke-width="12"/>' + [[-22, -186], [6, -194], [-6, -168], [22, -172]].map(([x, y]) => '<rect x="' + (x - 12) + '" y="' + (y - 12) + '" width="24" height="24" fill="#fff" stroke="' + ST6H + '" stroke-width="4" transform="rotate(15 ' + x + ' ' + y + ')"/>').join('') + '<path d="M-40 -240 L40 -160" stroke="#E8384F" stroke-width="12" stroke-linecap="round"/></g>'; }
function paws6h(k) { let s = ''; for (let i = 0; i < 5; i++) { const op = cl((k - i * .18) / .2); if (op <= 0) continue; s += '<g opacity="' + op.toFixed(2) + '" transform="translate(' + (520 + i * 80) + ' ' + (1640 - i * 22 + (i % 2) * 26) + ') rotate(' + (i * 6 - 18) + ')"><ellipse rx="15" ry="12" fill="#5A4636"/><circle cx="-13" cy="-17" r="6" fill="#5A4636"/><circle cx="0" cy="-22" r="6" fill="#5A4636"/><circle cx="13" cy="-17" r="6" fill="#5A4636"/><circle r="26" fill="none" stroke="#FF4D6D" stroke-width="4" opacity=".7"/></g>'; } return s; }
// Splitt fliegt aus Schaltis Schaufel in Boegen auf das Eis
function grit6h(k, sx, sy) { let s = ''; for (let i = 0; i < 46; i++) { const f = cl((k - rnd(i + 11) * .55) / .45); if (f <= 0) continue; const tx = 200 + rnd(i + 2) * 820, ty = 1460 + rnd(i + 8) * 230, e = ease(f), x = lerp(sx, tx, e), y = lerp(sy, ty, e) - 160 * Math.sin(Math.PI * f);
    s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (5 + rnd(i) * 4).toFixed(1) + '" fill="' + ['#8A7A68', '#B4A48C', '#6E6458'][i % 3] + '" stroke="' + ST6H + '" stroke-width="2"/>'; } return s; }

// ---------- Teilchen (Wissenschaftsmodus) ----------
function h2o6h(x, y, a, z, op) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + a.toFixed(0) + ') scale(' + (z || 1) + ')" opacity="' + (op === undefined ? 1 : op).toFixed(2) + '"><circle cx="-16" cy="12" r="10" fill="#F4F6FB" stroke="' + ST6H + '" stroke-width="3"/><circle cx="16" cy="12" r="10" fill="#F4F6FB" stroke="' + ST6H + '" stroke-width="3"/><circle r="17" fill="#FF5A6E" stroke="' + ST6H + '" stroke-width="3"/></g>'; }
function ion6h(x, y, na, op) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')" opacity="' + op.toFixed(2) + '"><circle r="' + (na ? 21 : 29) + '" fill="' + (na ? '#B57BFF' : '#3DFF7A') + '" stroke="' + ST6H + '" stroke-width="4"/>' + svgT(0, na ? 9 : 11, na ? '+' : '−', na ? 30 : 36, ST6H) + '</g>'; }
// Gitter aus Wassermolekuelen (gefroren), oben fluessiges Wasser, Ionen dazwischen. Pfeile: gelb loesen sich, blau frieren an
function sci6h(t, ev) { const gi = ev.gitter, io = ev.ionen, ra = ev.rand, wa = ev.warm; let s = '<defs><marker id="ar6h" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FFE14D"/></marker><marker id="ab6h" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#5CE1FF"/></marker></defs>';
  const cx = 560, top = 600, rows = 3, cols = 6, dx = 140, dy = 92;
  const grow = gi === undefined ? 0 : ease(cl(gi / 2));
  const meltK = ra === undefined ? 0 : cl((ra - 1.5) / 3) + (wa !== undefined ? .3 + .5 * cl(wa / 2) : 0);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = cx - (cols - 1) * dx / 2 + c * dx + (r % 2 ? dx / 2 : 0), y = top + 360 + r * dy, idx = r * cols + c, show = cl(grow * rows * cols - idx * .9);
    const gone = (r === 0 && meltK > c / cols) || (r === 1 && meltK > 1 + c / cols * .4) ? 1 : 0; if (show <= 0 || gone) continue; s += h2o6h(x, y + 3 * Math.sin(t * 3 + idx), (idx * 37) % 360, 1.3, show);
    if (c < cols - 1 && show > .5) s += '<path d="M' + (x + 22) + ' ' + y + ' H' + (x + dx - 22) + '" stroke="#5CE1FF" stroke-width="3" stroke-dasharray="6 6" opacity=".7"/>'; }
  for (let i = 0; i < 7; i++) { const x = 240 + rnd(i + 7) * 640 + 40 * Math.sin(t * 1.3 + i), y = top + 90 + rnd(i + 3) * 170 + 24 * Math.cos(t * 1.1 + i * 2); s += h2o6h(x, y, t * 60 + i * 40, 1.25, cl(grow * 2)); }
  if (io !== undefined) { const k = ease(cl(io / 1)); for (let i = 0; i < 6; i++) { const x = 270 + i * 120 + 30 * Math.sin(t * 1.5 + i), y = lerp(top + 100, top + 150 + (i % 2) * 110, k) + 18 * Math.sin(t * 2 + i); s += ion6h(x, y, i % 2 === 0, k); } }
  if (ra !== undefined) { const pulse = (t * .9) % 1; for (let c = 0; c < 5; c++) { const x = 330 + c * 120; s += '<path d="M' + x + ' ' + (top + 360 - 40 * pulse) + ' l0 -60" stroke="#FFE14D" stroke-width="6" marker-end="url(#ar6h)" opacity="' + (1 - pulse).toFixed(2) + '"/>'; if (c % 2 === 0) s += '<path d="M' + (x + 40) + ' ' + (top + 250 + 30 * pulse) + ' l0 50" stroke="#5CE1FF" stroke-width="5" marker-end="url(#ab6h)" opacity="' + ((1 - pulse) * .6).toFixed(2) + '"/>'; } }
  return s; }

// ---------- Einstieg ----------
WORLD.c6hHook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; let s = street6h(t);
  const tx = fr === undefined ? 1500 : lerp(1500, -900, cl(fr / 5.4)); // faehrt durch und verschwindet links
  s += truck6h(tx, t, fr !== undefined ? .6 : 0);
  if (lo !== undefined) s += spray6h(Math.sin(Math.PI * cl(lo / 1.6)), t);
  return W(s + shade3()); };
WMASC.c6hHook = (ev, t, lt) => { const lo = ev.loop;
  if (lo !== undefined) { const k = ease(cl(lo / .9)), w = Math.sin(Math.PI * cl(lo / 1.4)); return stay3([lerp(XH6H, 240, k), GY6H], 1, { r: -20 * w + 4, mood: 'shock' }); }
  const sl = Math.sin(t * 3.2), fade = 1 - .5 * cl((ev.frage || 0) / 1.5); // rutscht ab dem ersten Bild
  return stay3([XH6H + 60 * sl * fade, GY6H], 1, { r: 22 * sl * fade, mood: 'shock' }); };

// ---------- Teil 1: Salz wirkt nur geloest (Interaktion im Ort, die eine Lupe) ----------
const GX6H = 640, GYG6H = 1540; // dort landet das Korn
WORLD.c6hGeloest = function (sc, ev, t, lt) { const lo = ev.loes, wa = ev.wasser, so = ev.sole;
  const wet = so === undefined ? 0 : cl((so - 1) / 1.5); let s = street6h(t, { melt: wet * .5, wet: wet });
  s += bag6h(78, GY6H - 24, 'SALZ', '#E9EEF5', .55);
  if (lo !== undefined && so === undefined) { const a = cl((lo - .9) / .7); // Korn fliegt aus dem Sack ueber Schalti aufs Eis
    if (a > 0) { const gx = lerp(110, GX6H, a), gy = lerp(1380, GYG6H, a) - 220 * Math.sin(Math.PI * a); s += '<rect x="' + (gx - 9).toFixed(0) + '" y="' + (gy - 9).toFixed(0) + '" width="18" height="18" fill="#fff" stroke="#7FA8C8" stroke-width="3" transform="rotate(' + (a * 400).toFixed(0) + ' ' + gx.toFixed(0) + ' ' + gy.toFixed(0) + ')"/>';
      if (a >= 1) { const c = (t * 1.2) % 1; s += '<circle cx="' + GX6H + '" cy="' + GYG6H + '" r="' + (14 + 40 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="5" opacity="' + (1 - c).toFixed(2) + '"/>'; } } }
  if (wa !== undefined && so === undefined) s += lupeH(540, 900, 220, grain6h(cl((wa - .4) / 3), t), ease(cl(wa / .5)), GX6H, GYG6H - 20);
  if (so !== undefined) s += truck6h(lerp(1350, 420, ease(cl(so / 2.2))), t, cl(so / .5), 1);
  return W(s + shade3(), slot(ev, [['loes', 'Wirkt erst gelöst', 'hot'], ['wasser', 'Es entsteht Salzwasser'], ['sole', 'Streudienst sprüht Sole']])); };
WMASC.c6hGeloest = (ev, t, lt) => { const lo = ev.loes, so = ev.sole;
  if (so !== undefined) { const j = Math.sin(Math.PI * cl((so - 1.6) / .6)); return stay3([XH6H - 40 * ease(cl((so - 1.6) / .6)), GY6H - 24 * j], 1, { r: -10 * j, mood: j > .2 ? 'shock' : 'happy' }); }
  if (lo !== undefined) { const bend = Math.sin(Math.PI * cl((lo - .2) / .6)), th = Math.sin(Math.PI * cl((lo - .8) / .35)); return stay3([XH6H - 50 * bend, GY6H - 14 * th], 1, { r: -18 * bend + 20 * th, mood: 'happy' }); }
  return stay3([mv6h(240, XH6H, lt / .8), GY6H - 20 * Math.sin(Math.PI * cl(lt / .8))], 1, { r: 3 }); };

// ---------- Teil 2: Salz stoert das Gefrieren (Wissenschaftsmodus, nur hier) ----------
WORLD.c6hStoer = function (sc, ev, t, lt) { const bg = fuse33(street6h(t, { melt: .3, wet: 1 }) + bag6h(78, GY6H - 24, 'SALZ', '#E9EEF5', .55), sc, t, lt); const m = lab33(sc, t);
  let s = bg; if (ev.rehook !== undefined && ev.gitter === undefined) { const c = (t * .8) % 1; s += '<ellipse cx="' + GX6H + '" cy="' + GYG6H + '" rx="' + (40 + 120 * c).toFixed(0) + '" ry="' + (10 + 30 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="5" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  return W(s + '<g opacity="' + m.toFixed(3) + '">' + lab33dots() + sci6h(t, ev) + '</g>' + shade3(), slot(ev, [['gitter', 'Eis = festes Gitter'], ['ionen', 'Salz zerfällt in Ionen', 'hot'], ['rand', 'Weniger frieren an'], ['warm', 'Gefriert erst unter 0 °C', 'hot']])); };
WMASC.c6hStoer = (ev, t, lt) => { const rh = ev.rehook, ra = ev.rand, wa = ev.warm;
  if (wa !== undefined) { const b = Math.sin(Math.PI * cl((wa - .6) / .8)); return stay3([XL6H, GY6H - 40 * b], 1, { r: 6 * b, mood: 'happy' }); }
  if (ra !== undefined) return stay3([XL6H, GY6H], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  if (ev.gitter !== undefined) return stay3([XL6H, GY6H], 1, { r: 2 * Math.sin(t * 2), mood: ev.ionen !== undefined ? 'shock' : 'happy' });
  const k = rh === undefined ? 0 : cl((rh - .3) / .7), j = Math.sin(Math.PI * k); return stay3([mv6h(260, XL6H, k), GY6H - 26 * j], 1, { r: -10 * j, mood: 'happy' }); };

// ---------- Teil 3: Die Grenze (Thermometer an der Laterne, Frost, Splitt) ----------
WORLD.c6hGrenze = function (sc, ev, t, lt) { const rh = ev.rehook, zt = ev.zehn, ei = ev.einuz, ve = ev.verbot, sp = ev.splitt; let v = -2;
  if (rh !== undefined) v = lerp(-2, -4, ease(cl(rh / 1.5))); if (zt !== undefined) v = lerp(-4, -10, ease(cl(zt / 2))); if (ei !== undefined) v = lerp(-10, -21, ease(cl(ei / 3)));
  if (ve !== undefined) v = lerp(-21, -4, ease(cl(ve / 1.2)));
  const frz = ei !== undefined && ve === undefined ? ease(cl((ei - .8) / 2.4)) : 0;
  let s = street6h(t, { melt: ve === undefined ? 1 : 1 - ease(cl(ve / 1)), frz: frz, wet: 1 - (ve !== undefined ? 1 : 0) });
  s += therm6h(v, rh === undefined ? 0 : cl(rh / .5) * (ve === undefined ? 1 : 1 - cl((ve - .8) / .5)));
  if (ve !== undefined && sp === undefined) s += sign6h(cl((ve - .3) / .5)) + paws6h(cl((ve - 1.6) / 1.4));
  const sk = sp === undefined ? 0 : cl((sp - .3) / 1.8); if (sk > 0) s += grit6h(sk, XH6H + 70, GY6H - 120);
  const sw6 = sp === undefined ? 0 : ease(cl(sp / .5)); // Salzsack rutscht nach links raus, Splittsack kommt herein
  if (sw6 < 1) s += bag6h(78 - 200 * sw6, GY6H - 24, 'SALZ', '#E9EEF5', .55);
  if (sw6 > 0) s += bag6h(-122 + 200 * sw6, GY6H - 24, 'SPLITT', '#B4A48C', .55);
  return W(s + shade3(), slot(ev, [['zehn', 'Kochsalz: bis etwa −10 °C'], ['einuz', 'Schluss bei rund −21 °C', 'hot'], ['verbot', 'Privat oft verboten'], ['splitt', 'Splitt macht griffig']])); };
WMASC.c6hGrenze = (ev, t, lt) => { const rh = ev.rehook, ei = ev.einuz, sp = ev.splitt, ve = ev.verbot;
  if (sp !== undefined) { const sw = Math.sin(t * 7) * cl((sp - .3) / .3) * (1 - cl((sp - 2.1) / .3)), st = Math.abs(Math.sin(Math.PI * cl((sp - 2.4) / 1.2) * 2)); return stay3([XH6H, GY6H - 14 * st], 1, { r: 14 * sw, mood: 'happy' }); }
  if (ve !== undefined) return stay3([XH6H, GY6H], 1, { r: 3 * Math.sin(t * 2), mood: 'cool' });
  if (ei !== undefined) { const sh = Math.sin(t * 40) * cl((ei - 1.2) / .6); return stay3([XH6H + 3 * sh, GY6H], 1, { r: 2 * sh, mood: 'shock' }); }
  if (rh !== undefined) return stay3([mv6h(XL6H, XH6H, lt / .8), GY6H - 30 * Math.sin(Math.PI * cl(lt / .8))], 1, { r: 3, mood: 'shock' });
  return stay3([XH6H, GY6H], 1, { r: 2 }); };

// ---------- Schluss ----------
WORLD.c6hOut = function (sc, ev, t, lt) { return W(street6h(t, { melt: 0 }) + grit6h(1, 0, 0) + bag6h(78, GY6H - 24, 'SPLITT', '#B4A48C', .55) + shade3()); };
WMASC.c6hOut = (ev, t, lt) => stay3([XH6H, GY6H], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['c6hHook', 'c6hGeloest', 'c6hStoer', 'c6hGrenze', 'c6hOut'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC6H); });
