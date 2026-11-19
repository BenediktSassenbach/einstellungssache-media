// P008 "Warum ist dein Akku bei Kaelte leer?" im Skript 4 (19.11.2026, Stand 2).
// Ort eigens fuer dieses Video: Skipiste mit Sessellift in der Abenddaemmerung (Alpengluehen, Skihuette). Das Handy steckt vorne rechts im Schnee, Schalti kann es anfassen.
// Wissenschaftsmodus nur in Teil 1 fuer den Blick in den Akku (Ionen, Honig). Teil 2 und 3 normal am Ort mit Schalti und dem Handy.
// Zum Loeschen: diese Datei und videos/P008V4.
const PX8 = 800, PY8 = 1450, SP8 = [560, 1537], S8 = .86;
function ski8(t) { const hz = 1110;
  let s = '<defs><linearGradient id="sk8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A1038"/><stop offset=".42" stop-color="#26307A"/><stop offset=".72" stop-color="#7A62A8"/><stop offset="1" stop-color="#F3A47E"/></linearGradient><linearGradient id="sk8p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCE6FB"/><stop offset="1" stop-color="#8195D6"/></linearGradient><linearGradient id="sk8f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9F0FF"/><stop offset="1" stop-color="#9DB0E6"/></linearGradient></defs><rect width="1080" height="' + hz + '" fill="url(#sk8)"/>';
  for (let i = 0; i < 34; i++) { const y = rnd(i + 300) * 520; s += '<circle cx="' + (rnd(i + 310) * 1080).toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (1 + 2 * rnd(i + 320)).toFixed(1) + '" fill="#fff" opacity="' + ((.25 + .45 * Math.abs(Math.sin(t * (1 + rnd(i + 330)) + i))) * (1 - y / 600)).toFixed(2) + '"/>'; }
  // Gipfel mit Alpengluehen
  s += '<path d="M-20 1110 L120 860 L210 930 L330 770 L470 940 L600 840 L760 700 L900 880 L1000 800 L1100 900 V1110 Z" fill="#3A3C86"/>';
  s += '<path d="M330 770 L470 940 L420 945 L360 860 Z M760 700 L900 880 L840 870 L790 790 Z M120 860 L210 930 L170 930 Z M1000 800 L1100 900 L1050 890 Z" fill="#F6A98A" opacity=".85"/>';
  s += '<path d="M330 770 l-34 54 l22 -8 l12 18 l14 -22 l20 6 Z M760 700 l-42 64 l26 -10 l16 22 l14 -26 l26 10 Z M1000 800 l-26 40 l18 -6 l10 12 l12 -14 Z M120 860 l-24 40 l16 -6 l10 12 l10 -14 Z" fill="#FFE8F0"/>';
  s += '<path d="M-20 1110 L180 990 L380 1060 L560 960 L760 1050 L940 970 L1100 1040 V1110 Z" fill="#4D5BAE"/>';
  // Piste
  s += '<path d="M0 1200 Q380 1110 720 1040 T1080 930 V1920 H0 Z" fill="url(#sk8p)"/>';
  for (let i = 0; i < 4; i++) s += '<path d="M' + (980 - i * 40) + ' ' + (950 + i * 6) + ' q-140 60 -60 110 t-200 120 t-260 110" stroke="#FFFFFF" stroke-width="5" fill="none" opacity=".45"/>';
  // Sessellift von links unten nach rechts oben
  const A = [-30, 1170], B = [1110, 760], cab = (u, o) => [lerp(A[0], B[0], u), lerp(A[1], B[1], u) + o + 40 * Math.sin(Math.PI * u) * .3];
  [.27, .62].forEach(u => { const p = cab(u, 0); s += '<path d="M' + p[0] + ' ' + (p[1] - 6) + ' V' + (p[1] + 190) + '" stroke="#1E2350" stroke-width="16"/><path d="M' + (p[0] - 46) + ' ' + p[1] + ' h92" stroke="#1E2350" stroke-width="12" stroke-linecap="round"/>'; });
  [0, 26].forEach(o => { let d = ''; for (let k = 0; k <= 20; k++) { const p = cab(k / 20, o); d += (k ? 'L' : 'M') + p[0].toFixed(0) + ' ' + p[1].toFixed(0); } s += '<path d="' + d + '" stroke="#141838" stroke-width="4" fill="none"/>'; });
  for (let i = 0; i < 7; i++) { const up = i % 2 === 0, u = up ? (t * .02 + i / 7) % 1 : 1 - ((t * .02 + i / 7) % 1), p = cab(u, up ? 0 : 26); s += '<g transform="translate(' + p[0].toFixed(0) + ' ' + p[1].toFixed(0) + ')"><path d="M0 0 V54" stroke="#141838" stroke-width="5"/><path d="M-28 54 h56 v-26" stroke="#141838" stroke-width="8" fill="none" stroke-linecap="round"/></g>'; }
  // Skihuette mit warmem Licht
  s += '<circle cx="960" cy="1000" r="80" fill="#FFC27A" opacity="' + (.16 + .04 * Math.sin(t * 4)) + '"/><rect x="890" y="968" width="150" height="76" fill="#4A2E3E" stroke="#141838" stroke-width="4"/><path d="M874 972 L965 912 L1056 972 Z" fill="#F4F6FF" stroke="#141838" stroke-width="4"/><rect x="912" y="988" width="36" height="32" fill="#FFC27A"/><rect x="982" y="988" width="36" height="32" fill="#FFC27A"/>';
  // Tannen und Pistenstangen
  [[40, 1150, 110], [120, 1140, 80], [1010, 1080, 120], [1060, 1060, 90]].forEach(([x, y, h]) => { s += '<path d="M' + x + ' ' + (y - h) + ' l' + (h * .32) + ' ' + h + ' h' + (-h * .64) + ' Z" fill="#162A4A"/><path d="M' + x + ' ' + (y - h) + ' l' + (h * .14) + ' ' + (h * .42) + ' l' + (-h * .14) + ' ' + (-h * .1) + ' l' + (-h * .14) + ' ' + (h * .1) + ' Z" fill="#F4F6FF"/>'; });
  [[300, 1150], [520, 1100], [700, 1060]].forEach(([x, y]) => { s += '<path d="M' + x + ' ' + y + ' v-70" stroke="#2B62E0" stroke-width="9"/><path d="M' + x + ' ' + (y - 70) + ' v18" stroke="#F4F6FF" stroke-width="9"/>'; });
  // Vordergrund: Schneekante, auf der Schalti steht
  s += '<path d="M0 1545 Q520 1505 1080 1560 V1920 H0 Z" fill="url(#sk8f)" stroke="#FFFFFF" stroke-width="6"/><path d="M0 1650 Q520 1615 1080 1680 V1920 H0 Z" fill="#7C8FD0" opacity=".5"/>';
  return s; }
function bg8(sc, t, lt) { return fuse33(ski8(t) + wsnow5_3(t, .3), sc, t, lt); }
// Schneehaufen vor dem Handy, damit es im Schnee steckt
function mound8() { return '<path d="M670 1610 Q720 1545 800 1552 Q880 1540 935 1610 Z" fill="#EEF3FF" stroke="#FFFFFF" stroke-width="5"/>'; }
// Handy: o.pct, o.on, o.frost, o.warm, o.cam (Kamera-Ansicht), o.flash, o.ghost (Restladung im dunklen Handy), o.guard (Waechter), o.lever
function ph8(x, y, s, o, t) { o = o || {}; let g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
  const on = o.on === undefined ? 1 : o.on, pct = o.pct === undefined ? 40 : o.pct;
  if (o.warm > 0) g += '<circle r="270" fill="#FF8A4D" opacity="' + (.2 * o.warm) + '"/><circle r="180" fill="#FFB86B" opacity="' + (.18 * o.warm) + '"/>';
  g += phoneF(-100, -180, 200, 360, lc('#05070F', '#1B2748', on));
  if (o.cam > 0 && on > .05) { g += '<g opacity="' + (o.cam * on).toFixed(2) + '"><rect x="-84" y="-150" width="168" height="230" rx="12" fill="#3A3C86"/><path d="M-84 30 L-40 -40 L0 0 L40 -70 L84 10 V80 H-84 Z" fill="#F6A98A"/><path d="M-84 60 Q0 20 84 50 V80 H-84 Z" fill="#DCE6FB"/><circle cy="112" r="24" fill="#F4F6FB" stroke="#0B1020" stroke-width="5"/></g>'; }
  if (on > .05 && !(o.cam > .5)) { const col = pct <= 10 ? '#FF4D4D' : pct <= 20 ? '#FFD23F' : '#3DFF7A'; g += '<g opacity="' + on.toFixed(2) + '">' + batt(-58, -70, 104, 50, Math.max(.02, pct / 100), col) + svgT(0, 50, Math.round(pct) + ' %', 50, pct <= 0 ? '#FF4D4D' : '#F4F6FB') + '</g>'; }
  if (o.ghost > 0) g += '<g opacity="' + (.55 * o.ghost).toFixed(2) + '">' + batt(-58, -70, 104, 50, .4, '#3DFF7A') + '</g>';
  if (o.guard > 0) { const k = back(cl(o.guard)); g += '<g transform="translate(0 ' + (-10 + 30 * (1 - k)) + ') scale(' + k + ')"><path d="M0 -62 L54 -42 V6 Q54 50 0 74 Q-54 50 -54 6 V-42 Z" fill="#2B62C0" stroke="#F4F6FB" stroke-width="6"/><circle cx="-18" cy="-6" r="10" fill="#fff"/><circle cx="18" cy="-6" r="10" fill="#fff"/><circle cx="' + (-18 + 4 * (o.look || 0)) + '" cy="' + (-6 - 4 * (o.up || 0)) + '" r="5" fill="#0B1020"/><circle cx="' + (18 + 4 * (o.look || 0)) + '" cy="' + (-6 - 4 * (o.up || 0)) + '" r="5" fill="#0B1020"/><path d="M-50 -46 Q0 -86 50 -46 Z" fill="#0B1020"/><rect x="-14" y="22" width="28" height="12" rx="6" fill="#FFD23F"/></g>'; }
  if (o.lever !== undefined) { const a = -40 + 80 * cl(o.lever); g += '<g transform="translate(-118 20)"><rect x="-14" y="-40" width="28" height="80" rx="10" fill="#4A5A7A" stroke="#0B1020" stroke-width="4"/><path d="M0 0 L' + (60 * Math.sin(a * Math.PI / 180)).toFixed(1) + ' ' + (-60 * Math.cos(a * Math.PI / 180)).toFixed(1) + '" stroke="#F4F6FB" stroke-width="10" stroke-linecap="round"/><circle cx="' + (60 * Math.sin(a * Math.PI / 180)).toFixed(1) + '" cy="' + (-60 * Math.cos(a * Math.PI / 180)).toFixed(1) + '" r="14" fill="#FF4D4D"/></g>'; }
  if (o.flash > 0) g += '<rect x="-100" y="-180" width="200" height="360" rx="32" fill="#FFFFFF" opacity="' + o.flash.toFixed(2) + '"/>' + [0, 45, 90, 135, 180, 225, 270, 315].map(r => '<path d="M0 -200 V-' + (230 + 60 * o.flash).toFixed(0) + '" transform="rotate(' + r + ' 0 -150)" stroke="#FFF6B0" stroke-width="10" stroke-linecap="round" opacity="' + o.flash.toFixed(2) + '"/>').join('');
  if (o.frost > 0) { g += '<rect x="-100" y="-180" width="200" height="360" rx="32" fill="#DFF4FF" opacity="' + (.24 * o.frost) + '"/>';
    for (let i = 0; i < 14; i++) { const a = rnd(i + 40) * Math.PI * 2, r = 70 + 90 * rnd(i + 60), px = Math.max(-92, Math.min(92, Math.cos(a) * r * 1.1)), py = Math.max(-172, Math.min(130, Math.sin(a) * r * 1.9)), k = cl(o.frost * 1.4 - rnd(i + 80) * .4);
      if (k > 0) g += '<g transform="translate(' + px.toFixed(0) + ' ' + py.toFixed(0) + ') scale(' + (k * (.5 + .5 * rnd(i + 90))).toFixed(2) + ')">' + [0, 60, 120].map(r2 => '<path d="M0 -22 V22" transform="rotate(' + r2 + ')" stroke="#F4FBFF" stroke-width="5" stroke-linecap="round"/>').join('') + '</g>'; } }
  return g + '</g>'; }
const L8 = (sc, i) => sc.lines[i + 1] ? sc.lines[i + 1].start - sc.lines[i].start : 3;
function ice8(k) { if (k <= 0) return ''; const s = back(cl(k)); return '<g transform="translate(220 1540) scale(' + s + ') translate(-220 -1540)"><rect x="70" y="1250" width="300" height="300" rx="26" fill="#BFE6FF" opacity=".42" stroke="#F4FBFF" stroke-width="7"/><path d="M100 1290 l40 -20 M300 1300 l30 30 M120 1480 l50 30" stroke="#fff" stroke-width="6" opacity=".7"/>' + [95, 160, 250, 330].map((x, i) => '<path d="M' + x + ' 1252 l12 ' + (34 + 14 * (i % 2)) + ' l12 ' + (-34 - 14 * (i % 2)) + ' Z" fill="#DFF4FF"/>').join('') + '</g>'; }
const walk8 = (k, A, B, o) => Object.assign({ f: [lerp(A[0], B[0], ease(cl(k))), lerp(A[1], B[1], ease(cl(k)))], s: 1, nospin: 1, walk: k > 0 && k < 1, flip: B[0] < A[0] && k < 1 }, o || {});

// ---------- Einstieg: Selfie-Sucher. Schalti posiert vor dem Ausblick, Reif kriecht ins Bild, beim Ausloesen geht der Akku aus. Dann von aussen: Schalti im Eis, das Handy faellt in den Schnee ----------
const HAND8 = [340, 1468], STICK8 = [490, 1310];
function finder8(pct, frost, press, t) { let s = '';
  if (frost > 0) s += '<defs><radialGradient id="fr8" cx=".5" cy=".55" r=".75"><stop offset=".55" stop-color="#DFF4FF" stop-opacity="0"/><stop offset="1" stop-color="#DFF4FF" stop-opacity="' + (.75 * frost).toFixed(2) + '"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#fr8)"/>' +
    Array.from({ length: 22 }, (_, i) => { const side = i % 4, u = rnd(i + 500), k = cl(frost * 1.5 - rnd(i + 520) * .5); if (k <= 0) return ''; const x = side === 0 ? 60 + 40 * rnd(i) : side === 1 ? 1020 - 40 * rnd(i) : 60 + 960 * u, y = side < 2 ? 690 + 1110 * u : side === 2 ? 690 + 40 * rnd(i) : 1800 - 40 * rnd(i);
      return '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(' + (k * (1 + rnd(i + 540))).toFixed(2) + ')">' + [0, 60, 120].map(r => '<path d="M0 -26 V26" transform="rotate(' + r + ')" stroke="#F4FBFF" stroke-width="6" stroke-linecap="round"/>').join('') + '</g>'; }).join('');
  [[60, 680, 1, 1], [1020, 680, -1, 1], [60, 1800, 1, -1], [1020, 1800, -1, -1]].forEach(([x, y, a, b]) => { s += '<path d="M' + x + ' ' + (y + 70 * b) + ' V' + y + ' H' + (x + 70 * a) + '" stroke="#FFFFFF" stroke-width="8" fill="none" stroke-linecap="round" opacity=".9"/>'; });
  const low = pct <= 20, blink = low ? .55 + .45 * Math.sin(t * 10) : 1; s += '<g opacity="' + blink.toFixed(2) + '">' + batt(880, 705, 80, 38, Math.max(.05, pct / 100), low ? '#FF4D4D' : '#3DFF7A') + svgT(850, 735, Math.round(pct) + ' %', 32, low ? '#FF4D4D' : '#FFFFFF', 'end') + '</g>';
  const f = [HOME3[0], HOME3[1] - 120], fs = 92 + 6 * Math.sin(t * 3); s += [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => '<path d="M' + (f[0] + a * fs) + ' ' + (f[1] + b * fs - b * 26) + ' V' + (f[1] + b * fs) + ' H' + (f[0] + a * fs - a * 26) + '" stroke="#FFD23F" stroke-width="6" fill="none"/>').join('');
  const pr = press > 0 ? 1 - .15 * Math.sin(Math.PI * cl(press / .4)) : 1; s += '<g transform="translate(540 1720) scale(' + pr.toFixed(3) + ')"><circle r="58" fill="none" stroke="#FFFFFF" stroke-width="9"/><circle r="44" fill="#FFFFFF"/></g>' + svgT(540, 1640, 'SELFIE', 26, '#FFD23F');
  return s; }
function stick8(a, b, w0, w1) { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L; return '<path d="M' + (a[0] + nx * w0) + ' ' + (a[1] + ny * w0) + ' L' + (b[0] + nx * w1) + ' ' + (b[1] + ny * w1) + ' L' + (b[0] - nx * w1) + ' ' + (b[1] - ny * w1) + ' L' + (a[0] - nx * w0) + ' ' + (a[1] - ny * w0) + ' Z" fill="#2B2F4A" stroke="#0B1020" stroke-width="3"/>'; }
WORLD.h7p8_4 = function (sc, ev, t, lt) { const fr = ev.frost, a = ev.aus, hit = a !== undefined ? a - .5 : undefined, sh = shake7(hit !== undefined && hit >= 0 ? hit : undefined, t);
  const frost = fr === undefined ? 0 : cl(fr / 2.4), pct = fr === undefined ? 40 : Math.max(12, 40 - 28 * cl(fr / 2.4));
  let s = bg8(sc, t, lt);
  if (hit === undefined || hit < 0) { // Sucher: der Zuschauer ist die Kamera am Selfiestick
    s += stick8(HAND8, [780, 1960], 9, 34) + finder8(pct, frost, a === undefined ? 0 : a, t);
    if (a !== undefined) s += '<rect width="1080" height="1920" fill="#FFFFFF" opacity="' + (.25 * Math.sin(Math.PI * cl(a / .5))).toFixed(2) + '"/>';
    return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + shade3()); }
  if (hit < .55) { const k = hit < .45 ? 1 : 1 - (hit - .45) / .1; s += '<rect width="1080" height="1920" fill="#000" opacity="' + k.toFixed(2) + '"/><g opacity="' + (k * (.4 + .6 * Math.abs(Math.sin(hit * 14)))).toFixed(2) + '"><rect x="440" y="900" width="180" height="90" rx="14" fill="none" stroke="#FF4D4D" stroke-width="10"/><rect x="620" y="925" width="16" height="40" rx="4" fill="#FF4D4D"/><rect x="456" y="916" width="18" height="58" rx="4" fill="#FF4D4D"/></g>'; return W(s + shade3()); }
  // Von aussen (Ausraster): Schalti eingefroren, sprengt bei "Eben noch 40 Prozent!" das Eis, schuettelt bei "So ein Kack!" den Stick, das Handy fliegt in den Schnee
  const wu = ev.wut, ka = ev.kack, burst = wu === undefined ? 0 : cl((wu - .25) / .4);
  if (burst < 1) s += '<g opacity="' + (1 - burst).toFixed(2) + '">' + ice8(cl((hit - .55) / .3)) + '</g>';
  if (burst > 0 && burst < 1) for (let k = 0; k < 9; k++) { const a = -Math.PI * (.05 + .9 * k / 8), d = 60 + 380 * ease(burst); s += '<path d="M0 -26 L20 10 L-18 16 Z" transform="translate(' + (220 + Math.cos(a) * d).toFixed(0) + ' ' + (1420 + Math.sin(a) * d + 300 * burst * burst).toFixed(0) + ') rotate(' + (k * 47 + 400 * burst).toFixed(0) + ')" fill="#DFF4FF" stroke="#FFFFFF" stroke-width="3" opacity="' + (1 - burst).toFixed(2) + '"/>'; }
  const shk = ka === undefined ? 0 : Math.sin(Math.PI * cl(ka / 1.1)), tip = [STICK8[0] + 40 * Math.sin(ka === undefined ? 0 : ka * 9) * shk, STICK8[1] + 20 * Math.cos(ka === undefined ? 0 : ka * 9) * shk];
  const fall = ka === undefined ? 0 : ease(cl((ka - .55) / .6));
  s += stick8(HAND8, tip, 8, 6);
  if (fall >= 1) s += mound8();
  const phx = lerp(tip[0], PX8, fall), phy = lerp(tip[1], PY8, fall) - 260 * Math.sin(Math.PI * fall), phs = lerp(.3, S8, fall); s += ph8(phx, phy, phs, { on: 0, frost: 1 }, t);
  if (fall >= 1) { s += mound8(); const k = cl((ka - 1.15) / .4); s += [0, 1, 2, 3, 4].map(i => '<circle cx="' + (PX8 - 90 + 45 * i) + '" cy="' + (1580 - 60 * k * (1 - Math.abs(i - 2) / 3)) + '" r="' + (16 * (1 - k)) + '" fill="#FFFFFF"/>').join(''); }
  if (burst > 0 && burst < 1) s += '<circle cx="220" cy="1420" r="' + (80 + 260 * burst) + '" fill="none" stroke="#FF6B4D" stroke-width="' + (18 * (1 - burst)) + '" opacity="' + (1 - burst) + '"/>';
  return W('<g transform="translate(' + sh[0] + ' ' + sh[1] + ')">' + s + '</g>' + shade3()); };
WMASC.h7p8_4 = (ev, t) => { const a = ev.aus, hit = a !== undefined ? a - .5 : undefined, wu = ev.wut, ka = ev.kack;
  if (ka !== undefined) { const q = cl(ka / 1.2), st = Math.pow(Math.sin(Math.PI * 2 * q), 2); return { f: [HOME3[0], HOME3[1] - 34 * st * (q < 1 ? 1 : 0)], s: 1, nospin: 1, r: 7 * Math.sin(ka * 6) * (1 - cl((ka - 1.4) / .5)), mood: 'angry' }; }
  if (wu !== undefined) { const b = cl((wu - .25) / .4); return { f: HOME3, s: 1 + .08 * Math.sin(Math.PI * b), nospin: 1, r: 0, mood: b > 0 ? 'angry' : 'shock' }; }
  if (hit !== undefined && hit >= 0) { if (hit < .45) return { f: HOME3, s: .001, nospin: 1 }; return { f: HOME3, s: 1, nospin: 1, mood: 'shock' }; }
  if (a !== undefined) return { f: HOME3, s: 1, r: -6 * Math.sin(Math.PI * cl(a / .5)), nospin: 1, mood: 'wink' };
  if (ev.frost !== undefined) return { f: HOME3, s: 1, r: 4 * Math.sin(t * 6), nospin: 1, mood: 'cool' };
  return { f: HOME3, s: 1, r: 3 * Math.sin(t * 2), nospin: 1, mood: 'cool' }; };

// ---------- Teil 1: Die Energie ist noch da. Normal: Schalti klopft ans Handy. Ab "Schau in den Akku" Wissenschaftsmodus, Schalti springt hinein ----------
const BX0 = 110, BX1 = 900, BY0 = 720, BY1 = 1100, FX0 = BX0 + 210, FX1 = BX1 - 210;
function honey8(ev) { return ev.zaeh === undefined ? 0 : cl(ev.zaeh / 1.2); }
function cell8(t, ev) { const honey = honey8(ev), slow = 1 - .82 * honey, on = ease(cl(ev.innen / .5)), a = ev.act;
  let s = '<g opacity="' + on.toFixed(2) + '"><path d="M' + (PX8 - 60) + ' ' + (PY8 - 60) + ' L' + BX1 + ' ' + BY1 + ' M' + (PX8 + 60) + ' ' + (PY8 - 60) + ' L' + (BX1 + 30) + ' ' + (BY1 - 140) + '" stroke="#F4F6FB" stroke-width="4" stroke-dasharray="12 10" opacity=".7"/>';
  s += '<rect x="' + BX0 + '" y="' + BY0 + '" width="' + (BX1 - BX0) + '" height="' + (BY1 - BY0) + '" rx="36" fill="#0D1B3A" stroke="#F4F6FB" stroke-width="8"/><rect x="' + BX1 + '" y="860" width="30" height="110" rx="10" fill="#F4F6FB"/>';
  s += '<rect x="' + FX0 + '" y="' + (BY0 + 20) + '" width="' + (FX1 - FX0) + '" height="' + (BY1 - BY0 - 40) + '" rx="18" fill="' + lc('#1E5A8C', '#E8A23A', honey) + '" opacity="' + (.45 + .25 * honey) + '"/>';
  for (let i = 0; i < 6; i++) s += '<rect x="' + (BX0 + 40) + '" y="' + (BY0 + 40 + i * 54) + '" width="150" height="30" rx="8" fill="#4A5A7A"/>';
  for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) s += '<circle cx="' + (BX1 - 170 + c * 50) + '" cy="' + (BY0 + 55 + r * 56) + '" r="15" fill="#8A3B5A"/>';
  s += svgT(BX0 + 115, BY1 - 18, 'Minus', 28, '#AEB9D6') + svgT(BX1 - 120, BY1 - 18, 'Plus', 28, '#AEB9D6') + svgT((BX0 + BX1) / 2, BY0 + 52, honey > .5 ? 'zäh wie Honig' : 'Flüssigkeit', 30, honey > .5 ? '#FFD27A' : '#B8F3FF');
  for (let i = 0; i < 7; i++) { const sp = (.32 + .1 * rnd(i + 5)) * slow, c = (t * sp + rnd(i + 11)) % 1, x = lerp(FX0 + 20, FX1 - 20, c), y = BY0 + 100 + (i * 41) % (BY1 - BY0 - 220) + 14 * Math.sin(t * 2 * slow + i);
    s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="17" fill="#FFD23F" stroke="#0B1020" stroke-width="4"/><text x="' + x.toFixed(0) + '" y="' + (y + 8).toFixed(0) + '" text-anchor="middle" font-size="22" font-weight="900" fill="#0B1020" font-family="Inter Display">+</text>'; }
  if (honey > 0) for (let i = 0; i < 6; i++) { const x = FX0 + 40 + i * 60, y0 = BY0 + 20; s += '<path d="M' + x + ' ' + y0 + ' q8 ' + (40 * honey) + ' 0 ' + (60 * honey + 10 * Math.sin(t + i)) + '" stroke="#FFD27A" stroke-width="12" stroke-linecap="round" fill="none" opacity="' + (.7 * honey) + '"/>'; }
  // Das Ion, das Schalti schiebt
  if (a !== undefined) { const x = lerp(FX0 + 150, FX0 + 230, cl(a / 3)); s += '<circle cx="' + x.toFixed(0) + '" cy="975" r="30" fill="#FFD23F" stroke="#0B1020" stroke-width="5"/><text x="' + x.toFixed(0) + '" y="988" text-anchor="middle" font-size="36" font-weight="900" fill="#0B1020" font-family="Inter Display">+</text>' + chip3((BX0 + BX1) / 2, BY0 - 10, 'nur noch wenige Ionen kommen an', 28, '#FFD27A', '#0B1020', (a - .4) / .3); }
  return s + '</g>'; }
WORLD.p8energie_4 = function (sc, ev, t, lt) { const v = ev.voll, inn = ev.innen; let s = bg8(sc, t, lt);
  const knock = v === undefined ? 0 : cl((v - .9) / .2), shake = v !== undefined && v > .9 && v < 1.8 ? 5 * Math.sin(v * 60) : 0;
  s += ph8(PX8 + shake, PY8, S8, { pct: 40, on: knock, frost: .8 * (1 - .5 * knock) }, t) + mound8();
  if (v !== undefined && v > .9 && v < 1.9) for (let j = 0; j < 2; j++) { const q = ((v - .9) * 2.2 + j * .5) % 1; s += '<path d="M' + (PX8 - 115 - 40 * q) + ' ' + (PY8 - 40) + ' q-20 40 0 80" stroke="#F4F6FB" stroke-width="6" fill="none" opacity="' + (1 - q) + '"/>'; }
  if (v !== undefined && inn === undefined) s += chip3(PX8 - 250, 1000, 'Ladung: noch 40 % drin', 30, '#3DFF7A', '#0B1020', (v - 1.4) / .3);
  if (inn !== undefined) s += cell8(t, ev);
  return W(s + shade3(), slot(ev, [['voll', 'Die Energie ist nicht weg'], ['innen', 'Ionen wandern durch Flüssigkeit'], ['zaeh', 'Kälte: zäh wie Honig', 'hot'], ['act', 'Die Ionen kommen kaum durch', 'hot']])); };
WMASC.p8energie_4 = (ev, t, lt, sc) => { const v = ev.voll, inn = ev.innen, a = ev.act;
  if (inn === undefined) { if (v === undefined) return BIG3(); if (v < .85) return walk8(v / .8, HOME3, SP8, { mood: 'happy' }); return { f: SP8, s: 1, nospin: 1, r: v < 1.9 ? -10 * Math.pow(Math.sin((v - .9) * 7), 2) : 0, mood: 'happy' }; }
  if (inn < .7) return hop3(inn / .7, SP8, [FX0 + 60, 1010], 260, 1, .45, { mood: 'happy' });
  const honey = honey8(ev);
  if (a === undefined) { const sp = 1 - .85 * honey, q = ((inn - .7) * .35 * sp) % 2, x = lerp(FX0 + 60, FX1 - 60, q < 1 ? q : 2 - q); return { f: [x, 1010], s: .45, nospin: 1, walk: honey < .9, flip: q >= 1, r: honey > .5 ? 6 * Math.sin(t * 4) : 0, mood: honey > .5 ? 'shock' : 'happy' }; }
  const x = lerp(FX0 + 105, FX0 + 185, cl(a / 3));
  return { f: [x, 1010], s: .45, nospin: 1, r: 18 + 3 * Math.sin(t * 4), walk: 1, mood: 'shock' }; };

// ---------- Teil 2 (weiter im Wissenschaftsmodus): Stromkreis aus kaltem Akku, Spannungsanzeige, Schutzelektronik mit Schalter, Handy als Verbraucher ----------
const P1END8 = [FX0 + 185, 1010], LOAD8 = [900, 805], SW8 = [640, 770];
function gauge8(v) { const cx = 560, cy = 1060, r = 110, P = q => [cx + r * Math.cos(Math.PI * (1 - q)), cy - r * Math.sin(Math.PI * (1 - q))], g = .3, A = P(0), G = P(g), B = P(1);
  let s = '<path d="M' + A[0] + ' ' + cy + ' A' + r + ' ' + r + ' 0 0 1 ' + G[0].toFixed(1) + ' ' + G[1].toFixed(1) + '" stroke="#FF4D4D" stroke-width="26" fill="none"/><path d="M' + G[0].toFixed(1) + ' ' + G[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + B[0] + ' ' + cy + '" stroke="#3DFF7A" stroke-width="26" fill="none" opacity=".85"/>';
  const T0 = [cx + (r - 30) * Math.cos(Math.PI * .7), cy - (r - 30) * Math.sin(Math.PI * .7)], T1 = [cx + (r + 26) * Math.cos(Math.PI * .7), cy - (r + 26) * Math.sin(Math.PI * .7)];
  s += '<path d="M' + T0[0].toFixed(1) + ' ' + T0[1].toFixed(1) + ' L' + T1[0].toFixed(1) + ' ' + T1[1].toFixed(1) + '" stroke="#F4F6FB" stroke-width="6" stroke-dasharray="6 5"/>';
  const N = [cx + (r - 14) * Math.cos(Math.PI * (1 - v)), cy - (r - 14) * Math.sin(Math.PI * (1 - v))];
  return s + '<path d="M' + cx + ' ' + cy + ' L' + N[0].toFixed(1) + ' ' + N[1].toFixed(1) + '" stroke="#F4F6FB" stroke-width="9" stroke-linecap="round"/><circle cx="' + cx + '" cy="' + cy + '" r="13" fill="#F4F6FB"/>' + svgT(cx, cy + 40, 'Spannung', 26, '#F4F6FB'); }
function sci8(t, ev, sc) { const la = ev.last, sch = ev.schutz, au = ev.aus2, a = ev.act;
  const press = la === undefined ? -1 : la - .85, drop = press < 0 ? 0 : ease(cl((press - .2) / 1.0));
  const open = au === undefined ? 0 : au < .6 ? ease(cl(au / .3)) * 0 + cl((au - .3) / .3) : au < 1.0 ? 1 : au < 1.9 ? 1 - .8 * ease(cl((au - 1.0) / .7)) : au < 2.1 ? .2 + .8 * back(cl((au - 1.9) / .2)) : 1;
  const flow = au === undefined || open < .15 ? (press < 0 ? .4 : 1.6) : 0, v = .8 - .65 * drop + .03 * Math.sin(t * 8) * (1 - drop) + (open > .15 && au !== undefined ? .05 * cl((au - .6) / 1) : 0);
  const on = ease(cl((sc.lines[0] ? 1 : 1)));
  // kalter Akku, klein, links
  let s = '<rect x="70" y="800" width="330" height="250" rx="26" fill="#0D1B3A" stroke="#F4F6FB" stroke-width="7"/><rect x="400" y="895" width="20" height="60" rx="6" fill="#F4F6FB"/>';
  s += '<rect x="170" y="815" width="130" height="220" rx="12" fill="#E8A23A" opacity=".7"/>';
  for (let i = 0; i < 4; i++) s += '<rect x="90" y="' + (830 + i * 50) + '" width="64" height="26" rx="6" fill="#4A5A7A"/>';
  for (let r2 = 0; r2 < 4; r2++) for (let c = 0; c < 2; c++) s += '<circle cx="' + (330 + c * 38) + '" cy="' + (842 + r2 * 52) + '" r="12" fill="#8A3B5A"/>';
  for (let i = 0; i < 5; i++) { const c = (t * .06 + rnd(i + 11)) % 1, x = lerp(185, 285, c), y = 840 + i * 42; s += '<circle cx="' + x.toFixed(0) + '" cy="' + y + '" r="12" fill="#FFD23F" stroke="#0B1020" stroke-width="3"/>'; }
  s += svgT(235, 1090, 'Akku, kalt', 24, '#FFD27A');
  // Leitungen
  const top = 'M420 925 H470 V770 H' + (SW8[0] - 30) + ' M' + (SW8[0] + 30) + ' 770 H800 V900 H845', back8 = 'M845 980 H815 V1112 H50 V925 H70';
  s += '<path d="' + top + '" stroke="#AEB9D6" stroke-width="10" fill="none"/><path d="' + back8 + '" stroke="#AEB9D6" stroke-width="10" fill="none"/>';
  if (flow > 0) s += '<path d="' + top + '" stroke="#FFE14D" stroke-width="10" fill="none" stroke-dasharray="14 26" stroke-dashoffset="' + (-t * 90 * flow).toFixed(0) + '"/><path d="' + back8 + '" stroke="#FFE14D" stroke-width="10" fill="none" stroke-dasharray="14 26" stroke-dashoffset="' + (-t * 90 * flow).toFixed(0) + '"/>';
  // Schalter: Kontakte und Hebel (offen dreht nach oben)
  const ang = -38 * open; s += '<circle cx="' + (SW8[0] - 30) + '" cy="770" r="10" fill="#F4F6FB"/><circle cx="' + (SW8[0] + 30) + '" cy="770" r="10" fill="#F4F6FB"/><path d="M' + (SW8[0] - 30) + ' 770 l60 0" transform="rotate(' + ang.toFixed(1) + ' ' + (SW8[0] - 30) + ' 770)" stroke="#F4F6FB" stroke-width="10" stroke-linecap="round"/>';
  // Schutzelektronik als Chip mit Auge unter dem Schalter
  const kS = sch === undefined ? .55 : 1; s += '<g opacity="' + kS + '"><rect x="' + (SW8[0] - 60) + '" y="815" width="120" height="66" rx="10" fill="#2B62C0" stroke="#F4F6FB" stroke-width="5"/>' + [0, 1, 2, 3].map(k => '<path d="M' + (SW8[0] - 45 + k * 30) + ' 881 v12 M' + (SW8[0] - 45 + k * 30) + ' 815 v-10" stroke="#F4F6FB" stroke-width="5"/>').join('');
  const lk = sch === undefined ? 0 : cl(sch / .4); s += '<circle cx="' + SW8[0] + '" cy="848" r="18" fill="#fff"/><circle cx="' + (SW8[0] - 8 * lk) + '" cy="' + (848 + 8 * lk) + '" r="9" fill="#0B1020"/></g>';
  s += gauge8(v);
  // Handy als Verbraucher
  const dark = au === undefined ? 0 : cl((au - .45) / .2), zero = a === undefined ? 0 : cl(a / .25), flash = press >= 0 ? Math.max(0, 1 - press / .5) : 0;
  s += '<rect x="845" y="' + LOAD8[1] + '" width="110" height="195" rx="18" fill="' + lc('#1B2748', '#05070F', zero > 0 ? 0 : dark) + '" stroke="#F4F6FB" stroke-width="6"/>';
  if (zero > 0) s += svgT(900, 920, '0 %', 40, '#FF4D4D'); else if (dark < 1) s += '<g opacity="' + (1 - dark) + '">' + svgT(900, 920, '40 %', 36, '#F4F6FB') + '</g>';
  if (flash > 0) s += '<rect x="845" y="805" width="110" height="195" rx="18" fill="#fff" opacity="' + flash.toFixed(2) + '"/>' + [0, 60, 120, 180, 240, 300].map(r2 => '<path d="M900 820 l0 ' + (-40 - 40 * flash).toFixed(0) + '" transform="rotate(' + r2 + ' 900 860)" stroke="#FFF6B0" stroke-width="8" stroke-linecap="round" opacity="' + flash.toFixed(2) + '"/>').join('');
  // Hinweise
  if (la !== undefined && sch === undefined) s += chip3(640, 722, 'viel Strom: Spannung fällt', 26, '#FFE14D', '#0B1020', (press - .5) / .3);
  if (sch !== undefined && au === undefined) s += chip3(640, 722, 'unter der Grenze: Akku leer?', 26, '#7FD3FF', '#0B1020', (sch - .6) / .3);
  if (au !== undefined) s += chip3(235, 760, 'Ladung noch drin', 26, '#3DFF7A', '#0B1020', (au - .9) / .3);
  return s; }
WORLD.p8spannung_4 = function (sc, ev, t, lt) { return W(bg8(sc, t, lt) + sci8(t, ev, sc) + shade3(), slot(ev, [['last', 'Viel Strom: Spannung bricht ein'], ['schutz', 'Schutzelektronik: Akku leer?'], ['aus2', 'Sie schaltet ab', 'hot'], ['act', 'Anzeige springt auf null', 'red']])); };
WMASC.p8spannung_4 = (ev, t, lt, sc) => { const la = ev.last, sch = ev.schutz, au = ev.aus2, a = ev.act, ON = [LOAD8[0], LOAD8[1] + 2], SWP = [SW8[0] + 10, 762], S = .42;
  if (a !== undefined) { const D = Math.max(2.4, L8(sc, 3)); if (a < D - .7) return { f: SWP, s: S, nospin: 1, r: -40 * ease(cl(a / .4)), mood: 'shock' }; return hop3((a - (D - .7)) / .6, SWP, SP8, 260, S, 1, { mood: 'happy' }); }
  if (au !== undefined) { if (au < .9) return { f: ON, s: S, nospin: 1, mood: 'shock' }; if (au < 1.45) return hop3((au - .9) / .55, ON, SWP, 120, S, S, { flip: true, mood: 'shock' });
    if (au < 1.9) return { f: SWP, s: S, nospin: 1, r: 22 * ease(cl((au - 1.45) / .3)), mood: 'shock' }; return { f: SWP, s: S, nospin: 1, r: 22 * (1 - ease(cl((au - 1.9) / .4))), mood: 'shock' }; }
  if (sch !== undefined) return { f: ON, s: S, nospin: 1, r: -10 * ease(cl(sch / .5)), mood: 'wink' };
  if (la === undefined) return { f: P1END8, s: .45, nospin: 1 };
  if (la < .6) return hop3(la / .6, P1END8, ON, 160, .45, S, { mood: 'happy' });
  if (la < 1.0) { const q = (la - .6) / .4; return { f: [ON[0], ON[1] - 40 * Math.sin(Math.PI * q)], s: S, nospin: 1, mood: 'happy' }; }
  return { f: ON, s: S, nospin: 1, mood: 'shock' }; };

// ---------- Teil 3 (normal): Schalti haucht das Handy warm, steckt es in die Jacke, laedt erst wenn es warm ist ----------
const POCK8 = [250, 1442];
WORLD.p8waerme_4 = function (sc, ev, t, lt) { const w = ev.warm, ta = ev.tasche, ko = ev.koerper, a = ev.act; let s = bg8(sc, t, lt);
  if (a !== undefined) { // Laden: eiskalt nein, warm ja. Schalti schiebt den Stecker los, prallt zurueck, dann klappt es
    const warmK = cl((a - 2.0) / .6), tip = PX8 - 95, plug = a < 1 ? lerp(470, tip, ease(cl((a - .2) / .7))) : a < 2.5 ? tip - 80 * ease(cl((a - 1) / .4)) : lerp(tip - 80, tip, ease(cl((a - 2.6) / .45)));
    s += ph8(PX8, PY8, S8, { pct: 40, on: warmK, frost: 1 - warmK, warm: warmK }, t) + mound8();
    s += '<rect x="330" y="1505" width="110" height="56" rx="12" fill="#2B2F4A" stroke="#0B1020" stroke-width="5"/><path d="M362 1533 h28" stroke="#3DFF7A" stroke-width="8"/><path d="M440 1533 Q' + ((440 + plug) / 2).toFixed(0) + ' 1600 ' + plug.toFixed(0) + ' 1505" stroke="#1B2748" stroke-width="12" fill="none"/><rect x="' + (plug - 10).toFixed(0) + '" y="1484" width="44" height="40" rx="8" fill="#2B2F4A" stroke="#0B1020" stroke-width="4"/><path d="M' + (plug + 34).toFixed(0) + ' 1496 h16 M' + (plug + 34).toFixed(0) + ' 1512 h16" stroke="#C9D4FF" stroke-width="6"/>';
    s += okx1(PX8 + 105, PY8 + 30, 58, false, a < 2.2 ? (a - .9) / .25 : 0) + okx1(PX8 + 105, PY8 + 30, 58, true, (a - 3.0) / .25);
    s += chip3(760, 1090, 'erst aufwärmen, dann laden', 28, '#3DFF7A', '#0B1020', (a - 2.2) / .3);
    return W(s + shade3(), slot(ev, [['warm', 'Wieder warm: Ladung ist zurück'], ['tasche', 'Ab in die Innentasche', 'hot'], ['koerper', 'Körperwärme hält ihn warm'], ['act', 'Eiskalt? Erst aufwärmen, dann laden', 'red']])); }
  const wk = w === undefined ? 0 : cl((w - .4) / 1.8), pct = Math.round(40 * cl((w - 1.2) / 1.2));
  if (ta === undefined) { s += ph8(PX8, PY8, S8, { pct, on: w === undefined ? 0 : cl((w - 1.0) / .3), frost: 1 - wk, warm: wk }, t) + mound8();
    if (w !== undefined && w < 2.6) for (let j = 0; j < 3; j++) { const q = ((w * .9 + j / 3) % 1); s += '<circle cx="' + lerp(SP8[0] + 80, PX8 - 90, q).toFixed(0) + '" cy="' + (1430 - 30 * Math.sin(q * 3)).toFixed(0) + '" r="' + (18 + 26 * q) + '" fill="#FFB86B" opacity="' + (.5 * (1 - q)) + '"/>'; } }
  else { const k = ease(cl((ta - .5) / .8)); s += mound8(); if (k < 1) s += ph8(lerp(PX8, POCK8[0], k), lerp(PY8, POCK8[1], k) - 140 * Math.sin(Math.PI * k), lerp(S8, .2, k), { pct: 40, warm: 1 - k }, t);
    s += '<circle cx="' + POCK8[0] + '" cy="' + POCK8[1] + '" r="' + (170 + 12 * Math.sin(t * 3)) + '" fill="#FF8A4D" opacity="' + (.15 * k) + '"/>';
    if (ko !== undefined) { const p = .5 + .5 * Math.sin(t * 4); s += '<circle cx="' + POCK8[0] + '" cy="' + POCK8[1] + '" r="' + (220 + 30 * p) + '" fill="none" stroke="#FFB86B" stroke-width="8" opacity="' + (.35 * cl(ko / .4)) + '"/>' + chip3(PX8 - 120, 1060, 'Körperwärme hält den Akku warm', 28, '#FFB86B', '#0B1020', (ko - .3) / .3); } }
  return W(s + shade3(), slot(ev, [['warm', 'Wieder warm: Ladung ist zurück'], ['tasche', 'Ab in die Innentasche', 'hot'], ['koerper', 'Körperwärme hält ihn warm'], ['act', 'Eiskalt? Erst aufwärmen, dann laden', 'red']])); };
WMASC.p8waerme_4 = (ev, t, lt, sc) => { const w = ev.warm, ta = ev.tasche, ko = ev.koerper, a = ev.act;
  if (a !== undefined) { if (a < .9) return { f: HOME3, s: 1, nospin: 1, r: 14 * Math.sin(Math.PI * cl((a - .1) / .5)), mood: 'happy' }; if (a < 2.6) return { f: HOME3, s: 1, nospin: 1, r: a < 1.5 ? -10 : 0, mood: 'shock' };
    if (a < 3.2) return { f: HOME3, s: 1, nospin: 1, r: 14 * Math.sin(Math.PI * cl((a - 2.6) / .4)), mood: 'happy' }; return hop3((a - 3.2) / .5, HOME3, HOME3, 70, 1, 1, { mood: 'happy' }); }
  if (ko !== undefined) return { f: HOME3, s: 1, nospin: 1, r: 3 * Math.sin(t * 5), mood: 'wink' };
  if (ta !== undefined) return ta < .6 ? walk8(ta / .55, SP8, HOME3, { mood: 'happy' }) : { f: HOME3, s: 1, nospin: 1, r: ta > .8 && ta < 1.3 ? -8 : 0, mood: 'happy' };
  if (w !== undefined) return { f: SP8, s: 1, nospin: 1, r: 10 + 3 * Math.sin(t * 6), mood: 'happy' };
  return { f: SP8, s: 1, nospin: 1 }; };

// ---------- Schluss ----------
WORLD.p8outro_4 = function (sc, ev, t, lt) { return W(bg8(sc, t, lt) + ph8(PX8, PY8, S8, { pct: 40, warm: .5 }, t) + mound8() + shade3()); };
['h7p8_4', 'p8energie_4', 'p8spannung_4', 'p8waerme_4', 'p8outro_4'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#5CE1FF'); });
