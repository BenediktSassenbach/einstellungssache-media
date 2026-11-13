// Laeuft im Browser. Erwartet die globale Konstante S (Skript mit Zeitplan) und zeichnet mit draw(t) das Bild zur Zeit t.
const A = S.accent, BG = '#0B1020';
document.body.style.setProperty('--a', A);
const cl = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const ease = x => { x = cl(x); return 1 - Math.pow(1 - x, 3); };
const back = x => { x = cl(x); const c = 1.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*(.+?)\*/g, '<b>$1</b>');
const pop = (k, o = 'center') => 'opacity:' + cl(k * 3) + ';transform:scale(' + (0.6 + 0.4 * back(k)) + ');transform-origin:' + o + ';';
const rise = k => 'opacity:' + ease(k) + ';transform:translateY(' + (40 * (1 - ease(k))) + 'px);';
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

function mascot(m, open, blink, w) {
  const arcs = '<path d="M181 96 Q194 106 207 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M217 96 Q230 106 243 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>';
  const eyes = {
    happy: '<circle cx="194" cy="94" r="14" fill="#fff"/><circle cx="230" cy="94" r="14" fill="#fff"/><circle cx="197" cy="96" r="6.5" fill="' + BG + '"/><circle cx="233" cy="96" r="6.5" fill="' + BG + '"/>',
    shock: '<circle cx="194" cy="90" r="16" fill="#fff"/><circle cx="230" cy="90" r="16" fill="#fff"/><circle cx="194" cy="90" r="5" fill="' + BG + '"/><circle cx="230" cy="90" r="5" fill="' + BG + '"/>',
    wink: '<circle cx="194" cy="94" r="14" fill="#fff"/><circle cx="197" cy="96" r="6.5" fill="' + BG + '"/><path d="M217 96 Q230 84 243 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>',
    sleepy: arcs + '<text x="252" y="50" font-size="34" font-weight="800" fill="#fff" font-family="Inter Display">z</text><text x="274" y="26" font-size="24" font-weight="800" fill="#fff" font-family="Inter Display">z</text>',
    angry: '<path d="M178 74 L206 84" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M246 74 L218 84" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="194" cy="98" r="12" fill="#fff"/><circle cx="230" cy="98" r="12" fill="#fff"/><circle cx="196" cy="99" r="5.5" fill="' + BG + '"/><circle cx="228" cy="99" r="5.5" fill="' + BG + '"/>',
    cool: '<rect x="174" y="80" width="76" height="26" rx="10" fill="#fff"/><rect x="180" y="85" width="28" height="16" rx="6" fill="' + BG + '"/><rect x="216" y="85" width="28" height="16" rx="6" fill="' + BG + '"/>'
  };
  const rest = {
    happy: '<path d="M196 120 Q212 136 228 120" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>', shock: '<ellipse cx="212" cy="126" rx="9" ry="12" fill="#fff"/>',
    wink: '<path d="M194 118 Q214 138 232 116" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>', sleepy: '<circle cx="212" cy="124" r="6" fill="#fff"/>',
    angry: '<path d="M198 130 Q212 120 226 130" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>', cool: '<path d="M198 122 Q216 134 230 118" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>'
  };
  const e = (blink && (m === 'happy' || m === 'shock' || m === 'angry')) ? arcs : eyes[m];
  const mouth = open > 0.08 ? '<ellipse cx="212" cy="' + (m === 'cool' ? 126 : 125) + '" rx="' + (8 + 3 * open) + '" ry="' + (2.5 + 10 * open) + '" fill="#fff"/>' : rest[m];
  return '<svg width="' + w + '" viewBox="-10 0 320 235" xmlns="http://www.w3.org/2000/svg"><path d="M112 150 L104 205 M190 150 L198 205" stroke="' + A + '" stroke-width="12" stroke-linecap="round"/><path d="M84 207 L108 207 M194 207 L218 207" stroke="' + A + '" stroke-width="12" stroke-linecap="round"/><path d="M40 86 Q10 70 6 40" stroke="' + A + '" stroke-width="12" stroke-linecap="round" fill="none"/><rect x="30" y="40" width="240" height="120" rx="60" fill="' + A + '"/><circle cx="212" cy="100" r="54" fill="' + BG + '"/>' + e + mouth + '</svg>';
}
function sw(k, nm) { k = ease(k); const c = k > 0.5 ? A : '#C9CFDD'; return '<span class="sw" style="background:' + c + (nm ? ';margin-left:0' : '') + '"><i style="left:' + (5 + 38 * k) + 'px"></i></span>'; }

// Woerter einer Zeile mit Zeiten: echte Zeiten aus ElevenLabs, sonst nach Zeichen verteilt
function wordTimes(l) {
  const ws = l.t.split(' ');
  if (l.words && l.words.length === ws.length) return ws.map((w, i) => ({ w, a: l.words[i][0], b: l.words[i][1] }));
  const tot = l.t.length, d = l.end - l.start; let pos = 0;
  return ws.map(w => { const a = l.start + d * pos / tot; pos += w.length + 1; return { w, a, b: l.start + d * Math.min(pos, tot) / tot }; });
}
function chunks(l) {
  const ws = wordTimes(l), cs = []; let cur = [], n = 0;
  for (const x of ws) { if (cur.length && (n + x.w.length > 20 || cur.length >= 4)) { cs.push(cur); cur = []; n = 0; } cur.push(x); n += x.w.length + 1; }
  if (cur.length) cs.push(cur);
  return cs;
}
function confetti(e, x, y, n) {
  if (e === undefined || e > 1.5) return ''; let s = ''; const cols = [A, '#fff', '#7C5CFF', '#3DB8FF', '#FF7A59'];
  for (let i = 0; i < n; i++) {
    const a = rnd(i + x) * 6.283, v = 240 + rnd(i * 3 + y) * 460; const px = x + Math.cos(a) * v * e, py = y + Math.sin(a) * v * e * 0.8 - 200 * e + 560 * e * e;
    s += '<i style="position:absolute;left:' + px + 'px;top:' + py + 'px;width:18px;height:' + (10 + rnd(i) * 16) + 'px;background:' + cols[i % 5] + ';border-radius:4px;opacity:' + cl(1.7 - e * 1.3) + ';transform:rotate(' + (e * 700 * (rnd(i * 7) - .5)) + 'deg)"></i>';
  }
  return s;
}
function ring(x, y, c) { return c < 0 || c > 1 ? '' : '<span class="cring" style="left:' + x + 'px;top:' + y + 'px;width:' + (40 + c * 170) + 'px;height:' + (40 + c * 170) + 'px;opacity:' + (1 - c) + '"></span>'; }

// ---------- Panels ----------
function cardPanel(p, ev, t, E, popHtml) {
  const T = ev.panel === undefined ? 0 : ev.panel, done = ev.act !== undefined;
  let fx = 0, fy = 0, fs = 1, extra = '', emoji = '<span>' + p.emoji + '</span>', fing = '👆', rot = 0;
  const g = p.gesture;
  if (g === 'tap') { const c = (T % 1.1) / 1.1; fs = c < 0.14 ? 0.82 : 1; extra = ring(114, 114, c / 0.6); }
  if (g === 'double') { const c = (T % 1.5) / 1.5; fs = (c < 0.08 || (c > 0.16 && c < 0.24)) ? 0.82 : 1; extra = ring(114, 114, c / 0.45) + ring(114, 114, (c - 0.16) / 0.45); }
  if (g === 'hold') {
    const c = (T % 2.4) / 2.4, k = cl(c / 0.75); fs = c < 0.78 ? 0.84 : 1;
    extra = c < 0.78 ? '<svg style="position:absolute;left:4px;top:4px" width="220" height="220" viewBox="0 0 220 220"><circle cx="110" cy="110" r="96" fill="none" stroke="#C9CFDD" stroke-width="10"/><circle cx="110" cy="110" r="96" fill="none" stroke="' + A + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + (603 * k) + ' 603" transform="rotate(-90 110 110)"/></svg>' : '';
  }
  if (g === 'drag') { fs = 0.86; fx = Math.sin(T * 3.2) * 95; extra = '<span style="position:absolute;left:' + (104 + fx) + 'px;top:150px;width:6px;height:56px;border-radius:3px;background:#0B1020;opacity:' + (0.5 + 0.5 * Math.abs(Math.sin(T * 6))) + '"></span>'; }
  if (g === 'swipe') {
    const c = (T % 1.3) / 1.3, k = ease(c / 0.7); fx = 90 - 200 * k; fs = c < 0.75 ? 0.86 : 1;
    extra = c < 0.75 ? '<span style="position:absolute;left:' + (114 + fx + 20) + 'px;top:150px;height:8px;border-radius:4px;background:' + A + ';width:' + (200 * k) + 'px;opacity:' + (1 - c) + '"></span>' : '';
  }
  if (g === 'side') {
    const c = (T % 1.2) / 1.2, press = c < 0.18;
    emoji = '<span style="position:absolute;left:34px;top:20px;width:104px;height:188px;border-radius:22px;border:7px solid #0B1020;background:#fff;display:flex;align-items:center;justify-content:center;font-size:60px">' + p.emoji + '</span>'
      + '<span style="position:absolute;left:138px;top:62px;width:10px;height:' + (press ? 34 : 42) + 'px;border-radius:5px;background:' + (press ? A : '#0B1020') + '"></span>';
    fing = '👈'; fx = 54 + (press ? -8 : 6); fy = -66; extra = press ? ring(114, 114, (c) / 0.18 * 0.4) : '';
  }
  const fingHtml = '<span class="fing" style="transform:translate(' + fx + 'px,' + fy + 'px) scale(' + fs + ') rotate(' + rot + 'deg)">' + fing + '</span>';
  const res = done
    ? '<div class="cres" style="' + pop(cl(ev.act / 0.35), 'left center') + '"><s>✓</s><br>' + esc(p.result) + '</div>'
    : '<div class="cres" style="opacity:' + (0.55 + 0.25 * Math.sin(t * 4)) + '"><em>Was passiert?</em>' + '•'.repeat(1 + Math.floor(t * 3) % 3) + '</div>';
  return '<div class="panel" style="' + rise(E('panel', 0.5)) + '"><div class="ph"><span>So geht\'s</span><span>' + esc(p.tag || 'Beispiel') + '</span></div><div class="card"><div class="cbox">' + emoji + extra + fingHtml + '</div>' + res + '</div>' + popHtml + '</div>';
}
function listPanel(p, ev, t, E, popHtml) {
  const act = ev.act; let rows = '';
  p.rows.forEach((r, i) => {
    const hot = r.hot && act !== undefined, shk = hot && act < 0.6 ? Math.sin(act * 70) * 10 * (1 - act / 0.6) : 0;
    let right = '';
    if (r.bar !== undefined) {
      const g = ev.bars === undefined ? 0 : ease((ev.bars - 0.1 - i * 0.15) / 0.7);
      right = '<span class="bar" style="width:' + (r.bar * 250 * g) + 'px"></span><span class="pct" style="width:130px">' + (ev.bars === undefined || g < 0.05 ? '?' : esc(r.v)) + '</span>';
    } else if (r.sw !== undefined) {
      let k = r.sw;
      if (r.flip && act !== undefined) { const f = cl((act - 0.3 - i * 0.4) / 0.3); k = r.sw ? 1 - f : f; }
      right = (r.flip && act !== undefined && act < 0.95 ? '<span class="tapr" style="transform:translateY(' + (-22 * Math.abs(Math.sin(act * 8))) + 'px)">👆</span>' : '') + sw(k);
    } else if (r.v !== undefined) {
      const after = r.vAfter && act !== undefined;
      right = '<span class="val" style="' + (after ? 'color:#0B1020;font-weight:900;display:inline-block;transform:scale(' + (1 + 0.3 * (1 - ease(act / 0.3))) + ')' : '') + '">' + esc(after ? r.vAfter : r.v) + '</span>';
    }
    if (p.pick) {
      const sel = act === undefined ? p.pick[0] : p.pick[1];
      if (i === sel) right = '<span class="chk2" style="display:inline-block;transform:scale(' + (act !== undefined ? 1 + 0.8 * (1 - ease(act / 0.35)) : 1) + ')">✓</span>';
      if (act !== undefined && i === p.pick[1] && act < 0.9) right += '<span class="tapr" style="right:80px;transform:translateY(' + (-22 * Math.abs(Math.sin(act * 8))) + 'px)">👆</span>';
    }
    const sel = p.pick && act !== undefined && i === p.pick[1];
    rows += '<div class="row' + (hot || sel ? ' hot' : '') + '" style="transform:translateX(' + shk + 'px)' + (i === 0 ? ';border-top:none' : '') + '"><span class="lbl">' + esc(r.t) + '</span>' + right + '</div>';
  });
  if (p.grid) {
    const k = E('act', 0.5); let g = '';
    for (const x of [1 / 3, 2 / 3]) { g += '<i style="left:' + (x * 100) + '%;top:0;width:3px;height:100%;opacity:' + k + '"></i><i style="top:' + (x * 100) + '%;left:0;height:3px;width:100%;opacity:' + k + '"></i>'; }
    rows += '<div class="prev"><span style="transform:rotate(' + (6 * (1 - k)) + 'deg)">🏞️</span>' + g + '</div>';
  }
  return '<div class="panel" style="' + rise(E('panel', 0.5)) + '"><div class="ph"><span>' + esc(p.title) + '</span><span>' + esc(p.tag || '') + '</span></div>' + rows + popHtml + '</div>';
}
// Alte Panels aus V001 (Akku)
function legacyPanel(name, ev, t, E, popHtml) {
  let h = '';
  if (name === 'apps') {
    const apps = [['Shopping-App', '#FF7A59', 1], ['Spiele-App', '#7C5CFF', 1], ['Wetter-App', '#3DB8FF', 1], ['Nachrichten-App', '#2ECC71', 0]];
    h += '<div class="panel" style="' + rise(E('panel', 0.5)) + '"><div class="ph"><span>Hintergrundaktualisierung</span><span>Beispiel</span></div>' + apps.map((a, i) => {
      const on = a[2] && ev.act !== undefined ? 1 - cl((ev.act - 0.5 - i * 0.5) / 0.3) : 1;
      const ind = on > 0.5 ? '<span class="ld" style="transform:rotate(' + (t * 420 + i * 90) + 'deg)"></span><span style="font-size:24px;color:#5A6686;width:80px">lädt' + '.'.repeat(1 + Math.floor(t * 3 + i) % 3) + '</span>' : '<span style="font-size:36px;font-family:Noto Color Emoji;transform:scale(' + (0.5 + 0.5 * back(cl((ev.act - 0.8 - i * 0.5) / 0.3))) + ')">💤</span>';
      return '<div class="row"' + (i === 0 ? ' style="border-top:none"' : '') + '><span class="ic" style="background:' + a[1] + ';transform:translateY(' + (on > 0.5 ? Math.sin(t * 9 + i * 2) * 5 : 0) + 'px)"></span>' + a[0] + '<span style="margin-left:auto;display:flex;align-items:center;gap:14px">' + ind + sw(on, 1) + '</span></div>';
    }).join('') + popHtml + '</div>';
  }
  if (name === 'usage') {
    const apps = [['Spiele-App', '#7C5CFF', 41], ['Video-App', '#FF7A59', 23], ['Shopping-App', '#3DB8FF', 12], ['Wetter-App', '#2ECC71', 4]];
    const scan = ev.panel !== undefined && ev.panel > 1.1 && ev.act === undefined ? Math.floor((ev.panel - 1.1) * 2.4) % 4 : -1;
    const shk = ev.act !== undefined && ev.act < 0.6 ? Math.sin(ev.act * 70) * 12 * (1 - ev.act / 0.6) : 0;
    h += '<div class="panel" style="' + rise(E('panel', 0.5)) + '"><div class="ph"><span>Batterie · Verbrauch pro App</span><span>Beispielwerte</span></div>' + apps.map((a, i) => {
      const g = ev.bars === undefined ? 0 : ease((ev.bars - 0.1 - i * 0.15) / 0.7); const hot = i === 0 && ev.act !== undefined;
      return '<div class="row' + (hot ? ' hot' : '') + '" style="' + (i === 0 ? 'border-top:none;' : '') + (hot ? 'transform:translateX(' + shk + 'px) scale(' + (1 + 0.03 * Math.sin(t * 8)) + ')' : (i === scan ? 'background:' + A + '44;margin:0 -16px;padding:0 16px;border-radius:16px' : '')) + '"><span class="ic" style="background:' + a[1] + '"></span>' + a[0] + '<span class="bar" style="width:' + (a[2] * 5 * g) + 'px"></span><span class="pct">' + (ev.bars === undefined ? '?' : Math.round(a[2] * g) + ' %') + '</span></div>';
    }).join('') + (E('act2') ? '<div class="stamp" style="opacity:' + cl(ev.act2 * 6) + ';transform:rotate(-10deg) scale(' + (1 + 2 * (1 - ease(ev.act2 / 0.25))) + ')">SCHULDIG</div>' : '') + popHtml + '</div>';
  }
  if (name === 'lowpower') {
    const on = E('act', 0.35); const col = on > 0.5 ? '#FFCC00' : '#0B1020';
    h += '<div class="panel" style="' + rise(E('panel', 0.5)) + '"><div class="ph"><span>Batterie</span><span>Beispiel</span></div><div class="row" style="height:80px;font-size:40px;border-top:none">Stromsparmodus' + (ev.act !== undefined && ev.act < 0.7 ? '<span class="tapr" style="transform:translateY(' + (-22 * Math.abs(Math.sin(ev.act * 8))) + 'px)">👆</span>' : '') + sw(on) + '</div><div class="row" style="height:120px;gap:30px"><svg width="170" height="80" viewBox="0 0 420 200" style="overflow:visible;' + (on > 0.5 ? 'filter:drop-shadow(0 0 ' + (10 + 10 * Math.sin(t * 7)) + 'px #FFCC00);transform:scale(' + (1 + 0.05 * Math.sin(t * 7)) + ')' : '') + '"><rect x="6" y="6" width="370" height="188" rx="44" fill="none" stroke="#0B1020" stroke-width="14"/><rect x="386" y="66" width="26" height="68" rx="10" fill="#0B1020"/><rect x="28" y="28" width="' + (on > 0.5 ? 210 : 210 - 18 * Math.abs(Math.sin(t * 1.5))) + '" height="144" rx="26" fill="' + col + '"/></svg><span style="font-size:30px;line-height:1.2;color:#5A6686">' + (on > 0.5 ? 'Akkusymbol wird gelb:<br>Stromsparmodus ist an' : '64 %') + '</span></div>' + popHtml + '</div>';
    if (E('act2')) h += '<div class="stick" style="right:0;bottom:290px;' + pop(E('act2'), 'center') + 'rotate:' + (4 + 3 * Math.sin(t * 6)) + 'deg">Kontrollzentrum ⚡</div>';
  }
  return h;
}

function draw(t) {
  const si = Math.max(0, S.scenes.findIndex(s => t < s.end)); const sc = S.scenes[si < 0 ? S.scenes.length - 1 : si]; const lt = t - sc.start;
  const ev = {}; let line = null, last = sc.lines[0];
  for (const l of sc.lines) { if (t >= l.start) { last = l; if (l.ev) ev[l.ev] = t - l.start; } if (t >= l.start && t < l.end + 0.05) line = l; }
  const E = (n, d = 0.45) => ev[n] === undefined ? 0 : cl(ev[n] / d); const tl = t - last.start;
  document.getElementById('pg').style.width = (100 * (1 - Math.pow(1 - t / S.total, 2.2))) + '%';
  // Hintergrund in Bewegung
  document.querySelector('.b1').style.transform = 'translate(' + (Math.sin(t * .5) * 50) + 'px,' + (Math.cos(t * .4) * 40) + 'px) scale(' + (1 + 0.04 * Math.sin(t * .7)) + ')';
  document.querySelector('.b2').style.transform = 'translate(' + (Math.cos(t * .45) * 40) + 'px,' + (Math.sin(t * .6) * 50) + 'px)';
  let f = ''; for (let i = 0; i < 18; i++) {
    const x = rnd(i) * 1040, sp = 40 + rnd(i + 50) * 70, y = 1920 - ((t * sp + rnd(i + 9) * 2000) % 2060), sz = 14 + rnd(i + 3) * 26;
    f += i % 3 === 0 ? '<b style="position:absolute;left:' + x + 'px;top:' + y + 'px;font-size:' + (sz * 2.2) + 'px;font-weight:900;color:#22305A;transform:rotate(' + (t * 50 * (rnd(i) - .5)) + 'deg)">+</b>' : '<i style="position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + sz + 'px;height:' + sz + 'px;border-radius:50%;background:#1B2748"></i>';
  }
  document.getElementById('fx').innerHTML = f;
  // Szenenwechsel: Akzentflaeche wischt weg
  const wp = document.getElementById('wipe'); if (si > 0 && lt < 0.42) { const k = ease(lt / 0.42); wp.style.display = 'block'; wp.style.transform = 'translateX(' + (k * 135) + '%) skewX(-12deg)'; } else wp.style.display = 'none';

  // Emoji-Sticker pro Satz
  let popHtml = '';
  const P = last.pop; const showPop = P && tl > 0.1 && t < last.end + 0.28 && !(sc.type === 'outro' && last.ev === 'follow');
  const popAt = pos => { const k = cl((tl - 0.1) / 0.3), o = cl((last.end + 0.28 - t) / 0.16); return '<div class="popx" style="' + pos + ';transform:scale(' + (back(k) * o) + ') rotate(' + (7 * Math.sin(t * 5)) + 'deg)"><span style="transform:translateY(' + (-8 * Math.abs(Math.sin(t * 6))) + 'px)">' + P[0] + '</span>' + (P[1] ? '<em>' + esc(P[1]) + '</em>' : '') + '</div>'; };

  let h = ''; const k0 = lt / 0.45;
  if (sc.type === 'hook') {
    h += '<h1>' + sc.title.split(' ').map((w, i) => {
      const k = cl((lt - 0.05 - i * 0.07) / 0.22); const m = /\*/.test(w); const x = esc(w.replace(/\*/g, ''));
      const tail = (x.match(/[.,!?]+$/) || [''])[0], core = tail ? x.slice(0, -tail.length) : x;
      const inner = m ? (E('mark') ? '<b style="transform:rotate(-2deg) scale(' + (1 + 0.35 * (1 - ease(ev.mark / 0.4))) + ')">' + core + '</b>' + tail : x) : x;
      return '<span style="display:inline-block;opacity:' + cl(k * 3) + ';transform:scale(' + (0.4 + 0.6 * back(k)) + ')">' + inner + '</span>';
    }).join(' ') + '</h1>';
    if (!sc.emoji) { // Akku-Visual aus V001
      const dr = ev.drain === undefined ? 100 : Math.round(100 - 88 * ease(ev.drain / 1.5)); const low = dr <= 25;
      const col = dr > 40 ? '#F4F6FB' : (dr > 20 ? A : '#FF5A5A');
      h += '<div style="position:absolute;left:0;top:340px;display:flex;align-items:center;gap:30px;' + rise(k0 - 0.3) + (low ? 'transform:translate(' + (Math.sin(t * 55) * 5) + 'px,' + (Math.cos(t * 47) * 3) + 'px);' : '') + '"><svg width="380" height="180" viewBox="0 0 420 200" style="' + (low ? 'filter:drop-shadow(0 0 ' + (14 + 12 * Math.sin(t * 9)) + 'px #FF5A5A)' : '') + '"><rect x="6" y="6" width="370" height="188" rx="44" fill="none" stroke="#F4F6FB" stroke-width="12"/><rect x="386" y="66" width="26" height="68" rx="10" fill="#F4F6FB"/><rect x="28" y="28" width="' + (326 * dr / 100) + '" height="144" rx="26" fill="' + col + '"/></svg><div style="font-size:136px;font-weight:900;letter-spacing:-.04em;color:' + col + ';transform:scale(' + (low ? 1 + 0.05 * Math.sin(t * 10) : 1) + ')">' + dr + ' %</div></div>';
      if (E('sticker')) h += '<div class="stick" style="left:0;top:580px;font-size:50px;' + pop(E('sticker'), 'left center') + 'rotate:' + (-4 + 2 * Math.sin(t * 6)) + 'deg">' + esc(sc.sticker) + ' 👇</div>';
    } else {
      const kc = cl((lt - 0.4) / 0.4), mk = ev.mark === undefined ? 0 : ev.mark;
      h += '<div class="hcard" style="left:0;top:345px;opacity:' + cl(kc * 3) + ';transform:scale(' + (back(kc) * (1 + 0.08 * Math.sin(t * 3.4))) + ') rotate(' + (6 * Math.sin(t * 2.3) + (mk < 0.5 ? 25 * Math.sin(mk * 30) * (1 - mk / 0.5) : 0)) + 'deg)"><span style="transform:translateY(' + (-10 * Math.abs(Math.sin(t * 3))) + 'px)">' + sc.emoji + '</span></div>';
      h += confetti(ev.mark, 125, 470, 20);
      if (E('sticker')) h += '<div class="stick" style="left:300px;top:420px;font-size:50px;' + pop(E('sticker'), 'left center') + 'rotate:' + (-4 + 2 * Math.sin(t * 6)) + 'deg">' + esc(sc.sticker) + ' 👇</div>';
    }
    if (showPop) h += popAt('right:0;top:560px');
  }
  if (sc.type === 'tip') {
    const nk = cl((lt - 0.3) / 0.3);
    h += '<div class="top"><div class="num" style="opacity:' + cl(nk * 4) + ';transform:scale(' + (1 + 1.8 * (1 - ease(nk))) + ') rotate(' + (-8 * (1 - ease(nk))) + 'deg)">' + sc.num + '</div><h2 style="' + rise(k0 - 0.6) + '">' + esc(sc.title) + '</h2></div><div class="path">';
    sc.path.forEach((p, i) => {
      const e = ev['p' + (i + 1)]; const k = E('p' + (i + 1), 0.4); const cur = e !== undefined && ev['p' + (i + 2)] === undefined && ev.act === undefined;
      const tap = e !== undefined && e < 0.75 ? '<span class="tap" style="transform:translateY(' + (-24 * Math.abs(Math.sin(e * 8))) + 'px)">👆</span><span class="ring" style="width:' + (60 + e * 240) + 'px;height:' + (60 + e * 240) + 'px;opacity:' + cl(1 - e / 0.6) + '"></span>' : '';
      h += '<div class="step' + (cur ? ' on' : '') + '" style="' + (e === undefined ? 'opacity:' + (0.3 * cl(k0 - 1)) + ';' : pop(k, 'left center')) + '"><s>' + (i + 1) + '</s>' + esc(p) + tap + '</div>';
    });
    h += '</div>';
    const ph = showPop ? popAt('right:-16px;top:-150px') : '';
    if (typeof sc.panel === 'string') h += legacyPanel(sc.panel, ev, t, E, ph);
    else if (sc.panel && sc.panel.kind === 'card') h += cardPanel(sc.panel, ev, t, E, ph);
    else if (sc.panel) h += listPanel(sc.panel, ev, t, E, ph);
  }
  if (sc.type === 'outro') {
    sc.checks.forEach((c, i) => { const e = ev['c' + (i + 1)]; h += '<div class="chk" style="' + pop(E('c' + (i + 1), 0.4), 'left center') + '"><s style="transform:scale(' + (e !== undefined ? 1 + 0.8 * (1 - ease(e / 0.4)) : 1) + ')">✓</s>' + esc(c) + '</div>' + confetti(e, 90, 40 + i * 86, 12); });
    if (E('save')) h += '<h1 style="margin-top:30px;font-size:80px;' + rise(E('save', 0.5)) + '">' + esc(sc.title).replace('<b>', '<b style="transform:rotate(-2deg) scale(' + (1 + 0.06 * Math.sin(t * 8)) + ')">') + '</h1>' + confetti(ev.save, 420, 560, 30);
    if (E('follow')) h += '<div class="stick" style="left:320px;top:990px;font-size:40px;' + pop(E('follow'), 'left center') + 'rotate:' + (-3 + 2 * Math.sin(t * 7)) + 'deg">@einstellungssache</div>';
    if (showPop) h += popAt('right:0;top:950px');
  }
  const stage = document.getElementById('stage'); stage.innerHTML = h;
  // Bild-Impuls bei jedem Satz, Wackler beim Einschlag der Nummer
  let shx = 0, shy = 0; if (sc.type === 'tip' && lt > 0.45 && lt < 0.85) { const d = 1 - (lt - 0.45) / 0.4; shx = Math.sin(lt * 95) * 12 * d; shy = Math.cos(lt * 75) * 9 * d; }
  stage.style.transform = 'translate(' + shx + 'px,' + shy + 'px) scale(' + (1 + 0.03 * (1 - ease(tl / 0.3)) + 0.01 * cl(tl / 3)) + ')';
  // Untertitel
  let c = '', talking = false;
  if (line) {
    const ch = chunks(line); let cur = ch[0]; for (const x of ch) { if (t >= x[0].a) cur = x; }
    const k = cl((t - cur[0].a) / 0.12);
    c = '<div style="transform:scale(' + (0.85 + 0.15 * back(k)) + ') rotate(' + (1.5 * Math.sin(cur[0].a * 40)) + 'deg)">' + cur.map(x => '<span' + (t >= x.a && t < x.b ? ' class="w"' : '') + '>' + esc(x.w) + '</span>').join(' ') + '</div>';
    talking = line.words ? wordTimes(line).some(x => t >= x.a && t < x.b - 0.03) : t < line.end - 0.08;
  }
  document.getElementById('cap').innerHTML = c;
  // Schalti: spricht, wippt, dreht sich bei den Hoehepunkten
  const open = talking ? cl(0.15 + 0.55 * Math.abs(Math.sin(t * 17.3)) + 0.3 * Math.abs(Math.sin(t * 6.1 + 1))) : 0;
  const blink = (t % 3.4) < 0.12; const mood = last.mood || 'happy';
  let spin = 0, jump = 0;
  for (const n of ['act', 'act2', 'mark', 'save', 'follow', 'sticker']) { const e = ev[n]; if (e !== undefined && e < 0.55) { spin = 360 * ease(e / 0.55); jump = Math.sin(Math.PI * e / 0.55) * 60; } }
  const m = document.getElementById('masc'); m.innerHTML = mascot(mood, open, blink, 300);
  m.style.transform = 'translate(' + (Math.sin(t * 1.1) * 10) + 'px,' + (Math.sin(t * 2.6) * 7 - (talking ? open * 5 : 0) - jump) + 'px) rotate(' + (Math.sin(t * 1.7) * 3 + spin) + 'deg)';
  const b = document.getElementById('bub'); const q = sc.quip; const qs = sc.lines[Math.min(sc.quipAt || 1, sc.lines.length - 1)].start;
  if (q && t >= qs) { b.style.display = 'block'; b.textContent = q; b.style.transform = 'rotate(' + (3 + 2 * Math.sin(t * 4)) + 'deg) scale(' + (0.5 + 0.5 * back((t - qs) / 0.35)) + ')'; b.style.opacity = cl((t - qs) / 0.15); } else b.style.display = 'none';
}
