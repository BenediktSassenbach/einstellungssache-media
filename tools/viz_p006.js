// P006 "Warum kriegst du im Winter staendig eine gewischt?" Einstieg nach v7-Muster, drei Teile, ein Etikett zur Zeit.
function chg(x, y, r, op) { return '<g opacity="' + (op === undefined ? 1 : op) + '"><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#FFE14D" stroke="#0B1020" stroke-width="3"/><rect x="' + (x - r * .55) + '" y="' + (y - r * .14) + '" width="' + (r * 1.1) + '" height="' + (r * .28) + '" fill="#0B1020"/></g>'; }
function zig(x0, y0, x1, y1, t, n, amp) { const fl = Math.floor(t * 30) % 2; let d = 'M' + x0 + ' ' + y0; for (let i = 1; i <= n; i++) { const u = i / n, j = i < n ? (fl ? amp : -amp) * (i % 2 ? 1 : -1) : 0; d += ' L' + (lerp(x0, x1, u) + j) + ' ' + (lerp(y0, y1, u) - j * .6); }
  return '<path d="' + d + '" stroke="#FFE14D" stroke-width="18" fill="none" stroke-linejoin="round"/><path d="' + d + '" stroke="#fff" stroke-width="6" fill="none" stroke-linejoin="round"/>'; }
function klinke(x, y, s, glow) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + (glow ? '<circle cx="-40" cy="0" r="' + (70 + 10 * glow) + '" fill="#FFE14D" opacity="' + (.25 * glow) + '"/>' : '') + '<rect x="-22" y="-70" width="44" height="140" rx="14" fill="#C8CFE0" stroke="#0B1020" stroke-width="5"/><rect x="-120" y="-16" width="130" height="32" rx="16" fill="#E6EAF4" stroke="#0B1020" stroke-width="5"/><circle cx="0" cy="44" r="7" fill="#0B1020"/></g>'; }
const fmtV = v => (Math.round(v / 100) * 100).toLocaleString('de-DE') + ' V';
function crackle(x, y, t, n, R, op) { let s = ''; for (let i = 0; i < n; i++) { const a = t * 3 + i * 6.283 / n, c = .5 + .5 * Math.sin(t * 9 + i * 2); s += bolt(x + R * Math.cos(a), y + R * .3 * Math.sin(a), .35 + .25 * c, '#FFE14D', op * (.4 + .6 * c)); } return s; }

// ---------- Einstieg: Schalti laedt sich auf, Blitz an der Klinke ----------
WORLD.h7p6 = function (sc, ev, t, lt) {
  const e = ev.zap, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e, t);
  let s = stage7(t, lt, '#0B0A1A', e === undefined ? lc('#5C7BFF', '#FFE14D', k) : '#FFE14D', 560, 910), o = '';
  o += '<rect x="420" y="690" width="330" height="440" rx="14" fill="#7A5230" stroke="#0B1020" stroke-width="8"/><rect x="455" y="725" width="260" height="170" rx="8" fill="none" stroke="#5A3A20" stroke-width="8"/><rect x="455" y="925" width="260" height="170" rx="8" fill="none" stroke="#5A3A20" stroke-width="8"/>';
  o += klinke(490, 912, 1, e === undefined ? k : 1);
  if (e === undefined) o += '<rect x="800" y="745" width="150" height="74" rx="16" fill="#0B1020" stroke="#fff" stroke-width="5"/>' + svgT(875, 796, fmtV(12000 * k * k), 34, lc('#FFFFFF', '#FFE14D', k));
  s += pop7(560, 910, lt, o);
  if (e === undefined) s += crackle(220, 1290, t, 6, 170, k);
  if (e !== undefined && e < .9) { s += zig(372, 912, 250, 1330, t, 6, 34); if (e < .12) s += '<rect width="1080" height="1920" fill="#FFE14D" opacity="' + (.55 * (1 - e / .12)) + '"/>'; }
  if (e !== undefined && e >= .5) s += smoke(240, 1320, t, 3, .6) + crackle(220, 1290, t, 5, 150, .8);
  s += word7('ZAPP!', 640, 905, e, '#FFE14D', -6) + sweat7(t, e === undefined ? k : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7p6 = (ev, t, lt, sc) => { const e = ev.zap, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined) { const zap = e < .9; return { f: [220, 1537], s: 1, r: zap ? 8 * Math.sin(t * 50) : 3 * Math.sin(t * 6), fx: zap ? (Math.floor(t * 15) % 2 ? 'invert(1)' : 'brightness(1.6)') : 'brightness(.75) contrast(1.4)' }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 14) };
};

// ---------- Teil 1: Reibung laedt dich auf ----------
const p6shoe = t => 520 + 190 * Math.sin(t * 2.2);
WORLD.p6reib = function (sc, ev, t, lt) {
  let s = bgRad('#0B0A1A', '#1E2A5A', .55) + dust(t, '#5C7BFF', 22, .12), h = '';
  const sx = p6shoe(t), on = ease(cl(lt / .6)), big = ev.p3 !== undefined;
  const v = big ? lerp(8000, 35000, ease(cl(ev.p3 / 1.6))) : ev.p2 !== undefined ? lerp(0, 8000, cl(ev.p2 / 2.4)) : 0;
  // Teppich
  s += '<rect x="-20" y="1062" width="1120" height="80" fill="#8A3B5A"/>'; for (let i = 0; i < 60; i++) { const x = i * 19, b = 6 * Math.sin(t * 6 + i) * (Math.abs(x - sx) < 190 ? 1 : .2); s += '<line x1="' + x + '" y1="1066" x2="' + (x + b) + '" y2="1044" stroke="#B85A7A" stroke-width="6" stroke-linecap="round"/>'; }
  // Schuh
  s += '<g opacity="' + on + '"><path d="M' + (sx - 190) + ' 1050 L' + (sx - 190) + ' 940 Q' + (sx - 190) + ' 900 ' + (sx - 150) + ' 900 L' + (sx - 60) + ' 900 Q' + (sx - 30) + ' 900 ' + (sx - 10) + ' 930 Q' + (sx + 60) + ' 985 ' + (sx + 150) + ' 990 Q' + (sx + 200) + ' 995 ' + (sx + 200) + ' 1050 Z" fill="#3B8BFF" stroke="#0B1020" stroke-width="7"/><rect x="' + (sx - 196) + '" y="1034" width="402" height="26" rx="10" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>';
  for (let i = 0; i < 3; i++) s += '<line x1="' + (sx - 40 + i * 36) + '" y1="' + (948 + i * 14) + '" x2="' + (sx - 10 + i * 36) + '" y2="' + (928 + i * 14) + '" stroke="#fff" stroke-width="7" stroke-linecap="round"/>'; s += '</g>';
  if (ev.panel !== undefined && ev.p1 === undefined) for (let i = 0; i < 4; i++) s += '<line x1="' + (sx - 240 - i * 30) + '" y1="' + (960 + i * 22) + '" x2="' + (sx - 290 - i * 30) + '" y2="' + (960 + i * 22) + '" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="' + (.3 + .5 * Math.abs(Math.cos(t * 2.2))) + '"/>';
  // Elektronen springen vom Teppich in die Sohle
  if (ev.p1 !== undefined) for (let i = 0; i < 9; i++) { const c = (t * 1.3 + i / 9) % 1, x = sx - 170 + i * 42; s += chg(x, 1085 - 55 * c, 11, c < .85 ? 1 : (1 - c) / .15); }
  if (ev.p2 !== undefined) { const lv = cl(v / 35000), k = back(cl(ev.p2 / .4)); s += '<g transform="translate(540 790) scale(' + k + ') translate(-540 -790)">' + batt(400, 740, 250, 100, .08 + .92 * lv, big ? '#FF5A3A' : '#FFE14D') + svgT(525, 812, fmtV(v), 46, '#fff');
    s += '<rect x="450" y="842" width="26" height="46" rx="10" fill="#fff"/><rect x="574" y="842" width="26" height="46" rx="10" fill="#fff"/></g>';
    if (big) s += crackle(525, 790, t, 7, 230, 1); }
  h += slot(ev, [['panel', 'Sohle reibt am Boden'], ['p1', 'Elektronen wandern'], ['p2', 'Du lädst dich auf', 'hot'], ['p3', 'Teppich: bis 35.000 Volt!', 'red']]);
  return W(s + topShade(), h);
};
WMASC.p6reib = (ev, t) => {
  if (ev.p3 !== undefined) return { f: [220, 1537], s: 1, r: 4 * Math.sin(t * 22) };
  if (ev.p1 !== undefined && ev.p2 === undefined) return { f: [p6shoe(t) - 110, 902], s: .4, r: 6 * Math.cos(t * 2.2) };
  return BIG();
};

// ---------- Teil 2: Warum im Winter? ----------
WORLD.p6luft = function (sc, ev, t, lt) {
  const win = ev.p2 === undefined ? 0 : ease(cl(ev.p2 / .8));
  let s = bgRad(lc('#3A2A10', '#0B1020', win), lc('#C8862A', '#1E3A6A', win), .5), h = '';
  const door = ev.p3 !== undefined, wx = door ? lerp(540, 600, ease(cl(ev.p3 / .8))) : 540, cy = 990;
  if (!door) {
    if (win < 1) s += '<g opacity="' + (1 - win) + '">' + sun(880, 780, 60, t, '#FFD93B') + '</g>';
    if (win > 0) { s += '<g opacity="' + win + '">'; for (let i = 0; i < 6; i++) s += '<rect x="' + (800 + i * 24) + '" y="960" width="18" height="150" rx="8" fill="#E6EAF4" stroke="#0B1020" stroke-width="4"/>'; s += heatW(800, 940, 950, t, 1, 4, '#FF9A50');
      for (let i = 0; i < 8; i++) { const x = 80 + rnd(i + 3) * 620, y = 700 + ((t * 40 + rnd(i + 8) * 430) % 430); s += '<g transform="translate(' + x + ' ' + y + ') rotate(' + (t * 40 + i * 30) + ')" opacity=".7"><path d="M-12 0 H12 M0 -12 V12 M-8 -8 L8 8 M-8 8 L8 -8" stroke="#BFE0FF" stroke-width="4" stroke-linecap="round"/></g>'; } s += '</g>'; }
    // Wassertroepfchen tragen Ladung weg (Sommer) bzw. fehlen (Winter)
    const nD = Math.round(lerp(16, 3, win));
    for (let i = 0; i < nD; i++) { const a = i * 6.283 / 16 + .3, c = (t * .45 + rnd(i + 20)) % 1, r = 110 + 330 * c, x = wx + r * Math.cos(a), y = cy - 60 + r * .62 * Math.sin(a);
      if (y < 700 || y > 1125) continue; s += '<path transform="translate(' + x + ' ' + y + ')" d="M0 -22 C 14 0, 16 10, 0 18 C -16 10, -14 0, 0 -22 Z" fill="#5CC8FF" opacity="' + (1 - c) + '"/>' + (ev.p1 !== undefined ? chg(x + 16, y - 6, 9, 1 - c) : ''); }
    if (ev.p2 !== undefined) { const n = Math.min(14, Math.floor(ev.p2 * 5)); for (let i = 0; i < n; i++) { const a = i * 6.283 / 14 + t * .6; s += chg(wx + 135 * Math.cos(a), cy - 70 + 95 * Math.sin(a), 12); } s += '<circle cx="' + wx + '" cy="' + (cy - 70) + '" r="' + (150 + 8 * Math.sin(t * 6)) + '" fill="#FFE14D" opacity="' + (.1 * n / 14) + '"/>'; }
  } else {
    const k = ease(cl(ev.p3 / .8)), jump = ev.p3 > .8 && ev.act === undefined;
    s += '<rect x="840" y="690" width="260" height="440" fill="#7A5230" stroke="#0B1020" stroke-width="8"/>' + klinke(905, 912, 1, jump ? 1 : 0);
    if (ev.act === undefined) for (let i = 0; i < 14; i++) { const a = i * 6.283 / 14 + t * .6, fly = cl((ev.p3 - .8 - i * .04) / .25); s += chg(lerp(wx + 135 * Math.cos(a), 800, fly), lerp(cy - 70 + 95 * Math.sin(a), 912, fly), 12, 1 - cl((fly - .8) * 5)); }
    if (jump && ev.p3 < 2) s += zig(wx + 95, cy - 60, 790, 912, t, 4, 16);
    if (ev.act !== undefined) { const a = back(cl(ev.act / .4)); s += '<ellipse cx="880" cy="' + (800 - 6 * Math.sin(t * 3)) + '" rx="' + (70 * a) + '" ry="' + (18 * a) + '" fill="none" stroke="#FFE14D" stroke-width="9"/>';
      const c = (t * .8) % 1; s += '<path d="M' + (wx + 110) + ' 960 L770 930" stroke="#FFE14D" stroke-width="10" stroke-dasharray="18 14" stroke-dashoffset="' + (-t * 80) + '"/><path d="M790 930 l-26 -18 v36 Z" fill="#FFE14D"/>' + chg(lerp(wx + 110, 770, c), lerp(960, 930, c), 12); }
  }
  h += slot(ev, [['p1', 'Feuchte Luft leitet Ladung ab'], ['p2', 'Trockene Luft: Ladung bleibt', 'hot'], ['p3', 'Metall: alles springt über!', 'red'], ['act', 'Du entlädst dich an der Klinke']]);
  return W(s + topShade(), h);
};
WMASC.p6luft = (ev, t) => {
  if (ev.p3 !== undefined) { const k = ease(cl(ev.p3 / .8)), zap = ev.p3 > .8 && ev.p3 < 1.6; return { f: [lerp(540, 600, k), 1125], s: .75, walk: k < 1, r: zap ? 8 * Math.sin(t * 50) : 0, fx: zap ? 'brightness(1.5)' : '' }; }
  return { f: [540, 1122], s: .6, r: ev.p2 !== undefined ? 3 * Math.sin(t * 18) : 0 };
};

// ---------- Teil 3: Gefaehrlich? Was hilft? ----------
WORLD.p6hilft = function (sc, ev, t, lt) {
  let s = bgRad('#0B0A1A', '#1E2A5A', .55) + dust(t, '#FFE14D', 20, .1), h = '';
  const st = ev.act !== undefined ? 'luft' : ev.p3 !== undefined ? 'key' : ev.p2 !== undefined ? 'bars' : 'feel', base = 1110;
  if (st === 'feel') { const k = ease(cl(lt / 1.2)), H = 380, top = base - H;
    s += '<rect x="500" y="' + top + '" width="90" height="' + H + '" rx="18" fill="#26335E" stroke="#fff" stroke-width="5"/><rect x="500" y="' + (base - H * k) + '" width="90" height="' + (H * k) + '" rx="18" fill="#FFE14D"/>';
    const y2 = base - H * 1400 / 35000, y3 = base - H * 2600 / 35000; s += '<rect x="486" y="' + (y3 - 4) + '" width="118" height="' + (y2 - y3 + 8) + '" fill="#FF5A3A"/>' + svgT(640, y3 + 4, 'ab hier spürst du es', 34, '#fff', 'start') + svgT(640, top + 30, '35.000 V', 34, '#FFE14D', 'start') + '<path d="M630 ' + (y3 - 6) + ' l-22 0" stroke="#fff" stroke-width="5"/>';
    s += bolt(545, top - 50 - 8 * Math.abs(Math.sin(t * 6)), 1); }
  if (st === 'bars') { const k = ease(cl(ev.p2 / 1.2));
    s += '<rect x="430" y="' + (base - 360 * k) + '" width="170" height="' + (360 * k) + '" rx="16" fill="#FFE14D"/>' + svgT(515, base - 370 * k - 14, 'Spannung', 38, '#fff') + '<rect x="700" y="' + (base - 16 * k) + '" width="170" height="' + (16 * k) + '" rx="6" fill="#5CE1FF"/>' + svgT(785, base - 40, 'Ladung', 38, '#fff') + '<line x1="400" y1="' + base + '" x2="900" y2="' + base + '" stroke="#fff" stroke-width="5"/>';
    const c = (t * 1.2) % 1; if (c < .12) s += bolt(785, base - 150, 1.6, '#fff'); }
  if (st === 'key') { const k = ease(cl(ev.p3 / 1)), tip = [lerp(600, 772, k), lerp(1010, 918, k)], hit = k >= 1 && ev.p3 < 2.6;
    s += '<rect x="840" y="690" width="260" height="440" fill="#7A5230" stroke="#0B1020" stroke-width="8"/>' + klinke(905, 912, 1, hit ? 1 : 0);
    s += '<g transform="translate(' + tip[0] + ' ' + tip[1] + ') rotate(-28)"><rect x="-150" y="-9" width="150" height="18" rx="6" fill="#E6EAF4" stroke="#0B1020" stroke-width="4"/><path d="M-60 9 v16 h14 v-16 M-30 9 v12 h12 v-12" fill="#E6EAF4" stroke="#0B1020" stroke-width="4"/><circle cx="-180" cy="0" r="38" fill="#FFCC00" stroke="#0B1020" stroke-width="5"/><circle cx="-190" cy="0" r="12" fill="#1E2A5A"/></g>';
    if (hit) s += zig(tip[0], tip[1], 790, 912, t, 3, 8) + '<circle cx="' + tip[0] + '" cy="' + tip[1] + '" r="' + (26 + 10 * Math.sin(t * 30)) + '" fill="#FFE14D" opacity=".5"/>';
    if (ev.p3 > 1.6) { const a = back(cl((ev.p3 - 1.6) / .4)); s += '<g transform="translate(700 760) scale(' + a + ')"><circle r="48" fill="#2ECC71" stroke="#fff" stroke-width="6"/><path d="M-22 2 L-6 18 L24 -16" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>'; } }
  if (st === 'luft') { const k = back(cl(ev.act / .4)), k2 = back(cl((ev.act - 1.4) / .4));
    s += '<g transform="translate(520 940) scale(' + k + ') translate(-520 -940)"><rect x="450" y="930" width="140" height="180" rx="30" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/><rect x="490" y="900" width="60" height="36" rx="10" fill="#C8CFE0" stroke="#0B1020" stroke-width="5"/>';
    for (let i = 0; i < 5; i++) { const c = (t * .7 + i / 5) % 1; s += '<circle cx="' + (520 + 30 * Math.sin(c * 6 + i)) + '" cy="' + (890 - 150 * c) + '" r="' + (14 + 26 * c) + '" fill="#BFE0FF" opacity="' + (.8 * (1 - c)) + '"/>'; }
    s += '<circle cx="610" cy="1090" r="34" fill="#2ECC71" stroke="#fff" stroke-width="5"/><path d="M596 1092 L606 1102 L626 1078" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
    if (ev.act > 1.4) s += '<g transform="translate(820 930) scale(' + k2 + ') translate(-820 -930)"><rect x="730" y="780" width="180" height="300" rx="8" fill="#1E3A6A" stroke="#F4F6FB" stroke-width="12"/><path d="M730 780 L680 820 L680 1110 L730 1080 Z" fill="#BFE0FF" opacity=".5" stroke="#F4F6FB" stroke-width="6"/><circle cx="900" cy="1090" r="34" fill="#FF3B3B" stroke="#fff" stroke-width="5"/><path d="M886 1076 L914 1104 M914 1076 L886 1104" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>'; }
  h += slot(ev, [['p1', 'Spürbar ab ca. 2.000 Volt'], ['p2', 'Viel Spannung, winzige Ladung', 'hot'], ['p3', 'Trick: Schlüssel zuerst!', 'hot'], ['act', 'Befeuchten statt lüften', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.p6hilft = (ev, t) => {
  if (ev.act !== undefined) return BIG();
  if (ev.p3 !== undefined) { const k = ease(cl(ev.p3 / 1)); return { f: [lerp(330, 500, k), 1122], s: .6, walk: k < 1 }; }
  return BIG();
};

// ---------- Schluss ----------
WORLD.p6outro = function (sc, ev, t) {
  let s = bgRad('#0B0A1A', '#1E2A5A', .6) + dust(t, '#FFE14D', 28, .14);
  s += klinke(760, 1010, 1.2, .6 + .4 * Math.sin(t * 4)) + crackle(700, 1010, t, 5, 150, .8);
  return W(s + topShade());
};
