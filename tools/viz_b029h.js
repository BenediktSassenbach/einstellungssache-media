// B029H Schicht fuer Schicht, Folge 4 der Reihenfolge: Wie ist deine Schulter aufgebaut? (rechte Schulter von vorn, Pfanne im Schnitt). HOOK-PILOT wie P022H, stumme Demo v1 (20.11.2026).
// Grundskript Schicht fuer Schicht bleibt: Labor (laborS), Schichten-Anzeige, ein Modell, das waechst, feste Farben, Atlas-Look ueber die Lichtfilter aus viz_schicht.js (HDEF).
// Schichten: Knochen (Oberarmkopf, Schulterblatt mit Pfanne, im Bild auch Schulterhoehe und Schluesselbein), Knorpel, Gelenklippe, Kapsel, Rotatorenmanschette, Deltamuskel.
// Zum Loeschen: diese Datei und videos/B029H.
const SX29 = 640, SY29 = 905, SZ29 = .86, TX29 = 790;
const P29 = { scap: 'M-58 -78 Q-78 -100 -96 -104 Q-110 -140 -90 -168 Q-70 -186 -40 -176 Q-30 -168 -44 -160 Q-70 -160 -74 -140 Q-74 -122 -60 -114 L-130 -126 Q-200 -138 -256 -150 C-266 -60 -262 110 -246 238 Q-196 210 -150 150 Q-110 110 -82 92 Q-62 82 -58 66 Q-44 -6 -58 -78 Z',
  acro: 'M-170 -150 Q-70 -232 50 -204 Q98 -194 112 -172 Q84 -158 24 -166 Q-60 -170 -140 -126 Z',
  clav: 'M-300 -250 Q-160 -236 -60 -214 Q10 -200 52 -214 L58 -190 Q10 -176 -66 -190 Q-170 -210 -300 -222 Z',
  hum: 'M40 -97 A92 92 0 1 1 112 52 Q124 104 112 150 L106 290 L46 290 L50 160 Q46 110 2 82 A92 92 0 0 1 40 -97 Z',
  caps: 'M-64 -104 C10 -138 124 -118 142 -24 C154 38 136 92 114 116 C64 160 -12 150 -54 96 Q-40 0 -64 -104 Z',
  sup: 'M-250 -132 Q-150 -150 -40 -132 Q30 -122 70 -110 L64 -88 Q10 -100 -40 -108 Q-150 -112 -246 -100 Z',
  supT: 'M64 -112 Q110 -108 128 -76 L110 -66 Q96 -88 62 -90 Z',
  sub: 'M-246 10 Q-150 -10 -70 4 Q-20 12 10 30 L4 58 Q-30 42 -76 36 Q-160 34 -248 60 Z',
  subT: 'M8 28 Q40 34 54 52 L44 70 Q30 58 2 58 Z',
  del: 'M-80 -212 Q50 -248 138 -160 Q194 -70 164 70 Q146 170 118 238 L96 238 Q78 150 64 70 Q36 -50 -74 -168 Z' };
const ROWS29 = [['Knochen', COLS.bone], ['Knorpel', COLS.cart], ['Gelenklippe', COLS.men], ['Kapsel', COLS.cap], ['Manschette', COLS.mus], ['Deltamuskel', COLS.mus]];
const LAB29 = { rows: ROWS29, cx: SX29, note: 'Rechte Schulter, Pfanne im Schnitt', w: 340, fs: 29 };
const SL29 = (lx, ly, ty, de, la, k, tx) => labelL(Math.round(SX29 + lx * SZ29), Math.round(SY29 + ly * SZ29), tx || TX29, ty, de, la, k, 1);
// Kopf-Bogen (Knorpel), Mitte des Kopfes 40/-5, Radius 92
const ARC29 = (r, a0, a1) => { const P = a => [40 + r * Math.cos(a * Math.PI / 180), -5 + r * Math.sin(a * Math.PI / 180)]; const [x0, y0] = P(a0), [x1, y1] = P(a1); return 'M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1); };
const lay29 = {
  bone: () => '<g filter="url(#hBone)"><path d="' + P29.clav + '" fill="#fff"/><path d="' + P29.scap + '" fill="#fff"/><path d="' + P29.acro + '" fill="#fff"/></g><g fill="url(#hWarm)"><path d="' + P29.clav + '"/><path d="' + P29.scap + '"/><path d="' + P29.acro + '"/></g><g fill="none" stroke="#2A1E10" stroke-width="2.6" opacity=".7"><path d="' + P29.clav + '"/><path d="' + P29.scap + '"/><path d="' + P29.acro + '"/></g><path d="M-58 -78 Q-44 -6 -58 66" stroke="#C49A5C" stroke-width="5" fill="none"/>',
  hum: () => '<g filter="url(#hBone)"><path d="' + P29.hum + '" fill="#fff"/></g><path d="' + P29.hum + '" fill="url(#hWarm)"/><ellipse cx="10" cy="-50" rx="26" ry="14" transform="rotate(-35 10 -50)" fill="#fff" opacity=".45"/><path d="' + P29.hum + '" fill="none" stroke="#2A1E10" stroke-width="2.6" opacity=".7"/>',
  cartH: () => '<path d="' + ARC29(92, 130, 235) + '" stroke="#0E3A70" stroke-width="9" fill="none" stroke-linecap="round" opacity=".85"/><path d="' + ARC29(92, 130, 235) + '" stroke="url(#hCart)" stroke-width="6.5" fill="none" stroke-linecap="round"/>',
  cartP: () => '<path d="M-56 -72 Q-42 -6 -56 60" stroke="#0E3A70" stroke-width="9" fill="none" stroke-linecap="round" opacity=".85"/><path d="M-55 -72 Q-41 -6 -55 60" stroke="url(#hCart)" stroke-width="6.5" fill="none" stroke-linecap="round"/>',
  lab: () => '<g filter="url(#hMen)"><path d="M-62 -80 L-30 -92 L-44 -60 Z" fill="#fff"/><path d="M-62 68 L-30 82 L-44 50 Z" fill="#fff"/></g><g fill="none" stroke="#0B3A35" stroke-width="2.2" opacity=".8"><path d="M-62 -80 L-30 -92 L-44 -60 Z"/><path d="M-62 68 L-30 82 L-44 50 Z"/></g>',
  caps: () => '<path d="' + P29.caps + '" fill="url(#hCap)"/><path d="' + P29.caps + '" fill="none" stroke="#FF3D86" stroke-width="4" stroke-linejoin="round"/>',
  fluid: (t) => { let d = ''; for (let i = 0; i < 5; i++) { const y = -60 + i * 28 + 6 * Math.sin(t * 1.4 + i); d += '<circle cx="' + (-44 + 4 * Math.sin(t + i)).toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.4" fill="#fff" opacity=".95"/>'; } return '<path d="M-48 -70 Q-34 -6 -48 58" stroke="' + COLS.flu + '" stroke-width="6" fill="none" opacity=".85"/>' + d; },
  rc: () => '<g filter="url(#hMus)"><path d="' + P29.sup + '" fill="#fff"/><path d="' + P29.sub + '" fill="#fff"/></g><g fill="none" stroke="#4A0A1C" stroke-width="2.4" opacity=".7"><path d="' + P29.sup + '"/><path d="' + P29.sub + '"/></g><g filter="url(#hTen)"><path d="' + P29.supT + '" fill="#fff"/><path d="' + P29.subT + '" fill="#fff"/></g><g fill="none" stroke="#5A3A10" stroke-width="2" opacity=".7"><path d="' + P29.supT + '"/><path d="' + P29.subT + '"/></g>',
  del: (t) => { let f = ''; for (let i = 0; i < 11; i++) { const q = i / 10; f += 'M' + lerp(-70, 130, q).toFixed(0) + ' ' + lerp(-200, -170, q).toFixed(0) + ' Q' + lerp(40, 170, q).toFixed(0) + ' -40 ' + lerp(96, 118, q).toFixed(0) + ' 236 '; }
    return '<clipPath id="del29C"><path d="' + P29.del + '"/></clipPath><g opacity=".92"><g filter="url(#hMus)"><path d="' + P29.del + '" fill="#fff"/></g><g clip-path="url(#del29C)"><path d="' + f + '" stroke="#7A0F2A" stroke-width="1.4" fill="none" opacity=".45"/></g><path d="' + P29.del + '" fill="none" stroke="#4A0A1C" stroke-width="2.6" opacity=".7"/></g>'; }
};
// Ganze Schulter. o.l = sechs Werte 0..1, o.wob = Kopf rutscht (px), o.lift = Arm hebt sich (Grad)
function shoulder29(x, y, s, t, o) { o = o || {}; const l = o.l || [1, 1, 1, 1, 1, 1], L = lay29, g = (k, inner, tf) => k > 0 ? '<g opacity="' + cl(k).toFixed(2) + '"' + (tf ? ' transform="' + tf + '"' : '') + '>' + inner + '</g>' : '';
  const b = ease(cl(l[0])), wob = o.wob || 0, lift = o.lift || 0, hT = 'translate(0 ' + (wob + 160 * (1 - b)).toFixed(1) + ') rotate(' + (-lift).toFixed(1) + ' 40 -5)', pT = 'translate(0 ' + (-160 * (1 - b)).toFixed(1) + ')';
  let s2 = BDEF + HDEF + '<ellipse cx="60" cy="262" rx="' + (100 * b).toFixed(0) + '" ry="9" fill="#000" opacity=".35"/>';
  if (b > 0) s2 += '<g opacity="' + b.toFixed(2) + '"><g transform="' + pT + '"><path d="' + P29.scap + '" filter="url(#hGlow)"/></g><g transform="' + hT + '"><path d="' + P29.hum + '" filter="url(#hGlow)"/></g></g>';
  s2 += g(l[0], L.bone(), pT) + g(l[1], L.cartP(), pT) + g(l[3] * .999, L.fluid(t)) + g(l[0], L.hum(), hT) + g(l[1], L.cartH(), hT);
  const la = ease(cl(l[2])); s2 += g(l[2], L.lab(), pT + ' translate(-46 -6) scale(' + lerp(1.4, 1, la).toFixed(3) + ') translate(46 6)');
  const c = ease(cl(l[3])); s2 += g(l[3], L.caps(), 'translate(40 0) scale(' + lerp(.6, 1, c).toFixed(3) + ') translate(-40 0)');
  const r = ease(cl(l[4])); if (r > 0) s2 += '<clipPath id="rc29In"><rect x="-260" y="-240" width="' + (420 * r).toFixed(0) + '" height="400"/></clipPath><g clip-path="url(#rc29In)">' + L.rc() + '</g>';
  const m = ease(cl(l[5])); if (m > 0) s2 += '<clipPath id="del29In"><rect x="-120" y="-260" width="320" height="' + (520 * m).toFixed(0) + '"/></clipPath><g clip-path="url(#del29In)" transform="rotate(' + (-lift * .5).toFixed(1) + ' -20 -200)">' + L.del(t) + '</g>';
  return '<g id="schulterS" transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + s2 + '</g>'; }
const ring29 = (t, lx, ly, r) => '<circle cx="' + (SX29 + lx * SZ29).toFixed(0) + '" cy="' + (SY29 + ly * SZ29).toFixed(0) + '" r="' + r + '" fill="none" stroke="' + TH().hl + '" stroke-width="6" stroke-dasharray="16 10" opacity="' + (.7 + .3 * Math.sin(t * 5)).toFixed(2) + '"/>';

// ---------- Einstieg: fertige Schulter, beim Open Loop fallen die Schichten ab ----------
const FLY29 = [[5, 0, 640], [4, .12, 520], [3, .24, 460], [2, .36, 600], [1, .48, 500]];
WORLD.h29hook = function (sc, ev, t, lt) { const V2 = HV2(), Ls = sc.lines, gT = V2 ? Ls[Ls.length - 1].end + .15 : (ev.loop === undefined ? Infinity : Ls[1].start + .2), e = t >= gT ? t - gT : undefined, l = [1, 1, 1, 1, 1, 1]; let fly = '';
  if (e !== undefined) FLY29.forEach(([i, t0, lx]) => { const k = cl((e - t0) / .55); if (k > 0) l[i] = 0; if (k <= 0) return;
    const x = lerp(SX29, lx, k), y = lerp(SY29, 1492, k * k) - 220 * Math.sin(Math.PI * k) * (1 - k * .3), L = lay29;
    const inner = i === 5 ? L.del(t) : i === 4 ? L.rc() : i === 3 ? L.caps() : i === 2 ? L.lab() : L.cartH() + L.cartP();
    fly += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(.3)">' + BDEF + HDEF + inner + '</g>'; });
  const on = e === undefined ? 6 : 1 + FLY29.filter(([i, t0]) => e < t0).length;
  let s = laborS(t, Object.assign({}, LAB29, { on: on }));
  s += shoulder29(SX29, SY29, SZ29, t, { l: l, wob: e === undefined ? 0 : 6 * Math.sin(t * 6) });
  const fa = ev.fast; if (e === undefined && fa !== undefined && ev.loop === undefined) s += ring29(t, -50, -5, 76) + SL29(-50, -5, 1060, 'Pfanne', V2 ? 'flache Mulde' : 'Cavitas glenoidalis', (fa - 1) / .4, 760);
  return W(s + fly + shadeS()); };
WMASC.h29hook = (ev, t, lt, sc) => { const Ls = sc.lines, gT = HV2() ? Ls[Ls.length - 1].end + .15 : (ev.loop === undefined ? Infinity : Ls[1].start + .2), e = t - gT; if (!(e >= 0)) return BIG3();
  const x = e < .45 ? lerp(220, 150, ease(cl(e / .35))) : e < 1.6 ? 150 : lerp(150, 220, ease(cl((e - 1.6) / .5)));
  return stay3([x, 1537 - (e > .9 && e < 1.25 ? 30 * Math.sin(Math.PI * (e - .9) / .35) : 0)], 1, { r: e < .45 ? -12 : e < 1.6 ? -14 : 0, nospin: 1, mood: 'shock' }); };

// ---------- Teil 1: Knochen und Knorpel ----------
WORLD.h29a = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, bo = cl((lt - .1) / .9), ca = p2 === undefined ? 0 : cl((p2 - 1.6) / .8);
  const wob = (p1 !== undefined && p2 === undefined) || a !== undefined ? 14 * Math.sin(t * 4) : 0;
  let s = laborS(t, Object.assign({}, LAB29, { on: bo + ca, cur: p2 !== undefined ? 2 : 1 }));
  s += shoulder29(SX29, SY29, SZ29, t, { l: [bo, ca, 0, 0, 0, 0], wob: wob });
  if (p !== undefined && p1 === undefined) s += SL29(70, -40, 760, 'Oberarmkopf', 'Caput humeri', (p - .6) / .35) + SL29(-56, 40, 1050, 'Pfanne', 'Cavitas glenoidalis', (p - 1.6) / .35, 760);
  if (p1 !== undefined && p2 === undefined) s += ring29(t, 40, -5, 96) + ring29(t, -52, -6, 66);
  if (p2 !== undefined) s += SL29(-55, -40, 800, 'Gelenkknorpel', 'Cartilago articularis', (p2 - 2.0) / .35);
  return W(s + shadeS(), slot(ev, [['panel', 'Schicht 1: Knochen'], ['p1', 'Kugel groß, Pfanne flach', 'hot'], ['p2', 'Schicht 2: Knorpel'], ['act', 'Glatt, aber kein Halt', 'hot']])); };
WMASC.h29a = (ev, t) => { const p1 = ev.p1, a = ev.act; if ((p1 !== undefined && ev.p2 === undefined) || a !== undefined) { const w = Math.sin(t * 4); return stay3([220 + 8 * w, 1537], 1, { r: 8 * w, nospin: 1, mood: 'shock' }); } return BIG3(); };

// ---------- Teil 2: Lippe und Kapsel ----------
WORLD.h29b = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act; const lab = p === undefined ? 0 : cl((p - 2) / .8), cap = p2 === undefined ? 0 : cl((p2 - 1.2) / .9);
  const wob = a !== undefined ? 7 * Math.sin(t * 4) : (p1 !== undefined ? 4 * Math.sin(t * 4) * (1 - cl(p1 / 1.5)) : 0);
  let s = laborS(t, Object.assign({}, LAB29, { on: 2 + lab + cap, cur: p2 !== undefined ? 4 : 3 }));
  s += shoulder29(SX29, SY29, SZ29, t, { l: [1, 1, lab, cap, 0, 0], wob: wob });
  if (p !== undefined && p2 === undefined) s += SL29(-40, -84, 770, 'Gelenklippe', 'Labrum glenoidale', (p - 2.4) / .35);
  if (p1 !== undefined && p2 === undefined) s += ring29(t, -46, -6, 90);
  if (p2 !== undefined) s += SL29(130, -30, 800, 'Gelenkkapsel', 'Capsula articularis', (p2 - 1.6) / .35) + SL29(-44, 20, 1060, 'Gelenkflüssigkeit', 'Synovia', (p2 - 3) / .35, 760);
  if (a !== undefined) s += ring29(t, 40, 120, 60);
  return W(s + shadeS(), slot(ev, [['panel', 'Jetzt wird es tiefer'], ['p1', 'Lippe vertieft die Pfanne', 'hot'], ['p2', 'Schicht 4: Kapsel'], ['act', 'Weit, wenig Bänder', 'hot']])); };
WMASC.h29b = (ev, t) => { const p1 = ev.p1; if (p1 !== undefined && ev.p2 === undefined) { const j = Math.sin(Math.PI * cl((p1 - .4) / .5)); return stay3([220, 1537 - 26 * j], 1, { r: 0, nospin: 1, mood: 'happy' }); } if (ev.act !== undefined) { const w = Math.sin(t * 4) * .6; return stay3([220 + 6 * w, 1537], 1, { r: 6 * w, nospin: 1 }); } return BIG3(); };

// ---------- Teil 3: Manschette und Deltamuskel ----------
WORLD.h29c = function (sc, ev, t, lt) { const p = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act; const rc = p === undefined ? 0 : cl((p - 2.6) / 1), dl = p2 === undefined ? 0 : cl((p2 - 1.2) / 1);
  const lift = p2 === undefined ? 0 : 26 * Math.sin(Math.PI * cl((p2 - 2.4) / 2.2)) + (a !== undefined ? 18 * Math.sin(t * 2) * Math.sin(Math.PI * cl(a / 3)) : 0);
  let s = laborS(t, Object.assign({}, LAB29, { on: 4 + rc + dl, cur: p2 !== undefined ? 6 : 5 }));
  s += shoulder29(SX29, SY29, SZ29, t, { l: [1, 1, 1, 1, rc, dl], wob: 0, lift: lift });
  if (p !== undefined && p2 === undefined) s += SL29(-120, -122, 760, 'Manschette', '4 Muskeln, 2 hinten', (p - 2.6) / .35) + (p1 !== undefined ? ring29(t, 40, -5, 110) : '');
  if (p2 !== undefined) s += SL29(150, 20, 800, 'Deltamuskel', 'M. deltoideus', (p2 - 1.6) / .35);
  return W(s + shadeS(), slot(ev, [['panel', 'Die Antwort vom Anfang', 'hot'], ['p1', 'Manschette hält den Kopf', 'hot'], ['p2', 'Schicht 6: Deltamuskel'], ['act', 'Beweglichstes Kugelgelenk']])); };
WMASC.h29c = (ev, t) => { const p1 = ev.p1, a = ev.act; if (p1 !== undefined && ev.p2 === undefined) { const j = Math.sin(Math.PI * cl((p1 - 2) / .5)); return stay3([220, 1537 - 26 * j], 1, { r: 0, nospin: 1, mood: 'happy' }); } if (a !== undefined) return stay3([220, 1537], 1, { r: -6 * Math.sin(t * 2), nospin: 1, mood: 'happy' }); return BIG3(); };

// ---------- Schluss: kein Merksatz-Block, Aufloesung und Schlusssatz ----------
WORLD.h29out = function (sc, ev, t, lt) { const sv = ev.save; let s = laborS(t, Object.assign({}, LAB29, { noList: 1 }));
  s += shoulder29(SX29, SY29 + 40 * (sv === undefined ? 0 : ease(cl(sv / .6))), SZ29 * (sv === undefined ? 1 : lerp(1, .8, ease(cl(sv / .6)))), t, { l: [1, 1, 1, 1, 1, 1], lift: 10 * Math.sin(t * 2) });
  if (sv === undefined && ev.auf !== undefined) s += ring29(t, -60, -40, 150);
  return W(s + shadeS()); };
WMASC.h29out = (ev, t) => BIG3();

['h29hook', 'h29a', 'h29b', 'h29c', 'h29out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
