// P004V3 "Warum ist der Himmel blau?" im Design 3.0. Teile 1 bis 3 und Schluss wortgleich mit P004, neuer Einstieg.
// Ort: Wiese unter freiem Himmel. Der Himmel selbst ist das Hauptobjekt und fuellt das Bild. Er veraendert sich an Ort und Stelle:
//   Teil 2: der blasse Himmel faerbt sich blau, weil das Blau gestreut wird. Teil 3: die Sonne sinkt, derselbe Himmel wird orange und rot.
// Helfer aus viz_v3.js und viz_v3b.js. Zum Loeschen dieser Fassung: diese Datei und videos/P004V3.
function mx4(a, b, k) { k = cl(k); const h = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)), A = h(a), B = h(b); return '#' + A.map((x, i) => Math.round(lerp(x, B[i], k)).toString(16).padStart(2, '0')).join(''); }
// o: day (0 blass, 1 blau), eve (Abend 0 bis 1), night (0 bis 1), sun [x, y], rays (Sonnenstrahlen 0 bis 1)
function sky4(t, o) { o = o || {}; const day = o.day === undefined ? 1 : cl(o.day), eve = cl(o.eve || 0), ni = cl(o.night || 0), S = o.sun || [800, 770];
  const top = mx4(mx4(mx4('#4A4F7A', '#0E4FC8', day), '#3A1E6A', eve), '#03040F', ni), bot = mx4(mx4(mx4('#A8A8C4', '#8FD0FF', day), '#FF7A3D', eve), '#0A0C2A', ni);
  let s = '<defs><linearGradient id="s4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bot + '"/></linearGradient></defs><rect width="1080" height="1600" fill="url(#s4)"/>';
  s += '<circle cx="' + S[0] + '" cy="' + S[1] + '" r="' + (170 + 8 * Math.sin(t * 2)) + '" fill="' + mx4('#FFF6C8', '#FF8A2A', eve) + '" opacity=".28"/>';
  if (o.rays !== 0) for (let i = 0; i < 10; i++) { const a = i * .628 + t * .25; s += '<path d="M' + (S[0] + 84 * Math.cos(a)) + ' ' + (S[1] + 84 * Math.sin(a)) + ' L' + (S[0] + 118 * Math.cos(a)) + ' ' + (S[1] + 118 * Math.sin(a)) + '" stroke="' + mx4('#FFF6C8', '#FFB03D', eve) + '" stroke-width="9" stroke-linecap="round" opacity="' + (.8 * (1 - eve)) + '"/>'; }
  s += '<circle cx="' + S[0] + '" cy="' + S[1] + '" r="66" fill="' + mx4('#FFFBE0', '#FFB03D', eve) + '"/>';
  s += '<path d="M-20 1330 Q200 1230 460 1310 T900 1262 T1100 1310 V1600 H-20 Z" fill="' + mx4('#1E6A3A', '#3A2440', eve) + '"/>';
  s += '<rect x="930" y="1330" width="24" height="210" fill="#3E2618"/><circle cx="942" cy="1290" r="82" fill="' + mx4('#17552E', '#2A1A30', eve) + '"/><circle cx="890" cy="1330" r="54" fill="' + mx4('#17552E', '#2A1A30', eve) + '"/><circle cx="994" cy="1334" r="50" fill="' + mx4('#17552E', '#2A1A30', eve) + '"/>';
  s += '<path d="M-20 1548 Q300 1512 600 1552 T1100 1540 V1920 H-20 Z" fill="' + mx4('#2E9A4A', '#4A2A3A', eve) + '" stroke="' + mx4('#7FE08A', '#A85A5A', eve) + '" stroke-width="6"/>';
  for (let i = 0; i < 9; i++) s += '<circle cx="' + (60 + i * 118 + 30 * rnd(i)) + '" cy="' + (1600 + 120 * rnd(i + 7)) + '" r="9" fill="' + ['#FFE14D', '#FF6BD6', '#fff'][i % 3] + '" opacity="' + (1 - .6 * eve) + '"/>';
  if (ni > 0) s += '<rect y="1200" width="1080" height="720" fill="#000" opacity="' + (.6 * ni) + '"/>';
  return s; }
function cloud4(x, y, s, op) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" opacity="' + (op === undefined ? 1 : op) + '"><ellipse cx="0" cy="20" rx="150" ry="50" fill="#fff"/><circle cx="-70" cy="0" r="56" fill="#fff"/><circle cx="10" cy="-30" r="74" fill="#fff"/><circle cx="86" cy="4" r="52" fill="#fff"/></g>'; }
function wave4(x0, x1, Y, A, L, ph, col, w, k) { const xe = lerp(x0, x1, cl(k)); if (xe <= x0 + 4) return ''; let d = ''; for (let x = x0; x <= xe; x += 4) d += (x === x0 ? 'M' : 'L') + x + ' ' + (Y + A * Math.sin(2 * Math.PI * (x - x0) / L - ph)).toFixed(1); return '<path d="' + d + '" fill="none" stroke="#0B1020" stroke-width="' + (w + 8) + '" stroke-linecap="round" stroke-linejoin="round" opacity=".35"/><path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>'; }

// Einstieg. Gag aus dem Objekt: Beim Nachsatz "abends rot" rauscht die Sonne hinter den Huegel, der Himmel wird rot und dann stockdunkel.
// Schalti steht im Dunkeln und erschrickt, dann springt die Sonne wieder hoch. Einschlag (Licht aus) bei 0,5 s
const gs4 = e => e === undefined ? 0 : e < .5 ? ease(e / .5) : e < 1.7 ? 1 : e < 2.2 ? 1 - back((e - 1.7) / .5) : 0;
WORLD.h7p4_3 = function (sc, ev, t, lt) { const e = ev.gag, k = gs4(e), hit = e !== undefined && e >= .5 ? e - .5 : undefined, sh = shake7(hit, t);
  let s = sky4(t, { sun: [800, lerp(770, 1500, k)], eve: e === undefined ? 0 : e < .5 ? k : e < 1.7 ? 1 : k, night: e === undefined ? 0 : e < .35 ? 0 : e < 1.7 ? cl((e - .35) / .2) : k }) + cloud4(330, 840 + 6 * Math.sin(t), .8, .9 * (1 - k));
  if (hit !== undefined && hit < 1.2) s += word7('LICHT AUS!', 490, 900, hit, '#FFE14D', -5);
  return W('<g transform="translate(' + (sh[0] * .5) + ' ' + (sh[1] * .5) + ')">' + s + '</g>' + shade3()); };
WMASC.h7p4_3 = (ev, t, lt, sc) => { const e = ev.gag; if (e === undefined) return since3(sc, 3, lt) < 0 ? stay3(HOME3, 1, { r: -3 + 2 * Math.sin(t * 2) }) : stay3([220, 1537 - 6 * Math.abs(Math.sin(t * 5))], 1, { r: 8, prop: '👆' });
  if (e < .5) return stay3(HOME3, 1, { r: 8 + 14 * e });
  if (e < 1.7) return stay3([220 + 5 * Math.sin(t * 38), 1537], 1, { r: 4 * Math.sin(t * 30), fx: 'brightness(.5)' });
  return stay3([220, 1537 - 40 * Math.abs(Math.sin(Math.PI * cl((e - 1.7) / .5)))], 1); };

// Teil 1: Sonnenlicht ist gemischt. Der weisse Strahl faechert sich in alle Farben auf, Rot bleibt als lange Welle, Blau als kurze
const C4 = ['#FF4D4D', '#FF9A3D', '#FFE14D', '#3DFF7A', '#3DB8FF', '#B05CFF'];
WORLD.p4a_3 = function (sc, ev, t, lt) { const p1 = ev.p1, p2 = ev.p2, p3 = ev.p3, a = ev.act, SX = 190, SY = 800;
  let s = sky4(t, { sun: [SX, SY] });
  const bk = cl((lt - .5) / .6), fan = p1 === undefined ? 0 : p2 === undefined ? ease(cl(p1 / .7)) : 1 - cl(p2 / .4);
  if (p2 === undefined || fan > 0) { const xe = lerp(SX + 80, 520, bk); s += '<path d="M' + (SX + 80) + ' ' + SY + ' L' + xe + ' ' + (SY + 40) + '" stroke="#0B1020" stroke-width="40" stroke-linecap="round" opacity="' + (.25 * (p2 === undefined ? 1 : fan)) + '"/><path d="M' + (SX + 80) + ' ' + SY + ' L' + xe + ' ' + (SY + 40) + '" stroke="#fff" stroke-width="28" stroke-linecap="round" opacity="' + (p2 === undefined ? 1 : fan) + '"/>'; }
  if (fan > 0) C4.forEach((c, i) => { const y = 700 + i * 80; s += '<path d="M520 ' + (SY + 40) + ' L' + lerp(520, 930, fan) + ' ' + lerp(SY + 40, y, fan) + '" stroke="' + c + '" stroke-width="22" stroke-linecap="round" opacity="' + cl(fan * 2) + '"/>'; });
  if (p1 === undefined) s += chip3(380, 700, 'weißes Licht?', 40, '#F4F6FB', '#0B1020', (lt - 1.1) / .3);
  if (p2 !== undefined) s += wave4(110, 930, 850, 60, 270, t * 3, '#FF4D4D', 16, p2 / .7) + chip3(760, 730, 'Rot: lange Welle', 36, '#FF4D4D', '#fff', (p2 - .6) / .3);
  if (p3 !== undefined) s += wave4(110, 930, 1040, 34, 62, t * 9, '#3DB8FF', 12, p3 / .7) + chip3(700, 965, 'Blau: kurz, schwingt öfter', 34, '#3DB8FF', '#0B1020', (p3 - .6) / .3);
  if (a !== undefined) s += '<g transform="translate(330 960) scale(' + back(cl(a / .35)) + ') rotate(' + (-5 + 1.5 * Math.sin(t * 4)) + ')"><rect x="-170" y="-50" width="340" height="100" rx="26" fill="#FFD23F" stroke="#0B1020" stroke-width="7"/>' + svgT(0, 18, 'Der Trick!', 52, '#0B1020') + '</g>';
  return W(s + shade3(), slot(ev, [['panel', 'Sonnenlicht: gar nicht einfach weiß'], ['p1', 'Eine Mischung aus allen Farben', 'hot'], ['p2', 'Rot schwingt in langen Wellen'], ['p3', 'Blau in kurzen: viel öfter pro Sekunde'], ['act', 'Genau das ist der Trick', 'hot']])); };
WMASC.p4a_3 = (ev, t) => ev.p1 !== undefined && ev.p2 === undefined ? stay3(HOME3, 1, { prop: '🌈' }) : ev.p3 !== undefined && ev.act === undefined ? stay3([220 + 4 * Math.sin(t * 36), 1537], 1, { r: 3 * Math.sin(t * 30) }) : BIG3();

// Teil 2: Luftteilchen streuen das Licht. Ein Teilchen waechst an Ort und Stelle und zeigt die mitschwingende Ladung. Blau wird stark gestreut, der Himmel faerbt sich blau
const Q4 = [[480, 900], [250, 780], [700, 1010], [330, 1060], [620, 740], [860, 960], [150, 950], [540, 1090], [790, 820], [410, 720], [900, 1100], [200, 1110]];
WORLD.p4b_3 = function (sc, ev, t, lt) { const p1 = ev.p1, mi = ev.mit, p2 = ev.p2, p3 = ev.p3, a = ev.act, SX = 880, SY = 730, P = Q4[0];
  const day = p3 === undefined ? 0 : ease(cl(p3 / 1.6)), big = mi !== undefined && p2 === undefined ? ease(cl(mi / .5)) : p2 !== undefined ? 1 - ease(cl(p2 / .35)) : 0;
  let s = sky4(t, { sun: [SX, SY], day: day });
  // Sonnenstrahl zum ersten Teilchen, weisse Streustrahlen
  if (p1 !== undefined && p2 === undefined) { const k = cl(p1 / .4); s += '<path d="M' + (SX - 70) + ' ' + (SY + 30) + ' L' + lerp(SX - 70, P[0], k) + ' ' + lerp(SY + 30, P[1], k) + '" stroke="#fff" stroke-width="18" stroke-linecap="round"/>';
    if (p1 > .4) for (let i = 0; i < 6; i++) { const an = i * 1.047 + .4, c = (t * .9 + i / 6) % 1, r0 = 40 + 120 * big; s += arrow3(P[0] + r0 * Math.cos(an), P[1] + r0 * Math.sin(an), P[0] + (r0 + 60 + 80 * c) * Math.cos(an), P[1] + (r0 + 60 + 80 * c) * Math.sin(an), '#fff', 7, 1 - c); } }
  // Rot geht fast gerade durch, Blau prallt von Teilchen zu Teilchen
  if (p2 !== undefined && a === undefined) { const k = cl(p2 / .7), op = 1 - .6 * day; s += '<g opacity="' + op + '"><path d="M' + (SX - 70) + ' ' + (SY + 40) + ' L' + lerp(SX - 70, 120, k) + ' ' + lerp(SY + 40, 1090, k) + '" stroke="#FF4D4D" stroke-width="14" stroke-linecap="round"/></g>';
    const pts = [[SX - 80, SY + 10], Q4[4], Q4[1], Q4[0], Q4[2], Q4[7], Q4[3]], n = Math.min(pts.length - 1, Math.floor(cl((p2 - .5) / 1.6) * (pts.length - 1) + .001)); let d = 'M' + pts[0][0] + ' ' + pts[0][1]; for (let i = 1; i <= n; i++) d += ' L' + pts[i][0] + ' ' + pts[i][1];
    if (p2 > .5) s += '<path d="' + d + '" stroke="#3DB8FF" stroke-width="12" fill="none" stroke-linejoin="round" stroke-linecap="round"/>'; }
  // Blau kreuz und quer ueber den ganzen Himmel
  if (p3 !== undefined) for (let i = 0; i < 16; i++) { const c = (t * .5 + rnd(i + 3)) % 1, an = rnd(i + 40) * 6.283, x = 90 + rnd(i + 11) * 880, y = 680 + rnd(i + 22) * 440, L = 70 + 60 * c; let x2 = x + L * Math.cos(an), y2 = y + L * Math.sin(an), x1 = x, y1 = y;
    if (a !== undefined) { const k = ease(cl(a / .6)); const tx = 240, ty = 1330, d = Math.hypot(tx - x, ty - y), ux = (tx - x) / d, uy = (ty - y) / d; x1 = x + ux * d * .5 * c; y1 = y + uy * d * .5 * c; x2 = lerp(x2, x1 + ux * 80, k); y2 = lerp(y2, y1 + uy * 80, k); }
    s += arrow3(x1, y1, x2, y2, '#DFF4FF', 7, cl(p3 / .5) * (1 - c) * .9); }
  // Luftteilchen
  Q4.forEach((q, i) => { const k = back(cl((lt - .5 - i * .06) / .3)), dx = 6 * Math.sin(t * 1.3 + i), dy = 6 * Math.cos(t * 1.1 + i * 2); if (i === 0 && big > 0) return; s += '<circle cx="' + (q[0] + dx) + '" cy="' + (q[1] + dy) + '" r="' + (15 * k) + '" fill="#F4F6FB" stroke="#0B1020" stroke-width="4" opacity=".9"/>'; });
  if (big > 0) { const r = 15 + 115 * big, w = 34 * Math.sin(t * 16) * big; s += '<circle cx="' + P[0] + '" cy="' + P[1] + '" r="' + r + '" fill="#1B2748" fill-opacity=".85" stroke="#F4F6FB" stroke-width="7"/><circle cx="' + P[0] + '" cy="' + P[1] + '" r="' + (26 * big) + '" fill="#FF6BD6" stroke="#0B1020" stroke-width="4"/>' + svgT(P[0], P[1] + 14 * big, '+', 40 * big, '#0B1020') + '<circle cx="' + (P[0] + 58 * big) + '" cy="' + (P[1] + w) + '" r="' + (20 * big) + '" fill="#FFE14D" stroke="#0B1020" stroke-width="4"/>' + svgT(P[0] + 58 * big, P[1] + w + 12 * big, '−', 36 * big, '#0B1020');
    if (big > .8) for (let i = 0; i < 3; i++) { const c = (t * .8 + i / 3) % 1; s += '<circle cx="' + P[0] + '" cy="' + P[1] + '" r="' + (r + 10 + 110 * c) + '" fill="none" stroke="#fff" stroke-width="6" opacity="' + (.7 * (1 - c)) + '"/>'; } }
  return W(s + shade3(), slot(ev, [['panel', 'Luft: voller winziger Teilchen'], ['p1', 'Licht wird abgelenkt: gestreut'], ['mit', 'Ladungen schwingen mit, senden weiter', 'hot'], ['p2', 'Schneller = stärker gestreut', 'hot'], ['p3', 'Blau fliegt kreuz und quer'], ['act', 'Von überall kommt Blau an', 'hot']])); };
WMASC.p4b_3 = (ev, t) => ev.act !== undefined ? stay3(HOME3, 1, { prop: '😎', r: 6 * Math.sin(t * 2.2) }) : ev.mit !== undefined && ev.p2 === undefined ? stay3([220, 1537 + 0], 1, { r: 9 * Math.sin(t * 16) }) : BIG3();

// Teil 3: Die Sonne sinkt. Langer Weg durch die Luft, das Blau wird unterwegs weggestreut, uebrig bleiben Orange und Rot. Zum Schluss zieht eine Wolke herein
const sun4c = ev => { const k = ev.tief === undefined ? 0 : ease(cl(ev.tief / 1.2)); return [lerp(820, 880, k), lerp(740, 1040, k)]; };
WORLD.p4c_3 = function (sc, ev, t, lt) { const ti = ev.tief, we = ev.weg, bl = ev.blau, a = ev.act, a2 = ev.act2, S = sun4c(ev);
  const eve = a !== undefined ? .55 + .45 * ease(cl(a / .8)) : ti === undefined ? 0 : .55 * ease(cl(ti / 1.2));
  let s = sky4(t, { sun: S, eve: eve, rays: ti === undefined ? 1 : 0 });
  if (ti === undefined) { s += '<path d="M700 800 L330 1180" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity="' + cl((lt - .6) / .4) + '"/>' + chip3(420, 900, 'mittags: kurzer Weg', 36, '#F4F6FB', '#0B1020', (lt - 1) / .3); }
  if (we !== undefined) { const k = ease(cl(we / .9)), red = bl === undefined ? 0 : ease(cl(bl / 1.4));
    s += '<defs><linearGradient id="b4c" gradientUnits="userSpaceOnUse" x1="800" y1="0" x2="130" y2="0"><stop offset="0" stop-color="#FFFBE0"/><stop offset="' + (1 - .75 * red) + '" stop-color="' + mx4('#FFFBE0', '#FF9A3D', red) + '"/><stop offset="1" stop-color="' + mx4('#FFFBE0', '#FF4D2A', red) + '"/></linearGradient></defs><path d="M800 1040 L' + lerp(800, 130, k) + ' 1040" stroke="url(#b4c)" stroke-width="26" stroke-linecap="round"/>';
    if (bl === undefined) s += '<path d="M130 960 H800 M130 940 V980 M800 940 V980" stroke="#F4F6FB" stroke-width="6" stroke-linecap="round" opacity="' + cl((we - .7) / .3) + '"/>' + chip3(465, 900, 'abends: langer Weg', 38, '#FFD23F', '#0B1020', (we - .9) / .3);
    if (bl !== undefined && a2 === undefined) for (let i = 0; i < 8; i++) { const c = (t * .7 + i / 8) % 1, x = 720 - i * 70, up = i % 2 ? 1 : -1; s += arrow3(x, 1040 + up * 20, x - 30, 1040 + up * (60 + 150 * c), '#3DB8FF', 8, cl(bl / .4) * (1 - c)); } }
  if (a !== undefined && a2 === undefined) s += chip3(480, 800, 'übrig: Orange und Rot', 42, '#FF7A3D', '#0B1020', (a - .5) / .3);
  if (a2 !== undefined) { const k = ease(cl(a2 / .9)), cx = lerp(-200, 430, k); s += cloud4(cx, 820, 1.25, 1);
    for (let i = 0; i < 6; i++) { const c = (t * .8 + i / 6) % 1, an = i * 1.047 + .5; s += arrow3(cx + 120 * Math.cos(an), 810 + 70 * Math.sin(an), cx + (150 + 60 * c) * Math.cos(an), 810 + (90 + 50 * c) * Math.sin(an), C4[i], 8, cl((a2 - .9) / .3) * (1 - c)); } }
  return W(s + shade3(), slot(ev, [['panel', 'Und der Sonnenuntergang?'], ['tief', 'Abends steht die Sonne tief'], ['weg', 'Viel längerer Weg durch die Luft', 'hot'], ['blau', 'Blau wird unterwegs weggestreut'], ['act', 'Übrig: Orange und Rot', 'hot'], ['act2', 'Wolken streuen alle Farben: Weiß']])); };
// Schalti springt auf die Wolke
WMASC.p4c_3 = (ev, t) => { const a2 = ev.act2; if (a2 === undefined) return ev.act !== undefined ? stay3(HOME3, 1, { r: -6 + 2 * Math.sin(t * 1.5) }) : BIG3(); return a2 < .9 ? BIG3() : a2 < 1.4 ? hop3((a2 - .9) / .5, HOME3, [430, 800], 200, 1, .5) : stay3([430, 800 + 5 * Math.sin(t * 2)], .5, { r: 4 * Math.sin(t * 3) }); };

// Schluss: blauer Himmel
WORLD.p4outro_3 = function (sc, ev, t) { return W(sky4(t, { sun: [860, 1090] }) + cloud4(700 + 20 * Math.sin(t * .3), 1180, .7, .9) + shade3()); };
['h7p4_3', 'p4a_3', 'p4b_3', 'p4c_3', 'p4outro_3'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#5CE1FF'); });
