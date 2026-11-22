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
  s += any13(AX13, AY13, AS13, t, { head: -4 * flinch, look: flinch > .1 ? 1 : 0, sw: 4 * flinch, mk: { pz: pz !== undefined && ha === undefined ? cl((pz - .3) / .5) : 0, st: st !== undefined && kl === undefined ? cl(st / .4) : 0 } });
  if (ha !== undefined && st === undefined) s += lupe13(660, 900, 165, '<g transform="scale(.68)">' + skin13(t) + svgT(0, 180, 'Knochenplatte', 32, '#0B1020') + svgT(0, 212, '(Osteoderm)', 24, '#3D4F7A') + '</g>', ease(cl(ha / .5)), 540, 1010);
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
  s += any13(TX13, 1130, TS13, t, { sw: sw + 26 * Math.sin(t * 5) * rhK, xr: xr, mk: { knob: kn !== undefined && sti === undefined ? cl((kn - .6) / .3) : 0, vert: sti !== undefined && ax === undefined ? cl((sti - .3) / .4) : 0, ten: ax !== undefined && ha === undefined ? cl((ax - .2) / .4) : 0 } });
  const cx = TX13 + 634 * TS13, cy = 1130 - 158 * TS13; // Keulen-Mitte
  const hx0 = TX13 + 300 * TS13, hy0 = 1130 - 170 * TS13;
  if (ax !== undefined && ha === undefined) { s += axe13(cl((ax - 1.4) / .5), cx - 30, cy, TX13 + 300 * TS13, 1130 - 200 * TS13); }
  s += fg13(t);
  h += slot(ev, [['knob', 'Keule und steifer Stiel', 'hot']]);
  return W(s + shade3(), h); };
WMASC.b13keulH = (ev, t, lt) => { const ha = ev.hart;
  if (ha !== undefined) { const c = Math.sin(Math.PI * cl((ha - 1.2) / 1.2)); return stay3([220 - 16 * c, 1537 + 10 * c], 1, { r: -18 * c, mood: c > .2 ? 'shock' : 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2) }); };

// ---------- Teil 3: Wofuer? ----------
function volcK13(t) { let v = '<path d="M600 1000 L760 800 L800 812 L960 1000 Z" fill="#6B4A6E" opacity=".85"/><path d="M760 800 L800 812 L790 840 L770 836 Z" fill="#FF7A3D"/>'; for (let i = 0; i < 4; i++) { const c = (t * .25 + i / 4) % 1; v += '<circle cx="' + (780 + 30 * Math.sin(c * 6 + i)).toFixed(0) + '" cy="' + (790 - 160 * c).toFixed(0) + '" r="' + (20 + 30 * c).toFixed(0) + '" fill="#8A7C90" opacity="' + (.5 * (1 - c)).toFixed(2) + '"/>'; } return v + '<path d="M0 1000 Q300 960 560 990 Q800 1010 1080 980 L1080 1040 L0 1040 Z" fill="#4FA866" opacity=".6"/>'; }
WORLD.b13wofH = function (sc, ev, t, lt) { const U = urD(t), ra = ev.raub, fu = ev.fund, stc = ev.stach, zw = ev.zwei, fo = ev.foto; let h = '';
  // Lichtung (nur Rehook)
  const rh3 = ev.rehook !== undefined && ra === undefined;
  let A = bg13(U, t) + stump13(930, 1150, 2, t) + any13(AX13, AY13, AS13, t, { sw: rh3 ? 30 * Math.sin(t * 6) : 0, look: rh3 ? -1 : 0, jaw: rh3 ? .3 : 0 }) + fg13(t);
  // Neue Szene: offene Ebene mit Vulkan, T. rex greift an, beide ganz im Bild
  let K = U.b + volcK13(t) + bg13(U, t);
  if (ra !== undefined) { const r = ra - .5;
    // T. rex kommt von rechts, Ankylosaurus frisst, bemerkt ihn, hebt Kopf und Keule, schlaegt zweimal zu
    const inn = ease(cl(r / 1.6)), notice = ease(cl((r - .7) / .5)), roar = Math.sin(Math.PI * cl((r - 1.4) / .7)), lunge = Math.sin(Math.PI * cl((r - 2.1) / .7)), ready = ease(cl((r - 1.2) / .6));
    const sw1 = Math.sin(Math.PI * cl((r - 2.2) / .55)), sw2 = Math.sin(Math.PI * cl((r - 3.6) / .55)), hit1 = cl((r - 2.45) / .5), hit2 = cl((r - 3.85) / .5), back = ease(cl((r - 2.5) / .8)), back2 = ease(cl((r - 3.9) / .8));
    const rx = lerp(1400, 655, inn) - 150 * lunge + 70 * back + 50 * back2, tilt = 8 * Math.sin(Math.PI * cl((r - 2.5) / .9)) + 8 * Math.sin(Math.PI * cl((r - 3.9) / .9));
    K += '<g transform="rotate(' + tilt.toFixed(1) + ' ' + rx.toFixed(0) + ' 1150)">' + rexd(rx, 1150, .7, t, { run: inn > 0 && inn < 1 ? 1 : 0, ph: r * 9, head: 6 - 16 * lunge + 8 * (hit1 > 0 && hit1 < 1 ? 1 : 0), jaw: Math.max(roar, lunge > .2 ? .7 : 0, hit1 > 0 && hit1 < 1 ? .5 : 0, .15), id: 'tk' }) + '</g>';
    K += any13(212, 1150, .38, t, { eat: notice < 1 ? 1 - notice : 0, head: lerp(20, -6, notice), look: notice, sw: 18 * ready + 46 * sw1 + 46 * sw2 - 30 * (sw1 > 0 ? sw1 : 0) * 0 });
    if (roar > .05) K += roard(rx - 250, 1000, 180, t, roar);
    [[hit1], [hit2]].forEach(q => { const k = q[0]; if (k > 0 && k < 1) for (let i = 0; i < 6; i++) { const an = i / 6 * 6.28, hx = 482, hy = 1075; K += '<line x1="' + (hx + 24 * Math.cos(an)).toFixed(0) + '" y1="' + (hy + 24 * Math.sin(an)).toFixed(0) + '" x2="' + (hx + (34 + 60 * k) * Math.cos(an)).toFixed(0) + '" y2="' + (hy + (34 + 60 * k) * Math.sin(an)).toFixed(0) + '" stroke="#FFE14D" stroke-width="7" stroke-linecap="round" opacity="' + (1 - k).toFixed(2) + '"/>'; } });
  } else K += any13(212, 1150, .38, t, { eat: 1, head: 20 });
  K += fg13(t);
  // Grabung
  let D = dig13(t, stc === undefined ? 0 : ease(cl((stc - .6) / .5)));
  '';
  if (fu !== undefined && stc === undefined) { for (let i = 0; i < 6; i++) { const c = (t * 1.1 + i / 6) % 1; D += '<circle cx="' + (300 + 520 * ((i * .37) % 1) + 30 * c).toFixed(0) + '" cy="' + (1060 - 90 * c).toFixed(0) + '" r="' + (8 + 18 * c).toFixed(0) + '" fill="#E8D8B8" opacity="' + (.75 * (1 - c) * cl(fu / .8)).toFixed(2) + '"/>'; } }
  if (stc !== undefined && stc > .8) { const cr = cl((stc - .8) / .6), he = cl((stc - 2.6) / 1); D += '<path d="M555 975 l14 14 l-10 10 l18 12 l-8 12 l20 10" stroke="' + lc('#FF4D6D', '#3DFF7A', he) + '" stroke-width="' + (8 - 3 * he).toFixed(1) + '" fill="none" stroke-linecap="round" stroke-dasharray="120" stroke-dashoffset="' + (120 * (1 - cr)).toFixed(0) + '"/>'; for (let i = 0; i < 4; i++) { const c = (t * 1.3 + i / 4) % 1; D += '<circle cx="' + (640 + 50 * c + 10 * i).toFixed(0) + '" cy="' + (1040 - 80 * c).toFixed(0) + '" r="' + (6 + 4 * i).toFixed(0) + '" fill="#E8D8B8" opacity="' + (.7 * (1 - c)).toFixed(2) + '"/>'; } } if (stc !== undefined && stc > 1.6) D += '<circle cx="595" cy="1003" r="78" fill="none" stroke="#FF4D6D" stroke-width="7" opacity="' + cl((stc - 1.6) / .4).toFixed(2) + '"/>';
  // Neue Szene: zwei Ankylosaurier stehen Schwanz an Schwanz und schlagen abwechselnd zu, beide ganz im Bild
  let Z = U.b + volcK13(t) + bg13(U, t);
  if (zw !== undefined) { const z = zw - .5;
    // Das blaue laeuft vorwaerts herein, bleibt stehen, dreht sich um; beide schauen sich an, dann Keule gegen Keule
    const inn = ease(cl(z / 1.3)), turn = ease(cl((z - 1.4) / .6)), look = ease(cl((z - .6) / .5));
    const sA = Math.sin(Math.PI * cl((z - 2.2) / .6)) + Math.sin(Math.PI * cl((z - 3.8) / .6)), sB = Math.sin(Math.PI * cl((z - 3.0) / .6)) + Math.sin(Math.PI * cl((z - 4.6) / .6));
    const bx = lerp(1350, 790, inn), shB = 12 * (Math.sin(Math.PI * cl((z - 2.45) / .5)) + Math.sin(Math.PI * cl((z - 4.05) / .5))), shA = 12 * (Math.sin(Math.PI * cl((z - 3.25) / .5)) + Math.sin(Math.PI * cl((z - 4.85) / .5)));
    const kx = lerp(1, -1, turn), X = bx + shB;
    Z += '<g transform="translate(' + X.toFixed(0) + ' 0) scale(' + kx.toFixed(3) + ' 1) translate(' + (-X).toFixed(0) + ' 0)">' + any13(X, 1110, .44, t, { pal: PB13, id: 'bl', walk: inn > 0 && inn < 1 ? 1 : 0, ph: zw * 7, sw: 44 * sB, look: turn > .9 ? -1 : 0 }) + '</g>';
    Z += any13(282 - shA, 1150, .46, t, { sw: 44 * sA, id: 'or', look: look, head: -4 * look });
    [2.45, 3.25, 4.05, 4.85].forEach(h0 => { const k = cl((z - h0) / .45); if (k > 0 && k < 1) for (let i = 0; i < 5; i++) Z += '<circle cx="' + (560 + (i - 2) * 26) + '" cy="' + (1050 - 30 * k - (i % 2) * 18) + '" r="' + (12 + 26 * k) + '" fill="#F4EEDC" opacity="' + (.75 * (1 - k)).toFixed(2) + '"/>'; });
  } else Z += any13(282, 1150, .46, t, {});
  Z += fg13(t);
  let s = A; if (ra !== undefined) s = wipe3(A, K, ra, .5, AC13); if (fu !== undefined) s = wipe3(K, D, fu, .5, AC13); if (zw !== undefined) s = wipe3(D, Z, zw, .5, AC13);
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
