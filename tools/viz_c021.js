// C021 "Warum schiesst Cola mit Mentos hoch?" (Chemie) im Skript 4, Fassung v2 (17.11.2026). Design-Kennung 3.3.
// Benedikts Wunsch: Hintergrund passend zum Thema, Cola nicht nur hineingestellt, Interaktion statt Schaubild. Kein Wissenschaftsmodus.
// Drei Orte: Kueche (Schalti klein auf der Arbeitsplatte neben der riesigen Flasche), in der Flasche (geloestes CO2),
// auf der Mentos-Oberflaeche unter dem Mikroskop (Kraterlandschaft aus Poren).
// Einstieg: Schalti wirft eine Mentos in den Hals, Fontaene klatscht an die Schraenke, Cola regnet auf ihn, er klebt fest.
// Teil 1: in der Flasche, Molekuele zur Blase formen klappt nicht, pH-Messgeraet 3,0 vorher und nachher, Blase an seiner Hand.
// Teil 2: Poren-Landschaft, Schalti stolpert in eine Pore, Blasen wachsen, eine hebt ihn hoch; zurueck in der Kueche das Glas mit Kratzer.
// Teil 3: Schalti reitet auf der sinkenden Mentos, Blasenspur durch die ganze Flasche, Kruemel schweben oben, Light-Cola in der Kueche.
// Quelle der Pointe: Coffey 2008, American Journal of Physics. Zum Loeschen: diese Datei und videos/C021.
var AC21 = '#FF6BD6', GY21 = 1548, BX21 = 720, BS21 = 1.7, NY21 = GY21 - 380 * 1.7;
// ---------- Bausteine ----------
function kitchen21(t, o) { o = o || {}; let s = '<rect width="1080" height="1920" fill="#2F5D57"/>';
  for (let y = 300; y < GY21; y += 70) s += '<path d="M0 ' + y + ' H1080" stroke="#3E726B" stroke-width="3"/>'; for (let x = 0; x < 1080; x += 70) s += '<path d="M' + x + ' 300 V' + GY21 + '" stroke="#3E726B" stroke-width="3"/>';
  s += '<rect x="90" y="760" width="330" height="330" rx="14" fill="#3A4FB8" stroke="#6B4A2E" stroke-width="16"/><path d="M255 760 V1090 M90 925 H420" stroke="#6B4A2E" stroke-width="10"/><circle cx="350" cy="830" r="34" fill="#FFF1B8"/>';
  s += '<rect x="560" y="520" width="520" height="300" rx="10" fill="#C98A4B" stroke="#0B1020" stroke-width="6"/><path d="M820 520 V820" stroke="#0B1020" stroke-width="5"/><rect x="770" y="640" width="14" height="70" rx="6" fill="#0B1020"/><rect x="860" y="640" width="14" height="70" rx="6" fill="#0B1020"/>';
  if (o.splat) { const k = o.splat; for (let i = 0; i < 9; i++) { const x = 600 + i * 52 + 20 * rnd(i + 3), y = 820 + 10 * rnd(i); s += '<ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + (16 + 14 * rnd(i + 9)).toFixed(0) + '" ry="' + (10 + 30 * k * rnd(i + 5)).toFixed(0) + '" fill="#4A2412" opacity="' + (.85 * cl(k * 2)).toFixed(2) + '"/>'; } }
  s += '<rect y="' + GY21 + '" width="1080" height="40" fill="#E8D2B0" stroke="#0B1020" stroke-width="5"/><rect y="' + (GY21 + 40) + '" width="1080" height="340" fill="#A0663A"/>';
  for (let x = 20; x < 1080; x += 270) s += '<rect x="' + x + '" y="' + (GY21 + 70) + '" width="240" height="280" rx="10" fill="#B4774A" stroke="#0B1020" stroke-width="5"/><rect x="' + (x + 90) + '" y="' + (GY21 + 100) + '" width="60" height="14" rx="6" fill="#0B1020"/>';
  if (o.puddle) s += '<ellipse cx="' + (o.px || 520) + '" cy="' + (GY21 + 6) + '" rx="' + (90 + 330 * o.puddle).toFixed(0) + '" ry="16" fill="#4A2412" opacity=".9"/>';
  return s; }
// Flasche (x Mitte, b Boden, sc Groesse, fill 0..1, bub Blasen, light Light-Etikett)
function bot21(x, b, sc, fill, bub, t, light) { const w = 120 * sc, h = 380 * sc, nk = 40 * sc, y0 = b - h;
  const path = 'M' + (x - nk / 2) + ' ' + y0 + ' v' + (40 * sc) + ' C' + (x - nk / 2) + ' ' + (y0 + 90 * sc) + ' ' + (x - w / 2) + ' ' + (y0 + 110 * sc) + ' ' + (x - w / 2) + ' ' + (y0 + 160 * sc) + ' V' + (b - 10 * sc) + ' q0 ' + (10 * sc) + ' ' + (10 * sc) + ' ' + (10 * sc) + ' H' + (x + w / 2 - 10 * sc) + ' q' + (10 * sc) + ' 0 ' + (10 * sc) + ' ' + (-10 * sc) + ' V' + (y0 + 160 * sc) + ' C' + (x + w / 2) + ' ' + (y0 + 110 * sc) + ' ' + (x + nk / 2) + ' ' + (y0 + 90 * sc) + ' ' + (x + nk / 2) + ' ' + (y0 + 40 * sc) + ' v' + (-40 * sc) + ' Z';
  const cid = 'bc' + Math.round(x) + Math.round(sc * 100); let s = '<clipPath id="' + cid + '"><path d="' + path + '"/></clipPath><g clip-path="url(#' + cid + ')"><rect x="' + (x - w) + '" y="' + (b - h * fill).toFixed(1) + '" width="' + (2 * w) + '" height="' + (h * fill).toFixed(1) + '" fill="' + (light ? '#3A1C0E' : '#4A2412') + '"/>';
  if (bub > 0) for (let i = 0; i < 30; i++) { const ph = (t * (1 + bub * 2.5) + rnd(i + 3)) % 1, bx = x + (rnd(i + 40) - .5) * w * .8, by = b - h * fill * ph; s += '<circle cx="' + bx.toFixed(1) + '" cy="' + by.toFixed(1) + '" r="' + ((3 + 4 * rnd(i)) * sc).toFixed(1) + '" fill="#E8D2B8" opacity="' + (.6 * cl(bub)).toFixed(2) + '"/>'; }
  s += '<rect x="' + (x - w / 2) + '" y="' + (b - h * .55) + '" width="' + w + '" height="' + (h * .2) + '" fill="' + (light ? '#C9CED9' : '#E8354A') + '"/><path d="M' + (x - w / 2) + ' ' + (b - h * .45) + ' q' + (w / 2) + ' -30 ' + w + ' 0" stroke="#fff" stroke-width="' + (6 * sc) + '" fill="none"/>' + (light ? svgT(x, b - h * .41, 'light', 22 * sc, '#0B1020') : '') + '</g><path d="' + path + '" fill="#fff" fill-opacity=".14" stroke="#0B1020" stroke-width="' + (4 * sc).toFixed(1) + '"/><path d="M' + (x - w / 2 + 16 * sc) + ' ' + (y0 + 180 * sc) + ' V' + (b - 30 * sc) + '" stroke="#fff" stroke-width="' + (6 * sc) + '" opacity=".35" stroke-linecap="round"/>';
  return s; }
function mint21(x, y, r, rot) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (rot || 0).toFixed(0) + ')"><ellipse rx="' + r + '" ry="' + (r * .55).toFixed(1) + '" fill="#F8F6F0" stroke="#0B1020" stroke-width="4"/><ellipse cx="' + (-r * .3).toFixed(1) + '" cy="' + (-r * .15).toFixed(1) + '" rx="' + (r * .35).toFixed(1) + '" ry="' + (r * .12).toFixed(1) + '" fill="#fff"/></g>'; }
// Rolle Pfefferminz (ohne Marke)
function roll21(x, b) { return '<g transform="translate(' + x + ' ' + b + ')"><rect x="-120" y="-56" width="240" height="56" rx="26" fill="#2F6FD6" stroke="#0B1020" stroke-width="5"/><path d="M-90 -56 v56 M90 -56 v56" stroke="#F4F6FB" stroke-width="6"/><ellipse cx="120" cy="-28" rx="12" ry="28" fill="#F8F6F0" stroke="#0B1020" stroke-width="4"/></g>'; }
function foun21(x, y0, top, k, t, spread) { if (k <= .01) return ''; const sp = spread || 0; let s = '<g opacity="' + cl(k * 3).toFixed(3) + '"><path d="M' + (x - 20) + ' ' + y0 + ' C' + (x - 30) + ' ' + ((y0 + top) / 2) + ' ' + (x - 50) + ' ' + (top + 60) + ' ' + (x - 60 - 200 * sp) + ' ' + top + ' H' + (x + 60 + 200 * sp) + ' C' + (x + 50) + ' ' + (top + 60) + ' ' + (x + 30) + ' ' + ((y0 + top) / 2) + ' ' + (x + 20) + ' ' + y0 + ' Z" fill="#C8955E"/>';
  for (let i = 0; i < 14; i++) { const a = rnd(i + 9) * Math.PI * 2, d = 40 + 40 * rnd(i + 19); s += '<circle cx="' + (x + Math.cos(a + t * 3) * d * (1 + 2 * sp)).toFixed(1) + '" cy="' + (top + Math.sin(a + t * 3) * d * .5).toFixed(1) + '" r="' + (14 + 12 * rnd(i)).toFixed(1) + '" fill="#F2E2C8"/>'; }
  return s + '</g>'; }
// In der Flasche: braune Cola, Wandreflexe, Licht von oben
function inside21(t, o) { o = o || {}; let s = '<defs><linearGradient id="in21" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A4A22"/><stop offset=".45" stop-color="#5A2A12"/><stop offset="1" stop-color="#2A1206"/></linearGradient><radialGradient id="in21l" cx=".5" cy="0" r=".7"><stop offset="0" stop-color="#FFD8A0" stop-opacity=".55"/><stop offset="1" stop-color="#FFD8A0" stop-opacity="0"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#in21)"/><rect width="1080" height="1100" fill="url(#in21l)"/>';
  for (let i = 0; i < 5; i++) { const x = 300 + i * 120 + 30 * Math.sin(t * .7 + i); s += '<path d="M' + (540 + (i - 2) * 30) + ' 300 L' + x.toFixed(0) + ' 1500" stroke="#FFE3B8" stroke-width="' + (30 + 10 * (i % 3)) + '" opacity=".06"/>'; }
  s += '<path d="M0 300 Q60 1000 30 1920 H0 Z" fill="#fff" opacity=".08"/><path d="M1080 300 Q1020 1000 1050 1920 H1080 Z" fill="#fff" opacity=".08"/><rect x="0" y="1180" width="1080" height="260" fill="#E8354A" opacity=".18"/>';
  if (o.mol !== undefined) for (let i = 0; i < (o.n || 26); i++) { const bx = 80 + rnd(i + 2) * 920, by = 560 + rnd(i + 30) * 1000, dx = 18 * Math.sin(t * .8 + i), dy = 14 * Math.cos(t * .6 + i * 1.7), a = (t * 20 + i * 40) % 360; s += co221(bx + dx, by + dy, .9, a, o.mol); }
  return s; }
function co221(x, y, z, a, k) { return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + a.toFixed(0) + ') scale(' + z + ')" opacity="' + cl(k).toFixed(2) + '"><path d="M-22 0 H22" stroke="#F4F6FB" stroke-width="5"/><circle cx="-22" cy="0" r="11" fill="#FF5A5A" stroke="#0B1020" stroke-width="3"/><circle r="10" fill="#2C2C34" stroke="#0B1020" stroke-width="3"/><circle cx="22" cy="0" r="11" fill="#FF5A5A" stroke="#0B1020" stroke-width="3"/></g>'; }
function bub21(x, y, r) { return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="#F2E2C8" fill-opacity=".35" stroke="#FFF3DE" stroke-width="4"/><circle cx="' + (x - r * .35).toFixed(1) + '" cy="' + (y - r * .35).toFixed(1) + '" r="' + (r * .2).toFixed(1) + '" fill="#fff" opacity=".8"/>'; }
// Mentos-Oberflaeche unter dem Mikroskop: Kraterlandschaft, Poren als Liste fuer die Blasen
var POR21 = [[160, 1600], [470, 1640], [600, 1540], [760, 1610], [900, 1530], [260, 1720], [680, 1730], [950, 1700], [420, 1800], [820, 1830], [130, 1830], [540, 1880]];
function surf21(t) { let s = inside21(t) + '<path d="M0 1460 Q270 1420 540 1450 T1080 1440 V1920 H0 Z" fill="#F4F1E8" stroke="#0B1020" stroke-width="6"/>';
  for (let i = 0; i < 40; i++) s += '<circle cx="' + (rnd(i + 70) * 1080).toFixed(0) + '" cy="' + (1480 + rnd(i + 90) * 420).toFixed(0) + '" r="' + (3 + 5 * rnd(i)).toFixed(0) + '" fill="#D8D2C2"/>';
  POR21.concat([[330, 1545]]).forEach((p, i) => { const r = 34 + 18 * rnd(i + 4); s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + (r * 1.4).toFixed(0) + '" ry="' + (r * .6).toFixed(0) + '" fill="#C9C2B0" stroke="#0B1020" stroke-width="4"/><ellipse cx="' + p[0] + '" cy="' + (p[1] + r * .12).toFixed(0) + '" rx="' + (r * 1.05).toFixed(0) + '" ry="' + (r * .38).toFixed(0) + '" fill="#8F8672"/>'; });
  return s; }
// pH-Messgeraet mit Kabel zu Schalti
function ph21(k, lab, flash) { if (k <= .01) return ''; return '<g opacity="' + cl(k).toFixed(3) + '"><path d="M400 1400 Q520 1300 640 1060" stroke="#0B1020" stroke-width="10" fill="none"/><rect x="560" y="780" width="340" height="280" rx="34" fill="#FFD23F" stroke="#0B1020" stroke-width="7"/><rect x="590" y="810" width="280" height="160" rx="16" fill="#C8F0D0" stroke="#0B1020" stroke-width="5"/>' + svgT(730, 860, 'pH', 36, '#2C3350') + svgT(730, 945, '3,0', 80, '#0B1020') + svgT(730, 1025, lab, 34, '#0B1020') + (flash ? '<rect x="590" y="810" width="280" height="160" rx="16" fill="#fff" opacity="' + flash.toFixed(2) + '"/>' : '') + '</g>'; }

// ---------- Einstieg (Kueche) ----------
function hk21(ev) { const f = ev.fontaene; if (f === undefined) return { k: 0, top: NY21, spread: 0, hit: 0 }; const k = cl(f / .3), up = ease(cl(f / .6)), hit = cl((f - .6) / .5), dn = ev.kleb === undefined ? 0 : ease(cl(ev.kleb / .6));
  return { k: k * (1 - dn), top: lerp(NY21, 830, up), spread: hit * (1 - dn), hit }; }
WORLD.c21hook = function (sc, ev, t, lt) { const H = hk21(ev), d = ev.drop, f = ev.fontaene, kl = ev.kleb;
  const puddle = f === undefined ? 0 : cl((f - .8) / 1.2);
  let s = kitchen21(t, { splat: kl !== undefined ? 1 : H.hit, puddle: puddle, px: 420 }) + roll21(330, GY21);
  const fizz = d === undefined ? .1 : (f === undefined ? .3 + .7 * cl(d / 3) : 1);
  s += foun21(BX21, NY21, H.top, H.k, t, H.spread) + bot21(BX21, GY21, BS21, f === undefined ? .9 : .9 - .55 * cl(f / 1.2), fizz, t);
  if (d !== undefined && f === undefined) { const q = cl((d - .3) / .8); if (q < 1) s += mint21(lerp(300, BX21, q), lerp(1380, NY21 - 20, q) - 260 * Math.sin(Math.PI * q), 22, 400 * q); else { const sk = cl((d - 1.1) / 1); s += mint21(BX21, lerp(NY21 + 40, GY21 - 30, sk * sk), 22, 30); } }
  if (H.hit > 0 && kl === undefined) for (let i = 0; i < 16; i++) { const ph = (t * 1.6 + rnd(i + 7)) % 1, x = 160 + rnd(i + 3) * 760; s += '<ellipse cx="' + x.toFixed(0) + '" cy="' + (840 + 700 * ph).toFixed(0) + '" rx="8" ry="16" fill="#4A2412" opacity="' + (.85 * H.hit).toFixed(2) + '"/>'; }
  if (kl !== undefined) { const st = Math.abs(Math.sin(t * 3)); s += '<path d="M226 1548 q8 ' + (-40 * st).toFixed(0) + ' 0 ' + (-70 * st).toFixed(0) + '" stroke="#4A2412" stroke-width="7" fill="none"/><path d="M262 1548 q-6 ' + (-36 * st).toFixed(0) + ' 2 ' + (-64 * st).toFixed(0) + '" stroke="#4A2412" stroke-width="5" fill="none"/>'; }
  return W(s + shade3()); };
WMASC.c21hook = (ev, t, lt, sc) => { const d = ev.drop, f = ev.fontaene, kl = ev.kleb;
  if (kl !== undefined) { const st = Math.abs(Math.sin(t * 3)); return stay3([240, 1537 - 24 * st], 1, { r: -6 + 8 * st, mood: 'cool' }); }
  if (f !== undefined) { const hit = cl((f - .6) / .5); return stay3([240 + 4 * Math.sin(t * 30) * hit, 1537], 1, { r: -12, mood: 'shock' }); }
  if (d !== undefined) return stay3([lerp(220, 280, cl(d / .4)), 1537 - (d > .2 && d < .5 ? 30 : 0)], 1, { r: d < .6 ? 18 : 4 });
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 3) }); };

// ---------- Teil 1: in der Flasche ----------
WORLD.c21gas = function (sc, ev, t, lt) { const st = ev.start, ph = ev.ph, fr = ev.frei;
  let IN = inside21(t, { mol: 1, n: 26 });
  if (st !== undefined && ph === undefined) { const g = cl((st - .3) / 1), fall = cl((st - 1.6) / .8); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + t, r = lerp(160, 40, g) + 220 * fall; IN += co221(480 + r * Math.cos(a), 1180 + r * Math.sin(a) * .7, 1.1, a * 50, 1); }
    if (fall > 0) IN += chip3(700, 900, 'kein Startpunkt', 38, '#FF5A7A', '#fff', fall); }
  if (ph !== undefined) { const k = cl(ph / .4) * (fr === undefined ? 1 : 1 - cl(fr / .3)), lab = ph < 1.6 ? 'vorher' : 'nachher', fl = ph > 1.4 && ph < 1.8 ? 1 - Math.abs(ph - 1.6) / .2 : 0; IN += ph21(k, lab, fl);
    if (ph > 1.9 && fr === undefined) IN += okx1(900, 760, 40, true, (ph - 1.9) / .3); }
  if (fr !== undefined) { const g = ease(cl((fr - .3) / 1.2)); IN += bub21(470, lerp(1300, 760, g), 26 + 40 * g); IN += chip3(720, 1000, 'kein neuer Stoff', 40, '#3DFF7A', '#0B1020', cl((fr - .2) / .3)); }
  const s = wipe3(kitchen21(t, { splat: 1, puddle: .7, px: 420 }) + bot21(BX21, GY21, BS21, .35, .05, t), IN, lt, .6, AC21);
  return W(s + shade3(), slot(ev, [['gas', 'Das Gas ist schon in der Cola'], ['start', 'Jede Blase braucht einen Startpunkt'], ['ph', 'Vorher und nachher gleich sauer', 'hot'], ['frei', 'Keine Reaktion: Gas wird nur frei']])); };
WMASC.c21gas = (ev, t, lt) => { const st = ev.start, fr = ev.frei, ph = ev.ph, bob = 18 * Math.sin(t * 1.6);
  if (st !== undefined && ph === undefined) return stay3([380, 1530 + bob * .3], 1, { r: 10 * Math.sin(t * 6), mood: st > 1.6 ? 'shock' : 'happy' });
  if (fr !== undefined) return stay3([360, 1530 + bob * .3], 1, { r: -8, mood: 'happy' });
  return stay3([300, 1530 + bob * .3], 1, { r: 6 * Math.sin(t * 1.3) }); };

// ---------- Teil 2: auf der Mentos ----------
WORLD.c21poren = function (sc, ev, t, lt) { const po = ev.poren, bl = ev.blase, ho = ev.hoch, gl = ev.glas;
  let S = surf21(t);
  if (bl !== undefined) POR21.forEach((p, i) => { const k = cl((bl - .2 - i * .06) / .6); if (k <= 0) return; const up = ho === undefined ? 0 : ((t * .9 + rnd(i)) % 1), r = 14 + 30 * k; S += bub21(p[0], p[1] - r - 900 * up, r); if (ho !== undefined) S += bub21(p[0] + 10, p[1] - 30 - 900 * ((t * .9 + rnd(i) + .5) % 1), 18); });
  if (po !== undefined && bl === undefined) S += chip3(700, 1000, 'Poren', 44, '#FFE14D', '#0B1020', cl((po - .4) / .3));
  if (bl !== undefined) { const k = cl((bl - .6) / 1), lift = ho === undefined ? 0 : ease(cl(ho / .5)); S += bub21(330, 1537 + 40 - 40 * k - 430 * lift, 20 + 50 * k); }
  let s = S;
  if (gl !== undefined) { let K = kitchen21(t, { splat: 1, puddle: .7, px: 300 }); const x0 = 560, x1 = 880;
    K += '<path d="M' + x0 + ' 1000 L' + (x0 + 30) + ' 1548 H' + (x1 - 30) + ' L' + x1 + ' 1000 Z" fill="#B9E3FF" fill-opacity=".3" stroke="#0B1020" stroke-width="7"/><path d="M' + (x0 + 8) + ' 1100 L' + (x0 + 30) + ' 1540 H' + (x1 - 30) + ' L' + (x1 - 8) + ' 1100 Z" fill="#4A2412" opacity=".9"/><path d="M690 1530 l40 -14" stroke="#F4F6FB" stroke-width="5"/>';
    for (let i = 0; i < 12; i++) { const ph = (t * 1.2 + i / 12) % 1; K += bub21(708 + 4 * Math.sin(t * 6 + i), 1515 - 410 * ph, 6 + 4 * ph); }
    K += chip3(720, 900, 'Kratzer = Startpunkt', 38, '#FFE14D', '#0B1020', cl((gl - .6) / .3)); s = wipe3(S, K, gl, .5, AC21); }
  return W(s + shade3(), slot(ev, [['poren', 'Mentos: voller winziger Poren'], ['blase', 'An jeder Pore startet eine Blase', 'hot'], ['hoch', 'Unzählige Blasen drücken nach oben'], ['glas', 'Im Glas: Blasen an Kratzern']])); };
WMASC.c21poren = (ev, t, lt) => { const po = ev.poren, bl = ev.blase, ho = ev.hoch, gl = ev.glas;
  if (gl !== undefined && gl > .4) return stay3([420, 1537], 1, { r: 10, mood: 'happy' });
  if (ho !== undefined) { const lift = ease(cl(ho / .5)); return stay3([330, 1537 - 430 * lift + 10 * Math.sin(t * 4) * lift], 1, { r: 8 * Math.sin(t * 3), mood: 'shock' }); }
  if (bl !== undefined) { const k = cl((bl - .6) / 1); return stay3([330, 1537 - 10 * k], 1, { r: 6, mood: k > .3 ? 'shock' : 'happy' }); }
  if (po !== undefined) { const q = cl(po / 1.6), trip = po > 1.6 && po < 2.4 ? 1 : 0; return stay3([lerp(180, 330, q), 1537 + (trip ? 20 : 0) - 10 * Math.abs(Math.sin(t * 10)) * (q < 1 ? 1 : 0)], 1, { r: trip ? 30 : 6, walk: q < 1 ? 1 : 0, mood: trip ? 'shock' : 'happy' }); }
  return stay3([180, 1537], 1, { r: 2 }); };

// ---------- Teil 3: mit der Mentos nach unten ----------
WORLD.c21sink = function (sc, ev, t, lt) { const sk = ev.sink, ue = ev.ueberall, kr = ev.krumel, li = ev.light;
  let IN = inside21(t); const fall = sk === undefined ? 0 : ease(cl(sk / 1.8)), my = lerp(820, 1560, ue !== undefined ? 1 : fall);
  if (kr === undefined) { IN += mint21(560, my, 120, 8 * Math.sin(t * 4)); if (sk !== undefined && fall < 1 && ue === undefined) for (let i = 0; i < 5; i++) IN += '<path d="M' + (470 + i * 45) + ' ' + (my - 90) + ' v-' + (90 + 20 * (i % 3)) + '" stroke="#FFE3B8" stroke-width="6" stroke-linecap="round" opacity=".5"/>';
    const trail = ue !== undefined ? 1 : fall; for (let i = 0; i < 40; i++) { const y0 = lerp(820, my, rnd(i + 3) * trail), ph = (t * 1.1 + rnd(i + 50)) % 1, y = y0 - (y0 - 500) * ph * (ue !== undefined ? 1 : .3); IN += bub21(460 + rnd(i + 9) * 200 + (ue !== undefined ? (rnd(i + 20) - .5) * 700 : 0), y, 6 + 10 * rnd(i)); } }
  else { for (let i = 0; i < 9; i++) { const x = 360 + i * 50 + 20 * Math.sin(t + i), y = 700 + 60 * rnd(i + 3) + 20 * Math.sin(t * .8 + i) + 40 * cl(kr / 3); IN += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' l14 -10 l12 12 l-6 14 l-16 -2 Z" fill="#F8F6F0" stroke="#0B1020" stroke-width="3"/>'; if (i % 3 === 0) IN += bub21(x + 6, y - 20 - 60 * ((t + i * .3) % 1), 7); }
    IN += chip3(700, 1000, 'sinkt kaum', 40, '#2C3350', '#F4F6FB', cl((kr - .5) / .3)); }
  let s = IN;
  if (li !== undefined) { const K = kitchen21(t, { splat: 1, puddle: .7, px: 300 }) + bot21(560, GY21, 1.35, .9, .2, t) + bot21(860, GY21, 1.35, .9, .2 + .8 * cl((li - 1) / .5), t, 1) + chip3(860, 820, 'Süßstoff hilft', 36, '#FFE14D', '#0B1020', cl((li - 1.2) / .3)); s = wipe3(IN, K, li, .5, AC21); }
  return W(s + shade3(), slot(ev, [['sink', 'Mentos sinken schnell nach unten'], ['ueberall', 'Blasen in der ganzen Flasche', 'hot'], ['krumel', 'Zerkleinert: kleine Fontäne'], ['light', 'Light-Cola: Süßstoff hilft mit']])); };
WMASC.c21sink = (ev, t, lt) => { const sk = ev.sink, ue = ev.ueberall, kr = ev.krumel, li = ev.light;
  if (li !== undefined && li > .4) return stay3([260, 1537], 1, { r: 8, mood: 'happy' });
  if (kr !== undefined) return stay3([330, 1100 + 20 * Math.sin(t * 1.6)], 1, { r: 10 * Math.sin(t * 2), mood: 'happy' });
  if (sk !== undefined || ue !== undefined) { const fall = ue !== undefined ? 1 : ease(cl(sk / 1.8)), my = lerp(820, 1560, fall); return stay3([560, my - 50], 1, { r: 6 * Math.sin(t * 8), mood: fall < 1 ? 'shock' : 'happy' }); }
  return stay3([560, 770], 1, { r: 0 }); };

// ---------- Schluss: Kueche ----------
WORLD.c21outro = function (sc, ev, t) { return W(kitchen21(t, { splat: 1, puddle: .7, px: 520 }) + roll21(330, GY21) + bot21(BX21, GY21, BS21, .35, .05, t) + shade3()); };
WMASC.c21outro = () => BIG3();

['c21hook', 'c21gas', 'c21poren', 'c21sink', 'c21outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC21); });
