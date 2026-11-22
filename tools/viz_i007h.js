// I007H "Woran erkennst du einen Fake-Shop?" (Informatik, Skript 4 mit Abschnitt 9, Kostuem I1 Hacker), stumme Demo v1 (22.11.2026).
// Ort (eigens gebaut): Zimmer am Abend vor dem Black Friday. Schreibtisch mit grossem Monitor, Fenster mit Nacht, Regal, Paket auf dem Boden.
// Pro Teil eine andere Hauptdarstellung:
//   Einstieg: Schalti reisst das Paket auf, es ist leer, der Karton schnappt nach ihm. Der Monitor blinkt mit -90 %.
//   Teil 1: Wissenschaftsmodus (verschluesselter Tunnel zum Shop, hinter der Fassade sitzt ein Betrueger).
//   Teil 2: Bildschirm (Kasse: Zahlarten verschwinden bis auf Vorkasse, Geld fliegt zum Fenster hinaus).
//   Teil 3: Gegenstand plus die eine Lupe (Siegel springt aus dem Bildschirm: echtes klappt zum Zertifikat, falsches kippt um, Lupe auf die Adresse).
// Zum Loeschen: diese Datei und videos/I007H.
var ACI7 = '#7C5CFF', STI7 = '#0B1020', GYI7 = 1537, XHI7 = 220, DTI7 = 1170, SCXI7 = 710, SCYI7 = 960;
const mvI7 = (a, b, k) => lerp(a, b, ease(cl(k)));

// ---------- Der Ort ----------
function roomI7(t, o) { o = o || {}; let s = '<defs><linearGradient id="wlI7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1A44"/><stop offset="1" stop-color="#3A2F6E"/></linearGradient><radialGradient id="glI7" cx=".62" cy=".5" r=".5"><stop offset="0" stop-color="#7CC8FF" stop-opacity=".25"/><stop offset="1" stop-color="#7CC8FF" stop-opacity="0"/></radialGradient></defs>';
  s += '<rect width="1080" height="1920" fill="url(#wlI7)"/><rect x="200" y="560" width="1080" height="900" fill="url(#glI7)"/>';
  // Fenster links mit Nacht und Stadt
  s += '<rect x="70" y="700" width="270" height="240" rx="10" fill="#0D1440" stroke="' + STI7 + '" stroke-width="8"/>';
  for (let i = 0; i < 6; i++) { const h = 50 + 70 * rnd(i + 3); s += '<rect x="' + (80 + i * 44) + '" y="' + (930 - h).toFixed(0) + '" width="40" height="' + h.toFixed(0) + '" fill="#232B66"/>'; for (let j = 0; j < 3; j++) if (rnd(i * 5 + j) > .45) s += '<rect x="' + (88 + i * 44 + (j % 2) * 16) + '" y="' + (940 - h + 14 + j * 22).toFixed(0) + '" width="8" height="8" fill="#FFD98A" opacity="' + (.5 + .4 * Math.sin(t + i + j)).toFixed(2) + '"/>'; }
  s += '<circle cx="290" cy="745" r="18" fill="#FFF3D0"/><path d="M205 700 V940 M70 820 H340" stroke="' + STI7 + '" stroke-width="7"/><rect x="58" y="936" width="294" height="16" rx="6" fill="#B9A8E0" stroke="' + STI7 + '" stroke-width="5"/>';
  // Regal rechts oben mit Buechern und Pflanze
  if (!o.noShelf) s += '<rect x="780" y="600" width="260" height="14" rx="5" fill="#A8774F" stroke="' + STI7 + '" stroke-width="5"/>';
  if (!o.noShelf) [['#FF6BD6', 790, 70], ['#5CE1FF', 822, 84], ['#FFE14D', 852, 64], ['#7BC74D', 880, 78]].forEach(([c, x, h]) => { s += '<rect x="' + x + '" y="' + (600 - h) + '" width="26" height="' + h + '" rx="4" fill="' + c + '" stroke="' + STI7 + '" stroke-width="4"/>'; });
  if (!o.noShelf) s += '<path d="M960 600 h50 l-6 -40 h-38 Z" fill="#C0654A" stroke="' + STI7 + '" stroke-width="4"/><path d="M985 560 q-30 -40 -10 -70 M985 560 q20 -50 40 -60 M985 560 q0 -50 -4 -80" stroke="#4FA84A" stroke-width="10" fill="none" stroke-linecap="round"/>';
  // Boden
  s += '<rect x="0" y="1540" width="1080" height="380" fill="#2A2350"/>'; for (let i = 0; i < 5; i++) s += '<path d="M0 ' + (1590 + i * 66) + ' H1080" stroke="#372E66" stroke-width="3"/>';
  s += '<ellipse cx="560" cy="1700" rx="420" ry="90" fill="#5B3F86" opacity=".8"/><ellipse cx="560" cy="1700" rx="380" ry="70" fill="none" stroke="#FF6BD6" stroke-width="4" stroke-dasharray="16 12" opacity=".6"/>';
  // Teppich, Schreibtisch mit Monitor, Tastatur, Tasse, Lampe
  s += '<rect x="400" y="' + DTI7 + '" width="640" height="30" rx="8" fill="#A8774F" stroke="' + STI7 + '" stroke-width="6"/><rect x="430" y="' + (DTI7 + 30) + '" width="24" height="' + (1540 - DTI7 - 30) + '" fill="#7A5236" stroke="' + STI7 + '" stroke-width="5"/><rect x="986" y="' + (DTI7 + 30) + '" width="24" height="' + (1540 - DTI7 - 30) + '" fill="#7A5236" stroke="' + STI7 + '" stroke-width="5"/>';
  s += '<rect x="690" y="1130" width="40" height="40" fill="#3A3F5A" stroke="' + STI7 + '" stroke-width="5"/><path d="M640 1170 h140 l-10 -12 h-120 Z" fill="#3A3F5A" stroke="' + STI7 + '" stroke-width="5"/>';
  s += '<rect x="560" y="1150" width="220" height="16" rx="5" fill="#C9CFDC" stroke="' + STI7 + '" stroke-width="4"/><rect x="820" y="1146" width="40" height="22" rx="10" fill="#C9CFDC" stroke="' + STI7 + '" stroke-width="4"/>';
  s += '<path d="M960 1170 v-24 a20 20 0 0 1 40 0 v24 Z" fill="#FF6BD6" stroke="' + STI7 + '" stroke-width="4"/>';
  s += '<path d="M440 1170 l20 -150 l40 -30" stroke="#5A6070" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M490 975 l50 -20 l20 40 Z" fill="#FFE14D" stroke="' + STI7 + '" stroke-width="4"/>';
  // Monitor (Rahmen), Inhalt kommt von aussen
  const z = 1.05 * (o.zoom || 1); s += '<g transform="translate(' + SCXI7 + ' ' + SCYI7 + ') scale(' + z.toFixed(3) + ')"><rect x="-250" y="-165" width="500" height="320" rx="16" fill="#1A1E33" stroke="' + STI7 + '" stroke-width="7"/><clipPath id="scI7"><rect x="-234" y="-150" width="468" height="290" rx="6"/></clipPath><g clip-path="url(#scI7)"><rect x="-234" y="-150" width="468" height="290" fill="#F4F6FB"/>' + (o.scr || '') + '</g></g>';
  // Stuhl entfernt (lag unter Untertitel und Sprechblase)
  return s; }

// Browser-Kopfzeile mit Schloss und Adresse (lk: Schloss leuchtet)
function barI7(lk, t) { const g = lk ? .5 + .5 * Math.sin(t * 8) : 0; return '<rect x="-234" y="-150" width="468" height="44" fill="#DDE2EE"/><rect x="-200" y="-140" width="400" height="26" rx="13" fill="#fff" stroke="#B8C0D4" stroke-width="2"/><g transform="translate(-182 -127)"><rect x="-8" y="-3" width="16" height="12" rx="2" fill="' + lc('#5A6070', '#2ECC71', lk ? 1 : 0) + '"/><path d="M-5 -3 v-4 a5 5 0 0 1 10 0 v4" stroke="' + lc('#5A6070', '#2ECC71', lk ? 1 : 0) + '" stroke-width="3" fill="none"/>' + (lk ? '<circle r="' + (16 + 6 * g).toFixed(1) + '" fill="none" stroke="#2ECC71" stroke-width="3" opacity="' + (1 - g).toFixed(2) + '"/>' : '') + '</g>' + svgT(-160, -121, 'https://www.mega-deal.example', 15, '#3A4060', 'start'); }
// Shopseite: Schuh mit -90 %
function shopI7(t, fl) { const b = fl ? .5 + .5 * Math.sin(t * 10) : 0; let s = barI7(0, t) + '<rect x="-234" y="-106" width="468" height="36" fill="#FF3B5C"/>' + svgT(0, -81, 'BLACK DEAL – NUR HEUTE', 20, '#fff');
  s += '<g transform="translate(-90 30)"><path d="M-100 24 L-96 -20 Q-90 -40 -60 -40 L-30 -60 Q0 -70 10 -50 L30 -16 Q70 -6 96 10 Q104 24 96 30 H-100 Z" fill="#5CE1FF" stroke="' + STI7 + '" stroke-width="5"/><rect x="-104" y="28" width="204" height="18" rx="8" fill="#fff" stroke="' + STI7 + '" stroke-width="4"/><path d="M-40 -44 l16 14 M-26 -52 l16 14 M-12 -58 l16 14" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M-60 0 Q0 -6 50 10" stroke="#FF6BD6" stroke-width="7" fill="none"/></g>';
  s += '<g transform="translate(120 0) scale(' + (1 + .12 * b).toFixed(3) + ')"><circle r="62" fill="#FFE14D" stroke="' + STI7 + '" stroke-width="5"/>' + svgT(0, 14, '−90 %', 34, STI7) + '</g>' + svgT(120, 98, '19,99 €', 26, '#FF3B5C') + '<path d="M92 82 l56 0" stroke="#999" stroke-width="2"/>';
  return s; }
// Kasse: vier Zahlarten, gone = 0..1 wie weit sie verschwunden sind (die letzte, Vorkasse, bleibt)
function payI7(t, gone, sel) { let s = barI7(1, t) + svgT(0, -78, 'Zahlung wählen', 24, STI7);
  const L = ['Rechnung', 'PayPal', 'Kreditkarte', 'Vorkasse'];
  L.forEach((n, i) => { const f = i < 3 ? cl(gone * 3 - i) : 0; if (f >= 1) return; const y = -40 + i * 46, x = f * -500;
    s += '<g transform="translate(' + x.toFixed(0) + ' ' + y + ')" opacity="' + (1 - f).toFixed(2) + '"><rect x="-170" y="-18" width="340" height="38" rx="10" fill="' + (i === 3 && sel ? '#FFE14D' : '#fff') + '" stroke="' + (i === 3 && sel ? '#FF3B5C' : '#B8C0D4') + '" stroke-width="' + (i === 3 && sel ? 5 : 3) + '"/><circle cx="-146" cy="1" r="9" fill="none" stroke="' + STI7 + '" stroke-width="3"/>' + (i === 3 && sel ? '<circle cx="-146" cy="1" r="5" fill="' + STI7 + '"/>' : '') + svgT(-124, 9, n, 22, STI7, 'start') + '</g>'; });
  return s; }
// Fusszeile mit Siegel
function sealFootI7(t, hi) { return shopI7(t, 0) + '<rect x="-234" y="104" width="468" height="36" fill="#E9ECF4"/><g transform="translate(-176 122)"><circle r="16" fill="#FFB020" stroke="' + STI7 + '" stroke-width="3"/><path d="M-6 0 l4 5 l9 -10" stroke="#fff" stroke-width="3" fill="none"/>' + (hi ? '<circle r="' + (24 + 8 * Math.sin(t * 8)).toFixed(1) + '" fill="none" stroke="#FF3B5C" stroke-width="3"/>' : '') + '</g>'; }
// Paket auf dem Boden: open 0..1 Laschen, chomp: Karton schnappt (Laschen klappen zu)
function boxI7(x, open, chomp, t) { const a = open * (1 - chomp) , y = GYI7; let s = '<ellipse cx="' + x + '" cy="' + (y + 4) + '" rx="140" ry="14" fill="#000" opacity=".3"/><rect x="' + (x - 120) + '" y="' + (y - 150) + '" width="240" height="150" fill="#C99A62" stroke="' + STI7 + '" stroke-width="6"/><path d="M' + (x - 120) + ' ' + (y - 110) + ' H' + (x + 120) + '" stroke="#A87B48" stroke-width="5"/>';
  s += '<path d="M' + (x - 30) + ' ' + (y - 150) + ' v150" stroke="#E8D6A8" stroke-width="16" opacity="' + (1 - open).toFixed(2) + '"/>';
  const L = -150 * Math.sin(a * Math.PI * .55), R = -150 * Math.sin(a * Math.PI * .55);
  s += '<path d="M' + (x - 120) + ' ' + (y - 150) + ' L' + (x - 120 + 110 * Math.cos(a * 1.7)).toFixed(0) + ' ' + (y - 150 + L * .8).toFixed(0) + '" stroke="#B88A55" stroke-width="16" stroke-linecap="round"/><path d="M' + (x + 120) + ' ' + (y - 150) + ' L' + (x + 120 - 110 * Math.cos(a * 1.7)).toFixed(0) + ' ' + (y - 150 + R * .8).toFixed(0) + '" stroke="#B88A55" stroke-width="16" stroke-linecap="round"/>';
  if (open > .5 && chomp < .5) s += '<rect x="' + (x - 104) + '" y="' + (y - 148) + '" width="208" height="20" fill="#2A1E12" opacity=".8"/>';
  if (chomp > 0) s += '<circle cx="' + (x - 40) + '" cy="' + (y - 100) + '" r="12" fill="#fff" stroke="' + STI7 + '" stroke-width="4"/><circle cx="' + (x - 40) + '" cy="' + (y - 100) + '" r="5" fill="' + STI7 + '"/><circle cx="' + (x + 40) + '" cy="' + (y - 100) + '" r="12" fill="#fff" stroke="' + STI7 + '" stroke-width="4"/><circle cx="' + (x + 40) + '" cy="' + (y - 100) + '" r="5" fill="' + STI7 + '"/>';
  return s; }
// Geldscheine, die aus dem Monitor zum Fenster fliegen
function moneyI7(k, t) { let s = ''; for (let i = 0; i < 9; i++) { const f = cl((k - i * .08) / .6); if (f <= 0 || f >= 1) continue; const e = ease(f), x = lerp(SCXI7, 205, e) + 40 * Math.sin(i), y = lerp(SCYI7, 820, e) - 160 * Math.sin(Math.PI * f) + 30 * Math.cos(i);
    s += '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ') rotate(' + (f * 540 + i * 40).toFixed(0) + ') scale(' + (1 - .5 * e).toFixed(2) + ')"><rect x="-40" y="-20" width="80" height="40" rx="6" fill="#7BC74D" stroke="' + STI7 + '" stroke-width="4"/><circle r="11" fill="#5AA83A" stroke="' + STI7 + '" stroke-width="3"/></g>'; } return s; }
// Siegel als grosser Gegenstand im Zimmer
function badgeI7(x, y, k, flip, fake, fall, lv) { lv = lv || 0; if (k <= 0) return ''; const e = back(cl(k)), sx = Math.cos(Math.PI * cl(flip)); let s = '<circle cx="' + x + '" cy="' + (y + 10) + '" r="' + (190 * cl(k * 2)).toFixed(0) + '" fill="#0B0A22" opacity=".6"/><g transform="translate(' + x + ' ' + y + ') rotate(' + (fall * 80).toFixed(1) + ' 0 110) scale(' + (e * Math.max(.05, Math.abs(sx))).toFixed(3) + ' ' + e.toFixed(3) + ')">';
  if (sx >= 0 || fake) { s += '<path d="M-40 90 L-60 150 L-20 130 L0 160 L10 100 Z M40 90 L60 150 L20 130 L0 160 L-10 100 Z" fill="#FF6BD6" stroke="' + STI7 + '" stroke-width="5"/><circle r="105" fill="' + (fake ? '#D8C08A' : '#FFB020') + '" stroke="' + STI7 + '" stroke-width="7"/><circle r="80" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="' + (fake ? '10 14' : '0') + '"/><path d="M-36 0 l26 28 l50 -56" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; if (fake) s += '<path d="M-60 -40 l30 20 l-10 30 l40 10" stroke="#8A6A3A" stroke-width="5" fill="none"/>'; }
  else s += '<rect x="-95" y="-120" width="190" height="240" rx="10" fill="#fff" stroke="' + STI7 + '" stroke-width="7"/>' + svgT(0, -70, 'ZERTIFIKAT', 26, STI7) + [[-30, 120], [0, 120], [30, 80]].map((q, i) => { const f = cl(lv * 2.5 - i); return '<path d="M-60 ' + q[0] + ' h' + (q[1] * f).toFixed(0) + '" stroke="#B8C0D4" stroke-width="8"/>' + (f >= 1 ? '<path d="M' + (q[1] - 50) + ' ' + (q[0] - 4) + ' l6 6 l12 -12" stroke="#2ECC71" stroke-width="5" fill="none"/>' : ''); }).join('') + (lv > 1.2 ? '<g transform="translate(45 75) scale(' + back(cl((lv - 1.2) / .4)).toFixed(3) + ') rotate(' + (-12 * Math.sin(lv * 3)).toFixed(1) + ')"><circle r="28" fill="#2ECC71" stroke="' + STI7 + '" stroke-width="5"/><path d="M-13 0 l10 10 l18 -20" stroke="#fff" stroke-width="7" fill="none"/></g>' : '');
  return s + '</g>'; }

// ---------- Wissenschaftsmodus Teil 1: verschluesselter Tunnel, hinter der Fassade sitzt der Betrueger ----------
function tunnelI7(t, k, rev) { let s = '';
  // Laptop links, Shop rechts
  s += '<g transform="translate(250 900)"><rect x="-110" y="-130" width="220" height="140" rx="12" fill="#2A2E44" stroke="#F4F6FB" stroke-width="5"/><rect x="-96" y="-116" width="192" height="112" rx="6" fill="#4B5C9E"/><path d="M-140 10 H140 L120 30 H-120 Z" fill="#8C93AD" stroke="#F4F6FB" stroke-width="5"/></g>';
  s += '<path d="M360 840 C480 780 620 780 720 840" stroke="#2ECC71" stroke-width="56" fill="none" opacity=".25" stroke-linecap="round"/><path d="M360 840 C480 780 620 780 720 840" stroke="#2ECC71" stroke-width="6" fill="none" stroke-dasharray="14 10" stroke-dashoffset="' + (-t * 80).toFixed(0) + '"/>';
  for (let i = 0; i < 4; i++) { const c = (t * .6 + i / 4) % 1, x = lerp(360, 720, c), y = 840 - 4 * 60 * c * (1 - c) + 0; s += '<g transform="translate(' + x.toFixed(0) + ' ' + y.toFixed(0) + ')" opacity="' + cl(k * 3).toFixed(2) + '"><rect x="-22" y="-16" width="44" height="32" rx="6" fill="#F4F6FB" stroke="' + STI7 + '" stroke-width="3"/><rect x="-8" y="-6" width="16" height="12" rx="2" fill="#2ECC71"/><path d="M-5 -6 v-4 a5 5 0 0 1 10 0 v4" stroke="#2ECC71" stroke-width="3" fill="none"/></g>'; }
  // Shop-Haus mit Fassade, die bei rev hochklappt
  s += '<g transform="translate(830 900)"><rect x="-120" y="-200" width="240" height="220" fill="#1B1F3A" stroke="#F4F6FB" stroke-width="5"/>';
  const r = ease(cl(rev)); // dahinter: Betrueger mit Sack, sammelt die Pakete
  s += '<g opacity="' + r.toFixed(2) + '"><circle cx="0" cy="-90" r="40" fill="#121426" stroke="#F4F6FB" stroke-width="4"/><rect x="-28" y="-104" width="56" height="16" rx="8" fill="#F4F6FB"/><circle cx="-12" cy="-96" r="5" fill="' + STI7 + '"/><circle cx="12" cy="-96" r="5" fill="' + STI7 + '"/><path d="M-60 20 Q-50 -40 0 -46 Q50 -40 60 20 Z" fill="#121426" stroke="#F4F6FB" stroke-width="4"/><path d="M50 -10 q50 -20 50 30 q-20 20 -50 0 Z" fill="#8A6A3A" stroke="#F4F6FB" stroke-width="4"/>' + svgT(76, 16, '€', 26, '#FFE14D') + '</g>';
  if (r > .5) for (let i = 0; i < 3; i++) { const c = (t * .9 + i / 3) % 1; s += '<g transform="translate(' + lerp(-200, 76, ease(c)).toFixed(0) + ' ' + (-40 - 120 * Math.sin(Math.PI * c)).toFixed(0) + ')" opacity="' + (r * (1 - c * c)).toFixed(2) + '"><circle r="20" fill="#FFE14D" stroke="' + STI7 + '" stroke-width="4"/>' + svgT(0, 8, '€', 22, STI7) + '</g>'; }
  s += '<g transform="translate(0 ' + (-110 * r).toFixed(0) + ')" opacity="' + (1 - r).toFixed(2) + '"><rect x="-120" y="-200" width="240" height="220" fill="#FF6BD6" stroke="#F4F6FB" stroke-width="5"/><rect x="-90" y="-180" width="180" height="50" rx="8" fill="#fff"/>' + svgT(0, -145, 'SHOP', 34, STI7) + '<rect x="-40" y="-90" width="80" height="110" fill="#FFE14D" stroke="#F4F6FB" stroke-width="4"/><rect x="-100" y="-110" width="44" height="44" fill="#9FD6FF" stroke="#F4F6FB" stroke-width="4"/><rect x="56" y="-110" width="44" height="44" fill="#9FD6FF" stroke="#F4F6FB" stroke-width="4"/></g></g>';
  return s; }

// ---------- Einstieg ----------
const BXI7 = 860;
WORLD.i7Hook = function (sc, ev, t, lt) { const fr = ev.frage, lo = ev.loop;
  const open = cl(lt / .7), chomp = Math.max(0, Math.sin(Math.PI * cl((lt - 1.1) / .5))) + (lt > 1.6 && lt < 2.6 ? Math.max(0, Math.sin(Math.PI * cl((lt - 2.0) / .4))) : 0);
  let s = roomI7(t, { scr: shopI7(t, fr !== undefined) });
  const wob = lt > 2.6 ? 7 * Math.sin(t * 7) * (.6 + .4 * Math.sin(t * 1.3)) : 0; s += '<g transform="rotate(' + wob.toFixed(2) + ' ' + BXI7 + ' ' + GYI7 + ')">' + boxI7(BXI7, open, cl(chomp), t) + '</g>';
  if (lt < .8) for (let i = 0; i < 6; i++) { const c = cl((lt - i * .05) / .6); s += '<rect x="' + (BXI7 - 30 + 120 * c * Math.cos(i)).toFixed(0) + '" y="' + (GYI7 - 160 - 120 * c + 200 * c * c).toFixed(0) + '" width="14" height="6" fill="#E8D6A8" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  if (lo !== undefined) { const c = (t * 1.2) % 1; s += '<circle cx="' + (SCXI7 + 120) + '" cy="' + (SCYI7) + '" r="' + (70 + 40 * c).toFixed(0) + '" fill="none" stroke="#FF3B5C" stroke-width="6" opacity="' + (1 - c).toFixed(2) + '"/>'; }
  return W(s + shade3()); };
WMASC.i7Hook = (ev, t, lt) => { const fr = ev.frage, lo = ev.loop;
  if (lt < 1.05) { const tug = Math.sin(t * 22) * (1 - cl(lt / .7)); return stay3([BXI7 - 285 + 6 * tug, GYI7], 1, { r: 8 + 6 * tug, mood: 'happy' }); } // zerrt am Klebeband
  if (lt < 2.6) { const j = cl((lt - 1.05) / .5), back2 = Math.sin(Math.PI * j); return stay3([mvI7(BXI7 - 285, XHI7, j), GYI7 - 30 * back2], 1, { r: -18 * back2, mood: 'shock' }); }
  if (lo !== undefined) return stay3([XHI7, GYI7 - 16 * Math.abs(Math.sin(Math.PI * cl(lo / .5)))], 1, { r: -6, mood: 'cool' });
  return stay3([XHI7, GYI7], 1, { r: 3 * Math.sin(t * 2), mood: fr !== undefined ? 'cool' : 'shock' }); };

// ---------- Teil 1: Schloss (Satz 1 normal am Bildschirm, Satz 2 im Wissenschaftsmodus) ----------
WORLD.i7Schloss = function (sc, ev, t, lt) { const sl = ev.schloss, tu = ev.tunnel; const bg = roomI7(t, { scr: tu !== undefined ? '<rect x="-234" y="-150" width="468" height="290" fill="#1B1F3A"/>' : shopI7(t, 0).replace(barI7(0, t), barI7(sl !== undefined && tu === undefined ? 1 : 0, t)), zoom: sl !== undefined && tu === undefined ? 1 + .1 * ease(cl(sl / .8)) : 1 }) + boxI7(BXI7, 1, 0, t);
  let s = fuse33(bg, sc, t, lt); const m = lab33(sc, t);
  if (sl !== undefined && tu === undefined) { const c = (t * 1.3) % 1; const zz = 1.05 * (1 + .1 * ease(cl(sl / .8))); s += '<circle cx="' + (SCXI7 - 182 * zz).toFixed(0) + '" cy="' + (SCYI7 - 127 * zz).toFixed(0) + '" r="' + (20 + 50 * c).toFixed(0) + '" fill="none" stroke="#2ECC71" stroke-width="6" opacity="' + (1 - c).toFixed(2) + '"/>'; const pk = cl((sl - .5) / .6), pe = back(pk); if (pk > 0) { const lx = lerp(SCXI7 - 182 * zz, SCXI7 - 60, ease(pk)), ly = lerp(SCYI7 - 127 * zz, SCYI7 - 30, ease(pk)), wb = 6 * Math.sin(t * 5); if (pk >= 1) s += '<path d="M' + (SCXI7 - 182 * zz).toFixed(0) + ' ' + (SCYI7 - 127 * zz + 14).toFixed(0) + ' L' + (lx - 40).toFixed(0) + ' ' + (ly - 40).toFixed(0) + '" stroke="#2ECC71" stroke-width="6" stroke-dasharray="12 10" stroke-dashoffset="' + (-t * 60).toFixed(0) + '"/>'; const snap = 1 + .12 * Math.max(0, Math.sin(Math.PI * ((t * .8) % 1) * 2)) * (pk >= 1 ? 1 : 0); s += '<g transform="translate(' + lx.toFixed(0) + ' ' + (ly + wb).toFixed(0) + ') scale(' + (2.6 * pe * snap).toFixed(3) + ')"><circle r="46" fill="#0B0A22" opacity=".55"/><rect x="-24" y="-8" width="48" height="38" rx="8" fill="#2ECC71" stroke="' + STI7 + '" stroke-width="4"/><path d="M-14 -8 v-10 a14 14 0 0 1 28 0 v10" stroke="#2ECC71" stroke-width="7" fill="none"/><circle cy="10" r="5" fill="' + STI7 + '"/></g>'; } }
  if (m > .01) s += '<g opacity="' + m.toFixed(3) + '">' + lab33dots() + tunnelI7(t, tu === undefined ? 0 : cl(tu / .4), tu === undefined ? 0 : cl((tu - 1.6) / 1)) + '</g>';
  return W(s + shade3(), slot(ev, [['schloss', 'Schloss = verschlüsselt'], ['tunnel', 'Sagt nichts über den Händler', 'hot']])); };
WMASC.i7Schloss = (ev, t, lt) => { const sl = ev.schloss, tu = ev.tunnel;
  if (tu !== undefined) { const j = Math.sin(Math.PI * cl((tu - 1.6) / .6)); return stay3([XHI7 - 20, GYI7 - 30 * j], 1, { r: -8 * j, mood: tu > 1.7 ? 'shock' : 'happy' }); }
  const reach = sl === undefined ? 0 : Math.sin(Math.PI * cl((sl - .3) / 1.2)); return stay3([mvI7(XHI7, 330, sl === undefined ? lt / .6 : 1), GYI7 - 18 * reach], 1, { r: 14 * reach, mood: 'happy' }); };

// ---------- Teil 2: Vorkasse (Bildschirm) ----------
WORLD.i7Kasse = function (sc, ev, t, lt) { const rh = ev.rehook, za = ev.zahl, we = ev.weg;
  const gone = za === undefined ? 0 : cl((za - 1.4) / 1.8), sel = za !== undefined && za > 3.4;
  let s = roomI7(t, { scr: rh !== undefined && za === undefined ? shopI7(t, 1) : payI7(t, gone, sel || we !== undefined), zoom: za !== undefined ? 1 + .1 * ease(cl(za / .8)) : 1 + .05 * Math.sin(Math.PI * cl((rh || 0) / 1)) }) + boxI7(BXI7, 1, 0, t);
  if (we !== undefined) { s += moneyI7(cl(we / 2.2), t); const k = cl((we - .3) / .4); s += '<rect x="70" y="700" width="270" height="240" fill="#FF3B5C" opacity="' + (.18 * k * (.5 + .5 * Math.sin(t * 9))).toFixed(2) + '"/>'; }
  return W(s + shade3(), slot(ev, [['zahl', 'Am Ende nur Vorkasse', 'hot'], ['weg', 'Geld meist weg', 'red']])); };
WMASC.i7Kasse = (ev, t, lt) => { const rh = ev.rehook, za = ev.zahl, we = ev.weg;
  if (we !== undefined) { const j = Math.abs(Math.sin(t * 6)) * cl(we / .3) * (1 - cl((we - 2) / .4)); return stay3([mvI7(330, 250, we / 1), GYI7 - 22 * j], 1, { r: -14 * j, mood: 'shock' }); }
  if (za !== undefined) { const tap = Math.abs(Math.sin(Math.PI * cl((za - 3.2) / .4))); return stay3([330, GYI7 - 20 * tap], 1, { r: 16 * tap, mood: za > 1.4 ? 'shock' : 'happy' }); }
  return stay3([mvI7(XHI7 - 20, 330, lt / .8), GYI7 - 26 * Math.sin(Math.PI * cl(lt / .8))], 1, { r: 3, mood: 'cool' }); };

// ---------- Teil 3: Siegel und Fakeshop-Finder (Gegenstand, die eine Lupe) ----------
function lupeUrlI7(t, k) { return '<rect x="-320" y="-320" width="640" height="640" fill="#F4F6FB"/><rect x="-280" y="-80" width="560" height="80" rx="40" fill="#fff" stroke="#B8C0D4" stroke-width="5"/>' + svgT(-240, -26, 'mega-deal.example', 46, '#3A4060', 'start') + (k > .5 ? '<path d="M-240 14 H' + (-240 + 480 * cl((k - .5) * 1.2)).toFixed(0) + '" stroke="#FF3B5C" stroke-width="8" stroke-linecap="round"/><circle cx="-90" cy="120" r="' + (44 + 22 * ((t * 1.5) % 1)).toFixed(0) + '" fill="none" stroke="#FF3B5C" stroke-width="6" opacity="' + (1 - (t * 1.5) % 1).toFixed(2) + '"/>' : '') + '<g transform="translate(0 120)"><rect x="-150" y="-60" width="300" height="120" rx="20" fill="' + STI7 + '"/>' + ['#FF3B5C', '#FFB020', '#2ECC71'].map((c, i) => '<circle cx="' + (-90 + i * 90) + '" cy="0" r="38" fill="' + c + '" opacity="' + (i === 0 ? (k > .5 ? .35 + .65 * Math.abs(Math.sin(t * 5)) : .25) : (k > .5 ? .2 : .25 + .5 * Math.abs(Math.sin(t * 6 + i)))).toFixed(2) + '"/>').join('') + '</g>'; }
WORLD.i7Siegel = function (sc, ev, t, lt) { const rh = ev.rehook, si = ev.siegel, fk = ev.fake, fi = ev.finder;
  const dim = si === undefined ? 0 : cl(si / .4); let s = roomI7(t, { scr: dim > .5 ? '<rect x="-234" y="-150" width="468" height="290" fill="#1B1F3A"/>' + barI7(0, t) : sealFootI7(t, rh !== undefined && si === undefined) }) + boxI7(BXI7, 1, 0, t);
  if (si !== undefined && fi === undefined) { const k = cl(si / .5), fl = cl((si - 1.6) / .5); s += badgeI7(lerp(SCXI7 - 200, SCXI7, ease(k)), lerp(SCYI7 + 140, SCYI7 - 20, ease(k)), k * (fk === undefined ? 1 : 1 - cl(fk / .3)), fl, 0, 0, cl((si - 2.1) / 2)); if (fl >= 1 && fk === undefined) { const cc = (t * 1.4) % 1; s += '<path d="M' + (SCXI7 + 120) + ' ' + (SCYI7 + 70 - 20 * Math.abs(Math.sin(t * 4))) + ' l0 46 l12 -12 l14 26 l10 -5 l-13 -25 l18 -2 Z" fill="#fff" stroke="' + STI7 + '" stroke-width="4"/>'; } }
  if (fk !== undefined && fi === undefined) { const k = cl((fk - .2) / .5), fall = ease(cl((fk - 1.8) / .5)); s += badgeI7(SCXI7, SCYI7 - 20, k * (1 - cl((fall - .85) / .15)), 0, 1, fall); if (fall > .9) s += '<rect x="' + (SCXI7 - 80) + '" y="' + (SCYI7 - 140) + '" width="160" height="230" fill="#0B0A22" opacity=".85" stroke="#F4F6FB" stroke-width="5" stroke-dasharray="14 10"/>' + svgT(SCXI7, SCYI7, '?', 90, '#F4F6FB'); }
  if (fi !== undefined) s += lupeH(SCXI7 - 30, SCYI7 - 70, 200, lupeUrlI7(t, (fi > 1.6 ? .5 + cl((fi - 1.6) / 1.5) : 0)), ease(cl(fi / .5)), SCXI7 - 120, SCYI7 - 146);
  return W(s + shade3(), slot(ev, [['siegel', 'Siegel anklicken', 'hot'], ['fake', 'Fake: Klick ins Leere', 'red'], ['finder', 'Fakeshop-Finder prüft']])); };
WMASC.i7Siegel = (ev, t, lt) => { const rh = ev.rehook, si = ev.siegel, fk = ev.fake, fi = ev.finder;
  if (fi !== undefined) return stay3([XHI7, GYI7 - 22 * Math.abs(Math.sin(Math.PI * cl((fi - 1.6) / .5)))], 1, { r: 3, mood: fi > 1.8 ? 'cool' : 'happy' });
  if (fk !== undefined) { const tap = Math.sin(Math.PI * cl((fk - 1.2) / .5)); return stay3([lerp(420, 250, cl(fk / .6)), GYI7 - 28 * tap], 1, { r: 8 * tap, mood: fk > 2 ? 'shock' : 'happy' }); }
  if (si !== undefined) { const tap = Math.sin(Math.PI * cl((si - 1.2) / .5)); return stay3([mvI7(330, 420, si / .8), GYI7 - 28 * tap], 1, { r: 18 * tap, mood: 'happy' }); }
  return stay3([mvI7(250, 330, lt / .8), GYI7 - 24 * Math.sin(Math.PI * cl(lt / .8))], 1, { r: 3, mood: 'cool' }); };

// ---------- Schluss ----------
function outIconI7(ev, t, lt) { const off = cl(lt / .5); let s = '<rect x="-234" y="-150" width="468" height="290" fill="#0E1238"/>'; if (off < 1) s += '<rect x="-234" y="' + (-150 * (1 - off) - 2).toFixed(0) + '" width="468" height="' + (290 * (1 - off) + 4).toFixed(0) + '" fill="#F4F6FB" opacity="' + (1 - off).toFixed(2) + '"/>';
  const ic = ev.c3 !== undefined ? ['c3', ev.c3] : ev.c2 !== undefined ? ['c2', ev.c2] : ev.c1 !== undefined ? ['c1', ev.c1] : null; if (!ic) return s; const e = back(cl(ic[1] / .4)), b = 1 + .14 * Math.abs(Math.sin(t * 4));
  let g = ''; if (ic[0] === 'c1') g = '<rect x="-40" y="-14" width="80" height="64" rx="12" fill="#2ECC71" stroke="#F4F6FB" stroke-width="5"/><path d="M-24 -14 v-16 a24 24 0 0 1 48 0 v16" stroke="#2ECC71" stroke-width="10" fill="none"/>';
  else if (ic[0] === 'c2') g = '<rect x="-70" y="-40" width="140" height="80" rx="10" fill="#7BC74D" stroke="#F4F6FB" stroke-width="5"/><circle r="22" fill="#5AA83A" stroke="#F4F6FB" stroke-width="4"/><path d="M-90 -60 L90 60" stroke="#FF3B5C" stroke-width="12" stroke-linecap="round"/>';
  else g = '<circle r="62" fill="#FFB020" stroke="#F4F6FB" stroke-width="6"/><path d="M-24 0 l18 20 l34 -40" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M60 40 l0 40 l10 -10 l12 22 l8 -4 l-11 -22 l15 -2 Z" fill="#fff" stroke="' + STI7 + '" stroke-width="3"/>';
  return s + '<g transform="scale(' + (e * b).toFixed(3) + ')">' + g + '</g>'; }
WORLD.i7Out = function (sc, ev, t, lt) { return W(roomI7(t, { scr: outIconI7(ev, t, lt), noShelf: 1 }) + boxI7(BXI7, 1, 0, t) + shade3()); };
WMASC.i7Out = (ev, t, lt) => stay3([mvI7(XHI7, XHI7, 1), GYI7 - 10 * Math.abs(Math.sin(t * 4)) * (lt < 3 ? 1 : 0)], 1, { r: 3 * Math.sin(t * 2), mood: ev.save !== undefined ? 'happy' : undefined });

['i7Hook', 'i7Schloss', 'i7Kasse', 'i7Siegel', 'i7Out'].forEach(n => { const inner = WORLD[n]; WORLD[n] = (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, ACI7); });
