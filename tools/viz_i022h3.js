// I022H3 "Kann man dein iPhone finden, wenn es aus ist?" (Informatik, Hook-Pilot v3, 20.11.2026).
// Benedikt 20.11.2026 zu v2: zu wenig passiert, Handy winzig am Boden, billiger Hintergrund, zu viele Texte, immer nur die Lupe.
// v3: grosses, detailliertes iPhone als Hauptfigur, Nacht mit Bokeh, Regen und nasser Bank. Jeder Teil hat eine andere Animation:
// Einstieg Ausschalten + Kamerafahrt zurueck, Teil 1 Explosionsansicht + 24-h-Ring + Modellreihe,
// Teil 2 Kamera hoch ueber die Stadt (Iso-Ansicht) + Erdkugel, Teil 3 Verschluesselung (Zeichenblock, Schloss, Tresor, Schluessel), Verpixeln, echter Ausschalt-Bildschirm.
// Texte: pro Teil nur ein Etikett, keine Zusatz-Schilder.
var A3 = '#7C5CFF', B3 = '#5CB8FF', S3 = '#0B1020', GY3 = 1545, FX3 = 200, PI3c = [600, 905];

// ---------- Hintergrund 1: Nahaufnahme Bank, Stadt als Bokeh ----------
function bokeh3(t, o) { o = o || {}; let s = '<defs><linearGradient id="n3s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05071A"/><stop offset=".55" stop-color="#160F3A"/><stop offset="1" stop-color="#0A0C22"/></linearGradient><radialGradient id="n3b"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".55" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="n3l" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD9A0" stop-opacity=".55"/><stop offset="1" stop-color="#FFD9A0" stop-opacity="0"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#n3s)"/>';
  // unscharfe Hochhaeuser
  for (let i = 0; i < 8; i++) { const x = i * 145 - 30 + 10 * Math.sin(t * .1 + i), h = 260 + rnd(i + 40) * 320; s += '<rect x="' + x.toFixed(0) + '" y="' + (1080 - h).toFixed(0) + '" width="120" height="' + h.toFixed(0) + '" rx="10" fill="#1D1850" opacity=".55"/>'; }
  // Bokeh-Lichter
  const C = ['#FFB86A', '#FF4D9A', '#5CB8FF', '#7C5CFF', '#FFE14D', '#FF8A5C'];
  for (let i = 0; i < 34; i++) { const x = rnd(i + 3) * 1080 + 26 * Math.sin(t * .25 + i), y = 560 + rnd(i + 17) * 560 + 10 * Math.cos(t * .2 + i), r = 22 + rnd(i + 31) * 62, f = .14 + .22 * rnd(i + 5) + .06 * Math.sin(t * .9 + i * 2);
    let col = C[i % 6], ff = f; if (o.ring) { const d = Math.hypot(x - o.ring[0], y - o.ring[1]); for (let j = 0; j < 3; j++) { const rr = o.ring[2] + (o.ring[3] - o.ring[2]) * (((t * o.ring[4]) + j / 3) % 1); if (Math.abs(d - rr) < 50) { col = '#9FE0FF'; ff = Math.min(.8, f + .4 * o.ring[5]); } } }
    s += '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + r.toFixed(0) + '" fill="' + col + '" opacity="' + ff.toFixed(2) + '"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="' + (r * .7).toFixed(0) + '" fill="url(#n3b)" opacity="' + (f * .5).toFixed(2) + '"/>'; }
  // Strassenlaterne als grosser Lichtfleck links oben
  s += '<circle cx="120" cy="640" r="330" fill="url(#n3l)"/>';
  // Leute im Hintergrund (unscharf), Handys leuchten auf
  if (o.ppl) for (let i = 0; i < 3; i++) { const dir = i % 2 ? -1 : 1, x = ((dir > 0 ? t * 46 + i * 420 : 2400 - t * 40 + i * 360) % 1400 + 1400) % 1400 - 160, b = Math.abs(Math.sin(t * 5 + i)) * 5, y = 1040 - b, g = o.ppl[i] || 0;
    s += '<g opacity=".7"><rect x="' + (x - 26).toFixed(0) + '" y="' + (y - 190) + '" width="52" height="130" rx="24" fill="#2A2266"/><circle cx="' + x.toFixed(0) + '" cy="' + (y - 220) + '" r="28" fill="#2A2266"/><path d="M' + (x - 12).toFixed(0) + ' ' + (y - 62) + ' l-6 62 M' + (x + 12).toFixed(0) + ' ' + (y - 62) + ' l6 62" stroke="#2A2266" stroke-width="18" stroke-linecap="round"/>';
    if (g > 0) s += '<circle cx="' + (x + 34 * dir).toFixed(0) + '" cy="' + (y - 130) + '" r="' + (26 + 12 * g).toFixed(0) + '" fill="' + B3 + '" opacity="' + (.55 * g).toFixed(2) + '"/><rect x="' + (x + 34 * dir - 8).toFixed(0) + '" y="' + (y - 144) + '" width="16" height="28" rx="4" fill="#CFE9FF" opacity="' + g.toFixed(2) + '"/>';
    s += '</g>'; }
  // Bank: Lehne, Sitz (nass, spiegelnd), Beine
  s += '<defs><linearGradient id="n3w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A5A3A"/><stop offset="1" stop-color="#4E3020"/></linearGradient><linearGradient id="n3t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B4430"/><stop offset="1" stop-color="#2E1C14"/></linearGradient></defs>';
  s += '<rect x="-20" y="990" width="1120" height="44" rx="10" fill="url(#n3w)" stroke="' + S3 + '" stroke-width="5"/><rect x="-20" y="1046" width="1120" height="40" rx="10" fill="url(#n3w)" stroke="' + S3 + '" stroke-width="5"/>';
  s += '<path d="M-40 1100 H1120 L1180 1270 H-100 Z" fill="url(#n3t)" stroke="' + S3 + '" stroke-width="5"/>';
  for (let i = 1; i < 4; i++) { const y = 1100 + i * 42; s += '<path d="M' + (-40 - i * 15) + ' ' + y + ' H' + (1120 + i * 15) + '" stroke="#1E120C" stroke-width="5"/>'; }
  s += '<rect x="-100" y="1270" width="1280" height="26" fill="#22140E"/><rect x="150" y="1296" width="34" height="300" fill="#1B1B2E"/><rect x="900" y="1296" width="34" height="300" fill="#1B1B2E"/>';
  // nasse Glanzlichter auf dem Sitz
  for (let i = 0; i < 7; i++) { const x = 60 + i * 150 + 20 * Math.sin(i * 3); s += '<ellipse cx="' + x + '" cy="' + (1150 + (i % 3) * 30) + '" rx="' + (40 + (i % 2) * 30) + '" ry="5" fill="#FFD9A0" opacity=".14"/>'; }
  // Boden
  s += '<rect x="0" y="1296" width="1080" height="624" fill="#141629"/>';
  for (let i = 0; i < 4; i++) { const x = 300 + i * 190, y = 1380 + (i % 2) * 80, c = (t * .7 + i * .3) % 1; s += '<ellipse cx="' + x + '" cy="' + y + '" rx="90" ry="16" fill="#2A2F55" opacity=".7"/><ellipse cx="' + x + '" cy="' + y + '" rx="' + (10 + 70 * c).toFixed(0) + '" ry="' + (3 + 12 * c).toFixed(1) + '" fill="none" stroke="#9FB6FF" stroke-width="2" opacity="' + (.5 * (1 - c)).toFixed(2) + '"/>'; }
  return s; }
// Regen vorne (leicht, ueber allem ausser Figur und Text)
function rain3(t, k) { if (k <= 0) return ''; let s = '<g opacity="' + (.5 * k).toFixed(2) + '">'; for (let i = 0; i < 70; i++) { const x = rnd(i + 200) * 1180 - 50, sp = 900 + rnd(i + 260) * 500, y = ((t * sp + rnd(i + 300) * 1920) % 1980) - 60, near = rnd(i + 330) > .8; s += '<path d="M' + (x - y * .08).toFixed(0) + ' ' + y.toFixed(0) + ' l-6 ' + (near ? 46 : 28) + '" stroke="#BFD4FF" stroke-width="' + (near ? 3 : 2) + '" stroke-linecap="round" opacity="' + (near ? .55 : .3) + '"/>'; } return s + '</g>'; }

// ---------- Das iPhone (gross, von vorn) ----------
// mode: lock | power | off. o.crt 0..1 Ausschalt-Animation, o.slide 0..1 Regler, o.hint 0..1 Hinweis hervorgehoben, o.tog 0..1 Hinweis aus
function iph3(x, y, s, o) { o = o || {}; const W2 = 116, H2 = 235; let g = '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + s.toFixed(3) + ')">';
  g += '<defs><linearGradient id="ti3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2E3246"/><stop offset=".15" stop-color="#9AA0B8"/><stop offset=".5" stop-color="#5A607A"/><stop offset=".85" stop-color="#A8AEC6"/><stop offset="1" stop-color="#2E3246"/></linearGradient><linearGradient id="wp3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3A1A8A"/><stop offset=".5" stop-color="#7C5CFF"/><stop offset="1" stop-color="#FF6BA8"/></linearGradient><linearGradient id="gl3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".13"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient><clipPath id="sc3"><rect x="-104" y="-223" width="208" height="446" rx="32"/></clipPath></defs>';
  if (o.glow) g += '<ellipse cx="0" cy="0" rx="190" ry="300" fill="' + (o.glowCol || '#8A7CFF') + '" opacity="' + (.22 * o.glow).toFixed(2) + '"/>';
  g += '<rect x="-122" y="-150" width="10" height="44" rx="4" fill="#5A607A"/><rect x="-122" y="-92" width="10" height="44" rx="4" fill="#5A607A"/><rect x="112" y="-120" width="10" height="76" rx="4" fill="#5A607A"/>';
  g += '<rect x="' + -W2 + '" y="' + -H2 + '" width="' + 2 * W2 + '" height="' + 2 * H2 + '" rx="42" fill="url(#ti3)" stroke="' + S3 + '" stroke-width="6"/><rect x="-108" y="-227" width="216" height="454" rx="35" fill="#04050C"/>';
  let sc = '<rect x="-104" y="-223" width="208" height="446" fill="#04050C"/>';
  const mode = o.mode || 'off';
  if (mode === 'lock' || mode === 'power') { const dim = mode === 'power' ? .72 : 0; let L = '<rect x="-104" y="-223" width="208" height="446" fill="url(#wp3)"/>';
    for (let i = 0; i < 4; i++) L += '<path d="M-130 ' + (40 + i * 46) + ' Q-40 ' + (0 + i * 40 + 20 * Math.sin((o.t || 0) * .8 + i)) + ' 40 ' + (50 + i * 44) + ' T140 ' + (30 + i * 46) + ' V260 H-130 Z" fill="#fff" opacity=".07"/>';
    L += (mode === 'lock' ? svgT(0, -118, '23:47', 66, '#fff') : '') + '<rect x="58" y="-200" width="28" height="13" rx="4" fill="none" stroke="#fff" stroke-width="2.5"/><rect x="61" y="-197" width="3" height="7" fill="' + ((o.t || 0) * 3 % 1 < .5 ? '#FF4D4D' : '#fff') + '"/>';
    if (dim) L += '<rect x="-104" y="-223" width="208" height="446" fill="#05060F" opacity="' + dim + '"/>';
    if (mode === 'power') { const sl = ease(cl(o.slide || 0)); L += '<rect x="-90" y="-176" width="180" height="58" rx="29" fill="#fff" opacity=".22"/>' + svgT(16, -139, 'ausschalten', 17, '#E7EBF7') + '<g transform="translate(' + (-62 + 124 * sl).toFixed(1) + ' -147)"><circle r="24" fill="#fff"/><path d="M0 -11 V-1 M-8 -7 A11 11 0 1 0 8 -7" stroke="#FF3B30" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>';
      const h = cl(o.hint || 0), tg = cl(o.tog || 0); L += '<rect x="-96" y="-84" width="192" height="96" rx="18" fill="#fff" opacity="' + (.12 + .14 * h).toFixed(2) + '" stroke="#FFE14D" stroke-width="' + (4 * h).toFixed(1) + '"/>' + svgT(0, -56, 'iPhone nach', 22, lc('#E7EBF7', '#B8BED2', tg)) + svgT(0, -31, 'Ausschalten', 22, lc('#E7EBF7', '#B8BED2', tg)) + svgT(0, -6, 'auffindbar', 22, lc('#E7EBF7', '#B8BED2', tg));
      L += '<g transform="translate(0 30)"><rect x="-26" y="-14" width="52" height="28" rx="14" fill="' + lc('#34C759', '#5A607A', tg) + '"/><circle cx="' + (12 - 24 * tg).toFixed(1) + '" r="11" fill="#fff"/></g>';
      L += '<rect x="-60" y="150" width="120" height="44" rx="22" fill="#fff" opacity=".22"/>' + svgT(0, 179, 'Abbrechen', 16, '#E7EBF7'); }
    sc += L; }
  if (o.crt !== undefined && o.crt > 0) { const k = cl(o.crt), sy = k < .6 ? lerp(1, .012, ease(k / .6)) : .012, sx = k < .6 ? 1 : lerp(1, 0, ease((k - .6) / .4));
    sc = '<rect x="-104" y="-223" width="208" height="446" fill="#04050C"/><g transform="scale(' + sx.toFixed(3) + ' ' + sy.toFixed(3) + ')">' + sc + '<rect x="-104" y="-223" width="208" height="446" fill="#fff" opacity="' + (.8 * cl(k * 1.6)).toFixed(2) + '"/></g>'; }
  g += '<g clip-path="url(#sc3)">' + sc + (o.inner || '') + '<rect x="-104" y="-223" width="208" height="446" fill="url(#gl3)"/></g>';
  g += '<rect x="-36" y="-210" width="72" height="22" rx="11" fill="#000"/>';
  return g + '</g>'; }
// Funkringe um einen Punkt (Kreise mit weichem Schein)
function wave3(x, y, t, k, r0, r1, sp, ry) { if (k <= 0) return ''; let s = ''; ry = ry || 1; for (let i = 0; i < 3; i++) { const c = ((t * (sp || .7)) + i / 3) % 1, r = r0 + (r1 - r0) * c, op = k * (1 - c); s += '<ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + r.toFixed(0) + '" ry="' + (r * ry).toFixed(0) + '" fill="none" stroke="' + B3 + '" stroke-width="16" opacity="' + (.18 * op).toFixed(2) + '"/><ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + r.toFixed(0) + '" ry="' + (r * ry).toFixed(0) + '" fill="none" stroke="#CFE9FF" stroke-width="4" opacity="' + (.8 * op).toFixed(2) + '"/>'; } return s; }
const btG3 = (x, y, z, op) => z <= 0 ? '' : '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(' + z.toFixed(2) + ')" opacity="' + (op === undefined ? 1 : op).toFixed(2) + '"><circle r="30" fill="' + B3 + '"/><path d="M-10 -10 L10 10 L0 20 V-20 L10 -10 L-10 10" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></g>';
// Augen im Dunkeln (offene Frage im Einstieg)
function eyes3(x, y, k, t, i, sz) { if (k <= 0) return ''; const bl = ((t * .7 + i * .37) % 1) < .06 ? .1 : 1, z = back(cl(k)) * (sz || 1), lk = 6 * Math.sin(t * 1.7 + i); return '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(2) + ' ' + (z * bl).toFixed(2) + ')"><ellipse cx="-22" rx="16" ry="10" fill="#FFE14D"/><ellipse cx="22" rx="16" ry="10" fill="#FFE14D"/><circle cx="' + (-22 + lk).toFixed(1) + '" r="6" fill="' + S3 + '"/><circle cx="' + (22 + lk).toFixed(1) + '" r="6" fill="' + S3 + '"/></g>'; }

// ---------- Einstieg ----------
WORLD.i3hook = function (sc, ev, t, lt) { const au = ev.aus, fu = ev.funk, lo = ev.loop;
  const sl = cl((lt - .15) / .55), crt = cl((lt - .8) / .45), scan = au === undefined ? 0 : cl((au - 1.5) / .8), pulse = au === undefined ? 0 : cl((au - 2.1) / .4);
  const z = 1.0 + .12 * ease(cl(lt / 9)) + .05 * Math.exp(-Math.pow((lt - 1.25) * 6, 2)), cx = PI3c[0], cy = 925, sw = lt > 1.4 ? .9 + .1 * Math.cos((lt - 1.4) * 1.1) : 1;
  let s = '<g transform="translate(' + (cx + 8 * Math.sin(lt * .6)).toFixed(1) + ' ' + cy + ') scale(' + z.toFixed(3) + ') translate(' + -cx + ' ' + -cy + ')">';
  const pg = fu === undefined ? [0, 0, 0] : [0, 1, 2].map(i => cl((fu - .4 - i * .5) / .3)), chip = [cx + 58, cy - 168];
  const rk = pulse * (lo === undefined ? 1 : .6);
  s += bokeh3(t, { ppl: pg, ring: rk > 0 ? [chip[0], chip[1], 120, 700, .6, rk] : null });
  s += '<clipPath id="hk3c"><rect x="-200" y="640" width="1480" height="1000"/></clipPath><g clip-path="url(#hk3c)">' + wave3(chip[0], chip[1], t, rk, 120, 700, .6) + '</g>';
  // Innenleben, das beim Scan durchs Glas sichtbar wird und danach als Leuchtpunkt bleibt
  let inner = '';
  if (scan > 0) { const by = -223 + 520 * scan; inner += '<g opacity="' + (scan < 1 ? 1 : .0).toFixed(2) + '"><clipPath id="scb3"><rect x="-104" y="' + (by - 90).toFixed(0) + '" width="208" height="90"/></clipPath><g clip-path="url(#scb3)"><rect x="-104" y="-223" width="208" height="446" fill="#0E2A40"/><rect x="-90" y="-205" width="180" height="140" rx="12" fill="#1C4A3A"/><rect x="-60" y="-185" width="60" height="60" rx="8" fill="#2A2E44"/><rect x="-80" y="-50" width="160" height="240" rx="16" fill="#2C3148"/></g><rect x="-104" y="' + (by - 4).toFixed(0) + '" width="208" height="8" fill="#9FE0FF"/><rect x="-104" y="' + (by - 40).toFixed(0) + '" width="208" height="40" fill="#9FE0FF" opacity=".25"/></g>';
    const pu = .5 + .5 * Math.sin(t * 6); inner += '<circle cx="52" cy="-150" r="' + (16 + 8 * pu).toFixed(0) + '" fill="' + B3 + '" opacity="' + (.9 * cl((scan - .2) / .2)).toFixed(2) + '"/><circle cx="52" cy="-150" r="' + (40 + 14 * pu).toFixed(0) + '" fill="' + B3 + '" opacity="' + (.3 * cl((scan - .2) / .2)).toFixed(2) + '"/>'; }
  s += '<g transform="translate(' + cx + ' 0) scale(' + sw.toFixed(3) + ' 1) translate(' + -cx + ' 0)">' + iph3(cx, cy, 1.12, { mode: crt < 1 ? 'power' : 'off', slide: sl, crt: crt, t: t, glow: crt < 1 ? 1 - crt : .5 * pulse, glowCol: crt < 1 ? '#8A7CFF' : B3, inner: inner }) + '</g>';
  if (lt < .2) s += iph3(cx, cy, 1.12, { mode: 'lock', t: t });
  if (au !== undefined) s += btG3(chip[0] + 150, chip[1] - 30, back(cl((au - 2.3) / .4)) * (lo === undefined ? 1 : 1 - cl(lo / .4)) * 1.3);
  s += '</g>';
  if (lo !== undefined) { const P = [[200, 720], [880, 680], [250, 1020], [900, 1040]]; P.forEach((p, i) => s += eyes3(p[0] + 10 * Math.sin(t * 2 + i), p[1], cl((lo - .1 - i * .2) / .3), t, i, 1.7)); }
  return W(s + rain3(t, 1) + shade3()); };
WMASC.i3hook = (ev, t, lt) => { const au = ev.aus, lo = ev.loop; const k = au === undefined ? 0 : Math.sin(Math.PI * cl((au - 1.1) / 1)); if (lo !== undefined) return stay3([FX3, GY3], 1, { r: -4, mood: 'shock' }); return stay3([FX3, GY3 - 22 * k], 1, { r: -10 * k, mood: k > .15 ? 'shock' : 'happy' }); };

// ---------- Teil 1: Explosionsansicht ----------
// Ebenen schraeg gestaffelt (Iso). k: Abstand, pw: Strom zum Funkchip, sl: andere Teile schlafen
function layers3(x, y, k, t, o) { o = o || {}; const d = 95 * ease(k); const iso = (dx, dy, inner) => '<g transform="translate(' + (x + dx).toFixed(1) + ' ' + (y + dy).toFixed(1) + ') skewY(-14) scale(.9 .9)">' + inner + '</g>';
  let s = '';
  // Rueckseite
  s += iso(d, -d * .7, '<rect x="-116" y="-235" width="232" height="470" rx="42" fill="url(#ti3)" stroke="' + S3 + '" stroke-width="6"/><rect x="-100" y="-219" width="200" height="438" rx="34" fill="#6A7090"/><rect x="-86" y="-205" width="100" height="100" rx="26" fill="#2A2E44" stroke="#14172A" stroke-width="4"/><circle cx="-58" cy="-177" r="18" fill="#0B0D18" stroke="#5A607A" stroke-width="4"/><circle cx="-14" cy="-133" r="18" fill="#0B0D18" stroke="#5A607A" stroke-width="4"/>');
  // Innenleben: Platine + Akku
  const pw = cl(o.pw || 0), sl = cl(o.sl || 0), pu = .5 + .5 * Math.sin(t * 6);
  let pcb = '<rect x="-108" y="-227" width="216" height="454" rx="36" fill="#14172A" stroke="' + S3 + '" stroke-width="5"/><rect x="-96" y="-215" width="192" height="150" rx="16" fill="#2E8A62" stroke="#0E2A20" stroke-width="4"/>';
  for (let i = 0; i < 6; i++) pcb += '<path d="M' + (-90 + i * 30) + ' -210 V' + (-80 - (i % 3) * 18) + ' H' + (-60 + i * 22) + '" stroke="#2F7A5C" stroke-width="3" fill="none"/>';
  pcb += '<rect x="-72" y="-190" width="64" height="64" rx="8" fill="#2A2E44" stroke="#0E2A20" stroke-width="3"/><rect x="10" y="-196" width="38" height="30" rx="5" fill="#2A2E44"/><rect x="20" y="-150" width="30" height="30" rx="5" fill="#2A2E44"/>';
  // Funkchip
  pcb += '<rect x="56" y="-190" width="34" height="34" rx="6" fill="' + lc('#2A2E44', B3, pw * (.6 + .4 * pu)) + '" stroke="#CFE9FF" stroke-width="' + (2 + 3 * pw).toFixed(1) + '"/>';
  if (pw > 0) pcb += '<circle cx="73" cy="-173" r="' + (24 + 10 * pu).toFixed(0) + '" fill="' + B3 + '" opacity="' + (.35 * pw).toFixed(2) + '"/>';
  if (sl > 0) pcb += '<rect x="-96" y="-215" width="140" height="150" rx="16" fill="#05060F" opacity="' + (.55 * sl).toFixed(2) + '"/>';
  // Akku
  pcb += '<rect x="-92" y="-52" width="184" height="262" rx="20" fill="#7A8098" stroke="#14172A" stroke-width="4"/><rect x="-80" y="-40" width="160" height="238" rx="14" fill="#9AA0B8"/><path d="M-12 60 h24 M0 48 v24" stroke="#8C93AD" stroke-width="6" stroke-linecap="round"/>';
  // Strompfad Akku -> Funkchip
  if (pw > 0) { pcb += '<path d="M60 -52 V-120 H73 V-156" stroke="#5CFFB0" stroke-width="5" fill="none" opacity="' + (.6 * pw).toFixed(2) + '"/>'; for (let i = 0; i < 4; i++) { const c = (t * 1.2 + i / 4) % 1, L = 68 + 13 + 36; let px, py; const dd = c * L; if (dd < 68) { px = 60; py = -52 - dd; } else if (dd < 81) { px = 60 + (dd - 68); py = -120; } else { px = 73; py = -120 - (dd - 81); } pcb += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="6" fill="#B8FFE0" opacity="' + pw.toFixed(2) + '"/>'; } }
  s += iso(0, 0, pcb);
  // Display (vorn, dunkel, Glas)
  s += iso(-d, d * .7, '<rect x="-112" y="-231" width="224" height="462" rx="40" fill="#04050C" stroke="#5A607A" stroke-width="5" opacity=".92"/><rect x="-112" y="-231" width="224" height="462" rx="40" fill="url(#gl3)"/><rect x="-36" y="-216" width="72" height="22" rx="11" fill="#000"/>');
  return s; }
// 24-Stunden-Ring
function ring24(x, y, r, k, t) { if (k <= 0) return ''; let s = '<g opacity="' + cl(k * 3).toFixed(2) + '">'; const f = ease(k);
  for (let i = 0; i < 24; i++) { const a = -Math.PI / 2 + i / 24 * Math.PI * 2, on = i / 24 < f, r1 = r - (i % 6 ? 14 : 26); s += '<path d="M' + (x + r1 * Math.cos(a)).toFixed(1) + ' ' + (y + r1 * Math.sin(a)).toFixed(1) + ' L' + (x + r * Math.cos(a)).toFixed(1) + ' ' + (y + r * Math.sin(a)).toFixed(1) + '" stroke="' + (on ? '#CFE9FF' : '#3A4170') + '" stroke-width="' + (i % 6 ? 5 : 8) + '" stroke-linecap="round"/>'; }
  const a1 = -Math.PI / 2 + f * Math.PI * 2, big = f > .5 ? 1 : 0; if (f > .01) s += '<path d="M' + x + ' ' + (y - r - 18) + ' A' + (r + 18) + ' ' + (r + 18) + ' 0 ' + big + ' 1 ' + (x + (r + 18) * Math.cos(a1)).toFixed(1) + ' ' + (y + (r + 18) * Math.sin(a1)).toFixed(1) + '" stroke="' + B3 + '" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="' + (x + (r + 18) * Math.cos(a1)).toFixed(1) + '" cy="' + (y + (r + 18) * Math.sin(a1)).toFixed(1) + '" r="14" fill="#fff"/>';
  s += svgT(x - r - 36, y + 16, Math.round(24 * f) + ' h', 48, '#fff', 'end');
  return s + '</g>'; }
// kleine Modellreihe
function lineup3(k, t, el) { let s = ''; const M = [['X', 0], ['SE', 0], ['11', 1], ['16', 1]];
  M.forEach((m, i) => { const ki = ease(cl((k - i * .1) / .3)), x = 220 + i * 200, y = 850 + 300 * (1 - ki), on = m[1] && el > .8 + (i - 2) * .3; if (ki <= 0) return;
    s += '<g transform="translate(' + x + ' ' + y.toFixed(0) + ') scale(.62)" opacity="' + (m[1] ? 1 : .8) + '">' + (on ? '<circle r="200" fill="' + B3 + '" opacity=".18"/>' + wave3(0, 0, t + i * .2, 1, 140, 270, .9) : '') + '<rect x="-116" y="-235" width="232" height="470" rx="42" fill="url(#ti3)" stroke="' + S3 + '" stroke-width="7"/><rect x="-104" y="-223" width="208" height="446" rx="32" fill="' + (on ? '#1C2E6A' : '#05060F') + '"/><rect x="-36" y="-210" width="72" height="22" rx="11" fill="#000"/>' + svgT(0, 40, m[0], 120, m[1] ? '#fff' : '#AEB4CC') + '</g>';
    if (!m[1] && el > .4) s += '<path d="M' + (x + 62) + ' ' + (y - 130) + ' L' + (x - 62) + ' ' + (y + 130) + '" stroke="#FF4D6D" stroke-width="10" stroke-linecap="round" opacity="' + cl((el - .4) / .3).toFixed(2) + '"/>'; });
  if (el > 1.4) { const a = cl((el - 1.4) / .4); s += '<path d="M' + (620) + ' 850 H' + (780) + '" stroke="#CFE9FF" stroke-width="10" stroke-dasharray="4 18" stroke-linecap="round" opacity="' + a.toFixed(2) + '"/>'; }
  return s; }
WORLD.i3aus = function (sc, ev, t, lt) { const se = ev.sende, bt = ev.bt, el = ev.elf; const cx = PI3c[0], cy = PI3c[1];
  let s = bokeh3(t);
  const flip = cl(lt / .5), k = se === undefined ? 0 : cl((se - .3) / 1.1), out = el === undefined ? 0 : cl(el / .5);
  if (flip < 1) s += '<g transform="translate(' + cx + ' 0) scale(' + (1 - ease(flip)).toFixed(3) + ' 1) translate(' + -cx + ' 0)">' + iph3(cx, cy, 1, { mode: 'off', glow: .4 }) + '</g>';
  else if (out < 1) { s += '<g opacity="' + (1 - out).toFixed(2) + '" transform="translate(' + cx + ' ' + cy + ') scale(' + (1 - .3 * out).toFixed(3) + ') translate(' + -cx + ' ' + -cy + ')">';
    const dimL = bt === undefined ? 1 : 1 - .75 * cl(bt / .5);
    s += '<g opacity="' + dimL.toFixed(2) + '">' + layers3(cx, cy + 50, k, t, { pw: cl((se - 1.3) / .5), sl: cl((se - 1) / .5) }) + '</g>';
    s += ring24(cx, cy + 20, 200, bt === undefined ? 0 : cl((bt - .2) / 2.2), t);
    if (bt !== undefined) s += wave3(cx, cy + 20, t, cl(bt / .4), 40, 240, .9) + btG3(cx, cy + 20, back(cl(bt / .4)) * 1.5);
    s += '</g>'; }
  if (el !== undefined) s += lineup3(cl((el - .2) / 1.2), t, el);
  return W(s + rain3(t, .7) + shade3(), slot(ev, [['sende', 'Funkt weiter, obwohl aus', 'hot']])); };
WMASC.i3aus = (ev, t, lt) => { const bt = ev.bt, el = ev.elf; if (el !== undefined) return stay3([FX3, GY3], 1, { r: 2, mood: 'happy' }); if (bt !== undefined) { const j = Math.sin(Math.PI * cl((bt - .3) / .6)); return stay3([FX3, GY3 - 24 * j], 1, { r: 0, mood: 'shock' }); } return stay3([FX3, GY3], 1, { r: 2 * Math.sin(t * 2), mood: 'cool' }); };

// ---------- Teil 2: Stadt von oben, dann Erdkugel ----------
var AR3 = 30 * Math.PI / 180;
function proj3(x, y, h, z, c) { c = c || [540, 920]; const X = x * Math.cos(AR3) - y * Math.sin(AR3), Y = .58 * (x * Math.sin(AR3) + y * Math.cos(AR3)); return [c[0] + z * X, c[1] + z * (Y - (h || 0))]; }
const poly3 = (pts, fill, op, st) => '<path d="M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') + ' Z" fill="' + fill + '"' + (op !== undefined ? ' opacity="' + op.toFixed(2) + '"' : '') + (st ? ' stroke="' + st + '" stroke-width="2"' : '') + '/>';
// Laeufer auf den Strassen (Rasterweg), gibt Position in Weltkoordinaten
function walk3(i, t) { const G = 150, sp = 34 + 10 * (i % 3), L = 1200, c = ((t * sp + i * 377) % L + L) % L - 600, lane = i < 8 ? (i % 4 < 2 ? -G / 2 : G / 2) + (i % 2 ? 0 : 0) : (Math.floor(rnd(i + 70) * 9) - 4) * G + G / 2; return i % 2 ? [lane, c] : [c, lane]; }
function city3(t, z, o) { o = o || {}; const G = 150, N = 5; let s = '<rect width="1080" height="1920" fill="#070A1C"/>';
  // Boden mit Strassen
  s += poly3([proj3(-760, -760, 0, z), proj3(760, -760, 0, z), proj3(760, 760, 0, z), proj3(-760, 760, 0, z)], '#10142C');
  for (let i = -N; i <= N; i++) { const v = i * G + G / 2; s += '<path d="M' + proj3(v, -760, 0, z).map(n => n.toFixed(0)).join(' ') + ' L' + proj3(v, 760, 0, z).map(n => n.toFixed(0)).join(' ') + 'M' + proj3(-760, v, 0, z).map(n => n.toFixed(0)).join(' ') + ' L' + proj3(760, v, 0, z).map(n => n.toFixed(0)).join(' ') + '" stroke="#26306A" stroke-width="' + (12 * z).toFixed(1) + '"/>'; }
  // Autos (Lichtpunkte)
  for (let i = 0; i < 14; i++) { const p = walk3(i + 50, t * 4.5), q = proj3(p[0], p[1], 0, z); s += '<circle cx="' + q[0].toFixed(0) + '" cy="' + q[1].toFixed(0) + '" r="' + (5 * z).toFixed(1) + '" fill="' + (i % 2 ? '#FFE9A8' : '#FF5A5A') + '" opacity=".8"/>'; }
  // Gebaeude, nach Tiefe sortiert
  const B = []; for (let a = -N; a < N; a++) for (let b = -N; b < N; b++) { if (a === 0 && b === 0) continue; const h = 40 + rnd(a * 31 + b * 7 + 400) * 150, w = 44 + rnd(a * 13 + b * 5 + 90) * 30; B.push([a * G + G / 2 + 75 - w / 2 - 75 + G / 2 - G / 2, b * G + G / 2, w, h, a, b]); }
  B.sort((p, q) => proj3(p[0], p[1], 0, 1)[1] - proj3(q[0], q[1], 0, 1)[1]);
  B.forEach(bd => { const [x0, y0, w, h, a, b] = bd, x = x0 - G / 2 + G / 2, y = y0, X = [x - w, x + w], Y = [y - w, y + w];
    const P00 = [X[0], Y[0]], P10 = [X[1], Y[0]], P11 = [X[1], Y[1]], P01 = [X[0], Y[1]];
    const g = (p, hh) => proj3(p[0], p[1], hh, z);
    s += poly3([g(P01, 0), g(P11, 0), g(P11, h), g(P01, h)], '#1A1E44') + poly3([g(P11, 0), g(P10, 0), g(P10, h), g(P11, h)], '#232860');
    s += poly3([g(P00, h), g(P10, h), g(P11, h), g(P01, h)], '#3A3F80');
    if (rnd(a * 3 + b * 11 + 7) > .5) { const c = g([x, y], h); s += '<circle cx="' + c[0].toFixed(0) + '" cy="' + c[1].toFixed(0) + '" r="' + (4 * z).toFixed(1) + '" fill="#FF4D4D" opacity="' + (.4 + .6 * (Math.sin(t * 3 + a + b) > 0)).toFixed(2) + '"/>'; }
    // Fenster an der Front
    for (let f = 0; f < 3; f++) if (rnd(a * 17 + b * 3 + f) > .4) { const hh = h * (.25 + f * .25), q = g([x, Y[1]], hh); s += '<rect x="' + (q[0] - 5 * z).toFixed(0) + '" y="' + (q[1] - 3 * z).toFixed(0) + '" width="' + (10 * z).toFixed(1) + '" height="' + (6 * z).toFixed(1) + '" fill="#FFD98A" opacity=".7"/>'; } });
  return s; }
// Server-Wolke oben rechts (ohne Logo)
function server3(x, y, k, t, inner, zz) { if (k <= 0) return ''; const z = back(cl(k)) * (zz || 1); let s = '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(2) + ')"><ellipse rx="190" ry="120" fill="' + B3 + '" opacity=".14"/><path d="M-130 50 Q-170 50 -168 8 Q-166 -34 -120 -36 Q-110 -96 -40 -92 Q0 -136 56 -104 Q122 -116 128 -42 Q172 -38 170 6 Q168 50 120 50 Z" fill="#E9EEFB" stroke="' + S3 + '" stroke-width="7"/>';
  for (let i = 0; i < 3; i++) { s += '<rect x="-62" y="' + (-46 + i * 30) + '" width="124" height="22" rx="5" fill="#2A3060"/>'; for (let j = 0; j < 4; j++) s += '<circle cx="' + (-46 + j * 12) + '" cy="' + (-35 + i * 30) + '" r="3.5" fill="' + ((Math.sin(t * 7 + i * 3 + j * 2) > 0) ? '#5CFFB0' : '#2E6A50') + '"/>'; }
  return s + (inner || '') + '</g>'; }
function globe3(x, y, r, k, t) { if (k <= 0) return ''; let s = '<defs><radialGradient id="gb3" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#2A4AA8"/><stop offset=".7" stop-color="#0E1A52"/><stop offset="1" stop-color="#060A26"/></radialGradient></defs><g opacity="' + cl(k * 2).toFixed(2) + '" transform="translate(' + x + ' ' + y + ') scale(' + (.6 + .4 * ease(k)).toFixed(3) + ')"><circle r="' + (r + 30) + '" fill="' + B3 + '" opacity=".12"/><circle r="' + r + '" fill="url(#gb3)" stroke="#5CB8FF" stroke-width="4"/>';
  for (let i = -2; i <= 2; i++) s += '<ellipse rx="' + r + '" ry="' + (r * .16).toFixed(0) + '" cy="' + (i * r * .38).toFixed(0) + '" fill="none" stroke="#2F4C9E" stroke-width="2" transform="scale(' + Math.sqrt(1 - Math.pow(i * .38, 2)).toFixed(3) + ' 1)"/>';
  for (let i = 0; i < 6; i++) { const ph = ((t * .15 + i / 6) % 1) * Math.PI; s += '<ellipse rx="' + Math.abs(r * Math.cos(ph)).toFixed(1) + '" ry="' + r + '" fill="none" stroke="#2F4C9E" stroke-width="2"/>'; }
  for (let i = 0; i < 420; i++) { const lat = Math.asin(2 * rnd(i + 5) - 1), lon = rnd(i + 11) * Math.PI * 2 + t * .9, cx = Math.cos(lat) * Math.sin(lon), cz = Math.cos(lat) * Math.cos(lon); if (cz < 0) continue; const tw = .4 + .6 * Math.abs(Math.sin(t * 3 + i)); s += '<circle cx="' + (r * cx).toFixed(1) + '" cy="' + (-r * Math.sin(lat)).toFixed(1) + '" r="' + (2 + 2.5 * cz).toFixed(1) + '" fill="#CFE9FF" opacity="' + (tw * cz * cl((k - rnd(i + 2) * .6) / .4)).toFixed(2) + '"/>'; }
  return s + '</g>'; }
WORLD.i3helf = function (sc, ev, t, lt) { const ha = ev.haken, fr = ev.fremd, me = ev.melde, mr = ev.mrd; AR3 = (30 + 14 * ease(cl(lt / 1.2)) + 3 * lt) * Math.PI / 180;
  const fly = cl(lt / 1.2), z = lerp(3.4, 1.35, ease(fly)) * (mr === undefined ? 1 : lerp(1, .15, ease(cl(mr / 1.2)))), gk = mr === undefined ? 0 : cl((mr - .5) / 1.2);
  let s = city3(t, z);
  const ph = proj3(0, 0, 0, z), R = 270;
  // Handy in der Mitte, liegend als leuchtender Punkt + Ringe am Boden
  s += wave3(ph[0], ph[1], t, gk < 1 ? 1 - gk : 0, 20 * z, R * z, .6, .58);
  s += '<g transform="translate(' + ph[0].toFixed(0) + ' ' + ph[1].toFixed(0) + ') scale(' + (z * .95).toFixed(3) + ') rotate(-60) scale(1 .58)">' + '<ellipse rx="150" ry="200" fill="' + B3 + '" opacity=".3"/><rect x="-60" y="-110" width="120" height="220" rx="24" fill="#5A607A" stroke="' + S3 + '" stroke-width="8"/><rect x="-50" y="-100" width="100" height="200" rx="18" fill="#04050C"/></g>';
  // kein Internet
  if (fr !== undefined && fr < 2.4 && gk === 0) { const k = cl(fr / .3) * (1 - cl((fr - 2) / .4)), q = [ph[0], ph[1] - 120]; s += '<g transform="translate(' + q[0].toFixed(0) + ' ' + q[1].toFixed(0) + ') scale(' + back(k).toFixed(2) + ')"><circle r="46" fill="' + S3 + '" stroke="#F4F6FB" stroke-width="5"/><path d="M-26 -4 Q0 -28 26 -4 M-16 8 Q0 -6 16 8" stroke="#F4F6FB" stroke-width="6" fill="none" stroke-linecap="round"/><circle cy="20" r="5" fill="#F4F6FB"/><path d="M-30 30 L30 -30" stroke="#FF4D6D" stroke-width="8" stroke-linecap="round"/></g>'; }
  // Helfer laufen, im Ring leuchten sie auf und melden an die Wolke
  const SV = [800, 690], beams = []; if (fr !== undefined && gk < 1) for (let i = 0; i < 14; i++) { const p = walk3(i, t), d = Math.hypot(p[0], p[1]), inR = d < R, q = proj3(p[0], p[1], 0, z);
    s += '<g opacity="' + (1 - gk).toFixed(2) + '"><circle cx="' + q[0].toFixed(0) + '" cy="' + (q[1] - 10 * z).toFixed(0) + '" r="' + (12 * z).toFixed(1) + '" fill="' + (inR ? '#CFE9FF' : '#B8BEE0') + '" stroke="' + S3 + '" stroke-width="3"/>' + (inR ? '<circle cx="' + q[0].toFixed(0) + '" cy="' + (q[1] - 10 * z).toFixed(0) + '" r="' + ((22 + 6 * Math.sin(t * 8 + i)) * z).toFixed(1) + '" fill="' + B3 + '" opacity=".4"/>' : '') + '</g>';
    if (inR && me !== undefined) beams.push([q[0], q[1] - 10 * z, i]); }
  if (me !== undefined && gk < 1) { const ks = cl((me - .2) / .4) * (1 - gk); s += server3(SV[0], SV[1], ks, t); beams.forEach(b => { const mx = (b[0] + SV[0]) / 2, my = Math.min(b[1], SV[1]) - 120; s += '<path d="M' + b[0].toFixed(0) + ' ' + b[1].toFixed(0) + ' Q' + mx.toFixed(0) + ' ' + my.toFixed(0) + ' ' + SV[0] + ' ' + (SV[1] + 40) + '" stroke="' + B3 + '" stroke-width="7" fill="none" stroke-dasharray="14 12" opacity="' + (.85 * ks).toFixed(2) + '"/>'; const c = (t * .9 + b[2] * .17) % 1, u = 1 - c; s += '<circle cx="' + (u * u * b[0] + 2 * u * c * mx + c * c * SV[0]).toFixed(0) + '" cy="' + (u * u * b[1] + 2 * u * c * my + c * c * (SV[1] + 40)).toFixed(0) + '" r="9" fill="#FF4D6D" stroke="#fff" stroke-width="3" opacity="' + ks.toFixed(2) + '"/>'; }); }
  s += globe3(560, 880, 290, gk, t);
  return W(s + shade3(), slot(ev, [['haken', 'Fremde Geräte helfen', 'hot']])); };
WMASC.i3helf = (ev, t, lt) => { const ha = ev.haken, me = ev.melde, mr = ev.mrd; if (mr !== undefined) return stay3([FX3, GY3], 1, { r: 0, mood: 'shock' }); if (me !== undefined) return stay3([FX3, GY3], 1, { r: 3, mood: 'happy' }); const j = ha === undefined ? 0 : Math.sin(Math.PI * cl(ha / .5)); return stay3([FX3, GY3 - 30 * j], 1, { r: -6 * j, mood: j > .1 ? 'shock' : 'cool' }); };

// ---------- Teil 3: Verschluesselung ----------
function data3(t) { let s = '<defs><radialGradient id="d3g" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#1A1550"/><stop offset="1" stop-color="#05061A"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#d3g)"/>';
  for (let i = 0; i < 14; i++) s += '<path d="M0 ' + (500 + i * 80) + ' H1080" stroke="#1E2460" stroke-width="2"/>';
  for (let i = 0; i < 12; i++) s += '<path d="M' + (i * 96 + 20) + ' 400 V1600" stroke="#1E2460" stroke-width="2"/>';
  for (let i = 0; i < 18; i++) { const x = (i * 96 + 20) % 1080 + (i > 11 ? 48 : 0), c = (t * (.2 + rnd(i) * .3) + rnd(i + 9)) % 1; s += '<rect x="' + (x - 2) + '" y="' + (400 + c * 1200).toFixed(0) + '" width="4" height="60" fill="' + A3 + '" opacity=".5"/>'; }
  return s; }
const pin3 = (x, y, z, col) => '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(' + z.toFixed(2) + ')"><ellipse cy="96" rx="40" ry="10" fill="#000" opacity=".35"/><path d="M0 90 Q-70 10 -70 -40 A70 70 0 1 1 70 -40 Q70 10 0 90 Z" fill="' + (col || '#FF4D6D') + '" stroke="' + S3 + '" stroke-width="7"/><circle cy="-40" r="26" fill="#fff"/></g>';
function cipher3(x, y, z, t, op) { const H = '0123456789ABCDEF'; let s = '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(' + z.toFixed(2) + ')" opacity="' + op.toFixed(2) + '"><rect x="-130" y="-90" width="260" height="180" rx="18" fill="#0E1238" stroke="' + A3 + '" stroke-width="6"/>';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const ch = H[Math.floor(rnd(r * 7 + c * 3 + Math.floor(t * 12)) * 16)]; s += '<text x="' + (-100 + c * 40) + '" y="' + (-50 + r * 38) + '" font-size="30" font-weight="800" fill="' + (rnd(r + c * 5 + Math.floor(t * 6)) > .7 ? '#CFE9FF' : '#7C8BFF') + '" font-family="monospace" text-anchor="middle">' + ch + '</text>'; }
  return s + '</g>'; }
const lk3i = (x, y, z, open) => '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') scale(' + z.toFixed(2) + ')"><path d="M-30 ' + (-14 - 30 * open).toFixed(0) + ' V' + (-44 - 30 * open).toFixed(0) + ' Q-30 ' + (-80 - 30 * open).toFixed(0) + ' 0 ' + (-80 - 30 * open).toFixed(0) + ' Q30 ' + (-80 - 30 * open).toFixed(0) + ' 30 ' + (-44 - 30 * open).toFixed(0) + ' V' + (-14 - 30 * open * 0).toFixed(0) + '" fill="none" stroke="#E9EEFB" stroke-width="12"/><rect x="-46" y="-16" width="92" height="76" rx="14" fill="#FFE14D" stroke="' + S3 + '" stroke-width="7"/><circle cy="14" r="10" fill="' + S3 + '"/><rect x="-4" y="16" width="8" height="22" fill="' + S3 + '"/></g>';
const ky3i = (x, y, z, r) => '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + (r || 0).toFixed(0) + ') scale(' + z.toFixed(2) + ')"><circle cx="-34" r="24" fill="none" stroke="#FFE14D" stroke-width="12"/><path d="M-10 0 H50 M30 0 V18 M44 0 V14" stroke="#FFE14D" stroke-width="12" stroke-linecap="round"/></g>';
function laptop3(x, y, z, inner) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + z.toFixed(2) + ')"><rect x="-140" y="-190" width="280" height="180" rx="14" fill="#2A2E44" stroke="' + S3 + '" stroke-width="6"/><rect x="-126" y="-176" width="252" height="152" rx="6" fill="#0E1238"/>' + (inner || '') + '<path d="M-170 -6 H170 L150 18 H-150 Z" fill="#8C93AD" stroke="' + S3 + '" stroke-width="6"/></g>'; }
// Verpixeln einer Figur
function mosaic3(x, y, w, h, k, t) { if (k <= 0) return ''; let s = ''; const n = 7, cw = w / n, rows = Math.ceil(h / cw); for (let r = 0; r < rows; r++) for (let c = 0; c < n; c++) { if (rnd(r * 11 + c * 3 + 2) > k * 1.3) continue; const g = 50 + Math.floor(rnd(r * 5 + c * 9 + Math.floor(t * 4)) * 60); s += '<rect x="' + (x - w / 2 + c * cw).toFixed(0) + '" y="' + (y - h + r * cw).toFixed(0) + '" width="' + (cw + 1).toFixed(0) + '" height="' + (cw + 1).toFixed(0) + '" fill="rgb(' + g + ',' + g + ',' + (g + 40) + ')"/>'; } return s; }
const person3 = (x, y, z) => '<g transform="translate(' + x + ' ' + y + ') scale(' + z + ')"><circle cy="-250" r="44" fill="#3A3F80"/><rect x="-50" y="-200" width="100" height="160" rx="40" fill="#3A3F80"/><path d="M-22 -40 l-8 80 M22 -40 l8 80" stroke="#3A3F80" stroke-width="26" stroke-linecap="round"/><rect x="44" y="-150" width="26" height="44" rx="6" fill="#CFE9FF"/></g>';
WORLD.i3sicher = function (sc, ev, t, lt) { const fr = ev.frage, sc2 = ev.schloss, an = ev.anonym, re = ev.regler;
  let s = '';
  if (re === undefined) { s += data3(t);
    const SV = [730, 700];
    // Frage: Pin schwebt, Koepfe gucken
    const enc = sc2 === undefined ? 0 : cl((sc2 - .3) / .6), fly = sc2 === undefined ? 0 : ease(cl((sc2 - 1.6) / .9)), unl = sc2 === undefined ? 0 : cl((sc2 - 3.2) / .5);
    const px = lerp(560, SV[0], fly), py = lerp(920, SV[1] + 10, fly), pz = lerp(1.45, .5, fly);
    if (fr !== undefined && an === undefined) { [[170, 880], [910, 960], [300, 1080], [800, 1080]].forEach((p, i) => { const k = cl((fr - .2 - i * .15) / .3) * (1 - enc); if (k <= 0) return; s += '<g opacity="' + k.toFixed(2) + '" transform="translate(' + p[0] + ' ' + (p[1] + 40 * (1 - k)).toFixed(0) + ')"><circle r="40" fill="#3A3F80"/><circle cx="-12" cy="-4" r="6" fill="#FFE14D"/><circle cx="12" cy="-4" r="6" fill="#FFE14D"/><g transform="translate(36 -56)"><circle r="22" fill="#F4F6FB"/>' + svgT(0, 10, '?', 30, S3) + '</g></g>'; }); }
    if (an === undefined) { s += server3(SV[0], SV[1], sc2 === undefined ? 0 : cl((sc2 - 1.2) / .4), t, '', 1.2);
      if (enc < 1) s += pin3(px, py + 6 * Math.sin(t * 2), pz * (1 - .3 * enc), '#FF4D6D');
      if (enc > 0) { s += cipher3(px, py, pz * (.6 + .4 * ease(enc)), t, enc); s += lk3i(px, py - 60 * pz, pz * back(cl((enc - .3) / .5)), 0); if (enc < 1 && enc > .5) s += '<circle cx="' + px + '" cy="' + py + '" r="' + (80 + 200 * (enc - .5)).toFixed(0) + '" fill="none" stroke="#FFE14D" stroke-width="6" opacity="' + (2 * (1 - enc)).toFixed(2) + '"/>'; }
      // Schalti-Laptop rechts unten: Schluessel fliegt hoch, auf dem Laptop erscheint der Ort
      if (sc2 !== undefined && sc2 > 2.4) { const kk = cl((sc2 - 2.4) / .4), kf = ease(cl((sc2 - 2.8) / .6)); s += laptop3(560, 1100, 1.25 * back(kk), unl > 0 ? '<g opacity="' + unl.toFixed(2) + '"><path d="M-120 -120 H120 M-120 -70 H120 M-60 -170 V-30 M40 -170 V-30" stroke="#2A3270" stroke-width="5"/>' + pin3(0, -110, .45 * back(unl), '#5CFFB0') + '</g>' : '');
        if (kf < 1) s += ky3i(lerp(560, SV[0], kf), lerp(920, SV[1] + 60, kf) - 80 * Math.sin(Math.PI * kf), 1, -30 + 30 * kf);
        if (unl > 0 && unl < 1) s += '<circle cx="560" cy="970" r="' + (60 + 160 * unl).toFixed(0) + '" fill="none" stroke="#5CFFB0" stroke-width="6" opacity="' + (1 - unl).toFixed(2) + '"/>'; } }
    if (an !== undefined) { const k = cl(an / .4), mz = cl((an - .6) / 1);
      s += server3(SV[0], SV[1], 1, t, '<g transform="translate(-150 100)">' + '<circle r="40" fill="#F4F6FB" stroke="' + S3 + '" stroke-width="5"/>' + svgT(0, 14, '?', 46, S3) + '</g>', 1.2);
      s += '<g opacity="' + k.toFixed(2) + '">' + person3(330, 1100, 1.25) + (mz > 0 ? '<g transform="translate(330 ' + (1100 - 312) + ') scale(' + back(mz).toFixed(2) + ')"><circle r="62" fill="#5A607A" stroke="#CFE9FF" stroke-width="5" stroke-dasharray="10 8"/>' + svgT(0, 22, '?', 64, '#F4F6FB') + '</g>' : '') + '</g>';
      s += '<g opacity="' + k.toFixed(2) + '" transform="translate(700 960)">' + '<g transform="scale(.5)"><rect x="-116" y="-235" width="232" height="470" rx="42" fill="url(#ti3)" stroke="' + S3 + '" stroke-width="7"/><rect x="-104" y="-223" width="208" height="446" rx="32" fill="#04050C"/></g>' + (an > 1 ? '<g transform="translate(0 -10) scale(' + back(cl((an - 1) / .4)).toFixed(2) + ')"><circle r="40" fill="#5A607A" stroke="#CFE9FF" stroke-width="4" stroke-dasharray="8 6"/>' + svgT(0, 16, '?', 46, '#F4F6FB') + '</g>' : '') + '</g>';
      s += '<path d="M400 900 Q600 760 ' + (SV[0] - 120) + ' ' + (SV[1] + 30) + '" stroke="' + B3 + '" stroke-width="4" fill="none" stroke-dasharray="10 12" opacity=".6"/>'; }
  } else { // Abschalten am echten Bildschirm
    const k = cl(re / .5), tap = cl((re - 1.6) / .3), tog = cl((re - 1.8) / .4);
    s += bokeh3(t) + wave3(PI3c[0], PI3c[1], t, 1 - tog, 140, 560, .6);
    const zm = ease(cl((re - .7) / .6)), zc = [PI3c[0], PI3c[1] - 20], Z = 1 + 1.15 * zm;
    s += '<clipPath id="rg3c"><rect x="0" y="' + (715 * zm).toFixed(0) + '" width="1080" height="' + (1920 - 715 * zm - 790 * zm).toFixed(0) + '" rx="' + (30 * zm).toFixed(0) + '"/></clipPath><g clip-path="url(#rg3c)"><g transform="translate(' + zc[0] + ' ' + zc[1] + ') scale(' + Z.toFixed(3) + ') translate(' + -zc[0] + ' ' + -zc[1] + ')">' + iph3(PI3c[0], PI3c[1] + 10 + 40 * (1 - ease(k)), .9 + .15 * ease(k), { mode: 'power', slide: 0, hint: cl((re - 1) / .4), tog: tog, t: t, glow: .5 });
    if (re > 1.3) { const fx = PI3c[0], fy = PI3c[1] + 42 + 30 * (1 - ease(cl((re - 1.3) / .3))); s += '<circle cx="' + fx + '" cy="' + fy.toFixed(0) + '" r="26" fill="#fff" opacity=".55" stroke="' + S3 + '" stroke-width="3"/>' + (tap > 0 && tap < 1 ? '<circle cx="' + fx + '" cy="' + fy.toFixed(0) + '" r="' + (26 + 60 * tap).toFixed(0) + '" fill="none" stroke="#fff" stroke-width="5" opacity="' + (1 - tap).toFixed(2) + '"/>' : ''); }
    s += '</g></g>' + rain3(t, .7); }
  const lbO = re === undefined ? 1 : 1 - cl(re / .3); return W(s + shade3(), lbO > 0 ? '<div style="opacity:' + lbO.toFixed(3) + '">' + slot(ev, [['frage', 'Nur du kannst ihn lesen', 'hot']]) + '</div>' : ''); };
WMASC.i3sicher = (ev, t, lt) => { const fr = ev.frage, sc2 = ev.schloss, re = ev.regler; if (re !== undefined) return stay3([FX3, GY3], 1, { r: 2, mood: 'cool' }); if (sc2 !== undefined) return stay3([FX3, GY3], 1, { r: 0, mood: 'cool' }); const j = fr === undefined ? 0 : Math.sin(Math.PI * cl(fr / .5)); return stay3([FX3, GY3 - 20 * j], 1, { r: 0, mood: 'shock' }); };

// ---------- Schluss ----------
WORLD.i3out = function (sc, ev, t, lt) { const sv = ev.save; const on = sv === undefined ? 0 : cl(sv / .4);
  let s = bokeh3(t) + '<g transform="rotate(' + (4 * Math.sin(t * 1.2)).toFixed(1) + ' 840 1020)">' + iph3(840, 1020, .62, { mode: on > .5 ? 'lock' : 'off', t: t, glow: .7 + .3 * on, glowCol: B3 }) + '</g>';
  return W(s + rain3(t, .6) + shade3()); };
WMASC.i3out = (ev, t, lt) => { const sv = ev.save; if (sv !== undefined) return stay3([FX3, GY3], 1, { r: 0, mood: 'happy' }); return stay3([FX3, GY3], 1, { r: 2, mood: 'cool' }); };

['i3hook', 'i3aus', 'i3helf', 'i3sicher', 'i3out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, A3); });
