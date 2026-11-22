// C006H "Warum taut Salz das Eis?" (Chemie, Skript 4 mit Abschnitt 9 vom 22.11.2026, Kostuem C1 Laborkittel), stumme Demo v1.
// Pro Teil eine andere Hauptdarstellung:
//   Einstieg: Schalti rutscht ab dem ersten Bild auf dem Eis, der Streuwagen kommt, beim Versprechen prasselt ihm Salz entgegen.
//   Teil 1: Interaktion im Ort (Korn werfen, die eine Lupe des Videos, Streuwagen spruehrt Sole).
//   Teil 2: Wissenschaftsmodus (Eisgitter, Ionen, Teilchen loesen sich und frieren an), Schalti unten links auf dem Boden.
//   Teil 3: Gegenstand: grosses Strassenthermometer an der Laterne, Frost kriecht zurueck, Verbotsschild, Schalti streut Splitt.
// Nutzt lupeH (viz_hook.js), fuse33, lab33, lab33dots (viz_v33.js), slot (viz_p002.js). Zum Loeschen: diese Datei und videos/C006H.
var AC6H = '#FF6BD6', ST6H = '#0B1020', GY6H = 1537, XH6H = 300, XL6H = 240;
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
  if (!o.noTree) s += tree6h();
  return s; }

const tree6h = () => '<path d="M972 1220 L980 860 M980 960 L1030 880 M978 920 L930 840 M980 1020 L1040 960" stroke="#4A3626" stroke-width="18" stroke-linecap="round"/><path d="M1020 878 q14 -10 22 0 M920 840 q12 -8 20 2" stroke="#F4F8FF" stroke-width="8" stroke-linecap="round"/><ellipse cx="972" cy="1222" rx="44" ry="10" fill="#5A4636" opacity=".6"/>';
// Strassenthermometer, mit zwei Armen an der Laterne verschraubt. v: Gradzahl, k: Einblenden
function therm6h(v, k) { if (k <= 0) return ''; const e = back(cl(k)); const ob = cl(k * 2).toFixed(2); let s = '<g opacity="' + ob + '"><path d="M78 800 H150 M78 940 H150" stroke="#C9CFDC" stroke-width="12" stroke-linecap="round"/><path d="M78 800 H150 M78 940 H150" stroke="' + ST6H + '" stroke-width="3" fill="none" opacity=".6"/><rect x="52" y="788" width="34" height="24" rx="6" fill="#C9CFDC" stroke="' + ST6H + '" stroke-width="4"/><rect x="52" y="928" width="34" height="24" rx="6" fill="#C9CFDC" stroke="' + ST6H + '" stroke-width="4"/></g><g transform="translate(158 880) scale(' + (e * .85).toFixed(3) + ')"><rect x="-10" y="-180" width="170" height="370" rx="24" fill="#F4F6FB" stroke="' + ST6H + '" stroke-width="6"/>';
  for (let i = 0; i <= 6; i++) { const y = -150 + i * 45; s += '<path d="M60 ' + y + ' h' + (i % 2 ? 14 : 26) + '" stroke="' + ST6H + '" stroke-width="4"/>'; }
  s += svgT(122, -140, '+10', 30, ST6H) + svgT(122, -50, '0', 30, ST6H) + svgT(122, 40, '−10', 30, ST6H) + svgT(122, 130, '−20', 30, ST6H);
  const top = -150 + (10 - Math.max(-22, Math.min(10, v))) * 9, col = v < -10 ? '#5C8BFF' : '#FF4D6D';
  s += '<rect x="34" y="-160" width="20" height="310" rx="10" fill="#DDE3EE" stroke="' + ST6H + '" stroke-width="3"/><rect x="37" y="' + top.toFixed(1) + '" width="14" height="' + (150 - top).toFixed(1) + '" rx="7" fill="' + col + '"/><circle cx="44" cy="158" r="24" fill="' + col + '" stroke="' + ST6H + '" stroke-width="4"/>';
  s += '<rect x="-10" y="200" width="170" height="64" rx="16" fill="' + ST6H + '" stroke="#F4F6FB" stroke-width="4"/>' + svgT(75, 250, (v > 0.4 ? '+' : (v < -0.4 ? '−' : '')) + Math.abs(Math.round(v)) + ' °C', 50, v < -10 ? '#9FC2FF' : '#FFB4C0') + '</g>'; return s; }
// Streuwagen (faehrt nach links), k: Salz fliegt, sole: Spruehbalken
function truck6h(x, t, k, sole) { const y = 1112; let s = '<g transform="translate(' + x.toFixed(0) + ' ' + y + ')">';
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
function sign6h(k) { if (k <= 0) return ''; return '<g transform="translate(820 1470) scale(1)" opacity="' + cl(k).toFixed(2) + '"><ellipse cx="0" cy="4" rx="30" ry="7" fill="#000" opacity=".25"/><rect x="-7" y="-100" width="14" height="104" fill="#9AA0AE" stroke="' + ST6H + '" stroke-width="4"/><circle cy="-150" r="62" fill="#fff" stroke="#E8384F" stroke-width="12"/>' + [[-22, -136], [6, -144], [-6, -118], [22, -122]].map(([x, y]) => '<rect x="' + (x - 12) + '" y="' + (y - 12) + '" width="24" height="24" fill="#fff" stroke="' + ST6H + '" stroke-width="4" transform="rotate(15 ' + x + ' ' + y + ')"/>').join('') + '<path d="M-40 -190 L40 -110" stroke="#E8384F" stroke-width="12" stroke-linecap="round"/></g>'; }
function paws6h(k) { let s = ''; for (let i = 0; i < 5; i++) { const op = cl((k - i * .18) / .2); if (op <= 0) continue; s += '<g opacity="' + op.toFixed(2) + '" transform="translate(' + (520 + i * 80) + ' ' + (1640 - i * 22 + (i % 2) * 26) + ') rotate(' + (i * 6 - 18) + ')"><ellipse rx="15" ry="12" fill="#5A4636"/><circle cx="-13" cy="-17" r="6" fill="#5A4636"/><circle cx="0" cy="-22" r="6" fill="#5A4636"/><circle cx="13" cy="-17" r="6" fill="#5A4636"/><circle r="26" fill="none" stroke="#FF4D6D" stroke-width="4" opacity=".7"/></g>'; } return s; }
// Splitt fliegt aus Schaltis Schaufel in Boegen auf das Eis
function grit6h(k, sx, sy) { let s = ''; for (let i = 0; i < 46; i++) { const f = cl((k - rnd(i + 11) * .55) / .45); if (f <= 0) continue; const tx = 200 + rnd(i + 2) * 820, ty = 1460 + rnd(i + 8) * 230, e = ease(f), x = lerp(sx, tx, e), y = lerp(sy, ty, e) - 160 * Math.sin(Math.PI * f);
    s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (5 + rnd(i) * 4).toFixed(1) + '" fill="' + ['#8A7A68', '#B4A48C', '#6E6458'][i % 3] + '" stroke="' + ST6H + '" stroke-width="2"/>'; } return s; }

// ---------- Teilchen (Wissenschaftsmodus) ----------
function h2o6h(x, y, a, z, op) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + a.toFixed(0) + ') scale(' + (z || 1) + ')" opacity="' + (op === undefined ? 1 : op).toFixed(2) + '"><circle cx="-16" cy="12" r="10" fill="#F4F6FB" stroke="' + ST6H + '" stroke-width="3"/><circle cx="16" cy="12" r="10" fill="#F4F6FB" stroke="' + ST6H + '" stroke-width="3"/><circle r="17" fill="#FF5A6E" stroke="' + ST6H + '" stroke-width="3"/></g>'; }
function ion6h(x, y, na, op) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')" opacity="' + op.toFixed(2) + '"><circle r="' + (na ? 21 : 29) + '" fill="' + (na ? '#D9BFFF' : '#3DFF7A') + '" stroke="' + ST6H + '" stroke-width="4"/>' + svgT(0, na ? 7 : 8, na ? 'Na⁺' : 'Cl⁻', na ? 17 : 20, ST6H) + '</g>'; }
// Gitter aus Wassermolekuelen (gefroren), oben fluessiges Wasser, Ionen dazwischen. Pfeile: gelb loesen sich, blau frieren an
function sci6h(t, ev) { const gi = ev.gitter, io = ev.ionen, ra = ev.rand, wa = ev.warm; let s = '<defs><marker id="ar6h" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0 L6 3 L0 6 Z" fill="#FFE14D"/></marker><marker id="ab6h" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0 L6 3 L0 6 Z" fill="#5CE1FF"/></marker></defs>';
  const cx = 520, top = 600, rows = 3, cols = 6, dx = 124, dy = 86;
  const grow = gi === undefined ? 0 : ease(cl(gi / 2));
  const meltK = ra === undefined ? 0 : cl((ra - 1.5) / 3) + (wa !== undefined ? .3 + .5 * cl(wa / 2) : 0);
  const io2 = io === undefined ? 0 : ease(cl(io / 1.2)), pops = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x0 = cx - (cols - 1) * dx / 2 + c * dx + (r % 2 ? dx / 2 : 0), y0 = top + 320 + r * dy, idx = r * cols + c;
    const arr = gi === undefined ? 0 : cl((gi - .15 - idx * .09) / .5); if (arr <= 0) continue; // fliegt von oben an seinen Platz
    const gone = (r === 0 && meltK > c / cols) || (r === 1 && meltK > 1 + c / cols * .4); if (gone) { continue; }
    const push = r === 0 ? io2 * 10 * Math.sin(c * 2.1 + t * 5) : 0, sx = 240 + rnd(idx + 50) * 640, sy = top + 60 + rnd(idx + 51) * 120, e = ease(arr);
    const x = lerp(sx, x0, e) + push, y = lerp(sy, y0, e) + (arr >= 1 ? 3 * Math.sin(t * 3 + idx) : 0);
    s += h2o6h(x, y, lerp(t * 120 + idx * 40, (idx * 37) % 360, e), 1.3, 1);
    const fl = (gi || 0) - .65 - idx * .09; if (fl > 0 && fl < .3) s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (20 + 50 * fl / .3).toFixed(0) + '" fill="none" stroke="#5CE1FF" stroke-width="' + (6 * (1 - fl / .3)).toFixed(1) + '"/>';
    if (c < cols - 1 && arr >= 1) s += '<path d="M' + (x0 + 22) + ' ' + y0 + ' H' + (x0 + dx - 22) + '" stroke="#5CE1FF" stroke-width="3" stroke-dasharray="6 6" opacity=".7"/>'; }
  for (let i = 0; i < 7; i++) { const x = 240 + rnd(i + 7) * 640 + 40 * Math.sin(t * 1.3 + i), y = top + 90 + rnd(i + 3) * 170 + 24 * Math.cos(t * 1.1 + i * 2); s += h2o6h(x, y, t * 60 + i * 40, 1.25, cl((gi || 0) * 2)); }
  if (io !== undefined) for (let i = 0; i < 6; i++) { const f = cl((io - i * .12) / .8), x = 270 + i * 120 + 30 * Math.sin(t * 1.5 + i) * f, yT = top + 150 + (i % 2) * 110, y = lerp(top + 100, yT, ease(f)) + 18 * Math.sin(t * 2 + i) * f;
    s += ion6h(x, y, i % 2 === 0, cl(f * 3)); if (f > .9 && f < 1) s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="46" fill="none" stroke="' + (i % 2 === 0 ? '#B57BFF' : '#3DFF7A') + '" stroke-width="5"/>'; }
  if (ra !== undefined || wa !== undefined) { const N = 6; for (let j = 0; j < N; j++) { const c = (t * .55 + j / N) % 1, x = 300 + j * 100 + 20 * Math.sin(j * 3); // Teilchen springen aus dem Gitter nach oben
      s += h2o6h(x + 30 * Math.sin(c * 6 + j), top + 310 - 200 * c, t * 200 + j * 50, 1.2, (1 - c) * .95) + '<path d="M' + x + ' ' + (top + 380 - 200 * c) + ' v40" stroke="#FFE14D" stroke-width="6" marker-start="url(#ar6h)" opacity="' + ((1 - c) * .8).toFixed(2) + '"/>'; }
    const c2 = (t * .3) % 1; s += h2o6h(820, top + 180 + 160 * c2, t * 90, 1.2, Math.sin(Math.PI * c2)) + '<path d="M820 ' + (top + 130 + 160 * c2) + ' v-40" stroke="#5CE1FF" stroke-width="6" marker-start="url(#ab6h)" opacity="' + Math.sin(Math.PI * c2).toFixed(2) + '"/>'; }
  return s; }

// ---------- Einstieg ----------
// Einstieg: ab Bild 1 rutscht Schalti aus, faellt auf den Ruecken und schlittert uebers Eis. Der Streuwagen bremst neben ihm,
// beim Versprechen bekommt er eine Ladung Salz ab und wird zurueckgeschoben, wo Koerner landen, tauen kleine Loecher ins Eis.
const HA6H = 210, HB6H = 760; // Start und Ende der Rutschpartie
function hookX6h(ev, lt) { const lo = ev.loop; if (lo !== undefined) return lerp(HB6H, 240, ease(cl(lo / 1.3)));
  if (lt < .45) return lerp(HA6H, 270, lt / .45); return lerp(270, HB6H, 1 - Math.pow(1 - cl((lt - .45) / 3.9), 3)); }
function holes6h(k, t) { let s = ''; for (let i = 0; i < 9; i++) { const f = cl((k - i * .07) / .5); if (f <= 0) continue; const x = 320 + rnd(i + 41) * 620, y = 1470 + rnd(i + 43) * 200, r = 10 + 26 * ease(f);
    s += '<ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + (r * 1.6).toFixed(1) + '" ry="' + (r * .6).toFixed(1) + '" fill="#4E7FB8" opacity=".7" stroke="#E8F7FF" stroke-width="3"/><rect x="' + (x - 5).toFixed(0) + '" y="' + (y - 5).toFixed(0) + '" width="10" height="10" fill="#fff" opacity="' + (1 - f).toFixed(2) + '"/>'; } return s; }
WORLD.c6hHook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; let s = street6h(t, { noTree: 1 });
  let tx = lerp(1700, 1500, cl((lt - 1) / .8)); if (fr !== undefined) tx = lerp(1500, 360, ease(cl(fr / 2.2))); if (lo !== undefined) tx = lerp(360, -1000, cl((lo - 1.4) / 1.4) ** 1.6);
  if (lo !== undefined) s += holes6h(cl((lo - .5) / 1.6), t);
  s += truck6h(tx, t, fr !== undefined && lo === undefined ? .25 : 0) + tree6h();
  s += bag6h(78, GY6H - 24, 'SALZ', '#E9EEF5', .55);
  // Eissplitter hinter dem Rutschenden, Aufprallstern bei der Landung
  const x = hookX6h(ev, lt); if (lt > .45 && lt < 4.4 && lo === undefined) { const sp = 1 - cl((lt - .45) / 3.9); for (let i = 0; i < 14; i++) { const c = (t * 3 + i / 14) % 1; s += '<circle cx="' + (x - 120 - 160 * c + 20 * Math.sin(i * 3)).toFixed(0) + '" cy="' + (GY6H - 10 - 70 * c * (1 - c) * 4 + 10 * Math.sin(i)).toFixed(0) + '" r="' + (3 + 3 * rnd(i)).toFixed(1) + '" fill="#F2FBFF" opacity="' + (sp * (1 - c)).toFixed(2) + '"/>'; }
    for (let i = 0; i < 3; i++) s += '<path d="M' + (x - 150 - i * 30) + ' ' + (GY6H - 40 - i * 30) + ' h' + (-80 * sp) + '" stroke="#F2FBFF" stroke-width="6" stroke-linecap="round" opacity="' + (.7 * sp).toFixed(2) + '"/>'; }
  const imp = lt - .45; if (imp > 0 && imp < .35 && lo === undefined) { const c = imp / .35; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; s += '<path d="M' + (270 + Math.cos(a) * 60 * (1 + c)).toFixed(0) + ' ' + (GY6H - 60 + Math.sin(a) * 40 * (1 + c)).toFixed(0) + ' l' + (Math.cos(a) * 40).toFixed(0) + ' ' + (Math.sin(a) * 28).toFixed(0) + '" stroke="#FFE14D" stroke-width="7" stroke-linecap="round" opacity="' + (1 - c).toFixed(2) + '"/>'; } }
  if (lo !== undefined) { const k = Math.sin(Math.PI * cl(lo / 1.5)); for (let i = 0; i < 36; i++) { const c = (t * 1.6 + rnd(i + 21)) % 1, sx = tx + 420, px = sx - (sx - hookX6h(ev, lt) + 60) * c, py = 1110 + (GY6H - 1210) * c + 40 * Math.sin(i) ; s += '<rect x="' + px.toFixed(0) + '" y="' + py.toFixed(0) + '" width="11" height="11" fill="#fff" stroke="#8AA" stroke-width="1.5" transform="rotate(' + (i * 30 + t * 300).toFixed(0) + ' ' + (px + 5).toFixed(0) + ' ' + (py + 5).toFixed(0) + ')" opacity="' + (k * (1 - c * .3)).toFixed(2) + '"/>'; } }
  return W(s + shade3()); };
// Drehung um die Koerpermitte (die Pipeline dreht um die Fuesse): Fuesse so setzen, dass die Mitte ueber dem Eis bleibt
function rot6h(cx, r, lift, mood) { const a = r * Math.PI / 180, cy = GY6H - 100 * Math.abs(Math.cos(a)) - 60 * Math.abs(Math.sin(a)) - (lift || 0);
  return stay3([cx - 100 * Math.sin(a), cy + 100 * Math.cos(a)], 1, { r: r, mood: mood || 'shock' }); }
WMASC.c6hHook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop, x = hookX6h(ev, lt);
  if (lo !== undefined) { const w = Math.sin(Math.PI * cl(lo / 1.3)); return stay3([x, GY6H], 1, { r: -18 * w, mood: 'shock' }); }
  if (fr !== undefined) { const up = ease(cl(fr / .7)), wob = Math.sin(t * 9) * (1 - cl((fr - .7) / 1)) * up; return rot6h(x, lerp(-630, -720, up) + 10 * wob, 20 * Math.sin(Math.PI * up)); }
  if (lt < .45) { const k = lt / .45; return rot6h(x, -90 * ease(k), 50 * Math.sin(Math.PI * k)); } // faellt ab Bild 0
  const sp = 1 - Math.pow(1 - cl((lt - .45) / 3.9), 3); return rot6h(x, -90 - 540 * sp, 6 * Math.abs(Math.sin(t * 7)) * (1 - sp)); }; // dreht sich beim Schlittern

// ---------- Teil 1: Salz wirkt nur geloest (Interaktion im Ort, die eine Lupe) ----------
const GX6H = 640, GYG6H = 1540; // dort landet das Korn
WORLD.c6hGeloest = function (sc, ev, t, lt) { const lo = ev.loes, wa = ev.wasser, so = ev.sole;
  const wet = 0; let s = street6h(t, { melt: so === undefined ? 0 : .3 * cl(so / 2), noTree: 1 }) + holes6h(1, t); // Loecher aus dem Einstieg bleiben
  s += bag6h(78, GY6H - 24, 'SALZ', '#E9EEF5', .55);
  if (lo !== undefined) { const G = [[GX6H, GYG6H], [470, 1500], [560, 1620], [760, 1490], [840, 1600], [960, 1540]]; // Handvoll Koerner, jedes taut ein Loch
    G.forEach(([gx0, gy0], i) => { const a = cl((lo - .9 - i * .06) / .7); if (a <= 0) return; const gx = lerp(110, gx0, a), gy = lerp(1380, gy0, a) - 240 * Math.sin(Math.PI * a);
      if (a < 1) s += '<rect x="' + (gx - 9).toFixed(0) + '" y="' + (gy - 9).toFixed(0) + '" width="18" height="18" fill="#fff" stroke="#7FA8C8" stroke-width="3" transform="rotate(' + (a * 400).toFixed(0) + ' ' + gx.toFixed(0) + ' ' + gy.toFixed(0) + ')"/>';
      else { const g = so !== undefined ? 1 : cl((lo - 1.6 - i * .06) / (wa === undefined ? 2.5 : 1)) + (wa !== undefined ? cl(wa / 4) : 0), r = 8 + 30 * ease(cl(g)), c = (t * 1.1 + i * .3) % 1;
        s += '<ellipse cx="' + gx0 + '" cy="' + gy0 + '" rx="' + (r * 1.6).toFixed(1) + '" ry="' + (r * .6).toFixed(1) + '" fill="#3E6FA8" opacity=".75" stroke="#E8F7FF" stroke-width="3"/><ellipse cx="' + gx0 + '" cy="' + gy0 + '" rx="' + (r * 1.6 + 40 * c).toFixed(1) + '" ry="' + (r * .6 + 14 * c).toFixed(1) + '" fill="none" stroke="#E8F7FF" stroke-width="3" opacity="' + (.8 * (1 - c)).toFixed(2) + '"/>';
        if (g < 1) s += '<rect x="' + (gx0 - 8) + '" y="' + (gy0 - 8) + '" width="' + (16 * (1 - g * .8)).toFixed(1) + '" height="' + (16 * (1 - g * .8)).toFixed(1) + '" fill="#fff" stroke="#7FA8C8" stroke-width="2"/>'; } }); }
  if (wa !== undefined && so === undefined) s += lupeH(540, 900, 220, grain6h(cl((wa - .4) / 3), t), ease(cl(wa / .5)), GX6H, GYG6H - 20);
  if (so !== undefined) { const tx = lerp(1150, -900, cl(so / 4.2)); s += '<rect x="' + Math.max(0, tx + 120).toFixed(0) + '" y="1030" width="1080" height="180" fill="#5E7FA8" opacity=".4"/>' + truck6h(tx, t, 1, 1); }
  s += tree6h();
  return W(s + shade3(), slot(ev, [['loes', 'Wirkt erst gelöst', 'hot'], ['wasser', 'Es entsteht Salzwasser'], ['sole', 'Streudienst sprüht Sole']])); };
WMASC.c6hGeloest = (ev, t, lt) => { const lo = ev.loes, so = ev.sole;
  if (so !== undefined) { const j = Math.sin(Math.PI * cl((so - 1.6) / .6)); return stay3([XH6H - 40 * ease(cl((so - 1.6) / .6)), GY6H - 24 * j], 1, { r: -10 * j, mood: j > .2 ? 'shock' : 'happy' }); }
  if (lo !== undefined) { const bend = Math.sin(Math.PI * cl((lo - .2) / .6)), th = Math.sin(Math.PI * cl((lo - .8) / .35)); return stay3([XH6H - 50 * bend, GY6H - 14 * th], 1, { r: -18 * bend + 20 * th, mood: 'happy' }); }
  return stay3([mv6h(240, XH6H, lt / .8), GY6H - 20 * Math.sin(Math.PI * cl(lt / .8))], 1, { r: 3 }); };

// ---------- Teil 2: Salz stoert das Gefrieren (Wissenschaftsmodus, nur hier) ----------
WORLD.c6hStoer = function (sc, ev, t, lt) { const bg = fuse33(street6h(t, { melt: .3, wet: 1 }) + holes6h(1, t) + [[GX6H, GYG6H], [470, 1500], [560, 1620], [760, 1490], [840, 1600], [960, 1540]].map(([x, y]) => '<ellipse cx="' + x + '" cy="' + y + '" rx="61" ry="23" fill="#3E6FA8" opacity=".75" stroke="#E8F7FF" stroke-width="3"/>').join(''), sc, t, lt); const m = lab33(sc, t);
  let s = bg + '<g opacity="' + (1 - m).toFixed(3) + '">' + bag6h(78, GY6H - 24, 'SALZ', '#E9EEF5', .55) + '</g>'; if (ev.rehook !== undefined && ev.gitter === undefined) { const c = (t * .8) % 1; s += '<ellipse cx="' + GX6H + '" cy="' + GYG6H + '" rx="' + (40 + 120 * c).toFixed(0) + '" ry="' + (10 + 30 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="5" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  return W(s + '<g opacity="' + m.toFixed(3) + '">' + lab33dots() + sci6h(t, ev) + '</g>' + shade3(), slot(ev, [['gitter', 'Eis = festes Gitter'], ['ionen', 'Salz zerfällt in Ionen', 'hot'], ['rand', 'Weniger frieren an'], ['warm', 'Gefriert erst unter 0 °C', 'hot']])); };
WMASC.c6hStoer = (ev, t, lt) => { const rh = ev.rehook, ra = ev.rand, wa = ev.warm;
  if (wa !== undefined) { const b = Math.sin(Math.PI * cl((wa - .6) / .8)); return stay3([XL6H, GY6H - 40 * b], 1, { r: 6 * b, mood: 'happy' }); }
  if (ra !== undefined) return stay3([XL6H, GY6H], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  if (ev.gitter !== undefined) return stay3([XL6H, GY6H], 1, { r: 2 * Math.sin(t * 2), mood: ev.ionen !== undefined ? 'shock' : 'happy' });
  const k = rh === undefined ? 0 : cl((rh - .3) / .7), j = Math.sin(Math.PI * k); return stay3([mv6h(260, XL6H, k), GY6H - 26 * j], 1, { r: -10 * j, mood: 'happy' }); };

// ---------- Teil 3: Die Grenze (Thermometer an der Laterne, Frost, Splitt) ----------
WORLD.c6hGrenze = function (sc, ev, t, lt) { const rh = ev.rehook, zt = ev.zehn, ei = ev.einuz, ve = ev.verbot, sp = ev.splitt; let v = -2;
  if (rh !== undefined) v = lerp(-2, -8, ease(cl(rh / 1.6))); if (zt !== undefined) v = lerp(-8, -10, ease(cl(zt / 1.5))); if (ei !== undefined) v = lerp(-10, -21, ease(cl(ei / 1.2)));
  const frz = ve !== undefined ? 0 : (ei !== undefined ? .35 + .65 * ease(cl((ei - .8) / 2.4)) : (zt !== undefined ? .35 * cl((zt - .8) / 3) : 0));
  let s = street6h(t, { melt: ve === undefined ? 1 : 1 - ease(cl(ve / 1)), frz: frz, wet: 1 - (ve !== undefined ? 1 : 0) });
  const cold = rh === undefined ? 0 : Math.max(.45 * cl(rh / .6), cl((10 - v) / 28)) * (ve === undefined ? 1 : 1 - cl(ve / 1)); // je kaelter, desto mehr Schnee und Atem
  for (let i = 0; i < 55; i++) { const c = (t * (.12 + .06 * rnd(i + 60)) + rnd(i + 61)) % 1, x = rnd(i + 62) * 1080 + 30 * Math.sin(t + i); if (rnd(i + 63) < cold) s += '<circle cx="' + x.toFixed(0) + '" cy="' + (680 + 1000 * c).toFixed(0) + '" r="' + (6 + 6 * rnd(i + 64)).toFixed(1) + '" fill="#fff" opacity=".85"/>'; }
  if (cold > .2 && sp === undefined) for (let j = 0; j < 2; j++) { const c = (t * .7 + j * .5) % 1; s += '<circle cx="' + (XH6H + 90 + 70 * c).toFixed(0) + '" cy="' + (GY6H - 150 - 30 * c).toFixed(0) + '" r="' + (12 + 26 * c).toFixed(0) + '" fill="#EAF2FF" opacity="' + (.6 * (1 - c) * cold).toFixed(2) + '"/>'; }
  const fz = ei === undefined || ve !== undefined ? (ve !== undefined ? 1 - cl(ve / .6) : 0) : cl((ei - 1.5) / 1.2); // Eis friert um Schaltis Fuesse
  if (fz > 0 && sp === undefined) s += '<path d="M' + (XH6H - 90) + ' ' + (GY6H + 8) + ' l14 ' + (-46 * fz).toFixed(0) + ' l30 10 l20 ' + (-30 * fz).toFixed(0) + ' l40 6 l26 ' + (-40 * fz).toFixed(0) + ' l30 14 l10 ' + (40 * fz).toFixed(0) + ' Z" fill="#CFEFFF" opacity=".85" stroke="#F2FBFF" stroke-width="4"/>';
  s += therm6h(v, rh === undefined ? 0 : cl(rh / .5) * (ve === undefined ? 1 : 1 - cl(ve / .5)));
  if (zt !== undefined && ve === undefined) { const a = cl((zt - .9) / .6), gx = lerp(110, 700, a), gy = lerp(1380, 1580, a) - 220 * Math.sin(Math.PI * a); // Korn bleibt bei der Kaelte einfach liegen
    s += '<rect x="' + (gx - 9).toFixed(0) + '" y="' + (gy - 9).toFixed(0) + '" width="18" height="18" fill="#fff" stroke="#7FA8C8" stroke-width="3"/>'; if (a >= 1) { const c = (t * .9) % 1; s += '<circle cx="700" cy="1580" r="' + (16 + 30 * c).toFixed(0) + '" fill="none" stroke="#F2FBFF" stroke-width="4" stroke-dasharray="6 6" opacity="' + (1 - c).toFixed(2) + '"/>'; } }
  if (ve !== undefined && sp === undefined) { const c = (t * 1.1) % 1; s += '<ellipse cx="972" cy="1222" rx="' + (50 + 50 * c).toFixed(0) + '" ry="' + (12 + 12 * c).toFixed(0) + '" fill="none" stroke="#FF4D6D" stroke-width="5" opacity="' + ((1 - c) * cl((ve - 1.2) / .4)).toFixed(2) + '"/>'; }
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
  if (ev.zehn !== undefined) { const z = ev.zehn, bend = Math.sin(Math.PI * cl((z - .2) / .6)), th = Math.sin(Math.PI * cl((z - .8) / .35)); return stay3([XH6H - 40 * bend, GY6H - 14 * th], 1, { r: -16 * bend + 20 * th, mood: z > 2 ? 'shock' : 'happy' }); }
  if (rh !== undefined) return stay3([mv6h(XL6H, XH6H, lt / .8), GY6H - 30 * Math.sin(Math.PI * cl(lt / .8))], 1, { r: 3, mood: 'shock' });
  return stay3([XH6H, GY6H], 1, { r: 2 }); };

// ---------- Schluss ----------
WORLD.c6hOut = function (sc, ev, t, lt) { return W(street6h(t, { melt: 0 }) + grit6h(1, 0, 0) + bag6h(78, GY6H - 24, 'SPLITT', '#B4A48C', .55) + shade3()); };
WMASC.c6hOut = (ev, t, lt) => stay3([XH6H + 120 * Math.sin(Math.PI * cl(lt / 6)), GY6H - 8 * Math.abs(Math.sin(t * 7)) * (lt < 6 ? 1 : 0)], 1, { flip: lt > 3 && lt < 6 ? 1 : 0, r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['c6hHook', 'c6hGeloest', 'c6hStoer', 'c6hGrenze', 'c6hOut'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC6H); });
