// P007V4 "Warum wirkt der Mond am Horizont riesig?" im Skript 4 (17.11.2026). Design-Kennung 3.3. Welten aus P007V3 (viz_p007v3.js).
// Neu: Einstieg unter 10 Sekunden (Mond faellt schon bei "Physik nie verstanden?"), kein Wissenschaftsmodus (alles laesst sich im Ort spielen),
// eine Sprechblase. Etikett zur Papierrolle an den korrigierten Text angepasst. Zum Loeschen: diese Datei und videos/P007V4.
(function () { const o = WORLD.m7test_3; WORLD.m7test_3 = (sc, ev, t, lt, E) => { const r = o(sc, ev, t, lt, E); return typeof S !== 'undefined' && S.id === 'P007V4' ? r.replace('Papierrolle: er schrumpft sofort', 'Papierrolle: wirkt sofort normal') : r; }; })();
