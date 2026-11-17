// P027V3 "Warum braucht eine Nachricht an Voyager 1 einen ganzen Tag?" (Physik, Anlass: Voyager 1 ist am 18.11.2026 einen Lichttag von der Erde entfernt).
// Gebaut als Welten im Design 3.0, gezeigt im Design 3.2 ("design": "3.2" im Skript, Bildfenster aus viz_v32.js).
// Ort: Antennen-Anlage in der Wueste bei Nacht. Er geht weiter: Einstieg mit Schaltpult und Riesenantenne am Horizont, Teil 1 freier Blick in den Himmel,
// Teil 2 Blick vom Mond ins Sonnensystem, Teil 3 die Antenne gross, Schluss wie der Einstieg.
// Nutzt den Himmel nsky_3 aus viz_p007v3.js. Zum Loeschen: diese Datei und videos/P027V32.
const HZ27 = 1122;
function dish27(x, y, s, t, o) { o = o || {}; let g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
  g += '<path d="M-70 250 L-26 40 H26 L70 250 Z" fill="#1A2550" stroke="#0B1020" stroke-width="7" stroke-linejoin="round"/><path d="M-50 150 H50 M-38 90 L38 200 M38 90 L-38 200" stroke="#2E3F7A" stroke-width="6"/><rect x="-110" y="236" width="220" height="30" rx="8" fill="#1A2550" stroke="#0B1020" stroke-width="6"/>';
  g += '<g transform="translate(0 30) rotate(-24)"><path d="M-230 -10 Q0 150 230 -10 Z" fill="#7C879C" stroke="#0B1020" stroke-width="7" stroke-linejoin="round"/>';
  for (let i = 1; i < 5; i++) g += '<path d="M' + (-230 + i * 92) + ' ' + (-10 + 0) + ' L' + (-115 + i * 46) + ' ' + (50 + 18 * Math.sin(i)) + '" stroke="#5A6686" stroke-width="4"/>';
  g += '<ellipse cx="0" cy="-10" rx="230" ry="58" fill="#C9CFDD" stroke="#0B1020" stroke-width="7"/><ellipse cx="0" cy="-6" rx="196" ry="44" fill="#A9B2C6"/>';
  g += '<path d="M-150 -6 L0 -190 L150 -6 M0 30 L0 -190" stroke="#E8ECF5" stroke-width="7" fill="none"/><rect x="-20" y="-228" width="40" height="52" rx="8" fill="#E8ECF5" stroke="#0B1020" stroke-width="6"/>';
  if (o.glow) g += '<circle cx="0" cy="-206" r="' + (26 + 8 * Math.sin(t * 8)) + '" fill="#5CE1FF" opacity="' + (.35 * o.glow) + '"/>';
  return g + '</g></g>'; }
function ground27(t) { let s = '<defs><linearGradient id="g27" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A1440"/><stop offset="1" stop-color="#07061A"/></linearGradient></defs><rect y="' + HZ27 + '" width="1080" height="' + (1920 - HZ27) + '" fill="url(#g27)"/>';
  let d = 'M0 ' + (HZ27 + 4); for (let x = 0; x <= 1080; x += 60) d += ' L' + x + ' ' + (HZ27 - 30 - 50 * Math.abs(Math.sin(x * .005 + 2)) - 14 * Math.sin(x * .017)).toFixed(0); s += '<path d="' + d + ' L1080 ' + (HZ27 + 4) + ' Z" fill="#120E33"/>';
  s += '<path d="M0 1552 Q300 1500 620 1560 T1080 1540 V1920 H0 Z" fill="#0A0820" stroke="#3A2F80" stroke-width="5"/>';
  for (let i = 0; i < 5; i++) { const x = 480 + i * 130 + 30 * rnd(i + 5), h = 50 + 40 * rnd(i + 9); s += '<path d="M' + x + ' ' + (1560 + 6 * i % 20) + ' v' + (-h) + ' M' + x + ' ' + (1560 - h * .55) + ' h-22 v-26 M' + x + ' ' + (1560 - h * .4) + ' h20 v-22" stroke="#1E3A2E" stroke-width="14" stroke-linecap="round" fill="none"/>'; }
  return s; }
function bg27(s, sc, t, lt, o) { return typeof S !== 'undefined' && S.design === '3.3' ? fuse33(s, sc, t, lt, o) : s; } // Design 3.3: Ort in der Bildsprache von Skript 1
function sky27(t, o) { return nsky_3(t, Object.assign({ hz: HZ27 }, o || {})); }
// Tag-Nacht-Wechsel im Zeitraffer: day 0 bis 1
function day27(day, sunk) { if (day <= 0) return ''; const a = Math.PI * (1 - sunk), sx = 540 + 460 * Math.cos(a), sy = HZ27 - 520 * Math.sin(a);
  return '<rect width="1080" height="' + (HZ27 + 4) + '" fill="#5CA8E8" opacity="' + (.85 * day) + '"/><circle cx="' + sx + '" cy="' + sy + '" r="70" fill="#FFE14D" opacity="' + day + '"/><circle cx="' + sx + '" cy="' + sy + '" r="120" fill="#FFE14D" opacity="' + (.25 * day) + '"/>'; }
function clock27(x, y, r, ang) { return '<g transform="translate(' + x + ' ' + y + ')"><circle r="' + r + '" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + [0, 1, 2, 3].map(i => '<path transform="rotate(' + i * 90 + ')" d="M0 ' + (-r + 8) + ' v12" stroke="#0B1020" stroke-width="5"/>').join('') + '<path transform="rotate(' + ang + ')" d="M0 0 V' + (-r + 14) + '" stroke="#0B1020" stroke-width="6" stroke-linecap="round"/><path transform="rotate(' + ang / 12 + ')" d="M0 0 V' + (-r * .5) + '" stroke="#FF4D4D" stroke-width="7" stroke-linecap="round"/><circle r="6" fill="#0B1020"/></g>'; }
function probe27(x, y, s, rot) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')"><path d="M0 0 L120 -40 M0 0 L-90 60 M0 0 L-60 -90" stroke="#C9CFDD" stroke-width="7"/><rect x="-26" y="-18" width="52" height="40" rx="6" fill="#8A93A8" stroke="#0B1020" stroke-width="5"/><g transform="translate(0 -36)"><ellipse rx="62" ry="20" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/><path d="M0 0 V-34" stroke="#F4F6FB" stroke-width="5"/></g><circle cx="120" cy="-40" r="10" fill="#FFD23F" stroke="#0B1020" stroke-width="4"/></g>'; }
function console27(x, y, press, t) { return '<g transform="translate(' + x + ' ' + y + ')"><path d="M-60 0 L-48 -96 H48 L60 0 Z" fill="#2A2F5C" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><rect x="-40" y="-86" width="80" height="30" rx="6" fill="#0B1020"/><path d="M-32 -71 h' + (14 + 10 * Math.sin(t * 6)) + '" stroke="#3DFF7A" stroke-width="4"/><ellipse cx="0" cy="' + (-104 + 6 * press) + '" rx="30" ry="14" fill="#FF4D4D" stroke="#0B1020" stroke-width="5"/><rect x="-36" y="-108" width="72" height="14" rx="5" fill="#5A6686" stroke="#0B1020" stroke-width="4"/></g>'; }
const D27 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3;
// Ring, der von der Antenne in den Himmel zieht (up) oder zurueckkommt (down)
function beam27(x, y, k, down) { if (k <= 0 || k >= 1) return ''; const c = down ? 1 - k : k, r = 30 + 210 * c, yy = y - 190 * c;
  return '<ellipse cx="' + (x - 220 * c) + '" cy="' + yy + '" rx="' + r + '" ry="' + (r * .32) + '" fill="none" stroke="#B8F3FF" stroke-width="' + (14 - 8 * c) + '" opacity="' + (down ? .5 + .5 * k : 1 - .7 * c) + '"/>'; }

// ---------- Einstieg ----------
// Schalti drueckt beim Themenfrage-Satz den Knopf, die Antenne funkt los. Beim Nachsatz laeuft der Tag im Zeitraffer zweimal durch, Schalti nickt ein,
// am Satzende kommt die Antwort zurueck: Piep, Schalti schreckt hoch (Einschlag bei 2,6 s)
// Einschlag (Piep) relativ zum Satz mit "warte": liegt das Warten nicht im letzten Satz (Einstieg unter 10 s, Skript 3.3), kommt der Piep kurz vor dem Ende des Einstiegs
function gagI27(sc) { const iw = sc.lines.findIndex(l => l.ev === 'warte'), L = sc.lines.length - 1; return iw < 0 || iw === L ? 2.6 : Math.max(1.6, sc.lines[L].end - sc.lines[iw].start - .45); }
WORLD.h7p27_3 = function (sc, ev, t, lt) { const m = ev.mark, w = ev.warte, I = gagI27(sc), sh = shake7(w !== undefined && w >= I ? w - I : undefined, t);
  const cyc = w === undefined ? 0 : cl((w - .3) / (I - .5)), day = w === undefined ? 0 : Math.max(0, Math.sin(Math.PI * 2 * cyc)) * (cyc < 1 ? 1 : 0), sunk = (cyc * 2) % 1;
  let s = bg27(sky27(t) + day27(day, sunk) + ground27(t), sc, t, lt, { cx: 780, cy: 860 }) + dish27(780, HZ27 - 238, .78, t, { glow: m !== undefined ? 1 : 0 });
  if (m !== undefined) s += beam27(780, HZ27 - 380, (m % 1.6) / 1.6) + beam27(780, HZ27 - 380, ((m + .8) % 1.6) / 1.6) + (w !== undefined ? '' : '');
  if (w !== undefined && w > I - .6 && w < I + .1) s += beam27(780, HZ27 - 380, (w - I + .6) / .6, true);
  s += console27(430, 1546, m !== undefined && m < .4 ? 1 : 0, t);
  if (w !== undefined && w < I + .1) s += clock27(430, 1330, 56, w * 1440 * 2.6 / I);
  if (w !== undefined && w >= I) { const k = back(cl((w - I) / .25)); s += '<g transform="translate(620 1385) scale(' + k + ') rotate(-8)"><rect x="-110" y="-46" width="220" height="92" rx="24" fill="#FFD23F" stroke="#0B1020" stroke-width="6"/>' + svgT(0, 18, 'Piep!', 52, '#0B1020') + '</g>'; }
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + shade3()); };
WMASC.h7p27_3 = (ev, t, lt, sc) => { const m = ev.mark, w = ev.warte, I = gagI27(sc);
  if (w !== undefined) { if (w < .4) return { f: [220, 1537], s: 1, r: 0, nospin: 1, mood: 'happy' }; if (w < I) { const k = cl((w - .4) / .6); return { f: [220, 1537], s: 1, r: -14 * k + 3 * Math.sin(t * 2), nospin: 1, mood: 'sleepy' }; }
    const k = cl((w - I) / .5); return { f: [220, 1537 - 90 * Math.sin(Math.PI * k)], s: 1, r: 6 * Math.sin(t * 30) * (1 - k), nospin: 1, mood: 'shock', shock: 1 - cl((w - I - .5) / .6) }; }
  if (m !== undefined && m < .5) return { f: [240, 1537], s: 1, r: 12, nospin: 1 };
  return { f: [220, 1537], s: 1, r: -3 + 2 * Math.sin(t * 2), nospin: 1 }; };

// ---------- Teil 1: Funk ist so schnell wie Licht. Mond gut 1 s, Sonne gut 8 min, Voyager 1 ein ganzer Tag ----------
WORLD.p27licht_3 = function (sc, ev, t, lt) { const f = ev.funk, mo = ev.mond, so = ev.sonne, a = ev.act, Y = 930;
  let s = bg27(sky27(t) + ground27(t), sc, t, lt);
  const k0 = ease(cl((lt - .4) / .5)); if (k0 > 0) s += '<path d="M150 ' + Y + ' H' + lerp(150, 880, k0) + '" stroke="#F4F6FB" stroke-width="5" stroke-dasharray="4 14" stroke-linecap="round" opacity=".8"/>';
  s += '<g transform="translate(150 ' + Y + ') scale(' + back(cl((lt - .3) / .4)) + ')"><circle r="46" fill="#2B8CFF" stroke="#0B1020" stroke-width="6"/><path d="M-30 -18 q18 -14 30 0 t26 6 M-26 20 q16 10 34 -4" stroke="#3DFF7A" stroke-width="12" fill="none" stroke-linecap="round"/></g>' + svgT(150, Y + 92, 'Erde', 32, '#F4F6FB');
  if (f !== undefined) { const p = (f * .9) % 1.4; if (a === undefined && p < 1) s += '<circle cx="' + lerp(200, 860, ease(p)) + '" cy="' + Y + '" r="14" fill="#B8F3FF"/>'; s += chip3(330, Y - 150, 'fast 300.000 km/s', 34, '#5CE1FF', '#0B1020', (f - .3) / .3); }
  if (mo !== undefined) s += '<g transform="translate(330 ' + Y + ') scale(' + back(cl(mo / .35)) + ')">' + lun_3(0, 0, 26, 0, 0, 1, 1) + '</g>' + svgT(330, Y + 78, 'Mond', 30, '#F4F6FB') + chip3(330, Y + 136, 'gut 1 s', 32, '#F4F6FB', '#0B1020', (mo - .5) / .3);
  if (so !== undefined) s += '<g transform="translate(560 ' + Y + ') scale(' + back(cl(so / .35)) + ')"><circle r="62" fill="#FFE14D" opacity=".3"/><circle r="42" fill="#FFD23F" stroke="#0B1020" stroke-width="6"/></g>' + svgT(560, Y + 92, 'Sonne', 30, '#F4F6FB') + chip3(560, Y + 150, 'gut 8 min', 32, '#FFD23F', '#0B1020', (so - .5) / .3);
  if (a !== undefined) { const k = cl(a / .4); s += '<g opacity="' + k + '">' + probe27(820, Y - 6, .5, -12) + '</g>' + svgT(820, Y + 78, 'Voyager 1', 30, '#F4F6FB') + chip3(820, Y + 150, '24 Stunden', 34, '#FF6B6B', '#0B1020', (a - .5) / .3);
    const c = cl((a - .3) / 2.4); s += '<circle cx="' + lerp(200, 790, c) + '" cy="' + Y + '" r="14" fill="#B8F3FF"/>'; }
  if (lt > 1) s += '<text x="880" y="' + (Y - 200) + '" text-anchor="end" font-size="24" font-weight="800" letter-spacing="2" fill="#AEB9D6" font-family="Inter Display" opacity="' + cl((lt - 1) / .5) + '">NICHT MASSSTABSGETREU</text>';
  return W(s + shade3(), slot(ev, L27A)); };
// Schalti springt auf das Signal und reitet bis zu Voyager 1 mit, dann zurueck an seinen Platz
WMASC.p27licht_3 = (ev, t) => { const a = ev.act; if (a === undefined) return BIG3(); const H = [220, 1537], c = cl((a - .3) / 2.4), P = [lerp(200, 790, c), 916];
  if (a < .6) { const k = ease(a / .6); return { f: [lerp(H[0], 200, k), lerp(H[1], P[1], k) - 160 * Math.sin(Math.PI * k)], s: lerp(1, .42, k), nospin: 1 }; }
  if (c < 1) return { f: [P[0], P[1] + 3 * Math.sin(t * 12)], s: .42, r: 10, nospin: 1, mood: 'happy' };
  const k = ease(cl((a - 2.9) / .6)); return k >= 1 ? BIG3() : { f: [lerp(790, H[0], k), lerp(P[1], H[1], k) - 160 * Math.sin(Math.PI * k)], s: lerp(.42, 1, k), flip: true, nospin: 1 }; };
const L27A = [['funk', 'Funk ist so schnell wie Licht'], ['mond', 'Zum Mond: gut 1 Sekunde'], ['sonne', 'Licht der Sonne: gut 8 Minuten'], ['act', 'Bis Voyager 1: ein ganzer Tag', 'hot']];

// ---------- Teil 2: Blick vom Mond. Start 1977, rund 17 km/s, seit 2012 zwischen den Sternen, rund 26 Milliarden km ----------
function moon27(t) { let s = '<defs><linearGradient id="mg27" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5C6280"/><stop offset="1" stop-color="#1E2238"/></linearGradient></defs><path d="M0 1552 Q280 1520 560 1556 T1080 1548 V1920 H0 Z" fill="url(#mg27)" stroke="#8A93A8" stroke-width="5"/>';
  [[480, 1600, 60], [820, 1640, 44], [140, 1700, 38], [660, 1760, 70]].forEach(c => { s += '<ellipse cx="' + c[0] + '" cy="' + c[1] + '" rx="' + c[2] + '" ry="' + c[2] * .3 + '" fill="#2A2F48" stroke="#7C879C" stroke-width="3"/>'; }); return s; }
const VP27 = u => [lerp(250, 900, u), lerp(1010, 760, u)]; // Flugbahn von der Erde nach rechts oben
WORLD.p27weit_3 = function (sc, ev, t, lt) { const st = ev.start, te = ev.tempo, ra = ev.raus, a = ev.act, SX = 140, SY = 930;
  let s = bg27(sky27(t, { space: 1, hz: 1560 }) + moon27(t), sc, t, lt);
  s += '<g opacity="' + cl((lt - .2) / .5) + '"><circle cx="' + SX + '" cy="' + SY + '" r="70" fill="#FFE14D" opacity=".25"/><circle cx="' + SX + '" cy="' + SY + '" r="40" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/>';
  [[110, '#2B8CFF', 9], [230, '#E0A060', 18], [330, '#E8D29A', 15]].forEach((p, i) => { const an = t * (.4 / (i + 1)) + i * 2; s += '<circle cx="' + SX + '" cy="' + SY + '" r="' + p[0] + '" fill="none" stroke="#AEB9D6" stroke-width="2" opacity=".45"/><circle cx="' + (SX + p[0] * Math.cos(an)) + '" cy="' + (SY + p[0] * .9 * Math.sin(an)) + '" r="' + p[2] + '" fill="' + p[1] + '" stroke="#0B1020" stroke-width="3"/>'; });
  s += '</g>';
  const u = st === undefined ? 0 : (a !== undefined ? 1 : cl(st / 9) * .82 + (ra !== undefined ? .1 * ease(cl(ra / 1.5)) : 0));
  if (st !== undefined) { let d = 'M' + VP27(0).join(' '); for (let q = .02; q <= u; q += .02) d += ' L' + VP27(q).join(' '); s += '<path d="' + d + '" stroke="#5CE1FF" stroke-width="5" stroke-dasharray="14 10" fill="none"/>' + probe27(VP27(u)[0], VP27(u)[1] - 10, .42, -14) + chip3(230, 1088, 'Start 1977', 32, '#F4F6FB', '#0B1020', (st - .5) / .3); }
  if (te !== undefined && a === undefined) s += chip3(430, 770, 'rund 17 km/s', 32, '#5CE1FF', '#0B1020', (te - .3) / .3);
  if (ra !== undefined) { const k = ease(cl(ra / .7)); s += '<path d="M' + (SX + 560) + ' ' + (SY - 300) + ' Q' + (SX + 640) + ' ' + SY + ' ' + (SX + 560) + ' ' + (SY + 300) + '" stroke="#FF6BD6" stroke-width="6" stroke-dasharray="18 12" fill="none" opacity="' + k + '"/>' + chip3(SX + 520, SY + 150, 'ab 2012: zwischen den Sternen', 28, '#FF6BD6', '#0B1020', (ra - .6) / .3); }
  if (a !== undefined) { const k = ease(cl(a / .6)); s += '<path d="M' + VP27(0)[0] + ' ' + (VP27(0)[1] + 50) + ' L' + lerp(VP27(0)[0], VP27(1)[0], k) + ' ' + (lerp(VP27(0)[1], VP27(1)[1], k) + 50) + '" stroke="#FFD23F" stroke-width="6"/>' + chip3(520, 770, 'rund 26 Mrd. km = 1 Lichttag', 32, '#FFD23F', '#0B1020', (a - .6) / .3); }
  return W(s + shade3(), slot(ev, L27B)); };
// Schalti rennt der Sonde hinterher, gibt auf und kommt zurueck
WMASC.p27weit_3 = (ev, t, lt, sc) => { const te = ev.tempo; if (te === undefined) return BIG3(); const D = Math.max(2.4, D27(sc, 1)), u = te / D, run = Math.abs(Math.sin(t * 17));
  if (u < .45) { const k = ease(u / .45); return { f: [lerp(220, 760, k), 1537 - 14 * run], s: 1, r: 10, nospin: 1, mood: 'happy' }; }
  if (u < .65) return { f: [760, 1537], s: 1, r: -6 + 4 * Math.sin(t * 12), nospin: 1, mood: 'cry' };
  const k = ease(cl((u - .65) / .3)); return { f: [lerp(760, 220, k), 1537 - 8 * run * (k < 1 ? 1 : 0)], s: 1, flip: k < 1, walk: k < 1, nospin: 1 }; };
const L27B = [['start', 'Voyager 1 startete 1977'], ['tempo', 'Rund 17 Kilometer pro Sekunde'], ['raus', 'Seit 2012 zwischen den Sternen'], ['act', 'Rund 26 Mrd. km: ein Lichttag', 'hot']];

// ---------- Teil 3: Die Antenne gross. Sender rund 22 Watt wie eine Kuehlschranklampe, Antennen mit 70 m, Antwort nach zwei Tagen ----------
WORLD.p27leise_3 = function (sc, ev, t, lt) { const wa = ev.watt, la = ev.lampe, sch = ev.schuessel, a = ev.act;
  let s = bg27(sky27(t) + ground27(t), sc, t, lt) + dish27(600, 880, .8, t, { glow: wa !== undefined ? .6 : 0 });
  if (wa !== undefined) { s += '<g opacity="' + cl(wa / .4) + '">' + probe27(200, 760, .4, -10) + '</g>'; for (let i = 0; i < 4; i++) { const c = (t * .5 + i / 4) % 1; s += '<path d="M' + lerp(240, 470, c) + ' ' + lerp(770, 690, c) + ' q10 -14 0 -28" stroke="#B8F3FF" stroke-width="4" fill="none" opacity="' + (.6 * (1 - c) * cl(wa / .5)) + '"/>'; } if (a === undefined) s += chip3(250, 870, 'rund 22 W', 34, '#5CE1FF', '#0B1020', (wa - .4) / .3); }
  if (la !== undefined && a === undefined) { const k = back(cl(la / .35)) * .7; s += '<g transform="translate(860 880) scale(' + k + ')"><rect x="-80" y="-110" width="160" height="200" rx="16" fill="#E8ECF5" stroke="#0B1020" stroke-width="6"/><path d="M-80 -20 H80" stroke="#0B1020" stroke-width="5"/><circle cx="-40" cy="-64" r="' + (20 + 3 * Math.sin(t * 6)) + '" fill="#FFE14D" opacity=".6"/><circle cx="-40" cy="-64" r="13" fill="#FFF3B8" stroke="#0B1020" stroke-width="4"/></g>' + chip3(790, 1075, 'Kühlschranklampe', 26, '#FFD23F', '#0B1020', (la - .4) / .3); }
  if (sch !== undefined && a === undefined) { const k = ease(cl(sch / .6)); s += '<g opacity="' + k + '"><path d="M429 1001 L' + lerp(429, 765, k) + ' ' + lerp(1001, 852, k) + '" stroke="#FFD23F" stroke-width="6" stroke-dasharray="16 8"/></g>' + chip3(470, 1075, '70 m', 36, '#F4F6FB', '#0B1020', (sch - .5) / .3); }
  if (a !== undefined) { s += clock27(250, 900, 66, a * 360) + chip3(250, 1020, 'hin: 24 h', 30, '#5CE1FF', '#0B1020', (a - .3) / .3) + clock27(830, 900, 66, a * 360) + chip3(830, 1020, 'zurück: 24 h', 30, '#FF6B6B', '#0B1020', (a - .9) / .3); }
  return W(s + shade3(), slot(ev, L27C)); };
// Schalti springt beim Satz zur Antenne in die Schuessel und zurueck
WMASC.p27leise_3 = (ev, t) => { const sch = ev.schuessel, a = ev.act, H = [220, 1537], K = [600, 905];
  if (a !== undefined) { const k = ease(cl(a / .45)); return k >= 1 ? BIG3() : { f: [lerp(K[0], H[0], k), lerp(K[1], H[1], k) - 130 * Math.sin(Math.PI * k)], s: lerp(.45, 1, k), flip: true, nospin: 1 }; }
  if (sch === undefined || sch < .9) return BIG3();
  const k = ease(cl((sch - .9) / .5)); return { f: [lerp(H[0], K[0], k), lerp(H[1], K[1], k) - 170 * Math.sin(Math.PI * k)], s: lerp(1, .45, k), r: k < 1 ? 0 : 5 * Math.sin(t * 4), nospin: 1 }; };
const L27C = [['watt', 'Sender: rund 22 Watt'], ['lampe', 'So viel wie eine Kühlschranklampe'], ['schuessel', 'Antennen mit 70 Metern', 'hot'], ['act', 'Antwort nach zwei Tagen', 'red']];

// ---------- Schluss ----------
WORLD.p27outro_3 = function (sc, ev, t, lt) { return W(bg27(sky27(t) + ground27(t), sc, t, 9, { cx: 780, cy: 860 }) + dish27(780, HZ27 - 238, .78, t, { glow: .6 }) + beam27(780, HZ27 - 380, (t * .5) % 1) + console27(430, 1546, 0, t) + shade3()); };
['h7p27_3', 'p27licht_3', 'p27weit_3', 'p27leise_3', 'p27outro_3'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#5CE1FF'); });
