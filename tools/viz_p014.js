// P014 "Warum geht WLAN durch die Wand?" im bisherigen Stil (Skript 1): Show-Buehne im Einstieg, Schaubild auf dunklem Grund.
// Erklaergrafiken aus viz_p014g.js. Zum Loeschen dieser Fassung: diese Datei und videos/P014.
const BIG14 = () => ({ f: [220, 1537], s: 1, nospin: 1 });
const bg14 = t => bgRad('#06122A', '#12356A', .55) + dust(t, '#5CE1FF', 22, .14);
// Gag aus dem Objekt: Schalti springt waehrend "Gib mir 60 Sekunden" neugierig neben den Router. Beim Nachsatz sendet der Router einen kraeftigen Wellenstoss,
// der Schalti mitnimmt. Die Welle geht durch die Wand, Schalti nicht: Er klatscht dagegen, rutscht herunter, sitzt benommen da und springt zurueck. Einschlag bei 0,5 s
const P14r = e => e < .1 ? lerp(30, 150, e / .1) : e < .5 ? lerp(150, 310, (e - .1) / .4) : 310 + (e - .5) * 700;
function gag14(e, t) { const H = [220, 1537], A = [360, 1108], B = [520, 1108], C = [490, 1108];
  if (e < .1) return { f: [A[0], A[1] - 16 * (e / .1)], s: .5, r: 6, nospin: 1 };
  if (e < .5) { const k = (e - .1) / .4; return { f: [250 + P14r(e) - 40, A[1] - 16 - 40 * k], s: .5, r: 14, nospin: 1 }; }
  if (e < .95) return { f: [B[0], 1052], s: .5, r: 4 * Math.sin(t * 40) * (1 - cl((e - .5) / .2)), nospin: 1 };
  if (e < 1.3) { const k = (e - .95) / .35; return { f: [lerp(B[0], C[0], k), lerp(1052, 1108, k * k)], s: .5, r: -16 * k, nospin: 1 }; }
  if (e < 1.9) return { f: C, s: .5, r: -16 + 5 * Math.sin(t * 9), nospin: 1 };
  if (e < 2.4) { const k = ease((e - 1.9) / .5); return { f: [lerp(C[0], H[0], k), lerp(C[1], H[1], k) - 150 * Math.sin(Math.PI * k)], s: lerp(.5, 1, k), nospin: 1 }; }
  return { f: H, s: 1, r: 4 * Math.sin(t * 9) * (1 - cl((e - 2.4) / .5)), nospin: 1 }; }
WORLD.h7p14 = function (sc, ev, t, lt) {
  const e = ev.bonk, li = sc.lines.length - 1, end = sc.lines[li] ? sc.lines[li].start - sc.start : 8, k = cl(lt / end), hit = e !== undefined && e >= .5 ? e - .5 : undefined, sh = shake7(hit, t);
  let s = stage7(t, lt, '#06122A', hit === undefined ? '#5CE1FF' : '#FFE14D', 590, 905), o = '';
  o += rings14(250, 1000, t, 4, '#5CE1FF', 420 + 80 * k, .85) + '<path d="M130 1110 H930" stroke="#3A4A7A" stroke-width="6" stroke-linecap="round"/>' + router14(250, 1108, .8, t);
  if (e !== undefined && e < 1.4) o += '<circle cx="250" cy="1050" r="' + P14r(e) + '" fill="none" stroke="#B8F3FF" stroke-width="' + (22 - 6 * cl(e)) + '" opacity="' + (1 - cl((e - .9) / .5)) + '"/>';
  o += '<g transform="translate(' + (hit !== undefined ? 10 * Math.sin(t * 60) * (1 - cl(hit / .5)) : 0) + ' 0)">' + brick14(560, 700, 84, 410, 'h') + '</g>' + phone14(800, 880, hit !== undefined && hit > .15 ? 4 : 3);
  s += pop7(590, 905, lt, o);
  if (e !== undefined && e > 1.25 && e < 2.0) s += stars14(505, 955, t, 1 - cl((e - 1.7) / .3));
  s += word7('BONK!', 690, 735, hit, '#FFE14D', -6) + sweat7(t, e === undefined ? k * .5 : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7p14 = (ev, t, lt, sc) => { if (ev.bonk !== undefined) return gag14(ev.bonk, t);
  const H = [220, 1537], A = [360, 1108], q = lt - (sc.lines[3] ? sc.lines[3].start - sc.start : 6); if (q < 0) return { f: H, s: 1, r: 2 * Math.sin(t * 2) };
  const k = ease(cl(q / .5)); return k < 1 ? { f: [lerp(H[0], A[0], k), lerp(H[1], A[1], k) - 150 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), nospin: 1 } : { f: [A[0], A[1] - 4 * Math.abs(Math.sin(t * 5))], s: .5, r: 5, nospin: 1 }; };

WORLD.p14a = (sc, ev, t, lt) => W(bg14(t) + g14a(sc, ev, t, lt) + topShade(), slot(ev, L14A));
WMASC.p14a = BIG14;
WORLD.p14b = (sc, ev, t, lt) => W(bg14(t) + g14b(sc, ev, t, lt) + topShade(), slot(ev, L14B));
WMASC.p14b = BIG14;
WORLD.p14c = (sc, ev, t, lt) => W(bg14(t) + g14c(sc, ev, t, lt, { squirt: 1 }) + topShade(), slot(ev, L14C));
// Gag Teil 3 (Eigentor): Der Fisch spritzt Schalti nass, er zuckt zurueck und schuettelt sich
WMASC.p14c = (ev, t) => { const w = ev.wasser; if (w === undefined || ev.frei !== undefined || w < 1.35 || w > 2.6) return BIG14();
  const q = w - 1.35, b = cl(q / .15) * (1 - cl((q - .9) / .35)); return { f: [220 - 34 * b, 1537 - 26 * Math.sin(Math.PI * cl(q / .3))], s: 1, r: -9 * b + 7 * b * Math.sin(t * 34), nospin: 1 }; };
WORLD.p14outro = function (sc, ev, t) { return W(bg14(t) + rings14(790, 1010, t, 4, '#5CE1FF', 230, .8) + router14(790, 1100, .9, t) + topShade()); };
