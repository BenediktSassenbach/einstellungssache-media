// C005V4 "Wie wird ein Taschenwaermer heiss?" im Skript 4 (17.11.2026). Design-Kennung 3.3. Text und Welten aus C005V3 (viz_c005v3.js).
// Neu: Einstieg unter 10 Sekunden (Gag schon bei "Chemie nie verstanden?"), Wissenschaftsmodus fuer Teil 2 (Teilchen, Keim, Kristall)
// und den ersten Satz von Teil 3 (Waerme wird frei): die Winternacht wird dunkel eingefaerbt, die Teilchen leuchten darauf.
// Teil 2 zeigt dafuer statt des eigenen Hintergrunds (Blick ins Kissen) die Winternacht. Zum Loeschen: diese Datei und videos/C005V4.
wrap33('wsky5_3');
WORLD.c5tklick_4 = (sc, ev, t, lt, E) => WORLD.c5tklick_3(sc, ev, t, lt, E).replace(inside5_3(t), wsky5_3(t));
WMASC.c5tklick_4 = (ev, t, lt, sc) => WMASC.c5tklick_3(ev, t, lt, sc);
// Etikett an den korrigierten Text angepasst (nur in C005V4)
(function () { const o = WORLD.c5tklick_4; WORLD.c5tklick_4 = (sc, ev, t, lt, E) => o(sc, ev, t, lt, E).replace('Plättchen knicken: ein Keim entsteht', 'Plättchen knicken: vermutlich ein Keim'); })();
