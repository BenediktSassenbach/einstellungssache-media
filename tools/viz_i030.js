// I030 "GTA 6 gratis fuer den PC?" (Informatik, Skript Videospiel, Kostuem S1 Sunset-Hemd), stumme Demo v1 (20.11.2026).
// Ort (eigens gebaut): Strassenecke bei Sonnenuntergang. Links ein Elektronikladen mit Schaufenster, rechts ein zwielichtiger Kiosk
// "GRATIS GAMES" mit Paketen, oben an der Hauswand eine grosse Leuchtwand (zeigt die Download-Seite). Alles steht im Ort, nichts schwebt.
// Keine Figuren, Logos oder Szenen aus dem Spiel. Nur Erklaerung und Schutz.
// Zum Loeschen: diese Datei und videos/I030.
var AC30 = '#7C5CFF', ST30 = '#0B1020', GY30 = 1537;
function city30(t, o) { o = o || {}; let s = ''; if (!o.noSky) { s += '<defs><linearGradient id="sk30" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B1E6E"/><stop offset=".45" stop-color="#E0527A"/><stop offset=".8" stop-color="#FFB25C"/><stop offset="1" stop-color="#FFD98A"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#sk30)"/>';
  s += '<circle cx="560" cy="760" r="120" fill="#FFE9A8" opacity=".9"/><circle cx="560" cy="760" r="200" fill="#FFE9A8" opacity=".18"/>';
  // Skyline hinten
  for (let i = 0; i < 9; i++) { const x = i * 130 - 30, h = 220 + rnd(i + 4) * 260; s += '<rect x="' + x + '" y="' + (900 - h) + '" width="120" height="' + h + '" fill="#6A2E6E" opacity=".75"/>'; for (let k = 0; k < 4; k++) s += '<rect x="' + (x + 18 + (k % 2) * 50) + '" y="' + (920 - h + 40 + Math.floor(k / 2) * 70) + '" width="26" height="30" fill="#FFC86B" opacity="' + ((Math.floor(t * .3 + i + k) % 3) ? .55 : .15) + '"/>'; }
  // Palmen
  for (const [px, ph] of [[300, 420], [800, 380]]) { s += '<path d="M' + px + ' 1020 Q' + (px + 14) + ' ' + (1020 - ph / 2) + ' ' + (px + 6) + ' ' + (1020 - ph) + '" stroke="#3A1E3E" stroke-width="16" fill="none"/>'; for (let j = 0; j < 6; j++) { const a = (-170 + j * 32 + 4 * Math.sin(t * 1.2 + j)) * Math.PI / 180; s += '<path d="M' + (px + 6) + ' ' + (1020 - ph) + ' q' + (Math.cos(a) * 80).toFixed(0) + ' ' + (Math.sin(a) * 80 - 30).toFixed(0) + ' ' + (Math.cos(a) * 150).toFixed(0) + ' ' + (Math.sin(a) * 150 + 20).toFixed(0) + '" stroke="#3A1E3E" stroke-width="12" fill="none" stroke-linecap="round"/>'; } }
  }
  // Haus links: Elektronikladen mit Schaufenster
  s += '<rect x="-20" y="560" width="440" height="520" fill="#2E8C8C" stroke="' + ST30 + '" stroke-width="6"/><path d="M-20 560 H420 V600 H-20 Z" fill="#F4E3C8" stroke="' + ST30 + '" stroke-width="5"/>';
  s += '<rect x="20" y="700" width="360" height="48" rx="10" fill="#1B1E3A" stroke="' + ST30 + '" stroke-width="5"/>' + svgT(200, 735, o.sign !== undefined ? o.sign : (o.offiziell ? 'OFFIZIELLER STORE' : 'ELEKTRONIK'), 30, o.offiziell ? '#3DFF7A' : '#5CE1FF');
  s += '<rect x="30" y="752" width="340" height="238" fill="#BFE9FF" stroke="' + ST30 + '" stroke-width="6"/><path d="M60 772 L140 980 M180 772 L250 980" stroke="#fff" stroke-width="10" opacity=".35"/>';
  // Regal im Schaufenster mit Spielehuellen (ohne Logos), damit es nicht leer ist
  if (o.noSky) { s += '<rect x="40" y="944" width="320" height="12" fill="#6A4A3A" stroke="' + ST30 + '" stroke-width="3"/><rect x="40" y="846" width="320" height="10" fill="#6A4A3A" stroke="' + ST30 + '" stroke-width="3"/>'; ['#FF5A7A', '#5CE1FF', '#FFD23F', '#7C5CFF', '#3DFF7A', '#FF9A3D', '#F4F6FB', '#FF6BD6'].forEach((c, i) => { const x = 52 + i * 38; s += '<rect x="' + x + '" y="' + (i % 3 ? 900 : 894) + '" width="30" height="' + (i % 3 ? 44 : 50) + '" rx="3" fill="' + c + '" stroke="' + ST30 + '" stroke-width="3"/><rect x="' + (x + 5) + '" y="' + (i % 3 ? 908 : 902) + '" width="20" height="14" fill="#fff" opacity=".45"/>'; s += '<rect x="' + (x + 2) + '" y="' + (800 + (i % 2) * 6) + '" width="26" height="' + (46 - (i % 2) * 6) + '" rx="3" fill="' + c + '" opacity=".85" stroke="' + ST30 + '" stroke-width="3"/>'; }); }
  // Konsolen im Schaufenster (eigene Formen, keine Marken)
  const cK = o.kons || 0; if (cK > 0) { const e = back(cl(cK)); s += '<g transform="translate(120 934) scale(' + e.toFixed(3) + ')"><path d="M-30 0 Q-40 -140 0 -170 Q40 -140 30 0 Z" fill="#F4F6FB" stroke="' + ST30 + '" stroke-width="5"/><path d="M-6 -150 V-10" stroke="#1B1E3A" stroke-width="10"/>' + svgT(0, 36, 'PS5', 28, ST30) + '</g><g transform="translate(280 934) scale(' + e.toFixed(3) + ')"><rect x="-44" y="-150" width="88" height="150" rx="8" fill="#1B1E3A" stroke="' + ST30 + '" stroke-width="5"/><circle cx="0" cy="-130" r="10" fill="#3DFF7A"/>' + svgT(0, 36, 'Xbox', 28, ST30) + '</g>'; }
  if (o.pc) { const k = cl(o.pc); s += '<g opacity="' + k.toFixed(2) + '" transform="translate(200 870)"><rect x="-70" y="-60" width="140" height="90" rx="6" fill="#2A3560" stroke="' + ST30 + '" stroke-width="5"/><path d="M0 30 v24 M-30 56 h60" stroke="' + ST30 + '" stroke-width="6"/><circle r="44" fill="none" stroke="#FF4D6D" stroke-width="9"/><path d="M-30 -30 L30 30" stroke="#FF4D6D" stroke-width="9"/></g>'; }
  // Haus rechts mit Leuchtwand (o.rx verschiebt Haus, Leuchtwand und Kiosk waagrecht)
  s += '<g transform="translate(' + (o.rx || 0) + ' 0)">';
  s += '<rect x="640" y="380" width="460" height="700" fill="#B5486E" stroke="' + ST30 + '" stroke-width="6"/>';
  for (let r = 0; r < 2; r++) for (let k = 0; k < 3; k++) s += '<rect x="' + (670 + k * 130) + '" y="' + (870 + r * 0) + '" width="80" height="0" fill="none"/>';
  s += '<rect x="702" y="548" width="336" height="254" rx="12" fill="#0F1430" stroke="' + ST30 + '" stroke-width="8"/>';
  s += screen30(o.scr || 'dl', t, o);
  // Kiosk rechts unten
  s += '<rect x="660" y="860" width="400" height="220" fill="#5E3A2E" stroke="' + ST30 + '" stroke-width="6"/><path d="M640 860 L1100 860 L1080 822 L660 822 Z" fill="#FFD23F" stroke="' + ST30 + '" stroke-width="5"/><path d="M700 822 v38 M780 822 v38 M860 822 v38 M940 822 v38 M1020 822 v38" stroke="#FF4D6D" stroke-width="16"/>';
  s += '<rect x="700" y="884" width="320" height="52" rx="8" fill="#1B1E3A" stroke="' + ST30 + '" stroke-width="4"/>' + svgT(860, 921, 'GRATIS GAMES', 32, '#FFE14D');
  for (let i = 0; i < 4; i++) s += box30(720 + i * 80, 1070 - (i % 2) * 0, .6, 0);
  s += '</g>';
  // Gehweg
  if (!o.noGround) s += '<rect x="0" y="1080" width="1080" height="840" fill="#C98A6A"/><path d="M0 1080 H1080" stroke="#FFE1C4" stroke-width="12"/>';
  if (!o.noGround) for (let i = 0; i < 7; i++) s += '<path d="M' + (i * 180 - 60) + ' 1086 L' + (i * 180 - 160) + ' 1920" stroke="#B07658" stroke-width="5"/>';
  if (!o.noGround) s += '<path d="M0 1390 H1080" stroke="#B07658" stroke-width="5"/>';
  return s; }
// Inhalt der Leuchtwand
function screen30(kind, t, o) { let s = '<g transform="translate(870 675) scale(.82)"><clipPath id="sc30"><rect x="-190" y="-140" width="380" height="280" rx="8"/></clipPath><g clip-path="url(#sc30)"><rect x="-190" y="-140" width="380" height="280" fill="#1B2050"/>';
  if (kind === 'dl') { s += svgT(0, -80, 'GTA 6 PC', 40, '#fff') + svgT(0, -40, 'GRATIS DOWNLOAD', 26, '#FFE14D'); const p = o.press || 0; s += '<rect x="-110" y="0" width="220" height="70" rx="16" fill="' + (p > 0 ? '#2FB86A' : '#3DFF7A') + '" stroke="' + ST30 + '" stroke-width="5" transform="translate(0 ' + (4 * p).toFixed(1) + ')"/>' + svgT(0, 46 + 4 * p, 'JETZT LADEN', 28, ST30) + svgT(0, 110, '100 % sicher!!', 20, '#FF9F43'); }
  if (kind === 'plat') { s += svgT(0, -80, '19.11.2026', 40, '#fff') + svgT(0, -30, 'nur PS5 und Xbox', 30, '#5CE1FF'); const k = cl(o.lst || 0); ['PC-Version', 'Demo', 'früher Zugang'].forEach((w, i) => { const kk = cl(k * 3 - i); s += '<g opacity="' + kk.toFixed(2) + '">' + svgT(-30, 20 + i * 40, w, 26, '#fff', 'middle') + '<path d="M70 ' + (12 + i * 40) + ' l24 0" stroke="#FF4D6D" stroke-width="0"/>' + svgT(120, 22 + i * 40, '✗', 30, '#FF4D6D') + '</g>'; }); }
  if (kind === 'cloud') { s += svgT(0, -80, 'Cloud Gaming', 34, '#fff'); s += '<path d="M-60 -10 q-10 -40 30 -44 q20 -34 60 -10 q40 -6 40 30 q24 20 -6 40 H-60 q-30 -10 0 -16 Z" fill="#5CE1FF" stroke="' + ST30 + '" stroke-width="4"/>' + svgT(-90, 100, 'Konsole ✓', 24, '#3DFF7A') + svgT(90, 100, 'PC ✗', 24, '#FF4D6D'); }
  if (kind === 'warn') { s += '<rect x="-190" y="-140" width="380" height="280" fill="#3A0E1E"/>' + svgT(0, -70, 'WARNUNG', 42, '#FF4D6D') + svgT(0, -20, 'seit 13.11.:', 26, '#fff') + svgT(0, 20, 'falscher PC-Download', 26, '#FFE14D') + svgT(0, 70, 'Forscher: Cynet', 22, '#9AA0C8'); }
  if (kind === '2fa') { s += svgT(0, -80, 'Zwei-Faktor', 36, '#fff') + '<rect x="-60" y="-50" width="120" height="170" rx="18" fill="#2A3560" stroke="#fff" stroke-width="5"/>' + svgT(0, 30, '482 913', 26, '#3DFF7A') + svgT(0, 70, 'Code', 20, '#fff'); }
  return s + '</g></g>'; }
// Paket. op: 0 zu, 1 offen
function box30(x, y, z, op) { const e = cl(op); return '<g transform="translate(' + x + ' ' + y + ') scale(' + z + ')"><rect x="-60" y="-100" width="120" height="100" fill="#D9A066" stroke="' + ST30 + '" stroke-width="6"/><path d="M-60 -100 L' + (-60 - 50 * e) + ' ' + (-150 + 30 * e) + ' L' + (0 - 30 * e) + ' ' + (-150 + 10 * e) + ' L0 -100 Z M60 -100 L' + (60 + 50 * e) + ' ' + (-150 + 30 * e) + ' L' + (0 + 30 * e) + ' ' + (-150 + 10 * e) + ' L0 -100 Z" fill="#C88A52" stroke="' + ST30 + '" stroke-width="5"/><rect x="-10" y="-100" width="20" height="100" fill="#E8C49A"/>' + (e < .2 ? svgT(0, -40, 'GTA 6', 22, ST30) : '') + '</g>'; }
// Virus-Wesen (Datendieb) mit Beinchen. dir: Laufrichtung, run: Laufzyklus, sack: traegt Beute
function virus30(x, y, z, t, o) { o = o || {}; const run = o.run ? 1 : 0, b = run ? 10 * Math.abs(Math.sin(t * 12)) : 3 * Math.sin(t * 3); let s = '<g transform="translate(' + x.toFixed(1) + ' ' + (y - b).toFixed(1) + ') scale(' + ((o.dir || 1) * z).toFixed(3) + ' ' + z.toFixed(3) + ')">';
  s += '<ellipse cx="0" cy="' + (b + 4) + '" rx="50" ry="10" fill="#000" opacity=".25"/>';
  for (const [lx, p] of [[-20, 0], [20, Math.PI]]) { const a = run ? 30 * Math.sin(t * 12 + p) : 0; s += '<path d="M' + lx + ' -30 l' + (Math.sin(a * Math.PI / 180) * 26).toFixed(1) + ' 30" stroke="' + ST30 + '" stroke-width="9" stroke-linecap="round"/>'; }
  for (let i = 0; i < 8; i++) { const a = i * 45 * Math.PI / 180; s += '<path d="M' + (Math.cos(a) * 44).toFixed(0) + ' ' + (-80 + Math.sin(a) * 44).toFixed(0) + ' L' + (Math.cos(a) * 64).toFixed(0) + ' ' + (-80 + Math.sin(a) * 64).toFixed(0) + '" stroke="#7B2CBF" stroke-width="10" stroke-linecap="round"/><circle cx="' + (Math.cos(a) * 66).toFixed(0) + '" cy="' + (-80 + Math.sin(a) * 66).toFixed(0) + '" r="9" fill="#B57BFF" stroke="' + ST30 + '" stroke-width="3"/>'; }
  s += '<circle cx="0" cy="-80" r="48" fill="#9D4EDD" stroke="' + ST30 + '" stroke-width="6"/><path d="M-30 -110 q14 -10 26 0" stroke="#fff" stroke-width="6" fill="none" opacity=".5"/>';
  s += '<path d="M-26 -96 l18 8 M26 -96 l-18 8" stroke="' + ST30 + '" stroke-width="6" stroke-linecap="round"/><circle cx="-14" cy="-80" r="9" fill="#fff"/><circle cx="14" cy="-80" r="9" fill="#fff"/><circle cx="-12" cy="-80" r="4" fill="' + ST30 + '"/><circle cx="16" cy="-80" r="4" fill="' + ST30 + '"/><path d="M-18 -56 q18 12 36 0" stroke="' + ST30 + '" stroke-width="5" fill="#fff"/>';
  if (o.sack) s += '<g transform="translate(46 -40)"><path d="M-10 0 q-20 -50 20 -56 q40 6 20 56 Z" fill="#8A6A4A" stroke="' + ST30 + '" stroke-width="5"/><path d="M4 -30 h18 m-10 -6 l6 0 l0 12" stroke="#FFE14D" stroke-width="5" fill="none"/></g>';
  return s + '</g>'; }
// Schluessel (Passwort) und Muenze (Krypto)
const key30 = (x, y, r) => '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + r.toFixed(0) + ')"><circle r="18" fill="none" stroke="#FFE14D" stroke-width="9"/><path d="M18 0 H64 M50 0 v14 M62 0 v10" stroke="#FFE14D" stroke-width="9" stroke-linecap="round"/></g>';
const coin30 = (x, y) => '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ')"><circle r="26" fill="#FFB020" stroke="' + ST30 + '" stroke-width="5"/>' + svgT(0, 10, '₿', 28, ST30) + '</g>';

// ---------- Einstieg ----------
WORLD.i30hook = function (sc, ev, t, lt) { const fr = ev.frage, gb = ev.gib, ja = ev.jagd; const press = fr === undefined ? 0 : Math.sin(Math.PI * cl((fr - .6) / .5));
  let s = city30(t, { scr: 'dl', press: press });
  // Paket faellt vom Kioskdach vor den Kiosk, geht auf, Virus springt heraus und jagt Schalti
  const dr = fr === undefined ? -1 : cl((fr - 1.2) / .8), opn = gb === undefined ? 0 : ease(cl(gb / .5));
  if (dr >= 0) s += box30(600, lerp(860, 1170, ease(dr)), .75, opn);
  if (gb !== undefined) { const pop = ease(cl((gb - .3) / .6)); let vx = 600, vy = 1170, dir = -1, run = 0;
    if (ja !== undefined) { const c = ease(cl(ja / 1.4)); vx = lerp(600, 120, c); vy = lerp(1170, GY30 - 20, c); run = c < 1 ? 1 : 0; }
    else vy = 1170 - 60 * Math.sin(Math.PI * cl((gb - .3) / .6));
    s += virus30(vx, vy, .7 * pop + .05, t, { run: run, dir: dir }); }
  return W(s + shade3()); };
WMASC.i30hook = (ev, t, lt) => { const fr = ev.frage, ja = ev.jagd, gb = ev.gib;
  if (ja !== undefined) { const c = ease(cl((ja - .2) / 1.2)); return Object.assign(stay3([lerp(330, -200, c), GY30], 1, { r: -10, mood: 'shock' }), c > .05 && c < 1 ? { run: 1 } : {}); }
  if (gb !== undefined) return stay3([330, GY30], 1, { r: -8 * Math.sin(Math.PI * cl(gb / .8)), mood: 'shock' });
  if (fr !== undefined) { const reach = Math.sin(Math.PI * cl((fr - .3) / 1)); return stay3([330 + 20 * reach, GY30 - 14 * reach], 1, { r: 14 * reach, mood: 'happy' }); }
  return stay3([lerp(150, 330, ease(cl(lt / 1.2))), GY30], 1, { r: 3, mood: 'happy' }); };

// ---------- Teil 1: Keine PC-Version ----------
WORLD.i30keinpc = function (sc, ev, t, lt) { const ko = ev.kons, an = ev.angek, cg = ev.cloud, fk = ev.fake;
  const scr = cg !== undefined && fk === undefined ? 'cloud' : (an !== undefined || ko !== undefined ? 'plat' : 'dl');
  let s = city30(t, { scr: scr, kons: ko === undefined ? 0 : cl((ko - .4) / .5), lst: an === undefined ? 0 : cl((an - .2) / 2), pc: fk === undefined ? 0 : cl(fk / .4) });
  return W(s + shade3(), slot(ev, [['kons', 'Nur PS5 und Xbox Series'], ['angek', 'Keine PC-Version, keine Demo', 'hot'], ['cloud', 'Cloud: nur auf Xbox-Konsolen'], ['fake', 'PC-Download = Fake', 'hot']])); };
WMASC.i30keinpc = (ev, t, lt) => { const ko = ev.kons, fk = ev.fake;
  if (fk !== undefined) { const n = Math.sin(t * 6) * cl(fk / .3) * (1 - cl((fk - 1.6) / .4)); return stay3([300, GY30], 1, { r: 8 * n, mood: 'cool' }); }
  if (ko !== undefined) { const w = Math.sin(Math.PI * cl((ko - .2) / 1.4)); return stay3([lerp(240, 300, ease(cl(ko / .8))), GY30], 1, { r: -10 * w, mood: 'happy' }); }
  return stay3([lerp(-120, 240, ease(cl(lt / 1.4))), GY30], 1, Object.assign({ r: 3 }, lt < 1.3 ? { run: 1 } : {})); };

// ---------- Teil 2: Was im Download steckt ----------
WORLD.i30inhalt = function (sc, ev, t, lt) { const wa = ev.warn, st = ev.stiehlt, gr = ev.gross, au = ev.aus; let s = city30(t, { scr: 'warn' });
  // Paket vor dem Kiosk, offen. Virus klaut Schluessel und Muenze aus Schaltis Handy-Tasche und rennt zum Kiosk
  s += box30(600, 1170, .75, 1);
  if (st !== undefined) { const c = ease(cl((st - .4) / 1.6)); const vx = lerp(520, 900, c); s += virus30(vx, 1170, .65, t, { run: c > 0 && c < 1 ? 1 : 0, dir: 1, sack: c > .3 ? 1 : 0 }); if (c < .3) { s += key30(lerp(380, 520, c / .3), lerp(1420, 1110, c / .3), 20) + coin30(lerp(400, 530, c / .3), lerp(1450, 1130, c / .3)); } }
  else s += virus30(520, 1170, .65, t, {});
  if (gr !== undefined) { const k = ease(cl(gr / .6)); s += '<g opacity="' + k.toFixed(2) + '"><rect x="160" y="780" width="760" height="380" rx="20" fill="#F4E3C8" stroke="' + ST30 + '" stroke-width="6"/>' + svgT(540, 840, 'Fake-Datei: 113 GB', 38, ST30); const fill = cl((gr - .8) / 2); for (let i = 0; i < 40; i++) { const x = 200 + (i % 10) * 70, y = 880 + Math.floor(i / 10) * 64; s += '<rect x="' + x + '" y="' + y + '" width="58" height="50" rx="6" fill="' + (i === 0 ? '#FF4D6D' : '#D8CDB8') + '" stroke="' + ST30 + '" stroke-width="3" opacity="' + cl(fill * 40 - i).toFixed(2) + '"/>'; } s += svgT(330, 1145, '■ Schadcode (winzig)', 22, '#C0394F', 'middle') + svgT(720, 1145, '■ über 100 GB Füllstoff', 22, '#6E6458', 'middle') + '</g>'; }
  if (au !== undefined) { const k = ease(cl(au / .5)); s += '<g opacity="' + k.toFixed(2) + '"><rect x="200" y="800" width="680" height="300" rx="20" fill="#1B1E3A" stroke="' + ST30 + '" stroke-width="6"/>' + svgT(540, 860, 'Virenschutz: Ausnahmen', 32, '#fff') + '<rect x="240" y="900" width="600" height="70" rx="10" fill="#2A3560"/>' + svgT(540, 946, 'C:\\  (ganze Festplatte)', 30, '#FF4D6D') + '<path d="M260 1010 h560" stroke="#3DFF7A" stroke-width="6" stroke-dasharray="' + (560 * cl((au - .6) / 1)).toFixed(0) + ' 999"/>' + svgT(540, 1060, 'wird nicht mehr geprüft', 26, '#FFE14D') + '</g>'; }
  return W(s + shade3(), slot(ev, [['warn', 'Warnung seit 13. November'], ['stiehlt', 'Klaut Passwörter und Krypto', 'hot'], ['gross', '113 GB, fast nur Füllstoff'], ['aus', 'Schaltet den Virenschutz aus', 'hot']])); };
WMASC.i30inhalt = (ev, t, lt) => { const st = ev.stiehlt; if (st !== undefined) { const c = Math.sin(Math.PI * cl((st - .3) / 1.4)); return stay3([300 + 30 * c, GY30], 1, { r: 16 * c, mood: c > .3 ? 'shock' : 'cool' }); } return stay3([300, GY30], 1, { r: 3 * Math.sin(t * 2) }); };

// ---------- Teil 3: Schutz ----------
WORLD.i30schutz = function (sc, ev, t, lt) { const sh = ev.shop, fa = ev.fallen, pw = ev.pw; let s = city30(t, { scr: pw !== undefined ? '2fa' : 'dl', offiziell: sh !== undefined ? 1 : 0, kons: sh !== undefined ? 1 : 0 });
  if (fa !== undefined) { ['Gratis-Codes', 'Beta-Zugang', 'Android-Version'].forEach((w, i) => { const k = cl((fa - .3 - i * .5) / .3); s += '<g opacity="' + k.toFixed(2) + '"><rect x="' + (690 + 0) + '" y="' + (884 + i * 60) + '" width="340" height="52" rx="8" fill="#3A0E1E" stroke="' + ST30 + '" stroke-width="4"/>' + svgT(860, 920 + i * 60, '✗ ' + w, 28, '#FF4D6D') + '</g>'; }); }
  if (pw !== undefined) s += chip3(870, 1000, 'von einem anderen Gerät', 26, '#3DFF7A', ST30, cl((pw - 1) / .3));
  return W(s + shade3(), slot(ev, [['shop', 'Nur offizielle Shops', 'hot'], ['fallen', 'Codes, Beta, Android: Fallen'], ['pw', 'Passwort ändern, Zwei-Faktor']])); };
WMASC.i30schutz = (ev, t, lt) => { const sh = ev.shop, pw = ev.pw;
  if (pw !== undefined) { const k = Math.sin(Math.PI * cl(pw / 1.4)); return stay3([300, GY30 - 10 * k], 1, { r: 10 * k, mood: 'happy' }); }
  if (sh !== undefined) { const w = Math.sin(Math.PI * cl((sh - .2) / 1.2)); return stay3([lerp(300, 220, ease(cl(sh / .8))), GY30], 1, { r: -12 * w, mood: 'happy' }); }
  return stay3([300, GY30], 1, { r: 3 }); };

// ---------- Schluss ----------
WORLD.i30out = function (sc, ev, t, lt) { return W(city30(t, { scr: '2fa', offiziell: 1, kons: 1 }) + shade3()); };
WMASC.i30out = (ev, t, lt) => stay3([300, GY30], 1, { r: 2 });

['i30hook', 'i30keinpc', 'i30inhalt', 'i30schutz', 'i30out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, AC30); });
