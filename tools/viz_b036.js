// B036 Schicht fuer Schicht, Folge 3 der Reihenfolge: Wie ist deine Huefte aufgebaut? (linke Huefte von vorn, Pfanne im Schnitt)
const HX = 600, HY = 897, HZ = .86, NOTE36 = 'Linke Hüfte, Pfanne im Schnitt', TX36 = 750;
const HLb = (lx, ly, ty, de, la, k, tx) => labelL(Math.round(HX + lx * HZ), Math.round(HY + ly * HZ), tx || TX36, ty, de, la, k, 1);
const ROWS36 = [['Knochen', COLS.bone], ['Knorpel', COLS.cart], ['Gelenklippe', COLS.men], ['Kapsel', COLS.cap], ['Bänder', COLS.lig], ['Gesäßmuskel', COLS.mus]];
const LAB36 = { rows: ROWS36, cx: HX, note: NOTE36, w: 360, fs: 29 };
const markH = (t, lx, ly, r) => '<circle cx="' + (HX + lx * HZ).toFixed(0) + '" cy="' + (HY + ly * HZ).toFixed(0) + '" r="' + r + '" fill="none" stroke="' + TH().hl + '" stroke-width="6" stroke-dasharray="16 10" opacity="' + (.7 + .3 * Math.sin(t * 5)).toFixed(2) + '"/>';
const ringH = (lx, ly, r, k) => k > 0 && k < 1 ? '<circle cx="' + (HX + lx * HZ).toFixed(0) + '" cy="' + (HY + ly * HZ).toFixed(0) + '" r="' + (r * (1 + .5 * k)).toFixed(0) + '" fill="none" stroke="' + TH().hl + '" stroke-width="8" opacity="' + (1 - k).toFixed(2) + '"/>' : '';
const gag36 = (sc, t) => { const L = sc.lines, g = typeof S !== 'undefined' && S.gagAt ? L[0].start + S.gagAt : L[L.length - 1].end + .15; return t >= g ? t - g : undefined; };
const lineDur = (sc, i) => sc.lines[i].end - sc.lines[i].start;
// Einstieg: fertige Huefte, im Gag fallen Muskel, Baender, Kapsel, Gelenklippe und Knorpel nacheinander ab, uebrig bleiben die Knochen
const FLY36 = [[5, 0, 660], [4, .1, 540], [3, .2, 450], [2, .3, 610], [1, .4, 500]];
WORLD.h36huefte = function (sc, ev, t, lt) { const e = gag36(sc, t), L = hipLayS, l = [1, 1, 1, 1, 1, 1]; let fly = '';
  if (e !== undefined) FLY36.forEach(([i, t0, lx], n) => { const k = cl((e - t0) / .5); if (k > 0) l[i] = 0; if (k <= 0) return;
    const x = lerp(HX, lx, k), y = lerp(HY, 1492, k * k) - 230 * Math.sin(Math.PI * k) * (1 - k * .3);
    const inner = i === 5 ? L.mus(t) : i === 4 ? L.lig() : i === 3 ? L.caps() : i === 2 ? L.lab() : L.cartF() + L.cartP();
    fly += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(.32)">' + BDEF + HDEF + inner + '</g>'; });
  const gone = e === undefined ? 6 : 1 + FLY36.filter(([i, t0]) => e < t0).length;
  let s = laborS(t, Object.assign({}, LAB36, { on: gone, cur: e === undefined && lt > .3 && lt < 2.6 ? 5 : 0 }));
  s += hipS(HX, HY, HZ, t, { l: l, ligHl: e === undefined && lt > .3 && lt < 2.6 });
  if (e === undefined && lt > .3 && lt < 2.6) s += markH(t, 88, -40, 62) + HLb(98, -30, 840, 'Y-Band', 'Lig. iliofemorale', (lt - .5) / .4);
  s += fly;
  return W(s + shadeS()); };
WMASC.h36huefte = (ev, t, lt, sc) => { const e = gag36(sc, t);
  if (e === undefined) return BIG3();
  const x = e < .45 ? lerp(220, 150, ease(cl(e / .35))) : e < 1.6 ? 150 : lerp(150, 220, ease(cl((e - 1.6) / .5)));
  return stay3([x, 1537 - (e > .9 && e < 1.25 ? 30 * Math.sin(Math.PI * (e - .9) / .35) : 0)], 1, { r: e < .45 ? -12 : e < 1.6 ? -14 : 6 * cl(1 - (e - 1.6) / .6), nospin: 1 }); };

// Teil 1: Schicht 1 Knochen (Oberschenkelkopf und Hueftpfanne), Schicht 2 Knorpel
WORLD.b36a = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, bo = cl((lt - .1) / .9), ca = p2 === undefined ? 0 : cl((p2 - 1.6) / .8);
  // Problem: das Bein schwingt, Knochen reibt auf Knochen (Funken), bis der Knorpel da ist
  const swK = p1 === undefined ? 0 : p2 === undefined ? cl(p1 / .4) : cl(1 - (p2 - .8) / .6), sw = 9 * Math.sin(t * 3.2) * swK, pu = p1 === undefined ? 0 : p2 === undefined ? cl((p1 - lineDur(sc, 1) * .45) / .4) : cl(1 - (p2 - 1.4) / .5);
  let s = laborS(t, Object.assign({}, LAB36, { on: bo + ca, cur: p2 !== undefined ? 2 : 1 }));
  s += hipS(HX, HY, HZ, t, { l: [bo, ca, 0, 0, 0, 0], sw: sw, push: pu });
  if (p !== undefined && p1 === undefined) s += HLb(-10, -84, 770, 'Hüftpfanne', 'Acetabulum', (p - .6) / .35) + HLb(26, 12, 960, 'Oberschenkelkopf', 'Caput femoris', (p - 1.4) / .35, 726);
  if (p1 !== undefined && p2 === undefined && pu < .5) { const k = cl(p1 / .4); s += '<path d="M' + (HX + 150 * HZ) + ' ' + (HY + 200 * HZ) + ' a70 70 0 0 1 -60 60" stroke="' + TH().hl + '" stroke-width="7" fill="none" stroke-linecap="round" opacity="' + k.toFixed(2) + '"/>'; }
  if (p2 !== undefined) s += ringH(20, -50, 80, (p2 - 1.6) / .7) + HLb(20, -56, 800, 'Gelenkknorpel', 'Cartilago articularis', (p2 - 2.0) / .35);
  if (a !== undefined) { const k = cl(a / .6); s += '<g transform="translate(' + HX + ' ' + HY + ') scale(' + HZ + ')" opacity="' + k.toFixed(2) + '"><path d="' + HARC(74, 150, 335) + '" stroke="' + TH().hl + '" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M' + HPs(84, 152.5) + ' L' + HPs(84, 332.5) + '" stroke="#fff" stroke-width="3.5" stroke-dasharray="9 8" opacity=".9"/></g>'; }
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 1: Knochen'], ['p1', 'Knochen auf Knochen reibt', 'hot'], ['p2', 'Schicht 2: Knorpel'], ['act', 'Pfanne: nur eine halbe Kugel', 'hot']])); };
WMASC.b36a = (ev, t) => BIG3();

// Teil 2: Schicht 3 Gelenklippe, Schicht 4 Kapsel mit Gelenkfluessigkeit
WORLD.b36b = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, lb = cl((lt - .5) / .8), cp = p2 === undefined ? 0 : cl((p2 - 1.0) / .9);
  let s = laborS(t, Object.assign({}, LAB36, { on: 2 + lb + cp, cur: p2 !== undefined ? 4 : 3 }));
  s += hipS(HX, HY, HZ, t, { l: [1, 1, lb, cp, 0, 0], eq: p1 !== undefined && p2 === undefined ? cl((p1 - .3) / 1.2) : 0 });
  if (p !== undefined && p2 === undefined) s += HLb(64, -16, 900, 'Gelenklippe', 'Labrum acetabuli', (p - 1.3) / .35);
  if (p2 !== undefined) s += ringH(30, 20, 110, (p2 - 1.0) / .7) + HLb(92, 40, 1010, 'Gelenkkapsel', 'Capsula articularis', (p2 - 1.5) / .35);
  if (a !== undefined) s += markH(t, -30, -30, 74);
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 3: Gelenklippe'], ['p1', 'Mehr als die halbe Kugel', 'hot'], ['p2', 'Schicht 4: Kapsel'], ['act', 'Flüssigkeit schmiert und ernährt', 'hot']])); };
WMASC.b36b = (ev, t) => BIG3();

// Teil 3: Schicht 5 Baender, Schicht 6 mittlerer Gesaessmuskel
WORLD.b36c = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, li = cl((lt - .5) / .8);
  const d2 = lineDur(sc, 2), mu = p2 === undefined ? 0 : cl((p2 - d2 * .5) / .8), tiK = p2 === undefined ? 0 : cl(p2 / .7) * (1 - ease(mu)), ti = -6 * tiK;
  let s = laborS(t, Object.assign({}, LAB36, { on: 4 + li + mu, cur: p2 !== undefined ? 6 : 5 }));
  s += hipS(HX, HY, HZ, t, { l: [1, 1, 1, 1, li, mu], tilt: ti, ligHl: p1 !== undefined && p2 === undefined });
  if (p !== undefined && p1 === undefined) s += HLb(96, -30, 860, 'Bänder', 'Ligamenta', (p - 1.3) / .35);
  if (p1 !== undefined && p2 === undefined) s += markH(t, 88, -40, 62) + HLb(98, -30, 860, 'Y-Band', 'Lig. iliofemorale', (p1 - .3) / .35);
  // Becken kippt zur Gegenseite (links im Bild), gruene Linie zeigt die Schraeglage, mit dem Muskel wird sie waagerecht
  if (p2 !== undefined || a !== undefined) { const cy = HY - 214 * HZ, k = p2 === undefined ? 1 : cl(p2 / .4), ok = mu > .9;
    s += '<g transform="rotate(' + ti.toFixed(2) + ' ' + HX + ' ' + HY + ')" opacity="' + k.toFixed(2) + '"><path d="M' + (HX - 135) + ' ' + cy.toFixed(0) + ' H' + (HX + 125) + '" stroke="' + (ok ? TH().hl : '#FFB84D') + '" stroke-width="6" stroke-dasharray="14 10" stroke-linecap="round"/></g>';
    if (!ok) s += '<path d="M' + (HX - 120) + ' ' + (cy + 18).toFixed(0) + ' v40 m-12 -14 l12 14 l12 -14" stroke="#FFB84D" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (k * tiK).toFixed(2) + '"/>'; }
  if (p2 !== undefined) s += ringH(110, -110, 100, (p2 - d2 * .5) / .7) + HLb(120, -128, 740, 'Gesäßmuskel', 'M. gluteus medius', (p2 - d2 * .5 - .5) / .35);
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 5: Bänder'], ['p1', 'Das stärkste Band', 'hot'], ['p2', 'Schicht 6: Gesäßmuskel'], ['act', 'Hält das Becken waagerecht', 'hot']])); };
WMASC.b36c = (ev, t) => BIG3();

// Schluss
WORLD.b36out = function (sc, ev, t, lt) { const c1 = ev.c1, c2 = ev.c2, c3 = ev.c3, sv = ev.save, k = sv === undefined ? 0 : ease(cl(sv / .5)), z = HZ * lerp(1, .7, k), y = HY + 260 * HZ - 260 * z;
  const cur = sv !== undefined ? 0 : c3 !== undefined ? 6 : c2 !== undefined ? 4 : c1 !== undefined ? 2 : 0;
  let s = laborS(t, Object.assign({}, LAB36, { on: 6, cur: 0, noList: sv !== undefined, note: sv === undefined ? NOTE36 : '' }));
  s += hipS(HX, y, z, t, { l: [1, 1, 1, 1, 1, 1] });
  if (cur) for (const r of [cur - 1, cur]) s += '<rect x="50" y="' + (782 + (r - 1) * 45 - 31) + '" width="340" height="41" rx="9" fill="#A8E63C" opacity=".22"/>';
  return W(s + '<rect width="1080" height="1920" fill="#02030F" opacity=".3"/>' + shadeS()); };
['h36huefte', 'b36a', 'b36b', 'b36c', 'b36out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
