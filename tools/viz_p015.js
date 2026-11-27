// P015 "Warum hoerst du den Knall erst nach dem Licht?" (Physik, Skript 4 mit Abschnitt 9 und Neue Werkzeuge, Kostuem P1 Professor), stumme Demo v1 (27.11.2026).
// Ort eigens gebaut: Balkon in der Silvesternacht, Gelaender, Lichterkette, Stadt mit Fernsehturm in der Ferne, Raketen platzen ueber der Stadt.
// Einstieg: Rakete platzt (Licht), Schalti zuckt erst beim Knall eine Sekunde spaeter. Teil 1: die eine Lupe (Erde, Licht laeuft mehr als siebenmal herum).
// Teil 2: Wissenschaftsmodus (Druckwelle aus Luftteilchen, Tempo-Balken Licht gegen Schall). Teil 3: Gegenstand Stoppuhr, Entfernungsband bis 1 km.
// Nur Erklaerung, keine Anleitung zum Feuerwerk. Nutzt lupeH, fuse33, lab33, lab33dots, slot, stay3, look3. Zum Loeschen: diese Datei und videos/P015.
var AC15 = '#5CE1FF', ST15 = '#0B1020', XC15 = 790, GC15 = 1140, XF15 = 270, GF15 = 1537;
const mv15 = (a, b, k) => lerp(a, b, ease(cl(k)));

// Feuerwerk: Kugel aus Funken bei (x,y), Alter a in s (ab 0), Farbe
function burst15(x, y, a, col, r0) { if (a < 0 || a > 2.2) return ''; r0 = r0 || 150; const k = ease(cl(a / .6)), f = 1 - cl((a - 1) / 1.2); let s = '';
  if (a < .25) s += '<circle cx="' + x + '" cy="' + y + '" r="' + (60 + 200 * a) + '" fill="#FFF6D8" opacity="' + (.8 * (1 - a / .25)).toFixed(2) + '"/>';
  for (let i = 0; i < 16; i++) { const g = i / 16 * Math.PI * 2, r = r0 * k, px = x + Math.cos(g) * r, py = y + Math.sin(g) * r + 40 * a * a; s += '<path d="M' + (x + Math.cos(g) * r * .6).toFixed(0) + ' ' + (y + Math.sin(g) * r * .6 + 30 * a * a).toFixed(0) + ' L' + px.toFixed(0) + ' ' + py.toFixed(0) + '" stroke="' + col + '" stroke-width="6" stroke-linecap="round" opacity="' + f.toFixed(2) + '"/><circle cx="' + px.toFixed(0) + '" cy="' + py.toFixed(0) + '" r="6" fill="#FFF6D8" opacity="' + f.toFixed(2) + '"/>'; }
  return s; }
// Ort: Balkon bei Nacht. fl = Blitzlicht 0..1
function balc15(t, o) { o = o || {}; let s = '<defs><linearGradient id="sk15" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060A24"/><stop offset="1" stop-color="#1E2450"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk15)"/>';
  for (let i = 0; i < 40; i++) s += '<circle cx="' + (rnd(i + 500) * 1080).toFixed(0) + '" cy="' + (60 + rnd(i + 501) * 700).toFixed(0) + '" r="' + (1 + 1.6 * rnd(i + 502)).toFixed(1) + '" fill="#fff" opacity="' + (.3 + .3 * Math.sin(t + i)).toFixed(2) + '"/>';
  // Stadt mit Fernsehturm
  s += '<rect x="700" y="760" width="14" height="300" fill="#2A3060"/><circle cx="707" cy="800" r="30" fill="#2A3060"/><circle cx="707" cy="800" r="8" fill="#FF6B6B" opacity="' + (.5 + .5 * Math.sin(t * 3)).toFixed(2) + '"/>';
  for (let i = 0; i < 16; i++) { const x = i * 70, h = 90 + 120 * rnd(i + 520); s += '<rect x="' + x + '" y="' + (1060 - h).toFixed(0) + '" width="62" height="' + h.toFixed(0) + '" fill="#1A1E44" stroke="' + ST15 + '" stroke-width="3"/>'; for (let j = 0; j < 5; j++) if (rnd(i * 7 + j) > .5) s += '<rect x="' + (x + 10 + 22 * (j % 2)) + '" y="' + (1060 - h + 14 + 26 * j).toFixed(0) + '" width="12" height="12" fill="#FFD27A" opacity=".7"/>'; }
  // Balkon: Boden, Hauswand rechts, Gelaender
  s += '<rect x="0" y="1060" width="1080" height="80" fill="#3A3F66"/><rect x="0" y="1140" width="1080" height="420" fill="#4A4F78" stroke="' + ST15 + '" stroke-width="5"/>';
  s += '<rect x="0" y="960" width="1080" height="14" fill="#8A90B8" stroke="' + ST15 + '" stroke-width="4"/>'; for (let i = 0; i < 18; i++) s += '<rect x="' + (20 + i * 60) + '" y="974" width="10" height="166" fill="#8A90B8" stroke="' + ST15 + '" stroke-width="2"/>';
  s += '<path d="M0 940 Q270 990 540 940 T1080 940" fill="none" stroke="#2A2A3A" stroke-width="3"/>'; for (let i = 0; i < 16; i++) { const x = 30 + i * 68; s += '<circle cx="' + x + '" cy="' + (958 - 18 * Math.cos((x % 540) / 540 * Math.PI * 2)).toFixed(0) + '" r="7" fill="' + ['#FFD23F', '#FF6B8A', '#5CE1FF'][i % 3] + '" opacity="' + (.7 + .3 * Math.sin(t * 3 + i)).toFixed(2) + '"/>'; }
  s += '<defs><linearGradient id="fl15" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A3F66"/><stop offset="1" stop-color="#1A1E3A"/></linearGradient></defs><rect x="0" y="1560" width="1080" height="360" fill="url(#fl15)"/>';
  // Blumenkasten links und Stuhl
  s += '<rect x="60" y="1084" width="220" height="56" rx="8" fill="#A85A3A" stroke="' + ST15 + '" stroke-width="4"/>'; for (let i = 0; i < 5; i++) s += '<path d="M' + (90 + i * 40) + ' 1084 q-8 -40 6 -70" stroke="#3A7A4A" stroke-width="8" fill="none" stroke-linecap="round"/>';
  if (o.fl > 0) s += '<rect width="1080" height="1920" fill="#FFE9C0" opacity="' + (.18 * cl(o.fl)).toFixed(2) + '"/>';
  return s; }
// Knall-Ringe bei (x,y), k 0..1
function bang15(x, y, k) { if (!(k > 0 && k < 1)) return ''; let s = ''; for (let i = 0; i < 3; i++) { const c = cl(k * 1.3 - i * .15); if (c <= 0 || c >= 1) continue; s += '<circle cx="' + x + '" cy="' + y + '" r="' + (40 + 200 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="' + (10 * (1 - c)).toFixed(1) + '" opacity="' + (1 - c).toFixed(2) + '"/>'; } return s; }

// ---------- Einstieg ----------
WORLD.p15Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; const a = lt - .1, fl = a > 0 && a < .4 ? 1 - a / .4 : 0;
  let s = balc15(t, { fl: fl }) + burst15(420, 720, a, '#FF6BD6', 140);
  const bk = cl((lt - 1.1) / .8); s += bang15(XC15 - 40, GC15 - 150, bk);
  if (lt > 1.1 && lt < 1.6) s += '<g transform="translate(' + (XC15 - 210) + ' 860) rotate(-8)"><rect x="-90" y="-46" width="180" height="80" rx="14" fill="#FFE14D" stroke="' + ST15 + '" stroke-width="5"/>' + svgT(0, 12, 'BUMM', 44, ST15) + '</g>';
  if (fr !== undefined) s += burst15(600, 700, fr - .2, '#5CE1FF', 120);
  if (lo !== undefined) { s += burst15(300, 740, lo - .1, '#7BC74D', 110); const k = ease(cl((lo - .3) / .5)); s += '<g opacity="' + k.toFixed(2) + '"><path d="M300 760 L' + (XC15 - 60) + ' ' + (GC15 - 120) + '" stroke="#F4F6FB" stroke-width="5" stroke-dasharray="14 10"/>' + svgT(520, 860, '? m', 50, '#F4F6FB') + '</g>'; }
  return W(s + shade3()); };
WMASC.p15Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) return stay3([XC15, GC15 - 14 * Math.abs(Math.sin(Math.PI * cl(lo / .6)))], 1, { r: -4, mood: 'happy' });
  if (fr !== undefined) return stay3([XC15, GC15], 1, { r: -6 * Math.sin(Math.PI * cl(fr / 1)), mood: 'shock' });
  if (lt > 1.1 && lt < 2.2) { const j = Math.sin(Math.PI * cl((lt - 1.1) / .6)); return stay3([XC15 + 20 * j, GC15 - 60 * j], 1, { r: 16 * j, mood: 'shock' }); }
  return stay3([XC15, GC15], 1, { r: -6, mood: 'happy' }); };

// ---------- Teil 1: Licht ist schnell (die eine Lupe) ----------
function earth15(t, k) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#060A24"/><circle r="170" fill="#2F6FA8" stroke="#9FD0FF" stroke-width="6"/><path d="M-100 -80 q40 -40 90 -10 q30 30 -10 60 q-50 20 -80 -50 Z M30 40 q60 -10 80 40 q-20 50 -70 30 Z" fill="#7CB342"/>';
  const laps = 7.5 * cl(k), a = laps * Math.PI * 2; s += '<circle r="215" fill="none" stroke="#3A4070" stroke-width="4" stroke-dasharray="8 8"/>';
  s += '<circle cx="' + (215 * Math.cos(a - Math.PI / 2)).toFixed(0) + '" cy="' + (215 * Math.sin(a - Math.PI / 2)).toFixed(0) + '" r="16" fill="#FFF6C8"/><circle cx="' + (215 * Math.cos(a - Math.PI / 2)).toFixed(0) + '" cy="' + (215 * Math.sin(a - Math.PI / 2)).toFixed(0) + '" r="34" fill="#FFF6C8" opacity=".3"/>';
  return s; }
WORLD.p15Licht = function (sc, ev, t, lt) { const sc1 = ev.schnell, so = ev.sofort, ru = ev.rund; let s = balc15(t) + burst15(520, 780, lt % 2.6, '#FFD23F', 100);
    if (so !== undefined && ru === undefined) { const c = cl(so / .5); s += '<path d="M520 780 L' + lerp(520, XC15 - 40, c).toFixed(0) + ' ' + lerp(780, GC15 - 140, c).toFixed(0) + '" stroke="#FFF6C8" stroke-width="10" stroke-linecap="round" opacity=".9"/>'; }
  if (ru !== undefined) { const k = ease(cl(ru / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * k).toFixed(2) + '"/>' + lupeH(430, 870, 200, earth15(t, cl((ru - .4) / 2.2)), k) + '<g opacity="' + k.toFixed(2) + '"><rect x="280" y="1086" width="300" height="66" rx="14" fill="#05071A"/>' + svgT(430, 1132, Math.min(7.5, 7.5 * cl((ru - .4) / 2.2)).toFixed(1).replace('.', ',') + ' Runden', 42, '#FFE14D') + '</g>'; }
  return W(s + shade3(), slot(ev, [['schnell', 'Licht: rund 300.000 km/s'], ['sofort', 'Praktisch sofort da', 'hot'], ['rund', 'Mehr als 7-mal um die Erde']])); };
WMASC.p15Licht = (ev, t, lt) => { const so = ev.sofort; if (so !== undefined && ev.rund === undefined) { const j = Math.sin(Math.PI * cl(so / .5)); return stay3([XC15, GC15 - 20 * j], 1, { r: -10 * j, mood: 'shock' }); }
  return stay3([mv15(XC15 + 20, XC15, lt / .5), GC15], 1, { r: 3 * Math.sin(t * 2), mood: ev.rund !== undefined ? 'happy' : 'cool' }); };

// ---------- Teil 2: Schall ist langsam (Wissenschaftsmodus) ----------
function sci15(t, ev) { const dr = ev.druck, la = ev.lahm, mi = ev.million; let s = '';
  if (dr !== undefined && mi === undefined) { const k = cl(dr / .5); // Luftteilchen, Druckwelle laeuft nach rechts
    for (let r = 0; r < 6; r++) for (let i = 0; i < 18; i++) { const x0 = 200 + i * 40, wx = (t * 140) % 720, d = x0 - 200 - wx, push = 22 * Math.exp(-(d * d) / 2400) * Math.sign(-d || 1); s += '<circle cx="' + (x0 + push).toFixed(0) + '" cy="' + (720 + r * 46) + '" r="9" fill="#9FC2FF" opacity="' + (k * .9).toFixed(2) + '"/>'; }
    s += svgT(540, 1030, 'Druckwelle in der Luft', 36, '#F4F6FB'); }
  if (la !== undefined && mi === undefined) { const k = cl(la / .6); s += '<g opacity="' + k.toFixed(2) + '"><rect x="200" y="1070" width="680" height="64" rx="14" fill="#1A2048" stroke="#F4F6FB" stroke-width="3"/>' + svgT(540, 1114, 'Schall: rund 330 m pro Sekunde', 34, '#FFE14D') + '</g>'; }
  if (mi !== undefined) { const k = ease(cl(mi / .8)); s += '<rect x="180" y="640" width="720" height="460" rx="20" fill="#05071A" opacity="' + (.85 * k).toFixed(2) + '"/>';
    s += '<g opacity="' + k.toFixed(2) + '">' + svgT(250, 740, 'Licht', 40, '#FFF6C8', 'start') + '<rect x="250" y="760" width="' + (600 * k).toFixed(0) + '" height="50" rx="10" fill="#FFF6C8"/>' + svgT(250, 900, 'Schall', 40, '#FFE14D', 'start') + '<rect x="250" y="920" width="6" height="50" fill="#FFE14D"/>' + svgT(280, 960, 'winzig', 34, '#FFE14D', 'start') + svgT(540, 1060, 'fast 1 Million Mal schneller', 38, '#F4F6FB') + '</g>'; }
  return s; }
WORLD.p15Schall = function (sc, ev, t, lt) { const bg = fuse33(balc15(t), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '">' + lab33dots() + sci15(t, ev) + '</g>' + shade3(), slot(ev, [['druck', 'Schall = Druckwelle'], ['lahm', 'Rund 330 m pro Sekunde', 'hot'], ['million', 'Licht: fast 1 Mio. Mal schneller']])); };
WMASC.p15Schall = (ev, t, lt) => { const la = ev.lahm; if (la !== undefined && ev.million === undefined) { const j = Math.sin(Math.PI * cl((la - .3) / .6)); return stay3([XF15, GF15 - 24 * Math.max(0, j)], 1, { r: -8 * Math.max(0, j), mood: 'shock' }); }
  if (ev.druck !== undefined || ev.million !== undefined) return stay3([XF15, GF15], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  const k = cl(lt / .35); return stay3([lerp(XC15, XF15, ease(k)), lerp(GC15, GF15, k * k)], 1, { r: 10 * Math.sin(Math.PI * k), mood: 'happy' }); };

// ---------- Teil 3: Selbst messen ----------
function watch15(x, y, sec, k) { if (!(k > 0)) return ''; const e = back(cl(k)), a = sec / 60 * Math.PI * 2 * 5; return '<g transform="translate(' + x + ' ' + y + ') scale(' + e.toFixed(3) + ')"><rect x="-20" y="-150" width="40" height="30" rx="6" fill="#C9CFDB" stroke="' + ST15 + '" stroke-width="4"/><circle r="130" fill="#F4F6FB" stroke="' + ST15 + '" stroke-width="8"/><path d="M0 0 L' + (90 * Math.sin(a)).toFixed(0) + ' ' + (-90 * Math.cos(a)).toFixed(0) + '" stroke="#E8384F" stroke-width="8" stroke-linecap="round"/><circle r="10" fill="' + ST15 + '"/>' + svgT(0, 70, Math.floor(sec) + ' s', 50, ST15) + '</g>'; }
WORLD.p15Mess = function (sc, ev, t, lt) { const za = ev.zaehl, dr = ev.drei, ei = ev.eins; let s = balc15(t);
  if (za !== undefined && dr === undefined) { s += burst15(300, 760, za - .2, '#FF6BD6', 140); s += watch15(560, 880, Math.min(3, Math.max(0, za - .2)), cl(za / .4)); s += bang15(XC15 - 40, GC15 - 150, cl((za - 3.2) / .8)); }
  if (dr !== undefined && ei === undefined) { const k = ease(cl(dr / .5)); s += '<g opacity="' + k.toFixed(2) + '"><rect x="90" y="650" width="830" height="230" rx="20" fill="#05071A" opacity=".85"/><path d="M150 790 H860" stroke="#F4F6FB" stroke-width="8"/><path d="M150 770 v40 M860 770 v40" stroke="#F4F6FB" stroke-width="8"/>' + svgT(505, 750, '3 Sekunden', 44, '#FFE14D') + svgT(505, 850, 'rund 1 Kilometer', 44, '#F4F6FB') + '</g>'; }
  if (ei !== undefined) { const k = ease(cl(ei / .5)); s += '<g opacity="' + k.toFixed(2) + '"><rect x="90" y="650" width="830" height="230" rx="20" fill="#05071A" opacity=".85"/><path d="M150 790 H387" stroke="#F4F6FB" stroke-width="8"/><path d="M150 770 v40 M387 770 v40" stroke="#F4F6FB" stroke-width="8"/>' + svgT(505, 750, '1 Sekunde', 44, '#FFE14D') + svgT(505, 850, 'rund 330 Meter', 44, '#F4F6FB') + '</g>'; }
  return W(s + shade3(), slot(ev, [['zaehl', 'Sekunden zählen'], ['drei', '3 s ≈ 1 km', 'hot'], ['eins', '1 s ≈ 330 m']])); };
WMASC.p15Mess = (ev, t, lt) => { const rh = ev.rehook, za = ev.zaehl, ei = ev.eins;
  if (za !== undefined && ev.drei === undefined) { const j = za > 3.2 && za < 4 ? Math.sin(Math.PI * cl((za - 3.2) / .6)) : 0; return stay3([XC15, GC15 - 50 * j], 1, { r: 14 * j, mood: j > .1 ? 'shock' : 'cool' }); }
  if (ei !== undefined) { const j = Math.sin(Math.PI * cl((ei - .3) / .7)); return stay3([XC15, GC15 - 30 * j], 1, { r: 8 * j, mood: 'happy' }); }
  if (rh !== undefined && za === undefined) { const k = cl(lt / .8), j = Math.sin(Math.PI * k); return stay3([lerp(XF15, XC15, ease(k)), lerp(GF15, GC15, ease(k)) - 120 * j], 1, { r: -10 * j, mood: 'happy' }); }
  return stay3([XC15, GC15], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.p15Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(balc15(t) + burst15(400, 820, (lt % 2.4), '#5CE1FF', 120) + '<defs><linearGradient id="od15" x1="0" y1="0" x2="0" y2="1"><stop offset=".32" stop-color="#05071A" stop-opacity=".92"/><stop offset=".64" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od15)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.p15Out = (ev, t, lt) => stay3([XC15 + 30 * Math.sin(Math.PI * cl((lt - 1) / 5)), GC15 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['p15Hook', 'p15Licht', 'p15Schall', 'p15Mess', 'p15Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC15); });
