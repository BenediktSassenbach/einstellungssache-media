// B035 Schicht fuer Schicht, Folge 1 der Reihenfolge: Wie ist ein Knochen aufgebaut? (Oberschenkelknochen im Laengsschnitt)
const QX = 640, QY = 908, QZ = .98, NOTE35 = 'linker Oberschenkelknochen, Längsschnitt';
const QL = (lx, ly, tx, ty, de, la, k) => labelL(Math.round(QX + lx * QZ), Math.round(QY + ly * QZ), tx, ty, de, la, k);
const ROWS35 = [['Knochenmark', COLS.marR], ['Schwammknochen', COLS.spo], ['Kompakta', COLS.bone], ['Blutgefäße', COLS.ves], ['Knochenhaut', COLS.peri], ['Gelenkknorpel', COLS.cart]];
const markQ = (t, lx, ly, r) => '<circle cx="' + (QX + lx * QZ) + '" cy="' + (QY + ly * QZ) + '" r="' + r + '" fill="none" stroke="' + TH().hl + '" stroke-width="6" stroke-dasharray="16 10" opacity="' + (.7 + .3 * Math.sin(t * 5)).toFixed(2) + '"/>';
const ringQ = (lx, ly, r, k) => k > 0 && k < 1 ? '<circle cx="' + (QX + lx * QZ) + '" cy="' + (QY + ly * QZ) + '" r="' + (r * (1 + .5 * k)).toFixed(0) + '" fill="none" stroke="' + TH().hl + '" stroke-width="8" opacity="' + (1 - k).toFixed(2) + '"/>' : '';
const gag35 = (sc, t) => { const L = sc.lines, g = typeof S !== 'undefined' && S.gagAt ? L[0].start + S.gagAt : L[L.length - 1].end + .15; return t >= g ? t - g : undefined; };
// Einstieg: fertiger Knochen, im Gag fallen Knorpel, Knochenhaut, Gefaesse, Kompakta und Schwammknochen nacheinander ab, uebrig bleibt das Mark
const FLY35 = [[5, 0, 650], [4, .1, 540], [3, .2, 450], [2, .3, 600], [1, .4, 500]];
WORLD.h35knochen = function (sc, ev, t, lt) { const e = gag35(sc, t), L = boneLayS, l = [1, 1, 1, 1, 1, 1]; let fly = '';
  if (e !== undefined) FLY35.forEach(([i, t0, lx], n) => { const k = cl((e - t0) / .5); if (k > 0) l[i] = 0; if (k <= 0) return;
    const x = lerp(QX, lx, k), y = lerp(QY, 1492, k * k) - 230 * Math.sin(Math.PI * k) * (1 - k * .3), rot = (n % 2 ? -1 : 1) * 18 * ease(k);
    const inner = i === 5 ? L.cart() : i === 4 ? periS() : i === 3 ? L.ves(t) : i === 2 ? L.compMask() + '<g mask="url(#compM)">' + L.comp() + '</g>' : L.spong();
    fly += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(0) + ') scale(.3)">' + BDEF + BDEF2 + inner + '</g>'; });
  const gone = e === undefined ? 6 : 1 + FLY35.filter(([i, t0]) => e < t0).length;
  let s = laborS(t, { rows: ROWS35, on: gone, cur: e === undefined && lt > .3 && lt < 2.2 ? 1 : 0, cx: QX, note: NOTE35 });
  s += boneS(QX, QY, QZ, t, { l: l });
  if (e === undefined && lt > .3 && lt < 2.4) s += markQ(t, 0, 10, 60) + QL(10, 40, 790, 1020, 'Knochenmark', 'Medulla ossium', (lt - .4) / .4);
  s += fly;
  return W(s + shadeS()); };
WMASC.h35knochen = (ev, t, lt, sc) => { const e = gag35(sc, t);
  if (e === undefined) return BIG3();
  const x = e < .45 ? lerp(220, 150, ease(cl(e / .35))) : e < 1.6 ? 150 : lerp(150, 220, ease(cl((e - 1.6) / .5)));
  return stay3([x, 1537 - (e > .9 && e < 1.25 ? 30 * Math.sin(Math.PI * (e - .9) / .35) : 0)], 1, { r: e < .45 ? -12 : e < 1.6 ? -14 : 6 * cl(1 - (e - 1.6) / .6), nospin: 1 }); };

// Teil 1: Schicht 1 Knochenmark, Schicht 2 Schwammknochen
WORLD.b35a = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, mr = cl((lt - .2) / .8), sp = p2 === undefined ? 0 : cl((p2 - 1.6) / .9);
  let s = laborS(t, { rows: ROWS35, on: mr + sp, cur: p2 !== undefined ? 2 : 1, cx: QX, note: NOTE35 });
  s += boneS(QX, QY, QZ, t, { l: [mr, sp, 0, 0, 0, 0] });
  // ohne Geruest: das Mark sackt leicht zusammen (Problem), mit dem Schwammknochen steht alles
  if (p !== undefined && p2 === undefined) s += QL(10, 40, 790, 1020, 'Knochenmark', 'Medulla ossium', (p - 1.2) / .35);
  if (p1 !== undefined && p2 === undefined) s += markQ(t, -60, -180, 46) + lupeS(lupBlut(t), p1 / .35, QX - 60 * QZ, QY - 180 * QZ);
  if (p2 !== undefined) s += ringQ(-40, -170, 90, (p2 - 1.6) / .7) + QL(40, -168, 790, 760, 'Schwammknochen', 'Substantia spongiosa', (p2 - 2.0) / .35);
  if (a !== undefined) { for (let i = 0; i < 3; i++) { const q = ((t * .7 + i / 3) % 1); s += '<path d="M' + (QX + (-62 + 52 * q) * QZ).toFixed(0) + ' ' + (QY + (-210 + 120 * q) * QZ).toFixed(0) + ' l8 18 m-8 -18 l-12 12" stroke="' + TH().hl + '" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + Math.sin(Math.PI * q).toFixed(2) + '"/>'; } s += QL(40, -168, 790, 760, 'Schwammknochen', 'Substantia spongiosa', 1); }
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 1: Knochenmark'], ['p1', 'Rotes Mark bildet Blutzellen', 'hot'], ['p2', 'Schicht 2: Schwammknochen'], ['act', 'Bälkchen folgen der Belastung', 'hot']])); };
WMASC.b35a = (ev, t) => BIG3();

// Teil 2: Schicht 3 Kompakta, Schicht 4 Blutgefaesse
WORLD.b35b = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, cp = cl((lt - .4) / .9), vs = p2 === undefined ? 0 : cl((p2 - 1.0) / .8);
  let s = laborS(t, { rows: ROWS35, on: 2 + cp + vs, cur: p2 !== undefined ? 4 : 3, cx: QX, note: NOTE35 });
  s += boneS(QX, QY, QZ, t, { l: [1, 1, cp, vs, 0, 0] });
  if (p2 === undefined && p !== undefined) s += QL(-30, 20, 790, 980, 'Kompakta', 'Substantia compacta', (p - 1.3) / .35);
  if (p1 !== undefined && p2 === undefined) s += markQ(t, -22, -26, 22) + lupeS(lupOst(0), p1 / .35, QX - 22 * QZ, QY - 26 * QZ);
  if (p2 !== undefined) s += ringQ(30, -24, 60, (p2 - 1.0) / .7) + QL(60, -36, 790, 860, 'Blutgefäße', 'Vasa sanguinea', (p2 - 1.4) / .35) + lupeS(lupOst(cl((p2 - 1.6) / .6)), 1, QX - 22 * QZ, QY - 26 * QZ);
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 3: Kompakta'], ['p1', 'Ringe um einen Kanal', 'hot'], ['p2', 'Schicht 4: Blutgefäße'], ['act', 'Versorgen den Knochen von innen', 'hot']])); };
WMASC.b35b = (ev, t) => BIG3();

// Teil 3: Schicht 5 Knochenhaut, Schicht 6 Gelenkknorpel
WORLD.b35c = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, pe = cl((lt - .4) / .9), ca = p2 === undefined ? 0 : cl((p2 - .9) / .8);
  let s = laborS(t, { rows: ROWS35, on: 4 + pe + ca, cur: p2 !== undefined ? 6 : 5, cx: QX, note: NOTE35 });
  s += boneS(QX, QY, QZ, t, { l: [1, 1, 1, 1, pe, ca] });
  if (p2 === undefined && p !== undefined) s += QL(34, 60, 790, 1000, 'Knochenhaut', 'Periosteum', (p - 1.3) / .35);
  if (p1 !== undefined && p2 === undefined && p1 > 1.6) s += markQ(t, -70, -200, 36) + markQ(t, 0, 206, 44);
  if (p2 !== undefined) s += ringQ(-70, -200, 50, (p2 - .9) / .7) + QL(-40, -214, 790, 740, 'Gelenkknorpel', 'Cartilago articularis', (p2 - 1.3) / .35);
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 5: Knochenhaut'], ['p1', 'Schützt und ernährt', 'hot'], ['p2', 'Schicht 6: Gelenkknorpel'], ['act', 'Glatt: weniger Reibung', 'hot']])); };
WMASC.b35c = (ev, t) => BIG3();

// Schluss
WORLD.b35out = function (sc, ev, t, lt) { const c1 = ev.c1, c2 = ev.c2, c3 = ev.c3, sv = ev.save, k = sv === undefined ? 0 : ease(cl(sv / .5)), z = QZ * lerp(1, .7, k), y = QY + 230 * QZ - 230 * z;
  const cur = sv !== undefined ? 0 : c3 !== undefined ? 6 : c2 !== undefined ? 4 : c1 !== undefined ? 2 : 0;
  let s = laborS(t, { rows: ROWS35, on: 6, cur: 0, noList: sv !== undefined, cx: QX, note: sv === undefined ? NOTE35 : '' });
  s += boneS(QX, y, z, t, { l: [1, 1, 1, 1, 1, 1] });
  if (cur) for (const r of [cur - 1, cur]) s += '<rect x="50" y="' + (782 + (r - 1) * 45 - 31) + '" width="290" height="41" rx="9" fill="#A8E63C" opacity=".22"/>';
  return W(s + '<rect width="1080" height="1920" fill="#02030F" opacity=".3"/>' + shadeS()); };
['h35knochen', 'b35a', 'b35b', 'b35c', 'b35out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
