// I012 "Wie macht KI aus einem Satz ein Bild?" (Informatik, Skript 4 mit Abschnitt 9 und Neue Werkzeuge, Kostuem I3 Retro-Roboter), stumme Demo v1 (27.11.2026).
// Ort eigens gebaut: Schreibtisch am Winterabend, grosser Bildschirm, Drucker fuer Weihnachtskarten, Fenster mit Schnee.
// Einstieg: Bildschirm springt von Rauschen auf ein Rentier mit Muetze. Teil 1: Training am Bildschirm (Bild wird Schritt fuer Schritt verrauscht, dann zurueck).
// Teil 2: Wissenschaftsmodus (Satz wird zu Zahlen, Rauschen wird in Schritten zum Bild, Zahlen lenken). Teil 3: gedruckte Karte mit sechs Fingern, die eine Lupe (kleine, halb verdeckte Haende).
// Rauschen als Pixelraster, Bilder sind einfache Zeichnungen. Nutzt lupeH, fuse33, lab33, lab33dots, slot, stay3, look3. Zum Loeschen: diese Datei und videos/I012.
var AC12 = '#7C5CFF', ST12 = '#0B1020', XC12 = 790, GC12 = 1140, XF12 = 270, GF12 = 1537;
const mv12 = (a, b, k) => lerp(a, b, ease(cl(k)));

// Rauschen: n x n Pixel im Feld (x,y,w), Staerke a 0..1 ueber Bild (img in gleicher Groesse), seed
function noise12(x, y, w, a, t, seed, n) { if (!(a > 0)) return ''; n = n || 14; const c = w / n; let s = '<g opacity="' + cl(a).toFixed(2) + '">';
  for (let i = 0; i < n * n; i++) { const v = Math.floor(255 * rnd(i * 7 + (seed || 0) + Math.floor(t * 8) * 131)); s += '<rect x="' + (x + (i % n) * c).toFixed(1) + '" y="' + (y + Math.floor(i / n) * c).toFixed(1) + '" width="' + (c + .6).toFixed(1) + '" height="' + (c + .6).toFixed(1) + '" fill="rgb(' + v + ',' + v + ',' + Math.min(255, v + 20) + ')"/>'; }
  return s + '</g>'; }
// Rentier mit Muetze im Feld (cx, cy), Groesse z, legs = Anzahl Beine
function deer12(cx, cy, z, legs) { legs = legs || 4; let s = '<g transform="translate(' + cx + ' ' + cy + ') scale(' + z + ')">';
  const L = []; for (let i = 0; i < legs; i++) L.push(-70 + i * 140 / (legs - 1)); L.forEach(x => { s += '<rect x="' + (x - 9) + '" y="20" width="18" height="90" rx="6" fill="#8A5A3A" stroke="' + ST12 + '" stroke-width="4"/>'; });
  s += '<ellipse cx="0" cy="0" rx="100" ry="54" fill="#A8703A" stroke="' + ST12 + '" stroke-width="5"/><path d="M60 -20 Q90 -80 110 -100" stroke="#A8703A" stroke-width="40" stroke-linecap="round"/><ellipse cx="128" cy="-112" rx="42" ry="32" fill="#A8703A" stroke="' + ST12 + '" stroke-width="5"/><circle cx="166" cy="-104" r="12" fill="#E8384F"/><circle cx="130" cy="-122" r="6" fill="' + ST12 + '"/>';
  s += '<path d="M110 -140 l-20 -50 m10 24 l-26 -10 M140 -140 l14 -54 m-8 26 l24 -12" stroke="#5A3A26" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M96 -136 Q128 -200 170 -146 Z" fill="#E8384F" stroke="' + ST12 + '" stroke-width="4"/><circle cx="172" cy="-146" r="10" fill="#F4F6FB"/>';
  return s + '</g>'; }
// Haus mit Baum als Trainingsbild
function house12(cx, cy, z) { return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + z + ')"><rect x="-140" y="-140" width="280" height="280" fill="#8FD0FF"/><rect x="-140" y="60" width="280" height="80" fill="#7CB342"/><rect x="-90" y="-20" width="120" height="100" fill="#E8B44C" stroke="' + ST12 + '" stroke-width="4"/><path d="M-104 -20 L-30 -80 L44 -20 Z" fill="#C62F3F" stroke="' + ST12 + '" stroke-width="4"/><rect x="-46" y="30" width="30" height="50" fill="#6B3A2A"/><circle cx="90" cy="20" r="40" fill="#2F7A3A" stroke="' + ST12 + '" stroke-width="4"/><rect x="84" y="56" width="12" height="30" fill="#5A3A26"/><circle cx="100" cy="-100" r="24" fill="#FFE14D"/></g>'; }

// ---------- Ort: Schreibtisch am Abend ----------
function room12(t) { let s = '<defs><linearGradient id="rw12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2448"/><stop offset="1" stop-color="#3E3466"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#rw12)"/>';
  // Fenster rechts oben mit Schnee
  s += '<rect x="760" y="560" width="250" height="300" rx="8" fill="#0E1838" stroke="#C9B8F0" stroke-width="10"/><path d="M885 560 V860 M760 710 H1010" stroke="#C9B8F0" stroke-width="8"/>';
  for (let i = 0; i < 14; i++) { const c = (t * .15 + rnd(i + 30)) % 1; s += '<circle cx="' + (770 + 230 * rnd(i + 31) + 6 * Math.sin(t + i)).toFixed(0) + '" cy="' + (570 + 280 * c).toFixed(0) + '" r="3.5" fill="#fff" opacity=".8"/>'; }
  // Lichterkette an der Wand
  s += '<path d="M40 600 Q370 660 700 600" fill="none" stroke="#1A1A2A" stroke-width="3"/>'; for (let i = 0; i < 10; i++) { const x = 70 + i * 66, y = 600 + 60 * (1 - Math.pow((x - 370) / 330, 2)) * .5 + 4; s += '<circle cx="' + x + '" cy="' + y.toFixed(0) + '" r="7" fill="' + ['#FFD23F', '#FF6B8A', '#5CE1FF'][i % 3] + '" opacity="' + (.7 + .3 * Math.sin(t * 3 + i)).toFixed(2) + '"/>'; }
  // Schreibtisch
  s += '<rect x="30" y="1128" width="1020" height="34" fill="#C9A27A" stroke="' + ST12 + '" stroke-width="5"/><rect x="60" y="1162" width="60" height="400" fill="#7A5A3A" stroke="' + ST12 + '" stroke-width="5"/><rect x="960" y="1162" width="60" height="400" fill="#7A5A3A" stroke="' + ST12 + '" stroke-width="5"/><rect x="640" y="1162" width="320" height="220" fill="#8A6A4A" stroke="' + ST12 + '" stroke-width="5"/><rect x="760" y="1250" width="80" height="14" rx="6" fill="#C9A27A"/>';
  s += '<defs><linearGradient id="fl12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A2E50"/><stop offset="1" stop-color="#1E1830"/></linearGradient></defs><rect x="0" y="1562" width="1080" height="360" fill="url(#fl12)"/><ellipse cx="540" cy="1700" rx="420" ry="60" fill="#5A4A7A" opacity=".5"/>';
  // Drucker rechts auf dem Tisch
  s += '<rect x="560" y="1060" width="170" height="70" rx="12" fill="#D8DCE8" stroke="' + ST12 + '" stroke-width="5"/><rect x="580" y="1046" width="130" height="18" fill="#9AA0B4" stroke="' + ST12 + '" stroke-width="4"/><circle cx="706" cy="1090" r="6" fill="#3CCB7F"/>';
  return s; }
// Bildschirm: Rahmen (Feld 160..640 x 700..1040), Inhalt inner
const MX12 = 170, MY12 = 720, MW12 = 340;
function mon12(inner) { return '<rect x="300" y="1086" width="80" height="42" fill="#3A3A4A" stroke="' + ST12 + '" stroke-width="4"/><rect x="250" y="1118" width="180" height="14" rx="6" fill="#3A3A4A" stroke="' + ST12 + '" stroke-width="4"/><rect x="' + (MX12 - 20) + '" y="' + (MY12 - 20) + '" width="' + (MW12 + 40) + '" height="' + (MW12 + 40) + '" rx="18" fill="#1A1A2A" stroke="' + ST12 + '" stroke-width="6"/><svg x="' + MX12 + '" y="' + MY12 + '" width="' + MW12 + '" height="' + MW12 + '" viewBox="0 0 ' + MW12 + ' ' + MW12 + '">' + inner + '</svg>'; }
const deerIn12 = (legs) => '<rect width="340" height="340" fill="#DCEBFF"/><rect y="250" width="340" height="90" fill="#F4F6FB"/>' + deer12(140, 236, .78, legs);

// ---------- Einstieg ----------
WORLD.i12Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; let s = room12(t);
  const a = 1 - cl((lt - .3) / 1.2); s += mon12(deerIn12(4) + noise12(0, 0, 340, a, t, 3));
  if (lo !== undefined && lo > .6) { const k = back(cl((lo - .6) / .4)); s += '<g transform="translate(630 800) scale(' + (.8 * k).toFixed(3) + ')"><rect x="-110" y="-130" width="220" height="250" rx="16" fill="#F4F6FB" stroke="' + ST12 + '" stroke-width="6"/>' + hand12(0, 40, .8, 6) + svgT(0, -90, '6 Finger?', 34, '#E8384F') + '</g>'; }
  return W(s + shade3()); };
WMASC.i12Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) { const j = Math.sin(Math.PI * cl((lo - .6) / .6)); return stay3([XC12, GC12 - 20 * Math.max(0, j)], 1, { r: -8 * Math.max(0, j), mood: lo > .6 ? 'shock' : 'happy' }); }
  if (fr !== undefined) return stay3([XC12, GC12], 1, { r: -6 * Math.sin(Math.PI * cl(fr / 1)), mood: 'shock' });
  const j = lt < 2 ? Math.sin(Math.PI * cl((lt - .9) / .7)) : 0; return stay3([XC12 + 20 * Math.max(0, j), GC12 - 40 * Math.max(0, j)], 1, { r: 12 * Math.max(0, j), mood: 'shock' }); };

// ---------- Teil 1: Erst kaputt machen ----------
WORLD.i12Train = function (sc, ev, t, lt) { const tr = ev.train, nu = ev.nur, le = ev.lern; let s = room12(t);
  let a = 0, step = 0; if (tr !== undefined) a = .55 * cl((tr - .5) / 3.5); if (nu !== undefined) a = .55 + .45 * cl(nu / 1.2); if (le !== undefined) a = 1 - cl((le - .5) / 3.2);
  step = Math.round(a * 1000);
  s += mon12(house12(170, 170, 1.2) + noise12(0, 0, 340, a, t, 11));
  if (tr !== undefined) s += '<rect x="170" y="1070" width="340" height="44" rx="10" fill="#1A1A2A"/>' + svgT(340, 1104, 'Rauschen ' + Math.round(a * 100) + ' %', 36, '#F4F6FB');
  if (le !== undefined) { const k = ease(cl(le / .5)); s += '<g opacity="' + k.toFixed(2) + '"><path d="M560 840 Q640 760 560 680" stroke="#3CCB7F" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M544 690 l16 -14 l10 20" fill="none" stroke="#3CCB7F" stroke-width="8" stroke-linecap="round"/>' + svgT(600, 900, 'zurück', 30, '#3CCB7F') + '</g>'; }
  return W(s + shade3(), slot(ev, [['train', 'Training: Rauschen drauf'], ['nur', 'Nur noch Rauschen', 'hot'], ['lern', 'Rauschen herausrechnen']])); };
WMASC.i12Train = (ev, t, lt) => { const nu = ev.nur; if (nu !== undefined && ev.lern === undefined) { const j = Math.sin(Math.PI * cl(nu / .7)); return stay3([XC12, GC12 - 20 * j], 1, { r: -10 * j, mood: 'shock' }); }
  return stay3([mv12(XC12 + 30, XC12, lt / .5), GC12], 1, { r: 3 * Math.sin(t * 2), mood: ev.lern !== undefined ? 'cool' : 'happy' }); };

// ---------- Teil 2: Der Satz lenkt (Wissenschaftsmodus) ----------
function sci12(t, ev) { const za = ev.zahl, st = ev.start, le = ev.lenk; let s = '';
  s += '<rect x="200" y="690" width="680" height="90" rx="20" fill="#F4F6FB"/>' + svgT(540, 750, '„Rentier mit roter Mütze“', 44, ST12);
  if (za !== undefined) { const k = cl(za / 1); s += '<path d="M540 785 v35" stroke="#C9B8F0" stroke-width="8"/><path d="M526 806 l14 14 l14 -14" fill="none" stroke="#C9B8F0" stroke-width="8"/>';
    const N = ['0,12', '−0,8', '1,3', '…']; N.forEach((n, i) => { if (k * 4 > i) s += '<rect x="' + (215 + i * 165) + '" y="832" width="150" height="70" rx="14" fill="#7C5CFF" stroke="#F4F6FB" stroke-width="4"/>' + svgT(290 + i * 165, 881, n, 40, '#F4F6FB'); }); }
  if (st !== undefined) { const P = [[220, 1, 0], [440, .66, 1], [660, .33, 2]], prog = le === undefined ? 0 : cl(le / 3);
    P.forEach(([x, a, i]) => { const show = i === 0 ? cl(st / .5) : cl((prog * 3 - (i - 1))); if (show <= 0) return; s += '<g opacity="' + show.toFixed(2) + '"><rect x="' + (x - 6) + '" y="954" width="212" height="212" rx="10" fill="#1A1A2A"/><svg x="' + x + '" y="960" width="200" height="200" viewBox="0 0 340 340">' + deerIn12(4) + noise12(0, 0, 340, a, t * .3, 20 + i, 12) + '</svg></g>';
      if (i > 0 && show > 0) s += '<path d="M' + (x - 22) + ' 1060 h-8" stroke="#F4F6FB" stroke-width="6"/>'; });
    if (le !== undefined) { s += '<path d="M540 900 Q' + (560 + 40 * Math.sin(t * 2)).toFixed(0) + ' 930 540 950" stroke="#FFE14D" stroke-width="6" fill="none" stroke-dasharray="10 8" opacity=".9"/>'; if (prog >= 1) s += '<g transform="translate(400 1190)"><rect x="-6" y="-6" width="292" height="12" rx="6" fill="#3CCB7F"/></g>' + svgT(540, 1230, 'fertig nach vielen Schritten', 28, '#3CCB7F'); } }
  return s; }
WORLD.i12Satz = function (sc, ev, t, lt) { const bg = fuse33(room12(t) + mon12(deerIn12(4)), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '"><rect x="170" y="630" width="740" height="640" rx="30" fill="#05071A" opacity=".55"/>' + lab33dots() + sci12(t, ev) + '</g>' + shade3(), slot(ev, [['zahl', 'Satz wird zu Zahlen'], ['start', 'Start: reines Rauschen', 'hot'], ['lenk', 'Zahlen lenken jeden Schritt']])); };
WMASC.i12Satz = (ev, t, lt) => { const st = ev.start; if (st !== undefined && ev.lenk === undefined) { const j = Math.sin(Math.PI * cl((st - .3) / .6)); return stay3([XF12, GF12 - 24 * Math.max(0, j)], 1, { r: -8 * Math.max(0, j), mood: 'shock' }); }
  if (ev.zahl !== undefined || ev.lenk !== undefined) return stay3([XF12, GF12], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  const k = cl(lt / .35); return stay3([lerp(XC12, XF12, ease(k)), lerp(GC12, GF12, k * k)], 1, { r: 10 * Math.sin(Math.PI * k), mood: 'happy' }); };

// ---------- Teil 3: Warum Haende? ----------
function hand12(cx, cy, z, n) { let s = '<g transform="translate(' + cx + ' ' + cy + ') scale(' + z + ')"><rect x="-60" y="-10" width="120" height="120" rx="40" fill="#F2C29A" stroke="' + ST12 + '" stroke-width="5"/>';
  for (let i = 0; i < n; i++) { const x = -56 + i * 112 / (n - 1), h = 70 + 16 * Math.sin(i * 1.3); s += '<rect x="' + (x - 11) + '" y="' + (-h) + '" width="22" height="' + (h + 10) + '" rx="11" fill="#F2C29A" stroke="' + ST12 + '" stroke-width="5"/>'; }
  s += '<path d="M-60 40 Q-110 20 -112 -20" stroke="#F2C29A" stroke-width="26" stroke-linecap="round" fill="none"/></g>'; return s; }
function photo12() { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#F4E8D8"/><circle cx="0" cy="-60" r="110" fill="#F2C29A" stroke="' + ST12 + '" stroke-width="5"/><rect x="-170" y="60" width="340" height="300" rx="60" fill="#5C8BFF" stroke="' + ST12 + '" stroke-width="5"/>';
  s += '<rect x="60" y="80" width="90" height="110" rx="12" fill="#F4F6FB" stroke="' + ST12 + '" stroke-width="5"/><path d="M150 110 q34 20 0 50" stroke="' + ST12 + '" stroke-width="6" fill="none"/><path d="M40 110 q20 -10 30 10 v40 q-20 10 -30 -10 Z" fill="#F2C29A" stroke="' + ST12 + '" stroke-width="4"/>';
  s += '<circle cx="40" cy="130" r="50" fill="none" stroke="#FFE14D" stroke-width="8" stroke-dasharray="14 8"/>'; return s; }
WORLD.i12Hand = function (sc, ev, t, lt) { const mu = ev.muster, kl = ev.klein, fi = ev.finger; let s = room12(t) + (kl === undefined && fi === undefined ? mon12(deerIn12(4)) : '');
  if (kl !== undefined && fi === undefined) { const k = ease(cl(kl / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * k).toFixed(2) + '"/>' + lupeH(390, 880, 220, photo12(), k); }
  if (fi !== undefined) { const k = ease(cl(fi / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * k).toFixed(2) + '"/><g opacity="' + k.toFixed(2) + '"><rect x="150" y="660" width="440" height="420" rx="16" fill="#F4F6FB" stroke="' + ST12 + '" stroke-width="6"/>' + hand12(370, 930, 1.3, 6) + svgT(370, 726, '6 Finger?', 44, '#E8384F') + '</g>'; }
  return W(s + shade3(), slot(ev, [['muster', 'Muster statt Körperbau'], ['klein', 'Hände: klein, verdeckt', 'hot'], ['finger', 'Zu viele Finger']])); };
WMASC.i12Hand = (ev, t, lt) => { const rh = ev.rehook, fi = ev.finger;
  if (fi !== undefined) { const j = Math.sin(Math.PI * cl((fi - .3) / .7)); return stay3([XC12, GC12 - 30 * j], 1, { r: -10 * j, mood: 'shock' }); }
  if (rh !== undefined && ev.muster === undefined) { const k = cl(lt / .8), j = Math.sin(Math.PI * k); return stay3([lerp(XF12, XC12, ease(k)), lerp(GF12, GC12, ease(k)) - 120 * j], 1, { r: -10 * j, mood: 'happy' }); }
  return stay3([XC12, GC12], 1, { r: 3 * Math.sin(t * 2), mood: ev.klein !== undefined ? 'cool' : 'happy' }); };

// ---------- Schluss ----------
WORLD.i12Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(room12(t) + mon12(deerIn12(4)) + '<defs><linearGradient id="od12" x1="0" y1="0" x2="0" y2="1"><stop offset=".32" stop-color="#05071A" stop-opacity=".92"/><stop offset=".64" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od12)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.i12Out = (ev, t, lt) => stay3([XC12 + 30 * Math.sin(Math.PI * cl((lt - 1) / 5)), GC12 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['i12Hook', 'i12Train', 'i12Satz', 'i12Hand', 'i12Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC12); });
