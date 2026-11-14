// Chemie C003 "Warum blaeht sich ein alter Handy-Akku auf?" (Bauplan wie C001). Etikett y=600, Grafik y=700 bis 1130.

// ---------- Helfer ----------
function badge(x, y, txt, col, k, size) { size = size || 40; const w = txt.length * size * .6 + 40; return k <= 0 ? '' : '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)) + ')"><rect x="' + (-w / 2) + '" y="' + (-size * .8) + '" width="' + w + '" height="' + (size * 1.6) + '" rx="' + (size * .5) + '" fill="' + col + '" stroke="#0B1020" stroke-width="5"/>' + svgT(0, size * .36, txt, size, '#0B1020') + '</g>'; }
function gasB(x, y, r, op) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="rgba(200,255,160,.25)" stroke="#C8FF9A" stroke-width="4" opacity="' + op + '"/>'; }
function noSign(x, y, k, inner) { return k <= 0 ? '' : '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)) + ')"><circle r="92" fill="#141C36" stroke="#FF4D4D" stroke-width="14"/>' + inner + '<line x1="-64" y1="-64" x2="64" y2="64" stroke="#FF4D4D" stroke-width="14" stroke-linecap="round"/></g>'; }
// Akku als Kissen: bl = 0 flach, 1 prall
function pouch(cx, cy, w, bl, t) { const ry = 34 + 110 * bl, wob = bl > 0 ? 3 * Math.sin(t * 9) * bl : 0;
  return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (w / 2 + 6 * bl) + '" ry="' + (ry + wob) + '" fill="#B9C2D6" stroke="#6E7891" stroke-width="8"/><ellipse cx="' + (cx - w * .16) + '" cy="' + (cy - ry * .45) + '" rx="' + (w * .2) + '" ry="' + (ry * .18) + '" fill="#fff" opacity=".45"/><rect x="' + (cx + w / 2 - 4) + '" y="' + (cy - 16) + '" width="46" height="32" rx="6" fill="#FFB020" stroke="#6E7891" stroke-width="5"/>'; }
const lab3 = (t) => kitchen(t, '#080B1C', '#1B2450', '#FFD23F');

// ---------- Einstieg: Handy blaeht sich auf, Display springt ab und trifft Schalti ----------
WORLD.h7c3 = function (sc, ev, t, lt) {
  const e = ev.plopp, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e, t), CX = 560, CY = 900;
  let s = stage7(t, lt, '#080B1C', e === undefined ? lc('#5CE1FF', '#FFD23F', k) : '#FF6B4D', CX, CY), o = '';
  const bl = e === undefined ? ease(k) : (e < .14 ? 1 + e : 1.14 - .5 * cl((e - .14) / .5)), W2 = 250 + 70 * bl, H = 440, wob = e === undefined ? 5 * k * Math.sin(t * 18) : 0;
  // Rueckseite mit Wölbung
  o += '<rect x="' + (CX - W2 / 2 + wob) + '" y="' + (CY - H / 2) + '" width="' + W2 + '" height="' + H + '" rx="' + (46 + 70 * bl) + '" fill="#2A3350" stroke="#8A93A8" stroke-width="9"/>';
  o += '<ellipse cx="' + (CX + wob) + '" cy="' + CY + '" rx="' + (70 + 60 * bl) + '" ry="' + (150 + 30 * bl) + '" fill="#B9C2D6" stroke="#6E7891" stroke-width="7" opacity="' + cl(bl * 1.4) + '"/>';
  // Display hebt sich ab und fliegt beim Gag zu Schalti
  let dx = CX + 40 * bl, dy = CY - 20 * bl, dr = 10 * bl;
  if (e !== undefined && e > .14) { const c = cl((e - .14) / .4); dx = lerp(CX + 40, 300, c); dy = lerp(CY - 20, 1330, c) - 260 * Math.sin(Math.PI * c); dr = 10 + 400 * c; if (c >= 1) { const c2 = cl((e - .54) / .7); dx = 300 + 260 * c2; dy = 1330 - 200 * Math.sin(Math.PI * c2 * .9) + 500 * c2 * c2; dr = 410 + 300 * c2; } }
  o += '<g transform="translate(' + dx + ' ' + dy + ') rotate(' + dr + ')"><rect x="-118" y="-212" width="236" height="424" rx="40" fill="#0B1020" stroke="#F4F6FB" stroke-width="9"/><rect x="-100" y="-194" width="200" height="388" rx="28" fill="#26335E"/><rect x="-34" y="-190" width="68" height="18" rx="9" fill="#0B1020"/><path d="M-70 -120 L-20 -60 L-50 0 L10 60" stroke="#fff" stroke-width="5" fill="none" opacity="' + cl(bl) + '"/></g>';
  if (e !== undefined && e > .5) for (let i = 0; i < 5; i++) { const a = t * 4 + i * 1.257; o += '<path transform="translate(' + (250 + 110 * Math.cos(a)) + ' ' + (1230 + 34 * Math.sin(a)) + ') scale(' + (1 - cl((e - 2.2) / .5)) + ')" d="M0 -22 L6 -7 L22 -7 L9 3 L14 20 L0 10 L-14 20 L-9 3 L-22 -7 L-6 -7 Z" fill="#FFE14D" stroke="#0B1020" stroke-width="3"/>'; }
  s += pop7(CX, CY, lt, o) + word7('PLOPP!', 600, 860, e === undefined || e < .14 ? undefined : e - .14, '#FFD23F', -8) + sweat7(t, e === undefined ? k : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7c3 = (ev, t, lt, sc) => { const e = ev.plopp, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined && e > .54) { const b = cl((e - .54) / .25); return { f: [220 - 30 * b, 1537], s: 1, r: -12 * b + 6 * Math.sin(t * 7) }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 14) };
};

// ---------- Teil 1: Elektrolyt, Ionen, Zersetzung, Gas ----------
WORLD.c3chemie = function (sc, ev, t, lt) {
  let s = lab3(t), h = '';
  const X0 = 110, X1 = 800, Y0 = 760, Y1 = 1090, z = ev.zersetzt, zk = z === undefined ? 0 : cl(z / 2.5), g = ev.act;
  s += '<rect x="' + (X1 - 4) + '" y="' + (Y0 + 110) + '" width="34" height="100" rx="10" fill="#C9CFDD"/><rect x="' + X0 + '" y="' + Y0 + '" width="' + (X1 - X0) + '" height="' + (Y1 - Y0) + '" rx="40" fill="#0B1020" stroke="#F4F6FB" stroke-width="10"/>';
  const lq = lc('#2BB8E6', '#9A8A3A', zk);
  s += '<clipPath id="c3l"><rect x="' + (X0 + 14) + '" y="' + (Y0 + 14) + '" width="' + (X1 - X0 - 28) + '" height="' + (Y1 - Y0 - 28) + '" rx="28"/></clipPath><g clip-path="url(#c3l)">';
  let wv = 'M' + X0 + ' ' + (Y0 + 70); for (let x = X0; x <= X1; x += 30) wv += ' L' + x + ' ' + (Y0 + 70 + 8 * Math.sin(x * .03 + t * 3)); s += '<path d="' + wv + ' L' + X1 + ' ' + Y1 + ' L' + X0 + ' ' + Y1 + ' Z" fill="' + lq + '" opacity=".75"/>';
  s += '<rect x="' + (X0 + 14) + '" y="' + (Y0 + 14) + '" width="150" height="' + (Y1 - Y0 - 28) + '" fill="#4A5270"/><rect x="' + (X1 - 164) + '" y="' + (Y0 + 14) + '" width="150" height="' + (Y1 - Y0 - 28) + '" fill="#3B6BD6"/>';
  s += '<line x1="' + ((X0 + X1) / 2) + '" y1="' + (Y0 + 20) + '" x2="' + ((X0 + X1) / 2) + '" y2="' + (Y1 - 20) + '" stroke="#fff" stroke-width="6" stroke-dasharray="14 12" opacity=".7"/>';
  if (ev.ionen !== undefined) for (let i = 0; i < 6; i++) { const ph = (t * .28 + i / 6) % 1, tri = ph < .5 ? ph * 2 : 2 - ph * 2, x = lerp(X0 + 190, X1 - 190, ease(tri)), y = Y0 + 100 + i * 38 + 3 * Math.sin(t * 3 + i), k = back(cl((ev.ionen - i * .08) / .3));
    s += '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')"><circle r="20" fill="#FFD23F" stroke="#0B1020" stroke-width="4"/><path d="M-9 0 H9 M0 -9 V9" stroke="#0B1020" stroke-width="5" stroke-linecap="round"/>' + '</g>'; }
  if (g !== undefined) for (let i = 0; i < 12; i++) { const c = cl((g - i * .12) / 1.4); if (c <= 0) continue; const x = X0 + 200 + rnd(i + 8) * (X1 - X0 - 400), y0 = Y1 - 40 - rnd(i + 3) * 120, yt = Y0 + 46 + 14 * (i % 3);
    s += gasB(x + 10 * Math.sin(t * 4 + i), lerp(y0, yt, ease(c)), 12 + 12 * c + 6 * rnd(i), 1); }
  s += '</g>';
  s += svgT(X0 + 89, Y1 + 50, 'Minuspol', 32, '#AEB9D6') + svgT(X1 - 89, Y1 + 50, 'Pluspol', 32, '#AEB9D6');
  if (lt > .6 && z === undefined) s += svgT((X0 + X1) / 2, Y1 + 50, 'Elektrolyt', 34, '#7FD8F5');
  if (z !== undefined && g === undefined) { s += badge(250, 720, 'Alter', '#C9CFDD', z / .3, 34) + badge(455, 720, 'Hitze', '#FF9A3B', (z - .7) / .3, 34) + badge(660, 720, 'Sturz', '#FF6B6B', (z - 1.4) / .3, 34); }
  h += slot(ev, [['panel', 'Flüssigkeit im Akku: Elektrolyt'], ['ionen', 'Lithium-Ionen wandern durch', 'hot'], ['zersetzt', 'Elektrolyt kann sich zersetzen', 'red'], ['act', 'Dabei entsteht Gas', 'red']]);
  return W(s + topShade(), h);
};
WMASC.c3chemie = (ev, t) => ev.act !== undefined ? { f: [220, 1537], s: 1, r: 3 * Math.sin(t * 14) * (1 - cl(ev.act / 1.2)) } : BIG();

// ---------- Teil 2: dicht verpackt, Gas kann nicht raus, Kissen, drueckt Display hoch ----------
WORLD.c3druck = function (sc, ev, t, lt) {
  let s = lab3(t), h = '';
  const CX = 470, CY = 1010, Wd = 560, g = ev.gas, bl = ev.kissen === undefined ? 0 : ease(cl(ev.kissen / 1.6)), a = ev.act, lift = a === undefined ? 0 : ease(cl(a / 1.0));
  // Handy von der Seite: Rueckschale unten, Display oben
  const top = CY - 60 - 110 * bl * .9, tilt = -9 * lift;
  s += '<path d="M' + (CX - Wd / 2 - 40) + ' ' + (CY - 50) + ' L' + (CX - Wd / 2 - 40) + ' ' + (CY + 60) + ' Q' + (CX - Wd / 2 - 40) + ' ' + (CY + 90) + ' ' + (CX - Wd / 2 - 10) + ' ' + (CY + 90) + ' L' + (CX + Wd / 2 + 70) + ' ' + (CY + 90) + ' Q' + (CX + Wd / 2 + 100) + ' ' + (CY + 90) + ' ' + (CX + Wd / 2 + 100) + ' ' + (CY + 60) + ' L' + (CX + Wd / 2 + 100) + ' ' + (CY - 50) + '" fill="none" stroke="#8A93A8" stroke-width="16" stroke-linejoin="round" stroke-linecap="round"/>';
  s += pouch(CX, CY, Wd, bl, t);
  if (g !== undefined) for (let i = 0; i < 12; i++) { const k = cl((g - i * .08) / .3), ry = 26 + 100 * bl, a2 = t * (1.2 + rnd(i)) + i * 2.1, x = CX + (Wd / 2 - 40) * Math.cos(a2) * (.3 + .6 * rnd(i + 5)), y = CY + (ry - 14) * Math.sin(a2 * 1.3) * .8; s += gasB(x, y, (9 + 9 * rnd(i + 9)) * k, 1); }
  if (g !== undefined && ev.kissen === undefined) for (const d of [-1, 1]) { const p = 10 * Math.abs(Math.sin(t * 6)); s += '<path d="M' + (CX + d * 150) + ' ' + (CY - 6) + ' L' + (CX + d * 150) + ' ' + (CY - 30 - p) + ' M' + (CX + d * 150 - 12) + ' ' + (CY - 18 - p) + ' L' + (CX + d * 150) + ' ' + (CY - 32 - p) + ' L' + (CX + d * 150 + 12) + ' ' + (CY - 18 - p) + '" stroke="#FF6B4D" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; }
  if (ev.dicht !== undefined && g === undefined) { const k = back(cl(ev.dicht / .4)); s += '<g transform="translate(' + CX + ' ' + (CY - 4) + ') scale(' + k + ')"><rect x="-30" y="-10" width="60" height="46" rx="10" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/><path d="M-18 -10 V-26 A18 18 0 0 1 18 -26 V-10" stroke="#0B1020" stroke-width="8" fill="none"/></g>'; }
  s += '<g transform="translate(' + (CX + 30) + ' ' + top + ') rotate(' + tilt + ' ' + (Wd / 2 + 60) + ' 0)"><rect x="' + (-Wd / 2 - 70) + '" y="-26" width="' + (Wd + 140) + '" height="26" rx="10" fill="#0B1020" stroke="#F4F6FB" stroke-width="7"/></g>';
  if (a !== undefined) { const p = .5 + .5 * Math.sin(t * 8); s += '<g transform="translate(' + (CX - Wd / 2 - 50) + ' ' + (CY - 70) + ')"><circle r="' + (30 + 6 * p) + '" fill="#FF4D4D" stroke="#fff" stroke-width="6" opacity="' + cl(a / .3) + '"/>' + svgT(0, 17, '!', 48, '#fff') + '</g>'; }
  // Druckanzeige
  if (ev.kissen !== undefined) { const k = back(cl(ev.kissen / .4)), an = -80 + 150 * bl + 4 * Math.sin(t * 20) * bl;
    s += '<g transform="translate(830 790) scale(' + k + ')"><circle r="80" fill="#F4F6FB" stroke="#0B1020" stroke-width="9"/><path d="M-56 30 A64 64 0 0 1 56 30" stroke="#C9CFDD" stroke-width="12" fill="none"/><path d="M30 -56 A64 64 0 0 1 56 30" stroke="#FF4D4D" stroke-width="12" fill="none"/><line x1="0" y1="0" x2="' + (58 * Math.sin(an * Math.PI / 180)) + '" y2="' + (-58 * Math.cos(an * Math.PI / 180)) + '" stroke="#0B1020" stroke-width="9" stroke-linecap="round"/><circle r="9" fill="#0B1020"/></g>' + svgT(830, 912, 'Druck', 32, '#AEB9D6'); }
  h += slot(ev, [['dicht', 'Akku ist dicht verpackt'], ['gas', 'Gas kann nicht raus', 'hot'], ['kissen', 'Druck steigt: Akku wird dick', 'red'], ['act', 'Display wird hochgedrückt', 'red']]);
  return W(s + topShade(), h);
};
WMASC.c3druck = (ev, t) => {
  if (ev.act !== undefined) return { f: [220, 1537], s: 1, r: -6 + 3 * Math.sin(t * 16) * (1 - cl(ev.act / 1.2)) };
  if (ev.kissen !== undefined) { const bl = ease(cl(ev.kissen / 1.6)); return { f: [330, 1010 - 86 - 110 * bl * .9], s: .6, r: 5 * Math.sin(t * 12) * bl }; }
  return BIG();
};

// ---------- Teil 3: defekt, kann Feuer fangen, nie druecken/anstechen/laden, zur Reparatur oder Sammelstelle ----------
WORLD.c3finger = function (sc, ev, t, lt) {
  let s = lab3(t), h = '';
  const CX = 480, CY = 960, f = ev.feuer, n = ev.nie, a = ev.act, show = n === undefined && a === undefined;
  if (show) { s += pouch(CX, CY, 520, 1, t);
    if (ev.defekt !== undefined && f === undefined) { const k = back(cl(ev.defekt / .35)); s += '<g transform="translate(' + CX + ' ' + CY + ') rotate(-10) scale(' + k + ')"><rect x="-190" y="-58" width="380" height="116" rx="20" fill="none" stroke="#FF4D4D" stroke-width="12"/>' + svgT(0, 30, 'DEFEKT', 86, '#FF4D4D') + '</g>'; }
    if (f !== undefined) { const k = cl(f / .5); s += '<path d="M' + (CX + 60) + ' ' + (CY - 120) + ' l-26 44 l30 14 l-24 46" stroke="#0B1020" stroke-width="9" fill="none" stroke-linejoin="round"/>' + fire(CX + 50, CY - 108, 190, 120 * back(cl((f - .4) / .5)), t, 4); } }
  if (n !== undefined && a === undefined) {
    s += noSign(210, 880, n / .3, '<path d="M-10 -52 Q-10 -64 0 -64 Q10 -64 10 -52 L10 -4 L34 4 Q44 8 42 20 L36 52 L-26 52 L-40 14 Q-36 2 -24 8 L-10 14 Z" fill="#FFD9B3" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/>') + svgT(210, 1030, 'drücken', 36, '#fff');
    if (n > .6) s += noSign(470, 880, (n - .6) / .3, '<path d="M-44 44 L36 -36" stroke="#E6ECF5" stroke-width="9" stroke-linecap="round"/><path d="M36 -36 L52 -52" stroke="#FFD23F" stroke-width="14" stroke-linecap="round"/><circle cx="-46" cy="46" r="5" fill="#fff"/>') + svgT(470, 1030, 'anstechen', 36, '#fff');
    if (n > 1.2) s += noSign(730, 880, (n - 1.2) / .3, '<rect x="-26" y="-20" width="52" height="54" rx="10" fill="#E6ECF5" stroke="#0B1020" stroke-width="5"/><path d="M-12 -20 V-46 M12 -20 V-46" stroke="#E6ECF5" stroke-width="9" stroke-linecap="round"/><path d="M0 34 V58" stroke="#E6ECF5" stroke-width="8"/>' + bolt(0, 8, .5, '#FFB020')) + svgT(730, 1030, 'laden', 36, '#fff'); }
  if (a !== undefined) { const k1 = back(cl(a / .35)), k2 = back(cl((a - .7) / .35)), k3 = back(cl((a - 1.4) / .35));
    s += '<g transform="translate(200 890) scale(' + k1 + ')"><circle r="86" fill="#141C36" stroke="#fff" stroke-width="10"/><path d="M-34 -30 A48 48 0 1 0 34 -30" stroke="#FF6B6B" stroke-width="13" fill="none" stroke-linecap="round"/><line x1="0" y1="-56" x2="0" y2="-6" stroke="#FF6B6B" stroke-width="13" stroke-linecap="round"/></g>' + (k1 > .5 ? svgT(200, 1030, 'ausschalten', 34, '#fff') : '');
    if (a > .5) s += '<path d="M310 890 H350" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="' + cl((a - .5) / .2) + '"/><path d="M344 872 L370 890 L344 908 Z" fill="#fff" opacity="' + cl((a - .5) / .2) + '"/>';
    s += '<g transform="translate(480 890) scale(' + k2 + ')"><circle r="86" fill="#141C36" stroke="#5CE1FF" stroke-width="10"/><path d="M-40 40 L16 -16" stroke="#E6ECF5" stroke-width="16" stroke-linecap="round"/><path d="M10 -44 A30 30 0 1 0 44 -10 L24 -18 L18 -24 Z" fill="#E6ECF5"/></g>' + (k2 > .5 ? svgT(480, 1030, 'Reparatur', 34, '#fff') : '');
    if (a > 1.2) s += svgT(620, 905, 'oder', 34, '#AEB9D6');
    s += '<g transform="translate(770 890) scale(' + k3 + ')"><circle r="86" fill="#141C36" stroke="#8BD450" stroke-width="10"/><rect x="-34" y="-22" width="68" height="66" rx="8" fill="#8BD450" stroke="#0B1020" stroke-width="5"/><rect x="-42" y="-38" width="84" height="18" rx="6" fill="#8BD450" stroke="#0B1020" stroke-width="5"/><rect x="-10" y="-50" width="20" height="12" rx="4" fill="#8BD450" stroke="#0B1020" stroke-width="4"/><path d="M-14 -6 V30 M0 -6 V30 M14 -6 V30" stroke="#0B1020" stroke-width="5"/></g>' + (k3 > .5 ? svgT(770, 1030, 'Sammelstelle', 34, '#fff') : ''); }
  h += slot(ev, [['defekt', 'Aufgebläht heißt defekt', 'red'], ['feuer', 'Hülle verletzt: Brandgefahr', 'red'], ['nie', 'Niemals:', 'red'], ['act', 'Stattdessen:', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.c3finger = (ev, t) => ev.feuer !== undefined && ev.nie === undefined ? { f: [190, 1537], s: 1, r: -8 + 3 * Math.sin(t * 18) * (1 - cl(ev.feuer / 1.2)) } : BIG();

// ---------- Schluss ----------
WORLD.c3outro = function (sc, ev, t) { return W(lab3(t) + pouch(650, 1040, 360, .7, t) + topShade()); };
