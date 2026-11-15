// TESTFOLGE I017T "Ist der Inkognito-Modus wirklich anonym?" im Vollbild-Design (Skript 2.0). Gleicher Text wie I017.
// Ort: Dach ueber einer Neon-Stadt bei Nacht. Zum Loeschen: diese Datei und videos/I017T.

// Kopien aus Version 1, damit Version 1 geloescht werden kann, ohne dass diese Datei bricht
function mask17b(x, y, s, col) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-100 -20 Q-60 -52 0 -30 Q60 -52 100 -20 Q104 30 56 36 Q22 38 0 12 Q-22 38 -56 36 Q-104 30 -100 -20 Z" fill="' + (col || '#F4F6FB') + '" stroke="#0B1020" stroke-width="7" stroke-linejoin="round"/><ellipse cx="-48" cy="2" rx="24" ry="15" fill="#0B1020"/><ellipse cx="48" cy="2" rx="24" ry="15" fill="#0B1020"/></g>'; }
function win17b(x, y, w, hgt, inner, fill) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hgt + '" rx="26" fill="' + (fill || '#1A1F33') + '" stroke="#F4F6FB" stroke-width="8"/><path d="M' + x + ' ' + (y + 62) + ' H' + (x + w) + '" stroke="#F4F6FB" stroke-width="6"/><circle cx="' + (x + 36) + '" cy="' + (y + 32) + '" r="10" fill="#FF5A5A"/><circle cx="' + (x + 68) + '" cy="' + (y + 32) + '" r="10" fill="#FFD23F"/><circle cx="' + (x + 100) + '" cy="' + (y + 32) + '" r="10" fill="#3DFF7A"/><rect x="' + (x + 130) + '" y="' + (y + 16) + '" width="' + (w - 160) + '" height="32" rx="16" fill="#0B1020"/>' + (inner || ''); }
function eye17b(x, y, r, tx, ty, k) { if (k <= 0) return ''; const an = Math.atan2(ty - y, tx - x), d = r * .38; return '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)) + ')"><ellipse rx="' + (r * 1.25) + '" ry="' + r + '" fill="#fff" stroke="#0B1020" stroke-width="6"/><circle cx="' + (d * Math.cos(an)) + '" cy="' + (d * Math.sin(an)) + '" r="' + (r * .48) + '" fill="#7C5CFF" stroke="#0B1020" stroke-width="4"/><circle cx="' + (d * Math.cos(an)) + '" cy="' + (d * Math.sin(an)) + '" r="' + (r * .2) + '" fill="#0B1020"/></g>'; }
function row17b(x, y, w, txt, k, col, gone) { if (k <= 0) return ''; return '<g opacity="' + (cl(k) * (1 - cl(gone || 0))) + '" transform="translate(' + (60 * cl(gone || 0)) + ' 0)"><rect x="' + x + '" y="' + (y - 30) + '" width="' + w + '" height="60" rx="16" fill="' + (col || '#2C3350') + '"/>' + svgT(x + 24, y + 13, txt, 36, col ? '#0B1020' : '#F4F6FB', 'start') + '</g>'; }
function mast17b(x, y, s) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M0 -90 L-44 60 H44 Z" fill="none" stroke="#C9CFDD" stroke-width="9" stroke-linejoin="round"/><path d="M-26 0 H26 M-36 34 H36" stroke="#C9CFDD" stroke-width="7"/><circle cy="-96" r="12" fill="#FFD23F"/></g>'; }

// ---------- Helfer ----------
const CWIN = [[450, 1340], [600, 1340], [750, 1340], [900, 1340], [525, 1440], [675, 1440], [825, 1440], [975, 1440]];
function ccity(t, o) { o = o || {}; const hz = 1100, NC = ['#7C5CFF', '#5CE1FF', '#FFD27A', '#FF6BD6'];
  let s = '<defs><linearGradient id="c7s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05041A"/><stop offset=".55" stop-color="#150D40"/><stop offset="1" stop-color="#40208A"/></linearGradient></defs><rect width="1080" height="' + (hz + 4) + '" fill="url(#c7s)"/>';
  for (let i = 0; i < 40; i++) { const y = rnd(i + 100) * 700; s += '<circle cx="' + (rnd(i + 1) * 1080).toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (1 + 2 * rnd(i + 200)).toFixed(1) + '" fill="#fff" opacity="' + (.2 + .4 * Math.abs(Math.sin(t * (1 + rnd(i + 300)) + i))).toFixed(2) + '"/>'; }
  [[180, .5, 0], [900, .37, 2]].forEach(b => { const a = (-90 + 28 * Math.sin(t * b[1] + b[2])) * Math.PI / 180; s += '<path d="M' + b[0] + ' ' + hz + ' L' + (b[0] + 1100 * Math.cos(a - .07)) + ' ' + (hz + 1100 * Math.sin(a - .07)) + ' L' + (b[0] + 1100 * Math.cos(a + .07)) + ' ' + (hz + 1100 * Math.sin(a + .07)) + ' Z" fill="#B9A6FF" opacity=".07"/>'; });
  let x = -20, i = 0; while (x < 1100) { const w = 60 + 50 * rnd(i + 3), hh = 150 + 230 * rnd(i + 13); s += '<rect x="' + x + '" y="' + (hz - hh) + '" width="' + w + '" height="' + hh + '" fill="#1D1458"/>'; x += w + 4; i++; }
  x = -30; i = 0; while (x < 1100) { const w = 96 + 70 * rnd(i + 53), hh = 80 + 190 * rnd(i + 63); s += '<rect x="' + x + '" y="' + (hz - hh) + '" width="' + w + '" height="' + (hh + 4) + '" fill="#0A0726" stroke="#2A1E6A" stroke-width="3"/>';
    for (let r = 0; r < Math.floor(hh / 34) - 0; r++) for (let c = 0; c < Math.floor(w / 30); c++) { const q = rnd(i * 13 + r * 5 + c * 3); if (q > .5) s += '<rect x="' + (x + 9 + c * 30) + '" y="' + (hz - hh + 12 + r * 34) + '" width="14" height="16" fill="' + NC[Math.floor(q * 40) % 4] + '" opacity="' + (.45 + .4 * Math.sin(t * (1 + q) + i + r * 2 + c)).toFixed(2) + '"/>'; }
    if (i % 3 === 0) s += '<path d="M' + (x + w / 2) + ' ' + (hz - hh) + ' v-50" stroke="#2A1E6A" stroke-width="4"/><circle cx="' + (x + w / 2) + '" cy="' + (hz - hh - 54) + '" r="6" fill="#FF5A5A" opacity="' + (Math.sin(t * 3 + i) > 0 ? 1 : .2) + '"/>'; x += w + 6; i++; }
  for (let i = 0; i < 14; i++) { const y = 1100 - ((t * 40 * (.5 + rnd(i + 400)) + rnd(i + 420) * 700) % 700); s += '<rect x="' + (rnd(i + 440) * 1060) + '" y="' + y + '" width="8" height="8" fill="' + NC[i % 4] + '" opacity=".28"/>'; }
  s += '<rect y="' + hz + '" width="1080" height="460" fill="#090622"/><path d="M0 ' + hz + ' H1080" stroke="#2A1E6A" stroke-width="5"/>';
  CWIN.forEach((w, i) => { s += '<rect x="' + (w[0] - 50) + '" y="' + (w[1] - 34) + '" width="100" height="68" rx="8" fill="' + (i % 3 === 1 ? '#2A1E6A' : '#150F40') + '" stroke="#2A1E6A" stroke-width="3"/>'; if (o.eyes > 0) s += eye17b(w[0], w[1], 24, o.look[0], o.look[1], o.eyes - i * .08); });
  s += '<rect y="1548" width="1080" height="372" fill="#120D38"/><path d="M0 1548 H1080" stroke="#7C5CFF" stroke-width="18" opacity=".22"/><path d="M0 1548 H1080" stroke="#9B84FF" stroke-width="6"/>';
  for (let i = 0; i < 6; i++) s += '<path d="M' + (40 + i * 200) + ' 1548 l-70 372" stroke="#1C1552" stroke-width="4"/>';
  s += '<rect x="820" y="1470" width="150" height="78" rx="8" fill="#1A1450" stroke="#2A1E6A" stroke-width="4"/><circle cx="895" cy="1509" r="26" fill="none" stroke="#2A1E6A" stroke-width="5"/><path transform="translate(895 1509) rotate(' + (t * 200) + ')" d="M-22 0 H22 M0 -22 V22" stroke="#3A2E8A" stroke-width="6"/>';
  return s; }
// Schalti flieht vor dem Lichtkegel: Position fuer Welt und Figur aus derselben Funktion
const I17F = (e, t) => flee2(e, t, .3, 1.2, 2.05, 2.9);

// ---------- Einstieg: Inkognito-Fenster ueber der Stadt. Dann geht ein Lichtkegel an, in den Fenstern oeffnen sich Augen, Schalti rennt aus dem Bild ----------
WORLD.h7i17t = function (sc, ev, t, lt) {
  const e = ev.licht, sh = shake7(e, t), CX = 600, CY = 890;
  const on = e !== undefined, px = !on ? 220 : e < 1.2 ? I17F(Math.max(0, e - .07), t).f[0] : lerp(1200, 520, ease(cl((e - 1.2) / .9))) + 60 * Math.sin(t * 5), lk = !on ? 0 : cl(e / .15) * (1 - cl((e - 2.1) / .35));
  let s = ccity(t, on ? { eyes: lk * 2, look: [Math.min(1080, px), 1440] } : {}), fl = '';
  s += '<circle cx="' + CX + '" cy="' + CY + '" r="330" fill="#7C5CFF" opacity="' + (.13 + .04 * Math.sin(t * 3)) + '"/><g transform="translate(' + CX + ' ' + (CY + 8 * Math.sin(t * 2.2)) + ') scale(' + back(cl((lt - .1) / .5)) + ') translate(' + (-CX) + ' ' + (-CY) + ')">' + win17b(CX - 250, CY - 170, 500, 340, mask17b(CX, CY + 10, 1.3) + svgT(CX, CY + 122, 'Inkognito', 44, '#AEB9D6')) + '</g>';
  if (lk > 0) fl += '<path d="M' + (px - 40) + ' 250 L' + (px - 210) + ' 1590 L' + (px + 210) + ' 1590 L' + (px + 40) + ' 250 Z" fill="#FFE14D" opacity="' + (.2 * lk) + '"/><ellipse cx="' + px + '" cy="1582" rx="215" ry="30" fill="#FFE14D" opacity="' + (.4 * lk) + '"/>';
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + fl + '</g>' + shade2());
};
WMASC.h7i17t = (ev, t, lt) => ev.licht === undefined ? { f: [220 + 22 * Math.sin(t * 1.6) * cl(lt / 6), 1537 - 6 * Math.abs(Math.sin(t * 6)) * cl(lt / 6)], s: 1, r: -4, nospin: 1 } : I17F(ev.licht, t);

// ---------- Teil 1 bis 3: Inhalt wie I017, im Vollbild ----------
WORLD.i17tlokal = function (sc, ev, t, lt) {
  let s = ccity(t), h = '';
  const we = ev.weg, si = ev.sieht, a = ev.act, R = ['Verlauf', 'Cookies', 'Formulardaten'];
  let inner = mask17b(790, 742, .34);
  R.forEach((r, i) => { inner += row17b(196, 824 + i * 74, 430, r, (lt - .6 - i * .25) / .3, null, we === undefined ? 0 : (we - .5 - i * .35) / .3); });
  if (a !== undefined) ['Downloads', 'Lesezeichen'].forEach((r, i) => { inner += row17b(196, 824 + i * 74, 430, r, (a - .2 - i * .3) / .3, '#FFD23F'); });
  s += win17b(170, 720, 680, 370, inner);
  if (we !== undefined && a === undefined) s += '<g transform="translate(780 ' + (752 + 0) + ') scale(' + back(cl(we / .3)) + ')"></g>' + chip3(735, 900, 'weg', 44, '#FF5A5A', '#fff', (we - 1.5) / .3);
  if (si !== undefined && a === undefined) s += eye17b(760, 1010, 50, 400, 880, si / .3) + okx1(560, 900, 44, true, (si - .9) / .3);
  h += slot(ev, [['geraet', 'Räumt nur auf deinem Gerät auf'], ['weg', 'Verlauf und Cookies: weg', 'hot'], ['sieht', 'Wer dein Handy nimmt, sieht nichts'], ['act', 'Downloads und Lesezeichen bleiben', 'hot']]);
  return W(s + shade2(), h);
};
WMASC.i17tlokal = BIG2;

WORLD.i17taugen = function (sc, ev, t, lt) {
  let s = ccity(t, ev.act === undefined ? { eyes: cl((lt - 1) / .4), look: [190, 930] } : {}), h = '';
  const an = ev.anb, ip = ev.ip, a = ev.act, Y = 930;
  if (a === undefined) { const sn = null, tx = sn ? sn.x : 190, ty = sn ? 1440 : Y, c = (t * .45) % 1;
    s += '<path d="M250 ' + Y + ' H780" stroke="#3A4A7A" stroke-width="8" stroke-dasharray="16 12"/>' + phoneF(120, Y - 110, 120, 220, '#1A1F33', mask17b(180, Y, .42)) + mast17b(500, Y - 10, 1) + srv4(840, Y, 1.15, '#3DFF7A') + pkt4(lerp(260, 770, c), Y, 1, '#FFD23F', 0);
    s += svgT(840, Y + 130, 'Website', 34, '#AEB9D6') + (an !== undefined ? svgT(500, Y + 130, 'Anbieter', 34, '#AEB9D6') : '');
    s += eye17b(840, Y - 150, 44, tx, ty, (lt - 1) / .3) + (an !== undefined ? eye17b(500, Y - 170, 44, tx, ty, an / .3) : '');
    if (ip !== undefined) { const px = lerp(260, 770, c); s += '<g transform="translate(' + px + ' ' + (Y - 62) + ') scale(' + back(cl(ip / .3)) + ')"><rect x="-120" y="-30" width="240" height="56" rx="16" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/>' + svgT(0, 12, 'Absender: IP', 32, '#0B1020') + '</g>'; }
    if (sn) s += '<ellipse cx="' + sn.x + '" cy="1582" rx="190" ry="28" fill="#FFE14D" opacity="' + (.3 * sn.lit) + '"/>';
  } else { const k = back(cl(a / .35));
    s += '<g transform="translate(500 900) scale(' + k + ') translate(-500 -900)"><rect x="130" y="740" width="740" height="330" rx="34" fill="#F4F6FB" stroke="#0B1020" stroke-width="7"/>' + svgT(170, 812, 'Vergleich nach Klage, 2024', 36, '#5A6686', 'start') + svgT(170, 900, 'Milliarden', 76, '#0B1020', 'start') + svgT(170, 968, 'Inkognito-Datensätze', 46, '#0B1020', 'start') + svgT(170, 1030, 'löschen oder anonymisieren', 36, '#5A6686', 'start');
    s += '<g transform="translate(770 900) rotate(' + (6 * Math.sin(t * 5)) + ')"><rect x="-50" y="-50" width="100" height="120" rx="14" fill="#FF5A5A" stroke="#0B1020" stroke-width="6"/><rect x="-62" y="-72" width="124" height="24" rx="10" fill="#FF5A5A" stroke="#0B1020" stroke-width="6"/><path d="M-22 -22 V44 M0 -22 V44 M22 -22 V44" stroke="#0B1020" stroke-width="6" stroke-linecap="round"/></g></g>'; }
  h += slot(ev, [['seite', 'Besuchte Seiten sehen dich weiter'], ['anb', 'Anbieter, Schule oder Firma auch', 'hot'], ['ip', 'Deine IP-Adresse bleibt sichtbar'], ['act', 'Google 2024: Daten löschen', 'hot']]);
  return W(s + shade2(), h);
};
WMASC.i17taugen = BIG2;

WORLD.i17tnutzen = function (sc, ev, t, lt) {
  let s = ccity(t), h = '';
  const ge = ev.geschenk, fr = ev.fremd, a = ev.act;
  if (ge === undefined && fr === undefined && a === undefined) s += '<g transform="translate(0 ' + (8 * Math.sin(t * 2.4)) + ')">' + mask17b(450, 900, 2.1 * back(cl((lt - .3) / .4))) + '</g>' + okx1(700, 800, 60, true, (lt - 1.1) / .3);
  else if (fr === undefined && a === undefined) { const k = back(cl(ge / .35)), gift = '<g transform="translate(400 915)"><rect x="-80" y="-40" width="160" height="110" rx="12" fill="#FF5A8A" stroke="#0B1020" stroke-width="6"/><rect x="-92" y="-70" width="184" height="40" rx="10" fill="#FF7AA6" stroke="#0B1020" stroke-width="6"/><rect x="-14" y="-70" width="28" height="140" fill="#FFD23F"/><path d="M0 -70 q-50 -60 -60 -10 q20 20 60 10 q50 -60 60 -10 q-20 20 -60 10" fill="none" stroke="#FFD23F" stroke-width="10"/></g>';
    s += '<g transform="translate(400 900) scale(' + k + ') translate(-400 -900)"><rect x="160" y="740" width="480" height="340" rx="34" fill="#0B1020" stroke="#F4F6FB" stroke-width="9"/><rect x="180" y="760" width="440" height="300" rx="20" fill="#1A1F33"/>' + gift + mask17b(580, 792, .3) + '</g>' + eye17b(790, 860, 50, 400, 900, (ge - .9) / .3) + chip3(790, 960, 'sieht nichts', 32, '#3DFF7A', '#0B1020', (ge - 1.4) / .3);
  } else { const k = back(cl((fr === undefined ? a : fr) / .35)), known = a !== undefined;
    s += '<g transform="translate(450 900) scale(' + (fr !== undefined && a === undefined ? k : 1) + ') translate(-450 -900)">' + mon4(170, 730, 560, 330, '#1A1F33', '<rect x="270" y="790" width="360" height="56" rx="14" fill="#2C3350"/>' + svgT(290, 829, known ? 'schalti@mail' : 'E-Mail', 34, known ? '#F4F6FB' : '#8A93A8', 'start') + '<rect x="270" y="862" width="360" height="56" rx="14" fill="#2C3350"/>' + svgT(290, 903, known ? '••••••••' : 'Passwort', 34, known ? '#F4F6FB' : '#8A93A8', 'start') + '<rect x="270" y="940" width="360" height="62" rx="18" fill="#7C5CFF"/>' + svgT(450, 983, 'Anmelden', 36, '#fff') + mask17b(690, 770, .26)) + '</g>';
    if (known) s += chip3(770, 800, 'Hallo, Schalti!', 34, '#FFD23F', '#0B1020', (a - .8) / .3, 290) + eye17b(800, 910, 46, 450, 900, (a - .5) / .3);
    else s += chip3(800, 880, 'fremdes Gerät', 30, '#F4F6FB', '#0B1020', (fr - .9) / .3, 250); }
  h += slot(ev, [['gut', 'Nützlich ist er trotzdem'], ['geschenk', 'Geschenke am Familien-Tablet', 'hot'], ['fremd', 'Anmelden an fremden Geräten'], ['act', 'Angemeldet? Die Seite kennt dich', 'hot']]);
  return W(s + shade2(), h);
};
WMASC.i17tnutzen = BIG2;

// ---------- Schluss ----------
WORLD.i17toutro = function (sc, ev, t) { return W(ccity(t) + win17b(650, 930, 260, 180, mask17b(780, 1050, .6)) + shade2()); };
