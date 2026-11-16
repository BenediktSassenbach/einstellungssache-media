// Version 3.0 (16.11.2026): C001V3 Fettbrand, C004V3 Eis schwimmt, I004V3 Lag, P006V3 Gewischt, P005V3 GPS.
// Diese Fassungen nutzen die Erklaergrafiken und Schalti-Aktionen der bisherigen Folgen und stellen sie an einen Ort, der das Bild fuellt:
//   C001V3 Kueche mit Herd, C004V3 zugefrorener See mit Steg (Teil 2 im Inneren des Eises), I004V3 Zocker-Zimmer und der Weg zum Server,
//   P006V3 Wohnzimmer im Winter, P005V3 Erde aus dem All (war schon Vollbild, bekommt Kamera, Farbstimmung und einen Gag aus dem Objekt).
// Texte der Teile 1 bis 3 und des Schlusses sind wortgleich, der Einstieg hat einen neuen ersten Satz. Keine Sprechblasen.
// Zum Loeschen einer Fassung: ihren Ordner videos/<ID>V3 entfernen. Diese Datei erst loeschen, wenn keine der fuenf Fassungen mehr existiert.

// Alte Welt an neuem Ort: waehrend des Aufrufs liefern die alten Hintergruende (bgRad, stage7) den Ort
// Dazu (16.11.2026): kein treibender Staub (dust) und kein Schweben fester Gegenstaende (pop7)
function place3(name, bg, a) { const b0 = bgRad, s0 = stage7, d0 = dust, p0 = pop7; bgRad = () => bg; stage7 = () => bg; dust = () => ''; pop7 = (cx, cy, lt, inner) => inner; try { return WORLD[name].apply(null, a); } finally { bgRad = b0; stage7 = s0; dust = d0; pop7 = p0; } }
function old3(list, col, bgOf) { list.forEach(n => { WORLD[n + '_3'] = (sc, ev, t, lt, E) => look3(place3(n, bgOf(n, sc, ev, t, lt), [sc, ev, t, lt, E]), sc, t, lt, col); WMASC[n + '_3'] = (ev, t, lt, sc) => one3(WMASC[n] ? WMASC[n](ev, t, lt, sc) : null, ev); }); }
// Hoechstens ein Salto, der am Schluss: der Standard-Salto bleibt nur beim letzten Satz an
function one3(p, ev) { if (ev.save !== undefined) return p; p = p || BIG3(); p.nospin = 1; return p; }

// ---------- C001V3: Kueche. Die Arbeitsplatte mit dem Kochfeld liegt genau unter der Pfanne, darunter der Backofen ----------
function kitchen1(t, o) { o = o || {}; const T = o.top || 1128, cx = o.cx || 560;
  let s = room3(t, { id: 'k1', a: '#12060E', b: '#3A1230', c: '#5A1E3E', fl: '#140810', fs: '#2A1020', ln: '#FF9AD6', glow: [cx, 900, 480, 360, o.cool ? '#5CE1FF' : '#FF8A30', .35] });
  for (let y = 650; y < T; y += 96) s += '<path d="M0 ' + y + ' H1080" stroke="#fff" stroke-width="4" opacity=".06"/>'; for (let x = 48; x < 1080; x += 96) s += '<path d="M' + x + ' 600 V' + T + '" stroke="#fff" stroke-width="4" opacity=".06"/>';
  s += '<rect x="-20" y="' + (T + 38) + '" width="1120" height="' + (1548 - T - 38) + '" fill="#6A2848" stroke="#0B1020" stroke-width="6"/><path d="M' + (cx - 200) + ' ' + (T + 40) + ' V1546 M' + (cx + 200) + ' ' + (T + 40) + ' V1546" stroke="#0B1020" stroke-width="6"/>';
  s += '<rect x="' + (cx - 170) + '" y="' + (T + 70) + '" width="340" height="320" rx="14" fill="#1A0A14" stroke="#C9CFDD" stroke-width="6"/><rect x="' + (cx - 140) + '" y="' + (T + 140) + '" width="280" height="220" rx="10" fill="#3A1A10"/><rect x="' + (cx - 140) + '" y="' + (T + 140) + '" width="280" height="220" rx="10" fill="#FF8A30" opacity="' + (.22 + .06 * Math.sin(t * 3)) + '"/><rect x="' + (cx - 130) + '" y="' + (T + 98) + '" width="260" height="16" rx="8" fill="#C9CFDD"/>';
  s += '<rect x="' + (cx - 250) + '" y="' + (T + 110) + '" width="16" height="100" rx="8" fill="#C9CFDD"/><rect x="' + (cx + 234) + '" y="' + (T + 110) + '" width="16" height="100" rx="8" fill="#C9CFDD"/>';
  return s + '<rect x="-20" y="' + T + '" width="1120" height="42" rx="8" fill="#EAD9CC" stroke="#0B1020" stroke-width="6"/>'; }
old3(['h7c1', 'c1heiss', 'c1dampf', 'c1deckel', 'c1outro'], '#FF6BD6', (n, sc, ev, t) => kitchen1(t, { cx: n === 'h7c1' ? 560 : n === 'c1heiss' ? 440 : n === 'c1deckel' ? 470 : n === 'c1outro' ? 640 : 525, top: n === 'c1dampf' ? 1108 : n === 'c1outro' ? 1138 : 1128, cool: n === 'c1deckel' }));

// ---------- C004V3: zugefrorener See am Morgen. Die Glaeser stehen auf dem Steg, Schalti steht am verschneiten Ufer ----------
function lake4(t, o) { o = o || {}; const T = o.top || 1100;
  let s = '<defs><linearGradient id="l4s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1248"/><stop offset=".6" stop-color="#4A3EA8"/><stop offset="1" stop-color="#FF9AC8"/></linearGradient><linearGradient id="l4i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFEFFF"/><stop offset=".4" stop-color="#6CB4EC"/><stop offset="1" stop-color="#2A5AA8"/></linearGradient></defs><rect width="1080" height="1012" fill="url(#l4s)"/>';
  for (let i = 0; i < 30; i++) s += '<circle cx="' + (rnd(i + 1) * 1080).toFixed(0) + '" cy="' + (rnd(i + 100) * 700).toFixed(0) + '" r="' + (1 + 2 * rnd(i + 200)).toFixed(1) + '" fill="#fff" opacity="' + (.25 + .35 * Math.abs(Math.sin(t * (.6 + rnd(i + 300)) + i))).toFixed(2) + '"/>';
  s += '<path d="M-20 1012 L140 870 L260 955 L400 840 L560 965 L700 858 L860 962 L980 888 L1100 972 V1012 Z" fill="#2A2A7A"/><path d="M140 870 l-34 30 l26 -6 l12 18 l16 -20 l20 8 Z M400 840 l-36 32 l28 -6 l12 20 l18 -22 l22 8 Z M700 858 l-34 30 l26 -6 l12 18 l16 -20 l20 8 Z" fill="#E8F2FF"/>';
  s += '<rect y="1008" width="1080" height="544" fill="url(#l4i)"/>';
  [[80, 1220, 300, 1260, 420, 1240], [620, 1330, 800, 1300, 1000, 1350], [300, 1450, 520, 1480, 700, 1440]].forEach(c => { s += '<path d="M' + c[0] + ' ' + c[1] + ' L' + c[2] + ' ' + c[3] + ' L' + c[4] + ' ' + c[5] + '" stroke="#fff" stroke-width="4" fill="none" opacity=".4"/>'; });
  if (o.jetty !== 0) { [150, 500, 850].forEach(x => { s += '<rect x="' + x + '" y="' + (T + 30) + '" width="28" height="150" fill="#4A2E1E" stroke="#0B1020" stroke-width="4"/>'; }); s += '<rect x="-20" y="' + T + '" width="1120" height="36" rx="6" fill="#8A5A3C" stroke="#0B1020" stroke-width="6"/>'; for (let x = 100; x < 1080; x += 135) s += '<path d="M' + x + ' ' + (T + 3) + ' v30" stroke="#5E3B28" stroke-width="5"/>'; }
  s += '<path d="M0 1548 Q270 1524 540 1550 T1080 1542 V1920 H0 Z" fill="#F4F8FF" stroke="#BFD8FF" stroke-width="6"/><path d="M0 1700 Q300 1670 600 1710 T1080 1690 V1920 H0 Z" fill="#DCE8FF"/>';
  for (let i = 0; i < 26; i++) { const x = (rnd(i + 700) * 1180 + 40 * Math.sin(t * .7 + i)) % 1080, y = (t * (50 + 60 * rnd(i + 720)) + rnd(i + 740) * 1920) % 1920; s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (2 + 3 * rnd(i + 760)).toFixed(1) + '" fill="#fff" opacity=".5"/>'; }
  return s; }
// Blick ins Innere des Eises
function inice4(t) { let s = '<defs><radialGradient id="i4n" cx=".5" cy=".48" r=".8"><stop offset="0" stop-color="#2B72C8"/><stop offset="1" stop-color="#081A3A"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#i4n)"/>';
  for (let i = 0; i < 9; i++) s += '<path d="M' + (rnd(i + 5) * 1080) + ' ' + (620 + rnd(i + 15) * 800) + ' l' + (60 + 90 * rnd(i + 25)) + ' ' + (-30 + 60 * rnd(i + 35)) + '" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".12"/>';
  return s + '<path d="M-20 1552 Q540 1520 1100 1552 V1920 H-20 Z" fill="#12306E" stroke="#BFEAFF" stroke-width="7"/>'; }
old3(['h7c4', 'c4dichte', 'c4gitter', 'c4see', 'c4outro'], '#FF6BD6', (n, sc, ev, t) => n === 'c4gitter' ? inice4(t) : lake4(t, { top: n === 'h7c4' ? 1120 : n === 'c4outro' ? 1130 : 1100 }));

// Einstieg neu (16.11.2026, Benedikt): spielt am offenen, nicht zugefrorenen See, ohne Glas. Im Wasser schwimmt ein Eisbrocken mit echten Proportionen:
// rund ein Zehntel ragt heraus, neun Zehntel liegen unter der Wasserlinie. Der See ist seitlich angeschnitten, damit man den Teil unter Wasser sieht.
// Gag aus dem Objekt: Schalti springt waehrend "Gib mir 60 Sekunden" auf den Brocken, er traegt ihn. Beim Nachsatz "muesste untergehen"
// stampft er ihn unter Wasser. Der Brocken schiesst wieder hoch und schleudert Schalti in hohem Bogen ans Ufer. Abwurf bei 0,72 s
const WL4 = 972, BX4 = 620;
function fdy4(q, e, t) { if (e === undefined) return q >= .45 && q < .85 ? 20 * Math.sin(Math.PI * (q - .45) / .4) : 3 * Math.sin(t * 1.6);
  if (e < .35) return 0; if (e < .6) return 140 * ease((e - .35) / .25); if (e < .72) return lerp(140, -80, ease((e - .6) / .12)); return -80 * Math.exp(-(e - .72) * 2.6) * Math.cos((e - .72) * 11); }
// Offener See im Anschnitt: Himmel, Berge, Wasseroberflaeche bis zum Horizont, darunter das Wasser von der Seite mit Grund und zwei Fischen
function openlake4(t, u) { const bo = u !== undefined && u > 0 ? 300 * (1 - Math.exp(-u * 3)) : 0; let s = '<defs><linearGradient id="l4s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1248"/><stop offset=".6" stop-color="#4A3EA8"/><stop offset="1" stop-color="#FF9AC8"/></linearGradient><linearGradient id="o4a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B8A8F0"/><stop offset="1" stop-color="#5AA6EC"/></linearGradient><linearGradient id="o4b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3D9AE8"/><stop offset=".45" stop-color="#1C5FB8"/><stop offset="1" stop-color="#08205A"/></linearGradient><linearGradient id="o4i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D8F0FF"/><stop offset="1" stop-color="#6FB2E8"/></linearGradient></defs><rect width="1080" height="910" fill="url(#l4s)"/>';
  for (let i = 0; i < 30; i++) s += '<circle cx="' + (rnd(i + 1) * 1080).toFixed(0) + '" cy="' + (rnd(i + 100) * 640).toFixed(0) + '" r="' + (1 + 2 * rnd(i + 200)).toFixed(1) + '" fill="#fff" opacity="' + (.25 + .35 * Math.abs(Math.sin(t * (.6 + rnd(i + 300)) + i))).toFixed(2) + '"/>';
  s += '<g transform="translate(0 -106)"><path d="M-20 1012 L140 870 L260 955 L400 840 L560 965 L700 858 L860 962 L980 888 L1100 972 V1012 Z" fill="#2A2A7A"/><path d="M140 870 l-34 30 l26 -6 l12 18 l16 -20 l20 8 Z M400 840 l-36 32 l28 -6 l12 20 l18 -22 l22 8 Z M700 858 l-34 30 l26 -6 l12 18 l16 -20 l20 8 Z" fill="#E8F2FF"/></g>';
  // Wasseroberflaeche bis zum Horizont, mit Spiegelung und kleinen Wellen
  s += '<rect y="904" width="1080" height="' + (WL4 - 904) + '" fill="url(#o4a)"/><path d="M-20 906 L140 948 L260 922 L400 956 L560 918 L700 950 L860 920 L980 942 L1100 916 Z" fill="#2A2A7A" opacity=".22"/>';
  for (let i = 0; i < 7; i++) { const x = (i * 173 + t * 14) % 1180 - 60, y = 916 + (i * 23) % 50; s += '<path d="M' + x + ' ' + y + ' h' + (40 + 30 * rnd(i + 4)) + '" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>'; }
  // Wasser von der Seite
  s += '<rect y="' + WL4 + '" width="1080" height="' + (1552 - WL4) + '" fill="url(#o4b)"/>';
  [[180, 90], [520, 70], [860, 110]].forEach((q, i) => { s += '<path d="M' + q[0] + ' ' + WL4 + ' l' + q[1] + ' 0 l' + (60 + i * 20) + ' 580 l' + (-q[1] - 80) + ' 0 Z" fill="#BFEAFF" opacity="' + (.05 + .02 * Math.sin(t * .8 + i)) + '"/>'; });
  s += '<path d="M0 1500 Q200 1470 420 1496 T800 1488 T1080 1500 V1552 H0 Z" fill="#0A1A48"/>'; [[430, 1492, 34], [760, 1486, 46], [960, 1498, 28], [600, 1500, 22]].forEach(q => { s += '<ellipse cx="' + q[0] + '" cy="' + q[1] + '" rx="' + q[2] + '" ry="' + (q[2] * .45) + '" fill="#14306E"/>'; });
  // zwei Fische, ruhig unterwegs
  [[1400, 1385, 1, 22], [1250, 1445, -1, 16]].forEach((f, i) => { const x = f[2] > 0 ? (t * f[3] * 3 + 300 * i + bo + 900) % 1280 - 100 : 1180 - (t * f[3] * 3 + 500 + bo) % 1280, y = f[1] + 8 * Math.sin(t * 1.3 + i); s += '<g transform="translate(' + x + ' ' + y + ') scale(' + f[2] + ' 1)"><path d="M-30 0 q30 -22 60 0 q-30 22 -60 0 Z M-30 0 l-22 -16 v32 Z" fill="#FF9A6B" stroke="#0B1020" stroke-width="4" stroke-linejoin="round"/><circle cx="16" cy="-3" r="4" fill="#0B1020"/></g>'; });
  return s; }
// Eisbrocken: Nullpunkt ist die Wasserlinie. Kappe ueber Wasser hoechstens 42 hoch, Rumpf unter Wasser 325 tief
// Auftakt (16.11.2026, Benedikt: Start anregender): In der ersten Sekunde bricht der Brocken vom Gletscher am rechten Rand ab, rutscht in den See,
// taucht tief ein und kommt wieder hoch. Wasser spritzt, die Fische fliehen, Schalti zuckt zusammen. Danach treibt der Brocken in die Bildmitte
function in4(lt) { if (lt < .25) return { x: 1010, dy: -272, r: -32, u: undefined };
  if (lt < 1) { const k = Math.pow((lt - .25) / .75, 2); return { x: lerp(1010, 800, k), dy: lerp(-272, 40, k), r: lerp(-32, -10, k), u: undefined }; }
  const u = lt - 1; return { x: lerp(800, BX4, ease(cl(u / 2.2))), dy: 40 * Math.exp(-u * 8) + 215 * Math.exp(-u * 2) * Math.sin(u * 5.2), r: -10 * Math.exp(-u * 3) * Math.cos(u * 5), u: u }; }
function glacier4() { return '<polygon points="1100,590 990,640 905,750 858,890 838,972 862,1100 905,1200 1100,1262" fill="url(#o4i)" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><path d="M1100 590 L990 640 L905 750 L858 890 L838 972" stroke="#fff" stroke-width="16" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M990 640 L1040 800 L905 750 M1040 800 L960 960 L858 890 M960 960 L1100 1000 M960 960 L905 1200" stroke="#fff" stroke-width="4" fill="none" opacity=".5" stroke-linejoin="round"/>'; }
const IB4 = { cap: '-150,0 -128,-27 -70,-41 -6,-33 58,-42 124,-25 150,0', hull: '-150,0 150,0 166,62 152,150 120,238 62,308 -10,325 -82,300 -136,222 -166,120 -160,42' };
function berg4(dy, r, t, x) { let s = '<g transform="translate(' + (x === undefined ? BX4 : x) + ' ' + (WL4 + dy) + ') rotate(' + r + ')">';
  s += '<polygon points="' + IB4.hull + '" fill="url(#o4i)" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/>';
  s += '<path d="M-150 0 L-60 120 L-82 300 M-60 120 L40 90 L150 0 M40 90 L62 308 M40 90 L152 150 M-60 120 L-166 120 M-10 325 L-10 220 L62 308" stroke="#fff" stroke-width="4" fill="none" stroke-linejoin="round" opacity=".45"/><path d="M-110 40 l30 60 M90 60 l-20 80 M-20 180 l-30 70" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".5"/>';
  s += '<polygon points="' + IB4.cap + '" fill="#FFFFFF" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><path d="M-100 -14 q30 -16 62 -12 M30 -22 q30 -10 62 2" stroke="#CFEAFF" stroke-width="6" fill="none" stroke-linecap="round"/>';
  return s + '</g>'; }
WORLD.h7c4_3 = function (sc, ev, t, lt) { const e = ev.bonk, q = since3(sc, 3, lt), dy = fdy4(q, e, t), hit = e !== undefined && e >= .72 ? e - .72 : undefined, sh = shake7(hit, t);
  const I = in4(lt), sh0 = shake7(I.u, t);
  let s = openlake4(t, I.u) + glacier4() + berg4(dy + I.dy, (e !== undefined && e > .72 ? 4 * Math.exp(-(e - .72) * 2.6) * Math.sin((e - .72) * 11) : 1.2 * Math.sin(t * 1.1)) + I.r, t, I.x);
  // Wasser faerbt alles unter der Wasserlinie, darueber die Linie selbst mit den Wellen um den Brocken
  s += '<rect y="' + WL4 + '" width="1080" height="' + (1552 - WL4) + '" fill="#1C5FB8" opacity=".34"/><path d="M0 ' + WL4 + ' H1080" stroke="#DFF4FF" stroke-width="6" opacity=".9"/>';
  if (I.u !== undefined || lt < .25) for (let i = 0; i < 2; i++) { const c = (t * .35 + i * .5) % 1; if (lt < 1) break; s += '<ellipse cx="' + I.x + '" cy="' + (WL4 - 2) + '" rx="' + (170 + 90 * c) + '" ry="' + (10 + 8 * c) + '" fill="none" stroke="#fff" stroke-width="4" opacity="' + (.6 * (1 - c)) + '"/>'; }
  // Snow-Ufer vorn, Schneefall
  s += '<path d="M0 1548 Q270 1524 540 1550 T1080 1542 V1920 H0 Z" fill="#F4F8FF" stroke="#BFD8FF" stroke-width="6"/><path d="M0 1700 Q300 1670 600 1710 T1080 1690 V1920 H0 Z" fill="#DCE8FF"/>';
  for (let i = 0; i < 26; i++) { const x = (rnd(i + 700) * 1180 + 40 * Math.sin(t * .7 + i)) % 1080, y = (t * (50 + 60 * rnd(i + 720)) + rnd(i + 740) * 960) % 960; s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (2 + 3 * rnd(i + 760)).toFixed(1) + '" fill="#fff" opacity=".5"/>'; }
  if (I.u !== undefined && I.u < 1.1) { for (let i = 0; i < 18; i++) { const c = cl(I.u / (.7 + .4 * rnd(i + 60))); if (c >= 1) continue; const a = -Math.PI * (.08 + .84 * rnd(i + 40)), d = 90 + 380 * c * (.6 + .6 * rnd(i + 50)), y = WL4 - 6 + d * Math.sin(a) + 420 * c * c; if (y < WL4) s += drop(800 + d * Math.cos(a), y, 1.5, '#DFF4FF'); } for (let i = 0; i < 3; i++) { const c = cl(I.u / 1.1) * (.5 + .25 * i); s += '<ellipse cx="800" cy="' + (WL4 - 2) + '" rx="' + (120 + 620 * c) + '" ry="' + (10 + 22 * c) + '" fill="none" stroke="#fff" stroke-width="7" opacity="' + (1 - cl(I.u / 1.1)) + '"/>'; } }
  if (e !== undefined && e > .35 && e < 1.3) for (let i = 0; i < 12; i++) { const c = cl((e - (i % 2 ? .72 : .35)) / .55); if (c <= 0 || c >= 1) continue; const a = -Math.PI * (.1 + .8 * rnd(i + 2)), d = 70 + 250 * c, y = WL4 - 10 + d * .8 * Math.sin(a) + 260 * c * c; if (y < WL4) s += drop(BX4 + d * Math.cos(a), y, 1.1, '#DFF4FF'); }
  if (hit !== undefined) { for (let i = 0; i < 2; i++) { const c = (hit * .9 + i * .5) % 1; s += '<ellipse cx="' + BX4 + '" cy="' + (WL4 - 2) + '" rx="' + (190 + 220 * c) + '" ry="' + (12 + 14 * c) + '" fill="none" stroke="#fff" stroke-width="6" opacity="' + (1 - c) * cl(2.2 - hit) + '"/>'; } if (hit > .22 && hit < 1.4) s += word7('PLOPP!', 560, 800, hit - .22, '#FFE14D', -6); }
  if (e === undefined && q < 0 && lt > 3.5) s += '<g opacity="' + cl((lt - 3.5) / .4) + '"><path d="M880 ' + (WL4 - 40) + ' h36 M898 ' + (WL4 - 40) + ' V' + WL4 + ' M880 ' + WL4 + ' h36" stroke="#FFE14D" stroke-width="6" stroke-linecap="round"/><path d="M880 ' + WL4 + ' h36 M898 ' + WL4 + ' V' + (WL4 + 325) + ' M880 ' + (WL4 + 325) + ' h36" stroke="#FFE14D" stroke-width="6" stroke-linecap="round" opacity=".55"/></g>' + chip3(898, WL4 - 78, '1/10', 34, '#FFE14D', '#0B1020', (lt - 3.7) / .3) + chip3(898, WL4 + 150, '9/10', 34, '#FFE14D', '#0B1020', (lt - 4) / .3);
  return look3(W('<g transform="translate(' + ((sh[0] + sh0[0]) * .5) + ' ' + ((sh[1] + sh0[1]) * .5) + ')">' + s + '</g>' + shade3()), sc, t, lt, '#FF6BD6'); };
WMASC.h7c4_3 = (ev, t, lt, sc) => { const e = ev.bonk, q = since3(sc, 3, lt), dy = fdy4(q, e, t), S = .72, Y = WL4 - 36;
  if (e === undefined) { if (q < 0) { const u = lt - 1; return u > 0 && u < .7 ? stay3([220 - 26 * Math.sin(Math.PI * u / .7), 1537 - 90 * Math.sin(Math.PI * u / .7)], 1, { r: -14 * Math.sin(Math.PI * u / .7) }) : stay3(HOME3, 1, { r: lt < 1 ? 6 : -3 + 2 * Math.sin(t * 2) }); } if (q < .45) return hop3(q / .45, HOME3, [BX4, Y], 300, 1, S); return stay3([BX4, Y + dy], S, { r: 3 * Math.sin(t * 5) }); }
  if (e < .35) return stay3([BX4, Y - 170 * Math.sin(Math.PI * e / .35)], S, { r: 0 });
  if (e < .72) return stay3([BX4 + (e > .6 ? 0 : 3 * Math.sin(t * 40)), Y + dy], S, { r: e < .6 ? 4 * Math.sin(t * 30) : 0 });
  if (e < 1.75) { const k = (e - .72) / 1.03; return hop3(k, [BX4, Y - 80], HOME3, 430, S, 1, { r: -360 * ease(cl(k)) }); }
  return stay3(HOME3, 1, { r: e < 2.6 ? 7 * Math.sin(t * 9) * (1 - cl((e - 1.75) / .85)) : 0 }); };

// Teil 3 neu (16.11.2026, Benedikt: schoener, mit den Fischen unterm Eis). Derselbe offene See wie im Einstieg, die Wasserlinie liegt hoeher im Bild.
//   berg, rest: der Eisbrocken, erst sieht man nur die Kappe, dann wird der Rumpf unter Wasser sichtbar (1/10 und 9/10)
//   see: derselbe See friert von beiden Ufern her zu, der Brocken friert ein. act: unter der Eisdecke bleibt es fluessig, Fische und Pflanzen leben weiter
function fish4(x, y, s, dir, t, col) { const w = 9 * Math.sin(t * 6);
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + (dir * s) + ' ' + s + ')"><path d="M-34 0 L-66 ' + (-24 + w) + ' Q-54 0 -66 ' + (24 + w) + ' Z" fill="' + col + '" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M-10 -20 Q4 -44 24 -17 Z M-4 20 Q6 36 18 17 Z" fill="' + col + '" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M-38 0 Q-10 -30 30 -15 Q47 -7 49 0 Q47 8 30 15 Q-10 30 -38 0 Z" fill="' + col + '" stroke="#0B1020" stroke-width="5"/><path d="M-22 9 Q8 22 36 8" stroke="#fff" stroke-width="5" fill="none" opacity=".55" stroke-linecap="round"/><path d="M4 -19 Q-3 0 4 19 M-12 -15 Q-18 0 -12 15" stroke="#0B1020" stroke-width="4" fill="none" opacity=".22"/><circle cx="31" cy="-4" r="7" fill="#fff" stroke="#0B1020" stroke-width="3"/><circle cx="33" cy="-4" r="3" fill="#0B1020"/></g>'; }
WORLD.c4see_3 = function (sc, ev, t, lt) { const SH = -150, WLs = WL4 + SH, se = ev.see, a = ev.act, z = se === undefined ? 0 : ease(cl(se / 1.8)), rv = ev.rest === undefined ? 0 : ease(cl(ev.rest / .9)), X = 470;
  let g = openlake4(t) + berg4(3 * Math.sin(t * 1.6) * (1 - z), 1.2 * Math.sin(t * 1.1) * (1 - z), t, X);
  g += '<rect y="' + WL4 + '" width="1080" height="' + (1552 - WL4) + '" fill="#1C5FB8" opacity=".3"/><rect y="' + WL4 + '" width="1080" height="' + (1552 - WL4) + '" fill="#061A4A" opacity="' + (.62 * (1 - rv)) + '"/>';
  // Wasserpflanzen am Grund wiegen sich
  for (let i = 0; i < 9; i++) { const x = 60 + i * 124 + 30 * rnd(i + 3), h = 70 + 60 * rnd(i + 8), sw = 14 * Math.sin(t * 1.2 + i); g += '<path d="M' + x + ' 1502 Q' + (x + sw) + ' ' + (1502 - h * .5) + ' ' + (x + sw * 1.6) + ' ' + (1502 - h) + '" stroke="' + (i % 2 ? '#2FBF8A' : '#1F9E78') + '" stroke-width="10" fill="none" stroke-linecap="round"/>'; }
  if (z < 1) g += '<path d="M0 ' + WL4 + ' H1080" stroke="#DFF4FF" stroke-width="6" opacity="' + (.9 * (1 - z)) + '"/>';
  // Fische unter dem Eis
  if (a !== undefined) { const k = cl(a / .5); [[150, 1, 1.05, '#FFB020'], [215, -1, .85, '#FF6BD6'], [275, 1, .95, '#8BD450'], [118, -1, .7, '#FFE14D'], [305, -1, 1.1, '#FF8A5C']].forEach((f, i) => { const ph = (t * .05 * (1 + .25 * i) + i * .23) % 1, x = f[1] > 0 ? -80 + 1240 * ph : 1160 - 1240 * ph, y = WL4 + f[0] + 9 * Math.sin(t * 1.7 + i * 2); if (Math.abs(x - X) < 215 && f[0] < 300) return; g += '<g opacity="' + k + '">' + fish4(x, y, f[2], f[1], t + i, f[3]) + '</g>'; if (((t * .6 + i * .37) % 1) < .5) { const c = ((t * .6 + i * .37) % 1) * 2; g += '<circle cx="' + (x + f[1] * 50) + '" cy="' + (y - 16 - 46 * c) + '" r="' + (4 + 3 * c) + '" fill="none" stroke="#DFF4FF" stroke-width="3" opacity="' + (k * (1 - c)) + '"/>'; } }); }
  // Eisdecke waechst von beiden Ufern zur Mitte, der Brocken friert ein
  if (z > 0) { const w = 548 * z, y0 = WL4 - 14, d = 'h' + w + ' l-16 20 l12 26'; g += '<rect width="1080" height="' + WL4 + '" fill="#0A1040" opacity="' + (.22 * z) + '"/>';
    g += '<path d="M-10 ' + y0 + ' ' + d + ' H-10 Z" fill="url(#o4i)" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M1090 ' + y0 + ' h' + (-w) + ' l16 20 l-12 26 H1090 Z" fill="url(#o4i)" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M-10 ' + (y0 + 5) + ' h' + (w - 6) + ' M1090 ' + (y0 + 5) + ' h' + (-(w - 6)) + '" stroke="#fff" stroke-width="10" stroke-linecap="round"/>';
    for (let i = 0; i < 12; i++) { const x = 30 + i * 92; if (x > w - 20 && x < 1080 - w + 20) continue; g += '<path d="M' + x + ' ' + (y0 + 46) + ' l8 ' + (14 + 12 * rnd(i + 2)) + ' l8 -' + (14 + 12 * rnd(i + 2)) + '" fill="#CFEAFF" stroke="#0B1020" stroke-width="3" stroke-linejoin="round"/>'; }
    g += '<polygon points="' + IB4.cap + '" transform="translate(' + X + ' ' + WL4 + ')" fill="#FFFFFF" stroke="#0B1020" stroke-width="6" stroke-linejoin="round" opacity="' + z + '"/>'; }
  let s = '<rect y="1340" width="1080" height="212" fill="#0A1A48"/><g transform="translate(0 ' + SH + ')">' + g + '</g>';
  s += '<path d="M0 1548 Q270 1524 540 1550 T1080 1542 V1920 H0 Z" fill="#F4F8FF" stroke="#BFD8FF" stroke-width="6"/><path d="M0 1700 Q300 1670 600 1710 T1080 1690 V1920 H0 Z" fill="#DCE8FF"/>';
  const nf = 16 + Math.round(26 * z); for (let i = 0; i < nf; i++) { const x = (rnd(i + 700) * 1180 + 40 * Math.sin(t * .7 + i)) % 1080, y = (t * (50 + 60 * rnd(i + 720)) + rnd(i + 740) * 800) % (WLs - 16); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (2 + 3 * rnd(i + 760)).toFixed(1) + '" fill="#fff" opacity=".6"/>'; }
  // Markierungen
  if (se === undefined || se < .4) { const o = se === undefined ? 1 : 1 - se / .4, b = ev.berg === undefined ? 0 : cl((ev.berg - .5) / .3);
    s += '<g opacity="' + o + '"><path d="M676 ' + (WLs - 42) + ' h30 v42 h-30" stroke="#FFE14D" stroke-width="6" fill="none" opacity="' + b + '"/><path d="M676 ' + (WLs + 6) + ' h30 v319 h-30" stroke="#FFE14D" stroke-width="6" fill="none" opacity="' + cl((rv - .4) * 2) + '"/>' + chip3(790, WLs - 26, '1/10', 46, '#FFE14D', '#0B1020', ev.berg === undefined ? -1 : (ev.berg - .6) / .3) + chip3(800, WLs + 165, '9/10', 60, '#FFE14D', '#0B1020', ev.rest === undefined ? -1 : (ev.rest - .5) / .3) + '</g>'; }
  if (a !== undefined) s += chip3(820, 1096, 'unten: 4 °C', 36, '#3BA8FF', '#fff', (a - .9) / .3);
  return look3(W(s + shade3(), slot(ev, [['berg', 'Eisberg: nur 1/10 sichtbar'], ['rest', '9/10 stecken unter Wasser', 'hot'], ['see', 'Seen frieren von oben zu'], ['act', 'Darunter bleibt es flüssig', 'hot']])), sc, t, lt, '#FF6BD6'); };
// Schalti springt auf die frische Eisdecke, rutscht ein Stueck und schaut durchs Eis nach unten
WMASC.c4see_3 = (ev, t) => { const se = ev.see, Y = WL4 - 150 - 12; if (se === undefined || se < 1.5) return BIG3();
  if (se < 2.05) return hop3((se - 1.5) / .55, HOME3, [870, Y], 260, 1, .6, { flip: false });
  const k = 1 - Math.pow(1 - cl((se - 2.05) / 1.3), 2); return stay3([870 - 110 * k, Y], .6, { flip: true, r: ev.act !== undefined && k >= 1 ? -10 + 2 * Math.sin(t * 2) : 9 * (1 - k) * Math.sin(t * 12) }); };

// ---------- I004V3: Zocker-Zimmer bei Nacht. Im Einstieg und Schluss steht der Monitor auf dem Schreibtisch, Teil 2 zeigt den Weg durch die Stadt zum Server ----------
function den4(t, o) { o = o || {}; const D = o.desk;
  let s = room3(t, { id: 'd4', a: '#07061C', b: '#1A1050', c: '#32208A', fl: '#0A0820', fs: '#1A1248', ln: '#B79CFF', glow: [600, 890, 520, 380, '#7C5CFF', .4] });
  if (D) { [[120, 740], [200, 786], [120, 832]].forEach((p, i) => { s += '<path transform="translate(' + p[0] + ' ' + p[1] + ')" d="M0 -44 L38 -22 V22 L0 44 L-38 22 V-22 Z" fill="' + ['#7C5CFF', '#FF6BD6', '#5CE1FF'][i] + '" opacity="' + (.5 + .2 * Math.sin(t * 1.2 + i * 2)) + '" stroke="#0B1020" stroke-width="5"/>'; });
    s += '<rect x="330" y="' + (D + 30) + '" width="26" height="' + (1548 - D - 30) + '" fill="#1A1248"/><rect x="954" y="' + (D + 30) + '" width="26" height="' + (1548 - D - 30) + '" fill="#1A1248"/>';
    s += '<rect x="800" y="' + (D + 150) + '" width="130" height="' + (1548 - D - 150) + '" rx="12" fill="#141030" stroke="#0B1020" stroke-width="6"/>'; for (let i = 0; i < 3; i++) s += '<rect x="822" y="' + (D + 190 + i * 70) + '" width="86" height="14" rx="7" fill="' + ['#7C5CFF', '#FF6BD6', '#5CE1FF'][Math.floor(t * 1.5 + i) % 3] + '"/>';
    s += '<rect x="300" y="' + D + '" width="720" height="32" rx="10" fill="#2A2060" stroke="#0B1020" stroke-width="6"/>'; }
  return s; }
function route4(t) { let s = '<defs><linearGradient id="r4s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05061A"/><stop offset=".7" stop-color="#1A1050"/><stop offset="1" stop-color="#4A2A9A"/></linearGradient></defs><rect width="1080" height="1552" fill="url(#r4s)"/>';
  for (let i = 0; i < 40; i++) s += '<circle cx="' + (rnd(i + 1) * 1080).toFixed(0) + '" cy="' + (rnd(i + 100) * 1150).toFixed(0) + '" r="' + (1 + 2 * rnd(i + 200)).toFixed(1) + '" fill="#fff" opacity="' + (.2 + .3 * Math.abs(Math.sin(t * (.5 + rnd(i + 300)) + i))).toFixed(2) + '"/>';
  for (let i = 0; i < 11; i++) { const x = i * 104 - 10, h = 120 + 190 * rnd(i + 50), w = 96; s += '<rect x="' + x + '" y="' + (1548 - h) + '" width="' + w + '" height="' + h + '" fill="#0E0A30"/>'; for (let j = 0; j < 8; j++) if (rnd(i * 9 + j) > .45) s += '<rect x="' + (x + 14 + (j % 3) * 26) + '" y="' + (1548 - h + 18 + Math.floor(j / 3) * 40) + '" width="14" height="18" fill="#FFD27A" opacity=".55"/>'; }
  return s + '<rect y="1548" width="1080" height="372" fill="#0A0820"/><path d="M0 1548 H1080" stroke="#B79CFF" stroke-width="5"/>'; }
old3(['h7i4', 'i4ping', 'i4band', 'i4fix', 'i4outro'], '#7C5CFF', (n, sc, ev, t) => n === 'i4band' ? route4(t) : den4(t, { desk: n === 'h7i4' ? 1086 : n === 'i4outro' ? 1106 : 0 }));

// ---------- P006V3: Wohnzimmer. Die Rueckwand trifft weiter hinten auf den Boden, Tuer und Teppich stehen dort, Schalti steht vorn auf dem Holzboden ----------
function living6(t, o) { o = o || {}; const F = o.fy || 1130, w = cl(o.warm || 0);
  let s = '<defs><linearGradient id="l6w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + lc('#0B0A1A', '#2A1A08', w) + '"/><stop offset="1" stop-color="' + lc('#2E3C86', '#B8782A', w) + '"/></linearGradient><linearGradient id="l6f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E3B28"/><stop offset="1" stop-color="#20120A"/></linearGradient></defs><rect width="1080" height="' + F + '" fill="url(#l6w)"/>';
  for (let i = 0; i < 12; i++) s += '<rect x="' + (30 + i * 90) + '" y="0" width="6" height="' + F + '" fill="#fff" opacity=".03"/>';
  if (o.win) s += win3(70, 690, 220, 240, t, o.win, 'l6', '#DCE0FF');
  s += '<rect y="' + F + '" width="1080" height="' + (1920 - F) + '" fill="url(#l6f)"/>'; for (let i = -6; i <= 14; i++) { const x = i * 130; s += '<path d="M' + x + ' ' + F + ' L' + (540 + (x - 540) * 2.4) + ' 1920" stroke="#2A1A10" stroke-width="5"/>'; }
  s += '<rect y="' + (F - 24) + '" width="1080" height="26" fill="#DCE0FF" opacity=".28"/><path d="M0 ' + F + ' H1080" stroke="#0B1020" stroke-width="5"/>';
  return s + '<ellipse cx="240" cy="1596" rx="270" ry="46" fill="#8A3B5A" stroke="#B85A7A" stroke-width="6"/>'; }
old3(['h7p6', 'p6reib', 'p6luft', 'p6hilft', 'p6outro'], '#5CE1FF', (n, sc, ev, t) => living6(t, { fy: n === 'p6reib' ? 1052 : n === 'h7p6' ? 1130 : n === 'p6outro' ? 1130 : 1118, win: n === 'p6luft' ? (ev.p2 === undefined ? 'sun' : 'snow') : n === 'p6reib' || n === 'p6outro' ? 'snow' : '', warm: n === 'p6luft' && ev.p2 === undefined ? 1 : n === 'p6luft' ? 1 - ease(cl(ev.p2 / .8)) : 0 }));

// Stromschlag (Regel vom 16.11.2026): Schalti wird sichtbar geschockt, Haare stehen hoch (shock), und zwar am Ende des Satzes.
// Teil 2: Der Sprung zur Klinke und der Schlag werden so verschoben, dass der Schlag mit den letzten Worten kommt
const sh6 = (sc, ev) => { if (ev.p3 === undefined) return ev; const s = Math.max(0, dur3(sc, 2) - 1.5), e2 = Object.assign({}, ev); e2.p3 = ev.p3 < s ? Math.min(ev.p3, .78) : .8 + ev.p3 - s; return e2; };
WORLD.p6luft_3 = (sc, ev, t, lt, E) => look3(place3('p6luft', living6(t, { fy: 1118, win: ev.p2 === undefined ? 'sun' : 'snow', warm: ev.p2 === undefined ? 1 : 1 - ease(cl(ev.p2 / .8)) }), [sc, sh6(sc, ev), t, lt, E]), sc, t, lt, '#5CE1FF');
WMASC.p6luft_3 = (ev, t, lt, sc) => { const e2 = sh6(sc, ev), p = one3(WMASC.p6luft(e2, t, lt, sc), ev), q = e2.p3;
  if (q !== undefined && q > .8 && ev.act === undefined) { const z = q < 1.6; p.shock = z ? 1 : 1 - cl((q - 1.6) / 1.2); p.fx = z ? (Math.floor(t * 15) % 2 ? 'invert(1)' : 'brightness(1.6)') : q < 2.4 ? 'brightness(.75) contrast(1.4)' : ''; p.r = z ? 8 * Math.sin(t * 50) : 0; }
  return p; };
WMASC.h7p6_3 = (ev, t, lt, sc) => { const p = one3(WMASC.h7p6(ev, t, lt, sc), ev), e = ev.zap; if (e !== undefined) p.shock = e < .9 ? 1 : 1 - cl((e - .9) / 1.4); return p; };

// ---------- P005V3: GPS. Die Welten aus viz_gps.js sind schon der Ort (Erde aus dem All). Neu: Kamera, Farbstimmung und ein Gag aus dem Objekt ----------
// Gag: Beim Nachsatz "ohne Einstein kilometerweit daneben" rutscht die ganze Karte samt Standortpunkt zur Seite. Schalti steht ploetzlich neben seinem Standort,
// erschrickt, springt dem Punkt hinterher, dann rueckt die Karte wieder zurecht. Einschlag bei 0,35 s
const gdx5 = e => e === undefined ? 0 : e < .35 ? 330 * ease(e / .35) : e < 2 ? 330 : e < 2.5 ? 330 * (1 - ease((e - 2) / .5)) : 0;
['orbit', 'signal', 'kreise', 'einstein', 'outro'].forEach(n => { WORLD[n + '_g3'] = (sc, ev, t, lt, E) => look3(WORLD[n](sc, ev, t, lt, E), sc, t, lt, '#5CE1FF'); WMASC[n + '_g3'] = (ev, t, lt, sc) => { const p = WMASC[n] ? WMASC[n](ev, t, lt, sc) : null; if (p && ev.save === undefined) p.nospin = 1; return p; }; });
WORLD.zoom_g3 = function (sc, ev, t, lt, E) { const e = ev.gag, dx = gdx5(e), hit = e !== undefined && e >= .35 ? e - .35 : undefined, sh = shake7(hit, t);
  let out = WORLD.zoom(sc, ev, t, lt, E); const i = out.indexOf('>') + 1, j = out.lastIndexOf('</svg>');
  if (e !== undefined) out = out.slice(0, i) + '<rect width="1080" height="1920" fill="#0B1020"/><g transform="translate(' + (dx + sh[0] * .5) + ' ' + (sh[1] * .5) + ')">' + out.slice(i, j) + '</g>' + (hit !== undefined && hit < 1.4 ? word7('DANEBEN!', 520, 1080, hit, '#FF5A5A', -5) : '') + out.slice(j);
  return look3(out, sc, t, lt, '#5CE1FF'); };
WMASC.zoom_g3 = (ev, t, lt, sc) => { const e = ev.gag, P = [540, 752]; if (e === undefined) { const p = WMASC.zoom(ev, t, lt, sc); p.nospin = 1; return p; }
  if (e < .9) return { f: [P[0] + 4 * Math.sin(t * 40) * cl((e - .35) / .1), P[1]], s: .42, r: e < .35 ? 0 : -10, nospin: 1 };
  if (e < 1.3) return hop3((e - .9) / .4, P, [870, 752], 120, .42, .42);
  return { f: [540 + gdx5(e), 752], s: .42, nospin: 1, prop: e > 2.5 ? '🔭' : '' }; };
