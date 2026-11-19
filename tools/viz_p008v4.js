// P008 "Warum ist dein Akku bei Kaelte leer?" im Skript 4 (19.11.2026).
// Ort: Winternacht mit Bergen, Polarlicht und Huette aus viz_c005v3.js (wsky5_3, wsnow5_3). Das Handy steht gross im Schnee.
// Wissenschaftsmodus (Ort dunkel eingefaerbt, Rasterpunkte) nur fuer das Innere des Akkus und die Spannung: Teil 1 ab "Schau in den Akku" bis Ende Teil 2.
// Teil 3 (aufwaermen, Innentasche, erst warm laden) normal am Ort mit Schalti. Zum Loeschen: diese Datei und videos/P008V4.
const PX8 = 660, PY8 = 960;
function bg8(sc, t, lt) { return fuse33(wsky5_3(t) + wsnow5_3(t, .55), sc, t, lt); }
// Handy: pct Anzeige, on 0..1 Bildschirm an, frost 0..1 Reif, warm 0..1 Waermeschein
function ph8(x, y, s, pct, on, frost, warm, t) { let g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
  if (warm > 0) g += '<circle r="260" fill="#FF8A4D" opacity="' + (.18 * warm) + '"/><circle r="170" fill="#FFB86B" opacity="' + (.16 * warm) + '"/>';
  g += phoneF(-100, -180, 200, 360, lc('#05070F', '#1B2748', on));
  if (on > .05) { const col = pct <= 10 ? '#FF4D4D' : pct <= 20 ? '#FFD23F' : '#3DFF7A'; g += '<g opacity="' + on.toFixed(2) + '">' + batt(-58, -60, 104, 50, pct / 100, col) + svgT(0, 60, Math.round(pct) + ' %', 50, '#F4F6FB') + '</g>'; }
  if (frost > 0) { g += '<rect x="-100" y="-180" width="200" height="360" rx="32" fill="#DFF4FF" opacity="' + (.22 * frost) + '"/>';
    for (let i = 0; i < 14; i++) { const a = rnd(i + 40) * Math.PI * 2, r = 70 + 90 * rnd(i + 60), px = Math.max(-92, Math.min(92, Math.cos(a) * r * 1.1)), py = Math.max(-172, Math.min(172, Math.sin(a) * r * 1.9)), k = cl(frost * 1.4 - rnd(i + 80) * .4);
      if (k > 0) g += '<g transform="translate(' + px.toFixed(0) + ' ' + py.toFixed(0) + ') scale(' + (k * (.5 + .5 * rnd(i + 90))).toFixed(2) + ')">' + [0, 60, 120].map(r2 => '<path d="M0 -22 V22" transform="rotate(' + r2 + ')" stroke="#F4FBFF" stroke-width="5" stroke-linecap="round"/>').join('') + '</g>'; } }
  return g + '</g>'; }
const L8 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3;
// Eisblock um Schalti (liegt hinter ihm, ragt um ihn herum hinaus und hat Eiszapfen oben)
function ice8(k, t) { if (k <= 0) return ''; const s = back(cl(k)); return '<g transform="translate(220 1540) scale(' + s + ') translate(-220 -1540)"><rect x="70" y="1250" width="300" height="300" rx="26" fill="#BFE6FF" opacity=".42" stroke="#F4FBFF" stroke-width="7"/><path d="M100 1290 l40 -20 M300 1300 l30 30 M120 1480 l50 30" stroke="#fff" stroke-width="6" opacity=".7"/>' + [95, 160, 250, 330].map((x, i) => '<path d="M' + x + ' 1252 l12 ' + (34 + 14 * (i % 2)) + ' l12 ' + (-34 - 14 * (i % 2)) + ' Z" fill="#DFF4FF"/>').join('') + '</g>'; }

// ---------- Einstieg ----------
WORLD.h7p8_4 = function (sc, ev, t, lt) { const fr = ev.frost, a = ev.aus, hit = a !== undefined ? a - .5 : undefined, sh = shake7(hit !== undefined && hit >= 0 ? hit : undefined, t);
  const frost = fr === undefined ? 0 : cl(fr / 2.6), pct = fr === undefined ? 40 : Math.max(12, 40 - 10 * cl(fr / 2.6)), on = hit === undefined || hit < 0 ? 1 : Math.max(0, 1 - hit / .12);
  let s = bg8(sc, t, lt) + ph8(PX8, PY8 + 6 * Math.sin(t * 1.2) * (fr === undefined ? 1 : 0), back(cl((lt - .1) / .5)), pct, on, frost, 0, t);
  if (hit !== undefined && hit >= 0) { const k = cl(hit / .5); s += '<circle cx="' + PX8 + '" cy="' + PY8 + '" r="' + (60 + 520 * k) + '" fill="none" stroke="#DFF4FF" stroke-width="' + (30 * (1 - k)) + '" opacity="' + (1 - k) + '"/>' + ice8(cl((hit - .15) / .35), t); }
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + shade3()); };
WMASC.h7p8_4 = (ev, t) => { const a = ev.aus; if (a !== undefined && a >= .5) return { f: [220, 1537], s: 1, r: 3 * Math.sin(t * 38), nospin: 1, mood: 'shock' };
  if (ev.frost !== undefined) return { f: [240, 1537], s: 1, r: 8 + 2 * Math.sin(t * 3), nospin: 1 }; return { f: HOME3, s: 1, r: 2 * Math.sin(t * 3), nospin: 1 }; };

// ---------- Teil 1: Die Energie ist noch da. Ab "Schau in den Akku" Wissenschaftsmodus: Ionen in der Fluessigkeit, Kaelte macht sie zaeh ----------
const BX0 = 110, BX1 = 900, BY0 = 720, BY1 = 1110;
function cell8(t, lt, ev, sc) { const z = ev.zaeh, a = ev.act, honey = z === undefined ? 0 : cl(z / 1.2), slow = 1 - .82 * honey, on = ease(cl(((ev.innen || 0)) / .5));
  let s = '<g opacity="' + on.toFixed(2) + '"><rect x="' + BX0 + '" y="' + BY0 + '" width="' + (BX1 - BX0) + '" height="' + (BY1 - BY0) + '" rx="36" fill="#0D1B3A" stroke="#F4F6FB" stroke-width="8"/><rect x="' + BX1 + '" y="860" width="30" height="110" rx="10" fill="#F4F6FB"/>';
  s += '<rect x="' + (BX0 + 210) + '" y="' + (BY0 + 20) + '" width="' + (BX1 - BX0 - 420) + '" height="' + (BY1 - BY0 - 40) + '" rx="18" fill="' + lc('#1E5A8C', '#E8A23A', honey) + '" opacity="' + (.45 + .25 * honey) + '"/>';
  for (let i = 0; i < 6; i++) s += '<rect x="' + (BX0 + 40) + '" y="' + (BY0 + 40 + i * 54) + '" width="150" height="30" rx="8" fill="#4A5A7A"/>';
  for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) s += '<circle cx="' + (BX1 - 170 + c * 50) + '" cy="' + (BY0 + 55 + r * 56) + '" r="15" fill="#8A3B5A"/>';
  s += svgT(BX0 + 115, BY1 - 18, 'Minus', 28, '#AEB9D6') + svgT(BX1 - 120, BY1 - 18, 'Plus', 28, '#AEB9D6') + svgT((BX0 + BX1) / 2, BY0 + 52, honey > .5 ? 'zäh wie Honig' : 'Flüssigkeit', 30, honey > .5 ? '#FFD27A' : '#B8F3FF');
  const N = 9; for (let i = 0; i < N; i++) { const sp = (.32 + .1 * rnd(i + 5)) * slow, c = (t * sp + rnd(i + 11)) % 1, x = lerp(BX0 + 230, BX1 - 230, c), y = BY0 + 90 + (i * 37) % (BY1 - BY0 - 180) + 14 * Math.sin(t * 2 * slow + i);
    s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="17" fill="#FFD23F" stroke="#0B1020" stroke-width="4"/><text x="' + x.toFixed(0) + '" y="' + (y + 8).toFixed(0) + '" text-anchor="middle" font-size="22" font-weight="900" fill="#0B1020" font-family="Inter Display">+</text>'; }
  if (honey > 0) for (let i = 0; i < 6; i++) { const x = BX0 + 260 + i * 70, y0 = BY0 + 20; s += '<path d="M' + x + ' ' + y0 + ' q8 ' + (40 * honey) + ' 0 ' + (60 * honey + 10 * Math.sin(t + i)) + '" stroke="#FFD27A" stroke-width="12" stroke-linecap="round" fill="none" opacity="' + (.7 * honey) + '"/>'; }
  if (a !== undefined) s += chip3((BX0 + BX1) / 2, BY1 + 2, 'nur noch wenige Ionen kommen an', 28, '#FFD27A', '#0B1020', (a - .3) / .3);
  return s + '</g>'; }
WORLD.p8energie_4 = function (sc, ev, t, lt) { const v = ev.voll, inn = ev.innen; let s = bg8(sc, t, lt);
  const kP = inn === undefined ? 1 : 1 - cl(inn / .45);
  if (kP > 0) s += '<g opacity="' + kP.toFixed(2) + '">' + ph8(PX8, PY8, 1, 40, 0, .8, 0, t) + (v !== undefined ? '<g opacity="' + cl((v - .3) / .4) + '">' + batt(PX8 - 70, PY8 - 30, 120, 60, .4, '#3DFF7A') + '</g>' + chip3(330, 900, 'Ladung: noch 40 % drin', 30, '#3DFF7A', '#0B1020', (v - .8) / .3) : '') + '</g>';
  if (inn !== undefined) s += cell8(t, lt, ev, sc);
  return W(s + shade3(), slot(ev, [['voll', 'Die Energie ist nicht weg'], ['innen', 'Ionen wandern durch Flüssigkeit'], ['zaeh', 'Kälte: zäh wie Honig', 'hot'], ['act', 'Die Ionen kommen kaum durch', 'hot']])); };
// Schalti springt in den Honig und bleibt kleben
WMASC.p8energie_4 = (ev, t, lt, sc) => { const a = ev.act; if (a === undefined) return BIG3(); const D = Math.max(2.4, L8(sc, 3)), P = [520, 1020];
  if (a < .6) { const k = ease(a / .6); return { f: [lerp(220, P[0], k), lerp(1537, P[1], k) - 180 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), nospin: 1 }; }
  if (a < D - .6) return { f: [P[0] + 4 * Math.sin(t * 9), P[1]], s: .5, r: 6 * Math.sin(t * 5), nospin: 1, mood: 'shock' };
  const k = ease(cl((a - (D - .6)) / .55)); return k >= 1 ? BIG3() : { f: [lerp(P[0], 220, k), lerp(P[1], 1537, k) - 150 * Math.sin(Math.PI * k)], s: lerp(.5, 1, k), flip: true, nospin: 1 }; };

// ---------- Teil 2: Spannung bricht ein, Schutzelektronik schaltet ab (weiter im Wissenschaftsmodus) ----------
function gauge8(x, y, v, t) { const a = -150 + 120 * cl(v), r = 150; let s = '<g transform="translate(' + x + ' ' + y + ')"><path d="M' + (-r) + ' 0 A' + r + ' ' + r + ' 0 0 1 ' + r + ' 0" fill="none" stroke="#1E2A50" stroke-width="34"/>';
  s += '<path d="M' + (-r) + ' 0 A' + r + ' ' + r + ' 0 0 1 ' + (r * Math.cos(-150 * Math.PI / 180 + Math.PI / 3 * 0)) + ' 0" fill="none"/>';
  s += '<path d="M' + (-r) + ' 0 A' + r + ' ' + r + ' 0 0 1 ' + (-r * .5) + ' ' + (-r * .866) + '" fill="none" stroke="#FF4D4D" stroke-width="34"/><path d="M' + (-r * .5) + ' ' + (-r * .866) + ' A' + r + ' ' + r + ' 0 0 1 ' + r + ' 0" fill="none" stroke="#3DFF7A" stroke-width="34" opacity=".8"/>';
  const rad = (a - 30) * Math.PI / 180; s += '<path d="M0 0 L' + (r * .9 * Math.cos(rad)).toFixed(1) + ' ' + (r * .9 * Math.sin(rad)).toFixed(1) + '" stroke="#F4F6FB" stroke-width="10" stroke-linecap="round"/><circle r="16" fill="#F4F6FB"/>' + svgT(0, 60, 'Spannung', 30, '#F4F6FB');
  return s + '</g>'; }
WORLD.p8spannung_4 = function (sc, ev, t, lt) { const la = ev.last, sch = ev.schutz, au = ev.aus2, a = ev.act; let s = bg8(sc, t, lt);
  const drop = la === undefined ? 0 : ease(cl((la - .8) / .8)), v = 1 - .85 * drop + .02 * Math.sin(t * 9) * (1 - drop);
  s += gauge8(330, 980, v, t);
  const on = au === undefined ? 1 : Math.max(0, 1 - au / .2), pct = a === undefined ? 40 : Math.max(0, 40 - 40 * cl(a / .5));
  s += ph8(760, 900, .62, a === undefined ? 40 : pct, a === undefined ? on : 1, 0, 0, t);
  if (la !== undefined && au === undefined) for (let i = 0; i < 3; i++) s += bolt(560 + 50 * i, 880 + 20 * Math.sin(t * 8 + i), .8, '#FFE14D', .5 + .5 * Math.sin(t * 12 + i));
  if (sch !== undefined) { const k = back(cl(sch / .35)); s += '<g transform="translate(590 950) scale(' + k + ')"><path d="M0 -60 L52 -40 V8 Q52 50 0 72 Q-52 50 -52 8 V-40 Z" fill="#2B62C0" stroke="#F4F6FB" stroke-width="6"/><text y="20" text-anchor="middle" font-size="54" font-weight="900" fill="#F4F6FB" font-family="Inter Display">?</text></g>' + chip3(590, 1060, 'Schutzelektronik', 24, '#7FD3FF', '#0B1020', (sch - .3) / .3); }
  if (au !== undefined && a === undefined) s += chip3(760, 750, 'Ladung noch drin', 28, '#3DFF7A', '#0B1020', (au - .4) / .3);
  return W(s + shade3(), slot(ev, [['last', 'Viel Strom: Spannung bricht ein'], ['schutz', 'Schutzelektronik: Akku leer?'], ['aus2', 'Sie schaltet ab', 'hot'], ['act', 'Anzeige springt auf null', 'red']])); };
WMASC.p8spannung_4 = (ev, t) => ev.act !== undefined && ev.act < 1.2 ? { f: [220, 1537 - 60 * Math.sin(Math.PI * cl(ev.act / .5))], s: 1, nospin: 1, mood: 'shock' } : BIG3();

// ---------- Teil 3: Wieder warm, ab in die Innentasche, erst warm laden (normaler Modus am Ort mit Schalti) ----------
const POCK8 = [258, 1405];
WORLD.p8waerme_4 = function (sc, ev, t, lt) { const w = ev.warm, ta = ev.tasche, ko = ev.koerper, a = ev.act; let s = bg8(sc, t, lt);
  const wk = w === undefined ? 0 : cl(w / 1.6), pct = w === undefined ? 0 : Math.min(40, 40 * cl((w - .6) / 1.4));
  if (ta === undefined) s += ph8(PX8, PY8, 1, pct, w === undefined ? 0 : cl((w - .5) / .3), 1 - wk, wk, t);
  else { const k = ease(cl(ta / .9)), x = lerp(PX8, POCK8[0], k), y = lerp(PY8, POCK8[1], k), sc2 = lerp(1, .22, k); if (k < 1) s += ph8(x, y, sc2, 40, 1, 0, 1 - k, t);
    s += '<circle cx="' + POCK8[0] + '" cy="' + POCK8[1] + '" r="' + (150 + 10 * Math.sin(t * 3)) + '" fill="#FF8A4D" opacity="' + (.16 * cl(ta / .9)) + '"/>';
    if (ko !== undefined) s += chip3(470, 860, 'Körperwärme hält den Akku warm', 28, '#FFB86B', '#0B1020', (ko - .3) / .3) + ph8(850, 1000, .45, 40, 1, 0, .6, t); }
  if (a !== undefined) { const k = cl(a / .4); s += '<g opacity="' + k + '"><g transform="translate(380 990)">' + flake5b_3(0, 0, 1.4, t * 20) + '<path d="M40 0 h90" stroke="#F4F6FB" stroke-width="10"/><rect x="130" y="-22" width="44" height="44" rx="8" fill="#F4F6FB"/></g>' + okx1(640, 990, 42, false, (a - .3) / .3) + '</g>' + chip3(480, 1085, 'erst aufwärmen, dann laden', 28, '#3DFF7A', '#0B1020', (a - 1) / .3); }
  return W(s + shade3(), slot(ev, [['warm', 'Wieder warm: Ladung ist zurück'], ['tasche', 'Ab in die Innentasche', 'hot'], ['koerper', 'Körperwärme hält ihn warm'], ['act', 'Eiskalt? Erst aufwärmen, dann laden', 'red']])); };
// Schalti waermt das Handy an, dann steckt er es ein
WMASC.p8waerme_4 = (ev, t, lt, sc) => { const w = ev.warm, ta = ev.tasche;
  if (ta !== undefined) { const k = ease(cl(ta / .5)); return { f: [lerp(500, 220, k), 1537], s: 1, flip: k < 1, walk: k < 1, nospin: 1, mood: 'happy' }; }
  if (w !== undefined) { const k = ease(cl(w / .6)); return { f: [lerp(220, 500, k), 1537 - 8 * Math.abs(Math.sin(t * 16)) * (k < 1 ? 1 : 0)], s: 1, r: k < 1 ? 8 : 3 * Math.sin(t * 2), walk: k < 1, nospin: 1, mood: 'happy' }; }
  return BIG3(); };

// ---------- Schluss ----------
WORLD.p8outro_4 = function (sc, ev, t, lt) { return W(bg8(sc, t, lt) + ph8(PX8, PY8, 1, 40, 1, 0, .5, t) + shade3()); };
['h7p8_4', 'p8energie_4', 'p8spannung_4', 'p8waerme_4', 'p8outro_4'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#5CE1FF'); });
