// Informatik I001 "Wie denkt ChatGPT eigentlich?" (Bauplan wie I006). Etikett y=600, Grafik y=700 bis 1130. Nutzt Helfer aus viz_i006.js.

// ---------- Helfer ----------
const ww1 = (txt, sz) => txt.length * sz * .6 + 34;
function wc1(x, y, txt, sz, fill, col, k, rot) { if (k <= 0) return ''; const w = ww1(txt, sz); return '<g transform="translate(' + (x + w / 2) + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + back(cl(k)) + ')"><rect x="' + (-w / 2) + '" y="' + (-sz * .72) + '" width="' + w + '" height="' + (sz * 1.44) + '" rx="' + (sz * .35) + '" fill="' + fill + '" stroke="#0B1020" stroke-width="5"/>' + svgT(0, sz * .35, txt, sz, col) + '</g>'; }
function blank1(x, y, w, sz, t) { return '<rect x="' + x + '" y="' + (y - sz * .72) + '" width="' + w + '" height="' + (sz * 1.44) + '" rx="' + (sz * .35) + '" fill="rgba(124,92,255,.18)" stroke="#B9A6FF" stroke-width="5" stroke-dasharray="14 10" stroke-dashoffset="' + (t * 30) + '"/>' + svgT(x + w / 2, y + sz * .35, '?', sz, '#B9A6FF'); }
function page1(x, y, s, rot, op) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')" opacity="' + (op === undefined ? 1 : op) + '"><rect x="-34" y="-44" width="68" height="88" rx="8" fill="#F4F6FB" stroke="#0B1020" stroke-width="4"/><path d="M-20 -22 H20 M-20 -6 H20 M-20 10 H20 M-20 26 H6" stroke="#AEB9D6" stroke-width="6" stroke-linecap="round"/></g>'; }
function plane1(x, y, s, rot, flat) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')">' + (flat ? '<path d="M-40 10 L-10 -22 L8 -2 L36 -16 L22 14 L-6 6 Z" fill="#DDE2EE" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/>' : '<path d="M-60 -24 L64 0 L-60 24 L-38 0 Z" fill="#F4F6FB" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M-38 0 L64 0" stroke="#AEB9D6" stroke-width="4"/>') + '</g>'; }
function okx1(x, y, r, ok, k) { return k <= 0 ? '' : '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)) + ')"><circle r="' + r + '" fill="' + (ok ? '#3DFF7A' : '#FF4D4D') + '" stroke="#0B1020" stroke-width="5"/>' + (ok ? '<path d="M' + (-r * .45) + ' 0 L' + (-r * .1) + ' ' + (r * .38) + ' L' + (r * .5) + ' ' + (-r * .35) + '" stroke="#0B1020" stroke-width="' + (r * .22) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' : '<path d="M' + (-r * .38) + ' ' + (-r * .38) + ' L' + (r * .38) + ' ' + (r * .38) + ' M' + (r * .38) + ' ' + (-r * .38) + ' L' + (-r * .38) + ' ' + (r * .38) + '" stroke="#fff" stroke-width="' + (r * .22) + '" stroke-linecap="round"/>') + '</g>'; }

// Gag Teil 1 (Abwurf): Eine Wortkarte rutscht heran, haut Schalti die Fuesse weg und nimmt ihn huckepack zurueck
function i1trip(q, D, t) { const u = cl(q / Math.max(2.4, D - .1)), HX = 220, HY = 1537, X1 = 520;
  if (u < .28) { const x = lerp(HX, X1, u / .28); return { m: { f: [x, HY], s: 1, walk: true, r: -3 }, e: [1250, 1552] }; }
  if (u < .46) { const c = (u - .28) / .18; return { m: { f: [X1, HY], s: 1, r: 5 * Math.sin(t * 20) * c }, e: [lerp(1250, X1 + 30, c * c), 1552] }; }
  if (u < .58) { const c = (u - .46) / .12; return { m: { f: [X1, HY - 34 * Math.sin(Math.PI * c) - 24 * c], s: 1, r: -360 * c }, e: [X1 + 30 - 30 * c, 1552] }; }
  if (u < .88) { const c = (u - .58) / .3, x = lerp(X1, HX, c); return { m: { f: [x, HY - 24], s: 1, r: -6 + 5 * Math.sin(t * 14) }, e: [x, 1552] }; }
  const c = (u - .88) / .12; return { m: { f: [HX, HY - 24 * (1 - c)], s: 1, r: 4 * Math.sin(t * 16) * (1 - c) }, e: [HX - 500 * c, 1552] };
}
// Gag Teil 2 (Verfolgung): Ein Papierflieger aus den Trainingstexten jagt Schalti und bohrt sich in den Boden
function i1plane(q, D, t) { const u = cl(q / Math.max(2.4, D - .1)), HX = 220, HY = 1537, run = 16 * Math.abs(Math.sin(t * 16));
  if (u < .16) { const k = u / .16; return { m: { f: [HX, HY], s: 1, r: 5 * Math.sin(t * 22) * k }, e: [lerp(-120, 60, k), lerp(1330, 1400, k), 12] }; }
  if (u < .6) { const c = (u - .16) / .44, x = lerp(HX, 760, c); return { m: { f: [x, HY - run], s: 1, r: -8 + 5 * Math.sin(t * 16) }, e: [x - 215, 1410 + 14 * Math.sin(t * 11), 6 * Math.sin(t * 11)] }; }
  if (u < .72) { const c = (u - .6) / .12; return { m: { f: [760, HY - 30 * Math.sin(Math.PI * c)], s: 1, r: 360 * c, flip: c > .5 }, e: [545 + 420 * c, 1410 + 150 * c * c, 20 + 50 * c], crash: c > .96 }; }
  const c = (u - .72) / .28; return { m: { f: [lerp(760, HX, ease(c)), HY - run * (1 - c)], s: 1, r: 6 * Math.sin(t * 16) * (1 - c), flip: c < .9 }, e: [965, 1556, 70], crash: true };
}
// Gag Teil 3 (Abwurf): Schalti springt auf den Stempel, der saust runter und federt ihn wieder weg
function i1stamp(q, D, t) { const u = cl(q / Math.max(2.4, D - .1)), H = [220, 1537], K = [205, 884];
  if (u < .28) { const k = ease(u / .28); return { p: 0, m: { f: [lerp(H[0], K[0], k), lerp(H[1], K[1], k) - 170 * Math.sin(Math.PI * k)], s: lerp(1, .6, k), r: -10 * Math.sin(Math.PI * k) } }; }
  if (u < .42) { const c = (u - .28) / .14; return { p: 0, m: { f: [K[0], K[1] - 22 * Math.abs(Math.sin(Math.PI * 2 * c))], s: .6, r: 0 } }; }
  if (u < .5) { const c = (u - .42) / .08; return { p: c, m: { f: [K[0], K[1] + 60 * c], s: .6, r: 0 } }; }
  if (u < .58) { const c = (u - .5) / .08; return { p: 1 - c, done: 1, m: { f: [K[0], K[1] + 60 * (1 - c) - 60 * c], s: .6, r: 30 * c } }; }
  if (u < .86) { const c = (u - .58) / .28; return { p: 0, done: 1, m: { f: [lerp(K[0], H[0], c), lerp(K[1] - 60, H[1], c * c)], s: lerp(.6, 1, c), r: 30 + 330 * c } }; }
  return { p: 0, done: 1, m: { f: H, s: 1, r: -8 + 6 * Math.sin(t * 16) * (1 - (u - .86) / .14) } };
}

// ---------- Einstieg: Chatfenster tippt, dann regnet es Woerter und eines trifft Schalti ----------
WORLD.h7i1 = function (sc, ev, t, lt) {
  const e = ev.regen, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e, t), CX = 590, CY = 905;
  let s = stage7(t, lt, '#07081C', e === undefined ? lc('#7C5CFF', '#3DB8FF', k) : '#FFD23F', CX, CY), o = '', fl = '';
  o += '<rect x="' + (CX - 240) + '" y="' + (CY - 215) + '" width="480" height="430" rx="40" fill="#0B1020" stroke="#F4F6FB" stroke-width="9"/><rect x="' + (CX - 240) + '" y="' + (CY - 215) + '" width="480" height="64" rx="32" fill="#1B2748"/>';
  for (let i = 0; i < 3; i++) o += '<circle cx="' + (CX - 200 + i * 34) + '" cy="' + (CY - 183) + '" r="10" fill="' + ['#FF5A5A', '#FFD23F', '#3DFF7A'][i] + '"/>';
  o += '<rect x="' + (CX - 10) + '" y="' + (CY - 125) + '" width="220" height="74" rx="30" fill="#7C5CFF"/>' + svgT(CX + 100, CY - 72, 'Hallo?', 44, '#fff');
  const W4 = ['Hm,', 'ich', 'rate', 'mal'], n = e === undefined ? Math.floor(k * 5.2) : 4; let x = CX - 205;
  o += '<rect x="' + (CX - 215) + '" y="' + (CY - 20) + '" width="430" height="190" rx="30" fill="#F4F6FB"/>';
  W4.forEach((w, i) => { if (i < n) o += svgT(CX - 190 + (i % 2) * 190, CY + 52 + Math.floor(i / 2) * 72, w, 56, '#0B1020', 'start'); });
  if (n < 4) for (let i = 0; i < 3; i++) o += '<circle cx="' + (CX - 170 + (n % 2) * 190 + i * 30) + '" cy="' + (CY + 36 + Math.floor(n / 2) * 72 - 10 * Math.abs(Math.sin(t * 7 + i))) + '" r="10" fill="#7C5CFF"/>';
  if (e !== undefined) { const RW = ['das', 'ist', 'und', 'blau', 'der', 'ein', 'so', 'mal', 'oft'];
    RW.forEach((w, i) => { const q = e - i * .06; if (q <= 0) return; const x0 = 90 + rnd(i + 11) * 760, y = 650 + 1500 * q * q * (.6 + .5 * rnd(i + 5)); if (y < 1700) fl += wc1(x0, y, w, 40, ['#F4F6FB', '#B9A6FF', '#9BE7FF'][i % 3], '#0B1020', 1, 30 * (rnd(i) - .5) + q * 80 * (i % 2 ? 1 : -1)); });
    const c = cl((e - .12) / .38), bx = 150, by = c < 1 ? lerp(500, 1235, c * c) : 1235 - 150 * Math.sin(Math.PI * cl((e - .5) / .6) * .9) + 600 * Math.pow(cl((e - .5) / .6), 2), bxx = c < 1 ? bx : bx + 330 * cl((e - .5) / .6);
    if (by < 1750) fl += wc1(bxx, by, 'WORT', 64, '#FFD23F', '#0B1020', 1, c < 1 ? -8 : -8 + 300 * cl((e - .5) / .6));
    if (e > .5) fl += stars6(e, t); }
  s += pop7(CX, CY, lt, o) + fl + word7('BONK!', 620, 880, e === undefined || e < .5 ? undefined : e - .5, '#FFD23F', -8) + sweat7(t, e === undefined ? k * .5 : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7i1 = (ev, t, lt, sc) => { const e = ev.regen, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined && e > .5) { const b = cl((e - .5) / .2); return { f: [220 - 20 * b, 1537 + 0], s: 1, r: -10 * b + 6 * Math.sin(t * 7) }; }
  return { f: [220, 1537], s: 1, r: 2 * k * Math.sin(t * 12) };
};

// ---------- Teil 1: naechstes Wort raten, Wahrscheinlichkeiten, anhaengen, weiterraten ----------
WORLD.i1wort = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const wa = ev.wahr, we = ev.weiter, a = ev.act, SZ = 50, Y1 = 790, Y2 = 905, WS = ['Der', 'Himmel', 'ist'];
  let x = 90; WS.forEach((w, i) => { s += wc1(x, Y1, w, SZ, '#F4F6FB', '#0B1020', (lt - .5 - i * .18) / .3); x += ww1(w, SZ) + 12; });
  const BX = x, fly = we === undefined ? 0 : ease(cl((we - .2) / .5));
  if (fly < 1 && a === undefined) s += lt > 1.2 ? blank1(BX, Y1, 154, SZ, t) : '';
  // Balken mit Beispielwerten
  const B = [['blau', 71], ['grau', 14], ['weit', 6], ['grün', 1]], fade = we === undefined ? 1 : 1 - cl((we - .7) / .3);
  if (wa !== undefined && fade > 0 && a === undefined) { B.forEach((b, i) => { const y = 905 + i * 58, g = ease(cl((wa - .2 - i * .18) / .6)), top = i === 0 && we !== undefined;
      s += '<g opacity="' + fade + '">' + (i === 0 && fly > 0 ? '' : svgT(110, y + 14, b[0], 40, top ? '#FFD23F' : '#fff', 'start')) + '<rect x="260" y="' + (y - 18) + '" width="460" height="36" rx="18" fill="#141C36"/><rect x="260" y="' + (y - 18) + '" width="' + (460 * b[1] / 100 * g + (g > 0 ? 8 : 0)) + '" height="36" rx="18" fill="' + (i === 0 ? '#3DFF7A' : '#7C5CFF') + '"/>' + svgT(740, y + 13, Math.round(b[1] * g) + ' %', 36, '#fff', 'start') + '</g>'; });
    s += '<g opacity="' + fade + '">' + svgT(900, 1124, 'Beispielwerte', 24, '#AEB9D6', 'end') + '</g>'; }
  if (fly > 0 && a === undefined) s += wc1(lerp(96, BX, fly), lerp(905, Y1, fly) - 60 * Math.sin(Math.PI * fly), 'blau', SZ, '#3DFF7A', '#0B1020', 1, 0);
  if (a !== undefined) s += wc1(BX, Y1, 'blau', SZ, '#3DFF7A', '#0B1020', 1, 0);
  // weiterraten: zweite Zeile waechst
  const W2 = ['und', 'die', 'Sonne', 'scheint.']; let x2 = 90, cnt = 4;
  if (we !== undefined && we > 1) { const n = a === undefined ? 0 : Math.min(4, Math.floor(a / .32) + 1);
    W2.forEach((w, i) => { if (i < n) { s += wc1(x2, Y2, w, SZ, '#F4F6FB', '#0B1020', (a - i * .32) / .25); x2 += ww1(w, SZ) + 12; cnt++; } });
    if (n < 4) s += blank1(x2, Y2, 154, SZ, t); }
  if (a !== undefined) s += '<g transform="translate(250 1050) scale(' + back(cl(a / .35)) + ')"><rect x="-170" y="-44" width="340" height="88" rx="44" fill="#141C36" stroke="#3DFF7A" stroke-width="6"/>' + svgT(0, 15, 'Wort ' + cnt + ' von ?', 42, '#3DFF7A') + '</g>';
  if (we !== undefined && a === undefined) { const c = i1trip(we, D6(sc, 2), t).e; s += wc1(c[0] - 70, c[1], 'und', 34, '#B9A6FF', '#0B1020', 1, 0); }
  h += slot(ev, [['panel', 'KI rät das nächste Wort'], ['wahr', 'Jedes Wort bekommt eine Chance', 'hot'], ['weiter', 'Anhängen und weiterraten'], ['act', 'Genauer: Wortstücke, die Tokens', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i1wort = (ev, t, lt, sc) => ev.act !== undefined ? BIG() : ev.weiter !== undefined ? i1trip(ev.weiter, D6(sc, 2), t).m : BIG();

// ---------- Teil 2: Training mit Texten, Muster, kein Lexikon, wahrscheinlich statt wahr ----------
WORLD.i1lern = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const tx = ev.text === undefined ? 0 : ev.text, mu = ev.muster, lx = ev.lexikon, a = ev.act, BX = 570, BY = 745, BW = 330, BH = 340;
  if (a === undefined) {
    // Kasten mit Netz
    s += '<rect x="' + BX + '" y="' + BY + '" width="' + BW + '" height="' + BH + '" rx="50" fill="#141C36" stroke="#B9A6FF" stroke-width="8"/>';
    const N = []; for (let c = 0; c < 3; c++) for (let r = 0; r < 3; r++) N.push([BX + 70 + c * 95, BY + 80 + r * 90]);
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) if (Math.floor(j / 3) === Math.floor(i / 3) + 1) { const on = mu !== undefined && Math.sin(t * 5 + i * 1.3 + j * 2.1) > .55; s += '<line x1="' + N[i][0] + '" y1="' + N[i][1] + '" x2="' + N[j][0] + '" y2="' + N[j][1] + '" stroke="' + (on ? '#3DFF7A' : '#3A4A7A') + '" stroke-width="' + (on ? 6 : 3) + '"/>'; }
    N.forEach((q, i) => { s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="' + (17 + (mu !== undefined ? 4 * Math.sin(t * 6 + i) : 0)) + '" fill="' + (mu !== undefined ? '#3DFF7A' : '#7C5CFF') + '" stroke="#0B1020" stroke-width="4"/>'; });
    if (lx === undefined) { // Seiten fliegen in den Kasten
      if (mu === undefined) for (let i = 0; i < 9; i++) { const c = (t * .5 + i / 9) % 1, y0 = 780 + rnd(i + 3) * 280; if (tx > i * .12) s += page1(lerp(70, BX + 20, c), lerp(y0, BY + BH / 2, c) - 70 * Math.sin(Math.PI * c), 1 - .45 * c, 40 * (rnd(i) - .5) + c * 120, c > .85 ? (1 - c) / .15 : 1); }
      else [['guten', 'Morgen'], ['vielen', 'Dank'], ['zum', 'Beispiel']].forEach((p, i) => { const k = (mu - .3 - i * .5) / .3, y = 800 + i * 100; if (k <= 0) return; s += wc1(80, y, p[0], 38, '#F4F6FB', '#0B1020', k, 0) + '<path d="M' + (90 + ww1(p[0], 38)) + ' ' + y + ' h34 m-14 -12 l14 12 l-14 12" stroke="#3DFF7A" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="' + cl(k) + '"/>' + wc1(140 + ww1(p[0], 38), y, p[1], 38, '#3DFF7A', '#0B1020', k - .5, 0); });
    } else { const k = back(cl(lx / .35)); // Lexikon durchgestrichen
      s += '<g transform="translate(290 915) scale(' + k + ')"><rect x="-130" y="-150" width="260" height="300" rx="20" fill="#3B6BD6" stroke="#0B1020" stroke-width="7"/><rect x="-130" y="-150" width="46" height="300" rx="20" fill="#2A4FA8"/><rect x="-50" y="-90" width="150" height="70" rx="12" fill="#F4F6FB"/>' + svgT(25, -42, 'A–Z', 44, '#0B1020') + '<path d="M-110 132 H130" stroke="#F4F6FB" stroke-width="10"/></g>';
      const c = cl((lx - .5) / .3); if (c > 0) s += '<path d="M150 775 L' + (150 + 280 * c) + ' ' + (775 + 280 * c) + '" stroke="#FF4D4D" stroke-width="22" stroke-linecap="round"/>' + (c >= 1 ? '<path d="M430 775 L' + (430 - 280 * cl((lx - .8) / .3)) + ' ' + (775 + 280 * cl((lx - .8) / .3)) + '" stroke="#FF4D4D" stroke-width="22" stroke-linecap="round"/>' : ''); }
  } else { // wahr vs. wahrscheinlich
    const k1 = back(cl(a / .35)), k2 = back(cl((a - .7) / .35));
    s += '<g transform="translate(270 900) scale(' + k1 + ')"><rect x="-170" y="-120" width="340" height="240" rx="40" fill="#141C36" stroke="#8A93A8" stroke-width="7"/>' + svgT(0, -52, 'Stimmt das?', 44, '#AEB9D6') + svgT(0, 84, '?', 96, '#8A93A8') + '</g>';
    s += '<g transform="translate(680 900) scale(' + (k2 * (1 + .03 * Math.sin(t * 7))) + ')"><rect x="-200" y="-140" width="400" height="280" rx="40" fill="#0F3A2A" stroke="#3DFF7A" stroke-width="9"/>' + svgT(0, -40, 'Klingt', 50, '#fff') + svgT(0, 22, 'wahrscheinlich', 50, '#3DFF7A') + '</g>' + okx1(680, 990, 40, true, (a - 1) / .3);
  }
  if (mu !== undefined && lx === undefined && a === undefined) { const c = i1plane(mu, D6(sc, 1), t); s += plane1(c.e[0], c.e[1], 1.1, c.e[2], c.crash); }
  h += slot(ev, [['text', 'Trainiert mit riesigen Textmengen'], ['muster', 'Lernt, was oft aufeinander folgt', 'hot'], ['lexikon', 'Schlägt von allein nichts nach', 'red'], ['act', 'Nicht wahr, nur wahrscheinlich', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i1lern = (ev, t, lt, sc) => (ev.muster !== undefined && ev.lexikon === undefined) ? i1plane(ev.muster, D6(sc, 1), t).m : BIG();

// ---------- Teil 3: klingt sicher, Halluzination, gegenpruefen, Quellen anklicken ----------
WORLD.i1check = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const ha = ev.hallu, pr = ev.pruefen, a = ev.act;
  if (pr === undefined && a === undefined) { const k = back(cl((lt - .4) / .35));
    s += '<g transform="translate(540 880) scale(' + k + ')"><path d="M-330 110 L-380 180 L-270 126 Z" fill="#F4F6FB" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><rect x="-400" y="-130" width="800" height="260" rx="60" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/><rect x="-340" y="104" width="76" height="20" fill="#F4F6FB"/>' + svgT(-350, -24, 'Die Hauptstadt von', 50, '#0B1020', 'start') + svgT(-350, 54, 'Australien ist Sydney.', 50, '#0B1020', 'start') + '</g>';
    if (ha === undefined) s += wc1(600, 1070, 'Ganz sicher!', 40, '#3DFF7A', '#0B1020', (lt - 1.4) / .3, -4);
    else { const c = cl(ha / .3); s += '<path d="M468 918 H' + (468 + 232 * c) + '" stroke="#FF4D4D" stroke-width="12" stroke-linecap="round"/>' + '<g transform="translate(730 1062) rotate(-6) scale(' + (back(cl((ha - .2) / .3)) * (1 + 1.2 * (1 - ease(cl((ha - .2) / .3))))) + ')"><rect x="-150" y="-46" width="300" height="92" rx="16" fill="#07081C" stroke="#FF4D4D" stroke-width="10"/>' + svgT(0, 24, 'FALSCH', 68, '#FF4D4D') + '</g>' + wc1(100, 1070, 'Richtig: Canberra', 42, '#F4F6FB', '#0B1020', (ha - .8) / .3, 0); }
  } else { const D = D6(sc, 2), g = a === undefined ? i1stamp(pr, D, t) : { p: 0, done: 1 }, k = back(cl((a === undefined ? pr : 1) / .35)), py = 60 * g.p;
    // Stempel links mit Papier
    s += '<g transform="scale(1)"><rect x="95" y="1050" width="220" height="76" rx="12" fill="#F4F6FB" stroke="#0B1020" stroke-width="5" opacity="' + cl(k) + '"/>' + (g.done ? svgT(205, 1104, 'geprüft', 40, '#2A9D4E') : '') + '<g transform="translate(205 ' + (896 + py) + ') scale(' + k + ')"><rect x="-34" y="0" width="68" height="60" rx="14" fill="#C97A2B" stroke="#0B1020" stroke-width="5"/><rect x="-84" y="56" width="168" height="34" rx="10" fill="#8A4B12" stroke="#0B1020" stroke-width="5"/><rect x="-74" y="88" width="148" height="12" fill="#2A9D4E"/></g></g>';
    ['Zahlen', 'Namen', 'Quellen'].forEach((n, i) => { const kk = (a === undefined ? pr - .3 - i * .35 : 1) / .3, y = 780 + i * 96; if (kk <= 0) return; s += '<g transform="translate(640 ' + y + ') scale(' + back(cl(kk)) + ')"><rect x="-250" y="-40" width="500" height="80" rx="24" fill="#F4F6FB" stroke="#0B1020" stroke-width="5"/>' + svgT(-150, 16, n, 46, '#0B1020', 'start') + '</g>' + lens6(440, y - 4, .34 * cl(kk), 0) + okx1(840, y, 26, true, g.done ? (a === undefined ? (pr - .5 * Math.max(2.4, D - .1) - i * .15) / .25 : 1) : 0); });
    if (a !== undefined) { const k2 = back(cl(a / .35)), cx = lerp(900, 760, ease(cl((a - .4) / .5))), cy = lerp(1150, 1092, ease(cl((a - .4) / .5))), cl2 = a > .95;
      s += '<g transform="translate(640 1076) scale(' + k2 + ')"><rect x="-250" y="-36" width="500" height="72" rx="36" fill="' + (cl2 ? '#3DFF7A' : '#141C36') + '" stroke="#3DFF7A" stroke-width="6"/><path d="M-200 0 a14 14 0 0 1 14 -14 h16 m12 0 h16 a14 14 0 0 1 0 28 h-16 m-12 0 h-16 a14 14 0 0 1 -14 -14 m22 0 h24" stroke="' + (cl2 ? '#0B1020' : '#3DFF7A') + '" stroke-width="6" fill="none" stroke-linecap="round"/>' + svgT(30, 14, 'Quelle öffnen', 40, cl2 ? '#0B1020' : '#fff') + '</g>';
      s += '<path transform="translate(' + cx + ' ' + cy + ') scale(' + (cl2 && a < 1.1 ? .85 : 1) + ')" d="M0 0 L0 46 L12 36 L22 58 L32 54 L22 32 L38 32 Z" fill="#fff" stroke="#0B1020" stroke-width="4" stroke-linejoin="round"/>';
      if (cl2 && a < 1.6) s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (20 + 70 * (a - .95) / .65) + '" fill="none" stroke="#3DFF7A" stroke-width="6" opacity="' + (1 - (a - .95) / .65) + '"/>'; }
  }
  h += slot(ev, [['sicher', 'Klingt immer sicher'], ['hallu', 'Falsch, aber überzeugend: Halluzination', 'red'], ['pruefen', 'Zahlen, Namen, Quellen prüfen', 'hot'], ['act', 'Quellen zeigen lassen und anklicken', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i1check = (ev, t, lt, sc) => ev.act !== undefined ? BIG() : ev.pruefen !== undefined ? i1stamp(ev.pruefen, D6(sc, 2), t).m : BIG();

// ---------- Schluss ----------
WORLD.i1outro = function (sc, ev, t) { let d = ''; for (let i = 0; i < 3; i++) d += '<circle cx="' + (760 + i * 36) + '" cy="' + (1010 - 10 * Math.abs(Math.sin(t * 6 + i))) + '" r="12" fill="#7C5CFF"/>';
  return W(net6(t) + '<path d="M720 1070 L690 1120 L770 1076 Z" fill="#F4F6FB"/><rect x="700" y="940" width="200" height="140" rx="44" fill="#F4F6FB"/>' + d + topShade()); };
