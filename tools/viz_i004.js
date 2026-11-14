// Informatik I004 "Warum laggt dein Spiel?" (Bauplan wie I006). Etikett y=600, Grafik y=700 bis 1130. Nutzt Helfer aus viz_i001/i002/i003/i006.js.

// ---------- Helfer ----------
function mon4(x, y, w, hgt, fill, inner) { return '<rect x="' + (x + w / 2 - 14) + '" y="' + (y + hgt) + '" width="28" height="34" fill="#8A93A8"/><rect x="' + (x + w / 2 - 70) + '" y="' + (y + hgt + 30) + '" width="140" height="16" rx="8" fill="#8A93A8"/><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hgt + '" rx="22" fill="#0B1020" stroke="#F4F6FB" stroke-width="9"/><rect x="' + (x + 14) + '" y="' + (y + 14) + '" width="' + (w - 28) + '" height="' + (hgt - 28) + '" rx="12" fill="' + (fill || '#1B2748') + '"/>' + (inner || ''); }
function srv4(x, y, s, col) { let d = ''; for (let i = 0; i < 3; i++) d += '<rect x="-52" y="' + (-84 + i * 58) + '" width="104" height="48" rx="10" fill="#2A3350" stroke="#C9CFDD" stroke-width="5"/><circle cx="-30" cy="' + (-60 + i * 58) + '" r="7" fill="' + (col || '#3DFF7A') + '"/><path d="M-10 ' + (-60 + i * 58) + ' H36" stroke="#8A93A8" stroke-width="6" stroke-linecap="round"/>'; return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + d + '</g>'; }
function pkt4(x, y, s, col, rot, op) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')" opacity="' + (op === undefined ? 1 : op) + '"><rect x="-26" y="-20" width="52" height="40" rx="8" fill="' + (col || '#FFD23F') + '" stroke="#0B1020" stroke-width="5"/><path d="M-26 -8 H26 M0 -20 V20" stroke="#0B1020" stroke-width="4"/></g>'; }
function wifi4(x, y, s, col, t) { let d = ''; for (let i = 0; i < 3; i++) d += '<path d="M' + (-18 - i * 18) + ' ' + (-10 - i * 14) + ' Q0 ' + (-34 - i * 26) + ' ' + (18 + i * 18) + ' ' + (-10 - i * 14) + '" stroke="' + col + '" stroke-width="9" fill="none" stroke-linecap="round" opacity="' + (.4 + .6 * Math.abs(Math.sin(t * 5 - i))) + '"/>'; return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + d + '<circle r="9" fill="' + col + '"/></g>'; }
function rout4(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-40 -20 V-70 M40 -20 V-70" stroke="#C9CFDD" stroke-width="8" stroke-linecap="round"/><rect x="-70" y="-24" width="140" height="56" rx="14" fill="#2A3350" stroke="#F4F6FB" stroke-width="6"/><circle cx="-40" cy="4" r="7" fill="#3DFF7A"/><circle cx="-14" cy="4" r="7" fill="#3DFF7A"/><circle cx="12" cy="4" r="7" fill="#FFD23F"/></g>'; }
const pingCol = v => v <= 50 ? '#3DFF7A' : v <= 100 ? '#FFD23F' : '#FF4D4D';

// Gag Teil 1 (Ausrutscher): Schalti laggt selbst. Er rennt los und schnappt immer wieder an eine alte Stelle zurueck
const I4K = [[0, .2, 220, 520, 300], [.2, .4, 300, 640, 400], [.4, .6, 400, 760, 260], [.6, .8, 260, 560, 220]];
function i4rub(q, D, t) { const u = cl(q / Math.max(2.6, D - .1)), HY = 1537, gh = [];
  for (const k of I4K) if (u >= k[1]) gh.push([k[3], cl(1 - (u - k[1]) / .16)]);
  for (const k of I4K) if (u >= k[0] && u < k[1]) { const c = (u - k[0]) / (k[1] - k[0]), st = c < .08; return { gh, m: { f: [lerp(k[2], k[3], c), HY - 16 * Math.abs(Math.sin(t * 16))], s: 1, r: -8 + 5 * Math.sin(t * 16), fx: st ? 'brightness(1.8)' : '' } }; }
  return { gh, m: { f: [220, HY], s: 1, r: 8 * Math.sin(t * 9) * (1 - (u - .8) / .2) } };
}
// Gag Teil 2 (Eigentor): Schalti schiebt ein Datenpaket los, es prallt vom fernen Server ab und kegelt ihn um
function i4box(q, D, t) { const u = cl(q / Math.max(2.6, D - .1)), HX = 220, HY = 1537;
  if (u < .4) { const x = lerp(HX, 620, u / .4); return { b: [x + 170, 1508, 0], m: { f: [x, HY], s: 1, walk: true, r: 8 } }; }
  if (u < .52) { const c = (u - .4) / .12; return { b: [lerp(790, 960, c), 1508, 200 * c], m: { f: [620, HY], s: 1, r: 0 } }; }
  if (u < .62) { const c = (u - .52) / .1; return { b: [lerp(960, 770, c), 1508 - 60 * Math.sin(Math.PI * c), 200 - 400 * c], hit: c < .3, m: { f: [620, HY], s: 1, r: 5 * Math.sin(t * 24) } }; }
  if (u < .9) { const c = (u - .62) / .28; return { b: [lerp(770, 400, ease(c)), 1508, -200 - 500 * c], m: { f: [lerp(620, HX, ease(c)), HY - 34 * Math.abs(Math.sin(Math.PI * 2 * c)) * (1 - c)], s: 1, r: -360 * c } }; }
  return { b: [400, 1508, -700], m: { f: [HX, HY], s: 1, r: -8 + 5 * Math.sin(t * 14) * (1 - (u - .9) / .1) } };
}
// Gag Teil 3 (Ausrutscher): Schalti stolpert ueber das LAN-Kabel, dabei rastet der Stecker ein
function i4cable(q, D, t) { const u = cl(q / Math.max(2.4, D - .1)), HX = 220, HY = 1537;
  if (u < .34) { const x = lerp(HX, 560, u / .34); return { taut: 0, plug: 0, m: { f: [x, HY], s: 1, walk: true, r: -3 } }; }
  if (u < .5) { const c = (u - .34) / .16; return { taut: 1, plug: cl(c * 1.6), m: { f: [560 + 90 * c, HY - 34 * Math.sin(Math.PI * c)], s: 1, r: 360 * c } }; }
  if (u < .68) { const c = (u - .5) / .18; return { taut: 1 - c, plug: 1, m: { f: [650, HY], s: 1, r: 22 - 6 * Math.sin(t * 14) * (1 - c) } }; }
  const c = (u - .68) / .32; return { taut: 0, plug: 1, m: { f: [lerp(650, HX, ease(c)), HY - 14 * Math.abs(Math.sin(t * 14)) * (1 - c)], s: 1, r: 6 * (1 - c), flip: c < .9 } };
}

// ---------- Einstieg: Das Spiel haengt, Schalti ruckelt mit und teleportiert in eine Wand ----------
WORLD.h7i4 = function (sc, ev, t, lt) {
  const e = ev.lag, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e !== undefined && e > .55 ? e - .55 : undefined, t), CX = 600, CY = 890;
  let s = stage7(t, lt, '#07081C', e === undefined ? lc('#7C5CFF', '#FF5A5A', k) : '#FF5A5A', CX, CY), o = '', fl = '';
  const png = Math.round(20 + 280 * k * k), frz = e !== undefined || (k > .55 && Math.floor(t * 5) % 3 === 0), tt = frz ? Math.floor(t * 2) / 2 : t, px = CX - 190 + ((tt * 150) % 380);
  let g = '<path d="M' + (CX - 230) + ' ' + (CY + 70) + ' H' + (CX + 230) + '" stroke="#3DFF7A" stroke-width="10"/>'; for (let i = 0; i < 4; i++) g += '<rect x="' + (CX - 200 + ((i * 130 - tt * 90) % 460 + 460) % 460 - 30) + '" y="' + (CY + 30) + '" width="34" height="40" rx="6" fill="#FF7A59"/>';
  g += '<circle cx="' + px + '" cy="' + (CY + 34 - 60 * Math.abs(Math.sin(tt * 5))) + '" r="30" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/>';
  g += '<rect x="' + (CX - 228) + '" y="' + (CY - 140) + '" width="236" height="62" rx="16" fill="#0B1020" opacity=".85"/>' + svgT(CX - 212, CY - 96, 'Ping ' + png + ' ms', 40, pingCol(png), 'start');
  if (frz) g += '<g transform="translate(' + (CX + 150) + ' ' + (CY - 106) + ') rotate(' + (t * 300) + ')"><circle r="26" fill="none" stroke="#fff" stroke-width="9" stroke-dasharray="90 80"/></g>';
  o += mon4(CX - 260, CY - 180, 520, 330, '#141C36', g);
  if (e !== undefined) { const wk = back(cl((e - .2) / .25)); fl += '<g transform="translate(455 1420) scale(' + wk + ')">'; for (let r = 0; r < 5; r++) for (let c = 0; c < 2; c++) fl += '<rect x="' + (-50 + c * 52 + (r % 2 ? -26 : 0)) + '" y="' + (-130 + r * 52) + '" width="48" height="48" rx="6" fill="#C0553B" stroke="#0B1020" stroke-width="4"/>'; fl += '</g>'; if (e > .6) fl += stars6(e, t); }
  s += pop7(CX, CY, lt, o) + fl + sweat7(t, e === undefined ? k * .6 : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7i4 = (ev, t, lt, sc) => { const e = ev.lag, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined) { if (e < .55) { const st = Math.floor(e / .09), xs = [220, 300, 240, 330, 260, 350, 300]; return { f: [xs[Math.min(st, 6)], 1537], s: 1, r: st % 2 ? 6 : -6, fx: st % 2 ? 'brightness(1.7)' : 'opacity(.6)' }; }
    const b = cl((e - .55) / .2); return { f: [312 - 60 * b, 1537], s: 1, r: -16 * b + 6 * Math.sin(t * 7) * b }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 12) };
};

// ---------- Teil 1: Datenpaket hin und zurueck, Ping in Millisekunden, hoher Ping ist Lag, 50 ms fuer Shooter ----------
WORLD.i4ping = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const pi = ev.ping, la = ev.lag, a = ev.act, slow = la !== undefined && a === undefined, X0 = 310, X1 = 760, Y = 880;
  const val = a !== undefined ? 38 : slow ? Math.round(lerp(38, 250, ease(cl(la / 1.2)))) : 38, per = slow ? 2.6 : 1.1, c = (t / per) % 1, out = c < .5, cc = out ? c * 2 : 2 - c * 2;
  s += mon4(90, 790, 210, 150, '#141C36', '<circle cx="195" cy="' + (880 - 30 * Math.abs(Math.sin(t * 5))) + '" r="22" fill="#FFD23F"/>') + srv4(830, 880, 1.15, pingCol(val));
  s += '<path d="M' + X0 + ' ' + (Y - 26) + ' H' + X1 + '" stroke="#3A4A7A" stroke-width="8" stroke-dasharray="16 12"/><path d="M' + X0 + ' ' + (Y + 26) + ' H' + X1 + '" stroke="#3A4A7A" stroke-width="8" stroke-dasharray="16 12"/>';
  if (lt > .6) s += pkt4(lerp(X0, X1, cc), Y + (out ? -26 : 26), 1, out ? '#FFD23F' : '#9BE7FF', 0) + '<path d="M' + (lerp(X0, X1, cc) + (out ? 40 : -40)) + ' ' + (Y + (out ? -26 : 26)) + ' l' + (out ? 22 : -22) + ' 0 m' + (out ? -10 : 10) + ' -9 l' + (out ? 10 : -10) + ' 9 l' + (out ? -10 : 10) + ' 9" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  if (pi !== undefined) { const k = back(cl(pi / .35)); s += '<g transform="translate(535 760) scale(' + (k * (slow ? 1 + .05 * Math.sin(t * 12) : 1)) + ')"><rect x="-170" y="-48" width="340" height="96" rx="28" fill="#0B1020" stroke="' + pingCol(val) + '" stroke-width="7"/>' + svgT(0, 18, 'Ping ' + val + ' ms', 52, pingCol(val)) + '</g>'; }
  if (a !== undefined) { const k = cl(a / .4), W0 = 760, mx = 110 + W0 * 38 / 150;
    s += '<g opacity="' + k + '"><rect x="110" y="1020" width="' + (W0 / 3) + '" height="44" rx="14" fill="#3DFF7A"/><rect x="' + (110 + W0 / 3) + '" y="1020" width="' + (W0 / 3) + '" height="44" fill="#FFD23F"/><rect x="' + (110 + 2 * W0 / 3) + '" y="1020" width="' + (W0 / 3) + '" height="44" rx="14" fill="#FF4D4D"/>' + svgT(110 + W0 / 6, 1052, 'bis 50', 30, '#0B1020') + svgT(110 + W0 / 2, 1052, 'bis 100', 30, '#0B1020') + svgT(110 + 5 * W0 / 6, 1052, 'Lag', 30, '#fff') + svgT(110, 1110, 'Millisekunden', 28, '#AEB9D6', 'start') + '<path d="M' + mx + ' 1012 l-16 -26 h32 Z" fill="#fff" transform="translate(0 ' + (-6 * Math.abs(Math.sin(t * 6))) + ')"/></g>'; }
  if (slow) { const g = i4rub(la, D6(sc, 2), t); for (const q of g.gh) s += '<g opacity="' + (.5 * q[1]) + '"><rect x="' + (q[0] - 120) + '" y="1392" width="240" height="120" rx="60" fill="none" stroke="#B9A6FF" stroke-width="7" stroke-dasharray="16 12"/></g>'; }
  h += slot(ev, [['panel', 'Datenpaket: zum Server und zurück'], ['ping', 'Diese Zeit heißt Ping', 'hot'], ['lag', 'Hoher Ping: alles kommt verspätet', 'red'], ['act', 'Shooter: höchstens etwa 50 ms', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i4ping = (ev, t, lt, sc) => (ev.lag !== undefined && ev.act === undefined) ? i4rub(ev.lag, D6(sc, 2), t).m : BIG();

// ---------- Teil 2: Tarif hilft kaum, wenig Bandbreite noetig, Weg zum Server, Paketverlust ----------
WORLD.i4band = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const we = ev.wenig, wg = ev.weg, a = ev.act;
  if (we === undefined) { const f = ease(cl((lt - .5) / 1)), an = (-120 + 220 * f + 3 * Math.sin(t * 20) * f) * Math.PI / 180;
    s += '<g transform="translate(310 930)"><path d="M-150 86 A173 173 0 1 1 150 86" stroke="#3A4A7A" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M-150 86 A173 173 0 1 1 150 86" stroke="#3DFF7A" stroke-width="30" fill="none" stroke-linecap="round" stroke-dasharray="' + (780 * f) + ' 800"/><path d="M0 0 L' + (130 * Math.sin(an)) + ' ' + (-130 * Math.cos(an)) + '" stroke="#fff" stroke-width="12" stroke-linecap="round"/><circle r="16" fill="#fff"/>' + svgT(0, 96, Math.round(250 * f), 60, '#fff') + svgT(0, 136, 'Mbit/s', 30, '#AEB9D6') + '</g>';
    s += chip3(700, 860, 'Weniger Lag?', 44, '#F4F6FB', '#0B1020', (lt - 1.6) / .3) + okx1(700, 990, 54, false, (lt - 2.3) / .3);
  } else if (wg === undefined) { const k = cl(we / .4);
    s += '<g opacity="' + k + '"><rect x="90" y="800" width="820" height="200" rx="100" fill="#141C36" stroke="#B9A6FF" stroke-width="8"/>' + svgT(500, 792, 'deine Leitung', 30, '#B9A6FF') + '<path d="M130 900 H870" stroke="#3DFF7A" stroke-width="14" stroke-linecap="round"/>'; for (let i = 0; i < 5; i++) { const c = (t * .4 + i / 5) % 1; s += pkt4(lerp(140, 860, c), 900, .55, '#FFD23F', 0); } s += '</g>' + chip3(500, 1070, 'Das Spiel braucht nur diesen Streifen', 34, '#3DFF7A', '#0B1020', (we - 1) / .3);
  } else if (a === undefined) { [[820, 'nah', 20, 520], [990, 'weit weg', 180, 880]].forEach((r, i) => { const k = cl((wg - .2 - i * .9) / .4), y = r[0], per = i ? 2.4 : .8, c = (t / per) % 1, cc = c < .5 ? c * 2 : 2 - c * 2; if (k <= 0) return;
      s += '<g opacity="' + k + '">' + mon4(90, y - 50, 120, 84, '#141C36') + '<path d="M230 ' + y + ' H' + (r[3] - 70) + '" stroke="#3A4A7A" stroke-width="8" stroke-dasharray="16 12"/>' + pkt4(lerp(240, r[3] - 80, cc), y, .7, '#FFD23F', 0) + srv4(r[3], y, .62, pingCol(r[2])) + svgT(i ? 230 : 600, i ? y + 74 : y - 10, r[1] + ': ' + r[2] + ' ms', 40, pingCol(r[2]), 'start') + '</g>'; });
    s += '<g opacity="' + cl((wg - 1.4) / .3) + '">' + svgT(900, 1126, 'Beispielwerte', 24, '#AEB9D6', 'end') + '</g>';
    const g = i4box(wg, D6(sc, 2), t); s += '<rect x="985" y="1440" width="60" height="110" rx="10" fill="#2A3350" stroke="#C9CFDD" stroke-width="5"/>' + pkt4(g.b[0], g.b[1], 1.5, '#FFD23F', g.b[2]) + (g.hit ? '<circle cx="950" cy="1500" r="40" fill="#fff" opacity=".6"/>' : '');
  } else { for (let i = 0; i < 6; i++) { const c = (t * .25 + i / 6) % 1, lost = i === 2, x = lerp(110, 620, c), dy = lost && c > .45 ? 500 * Math.pow(c - .45, 2) * 4 : 0; s += pkt4(x, 830 + dy, 1, lost ? '#FF4D4D' : '#FFD23F', lost ? dy * .6 : 0, lost ? cl(1.6 - dy / 120) : 1); }
    s += '<path d="M100 870 H640" stroke="#3A4A7A" stroke-width="8" stroke-dasharray="16 12"/>' + chip3(360, 960, 'Paket verloren', 36, '#FF4D4D', '#fff', (a - .5) / .3);
    const jp = Math.floor(t * 2.2) % 2, ex = jp ? 880 : 730, ey = jp ? 800 : 960;
    s += '<path d="M730 960 Q790 840 880 800" stroke="#FF7A9A" stroke-width="6" fill="none" stroke-dasharray="12 10"/><g opacity=".3"><circle cx="' + (jp ? 730 : 880) + '" cy="' + (jp ? 960 : 800) + '" r="44" fill="#FF5A8A"/></g><circle cx="' + ex + '" cy="' + ey + '" r="44" fill="#FF5A8A" stroke="#0B1020" stroke-width="6"/><circle cx="' + (ex - 14) + '" cy="' + (ey - 6) + '" r="8" fill="#0B1020"/><circle cx="' + (ex + 14) + '" cy="' + (ey - 6) + '" r="8" fill="#0B1020"/>' + svgT(805, 1080, 'Gegner springt', 32, '#FF7A9A'); }
  if (wg !== undefined && a === undefined) { }
  h += slot(ev, [['tarif', 'Schnellerer Tarif? Hilft selten'], ['wenig', 'Spiele brauchen wenig Bandbreite', 'hot'], ['weg', 'Weiter Weg zum Server: höherer Ping', 'red'], ['act', 'Paketverlust: Gegner teleportieren', 'red']]);
  return W(s + topShade(), h);
};
WMASC.i4band = (ev, t, lt, sc) => (ev.weg !== undefined && ev.act === undefined) ? i4box(ev.weg, D6(sc, 2), t).m : BIG();

// ---------- Teil 3: LAN statt WLAN, Stoerungen, naher Server, Downloads pausieren ----------
WORLD.i4fix = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const st = ev.stoer, se = ev.server, a = ev.act;
  if (se === undefined && a === undefined) { // unten LAN, oben WLAN
    const k = cl((lt - .4) / .4);
    s += '<g opacity="' + k + '">' + rout4(170, 1030, 1) + mon4(730, 970, 150, 100, '#141C36') + '<path d="M240 1036 H720" stroke="#3DFF7A" stroke-width="14" stroke-linecap="round"/>'; for (let i = 0; i < 4; i++) { const c = (t * .9 + i / 4) % 1; s += '<circle cx="' + lerp(250, 710, c) + '" cy="1036" r="9" fill="#fff"/>'; } s += svgT(480, 1010, 'LAN-Kabel', 34, '#3DFF7A') + '</g>';
    if (st !== undefined) { const k2 = cl(st / .4), jit = Math.round(40 + 60 * Math.abs(Math.sin(t * 3.3)));
      s += '<g opacity="' + k2 + '">' + rout4(170, 830, 1) + mon4(730, 770, 150, 100, '#141C36') + wifi4(300, 840, 1.1, '#FFD23F', t);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) s += '<rect x="' + (470 + c * 44 + (r % 2 ? -22 : 0)) + '" y="' + (740 + r * 42) + '" width="40" height="38" rx="5" fill="#C0553B" stroke="#0B1020" stroke-width="4"/>';
      s += wifi4(620, 760, .7, '#FF4D4D', t + 1) + svgT(640, 800, 'Nachbar', 26, '#FF7A9A') + '<path d="M580 850 l20 -16 l20 16 l20 -16 l20 16 l20 -16" stroke="#FF4D4D" stroke-width="8" fill="none" stroke-linejoin="round" opacity="' + (.5 + .5 * Math.sin(t * 14)) + '"/>' + svgT(805, 832, jit + ' ms', 30, pingCol(jit)) + '</g>' + (st > .8 ? svgT(805, 1032, '18 ms', 30, '#3DFF7A') : '');
      const g = i4cable(st, D6(sc, 1), t), sag = 26 * (1 - g.taut);
      s += '<path d="M-20 1560 Q300 ' + (1560 + sag) + ' 560 ' + (1560 - 22 * g.taut) + ' T' + (880 + 60 * g.plug) + ' 1556" stroke="#3DFF7A" stroke-width="12" fill="none" stroke-linecap="round"/><rect x="' + (878 + 60 * g.plug) + '" y="1540" width="50" height="32" rx="6" fill="#F4F6FB" stroke="#0B1020" stroke-width="5"/><rect x="985" y="1524" width="50" height="64" rx="8" fill="#2A3350" stroke="#C9CFDD" stroke-width="5"/>' + (g.plug >= 1 ? '<circle cx="970" cy="1512" r="' + (10 + 4 * Math.sin(t * 10)) + '" fill="#3DFF7A"/>' : ''); }
  } else if (a === undefined) { const k = back(cl(se / .35)), R = [['Frankfurt', 18], ['London', 34], ['New York', 110]];
    s += '<g transform="translate(500 900) scale(' + k + ') translate(-500 -900)"><rect x="110" y="725" width="780" height="340" rx="30" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + svgT(140, 778, 'Server wählen', 34, '#5A6686', 'start');
    R.forEach((r, i) => { const y = 846 + i * 76, sel = i === 0 && se > 1.3; s += '<rect x="130" y="' + (y - 34) + '" width="740" height="68" rx="18" fill="' + (sel ? '#3DFF7A' : '#E6EAF4') + '"/>' + svgT(160, y + 14, r[0], 40, '#0B1020', 'start') + svgT(760, y + 14, r[1] + ' ms', 40, sel ? '#0B1020' : (r[1] > 100 ? '#D43C3C' : '#0B1020'), 'end') + (sel ? '<path d="M800 ' + y + ' l12 14 l24 -28" stroke="#0B1020" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' : ''); });
    s += '</g><g opacity="' + cl((se - .6) / .3) + '">' + svgT(890, 1108, 'Beispielwerte', 24, '#AEB9D6', 'end') + '</g>';
  } else { [[300, 'Download'], [700, 'Stream']].forEach((q, i) => { const k = back(cl((a - i * .4) / .35)), pz = a > 1 + i * .3;
      s += '<g transform="translate(' + q[0] + ' 880) scale(' + k + ')"><rect x="-160" y="-130" width="320" height="260" rx="40" fill="#141C36" stroke="' + (pz ? '#3DFF7A' : '#FF7A59') + '" stroke-width="8"/>' + (i ? '<rect x="-70" y="-84" width="140" height="96" rx="16" fill="#3DB8FF"/><path d="M-14 -58 L26 -36 L-14 -14 Z" fill="#fff"/>' : '<path d="M0 -90 V-10 M-36 -44 L0 -6 L36 -44" stroke="#FFD23F" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-60 12 H60" stroke="#FFD23F" stroke-width="14" stroke-linecap="round"/>') + svgT(0, 76, q[1], 40, '#fff') + '</g>' + (pz ? '<g transform="translate(' + (q[0] + 110) + ' 770) scale(' + back(cl((a - 1 - i * .3) / .3)) + ')"><circle r="44" fill="#3DFF7A" stroke="#0B1020" stroke-width="6"/><path d="M-12 -18 V18 M12 -18 V18" stroke="#0B1020" stroke-width="12" stroke-linecap="round"/></g>' : ''); }); }
  h += slot(ev, [['lan', 'LAN-Kabel statt WLAN'], ['stoer', 'Funk wird gestört, Kabel nicht', 'hot'], ['server', 'Server in deiner Nähe wählen'], ['act', 'Downloads und Streams pausieren', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i4fix = (ev, t, lt, sc) => (ev.stoer !== undefined && ev.server === undefined && ev.act === undefined) ? i4cable(ev.stoer, D6(sc, 1), t).m : BIG();

// ---------- Schluss ----------
WORLD.i4outro = function (sc, ev, t) { return W(net6(t) + mon4(690, 930, 190, 130, '#141C36', svgT(785, 1010, '18 ms', 40, '#3DFF7A')) + topShade()); };
