// B026 Schicht fuer Schicht, Folge 22 der Reihenfolge: Wie ist ein Zahn aufgebaut? (Backenzahn mit zwei Wurzeln im Laengsschnitt), stumme Demo v1 (26.11.2026).
// Schichten: 1 Zahnmark, 2 Zahnbein, 3 Zahnschmelz, 4 Zahnzement, 5 Wurzelhaut, 6 Kieferknochen. Mit Abschnitt Neue Werkzeuge (Untertitel-Band frei, Ersatzschrift, Spot hinter Lupen).
// Nutzt laborS, labelL, lupeS, shadeS, txtS, COLS (viz_schicht.js), BIG3, stay3, slot, look3. Zum Loeschen: diese Datei und videos/B026.
const ZX26 = 578, ZY26 = 905, ZZ26 = .86, NOTE26 = 'Backenzahn im Längsschnitt';
const ZC26 = { pulp: '#FF7A9C', nerv: '#FFE45E', ves: '#E8384F', dent: '#F5D79A', enam: '#F2FBFF', cem: '#E39A3B', pdl: '#FF9E7A', bone: COLS.bone, spo: '#FFF0D2' };
const ROWS26 = [['Zahnmark', ZC26.pulp], ['Zahnbein', ZC26.dent], ['Zahnschmelz', ZC26.enam], ['Zahnzement', ZC26.cem], ['Wurzelhaut', ZC26.pdl], ['Kieferknochen', ZC26.bone]];
const QL26 = (lx, ly, ty, de, la, k) => labelL(Math.round(ZX26 + lx * ZZ26), Math.round(ZY26 + ly * ZZ26), 712, ty, de, la, k, 1);
const PX26 = (lx) => ZX26 + lx * ZZ26, PY26 = (ly) => ZY26 + ly * ZZ26;
const mark26 = (t, lx, ly, r) => '<circle cx="' + PX26(lx).toFixed(0) + '" cy="' + PY26(ly).toFixed(0) + '" r="' + r + '" fill="none" stroke="' + TH().hl + '" stroke-width="6" stroke-dasharray="16 10" opacity="' + (.7 + .3 * Math.sin(t * 5)).toFixed(2) + '"/>';
const ring26 = (lx, ly, r, k) => k > 0 && k < 1 ? '<circle cx="' + PX26(lx).toFixed(0) + '" cy="' + PY26(ly).toFixed(0) + '" r="' + (r * (1 + .5 * k)).toFixed(0) + '" fill="none" stroke="' + TH().hl + '" stroke-width="8" opacity="' + (1 - k).toFixed(2) + '"/>' : '';
const gag26 = (sc, t) => { const L = sc.lines, g = typeof S !== 'undefined' && S.gagAt ? L[0].start + S.gagAt : L[L.length - 1].end + .15; return t >= g ? t - g : undefined; };
// dunkler Spot hinter der Lupe (Bild-Regel 26.11.2026)
// Ersatzschrift fuer SVG-Text (Bild-Regel 26.11.2026), nur in dieser Folge
const ff26 = (x) => x.split('font-family="Inter Display"').join('font-family="Inter Display, Inter, Arial, sans-serif"');
const LX26 = 852, LY26 = 1010;
const spot26 = (k) => k > 0 ? '<circle cx="' + LX26 + '" cy="' + LY26 + '" r="92" fill="#02030F" opacity="' + (.55 * cl(k)).toFixed(2) + '"/>' : '';

// ---------- Formen (Modell-Koordinaten um 0/0, Krone oben, Wurzeln unten) ----------
const DENT26 = 'M-92 -50 C-104 -110 -104 -170 -72 -196 C-48 -214 -24 -176 0 -168 C24 -176 48 -214 72 -196 C104 -170 104 -110 92 -50 C96 30 92 150 74 214 C66 228 52 224 50 210 C46 120 36 50 0 22 C-36 50 -46 120 -50 210 C-52 224 -66 228 -74 214 C-92 150 -96 30 -92 -50 Z';
const ENAM26 = 'M-104 -46 C-124 -120 -122 -192 -88 -224 C-56 -250 -24 -202 0 -192 C24 -202 56 -250 88 -224 C122 -192 124 -120 104 -46 L92 -50 C104 -110 104 -170 72 -196 C48 -214 24 -176 0 -168 C-24 -176 -48 -214 -72 -196 C-104 -170 -104 -110 -92 -50 Z';
const PULP26 = 'M-48 -62 C-56 -112 -54 -142 -42 -152 C-32 -160 -22 -130 0 -126 C22 -130 32 -160 42 -152 C54 -142 56 -112 48 -62 C58 18 66 118 64 204 L56 204 C50 120 40 44 26 -18 L-26 -18 C-40 44 -50 120 -56 204 L-64 204 C-66 118 -58 18 -48 -62 Z';
const ROOT26 = 'M92 -50 C96 30 92 150 74 214 C66 228 52 224 50 210 C46 120 36 50 0 22 C-36 50 -46 120 -50 210 C-52 224 -66 228 -74 214 C-92 150 -96 30 -92 -50';
const BONE26 = 'M-140 -14 C-128 -22 -112 -30 -100 -30 L100 -30 C112 -30 128 -22 140 -14 L140 210 C140 236 120 248 96 248 L-96 248 C-120 248 -140 236 -140 210 Z';
// Punkte auf der Wurzeloberflaeche mit Richtung nach aussen (fuer Fasern)
const FIB26 = (() => { const P = []; for (let i = 0; i < 7; i++) { const q = i / 6, y = -26 + 220 * q; P.push([lerp(95, 76, q * q), y, 1], [-lerp(95, 76, q * q), y, -1]); if (q > .25) P.push([lerp(30, 50, q), y + 6, -1], [-lerp(30, 50, q), y + 6, 1]); } return P; })();
const DEF26 = '<defs><linearGradient id="gDe26" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF0C8"/><stop offset=".55" stop-color="' + ZC26.dent + '"/><stop offset="1" stop-color="#D9AE62"/></linearGradient>' +
  '<linearGradient id="gEn26" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="' + ZC26.enam + '"/><stop offset="1" stop-color="#BFD8EC"/></linearGradient>' +
  '<linearGradient id="gPu26" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB0C4"/><stop offset="1" stop-color="#E8507A"/></linearGradient>' +
  '<linearGradient id="gBo26" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFDF5"/><stop offset="1" stop-color="#E6D3AE"/></linearGradient>' +
  '<pattern id="pSp26" width="34" height="30" patternUnits="userSpaceOnUse"><path d="M4 6 q10 -6 18 4 q6 8 -4 14 q-12 4 -14 -8 Z M24 20 q6 -4 8 2 q0 6 -6 6 Z" fill="none" stroke="#C9B286" stroke-width="2.4"/></pattern>' +
  '<clipPath id="cDe26"><path d="' + DENT26 + '"/></clipPath></defs>';

// Eine Schicht zeichnen (i 0 bis 5), o: sq (Zahnmark wackelt), fl (Blut und Nerv fliessen), fib (1 = Fasern haengen lose, 0 = gespannt), t
function lay26(i, t, o) { o = o || {}; const ST = '#0B1020';
  if (i === 5) return '<path d="' + BONE26 + '" fill="url(#gBo26)" stroke="' + ST + '" stroke-width="4.5"/><path d="' + BONE26 + '" fill="url(#pSp26)" opacity=".75" transform="translate(0 8) scale(.9)"/><path d="M-140 -14 C-128 -22 -112 -30 -100 -30 L100 -30 C112 -30 128 -22 140 -14" fill="none" stroke="#E6D3AE" stroke-width="10" opacity=".9"/>';
  if (i === 4) { const f = o.fib === undefined ? 0 : o.fib; let s = '<path d="' + ROOT26 + '" fill="none" stroke="' + ZC26.pdl + '" stroke-width="30" stroke-linejoin="round" opacity="' + (1 - .55 * f).toFixed(2) + '"/>';
    if (f < 1) { s += '<path d="' + ROOT26 + '" fill="none" stroke="#C8603C" stroke-width="26" stroke-dasharray="2.5 7" opacity="' + (.6 * (1 - f)).toFixed(2) + '"/>'; FIB26.forEach(([x, y, d]) => { s += '<path d="M' + x + ' ' + y + ' l' + (d * 17) + ' ' + (-5 - (o.bob || 0) * .8).toFixed(1) + '" stroke="#9A3E1E" stroke-width="4" stroke-linecap="round" opacity="' + (1 - f).toFixed(2) + '"/>'; }); }
    if (f > 0) FIB26.forEach(([x, y, d], n) => { const w = 6 * Math.sin(t * 2.4 + n), L = 30 * f; s += '<path d="M' + x + ' ' + y + ' q' + (d * L * .6).toFixed(1) + ' ' + (4 + w).toFixed(1) + ' ' + (d * L).toFixed(1) + ' ' + (22 * f + w).toFixed(1) + '" stroke="' + ZC26.pdl + '" stroke-width="4" fill="none" stroke-linecap="round" opacity="' + f.toFixed(2) + '"/>'; });
    return s; }
  if (i === 3) return '<path d="' + ROOT26 + '" fill="none" stroke="#6A4210" stroke-width="22" stroke-linejoin="round"/><path d="' + ROOT26 + '" fill="none" stroke="' + ZC26.cem + '" stroke-width="15" stroke-linejoin="round"/>';
  if (i === 1) { let s = '<path d="' + DENT26 + '" fill="url(#gDe26)"/><g clip-path="url(#cDe26)" opacity=".35">';
    for (let k = 0; k < 22; k++) { const a = -2.6 + 2.2 * k / 21, x0 = 52 * Math.cos(a), y0 = -110 + 52 * Math.sin(a); s += '<path d="M' + x0.toFixed(0) + ' ' + y0.toFixed(0) + ' q' + (40 * Math.cos(a) + 8).toFixed(0) + ' ' + (40 * Math.sin(a)).toFixed(0) + ' ' + (70 * Math.cos(a)).toFixed(0) + ' ' + (70 * Math.sin(a)).toFixed(0) + '" stroke="#A9802F" stroke-width="2" fill="none"/>'; }
    for (let k = 0; k < 9; k++) { const y = -20 + k * 26; s += '<path d="M-96 ' + y + ' h24 M72 ' + y + ' h24 M-48 ' + (y + 10) + ' h14 M34 ' + (y + 10) + ' h14" stroke="#A9802F" stroke-width="2"/>'; }
    return s + '</g><path d="' + DENT26 + '" fill="none" stroke="' + ST + '" stroke-width="4.5"/>'; }
  if (i === 2) return '<path d="' + ENAM26 + '" fill="url(#gEn26)" stroke="' + ST + '" stroke-width="4.5" stroke-linejoin="round"/><path d="M-96 -150 C-98 -186 -86 -210 -70 -220" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".9"/><path d="M30 -196 C42 -210 56 -214 66 -212" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>';
  if (i === 0) { const sq = o.sq || 0, k = 1 + .06 * sq * Math.sin(t * 9), ky = 1 - .04 * sq * Math.sin(t * 9);
    let s = '<g transform="translate(0 -60) scale(' + k.toFixed(3) + ' ' + ky.toFixed(3) + ') translate(0 60)"><path d="' + PULP26 + '" fill="url(#gPu26)" stroke="' + ST + '" stroke-width="4"/>';
    s += '<path d="M-58 226 L-58 200 C-54 110 -46 30 -26 -40 C-14 -80 -30 -110 -36 -136 M58 226 L58 200 C54 110 46 30 26 -40 C14 -80 30 -110 36 -136" stroke="' + ZC26.ves + '" stroke-width="6" fill="none" stroke-linecap="round"/>';
    s += '<path d="M-62 226 L-62 200 C-58 110 -50 30 -34 -40 C-24 -90 -40 -116 -42 -140 M62 226 L62 200 C58 110 50 30 34 -40 C24 -90 40 -116 42 -140" stroke="' + ZC26.nerv + '" stroke-width="3.5" fill="none" stroke-linecap="round" transform="translate(6 0)"/>';
    if (o.fl) for (let n = 0; n < 6; n++) { const q = (t * .5 + n / 6) % 1, sd = n % 2 ? 1 : -1, y = lerp(200, -120, q), x = sd * lerp(58, 30, cl((200 - y) / 260)); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="6" fill="#FFE0E6" opacity="' + (Math.sin(Math.PI * q) * o.fl).toFixed(2) + '"/>'; }
    return s + '</g>'; }
  return ''; }

// ganzes Modell. l = sechs Werte 0 bis 1 (Einblenden je Schicht), bob = Federn nach unten in px
function zahn26(t, o) { o = o || {}; const l = o.l || [1, 1, 1, 1, 1, 1], z = o.z || ZZ26, cy = (o.cy || ZY26) + 2 * Math.sin(t * 1.3), bob = o.bob || 0;
  let s = '<g transform="translate(' + ZX26 + ' ' + cy.toFixed(1) + ') scale(' + z + ')">' + DEF26;
  if (l[5] > 0) s += '<g opacity="' + cl(l[5] * 1.5).toFixed(2) + '" transform="translate(0 ' + (90 * (1 - ease(l[5]))).toFixed(1) + ')">' + lay26(5, t, o) + '</g>';
  s += '<g transform="translate(0 ' + bob.toFixed(1) + ')">';
  if (l[4] > 0) s += '<g opacity="' + cl(l[4]).toFixed(2) + '">' + lay26(4, t, o) + '</g>';
  if (l[3] > 0) s += '<g style="stroke-dasharray:1 0" opacity="1"><g opacity="' + cl(l[3] * 2).toFixed(2) + '" clip-path="url(#cCe26)">' + lay26(3, t, o) + '</g></g><defs><clipPath id="cCe26"><rect x="-130" y="-60" width="260" height="' + (300 * ease(l[3])).toFixed(0) + '"/></clipPath></defs>';
  if (l[1] > 0) s += '<g opacity="' + cl(l[1] * 1.4).toFixed(2) + '" transform="translate(0 -60) scale(' + lerp(.8, 1, ease(l[1])).toFixed(3) + ') translate(0 60)">' + lay26(1, t, o) + '</g>';
  if (l[2] > 0) s += '<g opacity="' + cl(l[2] * 1.4).toFixed(2) + '" transform="translate(0 ' + (-90 * (1 - ease(l[2]))).toFixed(1) + ')">' + lay26(2, t, o) + '</g>';
  if (l[0] > 0) s += '<g opacity="' + cl(l[0] * 1.5).toFixed(2) + '">' + lay26(0, t, o) + '</g>';
  return s + '</g></g>'; }

// Lupen: Dentinkanaelchen und Schmelzprismen
const lupDe26 = (t) => { let s = '<circle r="56" fill="' + ZC26.dent + '"/>'; for (let i = -3; i <= 3; i++) s += '<path d="M' + (i * 15 - 6) + ' -54 C' + (i * 15 + 10) + ' -20 ' + (i * 15 - 10) + ' 20 ' + (i * 15 + 6) + ' 54" stroke="#8A6424" stroke-width="5" fill="none"/>'; return s + '<circle r="56" fill="none" stroke="#0B1020" stroke-width="3"/>'; };
const lupEn26 = () => { let s = '<circle r="56" fill="' + ZC26.enam + '"/>'; for (let r = -3; r <= 3; r++) for (let c = -3; c <= 3; c++) { const x = c * 18 + (r % 2 ? 9 : 0), y = r * 16; if (x * x + y * y < 2700) s += '<path d="M' + (x - 7) + ' ' + (y + 6) + ' a8 8 0 1 1 14 0 l-3 6 h-8 Z" fill="#D4E8F6" stroke="#7FA6C4" stroke-width="2"/>'; } return s + '<circle r="56" fill="none" stroke="#0B1020" stroke-width="3"/>'; };

// ---------- Einstieg: fertiger Zahn, im Gag fallen Knochen, Wurzelhaut, Zement, Schmelz und Zahnbein ab, uebrig bleibt das Mark ----------
const FLY26 = [[5, 0, 900], [4, .1, 420], [3, .2, 820], [2, .3, 460], [1, .4, 760]];
WORLD.h26zahn = function (sc, ev, t, lt) { const e = gag26(sc, t), l = [1, 1, 1, 1, 1, 1]; let fly = '';
  if (e !== undefined) FLY26.forEach(([i, t0, lx], n) => { const k = cl((e - t0) / .5); if (k > 0) l[i] = 0; if (k <= 0) return;
    const x = lerp(ZX26, lx, k), y = lerp(ZY26, 1492, k * k) - 230 * Math.sin(Math.PI * k) * (1 - k * .3), rot = (n % 2 ? -1 : 1) * 14 * ease(k);
    fly += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(0) + ') scale(.3)">' + DEF26 + lay26(i, t, { fib: 0 }) + '</g>'; });
  const gone = e === undefined ? 6 : 1 + FLY26.filter(([i, t0]) => e < t0).length;
  let s = laborS(t, { rows: ROWS26, on: gone, cur: 0, cx: ZX26, note: NOTE26, w: 360, fs: 29 });
  s += zahn26(t, { l: l });
  s += fly;
  return W(ff26(s + shadeS())); };
WMASC.h26zahn = (ev, t, lt, sc) => { const e = gag26(sc, t);
  if (e === undefined) return BIG3();
  const x = e < .45 ? lerp(220, 196, ease(cl(e / .35))) : e < 1.6 ? 196 : lerp(196, 220, ease(cl((e - 1.6) / .5)));
  return stay3([x, 1537 - (e > .9 && e < 1.25 ? 30 * Math.sin(Math.PI * (e - .9) / .35) : 0)], 1, { r: e < .45 ? -12 : e < 1.6 ? -14 : 6 * cl(1 - (e - 1.6) / .6), nospin: 1 }); };

// ---------- Teil 1: Schicht 1 Zahnmark, Schicht 2 Zahnbein ----------
WORLD.b26a = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, pu = cl((lt - .2) / .8), de = p2 === undefined ? 0 : cl((p2 - 1.4) / .9);
  let s = laborS(t, { rows: ROWS26, on: pu + de, cur: p2 !== undefined ? 2 : 1, cx: ZX26, note: NOTE26, w: 360, fs: 29 });
  s += zahn26(t, { l: [pu, de, 0, 0, 0, 0], fl: p1 !== undefined && p2 === undefined ? cl(p1 / .5) : 0, sq: p1 !== undefined && p2 === undefined && p1 > 2.6 ? 1 : 0 });
  if (p !== undefined && p1 === undefined) s += QL26(40, -120, 760, 'Zahnmark', 'Pulpa dentis', (p - .9) / .35);
  if (p1 !== undefined && p2 === undefined) s += QL26(-56, 120, 1000, 'Blutgefäße', 'Vasa sanguinea', p1 / .35) + QL26(66, 60, 860, 'Nerven', 'Nervi', (p1 - 1.2) / .35);
  if (p2 !== undefined) s += ring26(0, -60, 100, (p2 - 1.4) / .8) + QL26(80, -110, 760, 'Zahnbein', 'Dentinum', (p2 - 1.9) / .35);
  if (a !== undefined) s += spot26(a / .35) + mark26(t, 76, -100, 26) + lupeS(lupDe26(t), a / .35, PX26(76), PY26(-100), LX26, LY26);
  return W(ff26(s + shadeS()), slot(ev, [['panel', 'Schicht 1: Zahnmark'], ['p1', 'Versorgt den Zahn', 'hot'], ['p2', 'Schicht 2: Zahnbein'], ['act', 'Härter als Knochen', 'hot']], 596)); };
WMASC.b26a = (ev, t) => { const p1 = ev.p1; if (p1 !== undefined && ev.p2 === undefined && p1 > 2.6) { const w = Math.sin(t * 9) * cl((p1 - 2.6) / .3); return stay3([220, 1537], 1, { r: 5 * w, nospin: 1 }); } return BIG3(); };

// ---------- Teil 2: Schicht 3 Zahnschmelz, Schicht 4 Zahnzement ----------
WORLD.b26b = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, en = cl((lt - .3) / .9), ce = p2 === undefined ? 0 : cl((p2 - 1.0) / 1.2);
  let s = laborS(t, { rows: ROWS26, on: 2 + en + ce, cur: p2 !== undefined ? 4 : 3, cx: ZX26, note: NOTE26, w: 360, fs: 29 });
  s += zahn26(t, { l: [1, 1, en, ce, 0, 0] });
  if (p !== undefined && p1 === undefined) s += QL26(70, -200, 740, 'Zahnschmelz', 'Enamelum', (p - 1.2) / .35) + spot26((p - 2.2) / .35) + mark26(t, 96, -170, 26) + lupeS(lupEn26(), (p - 2.2) / .35, PX26(96), PY26(-170), LX26, LY26);
  if (p1 !== undefined && p2 === undefined) for (let n = 0; n < 6; n++) { const sd = n % 2 ? 1 : -1, q = ((p1 * .45 + n * .17) % 1), y0 = -10 + Math.floor(n / 2) * 60, x = PX26(sd * (94 + 26 * q * q)), y = PY26(y0) + 150 * q * q;
    s += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' q' + (sd * 18) + ' 6 ' + (sd * 36) + ' 26" stroke="' + ZC26.pdl + '" stroke-width="7" fill="none" stroke-linecap="round" opacity="' + (1 - q * q).toFixed(2) + '"/><path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' q' + (sd * 18) + ' 6 ' + (sd * 36) + ' 26" stroke="#0B1020" stroke-width="2" fill="none" opacity="' + (.5 * (1 - q * q)).toFixed(2) + '"/>'; }
  if (p2 !== undefined) s += QL26(94, 60, 940, 'Zahnzement', 'Cementum', (p2 - 1.6) / .35);
  if (a !== undefined) for (let n = 0; n < 6; n++) { const d = n % 2 ? 1 : -1, y = 10 + Math.floor(n / 2) * 70, k = cl((a - .4 - n * .15) / .4); if (k > 0) s += '<path d="M' + PX26(d * 92).toFixed(0) + ' ' + PY26(y).toFixed(0) + ' l' + (d * 16 * k).toFixed(0) + ' 4" stroke="' + ZC26.pdl + '" stroke-width="5" stroke-linecap="round"/><circle cx="' + PX26(d * 92).toFixed(0) + '" cy="' + PY26(y).toFixed(0) + '" r="' + (6 + 8 * (1 - k)).toFixed(0) + '" fill="none" stroke="' + TH().hl + '" stroke-width="3" opacity="' + (1 - k * .6).toFixed(2) + '"/>'; }
  return W(ff26(s + shadeS()), slot(ev, [['panel', 'Schicht 3: Zahnschmelz'], ['p1', 'Wurzel ohne Halt', 'hot'], ['p2', 'Schicht 4: Zahnzement'], ['act', 'Anker für die Fasern', 'hot']], 596)); };
WMASC.b26b = (ev, t) => BIG3();

// ---------- Teil 3: Schicht 5 Wurzelhaut, Schicht 6 Kieferknochen ----------
WORLD.b26c = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, pd = cl((lt - .3) / .9), bo = p2 === undefined ? 0 : cl((p2 - 1.0) / 1.0), fib = p2 === undefined ? 1 : 1 - cl((p2 - 1.6) / .8);
  let s = laborS(t, { rows: ROWS26, on: 4 + pd + bo, cur: p2 !== undefined ? 6 : 5, cx: ZX26, note: NOTE26, w: 360, fs: 29 });
  const bob = a !== undefined && a > 1.4 ? 12 * Math.max(0, Math.sin(Math.PI * ((a - 1.4) % 1.2) / 1.2 * 2)) : 0;
  s += zahn26(t, { l: [1, 1, 1, 1, pd, bo], fib: fib, bob: bob });
  if (p !== undefined && p1 === undefined) s += QL26(100, 40, 900, 'Wurzelhaut', 'Desmodontium', (p - 1.2) / .35);
  if (p1 !== undefined && p2 === undefined) s += mark26(t, 110, 90, 44) + mark26(t, -110, 90, 44);
  if (p2 !== undefined) s += ring26(0, 60, 90, (p2 - 1.0) / .8) + QL26(116, 110, 1020, 'Zahnfach', 'Alveola dentalis', (p2 - 1.6) / .35);
  if (a !== undefined && a > 1.4) s += '<path d="M' + PX26(0) + ' ' + (PY26(-262) - 20) + ' v' + (26 + bob * 2).toFixed(0) + '" stroke="' + TH().hl + '" stroke-width="7" stroke-linecap="round"/><path d="M' + (PX26(0) - 12) + ' ' + (PY26(-262) + 2 + bob * 2).toFixed(0) + ' l12 12 l12 -12" stroke="' + TH().hl + '" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  return W(ff26(s + shadeS()), slot(ev, [['panel', 'Schicht 5: Wurzelhaut'], ['p1', 'Fasern ohne Halt', 'hot'], ['p2', 'Schicht 6: Kieferknochen'], ['act', 'Fest und federnd', 'hot']], 596)); };
WMASC.b26c = (ev, t) => { const a = ev.act; if (a !== undefined && a > 1.4 && a < 4) { const j = Math.max(0, Math.sin(Math.PI * ((a - 1.4) % 1.2) / 1.2 * 2)); return stay3([220, 1537 - 14 * j], 1, { r: 0, nospin: 1 }); } return BIG3(); };

// ---------- Schluss ----------
WORLD.b26out = function (sc, ev, t, lt) { const c1 = ev.c1, c2 = ev.c2, c3 = ev.c3, sv = ev.save, k = sv === undefined ? 0 : ease(cl(sv / .5)), z = ZZ26 * lerp(1, .58, k), y = ZY26 + 240 * ZZ26 - 240 * z;
  const cur = sv !== undefined ? 0 : c3 !== undefined ? 6 : c2 !== undefined ? 4 : c1 !== undefined ? 2 : 0;
  let s = laborS(t, { rows: ROWS26, on: 6, cur: 0, noList: sv !== undefined, cx: ZX26, note: sv === undefined ? NOTE26 : '', w: 360, fs: 29 });
  s += zahn26(t, { l: [1, 1, 1, 1, 1, 1], z: z, cy: y, fib: 0 });
  if (cur) for (const r of [cur - 1, cur]) s += '<rect x="50" y="' + (782 + (r - 1) * 45 - 31) + '" width="340" height="41" rx="9" fill="#A8E63C" opacity=".22"/>';
  return W(ff26(s + '<rect width="1080" height="1920" fill="#02030F" opacity=".3"/>' + shadeS())); };
['h26zahn', 'b26a', 'b26b', 'b26c', 'b26out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
