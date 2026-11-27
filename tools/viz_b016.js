// B016 "Warum war ein Tag fuer die Dinos kuerzer?" (Bio, Dino-Skript und Neue Werkzeuge, Kostuem B1 Dino-Forscher), stumme Demo v1 (27.11.2026).
// Ort eigens gebaut: flache Lagune am Meer der spaeten Kreidezeit bei Abenddaemmerung, Riff aus Rudisten im Wasser, Triceratops am Strand, Mond ueber dem Meer.
// Einstieg: Sonne rast ueber den Himmel, Uhr 24 h springt auf 23,5 h. Teil 1: Zifferblatt und Kalenderkarte 372 Tage. Teil 2: die eine Lupe (Querschnitt der Muschel mit Tagesschichten).
// Teil 3: Erde und Mond (Gezeitenberg, Mond entfernt sich), dann Supermond 24.12. Nutzt triD, birdd (viz_dino.js), lupeH, slot, stay3, look3. Zum Loeschen: diese Datei und videos/B016.
const ST16 = '#0B1020', SX16 = 220, SY16 = 1537;
const mv16 = (a, b, k) => lerp(a, b, ease(cl(k)));

// Ort: Lagune. su = Sonnenstand 0..1 (Bogen), mo = Mond 0..1 sichtbar, dk = Nacht 0..1
function lag16(t, o) { o = o || {}; const dk = cl(o.dk || 0);
  let s = '<defs><linearGradient id="sk16" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + mxd('#6A7BD8', '#0A0D2A', dk) + '"/><stop offset="1" stop-color="' + mxd('#FFB38A', '#2A2550', dk) + '"/></linearGradient><linearGradient id="se16" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + mxd('#3AA6B9', '#14305A', dk) + '"/><stop offset="1" stop-color="' + mxd('#1E6E8A', '#0A1A3A', dk) + '"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk16)"/>';
  if (dk > .2) for (let i = 0; i < 30; i++) s += '<circle cx="' + (rnd(i + 900) * 1080).toFixed(0) + '" cy="' + (60 + rnd(i + 901) * 640).toFixed(0) + '" r="1.6" fill="#fff" opacity="' + (dk * (.4 + .3 * Math.sin(t + i))).toFixed(2) + '"/>';
  if (o.su !== undefined) { const a = Math.PI * cl(o.su), x = 540 - 460 * Math.cos(a), y = 940 - 320 * Math.sin(a); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="60" fill="#FFE58A"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="100" fill="#FFE58A" opacity=".25"/>'; }
  if (o.mo) { const r = o.mr || 60; s += '<circle cx="' + (o.mx || 820) + '" cy="' + (o.my || 760) + '" r="' + r + '" fill="#F4EFD8" opacity="' + cl(o.mo).toFixed(2) + '"/><circle cx="' + ((o.mx || 820) - r * .3).toFixed(0) + '" cy="' + ((o.my || 760) - r * .2).toFixed(0) + '" r="' + (r * .18).toFixed(0) + '" fill="#D8D0B0" opacity="' + cl(o.mo).toFixed(2) + '"/>'; }
  s += '<rect x="0" y="940" width="1080" height="200" fill="url(#se16)"/>';
  for (let i = 0; i < 8; i++) s += '<path d="M' + ((i * 150 + t * 30) % 1180 - 100).toFixed(0) + ' ' + (980 + (i % 3) * 40) + ' q30 -10 60 0" stroke="#fff" stroke-width="3" fill="none" opacity=".35"/>';
  // Riff aus Rudisten (kegelfoermige Muscheln) im flachen Wasser
  for (let i = 0; i < 9; i++) { const x = 380 + i * 38, h = 30 + 24 * rnd(i + 930); s += '<path d="M' + (x - 14) + ' 1100 L' + x + ' ' + (1100 - h).toFixed(0) + ' L' + (x + 14) + ' 1100 Z" fill="#C9A27A" stroke="' + ST16 + '" stroke-width="3"/><ellipse cx="' + x + '" cy="' + (1100 - h).toFixed(0) + '" rx="12" ry="5" fill="#E8D2B0"/>'; }
  s += '<path d="M0 1120 Q300 1100 540 1130 T1080 1110 V1920 H0 Z" fill="' + mxd('#E8C890', '#5A5070', dk * .7) + '"/>';
  for (let i = 0; i < 4; i++) { const x = 760 + i * 70; s += '<path d="M' + x + ' 1120 q-20 -80 10 -160" stroke="#3A7A4A" stroke-width="10" fill="none"/><path d="M' + (x + 10) + ' 960 q-50 0 -70 30 M' + (x + 10) + ' 960 q50 0 70 30 M' + (x + 10) + ' 960 q-30 -30 -60 -30 M' + (x + 10) + ' 960 q30 -30 60 -30" stroke="#4E9A5A" stroke-width="9" fill="none" stroke-linecap="round"/>'; }
  s += '<defs><linearGradient id="fl16" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + mxd('#D8B880', '#4A4060', dk * .7) + '"/><stop offset="1" stop-color="' + mxd('#B8985E', '#2A2440', dk * .7) + '"/></linearGradient></defs><rect x="0" y="1540" width="1080" height="380" fill="url(#fl16)"/>';
  if (dk > 0) s += '<rect width="1080" height="1920" fill="#0A0D2A" opacity="' + (.25 * dk).toFixed(2) + '"/>';
  return s; }
const tri16 = (t, o) => triD(720, 1470, .42, t, Object.assign({ id: 'b16t' }, o || {}));
function box16(x, y, w, h, k) { return '<rect x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="20" fill="#05071A" opacity="' + (.88 * cl(k)).toFixed(2) + '"/>'; }
// Uhr mit 24-h-Kreis; fehl = fehlender Anteil in Stunden
function clock16(x, y, r, fehl, txt, k) { if (!(k > 0)) return ''; const e = back(cl(k)); let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + e.toFixed(3) + ')"><circle r="' + r + '" fill="#F4F6FB" stroke="' + ST16 + '" stroke-width="8"/>';
  for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; s += '<path d="M' + (Math.sin(a) * r * .84).toFixed(0) + ' ' + (-Math.cos(a) * r * .84).toFixed(0) + ' L' + (Math.sin(a) * r * .94).toFixed(0) + ' ' + (-Math.cos(a) * r * .94).toFixed(0) + '" stroke="' + ST16 + '" stroke-width="' + (i % 6 ? 3 : 6) + '"/>'; }
  if (fehl > 0) { const a0 = -fehl / 24 * Math.PI * 2; s += '<path d="M0 0 L' + (Math.sin(a0) * r).toFixed(0) + ' ' + (-Math.cos(a0) * r).toFixed(0) + ' A' + r + ' ' + r + ' 0 0 1 0 ' + (-r) + ' Z" fill="#FF6B6B" opacity=".85"/>'; }
  s += svgT(0, r * .35, txt, r * .3, ST16) + '<circle r="8" fill="' + ST16 + '"/></g>'; return s; }

// ---------- Einstieg ----------
WORLD.b16Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; const su = (lt / 1.6) % 1, n = su > .92 || su < .08 ? 1 : 0;
  let s = lag16(t, { su: lo === undefined ? su : undefined, dk: lo !== undefined ? .8 * cl(lo / .6) : .15 * n, mo: lo !== undefined ? cl((lo - .2) / .5) : 0, mx: 540, my: 780, mr: 80 });
  s += tri16(t, { head: -10 * Math.sin(t * 2) });
  if (lo === undefined) { const sw = fr !== undefined ? ease(cl(fr / .6)) : 0; s += box16(540, 780, 340, 120, 1) + svgT(540, 805, sw > .5 ? '23,5 h' : '24 h', 64, sw > .5 ? '#FF6B6B' : '#F4F6FB'); }
  if (lo !== undefined) { const k = back(cl((lo - .7) / .5)); s += '<g transform="translate(540 780) scale(' + k.toFixed(3) + ')">' + svgT(0, 26, '?', 80, '#5C6BB0') + '</g>'; }
  return W(s + shade3()); };
WMASC.b16Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) return stay3([SX16, SY16], 1, { r: -6 * Math.sin(Math.PI * cl(lo / .8)), mood: 'happy' });
  if (fr !== undefined) { const j = Math.sin(Math.PI * cl((fr - .4) / .6)); return stay3([SX16, SY16 - 20 * Math.max(0, j)], 1, { r: 10 * Math.max(0, j), mood: "shock" }); }
  return stay3([SX16, SY16], 1, { r: 4 * Math.sin(t * 3), mood: 'shock' }); };

// ---------- Teil 1: 23,5 Stunden ----------
WORLD.b16Kurz = function (sc, ev, t, lt) { const ku = ev.kurz, ja = ev.jahr, of = ev.oefter; let s = lag16(t, { su: .82 }) + tri16(t);
  if (ku !== undefined && ja === undefined) { const k = cl(ku / .5); s += clock16(540, 860, 160, .5 * cl((ku - .6) / .8), '23,5 h', k); }
  if (ja !== undefined) { const k = back(cl(ja / .5)); s += '<g transform="translate(540 860) scale(' + (.85 * k).toFixed(3) + ')"><rect x="-300" y="-170" width="600" height="340" rx="22" fill="#F4F6FB" stroke="' + ST16 + '" stroke-width="8"/><rect x="-300" y="-170" width="600" height="80" rx="22" fill="#E8384F"/>' + svgT(0, -115, '1 Jahr', 44, '#fff');
    s += '<g>' + svgT(-140, 30, '372', 110, ST16) + svgT(-140, 110, 'Tage damals', 32, ST16) + svgT(160, 30, '365', 90, '#8A90A8') + svgT(160, 110, 'Tage heute', 32, '#8A90A8') + '</g>';
    if (of !== undefined) { const c = back(cl(of / .5)); s += '<g transform="translate(0 178) scale(' + c.toFixed(3) + ')"><rect x="-200" y="-40" width="400" height="80" rx="16" fill="#FFE14D" stroke="' + ST16 + '" stroke-width="5"/>' + svgT(0, 14, '+ 7 pro Jahr', 36, ST16) + '</g>'; }
    s += '</g>'; }
  return W(s + shade3(), slot(ev, [['kurz', 'Ein Tag: rund 23,5 Stunden'], ['jahr', 'Ein Jahr: rund 372 Tage', 'hot'], ['oefter', '7 Sonnenaufgänge mehr']])); };
WMASC.b16Kurz = (ev, t, lt) => { const ja = ev.jahr, of = ev.oefter; if (of !== undefined) { const j = Math.sin(Math.PI * cl((of - .2) / .6)); return stay3([SX16, SY16 - 30 * Math.max(0, j)], 1, { r: -8 * j, mood: 'happy' }); }
  if (ja !== undefined) return stay3([SX16, SY16], 1, { r: -6 * Math.sin(Math.PI * cl(ja / .8)), mood: 'shock' });
  return stay3([mv16(SX16 - 20, SX16, lt / .5), SY16], 1, { r: 3 * Math.sin(t * 2), mood: 'cool' }); };

// ---------- Teil 2: Die Muschel zaehlt ----------
function shell16(t, k, n) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#2A3A4A"/><path d="M-200 260 L0 -240 L200 260 Z" fill="#C9A27A" stroke="' + ST16 + '" stroke-width="6"/>';
  const L = 26, sh = Math.floor(L * cl(k)); for (let i = 0; i < L; i++) { const y = 240 - i * 18, w = 200 * (y + 240) / 500; s += '<path d="M' + (-w).toFixed(0) + ' ' + y + ' H' + w.toFixed(0) + '" stroke="' + (i < sh ? '#6A4A2A' : '#C9A27A') + '" stroke-width="' + (i % 7 === 0 ? 5 : 2) + '"/>'; }
  if (n !== undefined) s += '<rect x="-120" y="262" width="240" height="54" rx="12" fill="#05071A"/>' + svgT(0, 302, Math.round(372 * cl(n)) + ' Tage', 38, '#FFE14D');
  return s; }
WORLD.b16Muschel = function (sc, ev, t, lt) { const mu = ev.muschel, sch = ev.schicht, za = ev.zaehl; let s = lag16(t, { su: .85 }) + tri16(t);
  if (mu !== undefined && sch === undefined) { const k = back(cl(mu / .5)); s += '<g transform="translate(560 1080) scale(' + (2.2 * k).toFixed(3) + ')"><path d="M-22 20 L0 -40 L22 20 Z" fill="#C9A27A" stroke="' + ST16 + '" stroke-width="3"/><ellipse cx="0" cy="-40" rx="18" ry="7" fill="#E8D2B0" stroke="' + ST16 + '" stroke-width="2"/></g><path d="M560 960 L560 900" stroke="#F4F6FB" stroke-width="5"/>' + box16(560, 860, 380, 80, k) + svgT(560, 874, '70 Mio. Jahre alt', 40, '#F4F6FB'); }
  if (sch !== undefined) { const k = ease(cl(sch / .5)); s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * k).toFixed(2) + '"/>' + lupeH(540, 830, 195, shell16(t, cl((sch - .3) / 2)), k) + (za !== undefined ? '<g opacity="' + cl(za / .4).toFixed(2) + '"><rect x="380" y="1050" width="320" height="84" rx="16" fill="#05071A"/>' + svgT(540, 1108, Math.round(372 * cl(za / 2.2)) + ' Tage', 50, '#FFE14D') + '</g>' : ''); }
  return W(s + shade3(), slot(ev, [['muschel', 'Fossile Muschel'], ['schicht', 'Jeden Tag eine Schicht', 'hot'], ['zaehl', 'Pro Jahr: rund 372']])); };
WMASC.b16Muschel = (ev, t, lt) => { const rh = ev.rehook, za = ev.zaehl;
  if (za !== undefined) { const j = za > 2.2 ? Math.sin(Math.PI * cl((za - 2.2) / .6)) : 0; return stay3([SX16, SY16 - 40 * j], 1, { r: 10 * j, mood: j > .1 ? 'shock' : 'cool' }); }
  if (rh !== undefined && ev.muschel === undefined) { const j = Math.sin(Math.PI * cl(lt / .8)); return stay3([SX16, SY16 - 20 * j], 1, { r: -10 * j, mood: 'happy' }); }
  return stay3([SX16, SY16], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 3: Der Mond bremst ----------
function earth16(x, y, t, k, d) { if (!(k > 0)) return ''; const e = ease(cl(k)); let s = '<g opacity="' + e.toFixed(2) + '">' + box16(540, 860, 760, 360, 1);
  s += '<ellipse cx="' + x + '" cy="' + y + '" rx="150" ry="118" fill="#3A8AD8" opacity=".45" transform="rotate(' + (-8 + 4 * Math.sin(t)).toFixed(1) + ' ' + x + ' ' + y + ')"/><circle cx="' + x + '" cy="' + y + '" r="110" fill="#2F6FA8" stroke="#9FD0FF" stroke-width="5"/><g transform="translate(' + (40 * Math.sin(t * .8)).toFixed(1) + ' 0)"><path d="M' + (x - 60) + ' ' + (y - 40) + ' q30 -30 70 -6 q20 30 -10 50 q-40 10 -60 -44 Z" fill="#7CB342"/></g>';
  s += '<path d="M' + (x - 30) + ' ' + (y - 140) + ' A140 140 0 0 1 ' + (x + 130) + ' ' + (y - 50) + '" fill="none" stroke="#FFE14D" stroke-width="6"/><path d="M' + (x + 130) + ' ' + (y - 50) + ' l-6 -24 l22 6 Z" fill="#FFE14D"/>';
  const mx = x + 300 + 70 * cl(d); s += '<circle cx="' + mx.toFixed(0) + '" cy="' + y + '" r="44" fill="#F4EFD8" stroke="#D8D0B0" stroke-width="4"/>';
  if (d > 0) s += '<path d="M' + (x + 360) + ' ' + (y + 70) + ' H' + (mx + 40).toFixed(0) + '" stroke="#F4F6FB" stroke-width="5"/><path d="M' + (mx + 40).toFixed(0) + ' ' + (y + 70) + ' l-16 -10 v20 Z" fill="#F4F6FB"/>' + svgT(x + 380, y + 120, '+3,8 cm pro Jahr', 34, '#F4F6FB');
  return s + '</g>'; }
WORLD.b16Mond = function (sc, ev, t, lt) { const ge = ev.gezeit, we = ev.weg, su = ev.super; const S = su !== undefined ? ease(cl(su / .8)) : 0;
  let s = lag16(t, { dk: .3 + .6 * S, mo: S, mx: 540, my: 800, mr: 60 + 50 * S });
  if (S > .5) s += '<circle cx="540" cy="800" r="' + (150 + 10 * Math.sin(t * 2)).toFixed(0) + '" fill="#F4EFD8" opacity=".15"/>';
  s += tri16(t, { head: S > .3 ? -20 : 0 });
  if (ge !== undefined && su === undefined) s += earth16(340, 860, t, ge / .5, we !== undefined ? cl(we / 1.2) : 0);
  if (su !== undefined) { const k = back(cl((su - .6) / .5)); s += '<g transform="translate(540 960) scale(' + k.toFixed(3) + ')"><rect x="-150" y="-44" width="300" height="88" rx="16" fill="#05071A" stroke="#F4EFD8" stroke-width="4"/>' + svgT(0, 16, '24. Dezember', 40, '#F4EFD8') + '</g>'; }
  return W(s + shade3(), slot(ev, [['gezeit', 'Gezeiten bremsen die Erde'], ['weg', 'Mond: 3,8 cm weiter pro Jahr', 'hot'], ['super', 'Supermond am 24.12.']])); };
WMASC.b16Mond = (ev, t, lt) => { const rh = ev.rehook, su = ev.super;
  if (su !== undefined) { const j = Math.sin(Math.PI * cl((su - .4) / .7)); return stay3([SX16, SY16 - 30 * Math.max(0, j)], 1, { r: -8 * j, mood: 'happy' }); }
  if (rh !== undefined && ev.gezeit === undefined) return stay3([SX16, SY16], 1, { r: -8 * Math.sin(Math.PI * cl(lt / .8)), mood: 'shock' });
  return stay3([SX16, SY16], 1, { r: 3 * Math.sin(t * 2), mood: 'cool' }); };

// ---------- Schluss ----------
WORLD.b16Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(lag16(t, { dk: .85, mo: 1, mx: 760, my: 860, mr: 90 }) + tri16(t) + '<defs><linearGradient id="od16" x1="0" y1="0" x2="0" y2="1"><stop offset=".32" stop-color="#05071A" stop-opacity=".92"/><stop offset=".64" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od16)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.b16Out = (ev, t, lt) => stay3([SX16 + 50 * Math.sin(Math.PI * cl((lt - 1) / 5)), SY16 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['b16Hook', 'b16Kurz', 'b16Muschel', 'b16Mond', 'b16Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
