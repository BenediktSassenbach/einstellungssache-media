// B013 "Warum hatte dieser Dino eine Keule am Schwanz?" (Bio, Dino-Skript, Kostuem B1 Dino-Forscher), stumme Demo v1 (20.11.2026).
// Ort: Urzeit-Lichtung (urD aus viz_b001d.js) mit morschem Baumstumpf rechts. Tier: ankyD aus viz_dino.js.
// Einstieg: Keule zertruemmert den Stumpf, dann frisst er Farn, Schalti schleicht mit dem Pinsel an, der Schwanz holt aus, der Luftstoss schiebt Schalti zurueck.
// Teil 1: Panzer von Kopf bis Schwanz, Lupe in die Haut (Knochenplatte in der Haut), Flankenstacheln, Schalti wirft einen Zapfen, der vom Panzer abprallt.
// Teil 2: Nahaufnahme Schwanz, Roentgenblick: Keule aus verwachsenen Platten, Stiel aus verhakten Wirbeln, verknoecherte Sehnen, Axtstiel, Keule zertruemmert einen Ast.
// Teil 3: T. rex kommt, Keule zielt aufs Schienbein, er zieht ab. Grabung in Montana: Zuul mit gebrochenen, verheilten Stacheln an der Huefte. Zwei Ankylosaurier im Streit.
// Zum Loeschen: diese Datei und videos/B013. ankyD in viz_dino.js und das Kostuem "dinoforscher" bleiben fuer spaetere Folgen.
var AX13 = 470, AY13 = 1130, AS13 = .8, AC13 = '#A8E63C', ST13 = '#0B1020';
var PB13 = { a: '#6F86B8', b: '#DDE6F7', p: '#3D4F7A', k: '#A9C1F0', l: '#4E6496' }; // zweites Tier (blau)
var PF13 = { a: '#E9DCC0', b: '#F6EEDC', p: '#B9A27A', k: '#FFF6E2', l: '#CDBB94' }; // Fossil (Knochenfarbe)
const ch13 = (...a) => { const c = chip3(...a); return c ? '<g data-text="1">' + c + '</g>' : ''; };
const any13 = (x, y, s, t, o) => ankyD(x, y, s, t, o);
function bg13(U, t) { let f = ''; for (let i = 0; i < 4; i++) f += frondD(-10, 1170, -62 + i * 16, 230, t, i % 2 ? '#35A85C' : '#22874A', i); return U.b + f; }
const fg13 = t => lowD(t, 1, 1540);
// Morscher Baumstumpf (rechts hinten). k: 0 heil, 1 zertruemmert (Splitter fliegen)
function stump13(x, y, k, t) { if (k >= 1.6) return '<ellipse cx="' + x + '" cy="' + (y + 4) + '" rx="70" ry="12" fill="#000" opacity=".2"/><path d="M' + (x - 54) + ' ' + y + ' L' + (x - 48) + ' ' + (y - 40) + ' L' + (x - 20) + ' ' + (y - 28) + ' L' + (x + 4) + ' ' + (y - 52) + ' L' + (x + 26) + ' ' + (y - 30) + ' L' + (x + 50) + ' ' + (y - 44) + ' L' + (x + 56) + ' ' + y + ' Z" fill="#8A6038" stroke="' + ST13 + '" stroke-width="6" stroke-linejoin="round"/>';
  let s = '<ellipse cx="' + x + '" cy="' + (y + 4) + '" rx="70" ry="12" fill="#000" opacity=".2"/>';
  if (k <= 0) return s + '<path d="M' + (x - 54) + ' ' + y + ' L' + (x - 44) + ' ' + (y - 230) + ' L' + (x - 60) + ' ' + (y - 262) + ' L' + (x - 18) + ' ' + (y - 250) + ' L' + (x + 8) + ' ' + (y - 280) + ' L' + (x + 30) + ' ' + (y - 246) + ' L' + (x + 48) + ' ' + (y - 236) + ' L' + (x + 56) + ' ' + y + ' Z" fill="#8A6038" stroke="' + ST13 + '" stroke-width="6" stroke-linejoin="round"/><path d="M' + (x - 26) + ' ' + (y - 40) + ' q8 -80 0 -160 M' + (x + 22) + ' ' + (y - 30) + ' q-6 -90 4 -170" stroke="#5E3E22" stroke-width="5" fill="none"/><ellipse cx="' + (x + 16) + '" cy="' + (y - 120) + '" rx="10" ry="16" fill="#5E3E22"/>';
  s += stump13(x, y, 2, t); const e = ease(cl(k));
  for (let i = 0; i < 9; i++) { const a = (-160 + i * 18) * Math.PI / 180, d = 40 + 360 * e, px = x + Math.cos(a) * d, py = y - 160 + Math.sin(a) * d + 700 * e * e, r = (i * 47 + 600 * e) % 360;
    s += '<path transform="translate(' + px.toFixed(0) + ' ' + Math.min(y - 6, py).toFixed(0) + ') rotate(' + r.toFixed(0) + ')" d="M-26 -8 L22 -12 L30 4 L-20 10 Z" fill="#8A6038" stroke="' + ST13 + '" stroke-width="4" opacity="' + (1 - cl((k - 1.1) / .5)).toFixed(2) + '"/>'; }
  for (let i = 0; i < 6; i++) s += '<circle cx="' + (x - 80 + i * 32) + '" cy="' + (y - 40 - 50 * e) + '" r="' + (20 + 40 * e) + '" fill="#E8D8B8" opacity="' + (.6 * (1 - e)).toFixed(2) + '"/>';
  return s; }
// Windstoss vom Schwanz Richtung Schalti
function gust13(k, t) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 5; i++) { const c = (t * 1.8 + i / 5) % 1, x = 760 - 560 * c, y = 1240 + i * 46 + 20 * Math.sin(t * 4 + i); s += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' q-60 -18 -120 0 q-30 10 -20 28" stroke="#F4F6FB" stroke-width="7" fill="none" stroke-linecap="round" opacity="' + (k * (1 - c) * .9).toFixed(2) + '"/>'; } return s; }
// Zapfen, den Schalti wirft
const cone13 = (x, y, r) => '<g data-figur="Zapfen" transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + r.toFixed(1) + ')"><ellipse rx="18" ry="26" fill="#8B5E3C" stroke="' + ST13 + '" stroke-width="5"/><path d="M-14 -10 L14 -2 M-16 4 L16 12 M-10 16 L12 20" stroke="#5A3A20" stroke-width="4"/></g>';
// Lupe im Ort
function lupe13(cx, cy, r, inner, k, hx, hy) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + e.toFixed(3) + ')"><clipPath id="lu13' + cx + '"><circle r="' + r + '"/></clipPath><circle r="' + r + '" fill="#FFF6DF"/><g clip-path="url(#lu13' + cx + ')">' + inner + '</g><circle r="' + r + '" fill="none" stroke="#F4F6FB" stroke-width="12"/><circle r="' + (r + 6) + '" fill="none" stroke="#0B1020" stroke-width="4"/></g><path d="M' + hx + ' ' + hy + ' L' + (cx + (hx - cx) * .55 * e).toFixed(0) + ' ' + (cy + (hy - cy) * .55 * e).toFixed(0) + '" stroke="#F4F6FB" stroke-width="6" stroke-dasharray="10 8" opacity="' + cl(k * 2).toFixed(2) + '"/>'; }
// Haut im Schnitt: Knochenplatten sitzen in der Haut, darunter Muskel
function skin13(t) { let s = '<rect x="-300" y="-300" width="600" height="600" fill="#CFE8F7"/>';
  s += '<path d="M-300 -40 Q0 -70 300 -40 V300 H-300 Z" fill="#E58A8A"/>';
  for (let i = 0; i < 9; i++) s += '<path d="M' + (-280 + i * 70) + ' 40 q30 60 0 140" stroke="#C25E66" stroke-width="5" fill="none" opacity=".6"/>';
  s += '<path d="M-300 -140 Q0 -176 300 -140 V30 Q0 6 -300 30 Z" fill="#E7A35A" stroke="#0B1020" stroke-width="5"/>';
  for (let i = 0; i < 3; i++) { const x = -170 + i * 170, y = -112 + (i === 1 ? -14 : 0); s += '<ellipse cx="' + x + '" cy="' + y + '" rx="70" ry="46" fill="#F6EEDC" stroke="#0B1020" stroke-width="5"/><path d="M' + (x - 50) + ' ' + y + ' Q' + x + ' ' + (y - 30) + ' ' + (x + 50) + ' ' + y + '" stroke="#CDBB94" stroke-width="5" fill="none"/>'; for (let j = 0; j < 7; j++) s += '<circle cx="' + (x - 40 + j * 13) + '" cy="' + (y + 12 + 6 * Math.sin(j * 2)) + '" r="4" fill="#CDBB94"/>'; }
  s += svgT(0, 120, 'Muskel', 34, '#7A1E2A') + svgT(-150, -6, 'Haut', 34, '#5A2E0E');
  return s; }
// Ast auf zwei Steinen (Teil 2), k: 0 heil, >0 zerbrochen
function log13(x, y, k) { let s = '<ellipse cx="' + x + '" cy="' + (y + 6) + '" rx="150" ry="14" fill="#000" opacity=".2"/><path d="M' + (x - 140) + ' ' + y + ' q20 -50 50 0 Z M' + (x + 90) + ' ' + y + ' q24 -54 52 0 Z" fill="#8D8FA3" stroke="' + ST13 + '" stroke-width="5"/>';
  if (k <= 0) return s + '<rect x="' + (x - 150) + '" y="' + (y - 74) + '" width="300" height="40" rx="18" fill="#9A6B3C" stroke="' + ST13 + '" stroke-width="6"/><ellipse cx="' + (x + 150) + '" cy="' + (y - 54) + '" rx="12" ry="20" fill="#D9B07A" stroke="' + ST13 + '" stroke-width="5"/>';
  const e = ease(cl(k * 2)); s += '<g transform="rotate(' + (-30 * e) + ' ' + (x - 20) + ' ' + (y - 54) + ')"><rect x="' + (x - 150) + '" y="' + (y - 74 + 20 * e) + '" width="140" height="40" rx="18" fill="#9A6B3C" stroke="' + ST13 + '" stroke-width="6"/></g><g transform="rotate(' + (30 * e) + ' ' + (x + 20) + ' ' + (y - 54) + ')"><rect x="' + (x + 10) + '" y="' + (y - 74 + 20 * e) + '" width="140" height="40" rx="18" fill="#9A6B3C" stroke="' + ST13 + '" stroke-width="6"/></g>';
  for (let i = 0; i < 6; i++) { const a = (-150 + i * 24) * Math.PI / 180, d = 30 + 200 * e; s += '<path transform="translate(' + (x + Math.cos(a) * d).toFixed(0) + ' ' + (y - 60 + Math.sin(a) * d + 200 * e * e).toFixed(0) + ') rotate(' + (i * 60 + 300 * e).toFixed(0) + ')" d="M-12 -4 L12 -6 L14 3 L-10 5 Z" fill="#D9B07A" stroke="' + ST13 + '" stroke-width="3" opacity="' + (1 - cl((k - .8) / .5)).toFixed(2) + '"/>'; }
  return s; }
// Axt-Umriss als Vergleich am Schwanz
function axe13(k, x0, y0, x1, y1) { if (k <= 0) return ''; const e = ease(cl(k)); return '<g opacity="' + (.95 * e).toFixed(2) + '"><path d="M' + x0 + ' ' + y0 + ' L' + x1 + ' ' + y1 + '" stroke="#FFE14D" stroke-width="10" stroke-dasharray="26 14" stroke-linecap="round"/><path d="M' + (x0 - 10) + ' ' + (y0 - 70) + ' L' + (x0 + 70) + ' ' + (y0 - 40) + ' L' + (x0 + 70) + ' ' + (y0 + 40) + ' L' + (x0 - 10) + ' ' + (y0 + 70) + ' Q' + (x0 + 26) + ' ' + y0 + ' ' + (x0 - 10) + ' ' + (y0 - 70) + ' Z" fill="none" stroke="#FFE14D" stroke-width="8" stroke-dasharray="20 12"/></g>'; }
// Grabungsstelle in Montana: Fels mit Schnurgitter, Zuul als Fossil
function dig13(t, hu) { let s = '<defs><linearGradient id="dg13" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8C99A"/><stop offset="1" stop-color="#B98A5C"/></linearGradient></defs><rect width="1080" height="1920" fill="#9CC9E8"/><path d="M0 560 L180 470 L360 520 L560 430 L760 500 L1080 440 V1920 H0 Z" fill="#C79A6A"/><rect x="0" y="700" width="1080" height="1220" fill="url(#dg13)"/>';
  for (let i = 0; i < 5; i++) s += '<path d="M0 ' + (760 + i * 120) + ' Q540 ' + (740 + i * 120) + ' 1080 ' + (770 + i * 120) + '" stroke="#A97E52" stroke-width="5" fill="none" opacity=".5"/>';
  s += '<rect x="40" y="760" width="1000" height="520" rx="20" fill="#D9B98C" stroke="' + ST13 + '" stroke-width="6"/>';
  s += any13(560, 1180, .78, 0, { pal: PF13, id: 'fo', shadow: 0, hurt: hu });
  for (let i = 1; i < 6; i++) s += '<path d="M' + (40 + i * 166) + ' 760 V1280" stroke="#FFF" stroke-width="3" opacity=".7"/>';
  for (let i = 1; i < 3; i++) s += '<path d="M40 ' + (760 + i * 173) + ' H1040" stroke="#FFF" stroke-width="3" opacity=".7"/>';
  s += '<path d="M940 1300 l40 -90 l14 6 l-34 90 Z" fill="#8B5E3C" stroke="' + ST13 + '" stroke-width="4"/><path d="M980 1210 l24 -40 l26 12 l-22 40 Z" fill="#C9CED8" stroke="' + ST13 + '" stroke-width="4"/>';
  return s; }

// ---------- Einstieg ----------
WORLD.b13hook = function (sc, ev, t, lt) { const U = urD(t), bum = ev.bum, fr = ev.frage, dr = ev.dreh, wu = ev.wusch; let s = bg13(U, t);
  // Keule: hoch ausholen (0 bis .7 s), runter auf den Stumpf (.7 bis .95 s)
  let sw = 0, hit = 0; if (bum !== undefined) { const up = ease(cl(bum / .7)), dn = cl((bum - .7) / .25); sw = 45 * up - 75 * dn * dn + 30 * ease(cl((bum - 1.1) / .6)) * (dn >= 1 ? 1 : 0); hit = bum > .95 ? (bum - .95) / .9 : 0; }
  if (fr !== undefined) sw = 0 + 30 * (1 - ease(cl(fr / .5))) * 0;
  let wsw = 0; if (wu !== undefined) { const a = ease(cl((wu - .3) / .4)), b = ease(cl((wu - .7) / .35)); wsw = 50 * a - 70 * b + 20 * ease(cl((wu - 1.2) / .6)); }
  s += stump13(930, 1150, hit, t);
  const eat = fr !== undefined && wu === undefined ? 1 : 0, look = wu !== undefined ? 1 : 0;
  s += any13(AX13, AY13, AS13, t, { sw: sw + wsw, eat: eat, head: eat ? 22 : (wu !== undefined ? -4 : 0), look: look, jaw: wu !== undefined ? .3 * Math.sin(Math.PI * cl(wu / .6)) : 0 });
  if (wu !== undefined) s += gust13(Math.sin(Math.PI * cl((wu - .7) / 1.4)), t);
  s += fg13(t);
  return W(s + shade3()); };
WMASC.b13hook = (ev, t, lt) => { const fr = ev.frage, dr = ev.dreh, wu = ev.wusch, bum = ev.bum;
  if (wu !== undefined) { const p = Math.sin(Math.PI * cl((wu - .75) / 1.3)), back = ease(cl((wu - .75) / .9)); return stay3([lerp(300, 170, back), 1537], 1, { r: -14 * p - 4, mood: wu > .7 ? 'shock' : 'happy' }); }
  if (dr !== undefined) { const k = ease(cl(dr / 1.2)); return stay3([lerp(220, 300, k), 1537 - 6 * Math.abs(Math.sin(dr * 6)) * (k < 1 ? 1 : 0)], 1, { r: 6 * Math.sin(t * 3), mood: 'happy' }); }
  if (bum !== undefined && fr === undefined) { const z = Math.sin(Math.PI * cl((bum - .9) / .9)); return stay3([220 - 10 * z, 1537], 1, { r: -12 * z, mood: z > .2 ? 'shock' : 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2) }); };

// ---------- Teil 1: Panzer ----------
WORLD.b13panz = function (sc, ev, t, lt) { const U = urD(t), pz = ev.pz, ha = ev.haut, st = ev.stach, kl = ev.klopf; let s = bg13(U, t) + stump13(930, 1150, 2, t), h = '';
  // Zapfen fliegt von Schalti auf den Ruecken, prallt ab, faellt zurueck vor Schalti
  let cone = ''; if (kl !== undefined) { const a = cl(kl / .7), b = cl((kl - .7) / .9); if (a < 1) cone = cone13(lerp(300, 520, a), lerp(1440, 880, a) - 220 * Math.sin(Math.PI * a), a * 540); else if (b < 1) cone = cone13(lerp(520, 330, b), lerp(880, 1500, b) - 260 * Math.sin(Math.PI * b), 540 + b * 400); else cone = cone13(330, 1500, 940); }
  const flinch = kl === undefined ? 0 : Math.sin(Math.PI * cl((kl - .6) / .7));
  s += any13(AX13, AY13, AS13, t, { head: -4 * flinch, look: flinch > .1 ? 1 : 0, sw: 4 * flinch });
  if (pz !== undefined && ha === undefined) { const L = [[170, 900, 'Kopf'], [470, 780, 'Rücken'], [880, 900, 'Schwanz']]; L.forEach((l, i) => s += ch13(l[0], l[1], l[2], 32, '#FFE14D', ST13, cl((pz - .4 - i * .45) / .3))); }
  if (ha !== undefined && st === undefined) s += lupe13(600, 800, 165, '<g transform="scale(.68)">' + skin13(t) + svgT(0, -196, 'Knochenplatte', 38, '#0B1020') + svgT(0, -160, '(Osteoderm)', 28, '#3D4F7A') + '</g>', ease(cl(ha / .5)), 520, 900);
  if (st !== undefined) { s += ch13(600, 1240, 'Flankenstacheln', 30, '#FFE14D', ST13, cl((st - .5) / .3)); const k = Math.sin(Math.PI * cl(st / 2.4)); if (k > 0) s += '<path d="M330 1220 Q470 1190 620 1220" stroke="#FFE14D" stroke-width="8" fill="none" stroke-dasharray="16 10" opacity="' + k.toFixed(2) + '"/>'; }
  s += cone + fg13(t);
  h += slot(ev, [['pz', 'Panzer von Kopf bis Schwanz'], ['haut', 'Knochen in der Haut', 'hot'], ['stach', 'Stacheln an den Flanken'], ['klopf', 'Hält einiges aus']]);
  return W(s + shade3(), h); };
WMASC.b13panz = (ev, t, lt) => { const kl = ev.klopf; const x = lerp(170, 220, ease(cl(lt / .8)));
  if (kl !== undefined) { const th = Math.sin(Math.PI * cl(kl / .5)), du = Math.sin(Math.PI * cl((kl - 1.2) / .7)); return stay3([220 + 20 * th, 1537 + 30 * du], 1, { r: -20 * th + 10 * du, mood: du > .2 ? 'shock' : (kl > 2 ? 'cool' : 'happy') }); }
  return stay3([x, 1537], 1, { r: 2 }); };

// ---------- Teil 2: Keule (Nahaufnahme Schwanz) ----------
var TX13 = -250, TS13 = 1.25; // Nahaufnahme: Huefte links am Rand, Keule rechts
WORLD.b13keul = function (sc, ev, t, lt) { const U = urD(t), kn = ev.knob, sti = ev.stiel, ax = ev.axt, ha = ev.hart; let s = bg13(U, t), h = '';
  let xr = 0; if (kn !== undefined) xr = ease(cl(kn / .6)); if (ha !== undefined) xr *= 1 - ease(cl(ha / .4));
  let sw = 0, hit = 0; if (ha !== undefined) { const up = ease(cl((ha - .5) / .6)), dn = cl((ha - 1.1) / .22); sw = 40 * up - 62 * dn * dn; hit = ha > 1.32 ? (ha - 1.32) / .8 : 0; if (ha > 2.3) sw = -22 + 22 * ease(cl((ha - 2.3) / .8)); }
  s += log13(485, 1190, hit);
  s += any13(TX13, 1130, TS13, t, { sw: sw, xr: xr });
  const cx = TX13 + 634 * TS13, cy = 1130 - 158 * TS13; // Keulen-Mitte
  if (kn !== undefined && sti === undefined) s += ch13(cx - 30, cy - 120, 'verwachsene Knochenplatten', 28, '#FFE14D', ST13, cl((kn - .6) / .3));
  if (sti !== undefined && ax === undefined) s += ch13(TX13 + 540 * TS13, 1130 - 250 * TS13, 'fest verhakte Wirbel', 28, '#7FD4FF', ST13, cl((sti - .4) / .3));
  if (ax !== undefined && ha === undefined) { s += ch13(TX13 + 520 * TS13, 1130 - 260 * TS13, 'verknöcherte Sehnen', 28, '#FF9F43', ST13, cl((ax - .2) / .3)); s += axe13(cl((ax - 1.4) / .5), cx - 30, cy, TX13 + 300 * TS13, 1130 - 200 * TS13); }
  s += fg13(t);
  h += slot(ev, [['knob', 'Keule: Knochenplatten', 'hot'], ['stiel', 'Stiel: verhakte Wirbel'], ['axt', 'Steif wie ein Axtstiel'], ['hart', 'Kann Knochen brechen', 'hot']]);
  return W(s + shade3(), h); };
WMASC.b13keul = (ev, t, lt) => { const ha = ev.hart;
  if (ha !== undefined) { const c = Math.sin(Math.PI * cl((ha - 1.2) / 1.2)); return stay3([220 - 16 * c, 1537 + 10 * c], 1, { r: -18 * c, mood: c > .2 ? 'shock' : 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2) }); };

// ---------- Teil 3: Wofuer? ----------
WORLD.b13wof = function (sc, ev, t, lt) { const U = urD(t), ra = ev.raub, fu = ev.fund, stc = ev.stach, zw = ev.zwei, fo = ev.foto; let h = '';
  // Lichtung mit T. rex
  let A = bg13(U, t) + stump13(930, 1150, 2, t), sw = 0;
  if (ra !== undefined) { const inn = ease(cl((ra - .3) / 1.4)), swing = Math.sin(Math.PI * cl((ra - 1.9) / .7)), tu = ease(cl((ra - 2.7) / .4)), out = ease(cl((ra - 3.1) / 1.4)); sw = 34 * swing;
    const rx = lerp(1500, 1010, inn) + 900 * out; const hop = swing > .5 ? 40 * Math.sin(Math.PI * cl((ra - 2.1) / .4)) : 0;
    if (rx < 1560) A += rexd(rx, AY13 - hop, .62, t, { run: (inn > 0 && inn < 1) || (out > 0 && out < 1) ? 1 : 0, kx: lerp(1, -1, tu), head: 10, jaw: swing > .3 ? .6 : .2, id: 'tr' }); }
  A += any13(AX13, AY13, AS13, t, { sw: sw, look: ra !== undefined && ra < 3 ? -1 : 0 }) + fg13(t);
  if (ra !== undefined) A += ch13(870, 820, 'Schienbein?', 30, '#FFE14D', ST13, cl((ra - 1.9) / .3) * (1 - cl((ra - 3) / .3)));
  // Grabung
  let D = dig13(t, stc === undefined ? 0 : ease(cl((stc - .6) / .5)));
  D += ch13(250, 820, 'Zuul, Montana', 32, '#FFE14D', ST13, fu === undefined ? 0 : cl((fu - .8) / .3));
  if (stc !== undefined) D += ch13(650, 1380, 'gebrochen und verheilt', 30, '#FF4D6D', '#fff', cl((stc - 1.4) / .3));
  // Zwei Tiere im Streit: das blaue kommt hinten links, Keule trifft die Huefte des vorderen
  let Z = bg13(U, t) + stump13(930, 1150, 2, t);
  if (zw !== undefined) { const inn = ease(cl(zw / 1.4)), sws = Math.sin(Math.PI * cl((zw - 1.6) / .8)), hitk = cl((zw - 1.95) / .5); const bx = lerp(-500, 170, inn);
    Z += any13(bx, 1030, .6, t, { pal: PB13, id: 'bl', walk: inn > 0 && inn < 1 ? 1 : 0, ph: zw * 7, sw: 46 * sws });
    const step = 26 * Math.sin(Math.PI * cl((zw - 2) / .6));
    Z += any13(AX13 + 90 + step, AY13, AS13, t, { look: 1, head: -6 * Math.sin(Math.PI * cl((zw - 2) / .8)) });
    if (hitk > 0 && hitk < 1) for (let i = 0; i < 5; i++) Z += '<circle cx="' + (AX13 + 190 + i * 22 - 44) + '" cy="' + (AY13 - 110 - 30 * hitk - (i % 2) * 20) + '" r="' + (14 + 30 * hitk) + '" fill="#F4EEDC" opacity="' + (.7 * (1 - hitk)).toFixed(2) + '"/>';
    Z += ch13(560, 760, 'Rang oder Revier?', 32, '#FFE14D', ST13, cl((zw - 2.6) / .3)); }
  else Z += any13(AX13 + 90, AY13, AS13, t, {});
  Z += fg13(t);
  let s = A; if (fu !== undefined) s = wipe3(A, D, fu, .5, AC13); if (zw !== undefined) s = wipe3(D, Z, zw, .5, AC13);
  if (fo !== undefined) { const k = ease(cl(fo / .5)); s += '<rect width="1080" height="1920" fill="#02030F" opacity="' + (.55 * k).toFixed(2) + '"/>' + (typeof IMG13 !== 'undefined' ? '<g transform="translate(540 900) scale(' + (.6 + .4 * k).toFixed(3) + ')" opacity="' + k.toFixed(2) + '"><rect x="-430" y="-330" width="860" height="660" rx="26" fill="#F4F6FB"/><image href="' + IMG13 + '" x="-410" y="-310" width="820" height="620" preserveAspectRatio="xMidYMid slice"/>' + chip3(-300, 280, 'KI-Bild', 26, '#0B1020', '#fff', 1) + '</g>' : ''); }
  h += slot(ev, [['raub', 'Gegen Raubsaurier?'], ['fund', 'Fund aus Montana'], ['stach', 'Stacheln an der Hüfte verheilt', 'hot'], ['zwei', 'Streit unter Artgenossen']]);
  return W(s + shade3(), h); };
WMASC.b13wof = (ev, t, lt) => { const ra = ev.raub, zw = ev.zwei, fu = ev.fund;
  if (zw !== undefined) { const c = Math.sin(Math.PI * cl((zw - 1.9) / .9)); return stay3([220 - 10 * c, 1537], 1, { r: -12 * c, mood: c > .2 ? 'shock' : 'cool' }); }
  if (fu !== undefined) return stay3([220, 1537], 1, { r: 4 * Math.sin(t * 2), mood: 'happy' });
  if (ra !== undefined) { const c = Math.sin(Math.PI * cl((ra - 1.8) / 1.2)); return stay3([220 - 14 * c, 1537 + 8 * c], 1, { r: -16 * c, mood: c > .2 ? 'shock' : 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 }); };

// ---------- Schluss ----------
WORLD.b13out = function (sc, ev, t, lt) { const U = urD(t); return W(bg13(U, t) + stump13(930, 1150, 2, t) + any13(AX13, AY13, AS13, t, { eat: 1, head: 20 }) + fg13(t) + shade3()); };
WMASC.b13out = (ev, t, lt) => stay3([220, 1537], 1, { r: 2 });

['b13hook', 'b13panz', 'b13keul', 'b13wof', 'b13out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC13); });
