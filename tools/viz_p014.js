// P014 "Warum geht WLAN durch die Wand?" im bisherigen Stil (Skript 1): Show-Buehne im Einstieg, Schaubild auf dunklem Grund.
// Erklaergrafiken aus viz_p014g.js. Zum Loeschen dieser Fassung: diese Datei und videos/P014.
const BIG14 = () => ({ f: [220, 1537], s: 1, nospin: 1 });
const bg14 = t => bgRad('#06122A', '#12356A', .55) + dust(t, '#5CE1FF', 22, .14);
// Gag: Schalti springt in die Szene, rennt gegen die Wand, prallt ab, sitzt benommen da und springt zurueck. Einschlag bei 0,75 s
function gag14(e, t) { const H = [220, 1537], A = [330, 1108], B = [520, 1108], C = [400, 1108], run = Math.abs(Math.sin(t * 17));
  if (e < .3) { const k = ease(e / .3); return { f: [lerp(H[0], A[0], k), lerp(H[1], A[1], k) - 150 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), nospin: 1 }; }
  if (e < .75) { const k = (e - .3) / .45; return { f: [lerp(A[0], B[0], k), A[1] - 10 * run], s: .5, r: 10, nospin: 1 }; }
  if (e < 1.25) { const k = (e - .75) / .5; return { f: [lerp(B[0], C[0], k), B[1] - 90 * Math.sin(Math.PI * k)], s: .5, r: -360 * k, nospin: 1 }; }
  if (e < 2.0) return { f: C, s: .5, r: -16 + 5 * Math.sin(t * 9), nospin: 1 };
  if (e < 2.5) { const k = ease((e - 2) / .5); return { f: [lerp(C[0], H[0], k), lerp(C[1], H[1], k) - 150 * Math.sin(Math.PI * k)], s: lerp(.5, 1, k), nospin: 1 }; }
  return { f: H, s: 1, r: 4 * Math.sin(t * 9) * (1 - cl((e - 2.5) / .5)), nospin: 1 }; }
WORLD.h7p14 = function (sc, ev, t, lt) {
  const e = ev.bonk, li = sc.lines.length - 1, end = sc.lines[li] ? sc.lines[li].start - sc.start : 8, k = cl(lt / end), hit = e !== undefined && e >= .75 ? e - .75 : undefined, sh = shake7(hit, t);
  let s = stage7(t, lt, '#06122A', hit === undefined ? '#5CE1FF' : '#FFE14D', 590, 905), o = '';
  o += rings14(250, 1000, t, 4, '#5CE1FF', 420 + 80 * k, .85) + '<path d="M130 1110 H930" stroke="#3A4A7A" stroke-width="6" stroke-linecap="round"/>' + router14(250, 1108, .8, t);
  o += '<g transform="translate(' + (hit !== undefined ? 10 * Math.sin(t * 60) * (1 - cl(hit / .5)) : 0) + ' 0)">' + brick14(560, 700, 84, 410, 'h') + '</g>' + phone14(800, 880, 3);
  s += pop7(590, 905, lt, o);
  if (e !== undefined && e > 1.15 && e < 2.1) s += stars14(415, 955, t, 1 - cl((e - 1.8) / .3));
  s += word7('BONK!', 690, 735, hit, '#FFE14D', -6) + sweat7(t, e === undefined ? k * .5 : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7p14 = (ev, t, lt, sc) => { const li = sc.lines.length - 1, end = sc.lines[li] ? sc.lines[li].start - sc.start : 8, k = cl(lt / end);
  return ev.bonk === undefined ? { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 12) } : gag14(ev.bonk, t); };

WORLD.p14a = (sc, ev, t, lt) => W(bg14(t) + g14a(sc, ev, t, lt) + topShade(), slot(ev, L14A));
WMASC.p14a = BIG14;
WORLD.p14b = (sc, ev, t, lt) => W(bg14(t) + g14b(sc, ev, t, lt) + topShade(), slot(ev, L14B));
WMASC.p14b = BIG14;
WORLD.p14c = (sc, ev, t, lt) => W(bg14(t) + g14c(sc, ev, t, lt, { squirt: 1 }) + topShade(), slot(ev, L14C));
// Gag Teil 3 (Eigentor): Der Fisch spritzt Schalti nass, er zuckt zurueck und schuettelt sich
WMASC.p14c = (ev, t) => { const w = ev.wasser; if (w === undefined || ev.frei !== undefined || w < 1.35 || w > 2.6) return BIG14();
  const q = w - 1.35, b = cl(q / .15) * (1 - cl((q - .9) / .35)); return { f: [220 - 34 * b, 1537 - 26 * Math.sin(Math.PI * cl(q / .3))], s: 1, r: -9 * b + 7 * b * Math.sin(t * 34), nospin: 1 }; };
WORLD.p14outro = function (sc, ev, t) { return W(bg14(t) + rings14(790, 1010, t, 4, '#5CE1FF', 230, .8) + router14(790, 1100, .9, t) + topShade()); };
