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

// Einstieg neu (16.11.2026, Benedikt: Anfang interessanter): spielt direkt auf dem See, ohne Glas.
// Gag aus dem Objekt: Schalti springt waehrend "Gib mir 60 Sekunden" auf eine Eisscholle, sie traegt ihn. Beim Nachsatz "muesste untergehen"
// stampft er sie unter Wasser. Sie schiesst wieder hoch und schleudert ihn in hohem Bogen ans Ufer. Abwurf bei 0,72 s
const FL4 = [600, 1076];
function fdy4(q, e, t) { if (e === undefined) return q >= .45 && q < .8 ? 24 * Math.sin(Math.PI * (q - .45) / .35) : 4 * Math.sin(t * 2);
  if (e < .35) return 0; if (e < .6) return 135 * ease((e - .35) / .25); if (e < .72) return lerp(135, -70, ease((e - .6) / .12)); return -70 * Math.exp(-(e - .72) * 3) * Math.cos((e - .72) * 13); }
function floe4(x, y, r) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + r + ') scale(1.32)"><path d="M-150 0 v28 a150 34 0 0 0 300 0 v-28 Z" fill="#8FC4EE" stroke="#0B1020" stroke-width="6"/><ellipse rx="150" ry="34" fill="#F4FAFF" stroke="#0B1020" stroke-width="6"/><path d="M-90 -6 l40 10 l30 -8 M30 12 l46 -8" stroke="#BFD8FF" stroke-width="5" fill="none" stroke-linecap="round"/></g>'; }
WORLD.h7c4_3 = function (sc, ev, t, lt) { const e = ev.bonk, q = since3(sc, 3, lt), dy = fdy4(q, e, t), hit = e !== undefined && e >= .72 ? e - .72 : undefined, sh = shake7(hit, t);
  let s = lake4(t, { jetty: 0 }) + '<ellipse cx="600" cy="1094" rx="372" ry="98" fill="#F4FAFF" stroke="#0B1020" stroke-width="6"/><ellipse cx="600" cy="1098" rx="348" ry="82" fill="#0E3A7A"/>';
  for (let i = 0; i < 2; i++) s += '<path d="M' + (380 + i * 250) + ' ' + (1120 + i * 14) + ' q40 ' + (-8 + 4 * Math.sin(t * 2 + i)) + ' 80 0" stroke="#7FD3FF" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>';
  s += floe4(FL4[0], FL4[1] + dy, e !== undefined && e > .72 ? 5 * Math.exp(-(e - .72) * 3) * Math.sin((e - .72) * 13) : 0);
  if (dy > 6) s += '<ellipse cx="600" cy="1098" rx="348" ry="82" fill="#0E3A7A" opacity="' + cl(dy / 60) * .72 + '"/>';
  if (e !== undefined && e > .35 && e < 1.3) for (let i = 0; i < 12; i++) { const c = cl((e - (i % 2 ? .72 : .35)) / .55); if (c <= 0 || c >= 1) continue; const a = -Math.PI * (.1 + .8 * rnd(i + 2)), d = 70 + 250 * c; s += drop(600 + d * Math.cos(a), 1070 + d * .8 * Math.sin(a) + 260 * c * c, 1.1, '#BFEAFF'); }
  if (hit !== undefined) { for (let i = 0; i < 2; i++) { const c = (hit * .9 + i * .5) % 1; s += '<ellipse cx="600" cy="1100" rx="' + (205 + 130 * c) + '" ry="' + (46 + 30 * c) + '" fill="none" stroke="#BFEAFF" stroke-width="5" opacity="' + (1 - c) * cl(2.2 - hit) + '"/>'; } if (hit < 1.2) s += word7('PLOPP!', 700, 860, hit, '#FFE14D', -6); }
  return look3(W('<g transform="translate(' + (sh[0] * .5) + ' ' + (sh[1] * .5) + ')">' + s + '</g>' + shade3()), sc, t, lt, '#FF6BD6'); };
WMASC.h7c4_3 = (ev, t, lt, sc) => { const e = ev.bonk, q = since3(sc, 3, lt), dy = fdy4(q, e, t), S = .78, Y = FL4[1] - 8;
  if (e === undefined) { if (q < 0) return stay3(HOME3, 1, { r: -3 + 2 * Math.sin(t * 2) }); if (q < .45) return hop3(q / .45, HOME3, [600, Y], 230, 1, S); return stay3([600, Y + dy], S, { r: 3 * Math.sin(t * 5) }); }
  if (e < .35) return stay3([600, Y - 170 * Math.sin(Math.PI * e / .35)], S, { r: 0 });
  if (e < .72) return stay3([600 + (e > .6 ? 0 : 3 * Math.sin(t * 40)), Y + dy], S, { r: e < .6 ? 4 * Math.sin(t * 30) : 0 });
  if (e < 1.75) { const k = (e - .72) / 1.03; return hop3(k, [600, Y - 70], HOME3, 520, S, 1, { r: -360 * ease(cl(k)) }); }
  return stay3(HOME3, 1, { r: e < 2.6 ? 7 * Math.sin(t * 9) * (1 - cl((e - 1.75) / .85)) : 0 }); };

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
