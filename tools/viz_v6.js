// v6: einheitlicher Einstieg (Titel oben, Schalti gross vorne links, Themen-Objekt in der Mitte, Cartoon-Gag am Ende)
// und groesserer Schalti in den Teilen. Welten aus v4/v5 werden wiederverwendet, nur Schalti-Posen sind neu.
const BIG = (x) => ({ f: [x || 220, 1537], s: 1 });
function hookBase(t, c0, c1) { return bgRad(c0, c1, .45) + dust(t, '#ffffff', 26, .08); }
function boom(x, y, k, t) { // Explosion: Blitz, Stern, Truemmer, Rauch
  let s = ''; if (k < .18) s += '<rect width="1080" height="1920" fill="#fff" opacity="' + (1 - k / .18) + '"/>';
  const g = back(cl(k / .35)), fade = 1 - cl((k - .5) / .5);
  let st = ''; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, r = i % 2 ? 120 : 260; st += (i ? 'L' : 'M') + (x + r * g * Math.cos(a)) + ' ' + (y + r * g * Math.sin(a)); }
  s += '<path d="' + st + 'Z" fill="#FFCC00" opacity="' + fade + '"/>';
  let st2 = ''; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8 + .2, r = i % 2 ? 70 : 160; st2 += (i ? 'L' : 'M') + (x + r * g * Math.cos(a)) + ' ' + (y + r * g * Math.sin(a)); }
  s += '<path d="' + st2 + 'Z" fill="#FF5A2A" opacity="' + fade + '"/>';
  for (let i = 0; i < 10; i++) { const a = rnd(i + 300) * 6.283, d = 80 + 420 * cl(k / .9); s += '<rect x="' + (x + d * Math.cos(a)) + '" y="' + (y + d * Math.sin(a) + 300 * k * k) + '" width="26" height="16" rx="4" fill="#3A4A7A" transform="rotate(' + (k * 700 + i * 40) + ' ' + (x + d * Math.cos(a)) + ' ' + (y + d * Math.sin(a) + 300 * k * k) + ')" opacity="' + (1 - cl((k - .8) / .4)) + '"/>'; }
  return s; }
function smoke(x, y, t, n, op) { let s = ''; for (let i = 0; i < (n || 4); i++) { const c = (t * .6 + i / (n || 4)) % 1; s += '<circle cx="' + (x + 30 * Math.sin(c * 6 + i)) + '" cy="' + (y - 120 * c) + '" r="' + (18 + 30 * c) + '" fill="#6A6F7E" opacity="' + ((op || .7) * (1 - c)) + '"/>'; } return s; }

// ---------- P002: Handy wird heiss und explodiert ----------
WORLD.h6p2 = function (sc, ev, t, lt) {
  const e = ev.gefahr; let s = hookBase(t, '#12070A', '#3A1216');
  const k = cl(lt / Math.max(1, (sc.lines[3] ? sc.lines[3].start - sc.start : 5))), hc = heatCol(k), X = 560, Y = 760, Wd = 240, H = 360, sh = e === undefined ? 4 * k * k * Math.sin(t * 60) : 0;
  if (e === undefined || e < .1) {
    s += '<circle cx="' + (X + Wd / 2) + '" cy="' + (Y + H / 2) + '" r="' + (210 + 25 * Math.sin(t * 8 * (1 + k))) + '" fill="' + hc + '" opacity="' + (.1 + .3 * k) + '"/>';
    s += '<g transform="translate(' + sh + ' ' + (-sh) + ')">' + phoneF(X, Y, Wd, H, hc) + batt(X + 70, Y + 120, 100, 52, .3 + .6 * k, k > .7 ? '#FF3B2A' : '#2ECC71') + bolt(X + 120, Y + 230, 1) + '</g>';
    s += '<path d="M' + (X + Wd / 2) + ' ' + (Y + H) + ' C ' + (X + Wd / 2) + ' 1220, 980 1180, 1100 1250" stroke="#F4F6FB" stroke-width="14" fill="none"/>';
    s += heatW(X - 20, X + Wd + 20, Y - 6, t * (1 + 2 * k), k, 5) + thermo(900, 760, 260, k, hc);
  } else { s += boom(X + Wd / 2, Y + H / 2, e, t) + smoke(X + Wd / 2, Y + H / 2 + 40, t, 5, cl(e - .3)) + smoke(230, 1320, t, 3, cl(e - .2) * .8); }
  return W(s + topShade());
};
WMASC.h6p2 = (ev, t) => { const e = ev.gefahr;
  if (e !== undefined) { const blown = cl(e / .3); return { f: [220 - 40 * blown, 1537], s: 1, r: -14 * blown + 4 * Math.sin(t * 20) * (1 - cl((e - 1) / 1)), fx: e > .12 ? 'brightness(.32) contrast(1.3)' : '' }; }
  return { f: [220, 1537], s: 1, r: 2 * Math.sin(t * 9) };
};

// ---------- P003: Kabel ab, Handy landet, Blitz trifft Schalti ----------
WORLD.h6p3 = function (sc, ev, t, lt) {
  let s = hookBase(t, '#0B0A1A', '#231A4A');
  const m = ev.mark === undefined ? -1 : ev.mark, cut = m > .7, fall = cl((m - .9) / .5), land = ease(cl((m - 1.3) / .9)), CX = 640, py = lerp(800, 960, land), e = ev.nicht;
  s += padSide(CX, 1045, 230, land);
  if (land >= 1) for (let i = 0; i < 4; i++) { const c = (t * (e === undefined ? 1.2 : 3) + i / 4) % 1; s += '<ellipse cx="' + CX + '" cy="1040" rx="' + (80 + 220 * c) + '" ry="' + ((80 + 220 * c) * .22) + '" fill="none" stroke="#B05CFF" stroke-width="5" opacity="' + (1 - c) + '"/>'; }
  if (!cut) s += '<path d="M' + (CX + 190) + ' ' + py + ' C 900 ' + py + ', 920 760, 1100 720" stroke="#F4F6FB" stroke-width="16" fill="none"/>';
  else if (fall < 1) s += '<path d="M940 ' + (780 + 400 * fall * fall) + ' C 980 770, 1020 750, 1100 720" stroke="#F4F6FB" stroke-width="16" fill="none" opacity="' + (1 - fall) + '"/>';
  if (m > .2 && m < 1.2) { const k = cl((m - .2) / .5), op = 1 - cl((m - .9) / .3), a = 25 * Math.sin(Math.PI * k * 2); s += '<g transform="translate(900 ' + (py + 10) + ') scale(1.3)" opacity="' + op + '"><g transform="rotate(' + a + ')"><rect x="-6" y="-70" width="12" height="70" fill="#C8CFE0"/><circle cx="-14" cy="18" r="18" fill="none" stroke="#FF5A5A" stroke-width="9"/></g><g transform="rotate(' + (-a) + ')"><rect x="-6" y="-70" width="12" height="70" fill="#E6EAF4"/><circle cx="14" cy="18" r="18" fill="none" stroke="#FF5A5A" stroke-width="9"/></g></g>'; }
  s += '<rect x="' + (CX - 190) + '" y="' + (py - 44) + '" width="380" height="88" rx="44" fill="#3A4A7A" stroke="#fff" stroke-width="7"/>' + batt(CX - 55, py - 24, 100, 48, land >= 1 ? .3 + .5 * cl((m - 2.2) / 3) : .3);
  if (e !== undefined && e < .9) { const fl = Math.floor(t * 30) % 2; let d = 'M' + (CX - 150) + ' 1030'; for (let i = 1; i <= 6; i++) { const u = i / 6; d += ' L' + (lerp(CX - 150, 260, u) + (i < 6 ? (fl ? 30 : -30) * (i % 2 ? 1 : -1) : 0)) + ' ' + (lerp(1030, 1330, u) + (i < 6 ? (fl ? -20 : 20) : 0)); }
    s += '<path d="' + d + '" stroke="#FFE14D" stroke-width="16" fill="none" stroke-linejoin="round"/><path d="' + d + '" stroke="#fff" stroke-width="6" fill="none"/>';
    if (e < .12) s += '<rect width="1080" height="1920" fill="#FFE14D" opacity="' + (.5 * (1 - e / .12)) + '"/>'; }
  if (e !== undefined && e >= .5) { s += smoke(230, 1320, t, 3, .6); for (let i = 0; i < 5; i++) { const a = t * 3 + i * 1.256; s += bolt(220 + 150 * Math.cos(a), 1290 + 30 * Math.sin(a), .5, '#FFE14D', .8); } }
  return W(s + topShade());
};
WMASC.h6p3 = (ev, t) => { const e = ev.nicht;
  if (e !== undefined) { const zap = e < .9; return { f: [220, 1537], s: 1, r: zap ? 8 * Math.sin(t * 50) : 3 * Math.sin(t * 6), fx: zap ? (Math.floor(t * 15) % 2 ? 'invert(1)' : 'brightness(1.6)') : 'brightness(.75) contrast(1.4)' }; }
  return { f: [220, 1537], s: 1 };
};

// ---------- P004: Sonne faellt Schalti auf den Kopf, alles wird rot ----------
WORLD.h6p4 = function (sc, ev, t, lt) {
  const e = ev.abend, red = e === undefined ? 0 : ease(cl((e - .5) / 1.2));
  let s = skyG('sk6', lc('#1E5BB8', '#2A1C5A', red), lc('#8FC8FF', '#FF7A30', red));
  s += cloud(560 + 30 * Math.sin(t * .4), 820, 1, 1 - .3 * red) + cloud(820, 1000, .7, 1 - .3 * red);
  for (let i = 0; i < 3; i++) { const bx = ((t * 60 + i * 140) % 1300) - 100, by = 950 + i * 30 + 10 * Math.sin(t * 3 + i); s += '<path d="M' + bx + ' ' + by + ' q 14 -14 28 0 q 14 -14 28 0" stroke="#0B1020" stroke-width="5" fill="none" opacity=".6"/>'; }
  let sx = 780, sy = 760;
  if (e !== undefined) { const f = cl(e / .55); if (f < 1) { sx = lerp(780, 240, f); sy = 760 + (1290 - 760) * f * f; } else { const b = cl((e - .55) / .9); sx = lerp(240, 1250, b); sy = 1290 - 520 * Math.sin(Math.PI * b * .9); } }
  s += sun(sx, sy, 70, t, lc('#FFD93B', '#FF5A2A', red));
  if (e !== undefined && e > .5) for (let i = 0; i < 5; i++) { const a = t * 4 + i * 1.256; s += '<path transform="translate(' + (220 + 130 * Math.cos(a)) + ' ' + (1300 + 26 * Math.sin(a)) + ') scale(.9)" d="M0 -20 L6 -6 L20 0 L6 6 L0 20 L-6 6 L-20 0 L-6 -6 Z" fill="#FFE14D"/>'; }
  s += '<path d="M0 1500 Q 540 1440 1080 1500 L1080 1920 L0 1920 Z" fill="' + lc('#1F7A4A', '#123A2A', red) + '" opacity=".9"/>';
  return W(s + topShade(true));
};
WMASC.h6p4 = (ev, t) => { const e = ev.abend;
  if (e !== undefined && e > .5) return { f: [220, 1537], s: 1, r: 6 * Math.sin(t * 7), fx: 'sepia(1) saturate(7) hue-rotate(-45deg) brightness(.9)' };
  return { f: [220, 1537], s: 1, r: -4 + 3 * Math.sin(t * 2) };
};

// ---------- Teile: gleiche Welten, groesserer Schalti ----------
const W6 = (name, pose) => { WORLD[name + '6'] = WORLD[name]; WMASC[name + '6'] = pose; };
W6('p2draht', (ev, t) => {
  if (ev.p3 !== undefined) return BIG();
  if (ev.p2 !== undefined) return { f: [600 + 6 * Math.sin(t * 30), 748], s: .4, r: 6 * Math.sin(t * 24) };
  if (ev.p1 !== undefined) { const k = ease(cl(ev.p1 / 2.5)); return { f: [lerp(240, 600, k), 748], s: .37, walk: k < 1, r: Math.sin(t * 7) > .7 ? -14 : 0 }; }
  return BIG(); });
W6('p2akku', (ev, t) => {
  if (ev.act !== undefined) return BIG();
  const w = WMASC.p2akku(ev, t); return ev.p1 !== undefined ? { f: [w.f[0], w.f[1] + 4], s: .32, r: w.r } : BIG(); });
W6('p2gefahr', (ev, t) => {
  if (ev.blaeh !== undefined && ev.p1 === undefined) return { f: [190, 992], s: .5, r: 6 * Math.sin(t * 14) };
  return Object.assign(BIG(), ev.warm !== undefined && ev.blaeh === undefined ? { r: 3 * Math.sin(t * 8) } : {}); });
W6('p3spule', (ev, t) => {
  if (ev.p2 !== undefined) return { f: [860, 1052], s: .45, r: 14 * Math.max(-1, Math.min(1, acS(t) * 3)) };
  if (ev.p1 !== undefined) { const a = .25 + 1.0 * Math.sin(2 * Math.PI * ACF * t); return { f: [540 + 238 * Math.cos(a), 905 + 238 * Math.sin(a)], s: .38, walk: true, flip: Math.cos(2 * Math.PI * ACF * t) < 0 }; }
  return BIG(); });
W6('p3induk', (ev, t) => {
  if (ev.act !== undefined || ev.act2 !== undefined) return BIG();
  if (ev.heben !== undefined) { const lift = ease(cl(ev.heben / 1)); return { f: [lerp(300, 440, lift), 1062], s: .46, r: 3 * Math.sin(t * 12) * lift, walk: lift > 0 && lift < 1 }; }
  if (ev.p2 !== undefined) return { f: [430, 932], s: .34, r: 8 * Math.sin(t * 8) };
  const down = ease(cl((ev.p1 || 0) / 1)); return { f: [430, lerp(758, 932, down)], s: .34 }; });
W6('p3fehler', (ev, t) => { const CX = 540;
  if (ev.act !== undefined || ev.p3 !== undefined || (ev.metall !== undefined && ev.p1 === undefined)) return Object.assign(BIG(), ev.metall !== undefined && ev.p1 === undefined ? { r: 5 * Math.sin(t * 12) } : {});
  if (ev.p2 !== undefined) { const k = ease(cl(ev.p2 / 1)); return { f: [lerp(330, 130, k), 1118], s: .42, walk: k > 0 && k < 1, flip: true }; }
  if (ev.p1 !== undefined) { const k = ease(cl(ev.p1 / .7)); return { f: [lerp(CX + 50, CX - 160, k), 1000], s: .4, walk: k < 1 }; }
  if (ev.schief !== undefined) { const k = ease(cl(ev.schief / .9)); return { f: [lerp(CX - 160, CX + 50, k), 1000], s: .4, walk: k < 1 }; }
  return BIG(); });
W6('p4mix', (ev, t, lt, sc) => {
  if (ev.streu !== undefined && ev.act === undefined) return BIG();
  if (ev.act !== undefined) return { f: [540, 1114], s: .46 };
  const w = WMASC.p4mix(ev, t, lt, sc); return { f: w.f, s: w.s * 1.25, r: w.r }; });
W6('p4lila', (ev, t) => {
  if (ev.p1 !== undefined && ev.p2 === undefined) return { f: [220, 1537], s: 1, r: 10 * Math.sin(t * 3) };
  return BIG(); });
W6('p4abend', (ev, t) => ({ f: [560, 1084], s: .42, r: ev.tief === undefined ? 0 : 6 }));
