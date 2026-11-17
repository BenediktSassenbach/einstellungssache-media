// C009V3 "Warum traenen deine Augen beim Zwiebelschneiden?" im Design 3.0 (Vollbild plus), gebaut am 17.11.2026.
// Ort: Kueche bei Nacht mit Arbeitsplatte, Schneidebrett, Zwiebel und Messer. Was sich dauernd bewegt: Sterne und Wolke im Fenster,
//   Dampf ueber dem Wasserkocher, Kraeuter im Topf, Lichtschein ueber dem Brett.
//   Einstieg: Schalti will in die Zwiebel beissen, sie wehrt sich mit einer Reizstoff-Wolke und pustet ihn von der Arbeitsplatte. Einschlag bei 0,5 s
//   Teil 1: ganze Zwiebel auf dem Brett, dann der eine Blick ins Innere: eine Zwiebelzelle im Vollbild, das Messer geht durch
//   Teil 2: geschnittene Zwiebel auf dem Brett, der Reizstoff zieht zu Schaltis Auge, eine Lupe zeigt Hornhaut und Nerven
//   Teil 3: dasselbe Messer erst stumpf, dann scharf (verwandelt sich an Ort und Stelle), es gibt nur eine Zwiebel
// Helfer aus viz_v3.js und viz_v3b.js. Zum Loeschen dieser Fassung: diese Datei und videos/C009V3. Die Mimik "cry" und pose.cry in video_page.js koennen bleiben.
const T9 = 1128, R9 = 82, OY9 = 1104 - R9, CY9 = T9 + 12, S9 = .85, LIME9 = '#C8F75A';
const LD9 = (sc, i) => sc.lines[i].end - sc.lines[i].start;
const n9 = v => (+v).toFixed(1);

// ---------- Zeichnungen ----------
function bulb9(r) { return 'M0 ' + n9(-1.15 * r) + ' C' + n9(.25 * r) + ' ' + n9(-.9 * r) + ' ' + n9(r) + ' ' + n9(-.75 * r) + ' ' + n9(r) + ' 0 C' + n9(r) + ' ' + n9(.75 * r) + ' ' + n9(.35 * r) + ' ' + n9(r) + ' 0 ' + n9(r) + ' C' + n9(-.35 * r) + ' ' + n9(r) + ' ' + n9(-r) + ' ' + n9(.75 * r) + ' ' + n9(-r) + ' 0 C' + n9(-r) + ' ' + n9(-.75 * r) + ' ' + n9(-.25 * r) + ' ' + n9(-.9 * r) + ' 0 ' + n9(-1.15 * r) + ' Z'; }
// Ganze Zwiebel, Mitte (x, y). o.sq 0 bis 1 gequetscht, o.bite Biss links unten
function onion9(x, y, r, o) { o = o || {}; const sq = o.sq || 0, id = 'on' + Math.round(x) + '_' + Math.round(y), bx = -.9 * r, by = .2 * r, br = .4 * r;
  let s = '<g transform="translate(' + n9(x) + ' ' + n9(y + r) + ') scale(' + (1 + .2 * sq).toFixed(3) + ' ' + (1 - .32 * sq).toFixed(3) + ') translate(0 ' + n9(-r) + ')">';
  s += '<defs><radialGradient id="' + id + 'g" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#F6C173"/><stop offset=".55" stop-color="#D2822F"/><stop offset="1" stop-color="#9A531C"/></radialGradient><clipPath id="' + id + 'c"><path d="' + bulb9(r) + '"/></clipPath>';
  if (o.bite) s += '<mask id="' + id + 'm"><rect x="' + n9(-2 * r) + '" y="' + n9(-2 * r) + '" width="' + n9(4 * r) + '" height="' + n9(4 * r) + '" fill="#fff"/><circle cx="' + n9(bx) + '" cy="' + n9(by) + '" r="' + n9(br) + '" fill="#000"/></mask>';
  s += '</defs><g' + (o.bite ? ' mask="url(#' + id + 'm)"' : '') + '>';
  s += '<path d="M-14 ' + n9(r - 3) + ' l-8 15 M0 ' + n9(r) + ' v17 M14 ' + n9(r - 3) + ' l8 15" stroke="#8A5A2A" stroke-width="5" stroke-linecap="round"/>';
  s += '<path d="M0 ' + n9(-1.08 * r) + ' q-9 -22 7 -42" stroke="#C9A066" stroke-width="10" fill="none" stroke-linecap="round"/>';
  s += '<path d="' + bulb9(r) + '" fill="url(#' + id + 'g)" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/>';
  s += '<path d="M0 ' + n9(-1.1 * r) + ' C' + n9(.55 * r) + ' ' + n9(-.5 * r) + ' ' + n9(.6 * r) + ' ' + n9(.5 * r) + ' ' + n9(.12 * r) + ' ' + n9(.97 * r) + ' M0 ' + n9(-1.1 * r) + ' C' + n9(-.55 * r) + ' ' + n9(-.5 * r) + ' ' + n9(-.6 * r) + ' ' + n9(.5 * r) + ' ' + n9(-.12 * r) + ' ' + n9(.97 * r) + ' M0 ' + n9(-1.1 * r) + ' C' + n9(.16 * r) + ' ' + n9(-.4 * r) + ' ' + n9(.16 * r) + ' ' + n9(.5 * r) + ' 0 ' + n9(r) + '" stroke="#7A3F12" stroke-width="4" fill="none" opacity=".4"/>';
  s += '<ellipse cx="' + n9(-.42 * r) + '" cy="' + n9(-.36 * r) + '" rx="' + n9(.13 * r) + '" ry="' + n9(.3 * r) + '" fill="#fff" opacity=".3" transform="rotate(24 ' + n9(-.42 * r) + ' ' + n9(-.36 * r) + ')"/></g>';
  if (o.bite) s += '<g clip-path="url(#' + id + 'c)"><circle cx="' + n9(bx) + '" cy="' + n9(by) + '" r="' + n9(br + 7) + '" fill="none" stroke="#F7EEDC" stroke-width="14"/><circle cx="' + n9(bx) + '" cy="' + n9(by) + '" r="' + n9(br) + '" fill="none" stroke="#0B1020" stroke-width="5"/></g>';
  return s + '</g>'; }
// Haelfte mit Schnittflaeche zum Betrachter, steht auf (x, y + r) und lehnt um rot Grad. o.clip 'L' oder 'R': nur dieser Teil, o.dx seitlich verschoben
function half9(x, y, r, rot, o) { o = o || {}; const id = 'hf' + Math.round(x) + (o.clip || '') + Math.round(rot);
  let s = '<g transform="translate(' + n9(x) + ' ' + n9(y + r) + ') rotate(' + n9(rot) + ') translate(' + n9(o.dx || 0) + ' ' + n9(-r) + ')">', b = '';
  if (o.clip) s += '<clipPath id="' + id + '"><rect x="' + (o.clip === 'L' ? n9(-1.4 * r) : '0') + '" y="' + n9(-1.6 * r) + '" width="' + n9(1.4 * r) + '" height="' + n9(3 * r) + '"/></clipPath>';
  b += '<path d="' + bulb9(r) + '" fill="#F7EEDC" stroke="#0B1020" stroke-width="15" stroke-linejoin="round"/><path d="' + bulb9(r) + '" fill="#F7EEDC" stroke="#D2822F" stroke-width="8" stroke-linejoin="round"/>';
  [.78, .57, .37, .19].forEach(q => { b += '<path d="' + bulb9(r * q) + '" transform="translate(0 ' + n9(r * (1 - q) * .4) + ')" fill="none" stroke="#CDB67E" stroke-width="5"/>'; });
  s += o.clip ? '<g clip-path="url(#' + id + ')">' + b + '</g><path d="M0 ' + n9(-1.12 * r) + ' V' + n9(r) + '" stroke="#0B1020" stroke-width="5" stroke-linecap="round"/>' : b;
  return s + '</g>'; }
// Messer, (x, y) ist die Mitte der Schneide. b 1 stumpf (grau, schartig) bis 0 scharf (hell, glatt). gl 0 bis 1: Lichtstreifen wandert ueber die Klinge
function knife9(x, y, rot, b, gl) { b = cl(b); let ed = 'M-170 0'; for (let i = 1; i <= 16; i++) ed += ' L' + (-170 + i * 20) + ' ' + (i % 2 ? n9(-8 * b) : '0');
  let s = '<g transform="translate(' + n9(x) + ' ' + n9(y) + ') rotate(' + n9(rot) + ')"><clipPath id="kn9"><path d="' + ed + ' L150 -78 L-70 -78 Q-150 -66 -170 0 Z"/></clipPath>';
  s += '<path d="' + ed + ' L150 -78 L-70 -78 Q-150 -66 -170 0 Z" fill="' + lc('#EDF2F9', '#8E97A6', b) + '" stroke="#0B1020" stroke-width="6" stroke-linejoin="round"/>';
  s += '<path d="M-120 -54 H126" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="' + (.2 + .6 * (1 - b)).toFixed(2) + '"/><path d="M-160 -4 H148" stroke="' + lc('#FFFFFF', '#6F7785', b) + '" stroke-width="5" opacity="' + (1 - b).toFixed(2) + '"/>';
  if (b > .05) s += '<g opacity="' + (.75 * b).toFixed(2) + '" fill="#6A4A2E"><circle cx="-52" cy="-30" r="9"/><circle cx="52" cy="-44" r="7"/><circle cx="104" cy="-20" r="10"/><circle cx="-108" cy="-22" r="6"/></g>';
  if (gl > 0 && gl < 1) { const gx = lerp(-230, 210, gl); s += '<g clip-path="url(#kn9)"><path d="M' + n9(gx) + ' 10 l44 -100 h38 l-44 100 Z" fill="#fff" opacity=".9"/></g>'; }
  s += '<rect x="150" y="-82" width="24" height="86" rx="6" fill="#C9CFDD" stroke="#0B1020" stroke-width="6"/><rect x="174" y="-74" width="148" height="64" rx="24" fill="#3A1E12" stroke="#0B1020" stroke-width="6"/><circle cx="216" cy="-42" r="7" fill="#C9CFDD"/><circle cx="280" cy="-42" r="7" fill="#C9CFDD"/>';
  return s + '</g>'; }
// Reizstoff: Wolke und einzelnes Teilchen
function gas9(x, y, r, t, op, sd) { if (op <= 0) return ''; let s = '<g opacity="' + cl(op).toFixed(2) + '">'; for (let i = 0; i < 7; i++) { const a = i * .9 + sd + .3 * Math.sin(t * 1.3 + i); s += '<circle cx="' + n9(x + r * .55 * Math.cos(a)) + '" cy="' + n9(y + r * .45 * Math.sin(a)) + '" r="' + n9(r * (.42 + .2 * rnd(i + sd * 7))) + '" fill="' + LIME9 + '" opacity=".5"/>'; } return s + '<circle cx="' + n9(x) + '" cy="' + n9(y) + '" r="' + n9(r * .5) + '" fill="#EDFFA6" opacity=".6"/></g>'; }
function mol9(x, y, r, op, col) { return op <= 0 ? '' : '<circle cx="' + n9(x) + '" cy="' + n9(y) + '" r="' + n9(r) + '" fill="' + (col || LIME9) + '" stroke="#0B1020" stroke-width="4" opacity="' + cl(op).toFixed(2) + '"/>'; }
function drop9(x, y, r, op) { return op <= 0 ? '' : '<circle cx="' + n9(x) + '" cy="' + n9(y) + '" r="' + n9(r) + '" fill="#E4F9A8" stroke="#0B1020" stroke-width="3" opacity="' + cl(op).toFixed(2) + '"/>'; }

// ---------- Der Ort: Kueche bei Nacht ----------
function kitchen9(t, o) { o = o || {}; const T = T9;
  let s = room3(t, { id: 'k9', a: '#12060E', b: '#3A1230', c: '#5A1E3E', fl: '#140810', fs: '#2A1020', ln: '#FF9AD6', glow: [660, 960, 540, 380, '#FFB45C', .36 + .03 * Math.sin(t * 1.1)] });
  for (let y = 650; y < T; y += 96) s += '<path d="M0 ' + y + ' H1080" stroke="#fff" stroke-width="4" opacity=".05"/>'; for (let x = 48; x < 1080; x += 96) s += '<path d="M' + x + ' 600 V' + T + '" stroke="#fff" stroke-width="4" opacity=".05"/>';
  s += win3(650, 262, 240, 280, t, 'night', 'k9', '#7A3058'); { const cx = 640 + ((t * 7) % 300); s += '<clipPath id="k9wc"><rect x="650" y="262" width="240" height="280" rx="10"/></clipPath><g clip-path="url(#k9wc)" opacity=".45" fill="#B9A6D8"><ellipse cx="' + n9(cx) + '" cy="440" rx="56" ry="16"/><ellipse cx="' + n9(cx + 30) + '" cy="428" rx="36" ry="14"/></g>'; }
  // Wandregal mit Vorratsglaesern (im Schluss weggelassen, dort steht der Schlusssatz an dieser Stelle)
  if (!o.noshelf) s += '<rect x="30" y="800" width="300" height="18" rx="8" fill="#7A3058" stroke="#0B1020" stroke-width="5"/><path d="M70 818 v30 l30 -30 M290 818 v30 l-30 -30" stroke="#7A3058" stroke-width="8" fill="none" stroke-linejoin="round"/>';
  if (!o.noshelf) [['#FFD23F', 60], ['#FF8A4D', 150], ['#9BE7FF', 240]].forEach((j, i) => { const h = [84, 100, 76][i], y = 800 - h; s += '<rect x="' + j[1] + '" y="' + (y + h * .38) + '" width="62" height="' + (h * .62 - 4) + '" rx="8" fill="' + j[0] + '" opacity=".8"/><rect x="' + j[1] + '" y="' + y + '" width="62" height="' + h + '" rx="12" fill="rgba(255,255,255,.1)" stroke="#F4C6E4" stroke-width="5"/><rect x="' + (j[1] - 4) + '" y="' + (y - 12) + '" width="70" height="16" rx="6" fill="#EAD9CC" stroke="#0B1020" stroke-width="4"/>'; });
  // Unterschraenke und Arbeitsplatte
  s += '<rect x="-20" y="' + (T + 38) + '" width="1120" height="' + (1548 - T - 38) + '" fill="#6A2848" stroke="#0B1020" stroke-width="6"/><path d="M290 ' + (T + 40) + ' V1546 M560 ' + (T + 40) + ' V1546 M830 ' + (T + 40) + ' V1546" stroke="#0B1020" stroke-width="6"/>';
  [145, 425, 695, 955].forEach(x => { s += '<rect x="' + (x - 46) + '" y="' + (T + 74) + '" width="92" height="14" rx="7" fill="#EAD9CC" opacity=".9"/>'; });
  s += '<rect x="-20" y="' + T + '" width="1120" height="42" rx="8" fill="#EAD9CC" stroke="#0B1020" stroke-width="6"/>';
  // Kraeutertopf: Blaetter wiegen sich leicht
  for (let i = 0; i < 5; i++) { const a = -64 + i * 32 + 3 * Math.sin(t * .9 + i); s += '<path transform="translate(60 ' + (T - 56) + ') rotate(' + n9(a) + ')" d="M0 0 Q-20 -52 0 -104 Q20 -52 0 0 Z" fill="' + (i % 2 ? '#2ECC71' : '#27A85E') + '" stroke="#0B1020" stroke-width="4"/>'; }
  s += '<path d="M24 ' + T + ' L16 ' + (T - 60) + ' H104 L96 ' + T + ' Z" fill="#B5533C" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/>';
  // Wasserkocher: Dampf steigt auf
  for (let i = 0; i < 4; i++) { const c = (t * .28 + i / 4) % 1; s += '<circle cx="' + n9(952 - 26 * c + 10 * Math.sin(t * 1.2 + i * 2)) + '" cy="' + n9(T - 128 - 170 * c) + '" r="' + n9(10 + 22 * c) + '" fill="#F4E6F2" opacity="' + (.28 * (1 - c)).toFixed(2) + '"/>'; }
  s += '<path d="M962 ' + (T - 92) + ' l-26 -22 v16 l22 22 Z" fill="#C9CFDD" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><rect x="958" y="' + (T - 112) + '" width="100" height="112" rx="22" fill="#C9CFDD" stroke="#0B1020" stroke-width="6"/><rect x="972" y="' + (T - 126) + '" width="72" height="18" rx="8" fill="#8E97A6" stroke="#0B1020" stroke-width="5"/><rect x="974" y="' + (T - 60) + '" width="14" height="40" rx="7" fill="#7FD3FF" stroke="#0B1020" stroke-width="3"/><rect x="950" y="' + (T - 8) + '" width="116" height="12" rx="5" fill="#3A1E2E"/>';
  // Schneidebrett
  s += '<rect x="430" y="' + (T - 24) + '" width="480" height="27" rx="10" fill="#C98A4B" stroke="#0B1020" stroke-width="6"/><path d="M462 ' + (T - 11) + ' H870" stroke="#8A5A2A" stroke-width="3" opacity=".5"/>';
  return s; }

// ---------- Einstieg: Schalti will hineinbeissen, die Zwiebel wehrt sich ----------
const UP9 = [450, CY9];
function gag9(e, t) {
  if (e < .22) return { f: UP9, s: S9, r: lerp(8, 27, e / .22), mood: 'shock', nospin: 1 };
  if (e < .5) { const k = (e - .22) / .28; return { f: [UP9[0] - 12 * k, CY9], s: S9, r: lerp(27, 5, k) + 3 * Math.sin(t * 50) * k, mood: 'shock', nospin: 1 }; }
  if (e < 1.05) { const k = (e - .5) / .55; return { f: [lerp(UP9[0] - 12, 220, k), CY9 + (1537 - CY9) * k * k - 70 * Math.sin(Math.PI * k)], s: lerp(S9, 1, k), r: -360 * ease(k), mood: 'cry', cry: cl(k * 2), nospin: 1 }; }
  const d = cl(1 - (e - 1.05) / .4); return { f: [220 + 5 * Math.sin(t * 44) * d, 1537], s: 1, r: 5 * Math.sin(t * 17), mood: 'cry', cry: 1, nospin: 1 }; }
WORLD.c9hook_3 = function (sc, ev, t, lt) {
  const e = ev.gas, hit = e !== undefined && e >= .5 ? e - .5 : undefined, sh = shake7(hit, t), OX = 660;
  const sw = e !== undefined && e > .24 && e < .5 ? (e - .24) / .26 : 0;
  let s = kitchen9(t), g = '';
  s += onion9(OX + 5 * Math.sin(t * 70) * sw, OY9, R9 * (1 + .08 * sw), { bite: e !== undefined && e > .22 });
  if (e !== undefined && e > .22 && e < .5) for (let i = 0; i < 3; i++) g += '<path d="M' + n9(560 - 16 * i) + ' ' + n9(1000 + 26 * i) + ' l-24 -8" stroke="#F7EEDC" stroke-width="7" stroke-linecap="round" opacity="' + (1 - sw).toFixed(2) + '"/>';
  if (hit !== undefined) { const m = gag9(e, t), hx = m.f[0] + 55, hy = m.f[1] - 118, k = cl(hit / .35), fade = 1 - cl((hit - 1.7) / .7), cx = lerp(590, hx, k), cy = lerp(1040, hy, k);
    g += gas9(cx, cy, 70 + 190 * ease(cl(hit / .4)), t, .95 * fade, 1) + gas9(cx + 60 * Math.sin(t * 1.4), cy - 90, 60 + 80 * ease(cl(hit / .5)), t, .7 * fade, 4);
    for (let i = 0; i < 3; i++) { const c = (t * .5 + i / 3) % 1; g += gas9(596 - 30 * c, 1030 - 130 * c, 22 + 26 * c, t, .6 * (1 - c) * fade, i + 9); }
    if (hit < .16) g += '<rect width="1080" height="1920" fill="#EDFFA6" opacity="' + (.55 * (1 - hit / .16)).toFixed(2) + '"/>';
    const pk = ease(cl((hit - .7) / 1.6)); if (pk > 0) { g += '<ellipse cx="250" cy="1572" rx="' + n9(280 * pk) + '" ry="' + n9(36 * pk) + '" fill="#7FD3FF" stroke="#DFF4FF" stroke-width="5" opacity=".85"/>'; for (let i = 0; i < 2; i++) { const c = (t * .7 + i / 2) % 1; g += '<ellipse cx="250" cy="1572" rx="' + n9(240 * pk * c) + '" ry="' + n9(30 * pk * c) + '" fill="none" stroke="#fff" stroke-width="4" opacity="' + (.6 * (1 - c)).toFixed(2) + '"/>'; } } }
  return W('<g transform="translate(' + n9(sh[0]) + ' ' + n9(sh[1]) + ')">' + s + g + '</g>' + shade3());
};
WMASC.c9hook_3 = (ev, t, lt, sc) => { if (ev.gas !== undefined) return gag9(ev.gas, t);
  const q = since3(sc, 3, lt); if (q < 0) return { f: HOME3, s: 1, r: 2 * Math.sin(t * 3), nospin: 1 };
  if (q < .6) return hop3(q / .6, HOME3, UP9, 150, 1, S9);
  return stay3([UP9[0], CY9 - 6 * Math.abs(Math.sin(t * 5))], S9, { r: 8 }); };

// ---------- Teil 1: ganze Zwiebel, dann der Blick in die Zelle ----------
const DOT9 = [[250, 800], [370, 770], [240, 920], [380, 900], [300, 1010]], ENZ9 = [[640, 840], [760, 830], [800, 930], [700, 960], [610, 940]];
function enz9(x, y, r, t, i) { const a = (18 + 26 * Math.abs(Math.sin(t * 7 + i * 1.7))) * Math.PI / 180;
  return '<g transform="translate(' + n9(x) + ' ' + n9(y) + ') scale(-1 1)"><path d="M0 0 L' + n9(r * Math.cos(a)) + ' ' + n9(r * Math.sin(a)) + ' A' + r + ' ' + r + ' 0 1 1 ' + n9(r * Math.cos(a)) + ' ' + n9(-r * Math.sin(a)) + ' Z" fill="#FF6BD6" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/><circle cx="' + n9(-r * .1) + '" cy="' + n9(-r * .5) + '" r="5" fill="#0B1020"/></g>'; }
function cell9(sc, ev, t, lt) { const z = ev.zwei, q = ev.schnitt, a = ev.act, cut = q !== undefined && q > .35, sh = shake7(cut && q < 1.1 ? q - .35 : undefined, t);
  let s = '<defs><radialGradient id="c9b" cx=".5" cy=".47" r=".8"><stop offset="0" stop-color="#4A2360"/><stop offset="1" stop-color="#14071F"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#c9b)"/><g transform="translate(' + n9(sh[0] * .5) + ' ' + n9(sh[1] * .5) + ')">';
  for (let r = -1; r <= 1; r++) for (let n = -1; n <= 1; n++) { const x0 = 150 + n * 800 + (r ? 400 : 0), y0 = 690 + r * 460, main = !r && !n; s += '<rect x="' + x0 + '" y="' + y0 + '" width="780" height="420" rx="64" fill="#F7EEDC" fill-opacity="' + (main ? .12 : .05) + '" stroke="#EBD9A8" stroke-width="' + (main ? 12 : 9) + '" opacity="' + (main ? 1 : .45) + '"/>'; }
  // Vakuole mit den Enzymen
  const mo = cut ? 1 - .75 * cl((q - .35) / .5) : 1;
  s += '<ellipse cx="705" cy="895" rx="190" ry="150" fill="#5CC8FF" opacity="' + (.22 * mo).toFixed(2) + '"/><ellipse cx="705" cy="895" rx="190" ry="150" fill="none" stroke="#9BE7FF" stroke-width="8" opacity="' + mo.toFixed(2) + '"' + (cut ? ' stroke-dasharray="38 30"' : '') + '/>';
  if (cut) s += '<path d="M650 692 L470 1108" stroke="#14071F" stroke-width="18" stroke-linecap="round"/><path d="M650 692 L470 1108" stroke="#FFD6F2" stroke-width="4" stroke-dasharray="14 18" opacity=".7"/>';
  // Schwefel-Stoff (gelb) und Enzyme (pink). Nach dem Schnitt wandern die Enzyme hinueber, beim letzten Satz bauen sie den Reizstoff
  DOT9.forEach((d, i) => { const jx = 7 * Math.sin(t * (1.6 + .3 * i) + i * 2), jy = 7 * Math.cos(t * (1.4 + .2 * i) + i);
    const mv = q === undefined ? 0 : ease(cl((q - .55 - i * .12) / 1.1)), hx = ENZ9[i][0] + 9 * Math.sin(t * 1.3 + i * 2), hy = ENZ9[i][1] + 9 * Math.cos(t * 1.1 + i);
    const k = a === undefined ? 0 : cl((a - i * .3) / .45), up = a === undefined ? 0 : ease(cl((a - i * .3 - .45) / 1.7));
    const dx = d[0] + jx * (1 - k), dy = d[1] + jy * (1 - k) - 430 * up, ex = lerp(hx, d[0] + 52 - 30 * Math.sin(Math.PI * k), mv), ey = lerp(hy, d[1], mv);
    if (k < 1) s += '<circle cx="' + n9(dx) + '" cy="' + n9(dy) + '" r="24" fill="' + lc('#FFD23F', LIME9, k) + '" stroke="#0B1020" stroke-width="5"/>' + (k < .5 ? svgT(dx, dy + 9, 'S', 26, '#0B1020') : '');
    else { s += gas9(dx + 16 * Math.sin(t * 3 + i), dy, 34, t, .9 * (1 - cl((up - .75) / .25)), i) + mol9(dx + 16 * Math.sin(t * 3 + i), dy, 15, 1 - cl((up - .75) / .25));
      for (let j = 0; j < 2; j++) { const c = (t * .4 + i * .21 + j * .5) % 1, gx = d[0] + 24 * Math.sin(t * 2 + i + j * 3), gy = d[1] - 36 - 300 * c, go = (1 - c) * cl(c * 6) * cl((a - i * .3 - .9) / .4); s += gas9(gx, gy, 30, t, .8 * go, i + j) + mol9(gx, gy, 13, go); } }
    s += enz9(ex, ey, 32, t, i); });
  if (z !== undefined && q === undefined) s += chip3(310, 1070, 'Schwefel-Stoff', 32, '#FFD23F', '#0B1020', (z - .9) / .3) + chip3(705, 1078, 'Enzyme', 32, '#FF6BD6', '#0B1020', (z - 1.5) / .3);
  if (a !== undefined) s += chip3(742, 1052, 'Reizstoff', 36, LIME9, '#0B1020', (a - .9) / .3);
  s += '</g>';
  // Klinge: faehrt schraeg durch die Zelle und wieder hinaus
  if (q !== undefined && q < 1.3) { const x0 = q < .5 ? lerp(1320, 560, ease(q / .5)) : lerp(560, 1500, ease((q - .62) / .6)); s += '<path d="M' + n9(x0 + 116) + ' 620 L' + n9(x0 + 1000) + ' 620 L' + n9(x0 + 1000) + ' 1180 L' + n9(x0 - 116) + ' 1180 Z" fill="#DDE5F0" stroke="#0B1020" stroke-width="6"/><path d="M' + n9(x0 + 116) + ' 620 L' + n9(x0 - 116) + ' 1180" stroke="#fff" stroke-width="9"/>'; }
  return s + '<path d="M-20 1556 Q540 1526 1100 1556 V1920 H-20 Z" fill="#2A123A" stroke="#EBD9A8" stroke-width="8"/><path d="M40 1600 Q540 1570 1040 1600" stroke="#fff" stroke-width="5" fill="none" opacity=".16"/>'; }
WORLD.c9zelle_3 = function (sc, ev, t, lt) { const z = ev.zwei;
  const A = z === undefined || z < .5 ? kitchen9(t) + onion9(660, OY9, R9) + okx1(806, 920, 44, true, (lt - 1.5) / .35) : '';
  const s = z === undefined ? A : wipe3(A, cell9(sc, ev, t, lt), z, .5, '#FFD6F2');
  return W(s + shade3(), slot(ev, [['ganz', 'Ganze Zwiebel: kein Reizstoff'], ['zwei', 'In der Zelle: sauber getrennt'], ['schnitt', 'Schnitt: alles vermischt sich', 'hot'], ['act', 'Enzyme bauen den Reizstoff', 'hot']]));
};
WMASC.c9zelle_3 = (ev, t, lt, sc) => { const up = [468, CY9], z = ev.zwei, q = ev.schnitt, a = ev.act;
  if (z !== undefined) { if (z < .5) return hop3(z / .5, up, HOME3, 120, S9, 1);
    if (a !== undefined) { const k = ease(cl(a / .4)); return { f: [220, 1537], s: 1, r: -7 * k + 2 * Math.sin(t * 3), nospin: 1 }; }
    if (q !== undefined && q > .3 && q < .85) { const k = (q - .3) / .55; return { f: [220, 1537 - 46 * Math.sin(Math.PI * k)], s: 1, r: 8 * Math.sin(Math.PI * k), nospin: 1 }; }
    return BIG3(); }
  const u = lt - .7; if (u < 0) return BIG3(); if (u < .6) return hop3(u / .6, HOME3, up, 150, 1, S9);
  return stay3(up, S9, { r: 12 + 2 * Math.sin(t * 3) }); };

// ---------- Teil 2: der Reizstoff zieht zu Schaltis Auge, die Lupe zeigt Hornhaut und Nerven ----------
const SIT9 = [250, CY9], EYE9 = [300, CY9 - 107], LUP9 = [550, 872];
function lupe9(n, al, a, t, kI) { const P = [[-100, -118], [-118, -42], [-120, 34], [-106, 108]];
  let c = '<rect x="-210" y="-210" width="420" height="420" fill="#1B0C2C"/><path d="M20 -220 Q-20 0 20 220 H220 V-220 Z" fill="#2A1640"/><path d="M-100 -220 Q-140 0 -100 220 L20 220 Q-20 0 20 -220 Z" fill="#FFD9E8" fill-opacity=".3" stroke="#FFB8D6" stroke-width="5"/>';
  c += '<path d="M-100 -220 Q-140 0 -100 220" stroke="#7FD3FF" stroke-width="' + (a === undefined ? 14 : 14 + 26 * cl(a / .5)) + '" fill="none" opacity=".85"/>';
  c += '<path d="M210 62 C140 62 70 22 0 10" stroke="#FFD23F" stroke-width="11" fill="none" stroke-linecap="round"/>';
  P.forEach((p, i) => { const cy = [-60, -20, 26, 72][i]; c += '<path d="M0 10 Q-54 ' + cy + ' ' + p[0] + ' ' + p[1] + '" stroke="#FFD23F" stroke-width="7" fill="none" stroke-linecap="round"/>'; });
  P.forEach((p, i) => { const arr = .3 + i * .22, k = ease(cl((n - arr + .3) / .45)), on = n > arr + .12, w = a === undefined ? 0 : ease(cl((a - .35 - i * .1) / .8));
    if (on && w < .4) c += spark3(p[0], p[1], 30 * (.6 + .4 * Math.abs(Math.sin(t * 13 + i))), t, '#FFE14D', .95);
    c += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="10" fill="' + (on && w < .4 ? '#FF5A3D' : '#FFD23F') + '" stroke="#0B1020" stroke-width="3"/>';
    c += gas9(lerp(-250, p[0] - 30, k), p[1] + 6 * Math.sin(t * 3 + i) + 420 * w, 30, t, .9 * (1 - w), i + 2) + mol9(lerp(-250, p[0] - 30, k), p[1] + 6 * Math.sin(t * 3 + i) + 420 * w, 14, 1 - w); });
  if (al !== undefined && (a === undefined || a < 1.2)) for (let j = 0; j < 3; j++) { const u = (t * 1.5 + j / 3) % 1, x = lerp(0, 210, u), y = lerp(10, 62, u * u); c += '<circle cx="' + n9(x) + '" cy="' + n9(y) + '" r="13" fill="#FF5A3D" stroke="#0B1020" stroke-width="3"/>'; }
  if (a !== undefined) for (let i = 0; i < 7; i++) { const y = -230 + ((t * 320 + i * 66) % 460), x = -100 - 20 * (1 - (y / 220) * (y / 220)) - 6; c += '<ellipse cx="' + n9(x) + '" cy="' + n9(y) + '" rx="13" ry="19" fill="#BFEAFF" stroke="#0B1020" stroke-width="3" opacity="' + cl(a / .4).toFixed(2) + '"/>'; }
  c += svgT(-36, 168, 'Hornhaut', 29, '#FFE3EE') + svgT(112, 118, 'Nerv', 30, '#FFD23F');
  return '<g transform="translate(' + LUP9[0] + ' ' + LUP9[1] + ') scale(' + kI.toFixed(3) + ')"><clipPath id="c9i"><circle r="200"/></clipPath><circle r="213" fill="#0B1020"/><g clip-path="url(#c9i)">' + c + '</g><circle r="200" fill="none" stroke="#fff" stroke-width="10"/></g>'; }
WORLD.c9auge_3 = function (sc, ev, t, lt) { const n = ev.nerv, al = ev.alarm, a = ev.act, L3 = LD9(sc, 3), wash = a === undefined ? 0 : cl((a - (L3 - 1.1)) / .4);
  let s = kitchen9(t) + half9(706, 1030, 74, -14) + half9(862, 1030, 74, 14);
  for (let i = 0; i < 4; i++) { const c = (t * .6 + i / 4) % 1, x = 700 + i * 56; s += '<path d="M' + x + ' ' + n9(948 - 80 * c) + ' q16 -18 0 -36 q-16 -18 0 -36" stroke="' + LIME9 + '" stroke-width="8" fill="none" stroke-linecap="round" opacity="' + (.8 * (1 - c) * cl((lt - .3) / .4)).toFixed(2) + '"/>'; }
  // Strom aus Reizstoff: vom Brett im Bogen zu Schaltis Augen
  const front = cl((lt - .7) / 1.7), N = 9; for (let i = 0; i < N; i++) { const c = (t * .3 + i / N) % 1; if (front < 1 && c > front) continue; const u = 1 - c, x = u * u * 784 + 2 * u * c * 540 + c * c * (EYE9[0] + 16), y = u * u * 940 + 2 * u * c * 720 + c * c * EYE9[1];
    s += gas9(x, y, 30 + 8 * Math.sin(t * 2 + i), t, .85 * cl(c * 8) * cl((1 - c) * 6) * (1 - wash), i) + mol9(x, y, 11, cl(c * 8) * cl((1 - c) * 6) * (1 - wash)); }
  if (n !== undefined) { const kI = back(cl(n / .35)) * (a === undefined ? 1 : 1 - ease(cl((a - (L3 - 1.3)) / .3)));
    if (kI > .02) { s += '<path d="M' + (EYE9[0] + 22) + ' ' + EYE9[1] + ' L' + (LUP9[0] - 196 * kI) + ' ' + (LUP9[1] - 40 * kI) + ' M' + (EYE9[0] + 22) + ' ' + EYE9[1] + ' L' + (LUP9[0] - 96 * kI) + ' ' + (LUP9[1] + 176 * kI) + '" stroke="#fff" stroke-width="5" opacity="' + (.75 * cl(kI)).toFixed(2) + '"/>';
      if (al !== undefined) { const k = cl(al / .3), hot = al > .45 && Math.floor(t * 6) % 2 === 0; s += '<path d="M748 934 C850 920 890 840 858 778" stroke="#FFD23F" stroke-width="10" fill="none" stroke-linecap="round" opacity="' + (k * cl(kI)).toFixed(2) + '"/>';
        if (a === undefined || a < 1.2) for (let j = 0; j < 2; j++) { const u = (t * 1.5 + j / 2) % 1; s += '<circle cx="' + n9(lerp(752, 860, u) + 40 * Math.sin(Math.PI * u)) + '" cy="' + n9(lerp(932, 782, u) + 10 * Math.sin(Math.PI * u)) + '" r="12" fill="#FF5A3D" stroke="#0B1020" stroke-width="3" opacity="' + cl(kI).toFixed(2) + '"/>'; }
        s += '<g transform="translate(' + n9(850 + (hot ? 4 * Math.sin(t * 60) : 0)) + ' 716) scale(' + (back(k) * cl(kI)).toFixed(3) + ')"><circle r="58" fill="' + (al > .45 && (a === undefined || a < 1.2) ? '#FF5A5A' : '#F4F6FB') + '" stroke="#0B1020" stroke-width="6"/><text y="24" text-anchor="middle" font-size="66" font-family="Noto Color Emoji">🧠</text></g>'; }
      s += lupe9(n, al, a, t, kI); } }
  return W(s + shade3(), slot(ev, [['steigt', 'Verdunstet sofort, steigt auf'], ['nerv', 'Trifft Nerven in der Hornhaut', 'hot'], ['alarm', 'Meldung ans Gehirn: Alarm!'], ['act', 'Tränen spülen ihn raus', 'hot']]));
};
WMASC.c9auge_3 = (ev, t, lt, sc) => { const a = ev.act, L3 = LD9(sc, 3), u = lt - .4;
  if (u < 0) return BIG3(); if (u < .6) return hop3(u / .6, HOME3, SIT9, 150, 1, S9);
  if (a !== undefined && a > L3 - 1.1) { const k = cl((a - (L3 - 1.1)) / .3); return stay3([SIT9[0] + 3 * Math.sin(t * 40) * k, CY9], S9, { r: 4 * Math.sin(t * 17) * k, mood: 'cry', cry: k }); }
  if (ev.nerv !== undefined && ev.nerv > .4) return stay3([SIT9[0] + 2 * Math.sin(t * 38), CY9], S9, { r: -5 + 2 * Math.sin(t * 30), mood: a !== undefined ? 'shock' : undefined });
  return stay3(SIT9, S9, { r: 2 * Math.sin(t * 2.5) }); };

// ---------- Teil 3: ein Messer, erst stumpf, dann scharf ----------
WORLD.c9messer_3 = function (sc, ev, t, lt) { const q = ev.stumpf, p = ev.spritz, m = ev.mal, hk = ev.hack, a = ev.act, HC = .36, hN = hk === undefined ? 0 : Math.min(hk, LD9(sc, 3) - .4), hc = hN / HC, chops = Math.floor(hc), KX = 610, OX = 640, B0 = .15, burst = p !== undefined && p >= B0, tau = burst ? p - B0 : 0;
  const sq = q === undefined ? 0 : ease(cl((q - .6) / 1.0)) * (p !== undefined && !burst ? 1.12 : 1), sh = shake7(burst && tau < .7 ? tau : undefined, t);
  let s = kitchen9(t), g = '', ky, b = 1, gl = 0;
  if (!burst) { ky = q === undefined ? 770 : Math.max(lerp(770, 930, ease(cl(q / .55))), 1104 - 2.15 * R9 * (1 - .32 * sq) + 6); s += onion9(OX + (p !== undefined ? 4 * Math.sin(t * 60) : 0), OY9, R9, { sq: sq }); }
  else { const o = ease(cl(tau / .3)), kc = a === undefined ? 0 : cl((a - 1.25) / 1.3), LX = OX - 12 - 78 * o;
    ky = a === undefined ? (hk === undefined ? lerp(1000, 1100, cl(tau / .08)) : 1100 - 150 * Math.abs(Math.sin(Math.PI * hc))) : a < 1.1 ? lerp(1100, 860, ease(cl(a / .45))) : lerp(860, 1100, cl((a - 1.1) / 1.45));
    if (a !== undefined) { b = 1 - ease(cl((a - .35) / .5)); gl = cl((a - .35) / .55); }
    if (chops < 1) s += half9(OX + 12 + 78 * o, 1030, 74, 16 * o); else s += half9(OX + 90, 1030, 74, 12, { clip: 'L', dx: -8 }) + half9(OX + 90, 1030, 74, 20, { clip: 'R', dx: 12 });
    if (kc <= 0) s += half9(LX, 1030, 74, -16 * o); else s += half9(LX, 1030, 74, -16 - 7 * kc, { clip: 'L', dx: -16 * kc }) + half9(LX, 1030, 74, -16 + 5 * kc, { clip: 'R', dx: 10 * kc });
    // Stumpf: viele Troepfchen schiessen hoch, einige treffen Schalti
    if (a === undefined) { for (let i = 0; i < 40; i++) { const an = (-90 + (rnd(i + 3) - .5) * 84) * Math.PI / 180, v = 520 + 560 * rnd(i + 50), x = OX + Math.cos(an) * v * tau, y = 1000 + Math.sin(an) * v * tau + 760 * tau * tau; if (y < 1096) g += drop9(x, y, 6 + 6 * rnd(i + 20), 1); }
      for (let i = 0; i < 5; i++) { const c = cl((tau - .05 - i * .05) / .55), u = 1 - c; if (c > 0 && c < 1) g += drop9(u * u * OX + 2 * u * c * 470 + c * c * (EYE9[0] + 10), u * u * 1000 + 2 * u * c * 700 + c * c * EYE9[1], 10, 1); }
      for (let i = 0; i < 14; i++) { const c = (t * .5 + rnd(i + 80)) % 1, an = (-90 + (rnd(i + 90) - .5) * 70) * Math.PI / 180, d = 60 + 200 * c; g += drop9(OX + Math.cos(an) * d, 1010 + Math.sin(an) * d + 120 * c * c, 5 + 4 * rnd(i), .8 * (1 - c) * cl((tau - .5) / .4)); } }
    else if (kc > .15 && kc < .75) { const c = (kc - .15) / .6; g += drop9(LX - 8 - 16 * c, 960 - 46 * Math.sin(Math.PI * c), 6, 1) + drop9(LX + 18 + 20 * c, 964 - 30 * Math.sin(Math.PI * c), 5, 1); }
    if (hk !== undefined && a === undefined) for (let c = 1; c <= chops; c++) { const tc = hk - c * HC; if (tc < .9) for (let i = 0; i < 12; i++) { const an = (-90 + (rnd(i + c * 13) - .5) * 80) * Math.PI / 180, v = 420 + 460 * rnd(i + c * 7), y = 1010 + Math.sin(an) * v * tc + 760 * tc * tc; if (y < 1096) g += drop9(OX + 70 + Math.cos(an) * v * tc, y, 5 + 5 * rnd(i + c), 1); } }
    if (m !== undefined && hk === undefined && a === undefined) g += chip3(600, 776, 'bis zu 40 ×', 66, '#FFD23F', '#0B1020', m / .3) + chip3(600, 868, 'mehr Tröpfchen', 34, '#0B1020', '#fff', (m - .35) / .3);
    if (a !== undefined) g += okx1(826, 800, 46, true, (a - 2.5) / .3); }
  s += knife9(KX, ky, 0, b, gl);
  if (q !== undefined) s += b > .5 ? chip3(KX - 10, ky - 122, 'stumpf', 34, '#8E97A6', '#0B1020', (q - .25) / .3) : chip3(KX - 10, ky - 122, 'scharf', 34, '#FF6BD6', '#0B1020', (a - .6) / .3);
  return W('<g transform="translate(' + n9(sh[0] * .6) + ' ' + n9(sh[1] * .6) + ')">' + s + g + '</g>' + shade3(), slot(ev, [['stumpf', 'Stumpfes Messer quetscht'], ['spritz', 'Tröpfchen mit Reizstoff spritzen hoch', 'hot'], ['mal', 'Bis zu 40 Mal mehr Tröpfchen', 'hot'], ['hack', 'Schnell hacken: noch mehr'], ['act', 'Scharf und langsam schneiden']]));
};
WMASC.c9messer_3 = (ev, t, lt, sc) => { const p = ev.spritz, a = ev.act, u = lt - .4;
  if (u < 0) return BIG3(); if (u < .6) return hop3(u / .6, HOME3, SIT9, 150, 1, S9);
  if (a !== undefined) { const k = 1 - cl(a / .5); return stay3(SIT9, S9, { r: 2 * Math.sin(t * 2.5), mood: k > 0 ? 'cry' : undefined, cry: .7 * k }); }
  if (p !== undefined) { const k = ev.mal !== undefined ? 1 : cl((p - (LD9(sc, 1) - 1.2)) / .3), fl = p > .6 && p < 1.15 ? 1 : 0;
    return stay3([SIT9[0] + 6 * Math.sin(t * 45) * fl + 3 * Math.sin(t * 40) * k, CY9], S9, { r: -9 * fl + 4 * Math.sin(t * 17) * k, mood: k > 0 ? 'cry' : undefined, cry: k * (ev.mal !== undefined ? .7 : 1) }); }
  return stay3(SIT9, S9, { r: 2 * Math.sin(t * 2.5) }); };

// ---------- Schluss: sauber geschnitten, das scharfe Messer liegt neben dem Brett ----------
WORLD.c9outro_3 = function (sc, ev, t) { return W(kitchen9(t, { noshelf: 1 }) + '<g transform="translate(236 1127) scale(.62)">' + knife9(0, 0, 0, 0, 0) + '</g>' + half9(590, 1030, 74, -22, { clip: 'L', dx: -16 }) + half9(590, 1030, 74, -10, { clip: 'R', dx: 10 }) + half9(790, 1030, 74, 16) + shade3()); };
WMASC.c9outro_3 = ev => ev.save !== undefined ? { f: HOME3, s: 1 } : BIG3();

// ---------- Version 3.0: Kamera und Farbstimmung um jede Welt ----------
['c9hook_3', 'c9zelle_3', 'c9auge_3', 'c9messer_3', 'c9outro_3'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#FF6BD6'); });
