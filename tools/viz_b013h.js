// B013H "Warum hatte dieser Dino eine Keule am Schwanz?" (Dino-Skript mit Hook-Fassung v3, Abschnitt 10), stumme Demo v1 (22.11.2026).
// Neubau von B013 (20.11.): Einstieg nach Hook-System, Rehook vor Teil 2 und 3, pro Teil ein Etikett, keine Beschriftungs-Chips.
// Nutzt alle Helfer aus viz_b013.js (bg13, stump13, any13, lupe13, skin13, log13, axe13, dig13, fg13, cone13, gust13, AX13 ...). Zum Loeschen: diese Datei und videos/B013H.
// Einstieg: die alte Welt mit neuen Ereignissen (Schwanzhieb ab Bild 1, Fressen bei der Frage, Wusch beim Versprechen).
WORLD.b13hookH = (sc, ev, t, lt, E) => WORLD.b13hook(sc, { bum: lt, frage: ev.frage, wusch: ev.loop }, t, lt, E); // Hieb ab Bild 1, Treffer bei 0,95 s
WMASC.b13hookH = (ev, t, lt) => { if (ev.frage !== undefined && ev.loop === undefined) { const k = cl(ev.frage / 3.2); return stay3([lerp(200, 330, ease(k)), 1537 - 22 * Math.abs(Math.sin(ev.frage * 4)) * (k < 1 ? 1 : 0)], 1, { r: 14 * Math.sin(ev.frage * 4), mood: 'happy' }); } return WMASC.b13hook({ bum: lt, frage: ev.frage, wusch: ev.loop }, t, lt); };

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
  if (ra !== undefined) { const r = ra - .5, AXK = 300, SK = .4;
    // Ablauf wie in echt: T. rex pirscht sich an, Ankylosaurus bemerkt ihn, dreht ihm das Hinterteil zu und duckt sich,
    // T. rex beisst auf den Panzer, Keule holt aus und trifft das Schienbein, T. rex knickt ein, zweiter Versuch, zweiter Treffer, Abstand.
    const inn = ease(cl(r / 1.5)), notice = ease(cl((r - .5) / .4)), turn = ease(cl((r - 1.0) / .6)), crouch = ease(cl((r - 1.4) / .4));
    const roar = Math.sin(Math.PI * cl((r - 1.3) / .7)), lun1 = Math.sin(Math.PI * cl((r - 2.0) / .55)), lun2 = Math.sin(Math.PI * cl((r - 3.4) / .5));
    const wind = (a0, a1) => ease(cl((r - a0) / (a1 - a0))), sweep = (a0, a1) => cl((r - a0) / (a1 - a0));
    let sw = 14 * crouch;
    const w1 = wind(1.85, 2.2), s1 = sweep(2.2, 2.36), w2 = wind(3.25, 3.6), s2 = sweep(3.6, 3.76);
    if (r < 2.2) sw += 30 * w1; else if (r < 2.36) sw += 30 - 52 * s1 * s1; else if (r < 3.25) sw += -22 + 22 * ease(cl((r - 2.36) / .5)); 
    if (r >= 3.25 && r < 3.6) sw += 30 * w2; else if (r >= 3.6 && r < 3.76) sw += 30 - 52 * s2 * s2; else if (r >= 3.76) sw += -22 + 22 * ease(cl((r - 3.76) / .5)) + 6 * Math.sin(t * 1.6) * cl((r - 4.3) / .5);
    const hit1 = cl((r - 2.33) / .7), hit2 = cl((r - 3.73) / .7), st1 = Math.sin(Math.PI * cl((r - 2.33) / .8)), st2 = Math.sin(Math.PI * cl((r - 3.73) / .9));
    const L1 = ease(cl((r - 2.0) / .3)) * (1 - ease(cl((r - 2.36) / .6))), L2 = ease(cl((r - 3.4) / .3)) * (1 - ease(cl((r - 3.76) / .7)));
    const rx = lerp(1350, 700, inn) + 40 * ease(cl((r - 2.36) / .6)) + 30 * ease(cl((r - 3.76) / .7)) - 92 * L1 - 130 * L2;
    const lean = 14 * st1 + 16 * st2, hop = 22 * st1 + 26 * st2;
    const shake = (k) => k > 0 && k < .35 ? (1 - k / .35) : 0, shk = Math.max(shake(hit1), shake(hit2));
    let R = '<g transform="translate(' + (12 * shk * Math.sin(t * 90)).toFixed(1) + ' ' + (8 * shk * Math.cos(t * 77)).toFixed(1) + ')">';
    R += '<g transform="rotate(' + lean.toFixed(1) + ' ' + (rx + 150).toFixed(0) + ' 1150) translate(0 ' + (-hop).toFixed(1) + ')">' + rexd(rx, 1150, .7, t, { run: inn > 0 && inn < 1 ? 1 : 0, ph: r * 6, head: (inn < 1 ? 12 : 4) + 20 * Math.max(L1, L2) - 22 * Math.max(st1, st2), jaw: Math.max(roar, Math.max(L1, L2) > .3 ? .8 : 0, Math.max(st1, st2) * .9, .12), id: 'tk' }) + '</g>';
    if (roar > .05) R += roard(rx - 200, 960, 190, t, roar);
    // Ankylosaurus: schaut zuerst nach rechts, dreht sich um (Schwanz zum T. rex), duckt sich
    const kx = lerp(-1, 1, turn), cy = 1150 + 6 * crouch;
    R += '<g transform="translate(' + AXK + ' ' + cy + ') scale(' + kx.toFixed(3) + ' ' + (1 - .05 * crouch).toFixed(3) + ') translate(' + (-AXK) + ' ' + (-cy) + ')">' + any13(AXK, cy, SK, t, { eat: notice < 1 ? 1 - notice : 0, head: lerp(20, -4, notice) + 10 * crouch, look: turn > .5 ? 0 : notice, sw: sw }) + '</g>';
    if (turn > .05 && turn < .95) for (let i = 0; i < 4; i++) R += '<circle cx="' + (AXK - 120 + i * 80) + '" cy="' + (1150 - 10 - 20 * turn) + '" r="' + (14 + 20 * turn) + '" fill="#E8D8B8" opacity="' + (.5 * Math.sin(Math.PI * turn)).toFixed(2) + '"/>';
    // Schwungspur der Keule (Drehpunkt Huefte 220/-200, Keule 634/-158)
    const club = (a) => { const an = -a * Math.PI / 180, dx = 414, dy = 42; return [AXK + SK * (220 + dx * Math.cos(an) - dy * Math.sin(an)), cy + SK * (-200 + dx * Math.sin(an) + dy * Math.cos(an))]; };
    [[s1, 2.2, 2.6], [s2, 3.6, 4.0]].forEach(q => { if (r > q[1] && r < q[2]) { const fade = 1 - cl((r - q[1] - .16) / .24); let d = ''; for (let i = 0; i <= 8; i++) { const P = club(14 + 30 - 52 * Math.pow(q[0] * i / 8, 2)); d += (i ? ' L' : 'M') + P[0].toFixed(0) + ' ' + P[1].toFixed(0); } R += '<path d="' + d + '" stroke="#FFF6DF" stroke-width="26" stroke-linecap="round" fill="none" opacity="' + (.45 * fade).toFixed(2) + '"/>'; } });
    // Treffer am Schienbein des T. rex: Sterne und Staub
    [hit1, hit2].forEach(k => { if (k > 0 && k < .6) { const HP = club(-8), hx = HP[0] + 30, hy = HP[1] + 10, e = k / .6; for (let i = 0; i < 7; i++) { const an = i / 7 * 6.28; R += '<line x1="' + (hx + 20 * Math.cos(an)).toFixed(0) + '" y1="' + (hy + 20 * Math.sin(an)).toFixed(0) + '" x2="' + (hx + (34 + 70 * e) * Math.cos(an)).toFixed(0) + '" y2="' + (hy + (34 + 70 * e) * Math.sin(an)).toFixed(0) + '" stroke="#FFE14D" stroke-width="8" stroke-linecap="round" opacity="' + (1 - e).toFixed(2) + '"/>'; } for (let i = 0; i < 4; i++) R += '<circle cx="' + (rx + 60 + i * 50) + '" cy="' + (1145 - 30 * e) + '" r="' + (12 + 26 * e) + '" fill="#E8D8B8" opacity="' + (.6 * (1 - e)).toFixed(2) + '"/>'; } });
    K += R + '</g>';
  } else K += '<g transform="translate(300 1150) scale(-1 1) translate(-300 -1150)">' + any13(300, 1150, .4, t, { eat: 1, head: 20 }) + '</g>';
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
