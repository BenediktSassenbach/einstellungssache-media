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
function bg28(t, o) { return street26(t, 0, Object.assign({ RB: 2000, F: 3000 }, o || {})); }
// Anzeige-Turm rechts: Zeile 1 klein, Zeile 2 gross, col Farbe der Anzeige, ring 0..1 Fortschrittsring
function tower28(l1, l2, col, ring) { let s = '<rect x="800" y="900" width="110" height="' + (GY26 - 900) + '" fill="#2C2160" stroke="#0B1020" stroke-width="6"/><path d="M800 960 h110 M800 1040 h110" stroke="#4A3C9A" stroke-width="4"/>';
  s += '<rect x="740" y="720" width="200" height="190" rx="22" fill="#0B1020" stroke="' + AC28 + '" stroke-width="7"/>' + svgT(840, 778, l1, 30, '#B9A6FF') + svgT(840, 860, l2, l2.length > 6 ? 44 : 58, col);
  if (ring !== undefined) s += '<rect x="752" y="890" width="' + (176 * cl(ring)).toFixed(1) + '" height="10" rx="5" fill="' + col + '"/>';
  return s; }
// kleine Leute
function ppl28(x, b, c, k, t, ph) { if (k <= .01) return ''; const e = back(cl(k)), sw = 6 * Math.sin(t * 8 + (ph || 0)); return '<g transform="translate(' + x.toFixed(1) + ' ' + b + ') scale(' + (1.4 * e).toFixed(3) + ')"><path d="M-10 0 l' + (4 + sw * .5).toFixed(1) + ' -46 M10 0 l' + (-4 - sw * .5).toFixed(1) + ' -46" stroke="#0B1020" stroke-width="9" stroke-linecap="round"/><rect x="-20" y="-104" width="40" height="64" rx="16" fill="' + c + '" stroke="#0B1020" stroke-width="5"/><circle cy="-124" r="18" fill="#F2C9A0" stroke="#0B1020" stroke-width="5"/></g>'; }
function car28(x, b, c, k, lod) { if (k <= .01) return ''; const e = back(cl(k)); return '<g transform="translate(' + x.toFixed(1) + ' ' + b + ') scale(' + (1.3 * e).toFixed(3) + ')">' + (lod ? '<rect x="-80" y="-64" width="160" height="60" fill="' + c + '" stroke="#0B1020" stroke-width="5"/>' : '<path d="M-90 -8 v-36 q0 -12 12 -12 h30 l26 -30 h64 l28 30 h12 q12 0 12 12 v36 Z" fill="' + c + '" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M-40 -58 l20 -24 h46 l22 24 Z" fill="#2C3A66"/><circle cx="-50" cy="-6" r="18" fill="#0B1020"/><circle cx="50" cy="-6" r="18" fill="#0B1020"/>') + '</g>'; }
function lamp28(x, on, k) { if (k <= .01) return ''; return '<g opacity="' + cl(k).toFixed(2) + '"><path d="M' + x + ' ' + GY26 + ' V' + (GY26 - 250) + ' h-40" stroke="#3A2E8A" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cx="' + (x - 40) + '" cy="' + (GY26 - 246) + '" rx="22" ry="10" fill="' + (on ? '#FFE9A8' : '#5A5A70') + '"/>' + (on ? '<path d="M' + (x - 62) + ' ' + (GY26 - 240) + ' L' + (x - 110) + ' ' + GY26 + ' H' + (x + 30) + ' L' + (x - 18) + ' ' + (GY26 - 240) + ' Z" fill="#FFE9A8" opacity=".18"/>' : '') + '</g>'; }

// ---------- Einstieg ----------
var ZD28 = 1.5;
WORLD.i28hook = function (sc, ev, t, lt) { const fr = ev.frage, z = ev.zaehl, pu = ev.puff || ev.puh;
  const flip = z === undefined ? 6 : 30, tq = Math.floor(t * flip) / flip; let s = bg28(tq);
  // Daumenkino in Schaltis Hand
  if (z === undefined) { const n = Math.floor(t * 6), q = (t * 6) % 1, X = 360, Y = 1290, W0 = 200, H0 = 150; s += '<g>'; for (let i = 3; i >= 1; i--) s += '<rect x="' + (X + i * 5) + '" y="' + (Y + i * 5) + '" width="' + W0 + '" height="' + H0 + '" rx="8" fill="#E8DEC8" stroke="#0B1020" stroke-width="4"/>';
    s += '<rect x="' + X + '" y="' + Y + '" width="' + W0 + '" height="' + H0 + '" rx="8" fill="#FFF8E8" stroke="#0B1020" stroke-width="4"/><path d="M' + (X + 10) + ' ' + (Y + 110) + ' h' + (W0 - 20) + '" stroke="#0B1020" stroke-width="3"/>' + car28(X + 40 + (n % 10) * 14, Y + 110, '#FF5A7A', 1, 0).replace('scale(1.300)', 'scale(.35)');
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
function train28(off, hi, t) { let s = '<rect x="0" y="' + (TY28 + 6) + '" width="1080" height="22" fill="#3A2F7A" stroke="#0B1020" stroke-width="5"/>';
  for (let x = 60; x < 1080; x += 300) s += '<rect x="' + x + '" y="' + (TY28 + 28) + '" width="26" height="' + (GY26 - TY28 - 28) + '" fill="#2C2160" opacity=".8"/>';
  for (let i = 0; i < 30; i++) { const x = 1100 - off + i * WG28; if (x < -WG28 || x > 1100) continue; const on = hi === i;
    s += '<rect x="' + (x + 6).toFixed(1) + '" y="' + (TY28 - 100) + '" width="' + (WG28 - 12) + '" height="100" rx="12" fill="' + (on ? '#FFE14D' : '#F4F6FB') + '" stroke="#0B1020" stroke-width="5"/><rect x="' + (x + 18).toFixed(1) + '" y="' + (TY28 - 88) + '" width="' + (WG28 - 36) + '" height="62" rx="6" fill="#2C2160"/>';
    s += '<rect x="' + (x + 26 + (i % 6) * 9).toFixed(1) + '" y="' + (TY28 - 48) + '" width="34" height="16" rx="4" fill="#FF5A7A"/><path d="M' + (x + 22).toFixed(1) + ' ' + (TY28 - 32) + ' h' + (WG28 - 44) + '" stroke="#9B84FF" stroke-width="3"/>' + svgT(x + WG28 / 2, TY28 - 6, String(i + 1), 18, '#0B1020') + '<circle cx="' + (x + 30).toFixed(1) + '" cy="' + (TY28 + 4) + '" r="9" fill="#0B1020"/><circle cx="' + (x + WG28 - 30).toFixed(1) + '" cy="' + (TY28 + 4) + '" r="9" fill="#0B1020"/>'; }
  return s; }
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
  const lod = sp !== undefined && ro === undefined ? ease(cl((sp - .3) / .8)) : 0; LOD26 = lod; let s = bg28(t); LOD26 = 0; let h = '';
  let l2 = '17 ms', col = '#FF5A7A', ring;
  if (ha !== undefined && sp === undefined) { const q = (ha / .8) % 1; ring = 1 - q; s += lamp28(560, true, 1); if (ha > 1.5 && ha < 2.4) { const k = cl((ha - 1.5) / .2); for (let i = 0; i < 5; i++) { const a = t * 6 + i * 1.25; s += '<path transform="translate(' + (480 + 50 * Math.cos(a)).toFixed(0) + ' ' + (1240 + 22 * Math.sin(a)).toFixed(0) + ') scale(' + (.6 * k).toFixed(2) + ')" d="M0 -20 L6 -6 L20 0 L6 6 L0 20 L-6 6 L-20 0 L-6 -6 Z" fill="#FFE14D"/>'; } } }
  if (sp !== undefined && ro === undefined) { s += frame28(3, 1, t, lod > .5 ? 1 : 0); s += chip3(620, 1000, 'weniger Details', 40, '#FFE14D', '#0B1020', cl((sp - .6) / .3)); }
  if (ro !== undefined && ki === undefined) { const k = cl((ro - .2) / .4); s += frame28(3, 1, t, 0) + '<g opacity="' + k.toFixed(2) + '"><rect x="360" y="900" width="360" height="150" rx="18" fill="#0B1020" stroke="' + AC28 + '" stroke-width="8"/><rect x="372" y="912" width="336" height="126" rx="12" fill="none" stroke="#FF6BD6" stroke-width="3" opacity="' + (.5 + .5 * Math.sin(t * 6)).toFixed(2) + '"/>' + svgT(540, 965, 'GTA 6: 30 Bilder', 40, '#FFE14D') + svgT(540, 1015, 'auf allen Konsolen', 28, '#B9A6FF') + '<path d="M430 1050 V1120 M650 1050 V1120" stroke="#3A2F7A" stroke-width="10"/></g>'; l2 = '33 ms'; col = '#3DFF7A'; }
  if (ki !== undefined) { const k = cl((ki - .1) / .4); s += '<g opacity="' + k.toFixed(2) + '" transform="translate(160 0)"><rect x="400" y="1120" width="360" height="428" fill="#5A1E3A" stroke="#0B1020" stroke-width="6"/><rect x="380" y="1080" width="400" height="90" rx="10" fill="#FFD23F" stroke="#0B1020" stroke-width="6"/>';
    for (let i = 0; i < 14; i++) s += '<circle cx="' + (396 + i * 28) + '" cy="1088" r="6" fill="' + ((i + Math.floor(t * 4)) % 2 ? '#fff' : '#FF5A7A') + '"/>';
    s += svgT(580, 1145, 'KINO', 46, '#0B1020') + '<rect x="480" y="1450" width="200" height="98" rx="8" fill="#2C1020" stroke="#0B1020" stroke-width="5"/><rect x="430" y="940" width="300" height="115" rx="10" fill="#0B1020" stroke="#FFD23F" stroke-width="5"/><path d="M500 1055 v25 M660 1055 v25" stroke="#3A2F7A" stroke-width="8"/>' + svgT(580, 990, '24 Bilder', 40, '#FFE14D') + svgT(580, 1035, 'pro Sekunde', 26, '#F4F6FB') + '</g>';
    s += '<g transform="translate(330 1440)" opacity="' + cl((ki - .8) / .3).toFixed(2) + '"><path d="M-30 0 L-22 70 H22 L30 0 Z" fill="#F4F6FB" stroke="#0B1020" stroke-width="5"/><path d="M-20 0 v70 M0 0 v70 M20 0 v70" stroke="#FF5A7A" stroke-width="6"/>' + [[-20, -8], [0, -16], [18, -8], [-8, -22], [10, -24]].map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="12" fill="#FFF3C9" stroke="#0B1020" stroke-width="3"/>').join('') + '</g>'; l2 = '33 ms'; col = '#3DFF7A'; }
  if (ki === undefined) s += tower28(ha !== undefined && ro === undefined ? '60 Bilder' : '30 Bilder', l2, col, ring);
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

['i28hook', 'i28bild', 'i28budget', 'i28sechzig', 'i28outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC28); });
