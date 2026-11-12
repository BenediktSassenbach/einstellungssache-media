# einstellungssache-media

Öffentliche Medienablage für den TikTok-Account Einstellungssache.

- `posts/NNN/` enthält die Slides eines Posts (`01.jpg` usw.) und den Inhalt als `post.json`
- `tools/slides2.js` erzeugt die Slides: `node tools/slides2.js posts/NNN/post.json <Ausgabeordner>` (braucht Playwright und die Schrift Inter Display)
- `tools/slides.js` ist die erste Vorlage ohne Maskottchen, `tools/avatar.js` erzeugt das Profilbild
- `profil/` enthält die Profilbilder

## Sichtbare Zone (Stand 13.11.2026)

TikTok verdeckt oben (Statusleiste, Suchleiste) und unten (Titel, Beschreibung) Teile der Slides. `tools/slides2.js` hält deshalb allen Inhalt zwischen y=300 und y=1570 und links von x=940. Die Slides der Woche 1 in diesem Layout liegen unter `posts/NNN/v3/`. `tools/slides2-alt-layout.js` ist die frühere Fassung mit zu hoch sitzendem Inhalt.
