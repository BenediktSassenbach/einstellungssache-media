// B001V3 "Sind Voegel wirklich Dinosaurier?" im Design 3.0 (Fach Bio, Pilot, 16.11.2026).
// Ort: Huehnerhof am Tag. Das Huhn ist das Hauptobjekt und verwandelt sich an Ort und Stelle:
//   Einstieg: Huhn wird zum Raubsaurier und jagt Schalti aus dem Bild. Teil 1: Huhn wird zum kleinen Raubsaurier, bekommt Federn, bruetet, wird zum Vogel.
//   Teil 2: Der Baum auf dem Hof ist der Stammbaum. Teil 3: derselbe Ort vor 66 Millionen Jahren, Einschlag, dann wieder heute.
// Alle Tiere sind eigene Zeichnungen, keine Figuren aus Filmen. Helfer aus viz_v3.js und viz_v3b.js.
// Zum Loeschen dieser Fassung: diese Datei und videos/B001V3.
function mxb(a, b, k) { k = cl(k); const h = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)), A = h(a), B = h(b); return '#' + A.map((x, i) => Math.round(lerp(x, B[i], k)).toString(16).padStart(2, '0')).join(''); }
function cloudb(x, y, s, op) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" opacity="' + (op === undefined ? 1 : op) + '"><ellipse cx="0" cy="20" rx="150" ry="50" fill="#fff"/><circle cx="-70" cy="0" r="56" fill="#fff"/><circle cx="10" cy="-30" r="74" fill="#fff"/><circle cx="86" cy="4" r="52" fill="#fff"/></g>'; }

// Der Hof. o: dark (Asche-Himmel 0 bis 1), old (Urzeit: kein Stall, kein Zaun, Farne), part (2 = anderer Teil des Hofs ohne Stall)
function yardb(t, o) { o = o || {}; const dk = cl(o.dark || 0), old = o.old, id = 'yb' + (old ? 'o' : 'n');
  const top = mxb(old ? '#2A55B8' : '#1F5FD0', '#1A0A10', dk), bot = mxb(old ? '#FFD9A0' : '#A9DBFF', '#B8431F', dk);
  let s = '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bot + '"/></linearGradient></defs><rect width="1080" height="1120" fill="url(#' + id + ')"/>';
  s += '<circle cx="880" cy="740" r="' + (120 + 6 * Math.sin(t * 2)) + '" fill="#FFF6C8" opacity="' + (.3 * (1 - dk)) + '"/><circle cx="880" cy="740" r="56" fill="#FFFBE0" opacity="' + (1 - .85 * dk) + '"/>';
  s += cloudb(250 + 30 * Math.sin(t * .12), 720, .55, .9 * (1 - dk)) + cloudb(640 + 24 * Math.sin(t * .1 + 2), 660, .4, .8 * (1 - dk));
  s += '<path d="M-20 1016 Q200 930 430 992 T860 962 T1100 1004 V1140 H-20 Z" fill="' + mxb(old ? '#2E7D5A' : '#2F8F4E', '#2E2220', dk) + '"/>';
  if (old) { // Farne und Palmfarne am Horizont
    for (const [x, h] of [[90, 150], [330, 110], [960, 170], [770, 100]]) { s += '<path d="M' + x + ' 1010 V' + (1010 - h) + '" stroke="' + mxb('#4A3320', '#1E1614', dk) + '" stroke-width="16" stroke-linecap="round"/>';
      for (let i = 0; i < 7; i++) { const a = (-160 + i * 24 + 3 * Math.sin(t * 1.3 + i + x)) * Math.PI / 180; s += '<path d="M' + x + ' ' + (1010 - h) + ' q' + (40 * Math.cos(a)).toFixed(1) + ' ' + (40 * Math.sin(a) - 16).toFixed(1) + ' ' + (88 * Math.cos(a)).toFixed(1) + ' ' + (88 * Math.sin(a) + 10).toFixed(1) + '" stroke="' + mxb('#1F6B45', '#241A18', dk) + '" stroke-width="13" fill="none" stroke-linecap="round"/>'; } }
  } else if (o.part !== 2) { // Stall
    s += '<rect x="96" y="850" width="214" height="160" fill="#B5432E" stroke="#0B1020" stroke-width="6"/><path d="M76 858 L203 762 L330 858 Z" fill="#7A2A1E" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><path d="M172 1010 V930 Q203 896 234 930 V1010 Z" fill="#2A1410"/><path d="M96 904 H310 M96 958 H172 M234 958 H310" stroke="#8E3222" stroke-width="5"/><rect x="250" y="880" width="38" height="38" rx="5" fill="#FFE9A8" stroke="#0B1020" stroke-width="5"/>';
  }
  if (!old) { for (let x = (o.part === 2 ? 30 : 350); x < 1090; x += 74) s += '<rect x="' + x + '" y="946" width="14" height="84" rx="5" fill="#E9D8B4" stroke="#0B1020" stroke-width="4"/>'; s += '<path d="M' + (o.part === 2 ? 0 : 340) + ' 966 H1080 M' + (o.part === 2 ? 0 : 340) + ' 1004 H1080" stroke="#E9D8B4" stroke-width="10"/>'; }
  s += '<path d="M-20 1052 Q260 1030 560 1050 T1100 1042 V1920 H-20 Z" fill="' + mxb(old ? '#3C9A5A' : '#3DAA52', '#3A2C24', dk) + '"/>';
  for (let i = 0; i < 16; i++) { const x = 30 + i * 68 + 30 * rnd(i + 3), y = 1090 + 380 * rnd(i + 17), w = 5 * Math.sin(t * 1.6 + i); s += '<path d="M' + x + ' ' + y + ' q' + (-8 + w) + ' -22 ' + (-14 + w * 2) + ' -34 M' + x + ' ' + y + ' q' + (2 + w) + ' -26 ' + (4 + w * 2) + ' -40 M' + x + ' ' + y + ' q' + (10 + w) + ' -20 ' + (18 + w * 2) + ' -30" stroke="' + mxb('#2A8442', '#2A201C', dk) + '" stroke-width="5" fill="none" stroke-linecap="round"/>'; }
  s += '<path d="M-20 1548 Q300 1516 600 1552 T1100 1540 V1920 H-20 Z" fill="' + mxb('#2E9A4A', '#30241E', dk) + '" stroke="' + mxb('#7FE08A', '#5A4034', dk) + '" stroke-width="6"/>';
  if (!old) for (let i = 0; i < 9; i++) s += '<circle cx="' + (60 + i * 118 + 30 * rnd(i)) + '" cy="' + (1610 + 120 * rnd(i + 7)) + '" r="9" fill="' + ['#FFE14D', '#FF6BD6', '#fff'][i % 3] + '" opacity="' + (1 - .7 * dk) + '"/>';
  return s; }

// Huhn. Ursprung an den Fuessen, schaut nach links. o: peck (Kopf nach unten 0 bis 1), flap, flip, op, col
function chickb(x, y, s, t, o) { o = o || {}; const pk = 55 * cl(o.peck || 0), fl = (o.flap || 0) * 30 * Math.sin(t * 22), col = o.col || '#FFFFFF', K = 'stroke="#0B1020" stroke-width="5" stroke-linejoin="round"';
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + (o.flip ? -s : s) + ' ' + s + ')" opacity="' + (o.op === undefined ? 1 : o.op) + '">'
    + '<path d="M-16 -44 L-20 -2 M-20 -2 l-18 6 M-20 -2 l2 10 M-20 -2 l14 6 M18 -44 L16 -2 M16 -2 l-18 6 M16 -2 l2 10 M16 -2 l14 6" stroke="#FF9A3D" stroke-width="8" fill="none" stroke-linecap="round"/>'
    + '<path d="M62 -118 Q128 -190 112 -112 Q142 -128 108 -78 Z" fill="' + col + '" ' + K + '/>'
    + '<ellipse cx="8" cy="-96" rx="82" ry="62" fill="' + col + '" ' + K + '/>'
    + '<g transform="rotate(' + (-pk) + ' -34 -110)"><path d="M-66 -150 Q-40 -110 -8 -128 L-30 -176 Z" fill="' + col + '"/><circle cx="-64" cy="-182" r="12" fill="#FF4D4D" transform="translate(-6 -30)"/><circle cx="-62" cy="-216" r="13" fill="#FF4D4D"/><circle cx="-46" cy="-208" r="11" fill="#FF4D4D"/>'
    + '<circle cx="-62" cy="-180" r="34" fill="' + col + '" ' + K + '/><path d="M-92 -188 L-128 -176 L-92 -166 Z" fill="#FF9A3D" ' + K + '/><ellipse cx="-84" cy="-150" rx="8" ry="14" fill="#FF4D4D"/><circle cx="-74" cy="-186" r="6" fill="#0B1020"/></g>'
    + '<g transform="rotate(' + fl + ' -10 -110)"><path d="M-14 -112 Q34 -150 78 -100 Q36 -56 -10 -84 Z" fill="#E3E8F4" ' + K + '/></g></g>'; }

// Raubsaurier (eigene Zeichnung). Ursprung an den Fuessen, schaut nach links. o: jaw (Maul 0 bis 1), feath (Federn 0 bis 1), wing (Fluegel 0 bis 1), run, flip, op, sit, col
function raptb(x, y, s, t, o) { o = o || {}; const jw = 26 * cl(o.jaw || 0), fe = cl(o.feath || 0), wg = cl(o.wing || 0), run = o.run ? Math.sin(t * 20) : 0, sit = cl(o.sit || 0), c1 = o.col || '#E8823A', c2 = o.col2 || '#B5562A', K = 'stroke="#0B1020" stroke-width="5" stroke-linejoin="round"';
  let g = '<g transform="translate(' + x + ' ' + (y + 46 * sit) + ') scale(' + (o.flip ? -s : s) + ' ' + s + ')" opacity="' + (o.op === undefined ? 1 : o.op) + '">';
  g += '<path d="M60 -168 Q210 -206 300 -140 Q200 -136 70 -108 Z" fill="' + c1 + '" ' + K + '/>';
  if (fe > 0) for (let i = 0; i < 4; i++) g += '<path transform="translate(296 -140) rotate(' + (-50 + i * 30) + ') scale(' + fe + ')" d="M0 0 Q30 -14 62 0 Q30 14 0 0 Z" fill="' + ['#5CE1FF', '#2E8BFF'][i % 2] + '" ' + K + '/>';
  // hinteres Bein
  g += '<path d="M40 -112 L' + (64 + 20 * run) + ' ' + (-52 + 30 * sit) + ' L' + (40 + 34 * run) + ' ' + (-4 * (1 - sit)) + ' l-34 2" stroke="' + c2 + '" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  g += '<ellipse cx="0" cy="-146" rx="98" ry="64" fill="' + c1 + '" ' + K + '/><path d="M-70 -116 Q0 -76 76 -112 Q10 -92 -70 -116 Z" fill="#FFE2B8" opacity=".85"/>';
  // Hals und Kopf
  g += '<path d="M-52 -188 Q-96 -250 -112 -286 L-170 -258 Q-126 -196 -86 -128 Z" fill="' + c1 + '" ' + K + '/>';
  if (fe > 0) for (let i = 0; i < 3; i++) g += '<path transform="translate(' + (-128 + i * 14) + ' ' + (-306 + i * 6) + ') rotate(' + (-110 + i * 24) + ') scale(' + fe + ')" d="M0 0 Q22 -10 46 0 Q22 10 0 0 Z" fill="' + ['#2E8BFF', '#5CE1FF', '#2E8BFF'][i] + '" ' + K + '/>';
  g += '<g transform="rotate(' + jw + ' -130 -262)"><path d="M-130 -262 L-232 -246 Q-240 -232 -226 -226 L-128 -236 Z" fill="' + c2 + '" ' + K + '/><path d="M-214 -246 l6 -13 l6 12 M-190 -250 l6 -13 l6 12 M-166 -254 l6 -13 l6 12" fill="#fff" stroke="#0B1020" stroke-width="3" stroke-linejoin="round"/></g>';
  g += '<path d="M-106 -310 Q-190 -318 -240 -280 Q-246 -262 -232 -258 L-124 -256 Q-96 -276 -106 -310 Z" fill="' + c1 + '" ' + K + '/><path d="M-222 -260 l6 14 l6 -13 M-198 -258 l6 14 l6 -13 M-174 -257 l6 14 l6 -13 M-150 -256 l6 14 l6 -13" fill="#fff" stroke="#0B1020" stroke-width="3" stroke-linejoin="round"/><circle cx="-146" cy="-290" r="11" fill="#FFE14D" stroke="#0B1020" stroke-width="4"/><circle cx="-149" cy="-290" r="4.5" fill="#0B1020"/><circle cx="-226" cy="-282" r="4" fill="#0B1020"/>';
  // vorderes Bein
  g += '<ellipse cx="-12" cy="' + (-104 + 16 * sit) + '" rx="40" ry="50" fill="' + c1 + '" ' + K + '/><path d="M-14 -70 L' + (10 - 22 * run) + ' ' + (-38 + 24 * sit) + ' L' + (-16 - 36 * run) + ' ' + (-4 * (1 - sit)) + ' l-40 2 M' + (-16 - 36 * run) + ' ' + (-4 * (1 - sit)) + ' l-26 -14" stroke="' + c1 + '" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  // Arm, mit Federn wird er zum Fluegel
  if (wg > 0) g += '<g transform="translate(-40 -160) rotate(' + (-18 + 26 * Math.sin(t * 18) * wg) + ')"><path d="M0 0 Q-60 -90 -150 -70 Q-110 -40 -120 -10 Q-80 -24 -70 14 Q-40 -8 0 22 Z" fill="#5CE1FF" ' + K + ' transform="scale(' + wg + ')"/></g>';
  g += '<path d="M-58 -150 l-36 30 l-16 -6 M-94 -120 l-10 14" stroke="' + c2 + '" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  if (fe > 0 && wg < 1) for (let i = 0; i < 4; i++) g += '<path transform="translate(' + (-66 - i * 9) + ' ' + (-142 + i * 8) + ') rotate(' + (66 + i * 12) + ') scale(' + (fe * (1 - wg)) + ')" d="M0 0 Q26 -12 54 0 Q26 12 0 0 Z" fill="' + ['#5CE1FF', '#2E8BFF'][i % 2] + '" ' + K + '/>';
  return g + '</g>'; }

// Kleiner Vogel im Flug
function birdb(x, y, s, t, col, ph) { const f = Math.sin(t * 16 + (ph || 0)); return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')"><path d="M-10 0 Q-60 ' + (-70 * f - 10) + ' -110 ' + (-30 * f) + ' Q-60 ' + (-20 * f + 10) + ' -10 14 Z" fill="' + (col || '#FFD23F') + '" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><ellipse cx="0" cy="6" rx="46" ry="26" fill="' + (col || '#FFD23F') + '" stroke="#0B1020" stroke-width="5"/><path d="M40 0 L70 6 L40 14 Z" fill="#FF8A3D" stroke="#0B1020" stroke-width="4" stroke-linejoin="round"/><circle cx="26" cy="0" r="5" fill="#0B1020"/><path d="M-44 4 L-76 -6 L-70 16 Z" fill="' + (col || '#FFD23F') + '" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M6 2 Q40 ' + (-74 * f - 10) + ' 86 ' + (-34 * f) + ' Q40 ' + (-24 * f + 10) + ' 6 16 Z" fill="#FFB020" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/></g>'; }

// Krokodil, schaut nach links
function crocb(x, y, s, t, o) { o = o || {}; const jw = 14 * cl(o.jaw || 0), K = 'stroke="#0B1020" stroke-width="5" stroke-linejoin="round"';
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" opacity="' + (o.op === undefined ? 1 : o.op) + '"><path d="M90 -52 Q200 -70 268 -' + (30 + 6 * Math.sin(t * 3)) + ' Q190 -24 96 -18 Z" fill="#8A7440" ' + K + '/><path d="M-60 -18 l-10 18 l-20 0 M60 -18 l10 18 l20 0" stroke="#6A5630" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="0" cy="-40" rx="112" ry="34" fill="#8A7440" ' + K + '/>'
    + '<path d="M-60 -70 l10 -14 l10 14 M-30 -73 l10 -14 l10 14 M0 -74 l10 -14 l10 14 M30 -73 l10 -14 l10 14" fill="#6A5630" ' + K + '/>'
    + '<g transform="rotate(' + jw + ' -100 -34)"><path d="M-96 -36 L-232 -30 Q-240 -20 -228 -16 L-96 -16 Z" fill="#6A5630" ' + K + '/></g><path d="M-92 -66 Q-150 -66 -232 -44 Q-240 -34 -228 -30 L-96 -30 Z" fill="#8A7440" ' + K + '/><path d="M-216 -32 l5 11 l5 -11 M-190 -32 l5 11 l5 -11 M-164 -32 l5 11 l5 -11 M-138 -32 l5 11 l5 -11" fill="#fff" stroke="#0B1020" stroke-width="3" stroke-linejoin="round"/><circle cx="-118" cy="-58" r="10" fill="#FFE14D" stroke="#0B1020" stroke-width="4"/><circle cx="-120" cy="-58" r="4" fill="#0B1020"/></g>'; }

// Staubwolke bei einer Verwandlung. k 0 bis 1
function puffb(x, y, k, r) { if (k <= 0 || k >= 1) return ''; let s = ''; for (let i = 0; i < 9; i++) { const a = i * .698 + .3, d = (r || 150) * (.35 + .75 * ease(k)); s += '<circle cx="' + (x + d * Math.cos(a)).toFixed(1) + '" cy="' + (y + d * Math.sin(a) * .8).toFixed(1) + '" r="' + (46 * (1 - k) + 14).toFixed(1) + '" fill="#fff" opacity="' + (.95 * (1 - k)).toFixed(2) + '"/>'; } return s + '<circle cx="' + x + '" cy="' + y + '" r="' + ((r || 150) * .8 * (1 - k)) + '" fill="#fff" opacity="' + (1 - k) + '"/>'; }

const CB = [600, 1118]; // Platz des Tiers in der Bildmitte

// ---------- Einstieg ----------
// Gag aus dem Objekt: Beim Nachsatz "mit dem T. rex verwandt" verwandelt sich das Huhn in einen grossen Raubsaurier und bruellt (Einschlag bei 0,5 s).
// Schalti rennt vorn an ihm vorbei rechts aus dem Bild, der Saurier hinterher. Schalti kommt links wieder herein, von rechts trottet wieder das Huhn zurueck.
WORLD.h7b1_3 = function (sc, ev, t, lt) { const e = ev.gag, hit = e !== undefined && e >= .5 ? e - .5 : undefined, sh = shake7(hit, t), look = since3(sc, 3, lt) >= 0;
  let s = yardb(t, {});
  if (e === undefined) s += chickb(CB[0], CB[1], 1.15, t, { peck: look ? 0 : Math.max(0, Math.sin(t * 5.2)) * (Math.sin(t * 1.3) > -.2 ? 1 : 0) });
  else if (e < 2.2) { const k = cl((e - .2) / .3), gx = e < 1.15 ? CB[0] : lerp(CB[0], 1560, cl((e - 1.15) / .8));
    if (e < .4) s += chickb(CB[0] + 6 * Math.sin(t * 60), CB[1], 1.15 + .5 * cl(e / .4), t, { flap: 1 });
    if (k > 0) s += raptb(gx, CB[1] - (e >= 1.15 ? 14 * Math.abs(Math.sin(t * 20)) : 0), 1.25 * back(k), t, { jaw: e < 1.15 ? .5 + .5 * Math.abs(Math.sin(t * 26)) : .4, run: e >= 1.15, flip: e >= 1.15 });
    s += puffb(CB[0], CB[1] - 200, (e - .2) / .5, 230);
  } else { const k = ease(cl((e - 2.3) / .9)); s += chickb(lerp(1260, CB[0], k), CB[1] - (k < 1 ? 10 * Math.abs(Math.sin(t * 18)) : 0), 1.15, t, {}); }
  if (hit !== undefined && hit < 1.2) s += word7('RAWR!', 700, 770, hit, '#FFE14D', 6);
  return W('<g transform="translate(' + (sh[0] * .6) + ' ' + (sh[1] * .6) + ')">' + s + '</g>' + shade3()); };
WMASC.h7b1_3 = (ev, t, lt, sc) => { const e = ev.gag;
  if (e === undefined) return since3(sc, 3, lt) < 0 ? stay3(HOME3, 1, { r: -2 + 2 * Math.sin(t * 2) }) : stay3([lerp(220, 280, ease(cl(since3(sc, 3, lt) / .5))), 1537], 1, { r: 9 });
  if (e < .5) return stay3([lerp(280, 220, cl(e / .3)), 1537], 1, { r: -14 * cl(e / .3) });
  if (e < 1.0) return stay3([220 + 6 * Math.sin(t * 40), 1537], 1, { r: -12 + 4 * Math.sin(t * 34) });
  return flee3(e, t, 1.0, 1.75, 2.35, 3.05); };

// ---------- Teil 1: vom Raubsaurier zum Vogel. Das Huhn in der Bildmitte verwandelt sich Schritt fuer Schritt ----------
const snapb = ev => ev.p2 === undefined ? 0 : Math.max(0, Math.sin(Math.PI * cl((ev.p2 - 1.5) / .5)));
WORLD.b1a_3 = function (sc, ev, t, lt) { const pa = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act;
  let s = yardb(t, {});
  const mk = pa === undefined ? 0 : cl((pa - .35) / .5); // Huhn -> Saurier
  if (a === undefined || a < 1.5) { if (mk < .5) s += chickb(CB[0], CB[1], 1.15 * (1 - .4 * mk * 2), t, { peck: pa === undefined ? Math.max(0, Math.sin(t * 5.2)) : 0 });
    if (mk > .3) { const sh = a === undefined ? 1 : 1 - .45 * ease(cl(a / 1.2)), sn = snapb(ev);
      if (p2 !== undefined) { const nk = back(cl(p2 / .4)) * (a === undefined ? 1 : 1 - cl(a / .4)); s += '<g transform="translate(' + (CB[0] + 20) + ' ' + (CB[1] + 6) + ') scale(' + nk + ')"><ellipse cx="0" cy="0" rx="150" ry="40" fill="#8B5E3C" stroke="#0B1020" stroke-width="5"/><path d="M-140 -6 q30 -22 60 0 q30 -22 60 0 q30 -22 60 0 q30 -22 60 0" stroke="#C9A36A" stroke-width="7" fill="none" stroke-linecap="round"/>' + [-86, -30, 30].map(x => '<ellipse cx="' + x + '" cy="-22" rx="26" ry="34" fill="#FFF5DC" stroke="#0B1020" stroke-width="5"/>').join('') + '</g>'; }
      s += raptb(CB[0] - 60 * sn, CB[1] - 4, 1.0 * back(cl((mk - .3) / .5)) * sh, t, { feath: p1 === undefined ? 0 : back(cl(p1 / .5)), sit: p2 === undefined || a !== undefined ? 0 : ease(cl(p2 / .5)) * (1 - sn), jaw: sn, wing: a === undefined ? 0 : ease(cl((a - .5) / .8)) }); }
    s += puffb(CB[0], CB[1] - 130, pa === undefined ? -1 : (pa - .35) / .55, 170);
  }
  if (a !== undefined && a >= 1.3) { const k = ease(cl((a - 1.3) / 1.2)); s += puffb(CB[0], CB[1] - 110, (a - 1.3) / .5, 130) + birdb(lerp(CB[0], 660, k) + 50 * Math.sin(t * 1.4) * k, lerp(CB[1] - 110, 840, k) + 14 * Math.sin(t * 2.3), 1.25, t, '#5CE1FF'); }
  if (p2 !== undefined && a === undefined) s += chip3(800, 760, 'hohle Knochen', 38, '#F4F6FB', '#0B1020', (p2 - .5) / .3);
  return W(s + shade3(), slot(ev, [['panel', 'Die Vorfahren: kleine Raubsaurier'], ['p1', 'Federn gab es schon vor den Vögeln', 'hot'], ['p2', 'Hohle Knochen, Brüten auf dem Nest'], ['act', 'Kleiner, leichter, Flügel', 'hot']])); };
// Schalti schleicht zum Nest, der Saurier schnappt nach ihm, er springt zurueck
WMASC.b1a_3 = (ev, t) => { const p2 = ev.p2; if (p2 === undefined || ev.act !== undefined) return ev.act !== undefined ? stay3(HOME3, 1, { r: -7 + 2 * Math.sin(t * 2) }) : BIG3();
  if (p2 < .9) return BIG3(); if (p2 < 1.5) return stay3([lerp(220, 330, ease((p2 - .9) / .6)), 1537 - 8 * Math.abs(Math.sin(t * 12))], 1, { r: 10 });
  if (p2 < 2.0) return hop3((p2 - 1.5) / .5, [330, 1537], HOME3, 80, 1, 1, { r: -16 }); return stay3([220 + 4 * Math.sin(t * 34) * cl(1 - (p2 - 2) / .5), 1537], 1); };

// ---------- Teil 2: der Baum auf dem Hof als Stammbaum ----------
const TB = { A: [540, 1056], B: [706, 952], c: [250, 936], r: [560, 838], h: [872, 858] };
function treeb(t, k, hot) { const d1 = 'M540 1150 L540 1056', d2 = 'M540 1056 Q400 1010 250 942', d3 = 'M540 1056 Q640 1010 706 952', d4 = 'M706 952 Q640 900 560 846', d5 = 'M706 952 Q800 920 872 866';
  const st = (d, w, q, col) => '<path d="' + d + '" stroke="' + (col || '#6B4226') + '" stroke-width="' + w + '" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="' + (1 - cl(q)) + '"/>';
  let s = ''; const lf = (x, y, r, q) => '<circle cx="' + (x + 4 * Math.sin(t * 1.2 + x)) + '" cy="' + y + '" r="' + (r * back(cl(q))) + '" fill="#1F7A3E" opacity=".9"/><circle cx="' + (x - r * .5 + 4 * Math.sin(t * 1.4 + x)) + '" cy="' + (y + r * .3) + '" r="' + (r * .7 * back(cl(q))) + '" fill="#2A9450" opacity=".9"/>';
  s += lf(200, 870, 74, (k - .5) / .3) + lf(540, 760, 80, (k - .7) / .3) + lf(900, 780, 78, (k - .7) / .3) + lf(720, 830, 60, (k - .6) / .3);
  s += st(d1, 54, k / .25) + st(d2, 30, (k - .25) / .35) + st(d3, 34, (k - .25) / .25) + st(d4, 26, (k - .5) / .3) + st(d5, 26, (k - .5) / .3);
  if (hot > 0) s += st(d4, 12, hot, '#FFE14D') + st(d5, 12, hot, '#FFE14D') + '<circle cx="706" cy="952" r="' + (20 + 5 * Math.sin(t * 8)) + '" fill="#FFE14D" stroke="#0B1020" stroke-width="5" opacity="' + cl(hot * 2) + '"/>';
  return s; }
WORLD.b1b_3 = function (sc, ev, t, lt) { const pa = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act;
  let s = yardb(t, { part: 2 }) + treeb(t, cl((lt - .3) / 1.1), p2 === undefined ? 0 : cl((p2 - 1.2) / .6));
  if (p1 !== undefined) { const k = cl(p1 / .6); s += '<rect x="452" y="676" width="486" height="208" rx="54" fill="#A8E63C" fill-opacity="' + (.16 * k) + '" stroke="#A8E63C" stroke-width="9" stroke-dasharray="26 16" stroke-dashoffset="' + (-t * 30) + '" opacity="' + k + '"/>'; }
  if (p2 !== undefined) s += crocb(TB.c[0] + 40, TB.c[1] + 4, .62 * back(cl(p2 / .4)), t, { jaw: a === undefined ? Math.abs(Math.sin(t * 5)) : 0 });
  if (p1 !== undefined) { const roar = p1 > .5 && p1 < 1.5 ? 1 : 0; s += raptb(TB.r[0] + 30, TB.r[1] + 2, .46 * back(cl((p1 - .2) / .4)), t, { jaw: roar ? .5 + .5 * Math.abs(Math.sin(t * 24)) : 0 }); }
  const hk = back(cl((lt - 1.2) / .4)), hj = a === undefined ? 0 : 60 * Math.abs(Math.sin(Math.PI * cl(a / .5))) + (a > .5 ? 8 * Math.abs(Math.sin(t * 9)) : 0);
  if (a !== undefined) for (let i = 0; i < 2; i++) { const c = (t * .9 + i / 2) % 1; s += '<circle cx="' + (TB.h[0] + 6) + '" cy="' + (TB.h[1] - 70) + '" r="' + (80 + 60 * c) + '" fill="none" stroke="#FFE14D" stroke-width="8" opacity="' + (.8 * (1 - c) * cl(a / .4)) + '"/>'; }
  s += chickb(TB.h[0] + 6, TB.h[1] - hj, .62 * hk, t, { flap: a !== undefined && a < .6 ? 1 : 0 });
  if (p2 !== undefined && a === undefined) s += chip3(706, 1034, 'eng verwandt', 36, '#FFE14D', '#0B1020', (p2 - 1.6) / .3);
  if (a !== undefined) s += chip3(690, 1090, 'lebender Dinosaurier', 38, '#A8E63C', '#0B1020', (a - .4) / .3);
  return W(s + shade3(), slot(ev, [['panel', 'Mehr als nur verwandt'], ['p1', 'Diese Äste: Dinosaurier', 'hot'], ['p2', 'T. rex und Huhn: gleiche Astgabel'], ['act', 'Dein Huhn: ein Dinosaurier', 'hot']])); };
// Der T. rex bruellt vom Ast herunter, Schalti zuckt zurueck. Beim Krokodil haelt er Abstand
WMASC.b1b_3 = (ev, t) => { const p1 = ev.p1; if (p1 !== undefined && p1 > .5 && p1 < 1.5 && ev.p2 === undefined) return stay3([200 + 5 * Math.sin(t * 38), 1537], 1, { r: -14 + 3 * Math.sin(t * 30) });
  if (ev.p2 !== undefined && ev.act === undefined) return stay3(HOME3, 1, { r: 6 * Math.sin(t * 2.4) }); return ev.act !== undefined ? stay3([220, 1537 - 26 * Math.abs(Math.sin(Math.PI * cl(ev.act / .5)))], 1, { r: 5 }) : BIG3(); };

// ---------- Teil 3: derselbe Ort vor 66 Millionen Jahren. Einschlag, Dunkelheit, die Voegel bleiben, dann wieder heute ----------
const impb = (sc) => Math.max(1.2, dur3(sc, 0) - .7); // der Einschlag kommt mit den letzten Worten des ersten Satzes
WORLD.b1c_3 = function (sc, ev, t, lt) { const pa = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, ti = impb(sc), hit = pa !== undefined && pa >= ti ? pa - ti : undefined, sh = shake7(hit, t);
  const dark = hit === undefined ? 0 : a === undefined ? ease(cl(hit / 1.0)) : 1 - ease(cl(a / .8));
  let s = yardb(t, { old: 1, dark: dark });
  // Asteroid
  if (pa !== undefined && hit === undefined) { const k = cl((pa - (ti - .9)) / .9), ax = lerp(1160, 470, k * k), ay = lerp(520, 990, k * k); if (k > 0) s += '<path d="M' + ax + ' ' + ay + ' L' + (ax + 260) + ' ' + (ay - 178) + '" stroke="#FFB03D" stroke-width="34" stroke-linecap="round" opacity=".55"/><path d="M' + ax + ' ' + ay + ' L' + (ax + 170) + ' ' + (ay - 116) + '" stroke="#FFF1C4" stroke-width="18" stroke-linecap="round"/><circle cx="' + ax + '" cy="' + ay + '" r="30" fill="#6B5A52" stroke="#0B1020" stroke-width="5"/><circle cx="' + (ax - 8) + '" cy="' + (ay - 6) + '" r="8" fill="#4A3C36"/>'; }
  if (hit !== undefined && a === undefined) { s += '<ellipse cx="470" cy="1010" rx="' + (200 + 500 * ease(cl(hit / .8))) + '" ry="' + (60 + 150 * ease(cl(hit / .8))) + '" fill="#FFB03D" opacity="' + (.55 * (1 - cl(hit / 2.5)) + .12) + '"/>'; for (let i = 0; i < 5; i++) { const c = (t * .25 + i / 5) % 1; s += '<circle cx="' + (380 + i * 50 + 30 * Math.sin(t + i)) + '" cy="' + (990 - 260 * c) + '" r="' + (40 + 70 * c) + '" fill="#2A2020" opacity="' + (.5 * (1 - c) * cl(hit / .6)) + '"/>'; } }
  // der grosse Saurier und der kleine Vogel
  const gone = p2 === undefined ? 0 : ease(cl(p2 / 1.2));
  if (a === undefined || a < .4) { if (gone < 1) s += '<g style="filter:grayscale(' + gone + ')">' + raptb(520, CB[1] + 40 * gone, 1.0, t, { op: 1 - gone, jaw: hit !== undefined && hit < 1 ? .8 : 0, col: '#8A6A4A', col2: '#6A4E36' }) + '</g>';
    const bk = p2 === undefined ? 0 : ease(cl((p2 - .8) / .9)); s += chickb(lerp(880, 640, bk), CB[1] + 6 - (bk > 0 && bk < 1 ? 16 * Math.abs(Math.sin(t * 16)) : 0), lerp(.42, .62, bk), t, { col: '#C9A36A' }); }
  else { s = wipe3(s, yardb(t, {}) + chickb(830, CB[1], 1.0, t, { peck: Math.max(0, Math.sin(t * 5.2)) }), a - .4, .6, '#A8E63C'); }
  // drei von vier Tierarten sterben aus
  if (p1 !== undefined && p2 === undefined) ['🦖', '🦕', '🐙', '🐦'].forEach((em, i) => { const k = back(cl((p1 - i * .08) / .3)), x = 250 + i * 180, dead = i < 3 ? cl((p1 - .9 - i * .25) / .3) : 0;
    s += '<g transform="translate(' + x + ' 800) scale(' + k + ')"><circle r="74" fill="' + (dead > .5 ? '#3A3A44' : '#F4F6FB') + '" stroke="#0B1020" stroke-width="6"/><text y="34" text-anchor="middle" font-size="92" font-family="Noto Color Emoji" opacity="' + (1 - .65 * dead) + '">' + em + '</text>' + (dead > 0 ? '<path d="M-52 -52 L' + (-52 + 104 * dead) + ' ' + (-52 + 104 * dead) + ' M52 -52 L' + (52 - 104 * dead) + ' ' + (-52 + 104 * dead) + '" stroke="#FF4D4D" stroke-width="16" stroke-linecap="round"/>' : '') + (i === 3 && p1 > 1.8 ? '<circle r="' + (84 + 6 * Math.sin(t * 8)) + '" fill="none" stroke="#A8E63C" stroke-width="9"/>' : '') + '</g>'; });
  // heute: rund 11.000 Vogelarten
  if (a !== undefined && a > .9) { const n = Math.round(11000 * ease(cl((a - .9) / 1.1)) / 100) * 100, k = back(cl((a - .9) / .3));
    for (let i = 0; i < 9; i++) { const c = ((t * (.16 + .07 * rnd(i + 5)) + rnd(i + 9)) % 1); s += birdb(-120 + 1320 * c, 690 + 250 * rnd(i + 31) + 18 * Math.sin(t * 2 + i), .34 + .3 * rnd(i + 51), t, ['#FFD23F', '#FF6B6B', '#5CE1FF', '#fff'][i % 4], i); }
    s += '<g transform="translate(520 860) scale(' + k + ')">' + svgT(0, 0, n.toLocaleString('de-DE'), 150, '#fff').replace('<text', '<text stroke="#0B1020" stroke-width="22" stroke-linejoin="round" paint-order="stroke"') + '</g>' + chip3(520, 940, 'Vogelarten', 46, '#A8E63C', '#0B1020', (a - 1.3) / .3); }
  const fl = hit === undefined ? 0 : 1 - cl(hit / .35);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + (fl > 0 ? '<rect width="1080" height="1920" fill="#fff" opacity="' + (.85 * fl) + '"/>' : '') + shade3(), slot(ev, [['panel', 'Vor 66 Millionen Jahren'], ['p1', 'Drei von vier Arten: weg', 'red'], ['p2', 'Übrig von den Dinos: ein paar Vögel', 'hot'], ['act', 'Heute: rund 11.000 Vogelarten', 'hot']])); };
// Der Einschlag wirft Schalti fast um: er taumelt, am Ende des Satzes
WMASC.b1c_3 = (ev, t, lt, sc) => { const pa = ev.panel, ti = impb(sc); if (pa !== undefined && pa >= ti && pa < ti + 1.1 && ev.p1 === undefined) { const h = pa - ti; return stay3([220 + 8 * Math.sin(t * 42) * (1 - h / 1.1), 1537 - 30 * Math.abs(Math.sin(Math.PI * cl(h / .4)))], 1, { r: -18 * (1 - h / 1.1) + 5 * Math.sin(t * 30) }); }
  if (ev.p2 !== undefined && ev.act === undefined) return stay3(HOME3, 1, { r: 7 }); return ev.act !== undefined ? stay3(HOME3, 1, { r: -6 + 2 * Math.sin(t * 2) }) : BIG3(); };

// ---------- Schluss: der Hof, das Huhn pickt ----------
WORLD.b1outro_3 = function (sc, ev, t) { return W(yardb(t, {}) + '<rect width="1080" height="1920" fill="#02030F" opacity=".38"/>' + chickb(840, 1520, .8, t, { peck: Math.max(0, Math.sin(t * 5.2)) * (Math.sin(t * 1.3) > -.2 ? 1 : 0) }) + shade3()); };
['h7b1_3', 'b1a_3', 'b1b_3', 'b1c_3', 'b1outro_3'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
