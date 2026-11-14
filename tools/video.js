// Video-Generator Einstellungssache (Schalti, 1080x1920, 30 fps)
// node tools/video.js videos/V001/script.json <Ausgabeordner> [--frames 3.5,20,40] [--szenen 6,7]
// Mit Stimme: audio/1.mp3 ... (eine Datei pro Szene, dazu 1.json mit ElevenLabs-Zeitstempeln falls vorhanden) ablegen,\n// python3 tools/zeiten.py videos/V001 ausfuehren, dann rendern.
// Ohne zeiten.json werden die Sprechzeiten nach Zeichenzahl geschaetzt und das Video bleibt stumm.
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');
const FPS = 30, W = 1080, H = 1920, GAP = 0.22, CPS = 14.5;
const args = process.argv.slice(2);
const scriptPath = args[0], out = args[1];
const opt = k => { const i = args.indexOf(k); return i > 0 ? args[i + 1] : null; };
const S = JSON.parse(fs.readFileSync(scriptPath, 'utf8'));
const zeitenPath = path.join(path.dirname(scriptPath), 'zeiten.json');
const zeiten = fs.existsSync(zeitenPath) ? JSON.parse(fs.readFileSync(zeitenPath, 'utf8')).szenen : null;

// ---- Zeitplan: jede Zeile bekommt Start und Ende, jede Szene eine ganze Zahl an Frames
let t = 0, li = 0;
S.scenes.forEach((sc, si) => {
  sc.start = t; t += 0.35; sc.audioAt = t;
  if (zeiten) {
    const z = zeiten[si]; if (z.zeilen.length !== sc.lines.length) throw new Error('zeiten.json passt nicht zu Szene ' + (si + 1));
    sc.lines.forEach((l, k) => { l.start = t + z.zeilen[k][0]; l.end = t + z.zeilen[k][1]; if (z.woerter && z.woerter[k]) l.words = z.woerter[k].map(w => [t + w[0], t + w[1]]); });
    t += z.dauer;
  }
  else for (const l of sc.lines) {
    const d = Math.max(0.9, l.t.length / CPS);
    l.start = t; l.end = t + d; t = l.end + GAP; li++;
  }
  t += sc.type === 'outro' ? 1.6 : 0.45;
  t = Math.round(t * FPS) / FPS; sc.end = t;
});
S.total = t;

// ---- Seite: CSS und Zeichencode liegen in video_page.css und video_page.js
const page = '<!doctype html><meta charset="utf-8"><style>' + fs.readFileSync(path.join(__dirname, 'video_page.css'), 'utf8') + '</style><body>'
  + '<div class="blob b1"></div><div class="blob b2"></div><div id="fx"></div><div id="world"></div>'
  + '<div class="brand"><span class="tg"><i></i></span>Einstellungssache' + (S.serie ? '<em>' + S.serie + '</em>' : '') + '</div><div class="prog"><i id="pg"></i></div>'
  + '<div id="stage"></div><div id="wipe"></div><div id="cap"></div><div id="masc"></div><div id="bub"></div>'
  + '<script>const S=' + JSON.stringify(S).replace(/</g, '\\u003c') + ';\n' + fs.readFileSync(path.join(__dirname, 'video_page.js'), 'utf8') + '\n' + fs.readdirSync(__dirname).filter(f => /^viz_.*\.js$/.test(f)).sort((x, y) => { const r = f => f === 'viz_physik.js' ? 0 : /^viz_[cim]\d/.test(f) ? 2 : 1; return r(x) - r(y) || x.localeCompare(y); }) /* Basis zuerst, Folgen der neuen Faecher (viz_cNNN, viz_iNNN, viz_mNNN) zuletzt */.map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('\n') + '</script></body>';

function ff(a) { return new Promise((res, rej) => { const p = spawn('ffmpeg', a, { stdio: ['pipe', 'ignore', 'pipe'] }); let e = ''; p.stderr.on('data', d => e += d); p.on('close', c => c === 0 ? res() : rej(new Error(e.slice(-600)))); ff.last = p; }); }
(async () => {
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'zeitplan.json'), JSON.stringify({ total: S.total, scenes: S.scenes.map(s => ({ start: s.start, end: s.end, lines: s.lines.map(l => ({ t: l.t, start: +l.start.toFixed(3), end: +l.end.toFixed(3) })) })) }, null, 1));
  console.log('Laenge', S.total.toFixed(2), 's');
  const br = await chromium.launch();
  const mk = async () => { const pg = await br.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 }); await pg.setContent(page); await pg.evaluate(() => document.fonts.ready); return pg; };
  if (args.includes('--check')) { // Ueberlappungs-Pruefung: Text auf Text, Schalti oder Emoji auf Text
    const pg = await mk(); const hits = {};
    for (let x = 0.1; x < S.total; x += 0.2) {
      await pg.evaluate(t => draw(t), x);
      const r = await pg.evaluate(() => {
        const vis = e => { for (let n = e; n && n !== document.body; n = n.parentElement) { const c = getComputedStyle(n); if (c.display === 'none' || c.visibility === 'hidden' || +c.opacity < 0.15) return false; } return true; };
        const BOX0 = 0; const BOX = '.vlab,.vres,.vcard,#cap>div,#bub,.brand,.chk,.chk2,.cbox,.tbox,.hcard,.card,.stick,.num,.top,.lbl';
        const set = new Set();
        for (const e of document.querySelectorAll('body *')) { if (e.closest('#masc') || e.classList.contains('vemo')) continue; const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()); if (!own) continue; set.add(e.closest(BOX) || e); }
        const T = [...set].filter(vis).map(e => { const b = e.getBoundingClientRect(); return { n: (e.id ? '#' + e.id : e.className && e.className.baseVal === undefined ? '.' + String(e.className).split(' ')[0] : e.tagName) + ':' + e.textContent.trim().slice(0, 22), e, b }; }).filter(o => o.b.width > 4 && o.b.height > 4);
        const O = [];
        const m = document.getElementById('masc'); if (m && vis(m)) { const b = m.getBoundingClientRect(), sx = b.width * .18, sy = b.height * .12; O.push({ n: 'SCHALTI', b: { left: b.left + sx, right: b.right - sx, top: b.top + sy, bottom: b.bottom - sy } }); }
        for (const e of document.querySelectorAll('.vemo')) if (vis(e)) { const b = e.getBoundingClientRect(); if (b.width > 4) O.push({ n: 'EMOJI' + e.textContent.trim(), b: { left: b.left + b.width * .15, right: b.right - b.width * .15, top: b.top + b.height * .15, bottom: b.bottom - b.height * .15 } }); }
        const ov = (a, b) => { const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); return w > 6 && h > 6 ? w * h : 0; };
        const out = [];
        for (let i = 0; i < T.length; i++) { for (let j = i + 1; j < T.length; j++) if (!T[i].e.contains(T[j].e) && !T[j].e.contains(T[i].e) && ov(T[i].b, T[j].b)) out.push(T[i].n + ' <> ' + T[j].n); for (const o of O) if (ov(T[i].b, o.b)) out.push(o.n + ' auf ' + T[i].n); }
        for (const e of T) if (e.b.right > 1000 || e.b.left < 20) out.push('RAND ' + e.n);
        return out; });
      for (const k of r) { if (!hits[k]) hits[k] = [x, x, 0]; hits[k][1] = x; hits[k][2]++; }
    }
    const ks = Object.keys(hits); console.log(ks.length ? ks.map(k => hits[k][0].toFixed(1) + '-' + hits[k][1].toFixed(1) + 's (' + hits[k][2] + 'x) ' + k).join('\n') : 'KEINE UEBERLAPPUNG'); await br.close(); return; }
  const fr = opt('--frames');
  if (fr) { const pg = await mk(); for (const x of fr.split(',')) { await pg.evaluate(t => draw(t), +x); await pg.screenshot({ path: path.join(out, 'frame_' + x + '.jpg'), type: 'jpeg', quality: 80 }); } await br.close(); return; }
  const nur = opt('--szenen') ? opt('--szenen').split(',').map(x => +x - 1) : null; // nur diese Szenen neu rendern, Rest wiederverwenden
  await Promise.all(S.scenes.map(async (sc, i) => {
    if (nur && !nur.includes(i) && fs.existsSync(path.join(out, 'szene_' + i + '.mp4'))) return;
    const pg = await mk(); const tmp = path.join(out, 'tmp_' + i + '.mp4'), fin = path.join(out, 'szene_' + i + '.mp4');
    const done = ff(['-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', String(FPS), tmp]); const proc = ff.last;
    const n = Math.round((sc.end - sc.start) * FPS);
    for (let f = 0; f < n; f++) { await pg.evaluate(t => draw(t), sc.start + f / FPS); const buf = await pg.screenshot({ type: 'jpeg', quality: 92 }); if (!proc.stdin.write(buf)) await new Promise(r => proc.stdin.once('drain', r)); }
    proc.stdin.end(); await done; fs.renameSync(tmp, fin); console.log('Szene', i, n, 'Frames');
  }));
  await br.close();
  const list = path.join(out, 'liste.txt'); fs.writeFileSync(list, S.scenes.map((_, i) => "file 'szene_" + i + ".mp4'").join('\n'));
  const stumm = path.join(out, 'stumm.mp4'); execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', stumm], { stdio: 'ignore' });
  const ziel = path.join(out, S.id + '.mp4'); const adir = path.join(path.dirname(scriptPath), 'audio');
  if (zeiten) { // Szenen-Audios an ihre Startzeit setzen und mischen
    const ins = [], fl = []; S.scenes.forEach((sc, i) => { ins.push('-i', path.join(adir, (i + 1) + '.mp3')); fl.push('[' + (i + 1) + ':a]adelay=' + Math.round(sc.audioAt * 1000) + ':all=1[a' + i + ']'); });
    const fc = fl.join(';') + ';' + S.scenes.map((_, i) => '[a' + i + ']').join('') + 'amix=inputs=' + S.scenes.length + ':normalize=0,apad[a]';
    execFileSync('ffmpeg', ['-y', '-i', stumm, ...ins, '-filter_complex', fc, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-shortest', ziel], { stdio: 'ignore' });
  } else fs.copyFileSync(stumm, ziel);
  console.log('fertig', ziel);
})();
