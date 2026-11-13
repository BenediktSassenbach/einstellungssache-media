// Vollbild-Welten fuer die Physik-Videos P002 bis P004 (Stil wie Pilot P005).
// WORLD.viz zeichnet einen Themen-Hintergrund ueber den ganzen Bildschirm und legt die Erklaer-Grafik ohne Rahmen darauf.
const VX = 30, VY = 575, VS = 1.1; // Grafik 812 x 520 -> Seite (30..923, 575..1147)
const vp = (x, y) => [VX + VS * x, VY + VS * y];
const THEME = {
  kupfer: ['#1A0F0A', '#3A1E12', '#FF9A50'], akku: ['#07140F', '#0F3A2A', '#2ECC71'], alarm: ['#1A0709', '#3A1216', '#FF5A5A'],
  magnet: ['#0B0A1A', '#231A4A', '#B05CFF'], licht: ['#0B1020', '#1B2748', '#FFD93B'], himmel: ['#071A3A', '#1E5BB8', '#8FC8FF'], abend: ['#1A0F2E', '#5A2A4A', '#FF8A2A']
};
function backdrop(th, t, kind) { const c = THEME[th] || THEME.licht; let s = '<defs><radialGradient id="bd" cx=".5" cy=".45" r=".75"><stop offset="0" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[0] + '"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#bd)"/>';
  for (let i = 0; i < 36; i++) { const x = rnd(i + 900) * 1080, sp = 20 + rnd(i + 950) * 50, y = 1920 - ((t * sp + rnd(i + 990) * 1920) % 1920), r = 3 + rnd(i + 20) * 9; s += '<circle cx="' + (x + 20 * Math.sin(t + i)) + '" cy="' + y + '" r="' + r + '" fill="' + c[2] + '" opacity="' + (.12 + .18 * rnd(i + 40)) + '"/>'; }
  for (let i = 0; i < 4; i++) s += '<circle cx="' + (540 + 420 * Math.sin(t * .2 + i * 1.7)) + '" cy="' + (860 + 300 * Math.cos(t * .17 + i * 2.1)) + '" r="' + (220 + 60 * i) + '" fill="' + c[2] + '" opacity=".05"/>';
  return s; }
WORLD.viz = function (sc, ev, t, lt, E) {
  const p = sc.panel, L = p.labels || {}, f = VIZ[p.mode]; WMODE = true; const r = f(p, ev, t, E, L); WMODE = false;
  const win = p.window ? 'border-radius:34px;overflow:hidden;box-shadow:0 0 0 6px rgba(255,255,255,.15),0 30px 80px rgba(0,0,0,.5);' : '';
  return W(backdrop(p.theme, t) + topShade()) + '<div style="position:absolute;left:' + VX + 'px;top:' + VY + 'px;width:812px;height:520px;transform:scale(' + VS + ');transform-origin:0 0;' + win + '"><svg width="812" height="520" viewBox="0 0 812 520" style="position:absolute;left:0;top:0;overflow:visible">' + r[0] + '</svg>' + r[1] + '</div>';
};
WORLD.plain = function (sc, ev, t) { return W(backdrop(sc.theme || 'licht', t) + topShade()); };
// Einstieg P002: Handy laedt und wird heiss (Waermebild)
WORLD.hotphone = function (sc, ev, t, lt) {
  const k = cl(lt / 6), hot = lc('#3B8BFF', '#FF3B2A', k); let s = backdrop('alarm', t);
  s += '<g transform="translate(162 300) scale(.7)">';
  s += '<rect x="360" y="600" width="360" height="560" rx="56" fill="#0B1020" stroke="#fff" stroke-width="10"/>';
  s += '<defs><radialGradient id="th" cx=".5" cy=".6" r=".6"><stop offset="0" stop-color="' + lc('#5CE1FF', '#FFE14D', k) + '"/><stop offset=".5" stop-color="' + hot + '"/><stop offset="1" stop-color="' + lc('#123A8A', '#7A1A1A', k) + '"/></radialGradient></defs><rect x="378" y="618" width="324" height="524" rx="44" fill="url(#th)" opacity="' + (.35 + .6 * k) + '"/>';
  s += '<rect x="470" y="800" width="140" height="70" rx="14" fill="none" stroke="#fff" stroke-width="8"/><rect x="610" y="820" width="14" height="30" rx="5" fill="#fff"/><rect x="480" y="810" width="' + (120 * (.3 + .6 * k)) + '" height="50" rx="8" fill="#2ECC71"/><path d="M548 880 l-20 40 h26 l-12 36 l40 -52 h-26 l14 -24 z" fill="#FFE14D"/>';
  s += '<path d="M540 1160 C 540 1260, 420 1260, 420 1400" stroke="#F4F6FB" stroke-width="18" fill="none"/>';
  for (let i = 0; i < 5; i++) { const c = (t * .7 + rnd(i)) % 1, x = 400 + i * 70; s += '<path d="M' + x + ' ' + (590 - c * 60) + ' q 16 -20 0 -40 q -16 -20 0 -40" fill="none" stroke="#FF9A50" stroke-width="7" stroke-linecap="round" opacity="' + k * (1 - c) + '"/>'; }
  s += '<rect x="790" y="640" width="44" height="380" rx="22" fill="#fff"/><rect x="800" y="' + (650 + 360 * (1 - (.25 + .7 * k))) + '" width="24" height="' + (360 * (.25 + .7 * k)) + '" rx="12" fill="' + hot + '"/><circle cx="812" cy="1040" r="38" fill="' + hot + '" stroke="#fff" stroke-width="8"/>';
  s += '</g>';
  return W(s + topShade());
};
// Einstieg P003: Handy landet auf der Ladematte, Funken ohne Kabel
WORLD.padhook = function (sc, ev, t, lt) {
  let s = backdrop('magnet', t); const k = ease(cl((lt - .4) / 1.4)), py = lerp(560, 860, k), CX = 520;
  s += '<ellipse cx="' + CX + '" cy="1010" rx="300" ry="80" fill="#26335E" stroke="#56618A" stroke-width="6"/>';
  for (let r = 50; r <= 230; r += 30) s += '<ellipse cx="' + CX + '" cy="1010" rx="' + r + '" ry="' + (r * .26) + '" fill="none" stroke="#E08A3C" stroke-width="7" opacity="' + (.5 + .5 * Math.abs(Math.sin(t * 4 + r))) + '"/>';
  if (k >= 1) for (let i = 0; i < 5; i++) { const c = (t * 1.5 + i / 5) % 1; s += '<ellipse cx="' + CX + '" cy="1000" rx="' + (60 + 260 * c) + '" ry="' + ((60 + 260 * c) * .3) + '" fill="none" stroke="#B05CFF" stroke-width="5" opacity="' + (1 - c) + '"/>'; }
  s += '<rect x="' + (CX - 200) + '" y="' + (py - 50) + '" width="400" height="100" rx="50" fill="#3A4A7A" stroke="#fff" stroke-width="7"/><rect x="' + (CX + 120) + '" y="' + (py - 20) + '" width="60" height="34" rx="8" fill="#0B1020" stroke="#fff" stroke-width="4"/><rect x="' + (CX + 125) + '" y="' + (py - 15) + '" width="' + (50 * (k >= 1 ? .3 + .6 * cl((lt - 1.8) / 4) : .3)) + '" height="24" rx="5" fill="#2ECC71"/>';
  let h = k >= 1 ? '<span class="vemo" style="left:' + (CX - 40) + 'px;top:' + (py - 150 - 10 * Math.abs(Math.sin(t * 6))) + 'px;font-size:80px">⚡</span>' : '';
  h += '<div class="vlab red" style="left:60px;top:620px;font-size:44px;' + pop(cl((lt - .2) / .35), 'left center') + '">Kein Kabel?!</div>';
  return W(s + topShade(), h);
};
// Einstieg P004: Himmel wechselt von Blau zu Abendrot
WORLD.skyhook = function (sc, ev, t, lt) {
  const k = .5 - .5 * Math.cos(cl(lt / 7) * Math.PI), top = lc('#1E5BB8', '#2A1C5A', k), bot = lc('#8FC8FF', '#FF7A30', k);
  let s = '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bot + '"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sky)"/>';
  const sx = lerp(300, 820, k), sy = lerp(680, 1060, k); s += sun(sx, sy, 70, t, lc('#FFD93B', '#FF7A30', k));
  [[200, 760], [640, 700]].forEach((c, i) => { const x = c[0] + 30 * Math.sin(t * .4 + i); s += '<g transform="translate(' + x + ' ' + c[1] + ')"><circle r="50" fill="#fff"/><circle cx="55" cy="-20" r="62" fill="#fff"/><circle cx="118" cy="6" r="46" fill="#fff"/><rect x="0" y="0" width="118" height="50" fill="#fff"/></g>'; });
  s += '<path d="M0 1110 Q 540 1060 1080 1110 L1080 1920 L0 1920 Z" fill="#1F7A4A"/>';
  return W(s + topShade());
};

// Schalti-Posen fuer diese Welten (Fusspunkte in Seitenkoordinaten)
WMASC.hotphone = (ev, t, lt) => { const m = ev.mark; if (m !== undefined && m < 1.2) { const k = m < .4 ? ease(m / .4) : 1 - ease((m - .4) / .8); return { f: go([230, 1120], [330, 1120], k), s: .55, r: m > .4 && m < .8 ? -15 : 0 }; } return { f: [230, 1120], s: .55 }; };
WMASC.padhook = () => ({ f: [860, 1120], s: .48, prop: '🪄' });
WMASC.skyhook = (ev, t) => ({ f: [180, 1125], s: .55, r: -6 + 2 * Math.sin(t * 2) });
WMASC.plain = () => null;
WMASC.viz = (ev, t, lt, sc) => { const md = sc.panel.mode, P = (x, y) => vp(x, y);
  if (md === 'draht') { // laeuft oben auf dem Kabel mit, wird geschuettelt, schwitzt
    if (ev.act !== undefined) return { f: [640, 846], s: .42 };
    if (ev.p3 !== undefined) return { f: [640, 846], s: .42, r: 4 * Math.sin(t * 9) };
    if (ev.p2 !== undefined) return { f: [600 + 8 * Math.sin(t * 30), 846], s: .42, r: 8 * Math.sin(t * 22) };
    if (ev.p1 !== undefined) { const k = ease(cl(ev.p1 / 2.5)); return { f: [lerp(180, 600, k), 846], s: .42, walk: k < 1 }; }
    return { f: [180, 846], s: .42 }; }
  if (md === 'akku') { if (ev.act2 !== undefined) return { f: [820, 1530], s: .42, r: 6 * Math.sin(t * 12) };
    if (ev.p2 !== undefined) return { f: [560, 642], s: .38, r: 5 * Math.sin(t * 18) };
    if (ev.p1 !== undefined) { const k = ease(cl(ev.p1 / 2)); return { f: [lerp(460, 640, k), 642], s: .38, walk: k < 1 }; }
    return { f: [460, 642], s: .38 }; }
  if (md === 'heiss') return { f: ev.act !== undefined ? [820, 1530] : [865, 1120], s: .42, r: ev.blaeh !== undefined && ev.p1 === undefined ? 5 * Math.sin(t * 10) : 0 };
  if (md === 'spule') return { f: [870, 1100], s: .44, r: ev.p2 !== undefined ? 8 * Math.sin(t * 4) : 0 };
  if (md === 'induktion') { const lift = ev.act2 !== undefined; return { f: [870, lift ? 1060 - 40 * Math.abs(Math.sin(t * 5)) : 1100], s: .44 }; }
  if (md === 'qifehler') return ev.p1 !== undefined ? { f: ev.act !== undefined ? [820, 1530] : [875, 1120], s: .42 } : { f: [170, 1120], s: .45, r: ev.metall !== undefined ? 6 * Math.sin(t * 12) : 0 };
  if (md === 'licht') { // surft auf der Welle, die gerade erklaert wird
    if (ev.p3 !== undefined && ev.act === undefined) { const x = 600, y = 450 + 30 * Math.sin((x - 220) / 58 * 6.283 - t * 23.8); return { f: P(x, y - 8), s: .3 }; }
    if (ev.p2 !== undefined && ev.act === undefined) { const x = 600, y = 340 + 34 * Math.sin((x - 220) / 230 * 6.283 - t * 6); return { f: P(x, y - 8), s: .3 }; }
    if (ev.act !== undefined) return { f: P(330, 62), s: .34 };
    return { f: P(330, 62), s: .34 }; }
  if (md === 'streuung') { if (ev.act !== undefined) return { f: P(406, 500), s: .38, prop: '' }; return { f: [150, 1120], s: .44 }; }
  if (md === 'abend') { const tief = ev.tief === undefined ? 0 : ease(ev.tief / 1.4); return { f: P(406, 381), s: .3, r: lerp(0, 10, tief) }; }
  return null; };
