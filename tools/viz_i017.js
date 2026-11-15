// Informatik I017 "Ist der Inkognito-Modus wirklich anonym?" (Bauplan wie I004, Einstieg mit Aufhaenger = 5 Zeilen). Etikett y=600, Grafik y=700 bis 1130. Nutzt Helfer aus viz_i001/i003/i004/i006.js.

// ---------- Helfer ----------
// Augenmaske als neutrales Zeichen fuer "privat"
function mask17(x, y, s, col) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-100 -20 Q-60 -52 0 -30 Q60 -52 100 -20 Q104 30 56 36 Q22 38 0 12 Q-22 38 -56 36 Q-104 30 -100 -20 Z" fill="' + (col || '#F4F6FB') + '" stroke="#0B1020" stroke-width="7" stroke-linejoin="round"/><ellipse cx="-48" cy="2" rx="24" ry="15" fill="#0B1020"/><ellipse cx="48" cy="2" rx="24" ry="15" fill="#0B1020"/></g>'; }
// Browserfenster, inner wird im Fenster gezeichnet
function win17(x, y, w, hgt, inner, fill) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hgt + '" rx="26" fill="' + (fill || '#1A1F33') + '" stroke="#F4F6FB" stroke-width="8"/><path d="M' + x + ' ' + (y + 62) + ' H' + (x + w) + '" stroke="#F4F6FB" stroke-width="6"/><circle cx="' + (x + 36) + '" cy="' + (y + 32) + '" r="10" fill="#FF5A5A"/><circle cx="' + (x + 68) + '" cy="' + (y + 32) + '" r="10" fill="#FFD23F"/><circle cx="' + (x + 100) + '" cy="' + (y + 32) + '" r="10" fill="#3DFF7A"/><rect x="' + (x + 130) + '" y="' + (y + 16) + '" width="' + (w - 160) + '" height="32" rx="16" fill="#0B1020"/>' + (inner || ''); }
// Auge, das auf (tx, ty) schaut
function eye17(x, y, r, tx, ty, k) { if (k <= 0) return ''; const an = Math.atan2(ty - y, tx - x), d = r * .38; return '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)) + ')"><ellipse rx="' + (r * 1.25) + '" ry="' + r + '" fill="#fff" stroke="#0B1020" stroke-width="6"/><circle cx="' + (d * Math.cos(an)) + '" cy="' + (d * Math.sin(an)) + '" r="' + (r * .48) + '" fill="#7C5CFF" stroke="#0B1020" stroke-width="4"/><circle cx="' + (d * Math.cos(an)) + '" cy="' + (d * Math.sin(an)) + '" r="' + (r * .2) + '" fill="#0B1020"/></g>'; }
function row17(x, y, w, txt, k, col, gone) { if (k <= 0) return ''; return '<g opacity="' + (cl(k) * (1 - cl(gone || 0))) + '" transform="translate(' + (60 * cl(gone || 0)) + ' 0)"><rect x="' + x + '" y="' + (y - 30) + '" width="' + w + '" height="60" rx="16" fill="' + (col || '#2C3350') + '"/>' + svgT(x + 24, y + 13, txt, 36, col ? '#0B1020' : '#F4F6FB', 'start') + '</g>'; }
function mast17(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 -90 L-44 60 H44 Z" fill="none" stroke="#C9CFDD" stroke-width="9" stroke-linejoin="round"/><path d="M-26 0 H26 M-36 34 H36" stroke="#C9CFDD" stroke-width="7"/><circle cy="-96" r="12" fill="#FFD23F"/></g>'; }
const D17 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3.4;

// Gag Teil 2 (Verfolgung): Schalti schleicht davon, die Augen und ein Lichtkegel folgen ihm, er erschrickt und flitzt zurueck
function i17sneak(q, D, t) { const u = cl(q / Math.max(3, D - .1)), HX = 220, HY = 1537, X1 = 660;
  if (u < .45) { const c = u / .45, x = lerp(HX, X1, c); return { x, lit: cl(c * 3), m: { f: [x, HY - 8 * Math.abs(Math.sin(t * 7))], s: 1, r: -5 + 3 * Math.sin(t * 7) } }; }
  if (u < .62) { const c = (u - .45) / .17; return { x: X1, lit: 1, m: { f: [X1, HY - 30 * Math.sin(Math.PI * cl(c * 2.5))], s: 1, r: c > .4 ? 6 * Math.sin(t * 26) : 0, flip: c > .2 } }; }
  if (u < .9) { const c = (u - .62) / .28, x = lerp(X1, HX, ease(c)); return { x, lit: 1, m: { f: [x, HY - 16 * Math.abs(Math.sin(t * 16))], s: 1, r: 8 + 5 * Math.sin(t * 16), flip: true } }; }
  return { x: HX, lit: 1 - (u - .9) / .1, m: { f: [HX, HY], s: 1, r: 5 * Math.sin(t * 20) * (1 - (u - .9) / .1) } };
}

// ---------- Einstieg: Schalti schleicht im Inkognito-Fenster los, das Licht geht an und lauter Augen starren ihn an ----------
WORLD.h7i17 = function (sc, ev, t, lt) {
  const e = ev.licht, end = sc.lines[4] ? sc.lines[4].start - sc.start : 8, k = cl(lt / end), sh = shake7(e, t), CX = 600, CY = 890;
  let s = stage7(t, lt, '#07081C', e === undefined ? '#7C5CFF' : '#FFE14D', CX, CY), o = '', fl = '';
  o += win17(CX - 250, CY - 170, 500, 340, mask17(CX, CY + 10, 1.3) + svgT(CX, CY + 122, 'Inkognito', 44, '#AEB9D6'));
  if (e !== undefined) { const kk = cl(e / .2);
    fl += '<path d="M150 300 L60 1600 L420 1600 L290 300 Z" fill="#FFE14D" opacity="' + (.2 * kk) + '"/><ellipse cx="230" cy="1580" rx="200" ry="30" fill="#FFE14D" opacity="' + (.35 * kk) + '"/>';
    [[500, 1380, 46], [680, 1350, 54], [850, 1400, 44], [590, 1510, 42], [770, 1530, 48], [890, 1560, 36]].forEach((q, i) => { fl += eye17(q[0], q[1], q[2], 230, 1440, (e - .1 - i * .06) / .25); });
    fl += word7('ERTAPPT!', 560, 700, e, '#FFE14D', -6); }
  s += pop7(CX, CY, lt, o) + fl + sweat7(t, e === undefined ? k * .7 : 1);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7i17 = (ev, t, lt, sc) => { const e = ev.licht, end = sc.lines[4] ? sc.lines[4].start - sc.start : 8, k = cl(lt / end);
  if (e !== undefined) { const c = cl(e / .3); return { f: [220, 1537 - 34 * Math.sin(Math.PI * c)], s: 1, r: c < 1 ? 0 : 5 * Math.sin(t * 24) * (1 - cl((e - 1.6) / .6)) }; }
  return { f: [220 + 26 * Math.sin(t * 1.6) * k, 1537 - 7 * Math.abs(Math.sin(t * 6)) * k], s: 1, r: -5 * k };
};

// ---------- Teil 1: raeumt nur auf dem Geraet auf, Verlauf und Cookies weg, Mitnutzer sieht nichts, Downloads und Lesezeichen bleiben ----------
WORLD.i17lokal = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const we = ev.weg, si = ev.sieht, a = ev.act, R = ['Verlauf', 'Cookies', 'Formulardaten'];
  let inner = mask17(790, 742, .34);
  R.forEach((r, i) => { inner += row17(196, 824 + i * 74, 430, r, (lt - .6 - i * .25) / .3, null, we === undefined ? 0 : (we - .5 - i * .35) / .3); });
  if (a !== undefined) ['Downloads', 'Lesezeichen'].forEach((r, i) => { inner += row17(196, 824 + i * 74, 430, r, (a - .2 - i * .3) / .3, '#FFD23F'); });
  s += win17(170, 720, 680, 370, inner);
  if (we !== undefined && a === undefined) s += '<g transform="translate(780 ' + (752 + 0) + ') scale(' + back(cl(we / .3)) + ')"></g>' + chip3(735, 900, 'weg', 44, '#FF5A5A', '#fff', (we - 1.5) / .3);
  if (si !== undefined && a === undefined) s += eye17(760, 1010, 50, 400, 880, si / .3) + okx1(560, 900, 44, true, (si - .9) / .3);
  h += slot(ev, [['geraet', 'Räumt nur auf deinem Gerät auf'], ['weg', 'Verlauf und Cookies: weg', 'hot'], ['sieht', 'Wer dein Handy nimmt, sieht nichts'], ['act', 'Downloads und Lesezeichen bleiben', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i17lokal = () => BIG();

// ---------- Teil 2: Seiten sehen dich, Anbieter und Netz-Betreiber auch, IP bleibt sichtbar, Vergleich 2024 ----------
WORLD.i17augen = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const an = ev.anb, ip = ev.ip, a = ev.act, Y = 930;
  if (a === undefined) { const sn = an !== undefined && ip === undefined ? i17sneak(an, D17(sc, 1), t) : null, tx = sn ? sn.x : 190, ty = sn ? 1440 : Y, c = (t * .45) % 1;
    s += '<path d="M250 ' + Y + ' H780" stroke="#3A4A7A" stroke-width="8" stroke-dasharray="16 12"/>' + phoneF(120, Y - 110, 120, 220, '#1A1F33', mask17(180, Y, .42)) + mast17(500, Y - 10, 1) + srv4(840, Y, 1.15, '#3DFF7A') + pkt4(lerp(260, 770, c), Y, 1, '#FFD23F', 0);
    s += svgT(840, Y + 130, 'Website', 34, '#AEB9D6') + (an !== undefined ? svgT(500, Y + 130, 'Anbieter', 34, '#AEB9D6') : '');
    s += eye17(840, Y - 150, 44, tx, ty, (lt - 1) / .3) + (an !== undefined ? eye17(500, Y - 170, 44, tx, ty, an / .3) : '');
    if (ip !== undefined) { const px = lerp(260, 770, c); s += '<g transform="translate(' + px + ' ' + (Y - 62) + ') scale(' + back(cl(ip / .3)) + ')"><rect x="-120" y="-30" width="240" height="56" rx="16" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/>' + svgT(0, 12, 'Absender: IP', 32, '#0B1020') + '</g>'; }
    if (sn) s += '<ellipse cx="' + sn.x + '" cy="1582" rx="190" ry="28" fill="#FFE14D" opacity="' + (.3 * sn.lit) + '"/>';
  } else { const k = back(cl(a / .35));
    s += '<g transform="translate(500 900) scale(' + k + ') translate(-500 -900)"><rect x="130" y="740" width="740" height="330" rx="34" fill="#F4F6FB" stroke="#0B1020" stroke-width="7"/>' + svgT(170, 812, 'Vergleich nach Klage, 2024', 36, '#5A6686', 'start') + svgT(170, 900, 'Milliarden', 76, '#0B1020', 'start') + svgT(170, 968, 'Inkognito-Datensätze', 46, '#0B1020', 'start') + svgT(170, 1030, 'löschen oder anonymisieren', 36, '#5A6686', 'start');
    s += '<g transform="translate(770 900) rotate(' + (6 * Math.sin(t * 5)) + ')"><rect x="-50" y="-50" width="100" height="120" rx="14" fill="#FF5A5A" stroke="#0B1020" stroke-width="6"/><rect x="-62" y="-72" width="124" height="24" rx="10" fill="#FF5A5A" stroke="#0B1020" stroke-width="6"/><path d="M-22 -22 V44 M0 -22 V44 M22 -22 V44" stroke="#0B1020" stroke-width="6" stroke-linecap="round"/></g></g>'; }
  h += slot(ev, [['seite', 'Besuchte Seiten sehen dich weiter'], ['anb', 'Anbieter, Schule oder Firma auch', 'hot'], ['ip', 'Deine IP-Adresse bleibt sichtbar'], ['act', 'Google 2024: Daten löschen', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i17augen = (ev, t, lt, sc) => (ev.anb !== undefined && ev.ip === undefined && ev.act === undefined) ? i17sneak(ev.anb, D17(sc, 1), t).m : BIG();

// ---------- Teil 3: trotzdem nuetzlich, Geschenke am Familien-Tablet, fremdes Geraet, angemeldet kennt dich die Seite ----------
WORLD.i17nutzen = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const ge = ev.geschenk, fr = ev.fremd, a = ev.act;
  if (ge === undefined && fr === undefined && a === undefined) s += '<g transform="translate(0 ' + (8 * Math.sin(t * 2.4)) + ')">' + mask17(450, 900, 2.1 * back(cl((lt - .3) / .4))) + '</g>' + okx1(700, 800, 60, true, (lt - 1.1) / .3);
  else if (fr === undefined && a === undefined) { const k = back(cl(ge / .35)), gift = '<g transform="translate(400 915)"><rect x="-80" y="-40" width="160" height="110" rx="12" fill="#FF5A8A" stroke="#0B1020" stroke-width="6"/><rect x="-92" y="-70" width="184" height="40" rx="10" fill="#FF7AA6" stroke="#0B1020" stroke-width="6"/><rect x="-14" y="-70" width="28" height="140" fill="#FFD23F"/><path d="M0 -70 q-50 -60 -60 -10 q20 20 60 10 q50 -60 60 -10 q-20 20 -60 10" fill="none" stroke="#FFD23F" stroke-width="10"/></g>';
    s += '<g transform="translate(400 900) scale(' + k + ') translate(-400 -900)"><rect x="160" y="740" width="480" height="340" rx="34" fill="#0B1020" stroke="#F4F6FB" stroke-width="9"/><rect x="180" y="760" width="440" height="300" rx="20" fill="#1A1F33"/>' + gift + mask17(580, 792, .3) + '</g>' + eye17(790, 860, 50, 400, 900, (ge - .9) / .3) + chip3(790, 960, 'sieht nichts', 32, '#3DFF7A', '#0B1020', (ge - 1.4) / .3);
  } else { const k = back(cl((fr === undefined ? a : fr) / .35)), known = a !== undefined;
    s += '<g transform="translate(450 900) scale(' + (fr !== undefined && a === undefined ? k : 1) + ') translate(-450 -900)">' + mon4(170, 730, 560, 330, '#1A1F33', '<rect x="270" y="790" width="360" height="56" rx="14" fill="#2C3350"/>' + svgT(290, 829, known ? 'schalti@mail' : 'E-Mail', 34, known ? '#F4F6FB' : '#8A93A8', 'start') + '<rect x="270" y="862" width="360" height="56" rx="14" fill="#2C3350"/>' + svgT(290, 903, known ? '••••••••' : 'Passwort', 34, known ? '#F4F6FB' : '#8A93A8', 'start') + '<rect x="270" y="940" width="360" height="62" rx="18" fill="#7C5CFF"/>' + svgT(450, 983, 'Anmelden', 36, '#fff') + mask17(690, 770, .26)) + '</g>';
    if (known) s += chip3(770, 800, 'Hallo, Schalti!', 34, '#FFD23F', '#0B1020', (a - .8) / .3, 290) + eye17(800, 910, 46, 450, 900, (a - .5) / .3);
    else s += chip3(800, 880, 'fremdes Gerät', 30, '#F4F6FB', '#0B1020', (fr - .9) / .3, 250); }
  h += slot(ev, [['gut', 'Nützlich ist er trotzdem'], ['geschenk', 'Geschenke am Familien-Tablet', 'hot'], ['fremd', 'Anmelden an fremden Geräten'], ['act', 'Angemeldet? Die Seite kennt dich', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i17nutzen = () => BIG();

// ---------- Schluss ----------
WORLD.i17outro = function (sc, ev, t) { return W(net6(t) + win17(650, 930, 260, 180, mask17(780, 1050, .6)) + topShade()); };
