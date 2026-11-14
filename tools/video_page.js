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

let performance_t = 0;
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
  // Kostuem "professor" (Erklaer-Serie): weisser Kittel, wilde weisse Haare
  const prof = S.kostuem === 'professor'; let hair = '', coat = '', arm = '<path d="M40 86 Q10 70 6 40" stroke="' + A + '" stroke-width="12" stroke-linecap="round" fill="none"/>';
  if (prof) {
    const n = 13, a0 = -172, a1 = 18, wob = Math.sin(performance_t * 3.1) * 2.5; let d = '';
    for (let i = 0; i <= n; i++) { // flauschige Bueschel rund um den Kopf, oben am dichtesten
      const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180, r = 60 + 8 * rnd(i + 40) + (i % 2 ? wob : -wob), rr = 17 + 9 * rnd(i + 70);
      d += '<circle cx="' + (212 + Math.cos(a) * r).toFixed(1) + '" cy="' + (100 + Math.sin(a) * r).toFixed(1) + '" r="' + rr.toFixed(1) + '" fill="#fff"/>';
    }
    for (const [ang, len] of [[-150, 44], [-118, 52], [-84, 46], [-52, 56], [-20, 46], [8, 40]]) { // abstehende Straehnen
      const a = ang * Math.PI / 180, x = 212 + Math.cos(a) * 66, y = 100 + Math.sin(a) * 66, c = a + 0.5;
      d += '<path d="M' + x.toFixed(1) + ' ' + y.toFixed(1) + ' q' + (Math.cos(a) * len * .6 + Math.cos(c) * 14).toFixed(1) + ' ' + (Math.sin(a) * len * .6 + Math.sin(c) * 14).toFixed(1) + ' ' + (Math.cos(a) * len + wob * 2).toFixed(1) + ' ' + (Math.sin(a) * len).toFixed(1) + '" stroke="#fff" stroke-width="11" stroke-linecap="round" fill="none"/>';
    }
    hair = d;
    coat = '<clipPath id="pl"><rect x="30" y="40" width="240" height="120" rx="60"/></clipPath><g clip-path="url(#pl)"><path d="M30 40 H86 L104 84 L122 40 H150 L134 160 H30 Z" fill="#fff"/><path d="M104 84 L104 160" stroke="#C9CFDD" stroke-width="4"/><circle cx="104" cy="108" r="5" fill="' + BG + '"/><circle cx="104" cy="134" r="5" fill="' + BG + '"/><rect x="50" y="104" width="34" height="30" rx="5" fill="none" stroke="#C9CFDD" stroke-width="4"/><path d="M60 96 L60 114" stroke="' + A + '" stroke-width="6" stroke-linecap="round"/><path d="M72 98 L72 114" stroke="#FF5A5A" stroke-width="6" stroke-linecap="round"/></g>';
    arm = '<path d="M40 86 Q10 70 6 40" stroke="#fff" stroke-width="14" stroke-linecap="round" fill="none"/><circle cx="6" cy="38" r="9" fill="' + A + '"/>';
  }
  // Kostuem "explosion" (Chemie C2): Rauch-Frisur, Russflecken, Schutzbrille auf der Stirn, Erlenmeyerkolben
  let top = '', hand = '';
  if (S.kostuem === 'explosion') {
    const wob = Math.sin(performance_t * 2.7) * 2; let d = '';
    for (const [an, r, rr] of [[-160, 62, 22], [-135, 70, 26], [-105, 72, 28], [-75, 74, 30], [-45, 70, 26], [-15, 64, 22], [10, 60, 18], [-120, 96, 18], [-60, 98, 20]]) d += '<circle cx="' + (212 + Math.cos(an * Math.PI / 180) * r).toFixed(1) + '" cy="' + (100 + Math.sin(an * Math.PI / 180) * r + (rr > 24 ? wob : -wob)).toFixed(1) + '" r="' + rr + '" fill="#6E7891"/>';
    for (let i = 0; i < 3; i++) { const c = (performance_t * .45 + i / 3) % 1; d += '<circle cx="' + (196 + 34 * c + 6 * Math.sin(performance_t * 2 + i)) + '" cy="' + (14 - 62 * c) + '" r="' + (8 + 9 * c) + '" fill="#8A93A8" opacity="' + (.8 * (1 - c)) + '"/>'; }
    hair = d;
    coat = '<ellipse cx="80" cy="70" rx="18" ry="10" fill="#1B2238" opacity=".55"/><ellipse cx="140" cy="132" rx="22" ry="11" fill="#1B2238" opacity=".5"/><ellipse cx="62" cy="128" rx="10" ry="7" fill="#1B2238" opacity=".5"/>';
    top = '<g transform="translate(0 -8)"><path d="M160 52 Q212 30 264 52" stroke="#3A4566" stroke-width="8" fill="none"/><rect x="176" y="36" width="36" height="26" rx="11" fill="rgba(155,231,255,.25)" stroke="#9BE7FF" stroke-width="5"/><rect x="212" y="36" width="36" height="26" rx="11" fill="rgba(155,231,255,.25)" stroke="#9BE7FF" stroke-width="5"/></g>';
    hand = '<g transform="translate(6 40) rotate(-10)"><path d="M-8 -60 L-8 -38 L-30 2 Q-32 10 -24 10 L24 10 Q32 10 30 2 L8 -38 L8 -60 Z" fill="rgba(255,255,255,.15)" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path d="M-22 -10 L22 -10 L28 2 Q30 8 24 8 L-24 8 Q-30 8 -28 2 Z" fill="' + (S.kolben || A) + '"/></g>';
  }
  // Kostuem "labor" (Chemie C1): weisser Kittel, Schutzbrille, blubberndes Reagenzglas
  if (S.kostuem === 'labor') {
    coat = '<clipPath id="pl"><rect x="30" y="40" width="240" height="120" rx="60"/></clipPath><g clip-path="url(#pl)"><path d="M30 40 H86 L104 84 L122 40 H150 L134 160 H30 Z" fill="#fff"/><path d="M104 84 L104 160" stroke="#C9CFDD" stroke-width="4"/><circle cx="104" cy="108" r="5" fill="' + BG + '"/><circle cx="104" cy="134" r="5" fill="' + BG + '"/><rect x="50" y="104" width="34" height="30" rx="5" fill="none" stroke="#C9CFDD" stroke-width="4"/><path d="M60 96 L60 114" stroke="' + A + '" stroke-width="6" stroke-linecap="round"/></g>';
    arm = '<path d="M40 86 Q10 70 6 40" stroke="#fff" stroke-width="14" stroke-linecap="round" fill="none"/>';
    top = '<path d="M160 92 H264" stroke="#3A4566" stroke-width="9"/><rect x="172" y="76" width="42" height="34" rx="14" fill="rgba(155,231,255,.22)" stroke="#9BE7FF" stroke-width="5"/><rect x="210" y="76" width="42" height="34" rx="14" fill="rgba(155,231,255,.22)" stroke="#9BE7FF" stroke-width="5"/><path d="M180 82 L188 90" stroke="#fff" stroke-width="3" opacity=".8"/>';
    let bub = ''; for (let i = 0; i < 3; i++) { const c = (performance_t * .7 + i / 3) % 1; bub += '<circle cx="' + (4 * Math.sin(performance_t * 3 + i * 2)) + '" cy="' + (-70 - 46 * c) + '" r="' + (4 + 4 * c) + '" fill="' + (S.kolben || A) + '" opacity="' + (.9 * (1 - c)) + '"/>'; }
    hand = '<g transform="translate(6 40)"><g transform="rotate(-18)"><rect x="-11" y="-62" width="22" height="70" rx="11" fill="rgba(255,255,255,.15)" stroke="#fff" stroke-width="4"/><rect x="-7" y="-30" width="14" height="34" rx="7" fill="' + (S.kolben || A) + '"/><rect x="-15" y="-66" width="30" height="8" rx="4" fill="#fff"/>' + bub + '</g><circle cx="0" cy="0" r="10" fill="#fff"/></g>';
  }
  // Kostuem "molekuel" (Chemie C3): Wassermolekuel als Antenne, Gummihandschuh, Rundkolben, H2O auf dem Bauch
  if (S.kostuem === 'molekuel') {
    const wb = 4 * Math.sin(performance_t * 3);
    coat = '<text x="70" y="118" font-size="38" font-weight="900" fill="' + BG + '" font-family="Inter Display" opacity=".85">H₂O</text>';
    top = '<g transform="rotate(' + wb + ' 212 46)"><path d="M212 46 L212 4" stroke="#fff" stroke-width="6"/><path d="M212 4 L180 -18 M212 4 L244 -18" stroke="#fff" stroke-width="6"/><circle cx="212" cy="4" r="16" fill="#FF4D4D"/><circle cx="180" cy="-18" r="11" fill="#fff"/><circle cx="244" cy="-18" r="11" fill="#fff"/><circle cx="207" cy="-1" r="4" fill="#fff" opacity=".7"/></g>';
    hand = '<g transform="translate(6 40)"><g transform="rotate(-8)"><path d="M-6 -20 L-6 -44 M6 -20 L6 -44" stroke="#fff" stroke-width="4"/><circle cx="0" cy="-62" r="22" fill="rgba(255,255,255,.15)" stroke="#fff" stroke-width="4"/><path d="M-20 -58 Q0 -50 20 -58 A22 22 0 0 1 -20 -58 Z" fill="' + (S.kolben || '#3BB8FF') + '"/></g><circle cx="0" cy="0" r="15" fill="#FFD23F"/><path d="M-12 -6 Q-22 -14 -14 -20" stroke="#FFD23F" stroke-width="8" fill="none" stroke-linecap="round"/></g>';
  }
  return '<svg width="' + w + '" viewBox="-10 -12 320 247" xmlns="http://www.w3.org/2000/svg" style="overflow:visible"><path d="M112 150 L104 205 M190 150 L198 205" stroke="' + A + '" stroke-width="12" stroke-linecap="round"/><path d="M84 207 L108 207 M194 207 L218 207" stroke="' + A + '" stroke-width="12" stroke-linecap="round"/>' + arm + '<rect x="30" y="40" width="240" height="120" rx="60" fill="' + A + '"/>' + coat + hair + '<circle cx="212" cy="100" r="54" fill="' + BG + '"/>' + e + mouth + top + hand + '</svg>';
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
// Erklaer-Panel Touchscreen (Serie Physik): Gitter, Finger, Defekt
function touchPanel(p, ev, t, E, popHtml) {
  const md = p.mode, cx = i => 40 + i * 53.3, cy = j => 44 + j * 46.7, done = ev.act !== undefined;
  const gk = md === 'gitter' ? ease(E('p2', 0.9)) : 1, ck = md === 'gitter' ? E('p3', 0.5) : 1, dead = md === 'kaputt' && ev.ghost !== undefined;
  const hit = md === 'finger' && ev.p3 !== undefined && ev.act2 === undefined;
  let g = '', over = '';
  for (let i = 0; i < 7; i++) { const off = dead && i >= 5, hl = hit && i === 3; g += '<line x1="' + cx(i) + '" y1="20" x2="' + cx(i) + '" y2="' + (20 + 188 * gk) + '" stroke="' + (off ? '#3A4466' : hl ? '#fff' : A) + '" stroke-width="' + (hl ? 7 : 3) + '" opacity="' + (hl ? 1 : .6) + '"/>'; if (!off && ck) g += '<circle cx="' + cx(i) + '" cy="' + (20 + 188 * ((t * 0.33 + rnd(i + 2)) % 1)) + '" r="5" fill="#fff" opacity="' + ck + '"/>'; }
  for (let j = 0; j < 4; j++) { const hl = hit && j === 1, x2 = dead ? cx(4) + 20 : 380; g += '<line x1="20" y1="' + cy(j) + '" x2="' + (20 + (x2 - 20) * gk) + '" y2="' + cy(j) + '" stroke="' + (hl ? '#fff' : A) + '" stroke-width="' + (hl ? 7 : 3) + '" opacity="' + (hl ? 1 : .6) + '"/>'; if (dead) g += '<line x1="' + x2 + '" y1="' + cy(j) + '" x2="380" y2="' + cy(j) + '" stroke="#3A4466" stroke-width="3"/>'; if (ck) g += '<circle cx="' + (20 + (x2 - 20) * ((t * 0.27 + rnd(j + 20)) % 1)) + '" cy="' + cy(j) + '" r="5" fill="#fff" opacity="' + ck + '"/>'; }
  if (md === 'gitter' && ev.p1 !== undefined) { const k = (ev.p1 % 1.6) / 1.6; g += '<path d="M' + (-80 + 560 * k) + ' 8 l60 0 l-70 212 l-60 0 Z" fill="#fff" opacity="' + (ev.p2 === undefined ? .28 : .1) + '"/>'; }
  if (md === 'gitter' && done) g += '<rect x="10" y="8" width="380" height="212" rx="26" fill="none" stroke="' + A + '" stroke-width="' + (6 + 4 * Math.sin(t * 8)) + '"/>';
  if (md === 'finger') {
    const X = cx(3), Y = cy(1), gl = ev.act2 !== undefined, e1 = gl ? ev.act2 : ev.p1;
    if (ev.p2 !== undefined && !gl) for (const o of [0, .5]) { const c = (ev.p2 + o) % 1; g += '<circle cx="' + X + '" cy="' + Y + '" r="' + (10 + c * 70) + '" fill="none" stroke="' + A + '" stroke-width="5" opacity="' + (1 - c) + '"/>'; }
    if (hit) g += '<circle cx="' + X + '" cy="' + Y + '" r="' + (13 + 3 * Math.sin(t * 10)) + '" fill="#fff"/>';
    if (gl && ev.act2 > 0.45) g += '<path d="M' + (X - 22) + ' ' + (Y - 22) + ' l44 44 m0 -44 l-44 44" stroke="#FF5A5A" stroke-width="10" stroke-linecap="round"/>';
    if (e1 !== undefined) { const k = ease(e1 / 0.45); over += '<span class="tfing" style="left:' + (X - 38) + 'px;top:' + (Y - 6 + 110 * (1 - k) + (k >= 1 ? 4 * Math.sin(t * 9) : 0)) + 'px;opacity:' + cl(e1 * 6) + '">' + (gl ? '🧤' : '👆') + '</span>'; }
  }
  if (md === 'kaputt') {
    const k = E('crack', 0.35);
    if (k) { for (const d of ['M150 70 l-38 -30 l-24 6 l-40 -34', 'M150 70 l30 -22 l8 -30', 'M150 70 l44 30 l10 34 l46 40', 'M150 70 l-26 40 l6 30 l-34 44', 'M150 70 l60 -6 l40 -30']) g += '<path d="' + d + '" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round" pathLength="1" stroke-dasharray="' + k + ' 1"/>'; g += '<circle cx="150" cy="70" r="7" fill="#fff"/>'; }
    if (dead) { const n = Math.floor(ev.ghost * 2.2), c = (ev.ghost * 2.2) % 1, gx = 60 + rnd(n + 5) * 200, gy = 46 + rnd(n + 9) * 140; g += '<circle cx="' + gx + '" cy="' + gy + '" r="' + (8 + c * 46) + '" fill="none" stroke="#FF5A5A" stroke-width="6" opacity="' + (1 - c) + '"/><circle cx="' + gx + '" cy="' + gy + '" r="8" fill="#FF5A5A" opacity="' + (1 - c) + '"/>'; over += '<span class="tdead" style="opacity:' + cl(ev.ghost * 4) + '">tot</span>'; }
  }
  const shk = md === 'kaputt' && ev.crack !== undefined && ev.crack < 0.4 ? Math.sin(ev.crack * 80) * 10 * (1 - ev.crack / 0.4) : 0;
  const stage = ['p3', 'p2', 'p1', 'ghost', 'crack'].find(n => ev[n] !== undefined); const L = p.labels || {};
  const lbl = ev.act2 !== undefined && L.act2 ? L.act2 : L[stage];
  const res = done && ev.act2 === undefined || (done && !L.act2)
    ? '<div class="cres" style="' + pop(cl(ev.act / 0.35), 'left center') + '"><s>✓</s><br>' + esc(p.result) + '</div>'
    : lbl ? '<div class="cres"><em>' + esc(p.frage || 'Was passiert?') + '</em><span style="display:inline-block;transform:scale(' + (1 + 0.25 * (1 - ease((ev.act2 !== undefined ? ev.act2 : ev[stage]) / 0.3))) + ');transform-origin:left center">' + esc(lbl) + '</span></div>'
    : '<div class="cres" style="opacity:' + (0.55 + 0.25 * Math.sin(t * 4)) + '"><em>' + esc(p.frage || 'Was passiert?') + '</em>' + '•'.repeat(1 + Math.floor(t * 3) % 3) + '</div>';
  return '<div class="panel" style="' + rise(E('panel', 0.5)) + '"><div class="ph"><span>' + esc(p.title || 'Im Display') + '</span><span>' + esc(p.tag || 'Schema') + '</span></div><div class="card" style="gap:36px"><div class="tbox" style="transform:translateX(' + shk + 'px)"><svg width="400" height="228" viewBox="0 0 400 228"><rect x="10" y="8" width="380" height="212" rx="26" fill="#0B1020"/>' + g + '</svg>' + over + '</div>' + res + '</div>' + popHtml + '</div>';
}
// Teil "Display kaputt": Sturz, dann Schichten (Glas gerissen, Gitter heil), dann Gitter defekt, dann Erste Hilfe
function kaputtViz(p, ev, t, E) {
  let g = '', over = ''; const L = p.labels || {}, T = ev.panel === undefined ? 0 : ev.panel, HIT = 1.25;
  const aid = ev.p1 !== undefined, lay2 = ev.crack !== undefined, brk = ev.ghost !== undefined;
  const cracksUV = [[[.42, .45], [.3, .3], [.2, .34], [.05, .08]], [[.42, .45], [.52, .25], [.56, .02]], [[.42, .45], [.6, .6], [.66, .8], [.9, .97]], [[.42, .45], [.32, .7], [.36, .84], [.2, .98]], [[.42, .45], [.68, .42], [.8, .2], [.98, .3]], [[.42, .45], [.2, .55], [.03, .7]]];
  if (!lay2) { // Phase 1: Handy faellt und schlaegt auf
    const k = cl((T - 0.35) / (HIT - 0.35)), y = -420 + 500 * k * k, rot = -28 + 34 * k, hit = T - HIT;
    const sq = hit > 0 && hit < 0.25 ? 1 - 0.12 * Math.sin(Math.PI * hit / 0.25) : 1;
    let ph = '<rect x="-110" y="0" width="220" height="400" rx="34" fill="#0B1020" stroke="#F4F6FB" stroke-width="10"/>'; const cols = ['#FF7A59', '#7C5CFF', '#3DB8FF', '#2ECC71', '#FFCC00', '#FF5A8A'];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 5; j++) ph += '<rect x="' + (-84 + i * 60) + '" y="' + (34 + j * 68) + '" width="46" height="46" rx="12" fill="' + cols[(i + j * 2) % 6] + '"/>';
    if (hit > 0) { const kk = cl(hit / 0.3); for (const c of cracksUV) ph += '<polyline points="' + c.map(q => (-110 + q[0] * 220) + ',' + (q[1] * 400)).join(' ') + '" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round" pathLength="1" stroke-dasharray="' + kk + ' 1"/>'; }
    g += '<ellipse cx="406" cy="500" rx="' + (60 + 130 * k) + '" ry="14" fill="#0B1020" opacity="' + (.3 + .5 * k) + '"/><g transform="translate(406 ' + (y + (hit > 0 ? 0 : 0)) + ') rotate(' + (hit > 0 ? 6 + 3 * Math.sin(hit * 20) * Math.exp(-hit * 4) : rot) + ' 0 400) scale(1 ' + sq + ')">' + ph + '</g>';
    if (k < 1 && T > 0.35) for (let i = 0; i < 4; i++) g += '<line x1="' + (300 + i * 70) + '" y1="' + (y - 20 - i * 14) + '" x2="' + (300 + i * 70) + '" y2="' + (y - 110 - i * 20) + '" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>';
    if (hit > 0) {
      if (hit < 0.9) for (let i = 0; i < 16; i++) { const a = -Math.PI * (0.08 + 0.84 * rnd(i + 3)), v = 260 + 420 * rnd(i + 11), x = 406 + Math.cos(a) * v * hit, yy = 440 + Math.sin(a) * v * hit + 700 * hit * hit, sz = 10 + 16 * rnd(i); g += '<polygon points="' + x + ',' + yy + ' ' + (x + sz) + ',' + (yy + sz * .4) + ' ' + (x + sz * .3) + ',' + (yy + sz) + '" fill="#fff" opacity="' + cl(1.4 - hit * 1.5) + '" transform="rotate(' + (hit * 600 * (rnd(i) - .5)) + ' ' + x + ' ' + yy + ')"/>'; }
      if (hit < 0.35) g += '<rect x="0" y="0" width="812" height="520" fill="#fff" opacity="' + (.7 * (1 - hit / 0.35)) + '"/>';
      over += '<span class="vemo" style="left:560px;top:250px;font-size:170px;transform:scale(' + back(cl(hit / 0.3)) + ') rotate(' + (8 * Math.sin(t * 6)) + 'deg)">💥</span><div class="vlab red" style="left:30px;top:30px;font-size:44px;' + pop(cl(hit / 0.3), 'left center') + '">' + esc(L.hit || 'Autsch') + '</div>';
    }
    return [g, over];
  }
  // Phase 2 und 3: Schichten
  const lay = oy => (u, v) => [62 + u * 370 + v * 165, 262 + oy - u * 105 + v * 108];
  const poly = (f, pts) => pts.map(q => f(q[0], q[1]).map(n => n.toFixed(1)).join(',')).join(' '), sq = [[0, 0], [1, 0], [1, 1], [0, 1]];
  const slab = (oy, fill, stroke, sw) => '<polygon points="' + poly(lay(oy + 14), sq) + '" fill="' + stroke + '" opacity=".4"/><polygon points="' + poly(lay(oy), sq) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw + '" stroke-linejoin="round"/>';
  const k = ease(cl(ev.crack / 0.6)), oD = 46 + 118 * k, oG = 40, oT = 34 - 118 * k + 5 * Math.sin(t * 2.2), B = 0.56, bk = brk ? cl(ev.ghost / 0.35) : 0;
  const fd = lay(oD), fg = lay(oG), ft = lay(oT), cols = ['#FF7A59', '#7C5CFF', '#3DB8FF', '#2ECC71', '#FFCC00', '#FF5A8A'];
  g += slab(oD, '#1B2748', '#3A4A7A', 5);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const u = .1 + i * .22, v = .12 + j * .28; g += '<polygon points="' + poly(fd, [[u, v], [u + .14, v], [u + .14, v + .19], [u, v + .19]]) + '" fill="' + cols[(i + j * 2) % 6] + '"/>'; }
  g += slab(oG, 'rgba(92,225,255,.13)', A, 4);
  if (bk) g += '<polygon points="' + poly(fg, [[B, 0], [1, 0], [1, 1], [B, 1]]) + '" fill="#FF5A5A" opacity="' + (.22 * bk + .08 * Math.sin(t * 12)) + '"/>';
  for (let i = 1; i < 8; i++) { const u = i / 8, off = bk && u > B, a = fg(u, 0), b = fg(u, 1); g += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + (off ? '#56618A' : A) + '" stroke-width="4"' + (off ? ' stroke-dasharray="10 12"' : '') + '/>'; if (!off) { const c = fg(u, (t * .4 + rnd(i)) % 1); g += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="7" fill="#fff"/>'; } }
  for (let j = 1; j < 5; j++) { const v = j / 5, a = fg(0, v), m = fg(bk ? B : 1, v), b = fg(1, v); g += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + m[0] + '" y2="' + m[1] + '" stroke="' + A + '" stroke-width="4"/>'; if (bk) g += '<line x1="' + m[0] + '" y1="' + m[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="#56618A" stroke-width="4" stroke-dasharray="10 12"/>'; const c = fg((bk ? B : 1) * ((t * .3 + rnd(j + 30)) % 1), v); g += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="7" fill="#fff"/>'; }
  if (bk) { // Bruchkante im Gitter mit Funken
    const zz = []; for (let n = 0; n <= 8; n++) zz.push([B + (n % 2 ? .035 : -.035), n / 8]);
    g += '<polyline points="' + poly(fg, zz) + '" fill="none" stroke="#FF5A5A" stroke-width="8" stroke-linejoin="round" pathLength="1" stroke-dasharray="' + bk + ' 1"/>';
    for (let n = 0; n < 3; n++) { const q = fg(B, .15 + .35 * n), on = Math.sin(t * 23 + n * 2.1) > 0.2; if (on) over += '<span class="vemo" style="left:' + (q[0] - 22) + 'px;top:' + (q[1] - 50) + 'px;font-size:46px">⚡</span>'; }
  }
  // Glas mit Rissen
  g += slab(oT, 'rgba(255,255,255,.26)', '#fff', 5);
  for (const c of cracksUV) g += '<polyline points="' + poly(ft, c) + '" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>';
  const ell = (q, c, col) => '<ellipse cx="' + q[0] + '" cy="' + q[1] + '" rx="' + (14 + c * 90) + '" ry="' + (6 + c * 38) + '" fill="none" stroke="' + col + '" stroke-width="7" opacity="' + (1 - c) + '"/>';
  const fing = (q, press) => '<span class="vemo" style="left:' + (q[0] - 50) + 'px;top:' + (q[1] - 6 + (press ? 0 : 26)) + 'px;font-size:118px;transform:scale(' + (press ? .9 : 1) + ')">👆</span>';
  const pt = ft(1, .45), pgl = fg(1, .55);
  if (!aid) {
    over += '<div class="vlab" style="left:' + (pt[0] + 30) + 'px;top:' + (pt[1] - 26) + 'px;' + pop(cl((ev.crack - .4) / 0.3), 'left center') + '">' + esc(L.glas || 'Glas: gerissen') + '</div>';
    if (!brk) { // Gitter heil: Finger tippt, es reagiert
      const e = L.heil === '' ? -1 : ev.crack - 0.9; if (L.heil === '' && ev.crack > 0.6) over += '<span class="vemo" style="left:640px;top:' + (20 - 8 * Math.abs(Math.sin(t * 6))) + 'px;font-size:100px">⚠️</span>'; if (e > 0) { const c = (e % 1.3) / 1.3, q = fg(.45, .5); g += ell(q, cl(c / .7), A) + ell(q, cl((c - .2) / .7), A); over += fing(q, c < .18); }
      over += (L.heil === '' ? '' : '<div class="vlab hot" style="left:' + (pgl[0] + 30) + 'px;top:' + (pgl[1] - 4) + 'px;' + pop(cl((ev.crack - .9) / 0.3), 'left center') + '">✓ ' + esc(L.heil || 'Gitter heil') + '</div>') + '<div class="vres" style="left:26px;bottom:26px;' + (L.heil === '' ? 'background:#FF5A5A;color:#fff;' : '') + pop(cl((ev.crack - 1.5) / 0.35), 'left center') + '">' + esc(L.crack) + '</div>';
    } else { // Gitter defekt: tote Zone ohne Reaktion, Geistertipper im Rest
      over += '<div class="vlab red" style="right:18px;top:' + (pgl[1] + 2) + 'px;' + pop(bk, 'right center') + '">' + esc(L.defekt || 'Gitter defekt') + '</div>';
      const e = ev.ghost - 0.5; if (e > 0) { const n = Math.floor(e / 1.5), c = (e % 1.5) / 1.5;
        if (n % 2 === 0) { const q = fg(.8, .5); over += fing(q, c < .2 || (c > .4 && c < .6)); if (c > .25) { g += '<path d="M' + (q[0] - 34) + ' ' + (q[1] - 30) + ' l68 60 m0 -60 l-68 60" stroke="#FF5A5A" stroke-width="14" stroke-linecap="round"/>'; } over += '<div class="vres" style="left:26px;bottom:26px;background:#FF5A5A;color:#fff;' + pop(cl(c / .25), 'left center') + '">' + esc(L.tot || 'Keine Reaktion') + '</div>'; }
        else { const q = fg(.12 + .3 * rnd(n + 4), .2 + .6 * rnd(n + 8)); g += ell(q, cl(c / .7), '#FF5A5A') + ell(q, cl((c - .25) / .7), '#FF5A5A'); over += '<span class="vemo" style="left:' + (q[0] - 50) + 'px;top:' + (q[1] - 96 - 10 * Math.sin(t * 7)) + 'px;font-size:100px;transform:scale(' + back(cl(c / .25)) + ')">👻</span><div class="vres" style="left:26px;bottom:26px;background:#FF5A5A;color:#fff;' + pop(cl(c / .25), 'left center') + '">' + esc(L.ghost || 'Tippt von allein') + '</div>'; }
      }
    }
  } else {
    g += '<rect x="0" y="0" width="812" height="520" fill="#0B1020" opacity="' + (.78 * E('p1', .3)) + '"/>';
    (p.cards || []).forEach((c, i) => { const e = ev['p' + (i + 1)]; if (e === undefined) return; const cur = ev['p' + (i + 2)] === undefined && ev.act === undefined;
      over += '<div class="vcard' + (cur ? ' on' : '') + '" style="left:' + (28 + i * 262) + 'px;top:' + (ev.act !== undefined ? 40 : 130) + 'px;' + pop(cl(e / 0.35)) + '"><span style="transform:' + (i === 0 ? 'rotate(' + (e * 300) + 'deg)' : 'translateY(' + (-12 * Math.abs(Math.sin(e * 6))) + 'px)') + '">' + c[0] + '</span><em>' + esc(c[1]) + '</em></div>'; });
    if (ev.act !== undefined) over += '<div class="vres" style="left:50%;bottom:44px;font-size:52px;translate:-50% 0;white-space:nowrap;' + pop(cl(ev.act / 0.35)) + 'rotate:' + (-3 + 2 * Math.sin(t * 6)) + 'deg">🛠️ ' + esc(p.result) + '</div>';
  }
  return [g, over];
}
// Grosse Erklaer-Grafik (Serie Physik): fuellt die Flaeche unter dem Titel, ersetzt die Schrittliste
function bigViz(p, ev, t, E, popHtml) {
  const md = p.mode, L = p.labels || {}; let g = '', over = '';
  const chip = (n, x, y, txt, cls) => ev[n] === undefined || !txt ? '' : '<div class="vlab ' + (cls || '') + '" style="left:' + x + 'px;top:' + y + 'px;' + pop(cl(ev[n] / 0.35), 'left center') + '">' + esc(txt) + '</div>';
  if (typeof VIZ !== 'undefined' && VIZ[md]) { const r = VIZ[md](p, ev, t, E, L); g = r[0]; over = r[1]; }
  else if (md === 'kaputt') { const r = kaputtViz(p, ev, t, E); g = r[0]; over = r[1]; }
  else if (md === 'gitter') {
    const k1 = ease(E('p1', 0.7)), k2 = ease(E('p2', 0.7)), k3 = E('p3', 0.5), done = ev.act !== undefined;
    const lay = oy => (u, v) => [62 + u * 370 + v * 165, 262 + oy - u * 105 + v * 108];
    const poly = (f, pts) => pts.map(q => f(q[0], q[1]).map(n => n.toFixed(1)).join(',')).join(' ');
    const sq = [[0, 0], [1, 0], [1, 1], [0, 1]];
    const slab = (oy, fill, stroke, sw, op) => { const f = lay(oy), f2 = lay(oy + 14); return '<polygon points="' + poly(f2, sq) + '" fill="' + stroke + '" opacity="' + (op * .45) + '"/><polygon points="' + poly(f, sq) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw + '" stroke-linejoin="round" opacity="' + op + '"/>'; };
    const oD = 46 + 118 * k2, oG = 40 + 0 * k2, oT = 34 - 118 * k1 + 5 * Math.sin(t * 2.2) * k1;
    // unten: Bildschirm mit App-Symbolen
    g += slab(oD, '#1B2748', '#3A4A7A', 5, 1); const fd = lay(oD), cols = ['#FF7A59', '#7C5CFF', '#3DB8FF', '#2ECC71', '#FFCC00', '#FF5A8A'];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const u = .1 + i * .22, v = .12 + j * .28; g += '<polygon points="' + poly(fd, [[u, v], [u + .14, v], [u + .14, v + .19], [u, v + .19]]) + '" fill="' + cols[(i + j * 2) % 6] + '" opacity="' + (.35 + .65 * k2) + '"/>'; }
    // Mitte: Gitter aus Leiterbahnen
    const fg = lay(oG); g += slab(oG, 'rgba(92,225,255,.13)', A, done ? 6 + 4 * Math.sin(t * 8) : 4, k1);
    for (let i = 1; i < 8; i++) { const a = fg(i / 8, 0), b = fg(i / 8, k2); g += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + A + '" stroke-width="4" opacity="' + k1 + '"/>'; if (k3) { const c = fg(i / 8, (t * .4 + rnd(i)) % 1); g += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + (7 + 2 * Math.sin(t * 9 + i)) + '" fill="#fff" opacity="' + k3 + '"/>'; } }
    for (let j = 1; j < 5; j++) { const a = fg(0, j / 5), b = fg(k2, j / 5); g += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + A + '" stroke-width="4" opacity="' + k1 + '"/>'; if (k3) { const c = fg((t * .3 + rnd(j + 30)) % 1, j / 5); g += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="7" fill="#fff" opacity="' + k3 + '"/>'; } }
    // oben: Glas mit wanderndem Glanz
    const ft = lay(oT), sh = (t * .45) % 1.4 - .2; g += slab(oT, 'rgba(255,255,255,' + (.92 - .68 * k1) + ')', '#fff', 5, 1);
    if (sh > 0 && sh < .86) g += '<polygon points="' + poly(ft, [[sh, 0], [sh + .14, 0], [sh + .14, 1], [sh, 1]]) + '" fill="#fff" opacity=".35"/>';
    if (k3) for (let i = 0; i < 3; i++) { const c = fg(.2 + .3 * i, .5); over += '<span class="vemo" style="left:' + (c[0] - 26) + 'px;top:' + (c[1] - 70 - 14 * Math.abs(Math.sin(t * 5 + i))) + 'px;font-size:52px;opacity:' + k3 + '">⚡</span>'; }
    const pt = lay(oT)(1, .45), pg = fg(1, .55), pd = fd(1, .6);
    over += chip('p1', pt[0] + 36, pt[1] - 20, L.p1) + chip('p2', pg[0] + 36, pg[1] - 6, L.p2) + chip('p3', 30, 30, '⚡ ' + L.p3, 'hot') + (k2 ? '<div class="vlab dim" style="left:' + (pd[0] + 36) + 'px;top:' + (pd[1] + 6) + 'px;opacity:' + k2 + '">' + esc(L.display || 'Bildschirm') + '</div>' : '');
    if (done) over += '<div class="vres" style="left:26px;bottom:26px;' + pop(cl(ev.act / 0.35), 'left center') + '">✓ ' + esc(p.result) + '</div>';
  } else {
    const X = 406, Y = 218, cx = i => 60 + i * 86.5, cy = j => 50 + j * 84, gl = ev.act2 !== undefined;
    const bend = md === 'finger' && ev.p2 !== undefined && !gl ? ease(ev.p2 / 0.4) * (0.34 + 0.05 * Math.sin(t * 7)) : 0;
    const dp = (x, y) => { if (!bend) return [x, y]; const d2 = (x - X) * (x - X) + (y - Y) * (y - Y), w = bend * Math.exp(-d2 / 26000); return [x + (X - x) * w, y + (Y - y) * w]; };
    const dead = md === 'kaputt' && ev.ghost !== undefined, lock = md === 'finger' && ev.p3 !== undefined && ev.p3 > 0.9 && !gl, scan = md === 'finger' && ev.p3 !== undefined && ev.p3 <= 0.9 && !gl;
    g += '<rect x="6" y="6" width="800" height="508" rx="40" fill="#0B1020"/>';
    if (scan) { const n = Math.floor(ev.p3 * 14); g += '<rect x="' + (cx(n % 9) - 30) + '" y="14" width="60" height="492" fill="' + A + '" opacity=".28"/><rect x="14" y="' + (cy(n % 6) - 28) + '" width="784" height="56" fill="' + A + '" opacity=".28"/>'; }
    for (let i = 0; i < 9; i++) { const off = dead && i >= 6, hl = lock && i === 4; let d = ''; for (let y = 20; y <= 500; y += 20) { const q = dp(cx(i), y); d += (y === 20 ? 'M' : 'L') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); } g += '<path d="' + d + '" fill="none" stroke="' + (off ? '#2A355C' : hl ? '#fff' : A) + '" stroke-width="' + (hl ? 9 : 4) + '" opacity="' + (hl || off ? 1 : .65) + '"/>'; if (!off) { const q = dp(cx(i), 20 + 480 * ((t * .33 + rnd(i + 2)) % 1)); g += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="7" fill="#fff"/>'; } }
    for (let j = 0; j < 6; j++) { const hl = lock && j === 2, xe = dead ? cx(5) + 40 : 792; let d = ''; for (let x = 20; x <= xe; x += 20) { const q = dp(x, cy(j)); d += (x === 20 ? 'M' : 'L') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); } g += '<path d="' + d + '" fill="none" stroke="' + (hl ? '#fff' : A) + '" stroke-width="' + (hl ? 9 : 4) + '" opacity="' + (hl ? 1 : .65) + '"/>'; if (dead) g += '<line x1="' + xe + '" y1="' + cy(j) + '" x2="792" y2="' + cy(j) + '" stroke="#2A355C" stroke-width="4"/>'; const q = dp(20 + (xe - 20) * ((t * .27 + rnd(j + 20)) % 1), cy(j)); g += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="7" fill="#fff"/>'; }
    if (md === 'finger') {
      const e1 = gl ? ev.act2 : ev.p1;
      if (ev.p2 !== undefined && !gl) for (const o of [0, .33, .66]) { const c = (ev.p2 * .9 + o) % 1; g += '<circle cx="' + X + '" cy="' + Y + '" r="' + (20 + c * 190) + '" fill="none" stroke="' + A + '" stroke-width="7" opacity="' + (1 - c) + '"/>'; }
      if (lock) g += '<circle cx="' + X + '" cy="' + Y + '" r="' + (26 + 6 * Math.sin(t * 10)) + '" fill="#fff"/>';
      if (gl && ev.act2 > 0.45) g += '<path d="M' + (X - 60) + ' ' + (Y - 60) + ' l120 120 m0 -120 l-120 120" stroke="#FF5A5A" stroke-width="24" stroke-linecap="round" opacity="' + cl((ev.act2 - .45) * 6) + '"/>';
      if (e1 !== undefined) { const k = ease(e1 / 0.5); over += '<span class="vemo" style="left:' + (X - 96) + 'px;top:' + (Y - 4 + 320 * (1 - k) + (k >= 1 ? 6 * Math.sin(t * 9) : 0)) + 'px;font-size:220px">' + (gl ? '🧤' : '👆') + '</span>'; }
      over += gl ? chip('act2', 30, 30, L.act2, 'red') : lock ? '<div class="vlab hot" style="left:30px;top:30px;' + pop(cl((ev.p3 - .9) / 0.3), 'left center') + '">' + esc(L.p3) + '</div>' : scan ? '<div class="vlab" style="left:30px;top:30px">' + esc(L.scan || 'Chip sucht') + '.'.repeat(1 + Math.floor(t * 6) % 3) + '</div>' : ev.p2 !== undefined ? chip('p2', 30, 30, L.p2) : chip('p1', 30, 30, L.p1);
      if (ev.act !== undefined && !gl) over += '<div class="vres" style="left:26px;bottom:26px;' + pop(cl(ev.act / 0.35), 'left center') + '">🎯 ' + esc(p.result) + '</div>' + confetti(ev.act, X, Y, 26);
    }
  }
  const hitT = md === 'kaputt' && ev.panel !== undefined ? ev.panel - 1.25 : -1, shk = hitT > 0 && hitT < 0.5 ? Math.sin(hitT * 80) * 22 * (1 - hitT / 0.5) : (md === 'kaputt' && ev.ghost !== undefined && ev.ghost < 0.5 ? Math.sin(ev.ghost * 80) * 16 * (1 - ev.ghost / 0.5) : 0);
  return '<div class="viz" style="' + rise(E('panel', 0.5)) + '"><div class="vin" style="transform:translate(' + shk + 'px,' + (shk * .6) + 'px)"><svg width="812" height="520" viewBox="0 0 812 520">' + g + '</svg>' + over + '</div>' + popHtml + '</div>';
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
  // Vollbild-Welt (Pilot P005): ersetzt den Standard-Hintergrund
  const wd = document.getElementById('world'), hasW = sc.world && typeof WORLD !== 'undefined' && WORLD[sc.world];
  wd.innerHTML = hasW ? WORLD[sc.world](sc, ev, t, lt, (n, d = 0.45) => ev[n] === undefined ? 0 : cl(ev[n] / d)) : '';
  document.querySelector('.b1').style.display = document.querySelector('.b2').style.display = document.getElementById('fx').style.display = hasW ? 'none' : '';
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
    if (sc.world) {} else if (!sc.emoji) { // Akku-Visual aus V001
      const dr = ev.drain === undefined ? 100 : Math.round(100 - 88 * ease(ev.drain / 1.5)); const low = dr <= 25;
      const col = dr > 40 ? '#F4F6FB' : (dr > 20 ? A : '#FF5A5A');
      h += '<div style="position:absolute;left:0;top:340px;display:flex;align-items:center;gap:30px;' + rise(k0 - 0.3) + (low ? 'transform:translate(' + (Math.sin(t * 55) * 5) + 'px,' + (Math.cos(t * 47) * 3) + 'px);' : '') + '"><svg width="380" height="180" viewBox="0 0 420 200" style="' + (low ? 'filter:drop-shadow(0 0 ' + (14 + 12 * Math.sin(t * 9)) + 'px #FF5A5A)' : '') + '"><rect x="6" y="6" width="370" height="188" rx="44" fill="none" stroke="#F4F6FB" stroke-width="12"/><rect x="386" y="66" width="26" height="68" rx="10" fill="#F4F6FB"/><rect x="28" y="28" width="' + (326 * dr / 100) + '" height="144" rx="26" fill="' + col + '"/></svg><div style="font-size:136px;font-weight:900;letter-spacing:-.04em;color:' + col + ';transform:scale(' + (low ? 1 + 0.05 * Math.sin(t * 10) : 1) + ')">' + dr + ' %</div></div>';
      if (E('sticker')) h += '<div class="stick" style="left:0;top:580px;font-size:50px;' + pop(E('sticker'), 'left center') + 'rotate:' + (-4 + 2 * Math.sin(t * 6)) + 'deg">' + esc(sc.sticker) + ' 👇</div>';
    } else {
      const kc = cl((lt - 0.4) / 0.4), mk = ev.mark === undefined ? 0 : ev.mark;
      h += '<div class="hcard" style="left:0;top:345px;opacity:' + cl(kc * 3) + ';transform:scale(' + (back(kc) * (1 + 0.08 * Math.sin(t * 3.4))) + ') rotate(' + (6 * Math.sin(t * 2.3) + (mk < 0.5 ? 25 * Math.sin(mk * 30) * (1 - mk / 0.5) : 0)) + 'deg)"><span style="transform:translateY(' + (-10 * Math.abs(Math.sin(t * 3))) + 'px)">' + sc.emoji + '</span>' + (sc.tap ? ring(125, 110, (lt % 0.9) / 0.6) + ring(125, 110, ((lt + .3) % 0.9) / 0.6) + '<span class="fing" style="left:104px;top:110px;font-size:110px;transform:scale(' + ((lt % 0.9) < 0.14 ? 0.82 : 1) + ')">👆</span>' : '') + '</div>';
      h += confetti(ev.mark, 125, 470, 20);
      if (E('sticker')) h += '<div class="stick" style="left:300px;top:420px;font-size:50px;' + pop(E('sticker'), 'left center') + 'rotate:' + (-4 + 2 * Math.sin(t * 6)) + 'deg">' + esc(sc.sticker) + ' 👇</div>';
    }
    if (showPop) h += popAt('right:0;top:560px');
  }
  if (sc.type === 'tip') {
    const nk = cl((lt - 0.3) / 0.3);
    h += '<div class="top"><div class="num" style="opacity:' + cl(nk * 4) + ';transform:scale(' + (1 + 1.8 * (1 - ease(nk))) + ') rotate(' + (-8 * (1 - ease(nk))) + 'deg)">' + sc.num + '</div><h2 style="' + rise(k0 - 0.6) + '">' + esc(sc.title) + '</h2></div>';
    const big = sc.panel && sc.panel.big;
    if (!big) { h += '<div class="path">';
    sc.path.forEach((p, i) => {
      const e = ev['p' + (i + 1)]; const k = E('p' + (i + 1), 0.4); const cur = e !== undefined && ev['p' + (i + 2)] === undefined && ev.act === undefined;
      const tap = e !== undefined && e < 0.75 ? '<span class="tap" style="transform:translateY(' + (-24 * Math.abs(Math.sin(e * 8))) + 'px)">👆</span><span class="ring" style="width:' + (60 + e * 240) + 'px;height:' + (60 + e * 240) + 'px;opacity:' + cl(1 - e / 0.6) + '"></span>' : '';
      h += '<div class="step' + (cur ? ' on' : '') + '" style="' + (e === undefined ? 'opacity:' + (0.3 * cl(k0 - 1)) + ';' : pop(k, 'left center')) + '"><s>' + (i + 1) + '</s>' + esc(p) + tap + '</div>';
    });
    h += '</div>';
    }
    const ph = showPop ? popAt(big ? 'right:-14px;bottom:-26px' : 'right:-16px;top:-150px') : '';
    if (big && !sc.world) h += bigViz(sc.panel, ev, t, E, ph); else if (big) {} else
    if (typeof sc.panel === 'string') h += legacyPanel(sc.panel, ev, t, E, ph);
    else if (sc.panel && sc.panel.kind === 'card') h += cardPanel(sc.panel, ev, t, E, ph);
    else if (sc.panel && sc.panel.kind === 'touch') h += touchPanel(sc.panel, ev, t, E, ph);
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
  for (const n of ['act', 'mark', 'save']) { const e = ev[n]; if (e !== undefined && e < 0.55) { spin = 360 * ease(e / 0.55); jump = Math.sin(Math.PI * e / 0.55) * 40; } } // weniger Saltos: nicht mehr bei Sticker und act2
  performance_t = t; const m = document.getElementById('masc'); m.innerHTML = mascot(mood, open, blink, 300);
  m.style.transform = 'translate(' + (Math.sin(t * 1.1) * 10) + 'px,' + (Math.sin(t * 2.6) * 7 - (talking ? open * 5 : 0) - jump) + 'px) rotate(' + (Math.sin(t * 1.7) * 3 + spin) + 'deg)';
  // Pilot P005: Schalti bewegt sich durch die Welt und haelt Requisiten
  const pose = sc.world && typeof WMASC !== 'undefined' && WMASC[sc.world] ? WMASC[sc.world](ev, t, lt, sc) : null;
  if (pose) { const s0 = pose.s, hop = pose.walk ? Math.abs(Math.sin(t * 11)) * 22 * s0 : 0;
    m.style.left = (pose.f[0] - 150) + 'px'; m.style.top = (pose.f[1] - 225) + 'px'; m.style.transformOrigin = '50% 100%';
    m.style.transform = 'translate(0px,' + (-hop - jump * (s0 >= .8 ? .35 : s0) + Math.sin(t * 2.6) * 4) + 'px) rotate(' + ((pose.r || 0) + spin + Math.sin(t * 1.7) * 3) + 'deg) scale(' + (pose.flip ? -s0 : s0) + ',' + s0 + ')';
    if (pose.prop) m.innerHTML += '<span style="position:absolute;left:-46px;top:-40px;font-size:100px;line-height:1;font-family:Noto Color Emoji;transform:scale(' + (pose.flip ? -1 : 1) + ',1) rotate(' + (10 * Math.sin(t * 4)) + 'deg)">' + pose.prop + '</span>';
  } else { m.style.left = '70px'; m.style.top = '1312px'; m.style.transformOrigin = ''; }
  m.style.filter = pose && pose.fx ? pose.fx : ''; /* v6: Cartoon-Effekte (Russ, Stromschlag, Farbe) */
  const b = document.getElementById('bub'); const q = sc.quip;
  if (pose && pose.s >= .8) { b.style.left = '440px'; b.style.top = '1360px'; } else if (pose) { b.style.left = '120px'; b.style.top = '1340px'; } /* Sprechblase unten im freien Bereich */ else { b.style.left = ''; b.style.top = ''; } const qs = sc.lines[Math.min(sc.quipAt || 1, sc.lines.length - 1)].start;
  if (q && t >= qs) { b.style.display = 'block'; b.textContent = q; b.style.transform = 'rotate(' + (3 + 2 * Math.sin(t * 4)) + 'deg) scale(' + (0.5 + 0.5 * back((t - qs) / 0.35)) + ')'; b.style.opacity = cl((t - qs) / 0.15); } else b.style.display = 'none';
}
