// Physik P007 "Warum sieht der Mond am Horizont so riesig aus?" (Bauplan wie I004, Einstieg mit Aufhaenger = 5 Zeilen). Etikett y=600, Grafik y=700 bis 1130.

// ---------- Helfer ----------
function sky7(t) { let s = kitchen(t, '#050A1E', '#0E1B4A', '#5CE1FF'); for (let i = 0; i < 14; i++) s += '<circle cx="' + (60 + 960 * rnd(i + 1)) + '" cy="' + (680 + 430 * rnd(i + 21)) + '" r="' + (2.5 + 2.5 * rnd(i + 41)) + '" fill="#fff" opacity="' + (.35 + .45 * Math.abs(Math.sin(t * 1.5 + i))) + '"/>'; return s; }
function moon7(x, y, r, col, rot) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ')"><circle r="' + r + '" fill="' + (col || '#F4F0DC') + '" stroke="#0B1020" stroke-width="' + Math.max(3, r * .05) + '"/><circle cx="' + (-r * .35) + '" cy="' + (-r * .2) + '" r="' + (r * .2) + '" fill="#0B1020" opacity=".14"/><circle cx="' + (r * .3) + '" cy="' + (r * .3) + '" r="' + (r * .26) + '" fill="#0B1020" opacity=".14"/><circle cx="' + (r * .25) + '" cy="' + (-r * .45) + '" r="' + (r * .12) + '" fill="#0B1020" opacity=".14"/></g>'; }
// Haeuser und Baeume als Silhouette, Unterkante bei y
function town7(x0, x1, y, sc) { sc = sc || 1; let s = '', x = x0, i = 0; while (x < x1) { const w = (50 + 40 * rnd(i + 3)) * sc, hh = (50 + 90 * rnd(i + 13)) * sc; if (i % 3 === 2) s += '<rect x="' + (x + w * .4) + '" y="' + (y - hh * .5) + '" width="' + (w * .2) + '" height="' + (hh * .5) + '" fill="#101A3A"/><circle cx="' + (x + w * .5) + '" cy="' + (y - hh * .6) + '" r="' + (w * .42) + '" fill="#14345A"/>'; else s += '<rect x="' + x + '" y="' + (y - hh) + '" width="' + w + '" height="' + hh + '" fill="#101A3A" stroke="#2A3A6A" stroke-width="3"/><rect x="' + (x + w * .2) + '" y="' + (y - hh + 12 * sc) + '" width="' + (w * .22) + '" height="' + (14 * sc) + '" fill="#FFD23F" opacity=".8"/>'; x += w + 8 * sc; i++; } return s + '<path d="M' + x0 + ' ' + y + ' H' + x1 + '" stroke="#2A3A6A" stroke-width="6"/>'; }
function brain7(x, y, s, t) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><circle cx="-34" cy="6" r="44" fill="#FF8FB8" stroke="#0B1020" stroke-width="6"/><circle cx="34" cy="6" r="44" fill="#FF8FB8" stroke="#0B1020" stroke-width="6"/><circle cx="0" cy="-26" r="46" fill="#FF8FB8" stroke="#0B1020" stroke-width="6"/><circle cx="0" cy="12" r="40" fill="#FF8FB8"/><path d="M0 -66 V44 M-50 -4 q20 -16 34 4 M20 -18 q18 -14 34 6 M-30 30 q16 -12 26 2" stroke="#0B1020" stroke-width="5" fill="none" stroke-linecap="round"/></g>'; }
function train7(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect x="-90" y="-190" width="180" height="190" rx="34" fill="#FF5A5A" stroke="#0B1020" stroke-width="7"/><rect x="-62" y="-160" width="124" height="66" rx="16" fill="#9BE7FF" stroke="#0B1020" stroke-width="6"/><circle cx="-48" cy="-44" r="18" fill="#FFE14D" stroke="#0B1020" stroke-width="5"/><circle cx="48" cy="-44" r="18" fill="#FFE14D" stroke="#0B1020" stroke-width="5"/><rect x="-70" y="-14" width="140" height="22" rx="8" fill="#2A3350"/></g>'; }
const D7 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3.4;

// Gag Teil 2: Schalti laeuft die Schienen entlang in die Ferne und wird dabei kleiner, dann kommt ein Zug vom Horizont und scheucht ihn zurueck
function p7rails(q, D, t) { const u = cl(q / Math.max(3, D - .1)), H = [220, 1537], F = [500, 905], run = Math.abs(Math.sin(t * 16));
  if (u < .22) { const c = ease(u / .22); return { tr: null, m: { f: [lerp(H[0], F[0], c), lerp(H[1], F[1], c) - 12 * run], s: lerp(1, .5, c), r: -6 } }; }
  if (u < .46) { const c = (u - .22) / .24; return { tr: c > .5 ? [500, 800, .12 + .1 * (c - .5)] : null, m: { f: [F[0], F[1] - (c > .6 ? 20 * Math.abs(Math.sin(t * 20)) : 0)], s: .5, r: c > .6 ? 0 : 8 * Math.sin(t * 5), flip: Math.sin(t * 5) > 0 && c < .6 } }; }
  if (u < .82) { const c = (u - .46) / .36, e = c * c; return { tr: [lerp(500, 500, e), lerp(800, 1118, e), lerp(.17, .95, e)], m: { f: [lerp(F[0], H[0], ease(c)), lerp(F[1], H[1], ease(c)) - 12 * run * (1 - c)], s: lerp(.5, 1, ease(c)), r: 8 + 5 * Math.sin(t * 16), flip: c < .9 } }; }
  const c = (u - .82) / .18; return { tr: [500, 1118, .95], puff: c, m: { f: H, s: 1, r: 5 * Math.sin(t * 24) * (1 - c) } };
}

// ---------- Einstieg: Der Riesenmond geht auf, loest sich und kegelt Schalti um ----------
WORLD.h7p7 = function (sc, ev, t, lt) {
  const e = ev.roll, end = sc.lines[4] ? sc.lines[4].start - sc.start : 8, k = cl(lt / end), sh = shake7(e !== undefined && e > .4 ? e - .4 : undefined, t), CX = 600, CY = 900;
  let s = stage7(t, lt, '#050A1E', e === undefined ? lc('#5CE1FF', '#FFB45C', k) : '#FFB45C', CX, CY), o = '', fl = '';
  const r = 120 + 120 * ease(k);
  if (e === undefined || e < .12) o += moon7(CX, CY + 60 - 120 * ease(k), r, lc('#F4F0DC', '#FFC27A', k), 0);
  o += '<rect x="' + (CX - 280) + '" y="' + (CY + 110) + '" width="560" height="60" fill="#050A1E"/>' + town7(CX - 280, CX + 280, CY + 112, 1);
  if (e !== undefined && e >= .12) { const c = cl((e - .12) / .7), mx = lerp(CX, -260, c), my = lerp(CY - 60, 1410, cl(c * 3)); fl += moon7(mx, my, lerp(240, 170, cl(c * 3)), '#FFC27A', -c * 900); if (e > .9) fl += stars6(e - .4, t); }
  s += pop7(CX, CY, lt, o) + fl + sweat7(t, e === undefined ? k * .6 : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7p7 = (ev, t, lt, sc) => { const e = ev.roll, end = sc.lines[4] ? sc.lines[4].start - sc.start : 8, k = cl(lt / end);
  if (e !== undefined && e > .4) { const c = cl((e - .4) / .5); return { f: [220 - 20 * Math.sin(Math.PI * c), 1537 - 34 * Math.sin(Math.PI * c)], s: 1, r: c < 1 ? -360 * c : 7 * Math.sin(t * 7) * (1 - cl((e - 2.4) / .5)) }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 12) };
};

// ---------- Teil 1: unten nicht groesser als oben, Fotos zeigen es, naeher ist er auch nicht, Taeuschung im Kopf ----------
WORLD.p7gleich = function (sc, ev, t, lt) {
  let s = sky7(t), h = '';
  const fo = ev.foto, na = ev.nah, a = ev.act, R = 74, L = [290, 912], Hi = [690, 790];
  s += moon7(Hi[0], Hi[1], R * back(cl((lt - .9) / .4)), '#F4F0DC') + moon7(L[0], L[1], R * back(cl((lt - .3) / .4)), '#FFC27A') + '<rect x="60" y="1080" width="880" height="56" fill="#050A1E"/>' + town7(60, 560, 1082, .62);
  if (fo === undefined && lt > 1.4) { const p = 1.45 + .08 * Math.sin(t * 4); s += '<circle cx="' + L[0] + '" cy="' + L[1] + '" r="' + (R * p) + '" fill="none" stroke="#FFC27A" stroke-width="6" stroke-dasharray="14 12" opacity="' + cl((lt - 1.4) / .3) + '"/>' + chip3(L[0] + 190, L[1] - 96, 'gefühlt', 34, '#FFC27A', '#0B1020', (lt - 1.6) / .3); }
  if (fo !== undefined && a === undefined) { const k = cl(fo / .4); [L, Hi].forEach(m => { s += '<g opacity="' + k + '"><rect x="' + (m[0] - R - 30) + '" y="' + (m[1] - R - 30) + '" width="' + (2 * R + 60) + '" height="' + (2 * R + 60) + '" rx="16" fill="none" stroke="#fff" stroke-width="7"/><path d="M' + (m[0] - R) + ' ' + (m[1] + R + 52) + ' H' + (m[0] + R) + ' M' + (m[0] - R) + ' ' + (m[1] + R + 38) + ' v28 M' + (m[0] + R) + ' ' + (m[1] + R + 38) + ' v28" stroke="#3DFF7A" stroke-width="7" stroke-linecap="round"/></g>'; });
    s += chip3(690, 990, 'gleich breit', 38, '#3DFF7A', '#0B1020', (fo - .8) / .3);
    if (na !== undefined) s += chip3(690, 1066, 'gleich weit weg', 34, '#F4F6FB', '#0B1020', (na - .5) / .3); }
  if (a !== undefined) s += brain7(690, 1010, back(cl(a / .4)) * (1 + .05 * Math.sin(t * 8)), t) + '<g opacity="' + cl((a - .5) / .3) + '">' + svgT(800, 990, '!', 110, '#FFD23F') + '</g>';
  h += slot(ev, [['panel', 'Unten nicht größer als oben'], ['foto', 'Fotos: beide Male gleich breit', 'hot'], ['nah', 'Näher ist er dort auch nicht'], ['act', 'Die Täuschung entsteht im Kopf', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.p7gleich = () => BIG();

// ---------- Teil 2: Gehirn rechnet mit Entfernung, Haeuser als Vergleich, zwei gleiche Balken auf Schienen, auch im All ----------
WORLD.p7hirn = function (sc, ev, t, lt) {
  let s = sky7(t), h = '';
  const ha = ev.haus, po = ev.ponzo, a = ev.act;
  if (ha === undefined && po === undefined && a === undefined) { const k = cl((lt - .4) / .5), k2 = cl((lt - 1.6) / .5); // gleicher Sehwinkel: nah klein, fern gross
    s += '<g opacity="' + k + '"><path d="M150 920 L880 760 M150 920 L880 1080" stroke="#5CE1FF" stroke-width="5" stroke-dasharray="14 10"/><ellipse cx="150" cy="920" rx="54" ry="34" fill="#fff" stroke="#0B1020" stroke-width="6"/><circle cx="162" cy="920" r="20" fill="#0B1020"/><rect x="386" y="880" width="20" height="92" fill="#3DFF7A"/><circle cx="396" cy="882" r="34" fill="#3DFF7A" stroke="#0B1020" stroke-width="5"/>' + svgT(396, 1030, 'nah', 34, '#3DFF7A') + '</g>';
    s += '<g opacity="' + k2 + '"><rect x="806" y="800" width="44" height="262" fill="#FFB45C"/><circle cx="828" cy="816" r="92" fill="#FFB45C" stroke="#0B1020" stroke-width="6"/>' + svgT(680, 1118, 'fern: muss riesig sein', 34, '#FFB45C') + '</g>';
  } else if (po === undefined && a === undefined) { const k = cl(ha / .4);
    s += '<g opacity="' + k + '">' + moon7(520, 930, 150, '#FFC27A') + '<rect x="60" y="1010" width="880" height="126" fill="#050A1E"/>' + town7(60, 940, 1070, 1.25) + '</g>';
  } else if (a === undefined) { const k = cl(po / .4), VX = 500, VY = 760;
    s += '<g opacity="' + k + '"><path d="M230 1125 L' + VX + ' ' + VY + ' L770 1125" stroke="#C9CFDD" stroke-width="10" fill="none" stroke-linejoin="round"/>'; for (let i = 0; i < 7; i++) { const c = Math.pow(i / 7, 1.6), y = lerp(1110, VY + 20, c), hw = 270 * (y - VY) / 365; s += '<path d="M' + (VX - hw) + ' ' + y + ' H' + (VX + hw) + '" stroke="#6E7891" stroke-width="' + (12 - 8 * c) + '"/>'; }
    s += '<rect x="390" y="832" width="220" height="24" rx="8" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/><rect x="390" y="1040" width="220" height="24" rx="8" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/></g>';
    if (po > 1) s += '<g opacity="' + cl((po - 1) / .3) + '"><path d="M390 870 V1026 M610 870 V1026" stroke="#3DFF7A" stroke-width="5" stroke-dasharray="10 10"/></g>' + chip3(800, 940, 'gleich lang', 34, '#3DFF7A', '#0B1020', (po - 1.1) / .3);
    const g = p7rails(po, D7(sc, 2), t); if (g.tr) s += train7(g.tr[0], g.tr[1], g.tr[2]); if (g.puff !== undefined) for (let i = 0; i < 3; i++) s += '<circle cx="' + (440 + 60 * i) + '" cy="' + (900 - 60 * g.puff - 14 * i) + '" r="' + (22 + 14 * g.puff) + '" fill="#fff" opacity="' + (.6 * (1 - g.puff)) + '"/>';
  } else { const k = cl(a / .4), ox = 6 * Math.sin(t * 1.3);
    s += '<g opacity="' + k + '"><path d="M60 1130 Q500 930 940 1130 Z" fill="#2E7BD6" stroke="#9BE7FF" stroke-width="8"/><path d="M260 1090 q60 -40 130 -20 q40 30 -20 50 Z M600 1060 q70 -30 120 10 q-30 40 -110 30 Z" fill="#3DBE6B"/>' + moon7(720, 800, 74, '#F4F0DC') + '<g transform="translate(' + (300 + ox) + ' ' + (840 + ox) + ') rotate(-12)"><rect x="-70" y="-34" width="140" height="68" rx="22" fill="#E8ECF5" stroke="#0B1020" stroke-width="6"/><rect x="-140" y="-16" width="64" height="32" fill="#3B6BD6" stroke="#0B1020" stroke-width="5"/><rect x="76" y="-16" width="64" height="32" fill="#3B6BD6" stroke="#0B1020" stroke-width="5"/><circle cx="20" cy="0" r="16" fill="#9BE7FF" stroke="#0B1020" stroke-width="5"/></g><path d="M400 830 L630 806" stroke="#5CE1FF" stroke-width="5" stroke-dasharray="14 10"/></g>'; }
  h += slot(ev, [['schatz', 'Das Gehirn rechnet mit Entfernung'], ['haus', 'Häuser und Bäume als Vergleich'], ['ponzo', 'Beide Balken sind gleich lang', 'hot'], ['act', 'Nicht ganz geklärt: auch im All', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.p7hirn = (ev, t, lt, sc) => (ev.ponzo !== undefined && ev.act === undefined) ? p7rails(ev.ponzo, D7(sc, 2), t).m : BIG();

// ---------- Teil 3: Fingernagel-Test, Papierrolle, echte Farbe, Luft streut Blau weg ----------
WORLD.p7test = function (sc, ev, t, lt) {
  let s = sky7(t), h = '';
  const ro = ev.rolle, fa = ev.farbe, a = ev.act;
  if (ro === undefined && fa === undefined && a === undefined) { const k = ease(cl((lt - .3) / .6)), fy = lerp(1300, 800, k);
    s += '<rect x="60" y="1066" width="880" height="70" fill="#050A1E"/>' + town7(60, 940, 1068, .9) + moon7(610, 838, 34, '#FFC27A');
    s += '<rect x="430" y="' + fy + '" width="96" height="420" rx="48" fill="#FFD23F" stroke="#0B1020" stroke-width="7"/><rect x="446" y="' + (fy + 12) + '" width="64" height="62" rx="24" fill="#FFF1B8" stroke="#0B1020" stroke-width="5"/>';
    if (lt > 1.6) s += '<g opacity="' + cl((lt - 1.6) / .3) + '"><path d="M446 ' + (fy - 18) + ' H510 M576 ' + (fy - 18) + ' H644" stroke="#3DFF7A" stroke-width="7" stroke-linecap="round"/></g>' + chip3(760, 838, 'gleich groß', 34, '#3DFF7A', '#0B1020', (lt - 1.9) / .3);
  } else if (fa === undefined && a === undefined) { const k = back(cl(ro / .4)), sh = ease(cl((ro - .9) / .7));
    s += '<g opacity="' + (1 - sh) + '"><rect x="60" y="1066" width="880" height="70" fill="#050A1E"/>' + town7(60, 940, 1068, .9) + '</g>' + '<circle cx="500" cy="915" r="' + (640 - 440 * sh) + '" fill="none" stroke="#050A1E" stroke-width="' + (700 * sh) + '" opacity="' + sh + '"/>';
    s += moon7(500, 915, lerp(110, 40, sh), '#FFC27A') + '<g transform="translate(500 915) scale(' + k + ')"><circle r="200" fill="none" stroke="#D9C7A0" stroke-width="34"/><circle r="218" fill="none" stroke="#0B1020" stroke-width="6"/><circle r="182" fill="none" stroke="#0B1020" stroke-width="6"/></g>';
  } else { const k = cl(fa / .4);
    s += '<g opacity="' + k + '"><rect x="60" y="930" width="880" height="200" fill="#FF9A5C" opacity=".14"/>' + moon7(280, 1010, 80, '#FFB45C') + moon7(720, 790, 80, '#F4F0DC') + svgT(280, 1126, 'tief', 34, '#FFB45C') + svgT(720, 906, 'hoch', 34, '#F4F0DC') + '</g>';
    if (a !== undefined) { const kk = cl(a / .4); s += '<g opacity="' + kk + '"><path d="M380 1010 H900" stroke="#FFB45C" stroke-width="10" stroke-linecap="round"/><path d="M880 996 l24 14 l-24 14" stroke="#FFB45C" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; for (let i = 0; i < 5; i++) { const c = (t * .6 + i / 5) % 1, x = 420 + i * 84, d = i % 2 ? 1 : -1; s += '<circle cx="' + (x + 30 * c) + '" cy="' + (1010 + d * 80 * c) + '" r="11" fill="#5C9BFF" opacity="' + (1 - c) + '"/>'; } s += '</g>'; } }
  h += slot(ev, [['finger', 'Arm strecken: Mond = Fingernagel'], ['rolle', 'Papierrolle: er schrumpft sofort', 'hot'], ['farbe', 'Echt ist nur die Farbe'], ['act', 'Luft streut blaues Licht weg', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.p7test = () => BIG();

// ---------- Schluss ----------
WORLD.p7outro = function (sc, ev, t) { return W(sky7(t) + moon7(780, 1000, 96, '#FFC27A') + topShade()); };
