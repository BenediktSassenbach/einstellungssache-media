// Skript 2.0 (Vollbild-Design): gemeinsame Helfer fuer alle Folgen im neuen Design.
// Schalti steht bei HOME2 auf dem Boden der Szene. nospin schaltet den Standard-Salto ab (nur der Schluss-Salto bleibt).
const HOME2 = [220, 1537];
const BIG2 = () => ({ f: HOME2, s: 1, nospin: 1 });
const shade2 = () => '<defs><linearGradient id="v2t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02030F" stop-opacity=".92"/><stop offset="1" stop-color="#02030F" stop-opacity="0"/></linearGradient></defs><rect width="1080" height="600" fill="url(#v2t)"/>';
// Flucht: erschrecken (bis a), rechts aus dem Bild rennen (a bis b), weg (b bis c), links wieder hereinkommen (c bis d)
function flee2(e, t, a, b, c, d) { const run = Math.abs(Math.sin(t * 17));
  if (e < a) return { f: HOME2, s: 1, r: -12, nospin: 1 };
  if (e < b) { const k = (e - a) / (b - a); return { f: [lerp(220, 1300, k), 1537 - 14 * run], s: 1, r: 10, nospin: 1 }; }
  if (e < c) return { f: [-400, 1537], s: 1, nospin: 1 };
  const k = ease(cl((e - c) / (d - c))); return { f: [lerp(-200, 220, k), 1537 - 12 * run * (k < 1 ? 1 : 0)], s: 1, r: k < 1 ? 8 : 4 * Math.sin(t * 9) * (1 - cl((e - d) / .5)), nospin: 1 }; }
