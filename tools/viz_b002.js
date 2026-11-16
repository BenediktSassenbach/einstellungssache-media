// B002 "Wie sah der Spinosaurus wirklich aus?" nach dem Dino-Skript 1.0. Ein Tier, drei Bilder: 1915 aufrecht, spaeter Landraeuber, heute Krokodilschnauze und Paddelschwanz.
// Der Spinosaurus verwandelt sich jeweils an Ort und Stelle. Ort: Flussufer in der Urzeit. Teil 1 wechselt in ein altes, braunes Bild (1915), Teil 3 am Ende nach Niger.
// Nur Aussehen (Benedikt, 16.11.2026): Ob er schwamm oder watete, ist umstritten und wird nicht behauptet. Er steht hoechstens im flachen Wasser.
const SPB = [600, 1128], SPW = [640, 1206], SPZ = .95, TEAL = { a: '#1FA8A0', b: '#0E6F73', be: '#E8FFE0', sp: '#0A4F55' };
function nilD(t, o) { o = o || {}; const U = urD(t); let b = U.b;
  b += '<defs><linearGradient id="nlW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5CC4F2"/><stop offset="1" stop-color="#1F6FBF"/></linearGradient></defs><path d="M-20 1168 Q270 1150 540 1166 T1100 1158 V1340 Q800 1356 540 1342 T-20 1350 Z" fill="url(#nlW)" stroke="#BFEFFF" stroke-width="6"/>';
  for (let i = 0; i < 9; i++) { const x = ((i * 150 + t * 46) % 1260) - 90, y = 1196 + (i % 4) * 38; b += '<path d="M' + x.toFixed(0) + ' ' + y + ' q18 -9 36 0 q18 9 36 0" stroke="#DDF6FF" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>'; }
  for (const [x, h] of [[40, 90], [78, 120], [1010, 110], [1046, 80]]) { const w = 4 * Math.sin(t * 1.4 + x); b += '<path d="M' + x + ' 1176 Q' + (x + w) + ' ' + (1176 - h / 2) + ' ' + (x + 2 * w) + ' ' + (1176 - h) + '" stroke="#0B1020" stroke-width="12" fill="none" stroke-linecap="round" opacity=".35"/><path d="M' + x + ' 1176 Q' + (x + w) + ' ' + (1176 - h / 2) + ' ' + (x + 2 * w) + ' ' + (1176 - h) + '" stroke="#2F9E55" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="' + (x + 2 * w) + '" cy="' + (1176 - h - 12) + '" rx="7" ry="18" fill="#7A4A26" stroke="#0B1020" stroke-width="3"/>'; }
  let f = '';
  if (o.wade) { const wx = o.wx || SPW[0]; f += '<path d="M-20 1228 Q270 1214 540 1228 T1100 1220 V1340 Q800 1356 540 1342 T-20 1350 Z" fill="#2C8AD6" opacity=".84"/>'; for (const dx of [-30, 40]) { const r = 1 + .12 * Math.sin(t * 3 + dx); f += '<ellipse cx="' + (wx + dx) + '" cy="1232" rx="' + (70 * r) + '" ry="' + (11 * r) + '" fill="none" stroke="#DDF6FF" stroke-width="5" opacity=".8"/>'; } }
  return { b: b, f: f + U.f }; }
// Altes, braunes Bild (1915): Wueste mit Duenen, als vergilbte Aufnahme
function papD(t) { let s = '<defs><linearGradient id="ppS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E2114"/><stop offset=".6" stop-color="#7A5F3C"/><stop offset="1" stop-color="#9A7B4E"/></linearGradient><linearGradient id="ppG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A6C42"/><stop offset="1" stop-color="#3E2E1C"/></linearGradient></defs><rect width="1080" height="1080" fill="url(#ppS)"/><circle cx="820" cy="820" r="70" fill="#C9A970" opacity=".7"/>';
  s += '<path d="M-20 1000 Q160 900 340 980 T700 940 T1100 990 V1060 H-20 Z" fill="#6B5232"/><path d="M-20 1016 Q260 980 560 1012 T1100 1000 V1920 H-20 Z" fill="url(#ppG)"/>';
  for (const [x, h] of [[120, 150], [960, 180]]) { s += '<path d="M' + x + ' 1030 q10 -' + (h / 2) + ' -4 -' + h + '" stroke="#3B2A18" stroke-width="12" fill="none" stroke-linecap="round"/>'; for (let i = 0; i < 6; i++) s += '<path d="M' + (x - 4) + ' ' + (1030 - h) + ' q' + (-70 + i * 28) + ' -40 ' + (-100 + i * 40) + ' 14" stroke="#3B2A18" stroke-width="9" fill="none" stroke-linecap="round"/>'; }
  for (let i = 0; i < 14; i++) s += '<path d="M' + (40 + i * 78 + 30 * rnd(i + 3)).toFixed(0) + ' ' + (1080 + 700 * rnd(i + 17)).toFixed(0) + ' q14 -8 30 0" stroke="#2E2114" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>';
  s += '<path d="M-20 1548 Q300 1516 600 1552 T1100 1540" stroke="#B89A66" stroke-width="6" fill="none" opacity=".7"/>';
  for (let i = 0; i < 26; i++) s += '<rect x="0" y="' + (i * 74 + 20) + '" width="1080" height="2" fill="#000" opacity=".05"/>';
  return s; }
// Knochenfund am Boden: Kieferstueck, Wirbel mit langen Dornfortsaetzen, Rippen. k = wie weit eingeblendet
function bonesD(x, y, z, k) { if (k <= 0) return ''; const B = 'fill="#F4EBD0" stroke="#0B1020" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"'; let s = '';
  const pop = i => back(cl(k * 3 - i * .35)).toFixed(2);
  s += '<g transform="translate(-190 -6) scale(' + pop(0) + ')"><path d="M-110 -6 C-70 -30 40 -30 100 -14 L104 6 C40 12 -60 14 -110 8 Z" ' + B + '/>'; for (let i = 0; i < 6; i++) s += '<path d="M' + (-90 + i * 30) + ' -22 l7 -22 l8 22 Z" ' + B + '/>'; s += '</g>';
  [150, 190, 210, 190, 140].forEach((h, i) => { s += '<g transform="translate(' + (-10 + i * 62) + ' 0) scale(' + pop(i + 1) + ')"><path d="M-7 -20 L-5 -' + h + ' Q0 -' + (h + 10) + ' 5 -' + h + ' L7 -20 Z" ' + B + '/><ellipse cx="0" cy="-10" rx="22" ry="16" ' + B + '/></g>'; });
  s += '<g transform="translate(300 -4) scale(' + pop(6) + ')"><path d="M-30 0 Q0 -60 40 -10 M-10 4 Q20 -44 56 0" stroke="#0B1020" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M-30 0 Q0 -60 40 -10 M-10 4 Q20 -44 56 0" stroke="#F4EBD0" stroke-width="8" fill="none" stroke-linecap="round"/></g>';
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + z + ')"><ellipse cx="60" cy="8" rx="330" ry="16" fill="#000" opacity=".2"/>' + s + '</g>'; }
const oldG = (inner, gone) => '<g style="filter:sepia(.9) saturate(.75) brightness(1.2) grayscale(' + (gone || 0) + ')">' + inner + '</g>';
const dropsD = (x0, y0, x1, y1, q, n, h) => { let s = ''; for (let i = 0; i < n; i++) { const k = cl(q * 1.5 - i * .5 / n); if (k <= 0 || k >= 1) continue; const x = lerp(x0, x1, k) + 60 * (rnd(i + 3) - .5), y = lerp(y0, y1, k) - h * Math.sin(Math.PI * k) * (.6 + .6 * rnd(i + 9)); s += '<path transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ')" d="M0 -14 Q12 4 0 10 Q-12 4 0 -14 Z" fill="#8FD8FF" stroke="#0B1020" stroke-width="3"/>'; } return s; };

// ---------- Einstieg ----------
// Der bekannte Spinosaurus (Landraeuber) stapft schon beim ersten Satz ins Bild und bruellt, danach trinkt er am Fluss und schaut sich um. Schalti bemerkt er nicht.
// Beim Nachsatz wird sein Schwanz zum Paddel, er huepft ins flache Wasser (Einschlag bei 0,9 s), die Welle spuelt Schalti links aus dem Bild. Schalti kommt tropfend zurueck.
WORLD.h7spino = function (sc, ev, t, lt) { const e = ev.gag, hit = e !== undefined && e >= .9 ? e - .9 : undefined, sh = shake7(hit, t), inn = ease(cl((lt - .4) / 1.3));
  let x = lerp(1500, SPB[0], inn), y = SPB[1], o = {}, wade = 0, s2 = '';
  if (e === undefined) { if (inn < 1) o = { run: 1, ph: stepD(1500 - x, SPZ), jaw: .2 };
    else if (lt < 2.6) { o = { head: -20, jaw: .7 + .3 * Math.abs(Math.sin(t * 22)) }; s2 += roard(x - 330, y - 360, 96, t, cl((lt - 1.75) / .15) * cl((2.6 - lt) / .15)); }
    else { const c = (lt - 2.6) % 5.0; o = c < 2.4 ? { head: 50 * Math.sin(Math.PI * cl(c / 2.4)), jaw: c > .8 && c < 1.7 ? .25 + .2 * Math.sin(t * 10) : 0 } : { head: -8 + 8 * Math.sin(t * 2.6), kx: 1 }; } }
  else { const pad = ease(cl((e - .12) / .3));
    if (e < .5) o = { pad: pad, head: -12, swish: .5 * pad };
    else if (e < .9) { const q = (e - .5) / .4; x = lerp(SPB[0], SPW[0], q); y = lerp(SPB[1], SPW[1], q) - 130 * Math.sin(Math.PI * q); o = { pad: 1, sit: .35, jaw: .5, shadow: 0, head: 10 }; }
    else { x = SPW[0]; y = SPW[1]; wade = 1; o = { pad: 1, swish: hit < 1.5 ? .9 : .25, head: 4, jaw: hit < .5 ? .5 : 0, sit: .25 * (1 - cl(hit / .3)), shadow: 0 }; }
    s2 += puffb(x + 320, y - 210, (e - .12) / .45, 180); }
  const N = nilD(t, { wade: wade, wx: x }); let s = N.b + s2 + spinod(x, y, SPZ, t, o) + N.f;
  if (hit !== undefined) { if (hit < 1.0) s += dropsD(SPW[0], 1230, SPW[0], 1260, hit / 1.0, 16, 330).replace(/translate\((-?\d+) /g, (m, a, i) => 'translate(' + (+a + 520 * (rnd(i) - .5) * cl(hit * 2)) + ' ');
    if (hit < 1.25) { const k = cl(hit / .45), k2 = ease(cl((hit - .45) / .6)), wx = k < 1 ? lerp(560, 250, k) : lerp(250, -420, k2), wy = k < 1 ? lerp(1300, 1480, k) : 1480, z = .6 + .6 * k;
      s += '<g transform="translate(' + wx.toFixed(0) + ' ' + wy.toFixed(0) + ') scale(' + z.toFixed(2) + ')"><path d="M-170 70 C-150 -40 -60 -110 40 -92 C10 -70 6 -30 40 -6 C90 20 150 30 190 70 Z" fill="#3BA7E6" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/><path d="M-120 20 C-90 -50 -30 -80 20 -76" stroke="#DDF6FF" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="52" cy="-96" r="16" fill="#fff" stroke="#0B1020" stroke-width="4"/><circle cx="24" cy="-112" r="11" fill="#fff" stroke="#0B1020" stroke-width="4"/></g>'; }
    if (hit < 1.1) s += word7('PLATSCH!', 560, 1478, hit, '#8FD8FF', -4);
    if (e >= 3.2 && e < 5.2) s += dropsD(200, 1430, 200, 1545, ((e - 3.2) * 1.3) % 1, 5, 0); }
  return W('<g transform="translate(' + (sh[0] * .5) + ' ' + (sh[1] * .5) + ')">' + s + '</g>' + shade3()); };
WMASC.h7spino = (ev, t, lt, sc) => { const e = ev.gag;
  if (e === undefined) { if (lt < .5) return stay3(HOME3, 1, { r: -2 }); if (lt < 1.7) return stay3([lerp(220, 175, ease(cl((lt - .5) / .5))), 1537], 1, { r: -12 }); if (lt < 2.6) return stay3([175 + 4 * Math.sin(t * 40), 1537], 1, { r: -18 });
    return stay3([lerp(175, 220, ease(cl((lt - 2.6) / .6))), 1537], 1, { r: -3 + 2 * Math.sin(t * 2) }); }
  if (e < .9) return stay3([lerp(220, 250, ease(cl(e / .4))), 1537], 1, { r: 9 });
  if (e < 1.35) return stay3([lerp(250, 200, cl((e - .9) / .2)) + 4 * Math.sin(t * 44), 1537], 1, { r: -18 });
  if (e < 1.95) { const q = (e - 1.35) / .6; return stay3([lerp(200, -360, ease(q)), 1537 - 34 * Math.sin(Math.PI * q)], 1, { r: -60 * q, nospin: 1 }); }
  if (e < 2.5) return stay3([-360, 1537], 1, {});
  if (e < 3.2) return stay3([lerp(-360, 220, ease((e - 2.5) / .7)), 1537 - 8 * Math.abs(Math.sin(t * 12))], 1, { r: 6 });
  return stay3([220 + 4 * Math.sin(t * 34) * cl(1 - (e - 3.2) / 1.2), 1537], 1, { r: -4 }); };

// ---------- Teil 1: 1915, aufrecht wie ein Kaenguru ----------
// Die Szene wischt in ein altes, braunes Bild. Die ersten Knochen liegen im Sand, aus ihnen wird der aufrechte Spinosaurus, so wie er damals gezeichnet wurde.
// 1944: Feuerschein, das Tier verblasst. Uebrig bleibt ein Blatt mit der Zeichnung.
const sheetD = (t, x, y, rot, z) => '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + rot.toFixed(1) + ') scale(' + z + ')"><rect x="-196" y="-250" width="392" height="330" rx="10" fill="#000" opacity=".25" transform="translate(10 12)"/><rect x="-196" y="-250" width="392" height="330" rx="10" fill="#FFF6DF" stroke="#0B1020" stroke-width="6"/><g style="filter:grayscale(1) contrast(1.15)" opacity=".9">' + spinod(30, 52, .46, 0, { up: 1, shadow: 0, id: 'z' }) + '</g><path d="M-170 56 H170" stroke="#0B1020" stroke-width="4" stroke-dasharray="14 10" opacity=".5"/></g>';
WORLD.b2a = function (sc, ev, t, lt) { const pa = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act;
  const N = nilD(t, { wade: 1, wx: SPW[0] }), before = N.b + spinod(SPW[0], SPW[1], SPZ, t, { pad: 1, swish: .2, shadow: 0 }) + N.f;
  let P = papD(t);
  if (p1 === undefined || p1 < .5) P += '<g opacity="' + (p1 === undefined ? 1 : 1 - cl(p1 / .4)) + '">' + bonesD(520, 1128, 1, cl((lt - .7) / 1.4)) + '</g>';
  if (p1 !== undefined) { const k = back(cl((p1 - .25) / .5)), gone = p2 === undefined ? 0 : ease(cl((p2 - .8) / 1.3));
    if (p2 !== undefined) { const fk = cl(p2 / .5) * (a === undefined ? 1 : 1 - cl(a / .5)); P += '<defs><linearGradient id="b2F" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FF7A1F" stop-opacity=".85"/><stop offset="1" stop-color="#FF7A1F" stop-opacity="0"/></linearGradient></defs><rect x="0" y="560" width="1080" height="600" fill="url(#b2F)" opacity="' + (fk * (.8 + .2 * Math.sin(t * 9))) + '"/>';
      for (let i = 0; i < 6; i++) { const fx = 90 + i * 180 + 60 * (rnd(i + 2) - .5), fh = (150 + 150 * rnd(i + 5)) * (1 + .25 * Math.sin(t * 11 + i * 2)) * fk; P += '<path d="M' + (fx - 84) + ' 1132 Q' + (fx - 70) + ' ' + (1132 - fh * .5) + ' ' + (fx - 30 + 14 * Math.sin(t * 7 + i)) + ' ' + (1132 - fh) + ' Q' + (fx + 6) + ' ' + (1132 - fh * .55) + ' ' + (fx + 30) + ' ' + (1132 - fh * .75) + ' Q' + (fx + 70) + ' ' + (1132 - fh * .4) + ' ' + (fx + 84) + ' 1132 Z" fill="#FF9A2E" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M' + (fx - 20) + ' 1132 Q' + (fx - 10) + ' ' + (1132 - fh * .35) + ' ' + fx + ' ' + (1132 - fh * .55) + ' Q' + (fx + 16) + ' ' + (1132 - fh * .3) + ' ' + (fx + 20) + ' 1132 Z" fill="#FFE14D"/>'; }
      for (let i = 0; i < 6; i++) { const c = (t * .22 + i / 6) % 1; P += '<circle cx="' + (140 + i * 160 + 30 * Math.sin(t + i)) + '" cy="' + (1000 - 330 * c) + '" r="' + (36 + 60 * c) + '" fill="#1A120A" opacity="' + (.45 * (1 - c) * fk) + '"/>'; } }
    if (a === undefined || a < .5) P += '<g opacity="' + (1 - .9 * gone) + '">' + oldG(spinod(600, 1128, .85 * k, t, { up: 1, head: 4 * Math.sin(t * 1.6), jaw: p1 < 1.2 ? .3 * Math.abs(Math.sin(t * 8)) : 0, id: 'o' }), gone) + '</g>';
    P += puffb(560, 900, (p1 - .2) / .6, 260);
    if (a !== undefined) { const q = ease(cl((a - .2) / .9)); P += sheetD(t, 560, lerp(560, 990, q), lerp(-24, -5, q) + 3 * Math.sin(t * 2) * (1 - q), back(cl(a / .4))); } }
  return W(wipe3(before, P, lt - .05, .55, '#A8E63C') + shade3(), slot(ev, [['panel', '1915: erste Knochen aus Ägypten'], ['p1', 'Gezeichnet wie ein Känguru', 'hot'], ['p2', '1944 in München zerstört', 'red'], ['act', 'Es blieben Zeichnungen und Fotos']])); };
WMASC.b2a = (ev, t) => { const p1 = ev.p1, p2 = ev.p2, a = ev.act;
  if (a !== undefined) return a < 1.2 ? stay3([lerp(220, 262, ease(cl(a / .5))), 1537], 1, { r: 8 }) : BIG3();
  if (p2 !== undefined) return stay3([lerp(220, 180, ease(cl(p2 / .4))) + 3 * Math.sin(t * 38) * cl(p2), 1537], 1, { r: -14 });
  if (p1 !== undefined) return p1 > .9 && p1 < 2.3 ? stay3([220, 1537 - 20 * Math.abs(Math.sin((p1 - .9) * Math.PI / .7))], 1.04, { r: -10, nospin: 1 }) : stay3(HOME3, 1, { r: -6 });
  return BIG3(); };

// ---------- Teil 2: das bekannte Bild, der Landraeuber ----------
// Zurueck in Farbe am Fluss. Der aufrechte Spinosaurus kippt in die Waagerechte und wird zum Landraeuber, stapft ein Stueck und beschnuppert Schalti.
// Ein T. rex kommt als Vorbild dazu. Am Ende wird der Spinosaurus durchsichtig: Echt waren nur wenige Knochen.
WORLD.b2b = function (sc, ev, t, lt) { const pa = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act;
  const P = papD(t) + sheetD(t, 560, 990, -5, 1), N = nilD(t, {}); let s = N.b;
  const up = 1 - ease(cl((lt - .7) / .9)), q1 = p1 === undefined ? 0 : ease(cl((p1 - .1) / 1.3)), x = lerp(600, 500, q1), sniff = p1 === undefined || p2 !== undefined ? 0 : Math.sin(Math.PI * cl((p1 - 1.6) / 1.3)), gh = a === undefined ? 0 : ease(cl((a - .2) / .7));
  if (p2 !== undefined) { const rk = ease(cl(p2 / 1.2)), out = a === undefined ? 0 : ease(cl(a / 1.1)), rx = a === undefined ? lerp(1420, 890, rk) : lerp(890, 1500, out); s += rexd(rx, 1104, .62, t, { id: 'm', run: a === undefined ? rk < 1 : out < 1, ph: stepD(a === undefined ? 1420 - rx : rx - 890, .62), flip: a !== undefined && out > .05, head: -4 }); }
  const body = spinod(x, SPB[1], lerp(SPZ, .85, up), t, { up: up, run: q1 > 0 && q1 < 1, ph: stepD(600 - x, SPZ), head: 34 * sniff, jaw: lt < 1.4 ? 0 : (p1 !== undefined && p1 < .6 ? .5 : .12 * sniff), id: 'l' });
  s += '<g opacity="' + (1 - .72 * gh) + '" style="filter:sepia(' + (.9 * up).toFixed(2) + ')">' + body + '</g>';
  if (gh > 0) { const B = 'stroke="#0B1020" stroke-width="14" stroke-linecap="round" fill="none"', C = 'stroke="#FFF6DF" stroke-width="8" stroke-linecap="round" fill="none"'; let d = ''; for (let i = 0; i < 6; i++) { const sx = -80 + i * 32, hh = 180 * Math.pow(1 - Math.pow(sx / 118, 2), .62); d += 'M' + sx + ' -262 L' + (sx * .9).toFixed(0) + ' ' + (-262 - hh).toFixed(0) + ' '; } d += 'M-300 -300 L-190 -292 M-80 -180 Q-30 -150 40 -176';
    s += '<g transform="translate(' + x + ' ' + SPB[1] + ') scale(' + SPZ + ')" opacity="' + gh + '"><path d="' + d + '" ' + B + '/><path d="' + d + '" ' + C + '/></g>' ; }
  s += N.f;
  if (p1 !== undefined && p2 === undefined) s += chip3(300, 716, 'lange Beine', 36, '#F4F6FB', '#0B1020', (p1 - .5) / .3) + chip3(780, 800, 'spitzer Schwanz', 36, '#F4F6FB', '#0B1020', (p1 - 1.0) / .3);
  if (p2 !== undefined && a === undefined) s += chip3(770, 716, 'Vorbild: T. rex', 38, '#FFD23F', '#0B1020', (p2 - 1.2) / .3);
  if (a !== undefined) s += chip3(830, 716, 'kaum Knochen', 40, '#F4F6FB', '#0B1020', (a - .7) / .3);
  return W(wipe3(P, s, lt - .05, .55, '#A8E63C') + shade3(), slot(ev, [['panel', 'Später: das Bild, das du kennst'], ['p1', 'Riesiger Landräuber', 'hot'], ['p2', 'Ergänzt nach anderen Raubsauriern'], ['act', 'Echt waren nur wenige Knochen', 'red']])); };
WMASC.b2b = (ev, t) => { const p1 = ev.p1, p2 = ev.p2, a = ev.act;
  if (a !== undefined) return stay3(HOME3, 1, { r: 8 * cl(a / .4) });
  if (p2 !== undefined) return stay3([lerp(190, 220, ease(cl(p2 / .5))), 1537], 1, { r: -4 });
  if (p1 !== undefined) return p1 > 1.6 ? stay3([lerp(220, 190, ease(cl((p1 - 1.6) / .4))) + 2.5 * Math.sin(t * 46), 1537], 1, { r: -14 }) : stay3(HOME3, 1, { r: -8 });
  return BIG3(); };

// ---------- Teil 3: heute ----------
// Neue Knochen tauchen auf, der Spinosaurus steigt ins flache Wasser. Die Schnauze wird lang und schmal, er schnappt einen springenden Fisch.
// Dann waechst der Schwanz zum Paddel und spritzt Schalti nass. Zum Schluss wischt die Szene nach Niger: die neue Art mit dem Saebelkamm kommt ins Bild.
WORLD.b2c = function (sc, ev, t, lt) { const pa = ev.panel, p1 = lt > 2.3 ? lt - 2.3 : undefined, p2 = ev.p1, a = ev.p2, r = ev.act;
  const q = ease(cl((lt - 1.3) / 1.2)), x = lerp(500, SPW[0], q), y = lerp(SPB[1], SPW[1], q), sn = p1 === undefined ? 0 : ease(cl((p1 - .2) / .6)), pad = p2 === undefined ? 0 : ease(cl((p2 - .2) / .6));
  const N = nilD(t, { wade: q > .55, wx: x }); let s = N.b;
  const fq = p1 === undefined ? -1 : (p1 - 1.25) / .75, snap = fq >= 1 && fq < 1.5 ? Math.sin(Math.PI * (fq - 1) / .5) : 0;
  s += spinod(x, y, SPZ, t, { lg: lerp(1, .86, ease(cl((lt - .5) / .8))), sn: sn, pad: pad, swish: p2 !== undefined && p2 > .8 ? .9 : .15 * pad, run: q > 0 && q < 1, ph: stepD(x - 500, SPZ), shadow: q > .5 ? 0 : 1, head: fq > 0 && fq < 1.6 ? -6 : 6 + 4 * Math.sin(t * 1.8), jaw: fq > .3 && fq < 1 ? .8 : .8 * (1 - snap) * (fq >= 1 && fq < 1.5 ? 1 : 0) + (fq >= 1.5 && fq < 3 ? .15 * Math.abs(Math.sin(t * 9)) : 0), id: 'n' });
  if (p1 !== undefined) s += puffb(x - 330, y - 330, (p1 - .15) / .55, 190);
  if (p2 !== undefined) s += puffb(x + 320, y - 220, (p2 - .15) / .55, 190);
  if (fq > 0 && fq < 1) { const k = fq, fx = lerp(250, x - 395, ease(k)), fy = lerp(1250, y - 318, ease(k)) - 70 * Math.sin(Math.PI * k); s += fishD(fx, fy, -60 + 50 * k + 14 * Math.sin(t * 30), 1.0); }
  if (lt < 2.6) s += '<g opacity="' + (1 - cl((lt - 2.0) / .5)) + '">' + bonesD(880, 1150, .5, cl((lt - .25) / .8)) + '</g>';
  s += N.f;
  if (lt < 2.4) s += chip3(850, 716, 'Marokko', 40, '#FFD23F', '#0B1020', Math.min((lt - .7) / .3, (2.3 - lt) / .2));
  if (fq > -.1 && fq < .5) { const r = cl((fq + .1) / .5); s += '<ellipse cx="250" cy="1250" rx="' + (30 + 110 * r) + '" ry="' + (8 + 22 * r) + '" fill="none" stroke="#fff" stroke-width="7" opacity="' + (1 - r) + '"/>'; }
  if (p2 !== undefined && a === undefined) s += dropsD(x + 250, 1236, 250, 1440, (p2 - .9) / 1.5, 12, 300) + chip3(770, 716, 'Paddelschwanz', 40, '#FFD23F', '#0B1020', (p2 - .7) / .3);
  if (p1 !== undefined && p2 === undefined) s += chip3(250, 716, 'Krokodilschnauze', 38, '#FFD23F', '#0B1020', (p1 - .7) / .3);
  if (a !== undefined) { const M = nilD(t, {}), k = ease(cl((a - .35) / 1.3)), mx = lerp(1500, 600, k), look = cl((a - 1.9) / .5);
    let n = M.b + '<rect width="1080" height="1920" fill="#FF8A3D" opacity=".13"/>' + spinod(mx, SPB[1], .92, t, { pal: TEAL, sn: 1, pad: 1, lg: .9, crest: 1, run: k < 1, ph: stepD(1500 - mx, .92), head: 22 * look + 3 * Math.sin(t * 2), jaw: k < 1 ? .15 : 0, id: 'c' }) + M.f + chip3(800, 716, 'Niger: neue Art', 40, '#FFD23F', '#0B1020', (a - 1.6) / .3);
    s = wipe3(s, n, a - .05, .55, '#A8E63C'); }
  if (r !== undefined) s += photoD(t, r);
  return W(s + shade3(), slot(ev, [['panel', 'Krokodilschnauze, Zähne für Fische'], ['p1', '2020: Schwanz wie ein Paddel', 'hot'], ['p2', '2026: neue Art mit Säbelkamm', 'hot'], ['act', 'So könnte er ausgesehen haben', 'hot']])); };
WMASC.b2c = (ev, t, lt) => { const p1 = lt > 2.3 ? lt - 2.3 : undefined, p2 = ev.p1, a = ev.p2, r = ev.act;
  if (r !== undefined) return stay3([lerp(220, 250, ease(cl(r / .4))), 1537], 1, { r: 10 });
  if (a !== undefined) return a > 2.0 && a < 2.9 ? stay3([220, 1537 - 22 * Math.sin(Math.PI * (a - 2.0) / .9)], 1, { r: -8, nospin: 1 }) : stay3(HOME3, 1, { r: -6 });
  if (p2 !== undefined) return p2 > 1.5 ? stay3([220 + 5 * Math.sin(t * 36) * cl(1 - (p2 - 1.5) / 1.2), 1537], 1, { r: -12 * cl(1 - (p2 - 1.5) / 1.2) }) : stay3(HOME3, 1, { r: 6 });
  if (p1 !== undefined) return p1 > 1.2 && p1 < 2.2 ? stay3([lerp(220, 185, ease(cl((p1 - 1.2) / .3))), 1537], 1, { r: -14 }) : stay3([lerp(185, 220, cl((p1 - 2.2) / .4)), 1537], 1, { r: -3 });
  return BIG3(); };

// Grosses realistisches Bild (Teil 3, letzte Zeile, direkt vor der Zusammenfassung): volle Breite, y 505 bis 1198. Etikett und Textzeile liegen darueber.
// Liegt ein Bild in SPIMG (tools/viz_b002img.js), wird es gezeigt, sonst die naturnah gezeichnete Figur. Das Bild zoomt ganz langsam.
const photoD = (t, k) => { if (k <= 0) return ''; const W0 = 1040, H0 = 693, cy = 888, e = back(cl(k / .5)), z = 1 + .05 * cl(k / 4); let inner;
  if (typeof SPIMG !== 'undefined') inner = '<image href="' + SPIMG + '" x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" preserveAspectRatio="xMidYMid slice" transform="scale(' + z.toFixed(3) + ')"/>';
  else inner = '<svg x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" viewBox="60 560 1000 667" preserveAspectRatio="xMidYMid slice">' + nilD(t, { wade: 1, wx: 600 }).b + spinod(600, 1196, .92, t, { look: 'n', sn: 1, pad: 1, lg: .86, shadow: 0, id: 'real', pal: { a: '#7C7A52', b: '#4C4A30', be: '#D9CFA8', sp: '#3A3822' } }) + nilD(t, { wade: 1, wx: 600 }).f + '</svg>';
  return '<rect width="1080" height="1920" fill="#02030F" opacity="' + (.55 * cl(k / .4)) + '"/><g transform="translate(540 ' + cy + ') scale(' + e.toFixed(3) + ')"><rect x="' + (-W0 / 2 - 10) + '" y="' + (-H0 / 2 - 10) + '" width="' + (W0 + 20) + '" height="' + (H0 + 20) + '" rx="16" fill="#FFF6DF" stroke="#0B1020" stroke-width="6"/><clipPath id="phC"><rect x="' + (-W0 / 2) + '" y="' + (-H0 / 2) + '" width="' + W0 + '" height="' + H0 + '" rx="8"/></clipPath><g clip-path="url(#phC)">' + inner + '</g></g>' + chip3(900, 1156, 'KI-Bild', 28, '#0B1020', '#F4F6FB', (k - .7) / .3); };
// ---------- Schluss: die drei Bilder noch einmal am selben Tier ----------
WORLD.b2out = function (sc, ev, t, lt) { const N = nilD(t, {}), c2 = ev.c2, c3 = ev.c3, up = c2 === undefined ? 1 : 1 - ease(cl(c2 / .7)), m = c3 === undefined ? 0 : ease(cl((c3 - .1) / .7));
  let s = N.b + '<g style="filter:sepia(' + (.9 * up).toFixed(2) + ')">' + spinod(620, SPB[1], .8 * back(cl((lt - .1) / .4)), t, { up: up, sn: m, pad: m, lg: lerp(1, .86, m), swish: .15 * m, id: 'e', head: 3 * Math.sin(t * 1.7) }) + '</g>' + N.f;
  if (c2 !== undefined) s += puffb(600, 900, c2 / .5, 200); if (c3 !== undefined) s += puffb(600, 900, c3 / .5, 200);
  return W(s + '<rect width="1080" height="1920" fill="#02030F" opacity=".34"/>' + shade3()); };
['h7spino', 'b2a', 'b2b', 'b2c', 'b2out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
