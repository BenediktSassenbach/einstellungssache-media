// B023H "Warum kannst du dich nicht selbst kitzeln?" (Bio, Skript Anatomie, HOOK-PILOT wie P022H, Kostuem B4 Skelett-Anzug), stumme Demo v1 (20.11.2026).
// Ort wie im Skript Anatomie: Bio-Saal mit Tafel (classK aus viz_b007.js), Schulskelett auf dem Podest als Hauptfigur, Grossbild in Kreide links auf der Tafel.
// Einstieg: Das Skelett kitzelt sich selbst mit einer Feder, nichts passiert. Schalti kitzelt es am Fuss, es lacht sich schief.
// Teil 1 Gehirn mit Kleinhirn und Vorhersage, Teil 2 Schalti stupst das Skelett an, es zuckt, Teil 3 zwei Roboterarme mit Verzoegerung.
// Zum Loeschen: diese Datei und videos/B023H.
var AC23 = '#A8E63C', ST23 = '#0B1020', FX23 = 220, GY23 = 1537;
const ck23 = (x, y, txt, sz, col, anchor) => '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" font-size="' + sz + '" font-weight="800" fill="' + (col || '#F4F6FB') + '" font-family="Inter Display" opacity=".92" transform="rotate(-2 ' + x + ' ' + y + ')">' + txt + '</text>';
// Feder: x, y Spitze, r Drehung
const feather23 = (x, y, r, z) => '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + r.toFixed(0) + ') scale(' + (z || 1) + ')"><path d="M0 0 Q20 -40 10 -110 Q-20 -60 0 0 Z" fill="#FF8FD0" stroke="' + ST23 + '" stroke-width="4"/><path d="M0 0 L10 -110" stroke="' + ST23 + '" stroke-width="3"/></g>';
// Skelett: lachen (la 0..1), zucken (zu 0..1)
function skel23(t, o) { o = o || {}; const la = o.la || 0, zu = o.zu || 0; const lean = 14 * la * Math.sin(t * 14) + 10 * zu, y = SKY - 30 * zu;
  return '<g id="figurK">' + skelK(SKX, y, SKA, t, { smile: 1, lean: lean, wave: o.wave || (la > 0 ? .5 + .4 * Math.sin(t * 12) : 0), wave2: o.wave2 || (la > 0 ? .5 - .4 * Math.sin(t * 12) : 0) }) + '</g>'; }
// "Ha" ueber dem Skelett
function haha23(t, k) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 3; i++) { const c = (t * 1.2 + i / 3) % 1; s += '<g opacity="' + (k * (1 - c)).toFixed(2) + '">' + svgT(SKX + 90 + 40 * i, 560 - 60 * c, 'HA', 40, '#FFE14D') + '</g>'; } return s; }
// Gehirn von der Seite in Kreide, Kleinhirn hervorgehoben (kl 0..1)
function brain23(kl, t) { let s = '<path d="M-150 20 Q-170 -70 -80 -90 Q0 -120 80 -90 Q160 -70 150 10 Q140 50 80 50 L-100 50 Q-150 50 -150 20 Z" fill="none" stroke="#F4F6FB" stroke-width="5" opacity=".9"/><path d="M-110 -40 q30 -20 60 0 t60 0 t60 0 M-120 0 q40 -16 80 0 t80 0" stroke="#F4F6FB" stroke-width="3" fill="none" opacity=".6"/>';
  s += '<ellipse cx="100" cy="66" rx="52" ry="30" fill="' + (kl > 0 ? AC23 : 'none') + '" fill-opacity="' + (.75 * kl).toFixed(2) + '" stroke="' + (kl > 0 ? AC23 : '#F4F6FB') + '" stroke-width="5"/><path d="M60 66 h80 M66 56 h68 M66 76 h68" stroke="#F4F6FB" stroke-width="2" opacity=".5"/><path d="M40 60 q10 30 0 50" stroke="#F4F6FB" stroke-width="5" fill="none"/>';
  if (kl > 0) s += ck23(-40, 100, 'Kleinhirn', 26, AC23);
  return s; }
// Welle: gross (Gefuehl) oder gedaempft
function wave23(x, y, w, a, t, col) { let d = ''; for (let i = 0; i <= 40; i++) { const f = i / 40; d += (i ? 'L' : 'M') + (x + w * f).toFixed(1) + ' ' + (y + a * Math.sin(f * 14 + t * 6)).toFixed(1); } return '<path d="' + d + '" stroke="' + (col || '#FFE14D') + '" stroke-width="6" fill="none" stroke-linecap="round"/>'; }
// Roboterarm am Boden: x Fuss, ang Winkel
function robot23(x, y, a, t, lab) { const L1 = 110, L2 = 90, a1 = (-90 + a) * Math.PI / 180, a2 = a1 + .9, x1 = x + L1 * Math.cos(a1), y1 = y + L1 * Math.sin(a1), x2 = x1 + L2 * Math.cos(a2), y2 = y1 + L2 * Math.sin(a2);
  return '<rect x="' + (x - 40) + '" y="' + (y - 10) + '" width="80" height="30" rx="8" fill="#8A8FA8" stroke="' + ST23 + '" stroke-width="5"/><path d="M' + x + ' ' + y + ' L' + x1.toFixed(0) + ' ' + y1.toFixed(0) + ' L' + x2.toFixed(0) + ' ' + y2.toFixed(0) + '" stroke="' + ST23 + '" stroke-width="26" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M' + x + ' ' + y + ' L' + x1.toFixed(0) + ' ' + y1.toFixed(0) + ' L' + x2.toFixed(0) + ' ' + y2.toFixed(0) + '" stroke="#C9CFDD" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="' + x1.toFixed(0) + '" cy="' + y1.toFixed(0) + '" r="12" fill="#FFB020" stroke="' + ST23 + '" stroke-width="4"/>' + (lab ? svgT(x, y + 54, lab, 24, '#F4F6FB') : '') + '|' + x2.toFixed(0) + ',' + y2.toFixed(0); }
// Langer Stab mit Feder (Schalti reicht damit bis aufs Podest)
const stick23 = (x0, y0, x1, y1, w) => '<path d="M' + x0 + ' ' + y0 + ' L' + x1.toFixed(0) + ' ' + y1.toFixed(0) + '" stroke="' + ST23 + '" stroke-width="12" stroke-linecap="round"/><path d="M' + x0 + ' ' + y0 + ' L' + x1.toFixed(0) + ' ' + y1.toFixed(0) + '" stroke="#C98B55" stroke-width="6" stroke-linecap="round"/>' + feather23(x1, y1, 50 + (w || 0), .8);
const robo23 = (x, y, a, t, lab) => { const r = robot23(x, y, a, t, lab).split('|'); return [r[0], r[1].split(',').map(Number)]; };

// ---------- Einstieg ----------
WORLD.h23hook = function (sc, ev, t, lt) { const se = ev.selbst, fr = ev.fremd, lo = ev.loop; const la = fr === undefined ? 0 : cl((fr - .7) / .3) * (lo === undefined ? 1 : 1 - cl((lo - .5) / .5));
  let close = ck23(0, -40, 'selbst kitzeln:', 40) + ck23(0, 20, se === undefined || lt < 1.2 ? '…' : 'nichts', 54, '#FFE14D');
  if (fr !== undefined) close = ck23(0, -60, 'selbst: nichts', 34) + ck23(0, 10, 'andere: Lachen', 40, AC23);
  if (lo !== undefined) close = ck23(-40, -20, 'Wie klappt es', 40) + ck23(-40, 40, 'doch?', 54, '#FFE14D') + '<g transform="translate(170 0) scale(' + (1 + .08 * Math.sin(t * 6)).toFixed(2) + ')">' + ck23(0, 30, '?', 120, '#FFE14D') + '</g>';
  let s = classK(t, { close: close }) + skel23(t, { la: la, wave: fr === undefined ? .55 : 0 });
  if (fr === undefined) s += feather23(SKX + 70 + 6 * Math.sin(t * 9), 900 + 8 * Math.cos(t * 9), -40);
  if (fr !== undefined) { const k = ease(cl(fr / .7)), wg = 10 * Math.sin(t * 12) * cl((fr - .6) / .3); s += stick23(lerp(FX23, 470, k) + 60, 1420, lerp(FX23 + 200, 790, k) + wg, lerp(1300, 1115, k), wg * 2) + haha23(t, la); }
  return W(s + shade3()); };
WMASC.h23hook = (ev, t, lt) => { const fr = ev.fremd, lo = ev.loop; if (fr !== undefined && lo === undefined) { const k = ease(cl(fr / .7)); return stay3([lerp(FX23, 470, k), GY23], 1, { r: 0, mood: 'happy', walk: k < 1 }); } if (lo !== undefined) { const k = ease(cl(lo / .8)); return stay3([lerp(470, FX23, k), GY23], 1, { r: 0, mood: 'happy', walk: k < 1, flip: k < 1 }); } return stay3([FX23, GY23], 1, { r: 2, mood: 'cool' }); };

// ---------- Teil 1: das Gehirn rechnet ----------
WORLD.h23rechnet = function (sc, ev, t, lt) { const vo = ev.vorher, kl = ev.klein, da = ev.daempf;
  let close = brain23(kl === undefined ? 0 : cl(kl / .5), t);
  if (vo !== undefined && kl === undefined) close += ck23(0, -120 + 6, 'sagt voraus', 30, '#FFE14D');
  if (da !== undefined) { const d = ease(cl((da - .6) / 1.2)); close = '<g transform="translate(-60 -10) scale(.7)">' + brain23(1, t) + '</g>' + wave23(40, -40, 170, lerp(40, 4, d), t) + ck23(120, 60, d > .5 ? 'gedämpft' : 'Gefühl', 30, '#FFE14D'); }
  let s = classK(t, { close: close }) + skel23(t, { wave: vo !== undefined && kl === undefined ? .8 : 0 });
  if (da !== undefined) s += feather23(SKX + 70 + 6 * Math.sin(t * 9), 900, -40);
  return W(s + shade3(), slot(ev, [['vorher', 'Gehirn sagt voraus'], ['klein', 'Vermutlich: Kleinhirn', 'hot'], ['daempf', 'Vorhersage dämpft']])); };
WMASC.h23rechnet = (ev, t, lt) => { const da = ev.daempf; if (da !== undefined) { const j = Math.sin(Math.PI * cl((da - .4) / .6)); return stay3([FX23, GY23 - 20 * j], 1, { r: 0, mood: 'cool' }); } return stay3([FX23, GY23], 1, { r: 2 * Math.sin(t * 2) }); };

// ---------- Teil 2: Fremdes faellt auf ----------
WORLD.h23fremd = function (sc, ev, t, lt) { const ha = ev.haken, ar = ev.arm, zu = ev.zuck, au = ev.auf;
  let close = '';
  if (ar !== undefined) close += ck23(-200, -40, 'eigener Arm', 30, '#F4F6FB', 'start') + '<rect x="40" y="-62" width="' + (40 * cl(ar / .6)).toFixed(0) + '" height="30" rx="8" fill="#6FC3F0"/>' + ck23(110, -40, 'leise', 26, '#6FC3F0', 'start');
  if (zu !== undefined) close += ck23(-200, 30, 'fremde Hand', 30, '#F4F6FB', 'start') + '<rect x="40" y="8" width="' + (170 * ease(cl(zu / .6))).toFixed(0) + '" height="30" rx="8" fill="#FFE14D"/>';
  if (au !== undefined) close += ck23(0, 90, 'keine Vorhersage', 30, AC23);
  const zk = zu === undefined ? 0 : Math.sin(Math.PI * cl((zu - .5) / .6));
  let s = classK(t, { close: close }) + skel23(t, { zu: zk, wave: ar !== undefined && zu === undefined ? .3 + .2 * Math.sin(t * 4) : 0 }) + hakenH(ar === undefined ? ha : undefined, t);
  if (zu !== undefined && au === undefined) { const k = ease(cl(zu / .5)) * (1 - ease(cl((zu - 1) / .6))); if (k > .02) s += stick23(lerp(FX23, 560, k) + 60, 1420, lerp(FX23 + 200, 800, k), lerp(1300, 1060, k), 0); }
  if (zk > .2) s += '<g opacity="' + zk.toFixed(2) + '">' + svgT(SKX + 120, 640, '!', 90, '#FFE14D') + '</g>';
  return W(s + shade3(), slot(ev, [['haken', 'Ziemlich clever', 'red'], ['arm', 'Eigene Berührung: kaum', 'hot'], ['zuck', 'Fremde: du zuckst'], ['auf', 'Ohne Vorhersage fällt es auf', 'hot']])); };
WMASC.h23fremd = (ev, t, lt) => { const zu = ev.zuck, au = ev.auf;
  if (zu !== undefined && au === undefined) { const k = ease(cl(zu / .5)), back2 = ease(cl((zu - 1) / .6)); return stay3([lerp(FX23, 560, k * (1 - back2)), GY23], 1, { r: 0, mood: back2 > 0 ? 'shock' : 'happy', walk: k < 1 || (back2 > 0 && back2 < 1), flip: back2 > 0 && back2 < 1 }); }
  return stay3([FX23, GY23], 1, { r: 2 }); };

// ---------- Teil 3: der Roboter ----------
WORLD.h23robo = function (sc, ev, t, lt) { const tr = ev.trick, ro = ev.robo, de = ev.delay; const k = ro === undefined ? 0 : cl(ro / .6);
  let close = ck23(0, -30, 'Versuch, London', 34);
  if (de !== undefined) { const d = ease(cl((de - .5) / 2.4)); close = ck23(-120, -50, 'Verzögerung', 28) + ck23(-120, 10, (d * .2).toFixed(2).replace('.', ',') + ' s', 46, '#FFE14D') + ck23(120, -50, 'kitzlig', 28) + '<rect x="90" y="' + (60 - 120 * d).toFixed(0) + '" width="60" height="' + (20 + 120 * d).toFixed(0) + '" rx="8" fill="' + AC23 + '"/>'; }
  let s = classK(t, { close: close });
  const la = de === undefined ? 0 : ease(cl((de - .8) / 2));
  s += skel23(t, { la: la });
  if (ro !== undefined) { const delay = de === undefined ? 0 : .2 * ease(cl((de - .5) / 2.4)), mv = Math.sin((t - delay * 3) * 5); const [r1, t1] = robo23(470, 1520, 20 * Math.sin(t * 5), t, 'du bewegst'), [r2, tip] = robo23(720, 1150, -20 + 15 * mv, t, '');
    s += '<g opacity="' + k.toFixed(2) + '"><path d="M510 1530 Q620 1560 690 1160" stroke="#3A4060" stroke-width="6" fill="none"/>' + r1 + r2 + feather23(tip[0], tip[1], 30 + 20 * mv, .7) + '</g>'; }
  if (la > .3) s += haha23(t, la);
  return W(s + shade3(), slot(ev, [['trick', 'Der Trick vom Anfang', 'hot'], ['robo', 'Roboter dazwischen'], ['delay', 'Mit Verzögerung kitzliger', 'hot']])); };
WMASC.h23robo = (ev, t, lt) => { const ro = ev.robo; if (ro !== undefined) { const k = ease(cl(ro / .8)); return stay3([FX23 + 40 * k, GY23], 1, { r: 0, mood: 'happy', walk: k > 0 && k < 1 }); } return stay3([FX23, GY23], 1, { r: 2 }); };

// ---------- Schluss ----------
WORLD.h23out = function (sc, ev, t, lt) { const au = ev.aufl, sv = ev.save; let close = sv === undefined && au !== undefined ? ck23(0, -20, 'Gehirn', 40) + ck23(0, 40, 'ausgetrickst', 50, AC23) : '';
  let s = classK(t, { close: close }) + skel23(t, { la: sv === undefined ? .5 : 0, wave: sv !== undefined ? .55 : 0 });
  if (sv !== undefined) s += feather23(SKX + 70 + 6 * Math.sin(t * 9), 900 + 8 * Math.cos(t * 9), -40);
  return W(s + shade3()); };
WMASC.h23out = (ev, t, lt) => { const sv = ev.save; if (sv !== undefined) return stay3([lerp(260, FX23, ease(cl(sv / .8))), GY23], 1, { r: 0, mood: 'happy', walk: sv < .8, flip: sv < .8 }); return stay3([260, GY23], 1, { r: 2, mood: 'happy' }); };

['h23hook', 'h23rechnet', 'h23fremd', 'h23robo', 'h23out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC23); });
