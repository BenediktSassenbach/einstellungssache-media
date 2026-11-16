// B001D "Sind Voegel wirklich Dinosaurier?" nach dem Dino-Skript (Fach Bio, 16.11.2026): komplette Neufassung von B001V3.
// Gezeichnete Figuren mit Gelenken aus viz_dino.js (Look Cartoon), Hof aus viz_b001v3.js (yardb, treeb, crocb, birdb, puffb).
// In jeder Szene spielt Schalti mit den Tieren. Zum Loeschen dieser Fassung: diese Datei und videos/B001D.
const DB = [600, 1118];
const RAPD = { a: '#3FA9F5', b: '#1E6FC2', be: '#EAF6FF', sp: '#1B5DA8' }; // kleiner Raubsaurier: blau, damit er sich vom Gruen abhebt
// Hof mit Tiefe und Requisiten. o wie yardb, dazu props: 0 = ohne
function yardD(t, o) { o = o || {}; const dk = cl(o.dark || 0); let s = yardb(t, o);
  s += '<defs><linearGradient id="yDd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04240F" stop-opacity="0"/><stop offset="1" stop-color="#04240F" stop-opacity=".5"/></linearGradient><radialGradient id="yDs"><stop offset="0" stop-color="#FFF6C8" stop-opacity=".55"/><stop offset="1" stop-color="#FFF6C8" stop-opacity="0"/></radialGradient></defs><rect y="1050" width="1080" height="870" fill="url(#yDd)"/><circle cx="880" cy="740" r="420" fill="url(#yDs)" opacity="' + (.5 * (1 - dk)) + '"/>';
  if (!o.old && o.props !== 0) { // Sonnenblumen am Zaun (wiegen sich), Heuballen, Futtertrog, Koerner
    for (const [x, h, ph] of (o.part === 2 ? [[1010, 160, 2.2]] : [[950, 150, 0], [1004, 118, 1.3]])) { const w = 5 * Math.sin(t * 1.3 + ph); s += '<path d="M' + x + ' 1040 Q' + (x + w) + ' ' + (1040 - h / 2) + ' ' + (x + w * 2) + ' ' + (1040 - h) + '" stroke="#1F7A3E" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="' + (x + w + 16) + '" cy="' + (1040 - h * .5) + '" rx="20" ry="9" fill="#2A9450" transform="rotate(-24 ' + (x + w + 16) + ' ' + (1040 - h * .5) + ')"/>'; for (let i = 0; i < 10; i++) s += '<ellipse cx="' + (x + w * 2) + '" cy="' + (1040 - h - 30) + '" rx="9" ry="20" fill="#FFD23F" stroke="#0B1020" stroke-width="3" transform="rotate(' + (i * 36) + ' ' + (x + w * 2) + ' ' + (1040 - h) + ')"/>'; s += '<circle cx="' + (x + w * 2) + '" cy="' + (1040 - h) + '" r="17" fill="#6B4226" stroke="#0B1020" stroke-width="4"/>'; }
    if (o.part !== 2) s += '<g transform="translate(-150 0)"><rect x="880" y="1010" width="150" height="74" rx="14" fill="#E8C766" stroke="#0B1020" stroke-width="5"/><path d="M894 1030 H1016 M894 1050 H1016 M894 1068 H1016" stroke="#C9A441" stroke-width="5"/><rect x="930" y="954" width="110" height="60" rx="12" fill="#F0D27A" stroke="#0B1020" stroke-width="5"/><path d="M942 972 H1028 M942 992 H1028" stroke="#C9A441" stroke-width="5"/></g>';
    if (o.part !== 2) s += '<g transform="translate(-100 0)"><path d="M330 1066 L350 1108 H470 L490 1066 Z" fill="#8B5E3C" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M338 1070 H482" stroke="#6FC3F0" stroke-width="10" stroke-linecap="round"/></g>';
    for (let i = 0; i < 12; i++) s += '<circle cx="' + (300 + 300 * rnd(i + 61)).toFixed(0) + '" cy="' + (1126 + 34 * rnd(i + 77)).toFixed(0) + '" r="4" fill="#F2D06B"/>'; }
  if (o.low !== 0) s += lowD(t, o.old ? 1 : 0);
  return s; }
const peckD = t => Math.max(0, Math.sin(t * 5.2)) * (Math.sin(t * 1.3) > -.2 ? 1 : 0);

// ---------- Einstieg ----------
// Das Auge bekommt sofort etwas: Schon beim ersten Satz wird das Huhn (am Trog) zum T. rex. Er wundert sich ueber seine Aermchen,
// dreht sich um, laeuft nach rechts zum Heu, frisst davon, dreht sich wieder um und laeuft ein Stueck nach links. Er laeuft nie auf der Stelle:
// die Schritte haengen am zurueckgelegten Weg. Schalti bemerkt er nicht.
// Erst beim Nachsatz stutzt er, sieht Schalti, bruellt (Einschlag bei 0,5 s), stapft auf ihn zu, senkt den Kopf und schnappt.
// Schalti rennt rechts aus dem Bild, der T. rex hinterher. Schalti kommt links wieder. Das Huhn kommt erst in Teil 1 zurueck.
const HX0 = 430, HX1 = 520, HX2 = 440, HM0 = .8, RXD = [HX2, 1118], stepD = (d, z) => d * Math.PI / (168 * z);
WORLD.h7dino = function (sc, ev, t, lt) { const e = ev.gag, hit = e !== undefined && e >= .5 ? e - .5 : undefined, sh = shake7(hit, t);
  let s = yardD(t, {});
  if (lt < HM0 + .2) s += hend(HX0 + (lt > HM0 - .3 ? 7 * Math.sin(t * 60) : 0), RXD[1], 1.25 + .6 * cl((lt - HM0 + .3) / .5), t, { peck: lt < HM0 - .3 ? peckD(t) : 0, flap: lt > HM0 - .3 ? 1 : 0 });
  const k = cl((lt - HM0 - .05) / .3);
  if (e === undefined && k > 0) { let x = HX0, o = {};
    const turn = (q, toRight) => ({ kx: Math.abs(Math.cos(Math.PI * q)) * .9 + .1, flip: toRight ? q > .5 : q <= .5 });
    if (lt < 2.2) o = { head: 20 + 8 * Math.sin(t * 7), jaw: lt < 1.6 ? .6 * Math.abs(Math.sin(t * 9)) : 0 };
    else if (lt < 2.6) o = turn((lt - 2.2) / .4, 1);
    else if (lt < 3.9) { const q = ease((lt - 2.6) / 1.3); x = lerp(HX0, HX1, q); o = { flip: 1, run: q < 1, ph: stepD(x - HX0, 1), head: 26 * cl((lt - 3.3) / .6) }; }
    else if (lt < 5.7) { x = HX1; const c = lt - 3.9; o = { flip: 1, head: 44 + 8 * Math.sin(t * 11), jaw: .3 + .3 * Math.sin(t * 11) };
      for (let i = 0; i < 6; i++) { const q = ((c * 1.6 + i / 6) % 1); s += '<path transform="translate(' + (836 + 70 * (rnd(i + 5) - .5) + 60 * q * (rnd(i + 9) - .5)) + ' ' + (980 - 90 * Math.sin(Math.PI * q)) + ') rotate(' + (360 * q + i * 50) + ')" d="M-14 0 H14" stroke="#F2D06B" stroke-width="6" stroke-linecap="round" opacity="' + (1 - q) + '"/>'; } }
    else if (lt < 6.1) { x = HX1; o = turn((lt - 5.7) / .4, 0); }
    else if (lt < 7.5) { const q = ease((lt - 6.1) / 1.4); x = lerp(HX1, HX2, q); o = { run: q < 1, ph: stepD(HX1 - x, 1), jaw: .2 + .2 * Math.sin(t * 9), head: 6 }; }
    else { x = HX2; o = { head: -8 + 6 * Math.sin(t * 2.4), jaw: lt < 8.3 ? .2 + .2 * Math.sin(t * 9) : 0 }; }
    s += rexd(x, RXD[1], 1.0 * back(k), t, o);
  } else if (e !== undefined && e < 2.9) { const ap = ease(cl((e - 1.1) / .6)), ch = cl((e - 1.95) / .85), cx = lerp(500, 1800, ch * ch * .4 + ch * .6), x = ch > 0 ? cx : lerp(RXD[0], 500, ap), y = lerp(RXD[1], 1200, ap), z = lerp(1.0, 1.25, ap);
    const snap = e >= 1.7 && e < 1.9 ? Math.sin(Math.PI * (e - 1.7) / .2) : 0, jaw = e < .5 ? 0 : e < 1.1 ? .75 + .25 * Math.abs(Math.sin(t * 24)) : ch > 0 ? .35 + .2 * Math.abs(Math.sin(t * 13)) : .12 + .88 * snap, head = e < .2 ? -16 * cl(e / .15) : e < .5 ? lerp(-16, 22, cl((e - .2) / .2)) : e < 1.1 ? 8 : ch > 0 ? 0 : 30 * ap + 8 * snap;
    if (e >= .5 && e < 1.1) s += roard(RXD[0] - 290, RXD[1] - 300, 96, t, cl((e - .5) / .15) * cl((1.1 - e) / .15));
    s += rexd(x, y, z, t, { jaw: jaw, head: head, run: ch > 0 || (ap > 0 && ap < 1), ph: ch > 0 ? stepD(cx - 500, 2.2) : stepD((x - RXD[0]) + (y - RXD[1]), 1.1), flip: ch > 0 });
  }
  s += puffb(HX0, RXD[1] - 220, (lt - HM0) / .5, 250);
  if (hit !== undefined && hit < 1.1) s += word7('RAWR!', 690, 1420, hit, '#FFE14D', -5);
  return W('<g transform="translate(' + (sh[0] * .6) + ' ' + (sh[1] * .6) + ')">' + s + '</g>' + shade3()); };
// Schalti: erschrickt bei der Verwandlung, redet dann weiter. Beim Nachsatz wird er entdeckt.
WMASC.h7dino = (ev, t, lt, sc) => { const e = ev.gag;
  if (e === undefined) { if (lt < HM0) return stay3(HOME3, 1, { r: -2 + 2 * Math.sin(t * 2) }); if (lt < HM0 + .7) { const q = (lt - HM0) / .7; return stay3([lerp(220, 170, ease(q)), 1537 - 40 * Math.sin(Math.PI * cl(q / .5))], 1, { r: -16 * Math.sin(Math.PI * q) }); }
    return since3(sc, 3, lt) < 0 ? stay3([lerp(170, 220, ease(cl((lt - HM0 - .7) / .6))), 1537], 1, { r: -3 + 2 * Math.sin(t * 2) }) : stay3([lerp(220, 270, ease(cl(since3(sc, 3, lt) / .5))), 1537], 1, { r: 9 }); }
  if (e < .5) return stay3([lerp(270, 220, cl(e / .3)), 1537], 1, { r: -14 * cl(e / .3) });
  if (e < 1.1) return stay3([lerp(220, 150, ease((e - .5) / .5)) + 5 * Math.sin(t * 44), 1537], 1, { r: -20 + 4 * Math.sin(t * 36) });
  if (e < 1.7) return stay3([lerp(150, 200, ease((e - 1.1) / .6)) + 2.5 * Math.sin(t * 50), 1537], 1, { r: -6 });
  if (e < 1.78) return stay3([200, 1537 - 60 * Math.sin(Math.PI * (e - 1.7) / .16)], 1, { r: -10 });
  return flee3(e, t, 1.78, 2.45, 2.95, 3.6); };

// ---------- Teil 1: vom Raubsaurier zum Vogel ----------
// Der Hintergrund wechselt mit Sinn: Das Huhn rennt auf den Hof zurueck. Mit der Verwandlung wischt die Szene in die Urzeit, auf eine nahe Lichtung mit Baumfarnen.
// Dort steht der kleine Raubsaurier gross im Bild, Farne hinter und vor ihm. Er bekommt Federn, setzt sich aufs Nest, bekommt Fluegel und hebt ab.
// Mit dem Abheben wischt die Szene zurueck zum Hof von heute, der Vogel landet auf dem Stalldach. Schalti schleicht zum Nest, der Saurier schnappt nach ihm.
const TA = [500, 1128], RA = [450, 1142], TAS = 1.27, TM = .95;
const snapD = ev => ev.p2 === undefined || ev.act !== undefined ? 0 : Math.max(0, Math.sin(Math.PI * cl((ev.p2 - 1.5) / .5)));
// Urzeit-Lichtung, nah. Gibt Hintergrund (b) und Vordergrund (f) zurueck
function urD(t) { let b = '<defs><linearGradient id="urS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A4FB8"/><stop offset=".72" stop-color="#F7C98A"/><stop offset="1" stop-color="#FFE9C4"/></linearGradient><linearGradient id="urG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#63B86C"/><stop offset=".3" stop-color="#3C9A5A"/><stop offset="1" stop-color="#1B5A36"/></linearGradient><radialGradient id="urL"><stop offset="0" stop-color="#FFF1C8" stop-opacity=".7"/><stop offset="1" stop-color="#FFF1C8" stop-opacity="0"/></radialGradient></defs><rect width="1080" height="1080" fill="url(#urS)"/>';
  b += '<circle cx="800" cy="880" r="360" fill="url(#urL)"/><circle cx="800" cy="880" r="62" fill="#FFF7DA"/>';
  b += '<path d="M-20 1000 L90 900 L190 960 L330 800 L372 800 L470 900 L600 950 L720 870 L860 960 L1100 900 V1040 H-20 Z" fill="#7D7FB4" opacity=".75"/><path d="M-20 1010 Q160 930 330 980 T700 960 T1100 990 V1050 H-20 Z" fill="#4C8A72"/>';
  for (let i = 0; i < 12; i++) { const x = 40 + i * 92 + 30 * rnd(i + 11), h = 46 + 30 * rnd(i + 23); b += '<path d="M' + x + ' 1012 l' + (h * .3) + ' -' + h + ' l' + (h * .3) + ' ' + h + ' Z" fill="#2E6B52"/>'; }
  b += '<path d="M-20 1016 Q260 996 560 1012 T1100 1004 V1920 H-20 Z" fill="url(#urG)"/>';
  b += ferntD(84, 1076, 300, t, 0) + ferntD(1004, 1066, 330, t, 3);
  for (const [x, y, l, c] of [[250, 1058, 110, '#2A9450'], [690, 1046, 90, '#1F7A3E'], [840, 1070, 120, '#2A9450']]) for (let i = 0; i < 5; i++) b += frondD(x, y, -150 + i * 30, l, t, c, i + x);
  for (const [x, y, r] of [[620, 1090, 26], [180, 1110, 20], [930, 1118, 30]]) b += '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (r * 1.5) + '" ry="' + r + '" fill="#8D8FA3" stroke="#0B1020" stroke-width="4"/><ellipse cx="' + (x - r * .4) + '" cy="' + (y - r * .35) + '" rx="' + (r * .5) + '" ry="' + (r * .25) + '" fill="#B9BBCB"/>';
  b += '<path d="M-20 1548 Q300 1516 600 1552 T1100 1540 V1920 H-20 Z" fill="#24754A" stroke="#6FD08A" stroke-width="6"/>';
  let f = ''; for (let i = 0; i < 4; i++) f += frondD(-10, 1170, -62 + i * 16, 230, t, i % 2 ? '#35A85C' : '#22874A', i); for (let i = 0; i < 4; i++) f += frondD(1090, 1170, -118 - i * 16, 240, t, i % 2 ? '#22874A' : '#35A85C', i + 5);
  for (const x of [706, 760, 822]) f += '<path d="M' + x + ' 1150 q' + (4 * Math.sin(t * 1.5 + x)) + ' -40 ' + (8 * Math.sin(t * 1.5 + x)) + ' -' + (70 + (x % 40)) + '" stroke="#0B1020" stroke-width="13" stroke-linecap="round" fill="none" opacity=".35"/><path d="M' + x + ' 1150 q' + (4 * Math.sin(t * 1.5 + x)) + ' -40 ' + (8 * Math.sin(t * 1.5 + x)) + ' -' + (70 + (x % 40)) + '" stroke="#3FB868" stroke-width="8" stroke-linecap="round" fill="none"/>';
  f += lowD(t, 1);
  return { b: b, f: f }; }
WORLD.d1a = function (sc, ev, t, lt) { const pa = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act;
  const mk = pa === undefined ? 0 : cl((pa - TM) / .5), hin = ease(cl(lt / 1.15));
  let today = yardD(t, {}); if (mk < .6) today += hend(lerp(1260, TA[0], hin), TA[1], 1.25 * (1 - .3 * cl(mk * 2)), t, { walk: hin < 1, flap: hin < 1 || mk > 0 ? 1 : 0 });
  if (pa === undefined || pa < TM) return W(today + shade3(), slot(ev, [['panel', 'Die Vorfahren: kleine Raubsaurier']]));
  // Urzeit-Szene
  const U = urD(t); let old = U.b, front = '';
  if (a === undefined || a < 2.85) { const sn = snapD(ev), sit = p2 === undefined || a !== undefined ? (a !== undefined ? 1 - cl(a / .3) : 0) : ease(cl(p2 / .5)) * (1 - sn), shr = a === undefined ? 1 : 1 - .45 * ease(cl((a - 1.45) / .8)), up = a === undefined ? 0 : ease(cl((a - 2.2) / .6));
    if (p2 !== undefined) { const nk = back(cl(p2 / .4)) * (a === undefined ? 1 : 1 - cl((a - .2) / .4)); if (nk > 0) { const N = 'translate(' + (RA[0] + 50) + ' ' + (RA[1] + 4) + ') scale(' + (nk * 1.3) + ')', egg = (x, i) => '<ellipse cx="' + x + '" cy="-28" rx="29" ry="38" fill="#FFF5DC" stroke="#0B1020" stroke-width="5"/><ellipse cx="' + (x - 9) + '" cy="-40" rx="7" ry="11" fill="#fff" opacity=".8"/><circle cx="' + (x + 8) + '" cy="' + (-22 + i * 3) + '" r="5" fill="#E8C9A0"/><circle cx="' + (x - 4) + '" cy="' + (-10 - i * 2) + '" r="3.5" fill="#E8C9A0"/>';
      old += '<g transform="' + N + '"><ellipse cx="0" cy="10" rx="236" ry="20" fill="#000" opacity=".2"/><ellipse cx="0" cy="0" rx="220" ry="48" fill="#6B4226" stroke="#0B1020" stroke-width="6"/>' + [-164, -104, 112, 170].map(egg).join('') + '</g>';
      front = '<g transform="' + N + '"><path d="M-220 0 C-220 46 220 46 220 0 C150 26 -150 26 -220 0 Z" fill="#8B5E3C" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><path d="M-196 14 q26 -22 52 0 q26 -22 52 0 q26 -22 52 0 q26 -22 52 0 q26 -22 52 0 q26 -22 52 0 q26 -22 52 0 q14 -12 28 0" stroke="#C9A36A" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M-170 22 l-18 -30 M-60 30 l-10 -34 M70 30 l12 -32 M160 22 l20 -28" stroke="#E2C48A" stroke-width="5" stroke-linecap="round"/></g>'; } }
    old += rexd(RA[0] - 24 * sn, RA[1] - 4 - 320 * up, TAS * back(cl((mk - .3) / .5)) * shr, t, { kind: 'rap', pal: RAPD, id: 'r', tl: .74, fa: 1.5, feath: p1 === undefined ? 0 : back(cl(p1 / .5)), sit: sit * .8, jaw: sn > 0 ? sn : (pa < TM + 1.4 ? .5 * Math.abs(Math.sin(t * 9)) : 0), head: sn > 0 ? 26 * sn : (p1 !== undefined && p1 < 1.2 ? -10 : 4 * Math.sin(t * 1.9)), wing: a === undefined ? 0 : ease(cl((a - .3) / .9)), shadow: up > .1 ? 0 : 1 }) + front;
    if (p1 !== undefined && p1 < 1.6) for (let i = 0; i < 8; i++) { const k = cl((p1 - .15 - i * .06) / 1.2); if (k > 0 && k < 1) old += '<path transform="translate(' + (RA[0] - 240 + i * 74 + 30 * Math.sin(k * 6 + i)) + ' ' + (RA[1] - 450 + 420 * k) + ') rotate(' + (40 * Math.sin(k * 7 + i)) + ') scale(1.7)" d="M0 0 Q14 -8 34 0 Q14 8 0 0 Z" fill="' + ['#FFD23F', '#FF6BD6'][i % 2] + '" stroke="#0B1020" stroke-width="3" opacity="' + (1 - k) + '"/>'; }
  }
  old += U.f; if (p2 !== undefined && a === undefined) old += chip3(800, 716, 'hohle Knochen', 38, '#F4F6FB', '#0B1020', (p2 - .5) / .3);
  let s = wipe3(today, old, pa - TM, .55, '#A8E63C') + puffb(lerp(TA[0], RA[0], cl((pa - TM) / .4)), TA[1] - 200, (pa - TM) / .6, 260);
  if (a !== undefined && a >= 2.65) { const k = ease(cl((a - 2.65) / .6)), o = Math.max(0, (a - 3.25) * 2.9), k2 = ease(cl(o / 2.0)), bx = k < 1 ? lerp(RA[0], 560, k) : lerp(560, 205, k2), by = k < 1 ? lerp(RA[1] - 440, 880, k) : lerp(880, 728, k2) - 70 * Math.sin(Math.PI * k2);
    s = wipe3(old, yardD(t, {}), a - 2.65, .5, '#A8E63C') + puffb(RA[0], RA[1] - 420, (a - 2.65) / .45, 140) + birdd(bx, by + 6 * Math.sin(t * 2.3), 1.1, t, { flip: 1, id: 'f' }); }
  return W(s + shade3(), slot(ev, [['panel', 'Die Vorfahren: kleine Raubsaurier'], ['p1', 'Federn gab es schon vor den Vögeln', 'hot'], ['p2', 'Hohle Knochen, Brüten auf dem Nest'], ['act', 'Kleiner, leichter, Flügel', 'hot']])); };
WMASC.d1a = (ev, t) => { const p1 = ev.p1, p2 = ev.p2, a = ev.act;
  if (a !== undefined) return a < 2.6 ? stay3(HOME3, 1, { r: -8 + 2 * Math.sin(t * 2) }) : stay3([220, 1537 - 14 * Math.abs(Math.sin(t * 7)) * cl((a - 3.3) / .4)], 1, { r: -12 * cl((a - 2.6) / .6) });
  if (p2 !== undefined) { if (p2 < .9) return BIG3(); if (p2 < 1.5) return stay3([lerp(220, 290, ease((p2 - .9) / .6)), 1537 - 8 * Math.abs(Math.sin(t * 12))], 1, { r: 10 }); if (p2 < 2.0) return hop3((p2 - 1.5) / .5, [290, 1537], [190, 1537], 26, 1, 1, { r: -16 }); return stay3([lerp(190, 220, cl((p2 - 2) / .5)) + 4 * Math.sin(t * 34) * cl(1 - (p2 - 2) / .5), 1537], 1); }
  if (p1 !== undefined && p1 < 1.4) return stay3([lerp(220, 250, ease(cl(p1 / .4))), 1537], 1, { r: 8 }); return BIG3(); };

// ---------- Teil 2: der Stammbaum als Wege auf der Wiese ----------
// Blick von weiter oben auf die Wiese hinter dem Hof. Vom gemeinsamen Anfang unten fuehrt ein Weg nach oben und gabelt sich zweimal.
// Die Tiere laufen selbst auf ihren Weg: zuerst das Huhn, dann der T. rex auf den Nachbarweg derselben Gabelung, zuletzt kriecht das Krokodil auf den Weg, der schon frueher abzweigt.
// T. rex und Huhn drehen sich zueinander. Der T. rex bruellt vorher zu Schalti herunter, der zuckt weg.
const WG = { O: [540, 1160], A: [540, 1070], C: [300, 950], B: [740, 1000], R: [640, 900], H: [900, 900] };
function meadD(t) { let s = '<defs><linearGradient id="mdS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F5FD0"/><stop offset="1" stop-color="#B7E2FF"/></linearGradient><linearGradient id="mdG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6FD07A"/><stop offset=".45" stop-color="#3DAA52"/><stop offset="1" stop-color="#1F7A3A"/></linearGradient></defs><rect width="1080" height="760" fill="url(#mdS)"/>';
  s += cloudb(240 + 30 * Math.sin(t * .12), 640, .42, .9) + cloudb(700 + 24 * Math.sin(t * .1 + 2), 610, .32, .8) + '<circle cx="900" cy="620" r="44" fill="#FFFBE0"/><circle cx="900" cy="620" r="90" fill="#FFF6C8" opacity=".3"/>';
  s += '<path d="M-20 730 Q180 668 400 712 T820 690 T1100 716 V790 H-20 Z" fill="#2F8F4E"/>';
  // der Hof klein in der Ferne
  s += '<g transform="translate(96 648) scale(.42)"><rect x="0" y="90" width="214" height="150" fill="#B5432E" stroke="#0B1020" stroke-width="8"/><path d="M-20 98 L107 2 L234 98 Z" fill="#7A2A1E" stroke="#0B1020" stroke-width="8" stroke-linejoin="round"/><path d="M76 240 V170 Q107 136 138 170 V240 Z" fill="#2A1410"/></g>';
  for (let x = 200; x < 1090; x += 44) s += '<rect x="' + x + '" y="716" width="7" height="34" rx="3" fill="#E9D8B4" stroke="#0B1020" stroke-width="2.5"/>'; s += '<path d="M196 727 H1080 M196 742 H1080" stroke="#E9D8B4" stroke-width="5"/>';
  s += '<path d="M-20 752 Q260 738 560 750 T1100 746 V1920 H-20 Z" fill="url(#mdG)"/>';
  for (let i = 0; i < 26; i++) { const y = 790 + 720 * rnd(i + 17), z = .45 + .9 * (y - 760) / 760, x = 20 + 1040 * rnd(i + 3), w = 5 * Math.sin(t * 1.6 + i) * z; s += '<path d="M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' q' + (-8 * z + w).toFixed(1) + ' ' + (-22 * z).toFixed(1) + ' ' + (-14 * z + w * 2).toFixed(1) + ' ' + (-34 * z).toFixed(1) + ' M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' q' + (2 * z + w).toFixed(1) + ' ' + (-26 * z).toFixed(1) + ' ' + (4 * z + w * 2).toFixed(1) + ' ' + (-40 * z).toFixed(1) + ' M' + x.toFixed(0) + ' ' + y.toFixed(0) + ' q' + (10 * z + w).toFixed(1) + ' ' + (-20 * z).toFixed(1) + ' ' + (18 * z + w * 2).toFixed(1) + ' ' + (-30 * z).toFixed(1) + '" stroke="#2A8442" stroke-width="' + (3 + 3 * z).toFixed(1) + '" fill="none" stroke-linecap="round"/>'; }
  s += '<path d="M-20 1548 Q300 1516 600 1552 T1100 1540 V1920 H-20 Z" fill="#2E9A4A" stroke="#7FE08A" stroke-width="6"/>';
  for (let i = 0; i < 9; i++) s += '<circle cx="' + (60 + i * 118 + 30 * rnd(i)) + '" cy="' + (1610 + 120 * rnd(i + 7)) + '" r="9" fill="' + ['#FFE14D', '#FF6BD6', '#fff'][i % 3] + '"/>';
  return s; }
const WGD = { o: 'M540 1170 L540 1070', c: 'M540 1070 Q430 1040 296 958', b: 'M540 1070 Q660 1050 740 1000', r: 'M740 1000 Q700 950 648 910', h: 'M740 1000 Q830 962 896 910' };
function waysD(t, k, dino, hot) { const st = (d, w, q, col, extra) => q <= 0 ? '' : '<path d="' + d + '" stroke="' + col + '" stroke-width="' + w + '" fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="' + (1 - cl(q)) + '" ' + (extra || '') + '/>';
  const L = [[WGD.c, 46, (k - .3) / .4], [WGD.r, 40, (k - .6) / .4], [WGD.h, 40, (k - .6) / .4], [WGD.b, 54, (k - .3) / .3], [WGD.o, 72, k / .3]];
  let s = L.map(a => st(a[0], a[1] + 14, a[2], '#9C7F45')).join('') + L.map(a => st(a[0], a[1], a[2], '#EBD7A2')).join('');
  if (dino > 0) s += st(WGD.r, 14, dino, '#A8E63C') + st(WGD.h, 14, dino, '#A8E63C');
  if (hot > 0) s += st(WGD.r, 14, hot, '#FFE14D') + st(WGD.h, 14, hot, '#FFE14D') + '<circle cx="740" cy="1000" r="' + (22 + 5 * Math.sin(t * 8)) + '" fill="#FFE14D" stroke="#0B1020" stroke-width="5" opacity="' + cl(hot * 2) + '"/>';
  return s; }
WORLD.d1b = function (sc, ev, t, lt) { const p1 = ev.p1, p2 = ev.p2, a = ev.act;
  let s = meadD(t) + waysD(t, cl((lt - .2) / 1.0), p1 === undefined || p2 !== undefined ? 0 : cl((p1 - 1.0) / .5), p2 === undefined ? 0 : cl((p2 - 1.5) / .6));
  // die beiden oberen Wege gehoeren zusammen: leuchtender Bodenfleck und Schild
  if (p1 !== undefined) { const q = cl((p1 - 1.0) / .5); s += '<ellipse cx="770" cy="912" rx="' + (290 * q) + '" ry="' + (56 * q) + '" fill="#A8E63C" fill-opacity=".22" stroke="#A8E63C" stroke-width="7" stroke-dasharray="24 14" stroke-dashoffset="' + (-t * 30) + '"/>'; }
  // Krokodil kriecht auf seinen Weg
  if (p2 !== undefined) { const q = ease(cl(p2 / 1.1)); s += crocd(lerp(WG.A[0] - 40, WG.C[0] + 40, q), lerp(WG.A[1] - 10, WG.C[1], q), lerp(.92, .8, q), t, { walk: q < 1, jaw: q >= 1 && a === undefined ? .5 + .5 * Math.sin(t * 6) : 0, head: q >= 1 ? -8 : 0 }); }
  // T. rex stapft auf seinen Weg, bruellt zu Schalti herunter, dreht sich dann zum Huhn
  if (p1 !== undefined) { const q = ease(cl(p1 / .9)), roar = p1 > 1.5 && p1 < 2.5 && p2 === undefined, tq = p2 === undefined ? 0 : cl((p2 - 1.5) / .4), nod = a === undefined ? 0 : 14 * Math.abs(Math.sin(a * 5)) * cl(1 - a / 2);
    if (roar) s += roard(WG.R[0] - 180, WG.R[1] - 186, 110, t, cl((p1 - 1.5) / .15) * cl((2.5 - p1) / .15));
    s += rexd(lerp(WG.B[0], WG.R[0], q), lerp(WG.B[1], WG.R[1], q), lerp(.7, .6, q), t, { id: 't', run: q < 1, ph: stepD(110 * q, .65), jaw: roar ? .7 + .3 * Math.abs(Math.sin(t * 24)) : 0, head: roar ? 22 : tq > .5 ? 14 + nod : 0, flip: tq > .5, kx: tq > 0 && tq < 1 ? Math.abs(Math.cos(Math.PI * tq)) * .9 + .1 : 1 }); }
  // Huhn laeuft als Erstes auf seinen Weg
  { const q = ease(cl((lt - 1.0) / 1.2)), hj = a === undefined ? 0 : 70 * Math.abs(Math.sin(Math.PI * cl(a / .5))) + (a > .5 && a < 1.6 ? 26 * Math.abs(Math.sin((a - .5) * 9)) : 0);
    if (a !== undefined) for (let i = 0; i < 2; i++) { const c = (t * .9 + i / 2) % 1; s += '<circle cx="' + WG.H[0] + '" cy="' + (WG.H[1] - 110) + '" r="' + (120 + 60 * c) + '" fill="none" stroke="#FFE14D" stroke-width="8" opacity="' + (.8 * (1 - c) * cl(a / .4)) + '"/>'; }
    if (lt > .9) s += hend(lerp(WG.B[0], WG.H[0], q), lerp(WG.B[1], WG.H[1], q) - hj, lerp(.96, .88, q), t, { walk: q < 1, flip: q < 1, flap: a !== undefined && a < 1.6 ? 1 : 0, tilt: p2 !== undefined && p2 > 1.9 && a === undefined ? -16 : 0, peck: q >= 1 && p1 === undefined ? peckD(t) : 0 }); }
  if (p1 !== undefined && p2 === undefined) s += chip3(770, 962, 'Dinosaurier', 38, '#A8E63C', '#0B1020', (p1 - 1.2) / .3);
  if (p2 !== undefined && a === undefined) s += chip3(770, 962, p2 < 1.7 ? 'Dinosaurier' : 'eng verwandt', 38, p2 < 1.7 ? '#A8E63C' : '#FFE14D', '#0B1020', p2 < 1.7 ? 1 : (p2 - 1.7) / .3);
  if (a !== undefined) s += chip3(760, 1090, 'lebender Dinosaurier', 38, '#A8E63C', '#0B1020', (a - .4) / .3);
  return W(s + shade3(), slot(ev, [['panel', 'Mehr als nur verwandt'], ['p1', 'Diese Wege: Dinosaurier', 'hot'], ['p2', 'Gleiche Abzweigung'], ['act', 'Dein Huhn: ein Dinosaurier', 'hot']])); };
WMASC.d1b = (ev, t) => { const p1 = ev.p1, p2 = ev.p2, a = ev.act;
  if (a !== undefined) return stay3([220, 1537 - 30 * Math.abs(Math.sin(Math.PI * cl(a / .5)))], 1, { r: 5 });
  if (p2 !== undefined) return stay3(HOME3, 1, { r: 4 * Math.sin(t * 2.4) });
  if (p1 !== undefined && p1 > 1.5 && p1 < 2.5) return stay3([lerp(220, 170, ease((p1 - 1.5) / .3)) + 5 * Math.sin(t * 38), 1537], 1, { r: -16 + 3 * Math.sin(t * 30) });
  if (p1 !== undefined && p1 >= 2.5) return stay3([lerp(170, 220, ease(cl((p1 - 2.5) / .4))), 1537], 1); return BIG3(); };

// ---------- Teil 3: derselbe Ort vor 66 Millionen Jahren ----------
// Ein T. rex stapft durchs Bild und schaut zum Himmel, als der Asteroid kommt. Einschlag am Ende des ersten Satzes, Schalti taumelt.
// Der kleine Vogel fluechtet zu Schalti und bleibt bei ihm. Danach wieder heute: der Hof, das Huhn, rund 11.000 Vogelarten.
const impD = (sc) => Math.max(1.2, dur3(sc, 0) - .7);
WORLD.d1c = function (sc, ev, t, lt) { const pa = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, ti = impD(sc), hit = pa !== undefined && pa >= ti ? pa - ti : undefined, sh = shake7(hit, t);
  const dark = hit === undefined ? 0 : a === undefined ? ease(cl(hit / 1.0)) : 1 - ease(cl(a / .8));
  let s = yardD(t, { old: 1, dark: dark });
  if (pa !== undefined && hit === undefined) { const k = cl((pa - (ti - .9)) / .9), ax = lerp(1160, 470, k * k), ay = lerp(520, 990, k * k); if (k > 0) s += '<path d="M' + ax + ' ' + ay + ' L' + (ax + 260) + ' ' + (ay - 178) + '" stroke="#FFB03D" stroke-width="34" stroke-linecap="round" opacity=".55"/><path d="M' + ax + ' ' + ay + ' L' + (ax + 170) + ' ' + (ay - 116) + '" stroke="#FFF1C4" stroke-width="18" stroke-linecap="round"/><circle cx="' + ax + '" cy="' + ay + '" r="30" fill="#6B5A52" stroke="#0B1020" stroke-width="5"/><circle cx="' + (ax - 8) + '" cy="' + (ay - 6) + '" r="8" fill="#4A3C36"/>'; }
  if (hit !== undefined && a === undefined) { s += '<ellipse cx="470" cy="1010" rx="' + (200 + 500 * ease(cl(hit / .8))) + '" ry="' + (60 + 150 * ease(cl(hit / .8))) + '" fill="#FFB03D" opacity="' + (.55 * (1 - cl(hit / 2.5)) + .12) + '"/>'; for (let i = 0; i < 5; i++) { const c = (t * .25 + i / 5) % 1; s += '<circle cx="' + (380 + i * 50 + 30 * Math.sin(t + i)) + '" cy="' + (990 - 260 * c) + '" r="' + (40 + 70 * c) + '" fill="#2A2020" opacity="' + (.5 * (1 - c) * cl(hit / .6)) + '"/>'; } }
  const gq = d => p1 === undefined ? 0 : ease(cl((p1 - d) / .9)), gone = gq(1.7), lk = pa !== undefined && hit === undefined ? cl((pa - (ti - 1.0)) / .4) : 0, duck = hit === undefined ? 0 : ease(cl(hit / .4));
  // hinten: kleiner Raubsaurier (links) und Triceratops (rechts). Sie verblassen nacheinander, dann der T. rex: drei von vier
  let front = '';
  if (a === undefined || a < .4) { const wi = ease(cl(lt / 1.3)), lookup = pa !== undefined && hit === undefined ? cl((pa - (ti - 1.0)) / .4) : 0;
    if (gone < 1) s += '<g style="filter:grayscale(' + gone + ')">' + rexd(lerp(900, 500, wi), DB[1] - 8 + 40 * gone, .72, t, { op: 1 - gone, run: wi < 1, ph: stepD(400 * wi, .72), head: hit !== undefined ? 26 : -26 * lookup, sit: hit === undefined ? 0 : .7 * ease(cl(hit / .5)), jaw: hit !== undefined && hit < 1.2 ? .8 : .1 * lookup, id: 'u' }) + '</g>';
    { const g1 = gq(.4), g2 = gq(1.05);
    if (g1 < 1) s += '<g style="filter:grayscale(' + g1 + ')">' + rexd(128, 1136 + 26 * g1, .36, t, { kind: 'rap', pal: RAPD, id: 'q', tl: .74, fa: 1.3, feath: 1, flip: 1, kx: -1, op: 1 - g1, head: duck ? 22 * duck : -18 * lk, sit: .6 * duck, jaw: duck && hit < 1.2 ? .7 : 0 }) + '</g>';
    if (g2 < 1) s += '<g style="filter:grayscale(' + g2 + ')">' + triD(905, 1140 + 26 * g2, .5, t, { id: 'w', op: 1 - g2, head: duck ? -8 : lk ? -14 * lk : 10 + 8 * Math.sin(t * 1.3), lookY: -lk }) + '</g>'; }
    // der kleine Vogel: erst hinten, dann fluechtet er nach vorn zu Schalti
    const fk = hit === undefined ? 0 : ease(cl((hit - .3) / .9)), bx = lerp(318, 430, fk), by = lerp(1146, 1530, fk);
    front = hend(bx, by, lerp(.44, .62, fk), t, { c1: '#E3C08A', c2: '#B58A4E', id: 'v', walk: fk > 0 && fk < 1, flap: fk > 0 && fk < 1 ? 1 : 0, peck: fk >= 1 && p2 !== undefined && p2 > 1.3 ? peckD(t) : 0 }); if (fk < .5) { s += front; front = ''; } }
  else { s = wipe3(s, yardD(t, {}) + hend(830, DB[1], 1.05, t, { peck: peckD(t) }), a - .4, .6, '#A8E63C'); }
  // die Ueberlebenden: Lichtkreis um den kleinen Vogel bei Schalti, zwei weitere Voegel laufen dazu
  if (a === undefined && p1 !== undefined && p1 > 2.0) { const k = cl((p1 - 2.0) / .4), pu = 1 + .05 * Math.sin(t * 6); s += '<ellipse cx="430" cy="1534" rx="' + (120 * k * pu) + '" ry="' + (30 * k * pu) + '" fill="#A8E63C" opacity=".28"/><ellipse cx="430" cy="1534" rx="' + (120 * k * pu) + '" ry="' + (30 * k * pu) + '" fill="none" stroke="#A8E63C" stroke-width="7" stroke-dasharray="22 14"/>'; }
  if (a === undefined && p2 !== undefined) [[570, 1560, .56, '#D9A26A', '#A66F3C', .15], [700, 1524, .5, '#EBD3A4', '#C29A5E', .5]].forEach(([x, y, z, c1, c2, d], i) => { const k = ease(cl((p2 - d) / 1.3)); front += hend(lerp(1230, x, k), y, z, t, { c1: c1, c2: c2, id: 'n' + i, walk: k < 1, flap: 0, peck: k >= 1 ? peckD(t + i) : 0 }); });
  if (a !== undefined && a > .9) { const n = Math.round(11000 * ease(cl((a - .9) / 1.1)) / 100) * 100, k = back(cl((a - .9) / .3));
    for (let i = 0; i < 9; i++) { const c = ((t * (.16 + .07 * rnd(i + 5)) + rnd(i + 9)) % 1); s += birdd(-120 + 1320 * c, 690 + 250 * rnd(i + 31) + 18 * Math.sin(t * 2 + i), .3 + .26 * rnd(i + 51), t, { col: ['#FFD23F', '#FF6B6B', '#5CE1FF', '#FFFFFF'][i % 4], ph: i, id: 'k' + i }); }
    s += '<g transform="translate(520 860) scale(' + k + ')">' + svgT(0, 0, n.toLocaleString('de-DE'), 150, '#fff').replace('<text', '<text stroke="#0B1020" stroke-width="22" stroke-linejoin="round" paint-order="stroke"') + '</g>' + chip3(520, 940, 'Vogelarten', 46, '#A8E63C', '#0B1020', (a - 1.3) / .3); }
  const fl = hit === undefined ? 0 : 1 - cl(hit / .35);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + front + '</g>' + (fl > 0 ? '<rect width="1080" height="1920" fill="#fff" opacity="' + (.85 * fl) + '"/>' : '') + shade3(), slot(ev, [['panel', 'Vor 66 Millionen Jahren'], ['p1', 'Drei von vier Arten: weg', 'red'], ['p2', 'Übrig von den Dinos: ein paar Vögel', 'hot'], ['act', 'Heute: rund 11.000 Vogelarten', 'hot']])); };
WMASC.d1c = (ev, t, lt, sc) => { const pa = ev.panel, ti = impD(sc); if (pa !== undefined && pa >= ti && pa < ti + 1.1 && ev.p1 === undefined) { const h = pa - ti; return stay3([220 + 8 * Math.sin(t * 42) * (1 - h / 1.1), 1537 - 30 * Math.abs(Math.sin(Math.PI * cl(h / .4)))], 1, { r: -18 * (1 - h / 1.1) + 5 * Math.sin(t * 30) }); }
  if (pa !== undefined && pa < ti && pa > ti - 1.0) return stay3(HOME3, 1, { r: -10 });
  if (ev.p2 !== undefined && ev.act === undefined) return stay3(HOME3, 1, { r: 8 }); return ev.act !== undefined ? stay3(HOME3, 1, { r: -6 + 2 * Math.sin(t * 2) }) : BIG3(); };

// ---------- Schluss: das Huhn laeuft zu Schalti und pickt neben ihm ----------
WORLD.d1outro = function (sc, ev, t, lt) { const k = ease(cl((lt - .3) / 1.6)); return W(yardD(t, {}) + '<rect width="1080" height="1920" fill="#02030F" opacity=".38"/>' + hend(lerp(1250, 560, k), 1540, .95, t, { walk: k < 1, peck: k >= 1 ? peckD(t) : 0 }) + shade3()); };
['h7dino', 'd1a', 'd1b', 'd1c', 'd1outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
