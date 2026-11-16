// P003V3 "Wie laedt dein Handy ohne Kabel?" im Design 3.0. Teile 1 bis 3 und Schluss wortgleich mit P003, neuer Einstieg.
// Ort: Schaltis Schlafzimmer bei Nacht. Auf dem Nachttisch liegt die Ladematte mit dem Handy (Hauptobjekt).
//   Einstieg, Teil 3, Schluss: Blick aufs Zimmer mit Nachttisch
//   Teil 1 und 2: die Kamera ist nah an der Matte, Schalti steht selbst auf dem Nachttisch. Die Matte wird durchsichtig und zeigt ihre Spule,
//   das Handy kommt dazu und zeigt seine Spule. Nichts ist doppelt: es gibt eine Matte und ein Handy
// Helfer aus viz_v3.js und viz_v3b.js. Zum Loeschen dieser Fassung: diese Datei und videos/P003V3.

// ---------- Blick aufs Zimmer ----------
// o: px (Mitte des Handys, 580 = mittig), on (laedt), bub (Blase: 'on', 'off', 'ask' oder leer), xray (Spulen sichtbar), cas (Huelle und Metall 0 bis 1), net (Netzteil betont 0 bis 1), noph
function bedroom3(t, o) { o = o || {}; const on = !!o.on, px = o.px === undefined ? 580 : o.px;
  let s = room3(t, { id: 'p3', a: '#070826', b: '#15175A', c: '#2C2A8C', fl: '#0A0A26', fs: '#15154A', ln: '#7FD9FF', glow: [580, 960, 520, 380, '#5CE1FF', on ? .5 : .22] });
  s += win3(90, 650, 250, 270, t, 'night', 'p3', '#3A3F9A');
  // Bett
  s += '<rect x="-20" y="1190" width="62" height="358" rx="14" fill="#2A2466" stroke="#0B1020" stroke-width="5"/><rect x="-40" y="1430" width="410" height="44" rx="10" fill="#1E1A52" stroke="#0B1020" stroke-width="5"/><rect x="334" y="1474" width="22" height="74" fill="#1E1A52"/><rect x="-40" y="1336" width="400" height="100" rx="30" fill="#3B3690" stroke="#0B1020" stroke-width="5"/><path d="M120 1340 Q240 1310 360 1352 V1436 H120 Z" fill="#5B4FC8" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><ellipse cx="76" cy="1326" rx="84" ry="32" fill="#DCE0FF" stroke="#0B1020" stroke-width="5"/>';
  // Steckdose, Netzteil, Kabel
  const nk = cl(o.net || 0);
  if (nk > 0) s += '<circle cx="820" cy="852" r="' + (86 + 8 * Math.sin(t * 5)) + '" fill="#3DFF7A" opacity="' + (.22 * nk) + '"/>';
  s += '<rect x="776" y="796" width="88" height="88" rx="14" fill="#DCE0FF" stroke="#0B1020" stroke-width="5"/><rect x="794" y="824" width="52" height="78" rx="10" fill="#F4F6FB" stroke="#0B1020" stroke-width="5"/>' + bolt3(820, 860, .42, '#5CE1FF') + '<path d="M820 902 C 834 990, 790 1028, 728 1028" stroke="#C9CFDD" stroke-width="7" fill="none" stroke-linecap="round"/>';
  // Nachttisch
  s += '<rect x="420" y="1066" width="460" height="446" rx="8" fill="#5E3B28" stroke="#0B1020" stroke-width="6"/><rect x="450" y="1104" width="400" height="160" rx="10" fill="#6E4630" stroke="#0B1020" stroke-width="5"/><rect x="450" y="1292" width="400" height="190" rx="10" fill="#6E4630" stroke="#0B1020" stroke-width="5"/><circle cx="650" cy="1184" r="14" fill="#FFD23F" stroke="#0B1020" stroke-width="4"/><circle cx="650" cy="1386" r="14" fill="#FFD23F" stroke="#0B1020" stroke-width="4"/><rect x="434" y="1510" width="22" height="38" fill="#3E2618"/><rect x="844" y="1510" width="22" height="38" fill="#3E2618"/><rect x="400" y="1038" width="500" height="32" rx="10" fill="#8A5A3C" stroke="#0B1020" stroke-width="6"/>';
  // Matte
  if (on) s += '<ellipse cx="580" cy="1010" rx="' + (190 + 10 * Math.sin(t * 4)) + '" ry="46" fill="#5CE1FF" opacity=".28"/>';
  s += '<rect x="430" y="1012" width="300" height="28" rx="14" fill="#E8ECF8" stroke="#0B1020" stroke-width="6"/><circle cx="706" cy="1026" r="6" fill="' + (on ? '#3DFF7A' : '#FF8A3D') + '"/>';
  if (o.xray) s += '<rect x="500" y="1021" width="160" height="9" rx="4" fill="#FF9A50"/><path d="M580 1010 V1042" stroke="#FF9A50" stroke-width="4" stroke-dasharray="6 6"/>';
  // Handy, liegt flach auf der Matte
  if (!o.noph) { const c = cl(o.cas || 0), lift = 16 * c, y = 1012 - lift;
    if (c > 0) s += '<g opacity="' + c + '"><rect x="' + (px - 134) + '" y="' + (y - 32) + '" width="268" height="40" rx="14" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/><rect x="' + (px - 60) + '" y="' + (y + 6) + '" width="120" height="11" rx="4" fill="#AEB6C6" stroke="#0B1020" stroke-width="4"/></g>';
    s += '<rect x="' + (px - 120) + '" y="' + (y - 24) + '" width="240" height="24" rx="10" fill="#1B2748" stroke="#F4F6FB" stroke-width="6"/><rect x="' + (px + 70) + '" y="' + (y - 30) + '" width="30" height="8" rx="4" fill="#F4F6FB"/>';
    if (o.xray) s += '<rect x="' + (px - 65) + '" y="' + (y - 16) + '" width="130" height="8" rx="4" fill="#FFB870"/><path d="M' + px + ' ' + (y - 60) + ' V' + (y - 2) + '" stroke="#FFB870" stroke-width="4" stroke-dasharray="6 6"/>';
    if (on) for (let i = 0; i < 3; i++) { const q = (t * 1.1 + i / 3) % 1; s += '<path d="M' + (px - 70 + i * 70 - 16) + ' ' + (1008 - 40 * q) + ' q16 -14 32 0" stroke="#5CE1FF" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (1 - q) + '"/>'; } }
  // Blase ueber dem Handy
  if (o.bub) { const st = o.bub, col = st === 'on' ? '#3DFF7A' : '#FF5A5A', bx = px, by = 838 + 6 * Math.sin(t * 2.4);
    s += '<path d="M' + (bx - 22) + ' ' + (by + 84) + ' L' + bx + ' ' + (by + 128) + ' L' + (bx + 22) + ' ' + (by + 84) + ' Z" fill="#0B1020" stroke="' + col + '" stroke-width="7" stroke-linejoin="round"/><circle cx="' + bx + '" cy="' + by + '" r="92" fill="#0B1020" stroke="' + col + '" stroke-width="7"/>';
    s += batt3(bx, by + 4, 1, st === 'on' ? .2 + .8 * ((t * .45) % 1) : .12, col);
    if (st === 'on') s += bolt3(bx - 4, by + 4, .8, '#FFE14D'); else if (st === 'off') s += '<path d="M' + (bx - 40) + ' ' + (by - 36) + ' L' + (bx + 32) + ' ' + (by + 44) + '" stroke="#FF5A5A" stroke-width="12" stroke-linecap="round"/>'; else s += svgT(bx - 4, by + 26, '?', 64, '#FF5A5A'); }
  return s; }

// Gag aus dem Objekt: Schalti will auch geladen werden. Er laeuft waehrend "Gib mir 60 Sekunden" zum Nachttisch, springt beim Nachsatz auf die Matte
// und schiebt dabei das Handy von der Mitte. Das Laden bricht ab. Ertappt springt er uebers Handy, schiebt es zurueck und laeuft heim. Einschlag bei 0,4 s
const gpx3 = e => e === undefined || e < .4 ? 580 : e < .6 ? lerp(580, 690, ease((e - .4) / .2)) : e < 1.65 ? 690 : e < 2 ? lerp(690, 580, (e - 1.65) / .35) : 580;
WORLD.h7p3_3 = function (sc, ev, t, lt) { const e = ev.gag, hit = e !== undefined && e >= .4 ? e - .4 : undefined, sh = shake7(hit, t), on = e === undefined || e < .4 || e >= 2;
  let s = bedroom3(t, { px: gpx3(e), on: on, bub: on ? 'on' : 'off' });
  if (hit !== undefined && hit < 1.2) s += word7('UPS!', 790, 800, hit, '#FF5A5A', -6);
  return W('<g transform="translate(' + (sh[0] * .5) + ' ' + (sh[1] * .5) + ')">' + s + '</g>' + shade3()); };
WMASC.h7p3_3 = (ev, t, lt, sc) => { const e = ev.gag, T = 1040;
  if (e === undefined) { const q = since3(sc, 3, lt); if (q < 0) return stay3(HOME3, 1, { r: -3 + 2 * Math.sin(t * 2) }); const k = cl(q / .6); return k < 1 ? { f: [lerp(220, 395, k), 1537], s: 1, walk: true, nospin: 1 } : stay3([395, 1537 - 5 * Math.abs(Math.sin(t * 5))], 1, { r: 4 }); }
  if (e < .4) return hop3(e / .4, [395, 1537], [470, T], 190, 1, .5);
  if (e < 1.3) return stay3([470 + 3 * Math.sin(t * 40) * (1 - cl((e - .4) / .3)), T], .5, { r: -6 });
  if (e < 1.65) return hop3((e - 1.3) / .35, [470, T], [868, T], 170, .5, .5);
  if (e < 2) return stay3([lerp(868, 758, (e - 1.65) / .35), T], .5, { flip: true, walk: true });
  if (e < 2.65) return hop3((e - 2) / .65, [758, T], HOME3, 170, .5, 1, { flip: e < 2.55 });
  return stay3(HOME3, 1); };

// ---------- Nah an der Matte: Schalti steht auf dem Nachttisch ----------
const PC3 = [600, 1050], PW3 = 5.7; // Mitte der Matte, Takt des Wechselstroms
function desk3(t) { let s = '<defs><linearGradient id="d3w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070826"/><stop offset="1" stop-color="#2C2A8C"/></linearGradient><linearGradient id="d3t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A26C48"/><stop offset="1" stop-color="#6E4630"/></linearGradient></defs><rect width="1080" height="1100" fill="url(#d3w)"/>';
  s += '<circle cx="190" cy="790" r="120" fill="#FFF1C4" opacity=".1"/><circle cx="190" cy="790" r="64" fill="#FFF1C4" opacity=".16"/>';
  for (let i = 0; i < 6; i++) s += '<circle cx="' + (80 + rnd(i + 3) * 900) + '" cy="' + (640 + rnd(i + 13) * 380) + '" r="' + (30 + 50 * rnd(i + 23)) + '" fill="#5CE1FF" opacity=".04"/>';
  s += '<rect y="1086" width="1080" height="466" fill="url(#d3t)"/>'; for (let i = 0; i < 6; i++) s += '<path d="M0 ' + (1130 + i * 70) + ' Q540 ' + (1118 + i * 74) + ' 1080 ' + (1136 + i * 70) + '" stroke="#5E3B28" stroke-width="4" fill="none" opacity=".5"/>';
  return s + '<path d="M0 1086 H1080" stroke="#C99A72" stroke-width="5"/><rect y="1548" width="1080" height="372" fill="#3E2618"/><path d="M0 1548 H1080" stroke="#FFC890" stroke-width="6"/>'; }
// Matte von schraeg oben. x 0 bis 1: Deckel wird durchsichtig, Spule sichtbar. cur: Strom fliesst (Punkte pendeln)
function padT3(t, x, cur) { const cx = PC3[0], cy = PC3[1]; let s = '<path d="M' + (cx - 320) + ' ' + cy + ' v36 a320 76 0 0 0 640 0 v-36 Z" fill="#9AA3BE" stroke="#0B1020" stroke-width="6"/><ellipse cx="' + cx + '" cy="' + cy + '" rx="320" ry="76" fill="' + lc('#E8ECF8', '#22306A', x) + '" stroke="#0B1020" stroke-width="6"/>';
  s += '<path d="M' + (cx + 318) + ' ' + (cy + 18) + ' C 990 ' + (cy + 30) + ', 1040 ' + (cy - 20) + ', 1100 ' + (cy - 30) + '" stroke="#C9CFDD" stroke-width="12" fill="none" stroke-linecap="round"/>';
  if (x > 0) { s += '<g opacity="' + x + '">'; for (let i = 0; i < 7; i++) { const rx = 70 + i * 34; s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + (rx * .23) + '" fill="none" stroke="#FF9A50" stroke-width="11"/>'; }
    if (cur) for (let i = 0; i < 7; i++) for (let j = 0; j < 3; j++) { const rx = 70 + i * 34, a = j * 2.09 + i * .7 + 1.1 * Math.sin(t * PW3); s += '<circle cx="' + (cx + rx * Math.cos(a)) + '" cy="' + (cy + rx * .23 * Math.sin(a)) + '" r="8" fill="#FFF3A8" stroke="#0B1020" stroke-width="3"/>'; }
    s += '</g>'; }
  return s; }
// Magnetfeld: kippt im Takt des Stroms, wird nach oben schnell schwaecher. k Staerke 0 bis 1
function field3(t, k) { if (k <= 0) return ''; const cx = PC3[0], cy = PC3[1] - 8, sg = Math.cos(t * PW3), up = sg > 0, col = up ? '#5CE1FF' : '#FF6BD6', id = up ? 'f3u' : 'f3d', op = k * (.25 + .75 * Math.abs(sg));
  let s = '<defs><linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="0" y1="' + cy + '" x2="0" y2="' + (cy - 330) + '"><stop offset="0" stop-color="' + col + '"/><stop offset=".55" stop-color="' + col + '" stop-opacity=".55"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></linearGradient></defs><g opacity="' + op + '">';
  [-2, -1, 1, 2].forEach(j => { const x0 = cx + j * 55, hh = 150 + 90 * Math.abs(j), x2 = cx + j * 150 + Math.sign(j) * 60; s += '<path d="M' + x0 + ' ' + cy + ' C ' + x0 + ' ' + (cy - hh * 1.5) + ', ' + x2 + ' ' + (cy - hh * 1.5) + ', ' + x2 + ' ' + (cy + 16) + '" stroke="url(#' + id + ')" stroke-width="9" fill="none" stroke-linecap="round"/>'; });
  s += '<path d="M' + cx + ' ' + cy + ' V' + (cy - 330) + '" stroke="url(#' + id + ')" stroke-width="9" stroke-linecap="round"/>';
  [-110, 0, 110].forEach(dx => { const y = cy - 70 - 12 * Math.abs(dx) / 110; s += '<path d="M' + (cx + dx - 18) + ' ' + (y + (up ? 18 : -18)) + ' L' + (cx + dx) + ' ' + (y + (up ? -8 : 8)) + ' L' + (cx + dx + 18) + ' ' + (y + (up ? 18 : -18)) + '" stroke="' + col + '" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; });
  return s + '</g>'; }
// Handy von schraeg oben, durchsichtig mit eigener Spule. yc Mitte, run: Elektronen pendeln (0 bis 1)
function phT3(yc, t, run, k) { const cx = PC3[0]; let s = '<g transform="translate(' + cx + ' ' + yc + ') scale(' + back(cl(k === undefined ? 1 : k)) + ')"><g transform="translate(0 20) scale(1 .23)"><rect x="-270" y="-250" width="540" height="500" rx="80" fill="#0B1020" stroke="#0B1020" stroke-width="24"/></g><g transform="scale(1 .23)"><rect x="-270" y="-250" width="540" height="500" rx="80" fill="#1B2748" fill-opacity=".62" stroke="#F4F6FB" stroke-width="30"/></g>';
  for (let i = 0; i < 5; i++) { const rx = 60 + i * 30; s += '<ellipse rx="' + rx + '" ry="' + (rx * .23) + '" fill="none" stroke="#FFB870" stroke-width="9"/>'; }
  for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) { const rx = 60 + i * 30, a = j * 3.14 + i * .9 + 1.1 * run * Math.sin(t * PW3 + 1.2); s += '<circle cx="' + (rx * Math.cos(a)) + '" cy="' + (rx * .23 * Math.sin(a)) + '" r="7" fill="' + (run > 0 ? '#FFF3A8' : '#8A93B0') + '" stroke="#0B1020" stroke-width="3"/>'; }
  return s + '<circle cx="-215" cy="-22" r="12" fill="#0B1020" stroke="#F4F6FB" stroke-width="4"/></g>'; }

// Teil 1: Spule in der Matte, Wechselstrom, kippendes Magnetfeld, reicht nur kurz
WORLD.p3a_3 = function (sc, ev, t, lt) { const p1 = ev.p1, p2 = ev.p2, a = ev.act;
  let s = desk3(t) + padT3(t, ease(cl((lt - .5) / .7)), p1 !== undefined);
  if (lt > 1.3 && p1 === undefined) s += chip3(600, 880, 'Kupferspule', 40, '#FF9A50', '#0B1020', (lt - 1.3) / .3);
  if (p1 !== undefined && p2 === undefined) { const sg = Math.cos(t * PW3) > 0; s += '<g transform="translate(600 850) scale(' + back(cl(p1 / .35)) + ')"><circle r="78" fill="#0B1020" stroke="#FFE14D" stroke-width="7"/><path d="M-44 0 q22 -44 44 0 t44 0" stroke="#FFE14D" stroke-width="10" fill="none" stroke-linecap="round"/></g>' + arrow3(sg ? 430 : 770, 960, sg ? 770 : 430, 960, '#FFF3A8', 9, cl(p1 / .3) * (.3 + .7 * Math.abs(Math.cos(t * PW3)))); }
  if (p2 !== undefined) s += field3(t, cl(p2 / .5));
  if (a !== undefined) { const k = cl(a / .4); s += '<g opacity="' + k + '"><path d="M250 790 H950" stroke="#F4F6FB" stroke-width="5" stroke-dasharray="14 14"/></g>' + chip3(600, 740, 'hier schon zu schwach', 34, '#F4F6FB', '#0B1020', (a - .3) / .3) + arrow3(930, 1010, 930, 810, '#FFE14D', 8, k) + arrow3(930, 810, 930, 1010, '#FFE14D', 8, k); }
  return W(s + shade3(), slot(ev, [['panel', 'In der Matte: eine Kupferspule'], ['p1', 'Wechselstrom: Richtung wechselt ständig', 'hot'], ['p2', 'Das Magnetfeld kippt mit'], ['act', 'Reicht nur ganz kurz', 'hot']])); };
// Schalti kippt im Takt des Feldes mit
WMASC.p3a_3 = (ev, t) => ev.p2 === undefined ? BIG3() : stay3(HOME3, 1, { r: 11 * Math.cos(t * PW3) * cl(ev.p2 / .5) });

// Teil 2: zweite Spule im Handy, Feld schiebt Elektronen an, Strom in den Akku, Induktion, anheben stoppt das Laden
const PH3 = { up: 800, on: 1014, lift: 838 };
WORLD.p3b_3 = function (sc, ev, t, lt) { const p1 = ev.p1, p2 = ev.p2, p3 = ev.p3, a = ev.act, a2 = ev.act2;
  const yc = a2 !== undefined ? lerp(PH3.on, PH3.lift, ease(cl(a2 / .45))) : p1 !== undefined ? lerp(PH3.up, PH3.on, ease(cl(p1 / .6))) : PH3.up + 8 * Math.sin(t * 2.2);
  const off = a2 !== undefined && a2 > .3, run = off ? 0 : p2 === undefined ? 0 : cl(p2 / .4);
  let s = desk3(t) + padT3(t, 1, true) + field3(t, 1) + phT3(yc, t, run, (lt - .2) / .45);
  if (p1 === undefined) s += chip3(600, 715, 'zweite Spule', 40, '#FFB870', '#0B1020', (lt - 1) / .3);
  if (p3 !== undefined) { const f = off ? .12 : .15 + .85 * cl(p3 / 2.2), col = off ? '#FF5A5A' : '#3DFF7A', by = yc - 215;
    s += '<path d="M690 ' + (yc - 30) + ' Q 760 ' + (yc - 110) + ' 800 ' + (by + 34) + '" stroke="' + (off ? '#8A93B0' : '#FFF3A8') + '" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="4 16" stroke-dashoffset="' + (off ? 0 : -t * 90) + '"/><g transform="translate(800 ' + by + ') scale(' + back(cl(p3 / .35)) + ')">' + batt3(0, 0, 1.25, f, col) + (off ? '' : bolt3(-4, 0, .85, '#FFE14D')) + '</g>';
    if (off) s += okx1(880, by - 50, 30, false, (a2 - .3) / .3); }
  if (a !== undefined && a2 === undefined) s += '<g transform="translate(410 ' + (yc - 215) + ') scale(' + back(cl(a / .35)) + ') rotate(' + (-4 + 1.5 * Math.sin(t * 4)) + ')"><rect x="-180" y="-52" width="360" height="104" rx="28" fill="#FFD23F" stroke="#0B1020" stroke-width="7"/>' + svgT(0, 20, 'Induktion', 56, '#0B1020') + '</g>';
  return W(s + shade3(), slot(ev, [['panel', 'Im Handy: eine zweite Spule'], ['p1', 'Das Feld geht durch die Handy-Spule'], ['p2', 'Feld schiebt die Elektronen an', 'hot'], ['p3', 'Strom fließt in den Akku'], ['act', 'Das ist Induktion', 'hot'], ['act2', 'Zu weit weg: Laden stoppt', 'hot']])); };
// Schalti stellt sich auf die Matte und stemmt das Handy hoch
WMASC.p3b_3 = (ev, t) => { const a2 = ev.act2; if (a2 === undefined) return BIG3(); return a2 < .45 ? hop3(a2 / .45, HOME3, [600, 1046], 150, 1, .6) : stay3([600, 1046], .6, { r: 3 * Math.sin(t * 9) }); };

// Teil 3: zurueck im Zimmer. Schief, Metall, dann die drei Handgriffe
const sx3 = ev => ev.p1 !== undefined ? lerp(690, 580, ease(cl((ev.p1 - .35) / .35))) : ev.schief !== undefined ? lerp(580, 690, ease(cl(ev.schief / .5))) : 580;
WORLD.p3c_3 = function (sc, ev, t, lt) { const sf = ev.schief, me = ev.metall, p1 = ev.p1, p2 = ev.p2, p3 = ev.p3, a = ev.act;
  const cas = p2 !== undefined ? 1 - cl(p2 / .3) : me !== undefined ? cl(me / .4) : 0, good = p3 !== undefined;
  let s = bedroom3(t, { px: sx3(ev), on: good, xray: 1, cas: cas, bub: good ? 'on' : sf === undefined ? 'ask' : 'off', net: p3 === undefined ? 0 : p3 / .4 });
  if (p2 !== undefined && p2 < .9) { const k = p2 / .9; s += '<g transform="translate(' + (580 + 330 * k) + ' ' + (980 - 520 * k + 500 * k * k) + ') rotate(' + (k * 300) + ')" opacity="' + (1 - k) + '"><rect x="-134" y="-20" width="268" height="40" rx="14" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/></g><g transform="translate(' + (580 - 260 * k) + ' ' + (1000 - 420 * k + 460 * k * k) + ') rotate(' + (-k * 400) + ')" opacity="' + (1 - k) + '"><rect x="-60" y="-6" width="120" height="12" rx="4" fill="#AEB6C6" stroke="#0B1020" stroke-width="4"/></g>'; }
  if (me !== undefined && p2 === undefined) s += chip3(690, 1128, 'Metall', 30, '#AEB6C6', '#0B1020', (me - .5) / .3);
  if (p1 !== undefined && p1 > .7) s += okx1(470, 960, 30, true, (p1 - .7) / .3);
  if (p3 !== undefined) s += okx1(900, 800, 30, true, (p3 - .3) / .3);
  if (a !== undefined) s += '<g transform="translate(250 1010) scale(' + back(cl(a / .35)) + ') rotate(-5)"><rect x="-170" y="-50" width="340" height="100" rx="26" fill="#FFD23F" stroke="#0B1020" stroke-width="7"/>' + svgT(0, 17, 'prüfen lassen', 44, '#0B1020') + '</g>';
  return W(s + shade3(), slot(ev, [['panel', 'Lädt nicht?'], ['schief', 'Schief: Spulen verfehlen sich', 'hot'], ['metall', 'Dicke Hülle oder Metall stört', 'hot'], ['p1', '1. Mittig auflegen'], ['p2', '2. Hülle und Metall weg'], ['p3', '3. Empfohlenes Netzteil'], ['act', 'Sonst: prüfen lassen', 'hot']])); };
// Schalti schiebt das Handy selbst in die Mitte und springt wieder herunter
WMASC.p3c_3 = (ev, t) => { const p1 = ev.p1, p2 = ev.p2, p3 = ev.p3, T = 1040;
  if (p1 === undefined) return BIG3();
  if (p3 !== undefined) return p3 < .5 ? hop3(p3 / .5, [758, T], HOME3, 170, .5, 1, { flip: p3 < .4 }) : BIG3();
  if (p2 !== undefined) return stay3([758, T - 60 * Math.abs(Math.sin(Math.PI * cl(p2 / .4)))], .5, { flip: true });
  if (p1 < .35) return hop3(p1 / .35, HOME3, [868, T], 230, 1, .5);
  return stay3([lerp(868, 758, cl((p1 - .35) / .35)), T], .5, { flip: true, walk: p1 < .7 }); };

// Schluss: das Handy laedt ruhig
WORLD.p3outro_3 = function (sc, ev, t) { return W(bedroom3(t, { on: 1 }) + shade3()); };
['h7p3_3', 'p3a_3', 'p3b_3', 'p3c_3', 'p3outro_3'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#5CE1FF'); });
