// B025 Schicht fuer Schicht, Folge 2: Wie ist dein Gehirn aufgebaut? (Skript Schicht fuer Schicht Anatomie)
// Test (Benedikt, 17.11.2026): gaengigster deutscher Begriff im Text und gross auf dem Schildchen, der lateinische Fachbegriff kurz gesprochen und kursiv darunter.
const GX = 596, GY = 912, GZ = 1.0, NOTE25 = 'linke Hirnhälfte, von der Seite';
const GL = (lx, ly, tx, ty, de, la, k) => labelL(Math.round(GX + lx * GZ), Math.round(GY + ly * GZ), tx, ty, de, la, k);
const ROWS25 = [['Hirnstamm', COLS.stem], ['Kleinhirn', COLS.cb], ['Großhirn', COLS.cer], ['Hirnrinde', COLS.cor], ['Hirnhäute', COLS.mng], ['Schädel', COLS.bone]];
const markG = (t, lx, ly, r) => '<circle cx="' + (GX + lx * GZ) + '" cy="' + (GY + ly * GZ) + '" r="' + r + '" fill="none" stroke="' + TH().hl + '" stroke-width="6" stroke-dasharray="16 10" opacity="' + (.7 + .3 * Math.sin(t * 5)).toFixed(2) + '"/>';
const ringG = (lx, ly, r, k) => k > 0 && k < 1 ? '<circle cx="' + (GX + lx * GZ) + '" cy="' + (GY + ly * GZ) + '" r="' + (r * (1 + .5 * k)).toFixed(0) + '" fill="none" stroke="' + TH().hl + '" stroke-width="8" opacity="' + (1 - k).toFixed(2) + '"/>' : '';
const bobG = t => 6 * Math.sin(t * 1.8);
// ---------- Einstieg: fertiger Kopf im Schnitt, das Gehirn schwimmt. Im Gag fliegen Schaedel, Hirnhaeute, Rinde, Grosshirn und Kleinhirn ab ----------
const gag25 = (sc, t) => { const L = sc.lines, g = typeof S !== 'undefined' && S.gagAt ? L[0].start + S.gagAt : L[L.length - 1].end + .15; return t >= g ? t - g : undefined; };
const FLY25 = [[5, 0, 650], [4, .1, 540], [3, .2, 450], [2, .3, 600], [1, .4, 500]];
WORLD.h25hirn = function (sc, ev, t, lt) { const e = gag25(sc, t), hit = e !== undefined && e >= .9 ? e - .9 : undefined, sh = shake7(hit, t), L = brainLayS, l = [1, 1, 1, 1, 1, 1]; let fly = '';
  if (e !== undefined) FLY25.forEach(([i, t0, lx], n) => { const k = cl((e - t0) / .5); if (k > 0) l[i] = 0; if (k <= 0) return;
    const x = lerp(GX, lx, k), y = lerp(GY, 1492, k * k) - 230 * Math.sin(Math.PI * k) * (1 - k * .3), rot = (n % 2 ? -1 : 1) * 18 * ease(k);
    const inner = i === 5 ? L.skull() : i === 4 ? L.liq(t) + L.mng() : i === 3 ? L.cor(1) : i === 2 ? L.cer() : L.cb();
    fly += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + rot.toFixed(0) + ') scale(.3)">' + BDEF + inner + '</g>'; });
  const gone = e === undefined ? 6 : 1 + FLY25.filter(([i, t0]) => e < t0).length;
  let s = laborS(t, { rows: ROWS25, on: gone, cur: e === undefined && lt > .5 && lt < 3 ? 5 : 0, cx: GX, note: NOTE25 });
  s += brainS(GX, GY, GZ, t, { l: l, bob: e === undefined ? bobG(t) * 1.6 : 0 });
  if (e === undefined && lt > .4 && lt < 3.4) s += GL(-150, -128, 740, 740, 'Hirnwasser', 'Liquor', (lt - .5) / .4);
  s += fly;
  return W('<g transform="translate(' + (sh[0] * .4) + ' ' + (sh[1] * .4) + ')">' + s + '</g>' + shadeS()); };
WMASC.h25hirn = (ev, t, lt, sc) => { const e = gag25(sc, t);
  if (e === undefined) return stay3([220, 1537 - 6 * Math.sin(t * 1.8)], 1, { r: -3 + 2 * Math.sin(t * 2) });
  const x = e < .45 ? lerp(220, 150, ease(cl(e / .35))) : e < 1.6 ? 150 + (e > .9 && e < 1.3 ? 3 * Math.sin(t * 40) : 0) : lerp(150, 220, ease(cl((e - 1.6) / .5)));
  return stay3([x, 1537 - (e > .9 && e < 1.25 ? 40 * Math.sin(Math.PI * (e - .9) / .35) : 0)], 1, { r: e < .45 ? -14 : e < 1.6 ? -18 : 8 * cl(1 - (e - 1.6) / .6), nospin: 1 }); };

// ---------- Teil 1: Schicht 1 Hirnstamm, Schicht 2 Kleinhirn ----------
WORLD.b25a = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, st = cl((lt - .2) / .8), cb = p2 === undefined ? 0 : cl((p2 - 1.6) / .7);
  let s = laborS(t, { rows: ROWS25, on: st + cb, cur: p2 !== undefined ? 2 : 1, cx: GX, note: NOTE25 });
  // Kleinhirn-Vergleich: Grosshirn gestrichelt als Umriss, wenige Punkte darin, im Kleinhirn viele
  if (a !== undefined) { const k = cl((a - .2) / .5); let d = ''; for (let i = 0; i < 14; i++) d += '<circle cx="' + (-130 + 260 * rndB(i + 500)).toFixed(0) + '" cy="' + (-130 + 160 * rndB(i + 700)).toFixed(0) + '" r="3" fill="' + TH().txt + '" opacity=".7"/>';
    s += '<g opacity="' + k.toFixed(2) + '" transform="translate(' + GX + ' ' + GY + ') scale(' + GZ + ')"><path d="' + BCER + '" fill="none" stroke="' + TH().txt + '" stroke-width="4" stroke-dasharray="14 10" opacity=".6"/>' + d + '</g>'; }
  s += brainS(GX, GY, GZ, t, { l: [st, cb, 0, 0, 0, 0], hl: p1 !== undefined && p2 === undefined ? 'st' : '', dots: a === undefined ? 0 : cl((a - .5) / 1.2) });
  if (p1 !== undefined && p2 === undefined) { for (let i = 0; i < 2; i++) { const q = (t * .9 + i * .5) % 1; s += '<circle cx="' + (GX + 30 * GZ) + '" cy="' + (GY + 110 * GZ) + '" r="' + (40 + 70 * q).toFixed(0) + '" fill="none" stroke="' + TH().hl + '" stroke-width="5" opacity="' + (.8 * (1 - q)).toFixed(2) + '"/>'; } }
  if (p2 === undefined && p !== undefined) s += GL(30, 160, 712, 1070, 'Hirnstamm', 'Truncus encephali', (p - .9) / .4);
  if (p2 !== undefined) s += ringG(116, 90, 90, (p2 - 1.6) / .7) + GL(166, 96, 790, 1040, 'Kleinhirn', 'Cerebellum', (p2 - 1.9) / .4);
  if (a !== undefined) s += markG(t, 116, 90, 70);
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 1: Hirnstamm'], ['p1', 'Atmung und Herzschlag', 'hot'], ['p2', 'Schicht 2: Kleinhirn'], ['act', 'Klein, aber mehr Nervenzellen', 'hot']])); };
// Ohne Kleinhirn wackelt Schalti, sobald es sitzt, steht er still
WMASC.b25a = (ev, t) => { const p2 = ev.p2; if (ev.p1 !== undefined && p2 === undefined) return stay3([220, 1537], 1 + .03 * Math.sin(t * 3.2), { nospin: 1 });
  if (p2 !== undefined && p2 < 2.2) { const w = 1 - cl((p2 - 1.6) / .5); return stay3([220 + 12 * w * Math.sin(t * 7), 1537], 1, { r: 12 * w * Math.sin(t * 7), nospin: 1 }); } return BIG3(); };

// ---------- Teil 2: Schicht 3 Grosshirn, Schicht 4 Hirnrinde ----------
WORLD.b25b = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, ce = cl((lt - .4) / .9), co = p2 === undefined ? 0 : cl((p2 - 1.4) / .8), fold = a !== undefined ? cl(.25 + (a - .2) / 1.6) : co * .25;
  let s = laborS(t, { rows: ROWS25, on: 2 + ce + co, cur: p2 !== undefined ? 4 : 3, cx: GX, note: NOTE25 });
  s += brainS(GX, GY, GZ, t, { l: [1, 1, ce, co, 0, 0], fold: fold, hl: p1 !== undefined && p2 === undefined && Math.sin(t * 4) > .3 ? 'cer' : '' });
  // Denken, Sprechen, Erinnern: drei weiche Lichtwellen laufen ueber das Grosshirn (keine Zuordnung zu Regionen)
  if (p1 !== undefined && p2 === undefined) for (let i = 0; i < 3; i++) { const q = cl((p1 - .2 - i * .8) / 1.2); if (q > 0 && q < 1) s += '<ellipse cx="' + (GX + lerp(-130, 130, q) * GZ) + '" cy="' + (GY - 60 * GZ) + '" rx="60" ry="80" fill="' + TH().hl + '" opacity="' + (.18 * Math.sin(Math.PI * q)).toFixed(2) + '"/>'; }
  if (p !== undefined && p2 === undefined) s += GL(-60, -140, 740, 740, 'Großhirn', 'Cerebrum', (p - 1.0) / .4) + lupeS(lupTopB(), (p - 2.4) / .35, GX - 40 * GZ, GY - 120 * GZ);
  if (p2 !== undefined) s += ringG(0, -50, 170, (p2 - 1.4) / .8) + GL(120, -110, 760, 740, 'Hirnrinde', 'Cortex cerebri', (p2 - 1.7) / .4) + (a === undefined ? lupeS(lupCor(), (p2 - 2.6) / .35, GX + 90 * GZ, GY - 120 * GZ) : '');
  if (a !== undefined) s += lupeS(lupFold(cl((a - .3) / 2)), 1, GX - 60 * GZ, GY - 90 * GZ);
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 3: Großhirn'], ['p1', 'Denken, sprechen, erinnern', 'hot'], ['p2', 'Schicht 4: Hirnrinde'], ['act', 'Gefaltet für mehr Fläche', 'hot']])); };
WMASC.b25b = (ev, t) => { if (ev.p1 !== undefined && ev.p2 === undefined) return stay3([220, 1537], 1, { r: -8 + 3 * Math.sin(t * 2), nospin: 1 }); if (ev.act !== undefined && ev.act > .3 && ev.act < 2.3) return stay3([220, 1537], 1 - .06 * Math.sin(Math.PI * cl((ev.act - .3) / 2)), { nospin: 1 }); return BIG3(); };

// ---------- Teil 3: Schicht 5 Hirnhaeute mit Hirnwasser, Schicht 6 Schaedel ----------
WORLD.b25c = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, mn = cl((lt - .4) / .9), sk = p2 === undefined ? 0 : cl((p2 - 1.2) / .7);
  const jolt = p1 !== undefined && p2 === undefined && p1 > .6 && p1 < 1.6 ? 1 - cl((p1 - .6) / 1) : 0;
  let s = laborS(t, { rows: ROWS25, on: 4 + mn + sk, cur: p2 !== undefined ? 6 : 5, cx: GX, note: NOTE25 });
  // Erschuetterung: die Huelle ruckt, das Gehirn im Hirnwasser folgt gedaempft
  const jx = 14 * jolt * Math.sin(t * 30), bob = mn * bobG(t) * (a !== undefined ? 1.8 : 1) - 8 * jolt * Math.sin(t * 9);
  s += '<g transform="translate(' + jx.toFixed(1) + ' 0)">' + brainS(GX, GY, GZ, t, { l: [1, 1, 1, 1, mn, sk], bob: bob }) + '</g>';
  if (p2 === undefined) s += GL(-150, -136, 740, 740, 'Hirnhäute', 'Meninges', (lt - 1.1) / .4) + GL(52, 180, 790, 1070, 'Hirnwasser', 'Liquor', (lt - 3.0) / .4);
  if (p2 !== undefined && a === undefined) s += ringG(8, -20, 190, (p2 - 1.2) / .7) + GL(170, -134, 790, 760, 'Schädel', 'Cranium', (p2 - 1.6) / .4);
  if (a !== undefined) { s += lupeS(lupAuf(cl((a - 1.4) / 1.4)), (a - .9) / .35, GX - 20 * GZ, GY + 40 * GZ);
    for (let i = 0; i < 3; i++) { const q = ((t * .8 + i / 3) % 1); s += '<path d="M' + (GX + (-80 + 80 * i) * GZ) + ' ' + (GY + (90 - 60 * q) * GZ).toFixed(0) + ' v-30 m0 0 l-10 12 m10 -12 l10 12" stroke="' + TH().hl + '" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + Math.sin(Math.PI * q).toFixed(2) + '"/>'; } }
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 5: Hirnhäute und Hirnwasser'], ['p1', 'Fängt Erschütterungen ab', 'hot'], ['p2', 'Schicht 6: Schädel'], ['act', 'Rund 97 Prozent leichter', 'hot']])); };
WMASC.b25c = (ev, t) => { const p2 = ev.p2; if (p2 !== undefined && p2 > 1.5 && p2 < 2.3) return stay3([220, 1537 - 40 * Math.sin(Math.PI * (p2 - 1.5) / .8)], 1, { nospin: 1 }); if (ev.act !== undefined) return stay3([220, 1537 - 8 * Math.sin(t * 1.8)], 1, { r: 4 * Math.sin(t * 1.8), nospin: 1 }); return BIG3(); };

// ---------- Schluss: fertiger Kopf, je zwei Schichten leuchten zu den drei Merksaetzen ----------
WORLD.b25out = function (sc, ev, t, lt) { const c1 = ev.c1, c2 = ev.c2, c3 = ev.c3, sv = ev.save, k = sv === undefined ? 0 : ease(cl(sv / .5)), z = GZ * lerp(1, .7, k), y = GY + 210 * GZ - 210 * z;
  const cur = sv !== undefined ? 0 : c3 !== undefined ? 6 : c2 !== undefined ? 4 : c1 !== undefined ? 2 : 0;
  let s = laborS(t, { rows: ROWS25, on: 6, cur: 0, noList: sv !== undefined, cx: GX, note: sv === undefined ? NOTE25 : '' });
  s += brainS(GX, y, z, t, { l: [1, 1, 1, 1, 1, 1], bob: bobG(t) });
  if (cur) for (const r of [cur - 1, cur]) s += '<rect x="50" y="' + (782 + (r - 1) * 45 - 31) + '" width="290" height="41" rx="9" fill="#A8E63C" opacity="' + (HELL() ? .5 : .22) + '"/>';
  return W(s + (HELL() ? '' : '<rect width="1080" height="1920" fill="#02030F" opacity=".3"/>') + shadeS()); };
['h25hirn', 'b25a', 'b25b', 'b25c', 'b25out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
