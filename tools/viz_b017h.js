// B017H "Sieht dich ein T. rex wirklich nicht, wenn du stillstehst?" (Bio, Dino-Skript, HOOK-PILOT wie P022H, Kostuem B2 Dino-Kostuem), stumme Demo v1 (20.11.2026).
// Ort (eigens gebaut): Urzeit-Flussufer in der Abenddaemmerung mit Vulkan, Nadelbaeumen und Farnen. Der T. rex steht auf der hinteren Wiese (Fuesse y 1130), Schalti vorn.
// Einstieg: T. rex kommt, Schalti erstarrt zur Statue, der T. rex senkt den Kopf zu ihm und bruellt. Teil 1 Lupe auf den Kopf von oben (Augen nach vorn, 55 Grad),
// Teil 2 Lupe aufs Auge, Fernsicht bis zum Vulkan, Teil 3 der T. rex schaut weg, Schalti schleicht, Duftfaeden, Beschnuppern.
// Zum Loeschen: diese Datei und videos/B017H.
var AC17 = '#A8E63C', ST17 = '#0B1020', GY17 = 1545, FX17 = 260, RX17 = 780, RY17 = 1130;
function land17(t) { let s = '<defs><linearGradient id="sk17" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A2E7A"/><stop offset=".55" stop-color="#E07A6A"/><stop offset="1" stop-color="#FFC98A"/></linearGradient><linearGradient id="gr17" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6FA84A"/><stop offset="1" stop-color="#2F6A34"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk17)"/>';
  s += '<circle cx="240" cy="820" r="70" fill="#FFE6A8" opacity=".9"/><circle cx="240" cy="820" r="160" fill="#FFE6A8" opacity=".15"/>';
  // Vulkan mit Rauch
  s += '<path d="M560 980 L760 700 L820 700 L1040 980 Z" fill="#6A4A6A"/><path d="M760 700 L790 720 L820 700" fill="#FF7A3A"/>'; for (let i = 0; i < 4; i++) { const c = (t * .08 + i / 4) % 1; s += '<circle cx="' + (790 + 60 * c + 10 * Math.sin(t + i)).toFixed(0) + '" cy="' + (690 - 220 * c).toFixed(0) + '" r="' + (30 + 50 * c).toFixed(0) + '" fill="#8A7A9A" opacity="' + (.5 * (1 - c)).toFixed(2) + '"/>'; }
  // Hinterer Wald (Nadelbaeume)
  for (let i = 0; i < 12; i++) { const x = i * 95 - 20, h = 140 + rnd(i + 3) * 110; s += '<path d="M' + x + ' 1020 L' + (x + 40) + ' ' + (1020 - h).toFixed(0) + ' L' + (x + 80) + ' 1020 Z" fill="#2E4A3A"/>'; }
  // Fluss
  s += '<path d="M-20 1040 Q300 1010 560 1040 T1100 1030 V1080 Q700 1100 400 1076 T-20 1086 Z" fill="#5CB8D8" opacity=".85"/><path d="M80 1056 h120 M600 1060 h90" stroke="#E8F7FF" stroke-width="5" opacity=".6"/>';
  // Hintere Wiese (T. rex) und vordere Wiese (Schalti)
  s += '<path d="M-20 1080 Q540 1060 1100 1080 V1920 H-20 Z" fill="url(#gr17)"/>';
  let f = ''; for (let i = 0; i < 3; i++) f += frondD(-10, 1180, -60 + i * 16, 210, t, i % 2 ? '#35A85C' : '#22874A', i); for (let i = 0; i < 3; i++) f += frondD(1090, 1180, -120 - i * 16, 220, t, i % 2 ? '#22874A' : '#35A85C', i + 5);
  return s + f; }
const fg17 = t => lowD(t, 1, 1560);
function rex17(x, y, s, t, o) { return '<g data-figur="T. rex">' + rexd(x, y, s, t, Object.assign({ id: 't' }, o)) + '</g>'; }
// Schalti als Statue (grau, starr), k 0..1
const statue17 = k => k > 0 ? 'grayscale(' + k.toFixed(2) + ') brightness(' + (1 - .1 * k).toFixed(2) + ')' : '';
// Kopf von oben mit zwei Sichtkegeln. ov: Ueberlappung zeigen
function top17(t, k, ov) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#2F6A34"/>';
  const A = -90 * Math.PI / 180, cone = (a0, a1, col, op) => { const r = 300; return '<path d="M0 -40 L' + (r * Math.cos(a0)).toFixed(0) + ' ' + (-40 + r * Math.sin(a0)).toFixed(0) + ' A' + r + ' ' + r + ' 0 0 1 ' + (r * Math.cos(a1)).toFixed(0) + ' ' + (-40 + r * Math.sin(a1)).toFixed(0) + ' Z" fill="' + col + '" opacity="' + op + '"/>'; };
  const d = Math.PI / 180; s += cone(A - 80 * d, A + 27.5 * d, '#5CB8FF', (.35 * k).toFixed(2)) + cone(A - 27.5 * d, A + 80 * d, '#FFE14D', (.35 * k).toFixed(2));
  if (ov) s += cone(A - 27.5 * d, A + 27.5 * d, '#FF6B3A', (.7 * cl(ov)).toFixed(2)) + svgT(0, -230, '55°', 56, '#fff');
  s += '<path d="M-90 260 Q-110 60 -60 -20 Q-30 -70 0 -80 Q30 -70 60 -20 Q110 60 90 260 Z" fill="#F58B3A" stroke="' + ST17 + '" stroke-width="7"/><path d="M-40 120 Q0 140 40 120 M-50 180 Q0 200 50 180" stroke="#C9541E" stroke-width="8" fill="none"/>';
  for (const sg of [-1, 1]) s += '<ellipse cx="' + (sg * 42) + '" cy="-20" rx="16" ry="20" fill="#FFE14D" stroke="' + ST17 + '" stroke-width="5"/><circle cx="' + (sg * 42) + '" cy="-26" r="7" fill="' + ST17 + '"/>';
  return s; }
// Auge in Nahaufnahme
function eye17(t) { const bl = (t % 3.2) < .12 ? .1 : 1; return '<rect x="-320" y="-320" width="640" height="640" fill="#E07A3A"/><path d="M-320 -140 Q0 -200 320 -150" stroke="#C9541E" stroke-width="22" fill="none"/><ellipse cx="0" cy="20" rx="170" ry="' + (120 * bl).toFixed(0) + '" fill="#FFE14D" stroke="' + ST17 + '" stroke-width="10"/><ellipse cx="0" cy="20" rx="34" ry="' + (100 * bl).toFixed(0) + '" fill="' + ST17 + '"/><circle cx="-50" cy="-30" r="22" fill="#fff" opacity=".85"/>'; }
// Duftfaeden von Schalti zur Nase
function scent17(a, b, t, k) { if (k <= 0) return ''; let s = ''; for (let i = 0; i < 3; i++) { let d = 'M' + a[0] + ' ' + (a[1] + i * 18); for (let j = 1; j <= 10; j++) { const f = j / 10, x = lerp(a[0], b[0], f), y = lerp(a[1] + i * 18, b[1], f) + 18 * Math.sin(f * 9 + t * 4 + i); d += ' L' + x.toFixed(0) + ' ' + y.toFixed(0); } s += '<path d="' + d + '" stroke="#C9F27A" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="' + (900 * cl(k)).toFixed(0) + ' 900" opacity=".85"/>'; } return s; }
const eyesIc17 = '<ellipse cx="-20" cy="0" rx="18" ry="22" fill="#FFE14D" stroke="#0B1020" stroke-width="5"/><ellipse cx="22" cy="0" rx="18" ry="22" fill="#FFE14D" stroke="#0B1020" stroke-width="5"/><circle cx="-20" cy="0" r="8" fill="#0B1020"/><circle cx="22" cy="0" r="8" fill="#0B1020"/>';
const noseIc17 = '<path d="M-40 20 Q-40 -30 0 -36 Q40 -30 40 20 Z" fill="#F58B3A" stroke="#0B1020" stroke-width="5"/><circle cx="-14" cy="6" r="7" fill="#0B1020"/><circle cx="14" cy="6" r="7" fill="#0B1020"/>';

// ---------- Einstieg ----------
WORLD.h17hook = function (sc, ev, t, lt) { const st = ev.still, br = ev.brull, lo = ev.loop; let s = land17(t);
  const w = ease(cl(lt / 1.6)), x = lerp(1250, RX17, w), bend = st === undefined ? 0 : ease(cl((st - .8) / 1)), roar = br === undefined ? 0 : (br < 1.6 ? 1 : 1 - cl((br - 1.6) / .4));
  s += rex17(x, RY17, 1.05, t, { run: w < 1, ph: stepD(x - 1250, 1.1), head: 24 * bend * (1 - .6 * roar), jaw: roar > 0 ? .7 + .3 * Math.abs(Math.sin(t * 24)) : .1 * bend });
  s += roard(x - 260, RY17 - 360 + 80 * bend, 180, t, roar);
  if (br !== undefined && lo === undefined) s += '<g data-text="1">' + svgT(560, 1720, 'RAWR!', 90, '#FFE14D') + '</g>';
  if (lo !== undefined) s += cardH(280, 735, 'Augen', eyesIc17, AC17, cl(lo / .45)) + cardH(800, 735, 'Nase', noseIc17, AC17, cl((lo - .25) / .45)) + vsH(cl((lo - .6) / .4), t);
  return W(s + fg17(t) + shade3()); };
WMASC.h17hook = (ev, t, lt) => { const st = ev.still, br = ev.brull, lo = ev.loop;
  if (br !== undefined) { const k = ease(cl((br - .2) / .8)); return stay3([lerp(FX17, 170, k), GY17], 1, { r: -12 * Math.sin(Math.PI * cl(br / 1.2)), mood: 'shock', walk: k > 0 && k < 1, fx: statue17(1 - cl(br / .3)) }); }
  if (lo !== undefined) return stay3([170, GY17], 1, { r: 2, mood: 'happy' });
  const sk = st === undefined ? cl((lt - .3) / .4) : 1; return stay3([FX17, GY17], 1, { r: 0, mood: 'shock', fx: statue17(sk), nospin: 1 }); };

// ---------- Teil 1: Augen nach vorn ----------
WORLD.h17augen = function (sc, ev, t, lt) { const vo = ev.vorn, gr = ev.grad, ra = ev.raum, sn = ev.schnauze; let s = land17(t);
  const look = Math.sin(t * .9) * 6; s += rex17(RX17, RY17, 1.05, t, { head: 10 + look });
  if (vo !== undefined && ra === undefined) s += lupeH(560, 860, 230, top17(t, cl(vo / .6), gr === undefined ? 0 : cl((gr - .3) / .6)), cl(vo / .45), RX17 - 150, RY17 - 370);
  if (sn !== undefined) s += chip3(560, 1110, 'schmale Schnauze, freier Blick', 28, '#FFE14D', ST17, cl((sn - .6) / .3)) + '<ellipse cx="' + (RX17 - 205) + '" cy="' + (RY17 - 340) + '" rx="80" ry="44" fill="none" stroke="#FFE14D" stroke-width="6" stroke-dasharray="14 10" opacity="' + cl(sn / .4).toFixed(2) + '"/>';
  if (ra !== undefined && sn === undefined) { const k = cl(ra / .6); for (const e of [[RX17 - 150, RY17 - 372], [RX17 - 140, RY17 - 360]]) s += '<path d="M' + e[0] + ' ' + e[1] + ' L' + (FX17 + 60) + ' ' + (GY17 - 140) + '" stroke="#FFE14D" stroke-width="5" stroke-dasharray="14 10" opacity="' + k.toFixed(2) + '"/>'; s += '<circle cx="' + (FX17 + 60) + '" cy="' + (GY17 - 140) + '" r="' + (80 + 8 * Math.sin(t * 6)).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="6" opacity="' + k.toFixed(2) + '"/>'; }
  return W(s + fg17(t) + shade3(), slot(ev, [['vorn', 'Augen nach vorn'], ['grad', 'Rund 55° mit beiden Augen', 'hot'], ['raum', 'Sieht auch Stillstehendes', 'hot'], ['schnauze', 'Schmalere Schnauze']])); };
WMASC.h17augen = (ev, t, lt) => { const ra = ev.raum; if (ra !== undefined) return stay3([FX17, GY17], 1, { r: 0, mood: 'shock', fx: statue17(cl(ra / .4)) }); return stay3([lerp(170, FX17, ease(cl(lt / .9))), GY17], 1, { r: 2 * Math.sin(t * 2), walk: lt < .9 }); };

// ---------- Teil 2: scharf wie ein Fernglas ----------
WORLD.h17scharf = function (sc, ev, t, lt) { const ha = ev.haken, dr = ev.dreizehn, km = ev.km, ad = ev.adler; let s = land17(t);
  s += rex17(RX17, RY17, 1.05, t, { head: km !== undefined ? -14 : 10 + 4 * Math.sin(t) });
  s += hakenH(dr === undefined ? ha : undefined, t);
  if (dr !== undefined && km === undefined) s += lupeH(560, 860, 230, eye17(t), cl(dr / .45), RX17 - 150, RY17 - 370) + chip3(560, 1100, 'bis zu 13× schärfer (Schätzung)', 28, '#FFE14D', ST17, cl((dr - 1.2) / .3));
  if (km !== undefined && ad === undefined) { const k = cl(km / .5); s += '<g opacity="' + k.toFixed(2) + '"><path d="M' + (RX17 - 250) + ' ' + (RY17 - 335) + ' L790 705" stroke="#FFE14D" stroke-width="5" stroke-dasharray="14 10"/><circle cx="790" cy="705" r="' + (40 + 6 * Math.sin(t * 6)).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="6"/></g>' + chip3(300, 900, 'du: 1,6 km', 30, '#F4F6FB', ST17, cl((km - .6) / .3)) + chip3(800, 620, 'T. rex: rund 6 km', 30, '#FFE14D', ST17, cl((km - 1.6) / .3)); }
  if (ad !== undefined) s += chip3(800, 700, 'Adler: rund 3,6×', 30, '#F4F6FB', ST17, cl((ad - .3) / .3)) + chip3(800, 780, 'T. rex: bis zu 13×', 30, '#FFE14D', ST17, cl((ad - .9) / .3));
  return W(s + fg17(t) + shade3(), slot(ev, [['haken', 'Jetzt wird es unheimlich', 'red'], ['dreizehn', 'Riesige, scharfe Augen', 'hot'], ['km', 'Sah sehr weit'], ['adler', 'Vergleich: Adler']])); };
WMASC.h17scharf = (ev, t, lt) => { const ha = ev.haken, km = ev.km; if (km !== undefined) return stay3([FX17, GY17], 1, { r: -6, mood: 'happy' }); if (ha !== undefined) { const j = Math.sin(Math.PI * cl(ha / .5)); return stay3([FX17, GY17 - 30 * j], 1, { r: -6 * j, mood: 'shock' }); } return stay3([FX17, GY17], 1, { r: 2 }); };

// ---------- Teil 3: die Nase ----------
WORLD.h17nase = function (sc, ev, t, lt) { const we = ev.weg, na = ev.nase, sn = ev.schnupper; let s = land17(t);
  const turnBack = sn === undefined ? 0 : ease(cl(sn / .8)), away = we === undefined ? 0 : ease(cl(we / .6)) * (1 - turnBack);
  // wegschauen: er dreht sich um (flip), dann wieder zurueck
  const kx = away > 0 && away < 1 ? Math.abs(Math.cos(Math.PI * away)) * .9 + .1 : 1;
  s += rex17(RX17, RY17, 1.05, t, { flip: away > .5, kx: kx, head: sn !== undefined ? 30 * turnBack : -10, jaw: na !== undefined ? .15 * Math.abs(Math.sin(t * 8)) : 0 });
  if (na !== undefined) s += scent17([FX17 + 70, GY17 - 150], away > .5 ? [RX17 + 250, RY17 - 330] : [RX17 - 150, RY17 - 370], t, cl(na / 1.4)) + chip3(560, 1075, 'beste Nase aller Raubsaurier', 28, '#C9F27A', ST17, cl((na - 2) / .3));
  return W(s + fg17(t) + shade3(), slot(ev, [['weg', 'Er schaut weg'], ['nase', 'Riesiger Riechteil im Gehirn', 'hot'], ['schnupper', 'Sieht dich, riecht dich', 'red']])); };
WMASC.h17nase = (ev, t, lt) => { const we = ev.weg, sn = ev.schnupper;
  if (sn !== undefined) return stay3([360, GY17], 1, { r: 0, mood: 'shock', fx: statue17(cl(sn / .4)) });
  if (we !== undefined) { const k = ease(cl((we - .4) / 3)); return stay3([lerp(FX17, 360, k), GY17], 1, { r: 6 * Math.sin(t * 6), mood: 'cool', walk: k > 0 && k < 1 }); }
  return stay3([FX17, GY17], 1, { r: 2 }); };

// ---------- Schluss ----------
WORLD.h17out = function (sc, ev, t, lt) { const fr = ev.frage2, au = ev.auf, sv = ev.save; let s = land17(t);
  const w = sv === undefined ? 0 : ease(cl(sv / 1.4)); s += rex17(sv === undefined ? RX17 : lerp(RX17, 1300, w), RY17, 1.05, t, { head: sv === undefined ? 20 : 0, run: sv !== undefined && w < 1, ph: stepD(500 * w, 1.1), flip: sv !== undefined });
  const off = sv === undefined ? 0 : cl(sv / .2);
  if (fr !== undefined && off < 1) { const hi = au === undefined ? 0 : ease(cl(au / .5)); s += '<g opacity="' + (1 - off).toFixed(2) + '">' + cardH(280, 735, 'Augen', eyesIc17, AC17, cl(fr / .45), hi) + cardH(800, 735, 'Nase', noseIc17, AC17, cl((fr - .25) / .45), hi) + vsH(au === undefined ? cl((fr - .6) / .4) : 1 - cl(au / .3), t) + '</g>'; }
  return W(s + fg17(t) + shade3()); };
WMASC.h17out = (ev, t, lt) => { const au = ev.auf, sv = ev.save; if (sv !== undefined) return stay3([lerp(360, FX17, ease(cl(sv / .8))), GY17], 1, { r: 0, mood: 'happy', walk: sv < .8 }); if (au !== undefined) { const k = ease(cl(au / 1.2)); return stay3([lerp(360, 200, k), GY17], 1, { r: 0, mood: 'cool', walk: k > 0 && k < 1 }); } return stay3([360, GY17], 1, { r: 2, mood: 'shock' }); };

['h17hook', 'h17augen', 'h17scharf', 'h17nase', 'h17out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC17); });
