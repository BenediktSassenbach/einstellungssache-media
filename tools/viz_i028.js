// I028 "Warum laeuft GTA 6 nur mit 30 Bildern?" (GTA-6-Spezial, Informatik) im Skript 4, Fassung v2 (17.11.2026). Design-Kennung 3.3.
// Benedikts Wunsch: wie I029 v2 alles interaktiv in der Stadt, kein Schaubild, kein Wissenschaftsmodus.
// Ort: dieselbe Neon-Stadt wie I026 und I029 (street26). Rechts steht ein Anzeige-Turm, der zaehlt und die Zeit zeigt.
// Einstieg: Schalti blaettert ein Daumenkino, die Strasse springt bei jedem Blatt mit. Dann spielt er die 30 Bilder selbst
//   (ruckartige Spruenge, der Turm zaehlt), danach "Noch 1.770".
// Teil 1: Bilder-Zug auf der Hochbahn, jeder Wagen ein Einzelbild, 30 Wagen in einer Sekunde (Zeitlupe). Schalti laeuft einen Wagen lang mit (33 ms), blinzelt, Wagen weg.
// Teil 2: Schalti baut jedes Bild selbst fertig (Auto, Leute, Licht), bevor der Turm auf 0 ms laeuft. Mehr los, mehr Arbeit, nicht fertig: Ruckler.
// Teil 3: halbe Zeit, Schalti rennt gegen die Laterne. Details verschwinden aus der Stadt (LOD26). Werbetafel "GTA 6: 30 Bilder", Kino "24 Bilder".
// Zum Loeschen: diese Datei und videos/I028. LOD26 in viz_i026.js stoert ohne diese Datei nicht.
var AC28 = '#7C5CFF';
function bg28(t, o) { return street26(t, 0, Object.assign({ RB: 2000, F: 3000 }, o || {})) + rail28(t); }
// Anzeige-Turm rechts: Zeile 1 klein, Zeile 2 gross, col Farbe der Anzeige, ring 0..1 Fortschrittsring
function tower28(l1, l2, col, ring) { return clock28(l1, l2, col, ring); }
// kleine Leute
function ppl28(x, b, c, k, t, ph) { return pplS28(x, b, c, k, t, ph); }
function car28(x, b, c, k, lod) { return carS28(x, b, c, k, lod); }
function lamp28(x, on, k) { return lampS28(x, on, k); }

// ---------- Einstieg ----------
var ZD28 = 1.5;
WORLD.i28hook = function (sc, ev, t, lt) { const fr = ev.frage, z = ev.zaehl, pu = ev.puff || ev.puh;
  const flip = z === undefined ? 6 : 30, tq = Math.floor(t * flip) / flip; let s = bg28(tq);
  // Daumenkino in Schaltis Hand
  if (z === undefined) { const n = Math.floor(t * 6), q = (t * 6) % 1, X = 14, Y = 1196, W0 = 170, H0 = 128; s += '<g>'; for (let i = 3; i >= 1; i--) s += '<rect x="' + (X + i * 5) + '" y="' + (Y + i * 5) + '" width="' + W0 + '" height="' + H0 + '" rx="8" fill="#E8DEC8" stroke="#0B1020" stroke-width="4"/>';
    s += '<rect x="' + X + '" y="' + Y + '" width="' + W0 + '" height="' + H0 + '" rx="8" fill="#FFF8E8" stroke="#0B1020" stroke-width="4"/><path d="M' + (X + 10) + ' ' + (Y + 110) + ' h' + (W0 - 20) + '" stroke="#0B1020" stroke-width="3"/>' + car28(X + 40 + (n % 10) * 14, Y + 110, '#FF5A7A', 1, 0).replace('scale(1.250)', 'scale(.3)');
    const fw = W0 * (1 - q); if (q > .05 && q < .95) s += '<path d="M' + X + ' ' + Y + ' h' + fw.toFixed(1) + ' q' + (20 * q).toFixed(1) + ' ' + (H0 / 2) + ' 0 ' + H0 + ' h-' + fw.toFixed(1) + ' Z" fill="#FFF8E8" stroke="#0B1020" stroke-width="3"/>'; s += '</g>'; }
  let l1 = 'Bilder', l2 = '', col = '#5CE1FF', ring;
  if (fr !== undefined && z === undefined) { l2 = '30 / s'; col = '#FFE14D'; }
  if (z !== undefined) { const n = Math.min(30, Math.floor(z / ZD28 * 30) + 1); l1 = 'Bild'; l2 = n + '/30'; col = n >= 30 ? '#3DFF7A' : '#FFE14D'; ring = n / 30; if (n < 30 && (z / ZD28 * 30) % 1 < .25) s += '<rect width="1080" height="1920" fill="#fff" opacity=".08"/>'; }
  if (pu !== undefined) { l1 = 'Noch'; l2 = '1.770'; col = '#FF5A7A'; ring = undefined; }
  s += tower28(l1, l2, col, ring);
  return W(s + shade3()); };
WMASC.i28hook = (ev, t) => { const z = ev.zaehl, pu = ev.puh;
  if (pu !== undefined) return stay3([250, 1537], 1, { r: -14 + 3 * Math.sin(t * 9), mood: 'shock' });
  if (z !== undefined) { const n = Math.min(29, Math.floor(z / ZD28 * 30)), row = Math.floor(n / 10), x = row % 2 ? 640 - (n % 10) * 44 : 220 + (n % 10) * 44; return stay3([x, 1537 - (n % 2) * 40], 1, { r: n % 2 ? -10 : 10 }); }
  return stay3([220, 1537], 1, { r: 2 }); };

// ---------- Teil 1: der Bilder-Zug ----------
var TY28 = 1010, WG28 = 150; // Hoehe der Bahn, Wagenlaenge
function train28(off, hi, t) { return trainS28(off, hi, t); }
WORLD.i28bild = function (sc, ev, t, lt) { const da = ev.daumen, se = ev.sek, dr = ev.drei, bl = ev.blink; let s = bg28(t), h = '';
  // Zug: kommt beim ersten Satz, faehrt im zweiten in Zeitlupe 30 Wagen in 1 s durch, haelt im dritten an Wagen 15, ist beim Blinzeln weg
  let off = 0, clock = '', l1 = 'Zeitlupe', col = '#5CE1FF', ring, hi;
  if (da !== undefined && se === undefined) off = ease(cl(da / 2)) * 700;
  if (se !== undefined) { const q = cl(se / 2.6); off = 700 + q * (30 * WG28 - 400); clock = (q).toFixed(2).replace('.', ',') + ' s'; ring = q; col = q >= 1 ? '#3DFF7A' : '#FFE14D'; }
  if (dr !== undefined) { off = 14 * WG28 + 1100 - 540 - WG28 / 2; hi = 14; clock = '33 ms'; col = '#FFE14D'; ring = cl(dr / .8); l1 = '1 Bild'; }
  if (bl !== undefined) { const q = ease(cl((bl - .3) / .25)); off = 14 * WG28 + 1100 - 540 - WG28 / 2 + q * 1600; clock = '33 ms'; l1 = '1 Bild'; col = '#FFE14D'; }
  if (da === undefined && se === undefined && dr === undefined && bl === undefined) off = 0;
  s += train28(off, hi, t) + tower28(l1, clock || 'Bilder', col, ring);
  if (bl !== undefined && bl > .3 && bl < .7) s += '<path d="M0 ' + (TY28 - 50) + ' h1080" stroke="#F4F6FB" stroke-width="40" opacity=".25"/>';
  h += slot(ev, [['daumen', 'Ein Spiel ist ein Daumenkino'], ['sek', '30 Bilder pro Sekunde'], ['drei', 'Pro Bild rund 33 Millisekunden', 'hot'], ['blink', 'Schneller als ein Wimpernschlag']]);
  return W(s + shade3(), h); };
WMASC.i28bild = (ev, t) => { const dr = ev.drei, bl = ev.blink, se = ev.sek;
  if (bl !== undefined) { const b = bl > .3 && bl < .7; return stay3([540, 1537], 1, b ? { r: 0, mood: 'wink' } : { r: -6, mood: bl > .7 ? 'shock' : 'happy' }); }
  if (dr !== undefined) { const q = cl(dr / 1.4); return stay3([lerp(220, 540, ease(q)), 1537 - 10 * Math.abs(Math.sin(t * 12)) * (q < 1 ? 1 : 0)], 1, { r: 12, walk: q < 1 ? 1 : 0 }); }
  if (se !== undefined) return stay3([220, 1537], 1, { r: -8 + 4 * Math.sin(t * 20), mood: 'shock' });
  return BIG3(); };

// ---------- Teil 2: jedes Bild selbst bauen ----------
var CY28 = 1.5; // Dauer eines Bild-Durchgangs im Video (Zeitlupe)
// Aufgaben eines Bildes: [Art, x, Farbe]
var JOB28 = [['car', 500, '#FF5A7A'], ['ppl', 650, '#5CE1FF'], ['lamp', 760], ['ppl', 420, '#FF6BD6'], ['car', 620, '#FFD23F'], ['ppl', 720, '#3DFF7A'], ['ppl', 560, '#FFB0D9']];
function frame28(nJob, prog, t, lod) { let s = ''; for (let i = 0; i < nJob; i++) { const j = JOB28[i], k = cl((prog * nJob - i) * 1.4);
    if (j[0] === 'car') s += car28(j[1], GY26 - 2, j[2], k, lod); else if (j[0] === 'ppl') s += ppl28(j[1], GY26 - 2, j[2], k, t, i); else s += lamp28(j[1], k >= 1 && !lod, lod ? 0 : k); } return s; }
WORLD.i28budget = function (sc, ev, t, lt) { const fe = ev.fertig, al = ev.alles, me = ev.mehr, ac = ev.act;
  const stut = ac !== undefined ? (Math.floor(t * 3) % 3 === 0) : false, tt = ac !== undefined ? Math.floor(t * 2.5) / 2.5 : t; let s = bg28(tt), h = '';
  let nJob = 3, speed = 1, l2 = '33 ms', col = '#FFE14D', ring;
  const cyc = (x) => { const c = x / CY28; return [Math.floor(c), c % 1]; };
  if (fe !== undefined && al === undefined) { const [n, q] = cyc(fe); ring = 1 - q; l2 = Math.round(33 * (1 - q)) + ' ms'; s += frame28(3, 0, t, 0); }
  if (al !== undefined && me === undefined) { const [n, q] = cyc(al); ring = 1 - q; l2 = Math.round(33 * (1 - q)) + ' ms'; s += frame28(3, Math.min(1, q * 1.15), t, 0); if (q > .87) s += '<rect width="1080" height="1920" fill="#fff" opacity="' + (.25 * (q - .87) / .13).toFixed(2) + '"/>' + okx1(840, 1000, 40, true, (q - .87) / .1); }
  if (me !== undefined && ac === undefined) { const [n, q] = cyc(me); nJob = 7; ring = 1 - q; l2 = Math.round(33 * (1 - q)) + ' ms'; col = q > .6 ? '#FF5A7A' : '#FFE14D'; s += frame28(7, Math.min(1, q * 1.05), t, 0); }
  if (ac !== undefined) { const q = cl(ac / 1.2); ring = 1 - q; l2 = Math.round(33 * (1 - q)) + ' ms'; col = '#FF5A7A'; s += frame28(7, .55, t, 0); if (stut) s += '<rect width="1080" height="1920" fill="#000" opacity=".18"/>';
    s += chip3(700, 1400, 'Ruckler', 52, '#FF5A7A', '#fff', cl((ac - 1.1) / .3)); }
  s += tower28('Zeit pro Bild', l2, col, ring);
  h += slot(ev, [['fertig', 'In 33 ms muss alles fertig sein'], ['alles', 'Autos, Leute, Licht: jedes Bild neu'], ['mehr', 'Volle Stadt: mehr Arbeit', 'hot'], ['act', 'Nicht fertig: Ruckler']]);
  return W(s + shade3(), h); };
WMASC.i28budget = (ev, t, lt) => { const al = ev.alles, me = ev.mehr, ac = ev.act;
  const run = (x, n, sp) => { const q = (x / CY28) % 1, p = Math.min(1, q * 1.15), j = JOB28[Math.min(n - 1, Math.floor(p * n))]; return stay3([Math.max(220, j[1] - 170) + 8 * Math.sin(t * 30 * sp), 1537 - 14 * Math.abs(Math.sin(t * 16 * sp))], 1, { r: 12 + 6 * sp, walk: 1, mood: sp > 1.2 ? 'shock' : 'happy' }); };
  if (ac !== undefined) { const fall = cl((ac - .9) / .3); return stay3([520, 1537], 1, fall > 0 ? { r: -40 * fall, mood: 'shock' } : { r: 20, mood: 'shock' }); }
  if (me !== undefined) return run(me, 7, 1.6);
  if (al !== undefined) return run(al, 3, 1);
  return stay3([lerp(540, 220, ease(cl(lt / .7))), 1537], 1, { r: 4 }); };

// ---------- Teil 3: halbe Zeit kostet Details ----------
WORLD.i28sechzig = function (sc, ev, t, lt) { const ha = ev.halb, sp = ev.spar, ro = ev.rock, ki = ev.kino;
  const lod = sp !== undefined && ro === undefined ? ease(cl((sp - .3) / .8)) : 0; LOD26 = lod; let s = street26(t, 0, { RB: 2000, F: 3000 }) + kino28i(0, t, 1) + rail28(t); LOD26 = 0; let h = '';
  let l2 = '17 ms', col = '#FF5A7A', ring;
  if (ha !== undefined && sp === undefined) { const q = (ha / .8) % 1; ring = 1 - q; s += lamp28(560, true, 1); if (ha > 1.5 && ha < 2.4) { const k = cl((ha - 1.5) / .2); for (let i = 0; i < 5; i++) { const a = t * 6 + i * 1.25; s += '<path transform="translate(' + (480 + 50 * Math.cos(a)).toFixed(0) + ' ' + (1240 + 22 * Math.sin(a)).toFixed(0) + ') scale(' + (.6 * k).toFixed(2) + ')" d="M0 -20 L6 -6 L20 0 L6 6 L0 20 L-6 6 L-20 0 L-6 -6 Z" fill="#FFE14D"/>'; } } }
  if (sp !== undefined && ro === undefined) { s += frame28(3, 1, t, lod > .5 ? 1 : 0); s += chip3(620, 1000, 'weniger Details', 40, '#FFE14D', '#0B1020', cl((sp - .6) / .3)); }
  if (ro !== undefined && ki === undefined) { const k = cl((ro - .2) / .4); s += frame28(3, 1, t, 0) + board28i(k, t); l2 = '33 ms'; col = '#3DFF7A'; }
  if (ki !== undefined) { const k = cl((ki - .1) / .4); s += kino28i(k, t);
    /* Kino steht fest in der Haeuserreihe (kino28i), beim Satz gehen Vordach, Schrift und Plakat an */
    s += '';
    s += '<g transform="translate(330 1440)" opacity="' + cl((ki - .8) / .3).toFixed(2) + '"><path d="M-30 0 L-22 70 H22 L30 0 Z" fill="#F4F6FB" stroke="#0B1020" stroke-width="5"/><path d="M-20 0 v70 M0 0 v70 M20 0 v70" stroke="#FF5A7A" stroke-width="6"/>' + [[-20, -8], [0, -16], [18, -8], [-8, -22], [10, -24]].map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="12" fill="#FFF3C9" stroke="#0B1020" stroke-width="3"/>').join('') + '</g>'; l2 = '33 ms'; col = '#3DFF7A'; }
  s += tower28(ha !== undefined && ro === undefined ? '60 Bilder' : '30 Bilder', l2, col, ring);
  h += slot(ev, [['halb', '60 Bilder: nur knapp 17 ms'], ['spar', 'Dann muss das Spiel sparen', 'hot'], ['rock', 'GTA 6: 30 Bilder, alle Konsolen'], ['kino', 'Kino: meist 24 Bilder pro Sekunde']]);
  return W(s + shade3(), h); };
WMASC.i28sechzig = (ev, t, lt) => { const ha = ev.halb, sp = ev.spar, ki = ev.kino;
  if (lt < .5) return hop3(lt / .5, [520, 1537], [220, 1537], 50, 1, 1, { r: -10 });
  if (ha !== undefined && sp === undefined) { if (ha < 1.5) return stay3([lerp(220, 470, ease(cl(ha / 1.5))) + 6 * Math.sin(t * 40), 1537 - 16 * Math.abs(Math.sin(t * 24))], 1, { r: 22, walk: 1 }); return stay3([430, 1537], 1, { r: -30 * cl((ha - 1.5) / .2), mood: 'shock' }); }
  if (ki !== undefined) return stay3([260, 1537], 1, { r: 4, mood: 'happy' });
  if (sp !== undefined) return stay3([lerp(430, 260, ease(cl(sp / .6))), 1537], 1, { r: 2 });
  return stay3([260, 1537], 1, { r: 2 }); };

// ---------- Schluss ----------
WORLD.i28outro = function (sc, ev, t) { return W(bg28(t) + shade3()); };
WMASC.i28outro = () => BIG3();

// ---------- Look Skript Videospiel (19.11.2026): Ort Hochbahn-Station, alles steht im Ort ----------
// Hochbahn: Betontraeger mit Gelaender ueber der Strasse, Pfeiler stehen auf dem Gehweg (nicht vor Schalti), Lichtseite zur Sonne (x 700), Schatten auf dem Gehweg
function rail28(t) { let s = '<defs><linearGradient id="rb28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2C2A8"/><stop offset=".45" stop-color="#C98A86"/><stop offset="1" stop-color="#7A4A6E"/></linearGradient>'
  + '<linearGradient id="rp28" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6A3A60"/><stop offset=".6" stop-color="#B07A86"/><stop offset="1" stop-color="#F2C8A8"/></linearGradient></defs>';
  for (const x of [30]) s += '<ellipse cx="' + (x + 8) + '" cy="' + (GY26 + 8) + '" rx="54" ry="10" fill="#2A1440" opacity=".35"/><rect x="' + (x - 22) + '" y="' + (TY28 + 34) + '" width="44" height="' + (GY26 - TY28 - 34) + '" fill="url(#rp28)"/><rect x="' + (x - 34) + '" y="' + (GY26 - 26) + '" width="68" height="26" rx="4" fill="#8A5A70"/><path d="M' + (x - 40) + ' ' + (TY28 + 34) + ' h80 l-18 22 h-44 Z" fill="#9A6A7A"/>';
  s += '<rect x="0" y="' + (TY28 + 2) + '" width="1080" height="34" fill="url(#rb28)"/><rect x="0" y="' + (TY28 + 36) + '" width="1080" height="10" fill="#2A1440" opacity=".45"/><rect x="0" y="' + (TY28 + 2) + '" width="1080" height="4" fill="#FFE2C4" opacity=".8"/>';
  for (let x = 10; x < 1080; x += 36) s += '<rect x="' + x + '" y="' + (TY28 + 14) + '" width="18" height="8" rx="2" fill="#7A4A6E" opacity=".55"/>';
  s += '<path d="M0 ' + (TY28 - 30) + ' H1080" stroke="#5A3A6A" stroke-width="4" opacity=".55"/>'; for (let x = 0; x < 1080; x += 54) s += '<path d="M' + x + ' ' + (TY28 - 30) + ' V' + (TY28 + 2) + '" stroke="#5A3A6A" stroke-width="3" opacity=".5"/>';
  return s; }
// Bahnhofsuhr am Stationspfeiler (rechts): Pfeiler traegt den Traeger und reicht darueber hinaus, oben die Anzeige im Metallrahmen
function clock28(l1, l2, col, ring) { const X = 855; let s = '<ellipse cx="' + (X + 10) + '" cy="' + (GY26 + 8) + '" rx="70" ry="12" fill="#2A1440" opacity=".38"/><rect x="' + (X - 30) + '" y="680" width="60" height="' + (GY26 - 680) + '" fill="url(#rp28)"/><rect x="' + (X - 44) + '" y="' + (GY26 - 30) + '" width="88" height="30" rx="5" fill="#8A5A70"/>'
  + '<rect x="' + (X - 30) + '" y="680" width="8" height="' + (GY26 - 680) + '" fill="#000" opacity=".15"/>';
  s += '<defs><linearGradient id="cm28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8D8E8"/><stop offset=".5" stop-color="#9A88A8"/><stop offset="1" stop-color="#5A4A6A"/></linearGradient></defs>';
  s += '<rect x="' + (X - 108) + '" y="712" width="216" height="200" rx="26" fill="#2A1440" opacity=".35" transform="translate(8 10)"/><rect x="' + (X - 108) + '" y="712" width="216" height="200" rx="26" fill="url(#cm28)"/><rect x="' + (X - 96) + '" y="724" width="192" height="176" rx="18" fill="#140A26"/>'
    + '<rect x="' + (X - 96) + '" y="724" width="192" height="40" rx="18" fill="#fff" opacity=".06"/>' + svgT(X, 772, l1, 28, '#FFC27A') + svgT(X, 852, l2, l2.length > 6 ? 42 : 56, col);
  if (ring !== undefined) s += '<rect x="' + (X - 80) + '" y="872" width="160" height="10" rx="5" fill="#3A2A4A"/><rect x="' + (X - 80) + '" y="872" width="' + (160 * cl(ring)).toFixed(1) + '" height="10" rx="5" fill="' + col + '"/>';
  return s + '<rect x="' + (X - 108) + '" y="712" width="6" height="200" rx="3" fill="#FFF3E0" opacity=".5"/>'; }
// Bahn: silberne Wagen mit Streifen, Dach, Fenster zeigen das Einzelbild, Drehgestelle auf dem Traeger
function trainS28(off, hi, t) { let s = '<defs><linearGradient id="tw28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#D8D4E4"/><stop offset="1" stop-color="#9A94B0"/></linearGradient><linearGradient id="ty28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF3B0"/><stop offset="1" stop-color="#FFC83D"/></linearGradient></defs>';
  for (let i = 0; i < 30; i++) { const x = 1100 - off + i * WG28; if (x < -WG28 || x > 1100) continue; const on = hi === i, X = x + 5, w = WG28 - 10;
    s += '<rect x="' + (X + 14).toFixed(1) + '" y="' + (TY28 - 8) + '" width="26" height="12" rx="4" fill="#3A2A4A"/><rect x="' + (X + w - 40).toFixed(1) + '" y="' + (TY28 - 8) + '" width="26" height="12" rx="4" fill="#3A2A4A"/>'
      + '<path d="M' + X.toFixed(1) + ' ' + (TY28 - 8) + ' v-82 q0 -12 14 -14 h' + (w - 28) + ' q14 2 14 14 v82 Z" fill="url(#' + (on ? 'ty28' : 'tw28') + ')"/><rect x="' + X.toFixed(1) + '" y="' + (TY28 - 30) + '" width="' + w + '" height="8" fill="#FF6B9A"/><rect x="' + X.toFixed(1) + '" y="' + (TY28 - 21) + '" width="' + w + '" height="4" fill="#5FD0C0"/>'
      + '<rect x="' + (X + 12).toFixed(1) + '" y="' + (TY28 - 86) + '" width="' + (w - 24) + '" height="50" rx="6" fill="#3E1F78"/><rect x="' + (X + 12).toFixed(1) + '" y="' + (TY28 - 86) + '" width="' + (w - 24) + '" height="22" rx="6" fill="#E2507E" opacity=".7"/><rect x="' + (X + 12).toFixed(1) + '" y="' + (TY28 - 54) + '" width="' + (w - 24) + '" height="18" fill="#E8B48A"/>'
      + '<rect x="' + (X + 20 + (i % 6) * 9).toFixed(1) + '" y="' + (TY28 - 60) + '" width="30" height="14" rx="4" fill="#FF5A7A"/><path d="M' + (X + 16).toFixed(1) + ' ' + (TY28 - 80) + ' l20 0 l-26 34" stroke="#fff" stroke-width="5" opacity=".25"/>'
      + svgT(X + w / 2, TY28 - 92, String(i + 1), 16, on ? '#7A4A00' : '#5A5070') + (on ? '<rect x="' + (X - 6).toFixed(1) + '" y="' + (TY28 - 112) + '" width="' + (w + 12) + '" height="116" rx="18" fill="#FFE14D" opacity=".25"/>' : ''); }
  return s; }
// Teil 2: was Schalti fuer jedes Bild baut, im Stil der Stadt mit Schatten
function carS28(x, b, c, k, lod) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + x.toFixed(1) + ' ' + b + ') scale(' + (1.25 * e).toFixed(3) + ')"><ellipse cx="0" cy="2" rx="96" ry="9" fill="#2A1440" opacity=".35"/>' + (lod ? '<rect x="-90" y="-64" width="180" height="60" fill="' + c + '"/>' : carP28(190, 80, c, 1)) + '</g>'; }
function pplS28(x, b, c, k, t, ph) { if (k <= .01) return ''; const e = back(cl(k)), h = 150, sw = Math.sin(t * 8 + (ph || 0)) * h * .1;
  return '<g transform="translate(' + x.toFixed(1) + ' ' + b + ') scale(' + e.toFixed(3) + ')"><ellipse cx="-14" cy="2" rx="30" ry="7" fill="#2A1440" opacity=".35"/><path d="M0 ' + (-h * .47) + ' l' + sw.toFixed(1) + ' ' + (h * .47) + ' M0 ' + (-h * .47) + ' l' + (-sw).toFixed(1) + ' ' + (h * .47) + '" stroke="#2A2050" stroke-width="13" stroke-linecap="round"/>'
    + '<path d="M0 ' + (-h * .78) + ' l' + (-sw).toFixed(1) + ' ' + (h * .3) + '" stroke="#F2C9A0" stroke-width="9" stroke-linecap="round"/><path d="M-18 ' + (-h * .45) + ' l3 -50 q15 -8 30 0 l3 50 Z" fill="' + c + '"/><path d="M8 ' + (-h * .8) + ' v' + (h * .33) + '" stroke="#fff" stroke-width="4" opacity=".35"/><path d="M0 ' + (-h * .78) + ' l' + sw.toFixed(1) + ' ' + (h * .3) + '" stroke="#F2C9A0" stroke-width="9" stroke-linecap="round"/><circle cy="' + (-h * .88) + '" r="15" fill="#F2C9A0"/><path d="M-15 ' + (-h * .88) + ' a15 15 0 0 1 30 0 Z" fill="#2A1430"/></g>'; }
function lampS28(x, on, k) { if (k <= .01) return ''; const o = cl(k); return '<g opacity="' + o.toFixed(2) + '"><ellipse cx="' + (x + 6) + '" cy="' + (GY26 + 4) + '" rx="26" ry="6" fill="#2A1440" opacity=".35"/><path d="M' + x + ' ' + GY26 + ' V' + (GY26 - 250) + ' q0 -16 -16 -16 h-24" stroke="#2A1A3A" stroke-width="10" fill="none" stroke-linecap="round"/><rect x="' + (x + 2) + '" y="' + (GY26 - 250) + '" width="3" height="250" fill="#FFB98A" opacity=".5"/>'
  + '<path d="M' + (x - 62) + ' ' + (GY26 - 258) + ' l12 -16 h34 l12 16 Z" fill="#2A1A3A"/><ellipse cx="' + (x - 45) + '" cy="' + (GY26 - 256) + '" rx="20" ry="6" fill="' + (on ? '#FFE9B8' : '#6A5A70') + '"/>' + (on ? '<path d="M' + (x - 62) + ' ' + (GY26 - 252) + ' L' + (x - 110) + ' ' + GY26 + ' H' + (x + 20) + ' L' + (x - 28) + ' ' + (GY26 - 252) + ' Z" fill="#FFE9B8" opacity=".14"/>' : '') + '</g>'; }
// Teil 3: Werbetafel steht auf dem Hochbahn-Traeger (Stuetzen auf dem Gelaender), Bildschirm geht an
function board28i(k, t) { const on = cl(k); let s = '<path d="M430 990 V1012 M650 990 V1012" stroke="#5A3A6A" stroke-width="10"/><rect x="368" y="860" width="344" height="134" rx="14" fill="url(#cm28)"/><rect x="380" y="872" width="320" height="110" rx="8" fill="#140A26"/>';
  s += '<g opacity="' + on.toFixed(2) + '"><rect x="380" y="872" width="320" height="110" rx="8" fill="#FF6BD6" opacity=".12"/>' + svgT(540, 925, 'GTA 6: 30 Bilder', 38, '#FFE14D') + svgT(540, 965, 'auf allen Konsolen', 26, '#FFC2F0') + '</g><rect x="368" y="860" width="344" height="6" rx="3" fill="#FFF3E0" opacity=".6"/>';
  return s + '<rect x="360" y="852" width="360" height="150" rx="20" fill="#FF6BD6" opacity="' + (.18 * on).toFixed(2) + '" filter="url(#k26c)"/>'; }
// Teil 3: Art-deco-Kino in der Haeuserreihe (430 bis 770), steht ab Teil 3 im Bild. on: Vordach, Schrift und Plakat leuchten
function kino28i(on, t, base) { const X = 430, W = 340, top = 840; if (!base) { let s = '';
    for (let i = 0; i < 16; i++) s += '<circle cx="' + (X + 14 + i * 20.5) + '" cy="1352" r="5" fill="' + ((i + Math.floor(t * 4)) % 2 ? '#FFF3C9' : '#FFB86A') + '" opacity="' + on.toFixed(2) + '"/><circle cx="' + (X + 14 + i * 20.5) + '" cy="1352" r="11" fill="#FFE9A8" opacity="' + (.3 * on).toFixed(2) + '"/>';
    s += '<g opacity="' + on.toFixed(2) + '">' + svgT(X + W / 2, 1316, '24 Bilder pro Sekunde', 26, '#FFE14D') + '<rect x="' + (X + W / 2 - 18) + '" y="872" width="36" height="116" rx="10" fill="#FF6BD6" opacity=".35" filter="url(#k26c)"/></g>';
    const lc28 = on > .5 ? '#FFC2F0' : '#7A5A7A'; ['K', 'I', 'N', 'O'].forEach((c, j) => { s += '<text x="' + (X + W / 2) + '" y="' + (902 + j * 26) + '" text-anchor="middle" font-size="24" font-weight="900" fill="' + lc28 + '" font-family="Inter Display">' + c + '</text>'; });
    return s; }
  let s = '<rect x="' + (X - 6) + '" y="' + (GY26 - 6) + '" width="' + (W + 12) + '" height="12" fill="#2A1440" opacity=".3"/><path d="M' + X + ' ' + GY26 + ' V' + (top + 60) + ' q0 -60 60 -60 h' + (W - 120) + ' q60 0 60 60 V' + GY26 + ' Z" fill="#F2A0B8"/><path d="M' + X + ' ' + GY26 + ' V' + (top + 60) + ' q0 -60 60 -60 h' + (W - 120) + ' q60 0 60 60 V' + GY26 + ' Z" fill="url(#k26L)"/>'
    + '<rect x="' + (X + W - 6) + '" y="' + (top + 20) + '" width="6" height="' + (GY26 - top - 20) + '" fill="#FFD9A8" opacity=".8"/><rect x="' + X + '" y="' + (top + 70) + '" width="' + W + '" height="8" fill="#5FD0C0"/><rect x="' + X + '" y="' + (top + 84) + '" width="' + W + '" height="4" fill="#5FD0C0" opacity=".7"/>'
    + '<rect x="' + (X + W / 2 - 24) + '" y="872" width="48" height="122" rx="12" fill="#3A1F5E"/>' + (function () { let w = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (c !== 1 && c !== 2 || r > 1) w += '<rect x="' + (X + 22 + c * 80) + '" y="' + (1100 + r * 52) + '" width="46" height="30" rx="4" fill="' + (rnd(r * 7 + c) > .7 ? '#FFE2A8' : 'url(#k26w)') + '"/>'; return w; })()
    + '<path d="M' + (X - 14) + ' 1330 h' + (W + 28) + ' l-14 40 h' + (-W) + ' Z" fill="#E2507E"/><rect x="' + (X - 14) + '" y="1326" width="' + (W + 28) + '" height="8" fill="#FFD9A8"/>'
    + '<rect x="' + (X + 40) + '" y="1420" width="' + (W - 80) + '" height="128" fill="#2A1440"/><rect x="' + (X + 48) + '" y="1428" width="' + ((W - 96) / 2) + '" height="120" fill="#5A3482" opacity=".8"/><rect x="' + (X + W / 2 + 4) + '" y="1428" width="' + ((W - 96) / 2) + '" height="120" fill="#5A3482" opacity=".8"/>'
    + '<rect x="' + (X + 8) + '" y="1430" width="26" height="80" rx="4" fill="#FFC07A" opacity=".7"/><rect x="' + (X + W - 34) + '" y="1430" width="26" height="80" rx="4" fill="#FFC07A" opacity=".7"/>';
  return s + kino28i(on, t); }

['i28hook', 'i28bild', 'i28budget', 'i28sechzig', 'i28outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC28); });
