// I022H "Kann man dein iPhone finden, wenn es aus ist?" (Informatik, HOOK-PILOT wie P022H, Kostuem I1 Hacker-Hoodie), stumme Demo v1 (20.11.2026).
// Ort (eigens gebaut): Bushaltestelle in der Nacht. Schaltis Handy liegt ausgeschaltet unter der Bank, Leute mit Handys gehen vorbei.
// Teil 1 Lupe ins Handy (Funkteil bleibt wach, 24 h), Teil 2 Passanten fangen das Signal und melden an die Cloud, Teil 3 Schloss und Anonymitaet.
// Zum Loeschen: diese Datei und videos/I022H.
var AC2I = '#7C5CFF', BT2I = '#5CB8FF', ST2I = '#0B1020', GY2I = 1545, FX2I = 260, PH2I = [760, 1500];
function stop2i(t, o) { o = o || {}; let s = '<defs><linearGradient id="sk2i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0C0F2E"/><stop offset="1" stop-color="#2E2463"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk2i)"/>';
  for (let i = 0; i < 22; i++) s += '<circle cx="' + (rnd(i + 2) * 1080).toFixed(0) + '" cy="' + (80 + rnd(i + 7) * 500).toFixed(0) + '" r="' + (1.5 + rnd(i) * 2).toFixed(1) + '" fill="#fff" opacity="' + (.3 + .4 * Math.abs(Math.sin(t * .6 + i))).toFixed(2) + '"/>';
  // Skyline
  for (let i = 0; i < 9; i++) { const w = 100 + rnd(i + 30) * 60, h = 260 + rnd(i + 40) * 330, x = i * 125 - 20; s += '<rect x="' + x.toFixed(0) + '" y="' + (1150 - h).toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + h.toFixed(0) + '" fill="' + (i % 2 ? '#1F1E4A' : '#272559') + '"/>'; for (let k = 0; k < 8; k++) if (rnd(i * 13 + k) > .5) s += '<rect x="' + (x + 16 + (k % 3) * 28).toFixed(0) + '" y="' + (1150 - h + 30 + Math.floor(k / 3) * 60).toFixed(0) + '" width="14" height="20" fill="#FFD98A" opacity=".7"/>'; }
  // Strasse und Gehweg
  s += '<rect x="0" y="1150" width="1080" height="150" fill="#2C2F45"/><path d="M0 1225 H1080" stroke="#F4F6FB" stroke-width="7" stroke-dasharray="60 50" opacity=".5"/><rect x="0" y="1300" width="1080" height="620" fill="#4A4E68"/><path d="M0 1300 H1080" stroke="#8A8FA8" stroke-width="12"/>';
  for (let i = 0; i < 6; i++) s += '<path d="M' + (i * 200 + 60) + ' 1310 L' + (i * 200) + ' 1920" stroke="#3E4258" stroke-width="5"/>';
  // Haltestelle mit Bank
  s += '<rect x="420" y="1000" width="560" height="22" rx="6" fill="#8A8FA8" stroke="' + ST2I + '" stroke-width="5"/><rect x="440" y="1022" width="12" height="440" fill="#5A5F78" stroke="' + ST2I + '" stroke-width="4"/><rect x="948" y="1022" width="12" height="440" fill="#5A5F78" stroke="' + ST2I + '" stroke-width="4"/>';
  s += '<rect x="460" y="1030" width="480" height="300" fill="#9FD6FF" opacity=".14" stroke="#C9E8FF" stroke-width="3"/><rect x="820" y="1050" width="110" height="160" rx="8" fill="#FFE9A0" stroke="' + ST2I + '" stroke-width="4"/>' + svgT(875, 1110, 'BUS', 30, ST2I) + svgT(875, 1160, 'N7', 40, AC2I);
  s += '<rect x="520" y="1400" width="360" height="22" rx="8" fill="#A8774F" stroke="' + ST2I + '" stroke-width="5"/><rect x="540" y="1422" width="12" height="70" fill="#5A5F78"/><rect x="848" y="1422" width="12" height="70" fill="#5A5F78"/>';
  // Laterne
  s += '<rect x="100" y="760" width="18" height="560" fill="#2A3048" stroke="' + ST2I + '" stroke-width="4"/><path d="M80 760 h58 l-10 -36 h-38 Z" fill="#2A3048"/><circle cx="109" cy="748" r="14" fill="#FFE9A8"/><circle cx="109" cy="760" r="110" fill="#FFE9A8" opacity=".1"/>';
  s += phone2i(PH2I[0], PH2I[1], o.on === undefined ? 0 : o.on, t);
  return s; }
// Handy liegt flach auf dem Boden (leicht schraeg), on: Bildschirm an
function phone2i(x, y, on, t) { return '<g transform="translate(' + x + ' ' + y + ') rotate(-8)"><rect x="-56" y="-26" width="112" height="52" rx="12" fill="' + ST2I + '" stroke="#F4F6FB" stroke-width="4"/><rect x="-48" y="-19" width="96" height="38" rx="8" fill="' + lc('#05070F', '#6A8CFF', on) + '"/></g>'; }
// Bluetooth-Ringe vom Handy
function rings2i(x, y, t, k) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 3; i++) { const c = (t * .8 + i / 3) % 1; s += '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (50 + 260 * c).toFixed(0) + '" ry="' + (24 + 120 * c).toFixed(0) + '" fill="none" stroke="' + BT2I + '" stroke-width="6" opacity="' + (k * (1 - c) * .9).toFixed(2) + '"/>'; } return s + btIcon2i(x, y - 70, .9 * cl(k * 2)); }
const btIcon2i = (x, y, z) => z <= 0 ? '' : '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(2) + ')"><circle r="30" fill="' + BT2I + '" stroke="' + ST2I + '" stroke-width="5"/><path d="M-10 -10 L10 10 L0 20 V-20 L10 -10 L-10 10" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></g>';
// Passant (Silhouette) mit Handy in der Hand. k: Handy leuchtet auf
function walker2i(x, t, glow, q) { const b = Math.abs(Math.sin(t * 6)) * 8, y = 1540; let s = '<g transform="translate(' + x.toFixed(0) + ' ' + (y - b).toFixed(0) + ')"><path d="M-14 0 L-6 -110 M14 0 L6 -110" stroke="#151833" stroke-width="22" stroke-linecap="round"/><rect x="-34" y="-250" width="68" height="150" rx="30" fill="#1D2147" stroke="#151833" stroke-width="4"/><circle cy="-290" r="40" fill="#1D2147" stroke="#151833" stroke-width="4"/><path d="M30 -200 L60 -170" stroke="#1D2147" stroke-width="18" stroke-linecap="round"/><rect x="52" y="-196" width="26" height="44" rx="6" fill="' + lc('#2A3060', BT2I, glow) + '" stroke="#151833" stroke-width="3"/>';
  if (glow > .3) s += '<circle cx="65" cy="-174" r="' + (30 + 10 * Math.sin(t * 8)).toFixed(0) + '" fill="' + BT2I + '" opacity="' + (.3 * glow).toFixed(2) + '"/>';
  if (q) s += '<g transform="translate(0 -370) scale(' + back(cl(q)).toFixed(2) + ')"><circle r="34" fill="#F4F6FB" stroke="' + ST2I + '" stroke-width="5"/>' + svgT(0, 15, '?', 44, ST2I) + '</g>';
  return s + '</g>'; }
// Cloud oben rechts
function cloud2i(x, y, k, inner) { if (k <= 0) return ''; return '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)).toFixed(3) + ')"><path d="M-110 40 Q-150 40 -150 0 Q-150 -40 -105 -42 Q-95 -95 -35 -92 Q0 -130 50 -100 Q110 -110 115 -45 Q160 -40 158 0 Q155 40 110 40 Z" fill="#F4F6FB" stroke="' + ST2I + '" stroke-width="7"/>' + (inner || '') + '</g>'; }
const lock2i = (x, y, z, col) => '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(2) + ')"><path d="M-22 -10 V-30 Q-22 -54 0 -54 Q22 -54 22 -30 V-10" fill="none" stroke="' + ST2I + '" stroke-width="9"/><rect x="-34" y="-12" width="68" height="54" rx="10" fill="' + (col || '#FFE14D') + '" stroke="' + ST2I + '" stroke-width="6"/><circle cy="12" r="8" fill="' + ST2I + '"/></g>';
// Datenpaket fliegt von a nach b
function packet2i(a, b, c, locked) { const x = lerp(a[0], b[0], c), y = lerp(a[1], b[1], c) - 120 * Math.sin(Math.PI * c); return locked ? lock2i(x, y, .7) : '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ')"><path d="M0 -26 Q22 -26 22 -4 Q22 14 0 34 Q-22 14 -22 -4 Q-22 -26 0 -26 Z" fill="#FF4D6D" stroke="' + ST2I + '" stroke-width="5"/><circle cy="-4" r="8" fill="#fff"/></g>'; }
// Lupe ins Handy: dunkler Bildschirm, darunter ein kleiner wacher Chip
function inside2i(t, o) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#141832"/><rect x="-170" y="-280" width="340" height="560" rx="50" fill="' + ST2I + '" stroke="#F4F6FB" stroke-width="10"/><rect x="-150" y="-260" width="300" height="520" rx="36" fill="#05070F"/>' + svgT(0, -150, 'AUS', 50, '#3A4060');
  const pulse = .5 + .5 * Math.sin(t * 5); s += '<rect x="-60" y="40" width="120" height="90" rx="12" fill="#2A3060" stroke="' + BT2I + '" stroke-width="' + (4 + 4 * pulse).toFixed(1) + '"/>' + svgT(0, 98, 'Funk', 28, '#F4F6FB');
  if (o.bt) for (let i = 0; i < 3; i++) { const c = (t * .9 + i / 3) % 1; s += '<circle cx="0" cy="85" r="' + (70 + 220 * c).toFixed(0) + '" fill="none" stroke="' + BT2I + '" stroke-width="7" opacity="' + ((1 - c) * cl(o.bt)).toFixed(2) + '"/>'; }
  if (o.clock) { const k = cl(o.clock), a = -Math.PI / 2 + 2 * Math.PI * ((t * .15) % 1); s += '<g transform="translate(0 -150) scale(' + back(k).toFixed(2) + ')"><circle r="70" fill="#F4F6FB" stroke="' + ST2I + '" stroke-width="6"/><path d="M0 0 L' + (50 * Math.cos(a)).toFixed(0) + ' ' + (50 * Math.sin(a)).toFixed(0) + '" stroke="' + ST2I + '" stroke-width="7" stroke-linecap="round"/>' + svgT(0, 116, 'bis 24 h', 34, '#FFE14D') + '</g>'; }
  return s; }

// ---------- Einstieg ----------
WORLD.h22ihook = function (sc, ev, t, lt) { const au = ev.aus, fu = ev.funk, lo = ev.loop; const on = 1 - cl((lt - .25) / .25);
  let s = stop2i(t, { on: on });
  if (on > .1) s += '<circle cx="' + PH2I[0] + '" cy="' + (PH2I[1] - 10) + '" r="70" fill="#6A8CFF" opacity="' + (.3 * on).toFixed(2) + '"/>';
  if (on < .9 && fu === undefined) s += '<g transform="translate(' + PH2I[0] + ' ' + (PH2I[1] - 90) + ') scale(' + back(cl((lt - .5) / .3)).toFixed(2) + ')" opacity="' + (au === undefined ? 1 : 1 - cl((au - 1.6) / .4)).toFixed(2) + '"><circle r="34" fill="#2A3060" stroke="' + ST2I + '" stroke-width="5"/><path d="M0 -18 V0 M-14 -10 A18 18 0 1 0 14 -10" stroke="#F4F6FB" stroke-width="6" fill="none" stroke-linecap="round"/></g>';
  s += rings2i(PH2I[0], PH2I[1], t, au === undefined ? 0 : cl((au - 1.6) / .4) * (lo === undefined ? 1 : 1 - cl(lo / .5)));
  if (lo !== undefined) s += loopH(cl(lo / .9), t, ['Alle?', '<circle cx="-22" cy="-14" r="16" fill="#1D2147"/><circle cx="18" cy="-14" r="16" fill="#1D2147"/><path d="M-50 40 Q-22 0 6 40 M-10 40 Q18 0 46 40" fill="#1D2147"/>', '#FF4D6D'], ['Nur du', lock2i(0, 0, .8), AC2I]);
  return W(s + shade3()); };
WMASC.h22ihook = (ev, t, lt) => { const au = ev.aus, fu = ev.funk;
  if (fu !== undefined) return stay3([lerp(FX2I, 380, ease(cl(fu / 1))), GY2I], 1, { r: 0, mood: 'cool', walk: fu < 1 });
  const k = au === undefined ? 0 : Math.sin(Math.PI * cl((au - 1.4) / 1.2)); return stay3([FX2I, GY2I - 20 * k], 1, { r: -10 * k, mood: k > .2 ? 'shock' : 'happy' }); };

// ---------- Teil 1: nicht ganz aus ----------
WORLD.h22iaus = function (sc, ev, t, lt) { const se = ev.sende, bt = ev.bt, el = ev.elf; let s = stop2i(t) + rings2i(PH2I[0], PH2I[1], t, .6);
  if (se !== undefined) s += lupeH(600, 880, 250, inside2i(t, { bt: bt === undefined ? cl((se - 1) / .5) : 1, clock: bt === undefined ? 0 : cl((bt - .8) / .4) }), cl(se / .45), PH2I[0], PH2I[1] - 30);
  return W(s + shade3(), slot(ev, [['sende', 'Funkt weiter, obwohl aus', 'hot'], ['bt', 'Bluetooth, bis zu 24 h'], ['elf', 'Ab iPhone 11, ohne SE', 'hot']])); };
WMASC.h22iaus = (ev, t, lt) => { const bt = ev.bt; if (bt !== undefined) { const j = Math.sin(Math.PI * cl((bt - .6) / .6)); return stay3([380, GY2I - 26 * j], 1, { r: 0, mood: 'shock' }); } return stay3([380, GY2I], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 2: fremde Helfer ----------
WORLD.h22ihelf = function (sc, ev, t, lt) { const ha = ev.haken, fr = ev.fremd, me = ev.melde, mr = ev.mrd; let s = stop2i(t) + rings2i(PH2I[0], PH2I[1], t, 1) + hakenH(fr === undefined ? ha : undefined, t);
  const wx = fr === undefined ? 1300 : lerp(1300, 940, ease(cl(fr / 2.4))), glow = me === undefined ? 0 : cl(me / .5);
  if (fr !== undefined) s += walker2i(wx, fr < 2.4 ? t : 0, glow);
  if (me !== undefined && mr === undefined) { const c = (t * .7) % 1; s += cloud2i(820, 620, cl((me - .3) / .4), svgT(0, 18, 'Apple', 40, ST2I)) + (me > .8 ? packet2i([wx + 65, 1366], [820, 640], c, 0) : ''); }
  if (mr !== undefined) { const k = cl(mr / .5); s += '<g opacity="' + k.toFixed(2) + '"><circle cx="560" cy="820" r="230" fill="#1C2E6A" stroke="' + BT2I + '" stroke-width="6"/>'; for (let i = 0; i < 80; i++) { const a = rnd(i + 5) * 6.28, r = Math.sqrt(rnd(i + 9)) * 210; s += '<circle cx="' + (560 + r * Math.cos(a)).toFixed(0) + '" cy="' + (820 + r * Math.sin(a)).toFixed(0) + '" r="6" fill="' + BT2I + '" opacity="' + (.4 + .6 * Math.abs(Math.sin(t * 3 + i))).toFixed(2) + '"/>'; } s += '</g>' + chip3(560, 1100, 'über 1 Milliarde Geräte', 32, '#FFE14D', ST2I, cl((mr - .6) / .3)); }
  return W(s + shade3(), slot(ev, [['haken', 'Jetzt wird es verrückt', 'red'], ['fremd', 'Fremde Geräte helfen', 'hot'], ['melde', 'Sie melden den Ort'], ['mrd', 'Riesiges Netzwerk', 'hot']])); };
WMASC.h22ihelf = (ev, t, lt) => { const ha = ev.haken, me = ev.melde; if (me !== undefined) return stay3([380, GY2I], 1, { r: 3, mood: 'happy' }); if (ha !== undefined) { const j = Math.sin(Math.PI * cl(ha / .5)); return stay3([380, GY2I - 30 * j], 1, { r: -6 * j, mood: 'shock' }); } return stay3([380, GY2I], 1, { r: 2 }); };

// ---------- Teil 3: wer sieht das? ----------
WORLD.h22isicher = function (sc, ev, t, lt) { const fr = ev.frage, sc2 = ev.schloss, an = ev.anonym, re = ev.regler; let s = stop2i(t) + rings2i(PH2I[0], PH2I[1], t, 1);
  s += walker2i(940, 0, 1, fr !== undefined && sc2 === undefined ? cl(fr / .4) : 0);
  const c = (t * .7) % 1; s += cloud2i(820, 620, 1, an !== undefined ? svgT(0, 18, 'Wer? Wem?', 32, ST2I) : (sc2 !== undefined ? lock2i(0, 0, .8) : svgT(0, 18, 'Apple', 40, ST2I))) + packet2i([1005, 1366], [820, 640], c, sc2 !== undefined);
  if (sc2 !== undefined && an === undefined) s += chip3(560, 1100, 'nur deine Geräte haben den Schlüssel', 28, '#FFE14D', ST2I, cl((sc2 - 1) / .3));
  if (re !== undefined) { const k = cl(re / .4); s += '<g opacity="1" transform="translate(540 880) scale(' + back(k).toFixed(3) + ')"><rect x="-200" y="-260" width="400" height="520" rx="50" fill="' + ST2I + '" stroke="#F4F6FB" stroke-width="10"/><rect x="-180" y="-150" width="360" height="90" rx="45" fill="#3A4060"/><circle cx="-135" cy="-105" r="38" fill="#F4F6FB"/><path d="M-148 -118 h26 v26" stroke="#FF4D6D" stroke-width="7" fill="none"/>' + svgT(30, -96, 'ausschalten', 30, '#AEB9D6') + '<rect x="-170" y="-20" width="340" height="70" rx="16" fill="#2A3060" stroke="' + (re > 1.5 ? '#FFE14D' : '#2A3060') + '" stroke-width="6"/>' + svgT(0, 24, 'nach Ausschalten auffindbar', 22, '#F4F6FB') + (re > 1.5 ? '<circle cx="120" cy="20" r="' + (24 + 8 * Math.sin(t * 8)).toFixed(0) + '" fill="#FFE14D" opacity=".5"/>' : '') + '</g>'; }
  return W(s + shade3(), slot(ev, [['frage', 'Sieht das jeder?', 'red'], ['schloss', 'Ort ist verschlüsselt', 'hot'], ['anonym', 'Helfer bleibt anonym'], ['regler', 'Abschalten geht']])); };
WMASC.h22isicher = (ev, t, lt) => { const w = ease(cl(lt / 1)); return stay3([lerp(380, 220, w), GY2I], 1, { r: 0, mood: ev.schloss !== undefined ? 'cool' : 'shock', walk: w > 0 && w < 1, flip: w < 1 }); };

// ---------- Schluss ----------
WORLD.h22iout = function (sc, ev, t, lt) { const au = ev.auf, re = ev.regler, sv = ev.save; const off = sv === undefined ? 0 : cl(sv / .2);
  let s = stop2i(t, { on: sv === undefined ? 0 : 1 - cl(sv / .3) }) + rings2i(PH2I[0], PH2I[1], t, 1 - off);
  if (au !== undefined && re === undefined) s += loopH(1, t, ['Alle?', '<circle cx="-22" cy="-14" r="16" fill="#1D2147"/><circle cx="18" cy="-14" r="16" fill="#1D2147"/><path d="M-50 40 Q-22 0 6 40 M-10 40 Q18 0 46 40" fill="#1D2147"/>', '#FF4D6D'], ['Nur du', lock2i(0, 0, .8), AC2I], 1, cl((au - 1.4) / .5));
  return W(s + shade3()); };
WMASC.h22iout = (ev, t, lt) => { const sv = ev.save; if (sv !== undefined) return stay3([lerp(220, FX2I, ease(cl(sv / .8))), GY2I], 1, { r: 0, mood: 'happy', walk: sv < .8 }); return stay3([220, GY2I], 1, { r: 2, mood: 'cool' }); };

['h22ihook', 'h22iaus', 'h22ihelf', 'h22isicher', 'h22iout'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC2I); });
