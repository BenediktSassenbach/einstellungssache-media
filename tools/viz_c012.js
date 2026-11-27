// C012 "Warum leuchtet Feuerwerk bunt?" (Chemie, Skript 4 mit Abschnitt 9 und Neue Werkzeuge, Kostuem Labor), stumme Demo v1 (27.11.2026).
// Ort eigens gebaut: Holzsteg an einem See in der Silvesternacht, Feuerwerk spiegelt sich im Wasser. Nur Erklaerung, keine Anleitung.
// Teil 1: die eine Lupe (Leuchtkugel mit Metallsalz-Koernern), Farbkarten. Teil 2: Wissenschaftsmodus (Energietreppe, Elektron springt hoch und faellt zurueck, Licht).
// Teil 3: Blau ist schwer (Thermometer, Blau verblasst). Nutzt lupeH, fuse33, lab33, lab33dots, slot, stay3, look3. Zum Loeschen: diese Datei und videos/C012.
var AC12c = '#FF6BD6', ST12c = '#0B1020', XC12C = 790, GC12C = 1140, XF12c = 270, GF12c = 1537;
const mv12c = (a, b, k) => lerp(a, b, ease(cl(k)));
const COL12 = { rot: '#FF3B4E', gruen: '#3EE07A', blau: '#3B7BFF', gelb: '#FFD23F' };

function burst12(x, y, a, col, r0, pale) { if (a < 0 || a > 2.2) return ''; r0 = r0 || 120; const k = ease(cl(a / .6)), f = 1 - cl((a - 1) / 1.2); let s = '';
  for (let i = 0; i < 18; i++) { const g = i / 18 * Math.PI * 2, r = r0 * k, px = x + Math.cos(g) * r, py = y + Math.sin(g) * r + 36 * a * a; s += '<path d="M' + (x + Math.cos(g) * r * .55).toFixed(0) + ' ' + (y + Math.sin(g) * r * .55 + 26 * a * a).toFixed(0) + ' L' + px.toFixed(0) + ' ' + py.toFixed(0) + '" stroke="' + col + '" stroke-width="7" stroke-linecap="round" opacity="' + (f * (pale ? .45 : 1)).toFixed(2) + '"/>'; }
  return s; }
// Ort: See mit Steg. bursts = [[x,y,a,col,r]] werden auch gespiegelt
function lake12(t, bursts) { bursts = bursts || []; let b = ''; bursts.forEach(q => b += burst12(q[0], q[1], q[2], q[3], q[4], q[5]));
  let s = '<defs><linearGradient id="sk12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070822"/><stop offset="1" stop-color="#1C1A48"/></linearGradient><linearGradient id="wa12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141A3E"/><stop offset="1" stop-color="#070A1E"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk12)"/>';
  for (let i = 0; i < 36; i++) s += '<circle cx="' + (rnd(i + 700) * 1080).toFixed(0) + '" cy="' + (60 + rnd(i + 701) * 680).toFixed(0) + '" r="' + (1 + 1.5 * rnd(i + 702)).toFixed(1) + '" fill="#fff" opacity="' + (.3 + .3 * Math.sin(t + i)).toFixed(2) + '"/>';
  s += b + '<path d="M0 960 L120 900 L260 930 L420 880 L600 920 L780 870 L940 910 L1080 890 V980 H0 Z" fill="#11143A"/>';
  s += '<rect x="0" y="980" width="1080" height="940" fill="url(#wa12)"/><g opacity=".35" transform="translate(0 1960) scale(1 -1)">' + b + '</g>';
  for (let i = 0; i < 10; i++) { const y = 1010 + i * 26, w = 120 + 60 * rnd(i + 720); s += '<rect x="' + ((rnd(i + 721) * 900 + t * 20 * (i % 2 ? 1 : -1)) % 1000).toFixed(0) + '" y="' + y + '" width="' + w.toFixed(0) + '" height="3" fill="#8FA0E0" opacity=".25"/>'; }
  // Steg rechts
  s += '<path d="M600 1140 L1080 1140 L1080 1170 L600 1170 Z" fill="#8A5A3A" stroke="' + ST12c + '" stroke-width="5"/>'; for (let i = 0; i < 8; i++) s += '<path d="M' + (610 + i * 60) + ' 1142 v26" stroke="#5E3A22" stroke-width="3"/>';
  [640, 820, 1000].forEach(x => s += '<rect x="' + (x - 10) + '" y="1170" width="20" height="240" fill="#6A4228" stroke="' + ST12c + '" stroke-width="4"/>');
  s += '<rect x="940" y="1040" width="14" height="100" fill="#6A4228" stroke="' + ST12c + '" stroke-width="3"/><circle cx="947" cy="1030" r="18" fill="#FFD27A" opacity="' + (.8 + .2 * Math.sin(t * 4)).toFixed(2) + '"/><circle cx="947" cy="1030" r="40" fill="#FFD27A" opacity=".2"/>';
  return s; }
function card12(x, y, el, farbe, col, k) { if (!(k > 0)) return ''; const e = back(cl(k)); return '<g transform="translate(' + x + ' ' + y + ') scale(' + e.toFixed(3) + ')"><rect x="-120" y="-44" width="240" height="88" rx="16" fill="#0B0F2A" stroke="' + col + '" stroke-width="5"/>' + svgT(0, -6, el, 32, '#F4F6FB') + svgT(0, 30, farbe, 30, col) + '</g>'; }

// ---------- Einstieg ----------
WORLD.c12Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; const B = [[300, 780, lt - .1, COL12.rot, 110], [560, 740, lt - .6, COL12.gruen, 110], [400, 820, lt - 1.1, COL12.blau, 100]];
  if (fr !== undefined) B.push([500, 780, fr - .1, COL12.gelb, 110]);
  if (lo !== undefined) B.push([420, 790, lo % 2.2, COL12.blau, 110, lo > 1]);
  let s = lake12(t, B);
  if (lo !== undefined) { const k = back(cl((lo - .8) / .5)); s += '<g transform="translate(420 790) scale(' + k.toFixed(3) + ')"><circle r="56" fill="#0B0F2A" stroke="#F4F6FB" stroke-width="5"/>' + svgT(0, 22, '?', 64, '#9FC2FF') + '</g>'; }
  return W(s + shade3()); };
WMASC.c12Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop; if (lo !== undefined) return stay3([XC12C, GC12C], 1, { r: -6, mood: 'happy' });
  if (fr !== undefined) { const j = Math.sin(Math.PI * cl(fr / .8)); return stay3([XC12C, GC12C - 30 * j], 1, { r: -8 * j, mood: 'shock' }); }
  return stay3([XC12C, GC12C], 1, { r: 4 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 1: Metall macht die Farbe ----------
function ball12(t) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#0B0F2A"/><circle r="200" fill="#3A3550" stroke="#F4F6FB" stroke-width="6"/>';
  const cs = [COL12.rot, COL12.gruen, COL12.blau, COL12.gelb]; for (let i = 0; i < 46; i++) { const a = rnd(i + 740) * Math.PI * 2, r = 170 * Math.sqrt(rnd(i + 741)); s += '<rect x="' + (Math.cos(a) * r - 9).toFixed(0) + '" y="' + (Math.sin(a) * r - 9).toFixed(0) + '" width="18" height="18" rx="3" transform="rotate(' + (rnd(i) * 90).toFixed(0) + ' ' + (Math.cos(a) * r).toFixed(0) + ' ' + (Math.sin(a) * r).toFixed(0) + ')" fill="' + cs[i % 4] + '"/>'; }
  s += '<rect x="-170" y="232" width="340" height="62" rx="14" fill="#05071A"/>' + svgT(0, 276, 'Metallsalze', 40, '#F4F6FB'); return s; }
WORLD.c12Metall = function (sc, ev, t, lt) { const sa = ev.salz, rg = ev.rotgruen, bg = ev.blaugelb; let B = [];
  if (rg !== undefined) B = [[290, 760, rg - .1, COL12.rot, 90], [560, 760, rg - .7, COL12.gruen, 90]];
  if (bg !== undefined) B = [[290, 760, bg - .1, COL12.blau, 90], [560, 760, bg - .7, COL12.gelb, 90]];
  let s = lake12(t, B);
  if (sa !== undefined && rg === undefined) { const k = ease(cl(sa / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * k).toFixed(2) + '"/>' + lupeH(420, 860, 210, ball12(t), k); }
  if (rg !== undefined && bg === undefined) s += card12(290, 920, 'Strontium', 'rot', COL12.rot, rg / .5) + card12(560, 920, 'Barium', 'grün', COL12.gruen, (rg - .7) / .5);
  if (bg !== undefined) s += card12(290, 920, 'Kupfer', 'blau', COL12.blau, bg / .5) + card12(560, 920, 'Natrium', 'gelb', COL12.gelb, (bg - .7) / .5);
  return W(s + shade3(), slot(ev, [['salz', 'Metallsalze in der Kugel'], ['rotgruen', 'Jedes Metall: eigene Farbe', 'hot'], ['blaugelb', 'Kupfer blau, Natrium gelb']])); };
WMASC.c12Metall = (ev, t, lt) => { const rg = ev.rotgruen, bg = ev.blaugelb; const q = bg !== undefined ? bg : rg;
  if (q !== undefined) { const j = Math.sin(Math.PI * cl((q - .1) / .6)); return stay3([XC12C, GC12C - 26 * Math.max(0, j)], 1, { r: -6 * j, mood: 'happy' }); }
  return stay3([mv12c(XC12C + 20, XC12C, lt / .5), GC12C], 1, { r: 3 * Math.sin(t * 2), mood: 'cool' }); };

// ---------- Teil 2: Elektronen springen (Wissenschaftsmodus) ----------
// Energietreppe bei (x,y): Stufen h, Elektron springt hoch (up 0..1) und faellt (dn 0..1), Licht in col
function stairs12(x, y, top, up, dn, col, lab) { let s = '<path d="M' + (x - 110) + ' ' + y + ' H' + (x + 110) + '" stroke="#F4F6FB" stroke-width="6"/><path d="M' + (x - 110) + ' ' + (y - top) + ' H' + (x + 110) + '" stroke="#F4F6FB" stroke-width="6" stroke-dasharray="14 8"/>';
  s += svgT(x, y + 50, lab, 30, '#F4F6FB');
  const ey = up < 1 ? lerp(y, y - top, ease(cl(up))) : lerp(y - top, y, ease(cl(dn)));
  s += '<circle cx="' + x + '" cy="' + (ey - 14).toFixed(0) + '" r="14" fill="#5CE1FF" stroke="#F4F6FB" stroke-width="3"/>';
  if (dn > .3) { const k = cl((dn - .3) / .7); let w = 'M' + (x + 30) + ' ' + (y - top / 2); for (let i = 0; i < 4; i++) w += ' q12 -18 24 0 q12 18 24 0'; s += '<path d="' + w + '" fill="none" stroke="' + col + '" stroke-width="7" opacity="' + k.toFixed(2) + '" transform="translate(' + (20 * k).toFixed(0) + ' 0)"/>'; }
  return s; }
function sci12c(t, ev) { const hi = ev.hitze, zu = ev.zurueck, fe = ev.fest; let s = '';
  if (hi !== undefined && fe === undefined) { const up = cl((hi - .2) / .8), dn = zu !== undefined ? cl((zu - .2) / .8) : 0; s += '<rect x="230" y="660" width="620" height="420" rx="20" fill="#05071A" opacity=".8"/>' + stairs12(450, 980, 200, up, dn, COL12.gruen, 'Elektron im Metallteilchen');
    s += '<g transform="translate(262 1040)"><path d="M0 0 q-20 -40 0 -80 q10 30 20 10 q16 30 0 70 Z" fill="#FF8A3D" opacity="' + (.6 + .4 * Math.sin(t * 9)).toFixed(2) + '"/></g>' + svgT(450, 720, zu !== undefined ? 'zurück → Licht' : 'Hitze → hoch', 40, zu !== undefined ? COL12.gruen : '#FF8A3D'); }
  if (fe !== undefined) { const k = ease(cl(fe / .5)), c = (fe * .8) % 1.6; s += '<rect x="170" y="640" width="740" height="460" rx="20" fill="#05071A" opacity="' + (.85 * k).toFixed(2) + '"/><g opacity="' + k.toFixed(2) + '">' + stairs12(300, 1000, 110, cl(c / .4), cl((c - .5) / .6), COL12.rot, 'Strontium') + stairs12(640, 1000, 250, cl(c / .4), cl((c - .5) / .6), COL12.blau, 'Kupfer') + '</g>'; }
  return s; }
WORLD.c12Spring = function (sc, ev, t, lt) { const bg = fuse33(lake12(t), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '">' + lab33dots() + sci12c(t, ev) + '</g>' + shade3(), slot(ev, [['hitze', 'Hitze hebt Elektronen an'], ['zurueck', 'Zurück = Licht', 'hot'], ['fest', 'Feste Stufe, feste Farbe']])); };
WMASC.c12Spring = (ev, t, lt) => { const zu = ev.zurueck; if (zu !== undefined && ev.fest === undefined) { const j = Math.sin(Math.PI * cl((zu - .4) / .6)); return stay3([XF12c, GF12c - 24 * Math.max(0, j)], 1, { r: -8 * Math.max(0, j), mood: 'shock' }); }
  if (ev.hitze !== undefined || ev.fest !== undefined) return stay3([XF12c, GF12c], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  const k = cl(lt / .35); return stay3([lerp(XC12C, XF12c, ease(k)), lerp(GC12C, GF12c, k * k)], 1, { r: 10 * Math.sin(Math.PI * k), mood: 'happy' }); };

// ---------- Teil 3: Blau ist schwer ----------
function therm12(x, y, lvl, k) { if (!(k > 0)) return ''; const e = back(cl(k)), h = 260 * lvl; return '<g transform="translate(' + x + ' ' + y + ') scale(' + e.toFixed(3) + ')"><rect x="-26" y="-300" width="52" height="300" rx="26" fill="#F4F6FB" stroke="' + ST12c + '" stroke-width="5"/><rect x="-12" y="' + (-20 - h).toFixed(0) + '" width="24" height="' + (h + 20).toFixed(0) + '" fill="#FF3B4E"/><circle r="44" fill="#FF3B4E" stroke="' + ST12c + '" stroke-width="5"/></g>'; }
WORLD.c12Blau = function (sc, ev, t, lt) { const ku = ev.kupfer, he = ev.heiss, sw = ev.schwer; let B = [];
  if (ku !== undefined && he === undefined) B = [[440, 780, ku % 2.2, COL12.blau, 110]];
  if (he !== undefined && sw === undefined) B = [[440, 780, he % 2.2, he > 1 ? '#B8C8F0' : COL12.blau, 110, he > 1]];
  let s = lake12(t, B);
  if (he !== undefined && sw === undefined) { s += therm12(170, 1040, cl(he / 1.2), cl(he / .4)); const k = cl((he - 1) / .4); s += '<g opacity="' + k.toFixed(2) + '"><rect x="250" y="900" width="340" height="70" rx="14" fill="#05071A"/>' + svgT(420, 948, 'Blau wird blass', 38, '#B8C8F0') + '</g>'; }
  if (sw !== undefined) { const k = back(cl(sw / .5)); s += '<g transform="translate(420 800) scale(' + k.toFixed(3) + ')"><rect x="-260" y="-120" width="520" height="240" rx="22" fill="#05071A" stroke="' + COL12.blau + '" stroke-width="6"/><g transform="translate(-150 0)">' + [-1, 0, 1].map(i => '<circle cx="' + (i * 40) + '" cy="0" r="30" fill="' + [COL12.rot, COL12.gruen, COL12.blau][i + 1] + '" opacity="' + (i === 1 ? 1 : .5) + '"/>').join('') + '</g>' + svgT(90, -12, 'Blau:', 40, '#F4F6FB') + svgT(90, 40, 'am schwierigsten', 34, COL12.blau) + '</g>'; }
  return W(s + shade3(), slot(ev, [['kupfer', 'Blau braucht Kupfer'], ['heiss', 'Zu heiß: Blau verblasst', 'hot'], ['schwer', 'Schwierigste Farbe']])); };
WMASC.c12Blau = (ev, t, lt) => { const rh = ev.rehook, he = ev.heiss;
  if (he !== undefined && ev.schwer === undefined) { const j = Math.sin(Math.PI * cl((he - 1) / .6)); return stay3([XC12C, GC12C - 20 * Math.max(0, j)], 1, { r: 8 * j, mood: he > 1 ? 'shock' : 'cool' }); }
  if (rh !== undefined && ev.kupfer === undefined) { const k = cl(lt / .8), j = Math.sin(Math.PI * k); return stay3([lerp(XF12c, XC12C, ease(k)), lerp(GF12c, GC12C, ease(k)) - 120 * j], 1, { r: -10 * j, mood: 'happy' }); }
  return stay3([XC12C, GC12C], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.c12Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(lake12(t, [[380, 820, lt % 2.4, [COL12.rot, COL12.gruen, COL12.blau][Math.floor(lt / 2.4) % 3], 110]]) + '<defs><linearGradient id="od12" x1="0" y1="0" x2="0" y2="1"><stop offset=".32" stop-color="#05071A" stop-opacity=".92"/><stop offset=".64" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od12)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.c12Out = (ev, t, lt) => stay3([XC12C + 30 * Math.sin(Math.PI * cl((lt - 1) / 5)), GC12C - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['c12Hook', 'c12Metall', 'c12Spring', 'c12Blau', 'c12Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC12c); });
