// B017H3 "Sieht dich ein T. rex wirklich nicht, wenn du stillstehst?" (Bio, Dino-Skript, Hook-Pilot v3, 20.11.2026).
// Benedikt 20.11.2026: zu wenig passiert, zu viele Texte, immer nur die Lupe. v3: Jeder Teil hat eine eigene Animation.
// Einstieg: Stampfen mit Wackelkamera, der T. rex kommt gross ins Bild, Bruellen mit Druckwelle, Kamera faehrt auf Auge und Nasenloch.
// Teil 1 Draufsicht auf den Kopf (Sichtkegel wachsen, Ueberlappung, zwei Bilder werden eins, Schnauze wird schmaler).
// Teil 2 Blick durch sein Auge (Wisch: unscharf gegen scharf), Entfernungs-Leiste 1,6 km gegen 6 km, Balken-Wettrennen Du/Adler/T. rex.
// Teil 3 Wegschauen, Roentgenblick in den Kopf (grosser Riechteil), Duftbaender, Beschnuppern.
// Tiere im Ort: Triceratops-Herde in der Ferne, Flugsaurier am Himmel (beide lebten zur selben Zeit wie T. rex bzw. in der Oberkreide).
var A17c = '#A8E63C', S17c = '#0B1020', GY17c = 1545, FX17c = 220;
const hd17c = (x, y, S) => [x - 142.9 * S * .82, y - 353 * S * .82];
function shake17c(lt, hits) { let d = 0; hits.forEach(h => { const u = lt - h; if (u > 0 && u < .45) d += 18 * Math.sin(u * 70) * (1 - u / .45); }); return d; }
// Hintergrund: Abend-Urzeit mit Tiefe, Herde in der Ferne, Flugsaurier
function land17c(t, o) { o = o || {}; let s = land17(t);
  // Triceratops-Herde als Silhouetten am Fluss
  for (let i = 0; i < 4; i++) { const x = ((t * 8 + i * 140) % 1300) - 120, y = 1030 + (i % 2) * 8, z = .32 + .06 * (i % 2); s += '<g transform="translate(' + x.toFixed(0) + ' ' + y + ') scale(' + z + ')" opacity=".55"><ellipse cx="0" cy="-60" rx="110" ry="60" fill="#3A2E4A"/><path d="M-100 -80 L-170 -120 L-150 -40 Z" fill="#3A2E4A"/><path d="M-140 -110 l-40 -30 M-120 -112 l-30 -40" stroke="#3A2E4A" stroke-width="10"/><rect x="-70" y="-20" width="22" height="40" fill="#3A2E4A"/><rect x="40" y="-20" width="22" height="40" fill="#3A2E4A"/></g>'; }
  // Flugsaurier
  for (let i = 0; i < 3; i++) { const x = ((t * 40 + i * 400) % 1400) - 160, y = 700 + 40 * i + 20 * Math.sin(t + i), f = Math.sin(t * 5 + i) * 18; s += '<path d="M' + (x - 50).toFixed(0) + ' ' + (y + f).toFixed(0) + ' Q' + (x - 20).toFixed(0) + ' ' + (y - 10).toFixed(0) + ' ' + x.toFixed(0) + ' ' + y.toFixed(0) + ' Q' + (x + 20).toFixed(0) + ' ' + (y - 10).toFixed(0) + ' ' + (x + 50).toFixed(0) + ' ' + (y + f).toFixed(0) + '" stroke="#2A1E3A" stroke-width="6" fill="none" stroke-linecap="round"/>'; }
  return s; }
const fg17c = t => lowD(t, 1, 1560);
// Staubwolke
function dust17c(x, y, k) { if (k <= 0 || k >= 1) return ''; let s = ''; for (let i = 0; i < 9; i++) { const a = Math.PI * (1 + i / 8), r = 40 + 160 * ease(k); s += '<circle cx="' + (x + r * Math.cos(a)).toFixed(0) + '" cy="' + (y + .35 * r * Math.sin(a)).toFixed(0) + '" r="' + (30 + 30 * k).toFixed(0) + '" fill="#C8A878" opacity="' + (.7 * (1 - k)).toFixed(2) + '"/>'; } return s; }
function comic17c(txt, k, t, x, y, fs) { if (k <= 0) return ''; const z = back(cl(k / .3)) * (1 + .04 * Math.sin(t * 20)); return '<g data-text="1" transform="translate(' + (x || 700) + ' ' + (y || 1350) + ') rotate(-6) scale(' + z.toFixed(2) + ')"><text x="0" y="0" text-anchor="middle" font-size="' + (fs || 92) + '" font-weight="900" font-family="Inter Display" fill="#FFE14D" stroke="' + S17c + '" stroke-width="10" paint-order="stroke">' + txt + '</text></g>'; }

// ---------- Einstieg ----------
WORLD.b3hook = function (sc, ev, t, lt) { const st = ev.still, br = ev.brull, lo = ev.loop;
  const RX = 600, RY = 1235, S = 1.6, w = ease(cl(lt / 1.3)), x = lerp(860, RX, w), bend = st === undefined ? .3 : .3 + .7 * ease(cl((st - .8) / 1)), roar = br === undefined ? 0 : (br < 1.6 ? 1 : 1 - cl((br - 1.6) / .4));
  const sh = shake17c(lt, [.05, .65, 1.25]) + (roar > .5 ? 8 * Math.sin(t * 60) : 0);
  const pk = br === undefined ? 0 : Math.exp(-Math.pow((br - .25) * 5, 2)), cz = (lo === undefined ? 1 : 1 + .7 * ease(cl(lo / 1))) * (1 + .12 * pk), h = hd17c(x, RY, S), cxz = lo === undefined ? 540 : lerp(540, h[0] + 40, ease(cl(lo / 1))), cyz = lo === undefined ? 960 : lerp(960, h[1] + 60 + 24 * bend, ease(cl(lo / 1)));
  let s = '<g transform="translate(' + sh.toFixed(1) + ' ' + (sh * .5).toFixed(1) + ') translate(540 960) scale(' + cz.toFixed(3) + ') translate(' + -cxz.toFixed(1) + ' ' + -cyz.toFixed(1) + ')">' + land17c(t);
  s += rex17(x, RY, S, t, { run: w < 1, ph: stepD(x - 860, 1.1), head: 26 * bend * (1 - .6 * roar), jaw: roar > 0 ? .7 + .3 * Math.abs(Math.sin(t * 24)) : .08 });
  [[.05, 940], [.65, 790], [1.25, 650]].forEach(p => s += dust17c(p[1], RY + 10, (lt - p[0]) / .8));
  s += roard(h[0] - 80, h[1] + 40 + 80 * bend, 180, t, roar);
  if (lo !== undefined) { const k = cl((lo - .8) / .4), ey = [h[0] + 6, h[1] + 30 * bend + 6]; s += '<circle cx="' + ey[0].toFixed(0) + '" cy="' + ey[1].toFixed(0) + '" r="' + (28 + 6 * Math.sin(t * 6)).toFixed(0) + '" fill="#FFE14D" opacity="' + (.5 * k).toFixed(2) + '"/>';
    const nk = cl((lo - 1.6) / .4); for (let i = 0; i < 3; i++) { const c = (t * 1.2 + i / 3) % 1; s += '<circle cx="' + (h[0] - 120 - 60 * c).toFixed(0) + '" cy="' + (h[1] + 60 * bend + 40 - 20 * c).toFixed(0) + '" r="' + (10 + 18 * c).toFixed(0) + '" fill="#E8F7FF" opacity="' + (.6 * nk * (1 - c)).toFixed(2) + '"/>'; } }
  s += (lo === undefined ? fg17c(t) : '') + '</g>';
  if (br !== undefined && br < 1.6) s += comic17c('RAWR!', br, t, 700, 1440, 92);
  return W(s + shade3()); };
WMASC.b3hook = (ev, t, lt) => { const st = ev.still, br = ev.brull, lo = ev.loop;
  if (lo !== undefined) return stay3([FX17c, GY17c], 1, { r: 2, mood: 'shock', fx: statue17(1 - cl(lo / .4)) });
  if (br !== undefined) return stay3([FX17c - 20 * Math.sin(Math.PI * cl(br / .6)), GY17c], 1, { r: -12 * Math.sin(Math.PI * cl(br / 1.2)), mood: 'shock', fx: statue17(1) });
  const j = Math.sin(Math.PI * cl(lt / .4)); return stay3([FX17c, GY17c - 40 * j], 1, { r: 0, mood: 'shock', fx: statue17(cl((lt - .35) / .3)) }); };

// ---------- Teil 1: Draufsicht ----------
// Kopf von oben, gross. sn: Schnauzenbreite 1 = breit (Vorfahren), 0 = T. rex
function top17c(cx, cy, z, t, o) { o = o || {}; const sn = o.sn || 0; let s = '<g transform="translate(' + cx + ' ' + cy + ') scale(' + z + ')">';
  const d = Math.PI / 180, A = -Math.PI / 2, half = (27.5 + 0 * sn) * d, inner = (27.5 - 22 * sn) * d, k = cl(o.k || 0), R = 330 * ease(k);
  const cone = (a0, a1, col, op) => R <= 1 ? '' : '<path d="M0 -40 L' + (R * Math.cos(a0)).toFixed(0) + ' ' + (-40 + R * Math.sin(a0)).toFixed(0) + ' A' + R + ' ' + R + ' 0 0 1 ' + (R * Math.cos(a1)).toFixed(0) + ' ' + (-40 + R * Math.sin(a1)).toFixed(0) + ' Z" fill="' + col + '" opacity="' + op + '"/>';
  s += cone(A - 80 * d, A + inner, '#5CB8FF', .32) + cone(A - inner, A + 80 * d, '#FFE14D', .32);
  const ov = cl(o.ov || 0); if (ov > 0) { s += cone(A - inner, A + inner, '#FF6B3A', (.65 * ov).toFixed(2)); const ar = 270; s += '<path d="M' + (ar * Math.cos(A - inner)).toFixed(0) + ' ' + (-40 + ar * Math.sin(A - inner)).toFixed(0) + ' A' + ar + ' ' + ar + ' 0 0 1 ' + (ar * Math.cos(A + inner)).toFixed(0) + ' ' + (-40 + ar * Math.sin(A + inner)).toFixed(0) + '" stroke="#fff" stroke-width="8" fill="none" opacity="' + ov.toFixed(2) + '"/>'; if (sn < .1) s += '<g opacity="' + ov.toFixed(2) + '">' + svgT(0, -40 - ar * .3, '55°', 60, '#fff') + '</g>'; }
  // Kopf (Draufsicht), Schnauze je nach sn breiter
  const sw = 60 + 55 * sn;
  s += '<path d="M-90 300 Q-100 420 -70 520 H70 Q100 420 90 300 Z" fill="#E8792E" stroke="' + S17c + '" stroke-width="8"/>';
  s += '<path d="M-125 300 Q-140 90 -' + (sw + 14) + ' -10 Q-' + (sw - 4) + ' -88 0 -104 Q' + (sw - 4) + ' -88 ' + (sw + 14) + ' -10 Q140 90 125 300 Q0 330 -125 300 Z" fill="#F58B3A" stroke="' + S17c + '" stroke-width="8"/>';
  s += '<path d="M-' + (sw + 6) + ' 0 Q-' + (sw + 30) + ' 120 -118 280 M' + (sw + 6) + ' 0 Q' + (sw + 30) + ' 120 118 280" stroke="#C9541E" stroke-width="10" fill="none" opacity=".6"/>';
  for (let i = 0; i < 7; i++) { const yy = 20 + i * 36, xx = (sw + 18) + i * 7; s += '<path d="M-' + xx + ' ' + yy + ' l-12 8 l12 6 M' + xx + ' ' + yy + ' l12 8 l-12 6" fill="#FFF2DC" stroke="' + S17c + '" stroke-width="3"/>'; }
  s += '<ellipse cx="-18" cy="-80" rx="8" ry="5" fill="' + S17c + '"/><ellipse cx="18" cy="-80" rx="8" ry="5" fill="' + S17c + '"/>';
  for (let i = 0; i < 12; i++) s += '<circle cx="' + ((rnd(i + 40) - .5) * 160).toFixed(0) + '" cy="' + (60 + rnd(i + 50) * 220).toFixed(0) + '" r="' + (5 + rnd(i) * 6).toFixed(0) + '" fill="#C9541E" opacity=".5"/>';
  s += '<path d="M-90 40 Q-50 10 -30 40 M90 40 Q50 10 30 40" stroke="#B9431A" stroke-width="12" fill="none" stroke-linecap="round"/>';
  // Augen: bei breiter Schnauze weiter seitlich
  const ex = 58 + 34 * sn, ea = 20 * sn; for (const g of [-1, 1]) s += '<g transform="translate(' + (g * ex) + ' 50) rotate(' + (g * ea) + ')"><ellipse rx="18" ry="23" fill="#FFE14D" stroke="' + S17c + '" stroke-width="6"/><circle cy="-6" r="8" fill="' + S17c + '"/></g>';
  return s + '</g>'; }
WORLD.b3augen = function (sc, ev, t, lt) { const vo = ev.vorn, gr = ev.grad, ra = ev.raum, sn = ev.schnauze;
  // Uebergang: Kamera kippt nach oben (Bodenansicht von oben)
  let s = '<defs><radialGradient id="g17t" cx=".5" cy=".55" r=".7"><stop offset="0" stop-color="#4A8A3A"/><stop offset="1" stop-color="#1E3A22"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#g17t)"/>';
  for (let i = 0; i < 26; i++) { const x = rnd(i + 4) * 1080, y = 600 + rnd(i + 8) * 1100, r = 30 + rnd(i) * 50, a = rnd(i + 2) * 360 + 6 * Math.sin(t + i); s += '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + a.toFixed(0) + ')" opacity=".5">' + [0, 1, 2, 3, 4].map(j => '<ellipse cx="' + (r * .5).toFixed(0) + '" rx="' + (r * .55).toFixed(0) + '" ry="' + (r * .12).toFixed(0) + '" fill="#2E6A34" transform="rotate(' + j * 72 + ')"/>').join('') + '</g>'; }
  const zin = 1.25 - .25 * ease(cl(lt / 1)), snw = sn === undefined ? 0 : Math.max(0, 1 - ease(cl((sn - .6) / 2.4)) ) * (sn > .3 ? 1 : cl(sn / .3));
  const CY = 960;
  const rot = 6 * Math.sin(lt * .5), zz2 = gr === undefined ? 1 : 1 + .12 * ease(cl((gr - .2) / 1)) * (ra === undefined ? 1 : 1 - ease(cl(ra / .6))); s += '<g transform="rotate(' + rot.toFixed(2) + ' 560 ' + CY + ') translate(560 ' + CY + ') scale(' + zz2.toFixed(3) + ') translate(-560 -' + CY + ')">';
  if (sn !== undefined) s += '<g opacity="' + (.6 * cl(sn / .4)).toFixed(2) + '" transform="translate(560 ' + CY + ') scale(1.05)"><path d="M-125 300 Q-140 90 -129 -10 Q-111 -88 0 -104 Q111 -88 129 -10 Q140 90 125 300" fill="none" stroke="#F4F6FB" stroke-width="6" stroke-dasharray="16 12"/></g>';
  s += top17c(560, CY, 1.05 * zin, t, { k: vo === undefined ? cl(lt / 1) : 1, ov: gr === undefined ? 0 : cl((gr - .3) / .6), sn: snw }) + '</g>';
  if (ra !== undefined && sn === undefined) { const m = ease(cl((ra - .4) / 1.6)), py = CY - 200, dx = 130 * (1 - m); s += '<g opacity="' + (.6 + .4 * m).toFixed(2) + '"><circle cx="' + (560 - dx).toFixed(0) + '" cy="' + py + '" r="56" fill="none" stroke="#5CB8FF" stroke-width="9"/><circle cx="' + (560 + dx).toFixed(0) + '" cy="' + py + '" r="56" fill="none" stroke="#FFE14D" stroke-width="8"/></g>';
    if (m > .9) s += '<circle cx="560" cy="' + py + '" r="' + (40 + 60 * cl((ra - 2) / .4)).toFixed(0) + '" fill="none" stroke="#fff" stroke-width="6" opacity="' + (1 - cl((ra - 2) / .4)).toFixed(2) + '"/><ellipse cx="572" cy="' + (py + 34) + '" rx="40" ry="12" fill="#000" opacity=".35"/><circle cx="560" cy="' + py + '" r="56" fill="#A8E63C" stroke="' + S17c + '" stroke-width="6"/>'; }
  if (sn !== undefined) { const k = cl(sn / .4), p = ease(cl((sn - .6) / 2.4)); s += '<g opacity="' + k.toFixed(2) + '">' + svgT(800, 1330, p < .5 ? 'Vorfahren' : 'T. rex', 40, '#F4F6FB') + '</g>'; }
  return W(s + shade3(), slot(ev, [['grad', 'Räumlich, auch Stilles', 'hot']])); };
WMASC.b3augen = (ev, t, lt) => { const ra = ev.raum; if (ra !== undefined && ev.schnauze === undefined) return stay3([FX17c, GY17c], 1, { r: 0, mood: 'shock', fx: statue17(cl(ra / .4)) }); return stay3([FX17c, GY17c], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 2: scharf wie ein Fernglas ----------
function eyeIc17c(x, y, z, rex) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + z + ')"><ellipse rx="44" ry="28" fill="' + (rex ? '#F58B3A' : '#F4F6FB') + '" stroke="' + S17c + '" stroke-width="6"/><circle r="18" fill="' + (rex ? '#FFE14D' : '#5CB8FF') + '"/><' + (rex ? 'ellipse rx="5" ry="16"' : 'circle r="8"') + ' fill="' + S17c + '"/></g>'; }
function bars17c(k, t) { const R = [['Du', 1, '#5CB8FF'], ['Adler', 3.6, '#FFE14D'], ['T. rex', 13, '#FF6B3A']]; let s = '';
  R.forEach((r, i) => { const y = 760 + i * 130, kk = ease(cl((k - i * .35) / .9)), w = 600 * r[1] / 13 * kk; s += '<g opacity="' + cl(k * 3 - i).toFixed(2) + '">' + svgT(250, y + 14, r[0], 40, '#fff', 'end') + '<rect x="280" y="' + (y - 34) + '" width="' + Math.max(8, w).toFixed(0) + '" height="68" rx="16" fill="' + r[2] + '" stroke="' + S17c + '" stroke-width="5"/>' + (kk > .9 ? svgT(w > 360 ? 260 + w : 300 + w, y + 16, (r[1] === 13 ? 'bis ' : '') + String(r[1]).replace('.', ',') + '×', 40, w > 360 ? S17c : '#fff', w > 360 ? 'end' : 'start') : '') + '</g>'; });
  return s; }
WORLD.b3scharf = function (sc, ev, t, lt) { const ha = ev.haken, dr = ev.dreizehn, km = ev.km, ad = ev.adler;
  let s = '';
  if (km === undefined && ad === undefined) { // Blick durch die Augen: Wisch zwischen unscharf (Du) und scharf (T. rex)
    const wipe = dr === undefined ? .5 + .08 * Math.sin(t * 1.5) : lerp(.5, .3, ease(cl((dr - .3) / 1.6)));
    s += '<defs><filter id="bl17c"><feGaussianBlur stdDeviation="9"/></filter><clipPath id="cl17a"><rect x="0" y="0" width="' + (1080 * wipe).toFixed(0) + '" height="1920"/></clipPath><clipPath id="cl17b"><rect x="' + (1080 * wipe).toFixed(0) + '" y="0" width="1080" height="1920"/></clipPath></defs>';
    const scene = '<g transform="translate(540 1000) scale(1.6) translate(-700 -990)">' + land17c(t) + '</g>';
    s += '<g clip-path="url(#cl17a)"><g filter="url(#bl17c)">' + scene + '</g></g><g clip-path="url(#cl17b)">' + scene + '</g>';
    s += '<path d="M' + (1080 * wipe).toFixed(0) + ' 700 V1100" stroke="#fff" stroke-width="8"/>' + eyeIc17c(1080 * wipe - 75, 770, 1, 0) + eyeIc17c(1080 * wipe + 75, 770, 1, 1);
    // Fernglas-Rand
    s += '<path d="M0 0 H1080 V1920 H0 Z M540 600 m-470 0 a470 470 0 1 0 0.1 0 Z" fill="#05060F" fill-rule="evenodd" opacity="0"/>';
    }
  else if (ad === undefined) { s += land17c(t); const k = cl(km / .4), h = ease(cl((km - .6) / 1)), r = ease(cl((km - 1.6) / 1.4)), L = 600, X0 = 270, Y = 900;
    s += '<g opacity="' + k.toFixed(2) + '"><rect x="150" y="' + (Y - 150) + '" width="780" height="300" rx="30" fill="#0B1020" opacity=".8"/><path d="M' + X0 + ' ' + Y + ' H' + (X0 + L) + '" stroke="#F4F6FB" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round"/>' + eyeIc17c(X0 - 10, Y - 70, .8, 0) + eyeIc17c(X0 - 10, Y + 70, .8, 1);
    s += '<rect x="' + X0 + '" y="' + (Y - 92) + '" width="' + (L * 1.6 / 6 * h).toFixed(0) + '" height="40" rx="12" fill="#5CB8FF" stroke="' + S17c + '" stroke-width="4"/>' + (h > .9 ? svgT(X0 + L * 1.6 / 6 + 14, Y - 60, '1,6 km', 34, '#fff', 'start') : '');
    s += '<rect x="' + X0 + '" y="' + (Y + 52) + '" width="' + (L * r).toFixed(0) + '" height="40" rx="12" fill="#FF6B3A" stroke="' + S17c + '" stroke-width="4"/>' + (r > .9 ? svgT(X0 + L - 12, Y + 84, '6 km', 34, '#fff', 'end') : '') + '</g>'; }
  else { s += land17c(t) + '<rect width="1080" height="1920" fill="#0B1020" opacity=".35"/><rect x="80" y="680" width="880" height="420" rx="30" fill="#0B1020" opacity=".85"/>' + bars17c(cl(ad / 1.4), t); }
  return W(s + shade3(), slot(ev, [['haken', 'Schärfer als du', 'hot']])); };
WMASC.b3scharf = (ev, t, lt) => { const ha = ev.haken; const j = ha === undefined ? 0 : Math.sin(Math.PI * cl(ha / .5)); return stay3([FX17c, GY17c - 28 * j], 1, { r: -6 * j, mood: j > .1 ? 'shock' : 'cool' }); };

// ---------- Teil 3: die Nase ----------
function brain17c(x, y, z, k, t) { if (k <= 0) return ''; const pu = .5 + .5 * Math.sin(t * 5); return '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(' + z.toFixed(2) + ' ' + Math.abs(z).toFixed(2) + ')" opacity="' + cl(k).toFixed(2) + '"><path d="M-30 -40 Q30 -70 90 -40 Q130 -10 110 30 Q60 60 0 40 Q-40 20 -30 -40 Z" fill="#9FD6FF" stroke="#E8F7FF" stroke-width="5"/><path d="M-30 -10 Q-120 -30 -200 -6 Q-220 10 -200 26 Q-120 40 -30 22 Z" fill="' + lc('#FFE14D', '#FF9A1E', pu) + '" stroke="#FFF2A0" stroke-width="5"/><circle cx="-160" cy="10" r="' + (40 + 14 * pu).toFixed(0) + '" fill="#FFE14D" opacity=".3"/></g>'; }
WORLD.b3nase = function (sc, ev, t, lt) { const we = ev.weg, na = ev.nase, sn = ev.schnupper; let s = land17c(t);
  const RX = 640, RY = 1180, S = 1.2, away = sn === undefined ? 1 : 1 - cl((sn - .3) / .5);
  const xr = away > .5 ? RX - 60 : RX; s += rex17(xr, RY, S, t, { flip: away > .5, head: away > .5 ? 4 : 18, jaw: .08 });
  const h0 = hd17c(RX, RY, S), h = away > .5 ? [xr + 142.9 * S * .82, h0[1]] : h0;
  // Roentgenblick: dunkler Schleier, Schaedel-Umriss und grosser Riechteil
  if (na !== undefined && sn === undefined) { const k = cl(na / .5); s += '<rect width="1080" height="1920" fill="#06102A" opacity="' + (.35 * k).toFixed(2) + '"/>' + rex17(xr, RY, S, t, { flip: 1, head: 4, jaw: .08, op: .25 * k }) + brain17c(h[0] + 20, h[1] + 30, -.72, cl((na - .5) / .5), t) + (na > 1 ? chip3(h[0] + 40, h[1] - 100, 'Riechteil', 36, '#FFE14D', S17c, cl((na - 1) / .3)) : ''); }
  if (sn !== undefined) { s += scent17([FX17c + 40, GY17c - 60], [h[0] - 100, h[1] + 70], t, cl(sn / .6)); for (let i = 0; i < 3; i++) { const c = (t * 1.6 + i / 3) % 1; s += '<circle cx="' + (h[0] - 130 - 40 * c).toFixed(0) + '" cy="' + (h[1] + 80).toFixed(0) + '" r="' + (8 + 14 * c).toFixed(0) + '" fill="#E8F7FF" opacity="' + (.6 * (1 - c) * cl((sn - .8) / .3)).toFixed(2) + '"/>'; } }
  if (sn !== undefined) s += comic17c('SCHNUPPER', cl((sn - 1) / .3), t, 730, 1555, 66);
  return W(s + fg17c(t) + shade3(), slot(ev, [['nase', 'Beste Nase aller Raubsaurier', 'hot']])); };
WMASC.b3nase = (ev, t, lt) => { const we = ev.weg, sn = ev.schnupper, na = ev.nase; if (sn !== undefined) return stay3([FX17c, GY17c], 1, { r: 0, mood: 'shock', fx: statue17(1) }); if (na !== undefined) return stay3([FX17c, GY17c], 1, { r: 0, mood: 'cool', fx: statue17(cl(na / .6)) }); const w = ease(cl(lt / 1.6)); return stay3([lerp(FX17c, FX17c + 40, w), GY17c], 1, { r: 0, mood: 'happy', walk: w < 1 }); };

// ---------- Schluss ----------
WORLD.b3out = function (sc, ev, t, lt) { const w = ease(cl(lt / 6)); let s = land17c(t) + rex17(lerp(560, 740, w), 1120, .8, t, { flip: 1, run: w < 1, ph: t * 8 }); return W(s + fg17c(t) + shade3()); };
WMASC.b3out = (ev, t, lt) => stay3([FX17c, GY17c], 1, { r: 2, mood: ev.save !== undefined ? 'happy' : 'cool' });

['b3hook', 'b3augen', 'b3scharf', 'b3nase', 'b3out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, A17c); });
