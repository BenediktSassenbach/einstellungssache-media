// C007 "Warum geht Plätzchenteig im Ofen auf?" (Chemie, Skript 4 mit Abschnitt 9 und Neue Werkzeuge, Kostuem C1 Laborkittel), stumme Demo v1 (26.11.2026).
// Pro Teil eine andere Hauptdarstellung:
//   Einstieg: Schalti schaut ab Bild 1 durchs Ofenfenster, die Plaetzchen wachsen, beim Versprechen riecht es komisch.
//   Teil 1: Interaktion auf der Arbeitsplatte (Backpulver in die Schuessel, die eine Lupe: Natron + Saeure + Wasser = Gasblaeschen, Teig waechst).
//   Teil 2: Wissenschaftsmodus (Teig im Schnitt, Wasser wird Dampf, Poren dehnen sich).
//   Teil 3: Backofen mit Lebkuchen und Hirschhornsalz-Dose (Zerfall in drei Gase, flach, Ammoniak entweicht).
// Nutzt lupeH (viz_hook.js), fuse33, lab33, lab33dots (viz_v33.js), slot (viz_p002.js). Zum Loeschen: diese Datei und videos/C007.
var AC7 = '#FF6BD6', ST7 = '#0B1020', GF7 = 1537, GC7 = 1140, XF7 = 250, XC7 = 200; // am Boden links vom Ofen, nicht vor dem Sichtfenster
const mv7 = (a, b, k) => lerp(a, b, ease(cl(k)));
const tx7 = (x, y, s, size, col) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" font-weight="900" fill="' + (col || '#fff') + '" font-family="Inter Display, Inter, Arial, sans-serif">' + s + '</text>';
const star7 = (r) => { let p = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r * .45 : r; p += (i ? 'L' : 'M') + (Math.cos(a) * q).toFixed(1) + ' ' + (Math.sin(a) * q).toFixed(1) + ' '; } return p + 'Z'; };

// ---------- Der Ort: Kueche am Adventsnachmittag ----------
// o.on: Ofenlicht, o.rise: Plaetzchen 0..1, o.leb: Lebkuchen statt Sternen, o.dough: Teig in der Schuessel waechst, o.tip: Tuetchen kippt, o.fog: Ofenfenster beschlagen
function kitchen7(t, o) { o = o || {}; let s = '<defs><linearGradient id="wl7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E2C44"/><stop offset="1" stop-color="#5A3F52"/></linearGradient><linearGradient id="sk7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26355F"/><stop offset="1" stop-color="#9A86B0"/></linearGradient><radialGradient id="ov7"><stop offset="0" stop-color="#FFB45C"/><stop offset="1" stop-color="#7A2E12"/></radialGradient></defs>';
  s += '<rect width="1080" height="1170" fill="url(#wl7)"/>';
  // Fenster rechts mit Schnee
  s += '<rect x="770" y="560" width="250" height="330" rx="8" fill="url(#sk7)"/><path d="M770 830 Q840 800 900 830 T1020 820 V890 H770 Z" fill="#F4F8FF"/>';
  for (let i = 0; i < 16; i++) { const c = (t * (.09 + .04 * rnd(i + 30)) + rnd(i + 31)) % 1; s += '<circle cx="' + (780 + rnd(i + 32) * 230 + 8 * Math.sin(t + i)).toFixed(0) + '" cy="' + (570 + 300 * c).toFixed(0) + '" r="' + (3 + 3 * rnd(i + 33)).toFixed(1) + '" fill="#fff" opacity=".85"/>'; }
  s += '<rect x="770" y="560" width="250" height="330" rx="8" fill="none" stroke="#7A563E" stroke-width="16"/><path d="M895 560 V890 M770 720 H1020" stroke="#7A563E" stroke-width="10"/><rect x="756" y="886" width="278" height="18" rx="4" fill="#8A6448" stroke="' + ST7 + '" stroke-width="4"/>';
  // Fliesenspiegel
  s += '<rect x="0" y="960" width="1080" height="172" fill="#E9DFD0"/>'; for (let x = 0; x <= 1080; x += 60) s += '<path d="M' + x + ' 960 V1132" stroke="#CDBFAD" stroke-width="3"/>'; for (let y = 960; y < 1132; y += 43) s += '<path d="M0 ' + y + ' H1080" stroke="#CDBFAD" stroke-width="3"/>';
  // Arbeitsplatte, Unterschraenke, Backofen
  s += '<rect x="0" y="1128" width="1080" height="34" fill="#C9A27A" stroke="' + ST7 + '" stroke-width="5"/>';
  s += '<rect x="0" y="1162" width="420" height="398" fill="#8E6A86" stroke="' + ST7 + '" stroke-width="5"/><rect x="860" y="1162" width="220" height="398" fill="#8E6A86" stroke="' + ST7 + '" stroke-width="5"/><path d="M210 1170 V1552 M20 1300 H400" stroke="' + ST7 + '" stroke-width="4"/><rect x="180" y="1220" width="12" height="50" rx="5" fill="#E7B44C"/><rect x="228" y="1220" width="12" height="50" rx="5" fill="#E7B44C"/><rect x="940" y="1220" width="60" height="12" rx="5" fill="#E7B44C"/>';
  s += '<rect x="420" y="1162" width="440" height="398" fill="#2B2F3A" stroke="' + ST7 + '" stroke-width="5"/><rect x="430" y="1172" width="420" height="64" rx="8" fill="#1A1D26"/>';
  [480, 560, 780].forEach(x => { s += '<circle cx="' + x + '" cy="1204" r="18" fill="#C9CFDB" stroke="' + ST7 + '" stroke-width="3"/><path d="M' + x + ' 1190 v12" stroke="' + ST7 + '" stroke-width="4"/>'; });
  s += '<rect x="620" y="1188" width="110" height="34" rx="6" fill="#0E1018"/><path d="M636 1205 H714" stroke="' + (o.on ? '#FF9A3D' : '#555') + '" stroke-width="8" stroke-dasharray="14 6"/>'; // Anzeige ohne Schrift (liegt im Band des Untertitels)
  s += '<rect x="440" y="1252" width="400" height="296" rx="16" fill="#3A3F4C" stroke="' + ST7 + '" stroke-width="4"/><rect x="470" y="1262" width="340" height="14" rx="7" fill="#C9CFDB"/>';
  s += '<rect x="470" y="1292" width="340" height="236" rx="10" fill="' + (o.on ? 'url(#ov7)' : '#15171F') + '" stroke="#C9CFDB" stroke-width="5"/>';
  // Blech mit Plaetzchen oder Lebkuchen
  s += '<path d="M480 1478 H800" stroke="#9AA0AE" stroke-width="8"/>';
  const ri = cl(o.rise === undefined ? 1 : o.rise);
  [530, 610, 690, 770].forEach((x, i) => { if (o.leb) { s += '<g transform="translate(' + x + ' 1450)"><path d="M0 18 C-34 -4 -30 -30 -12 -30 C-4 -30 0 -24 0 -18 C0 -24 4 -30 12 -30 C30 -30 34 -4 0 18 Z" fill="#8A4B24" stroke="' + ST7 + '" stroke-width="3"/><circle cx="-10" cy="-14" r="3" fill="#fff"/><circle cx="10" cy="-14" r="3" fill="#fff"/><circle cx="0" cy="0" r="3" fill="#fff"/></g>'; }
    else s += '<g transform="translate(' + x + ' 1458) scale(' + (.8 + .2 * ri).toFixed(3) + ' ' + (.4 + .6 * ri).toFixed(3) + ')"><path d="' + star7(36) + '" fill="#F2D29A" stroke="' + ST7 + '" stroke-width="3"/></g>'; });
  if (o.fog) s += '<rect x="470" y="1292" width="340" height="236" rx="10" fill="#F4F6FB" opacity="' + (.6 * cl(o.fog)).toFixed(2) + '"/>';
  s += '<rect x="440" y="1252" width="400" height="296" rx="16" fill="none" stroke="#C9CFDB" stroke-width="3" opacity=".5"/>';
  // Boden
  s += '<rect x="0" y="1560" width="1080" height="360" fill="#7C6A63"/>'; for (let x = -40; x < 1080; x += 120) for (let r = 0; r < 4; r++) s += '<rect x="' + (x + (r % 2) * 60) + '" y="' + (1560 + r * 90) + '" width="60" height="90" fill="#6B5A54"/>';
  // Dinge auf der Arbeitsplatte: Teigschuessel, Backpulver-Tuetchen, Hirschhornsalz-Dose, Nudelholz, Ausstecher
  const dh = cl(o.dough || 0);
  s += '<path d="M' + (520 - 70) + ' ' + (1060 - 30 * dh) + ' Q520 ' + (1000 - 70 * dh) + ' ' + (520 + 70) + ' ' + (1060 - 30 * dh) + ' Z" fill="#F2D29A" stroke="' + ST7 + '" stroke-width="4"/>';
  for (let i = 0; i < Math.round(8 * dh); i++) s += '<circle cx="' + (480 + rnd(i + 80) * 80).toFixed(0) + '" cy="' + (1050 - 20 * dh - rnd(i + 81) * 30 * dh).toFixed(0) + '" r="4" fill="#E0B878"/>';
  s += '<path d="M420 1060 H620 Q610 1128 520 1130 Q430 1128 420 1060 Z" fill="#5CA8C8" stroke="' + ST7 + '" stroke-width="5"/><path d="M430 1074 H610" stroke="#fff" stroke-width="4" opacity=".5"/>';
  const tp = cl(o.tip || 0), ta = Math.sin(Math.PI * tp) * 105; // Tuetchen kippt ueber die Schuessel und zurueck
  s += '<g transform="rotate(' + ta.toFixed(1) + ' 400 1128)"><rect x="362" y="1066" width="40" height="62" rx="4" fill="#FFF3C4" stroke="' + ST7 + '" stroke-width="4"/><rect x="362" y="1088" width="40" height="14" fill="#E8384F"/>' + (o.torn ? '' : '<path d="M362 1066 l8 -10 l8 10 l8 -10 l8 10 l8 -10" fill="none" stroke="' + ST7 + '" stroke-width="3"/>') + '</g>';
  s += '<rect x="660" y="1058" width="70" height="72" rx="10" fill="#3D6FB6" stroke="' + ST7 + '" stroke-width="4"/><rect x="654" y="1046" width="82" height="18" rx="6" fill="#C9CFDB" stroke="' + ST7 + '" stroke-width="4"/><path d="M675 1090 h40" stroke="#fff" stroke-width="5" opacity=".7"/>';
  s += '<rect x="790" y="1106" width="150" height="22" rx="11" fill="#D9A86C" stroke="' + ST7 + '" stroke-width="4"/><rect x="770" y="1111" width="24" height="12" rx="5" fill="#A87A4C" stroke="' + ST7 + '" stroke-width="3"/><rect x="936" y="1111" width="24" height="12" rx="5" fill="#A87A4C" stroke="' + ST7 + '" stroke-width="3"/>';
  s += '<g transform="translate(1015 1104)"><path d="' + star7(24) + '" fill="none" stroke="#C9CFDB" stroke-width="6"/></g>';
  return s; }
// Geruchslinien aus der Ofentuer (rechts neben dem Ofen hoch, am Untertitel vorbei)
function smell7(t, k) { if (k <= .02) return ''; let s = ''; for (let i = 0; i < 4; i++) { const c = (t * .45 + i / 4) % 1, x = 876 + 16 * i + 6 * Math.sin(t * 2 + i), y = 1250 - 480 * c; // rechts neben dem Ofen, im sicheren Bereich
  s += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' q18 -22 0 -44 q-18 -22 0 -44" fill="none" stroke="#B8E06A" stroke-width="11" stroke-linecap="round" opacity="' + (k * Math.sin(Math.PI * c)).toFixed(2) + '"/>'; } return s; }
// Pulver faellt aus dem Tuetchen in die Schuessel
function powder7(t, k) { if (k <= 0 || k >= 1) return ''; let s = ''; for (let i = 0; i < 18; i++) { const c = (t * 1.6 + rnd(i + 40)) % 1; s += '<circle cx="' + (470 + 30 * rnd(i + 41) + 20 * c).toFixed(0) + '" cy="' + (1040 + 40 * c).toFixed(0) + '" r="4" fill="#fff" opacity="' + (Math.sin(Math.PI * k) * (1 - c)).toFixed(2) + '"/>'; } return s; }

// ---------- Einstieg ----------
WORLD.c7Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop;
  const fog = fr === undefined ? cl((lt - 1) / 1.5) : 1 - cl((fr - .3) / 1.2);
  let s = kitchen7(t, { on: 1, rise: ease(cl(lt / 4.5)), fog: fog * .8 }) + smell7(t, lo === undefined ? 0 : cl(lo / .6));
  if (lt < 3) { const c = (t * 1.3) % 1; s += '<circle cx="640" cy="1450" r="' + (40 + 120 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="5" opacity="' + ((1 - c) * .7).toFixed(2) + '"/>'; }
  return W(s + shade3()); };
WMASC.c7Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) { const k = cl(lo / .5), j = Math.sin(Math.PI * cl(lo / .7)); return stay3([mv7(235, 210, k), GF7 - 30 * j], 1, { flip: 1, r: -14 * j + 3 * Math.sin(t * 2), mood: lo < 1.5 ? 'shock' : 'happy' }); }
  if (fr !== undefined) { const w = Math.sin(t * 9) * cl((fr - .3) / .3) * (1 - cl((fr - 1.5) / .3)); return stay3([235, GF7], 1, { flip: 1, r: 4 + 6 * w, mood: 'shock' }); }
  return stay3([mv7(180, 235, lt / .6), GF7 - 16 * Math.sin(Math.PI * cl(lt / .6))], 1, { flip: 1, walk: lt < .6 ? 1 : 0, r: 4 * cl((lt - .5) / .4), mood: 'happy' }); };

// ---------- Teil 1: Backpulver bildet Gas (die eine Lupe) ----------
// Inhalt der Lupe (-320..320): Teig, Natron (weisse Wuerfel), Saeure (rosa Dreiecke), Wasser (Tropfen), daraus Gasblaeschen
function lensGas7(t, k) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#F2D29A"/>';
  for (let i = 0; i < 14; i++) s += '<circle cx="' + (-280 + rnd(i + 50) * 560).toFixed(0) + '" cy="' + (-280 + rnd(i + 51) * 560).toFixed(0) + '" r="' + (6 + 6 * rnd(i + 52)).toFixed(0) + '" fill="#E0B878"/>';
  const P = [[-170, -120], [60, -170], [170, 40], [-90, 110], [10, 10], [-200, 200], [200, -230]];
  P.forEach(([x, y], i) => { const g = cl((k - .15 - i * .08) / .35), b = 26 + 56 * ease(g) + 4 * Math.sin(t * 3 + i);
    if (g < 1) { const d = 46 * (1 - ease(g)); s += '<rect x="' + (x - d - 14) + '" y="' + (y - 14) + '" width="28" height="28" fill="#fff" stroke="' + ST7 + '" stroke-width="3"/><path d="M' + (x + d) + ' ' + (y - 18) + ' l18 32 h-36 Z" fill="#FF8AD8" stroke="' + ST7 + '" stroke-width="3"/><path d="M' + x + ' ' + (y - 40 - d) + ' q12 16 0 26 q-12 -10 0 -26" fill="#5CA8FF" stroke="' + ST7 + '" stroke-width="2"/>'; }
    if (g > 0) s += '<circle cx="' + x + '" cy="' + y + '" r="' + b.toFixed(0) + '" fill="#FFF8EC" fill-opacity=".55" stroke="#fff" stroke-width="5"/><circle cx="' + (x - b * .35).toFixed(0) + '" cy="' + (y - b * .35).toFixed(0) + '" r="' + (b * .15).toFixed(0) + '" fill="#fff"/>'; });
  return s; }
const LX7 = 520, LY7 = 840, LR7 = 185;
WORLD.c7Gas = function (sc, ev, t, lt) { const bp = ev.bp, ga = ev.gas, lo = ev.locker;
  const tip = bp === undefined ? 0 : cl((bp - .6) / 2), dough = lo === undefined ? .15 * cl((ga || 0) / 3) : .15 + .85 * ease(cl((lo - .2) / 2.2));
  let s = kitchen7(t, { on: 1, rise: 1, dough: dough, tip: tip, torn: bp !== undefined && bp > .5 }) + (Math.sin(Math.PI * tip) > .6 ? powder7(t, .5) : ''); // Pulver nur, solange das Tuetchen ueber der Schuessel kippt
  const lk = ga === undefined ? 0 : ease(cl(ga / .5)) * (lo === undefined ? 1 : 1 - cl(lo / .4));
  if (lk > 0) s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * lk).toFixed(2) + '"/>' + lupeH(LX7, LY7, LR7, lensGas7(t, ga === undefined ? 0 : cl(ga / 4.5)), lk, 520, 1040);
  return W(s + shade3(), slot(ev, [['bp', 'Natron + Säure'], ['gas', 'Kohlendioxid', 'hot'], ['locker', 'Teig wird lockerer']])); };
WMASC.c7Gas = (ev, t, lt) => { const bp = ev.bp, ga = ev.gas, lo = ev.locker;
  if (lo !== undefined) { const p = Math.sin(Math.PI * cl((lo - .9) / .5)), boing = Math.sin(Math.PI * cl((lo - 1.4) / .4)); return stay3([XC7, GC7 - 12 * boing], 1, { flip: 1, r: 16 * p - 6 * boing, mood: boing > .2 ? 'shock' : 'happy' }); }
  if (ga !== undefined) return stay3([XC7, GC7], 1, { flip: 1, r: 3 * Math.sin(t * 2), mood: 'happy' });
  if (bp !== undefined) { const tap = Math.sin(Math.PI * cl((bp - .3) / .5)); return stay3([XC7, GC7], 1, { flip: 1, r: 14 * tap, mood: 'happy' }); }
  const k = cl(lt / .8), j = Math.sin(Math.PI * k); return stay3([lerp(XF7, XC7, ease(k)), lerp(GF7, GC7, ease(k)) - 160 * j], 1, { flip: 1, r: -12 * j, mood: 'happy' }); };

// ---------- Teil 2: Dampf (Wissenschaftsmodus, nur hier) ----------
function sci7(t, ev) { const da = ev.dampf, pl = ev.platz, im = ev.immer; let s = '';
  const grow = pl === undefined ? 0 : ease(cl(pl / 2.5)), lift = 30 * grow, vap = da === undefined ? 0 : cl(da / 1.5);
  const x0 = 260, x1 = 900, yb = 1080, yt = 760 - lift;
  s += '<path d="M' + x0 + ' ' + yb + ' V' + (yt + 60) + ' Q' + x0 + ' ' + yt + ' ' + (x0 + 80) + ' ' + yt + ' H' + (x1 - 80) + ' Q' + x1 + ' ' + yt + ' ' + x1 + ' ' + (yt + 60) + ' V' + yb + ' Z" fill="#F2D29A" stroke="#F4F6FB" stroke-width="6"/>';
  for (let i = 0; i < 6; i++) { const cx = x0 + 120 + (i % 3) * 200 + (Math.floor(i / 3) % 2) * 0, cy = yb - 90 - Math.floor(i / 3) * (140 + lift * .5), r = 40 + 22 * grow + 3 * Math.sin(t * 3 + i);
    s += '<ellipse cx="' + cx + '" cy="' + cy.toFixed(0) + '" rx="' + (r * 1.25).toFixed(0) + '" ry="' + r.toFixed(0) + '" fill="#3A2A20" fill-opacity=".35" stroke="#FFF1D6" stroke-width="4"/>';
    // im Blaeschen: Wasser (blau) wird Dampf (weiss, flitzt)
    const sp = 1 + 4 * vap; for (let j = 0; j < 3; j++) { const a = t * sp * 2 + j * 2.1 + i; const rr = r * .55; s += '<circle cx="' + (cx + Math.cos(a) * rr * vap).toFixed(0) + '" cy="' + (cy + Math.sin(a) * rr * .7 * vap + (1 - vap) * r * .4).toFixed(0) + '" r="' + (12 + 4 * vap).toFixed(0) + '" fill="' + (vap > .5 ? '#FFFFFF' : '#5CA8FF') + '" stroke="' + ST7 + '" stroke-width="2" opacity=".95"/>'; }
    if (pl !== undefined && grow < 1) for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + .4; s += '<path d="M' + (cx + Math.cos(a) * r * 1.3).toFixed(0) + ' ' + (cy + Math.sin(a) * r).toFixed(0) + ' l' + (Math.cos(a) * 18).toFixed(0) + ' ' + (Math.sin(a) * 14).toFixed(0) + '" stroke="#FFE14D" stroke-width="5" stroke-linecap="round" opacity="' + (1 - grow).toFixed(2) + '"/>'; } }
  // Ofenhitze von unten
  for (let i = 0; i < 6; i++) { const c = (t * .9 + i / 6) % 1; s += '<path d="M' + (x0 + 70 + i * 110) + ' ' + (yb + 50 - 30 * c).toFixed(0) + ' q12 -12 0 -24 q-12 -12 0 -24" fill="none" stroke="#FF9A3D" stroke-width="5" stroke-linecap="round" opacity="' + ((vap > 0 ? .9 : .4) * (1 - c)).toFixed(2) + '"/>'; }
  if (im !== undefined) { const k = Math.sin(Math.PI * cl(im / .8)); s += '<g transform="translate(580 1130) scale(' + (1 + .25 * k).toFixed(3) + ')"><path d="M0 -46 Q30 -10 18 14 Q10 30 0 30 Q-10 30 -18 14 Q-30 -10 0 -46 Z" fill="#FF9A3D" stroke="#FFE14D" stroke-width="4"/></g>'; /* Ofenflamme: passiert bei jedem Backen */ }
  return s; }
WORLD.c7Dampf = function (sc, ev, t, lt) { const bg = fuse33(kitchen7(t, { on: 1, rise: 1, dough: .3, torn: 1 }), sc, t, lt); const m = lab33(sc, t);
  return W(bg + '<g opacity="' + m.toFixed(3) + '">' + lab33dots() + sci7(t, ev) + '</g>' + shade3(), slot(ev, [['dampf', 'Wasser wird Dampf'], ['platz', 'Dampf braucht mehr Platz', 'hot'], ['immer', 'Bei jedem Backen']])); };
WMASC.c7Dampf = (ev, t, lt) => { const rh = ev.rehook, pl = ev.platz, im = ev.immer;
  if (im !== undefined) return stay3([XF7, GF7], 1, { r: 3 * Math.sin(t * 2), mood: 'cool' });
  if (pl !== undefined) { const j = Math.sin(Math.PI * cl((pl - .6) / .6)); return stay3([XF7, GF7 - 26 * j], 1, { r: -8 * j, mood: 'shock' }); }
  if (ev.dampf !== undefined) return stay3([XF7, GF7], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' });
  const k = cl(lt / .32); return stay3([lerp(XC7, XF7, ease(k)), lerp(GC7, GF7, k * k)], 1, { r: 10 * Math.sin(Math.PI * k), mood: 'happy' }); }; // springt vom Tresen, bevor der Untertitel kommt

// ---------- Teil 3: Hirschhornsalz und Lebkuchen ----------
function gases7(t, k, fly) { if (k <= 0) return ''; let s = ''; [['H₂O', '#5CA8FF'], ['CO₂', '#C9CFDB'], ['NH₃', '#B8E06A']].forEach(([n, c], i) => { const f = cl((k - i * .18) / .5); if (f <= 0) return; const up = ease(f), fl = cl(fly || 0);
    const x = lerp(640, [390, 540, 685][i], up) + 10 * Math.sin(t * 1.4 + i * 2), y = lerp(1300, [870, 800, 870][i], up) - 60 * fl; // steigen aus dem Ofen auf die freie Wand und verblassen dort
    s += '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(' + back(f).toFixed(3) + ')" opacity="' + (1 - fl).toFixed(2) + '"><circle r="68" fill="' + c + '" stroke="' + ST7 + '" stroke-width="5"/>' + tx7(0, 16, n, 46, ST7) + '</g>'; }); return s; }
WORLD.c7Geruch = function (sc, ev, t, lt) { const rh = ev.rehook, hi = ev.hirsch, ze = ev.zerfall, fl = ev.flach, la = ev.laugig;
  let s = kitchen7(t, { on: 1, leb: 1, dough: .3, torn: 1 });
  if (hi !== undefined) { const c = (t * .9) % 1; s += '<ellipse cx="695" cy="1094" rx="' + (60 + 50 * c).toFixed(0) + '" ry="' + (50 + 40 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="6" opacity="' + ((1 - c) * (ze === undefined ? 1 : 1 - cl(ze / .4))).toFixed(2) + '"/>'; }
  s += smell7(t, rh === undefined ? 0 : cl(rh / .5) * (ze === undefined ? 1 : .5));
  if (ze !== undefined) s += gases7(t, cl(ze / 2.4), fl === undefined ? 0 : cl(fl / 1)); /* Blasen verblassen, sobald es um die flachen Lebkuchen geht */
  if (fl !== undefined) { const k = Math.sin(Math.PI * cl(fl / 3)); s += '<path d="M480 1416 H800" stroke="#FFE14D" stroke-width="6" stroke-dasharray="16 10" opacity="' + k.toFixed(2) + '"/>'; }
  return W(s + shade3(), slot(ev, [['hirsch', 'Hirschhornsalz', 'hot'], ['zerfall', 'Zerfällt in Hitze'], ['flach', 'Locker, aber flach'], ['laugig', 'Leicht laugig']])); };
WMASC.c7Geruch = (ev, t, lt) => { const rh = ev.rehook, hi = ev.hirsch, ze = ev.zerfall, fl = ev.flach, la = ev.laugig;
  if (la !== undefined) { const n = Math.sin(Math.PI * cl((la - 2) / .6)); return stay3([XF7, GF7 - 14 * n], 1, { flip: 1, r: 6 * n, mood: 'happy' }); }
  if (fl !== undefined) return stay3([XF7 - 20, GF7], 1, { flip: 1, r: 3 + 2 * Math.sin(t * 2), mood: 'cool' });
  if (ze !== undefined) { const j = Math.sin(Math.PI * cl((ze - .8) / .6)); return stay3([XF7, GF7 - 24 * j], 1, { flip: 1, r: -8 * j, mood: 'shock' }); }
  if (hi !== undefined) { const p = Math.sin(Math.PI * cl((hi - .2) / .8)); return stay3([XF7, GF7 - 12 * p], 1, { flip: 1, r: -10 * p, mood: 'happy' }); }
  if (rh !== undefined) { const sn = Math.sin(Math.PI * cl((rh - .3) / .5)), rc = Math.sin(Math.PI * cl((rh - .8) / .7)); return stay3([XF7 - 20 + 10 * sn - 40 * rc, GF7 - 20 * rc], 1, { flip: 1, r: 5 * sn - 14 * rc, mood: rh > .8 ? 'shock' : 'happy' }); }
  return stay3([XF7, GF7], 1, { flip: 1, r: 3 }); };

// ---------- Schluss ----------
WORLD.c7Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(kitchen7(t, { on: 1, rise: 1, dough: .3, torn: 1 }) + '<defs><linearGradient id="od7" x1="0" y1="0" x2="0" y2="1"><stop offset=".25" stop-color="#05071A" stop-opacity=".7"/><stop offset=".62" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od7)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.c7Out = (ev, t, lt) => stay3([XF7 + 60 * Math.sin(Math.PI * cl((lt - 1) / 5)), GF7 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { flip: lt > 3.5 && lt < 6 ? 0 : 1, r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['c7Hook', 'c7Gas', 'c7Dampf', 'c7Geruch', 'c7Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC7); });
