// C020H3 "Warum hilft Wasser kaum gegen scharfes Essen?" (Chemie, Hook-Pilot v3, 20.11.2026).
// Benedikt 20.11.2026 zu v2: Anfang zu lahm, zu wenig passiert, zu viele Texte, immer nur die Lupe.
// v3: grosse Chili als Hauptfigur in einer Nachtkueche mit Lampenlicht. Jeder Teil anders:
// Einstieg Biss + Flammen + Wasserschwall, der abperlt. Teil 1 Kamerafahrt in die Zunge (Sensor als Schloss, Capsaicin als Schluessel), Nervensignal zum Gehirn mit Alarmlicht, Tee als Vergleich.
// Teil 2 Stroemungs-Simulation (Wasser laeuft ueber Oeltropfen), Eiswuerfel. Teil 3 Milchstrahl, Kasein-Kugeln fangen Capsaicin, Wettrennen zweier Brenn-Anzeigen, Oel mit Wuerg-Reaktion.
var AC3c = '#FF6BD6', ST3c = '#0B1020', GY3c = 1545, FX3c = 200, CH3c = [610, 880];

// ---------- Hintergrund: Nachtkueche ----------
function kit3c(t, o) { o = o || {}; let s = '<defs><linearGradient id="k3w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140A26"/><stop offset=".6" stop-color="#2A1438"/><stop offset="1" stop-color="#1A0E24"/></linearGradient><radialGradient id="k3l" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#FFC27A" stop-opacity=".55"/><stop offset="1" stop-color="#FFC27A" stop-opacity="0"/></radialGradient><linearGradient id="k3c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A3A2E"/><stop offset="1" stop-color="#2A1A16"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#k3w)"/>';
  // Fliesen im Halbdunkel
  for (let r = 0; r < 9; r++) for (let c = 0; c < 10; c++) { const x = c * 112 - (r % 2) * 56, y = 560 + r * 70; s += '<rect x="' + x + '" y="' + y + '" width="106" height="64" rx="6" fill="#3A1F4A" opacity="' + (.35 + .25 * rnd(r * 10 + c)).toFixed(2) + '"/>'; }
  // Fenster mit Stadtlichtern rechts
  s += '<rect x="760" y="560" width="300" height="300" rx="10" fill="#0A0C26" stroke="#1A0E24" stroke-width="12"/>'; for (let i = 0; i < 14; i++) s += '<circle cx="' + (780 + rnd(i + 4) * 260).toFixed(0) + '" cy="' + (700 + rnd(i + 9) * 140).toFixed(0) + '" r="' + (4 + rnd(i) * 10).toFixed(0) + '" fill="' + ['#FFB86A', '#FF6BD6', '#5CB8FF'][i % 3] + '" opacity="' + (.35 + .3 * Math.sin(t + i)).toFixed(2) + '"/>';
  s += '<path d="M910 560 V860 M760 710 H1060" stroke="#1A0E24" stroke-width="10"/>';
  // Haengelampe mit Lichtkegel
  s += '<path d="M500 300 L140 1260 H940 L580 300 Z" fill="url(#k3l)" opacity="' + (.6 + .05 * Math.sin(t * 3)).toFixed(2) + '"/>';
  // Staub im Licht
  for (let i = 0; i < 26; i++) { const x = 300 + rnd(i + 50) * 480 + 20 * Math.sin(t * .4 + i), y = 560 + ((t * (8 + rnd(i) * 10) + rnd(i + 80) * 700) % 700); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (1.5 + rnd(i + 3) * 2.5).toFixed(1) + '" fill="#FFE2B0" opacity=".45"/>'; }
  // Arbeitsplatte
  s += '<rect x="0" y="1180" width="1080" height="40" fill="#7A5240" stroke="' + ST3c + '" stroke-width="5"/><rect x="0" y="1220" width="1080" height="700" fill="url(#k3c)"/><ellipse cx="540" cy="1196" rx="360" ry="14" fill="#FFE2B0" opacity=".18"/>';
  for (let i = 0; i < 5; i++) s += '<rect x="' + (i * 230 + 20) + '" y="1260" width="200" height="300" rx="10" fill="#3A2420" stroke="#1E120E" stroke-width="5"/><rect x="' + (i * 230 + 100) + '" y="1290" width="40" height="8" rx="4" fill="#9A7A60"/>';
  return s; }
// ---------- Chili (gross, glaenzend). bite: Biss 0..1 ----------
function chili3c(x, y, s, t, o) { o = o || {}; const r = (o.rot || 0) + 3 * Math.sin(t * 1.3); let g = '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + r.toFixed(1) + ') scale(' + s.toFixed(3) + ')"><defs><linearGradient id="c3r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF5A4A"/><stop offset=".55" stop-color="#D8231E"/><stop offset="1" stop-color="#7A0E10"/></linearGradient><clipPath id="c3b"><path d="M-300 -200 H' + (o.bite ? (230 - 70 * cl(o.bite)).toFixed(0) : 400) + ' Q' + (o.bite ? (200 - 70 * cl(o.bite)).toFixed(0) : 400) + ' -20 ' + (o.bite ? (240 - 70 * cl(o.bite)).toFixed(0) : 400) + ' 40 Q' + (o.bite ? (190 - 70 * cl(o.bite)).toFixed(0) : 400) + ' 90 ' + (o.bite ? (230 - 70 * cl(o.bite)).toFixed(0) : 400) + ' 200 H-300 Z"/></clipPath></defs>';
  g += '<ellipse cx="10" cy="120" rx="250" ry="24" fill="#000" opacity=".35"/>';
  g += '<g clip-path="url(#c3b)"><path d="M-240 -10 Q-250 -70 -190 -80 Q-40 -96 120 -40 Q250 10 330 120 Q240 70 120 60 Q-40 50 -190 60 Q-250 50 -240 -10 Z" fill="url(#c3r)" stroke="' + ST3c + '" stroke-width="8"/>';
  g += '<path d="M-180 -56 Q-40 -72 110 -24" stroke="#FFB0A0" stroke-width="12" fill="none" stroke-linecap="round" opacity=".7"/><path d="M-150 -40 Q-90 -48 -40 -44" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>';
  if (o.bite) g += '<path d="M' + (230 - 70 * cl(o.bite)) + ' -60 Q' + (200 - 70 * cl(o.bite)) + ' -20 ' + (240 - 70 * cl(o.bite)) + ' 40 Q' + (190 - 70 * cl(o.bite)) + ' 90 ' + (230 - 70 * cl(o.bite)) + ' 140" stroke="#FFF2C8" stroke-width="16" fill="none"/>';
  g += '</g><path d="M-240 -12 Q-290 -40 -280 -100 Q-276 -130 -250 -140" stroke="#3B9B3B" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M-270 -40 Q-230 -70 -200 -54 Q-220 -20 -256 -20 Z" fill="#3B9B3B" stroke="' + ST3c + '" stroke-width="6"/>';
  return g + '</g>'; }
// Flammen-Teilchen ueber einem Punkt
function fire3c(x, y, t, k, w) { if (k <= 0) return ''; w = w || 200; let s = '<g opacity="' + cl(k * 2).toFixed(2) + '">';
  const tongue = (dx, h, ww, col, ph) => { const f = Math.sin(t * 11 + ph) * .12 + Math.sin(t * 7.3 + ph * 2) * .08, hh = h * k * (1 + f), sx = 18 * Math.sin(t * 6 + ph); return '<path d="M' + (x + dx - ww) + ' ' + y + ' Q' + (x + dx - ww * 1.1) + ' ' + (y - hh * .45).toFixed(0) + ' ' + (x + dx + sx).toFixed(0) + ' ' + (y - hh).toFixed(0) + ' Q' + (x + dx + ww * 1.1) + ' ' + (y - hh * .45).toFixed(0) + ' ' + (x + dx + ww) + ' ' + y + ' Z" fill="' + col + '"/>'; };
  const n = 5; for (let i = 0; i < n; i++) { const dx = (i / (n - 1) - .5) * w * .8, h = (180 + 70 * Math.sin(i * 2.1)) * (1 - Math.abs(dx) / w); s += tongue(dx, h * 1.15, w * .16, '#E8282B', i) ; }
  for (let i = 0; i < n; i++) { const dx = (i / (n - 1) - .5) * w * .6, h = (130 + 50 * Math.sin(i * 1.7)) * (1 - Math.abs(dx) / w); s += tongue(dx, h, w * .12, '#FF9A1E', i + 3); }
  for (let i = 0; i < 3; i++) { const dx = (i - 1) * w * .18; s += tongue(dx, 80 + 20 * Math.sin(i), w * .08, '#FFF2A0', i + 6); }
  for (let i = 0; i < 8; i++) { const c = (t * 1.3 + rnd(i + 7)) % 1; s += '<circle cx="' + (x + (rnd(i + 3) - .5) * w + 20 * Math.sin(t * 5 + i)).toFixed(0) + '" cy="' + (y - 120 * k - c * 200 * k).toFixed(0) + '" r="' + (5 * (1 - c)).toFixed(1) + '" fill="#FFE14D" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  return s + '</g>'; }
// Wassertropfen-Schwall, perlt ab
function splash3c(x, y, t, k) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 18; i++) { const a = -Math.PI * (.15 + .7 * rnd(i + 2)), sp = 300 + 300 * rnd(i + 9), c = cl(k), px = x + Math.cos(a) * sp * c, py = y + Math.sin(a) * sp * c + 700 * c * c; s += '<ellipse cx="' + px.toFixed(0) + '" cy="' + py.toFixed(0) + '" rx="' + (10 + 6 * rnd(i)).toFixed(0) + '" ry="' + (14 + 8 * rnd(i)).toFixed(0) + '" fill="#9FD6FF" stroke="#E8F7FF" stroke-width="3" opacity="' + (1 - c * .6).toFixed(2) + '"/>'; } return s; }
// Glas Wasser, das kippt und giesst
function glass3c(x, y, ang, lvl, s) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + ang.toFixed(1) + ') scale(' + (s || 1) + ')"><path d="M-60 -170 L-50 0 H50 L60 -170 Z" fill="#CFE9FF" opacity=".25" stroke="#F4F6FB" stroke-width="7"/><path d="M' + (-50 - 10 * lvl) + ' ' + (-170 * lvl + 6) + ' L-48 -4 H48 L' + (50 + 10 * lvl) + ' ' + (-170 * lvl + 6) + ' Z" fill="#5CB8FF" opacity=".6"/><path d="M-42 -150 L-36 -20" stroke="#fff" stroke-width="7" opacity=".5" stroke-linecap="round"/></g>'; }
// Thermometer mit Zahl
function thermo3c(x, y, k, val, hot) { if (k <= 0) return ''; const z = back(cl(k)); return '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(2) + ')"><rect x="-24" y="-200" width="48" height="230" rx="24" fill="#F4F6FB" stroke="' + ST3c + '" stroke-width="6"/><rect x="-12" y="' + (-60 - 100 * hot).toFixed(0) + '" width="24" height="' + (90 + 100 * hot).toFixed(0) + '" rx="12" fill="' + lc('#3BD16F', '#E8282B', hot) + '"/><circle cy="50" r="40" fill="' + lc('#3BD16F', '#E8282B', hot) + '" stroke="' + ST3c + '" stroke-width="6"/>' + '<rect x="-80" y="100" width="160" height="56" rx="16" fill="#1A0E24" stroke="#F4F6FB" stroke-width="3"/>' + svgT(0, 140, val, 36, '#fff') + '</g>'; }
// Silhouetten der Getraenke (offene Frage)
function trio3c(k, t, reveal) { if (k <= 0) return ''; let s = ''; const X = [290, 545, 800]; for (let i = 0; i < 3; i++) { const z = back(cl((k - i * .15) / .4)); if (z <= 0) continue; const glow = i === 1 ? .5 + .5 * Math.sin(t * 5) : 0;
    s += '<g transform="translate(' + X[i] + ' 1080) scale(' + (1.3 * z).toFixed(2) + ')">' + (glow ? '<circle cy="-110" r="120" fill="#FFE14D" opacity="' + (.18 * glow).toFixed(2) + '"/>' : '');
    if (i === 0) s += '<path d="M-55 -230 L-45 0 H45 L55 -230 Z" fill="#CFE9FF" opacity=".35" stroke="#F4F6FB" stroke-width="6"/><path d="M-52 -150 L-45 0 H45 L52 -150 Z" fill="#5CB8FF" opacity=".7"/>';
    if (i === 1) s += carton3c(0, 0, 0, 1, 'MILCH');
    if (i === 2) s += '<path d="M-40 0 V-140 Q-40 -170 -16 -180 V-240 H16 V-180 Q40 -170 40 -140 V0 Z" fill="#E8B830" stroke="' + ST3c + '" stroke-width="6"/><rect x="-20" y="-262" width="40" height="24" rx="5" fill="#3B9B3B" stroke="' + ST3c + '" stroke-width="4"/>';
    s += '<g transform="translate(0 -300)"><circle r="34" fill="#F4F6FB" stroke="' + ST3c + '" stroke-width="5"/>' + svgT(0, 14, '?', 44, ST3c) + '</g></g>'; } return s; }

// ---------- Einstieg ----------
WORLD.c3hook = function (sc, ev, t, lt) { const br = ev.brenn, wa = ev.wasser, lo = ev.loop;
  const drop = ease(cl(lt / .14)), bite = cl((lt - .1) / .12), sh = lt < .5 ? 16 * Math.sin(lt * 90) * (1 - lt / .5) : 0;
  const fk = cl((lt - .08) / .2) * (wa === undefined ? 1 : 1 - .25 * cl((wa - .8) / .5)) * (lo === undefined ? 1 : 1 - cl(lo / .5));
  const zz = 1.04 - .04 * ease(cl((lt - 1.2) / 1.5));
  let s = '<g transform="translate(' + sh.toFixed(1) + ' 0) translate(540 900) scale(' + zz.toFixed(3) + ') translate(-540 -900)">' + kit3c(t);
  const cy = lerp(780, CH3c[1], drop) + (lo === undefined ? 0 : 0);
  s += fire3c(CH3c[0] + 150, cy + 10, t, fk, 260);
  if (lo === undefined || lo < .6) s += '<g opacity="' + (lo === undefined ? 1 : 1 - cl(lo / .6)).toFixed(2) + '">' + chili3c(CH3c[0] - 20, cy, 1.02, t, { bite: bite, rot: -8 }) + '</g>';
  if (lt > .1 && lt < .8) for (let i = 0; i < 8; i++) { const c = cl((lt - .1) / .6), a = -1.2 + i * .3; s += '<circle cx="' + (CH3c[0] + 190 + Math.cos(a) * 260 * c).toFixed(0) + '" cy="' + (cy + Math.sin(a) * 140 * c + 300 * c * c).toFixed(0) + '" r="' + (10 - 4 * c).toFixed(1) + '" fill="#D8231E" stroke="' + ST3c + '" stroke-width="3"/>'; }
  if (br !== undefined && wa === undefined) s += thermo3c(260, 900, cl((br - 1.4) / .4), '37 °C', 0);
  if (wa !== undefined && lo === undefined) { const tilt = cl(wa / .5), pour = cl((wa - .5) / 1.2); s += glass3c(880, 760 + 0 * tilt, -70 * ease(tilt), 1 - .8 * pour, 1); if (pour > 0 && pour < 1) s += '<path d="M800 740 Q760 800 ' + (CH3c[0] + 170) + ' ' + (cy - 30) + '" stroke="#9FD6FF" stroke-width="' + (26 * (1 - pour * .5)).toFixed(0) + '" fill="none" stroke-linecap="round" opacity=".85"/>'; s += splash3c(CH3c[0] + 170, cy - 30, t, cl((wa - .7) / 1.3)); }
  s += '</g>';
  if (lo !== undefined) s += trio3c(cl((lo - .2) / .8), t);
  return W(s + shade3()); };
WMASC.c3hook = (ev, t, lt) => { const br = ev.brenn, wa = ev.wasser; const k = Math.sin(Math.PI * cl((lt - .3) / .9)); if (wa !== undefined) return stay3([FX3c, GY3c], 1, { r: 3, mood: 'cool' }); return stay3([FX3c, GY3c - 30 * k], 1, { r: -10 * k, mood: k > .1 ? 'shock' : 'happy' }); };

// ---------- Teil 1: in die Zunge ----------
// Zungen-Landschaft (Makro): rosa Huegel mit Papillen, Membran mit Sensoren
function tongue3c(t, o) { o = o || {}; let s = '<defs><linearGradient id="t3g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A0E2A"/><stop offset="1" stop-color="#120618"/></linearGradient><linearGradient id="t3p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF9AB8"/><stop offset="1" stop-color="#C84A78"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#t3g)"/>';
  // Papillen im Hintergrund
  for (let i = 0; i < 16; i++) { const x = rnd(i + 3) * 1100 - 10, y = 640 + rnd(i + 7) * 200, r = 40 + rnd(i) * 50; s += '<ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + r.toFixed(0) + '" ry="' + (r * 1.3).toFixed(0) + '" fill="#8A2A58" opacity=".5"/>'; }
  // Zellmembran (Doppelschicht) als Welle
  const Y = 1010; let top = 'M-20 ' + Y, bot = ''; for (let x = -20; x <= 1100; x += 40) { const yy = Y + 14 * Math.sin(x * .012 + t * 1.2); top += ' L' + x + ' ' + yy.toFixed(1); }
  s += '<path d="' + top + ' L1100 1300 L-20 1300 Z" fill="url(#t3p)" stroke="#FFD0E0" stroke-width="5"/>';
  for (let x = 0; x <= 1080; x += 28) { const yy = Y + 14 * Math.sin(x * .012 + t * 1.2); s += '<circle cx="' + x + '" cy="' + (yy + 6).toFixed(1) + '" r="8" fill="#FFD0E0"/><path d="M' + x + ' ' + (yy + 14).toFixed(1) + ' v26" stroke="#E87AA0" stroke-width="4"/>'; }
  return s; }
// Sensor (Kanal) in der Membran. on: Capsaicin sitzt drin, Kanal leuchtet
function sensor3c(x, t, on, heat) { const Y = 1010 + 14 * Math.sin(x * .012 + t * 1.2), g = Math.max(on, heat || 0); let s = '<g transform="translate(' + x + ' ' + Y.toFixed(1) + ') scale(1.45)">';
  if (g > 0) s += '<circle r="' + (110 + 20 * Math.sin(t * 8)).toFixed(0) + '" fill="#FF8A1E" opacity="' + (.25 * g).toFixed(2) + '"/>';
  s += '<path d="M-70 -50 Q-80 40 -50 90 H-14 V-30 Z M70 -50 Q80 40 50 90 H14 V-30 Z" fill="' + lc('#7A4AB8', '#FF8A1E', g) + '" stroke="' + ST3c + '" stroke-width="6"/><path d="M-30 -56 Q0 -30 30 -56" stroke="' + ST3c + '" stroke-width="6" fill="' + lc('#5A3A8A', '#FFB86A', g) + '"/>';
  if (g > .5) for (let i = 0; i < 4; i++) { const c = (t * 2 + i / 4) % 1; s += '<circle cx="' + (6 * Math.sin(i * 2)).toFixed(0) + '" cy="' + (-30 + 150 * c).toFixed(0) + '" r="8" fill="#FFE14D" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  return s + '</g>'; }
// Capsaicin-Molekuel (stilisiert, Kugeln). Gestalt bewusst schematisch
function caps3c(x, y, z, t, i) { const w = 6 * Math.sin(t * 3 + (i || 0)); return '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + w.toFixed(1) + ') scale(' + z.toFixed(2) + ')"><path d="M-46 0 L-16 -14 L16 0 L46 -14" stroke="#FFD0A0" stroke-width="8"/><circle cx="-46" r="20" fill="#FF7A1E" stroke="' + ST3c + '" stroke-width="5"/><circle cx="-16" cy="-14" r="16" fill="#FFB84D" stroke="' + ST3c + '" stroke-width="5"/><circle cx="16" r="16" fill="#FFB84D" stroke="' + ST3c + '" stroke-width="5"/><circle cx="46" cy="-14" r="14" fill="#E8282B" stroke="' + ST3c + '" stroke-width="5"/></g>'; }
// Nervenbahn zum Gehirn
function brain3c(x, y, k, t, alarm) { if (k <= 0) return ''; const z = back(cl(k)); let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(2) + ')">';
  if (alarm > 0) { const a = t * 6; s += '<path d="M0 0 L' + (240 * Math.cos(a)).toFixed(0) + ' ' + (240 * Math.sin(a)).toFixed(0) + ' L' + (240 * Math.cos(a + .5)).toFixed(0) + ' ' + (240 * Math.sin(a + .5)).toFixed(0) + ' Z" fill="#FF3B30" opacity="' + (.22 * alarm).toFixed(2) + '"/><path d="M0 0 L' + (240 * Math.cos(a + 3.14)).toFixed(0) + ' ' + (240 * Math.sin(a + 3.14)).toFixed(0) + ' L' + (240 * Math.cos(a + 3.64)).toFixed(0) + ' ' + (240 * Math.sin(a + 3.64)).toFixed(0) + ' Z" fill="#FF3B30" opacity="' + (.22 * alarm).toFixed(2) + '"/>'; }
  s += '<path d="M-130 20 Q-150 -70 -70 -96 Q0 -130 70 -100 Q150 -80 140 10 Q150 80 70 96 Q0 120 -70 96 Q-150 80 -130 20 Z" fill="' + lc('#FFB0C8', '#FF6A5A', alarm || 0) + '" stroke="' + ST3c + '" stroke-width="7"/><path d="M0 -110 Q-14 0 0 100 M-90 -40 Q-50 -20 -80 30 M80 -50 Q40 -10 90 40 M-40 60 Q-10 40 -30 0 M40 70 Q20 40 50 10" stroke="#B85A7A" stroke-width="6" fill="none" stroke-linecap="round"/>';
  return s + '</g>'; }
function nerve3c(a, b, t, k) { if (k <= 0) return ''; const mx = (a[0] + b[0]) / 2 + 120, my = (a[1] + b[1]) / 2; let s = '<path d="M' + a[0] + ' ' + a[1] + ' Q' + mx + ' ' + my + ' ' + b[0] + ' ' + b[1] + '" stroke="#FFD0E0" stroke-width="14" fill="none" opacity=".35"/><path d="M' + a[0] + ' ' + a[1] + ' Q' + mx + ' ' + my + ' ' + b[0] + ' ' + b[1] + '" stroke="#FFE14D" stroke-width="5" fill="none" stroke-dasharray="' + (900 * cl(k)).toFixed(0) + ' 2000"/>';
  for (let i = 0; i < 3; i++) { const c = (t * 1.1 + i / 3) % 1; if (c > cl(k)) continue; const u = 1 - c, px = u * u * a[0] + 2 * u * c * mx + c * c * b[0], py = u * u * a[1] + 2 * u * c * my + c * c * b[1]; s += '<circle cx="' + px.toFixed(0) + '" cy="' + py.toFixed(0) + '" r="14" fill="#FFE14D"/><circle cx="' + px.toFixed(0) + '" cy="' + py.toFixed(0) + '" r="28" fill="#FFE14D" opacity=".3"/>'; } return s; }
function cup3c(x, y, k, t) { if (k <= 0) return ''; const z = back(cl(k)); let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(2) + ')"><path d="M-70 -80 H70 L60 20 Q55 50 25 50 H-25 Q-55 50 -60 20 Z" fill="#F4F6FB" stroke="' + ST3c + '" stroke-width="6"/><path d="M70 -60 Q110 -60 106 -20 Q102 10 64 6" stroke="#F4F6FB" stroke-width="12" fill="none"/><ellipse cy="-80" rx="70" ry="12" fill="#B8642A"/>';
  for (let i = 0; i < 3; i++) { const c = (t * .8 + i / 3) % 1; s += '<path d="M' + (-30 + i * 30) + ' ' + (-100 - c * 120) + ' q16 -20 0 -40 q-16 -20 0 -40" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity="' + (.7 * (1 - c)).toFixed(2) + '"/>'; } return s + '</g>'; }
WORLD.c3alarm = function (sc, ev, t, lt) { const ca = ev.caps, dk = ev.dock, fe = ev.feuer, te = ev.tee;
  let s = '';
  const dive = cl(lt / 1.1);
  if (dk === undefined) { // Kamera faehrt in die Chili: Rippe, Capsaicin quillt heraus
    const z = 1 + 2.2 * ease(dive); s += kit3c(t) + '<g transform="translate(' + (CH3c[0] - 40) + ' ' + CH3c[1] + ') scale(' + z.toFixed(3) + ') translate(' + -(CH3c[0] - 40) + ' ' + -CH3c[1] + ')">' + chili3c(CH3c[0], CH3c[1], 1.15, t, { bite: 1, rot: -8 }) + '</g>';
    if (ca !== undefined) { const k = cl((ca - .9) / .6); s += '<rect width="1080" height="1920" fill="#2A0814" opacity="' + (.75 * k).toFixed(2) + '"/>'; s += '<path d="M180 1110 Q540 880 900 1110 Z" fill="#FFF2C8" opacity="' + k.toFixed(2) + '" stroke="#E8D0A0" stroke-width="6"/>'; for (let i = 0; i < 9; i++) { const kk = cl((ca - 1.2 - i * .12) / .5); if (kk <= 0) continue; s += caps3c(290 + i * 62 + 20 * Math.sin(t + i), 1010 - 170 * ease(kk) - 30 * (i % 3), 1.25 * kk, t, i); } } }
  else { const zf = 1 + .22 * ease(cl((dk - 1.6) / .6)) * (fe === undefined ? 1 : 1 - ease(cl(fe / .6))); s += '<g transform="translate(540 1000) scale(' + zf.toFixed(3) + ') translate(-540 -1000)">' + tongue3c(t);
    const k = cl(dk / 2), x0 = 540, mol = [lerp(260, x0, ease(k)), lerp(760, 940, ease(k))];
    const on = cl((dk - 2) / .3), heat = te === undefined ? 0 : cl((te - .8) / .5);
    s += sensor3c(x0, t, te === undefined ? on : on * (1 - heat), heat);
    if (te === undefined || heat < 1) s += caps3c(mol[0], mol[1] - 20, 1.5, t, 0);
    for (let i = 0; i < 3; i++) s += caps3c(200 + i * 330, 740 + 40 * Math.sin(t * .8 + i), 1, t, i + 2);
    if (dk > 2 && dk < 2.6) s += '<circle cx="540" cy="1000" r="' + (80 + 400 * (dk - 2)).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="10" opacity="' + (1 - (dk - 2) / .6).toFixed(2) + '"/>';
    s += '</g>';
    if (fe !== undefined && te === undefined) { const al = cl((fe - .6) / .4); s += nerve3c([x0, 1100], [740, 720], t, cl(fe / .8)) + brain3c(760, 700, cl((fe - .5) / .4), t, al) + thermo3c(150, 840, cl((fe - 1.6) / .4), '37 °C', 0); }
    if (te !== undefined) s += cup3c(800, 780, cl(te / .5), t) + '<path d="M780 850 Q700 940 600 980" stroke="#FF9A1E" stroke-width="8" fill="none" stroke-dasharray="14 12" opacity="' + cl((te - .5) / .4).toFixed(2) + '"/>'; }
  return W(s + shade3(), slot(ev, [['caps', 'Capsaicin', 'hot']])); };
WMASC.c3alarm = (ev, t, lt) => { const fe = ev.feuer; if (fe !== undefined) { const j = Math.sin(Math.PI * cl((fe - .5) / .6)); return stay3([FX3c, GY3c - 26 * j], 1, { r: -6 * j, mood: j > .1 ? 'shock' : 'cool' }); } return stay3([FX3c, GY3c], 1, { r: 2 * Math.sin(t * 2), mood: 'cool' }); };

// ---------- Teil 2: Wasser laeuft drueber ----------
function flow3c(t, o) { o = o || {}; let s = tongue3c(t);
  // Oeltropfen (Capsaicin geloest im Fett) kleben auf der Membran
  const D = [[200, 990], [380, 1000], [560, 992], [740, 1004], [900, 996]]; const bead = cl(o.bead || 0);
  D.forEach((d0, i) => { const d = [d0[0] + (o.water ? 8 * Math.sin(t * 5 + i * 1.7) : 0), d0[1]], y = d[1] + 14 * Math.sin(d[0] * .012 + t * 1.2) - 18 - 10 * bead, w = 46 + 10 * Math.sin(t * 2 + i); s += '<ellipse cx="' + d[0] + '" cy="' + (y - 14).toFixed(0) + '" rx="' + (w * 1.35).toFixed(0) + '" ry="' + (32 + 20 * bead).toFixed(0) + '" fill="#FFB84D" stroke="' + ST3c + '" stroke-width="5" opacity=".95"/><ellipse cx="' + (d[0] - 14) + '" cy="' + (y - 8).toFixed(0) + '" rx="12" ry="6" fill="#fff" opacity=".7"/>' + caps3c(d[0], y - 12, .7, t, i); });
  // Wasser stroemt drueber (Teilchen von links nach rechts, weichen den Tropfen aus)
  const wk = cl(o.water || 0); if (wk > 0) { s += '<rect x="0" y="700" width="1080" height="300" fill="#5CB8FF" opacity="' + (.18 * wk).toFixed(2) + '"/>';
    for (let i = 0; i < 60; i++) { const c = ((t * (.35 + rnd(i) * .2)) + rnd(i + 5)) % 1, x = -40 + c * 1160, base = 760 + rnd(i + 9) * 200; let y = base; D.forEach(d => { const dx = x - d[0]; if (Math.abs(dx) < 90 && base > 900) y -= (90 - Math.abs(dx)) * .9; }); s += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' h' + (30 + 30 * rnd(i)).toFixed(0) + '" stroke="' + (o.ice ? '#E8F7FF' : '#9FD6FF') + '" stroke-width="6" stroke-linecap="round" opacity="' + (.7 * wk).toFixed(2) + '"/>'; } }
  return s; }
function ice3c(x, y, k, t, i) { if (k <= 0) return ''; const yy = lerp(640, y, ease(cl(k))) + (k > 1 ? 6 * Math.sin(t * 3 + i) : 0); return '<g transform="translate(' + x + ' ' + yy.toFixed(0) + ') rotate(' + (20 * Math.sin(i * 2) + 8 * Math.sin(t + i)).toFixed(0) + ')"><rect x="-50" y="-50" width="100" height="100" rx="16" fill="#E8F7FF" stroke="#9FD6FF" stroke-width="6" opacity=".9"/><path d="M-30 -30 L10 -36" stroke="#fff" stroke-width="8" stroke-linecap="round"/></g>'; }
WORLD.c3wasser = function (sc, ev, t, lt) { const ha = ev.haken, fe = ev.fett, dr = ev.drueber, ei = ev.eis;
  let s = '';
  if (fe === undefined && dr === undefined && ei === undefined) { // Haken: Oel und Wasser im Glas trennen sich
    s += kit3c(t); const k = cl(lt / .4), mix = 1 - cl((lt - .6) / 1.2); s += '<g transform="translate(560 1000) scale(' + back(k).toFixed(2) + ')"><path d="M-150 -330 L-130 160 H130 L150 -330 Z" fill="#CFE9FF" opacity=".18" stroke="#F4F6FB" stroke-width="8"/><path d="M-140 -60 L-131 150 H131 L140 -60 Z" fill="#5CB8FF" opacity=".55"/>';
    for (let i = 0; i < 14; i++) { const tx = -100 + rnd(i + 3) * 200, ty = lerp(-120, 100, rnd(i + 9)), y2 = lerp(-150 + 18 * (i % 3), ty, mix); s += '<circle cx="' + tx.toFixed(0) + '" cy="' + y2.toFixed(0) + '" r="' + (14 + 8 * rnd(i)).toFixed(0) + '" fill="#FFB84D" stroke="' + ST3c + '" stroke-width="4"/>'; }
    s += '</g>'; }
  else { s += flow3c(t, { water: dr === undefined ? (ei === undefined ? 0 : 1) : cl(dr / .4), bead: fe === undefined ? 1 : cl(fe / 1), ice: ei !== undefined });
    if (ei !== undefined) { const fr = Math.sin(Math.PI * cl((ei - .3) / 2.6)); [300, 540, 780].forEach((x, i) => s += ice3c(x, 820, cl((ei - i * .15) / .5) + (ei > 1 ? 1 : 0), t, i)); s += '<rect width="1080" height="1920" fill="#9FD6FF" opacity="' + (.18 * fr).toFixed(2) + '"/>' + fire3c(560, 990, t, cl((ei - 2.4) / .5) * .7, 600); } }
  return W(s + shade3(), slot(ev, [['haken', 'Mischt sich kaum mit Wasser', 'hot']])); };
WMASC.c3wasser = (ev, t, lt) => { const ha = ev.haken, ei = ev.eis; if (ei !== undefined) { const j = Math.sin(Math.PI * cl((ei - 2.4) / .6)); return stay3([FX3c, GY3c - 24 * j], 1, { r: 0, mood: j > .1 ? 'shock' : 'cool' }); } const j = ha === undefined ? 0 : Math.sin(Math.PI * cl(ha / .5)); return stay3([FX3c, GY3c - 28 * j], 1, { r: -6 * j, mood: j > .1 ? 'shock' : 'cool' }); };

// ---------- Teil 3: Milch ----------
function carton3c(x, y, ang, s, lab) { return '<g transform="translate(' + x + ' ' + y + ') rotate(' + ang.toFixed(1) + ') scale(' + s + ')"><path d="M-70 0 V-200 L-40 -250 H40 L70 -200 V0 Z" fill="#F4F6FB" stroke="' + ST3c + '" stroke-width="7"/><path d="M-70 -200 H70" stroke="' + ST3c + '" stroke-width="5"/><rect x="-70" y="-150" width="140" height="70" fill="#5CB8FF"/>' + svgT(0, -104, lab, 30, '#fff') + '<path d="M-60 -60 Q0 -40 60 -60" stroke="#9FD6FF" stroke-width="6" fill="none"/></g>'; }
// Kasein-Kugel (wuschelig) und Fettkuegelchen
function micelle3c(x, y, z, t, i, caught) { let s = '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(' + z.toFixed(2) + ')">'; for (let j = 0; j < 12; j++) { const a = j / 12 * 6.28 + t * .6 + i; s += '<path d="M0 0 L' + (62 * Math.cos(a)).toFixed(0) + ' ' + (62 * Math.sin(a)).toFixed(0) + '" stroke="#E8E2D0" stroke-width="7" stroke-linecap="round"/>'; } s += '<circle r="46" fill="#FFFDF4" stroke="#C8BFA0" stroke-width="5"/>'; if (caught) s += caps3c(0, 0, .5 * caught, t, i); return s + '</g>'; }
function meter3c(x, y, k, lab, val, med) { const h = 300; return '<g transform="translate(' + x + ' ' + y + ') scale(1.3)"><rect x="-40" y="' + -h + '" width="80" height="' + h + '" rx="20" fill="#1A0E24" stroke="#F4F6FB" stroke-width="5"/><rect x="-30" y="' + (-h + 10 + (h - 20) * (1 - val)).toFixed(0) + '" width="60" height="' + ((h - 20) * val).toFixed(0) + '" rx="14" fill="' + lc('#3BD16F', '#E8282B', val) + '"/>' + fire3c(0, -h * val, 0, val * .3, 40) + carton3c(-100, 0, 0, .5, lab) + (med > 0 ? '<g transform="translate(0 ' + (-h - 50) + ') scale(' + back(cl(med)).toFixed(2) + ')"><circle r="34" fill="#FFE14D" stroke="' + ST3c + '" stroke-width="5"/>' + svgT(0, 13, '1.', 32, ST3c) + '</g>' : '') + '</g>'; }
WORLD.c3milch = function (sc, ev, t, lt) { const mi = ev.milch, ka = ev.kasein, st = ev.studie, oe = ev.oel;
  let s = '';
  if (ka === undefined) { s += kit3c(t) + chili3c(CH3c[0], CH3c[1] + 60, .9, t, { bite: 1, rot: -8 }) + fire3c(CH3c[0] + 130, CH3c[1] + 50, t, mi === undefined ? .8 : .8 * (1 - cl((mi - 2.2) / .8)), 140);
    if (mi !== undefined) { const k = cl((mi - 1.2) / .4), tilt = ease(cl((mi - 1.4) / .4)), pour = cl((mi - 1.8) / 1); s += carton3c(860, 720 - 60 * tilt, -100 * tilt, 1, 'MILCH'); if (pour > 0) { let p = 'M700 700'; for (let i = 1; i <= 8; i++) { const c = i / 8; p += ' L' + (700 - 40 * c + 8 * Math.sin(t * 12 + i)).toFixed(0) + ' ' + (700 + 220 * c).toFixed(0); } s += '<path d="' + p + '" stroke="#FFFDF4" stroke-width="30" fill="none" stroke-linecap="round" opacity=".95"/><ellipse cx="' + (CH3c[0] + 90) + '" cy="' + (CH3c[1] + 70) + '" rx="' + (60 + 100 * pour).toFixed(0) + '" ry="' + (14 + 10 * pour).toFixed(0) + '" fill="#FFFDF4" opacity=".9"/>'; } } }
  else if (st === undefined) { // Kasein-Kugeln fangen Capsaicin und rutschen runter
    s += tongue3c(t); const sw = cl((ka - 3.4) / 1);
    if (sw > 0) { s += '<g opacity="' + sw.toFixed(2) + '">' + sensor3c(540, t, 0, 0) + '<circle cx="540" cy="900" r="' + (70 + 8 * Math.sin(t * 4)).toFixed(0) + '" fill="#3BD16F" opacity=".25"/><path d="M505 900 L530 925 L578 872" stroke="#3BD16F" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>'; }
    for (let i = 0; i < 5; i++) { const cx = 180 + i * 180, ky = 800 + 30 * Math.sin(t + i), grab = cl((ka - .8 - i * .25) / .6); const mx = lerp(cx + 60, cx, ease(grab)), my = lerp(990, ky, ease(grab));
      s += '<g opacity="' + (1 - sw).toFixed(2) + '" transform="translate(' + (200 * ease(sw)).toFixed(0) + ' ' + (300 * ease(sw)).toFixed(0) + ')">' + (grab < 1 ? caps3c(mx, my, .7, t, i) : '') + micelle3c(cx, ky, 1, t, i, grab >= 1 ? 1 : 0) + '<circle cx="' + (cx + 70) + '" cy="' + (ky + 60) + '" r="26" fill="#FFF4C8" stroke="#E8D090" stroke-width="4"/></g>'; } }
  else if (oe === undefined) { s += kit3c(t); const k = cl((st - .3) / 2.6), v = 1 - .85 * ease(k); s += meter3c(440, 1090, 1, 'VOLL', v, cl((st - 3) / .3)) + meter3c(800, 1090, 1, 'FETTARM', v, cl((st - 3.1) / .3)); }
  else { s += kit3c(t); const k = cl(oe / .4), tilt = ease(cl((oe - .4) / .5)); s += '<g transform="translate(640 1000) rotate(' + (-60 * tilt).toFixed(0) + ') scale(' + back(k).toFixed(2) + ')"><path d="M-50 160 V-40 Q-50 -80 -20 -96 V-170 H20 V-96 Q50 -80 50 -40 V160 Z" fill="#E8B830" stroke="' + ST3c + '" stroke-width="7" opacity=".95"/><rect x="-26" y="-190" width="52" height="26" rx="6" fill="#3B9B3B" stroke="' + ST3c + '" stroke-width="5"/><path d="M-30 -20 V120" stroke="#FFF2A0" stroke-width="10" stroke-linecap="round" opacity=".6"/></g>';
    if (tilt > .6) for (let i = 0; i < 4; i++) { const c = (t * 1.4 + i / 4) % 1; s += '<ellipse cx="' + (500 - 20 * c).toFixed(0) + '" cy="' + (900 + 220 * c).toFixed(0) + '" rx="14" ry="20" fill="#E8B830" opacity="' + (1 - c).toFixed(2) + '"/>'; } }
  return W(s + shade3(), slot(ev, [['milch', 'Milch löscht', 'hot']])); };
WMASC.c3milch = (ev, t, lt) => { const oe = ev.oel, mi = ev.milch; if (oe !== undefined) { const w = Math.sin(t * 14) * cl((oe - .6) / .3); return stay3([FX3c + 6 * w, GY3c], 1, { r: 8 * w, mood: 'shock' }); } if (mi !== undefined && ev.kasein === undefined) return stay3([FX3c, GY3c], 1, { r: 3, mood: 'happy' }); return stay3([FX3c, GY3c], 1, { r: 2 * Math.sin(t * 2), mood: 'cool' }); };

// ---------- Schluss ----------
WORLD.c3out = function (sc, ev, t, lt) { const sv = ev.save; let s = kit3c(t) + chili3c(820, 1080, .55, t, { bite: 1, rot: -8 }) + carton3c(560, 1170, 0, .7, 'MILCH');
  if (sv !== undefined) s += '<g transform="translate(720 960) scale(' + back(cl(sv / .4)).toFixed(2) + ')"><circle r="60" fill="#3BD16F" stroke="' + ST3c + '" stroke-width="6"/><path d="M-26 0 L-6 22 L28 -20" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
  return W(s + shade3()); };
WMASC.c3out = (ev, t, lt) => stay3([FX3c, GY3c], 1, { r: 2, mood: ev.save !== undefined ? 'happy' : 'cool' });

['c3hook', 'c3alarm', 'c3wasser', 'c3milch', 'c3out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC3c); });
