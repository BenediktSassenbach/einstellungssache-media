// Serie "Schicht fuer Schicht" (Skript Schicht fuer Schicht Anatomie): ein Koerperteil wird von innen nach aussen aufgebaut.
// Bausteine: Saal mit Schichten-Tafel (saalS), Lupe (lupeS), Knie von vorn in sechs Schichten (kneeS, kneeLayS).
const COLS = { bone: '#FFF6DF', cart: '#6FC3F0', men: '#35D0BA', lig: '#FFD166', cap: '#FF9FB8', flu: '#BFE9FF', ten: '#E9C48A', mus: '#E8607A', hl: '#A8E63C' };
const KOS = 'stroke="#0B1020" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"';
const chalkS = (x, y, txt, sz, anchor, op) => '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" font-size="' + sz + '" font-weight="800" font-family="Inter Display" fill="#F4F6FB" opacity="' + (op === undefined ? .92 : op) + '">' + txt + '</text>';
// Saal: Tafel links mit der Schichten-Liste, Podest rechts fuer das Modell.
// o.rows = [[Name, Farbe], ...], o.on = wie viele Zeilen sichtbar (Kommazahl blendet ein), o.cur = gerade erklaerte Zeile (1 bis n), o.noList blendet die Liste aus
function saalS(t, o) { o = o || {}; let s = room3(t, { a: '#101A33', b: '#1B2C52', c: '#263E6E', fl: '#2A2F45', fs: '#3A4060', ln: '#A8E63C', id: 's7', glow: [720, 900, 460, 420, '#A8E63C', .3] });
  s += '<rect x="56" y="650" width="402" height="408" rx="14" fill="#7A5230" stroke="#0B1020" stroke-width="6"/><rect id="tafelS" x="74" y="668" width="366" height="372" rx="6" fill="#1F5A46"/><rect x="74" y="668" width="366" height="372" rx="6" fill="#000" opacity=".12"/>';
  if (!o.noList) { s += '<g id="listeS" data-in="tafelS">' + chalkS(257, 724, 'Schicht für Schicht', 34) + '<path d="M106 738 q150 8 302 -3" stroke="#F4F6FB" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>';
    (o.rows || []).forEach(([n, c], i) => { const k = cl((o.on || 0) - i), y = 800 + i * 46, cur = o.cur === i + 1;
      if (cur) s += '<rect x="88" y="' + (y - 34) + '" width="338" height="44" rx="10" fill="#A8E63C" opacity="' + (.2 + .08 * Math.sin(t * 5)).toFixed(2) + '"/>';
      s += '<circle cx="116" cy="' + (y - 12) + '" r="14" fill="' + (k > 0 ? c : 'none') + '" stroke="' + (k > 0 ? '#0B1020' : '#F4F6FB') + '" stroke-width="3" opacity="' + (k > 0 ? 1 : .35) + '"/>' + chalkS(146, y, (i + 1) + '  ' + (k > 0 ? n : '· · ·'), 37, 'start', k > 0 ? lerp(.3, .95, k) : .3); });
    s += '</g>'; }
  s += '<rect x="640" y="1132" width="344" height="420" rx="10" fill="#6B4A2E" stroke="#0B1020" stroke-width="6"/><rect x="620" y="1118" width="384" height="30" rx="10" fill="#8B5E3C" stroke="#0B1020" stroke-width="6"/><path d="M664 1180 H960 M664 1420 H960" stroke="#4A3320" stroke-width="5" opacity=".6"/>';
  return s; }
// Lupe unten links neben dem Modell: zeigt eine Stelle als einfaches Schema. inner = SVG um 0/0 (rund 90 breit), k = Einblenden 0 bis 1, [tx, ty] = Stelle am Modell
function lupeS(inner, k, tx, ty) { if (!(k > 0)) return ''; const cx = 530, cy = 1066, r = 60;
  return '<g id="lupeS" opacity="' + cl(k).toFixed(2) + '"><path d="M' + (cx + 44) + ' ' + (cy - 44) + ' L' + tx + ' ' + ty + '" stroke="#A8E63C" stroke-width="5" stroke-dasharray="12 10" opacity=".9"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#101A33" stroke="#A8E63C" stroke-width="6"/><g transform="translate(' + cx + ' ' + cy + ')">' + inner + '</g></g>'; }
const lupRF = (t, men) => { const g = men ? COLS.men : COLS.hl, op = men ? 1 : (.55 + .45 * Math.sin(t * 6)).toFixed(2); return '<rect x="-44" y="14" width="88" height="18" rx="4" fill="' + COLS.bone + '" stroke="#0B1020" stroke-width="4"/><circle cx="0" cy="-13" r="27" fill="' + COLS.bone + '" stroke="#0B1020" stroke-width="4"/><path d="M-42 12 L-12 12 Q-24 6 -27 -8 Z M42 12 L12 12 Q24 6 27 -8 Z" fill="' + g + '" stroke="#0B1020" stroke-width="' + (men ? 3 : 0) + '" opacity="' + op + '"/>'; };
const lupTop = () => '<ellipse cx="0" cy="0" rx="46" ry="32" fill="' + COLS.bone + '" stroke="#0B1020" stroke-width="4"/><path d="M-12 -15 A17 17 0 1 0 -12 15 M12 -15 A17 17 0 1 1 12 15" stroke="#0B1020" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M-12 -15 A17 17 0 1 0 -12 15 M12 -15 A17 17 0 1 1 12 15" stroke="' + COLS.men + '" stroke-width="9" fill="none" stroke-linecap="round"/>';
const lupHeb = (t, k) => '<circle cx="-16" cy="0" r="9" fill="' + COLS.bone + '" stroke="#0B1020" stroke-width="4"/><path d="M-2 -42 V42" stroke="' + COLS.ten + '" stroke-width="6" stroke-dasharray="7 7" opacity="' + (1 - .7 * k).toFixed(2) + '"/><g opacity="' + k.toFixed(2) + '"><ellipse cx="12" cy="0" rx="10" ry="17" fill="' + COLS.bone + '" stroke="#0B1020" stroke-width="4"/><path d="M-2 -42 Q40 0 -2 42" stroke="#0B1020" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M-2 -42 Q40 0 -2 42" stroke="' + COLS.ten + '" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-6 0 H18" stroke="#A8E63C" stroke-width="5" stroke-linecap="round"/></g>';
// ---- Knie von vorn. Einzelne Schichten als eigene Zeichnungen um 0/0 (Gelenkspalt), damit sie einzeln einfliegen koennen.
const KFEM = 'M-34 -200 L-34 -150 C-38 -112 -110 -104 -110 -56 C-110 -16 -82 -4 -56 -4 C-36 -4 -26 -18 -22 -42 Q0 -64 22 -42 C26 -18 36 -4 56 -4 C82 -4 110 -16 110 -56 C110 -104 38 -112 34 -150 L34 -200 Z';
const KTIB = 'M-106 28 C-106 14 -60 14 -22 17 L-9 6 L0 15 L9 6 L22 17 C60 14 106 14 106 28 C106 62 44 78 34 128 L34 200 L-34 200 L-34 128 C-44 78 -106 62 -106 28 Z';
const KPAT = 'M-36 -84 Q0 -100 36 -84 Q44 -52 0 -18 Q-44 -52 -36 -84 Z';
const two = (d, w, c) => '<path d="' + d + '" stroke="#0B1020" stroke-width="' + (w + 7) + '" fill="none" stroke-linecap="round"/><path d="' + d + '" stroke="' + c + '" stroke-width="' + w + '" fill="none" stroke-linecap="round"/>';
const kneeLayS = {
  femur: (hl) => '<path d="' + KFEM + '" fill="' + (hl ? '#DDF5A8' : COLS.bone) + '" ' + KOS + '/><path d="M-18 -190 V-130" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/>',
  tibia: (hl) => '<path d="M92 74 C92 58 128 58 128 76 L122 200 L100 200 Z" fill="#EFE4C6" ' + KOS + '/><path d="' + KTIB + '" fill="' + (hl ? '#DDF5A8' : COLS.bone) + '" ' + KOS + '/><path d="M-18 130 V190" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/>',
  patella: (hl) => '<path d="' + KPAT + '" fill="' + (hl ? '#DDF5A8' : COLS.bone) + '" ' + KOS + '/>',
  cartF: () => two('M-108 -44 C-104 -12 -80 0 -56 0 C-38 0 -28 -12 -24 -30', 10, COLS.cart) + two('M108 -44 C104 -12 80 0 56 0 C38 0 28 -12 24 -30', 10, COLS.cart),
  cartT: () => two('M-102 22 C-70 13 -44 13 -26 16', 10, COLS.cart) + two('M102 22 C70 13 44 13 26 16', 10, COLS.cart),
  menL: () => '<path d="M-120 -8 Q-128 8 -120 24 L-62 9 Z" fill="' + COLS.men + '" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/>',
  menR: () => '<path d="M120 -8 Q128 8 120 24 L62 9 Z" fill="' + COLS.men + '" stroke="#0B1020" stroke-width="5" stroke-linejoin="round"/>',
  cruc: () => two('M-10 18 L14 -46', 8, COLS.lig) + two('M10 18 L-14 -46', 8, COLS.lig),
  coll: () => two('M-108 -80 C-120 -30 -118 30 -102 72', 13, COLS.lig) + two('M108 -80 C120 -30 120 30 114 70', 8, COLS.lig),
  fluid: (t) => { let d = ''; for (let i = 0; i < 3; i++) { const x = -70 + 70 * i + 12 * Math.sin(t * 1.6 + i * 2); d += '<ellipse cx="' + x.toFixed(1) + '" cy="' + (8 + 2 * Math.sin(t * 3 + i)).toFixed(1) + '" rx="10" ry="4" fill="#fff" opacity=".8"/>'; } return '<path d="M-106 -30 C-92 2 -60 6 -40 4 L-24 -26 Q0 -48 24 -26 L40 4 C60 6 92 2 106 -30 L108 26 C60 12 -60 12 -108 26 Z" fill="' + COLS.flu + '" opacity=".75"/>' + d; },
  caps: () => '<path d="M-128 -108 C-152 -40 -152 30 -124 86 C-60 102 60 102 124 86 C152 30 152 -40 128 -108 C60 -124 -60 -124 -128 -108 Z" fill="' + COLS.cap + '" fill-opacity=".34" stroke="#FF6F98" stroke-width="6" stroke-linejoin="round"/>',
  muscle: (t, pull) => { const w = 1 + .1 * (pull || 0); return '<g transform="translate(0 -200) scale(' + w.toFixed(3) + ' ' + (1 - .06 * (pull || 0)).toFixed(3) + ') translate(0 200)"><path d="M-52 -200 L52 -200 C56 -170 44 -140 28 -126 L-28 -126 C-44 -140 -56 -170 -52 -200 Z" fill="' + COLS.mus + '" ' + KOS + '/><path d="M-26 -194 Q-22 -160 -12 -134 M0 -194 V-134 M26 -194 Q22 -160 12 -134" stroke="#0B1020" stroke-width="3" opacity=".35" fill="none"/></g>'; },
  tendon: (hole) => '<path d="M-28 -128 L28 -128 L30 -90 L30 -30 L20 40 L14 94 L-14 94 L-20 40 L-30 -30 L-30 -90 Z" fill="' + COLS.ten + '" ' + KOS + '/>' + (hole ? '<path d="' + KPAT + '" fill="#0B1020" opacity=".25" stroke="#0B1020" stroke-width="4" stroke-dasharray="9 8"/>' : '')
};
// Ganzes Knie. o.l = [Knochen, Knorpel, Menisken, Baender, Kapsel, Sehne] je 0 bis 1 (Einblenden), o.pat = Kniescheibe 0 (schwebt daneben) bis 1 (sitzt in der Sehne),
// o.fdx/o.fdy = Oberschenkel verschieben, o.pull = Muskel zieht (0 bis 1), o.hlB = 'f' | 't' | 'p' Knochen hervorheben, o.q = Fragezeichen an der Kniescheibe (0 bis 1)
function kneeS(x, y, s, t, o) { o = o || {}; const l = o.l || [1, 1, 1, 1, 1, 1], L = kneeLayS, g = (k, inner, tf) => k > 0 ? '<g opacity="' + cl(k).toFixed(2) + '"' + (tf ? ' transform="' + tf + '"' : '') + '>' + inner + '</g>' : '';
  const b = ease(cl(l[0])), fd = 'translate(' + (o.fdx || 0).toFixed(1) + ' ' + ((o.fdy || 0) - 150 * (1 - b)).toFixed(1) + ')', pat = ease(cl(o.pat || 0)), pull = o.pull || 0;
  let s2 = '';
  s2 += g(l[0], L.tibia(o.hlB === 't'), 'translate(0 ' + (150 * (1 - b)).toFixed(1) + ')');
  s2 += g(l[4] * .999, L.fluid(t));
  s2 += g(l[0], L.femur(o.hlB === 'f'), fd);
  s2 += g(l[1], L.cartT()) + g(l[1], L.cartF(), fd);
  const m = ease(cl(l[2])); s2 += g(l[2], L.menL(), 'translate(' + (-70 * (1 - m)).toFixed(1) + ' 0)') + g(l[2], L.menR(), 'translate(' + (70 * (1 - m)).toFixed(1) + ' 0)');
  const li = ease(cl(l[3])); s2 += g(l[3], L.cruc(), 'scale(1 ' + lerp(.3, 1, li).toFixed(3) + ')') + g(l[3], L.coll(), 'scale(' + lerp(1.3, 1, li).toFixed(3) + ' 1)');
  const c = cl(l[4]); s2 += g(l[4], L.caps(), 'scale(' + lerp(.7, 1, ease(c)).toFixed(3) + ')');
  const te = ease(cl(l[5])); if (te > 0) s2 += '<clipPath id="tenS"><rect x="-80" y="-210" width="160" height="' + (310 * te).toFixed(1) + '"/></clipPath><g clip-path="url(#tenS)">' + L.muscle(t, pull) + L.tendon(pat < .98) + '</g>';
  if (l[0] > 0) { const px = lerp(-158, 0, pat), py = lerp(-74 + 7 * Math.sin(t * 2.4), -9 * pull, pat); s2 += '<g opacity="' + cl(l[0]).toFixed(2) + '" transform="translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ')">' + L.patella(o.hlB === 'p') + '</g>';
    if (o.q > 0 && pat < .1) s2 += '<text x="' + (px - 62) + '" y="' + (py - 34) + '" text-anchor="middle" font-size="54" font-weight="900" font-family="Inter Display" fill="#A8E63C" stroke="#0B1020" stroke-width="3" opacity="' + cl(o.q).toFixed(2) + '">?</text>'; }
  return '<g id="knieS" transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + s2 + '</g>'; }
