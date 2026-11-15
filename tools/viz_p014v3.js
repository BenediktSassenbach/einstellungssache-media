// P014V3 "Warum geht WLAN durch die Wand?" im Design 3.0 (Vollbild plus). Gleicher Text wie P014.
// Ort: Wohnung bei Nacht im Schnitt: Wohnzimmer mit Router auf dem Sideboard, rechts die Ziegelwand (x 950), dahinter das Nachbarzimmer.
// Erklaergrafiken aus viz_p014g.js, Helfer aus viz_v3.js. Zum Loeschen dieser Fassung: diese Datei und videos/P014V3.
function flat14(t, o) { o = o || {}; const big = o.big ? 1 : 0, RX = 565, RY = 1330;
  let s = '<defs><linearGradient id="f14w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050E24"/><stop offset=".6" stop-color="#0E2C58"/><stop offset="1" stop-color="#1B5290"/></linearGradient><linearGradient id="f14n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040F"/><stop offset="1" stop-color="#1A3F7A"/></linearGradient><radialGradient id="f14g"><stop offset="0" stop-color="#5CE1FF" stop-opacity=".45"/><stop offset="1" stop-color="#5CE1FF" stop-opacity="0"/></radialGradient><clipPath id="f14c"><rect x="600" y="250" width="250" height="300" rx="10"/></clipPath><clipPath id="f14l"><rect x="0" y="0" width="950" height="1548"/></clipPath><clipPath id="f14r"><rect x="1006" y="0" width="74" height="1548"/></clipPath></defs>';
  s += '<rect width="950" height="1552" fill="url(#f14w)"/>'; for (let i = 0; i < 11; i++) s += '<rect x="' + (30 + i * 90) + '" y="0" width="6" height="1548" fill="#fff" opacity=".025"/>';
  s += '<ellipse cx="480" cy="920" rx="' + (540 + 30 * Math.sin(t * .8)) + '" ry="410" fill="url(#f14g)" opacity="' + (.6 + .12 * Math.sin(t * 1.3)) + '"/>';
  // Fenster mit Mond, Sternen und ziehender Wolke
  s += '<g clip-path="url(#f14c)"><rect x="600" y="250" width="250" height="300" fill="url(#f14n)"/>'; for (let i = 0; i < 16; i++) s += '<circle cx="' + (606 + rnd(i + 31) * 238).toFixed(0) + '" cy="' + (258 + rnd(i + 61) * 230).toFixed(0) + '" r="' + (1.5 + 2 * rnd(i + 91)).toFixed(1) + '" fill="#fff" opacity="' + (.25 + .6 * Math.abs(Math.sin(t * (1 + rnd(i + 11)) + i))).toFixed(2) + '"/>';
  s += '<circle cx="780" cy="330" r="58" fill="#FFF1C4" opacity=".16"/><circle cx="780" cy="330" r="36" fill="#FFF1C4"/>'; { const cx = 560 + ((t * 14) % 380); s += '<g opacity=".5" fill="#9FB6E0"><ellipse cx="' + cx + '" cy="430" rx="60" ry="18"/><ellipse cx="' + (cx + 34) + '" cy="416" rx="40" ry="16"/></g>'; }
  s += '</g><rect x="600" y="250" width="250" height="300" rx="10" fill="none" stroke="#2A5A94" stroke-width="14"/><path d="M725 250 V550 M600 400 H850" stroke="#2A5A94" stroke-width="8"/><rect x="584" y="546" width="282" height="20" rx="8" fill="#2A5A94"/>';
  // Nachbarzimmer hinter der Wand: Handy auf dem Regal empfaengt
  s += '<rect x="1006" y="0" width="74" height="1552" fill="#081A36"/><circle cx="1043" cy="1250" r="' + (70 + 8 * Math.sin(t * 2)) + '" fill="#5CE1FF" opacity=".10"/><rect x="1012" y="1300" width="68" height="14" rx="5" fill="#2A5A94"/><rect x="1020" y="1216" width="46" height="84" rx="9" fill="#0B1020" stroke="#F4F6FB" stroke-width="5"/>' + bars14(1043, 1252, .5, Math.sin(t * 1.7) > 0 ? 2 : 3);
  // WLAN-Ringe vom Router: links kraeftig, hinter der Wand schwaecher
  const rg = rings14(RX, RY, t, big ? 5 : 4, '#5CE1FF', big ? 980 : 760, big ? .6 : .26, big ? 10 : 7);
  s += '<g clip-path="url(#f14l)">' + rg + '</g><g clip-path="url(#f14r)" opacity=".45">' + rg + '</g>';
  // Ziegelwand im Schnitt
  s += brick14(950, 232, 56, 1322, 'w');
  for (let i = 0; i < 14; i++) { const y = 1540 - ((t * 24 * (.5 + rnd(i + 400)) + rnd(i + 420) * 1240) % 1240); s += '<circle cx="' + (rnd(i + 440) * 930 + 14 * Math.sin(t + i)) + '" cy="' + y + '" r="' + (3 + 3 * rnd(i + 460)) + '" fill="#9BE7FF" opacity=".2"/>'; }
  // Boden, Teppich
  s += '<rect y="1548" width="1080" height="372" fill="#081830"/>'; for (let i = 0; i < 7; i++) s += '<path d="M' + (20 + i * 180) + ' 1548 l-60 372" stroke="#0E2748" stroke-width="4"/>';
  s += '<path d="M0 1548 H1080" stroke="#5CE1FF" stroke-width="18" opacity="' + (.16 + .06 * Math.sin(t * 2)) + '"/><path d="M0 1548 H1080" stroke="#7FD9FF" stroke-width="5"/><ellipse cx="240" cy="1592" rx="250" ry="40" fill="#123A6A"/><ellipse cx="240" cy="1592" rx="200" ry="28" fill="none" stroke="#2A5A94" stroke-width="5"/>';
  // Sideboard mit Router, Pflanze
  s += '<rect x="430" y="1440" width="270" height="108" rx="10" fill="#17365F" stroke="#2A5A94" stroke-width="5"/><path d="M565 1444 V1544 M452 1494 h30 M648 1494 h30" stroke="#2A5A94" stroke-width="5" stroke-linecap="round"/>' + router14(RX, 1440, .9, t);
  s += '<path d="M758 1548 L770 1478 H826 L838 1548 Z" fill="#B5533C" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/>'; for (let i = 0; i < 5; i++) { const a = -70 + i * 35 + 5 * Math.sin(t * 1.4 + i); s += '<path transform="translate(798 1480) rotate(' + a + ')" d="M0 0 Q-26 -70 0 -140 Q26 -70 0 0 Z" fill="' + (i % 2 ? '#2ECC71' : '#27A85E') + '" stroke="#0B1020" stroke-width="4"/>'; }
  return s; }
// Gag: Schalti rennt selbst los, knallt gegen die Ziegelwand, kugelt zurueck, sitzt benommen da und laeuft zurueck. Einschlag bei 0,75 s
function gag14v(e, t) { const run = Math.abs(Math.sin(t * 17));
  if (e < .25) return { f: [220, 1537], s: 1, r: -10, nospin: 1 };
  if (e < .75) { const k = (e - .25) / .5; return { f: [lerp(220, 862, k), 1537 - 14 * run], s: 1, r: 10, nospin: 1 }; }
  if (e < 1.3) { const k = (e - .75) / .55; return { f: [lerp(862, 600, k), 1537 - 150 * Math.sin(Math.PI * k)], s: 1, r: -360 * k, nospin: 1 }; }
  if (e < 2.0) return { f: [600, 1537], s: 1, r: -16 + 5 * Math.sin(t * 9), nospin: 1 };
  if (e < 2.7) { const k = (e - 2) / .7; return { f: [lerp(600, 220, k), 1537], s: 1, walk: true, flip: true, nospin: 1 }; }
  return { f: [220, 1537], s: 1, nospin: 1 }; }
WORLD.h7p14_3 = function (sc, ev, t, lt) {
  const e = ev.bonk, hit = e !== undefined && e >= .75 ? e - .75 : undefined, sh = shake7(hit, t);
  let s = flat14(t, { big: 1 });
  if (e !== undefined && e > 1.2 && e < 2.2) s += stars14(630, 1230, t, 1 - cl((e - 1.9) / .3));
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + shade3());
};
WMASC.h7p14_3 = (ev, t, lt) => ev.bonk === undefined ? { f: [220 + 22 * Math.sin(t * 1.6) * cl(lt / 6), 1537 - 6 * Math.abs(Math.sin(t * 6)) * cl(lt / 6)], s: 1, r: -4, nospin: 1 } : gag14v(ev.bonk, t);

WORLD.p14a_3 = (sc, ev, t, lt) => W(flat14(t) + g14a(sc, ev, t, lt) + shade3(), slot(ev, L14A));
// Teil 1: Schalti surft auf dem Kamm der langen WLAN-Welle
WMASC.p14a_3 = (ev, t, lt, sc) => { const H = [220, 1537], la = ev.lang; if (la === undefined || ev.licht !== undefined) return BIG3();
  const D = Math.max(2, D14(sc, 1)), u = la / D, P = [w14crest(sc, t), W14Y - W14A + 4];
  if (u < .12) { const k = ease(u / .12); return { f: [lerp(H[0], P[0], k), lerp(H[1], P[1], k) - 120 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), nospin: 1 }; }
  if (u < .75) return { f: [P[0], P[1] + 3 * Math.sin(t * 9)], s: .5, r: 7 * Math.sin(t * 5), nospin: 1 };
  const k = ease(cl((u - .75) / .22)), Q = [260 + w14v(sc) * .75 * D, P[1]]; return { f: [lerp(Q[0], H[0], k), lerp(Q[1], H[1], k) - 160 * Math.sin(Math.PI * k)], s: lerp(.5, 1, k), flip: k < .9, nospin: 1 }; };
WORLD.p14b_3 = (sc, ev, t, lt) => W(flat14(t) + g14b(sc, ev, t, lt) + shade3(), slot(ev, L14B));
WMASC.p14b_3 = () => BIG3();
WORLD.p14c_3 = (sc, ev, t, lt) => W(flat14(t) + g14c(sc, ev, t, lt) + shade3(), slot(ev, L14C));
// Teil 3: Schalti springt neben den Router aufs Regal und zeigt, wo er hingehoert
WMASC.p14c_3 = (ev, t, lt) => { const H = [220, 1537], K = [450, 900], f = ev.frei, a = ev.act;
  if (f === undefined) return BIG3();
  if (a !== undefined) { const k = ease(cl(a / .45)); return { f: [lerp(K[0], H[0], k), lerp(K[1], H[1], k) - 130 * Math.sin(Math.PI * k)], s: lerp(.5, 1, k), flip: k < .9, nospin: 1 }; }
  if (f < .6) return BIG3();
  const k = ease(cl((f - .6) / .45)); return { f: [lerp(H[0], K[0], k), lerp(H[1], K[1], k) - 170 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), r: k < 1 ? 0 : 4 * Math.sin(t * 5), nospin: 1 }; };
WORLD.p14outro_3 = function (sc, ev, t) { return W(flat14(t, { big: 1 }) + shade3()); };
['h7p14_3', 'p14a_3', 'p14b_3', 'p14c_3', 'p14outro_3'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#5CE1FF'); });
