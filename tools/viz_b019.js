// B019 "Warum zitterst du, wenn dir kalt ist?" (Bio, Skript Anatomie mit Abschnitt Neue Werkzeuge, Kostuem B4 Skelett-Anzug), stumme Demo v1 (26.11.2026).
// Ort: Bio-Saal mit Tafel (classK). Hauptfigur: Schulskelett auf dem Podest (skelK), zittert mit. Grossbild: Teil 1 Fuehler und Hypothalamus, Teil 2 Hautgefaess wird enger, Teil 3 Muskel zuckt und macht Waerme.
// Nutzt classK, ringK, chalkK, CX/CY/CZ (viz_b007.js), skelK (viz_koerper.js), slot, stay3, shade3. Zum Loeschen: diese Datei und videos/B019.
const SK19 = '#F2C9A0', MU19 = '#E8665A', NV19 = '#FFE14D', VE19 = '#E8384F', CO19 = '#6FC3F0', ST19 = '#0B1020', HX19 = 812, HY19 = 1132;
const ch19 = (x, y, txt, sz, op) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + sz + '" font-weight="800" font-family="Inter Display, Inter, Arial, sans-serif" fill="#F4F6FB" opacity="' + (op === undefined ? .92 : op).toFixed(2) + '">' + txt + '</text>';
const lab19 = (ev, list) => slot(ev, list, 590);
// Skelett auf dem Podest, sh = Zittern 0..1
const fig19 = (t, sh, o) => { o = o || {}; const j = sh > 0 ? (3.5 * Math.sin(t * 47) + 2 * Math.sin(t * 31)) * sh : 0; return '<g transform="translate(' + j.toFixed(1) + ' 0)">' + skelK(HX19, HY19, .8, t, Object.assign({ smile: 1, tilt: 2 * sh * Math.sin(t * 39) }, o)) + '</g>'; };
const flake19 = (x, y, r, op) => '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ')" opacity="' + op.toFixed(2) + '" stroke="#DDF3FF" stroke-width="3" stroke-linecap="round"><path d="M0 ' + (-r) + ' V' + r + ' M' + (-r * .87).toFixed(1) + ' ' + (-r / 2).toFixed(1) + ' L' + (r * .87).toFixed(1) + ' ' + (r / 2).toFixed(1) + ' M' + (-r * .87).toFixed(1) + ' ' + (r / 2).toFixed(1) + ' L' + (r * .87).toFixed(1) + ' ' + (-r / 2).toFixed(1) + '"/></g>';
// Thermometer (lokal), lv = Fuellstand 0..1
function therm19(x, y, lv, h) { h = h || 150; const top = y - h / 2, bot = y + h / 2 - 16, fy = lerp(bot, top + 8, cl(lv));
  return '<rect x="' + (x - 11) + '" y="' + top + '" width="22" height="' + (h - 10) + '" rx="11" fill="#F4F6FB" stroke="' + ST19 + '" stroke-width="3"/><rect x="' + (x - 5) + '" y="' + fy.toFixed(0) + '" width="10" height="' + (bot - fy + 6).toFixed(0) + '" fill="' + VE19 + '"/><circle cx="' + x + '" cy="' + (bot + 6) + '" r="17" fill="' + VE19 + '" stroke="' + ST19 + '" stroke-width="3"/>'; }
// Waermewellen (lokal), k = Staerke 0..1
function heat19(t, x0, x1, y, k, n) { if (k <= .02) return ''; let s = ''; n = n || 4; for (let i = 0; i < n; i++) { const x = lerp(x0, x1, (i + .5) / n), q = (t * .8 + i * .27) % 1, yy = y - 60 * q; s += '<path d="M' + x.toFixed(0) + ' ' + yy.toFixed(0) + ' q8 -10 0 -20 q-8 -10 0 -20" stroke="#FF9A3D" stroke-width="5" fill="none" stroke-linecap="round" opacity="' + (k * Math.sin(Math.PI * q)).toFixed(2) + '"/>'; } return s; }

// ---------- Grossbild Teil 1: Fuehler in der Haut, Nerv zum Hypothalamus, Thermometer innen ----------
function thermo19(t, o) { o = o || {}; let s = '';
  s += '<rect x="-205" y="-14" width="130" height="74" rx="6" fill="#F7D9BE" stroke="' + ST19 + '" stroke-width="3"/><rect x="-205" y="-14" width="130" height="18" rx="6" fill="' + SK19 + '"/>';
  for (let i = 0; i < 6; i++) { const q = (t * .6 + i / 6) % 1; s += flake19(-190 + 22 * i, -80 + 60 * q, 7, .8 * Math.sin(Math.PI * q)); }
  [-180, -140, -100].forEach((x, i) => { const p = o.fu ? .6 + .4 * Math.sin(t * 5 + i) : .5; s += '<circle cx="' + x + '" cy="14" r="9" fill="' + CO19 + '" stroke="' + ST19 + '" stroke-width="2.5" opacity="' + p.toFixed(2) + '"/>'; });
  s += ch19(-140, 88, 'Haut', 28, .95);
  if (o.ne) { s += '<path d="M-100 20 C-50 40 0 34 52 10" fill="none" stroke="' + NV19 + '" stroke-width="7"/>';
    if (o.sig !== undefined && o.sig >= 0 && o.sig <= 1) { const q = o.sig, x = lerp(-100, 52, q), y = lerp(20, 10, q) + 14 * Math.sin(Math.PI * q); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="20" fill="' + NV19 + '" opacity=".45"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="10" fill="#FFF7C2"/>'; } }
  if (o.br) { s += '<g opacity="' + cl(o.br).toFixed(2) + '" transform="translate(-40 0)"><path d="M50 -20 C46 -64 88 -88 122 -82 C162 -78 176 -46 166 -14 C160 6 140 14 116 14 C90 14 56 10 50 -20 Z" fill="#FF8FB0" stroke="' + ST19 + '" stroke-width="3"/><path d="M76 -54 q14 -10 26 2 M114 -64 q16 -4 24 10 M86 -24 q16 -10 30 0 M128 -34 q12 -6 22 6" stroke="#C85A7E" stroke-width="3" fill="none"/>';
    const g = o.hy ? .5 + .5 * Math.sin(t * 6) : 0; s += '<circle cx="104" cy="2" r="' + (9 + 5 * g).toFixed(1) + '" fill="#A8E63C" stroke="' + ST19 + '" stroke-width="2.5"/>' + (o.hy ? ch19(104, 50, 'Hypothalamus', 28, .95) : '') + '</g>'; }
  if (o.th) { s += '<g opacity="' + cl(o.th).toFixed(2) + '">' + therm19(196, 2, o.lv || .55, 150) + ch19(128, 76, '37 °C', 28, .95) + '<circle cx="156" cy="-58" r="8" fill="' + CO19 + '" stroke="' + ST19 + '" stroke-width="2.5"/>' + ch19(156, -74, 'innen', 26, .95) + '</g>'; }
  return s; }

// ---------- Grossbild Teil 2: Hautgefaess wird enger (w 0..1: 1 = weit, 0 = eng), hand: Uebergang zur Hand ----------
function spar19(t, o) { o = o || {}; const w = o.w === undefined ? 1 : o.w, hd = cl(o.hand || 0); let s = '';
  if (hd < 1) { s += '<g opacity="' + (1 - hd).toFixed(2) + '"><rect x="-205" y="-40" width="420" height="104" rx="6" fill="#F7D9BE" stroke="' + ST19 + '" stroke-width="3"/><rect x="-205" y="-40" width="420" height="20" rx="6" fill="' + SK19 + '"/>';
    const th = lerp(10, 30, w); s += '<path d="M-205 32 H215" stroke="#9A2A3A" stroke-width="' + (th + 6).toFixed(1) + '"/><path d="M-205 32 H215" stroke="' + VE19 + '" stroke-width="' + th.toFixed(1) + '"/>';
    const n = Math.round(lerp(3, 9, w)); for (let i = 0; i < n; i++) { const x = -200 + ((t * lerp(60, 140, w) + i * 420 / n) % 410); s += '<circle cx="' + x.toFixed(0) + '" cy="32" r="' + lerp(4, 7, w).toFixed(1) + '" fill="#FFD0D8"/>'; }
    s += heat19(t, -180, 190, -48, .2 + .8 * w, 6);
    s += ch19(-120, 90, 'Blutgefäß', 28, .95) + ch19(120, 90, w < .6 ? 'enger' : 'weit', 28, .95) + '</g>'; }
  if (hd > 0) { const c = '#' + [0, 1, 2].map(i => Math.round(lerp([242, 201, 160][i], [214, 226, 238][i], cl((hd - .3) / .7))).toString(16).padStart(2, '0')).join('');
    s += '<g opacity="' + hd.toFixed(2) + '" transform="translate(-20 -4)"><path d="M-50 90 L-54 10 Q-60 -30 -40 -36 L-38 -80 Q-36 -92 -26 -90 Q-16 -88 -16 -76 L-14 -40 L-10 -92 Q-8 -104 4 -102 Q16 -100 14 -88 L14 -40 L22 -84 Q26 -96 36 -93 Q46 -90 44 -78 L40 -36 L52 -66 Q58 -76 66 -72 Q74 -68 70 -56 L62 -6 Q58 40 40 90 Z" fill="' + c + '" stroke="' + ST19 + '" stroke-width="4" stroke-linejoin="round"/>' + flake19(130, -50, 16, .9) + flake19(-140, -10, 12, .8) + ch19(150, 54, 'kühlt aus', 30, .95) + '</g>'; }
  return s; }

// ---------- Grossbild Teil 3: Muskel am Knochen zuckt rhythmisch und macht Waerme ----------
function zitter19(t, o) { o = o || {}; const z = o.z || 0, tw = z > 0 ? Math.max(0, Math.sin(t * 34)) * z : 0; let s = '<g transform="translate(-16 -10) scale(.86)">';
  s += '<rect x="-190" y="44" width="360" height="30" rx="15" fill="#FFF6DF" stroke="' + ST19 + '" stroke-width="3.5"/><circle cx="-190" cy="59" r="22" fill="#FFF6DF" stroke="' + ST19 + '" stroke-width="3.5"/><circle cx="170" cy="59" r="22" fill="#FFF6DF" stroke="' + ST19 + '" stroke-width="3.5"/><rect x="-188" y="47" width="356" height="24" fill="#FFF6DF"/>';
  const L = 150 * (1 - .06 * tw), H = 34 * (1 + .25 * tw);
  s += '<path d="M' + (-L - 20) + ' 40 L' + (-L + 10) + ' 20 M' + (L + 20 - 40) + ' 40 L' + (L - 10 - 40) + ' 20" stroke="#E9C48A" stroke-width="8" stroke-linecap="round"/>';
  s += '<ellipse cx="-20" cy="' + (8 - 4 * tw).toFixed(1) + '" rx="' + L.toFixed(1) + '" ry="' + H.toFixed(1) + '" fill="' + MU19 + '" stroke="' + ST19 + '" stroke-width="3.5"/>';
  for (let i = -3; i <= 3; i++) s += '<path d="M' + (-20 - L * .8) + ' ' + (8 + i * H * .22).toFixed(1) + ' H' + (-20 + L * .8) + '" stroke="#B9473E" stroke-width="2" opacity=".6"/>';
  s += '<text x="-20" y="66" text-anchor="middle" font-size="22" font-weight="800" font-family="Inter Display, Inter, Arial, sans-serif" fill="#5A4A30">Knochen</text>';
  if (o.hint) s += ch19(-20, 104, 'rot = Muskel', 28, .95);
  s += heat19(t, -150, 110, -32, o.h || 0, 5) + '</g>';
  if (o.m !== undefined) { const v = lerp(.25, .95, ease(cl(o.m / 1.6))); s += '<rect x="190" y="-80" width="24" height="150" rx="10" fill="#1A3A30" stroke="#F4F6FB" stroke-width="3"/><rect x="193" y="' + (67 - 144 * v).toFixed(0) + '" width="18" height="' + (144 * v).toFixed(0) + '" rx="8" fill="#FF9A3D"/>' + ch19(202, -90, 'Wärme', 26, .95); }
  return s; }

// ---------- Einstieg ----------
WORLD.b19Hook = function (sc, ev, t, lt) { const lo = ev.loop, fr = ev.frage; const lv = lerp(.75, .2, ease(cl((lt - .3) / 1.6)));
  let close = '<g>' + therm19(0, 4, lv, 170) + ch19(70, 70, 'kalt', 30, .95); for (let i = 0; i < 8; i++) { const q = (t * .5 + i / 8) % 1; close += flake19(-190 + 50 * i, -86 + 160 * q, 9, .8 * Math.sin(Math.PI * q)); }
  if (lo !== undefined) close += heat19(t, 60, 200, 60, cl(lo / .6), 3);
  close += '</g>';
  const sh = lo === undefined ? cl((lt - .8) / .6) : 1 - .5 * cl(lo / 1);
  let s = classK(t, { close: close }) + fig19(t, sh) + ringK(t, HX19, 830, 70);
  return W(s + shade3()); };
WMASC.b19Hook = (ev, t, lt) => { const lo = ev.loop, sh = lo === undefined ? cl((lt - .6) / .6) : 1 - cl(lo / .8); return stay3([220 + 4 * Math.sin(t * 40) * sh, 1537], 1, { r: 3 * Math.sin(t * 37) * sh, mood: lo !== undefined && lo > .8 ? 'happy' : 'shock' }); };

// ---------- Teil 1: Dein Thermostat ----------
WORLD.b19Thermo = function (sc, ev, t, lt) { const fu = ev.fuehl, me = ev.melden, so = ev.soll;
  const k = fu === undefined ? 0 : cl(fu / .4), sig = me === undefined ? undefined : cl((me - .3) / 1.4);
  const close = k > 0 ? '<g opacity="' + k.toFixed(2) + '">' + thermo19(t, { fu: 1, ne: me !== undefined, sig: sig, br: me === undefined ? 0 : cl((me - .2) / .4), hy: me !== undefined && me > 1.6, th: me !== undefined && me > 4 ? cl((me - 4) / .4) : (so !== undefined ? 1 : 0), lv: so === undefined ? .45 : lerp(.45, .62, ease(cl(so / 1.2))) }) + '</g>' : '';
  let s = classK(t, { close: close }) + fig19(t, .35);
  if (k > 0) s += me === undefined ? ringK(t, 745, 870, 44) : ringK(t, HX19, 716, 56);
  return W(s + shade3(), lab19(ev, [['fuehl', 'Fühler für Temperatur'], ['melden', 'Meldung an den Hypothalamus', 'hot'], ['soll', 'Innen etwa 37 °C']])); };
WMASC.b19Thermo = (ev, t, lt) => stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: ev.melden !== undefined ? 'cool' : 'happy' });

// ---------- Teil 2: Erst sparen ----------
WORLD.b19Spar = function (sc, ev, t, lt) { const en = ev.eng, we = ev.weniger, ha = ev.haende;
  const w = en === undefined ? 1 : 1 - ease(cl((en - .6) / 1.4)), hand = ha === undefined ? 0 : cl(ha / .6);
  const close = '<g>' + spar19(t, { w: w, hand: hand }) + '</g>';
  let s = classK(t, { close: close }) + fig19(t, .35) + ringK(t, 745, 942, 44);
  return W(s + shade3(), lab19(ev, [['eng', 'Hautgefäße werden enger', 'hot'], ['weniger', 'Weniger Wärme geht verloren'], ['haende', 'Hände und Füße kühlen aus']])); };
WMASC.b19Spar = (ev, t, lt) => { const rh = ev.rehook; if (rh !== undefined && ev.eng === undefined) { const j = Math.sin(Math.PI * cl(rh / .7)); return stay3([220, 1537 - 18 * j], 1, { r: -6 * j, mood: 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: ev.haende !== undefined ? 'shock' : 'happy' }); };

// ---------- Teil 3: Dann zittern ----------
WORLD.b19Zitter = function (sc, ev, t, lt) { const zu = ev.zuck, wa = ev.waerme, mh = ev.mehr;
  const k = cl((lt - .2) / .5), z = zu === undefined ? 0 : cl((zu - .6) / .5);
  const close = k > 0 ? '<g opacity="' + k.toFixed(2) + '">' + zitter19(t, { z: z, hint: 1, h: wa === undefined ? 0 : cl(wa / .8), m: mh }) + '</g>' : '';
  let s = classK(t, { close: close }) + fig19(t, zu === undefined ? .35 : .35 + .65 * z);
  if (k > 0) s += ringK(t, HX19 - 22, 985, 52);
  return W(s + shade3(), lab19(ev, [['zuck', 'Muskeln zucken unwillkürlich', 'hot'], ['waerme', 'Muskelarbeit macht Wärme'], ['mehr', 'Ein Mehrfaches an Wärme']])); };
WMASC.b19Zitter = (ev, t, lt) => { const rh = ev.rehook, zu = ev.zuck;
  if (zu !== undefined) { const sh = cl((zu - .6) / .5) * .6; return stay3([220 + 3 * Math.sin(t * 40) * sh, 1537], 1, { r: 2 * Math.sin(t * 37) * sh, mood: ev.mehr !== undefined ? 'cool' : 'shock' }); }
  if (rh !== undefined) { const j = Math.sin(Math.PI * cl(rh / .7)); return stay3([220, 1537 - 22 * j], 1, { r: -8 * j, mood: 'shock' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.b19Out = function (sc, ev, t, lt) { return W(classK(t, { close: '<g>' + therm19(0, 4, .62, 170) + ch19(80, 70, '37 °C', 30, .95) + heat19(t, 50, 190, 60, .7, 3) + '</g>' }) + fig19(t, 0) + shade3()); };
WMASC.b19Out = (ev, t, lt) => stay3([220, 1537 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });
