// B014 "Haben Dinosaurier jemals Schnee gesehen?" (Bio, Dino-Skript Hook-Fassung v3 und Neue Werkzeuge, Kostuem B1 Dino-Forscher), stumme Demo v1 (26.11.2026).
// Ort: Flussebene im Norden von Alaska vor rund 70 Millionen Jahren, Nadelbaeume, im Sommer gruen, im Winter verschneit.
// Pro Teil eine andere Animationsart: Einstieg Stapfen im Schneetreiben und Bruellen, Teil 1 Jahreszeit wechselt am Ort und Beschnuppern,
// Teil 2 Zeitraffer mit Sonnenlauf (Mitternachtssonne, Polarnacht), Teil 3 die eine Lupe (Zaehnchen neben Stecknadel) und Babys, eines sucht Schutz bei Schalti.
// Tyrannosaurier als gezeichnete Figur rexd (keine bestimmte Art, keine Aussage zu Federn oder Groesse). Nutzt rexd, roard, lowD (viz_dino.js), lupeH, slot, stay3.
// Zum Loeschen: diese Datei und videos/B014.
const ST14 = '#0B1020', RX14 = 600, RY14 = 1118, RS14 = .7; // Fuesse ueber dem Untertitel-Band
const mv14 = (a, b, k) => lerp(a, b, ease(cl(k)));
const tx14 = (x, y, s, size, col) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" font-weight="900" fill="' + (col || '#fff') + '" font-family="Inter Display, Inter, Arial, sans-serif">' + s + '</text>';

// ---------- Ort: arktische Flussebene. w: Winter 0..1 (Schnee am Boden), dark: Nacht 0..1, fall: Schneefall 0..1, sun: [x, y] oder null ----------
function land14(t, o) { o = o || {}; const w = cl(o.w || 0), dk = cl(o.dark || 0);
  let s = '<defs><linearGradient id="sk14" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E93D6"/><stop offset=".75" stop-color="#F3D9B6"/></linearGradient><linearGradient id="gr14" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FA85A"/><stop offset="1" stop-color="#4E7A3C"/></linearGradient></defs>';
  s += '<rect width="1080" height="1300" fill="url(#sk14)"/><rect width="1080" height="1300" fill="#0A1230" opacity="' + (.85 * dk).toFixed(2) + '"/>';
  if (dk > .3) for (let i = 0; i < 40; i++) s += '<circle cx="' + (rnd(i + 200) * 1080).toFixed(0) + '" cy="' + (60 + rnd(i + 201) * 760).toFixed(0) + '" r="' + (1.5 + 2 * rnd(i + 202)).toFixed(1) + '" fill="#fff" opacity="' + ((dk - .3) * (.5 + .4 * Math.sin(t + i))).toFixed(2) + '"/>';
  const sun = o.sun === undefined ? [840, 520] : o.sun; if (sun) s += '<circle cx="' + sun[0].toFixed(0) + '" cy="' + sun[1].toFixed(0) + '" r="70" fill="#FFE9A8" opacity="' + (.35 * (1 - dk)).toFixed(2) + '"/><circle cx="' + sun[0].toFixed(0) + '" cy="' + sun[1].toFixed(0) + '" r="44" fill="#FFF3C9"/>';
  // Berge mit Schneekappen
  s += '<path d="M0 960 L140 830 L250 900 L400 780 L560 900 L700 810 L860 910 L1000 820 L1080 870 V1000 H0 Z" fill="#8090B0"/><path d="M110 858 L140 830 L170 858 Z M370 806 L400 780 L432 806 Z M670 836 L700 810 L732 836 Z M970 846 L1000 820 L1030 846 Z" fill="#F4F8FF"/>';
  s += '<rect width="1080" height="1000" fill="#0A1230" opacity="' + (.5 * dk).toFixed(2) + '"/>';
  // Ebene, Fluss
  s += '<rect x="0" y="990" width="1080" height="310" fill="url(#gr14)"/><rect x="0" y="990" width="1080" height="310" fill="#EEF4FF" opacity="' + (.95 * w).toFixed(2) + '"/>';
  s += '<path d="M0 1215 Q260 1180 520 1220 T1080 1205 V1262 Q800 1276 520 1268 T0 1270 Z" fill="' + (w > .6 ? '#BFD8EE' : '#4F86C2') + '" stroke="#E8F4FF" stroke-width="4"/>';
  // Nadelbaeume hinten, mit Schnee im Winter
  [[60, 1010, 1], [180, 1000, .8], [930, 1004, 1.1], [1020, 1012, .9], [820, 996, .7], [330, 996, .7]].forEach(([x, y, z], i) => { const h = 150 * z, b = 46 * z;
    s += '<rect x="' + (x - 6 * z) + '" y="' + (y - 20 * z) + '" width="' + (12 * z) + '" height="' + (24 * z) + '" fill="#5A3A26"/>';
    for (let k = 0; k < 3; k++) { const yy = y - 20 * z - k * h * .28, ww = b * (1 - k * .25); s += '<path d="M' + (x - ww) + ' ' + yy.toFixed(0) + ' L' + x + ' ' + (yy - h * .42).toFixed(0) + ' L' + (x + ww) + ' ' + yy.toFixed(0) + ' Z" fill="#2E5A3A" stroke="' + ST14 + '" stroke-width="3"/>' + (w > .05 ? '<path d="M' + (x - ww * .7) + ' ' + (yy - 8) + ' L' + x + ' ' + (yy - h * .42).toFixed(0) + ' L' + (x + ww * .7) + ' ' + (yy - 8) + ' Q' + x + ' ' + (yy - 22) + ' ' + (x - ww * .7) + ' ' + (yy - 8) + ' Z" fill="#F4F8FF" opacity="' + w.toFixed(2) + '"/>' : ''); } });
  // vordere Wiese
  s += '<rect x="0" y="1300" width="1080" height="620" fill="#3E6A30"/><rect x="0" y="1300" width="1080" height="620" fill="#E6EEF8" opacity="' + (.92 * w).toFixed(2) + '"/>';
  // untere Wiese: Schachtelhalme, Steine, Buesche (Schaltis Platz links bleibt frei)
  [[520, 1640], [610, 1700], [880, 1630], [980, 1760], [760, 1800]].forEach(([x, y], i) => { s += '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (34 + 12 * (i % 2)) + '" ry="18" fill="#8A8F9C" stroke="' + ST14 + '" stroke-width="4"/>' + (w > .05 ? '<path d="M' + (x - 30) + ' ' + (y - 8) + ' Q' + x + ' ' + (y - 30) + ' ' + (x + 30) + ' ' + (y - 8) + '" fill="#F4F8FF" opacity="' + w.toFixed(2) + '"/>' : ''); });
  [[410, 1600], [700, 1620], [820, 1700], [1000, 1640], [560, 1760]].forEach(([x, y], i) => { for (let k = -1; k <= 1; k++) s += '<path d="M' + (x + k * 12) + ' ' + y + ' q' + (k * 4) + ' -40 ' + (k * 10 + 2 * Math.sin(t + i)) + ' -' + (70 + 10 * k) + '" stroke="' + (w > .6 ? '#7A8A6A' : '#5A8A3A') + '" stroke-width="7" fill="none" stroke-linecap="round"/>'; });
  if (o.dig) s += '<ellipse cx="540" cy="1330" rx="70" ry="20" fill="#C9A77A" stroke="' + ST14 + '" stroke-width="4"/>';
  s += '<rect x="0" y="1300" width="1080" height="620" fill="#0A1230" opacity="' + (.45 * dk).toFixed(2) + '"/>';
  return s; }
function snow14(t, k) { if (k <= .02) return ''; let s = ''; for (let i = 0; i < 60; i++) { const c = (t * (.08 + .06 * rnd(i + 300)) + rnd(i + 301)) % 1, x = rnd(i + 302) * 1080 + 30 * Math.sin(t * 1.3 + i); s += '<circle cx="' + x.toFixed(0) + '" cy="' + (40 + 1560 * c).toFixed(0) + '" r="' + (4 + 5 * rnd(i + 303)).toFixed(1) + '" fill="#fff" opacity="' + (.9 * k).toFixed(2) + '"/>'; } return s; }
function puff14(x, y, k) { if (k <= 0 || k >= 1) return ''; let s = ''; for (let i = 0; i < 6; i++) { const a = Math.PI + i * Math.PI / 5; s += '<circle cx="' + (x + Math.cos(a) * 40 * k).toFixed(0) + '" cy="' + (y - 10 + Math.sin(a) * 20 * k).toFixed(0) + '" r="' + (10 + 14 * k).toFixed(0) + '" fill="#fff" opacity="' + (.8 * (1 - k)).toFixed(2) + '"/>'; } return s; }
function breath14(x, y, t, k) { if (k <= .02) return ''; const c = (t * .7) % 1; return '<circle cx="' + (x - 40 * c).toFixed(0) + '" cy="' + (y - 20 * c).toFixed(0) + '" r="' + (14 + 26 * c).toFixed(0) + '" fill="#F4F8FF" opacity="' + (.6 * k * (1 - c)).toFixed(2) + '"/>'; }
const rex14 = (t, o) => rexd(RX14 + (o.dx || 0), RY14, RS14, t, Object.assign({ id: 'm14' }, o));
const baby14 = (x, t, o) => rexd(x, RY14 + 8, .24, t, Object.assign({ id: 'b' + x }, o || {}));
const rap14 = (x, t, o) => rexd(x, RY14 + 8, .25, t, Object.assign({ id: 'r' + x, kind: 'rap', feath: 1, pal: { a: '#5C8BFF', b: '#2E4FB0' } }, o || {}));

// ---------- Einstieg ----------
WORLD.b14Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop;
  const walk = lt < 2.6, dx = mv14(170, 0, lt / 2.6); let s = land14(t, { w: 1, fall: 1, sun: null, dark: .25 });
  s += rex14(t, { dx: dx, run: walk ? 1 : 0, ph: lt * 8, head: fr !== undefined && lo === undefined ? 10 * Math.sin(fr * 6) : lo !== undefined ? -8 : 4, jaw: lo !== undefined ? Math.sin(Math.PI * cl((lo - .3) / 1.6)) : 0 });
  if (walk) s += puff14(RX14 + dx - 30, RY14, (lt * 1.3) % 1);
  if (lo !== undefined) s += roard(RX14 - 250, RY14 - 330, 180, t, Math.sin(Math.PI * cl((lo - .3) / 1.8)));
  return W(s + snow14(t, 1) + shade3()); };
WMASC.b14Hook = (ev, t, lt) => { const lo = ev.loop;
  if (lo !== undefined) { const k = cl((lo - .5) / 1); return stay3([mv14(220, 130, k), 1537 - 10 * Math.abs(Math.sin(t * 10)) * (k > 0 && k < 1 ? 1 : 0)], 1, { walk: k > 0 && k < 1 ? 1 : 0, r: -10 * (1 - k) * cl(lo / .5), mood: 'shock' }); }
  return stay3([220, 1537], 1, { r: 3 * Math.sin(t * 30) * .5, mood: 'shock' }); };

// ---------- Teil 1: Dinos in Alaska ----------
WORLD.b14Alaska = function (sc, ev, t, lt) { const al = ev.alaska, wi = ev.winter, re = ev.rex;
  const w = wi === undefined ? 0 : ease(cl(wi / 1.1)), dk = .4 * w; let s = land14(t, { w: w, dark: dk, sun: [840, lerp(520, 900, w)] });
  const sn = re === undefined ? 0 : Math.sin(Math.PI * cl((re - .3) / 1.6));
  s += rex14(t, { head: 30 * sn, jaw: .2 * sn }) + breath14(RX14 - 260, RY14 - 260 + 120 * sn, t, w);
  return W(s + snow14(t, w) + shade3(), slot(ev, [['alaska', 'Alaska, vor 70 Mio. Jahren'], ['winter', 'Winter: dunkel, Frost, Schnee', 'hot'], ['rex', 'Tyrannosaurier']])); };
WMASC.b14Alaska = (ev, t, lt) => { const re = ev.rex;
  if (re !== undefined) { const fr = Math.sin(Math.PI * cl((re - .3) / 1.6)); return stay3([220 - 10 * fr, 1537], 1, { r: -6 * fr, mood: fr > .2 ? 'shock' : 'happy' }); }
  return stay3([mv14(130, 220, lt / .8), 1537], 1, { walk: lt < .8 ? 1 : 0, r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 2: Licht und Dunkel (Zeitraffer) ----------
WORLD.b14Licht = function (sc, ev, t, lt) { const so = ev.sommer, du = ev.dunkel, sc2 = ev.schnee;
  let sun = [840, 520], dk = 0, w = 0, ring = '';
  if (so !== undefined) { const a = so * 2.2; sun = [540 + 340 * Math.cos(a), 750 + 60 * Math.sin(a)]; ring = '<ellipse cx="540" cy="750" rx="340" ry="60" fill="none" stroke="#FFE14D" stroke-width="5" stroke-dasharray="14 12" opacity=".8"/><circle cx="' + sun[0].toFixed(0) + '" cy="' + sun[1].toFixed(0) + '" r="44" fill="#FFF3C9"/>'; }
  if (du !== undefined) { const k = cl(du / 1.4); sun = [lerp(540 + 340 * Math.cos(so === undefined ? 0 : 99), 300, k), lerp(750, 1080, k)]; dk = ease(k); ring = ''; }
  if (sc2 !== undefined) { dk = 1; w = ease(cl(sc2 / 1.6)); sun = null; }
  let s = land14(t, { w: w, dark: dk, sun: sun }) + ring;
  s += rex14(t, { head: du !== undefined && sc2 === undefined ? 24 + 6 * Math.sin(t * 1.5) : 4 }) + breath14(RX14 - 260, RY14 - 240, t, du !== undefined ? 1 : 0);
  if (du !== undefined && sc2 === undefined) for (let i = 0; i < 5; i++) s += '<path d="M' + (420 + i * 60) + ' 1300 l-6 -26 M' + (420 + i * 60) + ' 1300 l8 -22" stroke="#8A6A3A" stroke-width="5" stroke-linecap="round"/>';
  return W(s + snow14(t, sc2 === undefined ? 0 : 1) + shade3(), slot(ev, [['sommer', 'Sonne geht nicht unter'], ['dunkel', 'Monatelang dunkel', 'hot'], ['schnee', 'Manchmal Schnee']])); };
WMASC.b14Licht = (ev, t, lt) => { const sc2 = ev.schnee; if (sc2 !== undefined) return stay3([220 + 3 * Math.sin(t * 38) * cl(sc2 / .6), 1537], 1, { r: 2 * Math.sin(t * 33), mood: 'shock' }); return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: ev.dunkel !== undefined ? 'shock' : 'happy' }); };

// ---------- Teil 3: Die Babys (die eine Lupe) ----------
function lens14(t) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#C9A77A"/>';
  for (let i = 0; i < 26; i++) s += '<circle cx="' + (-300 + rnd(i + 400) * 600).toFixed(0) + '" cy="' + (-300 + rnd(i + 401) * 600).toFixed(0) + '" r="' + (6 + 10 * rnd(i + 402)).toFixed(0) + '" fill="#A8875C"/>';
  s += '<path d="M-260 120 L180 -60" stroke="#C9CFDB" stroke-width="16" stroke-linecap="round"/><circle cx="210" cy="-72" r="38" fill="#E8384F" stroke="' + ST14 + '" stroke-width="5"/>';
  s += '<g transform="translate(-40 60) scale(1.8)"><path d="M-22 30 Q-24 -10 0 -46 Q24 -10 22 30 Z" fill="#FFF6DF" stroke="' + ST14 + '" stroke-width="5"/><path d="M-12 20 Q0 -20 6 -34" stroke="#E8DCC0" stroke-width="5" fill="none"/></g>';
  s += '<g transform="translate(90 160) rotate(30) scale(1.8)"><path d="M-16 22 Q-18 -8 0 -34 Q18 -8 16 22 Z" fill="#FFF6DF" stroke="' + ST14 + '" stroke-width="5"/></g>';
  return s; }
WORLD.b14Babys = function (sc, ev, t, lt) { const rh = ev.rehook, za = ev.zahn, ar = ev.arten, bl = ev.blieben;
  const w = bl === undefined ? .2 : .2 + .8 * ease(cl(bl / 2)); let s = land14(t, { w: w, dark: .3 * w, sun: [840, lerp(520, 860, w)], dig: 1 });
  if (rh !== undefined && za === undefined) { const c = (t * .9) % 1; s += '<ellipse cx="540" cy="1330" rx="' + (40 + 60 * c).toFixed(0) + '" ry="' + (12 + 18 * c).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="5" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  s += rex14(t, { head: ar !== undefined ? 22 : 4 });
  const bk = ar === undefined ? 0 : cl(ar / .8); if (bk > 0) { s += '<g opacity="' + bk.toFixed(2) + '">' + baby14(bl === undefined ? 380 : mv14(380, 350, (bl - 1.5) / 1.6), t, { run: bl !== undefined && bl > 1.5 && bl < 3.1 ? 1 : 0, ph: t * 14 }) + baby14(880, t) + rap14(110, t) + '</g>'; }
  const lk = za === undefined ? 0 : ease(cl(za / .5)) * (ar === undefined ? 1 : 1 - cl(ar / .4));
  if (lk > 0) s += '<rect width="1080" height="1920" fill="#05071A" opacity="' + (.45 * lk).toFixed(2) + '"/>' + lupeH(540, 740, 170, lens14(t), lk, 540, 1330);
  return W(s + snow14(t, bl === undefined ? 0 : cl(bl / 1)) + shade3(), slot(ev, [['zahn', 'Winzige Zähne', 'hot'], ['arten', 'Fast alle Arten'], ['blieben', 'Zu klein zum Wegziehen']])); };
WMASC.b14Babys = (ev, t, lt) => { const rh = ev.rehook, bl = ev.blieben;
  if (bl !== undefined) { const k = Math.sin(Math.PI * cl((bl - 2.4) / 1.4)); return stay3([220, 1537 - 8 * k], 1, { r: 6 * k, mood: 'happy' }); }
  if (rh !== undefined && ev.zahn === undefined) { const b = Math.sin(Math.PI * cl((rh - .3) / .9)); return stay3([220 + 40 * b, 1537], 1, { flip: 1, r: 18 * b, mood: 'shock' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.b14Out = function (sc, ev, t, lt) { const k = ease(cl(lt / .6)); return W(land14(t, { w: 1, dark: .3, sun: [840, 860] }) + rex14(t, { head: 4 }) + baby14(300, t) + baby14(880, t) + snow14(t, .6) + '<defs><linearGradient id="od14" x1="0" y1="0" x2="0" y2="1"><stop offset=".25" stop-color="#05071A" stop-opacity=".7"/><stop offset=".62" stop-color="#05071A" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#od14)" opacity="' + k.toFixed(2) + '"/>' + shade3()); };
WMASC.b14Out = (ev, t, lt) => stay3([220 + 50 * Math.sin(Math.PI * cl((lt - 1) / 5)), 1537 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });
