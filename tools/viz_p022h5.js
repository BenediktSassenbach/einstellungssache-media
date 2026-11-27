// P022H5 "Warum klingt deine Stimme auf Aufnahmen so fremd?" (Physik, Skript 4, nur der Einstieg nach Hook-System), 21.11.2026.
// Benedikt: Abwechslung statt immer Lupe, keine Blase schief uebers Bild. Pro Teil eine andere Darstellung:
//   Einstieg: Zimmer mit Ringlicht, die Aufnahme laeuft schon, Schalti erschrickt. Keine Gedankenblase.
//   Teil 1: Wissenschaftsmodus, grosser Kopf im Schnitt: Luftweg und Knochenweg zum Innenohr (Schalti steht auf dem Boden).
//   Teil 2: Interaktion: Ringlicht faehrt weg, Wand-Monitor mit Klang-Balken, Schalti spricht ins Standmikro.
//   Teil 3: Schalti gross auf dem Schreibtisch: Haende auf die Ohren, langes I, Schall bleibt im Kopf.
// Nutzt room22, skull22, rings22, gloves22, iii22, waves22 aus viz_p022h.js und fuse33/lab33 aus viz_v33.js. Zum Loeschen: diese Datei und videos/P022H5.
var AC5P = '#5CE1FF', OR5P = '#FF9A3C', ST5P = '#0B1020', GY5P = 1545, X5P = 300;
const rOut5p = k => k > 0 ? 'translate(' + (900 * ease(cl(k))).toFixed(1) + ' 0)' : '';    // Ringlicht faehrt nach rechts aus dem Bild
// Wand-Monitor mit Klang-Balken (Teil 2). mode 0: so hoerst du dich (viel Bass), 1: so hoert das Mikro
function mon5p(t, k, bass, mic, lab) { if (k <= 0) return ''; const e = back(cl(k)); let s = '<g transform="translate(650 975) scale(' + (.76 * e).toFixed(3) + ')"><rect x="-300" y="-190" width="600" height="360" rx="26" fill="' + ST5P + '" stroke="#C9B8E8" stroke-width="8"/><rect x="-276" y="-166" width="552" height="312" rx="16" fill="#141C3C"/><rect x="-30" y="170" width="60" height="40" fill="#3A3060"/>';
  for (let i = 0; i < 9; i++) { const low = i < 4, x = -240 + i * 60, wob = .08 * Math.sin(t * 7 + i * 1.3);
    const h = 40 + 170 * cl((low ? .35 + .55 * bass : .5 - .05 * i / 8) + wob); const col = low ? lc(AC5P, OR5P, cl(bass * 1.4)) : AC5P;
    s += '<rect x="' + (x - 20) + '" y="' + (110 - h).toFixed(0) + '" width="40" height="' + h.toFixed(0) + '" rx="8" fill="' + col + '"/>'; }
  s += svgT(-200, 146, 'tief', 36, '#F4F6FB') + svgT(200, 146, 'hoch', 36, '#F4F6FB');
  if (lab) s += svgT(0, -116, lab, 44, mic ? AC5P : OR5P);
  return s + '</g>'; }
// Standmikrofon auf dem Boden
function mic5p(x, k, t, hot) { if (k <= 0) return ''; const e = back(cl(k)); let s = '<g transform="translate(' + x + ' ' + GY5P + ') scale(' + e.toFixed(3) + ')"><path d="M-50 0 H50 M0 0 V-150" stroke="' + ST5P + '" stroke-width="10" stroke-linecap="round"/><path d="M0 -150 V-170" stroke="#5A6590" stroke-width="8"/><rect x="-26" y="-262" width="52" height="96" rx="26" fill="#2A3560" stroke="' + ST5P + '" stroke-width="6"/>';
  for (let i = 0; i < 4; i++) s += '<path d="M-18 ' + (-240 + i * 18) + ' H18" stroke="#5A6590" stroke-width="4"/>';
  if (hot) s += '<circle cx="0" cy="-214" r="' + (40 + 6 * Math.sin(t * 10)).toFixed(0) + '" fill="none" stroke="' + AC5P + '" stroke-width="5" opacity=".6"/>';
  return s + '</g>'; }
// Schall aus Schaltis Mund nach rechts (Luftweg, blau)
function say5p(hx, hy, t, k) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 3; i++) { const c = (t * 1.3 + i / 3) % 1; s += '<path d="M' + (hx + 70 + 80 * c).toFixed(0) + ' ' + (hy - 30 - 20 * c).toFixed(0) + ' q' + (14 + 10 * c).toFixed(0) + ' ' + (30 + 20 * c).toFixed(0) + ' 0 ' + (60 + 40 * c).toFixed(0) + '" stroke="' + AC5P + '" stroke-width="7" fill="none" stroke-linecap="round" opacity="' + (k * (1 - c)).toFixed(2) + '"/>'; } return s; }
// Schreibtisch fuer Teil 3
function desk5p(k) { if (k <= 0) return ''; const y = 1130 + 420 * (1 - ease(cl(k))); return '<g transform="translate(0 ' + (y - 1130).toFixed(1) + ')"><rect x="350" y="1130" width="600" height="34" rx="8" fill="#A8774F" stroke="' + ST5P + '" stroke-width="6"/><rect x="382" y="1164" width="26" height="390" fill="#7A5236" stroke="' + ST5P + '" stroke-width="5"/><rect x="892" y="1164" width="26" height="390" fill="#7A5236" stroke="' + ST5P + '" stroke-width="5"/></g>'; }
const hd5p = (fx, fy, sc) => [fx + 58 * sc, fy - 127 * sc];


// Punkt auf einer Kette kubischer Bezier-Kurven (P0, dann je drei Punkte pro Abschnitt), u 0..1
function bz5p(P, u) { const n = (P.length - 1) / 3, f = Math.min(n - 1e-6, Math.max(0, u * n)), i = Math.floor(f), v = f - i, a = P[i * 3], b = P[i * 3 + 1], c = P[i * 3 + 2], d = P[i * 3 + 3], w = 1 - v;
  return [w * w * w * a[0] + 3 * w * w * v * b[0] + 3 * w * v * v * c[0] + v * v * v * d[0], w * w * w * a[1] + 3 * w * w * v * b[1] + 3 * w * v * v * c[1] + v * v * v * d[1]]; }
const AIR5P = [[-196, 46], [-300, 20], [-290, -240], [-60, -262], [140, -276], [270, -150], [230, -40], [214, 0], [190, 18], [150, 22]];
const BONE5P = [[-80, 160], [-60, 100], [-20, 110], [10, 92], [40, 70], [50, 40], [64, 22]];
function dots5p(P, t, k, col, sp, n, r) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < n; i++) { const u = ((t * sp + i / n) % 1) * ease(cl(k)), q = bz5p(P, u);
  s += '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="' + (r * 1.9).toFixed(1) + '" fill="' + col + '" opacity=".22"/><circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="' + r + '" fill="#fff" stroke="' + col + '" stroke-width="5"/>'; } return s; }

// ---------- Einstieg ----------
WORLD.p5hook = function (sc, ev, t, lt) { const ko = ev.kopf, lo = ev.loop; let s = room22(t, { screen: 'memo', memoT: lt + 1.2 });
  s += waves22(t, lo === undefined ? 1 : 1 - .5 * cl(lo / .6), AC5P, 1);
  const [hx, hy] = hd5p(X5P, GY5P, 1);
  if (ko !== undefined && lo === undefined) s += '<path d="M' + (hx - 10) + ' ' + (hy - 150) + ' v-40" stroke="#FFE14D" stroke-width="10" stroke-linecap="round" opacity="' + cl(ko / .3).toFixed(2) + '"/><circle cx="' + (hx - 10) + '" cy="' + (hy - 130) + '" r="7" fill="#FFE14D" opacity="' + cl(ko / .3).toFixed(2) + '"/>';
  return W(s + shade3()); };
WMASC.p5hook = (ev, t, lt) => { const ko = ev.kopf, lo = ev.loop;
  if (lo !== undefined) return stay3([X5P, GY5P], 1, { r: 2 * Math.sin(t * 2), mood: 'cool' });
  if (ko !== undefined) { const p = Math.sin(Math.PI * cl(ko / .8)); return stay3([X5P - 30, GY5P - 20 * p], 1, { r: 10 * p, mood: 'cool' }); }
  const j = Math.sin(Math.PI * cl(lt / .5)); return stay3([X5P - 30 * ease(cl(lt / .3)), GY5P - 60 * j], 1, { r: -18 * j, mood: 'shock' }); };

// ---------- Teil 1: zwei Wege (Wissenschaftsmodus ab Satz 2) ----------
WORLD.p5wege = function (sc, ev, t, lt) { const dp = ev.doppelt, lu = ev.luft, kn = ev.knochen, nu = ev.nur;
  const bg = room22(t, { screen: 'memo', memoT: 0 }); let s = fuse33(bg, sc, t, lt); const [hx, hy] = hd5p(X5P, GY5P, 1);
  if (dp !== undefined && lu === undefined) s += rings22(hx, hy, t, cl(dp / .4), AC5P) + rings22(hx, hy, t + .5, cl((dp - .5) / .4), OR5P, 1);
  const m = lab33(sc, t); if (lu !== undefined && m > .01) { const k = skull22(t, cl((lu - .3) / 1.8), kn === undefined ? 0 : cl((kn - .3) / 1.8), nu === undefined ? 0 : cl((nu - .5) / .4)).replace('<rect x="-320" y="-320" width="640" height="640" fill="#2B2560"/>', '');
    const aa = cl((lu - .3) / 1.8), bb = kn === undefined ? 0 : cl((kn - .3) / 1.8), wob = bb > 0 ? 1.4 * Math.sin(t * 26) * cl(bb * 2) : 0;
    s += '<g opacity="' + m.toFixed(3) + '" transform="translate(600 900) scale(' + (.74 + .05 * m).toFixed(3) + ') rotate(' + wob.toFixed(2) + ')">' + k + dots5p(AIR5P, t, aa, AC5P, .45, 4, 12) + dots5p(BONE5P, t, bb, OR5P, .9, 3, 13) + '</g>'; }
  return W(s + shade3(), slot(ev, [['doppelt', 'Du hörst dich doppelt'], ['luft', 'Weg 1: durch die Luft'], ['knochen', 'Weg 2: durch die Knochen', 'hot'], ['nur', 'Weg 2 hört nur du', 'hot']])); };
WMASC.p5wege = (ev, t, lt) => { const dp = ev.doppelt, nu = ev.nur;
  if (nu !== undefined) { const b = Math.sin(Math.PI * cl((nu - .4) / .8)); return stay3([X5P, GY5P - 26 * b], 1, { r: -8 * b, mood: 'cool' }); }
  if (dp !== undefined && ev.luft === undefined) { const w = Math.sin(t * 7) * cl(dp / .3); return stay3([X5P + 6 * w, GY5P], 1, { r: 4 * w, mood: 'shock' }); }
  return stay3([X5P, GY5P], 1, { r: 2 * Math.sin(t * 2) }); };

// ---------- Teil 2: der Bass (Monitor und Mikrofon) ----------
WORLD.p5bass = function (sc, ev, t, lt) { const ti = ev.tief, vo = ev.voll, mi = ev.mikro;
  let s = room22(t, { screen: 'memo', memoT: lt, ringT: rOut5p(lt / .8) }) + desk5p(cl((lt - .2) / .3));
  const [hx, hy] = hd5p(X5P, GY5P, 1);
  const bass = mi === undefined ? ease(cl(((ti || 0) - .6) / 1.2)) : 1 - ease(cl((mi - 1) / .8));
  s += mon5p(t, cl((lt - .4) / .4), bass, mi !== undefined && mi > 1, mi !== undefined && mi > 1 ? 'So hört das Mikro' : 'So hörst du dich');
  if (vo !== undefined && mi === undefined) s += rings22(hx, hy, t, cl(vo / .4), OR5P, 1);
  s += mic5p(580, mi === undefined ? 0 : cl(mi / .4), t, mi !== undefined && mi > .8);
  if (mi !== undefined) s += say5p(hx, hy, t, cl((mi - .6) / .3));
  if (mi !== undefined) { const ck = cl((mi - .3) / .4), CB = [[580, 1300], [580, 1450], [590, 1560], [650, 1560], [700, 1560], [700, 1300], [700, 1130]];
    s = s.replace('<g transform="translate(580 ', '<path d="M580 1300 C580 1450 590 1560 650 1560 S700 1300 700 1130" stroke="#1A1630" stroke-width="9" fill="none" opacity="' + ck.toFixed(2) + '"/><g transform="translate(580 ');
    if (mi > .8) for (let i = 0; i < 3; i++) { const q = bz5p(CB, (t * .9 + i / 3) % 1); s += '<circle cx="' + q[0].toFixed(0) + '" cy="' + q[1].toFixed(0) + '" r="9" fill="' + AC5P + '" opacity="' + cl((mi - .8) / .3).toFixed(2) + '"/>'; }
    const fl = cl((mi - 1) / .15) * (1 - cl((mi - 1.2) / .3)); if (fl > 0) s += '<rect x="422" y="831" width="456" height="273" rx="20" fill="#fff" opacity="' + (.5 * fl).toFixed(2) + '"/>'; }
  return W(s + shade3(), slot(ev, [['tief', 'Knochen-Weg: mehr Bass', 'hot'], ['voll', 'Für dich: tiefer, voller'], ['mikro', 'Mikrofon: nur Luft', 'hot']])); };
WMASC.p5bass = (ev, t, lt) => { const ti = ev.tief, vo = ev.voll, mi = ev.mikro;
  if (mi !== undefined) return stay3([X5P - 60 - 60 * ease(cl(mi / .5)), GY5P], 1, { r: 3 * Math.sin(t * 6) * cl((mi - .6) / .3), mood: 'cool' });
  if (vo !== undefined) { const p = Math.sin(Math.PI * cl(vo / 1.6)); return stay3([X5P - 60, GY5P], 1 + .08 * p, { r: -3, mood: 'happy' }); }
  return stay3([lerp(X5P, X5P - 60, ease(cl(lt / .5))), GY5P], 1, { r: ti === undefined ? 2 : 3 * Math.sin(t * 6) * cl(ti / .5), mood: 'happy' }); };

// ---------- Teil 3: Ohr-Modell auf dem Schreibtisch, Schalti steckt den Stoepsel rein ----------
// Modell im Schnitt: Ohrmuschel links, Gehoergang, Trommelfell, Schnecke. Knochenschall kommt von unten (orange).
const EX5P = 600, EY5P = 939, XT5P = 180;
function ear5p(t, k, plug, bounce, bone, imp) { if (k <= 0) return ''; const e = back(cl(k)); let s = '<g transform="translate(' + EX5P + ' ' + EY5P + ') scale(' + (.85 * e).toFixed(3) + ')">';
  s += '<rect x="-30" y="150" width="60" height="70" fill="#7A5236" stroke="' + ST5P + '" stroke-width="5"/><rect x="-110" y="205" width="220" height="20" rx="6" fill="#5A3A26" stroke="' + ST5P + '" stroke-width="5"/>';
  s += '<rect x="-250" y="-170" width="500" height="330" rx="40" fill="#F2C6A8" stroke="' + ST5P + '" stroke-width="7"/><rect x="-232" y="-152" width="464" height="294" rx="30" fill="#F7E3D2"/>';
  s += '<path d="M-232 -110 Q-170 -150 -150 -60 Q-140 -10 -170 20 Q-150 60 -190 110 Q-232 120 -232 80 Z" fill="#E8A888" stroke="' + ST5P + '" stroke-width="6"/>';              // Ohrmuschel
  s += '<path d="M-170 -22 H70 V22 H-170 Z" fill="#5A3A30" stroke="' + ST5P + '" stroke-width="5"/>';                                                                       // Gehoergang
  const vib = cl(bounce) * Math.abs(Math.sin(t * 28)); s += '<ellipse cx="' + (78 + 5 * vib).toFixed(1) + '" cy="0" rx="' + (10 + 6 * vib).toFixed(1) + '" ry="40" fill="#FFE14D" stroke="' + ST5P + '" stroke-width="5"/>' + svgT(78, -58, 'Trommelfell', 30, '#5A3A30');
  const sp = 1 + .2 * Math.abs(Math.sin(t * 9)) * cl(bounce); s += '<g transform="translate(170 0) scale(' + sp.toFixed(3) + ')"><path d="M0 0 m-40 0 a40 40 0 1 0 80 0 a28 28 0 1 0 -56 0 a16 16 0 1 0 32 0" fill="none" stroke="' + (bounce > .3 ? OR5P : '#C48AA0') + '" stroke-width="10" stroke-linecap="round"/></g>' + svgT(170, 84, 'Innenohr', 30, '#5A3A30');
  if (bone > 0) { s += '<path d="M60 150 C40 110 40 60 30 22" stroke="' + OR5P + '" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="200" stroke-dashoffset="' + (200 * (1 - ease(cl(bone)))).toFixed(0) + '"/>' + svgT(100, 140, 'Knochen', 30, '#B05A20', 'start'); }
  if (bounce > 0) for (let i = 0; i < 3; i++) { const c = (t * 1.6 + i / 3) % 1, x = -140 + 200 * Math.abs(Math.sin(Math.PI * c)); const amp = 1 + .9 * cl(bounce) * (.5 + .5 * Math.sin(t * 5 + i)); s += '<path d="M' + x.toFixed(0) + ' ' + (-16 * amp).toFixed(0) + ' q' + (12 * amp).toFixed(0) + ' ' + (16 * amp).toFixed(0) + ' 0 ' + (32 * amp).toFixed(0) + '" stroke="' + OR5P + '" stroke-width="7" fill="none" stroke-linecap="round" opacity="' + cl(bounce).toFixed(2) + '"/>'; }
  if (plug > 0) { const x = lerp(-420, -196, ease(cl(plug))), y = -260 * (1 - ease(cl(plug))) + 0; const fly = 1 - ease(cl(plug)), sq = plug >= 1 ? 1 : 1, hit = cl((plug - .95) / .05); s += (plug > .97 ? '<circle cx="-196" cy="0" r="' + (40 + 90 * ((t * 2) % 1) * 0 + 60 * cl(plug)).toFixed(0) + '" fill="none" stroke="#fff" stroke-width="6" opacity="0"/>' : '') + '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + (-540 * fly).toFixed(0) + ')"><path d="M-30 -30 H24 L34 -22 V22 L24 30 H-30 Z" fill="#C98A4B" stroke="' + ST5P + '" stroke-width="6" stroke-linejoin="round"/><path d="M-18 -20 v40 M-4 -24 v48" stroke="#8A5A2A" stroke-width="4"/></g>'; }
  if (imp !== undefined && imp > 0 && imp < .6) { const c = imp / .6; s += '<circle cx="-196" cy="0" r="' + (30 + 110 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="' + (10 * (1 - c)).toFixed(1) + '" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  return s + '</g>'; }
// Lautstaerke-Anzeige rechts auf dem Tisch
function vol5p(t, k, lev) { if (k <= 0) return ''; const e = back(cl(k)); let s = '<g transform="translate(872 1130) scale(' + e.toFixed(3) + ')"><rect x="-40" y="-300" width="80" height="300" rx="16" fill="' + ST5P + '" stroke="#C9B8E8" stroke-width="6"/>';
  for (let i = 0; i < 8; i++) { const on = (i + 1) / 8 <= lev + .04 * Math.sin(t * 9); s += '<rect x="-26" y="' + (-34 - i * 33) + '" width="52" height="24" rx="5" fill="' + (on ? (i > 5 ? '#FF5A5A' : i > 3 ? OR5P : AC5P) : '#2A3560') + '"/>'; }
  return s + svgT(0, -314, 'laut', 24, '#C9B8E8') + '</g>'; }
WORLD.p5test = function (sc, ev, t, lt) { const te = ev.test, dr = ev.droehn, ge = ev.gefangen;
  let s = room22(t, { screen: 'memo', memoT: 0, ringT: 'translate(900 0)' }) + desk5p(cl(lt / .3));
  const plug = te === undefined ? 0 : cl((te - 1.6) / .6), sing = te === undefined ? 0 : cl((te - 2.6) / .6);
  s += ear5p(t, cl((lt - .2) / .4), plug, dr !== undefined ? cl(dr / .4) : 0, ge !== undefined ? cl(ge / .8) : (dr !== undefined ? 1 : 0), te === undefined ? undefined : te - 2.2);
  s += vol5p(t, cl((lt - .5) / .4), dr !== undefined ? .45 + .45 * ease(cl(dr / 1.2)) : .35 * sing);
  const [hx, hy] = hd5p(XT5P, GY5P, 1); if (sing > 0) s += say5p(hx, hy, t, sing * (plug >= 1 ? .6 : 1));
  if (dr !== undefined) s += rings22(hx, hy, t, cl(dr / .4), OR5P, 1);
  return W(s + shade3(), slot(ev, [['test', 'Ohren zu, langes I'], ['droehn', 'Dumpf, dröhnend, lauter', 'hot'], ['gefangen', 'Schall bleibt im Ohr', 'hot']])); };
WMASC.p5test = (ev, t, lt) => { const dr = ev.droehn, ge = ev.gefangen, te = ev.test;
  const sh = dr !== undefined && ge === undefined ? Math.sin(t * 30) * cl(dr / .4) * (1 - cl((dr - 2.4) / .4)) : 0, push = te === undefined ? 0 : Math.sin(Math.PI * cl((te - 1.5) / .7));
  return stay3([lerp(X5P - 120, XT5P, ease(cl(lt / .6))) + 4 * sh, GY5P - 50 * push], 1, { r: 12 * push + 3 * sh, mood: dr !== undefined ? 'shock' : (te !== undefined && te > 2.6 ? 'shock' : 'happy') }); };

// ---------- Schluss: Ringlicht kommt zurueck, beim Schlusssatz klein nach rechts ----------
WORLD.p5out = function (sc, ev, t, lt) { const sv = ev.save; const back5 = 1 - ease(cl((lt - .3) / .8)); const rk = sv !== undefined ? ease(cl(sv / .5)) : 0;
  const rT = 'translate(' + (900 * back5).toFixed(1) + ' 0)';
  let s = room22(t, { screen: 'memo', memoT: lt, ringT: rT }) + desk5p(1 - cl(lt / .25));
  if (sv !== undefined) s += '<g transform="' + rT + '">' + waves22(t, cl(sv / .6), AC5P, 1) + '</g>';
  return W(s + shade3()); };
WMASC.p5out = (ev, t, lt) => { const d = ease(cl(lt / .7)), j = Math.sin(Math.PI * d); return stay3([lerp(XT5P, X5P - 40, d), GY5P - 30 * j], 1, { r: 0, mood: ev.save !== undefined ? 'happy' : undefined }); };

['p5hook', 'p5wege', 'p5bass', 'p5test', 'p5out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC5P); });
