# einstellungssache-media

Öffentliche Medienablage für den TikTok-Account Einstellungssache.

- `posts/NNN/` enthält die Slides eines Posts (`01.jpg` usw.) und den Inhalt als `post.json`
- `tools/slides2.js` erzeugt die Slides: `node tools/slides2.js posts/NNN/post.json <Ausgabeordner>` (braucht Playwright und die Schrift Inter Display)
- `tools/slides.js` ist die erste Vorlage ohne Maskottchen, `tools/avatar.js` erzeugt das Profilbild
- `profil/` enthält die Profilbilder

## Sichtbare Zone (Stand 13.11.2026)

TikTok verdeckt oben (Statusleiste, Suchleiste) und unten (Titel, Beschreibung) Teile der Slides. `tools/slides2.js` hält deshalb allen Inhalt zwischen y=300 und y=1570 und links von x=940. Die Slides der Woche 1 in diesem Layout liegen unter `posts/NNN/v3/`. `tools/slides2-alt-layout.js` ist die frühere Fassung mit zu hoch sitzendem Inhalt.

## Schalti-Videos (Format E)

Videos über 1 Minute mit Maskottchen Schalti und KI-Stimme (ElevenLabs, Voice-ID `oxTvxtklDGzDRSPRmrAB`).

- `videos/VNNN/script.json`: Skript (Szenen, Zeilen, Mimik, Ereignisse, Emoji-Sticker)
- `videos/VNNN/audio/N.mp3` und `N.json`: Audio pro Szene mit ElevenLabs-Zeitstempeln
- `python3 tools/zeiten.py videos/VNNN`: Sprechzeiten pro Wort
- `node tools/video.js videos/VNNN/script.json <ordner>`: Rendern (1080 x 1920, 30 fps), `--frames` für Vorschaubilder, `--szenen` für einzelne Szenen
- `videos/_outro/`: fester Schlusssatz "Ist halt ’ne Einstellungssache."
- Fertige Videos auf `main` als `videos/VNNN/VNNN.mp4` bzw. `VNNN_v3.mp4` (Metricool lädt sie über den Raw-Link)

Werkzeuge und Skripte liegen auf dem Branch `video-pilot`. Der Inhalt liegt im sicheren Bereich (y 300 bis 1570, x unter 940).
