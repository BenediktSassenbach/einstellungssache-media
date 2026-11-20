// B023H3 "Warum kannst du dich nicht selbst kitzeln?" (Bio, Skript Anatomie, Hook-Pilot v3, 20.11.2026).
// Benedikt 20.11.2026: zu wenig passiert, zu viele Texte, immer nur die Lupe. Ort bleibt wie im Skript Anatomie (Bio-Saal, Tafel, Skelett auf dem Podest).
// v3: jeder Teil zeigt etwas anderes auf der Tafel und am Skelett:
// Einstieg Feder ohne Wirkung, dann Lachanfall mit klappernden Knochen und Wackelkamera. Teil 1 Kreide-Welle: Gefuehl minus Vorhersage wird flach.
// Teil 2 laufende Messkurve: kleiner Ausschlag beim eigenen Arm, grosser beim Stups. Teil 3 Roboter mit Verzoegerungs-Zeiger und Kitzel-Anzeige.
// Schluss wie v2 (h23out, Merksaetze auf der Tafel).
// Kreide-Strich, der sich zeichnet (k 0..1)
const drawK3 = (d, k, col, w) => '<path d="' + d + '" stroke="' + (col || '#F4F6FB') + '" stroke-width="' + (w || 5) + '" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="' + cl(k).toFixed(3) + ' 2" opacity=".92"/>';
function wpath3(x, y, w, a, ph, f) { let d = ''; for (let i = 0; i <= 50; i++) { const u = i / 50; d += (i ? 'L' : 'M') + (x + w * u).toFixed(1) + ' ' + (y + a * Math.sin(u * (f || 12) + ph)).toFixed(1); } return d; }
function bones3(t, k) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 6; i++) { const c = (t * 1.5 + i / 6) % 1, a = -1.4 + i * .55; s += '<g opacity="' + (k * (1 - c)).toFixed(2) + '" transform="translate(' + (SKX - 60 + Math.cos(a) * 120 * c).toFixed(0) + ' ' + (840 + Math.sin(a) * 100 * c).toFixed(0) + ') rotate(' + (c * 300 + i * 40).toFixed(0) + ') scale(' + (1.2 + c).toFixed(2) + ')">' + svgT(0, 12, 'HA', 40, '#FFE14D') + '</g>'; } return s; }

// ---------- Einstieg ----------
WORLD.k3hook = function (sc, ev, t, lt) { const se = ev.selbst, fr = ev.fremd, lo = ev.loop;
  const la = fr === undefined ? 0 : cl((fr - .7) / .3) * (lo === undefined ? 1 : 1 - .6 * cl((lo - .5) / .5));
  const sh = la > .3 ? 7 * Math.sin(t * 50) * la : 0;
  let close = '';
  if (fr === undefined) close = ck23(-30, 30, lt < 1.4 ? 'selbst kitzeln …' : 'nichts.', 62, lt < 1.4 ? '#F4F6FB' : '#FFE14D');
  else if (lo === undefined) close = '<g transform="rotate(' + (3 * Math.sin(t * 30) * la).toFixed(1) + ')">' + ck23(-20, 20, 'HAHAHA', 80 + 6 * Math.sin(t * 20), '#FFE14D') + '</g>';
  else close = ck23(-40, -30, 'Wie klappt es', 40) + ck23(-40, 50, 'doch?', 54, '#FFE14D') + '<g transform="translate(170 0) scale(' + (1 + .08 * Math.sin(t * 6)).toFixed(2) + ')">' + ck23(0, 30, '?', 120, '#FFE14D') + '</g>';
  let s = '<g transform="translate(' + sh.toFixed(1) + ' ' + (sh * .4).toFixed(1) + ')">' + classK(t, { close: close });
  // Skelett: schaut gelangweilt beim Selbstkitzeln, klappert beim Lachen
  s += '<g transform="translate(' + (la * 6 * Math.sin(t * 40)).toFixed(1) + ' 0)">' + skel23(t, { la: la, wave: fr === undefined ? .55 + .1 * Math.sin(t * 9) : 0 }) + '</g>';
  if (fr === undefined) s += feather23(SKX + 70 + 26 * Math.sin(t * 11), 900 + 18 * Math.cos(t * 11), -40 + 20 * Math.sin(t * 11), 1.4) + ringK(t, SKX + 60, 900, 60);
  if (fr !== undefined) { const k = ease(cl(fr / .7)), wg = 14 * Math.sin(t * 14) * cl((fr - .6) / .3); s += stick23(lerp(FX23, 470, k) + 60, 1420, lerp(FX23 + 200, 790, k) + wg, lerp(1300, 1115, k), wg * 2) + bones3(t, la); }
  return W(s + '</g>' + shade3()); };
WMASC.k3hook = (ev, t, lt) => { const fr = ev.fremd, lo = ev.loop; if (fr !== undefined && lo === undefined) { const k = ease(cl(fr / .7)); return stay3([lerp(FX23, 470, k), GY23], 1, { r: 0, mood: 'happy', walk: k < 1 }); } if (lo !== undefined) { const k = ease(cl(lo / .8)); return stay3([lerp(470, FX23, k), GY23], 1, { r: 0, mood: 'cool', walk: k < 1, flip: k < 1 }); } return stay3([FX23, GY23], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 1: Gefuehl minus Vorhersage ----------
WORLD.k3rechnet = function (sc, ev, t, lt) { const vo = ev.vorher, kl = ev.klein, da = ev.daempf;
  let close = '';
  if (kl === undefined) { // Vorhersage: Gehirn schickt eine Welle zur Hand, die echte Welle kommt hinterher
    const k = vo === undefined ? cl(lt / 1) * .5 : .5 + .5 * cl(vo / 1.2); close += '<g transform="translate(-120 -20) scale(.62)">' + brain23(0, t) + '</g>' + drawK3(wpath3(-20, -60, 240, 30, t * 5), k * 2, '#6FC3F0', 8) + ck23(100, -104, 'Vorhersage', 34, '#6FC3F0') + drawK3(wpath3(-20, 40, 240, 30, t * 5), cl((k - .5) / .5), '#FFE14D', 8) + ck23(100, 96, 'Gefühl', 34, '#FFE14D'); }
  else if (da === undefined) close += '<g transform="translate(20 -40) scale(1.05)">' + brain23(cl(kl / .5), t) + '</g>' + '<circle cx="' + (20 + 105) + '" cy="' + (-40 + 70) + '" r="' + (54 + 6 * Math.sin(t * 6)).toFixed(0) + '" fill="none" stroke="#A8E63C" stroke-width="6" opacity="' + cl(kl / .5).toFixed(2) + '"/>';
  else { const d = ease(cl((da - .5) / 1.6)); // Gefuehl - Vorhersage = flach
    close += drawK3(wpath3(-200, -80, 200, 24, t * 5), 1, '#FFE14D', 6) + ck23(-100, -118, 'Gefühl', 26, '#FFE14D') + ck23(20, -72, '−', 60) + drawK3(wpath3(40, -80, 200, 24 * d, t * 5), 1, '#6FC3F0', 6) + ck23(140, -118, 'Vorhersage', 26, '#6FC3F0');
    close += ck23(-20, -10, '=', 60) + drawK3(wpath3(-200, 30, 440, 24 * (1 - d), t * 5), 1, '#A8E63C', 7) + ck23(20, 82, d > .6 ? 'fast nichts' : '…', 32, '#A8E63C'); }
  let s = classK(t, { close: close }) + skel23(t, { wave: vo !== undefined && kl === undefined ? .7 + .2 * Math.sin(t * 3) : 0 }) + (kl !== undefined && da === undefined ? ringK(t, SKX, 720, 52) : '');
  if (da !== undefined) s += feather23(SKX + 70 + 8 * Math.sin(t * 10), 900, -40);
  return W(s + shade3(), slot(ev, [['vorher', 'Gehirn sagt voraus', 'hot']])); };
WMASC.k3rechnet = (ev, t, lt) => { const da = ev.daempf; if (da !== undefined) { const j = Math.sin(Math.PI * cl((da - .4) / .6)); return stay3([FX23, GY23 - 20 * j], 1, { r: 0, mood: 'cool' }); } return stay3([FX23, GY23], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 2: Messkurve ----------
// Kurve laeuft von rechts nach links, Ereignisse als Ausschlaege. ev: Liste [Zeit, Hoehe, Farbe]
function trace3(t, evs, x0, y0, w) { let d = '', S = ''; const span = 4; for (let i = 0; i <= 120; i++) { const u = i / 120, tt = t - span * (1 - u); let a = 3 * Math.sin(tt * 30); evs.forEach(e => { const dt = tt - e[0]; if (dt > 0 && dt < .5) a += e[1] * Math.sin(dt / .5 * Math.PI) * Math.sin(dt * 40); }); d += (i ? 'L' : 'M') + (x0 + w * u).toFixed(1) + ' ' + (y0 - a).toFixed(1); }
  S += '<path d="M' + x0 + ' ' + y0 + ' H' + (x0 + w) + '" stroke="#F4F6FB" stroke-width="2" opacity=".35"/><path d="' + d + '" stroke="#A8E63C" stroke-width="6" fill="none" stroke-linejoin="round"/><circle cx="' + (x0 + w) + '" cy="' + y0 + '" r="8" fill="#A8E63C"/>';
  return S; }
WORLD.k3fremd = function (sc, ev, t, lt) { const ha = ev.haken, ar = ev.arm, zu = ev.zuck, au = ev.auf;
  const T0 = t - lt; const evs = []; if (ar !== undefined) [1, 2.2].forEach(o => { if (ar > o) evs.push([T0 + (sc.lines[1].start - T0) + o, 14, 0]); }); if (zu !== undefined && zu > .6) evs.push([sc.lines[2].start + .6, 80, 1]);
  let close = ck23(-200, -110, 'Berührung', 28, '#F4F6FB', 'start') + trace3(t, evs, -200, 0, 440);
  if (ar !== undefined) close += ck23(-200, -70, 'eigener Arm: kaum', 26, '#6FC3F0', 'start');
  if (zu !== undefined && zu > .6) close += ck23(110, -110, 'fremd!', 34, '#FFE14D');
  if (au !== undefined) close += ck23(0, 84, 'keine Vorhersage', 30, AC23);
  const zk = zu === undefined ? 0 : Math.sin(Math.PI * cl((zu - .5) / .6));
  const sw = ar !== undefined && zu === undefined ? Math.sin(t * 4) : 0;
  let s = classK(t, { close: close }) + skel23(t, { zu: zk, wave: ar !== undefined && zu === undefined ? .35 + .3 * sw : 0, wave2: ar !== undefined && zu === undefined ? .35 - .3 * sw : 0 });
  if (ar !== undefined && zu === undefined) s += ringK(t, SKX - 40, 980, 50);
  if (zu !== undefined && au === undefined) { const k = ease(cl(zu / .5)) * (1 - ease(cl((zu - 1) / .6))); if (k > .02) s += stick23(lerp(FX23, 560, k) + 60, 1420, lerp(FX23 + 200, 800, k), lerp(1300, 1060, k), 0); }
  if (zk > .2) s += '<g opacity="' + zk.toFixed(2) + '">' + svgT(SKX + 120, 640, '!', 90, '#FFE14D') + '</g>';
  return W(s + shade3(), slot(ev, [['haken', 'Fremdes fällt auf', 'hot']])); };
WMASC.k3fremd = (ev, t, lt) => { const ha = ev.haken, zu = ev.zuck; if (zu !== undefined) { const k = ease(cl(zu / .5)) * (1 - ease(cl((zu - 1) / .6))); return stay3([lerp(FX23, 560, k), GY23], 1, { r: 0, mood: 'happy', walk: k > .02 && k < .98 }); } const j = ha === undefined ? 0 : Math.sin(Math.PI * cl(ha / .5)); return stay3([FX23, GY23 - 24 * j], 1, { r: -6 * j, mood: j > .1 ? 'shock' : 'cool' }); };

// ---------- Teil 3: Roboter, Zeiger, Anzeige ----------
function gauge3(x, y, r, v, t) { let s = '<path d="M' + (x - r) + ' ' + y + ' A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + y + '" stroke="#F4F6FB" stroke-width="6" fill="none"/>'; for (let i = 0; i <= 4; i++) { const a = Math.PI * (1 + i / 4); s += '<path d="M' + (x + (r - 14) * Math.cos(a)).toFixed(1) + ' ' + (y + (r - 14) * Math.sin(a)).toFixed(1) + ' L' + (x + r * Math.cos(a)).toFixed(1) + ' ' + (y + r * Math.sin(a)).toFixed(1) + '" stroke="#F4F6FB" stroke-width="4"/>'; }
  const a = Math.PI * (1 + v); s += '<path d="M' + x + ' ' + y + ' L' + (x + (r - 20) * Math.cos(a)).toFixed(1) + ' ' + (y + (r - 20) * Math.sin(a)).toFixed(1) + '" stroke="#FFE14D" stroke-width="8" stroke-linecap="round"/><circle cx="' + x + '" cy="' + y + '" r="10" fill="#FFE14D"/>'; return s; }
WORLD.k3robo = function (sc, ev, t, lt) { const tr = ev.trick, ro = ev.robo, de = ev.delay, al = ev.allein; const k = ro === undefined ? 0 : cl(ro / .6);
  let close = '';
  if (ro === undefined) close = ck23(0, -10, 'Der Trick …', 54, '#FFE14D');
  else if (de === undefined) close = ck23(-200, -100, 'Versuch, London', 30, '#F4F6FB', 'start') + '<g stroke="#F4F6FB" stroke-width="4" fill="none" opacity=".9"><rect x="-190" y="-30" width="80" height="56" rx="8"/><rect x="90" y="-30" width="80" height="56" rx="8"/></g>' + drawK3('M-110 0 H90', cl(ro / 1.2), '#FFE14D', 5) + ck23(-150, 66, 'du', 26) + ck23(130, 66, 'Hand', 26) + ck23(-10, -20, 'Roboter', 24, '#FFE14D');
  else if (al === undefined) { const d = ease(cl((de - .5) / 2.4)); close = gauge3(-90, 40, 110, d, t) + ck23(-90, 90, (d * .2).toFixed(2).replace('.', ',') + ' s', 40, '#FFE14D') + ck23(-90, -90, 'Verzögerung', 26) + ck23(150, -90, 'kitzlig', 26) + '<rect x="120" y="-60" width="60" height="140" rx="10" fill="none" stroke="#F4F6FB" stroke-width="4"/><rect x="126" y="' + (74 - 128 * d).toFixed(0) + '" width="48" height="' + (6 + 128 * d).toFixed(0) + '" rx="8" fill="' + AC23 + '"/>'; }
  else { const a = ease(cl(al / .8)); close = ck23(-200, -50, 'ohne Verzögerung', 32, '#F4F6FB', 'start') + '<rect x="80" y="-72" width="' + (40 * a).toFixed(0) + '" height="30" rx="8" fill="#6FC3F0"/>' + ck23(-200, 30, 'Roboter allein', 32, '#F4F6FB', 'start') + '<rect x="80" y="8" width="' + (150 * a).toFixed(0) + '" height="30" rx="8" fill="#FFE14D"/>'; }
  let s = classK(t, { close: close }) + (ro !== undefined ? ringK(t, SKX, 900, 56) : '');
  const la = de === undefined ? 0 : ease(cl((de - .8) / 2));
  s += skel23(t, { la: la });
  if (ro !== undefined) { const delay = de === undefined ? 0 : .2 * ease(cl((de - .5) / 2.4)), mv = Math.sin((t - delay * 3) * 5); const [r1] = robo23(470, 1520, 20 * Math.sin(t * 5), t, ''), [r2, tip] = robo23(700, 1132, -28 + 8 * mv, t, '', 170, 110);
    s += '<g opacity="' + k.toFixed(2) + '"><path d="M510 1530 Q620 1560 690 1160" stroke="#3A4060" stroke-width="6" fill="none"/>' + r1 + r2 + feather23(tip[0], tip[1], 30 + 20 * mv, .7) + '</g>';
    if (de !== undefined && al === undefined) { const c = ((t * 1.4) % 1); s += '<circle cx="' + lerp(510, 690, c).toFixed(0) + '" cy="' + lerp(1530, 1160, c * c).toFixed(0) + '" r="10" fill="#FFE14D" opacity="' + (1 - c).toFixed(2) + '"/>'; } }
  
  return W(s + shade3(), slot(ev, [['robo', 'Mit Verzögerung kitzliger', 'hot']])); };
WMASC.k3robo = (ev, t, lt) => { const tr = ev.trick; const j = tr === undefined ? 0 : Math.sin(Math.PI * cl(tr / .5)) * (ev.robo === undefined ? 1 : 0); return stay3([FX23, GY23 - 20 * j], 1, { r: 0, mood: ev.delay !== undefined ? 'happy' : 'cool' }); };

['k3hook', 'k3rechnet', 'k3fremd', 'k3robo'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC23); });
