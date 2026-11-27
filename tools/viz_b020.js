// B020 "Warum siehst du im Dunkeln keine Farben?" (Bio, Skript Anatomie mit Abschnitt Neue Werkzeuge, Kostuem B4 Skelett-Anzug), stumme Demo v1 (27.11.2026).
// Ort: Bio-Saal mit Tafel (classK), Licht im Saal wird gedimmt. Hauptfigur: Schulskelett auf dem Podest (skelK).
// Grossbild: Einstieg Rose wird grau. Teil 1 Auge im Schnitt und Netzhaut mit Staebchen und Zapfen. Teil 2 Lichtregler, Zapfen werden dunkel, Staebchen leuchten, Rose grau. Teil 3 Netzhaut mit Mitte ohne Staebchen, schwacher Stern direkt und knapp daneben.
// Nutzt classK, ringK, CX/CY/CZ (viz_b007.js), skelK (viz_koerper.js), slot, stay3, shade3. Zum Loeschen: diese Datei und videos/B020.
const ST20b = '#0B1020', HX20b = 812, HY20b = 1132, RO20b = '#E8384F', GR20b = '#3EA84A', CO20b = ['#FF5A5A', '#4EDC6A', '#5A8CFF'], RD20b = '#C9C3D8';
const ch20 = (x, y, txt, sz, op) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + sz + '" font-weight="800" font-family="Inter Display, Inter, Arial, sans-serif" fill="#F4F6FB" opacity="' + (op === undefined ? .92 : op).toFixed(2) + '">' + txt + '</text>';
const lab20 = (ev, list) => slot(ev, list, 590);
const fig20 = (t, o) => skelK(HX20b, HY20b, .8, t, Object.assign({ smile: 1 }, o || {}));
const gray20 = (c, g) => { const r = parseInt(c.slice(1, 3), 16), gg = parseInt(c.slice(3, 5), 16), b = parseInt(c.slice(5, 7), 16), l = Math.round(.3 * r + .59 * gg + .11 * b); return mxd(c, '#' + [l, l, l].map(v => v.toString(16).padStart(2, '0')).join(''), cl(g)); };
// Saal abdunkeln, dk 0..1
const dim20 = dk => dk > 0 ? '<rect width="1080" height="1920" fill="#02040E" opacity="' + (.55 * cl(dk)).toFixed(2) + '"/>' : '';

// Rose, g = grau 0..1
function rose20(x, y, sc, g) { let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + sc + ')"><path d="M0 20 Q-6 70 4 110" stroke="' + gray20(GR20b, g) + '" stroke-width="8" fill="none"/><path d="M2 70 q30 -20 46 -4 q-24 14 -46 4 Z" fill="' + gray20(GR20b, g) + '" stroke="' + ST20b + '" stroke-width="3"/>';
  [[0, -10, 44], [-22, 0, 34], [22, 2, 34], [0, -30, 30]].forEach(([px, py, r], i) => s += '<circle cx="' + px + '" cy="' + py + '" r="' + r + '" fill="' + gray20(i === 3 ? '#FF6A7A' : RO20b, g) + '" stroke="' + ST20b + '" stroke-width="3"/>');
  s += '<path d="M-14 -20 q14 -16 28 0 M-20 0 q20 -10 40 0" stroke="' + gray20('#9A1A2A', g) + '" stroke-width="4" fill="none"/></g>'; return s; }
// Auge im Schnitt, Licht faellt ein
function eye20(t, k) { let s = '<g opacity="' + cl(k).toFixed(2) + '"><circle cx="-60" cy="0" r="92" fill="#F4F6FB" stroke="' + ST20b + '" stroke-width="5"/><path d="M-150 -34 Q-170 0 -150 34" fill="#9FD0FF" stroke="' + ST20b + '" stroke-width="4"/><ellipse cx="-128" cy="0" rx="12" ry="30" fill="#E8D8A8" stroke="' + ST20b + '" stroke-width="3"/>';
  s += '<path d="M-10 -78 A92 92 0 0 1 -10 78" stroke="#E8665A" stroke-width="14" fill="none"/>';
  const q = (t * .8) % 1; s += '<path d="M-200 -16 L-130 0 L20 0" stroke="#FFE14D" stroke-width="4" stroke-dasharray="10 8" fill="none"/><circle cx="' + lerp(-200, 20, q).toFixed(0) + '" cy="' + (q < .32 ? lerp(-16, 0, q / .32) : 0).toFixed(0) + '" r="7" fill="#FFE14D"/>';
  s += '<path d="M40 -40 L120 -70" stroke="#F4F6FB" stroke-width="3"/>' + ch20(150, -76, 'Netzhaut', 26) + '</g>'; return s; }
// Netzhaut-Streifen: Staebchen (hoch, schmal) und Zapfen (kurz, kegelig). lit: Licht 0..1, cone: Zapfen sichtbar, fov: Mitte ohne Staebchen
function retina20(t, o) { o = o || {}; const lit = o.lit === undefined ? 1 : o.lit; let s = '<rect x="-205" y="30" width="410" height="20" rx="6" fill="#E8665A" opacity=".8"/>';
  for (let i = 0; i < 22; i++) { const x = -195 + i * 18.5, fv = o.fov && Math.abs(x) < 60, cone = fv ? true : i % 4 === 1, ci = i % 3;
    if (cone) { const on = cl((lit - .35) / .4); s += '<path d="M' + (x - 8) + ' 30 L' + (x - 5) + ' -16 L' + (x + 5) + ' -16 L' + (x + 8) + ' 30 Z" fill="' + mxd('#3A3A48', CO20b[ci], on) + '" stroke="' + ST20b + '" stroke-width="2"/>'; if (on > .5) s += '<circle cx="' + x + '" cy="-24" r="6" fill="' + CO20b[ci] + '" opacity="' + (on * (.5 + .4 * Math.sin(t * 5 + i))).toFixed(2) + '"/>'; }
    else { const glow = o.rodGlow ? .55 + .45 * Math.sin(t * 4 + i * .7) : 0; s += '<rect x="' + (x - 4) + '" y="-60" width="8" height="90" rx="4" fill="' + mxd(RD20b, '#FFFFFF', glow) + '" stroke="' + ST20b + '" stroke-width="2"/>'; if (glow > 0) s += '<circle cx="' + x + '" cy="-66" r="5" fill="#fff" opacity="' + (.6 * glow).toFixed(2) + '"/>'; } }
  return s; }

// ---------- Einstieg ----------
WORLD.b20Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; const g = lo !== undefined ? 1 : ease(cl((lt - 1.4) / 1.6)), dk = lo !== undefined ? .8 : .75 * g;
  let close = '<g>' + rose20(-40, -10, 1.3, g) + '<circle cx="140" cy="-50" r="' + (26 + 4 * Math.sin(t * 2)) + '" fill="#F4EFD8" opacity="' + (.3 + .7 * g).toFixed(2) + '"/>';
  if (lo !== undefined) { const k = cl(lo / .6); close += '<g opacity="' + k.toFixed(2) + '">' + [[110, 30, 3], [170, 10, 2], [150, 70, 4]].map(([x, y, r], i) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff" opacity="' + (i === 2 ? .35 + .3 * Math.sin(t * 3) : .9) + '"/>').join('') + '</g>'; }
  close += '</g>';
  let s = classK(t, { close: close }) + dim20(dk) + fig20(t) + ringK(t, 350 - 52, 860, 90);
  return W(s + shade3()); };
WMASC.b20Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop; if (lo !== undefined) return stay3([220, 1537], 1, { r: -4, mood: 'happy' });
  if (fr !== undefined) { const j = Math.sin(Math.PI * cl(fr / .7)); return stay3([220, 1537 - 20 * j], 1, { r: -8 * j, mood: 'shock' }); }
  return stay3([220, 1537], 1, { r: 3 * Math.sin(t * 2), mood: lt > 1.2 ? 'shock' : 'cool' }); };

// ---------- Teil 1: Zwei Sorten Sehzellen ----------
WORLD.b20Zellen = function (sc, ev, t, lt) { const zw = ev.zwei, za = ev.zahl, fa = ev.farbe; let close = '<g>';
  if (zw !== undefined && za === undefined) close += eye20(t, cl(zw / .5));
  if (za !== undefined) { const k = cl(za / .5); close += '<g opacity="' + k.toFixed(2) + '">' + retina20(t, { lit: 1 }) + ch20(0, 90, 'Stäbchen: 120 Mio.  |  Zapfen: 6 Mio.', 22) + '</g>'; }
  if (fa !== undefined) { const k = cl(fa / .5); close += '<g opacity="' + k.toFixed(2) + '"><rect x="-205" y="-100" width="410" height="34" rx="8" fill="#0B1020" opacity=".55"/>' + ch20(-110, -74, 'hell / dunkel', 24) + ch20(110, -74, 'Farben', 24) + '</g>'; }
  close += '</g>';
  let s = classK(t, { close: close }) + fig20(t);
  if (zw !== undefined && za === undefined) s += ringK(t, 350 + 1.3 * 40, 872, 50);
  return W(s + shade3(), lab20(ev, [['zwei', 'Zwei Sorten Sehzellen'], ['zahl', 'Viel mehr Stäbchen', 'hot'], ['farbe', 'Nur Zapfen sehen Farbe']])); };
WMASC.b20Zellen = (ev, t, lt) => { const za = ev.zahl; if (za !== undefined && ev.farbe === undefined) { const j = Math.sin(Math.PI * cl((za - .3) / .6)); return stay3([220, 1537 - 22 * Math.max(0, j)], 1, { r: -8 * j, mood: 'shock' }); }
  return stay3([mv20(240, 220, lt / .5), 1537], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };
const mv20 = (a, b, k) => lerp(a, b, ease(cl(k)));

// ---------- Teil 2: Zapfen brauchen Licht ----------
function slider20(lv) { return '<g transform="translate(-160 -10)"><rect x="-14" y="-80" width="28" height="160" rx="14" fill="#0B1020" opacity=".6" stroke="#F4F6FB" stroke-width="3"/><circle cx="0" cy="' + lerp(66, -66, cl(lv)).toFixed(0) + '" r="18" fill="#FFE14D" stroke="' + ST20b + '" stroke-width="3"/>' + ch20(0, -92, 'Licht', 22) + '</g>'; }
WORLD.b20Licht = function (sc, ev, t, lt) { const li = ev.licht, sb = ev.staebchen, gr = ev.grau; const lv = li === undefined ? 1 : 1 - .9 * ease(cl((li - .3) / 1.4)), dk = 1 - lv;
  let close = '<g>';
  if (gr === undefined) close += '<g transform="translate(40 0)">' + retina20(t, { lit: lv, rodGlow: sb !== undefined }) + '</g>' + slider20(lv) + (sb !== undefined ? '<g opacity="' + cl(sb / .5).toFixed(2) + '">' + ch20(40, 96, 'nur 1 Sorte Stäbchen', 26) + '</g>' : '');
  if (gr !== undefined) { const k = cl(gr / .6); close += '<g opacity="' + k.toFixed(2) + '">' + rose20(-80, -6, 1, 1) + rose20(80, -6, 1, 1 - .0) + ch20(0, 96, 'alles in Grautönen', 26) + '</g>'; }
  close += '</g>';
  let s = classK(t, { close: close }) + dim20(.8 * dk) + fig20(t);
  return W(s + shade3(), lab20(ev, [['licht', 'Zapfen brauchen viel Licht'], ['staebchen', 'Nachts: fast nur Stäbchen', 'hot'], ['grau', 'Darum alles grau']])); };
WMASC.b20Licht = (ev, t, lt) => { const rh = ev.rehook, gr = ev.grau;
  if (gr !== undefined) { const j = Math.sin(Math.PI * cl((gr - .3) / .6)); return stay3([220, 1537 - 18 * Math.max(0, j)], 1, { r: 6 * j, mood: 'shock' }); }
  if (rh !== undefined && ev.licht === undefined) { const j = Math.sin(Math.PI * cl(lt / .8)); return stay3([220, 1537 - 18 * j], 1, { r: -8 * j, mood: 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: 'cool' }); };

// ---------- Teil 3: Knapp daneben schauen ----------
WORLD.b20Daneben = function (sc, ev, t, lt) { const mi = ev.mitte, di = ev.direkt, da = ev.daneben; let close = '<g>' + retina20(t, { lit: .2, fov: 1, rodGlow: da !== undefined });
  close += '<path d="M-56 56 H56" stroke="#FFE14D" stroke-width="5"/>' + ch20(0, 92, 'Mitte: nur Zapfen', 24);
  if (di !== undefined || da !== undefined) { const tx = da !== undefined ? lerp(0, -120, ease(cl(da / .6))) : 0, q = (t * .9) % 1; close += '<path d="M' + (tx + 40) + ' -100 L' + tx + ' -40" stroke="#FFF6C8" stroke-width="4" stroke-dasharray="8 6"/><circle cx="' + lerp(tx + 40, tx, q).toFixed(0) + '" cy="' + lerp(-100, -40, q).toFixed(0) + '" r="5" fill="#FFF6C8"/>'; }
  close += '</g>';
  // Stern am Himmel ueber der Tafel: direkt blass, daneben hell
  const br = da !== undefined ? .4 + .6 * ease(cl((da - .4) / .6)) : di !== undefined ? .15 + .05 * Math.sin(t * 5) : 0;
  let s = classK(t, { close: close }) + dim20(.75) + fig20(t);
  if (br > 0) s += '<circle cx="675" cy="770" r="' + (5 + 8 * br).toFixed(0) + '" fill="#FFF6C8" opacity="' + br.toFixed(2) + '"/><circle cx="675" cy="770" r="' + (16 + 24 * br).toFixed(0) + '" fill="#FFF6C8" opacity="' + (.25 * br).toFixed(2) + '"/>';
  if (mi !== undefined && di === undefined) s += ringK(t, 350, 872, 80);
  return W(s + shade3(), lab20(ev, [['mitte', 'Blickmitte: keine Stäbchen'], ['direkt', 'Direkt: Stern verschwindet', 'hot'], ['daneben', 'Knapp daneben: sichtbar']])); };
WMASC.b20Daneben = (ev, t, lt) => { const rh = ev.rehook, da = ev.daneben;
  if (da !== undefined) { const j = Math.sin(Math.PI * cl((da - .5) / .6)); return stay3([220, 1537 - 22 * Math.max(0, j)], 1, { r: -10 * j, mood: 'happy' }); }
  if (ev.direkt !== undefined) return stay3([220, 1537], 1, { r: 4, mood: 'shock' });
  if (rh !== undefined && ev.mitte === undefined) { const j = Math.sin(Math.PI * cl(lt / .8)); return stay3([220, 1537 - 18 * j], 1, { r: -8 * j, mood: 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: 'cool' }); };

// ---------- Schluss ----------
WORLD.b20Out = function (sc, ev, t, lt) { return W(classK(t, { close: '<g>' + rose20(-40, -10, 1.3, .5 + .5 * Math.sin(t * .8)) + '</g>' }) + dim20(.3) + fig20(t) + shade3()); };
WMASC.b20Out = (ev, t, lt) => stay3([220, 1537 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });
