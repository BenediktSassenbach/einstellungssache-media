// Informatik I003 "Wie schnell knackt ein Hacker dein Passwort?" (Bauplan wie I006). Etikett y=600, Grafik y=700 bis 1130. Nutzt Helfer aus viz_i001/i002/i006.js.

// ---------- Helfer ----------
// Vorhaengeschloss: op = 0 zu, 1 offen
function lock3(x, y, s, op, col) { const lift = 34 * op, rot = -38 * op; return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><g transform="translate(0 ' + (-lift) + ') rotate(' + rot + ' 34 -30)"><path d="M-34 -30 V-58 A34 34 0 0 1 34 -58 V-30" stroke="#C9CFDD" stroke-width="16" fill="none" stroke-linecap="round"/></g><rect x="-58" y="-30" width="116" height="96" rx="20" fill="' + (col || '#FFD23F') + '" stroke="#0B1020" stroke-width="6"/><circle cx="0" cy="10" r="12" fill="#0B1020"/><rect x="-5" y="12" width="10" height="26" rx="5" fill="#0B1020"/></g>'; }
function gpu3(x, y, s, t, on) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect x="-44" y="-28" width="88" height="56" rx="10" fill="#2A3350" stroke="' + (on ? '#3DFF7A' : '#8A93A8') + '" stroke-width="5"/><g transform="rotate(' + (on ? t * 900 : 0) + ')"><circle r="20" fill="#0B1020"/><path d="M0 -18 Q10 -6 0 0 Q-10 6 0 18 M-18 0 Q-6 -10 0 0 Q6 10 18 0" stroke="#C9CFDD" stroke-width="5" fill="none"/></g><rect x="-40" y="28" width="60" height="8" fill="#FFD23F"/></g>'; }
function key3(x, y, s, col, rot) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')"><circle cx="-30" cy="0" r="22" fill="none" stroke="' + col + '" stroke-width="12"/><path d="M-8 0 H52 M30 0 V18 M46 0 V14" stroke="' + col + '" stroke-width="12" stroke-linecap="round"/></g>'; }
function chip3(x, y, txt, sz, fill, col, k, w) { if (k <= 0) return ''; w = w || txt.length * sz * .58 + 50; return '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)) + ')"><rect x="' + (-w / 2) + '" y="' + (-sz * .85) + '" width="' + w + '" height="' + (sz * 1.7) + '" rx="' + (sz * .45) + '" fill="' + fill + '" stroke="#0B1020" stroke-width="5"/>' + svgT(0, sz * .36, txt, sz, col) + '</g>'; }

// Gag Teil 2 (Abwurf): Das Passwort waechst und schiebt Schalti vor sich her, bis er aufspringt und zurueckreitet
function i3push(q, D, t) { const u = cl(q / Math.max(2.6, D - .1)), HX = 220, HY = 1537;
  if (u < .12) return { fr: lerp(-40, 60, u / .12), m: { f: [HX, HY], s: 1, r: 4 * Math.sin(t * 20) } };
  if (u < .56) { const c = (u - .12) / .44, fr = lerp(60, 600, c); return { fr, m: { f: [fr + 160 + 3 * Math.sin(t * 40), HY], s: 1, r: 14 + 3 * Math.sin(t * 18) } }; }
  if (u < .68) { const c = (u - .56) / .12; return { fr: 600, m: { f: [lerp(760, 560, c), HY - 34 * Math.sin(Math.PI * c) - 26 * c], s: 1, r: -360 * c, flip: true } }; }
  if (u < .92) { const c = (u - .68) / .24, fr = lerp(600, 240, c); return { fr, m: { f: [fr - 40, HY - 26], s: 1, r: 5 * Math.sin(t * 12), flip: true } }; }
  const c = (u - .92) / .08; return { fr: lerp(240, -60, c), m: { f: [HX - 20 + 20 * c, HY - 26 * (1 - c)], s: 1, r: 4 * Math.sin(t * 16) * (1 - c) } };
}

// ---------- Einstieg: Zahlenschloss rattert, springt auf, der Buegel trifft Schalti ----------
WORLD.h7i3 = function (sc, ev, t, lt) {
  const e = ev.knack, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e, t), CX = 590, CY = 905;
  let s = stage7(t, lt, '#07081C', e === undefined ? lc('#7C5CFF', '#FF5A5A', k) : '#3DFF7A', CX, CY), o = '', fl = '';
  const jit = e === undefined ? 6 * k * k * Math.sin(t * 50) : 0, op = e === undefined ? 0 : cl(e / .12);
  // Buegel fliegt beim Gag weg
  let bx = CX, by = CY - 150, br = 0;
  if (e !== undefined) { const c = cl((e - .08) / .42); bx = lerp(CX, 300, c); by = lerp(CY - 190, 1320, c) - 280 * Math.sin(Math.PI * c); br = -420 * c; if (c >= 1) { const c2 = cl((e - .5) / .7); bx = 300 + 280 * c2; by = 1320 - 200 * Math.sin(Math.PI * .9 * c2) + 520 * c2 * c2; br = -420 - 300 * c2; } }
  o += '<g transform="translate(' + jit + ' 0)">' + '<g transform="translate(' + bx + ' ' + by + ') rotate(' + br + ')"><path d="M-84 60 V-10 A84 84 0 0 1 84 -10 V60" stroke="#C9CFDD" stroke-width="40" fill="none" stroke-linecap="round"/></g>';
  o += '<rect x="' + (CX - 150) + '" y="' + (CY - 90) + '" width="300" height="290" rx="46" fill="' + (e === undefined ? '#FFD23F' : '#3DFF7A') + '" stroke="#0B1020" stroke-width="9"/>';
  for (let i = 0; i < 4; i++) { const stop = e !== undefined || k > .3 + i * .22, d = stop ? [7, 3, 9, 1][i] : Math.floor(t * (17 + i * 5)) % 10; o += '<rect x="' + (CX - 124 + i * 64) + '" y="' + (CY - 20) + '" width="56" height="92" rx="12" fill="#0B1020"/>' + svgT(CX - 96 + i * 64, CY + 48, d, 64, stop ? '#3DFF7A' : '#fff'); }
  o += '<circle cx="' + CX + '" cy="' + (CY + 130) + '" r="18" fill="#0B1020"/></g>';
  if (e !== undefined && e > .5) fl += stars6(e, t);
  s += pop7(CX, CY, lt, o) + fl + word7('KNACK!', 610, 690, e, '#3DFF7A', -8) + sweat7(t, e === undefined ? k * .6 : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7i3 = (ev, t, lt, sc) => { const e = ev.knack, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined && e > .5) { const b = cl((e - .5) / .25); return { f: [220 - 30 * b, 1537], s: 1, r: -12 * b + 6 * Math.sin(t * 7) }; }
  return { f: [220, 1537], s: 1, r: 3 * k * Math.sin(t * 12) };
};

// ---------- Teil 1: durchprobieren, Grafikkarten, 8 Ziffern sofort, 8 Kleinbuchstaben 2 Wochen ----------
WORLD.i3brute = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const gp = ev.gpu, zi = ev.ziffern, a = ev.act, open = zi === undefined ? 0 : ease(cl((zi - .5) / .3));
  s += lock3(210, 900, 1.9, a === undefined ? open : 1, a !== undefined || open > .5 ? '#3DFF7A' : '#FFD23F');
  if (a === undefined) { const hit = zi !== undefined && zi > .5, num = hit ? '12345678' : String(Math.floor(t * 912673) % 100000000).padStart(8, '0');
    s += '<rect x="390" y="745" width="520" height="150" rx="28" fill="#0B1020" stroke="' + (hit ? '#3DFF7A' : '#B9A6FF') + '" stroke-width="7"/>' + svgT(416, 790, hit ? 'Treffer!' : 'Versuch läuft …', 30, hit ? '#3DFF7A' : '#AEB9D6', 'start') + svgT(650, 872, num, 76, hit ? '#3DFF7A' : '#fff');
    if (gp !== undefined) for (let i = 0; i < 16; i++) s += gpu3(430 + (i % 8) * 62, 960 + Math.floor(i / 8) * 86, .62 * back(cl((gp - i * .06) / .3)), t + i, true);
    if (zi !== undefined) s += chip3(650, 1104, 'sofort geknackt', 32, '#FF4D4D', '#fff', (zi - .6) / .3);
  } else { const k1 = back(cl(a / .3)), k2 = back(cl((a - .5) / .3));
    s += '<g transform="translate(650 820) scale(' + k1 + ')"><rect x="-260" y="-70" width="520" height="140" rx="30" fill="#141C36" stroke="#FF4D4D" stroke-width="7"/>' + svgT(-230, -8, '8 Ziffern', 44, '#fff', 'start') + svgT(-230, 44, 'sofort', 44, '#FF4D4D', 'start') + svgT(230, 22, '12345678', 44, '#8A93A8', 'end') + '</g>';
    s += '<g transform="translate(650 1000) scale(' + k2 + ')"><rect x="-260" y="-80" width="520" height="160" rx="30" fill="#141C36" stroke="#FF9A3B" stroke-width="9"/>' + svgT(-230, -14, '8 Kleinbuchstaben', 40, '#fff', 'start') + svgT(-230, 48, 'ca. 2 Wochen', 50, '#FF9A3B', 'start') + '</g>'; }
  if (gp !== undefined && zi === undefined) { const g = i2heart(gp, D6(sc, 1), t), fx = 650, fy = 1470, on = g.u > .36;
    s += '<rect x="' + (fx - 8) + '" y="' + (fy + 40) + '" width="16" height="50" fill="#5A6686"/><ellipse cx="' + fx + '" cy="' + (fy + 92) + '" rx="60" ry="12" fill="#5A6686"/><circle cx="' + fx + '" cy="' + fy + '" r="66" fill="#141C36" stroke="#C9CFDD" stroke-width="7"/><g transform="translate(' + fx + ' ' + fy + ') rotate(' + (t * (on ? 1400 : 120)) + ')"><path d="M0 0 Q26 -50 0 -56 Q-12 -28 0 0 M0 0 Q50 26 56 0 Q28 -12 0 0 M0 0 Q-26 50 0 56 Q12 28 0 0 M0 0 Q-50 -26 -56 0 Q-28 12 0 0" fill="#B9A6FF"/></g>';
    if (on && g.u < .78) for (let i = 0; i < 6; i++) { const c = (t * 2.2 + i / 6) % 1; s += '<path d="M' + (fx - 80 - 380 * c) + ' ' + (fy - 60 + i * 24) + ' h-70" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="' + (.7 * (1 - c)) + '"/>'; } }
  h += slot(ev, [['panel', 'Alle Kombinationen durchprobieren'], ['gpu', 'Viele Grafikkarten rechnen parallel', 'hot'], ['ziffern', '8 Ziffern: sofort geknackt', 'red'], ['act', '8 Kleinbuchstaben: ca. 2 Wochen', 'red']]);
  return W(s + topShade(), h);
};
WMASC.i3brute = (ev, t, lt, sc) => (ev.gpu !== undefined && ev.ziffern === undefined) ? i2heart(ev.gpu, D6(sc, 1), t).m : BIG();

// ---------- Teil 2: Tabelle, Zeichenarten, Laenge, nur zufaellige Passwoerter ----------
WORLD.i3len = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const ta = ev.tab === undefined ? 0 : ev.tab, mi = ev.mix, la = ev.lang, a = ev.act;
  const R = [['nur Ziffern', 'sofort', .03, '#FF4D4D'], ['nur Kleinbuchstaben', '2 Wochen', .16, '#FF7A59'], ['Groß und klein', '12 Jahre', .5, '#FFD23F'], ['plus Ziffern', '50 Jahre', .7, '#9BE08A'], ['plus Sonderzeichen', '132 Jahre', .92, '#3DFF7A']];
  if (la === undefined && a === undefined) { s += '<g opacity="' + cl((ta - .2) / .3) + '">' + svgT(90, 742, 'Passwort mit 8 Zeichen', 34, '#B9A6FF', 'start') + '</g>';
    R.forEach((r, i) => { const e0 = i < 2 ? ta - .6 - i * .7 : (mi === undefined ? -1 : mi - .2 - (i - 2) * .9), k = cl(e0 / .3), g = ease(cl((e0 - .1) / .7)), y = 800 + i * 68; if (k <= 0) return;
      s += '<g opacity="' + k + '">' + svgT(90, y + 12, r[0], 32, '#fff', 'start') + '<rect x="420" y="' + (y - 17) + '" width="' + (300 * r[2] * g + 10) + '" height="34" rx="17" fill="' + r[3] + '"/>' + svgT(440 + 300 * r[2] * g, y + 12, r[1], 34, r[3], 'start') + '</g>'; });
  } else if (a === undefined) { [['8 Zeichen', '2 Wochen', '#FF7A59'], ['9 Zeichen', '1 Jahr', '#FFD23F'], ['10 Zeichen', '26 Jahre', '#3DFF7A']].forEach((c, i) => { const k = back(cl((la - .3 - i * .8) / .3)), x = 190 + i * 300;
      s += '<g transform="translate(' + x + ' 880) scale(' + k + ')"><rect x="-120" y="-90" width="240" height="180" rx="30" fill="#141C36" stroke="' + c[2] + '" stroke-width="7"/>' + svgT(0, -26, c[0], 38, '#fff') + svgT(0, 44, c[1], 46, c[2]) + '</g>';
      if (i < 2) s += '<g transform="translate(' + (x + 150) + ' 880) scale(' + back(cl((la - .7 - i * .8) / .3)) + ')"><circle r="34" fill="#7C5CFF" stroke="#0B1020" stroke-width="5"/>' + svgT(0, 12, '×26', 30, '#fff') + '</g>'; });
    s += '<g opacity="' + cl((la - .6) / .3) + '">' + svgT(90, 1040, 'Kleinbuchstaben, gerundet', 28, '#AEB9D6', 'start') + '</g>';
    const fr = i3push(la, D6(sc, 2), t).fr; s += '<rect x="-60" y="1524" width="' + (fr + 60) + '" height="40" rx="20" fill="#141C36" stroke="#3DFF7A" stroke-width="6"/>'; for (let x = fr - 28; x > 0; x -= 44) s += '<circle cx="' + x + '" cy="1544" r="9" fill="#3DFF7A"/>';
  } else { ['123456', 'passwort', 'dein Name'].forEach((w, i) => { const k = (a - .2 - i * .5) / .3, y = 800 + i * 110; if (k <= 0) return;
      s += '<g transform="translate(470 ' + y + ') scale(' + back(cl(k)) + ')"><rect x="-380" y="-46" width="760" height="92" rx="26" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + svgT(-350, 18, w, 50, '#0B1020', 'start') + svgT(230, 16, 'sofort', 44, '#FF4D4D', 'end') + '</g>' + okx1(790, y, 30, false, k - .5); }); }
  h += slot(ev, [['tab', 'Tabelle 2026 von Hive Systems'], ['mix', 'Alle Zeichenarten: rund 132 Jahre', 'hot'], ['lang', 'Jedes Zeichen mehr vervielfacht die Zeit', 'hot'], ['act', 'Gilt nur für zufällige Passwörter', 'red']]);
  return W(s + topShade(), h);
};
WMASC.i3len = (ev, t, lt, sc) => ev.act !== undefined ? BIG() : ev.lang !== undefined ? i3push(ev.lang, D6(sc, 2), t).m : BIG();

// ---------- Teil 3: ganzer Satz, eigenes Passwort pro Konto, Passwort-Manager, Zwei-Faktor ----------
WORLD.i3safe = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const ei = ev.eigen, ma = ev.manager, a = ev.act;
  if (ei === undefined && ma === undefined && a === undefined) { const P = 'Mein-Hund-frisst-3-Socken!', n = Math.min(P.length, Math.floor(Math.max(0, lt - .6) * 14)), f = n / P.length;
    s += '<rect x="80" y="760" width="830" height="120" rx="30" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + svgT(110, 838, P.slice(0, n) + (n < P.length && Math.floor(t * 4) % 2 ? '|' : ''), 50, '#0B1020', 'start');
    s += '<rect x="80" y="930" width="830" height="40" rx="20" fill="#141C36"/><rect x="80" y="930" width="' + (830 * f) + '" height="40" rx="20" fill="' + lc('#FF4D4D', '#3DFF7A', f) + '"/>' + svgT(80, 1040, n + ' Zeichen', 44, '#fff', 'start') + (f >= 1 ? chip3(690, 1026, 'stark', 44, '#3DFF7A', '#0B1020', 1) : '');
  } else if (ma === undefined && a === undefined) { [['Mail', '#3DB8FF'], ['Spiel', '#FF5A8A'], ['Shop', '#FFD23F']].forEach((c, i) => { const k = back(cl((ei - .1 - i * .3) / .3)), x = 200 + i * 290;
      s += '<g transform="translate(' + x + ' 840) scale(' + k + ')"><rect x="-110" y="-90" width="220" height="180" rx="34" fill="#141C36" stroke="' + c[1] + '" stroke-width="7"/>' + svgT(0, -30, c[0], 42, '#fff') + lock3(0, 36, .55, 0, c[1]) + '</g>' + key3(x + 10, 1030, 1.2 * back(cl((ei - .5 - i * .3) / .3)), c[1], -20 + 6 * Math.sin(t * 4 + i)); });
  } else { const D = D6(sc, 2), g = a === undefined ? i1stamp(ma, D, t) : { p: 0, done: 1 }, k = back(cl((a === undefined ? ma : 1) / .35));
    // Tresorrad links
    s += '<g transform="translate(205 962) scale(' + k + ')"><rect x="-100" y="-76" width="200" height="170" rx="24" fill="#5A6686" stroke="#0B1020" stroke-width="7"/><g transform="rotate(' + (g.done ? 300 : g.p * 300 + 0) + ')"><circle r="56" fill="none" stroke="' + (g.done ? '#3DFF7A' : '#F4F6FB') + '" stroke-width="14"/><path d="M0 -56 V56 M-56 0 H56 M-40 -40 L40 40 M40 -40 L-40 40" stroke="' + (g.done ? '#3DFF7A' : '#F4F6FB') + '" stroke-width="9"/><circle r="14" fill="#0B1020"/></g></g>';
    if (a === undefined) { s += '<g transform="translate(630 852) scale(' + k + ') translate(-630 -852)"><rect x="350" y="722" width="560" height="270" rx="28" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + svgT(378, 770, 'Passwort-Manager', 34, '#5A6686', 'start');
      ['Mail', 'Spiel', 'Shop'].forEach((n, i) => { const y = 826 + i * 56; s += '<line x1="372" y1="' + (y - 28) + '" x2="888" y2="' + (y - 28) + '" stroke="#DDE2EE" stroke-width="3"/><rect x="376" y="' + (y - 17) + '" width="34" height="34" rx="9" fill="' + ['#3DB8FF', '#FF5A8A', '#FFD23F'][i] + '"/>' + svgT(426, y + 12, n, 34, '#0B1020', 'start') + svgT(880, y + 12, '••••••••••••', 30, '#5A6686', 'end'); });
      s += '</g>' + (g.done ? chip3(630, 1062, 'sicher verwahrt', 36, '#3DFF7A', '#0B1020', 1) : ''); }
    else { const k1 = back(cl(a / .35)), k2 = back(cl((a - .6) / .35)), code = ['4', '8', '2', '9', '1', '7'];
      s += lock3(440, 925, 1.3 * k1, 0, '#FFD23F') + '<g transform="translate(560 920) scale(' + k2 + ')">' + svgT(0, 30, '+', 90, '#fff') + '</g>' + '<g transform="translate(760 925) scale(' + k2 + ') translate(-760 -925)">' + phoneF(650, 745, 220, 360, '#1B2748') + svgT(760, 830, 'Code', 34, '#AEB9D6'); code.forEach((c, i) => { s += '<g opacity="' + cl((a - 1 - i * .12) / .15) + '"><rect x="' + (668 + (i % 3) * 62) + '" y="' + (860 + Math.floor(i / 3) * 86) + '" width="56" height="74" rx="12" fill="#F4F6FB"/>' + svgT(696 + (i % 3) * 62, 916 + Math.floor(i / 3) * 86, c, 50, '#0B1020') + '</g>'; }); s += '</g>' + okx1(870, 760, 34, true, (a - 1.9) / .3); }
  }
  h += slot(ev, [['satz', 'Lang: am besten ein ganzer Satz'], ['eigen', 'Jedes Konto: eigenes Passwort', 'hot'], ['manager', 'Passwort-Manager merkt sie sich'], ['act', 'Zwei-Faktor-Anmeldung einschalten', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i3safe = (ev, t, lt, sc) => ev.act !== undefined ? BIG() : ev.manager !== undefined ? i1stamp(ev.manager, D6(sc, 2), t).m : BIG();

// ---------- Schluss ----------
WORLD.i3outro = function (sc, ev, t) { return W(net6(t) + lock3(790, 1010, 1.3, 0, '#3DFF7A') + key3(690, 1090, 1, '#FFD23F', -25 + 5 * Math.sin(t * 3)) + topShade()); };
