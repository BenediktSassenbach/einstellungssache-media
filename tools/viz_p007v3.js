// VERSION 3.0 (P007V3), erzeugt aus Version 2.0 (P007T) "Warum sieht der Mond am Horizont so riesig aus?" Gleicher Text wie P007, aber jede Szene als durchgehend animiertes
// Nachtbild im Vollformat (Himmel, Stadt, Huegel, auf dem Schalti steht) statt Schaubild im Kasten. Zum Loeschen: diese Datei und videos/P007T.

// Kopien aus Version 1, damit Version 1 geloescht werden kann, ohne dass diese Datei bricht
function brain7b_3(x, y, s, t) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><circle cx="-34" cy="6" r="44" fill="#FF8FB8" stroke="#0B1020" stroke-width="6"/><circle cx="34" cy="6" r="44" fill="#FF8FB8" stroke="#0B1020" stroke-width="6"/><circle cx="0" cy="-26" r="46" fill="#FF8FB8" stroke="#0B1020" stroke-width="6"/><circle cx="0" cy="12" r="40" fill="#FF8FB8"/><path d="M0 -66 V44 M-50 -4 q20 -16 34 4 M20 -18 q18 -14 34 6 M-30 30 q16 -12 26 2" stroke="#0B1020" stroke-width="5" fill="none" stroke-linecap="round"/></g>'; }
function train7b_3(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect x="-90" y="-190" width="180" height="190" rx="34" fill="#FF5A5A" stroke="#0B1020" stroke-width="7"/><rect x="-62" y="-160" width="124" height="66" rx="16" fill="#9BE7FF" stroke="#0B1020" stroke-width="6"/><circle cx="-48" cy="-44" r="18" fill="#FFE14D" stroke="#0B1020" stroke-width="5"/><circle cx="48" cy="-44" r="18" fill="#FFE14D" stroke="#0B1020" stroke-width="5"/><rect x="-70" y="-14" width="140" height="22" rx="8" fill="#2A3350"/></g>'; }
const D7b_3 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3.4;
function p7railsb_3(q, D, t) { const u = cl(q / Math.max(3, D - .1)), H = [220, 1537], F = [500, 905], run = Math.abs(Math.sin(t * 16));
  if (u < .22) { const c = ease(u / .22); return { tr: null, m: { f: [lerp(H[0], F[0], c), lerp(H[1], F[1], c) - 12 * run], s: lerp(1, .5, c), r: -6 } }; }
  if (u < .46) { const c = (u - .22) / .24; return { tr: c > .5 ? [500, 800, .12 + .1 * (c - .5)] : null, m: { f: [F[0], F[1] - (c > .6 ? 20 * Math.abs(Math.sin(t * 20)) : 0)], s: .5, r: c > .6 ? 0 : 8 * Math.sin(t * 5), flip: Math.sin(t * 5) > 0 && c < .6 } }; }
  if (u < .82) { const c = (u - .46) / .36, e = c * c; return { tr: [lerp(500, 500, e), lerp(800, 1118, e), lerp(.17, .95, e)], m: { f: [lerp(F[0], H[0], ease(c)), lerp(F[1], H[1], ease(c)) - 12 * run * (1 - c)], s: lerp(.5, 1, ease(c)), r: 8 + 5 * Math.sin(t * 16), flip: c < .9 } }; }
  const c = (u - .82) / .18; return { tr: [500, 1118, .95], puff: c, m: { f: H, s: 1, r: 5 * Math.sin(t * 24) * (1 - c) } };
}

// ---------- Helfer ----------
function nsky_3(t, o) { o = o || {}; const hz = o.hz || 1100, w = o.warm || 0, dx = o.dx || 0;
  let s = '<defs><linearGradient id="n7s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02030F"/><stop offset=".5" stop-color="' + (o.space ? '#03040F' : '#161C66') + '"/><stop offset=".85" stop-color="' + (o.space ? '#050818' : lc('#2E33A0', '#9A3E96', w)) + '"/><stop offset="1" stop-color="' + (o.space ? '#070B20' : lc('#5C63DC', '#FFA058', w)) + '"/></linearGradient>';
  s += '<radialGradient id="n7g"><stop offset="0" stop-color="#DDE8FF" stop-opacity=".6"/><stop offset=".45" stop-color="#DDE8FF" stop-opacity=".16"/><stop offset="1" stop-color="#DDE8FF" stop-opacity="0"/></radialGradient><radialGradient id="n7w"><stop offset="0" stop-color="#FF9A4D" stop-opacity=".7"/><stop offset=".45" stop-color="#FF9A4D" stop-opacity=".2"/><stop offset="1" stop-color="#FF9A4D" stop-opacity="0"/></radialGradient>';
  s += '<radialGradient id="n7m" cx=".36" cy=".32" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1A1030" stop-opacity=".55"/></radialGradient><linearGradient id="n7gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1433"/><stop offset=".5" stop-color="#040714"/><stop offset="1" stop-color="#02030A"/></linearGradient></defs>';
  s += '<rect width="1080" height="' + (hz + 4) + '" fill="url(#n7s)"/>';
  for (let i = 0; i < 90; i++) { const x = (((rnd(i + 1) * 1080 + dx * (.3 + .7 * rnd(i + 7))) % 1080) + 1080) % 1080, y = rnd(i + 100) * (hz - 30), r = .9 + 2.8 * Math.pow(rnd(i + 200), 2), op = (.35 + .55 * Math.abs(Math.sin(t * (1 + 2 * rnd(i + 300)) + i))) * (1 - .7 * y / hz) * (1 - .5 * w * y / hz);
    s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + r.toFixed(1) + '" fill="' + (i % 7 === 0 ? '#BFD4FF' : i % 11 === 0 ? '#FFE2B8' : '#fff') + '" opacity="' + op.toFixed(2) + '"/>';
    if (i % 18 === 0) s += '<path d="M' + (x - 12) + ' ' + y + ' H' + (x + 12) + ' M' + x + ' ' + (y - 12) + ' V' + (y + 12) + '" stroke="#fff" stroke-width="2" opacity="' + (op * .8).toFixed(2) + '"/>'; }
  const ph = (t + (o.seed || 0)) % 6.5; if (ph < .55) { const c = ph / .55, x = 880 - 460 * c, y = 400 + 190 * c; s += '<path d="M' + x + ' ' + y + ' l150 -62" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="' + (.8 * Math.sin(Math.PI * c)) + '"/>'; }
  if (!o.space) { for (let i = 0; i < 3; i++) { const cx = ((t * 9 * (1 + i * .4) + i * 470) % 1500) - 210, cy = hz - 250 - 120 * i; s += '<g fill="#9FB2FF" opacity=".07"><ellipse cx="' + cx + '" cy="' + cy + '" rx="210" ry="34"/><ellipse cx="' + (cx + 90) + '" cy="' + (cy - 22) + '" rx="130" ry="30"/><ellipse cx="' + (cx - 110) + '" cy="' + (cy + 16) + '" rx="150" ry="24"/></g>'; }
    let d = 'M0 ' + (hz + 4); for (let x = 0; x <= 1080; x += 54) d += ' L' + x + ' ' + (hz - 26 - 44 * Math.abs(Math.sin(x * .004 + 1)) - 16 * Math.sin(x * .013)).toFixed(0); s += '<path d="' + d + ' L1080 ' + (hz + 4) + ' Z" fill="' + lc('#0B1336', '#2A1A40', w) + '"/>'; }
  return s; }
// Stadt als Scherenschnitt mit flackernden Fenstern, Unterkante bei y
function ntown_3(x0, x1, y, sc, t) { let s = '', x = x0, i = 0; const F = '#050919', E = '#1B2A5E';
  while (x < x1) { const w = (54 + 46 * rnd(i + 3)) * sc, hh = (46 + 96 * rnd(i + 13)) * sc, k = i % 5;
    if (k === 2) s += '<rect x="' + (x + w * .42) + '" y="' + (y - hh * .5) + '" width="' + (w * .16) + '" height="' + (hh * .5) + '" fill="' + F + '"/><circle cx="' + (x + w * .5) + '" cy="' + (y - hh * .62) + '" r="' + (w * .44) + '" fill="' + F + '" stroke="' + E + '" stroke-width="2"/>';
    else if (k === 4) s += '<path d="M' + (x + w * .5) + ' ' + (y - hh * 1.25) + ' L' + (x + w * .95) + ' ' + y + ' H' + (x + w * .05) + ' Z" fill="' + F + '" stroke="' + E + '" stroke-width="2"/>';
    else { s += '<rect x="' + x + '" y="' + (y - hh) + '" width="' + w + '" height="' + hh + '" fill="' + F + '" stroke="' + E + '" stroke-width="2"/>'; if (k === 1) s += '<path d="M' + (x - 4) + ' ' + (y - hh) + ' L' + (x + w / 2) + ' ' + (y - hh - w * .45) + ' L' + (x + w + 4) + ' ' + (y - hh) + ' Z" fill="' + F + '" stroke="' + E + '" stroke-width="2"/>'; if (k === 3) s += '<path d="M' + (x + w * .5) + ' ' + (y - hh) + ' v' + (-34 * sc) + '" stroke="' + E + '" stroke-width="3"/>';
      for (let r = 0; r < Math.floor(hh / (30 * sc)); r++) for (let c = 0; c < 2; c++) { const on = rnd(i * 7 + r * 3 + c) > .45; if (on) s += '<rect x="' + (x + w * (.18 + .44 * c)) + '" y="' + (y - hh + (10 + 30 * r) * sc) + '" width="' + (w * .2) + '" height="' + (14 * sc) + '" fill="#FFD27A" opacity="' + (.55 + .35 * Math.sin(t * (1 + rnd(i + r + c)) + i * 3 + r)) + '"/>'; } }
    x += w + 6 * sc; i++; }
  return s; }
// Boden mit Mittelhuegel, Vordergrund-Huegel (Schalti steht bei x=220 darauf), Gras und Gluehwuermchen
function nground_3(t, hz, rf) { hz = hz || 1100; let s = '<defs><linearGradient id="n7l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16286A"/><stop offset="1" stop-color="#060B26"/></linearGradient></defs><rect y="' + hz + '" width="1080" height="' + (1920 - hz) + '" fill="url(#n7gr)"/><rect y="' + hz + '" width="1080" height="340" fill="url(#n7l)"/>';
  for (let i = 0; i < 16; i++) { const x = 30 + 1020 * rnd(i + 600), l = 40 + 90 * rnd(i + 620); s += '<rect x="' + x + '" y="' + (hz + 6) + '" width="5" height="' + l + '" rx="2" fill="#FFD27A" opacity="' + (.1 + .12 * Math.abs(Math.sin(t * 1.5 + i))) + '"/>'; }
  for (let i = 0; i < 9; i++) { const y = hz + 40 + i * 32, x = ((t * (14 + 5 * (i % 3)) + i * 260) % 1400) - 160; s += '<rect x="' + x + '" y="' + y + '" width="' + (90 + 60 * rnd(i + 640)) + '" height="3" rx="1.5" fill="#9FB2FF" opacity=".13"/>'; }
  if (rf && rf.op !== 0) for (let i = 0; i < 15; i++) { const y = hz + 12 + i * 21, w = rf.r * 1.7 * (1 - i / 19) * (.75 + .25 * Math.sin(t * 2.6 + i * 1.7)); s += '<rect x="' + (rf.x - w / 2 + 9 * Math.sin(t * 1.8 + i)) + '" y="' + y + '" width="' + w + '" height="9" rx="4.5" fill="' + lc('#F3F0E2', '#FFB25A', rf.w || 0) + '" opacity="' + ((rf.op === undefined ? 1 : rf.op) * .5 * (1 - i / 16)) + '"/>'; }
  s += '<path d="M0 ' + (hz + 330) + ' Q300 ' + (hz + 285) + ' 640 ' + (hz + 345) + ' T1080 ' + (hz + 310) + ' V1920 H0 Z" fill="#070D28" stroke="#162457" stroke-width="3"/>';
  s += '<path d="M0 1556 Q250 1510 560 1612 T1080 1700 V1920 H0 Z" fill="#050A20" stroke="#2A4190" stroke-width="5"/>';
  for (let i = 0; i < 27; i++) { const x = 6 + i * 21, u = x / 560, y = (1 - u) * (1 - u) * 1556 + 2 * u * (1 - u) * 1510 + u * u * 1612, sw = 7 * Math.sin(t * 2 + i * .7), hh = 22 + 22 * rnd(i + 70); s += '<path d="M' + x + ' ' + (y + 3) + ' q' + sw + ' ' + (-hh * .6) + ' ' + (sw * 2) + ' ' + (-hh) + '" stroke="#1E3A7A" stroke-width="4" fill="none" stroke-linecap="round"/>'; }
  for (let i = 0; i < 6; i++) { const x = 430 + 600 * rnd(i + 80) + 26 * Math.sin(t * .7 + i * 2), y = 1380 + 300 * rnd(i + 90) + 18 * Math.cos(t * .9 + i), op = Math.max(0, Math.sin(t * 1.6 + i * 1.9)); s += '<circle cx="' + x + '" cy="' + y + '" r="16" fill="#FFE98A" opacity="' + (.2 * op) + '"/><circle cx="' + x + '" cy="' + y + '" r="5" fill="#FFF3B8" opacity="' + (.9 * op) + '"/>'; }
  return s; }
// Mond mit Schein, Meeren, Kratern und Schattierung. w = 0 kuehl-weiss, 1 warm-orange. ng = ohne Schein
function lun_3(x, y, r, w, rot, op, ng) { if (r <= 0) return ''; w = cl(w || 0);
  let s = '<g transform="translate(' + x + ' ' + y + ')" opacity="' + (op === undefined ? 1 : op) + '">';
  if (!ng) s += '<circle r="' + (r * 2.4) + '" fill="url(#n7g)" opacity="' + (1 - w) + '"/><circle r="' + (r * 2.4) + '" fill="url(#n7w)" opacity="' + w + '"/>';
  s += '<circle r="' + r + '" fill="' + lc('#F3F0E2', '#FFB25A', w) + '"/><g transform="rotate(' + (rot || 0) + ') scale(' + r + ')" fill="#2A2440" opacity=".17"><ellipse cx="-.3" cy="-.25" rx=".28" ry=".22"/><ellipse cx=".2" cy="-.4" rx=".2" ry=".13"/><ellipse cx=".3" cy=".22" rx=".3" ry=".24"/><ellipse cx="-.27" cy=".38" rx=".2" ry=".14"/><ellipse cx="-.02" cy=".02" rx=".13" ry=".1"/></g>';
  s += '<g transform="rotate(' + (rot || 0) + ') scale(' + r + ')" fill="none" stroke="#fff" stroke-width=".02" opacity=".3"><circle cx=".55" cy="-.1" r=".07"/><circle cx="-.6" cy=".1" r=".05"/><circle cx=".05" cy=".62" r=".08"/><circle cx="-.1" cy="-.62" r=".05"/><circle cx=".5" cy=".58" r=".04"/></g><circle r="' + r + '" fill="url(#n7m)"/></g>';
  return s; }
function nbirds_3(t, x, y, n, sc) { let s = ''; for (let i = 0; i < n; i++) { const fl = Math.sin(t * 9 + i * 1.3), bx = x + i * 50 * sc + 10 * Math.sin(i * 5), by = y + (i % 2 ? 30 : 0) * sc + 12 * Math.sin(i * 3); s += '<path transform="translate(' + bx + ' ' + by + ') scale(' + sc + ')" d="M-16 0 q8 ' + (-12 * fl - 5) + ' 16 0 q8 ' + (-12 * fl - 5) + ' 16 0" stroke="#050919" stroke-width="5" fill="none" stroke-linecap="round"/>'; } return s; }
const nshade_3 = () => '<defs><linearGradient id="n7t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02030F" stop-opacity=".92"/><stop offset="1" stop-color="#02030F" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="600" fill="url(#n7t)"/>';
const NSLOT_3 = (ev, l) => slot(ev, l);

// ---------- Einstieg: Der Riesenmond steigt hinter der Stadt auf, loest sich und kegelt Schalti um ----------
WORLD.h7m7_3 = function (sc, ev, t, lt) {
  const e = ev.roll, end = sc.lines[4] ? sc.lines[4].start - sc.start : 8, k = cl(lt / end), on = e !== undefined && e >= .12, sh = shake7(e !== undefined && e > .5 ? e - .5 : undefined, t);
  const rise = ease(cl(lt / 3)), w = on ? 1 - .8 * cl((e - .12) / 1.2) : .25 + .75 * rise;
  let s = nsky_3(t, { warm: w });
  if (!on) s += lun_3(600, lerp(1340, 870, rise), 235 * (1 + .12 * k + .015 * Math.sin(t * 3)), 1, -6 + 12 * k) + nbirds_3(t, 1150 - ((t * 110) % 1500), 800, 5, 1);
  s += ntown_3(-20, 1100, 1106, 1.35, t) + nground_3(t, 1100, on ? null : { x: 600, r: 235, w: 1, op: rise });
  if (on) { const g = m7roll_3(e); s += lun_3(g.x, g.y, g.r, 1, g.rot); }
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + nshade_3());
};
// Gag: Der Mond faellt auf die Wiese, rollt Schalti hinterher, der rennt weg, wird bei e = 1 eingeholt, sitzt benommen da und laeuft zurueck
function m7roll_3(e) { if (e < .5) { const c = (e - .12) / .38; return { x: lerp(600, 300, c), y: lerp(870, 1385, c * c), r: lerp(262, 170, c), rot: -120 * c }; }
  const c = cl((e - .5) / 1.4); return { x: lerp(300, 1420, c), y: 1385 - 24 * Math.abs(Math.sin(c * Math.PI * 4)), r: 170, rot: -120 + 620 * c }; }
const HOME7_3 = [220, 1537];
// Schalti rennt vor dem Mond rechts aus dem Bild und kommt links wieder herein
WMASC.h7m7_3 = (ev, t, lt) => { const e = ev.roll, run = Math.abs(Math.sin(t * 17));
  if (e === undefined) return { f: HOME7_3, s: 1, r: -5 + 2 * Math.sin(t * 3), nospin: 1 };
  if (e < .12) return { f: HOME7_3, s: 1, r: -12, nospin: 1 };
  if (e < 1.15) { const c = (e - .12) / 1.03; return { f: [lerp(220, 1300, c), 1537 - 14 * run], s: 1, r: 10, nospin: 1 }; }
  if (e < 2.1) return { f: [-400, 1537], s: 1, nospin: 1 };
  const c = ease(cl((e - 2.1) / .9)); return { f: [lerp(-200, 220, c), 1537 - 12 * run * (c < 1 ? 1 : 0)], s: 1, r: c < 1 ? 8 : 4 * Math.sin(t * 9) * (1 - cl((e - 2.9) / .5)), nospin: 1 };
};

// ---------- Teil 1: Zeitraffer vom Horizont nach oben, zwei Fotos im Vergleich, Gedankenblase ----------
WORLD.m7gleich_3 = function (sc, ev, t, lt) {
  const fo = ev.foto, na = ev.nah, a = ev.act, L = [300, 955], Hi = [740, 770], R = 78, u = ease(cl((lt - 2.3) / 1.9));
  const px = c => lerp(L[0], Hi[0], c), py = c => lerp(L[1], Hi[1], c) - 70 * Math.sin(Math.PI * c), dim = fo !== undefined ? .3 : 1;
  let s = nsky_3(t, { warm: .9 * (1 - .75 * u), dx: -70 * u }), h = '';
  for (let i = 1; i < 9; i++) { const c = i / 9; if (c < u) s += lun_3(px(c), py(c), R, 1 - c, 0, .17 * dim, 1); }
  s += lun_3(L[0], L[1], R * back(cl((lt - .3) / .4)), 1, 0, a !== undefined ? 1 : (u > 0 ? lerp(1, .55, u) : 1) * dim);
  if (u > 0) s += lun_3(px(u), py(u), R, 1 - u, 0, dim);
  if (lt > 1 && u < .05) s += '<circle cx="' + L[0] + '" cy="' + L[1] + '" r="' + (R * (1.55 + .08 * Math.sin(t * 4))) + '" fill="none" stroke="#FFC27A" stroke-width="6" stroke-dasharray="14 12" opacity="' + cl((lt - 1) / .3) + '"/>' + chip3(L[0] + 215, L[1] - 150, 'gefühlt riesig', 34, '#FFC27A', '#0B1020', (lt - 1.2) / .3);
  s += ntown_3(-20, 620, 1106, .8, t) + nground_3(t, 1100, { x: L[0], r: R, w: 1, op: (u > 0 ? lerp(1, .55, u) : 1) * dim });
  if (fo !== undefined && a === undefined) { const bk = cl(fo / .25) * (1 - cl((fo - .9) / .3)), p = ease(cl((fo - .5) / .6)), T = [[325, 915], [705, 915]];
    if (bk > 0) [L, Hi].forEach(m => { const q = R + 34; s += '<path d="M' + (m[0] - q) + ' ' + (m[1] - q + 30) + ' v-30 h30 M' + (m[0] + q - 30) + ' ' + (m[1] - q) + ' h30 v30 M' + (m[0] + q) + ' ' + (m[1] + q - 30) + ' v30 h-30 M' + (m[0] - q + 30) + ' ' + (m[1] + q) + ' h-30 v-30" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + bk + '"/>'; });
    if (fo < .2) s += '<rect width="1080" height="1920" fill="#fff" opacity="' + (.7 * (1 - fo / .2)) + '"/>';
    [L, Hi].forEach((m, j) => { s += '<g opacity="' + cl((fo - .5) / .2) + '" transform="translate(' + lerp(m[0], T[j][0], p) + ' ' + lerp(m[1], T[j][1], p) + ') rotate(' + ((j ? 5 : -6) * p + 2 * Math.sin(t * 2 + j)) + ') scale(' + lerp(.4, 1, p) + ')"><rect x="-140" y="-165" width="280" height="330" rx="12" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/><rect x="-118" y="-143" width="236" height="236" fill="' + (j ? '#0A1238' : '#3A2450') + '"/>' + lun_3(0, -30, 66, j ? 0 : 1, 0, 1, 1);
      if (fo > 1.4) s += '<path d="M-66 62 H66 M-66 46 v32 M66 46 v32" stroke="#3DFF7A" stroke-width="8" stroke-linecap="round" opacity="' + cl((fo - 1.4) / .3) + '"/>';
      s += svgT(0, 142, j ? 'hoch oben' : 'Horizont', 36, '#0B1020') + '</g>'; });
    s += chip3(300, 1104, 'gleich breit ✓', 36, '#3DFF7A', '#0B1020', (fo - 1.7) / .3);
    if (na !== undefined) s += chip3(725, 1104, 'gleich weit weg ✓', 34, '#F4F6FB', '#0B1020', (na - .5) / .3); }
  if (a !== undefined) { const k = back(cl(a / .45)), g = 1.75 - .45 * (.5 + .5 * Math.sin(t * 2.2));
    s += '<circle cx="' + L[0] + '" cy="' + L[1] + '" r="' + (R * g) + '" fill="#FFB25A" opacity="' + (.22 * cl(a / .4)) + '"/><circle cx="' + L[0] + '" cy="' + L[1] + '" r="' + (R * g) + '" fill="none" stroke="#FFC27A" stroke-width="6" stroke-dasharray="14 12" opacity="' + cl(a / .4) + '"/>' + chip3(L[0], L[1] - 190, 'gefühlt', 36, '#FFC27A', '#0B1020', (a - .3) / .3) + chip3(L[0] + 190, L[1] + 40, 'echt', 36, '#3DFF7A', '#0B1020', (a - .6) / .3);
    s += brain7b_3(730, 900, 1.5 * k * (1 + .04 * Math.sin(t * 8)), t) + '<g opacity="' + cl((a - .5) / .3) + '">' + svgT(880, 850, '!', 130, '#FFD23F') + '</g>'; }
  h += NSLOT_3(ev, [['panel', 'Unten nicht größer als oben'], ['foto', 'Fotos: beide Male gleich breit', 'hot'], ['nah', 'Näher ist er dort auch nicht'], ['act', 'Die Täuschung entsteht im Kopf', 'hot']]);
  return W(s + nshade_3(), h);
};
WMASC.m7gleich_3 = () => ({ f: HOME7_3, s: 1, nospin: 1 });

// ---------- Teil 2: Baum wandert in die Ferne und bleibt im Bild gleich gross, Mond hinter der Stadt, Schienen, Blick aus dem All ----------
WORLD.m7hirn_3 = function (sc, ev, t, lt) {
  let s = '', h = ''; const ha = ev.haus, po = ev.ponzo, a = ev.act;
  if (ha === undefined && po === undefined && a === undefined) { const HZ = 860, VX = 520, u = ease(cl((lt - 1.5) / 2.2));
    s += nsky_3(t, { hz: HZ }) + '<rect y="' + HZ + '" width="1080" height="1060" fill="url(#n7gr)"/><path d="M250 1140 L' + VX + ' ' + HZ + ' L790 1140 Z" fill="#141C3E"/>';
    for (let i = 0; i < 6; i++) { const y0 = HZ + 280 / (1 + i * .9), y1 = HZ + 280 / (1.45 + i * .9); s += '<path d="M' + VX + ' ' + y0 + ' V' + y1 + '" stroke="#C9CFDD" stroke-width="' + (9 * (y0 - HZ) / 280 + 1) + '"/>'; }
    for (let i = 5; i >= 0; i--) { const y = HZ + 270 / (1 + i * 1.1), q = (y - HZ) / 270; [-1, 1].forEach(d => { const x = VX + d * 300 * q; s += '<path d="M' + x + ' ' + y + ' v' + (-210 * q) + ' q0 ' + (-26 * q) + ' ' + (-d * 34 * q) + ' ' + (-26 * q) + '" stroke="#2A3A6A" stroke-width="' + (9 * q + 1) + '" fill="none"/><circle cx="' + (x - d * 34 * q) + '" cy="' + (y - 232 * q) + '" r="' + (62 * q) + '" fill="#FFE9A8" opacity="' + (.16 + .05 * Math.sin(t * 3 + i)) + '"/><circle cx="' + (x - d * 34 * q) + '" cy="' + (y - 232 * q) + '" r="' + (15 * q + 1) + '" fill="#FFE9A8"/>'; }); }
    s += '<path d="M610 ' + HZ + ' v-20 l16 -14 l16 14 v20 Z" fill="#050919" stroke="#1B2A5E" stroke-width="2"/><rect x="620" y="' + (HZ - 14) + '" width="7" height="7" fill="#FFD27A"/>';
    const bx = lerp(900, 690, u), by = lerp(1128, HZ + 6, u), q = (by - HZ) / 270, tree = (k, dash) => '<g transform="translate(' + bx + ' ' + by + ') scale(' + k + ')"><rect x="-9" y="-60" width="18" height="60" fill="' + (dash ? 'none' : '#6B4A2A') + '" stroke="' + (dash ? '#fff' : '#0B1020') + '" stroke-width="' + (dash ? 4 / k : 5) + '"' + (dash ? ' stroke-dasharray="' + (8 / k) + ' ' + (8 / k) + '"' : '') + '/><circle cx="0" cy="-98" r="46" fill="' + (dash ? 'none' : '#2FCB73') + '" stroke="' + (dash ? '#fff' : '#0B1020') + '" stroke-width="' + (dash ? 4 / k : 6) + '"' + (dash ? ' stroke-dasharray="' + (8 / k) + ' ' + (8 / k) + '"' : '') + '/></g>';
    const kt = back(cl((lt - .4) / .4)); s += tree(kt, 0); if (u > .15) s += '<g opacity="' + cl((u - .15) / .3) + '">' + tree(Math.max(.08, q), 1) + '</g>';
    s += chip3(300, 985, 'nah: normal', 34, '#3DFF7A', '#0B1020', (lt - .8) / .3 * (u < .2 ? 1 : 0)) + chip3(540, 1100, 'fern + gleich groß im Bild = wirkt riesig', 34, '#FFB45C', '#0B1020', (u - .85) / .15 * 1.2);
  } else if (po === undefined && a === undefined) { const k = ease(cl(ha / 2.5));
    s += nsky_3(t, { warm: .85 }) + lun_3(540, lerp(1030, 925, k), 190, 1, -4 + 6 * k) + nbirds_3(t, 1150 - ((ha * 150) % 1500), 860, 4, .9) + ntown_3(-20, 1100, 1106, 1.5, t) + nground_3(t, 1100, { x: 540, r: 190, w: 1 });
    s += '<g opacity="' + cl((ha - 1) / .3) + '"><path d="M790 1100 V880 M770 900 l20 -22 l20 22 M770 1080 l20 22 l20 -22" stroke="#3DFF7A" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>' + chip3(800, 800, 'Vergleich', 36, '#3DFF7A', '#0B1020', (ha - 1.2) / .3);
  } else if (a === undefined) { const k = cl(po / .4), VX = 500, VY = 760;
    s += nsky_3(t, { hz: VY }) + '<rect y="' + VY + '" width="1080" height="1160" fill="url(#n7gr)"/><g opacity="' + k + '"><path d="M230 1125 L' + VX + ' ' + VY + ' L770 1125" stroke="#C9CFDD" stroke-width="10" fill="none" stroke-linejoin="round"/>'; for (let i = 0; i < 9; i++) { const c = Math.pow(i / 9, 1.6), y = lerp(1110, VY + 14, c), hw = 270 * (y - VY) / 365; s += '<path d="M' + (VX - hw * 1.12) + ' ' + y + ' H' + (VX + hw * 1.12) + '" stroke="#5A4634" stroke-width="' + (16 - 12 * c) + '"/>'; }
    s += '<path d="M230 1125 L' + VX + ' ' + VY + ' L770 1125" stroke="#C9CFDD" stroke-width="10" fill="none" stroke-linejoin="round"/><rect x="390" y="832" width="220" height="24" rx="8" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/><rect x="390" y="1040" width="220" height="24" rx="8" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/></g>';
    if (po > 1) s += '<g opacity="' + cl((po - 1) / .3) + '"><path d="M390 870 V1026 M610 870 V1026" stroke="#3DFF7A" stroke-width="5" stroke-dasharray="10 10"/></g>' + chip3(820, 940, 'gleich lang', 34, '#3DFF7A', '#0B1020', (po - 1.1) / .3);
    const g = p7railsb_3(po, D7b_3(sc, 2), t); if (g.tr) s += '<circle cx="' + g.tr[0] + '" cy="' + (g.tr[1] - 60 * g.tr[2]) + '" r="' + (330 * g.tr[2]) + '" fill="#FFE9A8" opacity=".14"/>' + train7b_3(g.tr[0], g.tr[1], g.tr[2]); if (g.puff !== undefined) for (let i = 0; i < 3; i++) s += '<circle cx="' + (440 + 60 * i) + '" cy="' + (900 - 60 * g.puff - 14 * i) + '" r="' + (22 + 14 * g.puff) + '" fill="#fff" opacity="' + (.6 * (1 - g.puff)) + '"/>';
  } else { const k = cl(a / .4), ox = 8 * Math.sin(t * 1.3), oy = 6 * Math.cos(t * 1.1);
    s += nsky_3(t, { hz: 1920, space: 1, dx: t * 6 }) + '<g opacity="' + k + '"><defs><radialGradient id="n7e" cx=".5" cy="0" r=".5"><stop offset="0" stop-color="#3D8BFF"/><stop offset=".25" stop-color="#1B4FB0"/><stop offset=".6" stop-color="#0A1E55"/></radialGradient></defs>';
    s += lun_3(850, lerp(880, 790, ease(cl(a / 2.5))), 66, 0) + '<circle cx="540" cy="2520" r="1530" fill="#7FD3FF" opacity=".12"/><circle cx="540" cy="2520" r="1500" fill="url(#n7e)" stroke="#9BE7FF" stroke-width="10"/><path d="M230 1080 q70 -34 150 -16 q46 28 -14 46 q-80 14 -136 -30 Z" fill="#2FAE66" opacity=".85"/>';
    for (let i = 0; i < 12; i++) s += '<circle cx="' + (250 + 560 * rnd(i + 500)) + '" cy="' + (1070 + 50 * rnd(i + 520)) + '" r="3" fill="#FFE9A8" opacity="' + (.5 + .4 * Math.sin(t * 2 + i)) + '"/>';
    s += '<g transform="translate(' + (345 + ox) + ' ' + (880 + oy) + ')"><rect x="-330" y="-34" width="80" height="68" fill="#3B6BD6" stroke="#0B1020" stroke-width="6"/><rect x="250" y="-34" width="80" height="68" fill="#3B6BD6" stroke="#0B1020" stroke-width="6"/><path d="M-303 -34 v68 M-277 -34 v68 M277 -34 v68 M303 -34 v68" stroke="#0B1020" stroke-width="3"/><rect x="-250" y="-140" width="500" height="280" rx="120" fill="#E8ECF5" stroke="#0B1020" stroke-width="8"/><rect x="-150" y="-104" width="300" height="208" rx="60" fill="#1E3A8A" stroke="#0B1020" stroke-width="8"/><rect x="-150" y="-104" width="300" height="208" rx="60" fill="none" stroke="#9BE7FF" stroke-width="4" opacity=".7"/><path d="M-120 -70 l60 -20 M-126 -40 l34 -12" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/><circle cx="-205" cy="-60" r="10" fill="#FF5A5A" opacity="' + (.4 + .6 * Math.abs(Math.sin(t * 3))) + '"/><circle cx="205" cy="60" r="10" fill="#3DFF7A"/><path d="M0 -140 v-46" stroke="#0B1020" stroke-width="7"/><circle cx="0" cy="-192" r="12" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/></g>';
    s += '<circle cx="850" cy="' + lerp(880, 790, ease(cl(a / 2.5))) + '" r="' + (100 + 6 * Math.sin(t * 4)) + '" fill="none" stroke="#FFC27A" stroke-width="6" stroke-dasharray="14 12" opacity="' + cl((a - 1.2) / .4) + '"/></g>' + chip3(720, 1085, 'auch hier: gefühlt größer', 32, '#FFC27A', '#0B1020', (a - 1.5) / .3); }
  h += NSLOT_3(ev, [['schatz', 'Das Gehirn rechnet mit Entfernung'], ['haus', 'Häuser und Bäume als Vergleich'], ['ponzo', 'Beide Balken sind gleich lang', 'hot'], ['act', 'Nicht ganz geklärt: auch im All', 'hot']]);
  return W(s + nshade_3(), h);
};
WMASC.m7hirn_3 = (ev, t, lt, sc) => { const po = ev.ponzo, a = ev.act;
  if (a !== undefined) { const k = ease(cl(a / .5)), ox = 8 * Math.sin(t * 1.3), oy = 6 * Math.cos(t * 1.1); return { f: [lerp(220, 345 + ox, k), lerp(1537, 965 + oy, k)], s: lerp(1, .62, k), r: 6 * Math.sin(t * 2.4) * k, nospin: 1 }; } // schaut aus dem Fenster der Raumstation
  if (po !== undefined) return Object.assign({ nospin: 1 }, p7railsb_3(po, D7b_3(sc, 2), t).m);
  return { f: HOME7_3, s: 1, nospin: 1 }; };

// ---------- Teil 3: Fingernagel-Test, Blick durch die Papierrolle, Farbe, Weg des Lichts durch die Luft ----------
WORLD.m7test_3 = function (sc, ev, t, lt) {
  let s = '', h = ''; const ro = ev.rolle, fa = ev.farbe, a = ev.act;
  if (ro === undefined && fa === undefined && a === undefined) { const k = ease(cl((lt - .3) / .7)), fy = lerp(1330, 806, k);
    s += nsky_3(t, { warm: .5 }) + lun_3(610, 838, 40, .8) + ntown_3(-20, 1100, 1106, 1.1, t) + nground_3(t, 1100, { x: 610, r: 40, w: .8 });
    s += '<rect x="430" y="' + fy + '" width="96" height="560" rx="48" fill="#FFD23F" stroke="#0B1020" stroke-width="7"/><rect x="443" y="' + (fy + 12) + '" width="70" height="68" rx="26" fill="#FFF1B8" stroke="#0B1020" stroke-width="5"/><path d="M452 ' + (fy + 150) + ' q26 12 52 0 M452 ' + (fy + 172) + ' q26 12 52 0" stroke="#0B1020" stroke-width="4" fill="none" opacity=".5"/>';
    if (lt > 1.6) s += '<g opacity="' + cl((lt - 1.6) / .3) + '"><path d="M443 ' + (fy - 20) + ' H513 M443 ' + (fy - 34) + ' v28 M513 ' + (fy - 34) + ' v28 M572 ' + (fy - 20) + ' H648 M572 ' + (fy - 34) + ' v28 M648 ' + (fy - 34) + ' v28" stroke="#3DFF7A" stroke-width="7" stroke-linecap="round"/></g>' + chip3(790, 838, 'gleich groß', 36, '#3DFF7A', '#0B1020', (lt - 1.9) / .3);
  } else if (fa === undefined && a === undefined) { const k = cl(ro / .5), sh = ease(cl((ro - .8) / .8)), IR = lerp(2300, 215, ease(k) * .55 + sh * .45);
    s += nsky_3(t, { warm: .6 }) + lun_3(540, 905, lerp(128, 46, sh), .8) + ntown_3(-20, 1100, 1106, 1.1, t) + nground_3(t, 1100, { x: 540, r: 60, w: .8 });
    s += '<path fill-rule="evenodd" d="M-100 -100 H1180 V2020 H-100 Z M' + (540 - IR) + ' 905 a' + IR + ' ' + IR + ' 0 1 0 ' + (2 * IR) + ' 0 a' + IR + ' ' + IR + ' 0 1 0 ' + (-2 * IR) + ' 0 Z" fill="#02030A"/><circle cx="540" cy="905" r="' + (IR + 14) + '" fill="none" stroke="#D9C7A0" stroke-width="30"/><circle cx="540" cy="905" r="' + (IR + 30) + '" fill="none" stroke="#0B1020" stroke-width="5"/><circle cx="540" cy="905" r="' + IR + '" fill="none" stroke="#0B1020" stroke-width="5"/>';
    s += chip3(540, 1096, 'ohne Vergleich: klein', 34, '#3DFF7A', '#0B1020', (ro - 1.7) / .3);
  } else if (a === undefined) { const k = cl(fa / .4);
    s += nsky_3(t, { warm: 1 }) + lun_3(290, 985, 88 * back(k), 1) + lun_3(740, 775, 88 * back(cl((fa - .3) / .4)), 0) + ntown_3(-20, 1100, 1106, .9, t) + nground_3(t, 1100, { x: 290, r: 88, w: 1 }) + chip3(290, 850, 'tief: orange', 34, '#FFB45C', '#0B1020', (fa - .6) / .3) + chip3(740, 915, 'hoch: weiß', 34, '#F4F6FB', '#0B1020', (fa - .9) / .3);
  } else { const k = cl(a / .4);
    s += nsky_3(t, { hz: 1920, space: 1 }) + '<g opacity="' + k + '"><defs><linearGradient id="n7r" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="540" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#FF8A3D"/></linearGradient></defs>';
    s += '<circle cx="540" cy="2330" r="1395" fill="#5CA8FF" opacity=".28"/><circle cx="540" cy="2330" r="1395" fill="none" stroke="#9BD0FF" stroke-width="3" stroke-dasharray="10 14" opacity=".7"/><circle cx="540" cy="2330" r="1280" fill="#0E2A66" stroke="#2F6BD6" stroke-width="8"/>';
    s += lun_3(540, 730, 42, 0) + lun_3(104, 978, 46, 1) + '<path d="M540 778 V1036" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-dasharray="2 18" stroke-dashoffset="' + (-t * 60) + '"/><path d="M152 984 L522 1040" stroke="url(#n7r)" stroke-width="10" stroke-linecap="round"/>';
    for (let i = 0; i < 8; i++) { const c = (t * .55 + i / 8) % 1, f = (i + .5) / 8, d = i % 2 ? 1 : -1; s += '<circle cx="' + (lerp(170, 510, f) + 24 * c) + '" cy="' + (lerp(988, 1038, f) + d * 95 * c) + '" r="10" fill="#5C9BFF" opacity="' + (1 - c) + '"/>'; }
    s += '<path d="M522 1052 v-22 l18 -16 l18 16 v22 Z" fill="#F4F6FB" stroke="#0B1020" stroke-width="4"/></g>' + chip3(730, 880, 'kurzer Weg', 34, '#F4F6FB', '#0B1020', (a - .5) / .3) + chip3(270, 860, 'langer Weg', 34, '#FFB45C', '#0B1020', (a - .9) / .3); }
  h += NSLOT_3(ev, [['finger', 'Arm strecken: Mond = Fingernagel'], ['rolle', 'Papierrolle: er schrumpft sofort', 'hot'], ['farbe', 'Echt ist nur die Farbe'], ['act', 'Luft streut blaues Licht weg', 'hot']]);
  return W(s + nshade_3(), h);
};
WMASC.m7test_3 = (ev, t) => ({ f: HOME7_3, s: 1, r: ev.rolle !== undefined && ev.farbe === undefined ? -8 : 0, prop: ev.rolle !== undefined && ev.farbe === undefined ? '🧻' : '', nospin: 1 });

// ---------- Schluss ----------
WORLD.m7outro_3 = function (sc, ev, t) { return W(nsky_3(t, { warm: .15, seed: 3 }) + lun_3(800, 960 + 8 * Math.sin(t * .8), 104, .1) + ntown_3(-20, 1100, 1106, 1, t) + nground_3(t, 1100, { x: 800, r: 104, w: .1 }) + nshade_3()); };

// ---------- Version 3.0: mehr Aktionen von Schalti ----------
// Teil 1: Schalti springt auf den Mond und reitet im Zeitraffer mit nach oben
WMASC.m7gleich_3 = (ev, t, lt) => { const H = [220, 1537], L = [300, 955], Hi = [740, 770], R = 78;
  if (ev.foto !== undefined || lt < 1.5) return { f: H, s: 1, nospin: 1 };
  const u = ease(cl((lt - 2.3) / 1.9)), top = c => [lerp(L[0], Hi[0], c), lerp(L[1], Hi[1], c) - 70 * Math.sin(Math.PI * c) + 55];
  if (lt < 2.2) { const k = cl((lt - 1.5) / .6), p = top(0); return { f: [lerp(H[0], p[0], k), lerp(H[1], p[1], k) - 160 * Math.sin(Math.PI * k)], s: lerp(1, .5, k), nospin: 1 }; }
  if (lt < 4.25) { const p = top(u); return { f: p, s: .5, r: 6 * Math.sin(t * 5), nospin: 1 }; }
  const k = ease(cl((lt - 4.25) / .5)), p = top(1); return { f: [lerp(p[0], H[0], k), lerp(p[1], H[1], k) - 120 * Math.sin(Math.PI * k)], s: lerp(.5, 1, k), nospin: 1 }; };
// Teil 2: Schalti laeuft neben dem Baum die Strasse entlang in die Ferne und wird dabei klein, der Baum nicht
(() => { const prev = WMASC.m7hirn_3; WMASC.m7hirn_3 = (ev, t, lt, sc) => { if (ev.haus !== undefined || ev.ponzo !== undefined || ev.act !== undefined) return prev(ev, t, lt, sc);
  const H = [220, 1537], HZ = 860, u = ease(cl((lt - 1.5) / 2.2)), bx = lerp(900, 690, u), by = lerp(1128, HZ + 6, u), q = cl((by - HZ) / 270), P = [bx - 170 * q - 16, by], run = Math.abs(Math.sin(t * 15));
  if (lt < .9) return { f: H, s: 1, nospin: 1 };
  if (lt < 1.4) { const k = (lt - .9) / .5; return { f: [lerp(H[0], P[0], k), lerp(H[1], P[1], k) - 120 * Math.sin(Math.PI * k)], s: lerp(1, .62, k), nospin: 1 }; }
  if (lt < 3.75) return { f: [P[0], P[1] - 10 * run * q], s: Math.max(.09, .62 * q), r: -4, flip: true, nospin: 1 };
  const k = ease(cl((lt - 3.75) / .35)); return { f: [lerp(P[0], H[0], k), lerp(P[1], H[1], k) - 100 * Math.sin(Math.PI * k)], s: lerp(Math.max(.09, .62 * q), 1, k), nospin: 1 }; }; })();

// ---------- Version 3.0: Kamera und Farbstimmung um jede Welt ----------
['h7m7_3','m7gleich_3','m7hirn_3','m7outro_3','m7test_3'].forEach(n => { const inner = WORLD[n]; if (inner) WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#5CE1FF'); });
