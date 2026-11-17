// C009V6 "Warum traenen deine Augen beim Zwiebelschneiden?" im Skript 3.3 Stand 7 (17.11.2026).
// Wissenschaftsmodus nur dort, wo Schalti nicht sinnvoll mitspielen kann: Teil 1 ab "Schau in ihre Zellen". Dann wird die Kueche dunkel eingefaerbt
// (Zweifarb-Fassung wie bei Voyager Teil 1), Rasterpunkte kommen dazu, und die Zelle steht als leuchtende Grafik darauf.
// Teil 2 (Auge und Nerv in der Lupe, Schalti traent) und Teil 3 (Messer, Troepfchen, Trick) bleiben normal in der Kueche wie in C009V3.
// Nutzt Zeichnungen aus viz_c009v3.js und den Filter aus viz_v33.js. Zum Loeschen: diese Datei und videos/C009V6.
function cellG9(sc, ev, t, lt) { let c = cell9(sc, ev, t, lt);
  c = c.replace('<rect width="1080" height="1920" fill="url(#c9b)"/>', '');                         // eigener Hintergrund der Zelle weg, darunter liegt die Kueche im Wissenschaftsmodus
  c = c.replace(/<rect [^>]*fill-opacity="0?\.05"[^>]*\/>/g, '');                                     // Nachbarzellen weg, nur die eine Zelle als Grafik
  const f = c.lastIndexOf('<path d="M-20 1556'); if (f > 0) c = c.slice(0, f);                      // Boden der Zellen-Ansicht weg, Schalti steht in der Kueche
  return c; }
WORLD.c9zelle_6 = function (sc, ev, t, lt) { const z = ev.zwei, k = z === undefined ? 0 : ease(cl((z - .15) / .5));
  let s = kitchen9(t) + '<g opacity="' + (1 - k).toFixed(3) + '">' + onion9(660, OY9, R9) + okx1(806, 920, 44, true, (lt - 1.5) / .35) + '</g>';
  if (k > 0) s += '<g opacity="' + k.toFixed(3) + '" transform="translate(540 900) scale(' + (.85 + .15 * k).toFixed(3) + ') translate(-540 -900)">' + cellG9(sc, ev, t, lt) + '</g>';
  return W(s + shade3(), slot(ev, [['ganz', 'Ganze Zwiebel: kein Reizstoff'], ['zwei', 'In der Zelle: sauber getrennt'], ['schnitt', 'Schnitt: alles vermischt sich', 'hot'], ['act', 'Enzyme bauen den Reizstoff', 'hot']])); };
WMASC.c9zelle_6 = (ev, t, lt, sc) => WMASC.c9zelle_3(ev, t, lt, sc);
WORLD.c9zelle_6 = (function (inner) { return (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#FF6BD6'); })(WORLD.c9zelle_6);
