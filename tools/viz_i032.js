// I032 "Wie macht ein Spiel Wasser, das echt aussieht?" (Informatik, Skript Videospiel mit Skript 4 Abschnitt 9 und Neue Werkzeuge, Kostuem S1 Sunset-Hemd), stumme Demo v1 (27.11.2026).
// Ort eigens gebaut: Holzsteg einer Marina bei Sonnenuntergang, blasse Skyline im Dunst ueber dem Wasser, Art-deco-Bootshaus links, Boot, Bojen, Moewen. Ueber ein bestimmtes Spiel wird nichts behauptet.
// Teil 1: Drahtgitter liegt direkt auf dem Wasser (Dreiecksnetz), Tafel auf dem Steg zeigt drei Wellen und ihre Summe. Teil 2: die eine Lupe (flache Flaeche, schraege Pfeile der Normal-Map, Glitzer).
// Teil 3: Blickstrahlen aus Schaltis Augen (steil nach unten: Grund sichtbar, flach: Spiegelung). Nutzt sky28, sun28, cloud28, gulls28, dust28, warm28, ring28 (viz_p028.js), lupeH, slot, stay3, look3.
// Zum Loeschen: diese Datei und videos/I032.
var AC32 = '#7C5CFF', XS32 = 230, GY32 = 1545, SKY32 = null, HZ32 = 1000;
const mv32 = (a, b, k) => lerp(a, b, ease(cl(k)));
// Wellenhoehe an Bildpunkt x und Tiefe d (0 Horizont .. 1 vorn), amp 0..1
function wh32(x, d, t, amp) { return amp * (6 + 26 * d) * (Math.sin(x * .012 + t * 1.6 + d * 9) * .55 + Math.sin(x * .027 - t * 2.3 + d * 14) * .3 + Math.sin(x * .05 + t * 3.1 - d * 21) * .15); }
const wy32 = d => HZ32 + 620 * d * d + 0 * d; // Bild-y der Tiefenzeile d

// ---------- Ort ----------
function boat32(x, y, t) { const b = 6 * Math.sin(t * 1.4); return '<g transform="translate(' + x + ' ' + (y + b).toFixed(1) + ') rotate(' + (2 * Math.sin(t * 1.1)).toFixed(2) + ')"><ellipse cx="0" cy="8" rx="120" ry="12" fill="#000" opacity=".2"/><path d="M-120 -30 H120 L90 10 H-96 Z" fill="#F4F6FB"/><path d="M-120 -30 H120 L114 -20 H-116 Z" fill="#FF6B8A"/><rect x="-40" y="-72" width="80" height="42" rx="8" fill="#E8E2D8"/><rect x="-30" y="-64" width="26" height="18" rx="4" fill="#5C8BD8"/><rect x="4" y="-64" width="26" height="18" rx="4" fill="#5C8BD8"/><path d="M-120 -30 H-20" stroke="#FFD9A0" stroke-width="3" opacity=".8"/></g>'; }
function house32() { let s = '<defs><linearGradient id="bh32" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E8C8B8"/><stop offset=".75" stop-color="#F8E2CC"/><stop offset="1" stop-color="#FFE9C8"/></linearGradient></defs>';
  s += '<rect x="20" y="820" width="260" height="190" fill="url(#bh32)"/><rect x="60" y="780" width="180" height="40" fill="#F0D4C0"/><rect x="100" y="752" width="100" height="28" fill="#F4DCC8"/><rect x="132" y="730" width="36" height="22" fill="#F8E4D0"/>';
  s += '<path d="M20 870 H280 M20 878 H280" stroke="#5CC8D8" stroke-width="4"/>'; for (let i = 0; i < 4; i++) s += '<rect x="' + (42 + i * 60) + '" y="900" width="36" height="50" rx="4" fill="' + (i === 2 ? '#FFD27A' : '#6A8AC8') + '"/>';
  for (let i = 0; i < 5; i++) s += '<path d="M' + (60 + i * 36) + ' 960 h36 l-6 18 h-36 Z" fill="' + (i % 2 ? '#5CC8D8' : '#F4F6FB') + '"/>';
  s += '<rect x="272" y="820" width="8" height="190" fill="#C9A898" opacity=".6"/>'; return s; }
function skyline32() { let s = '<g opacity=".5">'; [[520, 70], [560, 110], [600, 84], [650, 140], [700, 96], [760, 120], [820, 78], [880, 104], [940, 66], [1000, 90]].forEach(([x, h]) => s += '<rect x="' + x + '" y="' + (HZ32 - h) + '" width="44" height="' + h + '" fill="#B88AA8"/>');
  s += '<path d="M470 ' + HZ32 + ' q4 -60 -4 -100 M470 ' + (HZ32 - 100) + ' q-30 0 -40 20 M470 ' + (HZ32 - 100) + ' q30 0 40 20" stroke="#8A5A78" stroke-width="7" fill="none"/></g>'; return s; }
// Wasser: o.grid 0..1 Gitter, o.amp Wellenstaerke, o.clear 0..1 klares Fenster vorn, o.mirror 0..1 Spiegelung betont
function water32(t, o) { o = o || {}; const amp = o.amp === undefined ? .35 : o.amp;
  let s = '<defs><linearGradient id="wa32" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0A080"/><stop offset=".12" stop-color="#B06A98"/><stop offset=".45" stop-color="#3A4C9A"/><stop offset="1" stop-color="#1A2A66"/></linearGradient><linearGradient id="gl32" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE9B0" stop-opacity=".9"/><stop offset="1" stop-color="#FFB86A" stop-opacity="0"/></linearGradient></defs><rect x="0" y="' + HZ32 + '" width="1080" height="920" fill="url(#wa32)"/>';
  if (o.mirror) s += '<rect x="0" y="' + HZ32 + '" width="1080" height="520" fill="url(#gl32)" opacity="' + (.35 * cl(o.mirror)).toFixed(2) + '"/>';
  // Glitzerbahn unter der Sonne
  for (let i = 0; i < 46; i++) { const d = Math.pow(rnd(i + 300), 1.4), y = wy32(d) + wh32(860, d, t, amp) * .4, w = 14 + 120 * d * rnd(i + 301), x = 860 + (rnd(i + 302) - .5) * (40 + 360 * d) + 10 * Math.sin(t * 2 + i); s += '<path d="M' + (x - w / 2).toFixed(0) + ' ' + y.toFixed(0) + ' h' + w.toFixed(0) + '" stroke="#FFE9B0" stroke-width="' + (2 + 4 * d).toFixed(1) + '" stroke-linecap="round" opacity="' + ((.3 + .5 * Math.abs(Math.sin(t * 3 + i))) * (o.mirror ? 1 : .8)).toFixed(2) + '"/>'; }
  // Wellenkaemme
  for (let r = 1; r < 14; r++) { const d = r / 14; let p = ''; for (let x = -20; x <= 1100; x += 40) { const y = wy32(d) + wh32(x, d, t, amp); p += (x < 0 ? 'M' : 'L') + x + ' ' + y.toFixed(1); } s += '<path d="' + p + '" stroke="#9FB8F0" stroke-width="' + (1.5 + 3 * d).toFixed(1) + '" fill="none" opacity="' + (.18 + .1 * d).toFixed(2) + '"/>'; }
  if (o.clear > 0) { const k = cl(o.clear); s += '<g opacity="' + k.toFixed(2) + '"><path d="M520 1480 Q760 1460 1080 1480 V1580 H560 Z" fill="#5CC8C0" opacity=".35"/><path d="M600 1560 q120 -20 240 0 t240 0" stroke="#E8D2A0" stroke-width="16" fill="none" opacity=".7"/>';
    for (let i = 0; i < 3; i++) { const fx = 660 + ((t * 40 + i * 140) % 400), fy = 1510 + 14 * i + 8 * Math.sin(t * 3 + i); s += '<path d="M' + fx.toFixed(0) + ' ' + fy.toFixed(0) + ' q-20 -14 -40 0 q20 14 40 0 Z M' + (fx - 40).toFixed(0) + ' ' + fy.toFixed(0) + ' l-14 -10 v20 Z" fill="#FFB84D" opacity=".85"/>'; } s += '</g>'; }
  if (o.grid > 0) { const g = cl(o.grid); let w = '<g opacity="' + (.85 * g).toFixed(2) + '">'; const rows = o.dense ? 30 : 12, cols = o.dense ? 40 : 16;
    for (let r = 1; r <= rows; r++) { const d = r / rows; if (!o.dense && rnd(r + 40) > g * 1.4) continue; let p = ''; for (let c = 0; c <= cols; c++) { const x = c / cols * 1200 - 60, y = wy32(d) + wh32(x, d, t, amp); p += (c ? 'L' : 'M') + x.toFixed(0) + ' ' + y.toFixed(1); } w += '<path d="' + p + '" stroke="#5CFFD8" stroke-width="' + (1.5 + 2 * d).toFixed(1) + '" fill="none"/>'; }
    for (let c = 0; c <= cols; c++) { const x0 = c / cols * 1200 - 60; let p = ''; for (let r = 1; r <= rows; r++) { const d = r / rows, x = 540 + (x0 - 540) * d, y = wy32(d) + wh32(x, d, t, amp); p += (r > 1 ? 'L' : 'M') + x.toFixed(0) + ' ' + y.toFixed(1); if (r < rows) { const d2 = (r + 1) / rows, x2 = 540 + (x0 + 1200 / cols - 540) * d2; p += 'L' + x2.toFixed(0) + ' ' + (wy32(d2) + wh32(x2, d2, t, amp)).toFixed(1) + 'L' + x.toFixed(0) + ' ' + y.toFixed(1); } } w += '<path d="' + p + '" stroke="#5CFFD8" stroke-width="1.5" fill="none" opacity=".7"/>'; }
    s += w + '</g>'; }
  return s; }
function jetty32(t) { let s = '<defs><linearGradient id="jt32" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7A4A3A"/><stop offset=".7" stop-color="#A8704E"/><stop offset="1" stop-color="#C98F62"/></linearGradient></defs>';
  s += '<path d="M0 1500 L560 1500 L700 1920 L0 1920 Z" fill="url(#jt32)"/>'; for (let i = 0; i < 7; i++) { const y = 1500 + 420 * Math.pow(i / 7, 1.4); s += '<path d="M0 ' + y.toFixed(0) + ' L' + (560 + 140 * (y - 1500) / 360).toFixed(0) + ' ' + y.toFixed(0) + '" stroke="#5A3428" stroke-width="3"/>'; }
  s += '<path d="M560 1500 L700 1920" stroke="#FFD9A0" stroke-width="5" opacity=".8"/>';
  [[520, 1500], [120, 1500]].forEach(([x, y]) => s += '<rect x="' + (x - 14) + '" y="' + (y - 90) + '" width="28" height="100" rx="6" fill="#6A3E2E"/><rect x="' + (x + 6) + '" y="' + (y - 90) + '" width="8" height="100" fill="#C98F62" opacity=".7"/>');
  s += '<ellipse cx="760" cy="1250" rx="22" ry="8" fill="#000" opacity=".2"/><path d="M748 1250 q12 -40 24 0 Z" fill="#FF6B4A"/><path d="M752 1238 h16" stroke="#F4F6FB" stroke-width="5"/>';
  return s; }
function scene32(t, o) { o = o || {}; if (!SKY32) SKY32 = sky28(); return SKY32 + sun28(t) + cloud28(t) + skyline32() + house32() + water32(t, o) + boat32(660, 1130, t) + gulls28(t) + jetty32(t); }
function fin32(s, ev, t, slots) { return W(s + dust28(t) + warm28() + shade3(), slots); }

// Tafel auf dem Steg: drei Wellen und ihre Summe, k 0..1
function board32(t, k, sum) { if (!(k > 0)) return ''; const e = back(cl(k)); let s = '<g transform="translate(760 1515) scale(' + (.8 * e).toFixed(3) + ')"><rect x="-210" y="0" width="420" height="40" rx="10" fill="#A8704E" stroke="#5A3428" stroke-width="4"/><path d="M-230 44 q40 10 80 0 t80 0 t80 0 t80 0 t80 0 t60 0" stroke="#9FB8F0" stroke-width="4" fill="none" opacity=".5"/><rect x="-128" y="-260" width="14" height="262" fill="#5A3428"/><rect x="114" y="-260" width="14" height="262" fill="#5A3428"/>';
  s += '<rect x="-190" y="-300" width="380" height="250" rx="14" fill="#1E1A3E" stroke="#F4E3C8" stroke-width="6"/><path d="M-190 -300 H190" stroke="#FFD9A0" stroke-width="4"/>';
  const cs = ['#FF6B8A', '#FFD23F', '#3DC6FF']; [[.012, 1.6, 24], [.027, -2.3, 14], [.05, 3.1, 8]].forEach((q, i) => { let p = ''; for (let x = -170; x <= 170; x += 10) p += (x > -170 ? 'L' : 'M') + x + ' ' + (-260 + i * 34 + q[2] * .5 * Math.sin(x * q[0] * 3 + t * q[1])).toFixed(1); s += '<path d="' + p + '" stroke="' + cs[i] + '" stroke-width="4" fill="none" opacity="' + (sum ? .5 : 1) + '"/>'; });
  if (sum) { const c = cl(sum); let p = ''; for (let x = -170; x <= -170 + 340 * c; x += 8) { let y = 0; [[.012, 1.6, 24], [.027, -2.3, 14], [.05, 3.1, 8]].forEach(q => y += q[2] * .9 * Math.sin(x * q[0] * 3 + t * q[1])); p += (p ? 'L' : 'M') + x + ' ' + (-110 + y).toFixed(1); } s += svgT(-150, -150, 'Summe', 24, '#F4F6FB', 'start') + '<path d="' + p + '" stroke="#5CFFD8" stroke-width="7" fill="none"/>'; }
  return s + '</g>'; }

// ---------- Einstieg ----------
WORLD.i32Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; const g = cl((lt - .4) / 1);
  let s = scene32(t, { grid: fr === undefined && lo === undefined ? g : 0, amp: .45, mirror: lo !== undefined ? cl(lo / .6) : 0 });
  if (lo !== undefined) s += ring28([900, 1080], (lo - .6) % 1.4, '#FFB84D');
  return fin32(s, ev, t); };
WMASC.i32Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) return stay3([XS32, GY32], 1, { r: -6 * Math.sin(Math.PI * cl(lo / .8)), mood: 'happy' });
  if (fr !== undefined) { const j = Math.sin(Math.PI * cl((fr - .3) / .6)); return stay3([XS32, GY32 - 20 * Math.max(0, j)], 1, { r: 8 * Math.max(0, j), mood: 'shock' }); }
  return stay3([XS32, GY32], 1, { r: 3 * Math.sin(t * 2), mood: lt > .6 && lt < 3 ? 'shock' : 'cool' }); };

// ---------- Teil 1: Netz und Wellen ----------
WORLD.i32Netz = function (sc, ev, t, lt) { const ne = ev.netz, we = ev.welle, ec = ev.echt; const gr = ec !== undefined ? 1 - cl(ec / .8) : ne !== undefined ? cl(ne / 1.2) : 0, amp = we !== undefined ? lerp(.05, .55, cl(we / 1.2)) : ne !== undefined ? .05 : .35;
  let s = scene32(t, { grid: gr, amp: amp });
  if (we !== undefined) s += board32(t, cl(we / .5), ec === undefined ? cl((we - 1) / 1.4) : 1);
  return fin32(s, ev, t, slot(ev, [['netz', 'Netz aus Dreiecken'], ['welle', 'Wellen übereinander', 'hot'], ['echt', 'Wirkt wie echtes Meer']])); };
WMASC.i32Netz = (ev, t, lt) => { const we = ev.welle, ec = ev.echt; if (ec !== undefined) { const j = Math.sin(Math.PI * cl((ec - .2) / .6)); return stay3([XS32, GY32 - 24 * Math.max(0, j)], 1, { r: -8 * j, mood: 'happy' }); }
  if (we !== undefined) { const p = 6 * Math.sin(t * 3); return stay3([XS32 + 10, GY32], 1, { r: p, mood: 'cool' }); }
  return stay3([mv32(XS32 - 20, XS32, lt / .5), GY32], 1, { r: 3 * Math.sin(t * 2), mood: 'shock' }); };

// ---------- Teil 2: Normal-Map ----------
function nmap32(t, k, ph) { let s = '<defs><linearGradient id="lw32" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A6AC0"/><stop offset="1" stop-color="#22306E"/></linearGradient></defs><rect x="-320" y="-320" width="640" height="640" fill="url(#lw32)"/>';
  s += '<path d="M-320 60 H320" stroke="#F4F6FB" stroke-width="8"/>'; // flache Flaeche
  for (let i = 0; i < 9; i++) { const x = -240 + i * 60, a = (ph > 0 ? 30 * Math.sin(i * 1.3 + t * 2) * cl(ph) : 0) * Math.PI / 180; s += '<path d="M' + x + ' 60 L' + (x + 90 * Math.sin(a)).toFixed(0) + ' ' + (60 - 90 * Math.cos(a)).toFixed(0) + '" stroke="#FFD23F" stroke-width="7" stroke-linecap="round"/><circle cx="' + (x + 90 * Math.sin(a)).toFixed(0) + '" cy="' + (60 - 90 * Math.cos(a)).toFixed(0) + '" r="9" fill="#FFD23F"/>';
    if (ph > .5 && Math.sin(a) > .3) s += '<circle cx="' + x + '" cy="60" r="' + (18 + 6 * Math.sin(t * 6 + i)).toFixed(0) + '" fill="#FFF6D8" opacity=".75"/>'; }
  s += '<rect x="-210" y="150" width="420" height="64" rx="14" fill="#05071A"/>' + svgT(0, 194, ph > 0 ? 'Fläche bleibt flach' : 'Fläche', 34, '#F4F6FB'); return s; }
WORLD.i32Map = function (sc, ev, t, lt) { const ka = ev.karte, li = ev.licht, sp = ev.spar; let s = scene32(t, { amp: .3, grid: ka === undefined && ev.rehook !== undefined ? cl(lt / .6) : 0, dense: 1 });
  if (ka !== undefined) { const k = ease(cl(ka / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.4 * k).toFixed(2) + '"/>' + lupeH(560, 850, 190, nmap32(t, k, li !== undefined ? cl(li / .8) : 0), k); }
  return fin32(s, ev, t, slot(ev, [['karte', 'Normal-Map: ein Bild'], ['licht', 'Verbiegt nur das Licht', 'hot'], ['spar', 'Viel Detail, wenig Rechnen']])); };
WMASC.i32Map = (ev, t, lt) => { const rh = ev.rehook, li = ev.licht;
  if (li !== undefined && ev.spar === undefined) { const j = Math.sin(Math.PI * cl((li - .4) / .6)); return stay3([XS32, GY32 - 18 * Math.max(0, j)], 1, { r: 10 * j, mood: 'shock' }); }
  if (rh !== undefined && ev.karte === undefined) { const k = cl(lt / .9); return stay3([XS32 + 40 * Math.sin(Math.PI * k), GY32], 1, { walk: k > .05 && k < .95 ? 1 : 0, r: 4 * Math.sin(Math.PI * k), mood: 'happy' }); }
  return stay3([XS32, GY32], 1, { r: 3 * Math.sin(t * 2), mood: 'cool' }); };

// ---------- Teil 3: Fresnel ----------
WORLD.i32Fres = function (sc, ev, t, lt) { const fl = ev.flach, st = ev.steil, fr = ev.fresnel; const eye = [XS32 + 60, GY32 - 170];
  let s = scene32(t, { amp: .3, mirror: fl !== undefined ? cl(fl / .6) : 0, clear: st !== undefined ? cl(st / .6) : 0 });
  if (fl !== undefined) { s += ray28(eye, [900, 1060], '#FFB84D', cl(fl / .6), 7); s += ring28([900, 1060], (fl - .6) % 1.6, '#FFB84D'); if (fl > .8) s += '<g opacity="' + cl((fl - .8) / .3).toFixed(2) + '"><rect x="700" y="975" width="220" height="56" rx="12" fill="#05071A" opacity=".85"/>' + svgT(810, 1013, 'spiegelt', 32, '#FFD9A0') + '</g>'; }
  if (st !== undefined) { s += ray28(eye, [700, 1530], '#3DFF7A', cl(st / .6), 7); s += ring28([700, 1530], (st - .6) % 1.6, '#3DFF7A'); if (st > .8) s += '<g opacity="' + cl((st - .8) / .3).toFixed(2) + '"><rect x="640" y="1400" width="250" height="56" rx="12" fill="#05071A" opacity=".85"/>' + svgT(765, 1438, 'nur rund 2 %', 32, '#3DFF7A') + '</g>'; }
  return fin32(s, ev, t, slot(ev, [['flach', 'Flach: fast ein Spiegel'], ['steil', 'Steil: du siehst hinein', 'hot'], ['fresnel', 'Fresnel-Effekt']])); };
WMASC.i32Fres = (ev, t, lt) => { const rh = ev.rehook, fl = ev.flach, st = ev.steil;
  if (st !== undefined) return stay3([XS32, GY32], 1, { r: 10 * cl(st / .4), mood: ev.fresnel !== undefined ? 'happy' : 'shock' });
  if (fl !== undefined) return stay3([XS32, GY32], 1, { r: -6 * cl(fl / .4), mood: 'cool' });
  if (rh !== undefined) { const j = Math.sin(Math.PI * cl(lt / .7)); return stay3([XS32, GY32 - 20 * j], 1, { r: -8 * j, mood: 'happy' }); }
  return stay3([XS32, GY32], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.i32Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(scene32(t, { amp: .4, mirror: .5 }) + dust28(t) + warm28() + '<defs><linearGradient id="od32" x1="0" y1="0" x2="0" y2="1"><stop offset=".25" stop-color="#05071A" stop-opacity=".7"/><stop offset=".62" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od32)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.i32Out = (ev, t, lt) => stay3([XS32 + 40 * Math.sin(Math.PI * cl((lt - 1) / 5)), GY32 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['i32Hook', 'i32Netz', 'i32Map', 'i32Fres', 'i32Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC32); });
