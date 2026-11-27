// C025 "Warum riecht dasselbe Molekuel einmal nach Minze und einmal nach Kuemmel?" (Chemie, Skript 4 mit Abschnitt 9 und Neue Werkzeuge, Kostuem C3 Molekuel-Antenne), stumme Demo v1 (27.11.2026).
// Ort eigens gebaut: kleiner Kraeuter- und Teeladen am Abend. Regale mit Glaesern, getrocknete Kraeuter an der Decke, Theke mit zwei Duftflaeschchen.
// Einstieg: Schalti riecht an Flaeschchen B, erwartet Minze, bekommt Kuemmel. Teil 1: zwei Handschuhe und zwei Molekuele (Spiegelbilder, passen nie aufeinander).
// Teil 2: Wissenschaftsmodus (Riechrezeptor wie ein Handschuh, eine Form loest ein staerkeres Signal aus). Teil 3: Minzblatt und Kuemmelbrot, Punkteraster 8 von 100, Medaille 2026 (ohne Logo).
// Carvon als vereinfachte Skizze: Sechsring, Sauerstoff, Seitengruppe mit Keil. Kein echtes Strukturbild im Massstab. Nutzt lupeH, fuse33, lab33, lab33dots, slot, stay3, look3.
// Zum Loeschen: diese Datei und videos/C025.
var AC25 = '#FF6BD6', ST25 = '#0B1020', XC25 = 790, GC25 = 1140, XF25 = 270, GF25 = 1537, MINT25 = '#3CCB7F', KUE25 = '#C9944A';
const mv25 = (a, b, k) => lerp(a, b, ease(cl(k)));

// ---------- Ort: Kraeuterladen ----------
function shop25(t) { let s = '<defs><linearGradient id="wl25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E3A34"/><stop offset="1" stop-color="#2E5246"/></linearGradient><radialGradient id="lp25" cx=".5" cy=".3" r=".6"><stop offset="0" stop-color="#FFE7A8" stop-opacity=".55"/><stop offset="1" stop-color="#FFE7A8" stop-opacity="0"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#wl25)"/>';
  // Decke mit Balken und haengenden Kraeuterbuendeln
  s += '<rect x="0" y="560" width="1080" height="40" fill="#4A3020" stroke="' + ST25 + '" stroke-width="5"/>';
  for (let i = 0; i < 7; i++) { const x = 90 + i * 150, sw = 6 * Math.sin(t * 1.3 + i); s += '<g transform="translate(' + x + ' 600) rotate(' + sw.toFixed(1) + ')"><path d="M0 0 v40" stroke="#8A6A4A" stroke-width="4"/>' + [-18, 0, 18].map(d => '<path d="M0 40 q' + d + ' 30 ' + (d * 1.4) + ' 80" stroke="' + (i % 2 ? '#7FA65A' : '#A8B86A') + '" stroke-width="9" fill="none" stroke-linecap="round"/>').join('') + '<rect x="-12" y="34" width="24" height="12" rx="3" fill="#C62F3F"/></g>'; }
  // Lampe
  s += '<path d="M540 600 v70" stroke="#2A2A2A" stroke-width="4"/><path d="M500 670 h80 l-12 34 h-56 Z" fill="#E8B44C" stroke="' + ST25 + '" stroke-width="4"/><circle cx="540" cy="760" r="420" fill="url(#lp25)"/>';
  // Regale mit Glaesern
  [820, 960].forEach((y, r) => { s += '<rect x="60" y="' + y + '" width="960" height="16" fill="#6B4630" stroke="' + ST25 + '" stroke-width="4"/>';
    for (let i = 0; i < 11; i++) { const x = 100 + i * 86, h = 70 + 18 * rnd(i + r * 30 + 700), c = ['#7FA65A', '#C9944A', '#E8D3B0', '#A85A3A', '#5A8A4A'][(i + r) % 5];
      s += '<rect x="' + (x - 26) + '" y="' + (y - h) + '" width="52" height="' + h.toFixed(0) + '" rx="8" fill="#CFE7F0" fill-opacity=".35" stroke="#F4F6FB" stroke-opacity=".7" stroke-width="3"/><rect x="' + (x - 22) + '" y="' + (y - h * .62) + '" width="44" height="' + (h * .58).toFixed(0) + '" rx="6" fill="' + c + '" opacity=".85"/><rect x="' + (x - 28) + '" y="' + (y - h - 10) + '" width="56" height="14" rx="4" fill="#8A5A3A" stroke="' + ST25 + '" stroke-width="3"/>'; } });
  // Theke
  s += '<rect x="40" y="1128" width="1000" height="34" fill="#B8865A" stroke="' + ST25 + '" stroke-width="5"/><rect x="60" y="1162" width="960" height="400" fill="#6E4430" stroke="' + ST25 + '" stroke-width="5"/>';
  for (let i = 0; i < 4; i++) s += '<rect x="' + (90 + i * 236) + '" y="1196" width="200" height="320" rx="10" fill="none" stroke="#4A2C1E" stroke-width="6"/>';
  s += '<defs><linearGradient id="fl25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A3E2E"/><stop offset="1" stop-color="#2A1E18"/></linearGradient></defs><rect x="0" y="1562" width="1080" height="360" fill="url(#fl25)"/>';
  // Minzpflanze links auf der Theke
  s += '<path d="M150 1128 l-26 -70 h112 l-26 70 Z" fill="#C86A3A" stroke="' + ST25 + '" stroke-width="4"/>';
  for (let i = 0; i < 7; i++) { const a = -70 + i * 23 + 4 * Math.sin(t * 1.5 + i), x = 180 + Math.cos(a * Math.PI / 180) * 90, y = 1058 + Math.sin(a * Math.PI / 180) * 90;
    s += '<path d="M180 1058 L' + x.toFixed(0) + ' ' + y.toFixed(0) + '" stroke="#2F7A4A" stroke-width="5"/><ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="26" ry="15" transform="rotate(' + a.toFixed(0) + ' ' + x.toFixed(0) + ' ' + y.toFixed(0) + ')" fill="' + MINT25 + '" stroke="' + ST25 + '" stroke-width="3"/>'; }
  return s; }

// Fläschchen mit Etikett (Boden bei y)
function vial25(x, y, lab, o) { o = o || {}; const tip = o.tip || 0; return '<g transform="translate(' + x + ' ' + y + ') rotate(' + tip.toFixed(1) + ')"><rect x="-40" y="-130" width="80" height="130" rx="16" fill="#6A3A1A" stroke="' + ST25 + '" stroke-width="5"/><rect x="-20" y="-160" width="40" height="32" rx="6" fill="#2A2A2A" stroke="' + ST25 + '" stroke-width="4"/><rect x="-32" y="-96" width="64" height="54" rx="8" fill="#F4F6FB" stroke="' + ST25 + '" stroke-width="3"/>' + svgT(0, -55, lab, 40, ST25) + '</g>'; }
// Duftwolke: mint oder kue, k 0..1
function cloud25(x, y, kind, k, t) { if (!(k > 0)) return ''; const c = kind === 'mint' ? MINT25 : KUE25; let s = '<g opacity="' + cl(k).toFixed(2) + '">';
  for (let i = 0; i < 5; i++) { const q = (t * .35 + i / 5) % 1; s += '<path d="M' + (x + 30 * Math.sin(i * 2 + t)).toFixed(0) + ' ' + (y - 160 * q).toFixed(0) + ' q22 -14 0 -30 q-22 -14 0 -30" stroke="' + c + '" stroke-width="9" fill="none" stroke-linecap="round" opacity="' + (1 - q).toFixed(2) + '"/>'; }
  s += '<circle cx="' + x + '" cy="' + (y - 220) + '" r="58" fill="' + c + '" fill-opacity=".3" stroke="' + c + '" stroke-width="5"/>';
  if (kind === 'mint') s += '<ellipse cx="' + x + '" cy="' + (y - 220) + '" rx="34" ry="18" transform="rotate(-30 ' + x + ' ' + (y - 220) + ')" fill="' + MINT25 + '" stroke="' + ST25 + '" stroke-width="3"/><path d="M' + (x - 26) + ' ' + (y - 205) + ' L' + (x + 26) + ' ' + (y - 235) + '" stroke="#1F6A3A" stroke-width="3"/>';
  else for (let j = 0; j < 4; j++) s += '<ellipse cx="' + (x - 24 + j * 16) + '" cy="' + (y - 220 + (j % 2 ? 8 : -8)) + '" rx="6" ry="16" transform="rotate(' + (20 - j * 12) + ' ' + (x - 24 + j * 16) + ' ' + (y - 220) + ')" fill="#8A5A2A" stroke="' + ST25 + '" stroke-width="2"/>';
  return s + '</g>'; }
// Carvon-Skizze (Sechsring, O oben, Seitengruppe mit Keil). m = -1 spiegelt. col = Farbe
function mol25(x, y, sz, m, col, rot) { const P = []; for (let i = 0; i < 6; i++) { const a = (-90 + i * 60) * Math.PI / 180; P.push([Math.cos(a) * 60, Math.sin(a) * 60]); }
  let s = '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + (rot || 0).toFixed(1) + ') scale(' + (sz * m).toFixed(3) + ' ' + sz.toFixed(3) + ')">';
  s += '<path d="M' + P.map(p => p[0].toFixed(0) + ' ' + p[1].toFixed(0)).join(' L') + ' Z" fill="none" stroke="#F4F6FB" stroke-width="12" stroke-linejoin="round"/>';
  s += '<path d="M0 -60 V-120" stroke="#F4F6FB" stroke-width="10"/><path d="M10 -60 V-120" stroke="#F4F6FB" stroke-width="6"/><circle cx="4" cy="-140" r="24" fill="#FF5A5A" stroke="' + ST25 + '" stroke-width="4"/>' + svgT(4, -130, 'O', 26, '#fff');
  s += '<path d="M52 30 L112 64 L60 74 Z" fill="' + col + '" stroke="' + ST25 + '" stroke-width="3"/><path d="M112 64 L150 40 M112 64 L118 110" stroke="#F4F6FB" stroke-width="10" stroke-linecap="round"/><circle cx="150" cy="40" r="14" fill="' + col + '"/><circle cx="118" cy="110" r="14" fill="' + col + '"/>';
  for (const p of P) s += '<circle cx="' + p[0].toFixed(0) + '" cy="' + p[1].toFixed(0) + '" r="13" fill="#2A3560" stroke="#F4F6FB" stroke-width="4"/>';
  return s + '</g>'; }
// Handschuh (links: m = 1, rechts: m = -1), Daumen zeigt nach innen
function glove25(x, y, sz, m, col, rot) { return '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + (rot || 0).toFixed(1) + ') scale(' + (sz * m).toFixed(3) + ' ' + sz.toFixed(3) + ')"><path d="M-50 60 V-30 Q-50 -50 -38 -50 Q-26 -50 -26 -30 V-90 Q-26 -108 -13 -108 Q0 -108 0 -90 V-100 Q0 -118 13 -118 Q26 -118 26 -100 V-86 Q26 -102 38 -102 Q50 -102 50 -86 V-60 Q50 -72 60 -72 Q70 -72 70 -60 V20 Q70 50 50 60 Z" fill="' + col + '" stroke="' + ST25 + '" stroke-width="6" stroke-linejoin="round"/><path d="M-50 10 Q-90 -10 -96 -40 Q-100 -58 -84 -60 Q-70 -60 -62 -36 L-50 -20" fill="' + col + '" stroke="' + ST25 + '" stroke-width="6" stroke-linejoin="round"/><rect x="-54" y="56" width="128" height="26" rx="8" fill="#F4F6FB" stroke="' + ST25 + '" stroke-width="5"/></g>'; }

// ---------- Einstieg ----------
WORLD.c25Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; let s = shop25(t);
  const tipB = lt < 2.4 ? -18 * Math.sin(Math.PI * cl(lt / 2.4)) : 0;
  s += vial25(380, 1128, 'A', {}) + vial25(600, 1128, 'B', { tip: tipB });
  s += cloud25(380, 960, 'mint', cl((lt - .2) / .5) * (lo !== undefined ? 1 : .9), t) + cloud25(600, 960, 'kue', cl((lt - .1) / .4), t);
  if (fr !== undefined) { const k = ease(cl(fr / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.72 * k).toFixed(2) + '"/><g opacity="' + k.toFixed(2) + '">' + mol25(280, 880, .9, 1, MINT25, 0) + mol25(640, 880, .9, -1, KUE25, 0) + svgT(460, 905, '=', 90, '#F4F6FB') + '</g>'; }
  return W(s + shade3()); };
WMASC.c25Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) { const j = Math.sin(Math.PI * cl(lo / .7)); return stay3([XC25 + 40, GC25 - 20 * j], 1, { r: 6 * j, mood: 'happy' }); }
  if (fr !== undefined) return stay3([XC25 + 40, GC25], 1, { r: -6 * Math.sin(Math.PI * cl(fr / 1)), mood: 'shock' });
  const b = lt < .5 ? -10 : 0; return stay3([lerp(XC25 - 70, XC25 + 40, ease(cl((lt - .6) / .5))), GC25 + (lt < .6 ? -18 * Math.sin(Math.PI * cl(lt / .6)) : 0)], 1, { r: b, mood: 'shock' }); };

// ---------- Teil 1: Wie deine Haende ----------
WORLD.c25Hand = function (sc, ev, t, lt) { const zw = ev.zwei, dr = ev.dreh, ch = ev.chiral; let s = shop25(t);
  const k = ease(cl(lt / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.6 * k).toFixed(2) + '"/>';
  s += glove25(260, 1100, .9, 1, '#5CE1FF', 0);
  // rechter Handschuh und rechtes Molekuel drehen sich beim Versuch, aufeinanderzupassen
  let gx = 540, rot = 0, mx = 560, flip = 0;
  if (dr !== undefined) { const q = cl(dr / 3.2); gx = lerp(540, 300, Math.sin(Math.PI * cl(q * 1.6)) * .8); rot = 360 * ease(q); mx = lerp(560, 380, Math.sin(Math.PI * cl(q * 1.6)) * .8); }
  s += glove25(gx, 1100, .9, -1, '#FF9E5A', rot);
  if (zw !== undefined) { const m = ease(cl(zw / .6)); s += '<g opacity="' + m.toFixed(2) + '">' + mol25(280, 800, .9, 1, MINT25, 0) + mol25(mx, 800, .9, -1, KUE25, rot * .5) + '<path d="M420 680 V920" stroke="#F4F6FB" stroke-width="5" stroke-dasharray="14 10" opacity=".7"/></g>' + (dr === undefined ? '<rect x="200" y="930" width="160" height="48" rx="10" fill="#05071A"/><rect x="440" y="930" width="180" height="48" rx="10" fill="#05071A"/>' + svgT(280, 966, 'Minze', 36, MINT25) + svgT(530, 966, 'Kümmel', 36, KUE25) : ''); }
  if (dr !== undefined && dr > 1.2 && dr < 3.4) { const x = cl((dr - 1.2) / .3); s += '<g opacity="' + x.toFixed(2) + '"><circle cx="420" cy="1000" r="46" fill="#E8384F" stroke="#fff" stroke-width="6"/><path d="M400 980 l40 40 M440 980 l-40 40" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>'; }
  return W(s + shade3(), slot(ev, [['zwei', 'Zwei Formen: Carvon'], ['dreh', 'Spiegelbilder passen nie', 'hot'], ['chiral', 'chiral = händig']])); };
WMASC.c25Hand = (ev, t, lt) => { const dr = ev.dreh, ch = ev.chiral;
  if (ch !== undefined) { const j = Math.sin(Math.PI * cl(ch / .8)); return stay3([XC25 + 20, GC25 - 26 * j], 1, { r: 8 * j, mood: 'cool' }); }
  if (dr !== undefined) return stay3([XC25 + 20, GC25], 1, { r: 10 * Math.sin(t * 3), mood: dr > 1.2 ? 'shock' : 'happy' });
  return stay3([mv25(XC25 + 40, XC25 + 20, lt / .5), GC25], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 2: Die Nase (Wissenschaftsmodus) ----------
function sci25(t, ev) { const re = ev.rez, pa = ev.pass, me = ev.meld; let s = '';
  // Riechschleimhaut als Band, darin drei Rezeptoren mit Handschuh-Mulde
  s += '<path d="M180 1010 Q540 960 900 1010 V1060 Q540 1010 180 1060 Z" fill="#FF9EB5" stroke="#F4F6FB" stroke-width="4" opacity=".9"/>';
  const R = [[330, 0], [540, 1], [750, 2]];
  for (const [x, i] of R) { const op = re === undefined ? 0 : cl((re - .3 - i * .3) / .4); if (op <= 0) continue;
    s += '<g opacity="' + op.toFixed(2) + '"><path d="M' + (x - 60) + ' 990 V900 Q' + (x - 60) + ' 860 ' + (x - 30) + ' 860 H' + (x + 30) + ' Q' + (x + 60) + ' 860 ' + (x + 60) + ' 900 V990" fill="#7C5CFF" stroke="#F4F6FB" stroke-width="5"/><path d="M' + (x - 34) + ' 864 Q' + (x - 34) + ' 900 ' + x + ' 912 Q' + (x + 24) + ' 900 ' + (x + 40) + ' 864" fill="#05071A" stroke="#F4F6FB" stroke-width="3"/></g>'; }
  if (pa !== undefined) { const a = ease(cl(pa / 1.4)), b = ease(cl((pa - 1.2) / 1.4));
    s += mol25(lerp(330, 330, a), lerp(560, 800, a), .5, 1, MINT25, 0) + mol25(lerp(750, 750, b), lerp(560, 790, b), .5, -1, KUE25, 18 * b);
    if (a >= 1) for (let i = 0; i < 3; i++) { const q = (t * .9 + i / 3) % 1; s += '<path d="M' + (330 - 40 - 30 * q) + ' ' + (1080 + 90 * q) + ' q40 -20 80 0" stroke="' + MINT25 + '" stroke-width="10" fill="none" stroke-linecap="round" opacity="' + (1 - q).toFixed(2) + '"/>'; }
    if (b >= 1) for (let i = 0; i < 2; i++) { const q = (t * .9 + i / 2) % 1; s += '<path d="M' + (750 - 26 - 20 * q) + ' ' + (1080 + 90 * q) + ' q26 -12 52 0" stroke="' + KUE25 + '" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (.8 * (1 - q)).toFixed(2) + '"/>'; } }
  if (me !== undefined) { const k = ease(cl(me / .6)); s += '<g opacity="' + k.toFixed(2) + '"><path d="M400 1380 Q560 1320 720 1380 Q760 1470 660 1500 Q560 1530 460 1500 Q360 1470 400 1380 Z" fill="#FFB3C7" stroke="#F4F6FB" stroke-width="5"/>' + svgT(560, 1410, 'Gehirn', 30, ST25) + '<circle cx="500" cy="1450" r="34" fill="' + MINT25 + '" stroke="' + ST25 + '" stroke-width="4"/><circle cx="620" cy="1450" r="34" fill="' + KUE25 + '" stroke="' + ST25 + '" stroke-width="4"/>' + svgT(500, 1462, 'M', 32, ST25) + svgT(620, 1462, 'K', 32, ST25) + '</g>'; }
  return s; }
WORLD.c25Nase = function (sc, ev, t, lt) { const bg = fuse33(shop25(t) + vial25(380, 1128, 'A') + vial25(600, 1128, 'B'), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '"><rect x="140" y="640" width="800" height="880" rx="30" fill="#05071A" opacity=".55"/>' + lab33dots() + sci25(t, ev) + '</g>' + shade3(), slot(ev, [['rez', 'Riechrezeptoren: händig'], ['pass', 'Eine Form wirkt stärker', 'hot'], ['meld', 'Minze oder Kümmel']])); };
WMASC.c25Nase = (ev, t, lt) => { const pa = ev.pass; if (pa !== undefined && pa < 3) { const j = Math.sin(Math.PI * cl((pa - 1.2) / .6)); return stay3([XF25, GF25 - 24 * Math.max(0, j)], 1, { r: -8 * Math.max(0, j), mood: 'shock' }); }
  if (ev.rez !== undefined || ev.meld !== undefined) return stay3([XF25, GF25], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  const k = cl(lt / .35); return stay3([lerp(XC25 + 20, XF25, ease(k)), lerp(GC25, GF25, k * k)], 1, { r: 10 * Math.sin(Math.PI * k), mood: 'happy' }); };

// ---------- Teil 3: Nicht jeder riecht's ----------
function dots25(k, t) { let s = '<rect x="-300" y="-300" width="600" height="600" fill="#12182E"/>'; for (let i = 0; i < 100; i++) { const r = Math.floor(i / 10), c = i % 10, grey = [7, 23, 38, 44, 59, 66, 81, 95].includes(i), on = cl(k * 3 - i / 40);
    s += '<circle cx="' + (-225 + c * 50) + '" cy="' + (-225 + r * 50) + '" r="17" fill="' + (grey ? '#5A6278' : MINT25) + '" opacity="' + on.toFixed(2) + '"/>'; } return s; }
function medal25(x, y, k, t) { if (!(k > 0)) return ''; const e = back(cl(k)); return '<g transform="translate(' + x + ' ' + y + ') scale(' + e.toFixed(3) + ')"><circle r="110" fill="#E8B44C" stroke="' + ST25 + '" stroke-width="6"/><circle r="90" fill="none" stroke="#FFE7A8" stroke-width="4"/>' + mol25(-36, 14, .26, 1, MINT25, 0) + mol25(36, 14, .26, -1, KUE25, 0) + svgT(0, -40, '2026', 34, ST25) + '</g>'; }
WORLD.c25Nicht = function (sc, ev, t, lt) { const wo = ev.wo, ri = ev.riech, no = ev.nobel; let s = shop25(t);
  if (wo === undefined) s += vial25(380, 1128, 'A') + vial25(600, 1128, 'B');
  if (wo !== undefined && ri === undefined) { const a = ease(cl(wo / .5)), b = ease(cl((wo - .8) / .5));
    s += '<g opacity="' + a.toFixed(2) + '"><ellipse cx="380" cy="1050" rx="70" ry="36" transform="rotate(-20 380 1050)" fill="' + MINT25 + '" stroke="' + ST25 + '" stroke-width="4"/><path d="M325 1070 L435 1030" stroke="#1F6A3A" stroke-width="4"/></g>';
    s += '<g opacity="' + b.toFixed(2) + '" transform="translate(600 1040)"><path d="M-80 30 Q-90 -50 0 -56 Q90 -50 80 30 Z" fill="#C9944A" stroke="' + ST25 + '" stroke-width="5"/>' + [[-40, -20], [0, -30], [36, -10], [-10, 10], [44, 20]].map(([x, y]) => '<ellipse cx="' + x + '" cy="' + y + '" rx="4" ry="10" fill="#5A3A1A"/>').join('') + '</g>'; }
  if (ri !== undefined && no === undefined) { const k = ease(cl(ri / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * k).toFixed(2) + '"/>' + lupeH(470, 860, 200, dots25(cl((ri - .2) / 1.2), t), k, 380, 1000); }
  if (no !== undefined) { const k = ease(cl(no / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * k).toFixed(2) + '"/>' + medal25(470, 980, cl(no / .6), t); }
  return W(s + shade3(), slot(ev, [['wo', 'Grüne Minze und Kümmel'], ['riech', 'Rund 8 von 100: keine Minze', 'hot'], ['nobel', 'Nobelpreis 2026']])); };
WMASC.c25Nicht = (ev, t, lt) => { const rh = ev.rehook, ri = ev.riech, no = ev.nobel;
  if (no !== undefined) { const j = Math.sin(Math.PI * cl((no - .3) / .7)); return stay3([XC25, GC25 - 30 * j], 1, { r: 8 * j, mood: 'happy' }); }
  if (ri !== undefined) return stay3([XC25, GC25], 1, { r: -8 + 3 * Math.sin(t * 2), mood: 'shock' });
  if (rh !== undefined && ev.wo === undefined) { const k = cl(lt / .8), j = Math.sin(Math.PI * k); return stay3([lerp(XF25, XC25, ease(k)), lerp(GF25, GC25, ease(k)) - 120 * j], 1, { r: -10 * j, mood: 'happy' }); }
  return stay3([XC25, GC25], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.c25Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(shop25(t) + vial25(380, 1128, 'A') + vial25(600, 1128, 'B') + '<defs><linearGradient id="od25" x1="0" y1="0" x2="0" y2="1"><stop offset=".32" stop-color="#05071A" stop-opacity=".92"/><stop offset=".64" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od25)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.c25Out = (ev, t, lt) => stay3([XC25 + 30 * Math.sin(Math.PI * cl((lt - 1) / 5)), GC25 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['c25Hook', 'c25Hand', 'c25Nase', 'c25Nicht', 'c25Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC25); });
