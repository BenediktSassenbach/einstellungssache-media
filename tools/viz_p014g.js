// P014 "Warum geht WLAN durch die Wand?": Erklaergrafiken, die beide Fassungen (bisheriger Stil P014 und Design 3.0 P014V3) gemeinsam nutzen.
// Zum Loeschen einer Fassung nur deren eigene Datei und Ordner entfernen. Diese Datei bleibt, solange eine der beiden Fassungen existiert.

// ---------- Bausteine ----------
function router14(x, y, s, t) { let g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-52 -44 L-70 -150 M52 -44 L70 -150" stroke="#C9CFDD" stroke-width="10" stroke-linecap="round"/><circle cx="-70" cy="-150" r="9" fill="#5CE1FF"/><circle cx="70" cy="-150" r="9" fill="#5CE1FF"/><rect x="-96" y="-60" width="192" height="60" rx="16" fill="#1B2748" stroke="#F4F6FB" stroke-width="7"/>';
  for (let i = 0; i < 4; i++) g += '<circle cx="' + (-54 + i * 36) + '" cy="-30" r="8" fill="' + (i === 3 ? '#FFD23F' : '#3DFF7A') + '" opacity="' + (Math.sin(t * (7 + i * 3) + i) > -.2 ? 1 : .25) + '"/>';
  return g + '</g>'; }
function rings14(x, y, t, n, col, rmax, op, w) { let s = ''; for (let i = 0; i < n; i++) { const c = (t * .55 + i / n) % 1; s += '<circle cx="' + x + '" cy="' + y + '" r="' + (30 + rmax * c) + '" fill="none" stroke="' + col + '" stroke-width="' + (w || 8) + '" opacity="' + (op * (1 - c)).toFixed(3) + '"/>'; } return s; }
function brick14(x, y, w, h, id, op) { let s = '<g opacity="' + (op === undefined ? 1 : op) + '"><clipPath id="bk' + id + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6"/></clipPath><g clip-path="url(#bk' + id + ')"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#B5533C"/>';
  for (let r = 0; r * 34 < h; r++) { const yy = y + r * 34; s += '<path d="M' + x + ' ' + yy + ' H' + (x + w) + '" stroke="#6E2E20" stroke-width="5"/>'; for (let c = -1; c * 70 < w + 70; c++) { const xx = x + c * 70 + (r % 2 ? 35 : 0); s += '<path d="M' + xx + ' ' + yy + ' v34" stroke="#6E2E20" stroke-width="5"/>'; } }
  return s + '</g><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="none" stroke="#0B1020" stroke-width="6"/></g>'; }
// Welle als Linienzug. amp(x) gibt die Hoehe an der Stelle x, bis = wie weit sie schon gezeichnet ist
function wave14(x0, x1, Y, amp, L, ph, col, w, bis) { const xe = bis === undefined ? x1 : lerp(x0, x1, cl(bis)); if (xe <= x0 + 4) return ''; let d = ''; for (let x = x0; x <= xe; x += 5) d += (x === x0 ? 'M' : 'L') + x + ' ' + (Y + (typeof amp === 'function' ? amp(x) : amp) * Math.sin(2 * Math.PI * (x - x0) / L - ph)).toFixed(1);
  return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
function bars14(x, y, s, n) { const col = n >= 3 ? '#3DFF7A' : n === 2 ? '#FFD23F' : '#FF5A5A'; let g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">'; for (let i = 0; i < 4; i++) { const h = 16 + i * 14; g += '<rect x="' + (-38 + i * 20) + '" y="' + (30 - h) + '" width="14" height="' + h + '" rx="4" fill="' + (i < n ? col : '#3A4A7A') + '"/>'; } return g + '</g>'; }
function phone14(x, y, n, k) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k === undefined ? 1 : k)) + ')">' + phoneF(-58, -95, 116, 190, '#1B2748') + bars14(0, -6, 1, n) + '</g>'; }
function stars14(x, y, t, op) { let s = ''; for (let i = 0; i < 5; i++) { const a = t * 4 + i * 1.257; s += '<path transform="translate(' + (x + 110 * Math.cos(a)) + ' ' + (y + 34 * Math.sin(a)) + ')" d="M0 -22 L6 -7 L22 -7 L9 3 L14 20 L0 10 L-14 20 L-9 3 L-22 -7 L-6 -7 Z" fill="#FFE14D" stroke="#0B1020" stroke-width="3" opacity="' + op + '"/>'; } return s; }
const D14 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3.2;

// ---------- Teil 1: WLAN und Licht sind Wellen. WLAN rund 12 cm, Licht unter 0,001 mm, rund 200.000 Mal laenger ----------
const W14Y = 890, W14A = 65, W14L = 380;
const w14v = sc => 500 / (.63 * Math.max(2, D14(sc, 1)));          // Tempo der langen Welle (px/s), damit Schalti in 3.0 auf dem Kamm mitfahren kann
const w14crest = (sc, t) => 260 + w14v(sc) * (t - sc.lines[1].start); // x-Position eines Wellenkamms
function g14a(sc, ev, t, lt) { let s = ''; const la = ev.lang, li = ev.licht, a = ev.act;
  if (la === undefined) { const k = back(cl((lt - .4) / .4)), X = 110, Wd = 790, Y = 850;
    s += '<defs><linearGradient id="sp14" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7C5CFF"/><stop offset=".5" stop-color="#5CE1FF"/><stop offset=".6" stop-color="#FF4D4D"/><stop offset=".63" stop-color="#FFD23F"/><stop offset=".66" stop-color="#3DFF7A"/><stop offset=".69" stop-color="#3DB8FF"/><stop offset=".72" stop-color="#B05CFF"/><stop offset="1" stop-color="#AEB9D6"/></linearGradient></defs>';
    s += '<g transform="translate(505 885) scale(' + k + ') translate(-505 -885)"><rect x="' + X + '" y="' + Y + '" width="' + Wd + '" height="70" rx="35" fill="url(#sp14)" stroke="#F4F6FB" stroke-width="6"/>' + svgT(210, Y + 122, 'Radio', 34, '#AEB9D6') + svgT(810, Y + 122, 'Röntgen', 34, '#AEB9D6') + svgT(505, Y + 205, 'elektromagnetische Wellen', 40, '#F4F6FB') + '</g>';
    [[400, 'WLAN', '#5CE1FF', 1], [632, 'Licht', '#FFE14D', 1.6]].forEach(q => { const c = (lt - q[3]) / .3; if (c > 0) s += '<path d="M' + (q[0] - 16) + ' ' + (Y - 28) + ' L' + q[0] + ' ' + (Y - 4) + ' L' + (q[0] + 16) + ' ' + (Y - 28) + ' Z" fill="' + q[2] + '" opacity="' + cl(c) + '"/>' + chip3(q[0], Y - 62, q[1], 40, q[2], '#0B1020', c); });
    return s; }
  // lange WLAN-Welle mit Lineal
  s += '<path d="M110 ' + W14Y + ' H900" stroke="#3A4A7A" stroke-width="4" stroke-dasharray="10 12"/>';
  let d = ''; for (let x = 110; x <= 900; x += 5) d += (x === 110 ? 'M' : 'L') + x + ' ' + (W14Y - W14A * Math.cos(2 * Math.PI * (x - w14crest(sc, t)) / W14L)).toFixed(1);
  s += '<path d="' + d + '" fill="none" stroke="#5CE1FF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>';
  if (a === undefined) { const k = cl((la - .5) / .4); s += '<g opacity="' + k + '"><path d="M300 985 H680 M300 965 V1005 M680 965 V1005" stroke="#F4F6FB" stroke-width="7" stroke-linecap="round"/></g>' + chip3(790, 985, '12 cm', 40, '#5CE1FF', '#0B1020', (la - .8) / .3); }
  if (li !== undefined) { { const xe = lerp(110, 560, cl(li / .6)); let dd = ''; for (let x = 110; x <= xe; x += 1.5) dd += (x === 110 ? 'M' : 'L') + x + ' ' + (1068 + 11 * Math.sin(x * .7 - t * 14)).toFixed(1); s += '<path d="' + dd + '" fill="none" stroke="#FFE14D" stroke-width="4" stroke-linejoin="round"/>'; } if (li > .6) s += svgT(585, 1080, 'Licht: unter 0,001 mm', 32, '#FFE14D', 'start'); }
  if (a !== undefined) { const k = back(cl(a / .35)); s += '<g transform="translate(505 985) scale(' + k + ') rotate(' + (-3 + 1.5 * Math.sin(t * 4)) + ')"><rect x="-230" y="-58" width="460" height="116" rx="30" fill="#FFD23F" stroke="#0B1020" stroke-width="7"/>' + svgT(0, 24, '200.000 × länger', 54, '#0B1020') + '</g>'; }
  return s; }
const L14A = [['spek', 'WLAN und Licht: beides Wellen'], ['lang', 'WLAN-Welle: rund 12 cm', 'hot'], ['licht', 'Licht: unter 0,001 mm'], ['act', 'Rund 200.000 Mal länger', 'hot']];

// ---------- Teil 2: Das Material entscheidet. Ziegel schluckt Licht, WLAN kommt durch, jede Wand schwaecht ----------
// o.full: die Wand reicht vom Boden bis zur Decke und ist die Wand des Ortes (Design 3.0)
function g14b(sc, ev, t, lt, o) { o = o || {}; let s = ''; const l2 = ev.licht2, d = ev.durch, a = ev.act, k = back(cl((lt - .4) / .4)), YL = 815, YW = 1010, WY = o.full ? 232 : 705, WH = o.full ? 1318 : 415;
  // Lampe und Auge (Licht-Reihe), Router und Handy (WLAN-Reihe)
  s += '<g opacity="' + cl((lt - .6) / .3) + '"><circle cx="190" cy="' + YL + '" r="' + (l2 === undefined ? 0 : 62 + 6 * Math.sin(t * 6)) + '" fill="#FFE14D" opacity=".25"/><circle cx="190" cy="' + YL + '" r="40" fill="#FFE14D" stroke="#0B1020" stroke-width="6"/><rect x="172" y="' + (YL + 34) + '" width="36" height="26" rx="6" fill="#C9CFDD" stroke="#0B1020" stroke-width="5"/>';
  s += '<ellipse cx="840" cy="' + YL + '" rx="56" ry="38" fill="#fff" stroke="#0B1020" stroke-width="6"/><circle cx="828" cy="' + YL + '" r="19" fill="#5CE1FF" stroke="#0B1020" stroke-width="4"/><circle cx="828" cy="' + YL + '" r="8" fill="#0B1020"/>' + router14(190, YW + 62, .62, t) + '</g>';
  if (l2 !== undefined) { const c = cl(l2 / .35); s += '<path d="M232 ' + (YL - 14) + ' L' + lerp(232, 430, c) + ' ' + (YL - 14 - 34 * c) + ' L' + lerp(232, 430, c) + ' ' + (YL + 14 + 34 * c) + ' L232 ' + (YL + 14) + ' Z" fill="#FFE14D" opacity="' + (.55 + .1 * Math.sin(t * 9)) + '"/>'; if (l2 > .35) for (let i = 0; i < 5; i++) { const q = (t * 1.6 + i / 5) % 1; s += '<circle cx="' + (424 - 26 * q) + '" cy="' + (YL - 40 + i * 20 + 8 * Math.sin(i)) + '" r="' + (6 * (1 - q)) + '" fill="#FFE14D"/>'; }
    s += okx1(885, YL - 40, 26, false, (l2 - .7) / .3); }
  const g = o.full && a !== undefined ? ease(cl(a / .6)) : 0, WW = 80 + 120 * g, out = lerp(27, 10, g); // Design 3.0: die eine Wand wird dicker, statt dass eine zweite dazukommt
  const amp = o.full ? (x => x < 430 ? 44 : x < 430 + WW ? lerp(44, out, (x - 430) / WW) : out) : (x => x < 430 ? 44 : x < 510 ? lerp(44, 27, (x - 430) / 80) : a === undefined || x < 640 ? 27 : x < 760 ? lerp(27, 10, (x - 640) / 120) : 10);
  if (d !== undefined) s += wave14(250, 790, YW, amp, 92, t * 9, '#5CE1FF', 10, d / .8);
  s += '<g transform="' + (o.full ? 'translate(470 1550) scale(1 ' + ease(cl((lt - .3) / .5)) + ') translate(-470 -1550)' : 'translate(470 912) scale(' + k + ') translate(-470 -912)') + '">' + brick14(430, WY, WW, WH, 'a', .86) + '</g>';
  if (a !== undefined && !o.full) { const k2 = back(cl(a / .35)); s += '<g transform="' + (o.full ? 'translate(700 1550) scale(1 ' + ease(cl(a / .45)) + ') translate(-700 -1550)' : 'translate(700 912) scale(' + k2 + ') translate(-700 -912)') + '">' + brick14(640, WY, 120, WH, 'b', .86) + '</g>'; }
  s += phone14(850, YW, d === undefined || d < .8 ? 0 : a !== undefined && a > .6 ? 1 : 3, (lt - .8) / .3);
  return s; }
const L14B = [['wand', 'Das Material entscheidet'], ['licht2', 'Ziegel schluckt Licht', 'red'], ['durch', 'WLAN kommt durch', 'hot'], ['act', 'Jede Wand schwächt das Signal', 'red']];

// ---------- Teil 3: Metall blockt, Wasser schluckt, Router frei, erhoeht und mittig, nicht in den Schrank ----------
// o.squirt: der Fisch spritzt Schalti nass (nur bisheriger Stil). o.room: Regal, Router und Wellen zeichnet der Ort selbst (Design 3.0)
function g14c(sc, ev, t, lt, o) { o = o || {}; let s = ''; const w = ev.wasser, f = ev.frei, a = ev.act, YW = 980;
  if (f === undefined && a === undefined) { const k = cl((lt - .5) / .3);
    s += '<g opacity="' + k + '">' + router14(170, YW + 62, .62, t) + '</g>';
    if (w === undefined) { // Metallplatte: Welle prallt ab
      s += wave14(240, 470, YW, 44, 92, t * 9, '#5CE1FF', 10, (lt - .7) / .6);
      s += '<defs><linearGradient id="mt14" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E8ECF5"/><stop offset=".5" stop-color="#8A93A8"/><stop offset="1" stop-color="#C9CFDD"/></linearGradient></defs><g transform="translate(505 940) scale(' + back(cl((lt - .4) / .4)) + ') translate(-505 -940)"><rect x="478" y="760" width="54" height="360" rx="8" fill="url(#mt14)" stroke="#0B1020" stroke-width="6"/>';
      for (let i = 0; i < 5; i++) s += '<circle cx="505" cy="' + (800 + i * 70) + '" r="9" fill="#5A6686" stroke="#0B1020" stroke-width="3"/>';
      s += '</g>'; for (let i = 0; i < 3; i++) { const c = (t * .9 + i / 3) % 1; s += '<path d="M' + (462 - 70 * c) + ' ' + (YW - 70 - 40 * c) + ' Q' + (420 - 100 * c) + ' ' + YW + ' ' + (462 - 70 * c) + ' ' + (YW + 70 + 40 * c) + '" stroke="#FF7A9A" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + ((1 - c) * cl((lt - 1.2) / .3)) + '"/>'; }
      s += chip3(700, 800, 'Stahlbeton', 34, '#C9CFDD', '#0B1020', (lt - 1.6) / .3) + phone14(820, YW + 30, 0, (lt - .8) / .3) + okx1(872, YW - 60, 26, false, (lt - 1.4) / .3);
    } else { // Aquarium: Welle verliert sich im Wasser
      const k2 = back(cl(w / .35)); s += wave14(240, 640, YW, x => x < 420 ? 44 : 44 * (1 - cl((x - 420) / 200)), 92, t * 9, '#5CE1FF', 10);
      s += '<g transform="translate(540 945) scale(' + k2 + ') translate(-540 -945)"><rect x="420" y="800" width="240" height="290" rx="14" fill="#2B8CFF" opacity=".5"/><path d="M420 ' + (832 + 5 * Math.sin(t * 3)) + ' q60 -14 120 0 t120 0 V800 H420 Z" fill="#0A1B36" opacity=".55"/><rect x="420" y="800" width="240" height="290" rx="14" fill="none" stroke="#F4F6FB" stroke-width="8"/><rect x="408" y="1086" width="264" height="26" rx="8" fill="#5A6686" stroke="#0B1020" stroke-width="5"/>';
      const fx = 540 + 70 * Math.sin(t * 1.3), dir = Math.cos(t * 1.3) > 0 ? 1 : -1; s += '<g transform="translate(' + fx + ' ' + (990 + 16 * Math.sin(t * 2.1)) + ') scale(' + dir + ' 1)"><ellipse rx="36" ry="21" fill="#FF8A3D" stroke="#0B1020" stroke-width="5"/><path d="M-32 0 L-62 -20 V20 Z" fill="#FF8A3D" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><circle cx="16" cy="-5" r="5" fill="#0B1020"/></g>';
      for (let i = 0; i < 5; i++) { const c = (t * .5 + i / 5) % 1; s += '<circle cx="' + (450 + i * 44) + '" cy="' + (1070 - 220 * c) + '" r="' + (5 + 3 * rnd(i)) + '" fill="none" stroke="#fff" stroke-width="3" opacity="' + (1 - c) + '"/>'; }
      s += '</g>' + phone14(820, YW + 30, w > .8 ? 1 : 0);
      if (o.squirt && w > .9 && w < 1.9) { const q = (w - .9) / 1; for (let i = 0; i < 9; i++) { const c = cl(q * 1.6 - i * .07); if (c <= 0 || c >= 1) continue; s += '<circle cx="' + lerp(520, 250, c) + '" cy="' + (lerp(815, 1250, c) - 190 * Math.sin(Math.PI * c)) + '" r="' + (11 - i * .6) + '" fill="#5CC8FF" stroke="#0B1020" stroke-width="3"/>'; } }
    }
    return s; }
  // Aufstellen: Regal in der Mitte, Router faehrt nach oben, Wellen breiten sich frei aus
  const fk = f === undefined ? 1 : ease(cl(f / .6)), ry = lerp(1104, 900, fk);
  if (!o.room) s += '<path d="M110 1110 H900" stroke="#3A4A7A" stroke-width="6" stroke-linecap="round"/>' + rings14(560, ry - 70, t, 4, '#5CE1FF', 330 * fk + 60, .75) + '<rect x="380" y="900" width="260" height="208" rx="12" fill="#17365F" stroke="#F4F6FB" stroke-width="6"/><path d="M380 1004 H640 M510 904 V1104" stroke="#2A5A94" stroke-width="5"/>' + router14(560, ry, .62, t);
  if (a === undefined) s += chip3(215, 790, 'frei', 38, '#3DFF7A', '#0B1020', (f - .7) / .3) + chip3(800, 790, 'erhöht', 38, '#3DFF7A', '#0B1020', (f - 1.2) / .3) + chip3(800, 1010, 'mittig', 38, '#3DFF7A', '#0B1020', (f - 1.7) / .3);
  else [[215, 'Schrank', 0], [805, 'Fernseher', .5]].forEach(q => { const k = back(cl((a - q[2]) / .35)); if (k <= 0) return; s += '<g transform="translate(' + q[0] + ' 965) scale(' + k + ')"><rect x="-105" y="-125" width="210" height="250" rx="22" fill="#1B2748" stroke="#F4F6FB" stroke-width="6"/>' + (q[2] === 0 ? '<rect x="-64" y="-92" width="128" height="140" rx="8" fill="#7A5230" stroke="#0B1020" stroke-width="5"/><path d="M0 -92 V48" stroke="#0B1020" stroke-width="5"/><circle cx="-14" cy="-20" r="6" fill="#FFD23F"/><circle cx="14" cy="-20" r="6" fill="#FFD23F"/>' : '<rect x="-74" y="-88" width="148" height="100" rx="8" fill="#0B1020" stroke="#C9CFDD" stroke-width="6"/><path d="M-30 30 H30 M0 12 V30" stroke="#C9CFDD" stroke-width="7" stroke-linecap="round"/>') + svgT(0, 100, q[1], 32, '#F4F6FB') + '</g>' + okx1(q[0] + 78, 850, 30, false, (a - q[2] - .4) / .3); });
  return s; }
const L14C = [['metall', 'Metall blockt: Stahlbeton'], ['wasser', 'Wasser schluckt die Wellen', 'red'], ['frei', 'Router: frei, erhöht, mittig', 'hot'], ['act', 'Nicht in den Schrank', 'red']];
