// B006 "Wie gefaehrlich war der Velociraptor?" (Bio, Dino-Skript, Kostuem B2 Dino-Kostuem), 17.11.2026.
// Ort: Urzeit-Lichtung (urD aus viz_b001d.js) vor einer Felswand. Die Felswand zeigt den riesigen Schatten aus dem Film,
// davor steht der echte, kleine, gefiederte Velociraptor (rexd kind 'rap', blau mit bunten Federn wie in B001).
// Einstieg: riesiger Schatten an der Wand, heraus tritt ein kleiner Raptor, scharrt und pickt, merkt Schalti nicht,
// dreht sich beim vierten Satz um, faucht, kommt naeher und zwickt Schalti beim Nachsatz in den Fuss.
// Teil 1 Groesse (Massband, Schalti will ihn hochheben), Teil 2 Federn (Hoecker am Unterarm, Vogel, Hopser ohne Abheben),
// Teil 3 Kralle und Kampf-Fund, dann Platz fuer das realistische Bild (ohne Bild: naturnah gezeichnete Figur).
// Zum Loeschen: diese Datei und videos/B006.
var RAP6 = { a: '#3FA9F5', b: '#1E6FC2', be: '#EAF6FF', sp: '#1B5DA8' }, AC6 = '#A8E63C';
var FG6 = [600, 1470], FS6 = .78; // Platz des Raptors vorn bei Schalti, Groesse
// Felswand hinter der Lichtung
function cliff6() { return '<defs><linearGradient id="cl6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D8A47A"/><stop offset="1" stop-color="#9C6B4A"/></linearGradient></defs><path id="cl6p" d="M330 1040 L360 760 L430 640 L560 600 L700 560 L860 590 L980 540 L1100 560 V1040 Z" fill="url(#cl6)" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/>'
  + '<path d="M470 700 l30 80 l-14 60 M760 620 l-20 90 l26 70 M930 640 l16 110" stroke="#7A4E32" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M360 960 Q700 930 1100 970" stroke="#7A4E32" stroke-width="5" fill="none" opacity=".6"/>'; }
const CLIP6 = '<clipPath id="cl6c"><path d="M330 1040 L360 760 L430 640 L560 600 L700 560 L860 590 L980 540 L1100 560 V1040 Z"/></clipPath>';
// Schatten an der Felswand: x, y Fuesse des Schattens, s Groesse, o rexd-Optionen
function shad6(x, y, s, t, o, op) { return CLIP6 + '<g clip-path="url(#cl6c)"><g style="filter:brightness(0)" opacity="' + (op === undefined ? .5 : op).toFixed(3) + '">' + rexd(x, y, s, t, Object.assign({ kind: 'rap', pal: RAP6, shadow: 0, tl: .74, id: 'sh' }, o)) + '</g></g>'; }
function rap6(x, y, s, t, o) { return rexd(x, y, s, t, Object.assign({ kind: 'rap', pal: RAP6, tl: .74, fa: 1.5, feath: 1, id: 'v' }, o)); }
// Lupe mit Inhalt
function lupe6(cx, cy, r, inner, k) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + e.toFixed(3) + ')"><clipPath id="lu6"><circle r="' + r + '"/></clipPath><circle r="' + r + '" fill="#FFF6DF"/><g clip-path="url(#lu6)">' + inner + '</g><circle r="' + r + '" fill="none" stroke="#F4F6FB" stroke-width="12"/><circle r="' + (r + 6) + '" fill="none" stroke="#0B1020" stroke-width="4"/><path d="M' + (r * .7) + ' ' + (r * .7) + ' L' + (r * 1.15) + ' ' + (r * 1.15) + '" stroke="#F4F6FB" stroke-width="26" stroke-linecap="round"/></g>'; }
const peck6 = t => 34 * Math.max(0, Math.sin(t * 4.4)) * (Math.sin(t * 1.1) > -.3 ? 1 : 0);

// ---------- Einstieg ----------
// frage = Raptor tritt aus dem Farn, dreh = dreht sich zu Schalti und faucht, zwick = schnappt nach Schaltis Fuss
function hk6(ev, t, lt) { const fr = ev.frage, dr = ev.dreh, zw = ev.zwick;
  const out = fr === undefined ? 0 : ease(cl(fr / 1.3)), x0 = lerp(1040, 700, out), turn = dr === undefined ? 0 : ease(cl(dr / .5)), app = zw === undefined ? 0 : ease(cl(zw / .35));
  return { x: lerp(x0, FG6[0] - 40, app), y: lerp(1150, FG6[1], app), s: lerp(.72, FS6, app), turn, out, walk: (fr !== undefined && out < 1) || (app > 0 && app < 1), zw: zw === undefined ? undefined : Math.max(0, zw - .3) }; }
WORLD.b6hook = function (sc, ev, t, lt) { const U = urD(t), H = hk6(ev, t, lt); let s = U.b + cliff6();
  const grow = ease(cl(lt / 1.1)), ssc = lerp(1.6, 1.15, H.out) * (.7 + .3 * grow), jawS = .5 + .5 * Math.sin(t * 5);
  s += shad6(lerp(560, H.x - 160, H.out), 1160, ssc, t, { feath: 0, jaw: H.out < 1 ? jawS : .1, head: H.out < 1 ? -6 : peck6(t) }, .55 * (1 - .5 * H.turn));
  const zwq = H.zw === undefined ? 0 : Math.max(0, Math.sin(Math.PI * cl(H.zw / .45)));
  const opt = { run: H.walk ? 1 : 0, head: H.turn > 0 ? (H.zw !== undefined ? 30 * zwq : -12) : peck6(t), jaw: H.turn > 0 ? (H.zw !== undefined ? zwq : .45 + .25 * Math.sin(t * 9)) : 0 };
  s += rap6(H.x, H.y, H.s, t, opt);
  if (ev.dreh !== undefined && ev.zwick === undefined) s += roard(H.x - 230 * H.s, H.y - 300 * H.s, 190, t, cl((ev.dreh - .3) / .3) * .7);
  s += U.f; if (H.out < .2) s += frondD(1090, 1180, -150, 300, t, '#2A9450', 1) + frondD(1090, 1180, -130, 330, t, '#22874A', 2) + frondD(1090, 1180, -110, 280, t, '#35A85C', 3);
  return W(s + shade3()); };
WMASC.b6hook = (ev, t, lt, sc) => { const zw = ev.zwick;
  if (zw !== undefined) { if (zw < .55) return stay3([HOME3[0], HOME3[1]], 1, { mood: 'shock' }); const q = cl((zw - .55) / .5); return hop3(q, HOME3, [150, 1537], 40, 1, 1, { r: -14, mood: q < 1 ? 'shock' : 'cool' }); }
  if (ev.dreh !== undefined) return stay3(HOME3, 1, { r: -6 * cl(ev.dreh / .5), mood: 'shock' });
  return stay3(HOME3, 1, { r: 2 * Math.sin(t * 3) }); };

// ---------- Teil 1: so gross wie ein Truthahn ----------
WORLD.b6size = function (sc, ev, t, lt) { const U = urD(t); let s = U.b + cliff6(), h = ''; const tr = ev.trut, ma = ev.mass, ki = ev.kilo, fi = ev.film;
  const walk = tr === undefined ? 0 : ease(cl(tr / 1.2)), x = lerp(1180, FG6[0] + 60, walk);
  if (fi !== undefined) { const k = ease(cl((fi - .2) / .8)); s += shad6(600, 1160, 1.6, t, { feath: 0, jaw: .4 + .3 * Math.sin(t * 5) }, .5 * k); }
  const kq = ki === undefined ? 0 : cl((ki - .8) / .9), snap = ki === undefined ? 0 : Math.max(0, Math.sin(Math.PI * cl((ki - 1.3) / .4)));
  s += rap6(x, FG6[1], FS6, t, { run: walk > 0 && walk < 1 ? 1 : 0, head: snap > 0 ? 20 * snap : (fi !== undefined ? -14 : peck6(t) * .5), jaw: snap, ph: t * 13 });
  if (ma !== undefined && fi === undefined) { const k = ease(cl((ma - .2) / .6)), xs = x - 316 * FS6, xe = x + (96 + 318 * .74) * FS6, yb = FG6[1] + 40, hip = FG6[1] - 188 * FS6;
    s += '<g opacity="' + cl(ma / .3).toFixed(3) + '"><path d="M' + xs.toFixed(0) + ' ' + yb + ' H' + lerp(xs, xe, k).toFixed(0) + '" stroke="#FFE14D" stroke-width="10" stroke-linecap="round"/><path d="M' + xs.toFixed(0) + ' ' + (yb - 18) + ' v36 M' + xe.toFixed(0) + ' ' + (yb - 18) + ' v' + (36 * k).toFixed(0) + '" stroke="#FFE14D" stroke-width="8"/></g>';
    if (k > .9) s += chip3((xs + xe) / 2, yb + 70, 'rund 2 m mit Schwanz', 34, '#FFE14D', '#0B1020', cl((ma - .8) / .3));
    const kh = ease(cl((ma - 1.2) / .5)); if (kh > 0) s += '<path d="M' + (x + 110) + ' ' + FG6[1] + ' V' + lerp(FG6[1], hip, kh).toFixed(0) + '" stroke="#3DFF7A" stroke-width="10" stroke-linecap="round"/>' + chip3(x + 210, FG6[1] - 40, '0,5 m', 34, '#3DFF7A', '#0B1020', cl((ma - 1.6) / .3)); }
  if (ki !== undefined && kq < 1) s += chip3(740, 960, 'höchstens etwa 15 kg', 40, '#FFE14D', '#0B1020', cl((ki - .2) / .3));
  s += U.f;
  h += slot(ev, [['trut', 'So groß wie ein Truthahn'], ['mass', 'Rund 2 m lang, etwa kniehoch'], ['kilo', 'Höchstens etwa 15 Kilo', 'hot'], ['film', 'Film-Raptoren: größerer Verwandter']]);
  return W(s + shade3(), h); };
WMASC.b6size = (ev, t) => { const ki = ev.kilo; if (ki !== undefined) { if (ki < .8) return stay3([lerp(220, 330, ease(cl(ki / .8))), 1537 - 8 * Math.abs(Math.sin(t * 12))], 1, { r: 10 }); if (ki < 1.3) return stay3([330, 1537], 1, { r: 16 + 4 * Math.sin(t * 30), mood: 'shock' }); return hop3(cl((ki - 1.3) / .5), [330, 1537], [220, 1537], 30, 1, 1, { r: -12, mood: 'shock' }); }
  return BIG3(); };

// ---------- Teil 2: Federn ----------
function arm6(k, t) { // Unterarmknochen mit Hoeckern
  let s = '<rect x="-260" y="-260" width="520" height="520" fill="#F7E7C4"/><path d="M-210 30 Q0 -10 210 20" stroke="#0B1020" stroke-width="64" stroke-linecap="round" fill="none"/><path d="M-210 30 Q0 -10 210 20" stroke="#F4EBD0" stroke-width="52" stroke-linecap="round" fill="none"/>';
  for (let i = 0; i < 7; i++) { const x = -150 + i * 48, y = -2 - 4 * Math.sin(i), kk = cl(k * 1.6 - i * .1); s += '<circle cx="' + x + '" cy="' + (y - 30) + '" r="' + (17 * kk).toFixed(1) + '" fill="#E8D2A6" stroke="#0B1020" stroke-width="4"/>'; }
  return s; }
WORLD.b6feder = function (sc, ev, t, lt) { const U = urD(t); let s = U.b + cliff6(), h = ''; const fe = ev.feder, ho = ev.hoeck, vo = ev.vogel, fl = ev.flieg;
  const puff = fe === undefined ? 1 : 1 + .25 * Math.sin(Math.PI * cl(fe / 1.2)), hop = fl === undefined ? 0 : Math.max(0, Math.sin(Math.PI * cl((fl - .3) / .7))) + .6 * Math.max(0, Math.sin(Math.PI * cl((fl - 1.1) / .6)));
  const rx = FG6[0] + 60 - (fl === undefined ? 0 : 120 * ease(cl((fl - .3) / 1.4)));
  s += rap6(rx, FG6[1] - 90 * hop, FS6, t, { feath: puff, wing: fl === undefined ? 0 : .9 * cl((fl - .1) / .3), head: ho !== undefined && fl === undefined ? -8 : peck6(t) * .4, shadow: hop > .1 ? 0 : 1, fa: 1.5 });
  if (fe !== undefined && fe < 1.6) for (let i = 0; i < 6; i++) { const k = cl((fe - .2 - i * .08) / 1); if (k > 0 && k < 1) s += '<path transform="translate(' + (rx - 160 + i * 60 + 24 * Math.sin(k * 6 + i)).toFixed(0) + ' ' + (FG6[1] - 360 + 300 * k).toFixed(0) + ') rotate(' + (40 * Math.sin(k * 7 + i)).toFixed(0) + ') scale(1.5)" d="M0 0 Q14 -8 34 0 Q14 8 0 0 Z" fill="' + ['#FFD23F', '#FF6BD6'][i % 2] + '" stroke="#0B1020" stroke-width="3" opacity="' + (1 - k).toFixed(2) + '"/>'; }
  if (ho !== undefined && vo === undefined) s += lupe6(720, 880, 210, arm6(cl((ho - .3) / 1), t), cl((ho - .1) / .4));
  if (vo !== undefined && fl === undefined) { const k = ease(cl(vo / .9)); s += birdd(lerp(1150, 860, k), lerp(760, 1000, k) - (k < 1 ? 30 * Math.sin(t * 8) : 0), .9, t, { id: 'v6', flip: 0 }) + chip3(640, 880, 'Vögel: dieselben Höcker', 34, '#FFE14D', '#0B1020', cl((vo - .8) / .3)); }
  if (fl !== undefined) s += chip3(800, 900, 'Abheben: nein', 40, '#2C3350', '#F4F6FB', cl((fl - 1.4) / .3));
  s += U.f;
  h += slot(ev, [['feder', 'Er hatte Federn'], ['hoeck', '2007: Höcker für Federkiele am Unterarm', 'hot'], ['vogel', 'Wie bei Vögeln heute'], ['flieg', 'Fliegen konnte er nicht']]);
  return W(s + shade3(), h); };
WMASC.b6feder = (ev, t) => { const fl = ev.flieg; if (fl !== undefined) { const d = Math.max(0, Math.sin(Math.PI * cl((fl - .5) / .8))); return stay3([220 - 20 * d, 1537 + 30 * d], 1, { r: -10 * d, mood: d > .2 ? 'shock' : 'happy' }); } if (ev.feder !== undefined && ev.hoeck === undefined) return stay3(HOME3, 1, { r: 6 * Math.sin(t * 8) * cl(1 - ev.feder / 2), mood: 'happy' }); return BIG3(); };

// ---------- Teil 3: Kralle und Kampf-Fund ----------
function claw6() { return '<rect x="-260" y="-260" width="520" height="520" fill="#CFE8F7"/><path d="M-200 120 Q-60 60 80 90" stroke="#0B1020" stroke-width="70" stroke-linecap="round" fill="none"/><path d="M-200 120 Q-60 60 80 90" stroke="' + RAP6.b + '" stroke-width="56" stroke-linecap="round" fill="none"/>'
  + '<path d="M-40 70 C-60 -60 40 -150 150 -120 C60 -90 20 -20 10 60 Z" fill="#F4EBD0" stroke="#0B1020" stroke-width="7" stroke-linejoin="round"/><path d="M-10 40 C-20 -40 40 -100 110 -110" stroke="#fff" stroke-width="6" fill="none" opacity=".7"/>'; }
function fossil6(k) { if (k <= .01) return ''; const B = 'stroke="#F4EBD0" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  let s = '<g opacity="' + cl(k).toFixed(3) + '"><rect x="160" y="700" width="760" height="420" rx="40" fill="#B98C6A" stroke="#0B1020" stroke-width="7"/><rect x="190" y="730" width="700" height="360" rx="30" fill="#A07656"/>';
  // Raptor-Skelett links (Wirbelsaeule, Schaedel, Beine), Protoceratops rechts (Schaedel mit Nackenschild)
  s += '<path d="M260 900 Q360 860 470 880 Q540 890 600 860" ' + B + '/><path d="M600 860 l40 -20 l30 10 l-30 18 Z" ' + B + '/><path d="M420 885 l-20 70 l20 60 M470 885 l20 70 l-30 50" ' + B + '/><path d="M560 870 l30 50 M540 875 l20 40" ' + B + '/>';
  for (let i = 0; i < 6; i++) s += '<path d="M' + (300 + i * 30) + ' ' + (893 - i * 3) + ' v26" ' + B.replace('9', '6') + '/>';
  s += '<path d="M700 840 Q760 760 830 800 Q860 860 800 900 Q740 920 700 880 Z" ' + B + '/><path d="M700 880 l-40 20 l20 20" ' + B + '/><path d="M760 900 Q770 980 740 1040 M800 900 Q820 980 860 1030" ' + B + '/>';
  return s + '</g>'; }
WORLD.b6kralle = function (sc, ev, t, lt) { const U = urD(t); let s = U.b + cliff6(), h = ''; const ha = ev.harm, kr = ev.kralle, fu = ev.fund, fo = ev.foto;
  const growl = ha !== undefined && kr === undefined ? 1 : 0, tap = kr !== undefined && fu === undefined ? Math.max(0, Math.sin(t * 7)) : 0;
  s += rap6(FG6[0] + 60, FG6[1], FS6, t, { jaw: growl ? .5 + .3 * Math.sin(t * 9) : 0, head: growl ? 14 : (tap ? 18 : peck6(t) * .4) });
  if (growl) s += roard(FG6[0] + 60 - 230 * FS6, FG6[1] - 300 * FS6, 190, t, cl((ha - .3) / .3) * .6);
  if (kr !== undefined && fu === undefined) { s += lupe6(740, 900, 200, claw6(), cl((kr - .1) / .4)); }
  if (fu !== undefined && fo === undefined) { const k = cl((fu - .1) / .5); s += fossil6(k) + chip3(540, 1070, 'Fund aus der Mongolei', 36, '#FFE14D', '#0B1020', cl((fu - .7) / .3)); }
  s += U.f;
  if (fo !== undefined) s += photo6(t, fo);
  h += slot(ev, [['harm', 'Harmlos war er nicht'], ['kralle', 'Große, gebogene Kralle am Fuß', 'hot'], ['fund', 'Fund: mitten im Kampf'], ['foto', 'So könnte er ausgesehen haben']]);
  return W(s + shade3(), h); };
WMASC.b6kralle = (ev, t) => { const ha = ev.harm, kr = ev.kralle; if (ha !== undefined && kr === undefined) { const q = ease(cl((ha - .4) / .6)); return stay3([220 - 50 * q, 1537], 1, { r: -10 * q, mood: 'shock' }); } return BIG3(); };
// Grosses Bild vor der Zusammenfassung. Ohne KI-Bild (VRIMG) zeigt der Rahmen die naturnah gezeichnete Figur.
function photo6(t, k) { if (k <= 0) return ''; const W0 = 1040, H0 = 693, cy = 888, e = back(cl(k / .5)), z = 1 + .05 * cl(k / 4); let inner;
  if (typeof VRIMG !== 'undefined') inner = '<image href="' + VRIMG + '" x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" preserveAspectRatio="xMidYMid slice" transform="scale(' + z.toFixed(3) + ')"/>';
  else { const U = urD(t); inner = '<svg x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" viewBox="40 700 1000 667" preserveAspectRatio="xMidYMid slice">' + U.b + rexd(560, 1250, 1.05, t, { kind: 'rap', look: 'n', feath: 1, tl: .74, fa: 1.5, id: 'real', shadow: 1, pal: { a: '#8A7A5A', b: '#5A4A34', be: '#E2D6B8', sp: '#4A3C28' }, fcol: ['#6A5A40', '#9A8A6A'] }) + '</svg>'; }
  return '<rect width="1080" height="1920" fill="#02030F" opacity="' + (.55 * cl(k / .4)).toFixed(3) + '"/><g transform="translate(540 ' + cy + ') scale(' + e.toFixed(3) + ')"><rect x="' + (-W0 / 2 - 10) + '" y="' + (-H0 / 2 - 10) + '" width="' + (W0 + 20) + '" height="' + (H0 + 20) + '" rx="16" fill="#FFF6DF" stroke="#0B1020" stroke-width="6"/><clipPath id="ph6"><rect x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" rx="8"/></clipPath><g clip-path="url(#ph6)">' + inner + '</g></g>' + (typeof VRIMG !== 'undefined' ? chip3(900, 1156, 'KI-Bild', 28, '#0B1020', '#F4F6FB', (k - .7) / .3) : ''); }

// ---------- Schluss: der Raptor kommt zu Schalti ----------
WORLD.b6out = function (sc, ev, t, lt) { const U = urD(t), k = ease(cl(lt / 2)); return W(U.b + cliff6() + rap6(lerp(1150, 520, k), FG6[1], FS6, t, { run: k < 1 ? 1 : 0, head: k >= 1 ? peck6(t) * .5 : 0 }) + U.f + shade3()); };
WMASC.b6out = () => BIG3();

['b6hook', 'b6size', 'b6feder', 'b6kralle', 'b6out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC6); });
