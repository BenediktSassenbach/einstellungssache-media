// I006 v4 (stumme Demo): alter Stil, neuer Einstieg. Zum Loeschen: diese Datei und videos/I006_v4. Nutzt die Helfer aus viz_i006.js.
// ---------- Einstieg v4 (15.11.2026): Knall schon im ersten Satz ("Du sagst Pizza. Zack: Pizza-Werbung!"), beim Teaser oeffnet sich ein Auge im Handy ----------
// Zeitpunkt des Knalls = Beginn des Wortes "Zack" (mit Stimme aus den Wortzeiten, stumm geschaetzt)
function i6zack(sc) { const l = sc.lines[0]; return (l.words && l.words[3] ? l.words[3][0] : l.start + (l.end - l.start) * .45) - sc.start; }
WORLD.h7i6b = function (sc, ev, t, lt) {
  const Z = i6zack(sc), e = lt >= Z ? lt - Z : undefined, a = ev.auge, k = cl(lt / Z), CX = 590, CY = 905, X = CX - 140, Y = CY - 220;
  const sh = a !== undefined ? shake7(a, t).map(v => v * .55) : shake7(e, t);
  const mb = e === undefined ? 0 : cl((e - 1.9) / .4); // Werbung weg, Handy lauscht wieder
  const ak = a === undefined ? 0 : cl(a / .3);
  const col = a !== undefined ? lc('#3DFF7A', '#FF3B5C', ak) : e === undefined ? lc('#7C5CFF', '#3DFF7A', k) : lc('#FFC94D', '#3DFF7A', mb);
  let s = stage7(t, lt, '#07081C', col, CX, CY), o = '', fl = '';
  const listen = e === undefined ? k : (a === undefined ? mb : 0);
  const jit = listen > 0 ? 4 * listen * listen * Math.sin(t * 46) : (a !== undefined ? 3 * Math.sin(t * 60) * (1 - cl((a - .5) / .5)) : 0);
  if (listen > 0) for (let i = 0; i < 3; i++) { const c = (t * .9 + i / 3) % 1; o += '<path d="M' + (X - 26 - 90 * c) + ' ' + (CY - 70 - 44 * c) + ' Q' + (X - 70 - 120 * c) + ' ' + CY + ' ' + (X - 26 - 90 * c) + ' ' + (CY + 70 + 44 * c) + '" stroke="' + (e === undefined ? '#fff' : '#3DFF7A') + '" stroke-width="9" fill="none" stroke-linecap="round" opacity="' + ((1 - c) * (.25 + .75 * listen)) + '"/>'; }
  o += '<g transform="translate(' + jit + ' 0)">' + phoneF(X, Y, 280, 440, a !== undefined ? lc('#0F3A2A', '#16061C', ak) : e === undefined ? lc('#1B2748', '#0F3A2A', k) : lc('#3A2A10', '#0F3A2A', mb));
  if (a !== undefined) { // Auge geht auf und schaut zu Schalti
    const op = back(cl((a - .1) / .35)), bl = (a > 1.2 && (a - 1.2) % 1.7 < .12) ? .15 : 1, ry = 74 * op * bl, an = Math.atan2(1440 - CY, 230 - CX), px = 34 * Math.cos(an), py = 22 * Math.sin(an);
    o += '<ellipse cx="' + CX + '" cy="' + (CY - 20) + '" rx="150" ry="110" fill="#FF3B5C" opacity="' + (.22 * ak * (1 + .3 * Math.sin(t * 6))) + '"/>';
    o += '<clipPath id="ey6"><ellipse cx="' + CX + '" cy="' + (CY - 20) + '" rx="108" ry="' + Math.max(.1, ry) + '"/></clipPath><ellipse cx="' + CX + '" cy="' + (CY - 20) + '" rx="108" ry="' + Math.max(.1, ry) + '" fill="#fff" stroke="#0B1020" stroke-width="7"/>';
    o += '<g clip-path="url(#ey6)"><circle cx="' + (CX + px) + '" cy="' + (CY - 20 + py) + '" r="50" fill="#FF3B5C" stroke="#0B1020" stroke-width="5"/><circle cx="' + (CX + px) + '" cy="' + (CY - 20 + py) + '" r="22" fill="#0B1020"/><circle cx="' + (CX + px - 16) + '" cy="' + (CY - 36 + py) + '" r="9" fill="#fff"/></g>';
  } else if (e === undefined || e < .08 || mb > 0) { const m = e === undefined ? k : mb; o += '<g opacity="' + (e === undefined ? 1 : mb) + '">' + mic6(CX, CY - 56, 1.55, lc('#AEB9D6', '#3DFF7A', m)); for (let i = 0; i < 7; i++) { const hh = 14 + (16 + 64 * m) * Math.abs(Math.sin(t * (5 + i) + i * 1.7)); o += '<rect x="' + (CX - 98 + i * 30) + '" y="' + (CY + 120 - hh / 2) + '" width="16" height="' + hh + '" rx="8" fill="#3DFF7A" opacity="' + (.35 + .65 * m) + '"/>'; } o += '</g>'; }
  if (e !== undefined && e >= .08 && mb < 1 && a === undefined) o += ad6(CX, CY, 1.3 * back(cl((e - .08) / .25)) * (1 - mb), 4 * Math.sin(t * 9), true);
  o += '</g>';
  const bk = cl((lt - .12) / .2); // Sprechblase "Pizza" ist sofort da
  if (bk > 0 && (e === undefined || e < .15)) o += '<g transform="translate(' + (X - 150) + ' ' + (CY - 170) + ') scale(' + back(bk) + ') rotate(' + (-6 + 3 * Math.sin(t * 5)) + ')"><path d="M36 50 L66 100 L86 46 Z" fill="#fff" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><rect x="-124" y="-62" width="248" height="124" rx="46" fill="#fff" stroke="#0B1020" stroke-width="6"/><rect x="38" y="44" width="46" height="14" fill="#fff"/>' + pizza6(-72, 2, .48, -12) + svgT(30, 19, 'Pizza', 52, '#0B1020') + '</g>';
  if (e !== undefined) for (let i = 0; i < 11; i++) { const q = e - .1 - i * .07; if (q <= 0) continue; const tx = 170 + rnd(i + 4) * 230, ty = 1280 + rnd(i + 9) * 50, dir = i % 2 ? 1 : -1; let x, y, r;
    if (q < .5) { const c = q / .5; x = lerp(CX, tx, c); y = lerp(CY, ty, c) - 320 * Math.sin(Math.PI * c); r = 420 * c * dir; }
    else { const c2 = cl((q - .5) / .9); x = tx + dir * (150 + 220 * rnd(i)) * c2; y = ty - 170 * Math.sin(Math.PI * c2 * .9) + 560 * c2 * c2; r = 420 * dir + 380 * c2 * dir; }
    fl += ad6(x, y, .62, r, true, 1 - cl((q - 1.2) / .25)); }
  if (e !== undefined && e > .6) fl += stars6(e, t);
  s += pop7(CX, CY, lt, o) + fl + sweat7(t, a !== undefined ? 1 : listen * .7);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7i6b = (ev, t, lt, sc) => { const Z = i6zack(sc), e = lt >= Z ? lt - Z : undefined, a = ev.auge, k = cl(lt / Z);
  if (a !== undefined) { const c = cl(a / .25); return { f: [220 - 26 * c, 1537 - 30 * Math.sin(Math.PI * c)], s: 1, r: -9 * c + 4 * Math.sin(t * 30) * (1 - cl((a - 1.8) / .6)) }; }
  if (e !== undefined && e > .55) { const b = cl((e - .55) / .25), rc = cl((e - 2.3) / .5); return { f: [220 - 30 * b * (1 - rc), 1537], s: 1, r: (-12 * b + 6 * Math.sin(t * 7)) * (1 - rc) }; }
  return { f: [220, 1537], s: 1, r: 4 * k + 2 * k * Math.sin(t * 12) };
};
