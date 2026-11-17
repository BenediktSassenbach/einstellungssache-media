// C009V7: Zwiebel im Skript 3.3 mit Einstieg unter 10 Sekunden (17.11.2026). Gleich wie C009V6, nur der Einstieg ist kuerzer:
// Schalti springt schon beim dritten Satz auf die Arbeitsplatte, die Zwiebel wehrt sich beim vierten, beim kurzen Nachsatz liegt er unten.
// Zum Loeschen: diese Datei und videos/C009V7.
WORLD.c9hook_7 = function (sc, ev, t, lt, E) { return WORLD.c9hook_3(sc, ev, t, lt, E); };
WMASC.c9hook_7 = (ev, t, lt, sc) => { if (ev.gas !== undefined) return gag9(ev.gas, t);
  const q = since3(sc, 2, lt); if (q < 0) return { f: HOME3, s: 1, r: 2 * Math.sin(t * 3), nospin: 1 };
  if (q < .6) return hop3(q / .6, HOME3, UP9, 150, 1, S9);
  return stay3([UP9[0], CY9 - 6 * Math.abs(Math.sin(t * 5))], S9, { r: 8 }); };
