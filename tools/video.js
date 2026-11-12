// Video-Generator Einstellungssache (Schalti, 1080x1920, 30 fps)
// node tools/video.js videos/V001/script.json <Ausgabeordner> [--frames 3.5,20,40] [--audio stimme.mp3]
// Zeiten: videos/VNNN/zeiten.json ({"dauer":[Sekunden pro Zeile]}) falls vorhanden, sonst Schaetzung nach Zeichenzahl.
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');
const FPS = 30, W = 1080, H = 1920, GAP = 0.22, CPS = 14.5;
const args = process.argv.slice(2);
const scriptPath = args[0], out = args[1];
const opt = k => { const i = args.indexOf(k); return i > 0 ? args[i + 1] : null; };
const S = JSON.parse(fs.readFileSync(scriptPath, 'utf8'));
const zeitenPath = path.join(path.dirname(scriptPath), 'zeiten.json');
const zeiten = fs.existsSync(zeitenPath) ? JSON.parse(fs.readFileSync(zeitenPath, 'utf8')).dauer : null;

// ---- Zeitplan: jede Zeile bekommt Start und Ende, jede Szene eine ganze Zahl an Frames
let t = 0, li = 0;
for (const sc of S.scenes) {
  sc.start = t; t += 0.35;
  for (const l of sc.lines) {
    const d = zeiten ? zeiten[li] : Math.max(0.9, l.t.length / CPS);
    l.start = t; l.end = t + d; t = l.end + GAP; li++;
  }
  t += sc.type === 'outro' ? 1.6 : 0.45;
  t = Math.round(t * FPS) / FPS; sc.end = t;
}
S.total = t;

// ---- Seite: draw(t) zeichnet den Zustand zur Zeit t
const page = `<!doctype html><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;background:#0B1020;color:#F4F6FB;font-family:'Inter Display','Inter',sans-serif;position:relative;overflow:hidden}
.blob{position:absolute;border-radius:50%;background:#131C38}
.b1{width:1100px;height:1100px;right:-430px;top:-400px}.b2{width:520px;height:520px;left:-200px;bottom:120px}
.brand{position:absolute;left:84px;top:118px;display:flex;align-items:center;gap:18px;font-size:34px;font-weight:700;color:#AEB9D6}
.tg{width:74px;height:40px;border-radius:20px;background:var(--a);position:relative;display:inline-block}.tg i{position:absolute;right:5px;top:5px;width:30px;height:30px;border-radius:50%;background:#0B1020}
.prog{position:absolute;left:84px;right:84px;top:190px;height:10px;border-radius:5px;background:#18223F}.prog i{display:block;height:10px;border-radius:5px;background:var(--a)}
#stage{position:absolute;left:84px;width:856px;top:230px;height:960px}
h1{font-size:112px;line-height:1.02;font-weight:900;letter-spacing:-.04em}
h1 b,.hl{color:#0B1020;background:var(--a);padding:0 16px;border-radius:20px;display:inline-block;transform:rotate(-2deg);font-weight:900}
.top{display:flex;align-items:center;gap:26px;height:210px}
.num{font-size:210px;font-weight:900;line-height:.85;color:var(--a);letter-spacing:-.05em}
h2{font-size:74px;line-height:1.03;font-weight:900;letter-spacing:-.035em}
.path{margin-top:18px;display:flex;flex-direction:column;gap:12px}
.step{display:flex;align-items:center;gap:20px;font-size:40px;font-weight:700;background:#18223F;border-radius:24px;padding:16px 24px;width:fit-content;min-width:520px}
.step s{flex:none;width:48px;height:48px;border-radius:50%;background:#0B1020;color:var(--a);font-size:28px;font-weight:800;display:flex;align-items:center;justify-content:center;text-decoration:none}
.step.on{background:var(--a);color:#0B1020}
.panel{position:absolute;left:0;right:0;bottom:0;background:#F4F6FB;color:#0B1020;border-radius:36px;padding:24px 30px;box-shadow:10px 10px 0 var(--a)}
.ph{font-size:30px;font-weight:800;color:#5A6686;margin-bottom:10px;display:flex;justify-content:space-between}
.row{display:flex;align-items:center;gap:20px;font-size:38px;font-weight:700;height:74px;border-top:2px solid #DDE2EE}
.ic{width:50px;height:50px;border-radius:14px;flex:none}
.sw{margin-left:auto;width:92px;height:52px;border-radius:26px;background:#C9CFDD;position:relative;flex:none}.sw i{position:absolute;top:5px;left:5px;width:42px;height:42px;border-radius:50%;background:#fff}
.bar{height:26px;border-radius:13px;background:#0B1020;margin-left:auto}.pct{width:110px;text-align:right;font-weight:900}
.stick{position:absolute;font-size:40px;font-weight:900;color:#0B1020;background:#fff;padding:14px 28px;border-radius:18px;box-shadow:8px 8px 0 var(--a)}
#cap{position:absolute;left:60px;width:900px;top:1215px;height:170px;display:flex;align-items:center;justify-content:center}
#cap div{font-size:66px;font-weight:900;line-height:1.1;text-align:center;letter-spacing:-.02em;background:#0B1020;border:5px solid #26335E;border-radius:30px;padding:16px 30px}
#cap span.w{color:var(--a)}
#masc{position:absolute;left:70px;top:1395px}
#bub{position:absolute;left:440px;top:1430px;background:#fff;color:#0B1020;font-size:40px;font-weight:800;line-height:1.15;padding:20px 28px;border-radius:30px;max-width:500px;transform-origin:left bottom}
.chk{display:flex;align-items:center;gap:24px;font-size:52px;font-weight:800;background:#18223F;border-radius:28px;padding:24px 30px;margin-top:20px}
.chk s{flex:none;width:64px;height:64px;border-radius:50%;background:var(--a);color:#0B1020;font-size:40px;font-weight:900;display:flex;align-items:center;justify-content:center;text-decoration:none}
</style><body><div class="blob b1"></div><div class="blob b2"></div>
<div class="brand"><span class="tg"><i></i></span>Einstellungssache</div><div class="prog"><i id="pg"></i></div>
<div id="stage"></div><div id="cap"></div><div id="masc"></div><div id="bub"></div>
<script>
const S=${JSON.stringify(S)};const A=S.accent,BG='#0B1020';document.body.style.setProperty('--a',A);
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>{x=cl(x);return 1-Math.pow(1-x,3)};
const back=x=>{x=cl(x);const c=1.70158;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\\*(.+?)\\*/g,'<b>$1</b>');
const pop=(k,o='center')=>'opacity:'+cl(k*3)+';transform:scale('+(0.6+0.4*back(k))+');transform-origin:'+o+';';
const rise=k=>'opacity:'+ease(k)+';transform:translateY('+(40*(1-ease(k)))+'px);';
function mascot(m,open,blink,w){
 const arcs='<path d="M181 96 Q194 106 207 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M217 96 Q230 106 243 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>';
 const eyes={happy:'<circle cx="194" cy="94" r="14" fill="#fff"/><circle cx="230" cy="94" r="14" fill="#fff"/><circle cx="197" cy="96" r="6.5" fill="'+BG+'"/><circle cx="233" cy="96" r="6.5" fill="'+BG+'"/>',
  shock:'<circle cx="194" cy="90" r="16" fill="#fff"/><circle cx="230" cy="90" r="16" fill="#fff"/><circle cx="194" cy="90" r="5" fill="'+BG+'"/><circle cx="230" cy="90" r="5" fill="'+BG+'"/>',
  wink:'<circle cx="194" cy="94" r="14" fill="#fff"/><circle cx="197" cy="96" r="6.5" fill="'+BG+'"/><path d="M217 96 Q230 84 243 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>',
  sleepy:arcs+'<text x="252" y="50" font-size="34" font-weight="800" fill="#fff" font-family="Inter Display">z</text><text x="274" y="26" font-size="24" font-weight="800" fill="#fff" font-family="Inter Display">z</text>',
  angry:'<path d="M178 74 L206 84" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M246 74 L218 84" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="194" cy="98" r="12" fill="#fff"/><circle cx="230" cy="98" r="12" fill="#fff"/><circle cx="196" cy="99" r="5.5" fill="'+BG+'"/><circle cx="228" cy="99" r="5.5" fill="'+BG+'"/>',
  cool:'<rect x="174" y="80" width="76" height="26" rx="10" fill="#fff"/><rect x="180" y="85" width="28" height="16" rx="6" fill="'+BG+'"/><rect x="216" y="85" width="28" height="16" rx="6" fill="'+BG+'"/>'};
 const rest={happy:'<path d="M196 120 Q212 136 228 120" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>',shock:'<ellipse cx="212" cy="126" rx="9" ry="12" fill="#fff"/>',
  wink:'<path d="M194 118 Q214 138 232 116" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>',sleepy:'<circle cx="212" cy="124" r="6" fill="#fff"/>',
  angry:'<path d="M198 130 Q212 120 226 130" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>',cool:'<path d="M198 122 Q216 134 230 118" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>'};
 const e=(blink&&(m==='happy'||m==='shock'||m==='angry'))?arcs:eyes[m];
 const mouth=open>0.08?'<ellipse cx="212" cy="'+(m==='cool'?126:125)+'" rx="'+(8+3*open)+'" ry="'+(2.5+10*open)+'" fill="#fff"/>':rest[m];
 return '<svg width="'+w+'" viewBox="-10 0 320 235" xmlns="http://www.w3.org/2000/svg"><path d="M112 150 L104 205 M190 150 L198 205" stroke="'+A+'" stroke-width="12" stroke-linecap="round"/><path d="M84 207 L108 207 M194 207 L218 207" stroke="'+A+'" stroke-width="12" stroke-linecap="round"/><path d="M40 86 Q10 70 6 40" stroke="'+A+'" stroke-width="12" stroke-linecap="round" fill="none"/><rect x="30" y="40" width="240" height="120" rx="60" fill="'+A+'"/><circle cx="212" cy="100" r="54" fill="'+BG+'"/>'+e+mouth+'</svg>';}
function sw(k){k=ease(k);const c=k>0.5?A:'#C9CFDD';return '<span class="sw" style="background:'+c+'"><i style="left:'+(5+40*k)+'px"></i></span>';}
function chunks(l){const ws=l.t.split(' ');const cs=[];let cur=[];let n=0;
 for(const w of ws){if(cur.length&&(n+w.length>20||cur.length>=4)){cs.push(cur);cur=[];n=0}cur.push(w);n+=w.length+1}if(cur.length)cs.push(cur);
 const tot=l.t.length;let pos=0;const d=l.end-l.start;
 return cs.map(c=>c.map(w=>{const a=l.start+d*pos/tot;pos+=w.length+1;return{w,a,b:l.start+d*Math.min(pos,tot)/tot}}));}
function draw(t){
 const sc=S.scenes.find(s=>t<s.end)||S.scenes[S.scenes.length-1];const lt=t-sc.start;
 const ev={};let line=null,last=sc.lines[0];
 for(const l of sc.lines){if(t>=l.start){last=l;if(l.ev)ev[l.ev]=t-l.start}if(t>=l.start&&t<l.end+0.05)line=l}
 const E=(n,d=0.45)=>ev[n]===undefined?0:cl(ev[n]/d);
 document.getElementById('pg').style.width=(100*t/S.total)+'%';
 let h='';const k0=lt/0.45;
 if(sc.type==='hook'){
  const dr=ev.drain===undefined?100:Math.round(100-88*ease(ev.drain/2.2));
  const col=dr>40?'#F4F6FB':(dr>20?A:'#FF5A5A');
  h+='<h1 style="margin-top:20px;'+rise(k0)+'">'+(E('mark')?esc(sc.title):esc(sc.title).replace('<b>','<i style="font-style:normal">').replace('</b>','</i>'))+'</h1>';
  h+='<div style="position:absolute;left:0;top:560px;display:flex;align-items:center;gap:36px;'+rise(k0-0.3)+'"><svg width="420" height="200" viewBox="0 0 420 200"><rect x="6" y="6" width="370" height="188" rx="44" fill="none" stroke="#F4F6FB" stroke-width="12"/><rect x="386" y="66" width="26" height="68" rx="10" fill="#F4F6FB"/><rect x="28" y="28" width="'+(326*dr/100)+'" height="144" rx="26" fill="'+col+'"/></svg><div style="font-size:150px;font-weight:900;letter-spacing:-.04em;color:'+col+'">'+dr+' %</div></div>';
  if(E('sticker'))h+='<div class="stick" style="left:0;top:820px;font-size:56px;'+pop(E('sticker'),'left center')+'rotate:-4deg">'+esc(sc.sticker)+' 👇</div>';
 }
 if(sc.type==='tip'){
  h+='<div class="top" style="'+rise(k0)+'"><div class="num">'+sc.num+'</div><h2>'+esc(sc.title)+'</h2></div><div class="path">';
  sc.path.forEach((p,i)=>{const k=E('p'+(i+1),0.4);const cur=ev['p'+(i+1)]!==undefined&&ev['p'+(i+2)]===undefined&&ev.act===undefined;
   h+='<div class="step'+(cur?' on':'')+'" style="'+pop(k,'left center')+'"><s>'+(i+1)+'</s>'+esc(p)+'</div>'});
  h+='</div>';const pk=E('panel',0.5)||(ev.panel===undefined&&ev.act!==undefined?1:0);
  if(sc.panel==='apps'){const apps=[['Shopping-App','#FF7A59',1],['Spiele-App','#7C5CFF',1],['Wetter-App','#3DB8FF',1],['Nachrichten-App','#2ECC71',0]];
   h+='<div class="panel" style="'+rise(E('panel',0.5))+'"><div class="ph"><span>Hintergrundaktualisierung</span><span>Beispiel</span></div>'+apps.map((a,i)=>'<div class="row"><span class="ic" style="background:'+a[1]+'"></span>'+a[0]+sw(a[2]&&ev.act!==undefined?1-cl((ev.act-0.5-i*0.5)/0.3):1)+'</div>').join('')+'</div>';}
  if(sc.panel==='usage'){const apps=[['Spiele-App','#7C5CFF',41],['Video-App','#FF7A59',23],['Shopping-App','#3DB8FF',12],['Wetter-App','#2ECC71',4]];
   h+='<div class="panel" style="'+rise(E('panel',0.5))+'"><div class="ph"><span>Batterie · Verbrauch pro App</span><span>Beispielwerte</span></div>'+apps.map((a,i)=>{const g=ease(((ev.panel||0)-0.3-i*0.15)/0.7);const hot=i===0&&ev.act!==undefined;
    return '<div class="row" style="'+(hot?'background:'+A+';margin:0 -18px;padding:0 18px;border-radius:18px;border-color:transparent':'')+'"><span class="ic" style="background:'+a[1]+'"></span>'+a[0]+'<span class="bar" style="width:'+(a[2]*5.2*g)+'px"></span><span class="pct">'+Math.round(a[2]*g)+' %</span></div>'}).join('')+'</div>';
}
  if(sc.panel==='lowpower'){const on=E('act',0.35);const col=on>0.5?'#FFCC00':'#0B1020';
   h+='<div class="panel" style="'+rise(E('panel',0.5))+'"><div class="ph"><span>Batterie</span><span>Beispiel</span></div><div class="row" style="height:96px;font-size:44px">Stromsparmodus'+sw(on)+'</div><div class="row" style="height:150px;gap:30px"><svg width="190" height="90" viewBox="0 0 420 200"><rect x="6" y="6" width="370" height="188" rx="44" fill="none" stroke="#0B1020" stroke-width="14"/><rect x="386" y="66" width="26" height="68" rx="10" fill="#0B1020"/><rect x="28" y="28" width="210" height="144" rx="26" fill="'+col+'"/></svg><span style="font-size:34px;line-height:1.2;color:#5A6686">'+(on>0.5?'Akkusymbol wird gelb:<br>Stromsparmodus ist an':'64 %')+'</span></div></div>';
   if(E('act2'))h+='<div class="stick" style="right:0;bottom:375px;'+pop(E('act2'),'center')+'rotate:4deg">Kontrollzentrum ⚡</div>';}
 }
 if(sc.type==='outro'){
  sc.checks.forEach((c,i)=>{h+='<div class="chk" style="'+pop(E('c'+(i+1),0.4),'left center')+'"><s>✓</s>'+esc(c)+'</div>'});
  if(E('save'))h+='<h1 style="margin-top:60px;font-size:104px;'+rise(E('save',0.5))+'">'+esc(sc.title)+'</h1>';
  if(E('follow'))h+='<div class="stick" style="left:0;bottom:0;font-size:52px;'+pop(E('follow'),'left center')+'rotate:-3deg">@einstellungssache</div>';
 }
 document.getElementById('stage').innerHTML=h;
 // Untertitel
 let c='';if(line){const ch=chunks(line);let cur=ch[0];for(const x of ch){if(t>=x[0].a)cur=x}
  const k=cl((t-cur[0].a)/0.12);c='<div style="transform:scale('+(0.9+0.1*back(k))+')">'+cur.map(x=>'<span'+(t>=x.a&&t<x.b?' class="w"':'')+'>'+esc(x.w)+'</span>').join(' ')+'</div>';}
 document.getElementById('cap').innerHTML=c;
 // Schalti
 const talking=line&&t<line.end-0.08;const open=talking?cl(0.15+0.55*Math.abs(Math.sin(t*17.3))+0.3*Math.abs(Math.sin(t*6.1+1))):0;
 const blink=(t%3.4)<0.12;const mood=last.mood||'happy';const big=sc.type==='hook'||sc.type==='outro';
 const m=document.getElementById('masc');m.innerHTML=mascot(mood,open,blink,big?360:340);
 m.style.transform='translateY('+(Math.sin(t*2.6)*7-(talking?open*5:0))+'px) rotate('+(Math.sin(t*1.7)*2.5)+'deg)';
 const b=document.getElementById('bub');const q=sc.quip;const qs=sc.lines[sc.quipAt||1].start;
 if(q&&t>=qs){b.style.display='block';b.textContent=q;b.style.transform='rotate(3deg) scale('+(0.5+0.5*back((t-qs)/0.35))+')';b.style.opacity=cl((t-qs)/0.15)}else b.style.display='none';
}
</script></body>`;

function ff(a) { return new Promise((res, rej) => { const p = spawn('ffmpeg', a, { stdio: ['pipe', 'ignore', 'pipe'] }); let e = ''; p.stderr.on('data', d => e += d); p.on('close', c => c === 0 ? res() : rej(new Error(e.slice(-600)))); ff.last = p; }); }
(async () => {
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'zeitplan.json'), JSON.stringify({ total: S.total, scenes: S.scenes.map(s => ({ start: s.start, end: s.end, lines: s.lines.map(l => ({ t: l.t, start: +l.start.toFixed(3), end: +l.end.toFixed(3) })) })) }, null, 1));
  console.log('Laenge', S.total.toFixed(2), 's');
  const br = await chromium.launch();
  const mk = async () => { const pg = await br.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 }); await pg.setContent(page); await pg.evaluate(() => document.fonts.ready); return pg; };
  const fr = opt('--frames');
  if (fr) { const pg = await mk(); for (const x of fr.split(',')) { await pg.evaluate(t => draw(t), +x); await pg.screenshot({ path: path.join(out, 'frame_' + x + '.jpg'), type: 'jpeg', quality: 80 }); } await br.close(); return; }
  await Promise.all(S.scenes.map(async (sc, i) => {
    const pg = await mk(); const tmp = path.join(out, 'tmp_' + i + '.mp4'), fin = path.join(out, 'szene_' + i + '.mp4');
    const done = ff(['-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', String(FPS), tmp]); const proc = ff.last;
    const n = Math.round((sc.end - sc.start) * FPS);
    for (let f = 0; f < n; f++) { await pg.evaluate(t => draw(t), sc.start + f / FPS); const buf = await pg.screenshot({ type: 'jpeg', quality: 92 }); if (!proc.stdin.write(buf)) await new Promise(r => proc.stdin.once('drain', r)); }
    proc.stdin.end(); await done; fs.renameSync(tmp, fin); console.log('Szene', i, n, 'Frames');
  }));
  await br.close();
  const list = path.join(out, 'liste.txt'); fs.writeFileSync(list, S.scenes.map((_, i) => "file 'szene_" + i + ".mp4'").join('\n'));
  const stumm = path.join(out, 'stumm.mp4'); execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', stumm], { stdio: 'ignore' });
  const audio = opt('--audio'); const ziel = path.join(out, S.id + '.mp4');
  if (audio) execFileSync('ffmpeg', ['-y', '-i', stumm, '-i', audio, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', ziel], { stdio: 'ignore' });
  else fs.copyFileSync(stumm, ziel);
  console.log('fertig', ziel);
})();
