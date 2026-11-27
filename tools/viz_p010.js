// P010 "Was ist eine Sternschnuppe wirklich?" (Physik, Skript 4 mit Abschnitt 9 und Neue Werkzeuge, Kostuem P2 Astronaut), stumme Demo v1 (27.11.2026).
// Ort eigens gebaut: verschneiter Huegel in einer klaren Winternacht, Sternhimmel, Decke und Thermoskanne, Dorf in der Ferne.
// Einstieg: helle Sternschnuppe zischt vorbei, Schalti erschrickt. Teil 1: die eine Lupe (Koernchen neben Sandkorn und Erbse), dann Geschwindigkeit.
// Teil 2: Wissenschaftsmodus (Luftschichten mit Hoehenskala, Koernchen presst Luft, verdampft und leuchtet). Teil 3: Geminiden aus einem Punkt, Phaethon mit Staubspur, Kalenderzettel.
// Nutzt lupeH, fuse33, lab33, lab33dots, slot, stay3, look3. Zum Loeschen: diese Datei und videos/P010.
var AC10 = '#5CE1FF', ST10 = '#0B1020', XC10 = 800, GC10 = 1140, XF10 = 270, GF10 = 1537;
const mv10 = (a, b, k) => lerp(a, b, ease(cl(k)));

// ---------- Ort: Huegel bei Nacht ----------
function hill10(t, o) { o = o || {}; let s = '<defs><linearGradient id="sk10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050A24"/><stop offset=".55" stop-color="#14204A"/><stop offset="1" stop-color="#2A3A6A"/></linearGradient><linearGradient id="sn10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#AEBCDD"/><stop offset=".5" stop-color="#6A7AA4"/><stop offset="1" stop-color="#2E3A60"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk10)"/>';
  for (let i = 0; i < 70; i++) { const x = rnd(i + 300) * 1080, y = 40 + rnd(i + 301) * 980, r = .8 + 2.2 * rnd(i + 302); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + r.toFixed(1) + '" fill="#fff" opacity="' + (.35 + .35 * Math.sin(t * (1 + rnd(i + 303)) + i)).toFixed(2) + '"/>'; }
  // Mondsichel (wenig Licht)
  s += '<circle cx="180" cy="720" r="34" fill="#F4F0D8"/><circle cx="166" cy="712" r="32" fill="#0E1838"/>';
  // ferne Berge und Dorf
  s += '<path d="M0 1010 L140 900 L260 980 L400 860 L560 990 L700 900 L860 1000 L1080 920 V1080 H0 Z" fill="#1E2A50" stroke="' + ST10 + '" stroke-width="4"/><path d="M400 860 l-40 34 h80 Z M700 900 l-34 30 h68 Z" fill="#DCE6FA"/>';
  for (let i = 0; i < 9; i++) { const x = 60 + i * 110, y = 1060 - 8 * (i % 3); s += '<rect x="' + x + '" y="' + y + '" width="46" height="30" fill="#2A3560" stroke="' + ST10 + '" stroke-width="3"/><path d="M' + (x - 4) + ' ' + y + ' l27 -20 l27 20 Z" fill="#3A4A7A" stroke="' + ST10 + '" stroke-width="3"/><rect x="' + (x + 16) + '" y="' + (y + 10) + '" width="12" height="10" fill="#FFD27A" opacity="' + (.6 + .3 * Math.sin(t * .7 + i)).toFixed(2) + '"/>'; }
  // Huegel mit Schnee, Schalti steht oben bei y 1140
  s += '<path d="M0 1200 Q300 1150 560 1146 Q820 1140 1080 1160 V1920 H0 Z" fill="url(#sn10)" stroke="' + ST10 + '" stroke-width="5"/>';
  s += '<path d="M0 1560 H1080 V1920 H0 Z" fill="#2A3458" opacity=".55"/>';
  // Schlitten und Schneemann unten, Fussspuren
  s += '<g transform="translate(770 1470)"><circle cy="0" r="70" fill="#E8F0FF" stroke="' + ST10 + '" stroke-width="5"/><circle cy="-100" r="48" fill="#E8F0FF" stroke="' + ST10 + '" stroke-width="5"/><circle cx="-16" cy="-108" r="6" fill="' + ST10 + '"/><circle cx="16" cy="-108" r="6" fill="' + ST10 + '"/><path d="M0 -96 l30 8 l-30 6 Z" fill="#FF8A3D"/><path d="M-40 -60 h80" stroke="#C62F3F" stroke-width="12" stroke-linecap="round"/><path d="M-60 -20 l-60 -40 M60 -20 l50 -50" stroke="#5A3A26" stroke-width="6" stroke-linecap="round"/></g>';
  for (let i = 0; i < 7; i++) s += '<ellipse cx="' + (560 + i * 34) + '" cy="' + (1220 + i * 34) + '" rx="10" ry="6" fill="#4A5A84" opacity=".5"/>';
  s += '<g transform="translate(400 1400) rotate(-8)"><rect x="-90" y="-20" width="180" height="22" rx="6" fill="#A85A3A" stroke="' + ST10 + '" stroke-width="4"/><path d="M-90 14 h190 q20 0 20 -20" stroke="#5A6278" stroke-width="7" fill="none"/></g>';
  // Decke und Thermoskanne
  // Kiefern links
  [[70, 1230], [190, 1200]].forEach(([x, y], n) => { s += '<rect x="' + (x - 8) + '" y="' + (y - 20) + '" width="16" height="40" fill="#5A3A26"/>' + [0, 1, 2].map(j => '<path d="M' + x + ' ' + (y - 170 + j * 46) + ' l' + (-50 - j * 10) + ' 80 h' + (100 + j * 20) + ' Z" fill="#1F5A3A" stroke="' + ST10 + '" stroke-width="4"/><path d="M' + x + ' ' + (y - 170 + j * 46) + ' l-22 36 h44 Z" fill="#E8F0FF"/>').join(''); });
  return s; }
// Sternschnuppe: Kopf bei (x,y), Richtung (dx,dy) normiert, Laenge L, Helligkeit k
function streak10(x, y, dx, dy, L, k, w) { if (!(k > 0)) return ''; w = w || 6; const id = 'mt' + Math.round(x) + '_' + Math.round(y);
  return '<defs><linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="' + x.toFixed(0) + '" y1="' + y.toFixed(0) + '" x2="' + (x - dx * L).toFixed(0) + '" y2="' + (y - dy * L).toFixed(0) + '"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".25" stop-color="#BDF3FF"/><stop offset="1" stop-color="#5CE1FF" stop-opacity="0"/></linearGradient></defs><path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' L' + (x - dx * L).toFixed(0) + ' ' + (y - dy * L).toFixed(0) + '" stroke="url(#' + id + ')" stroke-width="' + w + '" stroke-linecap="round" opacity="' + cl(k).toFixed(2) + '"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (w * 1.4).toFixed(0) + '" fill="#fff" opacity="' + cl(k).toFixed(2) + '"/>'; }
// Koernchen (unregelmaessiger Stein)
function grain10(x, y, r, col) { const P = []; for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, rr = r * (.8 + .35 * rnd(i + 40)); P.push((x + Math.cos(a) * rr).toFixed(1) + ' ' + (y + Math.sin(a) * rr).toFixed(1)); } return '<path d="M' + P.join(' L') + ' Z" fill="' + (col || '#8A7A6A') + '" stroke="' + ST10 + '" stroke-width="' + Math.max(2, r / 10).toFixed(1) + '" stroke-linejoin="round"/>'; }

// ---------- Einstieg ----------
WORLD.p10Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; let s = hill10(t);
  const q = cl(lt / 1.1); if (q < 1) { const x = lerp(1000, 120, ease(q)), y = lerp(320, 820, ease(q)); s += streak10(x, y, -.87, .5, 360, Math.sin(Math.PI * q) * 1.2, 9); if (q > .2 && q < .7) s += '<rect width="1080" height="1920" fill="#BDF3FF" opacity="' + (.12 * Math.sin(Math.PI * (q - .2) / .5)).toFixed(2) + '"/>'; }
  if (fr !== undefined) { const k = ease(cl(fr / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.4 * k).toFixed(2) + '"/>' + lupeH(400, 860, 180, '<rect x="-320" y="-320" width="640" height="640" fill="#12182E"/>' + grain10(0, -20, 120) + svgT(0, 230, 'Sandkorn?', 70, '#F4F6FB'), k, 560, 1120); }
  if (lo !== undefined) for (let i = 0; i < 3; i++) { const c = cl((lo - .2 - i * .5) / .7); if (c > 0 && c < 1) s += streak10(lerp(820 - i * 180, 560 - i * 180, c), lerp(380 + i * 60, 560 + i * 60, c), -.82, .57, 200, Math.sin(Math.PI * c), 5); }
  return W(s + shade3()); };
WMASC.p10Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) { const j = Math.sin(Math.PI * cl(lo / .7)); return stay3([XC10, GC10 - 20 * j], 1, { r: 6 * j, mood: 'happy' }); }
  if (fr !== undefined) return stay3([XC10, GC10], 1, { r: -6 * Math.sin(Math.PI * cl(fr / 1)), mood: 'shock' });
  const j = lt < .8 ? Math.sin(Math.PI * cl(lt / .8)) : 0; return stay3([XC10 + 30 * j, GC10 - 50 * j], 1, { r: -14 * j, mood: 'shock' }); };

// ---------- Teil 1: Kein Stern (die eine Lupe) ----------
function lens10(t, o) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#12182E"/>';
  const g = cl(o.g), p = cl(o.p); s += '<g opacity="' + g.toFixed(2) + '">' + grain10(-120, 10, 70) + svgT(-120, 150, 'Körnchen', 52, '#F4F6FB') + '</g>';
  if (p > 0) s += '<g opacity="' + p.toFixed(2) + '"><circle cx="120" cy="0" r="92" fill="#7FCB5A" stroke="' + ST10 + '" stroke-width="6"/><circle cx="96" cy="-28" r="20" fill="#B8F08A" opacity=".7"/>' + svgT(120, 150, 'Erbse', 52, '#F4F6FB') + '</g>';
  s += svgT(0, -238, 'nicht maßstabsgetreu', 36, '#C9D3EE');
  return s; }
WORLD.p10Korn = function (sc, ev, t, lt) { const ko = ev.korn, gr = ev.groesse, ra = ev.rast; let s = hill10(t);
  const lk = ko === undefined ? 0 : ease(cl((ko - .3) / .5)), out = ra === undefined ? 0 : ease(cl(ra / .4));
  if (lk > 0 && out < 1) s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * lk * (1 - out)).toFixed(2) + '"/>' + lupeH(400, 860, 185, lens10(t, { g: cl((ko - .4) / .4), p: gr === undefined ? 0 : cl((gr - 1.2) / .5) }), lk * (1 - out), 700, 640);
  if (ra !== undefined) { const c = ((ra * .55) % 1); s += streak10(lerp(980, 300, c), lerp(680, 990, c), -.9, .42, 380, 1, 9);
    for (let i = 0; i < 4; i++) s += '<path d="M' + (820 - i * 40) + ' ' + (420 + i * 34) + ' h120" stroke="#BDF3FF" stroke-width="5" stroke-linecap="round" opacity="' + (.5 * cl(ra / .5) * (.6 + .4 * Math.sin(t * 9 + i))).toFixed(2) + '"/>'; }
  return W(s + shade3(), slot(ev, [['korn', 'Kein Stern: ein Körnchen'], ['groesse', 'Sandkorn bis Erbse', 'hot'], ['rast', '11 bis 72 km pro Sekunde']])); };
WMASC.p10Korn = (ev, t, lt) => { const ra = ev.rast; if (ra !== undefined) return stay3([XC10, GC10], 1, { r: -6 + 4 * Math.sin(t * 6), mood: 'shock' });
  return stay3([mv10(XC10 + 20, XC10, lt / .5), GC10], 1, { r: 3 * Math.sin(t * 2), mood: ev.groesse !== undefined ? 'shock' : 'happy' }); };

// ---------- Teil 2: Warum es leuchtet (Wissenschaftsmodus) ----------
function sci10(t, ev) { const pr = ev.press, le = ev.leucht, ho = ev.hoch; let s = '';
  // Hoehenskala links, Luftschichten
  s += '<rect x="200" y="660" width="700" height="860" rx="24" fill="#0B1438" opacity=".6"/>';
  for (let i = 0; i < 6; i++) s += '<rect x="200" y="' + (660 + i * 143) + '" width="700" height="143" fill="#5CE1FF" opacity="' + (.03 + .035 * i).toFixed(3) + '"/>';
  s += '<path d="M260 680 V1120" stroke="#F4F6FB" stroke-width="5"/>'; [[120, 700], [100, 833], [80, 967], [60, 1100]].forEach(([km, y]) => { s += '<path d="M250 ' + y + ' h24" stroke="#F4F6FB" stroke-width="5"/>' + svgT(340, y + 13, km + ' km', 40, '#F4F6FB'); });
  const q = pr === undefined ? 0 : cl(pr / 3.2), x = lerp(860, 660, q), y = lerp(700, 830, q);
  const sz = le === undefined ? 30 : 30 * (1 - .7 * cl(le / 3)); const gone = ho !== undefined ? cl((ho - .5) / 1.5) : 0;
  const gx = ho === undefined ? (le === undefined ? x : lerp(660, 560, cl(le / 3))) : lerp(560, 530, cl(ho / 2)), gy = ho === undefined ? (le === undefined ? y : lerp(830, 930, cl(le / 3))) : lerp(930, 960, cl(ho / 2));
  if (pr !== undefined) { // zusammengepresste Luft vor dem Koernchen
    s += '<path d="M' + (gx - 70) + ' ' + (gy - 20) + ' Q' + (gx - 40) + ' ' + (gy + 60) + ' ' + (gx + 30) + ' ' + (gy + 70) + '" stroke="#FFE14D" stroke-width="' + (6 + 4 * Math.sin(t * 12)).toFixed(1) + '" fill="none" stroke-linecap="round" opacity="' + (cl(pr / .6) * (1 - gone)).toFixed(2) + '"/>';
    for (let i = 0; i < 8; i++) { const a = i * .5 + t * 3; s += '<circle cx="' + (gx - 50 + 14 * Math.cos(a)).toFixed(0) + '" cy="' + (gy + 40 + 10 * Math.sin(a * 1.3) + i * 3).toFixed(0) + '" r="6" fill="#9FC2FF" opacity="' + (.8 * (1 - gone)).toFixed(2) + '"/>'; } }
  if (le !== undefined) { const k = cl(le / .6) * (1 - gone); s += '<path d="M' + gx.toFixed(0) + ' ' + gy.toFixed(0) + ' L' + (gx + 300).toFixed(0) + ' ' + (gy - 280).toFixed(0) + '" stroke="#FF9E5A" stroke-width="26" stroke-linecap="round" opacity="' + (.35 * k).toFixed(2) + '"/><path d="M' + gx.toFixed(0) + ' ' + gy.toFixed(0) + ' L' + (gx + 300).toFixed(0) + ' ' + (gy - 280).toFixed(0) + '" stroke="#FFF1B8" stroke-width="8" stroke-linecap="round" opacity="' + k.toFixed(2) + '"/><circle cx="' + gx.toFixed(0) + '" cy="' + gy.toFixed(0) + '" r="' + (sz + 26 + 6 * Math.sin(t * 14)).toFixed(0) + '" fill="#FFB020" opacity="' + (.5 * k).toFixed(2) + '"/>'; }
  if (gone < 1) s += '<g opacity="' + (1 - gone).toFixed(2) + '">' + grain10(gx, gy, sz, le !== undefined ? '#FF8A3D' : '#8A7A6A') + '</g>';
  if (ho !== undefined) { const k = ease(cl(ho / .5)); s += '<g opacity="' + k.toFixed(2) + '"><rect x="620" y="895" width="290" height="70" rx="14" fill="#F4F6FB"/>' + svgT(765, 943, 'verglüht', 38, ST10) + '</g>'; }
  return s; }
WORLD.p10Leucht = function (sc, ev, t, lt) { const bg = fuse33(hill10(t), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '">' + lab33dots() + sci10(t, ev) + '</g>' + shade3(), slot(ev, [['press', 'Luft wird zusammengepresst'], ['leucht', 'Verdampft und leuchtet', 'hot'], ['hoch', 'In rund 80 bis 100 km']])); };
WMASC.p10Leucht = (ev, t, lt) => { const le = ev.leucht; if (le !== undefined && le < 2.5) { const j = Math.sin(Math.PI * cl((le - .3) / .6)); return stay3([XF10, GF10 - 24 * Math.max(0, j)], 1, { r: -8 * Math.max(0, j), mood: 'shock' }); }
  if (ev.press !== undefined || ev.hoch !== undefined) return stay3([XF10, GF10], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  const k = cl(lt / .35); return stay3([lerp(XC10, XF10, ease(k)), lerp(GC10, GF10, k * k)], 1, { r: 10 * Math.sin(Math.PI * k), mood: 'happy' }); };

// ---------- Teil 3: Die Geminiden ----------
function orbit10(t, k) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#050A24"/>';
  s += '<circle cx="0" cy="0" r="34" fill="#FFD23F"/><circle r="200" fill="none" stroke="#5C8BFF" stroke-width="4" stroke-dasharray="10 8"/>';
  const a = t * .3; s += '<circle cx="' + (200 * Math.cos(a)).toFixed(0) + '" cy="' + (200 * Math.sin(a)).toFixed(0) + '" r="16" fill="#3C9BFF" stroke="#F4F6FB" stroke-width="3"/>';
  s += '<ellipse cx="60" cy="-20" rx="250" ry="120" transform="rotate(-25 60 -20)" fill="none" stroke="#FF9E5A" stroke-width="14" opacity="' + (.35 * cl(k)).toFixed(2) + '"/>';
  const b = t * .5, px = 60 + 250 * Math.cos(b) * .9 - 120 * Math.sin(b) * .42, py = -20 + 250 * Math.cos(b) * -.42 + 120 * Math.sin(b) * .9;
  s += grain10(px, py, 20, '#A88A6A') + svgT(0, 280, 'Phaethon', 54, '#F4F6FB') + svgT(200 * Math.cos(t * .3), 200 * Math.sin(t * .3) - 30, 'Erde', 34, '#9FD0FF');
  return s; }
WORLD.p10Gem = function (sc, ev, t, lt) { const sp = ev.spur, ph = ev.phaet, na = ev.nacht; let s = hill10(t);
  const RX = 900, RY = 800; // Ausstrahlungspunkt
  if (sp !== undefined) { const k = cl(sp / .6); s += '<circle cx="' + RX + '" cy="' + RY + '" r="10" fill="#FFE14D" opacity="' + (.6 * k).toFixed(2) + '"/>';
    for (let i = 0; i < 7; i++) { const a = (165 + i * 16) * Math.PI / 180, c = ((t * .45 + rnd(i + 80)) % 1); if (c > .7) continue; const d = 60 + 340 * c / .7; s += streak10(RX + Math.cos(a) * d, RY + Math.sin(a) * d, Math.cos(a), Math.sin(a), 140, k * Math.sin(Math.PI * c / .7), 4); } }
  if (ph !== undefined && na === undefined) { const k = ease(cl(ph / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * k).toFixed(2) + '"/>' + lupeH(400, 860, 185, orbit10(t, cl((ph - .3) / .6)), k); }
  if (na !== undefined) { const k = back(cl(na / .6)); s += '<g transform="translate(330 1080) scale(' + k.toFixed(3) + ')"><rect x="-6" y="-10" width="12" height="80" fill="#5A3A26" stroke="' + ST10 + '" stroke-width="3"/><rect x="-110" y="-200" width="220" height="200" rx="14" fill="#F4F6FB" stroke="' + ST10 + '" stroke-width="5"/><rect x="-110" y="-200" width="220" height="56" rx="14" fill="#C62F3F"/>' + svgT(0, -158, 'Dezember', 32, '#fff') + svgT(0, -70, '13./14.', 54, ST10) + svgT(0, -24, 'nachts', 30, ST10) + '</g>'; }
  return W(s + shade3(), slot(ev, [['spur', '4. bis 17. Dezember'], ['phaet', 'Vom Asteroiden Phaethon', 'hot'], ['nacht', 'Am meisten: 13./14.12.']])); };
WMASC.p10Gem = (ev, t, lt) => { const rh = ev.rehook, na = ev.nacht, ph = ev.phaet;
  if (na !== undefined) { const j = Math.sin(Math.PI * cl((na - .3) / .7)); return stay3([XC10, GC10 - 30 * j], 1, { r: 8 * j, mood: 'happy' }); }
  if (ph !== undefined) return stay3([XC10, GC10], 1, { r: -8 + 3 * Math.sin(t * 2), mood: 'shock' });
  if (rh !== undefined && ev.spur === undefined) { const k = cl(lt / .8), j = Math.sin(Math.PI * k); return stay3([lerp(XF10, XC10, ease(k)), lerp(GF10, GC10, ease(k)) - 120 * j], 1, { r: -10 * j, mood: 'happy' }); }
  return stay3([XC10, GC10], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.p10Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); let s = hill10(t); const c = (t * .4) % 1; s += streak10(lerp(900, 500, c), lerp(360, 560, c), -.9, .45, 180, Math.sin(Math.PI * c), 5);
  return W(s + '<defs><linearGradient id="od10" x1="0" y1="0" x2="0" y2="1"><stop offset=".32" stop-color="#05071A" stop-opacity=".92"/><stop offset=".64" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od10)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.p10Out = (ev, t, lt) => stay3([XC10 + 30 * Math.sin(Math.PI * cl((lt - 1) / 5)), GC10 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['p10Hook', 'p10Korn', 'p10Leucht', 'p10Gem', 'p10Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC10); });
