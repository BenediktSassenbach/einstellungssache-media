// B004 "Was hat die Dinosaurier wirklich ausgeloescht?" (Bio, Dino-Skript und Neue Werkzeuge, Kostuem B1 Dino-Forscher), stumme Demo v1 (27.11.2026).
// Ort eigens gebaut: Flussebene am Ende der Kreidezeit mit Farnen, Nadelbaeumen und Schachtelhalmen. Triceratops und Tyrannosaurier als gezeichnete Figuren (triD, rexd, keine Aussage zu Federn).
// Einstieg: Feuerball am Himmel, Blitz, beide Tiere schauen hoch. Teil 1: die eine Lupe (Karte schematisch: Yucatan, Krater) und Groessenvergleich Asteroid gegen Mount Everest.
// Teil 2: der lange Winter (Himmel dunkel, Asche, Farne werden braun, Nahrungskette). Teil 3: neue Szene Dekkan-Trapps in Indien (Lava), dann Vogel vor einem Fenster.
// Karte ist eine Skizze, keine echte Kuestenlinie. Nutzt rexd, triD, birdd (viz_dino.js), lupeH, slot, stay3, look3. Zum Loeschen: diese Datei und videos/B004.
const ST04 = '#0B1020', RX04 = 700, RY04 = 1118, TX04 = 330;
const mv04 = (a, b, k) => lerp(a, b, ease(cl(k)));

// ---------- Ort: Flussebene der Kreidezeit. dk = Dunkelheit 0..1, wi = welk 0..1 ----------
function land04(t, o) { o = o || {}; const dk = cl(o.dk || 0), wi = cl(o.wi || 0);
  let s = '<defs><linearGradient id="sk04" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + mxd('#5CB8FF', '#2A2230', dk) + '"/><stop offset="1" stop-color="' + mxd('#FFE2B0', '#4A3A3A', dk) + '"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk04)"/>';
  if (dk < .9) s += '<circle cx="860" cy="560" r="70" fill="#FFF4C8" opacity="' + (1 - dk).toFixed(2) + '"/>';
  s += '<path d="M0 960 L120 860 L260 920 L380 820 L520 930 L660 850 L820 940 L960 860 L1080 920 V1100 H0 Z" fill="' + mxd('#7A9AC0', '#3A3440', dk) + '" stroke="' + ST04 + '" stroke-width="4"/>';
  s += '<path d="M0 1010 Q540 980 1080 1010 V1920 H0 Z" fill="' + mxd(mxd('#7CB342', '#9A7A4A', wi), '#3A3428', dk * .6) + '" stroke="' + ST04 + '" stroke-width="5"/>';
  s += '<path d="M0 1060 Q300 1040 520 1070 T1080 1060 V1100 Q760 1110 520 1100 T0 1100 Z" fill="' + mxd('#4FA3D9', '#3A4458', dk) + '" stroke="' + ST04 + '" stroke-width="4"/>';
  // Nadelbaeume hinten
  [[90, 1010, 1], [210, 1000, .8], [960, 1005, 1.1], [1040, 1012, .8]].forEach(([x, y, z]) => { s += '<rect x="' + (x - 7 * z) + '" y="' + (y - 40 * z) + '" width="' + (14 * z) + '" height="' + (40 * z) + '" fill="#5A3A26"/>'; for (let j = 0; j < 3; j++) s += '<path d="M' + x + ' ' + (y - 200 * z + j * 50 * z) + ' l' + (-46 - j * 12) * z + ' ' + 80 * z + ' h' + (92 + j * 24) * z + ' Z" fill="' + mxd(mxd('#2F7A3A', '#7A5A2A', wi), '#2A2A22', dk * .5) + '" stroke="' + ST04 + '" stroke-width="4"/>'; });
  // Farne vorne am Rand (ueber dem Untertitel-Band frei)
  for (let i = 0; i < 6; i++) { const x = [40, 130, 470, 560, 900, 1010][i], y = 1240 + 30 * (i % 2), col = mxd(mxd('#4CAF50', '#A07A3A', wi), '#3A3428', dk * .5), dr = 30 * wi;
    for (let j = -2; j <= 2; j++) { const a = (-90 + j * 28 + dr * Math.sign(j || 1) + 3 * Math.sin(t * 1.2 + i)) * Math.PI / 180; s += '<path d="M' + x + ' ' + y + ' q' + (Math.cos(a) * 50).toFixed(0) + ' ' + (Math.sin(a) * 60).toFixed(0) + ' ' + (Math.cos(a) * 110).toFixed(0) + ' ' + (Math.sin(a) * 90 + 40 * wi).toFixed(0) + '" stroke="' + col + '" stroke-width="12" fill="none" stroke-linecap="round"/>'; } }
  if (dk > 0) s += '<rect width="1080" height="1920" fill="#0A0810" opacity="' + (.35 * dk).toFixed(2) + '"/>';
  return s; }
function ash04(t, k) { if (!(k > 0)) return ''; let s = ''; for (let i = 0; i < 40; i++) { const c = (t * (.05 + .03 * rnd(i + 70)) + rnd(i + 71)) % 1; s += '<circle cx="' + (rnd(i + 72) * 1080 + 16 * Math.sin(t + i)).toFixed(0) + '" cy="' + (300 + 1300 * c).toFixed(0) + '" r="' + (2 + 3 * rnd(i + 73)).toFixed(1) + '" fill="#9A9090" opacity="' + (.7 * k).toFixed(2) + '"/>'; } return s; }
const tri04 = (t, o) => triD(TX04, RY04, .5, t, Object.assign({ id: 'b4t' }, o || {}));
const rex04 = (t, o) => rexd(RX04, RY04, .62, t, Object.assign({ id: 'b4r' }, o || {}));

// ---------- Einstieg ----------
WORLD.b4Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; const q = cl(lt / 1.4), fl = lt > 1.1 && lt < 1.8 ? Math.sin(Math.PI * cl((lt - 1.1) / .7)) : 0;
  let s = land04(t, { dk: fr !== undefined ? .2 * ease(cl(fr / 1)) : 0 });
  if (lt > 1.4) { const g = ease(cl((lt - 1.4) / 4)); for (let i = 0; i < 5; i++) s += '<ellipse cx="' + (200 + i * 40 + 10 * Math.sin(t + i)).toFixed(0) + '" cy="' + (900 - 220 * g - i * 30 * g).toFixed(0) + '" rx="' + (60 + 120 * g).toFixed(0) + '" ry="' + (40 + 70 * g).toFixed(0) + '" fill="#8A7A6A" opacity="' + (.55 * (1 - .4 * g)).toFixed(2) + '"/>'; }
  const look = lt < 3 ? -18 * ease(cl(lt / .5)) : 0;
  s += tri04(t, { head: look }) + rex04(t, { head: look * 1.4 });
  if (q < 1) { const x = lerp(980, 260, ease(q)), y = lerp(320, 900, ease(q)); s += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' L' + (x + 300).toFixed(0) + ' ' + (y - 240).toFixed(0) + '" stroke="#FFB020" stroke-width="36" stroke-linecap="round" opacity=".45"/><path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' L' + (x + 260).toFixed(0) + ' ' + (y - 208).toFixed(0) + '" stroke="#FFF1B8" stroke-width="12" stroke-linecap="round"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="30" fill="#FFF6D8"/>'; }
  if (fl > 0) s += '<rect width="1080" height="1920" fill="#FFF6D8" opacity="' + (.7 * fl).toFixed(2) + '"/>';
  if (lo !== undefined) s += birdd(lerp(-80, 560, ease(cl(lo / 1.6))), 760 + 20 * Math.sin(t * 2), .45, t, { col: '#5C8BFF', id: 'h4' });
  return W(s + shade3()); };
WMASC.b4Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) { const j = Math.sin(Math.PI * cl(lo / .7)); return stay3([220, 1537 - 20 * j], 1, { r: 6 * j, mood: 'happy' }); }
  if (fr !== undefined) return stay3([220, 1537], 1, { r: -6 * Math.sin(Math.PI * cl(fr / 1)), mood: 'shock' });
  const j = lt < 1.6 ? Math.sin(Math.PI * cl((lt - .8) / .8)) : 0; return stay3([220 - 20 * j, 1537 - 40 * Math.max(0, j)], 1, { r: -12 * Math.max(0, j), mood: 'shock' }); };

// ---------- Teil 1: Der Einschlag ----------
function map04(t, k) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#2F6FA8"/>';
  // Skizze: Festland Mexiko links und unten um den Golf, Halbinsel Yucatan ragt rechts nach Norden. Krater an der Nordkueste.
  s += '<path d="M-320 320 L-320 -320 L-220 -320 Q-260 -150 -180 -20 Q-100 110 20 120 L40 40 Q140 10 250 30 Q285 150 300 320 Z" fill="#9CC46A" stroke="' + ST04 + '" stroke-width="5"/>';
  s += svgT(-140, 190, 'Mexiko', 44, ST04) + svgT(150, 140, 'Yucatán', 40, ST04) + svgT(-40, -150, 'Golf von Mexiko', 34, '#DCE6FA') + svgT(150, -230, 'Skizze', 28, '#DCE6FA');
  const r = 40 + 30 * cl(k); s += '<circle cx="110" cy="26" r="' + r.toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="8"/><circle cx="110" cy="26" r="' + (r * .5).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="4" stroke-dasharray="8 6"/>';
  return s; }
function size04(k) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#14204A"/>'; const base = 120, px = 30; // 1 km = 30 px
  s += '<path d="M-260 ' + base + ' L-150 ' + (base - 8.8 * px) + ' L-40 ' + base + ' Z" fill="#8A9AB8" stroke="' + ST04 + '" stroke-width="4"/><path d="M-150 ' + (base - 8.8 * px) + ' l-30 50 h60 Z" fill="#F4F6FB"/>' + svgT(-130, base + 46, 'Everest 8,8 km', 30, '#F4F6FB');
  const r = 5 * px * cl(k) + 1; s += '<circle cx="150" cy="' + (base - r) + '" r="' + r.toFixed(0) + '" fill="#8A6A4A" stroke="' + ST04 + '" stroke-width="5"/>' + svgT(140, base + 46, 'rund 10 km', 30, '#FFB020');
  s += '<path d="M-300 ' + base + ' H300" stroke="#F4F6FB" stroke-width="4"/>';
  return s; }
WORLD.b4Ein = function (sc, ev, t, lt) { const ei = ev.ein, gr = ev.gross, kr = ev.krater; let s = land04(t) + tri04(t) + rex04(t);
  const k1 = ei === undefined ? 0 : ease(cl((ei - .3) / .5)), sw = gr === undefined ? 0 : ease(cl(gr / .4));
  if (k1 > 0) s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * k1).toFixed(2) + '"/>';
  if (k1 > 0 && sw < 1) s += lupeH(520, 860, 230, map04(t, kr === undefined ? 0 : cl(kr / .8)), k1 * (1 - sw));
  if (gr !== undefined && kr === undefined) s += lupeH(520, 860, 230, size04(cl((gr - .4) / 1)), sw);
  if (kr !== undefined) s += lupeH(520, 860, 230, map04(t, cl(kr / .8)), ease(cl(kr / .4)));
  return W(s + shade3(), slot(ev, [['ein', 'Vor rund 66 Mio. Jahren'], ['gross', 'Rund 10 bis 15 km groß', 'hot'], ['krater', 'Krater: über 150 km breit']])); };
WMASC.b4Ein = (ev, t, lt) => { const gr = ev.gross; if (gr !== undefined && ev.krater === undefined) { const j = Math.sin(Math.PI * cl((gr - .8) / .6)); return stay3([220, 1537 - 26 * Math.max(0, j)], 1, { r: -8 * Math.max(0, j), mood: 'shock' }); }
  return stay3([220, 1537], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 2: Der lange Winter ----------
WORLD.b4Winter = function (sc, ev, t, lt) { const du = ev.dunkel, pf = ev.pflanz, ke = ev.kette;
  const dk = du === undefined ? 0 : ease(cl(du / 2)), wi = pf === undefined ? 0 : ease(cl(pf / 2.5));
  let s = land04(t, { dk: dk, wi: wi }) + tri04(t, { head: 20 * wi }) + rex04(t, { head: 10 * wi });
  s += ash04(t, dk);
  if (pf !== undefined) { const k = ease(cl(pf / .5)); s += '<g opacity="' + k.toFixed(2) + '">' + thermo(860, 380, 220, .8 - .6 * wi, '#5CE1FF') + '</g>'; }
  if (ke !== undefined) { const k = ease(cl(ke / .5)), a = cl((ke - .6) / .5), b = cl((ke - 1.6) / .5);
    s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.35 * k).toFixed(2) + '"/>';
    s += '<g opacity="' + k.toFixed(2) + '"><rect x="90" y="700" width="230" height="110" rx="20" fill="#7A6A3A" stroke="#F4F6FB" stroke-width="5"/>' + svgT(205, 770, 'Pflanzen', 36, '#F4F6FB') + '</g>';
    s += '<g opacity="' + a.toFixed(2) + '"><path d="M330 755 h70" stroke="#F4F6FB" stroke-width="8"/><path d="M392 740 l20 15 l-20 15" fill="#F4F6FB"/><rect x="420" y="700" width="230" height="110" rx="20" fill="#6B3FA8" stroke="#F4F6FB" stroke-width="5"/>' + svgT(535, 750, 'Pflanzen-', 32, '#F4F6FB') + svgT(535, 790, 'fresser', 32, '#F4F6FB') + '</g>';
    s += '<g opacity="' + b.toFixed(2) + '"><path d="M660 755 h70" stroke="#F4F6FB" stroke-width="8"/><path d="M722 740 l20 15 l-20 15" fill="#F4F6FB"/><rect x="750" y="700" width="180" height="110" rx="20" fill="#C9541E" stroke="#F4F6FB" stroke-width="5"/>' + svgT(840, 770, 'Jäger', 36, '#F4F6FB') + '</g>';
    s += '<path d="M120 690 L900 820" stroke="#E8384F" stroke-width="10" stroke-linecap="round" opacity="' + (cl((ke - 2.6) / .4) * .9).toFixed(2) + '"/>'; }
  return W(s + shade3(), slot(ev, [['dunkel', 'Staub, Ruß, Schwefel'], ['pflanz', 'Fast 2 Jahre kaum Photosynthese', 'hot'], ['kette', 'Das Futter fehlt']])); };
WMASC.b4Winter = (ev, t, lt) => { const rh = ev.rehook, pf = ev.pflanz;
  if (pf !== undefined) return stay3([220, 1537], 1, { r: 4 * Math.sin(t * 14) * cl(pf / .5) * (pf < 3 ? 1 : .3), mood: 'shock' }); /* Schalti bibbert */
  return stay3([220, 1537], 1, { r: 3 * Math.sin(t * 2), mood: rh !== undefined && ev.dunkel === undefined ? 'shock' : 'cool' }); };

// ---------- Teil 3: Die Vulkane, dann der Vogel ----------
function trap04(t) { let s = '<defs><linearGradient id="vs04" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A1620"/><stop offset="1" stop-color="#8A3A1E"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#vs04)"/>';
  // Rauchwolken am Himmel
  for (let i = 0; i < 6; i++) { const x = 100 + i * 180 + 20 * Math.sin(t * .3 + i); s += '<ellipse cx="' + x.toFixed(0) + '" cy="' + (720 + 30 * (i % 2)) + '" rx="150" ry="60" fill="#4A3A40" opacity=".7"/>'; }
  // Stufen aus erkalteter Lava (Trapp = Treppe)
  for (let i = 0; i < 4; i++) { const y = 820 + i * 50; s += '<path d="M0 ' + y + ' H' + (1080 - i * 90) + ' V' + (y + 50) + ' H0 Z" fill="' + ['#4A2A2A', '#3A2222', '#5A3028', '#3A2020'][i] + '" stroke="' + ST04 + '" stroke-width="4"/>'; }
  s += '<path d="M0 1020 H1080 V1920 H0 Z" fill="#2A1A1A" stroke="' + ST04 + '" stroke-width="5"/>';
  // Spalten mit Lavafontaenen und Lavastroemen
  for (let i = 0; i < 3; i++) { const x = 320 + i * 240; s += '<path d="M' + (x - 70) + ' 1040 L' + (x + 70) + ' 1030" stroke="#FFB020" stroke-width="12" stroke-linecap="round"/>';
    for (let j = 0; j < 7; j++) { const c = (t * 1.1 + j / 7 + i * .3) % 1, dx = (j - 3) * 14 * c; s += '<circle cx="' + (x + dx).toFixed(0) + '" cy="' + (1036 - 220 * c + 200 * c * c).toFixed(0) + '" r="' + (14 - 8 * c).toFixed(0) + '" fill="' + (c < .5 ? '#FFE14D' : '#FF6B2A') + '" opacity="' + (1 - c * .6).toFixed(2) + '"/>'; }
    s += '<path d="M' + x + ' 1040 Q' + (x + 40) + ' 1120 ' + (x - 20) + ' 1180" stroke="#FF6B2A" stroke-width="' + (18 + 4 * Math.sin(t * 3 + i)).toFixed(0) + '" fill="none" stroke-linecap="round" opacity=".9"/>'; }
  for (let i = 0; i < 5; i++) s += '<path d="M' + (420 + i * 110) + ' ' + (1380 + 30 * (i % 2)) + ' l40 30 l-20 40" stroke="#FF8A3D" stroke-width="6" fill="none" opacity="' + (.5 + .3 * Math.sin(t * 2 + i)).toFixed(2) + '"/>';
  return s; }
function window04(t, k) { let s = '<rect width="1080" height="1920" fill="#3A2E4A"/><rect x="0" y="1300" width="1080" height="620" fill="#C9A27A" stroke="' + ST04 + '" stroke-width="5"/>';
  s += '<rect x="200" y="640" width="680" height="620" rx="10" fill="#8FD0FF" stroke="' + ST04 + '" stroke-width="8"/><path d="M540 640 V1260 M200 950 H880" stroke="#F4F6FB" stroke-width="18"/><rect x="170" y="1250" width="740" height="40" rx="8" fill="#F4F6FB" stroke="' + ST04 + '" stroke-width="5"/>';
  s += '<path d="M200 820 Q400 780 560 850 T880 820" stroke="#5A3A26" stroke-width="16" fill="none"/>';
  if (k < 1) s += birdd(lerp(1000, 660, ease(cl(k))), lerp(700, 800, ease(cl(k))), .5, t, { col: '#C9541E', id: 'w4' });
  else { const b = 3 * Math.sin(t * 3), hp = ((t * .4) % 1) < .08 ? -10 : 0; s += '<g transform="translate(660 ' + (818 + b * .3).toFixed(1) + ')"><path d="M-40 -30 L-110 -10 L-40 0 Z" fill="#7A4A2A" stroke="' + ST04 + '" stroke-width="4"/><ellipse cx="0" cy="-40" rx="56" ry="44" fill="#9A6A3A" stroke="' + ST04 + '" stroke-width="5"/><ellipse cx="18" cy="-26" rx="34" ry="28" fill="#E8743A"/><g transform="rotate(' + hp + ' 40 -80)"><circle cx="40" cy="-92" r="30" fill="#9A6A3A" stroke="' + ST04 + '" stroke-width="5"/><circle cx="50" cy="-98" r="6" fill="' + ST04 + '"/><path d="M68 -92 l22 6 l-22 6 Z" fill="#FFB020" stroke="' + ST04 + '" stroke-width="3"/></g><path d="M-10 2 v16 M14 2 v16" stroke="#E8A040" stroke-width="5"/></g>'; }
  return s; }
WORLD.b4Vulkan = function (sc, ev, t, lt) { const vu = ev.vulkan, st = ev.stoss, vo = ev.vogel; let s;
  if (vo !== undefined) s = window04(t, cl(vo / 1.4));
  else if (vu !== undefined || st !== undefined) { s = trap04(t); if (st !== undefined) { const k = ease(cl(st / .5)); s += '<g opacity="' + k.toFixed(2) + '"><rect x="330" y="690" width="290" height="120" rx="20" fill="#3A2A30" stroke="#F4F6FB" stroke-width="5"/>' + svgT(475, 746, 'Vulkane:', 36, '#FFB020') + svgT(475, 788, 'Klima belastet', 32, '#F4F6FB') + '<rect x="640" y="690" width="290" height="120" rx="20" fill="#3A2A30" stroke="#F4F6FB" stroke-width="5"/>' + svgT(785, 746, 'Asteroid:', 36, '#FFE14D') + svgT(785, 788, 'Todesstoß', 32, '#F4F6FB') + '</g>'; } }
  else s = land04(t, { dk: .5, wi: .6 }) + tri04(t, { head: 20 }) + ash04(t, .4);
  return W(s + shade3(), slot(ev, [['vulkan', 'Dekkan-Trapps, Indien'], ['stoss', 'Nach heutigem Stand: Asteroid', 'hot'], ['vogel', 'Vögel sind Dinosaurier']])); };
WMASC.b4Vulkan = (ev, t, lt) => { const vo = ev.vogel, st = ev.stoss;
  if (vo !== undefined) { const j = Math.sin(Math.PI * cl((vo - 1.4) / .7)); return stay3([220, 1537 - 30 * Math.max(0, j)], 1, { r: 8 * Math.max(0, j), mood: 'happy' }); }
  if (st !== undefined) return stay3([220, 1537], 1, { r: 3 * Math.sin(t * 2), mood: 'cool' });
  return stay3([220, 1537], 1, { r: ev.vulkan !== undefined ? -6 : 3 * Math.sin(t * 2), mood: ev.vulkan !== undefined ? 'shock' : 'happy' }); };

// ---------- Schluss ----------
WORLD.b4Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(window04(t, 1) + '<defs><linearGradient id="od04" x1="0" y1="0" x2="0" y2="1"><stop offset=".32" stop-color="#05071A" stop-opacity=".92"/><stop offset=".64" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od04)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.b4Out = (ev, t, lt) => stay3([220 + 50 * Math.sin(Math.PI * cl((lt - 1) / 5)), 1537 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['b4Hook', 'b4Ein', 'b4Winter', 'b4Vulkan', 'b4Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
