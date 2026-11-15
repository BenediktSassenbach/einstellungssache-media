// P014V3 "Warum geht WLAN durch die Wand?" im Design 3.0 (Vollbild plus). Gleicher Text wie P014.
// Ort: Wohnung bei Nacht. Der Ort geht von Szene zu Szene weiter und zeigt nie etwas doppelt:
//   Einstieg und Schluss: Wohnzimmer mit Router, der sendet (Hauptobjekt), rechts die Ziegelwand, dahinter das Nachbarzimmer
//   Teil 1: ruhige Wand am Fenster, ohne Router, die Welle ist die Grafik
//   Teil 2: die Ziegelwand steht mitten im Bild und teilt zwei Zimmer, Lampe, Router und Handy gibt es nur einmal
//   Teil 3: die Wand-Szene geht weiter, die eine Wand wird zu Stahlbeton und weicht dann dem Aquarium. Beim Trick wischt das Wohnzimmer herein, der Router wandert aufs Wandregal
// Erklaergrafiken aus viz_p014g.js, Helfer aus viz_v3.js. Zum Loeschen dieser Fassung: diese Datei und videos/P014V3.
// o: rings (0 bis 1, Staerke der Wellen), side (0 bis 1, Sideboard), router ([x, y] oder null), shelf (0 bis 1, Wandregal), split (Teil 2), calm (ruhiger Hintergrund)
function flat14(t, o) { o = o || {}; const split = !!o.split, calm = !!o.calm, WX = split ? 1080 : 950;
  let s = '<defs><linearGradient id="f14w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050E24"/><stop offset=".6" stop-color="#0E2C58"/><stop offset="1" stop-color="#1B5290"/></linearGradient><linearGradient id="f14x" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040A1C"/><stop offset=".6" stop-color="#0A2146"/><stop offset="1" stop-color="#123C72"/></linearGradient><linearGradient id="f14n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040F"/><stop offset="1" stop-color="#1A3F7A"/></linearGradient><radialGradient id="f14g"><stop offset="0" stop-color="#5CE1FF" stop-opacity=".45"/><stop offset="1" stop-color="#5CE1FF" stop-opacity="0"/></radialGradient><clipPath id="f14c"><rect x="600" y="250" width="250" height="300" rx="10"/></clipPath><clipPath id="f14l"><rect x="0" y="0" width="950" height="1548"/></clipPath><clipPath id="f14r"><rect x="1006" y="0" width="74" height="1548"/></clipPath></defs>';
  s += '<rect width="' + WX + '" height="1552" fill="url(#f14w)"/>'; if (split) s += '<rect x="470" width="610" height="1552" fill="url(#f14x)"/>';
  for (let i = 0; i < 12; i++) s += '<rect x="' + (30 + i * 90) + '" y="0" width="6" height="1548" fill="#fff" opacity=".025"/>';
  s += '<ellipse cx="480" cy="920" rx="550" ry="410" fill="url(#f14g)" opacity="' + (calm ? .5 : .6 + .1 * Math.sin(t * 1.3)) + '"/>';
  if (!split) { // Fenster mit Mond, Sternen und ziehender Wolke
    s += '<g clip-path="url(#f14c)"><rect x="600" y="250" width="250" height="300" fill="url(#f14n)"/>'; for (let i = 0; i < 16; i++) s += '<circle cx="' + (606 + rnd(i + 31) * 238).toFixed(0) + '" cy="' + (258 + rnd(i + 61) * 230).toFixed(0) + '" r="' + (1.5 + 2 * rnd(i + 91)).toFixed(1) + '" fill="#fff" opacity="' + (.3 + .4 * Math.abs(Math.sin(t * .6 * (1 + rnd(i + 11)) + i))).toFixed(2) + '"/>';
    s += '<circle cx="780" cy="330" r="58" fill="#FFF1C4" opacity=".16"/><circle cx="780" cy="330" r="36" fill="#FFF1C4"/>'; { const cx = 560 + ((t * 9) % 380); s += '<g opacity=".5" fill="#9FB6E0"><ellipse cx="' + cx + '" cy="430" rx="60" ry="18"/><ellipse cx="' + (cx + 34) + '" cy="416" rx="40" ry="16"/></g>'; }
    s += '</g><rect x="600" y="250" width="250" height="300" rx="10" fill="none" stroke="#2A5A94" stroke-width="14"/><path d="M725 250 V550 M600 400 H850" stroke="#2A5A94" stroke-width="8"/><rect x="584" y="546" width="282" height="20" rx="8" fill="#2A5A94"/>';
    // Nachbarzimmer hinter der Wand mit Handy auf dem Regal
    s += '<rect x="1006" y="0" width="74" height="1552" fill="#081A36"/><rect x="1012" y="1300" width="68" height="14" rx="5" fill="#2A5A94"/><rect x="1020" y="1216" width="46" height="84" rx="9" fill="#0B1020" stroke="#F4F6FB" stroke-width="5"/>' + bars14(1043, 1252, .5, o.nb || (o.rings > 0 ? 2 : 1)); }
  const R = o.router;
  if (R && o.rings > 0) { const rg = rings14(R[0], R[1] - 110, t, 4, '#5CE1FF', 520 + 420 * o.rings, .22 + .38 * o.rings, 6 + 4 * o.rings); s += '<g clip-path="url(#f14l)">' + rg + '</g><g clip-path="url(#f14r)" opacity=".45">' + rg + '</g>'; }
  if (!split) s += brick14(950, 232, 56, 1322, 'w');
  for (let i = 0; i < (calm ? 7 : 12); i++) { const y = 1540 - ((t * 18 * (.5 + rnd(i + 400)) + rnd(i + 420) * 1240) % 1240); s += '<circle cx="' + (rnd(i + 440) * 930 + 10 * Math.sin(t * .6 + i)) + '" cy="' + y + '" r="' + (3 + 3 * rnd(i + 460)) + '" fill="#9BE7FF" opacity=".16"/>'; }
  // Boden, Teppich
  s += '<rect y="1548" width="1080" height="372" fill="#081830"/>'; for (let i = 0; i < 7; i++) s += '<path d="M' + (20 + i * 180) + ' 1548 l-60 372" stroke="#0E2748" stroke-width="4"/>';
  s += '<path d="M0 1548 H1080" stroke="#5CE1FF" stroke-width="18" opacity=".17"/><path d="M0 1548 H1080" stroke="#7FD9FF" stroke-width="5"/><ellipse cx="240" cy="1592" rx="250" ry="40" fill="#123A6A"/><ellipse cx="240" cy="1592" rx="200" ry="28" fill="none" stroke="#2A5A94" stroke-width="5"/>';
  if (o.shelf > 0) { const k = back(cl(o.shelf)); s += '<g transform="translate(565 915) scale(' + k + ') translate(-565 -915)"><rect x="415" y="905" width="300" height="20" rx="8" fill="#2A5A94" stroke="#0B1020" stroke-width="5"/><path d="M455 925 v36 l34 -36 M675 925 v36 l-34 -36" stroke="#2A5A94" stroke-width="8" fill="none" stroke-linejoin="round"/></g>'; }
  if (o.side > 0) { const k = back(cl(o.side)); s += '<g transform="translate(565 1548) scale(' + k + ') translate(-565 -1548)"><rect x="430" y="1440" width="270" height="108" rx="10" fill="#17365F" stroke="#3A6AA4" stroke-width="5"/><path d="M565 1444 V1544 M452 1494 h30 M648 1494 h30" stroke="#3A6AA4" stroke-width="5" stroke-linecap="round"/></g>'; }
  if (R) s += router14(R[0], R[1], .9, t);
  if (!split) { s += '<path d="M800 1548 L812 1478 H868 L880 1548 Z" fill="#B5533C" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/>'; for (let i = 0; i < 5; i++) { const a = -70 + i * 35 + 3 * Math.sin(t * .9 + i); s += '<path transform="translate(840 1480) rotate(' + a + ')" d="M0 0 Q-26 -70 0 -140 Q26 -70 0 0 Z" fill="' + (i % 2 ? '#2ECC71' : '#27A85E') + '" stroke="#0B1020" stroke-width="4"/>'; } }
  return s; }
const F14HOME = { rings: 1, side: 1, router: [565, 1440] };   // Einstieg: Router sendet kraeftig
const F14CALM = { calm: 1 };                                    // ruhiger Hintergrund ohne Router
// Gag aus dem Objekt: Schalti geht waehrend "Gib mir 60 Sekunden" neugierig zum Router. Beim Nachsatz sendet der Router einen kraeftigen Wellenstoss,
// der Schalti mitnimmt. Die Welle geht durch die Ziegelwand, Schalti nicht: Er klatscht an die Wand, rutscht herunter, sitzt benommen da und laeuft zurueck. Einschlag bei 0,5 s
const P14R = e => e < .1 ? lerp(40, 205, e / .1) : e < .5 ? lerp(205, 377, (e - .1) / .4) : 377 + (e - .5) * 900; // Radius des Wellenstosses
function gag14v(e, t) { const X0 = 690, XW = 862;
  if (e < .1) return { f: [X0, 1537 - 8 * (e / .1)], s: 1, r: 6, nospin: 1 };
  if (e < .5) { const k = (e - .1) / .4; return { f: [565 + P14R(e) - 80, 1537 - 8 - 6 * Math.abs(Math.sin(t * 30))], s: 1, r: 14, nospin: 1 }; }
  if (e < .95) return { f: [XW, 1537], s: 1, r: 4 * Math.sin(t * 40) * (1 - cl((e - .5) / .2)), nospin: 1 };
  if (e < 1.3) { const k = (e - .95) / .35; return { f: [lerp(XW, 800, k), 1537], s: 1, r: -16 * k, nospin: 1 }; }
  if (e < 2.0) return { f: [800, 1537], s: 1, r: -16 + 5 * Math.sin(t * 9), nospin: 1 };
  if (e < 2.8) { const k = (e - 2) / .8; return { f: [lerp(800, 220, k), 1537], s: 1, walk: true, flip: true, nospin: 1 }; }
  return { f: [220, 1537], s: 1, nospin: 1 }; }
WORLD.h7p14_3 = function (sc, ev, t, lt) {
  const e = ev.bonk, hit = e !== undefined && e >= .5 ? e - .5 : undefined, sh = shake7(hit, t);
  let s = flat14(t, Object.assign({}, F14HOME, { nb: hit !== undefined && hit > .15 ? 4 : 2 }));
  if (e !== undefined && e < 1.4) { const R = P14R(e), ring = '<circle cx="565" cy="1330" r="' + R + '" fill="none" stroke="#B8F3FF" stroke-width="' + (26 - 8 * cl(e)) + '" opacity="' + (1 - cl((e - .9) / .5)) + '"/><circle cx="565" cy="1330" r="' + Math.max(1, R - 34) + '" fill="none" stroke="#5CE1FF" stroke-width="10" opacity="' + (.7 * (1 - cl((e - .9) / .5))) + '"/>';
    s += '<g clip-path="url(#f14l)">' + ring + '</g><g clip-path="url(#f14r)" opacity=".5">' + ring + '</g>'; }
  if (e !== undefined && e > 1.25 && e < 2.2) s += stars14(830, 1230, t, 1 - cl((e - 1.9) / .3));
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + shade3());
};
WMASC.h7p14_3 = (ev, t, lt, sc) => { if (ev.bonk !== undefined) return gag14v(ev.bonk, t);
  const q = lt - (sc.lines[3] ? sc.lines[3].start - sc.start : 6); if (q < 0) return { f: [220, 1537], s: 1, r: -3 + 2 * Math.sin(t * 2), nospin: 1 };
  const k = cl(q / .8); return k < 1 ? { f: [lerp(220, 690, k), 1537], s: 1, walk: true, nospin: 1 } : { f: [690, 1537 - 5 * Math.abs(Math.sin(t * 5))], s: 1, r: 5, flip: true, nospin: 1 }; };

// Teil 1: ruhige Wand, die Welle ist die Grafik. Schalti surft auf dem Kamm der langen WLAN-Welle
WORLD.p14a_3 = (sc, ev, t, lt) => W(flat14(t, F14CALM) + g14a(sc, ev, t, lt) + shade3(), slot(ev, L14A));
WMASC.p14a_3 = (ev, t, lt, sc) => { const H = [220, 1537], la = ev.lang; if (la === undefined || ev.licht !== undefined) return BIG3();
  const D = Math.max(2, D14(sc, 1)), u = la / D, P = [w14crest(sc, t), W14Y - W14A + 4];
  if (u < .12) { const k = ease(u / .12); return { f: [lerp(H[0], P[0], k), lerp(H[1], P[1], k) - 120 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), nospin: 1 }; }
  if (u < .75) return { f: [P[0], P[1] + 3 * Math.sin(t * 9)], s: .5, r: 7 * Math.sin(t * 5), nospin: 1 };
  const k = ease(cl((u - .75) / .22)), Q = [260 + w14v(sc) * .75 * D, P[1]]; return { f: [lerp(Q[0], H[0], k), lerp(Q[1], H[1], k) - 160 * Math.sin(Math.PI * k)], s: lerp(.5, 1, k), flip: k < .9, nospin: 1 }; };
// Teil 2: Die Wand des Ortes steht mitten im Bild und teilt zwei Zimmer
WORLD.p14b_3 = (sc, ev, t, lt) => W(flat14(t, { split: 1, calm: 1 }) + g14b(sc, ev, t, lt, { full: 1 }) + shade3(), slot(ev, L14B));
WMASC.p14b_3 = () => BIG3();
// Teil 3: Die Szene mit der Wand in der Mitte geht weiter. Die eine Wand verwandelt sich: Ziegel wird sauber zu Stahlbeton (Wisch von oben nach unten),
// dann weicht der Stahlbeton dem Aquarium an derselben Stelle. Erst beim Trick wechselt der Ort ins Wohnzimmer (Wisch von rechts)
function steel14(x, y, w, h) { let s = '<defs><linearGradient id="st14" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#AEB6C6"/><stop offset=".5" stop-color="#7C879C"/><stop offset="1" stop-color="#9AA3B5"/></linearGradient></defs><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="url(#st14)"/>';
  for (let i = 0; i < 60; i++) s += '<circle cx="' + (x + 6 + rnd(i + 70) * (w - 12)) + '" cy="' + (y + rnd(i + 170) * h) + '" r="' + (2 + 3 * rnd(i + 270)) + '" fill="#5A6686" opacity=".45"/>';
  s += '<path d="M' + (x + w * .3) + ' ' + y + ' V' + (y + h) + ' M' + (x + w * .7) + ' ' + y + ' V' + (y + h) + '" stroke="#3A4358" stroke-width="7" stroke-dasharray="26 10"/>'; for (let yy = y + 60; yy < y + h; yy += 120) s += '<path d="M' + (x + 6) + ' ' + yy + ' H' + (x + w - 6) + '" stroke="#3A4358" stroke-width="5"/>';
  return s + '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="none" stroke="#0B1020" stroke-width="6"/>'; }
function aqua14(t) { let s = '<rect x="350" y="1112" width="240" height="436" rx="10" fill="#22508A" stroke="#5C8FD0" stroke-width="5"/><path d="M470 1118 V1542" stroke="#5C8FD0" stroke-width="5"/><rect x="338" y="1086" width="264" height="28" rx="8" fill="#5A6686" stroke="#0B1020" stroke-width="5"/>';
  s += '<rect x="350" y="800" width="240" height="290" rx="14" fill="#2B8CFF" opacity=".5"/><path d="M350 ' + (832 + 5 * Math.sin(t * 3)) + ' q60 -14 120 0 t120 0 V800 H350 Z" fill="#0A1B36" opacity=".55"/><rect x="350" y="800" width="240" height="290" rx="14" fill="none" stroke="#F4F6FB" stroke-width="8"/>';
  const fx = 470 + 70 * Math.sin(t * 1.3), dir = Math.cos(t * 1.3) > 0 ? 1 : -1; s += '<g transform="translate(' + fx + ' ' + (940 + 16 * Math.sin(t * 2.1)) + ') scale(' + dir + ' 1)"><ellipse rx="36" ry="21" fill="#FF8A3D" stroke="#0B1020" stroke-width="5"/><path d="M-32 0 L-62 -20 V20 Z" fill="#FF8A3D" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><circle cx="16" cy="-5" r="5" fill="#0B1020"/></g>';
  for (let i = 0; i < 5; i++) { const c = (t * .5 + i / 5) % 1; s += '<circle cx="' + (380 + i * 44) + '" cy="' + (1070 - 220 * c) + '" r="' + (5 + 3 * rnd(i)) + '" fill="none" stroke="#fff" stroke-width="3" opacity="' + (1 - c) + '"/>'; }
  return s; }
function obst14(sc, ev, t, lt) { let s = ''; const w = ev.wasser, YW = 1010, m = cl((lt - .7) / .7), mk = ease(m);
  s += router14(190, YW + 62, .62, t);
  if (w === undefined) { const out = 27 * (1 - mk);
    s += wave14(250, lerp(790, 470, mk), YW, x => x < 430 ? 44 : x < 510 ? lerp(44, out, (x - 430) / 80) : out, 92, t * 9, '#5CE1FF', 10);
    for (let i = 0; i < 3; i++) { const c = (t * .9 + i / 3) % 1; s += '<path d="M' + (414 - 70 * c) + ' ' + (YW - 70 - 40 * c) + ' Q' + (372 - 100 * c) + ' ' + YW + ' ' + (414 - 70 * c) + ' ' + (YW + 70 + 40 * c) + '" stroke="#FF7A9A" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + ((1 - c) * cl((m - .8) / .2)) + '"/>'; }
    s += brick14(430, 232, 80, 1318, 'a', .9);
    if (m > 0) { const yy = 232 + 1318 * mk; s += '<clipPath id="sw14"><rect x="420" y="226" width="100" height="' + (yy - 226) + '"/></clipPath><g clip-path="url(#sw14)">' + steel14(430, 232, 80, 1318) + '</g>'; if (m < 1) s += '<rect x="416" y="' + (yy - 7) + '" width="108" height="14" rx="7" fill="#fff"/><rect x="396" y="' + (yy - 22) + '" width="148" height="44" rx="22" fill="#B8F3FF" opacity=".35"/>'; }
    s += chip3(700, 800, 'Stahlbeton', 36, '#C9CFDD', '#0B1020', (lt - 1.6) / .3) + phone14(850, YW, m < 1 ? 3 : 0) + okx1(902, YW - 92, 26, false, (m - .9) / .1 * .3);
  } else { const k = ease(cl(w / .55)), kb = back(cl((w - .15) / .45));
    s += wave14(250, 590, YW, x => x < 350 ? 44 : 44 * (1 - cl((x - 350) / 200)) * cl(k * 2), 92, t * 9, '#5CE1FF', 10);
    if (k < 1) s += '<g transform="translate(470 1550) scale(1 ' + (1 - k) + ') translate(-470 -1550)">' + steel14(430, 232, 80, 1318) + '</g>';
    s += '<g transform="translate(470 1548) scale(' + kb + ') translate(-470 -1548)">' + aqua14(t) + '</g>' + phone14(850, YW, w > .9 ? 1 : 0); }
  return s; }
WORLD.p14c_3 = function (sc, ev, t, lt) { const f = ev.frei, a = ev.act, wall = W14SPLIT(t) + obst14(sc, ev, t, lt);
  if (f === undefined && a === undefined) return W(wall + shade3(), slot(ev, L14C));
  const q = f === undefined ? 9 : f, up = ease(cl((q - .6) / .6)), room = flat14(t, { calm: 1, side: (q - .2) / .35, shelf: (q - .35) / .35, router: [lerp(565, 615, up), lerp(1440, 905, up)], rings: .15 + .6 * up }) + g14c(sc, ev, t, lt, { room: 1 });
  if (q >= .4) return W(room + shade3(), slot(ev, L14C));
  const x = 1080 * (1 - ease(q / .4)); // Wisch von rechts: das Wohnzimmer schiebt sich ueber die Wand-Szene
  return W(wall + '<clipPath id="wp14"><rect x="' + x + '" y="0" width="1080" height="1920"/></clipPath><g clip-path="url(#wp14)">' + room + '</g><rect x="' + (x - 8) + '" y="0" width="16" height="1920" fill="#B8F3FF" opacity=".8"/>' + shade3(), slot(ev, L14C)); };
const W14SPLIT = t => flat14(t, { split: 1, calm: 1 });
// Schalti springt neben den Router aufs Wandregal
WMASC.p14c_3 = (ev, t, lt) => { const H = [220, 1537], K = [455, 905], f = ev.frei, a = ev.act;
  if (f === undefined) return BIG3();
  if (a !== undefined) { const k = ease(cl(a / .45)); return { f: [lerp(K[0], H[0], k), lerp(K[1], H[1], k) - 130 * Math.sin(Math.PI * k)], s: lerp(.5, 1, k), flip: k < .9, nospin: 1 }; }
  if (f < 1.3) return BIG3();
  const k = ease(cl((f - 1.3) / .45)); return { f: [lerp(H[0], K[0], k), lerp(H[1], K[1], k) - 170 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), r: k < 1 ? 0 : 4 * Math.sin(t * 5), nospin: 1 }; };
// Schluss: der Router steht da, wo er hingehoert, und sendet ruhig
WORLD.p14outro_3 = function (sc, ev, t) { return W(flat14(t, { calm: 1, side: 1, shelf: 1, router: [615, 905], rings: .45 }) + shade3()); };
['h7p14_3', 'p14a_3', 'p14b_3', 'p14c_3', 'p14outro_3'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#5CE1FF'); });
