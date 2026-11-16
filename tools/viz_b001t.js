// Test fuer das Dino-Skript (16.11.2026): Einstieg von B001 in mehreren Fassungen. S.dv = { art: 'draw' | 'ki', look: 'c' | 'n' }.
// Figuren aus viz_dino.js, Hof aus viz_b001v3.js. Zum Loeschen: diese Datei und videos/B001T*.
function yardd(t, o) { return yardb(t, o) + '<defs><linearGradient id="ydd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04240F" stop-opacity="0"/><stop offset="1" stop-color="#04240F" stop-opacity=".5"/></linearGradient><radialGradient id="yds"><stop offset="0" stop-color="#FFF6C8" stop-opacity=".55"/><stop offset="1" stop-color="#FFF6C8" stop-opacity="0"/></radialGradient></defs><rect y="1050" width="1080" height="870" fill="url(#ydd)"/><circle cx="880" cy="740" r="420" fill="url(#yds)" opacity="' + (.5 * (1 - cl((o || {}).dark || 0))) + '"/>'; }
const RXT = [700, 1118];
WORLD.h7d1 = function (sc, ev, t, lt) { const D = S.dv || {}, L = D.look || 'c', KI = D.art === 'ki' && typeof KID !== 'undefined', e = ev.gag, hit = e !== undefined && e >= .5 ? e - .5 : undefined, sh = shake7(hit, t), look = since3(sc, 3, lt) >= 0;
  const hen = (x, y, z, o) => KI ? sprd(KID['hen' + L], x, y, 300 * z, t, { flip: o.flip, rot: -24 * (o.peck || 0) + (o.walk ? 5 * Math.sin(t * 15) : 0), sy: 1 + .02 * Math.sin(t * 3) + (o.flap ? .06 * Math.sin(t * 40) : 0) }) : hend(x, y, z, t, Object.assign({ look: L }, o));
  const rex = (x, y, z, o) => KI ? sprd(KID['rex' + L], x, y, 400 * z, t, { flip: o.flip, rot: (o.head || 0) * .4 + (o.run ? 6 * Math.sin(t * 13) : 0), sy: 1 + (o.jaw > .6 ? .04 * Math.sin(t * 44) : .012 * Math.sin(t * 2.2)) }) : rexd(x, y, z, t, Object.assign({ look: L }, o));
  let s = yardd(t, {});
  if (e === undefined) s += hen(RXT[0], RXT[1], 1.25, { peck: look ? 0 : Math.max(0, Math.sin(t * 5.2)) * (Math.sin(t * 1.3) > -.2 ? 1 : 0), tilt: look ? 16 : 0 });
  else if (e < 2.9) { const k = cl((e - .22) / .3);
    if (e < .42) s += hen(RXT[0] + 7 * Math.sin(t * 60), RXT[1], 1.25 + .6 * cl(e / .42), { flap: 1 });
    if (k > 0) { const ap = ease(cl((e - 1.1) / .6)), ch = cl((e - 1.95) / .85), x = ch > 0 ? lerp(640, 1760, ch * ch * .4 + ch * .6) : lerp(RXT[0], 640, ap), y = lerp(RXT[1], 1200, ap) - (ch > 0 ? 0 : 0), z = lerp(1.0, 1.25, ap) * back(k);
      const snap = e >= 1.7 && e < 1.9 ? Math.sin(Math.PI * (e - 1.7) / .2) : 0, jaw = e < 1.1 ? .75 + .25 * Math.abs(Math.sin(t * 24)) : ch > 0 ? .35 + .2 * Math.abs(Math.sin(t * 13)) : .12 + .88 * snap, head = e < 1.1 ? 6 : ch > 0 ? 0 : 30 * ap + 8 * snap;
      if (e >= .5 && e < 1.1 && !KI) s += roard(RXT[0] - 300, RXT[1] - 310, 110, t, cl((e - .5) / .15) * cl((1.1 - e) / .15));
      if (e >= .5 && e < 1.1 && KI) s += roard(RXT[0] - 250, RXT[1] - 330, 110, t, cl((e - .5) / .15) * cl((1.1 - e) / .15));
      s += rex(x, y, z, { jaw: jaw, head: head, run: ch > 0 || (ap > 0 && ap < 1), ph: ch > 0 ? undefined : e * 11, flip: ch > 0 }); }
    s += puffb(RXT[0], RXT[1] - 220, (e - .2) / .5, 250);
  } else { const k = ease(cl((e - 2.9) / .9)); s += hen(lerp(1280, RXT[0], k), RXT[1], 1.25, { walk: k < 1 }); }
  if (hit !== undefined && hit < 1.1) s += word7('RAWR!', 700, 655, hit, '#FFE14D', 6);
  return W('<g transform="translate(' + (sh[0] * .6) + ' ' + (sh[1] * .6) + ')">' + s + '</g>' + shade3()); };
// Schalti: wird vom Bruellen zurueckgedrueckt, erstarrt, als der T. rex an ihm schnuppert, und rennt los, als er zuschnappt
WMASC.h7d1 = (ev, t, lt, sc) => { const e = ev.gag;
  if (e === undefined) return since3(sc, 3, lt) < 0 ? stay3(HOME3, 1, { r: -2 + 2 * Math.sin(t * 2) }) : stay3([lerp(220, 290, ease(cl(since3(sc, 3, lt) / .5))), 1537], 1, { r: 9 });
  if (e < .5) return stay3([lerp(290, 220, cl(e / .3)), 1537], 1, { r: -14 * cl(e / .3) });
  if (e < 1.1) return stay3([lerp(220, 150, ease((e - .5) / .5)) + 5 * Math.sin(t * 44), 1537], 1, { r: -20 + 4 * Math.sin(t * 36) });
  if (e < 1.7) return stay3([lerp(150, 200, ease((e - 1.1) / .6)) + 2.5 * Math.sin(t * 50), 1537], 1, { r: -6 });
  if (e < 1.78) return stay3([200, 1537 - 60 * Math.sin(Math.PI * (e - 1.7) / .16)], 1, { r: -10 });
  return flee3(e, t, 1.78, 2.45, 2.95, 3.6); };
WORLD.h7d1 = (inner => (sc, ev, t, lt, E) => look3(inner(sc, ev, t, lt, E), sc, t, lt, '#A8E63C'))(WORLD.h7d1);
