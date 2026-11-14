// Informatik I006 "Hoert dein Handy dich wirklich ab?" (Bauplan wie C001 bis C004). Etikett y=600, Grafik y=700 bis 1130.

// ---------- Helfer ----------
const net6 = (t) => kitchen(t, '#07081C', '#1C1550', '#3DFF7A');
function pizza6(x, y, s, rot) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')"><path d="M0 -70 L60 58 Q0 82 -60 58 Z" fill="#FFC94D" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><path d="M-58 60 Q0 84 58 60" stroke="#C97A2B" stroke-width="16" fill="none" stroke-linecap="round"/><circle cx="-4" cy="-14" r="12" fill="#E5383B"/><circle cx="18" cy="28" r="11" fill="#E5383B"/><circle cx="-24" cy="32" r="10" fill="#E5383B"/></g>'; }
// Werbekarte: mit Pizza (pz) oder als graue Niete mit Fragezeichen
function ad6(x, y, s, rot, pz, op) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')" opacity="' + (op === undefined ? 1 : op) + '"><rect x="-80" y="-104" width="160" height="208" rx="22" fill="' + (pz ? '#fff' : '#8A93A8') + '" stroke="#0B1020" stroke-width="6"/><rect x="-80" y="-104" width="160" height="40" rx="20" fill="' + (pz ? '#E5383B' : '#5A6686') + '"/><rect x="-44" y="-90" width="88" height="12" rx="6" fill="#fff" opacity=".9"/>' + (pz ? pizza6(0, 14, .72, 8) + '<circle cx="50" cy="72" r="24" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/><path d="M40 82 L60 62" stroke="#0B1020" stroke-width="5" stroke-linecap="round"/><circle cx="42" cy="64" r="5" fill="#0B1020"/><circle cx="58" cy="80" r="5" fill="#0B1020"/>' : '<path d="M-22 -22 Q-22 -50 2 -50 Q28 -50 28 -24 Q28 -4 4 6 L4 26" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="4" cy="58" r="10" fill="#fff"/>') + '</g>'; }
function mic6(x, y, s, col) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><rect x="-22" y="-62" width="44" height="80" rx="22" fill="' + col + '"/><path d="M-40 -8 A40 40 0 0 0 40 -8" stroke="' + col + '" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M0 34 V60 M-26 60 H26" stroke="' + col + '" stroke-width="10" stroke-linecap="round"/></g>'; }
function lens6(x, y, s, rot) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')"><line x1="52" y1="52" x2="128" y2="128" stroke="#FFB020" stroke-width="26" stroke-linecap="round"/><circle r="72" fill="rgba(155,231,255,.2)" stroke="#fff" stroke-width="13"/><path d="M-44 -22 A50 50 0 0 1 -14 -46" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".8"/></g>'; }
const A6C = ['#FF7A59', '#3DB8FF', '#2ECC71', '#FFCC00', '#FF5A8A', '#B05CFF'];
function app6(x, y, sz, i, k, chk) { if (k <= 0) return ''; const c = A6C[i % 6], g = i % 3;
  const gl = g === 0 ? '<circle r="' + (sz * .2) + '" fill="#fff"/>' : g === 1 ? '<path d="M' + (-sz * .2) + ' ' + (-sz * .22) + ' L' + (sz * .24) + ' 0 L' + (-sz * .2) + ' ' + (sz * .22) + ' Z" fill="#fff"/>' : '<rect x="' + (-sz * .22) + '" y="' + (-sz * .16) + '" width="' + (sz * .44) + '" height="' + (sz * .32) + '" rx="' + (sz * .08) + '" fill="#fff"/>';
  return '<g transform="translate(' + (x + sz / 2) + ' ' + (y + sz / 2) + ') scale(' + back(cl(k)) + ')"><rect x="' + (-sz / 2) + '" y="' + (-sz / 2) + '" width="' + sz + '" height="' + sz + '" rx="' + (sz * .24) + '" fill="' + c + '" stroke="#0B1020" stroke-width="4"/>' + gl + (chk > 0 ? '<g transform="translate(' + (sz * .36) + ' ' + (-sz * .36) + ') scale(' + back(cl(chk)) + ')"><circle r="19" fill="#3DFF7A" stroke="#0B1020" stroke-width="4"/><path d="M-9 0 L-2 8 L10 -7" stroke="#0B1020" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>' : '') + '</g>'; }
function plate6(x, y, s, rot, glow) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + s + ')">' + (glow ? '<rect x="-158" y="-48" width="316" height="96" rx="20" fill="#FFD23F" opacity="' + glow + '"/>' : '') + '<rect x="-146" y="-36" width="292" height="72" rx="12" fill="#fff" stroke="#0B1020" stroke-width="6"/><rect x="-146" y="-36" width="46" height="72" rx="12" fill="#3B6BD6"/><rect x="-112" y="-36" width="12" height="72" fill="#3B6BD6"/>' + svgT(24, 15, 'ID 7F3K 9A', 40, '#0B1020') + '</g>'; }
// Schalter: k = 0 an (gruen), 1 aus (grau)
function tog6(x, y, w, k) { const h = w * .5, r = h / 2; return '<g transform="translate(' + x + ' ' + y + ')"><rect x="' + (-w / 2) + '" y="' + (-r) + '" width="' + w + '" height="' + h + '" rx="' + r + '" fill="' + lc('#3DFF7A', '#8A93A8', k) + '" stroke="#0B1020" stroke-width="' + Math.max(3, w * .035) + '"/><circle cx="' + lerp(w / 2 - r, -w / 2 + r, k) + '" cy="0" r="' + (r * .78) + '" fill="#fff" stroke="#0B1020" stroke-width="' + Math.max(3, w * .03) + '"/></g>'; }
function foot6(x, y, col, op, up) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (up ? -12 : 12) + ') scale(1.5)" opacity="' + op + '"><ellipse rx="19" ry="11" fill="' + col + '"/><circle cx="22" cy="-9" r="5" fill="' + col + '"/><circle cx="27" cy="0" r="5" fill="' + col + '"/><circle cx="22" cy="9" r="5" fill="' + col + '"/></g>'; }
function stars6(e, t) { let s = ''; for (let i = 0; i < 5; i++) { const a = t * 4 + i * 1.257; s += '<path transform="translate(' + (250 + 110 * Math.cos(a)) + ' ' + (1230 + 34 * Math.sin(a)) + ') scale(' + (1 - cl((e - 2.2) / .5)) + ')" d="M0 -22 L6 -7 L22 -7 L9 3 L14 20 L0 10 L-14 20 L-9 3 L-22 -7 L-6 -7 Z" fill="#FFE14D" stroke="#0B1020" stroke-width="3"/>'; } return s; }
const D6 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3.2;

// Gag Teil 1 (Verfolgung): Die Lupe nimmt Schalti ins Visier, jagt ihn nach rechts, schiesst unter ihm durch und gibt auf
function i6chase(q, D, t) { const u = cl(q / Math.max(1.8, D - .1)), run = 16 * Math.abs(Math.sin(t * 16)), HX = 220, HY = 1537;
  if (u < .18) { const k = ease(u / .18); return { m: { f: [HX, HY], s: 1, r: -7 * k }, e: [lerp(400, 430, k), lerp(900, 1425, k)], rot: 0 }; }
  if (u < .82) { const v = (u - .18) / .64;
    if (v < .5) { const x = HX + 560 * (v / .5); return { m: { f: [x, HY - run], s: 1, r: -8 + 5 * Math.sin(t * 16) }, e: [x - 215, 1425 + 12 * Math.sin(t * 12)], rot: 0 }; }
    if (v < .62) { const c = (v - .5) / .12; return { m: { f: [HX + 560, HY - 34 * Math.sin(Math.PI * c)], s: 1, r: 360 * c, flip: c > .5 }, e: [565 + 760 * c, 1425], rot: 0 }; }
    const c = (v - .62) / .38, x = HX + 560 * (1 - ease(c)); return { m: { f: [x, HY - run * (1 - c)], s: 1, r: 6 * Math.sin(t * 16) * (1 - c), flip: c < .92 }, e: null }; }
  const k = ease((u - .82) / .18); return { m: { f: [HX, HY], s: 1, r: 4 * Math.sin(t * 14) * (1 - k) }, e: [lerp(1220, 400, k), 900], rot: 0 };
}
// Gag Teil 2 (Eigentor): Schalti laeuft los, jeder Schritt wird zur Datenspur; er merkt es, rennt zurueck und macht nur noch mehr
function i6walk(q, D, t) { const u = cl(q / Math.max(2.6, D - .1)), HX = 220, HY = 1537, X1 = 770;
  if (u < .42) { const x = lerp(HX, X1, u / .42); return { u, x, m: { f: [x, HY], s: 1, walk: true, r: -3 } }; }
  if (u < .56) { const c = (u - .42) / .14; return { u, x: X1, m: { f: [X1, HY - 30 * Math.sin(Math.PI * cl(c * 2))], s: 1, r: c > .5 ? 7 * Math.sin(t * 22) : 0, flip: c > .3 } }; }
  if (u < .9) { const c = (u - .56) / .34, x = lerp(X1, HX, ease(c)); return { u, x, m: { f: [x, HY - 16 * Math.abs(Math.sin(t * 16))], s: 1, r: 8 + 6 * Math.sin(t * 16), flip: true } }; }
  return { u, x: HX, m: { f: [HX, HY], s: 1, r: -8 + 5 * Math.sin(t * 12) * (1 - (u - .9) / .1) } };
}
// Gag Teil 3 (Abwurf): Schalti springt auf den grossen Schalter, der kippt um und wirft ihn ab
function i6flip(q, D, t) { const u = cl(q / Math.max(2.4, D - .1)), H = [220, 1537], K = [252, 884];
  if (u < .28) { const k = ease(u / .28); return { off: 0, m: { f: [lerp(H[0], K[0], k), lerp(H[1], K[1], k) - 170 * Math.sin(Math.PI * k)], s: lerp(1, .6, k), r: -10 * Math.sin(Math.PI * k) } }; }
  if (u < .46) { const c = (u - .28) / .18; return { off: 0, m: { f: [K[0], K[1] - 26 * Math.abs(Math.sin(Math.PI * 3 * c))], s: .6, r: 0 } }; }
  if (u < .56) { const c = (u - .46) / .1; return { off: ease(c), m: { f: [K[0] - 20 * c, K[1] - 30 * Math.sin(Math.PI * c)], s: .6, r: -35 * c } }; }
  if (u < .84) { const c = (u - .56) / .28; return { off: 1, m: { f: [lerp(K[0] - 20, H[0], c), lerp(K[1], H[1], c * c)], s: lerp(.6, 1, c), r: -35 - 325 * c } }; }
  return { off: 1, m: { f: H, s: 1, r: -8 + 6 * Math.sin(t * 16) * (1 - (u - .84) / .16) } };
}

// ---------- Einstieg: Schalti fluestert "Pizza", das Handy spuckt Pizza-Werbung auf ihn ----------
WORLD.h7i6 = function (sc, ev, t, lt) {
  const e = ev.werbung, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end), sh = shake7(e, t), CX = 590, CY = 905, X = CX - 140, Y = CY - 220;
  let s = stage7(t, lt, '#07081C', e === undefined ? lc('#7C5CFF', '#3DFF7A', k) : '#FFC94D', CX, CY), o = '', fl = '';
  const jit = e === undefined ? 4 * k * k * Math.sin(t * 46) : 0;
  if (e === undefined) for (let i = 0; i < 3; i++) { const c = (t * .9 + i / 3) % 1; o += '<path d="M' + (X - 26 - 90 * c) + ' ' + (CY - 70 - 44 * c) + ' Q' + (X - 70 - 120 * c) + ' ' + CY + ' ' + (X - 26 - 90 * c) + ' ' + (CY + 70 + 44 * c) + '" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity="' + ((1 - c) * (.25 + .75 * k)) + '"/>'; }
  o += '<g transform="translate(' + jit + ' 0)">' + phoneF(X, Y, 280, 440, e === undefined ? lc('#1B2748', '#0F3A2A', k) : '#3A2A10');
  if (e === undefined || e < .08) { o += mic6(CX, CY - 56, 1.55, lc('#AEB9D6', '#3DFF7A', k)); for (let i = 0; i < 7; i++) { const hh = 14 + (16 + 64 * k) * Math.abs(Math.sin(t * (5 + i) + i * 1.7)); o += '<rect x="' + (CX - 98 + i * 30) + '" y="' + (CY + 120 - hh / 2) + '" width="16" height="' + hh + '" rx="8" fill="#3DFF7A" opacity="' + (.35 + .65 * k) + '"/>'; } }
  else o += ad6(CX, CY, 1.3 * back(cl((e - .08) / .25)), 4 * Math.sin(t * 9), true);
  o += '</g>';
  const bk = cl((k - .28) / .14); // Sprechblase "Pizza" kommt beim Handy an
  if (bk > 0 && (e === undefined || e < .15)) o += '<g transform="translate(' + (X - 150) + ' ' + (CY - 170) + ') scale(' + back(bk) + ') rotate(' + (-6 + 3 * Math.sin(t * 5)) + ')"><path d="M36 50 L66 100 L86 46 Z" fill="#fff" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><rect x="-124" y="-62" width="248" height="124" rx="46" fill="#fff" stroke="#0B1020" stroke-width="6"/><rect x="38" y="44" width="46" height="14" fill="#fff"/>' + pizza6(-72, 2, .48, -12) + svgT(30, 19, 'Pizza', 52, '#0B1020') + '</g>';
  if (e !== undefined) for (let i = 0; i < 9; i++) { const q = e - .1 - i * .07; if (q <= 0) continue; const tx = 170 + rnd(i + 4) * 230, ty = 1280 + rnd(i + 9) * 50, dir = i % 2 ? 1 : -1; let x, y, r;
    if (q < .5) { const c = q / .5; x = lerp(CX, tx, c); y = lerp(CY, ty, c) - 320 * Math.sin(Math.PI * c); r = 420 * c * dir; }
    else { const c2 = cl((q - .5) / .9); x = tx + dir * (150 + 220 * rnd(i)) * c2; y = ty - 170 * Math.sin(Math.PI * c2 * .9) + 560 * c2 * c2; r = 420 * dir + 380 * c2 * dir; }
    fl += ad6(x, y, .62, r, true, 1 - cl((q - 1.2) / .25)); }
  if (e !== undefined && e > .6) fl += stars6(e, t);
  s += pop7(CX, CY, lt, o) + fl + sweat7(t, e === undefined ? k * .7 : 0);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + vign7() + topShade());
};
WMASC.h7i6 = (ev, t, lt, sc) => { const e = ev.werbung, end = sc.lines[3] ? sc.lines[3].start - sc.start : 6, k = cl(lt / end);
  if (e !== undefined && e > .55) { const b = cl((e - .55) / .25); return { f: [220 - 30 * b, 1537], s: 1, r: -12 * b + 6 * Math.sin(t * 7) }; }
  return { f: [220, 1537], s: 1, r: 4 * k + 2 * k * Math.sin(t * 12) };
};

// ---------- Teil 1: Verdacht, Test mit 17.000 Apps, ein Jahr Datenverkehr, kein heimlicher Ton ----------
WORLD.i6test = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
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
  return W(s + topShade(), h);
};
WMASC.i6test = (ev, t, lt, sc) => {
  if (ev.act !== undefined) return BIG();
  if (ev.jahr !== undefined) return i6chase(ev.jahr, D6(sc, 2), t).m;
  return BIG();
};

// ---------- Teil 2: Datenspuren, Werbe-ID, Profil, Treffer und Fehlschuesse ----------
WORLD.i6spur = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
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
  return W(s + topShade(), h);
};
WMASC.i6spur = (ev, t, lt, sc) => {
  if (ev.act !== undefined) return BIG();
  if (ev.profil !== undefined) return i6walk(ev.profil, D6(sc, 2), t).m;
  return BIG();
};

// ---------- Teil 3: Punkt in der Statusleiste, Farben, Mikro-Rechte, Tracking und Werbe-ID ----------
WORLD.i6check = function (sc, ev, t, lt) {
  let s = net6(t), h = '';
  const p = ev.punkt === undefined ? 0 : ev.punkt, fa = ev.farben, re = ev.rechte, a = ev.act;
  const dot = (x, y, r, col) => { let d = ''; for (let i = 0; i < 2; i++) { const c = (t * .9 + i * .5) % 1; d += '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 46 * c) + '" fill="none" stroke="' + col + '" stroke-width="6" opacity="' + (1 - c) + '"/>'; } return d + '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + col + '"/>'; };
  if (re === undefined && a === undefined) {
    if (fa === undefined) { // ein grosses Handy: Mikro laeuft, Punkt oben
      s += phoneF(300, 725, 440, 405, '#1B2748') + svgT(350, 800, '12:00', 36, '#fff', 'start') + batt(640, 772, 62, 32, .7);
      s += mic6(520, 960, 1.5, '#fff'); for (let i = 0; i < 3; i++) { const c = (t * .8 + i / 3) % 1; s += '<path d="M' + (590 + 60 * c) + ' ' + (880 - 30 * c) + ' Q' + (640 + 80 * c) + ' 950 ' + (590 + 60 * c) + ' ' + (1020 + 30 * c) + '" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + (1 - c) + '"/><path d="M' + (450 - 60 * c) + ' ' + (880 - 30 * c) + ' Q' + (400 - 80 * c) + ' 950 ' + (450 - 60 * c) + ' ' + (1020 + 30 * c) + '" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + (1 - c) + '"/>'; }
      const k = cl((p - .7) / .3); if (k > 0) { s += '<g opacity="' + k + '">' + dot(566, 788, 18, '#FF9A2A') + '</g>'; }
    } else { // zwei Handys: iPhone orange, Android gruen
      [[410, '#FF9A2A', 'iPhone', 0], [760, '#3DFF7A', 'Android', .5]].forEach(q => { const k = back(cl((fa - q[3]) / .35)); if (k <= 0) return;
        s += '<g transform="translate(' + q[0] + ' 900) scale(' + k + ') translate(' + (-q[0]) + ' -900)">' + phoneF(q[0] - 125, 725, 250, 320, '#1B2748') + dot(q[0] + 64, 782, 20, q[1]) + mic6(q[0], 920, 1, '#AEB9D6') + '</g>' + (k > .6 ? svgT(q[0], 1100, q[2], 40, '#fff') : ''); });
    }
  } else { // Einstellungen: Mikro-Rechte, grosser Schalter links, darunter Tracking und Werbe-ID
    const D = D6(sc, 2), g = a === undefined ? i6flip(re, D, t) : { off: 1 }, k = back(cl((a === undefined ? re : 1) / .35));
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
  h += slot(ev, [['punkt', 'Punkt oben: Mikro läuft'], ['farben', 'iPhone orange, Android grün', 'hot'], ['rechte', 'Mikro-Rechte pro App prüfen'], ['act', 'Tracking aus, Werbe-ID löschen', 'hot']]);
  return W(s + topShade(), h);
};
WMASC.i6check = (ev, t, lt, sc) => {
  if (ev.act !== undefined) return BIG();
  if (ev.rechte !== undefined) return i6flip(ev.rechte, D6(sc, 2), t).m;
  return BIG();
};

// ---------- Schluss ----------
WORLD.i6outro = function (sc, ev, t) { let d = ''; for (let i = 0; i < 2; i++) { const c = (t * .9 + i * .5) % 1; d += '<circle cx="846" cy="928" r="' + (11 + 34 * c) + '" fill="none" stroke="#FF9A2A" stroke-width="5" opacity="' + (1 - c) + '"/>'; }
  return W(net6(t) + phoneF(730, 895, 150, 235, '#1B2748') + mic6(805, 1030, .7, '#AEB9D6') + d + '<circle cx="846" cy="928" r="11" fill="#FF9A2A"/>' + topShade()); };
