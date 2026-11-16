// B012 Schicht fuer Schicht, Folge 1: Wie ist ein Knie aufgebaut? (Skript Schicht fuer Schicht Anatomie)
// Ein Knie-Modell steht auf dem Podest und waechst in sechs Schichten. Jede Schicht kommt dazu, weil vorher etwas fehlt.
const KX = 720, KY = 908, KZ = 1.04;
const ROWS12 = [['Knochen', COLS.bone], ['Knorpel', COLS.cart], ['Menisken', COLS.men], ['Bänder', COLS.lig], ['Kapsel', COLS.cap], ['Sehne', COLS.ten]];
const ringS = (t, lx, ly, r, k) => k > 0 && k < 1 ? '<circle cx="' + (KX + lx * KZ) + '" cy="' + (KY + ly * KZ) + '" r="' + (r * (1 + .5 * k)).toFixed(0) + '" fill="none" stroke="#A8E63C" stroke-width="8" opacity="' + (1 - k).toFixed(2) + '"/>' : '';
const markS = (t, lx, ly, r) => '<circle cx="' + (KX + lx * KZ) + '" cy="' + (KY + ly * KZ) + '" r="' + r + '" fill="none" stroke="#A8E63C" stroke-width="6" stroke-dasharray="16 10" opacity="' + (.7 + .3 * Math.sin(t * 5)).toFixed(2) + '"/>';
// ---------- Einstieg: fertiges Knie, im Gag fliegen die Schichten 6 bis 2 nacheinander ab und landen neben Schalti ----------
const FLY12 = [[5, 0, 600], [4, .1, 520], [3, .2, 440], [2, .3, 565], [1, .4, 480]];
WORLD.h12knie = function (sc, ev, t, lt) { const e = ev.gag, hit = e !== undefined && e >= .9 ? e - .9 : undefined, sh = shake7(hit, t), L = kneeLayS;
  const pull = e === undefined ? .5 + .5 * Math.sin(t * 2.6) : 0, l = [1, 1, 1, 1, 1, 1]; let fly = '';
  if (e !== undefined) FLY12.forEach(([i, t0, lx], n) => { const k = cl((e - t0) / .5); if (k > 0) l[i] = 0; if (k <= 0) return;
    const x = lerp(KX, lx, k), y = lerp(KY, 1492, k * k) - 230 * Math.sin(Math.PI * k) * (1 - k * .3), rot = (n % 2 ? -1 : 1) * 200 * k + (k >= 1 ? 0 : 0), sq = k >= 1 ? 1 + .25 * Math.exp(-(e - t0 - .5) * 6) * Math.cos((e - t0 - .5) * 20) : 1;
    const inner = i === 5 ? L.muscle(t, 0) + L.tendon(false) + L.patella() : i === 4 ? L.caps() : i === 3 ? L.cruc() + L.coll() : i === 2 ? L.menL() + L.menR() : L.cartF() + L.cartT();
    fly += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (k >= 1 ? (n % 2 ? -200 : 200) + 70 : rot).toFixed(0) + ') scale(' + (.42 * sq).toFixed(3) + ' ' + (.42 / sq).toFixed(3) + ')">' + inner + '</g>'; });
  const gone = e === undefined ? 6 : 1 + FLY12.filter(([i, t0]) => e < t0).length;
  let s = saalS(t, { rows: ROWS12, on: gone, cur: e === undefined && lt > .6 && lt < 3.2 ? 6 : 0 });
  s += kneeS(KX, KY, KZ, t, { l: l, pat: e === undefined || e < 0 ? 1 : 0, pull: pull, q: e !== undefined ? cl((e - .6) / .3) : 0 });
  if (e === undefined && lt > .6 && lt < 3.2) s += markS(t, 0, -60, 62);
  s += fly; if (hit !== undefined && hit < 1.1) s += word7('PLOPP!', 640, 1462, hit, '#FFE14D', -5);
  return W('<g transform="translate(' + (sh[0] * .4) + ' ' + (sh[1] * .4) + ')">' + s + '</g>' + shade3()); };
WMASC.h12knie = (ev, t, lt) => { const e = ev.gag;
  if (e === undefined) return stay3([220, 1537], 1, { r: -3 + 2 * Math.sin(t * 2) });
  const x = e < .45 ? lerp(220, 150, ease(cl(e / .35))) : e < 1.6 ? 150 + (e > .9 && e < 1.3 ? 3 * Math.sin(t * 40) : 0) : lerp(150, 220, ease(cl((e - 1.6) / .5)));
  return stay3([x, 1537 - (e > .9 && e < 1.25 ? 40 * Math.sin(Math.PI * (e - .9) / .35) : 0)], 1, { r: e < .45 ? -14 : e < 1.6 ? -18 : 8 * cl(1 - (e - 1.6) / .6), nospin: 1 }); };

// ---------- Teil 1: Schicht 1 Knochen, Schicht 2 Knorpel ----------
WORLD.b12a = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, bn = cl((lt - .2) / .8), ca = p2 === undefined ? 0 : cl((p2 - .5) / .8);
  const hlB = p1 !== undefined || p === undefined ? '' : p > 1.0 && p < 1.9 ? 'f' : p >= 1.9 && p < 2.8 ? 't' : p >= 2.8 && p < 3.9 ? 'p' : '';
  const rub = p1 !== undefined && p2 === undefined ? cl(p1 / .3) : 0, fdx = 8 * rub * Math.sin(t * 9);
  let s = saalS(t, { rows: ROWS12, on: bn + ca, cur: p2 !== undefined ? 2 : 1 });
  s += kneeS(KX, KY, KZ, t, { l: [bn, ca, 0, 0, 0, 0], pat: 0, hlB: hlB, fdx: fdx, fdy: rub ? 9 : 0, q: cl((lt - 1.2) / .4) });
  if (rub) for (const sx of [-1, 1]) s += '<path d="M' + (KX + sx * 58 * KZ - 12) + ' ' + (KY + 8) + ' l8 -9 l8 9 l8 -9" stroke="#A8E63C" stroke-width="5" fill="none" stroke-linecap="round" opacity="' + (.5 + .5 * Math.sin(t * 18 + sx)).toFixed(2) + '"/>';
  if (p2 !== undefined) s += ringS(t, 0, 4, 120, (p2 - .5) / .7);
  if (a !== undefined) s += lupeS(lupRF(t, false), a / .35, KX - 62 * KZ, KY + 6) + markS(t, -92, 4, 30) + markS(t, 92, 4, 30);
  s += puffb(KX, KY, (lt - .15) / .6, 240);
  return W(s + shade3(), slot(ev, [['panel', 'Schicht 1: Knochen'], ['p1', 'Knochen auf Knochen reibt', 'hot'], ['p2', 'Schicht 2: Knorpel'], ['act', 'Rund auf flach: Lücken', 'hot']])); };
WMASC.b12a = (ev, t) => { const p1 = ev.p1; if (p1 !== undefined && ev.p2 === undefined && p1 > .3 && p1 < 2.2) return stay3([220 + 5 * Math.sin(t * 9), 1537], 1, { r: 5 * Math.sin(t * 9), nospin: 1 }); if (ev.act !== undefined) return stay3([lerp(220, 250, ease(cl(ev.act / .4))), 1537], 1, { r: 9 }); return BIG3(); };

// ---------- Teil 2: Schicht 3 Menisken, Schicht 4 Baender ----------
WORLD.b12b = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, me = cl((lt - .5) / .8), lg = p2 === undefined ? 0 : cl((p2 - 1.3) / .6);
  const bnc = p1 !== undefined && p2 === undefined ? 7 * Math.abs(Math.sin(t * 5)) * cl(p1 / .3) : 0, sl = p2 !== undefined && p2 < 1.5 ? 16 * Math.sin(cl(p2 / 1.3) * Math.PI * 3) * (1 - cl((p2 - 1.1) / .4)) : 0;
  let s = saalS(t, { rows: ROWS12, on: 2 + me + lg, cur: p2 !== undefined ? 4 : 3 });
  s += kneeS(KX, KY, KZ, t, { l: [1, 1, me, lg, 0, 0], pat: 0, fdx: sl, fdy: -bnc, q: 1 });
  if (p2 === undefined) s += lupeS(p1 !== undefined ? lupRF(t, true) : (lt < .5 ? lupRF(t, false) : lupTop()), 1, KX - 62 * KZ, KY + 6);
  if (p2 !== undefined) s += ringS(t, 0, 0, 130, (p2 - 1.3) / .7);
  if (a !== undefined) s += a < 1.5 ? markS(t, 0, -14, 44) : markS(t, -112, 0, 40) + markS(t, 114, 0, 40);
  return W(s + shade3(), slot(ev, [['panel', 'Schicht 3: Menisken'], ['p1', 'Gleichen aus, dämpfen Stöße', 'hot'], ['p2', 'Schicht 4: Bänder'], ['act', '2 Kreuzbänder, 2 Seitenbänder', 'hot']])); };
WMASC.b12b = (ev, t) => { const p1 = ev.p1; if (p1 !== undefined && ev.p2 === undefined && p1 > .2 && p1 < 2.4) return stay3([220, 1537 - 18 * Math.abs(Math.sin(t * 5))], 1, { nospin: 1 }); if (ev.p2 !== undefined && ev.p2 < 1.3) return stay3([220 + 10 * Math.sin(cl(ev.p2 / 1.3) * Math.PI * 3), 1537], 1, { r: 8 * Math.sin(cl(ev.p2 / 1.3) * Math.PI * 3), nospin: 1 }); return BIG3(); };

// ---------- Teil 3: Schicht 5 Kapsel mit Gelenkfluessigkeit, Schicht 6 Sehne mit Kniescheibe ----------
WORLD.b12c = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, cp = cl((lt - .5) / .9), te = p2 === undefined ? 0 : cl((p2 - .5) / 1.2), pat = a === undefined ? 0 : cl((a - .3) / .7), pull = a !== undefined && a > 1.2 ? .5 - .5 * Math.cos((a - 1.2) * 3.4) : 0;
  let s = saalS(t, { rows: ROWS12, on: 4 + cp + te, cur: p2 !== undefined ? 6 : 5 });
  s += kneeS(KX, KY, KZ, t, { l: [1, 1, 1, 1, cp, te], pat: pat, pull: pull, q: 1 - pat });
  if (p1 !== undefined && p2 === undefined) s += markS(t, 0, 6, 118);
  if (a !== undefined && a > 1.2) s += lupeS(lupHeb(t, cl((a - 1.5) / .6)), (a - 1.2) / .35, KX - 30 * KZ, KY - 40 * KZ);
  if (a !== undefined) s += ringS(t, 0, -58, 60, (a - .9) / .6);
  return W(s + shade3(), slot(ev, [['panel', 'Schicht 5: Kapsel'], ['p1', 'Flüssigkeit schmiert und ernährt', 'hot'], ['p2', 'Schicht 6: Sehne'], ['act', 'Kniescheibe: mehr Abstand, mehr Hebel', 'hot']])); };
WMASC.b12c = (ev, t) => { const a = ev.act; if (a !== undefined && a > .9 && a < 2.6) return stay3([220, 1537 - 22 * Math.abs(Math.sin((a - .9) * 4))], 1, { r: 10 * Math.sin((a - .9) * 4), nospin: 1 }); return BIG3(); };

// ---------- Schluss: fertiges Knie, je zwei Schichten leuchten zu den drei Merksaetzen ----------
WORLD.b12out = function (sc, ev, t, lt) { const c1 = ev.c1, c2 = ev.c2, c3 = ev.c3, sv = ev.save, k = sv === undefined ? 0 : ease(cl(sv / .5)), z = KZ * lerp(1, .7, k), y = 1116 - 208 * z;
  const cur = sv !== undefined ? 0 : c3 !== undefined ? 6 : c2 !== undefined ? 4 : c1 !== undefined ? 2 : 0;
  let s = saalS(t, { rows: ROWS12, on: 6, cur: cur, noList: sv !== undefined });
  s += kneeS(KX, y, z, t, { l: [1, 1, 1, 1, 1, 1], pat: 1, pull: .5 + .5 * Math.sin(t * 2.6) });
  if (cur && cur > 1) s += '<rect x="88" y="' + (800 + (cur - 2) * 46 - 34) + '" width="338" height="44" rx="10" fill="#A8E63C" opacity=".2"/>';
  return W(s + '<rect width="1080" height="1920" fill="#02030F" opacity=".3"/>' + shade3()); };
['h12knie', 'b12a', 'b12b', 'b12c', 'b12out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
