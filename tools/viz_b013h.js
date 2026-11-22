// B013H "Warum hatte dieser Dino eine Keule am Schwanz?" (Dino-Skript mit Hook-Fassung v3, Abschnitt 10), stumme Demo v1 (22.11.2026).
// Neubau von B013 (20.11.): Einstieg nach Hook-System, Rehook vor Teil 2 und 3, pro Teil ein Etikett, keine Beschriftungs-Chips.
// Nutzt alle Helfer aus viz_b013.js (bg13, stump13, any13, lupe13, skin13, log13, axe13, dig13, fg13, cone13, gust13, AX13 ...). Zum Loeschen: diese Datei und videos/B013H.
// Einstieg: die alte Welt mit neuen Ereignissen (Schwanzhieb ab Bild 1, Fressen bei der Frage, Wusch beim Versprechen).
WORLD.b13hookH = (sc, ev, t, lt, E) => WORLD.b13hook(sc, { bum: ev.bum, frage: ev.frage, wusch: ev.loop }, t, lt, E);
WMASC.b13hookH = (ev, t, lt) => { if (ev.frage !== undefined && ev.loop === undefined) { const k = cl(ev.frage / 3.2); return stay3([lerp(200, 330, ease(k)), 1537 - 22 * Math.abs(Math.sin(ev.frage * 4)) * (k < 1 ? 1 : 0)], 1, { r: 14 * Math.sin(ev.frage * 4), mood: 'happy' }); } return WMASC.b13hook({ bum: ev.bum, frage: ev.frage, wusch: ev.loop }, t, lt); };

// ---------- Teil 1: Panzer ----------
WORLD.b13panzH = function (sc, ev, t, lt) { const U = urD(t), pz = ev.pz, ha = ev.haut, st = ev.stach, kl = ev.klopf; let s = bg13(U, t) + stump13(930, 1150, 2, t), h = '';
  // Zapfen fliegt von Schalti auf den Ruecken, prallt ab, faellt zurueck vor Schalti
  let cone = ''; if (kl !== undefined) { const a = cl(kl / .7), b = cl((kl - .7) / .9); if (a < 1) cone = cone13(lerp(300, 520, a), lerp(1440, 880, a) - 220 * Math.sin(Math.PI * a), a * 540); else if (b < 1) cone = cone13(lerp(520, 330, b), lerp(880, 1500, b) - 260 * Math.sin(Math.PI * b), 540 + b * 400); else cone = cone13(330, 1500, 940); }
  const flinch = kl === undefined ? 0 : Math.sin(Math.PI * cl((kl - .6) / .7));
  s += any13(AX13, AY13, AS13, t, { head: -4 * flinch, look: flinch > .1 ? 1 : 0, sw: 4 * flinch });
  if (pz !== undefined && ha === undefined) { const L = [[880, 930], [620, 800], [470, 780], [300, 820], [170, 900]], f = cl((pz - .3) / 2.6) * (L.length - 1), i0 = Math.min(L.length - 2, Math.floor(f)), u = f - i0, gx = lerp(L[i0][0], L[i0 + 1][0], u), gy = lerp(L[i0][1], L[i0 + 1][1], u); for (let k = 0; k < 3; k++) { const c = (t * 1.6 + k / 3) % 1; s += '<circle cx="' + gx.toFixed(0) + '" cy="' + gy.toFixed(0) + '" r="' + (30 + 60 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="6" opacity="' + ((1 - c) * .9).toFixed(2) + '"/>'; } }
  if (ha !== undefined && st === undefined) s += lupe13(660, 900, 165, '<g transform="scale(.68)">' + skin13(t) + svgT(0, 180, 'Knochenplatte', 32, '#0B1020') + svgT(0, 212, '(Osteoderm)', 24, '#3D4F7A') + '</g>', ease(cl(ha / .5)), 540, 1010);
  if (st !== undefined) { for (let i = 0; i < 4; i++) { const c = ((st * .7 + i / 4) % 1), x = 300 + 345 * c; s += '<circle cx="' + x.toFixed(0) + '" cy="1020" r="' + (22 + 16 * Math.sin(Math.PI * c)).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="6" opacity="' + (Math.sin(Math.PI * c) * cl(st / .4)).toFixed(2) + '"/>'; } const k = Math.sin(Math.PI * cl(st / 2.4)); if (k > 0) s += '<path d="M330 1220 Q470 1190 620 1220" stroke="#FFE14D" stroke-width="8" fill="none" stroke-dasharray="16 10" opacity="' + k.toFixed(2) + '"/>'; }
  s += cone + fg13(t);
  h += slot(ev, [['pz', 'Panzer aus Knochen', 'hot']]);
  return W(s + shade3(), h); };
WMASC.b13panzH = (ev, t, lt) => { const kl = ev.klopf; const x = lerp(170, 220, ease(cl(lt / .8)));
  if (kl !== undefined) { const th = Math.sin(Math.PI * cl(kl / .5)), du = Math.sin(Math.PI * cl((kl - 1.2) / .7)); return stay3([220 + 20 * th, 1537 + 30 * du], 1, { r: -20 * th + 10 * du, mood: du > .2 ? 'shock' : (kl > 2 ? 'cool' : 'happy') }); }
  return stay3([x, 1537], 1, { r: 2 }); };

// ---------- Teil 2: Keule (Nahaufnahme Schwanz) ----------
WORLD.b13keulH = function (sc, ev, t, lt) { const U = urD(t), kn = ev.knob, sti = ev.stiel, ax = ev.axt, ha = ev.hart; let s = bg13(U, t), h = '';
  let xr = 0; if (kn !== undefined) xr = ease(cl(kn / .6)); const rhK = ev.rehook !== undefined && kn === undefined ? 1 : 0; if (ha !== undefined) xr *= 1 - ease(cl(ha / .4));
  let sw = 0, hit = 0; if (ha !== undefined) { const up = ease(cl((ha - .5) / .6)), dn = cl((ha - 1.1) / .22); sw = 28 * up - 50 * dn * dn; hit = ha > 1.32 ? (ha - 1.32) / .8 : 0; if (ha > 2.3) sw = -22 + 22 * ease(cl((ha - 2.3) / .8)); }
  s += log13(485, 1190, hit);
  s += any13(TX13, 1130, TS13, t, { sw: sw + 26 * Math.sin(t * 5) * rhK, xr: xr });
  const cx = TX13 + 634 * TS13, cy = 1130 - 158 * TS13; // Keulen-Mitte
  const hx0 = TX13 + 300 * TS13, hy0 = 1130 - 170 * TS13;
  if (kn !== undefined && sti === undefined) for (let i = 0; i < 2; i++) { const c = (t * 1.1 + i / 2) % 1; s += '<circle cx="' + cx.toFixed(0) + '" cy="' + cy.toFixed(0) + '" r="' + (60 + 70 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="7" opacity="' + ((1 - c) * cl((kn - .6) / .3)).toFixed(2) + '"/>'; }
  if (sti !== undefined && ax === undefined) for (let i = 0; i < 5; i++) { const c = cl((sti - .3) / 2.2) * 5 - i; if (c <= 0) continue; const x = lerp(hx0, cx - 70, i / 4), y = lerp(hy0, cy, i / 4); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (26 + 6 * Math.sin(t * 6 + i)).toFixed(0) + '" fill="none" stroke="#7FD4FF" stroke-width="6" opacity="' + cl(c).toFixed(2) + '"/>'; }
  if (ax !== undefined && ha === undefined) { const gl = cl((ax - .2) / 1.2); s += '<path d="M' + hx0.toFixed(0) + ' ' + (hy0 - 24).toFixed(0) + ' L' + lerp(hx0, cx - 70, gl).toFixed(0) + ' ' + (lerp(hy0, cy, gl) - 24).toFixed(0) + '" stroke="#FF9F43" stroke-width="10" stroke-linecap="round" opacity="' + (.5 + .4 * Math.sin(t * 6)).toFixed(2) + '"/>'; s += axe13(cl((ax - 1.4) / .5), cx - 30, cy, TX13 + 300 * TS13, 1130 - 200 * TS13); }
  s += fg13(t);
  h += slot(ev, [['knob', 'Keule und steifer Stiel', 'hot']]);
  return W(s + shade3(), h); };
WMASC.b13keulH = (ev, t, lt) => { const ha = ev.hart;
  if (ha !== undefined) { const c = Math.sin(Math.PI * cl((ha - 1.2) / 1.2)); return stay3([220 - 16 * c, 1537 + 10 * c], 1, { r: -18 * c, mood: c > .2 ? 'shock' : 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2) }); };

// ---------- Teil 3: Wofuer? ----------
WORLD.b13wofH = function (sc, ev, t, lt) { const U = urD(t), ra = ev.raub, fu = ev.fund, stc = ev.stach, zw = ev.zwei, fo = ev.foto; let h = '';
  // Lichtung mit T. rex
  let A = bg13(U, t) + stump13(930, 1150, 2, t), sw = 0;
  if (ra !== undefined) { const inn = ease(cl((ra - .3) / 1.4)), swing = Math.sin(Math.PI * cl((ra - 1.9) / .7)), tu = ease(cl((ra - 4.0) / .4)), out = ease(cl((ra - 4.4) / 1.2)); sw = 34 * swing;
    const rx = lerp(1500, 1010, inn) + 900 * out; const hop = swing > .5 ? 40 * Math.sin(Math.PI * cl((ra - 2.1) / .4)) : 0;
    if (rx < 1560) A += rexd(rx, AY13 - hop, .62, t, { run: (inn > 0 && inn < 1) || (out > 0 && out < 1) ? 1 : 0, kx: lerp(1, -1, tu), head: 10, jaw: swing > .3 ? .6 : .2, id: 'tr' }); }
  const rh3 = ev.rehook !== undefined && ra === undefined; A += any13(AX13, AY13, AS13, t, { sw: sw + (rh3 ? 30 * Math.sin(t * 6) : 0), look: (ra !== undefined && ra < 4.4) || rh3 ? -1 : 0, jaw: rh3 ? .3 : 0 }) + fg13(t);
  if (ra !== undefined) '';
  // Grabung
  let D = dig13(t, stc === undefined ? 0 : ease(cl((stc - .6) / .5)));
  '';
  if (stc !== undefined && stc > .8) { const cr = cl((stc - .8) / .6), he = cl((stc - 2.6) / 1); D += '<path d="M555 975 l14 14 l-10 10 l18 12 l-8 12 l20 10" stroke="' + lc('#FF4D6D', '#3DFF7A', he) + '" stroke-width="' + (8 - 3 * he).toFixed(1) + '" fill="none" stroke-linecap="round" stroke-dasharray="120" stroke-dashoffset="' + (120 * (1 - cr)).toFixed(0) + '"/>'; for (let i = 0; i < 4; i++) { const c = (t * 1.3 + i / 4) % 1; D += '<circle cx="' + (640 + 50 * c + 10 * i).toFixed(0) + '" cy="' + (1040 - 80 * c).toFixed(0) + '" r="' + (6 + 4 * i).toFixed(0) + '" fill="#E8D8B8" opacity="' + (.7 * (1 - c)).toFixed(2) + '"/>'; } } if (stc !== undefined && stc > 1.6) { const c = (t * 1.2) % 1; D += '<circle cx="595" cy="1003" r="' + (60 + 60 * c).toFixed(0) + '" fill="none" stroke="#FF4D6D" stroke-width="6" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  // Zwei Tiere im Streit: das blaue kommt hinten links, Keule trifft die Huefte des vorderen
  let Z = bg13(U, t) + stump13(930, 1150, 2, t);
  if (zw !== undefined) { const inn = ease(cl(zw / 1.4)), sws = Math.sin(Math.PI * cl((zw - 1.6) / .8)) + Math.sin(Math.PI * cl((zw - 3.4) / .8)), hitk = Math.max(cl((zw - 1.95) / .5) * (zw < 2.45 ? 1 : 0), cl((zw - 3.75) / .5) * (zw < 4.25 ? 1 : 0)), lv = ease(cl((zw - 4.3) / .9)); const bx = lerp(1700, 1120, inn) + 700 * lv;
    Z += '<g transform="translate(' + (2 * bx).toFixed(0) + ' 0) scale(-1 1)">' + any13(bx, 1030, .6, t, { pal: PB13, id: 'bl', walk: (inn > 0 && inn < 1) || (lv > 0 && lv < 1) ? 1 : 0, ph: zw * 7, sw: 46 * sws }) + '</g>';
    const step = 26 * (Math.sin(Math.PI * cl((zw - 2) / .6)) + Math.sin(Math.PI * cl((zw - 3.8) / .6)));
    Z += any13(AX13 + 90 - step, AY13, AS13, t, { head: -6 * Math.sin(Math.PI * cl((zw - 2) / .8)), sw: -10 * sws });
    if (hitk > 0 && hitk < 1) for (let i = 0; i < 5; i++) Z += '<circle cx="' + (720 + i * 22 - 44) + '" cy="' + (AY13 - 110 - 30 * hitk - (i % 2) * 20) + '" r="' + (14 + 30 * hitk) + '" fill="#F4EEDC" opacity="' + (.7 * (1 - hitk)).toFixed(2) + '"/>';
    ''; }
  else Z += any13(AX13 + 90, AY13, AS13, t, {});
  Z += fg13(t);
  let s = A; if (fu !== undefined) s = wipe3(A, D, fu, .5, AC13); if (zw !== undefined) s = wipe3(D, Z, zw, .5, AC13);
  if (fo !== undefined) { const k = ease(cl(fo / .5)); s += '<rect width="1080" height="1920" fill="#02030F" opacity="' + (.55 * k).toFixed(2) + '"/>' + (typeof IMG13 !== 'undefined' ? '<g transform="translate(540 900) scale(' + (.6 + .4 * k).toFixed(3) + ')" opacity="' + k.toFixed(2) + '"><rect x="-430" y="-330" width="860" height="660" rx="26" fill="#F4F6FB"/><image href="' + IMG13 + '" x="-410" y="-310" width="820" height="620" preserveAspectRatio="xMidYMid slice"/>' + chip3(-300, 280, 'KI-Bild', 26, '#0B1020', '#fff', 1) + '</g>' : ''); }
  h += slot(ev, [['raub', 'Gegen wen?', 'hot']]);
  return W(s + shade3(), h); };
WMASC.b13wofH = (ev, t, lt) => { const ra = ev.raub, zw = ev.zwei, fu = ev.fund;
  if (zw !== undefined) { const c = Math.sin(Math.PI * cl((zw - 1.9) / .9)); return stay3([220 - 10 * c, 1537], 1, { r: -12 * c, mood: c > .2 ? 'shock' : 'cool' }); }
  if (fu !== undefined) return stay3([220, 1537], 1, { r: 4 * Math.sin(t * 2), mood: 'happy' });
  if (ra !== undefined) { const c = Math.sin(Math.PI * cl((ra - 1.8) / 1.2)); return stay3([220 - 14 * c, 1537 + 8 * c], 1, { r: -16 * c, mood: c > .2 ? 'shock' : 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 }); };

WORLD.b13outH = (sc, ev, t, lt, E) => WORLD.b13out(sc, ev, t, lt, E);
WMASC.b13outH = (ev, t, lt) => stay3([220, 1537 - 8 * Math.abs(Math.sin(t * 5)) * (lt < 1.5 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });
['b13panzH', 'b13keulH', 'b13wofH'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC13); });
