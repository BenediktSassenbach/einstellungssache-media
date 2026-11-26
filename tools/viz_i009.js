// I009 "Woher weiß deine Musik-App, was du hören willst?" (Informatik, Skript 4 mit Abschnitt 9 und Neue Werkzeuge, Kostuem I1 Hacker-Hoodie), stumme Demo v1 (26.11.2026).
// Ort: Bushaltestelle am Winterabend, grosser digitaler Werbebildschirm zeigt eine Musik-App (eigene Gestaltung, kein Logo).
// Teil 1: Bildschirm (Aktionen fliessen ins Geschmacksprofil). Teil 2: Wissenschaftsmodus (Hoerer und Songs als Netz). Teil 3: Bildschirm-Playlist (Redaktion, Prioritaet mit Muenze, Chance ohne Garantie).
// Nutzt fuse33, lab33, lab33dots (viz_v33.js), slot, stay3. Zum Loeschen: diese Datei und videos/I009.
var AC9I = '#7C5CFF', ST9I = '#0B1020', XS9I = 280, GY9I = 1537, SX9I = 440, SY9I = 690, SW9I = 500, SH9I = 440;
const mv9i = (a, b, k) => lerp(a, b, ease(cl(k)));
const tx9i = (x, y, s, size, col, anchor) => '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" font-size="' + size + '" font-weight="900" fill="' + (col || '#fff') + '" font-family="Inter Display, Inter, Arial, sans-serif">' + s + '</text>';
const ART9I = ['#FF6B8A', '#5CE1FF', '#FFD23F', '#8AE65C', '#B98CFF'];

// ---------- Ort ----------
function stop9i(t, nb) { let s = '<defs><linearGradient id="sk9i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1438"/><stop offset="1" stop-color="#2E3A6E"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk9i)"/>';
  [[0, 860, 220], [200, 800, 180], [560, 840, 200], [780, 780, 300]].forEach(([x, y, w], i) => { s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + (1300 - y) + '" fill="#1A2248"/>'; for (let r = 0; r < 6; r++) for (let c = 0; c < Math.floor(w / 50); c++) if (rnd(i * 50 + r * 9 + c) > .5) s += '<rect x="' + (x + 14 + c * 50) + '" y="' + (y + 20 + r * 70) + '" width="22" height="30" fill="#FFD98A" opacity=".6"/>'; });
  s += '<rect x="0" y="1290" width="1080" height="70" fill="#3A3F52"/><path d="M0 1325 H1080" stroke="#F4F8FF" stroke-width="6" stroke-dasharray="50 40" opacity=".5"/><rect x="0" y="1360" width="1080" height="560" fill="#8A90A4"/><rect x="0" y="1360" width="1080" height="14" fill="#C9CDD8"/>';
  for (let i = 0; i < 8; i++) s += '<path d="M' + (i * 150) + ' 1374 L' + (i * 150 - 80) + ' 1920" stroke="#7A8094" stroke-width="4"/>';
  // Wartehaeuschen links (schmal) mit Dach
  s += '<rect x="20" y="1000" width="160" height="10" fill="#C9CFDB"/><rect x="24" y="1010" width="8" height="360" fill="#C9CFDB"/><rect x="168" y="1010" width="8" height="360" fill="#C9CFDB"/><rect x="32" y="1020" width="136" height="300" fill="#9FC8E6" opacity=".25"/><rect x="40" y="1250" width="120" height="16" fill="#5A3A26"/>';
  for (let i = 0; i < 26; i++) { const c = (t * (.08 + .05 * rnd(i + 900)) + rnd(i + 901)) % 1; s += '<circle cx="' + (rnd(i + 902) * 1080 + 20 * Math.sin(t + i)).toFixed(0) + '" cy="' + (40 + 1560 * c).toFixed(0) + '" r="' + (3 + 3 * rnd(i + 903)).toFixed(1) + '" fill="#fff" opacity=".8"/>'; }
  // Bildschirm auf zwei Pfosten
  if (nb) return s;
  s += '<rect x="' + (SX9I + 80) + '" y="' + (SY9I + SH9I) + '" width="20" height="' + (1372 - SY9I - SH9I) + '" fill="#2A2340"/><rect x="' + (SX9I + SW9I - 100) + '" y="' + (SY9I + SH9I) + '" width="20" height="' + (1372 - SY9I - SH9I) + '" fill="#2A2340"/>';
  s += '<rect x="' + (SX9I - 16) + '" y="' + (SY9I - 16) + '" width="' + (SW9I + 32) + '" height="' + (SH9I + 32) + '" rx="18" fill="#2A2340"/><rect x="' + SX9I + '" y="' + SY9I + '" width="' + SW9I + '" height="' + SH9I + '" rx="8" fill="#121226"/>';
  return s; }
// Song-Karte auf dem Bildschirm (Mitte x, y), Farbe c, Breite w
function card9i(x, y, c, w, op) { return '<g opacity="' + (op === undefined ? 1 : op).toFixed(2) + '"><rect x="' + (x - w / 2) + '" y="' + (y - 50) + '" width="' + w + '" height="100" rx="14" fill="#23234A"/><rect x="' + (x - w / 2 + 12) + '" y="' + (y - 38) + '" width="76" height="76" rx="10" fill="' + c + '"/><circle cx="' + (x - w / 2 + 50) + '" cy="' + y + '" r="16" fill="#121226" opacity=".5"/><rect x="' + (x - w / 2 + 104) + '" y="' + (y - 22) + '" width="' + (w * .45) + '" height="14" rx="7" fill="#F4F6FB" opacity=".85"/><rect x="' + (x - w / 2 + 104) + '" y="' + (y + 6) + '" width="' + (w * .3) + '" height="12" rx="6" fill="#8A8FA8"/></g>'; }
function controls9i(t, flash) { const y = SY9I + SH9I - 46, cx = SX9I + SW9I / 2; let s = '<path d="M' + (cx - 110) + ' ' + (y - 16) + ' v32 l-24 -16 Z M' + (cx - 134) + ' ' + (y - 16) + ' v32" fill="#F4F6FB" stroke="#F4F6FB" stroke-width="4"/>';
  s += '<circle cx="' + cx + '" cy="' + y + '" r="28" fill="' + AC9I + '"/><path d="M' + (cx - 8) + ' ' + (y - 13) + ' l20 13 l-20 13 Z" fill="#fff"/>';
  s += '<g transform="translate(' + (cx + 120) + ' ' + y + ')"><path d="M-12 -16 v32 l24 -16 Z M12 -16 v32" fill="#F4F6FB" stroke="#F4F6FB" stroke-width="4"/>' + (flash > 0 ? '<circle r="' + (30 + 30 * flash).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="5" opacity="' + (1 - flash).toFixed(2) + '"/>' : '') + '</g>';
  return s; }
// Datenpunkt fliegt vom Bildschirm zur Wolke oben rechts
function packet9i(k) { if (k <= 0 || k >= 1) return ''; const x = lerp(SX9I + 10, 200, k), y = lerp(SY9I + 200, 850, k) - 90 * Math.sin(Math.PI * k); return '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="14" fill="#FFE14D"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="28" fill="#FFE14D" opacity=".3"/>'; }
const cloud9i = (k) => k <= .01 ? '' : '<g opacity="' + cl(k).toFixed(2) + '" transform="translate(190 860)"><rect x="-80" y="-62" width="160" height="124" rx="18" fill="#121226" stroke="' + AC9I + '" stroke-width="5"/><circle cx="0" cy="-22" r="16" fill="#F4F6FB"/><path d="M-26 12 q26 -30 52 0" fill="#F4F6FB"/>' + tx9i(0, 48, 'Profil', 26, '#F4F6FB') + '</g>';

// ---------- Einstieg ----------
WORLD.i9Hook = function (sc, ev, t, lt) { const sk = ev.skip, fr = ev.frage, lo = ev.loop; let s = stop9i(t);
  let scr = tx9i(SX9I + 24, SY9I + 50, 'Jetzt läuft', 30, '#F4F6FB', 'start');
  const k1 = cl((lt - .8) / .5), k2 = fr === undefined ? 0 : cl((fr - .6) / .5);
  scr += card9i(SX9I + SW9I / 2 - 500 * ease(k1), SY9I + 170, ART9I[0], 440, 1 - k1) + card9i(SX9I + SW9I / 2 + 500 * (1 - ease(k1)) - 500 * ease(k2), SY9I + 170, ART9I[1], 440, k1 * (1 - k2)) + card9i(SX9I + SW9I / 2 + 500 * (1 - ease(k2)), SY9I + 170, ART9I[2], 440, k2);
  scr += controls9i(t, lt > .7 && lt < 1.3 ? (lt - .7) / .6 : (fr !== undefined && fr > .5 && fr < 1.1 ? (fr - .5) / .6 : 0));
  s += scr + packet9i((lt - .9) / 1.2) + (fr !== undefined ? packet9i((fr - .7) / 1.2) : '') + cloud9i(cl((lt - .8) / .4));
  return W(s + shade3()); };
WMASC.i9Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop; const tap = Math.sin(Math.PI * cl((lt - .4) / .5)) + (fr !== undefined ? Math.sin(Math.PI * cl((fr - .2) / .5)) : 0);
  if (lo !== undefined) { const j = Math.sin(Math.PI * cl(lo / .6)); return stay3([XS9I, GY9I - 16 * j], 1, { flip: 1, r: 4 * j, mood: 'happy' }); }
  return stay3([XS9I + 20 * tap, GY9I], 1, { flip: 1, r: 14 * tap, mood: lt > 1 ? 'shock' : 'happy' }); };

// ---------- Teil 1: Dein Geschmack (Bildschirm) ----------
function icon9i(i, x, y) { const c = '#F4F6FB'; if (i === 0) return '<circle cx="' + (x - 4) + '" cy="' + (y - 4) + '" r="14" fill="none" stroke="' + c + '" stroke-width="5"/><path d="M' + (x + 6) + ' ' + (y + 6) + ' l12 12" stroke="' + c + '" stroke-width="6" stroke-linecap="round"/>';
  if (i === 1) return '<path d="M' + (x - 10) + ' ' + (y - 16) + ' l26 16 l-26 16 Z" fill="' + c + '"/>'; if (i === 2) return '<path d="M' + (x - 16) + ' ' + (y - 14) + ' l18 14 l-18 14 Z M' + (x + 4) + ' ' + (y - 14) + ' v28" fill="' + c + '" stroke="' + c + '" stroke-width="4"/>';
  return '<path d="M' + x + ' ' + (y + 16) + ' C' + (x - 26) + ' ' + y + ' ' + (x - 16) + ' ' + (y - 20) + ' ' + x + ' ' + (y - 8) + ' C' + (x + 16) + ' ' + (y - 20) + ' ' + (x + 26) + ' ' + y + ' ' + x + ' ' + (y + 16) + ' Z" fill="#FF6B8A"/>'; }
WORLD.i9Profil = function (sc, ev, t, lt) { const me = ev.merk, pr = ev.profil, mh = ev.mehr; let s = stop9i(t); const cx = SX9I + SW9I / 2;
  let scr = tx9i(SX9I + 24, SY9I + 50, mh !== undefined ? 'Als Nächstes' : 'Dein Profil', 30, '#F4F6FB', 'start');
  if (mh === undefined) { [0, 1, 2, 3].forEach(i => { const k = me === undefined ? 0 : cl((me - .3 - i * .5) / .3), x = SX9I + 80 + i * 115, y = SY9I + 120; if (k > 0) { scr += '<g opacity="' + k.toFixed(2) + '"><circle cx="' + x + '" cy="' + y + '" r="40" fill="#23234A"/>' + icon9i(i, x, y) + '</g>'; const f = me === undefined ? 0 : ((me - .6 - i * .5) * .8) % 1; if (me > .6 + i * .5) { const q = cl(f); scr += '<circle cx="' + lerp(x, cx, q).toFixed(0) + '" cy="' + lerp(y + 40, SY9I + 290, q).toFixed(0) + '" r="9" fill="#FFE14D" opacity="' + (1 - q * .3).toFixed(2) + '"/>'; } } });
    const g = pr === undefined ? .3 * cl((me || 0) / 3) : .3 + .7 * ease(cl(pr / 1.5)); [['Pop', -90, 0, '#FF6B8A', 1], ['Rock', 40, -20, '#5CE1FF', .7], ['Rap', 90, 50, '#FFD23F', .5]].forEach(([n, dx, dy, c, w]) => { const r = 26 + 44 * g * w; scr += '<circle cx="' + (cx + dx) + '" cy="' + (SY9I + 245 + dy) + '" r="' + r.toFixed(0) + '" fill="' + c + '" opacity=".8"/>' + (r > 46 ? tx9i(cx + dx, SY9I + 254 + dy, n, 24, ST9I) : ''); }); }
  else { [0, 1, 2].forEach(i => { const k = cl((mh - .3 - i * .35) / .4); scr += card9i(cx, SY9I + 112 + i * 98, ART9I[0], 440, k * (i === 0 ? 1 : .8)); }); }
  s += scr + controls9i(t, 0);
  return W(s + shade3(), slot(ev, [['merk', 'Suchen, hören, skippen, speichern'], ['profil', 'Geschmacksprofil', 'hot'], ['mehr', 'Womöglich mehr davon']])); };
WMASC.i9Profil = (ev, t, lt) => { const me = ev.merk; if (me !== undefined && me < 2.4) { const tap = Math.sin(Math.PI * ((me * 1.25) % 1)); return stay3([XS9I + 16 * tap, GY9I], 1, { flip: 1, r: 12 * tap, mood: 'happy' }); } return stay3([XS9I, GY9I], 1, { flip: 1, r: 3 * Math.sin(t * 2), mood: ev.profil !== undefined ? 'cool' : 'happy' }); };

// ---------- Teil 2: Die anderen (Wissenschaftsmodus) ----------
function net9i(t, ev) { const vi = ev.viele, ae = ev.aehnlich, inf = ev.info; let s = '';
  const U = [[250, 760], [250, 880], [250, 1000], [250, 1120]], Sg = [[700, 740], [700, 860], [700, 980], [700, 1100]], youI = 1;
  const E = [[0, 0], [0, 1], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [3, 3], [0, 2]];
  E.forEach(([u, g], i) => { const lit = vi !== undefined && g === 2 ? cl((vi - .3 - i * .1) / .3) : 0; s += '<path d="M' + U[u][0] + ' ' + U[u][1] + ' L' + Sg[g][0] + ' ' + Sg[g][1] + '" stroke="' + (lit > .5 ? '#FFE14D' : '#5A5F80') + '" stroke-width="' + (3 + 4 * lit).toFixed(0) + '" opacity=".9"/>'; });
  U.forEach(([x, y], i) => { s += '<circle cx="' + x + '" cy="' + y + '" r="34" fill="' + (i === youI ? AC9I : '#3A3F60') + '" stroke="#F4F6FB" stroke-width="4"/><circle cx="' + x + '" cy="' + (y - 8) + '" r="10" fill="#F4F6FB"/><path d="M' + (x - 16) + ' ' + (y + 20) + ' q16 -22 32 0" fill="#F4F6FB"/>'; });
  s += tx9i(U[youI][0] - 70, U[youI][1] + 10, 'Du', 30, '#F4F6FB');
  Sg.forEach(([x, y], i) => { s += '<rect x="' + (x - 34) + '" y="' + (y - 34) + '" width="68" height="68" rx="10" fill="' + ART9I[i] + '" stroke="#F4F6FB" stroke-width="4"/>'; });
  if (ae !== undefined) { const k = cl((ae - .5) / 1.2); s += '<circle cx="' + U[0][0] + '" cy="' + U[0][1] + '" r="44" fill="none" stroke="#3DFF7A" stroke-width="6"/><path d="M' + Sg[2][0] + ' ' + Sg[2][1] + ' Q' + 470 + ' ' + 980 + ' ' + lerp(Sg[2][0], U[youI][0] + 40, k).toFixed(0) + ' ' + lerp(Sg[2][1], U[youI][1], k).toFixed(0) + '" fill="none" stroke="#3DFF7A" stroke-width="7" stroke-dasharray="14 8"/>'; }
  if (inf !== undefined) { const k = back(cl(inf / .5)); s += '<g transform="translate(' + (Sg[2][0] + 52) + ' ' + Sg[2][1] + ') scale(' + k.toFixed(3) + ')"><rect x="0" y="-56" width="140" height="50" rx="14" fill="#FF6B8A"/>' + tx9i(70, -21, 'Pop', 30, ST9I) + '<rect x="0" y="6" width="140" height="50" rx="14" fill="#F4F6FB"/>' + tx9i(70, 41, '2026', 30, ST9I) + '</g>'; }
  return s; }
function crowd9i(t) { let s = tx9i(SX9I + 24, SY9I + 50, 'Hörer', 30, '#F4F6FB', 'start'); for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) { const x = SX9I + 70 + c * 90, y = SY9I + 140 + r * 100, b = 3 * Math.sin(t * 3 + r + c); s += '<circle cx="' + x + '" cy="' + (y - 10 + b).toFixed(0) + '" r="16" fill="' + ART9I[(r + c) % 5] + '"/><path d="M' + (x - 24) + ' ' + (y + 30) + ' q24 -32 48 0" fill="' + ART9I[(r + c) % 5] + '"/>'; } return s; }
WORLD.i9Andere = function (sc, ev, t, lt) { const bg = fuse33(stop9i(t) + crowd9i(t), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '"><rect x="160" y="680" width="800" height="500" rx="30" fill="#05071A" opacity=".55"/>' + lab33dots() + net9i(t, ev) + '</g>' + shade3(), slot(ev, [['viele', 'Viele andere'], ['aehnlich', 'Ähnlicher Geschmack', 'hot'], ['info', 'Genre, Datum']])); };
WMASC.i9Andere = (ev, t, lt) => { const ae = ev.aehnlich; if (ae !== undefined) { const j = Math.sin(Math.PI * cl((ae - .4) / .6)); return stay3([XS9I - 40, GY9I - 22 * j], 1, { r: -8 * j, mood: 'shock' }); } return stay3([mv9i(XS9I, XS9I - 40, lt / .5), GY9I], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 3: Wer mitredet (Bildschirm-Playlist) ----------
WORLD.i9Mit = function (sc, ev, t, lt) { const re = ev.redaktion, la = ev.label, eh = ev.eher; let s = stop9i(t); const cx = SX9I + SW9I / 2;
  let scr = tx9i(SX9I + 24, SY9I + 50, 'Playlist', 30, '#F4F6FB', 'start');
  if (re !== undefined) { const k = back(cl(re / .5)); scr += '<g transform="translate(' + (SX9I + SW9I - 70) + ' ' + (SY9I + 40) + ') scale(' + k.toFixed(3) + ')"><circle r="30" fill="#3DFF7A"/><circle cy="-7" r="9" fill="' + ST9I + '"/><path d="M-15 16 q15 -20 30 0" fill="' + ST9I + '"/></g>'; }
  [0, 1, 2].forEach(i => { scr += card9i(cx, SY9I + 120 + i * 105, ART9I[i + 1], 440, 1); });
  if (la !== undefined) { const k = cl(la / .5), y = SY9I + 225; scr += '<rect x="' + (cx - 224) + '" y="' + (y - 54) + '" width="448" height="108" rx="16" fill="none" stroke="#FFE14D" stroke-width="6" opacity="' + k.toFixed(2) + '"/><g opacity="' + k.toFixed(2) + '"><path d="M' + (cx + 176) + ' ' + (y - 30) + ' v40 M' + (cx + 176) + ' ' + (y - 30) + ' h26 l-8 10 l8 10 h-26" stroke="#FFE14D" stroke-width="5" fill="#FFE14D"/></g>';
    const pk = cl((la - 1.4) / .5); if (pk > 0) s += '<g opacity="' + pk.toFixed(2) + '"><rect x="690" y="606" width="240" height="58" rx="16" fill="#121226" stroke="#FFD23F" stroke-width="4"/>' + tx9i(810, 646, 'Provision', 30, '#FFD23F') + '</g>';
    for (let n = 0; n < 2; n++) { const f = cl((la - 1.2 - n * 1.4) / 1.1); if (f > 0 && f < 1) { const x = lerp(cx + 150, 810, ease(f)), yy = lerp(y, 640, ease(f)) - 60 * Math.sin(Math.PI * f); s += '<g transform="translate(' + x.toFixed(0) + ' ' + yy.toFixed(0) + ')"><circle r="34" fill="#FFD23F" stroke="#B88A20" stroke-width="5"/><circle r="22" fill="none" stroke="#B88A20" stroke-width="3"/></g>'; } } }
  if (eh !== undefined) { const v = .35 + .55 * ease(cl(eh / 1.5)) + .03 * Math.sin(t * 4), y = SY9I + 225; scr += '<rect x="' + (cx - 120) + '" y="' + (y + 10) + '' + '" width="260" height="18" rx="9" fill="#2A2A4A"/><rect x="' + (cx - 120) + '" y="' + (y + 10) + '" width="' + (260 * v).toFixed(0) + '" height="18" rx="9" fill="#FFE14D"/>'; }
  s += scr + controls9i(t, 0);
  return W(s + shade3(), slot(ev, [['redaktion', 'Redaktion'], ['label', 'Discovery Mode', 'hot'], ['eher', 'Keine Garantie']])); };
WMASC.i9Mit = (ev, t, lt) => { const la = ev.label; if (la !== undefined) { const p = Math.sin(Math.PI * cl((la - 1) / 1)); return stay3([XS9I, GY9I - 12 * p], 1, { flip: 1, r: -10 * p, mood: 'shock' }); } return stay3([mv9i(XS9I - 40, XS9I, lt / .5), GY9I], 1, { flip: 1, r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.i9Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(stop9i(t, 1) + '<defs><linearGradient id="od9i" x1="0" y1="0" x2="0" y2="1"><stop offset=".25" stop-color="#05071A" stop-opacity=".7"/><stop offset=".62" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od9i)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.i9Out = (ev, t, lt) => stay3([XS9I + 30 * Math.sin(Math.PI * cl((lt - 1) / 5)), GY9I - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { flip: 1, r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['i9Hook', 'i9Profil', 'i9Andere', 'i9Mit', 'i9Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC9I); });
