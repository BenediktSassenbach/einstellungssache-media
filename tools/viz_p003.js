// Physik v4: P003 "Wie laedt dein Handy ohne Kabel?" komplett neu (Vollbild-Welten, ein Etikett zur Zeit).
const ACF = .6; // Wechselstrom: hin und her, 0,6 mal pro Sekunde (sichtbar langsam)
const acS = t => Math.cos(2 * Math.PI * ACF * t); // Vorzeichen = Stromrichtung
function spiralD(cx, cy, r0, r1, turns, sq) { let d = ''; for (let i = 0; i <= 240; i++) { const u = i / 240, r = r0 + (r1 - r0) * u, a = turns * 6.283 * u; d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a) * sq).toFixed(1); } return d; }
function spiralP(cx, cy, r0, r1, turns, sq, u) { const r = r0 + (r1 - r0) * u, a = turns * 6.283 * u; return [cx + r * Math.cos(a), cy + r * Math.sin(a) * sq]; }
function padSide(cx, cy, rx, glow) { let s = '<ellipse cx="' + cx + '" cy="' + (cy + 22) + '" rx="' + (rx + 20) + '" ry="' + (rx * .2 + 8) + '" fill="#0B1020" opacity=".6"/><ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (rx + 20) + '" ry="' + (rx * .2 + 6) + '" fill="#26335E" stroke="#56618A" stroke-width="6"/>';
  for (let r = 40; r <= rx; r += 32) s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + r + '" ry="' + (r * .2) + '" fill="none" stroke="#E08A3C" stroke-width="6" opacity="' + (.6 + .4 * (glow || 0)) + '"/>'; return s; }
function fieldLoops(cx, cy, n, reach, op, sgn, t) { let s = ''; for (let i = 1; i <= n; i++) { const H = (90 + 70 * i) * reach, Wd = 150 + 55 * i, o = op * (1 - (i - 1) / (n + 1));
    for (const m of [-1, 1]) { const d = 'M' + cx + ' ' + cy + ' C ' + cx + ' ' + (cy - H) + ', ' + (cx + m * Wd) + ' ' + (cy - H) + ', ' + (cx + m * Wd) + ' ' + cy; s += '<path d="' + d + '" fill="none" stroke="' + (sgn >= 0 ? '#B05CFF' : '#5CE1FF') + '" stroke-width="5" opacity="' + o + '" stroke-dasharray="14 12" stroke-dashoffset="' + (sgn * t * 60) + '"/>'; } }
  return s; }

// ---------- Einstieg: Kabel ab, Handy landet auf der Matte ----------
WORLD.p3hook = function (sc, ev, t, lt) {
  let s = bgRad('#0B0A1A', '#231A4A', .55) + dust(t, '#B05CFF', 26, .15);
  const m = ev.mark === undefined ? -1 : ev.mark, cut = m > .7, fall = cl((m - .9) / .5), land = ease(cl((m - 1.3) / .9)), py = lerp(800, 965, land), CX = 540;
  const fail = ev.nicht !== undefined;
  s += padSide(CX, 1050, 250, land);
  if (land >= 1 && !fail) for (let i = 0; i < 4; i++) { const c = (t * 1.2 + i / 4) % 1; s += '<ellipse cx="' + CX + '" cy="1045" rx="' + (80 + 240 * c) + '" ry="' + ((80 + 240 * c) * .22) + '" fill="none" stroke="#B05CFF" stroke-width="5" opacity="' + (1 - c) + '"/>'; }
  // Kabel
  if (!cut) s += '<path d="M' + (CX + 200) + ' ' + py + ' C 860 ' + py + ', 880 760, 1100 720" stroke="#F4F6FB" stroke-width="16" fill="none"/>';
  else if (fall < 1) { s += '<path d="M' + (CX + 200) + ' ' + (py + 300 * fall * fall) + ' l 90 0" stroke="#F4F6FB" stroke-width="16" opacity="' + (1 - fall) + '"/><path d="M880 ' + (780 + 400 * fall * fall) + ' C 920 770, 980 750, 1100 720" stroke="#F4F6FB" stroke-width="16" fill="none" opacity="' + (1 - fall) + '"/>'; }
  if (m > .2 && m < 1.2) { const k = cl((m - .2) / .5), op = 1 - cl((m - .9) / .3), a = 25 * Math.sin(Math.PI * k * 2); s += '<g transform="translate(850 ' + (py + 10) + ') scale(1.3)" opacity="' + op + '"><g transform="rotate(' + a + ')"><rect x="-6" y="-70" width="12" height="70" fill="#C8CFE0"/><circle cx="-14" cy="18" r="18" fill="none" stroke="#FF5A5A" stroke-width="9"/></g><g transform="rotate(' + (-a) + ')"><rect x="-6" y="-70" width="12" height="70" fill="#E6EAF4"/><circle cx="14" cy="18" r="18" fill="none" stroke="#FF5A5A" stroke-width="9"/></g></g>'; }
  // Handy
  s += '<rect x="' + (CX - 200) + '" y="' + (py - 46) + '" width="400" height="92" rx="46" fill="#3A4A7A" stroke="#fff" stroke-width="7"/>';
  const lv = fail ? .2 : land >= 1 ? .25 + .6 * cl((m - 2.2) / 4) : .25; s += batt(CX - 60, py - 24, 100, 48, lv, fail ? '#FF5A5A' : '#2ECC71');
  if (land >= 1 && !fail) s += bolt(CX + 90, py - 110 - 10 * Math.abs(Math.sin(t * 6)), 1.3);
  if (fail) { const b = Math.abs(Math.sin(t * 6)); s += svgT(CX + 100, py - 80, '?', 110, '#FF5A5A'); s += '<circle cx="' + (CX + 230) + '" cy="1052" r="12" fill="#FF5A5A" opacity="' + b + '"/>'; }
  return W(s + topShade());
};
WMASC.p3hook = (ev, t) => { const m = ev.mark;
  if (ev.nicht !== undefined) return { f: [200, 1110], s: .48, r: 6 * Math.sin(t * 10) };
  if (m !== undefined && m < 1.3) return { f: [880, 1110], s: .44 };
  return { f: [200, 1110], s: .48 };
};

// ---------- Teil 1: Spule, Wechselstrom, Magnetfeld ----------
WORLD.p3spule = function (sc, ev, t, lt) {
  let s = bgRad('#0B0A1A', '#231A4A', .55) + dust(t, '#B05CFF', 24, .12), h = '';
  const sg = acS(t), side = ev.p2 === undefined ? 0 : ease(cl(ev.p2 / .9)), CX = 540, cy = lerp(905, 1050, side), sq = lerp(1, .22, side), R1 = lerp(215, 260, side);
  const draw = ease(cl(lt / 1.6));
  s += '<ellipse cx="' + CX + '" cy="' + (cy + 8 * side) + '" rx="' + (R1 + 34) + '" ry="' + ((R1 + 34) * sq) + '" fill="#26335E" stroke="#56618A" stroke-width="6"/>';
  s += '<path d="' + spiralD(CX, cy, 26, R1, 7, sq) + '" fill="none" stroke="#E08A3C" stroke-width="' + lerp(9, 6, side) + '" stroke-linecap="round" pathLength="1" stroke-dasharray="' + draw + ' 1"/>';
  if (ev.p1 !== undefined) { const ph = .05 * Math.sin(2 * Math.PI * ACF * t);
    for (let i = 0; i < 26; i++) { const u = ((i / 26 + ph) % 1 + 1) % 1, p = spiralP(CX, cy, 26, R1, 7, sq, u); s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + lerp(9, 6, side) + '" fill="#FFE14D"/>'; }
    if (!side) { const a0 = sg >= 0 ? -.5 : 3.64, dir = sg >= 0 ? 1 : -1, R = 255, k = Math.abs(sg); for (const off of [0, Math.PI]) { const a1 = a0 + off, a2 = a1 + dir * 1.2, x2 = CX + R * Math.cos(a2), y2 = 905 + R * Math.sin(a2), tx = -Math.sin(a2) * dir, ty = Math.cos(a2) * dir;
        s += '<path d="M' + (CX + R * Math.cos(a1)) + ' ' + (905 + R * Math.sin(a1)) + ' A' + R + ' ' + R + ' 0 0 ' + (dir > 0 ? 1 : 0) + ' ' + x2 + ' ' + y2 + '" stroke="#FFE14D" stroke-width="12" fill="none" opacity="' + (.3 + .7 * k) + '"/><path d="M' + (x2 + tx * 26) + ' ' + (y2 + ty * 26) + ' L' + (x2 - ty * 20) + ' ' + (y2 + tx * 20) + ' L' + (x2 + ty * 20) + ' ' + (y2 - tx * 20) + ' Z" fill="#FFE14D" opacity="' + (.3 + .7 * k) + '"/>'; } } }
  if (side > .5) { const reach = ev.act === undefined ? 1 : lerp(1, .55, ease(cl(ev.act / 1.2))), op = (side - .5) * 2 * (ev.act === undefined ? 1 : lerp(1, .45, ease(cl(ev.act / 1.2))));
    s += fieldLoops(CX, cy - 6, 4, reach, op, sg, t);
    if (ev.p3 !== undefined) { const fo = ev.act === undefined ? 1 : 1 - cl(ev.act / .6), k = back(cl(ev.p3 / .4)) * fo, up = sg >= 0; s += '<g opacity="' + fo + '">'; s += '<g transform="translate(' + CX + ' 760) scale(' + k + ')"><circle r="58" fill="' + (up ? '#FF5A5A' : '#3B8BFF') + '" stroke="#fff" stroke-width="7"/>' + svgT(0, 22, up ? 'N' : 'S', 62, '#fff') + '</g>';
      const na = 90 * (1 - Math.max(-1, Math.min(1, sg * 3))); s += '<g transform="translate(850 800)"><circle r="70" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/><g transform="rotate(' + na + ')"><path d="M0 -56 L14 0 L-14 0 Z" fill="#FF3B3B"/><path d="M0 56 L14 0 L-14 0 Z" fill="#3B8BFF"/></g><circle r="9" fill="#0B1020"/></g></g>'; }
    if (false) { const k = 0; s += '<defs><linearGradient id="fade3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0A1A" stop-opacity="' + (.95 * k) + '"/><stop offset="1" stop-color="#0B0A1A" stop-opacity="0"/></linearGradient></defs><rect x="0" y="690" width="1080" height="250" fill="url(#fade3)"/>'; } }
  h += slot(ev, [['panel', 'Spule = Draht im Kreis'], ['p1', 'Wechselstrom: hin und her', 'hot'], ['p2', 'Strom macht ein Magnetfeld'], ['p3', 'Feld polt ständig um', 'hot'], ['act', 'Reicht nur ein kleines Stück', 'red']]);
  return W(s + topShade(), h);
};
WMASC.p3spule = (ev, t) => {
  if (ev.act !== undefined) { const k = cl(ev.act / 2.2), y = 1050 - 260 * Math.sin(Math.PI * k); return { f: [860, y], s: .36, r: k > 0 && k < 1 ? 12 * Math.sin(t * 6) : 0 }; }
  if (ev.p2 !== undefined) return { f: [860, 1050], s: .36, r: 14 * Math.max(-1, Math.min(1, acS(t) * 3)) };
  if (ev.p1 !== undefined) { const a = .25 + 1.0 * Math.sin(2 * Math.PI * ACF * t); return { f: [540 + 238 * Math.cos(a), 905 + 238 * Math.sin(a)], s: .3, walk: true, flip: Math.cos(2 * Math.PI * ACF * t) < 0 }; }
  return { f: [860, 1110], s: .4 };
};

// ---------- Teil 2: zweite Spule im Handy, Induktion ----------
WORLD.p3induk = function (sc, ev, t, lt) {
  let s = bgRad('#0B0A1A', '#2A1A5A', .55) + dust(t, '#B05CFF', 24, .12), h = '';
  const CX = 540, sg = acS(t);
  if (ev.act === undefined) {
    const down = ev.p1 === undefined ? 0 : ease(cl(ev.p1 / 1)), lift = ev.heben === undefined ? 0 : ease(cl(ev.heben / 1)), py = lerp(800, 975, down) - 125 * lift;
    s += padSide(CX, 1075, 260, 1);
    const reach = 1 - .4 * lift; s += fieldLoops(CX, 1068, 4, reach, .9, sg, t);
    s += '<rect x="' + (CX - 210) + '" y="' + (py - 42) + '" width="420" height="84" rx="42" fill="#3A4A7A" stroke="#fff" stroke-width="7" opacity=".92"/>';
    for (let r = 40; r <= 150; r += 28) s += '<ellipse cx="' + (CX - 30) + '" cy="' + py + '" rx="' + r + '" ry="' + (r * .17) + '" fill="none" stroke="#E08A3C" stroke-width="5"/>';
    const flow = (ev.p2 !== undefined) && down > .9 && lift < .5;
    if (flow) for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + .9 * Math.sin(2 * Math.PI * ACF * t); s += '<circle cx="' + (CX - 30 + 150 * Math.cos(a)) + '" cy="' + (py + 25 * Math.sin(a)) + '" r="7" fill="#FFE14D"/>'; }
    const into = ev.p3 !== undefined && lift < .5; let lv = .2; if (ev.p3 !== undefined) lv = .2 + .5 * cl((ev.heben === undefined ? ev.p3 : 1.6) / 3);
    s += batt(CX + 130, py - 22, 62, 44, lv);
    if (into) { for (let i = 0; i < 4; i++) { const c = (t * 1.4 + i / 4) % 1; s += '<circle cx="' + lerp(CX + 120, CX + 150, c) + '" cy="' + (py - 2) + '" r="6" fill="#FFE14D" opacity="' + (1 - c) + '"/>'; } s += bolt(CX + 165, py - 90 - 8 * Math.abs(Math.sin(t * 6)), 1); }
    if (lift > .5) s += '<g transform="translate(' + (CX + 165) + ' ' + (py - 90) + ')"><path d="M-26 -26 L26 26 M26 -26 L-26 26" stroke="#FF5A5A" stroke-width="12" stroke-linecap="round"/></g>';
  } else if (ev.act2 === undefined) { // Faraday 1831: Jahreszaehler laeuft zurueck
    const k = ease(cl(ev.act / 1.8)), yr = Math.round(lerp(2026, 1831, k));
    for (let i = 0; i < 12; i++) { const a = i * .5236; s += '<line x1="' + (CX + 210 * Math.sin(a)) + '" y1="' + (910 - 210 * Math.cos(a)) + '" x2="' + (CX + 235 * Math.sin(a)) + '" y2="' + (910 - 235 * Math.cos(a)) + '" stroke="#B05CFF" stroke-width="8"/>'; }
    const sp = (1 - k) * 30 + .5, a1 = t * sp; s += '<circle cx="' + CX + '" cy="910" r="250" fill="none" stroke="#B05CFF" stroke-width="10" opacity=".7"/><line x1="' + CX + '" y1="910" x2="' + (CX + 170 * Math.sin(a1)) + '" y2="' + (910 - 170 * Math.cos(a1)) + '" stroke="#B05CFF" stroke-width="10" stroke-linecap="round" opacity=".6"/>';
    s += '<rect x="' + (CX - 190) + '" y="845" width="380" height="130" rx="24" fill="#fff"/>' + svgT(CX, 945, String(yr), 110, '#0B1020');
  } else { // Zahnbuerste: gleicher Trick
    const k = ease(cl(ev.act2 / .8)), BX = 330;
    s += padSide(BX, 1080, 130, 1) + fieldLoops(BX, 1072, 3, .7, .8 * k, sg, t);
    s += '<g opacity="' + k + '"><rect x="' + (BX - 40) + '" y="' + (1060 - 250 * k) + '" width="80" height="240" rx="36" fill="#F4F6FB" stroke="#0B1020" stroke-width="5"/><rect x="' + (BX - 14) + '" y="' + (1040 - 320 * k) + '" width="28" height="90" rx="10" fill="#E6EAF4"/><rect x="' + (BX - 20) + '" y="' + (1040 - 330 * k) + '" width="40" height="42" rx="8" fill="#5CE1FF"/><rect x="' + (BX + 20) + '" y="' + (1040 - 326 * k) + '" width="18" height="34" rx="4" fill="#fff"/>';
    for (let r = 14; r <= 34; r += 10) s += '<ellipse cx="' + BX + '" cy="' + (1040 - 30 * k) + '" rx="' + r + '" ry="' + (r * .3) + '" fill="none" stroke="#E08A3C" stroke-width="4"/>'; s += '</g>';
    s += padSide(740, 1080, 150, 1) + '<rect x="610" y="1010" width="260" height="60" rx="30" fill="#3A4A7A" stroke="#fff" stroke-width="6"/>' + bolt(740, 940 - 8 * Math.abs(Math.sin(t * 6)), 1) + bolt(BX + 90, 800 - 8 * Math.abs(Math.sin(t * 6 + 1)), 1, '#FFE14D', k);
  }
  h += slot(ev, [['panel', 'Zweite Spule im Handy'], ['p1', 'Feld geht durch die Spule'], ['p2', 'Feld schiebt Elektronen', 'hot'], ['p3', 'Strom fließt in den Akku', 'hot'], ['heben', 'Zu weit weg: kein Laden', 'red'], ['act', 'Induktion, entdeckt 1831', 'hot'], ['act2', 'Gleicher Trick: Zahnbürste', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.p3induk = (ev, t) => {
  if (ev.act2 !== undefined) return { f: [560, 1100], s: .38 };
  if (ev.act !== undefined) return { f: [880, 1110], s: .4 };
  if (ev.heben !== undefined) { const lift = ease(cl(ev.heben / 1)); return { f: [lerp(300, 440, lift), 1062], s: .44, r: 3 * Math.sin(t * 12) * lift, walk: lift > 0 && lift < 1 }; }
  if (ev.p2 !== undefined) return { f: [430, 932], s: .28, r: 8 * Math.sin(t * 8) };
  if (ev.p1 !== undefined) { const down = ease(cl(ev.p1 / 1)); return { f: [430, lerp(758, 932, down)], s: .28 }; }
  return { f: [430, 758], s: .28 };
};

// ---------- Teil 3: Laedt nicht? ----------
WORLD.p3fehler = function (sc, ev, t, lt) {
  let s = bgRad('#0B0A1A', '#231A4A', .55) + dust(t, '#B05CFF', 22, .12), h = '';
  const CX = 540, CY = 915, fixd = ev.p1 !== undefined, off = fixd ? 0 : ev.schief !== undefined && ev.metall === undefined ? 200 * ease(cl(ev.schief / .9)) : 0;
  const snap = fixd ? 1 - ease(cl(ev.p1 / .7)) : 0, ox = off + 120 * snap * (ev.p1 !== undefined && ev.p1 < .7 ? 1 : 0);
  const caseOn = ev.metall !== undefined && ev.p2 === undefined, caseOut = ev.p2 !== undefined ? ease(cl(ev.p2 / 1)) : 0, metalIn = ev.metall !== undefined ? ease(cl(ev.metall / .8)) : 0;
  const good = ev.p3 !== undefined;
  s += '<circle cx="' + CX + '" cy="' + CY + '" r="215" fill="#26335E" stroke="#56618A" stroke-width="7"/>';
  for (let r = 50; r <= 170; r += 30) s += '<circle cx="' + CX + '" cy="' + CY + '" r="' + r + '" fill="none" stroke="#E08A3C" stroke-width="7" opacity="' + (good ? .6 + .4 * Math.abs(Math.sin(t * 4 + r)) : .7) + '"/>';
  const led = good ? '#2ECC71' : (ev.schief !== undefined || ev.metall !== undefined) && !fixd ? '#FF5A5A' : '#FFCC00'; s += '<circle cx="' + CX + '" cy="' + (CY + 190) + '" r="13" fill="' + led + '" opacity="' + (.6 + .4 * Math.abs(Math.sin(t * 5))) + '"/>';
  const px = CX + ox; if (metalIn > 0 && caseOut < 1) { const mx = lerp(-300, px - 150, metalIn) - 700 * caseOut; s += '<defs><linearGradient id="mt3" x1="0" x2="1"><stop offset="0" stop-color="#8A93A8"/><stop offset=".5" stop-color="#E6EAF4"/><stop offset="1" stop-color="#8A93A8"/></linearGradient></defs><rect x="' + mx + '" y="' + (CY - 90) + '" width="300" height="180" rx="18" fill="url(#mt3)" stroke="#fff" stroke-width="5" opacity=".95"/>'; }
  s += '<rect x="' + (px - 115) + '" y="' + (CY - 195) + '" width="230" height="390" rx="42" fill="#3A4A7A" stroke="#fff" stroke-width="8" opacity=".9"/>';
  s += '<circle cx="' + px + '" cy="' + CY + '" r="80" fill="none" stroke="#5CE1FF" stroke-width="7" stroke-dasharray="14 10"/>';
  if (caseOn || (caseOut > 0 && caseOut < 1)) s += '<rect x="' + (px - 140 - 700 * caseOut) + '" y="' + (CY - 220) + '" width="280" height="440" rx="56" fill="none" stroke="#8A3B5A" stroke-width="30" opacity=".95"/>';
  if (metalIn >= 1 && caseOut === 0) for (let i = 0; i < 5; i++) { const c = (t * 2.5 + i * .3) % 1, a = i * 1.25 + t; s += '<path d="M' + (px + 160 * Math.cos(a)) + ' ' + (CY + 100 * Math.sin(a)) + ' l 14 -22 l -10 0 l 14 -22" stroke="#FFE14D" stroke-width="6" fill="none" opacity="' + (1 - c) + '"/>'; }
  if (off > 40 && !fixd) s += '<line x1="' + CX + '" y1="' + CY + '" x2="' + px + '" y2="' + CY + '" stroke="#FF5A5A" stroke-width="8" stroke-dasharray="14 10"/><path d="M' + (CX + off / 2 - 26) + ' ' + (CY - 26) + ' l52 52 m0 -52 l-52 52" stroke="#FF5A5A" stroke-width="14" stroke-linecap="round"/>';
  if (fixd && ev.p1 > .7 && !good) { const c = (t % 1); s += '<circle cx="' + CX + '" cy="' + CY + '" r="' + (90 + 40 * c) + '" fill="none" stroke="#2ECC71" stroke-width="8" opacity="' + (1 - c) + '"/>'; }
  if (good) { const k = ease(cl(ev.p3 / .9)); s += '<rect x="' + lerp(1100, 800, k) + '" y="1030" width="110" height="80" rx="16" fill="#F4F6FB" stroke="#0B1020" stroke-width="5"/><path d="M' + lerp(1100, 800, k) + ' 1070 C 760 1070, 760 1105, ' + (CX + 160) + ' 1060" stroke="#F4F6FB" stroke-width="10" fill="none"/>' + bolt(px + 175, CY - 120 - 8 * Math.abs(Math.sin(t * 6)), 1.1); }
  if (ev.act !== undefined) { const k = cl(ev.act / .5), a = t * 1.6, mx = CX + 140 * Math.cos(a), my = CY + 90 * Math.sin(a); s += '<g opacity="' + k + '"><circle cx="' + mx + '" cy="' + my + '" r="90" fill="#5CE1FF" fill-opacity=".18" stroke="#fff" stroke-width="12"/><line x1="' + (mx + 64) + '" y1="' + (my + 64) + '" x2="' + (mx + 140) + '" y2="' + (my + 140) + '" stroke="#fff" stroke-width="22" stroke-linecap="round"/></g>'; }
  h += slot(ev, [['panel', 'Typische Gründe'], ['schief', 'Spulen verfehlen sich', 'red'], ['metall', 'Hülle oder Metall blockt', 'red'], ['p1', '1. Mittig auflegen', 'hot'], ['p2', '2. Hülle und Metall weg', 'hot'], ['p3', '3. Empfohlenes Netzteil', 'hot'], ['act', 'Sonst: prüfen lassen']]);
  return W(s + topShade(), h);
};
WMASC.p3fehler = (ev, t) => { const CX = 540, CY = 915;
  if (ev.act !== undefined) return { f: [180, 1115], s: .42 };
  if (ev.p3 !== undefined) return { f: [870, 1020], s: .34 };
  if (ev.p2 !== undefined) { const k = ease(cl(ev.p2 / 1)); return { f: [lerp(330, 120, k), 1115], s: .4, walk: k > 0 && k < 1, flip: true }; }
  if (ev.p1 !== undefined) { const k = ease(cl(ev.p1 / .7)); return { f: [lerp(CX + 200 - 150, CX - 150, k), 1000], s: .34, walk: k < 1 }; }
  if (ev.metall !== undefined) return { f: [180, 1115], s: .42, r: 6 * Math.sin(t * 12) };
  if (ev.schief !== undefined) { const k = ease(cl(ev.schief / .9)); return { f: [lerp(CX - 150, CX + 200 - 150, k), 1000], s: .34, walk: k < 1 }; }
  return { f: [180, 1115], s: .42 };
};

// ---------- Schluss ----------
WORLD.p3outro = function (sc, ev, t) {
  let s = bgRad('#0B0A1A', '#231A4A', .6) + dust(t, '#B05CFF', 30, .15);
  s += padSide(700, 1080, 180, 1); for (let i = 0; i < 3; i++) { const c = (t * 1.1 + i / 3) % 1; s += '<ellipse cx="700" cy="1075" rx="' + (60 + 180 * c) + '" ry="' + ((60 + 180 * c) * .22) + '" fill="none" stroke="#B05CFF" stroke-width="5" opacity="' + (1 - c) + '"/>'; }
  s += '<rect x="540" y="1000" width="320" height="70" rx="35" fill="#3A4A7A" stroke="#fff" stroke-width="6"/>' + bolt(700, 920 - 8 * Math.abs(Math.sin(t * 6)), 1);
  return W(s + topShade());
};
