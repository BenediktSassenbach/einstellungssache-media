// I030H "GTA 6 gratis fuer den PC?" (Informatik, Skript Videospiel + Skript 4 Abschnitt 9, Kostuem S1 Sunset-Hemd), stumme Demo v1 (22.11.2026).
// Neubau von I030 (20.11.) nach den neuen Regeln. Ort aus viz_i030.js (city30, screen30, box30, virus30, key30, coin30), dazu Moewen und Wolken.
// Pro Teil eine andere Hauptdarstellung:
//   Einstieg: Paket kracht ab Bild 1 vor den Kiosk, ein Virus springt heraus, schnappt Schalti den Schluessel und rennt weg.
//   Teil 1: Leuchtwand (Bildschirm) und Schaufenster: Konsolen, Liste wird durchgestrichen, PC bekommt ein rotes Kreuz.
//   Teil 2: Wissenschaftsmodus (Datei von innen: Dieb klaut, 113 GB fast nur Nullen, Schutzschild wird zur Seite geschoben).
//   Teil 3: Interaktion im Ort plus die eine Lupe (offizieller Laden, Fallen am Kiosk werden abgehakt, Handy mit Zwei-Faktor sperrt den Dieb aus).
// Keine Figuren, Logos oder Szenen aus dem Spiel. Zum Loeschen: diese Datei und videos/I030H.
var ACJ3 = '#7C5CFF', STJ3 = '#0B1020', GYJ3 = 1537, XHJ3 = 300;
const mvJ3 = (a, b, k) => lerp(a, b, ease(cl(k)));
function lifeJ3(t) { return ''/* Wolken raus: lagen vor den Haeusern */ + (typeof gulls28 === 'function' ? gulls28(t) : ''); }
function propsJ3(t) { let s = '';
  s += '<g transform="translate(975 1500)"><ellipse cx="0" cy="4" rx="46" ry="10" fill="#000" opacity=".25"/><path d="M-36 -110 h72 l-8 110 h-56 Z" fill="#3A8C6E" stroke="' + STJ3 + '" stroke-width="5"/><rect x="-42" y="-122" width="84" height="16" rx="6" fill="#2E6E56" stroke="' + STJ3 + '" stroke-width="5"/></g>'; // Muelleimer
  s += '<g transform="translate(1050 1430)"><ellipse cx="0" cy="4" rx="40" ry="9" fill="#000" opacity=".25"/><rect x="-20" y="-80" width="40" height="80" rx="10" fill="#E8384F" stroke="' + STJ3 + '" stroke-width="5"/><rect x="-34" y="-62" width="68" height="16" rx="6" fill="#C42A3E" stroke="' + STJ3 + '" stroke-width="4"/><circle cy="-92" r="16" fill="#E8384F" stroke="' + STJ3 + '" stroke-width="5"/></g>'; // Hydrant
  // Laterne entfernt (Mast lief durch den Untertitel)
  s += '<ellipse cx="300" cy="1720" rx="180" ry="26" fill="#E8A07A" opacity=".55"/><ellipse cx="300" cy="1720" rx="140" ry="16" fill="#FFD2A8" opacity=".35"/>'; // Pfuetze mit Abendlicht
  return s; }
function streetJ3(t, o) { return city30(t, Object.assign({ rx: -90 }, o)) + lifeJ3(t) + propsJ3(t); }

// rotes Kreuz ueber dem PC im Schaufenster
const crossJ3 = (k) => k <= 0 ? '' : '<g opacity="' + cl(k * 2).toFixed(2) + '" transform="translate(200 870) scale(' + back(cl(k)).toFixed(3) + ')"><path d="M-60 -60 L60 60 M60 -60 L-60 60" stroke="#FF3B5C" stroke-width="18" stroke-linecap="round"/></g>';
// Handy mit Zwei-Faktor-Code (fuer die Lupe)
function phoneJ3(t, k) { return '<rect x="-320" y="-320" width="640" height="640" fill="#1B2050"/><rect x="-150" y="-260" width="300" height="520" rx="40" fill="#0B1020" stroke="#F4F6FB" stroke-width="10"/><rect x="-126" y="-230" width="252" height="460" rx="24" fill="#2A3560"/>' + svgT(0, -150, 'Zwei-Faktor', 40, '#fff') + '<rect x="-100" y="-90" width="200" height="90" rx="16" fill="#0B1020"/>' + svgT(0, -30, ['482 913', '107 554', '936 218', '275 049'][Math.floor(t * .8) % 4], 48, '#3DFF7A') + '<g transform="translate(0 110)"><rect x="-40" y="-20" width="80" height="60" rx="10" fill="' + lc('#5A6070', '#2ECC71', k) + '"/><path d="M-26 -20 v-20 a26 26 0 0 1 52 0 v20" stroke="' + lc('#5A6070', '#2ECC71', k) + '" stroke-width="12" fill="none"/></g>'; }
// Wissenschaftsmodus: eine Datei von innen
function fileJ3(t, ev) { const wa = ev.warn, st = ev.stiehlt, gr = ev.gross, au = ev.aus; let s = '';
  if (au === undefined) { // Datei-Symbol mit Kartei-Ecke
    const k = ease(cl((wa || 0) / .6)); s += '<g opacity="' + k.toFixed(2) + '"><path d="M240 640 H700 L840 780 V1140 H240 Z" fill="#F4F6FB" stroke="#5CE1FF" stroke-width="6"/><path d="M700 640 V780 H840" fill="#DDE2EE" stroke="#5CE1FF" stroke-width="6"/>' + svgT(400, 720, 'GTA6_PC.exe', 34, STJ3, 'start') + '</g>';
    if (gr !== undefined) { const f = cl(gr / 2.4); for (let r = 0; r < 9; r++) for (let c = 0; c < 14; c++) { const idx = r * 14 + c; if (idx / 126 > f) continue; const x = 270 + c * 40, y = 790 + r * 38; if (r === 8 && c === 13) s += '<rect x="' + (x - 4) + '" y="' + (y - 20) + '" width="34" height="30" rx="6" fill="#9D4EDD" stroke="' + STJ3 + '" stroke-width="3"/>'; else s += svgT(x + 12, y + 2, '0', 26, '#B8C0D4'); }
      if (f >= 1) { const c = (t * 1.2) % 1; s += '<circle cx="808" cy="1096" r="' + (20 + 40 * c).toFixed(0) + '" fill="none" stroke="#9D4EDD" stroke-width="5" opacity="' + (1 - c).toFixed(2) + '"/>'; } }
    else { const run = st !== undefined, c = st === undefined ? 0 : ease(cl((st - .3) / 2)); s += virus30(!run ? 520 + 190 * Math.sin(t * 1.3) : lerp(420, 700, c) + (c >= 1 ? -90 + 90 * Math.cos(t * 2.4) : 0), 1100 - (c >= 1 ? 30 * Math.abs(Math.sin(t * 5)) : 0), .9, t, { run: 1, dir: run && c < 1 ? 1 : (!run ? (Math.cos(t * 1.3) > 0 ? 1 : -1) : (Math.sin(t * 2.4) > 0 ? -1 : 1)), sack: c > .4 });
      if (st !== undefined) { for (let i = 0; i < 3; i++) { const f = cl((st - .3 - i * .35) / .6); if (f <= 0 || f >= 1) continue; s += (i === 1 ? coin30 : key30)(lerp(300 + i * 60, 680, ease(f)), lerp(860, 1040, ease(f)) - 80 * Math.sin(Math.PI * f), i * 40); } } } }
  else { // Laufwerk C mit Schutzschild, das zur Seite geschoben wird
    const k = ease(cl(au / .5)), push = ease(cl((au - 1.4) / .8)); s += '<g opacity="' + k.toFixed(2) + '"><rect x="300" y="820" width="480" height="260" rx="24" fill="#2A3560" stroke="#F4F6FB" stroke-width="6"/>' + svgT(540, 970, 'C:', 90, '#F4F6FB') + '</g>';
    const sx = lerp(540, 940, push), sop = 1 - .6 * push; s += '<g transform="translate(' + sx.toFixed(0) + ' 760) rotate(' + (30 * push).toFixed(0) + ')" opacity="' + sop.toFixed(2) + '"><path d="M0 -90 L80 -60 V10 Q80 70 0 100 Q-80 70 -80 10 V-60 Z" fill="#2ECC71" stroke="#F4F6FB" stroke-width="6"/><path d="M-30 0 l22 24 l40 -46" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/></g>';
    if (push < .1) { const c = (t * .9) % 1; s += '<rect x="300" y="' + (820 + 260 * c).toFixed(0) + '" width="480" height="8" fill="#2ECC71" opacity=".6"/>'; }
    if (push > .5) { const vk = cl((au - 2) / .8); s += '<g opacity="' + (1 - cl((vk - .7) / .3)).toFixed(2) + '">' + virus30(lerp(120, 330, vk), 1000, .8, t, { run: 1, dir: 1 }) + '</g>'; } }
  return s; }

// ---------- Einstieg ----------
WORLD.j3Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop; let s = streetJ3(t, { scr: 'dl', press: fr === undefined ? 0 : Math.sin(Math.PI * cl((fr - .3) / .5)) });
  const dr = cl(lt / .35), opn = ease(cl((lt - .45) / .3)); const bw = lt > 3 ? 6 * Math.sin(t * 8) * Math.max(0, Math.sin(t * 1.7)) : 0; s += '<g transform="rotate(' + bw.toFixed(2) + ' 620 ' + GYJ3 + ')">' + box30(620, lerp(900, GYJ3, ease(dr)), 1.3, opn) + '</g>'; // Paket kracht ab Bild 1 herunter
  if (dr >= 1 && lt < .9) { const c = (lt - .35) / .55; for (let i = 0; i < 8; i++) { const a = Math.PI + i * Math.PI / 7; s += '<circle cx="' + (620 + Math.cos(a) * 180 * c).toFixed(0) + '" cy="' + (GYJ3 + Math.sin(a) * 50 * c).toFixed(0) + '" r="' + (14 * (1 - c) + 4).toFixed(0) + '" fill="#E8C9A0" opacity="' + (1 - c).toFixed(2) + '"/>'; } }
  // Virus springt heraus, schnappt den Schluessel, rennt zum Kiosk
  if (lt > .6) { const grab = cl((lt - 1.1) / .5), flee = fr === undefined ? 0 : ease(cl(fr / 1.6)); let vx = lerp(620, 485, cl((lt - .6) / .5)), vy = GYJ3 - 160 * Math.sin(Math.PI * cl((lt - .6) / .5)), vz = 1.1;
    if (flee > 0) { vx = lerp(485, 1250, flee); vy = GYJ3 + 60 * Math.sin(Math.PI * flee); vz = 1.1; } s += virus30(vx, vy, vz, t, { run: flee > 0 && flee < 1 || (lt > .6 && lt < 1.1), dir: flee > 0 ? 1 : -1, sack: grab >= 1 });
    if (grab > 0 && grab < 1) s += key30(lerp(XHJ3 + 40, vx - 50, ease(grab)), lerp(GYJ3 - 120, vy - 110, ease(grab)) - 60 * Math.sin(Math.PI * grab), grab * 300); }
  if (lo !== undefined) { const c = (t * 1.5) % 1; s += '<circle cx="780" cy="700" r="' + (90 + 60 * c).toFixed(0) + '" fill="none" stroke="#FF3B5C" stroke-width="7" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  return W(s + shade3()); };
WMASC.j3Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lo !== undefined) { const st = Math.abs(Math.sin(t * 9)) * (1 - cl(lo / 1.2)); return stay3([XHJ3 + 60, GYJ3 - 16 * st], 1, { r: -6, mood: 'angry' }); }
  if (fr !== undefined) { const run = ease(cl(fr / 1.4)); return Object.assign(stay3([lerp(XHJ3, XHJ3 + 60, run), GYJ3], 1, { r: 8, mood: 'shock' }), run < 1 ? { run: 1 } : {}); }
  if (lt < 1.2) return stay3([XHJ3 - 30 * cl((lt - .3) / .4), GYJ3 - 30 * Math.sin(Math.PI * cl((lt - .3) / .4))], 1, { r: -14 * Math.sin(Math.PI * cl((lt - .3) / .5)), mood: 'shock' });
  return stay3([XHJ3 - 30, GYJ3], 1, { r: 10 * Math.sin(Math.PI * cl((lt - 1.1) / .5)), mood: 'shock' }); };

// ---------- Teil 1: keine PC-Version (Leuchtwand und Schaufenster) ----------
WORLD.j3Kein = function (sc, ev, t, lt) { const ko = ev.kons, an = ev.angek, cg = ev.cloud, fk = ev.fake;
  const scr = cg !== undefined && fk === undefined ? 'cloud' : (an !== undefined || ko !== undefined ? 'plat' : 'dl');
  let s = streetJ3(t, { scr: scr, kons: ko === undefined ? 0 : cl((ko - .4) / .5) * (fk === undefined ? 1 : 1 - cl(fk / .3)), lst: an === undefined ? 0 : cl((an - .2) / 2), pc: fk === undefined ? 0 : cl(fk / .4) }) + box30(620, GYJ3, 1.3, 1);
  if (fk !== undefined) s += crossJ3(cl((fk - .8) / .4));
  if (ko !== undefined && an === undefined) { const c = (t * 1.3) % 1; s += '<rect x="30" y="752" width="340" height="238" fill="none" stroke="#FFE14D" stroke-width="' + (10 * (1 - c)).toFixed(1) + '"/>'; for (let i = 0; i < 2; i++) s += '<circle cx="' + (i ? 280 : 120) + '" cy="' + (i ? 830 : 800) + '" r="' + (10 + 6 * Math.sin(t * 6 + i * 2)).toFixed(1) + '" fill="#3DFF7A" opacity=".7"/>'; }
  if ((an !== undefined || ko !== undefined) && cg === undefined) { const c = (t * 1.4) % 1; s += '<rect x="612" y="548" width="336" height="254" rx="12" fill="none" stroke="#FFE14D" stroke-width="' + (8 * (1 - c)).toFixed(1) + '"/>'; }
  return W(s + shade3(), slot(ev, [['kons', 'Nur PS5 und Xbox Series'], ['angek', 'Keine PC-Version', 'hot'], ['cloud', 'Cloud: nur auf Xbox-Konsolen'], ['fake', 'PC-Download = Fake', 'hot']])); };
WMASC.j3Kein = (ev, t, lt) => { const ko = ev.kons, an = ev.angek, fk = ev.fake;
  if (fk !== undefined) { const knock = Math.abs(Math.sin(t * 10)) * cl((fk - .3) / .2) * (1 - cl((fk - 1.2) / .2)); return stay3([300, GYJ3], 1, { r: 14 * knock, mood: 'cool' }); }
  if (an !== undefined) return stay3([300, GYJ3 - 12 * Math.abs(Math.sin(Math.PI * cl(an / .6)))], 1, { r: -4, mood: 'happy' });
  if (ko !== undefined) { const w = Math.sin(Math.PI * cl((ko - .2) / 1.4)); return stay3([mvJ3(XHJ3 + 60, 300, ko / .8), GYJ3], 1, { r: -10 * w, mood: 'happy' }); }
  return stay3([XHJ3 + 60, GYJ3], 1, { r: 3 }); };

// ---------- Teil 2: was im Fake steckt (Wissenschaftsmodus, nur hier) ----------
WORLD.j3Inhalt = function (sc, ev, t, lt) { const bg = fuse33(streetJ3(t, { scr: 'warn' }) + box30(620, GYJ3, 1.3, 1), sc, t, lt); const m = lab33(sc, t);
  let s = bg; if (ev.rehook !== undefined && ev.warn === undefined) { const c = (t * 2) % 1; s += '<rect x="612" y="548" width="336" height="254" rx="12" fill="#FF3B5C" opacity="' + (.35 * (1 - c)).toFixed(2) + '"/>'; }
  if (m > .01) s += '<g opacity="' + m.toFixed(3) + '">' + lab33dots() + '<g transform="translate(540 925) scale(.93) translate(-540 -890)">' + fileJ3(t, ev) + '</g></g>';
  return W(s + shade3(), slot(ev, [['warn', 'Warnung seit 13. November'], ['stiehlt', 'Klaut Passwörter und Krypto', 'hot'], ['gross', '113 GB, fast nur Füllstoff'], ['aus', 'Virenschutz ausgehebelt', 'hot']])); };
WMASC.j3Inhalt = (ev, t, lt) => { const rh = ev.rehook, st = ev.stiehlt, au = ev.aus;
  if (au !== undefined) { const j = Math.sin(Math.PI * cl((au - 1.4) / .6)); return stay3([210, GYJ3 - 24 * j], 1, { r: -10 * j, mood: au > 1.5 ? 'shock' : 'cool' }); }
  if (st !== undefined) return stay3([210, GYJ3 - 18 * Math.abs(Math.sin(Math.PI * cl((st - .6) / .5)))], 1, { r: 6, mood: 'angry' });
  if (ev.warn !== undefined) return stay3([210, GYJ3], 1, { r: 2 * Math.sin(t * 2), mood: 'cool' });
  const k = rh === undefined ? 0 : cl((rh - .2) / .7); return stay3([mvJ3(300, 210, k), GYJ3 - 24 * Math.sin(Math.PI * k)], 1, { r: -8 * Math.sin(Math.PI * k), mood: 'shock' }); };

// ---------- Teil 3: Schutz (Interaktion im Ort, die eine Lupe) ----------
WORLD.j3Schutz = function (sc, ev, t, lt) { const sh = ev.shop, fa = ev.fallen, pw = ev.pw;
  let s = streetJ3(t, { scr: pw !== undefined ? 'aus' : (fa !== undefined ? 'aus' : 'dl'), offiziell: sh !== undefined ? 1 : 0, kons: sh === undefined ? 0 : (fa !== undefined ? 1 : cl((sh - 1.4) / .5)) }) + box30(fa === undefined ? 620 : mvJ3(620, 775, (fa - .4) / .5), GYJ3, 1.3, 1);
  if (sh !== undefined && fa === undefined) { const c = (t * 1.2) % 1; s += '<rect x="20" y="700" width="360" height="48" rx="10" fill="none" stroke="#3DFF7A" stroke-width="' + (8 * (1 - c)).toFixed(1) + '"/>'; }
  if (fa !== undefined && pw === undefined) { s += '<rect x="616" y="552" width="328" height="246" rx="10" fill="#3A0E1E"/>'; ['Gratis-Codes', 'Beta-Zugang', 'Android-Version'].forEach((w, i) => { const k = cl((fa - .3 - i * .5) / .3), x2 = cl((fa - .6 - i * .5) / .25); if (k <= 0) return; s += '<g opacity="' + k.toFixed(2) + '">' + svgT(780, 612 + i * 70, w, 32, '#FFE14D') + '<path d="M650 ' + (600 + i * 70) + ' h' + (220 * x2).toFixed(0) + '" stroke="#FF3B5C" stroke-width="8" stroke-linecap="round"/></g>'; }); }
  if (pw !== undefined) { s += lupeH(540, 910, 190, phoneJ3(t, cl((pw - 2) / .4)), ease(cl(pw / .5)), XHJ3 + 70, GYJ3 - 120);
    const inV = ease(cl((pw - .2) / 1.2)), flee = cl((pw - 2.2) / 1); if (flee < 1) s += virus30(lerp(1250, 880, inV) + 400 * flee, GYJ3 + 70, .9, t, { run: (inV > 0 && inV < 1) || flee > 0, dir: flee > 0 ? 1 : -1, sack: 0 }); }
  return W(s + shade3(), slot(ev, [['shop', 'Nur offizielle Shops', 'hot'], ['fallen', 'Codes, Beta: Fallen'], ['pw', 'Passwort ändern, Zwei-Faktor', 'hot']])); };
WMASC.j3Schutz = (ev, t, lt) => { const rh = ev.rehook, sh = ev.shop, fa = ev.fallen, pw = ev.pw;
  if (pw !== undefined) { const k = Math.sin(Math.PI * cl((pw - 2) / .5)); return stay3([XHJ3, GYJ3 - 22 * k], 1, { r: 10 * k, mood: pw > 2 ? 'happy' : 'cool' }); }
  if (fa !== undefined) { const kick = Math.sin(Math.PI * cl((fa - .3) / .4)); return stay3([mvJ3(220, XHJ3, fa / .8), GYJ3 - 16 * kick], 1, { r: -12 * kick, mood: 'cool' }); }
  if (sh !== undefined) { const w = Math.sin(Math.PI * cl((sh - .2) / 1.2)); return stay3([mvJ3(XHJ3, 220, sh / .8), GYJ3], 1, { r: -12 * w, mood: 'happy' }); }
  return stay3([mvJ3(210, XHJ3, lt / .7), GYJ3 - 20 * Math.sin(Math.PI * cl(lt / .7))], 1, { r: 3, mood: 'cool' }); };

// ---------- Schluss ----------
WORLD.j3Out = function (sc, ev, t, lt) { return W(streetJ3(t, { scr: 'aus', offiziell: 1, kons: 1 }) + box30(775, GYJ3, 1.3, 1) + shade3()); };
WMASC.j3Out = (ev, t, lt) => stay3([XHJ3, GYJ3 - 8 * Math.abs(Math.sin(t * 4)) * (lt < 2 ? 1 : 0)], 1, { r: 2 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['j3Hook', 'j3Kein', 'j3Inhalt', 'j3Schutz', 'j3Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, ACJ3); });
