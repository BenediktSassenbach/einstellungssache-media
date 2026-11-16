// B007 "Wie viele Knochen hat ein Mensch?" (Bio, Koerper), Skript 3.0. Ort: Bio-Saal mit Tafel und dem Schulskelett auf seinem Podest.
// Ein Skelett, das sich an Ort und Stelle vom Baby zum Erwachsenen verwandelt. Die Zahl steht mit Kreide an der Tafel.
// Grenze Koerper und Gesundheit: nur Aufbau und Wachstum, kein Rat, nichts zu gesund oder schaedlich, kein Trick am Schluss.
const SKX = 660, SKY = 1132, SKA = .8, SKB = .5;
function classK(t, o) { o = o || {}; let s = room3(t, { a: '#101A33', b: '#1B2C52', c: '#263E6E', fl: '#2A2F45', fs: '#3A4060', ln: '#A8E63C', id: 'k7', glow: [660, 820, 520, 420, '#A8E63C', .35] });
  s += '<rect x="56" y="650" width="968" height="372" rx="14" fill="#7A5230" stroke="#0B1020" stroke-width="6"/><rect x="74" y="668" width="932" height="336" rx="6" fill="#1F5A46"/><rect x="74" y="668" width="932" height="336" rx="6" fill="#000" opacity=".12"/><path d="M110 700 q60 -8 120 0 M800 960 q70 6 150 -4" stroke="#fff" stroke-width="5" opacity=".08" fill="none"/><rect x="120" y="1022" width="840" height="16" rx="6" fill="#5C3D22" stroke="#0B1020" stroke-width="5"/><rect x="170" y="1008" width="56" height="14" rx="4" fill="#F4F6FB" stroke="#0B1020" stroke-width="3"/><rect x="240" y="1010" width="40" height="12" rx="4" fill="#FF8FCB" stroke="#0B1020" stroke-width="3"/>';
  if (o.num !== undefined) s += '<g opacity=".94" transform="translate(280 ' + (o.ny || 892) + ') rotate(-3)"><text text-anchor="middle" font-size="132" font-weight="900" font-family="Inter Display" fill="#F4F6FB" stroke="#F4F6FB" stroke-width="2" letter-spacing="2">' + o.num + '</text><text y="70" text-anchor="middle" font-size="44" font-weight="800" font-family="Inter Display" fill="#F4F6FB" opacity=".85">' + (o.lab || 'Knochen') + '</text><path d="M-150 84 q150 14 300 -4" stroke="#F4F6FB" stroke-width="7" fill="none" stroke-linecap="round" opacity="' + (o.under ? .9 : 0) + '"/></g>';
  s += '<rect x="476" y="1132" width="368" height="420" rx="10" fill="#6B4A2E" stroke="#0B1020" stroke-width="6"/><rect x="456" y="1118" width="408" height="30" rx="10" fill="#8B5E3C" stroke="#0B1020" stroke-width="6"/><path d="M500 1180 H820 M500 1420 H820" stroke="#4A3320" stroke-width="5" opacity=".6"/>';
  return s; }
const KS = (g) => lerp(SKB, SKA, g);
// ---------- Einstieg ----------
// Beim ersten Satz waechst das Baby-Skelett zum Erwachsenen, die Kreidezahl laeuft von 300 auf 206. Danach winkt es, zaehlt seine Finger, tippt sich an den Kopf.
// Beim Nachsatz faellt ihm der Schaedel herunter und landet auf Schalti (Einschlag bei 0,9 s). Schalti taumelt und wirft ihn zurueck.
const headPosK = e => { const top = SKY - skelHeadK(1) * SKA; if (e < .35) return [SKX, top + 58 * SKA, 18 * Math.sin(e * 30) * cl(e / .3)]; if (e < .9) { const q = (e - .35) / .55; return [lerp(SKX, 410, q * q * .5 + q * .5), lerp(top + 58 * SKA, 1490, q * q) - 60 * Math.sin(Math.PI * q), -220 * q]; }
  if (e < 2.3) { const c = e - .9; return [lerp(410, 330, cl(c / 1.0)), 1490 - 80 * Math.abs(Math.sin(c * 6.2)) * Math.exp(-c * 2.4), -220 - 240 * cl(c / 1.0)]; }
  if (e < 2.95) { const q = (e - 2.3) / .65; return [lerp(330, SKX, q), lerp(1490, top + 58 * SKA, q) - 300 * Math.sin(Math.PI * q), -460 + 460 * q]; } return [SKX, top + 58 * SKA, 10 * Math.sin((e - 2.95) * 18) * cl(1 - (e - 2.95) / .5)]; };
const schK = (e, t) => e < .9 ? [lerp(220, 250, ease(cl(e / .4))), 1537] : e < 1.3 ? [lerp(250, 150, ease((e - .9) / .4)), 1537] : e < 2.15 ? [150 + 3 * Math.sin(t * 40), 1537] : e < 2.32 ? [lerp(150, 262, (e - 2.15) / .17), 1537] : [lerp(262, 220, cl((e - 2.32) / .5)), 1537];
WORLD.h7bone = function (sc, ev, t, lt) { const e = ev.gag, hit = e !== undefined && e >= .9 ? e - .9 : undefined, sh = shake7(hit, t), g = ease(cl((lt - .6) / 1.1)), n = Math.round(lerp(300, 206, g));
  let s = classK(t, { num: lt < .5 ? '300' : String(n), under: g >= 1 }), o = { g: g, cart: 1 - g, sk: g, sac: g, smile: 1 };
  if (e === undefined) { const c = lt - 2.2; if (c > 0) { const m = c % 6; if (m < 1.6) o.wave = Math.sin(Math.PI * m / 1.6); else if (m < 3.4) { o.wave2 = .55 * Math.sin(Math.PI * (m - 1.6) / 1.8); o.lookY = 1; o.look = -1; } else if (m < 5) { o.wave = .92 * Math.sin(Math.PI * (m - 3.4) / 1.6); o.tilt = 8 * Math.sin(Math.PI * (m - 3.4) / 1.6); } }
    s += skelK(SKX, SKY, KS(g), t, o) + puffb(SKX, SKY - 260, (lt - .55) / .6, 300); }
  else { const hp = headPosK(e); o.noSkull = 1; o.wave = e > .9 && e < 2.3 ? .8 : 0; o.wave2 = e > .9 && e < 2.3 ? .8 : (e < .35 ? .4 : 0); o.lean = e > .9 && e < 2.3 ? 6 * Math.sin(t * 6) : 0;
    s += skelK(SKX, SKY, SKA, t, o); if (hp) s += skullK(hp[0], hp[1], SKA, hp[2], 1, 0, t, { smile: 1 }); }
  if (hit !== undefined && hit < 1.1) s += word7('KLONK!', 700, 1420, hit, '#FFE14D', -4);
  return W('<g transform="translate(' + (sh[0] * .5) + ' ' + (sh[1] * .5) + ')">' + s + '</g>' + shade3()); };
WMASC.h7bone = (ev, t, lt, sc) => { const e = ev.gag;
  if (e === undefined) return lt > .6 && lt < 1.7 ? stay3([lerp(220, 180, ease(cl((lt - .6) / .4))), 1537], 1, { r: -14 }) : stay3([lerp(180, 220, ease(cl((lt - 1.7) / .5))), 1537], 1, { r: -3 + 2 * Math.sin(t * 2) });
  const p = schK(e, t); return stay3(p, 1, { r: e < .9 ? 9 : e < 2.15 ? -16 : e < 2.32 ? 14 : -6 * cl(1 - (e - 2.32) / .6), nospin: 1 }); };

// ---------- Teil 1: das Baby ----------
// Das Skelett schrumpft zurueck zum Baby. Knorpel leuchtet blau, der Schaedel wird gross gezeigt (Platten mit Luecken), dann biegt es sich.
WORLD.b7a = function (sc, ev, t, lt) { const p1 = ev.p1, p2 = ev.p2, a = ev.act, g = 1 - ease(cl((lt - .3) / .9)), big = p2 === undefined ? 0 : (a === undefined ? ease(cl(p2 / .5)) : 1 - ease(cl(a / .4)));
  let s = classK(t, { num: g < .05 ? '300+' : String(Math.round(lerp(300, 206, g))), lab: 'Knochen und Knorpel' });
  const pulse = p1 !== undefined && p2 === undefined ? .5 + .5 * Math.sin(t * 6) : 0;
  s += '<g opacity="' + (1 - .75 * big) + '">' + skelK(SKX, SKY, KS(g), t, { g: g, cart: (1 - g) * (p1 !== undefined ? 1 - .25 * pulse : .55), sk: g, sac: g, smile: 1, lean: a === undefined ? 0 : 34 * Math.sin(Math.PI * cl((a - .3) / 2.2)) * Math.sin(t * 2.2 + 1), wave: a !== undefined ? .5 + .4 * Math.sin(t * 3) : 0, wave2: a !== undefined ? .5 - .4 * Math.sin(t * 3) : 0 }) + '</g>' + puffb(SKX, SKY - 240, (lt - .25) / .6, 280);
  if (big > 0) s += skullK(lerp(SKX, 720, big), lerp(SKY - skelHeadK(0) * SKB + 60, 880, big), lerp(SKB * 1.5, 2.3, big), 0, .0 + .25 * Math.abs(Math.sin(t * 2.4)), .5, t, { smile: 1 }) + chip3(300, 716, 'Lücken', 40, '#FFD23F', '#0B1020', (p2 - .7) / .3);
  if (p1 !== undefined && p2 === undefined) s += chip3(330, 716, 'blau = Knorpel', 38, '#9ADCFF', '#0B1020', (p1 - .4) / .3);
  return W(s + shade3(), slot(ev, [['panel', 'Baby: über 300 Teile'], ['p1', 'Viel davon ist Knorpel', 'hot'], ['p2', 'Schädel: Platten mit Lücken'], ['act', 'Darum so biegsam', 'hot']])); };
WMASC.b7a = (ev, t) => { const a = ev.act; if (a !== undefined && a > .5 && a < 2.6) return stay3([220, 1537 - 16 * Math.abs(Math.sin((a - .5) * 3))], 1, { r: 16 * Math.sin((a - .5) * 3), nospin: 1 }); if (ev.p2 !== undefined && a === undefined) return stay3([lerp(220, 250, ease(cl(ev.p2 / .4))), 1537], 1, { r: 9 }); return BIG3(); };

// ---------- Teil 2: zusammenwachsen ----------
// Das Kind waechst, Blau wird zu Knochenfarbe, die Schaedelplatten schliessen sich. Eine Lupe zeigt das Kreuzbein: fuenf Wirbel werden einer. Dann leuchten Haende und Fuesse.
WORLD.b7b = function (sc, ev, t, lt) { const p1 = ev.p1, p2 = ev.p2, a = ev.act, g = .55 * ease(cl((lt - .3) / 1.4)), fu = p1 === undefined ? 0 : ease(cl((p1 - .2) / 1.0)), sac = p2 === undefined ? 0 : ease(cl((p2 - 1.0) / 1.0));
  let s = classK(t, p2 !== undefined ? {} : { num: String(Math.round(lerp(300, 240, Math.max(g / .55 * .4, fu)))), lab: 'werden weniger' });
  s += skelK(SKX, SKY, KS(g), t, { g: g, cart: lerp(.55, .15, g / .55), sk: fu, sac: sac, hlSac: p2 !== undefined && a === undefined, smile: 1, hl: a !== undefined, wave: a !== undefined ? .75 : 0, wave2: a !== undefined ? .75 : 0 });
  if (p1 !== undefined && p2 === undefined) s += puffb(SKX, SKY - skelHeadK(g) * KS(g) + 40, (p1 - .2) / .5, 150) + chip3(330, 716, 'verwachsen', 40, '#FFD23F', '#0B1020', (p1 - .8) / .3);
  if (p2 !== undefined && a === undefined) { const k = back(cl(p2 / .4)), B = 'stroke="#0B1020" stroke-width="6"'; let m = '<circle r="150" fill="#0E1730" ' + B + '/><circle r="150" fill="none" stroke="#A8E63C" stroke-width="10"/>';
    for (let i = 0; i < 5; i++) { const w = 150 - i * 22, yy = -92 + i * (34 + 10 * (1 - sac)) - 10 * (1 - sac); m += '<rect x="' + (-w / 2) + '" y="' + yy.toFixed(1) + '" width="' + w + '" height="' + (34 + 4 * sac) + '" rx="9" fill="#FFF6DF" stroke="#0B1020" stroke-width="' + (sac > .9 ? 2 : 6) + '"/>'; }
    if (sac > .9) m += '<path d="M-75 -102 H75 L31 86 H-31 Z" fill="none" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/>';
    s += '<path d="M430 880 L' + (SKX - 20) + ' ' + (SKY - 250 * KS(g)) + '" stroke="#A8E63C" stroke-width="6" stroke-dasharray="14 10"/><g transform="translate(300 880) scale(' + k.toFixed(3) + ')">' + m + '<path d="M106 106 L170 170" stroke="#0B1020" stroke-width="30" stroke-linecap="round"/><path d="M106 106 L170 170" stroke="#8B5E3C" stroke-width="18" stroke-linecap="round"/></g>' + chip3(300, 716, sac > .9 ? '1 Kreuzbein' : '5 Wirbel', 40, '#FFD23F', '#0B1020', (p2 - .5) / .3); }
  if (a !== undefined) s += chip3(300, 770, 'Hände und Füße', 40, '#A8E63C', '#0B1020', (a - .5) / .3) + chip3(300, 870, 'die Hälfte', 40, '#FFD23F', '#0B1020', (a - 1.1) / .3);
  return W(s + shade3(), slot(ev, [['panel', 'Knorpel wird zu Knochen'], ['p1', 'Viele Teile wachsen zusammen', 'hot'], ['p2', '5 Wirbel werden 1 Kreuzbein'], ['act', 'Hälfte in Händen und Füßen', 'hot']])); };
WMASC.b7b = (ev, t) => { const a = ev.act; if (a !== undefined && a > .6 && a < 2.4) return stay3([220, 1537 - 18 * Math.abs(Math.sin((a - .6) * 3.5))], 1.03, { r: -8, nospin: 1 }); if (ev.p2 !== undefined && a === undefined) return stay3([lerp(220, 190, ease(cl(ev.p2 / .4))), 1537], 1, { r: -8 }); return BIG3(); };

// ---------- Teil 3: die Wachstumsfugen, 206 ----------
// Blaue Fugen an den langen Knochen, das Skelett waechst in die Laenge. Dann verknoechern die Fugen. Die Tafel zeigt "bis etwa 20", am Ende 206.
WORLD.b7c = function (sc, ev, t, lt) { const p1 = ev.p1, p2 = ev.p2, a = ev.act, grow = ease(cl((lt - 1.0) / 2.2)), close = p1 === undefined ? 0 : ease(cl((p1 - .3) / 1.2)), g = lerp(.55, .92, grow) + .08 * close, pl = cl((lt - .2) / .4) * (1 - close);
  let s = classK(t, a !== undefined ? { num: String(Math.round(lerp(240, 206, ease(cl(a / .9))))), under: a > 1.0 } : p2 !== undefined ? { num: '≈ 20', lab: 'Jahre' } : { num: '240', lab: 'werden weniger' });
  s += skelK(SKX, SKY, KS(g), t, { g: g, cart: .15 * (1 - close), sk: 1, sac: 1, plates: pl, smile: 1, wave: p2 !== undefined && a === undefined ? .96 : (a !== undefined ? Math.sin(Math.PI * cl((a - 1.0) / 1.6)) : 0), tilt: p2 !== undefined && a === undefined ? 6 : 0, lean: a !== undefined && a > 1.2 ? 10 * Math.sin(Math.PI * cl((a - 1.2) / 1.4)) : 0 });
  if (p1 === undefined) s += chip3(310, 716, 'Wachstumsfugen', 38, '#9ADCFF', '#0B1020', (lt - .6) / .3);
  if (p1 !== undefined && p2 === undefined) s += chip3(310, 716, 'verknöchert', 40, '#FFD23F', '#0B1020', (p1 - .9) / .3);
  return W(s + shade3(), slot(ev, [['panel', 'Knochen wachsen an Fugen'], ['p1', 'Ausgewachsen: Fugen verknöchern', 'hot'], ['p2', 'Meist bis etwa zwanzig'], ['act', 'Übrig: rund 206 Knochen', 'hot']])); };
WMASC.b7c = (ev, t) => { const a = ev.act; if (a !== undefined && a > 1.0 && a < 2.6) return stay3([220, 1537 - 20 * Math.abs(Math.sin((a - 1.0) * 3.9))], 1, { r: -8, nospin: 1 }); return BIG3(); };

// ---------- Schluss: noch einmal Baby, Kind, Erwachsener am selben Skelett ----------
WORLD.b7out = function (sc, ev, t, lt) { const c2 = ev.c2, c3 = ev.c3, g = c3 !== undefined ? lerp(.55, 1, ease(cl(c3 / .8))) : c2 !== undefined ? .55 * ease(cl(c2 / .8)) : 0;
  return W(classK(t, { num: g >= 1 ? '206' : g > .5 ? '240' : '300+', under: g >= 1 }) + skelK(SKX, SKY, KS(g) * back(cl((lt - .1) / .4)), t, { g: g, cart: .55 * (1 - g), sk: cl(g * 2), sac: g, smile: 1, wave: g >= 1 ? .8 : 0 }) + '<rect width="1080" height="1920" fill="#02030F" opacity=".3"/>' + shade3()); };
['h7bone', 'b7a', 'b7b', 'b7c', 'b7out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'); });
