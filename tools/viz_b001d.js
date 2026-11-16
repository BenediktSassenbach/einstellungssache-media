// B001D "Sind Voegel wirklich Dinosaurier?" nach dem Dino-Skript (Fach Bio, 16.11.2026): komplette Neufassung von B001V3.
// Gezeichnete Figuren mit Gelenken aus viz_dino.js (Look Cartoon), Hof aus viz_b001v3.js (yardb, treeb, crocb, birdb, puffb).
// In jeder Szene spielt Schalti mit den Tieren. Zum Loeschen dieser Fassung: diese Datei und videos/B001D.
const DB = [600, 1118];
const RAPD = { a: '#3FA9F5', b: '#1E6FC2', be: '#EAF6FF', sp: '#1B5DA8' }; // kleiner Raubsaurier: blau, damit er sich vom Gruen abhebt
// Hof mit Tiefe und Requisiten. o wie yardb, dazu props: 0 = ohne
function yardD(t, o) { o = o || {}; const dk = cl(o.dark || 0); let s = yardb(t, o);
  s += '<defs><linearGradient id="yDd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04240F" stop-opacity="0"/><stop offset="1" stop-color="#04240F" stop-opacity=".5"/></linearGradient><radialGradient id="yDs"><stop offset="0" stop-color="#FFF6C8" stop-opacity=".55"/><stop offset="1" stop-color="#FFF6C8" stop-opacity="0"/></radialGradient></defs><rect y="1050" width="1080" height="870" fill="url(#yDd)"/><circle cx="880" cy="740" r="420" fill="url(#yDs)" opacity="' + (.5 * (1 - dk)) + '"/>';
  if (!o.old && o.props !== 0) { // Sonnenblumen am Zaun (wiegen sich), Heuballen, Futtertrog, Koerner
    for (const [x, h, ph] of (o.part === 2 ? [[1010, 160, 2.2]] : [[790, 150, 0], [840, 118, 1.3]])) { const w = 5 * Math.sin(t * 1.3 + ph); s += '<path d="M' + x + ' 1040 Q' + (x + w) + ' ' + (1040 - h / 2) + ' ' + (x + w * 2) + ' ' + (1040 - h) + '" stroke="#1F7A3E" stroke-width="9" fill="none" stroke-linecap="round"/><ellipse cx="' + (x + w + 16) + '" cy="' + (1040 - h * .5) + '" rx="20" ry="9" fill="#2A9450" transform="rotate(-24 ' + (x + w + 16) + ' ' + (1040 - h * .5) + ')"/>'; for (let i = 0; i < 10; i++) s += '<ellipse cx="' + (x + w * 2) + '" cy="' + (1040 - h - 30) + '" rx="9" ry="20" fill="#FFD23F" stroke="#0B1020" stroke-width="3" transform="rotate(' + (i * 36) + ' ' + (x + w * 2) + ' ' + (1040 - h) + ')"/>'; s += '<circle cx="' + (x + w * 2) + '" cy="' + (1040 - h) + '" r="17" fill="#6B4226" stroke="#0B1020" stroke-width="4"/>'; }
    if (o.part !== 2) s += '<rect x="880" y="1010" width="150" height="74" rx="14" fill="#E8C766" stroke="#0B1020" stroke-width="5"/><path d="M894 1030 H1016 M894 1050 H1016 M894 1068 H1016" stroke="#C9A441" stroke-width="5"/><rect x="930" y="954" width="110" height="60" rx="12" fill="#F0D27A" stroke="#0B1020" stroke-width="5"/><path d="M942 972 H1028 M942 992 H1028" stroke="#C9A441" stroke-width="5"/>';
    if (o.part !== 2) s += '<path d="M330 1066 L350 1108 H470 L490 1066 Z" fill="#8B5E3C" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><path d="M338 1070 H482" stroke="#6FC3F0" stroke-width="10" stroke-linecap="round"/>';
    for (let i = 0; i < 12; i++) s += '<circle cx="' + (430 + 300 * rnd(i + 61)).toFixed(0) + '" cy="' + (1126 + 34 * rnd(i + 77)).toFixed(0) + '" r="4" fill="#F2D06B"/>'; }
  return s; }
const peckD = t => Math.max(0, Math.sin(t * 5.2)) * (Math.sin(t * 1.3) > -.2 ? 1 : 0);

// ---------- Einstieg ----------
// Gag aus dem Objekt: Beim Nachsatz wird das Huhn zum T. rex. Er bruellt Schalti an (der wird zurueckgedrueckt), stapft auf ihn zu,
// senkt den Kopf und schnappt. Schalti rennt rechts aus dem Bild, der T. rex hinterher. Schalti kommt links wieder, das Huhn laeuft von rechts zurueck.
const RXD = [700, 1118];
WORLD.h7dino = function (sc, ev, t, lt) { const e = ev.gag, hit = e !== undefined && e >= .5 ? e - .5 : undefined, sh = shake7(hit, t), look = since3(sc, 3, lt) >= 0;
  let s = yardD(t, {});
  if (e === undefined) s += hend(RXD[0], RXD[1], 1.25, t, { peck: look ? 0 : peckD(t), tilt: look ? 16 : 0 });
  else if (e < 2.9) { const k = cl((e - .22) / .3);
    if (e < .42) s += hend(RXD[0] + 7 * Math.sin(t * 60), RXD[1], 1.25 + .6 * cl(e / .42), t, { flap: 1 });
    if (k > 0) { const ap = ease(cl((e - 1.1) / .6)), ch = cl((e - 1.95) / .85), x = ch > 0 ? lerp(640, 1760, ch * ch * .4 + ch * .6) : lerp(RXD[0], 640, ap), y = lerp(RXD[1], 1200, ap), z = lerp(1.0, 1.25, ap) * back(k);
      const snap = e >= 1.7 && e < 1.9 ? Math.sin(Math.PI * (e - 1.7) / .2) : 0, jaw = e < 1.1 ? .75 + .25 * Math.abs(Math.sin(t * 24)) : ch > 0 ? .35 + .2 * Math.abs(Math.sin(t * 13)) : .12 + .88 * snap, head = e < 1.1 ? 6 : ch > 0 ? 0 : 30 * ap + 8 * snap;
      if (e >= .5 && e < 1.1) s += roard(RXD[0] - 300, RXD[1] - 310, 110, t, cl((e - .5) / .15) * cl((1.1 - e) / .15));
      s += rexd(x, y, z, t, { jaw: jaw, head: head, run: ch > 0 || (ap > 0 && ap < 1), ph: ch > 0 ? undefined : e * 11, flip: ch > 0 }); }
    s += puffb(RXD[0], RXD[1] - 220, (e - .2) / .5, 250);
  } else { const k = ease(cl((e - 2.9) / .9)); s += hend(lerp(1280, RXD[0], k), RXD[1], 1.25, t, { walk: k < 1 }); }
  if (hit !== undefined && hit < 1.1) s += word7('RAWR!', 740, 705, hit, '#FFE14D', 6);
  return W('<g transform="translate(' + (sh[0] * .6) + ' ' + (sh[1] * .6) + ')">' + s + '</g>' + shade3()); };
WMASC.h7dino = (ev, t, lt, sc) => { const e = ev.gag;
  if (e === undefined) return since3(sc, 3, lt) < 0 ? stay3(HOME3, 1, { r: -2 + 2 * Math.sin(t * 2) }) : stay3([lerp(220, 290, ease(cl(since3(sc, 3, lt) / .5))), 1537], 1, { r: 9 });
  if (e < .5) return stay3([lerp(290, 220, cl(e / .3)), 1537], 1, { r: -14 * cl(e / .3) });
  if (e < 1.1) return stay3([lerp(220, 150, ease((e - .5) / .5)) + 5 * Math.sin(t * 44), 1537], 1, { r: -20 + 4 * Math.sin(t * 36) });
  if (e < 1.7) return stay3([lerp(150, 200, ease((e - 1.1) / .6)) + 2.5 * Math.sin(t * 50), 1537], 1, { r: -6 });
  if (e < 1.78) return stay3([200, 1537 - 60 * Math.sin(Math.PI * (e - 1.7) / .16)], 1, { r: -10 });
  return flee3(e, t, 1.78, 2.45, 2.95, 3.6); };

// ---------- Teil 1: vom Raubsaurier zum Vogel ----------
// Das Huhn wird an Ort und Stelle zum kleinen Raubsaurier. Er bekommt Federn, setzt sich aufs Nest, bekommt Fluegel und hebt als Vogel ab.
// Schalti schleicht zum Nest, der Saurier schnappt nach ihm. Am Ende umkreist der Vogel Schalti.
const snapD = ev => ev.p2 === undefined || ev.act !== undefined ? 0 : Math.max(0, Math.sin(Math.PI * cl((ev.p2 - 1.5) / .5)));
WORLD.d1a = function (sc, ev, t, lt) { const pa = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act;
  let s = yardD(t, {});
  const mk = pa === undefined ? 0 : cl((pa - .35) / .5);
  if (a === undefined || a < 1.7) { if (mk < .5) s += hend(DB[0], DB[1], 1.25 * (1 - .4 * mk * 2), t, { peck: pa === undefined ? peckD(t) : 0, flap: mk > 0 ? 1 : 0 });
    if (mk > .3) { const sn = snapD(ev), sit = p2 === undefined || a !== undefined ? (a !== undefined ? 1 - cl(a / .3) : 0) : ease(cl(p2 / .5)) * (1 - sn), shr = a === undefined ? 1 : 1 - .42 * ease(cl((a - .2) / 1.0)), up = a === undefined ? 0 : ease(cl((a - 1.0) / .7));
      if (p2 !== undefined) { const nk = back(cl(p2 / .4)) * (a === undefined ? 1 : 1 - cl((a - .2) / .4)); if (nk > 0) s += '<g transform="translate(' + (DB[0] + 30) + ' ' + (DB[1] + 8) + ') scale(' + nk + ')"><ellipse cx="0" cy="6" rx="176" ry="18" fill="#000" opacity=".2"/><ellipse cx="0" cy="0" rx="160" ry="44" fill="#8B5E3C" stroke="#0B1020" stroke-width="6"/><path d="M-150 -6 q30 -24 60 0 q30 -24 60 0 q30 -24 60 0 q30 -24 60 0 q30 -24 60 0" stroke="#C9A36A" stroke-width="8" fill="none" stroke-linecap="round"/>' + [-96, -36, 26, 88].map((x, i) => '<ellipse cx="' + x + '" cy="-24" rx="27" ry="36" fill="#FFF5DC" stroke="#0B1020" stroke-width="5"/><circle cx="' + (x - 6) + '" cy="' + (-32 + i * 3) + '" r="5" fill="#E8C9A0"/>').join('') + '</g>'; }
      s += rexd(DB[0] - 70 * sn, DB[1] - 4 - 240 * up, .9 * back(cl((mk - .3) / .5)) * shr, t, { kind: 'rap', pal: RAPD, id: 'r', feath: p1 === undefined ? 0 : back(cl(p1 / .5)), sit: sit, jaw: sn > 0 ? sn : (pa !== undefined && pa < 1.4 ? .5 * Math.abs(Math.sin(t * 9)) : 0), head: sn > 0 ? 24 * sn : (p1 !== undefined && p1 < 1.2 ? -10 : 4 * Math.sin(t * 1.9)), wing: a === undefined ? 0 : ease(cl((a - .3) / .7)), shadow: up > .1 ? 0 : 1 }); }
    s += puffb(DB[0], DB[1] - 150, pa === undefined ? -1 : (pa - .35) / .55, 190);
    if (p1 !== undefined && p1 < 1.4) for (let i = 0; i < 6; i++) { const k = cl((p1 - .15 - i * .06) / 1.1); if (k > 0 && k < 1) s += '<path transform="translate(' + (DB[0] - 120 + i * 50 + 30 * Math.sin(k * 6 + i)) + ' ' + (DB[1] - 330 + 300 * k) + ') rotate(' + (40 * Math.sin(k * 7 + i)) + ')" d="M0 0 Q14 -8 34 0 Q14 8 0 0 Z" fill="' + ['#FFD23F', '#FF6BD6'][i % 2] + '" stroke="#0B1020" stroke-width="3" opacity="' + (1 - k) + '"/>'; }
  }
  if (a !== undefined && a >= 1.5) { const k = ease(cl((a - 1.5) / .9)), o = Math.max(0, (a - 2.4) * 2.3), k2 = ease(cl(o / 2.0)), bx = k < 1 ? lerp(DB[0], 560, k) : lerp(560, 205, k2), by = k < 1 ? lerp(DB[1] - 380, 880, k) : lerp(880, 728, k2) - 70 * Math.sin(Math.PI * k2);
    s += puffb(DB[0], DB[1] - 360, (a - 1.5) / .45, 120) + '<g transform="translate(' + (2 * bx) + ' 0) scale(-1 1)">' + birdb(bx, by + 12 * Math.sin(t * 2.3), 1.15, t, '#FFD23F') + '</g>'; }
  if (p2 !== undefined && a === undefined) s += chip3(800, 760, 'hohle Knochen', 38, '#F4F6FB', '#0B1020', (p2 - .5) / .3);
  return W(s + shade3(), slot(ev, [['panel', 'Die Vorfahren: kleine Raubsaurier'], ['p1', 'Federn gab es schon vor den Vögeln', 'hot'], ['p2', 'Hohle Knochen, Brüten auf dem Nest'], ['act', 'Kleiner, leichter, Flügel', 'hot']])); };
WMASC.d1a = (ev, t) => { const p1 = ev.p1, p2 = ev.p2, a = ev.act;
  if (a !== undefined) return a < 2.4 ? stay3(HOME3, 1, { r: -8 + 2 * Math.sin(t * 2) }) : stay3([220, 1537 - 14 * Math.abs(Math.sin(t * 7)) * cl((a - 3.0) / .4)], 1, { r: -12 * cl((a - 2.4) / .6) });
  if (p2 !== undefined) { if (p2 < .9) return BIG3(); if (p2 < 1.5) return stay3([lerp(220, 340, ease((p2 - .9) / .6)), 1537 - 8 * Math.abs(Math.sin(t * 12))], 1, { r: 10 }); if (p2 < 2.0) return hop3((p2 - 1.5) / .5, [340, 1537], HOME3, 80, 1, 1, { r: -16 }); return stay3([220 + 4 * Math.sin(t * 34) * cl(1 - (p2 - 2) / .5), 1537], 1); }
  if (p1 !== undefined && p1 < 1.4) return stay3([lerp(220, 270, ease(cl(p1 / .4))), 1537], 1, { r: 8 }); return BIG3(); };

// ---------- Teil 2: der Baum auf dem Hof als Stammbaum ----------
// T. rex und Huhn sitzen an derselben Astgabel, das Krokodil auf einem anderen Ast. Der T. rex bruellt zu Schalti herunter, das Krokodil schnappt, das Huhn plustert sich auf.
WORLD.d1b = function (sc, ev, t, lt) { const p1 = ev.p1, p2 = ev.p2, a = ev.act;
  let s = yardD(t, { part: 2 }) + treeb(t, cl((lt - .3) / 1.1), p2 === undefined ? 0 : cl((p2 - 1.2) / .6));
  if (p1 !== undefined) { const k = cl(p1 / .6); s += '<rect x="440" y="676" width="500" height="210" rx="54" fill="#A8E63C" fill-opacity="' + (.18 * k) + '" stroke="#A8E63C" stroke-width="9" stroke-dasharray="26 16" stroke-dashoffset="' + (-t * 30) + '" opacity="' + k + '"/>'; }
  if (p2 !== undefined) s += crocb(TB.c[0] + 50, TB.c[1] + 4, .7 * back(cl(p2 / .4)), t, { jaw: a === undefined && p2 > .5 && p2 < 1.3 ? Math.abs(Math.sin(t * 16)) : .15 * Math.abs(Math.sin(t * 2)) });
  if (p1 !== undefined) { const roar = p1 > .5 && p1 < 1.5 && p2 === undefined; if (roar) s += roard(TB.r[0] - 80, TB.r[1] - 110, 125, t, cl((p1 - .5) / .15) * cl((1.5 - p1) / .15)); s += rexd(TB.r[0] + 34, TB.r[1] + 2, .4 * back(cl((p1 - .2) / .4)), t, { jaw: roar ? .7 + .3 * Math.abs(Math.sin(t * 24)) : 0, head: roar ? 26 : (a !== undefined ? 10 * Math.sin(Math.PI * cl(a / .8)) : 0), shadow: 0, id: 't' }); }
  const hk = back(cl((lt - 1.2) / .4)), hj = a === undefined ? 0 : 60 * Math.abs(Math.sin(Math.PI * cl(a / .5)));
  if (a !== undefined) for (let i = 0; i < 2; i++) { const c = (t * .9 + i / 2) % 1; s += '<circle cx="' + (TB.h[0] + 6) + '" cy="' + (TB.h[1] - 80) + '" r="' + (86 + 60 * c) + '" fill="none" stroke="#FFE14D" stroke-width="8" opacity="' + (.8 * (1 - c) * cl(a / .4)) + '"/>'; }
  s += hend(TB.h[0] + 6, TB.h[1] - hj, .68 * hk, t, { flap: a !== undefined && a < 1.2 ? 1 : 0, tilt: p1 !== undefined && p2 === undefined ? -14 : 0 });
  if (p2 !== undefined && a === undefined) s += chip3(706, 1034, 'eng verwandt', 36, '#FFE14D', '#0B1020', (p2 - 1.6) / .3);
  if (a !== undefined) s += chip3(690, 1090, 'lebender Dinosaurier', 38, '#A8E63C', '#0B1020', (a - .4) / .3);
  return W(s + shade3(), slot(ev, [['panel', 'Mehr als nur verwandt'], ['p1', 'Diese Äste: Dinosaurier', 'hot'], ['p2', 'T. rex und Huhn: gleiche Astgabel'], ['act', 'Dein Huhn: ein Dinosaurier', 'hot']])); };
WMASC.d1b = (ev, t) => { const p1 = ev.p1, p2 = ev.p2, a = ev.act;
  if (a !== undefined) return stay3([220, 1537 - 30 * Math.abs(Math.sin(Math.PI * cl(a / .5)))], 1, { r: 5 });
  if (p2 !== undefined) return p2 > .5 && p2 < 1.3 ? stay3([lerp(220, 170, ease((p2 - .5) / .3)) + 4 * Math.sin(t * 40), 1537], 1, { r: -12 }) : stay3([lerp(170, 220, ease(cl((p2 - 1.3) / .4))), 1537], 1, { r: 4 * Math.sin(t * 2.4) });
  if (p1 !== undefined && p1 > .5 && p1 < 1.5) return stay3([lerp(220, 170, ease((p1 - .5) / .3)) + 5 * Math.sin(t * 38), 1537], 1, { r: -16 + 3 * Math.sin(t * 30) }); return BIG3(); };

// ---------- Teil 3: derselbe Ort vor 66 Millionen Jahren ----------
// Ein T. rex stapft durchs Bild und schaut zum Himmel, als der Asteroid kommt. Einschlag am Ende des ersten Satzes, Schalti taumelt.
// Der kleine Vogel fluechtet zu Schalti und bleibt bei ihm. Danach wieder heute: der Hof, das Huhn, rund 11.000 Vogelarten.
const impD = (sc) => Math.max(1.2, dur3(sc, 0) - .7);
WORLD.d1c = function (sc, ev, t, lt) { const pa = ev.panel, p1 = ev.p1, p2 = ev.p2, a = ev.act, ti = impD(sc), hit = pa !== undefined && pa >= ti ? pa - ti : undefined, sh = shake7(hit, t);
  const dark = hit === undefined ? 0 : a === undefined ? ease(cl(hit / 1.0)) : 1 - ease(cl(a / .8));
  let s = yardD(t, { old: 1, dark: dark });
  if (pa !== undefined && hit === undefined) { const k = cl((pa - (ti - .9)) / .9), ax = lerp(1160, 470, k * k), ay = lerp(520, 990, k * k); if (k > 0) s += '<path d="M' + ax + ' ' + ay + ' L' + (ax + 260) + ' ' + (ay - 178) + '" stroke="#FFB03D" stroke-width="34" stroke-linecap="round" opacity=".55"/><path d="M' + ax + ' ' + ay + ' L' + (ax + 170) + ' ' + (ay - 116) + '" stroke="#FFF1C4" stroke-width="18" stroke-linecap="round"/><circle cx="' + ax + '" cy="' + ay + '" r="30" fill="#6B5A52" stroke="#0B1020" stroke-width="5"/><circle cx="' + (ax - 8) + '" cy="' + (ay - 6) + '" r="8" fill="#4A3C36"/>'; }
  if (hit !== undefined && a === undefined) { s += '<ellipse cx="470" cy="1010" rx="' + (200 + 500 * ease(cl(hit / .8))) + '" ry="' + (60 + 150 * ease(cl(hit / .8))) + '" fill="#FFB03D" opacity="' + (.55 * (1 - cl(hit / 2.5)) + .12) + '"/>'; for (let i = 0; i < 5; i++) { const c = (t * .25 + i / 5) % 1; s += '<circle cx="' + (380 + i * 50 + 30 * Math.sin(t + i)) + '" cy="' + (990 - 260 * c) + '" r="' + (40 + 70 * c) + '" fill="#2A2020" opacity="' + (.5 * (1 - c) * cl(hit / .6)) + '"/>'; } }
  const gone = p2 === undefined ? 0 : ease(cl(p2 / 1.2));
  let front = '';
  if (a === undefined || a < .4) { const wi = ease(cl(lt / 1.3)), lookup = pa !== undefined && hit === undefined ? cl((pa - (ti - 1.0)) / .4) : 0;
    if (gone < 1) s += '<g style="filter:grayscale(' + gone + ')">' + rexd(lerp(930, 560, wi), DB[1] + 40 * gone, .95, t, { op: 1 - gone, run: wi < 1, ph: lt * 8, head: hit !== undefined ? 26 : -26 * lookup, sit: hit === undefined ? 0 : .7 * ease(cl(hit / .5)), jaw: hit !== undefined && hit < 1.2 ? .8 : .1 * lookup, id: 'u' }) + '</g>';
    // der kleine Vogel: erst hinten, dann fluechtet er nach vorn zu Schalti
    const fk = hit === undefined ? 0 : ease(cl((hit - .3) / .9)), bx = lerp(900, 430, fk), by = lerp(DB[1] + 6, 1530, fk);
    front = hend(bx, by, lerp(.44, .62, fk), t, { c1: '#E3C08A', c2: '#B58A4E', id: 'v', walk: fk > 0 && fk < 1, flap: fk > 0 && fk < 1 ? 1 : 0, peck: fk >= 1 && p2 !== undefined && p2 > 1.3 ? peckD(t) : 0 }); if (fk < .5) { s += front; front = ''; } }
  else { s = wipe3(s, yardD(t, {}) + hend(830, DB[1], 1.05, t, { peck: peckD(t) }), a - .4, .6, '#A8E63C'); }
  if (p1 !== undefined && p2 === undefined) ['🦖', '🦕', '🐙', '🐦'].forEach((em, i) => { const k = back(cl((p1 - i * .08) / .3)), x = 250 + i * 180, dead = i < 3 ? cl((p1 - .9 - i * .25) / .3) : 0;
    s += '<g transform="translate(' + x + ' 740) scale(' + (k * .8) + ')"><circle r="74" fill="' + (dead > .5 ? '#3A3A44' : '#F4F6FB') + '" stroke="#0B1020" stroke-width="6"/><text y="34" text-anchor="middle" font-size="92" font-family="Noto Color Emoji" opacity="' + (1 - .65 * dead) + '">' + em + '</text>' + (dead > 0 ? '<path d="M-52 -52 L' + (-52 + 104 * dead) + ' ' + (-52 + 104 * dead) + ' M52 -52 L' + (52 - 104 * dead) + ' ' + (-52 + 104 * dead) + '" stroke="#FF4D4D" stroke-width="16" stroke-linecap="round"/>' : '') + (i === 3 && p1 > 1.8 ? '<circle r="' + (84 + 6 * Math.sin(t * 8)) + '" fill="none" stroke="#A8E63C" stroke-width="9"/>' : '') + '</g>'; });
  if (a !== undefined && a > .9) { const n = Math.round(11000 * ease(cl((a - .9) / 1.1)) / 100) * 100, k = back(cl((a - .9) / .3));
    for (let i = 0; i < 9; i++) { const c = ((t * (.16 + .07 * rnd(i + 5)) + rnd(i + 9)) % 1); s += birdb(-120 + 1320 * c, 690 + 250 * rnd(i + 31) + 18 * Math.sin(t * 2 + i), .34 + .3 * rnd(i + 51), t, ['#FFD23F', '#FF6B6B', '#5CE1FF', '#fff'][i % 4], i); }
    s += '<g transform="translate(520 860) scale(' + k + ')">' + svgT(0, 0, n.toLocaleString('de-DE'), 150, '#fff').replace('<text', '<text stroke="#0B1020" stroke-width="22" stroke-linejoin="round" paint-order="stroke"') + '</g>' + chip3(520, 940, 'Vogelarten', 46, '#A8E63C', '#0B1020', (a - 1.3) / .3); }
  const fl = hit === undefined ? 0 : 1 - cl(hit / .35);
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + front + '</g>' + (fl > 0 ? '<rect width="1080" height="1920" fill="#fff" opacity="' + (.85 * fl) + '"/>' : '') + shade3(), slot(ev, [['panel', 'Vor 66 Millionen Jahren'], ['p1', 'Drei von vier Arten: weg', 'red'], ['p2', 'Übrig von den Dinos: ein paar Vögel', 'hot'], ['act', 'Heute: rund 11.000 Vogelarten', 'hot']])); };
WMASC.d1c = (ev, t, lt, sc) => { const pa = ev.panel, ti = impD(sc); if (pa !== undefined && pa >= ti && pa < ti + 1.1 && ev.p1 === undefined) { const h = pa - ti; return stay3([220 + 8 * Math.sin(t * 42) * (1 - h / 1.1), 1537 - 30 * Math.abs(Math.sin(Math.PI * cl(h / .4)))], 1, { r: -18 * (1 - h / 1.1) + 5 * Math.sin(t * 30) }); }
  if (pa !== undefined && pa < ti && pa > ti - 1.0) return stay3(HOME3, 1, { r: -10 });
  if (ev.p2 !== undefined && ev.act === undefined) return stay3(HOME3, 1, { r: 8 }); return ev.act !== undefined ? stay3(HOME3, 1, { r: -6 + 2 * Math.sin(t * 2) }) : BIG3(); };

// ---------- Schluss: das Huhn laeuft zu Schalti und pickt neben ihm ----------
WORLD.d1outro = function (sc, ev, t, lt) { const k = ease(cl((lt - .3) / 1.6)); return W(yardD(t, {}) + '<rect width="1080" height="1920" fill="#02030F" opacity=".38"/>' + hend(lerp(1250, 560, k), 1540, .95, t, { walk: k < 1, peck: k >= 1 ? peckD(t) : 0 }) + shade3()); };
['h7dino', 'd1a', 'd1b', 'd1c', 'd1outro'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
