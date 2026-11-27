// C020H5 "Warum hilft Wasser kaum gegen scharfes Essen?" (Chemie, Skript 4, nur der Einstieg nach Hook-System), 21.11.2026.
// Benedikt: Abwechslung statt immer Lupe, angepasster Ort, nichts ueberlappt. Pro Teil eine andere Darstellung:
//   Einstieg: Kueche am Abend (Herd mit Chili-Pfanne, Spuele, Kuehlschrank), Schalti probiert, Feuer, rennt zum Wasserhahn.
//   Teil 1: Wissenschaftsmodus (Capsaicin dockt an Hitze-Sensoren, Signal zum Gehirn), Tee-Satz wieder normal.
//   Teil 2: Interaktion im Ort (Oel im Wasserglas, fettige Pfanne unter dem Hahn, Eiswuerfel).
//   Teil 3: Kuehlschrank, Milch, die eine Lupe des Videos, Siegertreppchen, Oelflasche.
// Nutzt fire20, therm20, caps20, milkin20, milk20, oil20 aus viz_c020h.js, lupeH aus viz_hook.js, fuse33 aus viz_v33.js. Zum Loeschen: diese Datei und videos/C020H5.
var T5C = 1128, FY5C = 1140, S5C = .85, AC5C = '#FF6BD6', ST5C = '#0B1020';
var PAN5C = 420, SINK5C = 790, FR5C = 880;                       // Pfanne, Wasserhahn, Kuehlschrank (linke Kante)
var XP5C = 175, XS5C = 620, XF5C = 650, XC5C = 175, GF5C = 1545;              // Schaltis Plaetze: an der Pfanne, an der Spuele, am Kuehlschrank, Mitte links
const hd5c = x => [x + 58 * S5C, FY5C - 127 * S5C];
const mv5c = (a, b, k) => lerp(a, b, ease(cl(k)));

// ---------- Der Ort: Kueche am Abend ----------
function kit5c(t, o) { o = o || {}; const T = T5C;
  let s = '<defs><linearGradient id="wl5c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#241C46"/><stop offset="1" stop-color="#47376F"/></linearGradient><radialGradient id="lg5c" cx=".45" cy=".55" r=".6"><stop offset="0" stop-color="#FFB45C" stop-opacity=".22"/><stop offset="1" stop-color="#FFB45C" stop-opacity="0"/></radialGradient></defs>';
  s += '<rect width="1080" height="1920" fill="url(#wl5c)"/><rect width="1080" height="1300" fill="url(#lg5c)"/>';
  // Fliesenspiegel ueber der Arbeitsplatte
  for (let y = 900; y < T; y += 57) for (let x = 0; x < FR5C; x += 57) s += '<rect x="' + x + '" y="' + y + '" width="55" height="55" fill="' + ((x / 57 + y / 57) % 2 < 1 ? '#5A4A8C' : '#52437F') + '"/>';
  // Fenster links oben mit Nacht und Mond
  if (!o.noshelf) s += '<rect x="300" y="660" width="230" height="190" rx="12" fill="#0F1844" stroke="' + ST5C + '" stroke-width="8"/><circle cx="470" cy="712" r="26" fill="#FFF3D0"/><circle cx="481" cy="704" r="23" fill="#0F1844"/>';
  if (!o.noshelf) for (let i = 0; i < 9; i++) s += '<circle cx="' + (315 + rnd(i + 3) * 200).toFixed(0) + '" cy="' + (675 + rnd(i + 9) * 150).toFixed(0) + '" r="2.5" fill="#fff" opacity="' + (.35 + .4 * Math.abs(Math.sin(t * .8 + i))).toFixed(2) + '"/>';
  if (!o.noshelf) s += '<path d="M415 660 V850 M300 755 H530" stroke="' + ST5C + '" stroke-width="8"/><rect x="288" y="846" width="254" height="18" rx="6" fill="#C9B8E8" stroke="' + ST5C + '" stroke-width="5"/>';
  // Gewuerzregal links (im Schluss weg, dort steht der Schlusssatz)
  if (!o.noshelf) { s += '<rect x="30" y="820" width="250" height="16" rx="6" fill="#A8774F" stroke="' + ST5C + '" stroke-width="5"/>';
    [['#E8282B', 50], ['#FFB02E', 110], ['#7BC74D', 170], ['#C0451E', 225]].forEach(([c, x], i) => { const h = [62, 74, 56, 68][i]; s += '<rect x="' + x + '" y="' + (820 - h) + '" width="40" height="' + h + '" rx="7" fill="' + c + '" opacity=".85" stroke="' + ST5C + '" stroke-width="4"/><rect x="' + (x - 2) + '" y="' + (814 - h) + '" width="44" height="12" rx="4" fill="#3A3058" stroke="' + ST5C + '" stroke-width="3"/>'; }); }
  // Kuehlschrank rechts, steht auf dem Boden
  const fo = cl(o.fridge || 0), fw = 1080 - FR5C;
  s += '<rect x="' + FR5C + '" y="560" width="' + (fw + 20) + '" height="990" rx="18" fill="#DCE3F2" stroke="' + ST5C + '" stroke-width="7"/>';
  if (fo > 0) { s += '<rect x="' + (FR5C + 14) + '" y="580" width="' + (fw - 14) + '" height="950" rx="10" fill="#FFF6D8"/>' + '<rect x="' + (FR5C + 14) + '" y="580" width="' + (fw - 14) + '" height="950" fill="#FFE9A0" opacity="' + (.35 * fo).toFixed(2) + '"/>';
    [820, 1060, 1300].forEach(y => { s += '<rect x="' + (FR5C + 14) + '" y="' + y + '" width="' + (fw - 14) + '" height="10" fill="#B9C3D9"/>'; });
    if (o.milkIn !== false) s += milk20(FR5C + 90, 1052, 1, 'MILCH');
    s += '<rect x="' + (FR5C + 20) + '" y="1220" width="60" height="70" rx="10" fill="#7BC74D" stroke="' + ST5C + '" stroke-width="4"/><rect x="' + (FR5C + 110) + '" y="1240" width="70" height="50" rx="10" fill="#FFB02E" stroke="' + ST5C + '" stroke-width="4"/>';
    const dw = lerp(fw, 46, ease(fo)); s += '<path d="M' + FR5C + ' 560 L' + (FR5C - dw * .0) + ' 560" />' + '<polygon points="' + FR5C + ',560 ' + (FR5C - dw * .35).toFixed(0) + ',' + (540).toFixed(0) + ' ' + (FR5C - dw * .35).toFixed(0) + ',1570 ' + FR5C + ',1550" fill="#C9D2E6" stroke="' + ST5C + '" stroke-width="6" stroke-linejoin="round"/>'; }
  else { s += '<path d="M' + FR5C + ' 900 H1080" stroke="' + ST5C + '" stroke-width="6"/><rect x="' + (FR5C + 22) + '" y="700" width="16" height="140" rx="8" fill="#8E97A6" stroke="' + ST5C + '" stroke-width="4"/><rect x="' + (FR5C + 22) + '" y="950" width="16" height="200" rx="8" fill="#8E97A6" stroke="' + ST5C + '" stroke-width="4"/>';
    s += '<circle cx="' + (FR5C + 120) + '" cy="640" r="20" fill="#FF6BD6" stroke="' + ST5C + '" stroke-width="4"/><rect x="' + (FR5C + 140) + '" y="740" width="44" height="58" rx="6" fill="#FFE14D" stroke="' + ST5C + '" stroke-width="4" transform="rotate(6 ' + (FR5C + 162) + ' 769)"/>'; }
  // Unterschraenke, Arbeitsplatte
  s += '<rect x="-20" y="' + (T + 38) + '" width="' + (FR5C + 20) + '" height="' + (1548 - T - 38) + '" fill="#5B3F86" stroke="' + ST5C + '" stroke-width="6"/>';
  [290, 600].forEach(x => { s += '<path d="M' + x + ' ' + (T + 40) + ' V1546" stroke="' + ST5C + '" stroke-width="6"/>'; }); [145, 445, 740].forEach(x => { s += '<rect x="' + (x - 44) + '" y="' + (T + 72) + '" width="88" height="14" rx="7" fill="#E9E3F5" opacity=".9"/>'; });
  s += '<rect x="-20" y="' + T + '" width="' + (FR5C + 20) + '" height="42" rx="8" fill="#E9E3F5" stroke="' + ST5C + '" stroke-width="6"/>';
  // Boden
  s += '<rect x="0" y="1548" width="1080" height="372" fill="#2A2246"/>'; for (let i = 0; i < 6; i++) s += '<path d="M0 ' + (1600 + i * 60) + ' H1080" stroke="#3A3060" stroke-width="3"/>';
  // Kochfeld mit gluehender Platte
  const on = o.hob === undefined ? 1 : o.hob; s += '<rect x="' + (PAN5C - 130) + '" y="' + (T - 6) + '" width="260" height="12" rx="5" fill="#1A1630" stroke="' + ST5C + '" stroke-width="4"/><ellipse cx="' + PAN5C + '" cy="' + T + '" rx="80" ry="7" fill="#FF4D2E" opacity="' + (on * (.55 + .2 * Math.sin(t * 3))).toFixed(2) + '"/>';
  // Spuele mit Becken und Wasserhahn
  s += '<rect x="' + (SINK5C - 105) + '" y="' + (T + 6) + '" width="175" height="30" rx="10" fill="#3A3058" stroke="' + ST5C + '" stroke-width="4"/>';
  s += '<path d="M' + (SINK5C - 90) + ' ' + (T + 4) + ' H' + (SINK5C + 90) + '" stroke="#8E97A6" stroke-width="10" stroke-linecap="round"/><path d="M' + (SINK5C + 40) + ' ' + T + ' V950 Q' + (SINK5C + 40) + ' 900 ' + (SINK5C - 10) + ' 900 Q' + (SINK5C - 60) + ' 900 ' + (SINK5C - 60) + ' 950" fill="none" stroke="#B9C3D9" stroke-width="18" stroke-linecap="round"/><path d="M' + (SINK5C + 40) + ' ' + T + ' V950 Q' + (SINK5C + 40) + ' 900 ' + (SINK5C - 10) + ' 900 Q' + (SINK5C - 60) + ' 900 ' + (SINK5C - 60) + ' 950" fill="none" stroke="' + ST5C + '" stroke-width="4" opacity=".6"/><rect x="' + (SINK5C + 26) + '" y="1050" width="28" height="18" rx="5" fill="#8E97A6" stroke="' + ST5C + '" stroke-width="3"/>';
  if (o.tap > 0) { const k = cl(o.tap); s += '<rect x="' + (SINK5C - 68) + '" y="958" width="16" height="' + ((T - 958) * k).toFixed(0) + '" rx="8" fill="#9FD6FF" opacity=".8"/>';
    for (let i = 0; i < 5; i++) { const c = (t * 2 + i / 5) % 1; s += '<circle cx="' + (SINK5C - 60 + 50 * Math.cos(i * 1.7) * c).toFixed(0) + '" cy="' + (T - 30 * Math.sin(Math.PI * c)).toFixed(0) + '" r="6" fill="#C9ECFF" opacity="' + (k * (1 - c)).toFixed(2) + '"/>'; } }
  // Pfanne mit Chili-Wings und Dampf (o.pan: 0 weg, sonst Position)
  if (o.panSink) s += '<g transform="translate(' + (SINK5C - 20) + ' ' + (T + 30) + ') scale(.55) translate(' + (-SINK5C) + ' ' + (-T) + ')">' + pan5c(SINK5C, T - 4, t, 0, 0) + '</g>';
  if (o.pan !== 0 && !o.panSink) s += pan5c(o.panX || PAN5C, o.panY || T - 8, t, o.panRed, o.steam === undefined ? 1 : o.steam);
  return s; }
function pan5c(x, y, t, red, steam) { let s = '';
  for (let i = 0; i < 4; i++) { const c = (t * .35 + i / 4) % 1; s += '<circle cx="' + (x - 40 + i * 26 + 16 * Math.sin(t + i)).toFixed(0) + '" cy="' + (y - 50 - 170 * c).toFixed(0) + '" r="' + (12 + 22 * c).toFixed(0) + '" fill="#F4E6F2" opacity="' + (steam * .3 * (1 - c)).toFixed(2) + '"/>'; }
  s += '<path d="M' + (x + 108) + ' ' + (y - 40) + ' h28 M' + (x - 108) + ' ' + (y - 40) + ' h-28" stroke="' + ST5C + '" stroke-width="16" stroke-linecap="round"/><path d="M' + (x - 115) + ' ' + (y - 46) + ' Q' + x + ' ' + (y + 30) + ' ' + (x + 115) + ' ' + (y - 46) + ' Z" fill="#2E2A40" stroke="' + ST5C + '" stroke-width="6" stroke-linejoin="round"/><ellipse cx="' + x + '" cy="' + (y - 46) + '" rx="115" ry="20" fill="#3E3858" stroke="' + ST5C + '" stroke-width="5"/>';
  if (red) s += '<ellipse cx="' + x + '" cy="' + (y - 44) + '" rx="96" ry="14" fill="#FF6A2A" opacity="' + (.85 * cl(red)).toFixed(2) + '"/>';
  else { for (let i = 0; i < 4; i++) s += '<g transform="translate(' + (x - 60 + i * 40) + ' ' + (y - 52 + (i % 2) * 6) + ') rotate(' + (i * 30 - 40) + ')"><ellipse rx="30" ry="16" fill="#C0451E" stroke="' + ST5C + '" stroke-width="4"/></g>';
    s += '<g transform="translate(' + (x + 30) + ' ' + (y - 70) + ') rotate(-15)"><path d="M0 0 Q40 -10 70 20 Q40 10 0 10 Z" fill="#E8282B" stroke="' + ST5C + '" stroke-width="4"/><path d="M0 4 q-14 -6 -18 -20" stroke="#3B9B3B" stroke-width="7" fill="none" stroke-linecap="round"/></g>'; }
  return s; }
function chili5c(x, y, z, r) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(3) + ') rotate(' + (r || -20) + ')"><path d="M-60 -6 Q0 -40 70 0 Q100 20 120 60 Q70 30 -60 18 Z" fill="#E8282B" stroke="' + ST5C + '" stroke-width="5" stroke-linejoin="round"/><path d="M-30 -14 Q20 -30 70 -4" stroke="#FF8A8A" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-62 4 q-20 -4 -26 -30" stroke="#3B9B3B" stroke-width="10" fill="none" stroke-linecap="round"/></g>'; }
function glass5c(x, y, t, oil, w) { const H = 260, Wd = 120; let s = '<g transform="translate(' + x + ' ' + y + ')"><path d="M' + (-Wd / 2) + ' ' + (-H) + ' L' + (-Wd / 2 + 12) + ' 0 H' + (Wd / 2 - 12) + ' L' + (Wd / 2) + ' ' + (-H) + ' Z" fill="#9FD6FF" opacity=".18"/>';
  const top = -H * .82; s += '<path d="M' + (-Wd / 2 + 4) + ' ' + top + ' L' + (-Wd / 2 + 14) + ' -6 H' + (Wd / 2 - 14) + ' L' + (Wd / 2 - 4) + ' ' + top + ' Z" fill="#5CB8FF" opacity=".55"/>';
  if (oil > 0) { const h = 46 * cl(oil); s += '<rect x="' + (-Wd / 2 + 6) + '" y="' + (top - h).toFixed(1) + '" width="' + (Wd - 12) + '" height="' + h.toFixed(1) + '" fill="#F2B233" opacity=".92"/>';
    for (let i = 0; i < 4; i++) { const c = (t * .7 + i / 4) % 1; if (oil < 1) s += '<circle cx="' + (-40 + i * 26) + '" cy="' + (-20 + (top + 20) * c).toFixed(0) + '" r="9" fill="#F2B233" stroke="' + ST5C + '" stroke-width="2" opacity="' + (1 - cl(oil)).toFixed(2) + '"/>'; } }
  s += '<path d="M' + (-Wd / 2) + ' ' + (-H) + ' L' + (-Wd / 2 + 12) + ' 0 H' + (Wd / 2 - 12) + ' L' + (Wd / 2) + ' ' + (-H) + '" fill="none" stroke="#F4F6FB" stroke-width="7" stroke-linejoin="round"/></g>';
  return s; }
function ice5c(x, y, r, op) { return op <= 0 ? '' : '<rect x="' + (x - 26) + '" y="' + (y - 26) + '" width="52" height="52" rx="10" fill="#E8F7FF" stroke="#9FD6FF" stroke-width="5" transform="rotate(' + r.toFixed(0) + ' ' + x.toFixed(0) + ' ' + y.toFixed(0) + ')" opacity="' + cl(op).toFixed(2) + '"/>'; }
function mug5c(x, y, t, k) { if (k <= 0) return ''; let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)).toFixed(3) + ')">';
  for (let i = 0; i < 3; i++) { const c = (t * .6 + i / 3) % 1; s += '<path d="M' + (-20 + i * 20) + ' ' + (-100 - 60 * c).toFixed(0) + ' q14 -16 0 -32" stroke="#F4E6F2" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (.6 * (1 - c)).toFixed(2) + '"/>'; }
  return s + '<path d="M-46 -90 H46 L40 0 H-40 Z" fill="#FF6BD6" stroke="' + ST5C + '" stroke-width="6" stroke-linejoin="round"/><path d="M46 -70 q34 0 34 26 q0 24 -38 24" fill="none" stroke="' + ST5C + '" stroke-width="8"/><ellipse cx="0" cy="-88" rx="44" ry="8" fill="#9A5A2A"/></g>'; }
function pod5c(x, y, k) { if (k <= 0) return ''; const e = back(cl(k)); return '<g transform="translate(' + x + ' ' + y + ') scale(' + e.toFixed(3) + ')"><rect x="-140" y="-90" width="132" height="90" rx="8" fill="#FFE14D" stroke="' + ST5C + '" stroke-width="6"/><rect x="8" y="-90" width="132" height="90" rx="8" fill="#FFE14D" stroke="' + ST5C + '" stroke-width="6"/>' + svgT(-74, -28, '1.', 50, ST5C) + svgT(74, -28, '1.', 50, ST5C) + '</g>'; }

// ---------- Wissenschaftsmodus Teil 1: Zungenoberflaeche mit Hitze-Sensoren ----------
const SX5C = [190, 330, 470, 610, 750, 890];
function sens5c(t, dock, sig, brain) { let s = '<path d="M60 1030 Q300 990 540 1012 Q780 1034 1020 1000 V1110 H60 Z" fill="#FF8FA8" stroke="#FFC6D4" stroke-width="5" opacity=".95"/>' + svgT(540, 1090, 'Zunge', 30, '#7A1A3A');
  SX5C.forEach((x, i) => { const on = cl((dock - i * .12) / .35);
    s += '<g transform="translate(' + x + ' ' + (1004 + 8 * Math.sin(i * 1.3)).toFixed(0) + ') scale(1.5)"><path d="M-26 0 V-40 H-12 V-18 H12 V-40 H26 V0 Z" fill="' + lc('#B05A8A', '#FFE14D', on) + '" stroke="' + ST5C + '" stroke-width="4"/></g>';
    const fall = ease(cl((dock - i * .12) / .45)), y = lerp(760 + 30 * Math.sin(t * 1.6 + i), 948, fall); s += caps5c(x + 30 * Math.sin(t * 2 + i) * (1 - fall), y, t, 200 * (1 - fall) + 20 * Math.sin(t * 3 + i) * (1 - fall));
    const sn = dock - i * .12 - .45; if (sn > 0 && sn < .35) { const c = sn / .35; s += '<circle cx="' + x + '" cy="975" r="' + (20 + 70 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="' + (9 * (1 - c)).toFixed(1) + '" opacity="' + (1 - c).toFixed(2) + '"/>'; }
    if (on > .6) s += '<path d="M' + (x + 30) + ' ' + 930 + ' l12 -26 h-14 l12 -26" stroke="#FFE14D" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (.5 + .5 * Math.sin(t * 18 + i)).toFixed(2) + '"/>'; });
  if (dock > .2 && sig === undefined) s += svgT(160, 740, 'Capsaicin', 30, '#FFB4C4', 'start') + svgT(900, 1160 - 60, '', 1, '#fff');
  if (sig !== undefined) { // Nerv vom Sensor zum Gehirn, Signal laeuft hoch
    const p = 'M470 980 C470 880 620 860 700 800 S750 720 760 700'; s += '<path d="' + p + '" stroke="#FFE14D" stroke-width="22" fill="none" stroke-linecap="round" opacity=".18"/><path d="' + p + '" stroke="#FFE14D" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="34 22" stroke-dashoffset="' + (-t * 160).toFixed(0) + '" opacity=".85"/>';
    for (let i = 0; i < 3; i++) { const c = ((sig * .9) + i / 3) % 1; const bx = 470 + (760 - 470) * c, by = 980 - 280 * c; s += '<circle cx="' + bx.toFixed(0) + '" cy="' + by.toFixed(0) + '" r="14" fill="#FFF6B0" opacity="' + cl(sig * 3).toFixed(2) + '"/>'; }
    const bk = back(cl((sig - .3) / .4)), shk = 6 * Math.sin(t * 34) * cl((sig - .8) / .3); s += '<g transform="translate(' + (770 + shk).toFixed(1) + ' 690) scale(' + bk.toFixed(3) + ')"><path d="M-90 20 C-110 -40 -60 -90 -10 -80 C10 -110 80 -100 90 -50 C130 -30 110 40 70 40 C40 70 -60 70 -90 20 Z" fill="#FF9FC4" stroke="' + ST5C + '" stroke-width="6"/><path d="M-50 -30 q20 10 10 30 M10 -60 q-10 30 20 40 M50 -20 q-20 20 0 40" stroke="#D86A9A" stroke-width="5" fill="none"/></g>';
    const fk = cl((sig - .8) / .3); if (fk > 0) s += '<g transform="translate(' + (770 + shk).toFixed(1) + ' 560) scale(' + (back(fk) * (1 + .12 * Math.sin(t * 13))).toFixed(3) + ', ' + (back(fk) * (1 + .18 * Math.sin(t * 17 + 1))).toFixed(3) + ')"><path d="M-36 40 Q-56 -14 -18 -46 Q-18 -14 0 -26 Q6 -60 30 -66 Q18 -26 42 0 Q56 26 36 40 Z" fill="#FF8A1E" stroke="' + ST5C + '" stroke-width="5"/>' + '</g>';
    const tk = cl((sig - 1.6) / .4); if (tk > 0) s += therm20(260, 820, tk); }
  return s; }
function caps5c(x, y, t, rot) { return '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(1.5) rotate(' + (rot || 0).toFixed(1) + ' 0 -20)"><path d="M0 0 L0 -26" stroke="#E8282B" stroke-width="12" stroke-linecap="round"/><path d="M0 -26 l10 -10 l-10 -10 l10 -10 l-10 -10" stroke="#FF8A1E" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="0" cy="2" r="9" fill="#E8282B" stroke="' + ST5C + '" stroke-width="3"/></g>'; }

// ---------- Einstieg ----------
WORLD.c5hook = function (sc, ev, t, lt) { const wa = ev.wasser, lo = ev.loop; const tap = wa === undefined ? 0 : cl((wa - .5) / .3) * (lo === undefined ? 1 : 1 - cl(lo / .4));
  let s = kit5c(t, { tap: tap });
  // Schalti ist schon an der Pfanne: probiert in den ersten 0,15 s, dann Feuer
  const x = wa === undefined ? XP5C : mv5c(XP5C, XS5C, (wa - .1) / .5), [hx, hy] = hd5c(x);
  const fk = lt < .12 ? 0 : (lo === undefined ? cl((lt - .12) / .12) : 1 - cl((lo - .3) / .8));
  s += fire20(hx, hy, t, fk * (wa === undefined ? 1 : .8));
  if (lt < .4) { const ck = ease(cl(lt / .1)); s += chili5c(lerp(PAN5C + 20, hx + 24, ck), lerp(T5C - 70, hy + 10, ck), .55 * (1 - cl((lt - .1) / .2)), -10); }
  if (ev.brenn !== undefined && wa === undefined) s += therm20(540, 1000, cl((ev.brenn - 1.4) / .4));
  return W(s + shade3()); };
WMASC.c5hook = (ev, t, lt) => { const wa = ev.wasser, lo = ev.loop;
  const shake = 6 * Math.sin(t * 38) * cl((lt - .12) / .1) * (lo === undefined ? 1 : 1 - cl(lo / .5));
  if (lo !== undefined) return stay3([XS5C, FY5C], S5C, { r: 4 * Math.sin(t * 3), mood: lo > .8 ? 'happy' : 'shock' });
  if (wa !== undefined) { const k = cl((wa - .1) / .5), j = Math.sin(Math.PI * k); return stay3([mv5c(XP5C, XS5C, k), FY5C - 190 * j], S5C, { r: -10 * j + shake, mood: 'shock' }); }
  return stay3([XP5C + (lt < .15 ? 30 * Math.sin(Math.PI * lt / .15) : 0), FY5C], S5C, { r: (lt < .15 ? 14 : 0) + shake, mood: 'shock' }); };

// ---------- Teil 1: falscher Alarm (Wissenschaftsmodus fuer Satz 2 und 3) ----------
WORLD.c5alarm = function (sc, ev, t, lt) { const ca = ev.caps, dk = ev.dock, fe = ev.feuer, te = ev.tee;
  const bg = kit5c(t, { pan: te !== undefined ? 1 : undefined }); let s = fuse33(bg, sc, t, lt);
  if (ca !== undefined && dk === undefined) { const k = cl(ca / .5); s += '<circle cx="560" cy="860" r="' + (210 * ease(k)).toFixed(0) + '" fill="#120C26" opacity=".55"/>' + chili5c(lerp(PAN5C + 30, 560, ease(k)), lerp(T5C - 80, 860, ease(k)), lerp(.5, 2.2, ease(k)), -20 + 10 * Math.sin(t));
    for (let i = 0; i < 4; i++) { const c = (t * .5 + i / 4) % 1; if (ca > .8) s += caps5c(460 + i * 70 + 10 * Math.sin(t + i), 900 - 140 * c, t).replace('scale(1.5)', 'scale(' + (1.1 * cl((ca - .8) / .4)).toFixed(2) + ')'); }
  }
  const m = lab33(sc, t); if (dk !== undefined && te === undefined && m > .01) s += '<g opacity="' + m.toFixed(3) + '">' + sens5c(t, dk / 1.6, fe) + '</g>';
  if (te !== undefined) s += mug5c(620, T5C, t, cl(te / .4));
  return W(s + shade3(), slot(ev, [['caps', 'Capsaicin aus der Chili'], ['dock', 'Dockt an Hitze-Sensoren', 'hot'], ['feuer', 'Gehirn meldet: Feuer!', 'red'], ['tee', 'Sonst: echte Hitze']])); };
const LX5C = 210; // Schaltis Platz auf dem Boden im Wissenschaftsmodus
WMASC.c5alarm = (ev, t, lt) => { const dk = ev.dock, te = ev.tee;
  if (te !== undefined) return stay3([LX5C, GF5C - 50 * Math.sin(Math.PI * cl((te - 2.3) / .5))], 1, { r: -6, mood: te > 2.3 ? 'shock' : 'happy' });
  if (dk !== undefined) { const d = cl(dk / .6), j = Math.sin(Math.PI * d); return stay3([mv5c(XC5C, LX5C, d), lerp(FY5C, GF5C, ease(d)) - 30 * j], lerp(S5C, 1, d), { r: -12 * j, mood: ev.feuer !== undefined ? 'cool' : 'happy' }); }
  return stay3([mv5c(XS5C, XC5C, lt / .8), FY5C - 40 * Math.sin(Math.PI * cl(lt / .8))], S5C, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 2: Wasser perlt ab (Interaktion im Ort) ----------
WORLD.c5wasser = function (sc, ev, t, lt) { const fe = ev.fett, dr = ev.drueber, ei = ev.eis;
  const inSink = dr !== undefined && ei === undefined; let s = kit5c(t, { hob: dr !== undefined ? 0 : 1, tap: inSink ? cl((dr - .5) / .3) : 0, pan: dr !== undefined ? 0 : 1, panSink: ei !== undefined, steam: fe !== undefined && dr === undefined ? 0 : .4 });
  if (fe !== undefined && dr === undefined) { const k = cl(fe / .4); s += '<g opacity="' + k.toFixed(2) + '">' + glass5c(640, T5C, t, cl((fe - 1.2) / 2.2), 1);
    const pour = cl((fe - .6) / .4) * (1 - cl((fe - 3.6) / .4)); if (pour > 0) s += '<g transform="translate(720 ' + (700 - 500 * (1 - ease(pour))).toFixed(0) + ') rotate(' + (-60 * pour - 20).toFixed(1) + ')"><path d="M-26 0 V-110 Q-26 -136 -10 -146 V-178 H10 V-146 Q26 -136 26 -110 V0 Z" fill="#F2C744" stroke="' + ST5C + '" stroke-width="6"/></g><path d="M668 736 Q650 800 650 ' + (T5C - 260) + '" stroke="#F2B233" stroke-width="10" fill="none" stroke-linecap="round" opacity="' + pour.toFixed(2) + '"/>';
    if (pour > 0) { const sy = T5C - 260 * .82 - 46 * cl((fe - 1.2) / 2.2); for (let i = 0; i < 5; i++) { const c = (t * 2.2 + i / 5) % 1; s += '<circle cx="' + (650 + (i - 2) * 22 * c).toFixed(0) + '" cy="' + (sy - 50 * Math.sin(Math.PI * c)).toFixed(0) + '" r="6" fill="#F2B233" opacity="' + (pour * (1 - c)).toFixed(2) + '"/>'; }
      s += '<ellipse cx="640" cy="' + sy.toFixed(0) + '" rx="' + (20 + 30 * ((t * 1.5) % 1)).toFixed(0) + '" ry="6" fill="none" stroke="#E8F7FF" stroke-width="3" opacity="' + (pour * (1 - (t * 1.5) % 1)).toFixed(2) + '"/>';
      for (let i = 0; i < 4; i++) { const c = (t * .8 + i / 4) % 1; s += '<circle cx="' + (615 + i * 16 + 6 * Math.sin(t * 3 + i)).toFixed(0) + '" cy="' + (T5C - 20 - (T5C - 20 - sy) * c).toFixed(0) + '" r="' + (5 + 3 * (i % 2)) + '" fill="#F2B233" stroke="' + ST5C + '" stroke-width="2" opacity="' + (pour * .9).toFixed(2) + '"/>'; } }
    s += svgT(640, 905, 'Öl', 28, '#5A3A00') + svgT(640, 1050, 'Wasser', 28, '#0B2A5A') + '</g>'; }
  if (inSink) { s += '<g transform="translate(' + (SINK5C - 20) + ' ' + (T5C + 30) + ') scale(.55) translate(' + (-SINK5C) + ' ' + (-T5C) + ')">' + pan5c(SINK5C, T5C - 4, t, 1, 0) + '</g>'; // fettige Pfanne in der Spuele, Wasser perlt ab
    for (let i = 0; i < 6; i++) { const c = (t * 1.4 + i / 6) % 1; s += '<circle cx="' + (SINK5C - 60 + (i % 2 ? 1 : -1) * 60 * c).toFixed(0) + '" cy="' + (T5C + 4 + 20 * c * c).toFixed(0) + '" r="10" fill="#9FD6FF" stroke="#E8F7FF" stroke-width="3" opacity="' + (cl((dr - .8) / .3) * (1 - c)).toFixed(2) + '"/>'; } }
  if (ei !== undefined) { const [hx, hy] = hd5c(XC5C); for (let i = 0; i < 3; i++) { const f = cl((ei - .3 - i * .15) / .5); s += ice5c(lerp(560 + i * 50, hx + 10, ease(f)), lerp(820, hy + 10, ease(f)) - 120 * Math.sin(Math.PI * f), 40 * f + i * 20, 1 - cl((ei - 1.6) / .3)); }
    const cold = Math.sin(Math.PI * cl((ei - .8) / 1.8)); if (cold > 0) s += '<circle cx="' + hx + '" cy="' + hy + '" r="' + (90 + 10 * Math.sin(t * 4)).toFixed(0) + '" fill="none" stroke="#9FD6FF" stroke-width="8" stroke-dasharray="14 12" opacity="' + (.8 * cold).toFixed(2) + '"/>';
    s += fire20(hx, hy, t, cl((ei - 2.4) / .5)); }
  return W(s + shade3(), slot(ev, [['fett', 'Mischt sich kaum mit Wasser', 'hot'], ['drueber', 'Wasser läuft drüber'], ['eis', 'Eis kühlt nur kurz']])); };
WMASC.c5wasser = (ev, t, lt) => { const fe = ev.fett, dr = ev.drueber, ei = ev.eis;
  if (ei !== undefined) { const sh = Math.sin(t * 30) * cl((ei - .8) / .3) * (1 - cl((ei - 2.4) / .3)); return stay3([XC5C + 3 * sh, FY5C], S5C, { r: 2 * sh, mood: ei > 2.4 ? 'shock' : 'cool' }); }
  if (dr !== undefined) return stay3([XC5C, FY5C], S5C, { r: 4 * Math.sin(t * 3), mood: 'cool' });
  const up = cl(lt / .6); return stay3([mv5c(LX5C, XC5C, up), lerp(GF5C, FY5C, ease(up)) - 30 * Math.sin(Math.PI * up)], lerp(1, S5C, up), { r: 2, mood: fe > 2 ? 'happy' : undefined }); };

// ---------- Teil 3: Milch ----------
WORLD.c5milch = function (sc, ev, t, lt) { const mi = ev.milch, ka = ev.kasein, st = ev.studie, oe = ev.oel;
  const fo = mi === undefined ? 0 : (ka === undefined ? cl((mi - .3) / .5) : 1 - cl(ka / .5)), take = mi === undefined ? 0 : cl((mi - 1.1) / .6);
  let s = kit5c(t, { hob: 0, fridge: fo, milkIn: take <= 0, panSink: 1 });
  const [hx, hy] = hd5c(mx5c(ev));
  if (take > 0 && st === undefined) s += milk20(lerp(FR5C + 30, 615, ease(take)), lerp(1052, T5C, ease(take)) - 160 * Math.sin(Math.PI * take), 1, 'MILCH');
  if (mi !== undefined && ka === undefined) s += fire20(hx, hy, t, mi < 1.6 ? 1 - .7 * cl((mi - .4) / .4) : .3 * (1 - cl((mi - 1.8) / .5)));
  if (ka !== undefined && st === undefined) s += lupeH(700, 880, 160, milkin20(t, { m: cl((ka - .3) / 3.2) }), cl(ka / .4), hx + 30, hy - 70);
  if (st !== undefined && oe === undefined) { s += pod5c(560, 1128, cl(st / .4)) + milk20(486, 1038, cl((st - .3) / .4), 'VOLL', '#5CB8FF') + milk20(634, 1038, cl((st - .5) / .4), 'FETTARM', '#9FD6FF') + chip3(560, 790, 'Studie 2019, 72 Leute', 34, '#FFE14D', ST5C, cl((st - 1.6) / .3)); }
  if (oe !== undefined) { s += oil20(615, T5C, cl(oe / .4));
    const w = cl((oe - 1) / .3); if (w > 0) for (let i = 0; i < 3; i++) s += '<path d="M' + (560 - i * 110 - 30 * Math.sin(t * 2 + i)) + ' ' + (T5C - 200 - i * 10) + ' q-16 -20 0 -40 q16 -20 0 -40" stroke="#B7E35A" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (w * (.5 + .5 * Math.sin(t * 5 + i))).toFixed(2) + '"/>'; }
  return W(s + shade3(), slot(ev, [['milch', 'Was wirklich hilft: Milch', 'hot'], ['kasein', 'Fett + Kasein nehmen es auf'], ['studie', 'Fettarm = Vollmilch', 'hot'], ['oel', 'Öl hilft, schmeckt aber nicht']])); };
function mx5c(ev) { const mi = ev.milch, st = ev.studie, oe = ev.oel; if (oe !== undefined) return XC5C; if (st !== undefined) return XC5C;
  if (mi === undefined) return XC5C; return mi < 1.1 ? mv5c(XC5C, XF5C, mi / .6) : mv5c(XF5C, XC5C, (mi - 1.1) / .6); }
WMASC.c5milch = (ev, t, lt) => { const mi = ev.milch, ka = ev.kasein, st = ev.studie, oe = ev.oel, x = mx5c(ev);
  if (oe !== undefined) { const w = Math.sin(t * 8) * cl((oe - 1) / .3); return stay3([x, FY5C], S5C, { r: 8 * w - 6, mood: oe > 1 ? 'shock' : 'cool' }); }
  if (st !== undefined) return stay3([x, FY5C - 30 * Math.sin(Math.PI * cl((st - 1.6) / .6))], S5C, { r: 3, mood: 'happy' });
  if (ka !== undefined) return stay3([x, FY5C], S5C, { r: 2, mood: 'happy' });
  if (mi !== undefined) { const drink = cl((mi - 1.8) / .3), hop = mi < 1.1 ? Math.sin(Math.PI * cl(mi / .6)) : Math.sin(Math.PI * cl((mi - 1.1) / .6)); return stay3([x, FY5C - 30 * hop], S5C, { r: -16 * drink, mood: mi > 2.3 ? 'happy' : 'shock' }); }
  return stay3([x, FY5C], S5C, { r: 2 }); };

// ---------- Schluss ----------
WORLD.c5out = function (sc, ev, t, lt) { return W(kit5c(t, { noshelf: 1, hob: 0, panSink: 1 }) + milk20(615, T5C, 1, 'MILCH') + shade3()); };
WMASC.c5out = (ev, t, lt) => stay3([mv5c(XC5C, XC5C, lt / .6), FY5C - 30 * Math.sin(Math.PI * cl(lt / .6))], S5C, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['c5hook', 'c5alarm', 'c5wasser', 'c5milch', 'c5out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC5C); });
