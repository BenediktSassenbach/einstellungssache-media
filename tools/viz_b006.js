// B006 "Wie gefaehrlich war der Velociraptor?" (Bio, Dino-Skript, Kostuem B2 Dino-Kostuem), Fassung v2 (17.11.2026).
// Benedikts Wunsch: mehr Interaktion, der Raptor gross und aktiv, kein leerer Raum. Am Ende ein realistisches KI-Bild.
// Ort: Urzeit-Lichtung (urD aus viz_b001d.js); im Einstieg mit Felswand fuer den Film-Schatten; in Teil 3 eine Grabungsstelle in der Mongolei.
// Einstieg: riesiger Schatten an der Wand, heraus kommt ein kleiner gefiederter Raptor, jagt eine Libelle, bemerkt Schalti, faucht, zwickt ihn.
// Teil 1: Truthahn kommt dazu (gleich gross), Massband (Schwanz schlaegt), Wippe als Waage, groesserer Verwandter (Deinonychus) taucht auf.
// Teil 2: Raptor plustert sich auf (Schalti niest), Lupe auf die Federkiel-Hoecker, Vogel landet auf seinem Kopf, Flugversuch ohne Abheben.
// Teil 3: Fauchen, Lupe auf die Sichelkralle, Schalti pinselt den Kampf-Fund frei, realistisches Bild. Schluss: Raptor setzt sich zu Schalti.
// Zum Loeschen: diese Datei, viz_b006img.js (falls vorhanden) und videos/B006. turkeyD in viz_dino.js bleibt fuer spaetere Folgen.
var RAP6 = { a: '#3FA9F5', b: '#1E6FC2', be: '#EAF6FF', sp: '#1B5DA8' }, DEI6 = { a: '#6E7A52', b: '#46512F', be: '#E2DDC2', sp: '#343C22' }, AC6 = '#A8E63C';
var RX6 = 660, RY6 = 1440, RS6 = 1.15;
function rap6(x, y, s, t, o) { return rexd(x, y, s, t, Object.assign({ kind: 'rap', pal: RAP6, tl: .74, fa: 1.5, feath: 1, id: 'v' }, o)); }
function cliff6() { return '<defs><linearGradient id="cl6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D8A47A"/><stop offset="1" stop-color="#9C6B4A"/></linearGradient></defs><path d="M330 1040 L360 760 L430 640 L560 600 L700 560 L860 590 L980 540 L1100 560 V1040 Z" fill="url(#cl6)" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><path d="M470 700 l30 80 l-14 60 M760 620 l-20 90 l26 70 M930 640 l16 110" stroke="#7A4E32" stroke-width="6" fill="none" stroke-linecap="round"/>'; }
function shad6(x, y, s, t, o, op) { return '<clipPath id="cl6c"><path d="M330 1040 L360 760 L430 640 L560 600 L700 560 L860 590 L980 540 L1100 560 V1040 Z"/></clipPath><g clip-path="url(#cl6c)"><g style="filter:brightness(0)" opacity="' + op.toFixed(3) + '">' + rexd(x, y, s, t, Object.assign({ kind: 'rap', pal: RAP6, shadow: 0, tl: .74, id: 'sh' }, o)) + '</g></g>'; }
function lupe6(cx, cy, r, inner, k, hx, hy) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + e.toFixed(3) + ')"><clipPath id="lu6' + cx + '"><circle r="' + r + '"/></clipPath><circle r="' + r + '" fill="#FFF6DF"/><g clip-path="url(#lu6' + cx + ')">' + inner + '</g><circle r="' + r + '" fill="none" stroke="#F4F6FB" stroke-width="12"/><circle r="' + (r + 6) + '" fill="none" stroke="#0B1020" stroke-width="4"/></g><path d="M' + (cx - r * .7 * e).toFixed(0) + ' ' + (cy + r * .7 * e).toFixed(0) + ' L' + hx + ' ' + hy + '" stroke="#F4F6FB" stroke-width="24" stroke-linecap="round" opacity="' + cl(k * 2).toFixed(2) + '"/>'; }
function fly6(x, y, t) { const w = Math.sin(t * 60) * 14; return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"><ellipse cx="-6" cy="-6" rx="20" ry="' + (6 + Math.abs(w) * .3).toFixed(1) + '" fill="#DDF6FF" opacity=".7" transform="rotate(' + (-30 + w) + ')"/><ellipse cx="6" cy="-6" rx="20" ry="' + (6 + Math.abs(w) * .3).toFixed(1) + '" fill="#DDF6FF" opacity=".7" transform="rotate(' + (30 - w) + ')"/><path d="M-30 0 H22" stroke="#2FB8A8" stroke-width="7" stroke-linecap="round"/><circle cx="26" cy="0" r="7" fill="#1E7A70"/></g>'; }
const peck6 = t => 30 * Math.max(0, Math.sin(t * 4.4)) * (Math.sin(t * 1.1) > -.3 ? 1 : 0);
const sneeze6 = (x, y, k) => k <= 0 ? '' : '<g opacity="' + cl(k).toFixed(2) + '">' + [0, 1, 2].map(i => '<circle cx="' + (x + 30 + i * 22) + '" cy="' + (y - 10 - i * 14) + '" r="' + (6 + i * 3) + '" fill="#F4F6FB"/>').join('') + '</g>';

// ---------- Einstieg ----------
function hk6(ev, lt, t) { const fr = ev.frage, dr = ev.dreh, zw = ev.zwick;
  const out = fr === undefined ? 0 : ease(cl(fr / 1.2)), step = dr === undefined ? 0 : ease(cl((dr - .4) / .6)), lun = zw === undefined ? 0 : ease(cl(zw / .3));
  return { x: lerp(1200, RX6, out) - 60 * step - 110 * lun, out, step, lun, walk: (fr !== undefined && out < 1) || (step > 0 && step < 1) || (lun > 0 && lun < 1) }; }
WORLD.b6hook = function (sc, ev, t, lt) { const U = urD(t), H = hk6(ev, lt, t), dr = ev.dreh, zw = ev.zwick; let s = U.b + cliff6();
  const grow = ease(cl(lt / 1)), ssc = lerp(1.7, 1.1, H.out) * (.75 + .25 * grow), jawS = .5 + .5 * Math.sin(t * 5);
  s += shad6(lerp(560, H.x - 80, H.out), 1160, ssc, t, { feath: H.out > .5 ? 1 : 0, jaw: H.out < 1 ? jawS : .1, head: -6 }, .55 * (1 - .55 * H.out));
  // Libelle: kreist um den Kopf, bis der Raptor Schalti bemerkt
  const chase = ev.frage !== undefined && dr === undefined, flyGone = dr === undefined ? 0 : cl(dr / .8);
  let fx = H.x - 360 + 90 * Math.sin(t * 2.3), fy = RY6 - 520 + 60 * Math.sin(t * 3.1); if (flyGone > 0) { fx += 700 * flyGone; fy -= 500 * flyGone; }
  if (ev.frage !== undefined && flyGone < 1) s += fly6(fx, fy, t);
  const snapF = chase ? Math.max(0, Math.sin(t * 3.4)) : 0, zwq = zw === undefined ? 0 : Math.max(0, Math.sin(Math.PI * cl((zw - .2) / .35)));
  s += rap6(H.x, RY6, RS6, t, { run: H.walk ? 1 : 0, head: zw !== undefined ? 26 * zwq + 10 : (dr !== undefined ? 16 : (chase ? -14 + 10 * Math.sin(t * 2.3) : peck6(t))), jaw: zw !== undefined ? zwq : (dr !== undefined ? .4 + .25 * Math.sin(t * 9) : snapF * .8) });
  if (dr !== undefined && zw === undefined) s += roard(H.x - 360, RY6 - 330, 200, t, cl((dr - .3) / .3) * .6);
  s += U.f; if (H.out < .3) for (let i = 0; i < 4; i++) s += frondD(1100, 1300, -170 + i * 18, 360, t, i % 2 ? '#2A9450' : '#22874A', i);
  return W(s + shade3()); };
WMASC.b6hook = (ev, t, lt) => { const zw = ev.zwick, dr = ev.dreh;
  if (zw !== undefined) { if (zw < .45) return stay3(HOME3, 1, { r: -4, mood: 'shock' }); return hop3(cl((zw - .45) / .45), HOME3, [150, 1537], 50, 1, 1, { r: -16, mood: zw > .9 ? 'cool' : 'shock' }); }
  if (dr !== undefined) return stay3(HOME3, 1, { r: -8, mood: 'shock' });
  if (ev.frage === undefined) return stay3([220 - 10 * ease(cl(lt / .6)), 1537], 1, { r: -10 * ease(cl(lt / .6)), mood: 'shock' });
  return stay3([210, 1537], 1, { r: 2 * Math.sin(t * 3) }); };

// ---------- Teil 1: Groesse ----------
var TK6 = 940; // Platz des Truthahns
function seesaw6(k, a) { if (k <= .01) return ''; const cx = 560, cy = 1540, L = 300, ca = Math.cos(a), sa = Math.sin(a); return '<g opacity="' + cl(k).toFixed(2) + '"><path d="M' + (cx - 46) + ' 1548 L' + cx + ' ' + (cy + 8) + ' L' + (cx + 46) + ' 1548 Z" fill="#8B5E3C" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><g transform="rotate(' + (a * 180 / Math.PI).toFixed(2) + ' ' + cx + ' ' + cy + ')"><rect x="' + (cx - L) + '" y="' + (cy - 16) + '" width="' + (2 * L) + '" height="24" rx="10" fill="#C9A36A" stroke="#0B1020" stroke-width="6"/></g></g>'; }
const plank6 = (x, a) => 1524 + (x - 560) * Math.tan(a);
WORLD.b6size = function (sc, ev, t, lt) { const U = urD(t), tr = ev.trut, ma = ev.mass, ki = ev.kilo, fi = ev.film; let s = U.b, h = '';
  // groesserer Verwandter (Deinonychus) kommt im letzten Satz von rechts hinten
  if (fi !== undefined) { const q = ease(cl(fi / 1.4)); s += rexd(lerp(1500, 860, q), 1330, 2.05, t, { kind: 'rap', pal: DEI6, tl: .8, fa: 1.5, feath: 1, id: 'dei', fcol: ['#A0703A', '#C9A36A'], run: q < 1 ? 1 : 0, head: q >= 1 ? 10 : 0, jaw: q >= 1 ? .35 + .2 * Math.sin(t * 6) : 0 }) + roard(lerp(1500, 860, q) - 680, 1330 - 720, 200, t, q >= 1 ? .4 : 0); }
  // Truthahn kommt im ersten Satz, bleibt bis zur Wippe
  if (tr !== undefined && ki === undefined) { const q = ease(cl((tr - .3) / 1.2)); s += turkeyD(lerp(1250, TK6, q), RY6, 1.55, t, { walk: q < 1, peck: q >= 1 && ma === undefined ? Math.max(0, Math.sin(t * 3)) * .6 : 0, fan: q >= 1 ? 1 : .3 }); }
  // Wippe als Waage
  const sw = ki === undefined ? 0 : cl((ki - .1) / .3), tilt = ki === undefined ? 0 : .1 * ease(cl((ki - 1.2) / .5)), onS = ki !== undefined && ki > 1.2;
  if (sw > 0 && fi === undefined) s += seesaw6(sw, tilt);
  // Raptor
  let rx = RX6, ry = RY6, o = { head: peck6(t) * .5 };
  if (tr !== undefined && ma === undefined) { const q = cl((tr - 1.5) / 1); o = { head: -8 - 10 * q, jaw: q > .5 ? .2 : 0 }; }
  if (ma !== undefined && ki === undefined) { const flick = Math.max(0, Math.sin(Math.PI * cl((ma - 1.6) / .5))); o = { head: 4, tl: .74 + .08 * flick }; }
  if (ki !== undefined && fi === undefined) { const q = cl((ki - .6) / .6); if (q > 0) { const e = ease(q); rx = lerp(RX6, 780, e); ry = lerp(RY6, plank6(780, tilt), e) - 90 * Math.sin(Math.PI * e); } if (q >= 1) ry = plank6(780, tilt); o = { head: 6, shadow: q > 0 ? 0 : 1 }; }
  if (fi !== undefined) { const q = ease(cl((fi - .4) / .8)); rx = lerp(ki !== undefined ? 780 : RX6, 420, q); ry = RY6 + 40 * q; o = { run: q > 0 && q < 1 ? 1 : 0, head: q >= 1 ? -10 : 0, flip: q > 0 && q < 1 ? 0 : 0 }; }
  s += rap6(rx, ry, RS6, t, o);
  if (ma !== undefined && ki === undefined) { const k = ease(cl((ma - .2) / .9)), xs = RX6 - 316 * RS6, xe = RX6 + (96 + 318 * .74) * RS6, yb = RY6 + 30, hip = RY6 - 188 * RS6;
    s += '<path d="M260 ' + yb + ' L' + lerp(xs, xe, k).toFixed(0) + ' ' + yb + '" stroke="#FFE14D" stroke-width="12" stroke-linecap="round"/><rect x="236" y="' + (yb - 26) + '" width="52" height="52" rx="12" fill="#FFB020" stroke="#0B1020" stroke-width="5"/>';
    for (let i = 1; i < 10; i++) { const tx = lerp(xs, xe, i / 10); if (tx < lerp(xs, xe, k)) s += '<path d="M' + tx.toFixed(0) + ' ' + (yb - 8) + ' v16" stroke="#0B1020" stroke-width="3"/>'; }
    if (k > .95) s += chip3((xs + xe) / 2, yb + 60, 'rund 2 m', 34, '#FFE14D', '#0B1020', cl((ma - 1.1) / .3));
    const kh = ease(cl((ma - 1.4) / .5)); if (kh > 0) s += '<path d="M' + (RX6 + 150) + ' ' + RY6 + ' V' + lerp(RY6, hip, kh).toFixed(0) + '" stroke="#3DFF7A" stroke-width="10" stroke-linecap="round"/>' + chip3(RX6 + 240, RY6 - 60, '0,5 m', 34, '#3DFF7A', '#0B1020', cl((ma - 1.8) / .3)); }
  if (ki !== undefined && fi === undefined) s += chip3(560, 1000, 'höchstens etwa 15 kg', 40, '#FFE14D', '#0B1020', cl((ki - 1.6) / .3));
  s += U.f;
  h += slot(ev, [['trut', 'So groß wie ein Truthahn'], ['mass', 'Rund 2 m lang, etwa kniehoch'], ['kilo', 'Höchstens etwa 15 Kilo', 'hot'], ['film', 'Film-Raptoren: größerer Verwandter']]);
  return W(s + shade3(), h); };
WMASC.b6size = (ev, t, lt) => { const ma = ev.mass, ki = ev.kilo, fi = ev.film;
  if (fi !== undefined) { const tilt = ki !== undefined ? .1 : 0, q = ease(cl(fi / .6)); return stay3([lerp(330, 240, q), lerp(plank6(330, tilt), 1537, q)], 1, { r: -10 * q, mood: fi > .5 ? 'shock' : 'happy' }); }
  if (ki !== undefined) { const tilt = .1 * ease(cl((ki - 1.2) / .5)); if (ki < .8) return hop3(ki / .8, [lerp(220, 260, 1), 1537], [330, plank6(330, 0)], 60, 1, 1, { r: 10 }); return stay3([330, plank6(330, tilt)], 1, { r: -14 * tilt * 10, mood: tilt > .05 ? 'shock' : 'happy' }); }
  if (ma !== undefined) { const flick = Math.max(0, Math.sin(Math.PI * cl((ma - 1.6) / .5))); return stay3([260 - 30 * flick, 1537], 1, { r: 10 - 20 * flick, mood: flick > .2 ? 'shock' : 'happy' }); }
  return stay3([lerp(150, 220, ease(cl(lt / .6))), 1537], 1, { r: 2 }); };

// ---------- Teil 2: Federn ----------
function arm6() { let s = '<rect x="-260" y="-260" width="520" height="520" fill="#F7E7C4"/><path d="M-210 30 Q0 -10 210 20" stroke="#0B1020" stroke-width="64" stroke-linecap="round" fill="none"/><path d="M-210 30 Q0 -10 210 20" stroke="#F4EBD0" stroke-width="52" stroke-linecap="round" fill="none"/>';
  for (let i = 0; i < 7; i++) s += '<circle cx="' + (-150 + i * 48) + '" cy="' + (-32 - 4 * Math.sin(i)) + '" r="17" fill="#E8D2A6" stroke="#0B1020" stroke-width="4"/>'; return s; }
WORLD.b6feder = function (sc, ev, t, lt) { const U = urD(t), fe = ev.feder, ho = ev.hoeck, vo = ev.vogel, fl = ev.flieg; let s = U.b, h = '';
  const puff = fe !== undefined && ho === undefined ? 1 + .3 * Math.sin(Math.PI * cl(fe / 1.4)) : 1, wing = ho !== undefined && fl === undefined ? .85 : (fe !== undefined && ho === undefined ? .7 * Math.sin(Math.PI * cl(fe / 1.4)) : 0);
  let rx = 600, ry = RY6, hop = 0; if (fl !== undefined) { const q = cl(fl / 2); rx = 600 + 120 * Math.sin(Math.PI * q); hop = 130 * Math.max(0, Math.sin(Math.PI * cl((fl - .3) / .8))) + 70 * Math.max(0, Math.sin(Math.PI * cl((fl - 1.2) / .6))); }
  s += rap6(rx, ry - hop, RS6, t, { feath: puff, wing: fl !== undefined ? .9 : wing, head: ho !== undefined && vo === undefined ? -6 : (vo !== undefined && fl === undefined ? -16 : peck6(t) * .3), shadow: hop > 10 ? 0 : 1 });
  if (fl !== undefined && hop < 5 && fl > 1) s += puffb(rx, ry - 20, (fl - 1.75) / .5, 120);
  if (fe !== undefined && fe < 2) for (let i = 0; i < 7; i++) { const k = cl((fe - .2 - i * .08) / 1.2); if (k > 0 && k < 1) s += '<path transform="translate(' + (rx - 200 + i * 60 + 24 * Math.sin(k * 6 + i)).toFixed(0) + ' ' + (ry - 420 + 380 * k).toFixed(0) + ') rotate(' + (40 * Math.sin(k * 7 + i)).toFixed(0) + ') scale(1.6)" d="M0 0 Q14 -8 34 0 Q14 8 0 0 Z" fill="' + ['#FFD23F', '#FF6BD6'][i % 2] + '" stroke="#0B1020" stroke-width="3" opacity="' + (1 - k).toFixed(2) + '"/>'; }
  if (fe !== undefined && ho === undefined) s += sneeze6(320, 1300, cl((fe - 1.4) / .2) * (1 - cl((fe - 2.2) / .3)));
  if (ho !== undefined && vo === undefined) s += lupe6(560, 960, 190, arm6(), cl((ho - .3) / .4), 400, 1380);
  if (vo !== undefined) { const q = ease(cl(vo / 1)), away = fl === undefined ? 0 : ease(cl((fl - .4) / 1)); const hx = rx - 250, hy = ry - hop - 470; s += birdd(lerp(lerp(1150, hx, q), 1200, away), lerp(lerp(700, hy, q), 560, away) - (q < 1 || away > 0 ? 20 * Math.sin(t * 9) : 0), .8, t, { id: 'v6', glide: q >= 1 && away === 0 ? 1 : 0 }); }
  s += U.f;
  h += slot(ev, [['feder', 'Er hatte Federn'], ['hoeck', '2007: Höcker für Federkiele am Unterarm', 'hot'], ['vogel', 'Wie bei Vögeln heute'], ['flieg', 'Fliegen konnte er nicht']]);
  return W(s + shade3(), h); };
WMASC.b6feder = (ev, t, lt) => { const fe = ev.feder, ho = ev.hoeck, fl = ev.flieg;
  if (fl !== undefined) { const j = Math.max(0, Math.sin(Math.PI * cl((fl - 1.9) / .5))); return stay3([240, 1537 - 50 * j], 1, { r: 16 * Math.sin(t * 20) * (fl > 1.9 && fl < 2.4 ? 1 : 0), mood: 'happy' }); }
  if (ho !== undefined) return stay3([lerp(240, 330, ease(cl(ho / .5))), 1537], 1, { r: 10 });
  if (fe !== undefined) { const sn = fe > 1.4 && fe < 2.2; return stay3([240, 1537], 1, sn ? { r: -18, mood: 'shock' } : { r: 4, mood: 'happy' }); }
  return stay3([lerp(220, 240, ease(cl(lt / .5))), 1537], 1, { r: 2 }); };

// ---------- Teil 3: Kralle und Kampf-Fund ----------
function claw6() { return '<rect x="-260" y="-260" width="520" height="520" fill="#CFE8F7"/><path d="M-220 140 Q-60 80 80 110" stroke="#0B1020" stroke-width="70" stroke-linecap="round" fill="none"/><path d="M-220 140 Q-60 80 80 110" stroke="' + RAP6.b + '" stroke-width="56" stroke-linecap="round" fill="none"/><path d="M-40 90 C-60 -50 40 -150 160 -120 C60 -90 20 -10 10 80 Z" fill="#F4EBD0" stroke="#0B1020" stroke-width="7" stroke-linejoin="round"/><path d="M-10 60 C-20 -30 40 -100 120 -110" stroke="#fff" stroke-width="6" fill="none" opacity=".7"/>'; }
function desert6(t) { let s = '<defs><linearGradient id="ds6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BA8E8"/><stop offset=".7" stop-color="#F7D9A8"/><stop offset="1" stop-color="#FCE8C4"/></linearGradient><linearGradient id="dg6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8B878"/><stop offset="1" stop-color="#B8804A"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#ds6)"/><circle cx="820" cy="780" r="70" fill="#FFF3C8"/>';
  s += '<path d="M-20 1060 L80 900 L210 940 L300 820 L420 860 L520 760 L640 830 L760 780 L880 880 L1100 840 V1080 H-20 Z" fill="#C8643A" stroke="#0B1020" stroke-width="5"/><path d="M-20 980 Q300 950 600 990 T1100 970" stroke="#A84A28" stroke-width="10" fill="none"/>';
  s += '<path d="M-20 1060 Q540 1030 1100 1060 V1920 H-20 Z" fill="url(#dg6)"/>'; for (let i = 0; i < 30; i++) s += '<circle cx="' + (rnd(i + 5) * 1080).toFixed(0) + '" cy="' + (1080 + rnd(i + 9) * 800).toFixed(0) + '" r="' + (2 + 4 * rnd(i)).toFixed(0) + '" fill="#9A6A3A" opacity=".4"/>';
  return s; }
function fossil6(rev) { const B = 'stroke="#F6EDD4" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"', B2 = B.replace('11', '7'), O = 'stroke="#5A3A20" stroke-width="17" fill="none" stroke-linecap="round" stroke-linejoin="round"', O2 = O.replace('17', '12');
  let g = '';
  const draw = (d, w) => g += '<path d="' + d + '" ' + (w ? O2 : O) + '/><path d="' + d + '" ' + (w ? B2 : B) + '/>';
  // Velociraptor (links): Schaedel, Hals, Wirbelsaeule, steifer Schwanz, Beine mit Sichelkralle, Arm greift den Kopf des Protoceratops
  draw('M170 1290 Q260 1250 340 1280 Q420 1300 470 1250'); draw('M470 1250 Q520 1220 560 1250'); draw('M120 1300 L170 1290', 1);
  g += '<path d="M560 1250 L640 1230 L660 1245 L600 1275 Z" fill="#F6EDD4" stroke="#5A3A20" stroke-width="6"/><circle cx="590" cy="1248" r="7" fill="#5A3A20"/>';
  for (let i = 0; i < 6; i++) draw('M' + (360 + i * 18) + ' ' + (1285 - i * 6) + ' q-6 40 6 60', 1);
  draw('M380 1300 L350 1380 L380 1440 L340 1470', 1); draw('M420 1300 L470 1370 L500 1340', 1); draw('M500 1340 q14 -30 6 -48', 1);
  draw('M500 1255 L560 1300 L640 1300', 1);
  // Protoceratops (rechts): Schaedel mit Nackenschild und Schnabel, Koerper, Beine
  g += '<path d="M640 1300 Q700 1210 790 1230 Q830 1260 800 1320 Q760 1360 690 1340 Z" fill="none" ' + O + '/><path d="M640 1300 Q700 1210 790 1230 Q830 1260 800 1320 Q760 1360 690 1340 Z" fill="none" ' + B + '/><path d="M640 1300 L610 1320 L650 1335" ' + B2 + '/>';
  draw('M800 1320 Q860 1350 930 1340'); for (let i = 0; i < 5; i++) draw('M' + (820 + i * 22) + ' ' + (1335 + i * 2) + ' q4 36 -4 56', 1); draw('M840 1360 L830 1440 M900 1360 L910 1440', 1);
  return '<g transform="translate(0 -470)"><clipPath id="fos6">' + rev + '</clipPath><g clip-path="url(#fos6)"><rect x="80" y="1180" width="900" height="320" fill="#C99A62"/>' + g + '</g></g>'; }
WORLD.b6kralle = function (sc, ev, t, lt) { const ha = ev.harm, kr = ev.kralle, fu = ev.fund, fo = ev.foto; const U = urD(t); let C = U.b, h = '';
  const growl = ha !== undefined && kr === undefined, tap = kr !== undefined ? Math.max(0, Math.sin(t * 7)) : 0;
  C += rap6(620 - (growl ? 40 * ease(cl(ha / .6)) : 0), RY6, RS6, t, { jaw: growl ? .5 + .3 * Math.sin(t * 9) : 0, head: growl ? 16 : (kr !== undefined ? 22 : peck6(t) * .4), run: growl && ha < .6 ? 1 : 0 });
  if (growl) C += roard(620 - 40 - 360, RY6 - 330, 200, t, cl((ha - .3) / .3) * .6);
  if (kr !== undefined) { C += '<ellipse cx="560" cy="' + (RY6 + 6) + '" rx="46" ry="20" fill="#8D8FA3" stroke="#0B1020" stroke-width="5"/>'; if (tap > .9) C += '<path d="M520 ' + (RY6 - 30) + ' l-20 -20 M560 ' + (RY6 - 40) + ' v-26 M600 ' + (RY6 - 30) + ' l20 -20" stroke="#FFE14D" stroke-width="6" stroke-linecap="round"/>'; C += lupe6(760, 980, 200, claw6(), cl((kr - .2) / .4), 380, 1380); }
  C += U.f;
  let s = C;
  if (fu !== undefined) { let D = desert6(t); const prog = ease(cl((fu - .5) / 3)); let rev = ''; for (let i = 0; i < 18; i++) { const r = cl(prog * 18 - i) * 110; if (r > 0) rev += '<circle cx="' + (140 + (i % 6) * 150 + 20 * rnd(i)).toFixed(0) + '" cy="' + (1230 + Math.floor(i / 6) * 100).toFixed(0) + '" r="' + r.toFixed(0) + '"/>'; }
    D += '<rect x="60" y="690" width="940" height="360" rx="20" fill="#D9A86A" stroke="#8A5A32" stroke-width="6"/><path d="M60 1050 Q540 1090 1000 1050 V1110 H60 Z" fill="#B8804A"/>' + fossil6(rev);
    if (prog < 1) { const bx = 140 + (Math.floor(prog * 18) % 6) * 150, by = 760 + Math.floor(Math.floor(prog * 18) / 6) * 100; D += '<g transform="translate(' + (bx + 20 * Math.sin(t * 14)).toFixed(0) + ' ' + (by - 30) + ') rotate(-30)"><rect x="-10" y="-90" width="20" height="80" rx="6" fill="#8B5E3C" stroke="#0B1020" stroke-width="4"/><rect x="-22" y="-14" width="44" height="40" rx="6" fill="#F2D06A" stroke="#0B1020" stroke-width="4"/></g>'; for (let i = 0; i < 4; i++) { const ph = (t * 3 + i / 4) % 1; D += '<circle cx="' + (bx + 40 + 50 * ph).toFixed(0) + '" cy="' + (by - 10 - 40 * ph).toFixed(0) + '" r="' + (4 + 6 * ph).toFixed(0) + '" fill="#E8C08A" opacity="' + (1 - ph).toFixed(2) + '"/>'; } }
    D += chip3(540, 1135, 'Fund aus der Mongolei', 36, '#FFE14D', '#0B1020', cl((fu - .3) / .3));
    s = wipe3(C, D, fu, .5, AC6); }
  if (fo !== undefined) s += photo6(t, fo);
  h += slot(ev, [['harm', 'Harmlos war er nicht'], ['kralle', 'Große, gebogene Kralle am Fuß', 'hot'], ['fund', 'Fund: mitten im Kampf'], ['foto', 'So könnte er ausgesehen haben']]);
  return W(s + shade3(), h); };
WMASC.b6kralle = (ev, t, lt) => { const ha = ev.harm, kr = ev.kralle, fu = ev.fund, fo = ev.foto;
  if (fu !== undefined) { const brush = fu > .5 && fu < 3.5; return stay3([220, 1537], 1, brush ? { r: 10 * Math.sin(t * 14), mood: 'happy' } : { r: 4 }); }
  if (kr !== undefined) return stay3([lerp(180, 260, ease(cl(kr / .5))), 1537], 1, { r: 10 });
  if (ha !== undefined) { const q = ease(cl((ha - .3) / .6)); return stay3([240 - 60 * q, 1537], 1, { r: -12 * q, mood: 'shock' }); }
  return stay3([lerp(240, 240, 1), 1537], 1, { r: 2 }); };
// Grosses Bild vor der Zusammenfassung. Mit KI-Bild (VRIMG aus viz_b006img.js), sonst die naturnah gezeichnete Figur.
function photo6(t, k) { if (k <= 0) return ''; const W0 = 1040, H0 = 693, cy = 888, e = back(cl(k / .5)), z = 1 + .05 * cl(k / 4); let inner;
  if (typeof VRIMG !== 'undefined') inner = '<image href="' + VRIMG + '" x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" preserveAspectRatio="xMidYMid slice" transform="scale(' + z.toFixed(3) + ')"/>';
  else { const U = desert6(t); inner = '<svg x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" viewBox="40 760 1000 667" preserveAspectRatio="xMidYMid slice">' + U + rexd(560, 1300, 1.05, t, { kind: 'rap', look: 'n', feath: 1, tl: .74, fa: 1.5, id: 'real', pal: { a: '#9A8A6A', b: '#6A5A40', be: '#E2D6B8', sp: '#4A3C28' }, fcol: ['#6A5A40', '#9A8A6A'] }) + '</svg>'; }
  return '<rect width="1080" height="1920" fill="#02030F" opacity="' + (.55 * cl(k / .4)).toFixed(3) + '"/><g transform="translate(540 ' + cy + ') scale(' + e.toFixed(3) + ')"><rect x="' + (-W0 / 2 - 10) + '" y="' + (-H0 / 2 - 10) + '" width="' + (W0 + 20) + '" height="' + (H0 + 20) + '" rx="16" fill="#FFF6DF" stroke="#0B1020" stroke-width="6"/><clipPath id="ph6"><rect x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" rx="8"/></clipPath><g clip-path="url(#ph6)">' + inner + '</g></g>' + (typeof VRIMG !== 'undefined' ? chip3(900, 1196, 'KI-Bild', 28, '#0B1020', '#F4F6FB', (k - .7) / .3) : ''); }

// ---------- Schluss: der Raptor setzt sich zu Schalti ----------
WORLD.b6out = function (sc, ev, t, lt) { const U = urD(t), k = ease(cl(lt / 1.6)), sit = ease(cl((lt - 1.7) / .6)); return W(U.b + rap6(lerp(1150, 640, k), RY6 + 40, RS6, t, { run: k < 1 ? 1 : 0, sit: sit * .8, head: k >= 1 ? 6 : 0 }) + U.f + shade3()); };
WMASC.b6out = (ev, t, lt) => stay3([220, 1537], 1, { r: 2 });

['b6hook', 'b6size', 'b6feder', 'b6kralle', 'b6out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC6); });
