// C008 "Was brennt bei einer Kerze eigentlich?" (Chemie, Skript 4 mit Abschnitt 9 und Neue Werkzeuge, Kostuem C1 Laborkittel), stumme Demo v1 (26.11.2026).
// Ort: Kerzenstand auf dem Weihnachtsmarkt am Abend. Grosse Stumpenkerze auf der Theke, Schalti steht rechts auf der Theke.
// Einstieg: Streichholz am Wachsstueck, es schmilzt nur. Teil 1: die eine Lupe (Wachssee, Docht zieht Wachs hoch, Docht allein glimmt).
// Teil 2: Wissenschaftsmodus (Flamme im Schnitt: Dampf innen, Sauerstoff aussen, gluehender Russ). Teil 3: Ausblasen, weisser Rauch, Flamme laeuft zurueck.
// Nutzt lupeH (viz_hook.js), fuse33, lab33, lab33dots (viz_v33.js), slot, stay3. Zum Loeschen: diese Datei und videos/C008.
var AC8 = '#FF6BD6', ST8 = '#0B1020', XC8 = 800, GC8 = 1140, XF8 = 270, GF8 = 1537, KX8 = 500, KT8 = 860;
const mv8 = (a, b, k) => lerp(a, b, ease(cl(k)));

// ---------- Ort: Kerzenstand ----------
function stall8(t, o) { o = o || {}; let s = '<defs><linearGradient id="sk8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1438"/><stop offset="1" stop-color="#3A2A5E"/></linearGradient><radialGradient id="fl8"><stop offset="0" stop-color="#FFF6C8"/><stop offset=".5" stop-color="#FFC24A" stop-opacity=".7"/><stop offset="1" stop-color="#FF8A3D" stop-opacity="0"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#sk8)"/>';
  for (let i = 0; i < 30; i++) s += '<circle cx="' + (rnd(i + 600) * 1080).toFixed(0) + '" cy="' + (40 + rnd(i + 601) * 560).toFixed(0) + '" r="' + (1.5 + 2 * rnd(i + 602)).toFixed(1) + '" fill="#fff" opacity="' + (.3 + .3 * Math.sin(t + i)).toFixed(2) + '"/>';
  // Lichterkette zwischen zwei Masten
  s += '<path d="M0 640 Q540 720 1080 640" fill="none" stroke="#2A2A3A" stroke-width="3"/>'; for (let i = 0; i < 18; i++) { const x = 30 + i * 60, y = 640 + 80 * (1 - Math.pow((x - 540) / 540, 2)) * .5 + 6; s += '<circle cx="' + x + '" cy="' + y.toFixed(0) + '" r="7" fill="' + ['#FFD23F', '#FF6B8A', '#5CE1FF'][i % 3] + '" opacity="' + (.7 + .3 * Math.sin(t * 3 + i)).toFixed(2) + '"/>'; }
  // Dach der Bude mit Markise
  s += '<path d="M40 760 L540 700 L1040 760 Z" fill="#6B3A2A" stroke="' + ST8 + '" stroke-width="5"/>'; for (let i = 0; i < 12; i++) s += '<path d="M' + (60 + i * 80) + ' 760 h80 v40 q-40 22 -80 0 Z" fill="' + (i % 2 ? '#C62F3F' : '#F4F6FB') + '" stroke="' + ST8 + '" stroke-width="3"/>';
  // Rueckwand mit Regalen voller Kerzen
  s += '<rect x="70" y="800" width="940" height="330" fill="#8A5A3A" stroke="' + ST8 + '" stroke-width="5"/>';
  [900, 1030].forEach((y, r) => { s += '<rect x="80" y="' + y + '" width="920" height="14" fill="#5A3A26"/>'; for (let i = 0; i < 12; i++) { const x = 110 + i * 76; if (x > 380 && x < 640) continue; const h = 40 + 30 * rnd(i + r * 20); s += '<rect x="' + (x - 14) + '" y="' + (y - h) + '" width="28" height="' + h.toFixed(0) + '" rx="5" fill="' + ['#F4E3C8', '#E8B44C', '#C62F3F', '#7FA8E6'][i % 4] + '" stroke="' + ST8 + '" stroke-width="3"/>'; } });
  // Theke
  s += '<rect x="40" y="1128" width="1000" height="34" fill="#C9A27A" stroke="' + ST8 + '" stroke-width="5"/><rect x="60" y="1162" width="960" height="400" fill="#7A4A30" stroke="' + ST8 + '" stroke-width="5"/>';
  s += '<path d="M60 1180 Q300 1230 540 1180 T1020 1180" fill="none" stroke="#2F6B3A" stroke-width="22"/>'; for (let i = 0; i < 12; i++) s += '<circle cx="' + (90 + i * 80) + '" cy="' + (1192 + 16 * Math.sin(i)) + '" r="8" fill="' + ['#FFD23F', '#FF6B8A'][i % 2] + '"/>';
  s += '<defs><linearGradient id="fg8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6E7A94"/><stop offset="1" stop-color="#2E3550"/></linearGradient></defs><rect x="0" y="1562" width="1080" height="360" fill="url(#fg8)"/>'; /* Schnee im Schatten, keine helle Kante */
  for (let i = 0; i < 20; i++) { const c = (t * (.08 + .04 * rnd(i + 620)) + rnd(i + 621)) % 1; s += '<circle cx="' + (rnd(i + 622) * 1080 + 20 * Math.sin(t + i)).toFixed(0) + '" cy="' + (60 + 1500 * c).toFixed(0) + '" r="' + (3 + 3 * rnd(i + 623)).toFixed(1) + '" fill="#fff" opacity=".7"/>'; }
  // Streichholzschachtel auf der Theke
  s += '<rect x="610" y="1104" width="70" height="26" rx="4" fill="#E8384F" stroke="' + ST8 + '" stroke-width="4"/><rect x="616" y="1110" width="58" height="8" fill="#5A3A26"/>';
  return s; }
// Grosse Kerze. on: Flamme 0..1, pool: Wachssee 0..1, smoke: Rauch 0..1
function candle8(t, o) { o = o || {}; const on = cl(o.on === undefined ? 1 : o.on), pool = cl(o.pool === undefined ? .6 : o.pool); let s = '';
  s += '<ellipse cx="' + KX8 + '" cy="1128" rx="110" ry="14" fill="#C9CFDB" stroke="' + ST8 + '" stroke-width="4"/>';
  s += '<path d="M' + (KX8 - 80) + ' ' + KT8 + ' V1120 Q' + KX8 + ' 1134 ' + (KX8 + 80) + ' 1120 V' + KT8 + ' Z" fill="#F4E3C8" stroke="' + ST8 + '" stroke-width="5"/>';
  s += '<path d="M' + (KX8 - 80) + ' ' + KT8 + ' q16 30 6 60 M' + (KX8 + 60) + ' ' + KT8 + ' q10 40 -2 80" stroke="#E8D3B0" stroke-width="8" fill="none" stroke-linecap="round"/>';
  s += '<ellipse cx="' + KX8 + '" cy="' + KT8 + '" rx="80" ry="16" fill="#F7EBD6" stroke="' + ST8 + '" stroke-width="4"/>';
  if (pool > .02) s += '<ellipse cx="' + KX8 + '" cy="' + (KT8 + 2) + '" rx="' + (24 + 40 * pool).toFixed(0) + '" ry="' + (5 + 7 * pool).toFixed(0) + '" fill="#E8C990" opacity=".95"/><ellipse cx="' + (KX8 - 10) + '" cy="' + KT8 + '" rx="' + (10 + 14 * pool).toFixed(0) + '" ry="3" fill="#FFF6E0"/>';
  s += '<path d="M' + KX8 + ' ' + KT8 + ' q4 -18 -2 -34" stroke="#2A2020" stroke-width="5" fill="none" stroke-linecap="round"/>';
  if (on > .02) { const f = 1 + .06 * Math.sin(t * 13) + .04 * Math.sin(t * 7.7), h = 90 * f * on; s += '<circle cx="' + KX8 + '" cy="' + (KT8 - 60) + '" r="' + (90 * on).toFixed(0) + '" fill="url(#fl8)" opacity=".6"/>';
    s += '<path d="M' + KX8 + ' ' + (KT8 - 20 - h).toFixed(0) + ' Q' + (KX8 + 26 * on).toFixed(0) + ' ' + (KT8 - 40).toFixed(0) + ' ' + KX8 + ' ' + (KT8 - 14) + ' Q' + (KX8 - 26 * on).toFixed(0) + ' ' + (KT8 - 40) + ' ' + KX8 + ' ' + (KT8 - 20 - h).toFixed(0) + ' Z" fill="#FFC24A" stroke="#FFE9A0" stroke-width="3"/><ellipse cx="' + KX8 + '" cy="' + (KT8 - 34) + '" rx="' + (7 * on).toFixed(1) + '" ry="' + (14 * on).toFixed(1) + '" fill="#5C8BFF" opacity=".8"/>'; }
  if (o.smoke > .02) for (let i = 0; i < 12; i++) { const c = (t * .4 + i / 12) % 1, y = KT8 - 40 - 170 * c, x = KX8 + 24 * Math.sin(c * 7 + t) * c; /* Rauch bleibt unter dem Dach */ s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (14 + 40 * c).toFixed(0) + '" fill="#F4F6FB" opacity="' + (o.smoke * .85 * (1 - c * .8)).toFixed(2) + '"/>'; }
  return s; }
// Streichholz mit Flamme (Spitze bei x, y), Neigung a
function match8(x, y, a, on) { return '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + a.toFixed(0) + ')"><rect x="-5" y="0" width="10" height="120" rx="3" fill="#E8C990" stroke="' + ST8 + '" stroke-width="3"/><circle cy="0" r="9" fill="#C62F3F" stroke="' + ST8 + '" stroke-width="3"/>' + (on ? '<path d="M0 -50 Q16 -20 0 -6 Q-16 -20 0 -50 Z" fill="#FFC24A" stroke="#FFE9A0" stroke-width="3"/>' : '') + '</g>'; }

// ---------- Einstieg: Wachsstueck schmilzt nur ----------
function longm8(hx, hy, a) { const L = 252; return '<g transform="translate(' + hx + ' ' + hy + ') rotate(' + a.toFixed(1) + ')"><rect x="-6" y="' + (-L) + '" width="12" height="' + L + '" rx="4" fill="#E8C990" stroke="' + ST8 + '" stroke-width="3"/><circle cy="' + (-L) + '" r="11" fill="#C62F3F" stroke="' + ST8 + '" stroke-width="3"/><path d="M0 ' + (-L - 50) + ' Q16 ' + (-L - 20) + ' 0 ' + (-L - 6) + ' Q-16 ' + (-L - 20) + ' 0 ' + (-L - 50) + ' Z" fill="#FFC24A" stroke="#FFE9A0" stroke-width="3"/></g>'; }
WORLD.c8Hook = function (sc, ev, t, lt) { const lo = ev.loop; let s = stall8(t) + candle8(t, { on: 1 });
  const k = cl(lt / 3.5); s += '<g transform="translate(640 1128)"><path d="M-46 0 V-' + (60 - 16 * k).toFixed(0) + ' Q0 -' + (70 - 18 * k).toFixed(0) + ' 46 -' + (60 - 16 * k).toFixed(0) + ' V0 Z" fill="#F4E3C8" stroke="' + ST8 + '" stroke-width="4"/>';
  for (let i = 0; i < 3; i++) { const c = (t * .8 + i / 3) % 1; s += '<path d="M' + (-20 + i * 20) + ' -' + (54 - 16 * k).toFixed(0) + ' v' + (20 + 40 * c * k).toFixed(0) + '" stroke="#E8D3B0" stroke-width="8" stroke-linecap="round" opacity="' + (k * (1 - c)).toFixed(2) + '"/>'; }
  s += '</g>'; if (lo === undefined) s += match8(648, 1062, 205, 1); /* Schalti haelt das Streichholz von rechts oben an das Wachsstueck */
  return W(s + shade3()); };
WMASC.c8Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop; if (lo !== undefined) { const j = Math.sin(Math.PI * cl(lo / .7)); return stay3([XC8 + 40, GC8 - 20 * j], 1, { r: 6 * j, mood: 'happy' }); }
  if (fr !== undefined) { const sh = Math.sin(Math.PI * cl(fr / 1)); return stay3([XC8 + 40, GC8], 1, { r: -10 * sh, mood: 'shock' }); } return stay3([XC8 + 40, GC8], 1, { r: -8, mood: 'shock' }); };

// ---------- Teil 1: Erst fluessig (die eine Lupe) ----------
function lens8(t, o) { const pool = cl(o.pool), up = cl(o.up), dry = cl(o.dry); let s = '<rect x="-320" y="-320" width="640" height="640" fill="#1E1630"/>';
  s += '<rect x="-320" y="60" width="640" height="260" fill="#F4E3C8"/><path d="M-320 60 Q0 ' + (60 + 50 * pool) + ' 320 60" fill="#E8C990" opacity="' + (.3 + .7 * pool).toFixed(2) + '"/>';
  s += '<rect x="-24" y="-260" width="48" height="' + (dry > .5 ? 300 : 360) + '" rx="10" fill="' + (dry > .5 ? '#3A2A20' : '#E8E0D0') + '" stroke="' + ST8 + '" stroke-width="5"/>';
  for (let i = -3; i <= 3; i++) s += '<path d="M-24 ' + (-220 + i * 50) + ' l48 18" stroke="' + ST8 + '" stroke-width="2" opacity=".4"/>';
  if (up > 0 && dry < .5) for (let i = 0; i < 7; i++) { const c = (t * .7 + i / 7) % 1; s += '<circle cx="' + (-8 + 16 * (i % 2)) + '" cy="' + (80 - 320 * c).toFixed(0) + '" r="9" fill="#E8C990" stroke="#B88A50" stroke-width="2" opacity="' + (up * (1 - c * .4)).toFixed(2) + '"/>'; }
  if (up > 0 && dry < .5) s += '<path d="M60 40 v-180 M60 -140 l-14 22 M60 -140 l14 22" stroke="#FFE14D" stroke-width="7" stroke-linecap="round" opacity="' + up.toFixed(2) + '"/>';
  if (dry > .5) s += '<circle cx="0" cy="-262" r="' + (18 + 4 * Math.sin(t * 6)).toFixed(0) + '" fill="#FF6B2A" opacity=".85"/><circle cx="0" cy="-262" r="40" fill="#FF6B2A" opacity=".25"/>';
  return s; }
WORLD.c8Fluessig = function (sc, ev, t, lt) { const sm = ev.schmilz, sa = ev.saug, al = ev.allein;
  const pool = sm === undefined ? .2 : .2 + .8 * cl(sm / 6); let s = stall8(t) + candle8(t, { on: al === undefined ? 1 : 1 - cl((al - .2) / .4), pool: pool }); /* bei 'Docht allein' ist die Flamme hinten aus */
  const lk = sm === undefined ? 0 : ease(cl((sm - .3) / .5)); if (lk > 0) s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * lk).toFixed(2) + '"/>' + lupeH(270, 860, 165, lens8(t, { pool: pool, up: sa === undefined ? 0 : cl(sa / .8), dry: al === undefined ? 0 : cl((al - .3) / .4) }), lk, KX8 - 20, KT8 + 10);
  return W(s + shade3(), slot(ev, [['schmilz', 'Wachs schmilzt'], ['saug', 'Docht zieht hoch', 'hot'], ['allein', 'Docht allein glimmt']])); };
WMASC.c8Fluessig = (ev, t, lt) => { const al = ev.allein; if (al !== undefined) { const p = Math.sin(Math.PI * cl((al - .3) / 1)); return stay3([XC8, GC8 - 10 * p], 1, { r: 12 * p, mood: 'cool' }); } return stay3([mv8(XC8 + 40, XC8, lt / .5), GC8], 1, { r: 3 * Math.sin(t * 2), mood: ev.saug !== undefined ? 'shock' : 'happy' }); };

// ---------- Teil 2: Dann Gas (Wissenschaftsmodus) ----------
function sciC8(t, ev) { const da = ev.dampf, br = ev.brennt, ga = ev.gas; let s = ''; const cx = 560, by = 1100;
  s += '<path d="M' + cx + ' ' + (by - 440) + ' Q' + (cx + 170) + ' ' + (by - 200) + ' ' + cx + ' ' + (by - 40) + ' Q' + (cx - 170) + ' ' + (by - 200) + ' ' + cx + ' ' + (by - 440) + ' Z" fill="#FFC24A" fill-opacity=".25" stroke="#FFE9A0" stroke-width="5"/>';
  s += '<path d="M' + cx + ' ' + (by - 260) + ' Q' + (cx + 70) + ' ' + (by - 150) + ' ' + cx + ' ' + (by - 60) + ' Q' + (cx - 70) + ' ' + (by - 150) + ' ' + cx + ' ' + (by - 260) + ' Z" fill="#1E2A50" stroke="#7FA8E6" stroke-width="4" stroke-dasharray="10 6"/>';
  s += '<rect x="' + (cx - 10) + '" y="' + (by - 120) + '" width="20" height="120" rx="6" fill="#2A2020" stroke="#F4F6FB" stroke-width="3"/>';
  if (da !== undefined) for (let i = 0; i < 10; i++) { const c = (t * .6 + i / 10) % 1, x = cx + 40 * Math.sin(i * 2.1) * c, y = by - 110 - 160 * c; s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (8 + 6 * c).toFixed(0) + '" fill="#9FC2FF" opacity="' + ((1 - c) * cl(da / .5)).toFixed(2) + '"/>'; }
  if (br !== undefined) { const k = cl(br / .6); for (let side = -1; side <= 1; side += 2) for (let i = 0; i < 3; i++) { const c = (t * .7 + i / 3) % 1, x = cx + side * (300 - 210 * c), y = by - 200 - 60 * i; s += '<g opacity="' + (k * (1 - c * c)).toFixed(2) + '"><circle cx="' + x.toFixed(0) + '" cy="' + y + '" r="34" fill="#5CE1FF" stroke="' + ST8 + '" stroke-width="3"/><text x="' + x.toFixed(0) + '" y="' + (y + 10) + '" text-anchor="middle" font-size="28" font-weight="900" fill="' + ST8 + '" font-family="Inter Display, Inter, Arial, sans-serif">O₂</text></g>'; }
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + t, r = 120 + 20 * Math.sin(t * 4 + i); s += '<circle cx="' + (cx + Math.cos(a) * r * .55).toFixed(0) + '" cy="' + (by - 220 + Math.sin(a) * r).toFixed(0) + '" r="5" fill="#FFF6C8" opacity="' + (k * (.5 + .5 * Math.sin(t * 9 + i))).toFixed(2) + '"/>'; } }
  if (ga !== undefined) { const k = cl(ga / .8); for (let i = 0; i < 14; i++) { const c = (t * .5 + i / 14) % 1, x = cx + 90 * Math.sin(i * 1.7) * (1 - c * .5), y = by - 260 - 140 * c; s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="12" fill="#FFB020" stroke="#FFF1B8" stroke-width="3" opacity="' + (k * (1 - c)).toFixed(2) + '"/>'; } }
  return s; }
WORLD.c8Gas = function (sc, ev, t, lt) { const bg = fuse33(stall8(t) + candle8(t, { on: 1, pool: 1 }), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '"><rect x="200" y="620" width="720" height="520" rx="30" fill="#05071A" opacity=".55"/>' + lab33dots() + sciC8(t, ev) + '</g>' + shade3(), slot(ev, [['dampf', 'Wachs wird Dampf'], ['brennt', 'Dampf + Sauerstoff', 'hot'], ['gas', 'Flamme = brennendes Gas']])); };
WMASC.c8Gas = (ev, t, lt) => { const rh = ev.rehook, br = ev.brennt; if (br !== undefined) { const j = Math.sin(Math.PI * cl((br - .4) / .6)); return stay3([XF8, GF8 - 24 * j], 1, { r: -8 * j, mood: 'shock' }); }
  if (ev.dampf !== undefined || ev.gas !== undefined) return stay3([XF8, GF8], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  const k = cl(lt / .35); return stay3([lerp(XC8, XF8, ease(k)), lerp(GC8, GF8, k * k)], 1, { r: 10 * Math.sin(Math.PI * k), mood: 'happy' }); };

// ---------- Teil 3: Der Rauch ----------
WORLD.c8Rauch = function (sc, ev, t, lt) { const au = ev.aus, sp = ev.spring, wi = ev.wieder;
  let on = 1, smoke = 0; if (au !== undefined) { on = 1 - cl((au - .5) / .3); smoke = cl((au - .7) / .5); }
  let s = stall8(t); let run = -1;
  if (sp !== undefined) { const r = cl((sp - 1) / 1.2); run = r; if (r >= 1) { on = ease(cl((sp - 2.2) / .3)); smoke = 1 - cl((sp - 2.2) / .5); } }
  if (wi !== undefined) { on = 1; smoke = 0; }
  s += candle8(t, { on: on, pool: 1, smoke: smoke });
  if (au !== undefined && au < 1.2) for (let i = 0; i < 4; i++) { const c = cl((au - i * .08) / .7); s += '<path d="M' + lerp(XC8 - 130, KX8 + 40, c).toFixed(0) + ' ' + (KT8 - 60 - 20 * i) + ' q-30 -10 -60 0" stroke="#EAF4FF" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  if (sp !== undefined && wi === undefined) { const k = cl(sp / .8); s += longm8(655, 962, lerp(0, -24, ease(k))); /* Schalti haelt ein langes Kaminstreichholz in der Hand und kippt es in den Rauch */
    if (run >= 0 && run < 1) { const y = lerp(KT8 - 145, KT8 - 30, run); s += '<circle cx="' + (KX8 + 10 * Math.sin(run * 9)).toFixed(0) + '" cy="' + y.toFixed(0) + '" r="26" fill="#FFC24A" opacity=".8"/><circle cx="' + (KX8 + 10 * Math.sin(run * 9)).toFixed(0) + '" cy="' + y.toFixed(0) + '" r="50" fill="#FFC24A" opacity=".25"/>'; } }
  return W(s + shade3(), slot(ev, [['aus', 'Unverbrannter Wachsdampf'], ['spring', 'Flamme läuft zurück', 'hot'], ['wieder', 'Ohne Docht zu berühren']])); };
WMASC.c8Rauch = (ev, t, lt) => { const rh = ev.rehook, au = ev.aus, wi = ev.wieder;
  if (wi !== undefined) { const j = Math.sin(Math.PI * cl((wi - .4) / .6)); return stay3([XC8, GC8 - 30 * j], 1, { r: 8 * j, mood: 'happy' }); }
  if (au !== undefined && au < 1) { const b = Math.sin(Math.PI * cl(au / .9)); return stay3([XC8 - 30 * b, GC8], 1, { r: -14 * b, mood: 'cool' }); }
  if (rh !== undefined && ev.aus === undefined) { const k = cl(lt / .8), j = Math.sin(Math.PI * k); return stay3([lerp(XF8, XC8, ease(k)), lerp(GF8, GC8, ease(k)) - 120 * j], 1, { r: -10 * j, mood: 'happy' }); }
  return stay3([XC8, GC8], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.c8Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(stall8(t) + candle8(t, { on: 1, pool: 1 }) + '<defs><linearGradient id="od8" x1="0" y1="0" x2="0" y2="1"><stop offset=".25" stop-color="#05071A" stop-opacity=".7"/><stop offset=".62" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od8)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.c8Out = (ev, t, lt) => stay3([XC8 + 30 * Math.sin(Math.PI * cl((lt - 1) / 5)), GC8 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['c8Hook', 'c8Fluessig', 'c8Gas', 'c8Rauch', 'c8Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC8); });
