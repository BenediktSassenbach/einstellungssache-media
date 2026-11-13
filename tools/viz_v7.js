// v7: Einstieg als Show-Opener. Gleiche Buehne fuer alle Physik-Videos: drehender Strahlenkranz in Serienfarbe,
// Rasterpunkte, dunkler Rand, Objekt springt mit Schwung rein, Gag mit Bildwackeln und Comic-Wort.
function rays7(cx, cy, t, k, col, op) { let s = '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + (t * 9) + ') scale(' + k + ')">';
  for (let i = 0; i < 18; i++) { const a0 = i * Math.PI / 9, a1 = a0 + Math.PI / 18; s += '<path d="M0 0 L' + (1500 * Math.cos(a0)) + ' ' + (1500 * Math.sin(a0)) + ' L' + (1500 * Math.cos(a1)) + ' ' + (1500 * Math.sin(a1)) + ' Z" fill="' + col + '" opacity="' + op + '"/>'; }
  return s + '</g>'; }
function stage7(t, lt, base, col, cx, cy) { const k = back(cl(lt / .55));
  let s = '<rect width="1080" height="1920" fill="' + base + '"/>' + rays7(cx, cy, t, k, col, .22);
  s += '<defs><radialGradient id="gl7" cx="' + (cx / 1080) + '" cy="' + (cy / 1920) + '" r=".35"><stop offset="0" stop-color="' + col + '" stop-opacity=".55"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></radialGradient>';
  s += '<pattern id="ht7" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="3.5" fill="#fff" opacity=".09"/></pattern>';
  s += '<radialGradient id="vg7" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></radialGradient></defs>';
  s += '<rect width="1080" height="1920" fill="url(#gl7)"/><rect width="1080" height="1920" fill="url(#ht7)"/>';
  if (lt < .6) for (let i = 0; i < 14; i++) { const a = i * .449 + .2, c = lt / .6, r0 = 900 - 500 * c; s += '<line x1="' + (cx + r0 * Math.cos(a)) + '" y1="' + (cy + r0 * Math.sin(a)) + '" x2="' + (cx + (r0 + 220) * Math.cos(a)) + '" y2="' + (cy + (r0 + 220) * Math.sin(a)) + '" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="' + (.7 * (1 - c)) + '"/>'; }
  return s; }
const vign7 = () => '<rect width="1080" height="1920" fill="url(#vg7)"/>';
function pop7(cx, cy, lt, inner) { const k = back(cl((lt - .1) / .5)), f = 6 * Math.sin(lt * 2.2); return '<g transform="translate(' + cx + ' ' + (cy + f) + ') scale(' + k + ') translate(' + (-cx) + ' ' + (-cy) + ')">' + inner + '</g>'; }
function word7(txt, x, y, e, col, rot) { if (e === undefined) return ''; const k = back(cl(e / .3)), op = 1 - cl((e - 1.6) / .4), w = 1 + .04 * Math.sin(e * 30);
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + (k * w) + ')" opacity="' + op + '"><text x="0" y="0" text-anchor="middle" font-size="150" font-weight="900" font-family="Inter Display" fill="' + col + '" stroke="#0B1020" stroke-width="16" paint-order="stroke" letter-spacing="4">' + txt + '</text></g>'; }
const shake7 = (e, t) => e === undefined ? [0, 0] : [22 * Math.sin(t * 80) * (1 - cl(e / .7)), 16 * Math.cos(t * 70) * (1 - cl(e / .7))];
function sweat7(t, k) { if (k <= .2) return ''; let s = ''; for (let i = 0; i < 2; i++) { const c = (t * 1.3 + i * .5) % 1; s += '<path transform="translate(' + (370 + i * 28) + ' ' + (1330 + 60 * c) + ') scale(' + (.8 + .4 * k) + ')" d="M0 -16 C 10 0, 12 8, 0 14 C -12 8, -10 0, 0 -16 Z" fill="#7FD3FF" opacity="' + ((1 - c) * k) + '"/>'; } return s; }

// ---------- P002: Handy heizt auf und explodiert ----------
WORLD.h7p2 = function (sc, ev, t, lt) {
  const e = ev.gefahr, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), hc = heatCol(k), sh = shake7(e, t);
  let s = stage7(t, lt, '#1A0709', e === undefined ? lc('#FF7A30', '#FF3B2A', k) : '#FF9A30', 540, 910), o = '';
  const X = 400, Y = 700, Wd = 280, H = 420, jit = e === undefined ? 5 * k * k * Math.sin(t * 70) : 0;
  if (e === undefined || e < .04) {
    o += '<rect x="110" y="900" width="150" height="120" rx="22" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/><rect x="140" y="878" width="18" height="26" rx="4" fill="#8A93A8"/><rect x="212" y="878" width="18" height="26" rx="4" fill="#8A93A8"/>';
    o += '<path d="M185 1020 C 185 1110, 540 1150, 540 ' + (Y + H) + '" stroke="#F4F6FB" stroke-width="14" fill="none"/>';
    for (let i = 0; i < 5; i++) { const c = (t * (1 + 2 * k) + i / 5) % 1, px = lerp(185, 540, c), py = lerp(1020, Y + H, c) + 90 * Math.sin(Math.PI * c); o += '<circle cx="' + px + '" cy="' + py + '" r="8" fill="#FFE14D"/>'; }
    o += '<circle cx="540" cy="910" r="' + (230 + 30 * Math.sin(t * 8 * (1 + k))) + '" fill="' + hc + '" opacity="' + (.12 + .35 * k) + '"/>';
    o += '<g transform="translate(' + jit + ' ' + (-jit) + ')">' + phoneF(X, Y, Wd, H, hc) + batt(X + 90, Y + 130, 100, 52, .3 + .65 * k, k > .7 ? '#FF3B2A' : '#2ECC71') + bolt(X + 140, Y + 250, 1.1) + '</g>';
    if (k > .55) for (let i = 0; i < 6; i++) { const c = (t * 2.2 + i / 6) % 1, a = -1.3 + i * .5; o += '<circle cx="' + (540 + (170 + 120 * c) * Math.cos(a)) + '" cy="' + (910 + (240 + 120 * c) * Math.sin(a)) + '" r="7" fill="#FFE14D" opacity="' + (1 - c) + '"/>'; }
    o += heatW(X, X + Wd, Y - 8, t * (1 + 2 * k), k, 5) + thermo(860, 740, 290, k, hc);
  } else { o += boom(540, 910, e, t) + smoke(540, 950, t, 6, cl(e - .3)) + smoke(260, 1330, t, 3, cl(e - .2) * .8); }
  s += pop7(540, 910, lt, o) + word7('BUMM!', 560, 900, e, '#FFCC00', -8) + sweat7(t, e === undefined ? k : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7p2 = (ev, t, lt, sc) => { const e = ev.gefahr, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined) { const blown = cl(e / .3); return { f: [220 - 40 * blown, 1537], s: 1, r: -14 * blown + 4 * Math.sin(t * 20) * (1 - cl((e - 1) / 1)), fx: e > .12 ? 'brightness(.32) contrast(1.3)' : '' }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 14) };
};

// ---------- P003: Kabel ab, Handy landet, Blitz trifft Schalti ----------
WORLD.h7p3 = function (sc, ev, t, lt) {
  const e = ev.nicht, sh = shake7(e, t), m = ev.mark === undefined ? -1 : ev.mark, cut = m > .7, fall = cl((m - .9) / .5), land = ease(cl((m - 1.3) / .9)), CX = 560, py = lerp(780, 965, land);
  let s = stage7(t, lt, '#0B0A1A', '#B05CFF', 560, 930), o = '';
  o += '<rect x="90" y="790" width="120" height="160" rx="18" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/><circle cx="130" cy="850" r="10" fill="#0B1020"/><circle cx="170" cy="850" r="10" fill="#0B1020"/><rect x="128" y="890" width="44" height="34" rx="8" fill="#0B1020"/>';
  o += padSide(CX, 1060, 270, land);
  if (land >= 1) for (let i = 0; i < 4; i++) { const c = (t * (e === undefined ? 1.2 : 3) + i / 4) % 1; o += '<ellipse cx="' + CX + '" cy="1055" rx="' + (80 + 260 * c) + '" ry="' + ((80 + 260 * c) * .22) + '" fill="none" stroke="#B05CFF" stroke-width="6" opacity="' + (1 - c) + '"/>'; }
  if (!cut) o += '<path d="M150 906 C 220 990, 300 ' + py + ', ' + (CX - 200) + ' ' + py + '" stroke="#F4F6FB" stroke-width="16" fill="none"/>';
  else if (fall < 1) o += '<path d="M150 906 C 200 980, 240 ' + (1000 + 200 * fall) + ', 300 ' + (1010 + 300 * fall * fall) + '" stroke="#F4F6FB" stroke-width="16" fill="none" opacity="' + (1 - fall) + '"/>';
  if (m > .2 && m < 1.2) { const k = cl((m - .2) / .5), op = 1 - cl((m - .9) / .3), a = 28 * Math.sin(Math.PI * k * 2); o += '<g transform="translate(300 ' + (py - 10) + ') scale(1.6)" opacity="' + op + '"><g transform="rotate(' + a + ')"><rect x="-6" y="-70" width="12" height="70" fill="#C8CFE0"/><circle cx="-14" cy="18" r="18" fill="none" stroke="#FF5A5A" stroke-width="9"/></g><g transform="rotate(' + (-a) + ')"><rect x="-6" y="-70" width="12" height="70" fill="#E6EAF4"/><circle cx="14" cy="18" r="18" fill="none" stroke="#FF5A5A" stroke-width="9"/></g></g>'; }
  if (land > 0 && land < 1) for (let i = 0; i < 3; i++) o += '<line x1="' + (CX - 120 + i * 120) + '" y1="' + (py - 80 - 40 * (1 - land)) + '" x2="' + (CX - 120 + i * 120) + '" y2="' + (py - 160 - 40 * (1 - land)) + '" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="' + (1 - land) + '"/>';
  o += '<rect x="' + (CX - 200) + '" y="' + (py - 46) + '" width="400" height="92" rx="46" fill="#3A4A7A" stroke="#fff" stroke-width="7"/>' + batt(CX - 55, py - 24, 100, 48, land >= 1 ? .3 + .5 * cl((m - 2.2) / 3) : .3);
  if (land >= 1 && e === undefined) o += bolt(CX + 150, py - 110 - 8 * Math.abs(Math.sin(t * 6)), 1.2);
  s += pop7(560, 930, lt, o);
  if (e !== undefined && e < .9) { const fl = Math.floor(t * 30) % 2; let d = 'M' + (CX - 180) + ' 1050'; for (let i = 1; i <= 6; i++) { const u = i / 6; d += ' L' + (lerp(CX - 180, 290, u) + (i < 6 ? (fl ? 34 : -34) * (i % 2 ? 1 : -1) : 0)) + ' ' + (lerp(1050, 1340, u) + (i < 6 ? (fl ? -22 : 22) : 0)); }
    s += '<path d="' + d + '" stroke="#FFE14D" stroke-width="20" fill="none" stroke-linejoin="round"/><path d="' + d + '" stroke="#fff" stroke-width="7" fill="none"/>';
    if (e < .12) s += '<rect width="1080" height="1920" fill="#FFE14D" opacity="' + (.55 * (1 - e / .12)) + '"/>'; }
  if (e !== undefined && e >= .5) { s += smoke(250, 1320, t, 3, .6); for (let i = 0; i < 5; i++) { const a = t * 3 + i * 1.256; s += bolt(220 + 150 * Math.cos(a), 1290 + 30 * Math.sin(a), .5, '#FFE14D', .85); } }
  s += word7('BZZZT!', 640, 905, e, '#FFE14D', -6);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7p3 = (ev, t) => { const e = ev.nicht, m = ev.mark;
  if (e !== undefined) { const zap = e < .9; return { f: [220, 1537], s: 1, r: zap ? 8 * Math.sin(t * 50) : 3 * Math.sin(t * 6), fx: zap ? (Math.floor(t * 15) % 2 ? 'invert(1)' : 'brightness(1.6)') : 'brightness(.75) contrast(1.4)' }; }
  if (m !== undefined && m > 1.3) return { f: [220, 1537], s: 1, r: -6 + 3 * Math.sin(t * 3) };
  return { f: [220, 1537], s: 1 };
};

// ---------- P004: Sonne faellt Schalti auf den Kopf ----------
WORLD.h7p4 = function (sc, ev, t, lt) {
  const e = ev.abend, red = e === undefined ? 0 : ease(cl((e - .5) / 1.2)), sh = shake7(e === undefined ? undefined : Math.max(0, e - .5), t);
  let s = skyG('sk7', lc('#1E5BB8', '#2A1C5A', red), lc('#8FC8FF', '#FF7A30', red));
  let sx = 760, sy = 820; const kin = back(cl(lt / .55));
  if (e !== undefined) { const f = cl(e / .55); if (f < 1) { sx = lerp(760, 250, f); sy = 820 + (1300 - 820) * f * f; } else { const b = cl((e - .55) / .9); sx = lerp(250, 1250, b); sy = 1300 - 520 * Math.sin(Math.PI * b * .9); } }
  s += rays7(sx, sy, t, kin, lc('#FFF3B0', '#FFB070', red), .28);
  s += '<defs><pattern id="ht7" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="3.5" fill="#fff" opacity=".08"/></pattern><radialGradient id="vg7" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#ht7)"/>';
  s += cloud(120 + 30 * Math.sin(t * .4), 780, 1.1, 1 - .3 * red) + cloud(500 + 25 * Math.sin(t * .35 + 1), 900, .8, 1 - .3 * red) + cloud(860, 1010, .6, 1 - .3 * red);
  for (let i = 0; i < 4; i++) { const bx = ((t * 70 + i * 160) % 1300) - 100, by = 960 + i * 26 + 10 * Math.sin(t * 3 + i); s += '<path d="M' + bx + ' ' + by + ' q 14 -14 28 0 q 14 -14 28 0" stroke="#0B1020" stroke-width="5" fill="none" opacity=".6"/>'; }
  s += '<g transform="translate(' + sx + ' ' + sy + ') scale(' + kin + ') translate(' + (-sx) + ' ' + (-sy) + ')">' + sun(sx, sy, 78, t, lc('#FFD93B', '#FF5A2A', red)) + '<circle cx="' + (sx - 24) + '" cy="' + (sy - 10) + '" r="8" fill="#0B1020"/><circle cx="' + (sx + 24) + '" cy="' + (sy - 10) + '" r="8" fill="#0B1020"/><path d="M' + (sx - 26) + ' ' + (sy + 18) + ' Q ' + sx + ' ' + (sy + (e === undefined ? 40 : 4)) + ' ' + (sx + 26) + ' ' + (sy + 18) + '" stroke="#0B1020" stroke-width="7" fill="none" stroke-linecap="round"/></g>';
  s += '<path d="M0 1130 Q 300 1060 620 1120 T 1080 1100 L1080 1920 L0 1920 Z" fill="' + lc('#2E9A5A', '#1A4A32', red) + '"/><path d="M0 1200 Q 400 1150 1080 1210 L1080 1920 L0 1920 Z" fill="' + lc('#1F7A4A', '#123A2A', red) + '"/>';
  for (let i = 0; i < 4; i++) { const tx = 520 + i * 140, ty = 1150 + (i % 2) * 20; s += '<rect x="' + (tx - 6) + '" y="' + ty + '" width="12" height="46" fill="#5A3A20"/><circle cx="' + tx + '" cy="' + (ty - 18) + '" r="34" fill="' + lc('#2ECC71', '#2A6A3A', red) + '"/>'; }
  if (e !== undefined && e > .5) for (let i = 0; i < 5; i++) { const a = t * 4 + i * 1.256; s += '<path transform="translate(' + (230 + 140 * Math.cos(a)) + ' ' + (1290 + 28 * Math.sin(a)) + ')" d="M0 -24 L7 -7 L24 0 L7 7 L0 24 L-7 7 L-24 0 L-7 -7 Z" fill="#FFE14D" stroke="#0B1020" stroke-width="3"/>'; }
  s += word7('BONK!', 580, 900, e === undefined || e < .5 ? undefined : e - .5, '#FFCC00', -8);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g><rect width="1080" height="1920" fill="url(#vg7)"/>' + topShade());
};
WMASC.h7p4 = (ev, t) => { const e = ev.abend;
  if (e !== undefined && e > .5) return { f: [220, 1537], s: 1, r: 6 * Math.sin(t * 7), fx: 'sepia(1) saturate(14) hue-rotate(-55deg) brightness(.8)' };
  if (e !== undefined) return { f: [220, 1537], s: 1, r: -10 };
  return { f: [220, 1537], s: 1, r: -4 + 3 * Math.sin(t * 2) };
};
