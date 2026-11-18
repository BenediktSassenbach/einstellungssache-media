// B006 "Wie gefaehrlich war der Velociraptor?" (Bio, Dino-Skript, Kostuem B2 Dino-Kostuem), Fassung v3 (18.11.2026).
// Benedikts Wunsch nach v2: keine Tiere ohne Grund (kein Truthahn, kein Verwandter, kein Vogel), nichts zusammengequetscht,
// keine Fluegel-Optik, dafuer genau zeigen, was ihn gefaehrlich machte: Sichelkralle, Zaehne, Handkrallen, Kampf-Fund.
// Ort: Urzeit-Lichtung (urD aus viz_b001d.js), Nahaufnahmen im Ort (Fuss, Kopf), Grabungsstelle in der Mongolei.
// Einstieg (wie v2): riesiger Film-Schatten an der Felswand, heraus kommt der kleine Raptor, jagt eine Libelle, zwickt Schalti.
// Teil 1: Massband an der Huefte, Nahaufnahme Fuss mit erhobener Sichelkralle, Schritte ohne Bodenkontakt, Zwei-Zehen-Faehrte.
// Teil 2: Nahaufnahme Kopf, Schalti zaehlt die Zaehne, Lupe auf die Zackung, Lupe auf die Hand, Sprint mit steifem Schwanz.
// Teil 3: Grabung, Kampf-Fund mit Velociraptor und Protoceratops, Kralle am Hals und Biss in den Arm markiert, KI-Bild.
// Zum Loeschen: diese Datei, viz_b006img.js (falls vorhanden) und videos/B006. sk und h3 in rexd bleiben fuer spaetere Folgen.
var RAP6 = { a: '#3FA9F5', b: '#1E6FC2', be: '#EAF6FF', sp: '#1B5DA8' }, FC6 = ['#1E6FC2', '#5DB8FF'], AC6 = '#A8E63C', ST6 = '#0B1020';
var RX6 = 760, RY6 = 1130, RS6 = 1.15; // Raptor steht auf der hinteren Wiese, ueber der Textzeile (Texte verdecken nichts)
function rap6(x, y, s, t, o) { return '<g data-figur="Raptor">' + rexd(x, y, s, t, Object.assign({ kind: 'rap', pal: RAP6, tl: .74, fa: 1, feath: .8, fcol: FC6, sk: 1, h3: 1, wing: 0, id: 'v' }, o)) + '</g>'; }
const sg6 = (d, w, c) => '<path d="' + d + '" stroke="' + ST6 + '" stroke-width="' + (w + 12) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="' + d + '" stroke="' + c + '" stroke-width="' + w + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
const claw6 = (x, y, r, z) => '<path transform="translate(' + x + ' ' + y + ') rotate(' + r + ') scale(' + z + ')" d="M0 -14 C-30 -16 -52 4 -54 34 C-40 16 -24 10 0 14 Z" fill="#F4EBD0" stroke="' + ST6 + '" stroke-width="5" stroke-linejoin="round"/>';
const ch6 = (...a) => { const c = chip3(...a); return c ? '<g data-text="1">' + c + '</g>' : ''; };
function cliff6() { return '<defs><linearGradient id="cl6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D8A47A"/><stop offset="1" stop-color="#9C6B4A"/></linearGradient></defs><path d="M330 1040 L360 760 L430 640 L560 600 L700 560 L860 590 L980 540 L1100 560 V1040 Z" fill="url(#cl6)" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><path d="M470 700 l30 80 l-14 60 M760 620 l-20 90 l26 70 M930 640 l16 110" stroke="#7A4E32" stroke-width="6" fill="none" stroke-linecap="round"/>'; }
function shad6(x, y, s, t, o, op) { return '<clipPath id="cl6c"><path d="M330 1040 L360 760 L430 640 L560 600 L700 560 L860 590 L980 540 L1100 560 V1040 Z"/></clipPath><g clip-path="url(#cl6c)"><g style="filter:brightness(0)" opacity="' + op.toFixed(3) + '">' + rexd(x, y, s, t, Object.assign({ kind: 'rap', pal: RAP6, shadow: 0, tl: .74, id: 'sh' }, o)) + '</g></g>'; }
function lupe6(cx, cy, r, inner, k, hx, hy) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + e.toFixed(3) + ')"><clipPath id="lu6' + cx + '"><circle r="' + r + '"/></clipPath><circle r="' + r + '" fill="#FFF6DF"/><g clip-path="url(#lu6' + cx + ')">' + inner + '</g><circle r="' + r + '" fill="none" stroke="#F4F6FB" stroke-width="12"/><circle r="' + (r + 6) + '" fill="none" stroke="#0B1020" stroke-width="4"/></g><path d="M' + (cx - r * .7 * e).toFixed(0) + ' ' + (cy + r * .7 * e).toFixed(0) + ' L' + hx + ' ' + hy + '" stroke="#F4F6FB" stroke-width="20" stroke-linecap="round" opacity="' + cl(k * 2).toFixed(2) + '"/>'; }
function fly6(x, y, t) { const w = Math.sin(t * 60) * 14; return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"><ellipse cx="-6" cy="-6" rx="20" ry="' + (6 + Math.abs(w) * .3).toFixed(1) + '" fill="#DDF6FF" opacity=".7" transform="rotate(' + (-30 + w) + ')"/><ellipse cx="6" cy="-6" rx="20" ry="' + (6 + Math.abs(w) * .3).toFixed(1) + '" fill="#DDF6FF" opacity=".7" transform="rotate(' + (30 - w) + ')"/><path d="M-30 0 H22" stroke="#2FB8A8" stroke-width="7" stroke-linecap="round"/><circle cx="26" cy="0" r="7" fill="#1E7A70"/></g>'; }
const peck6 = t => 30 * Math.max(0, Math.sin(t * 4.4)) * (Math.sin(t * 1.1) > -.3 ? 1 : 0);
// Pflanzen: die Randfarne gehoeren zum Hintergrund (hinter dem Raptor). Vorn liegt nur noch die untere Wiese ab y 1540,
// damit keine Halme ueber dem Raptor oder der Textzeile liegen (Benedikt, 18.11.2026).
function bg6(U, t) { let f = ''; for (let i = 0; i < 4; i++) f += frondD(-10, 1170, -62 + i * 16, 230, t, i % 2 ? '#35A85C' : '#22874A', i); for (let i = 0; i < 4; i++) f += frondD(1090, 1170, -118 - i * 16, 240, t, i % 2 ? '#22874A' : '#35A85C', i + 5); return U.b + f; }
const fg6 = t => lowD(t, 1, 1540);
// Matschfleck fuer die Faehrte
const mud6 = () => '<ellipse cx="820" cy="1132" rx="300" ry="34" fill="#7A5A36" opacity=".9"/><ellipse cx="800" cy="1126" rx="260" ry="22" fill="#8C6A42" opacity=".8"/>';
// Abdruck mit zwei Zehen, Zehen zeigen nach rechts (Laufrichtung). n: Zaehl-Nummern (0 bis 1)
function print6(x, y, k, n) { if (k <= 0) return ''; let g = '<g data-figur="Faehrte" transform="translate(' + x + ' ' + y + ') scale(' + (back(cl(k)) * 1.2).toFixed(3) + ' ' + (back(cl(k)) * .7).toFixed(3) + ')" opacity="' + cl(k * 2).toFixed(2) + '"><ellipse cx="0" cy="0" rx="30" ry="15" fill="#24160A"/><path d="M14 -5 L88 -15 M12 6 L74 15" stroke="#24160A" stroke-width="16" stroke-linecap="round"/></g>';
  if (n > 0) g += ch6(x + 50, y - 46, '1', 26, '#FFE14D', ST6, cl(n / .3), 46) + ch6(x + 104, y - 46, '2', 26, '#FFE14D', ST6, cl((n - .4) / .3), 46);
  return g; }

// ---------- Nahaufnahme: Fuss mit Sichelkralle (Ursprung am Boden, schaut nach links) ----------
// o: lift (0 bis 1, Fuss hebt ab), flex (Grad, Kralle beugt sich), gl (Glanz 0 bis 1), mes (Messlinie 0 bis 1)
function rfoot6(x, y, s, t, o) { o = o || {}; const P = RAP6, L = o.lift || 0, fx = o.flex || 0;
  let g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><defs><linearGradient id="ft6" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="' + P.a + '"/><stop offset="1" stop-color="' + P.b + '"/></linearGradient></defs>';
  g += '<ellipse cx="-80" cy="6" rx="' + (240 - 70 * L).toFixed(0) + '" ry="20" fill="#000" opacity="' + (.25 - .12 * L).toFixed(2) + '"/>';
  g += '<g transform="translate(' + (-30 * L).toFixed(1) + ' ' + (-120 * L).toFixed(1) + ') rotate(' + (-8 * L).toFixed(1) + ' 40 -100)">';
  // Mittelfuss
  g += '<path d="M-10 -100 L70 -440 L210 -440 L90 -80 Z" fill="url(#ft6)" stroke="' + ST6 + '" stroke-width="7" stroke-linejoin="round"/>';
  for (let i = 0; i < 7; i++) { const k = i / 6; g += '<ellipse cx="' + (14 + 70 * k).toFixed(0) + '" cy="' + (-120 - 300 * k).toFixed(0) + '" rx="17" ry="9" fill="' + P.be + '" opacity=".45" transform="rotate(-12 ' + (14 + 70 * k).toFixed(0) + ' ' + (-120 - 300 * k).toFixed(0) + ')"/>'; }
  for (let i = 0; i < 6; i++) g += '<path transform="translate(' + (70 + i * 26) + ' ' + (-430 + 6 * Math.sin(t * 2 + i)).toFixed(1) + ') rotate(' + (100 + i * 6) + ') scale(1.4)" d="M0 0 Q30 -12 60 0 Q30 12 0 0 Z" fill="' + FC6[i % 2] + '" stroke="' + ST6 + '" stroke-width="4"/>';
  // vierte Zehe (hinten), Ballen, erste Zehe, dritte Zehe (vorn)
  g += sg6('M30 -50 L-110 -24 L-196 -14', 40, '#174F8C') + claw6(-196, -14, -8, .85);
  g += '<ellipse cx="20" cy="-52" rx="82" ry="46" fill="' + P.b + '" stroke="' + ST6 + '" stroke-width="7"/>';
  g += sg6('M70 -110 L122 -74', 26, P.b) + claw6(126, -70, 200, .55);
  g += sg6('M0 -58 L-160 -36 L-262 -20', 48, P.b) + claw6(-262, -20, -12, 1);
  // zweite Zehe mit Sichelkralle, immer angehoben
  g += '<g transform="rotate(' + fx.toFixed(1) + ' -40 -90)">' + sg6('M-10 -92 L-80 -170 L-118 -196', 44, P.b);
  g += '<g transform="translate(-118 -196)"><path d="M6 -16 C-50 -70 -170 -52 -200 58 C-176 16 -118 -6 -40 20 C-14 26 4 10 6 -16 Z" fill="#F4EBD0" stroke="' + ST6 + '" stroke-width="7" stroke-linejoin="round"/><path d="M6 -16 C-10 -32 -32 -32 -46 -27 L-40 20 C-14 26 4 10 6 -16 Z" fill="#C9B48A" stroke="' + ST6 + '" stroke-width="5"/><path d="M-30 -30 C-90 -52 -158 -30 -184 28" stroke="#fff" stroke-width="8" fill="none" opacity=".75" stroke-linecap="round"/>';
  if (o.gl > 0 && o.gl < 1) { const a = o.gl; g += '<circle cx="' + lerp(-40, -186, a).toFixed(0) + '" cy="' + (-38 + 70 * a * a).toFixed(0) + '" r="14" fill="#fff" opacity="' + Math.sin(Math.PI * a).toFixed(2) + '"/>'; }
  if (o.mes > 0) g += '<path d="M10 -40 C-50 -100 -180 -80 -214 52" stroke="#FFE14D" stroke-width="9" fill="none" stroke-dasharray="' + (420 * cl(o.mes)).toFixed(0) + ' 999" stroke-linecap="round"/>';
  g += '</g></g></g></g>'; return g; }

// Felsblock, auf dem der Fuss in der Nahaufnahme steht (Schalti steht unten daneben)
function rock6() { return '<defs><linearGradient id="rk6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A89C8C"/><stop offset="1" stop-color="#6A6054"/></linearGradient></defs><path d="M470 1560 L486 1200 Q500 1108 580 1100 L1100 1086 V1560 Z" fill="url(#rk6)" stroke="' + ST6 + '" stroke-width="7" stroke-linejoin="round"/><path d="M494 1140 Q530 1102 590 1102 L1100 1090 V1124 L590 1134 Q530 1138 494 1160 Z" fill="#C2B6A4" opacity=".7"/><path d="M600 1180 l30 90 l-20 70 M800 1160 l-24 110 l30 80 M960 1200 l14 120" stroke="#564C42" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M500 1300 q40 -20 70 6 q30 -26 66 0" stroke="#3C9A5A" stroke-width="14" fill="none" stroke-linecap="round"/>'; }
// ---------- Nahaufnahme: Kopf (Ursprung Kopfmitte, schaut nach links) ----------
// o: jaw (0 bis 1), cnt (gezaehlte Zaehne, oben 13 + unten 14), hot (Zahn mit Ring)
const UT6 = i => { const x = -390 + i * 42; return [x, -5 + 35 * (x + 405) / 545]; };
const LT6 = i => { const x = -372 + i * 38; return [x, 22 + 22 * (x + 385) / 535]; };
function head6(x, y, s, t, o) { o = o || {}; const P = RAP6, ja = cl(o.jaw || 0), th = -22 * ja, cnt = o.cnt || 0;
  const tc = n => n < cnt ? '#FFE14D' : '#fff';
  let g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><defs><linearGradient id="hd6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + P.b + '"/><stop offset=".35" stop-color="' + P.a + '"/><stop offset="1" stop-color="' + P.be + '"/></linearGradient></defs>';
  // Hals
  g += '<path d="M140 -150 C320 -170 520 -120 800 -20 L800 340 C520 230 300 170 160 96 Z" fill="url(#hd6)" stroke="' + ST6 + '" stroke-width="7" stroke-linejoin="round"/>';
  for (let i = 0; i < 9; i++) g += '<path transform="translate(' + (200 + i * 64) + ' ' + (-150 + i * 15 + 4 * Math.sin(t * 2.2 + i)).toFixed(1) + ') rotate(' + (150 + i * 3) + ') scale(1.2)" d="M0 0 Q30 -12 60 0 Q30 12 0 0 Z" fill="' + FC6[i % 2] + '" stroke="' + ST6 + '" stroke-width="4"/>';
  for (let i = 0; i < 14; i++) g += '<circle cx="' + (230 + 480 * rnd(i + 61)).toFixed(0) + '" cy="' + (-60 + 200 * rnd(i + 77)).toFixed(0) + '" r="' + (9 + 9 * rnd(i + 5)).toFixed(0) + '" fill="' + P.sp + '" opacity=".55"/>';
  // Maul innen, von der Seite gesehen: hinten dunkler Rachen, vorn Gaumen und Zahnfleisch, gegenueberliegende Zahnreihe im Schatten,
  // Zunge liegt im Unterkiefer, am Mundwinkel spannt sich Haut (kein flaches rotes Feld)
  const tr = th * Math.PI / 180, rot = (px, py) => [190 + (px - 190) * Math.cos(tr) - (py - 40) * Math.sin(tr), 40 + (px - 190) * Math.sin(tr) + (py - 40) * Math.cos(tr)];
  { const L0 = rot(-385, 22), L1 = rot(60, 34);
    g += '<defs><linearGradient id="mo6" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#14070A"/><stop offset=".45" stop-color="#3A141B"/><stop offset="1" stop-color="#5A262D"/></linearGradient><linearGradient id="tg6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C86A74"/><stop offset="1" stop-color="#8E3E48"/></linearGradient></defs>';
    g += '<path d="M190 40 L140 30 L-405 -5 L' + L0[0].toFixed(1) + ' ' + L0[1].toFixed(1) + ' Z" fill="url(#mo6)"/>';
    // Gaumen: helle Falten unter dem Oberkiefer
    for (let k = 0; k < 4; k++) { const x = -330 + k * 80; g += '<path d="M' + x + ' ' + (4 + 35 * (x + 405) / 545 + 6).toFixed(1) + ' q22 ' + (10 + 18 * ja).toFixed(1) + ' 44 0" stroke="#9A4A54" stroke-width="5" fill="none" opacity=".55" stroke-linecap="round"/>'; }
    // gegenueberliegende Zaehne im Schatten
    for (let k = 0; k < 9; k++) { const x = -360 + k * 50, y = -5 + 35 * (x + 405) / 545 + 6; g += '<path d="M' + (x - 6) + ' ' + y.toFixed(1) + ' L' + (x + 6) + ' ' + y.toFixed(1) + ' L' + (x + 3) + ' ' + (y + 18).toFixed(1) + ' Z" fill="#8A7E68" opacity=".75"/>'; }
    for (let k = 0; k < 8; k++) { const [x, y] = rot(-350 + k * 52, 18); g += '<path d="M' + (x - 6).toFixed(1) + ' ' + y.toFixed(1) + ' L' + (x + 6).toFixed(1) + ' ' + y.toFixed(1) + ' L' + (x + 3).toFixed(1) + ' ' + (y - 16).toFixed(1) + ' Z" fill="#8A7E68" opacity=".7"/>'; }
    // Zahnfleisch am Oberkiefer
    g += '<path d="M-405 -5 L140 30" stroke="#B85A66" stroke-width="16" stroke-linecap="round"/>';
  }
  // Unterkiefer mit 14 Zaehnen
  g += '<g transform="rotate(' + th.toFixed(2) + ' 190 40)">';
  if (ja > .02) g += '<path d="M160 40 C60 -6 -120 -14 -270 14 C-220 30 -80 32 160 48 Z" fill="url(#tg6)" stroke="#6E2A33" stroke-width="3"/><path d="M100 16 C20 0 -100 -4 -220 12" stroke="#E59AA2" stroke-width="4" fill="none" opacity=".6" stroke-linecap="round"/><path d="M-385 22 L180 44" stroke="#B85A66" stroke-width="14" stroke-linecap="round"/>';
  for (let i = 0; i < 14; i++) { const [tx, ty] = LT6(i), n = 13 + i; g += '<path d="M' + (tx - 8) + ' ' + ty.toFixed(1) + ' L' + (tx + 8) + ' ' + ty.toFixed(1) + ' C' + (tx + 8) + ' ' + (ty - 12).toFixed(1) + ' ' + (tx + 7) + ' ' + (ty - 18).toFixed(1) + ' ' + (tx + 4) + ' ' + (ty - 24).toFixed(1) + ' C' + tx + ' ' + (ty - 15).toFixed(1) + ' ' + (tx - 5) + ' ' + (ty - 8).toFixed(1) + ' ' + (tx - 8) + ' ' + ty.toFixed(1) + ' Z" fill="' + tc(n) + '" stroke="' + ST6 + '" stroke-width="3" stroke-linejoin="round"/>'; if (o.hot === n) g += '<circle cx="' + tx + '" cy="' + (ty - 12).toFixed(1) + '" r="24" fill="none" stroke="#FFE14D" stroke-width="6"/>'; }
  g += '<path d="M190 40 L-385 22 C-400 30 -398 52 -378 58 C-200 74 0 90 150 94 C192 86 206 62 190 40 Z" fill="url(#hd6)" stroke="' + ST6 + '" stroke-width="7" stroke-linejoin="round"/><path d="M-360 50 C-200 66 0 80 140 84" stroke="' + P.be + '" stroke-width="8" fill="none" opacity=".6" stroke-linecap="round"/></g>';
  // Mundwinkel: Hautfalte zwischen Ober- und Unterkiefer, verdeckt den hinteren Teil der Oeffnung
  if (ja > .02) { const F0 = rot(-40, 30), F1 = rot(90, 36); g += '<path d="M-40 21 L170 34 L190 40 L' + F1[0].toFixed(1) + ' ' + F1[1].toFixed(1) + ' Q' + ((F0[0] + 60) / 2).toFixed(1) + ' ' + ((F0[1] + 26) / 2 + 6).toFixed(1) + ' -40 21 Z" fill="url(#hd6)" stroke="' + ST6 + '" stroke-width="5" stroke-linejoin="round"/><path d="M0 26 Q60 ' + (34 + 20 * ja).toFixed(1) + ' ' + F1[0].toFixed(1) + ' ' + (F1[1] - 6).toFixed(1) + '" stroke="' + P.b + '" stroke-width="4" fill="none" opacity=".5"/>'; }
  // Oberkiefer mit 13 Zaehnen
  for (let i = 0; i < 13; i++) { const [tx, ty] = UT6(i); g += '<path d="M' + (tx - 9) + ' ' + ty.toFixed(1) + ' L' + (tx + 9) + ' ' + ty.toFixed(1) + ' C' + (tx + 9) + ' ' + (ty + 14).toFixed(1) + ' ' + (tx + 8) + ' ' + (ty + 22).toFixed(1) + ' ' + (tx + 5) + ' ' + (ty + 28).toFixed(1) + ' C' + (tx + 1) + ' ' + (ty + 18).toFixed(1) + ' ' + (tx - 6) + ' ' + (ty + 10).toFixed(1) + ' ' + (tx - 9) + ' ' + ty.toFixed(1) + ' Z" fill="' + tc(i) + '" stroke="' + ST6 + '" stroke-width="3" stroke-linejoin="round"/>'; if (o.hot === i) g += '<circle cx="' + tx + '" cy="' + (ty + 14).toFixed(1) + '" r="26" fill="none" stroke="#FFE14D" stroke-width="6"/>'; }
  g += '<path d="M230 -30 C200 -120 60 -165 -70 -140 C-190 -116 -300 -86 -380 -84 C-414 -83 -440 -72 -442 -48 C-444 -24 -428 -8 -405 -5 L140 30 C190 30 232 10 230 -30 Z" fill="url(#hd6)" stroke="' + ST6 + '" stroke-width="7" stroke-linejoin="round"/>';
  g += '<ellipse cx="-130" cy="-62" rx="76" ry="24" fill="' + P.b + '" opacity=".3"/><ellipse cx="-396" cy="-58" rx="12" ry="7" fill="' + ST6 + '"/>';
  for (let i = 0; i < 8; i++) g += '<circle cx="' + (-330 + 300 * rnd(i + 31)).toFixed(0) + '" cy="' + (-100 + 50 * rnd(i + 37)).toFixed(0) + '" r="' + (6 + 6 * rnd(i + 3)).toFixed(0) + '" fill="' + P.sp + '" opacity=".5"/>';
  const bl = (t % 3.3) < .12;
  g += bl ? '<path d="M14 -88 q26 12 52 0" stroke="' + ST6 + '" stroke-width="7" fill="none" stroke-linecap="round"/>' : '<circle cx="40" cy="-88" r="30" fill="#fff" stroke="' + ST6 + '" stroke-width="6"/><circle cx="32" cy="-86" r="15" fill="' + ST6 + '"/><circle cx="38" cy="-93" r="5" fill="#fff"/>';
  g += '<path d="M-4 -128 L80 -118" stroke="' + ST6 + '" stroke-width="10" stroke-linecap="round"/>';
  return g + '</g>'; }
// Lupe: Zahn mit Zackung (hinten staerker als vorne) neben einem Steakmesser
function tooth6() { let s = '<rect x="-260" y="-260" width="520" height="520" fill="#24304F"/><g transform="translate(-10 0) scale(1.1)"><path d="M-150 -200 L10 -200 C24 -60 30 60 10 160 C-20 80 -90 -30 -150 -200 Z" fill="#FFFDF4" stroke="' + ST6 + '" stroke-width="6" stroke-linejoin="round"/>';
  for (let i = 0; i < 17; i++) { const k = i / 16, y = -190 + 340 * k, x = 10 + 18 * Math.sin(Math.PI * k * .9) - 4 * k; s += '<path d="M' + (x - 2).toFixed(1) + ' ' + (y - 9).toFixed(1) + ' q20 9 0 18" fill="#FFFDF4" stroke="' + ST6 + '" stroke-width="4"/>'; }
  for (let i = 0; i < 4; i++) { const k = .55 + i * .12, y = -200 + 360 * k, x = -150 + 150 * Math.pow(k, 1.6); s += '<path d="M' + (x + 2).toFixed(1) + ' ' + (y - 4).toFixed(1) + ' q-6 4 0 8" fill="none" stroke="' + ST6 + '" stroke-width="3"/>'; }
  s += '<path d="M-100 -150 C-70 -40 -40 40 -14 110" stroke="#fff" stroke-width="10" fill="none" opacity=".8" stroke-linecap="round"/>';
  s += '</g>' + svgT(-150, 210, 'vorne', 28, '#F4F6FB') + svgT(40, 210, 'hinten', 28, '#FFE14D');
  // Steakmesser
  s += '<rect x="112" y="-200" width="40" height="110" rx="10" fill="#8B5E3C" stroke="' + ST6 + '" stroke-width="5"/><path d="M118 -90 L150 -90 L150 170 L118 120 Z" fill="#D8DEE8" stroke="' + ST6 + '" stroke-width="5" stroke-linejoin="round"/>';
  for (let i = 0; i < 12; i++) s += '<path d="M118 ' + (-80 + i * 17) + ' l-8 8 l8 8" fill="#D8DEE8" stroke="' + ST6 + '" stroke-width="3"/>';
  return s; }
// Lupe: Hand mit drei Fingern und stark gebogenen Krallen
function hand6(t) { let s = '<rect x="-260" y="-260" width="520" height="520" fill="#CFE8F7"/><g transform="translate(70 10)">';
  for (let i = 0; i < 4; i++) s += '<path transform="translate(' + (90 + i * 34) + ' ' + (-8 - i * 9) + ') rotate(' + (24 + 3 * Math.sin(t * 3 + i)).toFixed(1) + ') scale(1.1)" d="M0 0 Q30 -12 60 0 Q30 12 0 0 Z" fill="' + FC6[i % 2] + '" stroke="' + ST6 + '" stroke-width="4"/>';
  s += sg6('M230 -90 L60 -20', 70, RAP6.b);
  s += sg6('M60 -20 L30 60', 30, RAP6.b) + claw6(30, 60, 75, 1.7);
  s += sg6('M60 -20 L-30 -56 L-90 -50', 30, RAP6.b) + claw6(-90, -50, 10, 1.9);
  s += sg6('M60 -20 L-10 -4 L-60 14', 30, RAP6.b) + claw6(-60, 14, 40, 1.8) + '</g>';
  return s; }

// ---------- Einstieg (wie v2) ----------
function hk6(ev, lt, t) { const fr = ev.frage, dr = ev.dreh, zw = ev.zwick;
  const out = fr === undefined ? 0 : ease(cl(fr / 1.2)), step = dr === undefined ? 0 : ease(cl((dr - .4) / .6)), lun = zw === undefined ? 0 : ease(cl(zw / .3));
  return { x: lerp(1300, RX6 + 170, out) - 60 * step - 110 * lun, out, step, lun, walk: (fr !== undefined && out < 1) || (step > 0 && step < 1) || (lun > 0 && lun < 1) }; }
WORLD.b6hook = function (sc, ev, t, lt) { const U = urD(t), H = hk6(ev, lt, t), dr = ev.dreh, zw = ev.zwick; let s = bg6(U, t) + cliff6();
  const grow = ease(cl(lt / 1)), ssc = lerp(1.7, 1.1, H.out) * (.75 + .25 * grow), jawS = .5 + .5 * Math.sin(t * 5);
  s += shad6(lerp(560, H.x - 80, H.out), 1160, ssc, t, { feath: H.out > .5 ? .8 : 0, jaw: H.out < 1 ? jawS : .1, head: -6 }, .55 * (1 - .55 * H.out));
  const chase = ev.frage !== undefined && dr === undefined, flyGone = dr === undefined ? 0 : cl(dr / .8);
  let fx = H.x - 360 + 90 * Math.sin(t * 2.3), fy = RY6 - 520 + 60 * Math.sin(t * 3.1); if (flyGone > 0) { fx += 700 * flyGone; fy -= 500 * flyGone; }
  if (ev.frage !== undefined && flyGone < 1) s += fly6(fx, fy, t);
  const snapF = chase ? Math.max(0, Math.sin(t * 3.4)) : 0, zwq = zw === undefined ? 0 : Math.max(0, Math.sin(Math.PI * cl((zw - .1) / .9)));
  s += rap6(H.x, RY6, RS6, t, { run: H.walk ? 1 : 0, head: zw !== undefined ? 14 + 10 * zwq : (dr !== undefined ? 16 : (chase ? -14 + 10 * Math.sin(t * 2.3) : peck6(t))), jaw: zw !== undefined ? .2 + .8 * zwq : (dr !== undefined ? .4 + .25 * Math.sin(t * 9) : snapF * .8) });
  if (dr !== undefined && zw === undefined) s += roard(H.x - 360, RY6 - 330, 200, t, cl((dr - .3) / .3) * .6);
  if (zw !== undefined) s += roard(H.x - 360, RY6 - 250, 240, t, zwq);
  s += fg6(t); if (H.out < .3) for (let i = 0; i < 4; i++) s += frondD(1100, 1300, -170 + i * 18, 360, t, i % 2 ? '#2A9450' : '#22874A', i);
  return W(s + shade3()); };
WMASC.b6hook = (ev, t, lt) => { const zw = ev.zwick, dr = ev.dreh;
  if (zw !== undefined) { const q = ease(cl((zw - .2) / .7)), w = Math.sin(Math.PI * cl((zw - .1) / .9)); return stay3([lerp(210, 150, q), 1537], 1, { r: -8 - 12 * w + 8 * q, mood: zw > 1 ? 'cool' : 'shock' }); }
  if (dr !== undefined) return stay3([210, 1537], 1, { r: -8 * ease(cl(dr / .4)), mood: 'shock' });
  if (ev.frage === undefined) return stay3([220 - 10 * ease(cl(lt / .6)), 1537], 1, { r: -10 * ease(cl(lt / .6)), mood: 'shock' });
  return stay3([210, 1537], 1, { r: lerp(-10, 2 * Math.sin(t * 3), ease(cl(ev.frage / .5))) }); };

// ---------- Teil 1: Sichelkralle ----------
const PR6 = [[690, 1130], [830, 1136], [970, 1130]];
WORLD.b6sichel = function (sc, ev, t, lt) { const U = urD(t), kl = ev.klein, si = ev.sichel, ho = ev.hoch, sp = ev.spur; let h = '';
  // Lichtung: Raptor tritt nach dem Fauchen zurueck und schaut zu Schalti. Im letzten Satz dreht er um und laeuft ganz aus dem Bild.
  let rx = RX6, o = {}, C = bg6(U, t) + mud6();
    if (sp === undefined) { const sn = kl === undefined ? 0 : Math.sin(Math.PI * cl((kl - 1.6) / 1.6)); o = { head: 20 * sn + peck6(t) * .3 * (1 - sn), jaw: .15 * sn }; }
  else { const tu = ease(cl((sp - .4) / .4)), wk = ease(cl((sp - .85) / 1.6)); rx = lerp(RX6, 1600, wk); o = { kx: lerp(1, -1, tu), run: wk > 0 && wk < 1 ? 1 : 0 };
    PR6.forEach((p, i) => { C += print6(p[0], p[1], cl((sp - .9 - i * .3) / .25), i === 0 ? cl((sp - 2.4) / .3) : 0); }); }
  if (rx < 1560) C += rap6(rx, RY6, RS6, t, o);
  if (kl !== undefined && si === undefined) { const k = ease(cl((kl - .3) / .7)), x = RX6 + 150, hip = RY6 - 188 * RS6; C += '<path d="M' + x + ' ' + RY6 + ' V' + lerp(RY6, hip, k).toFixed(0) + '" stroke="#FFE14D" stroke-width="12" stroke-linecap="round"/>'; for (let i = 1; i < 6; i++) { const y = lerp(RY6, hip, i / 6); if (y > lerp(RY6, hip, k)) C += '<path d="M' + (x - 10) + ' ' + y.toFixed(0) + ' h20" stroke="' + ST6 + '" stroke-width="4"/>'; }
    C += ch6(860, 740, 'etwa 0,5 m', 30, '#FFE14D', ST6, cl((kl - 1) / .3)); }
  C += fg6(t);
  // Nahaufnahme Fuss
  let D = '';
  if (si !== undefined && sp === undefined) { let L = 0, land = 0; if (ho !== undefined) { const ph = (ho % 1.6) / 1.6; L = ph < .5 ? Math.sin(Math.PI * ph * 2) : 0; land = ph >= .5 && ph < .75 ? (ph - .5) / .25 : 0; }
    const fl = ho !== undefined ? 0 : -24 * Math.sin(Math.PI * cl((si - .9) / 1)) + 4 * Math.sin(t * 2.4);
    D = bg6(U, t) + rock6() + '<g data-figur="Fuss">' + rfoot6(870, 1100, 1.2, t, { lift: L, flex: fl, gl: si > 1.6 && ho === undefined ? (si - 1.6) / .8 : 0, mes: ho === undefined ? cl((si - 2) / .6) : 0 }) + '</g>';
    if (land > 0) for (let i = 0; i < 5; i++) D += '<circle cx="' + (560 + i * 64 + 40 * land * (i - 2)).toFixed(0) + '" cy="' + (1100 - 26 * land).toFixed(0) + '" r="' + (10 + 18 * land).toFixed(0) + '" fill="#EFE6D6" opacity="' + (.7 * (1 - land)).toFixed(2) + '"/>';
    if (ho === undefined) D += ch6(470, 720, 'über 6,5 cm', 34, '#FFE14D', ST6, cl((si - 2.4) / .3));
    else D += ch6(256, 1040, 'berührt den Boden nicht', 28, '#3DFF7A', ST6, cl((ho - .8) / .3)); }
  let s = C; if (si !== undefined && sp === undefined) s = wipe3(C, D, si, .5, AC6); if (sp !== undefined) { const C0 = C; s = sp < .5 ? wipe3(D0b6(t), C0, sp, .5, AC6) : C0; }
  if (sp !== undefined) s += ch6(830, 990, 'nur zwei Zehen', 30, '#FFE14D', ST6, cl((sp - 2.6) / .3));
  h += slot(ev, [['klein', 'Nur etwa kniehoch'], ['sichel', 'Sichelkralle an jedem Fuß', 'hot'], ['hoch', 'Beim Laufen angehoben'], ['spur', 'Fährten: nur zwei Zehen']]);
  return W(s + shade3(), h); };
function D0b6(t) { const U = urD(t); return bg6(U, t) + rock6() + rfoot6(870, 1100, 1.2, t, {}); }
// Schalti bewegt sich weich: keine harten Posen-Wechsel, Ausschlaege laufen ueber Sinus-Kurven
WMASC.b6sichel = (ev, t, lt) => { const kl = ev.klein, si = ev.sichel, ho = ev.hoch, sp = ev.spur;
  if (sp !== undefined) { const lk = Math.sin(Math.PI * cl((sp - 1.4) / 2)); return stay3([220, 1537], 1, { r: 6 * (1 - ease(cl(sp / .5))) + 8 * lk, mood: sp > 2.4 ? 'happy' : 'cool' }); }
  if (ho !== undefined) { const ph = (ho % 1.6) / 1.6, z = Math.sin(Math.PI * cl((ph - .48) / .34)); return stay3([220 - 12 * z, 1537 - 14 * z], 1, { r: 6 - 16 * z, mood: z > .3 ? 'shock' : 'happy' }); }
  if (si !== undefined) return stay3([220, 1537], 1, { r: 6 * ease(cl(si / .6)), mood: si > 2.4 ? 'shock' : 'happy' });
  const x = lerp(150, 220, ease(cl(lt / .8)));
  if (kl !== undefined) { const sn = Math.sin(Math.PI * cl((kl - 1.6) / 1.6)); return stay3([x, 1537], 1, { r: -12 * sn, mood: sn > .3 ? 'shock' : 'happy' }); }
  return stay3([x, 1537], 1, { r: 2 }); };

// ---------- Teil 2: Zaehne, Haende, Schwanz ----------
const HX6 = 1.06, HC6 = [620, 900]; // Kopf-Nahaufnahme: Groesse und Mitte (Maul bleibt ueber der Textzeile)
// Tannenzapfen, den Schalti dem Raptor zuwirft
const cone6 = (x, y, r) => '<g data-figur="Zapfen" transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + r.toFixed(1) + ')"><ellipse rx="18" ry="26" fill="#8B5E3C" stroke="' + ST6 + '" stroke-width="5"/><path d="M-14 -10 L14 -2 M-16 4 L16 12 M-10 16 L12 20" stroke="#5A3A20" stroke-width="4"/></g>';
WORLD.b6zahn = function (sc, ev, t, lt) { const U = urD(t), za = ev.zahn, zk = ev.zack, ha = ev.hand, sw = ev.schw; let h = '';
  const pr = () => PR6.map(p => print6(p[0], p[1], 1, 0)).join('');
  // Lichtung zu Beginn: Raptor kommt von rechts zurueck
  const ret = ease(cl(lt / 1)), yw = za === undefined ? 0 : ease(cl((za - .45) / .4)), C1 = bg6(U, t) + mud6() + pr() + rap6(lerp(1600, RX6, ret), RY6, RS6, t, { run: ret < 1 ? 1 : 0, head: 12 * yw, jaw: .3 * yw }) + fg6(t);
  // Kopf in Nahaufnahme
  let jaw = 0, cnt = 0, hot = -1, chomp = 0;
  if (za !== undefined) { jaw = .3 + .4 * ease(cl((za - 1.1) / .5)); cnt = Math.min(27, Math.floor(cl((za - 1.6) / 1.55) * 27 + .001)); if (cnt > 0 && cnt < 27) hot = cnt - 1; chomp = cl((za - 3.45) / .15); if (chomp > 0) jaw = .7 * (1 - chomp); }
  if (zk !== undefined) { jaw = .35 * ease(cl((zk - .2) / .4)); cnt = 27; hot = 4; }
  const D = bg6(U, t) + '<g data-figur="Kopf">' + head6(HC6[0], HC6[1], HX6, t, { jaw: jaw, cnt: cnt, hot: hot }) + '</g>' + fg6(t);
  let s = C1;
  if (ha === undefined) { s = wipe3(C1, D, za === undefined ? 0 : za - .85, .5, AC6);
    if (za !== undefined && zk === undefined) { s += ch6(300, 702, cnt >= 27 && za > 3.2 ? '26 bis 28 pro Seite' : cnt + ' Zähne', 30, '#FFE14D', ST6, cl((za - 1.6) / .2)); if (chomp > 0 && chomp < 1) s += '<path d="M150 1080 l-40 -30 M200 1100 l-10 -46 M250 1080 l30 -36" stroke="#FFE14D" stroke-width="8" stroke-linecap="round"/>'; }
    if (zk !== undefined) { const [tx, ty] = UT6(4); s += lupe6(740, 800, 200, tooth6(), cl((zk - .4) / .4), (HC6[0] + tx * HX6).toFixed(0), (HC6[1] + (ty + 26) * HX6).toFixed(0)); } }
  else {
    // Zurueck in der Lichtung: Hand (Schalti wirft einen Zapfen, der Raptor faengt ihn mit den Krallen) und Sprint
    let rx = RX6, o = {}, C2 = bg6(U, t) + mud6() + pr(), cone = '';
    if (sw === undefined) { const up = 40 * ease(cl((ha - .5) / .5)), fq = cl((ha - 3.5) / .55), HX = 525, HY = RY6 - 267;
      o = { arm: up, head: fq > 0 && fq < 1 ? 10 : 4, jaw: fq > .8 && fq < 1 ? .3 : 0 };
      if (fq > 0 && fq < 1) { const e = ease(fq); cone = cone6(lerp(330, HX, e), lerp(1330, HY, e) - 360 * Math.sin(Math.PI * e), 600 * fq); }
      else if (fq >= 1) cone = cone6(HX - 6, HY + 6, 20); }
    else { const a = ease(cl((sw - .45) / .75)), b = ease(cl((sw - 1.2) / .3)), c = ease(cl((sw - 1.5) / .85)); rx = c > 0 ? lerp(1020, RX6, c) : lerp(RX6, 1020, a); const kx = c > 0 || b > 0 ? lerp(-1, 1, b) : lerp(1, -1, ease(cl((sw - .1) / .3))); o = { kx: kx, run: (a > 0 && a < 1) || (c > 0 && c < 1) ? 1 : 0, ph: t * 17 }; }
    C2 += rap6(rx, RY6, RS6, t, o) + cone + fg6(t);
    if (sw === undefined) C2 += lupe6(820, 640, 170, hand6(t), cl((ha - .9) / .4) * (1 - cl((ha - 3.2) / .3)), 525, RY6 - 267);
    else C2 += ch6(210, 960, 'steif wie ein Stab', 28, '#3DFF7A', ST6, cl((sw - 2.4) / .3));
    s = wipe3(D, C2, ha, .5, AC6); }
  h += slot(ev, [['zahn', '26 bis 28 Zähne pro Seite'], ['zack', 'Hinten gezackt wie ein Messer', 'hot'], ['hand', 'Drei Krallen an jeder Hand'], ['schw', 'Steifer Schwanz für die Balance']]);
  return W(s + shade3(), h); };
WMASC.b6zahn = (ev, t, lt) => { const za = ev.zahn, ha = ev.hand, sw = ev.schw;
  if (sw !== undefined) { const q = cl((sw - 2.4) / 1.6); if (q <= 0) return stay3([220, 1537], 1, { r: 4, mood: 'happy' }); const fall = Math.sin(Math.PI * q), sp = ease(cl(q / .3)); return stay3([220 + 36 * fall, 1537], 1, { r: -64 * fall + 6 * Math.sin(t * 9) * (1 - sp) * (q < .3 ? 1 : 0), mood: q > .25 && q < .85 ? 'shock' : 'cool' }); }
  if (ha !== undefined) { const th = Math.sin(Math.PI * cl((ha - 3.3) / .5)); return stay3([lerp(190, 220, ease(cl(ha / .6))), 1537], 1, { r: -18 * th, mood: ha > 4 ? 'happy' : 'cool' }); }
  if (za !== undefined) { const c = cl((za - 3.45) / .5); if (c > 0 && c < 1) return hop3(c, [220, 1537], [190, 1537], 40, 1, 1, { r: -12 * Math.sin(Math.PI * c), mood: 'shock' }); return stay3([za >= 3.95 ? 190 : 220, 1537], 1, { r: 4 + 4 * Math.sin(t * 4) * Math.sin(Math.PI * cl((za - 1.6) / 1.6)), mood: 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 }); };

// ---------- Teil 3: Kampf-Fund ----------
function desert6(t) { let s = '<defs><linearGradient id="ds6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BA8E8"/><stop offset=".7" stop-color="#F7D9A8"/><stop offset="1" stop-color="#FCE8C4"/></linearGradient><linearGradient id="dg6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8B878"/><stop offset="1" stop-color="#B8804A"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#ds6)"/><circle cx="820" cy="560" r="70" fill="#FFF3C8"/>';
  s += '<path d="M-20 1060 L80 900 L210 940 L300 820 L420 860 L520 760 L640 830 L760 780 L880 880 L1100 840 V1080 H-20 Z" fill="#C8643A" stroke="#0B1020" stroke-width="5"/><path d="M-20 980 Q300 950 600 990 T1100 970" stroke="#A84A28" stroke-width="10" fill="none"/>';
  s += '<path d="M-20 1060 Q540 1030 1100 1060 V1920 H-20 Z" fill="url(#dg6)"/>'; for (let i = 0; i < 30; i++) s += '<circle cx="' + (rnd(i + 5) * 1080).toFixed(0) + '" cy="' + (1080 + rnd(i + 9) * 800).toFixed(0) + '" r="' + (2 + 4 * rnd(i)).toFixed(0) + '" fill="#9A6A3A" opacity=".4"/>';
  return s; }
// Fund schematisch: links der Velociraptor (Kopf zurueckgeworfen, Schwanz nach links), rechts der Protoceratops (Kopf nach links).
// Fusskralle des Raptors am Hals des Protoceratops, dessen Schnabel um den rechten Arm des Raptors, linke Hand am Gesicht.
const FK6 = [630, 1365], FB6 = [585, 1272]; // Kralle, Schnabel (vor der Verschiebung um -470)
function fossil6(rev) { const B = 'stroke="#F6EDD4" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"', B2 = B.replace('11', '7'), O = 'stroke="#5A3A20" stroke-width="17" fill="none" stroke-linecap="round" stroke-linejoin="round"', O2 = O.replace('17', '12');
  let g = ''; const draw = (d, w) => g += '<path d="' + d + '" ' + (w ? O2 : O) + '/><path d="' + d + '" ' + (w ? B2 : B) + '/>';
  // Velociraptor
  draw('M110 1420 Q220 1390 300 1370 Q350 1358 380 1350'); draw('M380 1350 Q440 1330 480 1296'); draw('M480 1296 Q470 1250 420 1232');
  g += '<path d="M420 1232 L330 1206 L318 1222 L404 1250 Z" fill="#F6EDD4" stroke="#5A3A20" stroke-width="6" stroke-linejoin="round"/><circle cx="398" cy="1232" r="7" fill="#5A3A20"/>';
  for (let i = 0; i < 6; i++) draw('M' + (392 + i * 15) + ' ' + (1344 - i * 9) + ' q16 30 34 34', 1);
  draw('M480 1300 L540 1300 L580 1288', 1); draw('M470 1290 L560 1250 L620 1236', 1);
  draw('M380 1352 L470 1420 L560 1376', 1); draw('M560 1376 L604 1372 L630 1365', 1); draw('M380 1356 L400 1440 L360 1470', 1);
  g += '<path d="M612 1372 C624 1348 644 1340 660 1350" stroke="#5A3A20" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M612 1372 C624 1348 644 1340 660 1350" stroke="#F6EDD4" stroke-width="8" fill="none" stroke-linecap="round"/>';
  // Protoceratops
  const sk = 'M720 1300 C700 1230 750 1180 820 1194 C850 1232 836 1286 790 1310 Z';
  g += '<path d="' + sk + '" fill="none" ' + O + '/><path d="' + sk + '" fill="none" ' + B + '/>';
  const fc = 'M720 1300 L650 1262 L586 1268 L600 1300 L666 1332 L730 1326 Z'; g += '<path d="' + fc + '" fill="none" ' + O2 + '/><path d="' + fc + '" fill="none" ' + B2 + '/><circle cx="694" cy="1282" r="14" fill="none" stroke="#F6EDD4" stroke-width="6"/>';
  draw('M790 1310 Q860 1300 940 1330'); for (let i = 0; i < 6; i++) draw('M' + (800 + i * 22) + ' ' + (1310 + i * 2) + ' q4 36 -4 56', 1); draw('M830 1350 L816 1450 M906 1350 L920 1450', 1); draw('M940 1330 L970 1360', 1);
  return '<g transform="translate(0 -470)"><clipPath id="fos6">' + rev + '</clipPath><g clip-path="url(#fos6)"><rect x="80" y="1180" width="900" height="320" fill="#C99A62"/>' + g + '</g></g>'; }
WORLD.b6fund = function (sc, ev, t, lt) { const U = urD(t), fu = ev.fund, zw = ev.zwei, kr = ev.kral, fo = ev.foto; let h = '';
  const C = bg6(U, t) + mud6() + rap6(RX6, RY6, RS6, t, { head: peck6(t) * .4 }) + fg6(t); let s = C;
  if (fu !== undefined) { let D = desert6(t); const prog = ease(cl((fu - .9) / 4)); let rev = ''; for (let i = 0; i < 18; i++) { const r = cl(prog * 18 - i) * 110; if (r > 0) rev += '<circle cx="' + (140 + (i % 6) * 150 + 20 * rnd(i)).toFixed(0) + '" cy="' + (1230 + Math.floor(i / 6) * 100).toFixed(0) + '" r="' + r.toFixed(0) + '"/>'; }
    D += '<rect x="60" y="690" width="940" height="360" rx="20" fill="#D9A86A" stroke="#8A5A32" stroke-width="6"/><path d="M60 1050 Q540 1090 1000 1050 V1110 H60 Z" fill="#B8804A"/>' + fossil6(rev);
    if (prog > 0 && prog < 1) { const bx = 140 + (Math.floor(prog * 18) % 6) * 150, by = 760 + Math.floor(Math.floor(prog * 18) / 6) * 100; D += '<g transform="translate(' + (bx + 20 * Math.sin(t * 14)).toFixed(0) + ' ' + (by - 30) + ') rotate(-30)"><rect x="-10" y="-90" width="20" height="80" rx="6" fill="#8B5E3C" stroke="#0B1020" stroke-width="4"/><rect x="-22" y="-14" width="44" height="40" rx="6" fill="#F2D06A" stroke="#0B1020" stroke-width="4"/></g>'; for (let i = 0; i < 4; i++) { const ph = (t * 3 + i / 4) % 1; D += '<circle cx="' + (bx + 40 + 50 * ph).toFixed(0) + '" cy="' + (by - 10 - 40 * ph).toFixed(0) + '" r="' + (4 + 6 * ph).toFixed(0) + '" fill="#E8C08A" opacity="' + (1 - ph).toFixed(2) + '"/>'; } }
    if (zw === undefined) D += ch6(540, 1110, 'Fund aus der Mongolei', 34, '#FFE14D', ST6, cl((fu - .6) / .3));
    else if (kr === undefined) { const k = cl((zw - .3) / .3); D += ch6(300, 1100, 'Velociraptor', 30, '#3FA9F5', ST6, k) + ch6(780, 1100, 'Protoceratops', 30, '#E8C08A', ST6, cl((zw - .7) / .3)); }
    else { const k1 = cl((kr - .2) / .3), k2 = cl((kr - 2.2) / .3), pu = 1 + .08 * Math.sin(t * 6), cx = FK6[0], cy = FK6[1] - 470, bx = FB6[0], by = FB6[1] - 470;
      if (k1 > 0) D += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (38 * pu * back(k1)).toFixed(1) + '" fill="none" stroke="#FF5A5A" stroke-width="8"/><path d="M' + (cx + 30) + ' ' + (cy + 30) + ' L760 1068" stroke="#FF5A5A" stroke-width="6" opacity="' + k1.toFixed(2) + '"/>' + ch6(800, 1100, 'Kralle am Hals', 30, '#FF5A5A', '#fff', k1);
      if (k2 > 0) D += '<circle cx="' + bx + '" cy="' + by + '" r="' + (38 * pu * back(k2)).toFixed(1) + '" fill="none" stroke="#FFE14D" stroke-width="8"/><path d="M' + (bx - 30) + ' ' + (by + 30) + ' L320 1068" stroke="#FFE14D" stroke-width="6" opacity="' + k2.toFixed(2) + '"/>' + ch6(280, 1100, 'Biss in den Arm', 30, '#FFE14D', ST6, k2); }
    s = wipe3(C, D, fu - .3, .5, AC6); }
  if (fo !== undefined) s += photo6(t, fo);
  h += slot(ev, [['fund', 'Fund aus der Mongolei'], ['zwei', 'Mitten im Kampf versteinert'], ['kral', 'Kralle am Hals, Biss in den Arm', 'hot'], ['foto', 'So könnte er ausgesehen haben']]);
  return W(s + shade3(), h); };
WMASC.b6fund = (ev, t, lt) => { const fu = ev.fund, kr = ev.kral;
  if (kr !== undefined) return stay3([220, 1537], 1, { r: 4, mood: kr > .3 && kr < 1.2 ? 'shock' : 'happy' });
  if (fu !== undefined) { const brush = fu > .9 && fu < 4.9; return stay3([220, 1537], 1, { r: 4 + 6 * Math.sin(t * 7) * Math.sin(Math.PI * cl((fu - .9) / 4)), mood: brush ? 'happy' : 'cool' }); }
  return stay3([220, 1537], 1, { r: 2 }); };
// Grosses Bild vor der Zusammenfassung. Mit KI-Bild (VRIMG aus viz_b006img.js), sonst die naturnah gezeichnete Figur.
function photo6(t, k) { if (k <= 0) return ''; const W0 = 1040, H0 = 693, cy = 888, e = back(cl(k / .5)), z = 1 + .05 * cl(k / 4); let inner;
  if (typeof VRIMG !== 'undefined') inner = '<image href="' + VRIMG + '" x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" preserveAspectRatio="xMidYMid slice" transform="scale(' + z.toFixed(3) + ')"/>';
  else { const U = desert6(t); inner = '<svg x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" viewBox="40 760 1000 667" preserveAspectRatio="xMidYMid slice">' + U + rexd(560, 1300, 1.05, t, { kind: 'rap', look: 'n', feath: .8, tl: .74, fa: 1, sk: 1, h3: 1, id: 'real', pal: { a: '#9A8A6A', b: '#6A5A40', be: '#E2D6B8', sp: '#4A3C28' }, fcol: ['#6A5A40', '#9A8A6A'] }) + '</svg>'; }
  return '<rect width="1080" height="1920" fill="#02030F" opacity="' + (.55 * cl(k / .4)).toFixed(3) + '"/><g transform="translate(540 ' + cy + ') scale(' + e.toFixed(3) + ')"><rect x="' + (-W0 / 2 - 10) + '" y="' + (-H0 / 2 - 10) + '" width="' + (W0 + 20) + '" height="' + (H0 + 20) + '" rx="16" fill="#FFF6DF" stroke="#0B1020" stroke-width="6"/><clipPath id="ph6"><rect x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" rx="8"/></clipPath><g clip-path="url(#ph6)">' + inner + '</g></g>' + (typeof VRIMG !== 'undefined' ? ch6(900, 1196, 'KI-Bild', 28, '#0B1020', '#F4F6FB', (k - .7) / .3) : ''); }

// ---------- Schluss: der Raptor kommt und setzt sich mit Abstand zu Schalti ----------
WORLD.b6out = function (sc, ev, t, lt) { const U = urD(t), sit = ease(cl((lt - .6) / .8)); return W(bg6(U, t) + rap6(RX6, RY6, RS6, t, { sit: sit * .8, head: 6 * sit }) + fg6(t) + shade3()); };
WMASC.b6out = (ev, t, lt) => stay3([220, 1537], 1, { r: 2 });

['b6hook', 'b6sichel', 'b6zahn', 'b6fund', 'b6out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC6); });
