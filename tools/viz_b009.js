// B009 "Warum bekommst du Gänsehaut?" (Bio, Skript Anatomie mit Hook-System und Neue Werkzeuge, Kostuem B4 Skelett-Anzug), stumme Demo v1 (26.11.2026).
// Ort: Bio-Saal mit Tafel (classK aus viz_b007.js). Hauptfigur: Arm-Modell aus Haut auf dem Podest, Haare stellen sich auf, Hubbel erscheinen.
// Grossbild auf der Tafel: Haut im Querschnitt (Haar, Haaraufrichter rot, Nerv gelb), in Teil 3 eine Katze mit Fell und Luftpolster.
// Feste Farben neu: Haut #F2C9A0, Muskel #E8665A, Nerv #FFE14D. Grenze: nur Aufbau und Ablauf, nichts zu Gesundheit, keine Psyche.
// Nutzt classK, ringK, chalkK, CX/CY/CZ (viz_b007.js), slot (viz_p002.js), stay3 (viz_v3b.js). Zum Loeschen: diese Datei und videos/B009.
const SK9 = '#F2C9A0', MU9 = '#E8665A', NV9 = '#FFE14D', ST9 = '#0B1020', AX9 = 812, AY9 = 1132;
const mv9 = (a, b, k) => lerp(a, b, ease(cl(k)));
const ch9 = (x, y, txt, sz) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + sz + '" font-weight="800" font-family="Inter Display, Inter, Arial, sans-serif" fill="#F4F6FB" opacity=".92">' + txt + '</text>';

// ---------- Hauptfigur: Arm-Modell. up: Haare aufgerichtet 0..1, gb: Hubbel 0..1, wave: Hand winkt ----------
function arm9(t, o) { o = o || {}; const up = cl(o.up || 0), gb = cl(o.gb || 0), wv = o.wave || 0; let s = '<g id="figurK">';
  s += '<rect x="742" y="1098" width="140" height="34" rx="8" fill="#8B5E3C" stroke="' + ST9 + '" stroke-width="5"/>';
  s += '<path d="M770 1100 L766 830 Q770 800 800 798 H826 Q856 800 858 830 L854 1100 Z" fill="' + SK9 + '" stroke="' + ST9 + '" stroke-width="5"/>';
  s += '<g transform="rotate(' + (8 * wv).toFixed(1) + ' 812 806)"><path d="M762 812 Q756 760 770 742 L772 700 Q774 690 784 692 Q792 694 792 704 L794 736 L798 694 Q800 684 810 686 Q820 688 818 698 L818 734 L824 700 Q828 690 836 693 Q844 696 842 708 L840 742 L848 716 Q852 708 860 711 Q866 714 864 724 L858 772 Q862 800 846 814 Z" fill="' + SK9 + '" stroke="' + ST9 + '" stroke-width="5" stroke-linejoin="round"/></g>';
  // Haare an beiden Kanten und vorn: liegen schraeg, richten sich auf
  for (let i = 0; i < 16; i++) { const side = i % 3, y = 845 + (i * 17) % 240, base = side === 0 ? [768, y] : side === 1 ? [856, y] : [790 + (i * 13) % 44, y + 6];
    const a0 = side === 0 ? 200 : side === 1 ? -20 : -60, a1 = side === 0 ? 180 : side === 1 ? 0 : -90, a = lerp(a0, a1, up) * Math.PI / 180, L = 30 + 10 * up;
    if (gb > .02) s += '<circle cx="' + base[0] + '" cy="' + base[1] + '" r="' + (3 + 6 * gb).toFixed(1) + '" fill="#E3AE86" stroke="#B87A55" stroke-width="2"/>';
    s += '<path d="M' + base[0] + ' ' + base[1] + ' l' + (Math.cos(a) * L).toFixed(1) + ' ' + (Math.sin(a) * L + (side === 2 ? 0 : -6 * (1 - up))).toFixed(1) + '" stroke="#4A2E1E" stroke-width="5" stroke-linecap="round"/>'; }
  return s + '</g>'; }

// ---------- Grossbild: Haut im Querschnitt (um 0/0, nutzbar etwa x -210..220, y -95..100) ----------
// c: Muskel zieht sich zusammen 0..1, sig: Nervensignal laeuft (Phase oder undefined), hl: Muskel leuchtet, hint: Kreide-Hinweis
function skin9(t, o) { o = o || {}; const c = cl(o.c || 0); let s = '';
  const bump = 30 * c; s += '<path d="M-210 -58 H-40 Q0 ' + (-58 - bump) + ' 40 -58 H215 V95 H-210 Z" fill="#F7D9BE" stroke="' + ST9 + '" stroke-width="4"/>';
  s += '<path d="M-210 -58 H-40 Q0 ' + (-58 - bump) + ' 40 -58 H215 V-36 H-210 Z" fill="' + SK9 + '"/><path d="M-210 -36 H215" stroke="#D9A07A" stroke-width="3" stroke-dasharray="8 6"/>';
  const R = [-40, 64], a = lerp(-35, -78, ease(c)) * Math.PI / 180, ux = Math.cos(a), uy = Math.sin(a);
  s += '<ellipse cx="' + (R[0] + ux * 30).toFixed(0) + '" cy="' + (R[1] + uy * 30).toFixed(0) + '" rx="34" ry="14" transform="rotate(' + (a * 180 / Math.PI).toFixed(0) + ' ' + (R[0] + ux * 30).toFixed(0) + ' ' + (R[1] + uy * 30).toFixed(0) + ')" fill="#E7B48E" stroke="' + ST9 + '" stroke-width="3"/>';
  s += '<path d="M' + R[0] + ' ' + R[1] + ' l' + (ux * 220).toFixed(0) + ' ' + (uy * 220).toFixed(0) + '" stroke="#5A3A26" stroke-width="7" stroke-linecap="round"/>';
  const P = [R[0] + ux * 46, R[1] + uy * 46], A = [-118, -34], th = 14 + 8 * c;
  s += '<path d="M' + P[0].toFixed(0) + ' ' + P[1].toFixed(0) + ' L' + A[0] + ' ' + A[1] + '" stroke="' + MU9 + '" stroke-width="' + th.toFixed(0) + '" stroke-linecap="round"/>';
  if (o.hl) { const k = (t * 1.1) % 1; s += '<circle cx="' + ((P[0] + A[0]) / 2).toFixed(0) + '" cy="' + ((P[1] + A[1]) / 2).toFixed(0) + '" r="' + (26 + 30 * k).toFixed(0) + '" fill="none" stroke="#A8E63C" stroke-width="4" opacity="' + ((1 - k) * o.hl).toFixed(2) + '"/>'; }
  if (o.nerve) { const M = [(P[0] + A[0]) / 2, (P[1] + A[1]) / 2]; s += '<path d="M-180 60 Q-130 52 ' + M[0].toFixed(0) + ' ' + (M[1] + 6).toFixed(0) + '" fill="none" stroke="' + NV9 + '" stroke-width="8"/>';
    if (o.sig !== undefined && o.sig >= 0 && o.sig <= 1) { const q = o.sig, x = lerp(-176, M[0], q), y = lerp(60, M[1] + 6, q) - 18 * Math.sin(Math.PI * q); s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="26" fill="' + NV9 + '" opacity=".45"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="13" fill="#FFF7C2"/>'; } }
  if (o.hint) s += '<text x="-110" y="84" text-anchor="middle" font-size="26" font-weight="800" font-family="Inter Display, Inter, Arial, sans-serif" fill="#0B1020">rot = Muskel</text>';
  return s; }
// Katze mit Fell (um 0/0). f: Fell steht auf 0..1, air: Luftpolster 0..1
function cat9(t, f, air) { f = cl(f); let s = '<ellipse cx="-10" cy="30" rx="130" ry="' + (44 + 10 * f).toFixed(0) + '" fill="#E89A4C" stroke="' + ST9 + '" stroke-width="5"/>';
  s += '<circle cx="135" cy="-12" r="44" fill="#E89A4C" stroke="' + ST9 + '" stroke-width="5"/><path d="M110 -46 L118 -84 L138 -54 M150 -54 L170 -84 L172 -44" fill="#E89A4C" stroke="' + ST9 + '" stroke-width="5" stroke-linejoin="round"/><circle cx="125" cy="-16" r="5" fill="' + ST9 + '"/><circle cx="152" cy="-16" r="5" fill="' + ST9 + '"/><path d="M134 0 l5 5 l5 -5" fill="none" stroke="' + ST9 + '" stroke-width="3"/>';
  s += '<path d="M-138 22 Q-200 0 -190 -60" fill="none" stroke="#E89A4C" stroke-width="' + (16 + 10 * f).toFixed(0) + '" stroke-linecap="round"/><path d="M-60 70 v24 M40 70 v24" stroke="' + ST9 + '" stroke-width="10" stroke-linecap="round"/>';
  for (let i = 0; i < 18; i++) { const x = -125 + i * 14, top = 30 - Math.sqrt(Math.max(0, 1 - Math.pow((x + 10) / 130, 2))) * (44 + 10 * f), a = lerp(-15, -80, f) * Math.PI / 180, L = 16 + 16 * f;
    s += '<path d="M' + x + ' ' + top.toFixed(0) + ' l' + (Math.cos(a) * L).toFixed(0) + ' ' + (Math.sin(a) * L).toFixed(0) + '" stroke="#B86A2A" stroke-width="4" stroke-linecap="round"/>';
    if (air > .02) s += '<circle cx="' + (x + 7) + '" cy="' + (top - 12 * f + 2 * Math.sin(t * 3 + i)).toFixed(0) + '" r="' + (5 + 5 * air).toFixed(1) + '" fill="#FFB45C" stroke="#FFE1A8" stroke-width="2" opacity="' + (.75 * air).toFixed(2) + '"/>'; }
  return s; }
// Menschenhaut mit wenigen, feinen Haaren und kaum Luft
function human9(t, k) { let s = '<path d="M-210 -10 H215 V95 H-210 Z" fill="' + SK9 + '" stroke="' + ST9 + '" stroke-width="4"/>';
  const u = .5 + .5 * Math.sin(t * 2.5); [-150, -40, 70, 180].forEach((x, i) => { const a = lerp(-40, -90, u) * Math.PI / 180; s += '<circle cx="' + x + '" cy="-12" r="' + (7 + 4 * u).toFixed(1) + '" fill="#E3AE86" stroke="#B87A55" stroke-width="2"/><path d="M' + x + ' -12 l' + (Math.cos(a) * 34).toFixed(0) + ' ' + (Math.sin(a) * 34).toFixed(0) + '" stroke="#8A6A55" stroke-width="3" stroke-linecap="round"/>'; if (i === 1) s += '<circle cx="' + (x + 8) + '" cy="-38" r="4" fill="#FFB45C" opacity="' + (.5 * k).toFixed(2) + '"/>'; }); s += '<text x="0" y="70" text-anchor="middle" font-size="28" font-weight="800" font-family="Inter Display, Inter, Arial, sans-serif" fill="#0B1020">fein und kurz</text>';
  return s; }

// Wind und Schnee im Einstieg
function wind9(t, k) { if (k <= .02) return ''; let s = ''; for (let i = 0; i < 9; i++) { const c = (t * 1.4 + rnd(i + 60)) % 1, y = [760, 820, 900, 960, 1320, 1380, 1440, 1480, 1500][i]; s += '<path d="M' + (-200 + 1400 * c).toFixed(0) + ' ' + y + ' q60 -14 120 0 t120 0" fill="none" stroke="#EAF4FF" stroke-width="6" stroke-linecap="round" opacity="' + (.7 * k * Math.sin(Math.PI * c)).toFixed(2) + '"/>'; }
  for (let i = 0; i < 18; i++) { const c = (t * .9 + rnd(i + 70)) % 1; s += '<circle cx="' + (-40 + 1160 * c).toFixed(0) + '" cy="' + (700 + rnd(i + 71) * 820 + 40 * Math.sin(t * 3 + i)).toFixed(0) + '" r="' + (4 + 3 * rnd(i + 72)).toFixed(1) + '" fill="#fff" opacity="' + (.85 * k).toFixed(2) + '"/>'; } return s; }

const lab9 = (ev, list) => slot(ev, list, 590);

// ---------- Einstieg ----------
WORLD.b9Hook = function (sc, ev, t, lt) { const lo = ev.loop, wk = lo === undefined ? 1 : 1 - cl(lo / 1); const up = ease(cl((lt - .3) / .8));
  let s = classK(t, { close: skin9(t, { c: up }) }) + arm9(t, { up: up, gb: up }) + wind9(t, wk) + ringK(t, AX9, 960, 62);
  return W(s + shade3()); };
WMASC.b9Hook = (ev, t, lt) => { const lo = ev.loop, sh = lo === undefined ? 1 : 1 - cl(lo / .8); return stay3([220 + 4 * Math.sin(t * 40) * sh, 1537], 1, { r: 3 * Math.sin(t * 37) * sh, mood: lo !== undefined && lo > .8 ? 'happy' : 'shock' }); };

// ---------- Teil 1: Winzige Muskeln ----------
WORLD.b9Muskel = function (sc, ev, t, lt) { const mu = ev.muskel, zi = ev.zieh, hu = ev.hubbel;
  const c = zi === undefined ? 0 : ease(cl((zi - .5) / 1.6)), k = mu === undefined ? 0 : cl(mu / .4);
  const close = k > 0 ? '<g opacity="' + k.toFixed(2) + '">' + skin9(t, { c: c, hl: mu !== undefined && zi === undefined ? 1 : 0, hint: 1 }) + '</g>' : '';
  let s = classK(t, { close: close }) + arm9(t, { up: c, gb: hu === undefined ? 0 : ease(cl(hu / 1)), wave: hu !== undefined ? Math.sin(Math.PI * cl((hu - 1.6) / 1)) : 0 });
  if (k > 0) s += ringK(t, AX9, 960, 62);
  return W(s + shade3(), lab9(ev, [['muskel', 'Haaraufrichter', 'hot'], ['zieh', 'Muskel zieht sich zusammen'], ['hubbel', 'Hubbel = Gänsehaut']])); };
WMASC.b9Muskel = (ev, t, lt) => { const hu = ev.hubbel; if (hu !== undefined) { const w = Math.sin(Math.PI * cl((hu - 1.2) / 1)); return stay3([220, 1537 - 14 * w], 1, { r: 10 * w, mood: 'happy' }); } return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: ev.zieh !== undefined ? 'shock' : 'happy' }); };

// ---------- Teil 2: Von allein (Sympathikus) ----------
WORLD.b9Nerv = function (sc, ev, t, lt) { const se = ev.selbst, si = ev.signal, al = ev.allein;
  let c = 0, sig; if (si !== undefined) { sig = cl((si - .4) / 1.4); c = ease(cl((si - 1.8) / .8)); }
  if (al !== undefined) { const ph = (al * .7) % 1; sig = ph < .5 ? ph * 2 : undefined; c = ph < .5 ? 1 - ease(cl(ph * 4)) * .0 : 1 - Math.sin(Math.PI * (ph - .5)) * .6; }
  const close = '<g>' + skin9(t, { c: c, nerve: si !== undefined || al !== undefined ? 1 : 0, sig: sig }) + '</g>';
  let s = classK(t, { close: close }) + arm9(t, { up: c, gb: c }) + ringK(t, AX9, 960, 62);
  if (se !== undefined && si === undefined) { const k = Math.sin(Math.PI * cl((se - .3) / 1.4)); s += '<path d="M380 1350 Q560 1250 740 1000" fill="none" stroke="#F4F6FB" stroke-width="5" stroke-dasharray="10 12" opacity="' + (.7 * k).toFixed(2) + '"/>'; }
  return W(s + shade3(), lab9(ev, [['selbst', 'Nicht dein Wille'], ['signal', 'Nervensignal', 'hot'], ['allein', 'Ganz von allein']])); };
WMASC.b9Nerv = (ev, t, lt) => { const se = ev.selbst, al = ev.allein;
  if (al !== undefined) return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: 'shock' });
  if (se !== undefined) { const p = Math.sin(Math.PI * cl((se - .3) / 1.4)); return stay3([220, 1537 - 10 * p], 1, { r: 14 * p, mood: p > .2 ? 'cool' : 'happy' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Teil 3: Zu wenig Fell ----------
WORLD.b9Fell = function (sc, ev, t, lt) { const fe = ev.fell, lu = ev.luft, me = ev.mensch;
  const f = fe === undefined ? 0 : ease(cl((fe - .6) / 1.2)), air = lu === undefined ? 0 : ease(cl(lu / 1.2)), sw = me === undefined ? 0 : ease(cl(me / .6));
  let close = ''; if (true) close += '<g opacity="' + (1 - sw).toFixed(2) + '" transform="translate(16 4)">' + cat9(t, f, air) + '</g>'; if (sw > 0) close += '<g opacity="' + sw.toFixed(2) + '">' + human9(t, 1) + '</g>';
  let s = classK(t, { close: close || undefined }) + arm9(t, { up: me !== undefined ? 1 : 0, gb: me !== undefined ? 1 : 0 });
  if (sw > 0) s += ringK(t, AX9, 960, 62);
  return W(s + shade3(), lab9(ev, [['fell', 'Fell stellt sich auf'], ['luft', 'Luft hält warm'], ['mensch', 'Zu feine Haare', 'hot']])); };
WMASC.b9Fell = (ev, t, lt) => { const me = ev.mensch, rh = ev.rehook;
  if (me !== undefined) { const s2 = Math.sin(Math.PI * cl((me - 1.5) / 1)); return stay3([220, 1537 - 8 * s2], 1, { r: -8 * s2, mood: 'cool' }); }
  if (rh !== undefined && ev.fell === undefined) { const j = Math.sin(Math.PI * cl(rh / .7)); return stay3([220, 1537 - 22 * j], 1, { r: -8 * j, mood: 'shock' }); }
  return stay3([220, 1537], 1, { r: 2 * Math.sin(t * 2), mood: 'happy' }); };

// ---------- Schluss ----------
WORLD.b9Out = function (sc, ev, t, lt) { return W(classK(t, { close: skin9(t, { c: .5 + .5 * Math.sin(t * 1.6) }) }) + arm9(t, { up: .5 + .5 * Math.sin(t * 1.6), gb: .5 + .5 * Math.sin(t * 1.6) }) + shade3()); };
WMASC.b9Out = (ev, t, lt) => stay3([220 + 50 * Math.sin(Math.PI * cl((lt - 1) / 5)), 1537 - 8 * Math.abs(Math.sin(t * 7)) * (lt > 1 && lt < 6 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });
