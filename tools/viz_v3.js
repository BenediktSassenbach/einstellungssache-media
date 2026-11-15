// Version 3.0 (Vollbild-Design mit Kamera, Farbstimmung und mehr Aktionen): gemeinsame Helfer.
// Alles als var und function, damit die Ladereihenfolge der Dateien keine Rolle spielt. Gehoert nur zu den Dateien viz_*v3.js und videos/*V3.
var HOME3 = [220, 1537];
function BIG3() { return { f: [220, 1537], s: 1, nospin: 1 }; }
function shade3() { return '<defs><linearGradient id="v3t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02030F" stop-opacity=".92"/><stop offset="1" stop-color="#02030F" stop-opacity="0"/></linearGradient></defs><rect x="-300" y="-300" width="1680" height="900" fill="url(#v3t)"/>'; }
function flee3(e, t, a, b, c, d) { const run = Math.abs(Math.sin(t * 17));
  if (e < a) return { f: [220, 1537], s: 1, r: -12, nospin: 1 };
  if (e < b) { const k = (e - a) / (b - a); return { f: [lerp(220, 1300, k), 1537 - 14 * run], s: 1, r: 10, nospin: 1 }; }
  if (e < c) return { f: [-400, 1537], s: 1, nospin: 1 };
  const k = ease(cl((e - c) / (d - c))); return { f: [lerp(-200, 220, k), 1537 - 12 * run * (k < 1 ? 1 : 0)], s: 1, r: k < 1 ? 8 : 4 * Math.sin(t * 9) * (1 - cl((e - d) / .5)), nospin: 1 }; }
// Retro-Sonne hinter der Skyline
function sun3() { let s = '<defs><linearGradient id="sn3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE14D"/><stop offset=".55" stop-color="#FF6BD6"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs><circle cx="540" cy="930" r="420" fill="#FF6BD6" opacity=".12"/><circle cx="540" cy="930" r="300" fill="url(#sn3)" opacity=".9"/>';
  for (let i = 0; i < 7; i++) s += '<rect x="220" y="' + (940 + i * 30 + i * i * 2) + '" width="640" height="' + (5 + i * 3.5) + '" fill="#1B1050"/>'; return s; }
// Farbstimmung: Lichtschein in Serienfarbe, weiche Lichtkreise, Funkeln, dunkler Rand
function grade3(t, col) {
  let s = '<defs><radialGradient id="lk3a"><stop offset="0" stop-color="' + col + '" stop-opacity=".9"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></radialGradient><radialGradient id="lk3b"><stop offset="0" stop-color="#FFB45C" stop-opacity=".9"/><stop offset="1" stop-color="#FFB45C" stop-opacity="0"/></radialGradient><radialGradient id="vg3" cx=".5" cy=".5" r=".78"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient></defs>';
  s += '<circle cx="1010" cy="420" r="540" fill="url(#lk3a)" opacity="' + (.17 + .05 * Math.sin(t * .9)) + '"/><circle cx="40" cy="1260" r="500" fill="url(#lk3b)" opacity="' + (.1 + .04 * Math.sin(t * .7 + 2)) + '"/>';
  for (let i = 0; i < 9; i++) { const y = 1920 - ((t * 16 * (.5 + rnd(i + 810)) + rnd(i + 820) * 1920) % 1920); s += '<circle cx="' + (rnd(i + 800) * 1080 + 30 * Math.sin(t * .5 + i)) + '" cy="' + y + '" r="' + (34 + 70 * rnd(i + 830)) + '" fill="' + (i % 2 ? col : '#fff') + '" opacity="' + (.05 + .03 * Math.sin(t + i)) + '"/>'; }
  for (let i = 0; i < 10; i++) { const q = t * .55 + rnd(i + 850), ph = q % 1, sd = Math.floor(q), k = Math.sin(Math.PI * ph); s += '<path transform="translate(' + (40 + 1000 * rnd(i * 7 + sd + 860)) + ' ' + (330 + 1250 * rnd(i * 3 + sd + 870)) + ') scale(' + (k * (.6 + .8 * rnd(i + 880))) + ') rotate(' + (t * 40) + ')" d="M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z" fill="#fff" opacity=".85"/>'; }
  return s + '<rect width="1080" height="1920" fill="url(#vg3)"/>'; }
// Kamera: faehrt zu Szenenbeginn heran, atmet leicht, zuckt bei jedem neuen Satz kurz. Drehpunkt sind Schaltis Fuesse, damit er auf dem Boden bleibt
function look3(out, sc, t, lt, col) { const i = out.indexOf('>') + 1, j = out.lastIndexOf('</svg>'); if (i <= 0 || j < 0) return out;
  let tl = lt; sc.lines.forEach(l => { const d = t - l.start; if (d >= 0 && d < tl) tl = d; });
  const z = 1 + .16 * (1 - ease(cl(lt / .45))) + .012 * Math.sin(t * .7) + .022 * Math.exp(-tl * 7);
  return out.slice(0, i) + '<g transform="translate(220 1537) scale(' + z.toFixed(4) + ') translate(-220 -1537)">' + out.slice(i, j) + '</g>' + grade3(t, col) + out.slice(j); }
