// Version 3.3 "Show-Ort" (Testfassung, 17.11.2026): echte Mischung aus Skript 1 und Skript 3.0.
// Der Ort aus 3.0 bleibt das ganze Bild, wird aber in der Bildsprache von Skript 1 gemalt:
//   Einstieg und Schluss: der Ort in Farbe, darin die Show-Buehne aus Skript 1 (drehender Strahlenkranz in Serienfarbe hinter dem Themen-Objekt,
//     Lichtschein, Rasterpunkte, dunkler Rand).
//   Teile 1 bis 3: der Ort wird zur dunklen Zweifarb-Fassung seiner selbst (Grundton dunkel, Formen in gedaempfter Serienfarbe) wie der dunkle Grund
//     aus Skript 1. Die Erklaergrafik steht darauf in voller Farbe, mit Lichtschein dahinter wie im Schaubild. Zum Start jedes Teils blitzt der Strahlenkranz kurz auf.
//   Schalti steht auf dem Boden des Ortes, Kamera und Interaktion wie 3.0, dazu wie in Skript 1 eine kurze Sprechblase pro Video.
// Wirkt nur bei "design": "3.3" im Skript. Greift bei Folgen, deren 3.0-Fassung den Ort getrennt von der Grafik liefert (place3 aus viz_v3c.js),
// und bei Folgen, die fuse33 selbst aufrufen (P027). Zum Loeschen: diese Datei und die Ordner videos/*V33.
function hex33(h) { return [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255); }
function duo33(col) { const d = [6, 10, 28].map(v => v / 255), a = hex33(col), l = a.map((v, i) => v * .52 + [11, 16, 32][i] / 255 * .48);
  return '<filter id="duo33" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".3 .59 .11 0 0 .3 .59 .11 0 0 .3 .59 .11 0 0 0 0 0 1 0"/><feComponentTransfer>'
    + ['R', 'G', 'B'].map((c, i) => '<feFunc' + c + ' type="table" tableValues="' + d[i].toFixed(3) + ' ' + l[i].toFixed(3) + '"/>').join('') + '</feComponentTransfer></filter>'; }
function glow33(cx, cy, col, op) { return '<defs><radialGradient id="sg33"><stop offset="0" stop-color="' + col + '" stop-opacity=".6"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></radialGradient></defs><circle cx="' + cx + '" cy="' + cy + '" r="620" fill="url(#sg33)" opacity="' + op + '"/>'; }
function show33(cx, cy, col, op) { return '<defs><radialGradient id="sg33"><stop offset="0" stop-color="' + col + '" stop-opacity=".6"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></radialGradient><pattern id="ht33" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="3.5" fill="#fff" opacity=".09"/></pattern><radialGradient id="vg33" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient></defs>'
  + '<circle cx="' + cx + '" cy="' + cy + '" r="620" fill="url(#sg33)" opacity="' + op + '"/><rect width="1080" height="1920" fill="url(#ht33)"/><rect width="1080" height="1920" fill="url(#vg33)"/>'; }
// Stand 2 (17.11.2026, Benedikt): Strahlenkranz und Leuchten in Einstieg und Schluss entfernt, dort steht der Ort wie in 3.0.
// In den Teilen wechselt das Bild Satz fuer Satz zwischen dem Ort in Farbe (Schalti spielt mit den Dingen dort) und der wissenschaftlichen Ansicht
// (Wissenschaftsmodus: Ort als dunkle Zweifarb-Fassung, Grafik in voller Farbe). Welche Saetze im Wissenschaftsmodus sind, steht in der Szene unter "labor" (Zeilennummern ab 0). Wann, regelt die Liste im Skript 3.3.
// Ohne "labor" ist der ganze Teil wissenschaftlich. Der Wechsel blendet in 0,45 s weich ueber.
function lab33(sc, t) { const L = sc.labor; if (!L) return 0; const on = i => L.includes(i) ? 1 : 0; // ohne "labor" kein Wissenschaftsmodus
  let k = 0; sc.lines.forEach((l, i) => { if (t >= l.start) k = i; }); const l = sc.lines[k], j = S.scenes.indexOf(sc), ps = S.scenes[j - 1], cont = ps && ps.type === 'tip' && ps.labor && ps.labor.includes(ps.lines.length - 1) ? 1 : 0;
  const prev = k > 0 ? on(k - 1) : cont; // endet der vorige Teil im Wissenschaftsmodus, geht es ohne Wechsel weiter, sonst beginnt der Teil im normalen Modus
  return lerp(prev, on(k), ease(cl((t - l.start) / .45))); }
// bg: der Ort als SVG-Text
function fuse33(bg, sc, t, lt, o) { const col = S.accent || '#5CE1FF'; if (sc.type !== 'tip') return bg;
  const m = lab33(sc, t); if (m <= .01) return bg;
  return bg + '<defs>' + duo33(col) + '</defs><g filter="url(#duo33)" opacity="' + m.toFixed(3) + '">' + bg + '</g><g opacity="' + m.toFixed(3) + '">' + glow33(540, 915, col, .35) + '</g>'; }
// Haken in die Orts-Funktionen der 3.0-Folgen (viz_v3c.js): sie liefern den Ort getrennt von der Grafik. Szene und Zeit darin ergeben sich aus t
function wrap33(n) { const orig = window[n]; if (typeof orig !== 'function') return; window[n] = function () { const t = arguments[0]; if (typeof S === 'undefined' || S.design !== '3.3') return orig.apply(null, arguments);
  const sc = S.scenes.find(q => t >= q.start && t < q.end) || S.scenes[S.scenes.length - 1]; return fuse33(orig.apply(null, arguments), sc, t, t - sc.start); }; }
['lake4', 'openlake4', 'inice4', 'living6', 'den4', 'route4', 'kitchen1', 'kitchen9'].forEach(wrap33);

// Rasterpunkte (Stand 5, Benedikt: "bei wissenschaftlichen Erklaerungen kommen die Punkte"): liegen ueber dem ganzen Bild, sobald der Satz im Wissenschaftsmodus ist,
// also auch bei Ansichten, die keinen Ort haben (Blick in die Zelle). Haken in die Kamera look3
look3 = (function (orig) { return function (out, sc, t, lt, col) { const r = orig(out, sc, t, lt, col); if (typeof S === 'undefined' || S.design !== '3.3' || sc.type !== 'tip') return r;
  const m = lab33(sc, t), j = r.lastIndexOf('</svg>'); if (m <= .01 || j < 0) return r;
  return r.slice(0, j) + '<defs><pattern id="ht33b" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="3.5" fill="#fff" opacity=".11"/></pattern><radialGradient id="vg33b" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient></defs><g opacity="' + m.toFixed(3) + '"><rect width="1080" height="1920" fill="url(#ht33b)"/><rect width="1080" height="1920" fill="url(#vg33b)"/></g>' + r.slice(j); }; })(look3);

// ---------- Stand 6 (17.11.2026, Benedikt): Wissenschafts-Ansicht als eigene Szene ----------
// Der Ort bleibt immer der Ort aus 3.0, ohne Filter. Nur an wenigen Stellen, an denen wirklich wissenschaftlich erklaert wird, wechselt das Bild
// in eine eigene Ansicht: dunkle Buehne in Serienfarbe wie in Skript 1, feines Raster, Rasterpunkte, dunkler Rand. Dort findet die Erklaerung statt.
function lab33stage(t, col) { col = col || S.accent || '#5CE1FF'; let s = '<defs><radialGradient id="ls33" cx=".5" cy=".46" r=".8"><stop offset="0" stop-color="' + lc('#0B1020', col, .28) + '"/><stop offset="1" stop-color="#05060F"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#ls33)"/>';
  for (let x = 0; x <= 1080; x += 60) s += '<path d="M' + x + ' 0 V1920" stroke="' + col + '" stroke-width="2" opacity=".05"/>'; for (let y = 0; y <= 1920; y += 60) s += '<path d="M0 ' + y + ' H1080" stroke="' + col + '" stroke-width="2" opacity=".05"/>';
  return s; }
function lab33dots() { return '<defs><pattern id="ht33c" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="3.5" fill="#fff" opacity=".1"/></pattern><radialGradient id="vg33c" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#ht33c)"/><rect width="1080" height="1920" fill="url(#vg33c)"/>'; }
