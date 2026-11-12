# einstellungssache-media

Öffentliche Medienablage für den TikTok-Account Einstellungssache.

- `posts/NNN/` enthält die Slides eines Posts (`01.jpg` usw.) und den Inhalt als `post.json`
- `tools/slides2.js` erzeugt die Slides: `node tools/slides2.js posts/NNN/post.json <Ausgabeordner>` (braucht Playwright und die Schrift Inter Display)
- `tools/slides.js` ist die erste Vorlage ohne Maskottchen, `tools/avatar.js` erzeugt das Profilbild
- `profil/` enthält die Profilbilder
