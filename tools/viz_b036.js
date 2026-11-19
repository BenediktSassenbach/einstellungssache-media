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

// ---- Test (Benedikt, 19.11.2026, noch keine Regel): Ein Schulskelett tanzt zu einem eigenen Song und zeigt, was die Huefte kann.
// Fassung A: Schalti spricht ueber den Tanz (Schluss, Zeilen m1/m2). Fassung B: nur Tanz und Musik in der Pause nach Teil 3 ("tanz": Sekunden im Skript).
const SK = { HJ: 42, L1: 112, L2: 104 };
const skTap = (p0, p1, w0, w1) => mTap(p0, p1, w0, w1);
// Glied mit Verjuengung (auch fuer das Skelett)
function mTap(p0, p1, w0, w1) { const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, P = (p, w, sg) => (p[0] + sg * nx * w / 2).toFixed(1) + ' ' + (p[1] + sg * ny * w / 2).toFixed(1);
  return '<path d="M' + P(p0, w0, 1) + ' L' + P(p1, w1, 1) + ' L' + P(p1, w1, -1) + ' L' + P(p0, w0, -1) + ' Z" fill="#fff"/><circle cx="' + p0[0].toFixed(1) + '" cy="' + p0[1].toFixed(1) + '" r="' + (w0 / 2) + '" fill="#fff"/><circle cx="' + p1[0].toFixed(1) + '" cy="' + p1[1].toFixed(1) + '" r="' + (w1 / 2) + '" fill="#fff"/>'; }
const pol = (p, L, deg) => [p[0] + L * Math.sin(deg * Math.PI / 180), p[1] + L * Math.cos(deg * Math.PI / 180)];
const P2 = p => p[0].toFixed(1) + ' ' + p[1].toFixed(1);
// Bein von vorn. sd = -1 rechtes Bein der Person (links im Bild), +1 linkes. o.flex Beugen (Grad, perspektivisch), o.abd Abspreizen, o.rot Drehen (+ = nach aussen)
function skLeg(sd, o) { const H = [sd * SK.HJ, 4], f = (o.flex || 0) * Math.PI / 180, ab = sd * (o.abd || 0), r = (o.rot || 0) * sd;
  const K = [H[0] + SK.L1 * Math.sin(ab * Math.PI / 180), H[1] + SK.L1 * Math.cos(ab * Math.PI / 180) * Math.cos(f)], A = pol(K, SK.L2 * (1 - .12 * Math.sin(f)), ab * .9 - sd * 10 * Math.sin(f)), sr = Math.sin(r * Math.PI / 180);
  const T = [H[0] + sd * 15, H[1] + 9], sh0 = [H[0] + sd * 9, H[1] + 14];
  let b = mTap(H, T, 13, 15) + mTap(sh0, [K[0] + sd * 2, K[1] - 8], 15, 12) + '<ellipse cx="' + K[0].toFixed(1) + '" cy="' + (K[1] - 2).toFixed(1) + '" rx="14" ry="9" fill="#fff"/>';
  b += mTap([K[0] - sd * 2, K[1] + 7], [A[0] - sd * 2, A[1]], 14, 9) + mTap([K[0] + sd * 9, K[1] + 9], [A[0] + sd * 7, A[1] - 2], 5, 4);
  b += mTap([A[0], A[1] + 4], [A[0] + 22 * sr, A[1] + 22], 15, 10) + '<circle cx="' + H[0] + '" cy="' + H[1] + '" r="11" fill="#fff"/>';
  const pat = '<ellipse cx="' + (K[0] + 7 * sr).toFixed(1) + '" cy="' + (K[1] - 6).toFixed(1) + '" rx="6" ry="8" fill="#fff"/>';
  return { H, K, A, s: b + pat }; }
// Arm von vorn: Schulter S, Oberarm-Winkel a (Grad von unten, + nach aussen), Ellbogen-Winkel e
function skArm(sd, a, e) { const S = [sd * 62, -160], E = pol(S, 66, sd * a), W2 = pol(E, 58, sd * (a + e));
  let s = mTap(S, E, 12, 9) + mTap(E, W2, 6, 5) + mTap([E[0] + sd * 4, E[1]], [W2[0] + sd * 4, W2[1]], 5, 4) + '<circle cx="' + P2(S) + '" r="1" fill="#fff"/>'.replace('cx="' + P2(S) + '"', 'cx="' + S[0].toFixed(1) + '" cy="' + S[1].toFixed(1) + '"').replace('r="1"', 'r="10"');
  const Hd = pol(W2, 10, sd * (a + e)); s += '<ellipse cx="' + Hd[0].toFixed(1) + '" cy="' + Hd[1].toFixed(1) + '" rx="8" ry="10" fill="#fff"/>';
  for (let i = -1.5; i <= 1.5; i++) { const F0 = [Hd[0] + i * 4, Hd[1]], F1 = pol(F0, 16, sd * (a + e) + i * 8); s += mTap(F0, F1, 3, 2.4); }
  return s; }
// Ganzes Schulskelett. o.L / o.R Beinstellungen, o.armL / o.armR [a, e], o.bob Hoch-Runter, o.sh Becken seitlich, o.glow Leuchten der Hueftgelenke
function skelS(x, y, s, t, o) { o = o || {}; const lR = skLeg(-1, o.R || {}), lL = skLeg(1, o.L || {}), aR = o.armR || [8, 10], aL = o.armL || [8, 10];
  let b = '';
  // Wirbelsaeule hinter den Rippen
  for (let i = 0; i < 9; i++) b += '<rect x="-8" y="' + (-178 + i * 9) + '" width="16" height="7" rx="3" fill="#fff"/>';
  for (let i = 0; i < 5; i++) b += '<rect x="-12" y="' + (-92 + i * 12) + '" width="24" height="10" rx="4" fill="#fff"/>';
  // Rippen und Brustbein
  for (let i = 0; i < 7; i++) { const y0 = -156 + i * 11, w = i < 4 ? 40 + i * 6 : 58 - (i - 3) * 3; for (const sd of [-1, 1]) b += '<path d="M' + sd * 6 + ' ' + y0 + ' C' + sd * w * .9 + ' ' + (y0 - 8) + ' ' + sd * (w + 4) + ' ' + (y0 + 12) + ' ' + sd * w * .8 + ' ' + (y0 + 24) + '" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>'; }
  b += mTap([0, -160], [0, -98], 12, 8);
  // Schluesselbeine, Schaedel mit Unterkiefer, Halswirbel
  b += mTap([-6, -168], [-60, -162], 9, 8) + mTap([6, -168], [60, -162], 9, 8) + '<ellipse cx="0" cy="-226" rx="31" ry="35" fill="#fff"/><path d="M-21 -210 Q-22 -188 0 -184 Q22 -188 21 -210 Z" fill="#fff"/>';
  for (let i = 0; i < 2; i++) b += '<rect x="-7" y="' + (-184 + i * 8) + '" width="14" height="6" rx="3" fill="#fff"/>';
  // Becken von vorn
  b += '<path d="M-8 -22 C-26 -40 -58 -46 -68 -26 C-74 -12 -64 0 -54 6 C-50 18 -38 28 -22 32 C-12 34 -5 28 0 27 C5 28 12 34 22 32 C38 28 50 18 54 6 C64 0 74 -12 68 -26 C58 -46 26 -40 8 -22 Z" fill="#fff"/><path d="M-50 -30 C-40 -16 -24 -12 -12 -14 M50 -30 C40 -16 24 -12 12 -14" stroke="#9a9a9a" stroke-width="5" fill="none"/>';
  b += skArm(-1, aR[0], aR[1]) + skArm(1, aL[0], aL[1]) + lR.s + lL.s;
  let d = '<g fill="#2A1E10"><ellipse cx="-12" cy="-228" rx="8.5" ry="9.5"/><ellipse cx="12" cy="-228" rx="8.5" ry="9.5"/><path d="M0 -218 l-5 10 h10 Z"/><ellipse cx="-22" cy="24" rx="9" ry="7" opacity=".85"/><ellipse cx="22" cy="24" rx="9" ry="7" opacity=".85"/><path d="M-10 -20 C-6 -6 6 -6 10 -20 C6 -26 -6 -26 -10 -20 Z" opacity=".25"/></g><path d="M-15 -196 H15 M-10 -200 V-192 M-5 -200 V-192 M0 -200 V-192 M5 -200 V-192 M10 -200 V-192" stroke="#2A1E10" stroke-width="1.6" opacity=".7"/>';
  const g = o.glow || [1, 1]; let gl = ''; [[lR.H, g[0]], [lL.H, g[1]]].forEach(([H, k]) => { gl += '<g opacity="' + cl(.45 + .55 * k).toFixed(2) + '"><circle cx="' + H[0] + '" cy="' + H[1] + '" r="' + (18 + 8 * k).toFixed(1) + '" fill="#3FB4FF" opacity=".5" filter="url(#hCGlow)"/><circle cx="' + H[0] + '" cy="' + H[1] + '" r="12" fill="none" stroke="url(#hCart)" stroke-width="4.5"/><path d="M' + (H[0] - 15) + ' ' + (H[1] - 5) + ' A16 16 0 0 1 ' + (H[0] + 15) + ' ' + (H[1] - 5) + '" stroke="#1FE8C8" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>'; });
  return '<g transform="translate(' + (x + (o.sh || 0)).toFixed(1) + ' ' + (y - (o.bob || 0)).toFixed(1) + ') scale(' + s + ')">' + HDEF + '<ellipse cx="0" cy="' + (238 + (o.bob || 0) / s).toFixed(1) + '" rx="96" ry="9" fill="#000" opacity=".35"/><g filter="url(#hBone)">' + b + '</g>' + d + gl + '</g>'; }
// Tanz: Phase 0 Beugen und Strecken (Marsch, Knie hoch), Phase 1 Abspreizen (Seitkick), Phase 2 Drehen (Twist). v = Sekunden in der Phase, Takt 120 BPM
function danceP(ph, v) { const c = Math.sin(2 * Math.PI * v), bob = 8 * Math.abs(Math.sin(2 * Math.PI * v)), o = { bob: bob };
  if (ph === 0) { o.L = { flex: 82 * Math.max(0, c) }; o.R = { flex: 82 * Math.max(0, -c) }; o.armL = [12 + 30 * Math.max(0, -c), 20 + 60 * Math.max(0, -c)]; o.armR = [12 + 30 * Math.max(0, c), 20 + 60 * Math.max(0, c)]; o.glow = [Math.max(0, -c), Math.max(0, c)]; }
  else if (ph === 1) { const k = Math.sin(Math.PI * v * 1.6); o.L = { abd: 40 * Math.max(0, k) }; o.R = { abd: 40 * Math.max(0, -k) }; o.sh = -14 * k; o.armL = [80 + 30 * Math.max(0, k), 30]; o.armR = [80 + 30 * Math.max(0, -k), 30]; o.glow = [Math.max(0, k), Math.max(0, -k)]; }
  else { o.L = { rot: 38 * c, flex: 14 }; o.R = { rot: -38 * c, flex: 14 }; o.sh = -8 * c; o.bob = 10 + 4 * Math.abs(c); o.armL = [40 + 20 * c, 90]; o.armR = [40 - 20 * c, 90]; o.glow = [Math.abs(c), Math.abs(c)]; }
  return o; }
const DLAB = ['Beugen und Strecken', 'Abspreizen', 'Drehen nach innen und außen'];
function danceW(t, u, D, cuts, s) { const ph = u < cuts[0] ? 0 : u < cuts[1] ? 1 : 2, v = u - (ph === 0 ? 0 : cuts[ph - 1]), o = danceP(ph, v);
  let w = skelS(HX, 922, .88, t, o);
  // Taktlicht: zwei weiche Spots im Rhythmus
  const beat = Math.pow(Math.max(0, Math.cos(2 * Math.PI * u)), 6); w = '<ellipse cx="' + HX + '" cy="1130" rx="' + (200 + 30 * beat).toFixed(0) + '" ry="34" fill="#A8E63C" opacity="' + (.12 + .18 * beat).toFixed(2) + '"/>' + w;
  return { w: w, lab: slot({ d: v }, [['d', DLAB[ph]]]) }; }
// Fassung A: Schluss mit Tanz waehrend m1/m2, danach das Modell
const out36 = WORLD.b36out;
WORLD.b36out = function (sc, ev, t, lt, E) { const m1 = ev.m1, c1 = ev.c1;
  if (m1 === undefined || (c1 !== undefined && c1 > .5)) return out36(sc, ev, t, lt, E);
  const L1 = sc.lines[0], L2 = sc.lines[1], u = t - L1.start, D = L2.end - L1.start, cuts = [L1.end - L1.start, L1.end - L1.start + (L2.end - L2.start) * .5];
  let s = laborS(t, { rows: ROWS36, cx: HX, noList: true, on: 6 }); const dw = danceW(t, u, D, cuts);
  const outK = c1 === undefined ? 1 : 1 - cl(c1 / .5);
  s += '<g opacity="' + (cl(lt / .4) * outK).toFixed(2) + '">' + dw.w + '</g>';
  if (c1 !== undefined) s += '<g opacity="' + cl(c1 / .5).toFixed(2) + '">' + hipS(HX, HY, HZ, t, { l: [1, 1, 1, 1, 1, 1] }) + '</g>';
  return look3(W(s + shadeS(), c1 === undefined ? dw.lab : ''), sc, t, lt, '#A8E63C'); };
// Fassung B: nach dem letzten Satz von Teil 3 tanzt das Skelett in der Pause ("tanz" Sekunden), ohne Sprache
const c36 = WORLD.b36c;
WORLD.b36c = function (sc, ev, t, lt, E) { const L = sc.lines[sc.lines.length - 1], D = (typeof S !== 'undefined' && S.tanz) || 0, u = t - L.end - .15;
  if (!D || u < 0) return c36(sc, ev, t, lt, E);
  let s = laborS(t, { rows: ROWS36, cx: HX, noList: true, on: 6 }); const dw = danceW(t, u, D, [D / 3, 2 * D / 3]);
  s += '<g opacity="' + cl(u / .35).toFixed(2) + '">' + dw.w + '</g>';
  if (u < .35) s += '<g opacity="' + (1 - cl(u / .35)).toFixed(2) + '">' + hipS(HX, HY, HZ, t, { l: [1, 1, 1, 1, 1, 1] }) + '</g>';
  return look3(W(s + shadeS(), dw.lab), sc, t, lt, '#A8E63C'); };
