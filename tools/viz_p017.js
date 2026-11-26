// P017 "Warum fällt die ganze Lichterkette aus?" (Physik, Skript 4 mit Abschnitt 9, Kostuem P3 Unter Strom), Pilotvideo, stumme Demo v1 (25.11.2026).
// Pro Teil eine andere Hauptdarstellung:
//   Einstieg: ab Bild 1 dreht Schalti eine Kerze locker, die ganze Kette geht aus, er stolpert ueber das Kabel.
//   Teil 1: Interaktion im Ort (Strom laeuft als Lichtpunkte von Kerze zu Kerze, Reihenschaltung, Kerze locker = alles aus).
//   Teil 2: Wissenschaftsmodus (Schaltbild, 230 V teilen sich auf 10 Kerzen, falsche Ersatzkerze flackert).
//   Teil 3: die eine Lupe (Gluehdraht und Nebenwiderstand in der Kerze), Kette bleibt an, andere werden heiss, Stecker ziehen.
// Nutzt lupeH (viz_hook.js), fuse33, lab33, lab33dots (viz_v33.js), slot, svgT, bolt (viz_p002.js). Zum Loeschen: diese Datei und videos/P017.
var AC17 = '#5CE1FF', ST17 = '#0B1020', GY17 = 1537, XT17 = 455, XH17 = 340, XL17 = 345; // Plaetze rechts der Kommode
const mv17 = (a, b, k) => lerp(a, b, ease(cl(k)));
// Schrift wie svgT, aber mit Ersatzschrift (Inter Display fehlt nicht auf jedem Rechner, sonst faellt SVG auf eine Serifenschrift zurueck)
const txt17 = (x, y, s, size, col) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" font-weight="900" fill="' + (col || '#fff') + '" font-family="Inter Display, Inter, Arial, sans-serif">' + s + '</text>';

// ---------- Kette: Kerzen am Baum und Kabelweg (Reihenschaltung, ein Weg hin und zurueck) ----------
const B17 = [[632, 1418], [760, 1392], [900, 1405], [1005, 1395], [930, 1325], [820, 1318], [715, 1328], [705, 1058], [900, 1052], [820, 885]]; // keine Kerze im Band des Untertitels (y 1160 bis 1290)
const P17 = [[250, 1632], [330, 1640], [470, 1615], [600, 1560]].concat(B17.map(([x, y]) => [x, y + 44])).concat([[826, 925], [826, 1470], [700, 1585], [480, 1655], [262, 1650]]);
const L17 = (() => { const c = [0]; for (let i = 1; i < P17.length; i++) c.push(c[i - 1] + Math.hypot(P17[i][0] - P17[i - 1][0], P17[i][1] - P17[i - 1][1])); return c; })();
const U17 = B17.map((b, i) => L17[4 + i] / L17[L17.length - 1]); // Lage jeder Kerze auf dem Weg (0..1)
function pt17(u) { u = ((u % 1) + 1) % 1; const d = u * L17[L17.length - 1]; let i = 1; while (i < L17.length - 1 && L17[i] < d) i++; const k = (d - L17[i - 1]) / Math.max(1, L17[i] - L17[i - 1]);
  return [lerp(P17[i - 1][0], P17[i][0], k), lerp(P17[i - 1][1], P17[i][1], k)]; }
const wirePath17 = () => 'M' + P17.map(p => p[0] + ' ' + p[1]).join(' L');

// Kerze: (x, y) ist die Mitte der Birne. on 0..1, hot 0..1 (ueberlastet), tw: lose gedreht
function bulb17(x, y, on, hot, tw) { let s = '';
  if (on > .02) s += '<circle cx="' + x + '" cy="' + y + '" r="' + (40 + 16 * hot) + '" fill="url(#gl17)" opacity="' + (.75 * on).toFixed(2) + '"/>' + (hot > .02 ? '<circle cx="' + x + '" cy="' + y + '" r="' + (30 + 12 * hot) + '" fill="#FF8A3D" opacity="' + (.35 * hot * on).toFixed(2) + '"/>' : '');
  s += '<rect x="' + (x - 8) + '" y="' + (y + 12) + '" width="16" height="32" rx="3" fill="#F4EFE6" stroke="' + ST17 + '" stroke-width="3"/><rect x="' + (x - 11) + '" y="' + (y + 38) + '" width="22" height="9" rx="3" fill="#2F6B3A" stroke="' + ST17 + '" stroke-width="3"/>';
  const col = on > .5 ? (hot > .3 ? '#FFD08A' : '#FFF1B8') : '#C9CFDB';
  s += '<g transform="rotate(' + (tw || 0).toFixed(1) + ' ' + x + ' ' + (y + 12) + ')"><path d="M' + x + ' ' + (y - 22) + ' Q' + (x + 13) + ' ' + (y - 4) + ' ' + x + ' ' + (y + 13) + ' Q' + (x - 13) + ' ' + (y - 4) + ' ' + x + ' ' + (y - 22) + ' Z" fill="' + col + '" stroke="' + ST17 + '" stroke-width="2.5"/></g>';
  return s; }
// Lichtpunkte auf dem Kabel (Erklaerbild fuer den Strom). k: Deckkraft, sp: Tempo, tf: eingefrorene Zeit
function dots17(t, k, sp, tf) { if (k <= .01) return ''; let s = ''; const N = 40, tt = tf === undefined ? t : tf;
  for (let i = 0; i < N; i++) { const [x, y] = pt17(i / N + tt * sp); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="19" fill="#FFE14D" opacity="' + (.4 * k).toFixed(2) + '"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="9" fill="#EFFFFF" opacity="' + k.toFixed(2) + '"/>'; }
  return s; }
// Funke an einer Stelle
function spark17(x, y, k) { if (k <= 0 || k >= 1) return ''; let s = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + .3; s += '<path d="M' + (x + Math.cos(a) * (18 + 40 * k)).toFixed(0) + ' ' + (y + Math.sin(a) * (18 + 40 * k)).toFixed(0) + ' l' + (Math.cos(a) * 26).toFixed(0) + ' ' + (Math.sin(a) * 26).toFixed(0) + '" stroke="#FFE14D" stroke-width="6" stroke-linecap="round" opacity="' + (1 - k).toFixed(2) + '"/>'; } return s; }

// ---------- Der Ort: Wohnzimmer am Abend des 1. Advent ----------
function room17(t, o) { o = o || {}; let s = '<defs><linearGradient id="wl17" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E2348"/><stop offset="1" stop-color="#4A3760"/></linearGradient><radialGradient id="gl17"><stop offset="0" stop-color="#FFE9A6" stop-opacity="1"/><stop offset="1" stop-color="#FFE9A6" stop-opacity="0"/></radialGradient><linearGradient id="nt17" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1638"/><stop offset="1" stop-color="#2B3A72"/></linearGradient></defs>';
  s += '<rect width="1080" height="1460" fill="url(#wl17)"/>';
  for (let x = 30; x < 1080; x += 90) s += '<path d="M' + x + ' 0 V1440" stroke="#fff" stroke-width="18" opacity=".025"/>';
  // Fenster mit Schnee, Mond und Daechern (80 px tiefer, damit das Etikett oben frei liegt)
  s += '<g transform="translate(0 80)">';
  s += '<rect x="250" y="620" width="360" height="420" rx="8" fill="url(#nt17)"/><circle cx="530" cy="700" r="34" fill="#FFF3D0" opacity=".9"/>';
  s += '<path d="M250 960 L320 900 L390 960 L430 930 L500 980 L560 930 L610 970 V1040 H250 Z" fill="#141B3A"/><path d="M250 960 L320 900 L390 960 L430 930 L500 980 L560 930 L610 970" fill="none" stroke="#F4F8FF" stroke-width="8"/>';
  for (let i = 0; i < 22; i++) { const c = (t * (.08 + .04 * rnd(i + 70)) + rnd(i + 71)) % 1, x = 262 + rnd(i + 72) * 336 + 10 * Math.sin(t + i); s += '<circle cx="' + x.toFixed(0) + '" cy="' + (630 + 400 * c).toFixed(0) + '" r="' + (3 + 3 * rnd(i + 73)).toFixed(1) + '" fill="#fff" opacity=".8"/>'; }
  s += '<rect x="250" y="620" width="360" height="420" rx="8" fill="none" stroke="#6B4A35" stroke-width="18"/><path d="M430 620 V1040 M250 830 H610" stroke="#6B4A35" stroke-width="12"/><rect x="236" y="1036" width="388" height="20" rx="4" fill="#7A563E" stroke="' + ST17 + '" stroke-width="4"/>';
  s += '<path d="M206 598 H654" stroke="#3A2A20" stroke-width="10" stroke-linecap="round"/><path d="M212 604 Q236 820 214 1060 H262 Q246 820 262 604 Z" fill="#A3304A" stroke="' + ST17 + '" stroke-width="4"/><path d="M598 604 Q614 820 598 1060 H646 Q624 820 648 604 Z" fill="#A3304A" stroke="' + ST17 + '" stroke-width="4"/></g>';
  // Sockelleiste und Holzboden
  s += '<rect x="0" y="1440" width="1080" height="480" fill="#7A5034"/><rect x="0" y="1440" width="1080" height="18" fill="#E9DCC8" stroke="' + ST17 + '" stroke-width="3"/>';
  for (let i = 0; i < 7; i++) s += '<path d="M0 ' + (1520 + i * 66) + ' H1080" stroke="#5E3C26" stroke-width="4"/>';
  for (let i = 0; i < 14; i++) { const r = Math.floor(i / 2), x = (i % 2 ? 260 : 620) + 120 * Math.sin(r * 2.3); s += '<path d="M' + x.toFixed(0) + ' ' + (1458 + r * 66) + ' v66" stroke="#5E3C26" stroke-width="4"/>'; }
  s += '<ellipse cx="430" cy="1720" rx="340" ry="74" fill="#8C2F45" stroke="' + ST17 + '" stroke-width="5"/><ellipse cx="430" cy="1720" rx="280" ry="52" fill="none" stroke="#E7B44C" stroke-width="5" stroke-dasharray="16 12"/>';
  // Kommode mit Adventskranz (eine Kerze brennt), schmal am linken Rand, damit Schalti frei davor steht
  s += '<rect x="8" y="1240" width="142" height="200" rx="8" fill="#6B4A35" stroke="' + ST17 + '" stroke-width="5"/><path d="M16 1310 H142 M16 1380 H142" stroke="' + ST17 + '" stroke-width="4"/><circle cx="79" cy="1290" r="7" fill="#E7B44C"/><circle cx="79" cy="1350" r="7" fill="#E7B44C"/><circle cx="79" cy="1415" r="7" fill="#E7B44C"/>';
  s += '<ellipse cx="79" cy="1232" rx="66" ry="18" fill="#2F6B3A" stroke="' + ST17 + '" stroke-width="4"/>';
  [[40, 1222], [66, 1214], [94, 1214], [120, 1222]].forEach(([x, y]) => { s += '<rect x="' + (x - 8) + '" y="' + (y - 50) + '" width="16" height="50" rx="3" fill="#C62F3F" stroke="' + ST17 + '" stroke-width="3"/>'; });
  for (let i = 0; i < 5; i++) s += '<circle cx="' + (30 + i * 25) + '" cy="' + (1236 + 5 * Math.sin(i * 2)) + '" r="5" fill="#C62F3F"/>';
  return s; }
// Flamme der ersten Adventskerze (liegt ueber dem Abdunkeln)
function flame17(t) { const f = 1 + .08 * Math.sin(t * 13) + .05 * Math.sin(t * 7.3); return '<circle cx="40" cy="1156" r="' + (40 * f).toFixed(1) + '" fill="url(#gl17)" opacity=".6"/><path d="M40 ' + (1172 - 24 * f).toFixed(1) + ' Q50 1162 40 1172 Q30 1162 40 ' + (1172 - 24 * f).toFixed(1) + ' Z" fill="#FFB347" stroke="#FFE9A6" stroke-width="2"/>'; }
// Tannenbaum im Topf mit Kugeln und Stern
function tree17() { let s = '<rect x="806" y="1420" width="40" height="40" fill="#5A3A26" stroke="' + ST17 + '" stroke-width="4"/><path d="M754 1450 H898 L882 1562 H770 Z" fill="#B0443A" stroke="' + ST17 + '" stroke-width="5"/><path d="M760 1478 H892" stroke="#E7B44C" stroke-width="7"/>';
  [[1160, 1440, 235], [980, 1260, 205], [800, 1080, 165], [640, 900, 125]].forEach(([t0, b0, hw], i) => { s += '<path d="M820 ' + t0 + ' L' + (820 + hw) + ' ' + b0 + ' Q820 ' + (b0 + 26) + ' ' + (820 - hw) + ' ' + b0 + ' Z" fill="' + ['#24613A', '#2A6E41', '#2F7A47', '#358650'][i] + '" stroke="' + ST17 + '" stroke-width="5" stroke-linejoin="round"/>';
    for (let k = 0; k < 5; k++) { const x = 820 - hw * .8 + k * hw * .4; s += '<path d="M' + x.toFixed(0) + ' ' + (b0 - 6) + ' l14 -26 l14 26" fill="none" stroke="#1D4F2F" stroke-width="4"/>'; } });
  [[700, 1205, '#E8384F'], [945, 1200, '#E7B44C'], [790, 1140, '#5CA8FF'], [870, 1210, '#E8384F'], [770, 965, '#E7B44C'], [875, 985, '#5CA8FF']].forEach(([x, y, c]) => { s += '<circle cx="' + x + '" cy="' + y + '" r="17" fill="' + c + '" stroke="' + ST17 + '" stroke-width="3"/><circle cx="' + (x - 5) + '" cy="' + (y - 6) + '" r="5" fill="#fff" opacity=".7"/>'; });
  s += '<path d="M820 588 L831 614 L858 616 L837 632 L844 659 L820 644 L796 659 L803 632 L782 616 L809 614 Z" fill="#FFD84D" stroke="' + ST17 + '" stroke-width="4"/>';
  return s; }
// Mehrfachsteckdose auf dem Boden mit Stecker der Kette. out: Stecker gezogen (0..1)
function strip17(out) { const o = ease(cl(out || 0)); let s = '<ellipse cx="210" cy="1668" rx="110" ry="10" fill="#000" opacity=".25"/><rect x="100" y="1622" width="220" height="44" rx="12" fill="#F2F3F6" stroke="' + ST17 + '" stroke-width="4"/>';
  for (let i = 0; i < 3; i++) s += '<circle cx="' + (140 + i * 55) + '" cy="1644" r="15" fill="#D8DBE3" stroke="' + ST17 + '" stroke-width="3"/>';
  s += '<rect x="292" y="1634" width="18" height="20" rx="4" fill="' + (o < .5 ? '#FF4D4D' : '#7A2A2A') + '"/>';
  const px = 250 - 190 * o, py = 1632 + 22 * o - 90 * Math.sin(Math.PI * o); // Stecker landet neben der Leiste auf dem Boden s += '<rect x="' + (px - 16) + '" y="' + (py - 20) + '" width="32" height="34" rx="8" fill="#2B2F3A" stroke="#C9CFDB" stroke-width="3"/>';
  return s; }
// Ganze Kette zeichnen. o.on (0..1), o.off (Index einer dunklen Kerze), o.hot, o.tw0 (Kerze 0 gedreht), o.boost (Kerze leuchtet kurz auf), o.out (Stecker raus)
function chain17(t, o) { o = o || {}; const out = ease(cl(o.out || 0)); let pth = wirePath17(); if (out > 0) pth = 'M' + (250 - 190 * out).toFixed(0) + ' ' + (1632 + 22 * out - 90 * Math.sin(Math.PI * out)).toFixed(0) + ' L' + P17.slice(1).map(p => p[0] + ' ' + p[1]).join(' L');
  let s = '<path d="' + pth + '" fill="none" stroke="#1C2B1F" stroke-width="7" stroke-linejoin="round"/>';
  if (o.hl) s += '<path d="' + wirePath17() + '" fill="none" stroke="' + AC17 + '" stroke-width="14" stroke-linejoin="round" opacity="' + (.35 * o.hl).toFixed(2) + '"/>';
  return s; }
function bulbs17(t, o) { o = o || {}; let s = ''; B17.forEach(([x, y], i) => { let on = o.on === undefined ? 1 : o.on; if (o.off === i) on = 0; const bo = o.boost ? o.boost(i) : 0;
    s += bulb17(x, y, cl(on + bo), cl((o.hot || 0) * (o.off === i ? 0 : 1) + .4 * bo), i === 0 ? (o.tw0 || 0) : 0); }); return s; }
// Hitze ueber ueberlasteten Kerzen
function heat17(t, k, off) { if (k <= .02) return ''; let s = ''; B17.forEach(([x, y], i) => { if (i === off) return; const c = (t * 1.2 + i * .37) % 1; s += '<path d="M' + x + ' ' + (y - 34 - 30 * c).toFixed(0) + ' q9 -10 0 -20 q-9 -10 0 -20" fill="none" stroke="#FFB066" stroke-width="4" stroke-linecap="round" opacity="' + (k * (1 - c)).toFixed(2) + '"/>'; }); return s; }
const dark17 = k => k > .01 ? '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.5 * cl(k)).toFixed(2) + '"/>' : '';
function scene17(t, o) { o = o || {}; const on = o.on === undefined ? 1 : o.on;
  return room17(t) + tree17() + chain17(t, o) + strip17(o.out) + dark17(1 - on) + flame17(t) + bulbs17(t, o) + (o.dots || '') + heat17(t, o.hot || 0, o.off); }

// ---------- Einstieg ----------
// Ab Bild 1 greift Schalti an die unterste Kerze und dreht sie, bei 0,9 s klickt es und die ganze Kette geht aus.
// Bei der Themenfrage weicht er zurueck und stolpert ueber das Kabel, beim Versprechen faengt er sich und schaut zum Baum.
WORLD.p17Hook = function (sc, ev, t, lt) { const off = cl((lt - 1.4) / .12);
  let s = scene17(t, { on: 1 - off, tw0: 26 * ease(cl((lt - .3) / 1.1)) });
  s += spark17(632, 1418, (lt - 1.4) / .45) + (lt > 1.4 && lt < 1.75 ? '<rect width="1080" height="1920" fill="#FFF1B8" opacity="' + (.35 * (1 - (lt - 1.4) / .35)).toFixed(2) + '"/>' : '');
  if (lt > 1.6) { const c = (t * .9) % 1; s += '<circle cx="632" cy="1440" r="' + (24 + 50 * c).toFixed(0) + '" fill="none" stroke="#FF4D6D" stroke-width="8" opacity="' + ((1 - c) * cl((lt - 1.6) / .3)).toFixed(2) + '"/>'; }
  const fr = ev.frage; if (fr !== undefined) { const w = Math.sin(Math.PI * cl((fr - .8) / .9)); if (w > 0) s += '<path d="M330 1640 Q400 ' + (1640 - 40 * w).toFixed(0) + ' 470 1615" fill="none" stroke="' + AC17 + '" stroke-width="5" opacity="' + (.6 * w).toFixed(2) + '"/>'; }
  return W(s + shade3()); };
WMASC.p17Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) { const j = Math.sin(Math.PI * cl(lo / .7)); return stay3([370, GY17 - 22 * j], 1, { flip: 1, r: 4 * Math.sin(t * 2), mood: 'happy' }); }
  if (fr !== undefined) { const x = mv17(XT17, 370, fr / 1.1), tip = Math.sin(Math.PI * cl((fr - .8) / 1.1)); return stay3([x, GY17], 1, { flip: 1, walk: fr < 1 ? 1 : 0, r: -32 * tip + 8 * tip * Math.sin(t * 9), mood: 'shock' }); }
  const reach = ease(cl(lt / .3)), tw = lt > .3 && lt < 1.4 ? 6 * Math.sin((lt - .3) * 26) : 0, jolt = Math.sin(Math.PI * cl((lt - 1.4) / .5));
  return stay3([XT17 - 30 * jolt, GY17 - 30 * jolt], 1, { flip: 1, r: 14 * reach * (1 - jolt) + tw - 10 * jolt, mood: lt > 1.4 ? 'shock' : 'happy' }); };

// ---------- Teil 1: Ein Weg (Interaktion im Ort) ----------
WORLD.p17Weg = function (sc, ev, t, lt) { const we = ev.weg, re = ev.reihe, lo = ev.lose;
  let on = 0, tw0 = 26, dots = '', hl = 0, boost = null;
  if (we !== undefined) { tw0 = 26 * (1 - ease(cl((we - .1) / .6))); on = cl((we - .7) / .15);
    const u = cl((we - 1.0) / 3.6); if (u > 0 && u < 1 && re === undefined) { const [x, y] = pt17(u); dots += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="26" fill="#FFE14D" opacity=".45"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="12" fill="#EFFFFF"/>';
      boost = i => Math.max(0, 1 - Math.abs(u - U17[i]) * 25) * .9; } }
  if (re !== undefined) { const k = cl(re / .6); dots = dots17(t, k * (lo === undefined ? 1 : 1), .07); hl = k * (lo === undefined ? 1 : 0); }
  let sp = '';
  if (lo !== undefined) { tw0 = 26 * ease(cl((lo - .3) / .6)); const br = cl((lo - .9) / .15); on = 1 - br; hl = 0;
    const tf = re === undefined ? t : Math.min(t, sc.start + (lo === undefined ? 0 : 0) + (t - lo) + .9); // Punkte frieren beim Klick ein
    dots = dots17(t, 1 - cl((lo - 1.0) / .9), .07, lo > .9 ? t - lo + .9 : undefined); sp = spark17(632, 1418, (lo - .9) / .35);
    if (lo > 1.1) { const c = (t * .9) % 1; sp += '<circle cx="632" cy="1440" r="' + (24 + 50 * c).toFixed(0) + '" fill="none" stroke="#FF4D6D" stroke-width="8" opacity="' + ((1 - c) * cl((lo - 1.1) / .3)).toFixed(2) + '"/>'; } }
  let s = scene17(t, { on: on, tw0: tw0, dots: dots, hl: hl, boost: boost }) + sp;
  return W(s + shade3(), slot(ev, [['weg', 'Eine Kerze nach der anderen'], ['reihe', 'Reihenschaltung', 'hot'], ['lose', 'Weg unterbrochen']])); };
WMASC.p17Weg = (ev, t, lt) => { const we = ev.weg, re = ev.reihe, lo = ev.lose;
  if (lo !== undefined) { const back = mv17(XH17 + 40, XT17, lo / .4), tw = lo > .3 && lo < .9 ? 6 * Math.sin((lo - .3) * 26) : 0, jolt = Math.sin(Math.PI * cl((lo - .9) / .5)), sh = lo > 1.6 ? Math.sin(Math.PI * cl((lo - 1.6) / .8)) : 0;
    return stay3([back - 24 * jolt, GY17 - 24 * jolt - 16 * sh], 1, { flip: 1, walk: lo < .4 ? 1 : 0, r: 12 * cl(lo / .3) * (1 - jolt) + tw - 8 * jolt + 6 * sh * Math.sin(t * 8), mood: lo > .9 ? 'shock' : 'happy' }); }
  if (re !== undefined) { const x = mv17(XT17, XH17 + 40, re / .7), nod = Math.sin(Math.PI * cl((re - 1.2) / .6)); return stay3([x, GY17 - 10 * nod], 1, { flip: 1, walk: re < .7 ? 1 : 0, r: 6 * nod, mood: 'cool' }); }
  if (we !== undefined) { const tw = we > .1 && we < .7 ? 6 * Math.sin((we - .1) * 26) : 0, j = Math.sin(Math.PI * cl((we - .7) / .5)); return stay3([XT17, GY17 - 26 * j], 1, { flip: 1, r: 12 * (1 - cl((we - .7) / .3)) + tw, mood: 'happy' }); }
  return stay3([mv17(370, XT17, lt / .35), GY17], 1, { flip: 1, walk: lt < .35 ? 1 : 0, r: 3 }); };

// ---------- Teil 2: Spannung geteilt (Wissenschaftsmodus, nur hier) ----------
const SB17 = [[320, 790], [455, 790], [590, 790], [725, 790], [860, 790], [860, 1080], [725, 1080], [590, 1080], [455, 1080], [320, 1080]]; // ueber dem Band des Untertitels
const SP17 = [[170, 860], [170, 790], [930, 790], [930, 1080], [170, 1080], [170, 1010]]; // Rahmen des Schaltbilds, oben aus der Steckdose heraus, unten wieder hinein
const SL17 = (() => { const c = [0]; for (let i = 1; i < SP17.length; i++) c.push(c[i - 1] + Math.hypot(SP17[i][0] - SP17[i - 1][0], SP17[i][1] - SP17[i - 1][1])); return c; })();
function spt17(u) { u = ((u % 1) + 1) % 1; const d = u * SL17[SL17.length - 1]; let i = 1; while (i < SL17.length - 1 && SL17[i] < d) i++; const k = (d - SL17[i - 1]) / Math.max(1, SL17[i] - SL17[i - 1]); return [lerp(SP17[i - 1][0], SP17[i][0], k), lerp(SP17[i - 1][1], SP17[i][1], k)]; }
function sbulb17(x, y, on, ring, z) { z = z || 1; let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(3) + ')">';
  if (on > .02) s += '<circle r="64" fill="url(#gl17)" opacity="' + (.8 * on).toFixed(2) + '"/>';
  s += '<circle r="32" fill="' + (on > .3 ? '#FFF1B8' : '#3A4258') + '" stroke="#F4F6FB" stroke-width="5"/><path d="M-12 6 q6 -16 12 0 q6 16 12 0" fill="none" stroke="' + (on > .3 ? '#FF9A3D' : '#7A8299') + '" stroke-width="4"/>';
  if (ring) s += '<circle r="44" fill="none" stroke="' + ring + '" stroke-width="7"/>';
  return s + '</g>'; }
function sci17(t, ev) { const te = ev.teil, ze = ev.zehn, er = ev.ersatz; let s = '';
  s += '<path d="M' + SP17.map(p => p[0] + ' ' + p[1]).join(' L') + '" fill="none" stroke="#F4F6FB" stroke-width="8" stroke-linejoin="round" opacity=".9"/>';
  // Steckdose links
  const pu = te === undefined ? 0 : Math.sin(Math.PI * cl(te / .8));
  s += '<g transform="translate(170 935) scale(' + (1 + .12 * pu).toFixed(3) + ')"><rect x="-70" y="-78" width="140" height="156" rx="22" fill="#F4F6FB" stroke="' + AC17 + '" stroke-width="6"/><circle cx="-20" cy="-30" r="10" fill="' + ST17 + '"/><circle cx="20" cy="-30" r="10" fill="' + ST17 + '"/>' + txt17(0, 46, '230 V', 40, ST17) + '</g>';
  // Strom laeuft im Kreis
  const lit = i => te === undefined ? 0 : cl((te - .5 - i * .16) / .2);
  for (let i = 0; i < 26; i++) { const [x, y] = spt17(i / 26 + t * .06); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="7" fill="' + AC17 + '" opacity="' + (te === undefined ? .3 : .9).toFixed(2) + '"/>'; }
  // Blitze fliegen aus der Steckdose zu jeder Kerze
  if (te !== undefined) SB17.forEach(([x, y], i) => { const f = cl((te - .2 - i * .16) / .4); if (f <= 0 || f >= 1) return; const e = ease(f); s += bolt(lerp(170, x, e), lerp(935, y, e) - 60 * Math.sin(Math.PI * f), .8, '#FFE14D', 1 - f * .3); });
  // Falsche Ersatzkerze: Kerzen leuchten ungleich (Index 7)
  let fl = 0, swapY = 0, ring7 = null, wrong = 0; if (er !== undefined) { if (er > .1 && er < .6) swapY = -90 * ease(cl((er - .1) / .5)); else if (er >= .6 && er < 1) { swapY = -90 * (1 - ease(cl((er - .6) / .4))); wrong = 1; } else if (er >= 1 && er < 2.1) { wrong = 1; fl = 1; } else if (er >= 2.1 && er < 2.5) { swapY = -90 * ease(cl((er - 2.1) / .4)); wrong = 1; } else if (er >= 2.5) swapY = -90 * (1 - ease(cl((er - 2.5) / .4)));
    ring7 = wrong ? '#FF4D6D' : (er >= 2.5 ? '#3DFF7A' : null); }
  SB17.forEach(([x, y], i) => { let on = lit(i); if (fl) on = .25 + .75 * rnd(Math.floor(t * 12) * 7 + i); if (i === 7 && swapY < -20) on = 0;
    s += sbulb17(x, y + (i === 7 ? swapY : 0), on, i === 7 ? ring7 : null, 1); });
  if (fl) s += '<g transform="translate(590 990)" opacity="' + cl((er - 1) / .2).toFixed(2) + '"><path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="#FF4D6D" stroke-width="12" stroke-linecap="round"/></g>';
  if (er !== undefined && er > 2.9) { const k = back(cl((er - 2.9) / .4)); s += '<g transform="translate(590 990) scale(' + k.toFixed(3) + ')"><circle r="34" fill="#3DFF7A" stroke="' + ST17 + '" stroke-width="4"/><path d="M-15 0 L-4 12 L17 -12" fill="none" stroke="' + ST17 + '" stroke-width="7" stroke-linecap="round"/></g>'; }
  // 23 V an jeder Kerze und die Rechnung in der Mitte
  if (ze !== undefined) { const dim = er === undefined ? 1 : 1 - cl(er / .4);
    SB17.forEach(([x, y], i) => { const k = cl((ze - .2 - i * .12) / .3); if (k <= 0 || dim <= .01) return; const cy = i < 5 ? y - 76 : y - 86; s += '<g transform="translate(' + x + ' ' + cy + ') scale(' + back(k).toFixed(3) + ')" opacity="' + dim.toFixed(2) + '"><rect x="-50" y="-26" width="100" height="48" rx="14" fill="' + AC17 + '" stroke="' + ST17 + '" stroke-width="4"/>' + txt17(0, 12, '23 V', 30, ST17) + '</g>'; });
    const kq = cl((ze - 1.6) / .5); if (kq > 0 && dim > .01) s += '<g opacity="' + (kq * dim).toFixed(2) + '">' + txt17(550, 930, '230 V : 10 = 23 V', 62, '#F4F6FB') + '</g>'; }
  return s; }
WORLD.p17Teil = function (sc, ev, t, lt) { const rh = ev.rehook; const tw0 = rh === undefined ? 26 : 26 * (1 - ease(cl((rh - .1) / .6))), on = rh === undefined ? 0 : cl((rh - .7) / .15);
  const bg = fuse33(scene17(t, { on: on, tw0: tw0 }), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '"><rect x="110" y="690" width="860" height="460" rx="30" fill="#05071A" opacity=".55"/>' + lab33dots() + sci17(t, ev) + '</g>' + shade3(), /* dunkle Flaeche hinter dem Schaltbild, damit Fenster und Baum nicht wie Draehte wirken */ slot(ev, [['teil', '230 V werden geteilt'], ['ersatz', 'Gleiche Volt- und Watt-Zahl', 'hot']])); };
WMASC.p17Teil = (ev, t, lt) => { const rh = ev.rehook, te = ev.teil, ze = ev.zehn, er = ev.ersatz;
  if (er !== undefined) { const n = Math.sin(Math.PI * cl((er - 2.9) / .6)); return stay3([XL17, GY17 - 18 * n], 1, { r: 3 * Math.sin(t * 2) + 6 * n, mood: er > 1 && er < 2.5 ? 'shock' : 'cool' }); }
  if (ze !== undefined) { const j = Math.sin(Math.PI * cl((ze - 1.4) / .6)); return stay3([XL17, GY17 - 30 * j], 1, { r: -8 * j, mood: 'shock' }); }
  if (te !== undefined) return stay3([XL17, GY17], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  if (rh !== undefined) { if (rh < .8) { const tw = rh > .1 && rh < .7 ? 6 * Math.sin((rh - .1) * 26) : 0; return stay3([XT17, GY17], 1, { flip: 1, r: 12 + tw, mood: 'happy' }); }
    const k = cl((rh - .8) / .7), j = Math.sin(Math.PI * k); return stay3([mv17(XT17, XL17, k), GY17 - 24 * j], 1, { r: -8 * j, walk: 1, mood: 'happy' }); }
  return stay3([XT17, GY17], 1, { flip: 1, r: 12 }); };

// ---------- Teil 3: Der Umweg (die eine Lupe), Hitze, Stecker ziehen ----------
// Inhalt der Lupe (Koordinaten -320..320): grosse Kerzenbirne mit Gluehdraht oben und Nebenwiderstand darunter. br: Draht gerissen (0..1)
function lens17(t, br) { const bk = cl(br), shC = bk > .5 ? '#E8963A' : '#8A8F9C'; let s = '<rect x="-320" y="-320" width="640" height="640" fill="#241B36"/><circle r="260" fill="url(#gl17)" opacity="' + (.35 * (1 - bk)).toFixed(2) + '"/>';
  s += '<path d="M0 -290 Q170 -120 150 60 Q130 190 70 230 H-70 Q-130 190 -150 60 Q-170 -120 0 -290 Z" fill="#FFF4D0" fill-opacity=".14" stroke="#F4F6FB" stroke-width="6"/>';
  s += '<rect x="-90" y="220" width="180" height="110" rx="10" fill="#8A8F9C" stroke="' + ST17 + '" stroke-width="5"/>';
  s += '<path d="M-60 330 V-40 M60 330 V-40" stroke="#C9CFDB" stroke-width="10" stroke-linecap="round"/>';
  // Gluehdraht: Wendel zwischen den Draehten, glueht; nach dem Reissen haengen zwei Enden herab
  let fil = ''; for (let i = 0; i <= 12; i++) { const x = -60 + i * 10, y = -40 - 70 * Math.sin(Math.PI * i / 12) + (i % 2 ? 12 : -12); fil += (i ? ' L' : 'M') + x + ' ' + y.toFixed(0); }
  if (bk < .01) s += '<path d="' + fil + '" fill="none" stroke="#FFB347" stroke-width="7" stroke-linejoin="round"/><path d="' + fil + '" fill="none" stroke="#FFF1B8" stroke-width="3"/>';
  else { const d = 40 * ease(bk); s += '<path d="M-60 -40 L-50 -80 L-40 -86 L-30 ' + (-100 + d) + ' L-20 ' + (-92 + d * 1.6) + '" fill="none" stroke="#6E5A4A" stroke-width="7" stroke-linejoin="round"/><path d="M60 -40 L50 -80 L40 -86 L30 ' + (-100 + d) + ' L20 ' + (-92 + d * 1.6) + '" fill="none" stroke="#6E5A4A" stroke-width="7" stroke-linejoin="round"/>'; }
  // Nebenwiderstand: kleine Drahtwendel quer ueber die beiden Draehte
  let sh = ''; for (let i = 0; i <= 16; i++) { const x = -60 + i * 7.5, y = 60 + (i % 2 ? 14 : -14); sh += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y; }
  s += '<path d="' + sh + '" fill="none" stroke="' + shC + '" stroke-width="10" stroke-linejoin="round"/>' + (bk > .5 ? '<path d="' + sh + '" fill="none" stroke="#FFE1A8" stroke-width="2.5"/>' : '');
  // Strom: vorher durch den Gluehdraht, danach durch den Umweg
  const via = bk > .7 ? [[-60, 320], [-60, 60], [60, 60], [60, 320]] : [[-60, 320], [-60, -40], [0, -110], [60, -40], [60, 320]];
  const LL = [0]; for (let i = 1; i < via.length; i++) LL.push(LL[i - 1] + Math.hypot(via[i][0] - via[i - 1][0], via[i][1] - via[i - 1][1]));
  if (bk < .4 || bk > .7) for (let j = 0; j < 9; j++) { const d = ((j / 9 + t * .45) % 1) * LL[LL.length - 1]; let i = 1; while (i < LL.length - 1 && LL[i] < d) i++; const k = (d - LL[i - 1]) / (LL[i] - LL[i - 1]);
    s += '<circle cx="' + lerp(via[i - 1][0], via[i][0], k).toFixed(0) + '" cy="' + lerp(via[i - 1][1], via[i][1], k).toFixed(0) + '" r="11" fill="' + AC17 + '" stroke="#EFFFFF" stroke-width="3"/>'; }
  return s; }
const LX17 = 430, LY17 = 900, LR17 = 210;
const ring17 = (t, k) => { if (k <= 0) return ''; const c = (t * 1.1) % 1; return '<ellipse cx="0" cy="60" rx="' + (80 + 60 * c).toFixed(0) + '" ry="' + (34 + 26 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="7" opacity="' + (k * (1 - c)).toFixed(2) + '"/>'; };
WORLD.p17Umweg = function (sc, ev, t, lt) { const um = ev.umweg, du = ev.durch, ta = ev.tausch, st = ev.stecker;
  const br = du === undefined ? 0 : cl((du - .4) / .5), off4 = du !== undefined && du > .5 ? 4 : -1;
  const hot = ta === undefined ? 0 : cl((ta - .3) / .8) * (st === undefined ? 1 : 1 - cl((st - 1.3) / .3));
  const out = st === undefined ? 0 : cl((st - 1.1) / .4), on = 1 - out;
  let s = scene17(t, { on: on, off: off4, hot: hot, out: out, dots: dots17(t, .55 * on * (st === undefined ? 1 : 1 - cl((st - 1.1) / .3)), .07) });
  if (du !== undefined) s += spark17(930, 1325, (du - .4) / .35);
  const lk = um === undefined ? 0 : ease(cl((um - .2) / .5)) * (ta === undefined ? 1 : 1 - cl(ta / .4));
  if (lk > 0) s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * lk).toFixed(2) + '"/>'; // dunkler Spot hinter der Lupe
  if (lk > 0) { if (um !== undefined && du === undefined) { const c = (t * .9) % 1; s += '<circle cx="930" cy="1325" r="' + (34 + 30 * c).toFixed(0) + '" fill="none" stroke="' + AC17 + '" stroke-width="5" opacity="' + (1 - c).toFixed(2) + '"/>'; }
    s += lupeH(LX17, LY17, LR17, lens17(t, br) + ring17(t, um !== undefined && du === undefined ? cl((um - 1) / .4) : 0), lk, 930, 1325); }
  if (st !== undefined && st > 1.3) { const c = ((st - 1.3) * .9) % 1; s += '<circle cx="60" cy="1650" r="' + (20 + 50 * c).toFixed(0) + '" fill="none" stroke="#FF4D6D" stroke-width="6" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  return W(s + shade3(), slot(ev, [['umweg', 'Nebenwiderstand', 'hot'], ['durch', 'Kette bleibt meist an'], ['tausch', 'Andere werden überlastet'], ['stecker', 'Erst Stecker ziehen', 'hot']])); };
WMASC.p17Umweg = (ev, t, lt) => { const um = ev.umweg, du = ev.durch, ta = ev.tausch, st = ev.stecker;
  if (st !== undefined) { const x = mv17(XT17, 370, st / .9), bend = Math.sin(Math.PI * cl((st - .9) / .8)); return stay3([x, GY17], 1, { walk: st < .9 ? 1 : 0, r: -24 * bend, mood: st > 1.6 ? 'happy' : 'cool' }); }
  if (ta !== undefined) { const p = Math.sin(Math.PI * cl((ta - .2) / .8)); return stay3([XT17, GY17 - 10 * p], 1, { flip: 1, r: 10 * p, mood: 'cool' }); }
  if (du !== undefined) { const j = Math.sin(Math.PI * cl((du - .4) / .6)); return stay3([XT17 - 20 * j, GY17 - 26 * j], 1, { flip: 1, r: -8 * j, mood: du > .4 ? 'shock' : 'happy' }); }
  if (um !== undefined) return stay3([XT17, GY17], 1, { flip: 1, r: 3 * Math.sin(t * 2), mood: 'happy' });
  return stay3([mv17(XL17, XT17, lt / .9), GY17 - 20 * Math.sin(Math.PI * cl(lt / .9))], 1, { flip: 1, walk: lt < .9 ? 1 : 0, r: 3, mood: 'happy' }); };

// ---------- Schluss: Kette wieder an, Schalti freut sich ----------
WORLD.p17Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(scene17(t, { on: 1 }) + '<defs><linearGradient id="od17" x1="0" y1="0" x2="0" y2="1"><stop offset=".25" stop-color="#05071A" stop-opacity=".7"/><stop offset=".62" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od17)" opacity="' + k.toFixed(2) + '"/>' + shade3()); }; // Hintergrund oben abgedunkelt, damit Merkliste und Titel ruhig liegen
WMASC.p17Out = (ev, t, lt) => stay3([mv17(370, XH17 + 40, lt / .8) + 60 * Math.sin(Math.PI * cl((lt - 1) / 5)), GY17 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { flip: lt > 3.5 && lt < 6 ? 0 : 1, r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['p17Hook', 'p17Weg', 'p17Teil', 'p17Umweg', 'p17Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC17); });
