// C020H "Warum hilft Wasser kaum gegen scharfes Essen?" (Chemie, HOOK-PILOT wie P022H, Kostuem C1 Laborkittel), stumme Demo v1 (20.11.2026).
// Ort (eigens gebaut): Kuechentisch am Abend, Teller mit Chili-Wings, Wasserglas, spaeter Milch. Schalti steht auf dem Tisch.
// Teil 1 Lupe auf die Zunge (Capsaicin dockt an Hitze-Sensoren), Teil 2 Lupe: Wasser perlt ab, Eiswuerfel, Teil 3 Milch, Lupe: Fett und Kasein nehmen Capsaicin auf.
// Zum Loeschen: diese Datei und videos/C020H.
var AC20 = '#FF6BD6', ST20 = '#0B1020', GY20 = 1545, FX20 = 300;
function kitchen20(t, o) { o = o || {}; let s = '<defs><linearGradient id="wl20" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E2A55"/><stop offset="1" stop-color="#4A3C78"/></linearGradient><linearGradient id="tb20" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C98B55"/><stop offset="1" stop-color="#8E5A34"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#wl20)"/>';
  // Fliesenspiegel
  for (let y = 980; y < 1340; y += 60) for (let x = 0; x < 1080; x += 60) s += '<rect x="' + x + '" y="' + y + '" width="58" height="58" fill="' + ((x / 60 + y / 60) % 2 ? '#5B4C8E' : '#54467F') + '"/>';
  // Haengeschrank und Fenster
  if (!o.noCab) s += '<rect x="20" y="700" width="400" height="250" rx="10" fill="#E9E3F5" stroke="' + ST20 + '" stroke-width="7"/><path d="M220 700 V950" stroke="' + ST20 + '" stroke-width="5"/><circle cx="200" cy="900" r="9" fill="' + ST20 + '"/><circle cx="240" cy="900" r="9" fill="' + ST20 + '"/>';
  s += '<rect x="700" y="580" width="330" height="330" rx="10" fill="#0F1844" stroke="' + ST20 + '" stroke-width="8"/><circle cx="960" cy="660" r="30" fill="#FFF3D0"/><circle cx="972" cy="650" r="27" fill="#0F1844"/><path d="M865 580 V910 M700 745 H1030" stroke="' + ST20 + '" stroke-width="8"/>';
  for (let i = 0; i < 8; i++) s += '<circle cx="' + (720 + rnd(i + 3) * 290).toFixed(0) + '" cy="' + (600 + rnd(i + 9) * 130).toFixed(0) + '" r="2.5" fill="#fff" opacity="' + (.4 + .4 * Math.abs(Math.sin(t + i))).toFixed(2) + '"/>';
  // Tisch
  s += '<path d="M0 1380 H1080 V1560 H0 Z" fill="url(#tb20)" stroke="' + ST20 + '" stroke-width="6"/><rect x="0" y="1560" width="1080" height="60" fill="#6E4428" stroke="' + ST20 + '" stroke-width="6"/><rect x="0" y="1620" width="1080" height="300" fill="#2A2246"/>';
  for (let i = 0; i < 5; i++) s += '<path d="M' + (i * 240 + 40) + ' 1390 l-30 160" stroke="#B07746" stroke-width="4" opacity=".6"/>';
  if (o.cartons) s += milk20(635, 1440, o.cartons[0] * .8, 'VOLL', '#5CB8FF') + milk20(755, 1440, o.cartons[1] * .8, 'FETTARM', '#9FD6FF');
  // Teller mit Wings und Chili
  s += '<ellipse cx="830" cy="1470" rx="110" ry="40" fill="#F4F6FB" stroke="' + ST20 + '" stroke-width="6"/><ellipse cx="830" cy="1466" rx="80" ry="24" fill="#E3E8F3"/>';
  for (let i = 0; i < 4; i++) s += '<g transform="translate(' + (778 + i * 34) + ' ' + (1450 + (i % 2) * 14) + ') rotate(' + (i * 25 - 30) + ')"><ellipse rx="34" ry="20" fill="#C0451E" stroke="' + ST20 + '" stroke-width="4"/><circle cx="-8" cy="-4" r="4" fill="#E87B3A"/></g>';
  if (!o.noChili) s += '<g transform="translate(860 1418) rotate(-20)"><path d="M0 0 Q40 -10 70 20 Q40 10 0 10 Z" fill="#E8282B" stroke="' + ST20 + '" stroke-width="4"/><path d="M0 4 q-14 -6 -18 -20" stroke="#3B9B3B" stroke-width="7" fill="none" stroke-linecap="round"/></g>';
  // Wasserglas
  const wl = o.water === undefined ? 1 : o.water; if (!(o.milk > 0) && !o.noGlass) s += '<g transform="translate(665 1470)"><path d="M-46 -150 L-38 0 H38 L46 -150 Z" fill="#9FD6FF" opacity=".25" stroke="#F4F6FB" stroke-width="6"/><path d="M' + (-46 + 8 * (1 - wl)) + ' ' + (-150 * wl + 10) + ' L-38 0 H38 L' + (46 - 8 * (1 - wl)) + ' ' + (-150 * wl + 10) + ' Z" fill="#5CB8FF" opacity=".55"/>' + (o.ice ? '<rect x="-24" y="' + (-150 * wl + 6) + '" width="28" height="28" rx="5" fill="#E8F7FF" stroke="#9FD6FF" stroke-width="3" transform="rotate(12)"/>' : '') + '</g>';
  if (o.milk) s += milk20(665, 1470, o.milk, 'MILCH');
  return s; }
// Milchtuete
function milk20(x, y, k, lab, col) { if (k <= 0) return ''; const e = back(cl(k)); return '<g transform="translate(' + x + ' ' + y + ') scale(' + e.toFixed(3) + ')"><path d="M-55 0 V-170 L-30 -210 H30 L55 -170 V0 Z" fill="#F4F6FB" stroke="' + ST20 + '" stroke-width="6"/><path d="M-55 -170 H55" stroke="' + ST20 + '" stroke-width="5"/><rect x="-55" y="-130" width="110" height="60" fill="' + (col || '#5CB8FF') + '"/>' + svgT(0, -90, lab, lab.length > 6 ? 18 : 24, '#fff') + '</g>'; }
// Feuer aus Schaltis Mund (nach rechts)
function fire20(hx, hy, t, k) { if (k <= 0) return ''; let s = '<g opacity="' + cl(k * 2).toFixed(2) + '">'; for (let i = 0; i < 9; i++) { const c = (t * 2.4 + i / 9) % 1, x = hx + 60 + 230 * c * k, y = hy + 20 - 40 * c + 14 * Math.sin(t * 20 + i), r = (18 + 30 * Math.sin(Math.PI * c)) * k; s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + r.toFixed(0) + '" fill="' + (c < .35 ? '#FFE14D' : (c < .7 ? '#FF8A1E' : '#E8282B')) + '" opacity="' + (1 - c * .7).toFixed(2) + '"/>'; } return s + '</g>'; }
// Kleines Thermometer mit "normal"
function therm20(x, y, k) { if (k <= 0) return ''; return '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)).toFixed(3) + ')"><rect x="-14" y="-120" width="28" height="140" rx="14" fill="#F4F6FB" stroke="' + ST20 + '" stroke-width="5"/><rect x="-6" y="-50" width="12" height="62" rx="6" fill="#3DFF7A"/><circle cy="30" r="24" fill="#3DFF7A" stroke="' + ST20 + '" stroke-width="5"/></g>' + chip3(x + 150, y - 40, 'nicht heiß', 28, '#3DFF7A', ST20, k); }
// Teetasse mit Dampf (Teil 1, echte Hitze)
function tea20(x, y, t, k) { if (k <= 0) return ''; let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)).toFixed(3) + ')"><path d="M-50 -80 H50 L42 0 H-42 Z" fill="#F4F6FB" stroke="' + ST20 + '" stroke-width="6"/><path d="M50 -60 q30 0 30 24 q0 22 -34 22" fill="none" stroke="' + ST20 + '" stroke-width="8"/><ellipse cx="0" cy="-78" rx="46" ry="8" fill="#B5652A"/>'; for (let i = 0; i < 3; i++) { const c = (t * .8 + i / 3) % 1; s += '<path d="M' + (-20 + 20 * i) + ' ' + (-100 - 80 * c).toFixed(0) + ' q14 -16 0 -32" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (.8 * (1 - c)).toFixed(2) + '"/>'; } return s + '</g>'; }
// Oelflasche (Teil 3)
function oil20(x, y, k) { if (k <= 0) return ''; return '<g transform="translate(' + x + ' ' + y + ') scale(' + back(cl(k)).toFixed(3) + ')"><path d="M-30 0 V-120 Q-30 -150 -12 -160 V-200 H12 V-160 Q30 -150 30 -120 V0 Z" fill="#F2C744" opacity=".85" stroke="' + ST20 + '" stroke-width="6"/><rect x="-14" y="-214" width="28" height="16" rx="4" fill="#3B9B3B" stroke="' + ST20 + '" stroke-width="4"/>' + svgT(0, -60, 'ÖL', 26, ST20) + '</g>'; }
// ---------- Lupen-Inhalte (Koordinaten -320..320) ----------
function tongue20(t, o) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#3A1830"/><path d="M-320 120 Q-160 90 0 110 Q160 130 320 100 V320 H-320 Z" fill="#FF8FA8" stroke="#C85A78" stroke-width="6"/>';
  for (let i = 0; i < 5; i++) { const x = -240 + i * 120, on = o.dock ? cl((o.dock - i * .15) / .4) : 0; s += '<g transform="translate(' + x + ' ' + (108 + 6 * Math.sin(i)) + ') scale(1.8)"><path d="M-26 0 V-40 H-12 V-18 H12 V-40 H26 V0 Z" fill="' + lc('#B05A8A', '#FFE14D', on) + '" stroke="' + ST20 + '" stroke-width="4"/>';
    if (on > .5) s += '<path d="M0 -60 L-12 -100 H4 L-6 -140" stroke="#FFE14D" stroke-width="6" fill="none" stroke-linecap="round" opacity="' + (.5 + .5 * Math.sin(t * 20 + i)).toFixed(2) + '"/>';
    if (o.caps) { const y = o.dock ? lerp(-150, -26, ease(cl((o.dock - i * .15) / .5))) : -150 + 14 * Math.sin(t * 2 + i); s += caps20(20 * Math.sin(t + i) * (o.dock ? 0 : 1), y, t, o.capsK === undefined ? 1 : o.capsK); }
    s += '</g>'; }
  if (o.label) s += svgT(0, 260, o.label, 34, ST20);
  return s; }
// Capsaicin als roter Schluessel mit Fettschwanz
function caps20(x, y, t, k, z) { return '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(' + (z || 1) + ')" opacity="' + cl(k).toFixed(2) + '"><path d="M0 0 L0 -26" stroke="#E8282B" stroke-width="12" stroke-linecap="round"/><path d="M0 -26 l12 -12 l-12 -12 l12 -12 l-12 -12" stroke="#FF8A1E" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cy="-6" r="10" fill="#E8282B" stroke="' + ST20 + '" stroke-width="3"/></g>'; }
function water20(t, o) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#3A1830"/><path d="M-320 120 Q-160 90 0 110 Q160 130 320 100 V320 H-320 Z" fill="' + lc('#FF8FA8', '#9FD6FF', o.cold || 0) + '" stroke="#C85A78" stroke-width="6"/>';
  s += '<path d="M-300 106 Q-150 80 0 98 Q150 118 300 90 L300 108 Q150 134 0 116 Q-150 98 -300 124 Z" fill="#FF6A2A" opacity=".85"/>' + svgT(-150, 180, 'Capsaicin', 30, '#7A1A1A');
  for (let i = 0; i < 6; i++) { const c = (t * .6 + i / 6) % 1, x = -300 + 600 * c, y = 60 - 30 * Math.sin(Math.PI * c) * 0 + 4 * Math.sin(t * 6 + i); s += '<circle cx="' + x.toFixed(0) + '" cy="' + (y + 12).toFixed(0) + '" r="' + (22 + 6 * (i % 2)) + '" fill="#5CB8FF" stroke="#E8F7FF" stroke-width="4" opacity="' + (cl(o.w || 0) * .9).toFixed(2) + '"/><circle cx="' + (x - 7).toFixed(0) + '" cy="' + (y + 4).toFixed(0) + '" r="6" fill="#fff" opacity="' + (cl(o.w || 0) * .8).toFixed(2) + '"/>'; }
  if (o.ice) s += '<rect x="-40" y="' + (-200 + 210 * ease(cl(o.ice / .6))).toFixed(0) + '" width="80" height="80" rx="12" fill="#E8F7FF" stroke="#9FD6FF" stroke-width="6" transform="rotate(10)" opacity="' + (1 - cl((o.ice - 1.8) / .5)).toFixed(2) + '"/>';
  return s; }
function milkin20(t, o) { let s = '<rect x="-320" y="-320" width="640" height="640" fill="#3A1830"/><path d="M-320 120 Q-160 90 0 110 Q160 130 320 100 V320 H-320 Z" fill="#FF8FA8" stroke="#C85A78" stroke-width="6"/>';
  const m = cl(o.m || 0); for (let i = 0; i < 5; i++) { const x = -240 + i * 120, carry = ease(cl((m - .4 - i * .08) / .5)), y = lerp(80, -110, carry);
    s += caps20(x, y, t, 1, 1.8);
    const cx = lerp(x + 60 - 40 * (i % 2), x, ease(cl((m - i * .08) / .4))), cy = lerp(-200, y - 50, ease(cl((m - i * .08) / .4)));
    s += '<g transform="translate(' + cx.toFixed(0) + ' ' + cy.toFixed(0) + ') scale(1.6)"><circle r="' + (i % 2 ? 30 : 34) + '" fill="' + (i % 2 ? '#FFE9A0' : '#F4F6FB') + '" stroke="' + ST20 + '" stroke-width="4" opacity=".92"/>' + (i % 2 ? '' : '<circle cx="-10" cy="-8" r="6" fill="#C9D3E6"/><circle cx="10" cy="6" r="7" fill="#C9D3E6"/>') + '</g>'; }
  s += chip3(-140, 230, 'Kasein', 30, '#F4F6FB', ST20, cl(m * 3)) + chip3(140, 230, 'Fett', 30, '#FFE9A0', ST20, cl(m * 3 - .3));
  return s; }

// ---------- Einstieg ----------
WORLD.h20hook = function (sc, ev, t, lt) { const br = ev.brenn, wa = ev.wasser, lo = ev.loop; const [hx, hy] = headH(FX20, GY20);
  const bite = cl((lt - .1) / .4); let s = kitchen20(t, { water: wa === undefined ? 1 : lerp(1, .3, ease(cl((wa - .2) / .8))), noChili: bite > .5 });
  s += fire20(hx, hy, t, lo === undefined ? cl((lt - .3) / .3) : 1 - cl(lo / .5));
  if (br !== undefined && lo === undefined) s += therm20(120, 1100, cl((br - 1.2) / .4));
  if (wa !== undefined && lo === undefined) s += chip3(760, 1080, 'Wasser: kaum besser', 30, '#9FD6FF', ST20, cl((wa - .8) / .3));
  if (lo !== undefined) s += loopH(cl(lo / .9), t, ['Wasser', '<path d="M-36 -50 L-28 50 H28 L36 -50 Z" fill="#5CB8FF" stroke="' + ST20 + '" stroke-width="5"/>', '#5CB8FF'], ['Milch', milk20(0, 60, 1, 'MILCH'), AC20]);
  return W(s + shade3()); };
WMASC.h20hook = (ev, t, lt) => { const wa = ev.wasser, lo = ev.loop; const hop = Math.sin(t * 9) * cl((lt - .3) / .3) * (lo === undefined ? 1 : 1 - cl(lo / .5));
  if (wa !== undefined && lo === undefined) { const g = Math.sin(Math.PI * cl((wa - .1) / 1)); return stay3([lerp(FX20, 400, g), GY20 - 10 * Math.abs(hop)], 1, { r: -20 * g, mood: 'shock' }); }
  return stay3([FX20, GY20 - 14 * Math.abs(hop)], 1, { r: 6 * hop, mood: lo !== undefined ? 'happy' : 'shock' }); };

// ---------- Teil 1: falscher Alarm ----------
WORLD.h20alarm = function (sc, ev, t, lt) { const ca = ev.caps, dk = ev.dock, fe = ev.feuer, te = ev.tee; const [hx, hy] = headH(FX20, GY20); let s = kitchen20(t, { water: .3, noChili: dk !== undefined });
  if (ca !== undefined && dk === undefined) s += '<g transform="translate(860 1300) scale(' + (1.8 * back(cl(ca / .4))).toFixed(2) + ') rotate(-20)"><path d="M0 0 Q40 -10 70 20 Q40 10 0 10 Z" fill="#E8282B" stroke="' + ST20 + '" stroke-width="3"/><path d="M0 4 q-14 -6 -18 -20" stroke="#3B9B3B" stroke-width="6" fill="none" stroke-linecap="round"/></g>' + lupeH(600, 905, 230, tongue20(t, { caps: 1, capsK: cl((ca - .6) / .5), label: 'Capsaicin' }), cl((ca - .4) / .4), 860, 1290);
  if (dk !== undefined && fe === undefined) s += lupeH(600, 905, 250, tongue20(t, { caps: 1, dock: cl((dk - .3) / 1.6) * 1.6, label: 'Hitze-Sensoren' }), 1, hx + 40, hy);
  if (te !== undefined) s += tea20(1000, 1470, t, cl(te / .5)) + chip3(790, 1120, 'meldet auch echte Hitze', 28, '#FFE14D', ST20, cl((te - .8) / .3));
  if (fe !== undefined && te === undefined) s += thinkH(hx + 20, hy - 60, 560, 880, '<path d="M-60 60 Q-90 -20 -30 -70 Q-30 -20 0 -40 Q10 -90 50 -100 Q30 -40 70 0 Q90 40 60 60 Z" fill="#FF8A1E" stroke="' + ST20 + '" stroke-width="5"/>' + svgT(0, 104, 'FEUER!', 34, '#E8282B'), cl(fe / .35)) + therm20(120, 1100, cl((fe - 1.4) / .4));
  return W(s + shade3(), slot(ev, [['caps', 'Capsaicin aus der Chili'], ['dock', 'Dockt an Hitze-Sensoren', 'hot'], ['feuer', 'Gehirn: Feuer!', 'red'], ['tee', 'Sonst: echte Hitze']])); };
WMASC.h20alarm = (ev, t, lt) => { const fe = ev.feuer; if (fe !== undefined) return stay3([FX20, GY20], 1, { r: 2, mood: 'cool' }); return stay3([lerp(400, FX20, ease(cl(lt / .8))), GY20], 1, { r: 3 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 2: Wasser perlt ab ----------
WORLD.h20wasser = function (sc, ev, t, lt) { const ha = ev.haken, fe = ev.fett, dr = ev.drueber, ei = ev.eis; const [hx, hy] = headH(FX20, GY20);
  let s = kitchen20(t, { water: ei !== undefined ? .8 : .3, ice: ei !== undefined, noChili: 1 }) + hakenH(ha === undefined || fe !== undefined ? undefined : ha, t);
  if (fe !== undefined && dr === undefined) { const k = cl(fe / .4); s += lupeH(600, 905, 250, '<rect x="-320" y="-320" width="640" height="640" fill="#1E2A5A"/><path d="M-320 40 H320 V320 H-320 Z" fill="#5CB8FF" opacity=".7"/>' + [0, 1, 2, 3].map(i => '<ellipse cx="' + (-180 + i * 120) + '" cy="' + (-20 + 10 * Math.sin(t * 2 + i)).toFixed(0) + '" rx="48" ry="26" fill="#FF6A2A" stroke="' + ST20 + '" stroke-width="4"/>').join('') + svgT(0, 200, 'mischt sich kaum', 34, '#F4F6FB'), k); }
  if (dr !== undefined) s += lupeH(600, 905, 250, water20(t, { w: cl(dr / .4), cold: ei === undefined ? 0 : Math.sin(Math.PI * cl((ei - .3) / 2.4)), ice: ei }), 1, hx + 40, hy);
  if (ei !== undefined) s += fire20(hx, hy, t, cl((ei - 2.2) / .5));
  return W(s + shade3(), slot(ev, [['haken', 'Der Haken', 'red'], ['fett', 'Capsaicin ist wie Fett', 'hot'], ['drueber', 'Wasser läuft drüber'], ['eis', 'Eis kühlt nur kurz']])); };
WMASC.h20wasser = (ev, t, lt) => { const ha = ev.haken, dr = ev.drueber, ei = ev.eis;
  if (ei !== undefined) { const sh = Math.sin(t * 30) * cl((ei - .3) / .3) * (1 - cl((ei - 2) / .3)); return stay3([FX20 + 3 * sh, GY20], 1, { r: 2 * sh, mood: ei > 2.2 ? 'shock' : 'cool' }); }
  if (dr !== undefined) { const g = Math.sin(Math.PI * cl(dr / 1.2)); return stay3([lerp(FX20, 400, g), GY20], 1, { r: -18 * g, mood: 'happy' }); }
  if (ha !== undefined) { const j = Math.sin(Math.PI * cl(ha / .5)); return stay3([FX20, GY20 - 30 * j], 1, { r: -6 * j, mood: 'shock' }); }
  return stay3([FX20, GY20], 1, { r: 2 }); };

// ---------- Teil 3: Milch ----------
WORLD.h20milch = function (sc, ev, t, lt) { const mi = ev.milch, ka = ev.kasein, st = ev.studie, oe = ev.oel; const [hx, hy] = headH(FX20, GY20);
  let s = kitchen20(t, { water: .8, noChili: 1, noGlass: mi !== undefined, cartons: st !== undefined && oe === undefined ? [cl(st / .4), cl((st - .3) / .4)] : null, milk: st === undefined && oe === undefined && mi !== undefined ? cl((mi - .9) / .4) : 0 });
  if (mi !== undefined && ka === undefined) s += fire20(hx, hy, t, 1 - cl((mi - 1.4) / .6));
  if (ka !== undefined && st === undefined) s += lupeH(600, 905, 250, milkin20(t, { m: cl((ka - .3) / 3.2) }), cl(ka / .4), hx + 40, hy);
  if (oe !== undefined) s += oil20(660, 1470, cl(oe / .4)) + chip3(560, 1110, 'wirkt auch, schmeckt nicht', 28, '#F2C744', ST20, cl((oe - .8) / .3));
  if (st !== undefined && oe === undefined) { for (const x of [635, 755]) s += '<g transform="translate(' + x + ' 1000) scale(' + back(cl((st - 1.4) / .4)).toFixed(3) + ')"><circle r="46" fill="#FFE14D" stroke="' + ST20 + '" stroke-width="6"/>' + svgT(0, 14, '1.', 40, ST20) + '</g>'; s += chip3(685, 880, 'Studie 2019, 72 Leute', 28, '#FFE14D', ST20, cl((st - 2.2) / .3)); }
  return W(s + shade3(), slot(ev, [['milch', 'Was wirklich hilft: Milch', 'hot'], ['kasein', 'Fett + Kasein nehmen es auf'], ['studie', 'Fettarm = Vollmilch', 'hot'], ['oel', 'Öl? Lieber nicht']])); };
WMASC.h20milch = (ev, t, lt) => { const mi = ev.milch, ka = ev.kasein, st = ev.studie;
  if (ev.oel !== undefined) { const w = Math.sin(t * 8) * Math.sin(Math.PI * cl(ev.oel / 1.6)); return stay3([FX20, GY20], 1, { r: 8 * w, mood: 'cool' }); } if (st !== undefined) return stay3([FX20, GY20], 1, { r: 3, mood: 'happy' });
  if (mi !== undefined) { const d = Math.sin(Math.PI * cl((mi - 1.2) / 1.6)); return stay3([FX20, GY20], 1, { r: -14 * d, mood: ka !== undefined ? 'happy' : 'cool', prop: d > .2 && ka === undefined ? '🥛' : undefined }); }
  return stay3([FX20, GY20], 1, { r: 2 }); };

// ---------- Schluss ----------
WORLD.h20out = function (sc, ev, t, lt) { const fr = ev.frage2, au = ev.auf, sv = ev.save; const off = sv === undefined ? 0 : cl(sv / .2);
  let s = kitchen20(t, { noCab: 1, water: sv === undefined ? .8 : 1, noChili: sv === undefined, milk: sv === undefined ? 1 : 1 - cl(sv / .3) });
  if (fr !== undefined && off < 1) s += '<g opacity="' + (1 - off).toFixed(2) + '">' + loopH(cl(fr / .9), t, ['Wasser', '<path d="M-36 -50 L-28 50 H28 L36 -50 Z" fill="#5CB8FF" stroke="' + ST20 + '" stroke-width="5"/>', '#5CB8FF'], ['Milch', milk20(0, 60, 1, 'MILCH'), AC20], au === undefined ? undefined : 1, au === undefined ? 0 : cl(au / .5)) + '</g>';
  return W(s + shade3()); };
WMASC.h20out = (ev, t, lt) => stay3([FX20, GY20], 1, { r: 2, mood: ev.save !== undefined ? 'happy' : undefined });

['h20hook', 'h20alarm', 'h20wasser', 'h20milch', 'h20out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC20); });
