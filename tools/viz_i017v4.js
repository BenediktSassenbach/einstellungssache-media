// I017V4 "Ist Inkognito wirklich anonym?" im Skript 4 (17.11.2026). Design-Kennung 3.3. Welten aus I017V3 (viz_i017v3.js).
// Neu: Einstieg unter 10 Sekunden (Lichtkegel schon bei "Informatik nie verstanden?"), Wissenschaftsmodus in Teil 2 fuer Anbieter und IP-Adresse
// (Weg der Daten vom Handy ueber den Mast zur Website): die Neon-Stadt wird dunkel eingefaerbt, der Datenweg leuchtet darauf. Zum Loeschen: diese Datei und videos/I017V4.
wrap33('ccity_3');
// Etiketten an den korrigierten Text angepasst (nur in I017V4)
['i17tlokal_3', 'i17taugen_3'].forEach(n => { const o = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => { const r = o(sc, ev, t, lt, E); if (typeof S === 'undefined' || S.id !== 'I017V4') return r;
  return r.replace('Wer dein Handy nimmt, sieht nichts', 'Danach: nichts im Verlauf').replace('Google 2024: Daten löschen', 'Google 2024: löschen oder anonymisieren'); }; });
