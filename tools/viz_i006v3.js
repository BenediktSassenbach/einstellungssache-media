// TESTFOLGE I006V3 "Hoert dein Handy dich wirklich ab?" im Design Version 3.0 (Vollbild plus: Kamera, Farbstimmung, mehr Aktionen). Text wie I006, dazu der Spruch am Anfang.
// Ort: Schaltis Zimmer bei Nacht. Inhalt der drei Teile aus I006 uebernommen, Helfer (pizza6, ad6, mic6 ...) kommen aus viz_i006.js (veroeffentlichte Folge, bleibt).
// Zum Loeschen: diese Datei und videos/I006V3.

// ---------- Ort: Schaltis Zimmer bei Nacht (Fenster mit Stadt, Schreibtisch mit Bildschirm, Lavalampe, Router, LED-Leiste am Boden) ----------
function room6_3(t, o) { o = o || {}; const hot = o.neon ? 1 : 0;
  let s = '<defs><linearGradient id="r6w_3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + (hot ? '#0A0630' : '#070520') + '"/><stop offset=".6" stop-color="' + (hot ? '#24126E' : '#17104A') + '"/><stop offset="1" stop-color="' + (hot ? '#4A1F9E' : '#2A1870') + '"/></linearGradient><linearGradient id="r6n_3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#030416"/><stop offset="1" stop-color="' + (hot ? '#5B2BC4' : '#2B1C7A') + '"/></linearGradient><pattern id="r6p_3" width="54" height="54" patternUnits="userSpaceOnUse"><path d="M27 18 l7 9 l-7 9 l-7 -9 Z" fill="#fff" opacity=".035"/></pattern><clipPath id="r6c_3"><rect x="640" y="250" width="360" height="320" rx="10"/></clipPath><radialGradient id="r6g_3"><stop offset="0" stop-color="#7C5CFF" stop-opacity=".5"/><stop offset="1" stop-color="#7C5CFF" stop-opacity="0"/></radialGradient></defs>';
  s += '<rect width="1080" height="1552" fill="url(#r6w_3)"/><rect width="1080" height="1552" fill="url(#r6p_3)"/>';
  s += '<ellipse cx="520" cy="920" rx="' + (560 + 30 * Math.sin(t * .8)) + '" ry="420" fill="url(#r6g_3)" opacity="' + ((hot ? .75 : .5) + .12 * Math.sin(t * 1.3)) + '"/>';
  // Fenster: Nachthimmel, Mond, Sterne, Skyline mit blinkenden Fenstern, Sternschnuppe
  s += '<g clip-path="url(#r6c_3)"><rect x="640" y="250" width="360" height="320" fill="url(#r6n_3)"/>';
  for (let i = 0; i < 22; i++) s += '<circle cx="' + (645 + rnd(i + 31) * 350).toFixed(0) + '" cy="' + (256 + rnd(i + 61) * 200).toFixed(0) + '" r="' + (1.5 + 2 * rnd(i + 91)).toFixed(1) + '" fill="#fff" opacity="' + (.25 + .6 * Math.abs(Math.sin(t * (1 + rnd(i + 11)) + i))).toFixed(2) + '"/>';
  s += '<circle cx="905" cy="335" r="' + (hot ? 74 : 60) + '" fill="#FFE9A8" opacity=".16"/><circle cx="905" cy="335" r="' + (hot ? 46 : 38) + '" fill="#FFF1C4"/><circle cx="' + (hot ? 922 : 919) + '" cy="324" r="' + (hot ? 38 : 31) + '" fill="url(#r6n_3)" opacity=".55"/>';
  { const q = (t * .23) % 1; if (q < .16) { const c = q / .16; s += '<line x1="' + (660 + 220 * c) + '" y1="' + (270 + 90 * c) + '" x2="' + (700 + 220 * c) + '" y2="' + (286 + 90 * c) + '" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="' + Math.sin(Math.PI * c) + '"/>'; } }
  let x = 640, i = 0; while (x < 1000) { const w = 44 + 40 * rnd(i + 7), hh = 60 + 110 * rnd(i + 17); s += '<rect x="' + x + '" y="' + (570 - hh) + '" width="' + w + '" height="' + hh + '" fill="#0A0726"/>'; for (let r = 0; r < Math.floor(hh / 26); r++) for (let c = 0; c < Math.floor(w / 20); c++) { const q = rnd(i * 11 + r * 5 + c * 3 + 2); if (q > .55) s += '<rect x="' + (x + 6 + c * 20) + '" y="' + (570 - hh + 8 + r * 26) + '" width="9" height="11" fill="' + ['#FFD27A', '#5CE1FF', '#FF6BD6', '#9B84FF'][Math.floor(q * 40) % 4] + '" opacity="' + (.4 + .45 * Math.sin(t * (1 + q) + i + r + c)).toFixed(2) + '"/>'; } x += w + 3; i++; }
  s += '</g><rect x="640" y="250" width="360" height="320" rx="10" fill="none" stroke="#3A2E8A" stroke-width="14"/><path d="M820 250 V570 M640 410 H1000" stroke="#3A2E8A" stroke-width="8"/><rect x="622" y="566" width="396" height="22" rx="8" fill="#3A2E8A"/>';
  [[640, 1], [1000, -1]].forEach(c => { const sw = 10 * Math.sin(t * 1.1 + c[0]); s += '<path d="M' + (c[0] - 26 * c[1]) + ' 232 H' + (c[0] + 62 * c[1]) + ' Q' + (c[0] + (40 + sw) * c[1]) + ' 420 ' + (c[0] + (70 + sw) * c[1]) + ' 610 H' + (c[0] - 26 * c[1]) + ' Z" fill="#2A1E6A" opacity=".92"/>'; });
  s += '<rect x="600" y="226" width="440" height="12" rx="6" fill="#4A3EA8"/>';
  // schwebende Staubkoernchen im Licht
  for (let i = 0; i < 16; i++) { const y = 1540 - ((t * 26 * (.5 + rnd(i + 400)) + rnd(i + 420) * 1240) % 1240); s += '<circle cx="' + (rnd(i + 440) * 1060 + 14 * Math.sin(t + i)) + '" cy="' + y + '" r="' + (3 + 3 * rnd(i + 460)) + '" fill="' + (i % 3 ? '#B9A6FF' : '#5CE1FF') + '" opacity=".22"/>'; }
  // Boden mit LED-Leiste und Teppich
  const led = lc('#7C5CFF', '#5CE1FF', .5 + .5 * Math.sin(t * .9));
  s += '<rect y="1548" width="1080" height="372" fill="#120D38"/>'; for (let i = 0; i < 7; i++) s += '<path d="M' + (20 + i * 180) + ' 1548 l-60 372" stroke="#1C1552" stroke-width="4"/>';
  s += '<path d="M0 1548 H1080" stroke="' + led + '" stroke-width="' + (hot ? 30 : 20) + '" opacity="' + (.22 + .08 * Math.sin(t * 2)) + '"/><path d="M0 1548 H1080" stroke="' + led + '" stroke-width="6"/>';
  s += '<ellipse cx="240" cy="1592" rx="250" ry="40" fill="#2A1E6A"/><ellipse cx="240" cy="1592" rx="200" ry="28" fill="none" stroke="#4A3EA8" stroke-width="5"/>';
  // Schreibtisch rechts: Bildschirm mit laufenden Zeilen, Lavalampe, Router
  s += '<rect x="632" y="1440" width="470" height="22" rx="6" fill="#3A2E8A"/><rect x="656" y="1462" width="16" height="88" fill="#2A1E6A"/><rect x="1040" y="1462" width="16" height="88" fill="#2A1E6A"/>';
  s += '<path d="M600 1552 L700 1300 H900 L1000 1552 Z" fill="#5CE1FF" opacity="' + (.05 + .02 * Math.sin(t * 7)) + '"/>';
  s += '<rect x="700" y="1302" width="200" height="122" rx="10" fill="#0B1020" stroke="#C9CFDD" stroke-width="6"/><rect x="784" y="1424" width="32" height="12" fill="#C9CFDD"/><rect x="756" y="1434" width="88" height="8" rx="4" fill="#C9CFDD"/>';
  for (let i = 0; i < 5; i++) { const w = 40 + 110 * rnd(i + Math.floor(t * 1.5) + 70); s += '<rect x="716" y="' + (1318 + i * 20) + '" width="' + w + '" height="8" rx="4" fill="' + (i % 2 ? '#3DFF7A' : '#5CE1FF') + '" opacity=".8"/>'; }
  s += '<rect x="952" y="1418" width="56" height="22" rx="5" fill="#4A3EA8"/><path d="M960 1418 L968 1300 H992 L1000 1418 Z" fill="#FF6BD6" opacity=".35" stroke="#C9CFDD" stroke-width="4"/><rect x="964" y="1286" width="32" height="16" rx="5" fill="#4A3EA8"/>';
  for (let i = 0; i < 3; i++) { const c = (t * .16 + i / 3) % 1; s += '<ellipse cx="' + (980 + 5 * Math.sin(t * 2 + i)) + '" cy="' + (1404 - 86 * Math.sin(Math.PI * c)) + '" rx="' + (9 + 3 * Math.sin(t * 3 + i)) + '" ry="' + (11 + 4 * Math.cos(t * 2 + i)) + '" fill="#FF6BD6" opacity=".9"/>'; }
  s += '<rect x="640" y="1416" width="52" height="24" rx="6" fill="#1A1450" stroke="#4A3EA8" stroke-width="3"/><path d="M650 1416 v-34 M682 1416 v-34" stroke="#4A3EA8" stroke-width="4"/>'; for (let i = 0; i < 3; i++) s += '<circle cx="' + (652 + i * 14) + '" cy="1428" r="4" fill="#3DFF7A" opacity="' + (Math.sin(t * (9 + i * 4) + i) > 0 ? 1 : .2) + '"/>';
  // Pizzakarton am Boden
  s += '<g transform="translate(560 1548)"><rect x="-64" y="-26" width="128" height="26" rx="4" fill="#C9A26B" stroke="#0B1020" stroke-width="4"/><path d="M-64 -26 L-46 -58 H82 L64 -26 Z" fill="#E0BC86" stroke="#0B1020" stroke-width="4" stroke-linejoin="round"/>' + pizza6(12, -42, .2, 20) + '</g>';
  return s; }
const I6F_3 = (e, t) => flee3(e, t, .3, 1.2, 2.05, 2.9);

// ---------- Einstieg: Das Handy lauscht im Zimmer immer staerker. Beim Nachsatz spuckt es Pizza-Werbung, die Werbung jagt Schalti aus dem Bild ----------
WORLD.h7i6_3 = function (sc, ev, t, lt) {
  const e = ev.werbung, li = sc.lines.length - 1, end = sc.lines[li] ? sc.lines[li].start - sc.start : 8, k = cl(lt / end), sh = shake7(e, t), CX = 590, CY = 905, X = CX - 140, Y = CY - 220;
  const mb = e === undefined ? 0 : cl((e - 2.2) / .5), lis = e === undefined ? k : mb * .4;
  let s = room6_3(t, { neon: 1 }), o = '', fl = '';
  s += '<circle cx="' + CX + '" cy="' + CY + '" r="' + (330 + 30 * lis) + '" fill="' + (e === undefined ? lc('#7C5CFF', '#3DFF7A', k) : lc('#FFC94D', '#7C5CFF', mb)) + '" opacity="' + (.14 + .1 * lis + .04 * Math.sin(t * 3)) + '"/>';
  const jit = e === undefined ? 5 * k * k * Math.sin(t * 46) : 0;
  if (lis > 0) for (let i = 0; i < 3; i++) for (let d = -1; d <= 1; d += 2) { const c = (t * .9 + i / 3) % 1, x0 = d < 0 ? X - 26 - 90 * c : X + 306 + 90 * c, xq = d < 0 ? X - 70 - 120 * c : X + 350 + 120 * c; o += '<path d="M' + x0 + ' ' + (CY - 70 - 44 * c) + ' Q' + xq + ' ' + CY + ' ' + x0 + ' ' + (CY + 70 + 44 * c) + '" stroke="' + (e === undefined ? lc('#FFFFFF', '#3DFF7A', k) : '#B9A6FF') + '" stroke-width="9" fill="none" stroke-linecap="round" opacity="' + ((1 - c) * (.25 + .75 * lis)) + '"/>'; }
  o += '<g transform="translate(' + jit + ' ' + (8 * Math.sin(t * 2.2)) + ')">' + phoneF(X, Y, 280, 440, e === undefined ? lc('#1B2748', '#0F3A2A', k) : lc('#3A2A10', '#1B2748', mb));
  if (e === undefined || e < .08 || mb > 0) { const m = e === undefined ? k : 0; o += '<g opacity="' + (e === undefined || e < .08 ? 1 : mb) + '">' + mic6(CX, CY - 56, 1.55, lc('#AEB9D6', '#3DFF7A', m)); for (let i = 0; i < 7; i++) { const hh = 14 + (16 + 64 * m) * Math.abs(Math.sin(t * (5 + i) + i * 1.7)); o += '<rect x="' + (CX - 98 + i * 30) + '" y="' + (CY + 120 - hh / 2) + '" width="16" height="' + hh + '" rx="8" fill="#3DFF7A" opacity="' + (.35 + .65 * m) + '"/>'; } o += '</g>'; }
  if (e !== undefined && e >= .08 && mb < 1) o += ad6(CX, CY, 1.3 * back(cl((e - .08) / .25)) * (1 - mb), 4 * Math.sin(t * 9), true);
  o += '</g>';
  // Werbekarten: im Bogen ueber Schalti hinweg nach links unten, dann hinter ihm her nach rechts aus dem Bild
  if (e !== undefined && e < 2.3) { const sx = e < 1.2 ? I6F_3(e, t).f[0] : 1300 + (e - 1.2) * 1200;
    for (let i = 0; i < 9; i++) { const q = e - .04 - i * .035; if (q <= 0) continue; const lx = 40 + i * 14, ly = 1500 - (i % 3) * 16, dir = i % 2 ? 1 : -1; let x, y, r;
      if (q < .34) { const c = q / .34; x = lerp(CX, lx, c); y = lerp(CY, ly, c) - 380 * Math.sin(Math.PI * c); r = -300 * c; }
      else { const c = cl((q - .34) / .3), fx = sx - 190 - i * 46; x = lerp(lx, Math.max(lx, fx), ease(c)); if (c >= 1) x = Math.max(lx, fx); y = ly - 70 * Math.abs(Math.sin(t * 13 + i * 1.3)); r = 14 * dir * Math.sin(t * 15 + i); }
      fl += ad6(x, y, .62, r, true); } }
  s += '<g transform="translate(' + CX + ' ' + CY + ') scale(' + back(cl((lt - .1) / .5)) + ') translate(' + (-CX) + ' ' + (-CY) + ')">' + o + '</g>' + fl + sweat7(t, e === undefined ? k * .7 : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + shade3());
};
WMASC.h7i6_3 = (ev, t, lt, sc) => { const li = sc.lines.length - 1, end = sc.lines[li] ? sc.lines[li].start - sc.start : 8, k = cl(lt / end);
  return ev.werbung === undefined ? { f: [220 + 22 * Math.sin(t * 1.6) * k, 1537 - 6 * Math.abs(Math.sin(t * 6)) * k], s: 1, r: -4 * k, nospin: 1 } : I6F_3(ev.werbung, t); };

// ---------- Teil 1: Verdacht, Test mit 17.000 Apps, ein Jahr Datenverkehr, kein heimlicher Ton ----------
WORLD.i6test_3 = function (sc, ev, t, lt) {
  let s = room6_3(t, null), h = '';
  const ap = ev.apps, j = ev.jahr, a = ev.act;
  if (ap === undefined) { // Du redest ueber Pizza -> Pizza-Werbung
    const k = back(cl((lt - .5) / .35)), ak = cl((lt - 1.5) / .3);
    s += '<g transform="translate(250 890) scale(' + k + ') rotate(' + (-4 + 2 * Math.sin(t * 4)) + ')"><path d="M-70 96 L-110 170 L-10 104 Z" fill="#fff" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><rect x="-170" y="-110" width="340" height="220" rx="70" fill="#fff" stroke="#0B1020" stroke-width="6"/><rect x="-84" y="92" width="80" height="16" fill="#fff"/>' + pizza6(0, -4, 1.05, -8) + '</g>';
    for (let i = 0; i < 4; i++) { const c = cl((lt - 1 - i * .12) / .2); s += '<circle cx="' + (462 + i * 34) + '" cy="900" r="10" fill="#fff" opacity="' + c + '"/>'; }
    s += phoneF(620, 720, 250, 400, '#1B2748');
    if (ak > 0) { s += ad6(745, 920, 1.05 * back(ak), 3 * Math.sin(t * 7), true); for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4, c = cl((lt - 1.5) / .5); s += '<line x1="' + (745 + (150 + 40 * c) * Math.cos(an)) + '" y1="' + (920 + (190 + 40 * c) * Math.sin(an)) + '" x2="' + (745 + (180 + 60 * c) * Math.cos(an)) + '" y2="' + (920 + (220 + 60 * c) * Math.sin(an)) + '" stroke="#FFD23F" stroke-width="8" stroke-linecap="round" opacity="' + (1 - c) + '"/>'; } }
  } else { // App-Raster, Zaehler, Lupe
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const i = r * 6 + c; s += app6(105 + c * 100, 742 + r * 92, 78, i + r, (ap - i * .03) / .3, a === undefined ? 0 : (a - .1 - i * .035) / .25); }
    const CXN = 820;
    if (a === undefined) { const n = Math.round(17000 * ease(cl(ap / 1.5)));
      s += svgT(CXN, 790, 'über', 32, '#AEB9D6') + svgT(CXN, 858, n.toLocaleString('de-DE'), 62, '#fff') + svgT(CXN, 904, 'Apps', 34, '#AEB9D6');
      if (j !== undefined) { const D = D6(sc, 2), f = cl(j / Math.max(1.6, D - .3)); for (let i = 0; i < 12; i++) { const on = f * 12 > i; s += '<rect x="' + (722 + (i % 6) * 34) + '" y="' + (950 + Math.floor(i / 6) * 34) + '" width="26" height="26" rx="7" fill="' + (on ? '#3DFF7A' : '#26335E') + '" transform="rotate(' + (on && f * 12 < i + 1 ? 12 * Math.sin(t * 20) : 0) + ' ' + (735 + (i % 6) * 34) + ' ' + (963 + Math.floor(i / 6) * 34) + ')"/>'; } s += svgT(CXN, 1062, '12 Monate', 30, '#AEB9D6'); }
    } else { const k = back(cl(a / .35));
      s += '<g transform="translate(' + CXN + ' 880) scale(' + k + ')"><circle r="' + (96 + 5 * Math.sin(t * 6)) + '" fill="#0F3A2A" stroke="#3DFF7A" stroke-width="9"/>' + svgT(0, 46, '0', 130, '#3DFF7A') + '</g>' + (a > .3 ? svgT(CXN, 1030, 'mal heimlich', 30, '#AEB9D6') + svgT(CXN, 1068, 'Ton verschickt', 30, '#AEB9D6') : '');
    }
    let L = [150 + 250 * (1 + Math.sin(t * 1.5)), 800 + 110 * (1 + Math.sin(t * 1.1 + 1))];
    if (j !== undefined && a === undefined) { const c = i6chase(j, D6(sc, 2), t); L = c.e; }
    if (a !== undefined) L = [lerp(400, 640, ease(cl(a / .5))), lerp(900, 1085, ease(cl(a / .5)))];
    if (L) s += lens6(L[0], L[1], a !== undefined ? .55 : .95, 0);
  }
  h += slot(ev, [['panel', 'Über Pizza geredet: Pizza-Werbung'], ['apps', 'Test: über 17.000 Android-Apps', 'hot'], ['jahr', 'Ein Jahr lang Daten überwacht'], ['act', 'Keine schickte heimlich Ton', 'hot']]);
  return W(s + shade3(), h);
};
WMASC.i6test_3 = (ev, t, lt, sc) => {
  if (ev.act !== undefined) return BIG3();
  if (ev.jahr !== undefined) return Object.assign(i6chase(ev.jahr, D6(sc, 2), t).m, { nospin: 1 });
  return BIG3();
};

// ---------- Teil 2: Datenspuren, Werbe-ID, Profil, Treffer und Fehlschuesse ----------
WORLD.i6spur_3 = function (sc, ev, t, lt) {
  let s = room6_3(t, null), h = '';
  const sp = ev.spur === undefined ? -1 : ev.spur, id = ev.id, pr = ev.profil, a = ev.act, PX = 90, PY = 740, PW = 220, PH = 350;
  const fade = a === undefined ? 1 : 1 - cl(a / .3);
  // Handy links mit durchgestrichenem Mikro
  s += phoneF(PX, PY, PW, PH, '#1B2748');
  if (a === undefined) { s += mic6(PX + PW / 2, PY + 150, 1.05, '#AEB9D6'); const ck = cl((sp - .5) / .25); if (ck > 0) s += '<line x1="' + (PX + 50) + '" y1="' + (PY + 60) + '" x2="' + (PX + 50 + 120 * ck) + '" y2="' + (PY + 60 + 170 * ck) + '" stroke="#FF4D4D" stroke-width="14" stroke-linecap="round"/>'; }
  // Profilkarte rechts
  const QX = 665, QY = 740, QW = 250, QH = 350, pk = pr === undefined ? 0 : ease(cl(pr / Math.max(2, D6(sc, 2) - .4)));
  s += '<rect x="' + QX + '" y="' + QY + '" width="' + QW + '" height="' + QH + '" rx="30" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + svgT(QX + QW / 2, QY + 48, 'Profil', 36, '#0B1020');
  s += '<circle cx="' + (QX + QW / 2) + '" cy="' + (QY + 100) + '" r="26" fill="#AEB9D6"/><path d="M' + (QX + QW / 2 - 46) + ' ' + (QY + 168) + ' Q' + (QX + QW / 2) + ' ' + (QY + 104) + ' ' + (QX + QW / 2 + 46) + ' ' + (QY + 168) + ' Z" fill="#AEB9D6"/>';
  ['Pizza', 'Sneaker', 'Gaming'].forEach((n, i) => { const y = QY + 214 + i * 46, w = (a !== undefined ? 1 : pk) * [86, 56, 72][i];
    s += svgT(QX + 22, y + 10, pr === undefined && a === undefined ? '?' : n, 27, '#5A6686', 'start') + '<rect x="' + (QX + 146) + '" y="' + (y - 12) + '" width="88" height="24" rx="12" fill="#DDE2EE"/><rect x="' + (QX + 146) + '" y="' + (y - 12) + '" width="' + Math.max(0, w) + '" height="24" rx="12" fill="' + A6C[[0, 1, 5][i]] + '"/>'; });
  // Datenspuren in der Mitte
  const N = ['Suchen', 'App-Nutzung', 'Standort', 'Kontakte'];
  if (fade > 0) N.forEach((n, i) => { const k = cl((sp - .9 - i * .4) / .3); if (k <= 0) return; const y = 770 + i * 78, w = n.length * 21 + 70, x0 = 488 - w / 2;
    for (let d = 0; d < 2; d++) { const c = (t * .8 + i * .23 + d * .5) % 1; s += '<circle cx="' + lerp(PX + PW + 6, x0 - 6, c) + '" cy="' + lerp(PY + 150, y, c) + '" r="7" fill="' + A6C[i] + '" opacity="' + (fade * k) + '"/><circle cx="' + lerp(x0 + w + 6, QX - 6, c) + '" cy="' + lerp(y, QY + 180, c) + '" r="7" fill="' + A6C[i] + '" opacity="' + (fade * k) + '"/>'; }
    s += '<g transform="translate(488 ' + y + ') scale(' + back(k) + ')" opacity="' + fade + '"><rect x="' + (-w / 2) + '" y="-29" width="' + w + '" height="58" rx="29" fill="#141C36" stroke="' + A6C[i] + '" stroke-width="5"/><circle cx="' + (-w / 2 + 30) + '" cy="0" r="11" fill="' + A6C[i] + '"/>' + svgT(14, 11, n, 31, '#fff') + '</g>'; });
  // Werbe-ID als Nummernschild am Handy
  if (id !== undefined) { const k = back(cl(id / .35)); s += plate6(PX + PW / 2, PY + PH - 62, .66 * k, -4 + 3 * Math.sin(t * 5), pr === undefined && a === undefined ? .35 + .25 * Math.sin(t * 8) : 0); }
  // Gag: Fussspuren werden zu Daten und fliegen ins Profil
  if (pr !== undefined) { const D = D6(sc, 2), w = a === undefined ? i6walk(pr, D, t) : { u: 1, x: 220 }, op = a === undefined ? 1 : 1 - cl(a / .5), TOT = Math.max(2.6, D - .1);
    for (let i = 0; i < 8; i++) { const x = 300 + i * 62, u1 = .42 * (x - 220) / 550, q1 = (w.u - u1) * TOT; // Hinweg
      if (q1 > 0) { s += foot6(x, 1566, '#D9CCFF', op * cl(q1 / .15), i % 2); const c = cl((q1 - .15) / .8); if (c > 0 && c < 1) s += '<circle cx="' + lerp(x, QX + QW / 2, ease(c)) + '" cy="' + lerp(1545, QY + QH - 10, ease(c)) + '" r="' + (12 - 5 * c) + '" fill="#D9CCFF"/>'; } }
    for (let i = 0; i < 8; i++) { const x = 734 - i * 62, u2 = .56 + .34 * i / 8, q2 = (w.u - u2 - .03) * TOT; // Rueckweg
      if (q2 > 0) { s += foot6(x, 1596, '#FF7A9A', op * cl(q2 / .15), i % 2); const c = cl((q2 - .15) / .8); if (c > 0 && c < 1) s += '<circle cx="' + lerp(x, QX + QW / 2, ease(c)) + '" cy="' + lerp(1520, QY + QH - 10, ease(c)) + '" r="' + (12 - 5 * c) + '" fill="#FF7A9A"/>'; } }
  }
  // Werbung raet: vier Nieten prallen ab, die Pizza trifft
  if (a !== undefined) for (let i = 0; i < 5; i++) { const q = a - .35 - i * .42; if (q <= 0) continue; const hit = i === 4, c = cl(q / .4), sx = QX - 20, tx = PX + PW / 2 + (hit ? 0 : 40), yy = 800 + (hit ? 115 : i * 62);
    if (c < 1) s += ad6(lerp(sx, tx, c), lerp(900, yy, c) - 90 * Math.sin(Math.PI * c), .5, -200 * c, hit);
    else if (hit) { const g = cl((q - .4) / .3); s += '<circle cx="' + tx + '" cy="' + yy + '" r="' + (120 + 14 * Math.sin(t * 8)) + '" fill="#3DFF7A" opacity="' + (.28 * g) + '"/>' + ad6(tx, yy, .5 + .42 * back(g), 5 * Math.sin(t * 6), true); for (let n = 0; n < 8; n++) { const an = n * Math.PI / 4, cc = cl((q - .4) / .5); s += '<line x1="' + (tx + (120 + 40 * cc) * Math.cos(an)) + '" y1="' + (yy + (120 + 40 * cc) * Math.sin(an)) + '" x2="' + (tx + (150 + 60 * cc) * Math.cos(an)) + '" y2="' + (yy + (150 + 60 * cc) * Math.sin(an)) + '" stroke="#3DFF7A" stroke-width="8" stroke-linecap="round" opacity="' + (1 - cc) + '"/>'; } }
    else { const c2 = cl((q - .4) / .6); s += ad6(tx + 40 + 220 * c2, yy - 120 * Math.sin(Math.PI * c2 * .8) + 300 * c2 * c2, .5, -200 - 500 * c2, false, 1 - c2) + (c2 < .5 ? '<path d="M' + (tx + 70) + ' ' + (yy - 22) + ' l44 44 m0 -44 l-44 44" stroke="#FF4D4D" stroke-width="11" stroke-linecap="round" opacity="' + (1 - c2 * 2) + '"/>' : ''); } }
  h += slot(ev, [['spur', 'Kein Mikro nötig: Datenspuren'], ['id', 'Werbe-ID = dein Nummernschild', 'hot'], ['profil', 'Daraus wird ein Profil', 'red'], ['act', 'Nur Treffer fallen dir auf', 'hot']]);
  return W(s + shade3(), h);
};
WMASC.i6spur_3 = (ev, t, lt, sc) => {
  if (ev.act !== undefined) return BIG3();
  if (ev.profil !== undefined) return Object.assign(i6walk(ev.profil, D6(sc, 2), t).m, { nospin: 1 });
  return BIG3();
};

// ---------- Teil 3: Punkt in der Statusleiste, Farben, Mikro-Rechte, Tracking und Werbe-ID ----------
WORLD.i6check_3 = function (sc, ev, t, lt) {
  let s = room6_3(t, null), h = '';
  const p = ev.punkt === undefined ? 0 : ev.punkt, fa = ev.farben, re = ev.rechte, a = ev.act;
  const dot = (x, y, r, col) => { let d = ''; for (let i = 0; i < 2; i++) { const c = (t * .9 + i * .5) % 1; d += '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 46 * c) + '" fill="none" stroke="' + col + '" stroke-width="6" opacity="' + (1 - c) + '"/>'; } return d + '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + col + '"/>'; };
  if (re === undefined && a === undefined) {
    if (fa === undefined && ev.punkt === undefined) { // viraler Post als Aufhaenger: 841 Mal heimlich Mikro an?
      const v = ev.viral === undefined ? 0 : ev.viral, k = back(cl(v / .4)), n = Math.round(841 * ease(cl((v - .5) / 1.3)));
      [[185, 800], [895, 815], [170, 1050], [905, 1040]].forEach((q, i) => { const c = cl((v - 1 - i * .35) / .3); if (c > 0) s += '<g transform="translate(' + q[0] + ' ' + q[1] + ') scale(' + (back(c) * (1 + .08 * Math.sin(t * 9 + i))) + ')"><circle r="58" fill="#3A1216" stroke="#FF4D4D" stroke-width="6"/>' + mic6(0, 2, .62, '#FF7A9A') + '</g>'; });
      s += '<g transform="translate(540 925) rotate(' + (-3 + 1.5 * Math.sin(t * 3)) + ') scale(' + k + ')"><rect x="-250" y="-195" width="500" height="390" rx="34" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/><circle cx="-200" cy="-145" r="28" fill="#AEB9D6"/><rect x="-158" y="-162" width="170" height="16" rx="8" fill="#AEB9D6"/><rect x="-158" y="-136" width="110" height="14" rx="7" fill="#DDE2EE"/><rect x="112" y="-168" width="116" height="46" rx="23" fill="#E5383B"/>' + svgT(170, -135, 'VIRAL', 28, '#fff') + mic6(-160, 12, 1.2, '#0B1020') + svgT(60, 44, n + '×', 120, '#E5383B') + svgT(0, 152, 'heimlich Mikro an?', 40, '#0B1020') + '</g>';
    } else if (fa === undefined) { // ein grosses Handy: Mikro laeuft, Punkt oben
      s += phoneF(300, 725, 440, 405, '#1B2748') + svgT(350, 800, '12:00', 36, '#fff', 'start') + batt(640, 772, 62, 32, .7);
      s += mic6(520, 960, 1.5, '#fff'); for (let i = 0; i < 3; i++) { const c = (t * .8 + i / 3) % 1; s += '<path d="M' + (590 + 60 * c) + ' ' + (880 - 30 * c) + ' Q' + (640 + 80 * c) + ' 950 ' + (590 + 60 * c) + ' ' + (1020 + 30 * c) + '" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + (1 - c) + '"/><path d="M' + (450 - 60 * c) + ' ' + (880 - 30 * c) + ' Q' + (400 - 80 * c) + ' 950 ' + (450 - 60 * c) + ' ' + (1020 + 30 * c) + '" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + (1 - c) + '"/>'; }
      const k = cl((p - .7) / .3); if (k > 0) { s += '<g opacity="' + k + '">' + dot(566, 788, 18, '#FF9A2A') + '</g>'; }
    } else { // zwei Handys: iPhone orange, Android gruen
      [[410, '#FF9A2A', 'iPhone', 0], [760, '#3DFF7A', 'Android', .5]].forEach(q => { const k = back(cl((fa - q[3]) / .35)); if (k <= 0) return;
        s += '<g transform="translate(' + q[0] + ' 900) scale(' + k + ') translate(' + (-q[0]) + ' -900)">' + phoneF(q[0] - 125, 725, 250, 320, '#1B2748') + dot(q[0] + 64, 782, 20, q[1]) + mic6(q[0], 920, 1, '#AEB9D6') + '</g>' + (k > .6 ? svgT(q[0], 1100, q[2], 40, '#fff') : ''); });
    }
  } else { // Einstellungen: Mikro-Rechte, grosser Schalter links, darunter Tracking und Werbe-ID
    const D = D6(sc, 3), g = a === undefined ? i6flip(re, D, t) : { off: 1 }, k = back(cl((a === undefined ? re : 1) / .35));
    s += '<g transform="translate(630 842) scale(' + k + ') translate(-630 -842)"><rect x="350" y="722" width="560" height="240" rx="28" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + svgT(378, 766, 'Datenschutz  ›  Mikrofon', 28, '#5A6686', 'start');
    ['Spiele-App', 'Video-App', 'Chat-App'].forEach((n, i) => { const y = 812 + i * 54; s += '<line x1="372" y1="' + (y - 27) + '" x2="888" y2="' + (y - 27) + '" stroke="#DDE2EE" stroke-width="3"/><rect x="376" y="' + (y - 17) + '" width="34" height="34" rx="9" fill="' + A6C[[5, 0, 2][i]] + '"/>' + svgT(426, y + 12, n, 34, '#0B1020', 'start') + tog6(836, y, 78, i === 0 ? g.off : 0); });
    s += '</g>';
    // grosser Schalter links (gehoert zur Spiele-App)
    s += '<path d="M352 812 H318 Q300 812 300 830 V880" stroke="#D9CCFF" stroke-width="6" fill="none" stroke-dasharray="10 9" opacity="' + cl(re === undefined ? 1 : re / .4) + '"/>' + '<g transform="translate(190 930) scale(' + k + ')">' + tog6(0, 0, 220, g.off) + '</g>';
    if (a !== undefined) { const k2 = back(cl(a / .35)), off = ease(cl((a - .6) / .3)), dn = cl((a - 1.5) / .3);
      s += '<g transform="translate(630 1050) scale(' + k2 + ') translate(-630 -1050)"><rect x="350" y="978" width="560" height="146" rx="28" fill="#F4F6FB" stroke="#0B1020" stroke-width="6"/>' + svgT(378, 1034, 'Tracking erlauben', 34, '#0B1020', 'start') + tog6(836, 1022, 78, off) + '<line x1="372" y1="1052" x2="888" y2="1052" stroke="#DDE2EE" stroke-width="3"/>' + svgT(378, 1100, 'Werbe-ID löschen', 34, '#0B1020', 'start');
      s += '<g transform="translate(836 1088)"><circle r="24" fill="' + (dn > 0 ? '#3DFF7A' : '#DDE2EE') + '" stroke="#0B1020" stroke-width="4"/>' + (dn > 0 ? '<path d="M-11 0 L-3 9 L12 -8" stroke="#0B1020" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="scale(' + back(dn) + ')"/>' : '') + '</g></g>';
      if (a > .6 && a < 1.3) s += '<circle cx="' + lerp(868, 804, off) + '" cy="1022" r="' + (30 + 40 * cl((a - .6) / .7)) + '" fill="none" stroke="#7C5CFF" stroke-width="6" opacity="' + (1 - cl((a - .6) / .7)) + '"/>'; }
  }
  h += slot(ev, [['viral', 'Viraler Post: 841 Mal Mikro an?', 'red'], ['punkt', 'Punkt oben: Mikro läuft'], ['farben', 'iPhone orange, Android grün', 'hot'], ['rechte', 'Mikro-Rechte pro App prüfen'], ['act', 'Tracking aus, Werbe-ID löschen', 'hot']]);
  return W(s + shade3(), h);
};
WMASC.i6check_3 = (ev, t, lt, sc) => {
  if (ev.act !== undefined) return BIG3();
  if (ev.rechte !== undefined) return Object.assign(i6flip(ev.rechte, D6(sc, 3), t).m, { nospin: 1 });
  return BIG3();
};

// ---------- Schluss ----------
WORLD.i6outro_3 = function (sc, ev, t) { const OUTN = { neon: 1 }; let d = ''; for (let i = 0; i < 2; i++) { const c = (t * .9 + i * .5) % 1; d += '<circle cx="846" cy="928" r="' + (11 + 34 * c) + '" fill="none" stroke="#FF9A2A" stroke-width="5" opacity="' + (1 - c) + '"/>'; }
  return W(room6_3(t, OUTN) + phoneF(730, 895, 150, 235, '#1B2748') + mic6(805, 1030, .7, '#AEB9D6') + d + '<circle cx="846" cy="928" r="11" fill="#FF9A2A"/>' + shade3()); };

// ---------- Version 3.0: Kamera und Farbstimmung um jede Welt ----------
['h7i6_3','i6test_3','i6spur_3','i6check_3','i6outro_3'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#7C5CFF'); });
